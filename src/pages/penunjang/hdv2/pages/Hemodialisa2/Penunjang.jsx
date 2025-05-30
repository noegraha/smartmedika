import { Layout } from "antd";
import React from "react";
import TabsHd from "../../component/v2/TabsHd";
import HdContext from "../../HdContext";
import PageheadHD from "./PageHeadHD";
import SidebarPenunjangHD from "./SidebarPenunjang";
import SatuSehatEncounterContextProvider from "../../../../satusehat/encounter/context/SatuSehatEncounterContext";
const { Content } = Layout;

const {
  PasiensProvider,
} = HdContext;

const PenunjangHD = () => {

  return (
    <div>
      <Layout>
        <PasiensProvider>
          {/* <SatuSehatEncounterContextProvider> */}
          <SidebarPenunjangHD />
          <Content
            style={{
              padding: 7,
              height: "100%",
              flexDirection: "column",
              msFlexDirection: "column",
              display: "flex",
            }}
          >
            <PageheadHD />
            <TabsHd />
          </Content>
          {/* </SatuSehatEncounterContextProvider> */}
        </PasiensProvider>
      </Layout>
    </div>
  );
};

export default PenunjangHD;
