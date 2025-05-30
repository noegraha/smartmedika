import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { message } from "antd";
import dayjs from "dayjs";
import { LoginContext } from "../../../rawatjalan/context/LoginContext";

export const PelayananHDContext = createContext();

const PelayananHDContextProvider = (props) => {
  const [headerHD, setHeaderHD] = useState([]);
  const [dialisisHeaderId, setDialisisHeaderId] = useState([]);
  const [prevHistory, setPrevHistory] = useState([]);

  const [tanggalHD, setTanggalHD] = useState(dayjs());
  const [ruangId, setRuangId] = useState([]);
  const [dialisisKe, setDialisisKe] = useState("");
  const [alergiId, setAlergiId] = useState([]);
  const [riwAllObat, setRiwAllObat] = useState([]);
  const [riwAllObatKet, setRiwAllObatKet] = useState([]);
  const [verifHD, setVerifHD] = useState([]);
  const [noMesin, setNoMesin] = useState("");
  const [dialsiser, setDialsiser] = useState([]);
  const [bbKering, setBBKering] = useState([]);
  const [beratBadan, setBeratBadan] = useState([]);
  const [tanggalTV, setTanggalTV] = useState([]);
  const [statusNutrisi, setStatusNutrisi] = useState([]);
  const [urr, setURR] = useState([]);
  const [ktv, setKTV] = useState([]);
  const [noorder, setNoorder] = useState([]);

  const apiku = "182.168.6.72:5577";
  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getHeaderByNoOrder = (id) => {
    axios
      .get(`${apiku}/EmrDialisisHeader/bynoorder/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHeaderHD(res.data.result);
          setDialisisHeaderId(res.data.result.dialisisHeaderId);
          // setTanggalHD(res.data.result.tanggal);
          setRuangId(res.data.result.ruangId);
          setDialisisKe(res.data.result.dialisiske);
          setAlergiId(res.data.result.alergiId);
          setRiwAllObat(res.data.result.riwAllObat);
          setRiwAllObatKet(res.data.result.riwAllObatKet);
          setVerifHD(res.data.result.verifHd);
          setNoMesin(res.data.result.noMesin);
          setDialsiser(res.data.result.dialsiser);
          setNoorder(res.data.result.noOrder);
          console.log("getHeaderByNoOrder", res.data.result);
        } else {
          setHeaderHD([]);
          setDialisisHeaderId([]);
          // setTanggalHD([]);
          setRuangId([]);
          setDialisisKe([]);
          setAlergiId([]);
          setRiwAllObat([]);
          setRiwAllObatKet([]);
          setVerifHD([]);
          setNoMesin([]);
          setDialsiser([]);
          setNoorder([]);
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        setHeaderHD([]);
        setDialisisHeaderId([]);
        // setTanggalHD([]);
        setRuangId([]);
        setDialisisKe([]);
        setAlergiId([]);
        setRiwAllObat([]);
        setRiwAllObatKet([]);
        setVerifHD([]);
        setNoMesin([]);
        setDialsiser([]);
        setNoorder([]);
        console.log(err);
        message.warning("Gagal Mengambil Data HD");
      });
  };

  const getPreviousHistoryHD = (id) => {
    axios
      .get(`${apiku}/EmrDialisisHeader/prevhistory/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPrevHistory(res.data.result);
          // setTanggalHD(res.data.result.tanggal);
          setDialisisKe(res.data.result.dialisiske + 1);
          setRiwAllObat(res.data.result.riwAllObat);
          setRiwAllObatKet(res.data.result.riwAllObatKet);
          setVerifHD(res.data.result.verifHd);
          setNoMesin(res.data.result.noMesin);
          setDialsiser(res.data.result.dialsiser);
          // setBBKering(res.data.result.bbKering);
          // setBeratBadan(res.data.result.beratBadan);
          // setTanggalTV(res.data.result.tanggalTv);
          // setStatusNutrisi(res.data.result.statusNutrisi);
          // setURR(res.data.result.urr);
          // setKTV(res.data.result.ktv);
          console.log(res.data.result);
        } else {
          setPrevHistory([]);
          // setTanggalHD([]);
          setDialisisKe([]);
          setRiwAllObat([]);
          setRiwAllObatKet([]);
          setVerifHD([]);
          setNoMesin([]);
          setDialsiser([]);
          // setBBKering([]);
          // setBeratBadan([]);
          // setTanggalTV([]);
          // setStatusNutrisi([]);
          // setURR([]);
          // setKTV([]);
          console.log(res.data.result);
          // message.warning(res.data.result);
          message.warning("Riwayat HD Sebelumnya Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setPrevHistory([]);
        // setTanggalHD([]);
        setDialisisKe([]);
        setRiwAllObat([]);
        setRiwAllObatKet([]);
        setVerifHD([]);
        setNoMesin([]);
        setDialsiser([]);
        // setBBKering([]);
        // setBeratBadan([]);
        // setTanggalTV([]);
        // setStatusNutrisi([]);
        // setURR([]);
        // setKTV([]);
        console.log(err);
        message.warning("Gagal Mengambil Riwayat HD Sebelumnya");
      });
  };

  const insertHeaderHD = (dataHeaderHD) => {
    axios
      .post(`${apiku}/EmrDialisisHeader/insertpasienhd`, dataHeaderHD, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHeaderHD(res.data.result);
          setDialisisHeaderId(res.data.result.dialisisHeaderId);
          // setTanggalHD(res.data.result.tanggal);
          setRuangId(res.data.result.ruangId);
          setDialisisKe(res.data.result.dialisiske);
          setAlergiId(res.data.result.alergiId);
          setRiwAllObat(res.data.result.riwAllObat);
          setRiwAllObatKet(res.data.result.riwAllObatKet);
          setVerifHD(res.data.result.verifHd);
          setNoMesin(res.data.result.noMesin);
          setDialsiser(res.data.result.dialsiser);
          setNoorder(res.data.result.noOrder);
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
        } else {
          console.log(res.data.result);
          message.error(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  return (
    <PelayananHDContext.Provider
      value={{
        headerHD,
        dialisisHeaderId,
        prevHistory,
        tanggalHD,
        dialisisKe,
        alergiId,
        riwAllObat,
        riwAllObatKet,
        verifHD,
        noMesin,
        dialsiser,
        bbKering,
        beratBadan,
        tanggalTV,
        statusNutrisi,
        urr,
        ktv,
        noorder,
        setHeaderHD,
        setDialisisHeaderId,
        setPrevHistory,
        setTanggalHD,
        setDialisisKe,
        setAlergiId,
        setRiwAllObat,
        setRiwAllObatKet,
        setVerifHD,
        setNoMesin,
        setDialsiser,
        setBBKering,
        setBeratBadan,
        setTanggalTV,
        setStatusNutrisi,
        setURR,
        setKTV,
        setNoorder,
        getHeaderByNoOrder,
        getPreviousHistoryHD,
        insertHeaderHD,
      }}
    >
      {props.children}
    </PelayananHDContext.Provider>
  );
};

export default PelayananHDContextProvider;
