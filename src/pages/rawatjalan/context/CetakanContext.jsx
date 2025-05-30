import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const CetakanContext = createContext();

const CetakanContextProvider = (props) => {
  const [rm02, setRM02] = useState([]);
  const [rm02TTVterakhir, setRM02TTVterakhir] = useState([]);
  const [listprosedur, setListProsedur] = useState([]);
  const [prmrj, setPRMRJ] = useState([]);
  const [prmrjprosedure, setPRMRJProsedur] = useState([]);
  const [prmrjkunjungan, setPRMRJKunjungan] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getRM02 = (id) => {
    axios
      .get(`${apiku}/Reporting/Lookup/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setRM02(res.data.result);
          setRM02TTVterakhir(res.data.result.registrasiList[0].tandaVital);
        } else {
          // console.log(res.data);
          setRM02([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setRM02([]);
        message.error("Gagal Mengambil Data!");
        console.log(err);
      });
  };

  const getListProsedur = (pasienId) => {
    axios
      .get(`${apiku}/EmrProsedur/ReadByPasienId/${pasienId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setListProsedur(res.data.result);
        } else {
          message.warning(res.data.message);
          setListProsedur([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setListProsedur([]);
      });
  };

  const insertPRMRJ = (data) => {
    axios
      .post(`${apiku}/EmrPMRRJ/PMRRJ`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal menyimpan!");
        console.log(err);
      });
  };

  const getPRMRJ = (pasienId) => {
    axios
      .get(`${apiku}/EmrPMRRJ/Read/${pasienId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setPRMRJ(res.data.result);
          setPRMRJProsedur(res.data.result.listProsedur);
          setPRMRJKunjungan(res.data.result.listKunjungan);
        } else {
          message.warning(res.data.message);
          setPRMRJ([]);
          setPRMRJProsedur([]);
          setPRMRJKunjungan([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setPRMRJ([]);
        setPRMRJProsedur([]);
        setPRMRJKunjungan([]);
      });
  };
  return (
    <CetakanContext.Provider
      value={{
        getRM02,
        getListProsedur,
        rm02,
        rm02TTVterakhir,
        listprosedur,
        insertPRMRJ,
        prmrj,
        setPRMRJ,
        prmrjkunjungan,
        setPRMRJKunjungan,
        prmrjprosedure,
        setPRMRJProsedur,
        getPRMRJ,
      }}
    >
      {props.children}
    </CetakanContext.Provider>
  );
};

export default CetakanContextProvider;
