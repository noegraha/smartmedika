import React from "react";
import PageheadIGD from "./PageheadIGD";
import MenubarIGD from "./MenubarIGD";
import SidebarIGD from "./SidebarIGD";
import { Layout } from "antd";
import MasterFormIGD from "./MasterFormIGD";
import IGDContextProvider from "./Context/IGDContext";
import MasterIGDContextProvider from "./Context/MasterIGDContext";
import TriaseIGDContextProvider from "./Context/TriaseIGDContext";
const { Content } = Layout;

const MainIGD = () => {
  return (
    <div>
      <IGDContextProvider>
        <MasterIGDContextProvider>
          <TriaseIGDContextProvider>
            <MenubarIGD />
            <Layout>
              <SidebarIGD />
              <Content
                style={{
                  padding: 7,
                  height: "100%",
                  flexDirection: "column",
                  msFlexDirection: "column",
                  display: "flex",
                }}
              >
                <PageheadIGD />
                <MasterFormIGD />
              </Content>
            </Layout>
          </TriaseIGDContextProvider>
        </MasterIGDContextProvider>
      </IGDContextProvider>
    </div>
  );
};

export default MainIGD;
