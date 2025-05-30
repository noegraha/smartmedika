/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  createContext,
  useEffect,
  useCallback,
  useContext,
  useRef,
} from "react";
import dayjs from "dayjs";
import { message, Modal } from "antd";
import { LoginContext } from "../../rawatjalan/context";
import { PemeriksaanFisikContext } from "../../rawatjalan/context/PemeriksaanFisikContext";
import { AssesmentRIContext } from "../../rawatinap/context/AssesmentRIContext";
import { MasterTandaGejalaContext } from "../../master/context/masteraskep/MasterTandaGejalaContext";
import axios from "axios";

const defaultPasiens = {
  statuscode: 200,
  message: "OK",
  result: [],
};

const dateFormata = "YYYY-MM-DD";
// const dateNow = dayjs(new Date(), dateFormata);
const dateNow = dayjs();

function HdContext() {
  const PasiensContext = createContext();

  const PasiensProvider = props => {
    const ipEndpoint = sessionStorage.getItem("apiPenunjang");
    const ipEndReporting = sessionStorage.getItem("apiReporting");

    const endpoint = `${ipEndpoint}/EmrDialisisHeader/`;
    const endpointmst = `${ipEndpoint}/`;
    const endpointReport = ipEndReporting + "/";

    const {
      getNyeriByRegDate,
      getAssementAssByRuang,
      getTTVAssByRuang,
      getNutrisiAssByRuang,
      getResikoJatuhByRegDate,
      getEwsAssByRuang,
      getAssesmentDetailTG,
      setDefAssesmentDetailTG,
    } = useContext(AssesmentRIContext);
    const { namauser } = useContext(LoginContext);
    const {
      insertPemfisik,
      // kepala
      mataKonjungtiva,
      mataSklera,
      mataPupil,
      mataDiameterKanan,
      mataDiameterKiri,
      mataLainnya,
      telinga,
      telingaLainnya,
      hidungDeformitas,
      hidungEpistaksis,
      hidungDeviasiSeptum,
      hidungLainnya,
      hidungLainLain,
      mulut,
      bibir,
      mulutKeterangan,
      kepalaLainLain,
      // leher
      leherKondisi,
      leherJejas,
      leherVenaJagularis,
      leherKelenjarLimfe,
      leherLainnya,
      // leherTiroid,
      // thorax
      thoraxKondisi,
      thoraxJejas,
      thoraxRetraksi,
      thoraxKrepitasi,
      thoraxLainnya,
      jantung,
      jantungIrama,
      jantungBunyiMurmur,
      jantungBunyiGallop,
      jantungBunyiLainlain,
      jantungLainLain,
      paru,
      vesikulerKanan,
      vesikulerKiri,
      ronkhiKanan,
      ronkhiKiri,
      whezingKanan,
      whezingKiri,
      paruLainLain,
      // abdomen
      abdomenKondisi,
      abdomenJejas,
      abdomenPeristaltik,
      abdomenHati,
      abdomenLimpa,
      abdomenNyeriTekan,
      abdhipokanan,
      abdepigastrium,
      abdhipokiri,
      abdlumbalkanan,
      abdumbilikus,
      abdlumbalkiri,
      abdiliakakanan,
      abdsuprapubik,
      abdiliakakiri,
      abdomenLainLain,
      // urogenital
      urogenitalJejas,
      urogenitalKelamin,
      urogenitalKeteranganKelamin,
      urogenitalLainLain,
      // extremitas
      motorikKananAtas,
      motorikKiriAtas,
      motorikKananBawah,
      motorikKiriBawah,
      edemKananAtas,
      edemKiriAtas,
      edemKananBawah,
      edemKiriBawah,
      sianosis,
      // ==========
      ekstremisSuperior,
      ekstremisInferior,
      ekstremisSianosis,
      lokalisKeterangan,
      punggungVetebrata,
      punggungGinjal,
      coxae,
      limponodi,
      reflek,
      turgorKulit,
      akral,
    } = useContext(PemeriksaanFisikContext);
    const { getTandagejalaSubAskep } = useContext(MasterTandaGejalaContext);

    const ip = sessionStorage.getItem("IP");
    const host = sessionStorage.getItem("Host");
    const token = sessionStorage.getItem("userData");
    const options = {
      headers: { Authorization: "Bearer " + token },
    };
    // console.log("Auth: ", options);

    const [pasiens, setPasiens] = useState(defaultPasiens);
    const [startDate, setStartDate] = useState(dateNow);
    const [isError, setError] = useState(false);
    const [timeMessage, setTimeMessage] = useState(5);
    const [tabAktif, setTabAktif] = useState("1");
    const [tabAktifa, setTabAktifa] = useState("1");
    const [ruangId, setruangId] = useState("9406");

    // disable button
    const [btnKeluhan, setBtnKeluhan] = useState(true);
    const [btnDiagKep, setBtnDiagKep] = useState(false);
    const [btnIntMedik, setBtnIntMedik] = useState(false);
    const [btnIntraHd, setBtnIntraHd] = useState(false);
    const [btnPostHd, setBtnPostHd] = useState(false);
    const [disabledVerifHd, setDisabledVerifHd] = useState(true);
    const [disabledTglPendHd, setDisabledTglPendHd] = useState(false);
    const [disabledWaktuSelesai, setDisabledWaktuSelesai] = useState(false);

    // loading
    const [isLoading, setLoading] = useState(false);
    const [loadingContent, setLoadingContent] = useState(false);
    const [spinInform, setSpinInform] = useState(false);
    const [spinPendHD, setSpinPendHD] = useState(false);
    const [spinIntMedik, setSpinIntMedik] = useState(false);
    const [spinPostHd, setSpinPostHd] = useState(false);
    const [spinIntHd, setSpinIntHd] = useState(false);

    // user, clienthost, clientip
    const [user, setUser] = useState(namauser);
    const [userEntry, setUserEntry] = useState("");
    const [clientHost, setClientHost] = useState(host);
    const [clientIP, setclientIP] = useState(ip);

    // daftar pasien
    const [tglList, setTglList] = useState(dateNow);
    // identitas pasien
    const [pasien, setPasien] = useState(defaultPasiens);
    const [noOrder, setNoOrder] = useState("");
    const [dialisisHeaderId, setDialisisHeaderId] = useState("");

    // informed consent
    const [dokterIdIc, setDokterIdIc] = useState("");
    const [ttdDokterIdIc, setttdDokterIdIc] = useState("");
    const [jenisPenerima, setJenisPenerima] = useState("");
    const [handleJenisPenerima, setHandleJenisPenerima] = useState(false);
    const [namaKeluarga, setNamaKeluarga] = useState("");
    const [tglLahirKeluarga, setTglLahirKeluarga] = useState(dateNow);
    const [umurKeluarga, setUmurKeluarga] = useState("");
    const [umurKeluargaa, setUmurKeluargaa] = useState(0);
    const [alamatKeluarga, setAlamatKeluarga] = useState("");
    const [perawatPendampingId, setPerawatPendampingId] = useState("");
    const [ttdPerawatPendampingId, setttdPerawatPendampingId] = useState("");
    const [info1, setInfo1] = useState(false);
    const [info2, setInfo2] = useState(false);
    const [info3, setInfo3] = useState(false);
    const [info4, setInfo4] = useState(false);
    const [info5, setInfo5] = useState(false);
    const [info6, setInfo6] = useState(false);
    const [info7, setInfo7] = useState(false);
    const [info8, setInfo8] = useState(false);
    const [info9, setInfo9] = useState(false);
    const [info10, setInfo10] = useState(false);
    const [info11, setInfo11] = useState(false);
    const [ketInfo11, setKetInfo11] = useState("");
    const [jamIC, setjamIC] = useState("");
    const [userIC, setUserIC] = useState("");
    const [namattd1, setnamattd1] = useState("");
    const [ktgTtd, setktgTtd] = useState("");
    // ttd pasien
    const [ttdPasien, setTtdPasien] = useState("");
    const [ttdKeluargaPasien, setTtdKeluargaPasien] = useState("");
    const sigCanvas = useRef({});
    const clear = () => sigCanvas.current.clear();
    const save = () => {
      setTtdPasien(sigCanvas.current.getTrimmedCanvas().toDataURL().substr(22));
      if (jenisPenerima === "2") {
        setTtdKeluargaPasien(
          sigCanvas.current.getTrimmedCanvas().toDataURL().substr(22)
        );
      }
    };
    // ttd keluarga / wali
    const sigCanvasa = useRef({});
    const cleara = () => sigCanvasa.current.clear();
    const savea = () =>
      setTtdKeluargaPasien(
        sigCanvasa.current.getTrimmedCanvas().toDataURL().substr(22)
      );
    const [uRLInformConsent, setuRLInformConsent] = useState();
    const [isLoadingInformConsent, setLoadingInformConsent] = useState(false);

    // pendaftaran hd
    const [tanggal, setTanggal] = useState(dayjs());
    const [hdKe, setHdKe] = useState(1);
    const [riwAllObat, setRiwAllObat] = useState(true);
    const [ketRiwAllObat, setKetRiwAllObat] = useState("");
    const [verifHd, setVerifHd] = useState(false);
    const [mesinNo, setMesinNo] = useState(1);
    const [dialsiser, setDialsiser] = useState("Baru");
    const [textButton, setTextButton] = useState("Simpan");
    const [hasilLab, setHasilLab] = useState([]);
    // assesment hd
    const [hanyaBaca, sethanyaBaca] = useState(false);
    const [dpjpRuangOrder, setdpjpRuangOrder] = useState("");
    // keluhan
    // const [kelUtama, setKelUtama] = useState("");
    // const [dialisisKeluhan, setDialisisKeluhan] = useState([]);
    // const [dialisisKeluhanReport, setDialisisKeluhanReport] = useState([]);
    // const [p, setP] = useState("");
    // const [q, setQ] = useState("");
    // const [r, setR] = useState("");
    // const [s, setS] = useState("");
    // const [t, setT] = useState("");
    // pemeriksaan fisik
    // const [keadaanUmum, setKeadaanUmum] = useState("")
    const [bbKering, setBbKering] = useState(0);
    const [bbPostHdSebelumnya, setBbPostHdSebelumnya] = useState(0);
    const [konjungtiva, setKonjungtiva] = useState(false);
    const [ekstremitas, setEkstremitas] = useState("");
    const [aksesVaskulerId, setAksesVaskulerId] = useState("");
    const [pemPenunjang, setPemPenunjang] = useState("");
    // const [statusNutrisi, setStatusNutrisi] = useState("")
    const [urr, setUrr] = useState(0);
    const [ktv3, setKtv3] = useState(0);
    const [kesimpulanadekuat, setKesimpulanadekuat] = useState("Tidak Adekuat");
    const [colorKesAde, setColorKesAde] = useState("red");
    // tanda vital 1
    // const [tandaVitalId, setTandaVitalId] = useState(0)
    // const [skorNyeri, setSkorNyeri] = useState(0)
    // const [bb, setBb] = useState(0)
    // const [tekananDarahSistolik, setTekananDarahSistolik] = useState(0)
    // const [tekananDarahDiastolik, setTekananDarahDiastolik] = useState(0)
    // const [frekuensiNadi, setFrekuensiNadi] = useState(0)
    // const [frekuensiNafas, setFrekuensiNafas] = useState(0)
    // const [suhuTubuh, setSuhuTubuh] = useState(0)
    // const [resikoJatuh, setResikoJatuh] = useState(0)

    // Instruksi Medik
    const [jenisKasus, setJenisKasus] = useState("1");
    const [mode, setMode] = useState("1");
    const [dialisat, setDialisat] = useState("1");
    const [durasi, setDurasi] = useState(0);
    const [qb, setQb] = useState(100);
    const [qb1, setQb1] = useState(100);
    const [qd, setQd] = useState(300);
    const [ufGoal, setUfGoal] = useState(0);
    const [conductivity, setConductivity] = useState(0);
    const [suhu, setSuhu] = useState(0);
    const [na, setNa] = useState(0);
    const [naContentrat, setNaContentrat] = useState(0);
    const [uf1, setUf1] = useState(0);
    const [uf2, setUf2] = useState(0);
    const [uf3, setUf3] = useState(0);
    const [uf4, setUf4] = useState(0);
    const [uf5, setUf5] = useState(0);
    const [heparinasi, setHeparinasi] = useState(true);
    const [showHeparisani, setShowHeparisani] = useState(true);
    const [dosisSirkulasi, setDosisSirkulasi] = useState(0);
    const [dmContinue, setDmContinue] = useState(0);
    const [dmIntermiten, setDmIntermiten] = useState(0);
    const [dosisAwal, setDosisAwal] = useState(0);
    const [penyebabNonHeparinasi, setPenyebabNonHeparinasi] = useState("");
    const [pemeriksaanFisik, setPemeriksaanFisik] = useState("");
    const [terapiHd, setTerapiHd] = useState("");
    const [dokterPelaksanaId, setDokterPelaksanaId] = useState("");

    // Intra HD
    const [waktuMulai, setWaktuMulai] = useState(dateNow);
    const [waktuTarget, setWaktuTarget] = useState(dateNow);
    const [waktuSelesai, setWaktuSelesai] = useState(dateNow);
    const [ktv, setKtv] = useState("");
    const [kompIntradialisis, setKompIntradialisis] = useState([]);
    const [kompIntradialisisReport, setKompIntradialisisReport] = useState([]);
    const [dialisisDetail, setDialisisDetail] = useState([]);
    // monitoring dialisis
    const [jamDd, setJamDd] = useState(dayjs(dateNow));
    const [mQb, setMQb] = useState(0);
    const [vp, setVp] = useState("");
    const [tmp, setTmp] = useState("");
    const [ufRate, setUfRate] = useState("");
    const [remv, setRemv] = useState("");
    const [catatan, setCatatan] = useState("");
    const [tempIndex, setTempIndex] = useState(null);

    // post hd
    const [volumeSisaPriming, setVolumeSisaPriming] = useState(0);
    const [inTake, setInTake] = useState(0);
    const [naCl, setNaCl] = useState(0);
    const [jenisDarah, setJenisDarah] = useState("");
    const [transfusi, setTransfusi] = useState(0);
    const [bilasAkhir, setBilasAkhir] = useState(0);
    const [prwtAssId, setPrwtAssId] = useState("");
    const [prwtPrimerId, setPrwtPrimerId] = useState("");
    const [subject, setSubject] = useState("");
    // === tambahan === 230522
    const [infeksius, setinfeksius] = useState("");
    const [ketInfeksius, setketInfeksius] = useState("");
    // const [object, setObject] = useState("")
    // const [assesment, setAssesment] = useState("")
    // const [plann, setPlann] = useState("")
    const [layanan, setLayanan] = useState(true);
    const [hapus, setHapus] = useState(false);
    const [total, setTotal] = useState(0);
    // tanda vital 2
    const [tandaVitalIda, setTandaVitalIda] = useState(0);
    const [bba, setBba] = useState(0);
    const [tekananDarahSistolika, setTekananDarahSistolika] = useState(0);
    const [tekananDarahDiastolika, setTekananDarahDiastolika] = useState(0);
    const [frekuensiNadia, setFrekuensiNadia] = useState(0);
    const [frekuensiNafasa, setFrekuensiNafasa] = useState(0);
    const [suhuTubuha, setSuhuTubuha] = useState(0);
    const [tanggala, setTanggala] = useState(dayjs());

    // v2 - 09/01/2024
    const [dataRiwLabPK, setdataRiwLabPK] = useState([]);
    const [dataRiwTB, setdataRiwTB] = useState([]);
    const [dataPlanTerapi, setdataPlanTerapi] = useState({});
    const [listOrderObat, setlistOrderObat] = useState([]);
    const [listValidObat, setlistValidObat] = useState([]);
    const [spListObat, setspListObat] = useState(false);
    const [spPlanTerapi, setspPlanTerapi] = useState(false);

    const [listTbDashSSHD, setlistTbDashSSHD] = useState([]);
    const [spDashSSHD, setspDashSSHD] = useState(false);

    // modal
    const [mdInfoUpdate, setmdInfoUpdate] = useState(false);

    // mst
    // const [optKelTambahan, setOptKelTambahan] = useState([]);
    const [optAksesVaskuler, setOptAksesVaskuler] = useState([]);
    const [optPemPenunjang, setOptPemPenunjang] = useState([]);
    const [optDpjp, setDpjp] = useState([]);
    const [optDialisisKompIntra, setOptDialisisKompIntra] = useState([]);
    const [optPerawat, setOptPerawat] = useState([]);

    const changeDate = date => {
      if (date) {
        const tgl = date.format("YYYY-MM-DD");
        setTglList(tgl);
        // setPasien(defaultPasiens)
      }
    };

    // informed consent
    const changeDokterIdIc = value => {
      setDokterIdIc(value);
    };
    const changeJenisPenerima = value => {
      setJenisPenerima(value);
      value === "1"
        ? setHandleJenisPenerima(true)
        : setHandleJenisPenerima(false);
    };
    const changeNamaKeluarga = value => {
      setNamaKeluarga(value.target.value);
    };
    const displayAge = (birth, target) => {
      let months = target.diff(birth, "months", true);
      let birthSpan = {
        year: Math.floor(months / 12),
        month: Math.floor(months) % 12,
        day: Math.round((months % 1) * target.daysInMonth(), 0),
      };
      setUmurKeluargaa(birthSpan.year);
      // you can adjust below logic as your requirements by yourself
      if (birthSpan.year < 1 && birthSpan.month < 1) {
        return birthSpan.day + " hari"; //+ (birthSpan.day > 1 ? 's' : '')
      } else if (birthSpan.year < 1) {
        return birthSpan.month + " bulan"; //+ (birthSpan.month > 1 ? 's ' : ' ') + birthSpan.day + ' day' + (birthSpan.day > 1 ? 's' : '')
      } else if (birthSpan.year < 2) {
        return birthSpan.year + " tahun"; //+ (birthSpan.year > 1 ? 's ' : ' ') + birthSpan.month + ' month' + (birthSpan.month > 1 ? 's ' : '')
      } else {
        return birthSpan.year + " tahun"; //+ (birthSpan.year > 1 ? 's' : '')
      }
    };
    const changeTglLahirKeluarga = date => {
      if (date) {
        const tgl = date.format();
        setTglLahirKeluarga(tgl);
        setUmurKeluarga(displayAge(tgl, dayjs()));
      }
    };
    const changeAlamatKeluarga = value => {
      setAlamatKeluarga(value.target.value);
    };
    const changePerawatPendampingId = value => {
      setPerawatPendampingId(value);
    };
    const changeInfo1 = enable => {
      setInfo1(enable);
    };
    const changeInfo2 = enable => {
      setInfo2(enable);
    };
    const changeInfo3 = enable => {
      setInfo3(enable);
    };
    const changeInfo4 = enable => {
      setInfo4(enable);
    };
    const changeInfo5 = enable => {
      setInfo5(enable);
    };
    const changeInfo6 = enable => {
      setInfo6(enable);
    };
    const changeInfo7 = enable => {
      setInfo7(enable);
    };
    const changeInfo8 = enable => {
      setInfo8(enable);
    };
    const changeInfo9 = enable => {
      setInfo9(enable);
    };
    const changeInfo10 = enable => {
      setInfo10(enable);
    };
    const changeInfo11 = enable => {
      setInfo11(enable);
    };
    const changeKetInfo11 = value => {
      setKetInfo11(value.target.value);
    };

    // pendaftaran hd
    const changeDatePendHd = date => {
      setTanggal(date);
    };
    const changeHdKe = value => {
      setHdKe(value);
    };
    const changeRiwAllObat = value => {
      setRiwAllObat(value);
    };
    const changeKetRiwAllObat = value => {
      setKetRiwAllObat(value.target.value);
    };
    const changeVerifHd = value => {
      setVerifHd(value);
    };
    const changeMesinNo = value => {
      setMesinNo(value);
    };
    const changeDialsiser = value => {
      setDialsiser(value);
    };

    // keluhan
    // const changeKelUtama = (value) => { setKelUtama(value) };
    // const changeKelTambahan = (value) => { setDialisisKeluhan(value) }
    // const changeP = (value) => { setP(value.target.value) };
    // const changeQ = (value) => { setQ(value.target.value) };
    // const changeR = (value) => { setR(value.target.value) };
    // const changeS = (value) => { setS(value.target.value) };
    // const changeT = (value) => { setT(value.target.value) };

    // pemeriksaan fisik
    // const changePemFisik = value => { setKeadaanUmum(value) };
    const changeBbKering = value => {
      setBbKering(value);
    };
    const changeKonjungtiva = value => {
      setKonjungtiva(value);
    };
    const changeEkstremitas = value => {
      setEkstremitas(value);
    };
    const changeAksesVaskulerId = value => {
      setAksesVaskulerId(value);
    };
    const changePemPenunjang = value => {
      setPemPenunjang(value.target.value);
    };
    // const changeStatusNutrisi = value => { setStatusNutrisi(value) };
    const changeUrr = value => {
      setUrr(value);
      if (value > 64) {
        setKesimpulanadekuat("Adekuat");
        setColorKesAde("green");
      } else {
        setKesimpulanadekuat("Tidak Adekuat");
        setColorKesAde("red");
      }
    };
    const changeKtv3 = value => {
      setKtv3(value);
      if (value > 1.1) {
        setKesimpulanadekuat("Adekuat");
        setColorKesAde("green");
      } else {
        setKesimpulanadekuat("Tidak Adekuat");
        setColorKesAde("red");
      }
    };
    // tanda vital 1
    // const changeSkorNyeri = (value) => { setSkorNyeri(value) };
    // const changeBb = (value) => { setBb(value) };
    // const changeTekananDarahSistolik = (value) => { setTekananDarahSistolik(value) };
    // const changeTekananDarahDiastolik = (value) => { setTekananDarahDiastolik(value) };
    // const changeFrekuensiNadi = (value) => { setFrekuensiNadi(value) };
    // const changeFrekuensiNafas = (value) => { setFrekuensiNafas(value) };
    // const changeSuhuTubuh = (value) => { setSuhuTubuh(value) };
    // const changeResikoJatuh = (value) => { setResikoJatuh(value) };

    // int medik
    const changeJenisKasus = value => {
      setJenisKasus(value);
    };
    const changeMode = value => {
      setMode(value);
    };
    const changeDialisat = value => {
      setDialisat(value);
    };
    const changeDurasi = value => {
      setDurasi(value);
    };
    const changeQb = value => {
      setQb(value);
    };
    const changeQb1 = value => {
      setQb1(value);
    };
    const changeQd = value => {
      setQd(value);
    };
    const changeUfGoal = value => {
      setUfGoal(value);
    };
    const changeConductivity = value => {
      setConductivity(value);
    };
    const changeSuhu = value => {
      setSuhu(value);
    };
    const changeNa = value => {
      setNa(value);
    };
    const changeNaContentrat = value => {
      setNaContentrat(value);
    };
    const changeUf1 = value => {
      setUf1(value);
    };
    const changeUf2 = value => {
      setUf2(value);
    };
    const changeUf3 = value => {
      setUf3(value);
    };
    const changeUf4 = value => {
      setUf4(value);
    };
    const changeUf5 = value => {
      setUf5(value);
    };
    const changeHeparinasi = value => {
      setHeparinasi(value);
      setShowHeparisani(value);
    };
    const changeDosisSirkulasi = value => {
      setDosisSirkulasi(value);
    };
    const changeDmContinue = value => {
      setDmContinue(value);
    };
    const changeDmIntermiten = value => {
      setDmIntermiten(value);
    };
    const changeDosisAwal = value => {
      setDosisAwal(value);
    };
    const changePenyebabNonHeparinasi = value => {
      setPenyebabNonHeparinasi(value.target.value);
    };
    // const changePemeriksaanFisik = (value) => { setPemeriksaanFisik(value.target.value) };
    const changeTerapiHd = value => {
      setTerapiHd(value.target.value);
    };
    const changeDokterPelaksanaId = value => {
      setDokterPelaksanaId(value);
    };

    const datapemfisik = {
      registrasiId: pasien.result.registrasiId,
      tglPeriksa: dayjs(tanggal).format(),
      // kepala
      mataKonjungtiva: mataKonjungtiva,
      mataSklera: mataSklera,
      mataPupil: mataPupil,
      mataDiameterKanan: mataDiameterKanan,
      mataDiameterKiri: mataDiameterKiri,
      mataLainnya: mataLainnya,
      telinga: telinga,
      telingaLainnya: telingaLainnya,
      hidungDeformitas: hidungDeformitas,
      hidungEpistaksis: hidungEpistaksis,
      hidungDeviasiSeptum: hidungDeviasiSeptum,
      hidungLainnya: hidungLainnya,
      hidungLainLain: hidungLainLain,
      mulut: mulut,
      bibir: bibir,
      mulutKeterangan: mulutKeterangan,
      kepalaLainLain: kepalaLainLain,
      // leher
      leherKondisi: leherKondisi,
      leherJejas: leherJejas,
      leherVenaJagularis: leherVenaJagularis,
      leherKelenjarLimfe: leherKelenjarLimfe,
      leherLainnya: leherLainnya,
      // leherTiroid: leherTiroid,
      // thorax
      thoraxKondisi: thoraxKondisi,
      thoraxJejas: thoraxJejas,
      thoraxRetraksi: thoraxRetraksi,
      thoraxKrepitasi: thoraxKrepitasi,
      thoraxLainnya: thoraxLainnya,
      jantung: jantung,
      jantungIrama: jantungIrama,
      jantungBunyiMurmur: jantungBunyiMurmur,
      jantungBunyiGallop: jantungBunyiGallop,
      jantungBunyiLainlain: jantungBunyiLainlain,
      jantungLainLain: jantungLainLain,
      paru: paru,
      vesikulerKanan: vesikulerKanan,
      vesikulerKiri: vesikulerKiri,
      ronkhiKanan: ronkhiKanan,
      ronkhiKiri: ronkhiKiri,
      whezingKanan: whezingKanan,
      whezingKiri: whezingKiri,
      paruLainLain: paruLainLain,
      // abdomen
      abdomenKondisi: abdomenKondisi,
      abdomenJejas: abdomenJejas,
      abdomenPeristaltik: abdomenPeristaltik,
      abdomenHati: abdomenHati,
      abdomenLimpa: abdomenLimpa,
      abdomenNyeriTekan: abdomenNyeriTekan,
      hipokondriumKanan: abdhipokanan,
      epigastrium: abdepigastrium,
      hipokondriumKiri: abdhipokiri,
      lumbalKanan: abdlumbalkanan,
      umbilikus: abdumbilikus,
      lumbalKiri: abdlumbalkiri,
      iliakaKanan: abdiliakakanan,
      suprapubik: abdsuprapubik,
      iliakaKiri: abdiliakakiri,
      abdomenLainLain: abdomenLainLain,
      // urogenital
      urogenitalJejas: urogenitalJejas,
      urogenitalKelamin: urogenitalKelamin,
      urogenitalKeteranganKelamin: urogenitalKeteranganKelamin,
      urogenitalLainLain: urogenitalLainLain,
      // extremitas
      motorikKananAtas: motorikKananAtas,
      motorikKiriAtas: motorikKiriAtas,
      motorikKananBawah: motorikKananBawah,
      motorikKiriBawah: motorikKiriBawah,
      edemKananAtas: edemKananAtas,
      edemKiriAtas: edemKiriAtas,
      edemKananBawah: edemKananBawah,
      edemKiriBawah: edemKiriBawah,
      sianosis: sianosis,

      userid: user,
      ruangId: ruangId,
      dateEntry: dayjs(dateNow).format(),
      clientIP: ip,
      clientName: host,

      ekstremisSuperior: ekstremisSuperior,
      ekstremisInferior: ekstremisInferior,
      ekstremisSianosis: ekstremisSianosis,
      lokalisKeterangan: lokalisKeterangan,
      punggungVetebrata: punggungVetebrata,
      punggungGinjal: punggungGinjal,
      coxae: coxae,
      limponodi: limponodi,
      reflek: reflek,
      turgorKulit: turgorKulit,
      akral: akral,
      pelaksanaId: dokterPelaksanaId,
    };

    // get link Report Inform Consent
    const getReportInformConsent = (regid, noorder) => {
      // console.log('getReportInformConsent : ', regid, noorder);
      fetch(`${endpointReport}GetUrlDouble/InformCorcernHD/${noorder}/${regid}`)
        .then(res => res.json())
        .then(data => {
          data.statusCode === 200
            ? setuRLInformConsent(data.result)
            : setuRLInformConsent();
        })
        .catch(error => {
          setuRLInformConsent();
          message.error(
            `Error: Mengambil data Cetak Inform Consent HD, ${error}`,
            timeMessage
          );
        });
    };

    // intra hd
    const changeWaktuMulai = value => {
      setWaktuMulai(value);
      let durasia = durasi * 60;
      let waktua = dayjs(value).add(durasia, "minutes");
      setWaktuTarget(waktua);
    };
    const waktuTTVPostHd = () => {
      let durasia = durasi * 60;
      let waktua = dayjs(tanggal).add(durasia, "minutes");
      setTanggala(waktua);
    };
    const changeWaktuTarget = () => {
      let durasia = durasi * 60;
      let waktua = dayjs(waktuMulai).add(durasia, "minutes");
      setWaktuTarget(waktua);
      setWaktuSelesai(waktua);
      let durasib = durasi * 60 + 15;
      let waktub = dayjs(waktuMulai).add(durasib, "minutes");
      setTanggala(waktub);
    };
    const changeWaktuSelesai = value => {
      setWaktuSelesai(value);
      let durasia = 15;
      let waktua = dayjs(value).add(durasia, "minutes");
      setTanggala(waktua);
    };
    const changeKtv = value => {
      setKtv(value);
    };
    const changeKompIntradialisis = value => {
      setKompIntradialisis(value);
    };
    // monitoring dialisis
    const changeJamDd = value => {
      setJamDd(value);
    };
    const changeVp = value => {
      setVp(value);
    };
    const changeTmp = value => {
      setTmp(value);
    };
    const changeUfRate = value => {
      setUfRate(value);
    };
    const changeRemv = value => {
      setRemv(value);
    };
    const changeCatatan = value => {
      setCatatan(value.target.value);
    };

    // post hd
    const changeVolumeSisaPriming = value => {
      setVolumeSisaPriming(value);
    };
    const changeInTake = value => {
      setInTake(value);
    };
    const changeNaCl = value => {
      setNaCl(value);
    };
    const changeJenisDarah = value => {
      setJenisDarah(value);
    };
    const changeTransfusi = value => {
      setTransfusi(value);
    };
    const changeBilasAkhir = value => {
      setBilasAkhir(value);
    };
    const changePrwtAssId = value => {
      setPrwtAssId(value);
      // lookUpPerawatbySearch(value)
    };
    const changePrwtPrimerId = value => {
      setPrwtPrimerId(value);
    };
    const changeSubject = value => {
      setSubject(value.target.value);
    };
    // const changeObject = (value) => { setObject(value.target.value) };
    // const changeAssesment = (value) => { setAssesment(value.target.value) };
    // const changePlann = (value) => { setPlann(value.target.value) };
    // tanda vital 2
    const changeTandaVitalIda = value => {
      setTandaVitalIda(value);
    };
    const changeBba = value => {
      setBba(value);
    };
    const changeTekananDarahSistolika = value => {
      setTekananDarahSistolika(value);
    };
    const changeTekananDarahDiastolika = value => {
      setTekananDarahDiastolika(value);
    };
    const changeFrekuensiNadia = value => {
      setFrekuensiNadia(value);
    };
    const changeFrekuensiNafasa = value => {
      setFrekuensiNafasa(value);
    };
    const changeSuhuTubuha = value => {
      setSuhuTubuha(value);
    };

    // ===== ===== ===== FUNCTION ===== ===== =====

    const fetchData = useCallback(async ruang => {
      setLoading(true);
      // let tgltemp = dayjs().format("YYYY-MM-DD")
      // console.log('tgltemp : ', tgltemp);
      // console.log('datenow : ', dateNow);
      try {
        // const response = await fetch(`${endpoint}bysearcha/${tglList}/%20`)
        const response = await fetch(
          `${endpoint}bysearcha/${dayjs(tglList).format(
            "YYYY-MM-DD"
          )}/${ruang}/2/%20`
        );
        const hasil = await response.json();

        if (hasil) {
          setPasiens(current => {
            return {
              ...hasil,
              statuscode: hasil.statuscode,
              message: hasil.message,
              result: hasil.result,
            };
          });
        } else {
          setPasien([]);
        }

        if (hasil.result.length === 0) {
          message.info("Tidak ada pasien.", timeMessage);
        }

        if (hasil.statuscode !== 200) {
          throw new Error("error");
        }
      } catch (error) {
        setLoading(false);
        setError(true);
      }
      setLoading(false);
    });

    const onSearch = value => {
      setLoading(true);
      if (value) {
        fetch(`${endpoint}bysearcha/%20/${ruangId}/2/${value}`)
          .then(res => res.json())
          .then(data => {
            // console.log("data: ", data.result.length);
            if (data.result.length !== 0) {
              setPasiens(current => {
                return {
                  ...data,
                  statuscode: data.statuscode,
                  message: data.message,
                  result: data.result,
                };
              });
            } else {
              message.info("Data tidak ditemukan!", timeMessage);
            }
            setLoading(false);
          })
          .catch(error => {
            setLoading(false);
            message.error(`Error: Search Pasien!, ${error}`, timeMessage);
          });
      } else {
        fetchData(ruangId);
      }
    };

    useEffect(() => {
      // settingan info update otomatis
      const updateDate = "2025-05-14";
      const today = dayjs();
      // const today = dayjs('2024-09-06');
      const daysDifference = today.diff(dayjs(updateDate), "day");

      if (daysDifference < 30) {
        setmdInfoUpdate(true);
      }
    }, []);

    // get List Pasien
    useEffect(() => {
      fetchData(ruangId);
      getTandagejalaSubAskep();
      // console.log('ipPenunjang : ', ipEndpoint);
    }, [tglList, ruangId]);

    // get data pasien
    // useEffect(() => {
    //     if (noOrder) {
    //         getDataPasien(noOrder)
    //     }
    // }, [noOrder])

    const setDefaultAll = () => {
      setTanggal(dayjs());
      setDisabledTglPendHd(false);
      setTabAktif("1");
      setTabAktifa("1");
      setBtnKeluhan(true);
      setBtnIntMedik(false);
      setBtnIntraHd(false);
      setBtnPostHd(false);
      setDisabledWaktuSelesai(false);

      setDokterIdIc("");
      setJenisPenerima("");
      setHandleJenisPenerima(false);
      setNamaKeluarga("");
      setTglLahirKeluarga(dateNow);
      setUmurKeluarga("");
      setAlamatKeluarga("");
      setPerawatPendampingId("");
      setInfo1(false);
      setInfo2(false);
      setInfo3(false);
      setInfo4(false);
      setInfo5(false);
      setInfo6(false);
      setInfo7(false);
      setInfo8(false);
      setInfo9(false);
      setInfo10(false);
      setInfo11(false);
      setKetInfo11("");
      setTtdPasien("");
      setTtdKeluargaPasien("");

      // pend hd
      setHdKe(1);
      setRiwAllObat(true);
      setKetRiwAllObat("");
      setVerifHd(false);
      setDisabledVerifHd(true);
      setMesinNo(1);
      setDialsiser("Baru");
      setTextButton("Simpan");
      // keluhan
      // setKelUtama("")
      // setDialisisKeluhan([])
      // setP("")
      // setQ("")
      // setR("")
      // setS("")
      // setT("")
      // pem fisik
      // setKeadaanUmum("")
      setBbKering(0);
      setBbPostHdSebelumnya(0);
      setKonjungtiva(false);
      setEkstremitas("");
      setAksesVaskulerId("");
      setPemPenunjang("");
      // setStatusNutrisi("")
      setUrr(0);
      setKtv3(0);
      // tanda vital 1
      // setSkorNyeri(0)
      // setBb(0)
      // setTekananDarahSistolik(0)
      // setTekananDarahDiastolik(0)
      // setFrekuensiNadi(0)
      // setFrekuensiNafas(0)
      // setSuhuTubuh(0)

      // int medik
      setJenisKasus("1");
      setMode("1");
      setDialisat("1");
      setDurasi(0);
      setQb(100);
      setQb1(100);
      setQd(300);
      setUfGoal(0);
      setConductivity(0);
      setSuhu(0);
      setNa(0);
      setNaContentrat(0);
      setUf1(0);
      setUf2(0);
      setUf3(0);
      setUf4(0);
      setUf5(0);
      setHeparinasi(true);
      setDosisSirkulasi(0);
      setDmContinue(0);
      setDmIntermiten(0);
      setDosisAwal(0);
      setPenyebabNonHeparinasi("");
      setPemeriksaanFisik("");
      setTerapiHd("");
      setDokterPelaksanaId("");

      // intra hd
      setWaktuMulai(dayjs());
      setWaktuTarget(dayjs());
      setWaktuSelesai(dayjs());
      setKtv("");
      setDialisisDetail([]);
      // monitoring hd
      setJamDd(dayjs());
      setMQb(0);
      setVp(0);
      setTmp(0);
      setUfRate(0);
      setRemv(0);
      setCatatan("");

      // post hd
      setVolumeSisaPriming(0);
      setInTake(0);
      setNaCl(0);
      setJenisDarah("");
      setTransfusi(0);
      setBilasAkhir(0);
      setPrwtAssId("");
      setPrwtPrimerId("");
      setKompIntradialisis([]);
      setSubject("");
      // === tambahan ===
      setinfeksius("");
      setketInfeksius("");
      // setObject("")
      // setAssesment("")
      // setPlann("")
      setTotal(0);
      // tanda vital 2
      setTandaVitalIda(0);
      setBba(0);
      setTekananDarahSistolika(0);
      setTekananDarahDiastolika(0);
      setFrekuensiNadia(0);
      setFrekuensiNafasa(0);
      setSuhuTubuha(0);
      waktuTTVPostHd();
      setUserEntry("");
    };

    const setDefaultMonitoring = () => {
      // monitoring hd
      setJamDd(dayjs(waktuMulai));
      setMQb(0);
      setVp(0);
      setTmp(0);
      setUfRate(0);
      setRemv(0);
      setCatatan("");
    };

    const getDataPasien = nomorOrder => {
      setDefaultAll();
      setLoadingContent(true);
      setNoOrder(nomorOrder);
      fetch(`${endpoint}bynoorder/${nomorOrder}`)
        .then(res => res.json())
        .then(data => {
          // console.log("getDataPasien-bynoOrder");
          if (data.statusCode === 200) {
            // console.log("getDataPasien run! ", data.result);

            setPasien(() => {
              return {
                ...data,
                statuscode: data.statuscode,
                message: data.message,
                result: data.result,
              };
            });

            // belum daftar
            if (!data.result.dialisisHeaderId) {
              // console.log("getDataPasien-belumDaftar");

              fetch(
                `${endpoint}prevhistory/${data.result.pasienId}/${dayjs(
                  new Date()
                ).format(dateFormata)}`
              )
                .then(res => res.json())
                .then(dataa => {
                  // console.log(dataa.result);
                  if (dataa.result === "Belum punya riwayat HD sebelumnya") {
                    if (data.result.dialisiske) {
                      setHdKe(data.result.dialisiske);
                    }
                    message.warning("Belum punya RME HD sebelumnya");
                  } else {
                    setHdKe(dataa.result.dialisiske + 1);
                    setRiwAllObat(dataa.result.riwAllObat);
                    setKetRiwAllObat(dataa.result.riwAllObatKet);
                    // setVerifHd(dataa.result.verifHd);
                    setMesinNo(dataa.result.noMesin ? dataa.result.noMesin : 1);
                    setDialsiser(dataa.result.dialsiser);
                    setBbKering(dataa.result.bbKering);
                    setBbPostHdSebelumnya(dataa.result.beratBadan);
                    setUrr(dataa.result.urr);
                    setKtv3(dataa.result.ktv);
                    message.success("Ada RME HD");
                  }
                  setLoadingContent(false);
                })
                .catch(error => {
                  setLoadingContent(false);
                  message.error(`Error: Get Prev History!, ${error}`);
                });

              getNyeriByRegDate(
                data.result.registrasiId,
                dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
              );
              getResikoJatuhByRegDate(
                data.result.registrasiId,
                dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
              );
              getTTVAssByRuang(
                data.result.registrasiId,
                ruangId,
                dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
              );
              getNutrisiAssByRuang(
                data.result.registrasiId,
                ruangId,
                dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
              );
              getAssementAssByRuang(
                data.result.registrasiId,
                ruangId,
                dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
              );
              getEwsAssByRuang(
                data.result.registrasiId,
                dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
              );
              setDefAssesmentDetailTG([]);
              // getAssesmentDetailTG(data.result.registrasiId, '9406', dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm"));
            }
            // sudah daftar
            else {
              // console.log("getDataPasien-sudahDaftar");
              message.info("Pasien sudah terdaftar.");

              // get prev history
              fetch(
                `${endpoint}prevhistory/${data.result.pasienId}/${dayjs(
                  data.result.tanggal
                ).format(dateFormata)}`
              )
                .then(res => res.json())
                .then(dataa => {
                  // console.log("getDataPasien-prevHistory-sudahDaftar");
                  if (dataa.result === "Belum punya riwayat HD sebelumnya") {
                    message.warning("Belum punya RME HD sebelumnya");
                  } else {
                    !data.result.bbKering
                      ? setBbKering(dataa.result.bbKering)
                      : setBbKering(data.result.bbKering);
                    setBbPostHdSebelumnya(dataa.result.beratBadan);
                    message.success("Ada RME HD");
                  }
                })
                .catch(error => {
                  message.error(`Error: Get Inform Consent!, ${error}`);
                });

              setTimeout(
                getTTVAssByRuang(
                  data.result.registrasiId,
                  ruangId,
                  dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
                ),
                500
              );
              setTimeout(
                getNyeriByRegDate(
                  data.result.registrasiId,
                  dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
                ),
                750
              );
              setTimeout(
                getResikoJatuhByRegDate(
                  data.result.registrasiId,
                  dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
                ),
                1000
              );
              setTimeout(
                getNutrisiAssByRuang(
                  data.result.registrasiId,
                  ruangId,
                  dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
                ),
                1250
              );
              setTimeout(
                getAssementAssByRuang(
                  data.result.registrasiId,
                  ruangId,
                  dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
                ),
                1500
              );
              setTimeout(
                getEwsAssByRuang(
                  data.result.registrasiId,
                  dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
                ),
                1750
              );
              setTimeout(
                getAssesmentDetailTG(
                  data.result.registrasiId,
                  ruangId,
                  dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm")
                ),
                2000
              );

              // console.log("getDataPasien-mulaiSetSudahDaftar");
              // let tempDialKel = [];
              // let tempDialKelReport = [];
              // if (data.result.dialisisKeluhan) {
              //     data.result.dialisisKeluhan.map((dialKel, index) => (
              //         tempDialKel.push(dialKel.keluhanId),
              //         index === data.result.dialisisKeluhan.length - 1 ? tempDialKelReport.push(dialKel.deskripsi) : tempDialKelReport.push(dialKel.deskripsi + ", ")
              //     ));
              //     setDialisisKeluhan(tempDialKel)
              //     setDialisisKeluhanReport(tempDialKelReport)
              // }

              // console.log("getDataPasien-mulaiSetSudahDaftar 1");

              // tanda vital 1
              // if (data.result.tandaVital.length === 1) {
              //     setTandaVitalId(data.result.tandaVital[0].tandaVitalId)
              //     setResikoJatuh(data.result.tandaVital[0].resikoJatuh)
              //     setSkorNyeri(data.result.tandaVital[0].skorNyeri)
              //     setBb(data.result.tandaVital[0].beratBadan)
              //     setTekananDarahSistolik(data.result.tandaVital[0].tekananDarahSistolik)
              //     setTekananDarahDiastolik(data.result.tandaVital[0].tekananDarahDiastolik)
              //     setFrekuensiNadi(data.result.tandaVital[0].frekuensiNadi)
              //     setFrekuensiNafas(data.result.tandaVital[0].frekuensiNafas)
              //     setSuhuTubuh(data.result.tandaVital[0].suhuTubuh)
              // }
              // tanda vital 2
              // else
              if (data.result.tandaVital.length > 1) {
                console.log("ttv hd : ", data.result.tandaVital);
                // setTandaVitalId(data.result.tandaVital[0].tandaVitalId)
                // setResikoJatuh(data.result.tandaVital[0].resikoJatuh)
                // setSkorNyeri(data.result.tandaVital[0].skorNyeri)
                // setBb(data.result.tandaVital[0].beratBadan)
                // setTekananDarahSistolik(data.result.tandaVital[0].tekananDarahSistolik)
                // setTekananDarahDiastolik(data.result.tandaVital[0].tekananDarahDiastolik)
                // setFrekuensiNadi(data.result.tandaVital[0].frekuensiNadi)
                // setFrekuensiNafas(data.result.tandaVital[0].frekuensiNafas)
                // setSuhuTubuh(data.result.tandaVital[0].suhuTubuh)
                let lastArray = data.result.tandaVital.length - 1;

                setTandaVitalIda(
                  data.result.tandaVital[lastArray].tandaVitalId
                );
                setBba(data.result.tandaVital[lastArray].beratBadan);
                setTekananDarahSistolika(
                  data.result.tandaVital[lastArray].tekananDarahSistolik
                );
                setTekananDarahDiastolika(
                  data.result.tandaVital[lastArray].tekananDarahDiastolik
                );
                setFrekuensiNadia(
                  data.result.tandaVital[lastArray].frekuensiNadi
                );
                setFrekuensiNafasa(
                  data.result.tandaVital[lastArray].frekuensiNafas
                );
                setSuhuTubuha(data.result.tandaVital[lastArray].suhuTubuh);
                setTanggala(dayjs(data.result.tandaVital[lastArray].jam));
              }

              // console.log("getDataPasien-mulaiSetSudahDaftar 2");

              setDialisisHeaderId(data.result.dialisisHeaderId);

              // enable button
              if (data.result.dialisisHeaderId) {
                setBtnKeluhan(false);
              }
              // if (data.result.kelUtama) { setBtnIntMedik(false) }
              // if (data.result.jenisKasus) { setBtnIntraHd(false) }
              // if (data.result.waktuMulai !== "0001-01-01T00:00:00") { setBtnPostHd(false) }

              // pend hd
              setTanggal(dayjs(data.result.tanggal));
              setDisabledTglPendHd(true);
              setHdKe(data.result.dialisiske);
              setRiwAllObat(data.result.riwAllObat);
              setKetRiwAllObat(data.result.riwAllObatKet);
              setVerifHd(data.result.verifHd);
              setMesinNo(data.result.noMesin ? data.result.noMesin : 1);
              setDialsiser(data.result.dialsiser);
              setTextButton("Ubah");

              // keluhan
              // setKelUtama(data.result.kelUtama);
              // setP(data.result.p);
              // setQ(data.result.q);
              // setR(data.result.r);
              // setS(data.result.s);
              // setT(data.result.t);

              // pemeriksaan fisik
              // setKeadaanUmum(data.result.keadaanUmum);
              setBbKering(data.result.bbKering);
              setKonjungtiva(data.result.konjungtiva);
              setEkstremitas(
                data.result.ekstremitas ? data.result.ekstremitas : "NORMAL"
              );
              setAksesVaskulerId(data.result.aksesVaskulerId);
              setPemPenunjang(data.result.pemPenunjang);
              // setStatusNutrisi(data.result.statusNutrisi)
              setUrr(data.result.urr);
              setKtv3(data.result.ktv3);

              if (data.result.urr > 64 || data.result.ktv3 > 1.1) {
                setKesimpulanadekuat("Adekuat");
                setColorKesAde("green");
              } else {
                setKesimpulanadekuat("Tidak Adekuat");
                setColorKesAde("red");
              }

              // console.log("getDataPasien-mulaiSetSudahDaftar 3");

              // int medik
              setJenisKasus(
                !data.result.jenisKasus ? "1" : data.result.jenisKasus
              );
              setMode(!data.result.mode ? "1" : data.result.mode);
              if (data.result.dialisat) {
                setDialisat(data.result.dialisat);
              }
              setDurasi(data.result.durasi);
              setQb(data.result.qb);
              setQb1(data.result.qb1);
              setQd(!data.result.qd ? 300 : data.result.qd);
              setUfGoal(data.result.ufGoal);
              setConductivity(data.result.conductivity);
              setSuhu(data.result.suhu);
              setNa(data.result.na);
              setNaContentrat(data.result.naContentrat);
              setUf1(data.result.uf1);
              setUf2(data.result.uf2);
              setUf3(data.result.uf3);
              setUf4(data.result.uf4);
              setUf5(data.result.uf5);
              setHeparinasi(data.result.heparinasi);
              setShowHeparisani(data.result.heparinasi);
              setDosisSirkulasi(data.result.dosisSirkulasi);
              setDmContinue(data.result.dmContinue);
              setDmIntermiten(data.result.dmIntermiten);
              setDosisAwal(data.result.dosisAwal);
              setPenyebabNonHeparinasi(data.result.penyebabNonHeparinasi);
              setPemeriksaanFisik(data.result.pemeriksaanFisik);
              setTerapiHd(data.result.terapiHd);
              setDokterPelaksanaId(data.result.dokterPelaksanaId);

              // console.log("getDataPasien-mulaiSetSudahDaftar 4");
              // intra hd
              if (data.result.waktuMulai === "0001-01-01T00:00:00") {
                // console.log("waktuMulai: ", data.result.waktuMulai);
                let durasib = 30;
                let waktub = dayjs(data.result.tanggal).add(durasib, "minutes");
                setWaktuMulai(waktub);
                let durasia = data.result.durasi * 60;
                let waktua = dayjs(waktub).add(durasia, "minutes");
                setWaktuTarget(waktua);
                setWaktuSelesai(waktua);
                setJamDd(waktub);
              } else {
                setDisabledWaktuSelesai(true);
                setWaktuMulai(dayjs(data.result.waktuMulai));
                setWaktuTarget(dayjs(data.result.waktuTarget));
                setWaktuSelesai(dayjs(data.result.waktuSelesai));
                setJamDd(dayjs(data.result.waktuMulai));
              }
              setKtv(data.result.ktv);

              let tempKompIntra = [];
              let tempKompIntraReport = [];
              if (data.result.kompIntradialisis) {
                data.result.kompIntradialisis.map(
                  (kompIntra, index) => (
                    tempKompIntra.push(kompIntra.komplikasiIntraId),
                    index === data.result.kompIntradialisis.length - 1
                      ? tempKompIntraReport.push(kompIntra.deskripsi)
                      : tempKompIntraReport.push(kompIntra.deskripsi + ", ")
                  )
                );
                setKompIntradialisis(tempKompIntra);
                setKompIntradialisisReport(tempKompIntraReport);
              }

              if (data.result.dialisisDetail) {
                setDialisisDetail(data.result.dialisisDetail);
              }

              // console.log("getDataPasien-mulaiSetSudahDaftar 5");

              // post hd
              setVolumeSisaPriming(data.result.volumeSisaPriming);
              setInTake(data.result.inTake);
              setNaCl(data.result.naCl);
              setJenisDarah(data.result.jenisDarah);
              setTransfusi(data.result.transfusi);
              setBilasAkhir(data.result.bilasAkhir);
              // === tambahan ===
              setinfeksius(data.result.infeksius);
              setketInfeksius(data.result.keteranganInfeksius);
              // === === === === ===
              setPrwtAssId(data.result.prwtAssId);
              setPrwtPrimerId(data.result.prwtPrimerId);
              setSubject(data.result.subject);
              setDisabledWaktuSelesai(data.result.layanan);
              setUserEntry(data.result.userId);
              // setObject(data.result.object)
              // setAssesment(data.result.assesment)
              // setPlann(data.result.plann)

              // console.log("getDataPasien-finishSetSudahDaftar");
              setLoadingContent(false);
            }
          }
        })
        .catch(error => {
          setLoadingContent(false);
          message.error(`Error: getDataPasien!, ${error}`);
        });
    };

    // get inform consent
    const getInformConsent = () => {
      setLoadingInformConsent(true);
      fetch(`${endpoint}getinformedconsent/${noOrder}`)
        .then(res => res.json())
        .then(data => {
          // console.log("inform consent: ", data.result);
          if (data.statusCode === 200) {
            setDokterIdIc(data.result.dokterId);
            setttdDokterIdIc(data.result.ttdDokter);
            setJenisPenerima(data.result.jnsPenerima);
            data.result.jnsPenerima === "1"
              ? setHandleJenisPenerima(true)
              : setHandleJenisPenerima(false);
            setNamaKeluarga(data.result.namaKeluarga);
            setTglLahirKeluarga(data.result.tglLahirKeluarga);
            setUmurKeluarga(displayAge(data.result.tglLahirKeluarga, dayjs()));
            setAlamatKeluarga(data.result.alamatKeluarga);
            setPerawatPendampingId(data.result.perawatId);
            setttdPerawatPendampingId(data.result.ttdPerawat);
            setInfo1(data.result.info1);
            setInfo2(data.result.info2);
            setInfo3(data.result.info3);
            setInfo4(data.result.info4);
            setInfo5(data.result.info5);
            setInfo6(data.result.info6);
            setInfo7(data.result.info7);
            setInfo8(data.result.info8);
            setInfo9(data.result.info9);
            setInfo10(data.result.info10);
            setInfo11(data.result.info11);
            setKetInfo11(data.result.ketInfo11);
            setTtdPasien(data.result.ttdPasien);
            setTtdKeluargaPasien(data.result.ttdKeluarga);
            setjamIC(dayjs(tanggal).format("HH:mm"));
            setUserIC(data.result.userId ? data.result.userId : "");
            setDisabledVerifHd(false);
            setLoadingInformConsent(false);
          }
          setLoadingInformConsent(false);
        })
        .catch(error => {
          setLoadingInformConsent(false);
          message.error(`Error: Get Inform Consent!, ${error}`, timeMessage);
        });
    };

    // get mst
    useEffect(() => {
      lookUpDokter();
      lookUpAksesVaskuler();
      lookUpPerawat();
      lookUpDialKel();
    }, []);

    // get mst perawat
    const lookUpPerawat = () => {
      fetch(`${endpointmst}MstDokterSpesialisDetail/LookupPerawat/%20`)
        .then(res => res.json())
        .then(data => {
          // console.log(data.result);
          {
            data.statusCode === 200
              ? setOptPerawat(data.result)
              : setOptPerawat([]);
          }
        })
        .catch(error => {
          setOptPerawat([]);
          message.error(
            `Error: Option Pemeriksaan Penunjang!, ${error}`,
            timeMessage
          );
        });
    };

    // get mst akses vaskuler
    const lookUpAksesVaskuler = () => {
      // get mst akses vaskuler
      fetch(`${endpointmst}MstDialisisAksesVaskuler`)
        .then(res => res.json())
        .then(data => {
          // console.log(data.result);
          data.statusCode === 200
            ? setOptAksesVaskuler(data.result)
            : setOptAksesVaskuler([]);
        })
        .catch(error => {
          setOptAksesVaskuler([]);
          message.error(`Error: Option Akses Vaskuler!, ${error}`, timeMessage);
        });
    };

    // get mst dokter
    const lookUpDokter = () => {
      fetch(`${endpoint}dokByKode/006`)
        .then(res => res.json())
        .then(data => {
          // console.log(data.result);
          data.statusCode === 200 ? setDpjp(data.result) : setDpjp([]);
        })
        .catch(error => {
          setDpjp([]);
          message.error(
            `Error: Option Pemeriksaan Penunjang!, ${error}`,
            timeMessage
          );
        });
    };

    // get mst dialKel
    const lookUpDialKel = () => {
      fetch(`${endpointmst}MstDialisisKompIntra`)
        .then(res => res.json())
        .then(data => {
          data.statusCode === 200
            ? setOptDialisisKompIntra(data.result)
            : setOptDialisisKompIntra([]);
        })
        .catch(error => {
          setOptDialisisKompIntra([]);
          message.error(
            `Error: Option Pemeriksaan Penunjang!, ${error}`,
            timeMessage
          );
        });
    };

    const onClickLoadMst = () => {
      lookUpDokter();
      lookUpAksesVaskuler();
      lookUpPerawat();
      lookUpDialKel();
    };

    // klik informed consent
    const klikInformedConsent = () => {
      setSpinInform(true);
      let sendInformedConsent = [];
      sendInformedConsent.push({
        noOrder: noOrder,
        registrasiId: pasien.result.registrasiId,
        dokterId: dokterIdIc,
        jnsPenerima: jenisPenerima.toString(),
        namaKeluarga: namaKeluarga,
        tglLahirKeluarga:
          jenisPenerima === "1" ? null : dayjs(tglLahirKeluarga).format(),
        alamatKeluarga: jenisPenerima === "1" ? null : alamatKeluarga,
        perawatId: perawatPendampingId,
        info1: info1,
        info2: info2,
        info3: info3,
        info4: info4,
        info5: info5,
        info6: info6,
        info7: info7,
        info8: info8,
        info9: info9,
        info10: info10,
        info11: info11,
        ketInfo11: ketInfo11,
        ttdPasien: ttdPasien,
        ttdKeluarga: ttdKeluargaPasien,
        userId: user,
        clientHost: host,
        clientIp: ip,
      });
      // console.log("sendInformedConsent: ", sendInformedConsent[0]);

      fetch(`${endpoint}insertinformconsenthd`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendInformedConsent[0]),
      })
        .then(res => res.json())
        .then(result => {
          // console.log("result: ", result);
          if (result.statusCode === 200) {
            setDisabledVerifHd(false);
            setVerifHd(true);
            setSpinInform(false);
            Modal.success({
              title: "Sukses",
              content: "Inform Consent Berhasil disimpan.",
            });
            // console.log("result: ", result);
          } else {
            setSpinInform(false);
            // message.warning(`Error : ${result.result}`, timeMessage)
            Modal.warning({
              title: "Gagal!",
              content: `Inform Consent Gagal Disimpan! -> ${result.result}`,
            });
          }
        })
        .catch(error => {
          setSpinInform(false);
          // console.log("error: ", error);
          Modal.error({
            title: "ERROR!",
            content: `Simpan Inform Consent HD ERROR! -> ${error}`,
          });
        });
    };

    // klik pendaftaran
    const clickPendHd = () => {
      // setTimeout(() => {
      //     setVerifHd(true)
      // }, 5000);
      setSpinPendHD(true);
      // setVerifHd(false)
      let sendPendHd = [];
      sendPendHd.push({
        noOrder: noOrder,
        registrasiId: pasien.result.registrasiId,
        dialisisHeaderId: pasien.result.dialisisHeaderId,
        pasienId: pasien.result.pasienId,
        tanggal: dayjs(tanggal).format(),
        ruangId: pasien.result.ruangId,
        dialisiske: hdKe,
        alergiId: null,
        riwAllObat: riwAllObat,
        riwAllObatKet: ketRiwAllObat,
        verifHd: verifHd,
        noMesin: mesinNo,
        dialsiser: dialsiser,
        userId: user,
        clientHost: host,
        clientIp: ip,
      });

      // console.log('klik pend hd : ', sendPendHd[0]);

      fetch(`${endpoint}insertpasienhd`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendPendHd[0]),
      })
        .then(res => res.json())
        .then(result => {
          // console.log("result: ", result);
          if (result.statusCode === 200) {
            // fetchData()
            // console.log("result: ", result);
            setDialisisHeaderId(result.result.dialisisHeaderId);
            setDisabledTglPendHd(true);
            setBtnKeluhan(false);
            setSpinPendHD(false);
            Modal.success({
              title: "Sukses",
              content: "Berhasil Simpan Pendaftaran HD.",
              onOk: () => {
                fetchData(ruangId);
                getDataPasien(noOrder);
              },
            });
          } else {
            setSpinPendHD(false);
            // message.warning(`Error : ${result.result}`, timeMessage)
            Modal.warning({
              title: "Gagal!",
              content: `Pendaftaran HD Gagal Dirubah! -> ${result.result}`,
            });
          }
        })
        .catch(error => {
          // console.log("error: ", error);
          Modal.error({
            title: "ERROR!",
            content: `Pendaftaran HD ERROR! -> ${error}`,
          });
        });
    };

    // klik assesment
    const clickAssesment = () => {
      // let tandaVital = [];
      // tandaVital.push({
      //    // tandaVitalId: tandaVitalId,
      //     registrasiId: pasien.result.registrasiId,
      //     ruangId: "9406",
      //     skorNyeri: skorNyeri,
      //     beratBadan: bb,
      //     tekananDarahSistolik: tekananDarahSistolik,
      //     tekananDarahDiastolik: tekananDarahDiastolik,
      //     frekuensiNadi: frekuensiNadi,
      //     frekuensiNafas: frekuensiNafas,
      //     suhuTubuh: suhuTubuh,
      //     resikoJatuh: resikoJatuh,
      //     userId: user,
      //     clientHost: clientHost,
      //     clientIP: clientIP,
      // })

      // let listDialisisKeluhan = [];
      // if (dialisisKeluhan) {
      //     dialisisKeluhan.map((keluhan) => (
      //         listDialisisKeluhan.push
      //             ({
      //                 dialisisHeaderId: dialisisHeaderId,
      //                 registrasiId: pasien.result.registrasiId,
      //                 keluhanId: keluhan,
      //                 userId: "user",
      //                 clientHost: "komputer-Pc",
      //                 clientIP: "182.168.6.72"
      //             })
      //     ))
      // }
      if (!dialisisHeaderId) {
        Modal.warning({
          title: "Peringatan!",
          content: "DialisisHeaderId kosong! Klik OK untuk merefresh data.",
          onOk: () => {
            getDataPasien(noOrder);
          },
        });
      } else {
        let sendAssesmenta = [];
        sendAssesmenta.push({
          dialisisHeaderId: dialisisHeaderId,
          registrasiId: pasien.result.registrasiId,
          noOrder: noOrder,
          tanggal: dayjs(tanggal).format(),
          //kelUtama: kelUtama,
          // p: p,
          // q: q,
          // r: r,
          // s: s,
          // t: t,
          // keadaanUmum: keadaanUmum,
          bbKering: bbKering,
          konjungtiva: JSON.parse(konjungtiva),
          ekstremitas: ekstremitas,
          aksesVaskulerId: aksesVaskulerId,
          pemPenunjang: pemPenunjang,
          // statusNutrisi: statusNutrisi,
          urr: urr,
          ktv3: ktv3,
          // tandaVital: tandaVital,
          // dialisisKeluhan: listDialisisKeluhan,
          userId: user,
          clientHost: host,
          clientIp: ip,
        });

        // console.log("-> ", sendAssesmenta[0]);
        fetch(`${endpoint}insertassesment`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendAssesmenta[0]),
        })
          .then(res => res.json())
          .then(result => {
            // console.log("result: ", result);
            if (result.statusCode === 200) {
              setBtnIntMedik(false);
              // message.success(`Berhasil simpan.`, timeMessage)
              Modal.success({
                title: "Sukses",
                content: "Berhasil Simpan Assesment HD.",
                onOk: () => {
                  fetchData(ruangId);
                },
              });
            } else {
              // message.warning(`Error : ${result.result}`, timeMessage)
              Modal.warning({
                title: "Gagal!",
                content: `Gagal Simpan Assesment HD! -> ${result.result}`,
              });
            }
          })
          .catch(error => {
            console.log("error: ", error);
            Modal.error({
              title: "ERROR!",
              content: `Error Simpan Assesment HD! -> ${error}`,
            });
          });
      }
    };

    // Hasil Lab
    const getHasilLab = () => {
      fetch(`${endpoint}gethasillab/${pasien.result.registrasiId}`)
        .then(res => res.json())
        .then(data => {
          data.statusCode === 200 ? setHasilLab(data.result) : setHasilLab([]);
        })
        .catch(error => {
          setHasilLab([]);
          message.error(
            `Error: Option Pemeriksaan Penunjang!, ${error}`,
            timeMessage
          );
        });
    };

    // klik Int Medik
    const klikIntMedik = () => {
      if (!dialisisHeaderId) {
        Modal.warning({
          title: "Peringatan!",
          content: "DialisisHeaderId kosong! Klik OK untuk merefresh data.",
          onOk: () => {
            getDataPasien(noOrder);
          },
        });
      } else {
        setSpinIntMedik(true);
        let sendIntMedik = [];
        sendIntMedik.push({
          noOrder: noOrder,
          dialisisHeaderId: dialisisHeaderId,
          registrasiId: pasien.result.registrasiId,
          jenisKasus: jenisKasus,
          mode: mode, // new
          dialisat: dialisat,
          durasi: durasi,
          qb: qb,
          qb1: qb1, // new
          qd: qd,
          ufGoal: ufGoal,
          conductivity: conductivity,
          suhu: suhu,
          na: na,
          naContentrat: naContentrat,
          uf1: uf1,
          uf2: uf2,
          uf3: uf3,
          uf4: uf4,
          uf5: uf5,
          heparinasi: JSON.parse(heparinasi),
          dosisSirkulasi: dosisSirkulasi,
          dmContinue: dmContinue,
          dmIntermiten: dmIntermiten,
          dosisAwal: dosisAwal,
          penyebabNonHeparinasi: penyebabNonHeparinasi,
          // pemeriksaanFisik: pemeriksaanFisik,
          terapiHd: terapiHd,
          dokterPelaksanaId: dokterPelaksanaId,
          pemeriksaanFisik: user,
          // clientHost: host,
          // clientIp: ip
        });

        // console.log("sendIntMedik: ", sendIntMedik[0]);
        // console.log(datapemfisik);
        fetch(`${endpoint}insertintmedik`, {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sendIntMedik[0]),
        })
          .then(res => res.json())
          .then(result => {
            // console.log("result: ", result);
            if (result.statusCode === 200) {
              insertPemfisik(datapemfisik);
              setSpinIntMedik(false);
              // message.success(`Berhasil simpan.`)
              Modal.success({
                title: "Sukses",
                content: "Berhasil Simpan Preskripsi HD.",
                onOk: () => {
                  fetchData(ruangId);
                },
              });
            } else {
              setSpinIntMedik(false);
              // message.error('ERROR! Klik tombol REFRESH disebelah kanan atas!')
              Modal.warning({
                title: "Gagal!",
                content: `Gagal Simpan Preskripsi HD! -> ${result.result}`,
              });
            }
          })
          .catch(error => {
            setSpinIntMedik(false);
            console.log("error: ", error);
            Modal.error({
              title: "ERROR!",
              content: `Error Simpan Preskripsi HD! -> ${error}`,
            });
          });
      }
    };

    // klik monHD
    const klikMonHd = () => {
      if (dialisisDetail.length < 7 || tempIndex !== null) {
        if (tempIndex === null) {
          setDialisisDetail(current => [
            ...current,
            {
              dialisisHeaderId: dialisisHeaderId,
              jam: dayjs(jamDd).format(),
              qb: mQb,
              vp: vp,
              tmp: tmp,
              ufRate: ufRate,
              remv: remv,
              catatan: catatan,
              userId: user,
              clientHost: host,
              clientIP: ip,
            },
          ]);
        } else {
          let items = [...dialisisDetail];
          let item = { ...items[tempIndex] };

          item.jam = dayjs(jamDd).format();
          item.qb = mQb;
          item.vp = vp;
          item.tmp = tmp;
          item.ufRate = ufRate;
          item.remv = remv;
          item.catatan = catatan;
          item.userId = user;
          item.clientHost = host;
          item.clientIP = ip;

          items[tempIndex] = item;
          setDialisisDetail(items);
          setTempIndex(null);
        }

        // console.log("tempMonHd: ", dialisisDetail);
      } else {
        message.warning("Data sudah 7");
      }
      setDefaultMonitoring();
    };

    // klik editMonHd
    const klikEditMonHd = index => {
      let temp = dialisisDetail[index];
      // console.log(temp);
      // console.log(dayjs(temp.jam).format('HH:mm'));

      setTempIndex(index);
      setJamDd(dayjs(temp.jam));
      setMQb(temp.qb);
      setVp(temp.vp);
      setTmp(temp.tmp);
      setUfRate(temp.ufRate);
      setRemv(temp.remv);
      setCatatan(temp.catatan);
    };

    const klikDelMonHd = index => {
      setDialisisDetail(prevActions =>
        // Filter out the item with the matching index
        prevActions.filter((value, i) => i !== index)
      );
    };

    // klik intra hd
    const klikIntraHd = () => {
      setSpinIntHd(true);
      let sendIntraHd = [];
      sendIntraHd.push({
        dialisisHeaderId: dialisisHeaderId,
        registrasiId: pasien.result.registrasiId,
        noOrder: noOrder,
        waktuMulai: dayjs(waktuMulai).format(),
        waktuTarget: dayjs(waktuTarget).format(),
        waktuSelesai: dayjs(waktuSelesai).format(),
        ktv: ktv3,
        userId: user,
        clientHost: host,
        clientIp: ip,
        dialisisDetail: dialisisDetail,
        // kompIntradialisis: listKompIntradialisis
      });

      // console.log("sendIntraHd: ", sendIntraHd[0]);

      fetch(`${endpoint}insertintrahd`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sendIntraHd[0]),
      })
        .then(res => res.json())
        .then(result => {
          // console.log("result: ", result);
          if (result.statusCode === 200) {
            setSpinIntHd(false);
            // setDisabledWaktuSelesai(true)
            // message.success(`Berhasil simpan.`, timeMessage)
            Modal.success({
              title: "Sukses",
              content: "Berhasil Simpan Intra HD.",
              onOk: () => {
                fetchData(ruangId);
              },
            });
          } else {
            setSpinIntHd(false);
            // setDisabledWaktuSelesai(true)
            // message.error('ERROR! Klik tombol REFRESH disebelah kanan atas!')
            Modal.error({
              title: "Gagal!",
              content: `Gagal Simpan Intra HD! -> ${result.result}.`,
            });
          }
        })
        .catch(error => {
          console.log("error: ", error);
          setSpinIntHd(false);
          Modal.error({
            title: "ERROR!",
            content: `Error Simpan Intra HD! -> ${error}.`,
          });
        });
    };

    // klik post hd
    const klikPostHd = () => {
      if (!dialisisHeaderId) {
        Modal.warning({
          title: "Peringatan!",
          content: "DialisisHeaderId kosong! Klik OK untuk merefresh data.",
          onOk: () => {
            getDataPasien(noOrder);
          },
        });
      } else {
        setSpinPostHd(true);
        let tandaVital = [];
        tandaVital.push({
          tandaVitalId: tandaVitalIda,
          registrasiId: pasien.result.registrasiId,
          ruangId: ruangId,
          tanggal: tanggala,
          beratBadan: bba,
          jam: dayjs(tanggala).format(),
          tekananDarahSistolik: tekananDarahSistolika,
          tekananDarahDiastolik: tekananDarahDiastolika,
          frekuensiNadi: frekuensiNadia,
          frekuensiNafas: frekuensiNafasa,
          suhuTubuh: suhuTubuha,
          userId: user,
          clientHost: host,
          clientIp: ip,
        });

        let listKompIntradialisis = [];
        if (kompIntradialisis) {
          kompIntradialisis.map(kompIntra =>
            listKompIntradialisis.push({
              dialisisHeaderId: dialisisHeaderId,
              komplikasiIntraId: kompIntra,
              userId: user,
              clientHost: host,
              clientIp: ip,
            })
          );

          let sendPostHd = [];
          sendPostHd.push({
            dialisisHeaderId: dialisisHeaderId,
            registrasiId: pasien.result.registrasiId,
            noOrder: noOrder,
            tanggal: dayjs(tanggal).format(),
            volumeSisaPriming: volumeSisaPriming,
            inTake: inTake,
            naCl: naCl,
            jenisDarah: jenisDarah,
            transfusi: transfusi,
            bilasAkhir: bilasAkhir,
            infeksius: infeksius,
            keteranganInfeksius: ketInfeksius,
            kompIntradialisis: listKompIntradialisis,
            subject: subject,
            // object: object,
            // assesment: assesment,
            // plann: plann,
            prwtAssId: prwtAssId,
            prwtPrimerId: prwtPrimerId,
            layanan: JSON.parse(true),
            hapus: JSON.parse(false),
            userId: user,
            clientHost: host,
            clientIp: ip,
            tandaVital: tandaVital,
          });

          console.log("Post Hd: ", sendPostHd[0]);
          fetch(`${endpoint}insertphd`, {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(sendPostHd[0]),
          })
            .then(res => res.json())
            .then(result => {
              // console.log("result: ", result);
              if (result.statusCode === 200) {
                if (result.result.tandaVital.length > 1) {
                  let lastArray = result.result.tandaVital.length - 1;

                  setTandaVitalIda(
                    result.result.tandaVital[lastArray].tandaVitalId
                  );
                }
                setDisabledWaktuSelesai(true);
                setSpinPostHd(false);
                // message.success(`Berhasil simpan.`, timeMessage)
                Modal.success({
                  title: "Sukses",
                  content: "Berhasil Simpan Post HD.",
                  onOk: () => {
                    fetchData(ruangId);
                  },
                });
              } else {
                setSpinPostHd(false);
                // message.error('ERROR! Klik tombol REFRESH disebelah kanan atas!')
                Modal.error({
                  title: "Gagal!",
                  content: `Gagal Simpan Post HD! -> ${result.result}.`,
                });
              }
            })
            .catch(error => {
              // console.log("error: ", error);
              setSpinPostHd(false);
              Modal.error({
                title: "ERROR!",
                content: `Error Simpan Post HD! -> ${error}.`,
              });
            });
        }
      }
    };

    // v2 - 09/01/2024
    const getRiwLabPK = sPasienId => {
      setLoading(true);
      axios
        .get(`${endpoint}GetRiwLabPK/${sPasienId}`, options)
        .then(response => {
          // console.log("GetRiwLabPK ", response.data);
          setLoading(false);
          if (response.data.statusCode === 200) {
            if (response.data.result.length === 0) {
              setdataRiwLabPK([]);
              Modal.info({
                title: "Informasi",
                content: "Tidak ada Riwayat Hasil Lab PK.",
              });
            } else {
              // console.log("getListOrder : ", response.data.result);
              setdataRiwLabPK(response.data.result);
            }
          } else {
            setdataRiwLabPK([]);
            Modal.error({
              title: "Gagal!",
              content: `Gagal melakukan proses ambil data Riwayat Hasil Lab PK!`,
            });
          }
        })
        .catch(err => {
          setLoading(false);
          setdataRiwLabPK([]);
          Modal.error({
            title: "Error!",
            content: `Error melakukan proses ambil data Riwayat Hasil Lab PK! -> ${err}`,
          });
        });
    };

    const getRiwTB = sPasienId => {
      setLoading(true);
      axios
        .get(`${endpoint}GetRiwTB/${sPasienId}`, options)
        .then(response => {
          console.log("getRiwTB ", response.data);
          setLoading(false);
          if (response.data.statusCode === 200) {
            if (response.data.result.length === 0) {
              setdataRiwTB([]);
              Modal.info({
                title: "Informasi",
                content: "Tidak ada Riwayat Tinggi Badan.",
              });
            } else {
              // console.log("getListOrder : ", response.data.result);
              setdataRiwTB(response.data.result);
            }
          } else {
            setdataRiwTB([]);
            Modal.error({
              title: "Gagal!",
              content: `Gagal melakukan proses ambil data Riwayat Tinggi Badan!`,
            });
          }
        })
        .catch(err => {
          setLoading(false);
          setdataRiwTB([]);
          Modal.error({
            title: "Error!",
            content: `Error melakukan proses ambil data Riwayat Hasil Lab PK! -> ${err}`,
          });
        });
    };

    const getPlanTerapi = sRegId => {
      setspPlanTerapi(true);
      axios
        .get(`${endpoint}GetPlanTerapi/${sRegId}`, options)
        .then(response => {
          console.log("getPlanTerapi ", response.data);
          setspPlanTerapi(false);
          if (response.data.statusCode === 200) {
            setdataPlanTerapi(response.data.result);
          } else {
            setdataPlanTerapi({});
          }
        })
        .catch(err => {
          setspPlanTerapi(false);
          setdataPlanTerapi({});
          Modal.error({
            title: "Error!",
            content: `Error melakukan proses ambil data Plan Terapi dari Klinik HD! -> ${err}`,
          });
        });
    };

    const getDataObat = (sNoReg, sRuangId) => {
      setspListObat(true);
      setlistOrderObat([]);
      setlistValidObat([]);
      if (sNoReg.length === 0) {
        Modal.warning({
          title: "Peringatan!",
          content: "No Registrasi tidak boleh kosong!",
        });
      } else if (sRuangId.length === 0) {
        Modal.warning({
          title: "Peringatan!",
          content: "RuangId tidak boleh kosong!",
        });
      } else {
        let endpoint1 = endpoint.replace("EmrDialisisHeader/", "");

        axios
          .get(
            `${endpoint1}EmrKemoterapi/GetDataResep/${sNoReg}/${sRuangId}`,
            options
          )
          .then(response => {
            setspListObat(false);
            console.log("getDataObat ", response.data);
            if (response.data.statusCode === 200) {
              if (response.data.result.length === 0) {
                Modal.info({
                  title: "Informasi",
                  content: "Tidak ada data Obat pasien tersebut.",
                });
              } else {
                setlistOrderObat(response.data.result.orderList);
                setlistValidObat(response.data.result.validList);
              }
            } else {
              Modal.error({
                title: "Gagal!",
                content: `Gagal melakukan proses ambil data Order/Validasi Obat! -> ${response.data.result}`,
              });
            }
          })
          .catch(err => {
            setspListObat(false);
            Modal.error({
              title: "ERROR!",
              content: `ERROR!, melakukan proses ambil data Order/Validasi Obat! -> ${err}`,
            });
          });
      }
    };

    // ========== ========== ========== ========== ==========

    // Dashboard monitoring satusehat HD
    const getListSatSatHD = async (sTgl, sUnitOrder, sUnitTujuan, env) => {
      setspDashSSHD(true);
      try {
        const response = await axios.get(
          `${endpointmst}EmrDialisisDashboard/GetListSatuSehatHD/${sTgl}/${sUnitOrder}/${sUnitTujuan}/${env}`,
          options
        );
        setspDashSSHD(false);
        // console.log("getListSatSatHD : ", response);

        if (response.data.code === "200") {
          let data = response.data.result;

          return data; // Kembalikan nilai data
        } else {
          return []; // Kembalikan array kosong jika response tidak sukses
        }
      } catch (err) {
        setspDashSSHD(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data! -> ${err}`,
        });
        return null; // Kembalikan null jika terjadi error
      }
    };

    const pasiensState = {
      // default
      endpoint,
      timeMessage,
      startDate,
      tabAktif,
      setTabAktif,
      tabAktifa,
      setTabAktifa,
      ruangId,
      setruangId,
      fetchData,

      // mst
      onClickLoadMst,

      // button disable
      btnKeluhan,
      btnDiagKep,
      btnIntMedik,
      btnIntraHd,
      btnPostHd,
      disabledVerifHd,
      setDisabledVerifHd,
      disabledWaktuSelesai,
      setDisabledWaktuSelesai,

      // loading
      isLoading,
      loadingContent,
      spinInform,
      setSpinInform,
      spinPendHD,
      setSpinPendHD,
      spinIntMedik,
      setSpinIntMedik,
      spinPostHd,
      setSpinPostHd,
      spinIntHd,
      setSpinIntHd,

      noOrder,
      setNoOrder,
      pasien,
      getDataPasien,

      // daftar pasien
      pasiens,
      tglList,
      setTglList,
      changeDate,
      onSearch,

      // informed consent
      dokterIdIc,
      ttdDokterIdIc,
      jenisPenerima,
      handleJenisPenerima,
      namaKeluarga,
      tglLahirKeluarga,
      umurKeluarga,
      umurKeluargaa,
      alamatKeluarga,
      perawatPendampingId,
      ttdPerawatPendampingId,
      info1,
      info2,
      info3,
      info4,
      info5,
      info6,
      info7,
      info8,
      info9,
      info10,
      info11,
      ketInfo11,
      jamIC,
      userIC,
      uRLInformConsent,
      setuRLInformConsent,
      setUserIC,
      namattd1,
      setnamattd1,
      ktgTtd,
      setktgTtd,
      // ttd
      ttdPasien,
      setTtdPasien,
      clear,
      save,
      ttdKeluargaPasien,
      setTtdKeluargaPasien,
      cleara,
      savea,
      sigCanvas,
      sigCanvasa,
      isLoadingInformConsent,
      changeDokterIdIc,
      changeJenisPenerima,
      changeNamaKeluarga,
      changeTglLahirKeluarga,
      changeAlamatKeluarga,
      changePerawatPendampingId,
      changeInfo1,
      changeInfo2,
      changeInfo3,
      changeInfo4,
      changeInfo5,
      changeInfo6,
      changeInfo7,
      changeInfo8,
      changeInfo9,
      changeInfo10,
      changeInfo11,
      changeKetInfo11,
      klikInformedConsent,
      getInformConsent,
      displayAge,
      getReportInformConsent,

      // pendaftaran hd
      dialisisHeaderId,
      setDialisisHeaderId,
      tanggal,
      setTanggal,
      disabledTglPendHd,
      setDisabledTglPendHd,
      changeDatePendHd,
      hdKe,
      setHdKe,
      changeHdKe,
      riwAllObat,
      setRiwAllObat,
      changeRiwAllObat,
      ketRiwAllObat,
      setKetRiwAllObat,
      changeKetRiwAllObat,
      verifHd,
      setVerifHd,
      changeVerifHd,
      mesinNo,
      changeMesinNo,
      setMesinNo,
      dialsiser,
      setDialsiser,
      changeDialsiser,
      textButton,
      clickPendHd,

      // Hasil lab
      hasilLab,
      getHasilLab,

      // keluhan
      // kelUtama,
      // changeKelUtama,
      // dialisisKeluhan,
      // dialisisKeluhanReport,
      // changeKelTambahan,
      // p,
      // changeP,
      // q,
      // changeQ,
      // r,
      // changeR,
      // s,
      // changeS,
      // t,
      // changeT,
      // assesment
      hanyaBaca,
      sethanyaBaca,
      dpjpRuangOrder,
      setdpjpRuangOrder,
      // pemeriksaan fisik
      // keadaanUmum,
      // changePemFisik,
      bbKering,
      setBbKering,
      changeBbKering,
      bbPostHdSebelumnya,
      konjungtiva,
      changeKonjungtiva,
      ekstremitas,
      changeEkstremitas,
      aksesVaskulerId,
      changeAksesVaskulerId,
      pemPenunjang,
      setPemPenunjang,
      changePemPenunjang,
      // statusNutrisi,
      // changeStatusNutrisi,
      urr,
      changeUrr,
      ktv3,
      setKtv3,
      changeKtv3,
      kesimpulanadekuat,
      setKesimpulanadekuat,
      colorKesAde,
      setColorKesAde,
      // tanda vital 1
      // skorNyeri,
      // changeSkorNyeri,
      // bb,
      // changeBb,
      // tekananDarahSistolik,
      // changeTekananDarahSistolik,
      // tekananDarahDiastolik,
      // changeTekananDarahDiastolik,
      // frekuensiNadi,
      // changeFrekuensiNadi,
      // frekuensiNafas,
      // changeFrekuensiNafas,
      // suhuTubuh,
      // changeSuhuTubuh,
      // resikoJatuh,
      // changeResikoJatuh,
      clickAssesment,

      // int medik
      jenisKasus,
      changeJenisKasus,
      mode,
      setMode,
      changeMode,
      dialisat,
      changeDialisat,
      durasi,
      changeDurasi,
      qb,
      setQb,
      changeQb,
      qb1,
      setQb1,
      changeQb1,
      qd,
      changeQd,
      ufGoal,
      changeUfGoal,
      conductivity,
      changeConductivity,
      suhu,
      changeSuhu,
      na,
      changeNa,
      naContentrat,
      changeNaContentrat,
      uf1,
      changeUf1,
      uf2,
      changeUf2,
      uf3,
      changeUf3,
      uf4,
      changeUf4,
      uf5,
      changeUf5,
      heparinasi,
      setHeparinasi,
      changeHeparinasi,
      dosisSirkulasi,
      changeDosisSirkulasi,
      dmContinue,
      changeDmContinue,
      dmIntermiten,
      changeDmIntermiten,
      dosisAwal,
      changeDosisAwal,
      penyebabNonHeparinasi,
      setPenyebabNonHeparinasi,
      changePenyebabNonHeparinasi,
      pemeriksaanFisik,
      setPemeriksaanFisik,
      terapiHd,
      setTerapiHd,
      changeTerapiHd,
      dokterPelaksanaId,
      changeDokterPelaksanaId,
      showHeparisani,
      klikIntMedik,

      // intra hd
      waktuMulai,
      changeWaktuMulai,
      waktuTarget,
      waktuSelesai,
      changeWaktuSelesai,
      changeWaktuTarget,
      ktv,
      changeKtv,
      dialisisDetail,
      kompIntradialisis,
      kompIntradialisisReport,
      changeKompIntradialisis,
      // monitoring hd
      jamDd,
      changeJamDd,
      mQb,
      setMQb,
      vp,
      changeVp,
      tmp,
      changeTmp,
      ufRate,
      changeUfRate,
      remv,
      changeRemv,
      catatan,
      changeCatatan,
      klikMonHd,
      klikEditMonHd,
      klikDelMonHd,
      klikIntraHd,

      // post hd
      volumeSisaPriming,
      changeVolumeSisaPriming,
      inTake,
      changeInTake,
      naCl,
      changeNaCl,
      jenisDarah,
      changeJenisDarah,
      transfusi,
      changeTransfusi,
      bilasAkhir,
      changeBilasAkhir,
      prwtAssId,
      changePrwtAssId,
      prwtPrimerId,
      changePrwtPrimerId,
      subject,
      setSubject,
      changeSubject,
      // === tambahan ===
      infeksius,
      setinfeksius,
      ketInfeksius,
      setketInfeksius,
      // object,
      // changeObject,
      // assesment,
      // changeAssesment,
      // plann,
      // changePlann,
      layanan,
      hapus,
      total,
      // tanda vital 2
      tandaVitalIda,
      changeTandaVitalIda,
      bba,
      changeBba,
      tekananDarahSistolika,
      changeTekananDarahSistolika,
      tekananDarahDiastolika,
      changeTekananDarahDiastolika,
      frekuensiNadia,
      changeFrekuensiNadia,
      frekuensiNafasa,
      changeFrekuensiNafasa,
      suhuTubuha,
      changeSuhuTubuha,
      tanggala,
      setTanggala,
      waktuTTVPostHd,
      klikPostHd,
      user,
      userEntry,
      setUserEntry,

      // v2 - 09/01/2024
      dataRiwLabPK,
      setdataRiwLabPK,
      dataRiwTB,
      setdataRiwTB,
      dataPlanTerapi,
      setdataPlanTerapi,
      listOrderObat,
      setlistOrderObat,
      listValidObat,
      setlistValidObat,
      spListObat,
      setspListObat,
      listTbDashSSHD,
      setlistTbDashSSHD,
      spPlanTerapi,
      setspPlanTerapi,
      spDashSSHD,
      setspDashSSHD,
      getPlanTerapi,
      getDataObat,

      // RiwLabPK
      getRiwLabPK,
      getRiwTB,
      getListSatSatHD,

      // modal
      mdInfoUpdate,
      setmdInfoUpdate,

      // opt mst
      // optKelTambahan,
      optAksesVaskuler,
      optPemPenunjang,
      optDpjp,
      optDialisisKompIntra,
      optPerawat,
    };

    return (
      <PasiensContext.Provider value={pasiensState}>
        {props.children}
      </PasiensContext.Provider>
    );
  };

  return {
    PasiensContext,
    PasiensProvider,
  };
}

export default HdContext();
