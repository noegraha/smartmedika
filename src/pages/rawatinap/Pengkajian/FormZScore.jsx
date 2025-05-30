import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import React, { useState } from "react";
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { Option } = Select;

const FormZScore = () => {
  const [tinggiBadan, settinggiBadan] = useState("");
  const [beratBadan, setberatBadan] = useState("");
  const [umur, setumur] = useState("");
  const [lila, setLila] = useState("");

  const IMT = (beratBadan / Math.pow(tinggiBadan / 100, 2)).toFixed(2);

  const KeteranganImt =
    IMT < 18.5
      ? "Berat Badan Kurang (Underweight)"
      : IMT >= 18.5 && IMT <= 22.9
      ? "Berat Badan Normal"
      : IMT >= 23 && IMT <= 24.9
      ? "Kelebihan Berat Badan (Overweight) Dengan Resiko"
      : IMT >= 25 && IMT <= 29.9
      ? "Obesitas I"
      : IMT >= 30
      ? "Obesitas II"
      : "-";

  return (
    <div>
      <Card size="small">
        <Row gutter={[10, 10]}>
          <Col span={12}>
            <Form.Item
              label="umur bulan"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input
                suffix="Bulan"
                type="text"
                style={{ width: "100%" }}
                min={0.1}
                step={0.1}
                placeholder="..."
                value={umur}
                onChange={(e) => {
                  setumur(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Button onClick={() => {}}>Hitung</Button>
          </Col>
        </Row>

        <Row gutter={[8, 8]}>
          <Col span={1} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Item
              label="Berat Badan"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input
                suffix="Kg"
                type="text"
                style={{ width: "100%" }}
                min={0.1}
                step={0.1}
                placeholder="..."
                value={beratBadan}
                onChange={(e) => {
                  setberatBadan(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="PB/U"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
              // hidden={stspbnak}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                placeholder="..."
                value={""}
                // hidden={stspbnak}
              />
              <Input.Group compact>
                <Input
                  style={{ width: "25%" }}
                  value="-2.55"
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "75%" }}
                  value="Sangat Pendek"
                  placeholder="..."
                  disabled
                />
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="TB/U"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
              // hidden={ststbnak}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                placeholder="..."
                value={""}
                // hidden={ststbnak}
              />
              <Input.Group compact>
                <Input
                  style={{ width: "25%" }}
                  value="-2.55"
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "75%" }}
                  value="Sangat Pendek"
                  placeholder="..."
                  disabled
                />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={1} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Item
              label="Tinggi Badan"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input
                suffix="Cm"
                type="text"
                style={{ width: "100%" }}
                placeholder="..."
                value={tinggiBadan}
                onChange={(e) => {
                  settinggiBadan(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              label="BB/PB"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
              // hidden={stspbnak}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                placeholder="..."
                value={""}
                // hidden={stspbnak}
              />
              <Input.Group compact>
                <Input
                  style={{ width: "25%" }}
                  value="-2.55"
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "75%" }}
                  value="Sangat Pendek"
                  placeholder="..."
                  disabled
                />
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="BB/TB"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
              // hidden={ststbnak}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                placeholder="..."
                value={""}
                // hidden={ststbnak}
              />
              <Input.Group compact>
                <Input
                  style={{ width: "25%" }}
                  value="-2.55"
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "75%" }}
                  value="Sangat Pendek"
                  placeholder="..."
                  disabled
                />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={1} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Item
              label="LILA"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input
                type="number"
                min={0}
                suffix="Cm"
                style={{ width: "100%" }}
                placeholder="..."
                value={lila}
                onChange={(e) => {
                  setLila(e.target.value);
                }}
              />
            </Form.Item>

            <Form.Item
              label="BB/U"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                placeholder="..."
                value={""}
              />
              <Input.Group compact>
                <Input
                  style={{ width: "25%" }}
                  value="-2.55"
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "75%" }}
                  value="Sangat Pendek"
                  placeholder="..."
                  disabled
                />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={1} xs={12} sm={12} md={6} lg={6} xl={6}>
            <Form.Item
              label="IMT"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input.Group compact>
                <Input
                  // suffix="(Kg/M2)"
                  style={{ width: "40%" }}
                  value={IMT}
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "60%" }}
                  // value="Sangat Pendek"
                  placeholder="..."
                  disabled
                  value={KeteranganImt}
                />
              </Input.Group>
              <Input.Group compact>
                <Input
                  style={{ width: "25%" }}
                  value="-2.55"
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "75%" }}
                  value="Sangat Pendek"
                  placeholder="..."
                  disabled
                />
              </Input.Group>
            </Form.Item>
            <Form.Item
              label="IMT/U"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                placeholder="..."
                value={""}
              />
              <Input.Group compact>
                <Input
                  style={{ width: "25%" }}
                  value="-2.55"
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "75%" }}
                  value="Sangat Pendek"
                  placeholder="..."
                  disabled
                />
              </Input.Group>
            </Form.Item>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FormZScore;
