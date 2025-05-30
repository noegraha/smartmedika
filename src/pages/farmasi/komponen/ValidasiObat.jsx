import React, { useState } from "react";
import { Tabs, Table, InputNumber, Select , Space , Button, Input} from "antd";

const { TabPane } = Tabs;
const { Option } = Select;

const ValidasiObatFarmasi = () => {
  const [patenData, setPatenData] = useState([
    {
      key: "1",
      no: 1,
      namaBarang: "Paracetamol",
      hargaBarang: 5000,
      satuan: "Tablet",
      qty: 10,
      aturanPakai: "3x sehari",
    },
  ]);

  const [racikanData, setRacikanData] = useState([
    {
      key: "1",
      jenisRacikan: "Pulveres",
      noRacikan: 1,
      namaObat: "Aspirin",
      dosis: "50 mg",
      qty: 5,
      aturanPakai: "2x sehari",
    },
  ]);

  // Columns for "Obat Resep Paten"
  const patenColumns = [
    { title: "No", dataIndex: "no", key: "no" },
    { title: "Nama Barang", dataIndex: "namaBarang", key: "namaBarang" },
    { title: "Harga Barang", dataIndex: "hargaBarang", key: "hargaBarang" },
    { title: "Satuan", dataIndex: "satuan", key: "satuan" },
    {
      title: "Qty Obat",
      dataIndex: "qty",
      key: "qty",
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.qty}
          onChange={(value) =>
            handlePatenChange(record.key, "qty", value)
          }
        />
      ),
    },
    {
      title: "Aturan Pakai",
      dataIndex: "aturanPakai",
      key: "aturanPakai",
      render: (text, record) => (
        <Select
          value={record.aturanPakai}
          onChange={(value) =>
            handlePatenChange(record.key, "aturanPakai", value)
          }
        >
          <Option value="1x sehari">1x sehari</Option>
          <Option value="2x sehari">2x sehari</Option>
          <Option value="3x sehari">3x sehari</Option>
        </Select>
      ),
    },
  ];

  const [selectedRowKeys, setSelectedRowKeys] = useState([]); // State for selected rows

  // Columns for "Obat Resep Racikan"
  const racikanColumns = [
    { title: "Jenis Racikan", dataIndex: "jenisRacikan", key: "jenisRacikan" },
    { title: "No Racikan", dataIndex: "noRacikan", key: "noRacikan" },
    { title: "Nama Obat", dataIndex: "namaObat", key: "namaObat" },
    { title: "Dosis", dataIndex: "dosis", key: "dosis" },
    {
      title: "Qty",
      dataIndex: "qty",
      key: "qty",
      render: (text, record) => (
        <InputNumber
          min={1}
          value={record.qty}
          onChange={(value) =>
            handleRacikanChange(record.key, "qty", value)
          }
        />
      ),
    },
    {
      title: "Aturan Pakai",
      dataIndex: "aturanPakai",
      key: "aturanPakai",
      render: (text, record) => (
        <Select
          value={record.aturanPakai}
          onChange={(value) =>
            handleRacikanChange(record.key, "aturanPakai", value)
          }
        >
          <Option value="1x sehari">1x sehari</Option>
          <Option value="2x sehari">2x sehari</Option>
          <Option value="3x sehari">3x sehari</Option>
        </Select>
      ),
    },
  ];

  // Handlers for data changes
  const handlePatenChange = (key, field, value) => {
    setPatenData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

    // Add new row to the table
    const handleAddRow = () => {
        const newRow = {
          key: Date.now().toString(),
          no: patenData.length + 1,
          namaBarang: "",
          hargaBarang: 0,
          satuan: "",
          qty: 1,
          aturanPakai: "1x sehari",
        };
        setPatenData((prevData) => [...prevData, newRow]);
      };

      // Delete selected rows from the table
  const handleDeleteRows = () => {
    setPatenData((prevData) => prevData.filter((item) => !selectedRowKeys.includes(item.key)));
    setSelectedRowKeys([]); // Clear selected rows
  };

  const handleRacikanChange = (key, field, value) => {
    setRacikanData((prevData) =>
      prevData.map((item) =>
        item.key === key ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div style={{ marginTop: "5px",padding: 20, background : "#fff"  }}>
        <Tabs defaultActiveKey="1">
        {/* Tab 1: Obat Resep Paten */}
        <TabPane tab="Obat Resep Paten" key="1">
            <Table
             rowSelection={{
                selectedRowKeys,
                onChange: (keys) => setSelectedRowKeys(keys),
              }}
            columns={patenColumns}
            dataSource={patenData}
            pagination={false}
            />
             <Space style={{ marginTop: 16 }}>
                <Button type="primary" 
                onClick={handleAddRow}
                >
                    Tambah
                </Button>
                <Button
                    type="primary"
                    danger
                    onClick={handleDeleteRows}
                    disabled={selectedRowKeys.length === 0}
                >
                    Hapus
                </Button>
                </Space>
        </TabPane>

        {/* Tab 2: Obat Resep Racikan */}
        <TabPane tab="Obat Resep Racikan" key="2">
            <Table
            columns={racikanColumns}
            dataSource={racikanData}
            pagination={false}
            />
        </TabPane>

        {/* Tab 3: Diagnosa */}
        <TabPane tab="Diagnosa" key="3">
            <p>Diagnosa masih kosong.</p>
        </TabPane>
        </Tabs>
    </div>
  );
};

export default ValidasiObatFarmasi;
