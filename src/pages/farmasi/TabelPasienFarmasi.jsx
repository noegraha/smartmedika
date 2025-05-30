// src/pages/farmasi/TabelPasienFarmasi.jsx
import React, { useContext } from "react";
import { Table } from "antd";
import { FarmasiContext } from "./context/FarmasiContext";

const TabelPasienFarmasi = () => {
  const { curpas, setSelectedPatient } = useContext(FarmasiContext);

  const columns = [
    {
      title: "Nama Pasien",
      dataIndex: "nama",
      key: "nama",
    },
    {
      title: "Nomor Rekam Medis",
      dataIndex: "noRekamMedis",
      key: "noRekamMedis",
    },
    {
      title: "Usia",
      dataIndex: "usia",
      key: "usia",
    },
  ];

  const handleRowClick = (record) => {
    setSelectedPatient(record);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Data Pasien Farmasi</h3>
      <Table
        dataSource={curpas}
        columns={columns}
        rowKey="id"
        onRow={(record) => ({
          onClick: () => handleRowClick(record),
        })}
      />
    </div>
  );
};

export default TabelPasienFarmasi;
