import React, { useState, useContext } from "react";
import {
  // Modal,
  // Button,
  Input,
  Card,
  Form,
  Radio,
  Tabs,
  InputNumber,
  Checkbox,
  Row,
  Col,
} from "antd";
// import Pagehead from "../pagehead";
// import Pagehead from "../../../../../rawatjalan/pagehead";
// import { PasienContext } from "../context/PasienContext";
import { PasienContext } from "../../../../../rawatjalan/context/PasienContext";
// import { PemeriksaanFisikContext } from "../context/PemeriksaanFisikContext";
import { PemeriksaanFisikContext } from "../../../../../rawatjalan/context/PemeriksaanFisikContext";
import { LoginContext } from "../../../../../rawatjalan/context";
// import Abdomen from "../../../assets/img/regions abdomen.jpg";
import Abdomen from "../../../../../../assets/img/regions abdomen.jpg";

import dayjs from "dayjs";
import HdContext from "../../../HdContext";
const { TextArea } = Input;
const { TabPane } = Tabs;
const layout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const layout2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { PasiensContext } = HdContext;

const PemeriksaanFisik = () => {
  const [visible, setVisible] = useState(false);
  // const [edemkiriatas, setEdemkiriatas] = useState(false);
  const noreg = sessionStorage.getItem("noreg");
  const props = useContext(PasiensContext);
  const { curpas } = useContext(PasienContext);
  const { username } = useContext(LoginContext);
  const {
    insertPemfisik,
    detailPemfisik,
    // kepala
    mataKonjungtiva,
    setmataKonjungtiva,
    mataSklera,
    setmataSklera,
    mataPupil,
    setmataPupil,
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
    // Thorax
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
    // Abdomen
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
    // setekstremisSuperior,
    ekstremisInferior,
    // setekstremisInferior,
    ekstremisSianosis,
    setekstremisSianosis,
    lokalisKeterangan,
    // setlokalisKeterangan,
    punggungVetebrata,
    punggungGinjal,
    coxae,
    limponodi,
    reflek,
    turgorKulit,
    akral,
  } = useContext(PemeriksaanFisikContext);
  // const [telinga, settelinga] = useState("LAIN-LAIN");

  const datapemfisik = {
    registrasiId: curpas.registrasiId,
    tglPeriksa: dayjs(),
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
    pelaksanaId: curpas.dokterId,
    userid: username,
  };
  const onMV = (e) => {
    setVisible(true);
    detailPemfisik(noreg);
  };
  const onSubmit = (e) => {
    insertPemfisik(datapemfisik);
    setVisible(false);
    console.log(datapemfisik);
  };
  const onCancel = (e) => {
    setVisible(false);
  };
  const onMataKonjungtiva = (e) => {
    setmataKonjungtiva(e);
  };
  const onMataPupil = (e) => {
    setmataPupil(e);
  };
  const onMataSklera = (e) => {
    setmataSklera(e);
  };
  const onMataDiameterKanan = (e) => {
    setmataDiameterKanan(e);
  };
  const onMataDiameterKiri = (e) => {
    setmataDiameterKiri(e);
  };
  const onMataLainnya = (e) => {
    setmataLainnya(e);
  };
  const onTelinga = (e) => {
    settelinga(e);
    console.log(e);
  };
  const onTelingaLainnya = (e) => {
    settelingaLainnya(e);
  };
  const onHidungDeformitas = (e) => {
    sethidungDeformitas(e);
  };
  const onHidungEpistaksis = (e) => {
    sethidungEpistaksis(e);
  };
  const onHidungDeviasiSeptum = (e) => {
    sethidungDeviasiSeptum(e);
  };
  const onHidungLainnya = (e) => {
    sethidungLainnya(e);
    console.log(e);
  };
  const onHidungLainLain = (e) => {
    sethidungLainLain(e);
  };
  const onMulut = (e) => {
    setmulut(e);
  };
  const onMulutKeterangan = (e) => {
    setmulutKeterangan(e);
  };
  const onKepalaLainLain = (e) => {
    setkepalaLainLain(e);
  };
  const onLeherKondisi = (e) => {
    setleherKondisi(e);
  };
  const onLeherJejas = (e) => {
    setleherJejas(e);
  };
  const onLeherVenaJagularis = (e) => {
    setleherVenaJagularis(e);
  };
  const onLeherKelenjarLimfe = (e) => {
    setleherKelenjarLimfe(e);
  };
  const onLeherLainnya = (e) => {
    setleherLainnya(e);
  };
  const onThoraxKondisi = (e) => {
    setthoraxKondisi(e);
  };
  const onThoraxJejas = (e) => {
    setthoraxJejas(e);
  };
  const onThoraxRetraksi = (e) => {
    setthoraxRetraksi(e);
  };
  const onThoraxKrepitasi = (e) => {
    setthoraxKrepitasi(e);
  };
  const onThoraxLainnya = (e) => {
    setthoraxLainnya(e);
  };
  const onJantung = (e) => {
    setjantung(e);
  };
  const onJantungIrama = (e) => {
    setjantungIrama(e);
  };
  const onJantungBunyiMurmur = (e) => {
    setjantungBunyiMurmur(e);
  };
  const onJantungBunyiGallop = (e) => {
    setjantungBunyiGallop(e);
  };
  const onJantungBunyiLainlain = (e) => {
    setjantungBunyiLainlain(e);
  };
  const onJantungLainLain = (e) => {
    setjantungLainLain(e);
  };
  const onParu = (e) => {
    setparu(e);
  };
  const onVesikulerKanan = (e) => {
    setvesikulerKanan(e);
  };
  const onVesikulerKiri = (e) => {
    setvesikulerKiri(e);
  };
  const onRonkhiKanan = (e) => {
    setronkhiKanan(e);
  };
  const onRonkhiKiri = (e) => {
    setronkhiKiri(e);
  };
  const onWhezingKanan = (e) => {
    setwhezingKanan(e);
  };
  const onWhezingKiri = (e) => {
    setwhezingKiri(e);
  };
  const onParuLainLain = (e) => {
    setparuLainLain(e);
  };
  const onAbdomenKondisi = (e) => {
    setabdomenKondisi(e);
  };
  const onAbdomenJejas = (e) => {
    setabdomenJejas(e);
  };
  const onAbdomenNyeriTekan = (e) => {
    setabdomenNyeriTekan(e);
  };
  const onAbdomenPeristaltik = (e) => {
    setabdomenPeristaltik(e);
  };
  const onAbdomenHati = (e) => {
    setabdomenHati(e);
  };
  const onAbdomenLimpa = (e) => {
    setabdomenLimpa(e);
  };
  const onAbdomenLainLain = (e) => {
    setabdomenLainLain(e);
  };
  const onAbdomenHipokondriumKanan = () => {
    console.log("onAbdomenHipokondriumKanan");
    setAbdhipokanan(!abdhipokanan);
  };
  const onEpigastrium = () => {
    console.log("onEpigastrium");
    setEpigastrium(!abdepigastrium);
  };
  const onAbdomenHipokondriumKiri = () => {
    console.log("onAbdomenHipokondriumKiri");
    setAbdhipokiri(!abdhipokiri);
  };
  const onAbdomenLumbalKanan = () => {
    console.log("onAbdomenLumbalKanan");
    setLumbalKanan(!abdlumbalkanan);
  };
  const onAbdomenUmbilikus = () => {
    console.log("onAbdomenUmbilikus");
    setUmbilikus(!abdumbilikus);
  };
  const onAbdomenLumbalKiri = () => {
    console.log("onAbdomenLumbalKiri");
    setLumbalKiri(!abdlumbalkiri);
  };
  const onAbdomenIliakaKanan = () => {
    console.log("onAbdomenIliakaKanan");
    setIliakaKanan(!abdiliakakanan);
  };
  const onAbdomenSuprapubik = () => {
    console.log("onAbdomenSuprapubik");
    setSuprapubik(!abdsuprapubik);
  };
  const onAbdomenIliakaKiri = () => {
    console.log("onAbdomenIliakaKiri");
    setIliakaKiri(!abdiliakakiri);
  };
  const onUrogenitalJejas = (e) => {
    seturogenitalJejas(e);
  };
  const onUrogenitalKelamin = (e) => {
    seturogenitalKelamin(e);
  };
  const onUrogenitalKeteranganKelamin = (e) => {
    seturogenitalKeteranganKelamin(e);
  };
  const onUrogenitalLainLain = (e) => {
    seturogenitalLainLain(e);
  };
  const onedemKiriAtas = () => {
    if (edemKiriAtas === "+") {
      setedemKiriAtas("-");
      console.log("-");
    } else {
      setedemKiriAtas("+");
      console.log("+");
    }
  };
  const onedemKananAtas = () => {
    edemKananAtas === "+" ? setedemKananAtas("-") : setedemKananAtas("+");
  };
  const onedemKiriBawah = () => {
    edemKiriBawah === "+" ? setedemKiriBawah("-") : setedemKiriBawah("+");
  };
  const onedemKananBawah = () => {
    edemKananBawah === "+" ? setedemKananBawah("-") : setedemKananBawah("+");
  };
  const onSianosis = (e) => {
    setsianosis(e);
  };
  // const [abdhipokanan, setAbdhipokanan] = useState(false);
  // const [abdepigastrium, setEpigastrium] = useState(false);
  // const [abdhipokiri, setAbdhipokiri] = useState(false);
  // const [abdlumbalkanan, setLumbalKanan] = useState(false);
  // const [abdumbilikus, setUmbilikus] = useState(false);
  // const [abdlumbalkiri, setLumbalKiri] = useState(false);
  // const [abdiliakakanan, setIliakaKanan] = useState(false);
  // const [abdsuprapubik, setSuprapubik] = useState(false);
  // const [abdiliakakiri, setIliakaKiri] = useState(false);
  // const onEkstremisSuperior = (e) => {
  //   setekstremisSuperior(e);
  // };
  // const onEkstremisInferior = (e) => {
  //   setekstremisInferior(e);
  // };
  // const onEkstremisSianosis = (e) => {
  //   setekstremisSianosis(e);
  // };
  // const onLokalisKeterangan = (e) => {
  //   setlokalisKeterangan(e);
  // };
  return (
    <div>
      {/* <Button type="primary" size="small" onClick={(e) => onMV(e)}>
        Pemeriksaan Fisik
      </Button>
      <Modal
        style={{ top: 20 }}
        width="1000px"
        visible={visible}
        title="Pemeriksaan Fisik"
        onOk={(e) => onSubmit(e)}
        onCancel={(e) => onCancel(e)}
        footer={[
          <Button key="submit" type="primary" onClick={(e) => onSubmit(e)}>
            Simpan
          </Button>,
        ]}
      >
        <Pagehead />

      </Modal> */}

      <Tabs defaultActiveKey="1" type="card">
        <TabPane tab="Kepala" key="1">
          <Card size="small">
            <Form.Item
              label={<div style={{ fontWeight: "bolder" }}>Mata</div>}
              style={{ marginBottom: 0 }}
              {...layout}
            >
              <Form {...layout}>
                <Form.Item label="Konjungtiva" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    defaultValue="TIDAK ANEMIS"
                    value={mataKonjungtiva}
                    onChange={(e) => onMataKonjungtiva(e.target.value)}
                  >
                    <Radio value="ANEMIS">Anemis</Radio>
                    <Radio value="TIDAK ANEMIS">Tidak Anemis</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Sklera" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    value={mataSklera}
                    defaultValue="NON IKTERIK"
                    onChange={(e) => onMataSklera(e.target.value)}
                  >
                    <Radio value="IKTERIK">Ikterik</Radio>
                    <Radio value="NON IKTERIK">Non Ikterik</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Pupil" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    value={mataPupil}
                    defaultValue="ISOKOR"
                    onChange={(e) => onMataPupil(e.target.value)}
                  >
                    <Radio value="ISOKOR">Isokor</Radio>
                    <Radio value="ANISOKOR">Anisokor</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Diameter" style={{ marginBottom: 0 }}>
                  <Input.Group compact>
                    <InputNumber
                      onChange={(e) => onMataDiameterKanan(e)}
                      value={mataDiameterKanan}
                      size="small"
                      style={{ width: "5%" }}
                      // defaultValue="3"
                    />{" "}
                    /{" "}
                    <InputNumber
                      onChange={(e) => onMataDiameterKiri(e)}
                      size="small"
                      style={{ width: "5%" }}
                      value={mataDiameterKiri}
                      // defaultValue="3"
                    />
                  </Input.Group>
                </Form.Item>
                <Form.Item label="Lain-lain" style={{ marginBottom: 0 }}>
                  <TextArea
                    rows={1}
                    value={mataLainnya}
                    onChange={(e) => setmataLainnya(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Form.Item>
            <Form.Item
              label={<div style={{ fontWeight: "bolder" }}>Telinga</div>}
              style={{ marginBottom: 0 }}
              {...layout}
            >
              <Radio.Group
                value={telinga}
                defaultValue="LAIN-LAIN"
                onChange={(e) => onTelinga(e.target.value)}
              >
                <Radio value="PENDARAHAN">Pendarahan</Radio>
                <Radio value="LAIN-LAIN">Lain-lain</Radio>
                {telinga === "LAIN-LAIN" ? (
                  <Input
                    style={{ width: 500 }}
                    // defaultValue="TIDAK ADA KELAINAN"
                    value={telingaLainnya}
                    onChange={(e) => onTelingaLainnya(e.target.value)}
                  />
                ) : null}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={<div style={{ fontWeight: "bolder" }}>Hidung</div>}
              style={{ marginBottom: 0 }}
              {...layout}
            >
              <Checkbox
                checked={hidungDeformitas}
                onChange={(e) => onHidungDeformitas(e.target.checked)}
              >
                Deformitas
              </Checkbox>
              <Checkbox
                checked={hidungEpistaksis}
                onChange={(e) => onHidungEpistaksis(e.target.checked)}
              >
                Episaktis
              </Checkbox>
              <Checkbox
                checked={hidungDeviasiSeptum}
                onChange={(e) => onHidungDeviasiSeptum(e.target.checked)}
              >
                Deviasi Septum
              </Checkbox>
              <Checkbox
                checked={hidungLainnya}
                defaultChecked
                onChange={(e) => onHidungLainnya(e.target.checked)}
              >
                Lain-lain
              </Checkbox>
              {hidungLainnya ? (
                <Input
                  value={hidungLainLain}
                  defaultValue="TIDAK ADA KELAINAN"
                  onChange={(e) => onHidungLainLain(e.target.value)}
                />
              ) : null}
            </Form.Item>
            <Form.Item
              label={<div style={{ fontWeight: "bolder" }}>Mulut (Bibir)</div>}
              style={{ marginBottom: 0 }}
              {...layout}
            >
              <Radio.Group
                value={mulut}
                defaultValue="LAIN-LAIN"
                onChange={(e) => onMulut(e.target.value)}
              >
                <Radio value="SIANOSIS">Sianosis</Radio>
                <Radio value="LAIN-LAIN">Lain-lain </Radio>
                {mulut === "LAIN-LAIN" ? (
                  <Input
                    value={mulutKeterangan}
                    style={{ width: 500 }}
                    defaultValue="TIDAK ADA KELAINAN"
                    onChange={(e) => onMulutKeterangan(e.target.value)}
                  />
                ) : null}
              </Radio.Group>{" "}
            </Form.Item>
            <Form.Item
              label={<div style={{ fontWeight: "bolder" }}>Lain-lain</div>}
              style={{ marginBottom: 0 }}
              {...layout}
            >
              <Radio.Group>
                <TextArea
                  value={kepalaLainLain}
                  style={{ width: 500 }}
                  rows={1}
                  onChange={(e) => onKepalaLainLain(e.target.value)}
                />
              </Radio.Group>
            </Form.Item>
          </Card>
        </TabPane>

        {/*------- Leher -------*/}
        <TabPane tab="Leher" key="2">
          <Card size="small">
            <Form {...layout}>
              <Form.Item
                label={
                  <div style={{ fontWeight: "bolder" }}>Kondisi Leher</div>
                }
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  value={leherKondisi}
                  defaultValue="SIMETRIS"
                  onChange={(e) => onLeherKondisi(e.target.value)}
                >
                  <Radio value="SIMETRIS">Simetris</Radio>
                  <Radio value="ASIMETRIS">Asimetris</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Jejas</div>}
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  value={leherJejas}
                  defaultValue="TIDAK"
                  onChange={(e) => onLeherJejas(e.target.value)}
                >
                  <Radio value="ADA">Ada</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={
                  <div style={{ fontWeight: "bolder" }}>Vena Jagularis</div>
                }
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  value={leherVenaJagularis}
                  defaultValue="NORMAL"
                  onChange={(e) => onLeherVenaJagularis(e.target.value)}
                >
                  <Radio value="MENINGKAT">Meningkat</Radio>
                  <Radio value="NORMAL">Normal</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={
                  <div style={{ fontWeight: "bolder" }}>Kelenjar Limfe</div>
                }
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  value={leherKelenjarLimfe}
                  defaultValue="NORMAL"
                  onChange={(e) => onLeherKelenjarLimfe(e.target.value)}
                >
                  <Radio value="TERABA">Teraba</Radio>
                  <Radio value="NORMAL">Normal</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Lain-lain</div>}
                style={{ marginBottom: 0 }}
              >
                <TextArea
                  value={leherLainnya}
                  rows={1}
                  onChange={(e) => onLeherLainnya(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        <TabPane tab="Thorax" key="3">
          <Card size="small">
            <Form {...layout}>
              <Form.Item
                label={
                  <div style={{ fontWeight: "bolder" }}>Kondisi Thorax</div>
                }
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  value={thoraxKondisi}
                  defaultValue="SIMETRIS"
                  onChange={(e) => onThoraxKondisi(e.target.value)}
                >
                  <Radio value="SIMETRIS">Simetris</Radio>
                  <Radio value="ASIMETRIS">Asimetris</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Jejas</div>}
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  value={thoraxJejas}
                  defaultValue="TIDAK"
                  onChange={(e) => onThoraxJejas(e.target.value)}
                >
                  <Radio value="ADA">Ada</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Retraksi</div>}
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  value={thoraxRetraksi}
                  defaultValue="TIDAK"
                  onChange={(e) => onThoraxRetraksi(e.target.value)}
                >
                  <Radio value="ADA">Ada</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Krepitasi</div>}
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  value={thoraxKrepitasi}
                  defaultValue="TIDAK"
                  onChange={(e) => onThoraxKrepitasi(e.target.value)}
                >
                  <Radio value="YA">Ya</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Lain-lain</div>}
                style={{ marginBottom: 0 }}
              >
                <TextArea
                  value={thoraxLainnya}
                  rows={1}
                  onChange={(e) => onThoraxLainnya(e.target.value)}
                />
              </Form.Item>
            </Form>
            <Form.Item
              label={<div style={{ fontWeight: "bolder" }}>Jantung</div>}
              style={{ marginBottom: 0 }}
              {...layout}
            >
              <Form {...layout}>
                <Form.Item label="Keterangan" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    value={jantung}
                    defaultValue="BJ I > BJ II"
                    onChange={(e) => onJantung(e.target.value)}
                  >
                    <Radio value="BJ I > BJ II">BJ I &gt; BJ II</Radio>
                    <Radio value="BJ II > BJ I">BJ II &gt; BJ I</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Irama" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    value={jantungIrama}
                    defaultValue="REGULER"
                    onChange={(e) => onJantungIrama(e.target.value)}
                  >
                    <Radio value="REGULER">Reguler</Radio>
                    <Radio value="IREGULER">Ireguler</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Bunyi" style={{ marginBottom: 0 }}>
                  <Checkbox
                    checked={jantungBunyiMurmur}
                    onChange={(e) => onJantungBunyiMurmur(e.target.checked)}
                  >
                    Murmur
                  </Checkbox>
                  <Checkbox
                    checked={jantungBunyiGallop}
                    onChange={(e) => onJantungBunyiGallop(e.target.checked)}
                  >
                    Gallop
                  </Checkbox>
                  <Checkbox
                    checked={jantungBunyiLainlain}
                    defaultChecked
                    onChange={(e) => onJantungBunyiLainlain(e.target.checked)}
                  >
                    Lain-lain
                  </Checkbox>
                  {jantungBunyiLainlain ? (
                    <Input
                      value={jantungLainLain}
                      style={{ width: 500 }}
                      defaultValue="TIDAK ADA KELAINAN"
                      onChange={(e) => onJantungLainLain(e.target.value)}
                    />
                  ) : null}
                </Form.Item>
              </Form>
            </Form.Item>
            <Form.Item
              label={<div style={{ fontWeight: "bolder" }}>Paru-paru</div>}
              style={{ marginBottom: 0 }}
              {...layout}
            >
              <Form {...layout}>
                <Form.Item label="Keterangan" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    value={paru}
                    defaultValue="SONOR"
                    onChange={(e) => onParu(e.target.value)}
                  >
                    <Radio value="SONOR">Sonor</Radio>
                    <Radio value="HIPERSONOR">HiperSonor</Radio>
                    <Radio value="REDUP">Redup</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Vesikuler" style={{ marginBottom: 0 }}>
                  <Checkbox
                    checked={vesikulerKanan}
                    defaultChecked
                    onChange={(e) => onVesikulerKanan(e.target.checked)}
                  >
                    Kanan
                  </Checkbox>
                  <Checkbox
                    checked={vesikulerKiri}
                    defaultChecked
                    onChange={(e) => onVesikulerKiri(e.target.checked)}
                  >
                    Kiri
                  </Checkbox>
                </Form.Item>
                <Form.Item label="Ronkhi" style={{ marginBottom: 0 }}>
                  <Checkbox
                    checked={ronkhiKanan}
                    onChange={(e) => onRonkhiKanan(e.target.checked)}
                  >
                    Kanan
                  </Checkbox>
                  <Checkbox
                    checked={ronkhiKiri}
                    onChange={(e) => onRonkhiKiri(e.target.checked)}
                  >
                    Kiri
                  </Checkbox>
                </Form.Item>
                <Form.Item label="Wheezing" style={{ marginBottom: 0 }}>
                  <Checkbox
                    checked={whezingKanan}
                    onChange={(e) => onWhezingKanan(e.target.checked)}
                  >
                    Kanan
                  </Checkbox>
                  <Checkbox
                    checked={whezingKiri}
                    onChange={(e) => onWhezingKiri(e.target.checked)}
                  >
                    Kiri
                  </Checkbox>
                </Form.Item>
                <Form.Item label="Lain-lain" style={{ marginBottom: 0 }}>
                  <TextArea
                    value={paruLainLain}
                    rows={1}
                    onChange={(e) => onParuLainLain(e.target.value)}
                  />
                </Form.Item>
              </Form>
            </Form.Item>
          </Card>
        </TabPane>
        <TabPane tab="Abdomen" key="4">
          <Card size="small">
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form {...layout2}>
                  <Form.Item
                    label={
                      <div style={{ fontWeight: "bolder" }}>
                        Kondisi Abdomen
                      </div>
                    }
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group
                      // defaultValue="DATAR"
                      value={abdomenKondisi}
                      onChange={(e) => onAbdomenKondisi(e.target.value)}
                    >
                      <Radio value="CEMBUNG">Cembung</Radio>
                      <Radio value="DATAR">Datar</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label={<div style={{ fontWeight: "bolder" }}>Jejas</div>}
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group
                      // defaultValue="TIDAK"
                      value={abdomenJejas}
                      onChange={(e) => onAbdomenJejas(e.target.value)}
                    >
                      <Radio value="ADA">Ada</Radio>
                      <Radio value="TIDAK">Tidak</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label={
                      <div style={{ fontWeight: "bolder" }}>Peristaltik</div>
                    }
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group
                      // defaultValue="NORMAL"
                      value={abdomenPeristaltik}
                      onChange={(e) => onAbdomenPeristaltik(e.target.value)}
                    >
                      <Radio value="MENINGKAT">Meningkat</Radio>
                      <Radio value="NORMAL">Normal</Radio>
                      <Radio value="MENURUN">Menurun</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label={<div style={{ fontWeight: "bolder" }}>Hati</div>}
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group
                      // defaultValue="TIDAK"
                      value={abdomenHati}
                      onChange={(e) => onAbdomenHati(e.target.value)}
                    >
                      <Radio value="TERABA">Teraba</Radio>
                      <Radio value="TIDAK">Tidak</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label={<div style={{ fontWeight: "bolder" }}>Limpa</div>}
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group
                      // defaultValue="TIDAK"
                      value={abdomenLimpa}
                      onChange={(e) => onAbdomenLimpa(e.target.value)}
                    >
                      <Radio value="TERABA">Teraba</Radio>
                      <Radio value="TIDAK">Tidak</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label={
                      <div style={{ fontWeight: "bolder" }}>Nyeri tekan</div>
                    }
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group
                      // defaultValue="TIDAK"
                      value={abdomenNyeriTekan}
                      onChange={(e) => onAbdomenNyeriTekan(e.target.value)}
                    >
                      <Radio value="YA">Ya</Radio>
                      <Radio value="TIDAK">Tidak</Radio>
                    </Radio.Group>
                  </Form.Item>
                  <Form.Item
                    label={
                      <div style={{ fontWeight: "bolder" }}>Lain-lain</div>
                    }
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      value={abdomenLainLain}
                      rows={1}
                      onChange={(e) => onAbdomenLainLain(e.target.value)}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                {abdomenNyeriTekan === "YA" ? (
                  <div className="container">
                    <img src={Abdomen} alt="Snow" style={{ width: "80%" }} />
                    <button
                      className={
                        abdhipokanan ? "btnTrueHipoKanan" : "btnHipoKanan"
                      }
                      onClick={onAbdomenHipokondriumKanan}
                    >
                      .
                    </button>
                    <button
                      className={
                        abdepigastrium ? "btnTrueEpigastrium" : "btnEpigastrium"
                      }
                      onClick={onEpigastrium}
                    >
                      .
                    </button>
                    <button
                      className={
                        abdhipokiri
                          ? "btnTrueHipokondriumKiri"
                          : "btnHipokondriumKiri"
                      }
                      onClick={onAbdomenHipokondriumKiri}
                    >
                      .
                    </button>
                    <button
                      className={
                        abdlumbalkanan ? "btnTrueLumbalKanan" : "btnLumbalKanan"
                      }
                      onClick={onAbdomenLumbalKanan}
                    >
                      .
                    </button>
                    <button
                      className={
                        abdumbilikus ? "btnTrueUmbilikus" : "btnUmbilikus"
                      }
                      onClick={onAbdomenUmbilikus}
                    >
                      .
                    </button>
                    <button
                      className={
                        abdlumbalkiri ? "btnTrueLumbalKiri" : "btnLumbalKiri"
                      }
                      onClick={onAbdomenLumbalKiri}
                    >
                      .
                    </button>
                    <button
                      className={
                        abdiliakakanan ? "btnTrueIliakaKanan" : "btnIliakaKanan"
                      }
                      onClick={onAbdomenIliakaKanan}
                    >
                      .
                    </button>
                    <button
                      className={
                        abdsuprapubik ? "btnTrueSuprapubik" : "btnSuprapubik"
                      }
                      onClick={onAbdomenSuprapubik}
                    >
                      .
                    </button>
                    <button
                      className={
                        abdiliakakiri ? "btnTrueIliakaKiri" : "btnIliakaKiri"
                      }
                      onClick={onAbdomenIliakaKiri}
                    >
                      .
                    </button>
                  </div>
                ) : null}
              </Col>
            </Row>
          </Card>
        </TabPane>
        <TabPane tab="Urogenital" key="5">
          <Card size="small">
            <Form {...layout}>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Jejas</div>}
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  // defaultValue="TIDAK"
                  value={urogenitalJejas}
                  onChange={(e) => onUrogenitalJejas(e.target.value)}
                >
                  <Radio value="ADA">Ada</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              {props.pasien.result.jnsKelamin === "P" ? (
                <Form.Item
                  label={<div style={{ fontWeight: "bolder" }}>Vagina</div>}
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    value={urogenitalKelamin}
                    // defaultValue="NORMAL"
                    onChange={(e) => onUrogenitalKelamin(e.target.value)}
                  >
                    <Radio value="PENDARAHAN">Pendarahan</Radio>
                    <Radio value="BENJOLAN">Benjolan</Radio>
                    <Radio value="NORMAL">Normal</Radio>
                    <Radio value="LAIN-LAIN">Lain-lain</Radio>
                    {urogenitalKelamin === "LAIN-LAIN" ? (
                      <Input
                        value={urogenitalKeteranganKelamin}
                        onChange={(e) =>
                          onUrogenitalKeteranganKelamin(e.target.value)
                        }
                      />
                    ) : null}
                  </Radio.Group>
                </Form.Item>
              ) : (
                <Form.Item
                  label={<div style={{ fontWeight: "bolder" }}>Skrotum</div>}
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    // defaultValue="NORMAL"
                    value={urogenitalKelamin}
                    onChange={(e) => onUrogenitalKelamin(e.target.value)}
                  >
                    <Radio value="MEMBESAR">Membesar</Radio>
                    <Radio value="NORMAL">Normal</Radio>
                    <Radio value="LAIN-LAIN">Lain-lain</Radio>
                    {urogenitalKelamin === "LAIN-LAIN" ? (
                      <Input
                        value={urogenitalKeteranganKelamin}
                        onChange={(e) =>
                          onUrogenitalKeteranganKelamin(e.target.value)
                        }
                      />
                    ) : null}
                  </Radio.Group>
                </Form.Item>
              )}
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Lain-lain</div>}
                style={{ marginBottom: 0 }}
              >
                <TextArea
                  rows={1}
                  value={urogenitalLainLain}
                  onChange={(e) => onUrogenitalLainLain(e.target.value)}
                />
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
        <TabPane tab="Extermitas & Status Lokalis" key="6">
          <Card size="small">
            <Form {...layout}>
              <Form.Item
                label={
                  <div style={{ fontWeight: "bolder" }}>Kekuatan Motorik</div>
                }
                style={{ marginBottom: 0 }}
              >
                <Input.Group compact>
                  <Input
                    style={{ width: "60px" }}
                    value={motorikKiriAtas}
                    onChange={(e) => setmotorikKiriAtas(e.target.value)}
                  />
                  <Input
                    style={{ width: "60px" }}
                    value={motorikKananAtas}
                    onChange={(e) => setmotorikKananAtas(e.target.value)}
                  />
                </Input.Group>
                <Input.Group compact>
                  <Input
                    style={{ width: "60px" }}
                    value={motorikKiriBawah}
                    onChange={(e) => setmotorikKiriBawah(e.target.value)}
                  />
                  <Input
                    style={{ width: "60px" }}
                    value={motorikKananBawah}
                    onChange={(e) => setmotorikKananBawah(e.target.value)}
                  />
                </Input.Group>
                <Checkbox>TIDAK DAPAT DINILAI</Checkbox>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Edem</div>}
                style={{ marginBottom: 0 }}
              >
                <Input.Group compact>
                  <Input
                    style={{ width: "60px" }}
                    defaultValue="-"
                    value={edemKiriAtas}
                    onDoubleClick={onedemKiriAtas}
                  />
                  <Input
                    style={{ width: "60px" }}
                    defaultValue="-"
                    value={edemKananAtas}
                    onDoubleClick={onedemKananAtas}
                  />
                </Input.Group>
                <Input.Group compact>
                  <Input
                    style={{ width: "60px" }}
                    defaultValue="-"
                    value={edemKiriBawah}
                    onDoubleClick={onedemKiriBawah}
                  />
                  <Input
                    style={{ width: "60px" }}
                    defaultValue="-"
                    value={edemKananBawah}
                    onDoubleClick={onedemKananBawah}
                  />
                </Input.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Sianosis</div>}
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  defaultValue="TIDAK"
                  value={sianosis}
                  onChange={(e) => onSianosis(e.target.value)}
                >
                  <Radio value="YA">Ya</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default PemeriksaanFisik;
