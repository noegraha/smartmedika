// src/components/FloatingChatbot.js
import React, { useState } from "react";
import { Popover, Button } from "antd";
import Chatbot from "./chatbot";
import { MessageOutlined } from "@ant-design/icons";
const style = {
  width: "300vw",
  height: "300vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const FloatingChatbot = () => {
  React.useEffect(() => {
    document.documentElement.scrollTop = document.documentElement.clientHeight;
    document.documentElement.scrollLeft = document.documentElement.clientWidth;
  }, []);
  const [visible, setVisible] = useState(false);

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
  };

  const content = (
    <div style={{ width: "400px" }}>
      <Chatbot />
    </div>
  );

  return (
    <div>
      <Popover
        content={content}
        title="Chatbot AI"
        trigger="click"
        open={visible}
        onOpenChange={handleVisibleChange}
        placement="leftBottom" // Anda bisa mengubah posisi sesuai kebutuhan
      >
        <Button
          shape="circle"
          type="primary"
          style={{ position: "fixed", bottom: 50, right: 50 }}
          icon={<MessageOutlined />}
        />
      </Popover>
    </div>
  );
};

export default FloatingChatbot;
