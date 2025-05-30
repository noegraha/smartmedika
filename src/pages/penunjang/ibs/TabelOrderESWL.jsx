import React, { useContext, useState, useEffect } from "react";
import { Layout, Table, Typography, Popconfirm, Button, Modal } from "antd";
import { SnippetsOutlined } from "@ant-design/icons";
import { ESWLContext } from "./context/ESWLContext";
import dayjs from "dayjs";
import FormTindakanESWL from "./FormTindakanESWL";

const { Title } = Typography;
const TabelOrderESWL = () => {
  const { eswlorder, getReadEswlOrder, readeswlorder, tindakan, setTindakan } =
    useContext(ESWLContext);

  //   const [tindakan, setTindakan] = useState(false);

  const handleCancel = () => {
    setTindakan(false);
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
      title: "Tanggal Order",
      dataIndex: "TGLORDER",
      width: "10%",
      key: "TGLORDER",
      render: (TGLORDER) => {
        return <p>{dayjs(TGLORDER).format("DD/MM/YYYY")}</p>;
      },
    },
    {
      title: "Nama Pasien",
      dataIndex: "NAMAPASIEN",
      width: "18%",
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
      width: "13%",
      key: "NMGRPTRF",
    },
    {
      title: "Ruang",
      dataIndex: "NAMABAGIAN",
      width: "12%",
      key: "NAMABAGIAN",
    },
    {
      title: "Status",
      dataIndex: "Hapus",
      width: "8%",
      key: "Hapus",
      render(text, record) {
        return {
          props: {
            style: { background: parseInt(text) === 0 ? "green" : "red" },
          },
          children: <div>{text === 0 ? "sudah" : "belum"}</div>,
        };
      },
    },
    {
      title: "Aksi",
      width: "10%",
      responsive: ["xs", "sm"],
      render: (_, record) => (
        <Popconfirm
          title="Tindakan ESWL?"
          onConfirm={() => {
            setTindakan(true);
            getReadEswlOrder(readeswlorder);
          }}
        >
          <Button type="primary">Tindakan</Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <Layout>
      <Table
        columns={columns}
        dataSource={eswlorder}
        bordered
        title={() => (
          <Title level={4}>
            <SnippetsOutlined /> Daftar Order Pasien Eswl
          </Title>
        )}
      />
      <Modal
        title="Tindakan ESWL"
        centered
        visible={tindakan}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer
        disabled
        width={1200}
      >
        <FormTindakanESWL />
      </Modal>
    </Layout>
  );
};

export default TabelOrderESWL;
