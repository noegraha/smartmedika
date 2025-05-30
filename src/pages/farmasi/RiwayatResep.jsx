import React, { useState, useEffect } from "react";
import { Table } from "antd";

const RiwayatResep = () => {
  const [loadingresep, setLoadingResep] = useState(true);
  const [riwayatobatbaru, setRiwayatObatBaru] = useState([]);

  useEffect(() => {
    // Ambil data dari API
    fetch("URL_API_ANDA")
      .then((response) => response.json())
      .then((data) => {
        setRiwayatObatBaru(data); // Pastikan data sesuai dengan struktur yang dibutuhkan
        setLoadingResep(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoadingResep(false);
      });
  }, []);

  const columns = [
    { title: "Tanggal", dataIndex: "tanggal", key: "tanggal" },
    { title: "Keterangan", dataIndex: "keterangan", key: "keterangan" },
    // Kolom lain jika diperlukan
  ];

  return (
    <Table
      loading={loadingresep}
      scroll={{ y: 700 }}
      size="small"
      pagination={false}
      className="components-table-demo-nested"
      columns={columns}
      dataSource={riwayatobatbaru}
      expandable={{
        defaultExpandedRowKeys: [1, 2],
        expandedRowRender: (record) => (
          <div>
            <table
              style={{
                borderCollapse: "collapse",
                borderColor: "#aaa",
                borderSpacing: 0,
                fontSize: 12,
              }}
              className="tg"
            >
              <thead>
                <tr>
                  <th>No.</th>
                  <th>Keterangan</th>
                  <th>Nama Barang / Obat</th>
                  <th>Dosis</th>
                  <th>Jumlah</th>
                  <th>Satuan</th>
                  <th>Aturan Pakai</th>
                </tr>
              </thead>
              <tbody>
                {record.resep.map((d, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{d.keterangan}</td>
                    <td>{d.namaBarang}</td>
                    <td>{d.dosis}</td>
                    <td>{d.QtyBarang}</td>
                    <td>{d.namaSM}</td>
                    <td>{d.kodeAturan}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ),
      }}
    />
  );
};

export default RiwayatResep;
