import React, { createContext, useState } from "react";
import { message } from "antd";
import axios from "axios";

export const MasterSubKategoriContext = createContext();

const MasterSubKategoriContextProvider = (props) => {
  const [masterSubkategori, setMasterSubkategori] = useState([]);
  const [subKategoriId, setsubKategoriId] = useState([]);
  const [deskripsi, setDeskripsi] = useState([]);
  const [kategori, setKategori] = useState([]);

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailMasterSubkategori = () => {
    axios
      .get(`${apiku}/Askep/SubKategori/Lookup`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setMasterSubkategori(res.data.result);
          console.log("tes", res.data.result);
        } else {
          // setMasterSubkategori([]);
          console.log("cek", res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const insertMasterSubkategoriaskep = (newdata) => {
    axios
      .post(`${apiku}/Askep/SubKategori`, newdata)
      .then((res) => {
        detailMasterSubkategori();
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };
  const deleteMasterSubkategoriaskep = (idsubkategori) => {
    axios
      .delete(`${apiku}/Askep/SubKategori/${idsubkategori}`, options)
      .then((res) => {
        //console.log(res);
        detailMasterSubkategori();

        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
      });
  };
  const detailsubKategoriId = (id) => {
    axios.get(`${apiku}/Askep/SubKategori/ID/${id}`, options).then((res) => {
      if (res.data.statusCode === 200) {
        //setMasterKategori(res.data.result);
        setsubKategoriId(res.data.result.subKategoriId);
        setDeskripsi(res.data.result.deskripsi);
        setKategori(res.data.result.kategoriId);
      } else {
        //setMasterKategori([]);
        setsubKategoriId([]);
        setDeskripsi([]);
        setKategori([]);
      }
    });
  };
  return (
    <MasterSubKategoriContext.Provider
      value={{
        masterSubkategori,
        setMasterSubkategori,
        detailMasterSubkategori,
        insertMasterSubkategoriaskep,
        deleteMasterSubkategoriaskep,
        subKategoriId,
        setsubKategoriId,
        deskripsi,
        setDeskripsi,
        kategori,
        setKategori,
        detailsubKategoriId,
      }}
    >
      {props.children}
    </MasterSubKategoriContext.Provider>
  );
};

export default MasterSubKategoriContextProvider;
