// src/components/Chatbot.js
import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Input, Button, List, Card, Typography, Spin, Select } from "antd";

const { TextArea } = Input;
const { Text } = Typography;

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("meta-llama-3.1-8b-instruct");
  const [listModel, setListModel] = useState([]);
  const messagesEndRef = useRef(null); // Referensi untuk elemen akhir daftar pesan
  // const API_URL = process.env.REACT_APP_API_BASE_SERVER; // Ubah jika pakai ngrok atau domain lain
  const API_URL = "http://172.16.99.119:5000";
  // const API_URL = "http://182.168.0.235:5000";

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const getModel = () => {
    axios
      .get(`${API_URL}/models`, { timeout: 5000 })
      .then((res) => {
        setListModel(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendMessage = async () => {
    if (input.trim() === "") return;

    // Menambahkan pesan pengguna ke state messages
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: "user", text: input },
    ]);
    setLoading(true);
    // Mengirim pesan ke API dan menunggu respons
    try {
      const response = await axios.post(`${API_URL}/chat`, {
        model: model, // Sesuaikan dengan model LM Studio
        messages: [{ role: "user", content: input }],
        max_tokens: 500,
        temperature: 0.7,
      });

      // Menambahkan pesan respons dari API ke state messages
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: response.data.choices[0].message.content },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Terjadi kesalahan saat mengirim pesan" },
      ]);
    } finally {
      setLoading(false);
    }

    // Mengosongkan input setelah mengirim pesan
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  // Scroll ke bawah setiap kali messages berubah
  useEffect(() => {
    // eslint-disable-next-line no-unused-expressions
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    getModel();
  }, [messages]);

  return (
    <>
      <div style={{ maxHeight: "500px", overflowY: "auto" }}>
        <List
          size="small"
          dataSource={messages}
          renderItem={(item) => (
            <List.Item>
              <Card
                style={{
                  maxWidth: "80%",
                  backgroundColor:
                    item.sender === "user" ? "#dcf8c6" : "#e0e0e0",
                  textAlign: item.sender === "user" ? "right" : "left",
                }}
              >
                <Text>{item.text}</Text>
              </Card>
            </List.Item>
          )}
        />
        {loading && (
          <List.Item>
            <Card size="small" style={{ textAlign: "center", width: "100%" }}>
              <Spin size="small" tip="Menunggu respons..." />
            </Card>
          </List.Item>
        )}
        <div ref={messagesEndRef} /> {/* Elemen untuk scroll ke bawah */}
      </div>
      <div style={{ marginTop: "20px" }}>
        Model :{" "}
        <Select
          style={{ width: "300px" }}
          size="small"
          showSearch
          placeholder="Select a person"
          optionFilterProp="label"
          value={model}
          onFocus={() => getModel()}
          onChange={(e) => setModel(e)}
          onSearch={(e) => console.log(`search ${e}`)}
          //   onFocus={() =>
          //     axios
          //       .get(`${API_URL}/models`)
          //       .then((res) => {
          //         setListModel(res.data.data);
          //       })
          //       .catch((err) => {
          //         console.log(err);
          //       })
          //   }
          options={listModel.map((item) => ({
            value: item.id,
            label: item.id,
          }))}
        />
        <TextArea
          disabled={loading}
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="Tulis pesan Anda..."
          autoSize={{ minRows: 2, maxRows: 6 }}
          style={{ marginBottom: "10px" }}
        />
        <Button type="primary" onClick={sendMessage} block loading={loading}>
          Kirim
        </Button>
      </div>
    </>
  );
};

export default Chatbot;
