/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../rawatjalan/context";
import axios from "axios";
import { Modal } from "antd";
import dayjs from "dayjs";

export const SatuSehatPracticionerContext = createContext();

// const baseURL = "http://182.168.6.72:5577/"
// const baseURL = "http://182.168.7.251:5577/"
// const baseURL = "http://182.168.0.119/api/"

const SatuSehatPracticionerContextProvider = (props) => {
  const { token, namauser } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const ipEndpoint = sessionStorage.getItem("apiPenunjang");

  const baseURL = ipEndpoint + "/";
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const env = sessionStorage.getItem("environment");
  const userId = sessionStorage.getItem("userId");

  const [sstoken, setsstoken] = useState(null);
  const [SSTokenExp, setSSTokenExp] = useState();
  const [tempA, settempA] = useState();
  const [ktgBy, setktgBy] = useState(null);
  const [listKtg, setlistKtg] = useState([]);
  const [ktg, setKtg] = useState(null);
  const [listDokter, setlistDokter] = useState([]);
  const [listCariDr, setlistCariDr] = useState();
  const [ipKomp, setIpKomp] = useState(ip);
  const [hostKomp, sethostKomp] = useState(host);
  const [userid, setuserid] = useState(userId);
  const [baseUrlSS, setbaseUrlSS] = useState();
  const [OrgIhsNum, setOrgIhsNum] = useState();
  // edit
  const [drId, setdrId] = useState(null);
  const [namaDokter, setnamaDokter] = useState(null);
  const [namaBag, setnamaBag] = useState(null);
  const [jnsKelamin, setjnsKelamin] = useState(null);
  const [alamat, setalamat] = useState(null);
  const [nik, setnik] = useState(null);
  const [tglLahir, settglLahir] = useState();
  const [ihsNumber, setihsNumber] = useState(null);
  // detail dr SatuSehat
  const [detailResp, setdetailResp] = useState({});
  // md
  const [mdEdit, setmdEdit] = useState(false);
  const [mdDetailResp, setmdDetailResp] = useState(false);
  const [mdCariNIK, setmdCariNIK] = useState(false);
  // sp
  const [spFormEdit, setspFormEdit] = useState(false);
  const [spTbListDokter, setspTbListDokter] = useState(false);
  const [spTbCariNIK, setspTbCariNIK] = useState(false);

  useEffect(() => {
    getDetailEnv(env);
    getListDokterV2();
  }, []);

  // get token
  const SatuSehatGetToken = () => {
    setspFormEdit(true);
    axios
      .post(`${baseURL}SatuSehat/Token`, {
        headers: options.headers,
      })
      .then((res) => {
        console.log("satuSehat : ", res);
        setspFormEdit(false);
        if (res.status === 200) {
          setsstoken(res.data.access_token);
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal mengambil Token SATUSEHAT!`,
          });
        }
      })
      .catch((err) => {
        setspFormEdit(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses mengambil Token SATUSEHAT! -> ${err}`,
        });
      });
  };

  // get environment
  const getDetailEnv = (data) => {
    setspTbListDokter(true);
    axios
      .get(`${baseURL}SatuSehat/GetEnvbyEnv/${data}`, options)
      .then((response) => {
        setspTbListDokter(false);
        console.log("getDetailEnv : ", response);
        if (response.data && response.data.statusCode) {
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET detail Environment! -> ${response.data.message}`,
          });
        } else {
          Modal.info({
            title: "Informasi!",
            content: `Berhasil! -> ${response.data.message}`,
            onOk: () => {
              setsstoken(response.data.result.token);
              setbaseUrlSS(response.data.result.base_url);
              setOrgIhsNum(response.data.result.org_id);
              setSSTokenExp(response.data.result.expired);
              settempA(1);
              console.log("detail Env : ", response.data);
            },
          });
        }
      })
      .catch((err) => {
        setspTbListDokter(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data Detail Environment! -> ${err}`,
        });
      });
  };

  const getListKtg = (data) => {
    // setspGetOrganization(true)
    axios
      .get(`${baseURL}SatuSehat/lookupktgruangdanspesialis/${data}`, options)
      .then((response) => {
        // setspGetOrganization(false)
        console.log("getListKtg : ", response);
        if (response.data.statusCode === 200) {
          if (response.data.result !== 0) {
            setlistKtg(response.data.result);
          } else {
            setlistKtg([]);
            Modal.info({
              title: "Info",
              content: "Tidak ada List Kategori.",
            });
          }
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET data List Kategori! -> ${response.data.message}`,
          });
        }
      })
      .catch((err) => {
        // setspGetOrganization(false)
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data List Kategori! -> ${err}`,
        });
      });
  };

  const getListDokter = (ktg, data) => {
    setspTbListDokter(true);
    axios
      .get(`${baseURL}SatuSehat/lookupdrspesialis/${ktg}/${data}`, options)
      .then((response) => {
        setspTbListDokter(false);
        console.log("getListDokter : ", response);
        if (response.data.statusCode === 200) {
          if (response.data.result !== 0) {
            setlistDokter(response.data.result);
          } else {
            setlistDokter([]);
            Modal.info({
              title: "Info",
              content: "Tidak ada List Dokter.",
            });
          }
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET data List Dokter! -> ${response.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspTbListDokter(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data List Dokter! -> ${err}`,
        });
      });
  };

  const getListDokterV2 = () => {
    setspTbListDokter(true);
    axios
      .get(`${baseURL}SatuSehat/LookupDrAll`, options)
      .then((response) => {
        setspTbListDokter(false);
        console.log("getListDokter : ", response);
        if (response.data.statusCode === 200) {
          if (response.data.result !== 0) {
            setlistDokter(response.data.result);
          } else {
            setlistDokter([]);
            Modal.info({
              title: "Info",
              content: "Tidak ada List Dokter.",
            });
          }
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET data List Dokter! -> ${response.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspTbListDokter(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data List Dokter! -> ${err}`,
        });
      });
  };

  const getDetailDokter = (data) => {
    setspFormEdit(true);
    axios
      .get(`${baseURL}SatuSehat/lookupdrdetail/${data}`, options)
      .then((response) => {
        setspFormEdit(false);
        console.log("getListDokter : ", response);
        if (response.data.statusCode === 200) {
          setdrId(response.data.result.DokterId);
          setnamaDokter(response.data.result.NamaDokter);
          setnamaBag(response.data.result.NamaRuang);
          setjnsKelamin(response.data.result.JenisKelamin);
          setalamat(response.data.result.AlamatDokter);
          setnik(response.data.result.NIK);
          setihsNumber(response.data.result.IhsNumber);
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET data detail Dokter! -> ${response.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspFormEdit(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data detail Dokter! -> ${err}`,
        });
      });
  };

  const getCariNIK = (data) => {
    setspTbCariNIK(true);
    axios
      .get(`${baseURL}SatuSehat/lookupcaridokter/${data}`, options)
      .then((response) => {
        setspTbCariNIK(false);
        console.log("getCariNIK : ", response);
        if (response.data.statusCode === 200) {
          if (response.data.result.length !== 0) {
            setlistCariDr(response.data.result);
          } else {
            setlistCariDr([]);
            Modal.info({
              title: "Info",
              content: "Tidak ada data Nama Dokter tersebut.",
            });
          }
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET data Nama Dokter! -> ${response.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspTbCariNIK(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR Mengambil data Cari Nama Dokter! -> ${err}`,
        });
      });
  };

  const getPraktisibyNIK = (data) => {
    setspFormEdit(true);
    // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

    settempA(0);

    // Waktu 1 dalam format ISO
    const waktu1 = dayjs(SSTokenExp);

    // Waktu 2 adalah waktu sekarang
    const waktu2 = dayjs();

    // Menghitung selisih waktu dalam menit
    const selisihMenit = waktu2.diff(waktu1, "minute");
    console.log("selisih menit : ", selisihMenit);

    // Menentukan jika selisih lebih dari 45 menit
    if (selisihMenit > 0) {
      // Lakukan sesuatu jika lebih dari 45 menit
      console.log("Lebih dari 45 menit");

      getDetailEnv(env);
    } else {
      // Lakukan sesuatu jika kurang dari 45 menit
      console.log("Kurang dari atau sama dengan 45 menit");
      settempA(1);
    }

    if (tempA === 1) {
      axios
        .get(
          `${baseURL}SatuSehat/GetPractitionerByNIK/${data}/${sstoken}/${encodeURIComponent(
            baseUrlSS
          )}`,
          options
        )
        .then((response) => {
          setspFormEdit(false);
          console.log("getPraktisibyNIK : ", response);
          if (response.data.hasOwnProperty("statusCode")) {
            Modal.error({
              title: "Gagal!",
              content: `Gagal mengambil Ihs Number Practicioner! -> ${response.data.result}`,
            });
          } else {
            if (response.data.length === 1) {
              setdetailResp(response.data[0]);
              setmdDetailResp(true);
            } else if (response.data.length > 1) {
              Modal.info({
                title: "Informasi",
                content:
                  "Ditemukan detail Dokter dari SatuSehat LEBIH DARI 1. Cek Console log untuk melihat detail response.",
              });
              console.log("isi detail respon : ", response.data);
            } else {
              Modal.info({
                title: "Informasi",
                content: "Tidak ditemukan detail Dokter dari SatuSehat.",
              });
            }
          }
        })
        .catch((err) => {
          setspFormEdit(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR Disimpan data Master Practicioner! -> ${err}`,
          });
        });
    }
  };

  const simpanDetailDr = (data) => {
    setspFormEdit(true);
    axios
      .post(`${baseURL}SatuSehat/insertdetaildr`, data, {
        headers: options.headers,
      })
      .then((res) => {
        setspFormEdit(false);
        console.log("satuSehat : ", res);
        console.log("satuSehat data : ", res.data.statusCode);
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Sukses",
            content: "Berhasil Disimpan data Master Practicioner.",
            onOk: () => {
              setmdEdit(false);
              getListDokterV2();
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal Disimpan data Master Practicioner! -> ${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspFormEdit(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR Disimpan data Master Practicioner! -> ${err}`,
        });
      });
  };

  return (
    <SatuSehatPracticionerContext.Provider
      value={{
        sstoken,
        setsstoken,
        ktgBy,
        setktgBy,
        listKtg,
        setlistKtg,
        ktg,
        setKtg,
        listDokter,
        setlistDokter,
        listCariDr,
        setlistCariDr,
        ipKomp,
        setIpKomp,
        hostKomp,
        sethostKomp,
        userid,
        setuserid,
        // edit
        drId,
        setdrId,
        namaDokter,
        setnamaDokter,
        namaBag,
        setnamaBag,
        jnsKelamin,
        setjnsKelamin,
        alamat,
        setalamat,
        nik,
        setnik,
        tglLahir,
        settglLahir,
        ihsNumber,
        setihsNumber,
        // detail resp SatuSehat
        detailResp,
        setdetailResp,
        // func
        getListKtg,
        getListDokter,
        getListDokterV2,
        getDetailDokter,
        getPraktisibyNIK,
        simpanDetailDr,
        SatuSehatGetToken,
        getCariNIK,
        // md
        mdEdit,
        setmdEdit,
        mdDetailResp,
        setmdDetailResp,
        mdCariNIK,
        setmdCariNIK,
        // sp
        spFormEdit,
        setspFormEdit,
        spTbListDokter,
        setspTbListDokter,
        spTbCariNIK,
        setspTbCariNIK,
      }}
    >
      {props.children}
    </SatuSehatPracticionerContext.Provider>
  );
};

export default SatuSehatPracticionerContextProvider;
