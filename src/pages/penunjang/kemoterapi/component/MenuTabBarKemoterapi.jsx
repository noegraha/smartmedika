import { Card, Layout, Menu, Tabs } from "antd";
import React, { useContext, useState } from "react";
import FormLaporanKemoterapi from "./FormLaporanKemoterapi";
import FormListTanpaOrder from "./FormListTanpaOrder";
import { KemoterapiContext } from "../context/KemoterapiContext";
import dayjs from "dayjs";
import RiwayatKemoterapi from "./RiwayatKemoterapi";
// import "../style/style.css"

const { TabPane } = Tabs;

const MenuTabBarKemoterapi = () => {
  const {
    tglOrder,
    unitId,
    noReg,
    pasienId,
    tabKey, settabKey,
    // func
    getDataTidakOrderAll,
    getRiwKemoterapi,
  } = useContext(KemoterapiContext)

  const [current, setCurrent] = useState("");
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  const onChangeTab = (e) => {
    console.log('onChangeTab : ', e);
    settabKey(e)
    if (e === "3") {
      getDataTidakOrderAll(dayjs(tglOrder).format('YYYY-MM-DD'), unitId)
    }
    else if (e === '2') {
      getRiwKemoterapi(pasienId);
    }
  }

  return (
    <div>
      <Card>
        <Tabs
          // defaultActiveKey={tabKey}
          activeKey={tabKey}
          onChange={(e) => onChangeTab(e)}
          size='small'
          type='card'>
          <TabPane tab="Laporan Kemoterapi" key="1">
            <FormLaporanKemoterapi />
          </TabPane>
          <TabPane tab="Riwayat Kemoterapi" key="2" disabled={!noReg}>
            <RiwayatKemoterapi />
            {/* <FormAssesmentAwal /> */}
          </TabPane>
          <TabPane tab="Daftar Tanpa Order" key="3">
            <FormListTanpaOrder />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default MenuTabBarKemoterapi;
