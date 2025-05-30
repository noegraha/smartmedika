import { Button, Space, Table } from "antd";
import React, { useContext } from "react";
import { MasterWilayahContext } from "../context/masterwilayah/MasterWilayahContext";

const MasterKabupaten = () => {
  const { kabupatenList } = useContext(MasterWilayahContext);
  const columns = [
    {
      title: "ID Kabupaten",
      dataIndex: "kabupatenId",
      key: "kabupatenId",
    },
    {
      title: "Nama Provinsi",
      dataIndex: ["provinsi", "provinsiNama"],
      key: "provinsiNama",
    },
    {
      title: "Nama Kabupaten",
      dataIndex: "kabupatenNama",
      key: "kabupatenNama",
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
        dataSource={kabupatenList}
        columns={columns}
        size="small"
        title={() => (
          <div style={{ fontSize: 18, fontWeight: "bold" }}>
            Master Kabupaten
          </div>
        )}
      />
    </div>
  );
};

export default MasterKabupaten;
