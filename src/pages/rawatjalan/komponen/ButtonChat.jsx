import React, { useContext, useState } from "react";
import { CommentOutlined } from "@ant-design/icons";
import { Button, Divider, Drawer, FloatButton, Input } from "antd";
import axios from "axios";
import { ChatContext } from "../../chat/Chatcontext";

const ButtonChat = () => {
  const { message } = useContext(ChatContext);
  const [open, setOpen] = useState(false);
  const [text, setText] = useState(null);
  const [ruang, setRuang] = useState(null);
  const [sender, setSender] = useState(null);
  const sendTele = () => {
    axios
      .post("http://182.168.7.251:5588/api/Chat/TelegramChat", data)
      .then((res) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
  };
  const data = {
    text: text,
    ruangan: ruang,
    pengirim: sender,
  };
  return (
    <div>
      <FloatButton
        icon={<CommentOutlined />}
        type="primary"
        // badge={{
        //   count: message.length,
        // }}
        onClick={() => setOpen(true)}
      />
      <Drawer
        title="Basic Chat"
        placement="right"
        onClose={() => setOpen(false)}
        open={open}
      >
        <div>
          <p>
            Ruang : <Input onChange={(e) => setRuang(e.target.value)} />
          </p>
          <p>
            Sender : <Input onChange={(e) => setSender(e.target.value)} />
          </p>
          <p>
            Text :{" "}
            <Input
              onChange={(e) => setText(e.target.value)}
              onPressEnter={(e) => setText(e.target.value)}
            />
          </p>
          <Button onClick={() => sendTele()}>Send</Button>
          <Divider />
          {message}
        </div>
      </Drawer>
    </div>
  );
};

export default ButtonChat;
