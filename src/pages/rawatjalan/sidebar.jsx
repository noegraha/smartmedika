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
  // Form,
  Button,
  Switch,
  Popover,
  // Button,
} from "antd";
import Tabelpasien from "./tabelpasien";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import { PelayananContext } from "../rawatjalan/context/Pelayanancontext";
import dayjs from "dayjs";
import { LoginContext } from "./context";
import { ResepContext } from "./orderresep/ResepContext";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { BankDarahContext } from "../penunjang/bankDarah/context/BankDarahContext";
const { Sider } = Layout;
const { Option } = Select;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const { setUnitOrder } = useContext(ResepContext);
  const {
    poli,
    poli1,
    poli2,
    setPoli2,
    // cariPasienPoli,
    setRuangasal,
    // ambilRuang,
    setCurpas,
    lebar,
    refresh,
    setPoli1,
    rs,
    setRS,
    listRuangPolibyRS,
    cariPasienHariIni,
    tanggal,
    setTanggal,
    jumlahpasien,
    // getPasienByUser,
    // setLoading,
    // setOpen,
    layout,
    setLayout,
    setCurrentt,
  } = useContext(PasienContext);
  const { loadPelayanan, setPelayanan, setKosong } =
    useContext(PelayananContext);
  const {
    loadingPoli,
    pegawai,
    // namauser
  } = useContext(LoginContext);
  const { setruangId } = useContext(BankDarahContext);
  // const fs = poli[0];
  const onRS = (e) => {
    listRuangPolibyRS(e.target.value);
    setRS(e.target.value);
  };

  const onTanggal = (date, dateString) => {
    // console.log(date, dateString);
    // console.log(dayjs(date).format("YYYY-MM-DD"));

    setTanggal(date);
    if (poli1 == null) {
      message.warning("Silahkan Pilih Ruang Terlebih Dulu");
    } else {
      cariPasienHariIni(poli1, dayjs(dateString).format("YYYY-MM-DD"));
      // console.log(dayjs(date).format("YYYY-MM-DD"));
    }
  };
  //check ruang apotik reguler abiyasa
  const checkFor = ["9113", "9114", "9105", "91A3", "91A8"];

  const d = new Date();
  let day = d.getDay();
  const handleCari = (e) => {
    setCurpas("");
    setPoli1(e.split("+").shift());
    setPoli2(e);
    setruangId(e.split("+").shift());
    setKosong([]);
    setPelayanan([]);
    setCurrentt(1);
    loadPelayanan(e.split("+").shift(), day + 1);
    setRuangasal(e.split("+").shift());
    cariPasienHariIni(
      e.split("+").shift(),
      dayjs(tanggal).format("YYYY-MM-DD")
    );
    sessionStorage.setItem("ruangan", e.split("+").shift());
    pegawai !== null
      ? pegawai.slice(0, 1) === "D"
        ? e.split("- ").pop() === "RSMS" &&
          checkFor.includes(e.split("+").shift())
          ? setUnitOrder("9251")
          : e.split("- ").pop() === "ABIYASA"
          ? setUnitOrder("9251")
          : setUnitOrder("9214")
        : setUnitOrder(null)
      : setUnitOrder(null);
    sessionStorage.setItem("RSMana", e.split("- ").pop());
  };
  return (
    <Fragment>
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        // onCollapse={onCollapse}
        collapsedWidth={0}
        trigger={null}
        width={lebar}
        theme="light"
        style={{
          // background: '#fff',
          // overflow: "auto",
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
          autoFocus={true}
          loading={loadingPoli}
          value={poli2}
          dataSource={poli}
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
          {poli.map((d) => (
            <Option
              key={d.ruangId + "+" + d.deskripsi}
              className={d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""}
            >
              {d.deskripsi}
            </Option>
          ))}
        </Select>
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
          <Tabelpasien />
        </Spin>
      </Sider>
    </Fragment>
  );
};

export default Sidebar;
