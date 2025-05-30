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
  Tag,
  Divider,
} from "antd";
import { PasienRIContext } from "../context/PasienRIContext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";

const formItemLayoutdpjp = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { Option } = Select;

const FormTfruang = () => {
  const {
    curpasRI,
    modalMutasi,
    setmodalMutasi,
    setmodalTFPenjamin,
    getListRuangan,
    listRuang,
    setlistRuang,
    listPenjamin,
    setlistPenjamin,
    listKamarKosong,
    setlistKamarKosong,
    getPenjaminByruang,
    getKamarKosong,
    getTTpasien,
    setttPasien,
    ttPasien,
    insertMutasiRuang,
  } = useContext(PasienRIContext);
  const { pembayaran } = useContext(PasienContext);
  const [ruangantf, setRuangtf] = useState("");
  const [penjaminantf, setPenjaminantf] = useState("");
  const [kamarantf, setKamarantf] = useState("");
  const [extratf, setextratf] = useState("");
  const [keteranganTf, setketeranganTf] = useState("");

  const [kamarPilih, setkamarPilih] = useState("");
  const { namauser } = useContext(LoginContext);

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  const datamutasi = {
    ruangIdLama: curpasRI.ruangId,
    ruangIdBaru: ruangantf.split("-").shift(),
    ruangDeskBaru: ruangantf.split("-").pop(),
    kelasRawatIdLama: curpasRI.kelasRawatId,
    kelasRawatIdBaru: penjaminantf,
    registrasiId: curpasRI.registrasiId,
    userId: namauser,
    clientIP: ip,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    bedBaru: {
      bedId: kamarantf.ruangId + "." + kamarantf.kamarid,
      noBed: kamarantf.noUtama,
      registrasiId: curpasRI.registrasiId,
      keterangan: keteranganTf,
      extra: kamarantf.extra,
    },
    bedLama: {
      bedId: ttPasien.bedId,
      noBed: ttPasien.noBed,
      registrasiId: curpasRI.registrasiId,
      keterangan: ttPasien.keterangan,
      extra: ttPasien.extra,
    },
  };
  useEffect(() => {
    setRuangtf("");
    setPenjaminantf("");
    setKamarantf("");
    setketeranganTf("");
  }, []);
  return (
    <div>
      <Card>
        <Row>
          <Col span={24} style={{}}>
            <Alert
              message="Transfer Ruang Perawatan"
              description="Pastikan Ruangan Yang Anda Pilih Sudah Benar."
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
              label="Kelas Rawat Pasien"
              style={{ marginBottom: 5 }}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                // placeholder="..."
                // onChange={(e) => setrudaPaksa(e.target.value)}
                value={curpasRI.kelasRawat}
                readOnly
              />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Ruang Pasien"
              style={{ marginBottom: 5 }}
            >
              <Input
                type="text"
                style={{ width: "100%" }}
                // placeholder="..."
                // onChange={(e) => setrudaPaksa(e.target.value)}
                value={
                  // "Ruang :" +
                  // ttPasien.ruangId +
                  "No Kamar: " +
                  ttPasien.bedId.split(".").pop() +
                  " , No. TT: " +
                  ttPasien.noBed
                }
                readOnly
              />
            </Form.Item>
            <Divider orientation="left">Data Baru Pasien</Divider>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Ruangan Baru"
              style={{ marginBottom: 5 }}
            >
              <Select
                value={ruangantf}
                dataSource={listRuang}
                onFocus={() => {
                  getListRuangan("1");
                }}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={(e) => {
                  setRuangtf(e);
                  getPenjaminByruang(e.split("-").shift());
                  setPenjaminantf("");
                  setKamarantf("");
                  setkamarPilih("");
                  setketeranganTf("");
                }}
              >
                {listRuang.map((d) => (
                  <Option key={d.ruangId + "-" + d.deskripsi}>
                    {d.deskripsi}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Kelas Rawat"
              style={{ marginBottom: 5 }}
            >
              <Select
                value={penjaminantf}
                dataSource={listPenjamin}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={(e) => {
                  setPenjaminantf(e);
                  setKamarantf("");
                  setkamarPilih("");
                  getKamarKosong(ruangantf.split("-").shift(), e, "%20");
                }}
              >
                {listPenjamin.map((d) => (
                  <Option key={d.kelasRawatId}>{d.kelasRawatDesk}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Kamar"
              style={{ marginBottom: 5 }}
            >
              <Select
                value={kamarPilih}
                dataSource={listKamarKosong}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={(e) => {
                  setkamarPilih(e);
                  setKamarantf(
                    listKamarKosong.filter(
                      (item) => item.kode === parseInt(e)
                    )[0]
                  );
                }}
              >
                {listKamarKosong.map((d) => (
                  <Option key={d.kode}>
                    {
                      <div>
                        <Row>
                          <Col span={8} style={{ textAlign: "left" }}>
                            <Tag color="geekblue">
                              {"No Kamar: " + d.kamarid}
                            </Tag>
                          </Col>
                          <Col span={8} style={{ textAlign: "left" }}>
                            <Tag color="purple">{"No Bed: " + d.noUtama}</Tag>
                          </Col>
                          <Col span={8} style={{ textAlign: "left" }}>
                            {d.extra ? (
                              <>
                                <Tag color="orange">Extra Bed</Tag>
                              </>
                            ) : (
                              <>
                                <Tag color="green">Bed Utama</Tag>
                              </>
                            )}
                          </Col>
                        </Row>
                      </div>
                    }
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Keterangan"
              style={{ marginBottom: 5 }}
            >
              <Input
                value={keteranganTf}
                onChange={(e) => setketeranganTf(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setmodalMutasi(false);
                  setRuangtf("");
                  setPenjaminantf("");
                  setKamarantf("");
                  setketeranganTf("");
                }}
              >
                Batal
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  insertMutasiRuang(datamutasi);
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

export default FormTfruang;
