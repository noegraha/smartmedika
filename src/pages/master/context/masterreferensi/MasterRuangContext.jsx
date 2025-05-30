import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const MasterRuangContext = createContext();

const MasterRuangContextProvider = (props) => {
  const [ruangList, setRuangList] = useState([]);
  const [kelasrawatlist, setKelasRawatList] = useState([]);

  const [ruangId, setRuangId] = useState(null);
  const [deskripsi, setDeskripsi] = useState(null);
  const [groupLayananId, setGroupLayananId] = useState(null);
  const [kelasRawatId, setKelasRawatId] = useState(null);
  const [statusRuang, setStatusRuang] = useState(null);
  const [tabKunci, setTabKunci] = useState(null);
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(1);

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  //Ruang Context
  const getRuang = (e) => {
    axios
      .get(`${apiku}/MstRuang/LookupMaster/%20/${e}/1/200`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuangList(res.data.result);
          console.log("ruang", res.data.result);
          setLoading(false);
        } else {
          setRuangList([]);
        }
      })
      .catch((err) => {
        setRuangList([]);
        console.log(err);
      });
  };

  if (loading === true) {
    axios
      .get(`${apiku}/MstRuang/LookupMaster/%20/${refresh}/1/200`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuangList(res.data.result);
          console.log("ruang", res.data.result);
          setLoading(false);
        } else {
          setRuangList([]);
        }
      })
      .catch((err) => {
        setRuangList([]);
        console.log(err);
      });
  }

  const insertRuang = (dataruang) => {
    axios
      .post(`${apiku}/MstRuang`, dataruang, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil!");
          setTabKunci(res.data.result.groupLayananId);
        } else {
          console.log(res.data.result);
          message.warn("Cek Lagi", res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal!");
      });
  };

  const getKelasRawat = () => {
    axios
      .get(`${apiku}/MstKelasRawat/Lookup/%20/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKelasRawatList(res.data.result);
          console.log("kelas Rawat", res.data.result);
        } else {
          setKelasRawatList([]);
        }
      })
      .catch((err) => {
        setKelasRawatList([]);
        console.log(err);
      });
  };

  const getRuangById = (e) => {
    axios
      .get(`${apiku}/MstRuang/KlinikId/${e}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("Id Kelas Rawat", res.data.result);
          setRuangId(res.data.result.ruangId);
          setDeskripsi(res.data.result.deskripsi);
          setGroupLayananId(res.data.result.groupLayananId);
          setKelasRawatId(res.data.result.kelasRawatId);
          setStatusRuang(res.data.result.status);
        } else {
          setRuangId([]);
          setDeskripsi([]);
          setGroupLayananId([]);
          setKelasRawatId([]);
          setStatusRuang([]);
        }
      })
      .catch((err) => {
        setRuangId([]);
        setDeskripsi([]);
        setGroupLayananId([]);
        setKelasRawatId([]);
        setStatusRuang([]);
        console.log(err);
      });
  };

  const deleteRuang = (e) => {
    const promise = new Promise((resolve, reject) => {
      axios.delete(`${apiku}/MstRuang/NonAtifkan/${e}`, options).then(
        (result) => {
          resolve(result.data);
          if (result.data.statusCode === 200) {
            console.log("ruang deleted", result.data.result);
            message.error("Berhasil Dinonaktivkan!");
          } else {
            message.error("Error");
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
    return promise;
  };

  return (
    <MasterRuangContext.Provider
      value={{
        insertRuang,
        getRuang,
        getRuangById,
        getKelasRawat,
        deleteRuang,
        ruangList,
        kelasrawatlist,
        setRuangId,
        ruangId,
        setDeskripsi,
        deskripsi,
        setGroupLayananId,
        groupLayananId,
        setKelasRawatId,
        kelasRawatId,
        loading,
        setLoading,
        refresh,
        setRefresh,
        statusRuang,
        setStatusRuang,
        tabKunci,
        setTabKunci,
      }}
    >
      {props.children}
    </MasterRuangContext.Provider>
  );
};

export default MasterRuangContextProvider;
