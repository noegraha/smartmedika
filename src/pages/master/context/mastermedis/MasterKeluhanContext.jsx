import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const MasterKeluhanContext = createContext();

const MasterKeluhanContextProvider = (props) => {
  const [listKeluhanAll, setListKeluahanAll] = useState([]);
  const [listKarakteristikByKeluahan, setListKarakteristikByKeluahan] =
    useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  useEffect(() => {
    const token = sessionStorage.getItem("userData");

    const options = {
      headers: { Authorization: "Bearer " + token },
    };
    axios.get(`${apiku}/MstKeluhan/Lookup/%20`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setListKeluahanAll(res.data.result);
        // console.log(res.data.result);
      } else {
        setListKeluahanAll([]);
        // console.log('data keluhan tidak muncul')
      }
    });
  }, [apiku]);
  const getKeluhanAll = () => {
    axios.get(`${apiku}/MstKeluhan/Lookup/%20`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setListKeluahanAll(res.data.result);
        // console.log(res.data.result);
      } else {
        setListKeluahanAll([]);
        console.log("data keluhan tidak muncul");
      }
    });
  };

  const getKarakteristikByKeluhanId = (KeluhanId) => {
    axios
      .get(
        `${apiku}/MstKeluhan/ReadKarakteristikByKeluhanId/${KeluhanId}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListKarakteristikByKeluahan(res.data.result);
        } else {
          setListKarakteristikByKeluahan([]);
        }
      });
  };
  // const insertMasterkategoriaskep = (newdata) => {
  //     axios.post(`${apiku}/Askep/Kategori`, newdata)
  //         .then(res => {
  //             detailMasterkategoriaskep();
  //             message.success('Berhasil Disimpan!')
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //             message.error('Gagal Disimpan!')
  //         });
  // }
  // const deleteMasterkategoriaskep = (idkategori) => {
  //     axios.delete(`${apiku}/Askep/Kategori/${idkategori}`, options)
  //         .then((res) => {
  //             //console.log(res);
  //             detailMasterkategoriaskep();
  //             message.success('Berhasil Dihapus!')
  //         })
  //         .catch((err) => {
  //             //console.log(err);
  //         });
  // }
  // const detailKategoriId = (id) => {
  //     axios.get(`${apiku}/Askep/Kategori/ID/${id}`, options)
  //         .then(res => {
  //             if (res.data.statusCode === 200) {
  //                 //setMasterKategori(res.data.result);
  //                 setkategoriId(res.data.result.kategoriId);
  //                 setdeskripsi(res.data.result.deskripsi);
  //                 console.log(res.data.kategoriId);
  //             } else {
  //                 //setMasterKategori([]);
  //                 setkategoriId([]);
  //                 setdeskripsi([]);
  //             }
  //         })
  // }

  return (
    <MasterKeluhanContext.Provider
      value={{
        getKeluhanAll,
        getKarakteristikByKeluhanId,
        listKeluhanAll,
        setListKeluahanAll,
        listKarakteristikByKeluahan,
        setListKarakteristikByKeluahan,
      }}
    >
      {props.children}
    </MasterKeluhanContext.Provider>
  );
};

export default MasterKeluhanContextProvider;
