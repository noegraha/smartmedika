import React, { createContext, useState, useContext } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { message } from "antd";
import { LoginContext } from "../../rawatjalan/context";

export const LaporanESWLContext = createContext();

const LaporanESWLContextProvider = (props) => {
  const [statistikeswl, setStatistikEswl] = useState(false);
  const [doktereswl, setDokterEswl] = useState(false);
  const [kelamineswl, setKelaminEswl] = useState(false);
  const [pasieneswl, setPasienEswl] = useState(false);
  // const [grafikAssesment, setgrafikAssesment] = useState([]);
  // const [totalAssesment, settotalAssesment] = useState([]);
  // const [jmlPasien, setjmlPasien] = useState([]);
  // const [jmlAssement, setjmlAssement] = useState([]);
  // const [jmlAsuhan, setjmlAsuhan] = useState([]);
  // const [jmlTelatAssesment, setjmlTelatAssesment] = useState([]);
  // const [jmlPasienMutasi, setjmlPasienMutasi] = useState([]);
  // const [jmlPasienTotal, setjmlPasienTotal] = useState([]);
  // const [jmlBelumAssesment, setjmlBelumAssesment] = useState([]);
  // const [detailjmlPasienMutasi, setdetailjmlPasienMutasi] = useState([]);
  // const [ruangRi, setRuangRi] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getStatistikEswl = () => {
    axios
      .get(`${apiku}/Eswl/GetStatistik`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setStatistikEswl(res.data.result[0]);
          console.log(res.data.result[0]);
        } else {
          console.log("error Ajuan");
          // setRuangRi([]);
          message.warning("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
      });
  };

  const getDokterEswl = () => {
    axios
      .get(`${apiku}/Eswl/GetDokter`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDokterEswl(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("error Ajuan");
          // setRuangRi([]);
          message.warning("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
      });
  };

  const getKelaminEswl = () => {
    axios
      .get(`${apiku}/Eswl/GetKelamin`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKelaminEswl(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("error Ajuan");
          // setRuangRi([]);
          message.warning("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
      });
  };

  const getPasienEswl = (tgl) => {
    axios
      .get(`${apiku}/Eswl/GetPasien?sTglOrder=${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasienEswl(res.data.result[0]);
          console.log(res.data.result[0]);
        } else {
          console.log("error Ajuan");
          // setRuangRi([]);
          message.warning("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
      });
  };

  return (
    <LaporanESWLContext.Provider
      value={{
        getStatistikEswl,
        statistikeswl,
        getDokterEswl,
        doktereswl,
        getKelaminEswl,
        kelamineswl,
        getPasienEswl,
        pasieneswl,
      }}
    >
      {props.children}
    </LaporanESWLContext.Provider>
  );
};

export default LaporanESWLContextProvider;
