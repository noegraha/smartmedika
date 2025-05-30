import React, { useRef, useState, useEffect, useContext } from "react";
import { Button, Col, Row, Spin, Switch } from "antd";
import * as faceapi from "face-api.js";
import { LoginContext } from "../rawatjalan/context";
import { MasterDokterContext } from "../master/context/MasterDokter/MasterDokterContext";
import axios from "axios";

const FaceRecognitionCopy = () => {
  const { signIn, namauser } = useContext(LoginContext);
  const videoRef = useRef();
  const canvasRef = useRef();
  const [nama, setNama] = useState("");
  const [loadingCamera, setLoadingCamera] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState(null);
  const [videoStream, setVideoStream] = useState(null);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showCanvas, setShowCanvas] = useState(false);
  const [faceDetected, setFaceDetected] = useState(false);
  const {
    getEnrolDokter,
    insertEnrolDokter,
    enrollDokter,
    setenrollDokter,
    descriptorDokter,
    setdescriptorDokter,
  } = useContext(MasterDokterContext);
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  useEffect(() => {
    const loadModels = async () => {
      try {
        await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
        await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
        await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
        console.log("Model berhasil dimuat");

        const labeledDescriptors = await loadLabeledImages();
        setLabeledFaceDescriptors(labeledDescriptors);
        setIsModelLoaded(true);
      } catch (err) {
        console.error("Error loading models:", err);
        setIsModelLoaded(false);
      }
    };

    loadModels();
  }, []);

  const loadLabeledImages = async () => {
    try {
      // Request data from the API
      const res = await axios.get(
        `${apiku}/FaceRecognition/Read/${namauser}`,
        options
      );

      if (res.data.statusCode === 200) {
        const result = res.data.result;
        console.log(res.data.result);
        // Ensure the Descriptor is a Float32Array
        const descriptorArray = result.Deskriptor.split(",").map(parseFloat);

        // Return the LabeledFaceDescriptors with the proper format
        return new faceapi.LabeledFaceDescriptors(result.UserId, [
          new Float32Array(descriptorArray),
        ]);
      } else {
        console.log("Warning: Data not found");
        return null;
      }
    } catch (err) {
      console.log("Error: ", err);
      return null;
    }
  };

  const handleSwitchChange = (checked) => {
    if (checked) {
      startVideo();
      setLoadingCamera(true);
    } else {
      stopVideo();
    }
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setVideoStream(stream);
        setIsWebcamActive(true);
        setShowCanvas(true);
        setIsDetecting(true);
        setLoadingCamera(false);
      })
      .catch((err) => {
        console.error("Error accessing webcam: ", err.message);
        setIsWebcamActive(false);
        setLoadingCamera(false);
      });
  };

  const stopVideo = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      videoRef.current.pause();
      videoRef.current.srcObject = null;
      setIsWebcamActive(false);
      setIsDetecting(false);
      setShowCanvas(false);
      setFaceDetected(false);
      setNama("");
    }
  };

  const handleVideoPlay = async () => {
    if (
      !isModelLoaded ||
      !labeledFaceDescriptors ||
      !videoRef.current.videoWidth
    ) {
      console.log("Model atau video belum siap");
      return;
    }

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };
    faceapi.matchDimensions(canvas, displaySize);

    const detectFaces = async () => {
      if (!isDetecting || !isWebcamActive) return;

      try {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.SsdMobilenetv1Options())
          .withFaceLandmarks()
          .withFaceDescriptors();

        if (!detections || detections.length === 0) {
          setFaceDetected(false);
          setNama("Tidak ada wajah yang terdeteksi");
          return;
        }

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

        const faceMatcher = new faceapi.FaceMatcher(
          labeledFaceDescriptors,
          0.6
        );
        const results = resizedDetections.map((d) =>
          faceMatcher.findBestMatch(d.descriptor)
        );

        console.log("Deteksi hasil:", results);

        const isFaceDetected = results.some(
          (result) =>
            result.label && result.label !== "unknown" && result.distance <= 0.6
        );
        setFaceDetected(isFaceDetected);

        results.forEach((result) => {
          if (
            result.label &&
            result.label !== "unknown" &&
            result.distance <= 0.6
          ) {
            setNama(result.label);
            console.log(
              `Wajah dikenali: ${result.label} dengan jarak: ${result.distance}`
            );
          } else {
            setNama("Wajah tidak sesuai");
            console.log("Wajah tidak sesuai atau terlalu jauh");
          }
        });

        if (isDetecting && isWebcamActive) {
          requestAnimationFrame(detectFaces);
        }
      } catch (err) {
        console.error("Error during face detection:", err);
      }
    };

    detectFaces();
  };

  return (
    <div>
      <Spin size="large" spinning={!isModelLoaded} tip="Memuat Models">
        <h1>Dtetksi dari hasil enroll</h1>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Switch
              checked={isWebcamActive}
              onChange={handleSwitchChange}
              checkedChildren="Matikan Webcam"
              unCheckedChildren="Nyalakan Webcam"
              disabled={!isModelLoaded}
              loading={loadingCamera}
            />
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            {faceDetected && <div>Anda terdeteksi: {nama}</div>}
          </Col>
        </Row>
        <div style={{ position: "relative", width: "640px", height: "480px" }}>
          <video
            ref={videoRef}
            autoPlay
            muted
            onPlay={handleVideoPlay}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
          />
          {showCanvas && (
            <canvas
              ref={canvasRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            />
          )}
        </div>
      </Spin>
    </div>
  );
};

export default FaceRecognitionCopy;
