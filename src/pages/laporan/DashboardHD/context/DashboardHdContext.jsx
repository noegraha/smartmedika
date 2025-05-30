/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { message, Modal } from "antd";
import { LoginContext } from "../../../rawatjalan/context";

export const DashboardHdContext = createContext();


const DashboardHdContextProvider = (props) => {
  const { token, apiku } = useContext(LoginContext);

  const ipEndpoint = sessionStorage.getItem("apiPenunjang");

  const endpoint = `${ipEndpoint}/EmrDialisisDashboard/`;
  // const endpoint = "http://182.168.6.72:5577/EmrDialisisDashboard/"
  // const endpoint = "http://182.168.7.251:5577/EmrDialisisDashboard/"

  const [dataGrafikHd, setDataGrafikHd] = useState([]);
  const [dataDetailGrafikHd, setDataDetailGrafikHd] = useState([]);
  const [dataGrafikIC, setDataGrafikIC] = useState([]);
  const [dataGrafikAV, setDataGrafikAV] = useState([]);
  const [dataAVv2, setdataAVv2] = useState([])
  const [dataPrePostTTV, setdataPrePostTTV] = useState([])
  const [bulanHd, setBulanHd] = useState(dayjs().format("YYYY-MM"));
  const [tanggalDetail, setTanggalDetail] = useState(
    dayjs().format("YYYY-MM-DD")
  );
  const [tanggalTtv, setTanggalTtv] = useState(dayjs().format("YYYY-MM-DD"));
  const [bulanInformConsent, setBulanInformConsent] = useState(
    dayjs().format("YYYY-MM")
  );
  const [bulanAksesVaskuler, setBulanAksesVaskuler] = useState(
    dayjs().format("YYYY-MM")
  );
  const [bulanUserInput, setbulanUserInput] = useState(
    dayjs().format("YYYY-MM")
  );
  const [listUser, setlistUser] = useState([]);
  const [listPasien, setlistPasien] = useState([]);
  const [totalPasienOrder, setTotalPasienOrder] = useState(0);
  const [totalSudahEntry, setTotalSudahEntry] = useState(0);
  const [totalSudahEntryFull, setTotalSudahEntryFull] = useState(0);
  const [totalInformConsent, setTotalInformConsent] = useState(0);
  const [totalInformConsentTtd, setTotalInformConsentTtd] = useState(0);
  const [dataTtv, setDataTtv] = useState([]);
  // spin
  const [spinGrafik, setSpinGrafik] = useState(false);
  const [spinDetailGrafik, setSpinDetailGrafik] = useState(false);
  const [spinTTV, setSpinTTV] = useState(false);
  const [spinInformConsent, setSpinInformConsent] = useState(false);
  const [spinAksesVaskuler, setSpinAksesVaskuler] = useState(false);
  const [spTabel, setspTabel] = useState(false)

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getGrafikHd = async (bulan) => {
    setSpinGrafik(true);
    const response = await axios.get(`${endpoint}bymonth/${bulan}`, options);
    if (response.data.statusCode === 200) {
      if (
        response.data.result === undefined ||
        response.data.result.length === 0
      ) {
        setSpinGrafik(false);
        message.warning("Data Grafik HD Tidak Ditemukan");
      } else {
        const totalPasienOrder = response.data.result.reduce(
          (prev, current) => {
            if (current.jenis === "trxorder") prev += current.jumlah;
            return prev;
          },
          0
        );
        const totalSudahEntry = response.data.result.reduce((prev, current) => {
          if (current.jenis === "dialisisHeader") prev += current.jumlah;
          return prev;
        }, 0);
        const totalSudahEntryFull = response.data.result.reduce(
          (prev, current) => {
            if (current.jenis === "dialisisHeaderFull") prev += current.jumlah;
            return prev;
          },
          0
        );

        setTotalPasienOrder(totalPasienOrder);
        setTotalSudahEntry(totalSudahEntry);
        setTotalSudahEntryFull(totalSudahEntryFull);
        setDataGrafikHd(response.data.result);
        setSpinGrafik(false);
      }
    } else {
      setSpinGrafik(false);
      message.error("Error Saat Mengambil Data Grafik HD!");
    }
  };

  const getDetailGrafikHd = async (tanggal) => {
    setSpinDetailGrafik(true);
    const response = await axios.get(
      `${endpoint}detailsbymonth/${tanggal}`,
      options
    );
    if (response.data.statusCode === 200) {
      setSpinDetailGrafik(false);
      setDataDetailGrafikHd(response.data.result);
      if (response.data.result.length === 0) {
        message.warning("Data Detail RME Harian Tidak Ditemukan");
      }
    } else {
      setSpinDetailGrafik(false);
      message.error("Error Saat Mengambil Data Detail RME Harian!");
    }
  };

  const getTtvHd = async (tanggal) => {
    setSpinTTV(true);
    const response = await axios.get(
      `${endpoint}ttvhdbydate/${tanggal}`,
      options
    );
    if (response.data.statusCode === 200) {
      setSpinTTV(false);
      setDataTtv(response.data.result);
      if (response.data.result.length === 0) {
        message.warning("Data Tanda Vital HD Tidak Ditemukan");
      }
    } else {
      setSpinTTV(false);
      message.error("Error Saat Mengambil Data Tanda Vital HD!");
    }
  };

  const getInformConsent = async (bulan) => {
    setSpinInformConsent(true);
    const response = await axios.get(`${endpoint}icbymonth/${bulan}`, options);
    if (response.data.statusCode === 200) {
      setSpinInformConsent(false);
      setDataGrafikIC(response.data.result);
      if (response.data.result.length === 0) {
        message.warning("Data Inform Consent HD Tidak Ditemukan");
      } else {
        const totalSudahEntry = response.data.result.reduce((prev, current) => {
          if (current.jenis === "informConsent") prev += current.jumlah;
          return prev;
        }, 0);
        const totalSudahEntryFull = response.data.result.reduce(
          (prev, current) => {
            if (current.jenis === "informConsentTtd") prev += current.jumlah;
            return prev;
          },
          0
        );

        setTotalInformConsent(totalSudahEntry);
        setTotalInformConsentTtd(totalSudahEntryFull);
      }
    } else {
      setSpinInformConsent(false);
      message.error("Error Saat Mengambil Data Inform Consent HD!");
    }
  };

  const getAksesVaskuler = async (bulan, jnsRawat) => {
    setSpinAksesVaskuler(true);
    const response = await axios.get(`${endpoint}avbymonth/${bulan}/${jnsRawat}`, options);
    if (response.data.statusCode === 200) {
      setSpinAksesVaskuler(false);
      setDataGrafikAV(response.data.result);
      if (response.data.result.length === 0) {
        message.warning("Data Akses Vaskuler Tidak Ditemukan");
      }
      // else {
      //     const totalAksesVaskuler = response.data.result.reduce((prev, current) => {
      //         prev += current.jumlah;
      //         return prev;
      //     }, 0);
      //     const totalSudahEntryFull = response.data.result.reduce((prev, current) => {
      //         if (current.jenis === 'informConsentTtd') prev += current.jumlah;
      //         return prev;
      //     }, 0);

      //     setTotalInformConsent(totalSudahEntry)
      //     setTotalInformConsentTtd(totalSudahEntryFull)
      //     console.log('total AV : ', totalAksesVaskuler);
      // }
    } else {
      setSpinAksesVaskuler(false);
      message.error("Error Saat Mengambil Data Akses Vaskuler!");
    }
  };

  const getUserInput = async (sMonth) => {
    const response = await axios.get(`${endpoint}userinput/${sMonth}`, options);
    console.log("getUserInput : ", response.data);
    if (response.data.statusCode === 200) {
      if (response.data.result.length === 0) {
        setlistUser([]);
        Modal.info({
          title: "Informasi",
          content: `Tidak ada User Input ditemukan.`,
        });
      } else {
        setlistUser(response.data.result);
      }
    } else {
      setlistUser([]);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! - Tidak dapat mengambil User Input!.`,
      });
    }
  };

  const getPasienbyUser = async (sMonth, sUserId) => {
    const response = await axios.get(
      `${endpoint}pasienbyuser/${sMonth}/${sUserId}`,
      options
    );
    if (response.data.statusCode === 200) {
      if (response.data.result.length === 0) {
        setlistPasien([]);
        Modal.info({
          title: "Informasi",
          content: `Tidak ada pasien ditemukan.`,
        });
      } else {
        setlistPasien(response.data.result);
      }
    } else {
      setlistPasien([]);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! - Tidak dapat mengambil data Pasien!`,
      });
    }
  };

  // V2 - 08/01/2023

  const getAksesVaskulerv2 = (tgl, jnsRwt) => {
    setspTabel(true);
    axios
      .get(`${endpoint}avbymonthv2/${tgl}/${jnsRwt}`, options)
      .then((response) => {
        // console.log("getAksesVaskulerv2 ", response.data);
        setspTabel(false);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setdataAVv2([]);
            Modal.info({
              title: "Informasi",
              content: "Tidak ada data Akses Vaskuler Hemodialisis.",
            });
          } else {
            // console.log("getListOrder : ", response.data.result);
            setdataAVv2(response.data.result);
          }
        } else {
          setdataAVv2([]);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data Akses Vaskuler Hemodialisis!`,
          });
        }
      })
      .catch((err) => {
        setspTabel(false);
        setdataAVv2([]);
        Modal.error({
          title: "Error!",
          content: `Error melakukan proses ambil data Akses Vaskuler Hemodialisis! -> ${err}`,
        });
      });
  };

  const getTTVHarian = (sDate) => {
    setspTabel(true);
    axios
      .get(
        `${endpoint}GetPrePostTTV/${sDate}`,
        options
      )
      .then((response) => {
        // console.log("getTTVHarian ", response.data);
        setspTabel(false);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setdataPrePostTTV([]);
            Modal.info({
              title: "Informasi",
              content: "Tidak ditemukan data TTV.",
            });
          } else {
            setdataPrePostTTV(response.data.result);
          }
        } else {
          setdataPrePostTTV([]);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data TTV pre post HD!`,
          });
        }
      })
      .catch((err) => {
        setdataPrePostTTV([]);
        setspTabel(false);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil data TTV pre post HD! -> ${err}`,
        });
      });
  };

  // ========== ========== ========== ========== ========== v2 end

  useEffect(() => {
    getGrafikHd(bulanHd);
    getDetailGrafikHd(tanggalDetail);
    // getTtvHd(tanggalTtv);
    getInformConsent(bulanInformConsent);
    // getAksesVaskuler(bulanAksesVaskuler);
  }, []);

  return (
    <DashboardHdContext.Provider
      value={{
        getGrafikHd,
        getDetailGrafikHd,
        getTtvHd,
        getInformConsent,
        getAksesVaskuler,
        getAksesVaskulerv2,
        getUserInput,
        getPasienbyUser,
        getTTVHarian,
        dataGrafikHd,
        dataDetailGrafikHd,
        dataGrafikIC,
        setDataGrafikIC,
        dataTtv,
        bulanHd,
        setBulanHd,
        bulanUserInput,
        setbulanUserInput,
        listUser,
        setlistUser,
        listPasien,
        setlistPasien,
        tanggalDetail,
        setTanggalDetail,
        tanggalTtv,
        setTanggalTtv,
        bulanInformConsent,
        setBulanInformConsent,
        totalPasienOrder,
        setTotalPasienOrder,
        totalSudahEntry,
        setTotalSudahEntry,
        totalSudahEntryFull,
        setTotalSudahEntryFull,
        totalInformConsent,
        totalInformConsentTtd,
        dataGrafikAV,
        setDataGrafikAV,
        dataAVv2, setdataAVv2,
        // v2
        dataPrePostTTV, setdataPrePostTTV,
        // =====
        bulanAksesVaskuler,
        setBulanAksesVaskuler,
        spinAksesVaskuler,
        setSpinAksesVaskuler,
        spinGrafik,
        spinDetailGrafik,
        spinTTV,
        spinInformConsent,
        spTabel, setspTabel,
      }}
    >
      {props.children}
    </DashboardHdContext.Provider>
  );
};

export default DashboardHdContextProvider;
