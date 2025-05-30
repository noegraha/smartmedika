import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const PantuanInfeksiContext = createContext();

const PantuanInfeksiContextProvider = (props) => {
  const [ppi, setPPI] = useState("");

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getPPI = (pasienid) => {
    axios
      .get(`${apiku}/MstPPI/Lookup/${pasienid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPPI(res.data.result[0].mstPPI);
        } else {
          setPPI([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setPPI([]);
        message.error("Gagal Mengambil!");
        console.log(err);
      });
  };
  const insertPPI = (dataPPI) => {
    axios
      .post(`${apiku}/EmrPPIPantauanInfeksi`, dataPPI)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal Disimpan!");
        console.log(err);
      });
  };

  return (
    <PantuanInfeksiContext.Provider value={{ ppi, getPPI, insertPPI }}>
      {props.children}
    </PantuanInfeksiContext.Provider>
  );
};

export default PantuanInfeksiContextProvider;
