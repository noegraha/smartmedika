import React, { useContext, useState } from "react";
import {
  Tabs,
  Card,
  Form,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Radio,
  Input,
  Button,
} from "antd";
import { LoginContext } from "../../../rawatjalan/context/LoginContext";
import { PasienHDContext } from "../context/PasienHDContext";
import { PelayananHDContext } from "../context/PelayananHDContext";
import dayjs from "dayjs";
import Modal from "antd/lib/modal/Modal";
import { ChatContext } from "../../../chat/Chatcontext";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import PageheadHD from "../PageheadHD";

const { TabPane } = Tabs;
const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const PelayananHD = () => {
  const dateFormat = "DD-MM-YYYY";
  const { curpas } = useContext(PasienHDContext);
  const {
    dialisisHeaderId,
    prevHistory,
    tanggalHD,
    dialisisKe,
    riwAllObat,
    riwAllObatKet,
    verifHD,
    noMesin,
    dialsiser,
    setTanggalHD,
    setDialisisKe,
    setRiwAllObat,
    setRiwAllObatKet,
    setVerifHD,
    setNoMesin,
    setDialsiser,
    insertHeaderHD,
    getHeaderByNoOrder,
    getPreviousHistoryHD,
    noorder,
  } = useContext(PelayananHDContext);
  const { namauser } = useContext(LoginContext);
  const { setLoading } = useContext(ChatContext);
  const { ip, pc } = useContext(PasienContext);
  const [visible, setVisible] = useState(false);

  const onTanggal = (date) => {
    setTanggalHD(date);
    console.log("onTanggal", date);
  };
  const onDialisisKe = (e) => {
    setDialisisKe(e.target.value);
  };
  const onNoMesin = (e) => {
    setNoMesin(e.target.value);
  };
  const radioHandlerDialsiser = (e) => {
    setDialsiser(e);
  };
  const radioHandlerRiwAllObat = (e) => {
    setRiwAllObat(e);
  };
  const onRiwAllObatKet = (e) => {
    setRiwAllObatKet(e.target.value);
  };
  const radioHandlerVerifHD = (e) => {
    setVerifHD(e);
  };
  const onMV = (e) => {
    setVisible(true);
    getHeaderByNoOrder(noorder);
  };
  const onSubmit = (e) => {
    setVisible(false);
    e.preventDefault();
    console.log("dataHeaderHD", dataHeaderHD);
    insertHeaderHD(dataHeaderHD);
  };
  const onCancel = (e) => {
    setVisible(false);
  };
  const dataHeaderHD = {
    dialisisHeaderId: dialisisHeaderId,
    noOrder: noorder,
    RegistrasiId: curpas.registrasiId,
    PasienId: curpas.pasienId,
    Tanggal: tanggalHD,
    RuangId: curpas.ruangId,
    Dialisiske: dialisisKe === null ? null : parseInt(dialisisKe),
    AlergiId: 0,
    RiwAllObat: riwAllObat,
    RiwAllObatKet: riwAllObatKet,
    VerifHd: verifHD,
    NoMesin: noMesin === null ? null : parseInt(noMesin),
    Dialsiser: dialsiser,
    UserId: namauser,
    ClientHost: pc,
    ClientIp: ip,
  };

  return (
    <div>
      <Button type="primary" size="small" onClick={(e) => onMV(e)}>
        Edit
      </Button>
      <Modal
        mask={true}
        style={{ top: 20 }}
        width="1000px"
        visible={visible}
        title="Identitas Pasien"
        onOk={(e) => onSubmit(e)}
        onCancel={(e) => onCancel(e)}
        footer={[
          <Button key="submit" type="primary" onClick={(e) => onSubmit(e)}>
            Simpan
          </Button>,
        ]}
      >
        <PageheadHD />
        <Card>
          <Form>
            <Row gutter={[16, 16]} style={{ marginBottom: 0 }}>
              <Col span={14}>
                <Form.Item
                  {...formItemLayout}
                  label="Tanggal"
                  style={{ marginBottom: 2 }}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    defaultValue={tanggalHD}
                    value={tanggalHD}
                    format={dateFormat}
                    onChange={onTanggal}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Hemodialisis Ke"
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    type="number"
                    min={1}
                    value={dialisisKe}
                    style={{ width: "100%" }}
                    onChange={(e) => onDialisisKe(e)}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Riwayat Alergi Obat"
                  style={{ marginBottom: 2 }}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    value={riwAllObat}
                    onChange={(e) => radioHandlerRiwAllObat(e.target.value)}
                  >
                    <Radio.Button value={true}>Ya</Radio.Button>
                    <Radio.Button value={false}>Tidak</Radio.Button>
                  </Radio.Group>
                  {riwAllObat === true ? (
                    <Input
                      style={{ marginTop: 2 }}
                      value={riwAllObatKet}
                      onChange={(e) => onRiwAllObatKet(e)}
                    />
                  ) : null}
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Telah Setuju Dilakukan Tindakan HD"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    value={verifHD}
                    onChange={(e) => radioHandlerVerifHD(e.target.value)}
                  >
                    <Radio.Button value={true}>Ya</Radio.Button>
                    <Radio.Button value={false}>Tidak</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
              <Col span={10}>
                <Form.Item
                  {...formItemLayout}
                  label="Mesin Nomor"
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    type="number"
                    min={1}
                    value={noMesin}
                    style={{ width: "100%" }}
                    onChange={(e) => onNoMesin(e)}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Dialsiser"
                  style={{ marginBottom: 0 }}
                >
                  <Radio.Group
                    buttonStyle="solid"
                    value={dialsiser}
                    onChange={(e) => radioHandlerDialsiser(e.target.value)}
                  >
                    <Radio.Button value="N">N</Radio.Button>
                    <Radio.Button value="R">R</Radio.Button>
                  </Radio.Group>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default PelayananHD;
