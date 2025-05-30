import React, { useRef, useState, useEffect } from "react";
import * as faceapi from "face-api.js";

const FaceDetections = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [isBoundingBoxOn, setIsBoundingBoxOn] = useState(true);

  useEffect(() => {
    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      await faceapi.nets.faceLandmark68Net.loadFromUri("/models");
      await faceapi.nets.faceRecognitionNet.loadFromUri("/models");
    };

    const startVideo = () => {
      navigator.getUserMedia(
        { video: {} },
        (stream) => {
          videoRef.current.srcObject = stream;
          faceDetection();
        },
        (err) => console.error(err)
      );
    };

    const faceDetection = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;

      video.addEventListener("play", async () => {
        const displaySize = { width: video.width, height: video.height };
        faceapi.matchDimensions(canvas, displaySize);

        setInterval(async () => {
          const detections = await faceapi
            .detectAllFaces(video, new faceapi.TinyFaceDetectorOptions())
            .withFaceLandmarks()
            .withFaceDescriptors();

          const resizedDetections = faceapi.resizeResults(
            detections,
            displaySize
          );

          canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

          if (isBoundingBoxOn) {
            faceapi.draw.drawDetections(canvas, resizedDetections);
            faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
          }
        }, 100);
      });
    };

    loadModels();
    startVideo();
  }, [isBoundingBoxOn]);

  return (
    <div>
      <video ref={videoRef} autoPlay muted style={{ display: "none" }} />
      <canvas ref={canvasRef} />
      <button onClick={() => setIsBoundingBoxOn(!isBoundingBoxOn)}>
        {isBoundingBoxOn ? "Turn Off Bounding Box" : "Turn On Bounding Box"}
      </button>
    </div>
  );
};

export default FaceDetections;
