import React, { useState } from "react";

const VoiceToText = () => {
  const [transcript, setTranscript] = useState("");
  const [isListening, setIsListening] = useState(false);

  const recognition = new window.webkitSpeechRecognition();
  recognition.continuous = true;
  recognition.interimResults = true;
  recognition.lang = "id-ID"; // Set language to Indonesian

  recognition.onstart = () => {
    setIsListening(true);
  };

  recognition.onresult = (event) => {
    const currentTranscript = Array.from(event.results)
      .map((result) => result[0].transcript)
      .join("");

    setTranscript(currentTranscript);
  };

  recognition.onend = () => {
    setIsListening(false);
  };

  const toggleListening = () => {
    if (isListening) {
      recognition.abort();
    } else {
      recognition.start();
    }
  };

  return (
    <div>
      <h1>Voice to Text</h1>
      <button onClick={toggleListening}>
        {isListening ? "Stop Listening" : "Start Listening"}
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default VoiceToText;
