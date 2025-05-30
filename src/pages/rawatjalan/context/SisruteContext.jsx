import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const SisruteContext = createContext();

const SisruteContextProvider = (props) => {
  const [carakeluar, setCaraKeluar] = useState([]);
  const [refpelayanan, setRefPelayanan] = useState([]);
  const [kriteriaKhusus, setKriteriaKhusus] = useState([]);
  const [sdm, setSDM] = useState([]);
  const [pelayanan, setPelayanan] = useState([]);
  const [kelasrawat, setKelasRawat] = useState([]);
  const [alat, setAlat] = useState([]);
  const [sarana, setSarana] = useState([]);
  const [faskes, setFaskes] = useState([]);
  const [alasan, setAlasan] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getSisCaraKeluar = () => {
    axios
      .get(`${apiku}/Sisrute/CaraKeluar`, options)
      .then((res) => {
        if (res.data.status === 200) {
          console.log(res.data.result);
          setCaraKeluar(res.data.data);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  const getSisRefPelayanan = () => {
    axios
      .get(`${apiku}/Sisrute/RefPelayanan/1/200`, options)
      .then((res) => {
        if (res.data.status === 200) {
          setRefPelayanan(res.data.data);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  const getSisKriteriaKhusus = () => {
    axios
      .get(`${apiku}/Sisrute/GetKriteriaKhusus`, options)
      .then((res) => {
        if (res.data.status === 200) {
          setKriteriaKhusus(res.data.data);
        } else {
          message.warning("Data tidak ditemukan");
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  const getSisSDM = () => {
    axios
      .get(`${apiku}/Sisrute/GetSDM/0/50`, options)
      .then((res) => {
        if (res.data.status === 200) {
          setSDM(res.data.data);
        } else {
          message.warning("Data tidak ditemukan");
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  const getSisPelayanan = () => {
    axios
      .get(`${apiku}/Sisrute/GetPelayanan/0/50`, options)
      .then((res) => {
        if (res.data.status === 200) {
          setPelayanan(res.data.data);
        } else {
          message.warning("Data tidak ditemukan");
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  const getSisKelasRawat = () => {
    axios
      .get(`${apiku}/Sisrute/GetKelasPerawatan/0/10`, options)
      .then((res) => {
        if (res.data.status === 200) {
          setKelasRawat(res.data.data);
        } else {
          message.warning("Data tidak ditemukan");
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  const getSisAlat = () => {
    axios
      .get(`${apiku}/Sisrute/GetAlat/0/1100`, options)
      .then((res) => {
        if (res.data.status === 200) {
          setAlat(res.data.data);
        } else {
          message.warning("Data tidak ditemukan");
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  const getSisSarana = () => {
    axios
      .get(`${apiku}/Sisrute/GetSarana/1/900`, options)
      .then((res) => {
        if (res.data.status === 200) {
          setSarana(res.data.data);
        } else {
          message.warning("Data tidak ditemukan");
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  const getSisFaskes = (nama) => {
    axios
      .get(`${apiku}/Sisrute/GetFaskesTujuan/${nama}`, options)
      .then((res) => {
        if (res.data.status === 200) {
          setFaskes(res.data.data);
        } else {
          message.warning("Data tidak ditemukan");
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  const getSisAlasan = () => {
    axios
      .get(`${apiku}/Sisrute/GetAlasan`, options)
      .then((res) => {
        if (res.data.status === 200) {
          setAlasan(res.data.data);
        } else {
          message.warning("Data tidak ditemukan");
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };
  return (
    <SisruteContext.Provider
      value={{
        kriteriaKhusus,
        sdm,
        pelayanan,
        kelasrawat,
        alat,
        sarana,
        faskes,
        alasan,
        refpelayanan,
        carakeluar,
        getSisCaraKeluar,
        getSisRefPelayanan,
        getSisAlasan,
        getSisFaskes,
        getSisSarana,
        getSisAlat,
        getSisKelasRawat,
        getSisPelayanan,
        getSisSDM,
        getSisKriteriaKhusus,
      }}
    >
      {props.children}
    </SisruteContext.Provider>
  );
};

export default SisruteContextProvider;
