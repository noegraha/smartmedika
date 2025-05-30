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
  Rate,
  Slider,
  Radio,
  Tooltip,
  Typography,
  Collapse,
} from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import FormEwsGrafik from "./FormGrafikEws";
import { AskepContext } from "../../../../../rawatinap/context/AskepContext";
import { EwsRIContext } from "../../../../../rawatinap/context/EwsContext";
import { PasienRIContext } from "../../../../../rawatinap/context/PasienRIContext";
import { LoginContext } from "../../../../../rawatjalan/context";
import HdContext from "../../../HdContext";

const { PasiensContext } = HdContext;

const { Panel } = Collapse;
const { TextArea } = Input;
const { Option } = Select;
const { Text } = Typography;
const { TabPane } = Tabs;
const formItemLayoutFull = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormEWS = () => {
  const props = useContext(PasiensContext);

  const [form] = Form.useForm();
  const [visibleModal, setvisibleModal] = useState(false);
  const { ipPc, setIpPC, valuecekAssesment } = useContext(AskepContext);
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    visibleEWSBerkala,
    setvisibleEWSBerkala,
    tglews,
    setTglews,
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
    ewsByredAll,
    setEWSByRegAll,
    insertEWS,
    getEwsAll,
    getEwsByRegDate,
    deleteEwsbydate,
    userEWS,
    setuserEWS,
    visibleEWSBerkalaEdit,
    setvisibleEWSBerkalaEdit,
  } = useContext(EwsRIContext);
  const onAmbilCatatanById = (reg, date) => {
    getEwsByRegDate(reg, dayjs(date).format("YYYY-MM-DD HH:mm"));
    console.log(reg, dayjs(date).format("YYYY-MM-DD HH:mm"));
  };
  const dateFormat = "DD-MM-YYYY HH:mm";
  const [warnaRow, setWarnaRow] = useState([]);
  const ewsTotal =
    parseInt(ewsRespirasi.split("-").pop()) +
    parseInt(ewsSatursiOksigen.split("-").pop()) +
    parseInt(ewsSuplemenOksigen.split("-").pop()) +
    parseInt(ewsSuhu.split("-").pop()) +
    parseInt(ewsSistolik.split("-").pop()) +
    parseInt(ewsJantung.split("-").pop()) +
    parseInt(ewsKesadaran.split("-").pop());

  const ketEws =
    ewsTotal === ""
      ? ""
      : ewsTotal >= 0 && ewsTotal < 5
      ? "Pengkajian ulang setiap 8 jam. Pasien di rawat di ruang rawat biasa"
      : ewsTotal > 4 && ewsTotal < 7
      ? "Kondisi pasien dilaporkan kepada DPJP, pasien di pindah ke ruang internsif/ruang pengawasan. Pengkajian ulang dilakukan setiap 3 jam"
      : ewsTotal > 6
      ? "Kondisi pasien dilaporkan kepada DPJP, pasien di pindah ke ruang intensif/ruang pengawasan . Pengkajian ulang dilakukan setiap 2 jam."
      : "...";
  const stylekuEws =
    ewsTotal === ""
      ? { width: "100%" }
      : ewsTotal >= 0 && ewsTotal < 5
      ? { backgroundColor: "lightgreen", width: "100%" }
      : ewsTotal > 4 && ewsTotal < 7
      ? { backgroundColor: "darkorange", width: "100%" }
      : ewsTotal > 6
      ? { backgroundColor: "lightcoral", width: "100%" }
      : { width: "100%" };
  const dataEWS = {
    registrasiId: props.pasien.result.registrasiId,
    ruangId: props.pasien.result.ruangId,
    tanggal: dayjs(tglews).format("YYYY-MM-DD HH:mm").toString(),
    ewsScore: ewsTotal,
    ewsKategori:
      ewsTotal === ""
        ? ""
        : ewsTotal >= 0 && ewsTotal < 5
        ? "Hijau"
        : ewsTotal > 4 && ewsTotal < 7
        ? "Orange"
        : ewsTotal > 7
        ? "Merah"
        : "...",
    userId: userEWS === "" || null ? namauser : userEWS,
    detail: [
      {
        parameter: "ewsRespirasi",
        hasil: parseInt(ewsRespirasi.split("-").shift()),
        value: parseInt(ewsRespirasi.split("-").pop()),
      },
      {
        parameter: "ewsSatursiOksigen",
        hasil: parseInt(ewsSatursiOksigen.split("-").shift()),
        value: parseInt(ewsSatursiOksigen.split("-").pop()),
      },
      {
        parameter: "ewsSuplemenOksigen",
        hasil: parseInt(ewsSuplemenOksigen.split("-").shift()),
        value: parseInt(ewsSuplemenOksigen.split("-").pop()),
      },
      {
        parameter: "ewsSuhu",
        hasil: parseInt(ewsSuhu.split("-").shift()),
        value: parseInt(ewsSuhu.split("-").pop()),
      },
      {
        parameter: "ewsSistolik",
        hasil: parseInt(ewsSistolik.split("-").shift()),
        value: parseInt(ewsSistolik.split("-").pop()),
      },
      {
        parameter: "ewsJantung",
        hasil: parseInt(ewsJantung.split("-").shift()),
        value: parseInt(ewsJantung.split("-").pop()),
      },
      {
        parameter: "ewsKesadaran",
        hasil: parseInt(ewsKesadaran.split("-").shift()),
        value: parseInt(ewsKesadaran.split("-").pop()),
      },
    ],
  };
  const jammasukri = dayjs(curpasRI.jamMasuk).add(24, "hours");
  const jamsekarang = dayjs();
  return (
    <div>
      <Row>
        <Col span={24}>
          <Button
            type="primary"
            onClick={() => {
              setvisibleEWSBerkala(true);
            }}
            style={{ backgroundColor: "green" }}
          >
            Tambah EWS
          </Button>
        </Col>
        <Col span={24}>
          <Card size="small">
            <Tabs defaultActiveKey="1">
              <TabPane tab="Grafik EWS" key="1">
                <FormEwsGrafik />
              </TabPane>
              <TabPane tab="Table EWS" key="2">
                <Table
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: (e) => {
                        onAmbilCatatanById(curpasRI.noreg, record.tanggal);
                        setWarnaRow(rowIndex);
                      },
                    };
                  }}
                  bordered
                  locale={{
                    emptyText: <Empty description="Data Catatan Kosong" />,
                  }}
                  pagination={{ pageSize: 5 }}
                  dataSource={ewsByredAll}
                  size="small"
                  rowKey="reg"
                  rowClassName={(record, rowIndex) =>
                    rowIndex === warnaRow ? "warnacolompilih" : null
                  }
                >
                  <Column
                    title="Tanggal"
                    width="20%"
                    render={(ewsByredAll) =>
                      dayjs(ewsByredAll.tanggal).format("DD-MM-YYYY HH:mm")
                    }
                  />
                  <Column
                    title="Total EWS"
                    key="reg"
                    width="10%"
                    render={(ewsByredAll) => ewsByredAll.ewsScore}
                  />
                  <Column
                    title="Keteranagn"
                    key="reg"
                    width="10%"
                    render={(ewsByredAll) => ewsByredAll.ewsKategori}
                  />
                </Table>
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      <Modal
        closable={false}
        footer={null}
        visible={visibleEWSBerkala}
        // onCancel={() => {
        //     setvisibleEWSBerkala(false)
        // }}
        width="835px"
        centered={true}
      >
        <Form form={form}>
          <Row gutter={[6, 6]}>
            {/* <Divider orientation="left">EWS</Divider> */}
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull}
                label={<div style={{ fontWeight: "bolder" }}>Tanggal</div>}
                style={{ marginBottom: 5 }}
              >
                <DatePicker
                  value={tglews}
                  onChange={(date) => setTglews(date)}
                  style={{ width: "100%" }}
                  format={dateFormat}
                  showTime
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label={<div style={{ fontWeight: "bolder" }}>Respirasi</div>}
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={ewsRespirasi}
                  onChange={(e) => {
                    setewsRespirasi(e);
                    console.log(e);
                  }}
                >
                  <Option value="1-3">&le;8</Option>
                  <Option value="2-1">9 - 11</Option>
                  <Option value="3-0">12 - 20</Option>
                  <Option value="4-2">21 - 24</Option>
                  <Option value="5-3">&ge;25</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label={
                  <div style={{ fontWeight: "bolder" }}>Satursi Oksigen</div>
                }
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={ewsSatursiOksigen}
                  onChange={(e) => setewsSatursiOksigen(e)}
                >
                  <Option value="1-3">&le;91</Option>
                  <Option value="2-2">92 - 93</Option>
                  <Option value="3-1">94 - 95</Option>
                  <Option value="4-0">&ge; 96</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label={
                  <div style={{ fontWeight: "bolder" }}>Suplement Oksigen</div>
                }
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={ewsSuplemenOksigen}
                  onChange={(e) => setewsSuplemenOksigen(e)}
                >
                  <Option value="1-2">Ya</Option>
                  <Option value="2-0">Tidak</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label={<div style={{ fontWeight: "bolder" }}>Suhu</div>}
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={ewsSuhu}
                  onChange={(e) => setewsSuhu(e)}
                >
                  <Option value="1-3">&le; 35.0 </Option>
                  <Option value="2-1">35.1 - 36.0</Option>
                  <Option value="3-0">36.1 - 38.0</Option>
                  <Option value="4-1">38.1 - 39 </Option>
                  <Option value="5-2">&ge; 39 </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label={<div style={{ fontWeight: "bolder" }}>TD Sistolik</div>}
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={ewsSistolik}
                  onChange={(e) => setewsSistolik(e)}
                >
                  <Option value="1-3">&le; 90 </Option>
                  <Option value="2-2">91 - 100 </Option>
                  <Option value="3-1">101 - 110 </Option>
                  <Option value="4-0">111 - 219 </Option>
                  <Option value="5-3">&ge;220 </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label={
                  <div style={{ fontWeight: "bolder" }}>Denyut Jantung</div>
                }
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={ewsJantung}
                  onChange={(e) => setewsJantung(e)}
                >
                  <Option value="1-3">&le; 40</Option>
                  <Option value="2-1">41 - 50</Option>
                  <Option value="3-0">51 - 90</Option>
                  <Option value="4-1">91 - 110</Option>
                  <Option value="5-2">111 - 130</Option>
                  <Option value="6-3">&ge;131</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label={
                  <div style={{ fontWeight: "bolder" }}>Tingkat Kesadaran</div>
                }
                style={{ marginBottom: 5 }}
              >
                <Select
                  placeholder="..."
                  style={{ width: "100%" }}
                  value={ewsKesadaran}
                  onChange={(e) => setewsKesadaran(e)}
                >
                  <Option value="1-0">Alert</Option>
                  <Option value="2-3">Verbal,Pain atau Unrespon</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull}
                label={<div style={{ fontWeight: "bolder" }}>EWS Total</div>}
                style={{ marginBottom: 5 }}
              >
                <Row gutter={[5, 5]}>
                  <Col span={4}>
                    <Input
                      style={{ width: "100%" }}
                      type="text"
                      placeholder="..."
                      disabled
                      value={ewsTotal}
                      // onChange={(e) => onFrekuensiNafas(e)}
                    />
                  </Col>
                  <Col span={20}>
                    <Input
                      style={stylekuEws}
                      type="text"
                      placeholder="..."
                      disabled
                      value={ketEws}
                    />
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull}
                label={<div style={{ fontWeight: "bolder" }}>User</div>}
                style={{ marginBottom: 5 }}
              >
                <Input
                  style={{ width: "100%" }}
                  type="text"
                  placeholder="..."
                  disabled
                  value={userEWS === "" || null ? namauser : userEWS}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  disabled={
                    userEWS === "" || userEWS === null || userEWS === []
                      ? false
                      : userEWS.toUpperCase() === namauser.toUpperCase()
                      ? false
                      : true
                  }
                  type="primary"
                  onClick={() => {
                    console.log("data ews", dataEWS);
                    insertEWS(dataEWS);
                  }}
                >
                  Simpan EWS
                </Button>

                <Button
                  danger
                  disabled={
                    userEWS.toUpperCase() === namauser.toUpperCase()
                      ? false
                      : true
                  }
                  onClick={() => {
                    deleteEwsbydate(
                      props.pasien.result.registrasiId,
                      dayjs(tglews).format("YYYY-MM-DD HH:mm")
                    );
                  }}
                >
                  Hapus
                </Button>
                <Button
                  onClick={() => {
                    setTglews(dayjs());
                    setewsRespirasi("");
                    setewsSatursiOksigen("");
                    setewsSuplemenOksigen("");
                    setewsSuhu("");
                    setewsSistolik("");
                    setewsJantung("");
                    setewsKesadaran("");
                    setvisibleEWSBerkala(false);
                  }}
                >
                  Batal
                </Button>
                <Button
                  onClick={() => {
                    setvisibleEWSBerkala(false);
                  }}
                >
                  Kembali
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default FormEWS;
