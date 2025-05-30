import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";
import dayjs from "dayjs";
import { LoginContext } from "../LoginContext";
import { PasienContext } from "../PasienContext";

export const PemeriksaanLainContext = createContext();

const PemeriksaanLainContextProvider = (props) => {
  const { namauser, sendTele } = useContext(LoginContext);
  const { curpas } = useContext(PasienContext);
  const ip = sessionStorage.getItem("IP");
  const [penunjangLainId, setpenunjangLainId] = useState(0);
  const [listpenunjanglain, setListPenunjangLain] = useState([]);
  const [listpmrlain, setListPemeriksaanLain] = useState([]);
  const [layananpmrlain, setLayananPemeriksaanLain] = useState([]);
  const [pelaksana, setPelaksana] = useState(null);
  const [kodehasil, setkodeHasil] = useState("");
  const [hasilpemeriksaan, setHasilPemeriksaan] = useState("");
  const [historyPemeriksaan, setHistoryPemeriksaanLain] = useState("");
  const [pelayanan, setPelayanan] = useState("");
  const [pelayananId, setPelayananId] = useState(null);
  const [keterangan, setKeterangan] = useState("");
  const [noregpas, setNoreg] = useState(null);
  const [kodehasilpas, setKodehasil] = useState(null);
  const [id, setID] = useState(null);
  const [tanggal, setTanggal] = useState(dayjs());
  const [tanggalMulai, settanggalMulai] = useState(null);
  const [tanggalSelesai, settanggalSelesai] = useState(null);

  const [ruangpasien, setRuangPasien] = useState(null);
  const [user, setUser] = useState(null);

  //kemoterapi
  const [idKemo, setIdKemo] = useState(0);
  const [terapi, setTerapi] = useState(null);
  const [listOrderObat, setlistOrderObat] = useState([]);
  const [listValidObat, setlistValidObat] = useState([]);
  const [spListObat, setspListObat] = useState(false);
  const [listMstProtokol, setlistMstProtokol] = useState([]);
  const [listRiwProtokol, setlistRiwProtokol] = useState([]);
  const [drProtokol, setdrProtokol] = useState();
  const [idProtokol, setidProtokol] = useState();
  const [obatProtokol, setobatProtokol] = useState();
  const [prosedurProtokol, setprosedurProtokol] = useState();
  const [userProtokol, setuserProtokol] = useState();
  const [ruangProtokol, setruangProtokol] = useState();
  const [spProtokol, setspProtokol] = useState(false);
  const [spTbRiwProtokol, setspTbRiwProtokol] = useState(false);
  const token = sessionStorage.getItem("userData");
  const noreg = sessionStorage.getItem("noreg");
  const apiku = sessionStorage.getItem("api");
  // const apiku = sessionStorage.getItem("apiPenunjang");
  const [tabProtKemo, settabProtKemo] = useState('1');
  const [tglDashboard, settglDashboard] = useState(null);
  const [tempRegId, settempRegId] = useState();
  const [tempPxId, settempPxId] = useState();

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  useEffect(() => {
    sessionStorage.setItem("userData", token);
    const tok = sessionStorage.getItem("userData");

    const options = {
      headers: { Authorization: "Bearer " + tok },
    };

    axios
      .get(`${apiku}/MstPenunjangLain/Lookup/%20`, options)
      .then((res) => {
        setListPenunjangLain(
          res.data.result.sort((a, b) =>
            a.deskripsiHasilPenunjang.localeCompare(b.deskripsiHasilPenunjang)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, apiku]);

  const listPemeriksaanLainOld = (noreg) => {
    axios
      .get(`${apiku}/EmrHasilPenunjangLain/Lookup/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListPemeriksaanLain(res.data.result);
        } else {
          setListPemeriksaanLain([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listPemeriksaanLain = (noreg) => {
    axios
      .get(
        `${apiku}/EmrHasilPenunjangLain/LookupPenunjangLuar/${noreg}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListPemeriksaanLain(res.data.result);
        } else {
          setListPemeriksaanLain([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const insertPemeriksaanLainRM = (isi) => {
    axios
      .post(`${apiku}/EmrHasilPenunjangLain/RM`, isi, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setKeterangan(null);
          setID(null);
          setNoreg(null);
          setKodehasil(null);
          setTanggal(dayjs());
          setRuangPasien(null);
          setPelaksana(null);
          setkodeHasil(null);
          setHasilPemeriksaan(null);
          setUser(null);
          listPemeriksaanLain(noregpas);
          message.success("Berhasil Disimpan!");
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Simpan!");
      });
  };

  const mappingLayananPemeriksaanLain = (id) => {
    axios
      .get(`${apiku}/MapingLayananPenunjangLain/Lookup/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLayananPemeriksaanLain(
            res.data.result.sort((a, b) =>
              a.pelayananDesk.localeCompare(b.pelayananDesk)
            )
          );
          console.log(res.data.result);
        } else {
          setLayananPemeriksaanLain([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappingLayananPemeriksaanLainByRuang = (id, ruang) => {
    axios
      .get(
        `${apiku}/MapingLayananPenunjangLain/LookupByRuang/${id}/${ruang}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLayananPemeriksaanLain(
            res.data.result.sort((a, b) =>
              a.pelayananDesk.localeCompare(b.pelayananDesk)
            )
          );
          console.log(res.data.result);
        } else {
          setLayananPemeriksaanLain([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const mappingLayananPemeriksaanLainByPelayananId = (id) => {
    axios
      .get(
        `${apiku}/MapingLayananPenunjangLain/LookupByPelayananId/${id}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setkodeHasil(res.data.result.penunjangLainId);
        } else {
          setkodeHasil(null);
        }
      })
      .catch((err) => {
        setkodeHasil(null);
        console.log(err);
      });
  };

  const detailPemeriksaanLain = (id) => {
    axios
      .get(`${apiku}/EmrHasilPenunjangLain/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListPemeriksaanLain(res.data.result);
        } else {
          setListPemeriksaanLain([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const historyPemeriksaanLain = (id) => {
    axios
      .get(`${apiku}/EmrHasilPenunjangLain/LookupByPasienID/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHistoryPemeriksaanLain(res.data.result);
        } else {
          setHistoryPemeriksaanLain([]);
        }
      })
      .catch((err) => {
        setHistoryPemeriksaanLain([]);
        console.log(err);
      });
  };

  const insertPemeriksaanLain = (datapemeriksaanlain) => {
    axios
      .post(`${apiku}/EmrHasilPenunjangLain`, datapemeriksaanlain, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil disimpan!");
          listPemeriksaanLain(noreg);
        } else {
          console.log(res.data);
          message.warning(res.data.message);
          sendTele(
            "3",
            "Insert Data Penunjang Lain",
            res.data.statusCode,
            res.data.message + " - " + JSON.stringify(datapemeriksaanlain),
            ip,
            namauser,
            curpas.namaPasien,
            curpas.ruangDeskripsi
          );
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  const insertPemeriksaanLainRI = (datapemeriksaanlain) => {
    axios
      .post(`${apiku}/EmrHasilPenunjangLain/RI`, datapemeriksaanlain, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil disimpan!");
          listPemeriksaanLain(noreg);
          setTanggal(dayjs());
          setkodeHasil("");
          setPelayanan("");
          settanggalMulai("");
          settanggalSelesai("");
          setPelaksana("");
          setHasilPemeriksaan("");
          setpenunjangLainId(0);
          kosongkanform();
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  const deletePemeriksaanLain = (noreg, id) => {
    axios
      .delete(`${apiku}/EmrHasilPenunjangLain/${noreg}/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Dihapus!");
          listPemeriksaanLain(noreg);
          setKeterangan(null);
          setID(null);
          setNoreg(null);
          setKodehasil(null);
          setTanggal(null);
          setRuangPasien(null);
          setPelaksana(null);
        } else {
          message.warning(res.data.message);
          listPemeriksaanLain(noreg);
        }
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
        console.log(err);
      });
  };
  const setKosongPl = () => {
    setkodeHasil([]);
    setPelayanan(null);
    setHasilPemeriksaan(null);
  };

  const getDataTerapiKemoterapiPoli = (id, ruang) => {
    axios
      .get(
        `${apiku}/EmrKemoterapi/getDataPasienKemoterapiPoli/${id}/${ruang}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setIdKemo(res.data.result.Id);
          setTerapi(res.data.result.Terapi);
        } else {
          // message.warning(res.data.result);
          setIdKemo(0);
          setTerapi(null);
        }
      })
      .catch((err) => {
        setIdKemo(0);
        setTerapi(null);
        message.error("Gagal Ambil!");
        console.log(err);
      });
  };

  const insertLaporanKemo = (isiterapi) => {
    axios
      .post(`${apiku}/EmrKemoterapi/insertkemolaporan`, isiterapi, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success(res.data.result.message);
          getDataTerapiKemoterapiPoli(
            isiterapi.registrasiId,
            isiterapi.ruangId
          );
        } else {
          console.log(res.data);
          message.warning(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  const getDataObat = (sNoReg, sRuangId) => {
    setspListObat(true);
    setlistOrderObat([]);
    setlistValidObat([]);
    if (sNoReg.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "No Registrasi tidak boleh kosong!",
      });
    } else if (sRuangId.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "RuangId tidak boleh kosong!",
      });
    } else {
      axios
        .get(
          `${apiku}/EmrKemoterapi/GetDataResep/${sNoReg}/${sRuangId}`,
          options
        )
        .then((response) => {
          setspListObat(false);
          console.log("getDataObat ", response.data);
          if (response.data.statusCode === 200) {
            if (response.data.result.length === 0) {
              Modal.info({
                title: "Informasi",
                content: "Tidak ada data Obat pasien tersebut.",
              });
            } else {
              setlistOrderObat(response.data.result.orderList);
              setlistValidObat(response.data.result.validList);
              // let datac = response.data.result.validList;
              // datac.forEach(function (row, index) {
              //   row.Obat.forEach(function (rowa, indexa) {
              //     rowa.key = indexa;
              //   });
              // });
              // setlistValidObat(datac);

              // let dataca = response.data.result.orderList;
              // dataca.forEach(function (row, index) {
              //   row.Obat.forEach(function (rowa, indexa) {
              //     rowa.key = indexa;
              //   });
              // });
              // setlistOrderObat(dataca);
            }
          } else {
            // setspDataPasien(false)
            // setspSimpanKemoLaporan(false)
            Modal.error({
              title: "Gagal!",
              content: `Gagal melakukan proses ambil data Order/Validasi Obat! -> ${response.data.result}`,
            });
          }
        })
        .catch((err) => {
          Modal.error({
            title: "ERROR!",
            content: `ERROR!, melakukan proses ambil data Order/Validasi Obat! -> ${err}`,
          });
        });
    }
  };

  const kosongkanform = () => {
    setpenunjangLainId(0);
    setTanggal(dayjs());
    settanggalMulai(null);
    settanggalSelesai(null);
    setkodeHasil("");
    setPelayanan("");
    setHasilPemeriksaan("");
    setPelaksana("");
  };

  const getMstProtokolKemo = (dokterId) => {
    axios
      .get(
        `${apiku}/MstProtokolKemoterapi/GetListMasterProtokolbyDokter/${dokterId}`,
        options
      )
      .then((res) => {
        console.log("getMstProtokolKemo : ", res);
        if (res.data.statusCode === 200) {
          setlistMstProtokol(res.data.result.result);
        } else {
          setlistMstProtokol([]);
          // message.warning(res.data.result);
          // setIdKemo(0);
          // setTerapi(null);
        }
      })
      .catch((err) => {
        setlistMstProtokol([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil List Master Protokol Kemoterapi! -> ${err}`,
        });
      });
  };

  const getProtokolPasien = (regId) => {
    setspProtokol(true);
    axios
      .get(`${apiku}/EmrKemoterapi/GetProtokolPasien/${regId}`, options)
      .then((res) => {
        setspProtokol(false);
        console.log("getProtokolPasien : ", res);
        if (res.data.statusCode === 200) {
          if (res.data.result !== null) {
            let data = res.data.result;
            Modal.success({
              title: "Protokol Kemoterapi",
              content: `Protokol Kemoterapi dari : ${data.Deskripsi}`,
              onOk: () => {
                setdrProtokol(data.DokterId);
                setidProtokol(data.MstProtokolId);
                setobatProtokol(data.ObatProtokol);
                setprosedurProtokol(data.ProsedurProtokol);
                getMstProtokolKemo(data.DokterId);
                setuserProtokol(data.UserId);
                setruangProtokol(data.Deskripsi);
              },
            });
          } else {
            setdrProtokol();
            setidProtokol();
            setobatProtokol();
            setprosedurProtokol();
            setuserProtokol();
            setruangProtokol();
          }
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal mengambil Protokol Kemoterapi! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspProtokol(false);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil Protokol Kemoterapi pasien! -> ${err}`,
        });
      });
  };

  const insertProtokolKemo = (data) => {
    setspProtokol(true);
    axios
      .post(`${apiku}/EmrKemoterapi/InsertProtokolKemo`, data, {
        headers: options.headers,
      })
      .then((res) => {
        console.log(res);
        setspProtokol(false);
        if (res.data.result.code === "200") {
          Modal.success({
            title: "Sukses",
            content: res.data.result.message,
            onOk: () => {
              // setmdCreateProtokol(false);
              getProtokolPasien(data.registrasiId);
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal simpan Protokol Kemoterapi! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspProtokol(false);
        Modal.error({
          title: "Error",
          content: `Error melakukan simpan Protokol Kemoterapi! -> ${err}`,
        });
      });
  };

  const getRiwProtokol = (pasienId) => {
    setspTbRiwProtokol(true);
    axios
      .get(`${apiku}/EmrKemoterapi/GetRiwProtokolPasien/${pasienId}`, options)
      .then((res) => {
        setspTbRiwProtokol(false);
        console.log("getRiwProtokol : ", res);
        if (res.data.statusCode === 200) {
          setlistRiwProtokol(res.data.result);
        } else {
          setlistRiwProtokol([]);
          Modal.error({
            title: "Gagal!",
            content: `Gagal mengambil Protokol Kemoterapi! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspTbRiwProtokol(false);
        setlistRiwProtokol([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil Riwayat Protokol Kemoterapi pasien! -> ${err}`,
        });
      });
  };

  return (
    <PemeriksaanLainContext.Provider
      value={{
        detailPemeriksaanLain,
        listPemeriksaanLain,
        insertPemeriksaanLain,
        listpmrlain,
        pelaksana,
        setPelaksana,
        hasilpemeriksaan,
        setHasilPemeriksaan,
        listpenunjanglain,
        kodehasil,
        setkodeHasil,
        layananpmrlain,
        mappingLayananPemeriksaanLain,
        pelayanan,
        setPelayanan,
        deletePemeriksaanLain,
        setKosongPl,
        historyPemeriksaan,
        historyPemeriksaanLain,
        mappingLayananPemeriksaanLainByRuang,
        insertPemeriksaanLainRM,
        keterangan,
        setKeterangan,
        noregpas,
        setNoreg,
        id,
        setID,
        kodehasilpas,
        setKodehasil,
        tanggal,
        setTanggal,
        tanggalMulai,
        settanggalMulai,
        tanggalSelesai,
        settanggalSelesai,
        ruangpasien,
        setRuangPasien,
        mappingLayananPemeriksaanLainByPelayananId,
        setListPemeriksaanLain,
        insertLaporanKemo,
        terapi,
        setTerapi,
        getDataTerapiKemoterapiPoli,
        listOrderObat,
        setlistOrderObat,
        listValidObat,
        listMstProtokol,
        setlistMstProtokol,
        listRiwProtokol,
        setlistRiwProtokol,
        drProtokol,
        setdrProtokol,
        idProtokol,
        setidProtokol,
        obatProtokol,
        setobatProtokol,
        prosedurProtokol,
        setprosedurProtokol,
        userProtokol, setuserProtokol,
        ruangProtokol, setruangProtokol,
        setlistValidObat,
        tabProtKemo, settabProtKemo,
        tglDashboard, settglDashboard,
        tempRegId, settempRegId,
        tempPxId, settempPxId,
        spListObat,
        setspListObat,
        spProtokol,
        setspProtokol,
        spTbRiwProtokol,
        setspTbRiwProtokol,
        getDataObat,
        getMstProtokolKemo,
        getProtokolPasien,
        insertProtokolKemo,
        getRiwProtokol,
        idKemo,
        setIdKemo,
        pelayananId,
        setPelayananId,
        kosongkanform,
        penunjangLainId,
        user,
        setUser,
        setpenunjangLainId,
        insertPemeriksaanLainRI,
      }}
    >
      {props.children}
    </PemeriksaanLainContext.Provider>
  );
};

export default PemeriksaanLainContextProvider;
