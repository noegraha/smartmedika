import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  message,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { PasienContext } from "../context/PasienContext";
import { FormOutlined, RedoOutlined } from "@ant-design/icons";
import { PemeriksaanLainContext } from "../context/pemeriksaancontext/PemeriksaanLainContext";
import FormProtokolKemo from "./FormProtokolKemo";
import dayjs from "dayjs";
import { LoginContext } from "../context";

const { Option } = Select;

const FormDashboardKemoterapi = () => {
  const { token, namauser } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const { poli1 } = useContext(PasienContext);
  const {
    tempRegId, settempRegId,
    tempPxId, settempPxId,
    tglDashboard, settglDashboard,
    getDataTerapiKemoterapiPoli,
    getProtokolPasien
  } = useContext(PemeriksaanLainContext);

  const ipEndpoint = sessionStorage.getItem("apiPenunjang");
  const endpoint = ipEndpoint;

  const [listpasien, setListPasien] = useState([]);
  const [tglPelayanan, settglPelayanan] = useState(dayjs());
  const [ruandIdApt, setruandIdApt] = useState();
  const [modal, setModal] = useState(false);
  const [spDashboard, setspDashboard] = useState(false);

  const colTbList = [
    {
      title: 'No',
      align: 'center',
      width: 40,
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'No. Registrasi',
      align: 'center',
      dataIndex: 'NOREG',
      key: 'NOREG',
      width: 90,
      render: (text, record) => {
        const backgroundColor = !record.ProtokolId ? "#ff7875" : null;
        return {
          props: {
            style: { backgroundColor: backgroundColor },
          },
          children: !record.ProtokolId ? (
            <Tooltip
              title="Protokol Kemoterapi Kosong"
              color={backgroundColor}
              key={backgroundColor}
            >
              <span>{text}</span>
            </Tooltip>
          ) : (
            <span>{text}</span>
          ),
        };
      }
    },
    {
      title: 'Nama Pasien',
      // align: 'center',
      dataIndex: 'NamaPasien',
      key: 'NamaPasien',
      // width: 90,
    },
    {
      title: "DPJP",
      dataIndex: "NamaDPJP",
      key: "NamaDPJP",
      // align: "center",
    },
    {
      title: "Alamat",
      dataIndex: "Alamat",
      key: "Alamat",
      // align: "center",
    },
    {
      title: "Aksi",
      align: "center",
      width: 50,
      render: (text, record, index) => (
        <Button
          size="small"
          onClick={() => {
            setModal(true);
            getDataTerapiKemoterapiPoli(record.NOREG, poli1);
            getProtokolPasien(record.NOREG);
            settempRegId(record.NOREG);
            settempPxId(record.PasienId);
          }}
          type="primary"
          icon={<FormOutlined />}
        />
      )
    },
  ];

  const getListPasien = (tgl, apotik) => {
    // console.log(poli1);
    setspDashboard(true);
    axios
      .get(
        `${endpoint}/EmrKemoterapi/GetListAdmProtokol/${tgl}/v/3/${apotik}/${poli1}`,
        options
      )
      .then((res) => {
        console.log(res.data);
        setspDashboard(false);
        if (res.data.statusCode === 200) {
          setListPasien(res.data.result.result);
        } else {
          setListPasien([]);
          console.log(res.data);

          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data! -> ${res.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspDashboard(false);
        setListPasien([]);
        console.log(err);

        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data! -> ${err}`,
        });
      });
  };

  const onTanggal = (date) => {
    settglDashboard(dayjs(date));
    // getListPasien(dayjs(date).format('YYYY-MM-DD'));
    // console.log('onTanggal : ', date);
  };

  return (
    <div>
      <Card>
        <Divider orientation="left" orientationMargin="0">
          Daftar Kelengkapan Protokol Kemoterapi :
        </Divider>

        <Spin
          spinning={spDashboard}
          tip="Loading... 😁"
        >
          <Card bodyStyle={{ padding: '5px' }}>
            <Row style={{ marginBottom: '5px', }}>
              <Col span={2}>
                <span>Pilih Tanggal : </span>
              </Col>
              <Col span={22}>
                <DatePicker
                  value={tglDashboard}
                  onChange={(e) => onTanggal(e)}
                  style={{ width: '25%' }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
              <Col span={2}>
                <span>Pilih Apotik : </span>
              </Col>
              <Col span={22}>
                <Select
                  style={{ width: "25%" }}
                  placeholder="..."
                  value={ruandIdApt}
                  onChange={(e) => setruandIdApt(e)}
                >
                  <Option key="A" value="9214">
                    APOTIK RAWAT JALAN - RSMS
                  </Option>
                  <Option key="B" value="9251">
                    APOTIK RAWAT JALAN - ABIYASA
                  </Option>
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={2}>
              </Col>
              <Col span={22}>
                <Button
                  type="primary"
                  icon={<RedoOutlined />}
                  onClick={() => getListPasien(dayjs(tglDashboard).format('YYYY-MM-DD'), ruandIdApt)}
                  disabled={tglDashboard && ruandIdApt ? false : true}
                // style={{ float: 'right' }}
                >
                  Lihat Data
                </Button>
              </Col>
            </Row>
          </Card>

          <Table
            bordered
            dataSource={listpasien}
            pagination={false}
            columns={colTbList}
            size="small"
            style={{ marginTop: '5px' }}
          // scroll={{ y: 800 }}
          />
        </Spin>
      </Card>

      <Modal
        open={modal}
        onCancel={() => {
          setModal(false);
          getListPasien(dayjs(tglDashboard).format('YYYY-MM-DD'));
        }}
        onOk={() => setModal(false)}
        footer={null}
        width="80%"
      >
        <FormProtokolKemo />
      </Modal>
    </div >
  );
};

export default FormDashboardKemoterapi;
