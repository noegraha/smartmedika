import React, { useContext } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Card,
  Button,
  Space,
  Select,
  Modal,
  Divider,
} from "antd";

import Iframe from "react-iframe";

import { AnamnesaRIContext } from "../context/AnamnesaRIContext";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import dayjs from "dayjs";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
// import { PerkembanganPasienRIContext } from '../context/PerkembanganPasienRI';
const { TextArea } = Input;
const { Option } = Select;

// const formItemLayout = {
//   labelCol: { span: 8 },
//   wrapperCol: { span: 16 },
// };
const formItemLayoutFull = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const FormAnamnesa = () => {
  const { getPrintAnamnesa } = useContext(PrintOutContext);
  const [form] = Form.useForm();
  const {
    insertAnamnesaRI,
    keluhanUtama,
    keluhanTambahan,
    riyawatPenyakitSekarang,
    setriyawatPenyakitSekarang,
    riwayatPenyakitTerdahulu,
    setriwayatPenyakitTerdahulu,
    riwayatPenyakitKeluarga,
    setriwayatPenyakitKeluarga,
    keteranganKeluarga,
    setketeranganKeluarga,
    setKeluhanUtama,
    setKeluhanTambahan,
    kosongkanformanamnesari,
    dokterpengisi,
    setdokterpengisi,
    jamAnamnesa,
    setjamAnamnesa,
  } = useContext(AnamnesaRIContext);
  const { dokterall } = useContext(PelayananContext);
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  //const { tekanan } = useContext(PerkembanganPasienRIContext)
  const dataanamnesa = {
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    keluhanUtama: keluhanUtama,
    keluhanTambahan: keluhanTambahan,
    riyawatPenyakitSekarang: riyawatPenyakitSekarang,
    riwayatPenyakitTerdahulu: riwayatPenyakitTerdahulu,
    riwayatPenyakitKeluarga: riwayatPenyakitKeluarga,
    keteranganKeluarga: keteranganKeluarga,
    jamAnamnesa: dayjs().format("YYYY-MM-DDTHH:mm"),
    dokterId: dokterpengisi === "" ? curpasRI.dokterId : dokterpengisi,
    userId: namauser,
    clientHost: host,
    clientIp: ip,
  };

  return (
    <div>
      <Form form={form}>
        <Card
          size="small"
          // title="Form Anamnesa Pasien Rawat Inap" headStyle={{ fontWeight: 'bolder', backgroundColor: 'beige' }}
        >
          <Row gutter={[3, 3]}>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull}
                label="Keluhan Utama"
                style={{ marginBottom: 2 }}
              >
                <TextArea
                  rows={3}
                  maxLength={4000}
                  showCount
                  placeholder="..."
                  value={keluhanUtama}
                  onChange={(e) => {
                    setKeluhanUtama(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Keluhan Tambahan"
                style={{ marginBottom: 2 }}
              >
                <TextArea
                  rows={3}
                  maxLength={4000}
                  showCount
                  placeholder="..."
                  value={keluhanTambahan}
                  onChange={(e) => {
                    setKeluhanTambahan(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Riwayat Penyakit Sekarang"
                style={{ marginBottom: 2 }}
              >
                <TextArea
                  rows={2}
                  maxLength={4000}
                  showCount
                  placeholder="..."
                  value={riyawatPenyakitSekarang}
                  onChange={(e) => {
                    setriyawatPenyakitSekarang(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Riwayat Penyakit Terdahulu"
                style={{ marginBottom: 2 }}
              >
                <TextArea
                  rows={2}
                  maxLength={4000}
                  showCount
                  placeholder="..."
                  value={riwayatPenyakitTerdahulu}
                  onChange={(e) => {
                    setriwayatPenyakitTerdahulu(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Riwayat Penyakit Keluarga"
                style={{ marginBottom: 2 }}
              >
                <TextArea
                  rows={2}
                  maxLength={4000}
                  showCount
                  placeholder="..."
                  value={riwayatPenyakitKeluarga}
                  onChange={(e) => {
                    setriwayatPenyakitKeluarga(e.target.value);
                  }}
                />
              </Form.Item>
              <Divider orientation="left" plain>
                Allo Anamnesa
              </Divider>
              <Form.Item
                {...formItemLayoutFull}
                label="Keterangan Keluarga"
                style={{ marginBottom: 2 }}
              >
                <TextArea
                  rows={2}
                  maxLength={4000}
                  showCount
                  placeholder="..."
                  value={keteranganKeluarga}
                  onChange={(e) => {
                    setketeranganKeluarga(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Dokter PenanggungJawab"
                style={{ marginBottom: 2 }}
              >
                <Select
                  value={
                    dokterpengisi === "" ? curpasRI.dokterId : dokterpengisi
                  }
                  dataSource={dokterall}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  onChange={(e) => setdokterpengisi(e)}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {dokterall.map((d) => (
                    <Option key={d.dokterId}>{d.namaDokter}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>
        <Card size="small">
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              <Space>
                <Button
                  onClick={() => {
                    getPrintAnamnesa(curpasRI.registrasiId);
                  }}
                >
                  Cetak
                </Button>
                {/* <Button>Cetak RM02</Button> */}
              </Space>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Space>
                <Button block={50} onClick={() => kosongkanformanamnesari()}>
                  Batal
                </Button>
                <Button
                  block={50}
                  type="primary"
                  onClick={() => {
                    insertAnamnesaRI(dataanamnesa);
                    console.log(dataanamnesa);
                  }}
                >
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default FormAnamnesa;
