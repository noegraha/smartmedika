import React, { createContext, useState, useEffect, useContext } from "react";
import { message, Modal } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { LoginContext } from "../../rawatjalan/context";
import { PasienContext } from "../../rawatjalan/context/PasienContext";

export const CatatanAskepContext = createContext();

const CatatanAskepContextProvider = (props) => {
  const { sendTele, ipPC, hostPc, namauser } = useContext(LoginContext);
  const { curpas } = useContext(PasienContext);
  const [listCatatanPasien, setListCatatanPasien] = useState([]);
  const [katonCatatan, setkatonCatatan] = useState(false);
  const [tanggalCatatan, setTanggalcatatan] = useState(dayjs());
  const [catatan, setCatatan] = useState("");
  const [idCatatan, setidCatatan] = useState(0);
  const [katonBacaCatatan, setkatonBacaCatatan] = useState(false);
  const [subjekC, setsubjekC] = useState("");
  const [assesmentC, setassesmentC] = useState("");
  const [planningC, setplanningC] = useState("");
  const [implementasiC, setimplementasiC] = useState("");
  const [evaluasiC, setevaluasiC] = useState("");
  const [waktu, setwaktu] = useState("");
  const [kirimcppt, setkirimcppt] = useState(false);

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getCatatanPasien = (regId) => {
    axios
      .get(`${apiku}/Askep/Catatan/GetByRegistrasiId/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListCatatanPasien(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setListCatatanPasien([]);
        }
      })
      .catch((err) => {
        setListCatatanPasien([]);
      });
  };

  const getPlanning = (regId) => {
    axios
      .get(`${apiku}/Askep/Catatan/IntervensiByRegistrasiId/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setplanningC(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setplanningC("");
        }
      })
      .catch((err) => {
        setplanningC("");
      });
  };

  const getEvalusi = (regId, tgl) => {
    axios
      .get(`${apiku}/Askep/Catatan/GetEvaluasi/${regId}/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setevaluasiC(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setevaluasiC("");
        }
      })
      .catch((err) => {
        setevaluasiC("");
      });
  };

  const getCatatanRJ = (Reg, Ruang, Tgl) => {
    axios
      .get(
        `${apiku}/Askep/Catatan/ReadCatatanRJ/${Reg}/${Ruang}/${Tgl}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("data catatan ada", res.data.result);
          setidCatatan(res.data.result.id);
          setCatatan(res.data.result.catatan);
        } else {
          console.log("data catatan kosong", Reg, Ruang, Tgl);
          setidCatatan(0);
          setCatatan("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const insertCatatanPasien = (dataCatatan) => {
    axios
      .post(`${apiku}/Askep/Catatan/Create`, dataCatatan)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getCatatanPasien(dataCatatan.registrasiId);
          setTanggalcatatan(dayjs());
          setkatonCatatan(false);
          setkatonBacaCatatan(false);
          setCatatan("");
          setidCatatan(0);
          setsubjekC("");
          setassesmentC("");
          setplanningC("");
          setimplementasiC("");
          setevaluasiC("");
          setwaktu("");
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal Menyimpan Catatan!");
          sendTele(
            "3",
            "Insert Impleentasi Asekp RJ",
            res.data.statusCode + "-" + res.data.message,
            ipPC,
            namauser,
            curpas.namaPasien,
            curpas.ruangDeskripsi,
            JSON.stringify(dataCatatan)
          );
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error Simpan Catatan!");
      });
  };

  const deleteCatatan = (id, regisid) => {
    axios
      .delete(`${apiku}/Askep/Catatan/Delete/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getCatatanPasien(regisid);
          Modal.success({
            title: "Data Berhasil Dihapus!",
            // content: res.data.message,
          });
        } else {
          message.warning("Gagal Dihapus!");
        }
      })
      .catch((err) => {
        message.error("Error Dihapus!");
      });
  };

  return (
    <CatatanAskepContext.Provider
      value={{
        listCatatanPasien,
        setListCatatanPasien,
        katonCatatan,
        setkatonCatatan,
        tanggalCatatan,
        setTanggalcatatan,
        catatan,
        setCatatan,
        idCatatan,
        setidCatatan,
        katonBacaCatatan,
        setkatonBacaCatatan,
        subjekC,
        setsubjekC,
        assesmentC,
        setassesmentC,
        planningC,
        setplanningC,
        implementasiC,
        setimplementasiC,
        evaluasiC,
        setevaluasiC,
        waktu,
        setwaktu,
        getCatatanPasien,
        getCatatanRJ,
        insertCatatanPasien,
        deleteCatatan,
        getPlanning,
        getEvalusi,
        kirimcppt,
        setkirimcppt,
      }}
    >
      {props.children}
    </CatatanAskepContext.Provider>
  );
};

export default CatatanAskepContextProvider;
