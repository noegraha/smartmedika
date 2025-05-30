import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";
import { Button } from "antd";

const FaceRecognition = () => {
  const [modelsLoaded, setModelsLoaded] = useState(false);
  const [captureVideo, setCaptureVideo] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const videoRef = useRef();
  const videoHeight = 480;
  const videoWidth = 640;
  const canvasRef = useRef();

  const labels = ["Felipe", "Messi", "Data"]; // Labels for known faces
  const labeledFaceDescriptors = []; // Store labeled face descriptors
  const faceMatcher = new faceapi.FaceMatcher();

  useEffect(() => {
    const loadModels = async () => {
      const MODEL_URL = process.env.PUBLIC_URL + "/models";

      await Promise.all([
        faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
        faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
        faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
        faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL),
      ]).then(() => setModelsLoaded(true));

      // Load labeled face descriptors for known faces
      for (const label of labels) {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(
            `${process.env.PUBLIC_URL}/labels/${label}/${i}.png`
          );
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        labeledFaceDescriptors.push(
          new faceapi.LabeledFaceDescriptors(label, descriptions)
        );
      }

      // Set labeled face descriptors for the FaceMatcher
      faceMatcher.load(labeledFaceDescriptors);
    };
    loadModels();
  }, []);

  const startVideo = () => {
    setCaptureVideo(true);
    navigator.mediaDevices
      .getUserMedia({ video: { width: 300 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => {
        console.error("error:", err);
      });
  };

  const handleVideoOnCanPlay = () => {
    setInterval(async () => {
      if (canvasRef && canvasRef.current && videoRef.current) {
        canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(
          videoRef.current
        );
        const displaySize = {
          width: videoWidth,
          height: videoHeight,
        };

        faceapi.matchDimensions(canvasRef.current, displaySize);

        const detections = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvasRef.current
          .getContext("2d")
          .clearRect(0, 0, videoWidth, videoHeight);

        // Perform face recognition and display labels
        resizedDetections.forEach((detection) => {
          const bestMatch = faceMatcher.findBestMatch(detection.descriptor);
          const label = bestMatch.toString();
          const box = detection.detection.box;
          const drawBox = new faceapi.draw.DrawBox(box, {
            label: label,
          });
          drawBox.draw(canvasRef.current);
        });
      }
    }, 1000);
  };

  const closeWebcam = () => {
    videoRef.current.pause();
    videoRef.current.srcObject.getTracks()[0].stop();
    setCaptureVideo(false);
  };

  const capturePhoto = async () => {
    const imageSrc = await videoRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  return (
    <div>
      <div style={{ textAlign: "center", padding: "10px" }}>
        {captureVideo && modelsLoaded ? (
          <>
            <Button onClick={closeWebcam} danger type="primary">
              Close Webcam
            </Button>
            <Button onClick={capturePhoto} type="primary">
              Capture Photo
            </Button>
          </>
        ) : (
          <Button onClick={startVideo} type="primary">
            Open Webcam
          </Button>
        )}
      </div>
      {captureVideo ? (
        modelsLoaded ? (
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "10px",
              }}
            >
              <video
                ref={videoRef}
                height={videoHeight}
                width={videoWidth}
                onCanPlay={handleVideoOnCanPlay}
                style={{ borderRadius: "10px" }}
              />
              <canvas ref={canvasRef} style={{ position: "absolute" }} />
            </div>
            {capturedImage && (
              <div style={{ textAlign: "center" }}>
                <img
                  src={capturedImage}
                  alt="Captured"
                  style={{ borderRadius: "10px", marginTop: "10px" }}
                />
              </div>
            )}
          </div>
        ) : (
          <div>loading...</div>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

export default FaceRecognition;
