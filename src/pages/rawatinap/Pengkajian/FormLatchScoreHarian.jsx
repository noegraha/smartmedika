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
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import { AssesmentRIContext } from "../context/AssesmentRIContext";
import { PengkajianContext } from "../context/PengkajianContext";

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
const FormLatchScoreHarian = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const { tglTTV } = useContext(AssesmentRIContext);
  const [openmodal, setopenmodal] = useState(false);
  const {
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
    latchTotal,
    ketLatchScore,
    stylekuLatchScore,
    tgllatchSkor,
    settgllatchSkor,
    getAssLatchSkoreHarian,
    delLatscore,
    listlatchSkor,
    setlistlatchSkor,
  } = useContext(PengkajianContext);

  const dataLatchScore = {
    id: 0,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tgllatchSkor).format("YYYY-MM-DDTHH:mm"),
    pasienId: curpasRI.pasienId,
    latch: latchscoreL,
    audibleSwalling: latchscoreA,
    tipePuting: latchscoreT,
    comfort: latchscoreC,
    help: latchscoreH,
    totalScore: latchTotal,
    kesimpulan: ketLatchScore,
    verifikasi: true,
    userId: namauser,
  };

  const columns = [
    {
      title: "Tanggal",
      dataIndex: "Tanggal",
      key: "tanggal",
      render: (text) => dayjs(text).format("DD-MM-YYYY HH:mm"), // Memformat tanggal
    },
    {
      title: "Kesimpulan",
      dataIndex: "Kesimpulan",
      key: "Kesimpulan",
    },
    {
      title: "User ID",
      dataIndex: "UserId",
      key: "UserId",
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Anda Yakin Dihapus ?"
            onConfirm={(e) => {
              delLatscore(record.Id, record.RegistrasiId);
            }}
            onCancel={(e) => {}}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button size="small" type="primary" danger>
              Hapus
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Row gutter={[5, 5]}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull}
                label="Tanggal"
                style={{ marginBottom: 5 }}
              >
                <DatePicker
                  value={tgllatchSkor}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                  onChange={(date) => {
                    settgllatchSkor(date);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Latch"
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={latchscoreL}
                  onChange={(e) => setlatchscoreL(e)}
                >
                  <Option value={0}>
                    Terlalu mengantuk atau menolak menyusu, bayi tidak dapat
                    melekat
                  </Option>
                  <Option value={1}>
                    Beberapa kali mencoba / harus memegang payudara untuk
                    memasukkan ke dalam mulut bayi / harus melakukan stimulasi
                    agar bayi menghisap
                  </Option>
                  <Option value={2}>
                    Bayi meraih payudara, lidah terlihat bergerak ke bawah dan
                    ke depan, bibir terlipat keluar, bayi menghisap secara
                    ritmis
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Audible"
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={latchscoreA}
                  onChange={(e) => setlatchscoreA(e)}
                >
                  <Option value={0}>Tidak ada</Option>
                  <Option value={1}>
                    Ada beberapa kali suara menelan, jika bayi distimulasi. Bayi
                    &lt; 24 jam intermitten
                  </Option>
                  <Option value={2}>
                    Spontan, intermiten (usia bayi &gt; 24 jam) Spontan, sering
                    (usia bayi &lt; 24 jam)
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Type"
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={latchscoreT}
                  onChange={(e) => setlatchscoreT(e)}
                >
                  <Option value={0}>Inverted / tenggelam</Option>
                  <Option value={1}>Datar</Option>
                  <Option value={2}>
                    Menonjol tanpa maupun setelah stimulasi
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Comfort"
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={latchscoreC}
                  onChange={(e) => setlatchscoreC(e)}
                >
                  <Option value={0}>
                    Payudara bengkak, putting retak/berdarah/luka; menyusui
                    sangat tidak nyaman
                  </Option>
                  <Option value={1}>
                    Luka kecil pada puting ibu mengeluh nyeri ringan/sedang.
                    Menyusui sedikit tidak nyaman
                  </Option>
                  <Option value={2}>
                    Payudara lunak, bayi melekat dengan lembut, puting tidak ada
                    luka
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Help"
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={latchscoreH}
                  onChange={(e) => setlatchscoreH(e)}
                >
                  <Option value={0}>
                    Bayi perlu dibantu sepenuhnya untuk menyusu
                  </Option>
                  <Option value={1}>
                    Bantuan minimal, setelah dibantu staf RS ibu dapat
                    memposisikan bayi dengan baik
                  </Option>
                  <Option value={2}>
                    Tidak perlu bantuan dari staf RS ibu dapat memposisikan bayi
                    dengan baik
                  </Option>
                </Select>
              </Form.Item>
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
                    style={{ width: "20%" }}
                  />
                  <Input
                    type="text"
                    placeholder="..."
                    // disabled
                    value={ketLatchScore}
                    style={stylekuLatchScore}
                    readOnly
                  />{" "}
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              {" "}
              <Space>
                <Button
                  onClick={() => {
                    setlatchscoreL("");
                    setlatchscoreA("");
                    setlatchscoreT("");
                    setlatchscoreC("");
                    setlatchscoreH("");
                    settgllatchSkor(dayjs());
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    insertLatchScore(dataLatchScore);
                  }}
                >
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Table columns={columns} dataSource={listlatchSkor} rowKey="id" />
        </Col>
      </Row>
    </div>
  );
};

export default FormLatchScoreHarian;
