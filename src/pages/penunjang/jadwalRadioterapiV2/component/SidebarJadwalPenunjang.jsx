/* eslint-disable no-self-assign */
import React, { Fragment, useContext, useState } from "react";
import {
  Layout,
  Select,
  Table,
  Input,
  Spin,
  Button,
  Space,
  Card,
  Tooltip,
  DatePicker,
  Row,
  Col,
  Descriptions,
} from "antd";
import { SyncOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import { JadwalPenunjangContext } from "../context/JadwalPenunjangContext";

const { Sider } = Layout;
const { Option } = Select;

const SidebarJadwalPenunjang = () => {
  const { lebar, refresh } = useContext(PasienContext);
  const {
    // main
    unitId,
    setunitId,
    tglAwal,
    settglAwal,
    tglAkhir,
    settglAkhir,
    bln,
    setbln,
    listCount,
    setlistJadwal,
    setlistCount,
    // mst
    penunjang,
    setoptPemeriksaan,
    // func
    getInformasi,
    // spin
    spinInfoJadwal,
  } = useContext(JadwalPenunjangContext);

  const [collapsed, setCollapsed] = useState(false);
  const [sorter, setSorter] = useState("2");

  const columns = [
    {
      title: "Tgl",
      dataIndex: "TglOperasi",
      key: "TglOperasi",
      align: "center",
      width: 20,
      render: (text) => <div>{dayjs(text).format("DD")}</div>,
    },
    {
      title: "Jenis",
      dataIndex: "KodeTindakan",
      key: "KodeTindakan",
      align: "center",
      ellipsis: true,
      width: 90,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Jml",
      dataIndex: "Jumlah",
      key: "Jumlah",
      align: "center",
      width: 30,
      render: (text) => <div>{text}</div>,
    },
  ];

  const data = [];
  for (let i = 0; i < 200; i++) {
    data.push({
      key: i,
      TglPelayanan: i + 1,
      JnsPelayanan: "Konvensional + Kontras",
      Jumlah: 99,
    });
  }

  const changeUnit = (e) => {
    setunitId(e);
    setlistJadwal([]);
    setlistCount([]);
    setoptPemeriksaan([]);
    settglAwal(dayjs());
    settglAkhir(dayjs());
  };

  const changeBln = (e) => {
    // console.log('Bulan', dayjs(e).format('MM-YYYY'));
    setbln(e);
    getInformasi(unitId, dayjs(e).format("YYYY-MM"));
  };

  const klikBln = () => {
    getInformasi(unitId, dayjs(bln).format("YYYY-MM"));
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

        <Card
          title="JADWAL PENUNJANG MEDIS"
          size="small"
          headStyle={{ backgroundColor: "#FFADAD" }}
        >
          {/* <Input.Group compact>
            <Button
              onClick={() => klikLoadUnit()}
              type="primary"
              icon={<CloudDownloadOutlined />}
              loading={spinLoadMst}
              size="small"
              style={{ width: '11%' }} />
          </Input.Group> */}

          {/* <Space style={{ marginBottom: '3px' }}>
            
          </Space> */}

          <span>
            <b>Unit Pelayanan :</b>
          </span>
          <Select
            dataSource={penunjang}
            value={unitId}
            showSearch
            style={{ width: "100%", marginBottom: "3px" }}
            size="small"
            placeholder="Unit Pelayanan"
            optionFilterProp="children"
            onChange={(e) => changeUnit(e)}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {penunjang.map((d) => (
              <Option key={d.ruangId}>{d.ruangId + " - " + d.deskripsi}</Option>
            ))}
          </Select>

          <hr />

          <span>
            <b>Informasi Jadwal :</b>
          </span>

          <Input.Group compact>
            <DatePicker
              value={bln}
              onChange={(e) => changeBln(e)}
              disabled={unitId ? false : true}
              // disabled
              size="small"
              picker="month"
              format={"MM-YYYY"}
              allowClear={false}
              inputReadOnly={true}
              style={{ width: "90%", marginBottom: "3px" }}
            />
            <Button
              onClick={() => klikBln()}
              disabled={unitId ? false : true}
              // disabled
              type="primary"
              size="small"
              icon={<SyncOutlined />}
            />
          </Input.Group>

          <Table
            dataSource={listCount}
            columns={columns}
            bordered
            loading={spinInfoJadwal}
            pagination={false}
            size="small"
            // className="RCM_two_level_table1"
            // rowClassName={(record, index) => (
            //   record.Status === '1' ? 'terjadwal' :
            //     record.Status === '2' ? 'terlayani' :
            //       ''
            // )}
            scroll={{ y: 390 }}
            style={{ height: 430 }}
          />
        </Card>
      </Sider>
    </Fragment>
  );
};

export default SidebarJadwalPenunjang;
