import React, { useState, useContext } from "react";
import { Modal, Button, Row, Col, Input, Card, Form } from "antd";
import Pagehead from "../pagehead";
import { PasienContext } from "../context/PasienContext";
import { PemeriksaanFisikContext } from "../context/PemeriksaanFisikContext";
import { LoginContext } from "../context";
const { TextArea } = Input;

const Buttonpemeriksaanfisik = () => {
  const [visible, setVisible] = useState(false);
  const noreg = sessionStorage.getItem("noreg");
  const { curpas } = useContext(PasienContext);
  const { username } = useContext(LoginContext);
  const {
    insertPemfisik,
    fisik,
    detailPemfisik,
    kepala,
    setKepala,
    leher,
    setLeher,
    dada,
    setDada,
    abdomen,
    setAbdomen,
    punggung,
    setPunggung,
    coxae,
    setCoxae,
    genital,
    setGenital,
    extermitas,
    setExtermitas,
    limphonodi,
    setLimphonodi,
    reflek,
    setReflek,
    tugor,
    setTugor,
    akral,
    setAkral,
  } = useContext(PemeriksaanFisikContext);

  const datapemfisik = {
    registrasiId: curpas.registrasiId,
    pemeriksaanFisik: fisik,
    pemeriksaanKepala: kepala,
    pemeriksaanLeher: leher,
    pemeriksaanDada: dada,
    pemeriksaanAbdomen: abdomen,
    pemeriksaanPunggung: punggung,
    pemeriksaanCoxae: coxae,
    pemeriksaanGenitaliaExterna: genital,
    pemeriksaanExtermitas: extermitas,
    pemeriksaanLimphonodi: limphonodi,
    pemeriksaanReflek: reflek,
    pemeriksaanTurgorKulit: tugor,
    pemeriksaanAkral: akral,
    pemeriksaanLokal: "-",
    kesimpulanPemeriksaan: "-",
    kodeDxKerja: "-",
    diagnosaKerja: "-",
    kodeDxBanding: "-",
    diagnosaBanding: "-",
    terapiDanTindakan: "-",
    prognosis: "-",
    dokterId: curpas.pegawaiId,
    userId: username,
  };
  const onMV = (e) => {
    setVisible(true);
    detailPemfisik(noreg);
  };
  // const onfisik = (e) => { setFisik(e.target.value);}
  const onkepala = (e) => {
    setKepala(e.target.value);
  };
  const onleher = (e) => {
    setLeher(e.target.value);
  };
  const ondada = (e) => {
    setDada(e.target.value);
  };
  const onabdomen = (e) => {
    setAbdomen(e.target.value);
  };
  const onpunggung = (e) => {
    setPunggung(e.target.value);
  };
  const oncoxae = (e) => {
    setCoxae(e.target.value);
  };
  const ongenital = (e) => {
    setGenital(e.target.value);
  };
  const onextermitas = (e) => {
    setExtermitas(e.target.value);
  };
  const onlimphonodi = (e) => {
    setLimphonodi(e.target.value);
  };
  const onreflek = (e) => {
    setReflek(e.target.value);
  };
  const ontugor = (e) => {
    setTugor(e.target.value);
  };
  const onakral = (e) => {
    setAkral(e.target.value);
  };
  const onSubmit = (e) => {
    insertPemfisik(datapemfisik);
    setVisible(false);
    console.log(datapemfisik);
  };
  const onCancel = (e) => {
    setVisible(false);
  };

  return (
    <div>
      <Button type="primary" size="small" onClick={(e) => onMV(e)}>
        Pemeriksaan Fisik
      </Button>
      <Modal
        centered
        style={{ top: 20 }}
        width="1000px"
        visible={visible}
        title="Pemeriksaan Fisik"
        onOk={(e) => onSubmit(e)}
        onCancel={(e) => onCancel(e)}
        footer={[
          <Button key="submit" type="primary" onClick={(e) => onSubmit(e)}>
            Simpan
          </Button>,
        ]}
      >
        <Pagehead />
        <Form>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <Card
                size="small"
                title="Pemeriksaan Kepala"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea
                  rows={4}
                  value={kepala}
                  onChange={(e) => onkepala(e)}
                />
              </Card>
              <Card
                size="small"
                title="Pemeriksaan Leher"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea rows={1} value={leher} onChange={(e) => onleher(e)} />
              </Card>
              <Card
                size="small"
                title="Pemeriksaan Dada"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea rows={3} value={dada} onChange={(e) => ondada(e)} />
              </Card>
              <Card
                size="small"
                title="Pemeriksaan Coxae"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea rows={1} value={coxae} onChange={(e) => oncoxae(e)} />
              </Card>
            </Col>

            <Col span={8}>
              <Card
                size="small"
                title="Pemeriksaan Genetalia Externa"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea
                  rows={1}
                  value={genital}
                  onChange={(e) => ongenital(e)}
                />
              </Card>
              <Card
                size="small"
                title="Pemeriksaan Limphonodi"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea
                  rows={1}
                  value={limphonodi}
                  onChange={(e) => onlimphonodi(e)}
                />
              </Card>
              <Card
                size="small"
                title="Pemeriksaan Abdomen"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea
                  rows={3}
                  value={abdomen}
                  onChange={(e) => onabdomen(e)}
                />
              </Card>
              <Card
                size="small"
                title="Pemeriksaan Punggung"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea
                  rows={2}
                  value={punggung}
                  onChange={(e) => onpunggung(e)}
                />
              </Card>
            </Col>

            <Col span={8}>
              <Card
                size="small"
                title="Pemeriksaan Extremitas"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea
                  rows={2}
                  value={extermitas}
                  onChange={(e) => onextermitas(e)}
                />
              </Card>
              <Card
                size="small"
                title="Pemeriksaan Reflek"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea
                  rows={1}
                  value={reflek}
                  onChange={(e) => onreflek(e)}
                />
              </Card>
              <Card
                size="small"
                title="Pemeriksaan Tugor Kulit"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea rows={1} value={tugor} onChange={(e) => ontugor(e)} />
              </Card>
              <Card
                size="small"
                title="Pemeriksaan Akral"
                headStyle={{ textAlign: "center" }}
              >
                <TextArea rows={1} value={akral} onChange={(e) => onakral(e)} />
              </Card>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default Buttonpemeriksaanfisik;
