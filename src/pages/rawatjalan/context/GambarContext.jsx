import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { useContext } from "react";
import { ChatContext } from "../../chat/Chatcontext";

export const GambarContext = createContext();

const GambarContextProvider = (props) => {
  const [gambar, setGambar] = useState(null);
  const { loading, setLoading } = useContext(ChatContext);
  const [listGambarByPasienId, setlistGambarByPasienId] = useState([]);
  const [modalGambarIrja, setmodalGambarIrja] = useState(false);
  const tok = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const detailGambar = (id) => {
    axios
      .get(`${apiku}/EmrGambarIrja/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setGambar(res.data.result.gambar);
          // console.log(res.data.result);
        } else {
          setGambar(null);
          // message.warning(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const GetListGambarByPasienId = (pasienId) => {
    axios
      .get(
        `${apiku}/EmrGambarIrja/GetGambarIrjaByPasienId/${pasienId}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistGambarByPasienId(res.data.result);
          setmodalGambarIrja(true);
          setLoading(false);
        } else {
          setlistGambarByPasienId([]);
          setLoading(false);
          message.warning("Data Gambar Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        console.log(err);
        setlistGambarByPasienId([]);
        setLoading(false);
        message.error("Gagal Saat Mengambil Data Gambar!");
      });
  };

  const insertGambar = (datagambar) => {
    axios
      .post(`${apiku}/EmrGambarIrja`, datagambar, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
        } else {
          console.log(res.data);
          message.error("Gagal Disimpan!");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  return (
    <GambarContext.Provider
      value={{
        gambar,
        detailGambar,
        insertGambar,
        listGambarByPasienId,
        setlistGambarByPasienId,
        modalGambarIrja,
        setmodalGambarIrja,
        GetListGambarByPasienId,
      }}
    >
      {props.children}
    </GambarContext.Provider>
  );
};

export default GambarContextProvider;
