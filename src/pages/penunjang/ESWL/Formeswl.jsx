import React, { useContext } from "react";
import { Tag, Tooltip, Space, Row, Col, Button, Tabs, Input, Card } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import dayjs from "dayjs";
import { useState } from "react";
import Pageheadeswl from "./Pageheadeswl";
const { TabPane } = Tabs;
const { TextArea, Search } = Input;

const Formeswl = () => {
  const [aktifTab, setaktifTab] = useState("1");
  return (
    <div>
      <Pageheadeswl />
      <Tabs
        activeKey={aktifTab}
        type="card"
        size="small"
        onChange={(e) => {
          setaktifTab(e);
        }}
        style={{ marginTop: "5px" }}
      >
        <TabPane tab="RM 14" key="1"></TabPane>
        <TabPane tab="Surat Keterangan" key="2"></TabPane>
      </Tabs>
    </div>
  );
};
export default Formeswl;
