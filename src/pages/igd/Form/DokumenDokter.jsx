import {
  Affix,
  Button,
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
} from "antd/es";
import TextArea from "antd/es/input/TextArea";
import React from "react";
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const { Option } = Select;

const DokumenDokter = () => {
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
          title="RM 01 ( Dokter )"
          size="small"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Form {...formItemLayout} labelWrap labelAlign="left">
            <Form.Item label="Dokter">
              <Select style={{ width: "25%" }}>
                <Option key="1">ABDILLAH Dr.</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Perawat">
              <Select style={{ width: "25%" }}>
                <Option key="1">AGUNG SUSILO</Option>
              </Select>
            </Form.Item>
            <Divider
              orientation="center"
              style={{ backgroundColor: "#ffc53d", margin: "0px" }}
            >
              Pengkajian Medis
            </Divider>
            <Divider
              orientation="center"
              style={{ backgroundColor: "#d9f7be", margin: "0px" }}
            >
              Subyektif
            </Divider>
            <Form.Item label="Triase">
              <Select style={{ width: "25%" }}>
                <Option key="1">Prioritas 1</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Tanggal Periksa">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Triase">
              <Select style={{ width: "25%" }}>
                <Option key="1">Prioritas 1</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Keluhan">
              <TextArea />
              <TextArea />
            </Form.Item>
            <Form.Item label="Anamnesa (Perawat)">
              <TextArea />
            </Form.Item>
            <Form.Item label="Jenis Anamnesa">
              <Select style={{ width: "25%" }}>
                <Option key="1">Auto Anamnesa</Option>
                <Option key="1">Allo Anamnesa</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Anamnesa (Dokter)">
              <TextArea />
            </Form.Item>
            <Form.Item label="RPD">
              <TextArea />
            </Form.Item>
            <Form.Item label="Obat yang diminum saat ini">
              <TextArea />
            </Form.Item>
            <Divider
              orientation="center"
              style={{ backgroundColor: "#d9f7be", margin: "0px" }}
            >
              Obyektif
            </Divider>
            <Form.Item label="Keadaan Umum">
              <TextArea />
            </Form.Item>
            <Form.Item label="GCS">
              E : <Input style={{ width: "10%" }} /> V:{" "}
              <Input style={{ width: "10%" }} /> M:{" "}
              <Input style={{ width: "10%" }} /> Keterangan :{" "}
              <Input style={{ width: "10%" }} />
            </Form.Item>
            <Form.Item label="Tekanan Darah">
              <Input style={{ width: "10%" }} /> /{" "}
              <Input style={{ width: "10%" }} /> mm/Hg
            </Form.Item>
            <Form.Item label="Pernafasan">
              <Input style={{ width: "10%" }} /> x/menit
            </Form.Item>
            <Form.Item label="SpO2">
              <Input style={{ width: "10%" }} />
            </Form.Item>
            <Form.Item label="Nadi">
              <Input style={{ width: "10%" }} /> x/menit
            </Form.Item>
            <Form.Item label="Suhu">
              <Input style={{ width: "10%" }} /> C
            </Form.Item>
            <Form.Item label="Akral">
              <Input style={{ width: "10%" }} /> VAS :{" "}
              <Input style={{ width: "10%" }} />
            </Form.Item>
          </Form>
          <Affix offsetBottom={10}>
            <Card>
              <Row>
                <Col span={24} style={{ display: "flex", alignItems: "end" }}>
                  <Button type="primary">Simpan</Button>
                </Col>
              </Row>
            </Card>
          </Affix>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default DokumenDokter;
