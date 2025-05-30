import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const IGDContext = createContext();

const IGDContextProvider = (props) => {
  const [listpasienigd, setListPasienIGD] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [jumlahpasien, setJumlahPasien] = useState("");
  const [lebar, setLebar] = useState(250);
  const [layout, setLayout] = useState(true);
  const [open, setOpen] = useState(false);
  const [currentt, setCurrentt] = useState(1);
  const [pilih, setPilih] = useState(false);
  const [lebarnama, setLebarNama] = useState("150px");

  //state triase
  const [nopasien, setNoPasien] = useState(null);
  const [tgldatang, setTglDatang] = useState(null);
  const [vaksin, setVaksin] = useState(null);
  const [keluhan, setKeluhan] = useState(null);
  const [asal, setAsal] = useState(null);
  const [triase, setTriase] = useState(null);
  const [prioritas, setPrioritas] = useState(null);
  const [kddokter, setKdDokter] = useState(null);
  const [nmdokter, setNmDokter] = useState(null);
  const [dateentry, setDateEntry] = useState(null);
  const [userentry, setUserEntry] = useState(null);
  const [dateupdate, setDateUpdate] = useState(null);
  const [userupdate, setUserUpdate] = useState(null);
  const [namapasien, setNamaPasien] = useState(null);
  const [jnskelamin, setJnsKelamin] = useState(null);
  const [tgllahir, setTglLahir] = useState(null);
  const [e, setE] = useState(null);
  const [v, setV] = useState(null);
  const [m, setM] = useState(null);
  const [ketGcs, setKetGcs] = useState(null);
  const [SPO2, setSPO2] = useState(null);
  const [akral, setAkral] = useState(null);
  const [TDatas, setTDatas] = useState(null);
  const [TDbawah, setTDbawah] = useState(null);
  const [pernafasan, setPernafasan] = useState(null);
  const [nadi, setNadi] = useState(null);
  const [suhu, setSuhu] = useState(null);
  const [TB, setTB] = useState(null);
  const [BB, setBB] = useState(null);
  const [IMT, setIMT] = useState(null);
  const [VAS, setVAS] = useState(null);

  // state koneksi
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getListPasienIGD = () => {
    axios
      .get(`${apiku}/EmrPasienAktif/LookupPasienIGD`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListPasienIGD(res.data.result);
          setJumlahPasien(res.data.result.length);
          console.log(res.data.result);
        } else {
          setListPasienIGD([]);
          setJumlahPasien("");
          message.warning("Pasien Tidak Ada!");
        }
      })
      .catch((err) => {
        setListPasienIGD([]);
        setJumlahPasien("");
        console.log(err);
        message.error("Gagal Ambil!");
      })
      .finally(() => {
        setRefresh(false);
      });
  };

  const getTriaseIGD = (noreg) => {
    axios
      .get(`${apiku}/igd/Triase/Read/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const result = res.data.result;
          setNoPasien(result.nopasien);
          setTglDatang(result.tgldatang);
          setVaksin(result.vaksin);
          setKeluhan(result.keluhan);
          setAsal(result.asal);
          setTriase(result.triase);
          setPrioritas(result.prioritas);
          setKdDokter(result.kddokter);
          setNmDokter(result.nmdokter);
          setDateEntry(result.dateentry);
          setUserEntry(result.userentry);
          setDateUpdate(result.dateupdate);
          setUserUpdate(result.userupdate);
          setNamaPasien(result.NAMAPASIEN);
          setJnsKelamin(result.JNSKELAMIN);
          setTglLahir(result.TGLLAHIR);
          setE(result.e);
          setV(result.v);
          setM(result.m);
          setKetGcs(result.ketGcs);
          setSPO2(result.SPO2);
          setAkral(result.akral);
          setTDatas(result.TDatas);
          setTDbawah(result.TDbawah);
          setPernafasan(result.pernafasan);
          setNadi(result.nadi);
          setSuhu(result.suhu);
          setTB(result.TB);
          setBB(result.BB);
          setIMT(result.IMT);
          setVAS(result.VAS);
        } else {
          message.warning("Data Tidak Ada!");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Ambil!");
      })
      .finally(() => {
        setRefresh(false);
      });
  };

  return (
    <IGDContext.Provider
      value={{
        refresh,
        setRefresh,
        listpasienigd,
        getListPasienIGD,
        layout,
        setLayout,
        lebar,
        setLebar,
        jumlahpasien,
        collapsed,
        setCollapsed,
        setOpen,
        open,
        currentt,
        setCurrentt,
        pilih,
        setPilih,
        lebarnama,
        setLebarNama,
        getTriaseIGD,
        nopasien,
        setNoPasien,
        tgldatang,
        setTglDatang,
        vaksin,
        setVaksin,
        keluhan,
        setKeluhan,
        asal,
        setAsal,
        triase,
        setTriase,
        prioritas,
        setPrioritas,
        kddokter,
        setKdDokter,
        nmdokter,
        setNmDokter,
        dateentry,
        setDateEntry,
        userentry,
        setUserEntry,
        dateupdate,
        setDateUpdate,
        userupdate,
        setUserUpdate,
        namapasien,
        setNamaPasien,
        jnskelamin,
        setJnsKelamin,
        tgllahir,
        setTglLahir,
        e,
        setE,
        v,
        setV,
        m,
        setM,
        ketGcs,
        setKetGcs,
        SPO2,
        setSPO2,
        akral,
        setAkral,
        TDatas,
        setTDatas,
        TDbawah,
        setTDbawah,
        pernafasan,
        setPernafasan,
        nadi,
        setNadi,
        suhu,
        setSuhu,
        TB,
        setTB,
        BB,
        setBB,
        IMT,
        setIMT,
        VAS,
        setVAS,
      }}
    >
      {props.children}
    </IGDContext.Provider>
  );
};

export default IGDContextProvider;
