import { Layout, Menu, message, Modal } from "antd";
import React, { useContext } from "react";
import dayjs from "dayjs";
import { Link } from "react-router-dom";
import { AskepContext } from "../rawatinap/context/AskepContext";
import { BillingContext } from "./context/BillingContext";
import { DiagnosaContext } from "./context/Diagnosacontext";
import { KonsulContext } from "./context/KonsulContext";
import { PantuanInfeksiContext } from "./context/PantuanInfeksiContext";
import { PasienContext } from "./context/PasienContext";
import { ImunisasiContext } from "./context/pemeriksaancontext/ImunisasiContext";
import { PemeriksaanLainContext } from "./context/pemeriksaancontext/PemeriksaanLainContext";
import { PoliGigiContext } from "./context/pemeriksaancontext/PoliGigiContext";
import { PoliJantungContext } from "./context/pemeriksaancontext/PoliJantungContext";
import { PoliMataContext } from "./context/pemeriksaancontext/PoliMataContext";
import { PoliSarafContext } from "./context/pemeriksaancontext/PoliSarafContext";
import { PoliTHTContext } from "./context/pemeriksaancontext/PoliTHTContext";
import { ProsedurContext } from "./context/ProsedurContext";
import { ReminderContext } from "./context/ReminderContext";
import { RJumumContext } from "./context/RJumumContext";
import { PenunjangContext } from "./orderpenunjang/OrderPenunjangContext";
import { ResepContext } from "./orderresep/ResepContext";
// import { Hotkeys } from "./hotkeys";
// import { useHistory } from "react-router-dom";
import { useHotkeys } from "react-hotkeys-hook";
import { SuratKeteranganRJContext } from "./context/SuratKeteranganRJContext";
import { JadwalOperasiRIContext } from "../rawatinap/context/JadwalOperasiRIContext";
import { PasienRIContext } from "../rawatinap/context/PasienRIContext";
const { Header } = Layout;

