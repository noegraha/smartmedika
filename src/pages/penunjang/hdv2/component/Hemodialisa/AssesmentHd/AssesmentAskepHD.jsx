import React, { useContext, useState } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  message,
  Card,
  Space,
  DatePicker,
  Empty,
  Modal,
  Table,
  Tooltip,
  Slider,
  Typography,
  Collapse,
  InputNumber,
} from "antd";
import { CloudDownloadOutlined, FileSearchOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import skalanyeripng from "../../../../hdv2/skalanyeri.png";
import Column from "antd/lib/table/Column";
import { MasterKeluhanContext } from "../../../../../master/context/mastermedis/MasterKeluhanContext";
import { MasterTandaGejalaContext } from "../../../../../master/context/masteraskep/MasterTandaGejalaContext";
import HdContext from "../../../HdContext";
import { PasienRIContext } from "../../../../../rawatinap/context/PasienRIContext";
import { LoginContext } from "../../../../../rawatjalan/context";
import { AssesmentRIContext } from "../../../../../rawatinap/context/AssesmentRIContext";

const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

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

const { PasiensContext } = HdContext;

const AssesmentAskepHD = () => {
  const [lila, setlila] = useState("");
  // adekuasi
  const [k, setK] = useState(0);
  const [t, setT] = useState(0);
  const [jam, setJam] = useState(0);
  const [v, setV] = useState(0);
  const ktv = (k * t) / v;

  const props = useContext(PasiensContext);
  const [isModalLila, setIsModalLila] = useState(false);
  const [isModalHasilLab, setIsModalHasilLab] = useState(false);
  const [isModalHitungAdekuasi, setIsModalHitungAdekuasi] = useState(false);
  const [mdRiwTB, setmdRiwTB] = useState(false)

  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY HH:mm";
  const {
    setcaraMasuk,
    setasalMasuk,
    setriwayatAlergi,
    setriwayat,
    setriwayatGenetik,
    setppsId,
    nKeluhanNew,
    setnKeluhanNew,
    keluhanId,
    setkeluhanId,
    karakteristikId,
    setkarakteristikId,
    keluhanLain,
    setkeluhanLain,
    tablekeluhan,
    settablekeluhan,
    keluhan,
    setkeluhan,
    karakteristik,
    setkarakteristik,
    userAssesment,

    getPPSByID,

    visibleNyeri,
    setvisibleNyeri,
    visibleJatuh,
    setvisibleJatuh,
    visibleNutrisi,
    setvisibleNutrisi,
    visibleEws,
    setvisibleEws,
    setvisibleMeows,
    setvisibleSkorDown,
    setvisibleLatch,
    setvisibleBartelIndex,
    setvisibleAktivitasLatihan,

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
    setTglTTV,
    iramaNadi,
    setiramaNadi,
    saturasiOksigen,
    setsaturasiOksigen,
    tinggiBadan,
    settinggiBadan,
    beratBadan,
    setberatBadan,

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

    metodeNutrisi,
    setmetodeNutrisi,
    idPantuannutrisi,
    setidPantuannutrisi,
    penurunanBbdewasa,
    setpenurunanBbdewasa,
    jumlahPenurunanBb,
    setjumlahPenurunanBb,
    asupanMakanDewasa,
    setasupanMakanDewasa,
    pasienDiagnosisKhusus,
    setpasienDiagnosisKhusus,
    kurusAnak,
    setkurusAnak,
    penurunanBbanak,
    setpenurunanBbanak,
    diareAnak,
    setdiareAnak,
    penyakitBeresikoAnak,
    setpenyakitBeresikoAnak,

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

    assOksigen,
    setassOksigen,
    assSirkulasi,
    setassSirkulasi,
    assNutrisi,
    setassNutrisi,
    assEliminasi,
    setassEliminasi,
    assAktifitasIstirahat,
    setassAktifitasIstirahat,
    assProteksiPerlindungan,
    setassProteksiPerlindungan,
    assSensoriPersepsi,
    setassSensoriPersepsi,
    assCairanElektrolit,
    setassCairanElektrolit,
    assFungsiNeurologis,
    setassFungsiNeurologis,
    assFungsiEndokrin,
    setassFungsiEndokrin,
    assKonsepDiriKognitif,
    setassKonsepDiriKognitif,
    assFungsiPeran,
    setassFungsiPeran,
    assPolaToleransiKopingStrees,
    setassPolaToleransiKopingStrees,
    assSeksualReproduksi,
    setassSeksualReproduksi,
    assPolaKepercayaan,
    setassPolaKepercayaan,
    tandaGejalaAssOksigen,
    settandaGejalaAssOksigen,
    tandaGejalaAssSirkulasi,
    settandaGejalaAssSirkulasi,
    tandaGejalaAssNutrisi,
    settandaGejalaAssNutrisi,
    tandaGejalaAssEliminasi,
    settandaGejalaAssEliminasi,
    tandaGejalaAssAktifitasIstirahat,
    settandaGejalaAssAktifitasIstirahat,
    tandaGejalaAssProteksiPerlindungan,
    settandaGejalaAssProteksiPerlindungan,
    tandaGejalaAssSensoriPersepsi,
    settandaGejalaAssSensoriPersepsi,
    tandaGejalaAssCairanElektrolit,
    settandaGejalaAssCairanElektrolit,
    tandaGejalaAssFungsiNeurologis,
    settandaGejalaAssFungsiNeurologis,
    tandaGejalaAssFungsiEndokrin,
    settandaGejalaAssFungsiEndokrin,
    tandaGejalaAssKonsepDiriKognitif,
    settandaGejalaAssKonsepDiriKognitif,
    tandaGejalaAssFungsiPeran,
    settandaGejalaAssFungsiPeran,
    tandaGejalaAssPolaToleransiKopingStrees,
    settandaGejalaAssPolaToleransiKopingStrees,
    tandaGejalaAssSeksualReproduksi,
    settandaGejalaAssSeksualReproduksi,
    tandaGejalaAssPolaKepercayaan,
    settandaGejalaAssPolaKepercayaan,

    assTdpemeriksaanRespirasi,
    setAssTdpemeriksaanRespirasi,
    assTdekstremitas,
    setAssTdekstremitas,
    assTdpemeriksaanSirkulasi,
    setAssTdpemeriksaanSirkulasi,

    assTdpemeriksaanNutrisi,
    setAssTdpemeriksaanNutrisi,

    assTdfrekuensiBab,
    setAssTdfrekuensiBab,
    assTdkonsistensiBab,
    setAssTdkonsistensiBab,
    assTdwarnaBab,
    setAssTdwarnaBab,
    assTdkeluhanBab,
    setAssTdkeluhanBab,
    assTdperistaltikUsus,
    setAssTdperistaltikUsus,
    assTdfrekuensiBak,
    setAssTdfrekuensiBak,
    assTdjumlahUrin,
    setAssTdjumlahUrin,
    assTdgangguanUrin,
    setAssTdgangguanUrin,
    assTdkateter,
    setAssTdkateter,
    assTdwarnaUrin,
    setAssTdwarnaUrin,
    assTdpemeriksaanEliminasi,
    setAssTdpemeriksaanEliminasi,

    assTdtidurMalam,
    setAssTdtidurMalam,
    assTdtidurSiang,
    setAssTdtidurSiang,
    assTdgangguanTidur,
    setAssTdgangguanTidur,
    assTdobatTidur,
    setAssTdobatTidur,
    assTdpemeriksaanAktifitas,
    setAssTdpemeriksaanAktifitas,

    assTdlukaKulit,
    setAssTdlukaKulit,
    assTdlokasiLuka,
    setAssTdlokasiLuka,
    assTdpenyebabLuka,
    setAssTdpenyebabLuka,
    assTdluasLuka,
    setAssTdluasLuka,
    assTdpemeriksaanProteksi,
    setAssTdpemeriksaanProteksi,

    assTdkesadaran,
    setAssTdkesadaran,

    assTdpendengaran,
    setAssTdpendengaran,
    assTdpenglihatan,
    setAssTdpenglihatan,
    assTdbicara,
    setAssTdbicara,
    assTdkebiasaanPeriksa,
    setAssTdkebiasaanPeriksa,
    assTdpersepsiSakit,
    setAssTdpersepsiSakit,
    assTdpemeriksaanSensori,
    setAssTdpemeriksaanSensori,

    assTdiwl,
    setAssTdiwl,
    assTdderajatEdema,
    setAssTdderajatEdema,
    assTdpemeriksaanCairanElektrolit,
    setAssTdpemeriksaanCairanElektrolit,

    assTdpemeriksaanNeurologis,
    setAssTdpemeriksaanNeurologis,

    assTdpemeriksaanEndokrin,
    setAssTdpemeriksaanEndokrin,

    assTdpengetahuanPenyakit,
    setAssTdpengetahuanPenyakit,
    assTdpengetahuanPerawatan,
    setAssTdpengetahuanPerawatan,
    assTdscoreKonsepDiri,
    setAssTdscoreKonsepDiri,
    assTdpemeriksaanKonsepDiri,
    setAssTdpemeriksaanKonsepDiri,

    assTdhubunganPeran,
    setAssTdhubunganPeran,
    assTdperanKeluarga,
    setAssTdperanKeluarga,
    assTdpemeriksaanFungsiPeran,
    setAssTdpemeriksaanFungsiPeran,

    assTdkoping,
    setAssTdkoping,
    assTdpenyelesaianMasalah,
    setAssTdpenyelesaianMasalah,
    assTdpemeriksaanPolaToleransi,
    setAssTdpemeriksaanPolaToleransi,

    assTdjumlahAnak,
    setAssTdjumlahAnak,
    assTdumurMenikah,
    setAssTdumurMenikah,
    assTdumurAnakPertama,
    setAssTdumurAnakPertama,
    assTdpenyakitKelamin,
    setAssTdpenyakitKelamin,
    assTdjenisPenyakit,
    setAssTdjenisPenyakit,
    assTdkeluhanPenyakit,
    setAssTdkeluhanPenyakit,
    assTdpemeriksaanSeksual,
    setAssTdpemeriksaanSeksual,

    assTdkepercayaanKesehatan,
    setAssTdkepercayaanKesehatan,
    assTdlainlain,
    setAssTdlainlain,
    assTdpemeriksaanNilaiKepercayaan,
    setAssTdpemeriksaanNilaiKepercayaan,

    spin,
    setSpin,
    visibleCteakAssesment,
    setvisibleCteakAssesment,

    insertTTVAssesmentdanKeluhan,
  } = useContext(AssesmentRIContext);

  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);

  const ipPc = sessionStorage.getItem("IP");
  const namePc = sessionStorage.getItem("Host");
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

  const {
    getKeluhanAll,
    getKarakteristikByKeluhanId,
    listKeluhanAll,
    listKarakteristikByKeluahan,
  } = useContext(MasterKeluhanContext);

  const {
    tandaGejalaOksigenasi,
    tandaGejalaSirkulasi,
    tandaGejalaNutrisi,
    tandaGejalaEliminasi,
    tandaGejalaAktivitasIstirahat,
    tandaGejalaProteksi,
    tandaGejalaPersepsi,
    tandaGejalaCairanLektrolit,
    tandaGejalaNeurologis,
    tandaGejalaEndokrin,
    tandaGejalaKognitif,
    tandaGejalaPeran,
    tandaGejalaKopingstress,
    tandaGejalaSeksual,
    tandaGejalaKepercayaan,
  } = useContext(MasterTandaGejalaContext);

  const IMT = (beratBadan / Math.pow(tinggiBadan / 100, 2)).toFixed(2);
  const statusGizi =
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

  const stylekuIMT = isNaN(IMT)
    ? { width: "70%" }
    : IMT < 18.5
      ? { backgroundColor: "lightcyan", width: "70%" }
      : IMT >= 18.5 && IMT <= 22.9
        ? { backgroundColor: "lightgreen", width: "70%" }
        : IMT >= 23 && IMT <= 24.9
          ? { backgroundColor: "lightblue", width: "70%" }
          : IMT >= 25 && IMT <= 29.9
            ? { backgroundColor: "lightpink", width: "70%" }
            : IMT >= 30
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

  const totalNutrisiDewasa =
    (parseInt(penurunanBbdewasa) === 3
      ? parseInt(jumlahPenurunanBb)
      : parseInt(penurunanBbdewasa)) +
    parseInt(asupanMakanDewasa) +
    parseInt(pasienDiagnosisKhusus);

  const totalNutrisiAnak =
    parseInt(kurusAnak) +
    parseInt(penurunanBbanak) +
    parseInt(diareAnak) +
    parseInt(penyakitBeresikoAnak);

  const ketNutrisiDewasa =
    parseInt(pasienDiagnosisKhusus) === 1 || totalNutrisiDewasa > 1
      ? "Berisiko Malnutrisi, Dilakukan Pengkajian Lanjut Oleh Ahli Gizi"
      : totalNutrisiDewasa < 2
        ? "Tidak Berisiko Malnutrisi"
        : "";

  const ketNutrisiAnak =
    totalNutrisiAnak < 1
      ? "Risiko Rendah"
      : totalNutrisiAnak > 0 && totalNutrisiAnak < 4
        ? "Risiko Sedang"
        : totalNutrisiAnak > 3
          ? "Risiko Berat"
          : "";

  const stylekuNutrisiDewasa =
    totalNutrisiDewasa === ""
      ? { width: "100%" }
      : parseInt(pasienDiagnosisKhusus) === 1 || totalNutrisiDewasa > 1
        ? { backgroundColor: "lightcoral", width: "100%" }
        : totalNutrisiDewasa < 2
          ? { backgroundColor: "lightgreen", width: "100%" }
          : { width: "100%" };

  const stylekuNutrisiAnak =
    totalNutrisiAnak === ""
      ? { width: "100%" }
      : totalNutrisiAnak < 1
        ? { backgroundColor: "lightgreen", width: "100%" }
        : totalNutrisiAnak > 0 && totalNutrisiAnak < 4
          ? { backgroundColor: "darkorange", width: "100%" }
          : totalNutrisiAnak > 3
            ? { backgroundColor: "lightcoral", width: "100%" }
            : { width: "100%" };

  const datanyeri = {
    id: 0,
    registrasiId: props.pasien.result.registrasiId,
    ruangId: props.ruangId,
    tanggal: dayjs(props.tanggal).format("YYYY-MM-DDTHH:mm"),
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
    registrasiId: props.pasien.result.registrasiId,
    pasienId: props.pasien.result.pasienId,
    ruangId: props.ruangId,
    tanggal: dayjs(props.tanggal).format("YYYY-MM-DD HH:mm").toString(),
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

  const dataEWS = {
    registrasiId: props.pasien.result.registrasiId,
    ruangId: props.ruangId,
    tanggal: dayjs(props.tanggal).format("YYYY-MM-DD HH:mm").toString(),
    ewsScore: ewsTotal,
    ewsKategori:
      ewsTotal === ""
        ? ""
        : ewsTotal >= 0 && ewsTotal < 5
          ? "Hijau"
          : ewsTotal > 4 && ewsTotal < 7
            ? "Orange"
            : ewsTotal > 6
              ? "Merah"
              : "...",
    userId: namauser,
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

  const dataPantuanNutrisi = {
    id: idPantuannutrisi,
    registrasiId: props.pasien.result.registrasiId,
    pasienId: props.pasien.result.pasienId,
    tanggal: dayjs(props.tanggal).format("YYYY-MM-DDTHH:mm"),
    ruangId: props.ruangId,
    pegawaiId: props.dpjpRuangOrder,
    metode: metodeNutrisi,
    penurunanBbdewasa:
      penurunanBbdewasa === null ? null : parseInt(penurunanBbdewasa),
    jumlahPenurunanBb:
      jumlahPenurunanBb === null ? null : jumlahPenurunanBb.toString(),
    asupanMakanDewasa:
      asupanMakanDewasa === null ? null : parseInt(asupanMakanDewasa),
    pasienDiagnosisKhusus:
      pasienDiagnosisKhusus === null ? null : parseInt(pasienDiagnosisKhusus),
    totalScore:
      metodeNutrisi === "PASIEN DEWASA" ? totalNutrisiDewasa : totalNutrisiAnak,
    kurusAnak: kurusAnak === null ? null : parseInt(kurusAnak),
    penurunanBbanak:
      penurunanBbanak === null ? null : parseInt(penurunanBbanak),
    diareAnak: diareAnak === null ? null : parseInt(diareAnak),
    penyakitBeresikoAnak:
      penyakitBeresikoAnak === null ? null : parseInt(penyakitBeresikoAnak),
    userId: namauser,
  };

  const dataKeluhan = {
    registrasiId: props.pasien.result.registrasiId,
    pasienId: props.pasien.result.pasienId,
    tanggal: dayjs(props.tanggal).format("YYYY-MM-DDTHH:mm"),
    ruangId: props.ruangId,
    pegawaiId: props.dpjpRuangOrder,
    caraMasuk: null,
    asalMasuk: null,
    riwayatAlergi:
      props.ketRiwAllObat === "" ||
        props.ketRiwAllObat === null ||
        props.ketRiwAllObat.length === 0
        ? "Tidak Ada"
        : props.ketRiwAllObat,
    riwayat: null,
    riwayatGenetik: null,
    ppsId: null,
    userId: namauser,
    keluhan: nKeluhanNew,
    flag: 3,
  };

  const gcsTotal =
    parseInt(gcsGerakan) + parseInt(gcsMata) + parseInt(gcsSuara);
  //tandavital//
  const datatandavital = {
    tandaVitalId: tandaVitalId,
    registrasiId: props.pasien.result.registrasiId,
    ruangId: props.ruangId,
    pegawaiId: props.dpjpRuangOrder,
    tanggal: dayjs(props.tanggal).format("YYYY-MM-DDTHH:mm"),
    jam: dayjs(props.tanggal).format("YYYY-MM-DDTHH:mm"),
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
    userId: namauser,
    clientHost: ipPc,
    clientIP: namePc,
  };

  const addItem = (e) => {
    // e.preventDefault();

    const elementsIndex = nKeluhanNew.findIndex(
      (element) =>
        element.keluhanId === keluhanId &&
        element.karakteristikId === karakteristikId
      // (element) => ,
      // (element) => element.keluhanLain === keluhanLain
    );

    if (elementsIndex === -1) {
      setnKeluhanNew([
        ...nKeluhanNew,
        {
          keluhanId: keluhanId,
          karakteristikId: karakteristikId,
          keluhanLain: keluhanLain,
        },
      ]);
      settablekeluhan([
        ...tablekeluhan,
        {
          keluhanId: keluhanId,
          karakteristikId: karakteristikId,
          keluhan: keluhan,
          karakteristik: karakteristik,
          keluhanLain: keluhanLain,
        },
      ]);
    } else {
      let newArray = [...nKeluhanNew];
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        keluhanId: keluhanId,
        karakteristikId: karakteristikId,
        keluhanLain: keluhanLain,
      };
      setnKeluhanNew(newArray);
    }
  };

  const onHapusKeluhan = (e, f) => {
    console.log(e);
    f.length === 0 || f === ""
      ? settablekeluhan(tablekeluhan.filter((item) => item.keluhanId !== e)) ||
      setnKeluhanNew(nKeluhanNew.filter((item) => item.keluhanId !== e))
      : settablekeluhan(
        tablekeluhan.filter((item) => item.karakteristikId !== f)
      ) ||
      setnKeluhanNew(
        nKeluhanNew.filter((item) => item.karakteristikId !== f)
      );
  };

  const handleOk = () => {
    setvisibleNyeri(false);
    setvisibleJatuh(false);
    setvisibleNutrisi(false);
    setvisibleEws(false);
    setvisibleMeows(false);
    setvisibleSkorDown(false);
    setvisibleLatch(false);
    setvisibleAktivitasLatihan(false);
    setvisibleBartelIndex(false);
  };

  const simpanKeContext = (
    datatandavital,
    datanyeri,
    dataResikoJatuh,
    dataKeluhan,
    dataPantuanNutrisi,
    dataEWS,
    datadetailTGejala
  ) => {
    if (!props.dialisisHeaderId) {
      Modal.warning({
        title: "Peringatan!",
        content: "DialisisHeaderId kosong! Klik OK untuk merefresh data.",
        onOk: () => {
          props.getDataPasien(props.noOrder);
        },
      });
    } else {
      setSpin(true);
      props.clickAssesment();
      insertTTVAssesmentdanKeluhan(
        datatandavital,
        datanyeri,
        dataResikoJatuh,
        dataKeluhan,
        dataPantuanNutrisi,
        dataEWS,
        datadetailTGejala
      );
    }
  };

  const bblila = ((lila / 26.3) * (tinggiBadan - 100)).toFixed(2);

  // modal LILA
  const showModalLila = () => {
    setIsModalLila(true);
  };

  const handleOkLila = () => {
    setIsModalLila(false);
    setberatBadan(bblila);
  };

  const handleCancelLila = () => {
    setIsModalLila(false);
  };

  // modal Hasil Lab
  const showModalHasilLab = () => {
    setIsModalHasilLab(true);
    props.getHasilLab();
  };

  const handleCancelHasilLab = () => {
    setIsModalHasilLab(false);
  };

  const columns = [
    {
      title: "Pemeriksaan",
      dataIndex: "namaLabHeader",
      key: "namaLabHeader",
    },
    {
      title: "Hasil",
      dataIndex: "labHasil",
      key: "labHasil",
    },
    {
      title: "Satuan",
      dataIndex: "labSatuan",
      key: "labSatuan",
    },
    {
      title: "Normal",
      dataIndex: "labHargaNorm",
      key: "labHargaNorm",
    },
  ];

  const columnsa = [
    {
      title: "No.Reg.",
      dataIndex: "RegistrasiId",
      key: "RegistrasiId",
      align: "center",
    },
    {
      title: "No.RM",
      dataIndex: "PasienId",
      key: "PasienId",
      align: "center",
    },
    {
      title: "Tinggi Badan",
      dataIndex: "TinggiBadan",
      key: "TinggiBadan",
      align: "center",
    },
    {
      title: "Aksi",
      key: "aksi",
      align: "center",
      render: (text, record) => (
        <Button
          onClick={() => klikTB(record.TinggiBadan)}
          type="primary"
        >
          Ambil Data
        </Button>
      ),
    },
  ];

  // modal Hitung Adekuasi
  const showModalHitungAdekuasi = () => {
    setIsModalHitungAdekuasi(true);
    setK(0);
    setT(0);
    setJam(0);
    setV(beratBadan * 0.6 * 1000);
  };

  function round(value, exp) {
    if (typeof exp === "undefined" || +exp === 0) return Math.round(value);

    value = +value;
    exp = +exp;

    if (isNaN(value) || !(typeof exp === "number" && exp % 1 === 0)) return NaN;

    // Shift
    value = value.toString().split("e");
    value = Math.round(+(value[0] + "e" + (value[1] ? +value[1] + exp : exp)));

    // Shift back
    value = value.toString().split("e");
    return +(value[0] + "e" + (value[1] ? +value[1] - exp : -exp));
  }

  const handleOkHitungAdekuasi = () => {
    setIsModalHitungAdekuasi(false);
    let cleanNum = round(ktv, 1);
    // console.log(cleanNum);
    props.setKtv3(cleanNum);
    if (cleanNum > 1.1) {
      props.setKesimpulanadekuat("Adekuat");
      props.setColorKesAde("green");
    } else {
      props.setKesimpulanadekuat("Tidak Adekuat");
      props.setColorKesAde("red");
    }
  };

  const handleCancelHitungAdekuasi = () => {
    setIsModalHitungAdekuasi(false);
  };

  const disGcs = props.pasien.result.ruangId
    ? props.pasien.result.ruangId.slice(0, 2)
    : "";

  // V2 - 09/01/2024
  const klikRiwTB = (pasienId) => {
    setmdRiwTB(true)
    props.getRiwTB(pasienId)
  }

  const klikTB = (data) => {
    settinggiBadan(data)
    setmdRiwTB(false)
    message.success("Tinggi Badan berhasil disalin.");
  }

  return (
    <div>
      {/* <b>sedang di perbaiki</b> */}
      <Form form={form}>
        <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
          <Col xs={12} sm={12} md={8} lg={6} xl={6}>
            Buka Mata(E)
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                disabled={disGcs === "91" ? true : false}
                allowClear={true}
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
                disabled={disGcs === "91" ? true : false}
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
                disabled={disGcs === "91" ? true : false}
                onChange={(e) => {
                  setgcsSuara(e);
                }}
                value={gcsSuara}
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
                    style={{ width: "100%" }}
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
                    style={{ width: "100%" }}
                    placeholder="..."
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
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            Suhu
            <br />
            <Tooltip title="Desimal Gunakan Tanda Titik [.]">
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
                  }}
                  step={0.1}
                />
              </Form.Item>
            </Tooltip>
          </Col>

          <Col xs={12} sm={12} md={8} lg={6} xl={6}>
            Tinggi Badan
            <br />
            <Form.Item style={{ marginBottom: 0 }}>
              {/* <Input
                type="number"
                suffix="Cm"
                placeholder="..."
                value={tinggiBadan}
                onChange={(e) => settinggiBadan(e.target.value)}
              /> */}
              <Input.Group compact>
                <Tooltip title="Riwayat Tinggi Badan">
                  <Button
                    type="primary"
                    onClick={() => klikRiwTB(props.pasien.result.pasienId)}
                    disabled={!props.noOrder}
                    style={{ width: "30%" }}
                    icon={<FileSearchOutlined />}
                  />
                </Tooltip>
                <Input
                  type="number"
                  suffix="Cm"
                  placeholder="..."
                  value={tinggiBadan}
                  onChange={(e) => settinggiBadan(e.target.value)}
                  style={{ width: "70%" }}
                />
              </Input.Group>
            </Form.Item>
            Berat Badan Kering
            <br />
            <Tooltip title="Desimal Gunakan Tanda Titik [.]">
              <Form.Item style={{ marginBottom: 0 }}>
                <Input
                  type="number"
                  suffix="Kg"
                  placeholder="..."
                  data-role="keypad"
                  step={0.1}
                  value={props.bbKering}
                  onChange={(e) => props.setBbKering(e.target.value)}
                />
              </Form.Item>
            </Tooltip>
            Berat Badan Post HD Sebelumnya <br />
            <Form.Item style={{ marginBottom: 0 }}>
              <Input
                type="number"
                suffix="Kg"
                placeholder="..."
                data-role="keypad"
                step={0.1}
                value={props.bbPostHdSebelumnya}
                readOnly
              />
            </Form.Item>
            Berat Badan
            <br />
            <Input.Group compact>
              <Button
                type="primary"
                onClick={showModalLila}
                style={{ width: "30%" }}
              >
                LILA
              </Button>
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
            </Input.Group>
            <Modal
              title="Hitung Berat badan dengan LILA"
              visible={isModalLila}
              onOk={handleOkLila}
              okText="Simpan"
              onCancel={handleCancelLila}
            >
              Tinggi Badan
              <br />
              <Form.Item style={{ marginBottom: 0 }}>
                <Input
                  type="number"
                  suffix="Cm"
                  placeholder="..."
                  value={tinggiBadan}
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
                  value={bblila}
                />
              </Form.Item>
            </Modal>
            {userAssesment === null || userAssesment === "" ? (
              <div></div>
            ) : (
              <div>
                Telah Disi Oleh
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input
                    style={{ width: "100%" }}
                    type="text"
                    placeholder="..."
                    disabled
                    value={userAssesment.toUpperCase()}
                  />
                </Form.Item>
              </div>
            )}
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
                  />
                ) : metodeResikoJatuh === "HUMPTY DUMPTY" ? (
                  <Input
                    style={{ width: "30%" }}
                    type="number"
                    placeholder="..."
                    disabled
                    value={skorHumptyDumpty}
                  />
                ) : metodeResikoJatuh === "MORSE" ? (
                  <Input
                    style={{ width: "30%" }}
                    type="number"
                    placeholder="..."
                    disabled
                    value={skorMorse}
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
                  />
                ) : metodeResikoJatuh === "ONTARIO" ? (
                  <Input
                    style={stylekuOntario}
                    type="text"
                    placeholder="..."
                    disabled
                    value={ketOntario}
                  />
                ) : metodeResikoJatuh === "MORSE" ? (
                  <Input
                    style={stylekuMorse}
                    type="text"
                    placeholder="..."
                    disabled
                    value={ketMorse}
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
                value={props.tanggal}
                style={{ width: "100%" }}
                format={dateFormat}
                showTime
                disabled
              />
            </Form.Item>
          </Col>
        </Row>

        {/* //-------------------------------------------------------assesment utama----------------------------------------------------------------// */}

        {/* //-------------------------------------------------------assesment utama----------------------------------------------------------------// */}

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
                        style={{ width: "100%" }}
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
                        style={{ width: "100%" }}
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
                        style={{ width: "100%" }}
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
                        style={{ width: "100%" }}
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
                        style={{ width: "100%" }}
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
                      <img src={skalanyeripng} alt="Tampilan untuk skala nyeri" style={{ width: "333px" }} />
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
                    setvisibleNyeri(false);
                    console.log(datanyeri);
                  }}
                >
                  Ambil
                </Button>
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
                  Keluar
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
          onCancel={handleOk}
        >
          <Row gutter={[6, 6]}>
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
                  }}
                >
                  <Option value="MORSE">MORSE</Option>
                  <Option value="HUMPTY DUMPTY">HUMPTY DUMPTY</Option>
                  <Option value="ONTARIO">ONTARIO</Option>
                </Select>
              </Form.Item>
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
                        style={{ width: "100%", maxWidth: "23vw" }}
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
                        style={{ width: "100%", maxWidth: "23vw" }}
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
                        style={{ width: "100%", maxWidth: "23vw" }}
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
                        style={{ width: "100%", maxWidth: "23vw" }}
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
                        style={{ width: "100%", maxWidth: "23vw" }}
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
                        style={{ width: "100%", maxWidth: "23vw" }}
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
                  Keluar
                </Button>
              </Space>
            </Col>
          </Row>
        </Modal>
        <Collapse defaultActiveKey={["1", "2"]} style={{ padding: "1px ,1px" }}>
          <Panel header="Assesment Utama" key="1">
            <Row gutter={[6, 6]}>
              <Col span={24}>
                <Form.Item
                  {...formItemLayoutFull}
                  label={
                    <div style={{ fontWeight: "bolder" }}>Konjungtiva</div>
                  }
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    defaultValue={false}
                    value={props.konjungtiva}
                    onChange={props.changeKonjungtiva}
                  >
                    <Option value={false}>Tidak Anemis</Option>
                    <Option value={true}>Anemis</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayoutFull}
                  label={
                    <div style={{ fontWeight: "bolder" }}>Ekstrimitas</div>
                  }
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    defaultValue="NORMAL"
                    value={props.ekstremitas}
                    onChange={props.changeEkstremitas}
                  >
                    <Option value="NORMAL">Normal</Option>
                    <Option value="DEHIDRASI">Dehidrasi</Option>
                    <Option value="EDEMA">Edema</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayoutFull}
                  label={
                    <div style={{ fontWeight: "bolder" }}>Akses Vaskuler</div>
                  }
                  style={{ marginBottom: 5 }}
                >
                  <Input.Group compact>
                    <Select
                      defaultValue={0}
                      value={props.aksesVaskulerId}
                      onChange={props.changeAksesVaskulerId}
                      style={{ width: "94%" }}
                    >
                      {props.optAksesVaskuler.map((optAksVas, index) => (
                        <Option key={index} value={optAksVas.aksesVaskulerId}>
                          {optAksVas.deskripsi}
                        </Option>
                      ))}
                    </Select>
                    <Button
                      onClick={() => props.onClickLoadMst()}
                      type="primary"
                      style={{ width: "6%" }}
                    >
                      <CloudDownloadOutlined />
                    </Button>
                  </Input.Group>
                </Form.Item>

                <Form.Item
                  {...formItemLayoutFull}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Pemeriksaan Penunjang
                    </div>
                  }
                  style={{ marginBottom: 5 }}
                >
                  <Input.Group compact>
                    <Button
                      onClick={showModalHasilLab}
                      type="primary"
                      style={{ width: "20%" }}
                    >
                      Hasil LAB
                    </Button>
                    <Input
                      value={props.pemPenunjang}
                      onChange={props.changePemPenunjang}
                      placeholder="Pemeriksaan Penunjang"
                      maxLength={100}
                      style={{ width: "80%" }}
                    />
                  </Input.Group>
                </Form.Item>

                <Modal
                  title="Hasil Lab"
                  visible={isModalHasilLab}
                  onCancel={handleCancelHasilLab}
                  footer={null}
                >
                  <Table
                    dataSource={props.hasilLab}
                    columns={columns}
                    onRow={(record, rowIndex) => {
                      return {
                        onClick: () => {
                          let tempPemPenunjang =
                            (props.pemPenunjang ? props.pemPenunjang : "") +
                            (!props.pemPenunjang ? "" : ", ") +
                            record.namaLabHeader +
                            " : " +
                            record.labHasil +
                            " " +
                            record.labSatuan;
                          if (tempPemPenunjang.length <= 100) {
                            props.setPemPenunjang(tempPemPenunjang);
                          } else {
                            Modal.error({
                              title: "Error",
                              content:
                                "Inputan Pemeriksaan Penunjang tidak boleh lebih dari 100 karakter!",
                            });
                          }
                        },
                      };
                    }}
                    pagination={false}
                  />
                </Modal>

                <Form.Item
                  {...formItemLayoutFull}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Adekuasi Dialisis
                    </div>
                  }
                  style={{ marginBottom: 5 }}
                >
                  <Button
                    onClick={showModalHitungAdekuasi}
                    type="primary"
                    style={{ width: "20%", marginRight: "10px" }}
                  >
                    Hitung Adekuasi
                  </Button>
                  <span>Urr : </span>
                  <InputNumber
                    value={props.urr}
                    onChange={props.changeUrr}
                    min={0}
                    defaultValue={0}
                    style={{ width: "60px" }}
                  />
                  <span>&ensp;&ensp;Kt/V : </span>
                  <InputNumber
                    value={props.ktv3}
                    onChange={props.changeKtv3}
                    min={0}
                    defaultValue={0}
                    style={{ width: "60px" }}
                  />
                  <span
                    style={{
                      backgroundColor: props.colorKesAde,
                      marginLeft: "10px",
                    }}
                  >
                    {props.kesimpulanadekuat}
                  </span>
                </Form.Item>

                <Modal
                  title="Hitung Adekuasi"
                  visible={isModalHitungAdekuasi}
                  onOk={handleOkHitungAdekuasi}
                  onCancel={handleCancelHitungAdekuasi}
                >
                  "K" <Text mark>(pembersihan dialyzer)</Text>
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="mL/menit"
                      placeholder="..."
                      data-role="keypad"
                      step={0.1}
                      value={k}
                      onChange={(e) => setK(e.target.value)}
                    />
                  </Form.Item>
                  "t" <Text mark>(waktu dialisis)</Text>
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="menit"
                      placeholder="..."
                      data-role="keypad"
                      step={0.1}
                      value={t}
                      onChange={(e) => setT(e.target.value)}
                    />
                    <Input
                      type="number"
                      suffix="jam"
                      placeholder="..."
                      data-role="keypad"
                      step={0.1}
                      value={jam}
                      onChange={(e) =>
                        setJam(e.target.value, setT(e.target.value * 60))
                      }
                    />
                  </Form.Item>
                  "V" <Text mark>(volume distribusi)</Text>
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      suffix="mL"
                      placeholder="..."
                      data-role="keypad"
                      step={0.1}
                      value={v}
                      onChange={(e) => setV(e.target.value)}
                    />
                  </Form.Item>
                  "Kt/V" <Text mark>(Hasil)</Text>
                  <br />
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                      type="number"
                      // suffix="Kg"
                      placeholder="..."
                      data-role="keypad"
                      step={0.1}
                      value={ktv}
                    />
                  </Form.Item>
                </Modal>

                <Form.Item
                  {...formItemLayoutFull}
                  label={
                    <div style={{ fontWeight: "bolder" }}>Nilai Nutrisi</div>
                  }
                  style={{ marginBottom: 5 }}
                >
                  <Row gutter={[5, 5]}>
                    {metodeNutrisi === "PASIEN DEWASA" ? (
                      <Col span={10}>
                        <Input
                          style={{ width: "100%" }}
                          value={totalNutrisiDewasa}
                          placeholder="..."
                          disabled
                        />
                      </Col>
                    ) : metodeNutrisi === "PASIEN ANAK" ? (
                      <Col span={10}>
                        <Input
                          style={{ width: "100%" }}
                          value={totalNutrisiAnak}
                          placeholder="..."
                          disabled
                        />
                      </Col>
                    ) : (
                      <Col span={10}>
                        <Input
                          style={{ width: "100%" }}
                          placeholder="..."
                          disabled
                        />
                      </Col>
                    )}
                    {metodeNutrisi === "PASIEN DEWASA" ? (
                      <Col span={10}>
                        <Input
                          style={stylekuNutrisiDewasa}
                          type="text"
                          placeholder="..."
                          disabled
                          value={ketNutrisiDewasa}
                        />
                      </Col>
                    ) : metodeNutrisi === "PASIEN ANAK" ? (
                      <Col span={10}>
                        <Input
                          style={stylekuNutrisiAnak}
                          type="text"
                          placeholder="..."
                          disabled
                          value={ketNutrisiAnak}
                        />
                      </Col>
                    ) : (
                      <Col span={10}>
                        <Input
                          style={{ width: "100%" }}
                          type="text"
                          placeholder="..."
                          disabled
                        />
                      </Col>
                    )}
                    <Col span={4} style={{}}>
                      <Button
                        style={{ width: "100%", backgroundColor: "#4CAF50" }}
                        onClick={() => {
                          metodeNutrisi === ""
                            ? parseInt(curpasRI.umur) < 18
                              ? setmetodeNutrisi("PASIEN ANAK")
                              : setmetodeNutrisi("PASIEN DEWASA")
                            : console.log();
                          setvisibleNutrisi(true);
                        }}
                      >
                        +
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item
                  {...formItemLayoutFull}
                  label={<div style={{ fontWeight: "bolder" }}>Nilai EWS</div>}
                  style={{ marginBottom: 5 }}
                >
                  <Row gutter={[5, 5]}>
                    {/* <Col span={10}>
                      <Input
                        style={{ width: "100%" }}
                        type="text"
                        placeholder="..."
                        disabled
                        value={ewsTotal}
                        onClick={() => {
                          setvisibleEws(true);
                        }}
                      />
                    </Col>
                    <Col span={10}>
                      <Input
                        style={stylekuEws}
                        type="text"
                        placeholder="..."
                        disabled
                        value={ketEws}
                        onClick={() => {
                          setvisibleEws(true);
                        }}
                      />
                    </Col>
                    <Col span={4} style={{}}>
                      <Button
                        style={{ width: "100%", backgroundColor: "#4CAF50" }}
                        onClick={() => {
                          setvisibleEws(true);
                        }}
                      >
                        +
                      </Button>
                    </Col> */}
                    <Col span={8}>
                      Suplemen Oksigen
                      <br />
                      <Form.Item style={{ marginBottom: 0 }}>
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
                    </Col>
                    <Col span={8}>
                      Tingkat Kesadaran
                      <br />
                      <Select
                        placeholder="..."
                        style={{ width: "100%" }}
                        value={ewsKesadaran}
                        onChange={(e) => setewsKesadaran(e)}
                      >
                        <Option value="1-0">Alert</Option>
                        <Option value="2-3">Verbal,Pain atau Unrespon</Option>
                      </Select>
                    </Col>
                    <Col span={8}>
                      EWS
                      <br />
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Row>
                          <Col span={4}>
                            <Input
                              style={{ width: "100%" }}
                              type="text"
                              placeholder="..."
                              disabled
                              value={ewsTotal}
                            // onChange={(e) => onFrekuensiNafas(e)}
                            />
                          </Col>
                          <Col span={20}>
                            <Input
                              style={stylekuEws}
                              type="text"
                              placeholder="..."
                              disabled
                              value={ketEws}
                            />
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>
                </Form.Item>
                <Form.Item
                  {...formItemLayoutFull}
                  label={<div style={{ fontWeight: "bolder" }}>Keluhan</div>}
                  style={{ marginBottom: 0 }}
                >
                  <Row gutter={[5, 5]} style={{ marginBottom: 5 }}>
                    <Col span={10}>
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Select
                          onFocus={() => {
                            getKeluhanAll();
                          }}
                          dataSource={listKeluhanAll}
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          onChange={(e) => {
                            setkeluhanLain("");
                            setkarakteristikId("");
                            setkarakteristik("");
                            getKarakteristikByKeluhanId(e.split("-").shift());
                            setkeluhanId(e.split("-").shift());
                            setkeluhan(e.split("-").pop());
                            console.log(e);
                          }}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {listKeluhanAll.map((p) => (
                            <Option
                              key={p.keluhanId + "-" + p.keluhanDeskripsi}
                            >
                              {p.keluhanDeskripsi}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Select
                          value={karakteristik}
                          dataSource={listKarakteristikByKeluahan}
                          showSearch
                          style={{ width: "100%" }}
                          placeholder="..."
                          optionFilterProp="children"
                          onChange={(e) => {
                            setkarakteristikId(e.split("-").shift());
                            setkarakteristik(e.split("-").pop());
                          }}
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {listKarakteristikByKeluahan.map((p) => (
                            <Option
                              key={
                                p.karakteristikId +
                                "-" +
                                p.karakteristikDeskripsi
                              }
                            >
                              {p.karakteristikDeskripsi}
                            </Option>
                          ))}
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col span={10}>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <TextArea
                          rows={3}
                          placeholder="..."
                          value={keluhanLain}
                          onChange={(e) => setkeluhanLain(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={4}>
                      <Button
                        style={{ width: "100%", backgroundColor: "#4CAF50" }}
                        onClick={() =>
                          // keluhanId === [] ||
                          keluhanId.length === 0 ||
                            keluhanId === undefined
                            ? message.warning("Keluhan Tidak Boleh Kosong")
                            : addItem()
                        }
                      >
                        +
                      </Button>
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: 5 }}>
                    <Col span={24}>
                      <Table
                        bordered
                        locale={{
                          emptyText: (
                            <Empty description="Data Keluhan Kosong" />
                          ),
                        }}
                        pagination={false}
                        dataSource={tablekeluhan}
                        size="small"
                        rowKey="reg"
                      >
                        <Column
                          title="Keluhan"
                          key="No"
                          render={(tablekeluhan) => (
                            <span>{tablekeluhan.keluhan}</span>
                          )}
                        />
                        <Column
                          title="Karakterisitik"
                          key="tgl"
                          render={(tablekeluhan) => (
                            <span>{tablekeluhan.karakteristik}</span>
                          )}
                        />
                        <Column
                          title="Catatan"
                          key="tgl"
                          render={(tablekeluhan) => (
                            <span>{tablekeluhan.keluhanLain}</span>
                          )}
                        />
                        <Column
                          title="Aksi"
                          key="aksi"
                          render={(tablekeluhan) => (
                            <span>
                              <Button
                                danger
                                onClick={() => {
                                  onHapusKeluhan(
                                    tablekeluhan.keluhanId,
                                    tablekeluhan.karakteristikId
                                  );
                                }}
                              >
                                Hapus
                              </Button>
                            </span>
                          )}
                        />
                      </Table>
                    </Col>
                  </Row>
                </Form.Item>
              </Col>
            </Row>

            <Modal
              title="Assesment Nutrisi"
              visible={visibleNutrisi}
              width="1000px"
              footer={null}
              //onOk={handleOk}
              onCancel={handleOk}
            >
              <Row gutter={[6, 6]}>
                <Col span={8}>
                  <Form.Item
                    {...formItemLayout1}
                    label={
                      <div style={{ fontWeight: "bolder" }}>
                        Jenis Assesment
                      </div>
                    }
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={metodeNutrisi}
                      onChange={(e) => {
                        setmetodeNutrisi(e);
                        setpenurunanBbdewasa(null);
                        setjumlahPenurunanBb(null);
                        setasupanMakanDewasa(null);
                        setpasienDiagnosisKhusus(null);
                        setkurusAnak(null);
                        setpenurunanBbanak(null);
                        setdiareAnak(null);
                        setpenyakitBeresikoAnak(null);
                      }}
                    >
                      <Option value="PASIEN DEWASA">
                        Pasien Dewasa/ Ginekologi/ Onkologi
                      </Option>
                      <Option value="PASIEN ANAK">
                        Pasien Anak (1 Bulan - 18 Tahun)
                      </Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={1}></Col>
                <Col span={15}>
                  {metodeNutrisi === "PASIEN DEWASA" ? (
                    <div>
                      <Row>
                        <Col span={12}>
                          <span>
                            1. Apakah Pasien mengalami penurunan Bb dalam 6
                            bulan Terakhir
                          </span>
                        </Col>
                        <Col span={12}>
                          <Row>
                            <Col span={15}>
                              <Select
                                placeholder="..."
                                style={{ width: "100%" }}
                                value={penurunanBbdewasa}
                                onChange={(e) => {
                                  setpenurunanBbdewasa(e);
                                }}
                              >
                                <Option value={0}>
                                  Tidak ada <br></br>penurunan BB
                                </Option>
                                <Option value={2}>
                                  Tidak yakin/<br></br>Tidak tahu/<br></br>
                                  Baju Terasa longgar
                                </Option>
                                <Option value={3}>
                                  Jika Ya, <br></br>berapa penurunan<br></br> BB
                                  tersebut
                                </Option>
                              </Select>
                            </Col>
                            <Col span={1}></Col>
                            {penurunanBbdewasa === 3 ? (
                              <Col span={8}>
                                <Select
                                  placeholder="..."
                                  style={{ width: "100%" }}
                                  value={jumlahPenurunanBb}
                                  onChange={(e) => {
                                    setjumlahPenurunanBb(e);
                                  }}
                                >
                                  <Option value={1}>1 - 5 Kg</Option>
                                  <Option value={2}>6 - 10 Kg</Option>
                                  <Option value={3}>11 - 15 Kg</Option>
                                  <Option value={4}>&gt; 15 Kg</Option>
                                </Select>
                              </Col>
                            ) : null}
                          </Row>
                        </Col>
                        <Col span={12}>
                          <span>
                            2. Apakah asupan makanan berkurang karena tidak
                            nafsu makan?
                          </span>{" "}
                        </Col>
                        <Col span={12}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={asupanMakanDewasa}
                            onChange={(e) => {
                              setasupanMakanDewasa(e);
                            }}
                          >
                            <Option value={0}>Tidak</Option>
                            <Option value={1}>Ya</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                          <span>
                            3. Pasien dengan diagnosa khusus (DM, Kemoterapi,
                            Hemodealisa, Griatri, immunosupressed)
                          </span>{" "}
                        </Col>
                        <Col span={12}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={pasienDiagnosisKhusus}
                            onChange={(e) => {
                              setpasienDiagnosisKhusus(e);
                            }}
                          >
                            <Option value={0}>Tidak</Option>
                            <Option value={1}>Ya</Option>
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  ) : metodeNutrisi === "PASIEN ANAK" ? (
                    <div>
                      <Row>
                        <Col span={12}>
                          <span>1. Apakah Pasien tampak kurus?</span>
                        </Col>
                        <Col span={12}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={kurusAnak}
                            onChange={(e) => {
                              setkurusAnak(e);
                            }}
                          >
                            <Option value={0}>Tidak</Option>
                            <Option value={1}>Ya</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                          <span>
                            2. Apakah terdapat penurunan BB selama satu bulan
                            terakhir?
                          </span>
                        </Col>
                        <Col span={12}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={penurunanBbanak}
                            onChange={(e) => {
                              setpenurunanBbanak(e);
                            }}
                          >
                            <Option value={0}>Tidak</Option>
                            <Option value={1}>Ya</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                          <span>
                            3. Apakah ada diare &gt;5x/Hari atau muntah
                            &gt;3/Hari atau asupan turun dalam 1 minggu?
                          </span>
                        </Col>
                        <Col span={12}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={diareAnak}
                            onChange={(e) => {
                              setdiareAnak(e);
                            }}
                          >
                            <Option value={0}>Tidak</Option>
                            <Option value={1}>Ya</Option>
                          </Select>
                        </Col>
                        <Col span={12}>
                          <span>
                            4. Apakah terdapat penyakit atau keadaan yang
                            mengakibatkan pasien berisiko malnutrisi?
                          </span>
                        </Col>
                        <Col span={12}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={penyakitBeresikoAnak}
                            onChange={(e) => {
                              setpenyakitBeresikoAnak(e);
                            }}
                          >
                            <Option value={0}>Tidak</Option>
                            <Option value={1}>Ya</Option>
                          </Select>
                        </Col>
                      </Row>
                    </div>
                  ) : null}
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        console.log("data nutrisi", dataPantuanNutrisi);
                        setvisibleNutrisi(false);
                        // insertPantuanutrisi(dataPantuanNutrisi);
                      }}
                    >
                      Ambil
                    </Button>
                    {/* <Button danger>Hapus</Button> */}
                    <Button
                      onClick={() => {
                        setvisibleNutrisi(false);
                        setmetodeNutrisi("");
                        setidPantuannutrisi(0);
                        setpenurunanBbdewasa("");
                        setjumlahPenurunanBb("");
                        setasupanMakanDewasa("");
                        setpasienDiagnosisKhusus("");
                        setkurusAnak("");
                        setpenurunanBbanak("");
                        setdiareAnak("");
                        setpenyakitBeresikoAnak("");
                      }}
                    >
                      Batal
                    </Button>
                    <Button
                      onClick={() => {
                        setvisibleNutrisi(false);
                      }}
                    >
                      Keluar
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Modal>
            <Modal
              title="Assesment EWS"
              visible={visibleEws}
              width="1000px"
              footer={null}
              onCancel={handleOk}
            >
              <Row gutter={[6, 6]}>
                <Col span={24}>
                  <Form.Item
                    {...formItemLayoutFull}
                    label={
                      <div style={{ fontWeight: "bolder" }}>Respirasi</div>
                    }
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={ewsRespirasi}
                      onChange={(e) => {
                        setewsRespirasi(e);
                        console.log(e);
                      }}
                    >
                      <Option value="1-3">&le;8</Option>
                      <Option value="2-1">9 - 11</Option>
                      <Option value="3-0">12 - 20</Option>
                      <Option value="4-2">21 - 24</Option>
                      <Option value="5-3">&ge;25</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutFull}
                    label={
                      <div style={{ fontWeight: "bolder" }}>
                        Satursi Oksigen
                      </div>
                    }
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={ewsSatursiOksigen}
                      onChange={(e) => setewsSatursiOksigen(e)}
                    >
                      <Option value="1-3">&le;91</Option>
                      <Option value="2-2">92 - 93</Option>
                      <Option value="3-1">94 - 95</Option>
                      <Option value="4-0">&ge; 96</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutFull}
                    label={
                      <div style={{ fontWeight: "bolder" }}>
                        Suplement Oksigen
                      </div>
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
                    label={<div style={{ fontWeight: "bolder" }}>Suhu</div>}
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={ewsSuhu}
                      onChange={(e) => setewsSuhu(e)}
                    >
                      <Option value="1-3">&le; 35.0 </Option>
                      <Option value="2-1">35.1 - 36.0</Option>
                      <Option value="3-0">36.1 - 38.0</Option>
                      <Option value="4-1">38.1 - 39 </Option>
                      <Option value="5-2">&ge; 39 </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutFull}
                    label={
                      <div style={{ fontWeight: "bolder" }}>TD Sistolik</div>
                    }
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={ewsSistolik}
                      onChange={(e) => setewsSistolik(e)}
                    >
                      <Option value="1-3">&le; 90 </Option>
                      <Option value="2-2">91 - 100 </Option>
                      <Option value="3-1">101 - 110 </Option>
                      <Option value="4-0">111 - 219 </Option>
                      <Option value="5-3">&ge;220 </Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutFull}
                    label={
                      <div style={{ fontWeight: "bolder" }}>Denyut Jantung</div>
                    }
                    style={{ marginBottom: 5 }}
                  >
                    <Select
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={ewsJantung}
                      onChange={(e) => setewsJantung(e)}
                    >
                      <Option value="1-3">&le; 40</Option>
                      <Option value="2-1">41 - 50</Option>
                      <Option value="3-0">51 - 90</Option>
                      <Option value="4-1">91 - 110</Option>
                      <Option value="5-2">111 - 130</Option>
                      <Option value="6-3">&ge;131</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutFull}
                    label={
                      <div style={{ fontWeight: "bolder" }}>
                        Tingkat Kesadaran
                      </div>
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
                        setvisibleEws(false);
                      }}
                    >
                      Ambil
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
          </Panel>
          <Panel header="Assesment Tanda Dan Gejala" key="2">
            <Row gutter={[8, 8]}>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label={<div style={{ fontWeight: "bolder" }}>Respirasi</div>}
                  style={{ marginBottom: 2, backgroundColor: "paleturquoise" }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assOksigen}
                    onChange={(e) => {
                      setassOksigen(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssOksigen([]);
                      setAssTdpemeriksaanRespirasi(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assOksigen === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{
                      marginBottom: 5,
                      backgroundColor: "paleturquoise",
                    }}
                  >
                    <Row gutter={[6, 6]}>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssOksigen}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaOksigenasi}
                            onChange={(e) => {
                              settandaGejalaAssOksigen(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaOksigenasi.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanRespirasi}
                            onChange={(e) =>
                              setAssTdpemeriksaanRespirasi(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={<div style={{ fontWeight: "bolder" }}>Sirkulasi</div>}
                  style={{ marginBottom: 2, marginTop: 10 }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assSirkulasi}
                    onChange={(e) => {
                      setassSirkulasi(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssSirkulasi([]);
                      setAssTdekstremitas(null);
                      setAssTdpemeriksaanSirkulasi(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assSirkulasi === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{ marginBottom: 5 }}
                  >
                    <Row gutter={[6, 6]}>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssSirkulasi}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaSirkulasi}
                            onChange={(e) => {
                              settandaGejalaAssSirkulasi(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaSirkulasi.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Ekstrimitas
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "50%" }}
                            value={assTdekstremitas}
                            onChange={(e) => setAssTdekstremitas(e)}
                          >
                            <Option value="Hangat">Hangat</Option>
                            <Option value="Dingin">Dingin</Option>
                            <Option value="CRT < 3 detik">
                              CRT &lt; 3 detik
                            </Option>
                            <Option value="CRT > 3 detik">
                              CRT &gt; 3 detik
                            </Option>
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanSirkulasi}
                            onChange={(e) =>
                              setAssTdpemeriksaanSirkulasi(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={<div style={{ fontWeight: "bolder" }}>Nutrisi</div>}
                  style={{
                    marginBottom: 2,
                    marginTop: 10,
                    backgroundColor: "paleturquoise",
                  }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assNutrisi}
                    onChange={(e) => {
                      setassNutrisi(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssNutrisi([]);
                      setAssTdpemeriksaanNutrisi(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assNutrisi === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{
                      marginBottom: 5,
                      backgroundColor: "paleturquoise",
                    }}
                  >
                    <Row gutter={[6, 6]}>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssNutrisi}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaNutrisi}
                            onChange={(e) => {
                              settandaGejalaAssNutrisi(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaNutrisi.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanNutrisi}
                            onChange={(e) =>
                              setAssTdpemeriksaanNutrisi(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={<div style={{ fontWeight: "bolder" }}>ELiminasi</div>}
                  style={{ marginBottom: 2, marginTop: 10 }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assEliminasi}
                    onChange={(e) => {
                      setassEliminasi(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssEliminasi([]);
                      setAssTdfrekuensiBab(null);
                      setAssTdkonsistensiBab(null);
                      setAssTdwarnaBab(null);
                      setAssTdkeluhanBab(null);
                      setAssTdperistaltikUsus(null);
                      setAssTdfrekuensiBak(null);
                      setAssTdjumlahUrin(null);
                      setAssTdgangguanUrin(null);
                      setAssTdkateter(null);
                      setAssTdwarnaUrin(null);
                      setAssTdpemeriksaanEliminasi(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assEliminasi === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{ marginBottom: 5 }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        Frekuensi BAB
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="number"
                            suffix="x/Hari"
                            placeholder="..."
                            value={assTdfrekuensiBab}
                            onChange={(e) =>
                              setAssTdfrekuensiBab(e.target.value)
                            }
                          />
                        </Form.Item>
                        Konsistensi
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdkonsistensiBab}
                            onChange={(e) => setAssTdkonsistensiBab(e)}
                          >
                            <Option value="Cair">Cair</Option>
                            <Option value="Lunak">Lunak</Option>
                            <Option value="Keras">Keras</Option>
                          </Select>
                        </Form.Item>
                        Warna
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdwarnaBab}
                            onChange={(e) => setAssTdwarnaBab(e)}
                          >
                            <Option value="Merah">Merah</Option>
                            <Option value="Hitam">Hitam</Option>
                            <Option value="Normal">Normal</Option>
                          </Select>
                        </Form.Item>
                        Keluhan
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdkeluhanBab}
                            onChange={(e) => setAssTdkeluhanBab(e)}
                          >
                            <Option value="Kembung">Kembung</Option>
                            <Option value="Sebah">Sebah</Option>
                            <Option value="Konstipasi">Konstipasi</Option>
                            <Option value="Diare">Diare</Option>
                          </Select>
                        </Form.Item>
                        Peristaltik Usus
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdperistaltikUsus}
                            onChange={(e) => setAssTdperistaltikUsus(e)}
                          >
                            <Option value="Normal">Normal</Option>
                            <Option value="Abnormal">Abnormal</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Frekuensi BAK
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="number"
                            suffix="x/Hari"
                            placeholder="..."
                            value={assTdfrekuensiBak}
                            onChange={(e) =>
                              setAssTdfrekuensiBak(e.target.value)
                            }
                          />
                        </Form.Item>
                        Jumlah Urin
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdjumlahUrin}
                            onChange={(e) => setAssTdjumlahUrin(e.target.value)}
                          />
                        </Form.Item>
                        Gangguan Eliminasi Urin
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdgangguanUrin}
                            onChange={(e) => setAssTdgangguanUrin(e)}
                          >
                            <Option value="Inkontinensia">Inkontinensia</Option>
                            <Option value="Retensi Urin">Retensi Urin</Option>
                            <Option value="Disuria">Disuria</Option>
                            <Option value="Anuria">Anuria</Option>
                          </Select>
                        </Form.Item>
                        Terpasang Kateter
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdkateter}
                            onChange={(e) => setAssTdkateter(e)}
                          >
                            <Option value={true}>Ya</Option>
                            <Option value={false}>Tidak</Option>
                          </Select>
                        </Form.Item>
                        Warna Urin
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdwarnaUrin}
                            onChange={(e) => setAssTdwarnaUrin(e)}
                          >
                            <Option value="Merah">Merah</Option>
                            <Option value="Hitam">Hitam</Option>
                            <Option value="Normal">Normal</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssEliminasi}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaEliminasi}
                            onChange={(e) => {
                              settandaGejalaAssEliminasi(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaEliminasi.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanEliminasi}
                            onChange={(e) =>
                              setAssTdpemeriksaanEliminasi(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Aktifitas Dan Istirahat
                    </div>
                  }
                  style={{
                    marginBottom: 2,
                    marginTop: 10,
                    backgroundColor: "paleturquoise",
                  }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assAktifitasIstirahat}
                    onChange={(e) => {
                      setassAktifitasIstirahat(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssAktifitasIstirahat([]);
                      setAssTdtidurMalam(null);
                      setAssTdtidurSiang(null);
                      setAssTdgangguanTidur(null);
                      setAssTdobatTidur(null);
                      setAssTdpemeriksaanAktifitas(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assAktifitasIstirahat === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{
                      marginBottom: 5,
                      backgroundColor: "paleturquoise",
                    }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        Jml Tidur Malam
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="number"
                            suffix="jam"
                            placeholder="..."
                            value={assTdtidurMalam}
                            onChange={(e) => setAssTdtidurMalam(e.target.value)}
                          />
                        </Form.Item>
                        Jml Tidur Siang
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="number"
                            suffix="jam"
                            placeholder="..."
                            value={assTdtidurSiang}
                            onChange={(e) => setAssTdtidurSiang(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Gangguan Tidur
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdgangguanTidur}
                            onChange={(e) => setAssTdgangguanTidur(e)}
                          >
                            <Option value="Insomnia">Insomnia</Option>
                            <Option value="Terbangun di malam hari">
                              Terbangun di malam hari
                            </Option>
                          </Select>
                        </Form.Item>
                        konsumsi obat tidur
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdobatTidur}
                            onChange={(e) => setAssTdobatTidur(e)}
                          >
                            <Option value={true}>Ya</Option>
                            <Option value={false}>Tidak</Option>
                          </Select>
                        </Form.Item>
                      </Col>

                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssAktifitasIstirahat}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaAktivitasIstirahat}
                            onChange={(e) => {
                              settandaGejalaAssAktifitasIstirahat(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaAktivitasIstirahat.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanAktifitas}
                            onChange={(e) =>
                              setAssTdpemeriksaanAktifitas(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Proteksi Dan Perlindungan
                    </div>
                  }
                  style={{ marginBottom: 2, marginTop: 10 }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assProteksiPerlindungan}
                    onChange={(e) => {
                      setassProteksiPerlindungan(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssProteksiPerlindungan([]);
                      setAssTdlukaKulit(null);
                      setAssTdlokasiLuka(null);
                      setAssTdpenyebabLuka(null);
                      setAssTdluasLuka(null);
                      setAssTdpemeriksaanProteksi(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assProteksiPerlindungan === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{ marginBottom: 5 }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        Luka
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdlukaKulit}
                            onChange={(e) => setAssTdlukaKulit(e)}
                          >
                            <Option value={true}>Ya</Option>
                            <Option value={false}>Tidak</Option>
                          </Select>
                        </Form.Item>
                        Lokasi Luka
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdlokasiLuka}
                            onChange={(e) => setAssTdlokasiLuka(e)}
                          >
                            <Option value="Ekstremitas Atas">
                              Ekstremitas Atas
                            </Option>
                            <Option value="Ekstremitas Bawah">
                              Ekstremitas Bawah
                            </Option>
                            <Option value="Lokasi Lain">Lokasi Lain</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Penyebab Luka
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpenyebabLuka}
                            onChange={(e) =>
                              setAssTdpenyebabLuka(e.target.value)
                            }
                          />
                        </Form.Item>
                        Luas Luka
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdluasLuka}
                            onChange={(e) => setAssTdluasLuka(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            //className="ant-select-selection"
                            value={tandaGejalaAssProteksiPerlindungan}
                            //style={{ width: '100 %' }}
                            // onFocus={onfocusTgejala}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaProteksi}
                            onChange={(e) => {
                              settandaGejalaAssProteksiPerlindungan(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaProteksi.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanProteksi}
                            onChange={(e) =>
                              setAssTdpemeriksaanProteksi(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>Sensori Persepsi</div>
                  }
                  style={{
                    marginBottom: 2,
                    marginTop: 10,
                    backgroundColor: "paleturquoise",
                  }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assSensoriPersepsi}
                    onChange={(e) => {
                      setassSensoriPersepsi(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssSensoriPersepsi([]);
                      setAssTdkesadaran(null);
                      setAssTdpendengaran(null);
                      setAssTdpenglihatan(null);
                      setAssTdkebiasaanPeriksa(null);
                      setAssTdpersepsiSakit(null);
                      setAssTdbicara(null);
                      setAssTdpemeriksaanSensori(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assSensoriPersepsi === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{
                      marginBottom: 5,
                      backgroundColor: "paleturquoise",
                    }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        Kesadaran
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdkesadaran}
                            onChange={(e) => setAssTdkesadaran(e)}
                          >
                            <Option value="Compos Mentis">Compos Mentis</Option>
                            <Option value="Somnolen">Somnolen</Option>
                            <Option value="Delirium">Delirium</Option>
                            <Option value="Sopor">Sopor</Option>
                            <Option value="Koma">Koma</Option>
                          </Select>
                        </Form.Item>
                        {/* Pediatric Coma Scale<br />
                                                    <Form.Item style={{ marginBottom: 0 }}>
                                                        <Input type="text" placeholder="..."
                                                        // value={frekuensiNafas} onChange={(e) => onFrekuensiNafas(e)}
                                                        />
                                                    </Form.Item> */}
                        Pendengaran
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdpendengaran}
                            onChange={(e) => setAssTdpendengaran(e)}
                          >
                            <Option value="Normal">Normal</Option>
                            <Option value="Kurang Pendengaran">
                              Kurang Pendengaran
                            </Option>
                            <Option value="Gangguan Pendengaran">
                              Gangguan Pendengaran
                            </Option>
                          </Select>
                        </Form.Item>
                        Penglihatan
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdpenglihatan}
                            onChange={(e) => setAssTdpenglihatan(e)}
                          >
                            <Option value="Normal">Normal</Option>
                            <Option value="Kacamata">Kacamata</Option>
                            <Option value="Lensa Kontak">Lensa Kontak</Option>
                            <Option value="Lainnya">Lainnya</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Kebiasaan Periksa Bila Sakit
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdkebiasaanPeriksa}
                            onChange={(e) => setAssTdkebiasaanPeriksa(e)}
                          >
                            <Option value="Beli Obat Diwarung">
                              Beli Obat Diwarung
                            </Option>
                            <Option value="Periksa Ke Fasilitas Kesehatan">
                              Periksa Ke Fasilitas Kesehatan
                            </Option>
                            <Option value="Jarang Berobat/Sembuh Sendiri">
                              Jarang Berobat/Sembuh Sendiri
                            </Option>
                          </Select>
                        </Form.Item>
                        Persepsi Mengenai Sakitnya
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdpersepsiSakit}
                            onChange={(e) => setAssTdpersepsiSakit(e)}
                          >
                            <Option value="Tidak Tahu">Tidak Tahu</Option>
                            <Option value="Tahu Sedikit">Tahu Sedikit</Option>
                            <Option value="Mengerti Dan Paham Mengenai Sakitnya">
                              Mengerti Dan Paham Mengenai Sakitnya
                            </Option>
                          </Select>
                        </Form.Item>
                        Bicara
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdbicara}
                            onChange={(e) => setAssTdbicara(e)}
                          >
                            <Option value="Normal">Normal</Option>
                            <Option value="Pelo">Pelo</Option>
                            <Option value="Aphasia">Aphasia</Option>
                            <Option value="Kelainan Bicara">
                              Kelainan Bicara
                            </Option>
                            <Option value="Tidak Komunikatif">
                              Tidak Komunikatif
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssSensoriPersepsi}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaPersepsi}
                            onChange={(e) => {
                              settandaGejalaAssSensoriPersepsi(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaPersepsi.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanSensori}
                            onChange={(e) =>
                              setAssTdpemeriksaanSensori(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Cairan dan Elektrolit
                    </div>
                  }
                  style={{ marginBottom: 2, marginTop: 10 }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assCairanElektrolit}
                    onChange={(e) => {
                      setassCairanElektrolit(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssCairanElektrolit([]);
                      setAssTdiwl(null);
                      setAssTdderajatEdema(null);
                      setAssTdpemeriksaanCairanElektrolit(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assCairanElektrolit === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{ marginBottom: 5 }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        IWL
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdiwl}
                            onChange={(e) => setAssTdiwl(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Derajat Edema
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdderajatEdema}
                            onChange={(e) => setAssTdderajatEdema(e)}
                          >
                            <Option value="EDEMA DERAJAT 1">
                              EDEMA DERAJAT 1
                            </Option>
                            <Option value="EDEMA DERAJAT 2">
                              EDEMA DERAJAT 2
                            </Option>
                            <Option value="EDEMA DERAJAT 3">
                              EDEMA DERAJAT 3
                            </Option>
                            <Option value="EDEMA DERAJAT 4">
                              EDEMA DERAJAT 4
                            </Option>
                            <Option value="EDEMA DERAJAT 5">
                              EDEMA DERAJAT 5
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssCairanElektrolit}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaCairanLektrolit}
                            onChange={(e) => {
                              settandaGejalaAssCairanElektrolit(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaCairanLektrolit.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanCairanElektrolit}
                            onChange={(e) =>
                              setAssTdpemeriksaanCairanElektrolit(
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Fungsi Neurologis
                    </div>
                  }
                  style={{
                    marginBottom: 2,
                    marginTop: 10,
                    backgroundColor: "paleturquoise",
                  }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assFungsiNeurologis}
                    onChange={(e) => {
                      setassFungsiNeurologis(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssFungsiNeurologis([]);
                      setAssTdpemeriksaanNeurologis(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assFungsiNeurologis === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{
                      marginBottom: 5,
                      backgroundColor: "paleturquoise",
                    }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            //className="ant-select-selection"
                            value={tandaGejalaAssFungsiNeurologis}
                            //style={{ width: '100 %' }}
                            // onFocus={onfocusTgejala}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaNeurologis}
                            onChange={(e) => {
                              settandaGejalaAssFungsiNeurologis(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaNeurologis.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanNeurologis}
                            onChange={(e) =>
                              setAssTdpemeriksaanNeurologis(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>Fungsi Endokrin</div>
                  }
                  style={{ marginBottom: 2, marginTop: 10 }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assFungsiEndokrin}
                    onChange={(e) => {
                      setassFungsiEndokrin(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssFungsiEndokrin([]);
                      setAssTdpemeriksaanEndokrin(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assFungsiEndokrin === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{ marginBottom: 5 }}
                  >
                    <Col span={24}>
                      Tanda Gejala
                      <br />
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Select
                          value={tandaGejalaAssFungsiEndokrin}
                          style={{ width: "100%", maxWidth: "78vw" }}
                          mode="multiple"
                          allowClear
                          showSearch
                          source={tandaGejalaEndokrin}
                          onChange={(e) => {
                            settandaGejalaAssFungsiEndokrin(e);
                          }}
                          tokenSeparators={[","]}
                          placeholder="..."
                          filterOption={(input, option) =>
                            option.children
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                        >
                          {tandaGejalaEndokrin.map((b) => (
                            <Option key={b.TandaGejalaId}>{b.Deskripsi}</Option>
                          ))}
                        </Select>
                      </Form.Item>
                      Pemeriksaan Lain
                      <br />
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Input
                          type="text"
                          placeholder="..."
                          value={assTdpemeriksaanEndokrin}
                          onChange={(e) =>
                            setAssTdpemeriksaanEndokrin(e.target.value)
                          }
                        />
                      </Form.Item>
                    </Col>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Konsep Diri dan Kognitif
                    </div>
                  }
                  style={{
                    marginBottom: 2,
                    marginTop: 10,
                    backgroundColor: "paleturquoise",
                  }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assKonsepDiriKognitif}
                    onChange={(e) => {
                      setassKonsepDiriKognitif(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssKonsepDiriKognitif([]);
                      setAssTdpengetahuanPenyakit(null);
                      setAssTdpengetahuanPerawatan(null);
                      setAssTdscoreKonsepDiri(null);
                      setAssTdpemeriksaanKonsepDiri(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assKonsepDiriKognitif === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{
                      marginBottom: 5,
                      backgroundColor: "paleturquoise",
                    }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        Pengetahuan Ttg Penyakit Saat Ini
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdpengetahuanPenyakit}
                            onChange={(e) => setAssTdpengetahuanPenyakit(e)}
                          >
                            <Option value="Tidak Tahu">Tidak Tahu</Option>
                            <Option value="Sedikit Tahu">Sedikit Tahu</Option>
                            <Option value="Mengerti">Mengerti</Option>
                            <Option value="Mengerti Dan Memahami">
                              Mengerti Dan Memahami
                            </Option>
                          </Select>
                        </Form.Item>
                        Pengetahuan Perawatan Yang Diperlukan
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdpengetahuanPerawatan}
                            onChange={(e) => setAssTdpengetahuanPerawatan(e)}
                          >
                            <Option value="Nutrisi">Nutrisi</Option>
                            <Option value="Perawatan Luka">
                              Perawatan Luka
                            </Option>
                            <Option value="Lainnya">Lainnya</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Konsep Diri
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdscoreKonsepDiri}
                            onChange={(e) =>
                              setAssTdscoreKonsepDiri(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssKonsepDiriKognitif}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaKognitif}
                            onChange={(e) => {
                              settandaGejalaAssKonsepDiriKognitif(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaKognitif.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanKonsepDiri}
                            onChange={(e) =>
                              setAssTdpemeriksaanKonsepDiri(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>Fungsi Peran</div>
                  }
                  style={{ marginBottom: 2, marginTop: 10 }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assFungsiPeran}
                    onChange={(e) => {
                      setassFungsiPeran(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssFungsiPeran([]);
                      setAssTdhubunganPeran(null);
                      setAssTdperanKeluarga(null);
                      setAssTdpemeriksaanFungsiPeran(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assFungsiPeran === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{ marginBottom: 5 }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        Hubungan Peran
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdhubunganPeran}
                            onChange={(e) => setAssTdhubunganPeran(e)}
                          >
                            <Option value="Terganggu">Terganggu</Option>
                            <Option value="Tidak Terganggu">
                              Tidak Terganggu
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Peran Dalam Keluarga Sebagai
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdperanKeluarga}
                            onChange={(e) => setAssTdperanKeluarga(e)}
                          >
                            <Option value="Ayah">Ayah</Option>
                            <Option value="Ibu">Ibu</Option>
                            <Option value="Anak">Anak</Option>
                            <Option value="Lainnya">Lainnya</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssFungsiPeran}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaPeran}
                            onChange={(e) => {
                              settandaGejalaAssFungsiPeran(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaPeran.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanFungsiPeran}
                            onChange={(e) =>
                              setAssTdpemeriksaanFungsiPeran(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Pola Toleransi Koping Stres
                    </div>
                  }
                  style={{
                    marginBottom: 2,
                    marginTop: 10,
                    backgroundColor: "paleturquoise",
                  }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assPolaToleransiKopingStrees}
                    onChange={(e) => {
                      setassPolaToleransiKopingStrees(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssPolaToleransiKopingStrees([]);
                      setAssTdkoping(null);
                      setAssTdpenyelesaianMasalah(null);
                      setAssTdpemeriksaanPolaToleransi(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assPolaToleransiKopingStrees ===
                  "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{
                      marginBottom: 5,
                      backgroundColor: "paleturquoise",
                    }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        Koping Terhadap Sakitnya
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdkoping}
                            onChange={(e) => setAssTdkoping(e)}
                          >
                            <Option value="Takut">Takut</Option>
                            <Option value="Cemas">Cemas</Option>
                            <Option value="Menerima">Menerima</Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Penyelesaian Masalah
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdpenyelesaianMasalah}
                            onChange={(e) => setAssTdpenyelesaianMasalah(e)}
                          >
                            <Option value="Sendiri">Sendiri</Option>
                            <Option value="Minta Bantuan Orang Terdekat">
                              Minta Bantuan Orang Terdekat
                            </Option>
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssPolaToleransiKopingStrees}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaKopingstress}
                            onChange={(e) => {
                              settandaGejalaAssPolaToleransiKopingStrees(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaKopingstress.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanPolaToleransi}
                            onChange={(e) =>
                              setAssTdpemeriksaanPolaToleransi(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Seksual Dan Reproduksi
                    </div>
                  }
                  style={{ marginBottom: 2, marginTop: 10 }}
                >
                  <Select
                    placeholder="..."
                    style={{ width: "100%" }}
                    value={assSeksualReproduksi}
                    onChange={(e) => {
                      setassSeksualReproduksi(e);
                      e === "Perlu Pengkajian Lanjutan"
                        ? console.log(e)
                        : settandaGejalaAssSeksualReproduksi([]);
                      setAssTdjumlahAnak(null);
                      setAssTdumurMenikah(null);
                      setAssTdumurAnakPertama(null);
                      setAssTdpenyakitKelamin(null);
                      setAssTdjenisPenyakit(null);
                      setAssTdkeluhanPenyakit(null);
                      setAssTdpemeriksaanSeksual(null);
                    }}
                  >
                    <Option value="Tidak Ada Keluhan">Tidak Ada Keluhan</Option>
                    <Option value="Perlu Pengkajian Lanjutan">
                      Perlu Pengkajian Lanjutan
                    </Option>
                  </Select>
                </Form.Item>
                {assSeksualReproduksi === "Perlu Pengkajian Lanjutan" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{ marginBottom: 5 }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        Jumlah Anak
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="number"
                            suffix="Orang"
                            placeholder="..."
                            value={assTdjumlahAnak}
                            onChange={(e) => setAssTdjumlahAnak(e.target.value)}
                          />
                        </Form.Item>
                        Menikah Umur
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="number"
                            suffix="Tahun"
                            placeholder="..."
                            value={assTdumurMenikah}
                            onChange={(e) =>
                              setAssTdumurMenikah(e.target.value)
                            }
                          />
                        </Form.Item>
                        Anak Pertama Umur
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="number"
                            suffix="Tahun"
                            placeholder="..."
                            value={assTdumurAnakPertama}
                            onChange={(e) =>
                              setAssTdumurAnakPertama(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Pernah Menderita Penyakit Kelamin
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Select
                            placeholder="..."
                            style={{ width: "100%" }}
                            value={assTdpenyakitKelamin}
                            onChange={(e) => setAssTdpenyakitKelamin(e)}
                          >
                            <Option value={true}>Ya</Option>
                            <Option value={false}>Tidak</Option>
                          </Select>
                        </Form.Item>
                        Jenis Penyakit Kelamin
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdjenisPenyakit}
                            onChange={(e) =>
                              setAssTdjenisPenyakit(e.target.value)
                            }
                          />
                        </Form.Item>
                        Keluhan
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdkeluhanPenyakit}
                            onChange={(e) =>
                              setAssTdkeluhanPenyakit(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssSeksualReproduksi}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaSeksual}
                            onChange={(e) => {
                              settandaGejalaAssSeksualReproduksi(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaSeksual.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanSeksual}
                            onChange={(e) =>
                              setAssTdpemeriksaanSeksual(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}

                <Form.Item
                  {...formItemLayout}
                  label={
                    <div style={{ fontWeight: "bolder" }}>
                      Pola Nilai Dan Kepercayaan
                    </div>
                  }
                  style={{
                    marginBottom: 2,
                    marginTop: 10,
                    backgroundColor: "paleturquoise",
                  }}
                >
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Select
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={assPolaKepercayaan}
                      onChange={(e) => {
                        setassPolaKepercayaan(e);
                        e === "Tidak Teratur"
                          ? console.log(e)
                          : settandaGejalaAssPolaKepercayaan([]);
                        setAssTdkepercayaanKesehatan(null);
                        setAssTdlainlain(null);
                        setAssTdpemeriksaanNilaiKepercayaan(null);
                      }}
                    >
                      <Option value="Teratur">Teratur</Option>
                      <Option value="Tidak Teratur">Tidak Teratur</Option>
                    </Select>
                  </Form.Item>
                </Form.Item>
                {assPolaKepercayaan === "Tidak Teratur" ? (
                  <Form.Item
                    {...formItemLayout}
                    label=":"
                    style={{
                      marginBottom: 5,
                      backgroundColor: "paleturquoise",
                    }}
                  >
                    <Row gutter={[20, 6]}>
                      <Col span={12}>
                        Kepercayaan Terkait Kesehatan
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdkepercayaanKesehatan}
                            onChange={(e) =>
                              setAssTdkepercayaanKesehatan(e.target.value)
                            }
                          />
                        </Form.Item>
                      </Col>
                      <Col span={12}>
                        Lain-Lain
                        <br />
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdlainlain}
                            onChange={(e) => setAssTdlainlain(e.target.value)}
                          />
                        </Form.Item>
                      </Col>
                      <Col span={24}>
                        Tanda Gejala
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Select
                            value={tandaGejalaAssPolaKepercayaan}
                            style={{ width: "100%", maxWidth: "78vw" }}
                            mode="multiple"
                            allowClear
                            showSearch
                            source={tandaGejalaKepercayaan}
                            onChange={(e) => {
                              settandaGejalaAssPolaKepercayaan(e);
                            }}
                            tokenSeparators={[","]}
                            placeholder="..."
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {tandaGejalaKepercayaan.map((b) => (
                              <Option key={b.TandaGejalaId}>
                                {b.Deskripsi}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                        Pemeriksaan Lain
                        <br />
                        <Form.Item style={{ marginBottom: 5 }}>
                          <Input
                            type="text"
                            placeholder="..."
                            value={assTdpemeriksaanNilaiKepercayaan}
                            onChange={(e) =>
                              setAssTdpemeriksaanNilaiKepercayaan(
                                e.target.value
                              )
                            }
                          />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Form.Item>
                ) : null}
              </Col>
            </Row>
          </Panel>
        </Collapse>

        <Card size="small">
          <Row>
            <Col span={12} style={{ textAlign: "left" }}></Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  type="primary"
                  disabled={props.btnKeluhan}
                  loading={spin}
                  onClick={() => {
                    const gjlbaruOksigenasi = [];
                    for (var i = 0; i < tandaGejalaAssOksigen.length; i++) {
                      gjlbaruOksigenasi.push({
                        parameter: "Respirasi",
                        tandaGejalaId: tandaGejalaAssOksigen[i],
                      });
                    }

                    const gjlbaruSirkulasi = [];
                    for (var i = 0; i < tandaGejalaAssSirkulasi.length; i++) {
                      gjlbaruSirkulasi.push({
                        parameter: "Sirkulasi",
                        tandaGejalaId: tandaGejalaAssSirkulasi[i],
                      });
                    }

                    const gjlbaruNutrisi = [];
                    for (var i = 0; i < tandaGejalaAssNutrisi.length; i++) {
                      gjlbaruNutrisi.push({
                        parameter: "Nutrisi",
                        tandaGejalaId: tandaGejalaAssNutrisi[i],
                      });
                    }

                    const gjlbaruEliminasi = [];
                    for (var i = 0; i < tandaGejalaAssEliminasi.length; i++) {
                      gjlbaruEliminasi.push({
                        parameter: "Eliminasi",
                        tandaGejalaId: tandaGejalaAssEliminasi[i],
                      });
                    }

                    const gjlbaruAktifitasIstirahat = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssAktifitasIstirahat.length;
                      i++
                    ) {
                      gjlbaruAktifitasIstirahat.push({
                        parameter: "AktifitasDanIstirahat",
                        tandaGejalaId: tandaGejalaAssAktifitasIstirahat[i],
                      });
                    }

                    const gjlbaruProteksiPerlindungan = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssProteksiPerlindungan.length;
                      i++
                    ) {
                      gjlbaruProteksiPerlindungan.push({
                        parameter: "ProteksiDanPerlindungan",
                        tandaGejalaId: tandaGejalaAssProteksiPerlindungan[i],
                      });
                    }

                    const gjlbaruSensoriPersepsi = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssSensoriPersepsi.length;
                      i++
                    ) {
                      gjlbaruSensoriPersepsi.push({
                        parameter: "SensoriPersepsi",
                        tandaGejalaId: tandaGejalaAssSensoriPersepsi[i],
                      });
                    }

                    const gjlbaruCairanElektrolit = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssCairanElektrolit.length;
                      i++
                    ) {
                      gjlbaruCairanElektrolit.push({
                        parameter: "CairanDanElektrolit",
                        tandaGejalaId: tandaGejalaAssCairanElektrolit[i],
                      });
                    }

                    const gjlbaruFungsiNeurologis = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssFungsiNeurologis.length;
                      i++
                    ) {
                      gjlbaruFungsiNeurologis.push({
                        parameter: "FungsiNeurologis",
                        tandaGejalaId: tandaGejalaAssFungsiNeurologis[i],
                      });
                    }

                    const gjlbaruFungsiEndokrin = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssFungsiEndokrin.length;
                      i++
                    ) {
                      gjlbaruFungsiEndokrin.push({
                        parameter: "FungsiEndokrin",
                        tandaGejalaId: tandaGejalaAssFungsiEndokrin[i],
                      });
                    }

                    const gjlbaruKonsepDiri = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssKonsepDiriKognitif.length;
                      i++
                    ) {
                      gjlbaruKonsepDiri.push({
                        parameter: "KonsepDiriDanKognitif",
                        tandaGejalaId: tandaGejalaAssKonsepDiriKognitif[i],
                      });
                    }

                    const gjlbaruFungsiPeran = [];
                    for (var i = 0; i < tandaGejalaAssFungsiPeran.length; i++) {
                      gjlbaruFungsiPeran.push({
                        parameter: "FungsiPeran",
                        tandaGejalaId: tandaGejalaAssFungsiPeran[i],
                      });
                    }

                    const gjlbaruKopingStress = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssPolaToleransiKopingStrees.length;
                      i++
                    ) {
                      gjlbaruKopingStress.push({
                        parameter: "PolaToleransiKopingStress",
                        tandaGejalaId:
                          tandaGejalaAssPolaToleransiKopingStrees[i],
                      });
                    }

                    const gjlbaruSeksualReproduksi = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssSeksualReproduksi.length;
                      i++
                    ) {
                      gjlbaruSeksualReproduksi.push({
                        parameter: "SeksualReproduksi",
                        tandaGejalaId: tandaGejalaAssSeksualReproduksi[i],
                      });
                    }

                    const gjlbaruNilaiKepercayaan = [];
                    for (
                      var i = 0;
                      i < tandaGejalaAssPolaKepercayaan.length;
                      i++
                    ) {
                      gjlbaruNilaiKepercayaan.push({
                        parameter: "PolaNilaiKepercayaan",
                        tandaGejalaId: tandaGejalaAssPolaKepercayaan[i],
                      });
                    }

                    const tandagejalaAssesment = gjlbaruOksigenasi
                      .concat(gjlbaruSirkulasi)
                      .concat(gjlbaruNutrisi)
                      .concat(gjlbaruEliminasi)
                      .concat(gjlbaruAktifitasIstirahat)
                      .concat(gjlbaruProteksiPerlindungan)
                      .concat(gjlbaruSensoriPersepsi)
                      .concat(gjlbaruCairanElektrolit)
                      .concat(gjlbaruFungsiNeurologis)
                      .concat(gjlbaruFungsiEndokrin)
                      .concat(gjlbaruKonsepDiri)
                      .concat(gjlbaruFungsiPeran)
                      .concat(gjlbaruKopingStress)
                      .concat(gjlbaruSeksualReproduksi)
                      .concat(gjlbaruNilaiKepercayaan);

                    const datadetailTGejala = {
                      registrasiId: props.pasien.result.registrasiId,
                      pasienId: props.pasien.result.pasienId,
                      tanggal: dayjs(props.tanggal).format("YYYY-MM-DDTHH:mm"),
                      ruangId: props.ruangId,
                      //oksigenasi
                      respirasi: assOksigen,
                      rr: parseInt(frekuensiNafas),
                      pemeriksaanRespirasi: assTdpemeriksaanRespirasi,
                      //Sirkulasi
                      sirkulasi: assSirkulasi,
                      tekananDarahSistolik: parseInt(tekananDarahSistolik),
                      tekananDarahDiastolik: parseInt(tekananDarahDiastolik),
                      frekuensiNadi: parseInt(frekuensiNadi),
                      ekstremitas: assTdekstremitas,
                      pemeriksaanSirkulasi: assTdpemeriksaanSirkulasi,
                      //nutrisi
                      nutrisi: assNutrisi,
                      scoreNutrisi:
                        metodeNutrisi === "PASIEN DEWASA"
                          ? totalNutrisiDewasa.toString()
                          : totalNutrisiAnak.toString(),
                      kesimpulanNutrisi:
                        metodeNutrisi === "PASIEN DEWASA"
                          ? ketNutrisiDewasa
                          : ketNutrisiAnak,
                      hasilPengkajian:
                        metodeNutrisi === "PASIEN DEWASA"
                          ? ketNutrisiDewasa
                          : ketNutrisiAnak,
                      tinggiBadan: parseInt(tinggiBadan),
                      beratBadan: parseInt(beratBadan),
                      imt: parseFloat(IMT),
                      pemeriksaanNutrisi: assTdpemeriksaanNutrisi,
                      // eliminasi
                      eliminasi: assEliminasi,
                      frekuensiBab: isNaN(assTdfrekuensiBab)
                        ? null
                        : parseInt(assTdfrekuensiBab),
                      konsistensiBab: assTdkonsistensiBab,
                      warnaBab: assTdwarnaUrin,
                      keluhanBab: assTdkeluhanBab,
                      peristaltikUsus: assTdperistaltikUsus,
                      frekuensiBak: isNaN(assTdfrekuensiBak)
                        ? null
                        : parseInt(assTdfrekuensiBak),
                      jumlahUrin: assTdjumlahUrin,
                      gangguanUrin: assTdgangguanUrin,
                      kateter: assTdkateter,
                      warnaUrin: assTdwarnaUrin,
                      pemeriksaanEliminasi: assTdpemeriksaanEliminasi,
                      //aktifitas
                      aktifitas: assAktifitasIstirahat,
                      tidurMalam: assTdtidurMalam,
                      tidurSiang: assTdtidurSiang,
                      gangguanTidur: assTdgangguanTidur,
                      obatTidur: assTdobatTidur,
                      pemeriksaanAktifitas: assTdpemeriksaanAktifitas,
                      //proteksi
                      proteksi: assProteksiPerlindungan,
                      lukaKulit: assTdlukaKulit,
                      lokasiLuka: assTdlokasiLuka,
                      penyebabLuka: assTdpenyebabLuka,
                      luasLuka: assTdluasLuka,
                      pemeriksaanProteksi: assTdpemeriksaanProteksi,
                      //sensori
                      sensori: assSensoriPersepsi,
                      kesadaran: assTdkesadaran,
                      gcsMata: parseInt(gcsMata),
                      gcsSuara: parseInt(gcsSuara),
                      gcsGerakan: parseInt(gcsGerakan),
                      pendengaran: assTdpendengaran,
                      penglihatan: assTdpenglihatan,
                      bicara: assTdbicara,
                      kebiasaanPeriksa: assTdkebiasaanPeriksa,
                      persepsiSakit: assTdpersepsiSakit,
                      pemeriksaanSensori: assTdpemeriksaanSensori,
                      //cairanelektrolit
                      cairanElektrolit: assCairanElektrolit,
                      iwl: assTdiwl,
                      derajatEdema: assTdderajatEdema,
                      pemeriksaanCairanElektrolit:
                        assTdpemeriksaanCairanElektrolit,
                      //fungsi neurologis
                      fungsiNeurologis: assFungsiNeurologis,
                      pemeriksaanNeurologis: assTdpemeriksaanNeurologis,
                      //fungsi endokrin
                      fungsiEndokrin: assFungsiEndokrin,
                      pemeriksaanEndokrin: assTdpemeriksaanEndokrin,
                      //konsepdirikognitif
                      konsepDiri: assKonsepDiriKognitif,
                      pengetahuanPenyakit: assTdpengetahuanPenyakit,
                      pengetahuanPerawatan: assTdpengetahuanPerawatan,
                      scoreKonsepDiri: assTdscoreKonsepDiri,
                      pemeriksaanKonsepDiri: assTdpemeriksaanKonsepDiri,
                      //fungsiperan
                      fungsiPeran: assFungsiPeran,
                      hubunganPeran: assTdhubunganPeran,
                      peranKeluarga: assTdperanKeluarga,
                      pemeriksaanFungsiPeran: assTdpemeriksaanFungsiPeran,
                      //koping stress
                      polaToleransi: assPolaToleransiKopingStrees,
                      koping: assTdkoping,
                      penyelesaianMasalah: assTdpenyelesaianMasalah,
                      pemeriksaanPolaToleransi: assTdpemeriksaanPolaToleransi,
                      //seksualreproduksi
                      seksualReproduksi: assSeksualReproduksi,
                      jumlahAnak: isNaN(assTdjumlahAnak)
                        ? null
                        : parseInt(assTdjumlahAnak),
                      umurMenikah: isNaN(assTdumurMenikah)
                        ? null
                        : parseInt(assTdumurMenikah),
                      umurAnakPertama: isNaN(assTdumurAnakPertama)
                        ? null
                        : parseInt(assTdumurAnakPertama),
                      penyakitKelamin: assTdpenyakitKelamin,
                      jenisPenyakit: assTdjenisPenyakit,
                      keluhanPenyakit: assTdkeluhanPenyakit,
                      pemeriksaanSeksual: assTdpemeriksaanSeksual,
                      //kepercayaan
                      kebiasaanIbadah: assPolaKepercayaan,
                      kepercayaanKesehatan: assTdkepercayaanKesehatan,
                      lainlain: assTdlainlain,
                      pemeriksaanNilaiKepercayaan:
                        assTdpemeriksaanNilaiKepercayaan,
                      userId: namauser,
                      tandaGejala: tandagejalaAssesment,
                    };

                    tekananDarahSistolik === "" ||
                      tekananDarahSistolik === " " ||
                      tekananDarahSistolik === null
                      ? message.warning("Silahkan Isi Tekanan Darah Pasien")
                      : tekananDarahDiastolik === "" ||
                        tekananDarahDiastolik === " " ||
                        tekananDarahDiastolik == null
                        ? message.warning("Silahkan Isi Tekanan Darah Pasien")
                        : frekuensiNadi === "" ||
                          frekuensiNadi === " " ||
                          frekuensiNadi === null
                          ? message.warning("Silahkan Isi Nadi Pasien")
                          : suhuTubuh === "" ||
                            suhuTubuh === " " ||
                            suhuTubuh === null
                            ? message.warning("Silahkan Isi Suhu Tubuh Pasien")
                            : frekuensiNafas === "" ||
                              frekuensiNafas === " " ||

                              frekuensiNafas === null
                              ? message.warning("Silahkan Isi Frekuensi Nafas Pasien")
                              : saturasiOksigen === "" ||
                                saturasiOksigen === " " ||
                                saturasiOksigen === null
                                ? message.warning("Silahkan Satursi Nafas Tubuh Pasien")
                                : beratBadan === "" ||
                                  beratBadan === " " ||
                                  beratBadan === null
                                  ? message.warning("Silahkan Isi Berat Badan Pasien")
                                  : tinggiBadan === "" ||
                                    tinggiBadan === " " ||
                                    tinggiBadan === null
                                    ? message.warning("Silahkan Isi Tinggi Badan Pasien")
                                    : tinggiBadan === "" ||
                                      tinggiBadan === " " ||
                                      tinggiBadan === null
                                      ? message.warning("Silahkan Isi Tinggi Badan Pasien")
                                      : isNaN(skorNyeriKirim)
                                        ? message.warning("Silahkan Isi Skor Nyeri Pasien")
                                        : isNaN(skorOntario) &&
                                          isNaN(skorHumptyDumpty) &&
                                          isNaN(skorMorse)
                                          ? message.warning("Silahkan Isi Skor Resiko Jatuh Pasien")
                                          : isNaN(totalNutrisiAnak) && isNaN(totalNutrisiDewasa)
                                            ? message.warning("Silahkan Isi Nutrisi Pasien")
                                            : isNaN(ewsTotal)
                                              ? message.warning("Silahkan Isi EWS Pasien")
                                              : nKeluhanNew.length === 0 ||
                                                // nKeluhanNew.length === [] ||
                                                nKeluhanNew.length === null
                                                ? message.warning("Silahkan Isi Keluhan Pasien Pasien")
                                                : props.bbKering === 0 ||
                                                  props.bbKering === "" ||
                                                  props.bbKering === null
                                                  ? message.warning(
                                                    "Silahkan Isi Berat Badan Kering Pasien Pasien"
                                                  )
                                                  : disGcs !== "91" && !gcsMata
                                                    ? message.warning("Buka Mata(GCS) masih kosong!")
                                                    : disGcs !== "91" && !gcsGerakan
                                                      ? message.warning("Motorik(GCS) masih kosong!")
                                                      : disGcs !== "91" && !gcsSuara
                                                        ? message.warning("Bicara(GCS) masih kosong!")
                                                        : !props.ekstremitas
                                                          ? message.warning("Ekstremitas masih kosong!")
                                                          : !props.aksesVaskulerId
                                                            ? message.warning("Akses Vaskuler masih kosong!")
                                                            : !props.ktv3
                                                              ? message.warning("Adekuasi masih kosong!")
                                                              : props.userEntry && props.user !== props.userEntry
                                                                ? message.warning(
                                                                  "User Anda dan User Entry berbeda, tidak bisa simpan!"
                                                                )
                                                                : // message.warning("Berhasil Simpan!")
                                                                simpanKeContext(
                                                                  datatandavital,
                                                                  datanyeri,
                                                                  dataResikoJatuh,
                                                                  dataKeluhan,
                                                                  dataPantuanNutrisi,
                                                                  dataEWS,
                                                                  datadetailTGejala
                                                                );
                  }}
                >
                  Simpan
                </Button>

                <Button
                  onClick={() => {
                    setscalaNyeri("Visual Analog Scale");
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

                    setcaraMasuk("");
                    setasalMasuk("");
                    setriwayatAlergi("");
                    setriwayat("");
                    setriwayatGenetik("");
                    setppsId("");
                    setnKeluhanNew([]);
                    settablekeluhan([]);
                    getPPSByID();
                    setewsRespirasi("");
                    setewsSatursiOksigen("");
                    setewsSuplemenOksigen("");
                    setewsSuhu("");
                    setewsSistolik("");
                    setewsJantung("");
                    setewsKesadaran("");
                    setmetodeNutrisi("");
                    setidPantuannutrisi(0);
                    setpenurunanBbdewasa("");
                    setjumlahPenurunanBb("");
                    setasupanMakanDewasa("");
                    setpasienDiagnosisKhusus("");
                    setkurusAnak("");
                    setpenurunanBbanak("");
                    setdiareAnak("");
                    setpenyakitBeresikoAnak("");

                    setassOksigen("Tidak Ada Keluhan");
                    settandaGejalaAssOksigen([]);
                    setAssTdpemeriksaanRespirasi(null);
                    setassSirkulasi("Tidak Ada Keluhan");
                    settandaGejalaAssSirkulasi([]);
                    setAssTdekstremitas(null);
                    setAssTdpemeriksaanSirkulasi(null);
                    setassNutrisi("Tidak Ada Keluhan");
                    settandaGejalaAssNutrisi([]);
                    setAssTdpemeriksaanNutrisi(null);
                    setassEliminasi("Tidak Ada Keluhan");
                    settandaGejalaAssEliminasi([]);
                    setAssTdfrekuensiBab(null);
                    setAssTdkonsistensiBab(null);
                    setAssTdwarnaBab(null);
                    setAssTdkeluhanBab(null);
                    setAssTdperistaltikUsus(null);
                    setAssTdfrekuensiBak(null);
                    setAssTdjumlahUrin(null);
                    setAssTdgangguanUrin(null);
                    setAssTdkateter(null);
                    setAssTdwarnaUrin(null);
                    setAssTdpemeriksaanEliminasi(null);
                    setassAktifitasIstirahat("Tidak Ada Keluhan");
                    settandaGejalaAssAktifitasIstirahat([]);
                    setAssTdtidurMalam(null);
                    setAssTdtidurSiang(null);
                    setAssTdgangguanTidur(null);
                    setAssTdobatTidur(null);
                    setAssTdpemeriksaanAktifitas(null);
                    setassProteksiPerlindungan("Tidak Ada Keluhan");
                    settandaGejalaAssProteksiPerlindungan([]);
                    setAssTdlukaKulit(null);
                    setAssTdlokasiLuka(null);
                    setAssTdpenyebabLuka(null);
                    setAssTdluasLuka(null);
                    setAssTdpemeriksaanProteksi(null);
                    setassSensoriPersepsi("Tidak Ada Keluhan");
                    settandaGejalaAssSensoriPersepsi([]);
                    setAssTdkesadaran(null);
                    setAssTdpendengaran(null);
                    setAssTdpenglihatan(null);
                    setAssTdkebiasaanPeriksa(null);
                    setAssTdpersepsiSakit(null);
                    setAssTdbicara(null);
                    setAssTdpemeriksaanSensori(null);
                    setassCairanElektrolit("Tidak Ada Keluhan");
                    settandaGejalaAssCairanElektrolit([]);
                    setAssTdiwl(null);
                    setAssTdderajatEdema(null);
                    setAssTdpemeriksaanCairanElektrolit(null);
                    setassFungsiNeurologis("Tidak Ada Keluhan");
                    settandaGejalaAssFungsiNeurologis([]);
                    setAssTdpemeriksaanNeurologis(null);
                    setassFungsiEndokrin("Tidak Ada Keluhan");
                    settandaGejalaAssFungsiEndokrin([]);
                    setAssTdpemeriksaanEndokrin(null);
                    setassKonsepDiriKognitif("Tidak Ada Keluhan");
                    settandaGejalaAssKonsepDiriKognitif([]);
                    setAssTdpengetahuanPenyakit(null);
                    setAssTdpengetahuanPerawatan(null);
                    setAssTdscoreKonsepDiri(null);
                    setAssTdpemeriksaanKonsepDiri(null);
                    setassFungsiPeran("Tidak Ada Keluhan");
                    settandaGejalaAssFungsiPeran([]);
                    setAssTdhubunganPeran(null);
                    setAssTdperanKeluarga(null);
                    setAssTdpemeriksaanFungsiPeran(null);
                    setassPolaToleransiKopingStrees("Tidak Ada Keluhan");
                    settandaGejalaAssPolaToleransiKopingStrees([]);
                    setAssTdkoping(null);
                    setAssTdpenyelesaianMasalah(null);
                    setAssTdpemeriksaanPolaToleransi(null);
                    setassSeksualReproduksi("Tidak Ada Keluhan");
                    settandaGejalaAssSeksualReproduksi([]);
                    setAssTdjumlahAnak(null);
                    setAssTdumurMenikah(null);
                    setAssTdumurAnakPertama(null);
                    setAssTdpenyakitKelamin(null);
                    setAssTdjenisPenyakit(null);
                    setAssTdkeluhanPenyakit(null);
                    setAssTdpemeriksaanSeksual(null);
                    setassPolaKepercayaan("Tidak Ada Keluhan");
                    settandaGejalaAssPolaKepercayaan([]);
                    setAssTdkepercayaanKesehatan(null);
                    setAssTdlainlain(null);
                    setAssTdpemeriksaanNilaiKepercayaan(null);
                  }}
                >
                  Batal
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Form>

      <Modal
        closable={false}
        footer={null}
        visible={visibleCteakAssesment}
        onCancel={() => {
          setvisibleCteakAssesment(false);
        }}
        style={{ top: 1 }}
        width="775px"
        centered={true}
      ></Modal>

      {/* Modal Riwayat TB */}
      <Modal
        closable={false}
        footer={null}
        visible={mdRiwTB}
        title='Riwayat Tinggi Badan'
        onCancel={() => {
          setmdRiwTB(false);
        }}
        // style={{ top: 1 }}
        width="500px"
        centered={true}
      >
        <Table
          dataSource={props.dataRiwTB}
          columns={columnsa}
          bordered
          loading={props.isLoading}
          pagination={false}
          // rowKey={(record, index) => index}
          size="small"
        // scroll={{ y: 420 }}
        // style={{ height: 495 }}
        />
      </Modal>
    </div>
  );
};

export default AssesmentAskepHD;
