import React, { Fragment, useContext, useState } from "react";
import { Layout, Select, Spin, Radio, Space } from "antd";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import TabelPasienTransaksiPenunjang from "./TabelPasienPenunjang";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";

const { Sider } = Layout;
const { Option } = Select;

const SidebarTransaksiPenunjang = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { lebar, refresh } = useContext(PasienContext);
  const { penunjang } = useContext(TransaksiPenunjangContext)
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
        // width={lebar}
        width={450}
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
        <Select
          dataSource={penunjang}
          showSearch
          style={{ width: "100%" }}
          placeholder="Unit Pelayanan"
          optionFilterProp="children"
          onChange={handleCari}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {penunjang.map((d) => (
            <Option key={d.ruangId}>{d.ruangId} - {d.deskripsi}</Option>
          ))}
        </Select>
        <Radio.Group
        // onChange={onChange} 
        // value={value}
        >
          <Space>
            <Radio value={1}>Status Order</Radio>
            <Radio value={2}>Status Valid</Radio>
          </Space>
        </Radio.Group>
        <Spin spinning={refresh} tip="Sedang memuat" style={{ opacity: 1 }}>
          <TabelPasienTransaksiPenunjang />
        </Spin>
      </Sider>
    </Fragment>
  );
};

export default SidebarTransaksiPenunjang;
