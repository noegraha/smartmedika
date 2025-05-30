import React, { useState } from "react";
import {
  Card,
  Input,
  Button,
  DatePicker,
  Select,
  Form,
  Table,
  Space,
  Row,
  Col,
  Divider,
  ConfigProvider,
} from "antd";
import { SearchOutlined, CalendarOutlined } from "@ant-design/icons";
import moment from "moment";

const { Option } = Select;
const { TextArea } = Input;

const DokterKonsul = () => {
  const [form] = Form.useForm();

  // Sample data for the consultation history table
  const consultationData = [];

  // Set today's date as default
  const today = moment();

  // Column configuration for the consultation history table
  const columns = [
    {
      title: "TANGGAL",
      dataIndex: "tanggal",
      key: "tanggal",
    },
    {
      title: "DOKTER",
      dataIndex: "dokter",
      key: "dokter",
    },
    {
      title: "KONSULEN",
      dataIndex: "konsulen",
      key: "konsulen",
    },
  ];

  // Sample data for dropdowns
  const doctors = [
    { value: "ABDILLAH Dr.", label: "ABDILLAH Dr." },
    { value: "AHMAD Dr.", label: "AHMAD Dr." },
    { value: "SITI Dr.", label: "SITI Dr." },
  ];

  const purposes = [
    { value: "checkup", label: "Regular Checkup" },
    { value: "follow-up", label: "Follow-up Visit" },
    { value: "emergency", label: "Emergency" },
  ];

  const consultants = [
    { value: "consultant1", label: "Consultant 1" },
    { value: "consultant2", label: "Consultant 2" },
    { value: "consultant3", label: "Consultant 3" },
  ];

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: { fontWeightStrong: "bolder", headerBg: "beige" },
          Form: { itemMarginBottom: 0 },
        },
      }}
    >
      <Card
        title="Konsultasi Dokter"
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={<Button>Monitoring</Button>}
      >
        <Form form={form} layout="vertical">
          <Row gutter={16}>
            <Col span={12}>
              <Row align="middle" style={{ marginBottom: "10px" }}>
                <Col span={8}>
                  <label>No. Registrasi</label>
                </Col>
                <Col span={1}>:</Col>
                <Col span={15}>
                  <Space>
                    <Input style={{ width: "180px" }} />
                    <Button icon={<SearchOutlined />} type="primary">
                      Cari
                    </Button>
                  </Space>
                </Col>
              </Row>

              <Row align="middle" style={{ marginBottom: "10px" }}>
                <Col span={8}>
                  <label>No Pasien</label>
                </Col>
                <Col span={1}>:</Col>
                <Col span={15}>
                  <Space>
                    <Input style={{ width: "150px" }} />
                    <span>JK :</span>
                    <Input style={{ width: "30px" }} />
                  </Space>
                </Col>
              </Row>

              <Row align="middle" style={{ marginBottom: "10px" }}>
                <Col span={8}>
                  <label>Nama Pasien</label>
                </Col>
                <Col span={1}>:</Col>
                <Col span={15}>
                  <Input />
                </Col>
              </Row>

              <Row align="middle" style={{ marginBottom: "10px" }}>
                <Col span={8}>
                  <label>Tanggal Lahir</label>
                </Col>
                <Col span={1}>:</Col>
                <Col span={15}>
                  <DatePicker
                    format="DD/MM/YYYY"
                    style={{ width: "150px" }}
                    defaultValue={today}
                  />
                </Col>
              </Row>

              <Row align="middle" style={{ marginBottom: "10px" }}>
                <Col span={8}>
                  <label>Dokter</label>
                </Col>
                <Col span={1}>:</Col>
                <Col span={15}>
                  <Select
                    style={{ width: "100%" }}
                    defaultValue="ABDILLAH Dr."
                    options={doctors}
                  />
                </Col>
              </Row>

              <Row align="middle" style={{ marginBottom: "10px" }}>
                <Col span={8}>
                  <label>Tanggal Konsul</label>
                </Col>
                <Col span={1}>:</Col>
                <Col span={15}>
                  <Space>
                    <Input
                      style={{ width: "150px" }}
                      defaultValue="24/04/2025 07:46:21"
                      suffix={<CalendarOutlined />}
                    />
                  </Space>
                </Col>
              </Row>

              <Row align="middle" style={{ marginBottom: "10px" }}>
                <Col span={8}>
                  <label>SMF Tujuan</label>
                </Col>
                <Col span={1}>:</Col>
                <Col span={15}>
                  <Select style={{ width: "100%" }} options={purposes} />
                </Col>
              </Row>

              <Row align="middle" style={{ marginBottom: "10px" }}>
                <Col span={8}>
                  <label>Konsulen</label>
                </Col>
                <Col span={1}>:</Col>
                <Col span={15}>
                  <Select style={{ width: "100%" }} options={consultants} />
                </Col>
              </Row>
            </Col>

            <Col span={12}>
              <div
                style={{
                  border: "1px solid #d9d9d9",
                  padding: "10px",
                  borderRadius: "2px",
                }}
              >
                <h3>Riwayat Konsul</h3>
                <Table
                  columns={columns}
                  dataSource={consultationData}
                  pagination={false}
                  size="small"
                  bordered
                  style={{ marginTop: "10px" }}
                />
              </div>
            </Col>
          </Row>
        </Form>
        <Divider
          orientation="center"
          style={{ backgroundColor: "#d9f7be", margin: "0px" }}
        >
          Data Konsul
        </Divider>
        <Form form={form} layout="vertical" style={{ marginTop: "10px" }}>
          <Button type="primary">Ambil Data SOAP</Button>
          <Row align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <label>Subyektif</label>
            </Col>
            <Col span={1}>:</Col>
            <Col span={19}>
              <TextArea />
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <label>Objektif</label>
            </Col>
            <Col span={1}>:</Col>
            <Col span={19}>
              <TextArea />
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <label>Assessment</label>
            </Col>
            <Col span={1}>:</Col>
            <Col span={19}>
              <TextArea />
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <label>Plan</label>
            </Col>
            <Col span={1}>:</Col>
            <Col span={19}>
              <TextArea />
            </Col>
          </Row>
        </Form>
        <Divider
          orientation="center"
          style={{ backgroundColor: "#d9f7be", margin: "0px" }}
        >
          Jawab Konsul
        </Divider>
        <Form form={form} layout="vertical" style={{ marginTop: "10px" }}>
          <Row align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <label>Subyektif</label>
            </Col>
            <Col span={1}>:</Col>
            <Col span={19}>
              <TextArea />
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <label>Objektif</label>
            </Col>
            <Col span={1}>:</Col>
            <Col span={19}>
              <TextArea />
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <label>Assessment</label>
            </Col>
            <Col span={1}>:</Col>
            <Col span={19}>
              <TextArea />
            </Col>
          </Row>
          <Row align="middle" style={{ marginBottom: "10px" }}>
            <Col span={4}>
              <label>Plan</label>
            </Col>
            <Col span={1}>:</Col>
            <Col span={19}>
              <TextArea />
            </Col>
          </Row>
        </Form>
      </Card>
    </ConfigProvider>
  );
};

export default DokterKonsul;
