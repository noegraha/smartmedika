import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Row,
  Space,
  Table,
  Select,
  Collapse,
  Switch,
  Tag,
  Spin,
} from "antd";
import Iframe from "react-iframe";
import Column from "antd/lib/table/Column";
import dayjs from "dayjs";
import { LogBookAskepContext } from "../master/context/masteraskep/LogBookAskepContext";
import { LoginContext } from "../rawatjalan/context";
const { Option } = Select;
const { Panel } = Collapse;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const FormPenilaianKaru = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser } = useContext(LoginContext);
  const [viewlodbok, setviewlodbok] = useState(false);
  const [viewlodboktombl, setviewlodboktombl] = useState(false);

  const {
    penilaianId,
    setPenilaianId,
    bulanPenilaian,
    setBulanPenilaian,
    perawat,
    setPerawat,
    tglValidKaru,
    setTglValidKaru,
    nilaiKaru,
    setNilaiKaru,
    catatanKaru,
    setCatatanKaru,
    karu,
    setKaru,
    tglValidKasie,
    setTglValidKasie,
    nilaiKasie,
    setNilaiKasie,
    catatanKasie,
    setCatatanKasie,
    kasie,
    setKasie,
    modalPenilaian,
    setmodalPenilaian,
    modalPenilaianCetak,
    setmodalPenilaianCetak,
    modalPenilaianKasie,
    setmodalPenilaianKasie,
    insertPenilaianPerawat,
    getPenilaianPerawat,
    listPenilaianPerawat,
    setlistPenilaianPerawat,
    thnPenilaian,
    setthnpenilaian,
    disableform,
    setdisableform,
    getprintViewLogbook,
    printVeiwLog,
    setprintVeiwLog,
    getprintPenilaian,
    printPenilaian,
    setprintPenilaian,
    loading,
    setloading,
    infoBawahan,
  } = useContext(LogBookAskepContext);

  const dataPenilaian = {
    penilaianId: penilaianId,
    bulanPenilaian:
      disableform === true
        ? bulanPenilaian
        : dayjs(bulanPenilaian).format("MM-YYYY"),
    perawat: infoBawahan.id_user,
    tglValidKaru: dayjs().format("YYYY-MM-DDTHH:mm"),
    nilaiKaru: nilaiKaru,
    catatanKaru: catatanKaru,
    karu: namauser,
    tglValidKasie: null,
    nilaiKasie: null,
    catatanKasie: null,
    kasie: null,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    clientIP: ip,
  };

  const columns = [
    {
      title: "No",
      key: "reg",
      className: "tabeltabel2",
      width: "5%",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      width: "10%",
      title: "Periode",
      dataIndex: "BulanPenilaian",
    },
    {
      title: "Validasi Karu",
      width: "10%",
      render: (listPenilaianPerawat) => (
        <span>
          Tanggal:{" "}
          {dayjs(listPenilaianPerawat.TglValidKaru).format("DD-MM-YYYY")}
          <br></br>
          Oleh: {listPenilaianPerawat.NamaKaru}
        </span>
      ),
    },
    {
      title: "Nilai Karu",
      width: "10%",
      render: (listPenilaianPerawat) => (
        <div>
          {listPenilaianPerawat.NilaiKaru === "Sangat Kurang" ? (
            <Tag color="magenta"> Nilai: {listPenilaianPerawat.NilaiKaru}</Tag>
          ) : listPenilaianPerawat.NilaiKaru === "Kurang" ? (
            <Tag color="orange"> Nilai: {listPenilaianPerawat.NilaiKaru}</Tag>
          ) : listPenilaianPerawat.NilaiKaru === "Butuh Perbaikan" ? (
            <Tag color="purple"> Nilai: {listPenilaianPerawat.NilaiKaru}</Tag>
          ) : listPenilaianPerawat.NilaiKaru === "Baik" ? (
            <Tag color="cyan"> Nilai: {listPenilaianPerawat.NilaiKaru}</Tag>
          ) : listPenilaianPerawat.NilaiKaru === "Sangat Baik" ? (
            <Tag color="blue"> Nilai: {listPenilaianPerawat.NilaiKaru}</Tag>
          ) : (
            listPenilaianPerawat.NilaiKaru
          )}
          <br></br>
          Catatan: {listPenilaianPerawat.CatatanKaru}
        </div>
      ),
    },
    {
      width: "20%",
      title: "Validasi Kasie",
      render: (listPenilaianPerawat) => (
        <span>
          Tanggal:{" "}
          {dayjs(listPenilaianPerawat.TglValidKasie).format("DD-MM-YYYY")}
          <br></br>
          Oleh: {listPenilaianPerawat.NilaiKasie}
        </span>
      ),
    },
    {
      title: "Nilai Kasie",
      width: "10%",
      render: (listPenilaianPerawat) => (
        <div>
          {listPenilaianPerawat.NilaiKasie === "Sangat Kurang" ? (
            <Tag color="magenta"> Nilai: {listPenilaianPerawat.NilaiKasie}</Tag>
          ) : listPenilaianPerawat.NilaiKasie === "Kurang" ? (
            <Tag color="orange"> Nilai: {listPenilaianPerawat.NilaiKasie}</Tag>
          ) : listPenilaianPerawat.NilaiKasie === "Butuh Perbaikan" ? (
            <Tag color="purple"> Nilai: {listPenilaianPerawat.NilaiKasie}</Tag>
          ) : listPenilaianPerawat.NilaiKasie === "Baik" ? (
            <Tag color="cyan"> Nilai: {listPenilaianPerawat.NilaiKasie}</Tag>
          ) : listPenilaianPerawat.NilaiKasie === "Sangat Baik" ? (
            <Tag color="blue"> Nilai: {listPenilaianPerawat.NilaiKasie}</Tag>
          ) : (
            listPenilaianPerawat.NilaiKasie
          )}
          <br></br>
          Catatan: {listPenilaianPerawat.CatatanKasie}
        </div>
      ),
    },
    {
      width: "5%",
      title: "Aksi",
      render: (text, record) => (
        <Space>
          <Button
            type="primary"
            onClick={() => {
              getprintPenilaian(record.Perawat, record.BulanPenilaian);
              setviewlodboktombl(true);
            }}
          >
            Detail
          </Button>
          {record.NilaiKasie === null || record.TglValidKasie === null ? (
            <Button
              onClick={() => {
                setPenilaianId(record.PenilaianId);
                setBulanPenilaian(record.BulanPenilaian);
                setNilaiKaru(record.NilaiKaru);
                setCatatanKaru(record.CatatanKaru);
                setdisableform(true);
                setmodalPenilaian(true);
              }}
              style={{ color: "white", backgroundColor: "green" }}
            >
              Ubah
            </Button>
          ) : (
            <></>
          )}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card size="small" title="Form Validasi Kepala Ruang">
        <Row>
          <Col span={12}>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  setmodalPenilaian(true);
                }}
              >
                Tambah
              </Button>
            </Space>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <DatePicker
              value={thnPenilaian}
              picker="year"
              onChange={(e) => {
                setthnpenilaian(e);
                getPenilaianPerawat(
                  infoBawahan.id_user,
                  dayjs().format("MM-YYYY")
                );
              }}
              style={{ width: "100%" }}
              format="YYYY"
            />
          </Col>

          <Col span={24}>
            <Table
              bordered
              locale={{ emptyText: <Empty description="Data Asuhan Kosong" /> }}
              pagination={{ pageSize: 20 }}
              dataSource={listPenilaianPerawat}
              size="small"
              columns={columns}
            />
          </Col>
        </Row>
      </Card>

      {/* Tambah Penialaian Karu */}
      <Modal
        title="Tambah Penilaian Karu"
        style={{ marginTop: "3px" }}
        width="70%"
        open={modalPenilaian}
        footer={false}
      >
        <Row gutter={[5, 5]}>
          <Col span={24}>
            <Form.Item
              label="Nama Perawat"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              <Input
                value={infoBawahan.namapegawai}
                // onChange={(e) => setKaru(e.target.value)}
                readOnly
              />
            </Form.Item>
            <Form.Item
              label="Bulan Penilaian"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              {disableform === true ? (
                <Input
                  value={bulanPenilaian}
                  // onChange={(e) => setKaru(e.target.value)}
                  readOnly
                />
              ) : (
                <DatePicker
                  value={bulanPenilaian}
                  picker="month"
                  onChange={(e) => {
                    setBulanPenilaian(e);
                  }}
                  style={{ width: "100%" }}
                  format="MM-YYYY"
                />
              )}
            </Form.Item>
            <Form.Item
              label="Nilai Karu"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              <Select
                value={nilaiKaru}
                style={{ width: "100%", maxWidth: "78vw" }}
                onChange={(e) => {
                  setNilaiKaru(e);
                }}
              >
                <Option key="Sangat Baik">Sangat Baik - 150%</Option>
                <Option key="Baik">Baik - 100%</Option>
                <Option key="Butuh Perbaikan">Butuh Perbaikan - 75%</Option>
                <Option key="Kurang">Kurang - 50%</Option>
                <Option key="Sangat Kurang">Sangat Kurang - 25%</Option>
              </Select>
            </Form.Item>
            <Form.Item
              label="Catatan Karu"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              <TextArea
                rows={2}
                value={catatanKaru}
                onChange={(e) => setCatatanKaru(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Karu"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              <Input
                value={namauser}
                // onChange={(e) => setKaru(e.target.value)}
                readOnly
              />
            </Form.Item>{" "}
          </Col>
        </Row>
        <Row gutter={[5, 5]}>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Switch
                checkedChildren="Tutup"
                unCheckedChildren="LogBook"
                onChange={(e) => {
                  if (e === true) {
                    getPenilaianPerawat(
                      infoBawahan.id_user,
                      disableform === true
                        ? bulanPenilaian
                        : dayjs(bulanPenilaian).format("MM-YYYY")
                    );

                    setviewlodbok(true);
                  } else {
                    setviewlodbok(false);
                  }
                }}
              />
              <Button
                key="batal"
                onClick={() => {
                  setmodalPenilaian(false);
                  setPenilaianId(0);
                  setBulanPenilaian("");
                  setNilaiKaru("");
                  setCatatanKaru("");
                  setdisableform(false);
                }}
              >
                Batal
              </Button>

              <Button
                key="simpan"
                type="primary"
                onClick={() => {
                  console.log(dataPenilaian);
                  insertPenilaianPerawat(dataPenilaian);
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
        {viewlodbok === true ? (
          <Row gutter={[5, 5]}>
            <Col span={24} style={{ textAlign: "right" }}>
              <Card size="small" loading={loading}>
                <Iframe
                  loading={loading}
                  onLoad={() => {
                    setloading(false);
                  }}
                  url={printPenilaian}
                  height="650px"
                  width="100%"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"
                />
              </Card>
            </Col>
          </Row>
        ) : (
          <></>
        )}
      </Modal>

      <Modal
        title="Log Book Kegiatan Perawat"
        style={{ marginTop: "3px" }}
        width="70%"
        open={viewlodboktombl}
        footer={false}
        onCancel={() => {
          setviewlodboktombl(false);
        }}
      >
        <Card size="small" loading={loading}>
          <Iframe
            loading={loading}
            onLoad={() => {
              setloading(false);
            }}
            url={printPenilaian}
            height="650px"
            width="100%"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Card>
      </Modal>
    </div>
  );
};

export default FormPenilaianKaru;
