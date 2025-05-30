import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Radio,
  Tabs,
  Card,
  Popconfirm,
  Button,
  message,
  Space,
  TimePicker,
  Alert,
  Modal,
  Switch,
  Tooltip,
  Tag,
  Typography,
} from "antd";
import dayjs from "dayjs";
import Icon from "@ant-design/icons";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { RM13RIContext } from "../context/RM13Context";
import { AnamnesaRIContext } from "../context/AnamnesaRIContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { DiagnosaRIContext } from "../context/DiagnosaRIContext";
import { DiagnosaContext } from "../../rawatjalan/context/Diagnosacontext";
import { VClaimContext } from "../../rawatjalan/context/VClaimContext";
import { LoginContext } from "../../rawatjalan/context";
import BPJSICO from "../../rawatjalan/komponen/BPJSICO";
const { TabPane } = Tabs;
const { TextArea, Search } = Input;
const { Title } = Typography;
const formItemLayoutdpjp = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { Option } = Select;

const FormKepulanganPasien = () => {
  const {
    modal1,
    setmodal1,
    modal2,
    setmodal2,
    modal3,
    setmodal3,
    btn,
    setbtn,
    tglPulang,
    settglPulang,
    keadaanPulang,
    setkeadaanPulang,
    noSuket,
    setnoSuket,
    tglMeninggal,
    settglMeninggal,
    namaAkun,
    setnamaAkun,
    rsRujuk,
    setrsRujuk,
    udateKepulanganBpjs,
    insertKepulangan,
    pasienKll,
    setpasienKll,
    noKll,
    setnoKll,
  } = useContext(RM13RIContext);
  // const { namauser } = useContext(LoginContext);
  const { curpasRI } = useContext(PasienRIContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  const onSimpan = () => {
    keadaanPulang === "J" || keadaanPulang === "K"
      ? setmodal2(true)
      : insertKepulangan(dataPulang, databpjs, curpasRI.pembayaranId);
  };

  const dataPulang = {
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggalPulang: dayjs(tglPulang).format("YYYY-MM-DDTHH:mm"),
    jamPulang: dayjs(tglPulang).format("HH:mm"),
    keadaanPulang: keadaanPulang,
    dirujukKe: keadaanPulang === "C" ? rsRujuk : "",
    noSuratKeterangan:
      keadaanPulang === "J" || keadaanPulang === "K" ? noSuket : "",
    tanggalMeninggal:
      keadaanPulang === "J" || keadaanPulang === "K"
        ? dayjs(tglMeninggal).format("YYYY-MM-DDTHH:mm")
        : keadaanPulang === "A" ||
          keadaanPulang === "G" ||
          keadaanPulang === "C"
        ? null
        : null,
    userId: namaAkun,
    clientHost: host,
    clientIP: ip,
  };

  const databpjs = {
    noSep: curpasRI.noJaminan,
    statusPulang:
      keadaanPulang === "A"
        ? "1"
        : keadaanPulang === "G"
        ? "3"
        : keadaanPulang === "J" || keadaanPulang === "K"
        ? "1"
        : "5",
    noSuratMeninggal: "",
    tglMeninggal: "",
    tglPulang: dayjs(tglPulang).format("YYYY-MM-DD"),
    noLPManual: noKll,
    user: namaAkun,
  };

  useEffect(() => {
    settglPulang("");
    setkeadaanPulang("");
    settglMeninggal(null);
    setrsRujuk(null);
    setnoSuket(null);
    setpasienKll(false);
    setnoKll("");
  }, []);

  return (
    <div>
      <Form>
        <Card size="small">
          <Row>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Waktu Pulang"
                style={{ marginBottom: 5 }}
              >
                <DatePicker
                  disabledDate={(current) => {
                    return current > dayjs().endOf("day");
                  }}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                  value={tglPulang}
                  onChange={(date) => {
                    settglPulang(date);
                  }}
                  style={{ width: "70%" }}
                  placeholder="..."
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Keadaan Pulang"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={keadaanPulang}
                  showSearch
                  style={{ width: "70%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  onChange={(e) => {
                    setkeadaanPulang(e);
                    settglMeninggal(null);
                    setrsRujuk(null);
                    setnoSuket(null);
                    if (e === "J" || e === "K") {
                      setmodal1(true);
                    } else {
                      settglMeninggal(null);
                      setnoSuket(null);
                      setbtn(false);
                      // setnoKll(null);
                      // setpasienKll(true);
                    }
                  }}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="A">Atas Persetujuan Dokter</Option>
                  <Option value="C">Dirujuk</Option>
                  <Option value="G">Atas Permintaan Sendiri</Option>
                  <Option value="J">Meninggal &lt; 48 Jam</Option>
                  <Option value="K">Meninggal &gt; 48 Jam</Option>
                  {/* <Option value="L">Lainnya</Option> */}
                  {/* <Option value="I">Masih Menginap</Option> */}
                </Select>
              </Form.Item>
            </Col>
            {keadaanPulang === "C" ? (
              <Col span={24}>
                <Form.Item
                  label="Rujukan"
                  {...formItemLayoutdpjp}
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={rsRujuk}
                    showSearch
                    style={{ width: "70%" }}
                    placeholder="..."
                    optionFilterProp="children"
                    onChange={(e) => {
                      setrsRujuk(e);
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option key="RSUP Dr. Sardjito">RSUP Dr. Sardjito</Option>
                    <Option key="RSUP Dr. Kariadi">RSUP Dr. Kariadi</Option>
                    <Option key="RSCM">RSCM</Option>
                    <Option key="RSUP Persahabatan">RSUP Persahabatan</Option>
                    <Option key="RS Dr. Soeharso Surakarta">
                      RS Dr. Soeharso Surakarta
                    </Option>
                    <Option key="RSUD Dr. Moewardi">RSUD Dr. Moewardi</Option>
                    <Option key="RS Mata Cicendo">RS Mata Cicendo</Option>
                    <Option key="RSJP Harapan Kita">RSJP Harapan Kita</Option>
                  </Select>
                </Form.Item>
              </Col>
            ) : (
              <></>
            )}

            {keadaanPulang === "J" || keadaanPulang === "K" ? (
              <>
                <Col span={24}>
                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="No Surat Ket"
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      onChange={(e) => {
                        setnoSuket(e.target.value);
                      }}
                      value={noSuket}
                      placeholder="..."
                      //   disabled={dissableForm}
                      style={{ width: "70%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="Tgl Meninggal"
                    style={{ marginBottom: 5 }}
                  >
                    <DatePicker
                      disabledDate={(current) => {
                        return current > dayjs().endOf("day");
                      }}
                      format="DD-MM-YYYY HH:mm"
                      showTime
                      value={tglMeninggal}
                      onChange={(date) => {
                        settglMeninggal(date);
                      }}
                      style={{ width: "70%" }}
                      placeholder="..."
                    />
                  </Form.Item>
                </Col>
              </>
            ) : (
              <></>
            )}
            <Col span={24}>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Pasien KLL"
                style={{ marginBottom: 5 }}
              >
                <Row gutter={[10, 10]}>
                  <Col>
                    <Switch
                      value={pasienKll}
                      checkedChildren="YA"
                      unCheckedChildren="TIDAK"
                      onChange={(e) => {
                        setpasienKll(e);
                        setnoKll("");
                      }}
                    />{" "}
                  </Col>
                  <Col>
                    {pasienKll === true ? (
                      <Input
                        placeholder="Isi Nomor Laporan Polisi"
                        value={noKll}
                        style={{ width: 500 }}
                        onChange={(e) => {
                          setnoKll(e.target.value);
                        }}
                      />
                    ) : null}
                  </Col>
                </Row>
              </Form.Item>
            </Col>

            <Col span={24}>
              {curpasRI.pembayaranId === "0050" ||
              curpasRI.pembayaranId === "0051" ? (
                <>
                  <Form.Item
                    {...formItemLayoutdpjp}
                    label="Nama Akun"
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      style={{ width: "70%" }}
                      value={namaAkun}
                      onChange={(e) => setnamaAkun(e.target.value)}
                    />
                    {namaAkun.length < 6 ? (
                      <Alert
                        style={{ width: "70%" }}
                        message="Nama Akun Minimal 6 Karakter"
                        type="error"
                        showIcon
                      />
                    ) : (
                      ""
                    )}
                  </Form.Item>
                </>
              ) : (
                <></>
              )}
            </Col>
          </Row>
        </Card>
        <Card>
          <Row>
            <Col span={12}></Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  onClick={() => {
                    setmodal1(false);
                    setkeadaanPulang("");
                    settglMeninggal(null);
                    setnoSuket(null);
                    setbtn(true);
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    if (
                      curpasRI.pembayaranId === "0050" ||
                      curpasRI.pembayaranId === "0051"
                    ) {
                      if (namaAkun === "" || namaAkun === null) {
                        if (namaAkun.length < 6) {
                          Modal.warning({
                            icon: <Icon component={BPJSICO} />,
                            title: "Nama Akun Kurang dari 6 Huruf!",
                            content: "Silahkan Tambah Nama Akun Anda!",
                          });
                        } else {
                          onSimpan(dataPulang, databpjs);
                        }
                      } else {
                        if (namaAkun.length < 6) {
                          Modal.warning({
                            icon: <Icon component={BPJSICO} />,
                            title: "Nama Akun Tidak Boleh Kurang Dari 6 Huruf!",
                          });
                        } else {
                          onSimpan(dataPulang, databpjs);
                        }
                      }
                    } else {
                      onSimpan(dataPulang);
                    }
                  }}
                  disabled={btn}
                >
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Form>

      <Modal
        closable={false}
        open={modal1}
        footer={[
          <Button
            key="submit"
            onClick={() => {
              setmodal1(false);
              setkeadaanPulang("");
              settglMeninggal(null);
              setnoSuket(null);
              setbtn(true);
            }}
          >
            Tidak
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              setmodal1(false);
              setbtn(false);
              setnoSuket(curpasRI.registrasiId);
            }}
          >
            YA
          </Button>,
        ]}
      >
        <Alert
          message="PASIEN MENINGGAL!"
          description="Apakah Pasien Pulang Dalam Keadaan Meninggal."
          type="error"
          showIcon
        />
        <Form.Item {...formItemLayoutdpjp} style={{ marginBottom: 5 }}>
          <Title level={2}>{curpasRI.namaPasien}</Title>
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No RM"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.pasienId}
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No Registrasi"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.registrasiId}
        </Form.Item>
      </Modal>

      <Modal
        closable={false}
        style={{ top: 20, left: 1 }}
        open={modal2}
        footer={[
          <Button
            key="submit"
            onClick={() => {
              setmodal2(false);
              setkeadaanPulang("");
              settglMeninggal(null);
              setnoSuket(null);
              setbtn(true);
            }}
          >
            Tidak
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              insertKepulangan(dataPulang, databpjs, curpasRI.pembayaranId);
            }}
          >
            YA
          </Button>,
        ]}
      >
        <Alert
          message="PASIEN MENINGGAL!"
          description="Apakah Pasien Pulang Dalam Keadaan Meninggal."
          type="error"
          showIcon
        />
        <Form.Item {...formItemLayoutdpjp} style={{ marginBottom: 5 }}>
          <Title level={2}>{curpasRI.namaPasien}</Title>
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No RM"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.pasienId}
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No Registrasi"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.registrasiId}
        </Form.Item>
      </Modal>

      <Modal
        style={{ right: 1 }}
        closable={false}
        open={modal3}
        footer={[
          <Row>
            <Col span={24} style={{ textAlign: "left" }}>
              <Button
                type="primary"
                onClick={() => {
                  setmodal3(false);
                }}
              >
                YA
              </Button>

              <Button
                key="submit"
                onClick={() => {
                  setmodal3(false);
                  setkeadaanPulang("");
                  settglMeninggal(null);
                  setnoSuket(null);
                  setbtn(true);
                }}
              >
                Tidak
              </Button>
            </Col>
          </Row>,
          <Row></Row>,
        ]}
      >
        <Alert
          message="PASIEN MENINGGAL!"
          description="Apakah Pasien Pulang Dalam Keadaan Meninggal."
          type="error"
          showIcon
        />
        <Form.Item {...formItemLayoutdpjp} style={{ marginBottom: 5 }}>
          <Title level={2}>{curpasRI.namaPasien}</Title>
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No RM"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.pasienId}
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No Registrasi"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.registrasiId}
        </Form.Item>
      </Modal>
    </div>
  );
};

export default FormKepulanganPasien;
