import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const MasterKategoriAskepContext = createContext();

const MasterKategoriAskepContextProvider = (props) => {
  const [masterKategori, setMasterKategori] = useState([]);
  const [kategoriId, setkategoriId] = useState([]);
  const [deskripsi, setdeskripsi] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailMasterkategoriaskep = () => {
    axios.get(`${apiku}/Askep/Kategori/Lookup`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setMasterKategori(res.data.result);
      } else {
        setMasterKategori();
      }
    });
  };
  const insertMasterkategoriaskep = (newdata) => {
    axios
      .post(`${apiku}/Askep/Kategori`, newdata)
      .then((res) => {
        detailMasterkategoriaskep();
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };
  const deleteMasterkategoriaskep = (idkategori) => {
    axios
      .delete(`${apiku}/Askep/Kategori/${idkategori}`, options)
      .then((res) => {
        //console.log(res);
        detailMasterkategoriaskep();
        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const detailKategoriId = (id) => {
    axios.get(`${apiku}/Askep/Kategori/ID/${id}`, options).then((res) => {
      if (res.data.statusCode === 200) {
        //setMasterKategori(res.data.result);
        setkategoriId(res.data.result.kategoriId);
        setdeskripsi(res.data.result.deskripsi);
        console.log(res.data.kategoriId);
      } else {
        //setMasterKategori([]);
        setkategoriId([]);
        setdeskripsi([]);
      }
    });
  };

  return (
    <MasterKategoriAskepContext.Provider
      value={{
        masterKategori,
        setMasterKategori,
        detailMasterkategoriaskep,
        deleteMasterkategoriaskep,
        insertMasterkategoriaskep,
        detailKategoriId,
        deskripsi,
        setdeskripsi,
        kategoriId,
        setkategoriId,
      }}
    >
      {props.children}
    </MasterKategoriAskepContext.Provider>
  );
};

export default MasterKategoriAskepContextProvider;
