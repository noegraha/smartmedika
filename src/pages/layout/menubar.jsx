import {
  Menu,
  Popover,
  Modal,
  Space,
  ConfigProvider,
  Tag,
  message,
} from "antd";
import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ApartmentOutlined,
  ProfileOutlined,
  CommentOutlined,
  ControlOutlined,
  ExclamationCircleOutlined,
  FullscreenOutlined,
  HomeOutlined,
  SettingOutlined,
  IdcardTwoTone,
  SettingTwoTone,
  MessageTwoTone,
  LogoutOutlined,
  TeamOutlined,
  FileDoneOutlined,
  FullscreenExitOutlined,
  DatabaseOutlined,
  CloseOutlined,
  ToolOutlined,
  SolutionOutlined,
  MedicineBoxOutlined,
  ClusterOutlined,
  FileTextOutlined,
  FileOutlined,
  BarChartOutlined,
  FileProtectOutlined,
  BankOutlined,
  FormOutlined,
  CarryOutOutlined,
  FilePptOutlined,
  FundTwoTone,
  LayoutOutlined,
  FundProjectionScreenOutlined,
  PicCenterOutlined,
  SyncOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  DiffOutlined,
} from "@ant-design/icons";
import { LoginContext } from "../rawatjalan/context/LoginContext";
import { MasterPegawaiContext } from "../master/context/masterpegawai/MasterPegawaiContext";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import { PasienHDContext } from "../penunjang/hd/context/PasienHDContext";
import { UserContext } from "../appsetting/UserContext";
import { ChatContext } from "../chat/Chatcontext";
import { MasterTandaGejalaContext } from "../master/context/masteraskep/MasterTandaGejalaContext";
import { LaporanESWLContext } from "../laporan/Context/LaporanESWLContext";
import dayjs from "dayjs";
import { ResepContext } from "../rawatjalan/orderresep/ResepContext";
import Chatbot from "../../utils/chatbot";
import axios from "axios";
const { SubMenu } = Menu;
const { confirm } = Modal;
const getCurrentTime = (separator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  return `${year}${separator}${month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}`;
};
const Menubar = () => {
  const [current, setCurrent] = useState("home");
  const [fullscreen, setFS] = useState(false);
  const [visible, setVisible] = useState(false);
  const [statustext, setStatustext] = useState("PROCESSING");
  const [status, setStatus] = useState(<SyncOutlined spin />);
  const [badge, setBadge] = useState("processing");
  const API_URL = process.env.REACT_APP_API_BASE_SERVER; // Ubah jika pakai ngrok atau domain lain

  const handleVisibleChange = (newVisible) => {
    setVisible(newVisible);
    setStatustext("PROCESSING");
    setBadge("processing");
    setStatus(<SyncOutlined spin />);
    axios
      .get(`${API_URL}/models`, { timeout: 3000 })
      .then((res) => {
        setStatustext("ON");
        setStatus(<CheckCircleOutlined />);
        setBadge("success");
      })
      .catch((err) => {
        console.log(err);
        setStatustext("OFF");
        setStatus(<CloseCircleOutlined />);
        setBadge("error");
      });
  };
  const content = (
    <div style={{ width: "400px" }}>
      <Chatbot />
    </div>
  );
  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const { signOut, namauser, setflagOrderDarah, apiku } =
    useContext(LoginContext);
  const { getStatistikEswl, getDokterEswl, getKelaminEswl, getPasienEswl } =
    useContext(LaporanESWLContext);
  const { setCurpas, cariPoliUser } = useContext(PasienContext);
  const cariPasienHD = useContext(PasienHDContext);
  const { getTandagejalaSubAskep } = useContext(MasterTandaGejalaContext);
  const { getpegawaidetail } = useContext(MasterPegawaiContext);
  const {
    menuAkses,
    menuGizi,
    menuRM,
    menuHD,
    menuMaster,
    menuPnj,
    menuKemoterapi,
    menuRadioterapi,
    menuBridging,
    menuValidDarah,
    menuDiklat,
  } = useContext(UserContext);
  const { setUnitOrder } = useContext(ResepContext);
  const { ambilGrafik, ambilTotalPasien, addChatUser } =
    useContext(ChatContext);
  const data = {};
  const ambilstatistikESWL = () => {
    getStatistikEswl();
    getDokterEswl();
    getKelaminEswl();
    getPasienEswl(getCurrentTime());
  };
  const ambilstatistik = () => {
    ambilGrafik(data);
    ambilTotalPasien(data);
  };

  var elem = document.documentElement;
  function openFullscreen() {
    setFS(true);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Chrome, Safari & Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE/Edge */
      elem.msRequestFullscreen();
    }
  }
  function closeFullscreen() {
    setFS(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      /* Firefox */
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      /* Chrome, Safari and Opera */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE/Edge */
      document.msExitFullscreen();
    }
  }

  const checkUserRadioterapi = [
    "SUTARTI",
    "NUGRAHA",
    "ANI S",
    "SISWANTO",
    // "DESI W",
  ];
  const hasUserRadioterapi = checkUserRadioterapi.includes(namauser);
  const onCari = () => {
    cariPoliUser();
    setUnitOrder(null);
    setCurpas([]);
    // setModalUpdate(true);
    // getPasienByUser(namauser);
  };
  const user = sessionStorage.getItem("userId");
  const namalengkap = sessionStorage.getItem("namapetugas");
  const dataid = {
    userId: user,
    namaUser: namalengkap,
  };
  const sendId = () => {
    addChatUser(dataid);
    // insertUser(dataid);
    // console.log(dataid);
  };
  function showPromiseConfirm() {
    confirm({
      title: "Anda yakin akan keluar dari Aplikasi?",
      icon: <ExclamationCircleOutlined />,
      // content:
      //   "When clicked the OK button, this dialog will be closed after 1 second",
      onOk() {
        return new Promise((resolve, reject) => {
          setTimeout(Math.random() > 0.5 ? resolve : reject, 1000);
          window.close();
        }).catch(() => console.log("Oops errors!"));
      },
      onCancel() { },
    });
  }

  //CEK CURRENT URL
  const currentURL = new URL(window.location.href);
  const host = currentURL.host;
  const [menuRI, setMenuRI] = useState(false);
  useEffect(() => {
    // if (host !== "smart.rsmargono.id") {
    cekIP();
    // }
  }, []);

  const cekIP = () => {
    axios
      .get(`${apiku}/SisGetIP/GetIp`)
      .then((res) => {
        axios
          .get(
            `${apiku}/SisJwt/GetGroupLayananByIP/${res.data.result.currentIP}`
          )
          .then((res) => {
            // console.log(res.data.result);
            res.data.result.groupLayananId === 1 ||
              res.data.result.groupLayananId === 4 ||
              res.data.result.groupLayananId === 0 ||
              res.data.result.groupLayananId === 7
              ? setMenuRI(true)
              : setMenuRI(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  };
  return (
    <ConfigProvider
      theme={{
        components: {
          Menu: {
            horizontalLineHeight: "32px",
          },
        },
      }}
    >
      <Menu
        theme="light"
        mode="horizontal"
        onClick={handleClick}
        selectedKeys={[current]}
      >
        {/* Menu KIRI */}
        <Menu.Item key="home">
          <Link to="/">
            <HomeOutlined />
            Beranda
          </Link>
        </Menu.Item>
        <SubMenu
          style={{ marginLeft: 0 }}
          title={
            <span className="submenu-title-wrapper">
              <FileDoneOutlined />
              Transaksi
            </span>
          }
        >
          <Menu.ItemGroup title="Transaksi">
            <Menu.Item
              key="setting:1"
              onClick={onCari}
            // disabled={!menuRJ}
            >
              <Link to="/app/form/anamnesa">
                <TeamOutlined />
                Poliklinik Rawat Jalan
              </Link>
            </Menu.Item>

            <Menu.Item
              key="setting:3"
              onClick={() => {
                setflagOrderDarah(false);
              }}
            >
              {menuRI || menuMaster ? (
                <Link to="/dashboardRuangRI/ri">
                  <TeamOutlined />
                  Rawat Inap
                </Link>
              ) : (
                <div
                  onClick={() => {
                    message.warning(
                      "Maaf hanya bisa diakses di PC Rawat Inap!"
                    );
                  }}
                >
                  <TeamOutlined />
                  Rawat Inap
                </div>
              )}
            </Menu.Item>

            {namauser === "NUGRAHA" ? (
              <>
                <Menu.Item key="setting:2">
                  <Link to="/poliklinikri">
                    <TeamOutlined />
                    Poliklinik Rawat Inap
                  </Link>
                </Menu.Item>
                <Menu.Item key="setting:36">
                  <Link to="/igd">
                    <TeamOutlined />
                    IGD
                  </Link>
                </Menu.Item>
                <Menu.Item key="setting:37">
                  <Link to="/trxbarangunit">
                    <TeamOutlined />
                    Barang Unit
                  </Link>
                </Menu.Item>
              </>
            ) : (
              <></>
            )}
            {hasUserRadioterapi ? (
              <Menu.Item key="setting:38">
                <Link to="/kontrol">
                  <TeamOutlined />
                  Surat Kontrol
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )}
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          disabled={!menuPnj}
          style={{ marginLeft: 0 }}
          title={
            <span className="submenu-title-wrapper">
              <FileDoneOutlined />
              Penunjang
            </span>
          }
        >
          <Menu.ItemGroup title="Penunjang">
            {menuHD ? (
              <Menu.Item
                key="setting:10"
                disabled={!menuHD}
                onClick={cariPasienHD}
              >
                <Link
                  to="/hd"
                  onClick={() => {
                    getTandagejalaSubAskep();
                  }}
                >
                  <TeamOutlined />
                  Hemodialisa
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )}

            {menuKemoterapi ? (
              <SubMenu
                title={
                  <span className="submenu-title-wrapper">
                    <MedicineBoxOutlined />
                    Kemoterapi
                  </span>
                }
              >
                <Menu.Item key="setting:71" disabled={!menuKemoterapi}>
                  <Link to="/kemoterapi">
                    <Space>
                      <MedicineBoxOutlined />
                      <span>Laporan Kemoterapi</span>
                    </Space>
                  </Link>
                </Menu.Item>
                <Menu.Item key="setting:72" disabled={!menuKemoterapi}>
                  <Link to="/mstprotokolkemoterapi">
                    <Space>
                      <FileTextOutlined />
                      Master Protokol Kemoterapi
                    </Space>
                  </Link>
                </Menu.Item>
              </SubMenu>
            ) : (
              <></>
            )}

            {menuRadioterapi ? (
              <SubMenu
                disabled={!menuRadioterapi}
                title={
                  <span className="submenu-title-wrapper">
                    <SettingOutlined />
                    Radioterapi
                  </span>
                }
              >
                <Menu.ItemGroup title="Radioterapi">
                  <Menu.Item key="setting:73">
                    <Link to="/radioterapistatuseksterna">
                      <Space>
                        <FilePptOutlined />
                        Status Eksterna
                      </Space>
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="setting:11">
                    <Link to="/radioterapi">
                      <Space>
                        <SolutionOutlined />
                        RME Radioterapi
                      </Space>
                    </Link>
                  </Menu.Item>
                </Menu.ItemGroup>
              </SubMenu>
            ) : (
              <></>
            )}

            <SubMenu
              // disabled={!menuRadioterapi}
              title={
                <span className="submenu-title-wrapper">
                  <BankOutlined />
                  Unit Transfusi Darah (UTD)
                </span>
              }
            >
              <Menu.ItemGroup title="Unit Transfusi Darah (UTD)">
                <Menu.Item
                  key="setting:67"
                  onClick={() => {
                    setflagOrderDarah(true);
                  }}
                >
                  <Link to="/bankdarah">
                    <Space>
                      <FormOutlined />
                      Order Unit Transfusi Darah (UTD)
                    </Space>
                  </Link>
                </Menu.Item>
                {menuValidDarah ? (
                  <Menu.Item key="setting:68" disabled={!menuValidDarah}>
                    <Link to="/bankdarahpelayanan">
                      <Space>
                        <CarryOutOutlined />
                        Validasi Order Unit Transfusi Darah (UTD)
                      </Space>
                    </Link>
                  </Menu.Item>
                ) : (
                  <></>
                )}
              </Menu.ItemGroup>
            </SubMenu>

            {menuGizi ? (
              <Menu.Item key="setting:12" disabled={!menuGizi}>
                <Link to="/gizi">
                  <TeamOutlined />
                  Gizi
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )}
            {menuDiklat ? (
              <Menu.Item key="setting:40">
                <Link to="/diklat">
                  <LayoutOutlined />
                  PPDS
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )}
          </Menu.ItemGroup>
        </SubMenu>

        <SubMenu
          style={{ marginLeft: 0, float: "left" }}
          title={
            <span className="submenu-title-wrapper">
              <ProfileOutlined />
              Farmasi
            </span>
          }
          disabled={!menuMaster}
        >
          <Menu.ItemGroup title="Farmasi">
            <Menu.Item key="setting:81">
              <Link to="/farmasi">
                <ProfileOutlined />
                Transaksi Resep
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:82">
              <Link to="/returobat">
                <ProfileOutlined />
                Pengembalian Resep
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <SubMenu
          disabled={!menuDiklat}
          style={{ marginLeft: 0, float: "left" }}
          title={
            <span className="submenu-title-wrapper">
              <PicCenterOutlined />
              Pelayanan
            </span>
          }
        >
          <Menu.Item key="setting:40">
            <Link to="/diklat">
              <TeamOutlined />
              PPDS
            </Link>
          </Menu.Item>
        </SubMenu>
        <SubMenu
          style={{ marginLeft: 0, float: "left" }}
          title={
            <span className="submenu-title-wrapper">
              <ProfileOutlined />
              Laporan
            </span>
          }
        >
          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <BarChartOutlined />
                Statistik
              </span>
            }
          >
            <Menu.Item key="setting:15">
              <Link to="/laporan" onClick={ambilstatistik}>
                <ProfileOutlined />
                Statistik Pendaftaran
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:16">
              <Link to="/laporanaskep">
                <ProfileOutlined />
                Statistik Askep
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:17">
              <Link to="/laporaneswl" onClick={ambilstatistikESWL}>
                <ProfileOutlined />
                Statistik ESWL
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:18">
              <Link to="/laporanhd">
                <ProfileOutlined />
                Statistik Hemodialisa
              </Link>
            </Menu.Item>
          </SubMenu>

          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <ProfileOutlined />
                Asuhan Keperawwatan
              </span>
            }
          >
            <Menu.Item key="setting:34">
              <Link
                to="/askeppak"
                onClick={() => {
                  getpegawaidetail(namauser, dayjs().format("MM-YYYY"));
                }}
              >
                <FileOutlined />
                Logbook
              </Link>
            </Menu.Item>
            {/* <Menu.Item key="setting:39">
              <Link
                to="/kinerjaPerawat/perawat"
                onClick={() => {
                  getBawahanKaru(namauser);
                }}
              >
                <SnippetsOutlined />
                Kinerja Perawat
              </Link>
            </Menu.Item> */}
          </SubMenu>

          <SubMenu
            title={
              <span className="submenu-title-wrapper">
                <ProfileOutlined />
                DashBoard BPJS
              </span>
            }
          >
            <Menu.Item key="setting:19">
              <Link to="/dashboardantrol">
                <ProfileOutlined />
                Antrol BPJS
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:33">
              <Link to="/laporanprb">
                <ProfileOutlined />
                Laporan PRB
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:35">
              <Link to="/laporansurkon">
                <ProfileOutlined />
                Laporan Surat Kontrol
              </Link>
            </Menu.Item>
          </SubMenu>
          <Menu.Item
            key="setting:40"
          // onClick={onCari}
          // disabled={!menuRJ}
          >
            <Link to="/dashkamartt">
              <TeamOutlined />
              Laporan Kamar RI
            </Link>
          </Menu.Item>
        </SubMenu>

        <SubMenu
          style={{ marginLeft: 0 }}
          title={
            <span className="submenu-title-wrapper">
              <DatabaseOutlined />
              Rekam Medis
            </span>
          }
        >
          <Menu.ItemGroup title="Data Pasien">
            <Menu.Item key="setting:20" disabled={!menuRM}>
              <Link to="/app/masterpasien">
                <ProfileOutlined />
                Master Pasien
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:22">
              <Link to="/app/riwayatMedis">
                <ProfileOutlined />
                Riwayat Medis
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Laporan">
            <Menu.Item key="setting:23">
              <Link to="/app/rekapkunjunganrj">
                <ProfileOutlined />
                Dashboard Laporan Rawat Jalan
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup title="Askep">
            <SubMenu
              title={
                <span className="submenu-title-wrapper">
                  <ProfileOutlined />
                  Askep RM
                </span>
              }
            >
              <Menu.Item key="setting:24">
                <Link to="/app/askepData">
                  <ProfileOutlined />
                  Askep Laporan
                </Link>
              </Menu.Item>
              <Menu.Item key="setting:51">
                <Link to="/app/askepEdit">
                  <ProfileOutlined />
                  Askep Edit
                </Link>
              </Menu.Item>
            </SubMenu>
          </Menu.ItemGroup>
        </SubMenu>

        <SubMenu
          style={{ marginLeft: 0 }}
          title={
            <span className="submenu-title-wrapper">
              <MedicineBoxOutlined />
              Bridging
            </span>
          }
          disabled={!menuBridging}
        >
          <Menu.ItemGroup title="Bridging Menu">
            <Menu.Item key="setting:62">
              <Link to="/sitb">
                <Space>
                  <ClusterOutlined />
                  <span>SITB</span>
                </Space>
              </Link>
            </Menu.Item>

            <SubMenu
              // disabled={!menuRadioterapi}
              title={
                <span className="submenu-title-wrapper">
                  <Space>
                    <FileProtectOutlined />
                    <span>SatuSehat</span>
                  </Space>
                </span>
              }
            >
              <Menu.ItemGroup title="SatuSehat">
                <Menu.Item key="setting:69">
                  <Link to="/satusehat/monitorrajal">
                    <Space>
                      <FundTwoTone />
                      Dashboard Monitoring SatuSehat
                    </Space>
                  </Link>
                </Menu.Item>
                <SubMenu
                  // disabled={!menuRadioterapi}
                  title={
                    <span className="submenu-title-wrapper">
                      <Space>
                        <FileProtectOutlined />
                        <span>Know Your Customer (KYC)</span>
                      </Space>
                    </span>
                  }
                >
                  <Menu.ItemGroup title="Know Your Customer (KYC)">
                    <Menu.Item
                      key="kyc"
                      onClick={() => {
                        window.open(
                          "http://182.168.6.247:8081/",
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    >
                      <Space>
                        <TeamOutlined />
                        <span>KYC Satu Sehat</span>
                      </Space>
                    </Menu.Item>
                    <Menu.Item key="setting:70">
                      <Link to="/satusehat/pencatatankyc">
                        <Space>
                          <FundProjectionScreenOutlined />
                          <span>Pencatatan KYC</span>
                        </Space>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>

                <Menu.Item key="setting:63">
                  <Link to="/satusehat/encounter">
                    <Space>
                      <FileProtectOutlined />
                      Kirim Bundle Rawat Jalan
                    </Space>
                  </Link>
                </Menu.Item>
                <SubMenu
                  // disabled={!menuRadioterapi}
                  title={
                    <span className="submenu-title-wrapper">
                      <Space>
                        <FileProtectOutlined />
                        <span>Master SatuSehat</span>
                      </Space>
                    </span>
                  }
                >
                  <Menu.ItemGroup title="Master SatuSehat">
                    <Menu.Item key="setting:64">
                      <Link to="/satusehat/organization">
                        <Space>
                          <FileProtectOutlined />
                          Master Organization
                        </Space>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:65">
                      <Link to="/satusehat/location">
                        <Space>
                          <FileProtectOutlined />
                          Master Location
                        </Space>
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="setting:66">
                      <Link to="/satusehat/practicioner">
                        <Space>
                          <FileProtectOutlined />
                          Master Practicioner
                        </Space>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>

                <SubMenu
                  // disabled={!menuRadioterapi}
                  title={
                    <span className="submenu-title-wrapper">
                      <Space>
                        <FileProtectOutlined />
                        <span>Mapping</span>
                      </Space>
                    </span>
                  }
                >
                  <Menu.ItemGroup title="Mapping Resource">
                    <Menu.Item key="mappingloinclab">
                      <Link to="/satusehat/mappingloinclab">
                        <Space>
                          <DiffOutlined />
                          Mapping LOINC
                        </Space>
                      </Link>
                    </Menu.Item>
                  </Menu.ItemGroup>
                </SubMenu>
              </Menu.ItemGroup>
            </SubMenu>
          </Menu.ItemGroup>
        </SubMenu>
        {/* <SubMenu
          style={{ marginLeft: 0 }}
          title={
            <span className="submenu-title-wrapper">
              <MedicineBoxOutlined />
              Satu Sehat
            </span>
          }
        >
          <Menu.ItemGroup title="Satu Sehat">
            <Menu.Item
              key="kyc"
              onClick={() => {
                window.open(
                  "http://172.16.99.119:8080/",
                  "_blank",
                  "noopener,noreferrer"
                );
              }}
            >
              <TeamOutlined />
              KYC Satu Sehat
            </Menu.Item>
            <Menu.Item key="pencatatan">
              <Link to="/satusehat/kyc">
                <TeamOutlined />
                Pencatatan
              </Link>
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu> */}

        {/* Menu KANAN */}
        <SubMenu
          style={{ float: "right", marginLeft: 0, position: "fixed", right: 5 }}
          title={
            <span className="submenu-title-wrapper">
              <SettingTwoTone />
              Setting
            </span>
          }
        >
          <Menu.ItemGroup>
            <Menu.Item key="setting:25">
              <Link to="/user">
                <IdcardTwoTone />
                Account
              </Link>
            </Menu.Item>
            <Menu.Item key="setting:38">
              <Link
                to="/askeppak"
                onClick={() => {
                  getpegawaidetail(namauser, dayjs().format("MM-YYYY"));
                }}
              >
                <FileOutlined />
                Logbook
              </Link>
            </Menu.Item>
            {menuMaster ? (
              <Menu.Item key="setting:26" disabled={!menuAkses}>
                <Link to="/settingapp">
                  <ApartmentOutlined />
                  Aplication
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )}
            {menuMaster ? (
              <Menu.Item key="setting:27" disabled={!menuMaster}>
                <Link to="/master">
                  <ControlOutlined />
                  Master
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )}
            {menuMaster ? (
              <Menu.Item key="setting:28" disabled={!menuMaster}>
                <Link to="/tools/">
                  <ToolOutlined />
                  SIM Tools
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )}
            {menuMaster ? (
              <Menu.Item key="setting:30" disabled={!menuMaster}>
                <Link to="/chat" onClick={sendId}>
                  <CommentOutlined />
                  Chat
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )}
            {namauser === "NUGRAHA" ? (
              <Menu.Item key="setting:29">
                <Link to="/changelog">
                  <ExclamationCircleOutlined />
                  Change Log
                </Link>
              </Menu.Item>
            ) : (
              <></>
            )}
            <Menu.Item key="setting:31" onClick={(e) => signOut(e)}>
              <LogoutOutlined />
              <Link to="/">Logout</Link>
            </Menu.Item>
            <Menu.Item key="setting:32" onClick={showPromiseConfirm}>
              <CloseOutlined />
              Exit
            </Menu.Item>
          </Menu.ItemGroup>
        </SubMenu>
        <Menu.Item
          key="message"
          style={{
            float: "right",
            marginLeft: 0,
            position: "fixed",
            right: 75,
          }}
        >
          <Popover
            content={content}
            title={
              <>
                Chatbot AI{" "}
                <Tag icon={status} color={badge}>
                  {/* <Badge status={badge} /> */}
                  {statustext}
                </Tag>
              </>
            }
            trigger="click"
            open={visible}
            onOpenChange={handleVisibleChange}
            placement="bottomRight" // Anda bisa mengubah posisi sesuai kebutuhan
          >
            <div>
              {/* <Badge.Ribbon text="AI"> */}
              <MessageTwoTone />
              {/* </Badge.Ribbon> */}
            </div>
          </Popover>
        </Menu.Item>
        {fullscreen ? (
          <Menu.Item
            key="nofull"
            onClick={closeFullscreen}
            style={{
              float: "right",
              marginLeft: 0,
              position: "fixed",
              right: 125,
            }}
          >
            <FullscreenExitOutlined />
            Exit FullScreen
          </Menu.Item>
        ) : (
          <Menu.Item
            key="full"
            onClick={openFullscreen}
            style={{
              float: "right",
              marginLeft: 0,
              position: "fixed",
              right: 110,
            }}
          >
            <FullscreenOutlined />
            FullScreen
          </Menu.Item>
        )}
      </Menu>
    </ConfigProvider>
  );
};

export default Menubar;
