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
  Tag,
  Switch,
} from "antd";
import Iframe from "react-iframe";
import Column from "antd/lib/table/Column";
import dayjs from "dayjs";
import { LogBookAskepContext } from "../master/context/masteraskep/LogBookAskepContext";
import { LoginContext } from "../rawatjalan/context";
const { Option } = Select;
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const FormPenilaianKasie = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser } = useContext(LoginContext);
  const [bulan, setbulan] = useState("");
  const [modallogbok, setmodallogbok] = useState(false);
  const [viewlodbok, setviewlodbok] = useState(false);

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
    namaPerawat,
    setnamaPerawat,
    namaKaru,
    setnamaKaru,
  } = useContext(LogBookAskepContext);

  const dataPenilaian = {
    penilaianId: penilaianId,
    bulanPenilaian:
      disableform === true
        ? bulanPenilaian
        : dayjs(bulanPenilaian).format("MM-YYYY"),
    perawat: perawat,
    tglValidKaru: tglValidKaru,
    nilaiKaru: nilaiKaru,
    catatanKaru: catatanKaru,
    karu: karu,
    tglValidKasie: dayjs().format("YYYY-MM-DDTHH:mm"),
    nilaiKasie: nilaiKasie,
    catatanKasie: catatanKasie,
    kasie: namauser,
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
      render: (listPenilaianPerawat) => (
        <span>
          {listPenilaianPerawat.NamaPerawat}
          <br></br>({listPenilaianPerawat.NIPPerawat})
        </span>
      ),
    },
    {
      title: "Validasi Karu",
      width: "10%",
      render: (listPenilaianPerawat) => (
        <span>
          Tanggal:{" "}
          {dayjs(listPenilaianPerawat.TglValidKaru).format("DD-MM-YYYY")}
          <br></br>
          Oleh: {listPenilaianPerawat.Karu}
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
          Oleh: {listPenilaianPerawat.Kasie}
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
              setmodallogbok(true);
            }}
          >
            Detail
          </Button>
          {/* {record.NilaiKasie === null || record.TglValidKasie === null ? (
            <Button
              onClick={() => {
                setPenilaianId(record.PenilaianId);
                setBulanPenilaian(record.BulanPenilaian);
                setNilaiKaru(record.NilaiKaru);
                setCatatanKaru(record.CatatanKaru);
                setTglValidKaru(record.TglValidKaru);
                setPerawat(record.Perawat);
                setKaru(record.Karu);
                setNilaiKasie(record.NilaiKasie);
                setCatatanKasie(record.CatatanKasie);
                setnamaPerawat(record.NamaPerawat);
                setnamaKaru(record.NamaKaru);
                setdisableform(true);
                setmodalPenilaian(true);
              }}
              style={{ color: "white", backgroundColor: "green" }}
            >
              Validasi{" "}
            </Button>
          ) : (
            <></>
          )} */}
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Card size="small" title="Form Validasi Kepala Bidang Perawatan">
        <Row gutter={[5, 5]}>
          <Col span={10}>
            {/* <Select
              value={nilaiKaru}
              onChange={(e) => {
                setNilaiKaru(e);
              }}
              placeholder="Pilih Ruang"
              style={{ width: "95%" }}
            >
              <Option key="Sangat Baik">Sangat Baik - 150%</Option>
            </Select> */}
          </Col>
          <Col span={14}>
            <DatePicker
              style={{ width: "70%" }}
              placeholder="Pilih Bulan"
              value={bulan}
              picker="month"
              onChange={(e) => {
                getPenilaianPerawat("%20", dayjs(e).format("MM-YYYY"));
                setbulan(e);
              }}
              format="MM-YYYY"
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

      {/* Validasi Penialaian Kasie */}
      <Modal
        title="Penilaian Kasie"
        style={{ marginTop: "5px" }}
        width="70%"
        open={modalPenilaian}
        footer={false}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              label="Nama Perawat"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              <Input
                readOnly
                value={namaPerawat}
                // onChange={(e) => setBulanPenilaian(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Bulan Penilaian"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              <Input
                readOnly
                value={bulanPenilaian}
                // onChange={(e) => setBulanPenilaian(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Nilai Karu"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              <Input
                readOnly
                value={nilaiKaru}
                // onChange={(e) => setNilaiKaru(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Catatan Karu"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              <TextArea
                rows={2}
                readOnly
                value={catatanKaru}
                // onChange={(e) => setCatatanKaru(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Kepala Ruang"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
            >
              <Input
                readOnly
                value={namaKaru}
                // onChange={(e) => setKaru(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Nilai Kasie"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
              rules={[{ required: true }]}
            >
              <Select
                value={nilaiKasie}
                style={{ width: "100%", maxWidth: "78vw" }}
                onChange={(e) => {
                  setNilaiKasie(e);
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
              label="Catatan Kasie"
              {...formItemLayout}
              style={{ marginBottom: 2 }}
              rules={[{ required: true }]}
            >
              <TextArea
                rows={2}
                value={catatanKasie}
                onChange={(e) => setCatatanKasie(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Kasie" {...formItemLayout}>
              <Input
                readOnly
                value={namauser}
                // onChange={(e) => setKasie(e.target.value)}
              />
            </Form.Item>
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
                    getprintViewLogbook(
                      perawat,
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
                }}
              >
                Batal
              </Button>

              <Button
                key="simpan"
                type="primary"
                onClick={() => {
                  console.log(dataPenilaian);
                  insertPenilaianPerawat(dataPenilaian, "%20");
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
              <Iframe
                loading={loading}
                onLoad={() => {
                  setloading(false);
                }}
                url={printVeiwLog}
                height="650px"
                width="100%"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
              />
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
        open={modallogbok}
        footer={false}
        onCancel={() => {
          setmodallogbok(false);
        }}
      >
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
      </Modal>
    </div>
  );
};

export default FormPenilaianKasie;
