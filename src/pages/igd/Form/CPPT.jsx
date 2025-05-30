import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  Row,
} from "antd";
import React from "react";
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const CPPT = () => {
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Card: { fontWeightStrong: "bolder", headerBg: "beige" },
            Form: { itemMarginBottom: 0 },
          },
        }}
      >
        <Card
          title="CPPT"
          size="small"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Divider
            orientation="center"
            style={{ backgroundColor: "#d9f7be", margin: "0px" }}
          >
            Pemeriksaan Fisik
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form {...formItemLayout}>
                <Form.Item label="GCS">
                  <Input prefix="E :" style={{ width: "30%" }} />
                  <Input prefix="V :" style={{ width: "30%" }} />
                  <Input prefix="M :" style={{ width: "30%" }} />
                </Form.Item>
                <Form.Item label="Tekanan Darah">
                  <Input style={{ width: "20%" }} /> /{" "}
                  <Input style={{ width: "20%" }} /> mm/Hg
                </Form.Item>
                <Form.Item label="Pernafasan">
                  <Input suffix="x/menit" />
                </Form.Item>
                <Form.Item label="SpO2">
                  <Input />
                </Form.Item>
                <Form.Item label="Tinggi Badan">
                  <Input />
                </Form.Item>
                <Form.Item label="Berat Badan">
                  <Input />
                </Form.Item>
              </Form>
            </Col>
            <Col span={12}>
              <Form {...formItemLayout}>
                <Form.Item label="Keterangan">
                  <Input />
                </Form.Item>
                <Form.Item label="Nadi">
                  <Input suffix="x/menit" />
                </Form.Item>
                <Form.Item label="Suhu">
                  <Input suffix="°C" />
                </Form.Item>
                <Form.Item label="Akral">
                  <Input />
                </Form.Item>
                <Form.Item label="Sifat">
                  <Input />
                </Form.Item>
              </Form>
            </Col>
          </Row>

          <Divider
            orientation="center"
            style={{ backgroundColor: "#d9f7be", margin: "0px" }}
          >
            Subjektif
          </Divider>
          <TextArea />
          <Divider
            orientation="center"
            style={{ backgroundColor: "#d9f7be", margin: "0px" }}
          >
            Objektif
          </Divider>
          <TextArea />
          <Divider
            orientation="center"
            style={{ backgroundColor: "#d9f7be", margin: "0px" }}
          >
            Assessment
          </Divider>
          <TextArea />
          <Button type="primary" style={{ marginTop: "10px" }}>
            Simpan
          </Button>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default CPPT;
