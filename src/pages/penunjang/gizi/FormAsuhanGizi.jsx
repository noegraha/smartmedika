import React, { Fragment, useState, useContext } from "react";
import {
  Form,
  Input,
  Space,
  Divider,
  Row,
  Col,
  Select,
  Button,
  Table,
  Modal,
  Popconfirm,
  message,
  Layout,
  Card,
  Alert,
} from "antd";
import Iframe from "react-iframe";

import { PageHeader } from "@ant-design/pro-components";
import TextArea from "antd/lib/input/TextArea";
import Column from "antd/lib/table/Column";
import { GiziAsuhanContext } from "./context/AsuhanGiziContext";
import { PasienRIContext } from "../../rawatinap/context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import { DiagnosaContext } from "../../rawatjalan/context/Diagnosacontext";
import { OrderPenunjangRIContext } from "../../rawatinap/context/OrderPenunjangRIContext";
import { AnamnesaRIContext } from "../../rawatinap/context/AnamnesaRIContext";
import dayjs from "dayjs";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
const { Sider, Content } = Layout;

const { Option } = Select;
const formItemLayout1 = {
  labelCol: { span: 7 },
  wrapperCol: { span: 17 },
};
const formItemLayoutdiet = {
  labelCol: { span: 14 },
  wrapperCol: { span: 10 },
};
const formItemLayoutlain = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const FormAsuhanGizi = () => {
  const { curpasRI } = useContext(PasienRIContext);
  const [lihatDx, setlihatDx] = useState(false);
  const { detdiagnosa, detailDiagnosa } = useContext(DiagnosaContext);
  const { getMstDiet, getMstJnsMakan, listmstDiet, listmstjnsMakan } =
    useContext(OrderPenunjangRIContext);
  const {
    keluhanUtama,
    keluhanTambahan,
    riyawatPenyakitSekarang,
    riwayatPenyakitTerdahulu,
  } = useContext(AnamnesaRIContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const kodeDokter = sessionStorage.getItem("pegawai");

  const [form] = Form.useForm();
  // const onReset = () => {
  //     form.resetFields();
  // };
  const {
    evaluasi,
    setEvaluasi,
    asuhangizi,
    setAsuhanGizi,
    giziscreening,
    setGiziScreening,
    listscreening,
    setListScreening,
    screening,
    setScreening,
    listasuhan,
    setListAsuhan,
    printasuhan,
    setprintAsuhan,
    kodediit,
    setKodediit,
    namaDiet,
    setnamaDiet,
    namaHidangan,
    setnamaHidangan,
    kodeextra,
    setKodeextra,
    aktifitas,
    setAktifitas,
    pantanganMakan,
    setPantanganMakan,
    kebiasaanHidup,
    setkebiasaanHidup,
    diitSebelumnya,
    setdiitSebelumnya,
    makananPokok,
    setmakananPokok,
    laukHewani,
    setlaukHewani,
    laukNabati,
    setlaukNabati,
    sayur,
    setsayur,
    buah,
    setbuah,
    susu,
    setsusu,
    snack,
    setsnack,
    lainLainFfq,
    setlainLainFfq,
    energi,
    setenergi,
    lemak,
    setlemak,
    protein,
    setprotein,
    cho,
    setcho,
    lainLainRecall,
    setlainLainRecall,
    diagnosaGizi,
    setdiagnosaGizi,
    bentukMakanan,
    setbentukMakanan,
    rute,
    setrute,
    kebEnergi,
    setkebEnergi,
    kebProtein,
    setkebProtein,
    kebLemak,
    setkebLemak,
    kebCho,
    setkebCho,
    kebLain,
    setkebLain,
    implementasi,
    setimplementasi,
    materiKonseling,
    setmateriKonseling,
    bioKimia,
    setbioKimia,
    keluhanGizi,
    setKeluhanGizi,
    lainLainKlinik,
    setlainLainKlinik,
    asuhanGiziId,
    setasuhanGiziId,
    screeningId,
    setscreeningId,
    lila,
    setLila,
    beratBadan,
    setberatBadan,
    tinggiBadan,
    settinggiBadan,
    pertanyaan1,
    setPertanyaan1,
    pertanyaan2,
    setPertanyaan2,
    pertanyaan3,
    setPertanyaan3,
    pertanyaan4,
    setPertanyaan4,
    dokterGizi,
    setdokterGizi,
    tanggaleva,
    setTanggaleva,
    assesmenteva,
    setAssesmenteva,
    diagnosaeva,
    setDiagnosaeva,
    implementasieva,
    setImplementasieva,
    monitoringeva,
    setMonitoringeva,
    evaluasiGiziId,
    setevaluasiGiziId,
    listEvaluasi,
    setlistEvaluasi,
    dokterGiziEvaluasi,
    setdokterGiziEvaluasi,
    ttvLast,
    setttvLast,
    listDokterGizi,
    setlistDokterGizi,
    getmstdokterGizi,
    resetscreening,
    resetformevaluasi,
    resetasuhan,
    insertGizi,
    insertGiziAsuhan,
    insertEvaluasi,
    detailListScreening,
    detailevaluasi,
    detailListAsuhan,
    getLastTTV,
    deletescreening,
    deleteasuhan,
    deleteevaluasi,
    visibledewasa,
    setVisibledewasa,
    lastScreeningId,
    setLastScreeningId,
    tanggalasuhan,
    settanggalasuhan,
  } = useContext(GiziAsuhanContext);
  const [visible, setVisible] = useState(false);
  const {
    printEvalGizi,
    setprintEvalGizi,
    printAsuhGizi,
    setprintAsuhGizi,
    printScrenGizi,
    setprintScrenGizi,
    printScrenGiziPYMS,
    setprintScrenGiziPYMS,
    getPrintTerimaPasien,
    getPrintAnamnesa,
    getPrintfisikRI,
    getPrintKonsulRI,
    getPrintCPPTRI,
    getPrintRM11,
    getPrintEvalGizi,
    getPrintAsuhGizi,
    getPrintScrenGizi,
    getPrintScrenGiziPYMS,
    modalprintGiziAsuh,
    setmodalprintGiziAsuh,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);

  const datagiziasuhan = {
    asuhanGiziId: asuhanGiziId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tanggalasuhan).format("YYYY-MM-DDTHH:mm"),
    screeningId: lastScreeningId,
    tandaVitalId: ttvLast.tandaVitalId,
    aktifitas: aktifitas,
    keluhanGizi: keluhanGizi,
    pantanganMakan: pantanganMakan,
    kebiasaanHidup: kebiasaanHidup,
    diitSebelumnya: diitSebelumnya,
    makananPokok: makananPokok,
    laukHewani: laukHewani,
    laukNabati: laukNabati,
    sayur: sayur,
    buah: buah,
    susu: susu,
    snack: snack,
    lainLainFfq: lainLainFfq,
    biokimia: bioKimia,
    lainLainKlinik: lainLainKlinik,
    energi: energi,
    lemak: lemak,
    protein: protein,
    cho: cho,
    lainLainRecall: lainLainRecall,
    diagnosaGizi: diagnosaGizi,
    diit: kodediit,
    ekstra: kodeextra,
    bentukMakanan: bentukMakanan,
    rute: rute,
    kebEnergi: kebEnergi,
    kebProtein: kebProtein,
    kebLemak: kebLemak,
    kebCho: kebCho,
    kebLain: kebLain,
    implementasi: implementasi,
    materiKonseling: materiKonseling,
    kodeAhliGizi: kodeDokter,
    userId: namauser,
    status: true,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientIp: ip,
  };

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
      {lastScreeningId === "" ? (
        <Alert
          message="Pasien Belum Dilakukan Screening, silahkan Lakukan Screening terlebih Dahulu!"
          type="warning"
        />
      ) : (
        <></>
      )}
      <Card size="small">
        <Row>
          <Col span={11}>
            {lihatDx === true ? (
              <>
                <Table
                  bordered
                  pagination={false}
                  dataSource={detdiagnosa}
                  size="small"
                  rowKey="reg"
                >
                  <Column
                    title="Kode"
                    key="reg"
                    className="bgcolortunggu"
                    width="40px"
                    render={(detdiagnosa) => (
                      <span>{detdiagnosa.diagnosisId}</span>
                    )}
                  />
                  <Column
                    title="Deskripsi"
                    key="reg"
                    width="275px"
                    className="tabeltabel"
                    render={(detdiagnosa) => (
                      <span>{detdiagnosa.diagnosisDesk}</span>
                    )}
                  />
                  <Column
                    title="Jenis"
                    key="reg"
                    width="50px"
                    className="tabeltabel"
                    render={(detdiagnosa) => (
                      <span>{detdiagnosa.jenisDiagnosisDesk}</span>
                    )}
                  />
                  <Column
                    title="Kasus ICD"
                    className="tabeltabel"
                    key="nama"
                    width="60px"
                    render={(detdiagnosa) => (
                      <span>
                        {detdiagnosa.kasusBl === "B" ? "Baru" : "Lama"}
                      </span>
                    )}
                  />
                </Table>
                <Button
                  size="small"
                  onClick={() => {
                    setlihatDx(false);
                    detailDiagnosa("%20");
                  }}
                >
                  Tutup Diagnosa
                </Button>
              </>
            ) : (
              <>
                <Button
                  size="small"
                  onClick={() => {
                    setlihatDx(true);
                    detailDiagnosa(curpasRI.registrasiId);
                  }}
                >
                  Lihat Diagnosa
                </Button>
              </>
            )}

            <Form.Item
              {...formItemLayout1}
              label="Keluhan Utama"
              style={{ marginBottom: 1 }}
            >
              {/* <p>{keluhanUtama} </p> */}
              <TextArea
                disabled
                style={{ width: "100%" }}
                value={keluhanUtama}
                placeholder="..."
                rows={1}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="Keluhan Tambahan"
              style={{ marginBottom: 1 }}
            >
              {/* <p>{keluhanTambahan} </p> */}
              <TextArea
                disabled
                style={{ width: "100%" }}
                value={keluhanTambahan}
                placeholder="..."
                rows={1}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="R. Penyakit Sekarang"
              style={{ marginBottom: 1 }}
            >
              {/* <p> {riyawatPenyakitSekarang}</p> */}
              <TextArea
                disabled
                style={{ width: "100%" }}
                value={riyawatPenyakitSekarang}
                placeholder="..."
                rows={1}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="R. Penyakit Terdahulu"
              style={{ marginBottom: 1 }}
            >
              {/* <p> {riwayatPenyakitTerdahulu}</p> */}
              <TextArea
                disabled
                style={{ width: "100%" }}
                value={riwayatPenyakitTerdahulu}
                placeholder="..."
                rows={1}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="Aktivitas"
              style={{ marginBottom: 1 }}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                onChange={(e) => setAktifitas(e)}
                value={aktifitas}
              >
                <Option value="Ringan">Ringan</Option>
                <Option value="Bedrest">Bedrest</Option>
                <Option value="Total Bedrest">Total Bedrest</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="Keluhan Gizi"
              style={{ marginBottom: 1 }}
            >
              <TextArea
                style={{ width: "100%" }}
                value={keluhanGizi}
                onChange={(e) => setKeluhanGizi(e.target.value)}
                placeholder="..."
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="Pantangan Makan"
              style={{ marginBottom: 1 }}
            >
              <Input
                style={{ width: "100%" }}
                value={pantanganMakan}
                onChange={(e) => setPantanganMakan(e.target.value)}
                placeholder="..."
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="Kebiasaan Hidup"
              style={{ marginBottom: 1 }}
            >
              <Input
                style={{ width: "100%" }}
                value={kebiasaanHidup}
                onChange={(e) => setkebiasaanHidup(e.target.value)}
                placeholder="..."
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="DIIT Sebelumnya"
              style={{ marginBottom: 1 }}
            >
              <Input
                style={{ width: "100%" }}
                value={diitSebelumnya}
                onChange={(e) => setdiitSebelumnya(e.target.value)}
                placeholder="..."
              />
            </Form.Item>

            <Divider orientation="left" plain>
              Dietary FFQ
            </Divider>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="Mkn Pokok"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={makananPokok}
                    onChange={(e) => setmakananPokok(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Sayur"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={sayur}
                    onChange={(e) => setsayur(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Snack"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={snack}
                    onChange={(e) => setsnack(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Lauk Hewani"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={laukHewani}
                    onChange={(e) => setlaukHewani(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="Buah"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={buah}
                    onChange={(e) => setbuah(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Lain-lain"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={lainLainFfq}
                    onChange={(e) => setlainLainFfq(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Lauk Nabati"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={laukNabati}
                    onChange={(e) => setlaukNabati(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Susu"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={susu}
                    onChange={(e) => setsusu(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
              </Col>
            </Row>

            <Divider orientation="left" plain>
              Antrpometri
            </Divider>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="BB"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={beratBadan}
                    style={{ width: "100%" }}
                    placeholder="..."
                    disabled
                  />
                </Form.Item>
                <Form.Item {...formItemLayout1} label="TB">
                  <Input
                    value={tinggiBadan}
                    style={{ width: "100%" }}
                    placeholder="..."
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="LILA"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={lila}
                    style={{ width: "100%" }}
                    placeholder="..."
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="IMT"
                  style={{ marginBottom: 1 }}
                >
                  <Input.Group compact>
                    <Input
                      // suffix="(Kg/M2)"
                      style={{ width: "30%" }}
                      value={IMT}
                      placeholder="..."
                      disabled
                    />
                    <Input
                      style={{ width: "70%" }}
                      // value="Sangat Pendek"
                      placeholder="..."
                      disabled
                      value={KeteranganImt}
                    />
                  </Input.Group>
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              {...formItemLayout1}
              label="Biokimia"
              style={{ marginBottom: 1 }}
            >
              {/* <p> {riwayatPenyakitTerdahulu}</p> */}
              <TextArea
                style={{ width: "100%" }}
                onChange={(e) => {
                  setbioKimia(e.target.value);
                }}
                value={bioKimia}
                placeholder="..."
                rows={2}
              />
            </Form.Item>

            {/* <p>
                {" "}
                <strong> Berat Badan: {giziscreening.beratBadan} Kg</strong>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong>
                  {" "}
                  Tinggi Badan : {giziscreening.tinggiBadan} Cm
                </strong>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <strong> LILA : {giziscreening.lila} Cm</strong>&nbsp;&nbsp;
              </p>
              <p>
                <strong>
                  {" "}
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                  &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp; IMT :{" "}
                  {giziscreening.tinggiBadan}Kg/M2 -(
                  {IMT < 18.5
                    ? "Berat Badan Kurang (Underweight)"
                    : IMT >= 18.5 && IMT <= 22.9
                      ? "Berat Badan Normal"
                      : IMT >= 23 && IMT <= 24.9
                        ? "Kelebihan Berat Badan (Overweight) Dengan Resiko"
                        : IMT >= 25 && IMT <= 29.9
                          ? "Obesitas I"
                          : IMT >= 30
                            ? "Obesitas II"
                            : "-"}
                  )
                </strong>
              </p>
              <p>
                {" "}
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
                {detailpasien.umur <= 14 ? (
                  <strong>
                    BB/U: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    PB/U:
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;TB/U:
                  </strong>
                ) : (
                  ""
                )}
              </p>
              <p>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {detailpasien.umur <= 14 ? (
                  <strong>
                    BB/PB: &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    BB/TB:
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;IMT/U:
                  </strong>
                ) : (
                  ""
                )}
              </p> */}
            {/* <Row>

                                    <Col span={8}>
                                        <Form.Item {...formItemLayoutdiet} label="BB">
                                            <Input value={giziscreening.beratBadan} style={{ width: '100%' }} placeholder="..." disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item {...formItemLayoutdiet} label="TB">
                                            <Input value={giziscreening.tinggiBadan} style={{ width: '100%' }} placeholder="..." disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={8}>
                                        <Form.Item {...formItemLayoutdiet} label="LILA">
                                            <Input value={giziscreening.lila} style={{ width: '100%' }} placeholder="..." disabled />
                                        </Form.Item>
                                    </Col>
                                    <Col span={8}>
                                        <Form.Item {...formItemLayoutdiet} label="IMT">
                                            <Input value={IMT} style={{ width: '100%' }} placeholder="..." disabled />
                                        </Form.Item>
                                    </Col>
                                </Row>

                                <Row>
                                    <Col span={4}>
                                        Biokimia :
                                    </Col>
                                    <Col span={20}>
                                        <TextArea
                                            value={bioKimia}
                                            onChange={(e) => onbioKimia(e)}
                                            style={{ width: '100%' }} placeholder="..." />
                                    </Col>
                                </Row><br /> */}
          </Col>
          <Col span={1}></Col>

          <Col span={11}>
            <Divider orientation="left" plain>
              Fisik Klinis
            </Divider>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="Tensi"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    suffix="Mmhg"
                    value={
                      ttvLast === ""
                        ? ""
                        : ttvLast.tekananDarahDiastolik +
                          "/" +
                          ttvLast.tekananDarahSistolik
                    }
                    style={{ width: "100%" }}
                    placeholder="..."
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Suhu"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    suffix="°C"
                    value={ttvLast === "" ? "" : ttvLast.suhuTubuh}
                    style={{ width: "100%" }}
                    placeholder="..."
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="Respirasi"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    suffix="x/Menit"
                    value={ttvLast === "" ? "" : ttvLast.frekuensiNafas}
                    style={{ width: "100%" }}
                    placeholder="..."
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Nadi"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    suffix="x/Menit"
                    value={ttvLast === "" ? "" : ttvLast.frekuensiNadi}
                    style={{ width: "100%" }}
                    placeholder="..."
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayoutlain}
                  label="Fisik Klinis Lain:"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={lainLainKlinik}
                    onChange={(e) => setlainLainKlinik(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left" plain>
              Dietary Recall
            </Divider>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="Energi"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={energi}
                    onChange={(e) => setenergi(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Protein"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={protein}
                    onChange={(e) => setprotein(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Lemak"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={lemak}
                    onChange={(e) => setlemak(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="CHO"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={cho}
                    onChange={(e) => setcho(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Lain-lain"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={lainLainRecall}
                    onChange={(e) => setlainLainRecall(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder=".."
                  />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              {...formItemLayoutlain}
              label="Diagnosa Gizi"
              style={{ marginBottom: 1, marginTop: 10 }}
            >
              <TextArea
                value={diagnosaGizi}
                onChange={(e) => setdiagnosaGizi(e.target.value)}
                style={{ width: "100%" }}
                placeholder="..."
              />
            </Form.Item>

            <Divider orientation="left" plain>
              Intervensi
            </Divider>
            <Form.Item
              {...formItemLayoutlain}
              label="DIIT"
              style={{ marginBottom: 1 }}
            >
              <Select
                // onFocus={() => {
                //   getMstDiet('%20');
                // }}
                dataSource={listmstDiet}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                onChange={(e) => setKodediit(e)}
                value={kodediit}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {listmstDiet.map((d) => (
                  <Option key={d.DietId}>{d.NamaDiet}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              {...formItemLayoutlain}
              label="Ekstra DIIT"
              style={{ marginBottom: 1 }}
            >
              <Select
                // onFocus={() => {
                //   getMstJnsMakan('%20');
                // }}
                dataSource={listmstjnsMakan}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                value={kodeextra}
                onChange={(e) => setKodeextra(e)}
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {listmstjnsMakan.map((d) => (
                  <Option key={d.JenisMakanId}>{d.JenisMakan}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutlain}
              label="Bentuk Makan"
              style={{ marginBottom: 1 }}
            >
              <Input
                value={bentukMakanan}
                onChange={(e) => setbentukMakanan(e.target.value)}
                style={{ width: "100%" }}
                placeholder="..."
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutlain}
              label="Rute"
              style={{ marginBottom: 1 }}
            >
              <Input
                value={rute}
                onChange={(e) => setrute(e.target.value)}
                style={{ width: "100%" }}
                placeholder="..."
              />
            </Form.Item>

            <Divider orientation="left" plain>
              Kebutuhan Gizi
            </Divider>
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="Energi"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={kebEnergi}
                    onChange={(e) => setkebEnergi(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Protein"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={kebProtein}
                    onChange={(e) => setkebProtein(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Lemak"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={kebLemak}
                    onChange={(e) => setkebLemak(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayout1}
                  label="CHO"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={kebCho}
                    onChange={(e) => setkebCho(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Lain-lain"
                  style={{ marginBottom: 1 }}
                >
                  <Input
                    value={kebLain}
                    onChange={(e) => setkebLain(e.target.value)}
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
              </Col>
            </Row>
            <Form.Item
              {...formItemLayoutlain}
              label="Implementasi"
              style={{ marginBottom: 1, marginTop: 10 }}
            >
              <TextArea
                value={implementasi}
                onChange={(e) => setimplementasi(e.target.value)}
                style={{ width: "100%" }}
                placeholder="..."
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutlain}
              label="Materi Konseling"
              style={{ marginBottom: 1 }}
            >
              <TextArea
                value={materiKonseling}
                onChange={(e) => setmateriKonseling(e.target.value)}
                style={{ width: "100%" }}
                placeholder="..."
              />
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card size="small">
        <Row>
          <Col span={12}>
            <Space>
              {/* <Button onClick={() => {}}>Verifikasi</Button> */}
              <Button
                onClick={() => {
                  setVisible(true);
                }}
              >
                Riwayat
              </Button>
            </Space>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  resetasuhan();
                }}
              >
                Batal
              </Button>

              <Button
                type="primary"
                onClick={() => {
                  console.log(datagiziasuhan);
                  insertGiziAsuhan(datagiziasuhan);
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <Modal
        style={{ marginTop: 10 }}
        width="70%"
        open={visible}
        onOk={(e) => setVisible(false)}
        onCancel={(e) => setVisible(false)}
        footer={false}
      >
        <Table
          dataSource={listasuhan}
          size="small"
          rowKey="reg"
          scroll={{ y: 470 }}
          bordered
        >
          <Column
            title="Waktu"
            key="waktu"
            render={(listasuhan) => (
              <span className="fontkecil">
                {dayjs(listasuhan.Tanggal).format("DD-MM-YYYY  HH:mm")}
              </span>
            )}
          />
          <Column
            title="DIIT"
            key="waktu"
            render={(listasuhan) => (
              <span className="fontkecil">
                DIIT : {listasuhan.NamaDiet}
                <br></br>
                Ekstra : {listasuhan.JenisMakan}
              </span>
            )}
          />
          <Column
            title="Dokter Gizi"
            key="waktu"
            render={(listasuhan) => (
              <span className="fontkecil">{listasuhan.NamaDokter}</span>
            )}
          />
          <Column
            title="User"
            key="waktu"
            render={(listasuhan) => (
              <span className="fontkecil">{listasuhan.UserId}</span>
            )}
          />
          <Column
            title="Aksi"
            key="waktu"
            render={(listasuhan) => (
              <span className="fontkecil">
                <Space>
                  <Popconfirm
                    title="Apakah data akan dihapus?"
                    onConfirm={() =>
                      deleteasuhan(
                        listasuhan.AsuhanGiziId,
                        curpasRI.registrasiId
                      )
                    }
                    onCancel={(e) => {}}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button size="small" danger>
                      {" "}
                      Hapus{" "}
                    </Button>
                  </Popconfirm>
                  <Button
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => {
                      setasuhanGiziId(listasuhan.AsuhanGiziId);
                      setKodediit(listasuhan.Diit);
                      setKodeextra(listasuhan.Ekstra);
                      setAktifitas(listasuhan.Aktifitas);
                      setKeluhanGizi(listasuhan.KeluhanGizi);
                      setPantanganMakan(listasuhan.PantanganMakan);
                      setkebiasaanHidup(listasuhan.KebiasaanHidup);
                      setdiitSebelumnya(listasuhan.DiitSebelumnya);
                      setmakananPokok(listasuhan.MakananPokok);
                      setlaukHewani(listasuhan.LaukHewani);
                      setlaukNabati(listasuhan.LaukNabati);
                      setsayur(listasuhan.Sayur);
                      setbuah(listasuhan.Buah);
                      setsusu(listasuhan.Susu);
                      setsnack(listasuhan.Snack);
                      setlainLainFfq(listasuhan.LainLainFFQ);
                      setbioKimia(listasuhan.Biokimia);
                      setlainLainKlinik(listasuhan.LainLainKlinik);
                      setenergi(listasuhan.Energi);
                      setlemak(listasuhan.Lemak);
                      setprotein(listasuhan.Protein);
                      setcho(listasuhan.CHO);
                      setlainLainRecall(listasuhan.LainLainRecall);
                      setdiagnosaGizi(listasuhan.DiagnosaGizi);
                      setbentukMakanan(listasuhan.BentukMakanan);
                      setrute(listasuhan.Rute);
                      setkebEnergi(listasuhan.KebEnergi);
                      setkebProtein(listasuhan.KebProtein);
                      setkebLemak(listasuhan.kebLemak);
                      setkebCho(listasuhan.KebCHO);
                      setkebLain(listasuhan.KebLain);
                      setimplementasi(listasuhan.Implementasi);
                      setmateriKonseling(listasuhan.MateriKonseling);
                      settanggalasuhan(dayjs(listasuhan.Tanggal));
                      setVisible(false);
                    }}
                    size="small"
                  >
                    {" "}
                    Edit{" "}
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      getPrintAsuhGizi(
                        curpasRI.registrasiId,
                        listasuhan.AsuhanGiziId,
                        ""
                      );
                    }}
                  >
                    {" "}
                    Lihat{" "}
                  </Button>
                </Space>
              </span>
            )}
          />
        </Table>
      </Modal>

      <Modal
        width="70%"
        footer={null}
        open={modalprintGiziAsuh}
        onCancel={() => {
          setmodalprintGiziAsuh(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printAsuhGizi}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
    </div>
  );
};

export default FormAsuhanGizi;
