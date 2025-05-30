import { Spin, Card, Collapse, Button, Tabs, Modal, Tour, Popover } from "antd";
import React, { useContext, useEffect, useState, useRef } from "react";
import { Route } from "react-router-dom";
import { StickyContainer } from "react-sticky";
import { LoadingOutlined } from "@ant-design/icons";
import { ChatContext } from "../../chat/Chatcontext";
import FormDashboardPasien from "../pemeriksaanharian/FormDashboardPasien";
import FormCPPTRI from "../pemeriksaanharian/FormCPPTRI";
import FormOrderPenunjangRi from "../pemeriksaanharian/FormOrderPenunjangRi";
import FormPengajuanJadwalOperasi from "../pemeriksaanharian/FormPengajuanJadwalOperasi";
import FormOrderResepRI from "../pemeriksaanharian/FormOrderResep";
import FormOrderMakanRI from "../pemeriksaanharian/FormOrderMakan";
import FormProcedureRI from "../pemeriksaanharian/FormProcedureRI";
import FormDiagnosaRI from "../pemeriksaanharian/FormDiagnosaRI";
import FormListDiagnosaAskep from "../askep/FormListDiagnosaAskep";
import FormImplementasiAskep from "../askep/FormImplementasiAskep";
import FormEvaluasiAskep from "../askep/FormEvaluasiAskep";
import FormPengkajianAskep from "../askep/FormPengkajianAskep";
import FormBillingRI from "../transaksirawatinap/FormPemeriksaanRI";
import FormBHPRI from "../transaksirawatinap/FormBHPRI";
import FormAnamnesa from "../pemeriksaanawal/FormAnamnesa";
import FormInformConcern from "../pemeriksaanawal/FormInformConcern";
import FormDischargePalnning from "../pemeriksaanawal/FormDischargePalnning";
import FormAssesmentAwalRI from "../askep/FormAssesmentAwalRI";
import FormRM14 from "../pencetakan/FormRM14";
import FormSuratKeterangan from "../pencetakan/FormSuratKeterangan";
import { AnamnesaRIContext } from "../context/AnamnesaRIContext";
import { PasienRIContext } from "../context/PasienRIContext";
import PemeriksaanFisikRI from "../pemeriksaanawal/FormPemeriksaanFisik";
import { PemeriksaanFisikContext } from "../../rawatjalan/context/PemeriksaanFisikContext";
import FormSnomedDX from "../pemeriksaanharian/FormSnomedDX";
import FormSnomedProcedure from "../pemeriksaanharian/FormSnomedProcedure";
import { ProsedurContext } from "../../rawatjalan/context/ProsedurContext";
import { DiagnosaContext } from "../../rawatjalan/context/Diagnosacontext";
import { PenunjangContext } from "../../rawatjalan/orderpenunjang/OrderPenunjangContext";
import { ResepContext } from "../../rawatjalan/orderresep/ResepContext";
import FormPemJantung from "../PemeriksaanKhusus/FormPemJantung";
import FormAsuhanGizi from "../../penunjang/gizi/FormAsuhanGizi";
import FormScreeningGizi from "../../penunjang/gizi/FormScreeningGizi";
import FormEvaluasiGizi from "../../penunjang/gizi/FormEvaluasiGizi";
import FormBilling from "../../rawatjalan/form/billing";
import FormOrderPenunjang from "../../rawatjalan/form/FormOrderPenunjang";
import FormOrderResep from "../../rawatjalan/orderresep/FormOrderResep";
import PemeriksaanFisik from "../../rawatjalan/komponen/PemeriksaanFisik";
import FormKonsulRI from "../pemeriksaanharian/FormKonsulRI";
import { InformRIContext } from "../context/InformConcernRIContext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import { DiagnosaRIContext } from "../context/DiagnosaRIContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { JadwalOperasiRIContext } from "../context/JadwalOperasiRIContext";
import FormRM13CopyRj from "../pencetakan/FormRM13CopyRJ";
import FormKepulanganPasien from "../pencetakan/FormKepulanganPasien";
import { SuratKeteranganRIContext } from "../context/SuratKeteranganRIContext";
import { GiziAsuhanContext } from "../../penunjang/gizi/context/AsuhanGiziContext";
import CatatanTambahan from "../askep/FormCatatanTambahan";
// import FormPantuanTTV from "../pemeriksaanharian/FormPantuanTTV";
import FormEWS from "../pemeriksaanharian/FormPantuanEWS";
import FormTindakanPPI from "../pemeriksaanharian/FormTindakanPPI";
import AlertPPI from "../pemeriksaanharian/AlertPPI";
import { PantuanInfeksiContext } from "../context/PantuanInfeksiContext";
import { AssesmentRIContext } from "../context/AssesmentRIContext";
import { MasterTandaGejalaContext } from "../../master/context/masteraskep/MasterTandaGejalaContext";
import { TransferPasienContext } from "../../rawatjalan/context/TransferPasienContext";
import { TransferPasienRIContext } from "../context/TransferPasienRIContext";
import FormCatatanPerawat from "../askep/FormCatatanPerawat";
import dayjs from "dayjs";
import { TTVRIContext } from "../context/TandaVitalAskepRIContext";
import { DischargePlanningContext } from "../context/DischargePlanningContext";
import FormPenunjangLain from "../PemeriksaanKhusus/FormPenunjangLain";
import FormPemeriksaanFisikNew from "../pemeriksaanawal/FormPemeriksaanFisiknew";
import FormPengkajianLain from "../Pengkajian/FormPengkajianLain";
import MenuPemFisik from "../pemeriksaanawal/MenuPemFisik";
import MenuTabBarOrderDarah from "../../penunjang/bankDarah/component/order/MenuTabBarOrderDarah";
import FormLaporanKemoterapi from "../../penunjang/kemoterapi/component/FormLaporanKemoterapi";
import FormValidasiKaru from "../Transaksi/FormValidasiKaru";
const { confirm } = Modal;

