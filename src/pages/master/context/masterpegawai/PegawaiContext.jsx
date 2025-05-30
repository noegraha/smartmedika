import React, { createContext, useState } from "react";
import axios from "axios";

export const PegawaiContext = createContext();

const PegawaiContextProvider = (props) => {
  const [listkategoripelaksana, setListKategoriPelaksana] = useState([]);
  const [listtenagakesehatan, setListTenagaKesehatan] = useState([]);
  const [listdesa, setListDesa] = useState([]);
  const [byiddesa, setByDesaid] = useState([]);
  const [namakecamatan, setKecamatanNama] = useState([]);
  const [namakabupaten, setKabupatenNama] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getListKategoriPelaksana = () => {
    axios
      .get(`${apiku}/MstPegawai/Lookup/KategoriPelaksana`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListKategoriPelaksana(res.data.result);
        } else {
          setListKategoriPelaksana([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListKategoriPelaksana([]);
      });
  };

  const getListTenagaKesehatan = () => {
    axios
      .get(`${apiku}/MstJenisTenagaKesehatan/Lookup/%20/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListTenagaKesehatan(res.data.result);
        } else {
          setListTenagaKesehatan([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListTenagaKesehatan([]);
      });
  };

  const getListDesa = (Desa) => {
    axios
      .get(`${apiku}/MstDesa/Lookup/${Desa}/1/8`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListDesa(res.data.result);
        } else {
          setListDesa([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListDesa([]);
      });
  };

  const getByDesaid = (e) => {
    axios
      .get(`${apiku}/MstDesa/ID/${e !== null ? e : "-"}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("DESAID", res.data.result);
          setByDesaid(res.data.result);
          setKecamatanNama(res.data.result.kecamatan.kecamatanNama);
          setKabupatenNama(res.data.result.kecamatan.kabupaten.kabupatenNama);
        } else {
          setByDesaid([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setByDesaid([]);
      });
  };

  return (
    <PegawaiContext.Provider
      value={{
        getListKategoriPelaksana,
        listkategoripelaksana,
        getListTenagaKesehatan,
        listtenagakesehatan,
        getListDesa,
        listdesa,
        getByDesaid,
        byiddesa,
        namakecamatan,
        namakabupaten,
      }}
    >
      {props.children}
    </PegawaiContext.Provider>
  );
};

export default PegawaiContextProvider;
