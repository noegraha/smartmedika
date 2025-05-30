import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { message } from "antd";
export const PelayananContext = createContext();

const PelayananContextProvider = (props) => {
  const [pelayanan, setPelayanan] = useState([]);
  const [pelayananruang, setPelayananRuang] = useState([]);
  const [pelayanankelas, setPelayananKelas] = useState([]);
  const [caramasuk, setCaraMasuk] = useState([]);
  const [indikasi, setIndikasi] = useState([]);
  const [dokterpoli, setDokterpoli] = useState([]);
  const [dokter, setDokter] = useState([]);
  const [doktertrue, setDokterTrue] = useState([]);
  const [dokterdetail, setDokterDetail] = useState([]);
  const [dokterall, setDokterAll] = useState([]);
  const [pelaksana, setPelaksana] = useState([]);
  const [kosong, setKosong] = useState([]);
  const [jnspelayanan, setJenisPelayanan] = useState([]);
  const [pelayananbedah, setPelayananBedah] = useState([]);
  const [billlayanan, setBilllayanan] = useState("");
  const [detpel, setDetpel] = useState("");
  const [biayapel, setBiayaPel] = useState("");
  const [tabkey, setTabkey] = useState("3");
  const [hitung, setHitung] = useState(0);
  const [mode, setMode] = useState(true);

  const ruangId = localStorage.getItem("ruangId");
  const kelasRawatId = localStorage.getItem("kelasRawatId");
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  useEffect(() => {
    // sessionStorage.setItem("userData", token);
    const tok = sessionStorage.getItem("userData");

    const options = {
      headers: { Authorization: "Bearer " + tok },
    };
    axios
      .get(`${apiku}/mstDokter/Lookup/Dr/1/1000`, options)
      .then((res) => {
        setDokterAll(
          [
            ...res.data.result,
            { dokterId: "PR27", namaDokter: "REKAM MEDIK" },
          ].sort((a, b) => a.namaDokter.localeCompare(b.namaDokter))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiku}/MstCaraMasukKeluar/Lookup/1/ /1/10`, options)
      .then((res) => {
        setCaraMasuk(res.data.result);
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiku}/MstIndikasiDirawat/Lookup/ /1/50`, options)
      .then((res) => {
        setIndikasi(
          res.data.result.sort((a, b) => a.deskripsi.localeCompare(b.deskripsi))
        );
      })
      .catch((err) => console.log(err));
    axios
      .get(`${apiku}/MstJenisLayanan/Lookup/ /1/100`, options)
      .then((res) => {
        setJenisPelayanan(res.data.result);
      })
      .catch((err) => console.log(err));
  }, [token]);

  const loadPelayananRuang = (ruang) => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/Read/${ruang}/1/1000`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPelayanan(
            res.data.result.sort((a, b) =>
              a.deskripsi.localeCompare(b.deskripsi)
            )
          );
        } else {
          setPelayanan([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setPelayanan([]);
        console.log(err);
        message.error("Gagal mengambil data1");
      });
  };

  const loadPelayananRuangKelas = (ruang, kelas) => {
    axios
      .get(
        `${apiku}/MstStandarPelayananRuang/ReadByKelas/${ruang}/${kelas}/1/10000`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setPelayananKelas(res.data.result);
          setPelayananKelas(
            res.data.result.sort((a, b) =>
              a.deskripsi.localeCompare(b.deskripsi)
            )
          );
          // console.log(res.data.result);
        } else {
          setPelayananKelas([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const loadPelayanan = (ruang, day) => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/Read/${ruang}/1/500`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setPelayanan(res.data.result.sort((a, b) => a.deskripsi.localeCompare(b.deskripsi))
          // );
          setPelayanan(res.data.result);
        } else {
          setPelayanan([]);
          message.warning(res.data.message, "1");
        }
      })
      .catch((err) => {
        setPelayanan([]);
        console.log(err);
        message.error("Gagal mengambil data1!");
      });
    // axios
    //   .get(`${apiku}/mstDokter/Lookup/${ruang}/1/100`, options)
    //   .then((res) => {
    //     if (res.data.statusCode === 200) {
    //       setDokter(res.data.result);
    //     } else {
    //       setDokter([]);
    //       message.warning(res.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     setDokter([]);
    //     console.log(err);
    //     message.error("Gagal mengambil data!");
    //   });
    // axios
    //   .get(`${apiku}/mstDokter/Lookup/${ruang}/1/100`, options)
    //   .then((res) => {
    //     if (res.data.statusCode === 200) {
    //       setPelaksana(res.data.result);
    //     } else {
    //       setPelaksana([]);
    //       message.warning(res.data.message);
    //     }
    //   })
    //   .catch((err) => {
    //     setPelaksana([]);
    //     console.log(err);
    //     message.error("Gagal mengambil data!");
    //   });
    axios
      .get(`${apiku}/MstDokter/LookupShift/${ruang}/P/${day}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDokter(res.data.result);
          setPelaksana(res.data.result);
          // console.log(res.data.result);
        } else {
          setDokter([]);
          setPelaksana([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setDokter([]);
        setPelaksana([]);
        console.log(err);
        message.error("Gagal mengambil data!");
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
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const detailPelayanan = (id) => {
    axios
      .get(
        `${apiku}/MstStandarPelayananRuang/ID/${id}/${kelasRawatId}`,
        options
      )
      .then((res) => {
        setDetpel(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const cariBill = () => {
    axios
      .get(`${apiku}/mstBillPelayanan/Lookup/1910252005/1/10`, options)
      .then((res) => {
        setBilllayanan(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cariDokter = () => {
    console.log(tok);
    axios
      .get(`${apiku}/Dokter/Lookup/Dr/1/100`, options)
      .then((res) => {
        setDokter(res.data.result);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDokter = (poli) => {
    axios
      .get(`${apiku}/mstDokter/Lookup/${poli}/1/100`, options)
      .then((res) => {
        setDokterpoli(
          res.data.result.sort((a, b) =>
            a.namaDokter.localeCompare(b.namaDokter)
          )
        );
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDokterDetail = (id) => {
    axios
      .get(`${apiku}/MstDokter/ID/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDokterDetail(res.data.result);
          setDokterTrue(res.data.result.jenisKelamin);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getDokterShift = (ruang, day) => {
    axios
      .get(`${apiku}/MstDokter/LookupShift/${ruang}/P/${day}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDokterpoli(
            res.data.result.sort((a, b) =>
              a.NamaDokter.localeCompare(b.NamaDokter)
            )
          );
        } else {
          setDokterpoli([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setDokterpoli([]);
        console.log(err);
        message.error("Gagal mengambil data!");
      });
  };

  const loadpelayananbedah = () => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/Read/9411/1/3000`, options)
      .then((res) => {
        setPelayananBedah(res.data.result);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Mengambil Data!");
      });
  };
  return (
    <PelayananContext.Provider
      value={{
        pelayanan,
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
        loadPelayanan,
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
        pelayanankelas,
        loadPelayananRuangKelas,
        getDokterDetail,
        dokterdetail,
        doktertrue,
        getDokterShift,
        setDokterpoli,
      }}
    >
      {props.children}
    </PelayananContext.Provider>
  );
};

export default PelayananContextProvider;
