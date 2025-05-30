import React, { createContext, useState } from "react";
import axios from "axios";
import { Modal, message } from "antd";

export const PemeriksaanFisikRIContext = createContext();

const PemeriksaanFisikRIContextProvider = (props) => {
  const [pemfisik, setPemeriksaanFisik] = useState([]);
  const [pemfisikId, setPemeriksaanFisikId] = useState(0);

  // Kepala
  const [mataKonjungtiva, setmataKonjungtiva] = useState("TIDAK ANEMIS");
  const [mataSklera, setmataSklera] = useState("NON IKTERIK");
  const [mataPupil, setmataPupil] = useState("ISOKOR");
  const [mataDiameterKanan, setmataDiameterKanan] = useState(0);
  const [mataDiameterKiri, setmataDiameterKiri] = useState(0);
  const [mataLainnya, setmataLainnya] = useState("-");
  const [telinga, settelinga] = useState("LAIN-LAIN");
  const [telingaLainnya, settelingaLainnya] = useState("TIDAK ADA KELAINAN");
  const [hidungDeformitas, sethidungDeformitas] = useState(true);
  const [hidungEpistaksis, sethidungEpistaksis] = useState(true);
  const [hidungDeviasiSeptum, sethidungDeviasiSeptum] = useState(true);
  const [hidungLainnya, sethidungLainnya] = useState(true);
  const [hidungLainLain, sethidungLainLain] = useState("TIDAK ADA KELAINAN");
  const [mulut, setmulut] = useState("LAIN-LAIN");
  const [bibir, setbibir] = useState("-");
  const [mulutKeterangan, setmulutKeterangan] = useState("TIDAK ADA KELAINAN");
  const [kepalaLainLain, setkepalaLainLain] = useState("-");
  // Leher
  const [leherKondisi, setleherKondisi] = useState("SIMETRIS");
  const [leherJejas, setleherJejas] = useState("TIDAK");
  const [leherVenaJagularis, setleherVenaJagularis] = useState("NORMAL");
  const [leherKelenjarLimfe, setleherKelenjarLimfe] = useState("NORMAL");
  const [leherLainnya, setleherLainnya] = useState("-");
  // const [leherTiroid, setleherTiroid] = useState("-");
  // Thorax
  const [thoraxKondisi, setthoraxKondisi] = useState("-");
  const [thoraxJejas, setthoraxJejas] = useState("-");
  const [thoraxRetraksi, setthoraxRetraksi] = useState("-");
  const [thoraxKrepitasi, setthoraxKrepitasi] = useState("-");
  const [thoraxLainnya, setthoraxLainnya] = useState("-");
  const [jantung, setjantung] = useState("-");
  const [jantungIrama, setjantungIrama] = useState("-");
  const [jantungBunyiMurmur, setjantungBunyiMurmur] = useState(true);
  const [jantungBunyiGallop, setjantungBunyiGallop] = useState(true);
  const [jantungBunyiLainlain, setjantungBunyiLainlain] = useState(true);
  const [jantungLainLain, setjantungLainLain] = useState("-");
  const [paru, setparu] = useState("-");
  const [vesikulerKanan, setvesikulerKanan] = useState(true);
  const [vesikulerKiri, setvesikulerKiri] = useState(true);
  const [ronkhiKanan, setronkhiKanan] = useState(true);
  const [ronkhiKiri, setronkhiKiri] = useState(true);
  const [whezingKanan, setwhezingKanan] = useState(true);
  const [whezingKiri, setwhezingKiri] = useState(true);
  const [paruLainLain, setparuLainLain] = useState("-");
  // Abdomen
  const [abdomenKondisi, setabdomenKondisi] = useState("DATAR");
  const [abdomenJejas, setabdomenJejas] = useState("TIDAK");
  const [abdomenPeristaltik, setabdomenPeristaltik] = useState("NORMAL");
  const [abdomenHati, setabdomenHati] = useState("TIDAK");
  const [abdomenLimpa, setabdomenLimpa] = useState("TIDAK");
  const [abdomenNyeriTekan, setabdomenNyeriTekan] = useState("TIDAK");
  const [abdhipokanan, setAbdhipokanan] = useState(false);
  const [abdepigastrium, setEpigastrium] = useState(false);
  const [abdhipokiri, setAbdhipokiri] = useState(false);
  const [abdlumbalkanan, setLumbalKanan] = useState(false);
  const [abdumbilikus, setUmbilikus] = useState(false);
  const [abdlumbalkiri, setLumbalKiri] = useState(false);
  const [abdiliakakanan, setIliakaKanan] = useState(false);
  const [abdsuprapubik, setSuprapubik] = useState(false);
  const [abdiliakakiri, setIliakaKiri] = useState(false);
  const [abdomenLainLain, setabdomenLainLain] = useState("-");
  // const [hipokondriumKanan, sethipokondriumKanan] = useState(0)
  // const [epigastrium, setepigastrium] = useState(0)
  // const [hipokondriumKiri, sethipokondriumKiri] = useState(0)
  // const [lumbalKanan, setlumbalKanan] = useState(0)

  // Urogenital
  const [urogenitalJejas, seturogenitalJejas] = useState("-");
  const [urogenitalKelamin, seturogenitalKelamin] = useState("-");
  const [urogenitalKeteranganKelamin, seturogenitalKeteranganKelamin] =
    useState("-");
  const [urogenitalLainLain, seturogenitalLainLain] = useState("-");
  // Extremitas
  const [motorikKananAtas, setmotorikKananAtas] = useState(5);
  const [motorikKiriAtas, setmotorikKiriAtas] = useState(5);
  const [motorikKananBawah, setmotorikKananBawah] = useState(5);
  const [motorikKiriBawah, setmotorikKiriBawah] = useState(5);
  const [edemKananAtas, setedemKananAtas] = useState("-");
  const [edemKiriAtas, setedemKiriAtas] = useState("-");
  const [edemKananBawah, setedemKananBawah] = useState("-");
  const [edemKiriBawah, setedemKiriBawah] = useState("-");
  const [sianosis, setsianosis] = useState("TIDAK");
  // =============================================================
  const [ekstremisSuperior, setekstremisSuperior] = useState("-");
  const [ekstremisInferior, setekstremisInferior] = useState("-");
  const [ekstremisSianosis, setekstremisSianosis] = useState("-");
  const [lokalisKeterangan, setlokalisKeterangan] = useState("");
  const [punggungVetebrata, setpunggungVetebrata] = useState("-");
  const [punggungGinjal, setpunggungGinjal] = useState("-");
  const [coxae, setcoxae] = useState("-");
  const [limponodi, setlimponodi] = useState("-");
  const [reflek, setreflek] = useState("-");
  const [turgorKulit, setturgorKulit] = useState("-");
  const [akral, setakral] = useState("-");

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertPemfisik = (datapmrfisik) => {
    console.log(datapmrfisik);
    axios
      .post(`${apiku}/EmrPemeriksaanFisik/RawatInap`, datapmrfisik, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
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

  const detailPemfisik = (noreg, grpLayanan) => {
    axios
      .get(
        `${apiku}/EmrPemeriksaanFisik/ReadByGroupLayanan/${noreg}/${grpLayanan}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPemeriksaanFisik(res.data.result);
          setPemeriksaanFisikId(res.data.result.pemeriksaanFisikId);
          // kepala
          setmataKonjungtiva(res.data.result.mataKonjungtiva);
          setmataSklera(res.data.result.mataSklera);
          setmataPupil(res.data.result.mataPupil);
          setmataDiameterKanan(res.data.result.mataDiameterKanan);
          setmataDiameterKiri(res.data.result.mataDiameterKiri);
          setmataLainnya(res.data.result.mataLainnya);
          settelinga(res.data.result.telinga);
          settelingaLainnya(res.data.result.telingaLainnya);
          sethidungDeformitas(res.data.result.hidungDeformitas);
          sethidungEpistaksis(res.data.result.hidungEpistaksis);
          sethidungDeviasiSeptum(res.data.result.hidungDeviasiSeptum);
          sethidungLainnya(res.data.result.hidungLainnya);
          sethidungLainLain(res.data.result.hidungLainLain);
          setmulut(res.data.result.mulut);
          setbibir(res.data.result.bibir);
          setmulutKeterangan(res.data.result.mulutKeterangan);
          setkepalaLainLain(res.data.result.kepalaLainLain);
          // leher
          setleherKondisi(res.data.result.leherKondisi);
          setleherJejas(res.data.result.leherJejas);
          setleherVenaJagularis(res.data.result.leherVenaJagularis);
          setleherKelenjarLimfe(res.data.result.leherKelenjarLimfe);
          setleherLainnya(res.data.result.leherLainnya);
          // setleherTiroid(res.data.result.leherTiroid);
          // thorax
          setthoraxKondisi(res.data.result.thoraxKondisi);
          setthoraxJejas(res.data.result.thoraxJejas);
          setthoraxRetraksi(res.data.result.thoraxRetraksi);
          setthoraxKrepitasi(res.data.result.thoraxKrepitasi);
          setthoraxLainnya(res.data.result.thoraxLainnya);
          setjantung(res.data.result.jantung);
          setjantungIrama(res.data.result.jantungIrama);
          setjantungBunyiMurmur(res.data.result.jantungBunyiMurmur);
          setjantungBunyiGallop(res.data.result.jantungBunyiGallop);
          setjantungBunyiLainlain(res.data.result.jantungBunyiLainlain);
          setjantungLainLain(res.data.result.jantungLainLain);
          setparu(res.data.result.paru);
          setvesikulerKanan(res.data.result.vesikulerKanan);
          setvesikulerKiri(res.data.result.vesikulerKiri);
          setronkhiKanan(res.data.result.ronkhiKanan);
          setronkhiKiri(res.data.result.ronkhiKiri);
          setwhezingKanan(res.data.result.whezingKanan);
          setwhezingKiri(res.data.result.whezingKiri);
          setparuLainLain(res.data.result.paruLainLain);
          // abdomen
          setabdomenKondisi(res.data.result.abdomenKondisi);
          setabdomenJejas(res.data.result.abdomenJejas);
          setabdomenPeristaltik(res.data.result.abdomenPeristaltik);
          setabdomenHati(res.data.result.abdomenHati);
          setabdomenLimpa(res.data.result.abdomenLimpa);
          setabdomenNyeriTekan(res.data.result.abdomenNyeriTekan);
          setAbdhipokanan(res.data.result.hipokondriumKanan);
          setEpigastrium(res.data.result.epigastrium);
          setAbdhipokiri(res.data.result.hipokondriumKiri);
          setLumbalKanan(res.data.result.lumbalKanan);
          setUmbilikus(res.data.result.umbilikus);
          setLumbalKiri(res.data.result.lumbalKiri);
          setIliakaKanan(res.data.result.iliakaKanan);
          setSuprapubik(res.data.result.suprapubik);
          setIliakaKiri(res.data.result.iliakaKiri);
          setabdomenLainLain(res.data.result.abdomenLainLain);
          // urogenital
          seturogenitalJejas(res.data.result.urogenitalJejas);
          seturogenitalKelamin(res.data.result.urogenitalKelamin);
          seturogenitalKeteranganKelamin(
            res.data.result.urogenitalKeteranganKelamin
          );
          seturogenitalLainLain(res.data.result.urogenitalLainLain);
          // extremitas
          setmotorikKananAtas(res.data.result.motorikKananAtas);
          setmotorikKiriAtas(res.data.result.motorikKiriAtas);
          setmotorikKananBawah(res.data.result.motorikKananBawah);
          setmotorikKiriBawah(res.data.result.motorikKiriBawah);
          setedemKananAtas(res.data.result.edemKananAtas);
          setedemKiriAtas(res.data.result.edemKiriAtas);
          setedemKananBawah(res.data.result.edemKananBawah);
          setedemKiriBawah(res.data.result.edemKiriBawah);
          setsianosis(res.data.result.sianosis);
          // =====================================================
          setekstremisSuperior(res.data.result.ekstremisSuperior);
          setekstremisInferior(res.data.result.ekstremisInferior);
          setekstremisSianosis(res.data.result.ekstremisSianosis);
          setlokalisKeterangan(res.data.result.lokalisKeterangan);
          setpunggungVetebrata(res.data.result.punggungVetebrata);
          setpunggungGinjal(res.data.result.punggungGinjal);
          setcoxae(res.data.result.coxae);
          setlimponodi(res.data.result.limponodi);
          setreflek(res.data.result.reflek);
          setturgorKulit(res.data.result.turgorKulit);
          setakral(res.data.result.akral);
        } else {
          Modal.warning({
            title: "Data Pemeriksaan Fisik TIdak Ditemukan!",
          });
          setPemeriksaanFisikId(0);
          // kepala
          setmataKonjungtiva("TIDAK ANEMIS");
          setmataSklera("NON IKTERIK");
          setmataPupil("ISOKOR");
          setmataDiameterKanan(0);
          setmataDiameterKiri(0);
          setmataLainnya("-");
          settelinga("LAIN-LAIN");
          settelingaLainnya("TIDAK ADA KELAINAN");
          sethidungDeformitas(false);
          sethidungEpistaksis(false);
          sethidungDeviasiSeptum(false);
          sethidungLainnya(true);
          sethidungLainLain("TIDAK ADA KELAINAN");
          setmulut("LAIN-LAIN");
          // setbibir([]);
          setmulutKeterangan("TIDAK ADA KELAINAN");
          setkepalaLainLain("-");
          // leher
          setleherKondisi("SIMETRIS");
          setleherJejas("TIDAK");
          setleherVenaJagularis("NORMAL");
          setleherKelenjarLimfe("NORMAL");
          setleherLainnya("-");
          // setleherTiroid([]);
          // thorax
          setthoraxKondisi("SIMETRIS");
          setthoraxJejas("TIDAK");
          setthoraxRetraksi("TIDAK");
          setthoraxKrepitasi("TIDAK");
          setthoraxLainnya("-");
          setjantung("BJ I > BJ II");
          setjantungIrama("REGULER");
          setjantungBunyiMurmur(false);
          setjantungBunyiGallop(false);
          setjantungBunyiLainlain(true);
          setjantungLainLain("TIDAK ADA KELAINAN");
          setparu("SONOR");
          setvesikulerKanan(true);
          setvesikulerKiri(true);
          setronkhiKanan(false);
          setronkhiKiri(false);
          setwhezingKanan(false);
          setwhezingKiri(false);
          setparuLainLain("-");
          // abdomen
          setabdomenKondisi("DATAR");
          setabdomenJejas("TIDAK");
          setabdomenPeristaltik("NORMAL");
          setabdomenHati("TIDAK");
          setabdomenLimpa("TIDAK");
          setabdomenNyeriTekan("TIDAK");
          setAbdhipokanan(false);
          setEpigastrium(false);
          setAbdhipokiri(false);
          setLumbalKanan(false);
          setUmbilikus(false);
          setLumbalKiri(false);
          setIliakaKanan(false);
          setSuprapubik(false);
          setIliakaKiri(false);
          setabdomenLainLain("-");
          // urogenital
          seturogenitalJejas("TIDAK");
          seturogenitalKelamin("NORMAL");
          seturogenitalKeteranganKelamin("TIDAK ADA KELAINAN");
          seturogenitalLainLain("-");
          // ekstremitas
          setmotorikKananAtas(5);
          setmotorikKiriAtas(5);
          setmotorikKananBawah(5);
          setmotorikKiriBawah(5);
          setedemKananAtas("-");
          setedemKiriAtas("-");
          setedemKananBawah("-");
          setedemKiriBawah("-");
          setsianosis("TIDAK");
          setlokalisKeterangan("");
          // setekstremisSuperior([]);
          // setekstremisInferior([]);
          // setekstremisSianosis([]);
          // setlokalisKeterangan([]);
          // setpunggungVetebrata([]);
          // setpunggungGinjal([]);
          // setcoxae([]);
          // setlimponodi([]);
          // setreflek([]);
          // setturgorKulit([]);
          // setakral([]);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Error Mengambil Data Pemeriksaan Fisik !");
      });
  };

  const kosongkanPemeriksaanFisik = (id) => {
    setPemeriksaanFisikId(0);
    // kepala
    setmataKonjungtiva("TIDAK ANEMIS");
    setmataSklera("NON IKTERIK");
    setmataPupil("ISOKOR");
    setmataDiameterKanan(0);
    setmataDiameterKiri(0);
    setmataLainnya("-");
    settelinga("LAIN-LAIN");
    settelingaLainnya("TIDAK ADA KELAINAN");
    sethidungDeformitas(false);
    sethidungEpistaksis(false);
    sethidungDeviasiSeptum(false);
    sethidungLainnya(true);
    sethidungLainLain("TIDAK ADA KELAINAN");
    setmulut("LAIN-LAIN");
    // setbibir([]);
    setmulutKeterangan("TIDAK ADA KELAINAN");
    setkepalaLainLain("-");
    // leher
    setleherKondisi("SIMETRIS");
    setleherJejas("TIDAK");
    setleherVenaJagularis("NORMAL");
    setleherKelenjarLimfe("NORMAL");
    setleherLainnya("-");
    // setleherTiroid([]);
    // thorax
    setthoraxKondisi("SIMETRIS");
    setthoraxJejas("TIDAK");
    setthoraxRetraksi("TIDAK");
    setthoraxKrepitasi("TIDAK");
    setthoraxLainnya("-");
    setjantung("BJ I > BJ II");
    setjantungIrama("REGULER");
    setjantungBunyiMurmur(false);
    setjantungBunyiGallop(false);
    setjantungBunyiLainlain(true);
    setjantungLainLain("TIDAK ADA KELAINAN");
    setparu("SONOR");
    setvesikulerKanan(true);
    setvesikulerKiri(true);
    setronkhiKanan(false);
    setronkhiKiri(false);
    setwhezingKanan(false);
    setwhezingKiri(false);
    setparuLainLain("-");
    // abdomen
    setabdomenKondisi("DATAR");
    setabdomenJejas("TIDAK");
    setabdomenPeristaltik("NORMAL");
    setabdomenHati("TIDAK");
    setabdomenLimpa("TIDAK");
    setabdomenNyeriTekan("TIDAK");
    setAbdhipokanan(false);
    setEpigastrium(false);
    setAbdhipokiri(false);
    setLumbalKanan(false);
    setUmbilikus(false);
    setLumbalKiri(false);
    setIliakaKanan(false);
    setSuprapubik(false);
    setIliakaKiri(false);
    setabdomenLainLain("-");
    // urogenital
    seturogenitalJejas("TIDAK");
    seturogenitalKelamin("NORMAL");
    seturogenitalKeteranganKelamin("TIDAK ADA KELAINAN");
    seturogenitalLainLain("-");
    // ekstremitas
    setmotorikKananAtas(5);
    setmotorikKiriAtas(5);
    setmotorikKananBawah(5);
    setmotorikKiriBawah(5);
    setedemKananAtas("-");
    setedemKiriAtas("-");
    setedemKananBawah("-");
    setedemKiriBawah("-");
    setsianosis("TIDAK");
    setlokalisKeterangan("");
    // setekstremisSuperior([]);
    // setekstremisInferior([]);
    // setekstremisSianosis([]);
    // setlokalisKeterangan([]);
    // setpunggungVetebrata([]);
    // setpunggungGinjal([]);
    // setcoxae([]);
    // setlimponodi([]);
    // setreflek([]);
    // setturgorKulit([]);
    // setakral([]);
  };

  return (
    <PemeriksaanFisikRIContext.Provider
      value={{
        pemfisik,
        insertPemfisik,
        detailPemfisik,
        // kepala
        mataKonjungtiva,
        setmataKonjungtiva,
        mataPupil,
        setmataPupil,
        mataSklera,
        setmataSklera,
        mataDiameterKanan,
        setmataDiameterKanan,
        mataDiameterKiri,
        setmataDiameterKiri,
        mataLainnya,
        setmataLainnya,
        telinga,
        settelinga,
        telingaLainnya,
        settelingaLainnya,
        hidungDeformitas,
        sethidungDeformitas,
        hidungEpistaksis,
        sethidungEpistaksis,
        hidungDeviasiSeptum,
        sethidungDeviasiSeptum,
        hidungLainnya,
        sethidungLainnya,
        hidungLainLain,
        sethidungLainLain,
        mulut,
        setmulut,
        bibir,
        setbibir,
        mulutKeterangan,
        setmulutKeterangan,
        kepalaLainLain,
        setkepalaLainLain,
        // leher
        leherKondisi,
        setleherKondisi,
        leherJejas,
        setleherJejas,
        leherVenaJagularis,
        setleherVenaJagularis,
        leherKelenjarLimfe,
        setleherKelenjarLimfe,
        leherLainnya,
        setleherLainnya,
        // leherTiroid,
        // setleherTiroid,
        // thorax
        thoraxKondisi,
        setthoraxKondisi,
        thoraxJejas,
        setthoraxJejas,
        thoraxRetraksi,
        setthoraxRetraksi,
        thoraxKrepitasi,
        setthoraxKrepitasi,
        thoraxLainnya,
        setthoraxLainnya,
        jantung,
        setjantung,
        jantungIrama,
        setjantungIrama,
        jantungBunyiMurmur,
        setjantungBunyiMurmur,
        jantungBunyiGallop,
        setjantungBunyiGallop,
        jantungBunyiLainlain,
        setjantungBunyiLainlain,
        jantungLainLain,
        setjantungLainLain,
        paru,
        setparu,
        vesikulerKanan,
        setvesikulerKanan,
        vesikulerKiri,
        setvesikulerKiri,
        ronkhiKanan,
        setronkhiKanan,
        ronkhiKiri,
        setronkhiKiri,
        whezingKanan,
        setwhezingKanan,
        whezingKiri,
        setwhezingKiri,
        paruLainLain,
        setparuLainLain,
        // abdomen
        abdomenKondisi,
        setabdomenKondisi,
        abdomenJejas,
        setabdomenJejas,
        abdomenPeristaltik,
        setabdomenPeristaltik,
        abdomenHati,
        setabdomenHati,
        abdomenLimpa,
        setabdomenLimpa,
        abdomenNyeriTekan,
        setabdomenNyeriTekan,
        abdhipokanan,
        setAbdhipokanan,
        abdepigastrium,
        setEpigastrium,
        abdhipokiri,
        setAbdhipokiri,
        abdlumbalkanan,
        setLumbalKanan,
        abdumbilikus,
        setUmbilikus,
        abdlumbalkiri,
        setLumbalKiri,
        abdiliakakanan,
        setIliakaKanan,
        abdsuprapubik,
        setSuprapubik,
        abdiliakakiri,
        setIliakaKiri,
        abdomenLainLain,
        setabdomenLainLain,
        // urogenital
        urogenitalJejas,
        seturogenitalJejas,
        urogenitalKelamin,
        seturogenitalKelamin,
        urogenitalKeteranganKelamin,
        seturogenitalKeteranganKelamin,
        urogenitalLainLain,
        seturogenitalLainLain,
        // extremitas
        motorikKananAtas,
        setmotorikKananAtas,
        motorikKiriAtas,
        setmotorikKiriAtas,
        motorikKananBawah,
        setmotorikKananBawah,
        motorikKiriBawah,
        setmotorikKiriBawah,
        edemKananAtas,
        setedemKananAtas,
        edemKiriAtas,
        setedemKiriAtas,
        edemKananBawah,
        setedemKananBawah,
        edemKiriBawah,
        setedemKiriBawah,
        sianosis,
        setsianosis,
        // ==========
        ekstremisSuperior,
        setekstremisSuperior,
        ekstremisInferior,
        setekstremisInferior,
        ekstremisSianosis,
        setekstremisSianosis,
        lokalisKeterangan,
        setlokalisKeterangan,
        punggungVetebrata,
        setpunggungVetebrata,
        punggungGinjal,
        setpunggungGinjal,
        coxae,
        setcoxae,
        limponodi,
        setlimponodi,
        reflek,
        setreflek,
        turgorKulit,
        setturgorKulit,
        akral,
        setakral,
        kosongkanPemeriksaanFisik,
        pemfisikId,
        setPemeriksaanFisikId,
      }}
    >
      {props.children}
    </PemeriksaanFisikRIContext.Provider>
  );
};

export default PemeriksaanFisikRIContextProvider;
