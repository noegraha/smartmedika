import { Layout } from "antd";
import React from "react";
import Pagehead from "../rawatjalan/pagehead";
import MenuTabBarPenunjang from "./MenuTabBarPenunjang";
import SidebarPenunjang from "./SidebarPenunjang";
const { Content } = Layout;

const Penunjang = () => {
  return (
    <div>
      <Layout>
        <SidebarPenunjang />
        <Content
          style={{
            padding: 7,
            height: "100%",
            flexDirection: "column",
            msFlexDirection: "column",
            display: "flex",
          }}
        >
          <Pagehead />
          <MenuTabBarPenunjang />
        </Content>
      </Layout>
    </div>
  );
};

export default Penunjang;
