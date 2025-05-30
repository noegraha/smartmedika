import { Divider, Layout } from "antd";
import React from "react";
import PageheadRadoterapi from "./component/pageheadRadioterapi";
import MenuTabBarRadioterapi from "./component/MenuTabBarRadioterapi";
import SidebarRadioterapi from "./component/SidebarRadioterapi";
import RadioterapiContextProvider from "./context/RadioterapiContext";

const { Content } = Layout;

const FormRadioterapi = () => {
  return (
    <div>
      <RadioterapiContextProvider>
        <Layout>
          <SidebarRadioterapi />
          <Content
            style={{
              padding: 7,
              height: "100%",
              flexDirection: "column",
              msFlexDirection: "column",
              display: "flex",
            }}
          >
            <Divider
              orientation='left'
              style={{ backgroundColor: '#FFADAD', margin: '0px' }}>
              RME Radioterapi
            </Divider>
            <PageheadRadoterapi />
            <MenuTabBarRadioterapi />
          </Content>
        </Layout>
      </RadioterapiContextProvider>
    </div>
  );
};

export default FormRadioterapi;
