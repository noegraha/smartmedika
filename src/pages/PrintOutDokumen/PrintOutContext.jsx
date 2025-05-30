import React, { createContext, useContext, useState } from "react";
import { message } from "antd";
import axios from "axios";
import { LoginContext } from "../rawatjalan/context";

export const PrintOutContext = createContext();

const PrintOutContextProvider = (props) => {
  const { apiReport } = useContext(LoginContext);

  const [printDDST, setprintDDST] = useState("");
  const [printResumeMedis, setprintResumeMedis] = useState("");
  const [printSPPR, setprintSPPR] = useState("");
  const [printRm13, setPrintRm13] = useState("");
  const [printRm02, setprintRm02] = useState("");
  const [printRm02Tahun, setprintRm02Tahun] = useState("");
  const [printRm02Poli, setprintRm02Poli] = useState("");
  const [printRm02Kunjungan, setprintRm02Kunjungan] = useState("");
  const [printLabPk, setprintLabPk] = useState("");
  const [printLabPa, setprintLabPa] = useState("");
  const [printHasilOp, setprintHasilOp] = useState("");
  const [printPmrFisik, setprintPmrFisik] = useState("");
  const [printGambar, setprintGambar] = useState("");
  const [printPemLain, setprintPemLain] = useState("");
  const [modalPemLain, setmodalPemLain] = useState(false);
  const [modalPmrFisik, setmodalPmrFisik] = useState(false);
  const [modalKunjungan, setmodalKunjungan] = useState(false);
  const [loadDelay, setloadDelay] = useState(false);

  const [modalPrint, setmodalPrint] = useState(false);
  const [printasuhan, setprintAsuhan] = useState("");
  const [printAss, setprintAss] = useState("");
  const [printTerima, setprintTerima] = useState("");
  const [printAnamnesa, setprintAnamnesa] = useState("");
  const [printFirikRI, setprintFirikRI] = useState("");
  const [printKonsulRI, setprintKonsulRI] = useState("");
  const [printCPPTRI, setprintCPPTRI] = useState("");
  const [printCPPTRIwayat, setprintCPPTRIwayat] = useState("");
  const [printRM11, setprintRM11] = useState("");
  const [printEvalGizi, setprintEvalGizi] = useState("");
  const [printAsuhGizi, setprintAsuhGizi] = useState("");
  const [printScrenGizi, setprintScrenGizi] = useState("");
  const [printScrenGiziPYMS, setprintScrenGiziPYMS] = useState("");
  const [printPerawatIGD, setprintPerawatIGD] = useState("");
  const [printDokterIGD, setprintDokterIGD] = useState("");
  const [printSuket, setprintSuket] = useState("");
  const [printSBar, setprintSBar] = useState("");
  const [printSBarPerawat, setprintSBarPerawat] = useState("");
  const [printLapKala, setprintLapKala] = useState("");

  const [modalTerima, setmodalTerima] = useState(false);
  const [modalAnamnesa, setmodalAnamnesa] = useState(false);
  const [modalPFisik, setmodalPFisik] = useState(false);
  const [modalAssAskep, setmodalAssAskep] = useState(false);
  const [modalRM11, setmodalRM11] = useState(false);
  const [modalAskep, setmodalAskep] = useState(false);
  const [modalKonsul, setmodalKonsul] = useState(false);
  const [modalCPPT, setmodalCPPT] = useState(false);
  const [modalSuket, setModalSuket] = useState(false);
  const [modalSbar, setmodalSbar] = useState(false);
  const [modalSbarPerawat, setmodalSbarPerawat] = useState(false);
  const [modalprintRM13, setmodalprintRM13] = useState(false);
  const [modalprintGiziAsuh, setmodalprintGiziAsuh] = useState(false);
  const [modalprintGizi, setmodalprintGizi] = useState(false);
  const [modalprintGizipyms, setmodalprintGizipyms] = useState(false);
  const [modalprintGiziEvaluasi, setmodalprintGiziEvaluasi] = useState(false);

  const [pilihWaktu, setpilihWaktu] = useState("");
  const [jenisKala, setjenisKala] = useState("");

  const token = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getPrintPemLain = (nopmr, RegId) => {
    axios
      .get(`${apiReport}/GetUrlDouble/PENUNJANG/${nopmr}/${RegId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setmodalPemLain(true);
          setprintPemLain(res.data.result);
        } else {
          setprintPemLain("");
          message.warning("Data Pemeriksaan Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data Pemeriksaan!");
        setprintLabPa("");
        console.log(err);
      });
  };

  const getPrintLabPa = (KdHAsil, RegId) => {
    axios
      .get(`${apiReport}/GetUrlDouble/LABPA/${KdHAsil}/${RegId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintLabPa(res.data.result);
        } else {
          setprintLabPa("");
          message.warning("Data Laborat PA Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data Laborat PA!");
        setprintLabPa("");
      });
  };

  const getPrintRm13 = (pasienID, RegId, flag) => {
    axios
      .get(`${apiReport}/GetUrlDouble/RM13RI/${RegId}/${pasienID}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPrintRm13(res.data.result);
          flag === "riwayat"
            ? setmodalprintRM13(false)
            : setmodalprintRM13(true);
        } else {
          setPrintRm13("");
          message.warning("Data RM 13 Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data RM13!");
        setPrintRm13("");
      });
  };

  const getDDST = (pasienID) => {
    axios
      .get(`${apiReport}/GetUrlDouble/denver/${pasienID}/'tahun'`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintDDST(res.data.result);
          console.log(res.data.result);
        } else {
          setprintDDST("");
          message.warning("Data RM 13 Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data RM13!");
        setprintDDST("");
      });
  };

  const getResumeMedis = (pasienID, noreg) => {
    axios
      .get(`${apiReport}/GetUrlDouble/RESUMERJ/${pasienID}/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintResumeMedis(res.data.result);
          console.log(res.data.result);
        } else {
          setprintResumeMedis("");
          message.warning("Data RM 13 Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data RM13!");
        setprintResumeMedis("");
      });
  };

  const getSPPR = (pasienID, noreg) => {
    axios
      .get(`${apiReport}/GetUrlDouble/SPPR/${pasienID}/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintSPPR(res.data.result);
          console.log(res.data.result);
        } else {
          setprintSPPR("");
          message.warning("Data RM 13 Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data RM13!");
        setprintSPPR("");
      });
  };

  const getPrintRm02 = (pasienId, sKey) => {
    axios
      .get(`${apiReport}/GetUrlDouble/RM02/${pasienId}/${sKey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintRm02(res.data.result);
          console.log("sekarang", res.data.result);
        } else {
          setprintRm02("");
          message.warning("Data RM02 Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setprintRm02("");
        message.error("Error Saat Mengambil Data RM02!");
      });
  };

  const getPrintRm02Tahun = (pasienId, sKey) => {
    axios
      .get(`${apiReport}/GetUrlDouble/RM02Tahun/${pasienId}/${sKey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintRm02Tahun(res.data.result);
          console.log("tahun", res.data.result);
        } else {
          setprintRm02Tahun("");
          message.warning("Data RM02 Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setprintRm02Tahun("");
        message.error("Error Saat Mengambil Data RM02!");
      });
  };

  const getPrintRm02Poli = (pasienId, sKey) => {
    axios
      .get(`${apiReport}/GetUrlDouble/RM02Ruang/${pasienId}/${sKey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintRm02Poli(res.data.result);
          console.log("polir", res.data.result);
        } else {
          setprintRm02Poli("");
          message.warning("Data RM02 Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setprintRm02Poli("");
        message.error("Error Saat Mengambil Data RM02!");
      });
  };

  const getPrintRm02Kunjungan = (pasienId, sKey) => {
    axios
      .get(`${apiReport}/GetUrlDouble/RM02Reg/${pasienId}/${sKey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintRm02Kunjungan(res.data.result);
          console.log("kunjungan", res.data.result);
          setmodalKunjungan(false);
        } else {
          setmodalKunjungan(false);
          setprintRm02Kunjungan("");
          message.warning("Data RM02 Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setmodalKunjungan(false);
        setprintRm02Kunjungan("");
        message.error("Error Saat Mengambil Data RM02!");
      });
  };

  const getPrintLabPk = (nopasien, nolab) => {
    console.log("masuk ke lab");
    axios
      .get(`${apiReport}/GetUrlDouble/LAB/${nopasien}/${nolab}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintLabPk(res.data.result);
          // console.log("res.data.result");
        } else {
          setloadDelay(false);
          // setprintLabPk('');
          setprintLabPk("");
          message.warning("Data Hasil Lab Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setloadDelay(false);
        setprintLabPk("");
        message.error("Error Saat Mengambil Data Laborat!");
        // console.log(nopasien, nolab);
      });
  };

  const getPrintHasilOp = (pasienId, noop) => {
    axios
      .get(`${apiReport}/GetUrlDouble/OP/${pasienId}/${noop}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintHasilOp(res.data.result);
          console.log(res.data.result);
          console.log(pasienId, noop);
        } else {
          setprintHasilOp("");
          setloadDelay(false);
          message.warning("Data Laporan Op Tidak Diremukan!");
        }
      })
      .catch((err) => {
        setprintHasilOp("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Laporan Operasi!");
      });
  };

  const getPrintPmrFisik = (pasienId, noreg) => {
    axios
      .get(`${apiReport}/GetUrlDouble/FISIK/${pasienId}/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(pasienId, noreg);
          setmodalPmrFisik(true);
          setprintPmrFisik(res.data.result);
        } else {
          message.warning("Data Pemeriksaan Fisik Tidak Ditemukan!");
          setloadDelay(false);
          setprintPmrFisik("");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data Pemeriksaan Fisik");
        setloadDelay(false);
        setprintPmrFisik("");
      });
  };

  const getPrintGambarPasien = (pasienId, noreg) => {
    axios
      .get(`${apiReport}/GetUrlDouble/GAMBAR/${pasienId}/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintGambar(res.data.result);
        } else {
          setprintGambar("");
          setloadDelay(false);
          message.warning("Data Gambar Pasien Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setprintGambar("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Gambar Pasien!");
      });
  };

  const getPrintAssAske = (pasienId, sKey, flag) => {
    setloadDelay(true);
    axios
      .get(
        `${apiReport}/GetUrlDouble/ASSESMENTASKEPRI/${pasienId}/${sKey}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintAss(res.data.result);
          flag === "riwayat" ? setmodalAssAskep(false) : setmodalAssAskep(true);
        } else {
          setprintAss("");
          message.warning("Data Assesment Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintAss("");
        message.error("Error Saat Mengambil Data Assesment!");
        setloadDelay(false);
      });
  };

  const getPrintAsuhan = (regId, pelayanana, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlDouble/ASKEPRI/${regId}/${pelayanana}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintAsuhan(res.data.result);

          flag === "riwayat" ? setmodalAskep(false) : setmodalAskep(true);
        } else {
          setprintAsuhan("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintAsuhan("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintTerimaPasien = (pasienId, regId, flag) => {
    setloadDelay(true);
    axios
      .get(
        `${apiReport}/GetUrlDouble/TerimaPasienRI/${pasienId}/${regId}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintTerima(res.data.result);
          flag === "riwayat" ? setmodalTerima(false) : setmodalTerima(true);
        } else {
          setprintTerima("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintTerima("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintAnamnesa = (regId, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/AnamnesaRI/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintAnamnesa(res.data.result);
          console.log(res.data.result);
          flag === "riwayat" ? setmodalAnamnesa(false) : setmodalAnamnesa(true);
        } else {
          setprintAnamnesa("");
          message.warning("Data Asuham Tidak Ditemukan!");
          console.log(res);
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintAnamnesa("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintfisikRI = (regId, grp, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlDouble/FISIKRI/${regId}/${grp}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintFirikRI(res.data.result);
          flag === "riwayat" ? setmodalPFisik(false) : setmodalPFisik(true);
        } else {
          setprintFirikRI("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintFirikRI("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintKonsulRI = (regId, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/KonsultasiRI/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintKonsulRI(res.data.result);
          flag === "riwayat" ? setmodalKonsul(false) : setmodalKonsul(true);
        } else {
          setprintKonsulRI("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintKonsulRI("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintCPPTRI = (regId, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/CPPTRI/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintCPPTRI(res.data.result);
          flag === "riwayat" ? setmodalCPPT(false) : setmodalCPPT(true);
        } else {
          setprintCPPTRI("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintCPPTRI("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };
  const getPrintCPPTRIwayat = (regId) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/CPPTRIRiwayat/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintCPPTRIwayat(res.data.result);
        } else {
          setprintCPPTRIwayat("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintCPPTRIwayat("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };
  const getPrintRM11 = (regId, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/RM11/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintRM11(res.data.result);
          flag === "riwayat" ? setmodalRM11(false) : setmodalRM11(true);
        } else {
          setprintRM11("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintRM11("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintEvalGizi = (regId, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/EvaluasiGiziRI/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintEvalGizi(res.data.result);
          flag === "riwayat"
            ? setmodalprintGiziEvaluasi(false)
            : setmodalprintGiziEvaluasi(true);
        } else {
          setprintEvalGizi("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintEvalGizi("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintAsuhGizi = (regId, id, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlDouble/AsuhanGiziRI/${regId}/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintAsuhGizi(res.data.result);
          flag === "riwayat"
            ? setmodalprintGiziAsuh(false)
            : setmodalprintGiziAsuh(true);
        } else {
          setprintAsuhGizi("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintAsuhGizi("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintScrenGizi = (regId, id, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlDouble/ScreeningGiziRI/${regId}/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintScrenGizi(res.data.result);
          flag === "riwayat"
            ? setmodalprintGizi(false)
            : setmodalprintGizi(true);
        } else {
          setprintScrenGizi("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintScrenGizi("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintScrenGiziPYMS = (regId, id, flag) => {
    setloadDelay(true);
    axios
      .get(
        `${apiReport}/GetUrlDouble/ScreeningGiziPYMSRI/${regId}/${id}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintScrenGiziPYMS(res.data.result);
          flag === "riwayat"
            ? setmodalprintGizipyms(false)
            : setmodalprintGizipyms(true);
        } else {
          setprintScrenGiziPYMS("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintScrenGiziPYMS("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintPerawatIGD = (regId) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/PERAWATIGD/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintPerawatIGD(res.data.result);
        } else {
          setprintPerawatIGD("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintPerawatIGD("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintDokterIGD = (regId) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/DOKTERIGD/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintDokterIGD(res.data.result);
        } else {
          setprintDokterIGD("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintDokterIGD("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintSuket = (regId, jenis) => {
    console.log(regId, jenis);
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/${jenis}/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintSuket(res.data.result);
          setModalSuket(true);
        } else {
          setprintSuket("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintSuket("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintSBAR = (ruang, tgl) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlDouble/COBASBAR1/${ruang}/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintSBar(res.data.result);
          console.log(res.data.result);
          setmodalSbar(true);
          setloadDelay(false);
        } else {
          setprintSBar("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintSBar("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintCatatanPerawat = (reg, flag) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/COBASBARREG/${reg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          flag === "riwayat"
            ? setmodalSbarPerawat(false)
            : setmodalSbarPerawat(true);
          setprintSBarPerawat(res.data.result);
        } else {
          setprintSBarPerawat("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintSBarPerawat("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const getPrintKala = (dsk, reg) => {
    setloadDelay(true);
    axios
      .get(`${apiReport}/GetUrlSingle/${dsk}/${reg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintLapKala(res.data.result);
        } else {
          setprintLapKala("");
          message.warning("Data Asuham Tidak Ditemukan!");
          setloadDelay(false);
        }
      })
      .catch((err) => {
        setprintLapKala("");
        setloadDelay(false);
        message.error("Error Saat Mengambil Data Asuhan!");
      });
  };

  const kosongkanPrintOut = () => {
    setPrintRm13("");
    setprintRm02("");
    setprintLabPk("");
    setprintHasilOp("");
    setmodalPmrFisik("");
    setprintGambar("");
  };

  return (
    <PrintOutContext.Provider
      value={{
        getPrintRm02,
        getPrintRm02Tahun,
        getPrintRm02Poli,
        getPrintRm02Kunjungan,
        printRm02,
        setprintRm02,
        printRm02Tahun,
        setprintRm02Tahun,
        printRm02Poli,
        setprintRm02Poli,
        printRm02Kunjungan,
        setprintRm02Kunjungan,
        printRm13,
        setPrintRm13,
        getPrintRm13,
        getPrintHasilOp,
        printHasilOp,
        setprintHasilOp,
        modalKunjungan,
        setmodalKunjungan,
        getPrintLabPk,
        printLabPk,
        setprintLabPk,
        getPrintPmrFisik,
        printPmrFisik,
        modalPmrFisik,
        setmodalPmrFisik,
        printGambar,
        setprintGambar,
        getPrintGambarPasien,
        kosongkanPrintOut,
        loadDelay,
        setloadDelay,
        printLabPa,
        setprintLabPa,
        getPrintLabPa,
        printPemLain,
        setprintPemLain,
        modalPemLain,
        setmodalPemLain,
        getPrintPemLain,
        getDDST,
        setprintDDST,
        printDDST,
        getResumeMedis,
        printResumeMedis,
        setprintResumeMedis,
        getSPPR,
        setprintSPPR,
        printSPPR,
        getPrintAssAske,
        getPrintAsuhan,
        printasuhan,
        setprintAss,
        printAss,
        setprintAsuhan,
        modalPrint,
        setmodalPrint,
        printTerima,
        setprintTerima,
        printAnamnesa,
        setprintAnamnesa,
        printFirikRI,
        setprintFirikRI,
        printKonsulRI,
        setprintKonsulRI,
        printCPPTRI,
        setprintCPPTRI,
        printRM11,
        setprintRM11,
        printEvalGizi,
        setprintEvalGizi,
        printAsuhGizi,
        setprintAsuhGizi,
        printScrenGizi,
        setprintScrenGizi,
        printScrenGiziPYMS,
        setprintScrenGiziPYMS,
        getPrintTerimaPasien,
        getPrintAnamnesa,
        getPrintfisikRI,
        getPrintKonsulRI,
        getPrintCPPTRI,
        getPrintRM11,
        getPrintEvalGizi,
        getPrintAsuhGizi,
        getPrintScrenGizi,
        getPrintScrenGiziPYMS,
        modalTerima,
        setmodalTerima,
        modalAnamnesa,
        setmodalAnamnesa,
        modalPFisik,
        setmodalPFisik,
        modalAssAskep,
        setmodalAssAskep,
        modalRM11,
        setmodalRM11,
        modalAskep,
        setmodalAskep,
        modalKonsul,
        setmodalKonsul,
        modalCPPT,
        setmodalCPPT,
        getPrintPerawatIGD,
        printPerawatIGD,
        setprintPerawatIGD,
        getPrintDokterIGD,
        setprintDokterIGD,
        printDokterIGD,
        printSuket,
        setprintSuket,
        modalSuket,
        setModalSuket,
        getPrintSuket,
        modalSbar,
        setmodalSbar,
        printSBar,
        setprintSBar,
        getPrintSBAR,
        pilihWaktu,
        setpilihWaktu,
        getPrintCatatanPerawat,
        printSBarPerawat,
        setprintSBarPerawat,
        modalSbarPerawat,
        setmodalSbarPerawat,
        getPrintKala,
        printLapKala,
        setprintLapKala,
        jenisKala,
        setjenisKala,
        getPrintCPPTRIwayat,
        setprintCPPTRIwayat,
        printCPPTRIwayat,
        modalprintRM13,
        setmodalprintRM13,
        modalprintGiziAsuh,
        setmodalprintGiziAsuh,
        modalprintGizi,
        setmodalprintGizi,
        modalprintGizipyms,
        setmodalprintGizipyms,
        modalprintGiziEvaluasi,
        setmodalprintGiziEvaluasi,
      }}
    >
      {props.children}
    </PrintOutContext.Provider>
  );
};

export default PrintOutContextProvider;
