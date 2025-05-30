import React, { Fragment, useContext, useState } from "react";
import { Button, Col, Layout, Row, Select, Spin } from "antd";
import { PasienHDContext } from "./context/PasienHDContext";
import TabelPasienHD from "./TabelPasienHD";

const { Sider } = Layout;

const SidebarHD = () => {
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const {
    cariPasienHD,
    ambilRuang,
    setCurpas,
    lebar,
    refresh,
    setRefresh,
  } = useContext(PasienHDContext);
  const handleCari = (e) => {
    setCurpas([]);
    cariPasienHD();
    ambilRuang(e);
    console.log(e);
    setButton(true);
    setRefresh(true);
  };
  const [windowRef, setWindowRef] = useState({});
  const [buttonantri, setButton] = useState(false);

  return (
    <Fragment>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        collapsible
        collapsed={collapsed}
        trigger={null}
        width={lebar}
        theme="light"
        style={{
          background: "#fff",
          height: "100%",
          position: "sticky",
          top: 42,
          left: 0,
          zIndex: 2,
        }}
      >
        <span
          className={
            "ant-layout-sider-zero-width-trigger ant-layout-sider-zero-width-trigger-left"
          }
          style={{ backgroundColor: "#001529", top: "70px", zIndex: 11 }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {/* <Button type="default" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? "Buka" : "Tutup"}
          </Button> */}
          <span role="img" aria-label="bars" className="anticon anticon-bars">
            <svg
              viewBox="0 0 1024 1024"
              focusable="false"
              data-icon="bars"
              width="1em"
              height="1em"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                style={{ color: "white" }}
                d="M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"
              ></path>
            </svg>
          </span>
        </span>
        {buttonantri === true ? (
          <Row>
            <Col span={12}>
              <Button
                type="primary"
                block
                onClick={() => {
                  let ref = window.open(
                    `${window.location.href}display`,
                    "tokenView"
                    // `left=${screen.width}, height=${screen.height}, width=${screen.width}`
                  );
                  setWindowRef(ref);
                }}
              >
                Open Antrian View
              </Button>
            </Col>
            <Col span={12}>
              <Button
                block
                type="primary"
                danger
                onClick={() => windowRef.close()}
              >
                Close Antrian View
              </Button>
            </Col>
          </Row>
        ) : null}
        <Spin spinning={refresh} tip="Sedang memuat" style={{ opacity: 1 }}>
          <TabelPasienHD />
        </Spin>
      </Sider>
    </Fragment>
  );
};

export default SidebarHD;
