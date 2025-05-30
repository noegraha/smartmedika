import React, { Fragment, useContext, useState } from "react";
import dayjs from "dayjs";
import { Layout, Select, Spin, Tooltip, Space, DatePicker, Button } from "antd";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import TabelPasienRadioterapi from "./TabelPasienRadioterapi";
import { RadioterapiContext } from "../context/RadioterapiContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Option } = Select;

const SidebarRadioterapi = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { lebar, refresh } = useContext(PasienContext);
  const {
    //state
    unitId,
    setUnitId,
    tglOrder,
    settglOrder,
    stat,
    setsSearch,
    //func
    getListOrder,
  } = useContext(RadioterapiContext);

  const unitRadioterapi = [
    {
      ruangId: "9404",
      deskripsi: "RADIOTERAPHI RSMS",
    },
  ];

  const onChangeUnit = (e) => {
    console.log(e);
    setUnitId(e);
  };

  const changeTglOrder = (e) => {
    let tgl = dayjs(e).format("YYYY-MM-DD");
    settglOrder(dayjs(e));
    setsSearch("");
    getListOrder(tgl, unitId, stat, "%20");
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
        {/* <span
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
        </span> */}

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

        <Tooltip placement="rightTop" title="Unit Radioterapi">
          <Select
            dataSource={unitRadioterapi}
            value={unitId}
            showSearch
            style={{ width: "100%", marginBottom: "3px" }}
            placeholder="Pilih Unit..."
            optionFilterProp="children"
            onChange={(e) => onChangeUnit(e)}
          // size='small'
          // filterOption={(input, option) =>
          //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
          //   0
          // }
          >
            {unitRadioterapi.map((d) => (
              <Option key={d.ruangId}>{d.deskripsi}</Option>
            ))}
          </Select>
        </Tooltip>

        <Space style={{ marginBottom: "3px" }}>
          <span>
            <b>Tanggal Order :</b>
          </span>
          <DatePicker
            value={tglOrder}
            onChange={(e) => changeTglOrder(e)}
            disabled={unitId ? false : true}
            // size='small'
            format="DD-MM-YYYY"
            allowClear={false}
            inputReadOnly={true}
            style={{ width: "118%" }}
          />
        </Space>

        <TabelPasienRadioterapi />
      </Sider>
    </Fragment>
  );
};

export default SidebarRadioterapi;
