import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button, Spin, Space, Typography } from "antd";

const { Text } = Typography;

const FaceTracking = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isModelLoaded, setIsModelLoaded] = useState(false);
  const [isTracking, setIsTracking] = useState(false);
  const [isWebcamActive, setIsWebcamActive] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false); // Status deteksi wajah

  // Load face-api.js models
  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL);
    await faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL);
    setIsModelLoaded(true);
  };

  // Start video stream from webcam
  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setVideoStream(stream); // Simpan stream video untuk kontrol lebih lanjut
        setIsWebcamActive(true);
      })
      .catch((err) => console.error("Error accessing webcam: ", err));
  };

  // Stop the video stream
  const stopVideo = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop()); // Hentikan semua track video
      setIsWebcamActive(false);
      setIsTracking(false); // Setel ulang tracking ketika webcam dimatikan
      setIsFaceDetected(false); // Setel ulang status deteksi wajah
    }
  };

  // Detect faces in the video feed
  const handleVideoPlay = async () => {
    if (!isModelLoaded) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;

    const displaySize = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    faceapi.matchDimensions(canvas, displaySize);

    setIsTracking(true);

    setInterval(async () => {
      if (!isWebcamActive) return; // Stop detection when webcam is off
      const detections = await faceapi
        .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks();

      const resizedDetections = faceapi.resizeResults(detections, displaySize);
      canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
      faceapi.draw.drawDetections(canvas, resizedDetections);
      faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);

      // Update status face detection
      if (resizedDetections.length > 0) {
        setIsFaceDetected(true);
      } else {
        setIsFaceDetected(false);
      }
    }, 100);
  };

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <Space style={{ marginBottom: "20px" }}>
        <Button type="primary" onClick={startVideo} disabled={isWebcamActive}>
          Nyalakan Webcam
        </Button>
        <Button type="danger" onClick={stopVideo} disabled={!isWebcamActive}>
          Matikan Webcam
        </Button>
      </Space>
      {/* Tampilkan status deteksi wajah */}
      <div style={{ marginTop: "20px" }}>
        {isTracking && (
          <Text type={isFaceDetected ? "success" : "danger"}>
            {isFaceDetected ? "Wajah Terdeteksi" : "Tidak Ada Wajah"}
          </Text>
        )}
      </div>
      {!isModelLoaded ? (
        <Spin tip="Memuat model..." />
      ) : (
        <div style={{ position: "relative", display: "inline-block" }}>
          <video
            ref={videoRef}
            onPlay={handleVideoPlay}
            style={{ borderRadius: 10 }}
            autoPlay
            muted
            width="720"
            height="560"
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              borderRadius: 10,
            }}
            width="720"
            height="560"
          />
        </div>
      )}
    </div>
  );
};

export default FaceTracking;
