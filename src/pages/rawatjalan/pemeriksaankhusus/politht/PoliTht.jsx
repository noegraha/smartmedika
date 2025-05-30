import React, { useContext } from "react";
import { Col, Row, Radio, Card, Input, Button, Form } from "antd";
import { PoliTHTContext } from "../../context/pemeriksaancontext/PoliTHTContext";
import { PasienContext } from "../../context/PasienContext";
const { TextArea } = Input;
const radioStyle = {
  display: "block",
};
const PoliTht = () => {
  const { curpas } = useContext(PasienContext);
  const {
    keteranganHasil,
    setketeranganHasil,
    ketulianKanan,
    setketulianKanan,
    ketulianKiri,
    setketulianKiri,
    tingkatKanan,
    settingkatKanan,
    tingkatKiri,
    settingkatKiri,
    insertTHT,
  } = useContext(PoliTHTContext);
  const onKetulianKiri = (e) => {
    setketulianKiri(e.target.value);
  };
  const onKetulianKanan = (e) => {
    setketulianKanan(e.target.value);
  };
  const onTingkatKiri = (e) => {
    settingkatKiri(e.target.value);
  };
  const onTingkatKanan = (e) => {
    settingkatKanan(e.target.value);
  };
  const onKeterangan = (e) => {
    setketeranganHasil(e.target.value);
  };
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dataTHT = {
    registrasiId: curpas.registrasiId,
    // hasilId: "1",
    // pelayananId: "D1",
    ruangId: curpas.ruangId,
    // tanggalPemeriksaan: curpas.tanggalMasuk,
    dokterId: curpas.dokterId,
    keteranganHasil: keteranganHasil,
    ketulianKanan: ketulianKanan,
    ketulianKiri: ketulianKiri,
    tingkatKanan: tingkatKanan,
    tingkatKiri: tingkatKiri,
    clientHost: host,
    clientIP: ip,
  };
  const simpanTHT = () => {
    insertTHT(dataTHT);
    console.log(dataTHT);
  };
  return (
    <div>
      <Card
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        title="Audiometri"
      >
        <Form onFinish={simpanTHT}>
          <Row>
            <Col span={4} xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card size="small" style={{ textAlign: "center" }}>
                Kanan
              </Card>
              <Row>
                <Col span={4} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Card size="small" title="Ketulian">
                    <Radio.Group onChange={onKetulianKiri} value={ketulianKiri}>
                      <Radio style={radioStyle} value="Konduksi">
                        Konduksi
                      </Radio>
                      <Radio style={radioStyle} value="Persepsi">
                        Persepsi
                      </Radio>
                      <Radio style={radioStyle} value="Campuran">
                        Campuran
                      </Radio>
                      <Radio style={radioStyle} value="Normal">
                        Normal
                      </Radio>
                    </Radio.Group>
                  </Card>
                </Col>
                <Col span={4} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Card size="small" title="Volume">
                    <Radio.Group onChange={onTingkatKiri} value={tingkatKiri}>
                      <Radio style={radioStyle} value="0 - 10">
                        0 - 10 db
                      </Radio>
                      <Radio style={radioStyle} value="10 - 20">
                        10 - 20 db
                      </Radio>
                      <Radio style={radioStyle} value="20 - 30">
                        20 - 30 db
                      </Radio>
                      <Radio style={radioStyle} value="30 - 40">
                        30 - 40 db
                      </Radio>
                      <Radio style={radioStyle} value="40 - 50">
                        40 - 50 db
                      </Radio>
                      <Radio style={radioStyle} value="50 - 60">
                        50 - 60 db
                      </Radio>
                      <Radio style={radioStyle} value="60 - 70">
                        60 - 70 db
                      </Radio>
                      <Radio style={radioStyle} value="70 - 80">
                        70 - 80 db
                      </Radio>
                      <Radio style={radioStyle} value="80 - 90">
                        80 - 90 db
                      </Radio>
                      <Radio style={radioStyle} value="90 - 100">
                        90 - 100 db
                      </Radio>
                      <Radio style={radioStyle} value="> 100">
                        &#62; 100
                      </Radio>
                    </Radio.Group>
                  </Card>
                </Col>
              </Row>
            </Col>

            <Col span={4} xs={24} sm={12} md={12} lg={8} xl={8}>
              <Card size="small" style={{ textAlign: "center" }}>
                Kiri
              </Card>
              <Row>
                <Col span={4} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Card size="small" title="Ketulian">
                    <Radio.Group
                      onChange={onKetulianKanan}
                      value={ketulianKanan}
                    >
                      <Radio style={radioStyle} value="Konduksi">
                        Konduksi
                      </Radio>
                      <Radio style={radioStyle} value="Persepsi">
                        Persepsi
                      </Radio>
                      <Radio style={radioStyle} value="Campuran">
                        Campuran
                      </Radio>
                      <Radio style={radioStyle} value="Normal">
                        Normal
                      </Radio>
                    </Radio.Group>
                  </Card>
                </Col>
                <Col span={4} xs={12} sm={12} md={12} lg={12} xl={12}>
                  <Card size="small" title="Volume">
                    <Radio.Group onChange={onTingkatKanan} value={tingkatKanan}>
                      <Radio style={radioStyle} value="0 - 10">
                        0 - 10 db
                      </Radio>
                      <Radio style={radioStyle} value="10 - 20">
                        10 - 20 db
                      </Radio>
                      <Radio style={radioStyle} value="20 - 30">
                        20 - 30 db
                      </Radio>
                      <Radio style={radioStyle} value="30 - 40">
                        30 - 40 db
                      </Radio>
                      <Radio style={radioStyle} value="40 - 50">
                        40 - 50 db
                      </Radio>
                      <Radio style={radioStyle} value="50 - 60">
                        50 - 60 db
                      </Radio>
                      <Radio style={radioStyle} value="60 - 70">
                        60 - 70 db
                      </Radio>
                      <Radio style={radioStyle} value="70 - 80">
                        70 - 80 db
                      </Radio>
                      <Radio style={radioStyle} value="80 - 90">
                        80 - 90 db
                      </Radio>
                      <Radio style={radioStyle} value="90 - 100">
                        90 - 100 db
                      </Radio>
                      <Radio style={radioStyle} value="> 100">
                        &#62; 100
                      </Radio>
                    </Radio.Group>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col span={4} xs={24} sm={24} md={24} lg={16} xl={16}>
              Keterangan :
              <TextArea
                row={3}
                onChange={(e) => onKeterangan(e)}
                value={keteranganHasil}
              />
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Simpan
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default PoliTht;
