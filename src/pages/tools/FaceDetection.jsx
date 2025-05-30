// Import dependencies
import React, { useEffect, useRef, useState } from "react";
import { Button, Spin, Typography } from "antd";
import Webcam from "react-webcam";
import * as faceapi from "face-api.js";
const { Text } = Typography;
const FaceDetection = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isFaceDetected, setIsFaceDetected] = useState(false);

  // Function to start face detection
  const startFaceDetection = async () => {
    setIsLoading(true);
    // Load face-api models
    try {
      console.log("Loading models...");
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      console.log("Tiny Face Detector model loaded.");
      // await faceapi.nets.ssdMobilenetv1.loadFromUri("/models");
      // console.log("Ssd Face Detector model loaded.");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      console.log("Face Landmark 68 model loaded.");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
      console.log("Face Recognition model loaded.");
      await faceapi.nets.faceExpressionNet.loadFromUri("/models");
      console.log("Face Expression model loaded.");

      setIsLoading(false);
      detectFace();
    } catch (error) {
      console.error("Error loading models:", error);
      setIsLoading(false);
    }
  };

  // Bagian yang memeriksa deteksi wajah
  const detectFace = async () => {
    if (webcamRef.current && webcamRef.current.video.readyState === 4) {
      const video = webcamRef.current.video;
      const displaySize = { width: video.width, height: video.height };

      faceapi.matchDimensions(canvasRef.current, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
          // .detectAllFaces(video, new faceapi.SsdMobilenetv1Options()) // Menggunakan SSD Mobilenet
          .withFaceLandmarks()
          .withFaceExpressions();

        console.log("Detections:", detections); // Tambahkan ini untuk melihat deteksi wajah

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        // Perbarui status deteksi wajah
        setIsFaceDetected(detections.length > 0);
        console.log("Is Face Detected:", detections.length > 0); // Tambahkan ini untuk melihat apakah wajah terdeteksi

        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
        faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);
      }, 100);
    }
  };

  // Function to handle start and stop of the webcam
  const handleWebcamToggle = () => {
    setIsWebcamOn(!isWebcamOn);
    setIsFaceDetected(false); // Reset face detection status when webcam is toggled
  };

  useEffect(() => {
    if (isWebcamOn) {
      startFaceDetection();
    }
  }, [isWebcamOn]);

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      {isLoading && <Spin size="large" />}
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={handleWebcamToggle}>
          {isWebcamOn ? "Matikan Webcam" : "Nyalakan Webcam"}
        </Button>
        {isWebcamOn && (
          <div style={{ marginTop: 20 }}>
            <Text type={isFaceDetected ? "success" : "danger"}>
              {isFaceDetected ? "Wajah Terdeteksi" : "Wajah Belum Terdeteksi"}
            </Text>
          </div>
        )}
      </div>
      {isWebcamOn && (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
            style={{
              width: 640,
              height: 480,
              borderRadius: 10,
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
          <canvas
            ref={canvasRef}
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: 640,
              height: 480,
            }}
          />
        </>
      )}
    </div>
  );
};

export default FaceDetection;
