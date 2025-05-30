import React, { Fragment, useContext, useState } from "react";
import {
  Table,
  Input,
  InputNumber,
  Button,
  Tag,
  Tooltip,
  Empty,
  Typography,
  Switch,
  Space,
  Card,
  Form,
  Row,
  Col,
  DatePicker,
  Radio,
} from "antd";
// import { setTimeout } from "core-js";
import { ChatContext } from "../../chat/Chatcontext";
import { UndoOutlined } from "@ant-design/icons";
import Modal from "antd/lib/modal/Modal";
import PageheadHD from "./PageheadHD";
import { PasienHDContext } from "./context/PasienHDContext";
import { PelayananHDContext } from "./context/PelayananHDContext";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
// import PelayananHD from "./komponen/PelayananHD";

const { Search } = Input;
const { Text } = Typography;
const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};

const TabelPasienHD = () => {
  const {
    pasienHD,
    cariPasienHDNama,
    ruangasal,
    detailPasien,
    setLebar,
    cariPasienHD,
    setRefresh,
    curpas
  } = useContext(PasienHDContext);
  const {
    dialisisHeaderId,
    prevHistory,
    tanggalHD,
    dialisisKe,
    alergiId,
    riwAllObat,
    riwAllObatKet,
    verifHD,
    noMesin,
    dialsiser,
    setTanggalHD,
    setDialisisKe,
    setAlergiId,
    setRiwAllObat,
    setRiwAllObatKet,
    setVerifHD,
    setNoMesin,
    setDialsiser,
    insertHeaderHD,
    getHeaderByNoOrder,
    getPreviousHistoryHD,
    noorder
  } = useContext(PelayananHDContext);
  const dateFormat = "DD-MM-YYYY";
  const { namauser } = useContext(LoginContext);
  const { setLoading } = useContext(ChatContext);
  const { ip, pc } = useContext(PasienContext);

  const [visible, setVisible] = useState(false);
  const [pilih, setPilih] = useState(false);
  const [lebarnama, setLebarNama] = useState("120px");
  // const [tinggi, setTinggi] = useState(390);
  // const onTinggi = (e) => {
  //   e === true ? setTinggi(700) : setTinggi(390)
  // }
  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("180px") : setLebarNama("120px");
  };
  const handleClick = (props, id, noOrder) => {
    detailPasien(props);
    console.log("Tabel Pasien HD props : ", props);
    console.log("Tabel Pasien HD id : ", id);
    console.log("Tabel Pasien HD noOrder : ", noOrder);
    getHeaderByNoOrder(noOrder);
    // getPreviousHistoryHD(id);
    setPilih(props);
    // setTabkey("1");
    sessionStorage.setItem("noreg", props);
    sessionStorage.setItem("norm", id);
    setLoading(true);
    setVisible(true);
  };
  const handleCari = (e) => {
    cariPasienHDNama(e);
    console.log(e);
  };
  const onHide = (e) => {
    // setMode(e);
    console.log(e);
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
  const onPreviousHistoryHD = (e) => {
    getPreviousHistoryHD(curpas.pasienId);
  };

  const columns = [
    {
      title: "No",
      key: "no",
      width: "35px",
      fixed: "left",
      defaultSortOrder: "ascend",
      sorter: (a, b) => a.orderId - b.orderId,
      render: (pasienHD) => (
        <div>
          {pasienHD.verified ? (
            <Tooltip title="Sudah ditandatangan Dokter" placement="leftTop">
              <Tag color="cyan">{pasienHD.orderId}</Tag>
            </Tooltip>
          ) : (
            <Tooltip>
              <Tag color="default">{pasienHD.orderId}</Tag>
            </Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "No Reg",
      width: "90px",
      fixed: "left",
      render: (pasienHD) => (
        <span className="fontkecil">
          {pasienHD.ruangKonsul !== null ? (
            pasienHD.ruangKonsul === ruangasal &&
              pasienHD.ruangId !== ruangasal ? (
              <Tooltip title="Konsultasi perlu dijawab">
                <Tag color="magenta">{pasienHD.registrasiId}</Tag>
              </Tooltip>
            ) : pasienHD.ruangKonsul === ruangasal &&
              pasienHD.ruangId === ruangasal ? (
              <Tooltip title="Konsultasi sudah dijawab">
                <Tag color="green">{pasienHD.registrasiId}</Tag>
              </Tooltip>
            ) : pasienHD.ruangKonsul !== ruangasal &&
              pasienHD.ruangId === ruangasal ? (
              <Tooltip title="Konsultasi belum dijawab">
                <Tag color="orange">{pasienHD.registrasiId}</Tag>
              </Tooltip>
            ) : (
              <Tag>{pasienHD.registrasiId}</Tag>
            )
          ) : (
            <Tag>{pasienHD.registrasiId}</Tag>
          )}
        </span>
      ),
    },
    {
      title: "Nama",
      width: lebarnama,
      render: (pasienHD) => (
        <div>
          <Button
            style={{
              fontSize: 11,
              padding: 0,
              textAlign: "left",
              whiteSpace: "normal",
              height: "auto",
            }}
            type={pilih === pasienHD.registrasiId ? "primary" : "link"}
            size="small"
            onClick={() =>
              handleClick(
                pasienHD.registrasiId,
                pasienHD.pasienId,
                pasienHD.noOrder
              )
            }
          >
            {pasienHD.namaPasien}
          </Button>
        </div>
      ),
    },
    {
      title: "No Pasien",
      width: "80px",
      render: (pasienHD) => (
        <Text style={{ fontSize: 12 }}>{pasienHD.pasienId}</Text>
      ),
    },
    {
      title: "DPJP",
      width: "250px",
      render: (pasienHD) => (
        <Text style={{ fontSize: 12 }}>{pasienHD.namaDPJP}</Text>
      ),
    },
  ];

  const onrefresh = () => {
    cariPasienHD();
    setRefresh(true);
  };

  return (
    <Fragment>
      <Search
        placeholder="Cari Nama / No Pasien / No Registrasi"
        onChange={(e) => handleCari(e.target.value)}
      />
      <Table
        columns={columns}
        dataSource={pasienHD}
        size="small"
        scroll={{ x: 300, y: 400 }}
        // pagination={{ pageSize: 50 }}
        pagination={false}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Silahkan Refresh Terlebih Dahulu"}
            />
          ),
        }}
        footer={() => (
          <div>
            <Space>
              {/* <Switch onChange={onTinggi} /> */}
              Atur Lebar :
              <Switch
                onChange={onLebar}
                checkedChildren="Max"
                unCheckedChildren="Min"
              />
              Atur Tab :
              <Switch
                onChange={(e) => onHide(e)}
                checkedChildren="Top"
                unCheckedChildren="Left"
                defaultChecked
              />
            </Space>
            <br />
            <Button
              size="small"
              type="primary"
              onClick={onrefresh}
              shape="round"
            >
              <UndoOutlined />
              Refresh
            </Button>
          </div>
        )}
      />
      {dialisisHeaderId === 0 ?
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
                      style={{ width: "70%" }}
                      defaultValue={tanggalHD}
                      value={tanggalHD}
                      format={dateFormat}
                      onChange={onTanggal}
                    />
                    <Button
                      style={{ width: "30%" }}
                      onClick={(e) => onPreviousHistoryHD(e)}
                    >
                      Ambil Riwayat
                    </Button>
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
                    {riwAllObat === true ?
                      <Input style={{ marginTop: 2 }}
                        value={riwAllObatKet}
                        onChange={(e) => onRiwAllObatKet(e)} />
                      :
                      null
                    }
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
        : null}
    </Fragment>
  );
};

export default TabelPasienHD;
