import { Button, Space, Table } from "antd";
import React, { useContext } from "react";
import { MasterWilayahContext } from "../context/masterwilayah/MasterWilayahContext";

const MasterKecamatan = () => {
  const { kecamatanList } = useContext(MasterWilayahContext);
  const columns = [
    {
      title: "ID Kecamatan",
      dataIndex: "kecamatanId",
      key: "provinsiId",
    },
    {
      title: "Nama Provinsi",
      dataIndex: ["kabupaten", "provinsi", "provinsiNama"],
      key: "provinsiNama",
    },
    {
      title: "Nama Kabupaten",
      dataIndex: ["kabupaten", "kabupatenNama"],
      key: "kabupatenNama",
    },
    {
      title: "Nama Kecamatan",
      dataIndex: "kecamatanNama",
      key: "kecamatanNama",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Space size="small">
          <Button size="small" type="primary">
            Edit
          </Button>
          <Button size="small" danger type="primary">
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Table
        dataSource={kecamatanList}
        columns={columns}
        size="small"
        title={() => (
          <div style={{ fontSize: 18, fontWeight: "bold" }}>
            Master Kecamatan
          </div>
        )}
      />
    </div>
  );
};

export default MasterKecamatan;
