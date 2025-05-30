import { Layout, Menu } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { LoginContext } from "../rawatjalan/context";

const { Header } = Layout;

const Formmenukinerja = () => {
  const [current, setCurrent] = useState("DataPegawai");
  const { namauser } = useContext(LoginContext);

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const warna1 = "#ffd6e7";
  const warna2 = "#ffccc7";
  const warna3 = "#ffd8bf";
  const warna4 = "#ffe7ba";
  const warna5 = "#fff1b8";
  const warna6 = "#ffffb8";
  const warna7 = "#d9f7be";
  const warna8 = "#b5f5ec";
  const warna9 = "#bae7ff";
  const warna10 = "#d6e4ff";
  const warna11 = "#efdbff";
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
        defaultSelectedKeys={["DataPegawai"]}
        onClick={handleClick}
        selectedKeys={[current]}
      >
        {/* <Menu.Item key="DataPegawai" style={{ backgroundColor: warna1 }}>
          <Link to="/kinerjaPerawat/perawat/DataPegawai">Data Pegawai</Link>
        </Menu.Item> */}

        {namauser === "LILIS" ? (
          <Menu.Item key="formkasie" style={{ backgroundColor: warna8 }}>
            <Link
              to="/kinerjaPerawat/perawat/nilaikasie"
              onClick={() => {
                //   setkeykedatangan("awal1");
              }}
            >
              Penilaian Kasie
            </Link>
          </Menu.Item>
        ) : (
          <Menu.Item key="formkaru" style={{ backgroundColor: warna10 }}>
            <Link
              to="/kinerjaPerawat/perawat/kinerjapegawai"
              onClick={() => {
                //   setkeykedatangan("awal1");
              }}
            >
              Penilaian Karu
            </Link>
          </Menu.Item>
        )}
        {/* <Menu.Item key="fromPerawat" style={{ backgroundColor: warna3 }}>
          <Link
            to="/kinerjaPerawat/perawat/FormPerawat"
            onClick={() => {
              //   setkeykedatangan("awal1");
            }}
          >
            Kegiatan Perawat
          </Link>
        </Menu.Item> */}
      </Menu>
    </Header>
  );
};

export default Formmenukinerja;
