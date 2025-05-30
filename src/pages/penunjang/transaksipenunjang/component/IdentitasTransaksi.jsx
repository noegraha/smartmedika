import React, { useContext } from "react";
import {
  Card,
  Col,
  Row,
  Form,
  Input,
  Button,
  DatePicker,
  Tooltip,
  Modal,
  message,
} from "antd";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import dayjs from "dayjs";
import LookupbyNoreg from "./LookupbyNoreg";
import "../style/styleLookupOrder.css";

const IdentitasTransaksi = () => {
  const {
    defaultNoTr,
    unitId,
    // main
    noTransaksi,
    setNoTransaksi,
    pasienId,
    setPasienId,
    namaPasien,
    setNamaPasien,
    jenisPasien,
    setJenisPasien,
    jam,
    setJam,
    deskUnitAsalId,
    setDeskUnitAsalId,
    deskKelasRawat,
    setDeskKelasRawat,
    namaDokter,
    setNamaDokter,
    setListBillPmr,
    LookupRegistrasi,
    // spin
    spinAll,
    // disable
    disNoTransaksi,
    setdisNoTransaksi,
    // modal
    mdLookupRegistrasi,
    setmdLookupRegistrasi,
  } = useContext(TransaksiPenunjangContext);

  const resetNoTr = () => {
    setNoTransaksi(defaultNoTr);
    setPasienId("");
    setNamaPasien("");
    setJenisPasien("");
    setJam(dayjs());
    setDeskUnitAsalId("");
    setDeskKelasRawat("");
    setNamaDokter("");
    setListBillPmr([]);
    setdisNoTransaksi(false);
  };

  const klikSatu = () => {
    if (!unitId) {
      message.error("Pilih Unit Pelayanan Terlebih Dahulu!");
    } else if (noTransaksi.length < 4) {
      message.error("No Transaksi minimal 4 digit untuk mencari!");
    } else {
      setmdLookupRegistrasi(true);
      LookupRegistrasi(noTransaksi);
    }
  };

  return (
    <div>
      <Card loading={spinAll}>
        <Row>
          <Col span="12">
            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              labelAlign="left"
            >
              <Form.Item label="No.Transaksi" style={{ marginBottom: "0px" }}>
                <Input
                  value={noTransaksi}
                  onChange={(e) => setNoTransaksi(e.target.value)}
                  disabled={disNoTransaksi}
                  size="small"
                  style={{
                    width: "30%",
                    marginRight: "5px",
                    marginLeft: "14px",
                  }}
                />
                <Tooltip title="Cari">
                  <Button
                    onClick={() => klikSatu()}
                    type="primary"
                    size="small"
                    style={{ marginRight: "5px" }}
                  >
                    1
                  </Button>
                </Tooltip>
                <Tooltip title="Reset">
                  <Button
                    type="primary"
                    onClick={() => resetNoTr()}
                    size="small"
                  >
                    2
                  </Button>
                </Tooltip>
              </Form.Item>
            </Form>

            <Row>
              <Col span={12}>
                <Form
                  labelCol={{ span: 7 }}
                  wrapperCol={{ span: 16 }}
                  labelAlign="left"
                >
                  <Form.Item
                    label="Medical Record"
                    style={{ width: "100%", marginBottom: "0px" }}
                  >
                    <Input
                      value={pasienId}
                      placeholder="Medical Record"
                      size="small"
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  labelCol={{ span: 5 }}
                  wrapperCol={{ span: 18 }}
                  labelAlign="left"
                >
                  <Form.Item label="Tanggal" style={{ marginBottom: "0px" }}>
                    <Tooltip title="Registrasi">
                      <Input
                        type="text"
                        value={dayjs(jam).format("DD/MM/YYYY")}
                        size="small"
                        style={{ width: "100%" }}
                      />
                    </Tooltip>
                  </Form.Item>
                </Form>
              </Col>
            </Row>

            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              labelAlign="left"
            >
              <Form.Item label="Nama Pasien" style={{ marginBottom: "0px" }}>
                <Input
                  value={namaPasien}
                  placeholder="Nama Pasien"
                  size="small"
                  style={{
                    width: "95%",
                    marginRight: "5px",
                    marginLeft: "14px",
                  }}
                />
              </Form.Item>
            </Form>

            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              labelAlign="left"
            >
              <Form.Item label="Perusahaan" style={{ marginBottom: "0px" }}>
                <Input
                  value={jenisPasien}
                  placeholder="Perusahaan"
                  size="small"
                  style={{
                    width: "95%",
                    marginRight: "5px",
                    marginLeft: "14px",
                  }}
                />
              </Form.Item>
            </Form>
          </Col>

          <Col
            span="12"
            // style={{ backgroundColor: 'silver' }}
          >
            <Row>
              <Col span={12}>
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }}
                  labelAlign="left"
                >
                  <Form.Item
                    label="Waktu"
                    style={{ width: "100%", marginBottom: "0px" }}
                  >
                    <Input
                      placeholder="Waktu"
                      size="small"
                      style={{ marginLeft: "41px" }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 17 }}
                  labelAlign="left"
                >
                  <Form.Item
                    label="No.Urut"
                    style={{ width: "100%", marginBottom: "0px" }}
                  >
                    <Input placeholder="No.Urut" size="small" />
                  </Form.Item>
                </Form>
              </Col>
            </Row>

            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              labelAlign="left"
            >
              <Form.Item label="Pelayanan" style={{ marginBottom: "0px" }}>
                <Input
                  value={deskUnitAsalId}
                  placeholder="Pelayanan"
                  size="small"
                  style={{
                    width: "95%",
                    marginRight: "5px",
                    marginLeft: "14px",
                  }}
                />
              </Form.Item>
            </Form>

            <Row>
              <Col span={12}>
                <Form
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 16 }}
                  labelAlign="left"
                >
                  <Form.Item
                    label="Kelas"
                    style={{ width: "100%", marginBottom: "0px" }}
                  >
                    <Input
                      value={deskKelasRawat}
                      placeholder="Kelas"
                      size="small"
                      style={{ marginLeft: "41px" }}
                    />
                  </Form.Item>
                </Form>
              </Col>
              <Col span={12}>
                <Form
                  labelCol={{ span: 6 }}
                  wrapperCol={{ span: 17 }}
                  labelAlign="left"
                >
                  <Form.Item
                    label="Jatah Kelas"
                    style={{ width: "100%", marginBottom: "0px" }}
                  >
                    <Input placeholder="Jatah Kelas" size="small" />
                  </Form.Item>
                </Form>
              </Col>
            </Row>

            <Form
              labelCol={{ span: 3 }}
              wrapperCol={{ span: 21 }}
              labelAlign="left"
            >
              <Form.Item label="Dokter" style={{ marginBottom: "0px" }}>
                <Input
                  value={namaDokter}
                  placeholder="Dokter"
                  size="small"
                  style={{
                    width: "95%",
                    marginRight: "5px",
                    marginLeft: "14px",
                  }}
                />
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Card>

      <Modal
        title="LookUp Registrasi"
        visible={mdLookupRegistrasi}
        closable={false}
        footer={null}
        width={1000}
        className="modal_lookuporder"
        style={{ top: "20px" }}
      >
        <LookupbyNoreg />
      </Modal>
    </div>
  );
};

export default IdentitasTransaksi;
