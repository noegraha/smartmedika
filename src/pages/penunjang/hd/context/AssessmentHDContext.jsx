import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../../rawatjalan/context";
import { message } from "antd";

export const AssessmentHDContext = createContext();

const AssessmentHDContextProvider = (props) => {
  const [keluhanId, setKeluhanId] = useState([]);
  const [namaKeluhan, setNamaKeluhan] = useState([]);
  const [avId, setAVId] = useState([]);
  const [namaAV, setNamaAV] = useState([]);

  const {
    token,
    // apiku
  } = useContext(LoginContext);

  const apiku = sessionStorage.getItem("api");
  // const apiku = "182.168.6.72:5577";

  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  useEffect(() => {
    const tok = sessionStorage.getItem("userData");

    const options = {
      headers: { Authorization: "Bearer " + tok },
    };

    axios
      .get(`${apiku}/MstDialisisKeluhan`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setNamaKeluhan(res.data.result);
        } else {
          setNamaKeluhan([]);
          // message.warning(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });

    axios
      .get(`${apiku}/MstDialisisAksesVaskuler`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setNamaAV(res.data.result);
        } else {
          setNamaAV([]);
          // message.warning(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token, apiku]);

  const getKeluhanTambahan = () => {
    axios
      .get(`${apiku}/MstDialisisKeluhan`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setNamaKeluhan(res.data.result);
        } else {
          setNamaKeluhan([]);
          message.warning(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <AssessmentHDContext.Provider
      value={{
        keluhanId,
        namaKeluhan,
        avId,
        namaAV,
        setKeluhanId,
        setNamaKeluhan,
        setAVId,
        setNamaAV,
        getKeluhanTambahan,
      }}
    >
      {props.children}
    </AssessmentHDContext.Provider>
  );
};

export default AssessmentHDContextProvider;
