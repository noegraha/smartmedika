import React, { Fragment, useContext, useState } from "react";
import {
  Layout,
  Select,
  Spin,
  Radio,
  Row,
  Col,
  DatePicker,
  message,
  Button,
} from "antd";
import { PasienContext } from "../context/PasienContext";
import { PelayananContext } from "../context/Pelayanancontext";
import dayjs from "dayjs";
import TabelpasienKontrol from "./TabelPasienKontrol";
import axios from "axios";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
const { Sider } = Layout;
const { Option } = Select;

const SidebarKontrol = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    poli,
    poli1,
    poli2,
    setPoli2,
    ambilRuang,
    setCurpas,
    lebar,
    refresh,
    setPoli1,
    setRefresh,
    rs,
    setRS,
    listRuangPolibyRS,
    cariPasienHariIni,
    tanggal,
    setTanggal,
  } = useContext(PasienContext);
  const { loadPelayanan, setPelayanan, setKosong } =
    useContext(PelayananContext);
  const onRS = (e) => {
    listRuangPoli(e.target.value);
    setRS(e.target.value);
  };

  const [unit, setUnit] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const usr = sessionStorage.getItem("user");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const listRuangPoli = () => {
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/%20/4/${rs}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUnit(res.data.result);
        } else {
          setUnit([]);
          console.log(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        setUnit([]);
      });
  };

  function onTanggal(date, dateString) {
    setTanggal(date);
    if (poli1 == null) {
      message.warning("Silahkan Pilih Ruang Terlebih Dulu");
    } else {
      cariPasienHariIni(poli1, dayjs(date).format("YYYY-MM-DD"));
    }
  }
  const d = new Date();
  let day = d.getDay();
  const handleCari = (e) => {
    ambilRuang(e.split("+").shift());
    setRefresh(true);
    setCurpas("");
    setPoli1(e.split("+").shift());
    setPoli2(e);
    setKosong([]);
    setPelayanan([]);
    loadPelayanan(e.split("+").shift(), day + 1);
    cariPasienHariIni(
      e.split("+").shift(),
      dayjs(tanggal).format("YYYY-MM-DD")
    );
    sessionStorage.setItem("ruangan", e.split("+").shift());
    sessionStorage.setItem("RSMana", e.split("+ ").pop());
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
          <Col span={15}>
            <Radio.Group
              onChange={onRS}
              value={rs}
              buttonStyle="solid"
              defaultValue="%20"
            >
              <Radio.Button value="RSMS">RSMS</Radio.Button>
              <Radio.Button value="ABIYASA">Abiyasa</Radio.Button>
              <Radio.Button value="%20">Semua</Radio.Button>
            </Radio.Group>
          </Col>
          <Col span={9} style={{ textAlign: "right" }}>
            <DatePicker
              value={tanggal}
              onChange={onTanggal}
              style={{ width: "95px" }}
            />
          </Col>
        </Row>
        <Select
          onFocus={() => listRuangPoli()}
          // autoFocus={true}
          // loading={loadingPoli}
          value={poli2}
          dataSource={unit}
          showSearch
          style={{ width: "100%" }}
          placeholder="Pilih ruang..."
          optionFilterProp="children"
          onSelect={handleCari}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {unit.map((d) => (
            <Option
              key={d.ruangId + "+" + d.deskripsi}
              className={d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""}
            >
              {d.deskripsi}
            </Option>
          ))}
        </Select>
        <Spin spinning={refresh} tip="Sedang memuat" style={{ opacity: 1 }}>
          <TabelpasienKontrol />
        </Spin>
      </Sider>
    </Fragment>
  );
};

export default SidebarKontrol;
