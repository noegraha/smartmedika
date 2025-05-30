import { Card, Tabs } from "antd";
import React from "react";
import RekapKunjunganRJ from "./RekapKunjunganRJ";
import RekapDiagnosis from "./RekapDiagnosis";
import LaporanDidik from "../laporan/DashboardDidikAnak/LaporanDidik";

const DashboardRekapRJ = () => {
  const items = [
    {
      key: "1",
      label: "Rekap Kunjungan RJ",
      children: <RekapKunjunganRJ />,
    },
    {
      key: "2",
      label: "Rekap Diagnosa RJ",
      children: <RekapDiagnosis />,
    },
    {
      key: "3",
      label: "Rekap Didik Anak",
      children: <LaporanDidik />,
    },
  ];
  return (
    <div>
      <Card
        title="Dashboard Laporan Rawat Jalan"
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
      >
        <Tabs type="card" size="small" defaultActiveKey="1" items={items} />
      </Card>
    </div>
  );
};

export default DashboardRekapRJ;
