import React, { Fragment, useState, useContext } from "react";
import { Layout, Menu } from "antd";
import {
  UserOutlined,
  FileTextOutlined,
  LaptopOutlined,
  NotificationOutlined,
  ProfileOutlined,
  ForkOutlined,
} from "@ant-design/icons";
import MasterKategoriAskep from "./masteraskep/MasterKategoriAskep";
import MasterSubKategori from "./masteraskep/MasterSubKategori";
import MasterTandaGejala from "./masteraskep/MasterTandaGejala";
import { MasterKategoriAskepContext } from "./context/masteraskep/MasterKategoriAskepContext";
import { MasterSubKategoriContext } from "./context/masteraskep/MasterSubKategoriContext";
import { MasterTandaGejalaContext } from "./context/masteraskep/MasterTandaGejalaContext";
import { Link, HashRouter as Router, Switch, Route } from "react-router-dom";
import { MasterDiagnosaAskepContext } from "./context/masteraskep/MasterDiagnosaAskepContext";
import MasterDiagnosaAskep from "./masteraskep/MasterDiagnosaAskep";
import MasterIntervensiAskep from "./masteraskep/MasterIntervensiAskep";
import { MasterIntervensiAskepContext } from "./context/masteraskep/MasterIntervensiAskepContext";
import { MasterLuaranAskepContext } from "./context/masteraskep/MasterLuaranAskepContext";
import MasterLuaranAskep from "./masteraskep/MasterLuaranAskep";
import MasterKriteriaAskep from "./masteraskep/MasterKriteriaAskep";
import MasterImplementasiAskep from "./masteraskep/MasterImplementasiAskep";
import { MasterKriteriaAskepContext } from "./context/masteraskep/MasterKriteriaAskepContext";
import MasterProvinsi from "./masterwilayah/MasterProvinsi";
import { MasterWilayahContext } from "./context/masterwilayah/MasterWilayahContext";
import MasterKabupaten from "./masterwilayah/MasterKabupaten";
import MasterKecamatan from "./masterwilayah/MasterKecamatan";
import MasterDesa from "./masterwilayah/MasterDesa";
import MasterPegawai from "./masterpegawai/MasterPegawai";
import { MasterImplementasiAskepContext } from "./context/masteraskep/MasterImplementasiAskepContext";
import MasterPegawaiContextProvider from "./context/masterpegawai/MasterPegawaiContext";
import PegawaiContextProvider from "./context/masterpegawai/PegawaiContext";
import { MasterRuangContext } from "./context/masterreferensi/MasterRuangContext";
import { MasterBedContext } from "./context/masterreferensi/MasterBedContext";
import MasterRuang from "./masterreferesi/MasterRuang";
import MasterBed from "./masterreferesi/MasterBed";
import MasterPemeriksaPenunjang from "./masterpemeriksapenunjang/MasterPemeriksaPenunjang";
import MasterDokter from "./masterdokter/MasterDokter";
import MasterPPDS from "./masterdokter/MasterPPDS";
import { MasterPPDSContext } from "./context/MasterDokter/MasterPPDSContext";

