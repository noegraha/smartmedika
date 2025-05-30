import React, { Fragment, useContext, useEffect } from "react";
import { Layout, Spin, Row, Col, Button, Switch, Popover } from "antd";
import TabelpasienIGD from "./TablePasienIGD";
import { IGDContext } from "./Context/IGDContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Sider } = Layout;

const SidebarIGD = () => {
  const {
    refresh,
    layout,
    setLayout,
    lebar,
    jumlahpasien,
    collapsed,
    setCollapsed,
  } = useContext(IGDContext);

  return (
    <Fragment>
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        trigger={null}
        width={lebar}
        theme="light"
        style={{
          height: "100%",
          position: "sticky",
          top: 35,
          left: 0,
          zIndex: 2,
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 30,
            height: 38,
            position: "absolute",
            left: collapsed ? "0px" : lebar,
            top: "15px",
            backgroundColor: "black",
            color: "white",
          }}
        />
        <Row>
          <Col span={12}>
            <Button block type="default">
              Jumlah Pasien : {jumlahpasien}
            </Button>
          </Col>
          <Col span={12} style={{ alignSelf: "center", textAlign: "center" }}>
            <Popover
              placement="right"
              content={
                <div>
                  Untuk mengoptimalkan / mempercepat pengambilan data pasien,
                  <br />
                  list pasien dapat dibuat menjadi metode Paging per Halaman
                  dengan
                  <br />
                  data list pasien akan dibatasi sebanyak 15 Pasien per Halaman.
                </div>
              }
              title="Jenis List Pasien"
            >
              <Switch
                checkedChildren="Paging"
                unCheckedChildren="List Full"
                onChange={(e) => setLayout(e)}
                checked={layout}
              />
            </Popover>
          </Col>
        </Row>

        <Spin spinning={refresh} tip="Sedang memuat" style={{ opacity: 1 }}>
          <TabelpasienIGD />
        </Spin>
      </Sider>
    </Fragment>
  );
};

export default SidebarIGD;
