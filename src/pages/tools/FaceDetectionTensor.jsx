import React, { useRef, useState, useEffect } from "react";
import { Button, Typography, Spin, message } from "antd";
import Webcam from "react-webcam";
import * as tf from "@tensorflow/tfjs";
import * as faceLandmarksDetection from "@tensorflow-models/face-landmarks-detection";

const { Title } = Typography;

const FaceDetectionTensor = () => {
  const webcamRef = useRef(null);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [model, setModel] = useState(null);
  const [loading, setLoading] = useState(false);

  // Muat model TensorFlow.js untuk deteksi wajah
  const loadModel = async () => {
    setLoading(true);
    try {
      const loadedModel = await faceLandmarksDetection.load(
        faceLandmarksDetection.SupportedPackages.mediapipeFacemesh
      );
      setModel(loadedModel);
      message.success("Model berhasil dimuat!");
    } catch (error) {
      message.error("Gagal memuat model.");
      console.error("Error loading model:", error);
    } finally {
      setLoading(false);
    }
  };

  // Deteksi wajah menggunakan TensorFlow.js
  const detectFace = async () => {
    if (!model || !webcamRef.current || !webcamRef.current.video) return;

    const video = webcamRef.current.video;
    if (video.readyState === 4) {
      const predictions = await model.estimateFaces({
        input: video,
        returnTensors: false,
        flipHorizontal: false,
      });

      if (predictions.length > 0) {
        setIsFaceDetected(true);
      } else {
        setIsFaceDetected(false);
      }
    }
  };

  useEffect(() => {
    if (isWebcamOn) {
      loadModel();
    }

    const interval = setInterval(() => {
      if (isWebcamOn) {
        detectFace();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [model, isWebcamOn]);

  const toggleWebcam = () => {
    setIsWebcamOn(!isWebcamOn);
    setIsFaceDetected(false);
  };

  return (
    <div style={{ textAlign: "center", padding: 50 }}>
      <Title level={2}>Pengenalan Wajah</Title>

      {loading && <Spin size="large" />}

      {isWebcamOn && (
        <div style={{ marginBottom: 20 }}>
          <Webcam
            ref={webcamRef}
            style={{
              width: 320,
              height: 240,
              borderRadius: 10,
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
            }}
            videoConstraints={{ facingMode: "user" }}
          />
        </div>
      )}

      <Button type="primary" onClick={toggleWebcam}>
        {isWebcamOn ? "Matikan Webcam" : "Nyalakan Webcam"}
      </Button>

      {isFaceDetected ? (
        <Title level={4} style={{ marginTop: 20, color: "green" }}>
          Wajah Terdeteksi
        </Title>
      ) : (
        isWebcamOn && (
          <Title level={4} style={{ marginTop: 20, color: "red" }}>
            Wajah Belum Terdeteksi
          </Title>
        )
      )}
    </div>
  );
};

export default FaceDetectionTensor;
