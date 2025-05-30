import { Spin, Card, Collapse, Button, Tabs } from "antd";
import React, { useContext, useState } from "react";
import { Route } from "react-router-dom";
import { StickyContainer } from "react-sticky";
import DataPegawai from "./DataPegawai";
import KinerjaPegawai from "./FormPenilaianKaru";
import FormPenilaianKasie from "./FormPenilaianKasie";
import FormKegiatanPegawai from "./FormKegiatanPegawai";

const { Panel } = Collapse;
const { TabPane } = Tabs;
const FormMenubarKinerja = () => {
  //   const tabList = [
  //     {
  //       key: "Dx1",
  //       tab: <span style={{ fontWeight: "bolder" }}>DIAGNOSA (ICDX)</span>,
  //     },
  //     {
  //       key: "Dx2",
  //       tab: <span style={{ fontWeight: "bolder" }}>SNOMED CT DX</span>,
  //     },
  //     {
  //       key: "Dx3",
  //       tab: <span style={{ fontWeight: "bolder" }}>PROSEDUR (ICD9CM)</span>,
  //     },
  //     {
  //       key: "Dx4",
  //       tab: <span style={{ fontWeight: "bolder" }}>SNOMED CT PROC</span>,
  //     },
  //   ];

  //   const contentList = {
  //     Dx1: <FormDiagnosaRI />,
  //     Dx2: <FormSnomedDX />,
  //     Dx3: <FormProcedureRI />,
  //     Dx4: <FormSnomedProcedure />,
  //   };

  return (
    <div
      style={{
        // minHeight: 475,
        // height: 500,
        maxHeight: "80vh",
        overflowY: "scroll",
        paddingRight: 4,
      }}
    >
      <StickyContainer>
        <Route path="/kinerjaPerawat/perawat/DataPegawai">
          <DataPegawai />
        </Route>
        <Route path="/kinerjaPerawat/perawat/kinerjapegawai">
          <KinerjaPegawai />
        </Route>
        <Route path="/kinerjaPerawat/perawat/nilaikasie">
          <FormPenilaianKasie />
        </Route>
        <Route path="/kinerjaPerawat/perawat/FormPerawat">
          <FormKegiatanPegawai />
        </Route>
      </StickyContainer>
    </div>
    // </Spin>
  );
};

export default FormMenubarKinerja;
