import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const RJumumContext = createContext();

const RJumumContextProvider = (props) => {
  const [datarjumum, setDataRJumum] = useState([]);
  const [protesa, setProtesa] = useState([]);
  const [hubkeluarga, setHubunganKeluarga] = useState([]);
  const [alatbantu, setAlatBantu] = useState([]);
  const [cacattubuh, setCacatTubuh] = useState([]);
  const [adl, setADL] = useState([]);
  const [supkeluarga, setSupportKeluarga] = useState([]);
  const [psikologis, setPsikologis] = useState([]);
  const [keyakinan, setKeyakinanAgama] = useState([]);
  const [analisa, setAnalisa] = useState("");
  const [implementasi, setImplementasi] = useState("");
  const [edukasi, setEdukasi] = useState("");
  const [obat, setObat] = useState([]);
  const [ketobat, setKetObat] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertRJumum = (datarj) => {
    axios
      .post(`${apiku}/EmrRawatJalan`, datarj, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan Emr RJ!");
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const detailRJumum = (id) => {
    axios
      .get(`${apiku}/EmrRawatJalan/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataRJumum(res.data.result);
          // console.log(res.data.result.alatBantu);
          // setCaraKunjung(res.data.result.caraKunjung);
          setHubunganKeluarga(res.data.result.hubunganKeluarga);
          setKeyakinanAgama(res.data.result.keyakinanAgama);
          setSupportKeluarga(res.data.result.supportKeluarga);
          setADL(res.data.result.adl);
          setProtesa(res.data.result.protesa);
          setAlatBantu(res.data.result.alatBantu);
          setCacatTubuh(res.data.result.cacatTubuh);
          setPsikologis(res.data.result.psikologis);
          setAnalisa(res.data.result.analisaKeperawatan);
          setImplementasi(res.data.result.implementasi);
          setEdukasi(res.data.result.edukasi);
          setObat(res.data.result.rekonsiliasiObat);
          setKetObat(res.data.result.keteranganRekonsiliasi);
        } else {
          message.warning(res.data.message);
          setHubunganKeluarga(null);
          setKeyakinanAgama(null);
          setSupportKeluarga(null);
          setADL(null);
          setProtesa(null);
          setAlatBantu(null);
          setCacatTubuh(null);
          setPsikologis(null);
          setAnalisa(null);
          setImplementasi(null);
          setEdukasi(null);
          setObat(2);
          setKetObat("");
        }
      })
      .catch((err) => {
        // console.log(err);
        setHubunganKeluarga(null);
        setKeyakinanAgama(null);
        setSupportKeluarga(null);
        setADL(null);
        setProtesa(null);
        setAlatBantu(null);
        setCacatTubuh(null);
        setPsikologis(null);
        setAnalisa(null);
        setImplementasi(null);
        setEdukasi(null);
        setObat(2);
        setKetObat("");
      });
  };
  return (
    <RJumumContext.Provider
      value={{
        datarjumum,
        protesa,
        keyakinan,
        adl,
        supkeluarga,
        alatbantu,
        cacattubuh,
        psikologis,
        hubkeluarga,
        analisa,
        implementasi,
        edukasi,
        obat,
        ketobat,
        setADL,
        setAlatBantu,
        setCacatTubuh,
        setHubunganKeluarga,
        setKeyakinanAgama,
        setProtesa,
        setPsikologis,
        setSupportKeluarga,
        setAnalisa,
        setImplementasi,
        setEdukasi,
        setObat,
        setKetObat,
        insertRJumum,
        detailRJumum,
      }}
    >
      {props.children}
    </RJumumContext.Provider>
  );
};

export default RJumumContextProvider;
