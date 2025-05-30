import React, { createContext, useState, useContext } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { message } from "antd";
import { LoginContext } from "../../rawatjalan/context";

export const LaporanAskepContext = createContext();

const LaporanAskepContextProvider = (props) => {
  const [spin, setspin] = useState(false);
  const [grafikAssesment, setgrafikAssesment] = useState([]);
  const [totalAssesment, settotalAssesment] = useState([]);
  const [jmlPasien, setjmlPasien] = useState([]);
  const [jmlAssement, setjmlAssement] = useState([]);
  const [jmlAsuhan, setjmlAsuhan] = useState([]);
  const [jmlTelatAssesment, setjmlTelatAssesment] = useState([]);
  const [jmlPasienMutasi, setjmlPasienMutasi] = useState([]);
  const [jmlPasienTotal, setjmlPasienTotal] = useState([]);
  const [jmlBelumAssesment, setjmlBelumAssesment] = useState([]);
  const [detailjmlPasienMutasi, setdetailjmlPasienMutasi] = useState([]);
  const [ruangRi, setRuangRi] = useState([]);
  const [jmlDxAskep, setjmlDxAskep] = useState([]);
  const [jmlInputUSer, setjmlInputUSer] = useState([]);

  const token = sessionStorage.getItem("userData");
  const tok = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getGrafikAssesment = (ruang, bln, thn) => {
    axios
      .get(`${apiku}/Dashboard/GetStatistik/${ruang}/${bln}/${thn}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result.detail === [] ||
            res.data.result.detail === undefined ||
            res.data.result.detail.length === 0
          ) {
            message.warning("Data Tidak Ditemukan");
            setgrafikAssesment(res.data.result.detail);
            setjmlPasien(res.data.result.jumlahPasien);
            setjmlPasienTotal(res.data.result.jumlahPasienTotal);
            setjmlAssement(res.data.result.jumlahAssesment);
            setjmlAsuhan(res.data.result.jumlahAsuhan);
            setjmlTelatAssesment(res.data.result.jumlahTelatAssesment);
            setjmlBelumAssesment(res.data.result.jumlahBelumAssesment);
            setjmlPasienMutasi(res.data.result.jumlahPasienMutasi);
            setspin(false);
          } else {
            setgrafikAssesment(res.data.result.detail);
            setjmlPasien(res.data.result.jumlahPasien);
            setjmlAssement(res.data.result.jumlahAssesment);
            setjmlAsuhan(res.data.result.jumlahAsuhan);
            setjmlTelatAssesment(res.data.result.jumlahTelatAssesment);
            setjmlPasienMutasi(res.data.result.jumlahPasienMutasi);
            setjmlPasienTotal(res.data.result.jumlahPasienTotal);
            setjmlBelumAssesment(res.data.result.jumlahBelumAssesment);
            setspin(false);
          }
          console.log(res.data.result);
          console.log("data masukan", ruang, bln, thn);
        } else {
          setgrafikAssesment([]);
          setjmlPasien([]);
          setjmlAssement([]);
          setjmlAsuhan([]);
          setjmlTelatAssesment([]);
          setjmlPasienTotal([]);
          setjmlTelatAssesment([]);
          message.warning("Data Tidak Ditemukan");
          setspin(false);

          // console.log("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Dat!");
      });
  };

  const getDetailPasienMutasi = (ruang, bln, thn, kode) => {
    axios
      .get(
        `${apiku}/Dashboard/GetPasienDetail/${ruang}/${bln}/${thn}/${kode}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result === [] ||
            res.data.result === undefined ||
            res.data.result.length === 0
          ) {
            message.warning("Data Tidak Ditemukan");
            setdetailjmlPasienMutasi([]);
            setspin(false);
          } else {
            setdetailjmlPasienMutasi(res.data.result);
            setspin(false);
          }
        } else {
          console.log("error Ajuan");
          setdetailjmlPasienMutasi([]);
          message.warning("Data Tidak Ditemukan");
          console.log("Data Tidak Ditemukan");
          setspin(false);
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
        setspin(false);
      });
  };

  const getTotalAssesment = (tgl, kode) => {
    axios
      .get(`${apiku}/Dashboard/GetRekapJumlah/${tgl}/${kode}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          res.data.result === [] ||
          res.data.result === undefined ||
          res.data.result.length === 0
            ? message.warning("Data Tidak Ditemukan")
            : settotalAssesment(res.data.result);
          setspin(false);
        } else {
          console.log("error Ajuan");
          settotalAssesment([]);
          message.warning("Data Tidak Ditemukan");
          setspin(false);
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Dat!");
      });
  };

  const getRuangRi = () => {
    axios
      .get(`${apiku}/MstRuang/Lookup/%20/1/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuangRi(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("error Ajuan");
          setRuangRi([]);
          message.warning("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Dat!");
      });
  };

  const getTotlDxTgl = (tgl1, tgl2) => {
    axios
      .get(`${apiku}/Askep/Asuhan/GetJumlahDiagnosis/${tgl1}/${tgl2}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setspin(false);
          setjmlDxAskep(res.data.result);
          console.log(res.data.result);
        } else {
          setspin(false);
          console.log("error Ajuan");
          setjmlDxAskep([]);
          message.warning("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        setspin(false);
        message.error("Error Saat Mengambil Dat!");
      });
  };

  const getTotlDxThn = (thn) => {
    axios
      .get(`${apiku}/Askep/Asuhan/GetJumlahTahun/${thn}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setjmlDxAskep(res.data.result);
          setspin(false);
          console.log(res.data.result);
        } else {
          console.log("error Ajuan");
          setjmlDxAskep([]);
          setspin(false);
          message.warning("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        setspin(false);
        message.error("Error Saat Mengambil Dat!");
      });
  };

  const getTotlDxbln = (bulan, thn) => {
    axios
      .get(`${apiku}/Askep/Asuhan/GetJumlahBulan/${bulan}/${thn}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setspin(false);
          setjmlDxAskep(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("error Ajuan");
          setspin(false);
          setjmlDxAskep([]);
          message.warning("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        setspin(false);
        message.error("Error Saat Mengambil Dat!");
      });
  };

  const getInputanUser = (ruang, bulan, thn) => {
    axios
      .get(
        `${apiku}/Dashboard/GetStatistikByUser/${ruang}/${bulan}/${thn}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setjmlInputUSer(res.data.result);
          console.log(res.data.result);
          setspin(false);
        } else {
          setjmlInputUSer([]);
          setspin(false);
          message.warning("Data Tidak Ditemukan");
        }
      })
      .catch((err) => {
        setjmlInputUSer([]);
        setspin(false);
        message.error("Error Saat Mengambil Dat!");
      });
  };

  return (
    <LaporanAskepContext.Provider
      value={{
        spin,
        setspin,
        jmlPasienTotal,
        jmlBelumAssesment,
        getDetailPasienMutasi,
        jmlPasienMutasi,
        detailjmlPasienMutasi,
        getGrafikAssesment,
        grafikAssesment,
        setgrafikAssesment,
        totalAssesment,
        getTotalAssesment,
        ruangRi,
        getRuangRi,
        jmlAssement,
        jmlAsuhan,
        jmlPasien,
        jmlTelatAssesment,

        getTotlDxTgl,
        getTotlDxThn,
        getTotlDxbln,
        setjmlDxAskep,
        jmlDxAskep,
        getInputanUser,
        jmlInputUSer,
        setjmlInputUSer,
      }}
    >
      {props.children}
    </LaporanAskepContext.Provider>
  );
};

export default LaporanAskepContextProvider;
