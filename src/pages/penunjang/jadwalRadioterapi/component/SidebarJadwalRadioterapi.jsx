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
  Row,
  Col,
  Descriptions,
} from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import { JadwalRadioterapiContext } from "../context/JadwalRadioterapiContext";

const { Sider } = Layout;
const { Option } = Select;

const SidebarJadwalRadioterapi = () => {
  const { lebar, refresh } = useContext(PasienContext);
  const {
    unitId,
    tglOrder,
    settglOrder,
    maxAnt,
    // spin
    spinLoadMst,
    // mst
    // func
    getListOrder,
    getMaxAntrian,
  } = useContext(JadwalRadioterapiContext);

  const [collapsed, setCollapsed] = useState(false);
  const [sorter, setSorter] = useState("2");

  // const handleCari = (e) => {
  //   let tgl = dayjs().format('DD-MM-YYYY')

  //   setUnitId(e)
  //   // getListOrder(e, '', 0, tgl)
  //   // resetDefault()
  //   // settglOrder(dayjs())
  // };

  // const klikLoadUnit = () => {
  //   getRuangPenunjang();
  // }

  const changeTglOrder = async (e) => {
    let tgl = dayjs(e).format("YYYY-MM-DD");
    settglOrder(dayjs(e));
    getListOrder(tgl, unitId, "");
    getMaxAntrian(tgl);
    // setStat('0')
    // setdisDelSideBar(false)
  };

  const klikRefresh = async () => {
    getListOrder(tglOrder, unitId, "");
    getMaxAntrian(tglOrder);
  };

  const data = [
    {
      noAntrian: "A-0001",
      jamAwal: "07:00",
      jamAkhir: "08:00",
    },
    {
      noAntrian: "B-0001",
      jamAwal: "07:00",
      jamAkhir: "08:00",
    },
    {
      noAntrian: "C-0001",
      jamAwal: "07:00",
      jamAkhir: "08:00",
    },
    {
      noAntrian: "D-0001",
      jamAwal: "07:00",
      jamAkhir: "08:00",
    },
    {
      noAntrian: "E-0001",
      jamAwal: "07:00",
      jamAkhir: "08:00",
    },
  ];

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
          title="JADWAL RADIOTERAPI"
          size="small"
          headStyle={{ backgroundColor: "#FFADAD" }}
        >
          {/* <Input.Group compact>
            <Select
              dataSource={penunjang}
              showSearch
              style={{ width: "89%", marginBottom: '3px' }}
              size='small'
              placeholder="Unit Pelayanan"
              optionFilterProp="children"
              onChange={handleCari}
              filterOption={(input, option) =>
                option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {penunjang.map((d) => (
                <Option key={d.ruangId}>{d.ruangId + " - " + d.deskripsi}</Option>
              ))}
            </Select>
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
            <b>Tanggal Order :</b>
          </span>
          <DatePicker
            value={tglOrder}
            onChange={(e) => changeTglOrder(e)}
            disabled={unitId ? false : true}
            size="small"
            format="DD-MM-YYYY"
            allowClear={false}
            inputReadOnly={true}
            style={{ width: "100%", marginBottom: "3px" }}
          />

          <Button
            onClick={() => klikRefresh()}
            type="primary"
            size="small"
            style={{ width: "100%" }}
          >
            Refresh
          </Button>

          <span>
            <b>
              <u>Keterangan Warna :</u>
            </b>
          </span>
          <Row style={{ marginBottom: "2px" }}>
            <Col
              span={4}
              style={{
                backgroundColor: "#ffffff",
                border: "1px solid #595959",
              }}
            ></Col>
            <Col span={20}>
              <span style={{ marginLeft: "5px" }}>
                <b>: Belum terjadwal </b>
              </span>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col
              span={4}
              style={{
                backgroundColor: "#40a9ff",
                border: "1px solid #595959",
              }}
            ></Col>
            <Col span={20}>
              <span style={{ marginLeft: "5px" }}>
                <b>: Terjadwal</b>
              </span>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col
              span={4}
              style={{
                backgroundColor: "#95de64",
                border: "1px solid #595959",
              }}
            ></Col>
            <Col span={20}>
              <span style={{ marginLeft: "5px" }}>
                <b>: Terlayani</b>
              </span>
            </Col>
          </Row>

          <hr style={{ marginTop: 15 }} />

          {maxAnt.map((arr, i) => (
            <Descriptions size="small" bordered style={{ marginTop: 5 }}>
              <Descriptions.Item label="No. Antrian" span={3}>
                <b>{arr.NoAntrian}</b>
              </Descriptions.Item>
              <Descriptions.Item label="Waktu Akhir" span={3}>
                {dayjs(arr.JamAwal).format("HH:mm")} -{" "}
                {dayjs(arr.JamAkhir).format("HH:mm")}
              </Descriptions.Item>
            </Descriptions>
          ))}
        </Card>
      </Sider>
    </Fragment>
  );
};

export default SidebarJadwalRadioterapi;
