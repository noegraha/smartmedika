/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { Modal, message } from "antd";
import { LoginContext } from "../../rawatjalan/context";

export const MasterKelompokPenunjangContext = createContext();

const endpoint = "http://182.168.6.72:5577";

const MasterKelompokPenunjangContextProvider = (props) => {
  const { token } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  // state
  const [deskKelompok, setdeskKelompok] = useState("");
  const [kelPenunjang, setkelPenunjang] = useState([]);
  const [kelPenunjangId, setkelPenunjangId] = useState("");
  const [deskPenunjangId, setdeskPenunjangId] = useState("");
  // loading
  const [spinTbKelPenunjang, setspinTbKelPenunjang] = useState(false);
  // modal
  const [mdTambahKelompok, setmdTambahKelompok] = useState(false);
  const [mdUbahKelompok, setmdUbahKelompok] = useState("");

  useEffect(() => {
    getKelompokPenunjang();
  }, []);

  const getKelompokPenunjang = async () => {
    setspinTbKelPenunjang(true);
    const response = await axios.get(
      `${endpoint}/MstKelompokPenunjang/%20`,
      options
    );
    if (response.data.statusCode === 200) {
      setspinTbKelPenunjang(false);
      setkelPenunjang(response.data.result);
      message.success("Load Kelompok Penunjang Berhasil.");
      if (response.data.result.length === 0) {
        message.warning("Data Kelompok Penunjang Tidak Ditemukan");
      }
    } else {
      message.error("Error Load UKelompok Penunjang!");
    }
  };

  const insertKelompok = (data) => {
    axios
      .post(`${endpoint}/MstKelompokPenunjang/insert`, data, {
        headers: options.headers,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) {
          setmdTambahKelompok(false);
          Modal.success({
            title: "Sukses",
            content: `Berhasil menambah dengan kode : ${res.data.result.KelompokId}, deskripsi : ${res.data.result.Deskripsi}.`,
            onOk: () => {
              getKelompokPenunjang();
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal menambah Nama Kelompok! -> ${res.data.message}.`,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR!",
          content: `Gagal menambah! -> ${err}`,
        });
      });
  };

  const updateKelompok = (data) => {
    axios
      .post(`${endpoint}/MstKelompokPenunjang/update`, data, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setmdUbahKelompok(false);
          Modal.success({
            title: "Sukses",
            content: `Berhasil ubah dengan kode : ${res.data.result.KelompokId}, deskripsi : ${res.data.result.Deskripsi}.`,
            onOk: () => {
              getKelompokPenunjang();
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal ubah Nama Kelompok! -> ${res.data.message}.`,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR!",
          content: `Gagal ubah! -> ${err}`,
        });
      });
  };

  const HapusKelompok = (kelompokId) => {
    let url = `${endpoint}/MstKelompokPenunjang/${kelompokId}`;
    axios
      .delete(url, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Sukses",
            content: `Berhasil dihapus.`,
            onOk: () => {
              setkelPenunjangId("");
              getKelompokPenunjang();
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal hapus Nama Kelompok! -> ${res.data.message}.`,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR!",
          content: `Gagal hapus! -> ${err}`,
        });
      });
  };

  return (
    <MasterKelompokPenunjangContext.Provider
      value={{
        // state
        deskKelompok,
        setdeskKelompok,
        kelPenunjang,
        kelPenunjangId,
        setkelPenunjangId,
        deskPenunjangId,
        setdeskPenunjangId,
        // loading
        spinTbKelPenunjang,
        //modal
        mdTambahKelompok,
        setmdTambahKelompok,
        mdUbahKelompok,
        setmdUbahKelompok,
        // func
        getKelompokPenunjang,
        insertKelompok,
        updateKelompok,
        HapusKelompok,
      }}
    >
      {props.children}
    </MasterKelompokPenunjangContext.Provider>
  );
};

export default MasterKelompokPenunjangContextProvider;
