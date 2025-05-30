import React, { Fragment,useContext, useState, useEffect } from "react";
import { Layout, Select, Table, DatePicker, Input } from "antd";
import { FarmasiContext } from "../context/FarmasiContext";
import moment from "moment"; // Untuk memformat tanggal

const { Sider } = Layout;

const SidebarFarmasi = () => {
  const { curpas, selectedApotek, setSelectedApotek, setSelectedPatient  } = useContext(FarmasiContext);
  
  // State untuk tanggal yang dipilih
  const [selectedDate, setSelectedDate] = useState(null);

  // State untuk pencarian nama pasien
  const [searchText, setSearchText] = useState("");

  // Filter pasien berdasarkan apotek yang dipilih dan nama pasien yang dicari
  const filteredPasien = curpas
    .filter((pasien) => pasien.apotek === selectedApotek)
    .filter((pasien) => pasien.name.toLowerCase().includes(searchText.toLowerCase()));

  const columns = [
    {
      title: "ID Pasien",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Nama Pasien",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Apotek",
      dataIndex: "apotek",
      key: "apotek",
    },
    {
        title: "Data",
        dataIndex: "data",
        key: "data",
    },
  ];

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString); // Menyimpan tanggal yang dipilih
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value); // Menyimpan teks pencarian
  };

    // Reset selectedPatient saat apotek berubah
    useEffect(() => {
        setSelectedPatient(null); // Reset pasien terpilih saat apotek berubah
      }, [selectedApotek, setSelectedPatient]);

  return (
    <Fragment>
    <Sider width={250} style={{ background: "#fff", height: "100vh", position: "sticky", top: 0, left: 0 }}>
    <div style={{ padding: "5px 5px 5px 5px" }}> {/* Menambahkan padding kiri dan kanan */}
        {/* Pilihan apotek */}
        <Select
          value={selectedApotek}
          style={{ width: "100%", marginBottom: 5, marginLeft: 0, marginRight: 0 }}  /* Menambahkan margin kiri dan kanan */
          onChange={(value) => setSelectedApotek(value)}
        >
          <Select.Option value="">- Pilih Apotek -</Select.Option>
          <Select.Option value="Apotek 1">Apotek 1</Select.Option>
          <Select.Option value="Apotek 2">Apotek 2</Select.Option>
        </Select>

        {/* Pilihan Tanggal */}
        <DatePicker
          style={{ width: "100%", marginBottom: 5 }}
          onChange={handleDateChange}
          value={selectedDate ? moment(selectedDate, "YYYY-MM-DD") : null} // Menampilkan tanggal yang dipilih
          format="YYYY-MM-DD"
        />

        {/* Pencarian Nama Pasien */}
        <Input
          style={{ width: "100%", marginBottom: 10 }}
          placeholder="Cari Pasien berdasarkan Nama Pasien"
          value={searchText}
          onChange={handleSearchChange}
        />

        {/* Tabel pasien */}
        <Table
          dataSource={filteredPasien}
          columns={columns}
          rowKey="id"
          pagination={true}
          scroll={{ x: "100%" }}  /* Menambahkan scroll horizontal */
          onRow={(record) => ({
            onClick: () => setSelectedPatient(record),
          })}
        />
      </div>
    </Sider>
    </Fragment>
  );
};

export default SidebarFarmasi;
