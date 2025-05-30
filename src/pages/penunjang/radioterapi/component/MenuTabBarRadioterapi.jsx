import { Layout, Menu, Card, Tabs, Row, Col, Input, Button, Modal, Table, Space } from "antd";
import React, { useState } from "react";
import FormAssesmentAwal from "./FormAssesmentAwal";
import FormCobaSatuSehat from "./FormCobaSatuSehat";
import FormDataTPS from "./FormDataTPS";
import FormInformConsent from "./FormInformConsent";
import FormPenyinaran from "./FormPenyinaran";
import FormQcPenyinaran from "./FormQcPenyinaran";
import FormStatusEksternal from "./FormStatusEksternal";
import { EditOutlined, ExclamationCircleTwoTone, SearchOutlined } from "@ant-design/icons";
import { useContext } from "react";
import { RadioterapiContext } from "../context/RadioterapiContext";
import dayjs from "dayjs";
import FormProtokolRadioterapi from "./ProtokolRadioterapi/FormProtokolRadioterapi";
import FormKartuKontrol from "./ProtokolRadioterapi/FormKartuKontrol";
// import { Link } from "react-router-dom";

const { Header } = Layout;
const { TabPane } = Tabs;

const MenuTabBarRadioterapi = () => {
  const {
    stat, sSearch,
    noReg,
    setnoReg,
    pasienId,
    unitId,
    tabKey, settabKey,
    // list
    listTrxPmr,
    // sp
    spGetDokter,
    spTrxPmr,
    // md
    mdListTrxPmr,
    setmdListTrxPmr,
    mdInfoUpdate, setmdInfoUpdate,
    // func
    getListTrxpmr,
    getDataTidakOrder,
    getListOrder,
    getLoadDokter,
    getLoadRadiografer,
    getRiwayatPenyinaran,
  } = useContext(RadioterapiContext)

  const [current, setCurrent] = useState("");

  const columns = [
    {
      title: 'No.Registrasi',
      dataIndex: 'NOREG',
      key: 'NOREG',
      align: "center",
    },
    {
      title: 'Tgl.Pemeriksaan',
      dataIndex: 'TGLPMR',
      key: 'TGLPMR',
      align: "center",
      render: (record) => <div>{dayjs(record).format("DD-MM-YYYY")}</div>,
    },
    {
      title: 'Unit Pelayanan',
      dataIndex: 'NamaRuang',
      key: 'NamaRuang',
      align: "center",
    },
    {
      title: 'Pemeriksaan',
      dataIndex: 'Pemeriksaan',
      key: 'Pemeriksaan',
    },
    {
      title: "Aksi",
      key: "operation",
      fixed: "right",
      align: "center",
      width: 50,
      render: (text, record, index) => (
        <Space size="small">
          <Button
            onClick={() => klikEdit(index)}
            type="primary"
            icon={<EditOutlined />}
            // disabled={record.StsDatang}
            size="small"
          />
        </Space>
      ),
    },
  ];

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const klikSearch = () => {
    if (noReg.length !== 10) {
      Modal.warning({
        title: "Peringatan!",
        content: "No Registrasi belum sesuai!",
      });
    }
    else if (!unitId || unitId.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "Ruang Id belum sesuai!",
      });
    }
    else {
      console.log('klikSearch : ', noReg);
      getListTrxpmr(noReg, unitId)
    }
  };

  const klikEdit = (index) => {
    console.log('klikEdit : ', index);
    getDataTidakOrder(listTrxPmr[index].NOREG, dayjs(listTrxPmr[index].TGLPMR).format('YYYY-MM-DD'), unitId)
  };

  const klikOkMdUpdate = () => {
    // getListOrder(dayjs().format("YYYY-MM-DD"), unitId, stat, sSearch);
    getLoadDokter("1, 2", "9404");
    getLoadRadiografer("7", "9404");
    setmdInfoUpdate(false)
  };

  // settingan info update otomatis
  const updateDate = '2025-03-12';
  const today = dayjs();
  // const today = dayjs('2024-09-06');
  const daysDifference = today.diff(dayjs(updateDate), 'day');

  return (
    <div>
      <Card>
        <Row style={{ marginBottom: '5px' }}>
          <Col span={3}>
            No.Registrasi :
          </Col>
          <Col span={6}>
            <Input.Group compact>
              <Input
                value={noReg}
                onChange={(e) => setnoReg(e.target.value)}
                placeholder="No Registrasi"
                size='small'
                maxLength={10}
                style={{ width: '65%' }} />
              <Button
                onClick={() => klikSearch()}
                loading={spGetDokter}
                type="primary"
                size="small">
                <SearchOutlined />
              </Button>
            </Input.Group>
          </Col>
        </Row>
        <Tabs
          // defaultActiveKey="5"
          activeKey={tabKey}
          onChange={(e) => {
            settabKey(e);
            if (e === '9') {
              getRiwayatPenyinaran(pasienId);
            }
          }}
          size='small'
          type='card'>
          {/* <TabPane
            tab="Assesment Awal"
            key="2"
          // disabled
          >
            <FormAssesmentAwal />
          </TabPane> */}
          <TabPane tab="Penyinaran" key="5">
            <FormPenyinaran />
          </TabPane>
          {/* <TabPane tab="Status Eksterna" key="8">
            <FormProtokolRadioterapi />
          </TabPane> */}
          <TabPane tab="Riwayat Penyinaran" key="9">
            <FormKartuKontrol />
          </TabPane>
          {/* <TabPane tab="Status Eksterna" key="3" disabled={!noReg}>
            <FormStatusEksternal />
          </TabPane> */}
          {/* <TabPane tab="Inform Consent" key="1" disabled>
            <FormInformConsent />
          </TabPane>
          <TabPane tab="Treatment Planning System (TPS)" key="4" disabled>
            <FormDataTPS />
          </TabPane>
          <TabPane tab="QC Penyinaran" key="6" disabled>
            <FormQcPenyinaran />
          </TabPane> */}
          {/* <TabPane tab="Briging SATUSEHAT" key="7" disabled>
            <FormCobaSatuSehat />
          </TabPane> */}
        </Tabs>
      </Card>

      <Modal title="Daftar Transaksi Radioterapi"
        open={mdListTrxPmr}
        // onOk={handleOk}
        onCancel={() => setmdListTrxPmr(false)}
        closable={false}
        footer={null}
        width={800}
      >
        <Table
          columns={columns}
          dataSource={listTrxPmr}
          loading={spTrxPmr}
          bordered
          pagination={false}
          size='small'
        />
        <Row>
          <Col span={24}>
            <span><i>*&#41; Pilih salah satu saja untuk mengisi Data Penyinaran Radioterapi</i></span>
          </Col>
        </Row>
      </Modal>

      <Modal
        // title="Informasi Update"
        visible={mdInfoUpdate}
        closable={false}
        footer={null}
        width={1000}
        style={{ top: 100 }}
      >
        <Card
          title='Informasi Update'
          headStyle={{ backgroundColor: '#91caff' }}>
          <h3 style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 12-03-2025</h3>
          <ul style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}>
            <li>Penambahan inputan <b>Pilihan Status Eksterna</b> yang digunakan pada form Laporan Penyinaran, sebagai acuan penyinaran dan syarat klaim BPJS. Status Eksterna wajib diisi.</li>
          </ul>
          <h3 style={{ color: today.diff(dayjs('2024-05-13'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-05-13'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 13-05-2024</h3>
          <ul style={{ color: today.diff(dayjs('2024-05-13'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-05-13'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
            <li>Penambahan <b>Indikator Warna</b> untuk membedakan <b>Modalitas Penyinaran</b></li>
            <li>Penambahan Informasi <b>Modalitas Penyinaran</b> pada tabel pasien pelayanan Radioterapi yang bisa diurutkan sesuai Modalitas, geser scroll bar ke kanan untuk melihat kolom tersebut.</li>
          </ul>
          <h3 style={{ color: today.diff(dayjs('2023-05-25'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2023-05-25'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 25-05-2023</h3>
          <ul style={{ color: today.diff(dayjs('2023-05-25'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2023-05-25'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
            <li>Perubahan tampilan <b>Identitas Pasien</b> dengan detail pasien yang tersembunyi.
            </li>
            <li>Penambahan fitur lihat hasil <b>Radiologi</b> di bagian kanan atas form <b>Identitas Pasien</b>.
            </li>
          </ul>
        </Card>
        <Row style={{ marginTop: '5px' }}>
          <Col span={24}>
            <Button
              onClick={() => klikOkMdUpdate()}
              type='primary'
              style={{ float: 'right', width: '100px' }}>
              OK
            </Button>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default MenuTabBarRadioterapi;
