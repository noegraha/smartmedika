import React from "react";
import { Tabs } from "antd";
import MasterPPDS from "../../master/masterdokter/MasterPPDS";

const { TabPane } = Tabs;

const MenuPendidikan = () => {
  const callback = (key) => {
    console.log("Tab aktif:", key);
  };

  return (
    <div>
      <Tabs type="card" defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Master PPDS" key="1">
          <MasterPPDS />
        </TabPane>
        {/* <TabPane tab="DST 1" key="2"> */}
        {/* Konten untuk tab kedua */}
        {/* </TabPane> */}
        {/* <TabPane tab="DST 2" key="3"> */}
        {/* Konten untuk tab ketiga */}
        {/* </TabPane> */}
      </Tabs>
    </div>
  );
};

export default MenuPendidikan;
