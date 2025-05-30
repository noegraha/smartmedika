import React, { useContext, useState, useEffect } from "react";
import { ESWLContext } from "./context/ESWLContext";
import EswlGambar from "./EswlGambar";
import {
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Modal,
  Select,
  InputNumber,
  TimePicker,
  Image,
  Button,
} from "antd";

import dayjs from "dayjs";
import "dayjs/locale/id";

const FormTindakanESWL = () => {
  const {
    detailEswlOrder,
    setNamaOperator,
    setNamaAsisten,
    setNamaPerawat,
    setJenisTindakan,
    setWaktuMulai,
    setWaktuSelesai,
    setTanggalTindakan,
    setAmplitudo,
    setPower,
    setFrekuensi,
    setIntensityRate,
    setDiagnosaPra,
    setDiagnosaPasca,
    setLaporanOperasi,
    namaoperator,
    namaasisten,
    namaperawat,
    jenistindakan,
    waktumulai,
    waktuselesai,
    tanggaltindakan,
    amplitudo,
    power,
    frekuensi,
    intensityrate,
    diagnosapra,
    diagnosapasca,
    laporanoperasi,
    gambar,
    setTindakan,
  } = useContext(ESWLContext);

  const dateFormat = ["DD-MM-YYYY", "DD-MM-YYYY", "YYYY-MM-DD"];
  const format = "HH:mm";
  const [form] = Form.useForm();
  const { TextArea } = Input;

  const dataeswl = {
    laporanEswlId: 0,
    NOORDER: detailEswlOrder.NOORDER,
    NOREG: detailEswlOrder.NOREG,
    NOPASIEN: detailEswlOrder.NOPASIEN,
    NAMAPASIEN: detailEswlOrder.NAMAPASIEN,
    NMGRPTRF: detailEswlOrder.NMGRPTRF,
    NAMABAGIAN: detailEswlOrder.NAMABAGIAN,
    NAMAPT: detailEswlOrder.NAMAPT,
    TGLLAHIR: detailEswlOrder.TGLLAHIR,
    NAMADOKTER: namaoperator,
    NAMAASISTEN: namaasisten,
    NAMAPERAWAT: namaperawat,
    NAMAPMR: jenistindakan,
    TGLTINDAKAN: tanggaltindakan,
    WAKTUMULAI: waktumulai,
    WAKTUSELESAI: waktuselesai,
    DIAGNOSA: diagnosapra,
    PASCATINDAKAN: diagnosapasca,
    AMPLITUDO: amplitudo,
    FREKUENSI: frekuensi,
    INTENSITYRATE: intensityrate,
    POWER: power,
    LAPORANOPERASI: laporanoperasi,
    GAMBAROPERASI: gambar,
    Hapus: 0,
    dateEntry: "",
    clientHost: "",
    ipClient: "",
  };

  const handleCancel = () => {
    setTindakan(false);
  };

  return (
    <div>
      <Descriptions title="Data Pasien" size="small" bordered>
        <Descriptions.Item label="No. Order">
          {detailEswlOrder.NOORDER}
        </Descriptions.Item>
        <Descriptions.Item label="No. Register">
          {detailEswlOrder.NOREG}
        </Descriptions.Item>
        <Descriptions.Item label="No. Pasien">
          {detailEswlOrder.NOPASIEN}
        </Descriptions.Item>
        <Descriptions.Item label="Nama Pasien">
          <b>{detailEswlOrder.NAMAPASIEN}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Tanggal Lahir">
          {dayjs(detailEswlOrder.TGLLAHIR).format(dateFormat[1])}
        </Descriptions.Item>
        <Descriptions.Item label="Jaminan">
          {detailEswlOrder.NAMAPT}
        </Descriptions.Item>
        <Descriptions.Item label="Kelas">
          {detailEswlOrder.NMGRPTRF}
        </Descriptions.Item>
        <Descriptions.Item label="Ruang" span={2}>
          {detailEswlOrder.NAMABAGIAN}
        </Descriptions.Item>
      </Descriptions>

      <Card style={{ marginTop: 10 }}>
        <Form form={form} layout="vertical" size="small">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Nama Operator">
                <Input
                  onChange={(e) => {
                    setNamaOperator(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Nama Asisten">
                <Input
                  onChange={(e) => {
                    setNamaAsisten(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Nama Perawat">
                <Input
                  onChange={(e) => {
                    setNamaPerawat(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Jenis Tindakan">
                <Input
                  onChange={(e) => {
                    setJenisTindakan(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Waktu Mulai">
                <Input
                  onChange={(e) => {
                    setWaktuMulai(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Waktu Selesai">
                <Input
                  onChange={(e) => {
                    setWaktuSelesai(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Tanggal Tindakan">
                <Input
                  onChange={(e) => {
                    setTanggalTindakan(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Amplitudo">
                <Input
                  onChange={(e) => {
                    setAmplitudo(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Power">
                <Input
                  onChange={(e) => {
                    setPower(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item label="Frekuensi">
                <Input
                  onChange={(e) => {
                    setFrekuensi(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Intensity Rate">
                <Input
                  onChange={(e) => {
                    setIntensityRate(e.target.value);
                  }}
                />
              </Form.Item>
            </Col>
          </Row>
          <EswlGambar />
          <Col span={24}>
            <Form.Item label="Diagnosa Pra Tindakan">
              <TextArea
                onChange={(e) => {
                  setDiagnosaPra(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Diagnosa Pasca Tindakan">
              <TextArea
                onChange={(e) => {
                  setDiagnosaPasca(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Laporan Operasi">
              <TextArea
                onChange={(e) => {
                  setLaporanOperasi(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
        </Form>
      </Card>

      <Button type="primary" onClick={""} style={{ float: "right" }}>
        Simpan
      </Button>
      <Button
        type="secondary"
        onClick={handleCancel}
        style={{ float: "right" }}
      >
        Cancel
      </Button>
    </div>
  );
};

export default FormTindakanESWL;
