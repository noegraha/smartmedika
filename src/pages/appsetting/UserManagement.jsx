/* eslint-disable react-hooks/exhaustive-deps */
import { Tabs, Typography, Card } from "antd";
import React, { useContext } from "react";
import MasterGroup from "./MasterGroup";
import MasterModul from "./MasterModul";
import MasterUser from "./MasterUser";
import SetGroup from "./SetGroup";
import { UserContext } from "./UserContext";
const { TabPane } = Tabs;
const { Title } = Typography;
const UserManagement = () => {
  const { getModulList, getGrouplist, getUserList } = useContext(UserContext);
  const onTabs = (e) => {
    if (e === "3") {
      getModulList();
    } else if (e === "1") {
      getUserList();
    } else if (e === "2") {
      getGrouplist();
    } else if (e === "4") {
      getGrouplist();
    }
  };
  return (
    <div
      className="backcontent"
      style={{ width: "100%", height: "92vh", overflowY: "scroll" }}
    >
      <Card style={{ margin: 5 }}>
        <Tabs
          defaultActiveKey="1"
          tabPosition="left"
          type="card"
          onChange={(e) => onTabs(e)}
        >
          <TabPane tab="Daftar User" key="1">
            <MasterUser />
          </TabPane>
          <TabPane tab="Daftar Grup" key="2">
            <MasterGroup />
          </TabPane>
          <TabPane tab="Daftar Modul" key="3">
            <MasterModul />
          </TabPane>
          <TabPane tab="Set Grup" key="4">
            <SetGroup />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default UserManagement;
