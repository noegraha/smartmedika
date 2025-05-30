import React, { useState } from "react";
import { Table } from "antd";

const RiwayatObatFarmasi = () => {
    
  // Data utama untuk tabel
  const data = [
    {
      key: 1,
      noReg: "12345",
      noResep: "RX001",
      tglResep: "2025-01-01",
      dokter: "Dr. A",
      detail: [
        { no: 1, keterangan: "Obat A", namaObat: "Paracetamol", dosis: "500mg", jumlah: 10, satuan: "Tablet", aturanPakai: "3x sehari" },
        { no: 2, keterangan: "Obat B", namaObat: "Amoxicillin", dosis: "250mg", jumlah: 20, satuan: "Kapsul", aturanPakai: "2x sehari" },
      ],
    },
    {
      key: 2,
      noReg: "67890",
      noResep: "RX002",
      tglResep: "2025-01-02",
      dokter: "Dr. B",
      detail: [
        { no: 1, keterangan: "Obat C", namaObat: "Ibuprofen", dosis: "200mg", jumlah: 15, satuan: "Tablet", aturanPakai: "3x sehari" },
      ],
    },
  ];

  // Kolom utama tabel
  const columns = [
    {
      title: "No Reg",
      dataIndex: "noReg",
      key: "noReg",
    },
    {
      title: "No Resep",
      dataIndex: "noResep",
      key: "noResep",
    },
    {
      title: "Tanggal Resep",
      dataIndex: "tglResep",
      key: "tglResep",
    },
    {
      title: "Dokter",
      dataIndex: "dokter",
      key: "dokter",
    },
  ];

  // Fungsi untuk menampilkan detail di bawah baris
  const expandedRowRender = (record) => {
    const detailColumns = [
        {
          title: "No",
          dataIndex: "no",
          key: "no",
          width: 50,
          align: "center",
          render: (text) => <span>{text}</span>,
          onHeaderCell: () => ({
            style: {
              backgroundColor: "#E08051", // Warna latar header
              color: "#fff", // Warna teks
              textAlign: "center",
            },
          }),
        },
        {
          title: "Keterangan",
          dataIndex: "keterangan",
          key: "keterangan",
          onHeaderCell: () => ({
            style: {
              backgroundColor: "#E08051", // Warna latar header
              color: "#fff", // Warna teks
              textAlign: "center",
            },
          }),
        },
        {
          title: "Nama Obat",
          dataIndex: "namaObat",
          key: "namaObat",
          onHeaderCell: () => ({
            style: {
              backgroundColor: "#E08051", // Warna latar header
              color: "#fff",
              textAlign: "center",
            },
          }),
        },
        {
          title: "Dosis",
          dataIndex: "dosis",
          key: "dosis",
          onHeaderCell: () => ({
            style: {
              backgroundColor: "#E08051", // Warna latar header
              color: "#fff",
              textAlign: "center",
            },
          }),
        },
        {
          title: "Jumlah",
          dataIndex: "jumlah",
          key: "jumlah",
          onHeaderCell: () => ({
            style: {
              backgroundColor: "#E08051", // Warna latar header
              color: "#fff",
              textAlign: "center",
            },
          }),
        },
        {
          title: "Satuan",
          dataIndex: "satuan",
          key: "satuan",
          onHeaderCell: () => ({
            style: {
              backgroundColor: "#E08051", // Warna latar header
              color: "#fff",
              textAlign: "center",
            },
          }),
        },
        {
          title: "Aturan Pakai",
          dataIndex: "aturanPakai",
          key: "aturanPakai",
          onHeaderCell: () => ({
            style: {
              backgroundColor: "#E08051", // Warna latar header
              color: "#fff",
              textAlign: "center",
            },
          }),
        },
      ];
      return (
        <Table
          columns={detailColumns}
          dataSource={record.detail}
          pagination={false}
          rowKey="no"
          size="small"
          bordered
        />
      );
  };

  return (
    <div style={{ padding: "20px", background: "#fff" }}>
      <h3 style={{ background: "#61C0BF ", padding: "10px", color: "#000" }}>Riwayat Obat</h3>
      <Table
        columns={columns}
        dataSource={data}
        expandable={{
          expandedRowRender,
          rowExpandable: (record) => record.detail.length > 0,
        }}
        rowKey="key"
        bordered
      />
    </div>
  );
};

export default RiwayatObatFarmasi;
