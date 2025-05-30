import React, { createContext, useState, useContext } from "react";
import { message, Modal } from "antd";
import axios from "axios";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";

export const AssesmentKeluhanRIContext = createContext();

const AssesmentKeluhanRIContextProvider = (props) => {
  const [tanggalKeluhan, settanggalKeluhan] = useState(dayjs());
  const [caraMasuk, setcaraMasuk] = useState("1");
  const [riwayatAlergi, setriwayatAlergi] = useState(null);
  const [riwayat, setriwayat] = useState(null);
  const [riwayatGenetik, setriwayatGenetik] = useState(null);
  const [ppsId, setppsId] = useState(1);
  const [nKeluhanNew, setnKeluhanNew] = useState([]);
  const [keluhanId, setkeluhanId] = useState([]);
  const [karakteristikId, setkarakteristikId] = useState([]);
  const [keluhanLain, setkeluhanLain] = useState(null);
  const [tablekeluhan, settablekeluhan] = useState([]);
  const [namakeluhan, setNamaKeluhan] = useState("");
  const [namakarakterisitik, setNamaKarakteristik] = useState("");

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getKeluhanByregId = (regId) => {
    axios
      .get(`${apiku}/Askep/Assesment/GetByRegistrasiId/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settanggalKeluhan(res.data.result.tanggal);
          setcaraMasuk(res.data.result.caraMasuk);
          setriwayatAlergi(res.data.result.riwayatAlergi);
          setriwayat(res.data.result.riwayat);
          setriwayatGenetik(res.data.result.riwayatGenetik);
          setppsId(res.data.result.ppsId);
        } else {
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };
  const insertKeluhan = (dataKeluahan) => {
    axios
      .post(`${apiku}/Askep/Assesment/Create`, dataKeluahan)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
        } else {
          message.error("Gagal Disimpan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Menyimpan Data");
      });
  };

  const getKeluhanByregIdRuangId = (regId, ruang) => {
    axios
      .get(`${apiku}/Askep/Assesment/GetByRuangId/${regId}/${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          settanggalKeluhan(dayjs(res.data.result.tanggal));
          setcaraMasuk(res.data.result.caraMasuk);
          setriwayatAlergi(res.data.result.riwayatAlergi);
          setriwayat(res.data.result.riwayat);
          setriwayatGenetik(res.data.result.riwayatGenetik);
          setppsId(res.data.result.ppsId);
          setnKeluhanNew(res.data.result.keluhan);
          settablekeluhan(res.data.result.keluhan);
        } else {
          settanggalKeluhan(dayjs());
          setcaraMasuk("");
          setriwayatAlergi("");
          setriwayat("");
          setriwayatGenetik("");
          setppsId(1);
          setnKeluhanNew([]);
          settablekeluhan([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const kosongkanformanamnesari = () => {
    settanggalKeluhan(dayjs());
    setcaraMasuk(1);
    setriwayatAlergi("");
    setriwayat("");
    setriwayatGenetik("");
    setppsId(1);
    setnKeluhanNew([]);
    settablekeluhan([]);
  };

  return (
    <AssesmentKeluhanRIContext.Provider
      value={{
        insertKeluhan,
        getKeluhanByregId,
        tanggalKeluhan,
        settanggalKeluhan,
        caraMasuk,
        setcaraMasuk,
        riwayatAlergi,
        setriwayatAlergi,
        riwayat,
        setriwayat,
        riwayatGenetik,
        setriwayatGenetik,
        ppsId,
        setppsId,
        nKeluhanNew,
        setnKeluhanNew,
        keluhanId,
        setkeluhanId,
        karakteristikId,
        setkarakteristikId,
        keluhanLain,
        setkeluhanLain,
        tablekeluhan,
        settablekeluhan,
        namakeluhan,
        setNamaKeluhan,
        namakarakterisitik,
        setNamaKarakteristik,
        getKeluhanByregIdRuangId,
        kosongkanformanamnesari,
      }}
    >
      {props.children}
    </AssesmentKeluhanRIContext.Provider>
  );
};

export default AssesmentKeluhanRIContextProvider;
