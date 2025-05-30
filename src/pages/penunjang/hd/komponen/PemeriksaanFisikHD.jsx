import React, { useContext } from "react";
import { Input, Card, Form, Radio, Tabs, InputNumber, Checkbox } from "antd";
import dayjs from "dayjs";
import { PemeriksaanFisikContext } from "../../../rawatjalan/context/PemeriksaanFisikContext";
import { LoginContext } from "../../../rawatjalan/context";
import { PasienHDContext } from "../context/PasienHDContext";
const { TextArea } = Input;
const { TabPane } = Tabs;
const layout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const PemeriksaanFisikHD = () => {
  // const noreg = sessionStorage.getItem("noreg");
  const { curpas } = useContext(PasienHDContext);
  const { username } = useContext(LoginContext);
  const {
    //insertPemfisik,
    // detailPemfisik,
    mataKonjungtiva,
    setmataKonjungtiva,
    mataPupil,
    setmataPupil,
    mataSklera,
    setmataSklera,
    mataDiameter,
    setmataDiameter,
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
    leherTiroid,
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
    abdomenKondisi,
    setabdomenKondisi,
    abdomenJejas,
    setabdomenJejas,
    abdomenNyeriTekan,
    setabdomenNyeriTekan,
    abdomenPeristaltik,
    setabdomenPeristaltik,
    abdomenHati,
    setabdomenHati,
    abdomenLimpa,
    setabdomenLimpa,
    abdomenLainLain,
    setabdomenLainLain,
    urogenitalJejas,
    seturogenitalJejas,
    urogenitalKelamin,
    seturogenitalKelamin,
    urogenitalKeteranganKelamin,
    seturogenitalKeteranganKelamin,
    urogenitalLainLain,
    seturogenitalLainLain,
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
    mataKonjungtiva: mataKonjungtiva,
    mataPupil: mataPupil,
    mataSklera: mataSklera,
    mataDiameter: mataDiameter,
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
    leherKondisi: leherKondisi,
    leherJejas: leherJejas,
    leherVenaJagularis: leherVenaJagularis,
    leherKelenjarLimfe: leherKelenjarLimfe,
    leherLainnya: leherLainnya,
    leherTiroid: leherTiroid,
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
    abdomenKondisi: abdomenKondisi,
    abdomenJejas: abdomenJejas,
    abdomenNyeriTekan: abdomenNyeriTekan,
    abdomenPeristaltik: abdomenPeristaltik,
    abdomenHati: abdomenHati,
    abdomenLimpa: abdomenLimpa,
    abdomenLainLain: abdomenLainLain,
    urogenitalJejas: urogenitalJejas,
    urogenitalKelamin: urogenitalKelamin,
    urogenitalKeteranganKelamin: urogenitalKeteranganKelamin,
    urogenitalLainLain: urogenitalLainLain,
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
  const onMataKonjungtiva = (e) => {
    setmataKonjungtiva(e);
  };
  const onMataPupil = (e) => {
    setmataPupil(e);
  };
  const onMataSklera = (e) => {
    setmataSklera(e);
  };
  const onMataDiameter = (e) => {
    setmataDiameter(e);
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
  // const onEkstremisSuperior = (e) => {
  //   setekstremisSuperior(e);
  // };
  // const onEkstremisInferior = (e) => {
  //   setekstremisInferior(e);
  // };
  const onEkstremisSianosis = (e) => {
    setekstremisSianosis(e);
  };
  // const onLokalisKeterangan = (e) => {
  //   setlokalisKeterangan(e);
  // };
  // const onSimpanPemFisik = () => {
  //     console.log(datapemfisik);
  // }
  return (
    <div>
      <Tabs defaultActiveKey="1">
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
                    onChange={(e) => onMataKonjungtiva(e)}
                  >
                    <Radio value="ANEMIS">Anemis</Radio>
                    <Radio value="TIDAK ANEMIS">Tidak Anemis</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Sklera" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    defaultValue="NON IKTERIK"
                    onChange={(e) => onMataSklera(e)}
                  >
                    <Radio value="IKTERIK">Ikterik</Radio>
                    <Radio value="NON IKTERIK">Non Ikterik</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Pupil" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    defaultValue="ISOKOR"
                    onChange={(e) => onMataPupil(e)}
                  >
                    <Radio value="ISOKOR">Isokor</Radio>
                    <Radio value="ANISOKOR">Anisokor</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Diameter" style={{ marginBottom: 0 }}>
                  <Input.Group compact>
                    <InputNumber
                      onChange={(e) => onMataDiameter(e)}
                      size="small"
                      style={{ width: "5%" }}
                      defaultValue="3"
                    />{" "}
                    /{" "}
                    <InputNumber
                      size="small"
                      style={{ width: "5%" }}
                      defaultValue="3"
                    />
                  </Input.Group>
                </Form.Item>
                <Form.Item label="Lain-lain" style={{ marginBottom: 0 }}>
                  <TextArea
                    rows={1}
                    value={kepalaLainLain}
                    onChange={(e) => onKepalaLainLain(e.target.value)}
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
                defaultValue="LAIN-LAIN"
                onChange={(e) => onTelinga(e.target.value)}
              >
                <Radio value="PENDARAHAN">Pendarahan</Radio>
                <Radio value="LAIN-LAIN">Lain-lain</Radio>
                {telinga === "LAIN-LAIN" ? (
                  <Input
                    style={{ width: 500 }}
                    defaultValue="TIDAK ADA KELAINAN"
                    onChange={(e) => onTelingaLainnya(e)}
                  />
                ) : null}
              </Radio.Group>
            </Form.Item>
            <Form.Item
              label={<div style={{ fontWeight: "bolder" }}>Hidung</div>}
              style={{ marginBottom: 0 }}
              {...layout}
            >
              <Checkbox onChange={(e) => onHidungDeformitas(e)}>
                Deformitas
              </Checkbox>
              <Checkbox onChange={(e) => onHidungEpistaksis(e)}>
                Episaktis
              </Checkbox>
              <Checkbox onChange={(e) => onHidungDeviasiSeptum(e)}>
                Deviasi Septum
              </Checkbox>
              <Checkbox
                defaultChecked
                onChange={(e) => onHidungLainnya(e.target.checked)}
              >
                Lain-lain
              </Checkbox>
              {hidungLainnya ? (
                <Input
                  // value={hidungLainLain}
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
                defaultValue="LAIN-LAIN"
                onChange={(e) => onMulut(e.target.value)}
              >
                <Radio value="SIANOSIS">Sianosis</Radio>
                <Radio value="LAIN-LAIN">Lain-lain </Radio>
                {mulut === "LAIN-LAIN" ? (
                  <Input
                    style={{ width: 500 }}
                    defaultValue="TIDAK ADA KELAINAN"
                    onChange={(e) => onMulutKeterangan(e)}
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
                  style={{ width: 500 }}
                  rows={1}
                  onChange={(e) => onKepalaLainLain(e)}
                />
              </Radio.Group>
            </Form.Item>
          </Card>
        </TabPane>
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
                  defaultValue="SIMETRIS"
                  onChange={(e) => onLeherKondisi(e)}
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
                  defaultValue="TIDAK"
                  onChange={(e) => onLeherJejas(e)}
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
                  defaultValue="NORMAL"
                  onChange={(e) => onLeherVenaJagularis(e)}
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
                  defaultValue="NORMAL"
                  onChange={(e) => onLeherKelenjarLimfe(e)}
                >
                  <Radio value="TERABA">Teraba</Radio>
                  <Radio value="NORMAL">Normal</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Lain-lain</div>}
                style={{ marginBottom: 0 }}
              >
                <TextArea rows={1} onChange={(e) => onLeherLainnya(e)} />
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
                  defaultValue="SIMETRIS"
                  onChange={(e) => onThoraxKondisi(e)}
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
                  defaultValue="TIDAK"
                  onChange={(e) => onThoraxJejas(e)}
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
                  defaultValue="TIDAK"
                  onChange={(e) => onThoraxRetraksi(e)}
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
                  defaultValue="TIDAK"
                  onChange={(e) => onThoraxKrepitasi(e)}
                >
                  <Radio value="YA">Ya</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Lain-lain</div>}
                style={{ marginBottom: 0 }}
              >
                <TextArea rows={1} onChange={(e) => onThoraxLainnya(e)} />
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
                    defaultValue="BJ I > BJ II"
                    onChange={(e) => onJantung(e)}
                  >
                    <Radio value="BJ I > BJ II">BJ I > BJ II</Radio>
                    <Radio value="BJ II > BJ I">BJ II > BJ I</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Irama" style={{ marginBottom: 0 }}>
                  <Radio.Group
                    defaultValue="REGULER"
                    onChange={(e) => onJantungIrama(e)}
                  >
                    <Radio value="REGULER">Reguler</Radio>
                    <Radio value="IREGULER">Ireguler</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Bunyi" style={{ marginBottom: 0 }}>
                  <Checkbox
                    onChange={(e) => onJantungBunyiMurmur(e.target.checked)}
                  >
                    Murmur
                  </Checkbox>
                  <Checkbox
                    onChange={(e) => onJantungBunyiGallop(e.target.checked)}
                  >
                    Gallop
                  </Checkbox>
                  <Checkbox
                    defaultChecked
                    onChange={(e) => onJantungBunyiLainlain(e.target.checked)}
                  >
                    Lain-lain
                  </Checkbox>
                  {jantungBunyiLainlain ? (
                    <Input
                      style={{ width: 500 }}
                      defaultValue="TIDAK ADA KELAINAN"
                      onChange={(e) => onJantungLainLain(e)}
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
                  <Radio.Group defaultValue="SONOR" onChange={(e) => onParu(e)}>
                    <Radio value="SONOR">Sonor</Radio>
                    <Radio value="HIPERSONOR">HiperSonor</Radio>
                    <Radio value="REDUP">Redup</Radio>
                  </Radio.Group>
                </Form.Item>
                <Form.Item label="Vesikuler" style={{ marginBottom: 0 }}>
                  <Checkbox
                    onChange={(e) => onVesikulerKanan(e.target.checked)}
                  >
                    Kanan
                  </Checkbox>
                  <Checkbox onChange={(e) => onVesikulerKiri(e.target.checked)}>
                    Kiri
                  </Checkbox>
                </Form.Item>
                <Form.Item label="Ronkhi" style={{ marginBottom: 0 }}>
                  <Checkbox onChange={(e) => onRonkhiKanan(e.target.checked)}>
                    Kanan
                  </Checkbox>
                  <Checkbox onChange={(e) => onRonkhiKiri(e.target.checked)}>
                    Kiri
                  </Checkbox>
                </Form.Item>
                <Form.Item label="Wheezing" style={{ marginBottom: 0 }}>
                  <Checkbox onChange={(e) => onWhezingKanan(e.target.checked)}>
                    Kanan
                  </Checkbox>
                  <Checkbox onChange={(e) => onWhezingKiri(e.target.checked)}>
                    Kiri
                  </Checkbox>
                </Form.Item>
                <Form.Item label="Lain-lain" style={{ marginBottom: 0 }}>
                  <TextArea rows={1} onChange={(e) => onParuLainLain(e)} />
                </Form.Item>
              </Form>
            </Form.Item>
          </Card>
        </TabPane>
        <TabPane tab="Abdomen" key="4">
          <Card size="small">
            <Form {...layout}>
              <Form.Item
                label={
                  <div style={{ fontWeight: "bolder" }}>Kondisi Abdomen</div>
                }
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  defaultValue="DATAR"
                  onChange={(e) => onAbdomenKondisi(e)}
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
                  defaultValue="TIDAK"
                  onChange={(e) => onAbdomenJejas(e)}
                >
                  <Radio value="ADA">Ada</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Peristaltik</div>}
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  defaultValue="NORMAL"
                  onChange={(e) => onAbdomenPeristaltik(e)}
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
                  defaultValue="TIDAK"
                  onChange={(e) => onAbdomenHati(e)}
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
                  defaultValue="TIDAK"
                  onChange={(e) => onAbdomenLimpa(e)}
                >
                  <Radio value="TERABA">Teraba</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Nyeri tekan</div>}
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  defaultValue="TIDAK"
                  onChange={(e) => onAbdomenNyeriTekan(e)}
                >
                  <Radio value="YA">Ya</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Lain-lain</div>}
                style={{ marginBottom: 0 }}
              >
                <TextArea rows={1} onChange={(e) => onAbdomenLainLain(e)} />
              </Form.Item>
            </Form>
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
                  defaultValue="TIDAK"
                  onChange={(e) => onUrogenitalJejas(e)}
                >
                  <Radio value="ADA">Ada</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
              {curpas.jenisKelamin === "PEREMPUAN" ? (
                <Form.Item
                  label={<div style={{ fontWeight: "bolder" }}>Vagina</div>}
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group onChange={(e) => onUrogenitalKelamin(e)}>
                    <Radio value="PENDARAHAN">Pendarahan</Radio>
                    <Radio value="BENJOLAN">Benjolan</Radio>
                    <Radio value="NORMAL">Normal</Radio>
                    <Radio value="LAIN-LAIN">Lain-lain</Radio>
                  </Radio.Group>
                </Form.Item>
              ) : (
                <Form.Item
                  label={<div style={{ fontWeight: "bolder" }}>Skrotum</div>}
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    onChange={(e) => onUrogenitalKelamin(e.target.value)}
                  >
                    <Radio value="MEMBESAR">Membesar</Radio>
                    <Radio value="NORMAL">Normal</Radio>
                    <Radio value="LAIN-LAIN">Lain-lain</Radio>
                    {urogenitalKelamin === "LAIN-LAIN" ? (
                      <Input
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
                <TextArea rows={1} onChange={(e) => onUrogenitalLainLain(e)} />
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
                  <Input style={{ width: "60px" }} defaultValue="5" />
                  <Input style={{ width: "60px" }} defaultValue="5" />
                </Input.Group>
                <Input.Group compact>
                  <Input style={{ width: "60px" }} defaultValue="5" />
                  <Input style={{ width: "60px" }} defaultValue="5" />
                </Input.Group>
                <Checkbox>TIDAK DAPAT DINILAI</Checkbox>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Edem</div>}
                style={{ marginBottom: 0 }}
              >
                <Input.Group compact>
                  <Input style={{ width: "60px" }} defaultValue="-" />
                  <Input style={{ width: "60px" }} defaultValue="-" />
                </Input.Group>
                <Input.Group compact>
                  <Input style={{ width: "60px" }} defaultValue="-" />
                  <Input style={{ width: "60px" }} defaultValue="-" />
                </Input.Group>
              </Form.Item>
              <Form.Item
                label={<div style={{ fontWeight: "bolder" }}>Sianosis</div>}
                style={{ marginBottom: 0 }}
              >
                <Radio.Group
                  onChange={(e) => onEkstremisSianosis(e.target.value)}
                >
                  <Radio value="YA">Ya</Radio>
                  <Radio value="TIDAK">Tidak</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Card>
        </TabPane>
      </Tabs>
      {/* <Card>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Space >
                            <Button onClick={onSimpanPemFisik} >Simpan</Button>
                            <Button>Batal</Button>
                            <Button>Cetak</Button>
                        </Space>
                    </Col>
                </Row>
            </Card> */}
      {/* <Form>
                <Row gutter={[16, 16]}>
                    <Col span={8}>
                        <Card size="small" title="Pemeriksaan Kepala" headStyle={{ textAlign: 'left', fontWeight: 'bold' }}>
                            <TextArea />
                            Mata <TextArea rows={1} />
                                Telinga/Hidung <TextArea rows={1} />
                                Mulut dan Gigi <TextArea rows={1} />
                                Lain - lain <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Pemeriksaan Leher" headStyle={{ textAlign: 'center' }}>
                            Tyroid <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Pemeriksaan Dada" headStyle={{ textAlign: 'center' }}>
                            Paru <TextArea rows={1} />
                                Jantung <TextArea rows={1} />
                                Dinding Dada <TextArea rows={1} />
                        </Card>

                    </Col>
                    <Col span={8}>
                        <Card size="small" title="Pemeriksaan Abdomen" headStyle={{ textAlign: 'center' }}>
                            Dinding Perut <TextArea rows={1} />
                                Hepar / Lien <TextArea rows={1} />
                                Usus <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Pemeriksaan Punggung" headStyle={{ textAlign: 'center' }}>
                            C. Vertebrae <TextArea rows={1} />
                                Ginjal <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Pemeriksaan Coxae" headStyle={{ textAlign: 'center' }}>
                            Pemeriksaan Genetalia Externa  <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Pemeriksaan Extremitas" headStyle={{ textAlign: 'center' }}>
                            Superior <TextArea rows={1} />
                                Inferior <TextArea rows={1} />
                        </Card>

                    </Col>
                    <Col span={8}>
                        <Card size="small" title="Pemeriksaan Limphonodi" headStyle={{ textAlign: 'center' }}>
                            <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Pemeriksaan Reflek" headStyle={{ textAlign: 'center' }}>
                            <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Pemeriksaan Tugor Kulit" headStyle={{ textAlign: 'center' }}>
                            <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Pemeriksaan Akral" headStyle={{ textAlign: 'center' }}>
                            <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Pemeriksaan Lokal" headStyle={{ textAlign: 'center' }}>
                            <TextArea rows={1} />
                        </Card>
                        <Card size="small" title="Analisa" headStyle={{ textAlign: 'center' }}>
                            Permasalah Medis <TextArea rows={1} />
                                    Permasalahan Perawat <TextArea rows={1} />
                                    Dx Awal <TextArea rows={1} />
                        </Card>
                    </Col>
                </Row>
                <Row gutter={[16, 16]}>
                    <Col span={12}>
                        <Space>
                            <Button>Cetak</Button>
                        </Space>
                    </Col>
                    <Col span={12} style={{ textAlign: 'right' }}>
                        <Space>
                            <Popconfirm
                                title="Apakah data sudah benar?"
                                onConfirm={() => onSimpanPemFisik()}
                                onCancel={onCanceltip}
                                okText="Ya"
                                cancelText="Tidak"
                            >
                                <Button type={'primary'}>Simpan</Button>
                            </Popconfirm>
                            <Button>Batal</Button>
                        </Space>
                    </Col>
                </Row>
            </Form> */}
    </div>
  );
};

export default PemeriksaanFisikHD;
