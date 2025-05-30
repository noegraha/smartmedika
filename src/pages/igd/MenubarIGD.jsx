import { Layout, Menu } from "antd";
import React, { useContext } from "react";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import { Link } from "react-router-dom/cjs/react-router-dom";
const { Header } = Layout;

const MenubarIGD = () => {
  const { current, setCurrent, setCollapsed } = useContext(PasienContext);

  const handleClick = (e) => {
    setCurrent(e.key);
  };

  return (
    <Header
      className="header"
      style={{
        height: "32px",
        padding: "0 0",
        lineHeight: "32px",
        position: "sticky",
        zIndex: 3,
        width: "100%",
        left: 0,
        top: 0,
      }}
    >
      <Menu
        style={{ lineHeight: "32px" }}
        theme="light"
        mode="horizontal"
        onClick={handleClick}
        selectedKeys={[current]}
      >
        <Menu.Item key="doa" style={{ backgroundColor: "#ffccc7" }}>
          <Link to="/igd/doa" onClick={() => setCollapsed(true)}>
            D O A
          </Link>
        </Menu.Item>
        <Menu.Item key="triase" style={{ backgroundColor: "#ffd8bf" }}>
          <Link to="/igd/triase" onClick={() => setCollapsed(false)}>
            Triase (Metode ATS)
          </Link>
        </Menu.Item>
        <Menu.Item key="dokter" style={{ backgroundColor: "#ffe7ba" }}>
          <Link to="/igd/dokter" onClick={() => setCollapsed(false)}>
            Dokumen Dokter
          </Link>
        </Menu.Item>
        <Menu.Item key="gambar" style={{ backgroundColor: "#fff1b8" }}>
          <Link to="/igd/konsultasi" onClick={() => setCollapsed(true)}>
            Konsul Dokter
          </Link>
        </Menu.Item>
        <Menu.Item key="persetujuan" style={{ backgroundColor: "#ffffb8" }}>
          <Link to="/igd/persetujuan" onClick={() => setCollapsed(false)}>
            Persetujuan
          </Link>
        </Menu.Item>
        <Menu.Item key="konsul" style={{ backgroundColor: "#f4ffb8" }}>
          Jawab Konsul
        </Menu.Item>
        <Menu.Item key="penunjang" style={{ backgroundColor: "#d9f7be" }}>
          <Link to="/igd/orderpenunjang" onClick={() => setCollapsed(false)}>
            Order Penunjang
          </Link>
        </Menu.Item>
        <Menu.Item key="perawat" style={{ backgroundColor: "#bae7ff" }}>
          <Link to="/igd/perawat" onClick={() => setCollapsed(false)}>
            Dokumen Perawat
          </Link>
        </Menu.Item>
        <Menu.Item key="cppt" style={{ backgroundColor: "#efdbff" }}>
          <Link to="/igd/cppt" onClick={() => setCollapsed(false)}>
            CPPT
          </Link>
        </Menu.Item>
        <Menu.Item key="tindaklanjut" style={{ backgroundColor: "#ffd6e7" }}>
          Tindak Lanjut
        </Menu.Item>
        <Menu.Item key="order" style={{ backgroundColor: "#ffccc7" }}>
          Daftar Order
        </Menu.Item>
        <Menu.Item key="rujukan" style={{ backgroundColor: "#ffd8bf" }}>
          Pasien Rujukan
        </Menu.Item>
        <Menu.Item
          key="diagnosaprocedure"
          style={{ backgroundColor: "#ffe7ba" }}
        >
          Diagnosa & Procedure
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default MenubarIGD;