const { Panel } = Collapse;
const { TabPane } = Tabs;
const FormMenuPerawatanPasien = () => {
  const ref3 = useRef(null);
  const [open, setOpen] = useState(false);
  const [modal, setmodal] = useState(false);

  const steps = [
    {
      title: "Other Actions",
      description: "Click to see other actions.",
      target: () => ref3.current,
    },
  ];
  const RsLokasiPenunjang = sessionStorage.getItem("RSMana");
  const { getPlanning, getEvalusi, getDiagnosa } = useContext(TTVRIContext);
  const { getLastTTV } = useContext(GiziAsuhanContext);
  const { detailProsedur } = useContext(ProsedurContext);
  const { detailDiagnosa } = useContext(DiagnosaContext);
  const { detailAnamnesaRI, detailpmfisikRI } = useContext(AnamnesaRIContext);
  const { detailInformRI } = useContext(InformRIContext);
  const { getdiagnosarm11 } = useContext(DischargePlanningContext);
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
    keyGizi,
    setkeyGizi,
    keyAskep,
    setkeyAskep,
    swtichPasien,
  } = useContext(PasienRIContext);
  const { getAssesmentRI } = useContext(AssesmentRIContext);
  const { getTandagejalaSubAskep } = useContext(MasterTandaGejalaContext);
  const { detailterimapasienRI } = useContext(TransferPasienRIContext);
  const { getRuangPenunjang, getlistApotik } = useContext(PasienContext);
  const { getListOrderPenunjang, getListOrderPenunjangValid } =
    useContext(PenunjangContext);
  const { loadPelayananRuangKelas } = useContext(PelayananContext);
  const { getSnomedProcPasien, getSnomedDxpasien, getSnomedMaster } =
    useContext(DiagnosaRIContext);
  const { setKosong, getRiwayatObat } = useContext(ResepContext);
  const { getListOperasiPasien, getdiagnosaOp } = useContext(
    JadwalOperasiRIContext
  );
  const { getmstSuket } = useContext(SuratKeteranganRIContext);
  const { alertPPIPerawat, setalertPPIPerawat } = useContext(
    PantuanInfeksiContext
  );
  const { dataalert, setdataalert } = useContext(PantuanInfeksiContext);
  const tabList = [
    {
      key: "Dx1",
      tab: <span style={{ fontWeight: "bolder" }}>DIAGNOSA (ICDX)</span>,
    },
    {
      key: "Dx2",
      tab: <span style={{ fontWeight: "bolder" }}>SNOMED CT DX</span>,
    },
    {
      key: "Dx3",
      tab: <span style={{ fontWeight: "bolder" }}>PROSEDUR (ICD9CM)</span>,
    },
    {
      key: "Dx4",
      tab: <span style={{ fontWeight: "bolder" }}>SNOMED CT PROC</span>,
    },
  ];

  const tabListAskep = [
    {
      key: "Askep1",
      tab: <span style={{ fontWeight: "bolder" }}>Asuhan Keperawatan</span>,
    },
    // {
    //   key: "Askep2",
    //   tab: <span style={{ fontWeight: "bolder" }}>Tanda Vital</span>,
    // },
    {
      key: "Askep3",
      tab: <span style={{ fontWeight: "bolder" }}>Catatan Perawatan</span>,
    },
    {
      key: "Askep4",
      tab: <span style={{ fontWeight: "bolder" }}>Pantauan HAIs</span>,
    },
    {
      key: "Askep5",
      tab: <span style={{ fontWeight: "bolder" }}>Pengkajian Lainnya</span>,
    },
  ];

  const tabListBilling = [
    {
      key: "bill1",
      tab: <span style={{ fontWeight: "bolder" }}>Pemeriksaan</span>,
    },
    {
      key: "bill2",
      tab: <span style={{ fontWeight: "bolder" }}>Bahan Habis Pakai</span>,
    },
    {
      key: "bill3",
      tab: (
        <span style={{ fontWeight: "bolder" }}>Validasi Transaksi Pasien</span>
      ),
    },
  ];

  const tabGizi = [
    {
      key: "screeningGizi",
      tab: <span style={{ fontWeight: "bolder" }}>Screening</span>,
    },
    {
      key: "asuhanGizi",
      tab: <span style={{ fontWeight: "bolder" }}>Asuhan</span>,
    },
    {
      key: "evaluasiGizi",
      tab: <span style={{ fontWeight: "bolder" }}>Evalusi</span>,
    },
  ];

  const tabListKedatangan = [
    {
      key: "awal2",
      tab: <span style={{ fontWeight: "bolder" }}>Anamnesa</span>,
    },
    // {
    //   key: "awal6",
    //   tab: <span style={{ fontWeight: "bolder" }}>Edukasi Pasien</span>,
    // },
    {
      key: "awal3",
      tab: <span style={{ fontWeight: "bolder" }}>Pemeriksaan Fisik</span>,
    },
    {
      key: "awal1",
      tab: <span style={{ fontWeight: "bolder" }}>Asesmen Askep</span>,
    },
    {
      key: "awal4",
      tab: <span style={{ fontWeight: "bolder" }}>Discharge Palnning</span>,
    },
    // {
    //   key: "awal5",
    //   tab: <span style={{ fontWeight: "bolder" }}>Informasi Umum</span>,
    // },
  ];

  const tabListKepulangan = [
    {
      key: "end1",
      tab: (
        <span style={{ fontWeight: "bolder" }}>Resume Perawatan (RM13)</span>
      ),
    },
    swtichPasien ? (
      <></>
    ) : (
      {
        key: "end4",
        tab: <span style={{ fontWeight: "bolder" }}>Status Pulang</span>,
      }
    ),
    {
      key: "end3",
      tab: <span style={{ fontWeight: "bolder" }}>Surat Keterangan</span>,
    },
    swtichPasien
      ? {
          key: "end2",
          tab: (
            <span style={{ fontWeight: "bolder" }}>Resume Medis (RM14)</span>
          ),
        }
      : {
          key: "end5",
          tab: (
            <span
              style={{
                fontWeight: "bolder",
                color: "grey",
                pointerEvents: "none",
              }}
              aria-disabled="true"
            >
              Resume Medis (RM14)
            </span>
          ),
        },

    // {
    //     key: "end4",
    //     tab: <span style={{ fontWeight: "bolder" }}>Resume Perawatan (RM13COPYRJ)</span>,
    // },
  ];

  const tabListOrder = [
    {
      key: "order1",
      tab: <span style={{ fontWeight: "bolder" }}>Order Penunjang</span>,
    },
    {
      key: "order2",
      tab: <span style={{ fontWeight: "bolder" }}>Order Resep</span>,
    },
    {
      key: "order3",
      tab: <span style={{ fontWeight: "bolder" }}>Order Makan</span>,
    },
    {
      key: "order4",
      tab: <span style={{ fontWeight: "bolder" }}>Order Operasi</span>,
    },
    {
      key: "order5",
      tab: <span style={{ fontWeight: "bolder" }}>Penunjang Lain</span>,
    },
    {
      key: "order6",
      tab: (
        <span ref={ref3} style={{ fontWeight: "bolder" }}>
          Order Darah
        </span>
      ),
    },
  ];

  const contentList = {
    Dx1: <FormDiagnosaRI />,
    Dx2: <FormSnomedDX />,
    Dx3: <FormProcedureRI />,
    Dx4: <FormSnomedProcedure />,
  };

  const contentListAskep = {
    Askep1: (
      <>
        <FormListDiagnosaAskep />
        <Collapse style={{ padding: "1px ,1px" }}>
          <Panel header="Pengkajian Dan Intervensi" key="1">
            <FormPengkajianAskep />
          </Panel>
          <Panel header="Implementasi" key="2">
            <FormImplementasiAskep />
          </Panel>
          <Panel header="Evaluasi" key="3">
            <FormEvaluasiAskep />
          </Panel>
        </Collapse>
      </>
    ),
    // Askep2: <FormPantuanTTV />,
    Askep3: <FormCatatanPerawat />,
    Askep4: <FormTindakanPPI />,
    Askep5: <FormPengkajianLain />,
  };

  const contentListBilling = {
    // bill1: <FormBillingRI />,
    bill1: <FormBillingRI />,
    bill2: <FormBHPRI />,
    bill3: <FormValidasiKaru />,
  };

  const contentListKedatangan = {
    awal1: <FormAssesmentAwalRI />,
    awal2: <FormAnamnesa />,
    // awal3: <PemeriksaanFisikRI />,
    // awal3: <FormPemeriksaanFisikNew />,
    awal3: <MenuPemFisik />,
    awal4: <FormDischargePalnning />,
    awal5: <FormInformConcern />,
    // awal6: <FormEdukasiPasien />,
  };

  const contentListKepulangan = {
    end1: <FormRM13CopyRj />,
    end4: <FormKepulanganPasien />,
    end2: <FormRM14 />,
    end3: <FormSuratKeterangan />,
    end5: <></>,
  };

  const contentListOrder = {
    // order1: <FormOrderPenunjangRi />,
    order1: <FormOrderPenunjangRi />,
    // order2: <FormOrderResepRI />,
    order2: <FormOrderResepRI />,
    order3: <FormOrderMakanRI />,
    order4: <FormPengajuanJadwalOperasi />,
    order5: <FormPenunjangLain />,
    order6: <MenuTabBarOrderDarah />,
  };
  const contentGizi = {
    screeningGizi: <FormScreeningGizi />,
    asuhanGizi: <FormAsuhanGizi />,
    evaluasiGizi: <FormEvaluasiGizi />,
  };

  return (
    // <Spin
    //     size="large"
    //     indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
    //     spinning={loading}
    //     tip="Sedang Memuat.."
    // >
    <div
      style={{
        // minHeight: 475,
        // height: 500,
        maxHeight: "80vh",
        overflowY: "scroll",
        paddingRight: 4,
      }}
    >
      <StickyContainer>
        <Route path="/pemeriksaanharian/ri/dashboardpasienri">
          <FormDashboardPasien />
        </Route>
        <Route path="/pemeriksaanharian/ri/billingri">
          <Card
            type="card"
            headStyle={{ backgroundColor: "beige" }}
            tabProps={{ size: "small" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
            size="small"
            tabList={tabListBilling}
            activeTabKey={keybill}
            onTabChange={(e) => {
              setkeybill(e);
              if (e === "bill1") {
              } else {
              }
            }}
          >
            {contentListBilling[keybill]}
          </Card>
        </Route>
        <Route path="/pemeriksaanharian/ri/terimapasienri">
          <Card
            type="card"
            headStyle={{ backgroundColor: "beige" }}
            tabProps={{ size: "small" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
            size="small"
            tabList={tabListKedatangan}
            activeTabKey={keykedatangan}
            onTabChange={(e) => {
              setkeykedatangan(e);
              if (e === "awal1") {
                getTandagejalaSubAskep();
                getAssesmentRI(curpasRI.registrasiId);
                detailterimapasienRI(curpasRI.registrasiId);
              } else if (e === "awal2") {
              } else if (e === "awal3") {
              } else if (e === "awal4") {
                // getdiagnosarm11(curpasRI.registrasiId);
              } else {
              }
            }}
          >
            {contentListKedatangan[keykedatangan]}
          </Card>
        </Route>
        <Route path="/pemeriksaanharian/ri/konsulri">
          <FormKonsulRI />
        </Route>
        <Route path="/pemeriksaanharian/ri/diagnosari">
          <Card
            type="card"
            headStyle={{ backgroundColor: "beige" }}
            tabProps={{ size: "small" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
            size="small"
            tabList={tabList}
            activeTabKey={keyDx}
            onTabChange={(e) => {
              setKeyDx(e);
              if (e === "Dx1") {
                // detailDiagnosa(curpasRI.registrasiId);
              } else if (e === "Dx2") {
                // getSnomedMaster('%20');
              } else if (e === "Dx3") {
                // detailProsedur(curpasRI.registrasiId);
              } else {
                // getSnomedMaster('%20');
              }
            }}
          >
            {contentList[keyDx]}
          </Card>
        </Route>
        <Route path="/pemeriksaanharian/ri/askepri">
          <Card
            type="card"
            headStyle={{ backgroundColor: "beige" }}
            tabProps={{ size: "small" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
            size="small"
            tabList={tabListAskep}
            activeTabKey={keyAskep}
            onTabChange={(e) => {
              setkeyAskep(e);
              if (e === "Askep3") {
                getPlanning(curpasRI.registrasiId);
                getEvalusi(curpasRI.registrasiId, dayjs().format("YYYY-MM-DD"));
                getDiagnosa(curpasRI.registrasiId);
              } else {
              }
            }}
          >
            {contentListAskep[keyAskep]}
          </Card>
        </Route>
        <Route path="/pemeriksaanharian/ri/cpptri">
          <FormCPPTRI />
        </Route>
        {/* <Route path="/pemeriksaanharian/ri/pemkhusus" >
                    <FormPemJantung />
                </Route> */}
        <Route path="/pemeriksaanharian/ri/pemGizi">
          <Card
            type="card"
            headStyle={{ backgroundColor: "beige" }}
            tabProps={{ size: "small" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
            size="small"
            tabList={tabGizi}
            activeTabKey={keyGizi}
            onTabChange={(e) => {
              setkeyGizi(e);
              if (e === "screeningGizi") {
              } else if (e === "asuhanGizi") {
              } else {
              }
            }}
          >
            {contentGizi[keyGizi]}
          </Card>
        </Route>
        <Route path="/pemeriksaanharian/ri/orderri">
          <Card
            type="card"
            headStyle={{ backgroundColor: "beige" }}
            tabProps={{ size: "small" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
            size="small"
            tabList={tabListOrder}
            activeTabKey={keyorder}
            onTabChange={(e) => {
              setOpen(true);
              setkeyorder(e);
              getdiagnosaOp(curpasRI.registrasiId);
              if (e === "order1") {
              } else if (e === "order2") {
              } else if (e === "order3") {
              } else {
              }
            }}
          >
            {contentListOrder[keyorder]}
          </Card>
        </Route>
        <Route path="/pemeriksaanharian/ri/kepulanganri">
          <Card
            type="card"
            headStyle={{ backgroundColor: "beige" }}
            tabProps={{ size: "small" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
            size="small"
            tabList={tabListKepulangan}
            activeTabKey={keykepulangan}
            onTabChange={(e) => {
              setkeykepulangan(e);
              if (e === "end1" || e === "end4") {
              } else if (e === "end2") {
              } else if (e === "end5") {
                Modal.warning({
                  content: "Hanya Untuk Pasien Yang Sudah Dipulangkan!",
                });
              } else {
              }
            }}
          >
            {contentListKepulangan[keykepulangan]}
          </Card>
        </Route>
        <Route path="/pemeriksaanharian/ri/kemo">
          <FormLaporanKemoterapi />
        </Route>
      </StickyContainer>

      <Modal
        width="70%"
        footer={null}
        open={alertPPIPerawat}
        style={{ top: 10 }}
        // centered={true}
        closable={false}
      >
        <AlertPPI />
      </Modal>

      {/* <Tour open={open} onClose={() => setOpen(false)} steps={steps} /> */}
    </div>

    // </Spin>
  );
};

export default FormMenuPerawatanPasien;
