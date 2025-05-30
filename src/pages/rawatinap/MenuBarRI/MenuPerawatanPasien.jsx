import { Alert, Layout, Menu, Modal, message } from "antd";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MasterDokterContext } from "../../master/context/MasterDokter/MasterDokterContext";
import { GiziAsuhanContext } from "../../penunjang/gizi/context/AsuhanGiziContext";
import { BillingContext } from "../../rawatjalan/context/BillingContext";
import { DiagnosaContext } from "../../rawatjalan/context/Diagnosacontext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import { ProsedurContext } from "../../rawatjalan/context/ProsedurContext";
import { ReminderContext } from "../../rawatjalan/context/ReminderContext";
import { VClaimContext } from "../../rawatjalan/context/VClaimContext";
import { PenunjangContext } from "../../rawatjalan/orderpenunjang/OrderPenunjangContext";
import { ResepContext } from "../../rawatjalan/orderresep/ResepContext";
import { AnamnesaRIContext } from "../context/AnamnesaRIContext";
import { DiagnosaRIContext } from "../context/DiagnosaRIContext";
import { EwsRIContext } from "../context/EwsContext";
import { InformRIContext } from "../context/InformConcernRIContext";
import { JadwalOperasiRIContext } from "../context/JadwalOperasiRIContext";
import { KonsulRIContext } from "../context/KonsulDokterRIContext";
import { OrderPenunjangRIContext } from "../context/OrderPenunjangRIContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { RM13RIContext } from "../context/RM13Context";
import { SuratKeteranganRIContext } from "../context/SuratKeteranganRIContext";
import { TTVRIContext } from "../context/TandaVitalAskepRIContext";
import { AskepContext } from "../context/AskepContext";
import { AssesmentRIContext } from "../context/AssesmentRIContext";
import { MasterTandaGejalaContext } from "../../master/context/masteraskep/MasterTandaGejalaContext";
import { DischargePlanningContext } from "../context/DischargePlanningContext";
import { TransferPasienRIContext } from "../context/TransferPasienRIContext";
import { PantuanInfeksiContext } from "../context/PantuanInfeksiContext";
import { CatatanAskepContext } from "../context/CatatanAskepContext";
import dayjs from "dayjs";
import { PemeriksaanLainContext } from "../../rawatjalan/context/pemeriksaancontext/PemeriksaanLainContext";
import { RM14Context } from "../context/RM14Context";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { MasterBarangContext } from "../../master/context/MasterBarangContext";
import { PengkajianContext } from "../context/PengkajianContext";
import { MasterContext } from "../../master/context/MasterContext";
import { PerkembanganPasienRIContext } from "../context/PerkembanganPasienRIContext";
const { Header } = Layout;
const { confirm } = Modal;

