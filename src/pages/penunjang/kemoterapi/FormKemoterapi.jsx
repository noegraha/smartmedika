import { Divider, Layout } from "antd";
import React from "react";
import MenuTabBarKemoterapi from "./component/MenuTabBarKemoterapi";
import KemoterapiPagehead from "./component/pageheadKemoterapi";
import SidebarKemoterapi from "./component/SidebarKemoterapi";
import KemoterapiContextProvider from "./context/KemoterapiContext";

const { Content } = Layout;

const FormKemoterapi = () => {
  return (
    <div>
      <KemoterapiContextProvider >
        <Layout>
          <SidebarKemoterapi />
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
              style={{ backgroundColor: '#73d13d', margin: '0px' }}>
              RME Kemoterapi
            </Divider>
            <KemoterapiPagehead />
            <MenuTabBarKemoterapi />
          </Content>
        </Layout>
      </KemoterapiContextProvider>
    </div>
  );
};

export default FormKemoterapi;
