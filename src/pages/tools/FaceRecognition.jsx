import React, { useRef, useState, useEffect, useContext } from "react";
import { Button, Col, message, Row, Spin, Switch } from "antd";
import * as faceapi from "face-api.js";
import { LoginContext } from "../rawatjalan/context";
import { MasterDokterContext } from "../master/context/MasterDokter/MasterDokterContext";
import axios from "axios";

const FaceRecognition = () => {
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
        `http://182.168.2.54/api/foto-pegawai/${namauser}`,
        options
      );
      console.log(res);

      // Check if the response is successful
      if (res.data.status === "success") {
        const datapegawai = res.data.data;
        console.log(datapegawai);

        // Check if the photo exists
        if (datapegawai.fotoPegawai === null) {
          message.warning("Foto pegawai tidak ada");
          return null; // No data to process
        } else {
          console.log(datapegawai.fotoPegawai);

          // Extract the base64 image string (remove the prefix "data:image/jpg;base64,")
          const base64Image = datapegawai.fotoPegawai.split(",")[1];

          // Convert the base64 string to an image
          const img = await base64ToImage(base64Image);

          // Use face-api.js to extract face descriptor from the image
          const faceDescriptor = await extractDescriptorFromImage(img);

          if (faceDescriptor) {
            // Ensure UserId is a string
            const userId = String(datapegawai.UserId); // Convert to string

            // Create LabeledFaceDescriptors with the userId and the face descriptor
            const labeledDescriptors = new faceapi.LabeledFaceDescriptors(
              userId, // userId is now a string
              [new Float32Array(faceDescriptor)]
            );

            // Return the LabeledFaceDescriptors object
            return labeledDescriptors;
          } else {
            console.log("No face descriptor found.");
            return null;
          }
        }
      } else {
        console.log("Data tidak ditemukan");
        return null; // No data found
      }
    } catch (err) {
      console.log("Koneksi terputus", err);
      return null; // Handle error and return null
    }
  };

  // Convert base64 string to an image element
  const base64ToImage = (base64) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = `data:image/jpg;base64,${base64}`; // Set the image source to the base64 string
    });
  };

  // Extract face descriptor from an image
  const extractDescriptorFromImage = async (img) => {
    const detections = await faceapi
      .detectSingleFace(img)
      .withFaceLandmarks()
      .withFaceDescriptor();
    if (detections && detections.descriptor) {
      return detections.descriptor; // Return face descriptor
    }
    return null;
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
        <h1>Deteksi dari Foto Simpeg</h1>
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

export default FaceRecognition;
