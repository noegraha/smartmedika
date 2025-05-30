import React, { createContext, useState, useContext } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { message, Modal } from "antd";
import { LoginContext } from "../../rawatjalan/context";

export const JadwalOperasiRIContext = createContext();

const JadwalOperasiRIContextProvider = (props) => {
  const [ajuanoperasi, setAjuanOperasi] = useState("");
  const [jadwaloperasi, setJadwalOperasi] = useState([]);
  const [kondisiTerakhir, setAmbilKondisiTerakhir] = useState("");

  const [ajuanId, setajuanId] = useState("0");
  const [kondisiTerakhirId, setkondisiTerakhirId] = useState("");
  const [pelayananId, setpelayananId] = useState("");
  const [lokasiOperasi, setlokasiOperasi] = useState("");
  const [tglTindakan, settglTindakan] = useState(dayjs().add(1, "days"));
  const [jenisAnestesi, setjenisAnestesi] = useState("");
  const [cito, setcito] = useState(false);
  const [dxPraBedah, setdxPraBedah] = useState("");
  const [jadwalOperasiId, setjadwalOperasiId] = useState([]);
  const [acceptable, setacceptable] = useState([]);
  const [keterangan, setketerangan] = useState("");
  const [dxKerja, setdxKerja] = useState("");
  const [catatanIbs, setcatatanIbs] = useState([]);
  const [alertsts, setAlertsts] = useState(false);
  const [stsSimpan, setStsSimpan] = useState("");
  const [ajuanopsama, setdataAjuaOpsama] = useState([]);
  const [listOperasiPasien, setListOperasiPasien] = useState([]);
  const [listOperasiPasienACC, setlistOperasiPasienACC] = useState([]);
  const [ajuanOpById, setAjuanOpById] = useState([]);
  const [dokterId, setdokterId] = useState("");
  const [formOrder, setFormOrder] = useState(false);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const AjuanJadwalOperasiRi = (tgl, ruang) => {
    axios
      .get(`${apiku}/RiJadwalOperasi/Ajuan/${tgl}/${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setAjuanOperasi(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("error Ajuan");
          setAjuanOperasi([]);
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Dat!");
      });
  };
  const getdiagnosaOp = (id) => {
    axios
      .get(`${apiku}/EmrDiagnosis/Read/${id}/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          console.log(
            res.data.result.find((item) => item.jenisDiagnosisId === 1)
              .diagnosisId
          );
          setdxPraBedah(
            res.data.result.find((item) => item.jenisDiagnosisId === 1)
              .diagnosisId
          );
        } else {
          setdxPraBedah("");
        }
      })
      .catch((err) => {
        setdxPraBedah("");
      });
  };

  const JadwalOperasiRI = (tgl) => {
    axios
      .get(`${apiku}/RiJadwalOperasi/DetailJadwal/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setJadwalOperasi(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("error Jadwal");
          setJadwalOperasi([]);
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Dat!");
      });
  };

  const AmbilKondisiTerakhir = (registrasiId) => {
    axios
      .get(
        `${apiku}/EmrTandaVital/ReadTandaVitalLastId/${registrasiId}`,
        options
      )

      .then((res) => {
        if (res.data.statusCode === 200) {
          setAmbilKondisiTerakhir(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setAmbilKondisiTerakhir([]);
        }
      })
      .catch((err) => {
        setAmbilKondisiTerakhir([]);
        message.error(err);
      });
  };

  const getListOperasiPasien = (registrasiId) => {
    axios
      .get(`${apiku}/EmrAjuanJadwalOperasi/Read/${registrasiId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListOperasiPasien(
            res.data.result.filter(function (e) {
              return e.jadwalOperasiId === null;
            })
          );

          setlistOperasiPasienACC(
            res.data.result.filter(function (e) {
              return e.jadwalOperasiId !== null;
            })
          );

          console.log(
            "Ajuan",
            res.data.result.filter(function (e) {
              return e.jadwalOperasiId === null;
            })
          );

          console.log(
            "ACC",
            res.data.result.filter(function (e) {
              return e.jadwalOperasiId !== null;
            })
          );
        } else {
          console.log("error Jadwal");
          console.log("gagalambil kondisiterakhir");
          setListOperasiPasien([]);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("eoror simpan operassi ajuan ");
        message.error("Gagal Disimpan!");
      });
  };

  const getAjuanOpById = (registrasiId, ajuanid) => {
    axios
      .get(
        `${apiku}/EmrAjuanJadwalOperasi/ID/${registrasiId}/${ajuanid}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setAjuanOpById(res.data.result);
          console.log("data kondisi terakhir");
          console.log(res.data.result);
        } else {
          console.log("error Jadwal");
          console.log("gagalambil kondisiterakhir");
          setAjuanOpById("");
        }
      })
      .catch((err) => {
        console.log(err);
        console.log("eoror simpan operassi ajuan ");
        message.error("Gagal Disimpan!");
      });
  };

  const AjuanJadwalId = (ajuanid) => {
    axios
      .get(`${apiku}/EmrAjuanJadwalOperasi/ID/${ajuanid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setAmbilKondisiTerakhir(res.data.result);
          console.log("data kondisi terakhir");
          console.log(res.data.result);
        } else {
          console.log("error Jadwal");
          console.log("gagalambil kondisiterakhir");
          setAmbilKondisiTerakhir("");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const insertAjuanOperasiRi = (dataajuan) => {
    axios
      .post(`${apiku}/EmrAjuanJadwalOperasi/AjuanJadwal`, dataajuan, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
          getListOperasiPasien(dataajuan.registrasiId);
          setFormOrder(false);
          console.log(dataajuan);
        } else {
          getListOperasiPasien(dataajuan.registrasiId);
          Modal.warning({
            title: "Data gagal disimpan!",
            content: JSON.stringify(res.data),
          });
          console.log(dataajuan);
        }
      })
      .catch(() => {
        message.error("Eror Saat Simpan Data Ajuan Operasi!");
        console.log(dataajuan);
      });
  };

  const deleteOrderOp = (RedIg, AjuanID) => {
    axios
      .delete(`${apiku}/EmrAjuanJadwalOperasi/${RedIg}/${AjuanID}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
            // content: res.data.message,
          });
          getListOperasiPasien(RedIg);
        } else {
          Modal.warning({
            title: "Data gagal dihapus!",
            content: res.data.message,
          });
          // setloadingSnomed(false);
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Gagal Disimpan!",
          content: "Terdapat gangguan koneksi data",
        });
      });
  };

  const kosongkanformAjuanOp = () => {
    setajuanId("");
    setpelayananId("");
    setlokasiOperasi("");
    settglTindakan(dayjs().add(1, "days"));
    setjenisAnestesi("");
    setcito(false);
    setdxPraBedah("");
    setjadwalOperasiId("");
    setacceptable("");
    setketerangan("");
    setcatatanIbs("");
    setdokterId("");
    console.log("kosngkan form order op");
  };

  return (
    <JadwalOperasiRIContext.Provider
      value={{
        jadwaloperasi,
        ajuanoperasi,
        setAjuanOperasi,
        setJadwalOperasi,
        JadwalOperasiRI,
        AjuanJadwalOperasiRi,
        kondisiTerakhir,
        setAmbilKondisiTerakhir,
        AmbilKondisiTerakhir,
        insertAjuanOperasiRi,
        AjuanJadwalId,
        ajuanId,
        setajuanId,

        kondisiTerakhirId,
        setkondisiTerakhirId,
        pelayananId,
        setpelayananId,
        lokasiOperasi,
        setlokasiOperasi,
        tglTindakan,
        settglTindakan,
        jenisAnestesi,
        setjenisAnestesi,
        cito,
        setcito,
        dxPraBedah,
        setdxPraBedah,
        jadwalOperasiId,
        setjadwalOperasiId,
        acceptable,
        setacceptable,
        keterangan,
        setketerangan,
        catatanIbs,
        setcatatanIbs,
        kosongkanformAjuanOp,
        alertsts,
        setAlertsts,
        stsSimpan,
        setStsSimpan,
        ajuanopsama,
        listOperasiPasien,
        setListOperasiPasien,
        getListOperasiPasien,
        ajuanOpById,
        setAjuanOpById,
        getAjuanOpById,
        dokterId,
        setdokterId,
        deleteOrderOp,
        listOperasiPasienACC,
        setlistOperasiPasienACC,
        formOrder,
        setFormOrder,
        dxKerja,
        setdxKerja,
        getdiagnosaOp,
      }}
    >
      {props.children}
    </JadwalOperasiRIContext.Provider>
  );
};

export default JadwalOperasiRIContextProvider;
