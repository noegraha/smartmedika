import { Spin } from "antd";
import React, { useContext } from "react";
import { Route } from "react-router-dom";
import { StickyContainer } from "react-sticky";
import { ChatContext } from "../chat/Chatcontext";
import { LoadingOutlined } from "@ant-design/icons";
import DOA from "./Form/DOA";
import Triase from "./Form/Triase";
import DokumenPerawat from "./Form/DokumenPerawat";
import DokumenDokter from "./Form/DokumenDokter";
import Persetujuan from "./Form/Persetujuan";
import KonsulDokter from "./Form/KonsulDokter";
import OrderPenunjang from "./Form/OrderPenunjang";
import CPPT from "./Form/CPPT";
const MasterFormIGD = () => {
  const { loading } = useContext(ChatContext);

  return (
    <Spin
      size="large"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      spinning={loading}
      tip="Sedang Memuat.."
    >
      <div
        style={{
          maxHeight: "80vh",
          overflowY: "scroll",
          paddingRight: 4,
        }}
      >
        <StickyContainer>
          <Route path="/igd/doa" exact>
            <DOA />
          </Route>
          <Route path="/igd/triase" exact>
            <Triase />
          </Route>
          <Route path="/igd/perawat" exact>
            <DokumenPerawat />
          </Route>
          <Route path="/igd/dokter" exact>
            <DokumenDokter />
          </Route>
          <Route path="/igd/konsultasi" exact>
            <KonsulDokter />
          </Route>
          <Route path="/igd/persetujuan" exact>
            <Persetujuan />
          </Route>
          <Route path="/igd/orderpenunjang" exact>
            <OrderPenunjang />
          </Route>
          <Route path="/igd/cppt" exact>
            <CPPT />
          </Route>
        </StickyContainer>
      </div>
    </Spin>
  );
};

export default MasterFormIGD;
