import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { message } from "antd";

export const EswlContext = createContext();

const EswlContextProvider = (props) => {
  const [pasieneswl, setpasieneswl] = useState([]);
  const [loadPasien, setloadPasien] = useState(false);
  const apiku = sessionStorage.getItem("api");

  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const cariPasieneswl = (ruangkirim, ruangtujuan, tgl) => {
    console.log(ruangkirim, ruangtujuan, tgl);
    axios
      .get(`${apiku}/Eswl/Lookup/${ruangkirim}/${ruangtujuan}/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setpasieneswl(
            res.data.result.sort((a, b) =>
              a.NAMAPASIEN.localeCompare(b.NAMAPASIEN)
            )
          );
          console.log(res.data.result);
          setloadPasien(false);
        } else {
          setpasieneswl([]);
          setloadPasien(false);
        }
      })
      .catch((err) => {
        console.log(err, "eswl");
        setloadPasien(false);
      });
  };
  return (
    <EswlContext.Provider
      value={{
        pasieneswl,
        setpasieneswl,
        loadPasien,
        setloadPasien,
        cariPasieneswl,
      }}
    >
      {props.children}
    </EswlContext.Provider>
  );
};

export default EswlContextProvider;
