import React, { useEffect, useRef, useState } from "react";
import { Spin, Typography, Button } from "antd";
import Webcam from "react-webcam";

const { Text } = Typography;

const FaceDetectionOpenCV = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [isWebcamOn, setIsWebcamOn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFaceDetected, setIsFaceDetected] = useState(false);
  const [opencvReady, setOpencvReady] = useState(false);

  // Memuat OpenCV.js dan siap digunakan
  const checkOpenCVReady = () => {
    if (window.cv && window.cv.imread) {
      setOpencvReady(true);
      setIsLoading(false);
    } else {
      setTimeout(checkOpenCVReady, 100);
    }
  };

  // Deteksi wajah menggunakan OpenCV.js
  const detectFaces = () => {
    if (!opencvReady || !webcamRef.current || !canvasRef.current) return;

    const video = webcamRef.current.video;
    const canvas = canvasRef.current;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const src = window.cv.imread(canvas);
    const gray = new window.cv.Mat();
    window.cv.cvtColor(src, gray, window.cv.COLOR_RGBA2GRAY, 0);

    // Inisialisasi deteksi wajah
    const faceCascade = new window.cv.CascadeClassifier();
    faceCascade.load("haarcascade_frontalface_default.xml");

    const faces = new window.cv.RectVector();
    const msize = new window.cv.Size(0, 0);
    faceCascade.detectMultiScale(gray, faces, 1.1, 3, 0, msize, msize);

    // Cek apakah wajah terdeteksi
    if (faces.size() > 0) {
      setIsFaceDetected(true);
    } else {
      setIsFaceDetected(false);
    }

    src.delete();
    gray.delete();
    faces.delete();
    faceCascade.delete();
  };

  const handleWebcamToggle = () => {
    setIsWebcamOn((prev) => !prev);
    setIsFaceDetected(false); // Reset status deteksi saat webcam di-toggle
  };

  useEffect(() => {
    checkOpenCVReady();

    if (isWebcamOn) {
      const interval = setInterval(() => {
        detectFaces(); // Deteksi wajah setiap 1 detik
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isWebcamOn, opencvReady]);

  return (
    <div style={{ textAlign: "center", padding: 20 }}>
      {isLoading && <Spin size="large" />}
      <div style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={handleWebcamToggle}>
          {isWebcamOn ? "Matikan Webcam" : "Nyalakan Webcam"}
        </Button>
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
              borderRadius: 10,
              boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.2)",
            }}
          />
        </>
      )}
      {isWebcamOn && (
        <div style={{ marginTop: 20 }}>
          <Text type={isFaceDetected ? "success" : "danger"}>
            {isFaceDetected ? "Wajah Terdeteksi" : "Wajah Belum Terdeteksi"}
          </Text>
        </div>
      )}
    </div>
  );
};

export default FaceDetectionOpenCV;
