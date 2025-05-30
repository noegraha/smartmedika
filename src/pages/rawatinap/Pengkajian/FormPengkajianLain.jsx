import { Card, DatePicker, Form, Select } from "antd";
import React, { useContext, useState } from "react";
import FormNIHSS from "./FormNIHSS";
import FormDisfagia from "./FormDisfagia";
import FormBraden from "./FormBraden";
import FormFungsiMenelan from "./FormFungsiMenelan";
import FormZScore from "./FormZScore";
import FormFungsiOtot from "./FormFungsiOtot";
import FormOedema from "./FormOedema";
import FormTrauma from "./FormTrauma";
import FormSofaScore from "./FormSofaScore";
import { PengkajianContext } from "../context/PengkajianContext";
import dayjs from "dayjs";
import FormLatchScoreHarian from "./FormLatchScoreHarian";
const { Option } = Select;
const formItemLayoutFull = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const FormPengkajianLain = () => {
  const [jnsPengkajian, setjnsPengkajian] = useState("");
  const {
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

    latchSkorId,
    settgllatchSkor,
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
    getAssLatchSkoreHarian,
    delLatscore,
    listlatchSkor,
    setlistlatchSkor,

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
  } = useContext(PengkajianContext);

  const kosongkanForm = () => {
    setpengkajianBradenId(0);
    settglBraden(dayjs());
    setpersepsiSensori("");
    setkelembaban("");
    setaktivitas("");
    setmobilitas("");
    setnutrisi("");
    setgesekan("");

    setpengkajianDisfagiaId(0);
    settglDisfagia(dayjs());
    setkesadaranPasien("");
    setafasia("");
    setmerapatkanGigi("");
    setreflekMuntah("");
    setmenelanAir("");
    setberikanMinum("");
    setketDisfagia("");

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

    setpengkajianOedemaId(0);
    settglOedema(dayjs());
    setnilaiOedema("");

    setpengkajianOtotId(0);
    settglOtot(dayjs());
    setnilaiOtot("");

    setpengkajianSofaId(0);
    settglSofa(dayjs());
    setrespiratory("");
    setkoagulasi("");
    setheparBilirubin("");
    setkardiovaskular("");
    setsistemSarafPusat("");
    setrenalKeratin("");

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

    settgllatchSkor(dayjs());
    setlatchscoreL("");
    setlatchscoreA("");
    setlatchscoreT("");
    setlatchscoreC("");
    setlatchscoreH("");

    setflagBraden("HARIAN");
    setflagDisfagia("HARIAN");
    setflagMenelan("HARIAN");
    setflagNihss("HARIAN");
    setflagOedema("HARIAN");
    setflagOtot("HARIAN");
    setflagSofa("HARIAN");
    setflagTrauma("HARIAN");
  };

  return (
    <div>
      <Card size="small">
        <Form.Item
          {...formItemLayoutFull}
          label="Pilih Pengkajian"
          style={{ marginBottom: 5 }}
        >
          <Select
            onChange={(e) => {
              setjnsPengkajian(e);
              kosongkanForm();
            }}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih Pengkajian..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {/* {listSpesialisDBRS.map((d) => ( */}
            <Option key="OEDEMA">Derajat Oedema</Option>{" "}
            <Option key="MENELAN">Fungsi Menelan</Option>
            <Option key="OTOT">Fungsi Otot</Option>{" "}
            <Option key="SOFA">Pengkajian SOFA</Option>
            <Option key="TRAUMA">Pengkajian Trauma</Option>
            <Option key="BRADEN">Skala Braden</Option>
            <Option key="DISFAGIA">Skala Disfagia</Option>
            <Option key="NIHSS">Skala NIHSS</Option>
            <Option key="LATCHSCORE">LATCHSCORE</Option>
            {/* <Option key="ZSCORE">Z Score</Option> */}
            {/* ))} */}
          </Select>
        </Form.Item>
      </Card>
      <Card size="small">
        {jnsPengkajian === "NIHSS" ? (
          <FormNIHSS />
        ) : jnsPengkajian === "DISFAGIA" ? (
          <FormDisfagia />
        ) : jnsPengkajian === "BRADEN" ? (
          <FormBraden />
        ) : jnsPengkajian === "MENELAN" ? (
          <FormFungsiMenelan />
        ) : jnsPengkajian === "ZSCORE" ? (
          <FormZScore />
        ) : jnsPengkajian === "OTOT" ? (
          <FormFungsiOtot />
        ) : jnsPengkajian === "OEDEMA" ? (
          <FormOedema />
        ) : jnsPengkajian === "TRAUMA" ? (
          <FormTrauma />
        ) : jnsPengkajian === "SOFA" ? (
          <FormSofaScore />
        ) : jnsPengkajian === "LATCHSCORE" ? (
          <FormLatchScoreHarian />
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
};

export default FormPengkajianLain;
