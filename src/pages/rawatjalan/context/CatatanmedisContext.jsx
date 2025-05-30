import React, { createContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";
export const CatatanmedisContext = createContext();

const CatatanmedisContextProvider = (props) => {
  const [catatanmedisIdRj, setcatatanmedisIdRj] = useState(0);
  const [catatanmedis, setCatatanmedis] = useState([]);
  const [catatanmedisdouble, setCatatanMedisDouble] = useState([]);
  const [listcatatanmedis, setListCatatanMedis] = useState([]);
  const [hubungan, setHubungan] = useState([]);
  const [subjektif, setSubjektif] = useState("-");
  const [allo, setAlloAnamnesa] = useState("-");
  const [objektif, setObjektif] = useState("-");
  const [assesment, setAssesment] = useState("-");
  const [planning, setPlanning] = useState("-");
  const [nama, setNama] = useState(null);
  const [hubungankel, setHubunganKel] = useState("-");
  const [instruksi, setinstruksi] = useState("-");
  const [evaluasi, setevaluasi] = useState("-");
  const [implementasi, setimplementasi] = useState([]);
  const [verified, setVerified] = useState(false);
  const [verifiedTime, setVerifiedTime] = useState(null);
  const [tandatangan, setTandaTangan] = useState(false);

  const [modal, setModal] = useState(false);
  const [loadingCatatanMedis, setLoadingCatatanMedis] = useState(false);
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");

  const [modalopen, setModalOpen] = useState(false);
  const [modalopen1, setModalOpen1] = useState(false);

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getMstHubungan = () => {
    axios
      .get(`${apiku}/MstHubungan/Lookup/ /1/11`, options)
      .then((res) => {
        setHubungan(res.data.result);
      })
      .catch((err) => {
        setHubungan([]);
        console.log(err);
      });
  };

  const detailCatatanmedis = (id) => {
    setLoadingCatatanMedis(true);
    axios
      .get(`${apiku}/EmrCatatanMedis/read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setcatatanmedisIdRj(res.data.result.catatanMedis);
          setSubjektif(res.data.result.subjektif);
          setAlloAnamnesa(res.data.result.alloAnamnesa);
          setObjektif(res.data.result.objektif);
          setAssesment(res.data.result.assesment);
          setPlanning(res.data.result.planning);
          setNama(res.data.result.nama);
          setHubunganKel(res.data.result.hubunganId);
          setVerified(res.data.result.verified);
          setTandaTangan(res.data.result.ttdPelaksana);
          setVerifiedTime(res.data.result.verifiedTime);
          setLoadingCatatanMedis(false);
        } else {
          setcatatanmedisIdRj(0);
          setSubjektif(null);
          setAlloAnamnesa(null);
          setObjektif(null);
          setAssesment(null);
          setPlanning(null);
          setNama(null);
          setHubunganKel("-");
          setVerified(false);
          setVerifiedTime(null);
          setTandaTangan(null);
          setLoadingCatatanMedis(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setcatatanmedisIdRj(0);
        setSubjektif(null);
        setAlloAnamnesa(null);
        setObjektif(null);
        setAssesment(null);
        setPlanning(null);
        setNama(null);
        setHubunganKel("-");
        setVerified(false);
        setVerifiedTime(null);
        setTandaTangan(null);
        setLoadingCatatanMedis(false);
      });
  };

  const insertCatatanMedisRI = (datacatatanmedis) => {
    axios
      .post(`${apiku}/EmrCatatanMedis`, datacatatanmedis, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setCatatanmedis([...catatanmedis, res.data.result]);
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
        } else {
          console.log(res.data);
          message.error("Gagal Disimpan!");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const insertCatatanMedis = (datacatatanmedis) => {
    axios
      .post(`${apiku}/EmrCatatanMedis`, datacatatanmedis, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          detailCatatanmedis(res.data.result.registrasiId);
          message.success("Berhasil Disimpan!");
          setLoadingCatatanMedis(false);
        } else {
          Modal.warning({
            title: "Data Gagal Disimpan !",
            content: res.data.message,
          });
          setLoadingCatatanMedis(false);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Error, Gagal Disimpan!");
        setLoadingCatatanMedis(false);
      });
  };

  const cekCatatanMedis = () => {
    axios
      .get(`${apiku}/EmrCatatanMedis/LookupCekCatatanMedisDouble`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setCatatanMedisDouble(res.data.result);
          message.warning(res.data.message);
        } else {
          setCatatanMedisDouble([]);
          message.success(res.data.message);
          console.log(res);
        }
      })
      .catch((err) => {
        setCatatanMedisDouble([]);
        console.log(err);
      });
  };

  const getCatatanMedis = (noreg) => {
    axios
      .get(`${apiku}/EmrCatatanMedis/ReadCatatanByReg/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListCatatanMedis(res.data.result);
          console.log(res.data.result);
        } else {
          setListCatatanMedis([]);
          message.warning(res.data.message);
          console.log(res);
        }
      })
      .catch((err) => {
        setListCatatanMedis([]);
        console.log(err);
      });
  };

  const deleteCatatanMedis = (noreg) => {
    axios
      .delete(`${apiku}/EmrCatatanMedis/${noreg}`, options)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteCatatanMedisbyId = (noreg, id) => {
    axios
      .delete(`${apiku}/EmrCatatanMedis/HapusIdDouble/${noreg}/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.message);
          setModal(false);
          cekCatatanMedis();
        } else {
          Modal.warning({ content: res.data.message });
          console.log(res);
        }
      })
      .catch((err) => {
        Modal.error({ content: err });
        console.log(err);
      });
  };

  const Kosongkanformcatatanmedis = () => {
    setSubjektif("");
    setObjektif("");
    setAssesment("");
    setPlanning("");
    setinstruksi("");
    setevaluasi("");
    setimplementasi("");
  };

  return (
    <CatatanmedisContext.Provider
      value={{
        catatanmedis,
        hubungan,
        subjektif,
        allo,
        objektif,
        assesment,
        planning,
        nama,
        hubungankel,
        verified,
        tandatangan,
        setSubjektif,
        setObjektif,
        setAssesment,
        setAlloAnamnesa,
        setNama,
        setHubunganKel,
        setPlanning,
        setVerified,
        setTandaTangan,
        detailCatatanmedis,
        insertCatatanMedis,
        deleteCatatanMedis,
        insertCatatanMedisRI,
        instruksi,
        setinstruksi,
        evaluasi,
        setevaluasi,
        implementasi,
        setimplementasi,
        Kosongkanformcatatanmedis,
        verifiedTime,
        setVerifiedTime,
        catatanmedisIdRj,
        setcatatanmedisIdRj,
        loadingCatatanMedis,
        setLoadingCatatanMedis,
        cekCatatanMedis,
        catatanmedisdouble,
        getCatatanMedis,
        listcatatanmedis,
        deleteCatatanMedisbyId,
        modal,
        setModal,
        modalopen,
        setModalOpen,
        modalopen1,
        setModalOpen1,
        getMstHubungan,
      }}
    >
      {props.children}
    </CatatanmedisContext.Provider>
  );
};

export default CatatanmedisContextProvider;
