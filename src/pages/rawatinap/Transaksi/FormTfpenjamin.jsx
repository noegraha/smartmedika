import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Select,
  Card,
  Alert,
  Input,
  Col,
  Row,
  Space,
  Button,
  Divider,
} from "antd";
import { PasienRIContext } from "../context/PasienRIContext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";

const formItemLayoutdpjp = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { Option } = Select;

const FormTfpenjamin = () => {
  const {
    curpasRI,
    tfPenjamin,
    modalTFPenjamin,
    setmodalTFPenjamin,
    penjamin,
    setPenjamin,
    noSep,
    setnoSep,
  } = useContext(PasienRIContext);
  const { pembayaran, getPembayaran } = useContext(PasienContext);
  useEffect(() => {
    setPenjamin("");
    setnoSep(null);
    getPembayaran();
  }, []);
  return (
    <div>
      <Card>
        <Row>
          <Col span={24} style={{}}>
            <Alert
              message="Transfer Penjamin"
              description="Pastikan Data penjamin Yang Anda Pilih Sudah Benar."
              type="info"
              showIcon
            />
          </Col>
          <Col span={24} style={{}}>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Nomor Registrasi"
              style={{ marginBottom: 5 }}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                // placeholder="..."
                // onChange={(e) => setrudaPaksa(e.target.value)}
                value={curpasRI.registrasiId}
                readOnly
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Nama Pasien"
              style={{ marginBottom: 5 }}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                // placeholder="..."
                // onChange={(e) => setrudaPaksa(e.target.value)}
                value={curpasRI.namaPasien}
                readOnly
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Penjamin Sekarang"
              style={{ marginBottom: 5 }}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                // placeholder="..."
                // onChange={(e) => setrudaPaksa(e.target.value)}
                value={curpasRI.namaPembayaran}
                readOnly
              />
            </Form.Item>
            <Divider orientation="left">Data Baru Pasien</Divider>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Penjamin Baru"
              style={{ marginBottom: 5 }}
            >
              <Select
                value={penjamin}
                dataSource={pembayaran}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={(e) => {
                  setPenjamin(e);
                  setnoSep(null);
                }}
              >
                {pembayaran.map((d) => (
                  <Option key={d.pembayaranId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
            {penjamin === "0050" || penjamin === "0051" ? (
              <Form.Item
                {...formItemLayoutdpjp}
                label="No SEP"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  style={{ width: "100%" }}
                  // placeholder="..."
                  onChange={(e) => setnoSep(e.target.value)}
                  value={noSep}
                  // readOnly
                />
              </Form.Item>
            ) : (
              <> </>
            )}
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setmodalTFPenjamin(false);
                  setPenjamin("");
                  setnoSep(null);
                }}
              >
                Batal
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  // tfPenjamin(curpasRI.registrasiId);
                  tfPenjamin(curpasRI.registrasiId, penjamin, noSep);
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FormTfpenjamin;
