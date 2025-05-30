import { Menu, Layout, Result, Alert, Tabs, Card } from "antd";
import React, { useContext } from "react";
import { LoginContext } from "../rawatjalan/context";
import BatalAlihRawat from "./BatalAlihRawat";
import CatatanMedisDouble from "./CatatanMedisDouble";
import CekBillingSinkron from "./CekBillingSinkron";
import DeleteDiagnosaAskep from "./DeleteDiagnosaAskep";
import EditIntervensiAskep from "./EditIntervensiAskep";
import ListIP from "./ListIP";
import ListLogBookUser from "./ListLogBookUser";
import MasterUser from "./MasterUser";
import PasienAllHariIni from "./PasienAllHariIni";
import SendMessageBoardcast from "./SendMessageBoardcast";
import {
  AppstoreOutlined,
  SettingOutlined,
  BankOutlined,
} from "@ant-design/icons";
import { Link, Route } from "react-router-dom";
import MasterSwagger from "./MasterSwagger";
import SyncICD from "./SyncICD";
import SyncPembayaran from "./SyncPembayaran";
import BalikRuang from "./BalikRuang";
import ListAntal from "./ListAntal";
import MasterTindakanLain from "./MasterTindakanLain";
import DashboardPasienEror from "./DashPasienEror";
import KetersediaanTT from "./KetersediaanTT";
import FaceEnrollment from "./FaceEnrollment";
import FaceRecognition from "./FaceRecognition";
import FaceRecognitionCopy from "./FaceRecognitioncopy";
import MasterGroupAntrian from "../appsetting/MasterGroupAntrian";
import Billing from "./Billing";
import PasienTele from "./PasienTele";
const { TabPane } = Tabs;
const { SubMenu } = Menu;
const { Content, Sider } = Layout;
const ToolsPage = () => {
  const { namauser } = useContext(LoginContext);
  const handleClick = (e) => {
    console.log("click ", e);
  };
  return (
    <div>
      <Layout>
        <Sider width={200} style={{ backgroundColor: "white" }}>
          <Menu
            theme="light"
            onClick={handleClick}
            style={{ width: 200 }}
            defaultOpenKeys={["sub1"]}
            mode="inline"
          >
            <SubMenu key="sub1" icon={<BankOutlined />} title="Rawat Jalan">
              <Menu.Item key="1">
                <Link to="/tools/batalalih">Batal Alih Rawat</Link>
              </Menu.Item>
              <Menu.Item key="2">
                <Link to="/tools/cttnmedis">Catatan Medis Double</Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Link to="/tools/pasienall">Pasien All Hari Ini</Link>
              </Menu.Item>

              <Menu.Item key="5">
                <Link to="/tools/syncicd">Sinkron Master ICD</Link>
              </Menu.Item>
              <Menu.Item key="15">
                <Link to="/tools/balikruang">Balik Ruang</Link>
              </Menu.Item>
              <Menu.Item key="20">
                <Link to="/tools/listantal">List Antal</Link>
              </Menu.Item>
              {namauser === "NUGRAHA" ? (
                <>
                  <Menu.Item key="14">
                    <Link to="/tools/bill">Billing</Link>
                  </Menu.Item>
                  <Menu.Item key="16">
                    <Link to="/tools/tele">Telemedicine</Link>
                  </Menu.Item>
                </>
              ) : (
                <></>
              )}
              <Menu.Item key="18">
                <Link to="/tools/penunjanglain">Master Penunjang Lain</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub2" icon={<AppstoreOutlined />} title="Askep">
              <Menu.Item key="6">
                <Link to="/tools/diagaskep">Diagnosa Askep</Link>
              </Menu.Item>
              <Menu.Item key="7">
                <Link to="/tools/interaskep">Intervensi Askep</Link>
              </Menu.Item>
              <Menu.Item key="8">
                <Link to="/tools/logbook">Log Book</Link>
              </Menu.Item>
            </SubMenu>
            <SubMenu key="sub4" icon={<SettingOutlined />} title="Sistem">
              {namauser === "NUGRAHA" ? (
                <Menu.Item key="9">
                  <Link to="/tools/broadcast">Broadcast Pesan</Link>
                </Menu.Item>
              ) : (
                <></>
              )}
              <Menu.Item key="4">
                <Link to="/tools/billsink">Sinkron Billing</Link>
              </Menu.Item>
              <Menu.Item key="10">
                <Link to="/tools/masteruser">Master User</Link>
              </Menu.Item>
              <Menu.Item key="20">
                <Link to="/tools/grupantrian">Master Group Antrian</Link>
              </Menu.Item>
              <Menu.Item key="11">
                <Link to="/tools/listip">List IP</Link>
              </Menu.Item>
              {namauser === "NUGRAHA" ? (
                <Menu.Item key="12">
                  <Link to="/tools/swagger">Master Swagger</Link>
                </Menu.Item>
              ) : (
                <></>
              )}
              <Menu.Item key="13">
                <Link to="/tools/sync">Sinkronisasi</Link>
              </Menu.Item>
              <Menu.Item key="19">
                <Link to="/tools/recordface">Enroll Face</Link>
              </Menu.Item>
            </SubMenu>
          </Menu>
        </Sider>

        <Layout style={{ padding: "0 10 10" }}>
          <Content
            style={{
              padding: 10,
              margin: 0,
              minHeight: 500,
            }}
          >
            <Route path="/tools/batalalih" exact>
              <BatalAlihRawat />
            </Route>
            <Route path="/tools/recordface" exact>
              <Tabs defaultActiveKey="1" tabPosition="left" type="card">
                <TabPane tab="Daftar Wajah" key="1">
                  <FaceEnrollment />
                </TabPane>
                <TabPane tab="enroll" key="2">
                  <h1>Deteksi dari hasil enroll</h1>
                  <FaceRecognitionCopy />
                </TabPane>
                <TabPane tab="simpeg" key="3">
                  <h1>Deteksi dengan foto dari master dimpeg</h1>
                  <FaceRecognition />
                </TabPane>
              </Tabs>
            </Route>
            <Route path="/tools/pasienall" exact>
              <PasienAllHariIni />
            </Route>
            <Route path="/tools/cttnmedis" exact>
              <CatatanMedisDouble />
            </Route>
            <Route path="/tools/billsink" exact>
              <CekBillingSinkron />
            </Route>
            <Route path="/tools/diagaskep" exact>
              <DeleteDiagnosaAskep />
            </Route>
            <Route path="/tools/interaskep" exact>
              <EditIntervensiAskep />
            </Route>
            <Route path="/tools/logbook" exact>
              <ListLogBookUser />
            </Route>
            <Route path="/tools/broadcast" exact>
              <SendMessageBoardcast />
            </Route>
            <Route path="/tools/masteruser" exact>
              <MasterUser />
            </Route>
            <Route path="/tools/listip" exact>
              <ListIP />
            </Route>
            <Route path="/tools/syncicd" exact>
              <SyncICD />
            </Route>
            <Route path="/tools/swagger" exact>
              <MasterSwagger />
            </Route>
            <Route path="/tools/sync" exact>
              <SyncPembayaran />
            </Route>
            <Route path="/tools/bill" exact>
              <Billing />
            </Route>
            <Route path="/tools/balikruang" exact>
              <BalikRuang />
            </Route>
            <Route path="/tools/tele" exact>
              <PasienTele />
            </Route>
            <Route path="/tools/listantal" exact>
              <Card size="small">
                <Tabs defaultActiveKey="1">
                  <TabPane tab="ANTAL RI" key="1">
                    <ListAntal />
                  </TabPane>
                  <TabPane tab="PASIEN NYANTOL" key="2">
                    <DashboardPasienEror />
                  </TabPane>
                  <TabPane tab="Dashboard TT" key="3">
                    <KetersediaanTT />
                  </TabPane>
                </Tabs>
              </Card>
            </Route>
            <Route path="/tools/penunjanglain" exact>
              <MasterTindakanLain />
            </Route>
            <Route path="/tools/grupantrian" exact>
              <MasterGroupAntrian />
            </Route>
            <Route path="/tools/" exact>
              <Result
                title="Welcome to SIM Tools"
                extra={<Alert message="Pilih Menu Disamping" />}
              />
            </Route>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default ToolsPage;
