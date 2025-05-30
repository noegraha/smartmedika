import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const MasterIGDContext = createContext();

const MasterIGDContextProvider = (props) => {
  const [masterKeluhan, setMasterKeluhan] = useState([]);
  const [masterKarakteristik, setMasterKarateristik] = useState([]);
  const [masterTriase, setMasterTriase] = useState([]);
  const [masterPrioritas, setMasterPrioritas] = useState([]);

  // state koneksi
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getMstKeluhan = () => {
    axios
      .get(`${apiku}/MstKeluhan/Lookup/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setMasterKeluhan(res.data.result);
          console.log(res.data.result);
        } else {
          setMasterKeluhan([]);
        }
      })
      .catch((err) => {
        setMasterKeluhan([]);
        console.log(err);
        message.error("Gagal Ambil!");
      })
      .finally(() => {});
  };

  const getKarakteristikKeluhan = (id) => {
    axios
      .get(`${apiku}/MstKeluhan/ReadKarakteristikByKeluhanId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setMasterKarateristik(res.data.result);
        } else {
          setMasterKarateristik([]);
        }
      })
      .catch((err) => {
        setMasterKarateristik([]);
        console.log(err);
        message.error("Gagal Ambil!");
      })
      .finally(() => {});
  };

  const getMstTriase = () => {
    axios
      .get(`${apiku}/MstIGD/MstTriase`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setMasterTriase(res.data.result);
        } else {
          setMasterTriase([]);
        }
      })
      .catch((err) => {
        setMasterTriase([]);
        console.log(err);
        message.error("Gagal Ambil!");
      })
      .finally(() => {});
  };

  const getMstPrioritas = () => {
    axios
      .get(`${apiku}/MstIGD/MstPrioritas`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setMasterPrioritas(res.data.result);
        } else {
          setMasterPrioritas([]);
        }
      })
      .catch((err) => {
        setMasterPrioritas([]);
        console.log(err);
        message.error("Gagal Ambil!");
      })
      .finally(() => {});
  };

  return (
    <MasterIGDContext.Provider
      value={{
        masterKeluhan,
        getMstKeluhan,
        getKarakteristikKeluhan,
        masterKarakteristik,
        getMstPrioritas,
        getMstTriase,
        masterTriase,
        masterPrioritas,
      }}
    >
      {props.children}
    </MasterIGDContext.Provider>
  );
};

export default MasterIGDContextProvider;
