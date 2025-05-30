import React, { createContext, useContext, useState } from "react";
//import dayjs from 'dayjs';
import axios from "axios";
import { message, Modal } from "antd";
import { PasienContext } from "./PasienContext";
import dayjs from "dayjs";
import { LoginContext } from "./LoginContext";

export const KonsulContext = createContext();

const KonsulContextProvider = (props) => {
  const {
    cariPasienHariIni,
    poli1,
    tanggal,
    ruangasal,
    setNoreg,
    setCurpas,
    curpas,
  } = useContext(PasienContext);
  const { sendTeleSync, namauser } = useContext(LoginContext);
  const [konsul, setKonsul] = useState([]);
  const [konsulalih, setKonsulAlih] = useState([]);
  const [konsultasiId, setkonsultasiId] = useState([]);
  const [registrasiId, setregistrasiId] = useState([]);
  const [ruangId, setruangId] = useState([]);
  const [ruangTujuan, setruangTujuan] = useState([]);
  const [tanggalri, settanggalri] = useState([]);
  const [dokterId, setdokterId] = useState([]);
  const [smftujuan, setsmftujuan] = useState([]);
  const [alihRawat, setalihRawat] = useState([]);
  const [dokterTujuanId, setdokterTujuanId] = useState([]);
  const [subjective, setsubjective] = useState([]);
  const [objective, setobjective] = useState([]);
  const [assesment, setassesment] = useState([]);
  const [planning, setplanning] = useState([]);
  //const [diagnosaKerja, setdiagnosaKerja] = useState([]);
  //const [ringkasanPemeriksaan, setringkasanPemeriksaan] = useState([]);
  //const [terapi, setterapi] = useState([]);
  const [tanggalJawab, settanggalJawab] = useState([]);
  const [smfjawab, setsmfjawab] = useState([]);
  const [subjectJawab, setsubjectJawab] = useState([]);
  const [objectJawab, setobjectJawab] = useState([]);
  const [ajawab, setajawab] = useState([]);
  const [pjawab, setpjawab] = useState([]);
  //const [hasilPemeriksaan, sethasilPemeriksaan] = useState([]);
  //const [kesimpulan, setkesimpulan] = useState([]);
  //const [tindakan, settindakan] = useState([]);
  const [dokterJawabId, setdokterJawabId] = useState([]);
  const [modalkonsul, setModalKonsul] = useState(false);
  const [openmodal, setOpenModal] = useState(false);

  const [listkonsulri, setListkonsulri] = useState([]);
  const [getkosulid, setKonsulRIid] = useState([]);
  const [listSOAP, setListSOAP] = useState([]);

  const [formkonsul, setformkonsul] = useState(false);
  const [formjawabkonsul, setformjawabkonsul] = useState(true);
  const [smfdetailtujuan, setSmfdetailtujuan] = useState([]);
  const ip = sessionStorage.getItem("IP");
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const noreg = sessionStorage.getItem("noreg");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertKonsul = (datakonsul) => {
    axios
      .post(`${apiku}/EmrKonsultasi`, datakonsul, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
          detailKonsul(noreg);
          setModalKonsul(false);
          setOpenModal(false);
        } else {
          Modal.warning({
            content: res.data.message + "\n Silahkan cek isian form kembali.",
          });
          setOpenModal(false);
        }
      })
      .catch((err) => {
        console.log(err);
        Modal.error({ content: "Gagal Disimpan!" });
        setOpenModal(false);
      });
  };

  const insertKonsulJawab = (datakonsuljawab) => {
    axios
      .post(`${apiku}/EmrKonsultasi/JawabKonsul`, datakonsuljawab, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
          detailKonsul(noreg);
          syncKonsulKHSAll(ruangasal);
          setCurpas([]);
          setNoreg(null);
          sessionStorage.removeItem("noreg");
          sessionStorage.removeItem("norm");
          sessionStorage.removeItem("namaPasienRawat");
        } else {
          console.log(res.data);
          Modal.warning({
            content:
              res.data.message + "\n Pilih Pasien Kembali Ulangi Jawab Konsul.",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        // message.error("Gagal Disimpan!");
      });
  };

  const detailKonsul = (id) => {
    axios
      .get(`${apiku}/EmrKonsultasi/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (curpas.ruangId === poli1) {
            setKonsul(res.data.result);
          } else {
            setKonsul(
              res.data.result.filter((data) => data.ruangTujuan === poli1)
            );
          }
        } else {
          setKonsul([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setKonsul([]);
      });
  };

  const detailKonsulAlihRawat = (id) => {
    axios
      .get(`${apiku}/EmrKonsultasi/ReadAlihRawat/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKonsulAlih(res.data.result);
        } else {
          message.warning(res.data.message + " - Tidak ada konsul alih rawat");
          setKonsulAlih([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setKonsulAlih([]);
      });
  };

  const deleteKonsul = (idkonsul, noreg) => {
    axios
      .delete(`${apiku}/EmrKonsultasi/KonsultasiId/${idkonsul}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil batal konsul!");
          detailKonsul(noreg);
        } else {
          message.warning(res.data.message);
        }
      }, [])
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAlihRawat = (idkonsul) => {
    axios
      .delete(`${apiku}/EmrKonsultasi/KonsultasiAlihRawat/${idkonsul}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil batal konsul!");
          detailKonsulAlihRawat(noreg);
        } else {
          message.warning(res.data.message);
        }
      }, [])
      .catch((err) => {
        console.log(err);
      });
  };

  const syncKonsulKHS = (noreg, dpjp, ruangasal, ruangtujuan) => {
    axios
      .get(
        `${apiku}/EmrKonsultasi/SyncKonsultasi/${noreg}/${dpjp}/${ruangasal}/${ruangtujuan}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Sync!");
          detailKonsul(noreg);
        } else {
          message.warning("Gagal Sync Konsul KHS : " + res.data.message);
          console.log(res.data);
        }
      }, [])
      .catch((err) => {
        message.error("Koneksi Konsul KHS Gagal!");
        console.log(err);
      });
  };

  const syncKonsulKHSAll = (ruangtujuan) => {
    axios
      .get(`${apiku}/EmrKonsultasi/SyncKonsultasiAll/${ruangtujuan}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Sync Konsultasi!");
          // detailKonsul(noreg);
          // cariPasienPoli(ruangtujuan);
          cariPasienHariIni(ruangtujuan, dayjs(tanggal).format("YYYY-MM-DD"));
          // console.log(poli1, dayjs(tanggal).format("YYYY-MM-DD"));
        } else {
          console.log(res.data);
          message.warning(
            "Gagal Mengambil data Konsul KHS : " + res.data.message,
            10
          );
          sendTeleSync(
            "2",
            "SyncDataKHS - KonsulAll by Ruang",
            res.data.statusCode,
            res.data.message,
            ip,
            namauser,
            ruangasal
          );
          // Modal.warning({ content: res.data.message });
          cariPasienHariIni(poli1, dayjs(tanggal).format("YYYY-MM-DD"));
        }
      }, [])
      .catch((err) => {
        console.log(err);
        cariPasienHariIni(poli1, dayjs(tanggal).format("YYYY-MM-DD"));
      });
  };

  //----Get list data konsul berdasarkan RegistrsaId----//
  const listKonsultasiRI = (noreg) => {
    axios
      .get(`${apiku}/EmrKonsultasi/ListKosulRI/${noreg}`, options)
      .then((res) => {
        setListkonsulri(res.data.result);
      }, [])
      .catch((err) => {
        setListkonsulri([]);
      });
  };

  //----Get data konsul berdasarkan Id konsultasi----//
  const konsulRIid = (id) => {
    axios
      .get(`${apiku}/EmrKonsultasi/GetKonsulIdRI/${id}`, options)
      .then((res) => {
        console.log("data konsul " + res.data.result);
        setSmfdetailtujuan(res.data.result.smfDetail);
        setKonsulRIid(res.data.result);
        setkonsultasiId(res.data.result.konsultasiId);
        setregistrasiId(res.data.result.registrasiId);
        setruangId(res.data.result.ruangId);
        //     setruangTujuan(res.data.result.ruangTujuan),
        settanggalri(res.data.result.tanggal);
        setdokterId(res.data.result.dokterId);
        setsmftujuan(res.data.result.smfTujuan);
        setalihRawat(res.data.result.alihRawat);
        setdokterTujuanId(res.data.result.doktertujuanid);
        setsubjective(res.data.result.subjektive);
        setobjective(res.data.result.objektive);
        setassesment(res.data.result.assesment);
        setplanning(res.data.result.planning);
        //     setdiagnosaKerja(res.data.result.diagnosaKerja),
        //     setringkasanPemeriksaan(res.data.result.ringkasanPemeriksaan),
        //     setterapi(res.data.result.terapi),
        settanggalJawab(res.data.result.tanggalJawab);
        setsmfjawab(res.data.result.smfJawab);
        setsubjectJawab(res.data.result.subjectJawab);
        setobjectJawab(res.data.result.objectJawab);
        setajawab(res.data.result.aJawab);
        setpjawab(res.data.result.pJawab);
        //     sethasilPemeriksaan(res.data.result.hasilPemeriksaan),
        //     setkesimpulan(res.data.result.kesimpulan),
        //     settindakan(res.data.result.tindakan);
        setdokterJawabId(res.data.result.dokterJawabId);
        //     sethapus(res.data.result.hapus)
        // console.log(datakonsulan);
      }, [])
      .catch((err) => {
        setKonsulRIid([]);
        console.log("datakonsul ilang");
      });
  };

  //----Get list data SOAP by Dokter berdasarkan RegistrsaId----//
  const ambillistSOAPRI = (noreg) => {
    axios
      .get(`${apiku}/EmrCatatanMedis/ReadSOAPRI/${noreg}`, options)
      .then((res) => {
        setListSOAP(res.data.result);
        console.log(res.data.result);
        setsubjective("");
        setobjective("");
        setassesment("");
        setplanning("");
        settanggalJawab("");
        setsmfjawab("");
        setsubjectJawab("");
        setobjectJawab("");
        setajawab("");
        setpjawab("");
        settanggalri("");
        setsmftujuan("");
        setalihRawat("");
        setdokterTujuanId("");
        setdokterJawabId("");
      }, [])
      .catch((err) => {
        setListSOAP([]);
      });
  };

  //----Get data SOAP by Dokter berdasarkan SOAPID----//
  const ambilSOAPIdRI = (id) => {
    axios
      .get(`${apiku}/EmrCatatanMedis/ReadSOAP/${id}`, options)
      .then((res) => {
        //setListSOAP(res.data.result);
        setsubjective(res.data.result.subjektif);
        setobjective(res.data.result.objektif);
        setassesment(res.data.result.assesment);
        setplanning(res.data.result.planning);
      }, [])
      .catch((err) => {
        console.log(err);
        //setListSOAP([]);
      });
  };

  //----insert konsultasi rawat inap----//
  const insertKonsulRI = (datakonsulri) => {
    axios
      .post(`${apiku}/EmrKonsultasi/InsertKonsultasiRi`, datakonsulri)
      .then((res) => {
        console.log(res.data.result);
        message.success("Berhasil Disimpan!");
      })
      .catch((error) => {
        console.log(error);
        message.error("Gagal Disimpan!" + error);
      });
  };

  //----jawab konsultasi rawat inap----//
  const jawabKonsulRI = (datajawabkonsulri) => {
    axios
      .post(`${apiku}/EmrKonsultasi/JawabKonsultasiRi`, datajawabkonsulri)
      .then((res) => {
        console.log(res.data.result);
        message.success("Berhasil Disimpan!");
      })
      .catch((error) => {
        console.log(error);
        message.error("Gagal Disimpan!" + error);
      });
  };

  //----mengossongkan kolom inputan----//
  const konsulbaru = () => {
    setdokterId("");
    setsubjective("");
    setobjective("");
    setassesment("");
    setplanning("");
    settanggalJawab("");
    setsmfjawab("");
    setsubjectJawab("");
    setobjectJawab("");
    setajawab("");
    setpjawab("");
    settanggalri("");
    setsmftujuan("");
    setalihRawat("");
    setdokterTujuanId("");
    setdokterJawabId("");
    setformkonsul(false);
    setformjawabkonsul(true);
    console.log("konsul form kosongkan");
  };

  return (
    <KonsulContext.Provider
      value={{
        setkonsultasiId,
        konsultasiId,
        konsul,
        insertKonsul,
        detailKonsul,
        insertKonsulJawab,
        ruangTujuan,
        setruangTujuan,
        tanggalri,
        settanggalri,
        dokterId,
        setdokterId,
        smftujuan,
        setsmftujuan,
        smfdetailtujuan,
        alihRawat,
        setalihRawat,
        dokterTujuanId,
        setdokterTujuanId,
        subjective,
        setsubjective,
        objective,
        setobjective,
        assesment,
        setassesment,
        planning,
        setplanning,
        tanggalJawab,
        settanggalJawab,
        smfjawab,
        setsmfjawab,
        subjectJawab,
        setsubjectJawab,
        objectJawab,
        setobjectJawab,
        ajawab,
        setajawab,
        pjawab,
        setpjawab,
        dokterJawabId,
        setdokterJawabId,
        listKonsultasiRI,
        listkonsulri,
        setListkonsulri,
        konsulRIid,
        setKonsulRIid,
        getkosulid,
        registrasiId,
        ruangId,
        listSOAP,
        setListSOAP,
        ambillistSOAPRI,
        ambilSOAPIdRI,
        konsulbaru,
        formkonsul,
        setformkonsul,
        formjawabkonsul,
        setformjawabkonsul,
        insertKonsulRI,
        jawabKonsulRI,
        deleteKonsul,
        syncKonsulKHS,
        syncKonsulKHSAll,
        modalkonsul,
        setModalKonsul,
        deleteAlihRawat,
        openmodal,
        setOpenModal,
        detailKonsulAlihRawat,
        konsulalih,
      }}
    >
      {props.children}
    </KonsulContext.Provider>
  );
};

export default KonsulContextProvider;
