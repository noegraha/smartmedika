import React, {
  useContext,
  Fragment,
  useState,
  useEffect,
  useRef,
} from "react";
import {
  Button,
  Input,
  Row,
  Select,
  Form,
  Col,
  Card,
  message,
  Modal,
  Space,
  Popover,
} from "antd";
import { PasienContext } from "../context/PasienContext";
import { CatatanmedisContext } from "../context/CatatanmedisContext";
import { LoginContext } from "../context/LoginContext";
import dayjs from "dayjs";
import WebcamComponent from "../../usersetting/WebcamComponent";
import axios from "axios";
import {
  AudioMutedOutlined,
  AudioOutlined,
  CameraFilled,
} from "@ant-design/icons";
// import Ttd from './ttd';
const { TextArea } = Input;
const { Option } = Select;

const Formdokter = () => {
  const { curpas, ruangasal, poli1 } = useContext(PasienContext);
  const { namauser, pegawai, host } = useContext(LoginContext);
  const {
    hubungan,
    insertCatatanMedis,
    subjektif,
    allo,
    objektif,
    assesment,
    planning,
    nama,
    hubungankel,
    verified,
    verifiedTime,
    tandatangan,
    setTandaTangan,
    setSubjektif,
    setObjektif,
    setAssesment,
    setAlloAnamnesa,
    setNama,
    setPlanning,
    setHubunganKel,
    setVerified,
    setVerifiedTime,
    catatanmedisIdRj,
    loadingCatatanMedis,
    setLoadingCatatanMedis,
    modalopen,
    setModalOpen,
    modalopen1,
    setModalOpen1,
    getMstHubungan,
  } = useContext(CatatanmedisContext);
  const [form] = Form.useForm();
  const ip = sessionStorage.getItem("IP");
  const hostpc = sessionStorage.getItem("Host");
  const apiku = sessionStorage.getItem("api");
  const [isSpeech, setSpeech] = useState(false);
  const dataCatatanMedis = {
    catatanMedisId: catatanmedisIdRj,
    registrasiId: curpas.registrasiId,
    nama: nama,
    hubunganId: hubungankel,
    subjektif: subjektif,
    alloAnamnesa: allo,
    objektif: objektif,
    assesment: assesment,
    planning: planning,
    instruksi: "-",
    evaluasi: "-",
    implementasi: "-",
    pelaksanaId: curpas.dokterId,
    namaPelaksana: curpas.namaDpjp,
    namaProfesi: "Dokter Spesialis",
    userId: namauser,
    ruangId: curpas.ruangId,
    verified: verified,
    verifiedTime: verifiedTime,
    clientHost: hostpc,
    clientIp: ip,
    // skalaNyeri: "10",
    // citasi: "5",
    // citNomer: 0,
    // citated: 0,
  };

  const simpanCatatanMedis = (e) => {
    // e.preventDefault();
    insertCatatanMedis(dataCatatanMedis);
    setLoadingCatatanMedis(true);
    // console.log("catatan", dataCatatanMedis);
  };
  const onTtd = () => {
    setVerified(true);
    setTandaTangan(sessionStorage.getItem("ttd"));
    setVerifiedTime(dayjs().format("YYYY-MM-DDTHH:mm:ss"));
  };

  const currentDate = dayjs();
  const formattedDate = currentDate.format("YYMMDD");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const poliTTDFace = ["9109", "9148", "9135", "9119", "9160", "9146"];
  const isTTDFace = poliTTDFace.includes(ruangasal);

  const poliSimpan = ["91A7", "9125", "9146"];
  const isSimpan = poliSimpan.includes(ruangasal);

  const onVerified = () => {
    // setModalOpen(true);
    // window.open("/#/faceapi", "_blank", "width=600,height=400");
    // if (
    //   subjektif === null ||
    //   allo === null ||
    //   objektif === null ||
    //   assesment === null ||
    //   planning === null ||
    //   nama === null ||
    //   hubungankel === null
    // ) {
    //   message.warning("Data tidak boleh kosong!");
    // } else {
    if (isTTDFace) {
      setLoadingCatatanMedis(true);
      axios
        .get(
          `${apiku}/EmrCatatanMedis/GetCount/${pegawai}/${poli1}/${formattedDate}`,
          options
        )
        .then((res) => {
          if (res.data.statusCode === 200) {
            setLoadingCatatanMedis(false);
            if (
              res.data.result.TotalRegistrasiCount % 15 === 0 ||
              res.data.result.TotalRegistrasiCount === 0
            ) {
              if (res.data.result.TotalRegistrasiCount === 0) {
                curpas.dokterId === pegawai
                  ? setModalOpen1(true)
                  : message.warning("Bukan DPJP!");
              } else {
                curpas.dokterId === pegawai
                  ? setModalOpen(true)
                  : message.warning("Bukan DPJP!");
              }
            } else {
              curpas.dokterId === pegawai
                ? onTtd()
                : message.warning("Bukan DPJP!");
            }
            console.log("count ", res.data.result.TotalRegistrasiCount);
          } else {
            setLoadingCatatanMedis(true);
            message.warning(res.data.message);
          }
        })
        .catch((err) => {
          setLoadingCatatanMedis(true);
          console.log(err);
          message.error("Koneksi terputus!");
        });
    } else {
      if (curpas.dokterId === pegawai) {
        onTtd();
      } else {
        message.warning("Bukan DPJP!");
      }
    }
  };
  // };

  const [isListening, setIsListening] = useState(false);
  const [recognition, setRecognition] = useState(null);
  const [activeElement, setActiveElement] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [transcript, setTranscript] = useState("");
  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check if the browser supports the Web Speech API
    if ("webkitSpeechRecognition" in window) {
      const SpeechRecognition = window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = "id-ID";

      recognitionRef.current.onresult = (event) => {
        let interimTranscript = "";
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptPart = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            setTranscript((prev) => prev + transcriptPart);
          } else {
            interimTranscript += transcriptPart;
          }
        }
        setTranscript((prev) => prev + interimTranscript);
      };

      recognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.error("Browser does not support Web Speech API");
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      recognition.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const handleFocus = (e) => {
    setActiveElement(e.target);
    setCursorPosition(e.target.selectionStart);
  };

  const handleListen = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
      } else {
        recognitionRef.current.start();
        setTranscript(""); // Reset transcript ketika mulai mendengarkan
      }
      setIsListening(!isListening);
    }
  };

  const insertTextAtCursor = (text) => {
    if (activeElement) {
      const start = cursorPosition;
      const end = activeElement.selectionEnd;
      const value = activeElement.value;
      const newValue = value.substring(0, start) + text + value.substring(end);
      activeElement.value = newValue;
      setCursorPosition(start + text.length);
      // Mengupdate elemen aktif dengan teks baru dan memposisikan kembali kursor
      activeElement.setSelectionRange(start + text.length, start + text.length);
      setActiveElement((prev) => ({ ...prev, value: newValue }));
    }
  };

  return (
    <Fragment>
      <Card
        size="small"
        title="Form Dokter"
        headStyle={{ fontWeight: "bolder", backgroundColor: "beige" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
          marginBottom: 18,
        }}
        loading={loadingCatatanMedis}
        extra={
          <div>
            {poli1 ? (
              isTTDFace ? (
                <Popover
                  placement="left"
                  content={<WebcamComponent />}
                  title="Presensi"
                  trigger="click"
                >
                  <Button size="small" shape="circle" icon={<CameraFilled />} />
                </Popover>
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {/* <Button
              size="small"
              shape="circle"
              icon={isListening ? <AudioMutedOutlined /> : <AudioOutlined />}
              onClick={handleListen}
            /> */}
          </div>
        }
      >
        <Form
          form={form}
          name="basic"
          initialValues={{ remember: true }}
          onFinish={simpanCatatanMedis}
        >
          <Row gutter={[8, 8]}>
            <Col span={8} xs={24} sm={12} md={12} lg={12} xl={12}>
              {/* <p>{catatanmedisIdRj}</p> */}
              <Form.Item style={{ marginBottom: 0 }}>
                <Row>
                  <Col span={12}>Subject</Col>
                  <Col span={12}>
                    {/* <Button
                      size="small"
                      shape="circle"
                      icon={
                        isListening ? <AudioMutedOutlined /> : <AudioOutlined />
                      }
                      onClick={handleListen}
                    /> */}
                  </Col>
                </Row>
                <TextArea
                  showCount
                  maxLength={4000}
                  autoSize={{
                    minRows: 6,
                    maxRows: 10,
                  }}
                  onChange={(e) => setSubjektif(e.target.value)}
                  // onChange={handleChange}
                  value={subjektif}
                  // value={subjektif + transcript}
                  onFocus={handleFocus}
                />
              </Form.Item>
            </Col>

            <Col span={8} xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item style={{ marginBottom: 0 }}>
                Allo Anamnesa - Keterangan Keluarga
                <br />
                <TextArea
                  autoSize={{
                    minRows: 4,
                    maxRows: 10,
                  }}
                  showCount
                  maxLength={4000}
                  onChange={(e) => setAlloAnamnesa(e.target.value)}
                  // onChange={handleChange}
                  value={allo}
                  onFocus={handleFocus}
                />
              </Form.Item>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    Nama
                    <br />
                    <Input
                      onChange={(e) => setNama(e.target.value)}
                      value={nama}
                      onFocus={handleFocus}
                    />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item style={{ marginBottom: 0 }}>
                    Hubungan Keluarga
                    <br />
                    <Select
                      onFocus={() => getMstHubungan()}
                      dataSource={hubungan}
                      showSearch
                      value={hubungankel}
                      style={{ width: "100%" }}
                      placeholder="Pilih Hubungan..."
                      optionFilterProp="children"
                      onChange={(e) => setHubunganKel(e)}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {hubungan.map((d) => (
                        <Option key={d.hubunganId}>{d.deskripsi}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          {/* <Row gutter={[8, 8]}>
            <Col span={8} xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item style={{ marginBottom: 0 }}>
                Nama
                <br />
                <Input
                  onChange={(e) => setNama(e.target.value)}
                  value={nama}
                  onFocus={handleFocus}
                />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item style={{ marginBottom: 0 }}>
                Hubungan
                <br />
                <Select
                  onFocus={() => getMstHubungan()}
                  dataSource={hubungan}
                  showSearch
                  value={hubungankel}
                  style={{ width: "100%" }}
                  placeholder="Pilih Hubungan..."
                  optionFilterProp="children"
                  onChange={(e) => setHubunganKel(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {hubungan.map((d) => (
                    <Option key={d.hubunganId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row> */}
          <Row gutter={[8, 8]}>
            <Col span={8} xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item style={{ marginBottom: 0 }}>
                Object
                <br />
                <TextArea
                  autoSize={{
                    minRows: 4,
                    maxRows: 10,
                  }}
                  showCount
                  maxLength={4000}
                  onChange={(e) => setObjektif(e.target.value)}
                  value={objektif}
                  onFocus={handleFocus}
                />
              </Form.Item>
            </Col>
            <Col span={8} xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item style={{ marginBottom: 0 }}>
                Assesment
                <br />
                <TextArea
                  autoSize={{
                    minRows: 4,
                    maxRows: 10,
                  }}
                  showCount
                  maxLength={4000}
                  onChange={(e) => setAssesment(e.target.value)}
                  value={assesment}
                  onFocus={handleFocus}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={8} xs={24} sm={12} md={12} lg={12} xl={12}>
              <Form.Item style={{ marginBottom: 0 }}>
                Plan Terapi Tindakan Penunjang
                <br />
                <TextArea
                  autoSize={{
                    minRows: 4,
                    maxRows: 10,
                  }}
                  showCount
                  maxLength={4000}
                  onChange={(e) => setPlanning(e.target.value)}
                  value={planning}
                  onFocus={handleFocus}
                />
              </Form.Item>
            </Col>
            <Col
              span={8}
              xs={24}
              sm={12}
              md={12}
              lg={12}
              xl={12}
              style={{ textAlign: "right" }}
            >
              <Form.Item style={{ marginTop: 10, marginBottom: 0 }}>
                Tanda Tangan
                <br />
                {/* {verified ? ( */}
                <img
                  style={{
                    width: 200,
                    height: 90,
                    backgroundColor: "#fff",
                    borderStyle: "solid",
                    borderRadius: 10,
                    borderWidth: 1,
                  }}
                  src={tandatangan}
                  onClick={onVerified}
                  alt="Klik Disini untuk Tanda Tangan"
                />
                {/* ) : ( */}
                {/* <img
                      style={{
                        width: 200,
                        height: 90,
                        backgroundColor: "#fff",
                        borderStyle: "solid",
                        borderRadius: 10,
                        borderWidth: 1,
                      }}
                      onClick={onVerified}
                      alt="Klik Disini untuk Tanda Tangan"
                    /> */}
                {/* )} */}
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                disabled={
                  dayjs().format("DD-MM-YYYY") === curpas.tanggalMasuk ||
                  isSimpan
                    ? // || curpas.ruangId === "9147"
                      curpas.ruangKonsul === null
                      ? false
                      : curpas.ruangId === curpas.ruangKonsul
                      ? false
                      : ruangasal !== curpas.ruangId
                      ? false
                      : curpas.ruangKonsul.includes("A")
                      ? false
                      : true
                    : true
                }
              >
                Simpan
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>

      <Modal
        title="Presensi DPJP"
        centered
        width={800}
        open={modalopen}
        onOk={() => setModalOpen(false)}
        onCancel={() => setModalOpen(false)}
        footer={[
          <Space>
            <Button key="back" onClick={() => setModalOpen(false)}>
              Kembali
            </Button>{" "}
            <WebcamComponent />
          </Space>,
        ]}
      >
        <p>
          Anda sudah melakukan tanda tangan 15 kali. Silahkan lakukan capture
          presensi terlebih dahulu.
        </p>
        <p>Pastikan kamera webcam sudah terpasang untuk melakukan presensi.</p>
      </Modal>

      <Modal
        title="Presensi DPJP"
        centered
        open={modalopen1}
        onOk={() => setModalOpen1(false)}
        onCancel={() => setModalOpen1(false)}
        footer={[
          <Space>
            <Button key="back" onClick={() => setModalOpen1(false)}>
              Kembali
            </Button>{" "}
            <WebcamComponent />
          </Space>,
        ]}
      >
        <p>Silahkan lakukan capture presensi pertama terlebih dahulu.</p>
        <p>Pastikan kamera webcam sudah terpasang untuk melakukan presensi.</p>
        {host === "smart.rsmargono.id" || host === "smart.rsmargono.my.id" ? (
          <></>
        ) : (
          <p>
            Silahkan Anda masuk ke web Smartmedika{" "}
            <Button size="small" type="link" href="https://smart.rsmargono.id">
              Klik Disini
            </Button>
          </p>
        )}
      </Modal>
    </Fragment>
  );
};

export default Formdokter;
