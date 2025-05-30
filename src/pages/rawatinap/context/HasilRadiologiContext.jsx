import React, { createContext, useState } from "react";
import axios from "axios";

export const HasilRadiologiContext = createContext();

const HasilRadiologiContextProvider = (props) => {
  const [hasilradiologi, setHasilRadiologi] = useState([]);
  const [hasillab, setHasilLab] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailHasilRadiologi = (id) => {
    axios
      .get(`${apiku}/RiHasilRadiologi/ID/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHasilRadiologi(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("data radiologi kosong");
        }
      }, [])
      .catch((err) => {
        console.log("data radiologi kosong");
      });
  };
  const detailHasilLabKlinik = (id) => {
    axios
      .get(`${apiku}/EmrGizi/GetHasilLab/${id}`, options)
      .then((res) => {
        setHasilLab(res.data.result);
      }, [])
      .catch((err) => {
        console.log("data radiologi kosong");
      });
  };
  return (
    <HasilRadiologiContext.Provider
      value={{
        hasilradiologi,
        hasillab,
        detailHasilRadiologi,
        detailHasilLabKlinik,
      }}
    >
      {props.children}
    </HasilRadiologiContext.Provider>
  );
};

export default HasilRadiologiContextProvider;
