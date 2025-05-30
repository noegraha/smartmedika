import React, { Fragment, useContext, useState } from "react";
import { DatePicker, Layout, Select, Space, Spin, Tooltip } from "antd";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import TabelPasienKemoterapi from "./TabelPasienKemoterapi";
import dayjs from "dayjs";
import { KemoterapiContext } from "../context/KemoterapiContext";

const { Sider } = Layout;
const { Option } = Select;

const SidebarKemoterapi = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { lebar, refresh, penunjang } = useContext(PasienContext);
  const {
    unitId,
    setunitId,
    jnsRawat,
    setjnsRawat,
    tglOrder,
    settglOrder,
    sSearch,
    setsSearch,
    stat,
    // func
    getListOrder,
  } = useContext(KemoterapiContext);

  // const handleCari = (e) => {
  //   console.log(e);
  // };

  const unitKemoterapi = [
    {
      ruangId: "9418",
      deskripsi: "KEMOTERAPI - RSMS",
    },
  ];

  const jenisRawat = [
    {
      id: "91",
      deskripsi: "Rawat Jalan",
    },
    {
      id: "93",
      deskripsi: "Rawat Inap",
    },
  ];

  const onChangeUnit = (e) => {
    console.log(e);
    setunitId(e);
  };

  const onChangeJnsRawat = (e) => {
    setjnsRawat(e);
    let tgl = dayjs(tglOrder).format("YYYY-MM-DD");
    getListOrder(tgl, unitId, stat, "%20", e);
  };

  const changeTglOrder = (e) => {
    let tgl = dayjs(e).format("YYYY-MM-DD");
    settglOrder(dayjs(e));
    setsSearch("");
    getListOrder(tgl, unitId, stat, "%20", jnsRawat);
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

        {/* <Tooltip placement="rightTop" title="Unit Kemoterapi">
        </Tooltip> */}
        <Select
          dataSource={unitKemoterapi}
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
          {unitKemoterapi.map((d) => (
            <Option key={d.ruangId}>{d.deskripsi}</Option>
          ))}
        </Select>

        <Select
          dataSource={jenisRawat}
          value={jnsRawat}
          // showSearch
          style={{ width: "100%", marginBottom: "3px" }}
          placeholder="Pilih Jenis Rawat..."
          // optionFilterProp="children"
          onChange={(e) => onChangeJnsRawat(e)}
          // size='small'
          // filterOption={(input, option) =>
          //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
          //   0
          // }
        >
          {jenisRawat.map((d) => (
            <Option key={d.id}>{d.deskripsi}</Option>
          ))}
        </Select>

        <Space style={{ marginBottom: "3px" }}>
          <span>
            <b>Tanggal Order :</b>
          </span>
          <DatePicker
            value={tglOrder}
            onChange={(e) => changeTglOrder(e)}
            disabled={unitId && jnsRawat ? false : true}
            // size='small'
            format="DD-MM-YYYY"
            allowClear={false}
            inputReadOnly={true}
            style={{ width: "114%" }}
          />
        </Space>

        <Spin spinning={refresh} tip="Sedang memuat" style={{ opacity: 1 }}>
          <TabelPasienKemoterapi />
        </Spin>
      </Sider>
    </Fragment>
  );
};

export default SidebarKemoterapi;
