import React, { createContext, useState, useContext } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { Modal, message, notification } from "antd";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "./PasienRIContext";
// import { PasienRIContext } from "./PasienRIContext";

export const KonsulRIContext = createContext();

const KonsulRIContextProvider = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser, sendTele } = useContext(LoginContext);
  const { curpasRI } = useContext(PasienRIContext);
  const { cariPasienRuangRI } = useContext(PasienRIContext);
  // const { curpasRI } = useContext(PasienRIContext);
  const [konsultasiId, setkonsultasiId] = useState(0);
  const [tanggal, settanggal] = useState(dayjs());
  const [dokterId, setdokterId] = useState("");
  const [smftujuan, setsmftujuan] = useState("");
  const [alihRawat, setalihRawat] = useState(false);
  const [dokterTujuanId, setdokterTujuanId] = useState("");
  const [subjective, setsubjective] = useState("");
  const [objective, setobjective] = useState("");
  const [assesment, setassesment] = useState("");
  const [planning, setplanning] = useState("");
  const [tanggalJawab, settanggalJawab] = useState(dayjs());
  const [smfjawab, setsmfjawab] = useState("");
  const [subjectJawab, setsubjectJawab] = useState("");
  const [objectJawab, setobjectJawab] = useState("");
  const [ajawab, setajawab] = useState("");
  const [pjawab, setpjawab] = useState("");
  const [dokterJawabId, setdokterJawabId] = useState("");

  const [listkonsulri, setListkonsulri] = useState([]);
  const [getkosulid, setKonsulRIid] = useState([]);
  const [listSOAP, setListSOAP] = useState([]);
  const [formkonsul, setformkonsul] = useState(false);
  const [formjawabkonsul, setformjawabkonsul] = useState(true);

  const [modalkonsul, setModalKonsul] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [openmodal, setOpenModal] = useState(false);
  const [modalJawab, setmodalJawab] = useState(false);

  const kodeDokter = sessionStorage.getItem("pegawai");
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  //----Get list data konsul berdasarkan RegistrsaId----//
  const listKonsultasiRI = (noreg) => {
    axios
      .get(`${apiku}/EmrKonsultasi/ReadRI/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListkonsulri(res.data.result);
          console.log(res.data.result);
        } else {
          setListkonsulri([]);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Eror Saat Mengambil Data Konsultasi!");
      });
  };

  //----Get data konsul berdasarkan Id konsultasi----//
  const getkonsulRIid = (id) => {
    axios
      .get(`${apiku}/EmrKonsultasi/GetKonsulIdRI/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setkonsultasiId(res.data.result.konsultasiId);
          settanggal(dayjs(res.data.result.tanggal));
          setdokterId(res.data.result.dokterId);
          setsmftujuan(res.data.result.smfTujuan.toString());
          setalihRawat(res.data.result.alihRawat);
          setdokterTujuanId(res.data.result.doktertujuanid);
          setsubjective(res.data.result.subjektive);
          setobjective(res.data.result.objektive);
          setassesment(res.data.result.assesment);
          setplanning(res.data.result.planning);
          settanggalJawab(dayjs(res.data.result.tanggalJawab));
          setsmfjawab(
            res.data.result.smfJawab === null
              ? res.data.result.smfTujuan.toString()
              : res.data.result.smfJawab.toString()
          );
          setsubjectJawab(res.data.result.subjectJawab);
          setobjectJawab(res.data.result.objectJawab);
          setajawab(res.data.result.aJawab);
          setpjawab(res.data.result.pJawab);
          setdokterJawabId(
            res.data.result.dokterJawabId === null
              ? res.data.result.doktertujuanid
              : res.data.result.dokterJawabId
          );
          // setformkonsul(res.data.result.dokterId === dokterlogin ? false : true);
          // setformjawabkonsul(res.data.result.dokterId === dokterlogin ? true : false);
        } else {
          message.error("Data Konsul Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        // console.log(err);
        message.error("Eror Saat Mengambil Data Konsul!");
        // console.log(id);
      });
  };

  //----Get list data SOAP by Dokter berdasarkan RegistrsaId----//
  const ambillistSOAPRI = (noreg) => {
    axios
      .get(`${apiku}/EmrCatatanMedis/ReadCatatanRIByReg/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListSOAP(
            res.data.result
              .filter((item) => item.NamaProfesi === "Dokter Spesialis")
              .sort((b, a) => a.Jam.localeCompare(b.Jam))
          );
          console.log(res.data.result);
        } else {
          setListSOAP([]);
          console.log("data ksoong");
        }
      })
      .catch((err) => {
        message.error("Terjadi Kesalahan Konksi!");
      });
  };

  //----Get data SOAP by Dokter berdasarkan SOAPID----//
  const ambilSOAPIdRI = (id) => {
    axios
      .get(`${apiku}/EmrCatatanMedis/ReadSOAP/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setsubjective(res.data.result.subjektif);
          setobjective(res.data.result.objektif);
          setassesment(res.data.result.assesment);
          setplanning(res.data.result.planning);
        } else {
          message.warning("Data SOAP Pasien Tidak Dapat Di Pilih!");
          setsubjective(res.data.result.subjektif);
          setobjective(res.data.result.objektif);
          setassesment(res.data.result.assesment);
          setplanning(res.data.result.planning);
        }
      })
      .catch(() => {
        message.error("Eror Saat Mengambil Data SOAP Pasien!");
      });
  };

  //----insert konsultasi rawat inap----//
  const insertKonsulRI = (datakonsulri) => {
    axios
      .post(`${apiku}/EmrKonsultasi/InsertKonsultasiRi`, datakonsulri, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setkonsultasiId(0);
          listKonsultasiRI(datakonsulri.registrasiId);
          cariPasienRuangRI(datakonsulri.ruangId);
          setModalKonsul(false);
          setModalEdit(false);
          setsmftujuan("");
          setdokterTujuanId("");
          setsubjective("");
          setobjective("");
          setassesment("");
          setplanning("");
          Modal.success({
            content: "Berhasil Simpan Data Konsultasi Pasien!",
          });
        } else {
          sendTele(
            "3",
            "/EmrKonsultasi/InsertKonsultasiRi",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(datakonsulri)
          );
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch(() => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          //  content: JSON.stringify(err.data),
        });
      });
  };

  //----jawab konsultasi rawat inap----//
  const jawabKonsulRI = (datajawabkonsulri, ruangid) => {
    axios
      .post(
        `${apiku}/EmrKonsultasi/JawabKonsultasiRi`,
        datajawabkonsulri,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setkonsultasiId(0);
          listKonsultasiRI(datajawabkonsulri.registrasiId);
          cariPasienRuangRI(ruangid);
          setmodalJawab(false);
          Modal.success({
            content: "Berhasil Simpan Data Jawab Konsultasi Pasien!",
          });
        } else {
          sendTele(
            "3",
            "/EmrKonsultasi/InsertKonsultasiRi",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(datajawabkonsulri)
          );
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch(() => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          // content: JSON.stringify(err.data),
        });
      });
  };

  const deleteKonsulRi = (id, noreg, ruang) => {
    axios
      .delete(`${apiku}/EmrKonsultasi/KonsultasiId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!",
            // content: res.data.message,
          });
          listKonsultasiRI(noreg);
          cariPasienRuangRI(ruang);
        } else {
          Modal.warning({
            title: "Gagal Hapus Data!",
            content: JSON.stringify(res.data),
          });
        }
      }, [])
      .catch((err) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(err.data),
        });
      });
  };
  //----mengossongkan kolom inputan----//
  const konsulbaru = () => {
    setkonsultasiId(0);
    // setdokterId(null);
    setsubjective("");
    setobjective("");
    setassesment("");
    setplanning("");
    settanggalJawab(dayjs());
    setsmfjawab("");
    setsubjectJawab("");
    setobjectJawab("");
    setajawab("");
    setpjawab("");
    settanggal(dayjs());
    setsmftujuan("");
    setalihRawat(false);
    setdokterTujuanId("");
    setdokterJawabId("");
    setformkonsul(false);
    setformjawabkonsul(true);
  };

  return (
    <KonsulRIContext.Provider
      value={{
        setkonsultasiId,
        konsultasiId,
        tanggal,
        settanggal,
        dokterId,
        setdokterId,
        smftujuan,
        setsmftujuan,
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
        getkonsulRIid,
        setKonsulRIid,
        getkosulid,
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
        deleteKonsulRi,
        modalkonsul,
        setModalKonsul,
        openmodal,
        setOpenModal,
        modalJawab,
        setmodalJawab,
        modalEdit,
        setModalEdit,
      }}
    >
      {props.children}
    </KonsulRIContext.Provider>
  );
};

export default KonsulRIContextProvider;
