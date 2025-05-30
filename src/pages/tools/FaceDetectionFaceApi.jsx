import React, { useRef, useState, useEffect } from "react";
import { Button } from "antd";
import * as faceapi from "face-api.js";
useEffect(() => {
  const loadModels = async () => {
    await faceapi.loadSsdMobilenetv1Model("/models");
    await faceapi.loadFaceLandmarkModel("/models");
    await faceapi.loadFaceRecognitionModel("/models");
  };

  loadModels();
}, []);
const FaceDetectionFaceApi = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startVideo = async () => {
    navigator.mediaDevices
      .getUserMedia({ video: {} })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setIsCameraActive(true);
      })
      .catch((error) => {
        console.error("Error accessing media devices.", error);
      });
  };

  const stopVideo = () => {
    videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    setIsCameraActive(false);
  };

  const detectFaces = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.SsdMobilenetv1Options())
      .withFaceLandmarks()
      .withFaceDescriptors();
    const canvas = canvasRef.current;
    const displaySize = { width: canvas.width, height: canvas.height };
    faceapi.draw.drawDetections(canvas, displaySize, detections);
    faceapi.draw.drawFaceLandmarks(canvas, displaySize, detections);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (isCameraActive) {
        detectFaces();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [isCameraActive]);

  return (
    <div>
      <video ref={videoRef} width="640" height="480" />
      <canvas
        ref={canvasRef}
        width="640"
        height="480"
        style={{ position: "absolute" }}
      />
      <Button onClick={isCameraActive ? stopVideo : startVideo}>
        {isCameraActive ? "Stop Camera" : "Start Camera"}
      </Button>
    </div>
  );
};

export default FaceDetectionFaceApi;
