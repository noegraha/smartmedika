// components/LaporanList.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Tag, Typography } from "antd";
import dayjs from "dayjs";
import "dayjs/locale/id";

dayjs.locale("id");

const { Title } = Typography;

const hasilColor = {
  MERAH: "red",
  KUNING: "gold",
  HIJAU: "green",
};

const LaporanDidik = () => {
  const [laporan, setLaporan] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLaporan = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          "https://v0-api-backend.vercel.app/api/get-laporan"
        );
        setLaporan(res.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLaporan();
  }, []);

  // Generate columns indikator secara dinamis
  const indikatorColumns = Array.from({ length: 11 }, (_, i) => {
    const key = `indikator_${i + 1}`;
    return {
      title: `Indikator ${i + 1}`,
      dataIndex: "data_form",
      key,
      align: "center",
      render: (form) => (form?.[key] === "ya" ? "✅" : "–"),
    };
  });

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 70,
      fixed: "left",
    },
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      render: (text) => dayjs(text).format("DD MMMM YYYY HH:mm"),
      width: 180,
    },
    {
      title: "Hasil",
      dataIndex: "hasil",
      key: "hasil",
      width: 100,
      render: (hasil) => (
        <Tag color={hasilColor[hasil] || "blue"} style={{ fontWeight: "bold" }}>
          {hasil}
        </Tag>
      ),
    },
    ...indikatorColumns,
  ];

  return (
    <div style={{ padding: 24 }}>
      <Title level={3} style={{ textAlign: "center" }}>
        Laporan Skrining Kanker Anak
      </Title>
      <Table
        columns={columns}
        dataSource={laporan}
        rowKey="id"
        loading={loading}
        bordered
        size="small"
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: [5, 10, 20, 50],
        }}
        scroll={{ x: "max-content" }}
      />
    </div>
  );
};

export default LaporanDidik;
