import React from "react";
import { Col, Row, Form, Card, Button, Input } from "antd";

const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const FormPostHD = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const onTDSistolik = (e) => {
    // setSuhu(e.target.value);
  };
  const onTDDiastolik = (e) => {
    // setSuhu(e.target.value);
  };

  return (
    <Form>
      <Card
        size="small"
        title="Post HD"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          marginBottom: 6,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Card>
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  TD Sistolik
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="mmHg"
                      placeholder="..."
                      // value={suhu}
                      onChange={(e) => onTDSistolik(e)}
                    />
                  </Form.Item>
                  TD Diastolik
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="mmHg"
                      placeholder="..."
                      // value={suhu}
                      onChange={(e) => onTDDiastolik(e)}
                    />
                  </Form.Item>
                  Suhu
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="°C"
                      step={0.1}
                      placeholder="..."
                      // value={suhu}
                      // onChange={(e) => onSuhu(e)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  Nadi
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="x/menit"
                      placeholder="..."
                      // value={nadi}
                      // onChange={(e) => onFrekuensiNadi(e)}
                    />
                  </Form.Item>
                  RR
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="x/menit"
                      placeholder="..."
                      // value={saturasi}
                      // onChange={(e) => onSaturasiOksigen(e)}
                    />
                  </Form.Item>
                  Berat Badan
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="kg"
                      step={0.1}
                      placeholder="..."
                      data-role="keypad"
                      // value={berat}
                      // onChange={(e) => onBeratBadan(e)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={12}>
            <Card>
              <Row gutter={[16, 8]}>
                <Col span={12}>
                  Volume Sisa Priming
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="ml"
                      placeholder="..."
                      // value={sistolik}
                      // onChange={(e) => onSistolik(e)}
                    />
                  </Form.Item>
                  In Take Oral/Makanan/Minuman
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="ml"
                      placeholder="..."
                      // value={diastolik}
                      // onChange={(e) => onDiastolik(e)}
                    />
                  </Form.Item>
                  Loading NaCl 0,9% / Terapi
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="ml"
                      placeholder="..."
                      // value={nadi}
                      // onChange={(e) => onFrekuensiNadi(e)}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  Transfusi (A, B, O, AB)
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="ml"
                      placeholder="..."
                      // value={sistolik}
                      // onChange={(e) => onSistolik(e)}
                    />
                  </Form.Item>
                  Bilas Akhir
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="ml"
                      placeholder="..."
                      // value={diastolik}
                      // onChange={(e) => onDiastolik(e)}
                    />
                  </Form.Item>
                  Total
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      suffix="ml"
                      defaultValue="0"
                      disabled
                      // value={nadi}
                      // onChange={(e) => onFrekuensiNadi(e)}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Card>
      <Card
        size="small"
        title="Discharge Planning"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          marginBottom: 6,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="S"
              style={{ marginBottom: 5 }}
            >
              <TextArea rows={3} placeholder="..." />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="O"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={3} placeholder="..." />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="A"
              style={{ marginBottom: 5 }}
            >
              <TextArea
                rows={3}
                placeholder="CKD Post Hemodialisis, Diagnosa Keperawatan"
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="P"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={3} placeholder="Catatan HD y.a.d" />
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Row style={{ textAlign: "right" }}>
        <Col span={12}>
          <Form.Item style={{ marginBottom: 0 }}>
            Akses Vaskuler Oleh
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
        <Col span={12}>
          <Form.Item style={{ marginBottom: 0 }}>
            Perawat Penanggung Jawab
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
      <Row>
        <Col span={24} style={{ textAlign: "right", marginTop: 10 }}>
          <Button type="primary" htmlType="submit" onClick={(e) => onSubmit(e)}>
            Simpan
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormPostHD;
