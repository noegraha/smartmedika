import { Modal } from "antd";
import axios from "axios";
import React, { createContext, useContext, useState } from "react";
import { LoginContext } from "../../../rawatjalan/context";

export const PenunjangLabPaContext = createContext();

const endpoint = process.env.REACT_APP_API_BASE_URL;

const PenunjangLabPaContextProvider = (props) => {
  const { token } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  // state
  const [regId, setregId] = useState("2302071096");
  const [headerPasien, setheaderPasien] = useState({});
  // spin
  const [spHeaderPasien, setspHeaderPasien] = useState(false);

  // func
  const getHeader = (noreg) => {
    setspHeaderPasien(true);
    axios
      .get(`${endpoint}/EmrLaboratPA/GetHeaderbyRegId/${noreg}`, options)
      .then((response) => {
        console.log("getHeader ", response.data);
        setspHeaderPasien(false);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            Modal.info({
              title: "Informasi",
              content: "Tidak ada data Pasien Lab PA.",
            });
          } else {
            // console.log("getListOrder : ", response.data.result);
            setheaderPasien(response.data.result);
          }
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data Pasien Lab PA! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspHeaderPasien(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data Pasien Lab PA! -> ${err}`,
        });
      });
  };

  return (
    <PenunjangLabPaContext.Provider
      value={{
        regId,
        setregId,
        headerPasien,
        setheaderPasien,
        // sp
        spHeaderPasien,
        setspHeaderPasien,
        // func
        getHeader,
      }}
    >
      {props.children}
    </PenunjangLabPaContext.Provider>
  );
};

export default PenunjangLabPaContextProvider;
