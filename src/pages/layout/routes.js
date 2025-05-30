import React from "react";
import { Layout } from "antd";
import Home from "../home/home";
import FormRJ from "../rawatjalan/formrjaskep";
import Sidebar from "../rawatjalan/sidebar";
import Pagehead from "../rawatjalan/pagehead";
import MenubarForm from "../rawatjalan/menubarform";
import SidebarRI from "../rawatinap/SidebarRI";
import SidebarRIRJ from "../rawatjalan/transaksirawatinap/SidebarRI";
import SidebarKontrol from "../rawatjalan/Vclaim/SidebarKontrol";
import FormTransaksiRJRI from "../rawatjalan/transaksirawatinap/FormTransaksiRJRI";
import MainIGD from "../igd/MainIGD";
import FormMenuPerawatanPasien from "../rawatinap/MenuBarRI/FormMenuPerawatanPasien";
import DahBoardRuangRI from "../rawatinap/MenuBarRI/DahBoardRuangRI";
import PenunjangHD from "../penunjang/hdv2/pages/Hemodialisa2/Penunjang";
import FormKemoterapi from "../penunjang/kemoterapi/FormKemoterapi";
import ProtokolKemoterapi from "../penunjang/kemoterapiMasterProtokol/ProtokolKemoterapi";
import LabPatologiAnatomi from "../penunjang/labPa/LabPatologiAnatomi";
import FormRadioterapi from "../penunjang/radioterapi/FormRadioterapi";
import FormRadioterapiStsEksterna from "../penunjang/radioterapi/FormRadioterapiStsEksterna";
import JadwalRadioterapi from "../penunjang/jadwalRadioterapi/JadwalRadioterapi";
import BankDarahOrder from "../penunjang/bankDarah/BankDarahOrder";
import BankDarahPelayanan from "../penunjang/bankDarah/BankDarahPelayanan";
import JadwalRadioterapiV2 from "../penunjang/jadwalRadioterapiV2/JadwalRadioterapiV2";
import TransaksiPenunjang from "../penunjang/transaksipenunjangV2/TransaksiPenunjang";
import MenuPendidikan from "../penunjang/Diklat/MenuPendidikan";
import BridgingSITB from "../bridging/sitb/BridgingSITB";
import MainFarmasi from "../farmasi/MainFarmasi";
import GiziApp from "../penunjang/gizi/FormGizi";
import BedahSentral from "../penunjang/ibs/BedahSentral";
import PenunjangLainnya from "../penunjang/penunjangLainnya/component/Penunjang";
import TransaksiBarangUnit from "../inventory/transaksi/TransaksiBarangUnit";
import Masterdashboard from "../master/Masterdashboard";
import { UserSetting } from "../usersetting";
import ToolsPage from "../tools/ToolsPage";
import Changelog from "../appsetting/Changelog";
import UserManagement from "../appsetting/UserManagement";
import Chat from "../chat/Chat";
import Laporan from "../laporan/Laporan";
import LaporanPRB from "../laporan/LaporanPRB";
import LaporanSuratKontrol from "../laporan/DashboardBPJS/LaporanSuratKontrol";
import Laporanaskep from "../laporan/DashboardAskep/Laporanaskep";
import DashboardESWL from "../laporan/DashboardESWL/DashboardESWL";
import DashboardHD from "../laporan/DashboardHD/DashboardHD";
import SatuSehatEnvironment from "../satusehat/masterenvironment/SatuSehatEnvironment";
import SatuSehatOrganization from "../satusehat/masterorganization/SatuSehatOrganization";
import KYC from "../bridging/kyc/KYC";
import KycSatusehat from "../satusehat/kyc/KycSatusehat";
import SatuSehatLocation from "../satusehat/masterlocation/SatuSehatLocation";
import SatuSehatPracticioner from "../satusehat/masterpracticioner/SatuSehatPracticioner";
import SatuSehatEncounter from "../satusehat/encounter/SatuSehatEncounter";
import MonitoringSSRajal from "../satusehat/monitoringssrawatjalan/MonitoringSSRajal";
import DashboardAntrol from "../laporan/DashboardAntrol/DashboardAntrol";
import KetersediaanTT from "../tools/KetersediaanTT";
import Antrian from "../antrian/Antrian";
import MasterPasien from "../rekammedis/MasterPasien";
import RiwayatMedisPasien from "../rekammedis/RiwayatMedisPasien";
import AskepViewData from "../rekammedis/AskepViewData";
import AskepEditData from "../rekammedis/AskepEdit";
import DashboardRekapRJ from "../rekammedis/DashboardRekapRJ";
import LayoutKinerja from "../askeppak/LayoutKinerja";
import Penunjang from "../penunjang/Penunjang";
import SuratKontrolBPJS from "../rawatjalan/Vclaim/SuratKontrolBPJS";
import LaporanPak from "../askeppak/LaporanPak";
import PageHeadPak from "../askeppak/PageHead";
import FaceDetectionComponent from "../usersetting/Faceapi";
import MenuIconBar from "./MenuIconBar";
import MasterWilayahContextProvider from "../master/context/masterwilayah/MasterWilayahContext";
import MasterRuangContextProvider from "../master/context/masterreferensi/MasterRuangContext";
import MasterBedContextProvider from "../master/context/masterreferensi/MasterBedContext";

