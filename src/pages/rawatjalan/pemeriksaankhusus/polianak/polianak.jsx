import React, { Fragment, useContext } from "react";
import { Radio, Form, Input, Card, Button, Row } from "antd";
import { ImunisasiContext } from "../../context/pemeriksaancontext/ImunisasiContext";
import { PasienContext } from "../../context/PasienContext";

const options = [
  { label: "1", value: 1 },
  { label: "2", value: 2 },
  { label: "3", value: 3 },
  { label: "4", value: 4 },
  { label: "TK", value: 5 },
];
const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 18 },
};

const Polianak = () => {
  const { curpas } = useContext(PasienContext);
  const {
    insertImunisasi,
    bcg,
    setbcg,
    dpt,
    setdpt,
    polio,
    setpolio,
    campak,
    setcampak,
    tt,
    settt,
    dt,
    setdt,
    hepatitis,
    sethepatitis,
    tindakan,
    settindakan,
  } = useContext(ImunisasiContext);
  const onBCG = (e) => {
    setbcg(e.target.value);
  };
  const onDPT = (e) => {
    setdpt(e.target.value);
  };
  const onPolio = (e) => {
    setpolio(e.target.value);
  };
  const onCampak = (e) => {
    setcampak(e.target.value);
  };
  const onTT = (e) => {
    settt(e.target.value);
  };
  const onDT = (e) => {
    setdt(e.target.value);
  };
  const onHepatitis = (e) => {
    sethepatitis(e.target.value);
  };
  // const onTK = (e) => { settk(e.target.value) }
  const onTindakan = (e) => {
    settindakan(e.target.value);
  };
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dataimunisasi = {
    registrasiId: curpas.registrasiId,
    bcg: bcg,
    dpt: dpt,
    polio: polio,
    campak: campak,
    tt: tt,
    dt: dt,
    hepatitis: hepatitis,
    // tk: tk,
    tindakan: tindakan,
    clientHost: host,
    clientIP: ip,
  };
  const simpanImunisasi = () => {
    insertImunisasi(dataimunisasi);
    console.log(dataimunisasi);
  };
  return (
    <Fragment>
      <Form onFinish={simpanImunisasi}>
        <Card
          size="small"
          headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
            width: 380,
          }}
          title="Imunisasi"
        >
          <Form.Item
            {...formItemLayout}
            label="BCG :"
            style={{ marginBottom: 0 }}
          >
            <Radio.Group options={options} onChange={onBCG} value={bcg} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="DPT :"
            style={{ marginBottom: 0 }}
          >
            <Radio.Group options={options} onChange={onDPT} value={dpt} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="POLIO :"
            style={{ marginBottom: 0 }}
          >
            <Radio.Group options={options} onChange={onPolio} value={polio} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="CAMPAK :"
            style={{ marginBottom: 0 }}
          >
            <Radio.Group options={options} onChange={onCampak} value={campak} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="DT :"
            style={{ marginBottom: 0 }}
          >
            <Radio.Group options={options} onChange={onDT} value={dt} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="HEPATITIS :"
            style={{ marginBottom: 0 }}
          >
            <Radio.Group
              options={options}
              onChange={onHepatitis}
              value={hepatitis}
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="TT :"
            style={{ marginBottom: 0 }}
          >
            <Radio.Group options={options} onChange={onTT} value={tt} />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Lainnya :"
            style={{ marginBottom: 5 }}
          >
            <Input
              placeholder="..."
              style={{ width: "250px" }}
              onChange={onTindakan}
              value={tindakan}
            />
          </Form.Item>
          <Row style={{ float: "right" }}>
            <Form.Item style={{ marginBottom: 0 }}>
              <Button htmlType="submit" type="primary" size="small">
                Simpan
              </Button>
            </Form.Item>
          </Row>
        </Card>
      </Form>
    </Fragment>
  );
};

export default Polianak;
