import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  Select,
  Row,
  Col,
  Typography,
  Form,
  Table,
  Empty,
  message,
  Spin,
} from "antd";
import { PasienContext } from "../context/PasienContext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import FormRM02ViewRuang from "./FormRM02ViewRuang";
import FormRM02ViewTahun from "./FormRM02ViewTahun";
import FormRM02ViewReg from "./FormRM02ViewReg";
const { Column } = Table;
const { Option } = Select;
const { Text } = Typography;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const FormRM02View = () => {
  const [pilihWaktu, setpilihWaktu] = useState("Sekarang");
  const [modalRM02, setmodalRM02] = useState(false);
  const {
    getPrintRm02Tahun,
    getPrintRm02Poli,
    getPrintRm02Kunjungan,
    // getPrintRm02,
    // printRm02,
    // setprintRm02,
    // printRm02Tahun,
    // printRm02Poli,
    // printRm02Kunjungan,
    setprintRm02Tahun,
    setprintRm02Poli,
    setprintRm02Kunjungan,
    modalKunjungan,
    setmodalKunjungan,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);
  const { curpas, riwayatpasien, detailRiwayatPasien, loading } =
    useContext(PasienContext);

  const onMV = () => {
    if (curpas === "" || curpas === null) {
      // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
      message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
    } else {
      detailRiwayatPasien(curpas.pasienId);
      // setpilihWaktu("Sekarang");
      setmodalRM02(true);
      setloadDelay(true);
      getPrintRm02Kunjungan(curpas.pasienId, curpas.registrasiId);
      // console.log("masuk ini loh", loadDelay);
    }
  };
  const handleOk = () => {
    setpilihWaktu("Sekarang");
    setmodalRM02(false);
    setloadDelay(false);
    // setprintRm02("");
    setprintRm02Kunjungan("");
    setprintRm02Poli("");
    setprintRm02Tahun("");
  };
  return (
    <div>
      <Button
        size="small"
        onClick={onMV}
        style={{ backgroundColor: "#bae7ff", borderColor: "#40a9ff" }}
      >
        RM 02
      </Button>
      <Modal
        visible={modalRM02}
        footer={null}
        onOk={handleOk}
        onCancel={handleOk}
        width="70%"
        centered={true}
      >
        <Spin
          spinning={loadDelay}
          tip="Sedang memuat data, lama proses tergantung banyaknya data."
        >
          <Row gutter={[5, 5]}>
            <Col span={24}>
              {/* <Title level={4}>Data RM 02 Pasien</Title> */}
              <Text keyboard>Data Rm 02 Pasien</Text>
            </Col>
            <Col span={18}>
              <Form.Item
                {...formItemLayout}
                // label="Cara Kunjungan"
                style={{ marginBottom: 0 }}
              >
                <Select
                  value={pilihWaktu}
                  style={{ width: "100%" }}
                  onChange={(e) => {
                    setpilihWaktu(e);
                    if (e === "Sekarang") {
                      getPrintRm02Kunjungan(
                        curpas.pasienId,
                        curpas.registrasiId
                      );
                      setloadDelay(true);
                    } else if (e === "Poli") {
                      getPrintRm02Poli(curpas.pasienId, curpas.ruangId);
                      setloadDelay(true);
                    } else if (e === "Tahun") {
                      getPrintRm02Tahun(curpas.pasienId, "tahun");
                      setloadDelay(true);
                    } else {
                      //setLoading(true);
                      //  detailRiwayatPasien(curpas.pasienId);
                      setmodalKunjungan(true);
                    }
                  }}
                >
                  <Option value="Sekarang">Waktu Sekarang</Option>
                  <Option value="Poli">Berdasarkan Poli/Unit</Option>
                  <Option value="Tahun">Kunjungan 1 Tahun Terakhir</Option>
                  <Option value="Kunjungan">Berdasarkan Kunjungan</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Button
                onClick={() => {
                  setpilihWaktu("Kunjungan");
                  // setLoading(true);
                  // detailRiwayatPasien(curpas.pasienId);
                  setmodalKunjungan(true);
                }}
                style={{ backgroundColor: "#bae7ff", borderColor: "#40a9ff" }}
              >
                Data Kunjungan
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              {pilihWaktu === "Poli" ? (
                <FormRM02ViewRuang />
              ) : pilihWaktu === "Tahun" ? (
                <FormRM02ViewTahun />
              ) : (
                <FormRM02ViewReg />
              )}
            </Col>
          </Row>

          <Modal
            visible={modalKunjungan}
            footer={null}
            onOk={handleOk}
            onCancel={() => {
              setmodalKunjungan(false);
            }}
            title="Riwayat Pendaftaran"
            width="70%"
            centered={true}
          >
            <Spin spinning={loading}>
              <Table
                dataSource={riwayatpasien}
                size="small"
                bordered
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description={"Silahkan Pilih Pasien Terlebih Dahulu"}
                    />
                  ),
                }}
              >
                <Column
                  title="Tanggal"
                  key="TglMasuk"
                  dataIndex="TanggalMasuk"
                  width="80px"
                />
                <Column
                  title="Reg"
                  key=" No Registrasi"
                  dataIndex="RegistrasiId"
                  width="80px"
                />
                <Column
                  title="Ruang"
                  dataIndex="RuangDeskripsi"
                  width="90px"
                  key="pasienId"
                  className="fontkecil"
                />
                <Column
                  title="Kode"
                  dataIndex="DiagnosisId"
                  width="40px"
                  className="fontkecil"
                />
                <Column
                  title="Penyakit"
                  dataIndex="Deskripsi"
                  width="200px"
                  key="pasienId"
                  className="fontkecil"
                />
                <Column
                  title="Action"
                  width="60px"
                  className="fontkecil"
                  render={(riwayatpasien) => (
                    <span>
                      <Button
                        size="small"
                        type="primary"
                        onClick={(e) => {
                          getPrintRm02Kunjungan(
                            curpas.pasienId,
                            riwayatpasien.RegistrasiId
                          );
                          setloadDelay(true);
                        }}
                      >
                        Lihat RM02
                      </Button>
                    </span>
                  )}
                />
              </Table>
            </Spin>
          </Modal>
        </Spin>
      </Modal>
    </div>
  );
};

export default FormRM02View;
