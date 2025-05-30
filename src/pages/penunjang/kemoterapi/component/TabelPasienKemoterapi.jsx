import React, { Fragment, useContext, useState } from "react";
import {
  Table,
  Input,
  Button,
  Tag,
  Tooltip,
  Empty,
  Typography,
  Switch,
  Space,
  Modal,
  Row,
  Col,
} from "antd";
import { UndoOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import { KemoterapiContext } from "../context/KemoterapiContext";
import '../style/style.css';

const { Search } = Input;
const { Text } = Typography;

const TabelPasienKemoterapi = () => {
  const {
    setLebar,
  } = useContext(PasienContext);

  const {
    tglOrder,
    unitId,
    jnsRawat,
    sSearch, setsSearch,
    listPasien,
    setnoReg,
    // spin
    spTabelPasien,
    // func
    getListOrder,
    getDataPasien,
    getProtokolKemo,
  } = useContext(KemoterapiContext)

  const [lebarnama, setLebarNama] = useState("120px");
  const [mdketwarna, setmdketwarna] = useState(false)

  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("180px") : setLebarNama("120px");
  };

  const columns = [
    {
      title: "No",
      dataIndex: "NOURUT",
      key: "NOURUT",
      align: "center",
      width: "35px",
      sorter: (a, b) => a.NOURUT - b.NOURUT,
    },
    {
      title: "No Reg",
      dataIndex: "NOREG",
      key: "NOREG",
      align: "center",
      width: "75px",
      sorter: (a, b) => a.NOREG - b.NOREG,
      render: (text, record) => {
        const backgroundColor = !record.ProtokolId ? '#ff7875' :
          null;
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
      },
      // render: (_, record) => (
      //   <div>
      //     {record.UNITORDER.match(/^91.*$/) ? record.NOREG : <Tag color="magenta">{record.NOREG}</Tag>}
      //   </div>
      // ),
    },
    {
      title: "Nama Pasien",
      dataIndex: "NAMAPASIEN",
      key: "NAMAPASIEN",
      align: "center",
      width: "200px",
      sorter: (a, b) => a.NAMAPASIEN.localeCompare(b.NAMAPASIEN),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "No RM",
      dataIndex: "NOPASIEN",
      key: "NOPASIEN",
      align: "center",
      width: "65px",
    },
    // {
    //   title: "Tgl Lahir",
    //   dataIndex: "TGLLAHIR",
    //   key: "TGLLAHIR",
    //   align: "center",
    //   width: "75px",
    //   render: (record) => <div>{dayjs(record).format("DD/MM/YYYY")}</div>,
    // },
    {
      title: "Ruang",
      dataIndex: "RUANG",
      key: "RUANG",
      align: "left",
      width: "200px",
      ellipsis: true,
      sorter: (a, b) => a.RUANG.localeCompare(b.RUANG),
      render: (ruang) => (
        <Tooltip placement="topLeft" title={ruang}>
          {ruang}
        </Tooltip>
      ),
      // render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
    },
    {
      title: "Alamat Pasien",
      dataIndex: "ALAMAT",
      key: "ALAMAT",
      align: "left",
      width: "200px",
      ellipsis: true,
      render: (alamat) => (
        <Tooltip placement="topLeft" title={alamat}>
          {alamat}
        </Tooltip>
      ),
    },
    {
      title: "Penjamin",
      dataIndex: "NAMAPT",
      key: "NAMAPT",
      align: "center",
      width: "100px",
      ellipsis: true,
      sorter: (a, b) => a.NAMAPT.localeCompare(b.NAMAPT),
      render: (penjamin) => (
        <Tooltip placement="topLeft" title={penjamin}>
          <div style={{ textAlign: "left" }}>{penjamin}</div>
        </Tooltip>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      NOREG: "2110150001",
      NAMAPASIEN: "DAIMATUL HASANAH, NY",
      NOPASIEN: "02170129",
      TGLLAHIR: "2021-10-21T00:00:00",
      RUANG: "KLINIK HEMATOLOGI ONKOLOGI ANAK - RSMS",
      ALAMAT: "ALAMAT PASIEN ALAMAT PASIEN ALAMAT PASIEN",
      NAMAPT: "BPJS NON PBI",
    });
  }

  const onSearch = () => {
    if (sSearch.length < 6) {
      Modal.warning({
        title: "Peringatan!",
        content: "Search registrasi harus lebih dari 6 angka.",
      });
    } else {
      getListOrder(dayjs(tglOrder).format("YYYY-MM-DD"), unitId, "2", sSearch, jnsRawat);
    }
  };

  const onrefresh = () => {
    setsSearch("");
    getListOrder(dayjs(tglOrder).format("YYYY-MM-DD"), unitId, "2", "%20", jnsRawat);
  };

  const klikKetWarna = () => {
    setmdketwarna(true)
  }

  return (
    <div>
      <Search
        type="number"
        value={sSearch}
        placeholder="Cari No Registrasi"
        onChange={(e) => setsSearch(e.target.value)}
        onSearch={() => onSearch()}
        style={{ marginBottom: "3px" }}
      />

      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              setnoReg(record.NOREG);
              getDataPasien(record.NOREG, record.NOORDER);
              // getProtokolKemo(record.NOPASIEN);
              getProtokolKemo(record.NOREG);
            },
          };
        }}
        rowClassName={(record, index) =>
          record.IDLAPORAN === null && record.IMPLEMENTASI === 0 ? "-" :
            record.IDLAPORAN !== null && record.IMPLEMENTASI === 0 ? "id_not_null" :
              "imp_not_null"
        }
        style={{ maxHeight: 570 }}
        columns={columns}
        dataSource={listPasien}
        loading={spTabelPasien}
        size="small"
        scroll={{ x: 300, y: "59vh" }}
        pagination={false}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Silahkan Pilih Ruangan Terlebih Dahulu"}
            />
          ),
        }}
        footer={() => (
          <div>
            <Space style={{ marginBottom: '5px' }}>
              Atur Lebar :
              <Switch
                onChange={onLebar}
                checkedChildren="Max"
                unCheckedChildren="Min"
              />
              <Button
                size="small"
                type="primary"
                disabled={!jnsRawat}
                onClick={onrefresh}
                style={{ backgroundColor: "forestgreen", borderColor: "green" }}
              >
                <UndoOutlined />
                Refresh Pasien
              </Button>
            </Space>
            <br />
            <span>
              <Button
                size="small"
                onClick={() => klikKetWarna()}
                style={{ width: '100%', backgroundColor: '#f759ab' }}
              >
                <b>KETERANGAN WARNA</b>
              </Button>
            </span>
          </div>
        )}
      />

      <Modal
        title={<u>Keterangan Warna pada List Pasien Kemoterapi :</u>}
        open={mdketwarna}
        onCancel={() => setmdketwarna(false)}
        footer={null}
        width={790}
      >
        <Row style={{ marginBottom: '2px' }}>
          <Col span={4} style={{ backgroundColor: "#ffffff", border: "1px solid #595959" }}>
          </Col>
          <Col span={20}>
            <span style={{ marginLeft: '5px' }}>
              <b>: Belum Entry </b>
            </span>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={4} style={{ backgroundColor: "#ffec3d", border: "1px solid #595959" }}>
          </Col>
          <Col span={20}>
            <span style={{ marginLeft: '5px' }}>
              <b>: Implementasi masih kosong</b>
            </span>
          </Col>
        </Row>
        <Row style={{ marginBottom: '2px' }}>
          <Col span={4} style={{ backgroundColor: "#73d13d", border: "1px solid #595959" }}>
          </Col>
          <Col span={20}>
            <span style={{ marginLeft: '5px' }}>
              <b>: Entry Selesai</b>
            </span>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default TabelPasienKemoterapi;
