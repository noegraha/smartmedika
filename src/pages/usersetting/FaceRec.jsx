import React, { useEffect, useRef, useState } from "react";
import * as faceapi from "face-api.js";

const FaceRec = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [labeledFaceDescriptors, setLabeledFaceDescriptors] = useState([]);
  const [faceMatcher, setFaceMatcher] = useState(null);

  useEffect(() => {
    const MODEL_URL = process.env.PUBLIC_URL + "/models";

    Promise.all([
      faceapi.nets.ssdMobilenetv1.loadFromUri(MODEL_URL),
      faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
      faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
    ]).then(() => {
      startWebcam();
      getLabeledFaceDescriptors();
    });
  }, []);

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    } catch (error) {
      console.error(error);
    }
  };

  const getLabeledFaceDescriptors = async () => {
    const labels = ["Felipe", "Messi", "Data"];
    const labeledDescriptors = await Promise.all(
      labels.map(async (label) => {
        const descriptions = [];
        for (let i = 1; i <= 2; i++) {
          const img = await faceapi.fetchImage(`./labels/${label}/${i}.png`);
          const detections = await faceapi
            .detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
          descriptions.push(detections.descriptor);
        }
        return new faceapi.LabeledFaceDescriptors(label, descriptions);
      })
    );
    setLabeledFaceDescriptors(labeledDescriptors);
    setFaceMatcher(new faceapi.FaceMatcher(labeledDescriptors));
  };

  useEffect(() => {
    const handlePlay = async () => {
      const canvas = faceapi.createCanvasFromMedia(videoRef.current);
      canvasRef.current.appendChild(canvas);

      const displaySize = {
        width: videoRef.current.width,
        height: videoRef.current.height,
      };
      faceapi.matchDimensions(canvas, displaySize);

      setInterval(async () => {
        const detections = await faceapi
          .detectAllFaces(videoRef.current)
          .withFaceLandmarks()
          .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(
          detections,
          displaySize
        );

        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        const results = resizedDetections.map((d) =>
          faceMatcher.findBestMatch(d.descriptor)
        );
        results.forEach((result, i) => {
          const box = resizedDetections[i].detection.box;
          new faceapi.draw.DrawBox(box, { label: result }).draw(canvas);
        });
      }, 100);
    };

    videoRef.current.addEventListener("play", handlePlay);

    return () => {
      videoRef.current.removeEventListener("play", handlePlay);
    };
  }, [labeledFaceDescriptors, faceMatcher]);

  return (
    <div>
      <video ref={videoRef} autoPlay playsInline />
      <canvas ref={canvasRef} />
    </div>
  );
};

export default FaceRec;
