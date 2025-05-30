import React, { useContext, useState, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Popconfirm,
  message,
  Alert,
  Card,
  Tabs,
  Space,
  DatePicker,
  Empty,
  Modal,
  Table,
  Divider,
  Tooltip,
  Slider,
  Radio,
  Typography,
  Collapse,
  Spin,
  InputNumber,
} from "antd";
import Iframe from "react-iframe";
import dayjs from "dayjs";
import { PengkajianContext } from "../context/PengkajianContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import { AssesmentRIContext } from "../context/AssesmentRIContext";
import FormNIHSS from "../Pengkajian/FormNIHSS";
import FormLatchScore from "../Pengkajian/FormLatchScore";
import FormOedema from "../Pengkajian/FormOedema";
import FormFungsiMenelan from "../Pengkajian/FormFungsiMenelan";
import FormFungsiOtot from "../Pengkajian/FormFungsiOtot";
import FormSofaScore from "../Pengkajian/FormSofaScore";
import FormTrauma from "../Pengkajian/FormTrauma";
import FormBraden from "../Pengkajian/FormBraden";
import FormDisfagia from "../Pengkajian/FormDisfagia";
import FormFaktorRisiko from "../Pengkajian/FormFaktorRisiko";
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;
const formItemLayoutFull = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayoutdpjp = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const AssesmentTambahan = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const { tglTTV } = useContext(AssesmentRIContext);
  const [openmodal, setopenmodal] = useState(false);
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
    modalRisiko,
    setmodalRisiko,
    faktorRisikoId,
  } = useContext(PengkajianContext);

  return (
    <div>
      <Row gutter={[5, 5]}>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Latchscore"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                readOnly
                value={latchTotal}
                style={{ width: "10%" }}
              />
              <Input
                type="text"
                placeholder="..."
                // disabled
                value={ketLatchScore}
                style={stylekuLatchScore}
                readOnly
              />
              <Button
                type="primary"
                onClick={() => {
                  setvisibleLatch(true);
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Derajat Oedema"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                readOnly
                value={nilaiOedema}
                style={{ width: "10%" }}
              />
              <Input
                type="text"
                placeholder="..."
                // disabled
                value={ketOedema}
                style={
                  nilaiOedema === 1
                    ? {
                        color: "black",
                        backgroundColor: "green",
                        width: "80%",
                      }
                    : nilaiOedema === 2
                    ? {
                        color: "black",
                        backgroundColor: "lightgreen",
                        width: "80%",
                      }
                    : nilaiOedema === 3
                    ? {
                        color: "black",
                        backgroundColor: "yellowgreen",
                        width: "80%",
                      }
                    : nilaiOedema === 4
                    ? {
                        color: "black",
                        backgroundColor: "yellow",
                        width: "80%",
                      }
                    : { color: "", backgroundColor: "", width: "80%" }
                }
                readOnly
              />
              <Button
                type="primary"
                onClick={() => {
                  setmodalOedema(true);
                  setflagOedema("AWAL");
                  settglOedema(dayjs(tglTTV));
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Fungsi Menelan"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                readOnly
                value={nilaimenelan}
                style={{ width: "10%" }}
              />
              <Input
                type="text"
                placeholder="..."
                // disabled
                value={ketMenenlan}
                style={
                  nilaimenelan > 19 && nilaimenelan < 81
                    ? {
                        color: "black",
                        backgroundColor: "orange",
                        width: "80%",
                      }
                    : nilaimenelan > 80 && nilaimenelan < 100
                    ? {
                        color: "black",
                        backgroundColor: "yellowgreen",
                        width: "80%",
                      }
                    : { color: "", backgroundColor: "", width: "80%" }
                }
                readOnly
              />
              <Button
                type="primary"
                onClick={() => {
                  setmodalMenelan(true);
                  setflagMenelan("AWAL");
                  settglMenelan(dayjs(tglTTV));
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Fungsi Otot"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                readOnly
                value={nilaiOtot}
                style={{ width: "10%" }}
              />
              <Input
                type="text"
                placeholder="..."
                // disabled
                value={ketOtot}
                style={
                  nilaiOtot === 0
                    ? { color: "black", backgroundColor: "red", width: "80%" }
                    : nilaiOtot === 1
                    ? {
                        color: "black",
                        backgroundColor: "orange",
                        width: "80%",
                      }
                    : nilaiOtot === 2
                    ? {
                        color: "black",
                        backgroundColor: "yellow",
                        width: "80%",
                      }
                    : nilaiOtot === 3
                    ? {
                        color: "black",
                        backgroundColor: "yellowgreen",
                        width: "80%",
                      }
                    : nilaiOtot === 4
                    ? {
                        color: "black",
                        backgroundColor: "lightgreen",
                        width: "80%",
                      }
                    : nilaiOtot === 5
                    ? {
                        color: "black",
                        backgroundColor: "green",
                        width: "80%",
                      }
                    : { color: "", backgroundColor: "", width: "80%" }
                }
                readOnly
              />
              <Button
                type="primary"
                onClick={() => {
                  setmodalOtot(true);
                  setflagOtot("AWAL");
                  settglOtot(dayjs(tglTTV));
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Pengkajian Sofa"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                readOnly
                value={nilaisofa}
                style={{ width: "10%" }}
              />
              <Input
                type="text"
                placeholder="..."
                // disabled
                // value={}
                style={{ width: "80%" }}
                readOnly
              />
              <Button
                type="primary"
                onClick={() => {
                  setmodalSofa(true);
                  setflagSofa("AWAL");
                  settglSofa(dayjs(tglTTV));
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Pengkajian Trauma"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                readOnly
                value={nilaitrauma}
                style={{ width: "10%" }}
              />
              <Input
                type="text"
                placeholder="..."
                // disabled
                value={keterangantrauma}
                style={
                  nilaitrauma < 10
                    ? {
                        color: "black",
                        backgroundColor: "green",
                        width: "80%",
                      }
                    : nilaitrauma > 10 && nilaitrauma < 21
                    ? {
                        color: "black",
                        backgroundColor: "yellowgreen",
                        width: "80%",
                      }
                    : nilaitrauma > 20 && nilaitrauma < 31
                    ? {
                        color: "black",
                        backgroundColor: "yellow",
                        width: "80%",
                      }
                    : nilaitrauma > 30 && nilaitrauma < 41
                    ? {
                        color: "black",
                        backgroundColor: "orange",
                        width: "80%",
                      }
                    : nilaitrauma > 40
                    ? {
                        color: "black",
                        backgroundColor: "red",
                        width: "80%",
                      }
                    : { color: "", backgroundColor: "", width: "80%" }
                }
                readOnly
              />
              <Button
                type="primary"
                onClick={() => {
                  setmodalTrauma(true);
                  setflagTrauma("AWAL");
                  settglTrauma(dayjs(tglTTV));
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Skala Braden"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                readOnly
                value={nilaiBraden}
                style={{ width: "10%" }}
              />
              <Input
                type="text"
                placeholder="..."
                // disabled
                value={keternganBraden}
                style={
                  nilaiBraden >= 20 && nilaiBraden <= 23
                    ? {
                        color: "black",
                        backgroundColor: "yellowgreen",
                        width: "80%",
                      }
                    : nilaiBraden >= 15 && nilaiBraden <= 19
                    ? {
                        color: "black",
                        backgroundColor: "yellow",
                        width: "80%",
                      }
                    : nilaiBraden >= 11 && nilaiBraden <= 14
                    ? {
                        color: "black",
                        backgroundColor: "orange",
                        width: "80%",
                      }
                    : nilaiBraden >= 6 && nilaiBraden <= 10
                    ? {
                        color: "black",
                        backgroundColor: "red",
                        width: "80%",
                      }
                    : { color: "", backgroundColor: "", width: "80%" }
                }
                readOnly
              />
              <Button
                type="primary"
                onClick={() => {
                  setmodalBraden(true);
                  setflagBraden("AWAL");
                  settglBraden(dayjs(tglTTV));
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Skala Disfagia"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                // disabled
                value={ketDisfagia}
                style={{ width: "90%" }}
                readOnly
              />
              <Button
                type="primary"
                onClick={() => {
                  setmodalDisfagia(true);
                  setflagDisfagia("AWAL");
                  settglDisfagia(dayjs(tglTTV));
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Skala NIHSS"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                readOnly
                value={nilaiNihss}
                style={{ width: "10%" }}
              />
              <Input
                type="text"
                placeholder="..."
                // disabled
                value={ketNihss}
                style={
                  nilaiNihss < 5
                    ? {
                        color: "black",
                        backgroundColor: "yellowgreen",
                        width: "80%",
                      }
                    : nilaiNihss >= 5 && nilaiNihss <= 14
                    ? {
                        color: "black",
                        backgroundColor: "yellow",
                        width: "80%",
                      }
                    : nilaiNihss >= 15 && nilaiNihss <= 24
                    ? {
                        color: "black",
                        backgroundColor: "orange",
                        width: "80%",
                      }
                    : nilaiNihss >= 25
                    ? {
                        color: "black",
                        backgroundColor: "red",
                        width: "80%",
                      }
                    : { color: "", backgroundColor: "", width: "80%" }
                }
                readOnly
              />
              <Button
                type="primary"
                onClick={() => {
                  setmodalNihss(true);
                  setflagNihss("AWAL");
                  settglNihss(dayjs(tglTTV));
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
        <Col span={24}>
          <Form.Item
            {...formItemLayoutdpjp}
            label="Faktor Risiko"
            style={{ marginBottom: 5 }}
          >
            <Input.Group compact>
              <Input
                type="text"
                placeholder="..."
                readOnly
                value={faktorRisikoId === 0 ? "" : "Terdapat Faktor Risiko"}
                style={
                  faktorRisikoId === 0
                    ? {
                        color: "",
                        backgroundColor: "",
                        width: "90%",
                      }
                    : {
                        color: "black",
                        backgroundColor: "orange",
                        width: "90%",
                      }
                }
              />
              <Button
                type="primary"
                onClick={() => {
                  setmodalRisiko(true);
                  //   console.log(faktorRisikoId);
                }}
                style={{ width: "10%" }}
              >
                Tambah
              </Button>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>
      <Modal
        title="Assesment Faktor Risiko"
        open={modalRisiko}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalRisiko(false);
        }}
      >
        <FormFaktorRisiko />
      </Modal>
      <Modal
        title="Assesment Latch Score"
        open={visibleLatch}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setvisibleLatch(false);
        }}
      >
        <FormLatchScore />
      </Modal>
      <Modal
        title="Assesment Derajat Oedema"
        open={modalOedema}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalOedema(false);
        }}
      >
        <FormOedema />
      </Modal>
      <Modal
        title="Assesment Fungsi Menelan"
        open={modalMenelan}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalMenelan(false);
        }}
      >
        <FormFungsiMenelan />
      </Modal>
      <Modal
        title="Assesment Fungsi Otot"
        open={modalOtot}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalOtot(false);
        }}
      >
        <FormFungsiOtot />
      </Modal>
      <Modal
        title="Assesment SOFA"
        open={modalSofa}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalSofa(false);
        }}
      >
        <FormSofaScore />
      </Modal>
      <Modal
        title="Assesment Trauma"
        open={modalTrauma}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalTrauma(false);
        }}
      >
        <FormTrauma />
      </Modal>
      <Modal
        title="Assesment Braden"
        open={modalBraden}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalBraden(false);
        }}
      >
        <FormBraden />
      </Modal>
      <Modal
        title="Assesment Disfagia"
        open={modalDisfagia}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalDisfagia(false);
        }}
      >
        <FormDisfagia />
      </Modal>
      <Modal
        title="Assesment NIHSS"
        open={modalNihss}
        style={{ marginTop: 10 }}
        width="70%"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalNihss(false);
        }}
      >
        <FormNIHSS />
      </Modal>
    </div>
  );
};

export default AssesmentTambahan;