export const routes = [
  { path: "/", exact: true, component: Home },
  {
    path: "/app/form",
    component: () => (
      <>
        <Pagehead />
        <MenubarForm />
        <FormRJ />
      </>
    ),
    layout: ({ children }) => (
      <Layout>
        <Sidebar />
        {children}
      </Layout>
    ),
    footer: true,
  },
  {
    path: "/poliklinikri",
    component: FormTransaksiRJRI,
    layout: ({ children }) => (
      <Layout>
        <SidebarRIRJ />
        {children}
      </Layout>
    ),
    protected: true,
    allowedRoles: ["SMG"],
    footer: true,
  },
  { path: "/igd", component: MainIGD, footer: true },
  {
    path: "/pemeriksaanharian/ri",
    component: FormMenuPerawatanPasien,
    layout: ({ children }) => (
      <Layout>
        <SidebarRI />
        {children}
      </Layout>
    ),
    footer: true,
  },
  {
    path: "/dashboardRuangRI/ri",
    component: DahBoardRuangRI,
    layout: ({ children }) => (
      <Layout>
        <SidebarRI />
        {children}
      </Layout>
    ),
    footer: true,
  },
  {
    path: "/hd",
    component: PenunjangHD,
    providers: ["TransaksiHDContextProvider"],
    footer: true,
  },
  { path: "/kemoterapi", component: FormKemoterapi },
  { path: "/mstprotokolkemoterapi", component: ProtokolKemoterapi },
  { path: "/labpa", component: LabPatologiAnatomi },
  { path: "/radioterapi", component: FormRadioterapi },
  { path: "/radioterapistatuseksterna", component: FormRadioterapiStsEksterna },
  { path: "/jadwalPenunjang", component: JadwalRadioterapi },
  { path: "/bankdarah", component: BankDarahOrder },
  { path: "/bankdarahpelayanan", component: BankDarahPelayanan },
  { path: "/jadwalPelPenunjang", component: JadwalRadioterapiV2 },
  { path: "/trxpenunjang", component: TransaksiPenunjang },
  { path: "/diklat", component: MenuPendidikan },
  { path: "/sitb", component: BridgingSITB },
  { path: "/farmasi", component: MainFarmasi },
  {
    path: "/gizi",
    component: GiziApp,
    layout: ({ children }) => (
      <Layout>
        <SidebarRI />
        {children}
      </Layout>
    ),
  },
  { path: "/ibs", component: BedahSentral },
  { path: "/penunjangLainnya", component: PenunjangLainnya },
  {
    path: "/trxbarangunit",
    component: TransaksiBarangUnit,
    protected: true,
    allowedRoles: ["SMG"],
  },
  {
    path: "/master",
    component: Masterdashboard,
    protected: true,
    allowedRoles: ["SMG"],
    layout: ({ children }) => (
      <MasterWilayahContextProvider>
        <MasterRuangContextProvider>
          <MasterBedContextProvider>{children}</MasterBedContextProvider>
        </MasterRuangContextProvider>
      </MasterWilayahContextProvider>
    ),
  },
  { path: "/user", component: UserSetting },
  {
    path: "/tools",
    component: ToolsPage,
    protected: true,
    allowedRoles: ["SMG"],
  },
  { path: "/changelog", component: Changelog },
  {
    path: "/settingapp",
    component: UserManagement,
    protected: true,
    allowedRoles: ["SMG"],
  },
  { path: "/chat", component: Chat },
  { path: "/laporan", component: Laporan },
  { path: "/laporanprb", component: LaporanPRB },
  { path: "/laporansurkon", component: LaporanSuratKontrol },
  { path: "/laporanaskep", component: Laporanaskep },
  { path: "/laporaneswl", component: DashboardESWL },
  { path: "/laporanhd", component: DashboardHD },
  { path: "/satusehat/environment", component: SatuSehatEnvironment },
  { path: "/satusehat/organization", component: SatuSehatOrganization },
  { path: "/satusehat/kyc", component: KYC },
  { path: "/satusehat/pencatatankyc", component: KycSatusehat },
  { path: "/satusehat/location", component: SatuSehatLocation },
  { path: "/satusehat/practicioner", component: SatuSehatPracticioner },
  { path: "/satusehat/encounter", component: SatuSehatEncounter },
  { path: "/satusehat/monitorrajal", component: MonitoringSSRajal },
  { path: "/dashboardantrol", component: DashboardAntrol },
  { path: "/dashkamartt", component: KetersediaanTT },
  { path: "/app/formdisplay", component: Antrian },
  {
    path: "/app/masterpasien",
    component: MasterPasien,
    layout: ({ children }) => (
      <MasterWilayahContextProvider>{children}</MasterWilayahContextProvider>
    ),
    protected: true,
    allowedRoles: ["SMG"],
  },
  { path: "/app/riwayatMedis", component: RiwayatMedisPasien },
  { path: "/app/askepData", component: AskepViewData },
  { path: "/app/askepEdit", component: AskepEditData },
  { path: "/app/rekapkunjunganrj", component: DashboardRekapRJ },
  { path: "/kinerjaPerawat/perawat", component: LayoutKinerja },
  { path: "/penunjang", component: Penunjang },
  {
    path: "/kontrol",
    component: SuratKontrolBPJS,
    layout: ({ children }) => (
      <Layout>
        <SidebarKontrol />
        {children}
      </Layout>
    ),
  },
  {
    path: "/askeppak",
    component: () => (
      <>
        <PageHeadPak />
        <LaporanPak />
      </>
    ),
  },
  { path: "/faceapi", component: FaceDetectionComponent },
  { path: "/app/iconbar", component: MenuIconBar },
];

// Helper function to wrap component with providers
export const wrapWithProviders = (Component, providers = []) => {
  return providers.reduce((wrapped, Provider) => {
    return <Provider>{wrapped}</Provider>;
  }, <Component />);
};

// Helper to get default content styles
export const getContentStyle = (path) => ({
  background: "#fff",
  padding: 7,
  margin: "3px 3px 3px 3px",
  minHeight: path === "/" ? "auto" : 280,
});

export default routes;
