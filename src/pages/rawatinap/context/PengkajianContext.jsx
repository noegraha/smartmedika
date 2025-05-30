import React, { createContext, useState, useContext } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";

export const PengkajianContext = createContext();

const PengkajianContextProvider = (props) => {
  const [listBraden, setlistBraden] = useState([]);
  const [pengkajianBradenId, setpengkajianBradenId] = useState(0);
  const [flagBraden, setflagBraden] = useState("HARIAN"); //HARIAN, AWAL
  const [tglBraden, settglBraden] = useState(dayjs());
  const [persepsiSensori, setpersepsiSensori] = useState("");
  const [kelembaban, setkelembaban] = useState("");
  const [aktivitas, setaktivitas] = useState("");
  const [mobilitas, setmobilitas] = useState("");
  const [nutrisi, setnutrisi] = useState("");
  const [gesekan, setgesekan] = useState("");
  const [modalBraden, setmodalBraden] = useState(false);

  const [listDisfagia, setlistDisfagia] = useState([]);
  const [pengkajianDisfagiaId, setpengkajianDisfagiaId] = useState(0);
  const [tglDisfagia, settglDisfagia] = useState(dayjs());
  const [flagDisfagia, setflagDisfagia] = useState("HARIAN");
  const [kesadaranPasien, setkesadaranPasien] = useState("");
  const [afasia, setafasia] = useState("");
  const [merapatkanGigi, setmerapatkanGigi] = useState("");
  const [reflekMuntah, setreflekMuntah] = useState("");
  const [menelanAir, setmenelanAir] = useState("");
  const [berikanMinum, setberikanMinum] = useState("");
  const [ketDisfagia, setketDisfagia] = useState("");
  const [modalDisfagia, setmodalDisfagia] = useState(false);

  const [listMenelan, setlistMenelan] = useState([]);
  const [pengkajianMenelanId, setpengkajianMenelanId] = useState(0);
  const [tglMenelan, settglMenelan] = useState(dayjs());
  const [flagMenelan, setflagMenelan] = useState("HARIAN"); //HARIAN, AWAL
  const [kesadaran, setKesadaran] = useState("");
  const [suaraNafas, setSuaraNafas] = useState("");
  const [komprehensif, setKomprehensif] = useState("");
  const [bicara, setBicara] = useState("");
  const [motorikBibir, setMotorikBibir] = useState("");
  const [gerakanLidah, setGerakanLidah] = useState("");
  const [palatum, setPalatum] = useState("");
  const [reflekGag, setReflekGag] = useState("");
  const [fonasi, setFonasi] = useState("");
  const [batuk, setBatuk] = useState("");
  const [mengunyah, setMengunyah] = useState("");
  const [oral, setOral] = useState("");
  const [pharynx, setPharynx] = useState("");
  const [toleransiMenelan, setToleransiMenelan] = useState("");
  const [modalMenelan, setmodalMenelan] = useState(false);

  const [listNihss, setlistNihss] = useState([]);
  const [pengkajianNIHSSId, setpengkajianNIHSSId] = useState(0);
  const [tglNihss, settglNihss] = useState(dayjs());
  const [flagNihss, setflagNihss] = useState("HARIAN");
  const [tingkatKesadaran, settingkatKesadaran] = useState("");
  const [menjawabPertanyaan, setmenjawabPertanyaan] = useState("");
  const [mengikutiPerintah, setmengikutiPerintah] = useState("");
  const [gaze, setgaze] = useState("");
  const [visual, setvisual] = useState("");
  const [paresisWajah, setparesisWajah] = useState("");
  const [lenganKanan, setlenganKanan] = useState("");
  const [lenganKiri, setlenganKiri] = useState("");
  const [tungkaiKanan, settungkaiKanan] = useState("");
  const [tungkaiKiri, settungkaiKiri] = useState("");
  const [ataksia, setataksia] = useState("");
  const [sensorik, setsensorik] = useState("");
  const [kemampuanBahasa, setkemampuanBahasa] = useState("");
  const [disartria, setdisartria] = useState("");
  const [inatensi, setinatensi] = useState("");
  const [modalNihss, setmodalNihss] = useState(false);

  const [listOedema, setlistOedema] = useState([]);
  const [pengkajianOedemaId, setpengkajianOedemaId] = useState(0);
  const [tglOedema, settglOedema] = useState(dayjs());
  const [flagOedema, setflagOedema] = useState("HARIAN");
  const [nilaiOedema, setnilaiOedema] = useState("");
  const [modalOedema, setmodalOedema] = useState(false);

  const [listOtot, setlistOtot] = useState([]);
  const [pengkajianOtotId, setpengkajianOtotId] = useState(0);
  const [tglOtot, settglOtot] = useState(dayjs());
  const [flagOtot, setflagOtot] = useState("HARIAN");
  const [nilaiOtot, setnilaiOtot] = useState("");
  const [modalOtot, setmodalOtot] = useState(false);

  const [listSofa, setlistSofa] = useState([]);
  const [pengkajianSofaId, setpengkajianSofaId] = useState(0);
  const [tglSofa, settglSofa] = useState(dayjs());
  const [flagSofa, setflagSofa] = useState("HARIAN");
  const [respiratory, setrespiratory] = useState("");
  const [koagulasi, setkoagulasi] = useState("");
  const [heparBilirubin, setheparBilirubin] = useState("");
  const [kardiovaskular, setkardiovaskular] = useState("");
  const [sistemSarafPusat, setsistemSarafPusat] = useState("");
  const [renalKeratin, setrenalKeratin] = useState("");
  const [modalSofa, setmodalSofa] = useState(false);

  const [listTrauma, setlistTrauma] = useState([]);
  const [pengkajianTraumaId, setpengkajianTraumaId] = useState(0);
  const [tglTrauma, settglTrauma] = useState(dayjs());
  const [flagTrauma, setflagTrauma] = useState("HARIAN");
  const [perasaanSedih, setperasaanSedih] = useState("");
  const [perasaanBersalah, setperasaanBersalah] = useState("");
  const [bunuhDiri, setbunuhDiri] = useState("");
  const [insomniaEarly, setinsomniaEarly] = useState("");
  const [insomniaMiddle, setinsomniaMiddle] = useState("");
  const [insomniaLate, setinsomniaLate] = useState("");
  const [kerjaKegiatan, setkerjaKegiatan] = useState("");
  const [retardasi, setretardasi] = useState("");
  const [agitasi, setagitasi] = useState("");
  const [anxietasPsikis, setanxietasPsikis] = useState("");
  const [anxietasSomatic, setanxietasSomatic] = useState("");
  const [gejalaGastroinntesnial, setgejalaGastroinntesnial] = useState("");
  const [gejalaSomatikUmum, setgejalaSomatikUmum] = useState("");
  const [gejalaGenital, setgejalaGenital] = useState("");
  const [hipokondriasis, sethipokondriasis] = useState("");
  const [kehilanganBB, setkehilanganBB] = useState("");
  const [kehilanganBBNilai, setkehilanganBBNilai] = useState("");
  const [tilikan, settilikan] = useState("");
  const [variasiDiurnal, setvariasiDiurnal] = useState("");
  const [depersonalisasi, setdepersonalisasi] = useState("");
  const [gejalaParanoid, setgejalaParanoid] = useState("");
  const [gejalaObsesif, setgejalaObsesif] = useState("");
  const [ketidakberdayaan, setketidakberdayaan] = useState("");
  const [keputusasaan, setkeputusasaan] = useState("");
  const [perasaaanTidakberharga, setperasaaanTidakberharga] = useState("");
  const [modalTrauma, setmodalTrauma] = useState(false);

  const [listlatchSkor, setlistlatchSkor] = useState([]);
  const [tgllatchSkor, settgllatchSkor] = useState(dayjs());
  const [latchSkorId, setlatchSkorId] = useState(0);
  const [latchscoreL, setlatchscoreL] = useState("");
  const [latchscoreA, setlatchscoreA] = useState("");
  const [latchscoreT, setlatchscoreT] = useState("");
  const [latchscoreC, setlatchscoreC] = useState("");
  const [latchscoreH, setlatchscoreH] = useState("");
  const [visibleLatch, setvisibleLatch] = useState(false);

  const [faktorRisikoId, setfaktorRisikoId] = useState(0);
  const [tglFaktorRisiko, settglFaktorRisiko] = useState(dayjs());
  const [faktorKejang, setfaktorKejang] = useState([]);
  const [faktorDehidrasi, setfaktorDehidrasi] = useState([]);
  const [faktorSepsis, setfaktorSepsis] = useState([]);
  const [faktorPersalinan1, setfaktorPersalinan1] = useState([]);
  const [faktorPersalinan2, setfaktorPersalinan2] = useState([]);
  const [faktorIntrapartum, setfaktorPIntrapartum] = useState([]);
  const [faktorHipotermia, setfaktorPHipotermia] = useState([]);
  const [faktorHipoglikemia, setfaktorPHipoglikemia] = useState([]);
  const [faktorHiperbil, setfaktorPHiperbil] = useState([]);
  const [modalRisiko, setmodalRisiko] = useState(false);

  const [tglAssEdukasi, settglAssEdukasi] = useState(dayjs());
  const [assRuangEdukasi, setassRuangEdukasi] = useState("");
  const [assKepercayaan, setassKepercayaan] = useState([]);
  const [assPendidikan, setassPendididkan] = useState("");
  const [assKomunikasi, setassKomunikasi] = useState(false);
  const [assDeskKomunikasi, setassDeskKomunikasi] = useState("");
  const [assBahasa, setassBahasa] = useState("");
  const [assPenerjemah, setassPenerjemah] = useState(false);
  const [assDeskPenerjemah, setassDeskPenerjemah] = useState("");
  const [assKesediaan, setassKesediaan] = useState(true);
  const [assDeskKesediaan, setassDeskKesediaan] = useState("");
  const [assEdukasi, setassEdukasi] = useState([]);
  const [assInformasi, setassInformasi] = useState([]);

  const [edukasiEvaId, setedukasiEvaId] = useState(0);
  const [tglEvaEdukasi, settglEvaEdukasi] = useState(dayjs());
  const [assSasaranEdukasi, setassSasaranEdukasi] = useState([]);
  const [assMetodeEdukasi, setassMetodeEdukasi] = useState("");
  const [assEvaluasiEdukasi, setassEvaluasiEdukasi] = useState("");
  const [assJenisEdukasi, setassJenisEdukasi] = useState([]);
  const [assDeskjenis, setassDeskjenis] = useState([]);
  const [modalEdukasi, setmodalEdukasi] = useState(false);
  const [assTtd, setassTtd] = useState("");

  const [listNews, setlistNews] = useState([]);
  const [listPews, setlistPews] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const nilaiNihss =
    parseInt(tingkatKesadaran) +
    parseInt(menjawabPertanyaan) +
    parseInt(mengikutiPerintah) +
    parseInt(gaze) +
    parseInt(visual) +
    parseInt(paresisWajah) +
    parseInt(lenganKanan) +
    parseInt(lenganKiri) +
    parseInt(tungkaiKanan) +
    parseInt(tungkaiKiri) +
    parseInt(ataksia) +
    parseInt(sensorik) +
    parseInt(kemampuanBahasa) +
    parseInt(disartria) +
    parseInt(inatensi);

  const ketNihss =
    nilaiNihss < 5
      ? "Defisit Neurologis Ringan"
      : nilaiNihss >= 5 && nilaiNihss <= 14
      ? "Defisit Neurologis Sedang"
      : nilaiNihss >= 15 && nilaiNihss <= 24
      ? "Defisit Neurologis Berat"
      : nilaiNihss >= 25
      ? "Defisit Neurologis Sangat Berat"
      : "";

  const nilaiBraden =
    parseInt(persepsiSensori) +
    parseInt(kelembaban) +
    parseInt(aktivitas) +
    parseInt(mobilitas) +
    parseInt(nutrisi) +
    parseInt(gesekan);

  const keternganBraden =
    nilaiBraden >= 20 && nilaiBraden <= 23
      ? "Risiko Rendah"
      : nilaiBraden >= 15 && nilaiBraden <= 19
      ? "Risiko Sedang"
      : nilaiBraden >= 11 && nilaiBraden <= 14
      ? "Risiko Tinggi"
      : nilaiBraden >= 6 && nilaiBraden <= 10
      ? "Risiko Sangat Tinggi"
      : "";

  const nilaimenelan =
    parseInt(kesadaran) +
    parseInt(suaraNafas) +
    parseInt(komprehensif) +
    parseInt(bicara) +
    parseInt(motorikBibir) +
    parseInt(gerakanLidah) +
    parseInt(palatum) +
    parseInt(reflekGag) +
    parseInt(fonasi) +
    parseInt(batuk) +
    parseInt(mengunyah) +
    parseInt(oral) +
    parseInt(pharynx) +
    parseInt(toleransiMenelan);

  const ketMenenlan =
    nilaimenelan > 19 && nilaimenelan < 81
      ? "Ada Gangguan Menelan"
      : nilaimenelan > 80 && nilaimenelan < 100
      ? "Tidak Ada Gangguan Menelan"
      : "";

  const ketOtot =
    nilaiOtot === 0
      ? "Kontraksi otot tidak terdeteksi (paralisis sempurna)"
      : nilaiOtot === 1
      ? "Tidak ada gerakan, kontraksi otot dapat di palpasi atau dilihat"
      : nilaiOtot === 2
      ? "Gerakan otot penuh melawan gravitasi, dengan topangan"
      : nilaiOtot === 3
      ? "Gerakan yang normal melawan gravitasi"
      : nilaiOtot === 4
      ? "Gerakan penuh yang normal melawan gravitasi dan melawan tahanan minimal"
      : nilaiOtot === 5
      ? "Kekuatan otot normal, gerakan penuh yang normal melawan gravitasi dan melawan tahanan penuh"
      : "";
  const ketOedema =
    nilaiOedema === 1
      ? "Derajat 1 : kedalamannya 2 mm denganw aktu kembali 3 detik"
      : nilaiOedema === 2
      ? "Derajat 2 : kedalamannya 3-4 mm dengan waktu kembali kurang dari 15 detik"
      : nilaiOedema === 3
      ? "Derajat 3 : kedalamannya 5-6 mm waktu kembali lebih 15-60 detik"
      : nilaiOedema === 4
      ? "Derajat 4 : kedalamannya 8 mm dengan waktu kembali sampai 3 menit"
      : "";

  const nilaisofa =
    parseInt(respiratory) +
    parseInt(koagulasi) +
    parseInt(heparBilirubin) +
    parseInt(kardiovaskular) +
    parseInt(sistemSarafPusat) +
    parseInt(renalKeratin);

  const nilaitrauma =
    parseInt(perasaanSedih) +
    parseInt(perasaanBersalah) +
    parseInt(bunuhDiri) +
    parseInt(insomniaEarly) +
    parseInt(insomniaMiddle) +
    parseInt(insomniaLate) +
    parseInt(kerjaKegiatan) +
    parseInt(retardasi) +
    parseInt(agitasi) +
    parseInt(anxietasPsikis) +
    parseInt(anxietasSomatic) +
    parseInt(gejalaGastroinntesnial) +
    parseInt(gejalaSomatikUmum) +
    parseInt(gejalaGenital) +
    parseInt(hipokondriasis) +
    parseInt(kehilanganBBNilai) +
    parseInt(tilikan) +
    parseInt(variasiDiurnal) +
    parseInt(depersonalisasi) +
    parseInt(gejalaParanoid) +
    parseInt(gejalaObsesif) +
    parseInt(ketidakberdayaan) +
    parseInt(keputusasaan) +
    parseInt(perasaaanTidakberharga);

  const keterangantrauma =
    nilaitrauma < 10
      ? "Tidak Mengalami Depresi"
      : nilaitrauma > 10 && nilaitrauma < 21
      ? "Katagori Depresi Ringan"
      : nilaitrauma > 20 && nilaitrauma < 31
      ? "Katagori Depresi Sedang"
      : nilaitrauma > 30 && nilaitrauma < 41
      ? "Katagori Depresi Berat"
      : nilaitrauma > 40
      ? "Katagori Depresi ekstrem"
      : "";

  const latchTotal =
    parseInt(latchscoreL) +
    parseInt(latchscoreA) +
    parseInt(latchscoreT) +
    parseInt(latchscoreC) +
    parseInt(latchscoreH);
  const ketLatchScore =
    latchTotal > 6 && latchTotal < 11
      ? "Ibu menyusui dengan baik"
      : latchTotal < 7
      ? "Ibu membutuhkan bantuan untuk menyusui"
      : "";
  const stylekuLatchScore =
    latchTotal > 6 && latchTotal < 11
      ? { backgroundColor: "lightgreen", width: "80%", color: "black" }
      : latchTotal < 7
      ? { backgroundColor: "darkorange", width: "80%", color: "black" }
      : { width: "80%", color: "black" };

  //--------------pengkajiaan braden---------------//
  const getBreden = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupBraden/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistBraden(res.data.result);
          // Filter data berdasarkan flagAssesment 'AWAL'
        } else {
          setlistBraden([]);
        }
      })
      .catch((err) => {
        setlistBraden([]);
      });
  };

  const getBredenAwal = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupBraden/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setlistBraden(res.data.result);
          // Filter data berdasarkan flagAssesment 'AWAL'
          const flagAwal = res.data.result.filter(
            (item) => item.flagAssesment.trim() === "AWAL"
          )[0];
          console.log(flagAwal);
          setpengkajianBradenId(flagAwal.pengkajianBradenId);
          settglBraden(dayjs(flagAwal.tanggal));
          setpersepsiSensori(flagAwal.persepsiSensori);
          setkelembaban(flagAwal.kelembaban);
          setaktivitas(flagAwal.aktivitas);
          setmobilitas(flagAwal.mobilitas);
          setnutrisi(flagAwal.nutrisi);
          setgesekan(flagAwal.gesekan);
        } else {
          setpengkajianBradenId(0);
          settglBraden(dayjs());
          setpersepsiSensori("");
          setkelembaban("");
          setaktivitas("");
          setmobilitas("");
          setnutrisi("");
          setgesekan("");
        }
      })
      .catch((err) => {
        setpengkajianBradenId(0);
        settglBraden(dayjs());
        setpersepsiSensori("");
        setkelembaban("");
        setaktivitas("");
        setmobilitas("");
        setnutrisi("");
        setgesekan("");
      });
  };

  const insertBraden = (data) => {
    axios
      .post(`${apiku}/EmrPengkajian/Braden`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          if (data.flagAssesment === "AWAL") {
            setmodalBraden(false);
            getBredenAwal(data.registrasiId);
          } else {
            getBreden(data.registrasiId);
            setpengkajianBradenId(0);
          }
          // console.log(dataanamnesari)
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delBraden = (id, reg) => {
    axios
      .delete(`${apiku}/EmrPengkajian/Braden/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getBreden(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const getDisfagia = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupDisfagia/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistDisfagia(res.data.result);
        } else {
          setlistDisfagia([]);
        }
      })
      .catch((err) => {
        setlistDisfagia([]);
      });
  };

  const getDisfagiaAwal = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupDisfagia/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const flagAwal = res.data.result.filter(
            (item) => item.flagAssesment.trim() === "AWAL"
          )[0];
          console.log(flagAwal);
          //  setlistDisfagia(res.data.result);//
          setpengkajianDisfagiaId(flagAwal.pengkajianDisfagiaId);
          settglDisfagia(dayjs(flagAwal.tanggal));
          setkesadaranPasien(flagAwal.kesadaranPasien);
          setafasia(flagAwal.afasia);
          setmerapatkanGigi(flagAwal.merapatkanGigi);
          setreflekMuntah(flagAwal.reflekMuntah);
          setmenelanAir(flagAwal.menelanAir);
          setberikanMinum(flagAwal.berikanMinum);
          setketDisfagia(flagAwal.keterangan);
        } else {
          //  setlistDisfagia([]);//
          setpengkajianDisfagiaId(0);
          settglDisfagia(dayjs());
          setkesadaranPasien("");
          setafasia("");
          setmerapatkanGigi("");
          setreflekMuntah("");
          setmenelanAir("");
          setberikanMinum("");
          setketDisfagia("");
        }
      })
      .catch((err) => {
        //  setlistDisfagia([]);//
        setpengkajianDisfagiaId(0);
        settglDisfagia(dayjs());
        setkesadaranPasien("");
        setafasia("");
        setmerapatkanGigi("");
        setreflekMuntah("");
        setmenelanAir("");
        setberikanMinum("");
        setketDisfagia("");
      });
  };

  const insertDisfagia = (data) => {
    axios
      .post(`${apiku}/EmrPengkajian/Disfagia`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          if (data.flagAssesment === "AWAL") {
            setmodalDisfagia(false);
            getDisfagiaAwal(data.registrasiId);
          } else {
            getDisfagia(data.registrasiId);
            setpengkajianDisfagiaId(0);
          }
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delDisfagia = (id, reg) => {
    axios
      .delete(`${apiku}/EmrPengkajian/Disfagia/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getDisfagia(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const getMenelan = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupMenelan/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistMenelan(res.data.result);
        } else {
          setlistMenelan([]);
        }
      })
      .catch((err) => {
        setlistMenelan([]);
      });
  };

  const getMenelanAwal = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupMenelan/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //  setlistMenelan(res.data.result);
          const flagAwal = res.data.result.filter(
            (item) => item.flagAssesment.trim() === "AWAL"
          )[0];
          console.log(flagAwal);
          setpengkajianMenelanId(flagAwal.pengkajianMenelanId);
          settglMenelan(dayjs(flagAwal.tanggal));
          setKesadaran(flagAwal.kesadaran);
          setSuaraNafas(flagAwal.suaraNafas);
          setKomprehensif(flagAwal.komprehensif);
          setBicara(flagAwal.bicara);
          setMotorikBibir(flagAwal.motorikBibir);
          setGerakanLidah(flagAwal.gerakanLidah);
          setPalatum(flagAwal.platum);
          setReflekGag(flagAwal.reflekGag);
          setFonasi(flagAwal.fonasi);
          setBatuk(flagAwal.batuk);
          setMengunyah(flagAwal.mengunyah);
          setOral(flagAwal.oral);
          setPharynx(flagAwal.pharynx);
          setToleransiMenelan(flagAwal.toleransiMenelan);
        } else {
          //  setlistMenelan([]);
          setpengkajianMenelanId(0);
          settglMenelan(dayjs());
          setKesadaran("");
          setSuaraNafas("");
          setKomprehensif("");
          setBicara("");
          setMotorikBibir("");
          setGerakanLidah("");
          setPalatum("");
          setReflekGag("");
          setFonasi("");
          setBatuk("");
          setMengunyah("");
          setOral("");
          setPharynx("");
          setToleransiMenelan("");
        }
      })
      .catch((err) => {
        //  setlistMenelan([]);
        setpengkajianMenelanId(0);
        settglMenelan(dayjs());
        setKesadaran("");
        setSuaraNafas("");
        setKomprehensif("");
        setBicara("");
        setMotorikBibir("");
        setGerakanLidah("");
        setPalatum("");
        setReflekGag("");
        setFonasi("");
        setBatuk("");
        setMengunyah("");
        setOral("");
        setPharynx("");
        setToleransiMenelan("");
      });
  };

  const insertMenelan = (data) => {
    axios
      .post(`${apiku}/EmrPengkajian/Menelan`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          if (data.flagAssesment === "AWAL") {
            setmodalMenelan(false);
            getMenelanAwal(data.registrasiId);
          } else {
            getMenelan(data.registrasiId);
            setpengkajianMenelanId(0);
          }

          // console.log(dataanamnesari)
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delMenelan = (id, reg) => {
    axios
      .delete(`${apiku}/EmrPengkajian/Menelan/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getMenelan(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const getNihss = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupNIHSS/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistNihss(res.data.result);
        } else {
          setlistNihss([]);
        }
      })
      .catch((err) => {
        setlistNihss([]);
      });
  };

  const getNihssAwal = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupNIHSS/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //  setlistNihss(res.data.result);
          const flagAwal = res.data.result.filter(
            (item) => item.flagAssesment.trim() === "AWAL"
          )[0];
          console.log(flagAwal);
          setpengkajianNIHSSId(flagAwal.pengkajianNIHSSId);
          settglNihss(dayjs(flagAwal.tanggal));
          settingkatKesadaran(flagAwal.tingkatKesadaran);
          setmenjawabPertanyaan(flagAwal.menjawabPertanyaan);
          setmengikutiPerintah(flagAwal.mengikutiPerintah);
          setgaze(flagAwal.gaze);
          setvisual(flagAwal.visual);
          setparesisWajah(flagAwal.paresisWajah);
          setlenganKanan(flagAwal.lenganKanan);
          setlenganKiri(flagAwal.lenganKiri);
          settungkaiKanan(flagAwal.tungkaiKanan);
          settungkaiKiri(flagAwal.tungkaiKiri);
          setataksia(flagAwal.ataksia);
          setsensorik(flagAwal.sensorik);
          setkemampuanBahasa(flagAwal.kemampuanBahasa);
          setdisartria(flagAwal.disartria);
          setinatensi(flagAwal.inatensi);
        } else {
          //  setlistNihss([]);
          setpengkajianNIHSSId(0);
          settglNihss(dayjs());
          settingkatKesadaran("");
          setmenjawabPertanyaan("");
          setmengikutiPerintah("");
          setgaze("");
          setvisual("");
          setparesisWajah("");
          setlenganKanan("");
          setlenganKiri("");
          settungkaiKanan("");
          settungkaiKiri("");
          setataksia("");
          setsensorik("");
          setkemampuanBahasa("");
          setdisartria("");
          setinatensi("");
        }
      })
      .catch((err) => {
        //  setlistNihss([]);
        setpengkajianNIHSSId(0);
        settglNihss(dayjs());
        settingkatKesadaran("");
        setmenjawabPertanyaan("");
        setmengikutiPerintah("");
        setgaze("");
        setvisual("");
        setparesisWajah("");
        setlenganKanan("");
        setlenganKiri("");
        settungkaiKanan("");
        settungkaiKiri("");
        setataksia("");
        setsensorik("");
        setkemampuanBahasa("");
        setdisartria("");
        setinatensi("");
      });
  };

  const insertNihss = (data) => {
    axios
      .post(`${apiku}/EmrPengkajian/NIHSS`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          if (data.flagAssesment === "AWAL") {
            setmodalNihss(false);
            getNihssAwal(data.registrasiId);
          } else {
            getNihss(data.registrasiId);
            // console.log(dataanamnesari)
            setpengkajianNIHSSId(0);
          }
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delNihss = (id, reg) => {
    axios
      .delete(`${apiku}/EmrPengkajian/NIHSS/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getNihss(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const getOedema = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupOedema/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistOedema(res.data.result);
        } else {
          setlistOedema([]);
        }
      })
      .catch((err) => {
        setlistOedema([]);
      });
  };

  const getOedemaAwal = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupOedema/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //  setlistOedema(res.data.result);
          const flagAwal = res.data.result.filter(
            (item) => item.flagAssesment.trim() === "AWAL"
          )[0];
          console.log(flagAwal);
          setpengkajianOedemaId(flagAwal.pengkajianOedemaId);
          settglOedema(dayjs(flagAwal.tanggal));
          setnilaiOedema(flagAwal.nilai);
        } else {
          //  setlistOedema([]);
          setpengkajianOedemaId(0);
          settglOedema(dayjs());
          setnilaiOedema("");
        }
      })
      .catch((err) => {
        //  setlistOedema([]);
        setpengkajianOedemaId(0);
        settglOedema(dayjs());
        setnilaiOedema("");
      });
  };

  const insertOedema = (data) => {
    axios
      .post(`${apiku}/EmrPengkajian/Oedema`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          if (data.flagAssesment === "AWAL") {
            setmodalOedema(false);
            getOedemaAwal(data.registrasiId);
          } else {
            getOedema(data.registrasiId);
            // console.log(dataanamnesari)
            setpengkajianOedemaId(0);
          }

          // console.log(dataanamnesari)
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delOedema = (id, reg) => {
    axios
      .delete(`${apiku}/EmrPengkajian/Oedema/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getOedema(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const getOtot = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupOtot/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistOtot(res.data.result);
        } else {
          setlistOtot([]);
        }
      })
      .catch((err) => {
        setlistOtot([]);
      });
  };

  const getOtotAwal = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupOtot/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setlistOtot(res.data.result);
          const flagAwal = res.data.result.filter(
            (item) => item.flagAssesment.trim() === "AWAL"
          )[0];
          console.log(flagAwal);
          setpengkajianOtotId(flagAwal.pengkajianOtotId);
          settglOtot(dayjs(flagAwal.tanggal));
          setnilaiOtot(flagAwal.nilai);
        } else {
          // setlistOtot([]);
          setpengkajianOtotId(0);
          settglOtot(dayjs());
          setnilaiOtot("");
        }
      })
      .catch((err) => {
        // setlistOtot([]);
        setpengkajianOtotId(0);
        settglOtot(dayjs());
        setnilaiOtot("");
      });
  };

  const insertOtot = (data) => {
    axios
      .post(`${apiku}/EmrPengkajian/Otot`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          if (data.flagAssesment === "AWAL") {
            setmodalOtot(false);
            getOtotAwal(data.registrasiId);
          } else {
            getOtot(data.registrasiId);
            setpengkajianOtotId(0);
          }

          // console.log(dataanamnesari)
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delOtot = (id, reg) => {
    axios
      .delete(`${apiku}/EmrPengkajian/Otot/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getOtot(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const getSofa = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupSofa/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistSofa(res.data.result);
        } else {
          setlistSofa([]);
        }
      })
      .catch((err) => {
        setlistSofa([]);
      });
  };

  const getSofaAwal = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupSofa/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setlistSofa(res.data.result);
          const flagAwal = res.data.result.filter(
            (item) => item.flagAssesment.trim() === "AWAL"
          )[0];
          console.log(flagAwal);
          setpengkajianSofaId(flagAwal.pengkajianSofaId);
          settglSofa(dayjs(flagAwal.tanggal));
          setrespiratory(flagAwal.respiratory);
          setkoagulasi(flagAwal.koagulasi);
          setheparBilirubin(flagAwal.heparBilirubin);
          setkardiovaskular(flagAwal.kardiovaskular);
          setsistemSarafPusat(flagAwal.sistemSarafPusat);
          setrenalKeratin(flagAwal.renalKeratin);
        } else {
          // setlistSofa([]);
          setpengkajianSofaId(0);
          settglSofa(dayjs());
          setrespiratory("");
          setkoagulasi("");
          setheparBilirubin("");
          setkardiovaskular("");
          setsistemSarafPusat("");
          setrenalKeratin("");
        }
      })
      .catch((err) => {
        // setlistSofa([]);
        setpengkajianSofaId(0);

        settglSofa(dayjs());
        setrespiratory("");
        setkoagulasi("");
        setheparBilirubin("");
        setkardiovaskular("");
        setsistemSarafPusat("");
        setrenalKeratin("");
      });
  };

  const insertSofa = (data) => {
    axios
      .post(`${apiku}/EmrPengkajian/Sofa`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          if (data.flagAssesment === "AWAL") {
            setmodalSofa(false);
            getSofaAwal(data.registrasiId);
          } else {
            getSofa(data.registrasiId);
            setpengkajianSofaId(0);
          }

          // console.log(dataanamnesari)
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delSofa = (id, reg) => {
    axios
      .delete(`${apiku}/EmrPengkajian/Sofa/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getSofa(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const getTrauma = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupTrauma/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistTrauma(res.data.result);
        } else {
          setlistTrauma([]);
        }
      })
      .catch((err) => {
        setlistTrauma([]);
      });
  };

  const getTraumaAwal = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupTrauma/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //  setlistTrauma(res.data.result);
          const flagAwal = res.data.result.filter(
            (item) => item.flagAssesment.trim() === "AWAL"
          )[0];
          console.log(flagAwal);
          setpengkajianTraumaId(flagAwal.pengkajianTraumaId);
          settglTrauma(dayjs(flagAwal.tanggal));
          setperasaanSedih(flagAwal.perasaanSedih);
          setperasaanBersalah(flagAwal.perasaanBersalah);
          setbunuhDiri(flagAwal.bunuhDiri);
          setinsomniaEarly(flagAwal.insomniaEarly);
          setinsomniaMiddle(flagAwal.insomniaMiddle);
          setinsomniaLate(flagAwal.insomniaLate);
          setkerjaKegiatan(flagAwal.kerjaKegiatan);
          setretardasi(flagAwal.retardasi);
          setagitasi(flagAwal.agitasi);
          setanxietasPsikis(flagAwal.anxietasPsikis);
          setanxietasSomatic(flagAwal.anxietasSomatic);
          setgejalaGastroinntesnial(flagAwal.gejalaGastroinntesnial);
          setgejalaSomatikUmum(flagAwal.gejalaSomatikUmum);
          setgejalaGenital(flagAwal.gejalaGenital);
          sethipokondriasis(flagAwal.hipokondriasis);
          setkehilanganBB(flagAwal.kehilanganBB.trim());
          setkehilanganBBNilai(flagAwal.kehilanganBBNilai);
          settilikan(flagAwal.tilikan);
          setvariasiDiurnal(flagAwal.variasiDiurnal);
          setdepersonalisasi(flagAwal.depersonalisasi);
          setgejalaParanoid(flagAwal.gejalaParanoid);
          setgejalaObsesif(flagAwal.gejalaObsesif);
          setketidakberdayaan(flagAwal.ketidakberdayaan);
          setkeputusasaan(flagAwal.keputusasaan);
          setperasaaanTidakberharga(flagAwal.perasaaanTidakberharga);
        } else {
          //  setlistTrauma([]);
          setpengkajianTraumaId(0);
          settglTrauma(dayjs());
          setperasaanSedih("");
          setperasaanBersalah("");
          setbunuhDiri("");
          setinsomniaEarly("");
          setinsomniaMiddle("");
          setinsomniaLate("");
          setkerjaKegiatan("");
          setretardasi("");
          setagitasi("");
          setanxietasPsikis("");
          setanxietasSomatic("");
          setgejalaGastroinntesnial("");
          setgejalaSomatikUmum("");
          setgejalaGenital("");
          sethipokondriasis("");
          setkehilanganBB("");
          setkehilanganBBNilai("");
          settilikan("");
          setvariasiDiurnal("");
          setdepersonalisasi("");
          setgejalaParanoid("");
          setgejalaObsesif("");
          setketidakberdayaan("");
          setkeputusasaan("");
          setperasaaanTidakberharga("");
        }
      })
      .catch((err) => {
        //  setlistTrauma([]);
        setpengkajianTraumaId(0);
        settglTrauma(dayjs());
        setperasaanSedih("");
        setperasaanBersalah("");
        setbunuhDiri("");
        setinsomniaEarly("");
        setinsomniaMiddle("");
        setinsomniaLate("");
        setkerjaKegiatan("");
        setretardasi("");
        setagitasi("");
        setanxietasPsikis("");
        setanxietasSomatic("");
        setgejalaGastroinntesnial("");
        setgejalaSomatikUmum("");
        setgejalaGenital("");
        sethipokondriasis("");
        setkehilanganBB("");
        setkehilanganBBNilai("");
        settilikan("");
        setvariasiDiurnal("");
        setdepersonalisasi("");
        setgejalaParanoid("");
        setgejalaObsesif("");
        setketidakberdayaan("");
        setkeputusasaan("");
        setperasaaanTidakberharga("");
      });
  };

  const insertTrauma = (data) => {
    axios
      .post(`${apiku}/EmrPengkajian/Trauma`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          if (data.flagAssesment === "AWAL") {
            setmodalTrauma(false);
            getTraumaAwal(data.registrasiId);
          } else {
            getTrauma(data.registrasiId);
            // console.log(dataanamnesari)
            setpengkajianTraumaId(0);
          }
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delTrauma = (id, reg) => {
    console.log(id, reg);
    axios
      .delete(`${apiku}/EmrPengkajian/Trauma/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getTrauma(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const getNews = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupNews/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistNews(res.data.result);
        } else {
          setlistNews([]);
        }
      })
      .catch((err) => {
        setlistNews([]);
      });
  };

  const insertNews = (data) => {
    axios
      .post(`${apiku}/EmrPengkajianNews`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          getNews(data.registrasiId);
          // console.log(dataanamnesari)
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delNews = (id, reg) => {
    axios
      .delete(`${apiku}/EmrPengkajianNews/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getNews(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const getPews = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupPews/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistPews(res.data.result);
        } else {
          setlistPews([]);
        }
      })
      .catch((err) => {
        setlistPews([]);
      });
  };

  const insertPews = (data) => {
    axios
      .post(`${apiku}/EmrPengkajianPews`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          getPews(data.registrasiId);
          // console.log(dataanamnesari)
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const delPews = (id, reg) => {
    axios
      .delete(`${apiku}/EmrPengkajianPews/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getPews(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const insertLatchScore = (dataLatchScore) => {
    axios
      .post(`${apiku}/PantauanLatchScore/Create`, dataLatchScore)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getAssLatchSkore(dataLatchScore.registrasiId);
          getAssLatchSkoreHarian(dataLatchScore.registrasiId);
          //console.log(res.data.result);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
          setvisibleLatch(false);
        } else {
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

  const getAssLatchSkore = (noreg) => {
    axios
      .get(` ${apiku}/PantauanLatchScore/GetByRegistrasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const resdata = res.data.result;
          if (resdata[0] === undefined || resdata[0].length === 0) {
            setlatchSkorId(0);
            setlatchscoreL("");
            setlatchscoreA("");
            setlatchscoreT("");
            setlatchscoreC("");
            setlatchscoreH("");
          } else {
            setlatchSkorId(resdata[0].Id);
            setlatchscoreL(resdata[0].Latch);
            setlatchscoreA(resdata[0].AudibleSwalling);
            setlatchscoreT(resdata[0].TipePuting);
            setlatchscoreC(resdata[0].Comfort);
            setlatchscoreH(resdata[0].Help);
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

  const getAssLatchSkoreHarian = (noreg) => {
    axios
      .get(` ${apiku}/PantauanLatchScore/GetByRegistrasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistlatchSkor(res.data.result);
        } else {
          setlistlatchSkor();
        }
      })
      .catch((err) => {
        message.error(err);
        setlistlatchSkor();
      });
  };

  const delLatscore = (id, reg) => {
    axios
      .delete(`${apiku}/PantauanLatchScore/Delete/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
          });
          getAssLatchSkoreHarian(reg);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const insertPantuanEdukasi = (dataedukasi) => {
    axios
      .post(`${apiku}/EdukasiPasien/Create`, dataedukasi, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          getEdukasi(dataedukasi.registrasiId);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
        } else {
          console.log("tidak dapat menyimpan");
          Modal.warning({
            title: "Data Gagal Disimpan!",
            // content: res.data.message,
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
          // content: res.data.message,
        });
      });
  };

  const getEdukasi = (id) => {
    axios
      .get(`${apiku}/EdukasiPasien/GetByRegistrasiId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const latestData = res.data.result.sort(
            (a, b) => new Date(b.tanggal) - new Date(a.tanggal)
          )[0];
          console.log(latestData);
          settglAssEdukasi(dayjs(latestData.tanggal));
          setassRuangEdukasi(latestData.ruangId);
          setassPendididkan(latestData.pendidikan);
          setassKomunikasi(latestData.hambatanKomunikasi === 1 ? true : false);
          setassDeskKomunikasi(latestData.deskripsiHambatan);
          setassBahasa(latestData.bahasa);
          setassPenerjemah(latestData.penerjemah === 1 ? true : false);
          setassDeskPenerjemah(latestData.deskripsiPenerjemah);
          setassKesediaan(latestData.kesediaanPasien === 1 ? true : false);
          setassKepercayaan(
            latestData.nilaiKepercayaan.map((item) => item.deskripsi)
          );
          setassEdukasi(
            latestData.hambatanEdukasi.map((item) => item.deskripsi)
          );
          setassInformasi(
            latestData.programEdukasi.map((item) => item.deskripsi)
          );
        } else {
          settglAssEdukasi(dayjs());
          setassRuangEdukasi("");
          setassPendididkan("");
          setassKomunikasi(false);
          setassDeskKomunikasi("");
          setassBahasa("");
          setassPenerjemah(false);
          setassDeskPenerjemah("");
          setassKesediaan(true);
          setassKepercayaan([]);
          setassEdukasi([]);
          setassInformasi([]);
        }
      })
      .catch((err) => {
        settglAssEdukasi(dayjs());
        setassRuangEdukasi("");
        setassPendididkan("");
        setassKomunikasi(false);
        setassDeskKomunikasi("");
        setassBahasa("");
        setassPenerjemah(false);
        setassDeskPenerjemah("");
        setassKesediaan(true);
        setassKepercayaan([]);
        setassEdukasi([]);
        setassInformasi([]);
      });
  };

  const insertFaktorRisiko = (datarisiko) => {
    axios
      .post(`${apiku}/EmrPengkajian/FaktorRisiko`, datarisiko, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          getRisiko(datarisiko.registrasiId);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
          setmodalRisiko(false);
        } else {
          console.log("tidak dapat menyimpan");
          Modal.warning({
            title: "Data Gagal Disimpan!",
            // content: res.data.message,
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
          // content: res.data.message,
        });
      });
  };
  const getRisiko = (id) => {
    axios
      .get(`${apiku}/EmrPengkajian/LookupFaktorRisiko/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const detail = res.data.result.Detail;
          // Prepare result object
          const cleanArray = (arr) => {
            const cleaned = arr ? arr.filter((item) => item !== null) : [];
            return cleaned.length > 0 ? cleaned : []; // If all are null, return an empty array
          };
          const result = {
            ...res.data.result,
            Detail: {
              kejang: cleanArray(detail.map((d) => d.kejang)),
              dehidrasi: cleanArray(detail.map((d) => d.dehidrasi)),
              sepsis: cleanArray(detail.map((d) => d.sepsis)),
              anamnesis1: cleanArray(detail.map((d) => d.anamnesis1)),
              anamnesis2: cleanArray(detail.map((d) => d.anamnesis2)),
              intrapartum: cleanArray(detail.map((d) => d.intrapartum)),
              hipotermia: cleanArray(detail.map((d) => d.hipotermia)),
              hipoglikemia: cleanArray(detail.map((d) => d.hipoglikemia)),
              hiperbil: cleanArray(detail.map((d) => d.hiperbil)),
            },
          };
          // Set data into corresponding states
          setfaktorRisikoId(res.data.result.PengkajianRisikoId);
          setfaktorKejang(result.Detail.kejang);
          setfaktorDehidrasi(result.Detail.dehidrasi);
          setfaktorSepsis(result.Detail.sepsis);
          setfaktorPersalinan1(result.Detail.anamnesis1);
          setfaktorPersalinan2(result.Detail.anamnesis2);
          setfaktorPIntrapartum(result.Detail.intrapartum);
          setfaktorPHipotermia(result.Detail.hipotermia);
          setfaktorPHipoglikemia(result.Detail.hipoglikemia);
          setfaktorPHiperbil(result.Detail.hiperbil);
        } else {
          setfaktorRisikoId(0);
          settglFaktorRisiko(dayjs());
          setfaktorKejang([]);
          setfaktorDehidrasi([]);
          setfaktorSepsis([]);
          setfaktorPersalinan1([]);
          setfaktorPersalinan2([]);
          setfaktorPIntrapartum([]);
          setfaktorPHipotermia([]);
          setfaktorPHipoglikemia([]);
          setfaktorPHiperbil([]);
        }
      })
      .catch((err) => {
        setfaktorRisikoId(0);
        settglFaktorRisiko(dayjs());
        setfaktorKejang([]);
        setfaktorDehidrasi([]);
        setfaktorSepsis([]);
        setfaktorPersalinan1([]);
        setfaktorPersalinan2([]);
        setfaktorPIntrapartum([]);
        setfaktorPHipotermia([]);
        setfaktorPHipoglikemia([]);
        setfaktorPHiperbil([]);
      });
  };

  return (
    <PengkajianContext.Provider
      value={{
        listBraden,
        setlistBraden,
        getBreden,
        insertBraden,
        delBraden,
        pengkajianBradenId,
        setpengkajianBradenId,
        tglBraden,
        settglBraden,
        flagBraden,
        setflagBraden,
        persepsiSensori,
        setpersepsiSensori,
        kelembaban,
        setkelembaban,
        aktivitas,
        setaktivitas,
        mobilitas,
        setmobilitas,
        nutrisi,
        setnutrisi,
        gesekan,
        setgesekan,
        nilaiBraden,
        keternganBraden,

        listDisfagia,
        setlistDisfagia,
        getDisfagia,
        insertDisfagia,
        delDisfagia,
        pengkajianDisfagiaId,
        setpengkajianDisfagiaId,
        tglDisfagia,
        settglDisfagia,
        flagDisfagia,
        setflagDisfagia,
        kesadaranPasien,
        setkesadaranPasien,
        afasia,
        setafasia,
        merapatkanGigi,
        setmerapatkanGigi,
        reflekMuntah,
        setreflekMuntah,
        menelanAir,
        setmenelanAir,
        berikanMinum,
        setberikanMinum,
        ketDisfagia,
        setketDisfagia,

        listMenelan,
        setlistMenelan,
        getMenelan,
        insertMenelan,
        delMenelan,
        pengkajianMenelanId,
        setpengkajianMenelanId,
        tglMenelan,
        settglMenelan,
        flagMenelan,
        setflagMenelan,
        kesadaran,
        setKesadaran,
        suaraNafas,
        setSuaraNafas,
        komprehensif,
        setKomprehensif,
        bicara,
        setBicara,
        motorikBibir,
        setMotorikBibir,
        gerakanLidah,
        setGerakanLidah,
        palatum,
        setPalatum,
        reflekGag,
        setReflekGag,
        fonasi,
        setFonasi,
        batuk,
        setBatuk,
        mengunyah,
        setMengunyah,
        oral,
        setOral,
        pharynx,
        setPharynx,
        toleransiMenelan,
        setToleransiMenelan,
        nilaimenelan,
        ketMenenlan,

        listNihss,
        setlistNihss,
        getNihss,
        insertNihss,
        delNihss,
        pengkajianNIHSSId,
        setpengkajianNIHSSId,
        tglNihss,
        settglNihss,
        flagNihss,
        setflagNihss,
        tingkatKesadaran,
        settingkatKesadaran,
        menjawabPertanyaan,
        setmenjawabPertanyaan,
        mengikutiPerintah,
        setmengikutiPerintah,
        gaze,
        setgaze,
        visual,
        setvisual,
        paresisWajah,
        setparesisWajah,
        lenganKanan,
        setlenganKanan,
        lenganKiri,
        setlenganKiri,
        tungkaiKanan,
        settungkaiKanan,
        tungkaiKiri,
        settungkaiKiri,
        ataksia,
        setataksia,
        sensorik,
        setsensorik,
        kemampuanBahasa,
        setkemampuanBahasa,
        disartria,
        setdisartria,
        inatensi,
        setinatensi,
        nilaiNihss,
        ketNihss,

        listOedema,
        setlistOedema,
        getOedema,
        insertOedema,
        delOedema,
        pengkajianOedemaId,
        setpengkajianOedemaId,
        tglOedema,
        settglOedema,
        flagOedema,
        setflagOedema,
        nilaiOedema,
        setnilaiOedema,
        ketOedema,

        listOtot,
        setlistOtot,
        getOtot,
        insertOtot,
        delOtot,
        pengkajianOtotId,
        setpengkajianOtotId,
        tglOtot,
        settglOtot,
        flagOtot,
        setflagOtot,
        nilaiOtot,
        setnilaiOtot,
        ketOtot,

        listSofa,
        setlistSofa,
        getSofa,
        insertSofa,
        delSofa,
        pengkajianSofaId,
        setpengkajianSofaId,
        tglSofa,
        settglSofa,
        flagSofa,
        setflagSofa,
        respiratory,
        setrespiratory,
        koagulasi,
        setkoagulasi,
        heparBilirubin,
        setheparBilirubin,
        kardiovaskular,
        setkardiovaskular,
        sistemSarafPusat,
        setsistemSarafPusat,
        renalKeratin,
        setrenalKeratin,
        nilaisofa,

        listTrauma,
        setlistTrauma,
        getTrauma,
        insertTrauma,
        delTrauma,
        pengkajianTraumaId,
        setpengkajianTraumaId,
        tglTrauma,
        settglTrauma,
        flagTrauma,
        setflagTrauma,
        perasaanSedih,
        setperasaanSedih,
        perasaanBersalah,
        setperasaanBersalah,
        bunuhDiri,
        setbunuhDiri,
        insomniaEarly,
        setinsomniaEarly,
        insomniaMiddle,
        setinsomniaMiddle,
        insomniaLate,
        setinsomniaLate,
        kerjaKegiatan,
        setkerjaKegiatan,
        retardasi,
        setretardasi,
        agitasi,
        setagitasi,
        anxietasPsikis,
        setanxietasPsikis,
        anxietasSomatic,
        setanxietasSomatic,
        gejalaGastroinntesnial,
        setgejalaGastroinntesnial,
        gejalaSomatikUmum,
        setgejalaSomatikUmum,
        gejalaGenital,
        setgejalaGenital,
        hipokondriasis,
        sethipokondriasis,
        kehilanganBB,
        setkehilanganBB,
        kehilanganBBNilai,
        setkehilanganBBNilai,
        tilikan,
        settilikan,
        variasiDiurnal,
        setvariasiDiurnal,
        depersonalisasi,
        setdepersonalisasi,
        gejalaParanoid,
        setgejalaParanoid,
        gejalaObsesif,
        setgejalaObsesif,
        ketidakberdayaan,
        setketidakberdayaan,
        keputusasaan,
        setkeputusasaan,
        perasaaanTidakberharga,
        setperasaaanTidakberharga,
        nilaitrauma,
        keterangantrauma,

        getAssLatchSkoreHarian,
        delLatscore,
        listlatchSkor,
        setlistlatchSkor,
        tgllatchSkor,
        settgllatchSkor,
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
        visibleLatch,
        setvisibleLatch,
        latchTotal,
        ketLatchScore,
        stylekuLatchScore,
        getAssLatchSkore,

        listNews,
        setlistNews,
        getNews,
        insertNews,
        delNews,
        listPews,
        setlistPews,
        getPews,
        insertPews,
        delPews,

        modalBraden,
        setmodalBraden,
        modalDisfagia,
        setmodalDisfagia,
        modalMenelan,
        setmodalMenelan,
        modalNihss,
        setmodalNihss,
        modalOedema,
        setmodalOedema,
        modalOtot,
        setmodalOtot,
        modalSofa,
        setmodalSofa,
        modalTrauma,
        setmodalTrauma,
        getBredenAwal,
        getDisfagiaAwal,
        getMenelanAwal,
        getNihssAwal,
        getOedemaAwal,
        getOtotAwal,
        getSofaAwal,
        getTraumaAwal,

        faktorKejang,
        setfaktorKejang,
        faktorDehidrasi,
        setfaktorDehidrasi,
        faktorSepsis,
        setfaktorSepsis,
        setfaktorPersalinan1,
        faktorPersalinan1,
        faktorPersalinan2,
        setfaktorPersalinan2,
        faktorIntrapartum,
        setfaktorPIntrapartum,
        faktorHipotermia,
        setfaktorPHipotermia,
        faktorHipoglikemia,
        setfaktorPHipoglikemia,
        faktorHiperbil,
        setfaktorPHiperbil,
        modalRisiko,
        setmodalRisiko,
        faktorRisikoId,
        setfaktorRisikoId,
        tglFaktorRisiko,
        settglFaktorRisiko,
        insertFaktorRisiko,
        getRisiko,

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
        assDeskKomunikasi,
        setassDeskKomunikasi,
        assDeskPenerjemah,
        setassDeskPenerjemah,
        assKesediaan,
        setassKesediaan,
        assDeskKesediaan,
        setassDeskKesediaan,
        setassTtd,
        assTtd,
        modalEdukasi,
        setmodalEdukasi,
        tglAssEdukasi,
        settglAssEdukasi,
        tglEvaEdukasi,
        settglEvaEdukasi,
        assJenisEdukasi,
        setassJenisEdukasi,
        assDeskjenis,
        setassDeskjenis,
        getEdukasi,
        assRuangEdukasi,
        setassRuangEdukasi,
        edukasiEvaId,
        setedukasiEvaId,
      }}
    >
      {props.children}
    </PengkajianContext.Provider>
  );
};

export default PengkajianContextProvider;
