import React, { Fragment, useContext, useState } from "react";
import {
  Layout,
  Select,
  Spin,
  Button,
  Space,
  Card,
  Input,
  Tooltip,
  DatePicker,
} from "antd";
import dayjs from "dayjs";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import TabelPasienTransaksiPenunjang from "./TabelPasienPenunjang";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import { CloudDownloadOutlined } from "@ant-design/icons";

const { Sider } = Layout;
const { Option } = Select;

const SidebarTransaksiPenunjang = () => {
  const { lebar, refresh } = useContext(PasienContext);
  const {
    penunjang,
    unitId,
    setUnitId,
    tglOrder,
    settglOrder,
    setStat,
    // main
    // func
    resetDefault,
    getListOrder,
    //mst
    getRuangPenunjang,
    // dis
    setdisDelSideBar,
    // spin
    spinLoadMst,
  } = useContext(TransaksiPenunjangContext);

  const [collapsed, setCollapsed] = useState(false);
  const [sorter, setSorter] = useState("2");

  const handleCari = (e) => {
    let tgl = dayjs().format("YYYY-MM-DD");

    setUnitId(e);
    getListOrder(e, "0", tgl);
    resetDefault();
    settglOrder(dayjs());
  };

  const klikLoadUnit = () => {
    getRuangPenunjang();
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
        // width={450}
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

        <Input.Group compact>
          <Select
            dataSource={penunjang}
            showSearch
            style={{ width: "89%", marginBottom: "3px" }}
            size="small"
            placeholder="Unit Pelayanan"
            optionFilterProp="children"
            onChange={handleCari}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {penunjang.map((d) => (
              <Option key={d.ruangId}>{d.ruangId + " : " + d.deskripsi}</Option>
            ))}
          </Select>
          <Button
            onClick={() => klikLoadUnit()}
            type="primary"
            icon={<CloudDownloadOutlined />}
            loading={spinLoadMst}
            size="small"
          />
        </Input.Group>

        <Spin spinning={refresh} tip="Sedang memuat" style={{ opacity: 1 }}>
          <TabelPasienTransaksiPenunjang />
        </Spin>
      </Sider>
    </Fragment>
  );
};

export default SidebarTransaksiPenunjang;
