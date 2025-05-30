import React from "react";
import { Layout } from "antd";
import Footerbar from "./footerbar";
import Sidebar from "../rawatjalan/sidebar";
import SidebarRI from "../rawatinap/SidebarRI";
import SidebarRIRJ from "../rawatjalan/transaksirawatinap/SidebarRI";
import SidebarKontrol from "../rawatjalan/Vclaim/SidebarKontrol";

const { Content } = Layout;

const sidebarComponents = {
  Sidebar,
  SidebarRI,
  SidebarRIRJ,
  SidebarKontrol,
};

const PageLayout = ({ children, sidebar, footer }) => {
  const SidebarComp = sidebar ? sidebarComponents[sidebar] : null;

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {SidebarComp && <SidebarComp />}
      <Layout>
        <Content
          style={{
            padding: 7,
            margin: 4,
            background: "#fff",
            flex: 1,
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
        {footer && <Footerbar />}
      </Layout>
    </Layout>
  );
};

export default PageLayout;
