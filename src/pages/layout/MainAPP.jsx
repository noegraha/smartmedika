import React, { Fragment, useContext } from "react";
import { Layout, Modal, Input, Card, Row, Col, Button, message } from "antd";
import Sidebar from "../rawatjalan/sidebar";
import Menubar from "./menubar";
import Pagehead from "../rawatjalan/pagehead";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "../home/home";
import GiziApp from "../penunjang/gizi/FormGizi";
import Masterdashboard from "../master/Masterdashboard";
import SidebarRI from "../rawatinap/SidebarRI";
import { LoginContext } from "../rawatjalan/context";
import { UserSetting } from "../usersetting";
import Footerbar from "./footerbar";
import Laporan from "../laporan/Laporan";
import UserManagement from "../appsetting/UserManagement";
import Changelog from "../appsetting/Changelog";
import Antrian from "../antrian/Antrian";
import TransaksiContextProvider from "./transaksiprovider";
import TransaksiRIContextProvider from "./transaksiproviderRI";
import TransaksiHDContextProvider from "./transaksiproviderHD";
import PageheadRI from "../rawatinap/PageheadRI";
import { useIdleTimer } from "react-idle-timer";
import MasterPasien from "../rekammedis/MasterPasien";
import MasterWilayahContextProvider from "../master/context/masterwilayah/MasterWilayahContext";
import TransaksiIBSProvider from "./transaksiIBSProvider";
import MasterRuangContextProvider from "../master/context/masterreferensi/MasterRuangContext";
import MasterBedContextProvider from "../master/context/masterreferensi/MasterBedContext";
import { useHotkeys } from "react-hotkeys-hook";
import MenubarForm from "../rawatjalan/menubarform";
import FormRJ from "../rawatjalan/formrjaskep";
import Laporanaskep from "../laporan/DashboardAskep/Laporanaskep";
import BedahSentral from "../penunjang/ibs/BedahSentral";
import Penunjang from "../penunjang/Penunjang";
import PenunjangHD from "../penunjang/hdv2/pages/Hemodialisa2/Penunjang";
import DashboardESWL from "../laporan/DashboardESWL/DashboardESWL";
import DashboardHD from "../laporan/DashboardHD/DashboardHD";
import PenunjangLainnya from "../penunjang/penunjangLainnya/component/Penunjang";
import TransaksiPenunjang from "../penunjang/transaksipenunjangV2/TransaksiPenunjang";
import MenuPerawatanPasien from "../rawatinap/MenuBarRI/MenuPerawatanPasien";
import FormMenuPerawatanPasien from "../rawatinap/MenuBarRI/FormMenuPerawatanPasien";
import DahBoardRuangRI from "../rawatinap/MenuBarRI/DahBoardRuangRI";
import RiwayatMedisPasien from "../rekammedis/RiwayatMedisPasien";
import Chat from "../chat/Chat";
import FormRadioterapi from "../penunjang/radioterapi/FormRadioterapi";
import ToolsPage from "../tools/ToolsPage";
// import { useHistory } from "react-router-dom";
import SidebarKontrol from "../rawatjalan/Vclaim/SidebarKontrol";
import SuratKontrolBPJS from "../rawatjalan/Vclaim/SuratKontrolBPJS";
import DashboardAntrol from "../laporan/DashboardAntrol/DashboardAntrol";
import JadwalRadioterapi from "../penunjang/jadwalRadioterapi/JadwalRadioterapi";
import JadwalRadioterapiV2 from "../penunjang/jadwalRadioterapiV2/JadwalRadioterapiV2";
import AskepViewData from "../rekammedis/AskepViewData";
import AskepEditData from "../rekammedis/AskepEdit";
// import SyncICD from "../tools/SyncICD";
import SatuSehatOrganization from "../satusehat/masterorganization/SatuSehatOrganization";
import FormKemoterapi from "../penunjang/kemoterapi/FormKemoterapi";
import LabPatologiAnatomi from "../penunjang/labPa/LabPatologiAnatomi";
import LaporanPRB from "../laporan/LaporanPRB";
import MenuIconBar from "./MenuIconBar";
import BridgingSITB from "../bridging/sitb/BridgingSITB";
import TransaksiBarangUnit from "../inventory/transaksi/TransaksiBarangUnit";
import SatuSehatLocation from "../satusehat/masterlocation/SatuSehatLocation";
import SatuSehatPracticioner from "../satusehat/masterpracticioner/SatuSehatPracticioner";
import SatuSehatEncounter from "../satusehat/encounter/SatuSehatEncounter";
import PageHeadPak from "../askeppak/PageHead";
import LaporanPak from "../askeppak/LaporanPak";
import LayoutKinerja from "../askeppak/LayoutKinerja";
import DashboardRekapRJ from "../rekammedis/DashboardRekapRJ";
import SatuSehatEnvironment from "../satusehat/masterenvironment/SatuSehatEnvironment";
import LaporanSuratKontrol from "../laporan/DashboardBPJS/LaporanSuratKontrol";
import BankDarahOrder from "../penunjang/bankDarah/BankDarahOrder";
import BankDarahPelayanan from "../penunjang/bankDarah/BankDarahPelayanan";
import FaceDetectionComponent from "../usersetting/Faceapi";
import MainIGD from "../igd/MainIGD";
import ProtokolKemoterapi from "../penunjang/kemoterapiMasterProtokol/ProtokolKemoterapi";
import FormRadioterapiStsEksterna from "../penunjang/radioterapi/FormRadioterapiStsEksterna";
import FormTransaksiRJRI from "../rawatjalan/transaksirawatinap/FormTransaksiRJRI";
import SidebarRIRJ from "../rawatjalan/transaksirawatinap/SidebarRI";
import MonitoringSSRajal from "../satusehat/monitoringssrawatjalan/MonitoringSSRajal";
import KetersediaanTT from "../tools/KetersediaanTT";
import MainFarmasi from "../farmasi/MainFarmasi";
import KYC from "../bridging/kyc/KYC";
import MenuPendidikan from "../penunjang/Diklat/MenuPendidikan";
import KycSatusehat from "../satusehat/kyc/KycSatusehat";
import ProtectedRoute from "./ProtectedRoute";
import SatuSehatModulContextProvider from "../satusehat/componentsatusehatmodul/context/SatuSehatModulContext";
import MappingLab from "../satusehat/mapping/LOINC/MappingLab";

