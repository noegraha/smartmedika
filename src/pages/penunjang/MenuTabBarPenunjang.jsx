import { Card, Layout, Menu, Tabs } from "antd";
import React, { useState } from "react";
import FormStatusEksternal from "./radioterapi/component/FormStatusEksternal";
const { Header } = Layout;

const { TabPane } = Tabs;

const MenuTabBarPenunjang = () => {
  const [current, setCurrent] = useState("");
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Header
      className="header"
      style={{
        height: "32px",
        padding: "0 0",
        lineHeight: "32px",
        position: "sticky",
        zIndex: 3,
        width: "100%",
        left: 0,
        top: 0,
      }}
    >
      <Menu
        style={{ lineHeight: "32px" }}
        theme="light"
        mode="horizontal"
        // defaultSelectedKeys={["menu"]}
        onClick={handleClick}
        selectedKeys={[current]}
      >
        <Menu.Item key="menu1" style={{ backgroundColor: "#ffccc7" }}>
          Menu 1
        </Menu.Item>
        <Menu.Item key="menu2" style={{ backgroundColor: "#ffd8bf" }}>
          Menu 2
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default MenuTabBarPenunjang;
