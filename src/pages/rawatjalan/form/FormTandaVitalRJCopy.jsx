import React, { useContext } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Card,
  Tooltip,
  InputNumber,
} from "antd";
import { AnamnesaContext } from "../context/AnamnesaContext";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context/LoginContext";
import dayjs from "dayjs";
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 22 },
};
const { Option } = Select;
const FormTandaVitalRJ = () => {
  const {
    insertTandavital,
    sistolik,
    diastolik,
    suhu,
    nadi,
    tinggi,
    berat,
    saturasi,
    iramanadi,
    nafas,
    skornyeri,
    resikojatuh,
    setSistolik,
    setDiastolik,
    setNadi,
    setSuhu,
    setTinggi,
    setBerat,
    setSaturasi,
    setIramaNadi,
    setNafas,
    setSkorNyeri,
    setResikoJatuh,
  } = useContext(AnamnesaContext);
  const { curpas } = useContext(PasienContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datatanda = {
    registrasiId: curpas.registrasiId,
    ruangId: curpas.ruangId,
    pegawaiId: curpas.dokterId,
    tanggal: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    jam: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    tekananDarahSistolik: sistolik === null ? null : parseInt(sistolik),
    tekananDarahDiastolik: diastolik === null ? null : parseInt(diastolik),
    suhuTubuh: suhu === null ? null : parseFloat(suhu),
    frekuensiNadi: nadi === null ? null : parseInt(nadi),
    iramaNadi: iramanadi,
    frekuensiNafas: nafas === null ? null : parseInt(nafas),
    skorNyeri: skornyeri === null ? null : parseInt(skornyeri),
    saturasiOksigen: saturasi === null ? null : parseInt(saturasi),
    tinggiBadan: tinggi === null ? null : parseFloat(tinggi),
    beratBadan: berat === null ? null : parseFloat(berat),
    resikojatuh: resikojatuh,
    userId: namauser,
    clientHost: host,
    clientIp: ip,
  };
  const simpanTandavital = (e) => {
    e.preventDefault();
    insertTandavital(datatanda);
    console.log("tanda vital", datatanda);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    simpanTandavital(e);
  };
  const IMT = (berat / Math.pow(tinggi, 2)) * 10000;
  const IMTket =
    IMT < 18.5
      ? "BB Kurang"
      : IMT < 25
      ? "BB Normal"
      : IMT < 30
      ? "BB Overweight dg Resiko"
      : IMT < 40
      ? "Obesitas I"
      : "Obesitas II";
  const styleku = isNaN(IMT)
    ? { width: "75%" }
    : IMT < 18.5
    ? { backgroundColor: "lightcyan", width: "75%" }
    : IMT < 25
    ? { backgroundColor: "lightgreen", width: "75%" }
    : IMT < 30
    ? { backgroundColor: "lightblue", width: "75%" }
    : IMT < 40
    ? { backgroundColor: "lightpink", width: "75%" }
    : { backgroundColor: "lightcoral", width: "75%" };
  return (
    <div>
      <Form onFinish={(e) => onSubmit(e)}>
        <Card
          size="small"
          title="Tanda Vital"
          headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
          style={{
            marginBottom: 5,
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Row gutter={[16, 16]}>
            <Col span={6} xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Tensi"
                labelAlign="left"
                {...formItemLayout}
              >
                <Tooltip title="Tensi Atas">
                  <InputNumber
                    placeholder="..."
                    value={sistolik}
                    onChange={(e) => setSistolik(e)}
                    maxLength={3}
                    max={200}
                    min={20}
                    style={{ width: "37%" }}
                  />
                </Tooltip>
                <Tooltip title="Tensi Bawah">
                  <InputNumber
                    placeholder="..."
                    value={diastolik}
                    onChange={(e) => setDiastolik(e)}
                    maxLength={3}
                    max={200}
                    min={20}
                    style={{ width: "37%" }}
                  />
                </Tooltip>
                <Input value={"Mmhg"} disabled style={{ width: "26%" }} />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Nadi"
                labelAlign="left"
                {...formItemLayout}
              >
                <InputNumber
                  placeholder="..."
                  value={nadi}
                  onChange={(e) => setNadi(e)}
                  maxLength={2}
                  max={99}
                  min={0}
                  style={{ width: "74%" }}
                />
                <Input value={"/Menit"} disabled style={{ width: "26%" }} />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Suhu"
                labelAlign="left"
                {...formItemLayout}
              >
                <InputNumber
                  placeholder="..."
                  value={suhu}
                  onChange={(e) => setSuhu(e)}
                  maxLength={2}
                  max={70}
                  min={10}
                  step={0.1}
                  style={{ width: "74%" }}
                  stringMode={true}
                />
                <Input value={"°C"} disabled style={{ width: "26%" }} />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Berat Badan"
                labelAlign="left"
                {...formItemLayout}
              >
                <InputNumber
                  stringMode
                  step={0.1}
                  placeholder="..."
                  value={berat}
                  onChange={(e) => setBerat(e)}
                  maxLength={3}
                  max={200}
                  min={0}
                  style={{ width: "74%" }}
                />
                <Input value={"Kg"} disabled style={{ width: "26%" }} />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Tinggi Badan"
                labelAlign="left"
                {...formItemLayout}
              >
                <InputNumber
                  stringMode
                  step={0.1}
                  placeholder="..."
                  value={tinggi}
                  onChange={(e) => setTinggi(e)}
                  maxLength={3}
                  max={300}
                  min={0}
                  style={{ width: "74%" }}
                />
                <Input value={"Cm"} disabled style={{ width: "26%" }} />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Saturasi O2"
                labelAlign="left"
                {...formItemLayout}
              >
                <InputNumber
                  placeholder="..."
                  value={saturasi}
                  onChange={(e) => setSaturasi(e)}
                  maxLength={3}
                  max={100}
                  min={0}
                  style={{ width: "74%" }}
                />
                <Input value={"%"} disabled style={{ width: "26%" }} />
              </Form.Item>
            </Col>
            <Col span={6} xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Frekuensi Nafas"
                labelAlign="left"
                {...formItemLayout}
              >
                <InputNumber
                  placeholder="..."
                  value={nafas}
                  onChange={(e) => setNafas(e)}
                  maxLength={3}
                  max={100}
                  min={0}
                  style={{ width: "74%" }}
                />
                <Input value={"/Menit"} disabled style={{ width: "26%" }} />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Irama Nadi"
                labelAlign="left"
                {...formItemLayout}
              >
                <Select
                  defaultValue="Teratur"
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={iramanadi}
                  onChange={(e) => setIramaNadi(e)}
                >
                  <Option value="Teratur">Teratur</Option>
                  <Option value="Tidak Teratur">Tidak Teratur</Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Skala Nyeri"
                labelAlign="left"
                {...formItemLayout}
              >
                <Select
                  defaultValue={1}
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={skornyeri}
                  onChange={(e) => setSkorNyeri(e)}
                >
                  <Option value={1}>Tidak Nyeri (0)</Option>
                  <Option value={2}>Nyeri Ringan (1-2-3)</Option>
                  <Option value={3}>Nyeri Sedang (4-5-6)</Option>
                  <Option value={4}>Nyeri Berat (7-8-9-10)</Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 0 }}
                label="Resiko Jatuh"
                labelAlign="left"
                {...formItemLayout}
              >
                <Select
                  defaultValue={1}
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={resikojatuh}
                  onChange={(e) => setResikoJatuh(e)}
                >
                  <Option value={1}>Tidak Ada Resiko</Option>
                  <Option value={2}>Resiko Rendah</Option>
                  <Option value={3}>Resiko Tinggi</Option>
                </Select>
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="IMT"
                labelAlign="left"
                {...formItemLayout}
              >
                <Input.Group compact>
                  <Input
                    style={{ width: "25%" }}
                    value={isNaN(IMT) ? "" : IMT.toFixed(2)}
                    placeholder="..."
                  />
                  <Input
                    style={styleku}
                    value={isNaN(IMT) ? null : IMTket}
                    placeholder="..."
                  />
                </Input.Group>
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Row>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={(e) => onSubmit(e)}
                    >
                      Simpan
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default FormTandaVitalRJ;
