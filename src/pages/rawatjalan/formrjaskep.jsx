import { Spin, Card, Tabs } from "antd";
import React, { useContext, useState } from "react";
import { Route } from "react-router-dom";
import { StickyContainer } from "react-sticky";
import { ChatContext } from "../chat/Chatcontext";
import FormBilling from "./form/billing";
import Formanamnesa from "./form/Formanamnesa2";
import { LoadingOutlined } from "@ant-design/icons";
import Formdokter from "./form/formdokter";
import Formreminder from "./form/formreminder";
import Formpemeriksaankhusus from "./form/formpemeriksaankhusus";
import Formpantuaninfeksi from "./form/formpantuaninfeksi";
import FormKonsul from "./form/FormKonsulRJ";
import FormOrderPenunjang from "./form/FormOrderPenunjang";
import FormOrderResep from "./orderresep/FormOrderResep";
import FormDiagnosa from "./form/FormDiagnosa2";
import FormProsedur from "./form/Formprosedur";
import SuratKeteranganRJ from "./komponen/Suket/SuratKeteranganRJ";
import GambarEditor from "./komponen/GambarEditor";
import FormAskep from "./form/FormAskep";
import { useHistory } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import FormBeranda from "./form/FormBeranda";
import FormProtokolKemo from "./form/FormProtokolKemo";
import FormPengajuanJadwalOperasi from "../rawatinap/pemeriksaanharian/FormPengajuanJadwalOperasi";
import MenuTabBarOrderDarah from "../penunjang/bankDarah/component/order/MenuTabBarOrderDarah";
import FormDashboardKemoterapi from "./form/FormDashboardKemoterapi";
import { PasienContext } from "./context/PasienContext";
import { PemeriksaanLainContext } from "./context/pemeriksaancontext/PemeriksaanLainContext";

const FormRJ = () => {
  const { ruangasal, curpas } = useContext(PasienContext);

  const {
    tabProtKemo,
    settabProtKemo,
    getDataTerapiKemoterapiPoli,
    getProtokolPasien,
  } = useContext(PemeriksaanLainContext);

  const { loading } = useContext(ChatContext);
  const [key, setKey] = useState("tab1");

  const onTabChange = (key) => {
    setKey(key);
  };
  const tabList = [
    {
      key: "tab1",
      tab: <span style={{ fontWeight: "bolder" }}>ICD10 (Diagnosa)</span>,
    },
    {
      key: "tab2",
      tab: <span style={{ fontWeight: "bolder" }}>ICD9 (Prosedur)</span>,
    },
  ];
  const contentList = {
    tab1: <FormDiagnosa />,
    tab2: <FormProsedur />,
  };

  const tabKemoItems = [
    {
      key: "1",
      label: "Protokol Kemoterapi",
      children: <FormProtokolKemo />,
    },
    {
      key: "2",
      label: "Dashboard Kemoterapi",
      children: <FormDashboardKemoterapi />,
    },
  ];

  const changeTabKemo = (key) => {
    settabProtKemo(key);
    if (key === "1") {
      getDataTerapiKemoterapiPoli(curpas.registrasiId, ruangasal);
      if (curpas.registrasiId) {
        getProtokolPasien(curpas.registrasiId);
      }
    }
  };

  const history = useHistory();
  // const routeChange = () => {
  //   history.push("/app/form/resep");
  // };
  useHotkeys("shift+r", () => {
    history.push("/app/form/resep");
  });
  useHotkeys("shift+k", () => {
    history.push("/app/form/konsul");
  });
  useHotkeys("shift+b", () => {
    history.push("/app/form/billing");
  });
  useHotkeys("shift+a", () => {
    history.push("/app/form/anamnesa");
  });
  return (
    <Spin
      size="large"
      indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
      spinning={loading}
      tip="Sedang Memuat.."
    >
      <div
        style={{
          maxHeight: "77vh",
          overflowY: "scroll",
          paddingRight: 4,
        }}
      >
        <StickyContainer>
          <Route path="/app/form/billing" exact>
            <FormBilling />
          </Route>
          <Route path="/app/form/diagpro" exact>
            <Card
              headStyle={{ backgroundColor: "beige" }}
              tabProps={{ size: "small" }}
              style={{
                borderWidth: "2px",
                borderColor: "darkgray",
                borderRadius: "4px",
              }}
              size="small"
              tabList={tabList}
              activeTabKey={key}
              onTabChange={(key) => onTabChange(key)}
            >
              {contentList[key]}
            </Card>
          </Route>
          <Route path="/app/form/anamnesa" exact>
            <Formanamnesa />
            <Formdokter />
          </Route>
          <Route path="/app/form/perawat" exact>
            <FormAskep />
          </Route>
          <Route path="/app/form/tindaklanjut" exact>
            <Formreminder />
          </Route>
          <Route path="/app/form/khusus" exact>
            <Formpemeriksaankhusus />
          </Route>
          <Route path="/app/form/infeksi" exact>
            <Formpantuaninfeksi />
          </Route>
          <Route path="/app/form/gambar" exact>
            <GambarEditor />
          </Route>
          <Route path="/app/form/konsul" exact>
            <FormKonsul />
          </Route>
          <Route path="/app/form/penunjang" exact>
            <FormOrderPenunjang />
          </Route>
          <Route path="/app/form/resep" exact>
            <FormOrderResep />
          </Route>
          <Route path="/app/form/suket" exact>
            <SuratKeteranganRJ />
          </Route>
          <Route path="/app/form/protokolkemo" exact>
            <Tabs
              type="card"
              activeKey={tabProtKemo}
              items={tabKemoItems}
              onChange={(e) => changeTabKemo(e)}
            />
            {/* <FormProtokolKemo /> */}
          </Route>
          <Route path="/app/form/" exact>
            <FormBeranda />
          </Route>
          <Route path="/app/form/orderOp" exact>
            <FormPengajuanJadwalOperasi />
          </Route>
          <Route path="/app/form/orderDarah" exact>
            <MenuTabBarOrderDarah />
          </Route>
        </StickyContainer>
      </div>
    </Spin>
  );
};

export default FormRJ;
