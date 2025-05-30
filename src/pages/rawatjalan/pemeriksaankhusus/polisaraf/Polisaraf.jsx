import React, { useContext } from "react";
import { Input, Select, Row, Col, Form, Radio, Card, Button } from "antd";
import { PasienContext } from "../../context/PasienContext";
import { PoliSarafContext } from "../../context/pemeriksaancontext/PoliSarafContext";
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const formItemLayout1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayout2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { Option } = Select;

const Polisaraf = () => {
  const { curpas } = useContext(PasienContext);
  const {
    insertSaraf,
    prevEeg,
    setprevEeg,
    riwayat,
    setriwayat,
    eegke,
    seteegke,
    tanggalPemeriksaan,
    settanggalPemeriksaan,
    refrdr,
    setrefrdr,
    dokterPemeriksa,
    setdokterPemeriksa,
    ruangId,
    setruangId,
    sedation,
    setsedation,
    medication,
    setmedication,
    hveffort,
    sethveffort,
    photicDrive,
    setphoticDrive,
    stateConscious,
    setstateConscious,
    techComment,
    settechComment,
    technologist,
    settechnologist,
    kondak1,
    setkondak1,
    aktifDsr1,
    frekuensi1,
    voltase1,
    distribusi1,
    keterangan1,
    kondak2,
    setkondak2,
    aktifDsr2,
    frekuensi2,
    voltase2,
    distribusi2,
    keterangan2,
    kondak3,
    setkondak3,
    aktifDsr3,
    frekuensi3,
    voltase3,
    distribusi3,
    keterangan3,
    kondak4,
    setkondak4,
    aktifDsr4,
    frekuensi4,
    voltase4,
    distribusi4,
    keterangan4,
    kondak5,
    setkondak5,
    aktifDsr5,
    frekuensi5,
    voltase5,
    distribusi5,
    keterangan5,
    klasifikasi,
    setklasifikasi,
    kesan,
    setkesan,
    namaPhysician,
    setnamaPhysician,
    tglctk,
    ttdimg,
    // setaktifDsr1,
    // setfrekuensi1,
    // setvoltase1,
    // setdistribusi1,
    // setketerangan1,
    // setaktifDsr2,
    // setfrekuensi2,
    // setvoltase2,
    // setdistribusi2,
    // setketerangan2,
    // setaktifDsr3,
    // setfrekuensi3,
    // setvoltase3,
    // setdistribusi3,
    // setketerangan3,
    // setaktifDsr4,
    // setfrekuensi4,
    // setvoltase4,
    // setdistribusi4,
    // setketerangan4,
    // setaktifDsr5,
    // setfrekuensi5,
    // setvoltase5,
    // setdistribusi5,
    // setketerangan5,
    //  setttdimg, nomor, setnomor, settglctk,setkondak, setfrekuensi,  setaktifDsr,setvoltase,setdistribusi,setketerangan
  } = useContext(PoliSarafContext);
  const datasaraf = {
    // nomor: nomor,
    registrasiId: curpas.registrasiId,
    prevEeg: prevEeg,
    riwayat: riwayat,
    eegke: eegke,
    tanggalPemeriksaan: tanggalPemeriksaan,
    refrdr: refrdr,
    dokterPemeriksa: curpas.dokterId,
    ruangId: ruangId,
    sedation: sedation,
    medication: medication,
    hveffort: hveffort,
    photicDrive: photicDrive,
    stateConscious: stateConscious,
    techComment: techComment,
    technologist: technologist,
    hasilPerekaman: [
      {
        nomor: "01",
        kondak: kondak1,
        aktifDsr: aktifDsr1,
        frekuensi: frekuensi1,
        voltase: voltase1,
        distribusi: distribusi1,
        keterangan: keterangan1,
      },
      {
        nomor: "02",
        kondak: kondak2,
        aktifDsr: aktifDsr2,
        frekuensi: frekuensi2,
        voltase: voltase2,
        distribusi: distribusi2,
        keterangan: keterangan2,
      },
      {
        nomor: "03",
        kondak: kondak3,
        aktifDsr: aktifDsr3,
        frekuensi: frekuensi3,
        voltase: voltase3,
        distribusi: distribusi3,
        keterangan: keterangan3,
      },
      {
        nomor: "04",
        kondak: kondak4,
        aktifDsr: aktifDsr4,
        frekuensi: frekuensi4,
        voltase: voltase4,
        distribusi: distribusi4,
        keterangan: keterangan4,
      },
      {
        nomor: "05",
        kondak: kondak5,
        aktifDsr: aktifDsr5,
        frekuensi: frekuensi5,
        voltase: voltase5,
        distribusi: distribusi5,
        keterangan: keterangan5,
      },
    ],
    klasifikasi: klasifikasi,
    kesan: kesan,
    namaPhysician: namaPhysician,
    tglctk: tglctk,
    ttdimg: ttdimg,
  };
  // const onnomor = (e) => { setnomor(e.target.value); }
  const onprevEeg = (e) => {
    setprevEeg(e.target.value);
  };
  const onriwayat = (e) => {
    setriwayat(e.target.value);
  };
  const oneegke = (e) => {
    seteegke(e.target.value);
  };
  const ontanggalPemeriksaan = (e) => {
    settanggalPemeriksaan(e.target.value);
  };
  const onrefrdr = (e) => {
    setrefrdr(e.target.value);
  };
  const ondokterPemeriksa = (e) => {
    setdokterPemeriksa(e.target.value);
  };
  const onruangId = (e) => {
    setruangId(e.target.value);
  };
  const onsedation = (e) => {
    setsedation(e.target.value);
  };
  const onmedication = (e) => {
    setmedication(e.target.value);
  };
  const onhveffort = (e) => {
    sethveffort(e.target.value);
  };
  const onphoticDrive = (e) => {
    setphoticDrive(e.target.value);
  };
  const onstateConscious = (e) => {
    setstateConscious(e.target.value);
  };
  const ontechComment = (e) => {
    settechComment(e.target.value);
  };
  const ontechnologist = (e) => {
    settechnologist(e.target.value);
  };
  // const onkondak = (e) => { setkondak(e.target.value); }
  // const onaktifDsr = (e) => { setaktifDsr(e.target.value); }
  // const onfrekuensi = (e) => { setfrekuensi(e.target.value); }
  // const onvoltase = (e) => { setvoltase(e.target.value); }
  // const ondistribusi = (e) => { setdistribusi(e.target.value); }
  // const onketerangan = (e) => { setketerangan(e.target.value); }
  const onklasifikasi = (e) => {
    setklasifikasi(e.target.value);
  };
  const onkesan = (e) => {
    setkesan(e.target.value);
  };
  const onnamaPhysician = (e) => {
    setnamaPhysician(e.target.value);
  };
  // const ontglctk = (e) => { settglctk(e.target.value); }
  // const onttdimg = (e) => { setttdimg(e.target.value); }
  const simpanSaraf = () => {
    console.log(datasaraf);
    insertSaraf(datasaraf);
  };
  return (
    <div>
      <Card
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        title="Pemeriksaan EEG"
      >
        <Form onFinish={simpanSaraf}>
          <Row>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="Previous EEG"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={prevEeg}
                  onChange={(e) => onprevEeg(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="History"
                style={{ marginBottom: 0 }}
              >
                <TextArea
                  rows={2}
                  placeholder="..."
                  value={riwayat}
                  onChange={(e) => onriwayat(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="EEG#"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={eegke}
                  onChange={(e) => oneegke(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Test Date"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={tanggalPemeriksaan}
                  onChange={(e) => ontanggalPemeriksaan(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Referring MD"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={refrdr}
                  onChange={(e) => onrefrdr(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Reading MD"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={dokterPemeriksa}
                  onChange={(e) => ondokterPemeriksa(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Location"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={ruangId}
                  onChange={(e) => onruangId(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                label="Sedation During Test"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={sedation}
                  onChange={(e) => onsedation(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Medication"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={medication}
                  onChange={(e) => onmedication(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="HV Effort"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={hveffort}
                  onChange={(e) => onhveffort(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Photic Driving Response"
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  value={photicDrive}
                  onChange={(e) => onphoticDrive(e)}
                >
                  <Radio value="+">+</Radio>
                  <Radio value="-">-</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="State of Consciousness"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={stateConscious}
                  onChange={(e) => onstateConscious(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Tech Comments"
                style={{ marginBottom: 0 }}
              >
                <TextArea
                  rows={2}
                  placeholder="..."
                  value={techComment}
                  onChange={(e) => ontechComment(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Technologist"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={technologist}
                  onChange={(e) => ontechnologist(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayout2}
                label="Hasil Perekaman"
                style={{ marginBottom: 0 }}
              >
                <table border="1" cellspacing="0" cellpadding="0" width="800">
                  <tbody>
                    <tr>
                      <td width="110">
                        <p align="center"> Kondisi,Aktifitas</p>
                      </td>
                      <td width="126">
                        <p align="center">Aktifitas Dasar</p>
                      </td>
                      <td width="64">
                        <p align="center">Frekuesi (Hz)</p>
                      </td>
                      <td width="59">
                        <p align="center">Voltase (uV)**</p>
                      </td>
                      <td width="123">
                        <p align="center">Distribusi</p>
                      </td>
                      <td width="189">
                        <p align="center">Keterangan</p>
                        <p align="center">(Jumlah, Reaktivitas, Durasi, Dll)</p>
                      </td>
                    </tr>
                    <tr>
                      <td width="110" valign="top">
                        <Select
                          defaultValue="Bangun"
                          showSearch
                          style={{ width: "100%", marginBottom: 0 }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={kondak1}
                          onChange={(e) => setkondak1(e)}
                        >
                          <Option value="Bangun">Bangun</Option>
                          <Option value="Mengantuk">Mengantuk</Option>
                          <Option value="Tidur">Tidur</Option>
                          <Option value="Hiperventilasi">Hiperventilasi</Option>
                          <Option value="Stimulasi Fotik">
                            Stimulasi Fotik
                          </Option>
                        </Select>
                      </td>
                      <td width="126" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%", marginBottom: 0 }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Alpha">Alpha</Option>
                          <Option value="Beta">Beta</Option>
                          <Option value="Teta">Teta</Option>
                          <Option value="Deita">Deita</Option>
                        </Select>
                      </td>
                      <td width="64" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%", marginBottom: 0 }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="< 4">&lt; 4</Option>
                          <Option value="4-7">4-7</Option>
                          <Option value="8-13">8-13</Option>
                          <Option value="> 13">&gt; 13</Option>
                        </Select>
                      </td>
                      <td width="59" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%", marginBottom: 0 }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="R<10 uV">R &lt;10 uV</Option>
                          <Option value="m 20-70 uV">m 20-70 uV</Option>
                          <Option value="T> 70 uV">T &gt;70 uV</Option>
                        </Select>
                      </td>
                      <td width="123" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Frontal">Frontal</Option>
                          <Option value="Temporal">Temporal</Option>
                          <Option value="Parietal">Parietal</Option>
                          <Option value="Oksipiral">Oksipiral</Option>
                        </Select>
                      </td>
                      <td width="189" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Generalized">Frontal</Option>
                          <Option value="Regional">Temporal</Option>
                          <Option value="Multi Regional">Parietal</Option>
                          <Option value="Lateralized">Oksipiral</Option>

                          <Option value="Non Lateralized">Oksipiral</Option>
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td width="110" valign="top">
                        <Select
                          defaultValue="Mengantuk"
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={kondak2}
                          onChange={(e) => setkondak2(e)}
                        >
                          <Option value="Bangun">Bangun</Option>
                          <Option value="Mengantuk">Mengantuk</Option>
                          <Option value="Tidur">Tidur</Option>
                          <Option value="Hiperventilasi">Hiperventilasi</Option>
                          <Option value="Stimulasi Fotik">
                            Stimulasi Fotik
                          </Option>
                        </Select>
                      </td>
                      <td width="126" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Alpha">Alpha</Option>
                          <Option value="Beta">Beta</Option>
                          <Option value="Teta">Teta</Option>
                          <Option value="Deita">Deita</Option>
                        </Select>
                      </td>
                      <td width="64" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="< 4">&lt; 4</Option>
                          <Option value="4-7">4-7</Option>
                          <Option value="8-13">8-13</Option>
                          <Option value="> 13">&gt; 13</Option>
                        </Select>
                      </td>
                      <td width="59" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="R<10 uV">R &lt;10 uV</Option>
                          <Option value="m 20-70 uV">m 20-70 uV</Option>
                          <Option value="T> 70 uV">T &gt;70 uV</Option>
                        </Select>
                      </td>
                      <td width="123" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Frontal">Frontal</Option>
                          <Option value="Temporal">Temporal</Option>
                          <Option value="Parietal">Parietal</Option>
                          <Option value="Oksipiral">Oksipiral</Option>
                        </Select>
                      </td>
                      <td width="189" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Generalized">Frontal</Option>
                          <Option value="Regional">Temporal</Option>
                          <Option value="Multi Regional">Parietal</Option>
                          <Option value="Lateralized">Oksipiral</Option>

                          <Option value="Non Lateralized">Oksipiral</Option>
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td width="110" valign="top">
                        <Select
                          defaultValue="Tidur"
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={kondak3}
                          onChange={(e) => setkondak3(e)}
                        >
                          <Option value="Bangun">Bangun</Option>
                          <Option value="Mengantuk">Mengantuk</Option>
                          <Option value="Tidur">Tidur</Option>
                          <Option value="Hiperventilasi">Hiperventilasi</Option>
                          <Option value="Stimulasi Fotik">
                            Stimulasi Fotik
                          </Option>
                        </Select>
                      </td>
                      <td width="126" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Alpha">Alpha</Option>
                          <Option value="Beta">Beta</Option>
                          <Option value="Teta">Teta</Option>
                          <Option value="Deita">Deita</Option>
                        </Select>
                      </td>
                      <td width="64" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="< 4">&lt; 4</Option>
                          <Option value="4-7">4-7</Option>
                          <Option value="8-13">8-13</Option>
                          <Option value="> 13">&gt; 13</Option>
                        </Select>
                      </td>
                      <td width="59" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="R<10 uV">R &lt;10 uV</Option>
                          <Option value="m 20-70 uV">m 20-70 uV</Option>
                          <Option value="T> 70 uV">T &gt;70 uV</Option>
                        </Select>
                      </td>
                      <td width="123" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Frontal">Frontal</Option>
                          <Option value="Temporal">Temporal</Option>
                          <Option value="Parietal">Parietal</Option>
                          <Option value="Oksipiral">Oksipiral</Option>
                        </Select>
                      </td>
                      <td width="189" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Generalized">Frontal</Option>
                          <Option value="Regional">Temporal</Option>
                          <Option value="Multi Regional">Parietal</Option>
                          <Option value="Lateralized">Oksipiral</Option>

                          <Option value="Non Lateralized">Oksipiral</Option>
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td width="110" valign="top">
                        <Select
                          defaultValue="Hiperventilasi"
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={kondak4}
                          onChange={(e) => setkondak4(e)}
                        >
                          <Option value="Bangun">Bangun</Option>
                          <Option value="Mengantuk">Mengantuk</Option>
                          <Option value="Tidur">Tidur</Option>
                          <Option value="Hiperventilasi">Hiperventilasi</Option>
                          <Option value="Stimulasi Fotik">
                            Stimulasi Fotik
                          </Option>
                        </Select>
                      </td>
                      <td width="126" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Alpha">Alpha</Option>
                          <Option value="Beta">Beta</Option>
                          <Option value="Teta">Teta</Option>
                          <Option value="Deita">Deita</Option>
                        </Select>
                      </td>
                      <td width="64" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="< 4">&lt; 4</Option>
                          <Option value="4-7">4-7</Option>
                          <Option value="8-13">8-13</Option>
                          <Option value="> 13">&gt; 13</Option>
                        </Select>
                      </td>
                      <td width="59" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="R<10 uV">R &lt;10 uV</Option>
                          <Option value="m 20-70 uV">m 20-70 uV</Option>
                          <Option value="T> 70 uV">T &gt;70 uV</Option>
                        </Select>
                      </td>
                      <td width="123" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Frontal">Frontal</Option>
                          <Option value="Temporal">Temporal</Option>
                          <Option value="Parietal">Parietal</Option>
                          <Option value="Oksipiral">Oksipiral</Option>
                        </Select>
                      </td>
                      <td width="189" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Generalized">Frontal</Option>
                          <Option value="Regional">Temporal</Option>
                          <Option value="Multi Regional">Parietal</Option>
                          <Option value="Lateralized">Oksipiral</Option>

                          <Option value="Non Lateralized">Oksipiral</Option>
                        </Select>
                      </td>
                    </tr>
                    <tr>
                      <td width="110" valign="top">
                        <Select
                          defaultValue="Stimulasi Fotik"
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          value={kondak5}
                          onChange={(e) => setkondak5(e)}
                        >
                          <Option value="Bangun">Bangun</Option>
                          <Option value="Mengantuk">Mengantuk</Option>
                          <Option value="Tidur">Tidur</Option>
                          <Option value="Hiperventilasi">Hiperventilasi</Option>
                          <Option value="Stimulasi Fotik">
                            Stimulasi Fotik
                          </Option>
                        </Select>
                      </td>
                      <td width="126" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Alpha">Alpha</Option>
                          <Option value="Beta">Beta</Option>
                          <Option value="Teta">Teta</Option>
                          <Option value="Deita">Deita</Option>
                        </Select>
                      </td>
                      <td width="64" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="< 4">&lt; 4</Option>
                          <Option value="4-7">4-7</Option>
                          <Option value="8-13">8-13</Option>
                          <Option value="> 13">&gt; 13</Option>
                        </Select>
                      </td>
                      <td width="59" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="R<10 uV">R &lt;10 uV</Option>
                          <Option value="m 20-70 uV">m 20-70 uV</Option>
                          <Option value="T> 70 uV">T &gt;70 uV</Option>
                        </Select>
                      </td>
                      <td width="123" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Frontal">Frontal</Option>
                          <Option value="Temporal">Temporal</Option>
                          <Option value="Parietal">Parietal</Option>
                          <Option value="Oksipiral">Oksipiral</Option>
                        </Select>
                      </td>
                      <td width="189" valign="top">
                        <Select
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          <Option value="Generalized">Frontal</Option>
                          <Option value="Regional">Temporal</Option>
                          <Option value="Multi Regional">Parietal</Option>
                          <Option value="Lateralized">Oksipiral</Option>
                          <Option value="Non Lateralized">Oksipiral</Option>
                        </Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                {...formItemLayout1}
                label="Klasifikasi"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={klasifikasi}
                  onChange={(e) => onklasifikasi(e)}
                  style={{ width: "50" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout1}
                label="Kesan"
                style={{ marginBottom: 0 }}
              >
                <TextArea
                  rows={2}
                  placeholder="..."
                  value={kesan}
                  onChange={(e) => onkesan(e)}
                  style={{ width: "100" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout1}
                label="Phisycian Name"
                style={{ marginBottom: 0 }}
              >
                <Input
                  placeholder="..."
                  value={namaPhysician}
                  onChange={(e) => onnamaPhysician(e)}
                  style={{ width: "50" }}
                />
              </Form.Item>
              {/* <Form.Item
                {...formItemLayout1}
                label="Signature"
                style={{ marginBottom: 0 }}
              >
                ttd<Image src={ttdimg}></Image>
              </Form.Item> */}
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" htmlType="submit">
                Simpan
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default Polisaraf;
