import React, { useState } from "react";
import { Layout } from "antd";
import SidebarFarmasi from "../komponen/SidebarFarmasi";
import DetailPasienFarmasi from "../komponen/DetailPasienFarmasi";
import { FarmasiProvider } from "../context/FarmasiContext";
import RiwayatObatFarmasi from "../komponen/RiwayatObatFarmasi";
import ValidasiObatFarmasi from "../komponen/ValidasiObat";
import ActionButtons from "../komponen/ActionButton";

const { Header, Content } = Layout;

const TransaksiResep = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed); // Toggle sidebar visibility
  };

  return (
    <FarmasiProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <SidebarFarmasi />
        <Layout
          style={{
            marginLeft: collapsed ? 0 : 0,
            transition: "margin-left 0.3s",
          }}
        >
        <Content style={{ padding: 0 }}>
            {/* Tambahkan wrapper untuk membagi layout */}
            <div style={{ display: "flex", gap: "5px", padding: "10px" }}>
            {/* Bagian Kiri */}
                <div style={{ flex: 3, padding: "0px" }}>
                    <DetailPasienFarmasi />
                    <ValidasiObatFarmasi />
                    <ActionButtons />
                </div>
                {/* Bagian Kanan */}
                <div style={{ flex: 2, padding: "0px" }}>
                    <RiwayatObatFarmasi />
                </div>
            </div>
        </Content>
        </Layout>
      </Layout>
    </FarmasiProvider>
  );
};

export default TransaksiResep;
