import React, { useContext, useEffect, useRef, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Popconfirm,
  message,
  Card,
  Tabs,
  Space,
  DatePicker,
  Empty,
  Modal,
  Table,
  Radio,
  Divider,
  Alert,
  Tooltip,
  Tag,
} from "antd";
import {
  EditOutlined,
  CheckSquareOutlined,
  EditTwoTone,
  CheckSquareTwoTone,
} from "@ant-design/icons";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { PerkembanganPasienRIContext } from "../context/PerkembanganPasienRIContext";
import dayjs from "dayjs";
import FormCPPTRIVerifikasi from "./FormCPPTRIVerifikasi";
import { UserContext } from "../../appsetting/UserContext";
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;

const FormCPPTRI = () => {
  const [isModalLila, setIsModalLila] = useState(false);
  const [lila, setlila] = useState("");
  const bblilaPa = (2.592 * lila - 12.902).toFixed(1);
  const bblilaPi = (2.001 * lila - 1.223).toFixed(1);
  const inputRefS = useRef("end");
  const inputRefO = useRef("end");
  const inputRefA = useRef("end");
  const inputRefP = useRef("end");
  const inputRefI = useRef("end");
  const inputRefE = useRef("end");
  const inputRefIn = useRef("end");

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dateFormat = "DD-MM-YYYY HH:mm";
  const { namauser } = useContext(LoginContext);
  const {
    tandaVitalId,
    settandaVitalId,
    gcsMata,
    setgcsMata,
    gcsSuara,
    setgcsSuara,
    gcsGerakan,
    setgcsGerakan,
    tekananDarahSistolik,
    settekananDarahSistolik,
    tekananDarahDiastolik,
    settekananDarahDiastolik,
    suhuTubuh,
    setsuhuTubuh,
    frekuensiNadi,
    setfrekuensiNadi,
    frekuensiNafas,
    setfrekuensiNafas,
    skorNyeri,
    setskorNyeri,
    katonTTV,
    setKatonTTV,
    bacaTTV,
    setBacaTTV,
    insertTTVPasien,
    tglTTV,
    setTglTTV,
    ttvByNoreg,
    getTTVAll,
    grabikTTV,
    userTTV,
    setUserTTV,
    deleteTTV,
    getTTVById,
    tingkatKesadaranId,
    settingkatKesadaranId,
    tingkatKesadaran,
    settingkatKesadaran,
    iramaNadi,
    setiramaNadi,
    resikoJatuh,
    setresikoJatuh,
    saturasiOksigen,
    setsaturasiOksigen,
    tinggiBadan,
    settinggiBadan,
    beratBadan,
    setberatBadan,
    KosongkanFormTTV,
    pegawaiId,
    setPegawaiId,
    //catatan medis//
    insertCatatanMedis,
    catatanMedisId,
    setcatatanMedisId,
    subjektif,
    setsubjektif,
    objektif,
    setobjektif,
    assesment,
    setassesment,
    planning,
    setplanning,
    instruksi,
    setinstruksi,
    evaluasi,
    setevaluasi,
    implementasi,
    setimplementasi,
    temuanDx,
    settemuanDx,
    namaProfesi,
    setnamaProfesi,
    verified,
    setverified,
    verifiedTime,
    setverifiedTime,
    skalaNyeri,
    setskalaNyeri,
    citasi,
    setcitasi,
    citNomer,
    setcitNomer,
    citated,
    setcitated,
    buttonRiwayat,
    setbuttonRiwayat,
    buttonVerifikasi,
    setbuttonVerifikasi,

    getCPPT,
    cpptRi,
    setCpptRi,
    insertCPPTDr,
    deleteCPPT,
    insertVerifDr,
    loading,
    setloading,
    waktuenrol,
    setwaktuenroll,
  } = useContext(PerkembanganPasienRIContext);
  const { curpasRI } = useContext(PasienRIContext);
  const {
    menuMaster,
    getApptesting,
    appTesting,
    setappTesting,
    getSMFbyUser,
    smfUser,
    setsmfUser,
    kategpriUser,
    setkategpriUser,
  } = useContext(UserContext);
  const kodeDokter = sessionStorage.getItem("pegawai");
  const gcsTotal = gcsGerakan + gcsMata + gcsSuara;

  const onSistolik = (e) => {
    settekananDarahSistolik(e.target.value);
  };
  const onDiastolik = (e) => {
    settekananDarahDiastolik(e.target.value);
  };
  const onSuhu = (e) => {
    setsuhuTubuh(e.target.value);
  };
  const onFrekuensiNadi = (e) => {
    setfrekuensiNadi(e.target.value);
  };
  const onIramaNadi = (e) => {
    setiramaNadi(e.target.value);
  };
  const onFrekuensiNafas = (e) => {
    setfrekuensiNafas(e.target.value);
  };
  const onSkorNyeri = (e) => {
    setskorNyeri(e);
  };
  const onSaturasiOksigen = (e) => {
    setsaturasiOksigen(e.target.value);
  };
  const onTinggiBadan = (e) => {
    settinggiBadan(e.target.value);
  };
  const onBeratBadan = (e) => {
    setberatBadan(e.target.value);
  };
  const onResikoJatuh = (e) => {
    setresikoJatuh(e);
  };
  const onbukaMata = (e) => {
    setgcsMata(e);
  };
  const onmotorik = (e) => {
    setgcsGerakan(e);
  };
  const onbicara = (e) => {
    setgcsSuara(e);
  };

  const datatandavital = {
    tandaVitalId: tandaVitalId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    pegawaiId: curpasRI.dokterId,
    tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
    jam: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
    gcsMata: parseInt(gcsMata),
    gcsSuara: parseInt(gcsSuara),
    gcsGerakan: parseInt(gcsGerakan),
    gcsTotal: parseInt(gcsTotal),
    tingkatKesadaranId:
      gcsTotal === 3
        ? "50"
        : gcsTotal === 4
        ? "40"
        : gcsTotal > 4 && gcsTotal < 7
        ? "30"
        : gcsTotal > 6 && gcsTotal < 10
        ? "20"
        : "10",
    tekananDarahSistolik:
      tekananDarahSistolik === "" || tekananDarahSistolik === null
        ? null
        : parseInt(tekananDarahSistolik),
    tekananDarahDiastolik:
      tekananDarahDiastolik === "" || tekananDarahDiastolik === null
        ? null
        : parseInt(tekananDarahDiastolik),
    suhuTubuh:
      suhuTubuh === "" || suhuTubuh === null ? null : parseFloat(suhuTubuh),
    frekuensiNadi:
      frekuensiNadi === "" || frekuensiNadi === null
        ? null
        : parseInt(frekuensiNadi),
    iramaNadi: iramaNadi,
    frekuensiNafas:
      frekuensiNafas === "" || frekuensiNafas === null
        ? null
        : parseInt(frekuensiNafas),
    resikoJatuh:
      resikoJatuh === "" || resikoJatuh === null ? null : parseInt(resikoJatuh),
    skorNyeri:
      skorNyeri === "" || skorNyeri === null ? null : parseInt(skorNyeri),
    saturasiOksigen:
      saturasiOksigen === "" || saturasiOksigen === null
        ? null
        : parseInt(saturasiOksigen),
    tinggiBadan:
      tinggiBadan === "" || tinggiBadan === null ? null : parseInt(tinggiBadan),
    beratBadan:
      beratBadan === "" || beratBadan === null ? null : parseFloat(beratBadan),
    hapus: false,
    userId: namauser,
    clientHost: host,
    clientIP: ip,
  };

  const datacatatanmedis = {
    catatanMedisId: catatanMedisId,
    registrasiId: curpasRI.registrasiId,
    subjektif: subjektif,
    objektif: objektif,
    assesment: assesment,
    planning: planning,
    instruksi: instruksi,
    evaluasi: evaluasi,
    implementasi: implementasi,
    tglJam: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
    pelaksanaId: curpasRI.dokterId,
    userId: namauser,
    verified: kodeDokter === curpasRI.dokterId ? true : false,
    hapus: false,
    ruangId: curpasRI.ruangId,
    verifiedTime:
      kodeDokter === curpasRI.dokterId
        ? dayjs().format("YYYY-MM-DDTHH:mm")
        : null,
    citasi: citasi,
    citNomer: citNomer,
    citated: citated,
    clientHost: host,
    clientIP: ip,
    temuanDiagnosa: temuanDx,
  };

  const datacatatanmedisnonverif = {
    catatanMedisId: catatanMedisId,
    registrasiId: curpasRI.registrasiId,
    subjektif: subjektif,
    objektif: objektif,
    assesment: assesment,
    planning: planning,
    instruksi: instruksi,
    evaluasi: evaluasi,
    implementasi: implementasi,
    tglJam: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
    pelaksanaId: curpasRI.dokterId,
    userId: namauser,
    verified: false,
    hapus: false,
    ruangId: curpasRI.ruangId,
    verifiedTime: null,
    citasi: citasi,
    citNomer: citNomer,
    citated: citated,
    clientHost: host,
    clientIP: ip,
    temuanDiagnosa: temuanDx,
  };

  const onImplementasi = (e) => {
    setimplementasi(e.target.value);
  };
  const onEvaluasi = (e) => {
    setevaluasi(e.target.value);
  };
  const onSubject = (e) => {
    setsubjektif(e.target.value);
  };
  const onIntruksiA = (e) => {
    setinstruksi(e.target.value);
  };
  // const onIntruksiB = (e) => {
  //     setIntruksiB(e.target.value);
  // }
  const onAssesment = (e) => {
    setassesment(e.target.value);
  };
  const onObject = (e) => {
    setobjektif(e.target.value);
  };
  const onTerapi = (e) => {
    setplanning(e.target.value);
  };
  const onTglTTV = (date) => {
    setTglTTV(date);
  };
  const kosongkanform = () => {
    KosongkanFormTTV();
  };
  const onSubmit = () => {
    if (!subjektif || !objektif) {
      message.warning("Subjektif atau Objektif Tidak Boleh Kosong!");
      return; // Stop eksekusi jika ada input yang kosong
    }

    setloading(true);

    if (!waktuenrol) {
      insertCPPTDr(datatandavital, datacatatanmedisnonverif);
    } else {
      // const enrollmentDate = dayjs(waktuenrol);
      // const tenMinutesLater = enrollmentDate.add(30, "minute");

      // if (dayjs().isAfter(tenMinutesLater)) {
      //   insertCPPTDr(datatandavital, datacatatanmedisnonverif);
      // } else {
      insertCPPTDr(datatandavital, datacatatanmedis);
    }

    console.log(datatandavital, datacatatanmedis);
  };
  useEffect(() => {
    getApptesting("SMRI");
    getSMFbyUser(namauser);
  }, []);
  return (
    <div>
      <Form>
        <Card
          size="small"
          // title="Form CPPT"
        >
          <Row>
            <Col span={24}>
              <Card>
                <Row gutter={[16, 16]}>
                  <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                    Buka Mata(E)
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={onbukaMata}
                        value={gcsMata}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value={4}>Spontan</Option>
                        <Option value={3}>Suara</Option>
                        <Option value={2}>Nyeri</Option>
                        <Option value={1}>Tidak Ada</Option>
                      </Select>
                    </Form.Item>
                    Motorik(M)
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={onmotorik}
                        value={gcsGerakan}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value={6}>Sesuai Printah</Option>
                        <Option value={5}>Melokalisasi Nyeri</Option>
                        <Option value={4}>Menarik Diri Pada Nyeri</Option>
                        <Option value={3}>Flexi Abnormal</Option>
                        <Option value={2}>Extensi</Option>
                        <Option value={1}>Tidak Ada</Option>
                      </Select>
                    </Form.Item>
                    Bicara(V)
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Select
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="..."
                        optionFilterProp="children"
                        onChange={onbicara}
                        value={gcsSuara}
                        //defaultValue={5}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value={5}>Orientasi Baik</Option>
                        <Option value={4}>Bingung</Option>
                        <Option value={3}>Mengucap Kata</Option>
                        <Option value={2}>Mengeluarkan Bunyi</Option>
                        <Option value={1}>Tidak Ada</Option>
                      </Select>
                    </Form.Item>
                    GCS Total
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Input
                        disabled
                        type="number"
                        style={{ width: "100%" }}
                        placeholder="..."
                        value={gcsTotal}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                    Tensi
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Input.Group compact>
                        <Input
                          type="number"
                          placeholder="..."
                          style={{ width: "40%" }}
                          onChange={(e) => onSistolik(e)}
                          value={tekananDarahSistolik}
                        />
                        <Input
                          type="number"
                          suffix="Mmhg"
                          placeholder="..."
                          style={{ width: "60%" }}
                          onChange={(e) => onDiastolik(e)}
                          value={tekananDarahDiastolik}
                        />
                      </Input.Group>
                    </Form.Item>
                    Nadi
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Input
                        type="number"
                        suffix="/Menit"
                        placeholder="..."
                        value={frekuensiNadi}
                        onChange={(e) => onFrekuensiNadi(e)}
                      />
                    </Form.Item>
                    Irama Nadi
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Select
                        defaultValue="Teratur"
                        placeholder="..."
                        style={{ width: "100%" }}
                        value={iramaNadi}
                        onChange={(e) => setiramaNadi(e)}
                      >
                        <Option value="Teratur">Teratur</Option>
                        <Option value="Tidak Teratur">Tidak Teratur</Option>
                      </Select>
                    </Form.Item>
                    Suhu
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Input
                        type="number"
                        suffix="°C"
                        placeholder="..."
                        value={suhuTubuh}
                        onChange={(e) => onSuhu(e)}
                        step={0.1}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                    Frekuensi Nafas
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Input
                        type="number"
                        suffix="/Menit"
                        placeholder="..."
                        value={frekuensiNafas}
                        onChange={(e) => onFrekuensiNafas(e)}
                      />
                    </Form.Item>
                    Saturasi Oksigen
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Input
                        type="number"
                        placeholder="..."
                        value={saturasiOksigen}
                        onChange={(e) => onSaturasiOksigen(e)}
                      />
                    </Form.Item>
                    Skor Nyeri
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Select
                        defaultValue="1"
                        placeholder="..."
                        style={{ width: "100%" }}
                        value={skorNyeri}
                        onChange={(e) => onSkorNyeri(e)}
                      >
                        <Option value={1}>Tidak Nyeri (0)</Option>
                        <Option value={2}>Nyeri Ringan (1-2-3)</Option>
                        <Option value={3}>Nyeri Sedang (4-5-6)</Option>
                        <Option value={4}>Nyeri Berat (7-8-9-10)</Option>
                      </Select>
                    </Form.Item>
                    Resiko Jatuh
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Select
                        defaultValue="1"
                        placeholder="..."
                        style={{ width: "100%" }}
                        value={resikoJatuh}
                        onChange={onResikoJatuh}
                      >
                        <Option value={1}>Tidak Ada Resiko</Option>
                        <Option value={2}>Resiko Rendah</Option>
                        <Option value={3}>Resiko Tinggi</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={12} sm={12} md={8} lg={6} xl={5}>
                    Berat Badan
                    <br />
                    {/* <Form.Item style={{ marginBottom: 0 }}>
                      <Input
                        step={0.1}
                        type="number"
                        suffix="Kg"
                        placeholder="..."
                        data-role="keypad"
                        value={beratBadan}
                        onChange={(e) => onBeratBadan(e)}
                      />
                    </Form.Item> */}
                    <Input.Group compact>
                      <Tooltip title="Desimal Gunakan Tanda Titik [.]">
                        <Input
                          type="number"
                          suffix="Kg"
                          placeholder="..."
                          data-role="keypad"
                          step={0.1}
                          value={beratBadan}
                          onChange={(e) => setberatBadan(e.target.value)}
                          style={{ width: "70%" }}
                        />
                      </Tooltip>
                      <Button
                        type="primary"
                        onClick={() => {
                          setIsModalLila(true);
                        }}
                        style={{ width: "30%" }}
                      >
                        LILA
                      </Button>
                    </Input.Group>
                    Tinggi Badan
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Input
                        type="number"
                        suffix="Cm"
                        placeholder="..."
                        value={tinggiBadan}
                        onChange={(e) => onTinggiBadan(e)}
                      />
                    </Form.Item>
                    Tanggal
                    <br />
                    <Form.Item style={{ marginBottom: 0 }}>
                      <DatePicker
                        value={tglTTV}
                        style={{ width: "100%" }}
                        showTime
                        format={dateFormat}
                        onChange={onTglTTV}
                      />
                    </Form.Item>
                    <br />
                    {catatanMedisId === 0 ? (
                      <Form.Item style={{ marginBottom: 0 }}></Form.Item>
                    ) : (
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Tag icon={<EditOutlined />} color="processing">
                          Ubah : {catatanMedisId}
                        </Tag>
                      </Form.Item>
                    )}
                    <br />
                  </Col>
                </Row>
                <Tabs
                  defaultActiveKey="1"
                  // onChange={(e) => {
                  //   if (e === "1") {
                  //     inputRefS.current.focus("end");
                  //   } else if (e === "2") {
                  //     inputRefO.current.focus("end");
                  //   } else if (e === "3") {
                  //     inputRefA.current.focus("end");
                  //   } else if (e === "4") {
                  //     inputRefP.current.focus("end");
                  //   } else if (e === "5") {
                  //     inputRefI.current.focus("end");
                  //   } else if (e === "6") {
                  //     inputRefE.current.focus("end");
                  //   } else if (e === "7") {
                  //     inputRefIn.current.focus("end");
                  //   }
                  // }}
                >
                  <TabPane tab="Subjektif" key="1">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <TextArea
                        style={{ fontSize: "18px" }}
                        ref={inputRefS}
                        rows={6}
                        placeholder="..."
                        onChange={onSubject}
                        value={subjektif}
                        maxLength={4000}
                      />
                    </Form.Item>
                  </TabPane>
                  <TabPane tab="Objektif" key="2">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <TextArea
                        style={{ fontSize: "18px" }}
                        ref={inputRefO}
                        rows={6}
                        placeholder="..."
                        onChange={onObject}
                        value={objektif}
                        maxLength={4000}
                      />
                    </Form.Item>
                  </TabPane>
                  <TabPane tab="Assesment" key="3">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <TextArea
                        style={{ fontSize: "18px" }}
                        ref={inputRefA}
                        rows={6}
                        placeholder="..."
                        onChange={onAssesment}
                        value={assesment}
                        maxLength={4000}
                      />
                    </Form.Item>
                  </TabPane>
                  <TabPane tab="Planning" key="4">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <TextArea
                        style={{ fontSize: "18px" }}
                        ref={inputRefP}
                        rows={6}
                        placeholder="..."
                        onChange={onTerapi}
                        value={planning}
                        maxLength={4000}
                      />
                    </Form.Item>
                  </TabPane>
                  <TabPane tab="Implementasi" key="5">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <TextArea
                        style={{ fontSize: "18px" }}
                        ref={inputRefI}
                        rows={6}
                        placeholder="..."
                        onChange={onImplementasi}
                        value={implementasi}
                        maxLength={4000}
                      />
                    </Form.Item>
                  </TabPane>
                  <TabPane tab="Evaluasi" key="6">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <TextArea
                        style={{ fontSize: "18px" }}
                        ref={inputRefE}
                        rows={6}
                        placeholder="..."
                        onChange={onEvaluasi}
                        value={evaluasi}
                        maxLength={4000}
                      />
                    </Form.Item>
                  </TabPane>
                  <TabPane tab="Instruksi" key="7">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <TextArea
                        style={{ fontSize: "18px" }}
                        ref={inputRefIn}
                        rows={6}
                        placeholder="..."
                        onChange={onIntruksiA}
                        value={instruksi}
                        maxLength={4000}
                      />
                    </Form.Item>
                  </TabPane>
                  <TabPane tab="Temuan Diagnosa" key="8">
                    <Form.Item style={{ marginBottom: 0 }}>
                      <TextArea
                        style={{ fontSize: "18px" }}
                        ref={inputRefIn}
                        rows={6}
                        placeholder="..."
                        onChange={(e) => {
                          settemuanDx(e.target.value);
                        }}
                        value={temuanDx}
                        maxLength={4000}
                      />
                    </Form.Item>
                  </TabPane>
                </Tabs>
              </Card>
            </Col>
          </Row>
        </Card>
        <Card size="small" loading={loading}>
          <Row>
            <Col span={12}>
              <FormCPPTRIVerifikasi />
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={kosongkanform}>Batal</Button>
                <Button type="primary" onClick={onSubmit}>
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Form>

      {/* <Modal
        title="CPPT PASIEN!"
        open={buttonRiwayat}
        width="70%"
        style={{ marginTop: 10 }}
        footer={null}
        onCancel={handleOk}
      >
        <Table
          bordered
          locale={{ emptyText: <Empty description="Data CPPT Kosong" /> }}
          // pagination={false}
          dataSource={cpptRi}
          size="small"
          rowKey="reg"
          pagination={{
            position: ["topRight"],
            pageSize: [5],
          }}
        >
          <Column
            title="Tanggal"
            key="planning"
            render={(cpptRi) => (
              <span>{dayjs(cpptRi.TglJam).format("DD-MM-YYYY HH:mm")}</span>
            )}
          />
          <Column
            title="Subjek"
            key="planning"
            render={(cpptRi) => <span>{cpptRi.Subjektif}</span>}
          />
          <Column
            title="Objek"
            key="planning"
            render={(cpptRi) => <span>{cpptRi.Objektif}</span>}
          />
          <Column
            title="Assesment"
            key="planning"
            render={(cpptRi) => <span>{cpptRi.Assesment}</span>}
          />
          <Column
            title="Planning"
            key="planning"
            render={(cpptRi) => <span>{cpptRi.Planning}</span>}
          />
          <Column
            title="Instruksi"
            key="planning"
            render={(cpptRi) => <span>{cpptRi.Instruksi}</span>}
          />
          <Column
            title="Implementasi"
            key="planning"
            render={(cpptRi) => <span>{cpptRi.Implementasi}</span>}
          />
          <Column
            title="Evaluasi"
            key="planning"
            render={(cpptRi) => <span>{cpptRi.Evaluasi}</span>}
          />
          <Column
            title="Temuan Diagnosa"
            key="planning"
            render={(cpptRi) => <span>{cpptRi.TemuanDiagnosa}</span>}
          />
          <Column
            title="User"
            key="planning"
            render={(cpptRi) => <span>{cpptRi.UserID}</span>}
          />
          <Column
            title="Aksi"
            key="planning"
            render={(cpptRi) => (
              <span>
                {cpptRi.Verified === false || cpptRi.Verified === null ? (
                  kdPegawai.slice(0, 1) === "D" ? (
                    <Space direction="vertical">
                      <Button
                        size="small"
                        style={{ backgroundColor: "#722ed1", color: "white" }}
                        onClick={() => {
                          setsubjektif(cpptRi.Subjektif);
                          setobjektif(cpptRi.Objektif);
                          setassesment(cpptRi.Assesment);
                          setplanning(cpptRi.Planning);
                          setinstruksi(cpptRi.Instruksi);
                          setevaluasi(cpptRi.Evaluasi);
                          setimplementasi(cpptRi.Implementasi);
                          settemuanDx(cpptRi.TemuanDiagnosa);
                          setbuttonRiwayat(false);
                        }}
                      >
                        Copy
                      </Button>
                      <Popconfirm
                        title="Anda Yakin akan Menghapus Data Ini?"
                        onConfirm={() => {
                          deleteCPPT(
                            curpasRI.registrasiId,
                            cpptRi.CatatanMedisId,
                            cpptRi.TandaVitalId
                          );
                        }}
                        onCancel={onCanceltiphapus}
                        okText="Ya"
                        cancelText="Tidak"
                      >
                        <Button
                          size="small"
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Hapus
                        </Button>
                      </Popconfirm>
                      <Button
                        onClick={() => {
                          settandaVitalId(cpptRi.TandaVitalId);
                          setgcsMata(cpptRi.GcsMata);
                          setgcsSuara(cpptRi.GcsSuara);
                          setgcsGerakan(cpptRi.GcsGerakan);
                          settekananDarahSistolik(cpptRi.TekananDarahSistolik);
                          settekananDarahDiastolik(
                            cpptRi.TekananDarahDiastolik
                          );
                          setsuhuTubuh(cpptRi.SuhuTubuh);
                          setfrekuensiNadi(cpptRi.FrekuensiNadi);
                          setfrekuensiNafas(cpptRi.FrekuensiNafas);
                          setskorNyeri(cpptRi.SkorNyeri);
                          setTglTTV(dayjs(cpptRi.TglJam));
                          // settingkatKesadaranId("");
                          // settingkatKesadaran("");
                          setiramaNadi(cpptRi.IramaNadi);
                          setresikoJatuh(cpptRi.ResikoJatuh);
                          setsaturasiOksigen(cpptRi.SaturasiOksigen);
                          settinggiBadan(cpptRi.TinggiBadan);
                          setberatBadan(cpptRi.BeratBadan);
                          setcatatanMedisId(cpptRi.CatatanMedisId);
                          setsubjektif(cpptRi.Subjektif);
                          setobjektif(cpptRi.Objektif);
                          setassesment(cpptRi.Assesment);
                          setplanning(cpptRi.Planning);
                          setinstruksi(cpptRi.Instruksi);
                          setevaluasi(cpptRi.Evaluasi);
                          setimplementasi(cpptRi.Implementasi);
                          settemuanDx(cpptRi.TemuanDiagnosa);
                          setbuttonRiwayat(false);
                          // setverified(false);
                          // setverifiedTime(null);
                        }}
                        style={{ backgroundColor: "green", color: "white" }}
                        // icon={<EditTwoTone />}
                        size="small"
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Apakah data sudah benar?"
                        onCancel={() => console.log()}
                        onConfirm={() => {
                          insertVerifDr({
                            catatanMedisId: cpptRi.CatatanMedisId,
                            registrasiId: curpasRI.registrasiId,
                            subjektif: cpptRi.Subjektif,
                            objektif: cpptRi.Objektif,
                            assesment: cpptRi.Assesment,
                            planning: cpptRi.Planning,
                            instruksi: cpptRi.Instruksi,
                            evaluasi: cpptRi.Evaluasi,
                            implementasi: cpptRi.Implementasi,
                            tglJam: dayjs(cpptRi.TglJam).format(
                              "YYYY-MM-DDTHH:mm"
                            ),
                            pelaksanaId: cpptRi.PelaksanaId,
                            namaProfesi: cpptRi.NamaProfesi,
                            tandaVitalId: cpptRi.TandaVitalId,
                            userId: cpptRi.UserID,
                            verified: true,
                            hapus: false,
                            ruangId: cpptRi.RuangId,
                            verifiedTime: dayjs().format("YYYY-MM-DDTHH:mm"),
                            temuanDiagnosa: cpptRi.TemuanDiagnosa,
                            citasi: citasi,
                            citNomer: citNomer,
                            citated: citated,
                            clientHost: host,
                            clientIP: ip,
                          });
                        }}
                        okText="Ya"
                        cancelText="Tidak"
                      >
                        <Button
                          style={{ backgroundColor: "blue", color: "white" }}
                          // icon={<CheckSquareTwoTone />}
                          size="small"
                        >
                          Verif
                        </Button>
                      </Popconfirm>
                    </Space>
                  ) : (
                    <Space direction="vertical">
                      <Popconfirm
                        title="Anda Yakin akan Menghapus Data Ini?"
                        onConfirm={() => {
                          deleteCPPT(
                            curpasRI.registrasiId,
                            cpptRi.CatatanMedisId,
                            cpptRi.TandaVitalId
                          );
                        }}
                        onCancel={onCanceltiphapus}
                        okText="Ya"
                        cancelText="Tidak"
                      >
                        <Button
                          size="small"
                          style={{ backgroundColor: "red", color: "white" }}
                        >
                          Hapus
                        </Button>
                      </Popconfirm>

                      <Button
                        onClick={() => {
                          console.log(cpptRi.TandaVitalId);
                          settandaVitalId(cpptRi.TandaVitalId);
                          setgcsMata(cpptRi.GcsMata);
                          setgcsSuara(cpptRi.GcsSuara);
                          setgcsGerakan(cpptRi.GcsGerakan);
                          settekananDarahSistolik(cpptRi.TekananDarahSistolik);
                          settekananDarahDiastolik(
                            cpptRi.TekananDarahDiastolik
                          );
                          setsuhuTubuh(cpptRi.SuhuTubuh);
                          setfrekuensiNadi(cpptRi.FrekuensiNadi);
                          setfrekuensiNafas(cpptRi.FrekuensiNafas);
                          setskorNyeri(cpptRi.SkorNyeri);
                          setTglTTV(dayjs(cpptRi.TglJam));
                          // settingkatKesadaranId("");
                          // settingkatKesadaran("");
                          setiramaNadi(cpptRi.IramaNadi);
                          setresikoJatuh(cpptRi.ResikoJatuh);
                          setsaturasiOksigen(cpptRi.SaturasiOksigen);
                          settinggiBadan(cpptRi.TinggiBadan);
                          setberatBadan(cpptRi.BeratBadan);
                          setcatatanMedisId(cpptRi.CatatanMedisId);
                          setsubjektif(cpptRi.Subjektif);
                          setobjektif(cpptRi.Objektif);
                          setassesment(cpptRi.Assesment);
                          setplanning(cpptRi.Planning);
                          setinstruksi(cpptRi.Instruksi);
                          setevaluasi(cpptRi.Evaluasi);
                          setimplementasi(cpptRi.Implementasi);
                          setbuttonRiwayat(false);
                          // setverified(false);
                          // setverifiedTime(null);
                        }}
                        style={{ backgroundColor: "green", color: "white" }}
                        // icon={<EditTwoTone />}
                        size="small"
                      >
                        Edit
                      </Button>
                    </Space>
                  )
                ) : (
                  <div>
                    <Button
                      size="small"
                      style={{ backgroundColor: "#722ed1", color: "white" }}
                      onClick={() => {
                        setsubjektif(cpptRi.Subjektif);
                        setobjektif(cpptRi.Objektif);
                        setassesment(cpptRi.Assesment);
                        setplanning(cpptRi.Planning);
                        setinstruksi(cpptRi.Instruksi);
                        setevaluasi(cpptRi.Evaluasi);
                        setimplementasi(cpptRi.Implementasi);
                        setbuttonRiwayat(false);
                      }}
                    >
                      Copy
                    </Button>
                    <Tag color="blue">Diverifikasi</Tag>
                  </div>
                )}
              </span>
            )}
          />
        </Table>
      </Modal> */}

      <Modal
        title="Hitung Berat badan dengan LILA"
        visible={isModalLila}
        onOk={() => {
          setberatBadan(
            curpasRI.jenisKelamin === "LAKI-LAKI" ? bblilaPa : bblilaPi
          );
          setIsModalLila(false);
        }}
        okText="Ok"
        onCancel={() => {
          setIsModalLila(false);
        }}
      >
        Tinggi Badan
        <br />
        <Form.Item style={{ marginBottom: 0 }}>
          <Input
            type="number"
            suffix="Cm"
            placeholder="..."
            value={tinggiBadan}
            onChange={(e) => settinggiBadan(e.target.value)}
          />
        </Form.Item>
        Lingkar Lengan
        <br />
        <Form.Item style={{ marginBottom: 0 }}>
          <Input
            type="number"
            suffix="Cm"
            placeholder="..."
            value={lila}
            onChange={(e) => setlila(e.target.value)}
          />
        </Form.Item>
        Berat Badan (Hasil)
        <br />
        <Form.Item style={{ marginBottom: 0 }}>
          <Input
            type="number"
            suffix="Cm"
            placeholder="..."
            value={curpasRI.jenisKelamin === "LAKI-LAKI" ? bblilaPa : bblilaPi}
          />
        </Form.Item>
      </Modal>
    </div>
  );
};

export default FormCPPTRI;
