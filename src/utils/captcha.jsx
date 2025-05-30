import { Button, Input, Typography } from "antd";
import React, { useEffect, useState } from "react";
const { Text } = Typography;
function CaptchaS() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    // Generate dua angka acak antara 1 dan 10
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
  }, []);

  const handleInputChange = (event) => {
    setUserAnswer(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const correctAnswer = num1 + num2;
    if (parseInt(userAnswer) === correctAnswer) {
      setError("");
      // Lakukan proses login di sini
      alert("Login berhasil!");
    } else {
      setError("Jawaban Anda salah. Silakan coba lagi.");
    }
  };

  return (
    <div className="fadeIn fourth">
      <form onSubmit={handleSubmit}>
        <Text code>
          Berapakah hasil dari {num1} + {num2}?
        </Text>
        <Input
          type="text"
          value={userAnswer}
          onChange={handleInputChange}
          //   placeholder="Masukkan jawaban"
          style={{ width: "20%" }}
        />
        <br />
        <Button
          htmlType="submit"
          type="primary"
          className="fadeIn fourth"
          style={{ width: "60%" }}
        >
          Login
        </Button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}

export default CaptchaS;
