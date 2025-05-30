import React, { useState } from "react";
import { Card } from "antd";
import PemeriksaanFisikRI from "./FormPemeriksaanFisik";
import FormPemeriksaanFisikNew from "./FormPemeriksaanFisiknew";
const tabList = [
  {
    key: "tab1",
    tab: "Pemeriksaan Fisik Teks",
  },
  // {
  //   key: "tab2",
  //   tab: "Pemeriksaan Fisik Form",
  // },
];
const contentList = {
  tab1: <PemeriksaanFisikRI />,
  tab2: <FormPemeriksaanFisikNew />,
};

const MenuPemFisik = () => {
  const [activeTabKey1, setActiveTabKey1] = useState("tab1");
  const onTab1Change = (key) => {
    setActiveTabKey1(key);
  };
  return (
    <div>
      <Card
        style={{
          width: "100%",
        }}
        size="small"
        tabList={tabList}
        activeTabKey={activeTabKey1}
        onTabChange={onTab1Change}
      >
        {contentList[activeTabKey1]}
      </Card>
    </div>
  );
};

export default MenuPemFisik;
