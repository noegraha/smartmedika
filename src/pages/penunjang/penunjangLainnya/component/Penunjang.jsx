import { Layout } from "antd";
import React from "react";
import Pagehead from "./pagehead";
import SidebarPenunjang from "./SidebarPenunjang";
import PenunjangLainnyaContextProvider from "../context/PenunjangLainnyaContext";
import PenunjangLainnyaBody from "./PenunjangLainnyaBody";
const { Content } = Layout;

const PenunjangLainnya = () => {
  return (
    <div>
      <Layout>
        <PenunjangLainnyaContextProvider>
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
            <PenunjangLainnyaBody />
          </Content>
        </PenunjangLainnyaContextProvider>
      </Layout>
    </div>
  );
};

export default PenunjangLainnya;
