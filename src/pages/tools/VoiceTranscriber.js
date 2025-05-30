import React, { useState, useEffect, useRef } from "react";
import { Button, Input, message } from "antd";
const { TextArea } = Input;

const VoiceTranscriber = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Periksa apakah browser mendukung Web Speech API
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      message.error("Browser tidak mendukung Speech Recognition");
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    recognitionRef.current = new SpeechRecognition();

    recognitionRef.current.continuous = true;
    recognitionRef.current.interimResults = true;
    recognitionRef.current.lang = "id-ID"; // Ganti dengan bahasa yang diinginkan, misalnya 'en-US' untuk Bahasa Inggris

    recognitionRef.current.onresult = (event) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcriptPart = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          setTranscript((prev) => prev + transcriptPart + " ");
        } else {
          interimTranscript += transcriptPart;
        }
      }
    };

    recognitionRef.current.onerror = (event) => {
      console.error("Error:", event.error);
      message.error(`Error: ${event.error}`);
      stopRecording();
    };

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsRecording(true);
    }
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <h1>Voice to Text Transcriber</h1>
      <Button
        type="primary"
        onClick={isRecording ? stopRecording : startRecording}
        style={{ marginBottom: "10px" }}
      >
        {isRecording ? "Stop Recording" : "Start Recording"}
      </Button>
      <TextArea
        rows={10}
        value={transcript}
        onChange={(e) => setTranscript(e.target.value)}
        placeholder="Transkrip akan muncul di sini..."
      />
    </div>
  );
};

export default VoiceTranscriber;
