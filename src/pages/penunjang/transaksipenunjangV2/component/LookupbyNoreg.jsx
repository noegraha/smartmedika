import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Space,
  Select,
  Tooltip,
  Input,
  Table,
  Button,
  message,
  Row,
  Col,
} from "antd";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import dayjs from "dayjs";

const { Option } = Select;

const LookupbyNoreg = () => {
  const {
    listLookupReg,
    unitId,
    noTransaksi,
    setNoTransaksi,
    LookupPemeriksaan,
    getbyNoReg,
    // disable
    setdisNoTransaksi,
    // modal
    setmdLookupRegistrasi,
    // spin
    spinAll,
  } = useContext(TransaksiPenunjangContext);

  const [sorter, setSorter] = useState("1");
  const [listTabel, setListTabel] = useState(listLookupReg);
  const [sSearch, setsSearch] = useState("");
  const [page, setpage] = useState(1);

  const columns = [
    {
      title: "No Reg.",
      dataIndex: "registrasiId",
      key: "registrasiId",
      align: "center",
      width: "80px",
      sorter: (a, b) => a.registrasiId - b.registrasiId,
    },
    {
      title: "No Pasien",
      dataIndex: "pasienId",
      key: "pasienId",
      align: "center",
      width: "80px",
      sorter: (a, b) => a.pasienId - b.pasienId,
    },
    {
      title: "Nama Pasien",
      dataIndex: "namaPasien",
      key: "namaPasien",
      align: "center",
      width: "300px",
      sorter: (a, b) => a.namaPasien.localeCompare(b.namaPasien),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Alamat Pasien",
      dataIndex: "alamat",
      key: "alamat",
      align: "center",
      width: "300px",
      sorter: (a, b) => a.alamat.localeCompare(b.alamat),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Unit Sekarang",
      dataIndex: "ruangDeskripsi",
      key: "ruangDeskripsi",
      align: "center",
      width: "200px",
      sorter: (a, b) => a.ruangDeskripsi.localeCompare(b.ruangDeskripsi),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Unit Daftar",
      dataIndex: "deskRuangIdDaftar",
      key: "deskRuangIdDaftar",
      align: "center",
      width: "200px",
      sorter: (a, b) => a.deskRuangIdDaftar.localeCompare(b.deskRuangIdDaftar),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Dokter",
      dataIndex: "namaDPJP",
      key: "namaDPJP",
      align: "center",
      width: "200px",
      sorter: (a, b) => a.namaDPJP.localeCompare(b.namaDPJP),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Tgl Pendaftaran",
      dataIndex: "tanggalMasuk",
      key: "tanggalMasuk",
      align: "center",
      width: "90px",
      // sorter: (a, b) => a.Deskripsi.localeCompare(b.Deskripsi),
      render: (text) => <div>{dayjs(text).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Tlp. Pasien",
      dataIndex: "noTelp",
      key: "noTelp",
      align: "center",
      width: "90px",
      // sorter: (a, b) => a.Deskripsi.localeCompare(b.Deskripsi),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "No Asuransi",
      dataIndex: "noPolish",
      key: "noPolish",
      align: "center",
      width: "90px",
      // sorter: (a, b) => a.Deskripsi.localeCompare(b.Deskripsi),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
  ];

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      registrasiId: "2110100000",
      pasienId: "00000000",
      namaPasien: "nama pasien nama pasien nama pasien",
      alamat: "alamat pasien alamat pasien alamat pasien alamat pasien",
      ruangDeskripsi: "Klinik Bedah Saraf - RSMS",
      deskRuangIdDaftar: "Klinik Bedah Saraf - RSMS",
      namaDPJP: "nama dokter nama dokter nama dokter",
      tanggalMasuk: "12/10/2021",
      noTelp: "085123456789",
      noPolish: "0123456789012",
    });
  }

  const rstDefault = () => {
    setSorter("1");
    setsSearch("");
    setpage(1);
  };

  const changeSearch = (e) => {
    setsSearch(e);
    if (sorter === "1") {
      let temp = listLookupReg.filter((a) =>
        a.registrasiId.toLowerCase().includes(e.toLowerCase())
      );
      setListTabel(temp);
    }
    if (sorter === "2") {
      let temp = listLookupReg.filter((a) =>
        a.pasienId.toLowerCase().includes(e.toLowerCase())
      );
      setListTabel(temp);
    }
    if (sorter === "3") {
      let temp = listLookupReg.filter((a) =>
        a.namaPasien.toLowerCase().includes(e.toLowerCase())
      );
      setListTabel(temp);
    }
  };

  const changeSorter = (e) => {
    setSorter(e);
    setsSearch("");
  };

  const klikAmbil = () => {
    if (!noTransaksi || noTransaksi.length < 10) {
      message.error("Pilih Pasien terlebih dahulu!");
    } else {
      setmdLookupRegistrasi(false);
      getbyNoReg(noTransaksi, unitId);
      setdisNoTransaksi(true);
      rstDefault();
    }
  };

  const klikTutup = () => {
    setmdLookupRegistrasi(false);
    rstDefault();
  };

  useEffect(() => {
    setListTabel(listLookupReg);
  }, [listLookupReg]);

  return (
    <div>
      <Card>
        <Space style={{ marginBottom: "5px" }}>
          <Select
            value={sorter}
            onChange={(e) => changeSorter(e)}
            defaultValue="1"
            showSearch
            size="small"
            // disabled
            style={{ width: "200px" }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key="1" value="1">
              No Registrasi
            </Option>
            <Option key="2" value="2">
              No Pasien
            </Option>
            <Option key="3" value="3">
              Nama Pasien
            </Option>
          </Select>
          <Tooltip title="Cari berdasarkan pilihan disebelah kiri">
            <Input
              value={sSearch}
              onChange={(e) => changeSearch(e.target.value)}
              // disabled
              placeholder="..."
              size="small"
              style={{ width: "737px" }}
            />
          </Tooltip>
        </Space>
        <Table
          onRow={(record) => {
            return {
              onClick: () => {
                setNoTransaksi(record.registrasiId);
                console.log("registrasiId : ", noTransaksi);
              },
            };
          }}
          rowClassName={(record) =>
            record.registrasiId === noTransaksi ? "greena" : "non-green"
          }
          dataSource={listTabel}
          columns={columns}
          loading={spinAll}
          bordered
          pagination={{
            size: "small",
            pageSize: 100,
            showSizeChanger: false,
            current: page,
            onChange: (pageNum) => {
              setpage(pageNum);
            },
          }}
          className="RCM_two_level_table1"
          size="small"
          scroll={{ x: 2000, y: 380 }}
          style={{ height: "410px", marginBottom: "10px" }}
        />
        <Row>
          <Col>
            <Space style={{ float: "right" }}>
              <Button
                type="primary"
                onClick={() => klikAmbil()}
                style={{ width: "70px" }}
              >
                Ambil
              </Button>
              <Button onClick={() => klikTutup()} style={{ width: "70px" }}>
                Tutup
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LookupbyNoreg;
