import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { PasienRIContext } from "./PasienRIContext";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
export const PelayananRIContext = createContext();

const PelayananRIContextProvider = (props) => {
  const { curpasRI } = useContext(PasienRIContext);
  const [pelayananRI, setPelayanan] = useState([]);
  const [pelayananruang, setPelayananRuang] = useState([]);
  const [caramasuk, setCaraMasuk] = useState([]);
  const [indikasi, setIndikasi] = useState([]);
  const [dokterpoli, setDokterpoli] = useState([]);
  const [dokter, setDokter] = useState([]);
  const [dokterall, setDokterAll] = useState([]);
  const [pelaksana, setPelaksana] = useState([]);
  const [kosong, setKosong] = useState([]);
  const [jnspelayanan, setJenisPelayanan] = useState([]);
  const [pelayananbedah, setPelayananBedah] = useState([]);
  const [billlayanan, setBilllayanan] = useState("");
  const [detpel, setDetpel] = useState("");
  const [biayapel, setBiayaPel] = useState("");
  const ruangId = localStorage.getItem("ruangId");
  const kelasRawatId = localStorage.getItem("kelasRawatId");
  const [tabkey, setTabkey] = useState("3");
  const [hitung, setHitung] = useState(0);
  const [mode, setMode] = useState(true);
  const token = sessionStorage.getItem("userData");

  const tok = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  useEffect(() => {
    const tok = sessionStorage.getItem("userData");

    const options = {
      headers: { Authorization: "Bearer " + tok },
    };
    axios.get(`${apiku}/mstDokter/Lookup/Dr/1/1000`, options).then((res) => {
      setDokterAll(res.data.result);
    });
    axios
      .get(`${apiku}/MstCaraMasukKeluar/Lookup/1/ /1/10`, options)
      .then((res) => {
        setCaraMasuk(res.data.result);
      });
    axios
      .get(`${apiku}/MstIndikasiDirawat/Lookup/ /1/10`, options)
      .then((res) => {
        setIndikasi(res.data.result);
      });
    axios
      .get(`${apiku}/MstJenisLayanan/Lookup/ /1/100`, options)
      .then((res) => {
        setJenisPelayanan(res.data.result);
      });
  }, [token]);

  const loadPelayananRuang = (ruang) => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/Read/${ruang}/1/1000`, options)
      .then((res) => {
        // setPelayanan([]);
        setPelayananRuang(res.data.result);
      });
  };

  const loadPelayananRI = (ruang) => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/Read/${ruang}/1/1000`, options)
      .then((res) => {
        setPelayanan(res.data.result);
        console.log("pelayananri", res.data.result);
      });
    axios
      .get(`${apiku}/mstDokter/Lookup/${ruang}/1/100`, options)
      .then((res) => {
        setDokter(res.data.result);
        console.log("dokterri", res.data.result);
      });
    axios
      .get(`${apiku}/mstDokter/Lookup/${ruang}/1/100`, options)
      .then((res) => {
        setPelaksana(res.data.result);
        console.log("pelaksanari", res.data.result);
      });
  };

  const cariPelayanan = (nama) => {
    axios
      .get(
        `${apiku}/MstStandarPelayananRuang/Read/${nama}/${ruangId}/${kelasRawatId}/1/100`,
        options
      )
      .then((res) => {
        setBiayaPel(res.data.result);
      });
  };
  const detailPelayanan = (id) => {
    axios
      .get(
        `${apiku}i/MstStandarPelayananRuang/ID/${id}/${curpasRI.kelasRawatId}`,
        options
      )
      .then((res) => {
        setDetpel(res.data.result);
        console.log("harga?", res.data.result);
      });
  };
  const cariBill = () => {
    axios
      .get(`${apiku}/mstBillPelayanan/Lookup/1910252005/1/10`, options)
      .then((res) => {
        setBilllayanan(res.data.result);
      });
  };
  // const cariPelayanan = () => {
  //     console.log(tok);
  //     axios.get(`${apiku}/Pelayanan/Lookup/darah/1/100`, options)
  //         .then(res => {
  //             setPelayanan(res.data.result);
  //             console.log(res);
  //         })
  // }
  const cariDokter = () => {
    console.log(tok);
    axios.get(`${apiku}/Dokter/Lookup/Dr/1/100`, options).then((res) => {
      setDokter(res.data.result);
      // console.log(res);
    });
  };
  const getDokter = (poli) => {
    axios
      .get(`${apiku}/mstDokter/Lookup/${poli}/1/100`, options)
      .then((res) => {
        setDokterpoli(res.data.result);
        // console.log(res);
      });
  };
  const loadpelayananbedah = () => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/Read/9411/1/100`, options)
      .then((res) => {
        setPelayananBedah(res.data.result);
        // console.log(res);
      });
  };
  return (
    <PelayananRIContext.Provider
      value={{
        pelayananRI,
        pelaksana,
        dokter,
        billlayanan,
        detpel,
        biayapel,
        dokterpoli,
        dokterall,
        caramasuk,
        indikasi,
        kosong,
        jnspelayanan,
        tabkey,
        setTabkey,
        getDokter,
        loadPelayananRI,
        setBiayaPel,
        detailPelayanan,
        cariPelayanan,
        cariBill,
        cariDokter,
        setPelayanan,
        setKosong,
        loadPelayananRuang,
        pelayananruang,
        setHitung,
        hitung,
        mode,
        setMode,
        loadpelayananbedah,
        pelayananbedah,
      }}
    >
      {props.children}
    </PelayananRIContext.Provider>
  );
};

export default PelayananRIContextProvider;
