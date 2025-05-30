import React, { useState, useRef } from "react";
import axios from "axios";
import { WaveFile } from "wavefile";

const SpeechToText = () => {
  const [transcript, setTranscript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef(null);
  const audioContextRef = useRef(
    new (window.AudioContext || window.webkitAudioContext)()
  );

  const startRecording = () => {
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;

        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", (event) => {
          audioChunks.push(event.data);
        });

        mediaRecorder.addEventListener("stop", async () => {
          const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
          const arrayBuffer = await audioBlob.arrayBuffer();
          const audioBuffer = await audioContextRef.current.decodeAudioData(
            arrayBuffer
          );

          const newAudioBuffer = await resampleAudioBuffer(audioBuffer, 16000);
          const wav = audioBufferToWav(newAudioBuffer);

          const formData = new FormData();
          formData.append(
            "file",
            new Blob([wav], { type: "audio/wav" }),
            "audio.wav"
          );

          axios
            .post("https://182.168.7.251:5577/BridgeGoogle/recognize", formData)
            .then((response) => {
              setTranscript(response.data.transcript);
              console.log("Success!");
            })
            .catch((error) => {
              console.error("Error transcribing audio:", error);
            });
        });

        mediaRecorder.start();
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

  const resampleAudioBuffer = async (audioBuffer, targetSampleRate) => {
    const numberOfChannels = audioBuffer.numberOfChannels;
    const offlineAudioContext = new OfflineAudioContext(
      numberOfChannels,
      audioBuffer.duration * targetSampleRate,
      targetSampleRate
    );
    const bufferSource = offlineAudioContext.createBufferSource();
    bufferSource.buffer = audioBuffer;
    bufferSource.connect(offlineAudioContext.destination);
    bufferSource.start(0);
    const renderedBuffer = await offlineAudioContext.startRendering();
    return renderedBuffer;
  };

  const audioBufferToWav = (buffer) => {
    const wav = new WaveFile();
    const samples = new Float32Array(buffer.getChannelData(0));
    wav.fromScratch(1, buffer.sampleRate, "32f", samples);
    return wav.toBuffer();
  };

  return (
    <div>
      <button onClick={isRecording ? stopRecording : startRecording}>
        {isRecording ? "Stop Recording" : "Start Recording"}
      </button>
      <div>
        <h3>Transcript</h3>
        <p>{transcript}</p>
      </div>
    </div>
  );
};

export default SpeechToText;
