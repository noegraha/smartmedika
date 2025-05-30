import React, { useContext, useState, useEffect } from "react";
import { Layout, Table, Typography, Popconfirm, Button, Modal } from "antd";
import { SnippetsOutlined } from "@ant-design/icons";
import { ESWLContext } from "./context/ESWLContext";
import dayjs from "dayjs";
import DetailHasilESWL from "./DetailHasilESWL";

const { Title } = Typography;

const TabelHasilESWL = (props) => {
  const { eswlhasil, laporanEswlId, getReadEswlHasil } =
    useContext(ESWLContext);

  const [print, setPrint] = useState(false);
  const [detail, setDetail] = useState(false);

  const handleCancel = () => {
    setPrint(false);
    setDetail(false);
  };

  const columns = [
    {
      title: "No Order",
      dataIndex: "NOORDER",
      width: "8%",
      key: "NOORDER",
    },
    {
      title: "No RM",
      dataIndex: "NOPASIEN",
      width: "8%",
      key: "NOPASIEN",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Tanggal Tindakan",
      dataIndex: "TGLTINDAKAN",
      width: "10%",
      key: "TGLTINDAKAN",
      render: (TGLTINDAKAN) => {
        return <p>{dayjs(TGLTINDAKAN).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      title: "Nama Pasien",
      dataIndex: "NAMAPASIEN",
      width: "20%",
      key: "NAMAPASIEN",
      render: (text) => <b>{text}</b>,
    },
    {
      title: "Penjamin",
      dataIndex: `NAMAPT`,
      width: "15%",
      key: "NAMAPT",
    },
    {
      title: "Kelas",
      dataIndex: "NMGRPTRF",
      width: "15%",
      key: "NMGRPTRF",
    },
    {
      title: "Ruang",
      dataIndex: "NAMABAGIAN",
      width: "15%",
      key: "NAMABAGIAN",
    },

    {
      title: "Aksi",
      width: "10%",
      render: (_, record) =>
        eswlhasil.length >= 1 ? (
          <Popconfirm title="Cetak?" onConfirm={() => setPrint(true)}>
            <Button type="danger">Cetak</Button>
          </Popconfirm>
        ) : null,
    },
    {
      title: "Detail",
      width: "10%",
      render: (_, record) =>
        eswlhasil.length >= 1 ? (
          <Popconfirm
            title="Lihat Ringkasan?"
            onConfirm={() => {
              setDetail(true);
              getReadEswlHasil(laporanEswlId);
            }}
          >
            <Button type="primary">Detail</Button>
          </Popconfirm>
        ) : null,
    },
  ];
  return (
    <Layout>
      <Table
        columns={columns}
        dataSource={eswlhasil}
        bordered
        title={() => (
          <Title level={4}>
            <SnippetsOutlined /> Daftar Pasien Selesai Operasi Eswl
          </Title>
        )}
      />
      <Modal
        title="Print Laporan ESWL"
        visible={print}
        onOk={handleCancel}
        onCancel={handleCancel}
        width="45%"
      >
        <iframe
          title="Print ESWL"
          src={`http://dell1r2cd/ReportServer/Pages/ReportViewer.aspx?%2fRJ%2fLaporanESWL&rs:Command=Render&rs:Embed=true&ParameterId=${laporanEswlId}`}
          height="750px"
          width="100%"
        />
      </Modal>
      <Modal
        title="Detail Hasil ESWL"
        centered
        visible={detail}
        onOk={handleCancel}
        onCancel={handleCancel}
        width={1000}
      >
        <DetailHasilESWL />
      </Modal>
    </Layout>
  );
};

export default TabelHasilESWL;
