import React, { Fragment, useContext, useState } from "react";
import { Layout, Select, Spin } from "antd";
import { PasienContext } from "../../../../rawatjalan/context/PasienContext";
import TabelPasienPenunjangHD from "./TabelPasienPenunjang";

const { Sider } = Layout;
const { Option } = Select;

const SidebarPenunjangHD = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { lebar, refresh, penunjang } = useContext(PasienContext);
  const handleCari = (e) => {
    console.log(e);
  };
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
        <span
          className={
            "ant-layout-sider-zero-width-trigger ant-layout-sider-zero-width-trigger-left"
          }
          style={{ backgroundColor: "#001529", top: "1px", zIndex: 11 }}
          onClick={() => setCollapsed(!collapsed)}
        >
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
        <Spin spinning={refresh} tip="Sedang memuat" style={{ opacity: 1 }}>
          <TabelPasienPenunjangHD />
        </Spin>
      </Sider>
    </Fragment>
  );
};

export default SidebarPenunjangHD;