const MenubarForm = () => {
  const {
    noreg,
    ruangasal,
    current,
    setCurrent,
    getRuangPenunjang,
    getlistApotik,
    curpas,
  } = useContext(PasienContext);
  const {
    getListSuketRJ,
    getListDokter,
    setNoSPRP,
    setNoSK,
    setNoSKD,
    setjenisKeterangan,
  } = useContext(SuratKeteranganRJContext);
  const { getPPI } = useContext(PantuanInfeksiContext);
  const { syncBillKHS, detailBilling } = useContext(BillingContext);
  const { detailDiagnosa, getRiwayatPenyakitbyId, getDiagnosa } =
    useContext(DiagnosaContext);
  const { detailProsedur } = useContext(ProsedurContext);
  const { detailRJumum } = useContext(RJumumContext);
  const { setKontrolForm } = useContext(ReminderContext);
  const { detailGigi, detailGigiOrtho } = useContext(PoliGigiContext);
  const { detailTHT } = useContext(PoliTHTContext);
  const { detailMata } = useContext(PoliMataContext);
  const { detailSaraf } = useContext(PoliSarafContext);
  const { detailEkokardiografi } = useContext(PoliJantungContext);
  const { detailImunisasi } = useContext(ImunisasiContext);
  const { detailKonsul } = useContext(KonsulContext);
  const { setKosong, getRiwayatObat } = useContext(ResepContext);
  const { getListOrderPenunjang, getListOrderPenunjangValid } =
    useContext(PenunjangContext);
  const {
    listPemeriksaanLain,
    setKosongPl,
    settabProtKemo,
    getDataTerapiKemoterapiPoli,
    getProtokolPasien,
  } = useContext(PemeriksaanLainContext);
  const {
    getCatatanPasien,
    setHiddenSaveButton,
    setHiddenSaveEdit,
    setWarnaRow,
    setListImplementasiByIdDiagnosa,
    setHistoryKesimpulanByIdBydx,
    kosongkanformaskepRJ,
    getCatatanRJ,
    getListAskepByIdByLayanan,
  } = useContext(AskepContext);
  const { setcito, getdiagnosaOp, getListOperasiPasien } = useContext(
    JadwalOperasiRIContext
  );
  const { detailPasienRI } = useContext(PasienRIContext);

  const norm = sessionStorage.getItem("norm");
  // const noregis = sessionStorage.getItem("noreg");
  const checkPoliKemo = ["9155", "9146"];
  const checkKemo = [
    "9155",
    "9185",
    "9140",
    "91A4",
    "9198",
    "9146",
    "91A1",
    "9148",
    "9150",
    "9147",
    "9115",
    "9172",
    "9105",
    "9163",
    "9157",
    "9187",
    "9129",
  ];
  const checkFor = ["9104", "9162", "9119", "9176"];
  const checkDarah = ["91A7", "91A4"];
  const checkBedah = [
    "9162",
    "9104",
    "9194",
    "9130",
    "9195",
    "9131",
    "9138",
    "9135",
    "9185",
    "9155",
    "9164",
    "9106",
    "9188",
    "9158",
    "9163",
    "9105",
    "9187",
    "9157",
    "9134",
    "9139",
    "9109",
  ];
  const hasSomePoliKemo = checkPoliKemo.includes(ruangasal);
  const hasSomeKemo = checkKemo.includes(ruangasal);
  const hasSome = checkFor.includes(ruangasal);
  const hasBedah = checkBedah.includes(ruangasal);
  const hasDarah = checkDarah.includes(ruangasal);
  const gigi = () => {
    detailGigi(noreg);
    detailGigiOrtho(noreg);
  };
  const askep = () => {
    detailRJumum(noreg);
    getListAskepByIdByLayanan(noreg, 2);
    getCatatanRJ(
      noreg,
      ruangasal,
      dayjs(curpas.tanggalMasuk.split("-").reverse().join("-")).format(
        "YYYY-MM-DD"
      )
    );
    getCatatanPasien(noreg);
    setListImplementasiByIdDiagnosa([]);
    setHistoryKesimpulanByIdBydx([]);
    kosongkanformaskepRJ();
    setHiddenSaveButton(false);
    setHiddenSaveEdit(true);
    setWarnaRow([]);

    // getCatatanRJ(noreg, curpas.ruangId, dayjs().format("YYYY-MM-DD"));
  };
  const diagpro = () => {
    getDiagnosa(ruangasal);
    detailDiagnosa(noreg);
    detailProsedur(noreg);
    getRiwayatPenyakitbyId(norm);
  };
  const penunjang = () => {
    getListOrderPenunjang(noreg);
    getListOrderPenunjangValid(noreg);
    getRuangPenunjang();
    detailDiagnosa(noreg);
  };
  const resep = () => {
    setKosong();
    getRiwayatObat(norm);
    getlistApotik();
  };
  const handleClick = (e) => {
    setCurrent(e.key);
  };

  useHotkeys(
    "shift+b",
    () => {
      noreg === null
        ? message.warning("Silahkan Pilih Pasien Terlebih Dahulu!")
        : syncBillKHS(noreg);
    },
    [noreg]
  );

  useHotkeys(
    "shift+r",
    () => {
      noreg === null
        ? message.warning("Silahkan Pilih Pasien Terlebih Dahulu!")
        : resep();
    },
    [noreg]
  );

  useHotkeys(
    "shift+k",
    () => {
      noreg === null
        ? message.warning("Silahkan Pilih Pasien Terlebih Dahulu!")
        : detailKonsul(noreg);
    },
    [noreg]
  );
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
      {/* <Hotkeys hotkeys={hotkeys} /> */}
      <Menu
        style={{ lineHeight: "32px" }}
        theme="light"
        mode="horizontal"
        defaultSelectedKeys={["anamnesa"]}
        onClick={handleClick}
        selectedKeys={[current]}
      >
        {/* <Tooltip title="Shift + B"> */}
        <Menu.Item
          key="billing"
          style={{ backgroundColor: "#ffccc7" }}
          // disabled={hasSomePoliKemo}
        >
          <Link
            to="/app/form/billing"
            onClick={() => {
              // detailBilling(noreg);
              if (noreg === null) {
                Modal.warning({
                  content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                });
              } else {
                detailBilling(noreg);
              }
            }}
          >
            <u>B</u>illing
          </Link>
        </Menu.Item>
        {/* </Tooltip> */}
        <Menu.Item
          key="perawat"
          style={{ backgroundColor: "#ffd8bf" }}
          // disabled={hasSomePoliKemo}
        >
          <Link
            to="/app/form/perawat"
            onClick={() => {
              noreg === null
                ? Modal.warning({
                    content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                  })
                : askep();
            }}
          >
            Askep
          </Link>
        </Menu.Item>
        {/* <Tooltip title="Shift + A"> */}
        <Menu.Item
          key="anamnesa"
          style={{ backgroundColor: "#ffe7ba" }}
          // disabled={hasSomePoliKemo}
        >
          <Link to="/app/form/anamnesa">
            <u>A</u>namnesa
          </Link>
        </Menu.Item>
        {/* </Tooltip> */}
        <Menu.Item
          key="gambar"
          style={{ backgroundColor: "#fff1b8" }}
          // disabled={hasSomePoliKemo}
        >
          <Link
            to="/app/form/gambar"
            // onClick={() => detailGambar(noreg)}
          >
            Gambar
          </Link>
        </Menu.Item>
        <Menu.Item
          key="diagpro"
          style={{ backgroundColor: "#ffffb8" }}
          // disabled={hasSomePoliKemo}
        >
          <Link
            to="/app/form/diagpro"
            onClick={() =>
              noreg === null
                ? Modal.warning({
                    content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                  })
                : diagpro()
            }
          >
            Diagnosa dan Prosedur
          </Link>
        </Menu.Item>
        <Menu.Item
          key="khusus"
          style={{ backgroundColor: "#f4ffb8" }}
          // disabled={hasSomePoliKemo}
        >
          <Link
            to="/app/form/khusus"
            onClick={() => {
              ruangasal === "9110" || ruangasal === "9167"
                ? gigi()
                : ruangasal === "9107" ||
                  ruangasal === "9165" ||
                  ruangasal === "9119" ||
                  ruangasal === "9176"
                ? detailImunisasi(noreg)
                : ruangasal === "9111" || ruangasal === "9168"
                ? detailTHT(noreg)
                : ruangasal === "9109" || ruangasal === "9166"
                ? detailMata(noreg)
                : ruangasal === "9113" || ruangasal === "9170"
                ? detailSaraf(noreg)
                : ruangasal === "9114" || ruangasal === "9171"
                ? detailEkokardiografi(noreg)
                : listPemeriksaanLain(noreg);
              setKosongPl();
              listPemeriksaanLain(noreg);
            }}
          >
            Tindakan
          </Link>
        </Menu.Item>
        <Menu.Item
          key="penunjang"
          style={{ backgroundColor: "#d9f7be" }}
          // disabled={hasSomePoliKemo}
        >
          <Link
            to="/app/form/penunjang"
            onClick={() => {
              noreg === null
                ? Modal.warning({
                    content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                  })
                : penunjang();
            }}
          >
            Order Penunjang
          </Link>
        </Menu.Item>
        {ruangasal === "9125" || ruangasal === "9182" ? null : (
          <Menu.Item
            key="resep"
            style={{ backgroundColor: "#b5f5ec" }}
            // disabled={hasSomePoliKemo}
          >
            <Link
              to="/app/form/resep"
              onClick={() =>
                noreg === null
                  ? Modal.warning({
                      content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                    })
                  : resep()
              }
            >
              Order <u>R</u>esep
            </Link>
          </Menu.Item>
        )}
        {hasBedah ? (
          <Menu.Item key="orderOp" style={{ backgroundColor: "#bae7ff" }}>
            <Link
              to="/app/form/orderOp"
              onClick={() => {
                detailPasienRI(curpas.registrasiId);
                // setcito(true);
                detailDiagnosa(curpas.registrasiId);
                getdiagnosaOp(curpas.registrasiId);
                getListOperasiPasien(curpas.registrasiId);
              }}
            >
              Order OP
            </Link>
          </Menu.Item>
        ) : (
          <></>
        )}
        {hasDarah ? (
          <Menu.Item key="orderDarah" style={{ backgroundColor: "#d6e4ff" }}>
            <Link to="/app/form/orderDarah" onClick={() => {}}>
              Order Darah
            </Link>
          </Menu.Item>
        ) : (
          <></>
        )}
        <Menu.Item
          key="konsul"
          style={{ backgroundColor: "#efdbff" }}
          // disabled={hasSomePoliKemo}
        >
          <Link
            to="/app/form/konsul"
            onClick={() =>
              noreg === null
                ? Modal.warning({
                    content: "Silahkan Pilih Pasien Terlebih Dahulu!",
                  })
                : detailKonsul(noreg)
            }
          >
            <u>K</u>onsul
          </Link>
        </Menu.Item>
        {hasSome ? (
          <Menu.Item key="infeksi" style={{ backgroundColor: "#d6e4ff" }}>
            <Link to="/app/form/infeksi" onClick={() => getPPI(norm)}>
              Pantauan Infeksi
            </Link>
          </Menu.Item>
        ) : null}
        <Menu.Item
          key="tindaklanjut"
          style={{ backgroundColor: "#ffd6e7" }}
          // disabled={hasSomePoliKemo}
        >
          <Link
            to="/app/form/tindaklanjut"
            onClick={() => {
              setKontrolForm(3);
            }}
          >
            Tindak Lanjut
          </Link>
        </Menu.Item>
        {ruangasal === "9116" || ruangasal === "9117" ? (
          <Menu.Item key="suket" style={{ backgroundColor: "#ffd6e7" }}>
            <Link
              to="/app/form/suket"
              onClick={() => {
                getListSuketRJ(noreg);
                setNoSPRP(null);
                setNoSK(null);
                setNoSKD(null);
                setjenisKeterangan(null);
                getListDokter();
              }}
            >
              Suket
            </Link>
          </Menu.Item>
        ) : (
          <></>
        )}
        {hasSomeKemo ? (
          <Menu.Item key="protokol" style={{ backgroundColor: "#ffccc7" }}>
            <Link
              to="/app/form/protokolkemo"
              onClick={() => {
                settabProtKemo("1");
                getDataTerapiKemoterapiPoli(curpas.registrasiId, ruangasal);
                if (curpas.registrasiId) {
                  getProtokolPasien(curpas.registrasiId);
                }
              }}
            >
              Protokol Kemo
            </Link>
          </Menu.Item>
        ) : (
          <></>
        )}
      </Menu>
    </Header>
  );
};

export default MenubarForm;