const { Content } = Layout;

const MainAPP = () => {
  // useBeforeunload(
  //   () => sessionStorage.removeItem("noreg"),
  //   sessionStorage.removeItem("norm")
  // );
  const { token, signOut } = useContext(LoginContext);
  // const [loading, setLoading] = useState(true);

  const handleOnIdle = (event) => {
    console.log("user is idle", event);
    console.log("last active", getLastActiveTime());
    signOut();
  };
  const handleOnActive = (event) => {
    console.log("user is active", event);
    console.log("time remaining", getRemainingTime());
  };

  const handleOnAction = (e) => {
    // console.log("user did something", e);
  };

  const { getRemainingTime, getLastActiveTime } = useIdleTimer({
    timeout: 1000 * 60 * 60,
    onIdle: handleOnIdle,
    onActive: handleOnActive,
    onAction: handleOnAction,
    debounce: 500,
  });
  const handleFocus = (e) => e.target.select();

  const copyToClipboard = () => {
    const input = document.getElementById("token-input");
    input.select();
    document.execCommand("copy");
    // Anda bisa menambahkan notifikasi atau alert di sini jika perlu
    // alert("Token copied to clipboard!");
    message.info("Copied!");
  };
  function info() {
    Modal.info({
      content: (
        <div>
          Token :{" "}
          <Input
            id="token-input"
            autoFocus
            onFocus={handleFocus}
            style={{ width: 280 }}
            value={"Bearer " + token}
          />
          <Row style={{ marginTop: "5px" }}>
            <Col span={24}>
              <Button
                onClick={copyToClipboard} // Panggil fungsi salin saat tombol diklik
                size="small"
                style={{ width: "48%" }}
              >
                Copy Token
              </Button>
              {"  "}
              <Button
                onClick={() => signOut()}
                size="small"
                style={{ width: "48%" }}
                danger
                type="primary"
              >
                Logout
              </Button>
            </Col>
          </Row>
        </div>
      ),
      onOk() { },
    });
  }
  // const history = useHistory();
  // const routeChange = () => {
  //   history.push("/#/app/form/anamnesa");
  // };
  useHotkeys("shift+t", () => info());
  // useHotkeys("shift+r", () => routeChange());
  // const [isExpired, setIsExpired] = useState(false);
  // useEffect(() => {
  //   const checkExpiration = () => {
  //     const currentTimeInSeconds = Math.floor(Date.now() / 1000);
  //     const timeOut = sessionStorage.getItem("timeOut");
  //     const timeOut2 = 1694651500;

  //     if (currentTimeInSeconds >= 1694651500) {
  //       // Expiration time is reached; log out the user or trigger the logout action here.
  //       setIsExpired(true);
  //       console.log("LOGOUT", currentTimeInSeconds, ">=", timeOut);

  //       Modal.info({
  //         title: "Token Anda telah expired",
  //         content: (
  //           <div>
  //             <p>Untuk melanjutkan silahkan login kembali. Terima kasih.</p>
  //           </div>
  //         ),
  //         onOk() {
  //           signOut();
  //         },
  //       });
  //       // You can also clear any user session or access tokens here.
  //     }
  //   };

  //   // Check the expiration status periodically (e.g., every second).
  //   const timer = setInterval(checkExpiration, 1000);

  //   return () => {
  //     // Clean up the timer when the component unmounts.
  //     clearInterval(timer);
  //   };
  // }, [isExpired, signOut]);
  if (!token) {
    return <Redirect to="/login" />;
  }
  return (
    <Fragment>
      <Router>
        <Switch>
          <Layout>
            {/* <BackTop /> */}
            <TransaksiContextProvider>
              <TransaksiRIContextProvider>

                <SatuSehatModulContextProvider>

                  <Layout>
                    <Menubar />
                    <Layout>
                      {/* Menu Utama */}
                      <Route path="/" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <Home />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu Rawat Jalan */}
                      <Route path="/app/form">
                        <Layout>
                          <Sidebar />
                          <Content
                            style={{
                              padding: 7,
                              height: "100%",
                              flexDirection: "column",
                              msFlexDirection: "column",
                              display: "flex",
                            }}
                          >
                            <Pagehead />
                            <MenubarForm />
                            <FormRJ />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu Transaksi RJRI */}
                      <ProtectedRoute
                        path="/poliklinikri"
                        component={() => (
                          <Layout>
                            <Layout>
                              <SidebarRIRJ />
                              <Content
                                style={{
                                  padding: 7,
                                  height: "100%",
                                  flexDirection: "column",
                                  msFlexDirection: "column",
                                  display: "flex",
                                }}
                              >
                                <Pagehead />
                                <FormTransaksiRJRI />
                              </Content>
                            </Layout>
                            <Footerbar />
                          </Layout>
                        )}
                        allowedRoles={["SMG"]}
                      />

                      {/* Menu IGD */}
                      <ProtectedRoute
                        path="/igd"
                        component={() => (
                          <Layout>
                            <Layout>
                              <Content
                                style={{
                                  padding: 7,
                                  height: "100%",
                                  flexDirection: "column",
                                  msFlexDirection: "column",
                                  display: "flex",
                                }}
                              >
                                <MainIGD />
                              </Content>
                            </Layout>
                            <Footerbar />
                          </Layout>
                        )}
                        allowedRoles={["SMG"]}
                      />
                      {/* <Route path="/igd">
                      <Layout>
                        <Content
                          style={{
                            padding: 7,
                            height: "100%",
                            flexDirection: "column",
                            msFlexDirection: "column",
                            display: "flex",
                          }}
                        >
                          <MainIGD />
                        </Content>
                      </Layout>
                      <Footerbar />
                    </Route> */}

                      {/* Menu Rawat Inap */}
                      <Route path="/pemeriksaanharian/ri">
                        <Layout>
                          <SidebarRI />
                          <Content
                            style={{
                              padding: 7,
                              height: "100%",
                              flexDirection: "column",
                              msFlexDirection: "column",
                              display: "flex",
                            }}
                          >
                            <PageheadRI />
                            <MenuPerawatanPasien />
                            <FormMenuPerawatanPasien />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>
                      {/* <Route path="/IMP/ri">
                      <Layout>
                        <SidebarRI />
                        <Content
                          style={{
                            padding: 7,
                            height: "100%",
                            flexDirection: "column",
                            msFlexDirection: "column",
                            display: "flex",
                          }}
                        >
                          <PageheadRI />
                          <MenuBarIMP />
                          <FormMenuIMP />
                        </Content>
                      </Layout>
                      <Footerbar />
                    </Route> */}

                      <Route path="/dashboardRuangRI/ri">
                        <Layout>
                          <SidebarRI />
                          <Content
                            style={{
                              padding: 7,
                              height: "100%",
                              flexDirection: "column",
                              msFlexDirection: "column",
                              display: "flex",
                            }}
                          >
                            <DahBoardRuangRI />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu HD */}
                      <TransaksiHDContextProvider>
                        <Route path="/hd" exact>
                          <Layout style={{ padding: "0 4px 4px" }}>
                            <Layout>
                              <Content
                                style={{
                                  background: "#fff",
                                  padding: 7,
                                  margin: "3px 3px 3px 3px",
                                  minHeight: 280,
                                }}
                              >
                                {/* <Hemodialisa /> */}
                                <PenunjangHD />
                              </Content>
                            </Layout>
                          </Layout>
                          <Footerbar />
                        </Route>
                      </TransaksiHDContextProvider>

                      <TransaksiHDContextProvider>
                        <Route path="/hdv2" exact>
                          <Layout style={{ padding: "0 4px 4px" }}>
                            <Layout>
                              <Content
                                style={{
                                  background: "#fff",
                                  padding: 7,
                                  margin: "3px 3px 3px 3px",
                                  minHeight: 280,
                                }}
                              >
                                <PenunjangHD />
                              </Content>
                            </Layout>
                          </Layout>
                          <Footerbar />
                        </Route>
                      </TransaksiHDContextProvider>

                      {/* Menu Kemoterapi */}
                      <Route path="/kemoterapi">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <FormKemoterapi />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Master Protokol Kemoterapi */}
                      <Route path="/mstprotokolkemoterapi">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <ProtokolKemoterapi />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu Laborat PA */}
                      <Route path="/labpa">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <LabPatologiAnatomi />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu Radioterapi */}
                      <Route path="/radioterapi">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <FormRadioterapi />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu Radioterapi - Status Ekternal */}
                      <Route path="/radioterapistatuseksterna">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <FormRadioterapiStsEksterna />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu Jadwal Penunjang */}
                      <Route path="/jadwalPenunjang" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                              minHeight: 280,
                            }}
                          >
                            <JadwalRadioterapi />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Penunjang Bank Darah */}
                      <Route path="/bankdarah" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                              minHeight: 280,
                            }}
                          >
                            <BankDarahOrder />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/bankdarahpelayanan" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                              minHeight: 280,
                            }}
                          >
                            <BankDarahPelayanan />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu jadwalPelPenunjang */}
                      <Route path="/jadwalPelPenunjang" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                              minHeight: 280,
                            }}
                          >
                            <JadwalRadioterapiV2 />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu Penunjang transaksi */}
                      <Route path="/trxpenunjang" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Layout>
                            <Content
                              style={{
                                background: "#fff",
                                padding: 7,
                                margin: "3px 3px 3px 3px",
                                minHeight: 280,
                              }}
                            >
                              <TransaksiPenunjang />
                            </Content>
                          </Layout>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/diklat" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Layout>
                            <Content
                              style={{
                                background: "#fff",
                                padding: 7,
                                margin: "3px 3px 3px 3px",
                                minHeight: 280,
                              }}
                            >
                              <MenuPendidikan />
                            </Content>
                          </Layout>
                        </Layout>
                      </Route>

                      {/* Menu Bridging SITB */}
                      <Route path="/sitb" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Layout>
                            <Content
                              style={{
                                background: "#fff",
                                padding: 7,
                                margin: "3px 3px 3px 3px",
                                minHeight: 280,
                              }}
                            >
                              <BridgingSITB />
                            </Content>
                          </Layout>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu Farmasi */}
                      <Route path="/farmasi" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Layout>
                            <Content
                              style={{
                                background: "#fff",
                                padding: 7,
                                margin: "3px 3px 3px 3px",
                                minHeight: 280,
                              }}
                            >
                              <MainFarmasi />
                            </Content>
                          </Layout>
                        </Layout>
                        <Footerbar />
                      </Route>

                      {/* Menu Gizi */}
                      <Route path="/gizi" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <SidebarRI />
                          <Layout>
                            <Content
                              style={{
                                background: "#fff",
                                padding: 7,
                                margin: "3px 3px 3px 3px",
                                minHeight: 280,
                              }}
                            >
                              <GiziApp />
                            </Content>
                          </Layout>
                        </Layout>
                      </Route>

                      {/* Menu IBS */}
                      <Route path="/ibs" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Layout>
                            <Content
                              style={{
                                background: "#fff",
                                padding: 7,
                                margin: "3px 3px 3px 3px",
                                minHeight: 280,
                              }}
                            >
                              <TransaksiIBSProvider>
                                <BedahSentral />
                              </TransaksiIBSProvider>
                            </Content>
                          </Layout>
                        </Layout>
                      </Route>

                      {/* Menu Penunjang Lainnya */}
                      <Route path="/penunjangLainnya" exact>
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Layout>
                            <Content
                              style={{
                                background: "#fff",
                                padding: 7,
                                margin: "3px 3px 3px 3px",
                                minHeight: 280,
                              }}
                            >
                              <PenunjangLainnya />
                            </Content>
                          </Layout>
                        </Layout>
                      </Route>

                      {/* Menu Barang Unit */}
                      <ProtectedRoute
                        path="/trxbarangunit"
                        component={() => (
                          <Layout>
                            <Layout style={{ padding: "0 4px 4px" }}>
                              <Layout>
                                <Content
                                  style={{
                                    background: "#fff",
                                    padding: 7,
                                    margin: "3px 3px 3px 3px",
                                    minHeight: 280,
                                  }}
                                >
                                  <TransaksiBarangUnit />
                                </Content>
                              </Layout>
                            </Layout>
                            <Footerbar />
                          </Layout>
                        )}
                        allowedRoles={["SMG"]}
                      />

                      <ProtectedRoute
                        path="/master"
                        component={() => (
                          <Layout>
                            <Layout style={{ padding: "0 4px 4px" }}>
                              <Content
                                style={{
                                  background: "#fff",
                                  padding: 7,
                                  margin: "3px 3px 3px 3px",
                                  minHeight: 280,
                                }}
                              >
                                <MasterWilayahContextProvider>
                                  <MasterRuangContextProvider>
                                    <MasterBedContextProvider>
                                      <Masterdashboard />
                                    </MasterBedContextProvider>
                                  </MasterRuangContextProvider>
                                </MasterWilayahContextProvider>
                              </Content>
                            </Layout>
                          </Layout>
                        )}
                        allowedRoles={["SMG"]}
                      />

                      <Route path="/user">
                        <Layout style={{ padding: "4px 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              minHeight: 280,
                              margin: "auto",
                              width: "75%",
                            }}
                          >
                            <UserSetting />
                          </Content>
                        </Layout>
                      </Route>

                      <ProtectedRoute
                        path="/tools"
                        component={() => (
                          <Layout>
                            <Layout style={{ padding: "4px 4px 4px" }}>
                              <Content
                                style={{
                                  background: "#fff",
                                  padding: 7,
                                  margin: "3px 3px 3px 3px",
                                  minHeight: 280,
                                }}
                              >
                                <ToolsPage />
                              </Content>
                            </Layout>
                          </Layout>
                        )}
                        allowedRoles={["SMG"]}
                      />

                      <Route path="/changelog">
                        <Layout style={{ padding: "4px 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                              minHeight: 280,
                            }}
                          >
                            <Changelog />
                          </Content>
                        </Layout>
                      </Route>

                      <ProtectedRoute
                        path="/settingapp"
                        component={() => (
                          <Layout>
                            <Layout style={{ padding: "4px 4px 4px" }}>
                              <Content
                                style={{
                                  background: "#fff",
                                  padding: 7,
                                  margin: "3px 3px 3px 3px",
                                  minHeight: 280,
                                }}
                              >
                                <UserManagement />
                              </Content>
                            </Layout>
                          </Layout>
                        )}
                        allowedRoles={["SMG"]}
                      />

                      <Route path="/chat">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <Chat />
                          </Content>
                        </Layout>
                      </Route>

                      <Route path="/laporan">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <Laporan />
                          </Content>
                        </Layout>
                      </Route>

                      <Route path="/laporanprb">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <LaporanPRB />
                          </Content>
                        </Layout>
                      </Route>

                      <Route path="/laporansurkon">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <LaporanSuratKontrol />
                          </Content>
                        </Layout>
                      </Route>

                      <Route path="/laporanaskep">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <Laporanaskep />
                          </Content>
                        </Layout>
                      </Route>

                      <Route path="/laporaneswl">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <DashboardESWL />
                          </Content>
                        </Layout>
                      </Route>

                      <Route path="/laporanhd">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <DashboardHD />
                          </Content>
                        </Layout>
                      </Route>

                      {/* SATU SEHAT */}
                      {/* <Route path="/organization">
                      <Layout style={{ padding: "0 4px 4px" }}>
                        <Content
                          style={{
                            background: "#fff",
                            padding: 7,
                            margin: "3px 3px 3px 3px",
                          }}
                        >
                          <SatuSehatOrganization />
                        </Content>
                      </Layout>
                      <Footerbar />
                    </Route> */}

                      <Route path="/satusehat/environment">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <SatuSehatEnvironment />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/satusehat/organization">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <SatuSehatOrganization />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/satusehat/kyc">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <KYC />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/satusehat/pencatatankyc">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <KycSatusehat />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/satusehat/location">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <SatuSehatLocation />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/satusehat/practicioner">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <SatuSehatPracticioner />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/satusehat/encounter">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <SatuSehatEncounter />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/satusehat/monitorrajal">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <MonitoringSSRajal />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/satusehat/mappingloinclab">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <MappingLab />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>

                      <Route path="/dashboardantrol">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <DashboardAntrol />
                          </Content>
                        </Layout>
                      </Route>
                      <Route path="/dashkamartt">
                        <Layout style={{ padding: "0 4px 4px" }}>
                          <Content
                            style={{
                              background: "#fff",
                              padding: 7,
                              margin: "3px 3px 3px 3px",
                            }}
                          >
                            <KetersediaanTT />
                          </Content>
                        </Layout>
                        <Footerbar />
                      </Route>
                    </Layout>
                  </Layout>

                  <Route path="/app/formdisplay">
                    <Layout style={{ padding: "0 4px 4px" }}>
                      <Content
                        style={{
                          background: "#fff",
                          padding: 7,
                          margin: "3px 3px 3px 3px",
                        }}
                      >
                        <Antrian />
                      </Content>
                    </Layout>
                    <Footerbar />
                  </Route>

                  <Route path="/app/masterpasien">
                    <Layout style={{ padding: "0 4px 4px" }}>
                      <Content
                        style={{
                          background: "#fff",
                          padding: 7,
                          margin: "3px 3px 3px 3px",
                        }}
                      >
                        <MasterWilayahContextProvider>
                          <MasterPasien />
                        </MasterWilayahContextProvider>
                      </Content>
                    </Layout>
                    <Footerbar />
                  </Route>

                  <Route path="/app/riwayatMedis">
                    <Layout style={{ padding: "0 4px 4px" }}>
                      <Content
                        style={{
                          background: "#fff",
                          padding: 7,
                          margin: "3px 3px 3px 3px",
                        }}
                      >
                        <RiwayatMedisPasien />
                      </Content>
                    </Layout>
                    <Footerbar />
                  </Route>

                  <Route path="/app/askepData">
                    <Layout style={{ padding: "0 4px 4px" }}>
                      <Content
                        style={{
                          background: "#fff",
                          padding: 7,
                          margin: "3px 3px 3px 3px",
                        }}
                      >
                        <AskepViewData />
                      </Content>
                    </Layout>
                    <Footerbar />
                  </Route>

                  <Route path="/app/askepEdit">
                    <Layout style={{ padding: "0 4px 4px" }}>
                      <Content
                        style={{
                          background: "#fff",
                          padding: 7,
                          margin: "3px 3px 3px 3px",
                        }}
                      >
                        <AskepEditData />
                      </Content>
                    </Layout>
                    <Footerbar />
                  </Route>

                  <Route path="/app/rekapkunjunganrj">
                    <Layout style={{ padding: "0 4px 4px" }}>
                      <Content
                        style={{
                          background: "#fff",
                          padding: 7,
                          margin: "3px 3px 3px 3px",
                        }}
                      >
                        <DashboardRekapRJ />
                      </Content>
                    </Layout>
                    <Footerbar />
                  </Route>

                  <Route path="/kinerjaPerawat/perawat">
                    <LayoutKinerja />
                    <Footerbar />
                  </Route>

                  <Route path="/penunjang">
                    <Layout style={{ padding: "0 4px 4px" }}>
                      <Content
                        style={{
                          background: "#fff",
                          padding: 7,
                          margin: "3px 3px 3px 3px",
                        }}
                      >
                        <Penunjang />
                      </Content>
                    </Layout>
                    <Footerbar />
                  </Route>

                  <Route path="/kontrol">
                    <Layout>
                      <SidebarKontrol />
                      <Content
                        style={{
                          padding: 7,
                          height: "100%",
                          flexDirection: "column",
                          msFlexDirection: "column",
                          display: "flex",
                        }}
                      >
                        <Pagehead />
                        <SuratKontrolBPJS />
                      </Content>
                    </Layout>
                    <Footerbar />
                  </Route>

                  <Route path="/askeppak">
                    <Layout style={{ padding: "0 4px 4px" }}>
                      <Content
                        style={{
                          background: "#fff",
                          padding: 7,
                          margin: "3px 3px 3px 3px",
                        }}
                      >
                        <PageHeadPak />
                        <LaporanPak />
                      </Content>
                    </Layout>
                    <Footerbar />
                  </Route>

                  <Route path="/faceapi">
                    <FaceDetectionComponent />
                  </Route>
                  <Route path="/app/iconbar">
                    <MenuIconBar />
                  </Route>

                </SatuSehatModulContextProvider>

              </TransaksiRIContextProvider>
            </TransaksiContextProvider>
          </Layout>
        </Switch>
      </Router>
    </Fragment>
  );
};

export default MainAPP;
