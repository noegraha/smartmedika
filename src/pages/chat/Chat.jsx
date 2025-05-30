import React, { useContext, useState } from "react";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { Badge, Button, Col, List, Row } from "antd";
import { ChatContext } from "./Chatcontext";
import ChatWindow2 from "./ChatWindow2";

const Chat = () => {
  const user = sessionStorage.getItem("userId");
  const {
    sendMessage,
    chat,
    tampilpesan,
    tampilpesanbalas,
    listuser,
    setId,
    id,
  } = useContext(ChatContext);
  const onId = (e) => {
    setId(e);
    console.log(e);
  };
  return (
    <div>
      <Row>
        <Col span={6}>
          <List
            size="small"
            header={
              <div>
                List User Online <Badge color="green" status="processing" />
              </div>
            }
            bordered
            dataSource={listuser}
            renderItem={(listuser) => (
              <List.Item
                actions={[
                  <Button
                    type={listuser.userId === id ? "primary" : "link"}
                    size="small"
                    onClick={(e) => onId(listuser.userId)}
                    disabled={listuser.userId === user ? true : false}
                  >
                    Pilih
                  </Button>,
                ]}
              >
                {listuser.userId}
              </List.Item>
            )}
          />
        </Col>
        <Col span={18}>
          <ChatInput sendMessage={sendMessage} />
          <hr />
          <Row>
            <Col span={24}>
              <ChatWindow chat={tampilpesan} />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Chat;
