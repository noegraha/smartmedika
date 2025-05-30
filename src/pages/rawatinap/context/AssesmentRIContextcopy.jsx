import React, { createContext, useState, useContext, useEffect } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
// import { TTVRIContext } from './Context/TTVContextRI';
import { AskepContext } from "./AskepContext";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "./PasienRIContext";

export const AssesmentRIContext = createContext();

const AssesmentRIContextProvider = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser, sendTele } = useContext(LoginContext);
  const { curpasRI } = useContext(PasienRIContext);
  const [visibleCteakAssesment, setvisibleCteakAssesment] = useState(false);
  const [spinCetakAssesment, setspinCetakAssesment] = useState(false);
  const [spingetTTVAssByRuang, setspingetTTVAssByRuang] = useState(false);
  const { cekAssementTombol, setvaluecekAssesment } = useContext(AskepContext);
  const [dissabletgl, setdissabletgl] = useState(false);
  // const { getTTVAllBynoreg,
  //     getGravikTTV } = useContext(TandaVita);
  // const { getGrafikEWS, getEwsAll } = useContext(EwsRIContext);
  const [visibleNyeri, setvisibleNyeri] = useState(false);
  const [visibleJatuh, setvisibleJatuh] = useState(false);
  const [visibleNutrisi, setvisibleNutrisi] = useState(false);
  const [visibleEws, setvisibleEws] = useState(false);
  const [visibleMeows, setvisibleMeows] = useState(false);
  const [visibleSkorDown, setvisibleSkorDown] = useState(false);
  const [visibleLatch, setvisibleLatch] = useState(false);
  const [visibleBartelIndex, setvisibleBartelIndex] = useState(false);
  const [visibleAktivitasLatihan, setvisibleAktivitasLatihan] = useState(false);
  const [load, setLoad] = useState(false);

  const [cetakUserCetak, setcetakUserCetak] = useState("");
  const [cetakUserTtd, setcetakUserTtd] = useState("");
  const [cetakregistrasiId, setcetakregistrasiId] = useState("");
  const [cetakpasienId, setcetakpasienId] = useState("");
  const [cetaknama, setcetaknama] = useState("");
  const [cetaktanggal, setcetaktanggal] = useState("");
  const [cetaknamaRuang, setcetaknamaRuang] = useState("");
  const [cetakpegawaiId, setcetakpegawaiId] = useState("");
  const [cetakcaraMasuk, setcetakcaraMasuk] = useState("");
  const [cetakasalMasuk, setcetakasalMasuk] = useState("");
  const [cetakriwayatAlergi, setcetakriwayatAlergi] = useState("");
  const [cetakriwayat, setcetakriwayat] = useState("");
  const [cetakriwayatGenetik, setcetakriwayatGenetik] = useState("");
  const [cetakkeluhan, setcetakkeluhan] = useState([]);
  const [cetakskalaNyeri, setcetakskalaNyeri] = useState("");
  const [cetakresikoJatuh, setcetakresikoJatuh] = useState("");
  const [cetaknutrisi, setcetaknutrisi] = useState("");
  const [cetakpps, setcetakpps] = useState("");
  const [cetakews, setcetakews] = useState("");
  const [cetaklatchScore, setcetaklatchScore] = useState("");
  const [cetakscoreDown, setcetakscoreDown] = useState("");
  const [cetakmeows, setcetakmeows] = useState("");
  const [cetakassesmentDetail, setcetakassesmentDetail] = useState("");
  const [cetakassesmentDetailTG, setcetakassesmentDetailTG] = useState([]);
  const [cetakTTV, setcetakcetakTTV] = useState("");
  const [cetakTGrespirasi, setcetakTGrespirasi] = useState([]);
  const [cetakTGsirkulasi, setcetakTGsirkulasi] = useState([]);
  const [cetakTGnutrisi, setcetakTGnutrisi] = useState([]);
  const [cetakTGeliminasi, setcetakTGeliminasi] = useState([]);
  const [cetakTGaktifitasDanIstirahat, setcetakTGaktifitasDanIstirahat] =
    useState([]);
  const [cetakTGproteksiDanPerlindungan, setcetakTGproteksiDanPerlindungan] =
    useState([]);
  const [cetakTGsensoriPersepsi, setcetakTGsensoriPersepsi] = useState([]);
  const [cetakTGcairanDanElektrolit, setcetakTGcairanDanElektrolit] = useState(
    []
  );
  const [cetakTGfungsiNeurologis, setcetakTGfungsiNeurologis] = useState([]);
  const [cetakTGfungsiEndokrin, setcetakTGfungsiEndokrin] = useState([]);
  const [cetakTGkonsepDiriDanKognitif, setcetakTGkonsepDiriDanKognitif] =
    useState([]);
  const [cetakTGfungsiPeran, setcetakTGfungsiPeran] = useState([]);
  const [
    cetakTGpolaToleransiKopingStress,
    setcetakTGpolaToleransiKopingStress,
  ] = useState([]);
  const [cetakTGseksualReproduksi, setcetakTGseksualReproduksi] = useState([]);
  const [cetakTGpolaNilaiKepercayaan, setcetakTGpolaNilaiKepercayaan] =
    useState([]);

  const [tanggalKeluhan, settanggalKeluhan] = useState(dayjs());
  const [caraMasuk, setcaraMasuk] = useState("");
  const [asalMasuk, setasalMasuk] = useState("");
  const [riwayatAlergi, setriwayatAlergi] = useState("Tidak Ada");
  const [riwayat, setriwayat] = useState(null);
  const [riwayatGenetik, setriwayatGenetik] = useState("Tidak Ada");
  const [ppsId, setppsId] = useState("");
  const [nKeluhanNew, setnKeluhanNew] = useState([]);
  const [keluhanId, setkeluhanId] = useState([]);
  const [karakteristikId, setkarakteristikId] = useState([]);
  const [keluhanLain, setkeluhanLain] = useState(null);
  const [tablekeluhan, settablekeluhan] = useState([]);
  const [keluhan, setkeluhan] = useState([]);
  const [karakteristik, setkarakteristik] = useState([]);
  const [userAssesment, setuserAssesment] = useState("");

  const [ppsAmbulansi, setppsAmbulansi] = useState("");
  const [ppsAktivitas, setppsAktivitas] = useState("");
  const [ppsPerawatanDiri, setppsPerawatanDiri] = useState("");
  const [ppsAsupan, setppsAsupan] = useState("");
  const [ppsTingkatKesadaran, setppsTingkatKesadaran] = useState("");
  const [ppsKesimpulan, setppsKesimpulan] = useState("");

  const [tandaVitalId, setTandaVitalId] = useState(0);
  const [gcsMata, setgcsMata] = useState(4);
  const [gcsSuara, setgcsSuara] = useState(5);
  const [gcsGerakan, setgcsGerakan] = useState(6);
  const [tekananDarahSistolik, settekananDarahSistolik] = useState("");
  const [tekananDarahDiastolik, settekananDarahDiastolik] = useState("");
  const [suhuTubuh, setsuhuTubuh] = useState("");
  const [frekuensiNadi, setfrekuensiNadi] = useState("");
  const [frekuensiNafas, setfrekuensiNafas] = useState("");
  const [tglTTV, setTglTTV] = useState(dayjs());
  const [tingkatKesadaranId, settingkatKesadaranId] = useState("");
  const [tingkatKesadaran, settingkatKesadaran] = useState("");
  const [iramaNadi, setiramaNadi] = useState("");
  const [saturasiOksigen, setsaturasiOksigen] = useState("");
  const [tinggiBadan, settinggiBadan] = useState("");
  const [beratBadan, setberatBadan] = useState("");
  const [etermitas, setEtermitas] = useState("Hangat");

  const [assOksigen, setassOksigen] = useState("Tidak Ada Keluhan");
  const [tandaGejalaAssOksigen, settandaGejalaAssOksigen] = useState([]);

  const [assSirkulasi, setassSirkulasi] = useState("Tidak Ada Keluhan");
  const [tandaGejalaAssSirkulasi, settandaGejalaAssSirkulasi] = useState([]);

  const [assNutrisi, setassNutrisi] = useState("Tidak Ada Keluhan");
  const [tandaGejalaAssNutrisi, settandaGejalaAssNutrisi] = useState([]);

  const [assEliminasi, setassEliminasi] = useState("Tidak Ada Keluhan");
  const [tandaGejalaAssEliminasi, settandaGejalaAssEliminasi] = useState([]);

  const [assAktifitasIstirahat, setassAktifitasIstirahat] =
    useState("Tidak Ada Keluhan");
  const [
    tandaGejalaAssAktifitasIstirahat,
    settandaGejalaAssAktifitasIstirahat,
  ] = useState([]);

  const [assProteksiPerlindungan, setassProteksiPerlindungan] =
    useState("Tidak Ada Keluhan");
  const [
    tandaGejalaAssProteksiPerlindungan,
    settandaGejalaAssProteksiPerlindungan,
  ] = useState([]);

  const [assSensoriPersepsi, setassSensoriPersepsi] =
    useState("Tidak Ada Keluhan");
  const [tandaGejalaAssSensoriPersepsi, settandaGejalaAssSensoriPersepsi] =
    useState([]);

  const [assCairanElektrolit, setassCairanElektrolit] =
    useState("Tidak Ada Keluhan");
  const [tandaGejalaAssCairanElektrolit, settandaGejalaAssCairanElektrolit] =
    useState([]);

  const [assFungsiNeurologis, setassFungsiNeurologis] =
    useState("Tidak Ada Keluhan");
  const [tandaGejalaAssFungsiNeurologis, settandaGejalaAssFungsiNeurologis] =
    useState([]);

  const [assFungsiEndokrin, setassFungsiEndokrin] =
    useState("Tidak Ada Keluhan");
  const [tandaGejalaAssFungsiEndokrin, settandaGejalaAssFungsiEndokrin] =
    useState([]);

  const [assKonsepDiriKognitif, setassKonsepDiriKognitif] =
    useState("Tidak Ada Keluhan");
  const [
    tandaGejalaAssKonsepDiriKognitif,
    settandaGejalaAssKonsepDiriKognitif,
  ] = useState([]);

  const [assFungsiPeran, setassFungsiPeran] = useState("Tidak Ada Keluhan");
  const [tandaGejalaAssFungsiPeran, settandaGejalaAssFungsiPeran] = useState(
    []
  );

  const [assPolaToleransiKopingStrees, setassPolaToleransiKopingStrees] =
    useState("Tidak Ada Keluhan");
  const [
    tandaGejalaAssPolaToleransiKopingStrees,
    settandaGejalaAssPolaToleransiKopingStrees,
  ] = useState([]);

  const [assSeksualReproduksi, setassSeksualReproduksi] =
    useState("Tidak Ada Keluhan");
  const [tandaGejalaAssSeksualReproduksi, settandaGejalaAssSeksualReproduksi] =
    useState([]);

  const [assPolaKepercayaan, setassPolaKepercayaan] = useState("Teratur");
  const [tandaGejalaAssPolaKepercayaan, settandaGejalaAssPolaKepercayaan] =
    useState([]);

  const [assTdrespirasi, setAssTdrespirasi] = useState(null);
  const [assTdrr, setAssTdrr] = useState(null);
  const [assTdpemeriksaanRespirasi, setAssTdpemeriksaanRespirasi] =
    useState(null);
  const [assTdsirkulasi, setAssTdsirkulasi] = useState(null);
  const [assTdtekananDarahSistolik, setAssTdtekananDarahSistolik] =
    useState(null);
  const [assTdtekananDarahDiastolik, setAssTdtekananDarahDiastolik] =
    useState(null);
  const [assTdfrekuensiNadi, setAssTdfrekuensiNadi] = useState(null);
  const [assTdekstremitas, setAssTdekstremitas] = useState(null);
  const [assTdpemeriksaanSirkulasi, setAssTdpemeriksaanSirkulasi] =
    useState(null);
  const [assTdnutrisi, setAssTdnutrisi] = useState(null);
  const [assTdscoreNutrisi, setAssTdscoreNutrisi] = useState(null);
  const [assTdkesimpulanNutrisi, setAssTdkesimpulanNutrisi] = useState(null);
  const [assTdhasilPengkajian, setAssTdhasilPengkajian] = useState(null);
  const [assTdtinggiBadan, setAssTdtinggiBadan] = useState(null);
  const [assTdberatBadan, setAssTdberatBadan] = useState(null);
  const [assTdimt, setAssTdimt] = useState(null);
  const [assTdpemeriksaanNutrisi, setAssTdpemeriksaanNutrisi] = useState(null);
  const [assTdeliminasi, setAssTdeliminasi] = useState(null);
  const [assTdfrekuensiBab, setAssTdfrekuensiBab] = useState(null);
  const [assTdkonsistensiBab, setAssTdkonsistensiBab] = useState(null);
  const [assTdwarnaBab, setAssTdwarnaBab] = useState(null);
  const [assTdkeluhanBab, setAssTdkeluhanBab] = useState(null);
  const [assTdperistaltikUsus, setAssTdperistaltikUsus] = useState(null);
  const [assTdfrekuensiBak, setAssTdfrekuensiBak] = useState(null);
  const [assTdjumlahUrin, setAssTdjumlahUrin] = useState(null);
  const [assTdgangguanUrin, setAssTdgangguanUrin] = useState(null);
  const [assTdkateter, setAssTdkateter] = useState(null);
  const [assTdwarnaUrin, setAssTdwarnaUrin] = useState(null);
  const [assTdpemeriksaanEliminasi, setAssTdpemeriksaanEliminasi] =
    useState(null);
  const [assTdaktifitas, setAssTdaktifitas] = useState(null);
  const [assTdtidurMalam, setAssTdtidurMalam] = useState(null);
  const [assTdtidurSiang, setAssTdtidurSiang] = useState(null);
  const [assTdgangguanTidur, setAssTdgangguanTidur] = useState(null);
  const [assTdobatTidur, setAssTdobatTidur] = useState(null);
  const [assTdpemeriksaanAktifitas, setAssTdpemeriksaanAktifitas] =
    useState(null);
  const [assTdproteksi, setAssTdproteksi] = useState(null);
  const [assTdlukaKulit, setAssTdlukaKulit] = useState(null);
  const [assTdlokasiLuka, setAssTdlokasiLuka] = useState(null);
  const [assTdpenyebabLuka, setAssTdpenyebabLuka] = useState(null);
  const [assTdluasLuka, setAssTdluasLuka] = useState(null);
  const [assTdpemeriksaanProteksi, setAssTdpemeriksaanProteksi] =
    useState(null);
  const [assTdsensori, setAssTdsensori] = useState(null);
  const [assTdkesadaran, setAssTdkesadaran] = useState(null);
  const [assTdgcsMata, setAssTdgcsMata] = useState(null);
  const [assTdgcsSuara, setAssTdgcsSuara] = useState(null);
  const [assTdgcsGerakan, setAssTdgcsGerakan] = useState(null);
  const [assTdpendengaran, setAssTdpendengaran] = useState(null);
  const [assTdpenglihatan, setAssTdpenglihatan] = useState(null);
  const [assTdbicara, setAssTdbicara] = useState(null);
  const [assTdkebiasaanPeriksa, setAssTdkebiasaanPeriksa] = useState(null);
  const [assTdpersepsiSakit, setAssTdpersepsiSakit] = useState(null);
  const [assTdpemeriksaanSensori, setAssTdpemeriksaanSensori] = useState(null);
  const [assTdcairanElektrolit, setAssTdcairanElektrolit] = useState(null);
  const [assTdiwl, setAssTdiwl] = useState(null);
  const [assTdderajatEdema, setAssTdderajatEdema] = useState(null);
  const [
    assTdpemeriksaanCairanElektrolit,
    setAssTdpemeriksaanCairanElektrolit,
  ] = useState(null);
  const [assTdfungsiNeurologis, setAssTdfungsiNeurologis] = useState(null);
  const [assTdpemeriksaanNeurologis, setAssTdpemeriksaanNeurologis] =
    useState(null);
  const [assTdfungsiEndokrin, setAssTdfungsiEndokrin] = useState(null);
  const [assTdpemeriksaanEndokrin, setAssTdpemeriksaanEndokrin] =
    useState(null);
  const [assTdkonsepDiri, setAssTdkonsepDiri] = useState(null);
  const [assTdpengetahuanPenyakit, setAssTdpengetahuanPenyakit] =
    useState(null);
  const [assTdpengetahuanPerawatan, setAssTdpengetahuanPerawatan] =
    useState(null);
  const [assTdscoreKonsepDiri, setAssTdscoreKonsepDiri] = useState(null);
  const [assTdpemeriksaanKonsepDiri, setAssTdpemeriksaanKonsepDiri] =
    useState(null);
  const [assTdfungsiPeran, setAssTdfungsiPeran] = useState(null);
  const [assTdhubunganPeran, setAssTdhubunganPeran] = useState(null);
  const [assTdperanKeluarga, setAssTdperanKeluarga] = useState(null);
  const [assTdpemeriksaanFungsiPeran, setAssTdpemeriksaanFungsiPeran] =
    useState(null);
  const [assTdpolaToleransi, setAssTdpolaToleransi] = useState(null);
  const [assTdkoping, setAssTdkoping] = useState(null);
  const [assTdpenyelesaianMasalah, setAssTdpenyelesaianMasalah] =
    useState(null);
  const [assTdpemeriksaanPolaToleransi, setAssTdpemeriksaanPolaToleransi] =
    useState(null);
  const [assTdseksualReproduksi, setAssTdseksualReproduksi] = useState(null);
  const [assTdjumlahAnak, setAssTdjumlahAnak] = useState(null);
  const [assTdumurMenikah, setAssTdumurMenikah] = useState(null);
  const [assTdumurAnakPertama, setAssTdumurAnakPertama] = useState(null);
  const [assTdpenyakitKelamin, setAssTdpenyakitKelamin] = useState(null);
  const [assTdjenisPenyakit, setAssTdjenisPenyakit] = useState(null);
  const [assTdkeluhanPenyakit, setAssTdkeluhanPenyakit] = useState(null);
  const [assTdpemeriksaanSeksual, setAssTdpemeriksaanSeksual] = useState(null);
  const [assTdkebiasaanIbadah, setAssTdkebiasaanIbadah] = useState(null);
  const [assTdkepercayaanKesehatan, setAssTdkepercayaanKesehatan] =
    useState(null);
  const [assTdlainlain, setAssTdlainlain] = useState(null);
  const [
    assTdpemeriksaanNilaiKepercayaan,
    setAssTdpemeriksaanNilaiKepercayaan,
  ] = useState(null);

  const [scalaNyeri, setscalaNyeri] = useState("Visual Analog Scale");
  const [skalaNyeri1, setskalaNyeri1] = useState("");
  const [skalaNyeri2, setskalaNyeri2] = useState("");
  const [skalaNyeri3, setskalaNyeri3] = useState("");
  const [skalaNyeri4, setskalaNyeri4] = useState("");
  const [skalaNyeri5, setskalaNyeri5] = useState("");
  const [skalaNyeri6, setskalaNyeri6] = useState("");
  const [skorNyeri, setskorNyeri] = useState("");

  const [metodeResikoJatuh, setmetodeResikoJatuh] = useState("HUMPTY DUMPTY");
  const [rJatuh1, setrJatuh1] = useState("");
  const [rJatuh2, setrJatuh2] = useState("");
  const [sMental1, setsMental1] = useState("");
  const [sMental2, setsMental2] = useState("");
  const [sMental3, setsMental3] = useState("");
  const [sMata1, setsMata1] = useState("");
  const [sMata2, setsMata2] = useState("");
  const [sMata3, setsMata3] = useState("");
  const [kebiasaanBerkemih, setkebiasaanBerkemih] = useState("");
  const [transferTT, settransferTT] = useState("");
  const [mobilitas, setmobilitas] = useState("");
  const [humDumUsia, sethumDumUsia] = useState("");
  const [humDumKel, sethumDumKel] = useState("");
  const [humDumDiagnosa, sethumDumDiagnosa] = useState("");
  const [humDumGangguanKognitif, sethumDumGangguanKognitif] = useState("");
  const [humDumLingkungan, sethumDumLingkungan] = useState("");
  const [humDumRespon, sethumDumRespon] = useState("");
  const [humDumPemObat, sethumDumPemObat] = useState("");
  const [morseRiwJatuh, setmorseRiwJatuh] = useState("");
  const [morseDiagnosa, setmorseDiagnosa] = useState("");
  const [morseKondisiJalan, setmorseKondisiJalan] = useState("");
  const [morseInfus, setmorseInfus] = useState("");
  const [morseKondisiBadan, setmorseKondisiBadan] = useState("");
  const [morseGangKognitif, setmorseGangKognitif] = useState("");
  // const [skorResikoJatuh, setskorResikoJatuh] = useState('')

  const [metodeNutrisi, setmetodeNutrisi] = useState("");
  const [idPantuannutrisi, setidPantuannutrisi] = useState(0);
  const [penurunanBbdewasa, setpenurunanBbdewasa] = useState("");
  const [jumlahPenurunanBb, setjumlahPenurunanBb] = useState("");
  const [asupanMakanDewasa, setasupanMakanDewasa] = useState("");
  const [pasienDiagnosisKhusus, setpasienDiagnosisKhusus] = useState("");
  const [kurusAnak, setkurusAnak] = useState("");
  const [penurunanBbanak, setpenurunanBbanak] = useState("");
  const [diareAnak, setdiareAnak] = useState("");
  const [penyakitBeresikoAnak, setpenyakitBeresikoAnak] = useState("");
  const [asupanMakanObstetri, setasupanMakanObstetri] = useState("");
  const [gangguanMetabolismeObstetri, setgangguanMetabolismeObstetri] =
    useState("");
  const [penambahanBbobstetri, setpenambahanBbobstetri] = useState("");
  const [hbHctObstetri, sethbHctObstetri] = useState("");

  const [ppsAmbulasi, setppsAmbulasi] = useState("");
  const [ppsAktifitas, setppsAktifitas] = useState("");
  const [ppsPerawatan, setppsPerawatan] = useState("");
  // const [ppsAsupan, setppsAsupan] = useState('');
  const [ppsKesadaran, setppsKesadaran] = useState("");

  const [ewsRespirasi, setewsRespirasi] = useState("");
  const [ewsSatursiOksigen, setewsSatursiOksigen] = useState("");
  const [ewsSuplemenOksigen, setewsSuplemenOksigen] = useState("");
  const [ewsSuhu, setewsSuhu] = useState("");
  const [ewsSistolik, setewsSistolik] = useState("");
  const [ewsJantung, setewsJantung] = useState("");
  const [ewsKesadaran, setewsKesadaran] = useState("");
  // const [ewsTotal, setewsTotal] = useState('');

  const [meowsId, setMeowsId] = useState(0);
  const [meowsRespirasi, setmeowsRespirasi] = useState("");
  const [meowsSatursiOksigen, setmeowsSatursiOksigen] = useState("");
  const [meowsSuplemenOksigen, setmeowsSuplemenOksigen] = useState("");
  const [meowsSuhu, setmeowsSuhu] = useState("");
  const [meowsSistolik, setmeowsSistolik] = useState("");
  const [meowsJantung, setmeowsJantung] = useState("");
  const [meowsKesadaran, setmeowsKesadaran] = useState("");
  const [meowsProteinUrine, setmeowsProteinUrine] = useState("");
  const [meowsProduksiUrine, setmeowsProduksiUrine] = useState("");
  const [meowsLochea, setmeowsLochea] = useState("");
  const [meowsCairan, setmeowsCairan] = useState("");
  const [meowsTandaInfeksi, setmeowsTandaInfeksi] = useState("");

  const [skorDownId, setskorDownId] = useState(0);
  const [skordownNafas, setskordownNafas] = useState("");
  const [skordownRetraksi, setskordownRetraksi] = useState("");
  const [skordownSianosis, setskordownSianosis] = useState("");
  const [skordownAirEntry, setskordownAirEntry] = useState("");
  const [skordownMerintih, setskordownMerintih] = useState("");

  const [latchSkorId, setlatchSkorId] = useState(0);
  const [latchscoreL, setlatchscoreL] = useState("");
  const [latchscoreA, setlatchscoreA] = useState("");
  const [latchscoreT, setlatchscoreT] = useState("");
  const [latchscoreC, setlatchscoreC] = useState("");
  const [latchscoreH, setlatchscoreH] = useState("");

  const [assKepercayaan, setassKepercayaan] = useState("");
  const [assPendidikan, setassPendididkan] = useState("");
  const [assKomunikasi, setassKomunikasi] = useState("");
  const [assBahasa, setassBahasa] = useState("");
  const [assPenerjemah, setassPenerjemah] = useState("");
  const [assEdukasi, setassEdukasi] = useState("");
  const [assInformasi, setassInformasi] = useState("");
  const [assSasaranEdukasi, setassSasaranEdukasi] = useState("");
  const [assMetodeEdukasi, setassMetodeEdukasi] = useState("");
  const [assEvaluasiEdukasi, setassEvaluasiEdukasi] = useState("");

  const [anamnesa, setAnamnesa] = useState([]);
  const [keluhanUtama, setKeluhanUtama] = useState([]);
  const [keluhanTambahan, setKeluhanTambahan] = useState([]);
  const [riyawatPenyakitSekarang, setriyawatPenyakitSekarang] = useState([]);
  const [riwayatPenyakitTerdahulu, setriwayatPenyakitTerdahulu] = useState([]);
  const [riwayatPenyakitKeluarga, setriwayatPenyakitKeluarga] = useState([]);
  const [keteranganKeluarga, setketeranganKeluarga] = useState([]);

  const [assKhususAnak, setassKhususAnak] = useState("");
  const [assLansia, setassLansia] = useState("");
  const [assKonsepDiri, setassKonsepDiri] = useState("");
  const [assAnsietas, setassAnsietas] = useState("");
  const [assStres, setassStres] = useState("");
  const [assDepresi, setassDepresi] = useState("");
  const [assAktifitasLatihan, setassAktifitasLatihan] = useState("");

  const [hasil, setHasil] = useState([]);
  const [spin, setSpin] = useState(false);
  const [nilaiKritis, setnilaiKritis] = useState("");

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  //-----useeffect-----//

  const getStatusKritis = (noreg) => {
    setSpin(true);
    axios
      .get(`${apiku}/Askep/Assesment/GetByRegistrasiId/${noreg}/1`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("data assement ada");
          setnilaiKritis(res.data.result.nilaiKritis);
        } else {
          setnilaiKritis("");
        }
      })
      .catch((err) => {
        setnilaiKritis("");
      });
  };

  // const getAssesmentRI = (noreg) => {
  //   setSpin(true);
  //   axios
  //     .get(
  //       `${apiku}/Askep/Assesment/GetByRegistrasiId/${noreg}/1`,
  //       options
  //     )
  //     .then((res) => {
  //       if (res.data.statusCode === 200) {
  //         console.log("data assement ada");
  //         setTglTTV(dayjs(res.data.result.tanggal));
  //         getTTVAssByRuang(
  //           noreg,
  //           res.data.result.ruangId,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         getResikoJatuhByRegDate(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         getNyeriByRegDate(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         getEwsAssByRuang(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         getNutrisiAssByRuang(
  //           noreg,
  //           res.data.result.ruangId,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         getAssesmentDetailTG(
  //           noreg,
  //           res.data.result.ruangId,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         setcaraMasuk(res.data.result.caraMasuk);
  //         setasalMasuk(res.data.result.asalMasuk);
  //         setriwayatAlergi(res.data.result.riwayatAlergi);
  //         setriwayat(res.data.result.riwayat);
  //         setriwayatGenetik(res.data.result.riwayatGenetik);
  //         setppsId(res.data.result.ppsId);
  //         getPPSByID(res.data.result.ppsId);
  //         setnKeluhanNew(res.data.result.keluhan);
  //         settablekeluhan(res.data.result.keluhan);
  //         setuserAssesment(res.data.result.userId);
  //         setnilaiKritis(res.data.result.nilaiKritis);
  //         getAssesmentMeowsDate(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         // getAssSkorDown(noreg);
  //         getAssSkorDowntgl(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         getAssLatchSkore(noreg);
  //         setdissabletgl(true);
  //         setSpin(false);
  //       } else {
  //         console.log("data assement tdk ada");
  //         message.warning("Lengkapi Assesment Utama Dahulu !!!");
  //         setTandaVitalId(0);
  //         setgcsMata(4);
  //         setgcsSuara(5);
  //         setgcsGerakan(6);
  //         settekananDarahSistolik("");
  //         settekananDarahDiastolik("");
  //         setsuhuTubuh("");
  //         setfrekuensiNadi("");
  //         setfrekuensiNafas("");
  //         setTglTTV(dayjs());
  //         settingkatKesadaranId("");
  //         settingkatKesadaran("");
  //         setiramaNadi("Teratur");
  //         setsaturasiOksigen("");
  //         settinggiBadan("");
  //         setberatBadan("");
  //         setEtermitas("");
  //         settanggalKeluhan(dayjs());
  //         setcaraMasuk("");
  //         setasalMasuk("");
  //         setriwayatAlergi("Tidak Ada");
  //         setriwayat("");
  //         setriwayatGenetik("Tidak Ada");
  //         setppsId("");
  //         setnKeluhanNew([]);
  //         settablekeluhan([]);
  //         setuserAssesment("");
  //         setdissabletgl(false);
  //         setSpin(false);
  //         // message.warning("Lengkapi Assesment Tanda Vital Dahulu !!!");
  //       }
  //     })
  //     .catch((err) => {
  //       console.log("data error assemtn ada");
  //       setdissabletgl(false);
  //       message.error(err);
  //       setSpin(false);
  //     });
  // };

  const getAssesmentRI = async (noreg) => {
    setSpin(true);
    try {
      const response = await axios.get(
        `${apiku}/Askep/Assesment/GetByRegistrasiId/${noreg}/1`,
        options
      );
      const data = response.data;

      if (data.statusCode === 200) {
        console.log("data assessment ada");
        const tanggal = dayjs(data.result.tanggal).format("YYYY-MM-DD HH:mm");
        setTglTTV(dayjs(data.result.tanggal));

        await Promise.all([
          getTTVAssByRuang(noreg, data.result.ruangId, tanggal),
          getResikoJatuhByRegDate(noreg, tanggal),
          getNyeriByRegDate(noreg, tanggal),
          getEwsAssByRuang(noreg, tanggal),
          getNutrisiAssByRuang(noreg, data.result.ruangId, tanggal),
          getAssesmentDetailTG(noreg, data.result.ruangId, tanggal),
          getPPSByID(data.result.ppsId),
          getAssesmentMeowsDate(noreg, tanggal),
          getAssSkorDowntgl(noreg, tanggal),
          getAssLatchSkore(noreg),
        ]);

        setcaraMasuk(data.result.caraMasuk);
        setasalMasuk(data.result.asalMasuk);
        setriwayatAlergi(data.result.riwayatAlergi);
        setriwayat(data.result.riwayat);
        setriwayatGenetik(data.result.riwayatGenetik);
        setppsId(data.result.ppsId);
        setnKeluhanNew(data.result.keluhan);
        settablekeluhan(data.result.keluhan);
        setuserAssesment(data.result.userId);
        setnilaiKritis(data.result.nilaiKritis);

        // getAssSkorDown(noreg);
        getAssLatchSkore(noreg);
        setdissabletgl(true);
      } else {
        console.log("data assessment tidak ada");
        message.warning("Lengkapi Assessment Utama Dahulu !!!");
        setTandaVitalId(0);
        setgcsMata(4);
        setgcsSuara(5);
        setgcsGerakan(6);
        settekananDarahSistolik("");
        settekananDarahDiastolik("");
        setsuhuTubuh("");
        setfrekuensiNadi("");
        setfrekuensiNafas("");
        setTglTTV(dayjs());
        settingkatKesadaranId("");
        settingkatKesadaran("");
        setiramaNadi("Teratur");
        setsaturasiOksigen("");
        settinggiBadan("");
        setberatBadan("");
        setEtermitas("");
        settanggalKeluhan(dayjs());
        setcaraMasuk("");
        setasalMasuk("");
        setriwayatAlergi("Tidak Ada");
        setriwayat("");
        setriwayatGenetik("Tidak Ada");
        setppsId("");
        setnKeluhanNew([]);
        settablekeluhan([]);
        setuserAssesment("");
        setdissabletgl(false);
      }
    } catch (err) {
      console.log("data error assessment ada");
      setdissabletgl(false);
      message.error(err);
    } finally {
      setSpin(false);
    }
  };

  const getAssesmentById = (noreg) => {
    axios
      .get(`${apiku}/Askep/Assesment/GetByRegistrasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settanggalKeluhan(dayjs(res.data.result.tanggal));
          setcaraMasuk(res.data.result.caraMasuk);
          setasalMasuk(res.data.result.asalMasuk);
          // console.log('asal masuk pasien', res.data.result);
          setriwayatAlergi(res.data.result.riwayatAlergi);
          setriwayat(res.data.result.riwayat);
          setriwayatGenetik(res.data.result.riwayatGenetik);
          setppsId(res.data.result.ppsId);
          getPPSByID(res.data.result.ppsId);
          setnKeluhanNew(res.data.result.keluhan);
          settablekeluhan(res.data.result.keluhan);
          setuserAssesment(res.data.result.userId);
          console.log(res.data.result.userId);
          axios
            .get(` ${apiku}/EmrTandaVital/GetAllById/${noreg}`, options)
            .then((res) => {
              if (res.data.statusCode === 200) {
                if (
                  res.data.result[0] === undefined ||
                  res.data.result[0].length === 0
                ) {
                  setTandaVitalId(0);
                  setgcsMata(4);
                  setgcsSuara(5);
                  setgcsGerakan(6);
                  settekananDarahSistolik("");
                  settekananDarahDiastolik("");
                  setsuhuTubuh("");
                  setfrekuensiNadi("");
                  setfrekuensiNafas("");
                  setTglTTV(dayjs());
                  settingkatKesadaranId("");
                  settingkatKesadaran("");
                  setiramaNadi("Teratur");
                  setsaturasiOksigen("");
                  settinggiBadan("");
                  setberatBadan("");
                  setEtermitas("");
                  // message.warning("Lengkapi Assesment Tanda Vital Dahulu !!!");
                } else {
                  setTandaVitalId(res.data.result[0].tandaVitalId);
                  setgcsMata(res.data.result[0].gcsMata);
                  setgcsSuara(res.data.result[0].gcsSuara);
                  setgcsGerakan(res.data.result[0].gcsGerakan);
                  settekananDarahSistolik(
                    res.data.result[0].tekananDarahSistolik
                  );
                  settekananDarahDiastolik(
                    res.data.result[0].tekananDarahDiastolik
                  );
                  console.log(res.data.result[0].tekananDarahDiastolik);
                  setsuhuTubuh(res.data.result[0].suhuTubuh);
                  setfrekuensiNadi(res.data.result[0].frekuensiNadi);
                  setfrekuensiNafas(res.data.result[0].frekuensiNafas);
                  setTglTTV(dayjs(res.data.result[0].tanggal));
                  settingkatKesadaranId(res.data.result[0].tingkatKesadaranId);
                  setiramaNadi(res.data.result[0].iramaNadi);
                  setsaturasiOksigen(res.data.result[0].saturasiOksigen);
                  settinggiBadan(res.data.result[0].tinggiBadan);
                  setberatBadan(res.data.result[0].beratBadan);
                  axios
                    .get(` ${apiku}/Nyeri/GetByRegistrasiId/${noreg}`, options)
                    .then((res) => {
                      if (res.data.statusCode === 200) {
                        if (
                          res.data.result === undefined ||
                          res.data.result.length === 0
                        ) {
                          console.log("skala nyeri tidak ada");
                          setscalaNyeri("");
                          setskalaNyeri1("");
                          setskalaNyeri2("");
                          setskalaNyeri3("");
                          setskalaNyeri4("");
                          setskalaNyeri5("");
                          setskalaNyeri6("");
                          console.log("cek if awal", res.data.result);
                        } else {
                          const metode = res.data.result[0].Metode;
                          setscalaNyeri(res.data.result[0].Metode);
                          if (metode === "Visual Analog Scale") {
                            setskalaNyeri1(
                              res.data.result[0].VisualAnalogSkala
                            );
                            setskorNyeri(res.data.result[0].VisualAnalogSkala);
                          } else if (metode === "FLACC") {
                            setskalaNyeri1(res.data.result[0].EkspresiWajah);
                            setskalaNyeri2(res.data.result[0].Kaki);
                            setskalaNyeri3(res.data.result[0].Aktivitas);
                            setskalaNyeri4(res.data.result[0].Menangis);
                            setskalaNyeri5(res.data.result[0].Kenyamanan);
                            setskorNyeri(
                              res.data.result[0].EkspresiWajah +
                                res.data.result[0].Kaki +
                                res.data.result[0].Aktivitas +
                                res.data.result[0].Menangis +
                                res.data.result[0].Kenyamanan
                            );
                          } else if (metode === "NIPS") {
                            setskalaNyeri1(res.data.result[0].EkspresiWajah);
                            setskalaNyeri2(res.data.result[0].Menangis);
                            setskalaNyeri3(res.data.result[0].PolaBernafas);
                            setskalaNyeri4(res.data.result[0].Lengan);
                            setskalaNyeri5(res.data.result[0].Kaki);
                            setskalaNyeri6(
                              res.data.result[0].KeadaanRangsangan
                            );
                            setskorNyeri(
                              res.data.result[0].EkspresiWajah +
                                res.data.result[0].Menangis +
                                res.data.result[0].PolaBernafas +
                                res.data.result[0].Lengan +
                                res.data.result[0].Kaki +
                                res.data.result[0].KeadaanRangsangan
                            );
                          } else if (metode === "NVPS") {
                            setskalaNyeri1(res.data.result[0].EkspresiWajah);
                            setskalaNyeri2(res.data.result[0].Aktivitas);
                            setskalaNyeri3(res.data.result[0].Melindungi);
                            setskalaNyeri4(res.data.result[0].Fisiologis);
                            setskalaNyeri5(res.data.result[0].Respirasi);
                            setskorNyeri(
                              res.data.result[0].EkspresiWajah +
                                res.data.result[0].Aktivitas +
                                res.data.result[0].Melindungi +
                                res.data.result[0].Fisiologis +
                                res.data.result[0].Respirasi
                            );
                          } else if (metode === "Wong Bakes Facies") {
                            setskalaNyeri1(
                              res.data.result[0].WongBakesFaciesSkala
                            );
                            setskorNyeri(
                              res.data.result[0].WongBakesFaciesSkala
                            );
                          } else {
                            setskalaNyeri1(res.data.result[0].NPRSSkala);
                            setskorNyeri(res.data.result[0].NPRSSkala);
                          }
                        }
                      } else {
                        console.log("skala nyeri tidak ada");
                        setscalaNyeri("");
                        setskalaNyeri1("");
                        setskalaNyeri2("");
                        setskalaNyeri3("");
                        setskalaNyeri4("");
                        setskalaNyeri5("");
                        setskalaNyeri6("");
                      }
                    })
                    .catch((err) => {
                      message.error(err);
                    });
                }
              } else {
                setTandaVitalId(0);
                setgcsMata(4);
                setgcsSuara(5);
                setgcsGerakan(6);
                settekananDarahSistolik("");
                settekananDarahDiastolik("");
                setsuhuTubuh("");
                setfrekuensiNadi("");
                setfrekuensiNafas("");
                setTglTTV(dayjs());
                settingkatKesadaranId("");
                settingkatKesadaran("");
                setiramaNadi("Teratur");
                setsaturasiOksigen("");
                settinggiBadan("");
                setberatBadan("");
                setEtermitas("");
                // message.warning("Lengkapi Assesment Tanda Vital Dahulu !!!");
              }
            })
            .catch((err) => {
              message.error(err);
            });

          axios
            .get(` ${apiku}/Nutrisi/GetByRegistrasiId/${noreg}`, options)
            .then((res) => {
              if (res.data.statusCode === 200) {
                if (
                  res.data.result[0] === undefined ||
                  res.data.result[0].length === 0
                ) {
                  setmetodeNutrisi("");
                  setidPantuannutrisi(0);
                  setpenurunanBbdewasa(null);
                  setjumlahPenurunanBb(null);
                  setasupanMakanDewasa(null);
                  setpasienDiagnosisKhusus(null);
                  setkurusAnak(null);
                  setpenurunanBbanak(null);
                  setdiareAnak(null);
                  setpenyakitBeresikoAnak(null);
                } else {
                  setmetodeNutrisi(res.data.result[0].metode);
                  setidPantuannutrisi(res.data.result[0].id);
                  setpenurunanBbdewasa(res.data.result[0].penurunanBbdewasa);
                  setjumlahPenurunanBb(res.data.result[0].jumlahPenurunanBb);
                  setasupanMakanDewasa(res.data.result[0].asupanMakanDewasa);
                  setpasienDiagnosisKhusus(
                    res.data.result[0].pasienDiagnosisKhusus
                  );
                  setkurusAnak(res.data.result[0].kurusAnak);
                  setpenurunanBbanak(res.data.result[0].penurunanBbanak);
                  setdiareAnak(res.data.result[0].diareAnak);
                  setpenyakitBeresikoAnak(
                    res.data.result[0].penyakitBeresikoAnak
                  );
                }
              } else {
                setmetodeNutrisi("");
                setidPantuannutrisi(0);
                setpenurunanBbdewasa(null);
                setjumlahPenurunanBb(null);
                setasupanMakanDewasa(null);
                setpasienDiagnosisKhusus(null);
                setkurusAnak(null);
                setpenurunanBbanak(null);
                setdiareAnak(null);
                setpenyakitBeresikoAnak(null);
              }
            })
            .catch((err) => {
              message.error(err);
            });

          axios
            .get(`${apiku}/Ews/GetByRegistrasiId/${noreg}`, options)
            .then((res) => {
              if (res.data.statusCode === 200) {
                if (
                  res.data.result[0] === undefined ||
                  res.data.result[0].length === 0
                ) {
                  console.log("skala ews tidak ada");
                  setewsRespirasi("");
                  setewsSatursiOksigen("");
                  setewsSuplemenOksigen("");
                  setewsSuhu("");
                  setewsSistolik("");
                  setewsJantung("");
                  setewsKesadaran("");
                } else {
                  // "Tanggal": "2021-05-20T12:40:00",
                  // console.log('data ews per kategori');
                  setewsRespirasi(
                    res.data.result[res.data.result.length - 1].detail[0]
                      .hasil +
                      "-" +
                      res.data.result[res.data.result.length - 1].detail[0]
                        .value
                  );
                  setewsSatursiOksigen(
                    res.data.result[res.data.result.length - 1].detail[1]
                      .hasil +
                      "-" +
                      res.data.result[res.data.result.length - 1].detail[1]
                        .value
                  );
                  setewsSuplemenOksigen(
                    res.data.result[res.data.result.length - 1].detail[2]
                      .hasil +
                      "-" +
                      res.data.result[res.data.result.length - 1].detail[2]
                        .value
                  );
                  setewsSuhu(
                    res.data.result[res.data.result.length - 1].detail[3]
                      .hasil +
                      "-" +
                      res.data.result[res.data.result.length - 1].detail[3]
                        .value
                  );
                  setewsSistolik(
                    res.data.result[res.data.result.length - 1].detail[4]
                      .hasil +
                      "-" +
                      res.data.result[res.data.result.length - 1].detail[4]
                        .value
                  );
                  setewsJantung(
                    res.data.result[res.data.result.length - 1].detail[5]
                      .hasil +
                      "-" +
                      res.data.result[res.data.result.length - 1].detail[5]
                        .value
                  );
                  setewsKesadaran(
                    res.data.result[res.data.result.length - 1].detail[6]
                      .hasil +
                      "-" +
                      res.data.result[res.data.result.length - 1].detail[6]
                        .value
                  );
                  // console.log((res.data.result[0].detail[0].hasil) + '-' + (res.data.result[0].detail[0].value));
                  // console.log((res.data.result[0].detail[1].hasil) + '-' + (res.data.result[0].detail[1].value));
                  // console.log((res.data.result[0].detail[2].hasil) + '-' + (res.data.result[0].detail[2].value));
                  // console.log((res.data.result[0].detail[3].hasil) + '-' + (res.data.result[0].detail[3].value));
                  // console.log((res.data.result[0].detail[4].hasil) + '-' + (res.data.result[0].detail[4].value));
                  // console.log((res.data.result[0].detail[5].hasil) + '-' + (res.data.result[0].detail[5].value));
                  // console.log((res.data.result[0].detail[6].hasil) + '-' + (res.data.result[0].detail[6].value));
                }
              } else {
                console.log("skala ews tidak ada");
                setewsRespirasi("");
                setewsSatursiOksigen("");
                setewsSuplemenOksigen("");
                setewsSuhu("");
                setewsSistolik("");
                setewsJantung("");
                setewsKesadaran("");
              }
            })
            .catch((err) => {
              message.error(err);
              setewsRespirasi("");
              setewsSatursiOksigen("");
              setewsSuplemenOksigen("");
              setewsSuhu("");
              setewsSistolik("");
              setewsJantung("");
              setewsKesadaran("");
            });
        } else {
          setTandaVitalId(0);
          setgcsMata(4);
          setgcsSuara(5);
          setgcsGerakan(6);
          settekananDarahSistolik("");
          settekananDarahDiastolik("");
          setsuhuTubuh("");
          setfrekuensiNadi("");
          setfrekuensiNafas("");
          setTglTTV(dayjs());
          settingkatKesadaranId("");
          settingkatKesadaran("");
          setiramaNadi("Teratur");
          setsaturasiOksigen("");
          settinggiBadan("");
          setberatBadan("");
          setEtermitas("");
          settanggalKeluhan(dayjs());
          setcaraMasuk("");
          setasalMasuk("");
          setriwayatAlergi("Tidak Ada");
          setriwayat("");
          setriwayatGenetik("Tidak Ada");
          setppsId("");
          setnKeluhanNew([]);
          settablekeluhan([]);
          setuserAssesment("");
          // message.warning("Lengkapi Assesment Tanda Vital Dahulu !!!");
          message.warning("Lengkapi Assesment Utama Dahulu !!!");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getAssesmentResikoJatuh = (noreg) => {
    axios
      .get(` ${apiku}/ResikoJatuh/GetByRegistrasiId/${noreg}`, options)
      // /ResikoJatuh/GetByRegistrasiId/2103041051
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result[0] === undefined ||
            res.data.result[0].length === 0
          ) {
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
          } else {
            const metoderesiko =
              res.data.result[res.data.result.length - 1].metode;
            setmetodeResikoJatuh(
              res.data.result[res.data.result.length - 1].metode
            );
            console.log(res.data.result[res.data.result.length - 1].metode);
            if (metoderesiko === "HUMPTY DUMPTY") {
              sethumDumUsia(
                res.data.result[res.data.result.length - 1].detail[0].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[0].jawaban
              );
              sethumDumKel(
                res.data.result[res.data.result.length - 1].detail[1].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[1].jawaban
              );
              sethumDumDiagnosa(
                res.data.result[res.data.result.length - 1].detail[2].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[2].jawaban
              );
              sethumDumGangguanKognitif(
                res.data.result[res.data.result.length - 1].detail[3].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[3].jawaban
              );
              sethumDumLingkungan(
                res.data.result[res.data.result.length - 1].detail[4].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[4].jawaban
              );
              sethumDumRespon(
                res.data.result[res.data.result.length - 1].detail[5].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[5].jawaban
              );
              sethumDumPemObat(
                res.data.result[res.data.result.length - 1].detail[6].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[6].jawaban
              );
            } else if (metoderesiko === "ONTARIO") {
              setrJatuh1(
                res.data.result[res.data.result.length - 1].detail[0].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[0].jawaban
              );
              setrJatuh2(
                res.data.result[res.data.result.length - 1].detail[1].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[1].jawaban
              );
              setsMental1(
                res.data.result[res.data.result.length - 1].detail[2].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[2].jawaban
              );
              setsMental2(
                res.data.result[res.data.result.length - 1].detail[3].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[3].jawaban
              );
              setsMental3(
                res.data.result[res.data.result.length - 1].detail[4].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[4].jawaban
              );
              setsMata1(
                res.data.result[res.data.result.length - 1].detail[5].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[5].jawaban
              );
              setsMata2(
                res.data.result[res.data.result.length - 1].detail[6].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[6].jawaban
              );
              setsMata3(
                res.data.result[res.data.result.length - 1].detail[7].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[7].jawaban
              );
              setkebiasaanBerkemih(
                res.data.result[res.data.result.length - 1].detail[8].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[8].jawaban
              );
              settransferTT(
                res.data.result[res.data.result.length - 1].detail[9].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[9].jawaban
              );
              setmobilitas(
                res.data.result[res.data.result.length - 1].detail[10]
                  .kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[10].jawaban
              );
            } else {
              setmorseRiwJatuh(
                res.data.result[res.data.result.length - 1].detail[0].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[0].jawaban
              );
              setmorseDiagnosa(
                res.data.result[res.data.result.length - 1].detail[1].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[1].jawaban
              );
              setmorseKondisiJalan(
                res.data.result[res.data.result.length - 1].detail[2].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[2].jawaban
              );
              setmorseInfus(
                res.data.result[res.data.result.length - 1].detail[3].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[3].jawaban
              );
              setmorseKondisiBadan(
                res.data.result[res.data.result.length - 1].detail[4].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[4].jawaban
              );
              setmorseGangKognitif(
                res.data.result[res.data.result.length - 1].detail[5].kriteria +
                  "-" +
                  res.data.result[res.data.result.length - 1].detail[5].jawaban
              );
            }
          }
        } else {
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
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getAssesmentMeows = (noreg) => {
    axios
      .get(` ${apiku}/PantauanMeows/GetByRegistrasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result[0] === undefined ||
            res.data.result[0].length === 0
          ) {
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
          } else {
            setmeowsProteinUrine(res.data.result[0].proteinUrine);
            setmeowsProduksiUrine(res.data.result[0].produksiUrine);
            setmeowsLochea(res.data.result[0].lochea);
            setmeowsCairan(res.data.result[0].cairan);
            setmeowsTandaInfeksi(res.data.result[0].tandaInfeksi);

            setmeowsRespirasi(
              res.data.result[0].detail[0].hasil +
                "-" +
                res.data.result[0].detail[0].value
            );
            setmeowsSatursiOksigen(
              res.data.result[0].detail[1].hasil +
                "-" +
                res.data.result[0].detail[1].value
            );
            setmeowsSuplemenOksigen(
              res.data.result[0].detail[2].hasil +
                "-" +
                res.data.result[0].detail[2].value
            );
            setmeowsSuhu(
              res.data.result[0].detail[3].hasil +
                "-" +
                res.data.result[0].detail[3].value
            );
            setmeowsSistolik(
              res.data.result[0].detail[4].hasil +
                "-" +
                res.data.result[0].detail[4].value
            );
            setmeowsJantung(
              res.data.result[0].detail[5].hasil +
                "-" +
                res.data.result[0].detail[5].value
            );
            setmeowsKesadaran(
              res.data.result[0].detail[6].hasil +
                "-" +
                res.data.result[0].detail[6].value
            );
            // console.log('data meows new')
            // console.log((res.data.result[0].detail[0].hasil) + '-' + (res.data.result[0].detail[0].value));
            // console.log((res.data.result[0].detail[1].hasil) + '-' + (res.data.result[0].detail[1].value));
            // console.log((res.data.result[0].detail[2].hasil) + '-' + (res.data.result[0].detail[2].value));
            // console.log((res.data.result[0].detail[3].hasil) + '-' + (res.data.result[0].detail[3].value));
            // console.log((res.data.result[0].detail[4].hasil) + '-' + (res.data.result[0].detail[4].value));
            // console.log((res.data.result[0].detail[5].hasil) + '-' + (res.data.result[0].detail[5].value));
            // console.log((res.data.result[0].detail[6].hasil) + '-' + (res.data.result[0].detail[6].value));
          }
        } else {
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
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getAssesmentMeowsDate = (noreg, date) => {
    axios
      .get(` ${apiku}i/PantauanMeows/GetByDate/${noreg}/${date}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setmeowsProteinUrine(res.data.result.proteinUrine);
          setmeowsProduksiUrine(res.data.result.produksiUrine);
          setmeowsLochea(res.data.result.lochea);
          setmeowsCairan(res.data.result.cairan);
          setmeowsTandaInfeksi(res.data.result.tandaInfeksi);

          setmeowsRespirasi(
            res.data.result.detail[0].hasil +
              "-" +
              res.data.result.detail[0].value
          );
          setmeowsSatursiOksigen(
            res.data.result.detail[1].hasil +
              "-" +
              res.data.result.detail[1].value
          );
          setmeowsSuplemenOksigen(
            res.data.result.detail[2].hasil +
              "-" +
              res.data.result.detail[2].value
          );
          setmeowsSuhu(
            res.data.result.detail[3].hasil +
              "-" +
              res.data.result.detail[3].value
          );
          setmeowsSistolik(
            res.data.result.detail[4].hasil +
              "-" +
              res.data.result.detail[4].value
          );
          setmeowsJantung(
            res.data.result.detail[5].hasil +
              "-" +
              res.data.result.detail[5].value
          );
          setmeowsKesadaran(
            res.data.result.detail[6].hasil +
              "-" +
              res.data.result.detail[6].value
          );
          // console.log('data meows new')
          // console.log((res.data.result[0].detail[0].hasil) + '-' + (res.data.result[0].detail[0].value));
          // console.log((res.data.result[0].detail[1].hasil) + '-' + (res.data.result[0].detail[1].value));
          // console.log((res.data.result[0].detail[2].hasil) + '-' + (res.data.result[0].detail[2].value));
          // console.log((res.data.result[0].detail[3].hasil) + '-' + (res.data.result[0].detail[3].value));
          // console.log((res.data.result[0].detail[4].hasil) + '-' + (res.data.result[0].detail[4].value));
          // console.log((res.data.result[0].detail[5].hasil) + '-' + (res.data.result[0].detail[5].value));
          // console.log((res.data.result[0].detail[6].hasil) + '-' + (res.data.result[0].detail[6].value));
        } else {
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
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getAssementAssByRuang = (noreg, ruang, jam) => {
    setSpin(true);
    axios
      .get(
        `${apiku}/Askep/Assesment/GetByDate/${noreg}/${ruang}/${jam}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log("keluhan: ", res.data.result);
          settanggalKeluhan(dayjs(res.data.result.tanggal));
          setcaraMasuk(res.data.result.caraMasuk);
          setasalMasuk(res.data.result.asalMasuk);
          // console.log('asal masuk pasien', res.data.result);
          setriwayatAlergi(res.data.result.riwayatAlergi);
          setriwayat(res.data.result.riwayat);
          setriwayatGenetik(res.data.result.riwayatGenetik);
          setppsId(res.data.result.ppsId);
          getPPSByID(res.data.result.ppsId);
          setnKeluhanNew(res.data.result.keluhan);
          settablekeluhan(res.data.result.keluhan);
          setuserAssesment(res.data.result.userId);
          setSpin(false);
          // console.log(res.data.result.userId);
        } else {
          settanggalKeluhan(dayjs());
          setcaraMasuk("");
          setasalMasuk("");
          setriwayatAlergi("Tidak Ada");
          setriwayat("");
          setriwayatGenetik("Tidak Ada");
          setppsId("");
          setnKeluhanNew([]);
          settablekeluhan([]);
          setuserAssesment("");
          setSpin(false);
        }
      })
      .catch((err) => {
        setSpin(false);
        message.error(err);
      });
  };

  const getTTVAssByRuang = (noreg, ruang, jam) => {
    // console.log('jam kosong', noreg, ruang, jam);
    setspingetTTVAssByRuang(true);
    axios
      .get(
        `${apiku}/EmrTandaVital/GetByRuangId/${noreg}/${ruang}/${jam}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log("ttv: ", res.data.result);
          setTglTTV(dayjs(res.data.result.Jam));
          setTandaVitalId(res.data.result.TandaVitalId);
          setgcsMata(res.data.result.GcsMata);
          setgcsSuara(res.data.result.GcsSuara);
          setgcsGerakan(res.data.result.GcsGerakan);
          settekananDarahSistolik(res.data.result.TekananDarahSistolik);
          settekananDarahDiastolik(res.data.result.TekananDarahDiastolik);
          setsuhuTubuh(res.data.result.SuhuTubuh);
          setfrekuensiNadi(res.data.result.FrekuensiNadi);
          setfrekuensiNafas(res.data.result.FrekuensiNafas);
          //setUserTTV(res.data.result.UserId);
          setberatBadan(res.data.result.BeratBadan);
          settinggiBadan(res.data.result.TinggiBadan);
          setsaturasiOksigen(res.data.result.SaturasiOksigen);
          setiramaNadi(res.data.result.IramaNadi);
          settingkatKesadaranId(res.data.result.TingkatKesadaranId);
          setspingetTTVAssByRuang(false);
        } else {
          // console.log('data ttv by ruang gagal', noreg, ruang, jam)
          console.log("hasil slice : ", ruang.slice(0, 2));

          setTglTTV(dayjs());
          setTandaVitalId(0);
          ruang.slice(0, 2) === "94" ? setgcsMata("") : setgcsMata(4);
          ruang.slice(0, 2) === "94" ? setgcsSuara("") : setgcsSuara(5);
          ruang.slice(0, 2) === "94" ? setgcsGerakan("") : setgcsGerakan(6);
          settekananDarahSistolik("");
          settekananDarahDiastolik("");
          setsuhuTubuh("");
          setfrekuensiNadi("");
          setfrekuensiNafas("");
          //setUserTTV('');
          setberatBadan();
          settinggiBadan();
          setsaturasiOksigen("");
          setiramaNadi("Teratur");
          settingkatKesadaranId("");
          setspingetTTVAssByRuang(false);
        }
      })
      .catch((err) => {
        message.error(err);
        setspingetTTVAssByRuang(false);
      });
  };

  const getEwsAssByRuang = (noreg, jam) => {
    setSpin(true);
    axios
      .get(`${apiku}/Ews/GetByDate/${noreg}/${jam}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log("ews ass: ", res.data.result);
          setewsRespirasi(
            res.data.result.detail[0].hasil +
              "-" +
              res.data.result.detail[0].value
          );
          setewsSatursiOksigen(
            res.data.result.detail[1].hasil +
              "-" +
              res.data.result.detail[1].value
          );
          setewsSuplemenOksigen(
            res.data.result.detail[2].hasil +
              "-" +
              res.data.result.detail[2].value
          );
          setewsSuhu(
            res.data.result.detail[3].hasil +
              "-" +
              res.data.result.detail[3].value
          );
          setewsSistolik(
            res.data.result.detail[4].hasil +
              "-" +
              res.data.result.detail[4].value
          );
          setewsJantung(
            res.data.result.detail[5].hasil +
              "-" +
              res.data.result.detail[5].value
          );
          setewsKesadaran(
            res.data.result.detail[6].hasil +
              "-" +
              res.data.result.detail[6].value
          );
          setSpin(false);
        } else {
          // console.log('skala ews tidak ada');
          setewsRespirasi("");
          setewsSatursiOksigen("");
          setewsSuplemenOksigen("");
          setewsSuhu("");
          setewsSistolik("");
          setewsJantung("");
          setewsKesadaran("");
          setSpin(false);
        }
      })
      .catch((err) => {
        setSpin(false);
        message.error(err);
      });
  };

  const getNutrisiAssByRuang = (noreg, ruang, jam) => {
    setSpin(true);
    axios
      .get(`${apiku}/Nutrisi/GetByRuangId/${noreg}/${ruang}/${jam}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log("nutrisi ass: ", res.data.result);
          setmetodeNutrisi(res.data.result.Metode);
          setidPantuannutrisi(res.data.result.Id);
          setpenurunanBbdewasa(res.data.result.PenurunanBBDewasa);
          setjumlahPenurunanBb(res.data.result.JumlahPenurunanBB);
          setasupanMakanDewasa(res.data.result.AsupanMakanDewasa);
          setpasienDiagnosisKhusus(res.data.result.PasienDiagnosisKhusus);
          setkurusAnak(res.data.result.KurusAnak);
          setpenurunanBbanak(res.data.result.PenurunanBBAnak);
          setdiareAnak(res.data.result.DiareAnak);
          setpenyakitBeresikoAnak(res.data.result.PenyakitBeresikoAnak);
          setSpin(false);
        } else {
          // console.log("nutrisi ass gagal!");
          setmetodeNutrisi("");
          setidPantuannutrisi(0);
          setpenurunanBbdewasa(null);
          setjumlahPenurunanBb(null);
          setasupanMakanDewasa(null);
          setpasienDiagnosisKhusus(null);
          setkurusAnak(null);
          setpenurunanBbanak(null);
          setdiareAnak(null);
          setpenyakitBeresikoAnak(null);
          setSpin(false);
        }
      })
      .catch((err) => {
        setSpin(false);
        message.error(err);
      });
  };

  const getResikoJatuhByRegDate = (noreg, date) => {
    setSpin(true);
    axios
      .get(`${apiku}/ResikoJatuh/GetByDate/${noreg}/${date}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log("resiko jatuh: ", res.data.result);
          const metoderesiko = res.data.result.metode;
          setmetodeResikoJatuh(res.data.result.metode);
          setSpin(false);
          // console.log('ini resiko jatuh', res.data.result);

          if (metoderesiko === "HUMPTY DUMPTY") {
            sethumDumUsia(
              res.data.result.detail[0].kriteria +
                "-" +
                res.data.result.detail[0].jawaban
            );
            sethumDumKel(
              res.data.result.detail[1].kriteria +
                "-" +
                res.data.result.detail[1].jawaban
            );
            sethumDumDiagnosa(
              res.data.result.detail[2].kriteria +
                "-" +
                res.data.result.detail[2].jawaban
            );
            sethumDumGangguanKognitif(
              res.data.result.detail[3].kriteria +
                "-" +
                res.data.result.detail[3].jawaban
            );
            sethumDumLingkungan(
              res.data.result.detail[4].kriteria +
                "-" +
                res.data.result.detail[4].jawaban
            );
            sethumDumRespon(
              res.data.result.detail[5].kriteria +
                "-" +
                res.data.result.detail[5].jawaban
            );
            sethumDumPemObat(
              res.data.result.detail[6].kriteria +
                "-" +
                res.data.result.detail[6].jawaban
            );
            setSpin(false);
          } else if (metoderesiko === "ONTARIO") {
            setrJatuh1(
              res.data.result.detail[0].kriteria +
                "-" +
                res.data.result.detail[0].jawaban
            );
            setrJatuh2(
              res.data.result.detail[1].kriteria +
                "-" +
                res.data.result.detail[1].jawaban
            );
            setsMental1(
              res.data.result.detail[2].kriteria +
                "-" +
                res.data.result.detail[2].jawaban
            );
            setsMental2(
              res.data.result.detail[3].kriteria +
                "-" +
                res.data.result.detail[3].jawaban
            );
            setsMental3(
              res.data.result.detail[4].kriteria +
                "-" +
                res.data.result.detail[4].jawaban
            );
            setsMata1(
              res.data.result.detail[5].kriteria +
                "-" +
                res.data.result.detail[5].jawaban
            );
            setsMata2(
              res.data.result.detail[6].kriteria +
                "-" +
                res.data.result.detail[6].jawaban
            );
            setsMata3(
              res.data.result.detail[7].kriteria +
                "-" +
                res.data.result.detail[7].jawaban
            );
            setkebiasaanBerkemih(
              res.data.result.detail[8].kriteria +
                "-" +
                res.data.result.detail[8].jawaban
            );
            settransferTT(
              res.data.result.detail[9].kriteria +
                "-" +
                res.data.result.detail[9].jawaban
            );
            setmobilitas(
              res.data.result.detail[10].kriteria +
                "-" +
                res.data.result.detail[10].jawaban
            );
            setSpin(false);
          } else {
            setmorseRiwJatuh(
              res.data.result.detail[0].kriteria +
                "-" +
                res.data.result.detail[0].jawaban
            );
            setmorseDiagnosa(
              res.data.result.detail[1].kriteria +
                "-" +
                res.data.result.detail[1].jawaban
            );
            setmorseKondisiJalan(
              res.data.result.detail[2].kriteria +
                "-" +
                res.data.result.detail[2].jawaban
            );
            setmorseInfus(
              res.data.result.detail[3].kriteria +
                "-" +
                res.data.result.detail[3].jawaban
            );
            setmorseKondisiBadan(
              res.data.result.detail[4].kriteria +
                "-" +
                res.data.result.detail[4].jawaban
            );
            setmorseGangKognitif(
              res.data.result.detail[5].kriteria +
                "-" +
                res.data.result.detail[5].jawaban
            );
            setSpin(false);
          }
        } else {
          // console.log('data resiko jatuh tidak ada');
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
          setSpin(false);
        }
      })
      .catch((err) => {
        setSpin(false);
        message.error(err);
      });
  };

  const getNyeriByRegDate = (noreg, date) => {
    setSpin(true);
    axios
      .get(`${apiku}/Nyeri/GetByDate/${noreg}/${date}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log("nyeri: ", res.data.result);
          setscalaNyeri(res.data.result.Metode);
          const metode = res.data.result.Metode;
          setscalaNyeri(res.data.result.Metode);
          if (metode === "Visual Analog Scale") {
            setskalaNyeri1(res.data.result.VisualAnalogSkala);
            setSpin(false);
            // setskorNyeri(res.data.result.VisualAnalogSkala)
          } else if (metode === "FLACC") {
            setskalaNyeri1(res.data.result.EkspresiWajah);
            setskalaNyeri2(res.data.result.Kaki);
            setskalaNyeri3(res.data.result.Aktivitas);
            setskalaNyeri4(res.data.result.Menangis);
            setskalaNyeri5(res.data.result.Kenyamanan);
            setSpin(false);
            // setskorNyeri((res.data.result.EkspresiWajah) +
            //     (res.data.result[0].Kaki) +
            //     (res.data.result[0].Aktivitas) +
            //     (res.data.result[0].Menangis) +
            //     (res.data.result[0].Kenyamanan))
          } else if (metode === "NIPS") {
            setskalaNyeri1(res.data.result.EkspresiWajah);
            setskalaNyeri2(res.data.result.Menangis);
            setskalaNyeri3(res.data.result.PolaBernafas);
            setskalaNyeri4(res.data.result.Lengan);
            setskalaNyeri5(res.data.result.Kaki);
            setskalaNyeri6(res.data.result.KeadaanRangsangan);
            setSpin(false);
            // setskorNyeri((res.data.result[0].EkspresiWajah) +
            //     (res.data.result[0].Menangis) +
            //     (res.data.result[0].PolaBernafas) +
            //     (res.data.result[0].Lengan) +
            //     (res.data.result[0].Kaki) +
            //     (res.data.result[0].KeadaanRangsangan))
          } else if (metode === "NVPS") {
            setskalaNyeri1(res.data.result.EkspresiWajah);
            setskalaNyeri2(res.data.result.Aktivitas);
            setskalaNyeri3(res.data.result.Melindungi);
            setskalaNyeri4(res.data.result.Fisiologis);
            setskalaNyeri5(res.data.result.Respirasi);
            setSpin(false);
            // setskorNyeri((res.data.result[0].EkspresiWajah) +
            //     (res.data.result[0].Aktivitas) +
            //     (res.data.result[0].Melindungi) +
            //     (res.data.result[0].Fisiologis) +
            //     (res.data.result[0].Respirasi))
          } else if (metode === "Wong Bakes Facies") {
            setskalaNyeri1(res.data.result.WongBakesFaciesSkala);
            setSpin(false);
            // setskorNyeri(res.data.result[0].WongBakesFaciesSkala);
          } else {
            setskalaNyeri1(res.data.result.NPRSSkala);
            setSpin(false);
            // setskorNyeri(res.data.result[0].NPRSSkala);
          }
        } else {
          // console.log('skala nyeri tidak ada');
          // console.log('ini data nyeri', noreg, date);
          setscalaNyeri("");
          setskalaNyeri1("");
          setskalaNyeri2("");
          setskalaNyeri3("");
          setskalaNyeri4("");
          setskalaNyeri5("");
          setskalaNyeri6("");
          setSpin(false);
        }
      })
      .catch((err) => {
        setSpin(false);
        message.error(err);
      });
  };

  const getAssesmentDetailTG = (noreg, ruangId, tgl) => {
    setSpin(true);
    axios
      .get(
        ` ${apiku}/Askep/Assesment/GetAssesmentDetail/${noreg}/${ruangId}/${tgl}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          setassOksigen(res.data.result.respirasi);
          settandaGejalaAssOksigen(
            res.data.result.tandaGejala.respirasi.map((b) => b.TandaGejalaId)
          );
          setassSirkulasi(res.data.result.sirkulasi);
          settandaGejalaAssSirkulasi(
            res.data.result.tandaGejala.sirkulasi.map((b) => b.TandaGejalaId)
          );
          setassNutrisi(res.data.result.nutrisi);
          settandaGejalaAssNutrisi(
            res.data.result.tandaGejala.nutrisi.map((b) => b.TandaGejalaId)
          );
          setassEliminasi(res.data.result.eliminasi);
          settandaGejalaAssEliminasi(
            res.data.result.tandaGejala.eliminasi.map((b) => b.TandaGejalaId)
          );
          setassAktifitasIstirahat(res.data.result.aktifitas);
          settandaGejalaAssAktifitasIstirahat(
            res.data.result.tandaGejala.aktifitasDanIstirahat.map(
              (b) => b.TandaGejalaId
            )
          );
          setassProteksiPerlindungan(res.data.result.proteksi);
          settandaGejalaAssProteksiPerlindungan(
            res.data.result.tandaGejala.proteksiDanPerlindungan.map(
              (b) => b.TandaGejalaId
            )
          );
          setassSensoriPersepsi(res.data.result.sensori);
          settandaGejalaAssSensoriPersepsi(
            res.data.result.tandaGejala.sensoriPersepsi.map(
              (b) => b.TandaGejalaId
            )
          );
          setassCairanElektrolit(res.data.result.cairanElektrolit);
          settandaGejalaAssCairanElektrolit(
            res.data.result.tandaGejala.cairanDanElektrolit.map(
              (b) => b.TandaGejalaId
            )
          );
          setassFungsiNeurologis(res.data.result.fungsiNeurologis);
          settandaGejalaAssFungsiNeurologis(
            res.data.result.tandaGejala.fungsiNeurologis.map(
              (b) => b.TandaGejalaId
            )
          );
          setassFungsiEndokrin(res.data.result.fungsiEndokrin);
          settandaGejalaAssFungsiEndokrin(
            res.data.result.tandaGejala.fungsiEndokrin.map(
              (b) => b.TandaGejalaId
            )
          );
          setassKonsepDiriKognitif(res.data.result.konsepDiri);
          settandaGejalaAssKonsepDiriKognitif(
            res.data.result.tandaGejala.konsepDiriDanKognitif.map(
              (b) => b.TandaGejalaId
            )
          );
          setassFungsiPeran(res.data.result.fungsiPeran);
          settandaGejalaAssFungsiPeran(
            res.data.result.tandaGejala.fungsiPeran.map((b) => b.TandaGejalaId)
          );
          setassPolaToleransiKopingStrees(res.data.result.polaToleransi);
          settandaGejalaAssPolaToleransiKopingStrees(
            res.data.result.tandaGejala.polaToleransiKopingStress.map(
              (b) => b.TandaGejalaId
            )
          );
          setassSeksualReproduksi(res.data.result.seksualReproduksi);
          settandaGejalaAssSeksualReproduksi(
            res.data.result.tandaGejala.seksualReproduksi.map(
              (b) => b.TandaGejalaId
            )
          );
          setassPolaKepercayaan(res.data.result.kebiasaanIbadah);
          settandaGejalaAssPolaKepercayaan(
            res.data.result.tandaGejala.polaNilaiKepercayaan.map(
              (b) => b.TandaGejalaId
            )
          );
          // setAssTdrespirasi(res.data.result.);
          // setAssTdrr(res.data.result.);
          setAssTdpemeriksaanRespirasi(res.data.result.pemeriksaanRespirasi);
          // setAssTdsirkulasi(res.data.result.);
          // setAssTdtekananDarahSistolik(res.data.result.);
          // setAssTdtekananDarahDiastolik(res.data.result.);
          // setAssTdfrekuensiNadi(res.data.result.);
          setAssTdekstremitas(res.data.result.ekstremitas);
          setAssTdpemeriksaanSirkulasi(res.data.result.pemeriksaanSirkulasi);
          // setAssTdnutrisi(res.data.result.);
          // setAssTdscoreNutrisi(res.data.result.);
          // setAssTdkesimpulanNutrisi(res.data.result.);
          // setAssTdhasilPengkajian(res.data.result.);
          // setAssTdtinggiBadan(res.data.result.);
          // setAssTdberatBadan(res.data.result.);
          // setAssTdimt(res.data.result.);
          setAssTdpemeriksaanNutrisi(res.data.result.pemeriksaanNutrisi);
          // setAssTdeliminasi(res.data.result.);
          setAssTdfrekuensiBab(res.data.result.frekuensiBab);
          setAssTdkonsistensiBab(res.data.result.konsistensiBab);
          setAssTdwarnaBab(res.data.result.warnaBab);
          setAssTdkeluhanBab(res.data.result.keluhanBab);
          setAssTdperistaltikUsus(res.data.result.peristaltikUsus);
          setAssTdfrekuensiBak(res.data.result.frekuensiBak);
          setAssTdjumlahUrin(res.data.result.jumlahUrin);
          setAssTdgangguanUrin(res.data.result.gangguanUrin);
          setAssTdkateter(res.data.result.kateter);
          setAssTdwarnaUrin(res.data.result.warnaUrin);
          setAssTdpemeriksaanEliminasi(res.data.result.pemeriksaanEliminasi);
          // setAssTdaktifitas(res.data.result.);
          setAssTdtidurMalam(res.data.result.tidurMalam);
          setAssTdtidurSiang(res.data.result.tidurSiang);
          setAssTdgangguanTidur(res.data.result.gangguanTidur);
          setAssTdobatTidur(res.data.result.obatTidur);
          setAssTdpemeriksaanAktifitas(res.data.result.pemeriksaanAktifitas);
          // setAssTdproteksi(res.data.result.);
          setAssTdlukaKulit(res.data.result.lukaKulit);
          setAssTdlokasiLuka(res.data.result.lokasiLuka);
          setAssTdpenyebabLuka(res.data.result.penyebabLuka);
          setAssTdluasLuka(res.data.result.luasLuka);
          setAssTdpemeriksaanProteksi(res.data.result.pemeriksaanProteksi);
          // setAssTdsensori(res.data.result.);
          setAssTdkesadaran(res.data.result.kesadaran);
          // setAssTdgcsMata(res.data.result.);
          // setAssTdgcsSuara(res.data.result.);
          // setAssTdgcsGerakan(res.data.result.);
          setAssTdpendengaran(res.data.result.pendengaran);
          setAssTdpenglihatan(res.data.result.penglihatan);
          setAssTdbicara(res.data.result.bicara);
          setAssTdkebiasaanPeriksa(res.data.result.kebiasaanPeriksa);
          setAssTdpersepsiSakit(res.data.result.persepsiSakit);
          setAssTdpemeriksaanSensori(res.data.result.pemeriksaanSensori);
          // setAssTdcairanElektrolit(res.data.result.);
          setAssTdiwl(res.data.result.iwl);
          setAssTdderajatEdema(res.data.result.derajatEdema);
          setAssTdpemeriksaanCairanElektrolit(
            res.data.result.pemeriksaanCairanElektrolit
          );
          // setAssTdfungsiNeurologis(res.data.result.);
          setAssTdpemeriksaanNeurologis(res.data.result.pemeriksaanNeurologis);
          // setAssTdfungsiEndokrin(res.data.result.);
          setAssTdpemeriksaanEndokrin(res.data.result.pemeriksaanEndokrin);
          // setAssTdkonsepDiri(res.data.result.);
          setAssTdpengetahuanPenyakit(res.data.result.pengetahuanPenyakit);
          setAssTdpengetahuanPerawatan(res.data.result.pengetahuanPerawatan);
          setAssTdscoreKonsepDiri(res.data.result.scoreKonsepDiri);
          setAssTdpemeriksaanKonsepDiri(res.data.result.pemeriksaanKonsepDiri);
          // setAssTdfungsiPeran(res.data.result.);
          setAssTdhubunganPeran(res.data.result.hubunganPeran);
          setAssTdperanKeluarga(res.data.result.peranKeluarga);
          setAssTdpemeriksaanFungsiPeran(
            res.data.result.pemeriksaanFungsiPeran
          );
          // setAssTdpolaToleransi(res.data.result.);
          setAssTdkoping(res.data.result.koping);
          setAssTdpenyelesaianMasalah(res.data.result.penyelesaianMasalah);
          setAssTdpemeriksaanPolaToleransi(
            res.data.result.pemeriksaanPolaToleransi
          );
          // setAssTdseksualReproduksi(res.data.result.);
          setAssTdjumlahAnak(res.data.result.jumlahAnak);
          setAssTdumurMenikah(res.data.result.umurMenikah);
          setAssTdumurAnakPertama(res.data.result.umurAnakPertama);
          setAssTdpenyakitKelamin(res.data.result.penyakitKelamin);
          setAssTdjenisPenyakit(res.data.result.jenisPenyakit);
          setAssTdkeluhanPenyakit(res.data.result.keluhanPenyakit);
          setAssTdpemeriksaanSeksual(res.data.result.pemeriksaanSeksual);
          // setAssTdkebiasaanIbadah(res.data.result.);
          setAssTdkepercayaanKesehatan(res.data.result.kepercayaanKesehatan);
          setAssTdlainlain(res.data.result.lainlain);
          setAssTdpemeriksaanNilaiKepercayaan(
            res.data.result.pemeriksaanNilaiKepercayaan
          );
          setSpin(false);
        } else {
          setassOksigen("Tidak Ada Keluhan");
          settandaGejalaAssOksigen([]);
          setassSirkulasi("Tidak Ada Keluhan");
          settandaGejalaAssSirkulasi([]);
          setassNutrisi("Tidak Ada Keluhan");
          settandaGejalaAssNutrisi([]);
          setassEliminasi("Tidak Ada Keluhan");
          settandaGejalaAssEliminasi([]);
          setassAktifitasIstirahat("Tidak Ada Keluhan");
          settandaGejalaAssAktifitasIstirahat([]);
          setassProteksiPerlindungan("Tidak Ada Keluhan");
          settandaGejalaAssProteksiPerlindungan([]);
          setassSensoriPersepsi("Tidak Ada Keluhan");
          settandaGejalaAssSensoriPersepsi([]);
          setassCairanElektrolit("Tidak Ada Keluhan");
          settandaGejalaAssCairanElektrolit([]);
          setassFungsiNeurologis("Tidak Ada Keluhan");
          settandaGejalaAssFungsiNeurologis([]);
          setassFungsiEndokrin("Tidak Ada Keluhan");
          settandaGejalaAssFungsiEndokrin([]);
          setassKonsepDiriKognitif("Tidak Ada Keluhan");
          settandaGejalaAssKonsepDiriKognitif([]);
          setassFungsiPeran("Tidak Ada Keluhan");
          settandaGejalaAssFungsiPeran([]);
          setassPolaToleransiKopingStrees("Tidak Ada Keluhan");
          settandaGejalaAssPolaToleransiKopingStrees([]);
          setassSeksualReproduksi("Tidak Ada Keluhan");
          settandaGejalaAssSeksualReproduksi([]);
          setassPolaKepercayaan("Teratur");
          settandaGejalaAssPolaKepercayaan([]);
          setAssTdpemeriksaanRespirasi(null);
          setAssTdekstremitas(null);
          setAssTdpemeriksaanSirkulasi(null);
          setAssTdpemeriksaanNutrisi(null);
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
          setAssTdtidurMalam(null);
          setAssTdtidurSiang(null);
          setAssTdgangguanTidur(null);
          setAssTdobatTidur(null);
          setAssTdpemeriksaanAktifitas(null);
          setAssTdlukaKulit(null);
          setAssTdlokasiLuka(null);
          setAssTdpenyebabLuka(null);
          setAssTdluasLuka(null);
          setAssTdpemeriksaanProteksi(null);
          setAssTdkesadaran(null);
          setAssTdpendengaran(null);
          setAssTdpenglihatan(null);
          setAssTdbicara(null);
          setAssTdkebiasaanPeriksa(null);
          setAssTdpersepsiSakit(null);
          setAssTdpemeriksaanSensori(null);
          setAssTdiwl(null);
          setAssTdderajatEdema(null);
          setAssTdpemeriksaanCairanElektrolit(null);
          setAssTdpemeriksaanNeurologis(null);
          setAssTdpemeriksaanEndokrin(null);
          setAssTdpengetahuanPenyakit(null);
          setAssTdpengetahuanPerawatan(null);
          setAssTdscoreKonsepDiri(null);
          setAssTdpemeriksaanKonsepDiri(null);
          setAssTdhubunganPeran(null);
          setAssTdperanKeluarga(null);
          setAssTdpemeriksaanFungsiPeran(null);
          setAssTdkoping(null);
          setAssTdpenyelesaianMasalah(null);
          setAssTdpemeriksaanPolaToleransi(null);
          setAssTdjumlahAnak(null);
          setAssTdumurMenikah(null);
          setAssTdumurAnakPertama(null);
          setAssTdpenyakitKelamin(null);
          setAssTdjenisPenyakit(null);
          setAssTdkeluhanPenyakit(null);
          setAssTdpemeriksaanSeksual(null);
          setAssTdkepercayaanKesehatan(null);
          setAssTdlainlain(null);
          setAssTdpemeriksaanNilaiKepercayaan(null);
          setSpin(false);
          message.warning("Lengkapi Assesment Tanda Gejala Dahulu !!!");
        }
      })
      .catch((err) => {
        setSpin(false);
        message.error(err);
      });
  };
  //-----useeffect----///

  const setDefAssesmentDetailTG = () => {
    setassOksigen("Tidak Ada Keluhan");
    settandaGejalaAssOksigen([]);
    setassSirkulasi("Tidak Ada Keluhan");
    settandaGejalaAssSirkulasi([]);
    setassNutrisi("Tidak Ada Keluhan");
    settandaGejalaAssNutrisi([]);
    setassEliminasi("Tidak Ada Keluhan");
    settandaGejalaAssEliminasi([]);
    setassAktifitasIstirahat("Tidak Ada Keluhan");
    settandaGejalaAssAktifitasIstirahat([]);
    setassProteksiPerlindungan("Tidak Ada Keluhan");
    settandaGejalaAssProteksiPerlindungan([]);
    setassSensoriPersepsi("Tidak Ada Keluhan");
    settandaGejalaAssSensoriPersepsi([]);
    setassCairanElektrolit("Tidak Ada Keluhan");
    settandaGejalaAssCairanElektrolit([]);
    setassFungsiNeurologis("Tidak Ada Keluhan");
    settandaGejalaAssFungsiNeurologis([]);
    setassFungsiEndokrin("Tidak Ada Keluhan");
    settandaGejalaAssFungsiEndokrin([]);
    setassKonsepDiriKognitif("Tidak Ada Keluhan");
    settandaGejalaAssKonsepDiriKognitif([]);
    setassFungsiPeran("Tidak Ada Keluhan");
    settandaGejalaAssFungsiPeran([]);
    setassPolaToleransiKopingStrees("Tidak Ada Keluhan");
    settandaGejalaAssPolaToleransiKopingStrees([]);
    setassSeksualReproduksi("Tidak Ada Keluhan");
    settandaGejalaAssSeksualReproduksi([]);
    setassPolaKepercayaan("Teratur");
    settandaGejalaAssPolaKepercayaan([]);
    setAssTdpemeriksaanRespirasi(null);
    setAssTdekstremitas(null);
    setAssTdpemeriksaanSirkulasi(null);
    setAssTdpemeriksaanNutrisi(null);
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
    setAssTdtidurMalam(null);
    setAssTdtidurSiang(null);
    setAssTdgangguanTidur(null);
    setAssTdobatTidur(null);
    setAssTdpemeriksaanAktifitas(null);
    setAssTdlukaKulit(null);
    setAssTdlokasiLuka(null);
    setAssTdpenyebabLuka(null);
    setAssTdluasLuka(null);
    setAssTdpemeriksaanProteksi(null);
    setAssTdkesadaran(null);
    setAssTdpendengaran(null);
    setAssTdpenglihatan(null);
    setAssTdbicara(null);
    setAssTdkebiasaanPeriksa(null);
    setAssTdpersepsiSakit(null);
    setAssTdpemeriksaanSensori(null);
    setAssTdiwl(null);
    setAssTdderajatEdema(null);
    setAssTdpemeriksaanCairanElektrolit(null);
    setAssTdpemeriksaanNeurologis(null);
    setAssTdpemeriksaanEndokrin(null);
    setAssTdpengetahuanPenyakit(null);
    setAssTdpengetahuanPerawatan(null);
    setAssTdscoreKonsepDiri(null);
    setAssTdpemeriksaanKonsepDiri(null);
    setAssTdhubunganPeran(null);
    setAssTdperanKeluarga(null);
    setAssTdpemeriksaanFungsiPeran(null);
    setAssTdkoping(null);
    setAssTdpenyelesaianMasalah(null);
    setAssTdpemeriksaanPolaToleransi(null);
    setAssTdjumlahAnak(null);
    setAssTdumurMenikah(null);
    setAssTdumurAnakPertama(null);
    setAssTdpenyakitKelamin(null);
    setAssTdjenisPenyakit(null);
    setAssTdkeluhanPenyakit(null);
    setAssTdpemeriksaanSeksual(null);
    setAssTdkepercayaanKesehatan(null);
    setAssTdlainlain(null);
    setAssTdpemeriksaanNilaiKepercayaan(null);
    setSpin(false);
    message.warning("Lengkapi Assesment Tanda Gejala Dahulu !!!");
  };

  const getPPSByID = (ppsId) => {
    axios
      .get(`${apiku}/Askep/Assesment/GetPPS/${ppsId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setppsAmbulansi(res.data.result.Ambulansi);
          setppsAktivitas(res.data.result.Aktivitas);
          setppsPerawatanDiri(res.data.result.PerawatanDiri);
          setppsAsupan(res.data.result.Asupan);
          setppsTingkatKesadaran(res.data.result.TingkatKesadaran);
          setppsKesimpulan(res.data.result.Kesimpulan);
        } else {
          setppsAmbulansi("");
          setppsAktivitas("");
          setppsPerawatanDiri("");
          setppsAsupan("");
          setppsTingkatKesadaran("");
          setppsKesimpulan("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getCetakAssesment = (noreg, flag) => {
    setSpin(true);
    axios
      .get(`${apiku}/Askep/Assesment/GetAssesment/${noreg}/${flag}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result[0]);
          // console.log('data cetak', res.data.result.assesmentDetail.tandaGejala.respirasi.map((e) => (e.Deskripsi)));
          // setcetakassesmentDetailTG(res.data.result.assesmentDetail.tandaGejala);
          setcetakUserTtd(
            "data:image/jpeg;base64," + res.data.result[0].tandaTangan
          );
          setcetakUserCetak(res.data.result[0].userId);
          setcetakregistrasiId(res.data.result[0].registrasiId);
          setcetakpasienId(res.data.result[0].pasienId);
          setcetaknama(res.data.result[0].nama);
          setcetaktanggal(
            dayjs(res.data.result[0].tanggal).format("DD-MM-YYYY HH:mm")
          );
          setcetaknamaRuang(res.data.result[0].namaRuang);
          setcetakpegawaiId(res.data.result[0].pegawaiId);
          setcetakcaraMasuk(res.data.result[0].caraMasuk);
          setcetakasalMasuk(res.data.result[0].asalMasuk);
          setcetakriwayatAlergi(res.data.result[0].riwayatAlergi);
          setcetakriwayat(res.data.result[0].riwayat);
          setcetakriwayatGenetik(res.data.result[0].riwayatGenetik);
          setcetakkeluhan(res.data.result[0].keluhan);
          setcetakskalaNyeri(res.data.result[0].skalaNyeri);
          setcetakresikoJatuh(res.data.result[0].resikoJatuh);
          setcetaknutrisi(res.data.result[0].nutrisi);
          setcetakpps(res.data.result[0].pps);
          setcetakews(res.data.result[0].ews);
          setcetaklatchScore(res.data.result[0].latchScore);
          setcetakscoreDown(res.data.result[0].scoreDown);
          setcetakmeows(res.data.result[0].meows);
          setcetakassesmentDetail(res.data.result[0].assesmentDetail);
          setcetakcetakTTV(res.data.result[0].tandaVital);
          setcetakassesmentDetailTG(
            res.data.result[0].assesmentDetail.tandaGejala
          );
          //-----//
          setcetakTGrespirasi(
            res.data.result[0].assesmentDetail.tandaGejala.respirasi
          );
          setcetakTGsirkulasi(
            res.data.result[0].assesmentDetail.tandaGejala.sirkulasi
          );
          setcetakTGnutrisi(
            res.data.result[0].assesmentDetail.tandaGejala.nutrisi
          );
          setcetakTGeliminasi(
            res.data.result[0].assesmentDetail.tandaGejala.eliminasi
          );
          setcetakTGaktifitasDanIstirahat(
            res.data.result[0].assesmentDetail.tandaGejala.aktifitasDanIstirahat
          );
          setcetakTGproteksiDanPerlindungan(
            res.data.result[0].assesmentDetail.tandaGejala
              .proteksiDanPerlindungan
          );
          setcetakTGsensoriPersepsi(
            res.data.result[0].assesmentDetail.tandaGejala.sensoriPersepsi
          );
          setcetakTGcairanDanElektrolit(
            res.data.result[0].assesmentDetail.tandaGejala.cairanDanElektrolit
          );
          setcetakTGfungsiNeurologis(
            res.data.result[0].assesmentDetail.tandaGejala.fungsiNeurologis
          );
          setcetakTGfungsiEndokrin(
            res.data.result[0].assesmentDetail.tandaGejala.fungsiEndokrin
          );
          setcetakTGkonsepDiriDanKognitif(
            res.data.result[0].assesmentDetail.tandaGejala.konsepDiriDanKognitif
          );
          setcetakTGfungsiPeran(
            res.data.result[0].assesmentDetail.tandaGejala.fungsiPeran
          );
          setcetakTGpolaToleransiKopingStress(
            res.data.result[0].assesmentDetail.tandaGejala
              .polaToleransiKopingStress
          );
          setcetakTGseksualReproduksi(
            res.data.result[0].assesmentDetail.tandaGejala.seksualReproduksi
          );
          setcetakTGpolaNilaiKepercayaan(
            res.data.result[0].assesmentDetail.tandaGejala.polaNilaiKepercayaan
          );
          setspinCetakAssesment(false);
          setSpin(false);
          // setvisibleCteakAssesment(true);
        } else {
          setspinCetakAssesment(false);
          setSpin(false);
          message.warning("Lengkapi Assesment Awal Terlebih Dahulu!");
        }
      })
      .catch((err) => {
        setSpin(false);
        message.error(err);
      });
  };

  const getCetakAssesmentHD = (noreg, tgl, flag) => {
    console.log(noreg, tgl, flag);
    setSpin(true);
    axios
      .get(
        `${apiku}/Askep/Assesment/GetAssesmentbyDate/${noreg}/${tgl}/${flag}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          // console.log('data cetak', res.data.result.assesmentDetail.tandaGejala.respirasi.map((e) => (e.Deskripsi)));
          // setcetakassesmentDetailTG(res.data.result.assesmentDetail.tandaGejala);
          setcetakUserTtd(
            "data:image/jpeg;base64," + res.data.result[0].tandaTangan
          );
          setcetakUserCetak(res.data.result[0].userId);
          setcetakregistrasiId(res.data.result[0].registrasiId);
          setcetakpasienId(res.data.result[0].pasienId);
          setcetaknama(res.data.result[0].nama);
          setcetaktanggal(
            dayjs(res.data.result[0].tanggal).format("DD-MM-YYYY HH:mm")
          );
          setcetaknamaRuang(res.data.result[0].namaRuang);
          setcetakpegawaiId(res.data.result[0].pegawaiId);
          setcetakcaraMasuk(res.data.result[0].caraMasuk);
          setcetakasalMasuk(res.data.result[0].asalMasuk);
          setcetakriwayatAlergi(res.data.result[0].riwayatAlergi);
          setcetakriwayat(res.data.result[0].riwayat);
          setcetakriwayatGenetik(res.data.result[0].riwayatGenetik);
          setcetakkeluhan(res.data.result[0].keluhan);
          setcetakskalaNyeri(res.data.result[0].skalaNyeri);
          setcetakresikoJatuh(res.data.result[0].resikoJatuh);
          setcetaknutrisi(res.data.result[0].nutrisi);
          setcetakpps(res.data.result[0].pps);
          setcetakews(res.data.result[0].ews);
          setcetaklatchScore(res.data.result[0].latchScore);
          setcetakscoreDown(res.data.result[0].scoreDown);
          setcetakmeows(res.data.result[0].meows);
          setcetakassesmentDetail(res.data.result[0].assesmentDetail);
          setcetakcetakTTV(res.data.result[0].tandaVital);
          setcetakassesmentDetailTG(
            res.data.result[0].assesmentDetail.tandaGejala
              ? res.data.result[0].assesmentDetail.tandaGejala
              : null
          );
          //-----//
          setcetakTGrespirasi(
            res.data.result[0].assesmentDetail.tandaGejala.respirasi
              ? res.data.result[0].assesmentDetail.tandaGejala.respirasi
              : null
          );
          setcetakTGsirkulasi(
            res.data.result[0].assesmentDetail.tandaGejala.sirkulasi
              ? res.data.result[0].assesmentDetail.tandaGejala.sirkulasi
              : null
          );
          setcetakTGnutrisi(
            res.data.result[0].assesmentDetail.tandaGejala.nutrisi
              ? res.data.result[0].assesmentDetail.tandaGejala.nutrisi
              : null
          );
          setcetakTGeliminasi(
            res.data.result[0].assesmentDetail.tandaGejala.eliminasi
              ? res.data.result[0].assesmentDetail.tandaGejala.eliminasi
              : null
          );
          setcetakTGaktifitasDanIstirahat(
            res.data.result[0].assesmentDetail.tandaGejala.aktifitasDanIstirahat
              ? res.data.result[0].assesmentDetail.tandaGejala
                  .aktifitasDanIstirahat
              : null
          );
          setcetakTGproteksiDanPerlindungan(
            res.data.result[0].assesmentDetail.tandaGejala
              .proteksiDanPerlindungan
              ? res.data.result[0].assesmentDetail.tandaGejala
                  .proteksiDanPerlindungan
              : null
          );
          setcetakTGsensoriPersepsi(
            res.data.result[0].assesmentDetail.tandaGejala.sensoriPersepsi
              ? res.data.result[0].assesmentDetail.tandaGejala.sensoriPersepsi
              : null
          );
          setcetakTGcairanDanElektrolit(
            res.data.result[0].assesmentDetail.tandaGejala.cairanDanElektrolit
              ? res.data.result[0].assesmentDetail.tandaGejala
                  .cairanDanElektrolit
              : null
          );
          setcetakTGfungsiNeurologis(
            res.data.result[0].assesmentDetail.tandaGejala.fungsiNeurologis
              ? res.data.result[0].assesmentDetail.tandaGejala.fungsiNeurologis
              : null
          );
          setcetakTGfungsiEndokrin(
            res.data.result[0].assesmentDetail.tandaGejala.fungsiEndokrin
              ? res.data.result[0].assesmentDetail.tandaGejala.fungsiEndokrin
              : null
          );
          setcetakTGkonsepDiriDanKognitif(
            res.data.result[0].assesmentDetail.tandaGejala.konsepDiriDanKognitif
              ? res.data.result[0].assesmentDetail.tandaGejala
                  .konsepDiriDanKognitif
              : null
          );
          setcetakTGfungsiPeran(
            res.data.result[0].assesmentDetail.tandaGejala.fungsiPeran
              ? res.data.result[0].assesmentDetail.tandaGejala.fungsiPeran
              : null
          );
          setcetakTGpolaToleransiKopingStress(
            res.data.result[0].assesmentDetail.tandaGejala
              .polaToleransiKopingStress
              ? res.data.result[0].assesmentDetail.tandaGejala
                  .polaToleransiKopingStress
              : null
          );
          setcetakTGseksualReproduksi(
            res.data.result[0].assesmentDetail.tandaGejala.seksualReproduksi
              ? res.data.result[0].assesmentDetail.tandaGejala.seksualReproduksi
              : null
          );
          setcetakTGpolaNilaiKepercayaan(
            res.data.result[0].assesmentDetail.tandaGejala.polaNilaiKepercayaan
              ? res.data.result[0].assesmentDetail.tandaGejala
                  .polaNilaiKepercayaan
              : null
          );
          setspinCetakAssesment(false);
          setSpin(false);
          // setvisibleCteakAssesment(true);
        } else {
          setspinCetakAssesment(false);
          setSpin(false);
          message.warning("Lengkapi Assesment Awal Terlebih Dahulu!");
        }
      })
      .catch((err) => {
        setSpin(false);
        message.error(err);
      });
  };

  const getAssNutrisi = (noreg) => {
    axios
      .get(` ${apiku}/Nutrisi/GetByRegistrasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result[0] === undefined ||
            res.data.result[0].length === 0
          ) {
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
          } else {
            setmetodeNutrisi(res.data.result[0].metode);
            setidPantuannutrisi(res.data.result[0].id);
            // console.log(res.data.result[0].id);
            setpenurunanBbdewasa(res.data.result[0].penurunanBbdewasa);
            setjumlahPenurunanBb(res.data.result[0].jumlahPenurunanBb);
            setasupanMakanDewasa(res.data.result[0].asupanMakanDewasa);
            setpasienDiagnosisKhusus(res.data.result[0].pasienDiagnosisKhusus);
            setkurusAnak(res.data.result[0].kurusAnak);
            setpenurunanBbanak(res.data.result[0].penurunanBbanak);
            setdiareAnak(res.data.result[0].diareAnak);
            setpenyakitBeresikoAnak(res.data.result[0].penyakitBeresikoAnak);
          }
        } else {
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
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getAssTTV = (noreg) => {
    axios
      .get(` ${apiku}/EmrTandaVital/GetAllById/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result[0] === undefined ||
            res.data.result[0].length === 0
          ) {
            setTandaVitalId(0);
            setgcsMata(4);
            setgcsSuara(5);
            setgcsGerakan(6);
            settekananDarahSistolik("");
            settekananDarahDiastolik("");
            setsuhuTubuh("");
            setfrekuensiNadi("");
            setfrekuensiNafas("");
            setTglTTV(dayjs());
            settingkatKesadaranId("");
            settingkatKesadaran("");
            setiramaNadi("Teratur");
            setsaturasiOksigen("");
            settinggiBadan("");
            setberatBadan("");
            setEtermitas("");
          } else {
            setTandaVitalId(res.data.result[0].tandaVitalId);
            setgcsMata(res.data.result[0].gcsMata);
            setgcsSuara(res.data.result[0].gcsSuara);
            setgcsGerakan(res.data.result[0].gcsGerakan);
            settekananDarahSistolik(res.data.result[0].tekananDarahSistolik);
            settekananDarahDiastolik(res.data.result[0].tekananDarahDiastolik);
            setsuhuTubuh(res.data.result[0].suhuTubuh);
            setfrekuensiNadi(res.data.result[0].frekuensiNadi);
            setfrekuensiNafas(res.data.result[0].frekuensiNafas);
            setTglTTV(dayjs(res.data.result[0].tanggal));
            settingkatKesadaranId(res.data.result[0].tingkatKesadaranId);
            setiramaNadi(res.data.result[0].iramaNadi);
            setsaturasiOksigen(res.data.result[0].saturasiOksigen);
            settinggiBadan(res.data.result[0].tinggiBadan);
            setberatBadan(res.data.result[0].beratBadan);
          }
        } else {
          setTandaVitalId(0);
          setgcsMata(4);
          setgcsSuara(5);
          setgcsGerakan(6);
          settekananDarahSistolik("");
          settekananDarahDiastolik("");
          setsuhuTubuh("");
          setfrekuensiNadi("");
          setfrekuensiNafas("");
          setTglTTV(dayjs());
          settingkatKesadaranId("");
          settingkatKesadaran("");
          setiramaNadi("Teratur");
          setsaturasiOksigen("");
          settinggiBadan("");
          setberatBadan("");
          setEtermitas("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };
  const getAssSkorDown = (noreg) => {
    axios
      .get(` ${apiku}/PantauanScoreDown/GetByRegistrasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result[0] === undefined ||
            res.data.result[0].length === 0
          ) {
            setskorDownId(0);
            setskordownNafas("");
            setskordownRetraksi("");
            setskordownSianosis("");
            setskordownAirEntry("");
            setskordownMerintih("");
          } else {
            setskorDownId(res.data.result[0].Id);
            setskordownNafas(res.data.result[0].FrekuensiNafas);
            setskordownRetraksi(res.data.result[0].Retraksi);
            setskordownSianosis(res.data.result[0].Sianosis);
            setskordownAirEntry(res.data.result[0].AirEntry);
            setskordownMerintih(res.data.result[0].Merintih);
          }
        } else {
          setskorDownId(0);
          setskordownNafas("");
          setskordownRetraksi("");
          setskordownSianosis("");
          setskordownAirEntry("");
          setskordownMerintih("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getAssSkorDowntgl = (noreg, tgl) => {
    axios
      .get(` ${apiku}/PantauanScoreDown/Read/${noreg}/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setskorDownId(res.data.result.Id);
          setskordownNafas(res.data.result.FrekuensiNafas);
          setskordownRetraksi(res.data.result.Retraksi);
          setskordownSianosis(res.data.result.Sianosis);
          setskordownAirEntry(res.data.result.AirEntry);
          setskordownMerintih(res.data.result.Merintih);
        } else {
          setskorDownId(0);
          setskordownNafas("");
          setskordownRetraksi("");
          setskordownSianosis("");
          setskordownAirEntry("");
          setskordownMerintih("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getAssLatchSkore = (noreg) => {
    axios
      .get(` ${apiku}/PantauanLatchScore/GetByRegistrasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result[0] === undefined ||
            res.data.result[0].length === 0
          ) {
            setlatchSkorId(0);
            setlatchscoreL("");
            setlatchscoreA("");
            setlatchscoreT("");
            setlatchscoreC("");
            setlatchscoreH("");
          } else {
            setlatchSkorId(res.data.result[0].Id);
            setlatchscoreL(res.data.result[0].Latch);
            setlatchscoreA(res.data.result[0].AudibleSwalling);
            setlatchscoreT(res.data.result[0].TipePuting);
            setlatchscoreC(res.data.result[0].Comfort);
            setlatchscoreH(res.data.result[0].Help);
          }
        } else {
          setlatchSkorId(0);
          setlatchscoreL("");
          setlatchscoreA("");
          setlatchscoreT("");
          setlatchscoreC("");
          setlatchscoreH("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const insertTTVAssesment = (datatandavital, datanyeri, dataresikojatuh) => {
    setSpin(true);
    axios
      .post(`${apiku}/Nyeri/Create`, datanyeri)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // message.success('Berhasil Disimpan nyeri!');
          axios
            .post(`${apiku}/ResikoJatuh/Create`, dataresikojatuh)
            .then((res) => {
              if (res.data.statusCode === 200) {
                //message.success('Berhasil Disimpan! resiko jatuh');
                axios
                  .post(`${apiku}/EmrTandaVital`, datatandavital)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      getAssTTV(datatandavital.registrasiId);
                      // getTTVAllBynoreg(datatandavital.registrasiId);
                      // getGravikTTV(datatandavital.registrasiId);
                      setSpin(false);
                      cekAssementTombol(datatandavital.registrasiId);
                      message.success("Berhasil Menyimpan Tanda Vital!");
                      message.info("Silahkan Lanjut Mengisi Assesment Utama");
                    } else {
                      setSpin(false);
                      console.log("tidak dapat menyimpan");
                    }
                  });
              } else {
                setSpin(false);
                console.log("tidak dapat menyimpan");
                message.error("Gagal Disimpan Resiko Jatuh!");
              }
            });
        } else {
          setSpin(false);
          console.log("tidak dapat menyimpan");
          message.error("Gagal DisimpanSkor Nyeri!");
        }
      })
      .catch((errors) => {
        setSpin(false);
        console.log(errors);
        //message.error('Gagal Disimpan!');
        console.log(datatandavital);
        message.error("Error Simpan Tanda Vital!");
      });
  };

  const insertTTVAssesmentdanKeluhan = (
    datatandavital,
    datanyeri,
    dataResikoJatuh,
    dataKeluhan,
    dataPantuanNutrisi,
    dataEWS,
    datadetailTGejala
  ) => {
    axios
      .post(`${apiku}/Nyeri/Create`, datanyeri)
      .then((res) => {
        if (res.data.statusCode === 200) {
          axios
            .post(`${apiku}/ResikoJatuh/Create`, dataResikoJatuh)
            .then((res) => {
              if (res.data.statusCode === 200) {
                axios
                  .post(`${apiku}/EmrTandaVital/Ri`, datatandavital)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      getTTVAssByRuang(
                        datatandavital.registrasiId,
                        datatandavital.ruangId,
                        datatandavital.jam
                      );
                      // getTTVAllBynoreg(datatandavital.registrasiId);
                      //getGravikTTV(datatandavital.registrasiId);
                      axios
                        .post(` ${apiku}/Nutrisi/Create`, dataPantuanNutrisi)
                        .then((res) => {
                          if (res.data.statusCode === 200) {
                            getNutrisiAssByRuang(
                              dataPantuanNutrisi.registrasiId,
                              dataPantuanNutrisi.ruangId,
                              dataPantuanNutrisi.tanggal
                            );
                            axios
                              .post(`${apiku}/Ews/Create`, dataEWS)
                              .then((res) => {
                                if (res.data.statusCode === 200) {
                                  axios
                                    .post(
                                      `${apiku}/Askep/Assesment/Create`,
                                      dataKeluhan
                                    )
                                    .then((res) => {
                                      if (res.data.statusCode === 200) {
                                        axios
                                          .post(
                                            `${apiku}/Askep/Assesment/CreateDetail`,
                                            datadetailTGejala
                                          )
                                          .then((res) => {
                                            if (res.data.statusCode === 200) {
                                              setSpin(false);
                                              cekAssementTombol(
                                                datadetailTGejala.registrasiId,
                                                dataKeluhan.flag
                                              );
                                              message.success(
                                                "Berhasil Disimpan!"
                                              );
                                            } else {
                                              setSpin(false);
                                              // console.log('tidak dapat menyimpan');
                                              sendTele(
                                                "3",
                                                "Askep/Assesment/CreateDetail",
                                                JSON.stringify(res.data),
                                                ip,
                                                namauser,
                                                curpasRI.namaPasien,
                                                curpasRI.ruangDeskripsi,
                                                JSON.stringify(
                                                  datadetailTGejala
                                                )
                                              );
                                              Modal.warning({
                                                title: "Gagal Menyimpan Data!",
                                                content: JSON.stringify(
                                                  res.data
                                                ),
                                              });
                                            }
                                          });
                                      } else {
                                        setSpin(false);
                                        // console.log('isish eror', dataKeluhan)
                                        sendTele(
                                          "3",
                                          "/Askep/Assesment/Create",

                                          JSON.stringify(res.data),
                                          ip,
                                          namauser,
                                          curpasRI.namaPasien,
                                          curpasRI.ruangDeskripsi,
                                          JSON.stringify(dataKeluhan)
                                        );
                                        Modal.warning({
                                          title: "Gagal Menyimpan Data!",
                                          content: JSON.stringify(res.data),
                                        });
                                      }
                                    });
                                } else {
                                  setSpin(false);
                                  sendTele(
                                    "3",
                                    "/Ews/Create",
                                    JSON.stringify(res.data),
                                    ip,
                                    namauser,
                                    curpasRI.namaPasien,
                                    curpasRI.ruangDeskripsi,
                                    JSON.stringify(dataEWS)
                                  );
                                  Modal.warning({
                                    title: "Gagal Menyimpan Data!",
                                    content: JSON.stringify(res.data),
                                  });
                                }
                              });
                          } else {
                            setSpin(false);
                            sendTele(
                              "3",
                              "/Nutrisi/Create",
                              JSON.stringify(res.data),
                              ip,
                              namauser,
                              curpasRI.namaPasien,
                              curpasRI.ruangDeskripsi,
                              JSON.stringify(dataPantuanNutrisi)
                            );
                            Modal.warning({
                              title: "Gagal Menyimpan Data!",
                              content: JSON.stringify(res.data),
                            });
                          }
                        });
                    } else {
                      setSpin(false);
                      console.log(datatandavital);
                      sendTele(
                        "3",
                        "/EmrTandaVital",
                        JSON.stringify(res.data),
                        ip,
                        namauser,
                        curpasRI.namaPasien,
                        curpasRI.ruangDeskripsi,
                        JSON.stringify(datatandavital)
                      );
                      Modal.warning({
                        title: "Gagal Menyimpan Data!",
                        content: JSON.stringify(res.data),
                      });
                    }
                  });
              } else {
                setSpin(false);
                sendTele(
                  "3",
                  "/ResikoJatuh/Create",
                  JSON.stringify(res.data),
                  ip,
                  namauser,
                  curpasRI.namaPasien,
                  curpasRI.ruangDeskripsi,
                  JSON.stringify(dataResikoJatuh)
                );
                Modal.warning({
                  title: "Gagal Menyimpan Data!",
                  content: JSON.stringify(res.data),
                });
              }
            });
        } else {
          setSpin(false);
          sendTele(
            "3",
            "Nyeri/create",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(datanyeri)
          );
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((errors) => {
        setSpin(false);
        message.error("Error Tidak Terhubung Ke Server!!!");
      });
  };

  const insertAssesmentRi = (
    datatandavital,
    datanyeri,
    dataResikoJatuh,
    dataKeluhan,
    dataPantuanNutrisi,
    datadetailTGejala
  ) => {
    setLoad(true);
    console.log(
      datatandavital,
      datanyeri,
      dataResikoJatuh,
      dataKeluhan,
      dataPantuanNutrisi,
      datadetailTGejala
    );
    axios
      .post(`${apiku}/Nyeri/Create`, datanyeri)
      .then((res) => {
        if (res.data.statusCode === 200) {
          axios
            .post(`${apiku}/ResikoJatuh/Create`, dataResikoJatuh)
            .then((res) => {
              if (res.data.statusCode === 200) {
                axios
                  .post(`${apiku}/EmrTandaVital/Ri`, datatandavital)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      getTTVAssByRuang(
                        datatandavital.registrasiId,
                        datatandavital.ruangId,
                        datatandavital.jam
                      );
                      // getTTVAllBynoreg(datatandavital.registrasiId);
                      //getGravikTTV(datatandavital.registrasiId);
                      axios
                        .post(` ${apiku}/Nutrisi/Create`, dataPantuanNutrisi)
                        .then((res) => {
                          if (res.data.statusCode === 200) {
                            getNutrisiAssByRuang(
                              dataPantuanNutrisi.registrasiId,
                              dataPantuanNutrisi.ruangId,
                              dataPantuanNutrisi.tanggal
                            );

                            axios
                              .post(
                                `${apiku}/Askep/Assesment/Create`,
                                dataKeluhan
                              )
                              .then((res) => {
                                if (res.data.statusCode === 200) {
                                  axios
                                    .post(
                                      `${apiku}/Askep/Assesment/CreateDetail`,
                                      datadetailTGejala
                                    )
                                    .then((res) => {
                                      if (res.data.statusCode === 200) {
                                        cekAssementTombol(
                                          datadetailTGejala.registrasiId,
                                          dataKeluhan.flag
                                        );
                                        Modal.success({
                                          content:
                                            "Berhasil Simpan Data Asesmen Awal!",
                                          onOk() {
                                            setLoad(false);
                                          },
                                        });
                                      } else {
                                        setLoad(false);
                                        // console.log('tidak dapat menyimpan');
                                        sendTele(
                                          "3",
                                          "/Askep/Assesment/CreateDetail",
                                          JSON.stringify(res.data),
                                          ip,
                                          namauser,
                                          curpasRI.namaPasien,
                                          curpasRI.ruangDeskripsi,
                                          JSON.stringify(datadetailTGejala)
                                        );

                                        Modal.warning({
                                          title: "Gagal Menyimpan Data!",
                                          content: JSON.stringify(res.data),
                                        });
                                      }
                                    });
                                } else {
                                  setLoad(false);
                                  // console.log('isish eror', dataKeluhan)
                                  sendTele(
                                    "3",
                                    "/Askep/Assesment/Create",
                                    JSON.stringify(res.data),
                                    ip,
                                    namauser,
                                    curpasRI.namaPasien,
                                    curpasRI.ruangDeskripsi,
                                    JSON.stringify(dataKeluhan)
                                  );

                                  Modal.warning({
                                    title: "Gagal Menyimpan Data!",
                                    content: JSON.stringify(res.data),
                                  });
                                }
                              });
                          } else {
                            setLoad(false);
                            sendTele(
                              "3",
                              "/Nutrisi/Create",
                              JSON.stringify(res.data),
                              ip,
                              namauser,
                              curpasRI.namaPasien,
                              curpasRI.ruangDeskripsi,
                              JSON.stringify(dataPantuanNutrisi)
                            );

                            Modal.warning({
                              title: "Gagal Menyimpan Data!",
                              content: JSON.stringify(res.data),
                            });
                          }
                        });
                    } else {
                      setLoad(false);
                      console.log(datatandavital);
                      sendTele(
                        "3",
                        "/EmrTandaVital/Ri",
                        JSON.stringify(res.data),
                        ip,
                        namauser,
                        curpasRI.namaPasien,
                        curpasRI.ruangDeskripsi,
                        JSON.stringify(datatandavital)
                      );

                      Modal.warning({
                        title: "Gagal Menyimpan Data!",
                        content: JSON.stringify(res.data),
                      });
                    }
                  });
              } else {
                setLoad(false);
                sendTele(
                  "3",
                  "/ResikoJatuh/Create",
                  JSON.stringify(res.data),
                  ip,
                  namauser,
                  curpasRI.namaPasien,
                  curpasRI.ruangDeskripsi,
                  JSON.stringify(dataResikoJatuh)
                );

                Modal.warning({
                  title: "Gagal Menyimpan Data!",
                  content: JSON.stringify(res.data),
                });
              }
            });
        } else {
          setLoad(false);
          sendTele(
            "3",
            "Nyeri/Create",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(datanyeri)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((errors) => {
        setLoad(false);
        message.error("Error Tidak Terhubung Ke Server!!!");
      });
  };

  const insertTTVAssesmentdanKeluhanHD = (
    datatandavital,
    datanyeri,
    dataResikoJatuh,
    dataKeluhan,
    dataPantuanNutrisi,
    dataEWS
  ) => {
    axios
      .post(`${apiku}/Nyeri/Create`, datanyeri)
      .then((res) => {
        if (res.data.statusCode === 200) {
          axios
            .post(`${apiku}/ResikoJatuh/Create`, dataResikoJatuh)
            .then((res) => {
              if (res.data.statusCode === 200) {
                axios
                  .post(`${apiku}/EmrTandaVital`, datatandavital)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      getTTVAssByRuang(datatandavital.registrasiId);
                      // getTTVAllBynoreg(datatandavital.registrasiId);
                      //getGravikTTV(datatandavital.registrasiId);
                      axios
                        .post(` ${apiku}/Nutrisi/Create`, dataPantuanNutrisi)
                        .then((res) => {
                          if (res.data.statusCode === 200) {
                            getNutrisiAssByRuang(
                              dataPantuanNutrisi.registrasiId
                            );
                            axios
                              .post(`${apiku}/Ews/Create`, dataEWS)
                              .then((res) => {
                                if (res.data.statusCode === 200) {
                                  axios
                                    .post(
                                      `${apiku}/Askep/Assesment/Create`,
                                      dataKeluhan
                                    )
                                    .then((res) => {
                                      if (res.data.statusCode === 200) {
                                        setSpin(false);
                                        message.success("Berhasil Disimpan!");
                                      } else {
                                        setSpin(false);
                                        message.error(
                                          "Gagal Disimpan Assesment!"
                                        );
                                        console.log("isish eror", dataKeluhan);
                                      }
                                    });
                                } else {
                                  setSpin(false);
                                  message.error("Gagal Disimpan EWS!");
                                }
                              });
                          } else {
                            setSpin(false);
                            message.error("Gagal Disimpan Nutrisi!");
                          }
                        });
                    } else {
                      setSpin(false);
                      console.log(datatandavital);
                      message.error("Gagal Disimpan Tanda Vital!");
                    }
                  });
              } else {
                setSpin(false);
                message.error("Gagal Disimpan Resiko Jatuh!");
              }
            });
        } else {
          setSpin(false);
          message.error("Gagal Disimpan Skor Nyeri!");
        }
      })
      .catch((errors) => {
        setSpin(false);
        message.error("Error Tidak Terhubung Ke Server!!!");
      });
  };

  const insertKeluhanASS = (dataKeluahan, dataNutrisi, dataEWS) => {
    // setSpin(true);
    axios
      .post(` ${apiku}/Nutrisi/Create`, dataNutrisi)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // message.success('Berhasil Disimpan Nutrisi!');
          // setvisibleNutrisi(false);
          axios.post(`${apiku}/Ews/Create`, dataEWS).then((res) => {
            if (res.data.statusCode === 200) {
              // console.log(res.data.result);
              // message.success('Berhasil Disimpan EWS!');
              // setvisibleEws(false);
              axios
                .post(`${apiku}/Askep/Assesment/Create`, dataKeluahan)
                .then((res) => {
                  if (res.data.statusCode === 200) {
                    getAssNutrisi(dataNutrisi.registrasiId);
                    // getGrafikEWS(dataNutrisi.registrasiId);
                    // getEwsAll(dataNutrisi.registrasiId);
                    // console.log(res.data.result);
                    // setSpin(false);
                    cekAssementTombol(dataKeluahan.registrasiId);
                    message.success("Berhasil Disimpan!");
                    message.info(
                      "Silahkan Lanjut Mengisi Assesment Tanda Gejala"
                    );
                  } else {
                    // setSpin(false);
                    message.error("Gagal Disimpan!");
                  }
                });
            } else {
              // setSpin(false);
              // console.log('tidak dapat menyimpan');
              message.error("Gagal Disimpan EWS!");
            }
          });
        } else {
          // setSpin(false);
          // console.log('tidak dapat menyimpan', dataNutrisi);
          message.error("Gagal Disimpan Nutrisi!");
        }
      })
      .catch((err) => {
        // setSpin(false);
        message.error("Error Saat Menyimpan Data");
      });
  };

  const insertskalanyeri = (datanyeri) => {
    axios
      .post(`${apiku}/Nyeri/Create`, datanyeri)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          var y = 0;
          for (var i = 0; i < datanyeri.detailNyeri.length; i++)
            y += datanyeri.detailNyeri[i].value;
          // console.log(y);
          message.success("Berhasil Menyimpan Skor Nyeri!");
          setskorNyeri(y);
          setvisibleNyeri(false);
        } else {
          // console.log('tidak dapat menyimpan');
          message.error("Gagal DisimpanSkor Nyeri!");
        }
      })
      .catch((errors) => {
        // console.log(errors);
        message.error("Error!");
      });
  };

  const insertResikoJatuh = (dataresikojatuh) => {
    axios
      .post(`${apiku}/ResikoJatuh/Create`, dataresikojatuh)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // var y = 0;
          // for (var i = 0; i < (dataresikojatuh.detailResikoJatuh.length); i++)
          //     y += (dataresikojatuh.detailResikoJatuh[i].value);

          // setskorResikoJatuh(y);
          // console.log('ini total resiko jatuh', y);
          message.success("Berhasil Disimpan Resiko Jatuh!");
          setvisibleJatuh(false);
        } else {
          // console.log('tidak dapat menyimpan');
          message.error("Gagal Disimpan Resiko Jatuh!");
        }
      })
      .catch((errors) => {
        // console.log(errors);
        message.error("Error!");
      });
  };

  const insertEWS = (dataEWS) => {
    axios
      .post(`${apiku}/Ews/Create`, dataEWS)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan EWS!");
          setvisibleEws(false);
        } else {
          sendTele(
            "3",
            "EmrPemeriksaanFisik/RawatInap",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataEWS)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((errors) => {
        // console.log(errors);
        message.error("Error!");
      });
  };

  const insertMEOWS = (dataMeows) => {
    axios
      .post(`${apiku}/PantauanMeows/Create`, dataMeows)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan MEOWS!");
          setvisibleMeows(false);
        } else {
          sendTele(
            "3",
            "EmrPemeriksaanFisik/RawatInap",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataMeows)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const insertLatchScore = (dataLatchScore) => {
    axios
      .post(`${apiku}/PantauanLatchScore/Create`, dataLatchScore)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getAssLatchSkore(dataLatchScore.registrasiId);
          console.log(res.data.result);
          message.success("Berhasil Disimpan LATCHSCORE!");
          setvisibleLatch(false);
        } else {
          sendTele(
            "3",
            "EmrPemeriksaanFisik/RawatInap",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataLatchScore)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const insertSkorDown = (dataSkorDown) => {
    axios
      .post(`${apiku}/PantauanScoreDown/Create`, dataSkorDown)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // getAssSkorDown(dataSkorDown.registrasiId);
          console.log(res.data.result);
          message.success("Berhasil Disimpan Skor Down!");
          setvisibleSkorDown(false);
        } else {
          sendTele(
            "3",
            "EmrPemeriksaanFisik/RawatInap",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataSkorDown)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const insertSkorDownnew = (dataSkorDown) => {
    axios
      .post(`${apiku}/PantauanScoreDown/CreateNew`, dataSkorDown)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // getAssSkorDown(dataSkorDown.registrasiId);
          console.log(res.data.result);
          message.success("Berhasil Disimpan Skor Down!");
          setvisibleSkorDown(false);
        } else {
          sendTele(
            "3",
            "EmrPemeriksaanFisik/RawatInap",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataSkorDown)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const insertPantuanutrisi = (dataNutrisi) => {
    axios
      .post(` ${apiku}/Nutrisi/Create`, dataNutrisi)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getAssNutrisi(dataNutrisi.registrasiId);
          // const y = nutrisi1 + nutrisi2 + nutrisi3 + nutrisi4;
          // settotalnutrisi(y);
          // console.log('datanutrisi di ws', dataNutrisi);
          message.success("Berhasil Disimpan Nutrisi!");
          setvisibleNutrisi(false);
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal Disimpan Nutrisi!");
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const insertPantuanEdukasi = (dataedukasi) => {
    axios
      .post(`${apiku}/EdukasiPasien/Create`, dataedukasi)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal Disimpan!", res.data.result);
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const insertAssesmentTGejala = (dataTGejala) => {
    setSpin(true);
    axios
      .post(`${apiku}/Askep/Assesment/CreateDetail`, dataTGejala)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setSpin(false);
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
          cekAssementTombol(dataTGejala.registrasiId);
        } else {
          setSpin(false);
          console.log("tidak dapat menyimpan");
          message.error("Gagal Disimpan!", res.data.result);
        }
      })
      .catch((errors) => {
        setSpin(false);
        console.log(errors);
        message.error("Error Saat Simpan!");
      });
  };

  return (
    <AssesmentRIContext.Provider
      value={{
        // insertKeluhan,
        // getKeluhanByregId,
        spingetTTVAssByRuang,
        setspingetTTVAssByRuang,

        insertTTVAssesmentdanKeluhan,
        tanggalKeluhan,
        settanggalKeluhan,
        caraMasuk,
        setcaraMasuk,
        asalMasuk,
        setasalMasuk,
        riwayatAlergi,
        setriwayatAlergi,
        riwayat,
        setriwayat,
        riwayatGenetik,
        setriwayatGenetik,
        ppsId,
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
        // getKeluhanByregIdRuangId,
        // kosongkanformanamnesari,

        getPPSByID,
        ppsAmbulansi,
        setppsAmbulansi,
        ppsAktivitas,
        setppsAktivitas,
        ppsPerawatanDiri,
        setppsPerawatanDiri,
        ppsAsupan,
        setppsAsupan,
        ppsTingkatKesadaran,
        setppsTingkatKesadaran,
        ppsKesimpulan,
        setppsKesimpulan,

        visibleNyeri,
        setvisibleNyeri,
        visibleJatuh,
        setvisibleJatuh,
        visibleNutrisi,
        setvisibleNutrisi,
        visibleEws,
        setvisibleEws,
        visibleMeows,
        setvisibleMeows,
        visibleSkorDown,
        setvisibleSkorDown,
        visibleLatch,
        setvisibleLatch,
        visibleBartelIndex,
        setvisibleBartelIndex,
        visibleAktivitasLatihan,
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
        insertKeluhanASS,

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
        insertAssesmentTGejala,

        assTdrespirasi,
        setAssTdrespirasi,
        assTdrr,
        setAssTdrr,
        assTdpemeriksaanRespirasi,
        setAssTdpemeriksaanRespirasi,
        assTdsirkulasi,
        setAssTdsirkulasi,
        assTdtekananDarahSistolik,
        setAssTdtekananDarahSistolik,
        assTdtekananDarahDiastolik,
        setAssTdtekananDarahDiastolik,
        assTdfrekuensiNadi,
        setAssTdfrekuensiNadi,
        assTdekstremitas,
        setAssTdekstremitas,
        assTdpemeriksaanSirkulasi,
        setAssTdpemeriksaanSirkulasi,
        assTdnutrisi,
        setAssTdnutrisi,
        assTdscoreNutrisi,
        setAssTdscoreNutrisi,
        assTdkesimpulanNutrisi,
        setAssTdkesimpulanNutrisi,
        assTdhasilPengkajian,
        setAssTdhasilPengkajian,
        assTdtinggiBadan,
        setAssTdtinggiBadan,
        assTdberatBadan,
        setAssTdberatBadan,
        assTdimt,
        setAssTdimt,
        assTdpemeriksaanNutrisi,
        setAssTdpemeriksaanNutrisi,
        assTdeliminasi,
        setAssTdeliminasi,
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
        assTdaktifitas,
        setAssTdaktifitas,
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
        assTdproteksi,
        setAssTdproteksi,
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
        assTdsensori,
        setAssTdsensori,
        assTdkesadaran,
        setAssTdkesadaran,
        assTdgcsMata,
        setAssTdgcsMata,
        assTdgcsSuara,
        setAssTdgcsSuara,
        assTdgcsGerakan,
        setAssTdgcsGerakan,
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
        assTdcairanElektrolit,
        setAssTdcairanElektrolit,
        assTdiwl,
        setAssTdiwl,
        assTdderajatEdema,
        setAssTdderajatEdema,
        assTdpemeriksaanCairanElektrolit,
        setAssTdpemeriksaanCairanElektrolit,
        assTdfungsiNeurologis,
        setAssTdfungsiNeurologis,
        assTdpemeriksaanNeurologis,
        setAssTdpemeriksaanNeurologis,
        assTdfungsiEndokrin,
        setAssTdfungsiEndokrin,
        assTdpemeriksaanEndokrin,
        setAssTdpemeriksaanEndokrin,
        assTdkonsepDiri,
        setAssTdkonsepDiri,
        assTdpengetahuanPenyakit,
        setAssTdpengetahuanPenyakit,
        assTdpengetahuanPerawatan,
        setAssTdpengetahuanPerawatan,
        assTdscoreKonsepDiri,
        setAssTdscoreKonsepDiri,
        assTdpemeriksaanKonsepDiri,
        setAssTdpemeriksaanKonsepDiri,
        assTdfungsiPeran,
        setAssTdfungsiPeran,
        assTdhubunganPeran,
        setAssTdhubunganPeran,
        assTdperanKeluarga,
        setAssTdperanKeluarga,
        assTdpemeriksaanFungsiPeran,
        setAssTdpemeriksaanFungsiPeran,
        assTdpolaToleransi,
        setAssTdpolaToleransi,
        assTdkoping,
        setAssTdkoping,
        assTdpenyelesaianMasalah,
        setAssTdpenyelesaianMasalah,
        assTdpemeriksaanPolaToleransi,
        setAssTdpemeriksaanPolaToleransi,
        assTdseksualReproduksi,
        setAssTdseksualReproduksi,
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
        assTdkebiasaanIbadah,
        setAssTdkebiasaanIbadah,
        assTdkepercayaanKesehatan,
        setAssTdkepercayaanKesehatan,
        assTdlainlain,
        setAssTdlainlain,
        assTdpemeriksaanNilaiKepercayaan,
        setAssTdpemeriksaanNilaiKepercayaan,

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

        metodeNutrisi,
        setmetodeNutrisi,
        insertPantuanutrisi,
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
        asupanMakanObstetri,
        setasupanMakanObstetri,
        gangguanMetabolismeObstetri,
        setgangguanMetabolismeObstetri,
        penambahanBbobstetri,
        setpenambahanBbobstetri,
        hbHctObstetri,
        sethbHctObstetri,

        ppsAmbulasi,
        setppsAmbulasi,
        ppsAktifitas,
        setppsAktifitas,
        ppsPerawatan,
        setppsPerawatan,
        ppsAsupan,
        setppsAsupan,
        ppsKesadaran,
        setppsKesadaran,

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
        // ewsTotal, setewsTotal,
        insertEWS,

        meowsId,
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
        insertMEOWS,

        skorDownId,
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
        insertSkorDown,

        latchSkorId,
        latchscoreL,
        setlatchscoreL,
        latchscoreA,
        setlatchscoreA,
        latchscoreT,
        setlatchscoreT,
        latchscoreC,
        setlatchscoreC,
        latchscoreH,
        setlatchscoreH,
        insertLatchScore,

        assKepercayaan,
        setassKepercayaan,
        assPendidikan,
        setassPendididkan,
        assKomunikasi,
        setassKomunikasi,
        assBahasa,
        setassBahasa,
        assPenerjemah,
        setassPenerjemah,
        assEdukasi,
        setassEdukasi,
        assInformasi,
        setassInformasi,
        assSasaranEdukasi,
        setassSasaranEdukasi,
        assMetodeEdukasi,
        setassMetodeEdukasi,
        assEvaluasiEdukasi,
        setassEvaluasiEdukasi,
        insertPantuanEdukasi,

        anamnesa,
        setAnamnesa,
        keluhanUtama,
        setKeluhanUtama,
        keluhanTambahan,
        setKeluhanTambahan,
        riyawatPenyakitSekarang,
        setriyawatPenyakitSekarang,
        riwayatPenyakitTerdahulu,
        setriwayatPenyakitTerdahulu,
        riwayatPenyakitKeluarga,
        setriwayatPenyakitKeluarga,
        keteranganKeluarga,
        setketeranganKeluarga,

        assKhususAnak,
        setassKhususAnak,
        assLansia,
        setassLansia,
        assKonsepDiri,
        setassKonsepDiri,
        assAnsietas,
        setassAnsietas,
        assStres,
        setassStres,
        assDepresi,
        setassDepresi,
        assAktifitasLatihan,
        setassAktifitasLatihan,

        spin,
        setSpin,
        visibleCteakAssesment,
        setvisibleCteakAssesment,
        spinCetakAssesment,
        setspinCetakAssesment,
        getCetakAssesment,
        getCetakAssesmentHD,
        cetakUserCetak,
        cetakUserTtd,
        cetakregistrasiId,
        cetakpasienId,
        cetaknama,
        cetaktanggal,
        cetaknamaRuang,
        cetakpegawaiId,
        cetakcaraMasuk,
        cetakasalMasuk,
        cetakriwayatAlergi,
        cetakriwayat,
        cetakriwayatGenetik,
        cetakkeluhan,
        cetakskalaNyeri,
        cetakresikoJatuh,
        cetaknutrisi,
        cetakpps,
        cetakews,
        cetaklatchScore,
        cetakscoreDown,
        cetakmeows,
        cetakassesmentDetail,
        cetakassesmentDetailTG,
        cetakTTV,
        cetakTGrespirasi,
        setcetakTGrespirasi,
        cetakTGsirkulasi,
        setcetakTGsirkulasi,
        cetakTGnutrisi,
        setcetakTGnutrisi,
        cetakTGeliminasi,
        setcetakTGeliminasi,
        cetakTGaktifitasDanIstirahat,
        setcetakTGaktifitasDanIstirahat,
        cetakTGproteksiDanPerlindungan,
        setcetakTGproteksiDanPerlindungan,
        cetakTGsensoriPersepsi,
        setcetakTGsensoriPersepsi,
        cetakTGcairanDanElektrolit,
        setcetakTGcairanDanElektrolit,
        cetakTGfungsiNeurologis,
        setcetakTGfungsiNeurologis,
        cetakTGfungsiEndokrin,
        setcetakTGfungsiEndokrin,
        cetakTGkonsepDiriDanKognitif,
        setcetakTGkonsepDiriDanKognitif,
        cetakTGfungsiPeran,
        setcetakTGfungsiPeran,
        cetakTGpolaToleransiKopingStress,
        setcetakTGpolaToleransiKopingStress,
        cetakTGseksualReproduksi,
        setcetakTGseksualReproduksi,
        cetakTGpolaNilaiKepercayaan,
        setcetakTGpolaNilaiKepercayaan,

        getAssesmentById,
        getAssesmentResikoJatuh,
        getAssesmentMeows,
        getAssesmentDetailTG,
        setDefAssesmentDetailTG,
        getAssLatchSkore,
        getAssSkorDown,

        getAssementAssByRuang,
        getTTVAssByRuang,
        getNutrisiAssByRuang,
        getResikoJatuhByRegDate,
        getNyeriByRegDate,
        getEwsAssByRuang,
        insertTTVAssesmentdanKeluhanHD,

        getAssesmentRI,
        nilaiKritis,
        setnilaiKritis,
        insertAssesmentRi,
        insertSkorDownnew,
        getAssSkorDowntgl,
        getStatusKritis,
        load,
        setLoad,
      }}
    >
      {props.children}
    </AssesmentRIContext.Provider>
  );
};

export default AssesmentRIContextProvider;
