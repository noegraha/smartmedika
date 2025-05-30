import { Layout } from "antd";
import React, { useContext } from "react";
import SidebarPegawai from "./SidebarPegawai";
import PageheadPegawai from "./PageheadPegawai";
import Formmenukinerja from "./Formmenukinerja";
import FormMenubarKinerja from "./MenubarKinerja";
import { LoginContext } from "../rawatjalan/context";
import FormPenilaianKaru from "./FormPenilaianKaru";
import FormPenilaianKasie from "./FormPenilaianKasie";
const { Content } = Layout;

const LayoutKinerja = () => {
  const { namauser } = useContext(LoginContext);

  return (
    <Layout>
      {namauser === "LILIS" ? (
        <Content
          style={{
            padding: 7,
            height: "100%",
            flexDirection: "column",
            msFlexDirection: "column",
            display: "flex",
          }}
        >
          <FormPenilaianKasie />
        </Content>
      ) : (
        <>
          <SidebarPegawai />
          <Content
            style={{
              padding: 7,
              height: "100%",
              flexDirection: "column",
              msFlexDirection: "column",
              display: "flex",
            }}
          >
            <PageheadPegawai />
            {/* <Formmenukinerja />
            <FormMenubarKinerja /> */}
            <FormPenilaianKaru />
          </Content>
        </>
      )}
    </Layout>
  );
};

export default LayoutKinerja;
