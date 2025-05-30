import React from "react";
import {
  Col,
  Row,
  Form,
  Card,
  Button,
  Radio,
  Input,
  TimePicker,
  Select,
  InputNumber,
} from "antd";
import Checkbox from "antd/lib/checkbox/Checkbox";
import TextArea from "antd/lib/input/TextArea";
import dayjs from "dayjs";
import PemeriksaanFisikHD from "../komponen/PemeriksaanFisikHD";

const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}

const FormIntruksiMedik = () => {
  const layout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
  };
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const format = "HH:mm";

  return (
    // <div>
    <Form>
      <Card
        size="small"
        title="Intruksi Medik"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          marginBottom: 6,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            Intruksi Medik
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Select style={{ width: "100%" }} onChange={handleChange}>
                <Option value="INISIASI">Inisiasi</Option>
                <Option value="AKUT">Akut</Option>
                <Option value="RUTIN">Rutin</Option>
                <Option value="PRE-OP">Pre-OP</Option>
                <Option value="SLED">SLED</Option>
              </Select>
            </Form.Item>
            Dialisat
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Select
                style={{ width: "100%" }}
                onChange={handleChange}
                defaultValue="BICARBONAT"
              >
                <Option value="BICARBONAT">Bicarbonat</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            Durasi
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="jam" placeholder="..." />
            </Form.Item>
            QB
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="ml/menit" placeholder="..." />
            </Form.Item>
            QD
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="ml/menit" placeholder="..." />
            </Form.Item>
          </Col>
          <Col span={8}>
            UF Goal
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="ml" placeholder="..." />
            </Form.Item>
            Conductivity
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="" placeholder="..." />
            </Form.Item>
            Temperatur
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="°C" step={0.1} placeholder="..." />
            </Form.Item>
          </Col>
          {/* <Col span={6}>
                                                Waktu Mulai
                                                <br />
                                                <Form.Item style={{ marginBottom: 0 }}>
                                                    <TimePicker defaultValue={dayjs('00:00', format)} format={format} style={{ width: '100%' }} />
                                                </Form.Item>
                                                Waktu Selesai (Target)
                                                <br />
                                                <Form.Item style={{ marginBottom: 0 }}>
                                                    <TimePicker defaultValue={dayjs('00:00', format)} format={format} style={{ width: '100%' }} />
                                                </Form.Item>
                                                Waktu Selesai (Real)
                                                <br />
                                                <Form.Item style={{ marginBottom: 0 }}>
                                                    <TimePicker defaultValue={dayjs('00:00', format)} format={format} style={{ width: '100%' }} />
                                                </Form.Item>
                                            </Col>
                                            <Col span={6}>
                                                Kt/V
                                                <br />
                                                <Form.Item style={{ marginBottom: 0 }}>
                                                    <Input
                                                        type="number"
                                                        suffix=""
                                                        placeholder="..."
                                                    />
                                                </Form.Item>
                                            </Col> */}
          {/* </Row> */}
          {/* </Card> */}
          {/* </Col> */}
        </Row>
        {/* <Form.Item label="Prog. Profiling" style={{ marginBottom: 5 }}> */}
        Prog. Profiling
        <br />
        <Row gutter={[16, 16]}>
          <Col span={4}>
            Na
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="mmol/lt" placeholder="..." />
            </Form.Item>
          </Col>
          <Col span={4}>
            Na Concentrat
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="mmol/lt" placeholder="..." />
            </Form.Item>
          </Col>
          <Col span={16}>
            UF
            <br />
            <Row gutter={[8, 8]} style={{ alignItems: "center" }}>
              <Col span={4}>
                <Input type="number" suffix="ml" placeholder="..." />
              </Col>
              {" / "}
              <Col span={4}>
                <Input type="number" suffix="ml" placeholder="..." />
              </Col>
              {" / "}
              <Col span={4}>
                <Input type="number" suffix="ml" placeholder="..." />
              </Col>
              {" / "}
              <Col span={4}>
                <Input type="number" suffix="ml" placeholder="..." />
              </Col>
              {" / "}
              <Col span={4}>
                <Input type="number" suffix="ml" placeholder="..." />
              </Col>
            </Row>
          </Col>
        </Row>
        {/* </Form.Item> */}
      </Card>
      <Card
        size="small"
        title="Heparinisasi"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          marginBottom: 6,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            Heparinisasi
            <Form.Item style={{ marginBottom: 0 }}>
              <Select
                style={{ width: "100%" }}
                onChange={handleChange}
                // value={heparinisasiId}
              >
                <Option value={1}>Dengan Heparin</Option>
                <Option value={0}>Tanpa Heparin</Option>
              </Select>
              {/* {alergiId === 1 ? <Input /> : null} */}
            </Form.Item>
            {/* <Form.Item label="Heparinisasi">
                                            <Row style={{ alignItems: "center" }}>
                                                <Radio.Group>
                                                    <Radio value={1}>Dengan Heparin</Radio>
                                                    <Radio value={0}>Tanpa Heparin</Radio>
                                                </Radio.Group>
                                                <Input style={{ width: "80%" }} placeholder="Penyebab" />
                                            </Row>
                                        </Form.Item> */}
          </Col>
          <Col span={8}>
            Dosis Sirkulasi
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="iu" placeholder="..." />
            </Form.Item>
            Dosis Awal
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="iu" placeholder="..." />
            </Form.Item>
          </Col>
          <Col span={8}>
            Dosis Maintenance Continue
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="iu/jam" placeholder="..." />
            </Form.Item>
            Dosis Maintenance Intermiten
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input type="number" suffix="iu/jam" placeholder="..." />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card
        size="small"
        title="Pemeriksaan Fisik"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          marginBottom: 6,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <PemeriksaanFisikHD />
      </Card>

      <Card
        size="small"
        title="Terapi Selama HD"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          marginBottom: 6,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <TextArea rows={3} />
      </Card>

      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Form.Item style={{ marginBottom: 0 }}>
            Dokter Penanggung Jawab
            <br />
            <img
              style={{
                width: 200,
                height: 90,
                backgroundColor: "#fff",
                borderStyle: "solid",
                borderRadius: 10,
                borderWidth: 1,
              }}
              // src={tandatangan}
              // onClick={onVerified}
              alt="Klik Disini untuk Tanda Tangan"
            />
          </Form.Item>
        </Col>
      </Row>

      <Row style={{ marginTop: 10 }}>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" onClick={(e) => onSubmit(e)}>
            Simpan
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormIntruksiMedik;
