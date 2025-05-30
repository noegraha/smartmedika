import React, { useContext, useState, useEffect } from "react";
import { ESWLContext } from "./context/ESWLContext";
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
} from "antd";

import dayjs from "dayjs";
import "dayjs/locale/id";

const DetailHasilESWL = () => {
  const { detailEswlId } = useContext(ESWLContext);

  const dateFormat = ["DD-MM-YYYY", "DD-MM-YYYY", "YYYY-MM-DD"];
  const format = "HH:mm";
  const [form] = Form.useForm();
  const { TextArea } = Input;

  return (
    <div>
      <Descriptions title="Data Pasien" size="small" bordered>
        <Descriptions.Item label="No. Order">
          {detailEswlId.NOORDER}
        </Descriptions.Item>
        <Descriptions.Item label="No. Register">
          {detailEswlId.NOREG}
        </Descriptions.Item>
        <Descriptions.Item label="No. Pasien">
          {detailEswlId.NOPASIEN}
        </Descriptions.Item>
        <Descriptions.Item label="Nama Pasien">
          <b>{detailEswlId.NAMAPASIEN}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Tanggal Lahir">
          {dayjs(detailEswlId.TGLLAHIR).format(dateFormat[1])}
        </Descriptions.Item>
        <Descriptions.Item label="Jaminan">
          {detailEswlId.NAMAPT}
        </Descriptions.Item>
        <Descriptions.Item label="Kelas">
          {detailEswlId.NMGRPTRF}
        </Descriptions.Item>
        <Descriptions.Item label="Ruang" span={2}>
          {detailEswlId.NAMABAGIAN}
        </Descriptions.Item>
      </Descriptions>

      <Card style={{ marginTop: 10 }}>
        <Form form={form} layout="vertical" size="small">
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item label="Nama Operator">
                <Input value={detailEswlId.NAMADOKTER} readOnly />
              </Form.Item>
              <Form.Item label="Nama Asisten">
                <Input value={detailEswlId.NAMAASISTEN} readOnly />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Nama Perawat">
                <Input value={detailEswlId.NAMAPERAWAT} readOnly />
              </Form.Item>
              <Form.Item label="Jenis Tindakan">
                <Input value={detailEswlId.NAMAPMR} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Waktu Mulai">
                <Input
                  value={dayjs(detailEswlId.WAKTUMULAI).format(format)}
                  readOnly
                />
              </Form.Item>
              <Form.Item label="Waktu Selesai">
                <Input
                  value={dayjs(detailEswlId.WAKTUSELESAI).format(format)}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Tanggal Tindakan">
                <Input value={detailEswlId.NAMAPERAWAT} readOnly />
              </Form.Item>
              <Form.Item label="Amplitudo">
                <Input value={detailEswlId.AMPLITUDO} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Power">
                <Input value={detailEswlId.POWER} readOnly />
              </Form.Item>
              <Form.Item label="Frekuensi">
                <Input value={detailEswlId.FREKUENSI} readOnly />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item label="Intensity Rate">
                <Input value={detailEswlId.INTENSITYRATE} readOnly />
              </Form.Item>
            </Col>
          </Row>
          <Image
            src={`data:image/jpeg;base64,${detailEswlId.GAMBAROPERASI}`}
            style={{ height: 400, width: 450, border: "1px solid black" }}
          />
          <Col span={24}>
            <Form.Item label="Diagnosa Pra Tindakan">
              <TextArea value={detailEswlId.DIAGNOSA} readOnly />
            </Form.Item>
            <Form.Item label="Diagnosa Pasca Tindakan">
              <TextArea value={detailEswlId.PASCATINDAKAN} readOnly />
            </Form.Item>
            <Form.Item label="Laporan Operasi">
              <TextArea
                style={{ height: 200 }}
                value={detailEswlId.LAPORANOPERASI}
                readOnly
              />
            </Form.Item>
          </Col>
        </Form>
      </Card>
    </div>
  );
};

export default DetailHasilESWL;
