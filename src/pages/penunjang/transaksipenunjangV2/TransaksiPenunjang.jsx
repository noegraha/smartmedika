import React from "react";
import { Layout } from "antd";
import SidebarTransaksiPenunjang from "./component/SidebarPenunjang";
import PageheadTransaksiPenunjang from "./component/pagehead";
import TransaksiPenunjangBody from "./component/TransaksiPenunjangBody";
import TransaksiPenunjangContextProvider from "./context/TransaksiPenunjangContext";

const { Content } = Layout;

const TransaksiPenunjang = () => {
  return <div>
    <TransaksiPenunjangContextProvider>
      <Layout>
        <SidebarTransaksiPenunjang />
        <Content
          style={{
            padding: 7,
            height: "100%",
            flexDirection: "column",
            msFlexDirection: "column",
            display: "flex",
          }}
        >
          <PageheadTransaksiPenunjang />
          <TransaksiPenunjangBody />
        </Content>
      </Layout>
    </TransaksiPenunjangContextProvider>
  </div>;
};

export default TransaksiPenunjang;
