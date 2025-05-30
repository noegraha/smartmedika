import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const ReportingContext = createContext();

const ReportingContextProvider = (props) => {
  const [rekapkunjunganrj, setRekapKunjunganRJ] = useState([]);
  const [tanggalawal, setTanggalAwal] = useState(null);
  const [tanggalakhir, setTanggalAKhir] = useState(null);
  const [loading, setLoading] = useState(false);

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getReportingRJ = (tanggalawal, tanggalakhir) => {
    setLoading(true);
    axios
      .get(`${apiku}/Reporting/Lookup/${tanggalawal}/${tanggalakhir}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setRekapKunjunganRJ(res.data.result);
          setLoading(false);
        } else {
          message.warning("Reporting RJ ", res.data.message);
          setRekapKunjunganRJ([]);
          setLoading(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        setRekapKunjunganRJ([]);
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <ReportingContext.Provider
      value={{
        rekapkunjunganrj,
        getReportingRJ,
        tanggalawal,
        setTanggalAwal,
        tanggalakhir,
        setTanggalAKhir,
        loading,
      }}
    >
      {props.children}
    </ReportingContext.Provider>
  );
};

export default ReportingContextProvider;
