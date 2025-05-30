/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { LoginContext } from "../../../rawatjalan/context";

export const PenunjangLainnyaContext = createContext();

const endpoint = process.env.REACT_APP_API_BASE_DEV;

const PenunjangLainnyaContextProvider = (props) => {
  const { token } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  // spin
  const [spinTabel, setSpinTabel] = useState(false);

  const [ruangRi, setRuangRi] = useState([]);
  const [pasienRi, setPasienRi] = useState([]);
  const [kdRuangRiSidebar, setkdRuangRiSidebar] = useState("");
  const [sSearch, setsSearch] = useState("");

  // mst ruang ri
  const getRuangRi = () => {
    const usr = sessionStorage.getItem("user");
    axios
      .get(`http://${endpoint}/SisJwt/RuangByUser/${usr}/ /1`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log("ruangRi ", res.data.result);
          setRuangRi(res.data.result);
        } else {
          setRuangRi([]);
        }
      })
      .catch((err) => {
        setRuangRi([]);
      });
  };

  // lookup pasien ri
  const getPasienRi = (kdRuang, search) => {
    setSpinTabel(true);
    axios
      .get(
        `http://${endpoint}/EmrPasienAktif/LookupByRuang/${
          search ? search : " "
        }/${kdRuang}`,
        options
      )
      .then((res) => {
        // console.log("getPasienRi ", res.data);
        if (res.data.statusCode === 200) {
          setPasienRi(res.data.result);
          setSpinTabel(false);
        } else {
          setPasienRi([]);
          setSpinTabel(false);
        }
      })
      .catch((err) => {
        setSpinTabel(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getRuangRi();
  }, []);

  useEffect(() => {
    getPasienRi(kdRuangRiSidebar, sSearch);
  }, [sSearch]);

  return (
    <PenunjangLainnyaContext.Provider
      value={{
        ruangRi,
        setRuangRi,
        pasienRi,
        setPasienRi,
        kdRuangRiSidebar,
        setkdRuangRiSidebar,
        sSearch,
        setsSearch,
        spinTabel,
        setSpinTabel,
        getPasienRi,
      }}
    >
      {props.children}
    </PenunjangLainnyaContext.Provider>
  );
};

export default PenunjangLainnyaContextProvider;
