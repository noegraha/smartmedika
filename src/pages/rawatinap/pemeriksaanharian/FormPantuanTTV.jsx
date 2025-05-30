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
  Checkbox,
  Tag,
  Alert,
} from "antd";
import dayjs from "dayjs";
import skalanyeripng from "../../../skalanyeri.png";
import Column from "antd/lib/table/Column";
import FormGrafikTTV from "./FormGrafikTTV";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import { AskepContext } from "../context/AskepContext";
import { EwsRIContext } from "../context/EwsContext";
import { TTVRIContext } from "../context/TandaVitalAskepRIContext";
import FormEwsGrafik from "./FormGrafikEWS";
import { AssesmentRIContext } from "../context/AssesmentRIContext";
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
const FormPantuanTTV = () => {
  const [form] = Form.useForm();
  const [warnaRow, setWarnaRow] = useState([]);
  const [datapenanganan, setdatapenanganan] = useState([]);
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
    getTTVAllBynoregLengkap,
    setttvAllByNoregLengkap,
    ttvAllByNoregLengkap,
    insertTTVHarian,

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
    getResikoJatuhByRegDateLengkap,
    deleteTTV,
    deleteNyeribydate,
    deleteResikoJatuhbydate,

    spin,
    setSpin,
    getPenangananResikoJatuh,
    penangananResikoJatuh,
    setpenangananResikoJatuh,
    penangananId,
    setpenangananId,
  } = useContext(TTVRIContext);
  const { nilaiKritis, setnilaiKritis } = useContext(AssesmentRIContext);
  const {
    visibleEWSBerkala,
    setvisibleEWSBerkala,
    tglews,
    setTglews,
    ewsRespirasi,
    setewsRespirasi,
    ewsSatursiOksigen,
    setewsSatursiOksigen,
    ewsSuplemenOksigen,
    setewsSuplemenOksigen,
    ewsSuhu,
    setewsSuhu,
    ewsSistolik,
    setewsSistolik,
    ewsJantung,
    setewsJantung,
    ewsKesadaran,
    setewsKesadaran,
    ewsByredAll,
    setEWSByRegAll,
    insertEWS,
    getEwsAll,
    getEwsByRegDate,
    deleteEwsbydate,
    userEWS,
    setuserEWS,
    visibleEWSBerkalaEdit,
    setvisibleEWSBerkalaEdit,

    meowsId,
    setMeowsId,
    meowsRespirasi,
    setmeowsRespirasi,
    meowsSatursiOksigen,
    setmeowsSatursiOksigen,
    meowsSuplemenOksigen,
    setmeowsSuplemenOksigen,
    meowsSuhu,
    setmeowsSuhu,
    meowsSistolik,
    setmeowsSistolik,
    meowsJantung,
    setmeowsJantung,
    meowsKesadaran,
    setmeowsKesadaran,
    meowsProteinUrine,
    setmeowsProteinUrine,
    meowsProduksiUrine,
    setmeowsProduksiUrine,
    meowsLochea,
    setmeowsLochea,
    meowsCairan,
    setmeowsCairan,
    meowsTandaInfeksi,
    setmeowsTandaInfeksi,
    visibleMeows,
    setvisibleMeows,
    skorDownId,
    setskorDownId,
    skordownNafas,
    setskordownNafas,
    skordownRetraksi,
    setskordownRetraksi,
    skordownSianosis,
    setskordownSianosis,
    skordownAirEntry,
    setskordownAirEntry,
    skordownMerintih,
    setskordownMerintih,
    visibleSkorDown,
    setvisibleSkorDown,
    visibleEws,
    setvisibleEws,
    insertMEOWS,
    insertSkorDown,
  } = useContext(EwsRIContext);

  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { ListAskepById } = useContext(AskepContext);
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

  const IMT =
    tinggiBadan === "" ||
    tinggiBadan === undefined ||
    tinggiBadan === [] ||
    beratBadan === "" ||
    beratBadan === undefined ||
    beratBadan === []
      ? ""
      : (parseFloat(beratBadan),
        (beratBadan / Math.pow(tinggiBadan / 100, 2)).toFixed(2));
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
    registrasiId: curpasRI.noreg,
    ruangId: curpasRI.kodeBagian,
    tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
    metode: scalaNyeri,
    keterangan:
      scalaNyeri === "Wong Bakes Facies" ? ketWongBakesFacies : ketNyeriLain,
    userId: namauser,
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
    registrasiId: curpasRI.noreg,
    pasienId: curpasRI.nopasien,
    ruangId: curpasRI.kodeBagian,
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
    userId: namauser,
    detail:
      metodeResikoJatuh === "HUMPTY DUMPTY"
        ? [
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Usia",
              kriteria: humDumUsia.split("-").shift().toString(),
              jawaban: parseInt(humDumUsia.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "JenisKelamin",
              kriteria: humDumKel.split("-").shift().toString(),
              jawaban: parseInt(humDumKel.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Diagnosa",
              kriteria: humDumDiagnosa.split("-").shift().toString(),
              jawaban: parseInt(humDumDiagnosa.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "GangguanKognitif",
              kriteria: humDumGangguanKognitif.split("-").shift().toString(),
              jawaban: parseInt(humDumGangguanKognitif.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "FaktorLingkungan",
              kriteria: humDumLingkungan.split("-").shift().toString(),
              jawaban: parseInt(humDumLingkungan.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Respon",
              kriteria: humDumRespon.split("-").shift().toString(),
              jawaban: parseInt(humDumRespon.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "PemakaianObat",
              kriteria: humDumPemObat.split("-").shift().toString(),
              jawaban: parseInt(humDumPemObat.split("-").pop()),
            },
          ]
        : metodeResikoJatuh === "MORSE"
        ? [
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "RiwayatJatuh",
              kriteria: morseRiwJatuh.split("-").shift().toString(),
              jawaban: parseInt(morseRiwJatuh.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Diagnosa",
              kriteria: morseDiagnosa.split("-").shift().toString(),
              jawaban: parseInt(morseDiagnosa.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "KondisiJalan",
              kriteria: morseKondisiJalan.split("-").shift().toString(),
              jawaban: parseInt(morseKondisiJalan.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Infus",
              kriteria: morseInfus.split("-").shift().toString(),
              jawaban: parseInt(morseInfus.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "KondisiBadan",
              kriteria: morseKondisiBadan.split("-").shift().toString(),
              jawaban: parseInt(morseKondisiBadan.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "GangguanKognitif",
              kriteria: morseGangKognitif.split("-").shift().toString(),
              jawaban: parseInt(morseGangKognitif.split("-").pop()),
            },
          ]
        : metodeResikoJatuh === "ONTARIO"
        ? [
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "RiwayatJatuh",
              kriteria: rJatuh1.split("-").shift().toString(),
              jawaban: parseInt(rJatuh1.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "RiwayatJatuh",
              kriteria: rJatuh2.split("-").shift().toString(),
              jawaban: parseInt(rJatuh2.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "StatusMental",
              kriteria: sMental1.split("-").shift().toString(),
              jawaban: parseInt(sMental1.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "StatusMental",
              kriteria: sMental2.split("-").shift().toString(),
              jawaban: parseInt(sMental2.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "StatusMental",
              kriteria: sMental3.split("-").shift().toString(),
              jawaban: parseInt(sMental3.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Penglihatan",
              kriteria: sMata1.split("-").shift().toString(),
              jawaban: parseInt(sMata1.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Penglihatan",
              kriteria: sMata2.split("-").shift().toString(),
              jawaban: parseInt(sMata2.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Penglihatan",
              kriteria: sMata3.split("-").shift().toString(),
              jawaban: parseInt(sMata3.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "KebiasaanBerkemih",
              kriteria: kebiasaanBerkemih.split("-").shift().toString(),
              jawaban: parseInt(kebiasaanBerkemih.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Transfer",
              kriteria: transferTT.split("-").shift().toString(),
              jawaban: parseInt(transferTT.split("-").pop()),
            },
            {
              id: 0,
              registrasiId: curpasRI.noreg,
              tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
              parameter: "Mobilitas",
              kriteria: mobilitas.split("-").shift().toString(),
              jawaban: parseInt(mobilitas.split("-").pop()),
            },
          ]
        : null,
    detailPenanganan: datapenanganan,
  };
  const dataMeows = {
    registrasiId: curpasRI.registrasiId,
    pasienId: curpasRI.pasienId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglTTV).format("YYYY-MM-DD HH:mm").toString(),
    totalScore: meowsTotal,
    kesimpulan:
      meowsTotal === ""
        ? ""
        : meowsTotal >= 0 && meowsTotal < 5
        ? "Hijau"
        : meowsTotal > 4 && meowsTotal < 7
        ? "Orange"
        : meowsTotal > 6
        ? "Merah"
        : "",
    proteinUrine: meowsProteinUrine,
    produksiUrine: meowsProduksiUrine,
    lochea: meowsLochea,
    cairan: meowsCairan,
    tandaInfeksi: meowsTandaInfeksi,
    verifikasi: true,
    userId: namauser,
    detail: [
      {
        parameter: "meowsRespirasi",
        hasil: parseInt(meowsRespirasi.split("-").shift()),
        value: parseInt(meowsRespirasi.split("-").pop()),
      },
      {
        parameter: "meowsSatursiOksigen",
        hasil: parseInt(meowsSatursiOksigen.split("-").shift()),
        value: parseInt(meowsSatursiOksigen.split("-").pop()),
      },
      {
        parameter: "meowsSuplemenOksigen",
        hasil: parseInt(meowsSuplemenOksigen.split("-").shift()),
        value: parseInt(meowsSuplemenOksigen.split("-").pop()),
      },
      {
        parameter: "meowsSuhu",
        hasil: parseInt(meowsSuhu.split("-").shift()),
        value: parseInt(meowsSuhu.split("-").pop()),
      },
      {
        parameter: "meowsSistolik",
        hasil: parseInt(meowsSistolik.split("-").shift()),
        value: parseInt(meowsSistolik.split("-").pop()),
      },
      {
        parameter: "meowsJantung",
        hasil: parseInt(meowsJantung.split("-").shift()),
        value: parseInt(meowsJantung.split("-").pop()),
      },
      {
        parameter: "meowsKesadaran",
        hasil: parseInt(meowsKesadaran.split("-").shift()),
        value: parseInt(meowsKesadaran.split("-").pop()),
      },
    ],
  };

  const dataScoreDown = {
    id: skorDownId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
    pasienId: curpasRI.pasienId,
    frekuensiNafas: skordownNafas,
    retraksi: skordownRetraksi,
    sianosis: skordownSianosis,
    airEntry: skordownAirEntry,
    merintih: skordownMerintih,
    totalScore: skordownTotal,
    kesimpulan:
      skordownTotal === ""
        ? ""
        : skordownTotal < 4
        ? "Hijau"
        : skordownTotal > 4 && skordownTotal < 7
        ? "Orange"
        : skordownTotal > 7
        ? "Merah"
        : "",
    verifikasi: true,
    userId: namauser,
  };
  const skordownTotal =
    parseInt(skordownNafas) +
    parseInt(skordownRetraksi) +
    parseInt(skordownSianosis) +
    parseInt(skordownAirEntry) +
    parseInt(skordownMerintih);
  const ketSkorDown =
    skordownTotal === ""
      ? ""
      : skordownTotal < 4
      ? "Pengkajian ulang setiap 8 jam. Pasien di rawat di ruang biasa"
      : skordownTotal > 3 && skordownTotal < 8
      ? "Kondisi pasien dilaporkan kepada DPJP, Pasien dipindah ke ruang intensif/ruang pengawasan. Pengkajian ulang di ruang pengawasan dilakukan setiap 3 jam"
      : skordownTotal > 7
      ? "Kondisi pasien dilaporkan kepada DPJP, Pasien dipindah ke ruang intensif/ruang pengawasan. Pengkajian ulang di ruang pengawasan dilakukan setiap 2 jam."
      : "";
  const stylekuSkorDown =
    skordownTotal === ""
      ? { width: "100%", color: "black" }
      : skordownTotal < 4
      ? { backgroundColor: "lightgreen", width: "100%", color: "black" }
      : skordownTotal > 3 && skordownTotal < 8
      ? { backgroundColor: "darkorange", width: "100%", color: "black" }
      : skordownTotal > 7
      ? { backgroundColor: "lightcoral", width: "100%", color: "black" }
      : { width: "100%", color: "black" };

  const gcsTotal =
    parseInt(gcsGerakan) + parseInt(gcsMata) + parseInt(gcsSuara);
  //tandavital//
  const datatandavital = {
    tandaVitalId: tandaVitalId,
    registrasiId: curpasRI.noreg,
    ruangId: curpasRI.kodeBagian,
    pegawaiId: curpasRI.dokterPenanggungJawab,
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
    tinggiBadan:
      tinggiBadan === " " ||
      tinggiBadan === "" ||
      tinggiBadan === "" ||
      tinggiBadan === undefined ||
      tinggiBadan === []
        ? null
        : parseInt(tinggiBadan),
    beratBadan:
      beratBadan === " " ||
      beratBadan === "" ||
      beratBadan === "" ||
      beratBadan === undefined ||
      beratBadan === []
        ? null
        : parseFloat(beratBadan),
    userId: namauser,
    clientHost: host,
    clientIP: ip,
  };

  const handleOk = () => {
    setvisibleNyeri(false);
    setvisibleJatuh(false);
  };

  const ewsTotal =
    parseInt(ewsRespirasi.split("-").pop()) +
    parseInt(ewsSatursiOksigen.split("-").pop()) +
    parseInt(ewsSuplemenOksigen.split("-").pop()) +
    parseInt(ewsSuhu.split("-").pop()) +
    parseInt(ewsSistolik.split("-").pop()) +
    parseInt(ewsJantung.split("-").pop()) +
    parseInt(ewsKesadaran.split("-").pop());

  const ketEws =
    ewsTotal === ""
      ? ""
      : ewsTotal >= 0 && ewsTotal < 5
      ? "Pengkajian ulang setiap 8 jam. Pasien di rawat di ruang rawat biasa"
      : ewsTotal > 4 && ewsTotal < 7
      ? "Kondisi pasien dilaporkan kepada DPJP, pasien di pindah ke ruang internsif/ruang pengawasan. Pengkajian ulang dilakukan setiap 3 jam"
      : ewsTotal > 6
      ? "Kondisi pasien dilaporkan kepada DPJP, pasien di pindah ke ruang intensif/ruang pengawasan . Pengkajian ulang dilakukan setiap 2 jam."
      : "...";
  const stylekuEws =
    ewsTotal === ""
      ? { width: "100%" }
      : ewsTotal >= 0 && ewsTotal < 5
      ? { backgroundColor: "lightgreen", width: "100%" }
      : ewsTotal > 4 && ewsTotal < 7
      ? { backgroundColor: "darkorange", width: "100%" }
      : ewsTotal > 6
      ? { backgroundColor: "lightcoral", width: "100%" }
      : { width: "100%" };
  const dataEWS = {
    registrasiId: curpasRI.noreg,
    ruangId: curpasRI.kodeBagian,
    tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm").toString(),
    ewsScore: ewsTotal,
    ewsKategori:
      ewsTotal === ""
        ? ""
        : ewsTotal >= 0 && ewsTotal < 5
        ? "Hijau"
        : ewsTotal > 4 && ewsTotal < 7
        ? "Orange"
        : ewsTotal > 7
        ? "Merah"
        : "...",
    userId: userEWS === "" || null ? namauser : userEWS,
    detail: [
      {
        parameter: "ewsRespirasi",
        hasil: parseInt(ewsRespirasi.split("-").shift()),
        value: parseInt(ewsRespirasi.split("-").pop()),
      },
      {
        parameter: "ewsSatursiOksigen",
        hasil: parseInt(ewsSatursiOksigen.split("-").shift()),
        value: parseInt(ewsSatursiOksigen.split("-").pop()),
      },
      {
        parameter: "ewsSuplemenOksigen",
        hasil: parseInt(ewsSuplemenOksigen.split("-").shift()),
        value: parseInt(ewsSuplemenOksigen.split("-").pop()),
      },
      {
        parameter: "ewsSuhu",
        hasil: parseInt(ewsSuhu.split("-").shift()),
        value: parseInt(ewsSuhu.split("-").pop()),
      },
      {
        parameter: "ewsSistolik",
        hasil: parseInt(ewsSistolik.split("-").shift()),
        value: parseInt(ewsSistolik.split("-").pop()),
      },
      {
        parameter: "ewsJantung",
        hasil: parseInt(ewsJantung.split("-").shift()),
        value: parseInt(ewsJantung.split("-").pop()),
      },
      {
        parameter: "ewsKesadaran",
        hasil: parseInt(ewsKesadaran.split("-").shift()),
        value: parseInt(ewsKesadaran.split("-").pop()),
      },
    ],
  };

  const meowsTotal =
    parseInt(meowsRespirasi.split("-").pop()) +
    parseInt(meowsSatursiOksigen.split("-").pop()) +
    parseInt(meowsSuplemenOksigen.split("-").pop()) +
    parseInt(meowsSuhu.split("-").pop()) +
    parseInt(meowsSistolik.split("-").pop()) +
    parseInt(meowsJantung.split("-").pop()) +
    parseInt(meowsKesadaran.split("-").pop());

  const ketMeows =
    meowsTotal === ""
      ? ""
      : meowsTotal >= 0 && meowsTotal < 5
      ? "Pengkajian ulang setiap 8 jam. Pasien di rawat di ruang rawat biasa"
      : meowsTotal > 4 && meowsTotal < 7
      ? "Kondisi pasien dilaporkan kepada DPJP, pasien di pindah ke ruang internsif/ruang pengawasan. Pengkajian ulang dilakukan setiap 3 jam"
      : meowsTotal > 6
      ? "Kondisi pasien dilaporkan kepada DPJP, pasien di pindah ke ruang intensif/ruang pengawasan . Pengkajian ulang dilakukan setiap 2 jam."
      : "";
  const stylekuMeows =
    meowsTotal === ""
      ? { width: "100%", color: "black" }
      : meowsTotal >= 0 && meowsTotal < 5
      ? { backgroundColor: "lightgreen", width: "100%", color: "black" }
      : meowsTotal > 4 && meowsTotal < 7
      ? { backgroundColor: "darkorange", width: "100%", color: "black" }
      : meowsTotal > 6
      ? { backgroundColor: "lightcoral", width: "100%", color: "black" }
      : { width: "100%", color: "black" };
  const jammasukri = dayjs(curpasRI.jamMasuk).add(24, "hours");
  const jamsekarang = dayjs();
  const insertData = (datatandavital, datanyeri, dataResikoJatuh, dataEWS) => {
    insertTTVHarian(datatandavital, datanyeri, dataResikoJatuh);
    insertEWS(dataEWS);
  };

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
              <Row>
                <Col span={8}>
                  <Input
                    disabled
                    type="number"
                    style={{ width: "100%" }}
                    placeholder="..."
                    value={gcsTotal}
                  />
                </Col>
                <Col span={16}>
                  <Input
                    disabled
                    type="text"
                    style={{ width: "100%" }}
                    placeholder="..."
                    value={
                      gcsTotal > 13
                        ? "composmentis"
                        : gcsTotal > 11 && gcsTotal < 14
                        ? "apatis"
                        : gcsTotal > 9 && gcsTotal < 12
                        ? "delirium"
                        : gcsTotal > 6 && gcsTotal < 10
                        ? "somnolen"
                        : gcsTotal > 4 && gcsTotal < 7
                        ? "sopor"
                        : gcsTotal === 4
                        ? "semi coma"
                        : gcsTotal < 4
                        ? " coma"
                        : ""
                    }
                  />
                </Col>
              </Row>
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
                      e.target.value < 91
                        ? setewsSistolik("1-3")
                        : e.target.value > 90 && e.target.value < 101
                        ? setewsSistolik("2-2")
                        : e.target.value > 100 && e.target.value < 111
                        ? setewsSistolik("3-1")
                        : e.target.value > 110 && e.target.value < 220
                        ? setewsSistolik("4-0")
                        : e.target.value > 219
                        ? setewsSistolik("5-3")
                        : setewsSistolik("");

                      e.target.value < 91
                        ? setmeowsSistolik("1-3")
                        : e.target.value > 90 && e.target.value < 101
                        ? setmeowsSistolik("2-2")
                        : e.target.value > 100 && e.target.value < 111
                        ? setmeowsSistolik("3-1")
                        : e.target.value > 110 && e.target.value < 220
                        ? setmeowsSistolik("4-0")
                        : e.target.value > 219
                        ? setmeowsSistolik("5-3")
                        : setmeowsSistolik("");
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
                      e.target.value < 41
                        ? setewsJantung("1-3")
                        : e.target.value > 40 && e.target.value < 51
                        ? setewsJantung("2-1")
                        : e.target.value > 50 && e.target.value < 91
                        ? setewsJantung("3-0")
                        : e.target.value > 90 && e.target.value < 111
                        ? setewsJantung("4-1")
                        : e.target.value > 110 && e.target.value < 131
                        ? setewsJantung("5-2")
                        : e.target.value > 130
                        ? setewsJantung("6-3")
                        : setewsJantung("");

                      e.target.value < 41
                        ? setmeowsJantung("1-3")
                        : e.target.value > 40 && e.target.value < 51
                        ? setmeowsJantung("2-1")
                        : e.target.value > 50 && e.target.value < 91
                        ? setmeowsJantung("3-0")
                        : e.target.value > 90 && e.target.value < 111
                        ? setmeowsJantung("4-1")
                        : e.target.value > 110 && e.target.value < 131
                        ? setmeowsJantung("5-2")
                        : e.target.value > 130
                        ? setmeowsJantung("6-3")
                        : setmeowsJantung("");
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
                      e.target.value < 9
                        ? setewsRespirasi("1-3")
                        : e.target.value > 8 && e.target.value < 12
                        ? setewsRespirasi("2-1")
                        : e.target.value > 11 && e.target.value < 21
                        ? setewsRespirasi("3-0")
                        : e.target.value > 20 && e.target.value < 25
                        ? setewsRespirasi("4-2")
                        : e.target.value > 24
                        ? setewsRespirasi("5-3")
                        : setewsRespirasi("");

                      e.target.value < 11
                        ? setmeowsRespirasi("1-3")
                        : e.target.value > 20 && e.target.value < 26
                        ? setmeowsRespirasi("2-1")
                        : e.target.value > 10 && e.target.value < 21
                        ? setmeowsRespirasi("3-0")
                        : e.target.value > 25 && e.target.value < 31
                        ? setmeowsRespirasi("4-2")
                        : e.target.value > 29
                        ? setmeowsRespirasi("5-3")
                        : setmeowsRespirasi("");

                      e.target.value < 61
                        ? setskordownNafas(0)
                        : e.target.value > 59 && e.target.value < 81
                        ? setskordownNafas(1)
                        : e.target.value > 80
                        ? setskordownNafas(2)
                        : setskordownNafas("");
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
                      e.target.value < 92
                        ? setewsSatursiOksigen("1-3")
                        : e.target.value > 91 && e.target.value < 94
                        ? setewsSatursiOksigen("2-2")
                        : e.target.value > 93 && e.target.value < 95
                        ? setewsSatursiOksigen("3-1")
                        : e.target.value > 94
                        ? setewsSatursiOksigen("4-0")
                        : setewsSatursiOksigen("");

                      e.target.value < 92
                        ? setmeowsSatursiOksigen("1-3")
                        : e.target.value > 91 && e.target.value < 94
                        ? setmeowsSatursiOksigen("2-2")
                        : e.target.value > 93 && e.target.value < 96
                        ? setmeowsSatursiOksigen("3-1")
                        : e.target.value > 95
                        ? setmeowsSatursiOksigen("4-0")
                        : setmeowsSatursiOksigen("");
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
                  e.target.value < 35.1
                    ? setewsSuhu("1-3")
                    : e.target.value > 35 && e.target.value < 36.1
                    ? setewsSuhu("2-1")
                    : e.target.value > 36 && e.target.value < 38.1
                    ? setewsSuhu("3-0")
                    : e.target.value > 38 && e.target.value < 39.1
                    ? setewsSuhu("4-1")
                    : e.target.value > 38.9
                    ? setewsSuhu("5-2")
                    : setewsSuhu("");

                  e.target.value < 35.1
                    ? setmeowsSuhu("1-2")
                    : e.target.value > 35 && e.target.value < 36.1
                    ? setmeowsSuhu("2-1")
                    : e.target.value > 36 && e.target.value < 38.1
                    ? setmeowsSuhu("3-0")
                    : e.target.value > 38 && e.target.value < 39.1
                    ? setmeowsSuhu("4-1")
                    : e.target.value > 38.9
                    ? setmeowsSuhu("5-2")
                    : setmeowsSuhu("");
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

                    metodeResikoJatuh === "MORSE" &&
                    skorMorse > 24 &&
                    skorMorse < 51
                      ? getPenangananResikoJatuh("MORSE", "RENDAH")
                      : metodeResikoJatuh === "MORSE" && skorMorse > 50
                      ? getPenangananResikoJatuh("MORSE", "%20")
                      : metodeResikoJatuh === "ONTARIO" && skorOntario < 6
                      ? getPenangananResikoJatuh("ONTARIO", "RENDAH")
                      : metodeResikoJatuh === "ONTARIO" && skorOntario > 5
                      ? getPenangananResikoJatuh("ONTARIO", "%20")
                      : metodeResikoJatuh === "HUMPTY DUMPTY" &&
                        skorHumptyDumpty > 6 &&
                        skorHumptyDumpty < 12
                      ? getPenangananResikoJatuh("HUMPTY DUMPTY", "RENDAH")
                      : metodeResikoJatuh === "HUMPTY DUMPTY" &&
                        skorHumptyDumpty > 11
                      ? getPenangananResikoJatuh("HUMPTY DUMPTY", "%20")
                      : setpenangananId([]);

                    setvisibleJatuh(true);
                  }}
                >
                  +
                </Button>
              </Input.Group>
            </Form.Item>
            <Row>
              <Col span={12}>
                Nilai Kegawatan
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="..."
                    optionFilterProp="children"
                    onChange={(e) => {
                      setnilaiKritis(e);
                      e === "EWS"
                        ? setvisibleEws(true)
                        : e === "SCORDOWN"
                        ? setvisibleSkorDown(true)
                        : e === "MEOWS"
                        ? setvisibleMeows(true)
                        : console.log("e");
                    }}
                    value={nilaiKritis}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="EWS">EWS</Option>
                    <Option value="SCORDOWN">Scordown</Option>
                    <Option value="MEOWS">Meows</Option>
                    <Option value="...">...</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                Total Skor
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  {nilaiKritis === "EWS" ? (
                    <>
                      <Input
                        style={{ color: "black" }}
                        type="text"
                        placeholder="..."
                        disabled
                        value={ewsTotal}
                      />
                    </>
                  ) : nilaiKritis === "SCORDOWN" ? (
                    <>
                      <Input
                        style={{ color: "black" }}
                        type="text"
                        placeholder="..."
                        disabled
                        value={skordownTotal}
                      />
                    </>
                  ) : nilaiKritis === "MEOWS" ? (
                    <>
                      <Input
                        style={{ color: "black" }}
                        type="text"
                        placeholder="..."
                        disabled
                        value={meowsTotal}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        type="text"
                        placeholder="..."
                        disabled
                        style={{ color: "black" }}
                      />
                    </>
                  )}
                </Form.Item>
              </Col>
            </Row>
            Keterangan
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Row>
                <Col span={24}>
                  {nilaiKritis === "EWS" ? (
                    <>
                      <Input
                        type="text"
                        placeholder="..."
                        disabled
                        value={ketEws}
                        style={stylekuEws}
                      />
                    </>
                  ) : nilaiKritis === "SCORDOWN" ? (
                    <>
                      <Input
                        type="text"
                        placeholder="..."
                        disabled
                        value={ketSkorDown}
                        style={stylekuSkorDown}
                      />
                    </>
                  ) : nilaiKritis === "MEOWS" ? (
                    <>
                      <Input
                        type="text"
                        placeholder="..."
                        disabled
                        value={ketMeows}
                        style={stylekuMeows}
                      />
                    </>
                  ) : (
                    <>
                      <Input
                        type="text"
                        placeholder="..."
                        disabled
                        style={{ color: "black" }}
                      />
                    </>
                  )}
                </Col>
              </Row>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <br />
            <Text mark>nilai desimal gunakan titik ( . )</Text>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Space>
              <Button
                type="primary"
                disabled={
                  userTTV === "" || userTTV === null || userTTV === []
                    ? false
                    : userTTV.toUpperCase() === namauser.toUpperCase()
                    ? false
                    : true
                }
                onClick={() => {
                  ewsSuplemenOksigen === ""
                    ? message.warning("Silahkan Input Suplemen Oksigen!")
                    : ewsKesadaran === ""
                    ? message.warning("Silahkan Input Tingkat Kesadaran!")
                    : ListAskepById === "" || ListAskepById === []
                    ? message.warning("Silahkan Input Diagnosa Dahulu!!!")
                    : isNaN(skorNyeriKirim)
                    ? message.warning("Silahkan Isi Skor Nyeri Pasien")
                    : isNaN(skorOntario) &&
                      isNaN(skorHumptyDumpty) &&
                      isNaN(skorMorse)
                    ? message.warning("Silahkan Isi Skor Resiko Jatuh Pasien")
                    : insertData(
                        datatandavital,
                        datanyeri,
                        dataResikoJatuh,
                        dataEWS
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
                    : userTTV.toUpperCase() === namauser.toUpperCase()
                    ? false
                    : true
                }
                onClick={() => {
                  deleteTTV(
                    tandaVitalId,
                    curpasRI.noreg,
                    dayjs(tglTTV).format("YYYY-MM-DD HH:mm")
                  );
                  deleteEwsbydate(
                    curpasRI.noreg,
                    dayjs(tglews).format("YYYY-MM-DD HH:mm")
                  );
                  console.log(
                    tandaVitalId,
                    curpasRI.noreg,
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

                  //ews
                  //   setTglews(dayjs());
                  setewsRespirasi("");
                  setewsSatursiOksigen("");
                  setewsSuplemenOksigen("");
                  setewsSuhu("");
                  setewsSistolik("");
                  setewsJantung("");
                  setewsKesadaran("");
                  setvisibleEWSBerkala(false);
                }}
              >
                Batal
              </Button>
            </Space>
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
              <Form.Item
                {...formItemLayout1}
                label={<div style={{ fontWeight: "bolder" }}>Nilai</div>}
                style={{ marginBottom: 5 }}
              >
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
                </Input.Group>
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
                        onChange={(e) => {
                          sethumDumUsia(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          sethumDumKel(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          sethumDumDiagnosa(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          sethumDumGangguanKognitif(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          sethumDumLingkungan(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          sethumDumRespon(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          sethumDumPemObat(e);
                          setpenangananId([]);
                        }}
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
                            setpenangananId([]);
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
                          onChange={(e) => {
                            setrJatuh2(e);
                            setpenangananId([]);
                          }}
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
                          onChange={(e) => {
                            setsMental1(e);
                            setpenangananId([]);
                          }}
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
                          onChange={(e) => {
                            setsMental2(e);
                            setpenangananId([]);
                          }}
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
                          onChange={(e) => {
                            setsMental3(e);
                            setpenangananId([]);
                          }}
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
                          onChange={(e) => {
                            setsMata1(e);
                            setpenangananId([]);
                          }}
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
                          onChange={(e) => {
                            setsMata2(e);
                            setpenangananId([]);
                          }}
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
                          onChange={(e) => {
                            setsMata3(e);
                            setpenangananId([]);
                          }}
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
                          onChange={(e) => {
                            setkebiasaanBerkemih(e);
                            setpenangananId([]);
                          }}
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
                          onChange={(e) => {
                            settransferTT(e);
                            setpenangananId([]);
                          }}
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
                          onChange={(e) => {
                            setmobilitas(e);
                            setpenangananId([]);
                          }}
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
                          setpenangananId([]);
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
                        onChange={(e) => {
                          setmorseDiagnosa(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          setmorseKondisiJalan(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          setmorseInfus(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          setmorseKondisiBadan(e);
                          setpenangananId([]);
                        }}
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
                        onChange={(e) => {
                          setmorseGangKognitif(e);
                          setpenangananId([]);
                        }}
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

            <Col span={24}>
              {metodeResikoJatuh === "HUMPTY DUMPTY" ? (
                skorHumptyDumpty > 6 ? (
                  <div>
                    <p>
                      Penanganan : <Tag color="success">Rendah</Tag>
                      <Tag color="error">Sedang/Tinggi</Tag>
                    </p>
                    <Select
                      value={penangananId}
                      onFocus={() => {
                        skorHumptyDumpty > 6 && skorHumptyDumpty < 12
                          ? getPenangananResikoJatuh("HUMPTY DUMPTY", "RENDAH")
                          : getPenangananResikoJatuh("HUMPTY DUMPTY", "%20");
                      }}
                      style={{ width: "100%", maxWidth: "78vw" }}
                      mode="multiple"
                      allowClear
                      showSearch={false}
                      source={penangananResikoJatuh}
                      onChange={(e) => {
                        setpenangananId(e);
                        console.log(e);
                      }}
                      tokenSeparators={[","]}
                      placeholder="..."
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {penangananResikoJatuh.map((b) => (
                        <Option
                          className={
                            b.Skala === "RENDAH"
                              ? "backgroundaby"
                              : "backgroundaby1"
                          }
                          key={b.PenangananId}
                        >
                          {b.Deskripsi}
                        </Option>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <div></div>
                )
              ) : metodeResikoJatuh === "ONTARIO" ? (
                skorOntario >= 0 ? (
                  <div>
                    <p>
                      Penanganan : <Tag color="success">Rendah</Tag>
                      <Tag color="error">Sedang/Tinggi</Tag>
                    </p>
                    <Select
                      onFocus={() => {
                        skorOntario < 6
                          ? getPenangananResikoJatuh("ONTARIO", "RENDAH")
                          : getPenangananResikoJatuh("ONTARIO", "%20");
                      }}
                      // className="ant-select-selection"
                      value={penangananId}
                      style={{ width: "100%", maxWidth: "78vw" }}
                      mode="multiple"
                      allowClear
                      showSearch={false}
                      source={penangananResikoJatuh}
                      onChange={(e) => {
                        setpenangananId(e);
                        console.log(e);
                      }}
                      tokenSeparators={[","]}
                      placeholder="..."
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {penangananResikoJatuh.map((b) => (
                        <Option
                          className={
                            b.Skala === "RENDAH"
                              ? "backgroundaby"
                              : "backgroundaby1"
                          }
                          key={b.PenangananId}
                        >
                          {b.Deskripsi}
                        </Option>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <div></div>
                )
              ) : metodeResikoJatuh === "MORSE" ? (
                skorMorse > 24 ? (
                  <div>
                    <p>
                      Penanganan : <Tag color="success">Rendah</Tag>
                      <Tag color="error">Sedang/Tinggi</Tag>
                    </p>
                    <Select
                      onFocus={() => {
                        skorMorse > 24 && skorMorse < 51
                          ? getPenangananResikoJatuh("MORSE", "RENDAH")
                          : getPenangananResikoJatuh("MORSE", "%20");
                      }}
                      // className="ant-select-selection"
                      value={penangananId}
                      style={{ width: "100%", maxWidth: "78vw" }}
                      mode="multiple"
                      allowClear
                      showSearch={false}
                      source={penangananResikoJatuh}
                      onChange={(e) => {
                        setpenangananId(e);
                        console.log(e);
                      }}
                      tokenSeparators={[","]}
                      placeholder="..."
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {penangananResikoJatuh.map((b) => (
                        <Option
                          className={
                            b.Skala === "RENDAH"
                              ? "backgroundaby"
                              : "backgroundaby1"
                          }
                          key={b.PenangananId}
                        >
                          {b.Deskripsi}
                        </Option>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <div></div>
                )
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
                    const datapenanganan1 = [];
                    for (var i = 0; i < penangananId.length; i++) {
                      datapenanganan1.push({
                        registrasiId: curpasRI.noreg,
                        tanggal: dayjs(tglTTV).format("YYYY-MM-DDTHH:mm"),
                        metode: metodeResikoJatuh,
                        penangananId: parseInt(penangananId[i]),
                      });
                    }
                    console.log("data penagnanaid", penangananId);
                    setdatapenanganan(datapenanganan1);
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
                    setpenangananId([]);
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
                <TabPane tab="Grafik TTV" key="1">
                  <FormGrafikTTV />
                </TabPane>
                <TabPane tab="Grafik EWS" key="3">
                  <FormEwsGrafik />
                </TabPane>
                <TabPane tab="Table" key="2">
                  <Table
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: (e) => {
                          getTTVById(record.tandaVitalId);
                          getNyeriByRegDate(
                            curpasRI.noreg,
                            dayjs(record.tanggal).format("YYYY-MM-DD HH:mm")
                          );
                          getResikoJatuhByRegDateLengkap(
                            curpasRI.noreg,
                            dayjs(record.tanggal).format("YYYY-MM-DD HH:mm")
                          );
                          getEwsByRegDate(
                            curpasRI.noreg,
                            dayjs(record.tanggal).format("YYYY-MM-DD HH:mm")
                          );
                          // getResikoJatuhByRegDate(curpasRI.noreg, dayjs(record.tanggal).format("YYYY-MM-DD HH:mm"));
                          setWarnaRow(rowIndex);
                        },
                      };
                    }}
                    bordered
                    locale={{
                      emptyText: <Empty description="Data Catatan Kosong" />,
                    }}
                    pagination={{ pageSize: 5 }}
                    dataSource={ttvAllByNoregLengkap}
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
                      render={(ttvAllByNoregLengkap) =>
                        dayjs(ttvAllByNoregLengkap.tanggal).format(
                          "DD-MM-YYYY HH:mm"
                        )
                      }
                    />
                    <Column
                      title="GCS"
                      key="reg"
                      width="5%"
                      render={(ttvAllByNoregLengkap) =>
                        ttvAllByNoregLengkap.gcsTotal
                      }
                    />
                    <Column
                      title="Tensi"
                      key="reg"
                      width="5%"
                      render={(ttvAllByNoregLengkap) =>
                        ttvAllByNoregLengkap.tekananDarahSistolik +
                        " / " +
                        ttvAllByNoregLengkap.tekananDarahDiastolik
                      }
                    />
                    <Column
                      title="Nadi"
                      key="reg"
                      width="5%"
                      render={(ttvAllByNoregLengkap) =>
                        ttvAllByNoregLengkap.frekuensiNadi
                      }
                    />
                    <Column
                      title="Suhu"
                      key="reg"
                      width="5%"
                      render={(ttvAllByNoregLengkap) =>
                        ttvAllByNoregLengkap.suhuTubuh
                      }
                    />
                    <Column
                      title="Respirasi"
                      key="reg"
                      width="5%"
                      render={(ttvAllByNoregLengkap) =>
                        ttvAllByNoregLengkap.frekuensiNafas
                      }
                    />
                    <Column
                      title="Nyeri"
                      key="reg"
                      width="20%"
                      render={(ttvAllByNoregLengkap) => (
                        <span>
                          {ttvAllByNoregLengkap.metodeNyeri} :{" "}
                          {ttvAllByNoregLengkap.keteranganNyeri}
                        </span>
                      )}
                    />
                    <Column
                      title="Resiko Jatuh"
                      key="reg"
                      width="20%"
                      render={(ttvAllByNoregLengkap) => (
                        <span>
                          {ttvAllByNoregLengkap.metodeResikoJatuh} :{" "}
                          {ttvAllByNoregLengkap.keteranganResikoJatuh}
                        </span>
                      )}
                    />
                    <Column
                      title="User"
                      key="reg"
                      width="10%"
                      render={(ttvAllByNoregLengkap) =>
                        ttvAllByNoregLengkap.userId
                      }
                    />
                  </Table>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </Form>
      <Modal
        title="Assesment EWS"
        visible={visibleEws}
        width="1000px"
        footer={null}
      >
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Form.Item
              {...formItemLayoutFull}
              label={
                <div style={{ fontWeight: "bolder" }}>Suplement Oksigen</div>
              }
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={ewsSuplemenOksigen}
                onChange={(e) => setewsSuplemenOksigen(e)}
              >
                <Option value="1-2">Ya</Option>
                <Option value="2-0">Tidak</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={
                <div style={{ fontWeight: "bolder" }}>Tingkat Kesadaran</div>
              }
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={ewsKesadaran}
                onChange={(e) => setewsKesadaran(e)}
              >
                <Option value="1-0">Alert</Option>
                <Option value="2-3">Verbal,Pain atau Unrespon</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  console.log("data ews", dataEWS);
                  insertEWS(dataEWS);
                }}
              >
                Simpan
              </Button>
              <Button
                onClick={() => {
                  setvisibleEws(false);
                  setewsRespirasi("");
                  setewsSatursiOksigen("");
                  setewsSuplemenOksigen("");
                  setewsSuhu("");
                  setewsSistolik("");
                  setewsJantung("");
                  setewsKesadaran("");
                  setnilaiKritis("");
                }}
              >
                Batal
              </Button>
              <Button
                onClick={() => {
                  setvisibleEws(false);
                }}
              >
                Keluar
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Assesment MEOWS"
        visible={visibleMeows}
        width="1000px"
        footer={null}
      >
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Form.Item
              {...formItemLayoutFull}
              label={
                <div style={{ fontWeight: "bolder" }}>Suplement Oksigen</div>
              }
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={meowsSuplemenOksigen}
                onChange={(e) => setmeowsSuplemenOksigen(e)}
              >
                <Option value="1-2">Ya</Option>
                <Option value="2-0">Tidak</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={
                <div style={{ fontWeight: "bolder" }}>Tingkat Kesadaran</div>
              }
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={meowsKesadaran}
                onChange={(e) => setmeowsKesadaran(e)}
              >
                <Option value="1-0">Alert</Option>
                <Option value="2-3">Verbal,Pain atau Unrespon</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={<div style={{ fontWeight: "bolder" }}>Protein Urine</div>}
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={meowsProteinUrine}
                onChange={(e) => setmeowsProteinUrine(e)}
              >
                <Option value="2+">2+</Option>
                <Option value="> 2+">&gt;2+</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={<div style={{ fontWeight: "bolder" }}>Produksi Urine</div>}
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={meowsProduksiUrine}
                onChange={(e) => setmeowsProduksiUrine(e)}
              >
                <Option value={0}>Ya</Option>
                <Option value={1}>Tidak</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={<div style={{ fontWeight: "bolder" }}>Lochea</div>}
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={meowsLochea}
                onChange={(e) => setmeowsLochea(e)}
              >
                <Option value="Normal">Normal</Option>
                <Option value="Berbau">Berbau</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={<div style={{ fontWeight: "bolder" }}>Cairan</div>}
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={meowsCairan}
                onChange={(e) => setmeowsCairan(e)}
              >
                <Option value="Tidak Berwarna/Pink">Tidak Berwarna/Pink</Option>
                <Option value="Hijau">Hijau</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={<div style={{ fontWeight: "bolder" }}>Tanda Infeksi</div>}
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={meowsTandaInfeksi}
                onChange={(e) => setmeowsTandaInfeksi(e)}
              >
                <Option value={0}>Ya</Option>
                <Option value={1}>Tidak</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  console.log(dataMeows);
                  insertMEOWS(dataMeows);
                }}
              >
                Simpan
              </Button>
              <Button
                onClick={() => {
                  setmeowsRespirasi("");
                  setmeowsSatursiOksigen("");
                  setmeowsSuplemenOksigen("");
                  setmeowsSuhu("");
                  setmeowsSistolik("");
                  setmeowsJantung("");
                  setmeowsKesadaran("");
                  setmeowsProteinUrine("");
                  setmeowsProduksiUrine("");
                  setmeowsLochea("");
                  setmeowsCairan("");
                  setmeowsTandaInfeksi("");
                  setvisibleMeows(false);
                  setnilaiKritis("");
                }}
              >
                Batal
              </Button>
              <Button
                onClick={() => {
                  setvisibleMeows(false);
                }}
              >
                Keluar
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
      <Modal
        title="Assesment SCOREDOWN"
        visible={visibleSkorDown}
        width="1000px"
        footer={null}
      >
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Form.Item
              {...formItemLayoutFull}
              label={<div style={{ fontWeight: "bolder" }}>Retraksi</div>}
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={skordownRetraksi}
                onChange={(e) => setskordownRetraksi(e)}
              >
                <Option value={0}>Tidak ada retraksi</Option>
                <Option value={1}>Retraksi ringan </Option>
                <Option value={2}>Retraksi berat </Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={<div style={{ fontWeight: "bolder" }}>Sianosis</div>}
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={skordownSianosis}
                onChange={(e) => setskordownSianosis(e)}
              >
                <Option value={0}>Tidak ada sianosis </Option>
                <Option value={1}>Sianosis hilang dengan O2 </Option>
                <Option value={2}>Sianosis menetap walaupun diberi O2 </Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={<div style={{ fontWeight: "bolder" }}>Air Entry</div>}
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={skordownAirEntry}
                onChange={(e) => setskordownAirEntry(e)}
              >
                <Option value={0}>Udara masuk bilateral baik </Option>
                <Option value={1}>Penurunan ruangan udara masuk </Option>
                <Option value={2}>Tidak ada udara masuk </Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutFull}
              label={<div style={{ fontWeight: "bolder" }}>Merintih</div>}
              style={{ marginBottom: 5 }}
            >
              <Select
                placeholder="..."
                style={{ width: "100%" }}
                value={skordownMerintih}
                onChange={(e) => setskordownMerintih(e)}
              >
                <Option value={0}>Tidak merintih </Option>
                <Option value={1}>Dapat didengar dengan stetoskop </Option>
                <Option value={2}>Dapat didengar tanpa alat bantu </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  insertSkorDown(dataScoreDown);
                  console.log("dataskordown", dataScoreDown);
                }}
              >
                Simpan
              </Button>
              <Button
                onClick={() => {
                  setskordownNafas("");
                  setskordownRetraksi("");
                  setskordownSianosis("");
                  setskordownAirEntry("");
                  setskordownMerintih("");
                  setvisibleSkorDown(false);
                  setnilaiKritis("");
                }}
              >
                Batal
              </Button>
              <Button
                onClick={() => {
                  setvisibleSkorDown(false);
                }}
              >
                Keluar
              </Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default FormPantuanTTV;
