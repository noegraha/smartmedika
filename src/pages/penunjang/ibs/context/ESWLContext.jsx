import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { message } from "antd";

export const ESWLContext = createContext();

const ESWLContextProvider = (props) => {
  const [eswlorder, setESWLorder] = useState("");
  const [eswlhasil, setESWLhasil] = useState("");
  const [laporanEswlId, setLaporanESWLId] = useState("");
  const [detailEswlId, setDetailESWLId] = useState("");
  const [detailEswlOrder, setDetailESWLOrder] = useState("");
  const [statusCode, setStatusCode] = useState("");
  const [readeswlorder, setReadESWLOrder] = useState("");

  const [namaoperator, setNamaOperator] = useState("");
  const [namaasisten, setNamaAsisten] = useState("");
  const [namaperawat, setNamaPerawat] = useState("");
  const [jenistindakan, setJenisTindakan] = useState("");
  const [waktumulai, setWaktuMulai] = useState("");
  const [waktuselesai, setWaktuSelesai] = useState("");
  const [tanggaltindakan, setTanggalTindakan] = useState("");
  const [amplitudo, setAmplitudo] = useState("");
  const [power, setPower] = useState("");
  const [frekuensi, setFrekuensi] = useState("");
  const [intensityrate, setIntensityRate] = useState("");
  const [diagnosapra, setDiagnosaPra] = useState("");
  const [diagnosapasca, setDiagnosaPasca] = useState("");
  const [laporanoperasi, setLaporanOperasi] = useState("");

  const [gambar, setGambar] = useState([]);
  const [tindakan, setTindakan] = useState(false);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertESWL = (dataeswl) => {
    axios
      .post(`http://182.168.0.119/api/Eswl`, dataeswl)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!", res.data.result);
          setStatusCode(res.data.statusCode);
        } else {
          message.error("Gagal Disimpan!", res.data.result);
        }
      })
      .catch((err) => {
        message.error("Error Saat Disimpan");
        console.log("EROR", dataeswl);
      });
  };

  const getEswlOrder = (tgl) => {
    axios
      .get(`${apiku}/Eswl/Lookup/9157/9423/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("eswlorder", res.data.result);
          setESWLorder(res.data.result);
          console.log("tglorder", tgl);
          if (res.data.result.length > 0) {
            setReadESWLOrder(res.data.result[0].NOORDER);
            console.log("eswlread", res.data.result[0].NOORDER);
          }
        } else {
          console.log("data kosong");
          message.warning("Data tidak ditemukan");
          setESWLorder(res.data.result);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getEswlHasil = (tgl) => {
    axios
      .get(`${apiku}/Eswl/Lookup/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("eswlhasil", res.data.result);
          setESWLhasil(res.data.result);
          if (res.data.result.length > 0) {
            setLaporanESWLId(res.data.result[0].LaporanEswlId);
            console.log("eswlhasil2", res.data.result[0].LaporanEswlId);
          }
          console.log("tglhasil", tgl);
        } else {
          console.log("data kosong");
          message.warning("Data tidak ditemukan");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getReadEswlOrder = (noorder) => {
    axios
      .get(`${apiku}/Eswl/9157/9423/${noorder}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDetailESWLOrder(res.data.result);
          console.log("eswlreadorder", res.data.result);
        } else {
          console.log("data kosong");
          message.warning("Data tidak ditemukan");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getReadEswlHasil = (id) => {
    axios
      .get(`${apiku}/Eswl/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDetailESWLId(res.data.result);
          console.log("eswlreadhasil", res.data.result);
        } else {
          console.log("data kosong");
          message.warning("Data tidak ditemukan");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getCurrentTime = (separator = "-") => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();

    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}
    `;
  };

  return (
    <ESWLContext.Provider
      value={{
        insertESWL,
        getEswlOrder,
        getEswlHasil,
        eswlorder,
        eswlhasil,
        getCurrentTime,
        laporanEswlId,
        getReadEswlHasil,
        detailEswlId,
        getReadEswlOrder,
        detailEswlOrder,
        readeswlorder,
        setNamaOperator,
        namaoperator,
        setNamaAsisten,
        setNamaPerawat,
        setJenisTindakan,
        setWaktuMulai,
        setWaktuSelesai,
        setTanggalTindakan,
        setAmplitudo,
        setPower,
        setFrekuensi,
        setIntensityRate,
        setDiagnosaPra,
        setDiagnosaPasca,
        setLaporanOperasi,
        gambar,
        setGambar,
        tindakan,
        setTindakan,
      }}
    >
      {props.children}
    </ESWLContext.Provider>
  );
};

export default ESWLContextProvider;
