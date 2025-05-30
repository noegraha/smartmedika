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
} from "antd";
import { UndoOutlined, SoundOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import { RadioterapiContext } from "../context/RadioterapiContext";
import "../style/style.css";

const { Search } = Input;
const { Text } = Typography;

const TabelPasienRadioterapi = () => {
  const {
    cariPasien,
    setLebar,
    detailPasien,
    // getPasienDetail,
  } = useContext(PasienContext);

  const {
    //state
    listPasien,
    unitId,
    tglOrder,
    sSearch,
    setsSearch,
    //ident pasien
    setnoReg,
    //func
    getListOrder,
    getDataPasiendanStatusRd,
    getTTV,
    getTTVPenunjang,
    //spin
    spTabelPasien,
  } = useContext(RadioterapiContext);

  const [pilih, setPilih] = useState(false);
  const [lebarnama, setLebarNama] = useState("120px");

  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("180px") : setLebarNama("120px");
  };

  const handleClick = (props, id) => {
    setPilih(props);
    sessionStorage.setItem("noreg", props);
    sessionStorage.setItem("norm", id);
  };

  const handleCari = (e) => {
    cariPasien(e);
    // console.log(e);
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
        const backgroundColor = record.PENYINARAN === 'Linac' ? '#ff7875' :
          record.PENYINARAN === 'Cobalt 1' ? '#ffd666' :
            record.PENYINARAN === 'Cobalt 2' ? '#5cdbd3' :
              record.PENYINARAN === 'Brakhiterapi' ? '#b37feb' :
                null;
        return {
          props: {
            style: { backgroundColor: backgroundColor },
          },
          children: (
            <Tooltip
              title={record.PENYINARAN}
              color={backgroundColor}
              key={backgroundColor}
            >
              <span>{text}</span>
            </Tooltip>
          ),
        };
      },
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
    {
      title: "Modalitas",
      dataIndex: "PENYINARAN",
      key: "PENYINARAN",
      align: "center",
      width: "75px",
      sorter: (a, b) => {
        // Penanganan nilai null
        if (a.PENYINARAN === null && b.PENYINARAN === null) {
          return 0; // Nilai sama
        }
        if (a.PENYINARAN === null) {
          return -1; // a dianggap lebih kecil
        }
        if (b.PENYINARAN === null) {
          return 1; // b dianggap lebih kecil
        }

        // Membandingkan menggunakan localeCompare
        return a.PENYINARAN.localeCompare(b.PENYINARAN);
      },
    },
    {
      title: "Tgl Lahir",
      dataIndex: "TGLLAHIR",
      key: "TGLLAHIR",
      align: "center",
      width: "75px",
      render: (record) => <div>{dayjs(record).format("DD/MM/YYYY")}</div>,
    },
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
      RegistrasiId: "2110150001",
      Nama: "DAIMATUL HASANAH, NY",
      PasienId: "02170129",
      TglLahir: "2021-10-21T00:00:00",
      Ruang: "KLINIK HEMATOLOGI ONKOLOGI ANAK - RSMS",
      Alamat: "ALAMAT PASIEN ALAMAT PASIEN ALAMAT PASIEN",
      Penjamin: "BPJS NON PBI",
    });
  }

  const onSearch = () => {
    if (sSearch.length < 6) {
      Modal.warning({
        title: "Peringatan!",
        content: "Search registrasi harus lebih dari 6 angka.",
      });
    } else {
      getListOrder(dayjs(tglOrder).format("YYYY-MM-DD"), unitId, "2", sSearch);
    }
  };

  const onrefresh = () => {
    setsSearch("");
    getListOrder(dayjs(tglOrder).format("YYYY-MM-DD"), unitId, "2", "%20");
  };

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
              getDataPasiendanStatusRd(record.NOREG);
              sessionStorage.setItem("norm", record.NOPASIEN);
              detailPasien(record.NOREG);
              // getTTV(record.NOREG);
              // getTTVPenunjang(record.NOREG, unitId);
            },
          };
        }}
        rowClassName={(record, index) =>
          record.JmlLapangan !== null && record.JmlLapangan === record.Jumlah ? "pasien_datang" : "-"
        }
        style={{ maxHeight: 570 }}
        columns={columns}
        dataSource={listPasien}
        loading={spTabelPasien}
        size="small"
        scroll={{ x: 300, y: "60vh" }}
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
            <Space>
              Atur Lebar :
              <Switch
                onChange={onLebar}
                checkedChildren="Max"
                unCheckedChildren="Min"
              />
              <Button
                size="small"
                type="primary"
                onClick={onrefresh}
                style={{ backgroundColor: "forestgreen", borderColor: "green" }}
              >
                <UndoOutlined />
                Refresh Pasien
              </Button>
            </Space>
          </div>
        )}
      />
    </div>
  );
};

export default TabelPasienRadioterapi;
