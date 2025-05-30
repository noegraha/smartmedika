import React, { createContext, useContext, useState } from "react";
import { message } from "antd";
import dayjs from "dayjs";
import axios from "axios";
import { LoginContext } from "../../../rawatjalan/context";

export const LogBookAskepContext = createContext();

const LogBookAskepContextProvider = (props) => {
  const [listLogBook, setlistLogBook] = useState([]);
  const [loading, setloading] = useState(false);
  const [logboklist, setlogboklist] = useState(false);

  const [listKegiatanPerawat, setlistKegiatanPerawat] = useState([]);
  const [kegiatanId, setKegiatanId] = useState(0);
  const [tanggalKegiatan, setTanggalKegiatan] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [permenpanId, setPermenpanId] = useState("");
  const [registrasiId, setRegistrasiId] = useState("");
  const [tableData, setTableData] = useState([]);
  const [visible, setModalVisible] = useState(false);
  const [visibleCetak, setvisibleCetak] = useState(false);

  const [penilaianId, setPenilaianId] = useState(0);
  const [namaPerawat, setnamaPerawat] = useState("");
  const [bulanPenilaian, setBulanPenilaian] = useState("");
  const [perawat, setPerawat] = useState("");
  const [tglValidKaru, setTglValidKaru] = useState("");
  const [nilaiKaru, setNilaiKaru] = useState("");
  const [catatanKaru, setCatatanKaru] = useState("");
  const [karu, setKaru] = useState("");
  const [namaKaru, setnamaKaru] = useState("");
  const [tglValidKasie, setTglValidKasie] = useState("");
  const [nilaiKasie, setNilaiKasie] = useState("");
  const [catatanKasie, setCatatanKasie] = useState("");
  const [kasie, setKasie] = useState("");
  const [modalPenilaian, setmodalPenilaian] = useState(false);
  const [modalPenilaianKasie, setmodalPenilaianKasie] = useState(false);
  const [modalPenilaianCetak, setmodalPenilaianCetak] = useState(false);
  const [listPenilaianPerawat, setlistPenilaianPerawat] = useState([]);
  const [thnPenilaian, setthnpenilaian] = useState(dayjs());
  const [disableform, setdisableform] = useState(false);

  const [printVeiwLog, setprintVeiwLog] = useState("");
  const [printPenilaian, setprintPenilaian] = useState("");
  const [listButirAK, setlistButirAK] = useState([]);

  ///ws galih ////
  const [listBawahan, setlistBawahan] = useState([]);
  const [infoBawahan, setinfoBawahan] = useState("");
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");
  const { apiReport } = useContext(LoginContext);

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getButirAK = (jenjang, kategori) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/ReadButirPermenpan/${jenjang}/${kategori}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistButirAK(res.data.result);
          console.log(res.data.result);
        } else {
          // message.warning("Gagal Mengambil Data");
          setlistButirAK([]);
          console.log("tidak ketemu");
        }
      })
      .catch((err) => {
        setlistButirAK([]);
        message.error("Error Saat Mengambil Data Anamnesa!");
        message.error(err);
      });
  };

  const getListLogBook = (idPegaawai, Bulan, Tahun) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/GetKepegawaian/${idPegaawai}/${Bulan}/${Tahun}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistLogBook(res.data.result);
          console.log(res.data.result);
        } else {
          message.warning(res.data.result);
          setlistLogBook([]);
          console.log("tidak ketemu");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data Anamnesa!");
        message.error(err);
      });
  };

  const getprintViewLogbook = (userpegawai, periode) => {
    setloading(true);
    axios
      .get(
        `${apiReport}/reporting/GetUrlDouble/LOGBOOKVIEW/${userpegawai}/${periode}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintVeiwLog(res.data.result);
          console.log(res.data.result);
          setloading(false);
        } else {
          setloading(false);
          message.warning("Data Tidak Di temukan");
          setprintVeiwLog("");
          console.log("tidak ketemu");
        }
      })
      .catch((err) => {
        setprintVeiwLog("");
        setloading(false);

        message.error("Error Saat Mengambil Data!");
      });
  };

  const getprintPenilaian = (jenis, param1, param2) => {
    setloading(true);
    axios
      .get(
        `${apiReport}/GetUrlDoubleFree/${jenis}/${param1}/${param2}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprintPenilaian(res.data.result);
          console.log(res.data.result);
          setloading(false);
        } else {
          message.warning("Data Tidak Di temukan");
          setprintPenilaian("");
          console.log("tidak ketemu");
          setloading(false);
        }
      })
      .catch((err) => {
        setprintPenilaian("");
        console.log("error");

        setloading(false);
        message.error("Error Saat Mengambil Data!");
      });
  };

  const getLogBok = (user, tgl) => {
    setloading(true);
    axios
      .get(`${apiReport}/GetUrlDouble/LOGBOKASKEP/${user}/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlogboklist(res.data.result);
          console.log("tahun", res.data.result);
        } else {
          setlogboklist("");
          message.warning("Data RM02 Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setlogboklist("");
        message.error("Error Saat Mengambil Data RM02!");
      });
  };

  const insertKegiatanPegawai = (datakegiatan) => {
    setloading(true);
    axios
      .post(`${apiku}/Askep/Asuhan/TindakanPerawat`, datakegiatan, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getKegiatanPerawat(
            datakegiatan.username,
            dayjs(datakegiatan.tanggalKegiatan).format("MM"),
            dayjs(datakegiatan.tanggalKegiatan).format("YYYY")
          );
          setloading(false);
          message.success("Berhasil Menyimpan Data Kegiatan!");
          setModalVisible(false);
        } else {
          setloading(false);
          message.warning("Gagal Menyimpan Data Kegiatan!");
        }
      })
      .catch((err) => {
        setloading(false);
        message.error("Error Saat Menyimpan Data Kegiatan");
      });
  };

  const getKegiatanPerawat = (user, bulan, tahun) => {
    setloading(true);
    axios
      .get(
        `${apiku}/Askep/Asuhan/TindakanPerawat/${user}/${bulan}/${tahun}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setloading(false);
          setlistKegiatanPerawat(res.data.result);
          console.log(res.data.result);
        } else {
          setloading(false);
          setlistKegiatanPerawat([]);
        }
      })
      .catch((err) => {
        setlistKegiatanPerawat([]);
        setloading(false);
        message.error("Error Saat Mengambil Data Kegiatan!");
      });
  };

  const insertPenilaianPerawat = (data, param) => {
    console.log("masuk penilaian");
    setloading(true);
    axios
      .post(`${apiku}/Askep/Asuhan/PenilaianPerawat`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getPenilaianPerawat(
            param === "%20" ? param : data.perawat,
            data.bulanPenilaian
          );
          setloading(false);
          setModalVisible(false);
          setmodalPenilaian(false);
          setPenilaianId(0);
          setBulanPenilaian("");
          setNilaiKaru("");
          setCatatanKaru("");
          setdisableform(false);
          message.success("Berhasil Menyimpan Data Penilaian!");
        } else {
          setloading(false);
          // setmodalPenilaian(false);
          message.warning("Gagal Menyimpan Data Penilaian!");
        }
      })
      .catch((err) => {
        setloading(false);
        // setmodalPenilaian(false);
        message.error("Error Saat Menyimpan Data Penilaian");
      });
  };

  const getPenilaianPerawat = (user, tahun) => {
    setloading(true);
    axios
      .get(
        `${apiku}/Askep/Asuhan/ReadPenilaianPerawat/${user}/${tahun}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setloading(false);
          setlistPenilaianPerawat(res.data.result);
          console.log(res.data.result);
        } else {
          setloading(false);
          setlistPenilaianPerawat([]);
        }
      })
      .catch((err) => {
        setlistPenilaianPerawat([]);
        setloading(false);
        message.error("Error Saat Mengambil Data Penilaian!");
      });
  };

  ////ws galih ////
  const getBawahanKaru = (userid, bulan) => {
    setloading(true);
    console.log(".masuk" + userid);
    axios
      .get(`${apiku}/MstPegawai/DetailPegawai/${userid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setloading(true);
          axios
            .post(
              `http://182.168.0.236:8080/nadiku_new/api/v1/pegawai/bawahan_pegawai`,
              {
                id_pegawai: res.data.result.PegawaiId,
              }
            )
            .then((res) => {
              console.log(res.data.code);
              if (res.data.code === "200") {
                console.log(res.data.result);
                setloading(false);
                setlistBawahan(res.data.result);
                // message.success("Berhasil Menyimpan Data Kegiatan!");
              } else {
                setlistBawahan([]);
                setloading(false);
                message.warning("Gagal Mengambil Data Pegawai!");
              }
            })
            .catch((err) => {
              setlistBawahan([]);
              setloading(false);
              message.error("Error Saat Mengambil Data Pegawai");
            });
        } else {
          console.log("gagal");
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };
  const delKegiatan = (id, user, bulan, tahun) => {
    axios
      .delete(`${apiku}/Askep/Asuhan/TindakanPerawat/${id}`, options)
      .then((res) => {
        console.log("masuk");

        if (res.data.statusCode === 200) {
          // Jika berhasil dihapus, ambil kembali data kegiatan perawat
          getKegiatanPerawat(user, bulan, tahun);
          message.success("Berhasil Dihapus!");
        } else {
          message.warning("Gagal Dihapus!");
        }
      })
      .catch((err) => {
        // Pastikan menangani kesalahan dengan lebih detail
        const errorMessage =
          err.response?.data?.message || err.message || "Terjadi kesalahan!";
        message.error(`Error: ${errorMessage}`);
      });
  };

  return (
    <LogBookAskepContext.Provider
      value={{
        listLogBook,
        setlistLogBook,
        getListLogBook,
        loading,
        setloading,
        getLogBok,
        logboklist,
        setlogboklist,
        kegiatanId,
        setKegiatanId,
        tanggalKegiatan,
        setTanggalKegiatan,
        deskripsi,
        setDeskripsi,
        permenpanId,
        setPermenpanId,
        registrasiId,
        setRegistrasiId,
        tableData,
        setTableData,
        visible,
        setModalVisible,
        visibleCetak,
        setvisibleCetak,
        penilaianId,
        setPenilaianId,
        bulanPenilaian,
        setBulanPenilaian,
        perawat,
        setPerawat,
        tglValidKaru,
        setTglValidKaru,
        nilaiKaru,
        setNilaiKaru,
        catatanKaru,
        setCatatanKaru,
        karu,
        setKaru,
        namaPerawat,
        setnamaPerawat,
        namaKaru,
        setnamaKaru,
        tglValidKasie,
        setTglValidKasie,
        nilaiKasie,
        setNilaiKasie,
        catatanKasie,
        setCatatanKasie,
        kasie,
        setKasie,
        modalPenilaian,
        setmodalPenilaian,
        modalPenilaianCetak,
        setmodalPenilaianCetak,
        modalPenilaianKasie,
        setmodalPenilaianKasie,
        insertKegiatanPegawai,
        getKegiatanPerawat,
        listKegiatanPerawat,
        setlistKegiatanPerawat,
        insertPenilaianPerawat,
        getPenilaianPerawat,
        listPenilaianPerawat,
        setlistPenilaianPerawat,
        thnPenilaian,
        setthnpenilaian,
        disableform,
        setdisableform,
        getprintViewLogbook,
        printVeiwLog,
        setprintVeiwLog,
        getprintPenilaian,
        printPenilaian,
        setprintPenilaian,
        listButirAK,
        setlistButirAK,
        getButirAK,
        getBawahanKaru,
        listBawahan,
        setlistBawahan,
        infoBawahan,
        setinfoBawahan,
        delKegiatan,
      }}
    >
      {props.children}
    </LogBookAskepContext.Provider>
  );
};

export default LogBookAskepContextProvider;
