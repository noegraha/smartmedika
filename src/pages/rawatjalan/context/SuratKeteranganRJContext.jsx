import React, { createContext, useState, useContext } from "react";
import dayjs from "dayjs";
import { LoginContext } from "../../rawatjalan/context";
import axios from "axios";
import { message } from "antd";

export const SuratKeteranganRJContext = createContext();

const SuratKeteranganRJContextProvider = (props) => {
  const [suratKeteranganId, setsuratKeteranganId] = useState(0);
  const [jenisKeterangan, setjenisKeterangan] = useState(null);
  const [jenissuratkesehatan, setJenisSuratKesehatan] = useState(null);
  const [keteranganuntuksk, setKeteranganUntukSK] = useState(null);
  const [keteranganuntukskd, setKeteranganUntukSKD] = useState(null);
  const [permintaan, setPermintaan] = useState(false);
  const [permintaan2, setPermintaan2] = useState(false);
  const [catatansk, setCatatanSK] = useState(null);
  const [catatanskd, setCatatanSKD] = useState("-");
  const [sprp, setSPRP] = useState(false);
  const [skd, setSKD] = useState(false);
  const [sk, setSK] = useState(false);
  const [nosk, setNoSK] = useState(null);
  const [noskd, setNoSKD] = useState(null);
  const [nosprp, setNoSPRP] = useState(null);
  const [alasanrujukkeluarga, setAlasanRujukKeluarga] = useState(null);
  const [alasanrujuk, setAlasanRujuk] = useState(null);
  const [keterangansehat, setKeteranganSehat] = useState(null);
  const [dokterjiwa, setDokterJiwa] = useState(null);
  const [iddokterjiwa, setIdDokterJiwa] = useState(null);
  const [sipdokter, setSIPDokter] = useState(null);
  const [nipdokter, setNIPDokter] = useState(null);
  const [tanggalketerangan, setTanggalKeterangan] = useState(null);
  const [listsuratrj, setListSuratRJ] = useState([]);
  const [readsuratrj, setReadSuratRJ] = useState([]);

  const [hasil, setHasil] = useState(null);
  const [versurj, setVerSuRJ] = useState(false);
  const [konfirmasi, setKonfirmasi] = useState(false);
  const [viewsprp, setViewSprp] = useState("nonaktif");
  const [tandatangan, setTandaTangan] = useState(null);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [printSuket, setPrintsuket] = useState(false);
  const [link, setLink] = useState(null);

  const [listdokter, setListDokter] = useState([]);
  const [datasurat, setDataSurat] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const report = process.env.REACT_APP_API_BASE_URL_REPORT;
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertSuketRj = (datasuketrj) => {
    axios
      .post(`${apiku}/EmrSuratKeterangan`, datasuketrj)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!", res.data.result);
          // setStatusCode(res.data.statusCode);
        } else if (res.data.statusCode === 201) {
          message.warning("Sudah Divalidasi", res.data.result);
          console.log("Sudah Divalidasi", res.data.result);
        } else {
          message.error("Gagal Disimpan!", res.data.result);
          console.log("gagal", res.data.result);
        }
      })
      .catch((err) => {
        message.error("Error Saat Disimpan");
        console.log("EROR", datasuketrj);
      });
  };

  const verifikasiSuketRJ = (noreg, jenis) => {
    axios
      .post(`${apiku}/EmrSuratKeterangan/Verified/${noreg}/${jenis}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!", res.data.result);
          // setStatusCode(res.data.statusCode);
        } else if (res.data.statusCode === 201) {
          message.warning("Sudah Divalidasi", res.data.result);
          console.log("Sudah Divalidasi", res.data.result);
        } else {
          message.error("Gagal Disimpan!", res.data.result);
          console.log("gagal", res.data.result);
        }
      })
      .catch((err) => {
        message.error("Error Saat Disimpan");
        console.log("EROR");
      });
  };

  const getListSuketRJ = (id) => {
    axios
      .get(`${apiku}/EmrSuratKeterangan/Lookup/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListSuratRJ(res.data.result);
          // setListOrderPenunjang(res.data.result);
          console.log(res.data.result);
        } else {
          // message.error('Gagal Mengambil Data Order!')
          console.log(res.data.result);
          // setListOrderPenunjang([]);
        }
      })
      .catch((err) => {
        // message.error("Gagal Mengambil Data Order!");
        console.log(err);
        // setListOrderPenunjang([]);
      });
  };

  const getReadSuketRJ = (id, jenis) => {
    axios
      .get(`${apiku}/EmrSuratKeterangan/Read/${id}/${jenis}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setReadSuratRJ(res.data.result);
          // setListOrderPenunjang(res.data.result);
          console.log(res.data.result);
        } else {
          // message.error('Gagal Mengambil Data Order!')
          console.log(res.data.result);
          // setListOrderPenunjang([]);
        }
      })
      .catch((err) => {
        // message.error("Gagal Mengambil Data Order!");
        console.log(err);
        // setListOrderPenunjang([]);
      });
  };

  const getDokter = (id) => {
    axios
      .get(`${apiku}/MstDokter/ID/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("dokter", res.data.result);
          setIdDokterJiwa(res.data.result.dokterId);
          setDokterJiwa(res.data.result.namaDokter);
        } else {
          console.log("data kosong");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getListDokter = () => {
    axios
      .get(`${apiku}/MstDokter/Lookup/%20/1/500`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("list Dokter", res.data.result);
          setListDokter(res.data.result);
        } else {
          setListDokter([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListDokter([]);
      });
  };

  const getReport = (jenis, id, noreg) => {
    axios
      .get(`${report}/GetUrlDouble/${jenis}/${id}/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLink(res.data.result);
          console.log("ini linknya", res.data.result);
        } else {
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCurrentTime = (
    separator = "-",
    separator2 = ":",
    separator3 = "T"
  ) => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.getHours();
    let minute = newDate.getMinutes();
    let second = newDate.getSeconds();
    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}${separator3}${
      time < 10 ? `0${time}` : `${time}`
    }${separator2}${minute < 10 ? `0${minute}` : `${minute}`}${separator2}${
      second < 10 ? `0${second}` : `${second}`
    }`;
  };

  // const getCurrentTime2 = (separator = "/") => {
  //   let newDate = new Date();
  //   let month = newDate.getMonth() + 1;
  //   let year = newDate.getFullYear();
  //   return setNoSKD(
  //     `445/    /${month < 10 ? `0${month}` : `${month}`}${separator}${year}`
  //   );
  // };

  // const getCurrentTime4 = (separator = "-") => {
  //   let newDate = new Date();
  //   let date = newDate.getDate();
  //   let month = newDate.getMonth() + 1;
  //   let year = newDate.getFullYear();

  //   return `${year}${separator}${
  //     month < 10 ? `0${month}` : `${month}`
  //   }${separator}${date < 10 ? `0${date}` : `${date}`}
  //   `;
  // };

  const getCurrentTime5 = (
    separator = "-",
    separator2 = ":",
    separator3 = "T"
  ) => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.getHours();
    let minute = newDate.getMinutes();
    let second = newDate.getSeconds();
    return setTanggalKeterangan(
      `${year}${separator}${month < 10 ? `0${month}` : `${month}`}${separator}${
        date < 10 ? `0${date}` : `${date}`
      }${separator3}${time < 10 ? `0${time}` : `${time}`}${separator2}${
        minute < 10 ? `0${minute}` : `${minute}`
      }${separator2}${second < 10 ? `0${second}` : `${second}`}`
    );
  };

  const insertSuketRJ = (datasuket) => {
    axios
      .post(`${apiku}/EmrSuratKeterangan/`, datasuket, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
          getSurat(datasuket.registrasiId);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal Disimpan!");
        console.log(err);
      });
  };

  const getSurat = (noreg) => {
    axios
      .get(`${apiku}/EmrSuratKeterangan/Read/${noreg}/3`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataSurat(res.data.result);
          console.log(res.data.result);
        } else {
          setDataSurat(null);
        }
      })
      .catch((err) => {
        setDataSurat(null);
      });
  };

  return (
    <SuratKeteranganRJContext.Provider
      value={{
        insertSuketRJ,
        getSurat,
        datasurat,
        insertSuketRj,
        suratKeteranganId,
        setsuratKeteranganId,
        jenisKeterangan,
        setjenisKeterangan,
        setPermintaan,
        permintaan,
        setPermintaan2,
        permintaan2,
        setCatatanSK,
        catatansk,
        setCatatanSKD,
        catatanskd,
        sprp,
        setSPRP,
        skd,
        setSKD,
        sk,
        setSK,
        jenissuratkesehatan,
        setJenisSuratKesehatan,
        keteranganuntuksk,
        keteranganuntukskd,
        setKeteranganUntukSK,
        setKeteranganUntukSKD,
        nosk,
        setNoSK,
        noskd,
        setNoSKD,
        nosprp,
        setNoSPRP,
        setAlasanRujuk,
        alasanrujuk,
        setAlasanRujukKeluarga,
        alasanrujukkeluarga,
        setKeteranganSehat,
        keterangansehat,
        getDokter,
        setDokterJiwa,
        dokterjiwa,
        setIdDokterJiwa,
        iddokterjiwa,
        sipdokter,
        nipdokter,
        setSIPDokter,
        setNIPDokter,
        getCurrentTime,
        getCurrentTime5,
        hasil,
        setHasil,
        tanggalketerangan,
        getListSuketRJ,
        listsuratrj,
        setVerSuRJ,
        versurj,
        getReadSuketRJ,
        readsuratrj,
        setViewSprp,
        viewsprp,
        tandatangan,
        setTandaTangan,
        listdokter,
        getListDokter,
        verifikasiSuketRJ,
        konfirmasi,
        setKonfirmasi,
        confirmLoading,
        setConfirmLoading,
        getReport,
        setPrintsuket,
        printSuket,
        link,
        setLink,
      }}
    >
      {props.children}
    </SuratKeteranganRJContext.Provider>
  );
};

export default SuratKeteranganRJContextProvider;