const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const Masterdashboard = () => {
  const [current, setCurrent] = useState([]);
  const { detailMasterkategoriaskep } = useContext(MasterKategoriAskepContext);
  const { detailMasterSubkategori } = useContext(MasterSubKategoriContext);
  const { detailMasterTandaGejala } = useContext(MasterTandaGejalaContext);
  const { detailMasterdxaskep } = useContext(MasterDiagnosaAskepContext);
  const { detailMasterIntervensiaskep } = useContext(
    MasterIntervensiAskepContext
  );
  const { detailMasterLuaranaskep } = useContext(MasterLuaranAskepContext);
  const { detailMasterkriteriaaskep } = useContext(MasterKriteriaAskepContext);
  const { getProvinsi, getKabupaten, getKecamatan, getDesa } =
    useContext(MasterWilayahContext);
  const { getRuang, getKelasRawat } = useContext(MasterRuangContext);
  const { getRuang2 } = useContext(MasterBedContext);
  const { detailMasterimplementasiaskep } = useContext(
    MasterImplementasiAskepContext
  );
  const { getListPPDS } = useContext(MasterPPDSContext);
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  return (
    <Fragment>
      <Router>
        <Switch>
          <Layout>
            <Sider width={200} className="site-layout-background">
              <Menu
                mode="inline"
                // defaultSelectedKeys={['1']}
                // defaultOpenKeys={['sub1']}
                style={{ height: "100%", borderRight: 0 }}
                // defaultSelectedKeys={["1"]}
                onClick={(e) => handleClick(e)}
                selectedKeys={[current]}
              >
                <SubMenu
                  key="sub1"
                  icon={<FileTextOutlined />}
                  title="Asuhan Keperawatan"
                >
                  <Menu.Item key="10">
                    <Link
                      to="/master/kategori"
                      onClick={() => detailMasterkategoriaskep()}
                    >
                      Kategori
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="11">
                    <Link
                      to="/master/subkategori"
                      onClick={() => {
                        detailMasterSubkategori();
                        detailMasterkategoriaskep();
                      }}
                    >
                      Sub-Kategori
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="12">
                    <Link
                      to="/master/tandagejala"
                      onClick={() => {
                        detailMasterTandaGejala();
                        detailMasterdxaskep();
                      }}
                    >
                      Tanda Gejala
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="13">
                    <Link
                      to="/master/diagnosa"
                      onClick={() => {
                        detailMasterdxaskep();
                        detailMasterSubkategori();
                      }}
                    >
                      Diagnosa
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="14">
                    <Link
                      to="/master/intervensi"
                      onClick={() => {
                        detailMasterIntervensiaskep();
                        detailMasterdxaskep();
                      }}
                    >
                      Intervensi
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="15">
                    <Link
                      to="/master/luaran"
                      onClick={() => detailMasterLuaranaskep()}
                    >
                      SLKI
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="16">
                    <Link
                      to="/master/kriteria"
                      onClick={() => detailMasterkriteriaaskep()}
                    >
                      Kriteria
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="17">
                    <Link
                      to="/master/implementasi"
                      onClick={() => {
                        detailMasterimplementasiaskep();
                        detailMasterdxaskep();
                      }}
                    >
                      Implementasi
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub2"
                  icon={<LaptopOutlined />}
                  title="Master Data Wilayah Administrasi"
                >
                  <Menu.Item key="20">
                    <Link to="/master/provinsi" onClick={() => getProvinsi()}>
                      Master Provinsi
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="21">
                    <Link to="/master/kabupaten" onClick={() => getKabupaten()}>
                      Master Kabupaten
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="22">
                    <Link to="/master/kecamatan" onClick={() => getKecamatan()}>
                      Master Kecamatan
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="23">
                    <Link to="/master/desa" onClick={() => getDesa(" ")}>
                      Master Desa
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub3"
                  icon={<NotificationOutlined />}
                  title="Master Gizi"
                >
                  <Menu.Item key="30">Master Barang</Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub4"
                  icon={<UserOutlined />}
                  title="Master Pegawai"
                >
                  <Menu.Item key="40">
                    <Link to="/master/dokter">Master Dokter</Link>
                  </Menu.Item>
                  <Menu.Item key="41">
                    <Link to="/master/pegawai">Master Pegawai</Link>
                  </Menu.Item>
                  <Menu.Item key="42">
                    <Link
                      to="/master/PPDS"
                      onClick={() => {
                        // getBed(" ");
                        getListPPDS();
                      }}
                    >
                      Master PPDS
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub5"
                  icon={<ProfileOutlined />}
                  title="Master Referensi"
                >
                  <Menu.Item key="50">
                    <Link
                      to="/master/ruang"
                      onClick={() => {
                        getRuang("1");
                        getKelasRawat();
                      }}
                    >
                      Master Ruang
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="51">
                    <Link
                      to="/master/bed"
                      onClick={() => {
                        // getBed(" ");
                        getRuang2("1");
                      }}
                    >
                      Master Bed
                    </Link>
                  </Menu.Item>
                </SubMenu>
                <SubMenu
                  key="sub6"
                  icon={<ForkOutlined />}
                  title="Master Penunjang"
                >
                  <Menu.Item key="60">
                    <Link to="/master/pemeriksapenunjang">
                      Pemeriksa Penunjang
                    </Link>
                  </Menu.Item>
                </SubMenu>
              </Menu>
            </Sider>

            <Layout style={{ padding: "10px 10px 10px" }}>
              <Content
                className="site-layout-background"
                style={{
                  padding: 25,
                  minHeight: 280,
                  background: "rgb(255,255,255)",
                }}
              >
                <Route path="/master/kategori">
                  <MasterKategoriAskep />
                </Route>
                <Route path="/master/subkategori">
                  <MasterSubKategori />
                </Route>
                <Route path="/master/diagnosa">
                  <MasterDiagnosaAskep />
                </Route>
                <Route path="/master/tandagejala">
                  <MasterTandaGejala />
                </Route>
                <Route path="/master/intervensi">
                  <MasterIntervensiAskep />
                </Route>
                <Route path="/master/luaran">
                  <MasterLuaranAskep />
                </Route>
                <Route path="/master/kriteria">
                  <MasterKriteriaAskep />
                </Route>
                <Route path="/master/implementasi">
                  <MasterImplementasiAskep />
                </Route>
                <Route path="/master/provinsi">
                  <MasterProvinsi />
                  {/* <EditableTable /> */}
                </Route>
                <Route path="/master/kabupaten">
                  <MasterKabupaten />
                </Route>
                <Route path="/master/kecamatan">
                  <MasterKecamatan />
                </Route>
                <Route path="/master/desa">
                  <MasterDesa />
                </Route>
                <Route path="/master/pegawai">
                  <MasterPegawaiContextProvider>
                    <PegawaiContextProvider>
                      <MasterPegawai />
                    </PegawaiContextProvider>
                  </MasterPegawaiContextProvider>
                </Route>
                <Route path="/master/dokter">
                  <MasterDokter />
                </Route>
                <Route path="/master/PPDS">
                  <MasterPPDS />
                </Route>
                <Route path="/master/ruang">
                  <MasterRuang />
                </Route>
                <Route path="/master/bed">
                  <MasterBed />
                </Route>
                <Route path="/master/pemeriksapenunjang">
                  <MasterPemeriksaPenunjang />
                </Route>
              </Content>
            </Layout>
          </Layout>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default Masterdashboard;
