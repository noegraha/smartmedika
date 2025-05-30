// src/VoiceToText.js
import React, { useState, useRef } from "react";

const VoiceToTextGoogle = () => {
  const [text, setText] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);

  const handleDataAvailable = (e) => {
    const audioBlob = new Blob([e.data], { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audio", audioBlob);

    fetch("https://182.168.0.235:5000/speech-to-text", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => setText(data.transcription))
      .catch((error) => console.error("Error ini isinya:", error));
  };

  const startRecording = () => {
    setIsRecording(true);
    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      mediaRecorder.ondataavailable = handleDataAvailable;
      mediaRecorder.start();
    });
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  return (
    <div>
      <h1>Voice to Text</h1>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <p>{text}</p>
    </div>
  );
};

export default VoiceToTextGoogle;
