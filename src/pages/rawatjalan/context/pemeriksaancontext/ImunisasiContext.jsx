import React, { createContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";

export const ImunisasiContext = createContext();

const ImunisasiContextProvider = (props) => {
  const [bcg, setbcg] = useState("");
  const [dpt, setdpt] = useState("");
  const [polio, setpolio] = useState("");
  const [campak, setcampak] = useState("");
  const [tt, settt] = useState("");
  const [dt, setdt] = useState("");
  const [hepatitis, sethepatitis] = useState("");
  const [tk, settk] = useState("");
  const [tindakan, settindakan] = useState("");
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailImunisasi = (id) => {
    axios
      .get(`${apiku}/EmrPemeriksaanKhusus/Imunisasi/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setbcg(res.data.result.bcg);
          setdpt(res.data.result.dpt);
          setpolio(res.data.result.polio);
          setcampak(res.data.result.campak);
          settt(res.data.result.tt);
          setdt(res.data.result.dt);
          sethepatitis(res.data.result.hepatitis);
          settk(res.data.result.tk);
          settindakan(res.data.result.tindakan);
          console.log(res.data.result);
        } else {
          setbcg(null);
          setdpt(null);
          setpolio(null);
          setcampak(null);
          settt(null);
          setdt(null);
          sethepatitis(null);
          settk(null);
          settindakan(null);
        }
      })
      .catch((err) => {
        setbcg(null);
        setdpt(null);
        setpolio(null);
        setcampak(null);
        settt(null);
        setdt(null);
        sethepatitis(null);
        settk(null);
        settindakan(null);
      });
  };

  const insertImunisasi = (dataimunisasi) => {
    axios
      .post(`${apiku}/EmrPemeriksaanKhusus/Imunisasi`, dataimunisasi, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil disimpan!");
        } else {
          console.log(res.data.result);
          Modal.warning({ content: res.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  return (
    <ImunisasiContext.Provider
      value={{
        detailImunisasi,
        insertImunisasi,
        bcg,
        setbcg,
        dpt,
        setdpt,
        polio,
        setpolio,
        campak,
        setcampak,
        tt,
        settt,
        dt,
        setdt,
        hepatitis,
        sethepatitis,
        tk,
        settk,
        tindakan,
        settindakan,
      }}
    >
      {props.children}
    </ImunisasiContext.Provider>
  );
};

export default ImunisasiContextProvider;
