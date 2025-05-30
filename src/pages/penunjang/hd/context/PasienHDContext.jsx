import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../../rawatjalan/context";
import { message } from "antd";
// import jwt_decode from "jwt-decode";
// import Koneksi from '../component/api/koneksi';

export const PasienHDContext = createContext();

const PasienHDContextProvider = (props) => {
  const [pasienHD, setPasienHD] = useState([]);
  const [jumlah, setJumlah] = useState("");
  const [curpas, setCurpas] = useState("");
  const [noreg, setNoreg] = useState("");
  const [ruangasal, setRuangasal] = useState("");
  const [caramasukid, setCaraMasuk] = useState([]);
  const [poli1, setPoli1] = useState([]);
  const [riwayatpasien, setRiwayatPasien] = useState([]);
  const [riwayatpenyakit, setRiwayatPenyakit] = useState([]);
  const [riwayatpemeriksaan, setRiwayatPemeriksaan] = useState([]);
  const [lebar, setLebar] = useState(250);
  const [refresh, setRefresh] = useState(false);
  const [line3, setLine2] = useState([]);

  const {
    token,
    // apiku
  } = useContext(LoginContext);

  const apiku = sessionStorage.getItem("api");
  // const apiku = "182.168.6.72:5577";

  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  // useEffect(() => {
  //   const tok = sessionStorage.getItem("userData");

  //   const options = {
  //     headers: { Authorization: "Bearer " + tok },
  //   };

  //   axios
  //     .get(`${apiku}/EmrDialisisHeader/bysearch/%20`, options)
  //     .then((res) => {
  //       if (res.data.statusCode === 200) {
  //         setPasienHD(res.data.result);
  //         setRefresh(false);
  //       } else {
  //         setPasienHD([]);
  //         // message.warning(res.data.result);
  //         setRefresh(false);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       setRefresh(false);
  //     });
  // }, [token, apiku]);

  const cariPasienHD = () => {
    axios
      .get(`${apiku}/EmrDialisisHeader/bysearch/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasienHD(res.data.result);
          setRefresh(false);
        } else {
          setPasienHD([]);
          // message.warning(res.data.result);
          setRefresh(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setRefresh(false);
      });
  };

  const cariPasienHDNama = (nama) => {
    axios
      .get(
        `${apiku}/EmrDialisisHeader/bysearch/${nama === "" ? "%20" : nama}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasienHD(res.data.result);
          console.log(res.data.result.length);
        } else {
          setPasienHD([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailPasien = (id) => {
    axios
      .get(`${apiku}/emrpasienaktif/read/datapasien/${id}`, options)
      .then((res) => {
        setCurpas(res.data.result);
        setNoreg(res.data.result.registrasiId);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
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

  const ambilRuang = (e) => {
    setRuangasal(e);
  };

  return (
    <PasienHDContext.Provider
      value={{
        ruangasal,
        ambilRuang,
        noreg,
        caramasukid,
        lebar,
        setLebar,
        line3,
        curpas,
        poli1,
        setPoli1,
        jumlah,
        detailPasien,
        setCurpas,
        riwayatpasien,
        detailRiwayatPasien,
        refresh,
        setRefresh,
        setJumlah,
        pasienHD,
        setPasienHD,
        cariPasienHD,
        cariPasienHDNama,
      }}
    >
      {props.children}
    </PasienHDContext.Provider>
  );
};

export default PasienHDContextProvider;
