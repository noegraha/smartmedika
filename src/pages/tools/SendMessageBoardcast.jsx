import {
  Button,
  Card,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  App,
} from "antd";
import React, { useState } from "react";
import { WarningOutlined } from "@ant-design/icons";

const { Option } = Select;
const { TextArea } = Input;

const SendMessageBoardcast = () => {
  const [appinfo, setAppInfo] = useState("Notifikasi Info");
  const [pesan, setMessage] = useState("");
  const [duration, setDuration] = useState(5);
  const [type, setType] = useState("info");
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);

  const datanotif = {
    appInfo: appinfo,
    message: pesan,
    countDown: duration,
    type: type,
  };

  const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
  };

  const sendNotifUser = (pesan) => {
    // socket.emit("broadcastMessage", pesan);
  };

  return (
    <App>
      <Card
        size="small"
        title="Broadcast Pesan"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
      >
        <Form {...formItemLayout}>
          <Form.Item label="Tipe">
            <Select
              placeholder="Tipe Notif..."
              style={{ width: "100%" }}
              value={type}
              onChange={(e) => setType(e)}
            >
              <Option value="success">Success</Option>
              <Option value="info">Info</Option>
              <Option value="warning">Warning</Option>
              <Option value="error">Error</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Judul">
            <Input
              value={appinfo}
              onChange={(e) => setAppInfo(e.target.value)}
              placeholder="Judul Info..."
            />
          </Form.Item>
          <Form.Item label="Isi Pesan">
            <TextArea
              rows={4}
              placeholder="Isi Pesan..."
              onChange={(e) => setMessage(e.target.value)}
              maxLength={250}
              showCount
            />
          </Form.Item>
          <Form.Item label="Durasi">
            <InputNumber
              addonAfter="Detik"
              value={duration}
              onChange={(e) => setDuration(e)}
              placeholder="Lama Durasi Pesan..."
            />
            <Button type="primary" onClick={() => sendNotifUser(datanotif)}>
              Kirim
            </Button>
          </Form.Item>
          <Form.Item label="Refresh">
            <Button
              onClick={() => setModal1(true)}
              type="primary"
              danger
              shape="round"
              icon={<WarningOutlined />}
              size={"Large"}
            >
              Refresh Semua Client
            </Button>
          </Form.Item>
        </Form>
      </Card>
      <Modal
        open={modal1}
        onOk={() => setModal2(true)}
        onCancel={() => setModal1(false)}
      >
        Apakah Yakin Akan Refresh Semua Client?
      </Modal>
      <Modal
        open={modal2}
        onOk={() => {
          setModal2(false);
          setModal1(false);
          // socket.emit("refreshClients");
        }}
        onCancel={() => setModal2(false)}
      >
        YAKIN YA??
      </Modal>
    </App>
  );
};

export default SendMessageBoardcast;
