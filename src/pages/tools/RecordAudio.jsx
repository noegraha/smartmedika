import React, { useState, useRef } from "react";
import { WaveFile } from "wavefile";

const RecordAudio = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState("");
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const audioContextRef = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        mediaRecorderRef.current = new MediaRecorder(stream);
        mediaRecorderRef.current.start();

        mediaRecorderRef.current.addEventListener("dataavailable", (event) => {
          audioChunksRef.current.push(event.data);
        });

        mediaRecorderRef.current.addEventListener("stop", async () => {
          const audioBlob = new Blob(audioChunksRef.current, {
            type: "audio/wav",
          });
          const arrayBuffer = await audioBlob.arrayBuffer();
          const audioBuffer = await audioContextRef.current.decodeAudioData(
            arrayBuffer
          );

          const wav = audioBufferToWav(audioBuffer);
          const wavBlob = new Blob([wav], { type: "audio/wav" });

          const audioUrl = URL.createObjectURL(wavBlob);
          setAudioUrl(audioUrl);

          downloadAudio(wavBlob, "recording.wav");
          audioChunksRef.current = [];
        });

        setIsRecording(true);
      })
      .catch((error) => {
        console.error("Error accessing microphone:", error);
      });
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setIsRecording(false);
  };

  const audioBufferToWav = (buffer) => {
    const wav = new WaveFile();
    const samples = buffer.getChannelData(0);
    wav.fromScratch(1, buffer.sampleRate, "32f", samples);
    return wav.toBuffer();
  };

  const downloadAudio = (blob, filename) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      {audioUrl && <audio controls src={audioUrl}></audio>}
    </div>
  );
};

export default RecordAudio;
