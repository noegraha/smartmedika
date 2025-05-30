import React, { useContext, useState } from "react";
import {
  Select,
  Form,
  Row,
  Col,
  Table,
  Button,
  Empty,
  DatePicker,
  Space,
  Input,
  Modal,
  message,
  Tooltip,
  Card,
  Tabs,
  Typography,
  Slider,
} from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import skalanyeripng from "../../../skalanyeri.png";
import FormGrafikTTV from "./FormGrafikTTV";
import { TTVRIContext } from "../../../../../rawatinap/context/TandaVitalAskepRIContext";
import { AskepContext } from "../../../../../rawatinap/context/AskepContext";
import HdContext from "../../../HdContext";

const { PasiensContext } = HdContext;

const { Text } = Typography;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { TabPane } = Tabs;
const { Option } = Select;

const formItemLayout1 = {
  labelCol: { span: 12 },
  wrapperCol: { span: 22 },
};
const formItemLayout2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formItemLayout24 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayoutFull = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
let index = 1;
const FormTandaVital = () => {
  const props = useContext(PasiensContext);
  const [form] = Form.useForm();
  const [warnaRow, setWarnaRow] = useState([]);
  const dateFormat = "DD-MM-YYYY HH:mm";
  const {
    visibleNyeri,
    setvisibleNyeri,
    visibleJatuh,
    setvisibleJatuh,

    ttvAllByNoreg,
    setTTvAllByNoreg,
    userTTV,
    tandaVitalId,
    setTandaVitalId,
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
    tglTTV,
    setTglTTV,
    tingkatKesadaranId,
    settingkatKesadaranId,
    tingkatKesadaran,
    settingkatKesadaran,
    iramaNadi,
    setiramaNadi,
    saturasiOksigen,
    setsaturasiOksigen,
    tinggiBadan,
    settinggiBadan,
    beratBadan,
    setberatBadan,
    etermitas,
    setEtermitas,
    insertTTVAssesment,

    scalaNyeri,
    setscalaNyeri,
    skalaNyeri1,
    setskalaNyeri1,
    skalaNyeri2,
    setskalaNyeri2,
    skalaNyeri3,
    setskalaNyeri3,
    skalaNyeri4,
    setskalaNyeri4,
    skalaNyeri5,
    setskalaNyeri5,
    skalaNyeri6,
    setskalaNyeri6,
    skorNyeri,
    setskorNyeri,
    insertskalanyeri,

    metodeResikoJatuh,
    setmetodeResikoJatuh,
    rJatuh1,
    setrJatuh1,
    rJatuh2,
    setrJatuh2,
    sMental1,
    setsMental1,
    sMental2,
    setsMental2,
    sMental3,
    setsMental3,
    sMata1,
    setsMata1,
    sMata2,
    setsMata2,
    sMata3,
    setsMata3,
    kebiasaanBerkemih,
    setkebiasaanBerkemih,
    transferTT,
    settransferTT,
    mobilitas,
    setmobilitas,
    humDumUsia,
    sethumDumUsia,
    humDumKel,
    sethumDumKel,
    humDumDiagnosa,
    sethumDumDiagnosa,
    humDumGangguanKognitif,
    sethumDumGangguanKognitif,
    humDumLingkungan,
    sethumDumLingkungan,
    humDumRespon,
    sethumDumRespon,
    humDumPemObat,
    sethumDumPemObat,
    morseRiwJatuh,
    setmorseRiwJatuh,
    morseDiagnosa,
    setmorseDiagnosa,
    morseKondisiJalan,
    setmorseKondisiJalan,
    morseInfus,
    setmorseInfus,
    morseKondisiBadan,
    setmorseKondisiBadan,
    morseGangKognitif,
    setmorseGangKognitif,
    // skorResikoJatuh, setskorResikoJatuh,
    insertResikoJatuh,
    getTTVAllBynoreg,
    getTTVById,
    getGravikTTV,
    getNyeriByRegDate,
    getResikoJatuhByRegDate,
    deleteTTV,
    deleteNyeribydate,
    deleteResikoJatuhbydate,

    spin,
    setSpin,
  } = useContext(TTVRIContext);
  const {
    valuecekAssesment,
    // tanggal, settanggal,
    diagnosaId,
    // setdiagnosaId, nTandaGejala, insertEmrAskep, settargetWaktu, targetWaktu,
    // setnTandaGejala, nIntervensi, setnIntervensi, nKriteria, setnKriteria, getListAskepById, ListAskepById,getAskepByIdByDx,
    registrasiId,
    //  deleteAskpeByIdByDx,getListImplementasiByIdByDx,
    ImplementasiByIdByDx,
    implementasiId,
    setImplementasiId,
    insertImplementasiAskep,
    ListImplementasiById,
    tanggalImplementasi,
    settanggalImplementasi,
    deleteImplementasiById,
    getImplementasiByIdImplementasi,
    IdImplementasi,
    userlog,
    keteranganImplementasi,
    setketeranganImplementasi,
    listImplementasiByIdDiagnosa,
    katonImplementasi,
    setkatonImplementasi,
    diagnosaDeskripsi,
    curpasRI,
    listCaramasuk,
    setlistCaraMasuk,
    ipPc,
    setIpPC,
    namePc,
    setNamePC,
    ListAskepById,
    // listdataaskep, dataaskepid, targetWaktu,  luaranId, setluaranId, setregistrasiId,settargetWaktu,setluaranId,AskepByIdByDx,
  } = useContext(AskepContext);
  const marks = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6,
    7: 7,
    8: 8,
    9: 9,
    10: 10,
  };
  const marks1 = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
  };
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  const IMT = (beratBadan / Math.pow(tinggiBadan / 100, 2)).toFixed(2);
  const statusGizi =
    IMT < 18.5
      ? "Berat Badan Kurang (Underweight)"
      : IMT > 18.4 && IMT < 23
      ? "Berat Badan Normal"
      : IMT > 22.9 && IMT < 25
      ? "Kelebihan Berat Badan (Overweight) Dengan Resiko"
      : IMT > 24.9 && IMT < 30
      ? "Obesitas I"
      : IMT > 29.9
      ? "Obesitas II"
      : "-";

  const stylekuIMT = isNaN(IMT)
    ? { width: "70%" }
    : IMT < 18.5
    ? { backgroundColor: "lightcyan", width: "70%" }
    : IMT > 18.4 && IMT < 23
    ? { backgroundColor: "lightgreen", width: "70%" }
    : IMT > 22.9 && IMT < 25
    ? { backgroundColor: "lightblue", width: "70%" }
    : IMT > 24.9 && IMT < 30
    ? { backgroundColor: "lightpink", width: "70%" }
    : IMT > 29.9
    ? { backgroundColor: "lightcoral", width: "70%" }
    : { width: "70%" };

  const skorNyeriKirim =
    scalaNyeri === "Visual Analog Scale"
      ? parseInt(skalaNyeri1)
      : scalaNyeri === "FLACC"
      ? parseInt(skalaNyeri1) +
        parseInt(skalaNyeri2) +
        parseInt(skalaNyeri3) +
        parseInt(skalaNyeri4) +
        parseInt(skalaNyeri5)
      : scalaNyeri === "NIPS"
      ? parseInt(skalaNyeri1) +
        parseInt(skalaNyeri2) +
        parseInt(skalaNyeri3) +
        parseInt(skalaNyeri4) +
        parseInt(skalaNyeri5) +
        parseInt(skalaNyeri6)
      : scalaNyeri === "NVPS"
      ? parseInt(skalaNyeri1) +
        parseInt(skalaNyeri2) +
        parseInt(skalaNyeri3) +
        parseInt(skalaNyeri4) +
        parseInt(skalaNyeri5)
      : scalaNyeri === "Wong Bakes Facies"
      ? parseInt(skalaNyeri1)
      : scalaNyeri === "NPRS"
      ? parseInt(skalaNyeri1)
      : null;
  const stylekuNyeriWong = isNaN(skorNyeriKirim)
    ? { width: "55%" }
    : skorNyeriKirim === 0
    ? { backgroundColor: "lightgreen", width: "55%" }
    : skorNyeriKirim === 1
    ? { backgroundColor: "lightyellow", width: "55%" }
    : skorNyeriKirim > 1 && skorNyeriKirim < 4
    ? { backgroundColor: "darkorange", width: "55%" }
    : skorNyeriKirim > 3 && skorNyeriKirim < 6
    ? { backgroundColor: "lightcoral", width: "55%" }
    : { width: "55%" };

  const stylekuNyeriLain = isNaN(skorNyeriKirim)
    ? { width: "55%" }
    : skorNyeriKirim === 0
    ? { backgroundColor: "lightgreen", width: "55%" }
    : skorNyeriKirim > 0 && skorNyeriKirim < 4
    ? { backgroundColor: "lightyellow", width: "55%" }
    : skorNyeriKirim > 3 && skorNyeriKirim < 7
    ? { backgroundColor: "darkorange", width: "55%" }
    : skorNyeriKirim > 6 && skorNyeriKirim < 11
    ? { backgroundColor: "lightcoral", width: "55%" }
    : { width: "55%" };
  const ketWongBakesFacies =
    skorNyeriKirim === 0
      ? "Tidak Nyeri"
      : skorNyeriKirim === 1
      ? "Nyeri Ringan"
      : skorNyeriKirim > 1 && skorNyeriKirim < 4
      ? "Nyeri Sedang"
      : skorNyeriKirim > 3 && skorNyeriKirim < 6
      ? "Nyeri Berat"
      : "";
  const ketNyeriLain =
    skorNyeriKirim === 0
      ? "Tidak Nyeri"
      : skorNyeriKirim > 0 && skorNyeriKirim < 4
      ? "Nyeri Ringan"
      : skorNyeriKirim > 3 && skorNyeriKirim < 7
      ? "Nyeri Sedang"
      : skorNyeriKirim > 6 && skorNyeriKirim < 11
      ? "Nyeri Berat"
      : "";
  const resikoJatuh =
    parseInt(rJatuh1.split("-").pop()) === 6 ||
    parseInt(rJatuh2.split("-").pop()) === 6
      ? 6
      : 0;
  const statusMental =
    parseInt(sMental1.split("-").pop()) === 14 ||
    parseInt(sMental2.split("-").pop()) === 14 ||
    parseInt(sMental3.split("-").pop()) === 14
      ? 14
      : 0;
  const penglihatanMata =
    parseInt(sMata1.split("-").pop()) === 1 ||
    parseInt(sMata2.split("-").pop()) === 1 ||
    parseInt(sMata3.split("-").pop()) === 1
      ? 1
      : 0;
  const mobilitasTransfer =
    parseInt(transferTT.split("-").pop()) +
      parseInt(mobilitas.split("-").pop()) <
    4
      ? 0
      : 7;
  const skorOntario =
    parseInt(resikoJatuh) +
    parseInt(statusMental) +
    parseInt(penglihatanMata) +
    parseInt(mobilitasTransfer) +
    parseInt(kebiasaanBerkemih.split("-").pop());
  const ketOntario =
    skorOntario === ""
      ? ""
      : skorOntario >= 0 && skorOntario < 6
      ? "Risiko Rendah"
      : skorOntario > 5 && skorOntario < 17
      ? "Risiko Sedang"
      : skorOntario > 16 && skorOntario < 31
      ? "Risiko Tinggi"
      : "";
  const skorHumptyDumpty =
    parseInt(humDumUsia.split("-").pop()) +
    parseInt(humDumKel.split("-").pop()) +
    parseInt(humDumDiagnosa.split("-").pop()) +
    parseInt(humDumGangguanKognitif.split("-").pop()) +
    parseInt(humDumLingkungan.split("-").pop()) +
    parseInt(humDumRespon.split("-").pop()) +
    parseInt(humDumPemObat.split("-").pop());
  const ketHumptyDumpty =
    skorHumptyDumpty === ""
      ? ""
      : skorHumptyDumpty < 7
      ? "Tidak Ada Risiko"
      : skorHumptyDumpty > 6 && skorHumptyDumpty < 12
      ? "Risiko Rendah"
      : skorHumptyDumpty > 11
      ? "Risiko Tinggi"
      : "";
  const skorMorse =
    parseInt(morseRiwJatuh.split("-").pop()) +
    parseInt(morseDiagnosa.split("-").pop()) +
    parseInt(morseKondisiJalan.split("-").pop()) +
    parseInt(morseInfus.split("-").pop()) +
    parseInt(morseKondisiBadan.split("-").pop()) +
    parseInt(morseGangKognitif.split("-").pop());
  const ketMorse =
    skorMorse === ""
      ? ""
      : skorMorse >= 0 && skorMorse < 25
      ? "Tidak Ada Risiko"
      : skorMorse > 24 && skorMorse < 51
      ? "Risiko Rendah"
      : skorMorse > 50
      ? "Risiko Tinggi"
      : "";
  const stylekuOntario =
    skorOntario === ""
      ? { width: "55%" }
      : skorOntario >= 0 && skorOntario < 6
      ? { backgroundColor: "lightgreen", width: "55%" }
      : skorOntario > 5 && skorOntario < 17
      ? { backgroundColor: "darkorange", width: "55%" }
      : skorOntario > 16 && skorOntario < 31
      ? { backgroundColor: "lightcoral", width: "55%" }
      : { width: "55%" };
  const stylekuMorse =
    skorMorse === ""
      ? { width: "55%" }
      : skorMorse >= 0 && skorMorse < 25
      ? { backgroundColor: "lightgreen", width: "55%" }
      : skorMorse > 24 && skorMorse < 51
      ? { backgroundColor: "darkorange", width: "55%" }
      : skorMorse > 50
      ? { backgroundColor: "lightcoral", width: "55%" }
      : { width: "55%" };
  const stylekuHumptyDumpty =
    skorHumptyDumpty === ""
      ? { width: "55%" }
      : skorHumptyDumpty < 7
      ? { backgroundColor: "lightgreen", width: "55%" }
      : skorHumptyDumpty > 6 && skorHumptyDumpty < 12
      ? { backgroundColor: "darkorange", width: "55%" }
      : skorHumptyDumpty > 11
      ? { backgroundColor: "lightcoral", width: "55%" }
      : { width: "55%" };

  const datanyeri = {
    id: 0,
    registrasiId: props.pasien.result.registrasiId,
    ruangId: props.pasien.result.ruangId,
    tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
    metode: scalaNyeri,
    keterangan:
      scalaNyeri === "Wong Bakes Facies" ? ketWongBakesFacies : ketNyeriLain,
    userId: userlog,
    detailNyeri:
      scalaNyeri === "Visual Analog Scale"
        ? [
            {
              parameter: "VisualAnalogSkala",
              value: skalaNyeri1,
            },
          ]
        : scalaNyeri === "FLACC"
        ? [
            {
              parameter: "EkspresiWajah",
              value: skalaNyeri1,
            },
            {
              parameter: "Kaki",
              value: skalaNyeri2,
            },
            {
              parameter: "Aktivitas",
              value: skalaNyeri3,
            },
            {
              parameter: "Menangis",
              value: skalaNyeri4,
            },
            {
              parameter: "Kenyamanan",
              value: skalaNyeri5,
            },
          ]
        : scalaNyeri === "NIPS"
        ? [
            {
              parameter: "EkspresiWajah",
              value: skalaNyeri1,
            },
            {
              parameter: "Menangis",
              value: skalaNyeri2,
            },
            {
              parameter: "PolaBernafas",
              value: skalaNyeri3,
            },
            {
              parameter: "Lengan",
              value: skalaNyeri4,
            },
            {
              parameter: "Kaki",
              value: skalaNyeri5,
            },
            {
              parameter: "KeadaanRangsangan",
              value: skalaNyeri6,
            },
          ]
        : scalaNyeri === "NVPS"
        ? [
            {
              parameter: "EkspresiWajah",
              value: skalaNyeri1,
            },
            {
              parameter: "Aktivitas",
              value: skalaNyeri2,
            },
            {
              parameter: "Melindungi",
              value: skalaNyeri3,
            },
            {
              parameter: "Fisiologis",
              value: skalaNyeri4,
            },
            {
              parameter: "Respirasi",
              value: skalaNyeri5,
            },
          ]
        : scalaNyeri === "Wong Bakes Facies"
        ? [
            {
              parameter: "WongBakesFaciesSkala",
              value: skalaNyeri1,
            },
          ]
        : scalaNyeri === "NPRS"
        ? [
            {
              parameter: "NPRSSkala",
              value: skalaNyeri1,
            },
          ]
        : null,
  };
  const dataResikoJatuh = {
    registrasiId: props.pasien.result.registrasiId,
    pasienId: props.pasien.result.pasienId,
    ruangId: props.pasien.result.ruangId,
    tanggal: dayjs(tglTTV).format("YYYY-MM-DD HH:mm").toString(),
    metode: metodeResikoJatuh,
    totalScore:
      metodeResikoJatuh === "HUMPTY DUMPTY"
        ? skorHumptyDumpty
        : metodeResikoJatuh === "ONTARIO"
        ? skorOntario
        : metodeResikoJatuh === "MORSE"
        ? skorMorse
        : null,
    keterangan:
      metodeResikoJatuh === "HUMPTY DUMPTY"
        ? ketHumptyDumpty
        : metodeResikoJatuh === "ONTARIO"
        ? ketOntario
        : metodeResikoJatuh === "MORSE"
        ? ketMorse
        : null,
    userId: userlog,
    detail:
      metodeResikoJatuh === "HUMPTY DUMPTY"
        ? [
            {
              parameter: "Usia",
              kriteria: humDumUsia.split("-").shift().toString(),
              jawaban: parseInt(humDumUsia.split("-").pop()),
            },
            {
              parameter: "JenisKelamin",
              kriteria: humDumKel.split("-").shift().toString(),
              jawaban: parseInt(humDumKel.split("-").pop()),
            },
            {
              parameter: "Diagnosa",
              kriteria: humDumDiagnosa.split("-").shift().toString(),
              jawaban: parseInt(humDumDiagnosa.split("-").pop()),
            },
            {
              parameter: "GangguanKognitif",
              kriteria: humDumGangguanKognitif.split("-").shift().toString(),
              jawaban: parseInt(humDumGangguanKognitif.split("-").pop()),
            },
            {
              parameter: "FaktorLingkungan",
              kriteria: humDumLingkungan.split("-").shift().toString(),
              jawaban: parseInt(humDumLingkungan.split("-").pop()),
            },
            {
              parameter: "Respon",
              kriteria: humDumRespon.split("-").shift().toString(),
              jawaban: parseInt(humDumRespon.split("-").pop()),
            },
            {
              parameter: "PemakaianObat",
              kriteria: humDumPemObat.split("-").shift().toString(),
              jawaban: parseInt(humDumPemObat.split("-").pop()),
            },
          ]
        : metodeResikoJatuh === "MORSE"
        ? [
            {
              parameter: "RiwayatJatuh",
              kriteria: morseRiwJatuh.split("-").shift().toString(),
              jawaban: parseInt(morseRiwJatuh.split("-").pop()),
            },
            {
              parameter: "Diagnosa",
              kriteria: morseDiagnosa.split("-").shift().toString(),
              jawaban: parseInt(morseDiagnosa.split("-").pop()),
            },
            {
              parameter: "KondisiJalan",
              kriteria: morseKondisiJalan.split("-").shift().toString(),
              jawaban: parseInt(morseKondisiJalan.split("-").pop()),
            },
            {
              parameter: "Infus",
              kriteria: morseInfus.split("-").shift().toString(),
              jawaban: parseInt(morseInfus.split("-").pop()),
            },
            {
              parameter: "KondisiBadan",
              kriteria: morseKondisiBadan.split("-").shift().toString(),
              jawaban: parseInt(morseKondisiBadan.split("-").pop()),
            },
            {
              parameter: "GangguanKognitif",
              kriteria: morseGangKognitif.split("-").shift().toString(),
              jawaban: parseInt(morseGangKognitif.split("-").pop()),
            },
          ]
        : metodeResikoJatuh === "ONTARIO"
        ? [
            {
              parameter: "RiwayatJatuh",
              kriteria: rJatuh1.split("-").shift().toString(),
              jawaban: parseInt(rJatuh1.split("-").pop()),
            },
            {
              parameter: "RiwayatJatuh",
              kriteria: rJatuh2.split("-").shift().toString(),
              jawaban: parseInt(rJatuh2.split("-").pop()),
            },
            {
              parameter: "StatusMental",
              kriteria: sMental1.split("-").shift().toString(),
              jawaban: parseInt(sMental1.split("-").pop()),
            },
            {
              parameter: "StatusMental",
              kriteria: sMental2.split("-").shift().toString(),
              jawaban: parseInt(sMental2.split("-").pop()),
            },
            {
              parameter: "StatusMental",
              kriteria: sMental3.split("-").shift().toString(),
              jawaban: parseInt(sMental3.split("-").pop()),
            },
            {
              parameter: "Penglihatan",
              kriteria: sMata1.split("-").shift().toString(),
              jawaban: parseInt(sMata1.split("-").pop()),
            },
            {
              parameter: "Penglihatan",
              kriteria: sMata2.split("-").shift().toString(),
              jawaban: parseInt(sMata2.split("-").pop()),
            },
            {
              parameter: "Penglihatan",
              kriteria: sMata3.split("-").shift().toString(),
              jawaban: parseInt(sMata3.split("-").pop()),
            },
            {
              parameter: "KebiasaanBerkemih",
              kriteria: kebiasaanBerkemih.split("-").shift().toString(),
              jawaban: parseInt(kebiasaanBerkemih.split("-").pop()),
            },
            {
              parameter: "Transfer",
              kriteria: transferTT.split("-").shift().toString(),
              jawaban: parseInt(transferTT.split("-").pop()),
            },
            {
              parameter: "Mobilitas",
              kriteria: mobilitas.split("-").shift().toString(),
              jawaban: parseInt(mobilitas.split("-").pop()),
            },
          ]
        : null,
  };

  const gcsTotal =
    parseInt(gcsGerakan) + parseInt(gcsMata) + parseInt(gcsSuara);
  //tandavital//
  const datatandavital = {
    tandaVitalId: tandaVitalId,
    registrasiId: props.pasien.result.registrasiId,
    ruangId: props.pasien.result.ruangId,
    pegawaiId: props.dpjpRuangOrder,
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
    iramaNadi: iramaNadi,
    saturasiOksigen: parseInt(saturasiOksigen),
    tekananDarahSistolik: parseInt(tekananDarahSistolik),
    tekananDarahDiastolik: parseInt(tekananDarahDiastolik),
    suhuTubuh: parseFloat(suhuTubuh),
    frekuensiNadi: parseInt(frekuensiNadi),
    frekuensiNafas: parseInt(frekuensiNafas),
    skorNyeri: parseInt(skorNyeriKirim),
    resikoJatuh:
      metodeResikoJatuh === "HUMPTY DUMPTY"
        ? skorHumptyDumpty
        : metodeResikoJatuh === "ONTARIO"
        ? skorOntario
        : metodeResikoJatuh === "MORSE"
        ? skorMorse
        : null,
    tinggiBadan: parseInt(tinggiBadan),
    beratBadan: parseFloat(beratBadan),
    userId: userlog,
    clientHost: ipPc,
    clientIP: namePc,
  };

  const handleOk = () => {
    setvisibleNyeri(false);
    setvisibleJatuh(false);
  };
  const jammasukri = dayjs(curpasRI.jamMasuk).add(24, "hours");
  const jamsekarang = dayjs();
  return (
    <div>
      <Form form={form}>
        <Row gutter={[16, 16]}>
          <Col xs={12} sm={12} md={8} lg={6} xl={6}>
            Buka Mata(E)
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={(e) => {
                  setgcsMata(e);
                }}
                value={gcsMata}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value={4}>Spontan</Option>
                <Option value={3}>Dengan Perintah</Option>
                <Option value={2}>Dengan Rangsangan Nyeri</Option>
                <Option value={1}>
                  Tidak Membuka<br></br> Dengan Rangsangan Apapun
                </Option>
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
                onChange={(e) => {
                  setgcsGerakan(e);
                }}
                value={gcsGerakan}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value={6}>Mengikuti Perintah</Option>
                <Option value={5}>Melokalisir Nyeri</Option>
                <Option value={4}>Withdraws</Option>
                <Option value={3}>Menjauhi Rangsangan Nyeri</Option>
                <Option value={2}>Extensi Spontan</Option>
                <Option value={1}>Tidak Ada Gerakan</Option>
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
                onChange={(e) => {
                  setgcsSuara(e);
                }}
                value={gcsSuara}
                //defaultValue={5}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value={5}>Orientasi Baik</Option>
                <Option value={4}>Mengacau / Disorientasi</Option>
                <Option value={3}>
                  Bisa Membentuk Kata<br></br>, Tidak Membentuk Kalimat
                </Option>
                <Option value={2}>
                  Mengeluarkan Suara<br></br> Tanpa Arti
                </Option>
                <Option value={1}>Tidak Bersuara</Option>
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
          <Col xs={12} sm={12} md={8} lg={6} xl={6}>
            <Row>
              <Col span={12}>
                TD Sistolik
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input
                    type="number"
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={tekananDarahSistolik}
                    onChange={(e) => {
                      settekananDarahSistolik(e.target.value);
                      // setewsSistolik(e.target.value < 91 || e.target.value > 219 ? 3 : e.target.value > 90 && e.target.value < 101 ? 2 : e.target.value > 100 && e.target.value < 111 ? 1
                      //     : e.target.value > 110 && e.target.value < 220 ? 0 : null);
                      // setmeowsSistolik(e.target.value < 91 || e.target.value > 219 ? 3 : e.target.value > 90 && e.target.value < 101 ? 2 : e.target.value > 100 && e.target.value < 111 ? 1
                      //     : e.target.value > 110 && e.target.value < 220 ? 0 : null);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                TD Diastolik
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input
                    type="number"
                    placeholder="..."
                    style={{ width: "100%" }}
                    onChange={(e) => settekananDarahDiastolik(e.target.value)}
                    value={tekananDarahDiastolik}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                Nadi
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input
                    type="number"
                    placeholder="..."
                    value={frekuensiNadi}
                    onChange={(e) => {
                      setfrekuensiNadi(e.target.value);
                      // setewsJantung(e.target.value < 41 || e.target.value > 130 ? 3 : e.target.value > 40 && e.target.value < 51 ? 1 : e.target.value > 50 && e.target.value < 91 ? 0
                      //     : e.target.value > 90 && e.target.value < 111 ? 1 : e.target.value > 110 && e.target.value < 131 ? 2 : null);
                      // setmeowsJantung(e.target.value < 41 || e.target.value > 130 ? 3 : e.target.value > 40 && e.target.value < 51 ? 1
                      //     : e.target.value > 50 && e.target.value < 91 ? 0 : e.target.value > 90 && e.target.value < 111 ? 1 : e.target.value > 110 && e.target.value < 131 ? 2 : null);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                Irama Nadi
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Select
                    defaultValue="Teratur"
                    placeholder="..."
                    // style={{ width: "100%" }}
                    value={iramaNadi}
                    onChange={(e) => setiramaNadi(e)}
                  >
                    <Option value="Teratur">Teratur</Option>
                    <Option value="Tidak Teratur">Tidak Teratur</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                Frekuensi Nafas
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input
                    type="number"
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={frekuensiNafas}
                    onChange={(e) => {
                      setfrekuensiNafas(e.target.value);
                      // setewsRespirasi(e.target.value < 9 || e.target.value > 24 ? 3 : e.target.value > 8 && e.target.value < 12 ? 1 : e.target.value > 11 && e.target.value < 21 ? 0
                      //     : e.target.value > 20 && e.target.value < 25 ? 2 : 99);
                      // setmeowsRespirasi(e.target.value < 9 || e.target.value > 24 ? 3 : e.target.value > 8 && e.target.value < 12 ? 1 : e.target.value > 11 && e.target.value < 21 ? 0
                      //     : e.target.value > 20 && e.target.value < 25 ? 2 : 99);
                      // setskordownNafas(e.target.value < 61 ? 0 : e.target.value > 59 && e.target.value < 81 ? 1 : e.target.value > 79 ? 2 : null)
                    }}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                Saturasi Oksigen
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input
                    type="number"
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={saturasiOksigen}
                    onChange={(e) => {
                      setsaturasiOksigen(e.target.value);
                      // setewsSatursiOksigen(e.target.value < 92 ? 3 : e.target.value > 91 && e.target.value < 94 ? 2 : e.target.value > 93 && e.target.value < 96 ? 1 : e.target.value > 95 ? 0 : null);
                      // setmeowsSatursiOksigen(e.target.value < 92 ? 3 : e.target.value > 91 && e.target.value < 94 ? 2 : e.target.value > 93 && e.target.value < 96 ? 1 : e.target.value > 95 ? 0 : null);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            Suhu
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input
                type="number"
                suffix="°C"
                placeholder="..."
                value={suhuTubuh}
                onChange={(e) => {
                  setsuhuTubuh(e.target.value);
                  // setewsSuhu(e.target.value < 35.1 ? 3 : e.target.value > 35.0 && e.target.value < 36.1 ? 1 : e.target.value > 36.0 && e.target.value < 38.1 ? 0
                  //     : e.target.value > 38.0 && e.target.value < 39.1 ? 1 : e.target.value > 38.9 ? 2 : null);
                  // setmeowsSuhu(e.target.value < 35.1 ? 3 : e.target.value > 35.0 && e.target.value < 36.1 ? 1 : e.target.value > 36.0 && e.target.value < 38.1 ? 0
                  //     : e.target.value > 38.0 && e.target.value < 39.1 ? 1 : e.target.value > 38.9 ? 2 : null);
                }}
                step={0.1}
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={6} xl={6}>
            Berat Badan
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input
                type="number"
                suffix="Kg"
                placeholder="..."
                data-role="keypad"
                step={0.1}
                value={beratBadan}
                onChange={(e) => setberatBadan(e.target.value)}
              />
            </Form.Item>
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
            IMT
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input.Group compact>
                <Input
                  type="text"
                  placeholder="..."
                  style={{ width: "30%" }}
                  disabled
                  value={IMT}
                />
                <Input
                  type="text"
                  placeholder="..."
                  style={stylekuIMT}
                  disabled
                  value={statusGizi}
                />
              </Input.Group>
            </Form.Item>
            Tanggal
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <DatePicker
                value={tglTTV}
                onChange={(date) => setTglTTV(date)}
                style={{ width: "100%" }}
                format={dateFormat}
                showTime
              />
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={8} lg={6} xl={6}>
            Skor Nyeri
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input.Group compact>
                <Input
                  value={skorNyeriKirim}
                  style={{ width: "30%" }}
                  disabled
                  placeholder="..."
                />
                {scalaNyeri === "Wong Bakes Facies" ? (
                  <Input
                    style={stylekuNyeriWong}
                    type="text"
                    placeholder="..."
                    disabled
                    value={ketWongBakesFacies}

                    // onChange={(e) => onFrekuensiNafas(e)}
                  />
                ) : (
                  <Input
                    style={stylekuNyeriLain}
                    type="text"
                    placeholder="..."
                    disabled
                    value={ketNyeriLain}

                    // onChange={(e) => onFrekuensiNafas(e)}
                  />
                )}
                <Button
                  style={{ width: "15%", backgroundColor: "#4CAF50" }}
                  onClick={() => {
                    scalaNyeri === ""
                      ? parseInt(curpasRI.umur) < 2
                        ? setscalaNyeri("NIPS")
                        : parseInt(curpasRI.umur) > 1 &&
                          parseInt(curpasRI.umur) < 4
                        ? setscalaNyeri("FLACC")
                        : parseInt(curpasRI.umur) > 7
                        ? setscalaNyeri("Visual Analog Scale")
                        : setscalaNyeri("NVPS")
                      : console.log();
                    setvisibleNyeri(true);
                  }}
                >
                  +
                </Button>
              </Input.Group>
            </Form.Item>
            Resiko Jatuh
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input.Group compact>
                {metodeResikoJatuh === "ONTARIO" ? (
                  <Input
                    style={{ width: "30%" }}
                    type="number"
                    placeholder="..."
                    disabled
                    value={skorOntario}

                    // onChange={(e) => onFrekuensiNafas(e)}
                  />
                ) : metodeResikoJatuh === "HUMPTY DUMPTY" ? (
                  <Input
                    style={{ width: "30%" }}
                    type="number"
                    placeholder="..."
                    disabled
                    value={skorHumptyDumpty}

                    // onChange={(e) => onFrekuensiNafas(e)}
                  />
                ) : metodeResikoJatuh === "MORSE" ? (
                  <Input
                    style={{ width: "30%" }}
                    type="number"
                    placeholder="..."
                    disabled
                    value={skorMorse}

                    // onChange={(e) => onFrekuensiNafas(e)}
                  />
                ) : (
                  <Input
                    style={{ width: "30%" }}
                    type="number"
                    placeholder="..."
                    disabled
                  />
                )}
                {metodeResikoJatuh === "HUMPTY DUMPTY" ? (
                  <Input
                    style={stylekuHumptyDumpty}
                    type="text"
                    placeholder="..."
                    disabled
                    value={ketHumptyDumpty}

                    // onChange={(e) => onFrekuensiNafas(e)}
                  />
                ) : metodeResikoJatuh === "ONTARIO" ? (
                  <Input
                    style={stylekuOntario}
                    type="text"
                    placeholder="..."
                    disabled
                    value={ketOntario}

                    // onChange={(e) => onFrekuensiNafas(e)}
                  />
                ) : metodeResikoJatuh === "MORSE" ? (
                  <Input
                    style={stylekuMorse}
                    type="text"
                    placeholder="..."
                    disabled
                    value={ketMorse}

                    // onChange={(e) => onFrekuensiNafas(e)}
                  />
                ) : (
                  <Input
                    style={{ width: "55%" }}
                    type="number"
                    placeholder="..."
                    disabled
                  />
                )}
                <Button
                  style={{ width: "15%", backgroundColor: "#4CAF50" }}
                  onClick={() => {
                    metodeResikoJatuh === ""
                      ? parseInt(curpasRI.umur) < 14
                        ? setmetodeResikoJatuh("HUMPTY DUMPTY")
                        : parseInt(curpasRI.umur) > 13 &&
                          parseInt(curpasRI.umur) < 60
                        ? setmetodeResikoJatuh("MORSE")
                        : setmetodeResikoJatuh("ONTARIO")
                      : console.log();
                    setvisibleJatuh(true);
                  }}
                >
                  +
                </Button>
              </Input.Group>
            </Form.Item>
            <br />
            <Text mark>nilai desimal gunakan titik ( . )</Text>
            <Row>
              <Col span={24} style={{ textAlign: "right", marginTop: 30 }}>
                <Space>
                  <Button
                    type="primary"
                    disabled={
                      userTTV === "" || userTTV === null || userTTV === []
                        ? false
                        : userTTV.toUpperCase() === userlog.toUpperCase()
                        ? false
                        : true
                    }
                    onClick={() => {
                      ListAskepById === "" || ListAskepById === []
                        ? message.warning("Silahkan Input Diagnosa Dahulu!!!")
                        : isNaN(skorNyeriKirim)
                        ? message.warning("Silahkan Isi Skor Nyeri Pasien")
                        : isNaN(skorOntario) &&
                          isNaN(skorHumptyDumpty) &&
                          isNaN(skorMorse)
                        ? message.warning(
                            "Silahkan Isi Skor Resiko Jatuh Pasien"
                          )
                        : insertTTVAssesment(
                            datatandavital,
                            datanyeri,
                            dataResikoJatuh
                          );
                    }}
                  >
                    Simpan TTV
                  </Button>
                  {/* <Button danger>Hapus</Button> */}
                  <Button
                    danger
                    disabled={
                      userTTV === "" || userTTV === null || userTTV === []
                        ? false
                        : userTTV.toUpperCase() === userlog.toUpperCase()
                        ? false
                        : true
                    }
                    onClick={() => {
                      deleteTTV(
                        props.pasien.result.registrasiId,
                        dayjs(tglTTV).format("YYYY-MM-DD HH:mm")
                      );
                      console.log(
                        props.pasien.result.registrasiId,
                        dayjs(tglTTV).format("YYYY-MM-DD HH:mm")
                      );
                    }}
                  >
                    Hapus
                  </Button>
                  <Button
                    onClick={() => {
                      setskalaNyeri1("");
                      setskalaNyeri2("");
                      setskalaNyeri3("");
                      setskalaNyeri4("");
                      setskalaNyeri5("");
                      setskalaNyeri6("");
                      setTglTTV(dayjs());
                      setTandaVitalId(0);
                      setgcsMata("");
                      setgcsSuara("");
                      setgcsGerakan("");
                      settekananDarahSistolik("");
                      settekananDarahDiastolik("");
                      setsuhuTubuh("");
                      setfrekuensiNadi("");
                      setfrekuensiNafas("");
                      setberatBadan("");
                      settinggiBadan("");
                      setsaturasiOksigen("");

                      setmetodeResikoJatuh("");
                      setrJatuh1("");
                      setrJatuh2("");
                      setsMental1("");
                      setsMental2("");
                      setsMental3("");
                      setsMata1("");
                      setsMata2("");
                      setsMata3("");
                      setkebiasaanBerkemih("");
                      settransferTT("");
                      setmobilitas("");
                      sethumDumUsia("");
                      sethumDumKel("");
                      sethumDumDiagnosa("");
                      sethumDumGangguanKognitif("");
                      sethumDumLingkungan("");
                      sethumDumRespon("");
                      sethumDumPemObat("");
                      setmorseRiwJatuh("");
                      setmorseDiagnosa("");
                      setmorseKondisiJalan("");
                      setmorseInfus("");
                      setmorseKondisiBadan("");
                      setmorseGangKognitif("");
                    }}
                  >
                    Batal
                  </Button>
                </Space>
              </Col>
            </Row>
          </Col>
        </Row>
        <Modal
          title="Assesment Nyeri"
          visible={visibleNyeri}
          width="1000px"
          footer={null}
          //onOk={handleOk}
          onCancel={handleOk}
        >
          <Row gutter={[6, 6]}>
            {/* <Divider orientation="left">Skor Nyeri</Divider> */}
            <Col span={8}>
              <Form.Item
                {...formItemLayout1}
                label={<div style={{ fontWeight: "bolder" }}>Skala Nyeri</div>}
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={scalaNyeri}
                  onChange={(e) => {
                    setscalaNyeri(e);
                    setskalaNyeri1(0);
                    setskalaNyeri2(0);
                    setskalaNyeri3(0);
                    setskalaNyeri4(0);
                    setskalaNyeri5(0);
                    setskalaNyeri6(0);
                  }}
                >
                  <Option value="Visual Analog Scale">
                    Visual Analog Scale
                  </Option>
                  <Option value="FLACC">FLACC</Option>
                  <Option value="NIPS">NIPS</Option>
                  <Option value="NVPS">NVPS</Option>
                  <Option value="Wong Bakes Facies">Wong Bakes Facies</Option>
                  <Option value="NPRS">NPRS</Option>
                </Select>
              </Form.Item>
              {/* <Form.Item {...formItemLayout1} label={<div style={{ fontWeight: "bolder" }}>Score</div>} style={{ marginBottom: 5 }}>
                                        <Input type="number" placeholder="..." disabled
                                            value={skorNyeri}
                                        //onChange={(e) => onFrekuensiNafas(e)}
                                        />
                                    </Form.Item>
                                    <Form.Item {...formItemLayout1} label={<div style={{ fontWeight: "bolder" }}>Kategori</div>} style={{ marginBottom: 5 }}>
                                        {
                                            scalaNyeri === "Wong Bakes Facies" ? <Input type="text" placeholder="..." disabled
                                                value={ketWongBakesFacies}
                                            // onChange={(e) => onFrekuensiNafas(e)}
                                            />
                                                : <Input type="text" placeholder="..." disabled
                                                    value={ketNyeriLain}
                                                // onChange={(e) => onFrekuensiNafas(e)}
                                                />
                                        }
                                    </Form.Item> */}
            </Col>
            <Col span={16}>
              {scalaNyeri === "Visual Analog Scale" ? (
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout2}
                      label="Skala"
                      style={{ marginBottom: 5 }}
                    >
                      <Slider
                        min={0}
                        max={10}
                        marks={marks}
                        value={skalaNyeri1}
                        onChange={(e) => {
                          setskalaNyeri1(e);
                        }}
                        style={{ width: "40vh" }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : scalaNyeri === "NPRS" ? (
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout24}
                      label="Skala"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        value={skalaNyeri1}
                        onChange={(e) => {
                          setskalaNyeri1(e);
                        }}
                      >
                        <Option value={0}>
                          Tidak Nyeri, Merasa Normal Sempurna
                        </Option>
                        <Option value={1}>
                          Sangat Ringan Hampir Tidak Terlihat Nyeri, Seperti
                          Gigitan Nyamuk
                        </Option>
                        <Option value={2}>
                          Nyeri Minor, Seperti Cubitan Ringan
                        </Option>
                        <Option value={3}>
                          Nyeri Sangat Nyata, Seperti Kejadian Terpotong,
                          Serangan Pada Hidung <br></br>Karena Perdarahan Hidung
                          Atau Ketika Dilakukan Injeksi
                        </Option>
                        <Option value={4}>Kuat, Nyeri Dalam</Option>
                        <Option value={5}>Kuat, Dalam, Nyeri Tajam</Option>
                        <Option value={6}>
                          Kuat, Dalam, Nyeri Tajam Sangat Kuat Mendominasi Rasa
                          Anda, <br></br>Menyebabkan Berfikir Tidak Jernih Dalam
                          Beberapa Hal
                        </Option>
                        <Option value={7}>
                          Sama Dengan Skor 6 Dan Tidak Dapat Efektif Menjalani
                          Aktifitas Normal <br></br>Dan Memerlukan Bantuan Orang
                          Lain
                        </Option>
                        <Option value={8}>
                          Nyeri Sangat Intens, Tidak Dapat Berfikir Secara
                          Jernih Sepanjang Waktu <br></br>Dan Sering Mengalami
                          Perubahan Kepribadian Berat Jika Nyeri Muncul
                          Sepanjang Waktu
                        </Option>
                        <Option value={9}>
                          Nyeri Sangat Intens, Tidak Bisa Mentolerirnya Dan
                          Menuntut Nyeri Dihilangkan <br></br>Atau Pembedahan,
                          Tidak Berfikir Apa Efek Samping Atau Resikonya
                        </Option>
                        <Option value={10}>
                          Nyeri Sangat Intens Berada Dalam Keadaan Tidak Sadar
                          Sebentar
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ) : scalaNyeri === "FLACC" ? (
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout2}
                      label="Ekspresi Wajah"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        value={skalaNyeri1}
                        onChange={(e) => {
                          setskalaNyeri1(e);
                        }}
                      >
                        <Option value={0}>
                          Rileks, Ada Kontak Mata atau Senyum
                        </Option>
                        <Option value={1}>
                          Sesekali Menangis atau Mengerutkan Kening
                        </Option>
                        <Option value={2}>
                          Sering Cemberut, Mata Tertutup, Mulut Terbuka
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Kaki"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        value={skalaNyeri2}
                        onChange={(e) => {
                          setskalaNyeri2(e);
                        }}
                      >
                        <Option value={0}>Posisi Normal atau Santai</Option>
                        <Option value={1}>Tidak Nyaman, Gelisah, Tegang</Option>
                        <Option value={2}>Menendang atau Kaki Disusun</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Aktivitas"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        defaultValue={0}
                        value={skalaNyeri3}
                        onChange={(e) => {
                          setskalaNyeri3(e);
                        }}
                      >
                        <Option value={0}>
                          Aktivitas Normal, Bergerak dengan Mudah
                        </Option>
                        <Option value={1}>
                          Menggeliat, Menggeser, Maju Mundur, Tegang
                        </Option>
                        <Option value={2}>Melengkung, Kaku</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Menangis"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        defaultValue={0}
                        value={skalaNyeri4}
                        onChange={(e) => {
                          setskalaNyeri4(e);
                        }}
                      >
                        <Option value={0}>
                          Tidak Menangis(Terjaga atau Tertidur)
                        </Option>
                        <Option value={1}>
                          Erangan atau Rengekan, Keluhan Sesekali
                        </Option>
                        <Option value={2}>
                          Menangis Terus, Teriakan atau Isak Tangis, Sering
                          Mengeluh
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Kenyamanan"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        defaultValue={0}
                        value={skalaNyeri5}
                        onChange={(e) => {
                          setskalaNyeri5(e);
                        }}
                      >
                        <Option value={0}>Tenang atau Santai</Option>
                        <Option value={1}>
                          Nyaman Ketika Disentuh, Dipeluk Sesekali
                        </Option>
                        <Option value={2}>
                          Sulit Nyaman Walaupun Sudah Disentuh, Dipeluk, atau
                          Diajak Bicara
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ) : scalaNyeri === "NIPS" ? (
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout2}
                      label="Ekspresi Wajah"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        defaultValue={0}
                        value={skalaNyeri1}
                        onChange={(e) => {
                          setskalaNyeri1(e);
                        }}
                      >
                        <Option value={0}>Santai</Option>
                        <Option value={1}>Meringis</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Menangis"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={skalaNyeri2}
                        onChange={(e) => {
                          setskalaNyeri2(e);
                        }}
                      >
                        <Option value={0}>Tidak Menagis</Option>
                        <Option value={1}>Merengek</Option>
                        <Option value={2}>Menangis Kuat</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Pola Bernafas"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={skalaNyeri3}
                        onChange={(e) => {
                          setskalaNyeri3(e);
                        }}
                      >
                        <Option value={0}>Santai</Option>
                        <Option value={1}>Perubahan Bernafas</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Lengan"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={skalaNyeri4}
                        onChange={(e) => {
                          setskalaNyeri4(e);
                        }}
                      >
                        <Option value={0}>Santai</Option>
                        <Option value={1}>Fleksi/Ekstensi</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Kaki"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={skalaNyeri5}
                        onChange={(e) => {
                          setskalaNyeri5(e);
                        }}
                      >
                        <Option value={0}>Santai</Option>
                        <Option value={1}>Fleksi/Ekstensi</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Keadaan Rangsangan"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={skalaNyeri6}
                        onChange={(e) => {
                          setskalaNyeri6(e);
                        }}
                      >
                        <Option value={0}>Tertidur/Bangun</Option>
                        <Option value={1}>Rewel</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ) : scalaNyeri === "NVPS" ? (
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout2}
                      label="Wajah"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        defaultValue={0}
                        value={skalaNyeri1}
                        onChange={(e) => {
                          setskalaNyeri1(e);
                        }}
                      >
                        <Option value={0}>
                          Tidak Ada Ekspresi Khusus atau Tersenyum
                        </Option>
                        <Option value={1}>
                          Kadang-Kadang Meringis, Menangis, Mengerinyit,
                          Mengerutkan Dahi
                        </Option>
                        <Option value={2}>
                          Sering Meringis, Menangis, Mengerinyit, Mengerutkan
                          Dahi
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Aktivitas(Gerakan)"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        defaultValue={0}
                        value={skalaNyeri2}
                        onChange={(e) => {
                          setskalaNyeri2(e);
                        }}
                      >
                        <Option value={0}>
                          Tidur Telantang, Tenang, Posisi Normal
                        </Option>
                        <Option value={1}>
                          Mencari Perhatian Melalui Gerakan Cepat atau Lambat
                        </Option>
                        <Option value={2}>
                          Gelisah, Aktivitas Berlebihan dan atau Refleks Menarik
                          Diri
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Melindungi"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        defaultValue={0}
                        value={skalaNyeri3}
                        onChange={(e) => {
                          setskalaNyeri3(e);
                        }}
                      >
                        <Option value={0}>
                          Tidur Telantang Tenang, Posisi Tangan Tidak Diatas
                          Tubuh
                        </Option>
                        <Option value={1}>
                          Melindungi Area Tubuh, Tekanan
                        </Option>
                        <Option value={2}>Rigid, Kaku</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Fisiologis"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        defaultValue={0}
                        value={skalaNyeri4}
                        onChange={(e) => {
                          setskalaNyeri4(e);
                        }}
                      >
                        <Option value={0}>Vital Sign Stabil</Option>
                        <Option value={1}>
                          Tekanan Darah Sistolik &gt; 20 mmHg, Nadi &gt;
                          20/menit
                        </Option>
                        <Option value={2}>
                          Tekanan Darah Sistolik &gt; 30 mmHg, Nadi &gt;
                          25/menit
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Respirasi"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "25vw" }}
                        defaultValue={0}
                        value={skalaNyeri5}
                        onChange={(e) => {
                          setskalaNyeri5(e);
                        }}
                      >
                        <Option value={0}>
                          RR/SpO2 Pada Garis Dasar Dengan Ventilator
                        </Option>
                        <Option value={1}>
                          RR &gt; 10 Diatas Garis Dasar atau 5% Dibawah SpO2
                          Tidak Sinkron Dengan Ventilator
                        </Option>
                        <Option value={2}>
                          RR &gt; 20 Diatas Garis Dasar atau 20% Dibawah SpO2
                          Tidak Sinkron Berat Dengan Ventilator
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ) : scalaNyeri === "Wong Bakes Facies" ? (
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout2}
                      label="Skala"
                      style={{ marginBottom: 5 }}
                    >
                      <img src={skalanyeripng} style={{ width: "333px" }} />
                      <Slider
                        min={0}
                        max={5}
                        marks={marks1}
                        value={skalaNyeri1}
                        onChange={(e) => {
                          setskalaNyeri1(e);
                        }}
                        style={{
                          width: "290px",
                          left: " 16px",
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    // insertskalanyeri(datanyeri);
                    console.log(datanyeri);
                    setvisibleNyeri(false);
                  }}
                >
                  Ambil
                </Button>
                {/* <Button danger>Hapus</Button> */}
                <Button
                  onClick={() => {
                    setvisibleNyeri(false);
                    setscalaNyeri("Visual Analog Scale");
                    setskalaNyeri1("");
                    setskalaNyeri2("");
                    setskalaNyeri3("");
                    setskalaNyeri4("");
                    setskalaNyeri5("");
                    setskalaNyeri6("");
                  }}
                >
                  Batal
                </Button>
                <Button
                  onClick={() => {
                    setvisibleNyeri(false);
                  }}
                >
                  Kembali
                </Button>
              </Space>
            </Col>
          </Row>
        </Modal>

        <Modal
          title="Assesment Resiko Jatuh"
          visible={visibleJatuh}
          width="1000px"
          footer={null}
          //onOk={handleOk}
          onCancel={handleOk}
        >
          <Row gutter={[6, 6]}>
            {/* <Divider orientation="left">Resiko Jatuh</Divider> */}
            <Col span={8}>
              <Form.Item
                {...formItemLayout1}
                label={<div style={{ fontWeight: "bolder" }}>Metode</div>}
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={metodeResikoJatuh}
                  onChange={(e) => {
                    setmetodeResikoJatuh(e);
                    // setrJatuh1(0);
                    // setrJatuh2(0);
                    // setsMental1(0);
                    // setsMental2(0);
                    // setsMental3(0);
                    // setsMata1(0);
                    // setsMata2(0);
                    // setsMata3(0);
                    // setkebiasaanBerkemih(0);
                    // settransferTT(0);
                    // setmobilitas(0);
                    // sethumDumUsia(1);
                    // sethumDumKel(curpasRI.jenisKelamin === "PEREMPUAN" ? 1 : 2);
                    // sethumDumDiagnosa(1);
                    // sethumDumGangguanKognitif(1);
                    // sethumDumLingkungan(1);
                    // sethumDumRespon(1);
                    // sethumDumPemObat(1);
                    // setmorseRiwJatuh(0);
                    // setmorseDiagnosa(0);
                    // setmorseKondisiJalan(0);
                    // setmorseInfus(0);
                    // setmorseKondisiBadan(0);
                    // setmorseGangKognitif(0);
                  }}
                >
                  <Option value="MORSE">MORSE</Option>
                  <Option value="HUMPTY DUMPTY">HUMPTY DUMPTY</Option>
                  <Option value="ONTARIO">ONTARIO</Option>
                </Select>
              </Form.Item>
              {/* <Form.Item {...formItemLayout1} label={<div style={{ fontWeight: "bolder" }}>Kategori</div>} style={{ marginBottom: 5 }}>
                                    {
                                        metodeResikoJatuh === "ONTARIO" ? <Input type="number" placeholder="..." disabled
                                            value={skorOntario}
                                        // onChange={(e) => onFrekuensiNafas(e)}
                                        />
                                            : metodeResikoJatuh === "HUMPTY DUMPTY" ? <Input type="number" placeholder="..." disabled
                                                value={skorHumptyDumpty}
                                            // onChange={(e) => onFrekuensiNafas(e)}
                                            />
                                                : metodeResikoJatuh === "MORSE" ? <Input type="number" placeholder="..." disabled
                                                    value={skorMorse}
                                                // onChange={(e) => onFrekuensiNafas(e)}
                                                />
                                                    : null
                                    }
                                </Form.Item>
                                <Form.Item {...formItemLayout1} label={<div style={{ fontWeight: "bolder" }}>Keadaan Umum</div>} style={{ marginBottom: 5 }}>
                                    {
                                        metodeResikoJatuh === "HUMPTY DUMPTY" ? <Input type="text" placeholder="..." disabled
                                            value={ketHumptyDumpty}
                                        // onChange={(e) => onFrekuensiNafas(e)}
                                        />
                                            : metodeResikoJatuh === "ONTARIO" ? <Input type="text" placeholder="..." disabled
                                                value={ketOntario}
                                            // onChange={(e) => onFrekuensiNafas(e)}
                                            />
                                                : metodeResikoJatuh === "MORSE" ? <Input type="text" placeholder="..." disabled
                                                    value={ketMorse}
                                                // onChange={(e) => onFrekuensiNafas(e)}
                                                />
                                                    : null
                                    }
                                </Form.Item> */}
            </Col>
            <Col span={1}></Col>
            <Col span={15}>
              {metodeResikoJatuh === "HUMPTY DUMPTY" ? (
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout2}
                      label="Usia"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        value={humDumUsia}
                        onChange={(e) => sethumDumUsia(e)}
                      >
                        <Option value="Usia-4">&lt;3 Tahun</Option>
                        <Option value="Usia-3">3 Tahun - &lt;7 Tahun</Option>
                        <Option value="Usia-2">7 Tahun - &lt;13 Tahun</Option>
                        <Option value="Usia-1">13 Tahun atau Lebih</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Jenis Kelamin"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        value={humDumKel}
                        onChange={(e) => sethumDumKel(e)}
                      >
                        <Option value="JenisKelamin-2">Laki-Laki</Option>
                        <Option value="JenisKelamin-1">Perempuan</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Diagnosa"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "23vw" }}
                        defaultValue={0}
                        value={humDumDiagnosa}
                        onChange={(e) => sethumDumDiagnosa(e)}
                      >
                        <Option value="Diagnosa-4">
                          Diagnosa Penyakit Syaraf
                        </Option>
                        <Option value="Diagnosa-3">
                          Perubahan Dalam Oksigenasi <br></br>(Diagnosa
                          espirasi, Dehidrasi, Anemia, Anoreksia,
                          Pingsan/Pusing){" "}
                        </Option>
                        <Option value="Diagnosa-2">Gangguan Perilaku</Option>
                        <Option value="Diagnosa-1">Diagnosa Lain </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Gangguan Kognitif"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={humDumGangguanKognitif}
                        onChange={(e) => sethumDumGangguanKognitif(e)}
                      >
                        <Option value="GangguanKognitif-3">
                          Tidak Menyadari Keterbatasan{" "}
                        </Option>
                        <Option value="GangguanKognitif-2">
                          Lupa Keterbatasan
                        </Option>
                        <Option value="GangguanKognitif-1">
                          Mengetahui Kemampuan Diri
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Faktor Lingkungan"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "23vw" }}
                        defaultValue={0}
                        value={humDumLingkungan}
                        onChange={(e) => sethumDumLingkungan(e)}
                      >
                        <Option value="FaktorLingkungan-4">
                          Riwayat Jatuh Dari Tempat Tidur Saat Infant-Todler
                        </Option>
                        <Option value="FaktorLingkungan-3">
                          Pasien Menggunakan Alat Bantu Atau Tempat Tidur
                          Bayi/Box
                        </Option>
                        <Option value="FaktorLingkungan-2">
                          Pasien Berada di Tempat Tidur
                        </Option>
                        <Option value="FaktorLingkungan-1">
                          Di Luar Ruang Rawat
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Respon Pembedahan/Obat/Anastesi"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={humDumRespon}
                        onChange={(e) => sethumDumRespon(e)}
                      >
                        <Option value="Respon-3">Dalam 24 Jam</Option>
                        <Option value="Respon-2">Dalam 48 Jam </Option>
                        <Option value="Respon-1">
                          Lebih Dari 48 Jam/Tidak Ada
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Pemakaian Obat"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "23vw" }}
                        defaultValue={0}
                        value={humDumPemObat}
                        onChange={(e) => sethumDumPemObat(e)}
                      >
                        <Option value="PemakaianObat-3">
                          Memakai Lebih Dari Satu Obat Berikut: Sedasi,
                          Hypnotic, <br></br>Barbiturares, Phenothiazines, Anti
                          Depressants, Laxatives/Diuretics, Narcotic
                        </Option>
                        <Option value="PemakaianObat-2">
                          Memakai Salah Satu Dari Jenis Obat Tersebut Diatas
                        </Option>
                        <Option value="PemakaianObat-1">
                          Obat Obat Lain/Tidak Ada{" "}
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ) : metodeResikoJatuh === "ONTARIO" ? (
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <span style={{ fontWeight: "bolder" }}>Riwayat Jatuh</span>
                    <Row>
                      <Col span={12}>
                        - Apakah Pasien Datang ke RS Karena Jatuh
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{ width: "100%", marginBottom: 5 }}
                          defaultValue={0}
                          value={rJatuh1}
                          onChange={(e) => {
                            setrJatuh1(e);
                          }}
                        >
                          <Option value="AlasanJatuh-6">Ya</Option>
                          <Option value="AlasanJatuh-0">Tidak</Option>
                        </Select>
                      </Col>
                      <Col span={12}>
                        - Jika Tidak, Apakah Pasien Mengalami Jatuh Dalam 2
                        Bulan Terakhir
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{ width: "100%", marginBottom: 5 }}
                          defaultValue={0}
                          value={rJatuh2}
                          onChange={(e) => setrJatuh2(e)}
                        >
                          <Option value="WaktuJatuh-6">Ya</Option>
                          <Option value="WaktuJatuh-0">Tidak</Option>
                        </Select>
                      </Col>
                    </Row>
                    <span style={{ fontWeight: "bolder" }}>Status Mental</span>
                    <Row>
                      <Col span={12}>
                        - Apakah Pasien Delirium?(Tidak Dapat Membuat Keputusan,
                        Pola Pikir Tidak Terorganisir, Gangguan Daya Ingat)
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{ width: "100%", marginBottom: 5 }}
                          defaultValue={0}
                          value={sMental1}
                          onChange={(e) => setsMental1(e)}
                        >
                          <Option value="Delirium-14">Ya</Option>
                          <Option value="Delirium-0">Tidak</Option>
                        </Select>
                      </Col>
                      <Col span={12}>
                        - Apakah Pasien Disorientasi? (Salah Menyebutkan Waktu,
                        Tempat Atau Orang)
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{ width: "100%", marginBottom: 5 }}
                          defaultValue={0}
                          value={sMental2}
                          onChange={(e) => setsMental2(e)}
                        >
                          <Option value="Disorientasi-14">Ya</Option>
                          <Option value="Disorientasi-0">Tidak</Option>
                        </Select>
                      </Col>
                      <Col span={12}>
                        - Apakah Pasien Mengalami Agitasi (Ketakutan, Gelisah
                        Dan Cemas)
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{ width: "100%", marginBottom: 5 }}
                          defaultValue={0}
                          value={sMental3}
                          onChange={(e) => setsMental3(e)}
                        >
                          <Option value="Agitasi-14">Ya</Option>
                          <Option value="Agitasi-0">Tidak</Option>
                        </Select>
                      </Col>
                    </Row>
                    <span style={{ fontWeight: "bolder" }}>
                      Penglihatan/Mata
                    </span>
                    <br />
                    <Row>
                      <Col span={12}>- Apakah pasien memakai Kacamata</Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{ width: "100%", marginBottom: 5 }}
                          defaultValue={0}
                          value={sMata1}
                          onChange={(e) => setsMata1(e)}
                        >
                          <Option value="MemakaiKacamata-1">Ya</Option>
                          <Option value="MemakaiKacamata-0">Tidak</Option>
                        </Select>
                      </Col>
                      <Col span={12}>
                        - Apakah Pasien Mengeluh Adanya Penglihatan Buram
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{ width: "100%", marginBottom: 5 }}
                          defaultValue={0}
                          value={sMata2}
                          onChange={(e) => setsMata2(e)}
                        >
                          <Option value="PenglihatanBuram-1">Ya</Option>
                          <Option value="PenglihatanBuram-0">Tidak</Option>
                        </Select>
                      </Col>
                      <Col span={12}>
                        - Apakah Pasien Mempunyai Glukoma, 41 Katarak Atau
                        Degenerasi Makula
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{ width: "100%", marginBottom: 5 }}
                          defaultValue={0}
                          value={sMata3}
                          onChange={(e) => setsMata3(e)}
                        >
                          <Option value="Glukoma-1">Ya</Option>
                          <Option value="Glukoma-0">Tidak</Option>
                        </Select>
                      </Col>
                    </Row>
                    <span style={{ fontWeight: "bolder" }}>
                      Kebiasaan Berkemih
                    </span>
                    <br />
                    <Row>
                      <Col span={12}>
                        - Apakah Terdapat Perubahan Perilaku Berkemih?
                        (Frekuensi, Tidak Bisa Menahan Kencing, Inkontinensia,
                        Nokturia)
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{ width: "100%", marginBottom: 5 }}
                          defaultValue={0}
                          value={kebiasaanBerkemih}
                          onChange={(e) => setkebiasaanBerkemih(e)}
                        >
                          <Option value="KebiasaanBerkemih-6">Ya</Option>
                          <Option value="KebiasaanBerkemih-0">Tidak</Option>
                        </Select>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={12}>
                        <span style={{ fontWeight: "bolder" }}>
                          {" "}
                          Transfer/Perpi Ndahan(Dari TT Ke Kursi Dan Kembali Ke
                          TT)
                        </span>
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{
                            width: "100%",
                            marginBottom: 5,
                            maxWidth: "23vw",
                          }}
                          defaultValue={0}
                          value={transferTT}
                          onChange={(e) => settransferTT(e)}
                        >
                          <Option value="Transfer-0">
                            Mandiri (Boleh Menggunakan Alat Bantu Jalan)
                          </Option>
                          <Option value="Transfer-1">
                            Memerlukan Sedikit Bantuan (1 Orang)/Dalam
                            Pengawasan
                          </Option>
                          <Option value="Transfer-2">
                            Memerlukan Bantuan Yang Nyata (2 Orang)
                          </Option>
                          <Option value="Transfer-3">
                            Tidak Dapat Duduk Dengan Seimbang, Perlu Bantuan
                            Total Di Luar Ruang Rawat
                          </Option>
                        </Select>
                      </Col>
                    </Row>
                    <br />
                    <Row>
                      <Col span={12}>
                        <span style={{ fontWeight: "bolder" }}>Mobilitas</span>
                      </Col>
                      <Col span={12}>
                        <Select
                          placeholder="..."
                          style={{
                            width: "100%",
                            marginBottom: 5,
                            maxWidth: "23vw",
                          }}
                          defaultValue={0}
                          value={mobilitas}
                          onChange={(e) => setmobilitas(e)}
                        >
                          <Option value="Mobilitas-0">
                            Mandiri (Boleh Menggunakan Alat Bantu Jalan)
                          </Option>
                          <Option value="Mobilitas-1">
                            Berjalan Dengan Bantuan 1 Orang (Verbal/Fisik)
                          </Option>
                          <Option value="Mobilitas-2">
                            Menggunakan Kursi Roda
                          </Option>
                          <Option value="Mobilitas-3">Imobilisasi</Option>
                        </Select>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              ) : metodeResikoJatuh === "MORSE" ? (
                <Row gutter={[6, 6]}>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout2}
                      label="Riwayat Jatuh"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        value={morseRiwJatuh}
                        onChange={(e) => {
                          setmorseRiwJatuh(e);
                          console.log(e);
                          console.log(e.split("-").pop());
                          console.log(e.split("-").shift());
                        }}
                      >
                        <Option value="RiwayatJatuh-25">
                          Pernah Jatuh Dalam 3 Bulan Terakhir
                        </Option>
                        <Option value="RiwayatJatuh-0">
                          Tidak Pernah Jatuh
                        </Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      {...formItemLayout2}
                      label="Diagnosa"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "23vw" }}
                        value={morseDiagnosa}
                        onChange={(e) => setmorseDiagnosa(e)}
                      >
                        <Option value="Diagnosa-15">
                          Terdapat Lebih Dari Satu Diagnosa Medis
                        </Option>
                        <Option value="Diagnosa-0">
                          Hanya Satu Diagnosa Medis
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Kondisi Jalan"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%", maxWidth: "23vw" }}
                        defaultValue={0}
                        value={morseKondisiJalan}
                        onChange={(e) => setmorseKondisiJalan(e)}
                      >
                        <Option value="KondisiJalan-30">
                          Berjalan Dengan Berpegangan Pada Furniture Untuk
                          Topangan
                        </Option>
                        <Option value="KondisiJalan-15">
                          Berjalan Menggunakan Kruk, Tongkat atau Walker{" "}
                        </Option>
                        <Option value="KondisiJalan-0">
                          Berjalan Tanpa Bantuan, Tirah Baring, Di Kursi Roda,
                          Bantuan Perawat
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Infus"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={morseInfus}
                        onChange={(e) => setmorseInfus(e)}
                      >
                        <Option value="Infus-20">Diinfus</Option>
                        <Option value="Infus-0">Tidak Diinfus</Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Kondisi Badan"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={morseKondisiBadan}
                        onChange={(e) => setmorseKondisiBadan(e)}
                      >
                        <Option value="KondisiBadan-20">Terganggu</Option>
                        <Option value="KondisiBadan-10">Lemah</Option>
                        <Option value="KondisiBadan-0">
                          Normal, Tirah Baring, Tidak Bergerak
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayout2}
                      label="Gangguan Kognitif"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        defaultValue={0}
                        value={morseGangKognitif}
                        onChange={(e) => setmorseGangKognitif(e)}
                      >
                        <Option value="GangguanKognitif-15">
                          Lupa Keterbatasan
                        </Option>
                        <Option value="GangguanKognitif-0">
                          Mengetahui Kemampuan Diri
                        </Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              ) : null}
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    // insertResikoJatuh(dataResikoJatuh);
                    setvisibleJatuh(false);
                    console.log("data resiko jatuh ", dataResikoJatuh);
                  }}
                >
                  Ambil
                </Button>
                {/* <Button danger>Hapus</Button> */}
                <Button
                  onClick={() => {
                    setvisibleJatuh(false);
                    setmetodeResikoJatuh("");
                    setrJatuh1("");
                    setrJatuh2("");
                    setsMental1("");
                    setsMental2("");
                    setsMental3("");
                    setsMata1("");
                    setsMata2("");
                    setsMata3("");
                    setkebiasaanBerkemih("");
                    settransferTT("");
                    setmobilitas("");
                    sethumDumUsia("");
                    sethumDumKel("");
                    sethumDumDiagnosa("");
                    sethumDumGangguanKognitif("");
                    sethumDumLingkungan("");
                    sethumDumRespon("");
                    sethumDumPemObat("");
                    setmorseRiwJatuh("");
                    setmorseDiagnosa("");
                    setmorseKondisiJalan("");
                    setmorseInfus("");
                    setmorseKondisiBadan("");
                    setmorseGangKognitif("");
                  }}
                >
                  Batal
                </Button>
                <Button
                  onClick={() => {
                    setvisibleJatuh(false);
                  }}
                >
                  Kembali
                </Button>
              </Space>
            </Col>
          </Row>
        </Modal>
        <Row>
          <Col span={24}>
            <Card size="small">
              <Tabs defaultActiveKey="1">
                <TabPane tab="Grafik" key="1">
                  <FormGrafikTTV />
                </TabPane>
                <TabPane tab="Table" key="2">
                  <Table
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (e) => {
                          getTTVById(record.tandaVitalId);
                          getNyeriByRegDate(
                            props.pasien.result.registrasiId,
                            dayjs(record.tanggal).format("YYYY-MM-DD HH:mm")
                          );
                          getResikoJatuhByRegDate(
                            props.pasien.result.registrasiId,
                            dayjs(record.tanggal).format("YYYY-MM-DD HH:mm")
                          );
                          setWarnaRow(rowIndex);
                        },
                      };
                    }}
                    bordered
                    locale={{
                      emptyText: <Empty description="Data Catatan Kosong" />,
                    }}
                    pagination={{ pageSize: 5 }}
                    dataSource={ttvAllByNoreg}
                    size="small"
                    rowKey="reg"
                    rowClassName={(record, rowIndex) =>
                      rowIndex === warnaRow ? "warnacolompilih" : null
                    }
                  >
                    <Column
                      title="Tanggal"
                      width="20%"
                      // defaultSortOrder="descend"
                      // sorter={(a, b) => a.tanggal.localeCompare(b.tanggal)}
                      render={(ttvAllByNoreg) =>
                        dayjs(ttvAllByNoreg.tanggal).format("DD-MM-YYYY HH:mm")
                      }
                    />
                    <Column
                      title="GCS"
                      key="reg"
                      width="10%"
                      render={(ttvAllByNoreg) => ttvAllByNoreg.gcsTotal}
                    />
                    <Column
                      title="Tensi"
                      key="reg"
                      width="10%"
                      render={(ttvAllByNoreg) =>
                        ttvAllByNoreg.tekananDarahSistolik +
                        " / " +
                        ttvAllByNoreg.tekananDarahDiastolik
                      }
                    />
                    <Column
                      title="Nadi"
                      key="reg"
                      width="10%"
                      render={(ttvAllByNoreg) => ttvAllByNoreg.frekuensiNadi}
                    />
                    <Column
                      title="Suhu"
                      key="reg"
                      width="10%"
                      render={(ttvAllByNoreg) => ttvAllByNoreg.suhuTubuh}
                    />
                    <Column
                      title="Respirasi"
                      key="reg"
                      width="10%"
                      render={(ttvAllByNoreg) => ttvAllByNoreg.frekuensiNafas}
                    />
                    <Column
                      title="Nyeri"
                      key="reg"
                      width="10%"
                      render={(ttvAllByNoreg) => ttvAllByNoreg.skorNyeri}
                    />
                    <Column
                      title="User"
                      key="reg"
                      width="10%"
                      render={(ttvAllByNoreg) => ttvAllByNoreg.userId}
                    />
                  </Table>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormTandaVital;