const MenuPerawatanPasien = () => {
  const {
    curpasRI,
    keyDx,
    setKeyDx,
    keybill,
    setkeybill,
    keykedatangan,
    setkeykedatangan,
    keykepulangan,
    setkeykepulangan,
    keyorder,
    setkeyorder,
    setkeyGizi,
    current,
    setCurrent,
    ruangRi,
    getLookupPoli,
    keyAskep,
    setkeyAskep,
    iniPasien,
    setIniPasien,
    swtichPasien,
  } = useContext(PasienRIContext);
  const {
    getLastTTV,
    detailListScreening,
    detailevaluasi,
    getmstdokterGizi,
    detailListAsuhan,
  } = useContext(GiziAsuhanContext);
  const {
    detailRM13RI,
    detailRujukanRI,
    getRiwayatLabByReg,
    getKepulangan,
    getObjekDokter,
  } = useContext(RM13RIContext);
  const { detailterimapasienRI } = useContext(TransferPasienRIContext);
  const { getTindakaknPPI } = useContext(PantuanInfeksiContext);
  const { setLoadingBPJS } = useContext(VClaimContext);
  const { detailRujukan } = useContext(ReminderContext);
  const { detailInformRI } = useContext(InformRIContext);
  const { getRuangPenunjang, getlistApotik } = useContext(PasienContext);
  const { getListSpesialisDBRS } = useContext(MasterDokterContext);
  const { listKonsultasiRI } = useContext(KonsulRIContext);
  const { detailDiagnosa } = useContext(DiagnosaContext);
  const { detailAnamnesaRI, detailpmfisikRI } = useContext(AnamnesaRIContext);
  const { getSnomedProcPasien, getSnomedDxpasien, getSnomedMaster } =
    useContext(DiagnosaRIContext);
  const { detailProsedur } = useContext(ProsedurContext);
  const { detailBilling, setPelayanan } = useContext(BillingContext);
  const { getListOrderPenunjang, getListOrderPenunjangValid } =
    useContext(PenunjangContext);
  const { getMstDiet, getMstJnsMakan, listmstDiet, listmstjnsMakan } =
    useContext(OrderPenunjangRIContext);
  const { setKosong, getRiwayatObat } = useContext(ResepContext);
  const { getListOperasiPasien, getdiagnosaOp } = useContext(
    JadwalOperasiRIContext
  );
  const { listPemeriksaanLain } = useContext(PemeriksaanLainContext);
  const {
    getListAskepById,
    getHistoryKesimpulan,

    getGravikTTV,
    cekAssementTombol,
    setListImplementasiByIdDiagnosa,
    setHistoryKesimpulanByIdBydx,
    kosongkanformaskep,
    spinGetAskep,
  } = useContext(AskepContext);
  const { getCatatanPasien } = useContext(CatatanAskepContext);
  const { getTTVAllBynoreg, getTTVAllBynoregLengkap } =
    useContext(TTVRIContext);
  const { getGrafikEWS, getEwsAll } = useContext(EwsRIContext);
  const { getStatusKritis } = useContext(AssesmentRIContext);
  const { getTandagejalaSubAskep } = useContext(MasterTandaGejalaContext);
  const { getdiagnosarm11, getPerawat } = useContext(DischargePlanningContext);
  const { getOrderMakan } = useContext(OrderPenunjangRIContext);
  const { getPlanning, getEvalusi, getDiagnosa } = useContext(TTVRIContext);
  const checkFor = ["9305"];
  const hasSome = checkFor.includes(ruangRi);
  const { getinfoPasienPulang, detailRM14RI } = useContext(RM14Context);
  const { setjenisKeterangan, getKepulanganPs, getmstSuket } = useContext(
    SuratKeteranganRIContext
  );
  const {
    getListBahasa,
    setListBahasa,
    listbahasa,
    listpendidikan,
    setListPendidikan,
    getListPendidikan,
  } = useContext(MasterContext);
  const { loadPelayananRuang } = useContext(PelayananContext);
  const { GetListBarangRuang } = useContext(MasterBarangContext);
  const {
    getBreden,
    getDisfagia,
    getMenelan,
    getNihss,
    getOedema,
    getOtot,
    getSofa,
    getTrauma,
    getNews,
    getPews,
    getEdukasi,
    getAssLatchSkoreHarian,
  } = useContext(PengkajianContext);
  const { getTglLibur } = useContext(PerkembanganPasienRIContext);

  const norm = sessionStorage.getItem("norm");
  const kodeDokter = sessionStorage.getItem("pegawai");

  return (
    <Header
      className="header"
      style={{
        height: "32px",
        padding: "0 0",
        lineHeight: "32px",
        position: "sticky",
        zIndex: 3,
        width: "100%",
        left: 0,
        top: 0,
      }}
    >
      <Menu
        style={{ lineHeight: "32px" }}
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["dashboardpasienri"]}
        onClick={(e) => {
          setCurrent(e.key);
        }}
        selectedKeys={[current]}
      >
        <Menu.Item
          key="dashboardpasienri"
          style={{ backgroundColor: "#ffd6e7" }}
        >
          <Link to="/pemeriksaanharian/ri/dashboardpasienri">Dashboard</Link>
        </Menu.Item>
        {/* <Menu.Item key="billingri" style={{ backgroundColor: "#f4ffb8" }}>
          <Link
            to="/pemeriksaanharian/ri/billingri"
            onClick={() => {
              setkeybill("bill1");
              setPelayanan("");
              detailBilling(curpasRI.registrasiId);
              loadPelayananRuang(ruangRi);
              GetListBarangRuang(ruangRi);
            }}
          >
            Transaksi
          </Link>
        </Menu.Item> */}
        <Menu.Item key="terimapasienri" style={{ backgroundColor: "#ffd8bf" }}>
          <Link
            to="/pemeriksaanharian/ri/terimapasienri"
            onClick={() => {
              if (iniPasien === "") {
                Modal.warning({
                  content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                });
              } else {
                setkeykedatangan("awal2");
                // getTandagejalaSubAskep();
                // getAssesmentRI(curpasRI.registrasiId);
                // detailterimapasienRI(curpasRI.registrasiId);
                detailAnamnesaRI(curpasRI.registrasiId);
                detailpmfisikRI(curpasRI.registrasiId, "1");
                detailInformRI(curpasRI.registrasiId);
                getEdukasi(curpasRI.registrasiId);
                getPerawat();
                getListPendidikan();
                getListBahasa();
              }
            }}
          >
            Terima Pasien
          </Link>
        </Menu.Item>
        <Menu.Item key="konsulri" style={{ backgroundColor: "#ffe7ba" }}>
          <Link
            to="/pemeriksaanharian/ri/konsulri"
            onClick={() => {
              if (iniPasien === "") {
                Modal.warning({
                  content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                });
              } else {
                listKonsultasiRI(curpasRI.registrasiId);
                getListSpesialisDBRS();
                // if (kodeDokter[0] !== "D") {
                //   return confirm({
                //     content: (
                //       <Alert
                //         message={
                //           "Pastikan User Dokter Yang Akan Melakukan Konsultasi!"
                //         }
                //         type="warning"
                //         //  showIcon
                //       />
                //     ),
                //     okText: "Ya",
                //     okType: "primary",
                //     cancelButtonProps: {
                //       hidden: true,
                //     },
                //     cancelText: "No",
                //     onOk() {
                //       console.log("Dokter");
                //     },
                //     onCancel() {
                //       console.log("Cancel");
                //     },
                //   });
                // }
              }
            }}
          >
            Konsultasi
          </Link>
        </Menu.Item>
        <Menu.Item key="diagnosari" style={{ backgroundColor: "#bae0ff" }}>
          <Link
            to="/pemeriksaanharian/ri/diagnosari"
            onClick={() => {
              if (iniPasien === "") {
                Modal.warning({
                  content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                });
              } else {
                setKeyDx("Dx1");
                detailDiagnosa(curpasRI.registrasiId);
                getSnomedDxpasien(curpasRI.registrasiId);
                detailProsedur(curpasRI.registrasiId);
                getSnomedProcPasien(curpasRI.registrasiId);
              }
            }}
          >
            Diagnosa Dan Prosedur
          </Link>
        </Menu.Item>
        <Menu.Item key="askepri" style={{ backgroundColor: "#ffffb8" }}>
          <Link
            to="/pemeriksaanharian/ri/askepri"
            onClick={() => {
              if (iniPasien === "") {
                Modal.warning({
                  content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                });
              } else {
                // detailAnamnesaRI(curpasRI.registrasiId);
                getTindakaknPPI(curpasRI.registrasiId);
                getListAskepById(curpasRI.registrasiId);
                // getCatatanPasien(curpasRI.registrasiId);
                // --cekAssementTombol(curpasRI.registrasiId, 1);
                // getGravikTTV(curpasRI.registrasiId);
                // --getTTVAllBynoreg(curpasRI.registrasiId);
                getTTVAllBynoregLengkap(curpasRI.registrasiId);
                // getGrafikEWS(curpasRI.registrasiId);
                // --getEwsAll(curpasRI.registrasiId);
                setListImplementasiByIdDiagnosa([]);
                setHistoryKesimpulanByIdBydx([]);
                kosongkanformaskep();
                setkeyAskep("Askep1");
                getPlanning(curpasRI.registrasiId);
                getEvalusi(curpasRI.registrasiId, dayjs().format("YYYY-MM-DD"));
                getStatusKritis(curpasRI.registrasiId);
                getDiagnosa(curpasRI.registrasiId);
                getBreden(curpasRI.registrasiId);
                getDisfagia(curpasRI.registrasiId);
                getMenelan(curpasRI.registrasiId);
                getNihss(curpasRI.registrasiId);
                getOedema(curpasRI.registrasiId);
                getOtot(curpasRI.registrasiId);
                getSofa(curpasRI.registrasiId);
                getTrauma(curpasRI.registrasiId);
                getNews(curpasRI.registrasiId);
                getPews(curpasRI.registrasiId);
                getAssLatchSkoreHarian(curpasRI.registrasiId);
              }
            }}
          >
            Asuhan Keperawatan
          </Link>
        </Menu.Item>
        <Menu.Item key="cpptri" style={{ backgroundColor: "#bae7ff" }}>
          <Link
            to="/pemeriksaanharian/ri/cpptri"
            onClick={() => {
              if (iniPasien === "") {
                Modal.warning({
                  content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                });
              } else {
                // detailAnamnesaRI(curpasRI.registrasiId);
                getTglLibur();
              }
            }}
          >
            Perkembangan Pasien
          </Link>
        </Menu.Item>
        <Menu.Item key="pemGizi" style={{ backgroundColor: "#d9f7be" }}>
          <Link
            to="/pemeriksaanharian/ri/pemGizi"
            onClick={() => {
              if (iniPasien === "") {
                Modal.warning({
                  content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                });
              } else {
                setkeyGizi("screeningGizi");
                getLastTTV(curpasRI.registrasiId);
                detailListScreening(curpasRI.registrasiId);
                detailevaluasi(curpasRI.registrasiId);
                // getmstdokterGizi("%20");
                detailListAsuhan(curpasRI.registrasiId);
                detailAnamnesaRI(curpasRI.registrasiId);
                getMstJnsMakan("%20");
                getMstDiet("%20");
              }
            }}
          >
            Asuhan Gizi
          </Link>
        </Menu.Item>
        {swtichPasien ? (
          <></>
        ) : (
          <Menu.Item key="orderri" style={{ backgroundColor: "#d6e4ff" }}>
            <Link
              to="/pemeriksaanharian/ri/orderri"
              onClick={() => {
                if (iniPasien === "") {
                  Modal.warning({
                    content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                  });
                } else {
                  setkeyorder("order1");
                  getListOrderPenunjang(curpasRI.registrasiId);
                  getListOrderPenunjangValid(curpasRI.registrasiId);
                  getRuangPenunjang();
                  detailDiagnosa(curpasRI.registrasiId);
                  setKosong();
                  getRiwayatObat(curpasRI.pasienId);
                  getlistApotik();
                  getListOperasiPasien(curpasRI.registrasiId);
                  getOrderMakan(curpasRI.registrasiId);
                  getdiagnosaOp(curpasRI.registrasiId);
                  listPemeriksaanLain(curpasRI.registrasiId);
                }
              }}
            >
              Order Pasien
            </Link>
          </Menu.Item>
        )}
        {/* {ruangRi === "9333" ? (
          <>
            <Menu.Item key="kemo" style={{ backgroundColor: "#ffd6e7" }}>
              <Link
                to="/pemeriksaanharian/ri/kemo"
                onClick={() => {
                  if (iniPasien === "") {
                    Modal.warning({
                      content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                    });
                  } else {
                    setkeyorder("kemo1");
                  }
                }}
              >
                Kemoterapi
              </Link>
            </Menu.Item>
          </>
        ) : (
          <></>
        )} */}
        <Menu.Item key="kepulanganri" style={{ backgroundColor: "#efdbff" }}>
          <Link
            to="/pemeriksaanharian/ri/kepulanganri"
            onClick={() => {
              setkeykepulangan("end1");
              getTindakaknPPI(curpasRI.registrasiId);
              setLoadingBPJS(true);
              detailAnamnesaRI(curpasRI.registrasiId);
              detailDiagnosa(curpasRI.registrasiId);
              detailRM13RI(curpasRI.registrasiId);
              getLookupPoli("%20");
              // detailRujukanRI(curpasRI.registrasiId);
              // getRiwayatLabByReg(curpasRI.registrasiId);
              getmstSuket("%20");
              // getObjekDokter(curpasRI.registrasiId, "Dokter Spesialis");
              getinfoPasienPulang(curpasRI.registrasiId);
              getKepulanganPs(curpasRI.registrasiId);
              setjenisKeterangan("");
              detailRM14RI(curpasRI.registrasiId);
            }}
          >
            Kepulangan Pasien
          </Link>
        </Menu.Item>
      </Menu>
    </Header>
  );
};

export default MenuPerawatanPasien;
