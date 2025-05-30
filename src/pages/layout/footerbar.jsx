import React, { useContext } from "react";
import { Divider, Layout, Space } from "antd";
import { LoginContext } from "../rawatjalan/context";
import Jam from "../rawatjalan/komponen/Jam";
// import { PasienContext } from "../rawatjalan/context/PasienContext";
const { version } = require("../../../package.json");
const { Footer } = Layout;

const Footerbar = () => {
  const { namauser, ipPC, hostPc } = useContext(LoginContext);
  return (
    <div>
      <Footer
        style={{
          borderTop: "1px solid #e8e8e8",
          position: "fixed",
          bottom: 0,
          width: "100%",
          backgroundColor: "white",
          margin: "0px 0px 0px 0px",
          padding: "1px 0px 2px 10px",
        }}
      >
        <Space>
          User : {namauser} <Divider type="vertical" /> IP : {ipPC}{" "}
          <Divider type="vertical" /> PC : {hostPc} <Divider type="vertical" />{" "}
          Version : {version} <Divider type="vertical" /> <Jam />
        </Space>
      </Footer>
    </div>
  );
};

export default Footerbar;
