import React, { createContext, useState } from "react";
// import { message } from 'antd';
import axios from "axios";

export const MasterBarangContext = createContext();

const MasterBarangContextProvider = (props) => {
  const [listBarangRuang, setlistBarangRuang] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const GetListBarangRuang = (ruang) => {
    axios
      .get(`${apiku}/MstBarang/LookupGetViewBarang/%20/${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistBarangRuang(res.data.result);
        } else {
          setlistBarangRuang([]);
        }
      });
  };

  return (
    <MasterBarangContext.Provider
      value={{
        GetListBarangRuang,
        listBarangRuang,
      }}
    >
      {props.children}
    </MasterBarangContext.Provider>
  );
};

export default MasterBarangContextProvider;
