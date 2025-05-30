import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { Modal, message } from "antd";
import { LoginContext } from "../../rawatjalan/context";
// import jwt_decode from "jwt-decode";
// import Koneksi from '../component/api/koneksi';

export const PasienRIContext = createContext();

const PasienRIContextProvider = (props) => {
  const { sendTele } = useContext(LoginContext);
  const [viewaskep, setviewaskep] = useState("");
  const [tabkey, setTabkey] = useState("1");
  const [pasien, setPasien] = useState([]);
  const [pasienhd, setPasienHD] = useState([]);
  const [diagram, setDiagram] = useState([]);
  const [jumlah, setJumlah] = useState("");
  const [jumlahPoli, setJumlahPoli] = useState("");
  const [curpas, setCurpas] = useState("");
  const [noreg, setNoreg] = useState("");
  const [ruangasal, setRuangasal] = useState("");
  const [caramasukid, setCaraMasuk] = useState([]);
  const [poli, setPoli] = useState([]);
  const [poli1, setPoli1] = useState([]);
  const [penunjang, setPenunjang] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [apotik, setApotik] = useState([]);
  const [pasienRI, setPasienRI] = useState([]);
  const [jumlahPasienRI, setJumlahPasienRI] = useState([]);
  const [curpasRI, setCurpasRI] = useState([]);
  const [curpasPulang, setCurpasPulang] = useState([]);
  const [stsPulang, setstsPulang] = useState(false);
  const [iniPasien, setIniPasien] = useState("");
  const [pembayaran, setPembayaran] = useState([]);
  const [riwayatpasien, setRiwayatPasien] = useState([]);
  const [riwayatpenyakit, setRiwayatPenyakit] = useState([]);
  const [riwayatpemeriksaan, setRiwayatPemeriksaan] = useState([]);
  // const [lebar, setLebar] = useState(250);
  const [refresh, setRefresh] = useState(false);
  // const [line2, setLine] = useState([]);
  const [line3, setLine2] = useState([]);
  const [ruangRi, setruangRi] = useState([]);
  const [ruangRiDesk, setruangRiDesk] = useState("");
  const [listRuangBylayanan, setlistRuangBylayanan] = useState([]);
  const [listPasienBySkeyRuang, setListPasienBySkeyRuang] = useState([]);
  const [listAlertDx, setlistAlertDx] = useState([]);

  const [current, setCurrent] = useState("dashboardpasienri");
  const [keyDx, setKeyDx] = useState("Dx1");
  const [keybill, setkeybill] = useState("bill1");
  const [keykedatangan, setkeykedatangan] = useState("awal2");
  const [keykepulangan, setkeykepulangan] = useState("end1");
  const [keyorder, setkeyorder] = useState("order1");
  const [keyGizi, setkeyGizi] = useState("screeningGizi");
  const [keyAskep, setkeyAskep] = useState("Askep1");

  const [pilih, setPilih] = useState(false);
  const [lebarnama, setLebarNama] = useState("300px");
  const [lebar, setLebar] = useState("300px");

  const [lookupPoli, setlookupPoli] = useState([]);
  const [loadPasien, setloadPasien] = useState(false);
  const [pasienRIPulang, setPasienRIPulang] = useState([]);
  const [swtichPasien, setswtichPasien] = useState(false);
  const [modalMutasi, setmodalMutasi] = useState(false);
  const [modalTFPenjamin, setmodalTFPenjamin] = useState(false);
  const [modalGabungCPPT, setmodalGabungCPPT] = useState(false);
  const [listRuang, setlistRuang] = useState([]);
  const [listPenjamin, setlistPenjamin] = useState([]);
  const [listKamarKosong, setlistKamarKosong] = useState([]);
  const [ttPasien, setttPasien] = useState({
    RuangId: "-",
    bedId: "-.-",
    extra: false,
    keterangan: null,
    noBed: "-",
    registrasiId: "-",
  });

  const [penjamin, setPenjamin] = useState("");
  const [noSep, setnoSep] = useState("");

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const RsLokasi = sessionStorage.getItem("RSMana");
  const kodeDokter = sessionStorage.getItem("pegawai");
  const userlognm = sessionStorage.getItem("userId");

  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  useEffect(() => {
    const tok = sessionStorage.getItem("userData");
    const usr = sessionStorage.getItem("user");

    const options = {
      headers: { Authorization: "Bearer " + tok },
    };

    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/ /1/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuang(res.data.result);
        } else {
          setRuang([]);
          console.log("dataruangkosong");
        }
      })
      .catch((err) => {
        console.log(usr);
        setRuang([]);
      });
  }, [token, apiku]);

  const cariRuangUserRI = () => {
    const usr = sessionStorage.getItem("user");
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/ /1/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuang(res.data.result);
          cariPasienRuangRI(res.data.result[0].ruangId);
          setruangRi(res.data.result[0].ruangId);
          console.log("dataruang", res.data.result);
        } else {
          setRuang([]);
          console.log("dataruangkosong");
        }
      })
      .catch((err) => {
        console.log(usr);
        setRuang([]);
      });
  };

  const cariPasien = (nama) => {
    axios
      .get(
        `${apiku}/EmrPasienAktif/LookupByRuang/${
          nama === "" ? " " : nama
        }/${ruangasal}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasien(res.data.result);
          console.log(res.data.result.length);
        } else {
          setPasien([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const aletDiagnosa = (pasienid) => {
    axios
      .get(`${apiku}/EmrDiagnosis/ReadPeringatanPenderita/${pasienid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistAlertDx(res.data.result);
          // console.log(res.data.result);
        } else {
          setlistAlertDx([]);
          // console.log("data alert dx tidak ada");
        }
      })
      .catch((err) => {
        setlistAlertDx([]);
        // console.log("data alert eror");
      });
  };

  const cariPasienRuangRI = (ruang) => {
    axios
      // .get(`${apiku}/EmrPasienAktif/LookupByRuang/%20/${ruang}`, options)
      // .then((res) => {
      //   if (res.data.statusCode === 200) {
      //     if (kodeDokter[0] === "D") {
      //       setPasienRI(
      //         res.data.result
      //           .filter((item) => item.dpjp === kodeDokter) // Bandingkan karakter pertama dari dokterId
      //           .sort((a, b) => a.namaPasien.localeCompare(b.namaPasien))
      //       );
      //       console.log(res.data.result);
      //     } else {
      //       setPasienRI(
      //         res.data.result.sort((a, b) =>
      //           a.namaPasien.localeCompare(b.namaPasien)
      //         )
      //       );
      //     }
      .get(
        `${apiku}/EmrPasienAktif/LookupByRuangBySMF/%20/${ruang}/${userlognm}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasienRI(
            res.data.result.sort((a, b) =>
              a.namaPasien.localeCompare(b.namaPasien)
            )
          );
          console.log(res.data.result);
          setloadPasien(false);
        } else {
          setPasienRI([]);
          setloadPasien(false);
          console.log(res.data);
        }
      })
      .catch((err) => {
        Modal.warning({
          title: "Gagal Menyimpan Data!",
          content: JSON.stringify(err.response),
        });
        setPasienRI([]);
        setloadPasien(false);
      });
  };

  const cariPasienRInama = (sskey, ruang) => {
    axios
      .get(
        `${apiku}/EmrPasienAktif/LookupByRuangBySMF/${sskey}/${ruang}/${userlognm}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasienRI(
            res.data.result.sort((a, b) =>
              a.namaPasien.localeCompare(b.namaPasien)
            )
          );
          setloadPasien(false);
        } else {
          setPasienRI([]);
          setloadPasien(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setloadPasien(false);
      });
  };

  const cariPasienRIPulang = (sskey, ruang) => {
    setloadPasien(true);
    // console.log(sskey + "/" + ruang);
    axios
      .get(
        `${apiku}/EmrPasienAktif/LookupPasienPulang/${sskey}/${ruang}/${userlognm}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasienRIPulang(
            res.data.result.sort((a, b) =>
              a.namaPasien.localeCompare(b.namaPasien)
            )
          );
          setloadPasien(false);
          // console.log(sskey, ruang, res.data.result);
        } else {
          setPasienRIPulang([]);
          setloadPasien(false);
          // console.log("datapasien pulang," + sskey);
        }
      })
      .catch((err) => {
        // console.log(err);
        // console.log(sskey, ruang);
        setPasienRIPulang([]);
        setloadPasien(false);
      });
  };

  const getLookupPoli = (sskey) => {
    axios
      .get(`${apiku}/MstRuang/LookupKlinik/${sskey}/1/1000`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlookupPoli(res.data.result);
        } else {
          setlookupPoli([]);
        }
      })
      .catch((err) => {
        setlookupPoli([]);
      });
  };

  const cariRuangUser = () => {
    const usr = sessionStorage.getItem("user");
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/ /1/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuang(res.data.result);
          console.log(usr);
          console.log("dataruang", res.data.result);
        } else {
          setRuang([]);
          console.log("data ruang tidak ditemukan");
        }
      })
      .catch((err) => {
        console.log(usr);
        console.log("data ruang tidak ditemukan");
      });
  };

  const detailPasien = (id) => {
    axios
      .get(`${apiku}/emrpasienaktif/read/datapasien/${id}`, options)
      .then((res) => {
        setCurpas(res.data.result);
        setNoreg(res.data.result.registrasiId);
        // setDetpas(res.data.result.pasien);
        // console.log(res.data.result.pasien);
        setCaraMasuk(res.data.result.caraMasukId);
        localStorage.setItem("ruangId", res.data.result.ruangId);
        localStorage.setItem("kelasRawatId", res.data.result.kelasRawatId);
        // console.log(res.data.result.ruangId)
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const detailPasienLive = (id) => {
    axios
      .get(`${apiku}/emrpasienaktif/readlive/datapasien/${id}`, options)
      .then((res) => {
        setCurpas(res.data.result);
        // setDetpas(res.data.result.pasien);
        // console.log(res.data.result.pasien);
        localStorage.setItem("ruangId", res.data.result.ruangId);
        localStorage.setItem("kelasRawatId", res.data.result.kelasRawatId);
        console.log(res.data.result.ruangId);
        console.log(res.data.result);
      });
  };

  const detailPasienRI = (id) => {
    axios
      .get(`${apiku}/emrpasienAktif/read/datapasien/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setCurpasRI(res.data.result);
          setIniPasien(res.data.result.registrasiId);
          if (res.data.result.ruangId.substring(0, 2) === "93") {
            ruangRi === res.data.result.ruangId
              ? console.log("")
              : Modal.warning({
                  title: "Ruang Perawatan dan Ruang Di sistem Berbeda!",
                  content:
                    "Silahkan Melakukan Mutasi Ulang Dengan Smartmedika atau Hubungi SIM RSMS",
                  onOk: () => {
                    setmodalMutasi(true);
                  },
                });
          }
          console.log("data pasien ada", res.data.result);
        } else {
          setCurpasRI([]);
          setIniPasien("");
          console.log("datapasien tdk ada", res.data.result);
          message.warning("Data Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setCurpasRI([]);
        setIniPasien("");
        console.log("eroro data pasien", err);
      });
  };

  const PasienPulang = (id) => {
    axios
      .get(`${apiku}/emrpasienAktif/read/datapasien/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setCurpasPulang(res.data.result);
        } else {
          setCurpasPulang([]);
          message.warning(
            "Data Tidak Ditemukan atau Pasien Sudah Di Invoice, Silahkan Kroseck Ke Kasir!"
          );
        }
      })
      .catch((err) => {
        setCurpasPulang([]);
        setIniPasien("");
        console.log("eroro data pasien", err);
      });
  };

  const getListPasienBySkeyRuang = (sskey, ruang) => {
    axios
      .get(`${apiku}/EmrPasienAktif/LookupByRuang/${sskey}/${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListPasienBySkeyRuang(res.data.result);
        } else {
          setListPasienBySkeyRuang([]);
          message.warning("Data Ruang Ditemukan!");
        }
      })
      .catch((err) => {
        console.log("eroro data pasien", err);
      });
  };

  const getRuangByKodeLayanan = (kode) => {
    axios
      .get(`${apiku}/MstRuang/Lookup/%20/${kode}/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistRuangBylayanan(res.data.result);
        } else {
          setlistRuangBylayanan([]);
          message.warning("Data Ruang Ditemukan!");
        }
      })
      .catch((err) => {
        console.log("eroro data pasien", err);
      });
  };

  const detailRiwayatPasien = (id) => {
    axios
      .get(`${apiku}/EmrPasienAktif/Riwayat/Pendaftaran/${id}`, options)
      .then((res) => {
        setRiwayatPasien(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const detailRiwayatPenyakit = (id) => {
    axios
      .get(`${apiku}/EmrPasienAktif/Riwayat/Penyakit/${id}`, options)
      .then((res) => {
        setRiwayatPenyakit(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const detailRiwayatPemeriksaan = (id) => {
    axios
      .get(`${apiku}/EmrPasienAktif/Riwayat/Pemeriksaan/${id}`, options)
      .then((res) => {
        setRiwayatPemeriksaan(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ambilRuang = (e) => {
    setRuangasal(e);
  };

  const tfPenjamin = (reg, penjamin, sep) => {
    // setloadingSuket(true);
    axios
      .post(
        `${apiku}/BillPemeriksaan/TransferPenjaminAll/${reg}/${penjamin}/${sep}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data!",
          });
          detailPasienRI(reg);
          setPenjamin("");
          setnoSep(null);
          setmodalTFPenjamin(false);
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          // setloadingSuket(false);
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Error WS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        // setloadingSuket(false);
      });
  };

  const getListRuangan = (e) => {
    axios
      .get(`${apiku}/MstRuang/LookupMaster/%20/${e}/1/200`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistRuang(res.data.result.filter((item) => item.status));
        } else {
          setlistRuang([]);
        }
      })
      .catch((err) => {
        setlistRuang([]);
        console.log(err);
      });
  };

  const getPenjaminByruang = (ruang) => {
    console.log(ruang);
    axios
      .get(`${apiku}/MstKamar/LookupKelasRawat/${ruang}`, options)
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) {
          setlistPenjamin(res.data.result);
          console.log(res.data);
        } else {
          setlistPenjamin([]);
          console.log("dta penjamin tidak afda");
        }
      })
      .catch((err) => {
        setlistPenjamin([]);
        console.log("dta penjamin eror");
        console.log(err);
      });
  };

  //mencari kamar kosong berdasarkan ruang, kelas, extra
  const getKamarKosong = (ruang, kelas, extra) => {
    console.log(ruang, kelas, extra);
    axios
      .get(`${apiku}/MstKamar/LookupBed/${ruang}/${kelas}/${extra}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setlistKamarKosong(res.data.result);
          const result = res.data.result.map((item, index) => {
            return { ...item, kode: index + 1 };
          });
          setlistKamarKosong(result);
        } else {
          setlistKamarKosong([]);
        }
      })
      .catch((err) => {
        setlistKamarKosong([]);
        console.log(err);
      });
  };

  //mencari kamar pasien saat ini
  const getTTpasien = (regid) => {
    axios
      .get(`${apiku}/MstKamar/LookupReg/${regid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setttPasien(res.data.result[0]);
          console.log(res.data.result[0]);
        } else {
          setttPasien({
            RuangId: "-",
            bedId: "-.-",
            extra: false,
            keterangan: null,
            noBed: "-",
            registrasiId: "-",
          });
        }
      })
      .catch((err) => {
        setttPasien({
          RuangId: "-",
          bedId: "-.-",
          extra: false,
          keterangan: null,
          noBed: "-",
          registrasiId: "-",
        });
        console.log(err);
      });
  };

  const insertMutasiRuang = (datamutasi) => {
    axios
      .post(`${apiku}/MstKamar/PostMutasiKamar`, datamutasi, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          Modal.success({
            content: "Berhasil Memindahkan Pasien!",
          });
          cariPasienRuangRI(ruangRi);
          setCurpasRI("");
          setmodalMutasi(false);
        } else {
          sendTele(
            "3",
            "transferpenjamin",
            JSON.stringify(res.data),
            JSON.stringify(datamutasi)
          );
          Modal.warning({
            title: "Gagal Memindahkan Pasien!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  return (
    <PasienRIContext.Provider
      value={{
        // cariPoliUser,
        cariRuangUser,
        ruangasal,
        ambilRuang,
        noreg,
        pasienRI,
        jumlahPasienRI,
        penunjang,
        caramasukid,
        // lebar,
        // setLebar,
        line3,
        apotik,
        diagram,
        pasien,
        curpas,
        poli,
        poli1,
        setPoli1,
        ruang,
        jumlah,
        jumlahPoli,
        curpasRI,
        riwayatpenyakit,
        riwayatpemeriksaan,
        detailRiwayatPenyakit,
        detailRiwayatPemeriksaan,
        detailPasien,
        cariPasien,
        cariPasienRuangRI,
        // cariPoli,
        // cariPasienRI,
        cariPasienRInama,
        detailPasienRI,
        iniPasien,
        setIniPasien,
        setCurpas,
        detailPasienLive,
        //ambilStatistik,
        pembayaran,
        riwayatpasien,
        detailRiwayatPasien,
        refresh,
        setRefresh,
        setJumlah,
        // ambilGrafik,
        // cariPasienHD,
        pasienhd,
        cariRuangUserRI,
        tabkey,
        setTabkey,
        ruangRi,
        setruangRi,
        setCurpasRI,
        listRuangBylayanan,
        getRuangByKodeLayanan,
        listPasienBySkeyRuang,
        getListPasienBySkeyRuang,
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
        current,
        setCurrent,
        keyGizi,
        setkeyGizi,
        pilih,
        setPilih,
        lebarnama,
        setLebarNama,
        lebar,
        setLebar,
        viewaskep,
        setviewaskep,
        lookupPoli,
        setlookupPoli,
        getLookupPoli,
        keyAskep,
        setkeyAskep,
        PasienPulang,
        curpasPulang,
        setCurpasPulang,
        stsPulang,
        setstsPulang,
        loadPasien,
        setloadPasien,
        pasienRIPulang,
        setPasienRIPulang,
        swtichPasien,
        setswtichPasien,
        cariPasienRIPulang,

        modalMutasi,
        setmodalMutasi,
        modalTFPenjamin,
        setmodalTFPenjamin,
        modalGabungCPPT,
        setmodalGabungCPPT,
        tfPenjamin,
        getListRuangan,
        listRuang,
        setlistRuang,
        listPenjamin,
        setlistPenjamin,
        listKamarKosong,
        setlistKamarKosong,
        getPenjaminByruang,
        getKamarKosong,
        getTTpasien,
        setttPasien,
        ttPasien,
        insertMutasiRuang,
        penjamin,
        setPenjamin,
        noSep,
        setnoSep,
        ruangRiDesk,
        setruangRiDesk,
        aletDiagnosa,
        listAlertDx,
        setlistAlertDx,
      }}
    >
      {props.children}
    </PasienRIContext.Provider>
  );
};

export default PasienRIContextProvider;
