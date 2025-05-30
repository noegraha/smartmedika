import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const TumKembangContext = createContext();

const TumKembangContextProvider = (props) => {
  const [listDDSTByPasienId, setlistDDSTByPasienId] = useState("");
  const [modalDDST, setmodalDDST] = useState("");

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getListTKembangByPasienId = (id) => {
    axios
      .get(`${apiku}/EmrDDST/GetByPasienId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistDDSTByPasienId(res.data.result);
          setmodalDDST(true);
        } else {
          message.warning("Data DDST Tidak Ditemukan");
        }
      })
      .catch((err) => {
        message.error("Error Mengambil Data DDST");
      });
  };

  return (
    <TumKembangContext.Provider
      value={{
        getListTKembangByPasienId,
        listDDSTByPasienId,
        setlistDDSTByPasienId,
        modalDDST,
        setmodalDDST,
      }}
    >
      {props.children}
    </TumKembangContext.Provider>
  );
};

export default TumKembangContextProvider;
