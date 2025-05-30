import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { message } from "antd";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { ChatContext } from "../../chat/Chatcontext";

export const HasilLabContext = createContext();

const HasilLabContextProvider = (props) => {
  const { getPrintHasilOp, getPrintLabPk } = useContext(PrintOutContext);
  const [hasillabpk, setHasilLabPK] = useState([]);
  const token = sessionStorage.getItem("userData");
  const [listLabByPasienId, setlistLabByPasienId] = useState([]);
  const [modal1VisibleLab, setModal1VisibleLab] = useState(false);
  const [listOpByPasienId, setlistOpByPasienId] = useState([]);
  const [modal1VisibleOp, setModal1VisibleOp] = useState(false);
  const [listOpinNoreg, setlistOpinNoreg] = useState([]);
  const [listPkbyNoreg, setlistlistPkbyNoreg] = useState([]);
  const { loading, setLoading } = useContext(ChatContext);
  const [modalLabPA, setmodalLabPA] = useState(false);
  const [listLabPAByPasienId, setListLabPAByPasienId] = useState([]);

  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getListLAbPAByPasienId = (id) => {
    axios
      .get(`${apiku}/EmrLaboratPA/Lookup/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListLabPAByPasienId(
            res.data.result.sort((b, a) =>
              a.registrasiId.localeCompare(b.registrasiId)
            )
          );
          console.log(res.data.result);
          // getPrintHasilOp(id, (res.data.result.sort((b, a) => a.registrasiId.localeCompare(b.registrasiId))[0].listLink[0].laporanOperasiId));
          setmodalLabPA(true);
          setLoading(false);
        } else {
          setListLabPAByPasienId([]);
          setLoading(false);
          message.warning("Pasien Belum Pernah Melakukan Pemeriksaan Lab PA!");
        }
      }, [])
      .catch((err) => {
        setLoading(false);
        setListLabPAByPasienId([]);
        message.error("Error Mengambil Data LAB PA!");
      });
  };

  const getListOpByPasienId = (id) => {
    axios
      .get(`${apiku}/EmrLaporanOperasi/LookUpByPasienId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistOpByPasienId(
            res.data.result.sort((b, a) =>
              a.registrasiId.localeCompare(b.registrasiId)
            )
          );
          // getPrintHasilOp('02150729', '2107OP7817');
          getPrintHasilOp(
            id,
            res.data.result.sort((b, a) =>
              a.registrasiId.localeCompare(b.registrasiId)
            )[0].listLink[0].laporanOperasiId
          );
          setModal1VisibleOp(true);
          setLoading(false);
        } else {
          setlistOpByPasienId([]);
          setLoading(false);
          message.warning("Pasien Belum Pernah Melakukan Operasi!");
        }
      }, [])
      .catch((err) => {
        setLoading(false);
        message.error("Error Mengambil Data Operasi!");
      });
  };

  const getListOpByPasienIdnNOreg = (noreg) => {
    axios
      .get(`${apiku}/EmrLaporanOperasi/LookUpByRegistrasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistOpinNoreg(res.data.result);
          // getPrintHasilOp(res.data.result.pasienId, res.data.result.listLink[0].laporanOperasiId);
          // console.log(res.data.result);
          // console.log(res.data.result[(res.data.result.map(c => (
          //   (c.registrasiId)
          // ))).indexOf(noreg)]);
          // console.log(id, res.data.result[(res.data.result.map(c => (
          //   (c.registrasiId)
          // ))).indexOf(noreg)].nolaporan[0]);
        } else {
          setlistOpinNoreg([]);
          // message.warning("Pasien Belum Pernah Melakukan Operasi!");
        }
      }, [])
      .catch((err) => {
        message.error("Error Mengambil Data Operasi!");
      });
  };

  const listHasilLabPK = (id) => {
    axios
      .get(`${apiku}/EmrLaboratPK/Lookup/GetByPasienId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHasilLabPK(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("data laborat kosong");
          setHasilLabPK([]);
        }
      }, [])
      .catch((err) => {
        console.log("data laborat kosong");
      });
  };

  const listHasilLabPKbyNoreg = (id) => {
    axios
      .get(`${apiku}/EmrLaboratPK/Lookup/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result[(res.data.result.map(c => (
          //   (c.registrasiId)
          // ))).indexOf(noreg)]);
        } else {
          // setlistLabByPasienId([]);
          message.warning("Data Laborat Tidak Ditemukan!");
        }
      }, [])
      .catch((err) => {
        message.error("Error Mengambil Data Laborat!");
        console.log("data laborat kosong");
      });
  };

  const getListLabByPasieNiD = (id) => {
    axios
      .get(`${apiku}/EmrLaboratPK/Lookup/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistLabByPasienId(
            res.data.result.sort((b, a) =>
              a.registrasiId.localeCompare(b.registrasiId)
            )
          );
          // getPrintLabPk(id, res.data.result.sort((b, a) => a.registrasiId.localeCompare(b.registrasiId))[0].listNoLab[res.data.result.sort((b, a) => a.registrasiId.localeCompare(b.registrasiId))[0].listNoLab - 1]);
          console.log("data hasil lab");
          setLoading(false);
          setModal1VisibleLab(true);
        } else {
          setlistLabByPasienId([]);
          setLoading(false);
          message.warning("Data Laborat Tidak Ditemukan!");
        }
      }, [])
      .catch((err) => {
        setLoading(false);
        message.error("Error Mengambil Data Laborat!");
        console.log("data laborat kosong");
      });
  };

  const getListLabByNOreg = (id, noreg) => {
    console.log(id, noreg);
    axios
      .get(`${apiku}/EmrLaboratPK/Lookup/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          res.data.result.map((c) => c.registrasiId).indexOf(noreg) >= 0
            ? setlistlistPkbyNoreg([
                res.data.result[
                  res.data.result.map((c) => c.registrasiId).indexOf(noreg)
                ],
              ])
            : setlistlistPkbyNoreg([]);
          console.log("data hasil lab");
        } else {
          setlistlistPkbyNoreg([]);
          message.warning("Data Laborat Tidak Ditemukan!");
        }
      }, [])
      .catch((err) => {
        setlistlistPkbyNoreg([]);
        message.error("Error Mengambil Data Laborat!");
        console.log("data laborat kosong");
      });
  };

  const detailHasilLabPK = (noreg) => {
    axios
      .get(`${apiku}/EmrLaboratPK/GetByRegistrasiId/${noreg}`, options)
      .then((res) => {
        setHasilLabPK(res.data.result);
      }, [])
      .catch((err) => {
        console.log("data laborat kosong");
      });
  };
  return (
    <HasilLabContext.Provider
      value={{
        hasillabpk,
        listHasilLabPK,
        detailHasilLabPK,
        getListLabByPasieNiD,
        listLabByPasienId,
        setlistLabByPasienId,
        modal1VisibleLab,
        setModal1VisibleLab,
        listOpByPasienId,
        setlistOpByPasienId,
        modal1VisibleOp,
        setModal1VisibleOp,
        getListOpByPasienId,
        getListOpByPasienIdnNOreg,
        listOpinNoreg,
        listHasilLabPKbyNoreg,
        getListLabByNOreg,
        listPkbyNoreg,
        setlistlistPkbyNoreg,
        modalLabPA,
        setmodalLabPA,
        listLabPAByPasienId,
        setListLabPAByPasienId,
        getListLAbPAByPasienId,
      }}
    >
      {props.children}
    </HasilLabContext.Provider>
  );
};

export default HasilLabContextProvider;
