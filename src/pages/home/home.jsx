import React, { useContext, useState, useEffect } from "react";
import {
  Row,
  Col,
  Modal,
  Alert,
  Button,
  Rate,
  Card,
  Table,
  DatePicker,
  Select,
  Space,
  Input,
  message,
  Form,
} from "antd";
import "../../pages/App.css";
import { TextLoop } from "react-text-loop-next";
import { LoginContext } from "../rawatjalan/context";
import Pdf from "../../assets/file/Manualbook.pdf";
import { SearchOutlined } from "@ant-design/icons";
import axios from "axios";
import FaceTracking from "../tools/FaceTracking";
import FingerPrint from "../tools/FingerPrint";
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { RangePicker } = DatePicker;
const { Option } = Select;

const isTouchDevice = () => {
  return window.matchMedia("(pointer: coarse)").matches;
};

const Home = () => {
  const [modalRating, setModalRating] = useState(false);
  const [modal, setModal] = useState(false);
  const [ruangan, setRuangan] = useState(null);
  const [keterangan, setKeterangan] = useState(null);
  const nama = sessionStorage.getItem("namapetugas");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const {
    namauser,
    ratingDokterPure,
    pegawai,
    ratingpure,
    tanggalawal,
    setTanggalawal,
    tanggalakhir,
    setTanggalakhir,
    komentar,
    ratingDokter,
    setRatingpilih,
    ratingpilih,
    loadingrating,
    modalKomputer,
    setModalKomputer,
    getRuangan,
    listRuangan,
    ipPC,
    apiku,
  } = useContext(LoginContext);

  const [time, setTime] = useState(getTime());

  useEffect(() => {
    let timer1 = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(timer1);
    };
  }, [time]);

  const isidr = {
    kode_dokter: pegawai,
    start_date: tanggalawal,
    end_date: tanggalakhir,
  };
  const isirating = {
    kode_dokter: pegawai,
    start_date: tanggalawal,
    end_date: tanggalakhir,
    star: ratingpilih,
  };
  function getTime() {
    let ampm;
    const d = new Date();
    var hour = d.getHours();
    var min = d.getMinutes();
    if (hour >= 12) {
      ampm = "PM";
      hour === 12 ? (hour = 12) : (hour = ("0" + (hour - 12)).slice(-2));
    } else {
      ampm = "AM";
      hour === 0 ? (hour = 12) : (hour = ("0" + hour).slice(-2));
    }
    if (min < 10) min = ("0" + min).slice(-2);
    // console.log(`${hour} : ${min} ${ampm}`);
    return `${hour}:${min} ${ampm}`;
  }

  var OS = "Unknown";
  if (navigator.userAgent.indexOf("Win") !== -1) OS = "Windows";
  if (navigator.userAgent.indexOf("Mac") !== -1) OS = "MacOS";
  if (navigator.userAgent.indexOf("X11") !== -1) OS = "UNIX";
  if (navigator.userAgent.indexOf("Linux") !== -1) OS = "Linux";

  let userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = "Chrome";
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = "Firefox";
  } else if (userAgent.match(/safari/i)) {
    browserName = "Safari";
  } else if (userAgent.match(/opr\//i)) {
    browserName = "Opera";
  } else if (userAgent.match(/edg/i)) {
    browserName = "Edge";
  } else {
    browserName = "No browser detection";
  }

  const columns = [
    {
      title: "Tanggal",
      dataIndex: "wakturate",
      key: "wakturate",
      width: "15%",
    },
    {
      title: "Nilai",
      dataIndex: "nilairate",
      key: "nilairate",
      render(text, record) {
        return {
          props: {
            style: {
              cursor: "default",
            },
          },
          children: <Rate disabled value={parseInt(text)} />,
        };
      },
      width: "15%",
    },
    {
      title: "Saran",
      dataIndex: "saran",
      key: "saran",
      width: "70%",
    },
  ];

  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  return (
    <div className="backcontent">
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Alert
            style={{ margin: 20 }}
            message={`Selamat datang kembali. Anda login dengan menggunakan akun ${namauser}`}
            type="success"
            closable
            showIcon
          />
          <Alert
            style={{ margin: 20 }}
            showIcon
            banner
            type="info"
            message={
              <TextLoop mask noWrap={true}>
                <span>
                  Waktu pengisian saat ini <span>{time.slice(0, 2)}</span>
                  <span>:</span>
                  <span>{`${time.slice(3, 6)} ${time.slice(-2)}`}</span>{" "}
                </span>
                <span>Aplikasi masih dalam tahap pengembangan.</span>
              </TextLoop>
            }
          />
          <Alert
            style={{ margin: 20 }}
            message={
              <span>
                Untuk melihat Manual Book RKE Rawat Jalan{" "}
                <a href={Pdf} target="_blank" rel="noopener noreferrer">
                  Klik Disini
                </a>
              </span>
            }
            type="info"
            closable
            showIcon
          />
          <Alert
            style={{ margin: 20 }}
            message={
              <span>
                Browser Anda : <b>{browserName}</b> | OS Anda : <b>{OS}</b> |
                Mendukung Touchscreen : {isTouch ? <b>Ya</b> : <b>Tidak</b>}
              </span>
            }
            type="info"
            closable
            showIcon
          />
          {pegawai !== null ? (
            pegawai.slice(0, 1) === "D" ? (
              <Card
                title="Rating Kepuasan Pasien"
                headStyle={{ fontWeight: "bolder", backgroundColor: "#fffb8f" }}
                style={{
                  borderWidth: "2px",
                  borderColor: "darkgray",
                  borderRadius: "4px",
                  margin: 20,
                  maxWidth: "500px",
                }}
                bodyStyle={{ textAlign: "center" }}
                extra={
                  <Space>
                    <RangePicker
                      onChange={(e) => {
                        setTanggalawal(e[0].format("YYYY-MM-DD"));
                        setTanggalakhir(e[1].format("YYYY-MM-DD"));
                      }}
                    />
                    <Button
                      onClick={() => ratingDokterPure(isidr)}
                      icon={<SearchOutlined />}
                    />
                    <Button
                      onClick={() =>
                        ratingDokterPure({
                          kode_dokter: pegawai,
                          start_date: "",
                          end_date: "",
                        })
                      }
                    >
                      Semua
                    </Button>
                  </Space>
                }
              >
                Rating Review {nama} <br />
                <span style={{ fontSize: 25 }}>{ratingpure}</span> :{" "}
                <Rate
                  disabled
                  allowHalf
                  value={parseFloat(ratingpure)}
                  style={{ fontSize: 25 }}
                />
                <br />
                <Button
                  type="primary"
                  size="small"
                  onClick={() => {
                    ratingDokter(isirating);
                    setModalRating(true);
                  }}
                >
                  Lihat Komentar
                </Button>
              </Card>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
        </Col>
      </Row>

      {/* <FingerPrint /> */}

      {/* <Button onClick={() => setModal(true)}>buka</Button> */}
      <Modal
        open={modal}
        onClose={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={null}
      >
        <FaceTracking />
      </Modal>
      <Modal
        title="Komentar Pasien"
        width="1000px"
        style={{ width: 750, top: 10 }}
        open={modalRating}
        onOk={() => setModalRating(false)}
        onCancel={() => setModalRating(false)}
        footer={null}
      >
        Bintang :{" "}
        <Select style={{ width: 100 }} onChange={(e) => setRatingpilih(e)}>
          <Option key="5">5</Option>
          <Option key="4">4</Option>
          <Option key="3">3</Option>
          <Option key="2">2</Option>
          <Option key="1">1</Option>
        </Select>
        <Button
          onClick={() => ratingDokter(isirating)}
          icon={<SearchOutlined />}
        />
        <Table
          loading={loadingrating}
          dataSource={komentar}
          columns={columns}
        />
      </Modal>

      <Modal
        open={modalKomputer}
        // onCancel={() => setModalKomputer(false)}
        footer={null}
        centered
      >
        ℹ️ IP PC Anda belum terdaftar, Silahkan daftarkan terlebih dahulu, mohon
        isi data berikut dengan benar untuk mendaftarkan PC Anda pada system.
        Entry cukup dilakukan satu kali.
        <br />
        <Form {...formItemLayout}>
          <Form.Item label="IP" labelAlign="left" style={{ marginBottom: 0 }}>
            <Input value={ipPC} />
          </Form.Item>
          <Form.Item
            label="Ruang"
            labelAlign="left"
            style={{ marginBottom: 0 }}
          >
            <Select
              showSearch
              onFocus={() => getRuangan("%20")}
              placeholder="Pilih Ruangan"
              optionFilterProp="label"
              onSelect={(e) => setRuangan(e)}
              options={listRuangan.map((item) => ({
                value: item.RuangId,
                label: item.RuangDesk,
              }))}
            />
          </Form.Item>
          <Form.Item
            label="Nama PC"
            labelAlign="left"
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder="Keterangan Komputer. Contoh : 'PC Poli Bedah Dokter' "
              onChange={(e) => setKeterangan(e.target.value)}
            />
          </Form.Item>
        </Form>
        <Button
          type="primary"
          onClick={() => {
            axios
              .post(
                `${apiku}/SisJwt/PostIpComputer`,
                {
                  ipComputer: ipPC,
                  ruangId: ruangan,
                  keterangan: keterangan,
                },
                options
              )
              .then((res) => {
                if (res.data.statusCode === 200) {
                  message.success("Terima kasih!");
                  setModalKomputer(false);
                } else {
                  message.warning("Gagal Menambahkan!");
                  console.log(res.data);
                }
              })
              .catch((err) => {
                message.error("Gagal Koneksi Data!");
                console.log(err);
              })
              .finally(() =>
                console.log({
                  ipComputer: ipPC,
                  ruangId: ruangan,
                  keterangan: keterangan,
                })
              );
          }}
        >
          DAFTAR
        </Button>
      </Modal>
    </div>
  );
};

export default Home;
