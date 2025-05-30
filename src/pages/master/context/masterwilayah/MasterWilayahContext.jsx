import React, { createContext, useState } from "react";
// import { message } from 'antd';
import axios from "axios";
import { message } from "antd";

export const MasterWilayahContext = createContext();

const MasterWilayahContextProvider = (props) => {
  const [provinsiList, setProvinsiList] = useState([]);
  const [kabupatenList, setKabupatenList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [desaList, setDesaList] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  //Provinsi Context
  const getProvinsi = () => {
    axios
      .get(`${apiku}/MstProvinsi/Lookup/%20/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setProvinsiList(res.data.result);
        } else {
          setProvinsiList([]);
        }
      })
      .catch((err) => {
        setProvinsiList([]);
        console.log(err);
      });
  };

  //Kabupaten Context
  const getKabupaten = () => {
    axios
      .get(`${apiku}/MstKabupaten/Lookup/%20/1/600`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKabupatenList(res.data.result);
        } else {
          setKabupatenList([]);
        }
      })
      .catch((err) => {
        setKabupatenList([]);
        console.log(err);
      });
  };

  //Kecamatan Context
  const getKecamatan = () => {
    axios
      .get(`${apiku}/MstKecamatan/Lookup/%20/1/500`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKecamatanList(res.data.result);
        } else {
          setKecamatanList([]);
        }
      })
      .catch((err) => {
        setKecamatanList([]);
        console.log(err);
      });
  };

  //Desa Context
  const getDesa = (nama) => {
    axios
      .get(`${apiku}/MstDesa/Lookup/${nama}/1/500`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDesaList(res.data.result);
        } else {
          setDesaList([]);
        }
      })
      .catch((err) => {
        setDesaList([]);
        console.log(err);
      });
  };
  const insertDesa = (datadesa) => {
    axios
      .post(`${apiku}/MstDesa`, datadesa, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
          getDesa(" ");
        } else {
          message.warning(res.data.message);
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        setDesaList([]);
        console.log(err);
      });
  };

  const insertProvinsi = (dataProvinsi) => {
    axios
      .post(`${apiku}/MstProvinsi`, dataProvinsi, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
          getProvinsi();
          console.log(dataProvinsi);
        } else {
          message.warning(res.data.message);
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        // setDesaList([]);
        console.log(err);
      });
  };

  const deleteDesa = (iddesa) => {
    axios
      .delete(`${apiku}/MstDesa/${iddesa}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Dihapus!");
          getDesa(" ");
        } else {
          message.warning(res.data.message);
          console.log(res.data);
        }
      })
      .catch((err) => {
        setDesaList([]);
        console.log(err);
        message.error("Gagal Dihapus!");
      });
  };

  return (
    <MasterWilayahContext.Provider
      value={{
        getProvinsi,
        provinsiList,
        getKabupaten,
        kabupatenList,
        getKecamatan,
        kecamatanList,
        getDesa,
        insertDesa,
        deleteDesa,
        desaList,
        insertProvinsi,
      }}
    >
      {props.children}
    </MasterWilayahContext.Provider>
  );
};

export default MasterWilayahContextProvider;
