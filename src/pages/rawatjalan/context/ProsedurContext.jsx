import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { message, Modal } from "antd";

export const ProsedurContext = createContext();

const ProsedurContextProvider = (props) => {
  const [prosedur, setProsedur] = useState([]);
  const [detprosedur, setDetailProsedur] = useState([]);
  const [pros, setProsedurKode] = useState([]);
  const [pemeriksa, setPemeriksa] = useState("");
  const [loadingProsedur, setLoadingProsedur] = useState(false);
  const token = sessionStorage.getItem("userData");

  const apiku = sessionStorage.getItem("api");
  const noreg = sessionStorage.getItem("noreg");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  // useEffect(() => {
  //   sessionStorage.setItem("userData", token);
  //   const tok = sessionStorage.getItem("userData");

  //   const options = {
  //     headers: { Authorization: "Bearer " + token },
  //   };
  //   axios
  //     .get(`${apiku}/mstProcedures/Lookup/ /1/20000`, options)
  //     .then((res) => {
  //       const prosedur = res.data.result;
  //       setProsedur(prosedur);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [token]);

  const getMstProsedur = (id) => {
    axios
      .get(`${apiku}/mstProcedures/Lookup/ /1/20000`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setProsedur(res.data.result);
        } else {
          setProsedur([]);
        }
      })
      .catch((err) => {
        setProsedur([]);
        console.log(err);
      });
  };

  const insertProsedur = (dataprosedur) => {
    setLoadingProsedur(true);
    axios
      .post(`${apiku}/EmrProsedur`, dataprosedur, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
          detailProsedur(noreg);
          setLoadingProsedur(false);
        } else {
          Modal.warning({ content: res.data.message });
          setLoadingProsedur(false);
        }
      })
      .catch((err) => {
        console.log(err);
        Modal.error({ content: "Gagal Disimpan!" });
        setLoadingProsedur(false);
      });
  };

  const deleteProsedur = (noreg, kodeprosedur) => {
    axios
      .delete(`${apiku}/EmrProsedur/${noreg}/${kodeprosedur}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setDetailProsedur(
          //   detprosedur.filter((item) => item.prosedurId !== kodeprosedur)
          // );
          message.success("Berhasil Dihapus!");
          detailProsedur(noreg);
        } else {
          message.warning(res.data.result);
        }
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
        console.log(err);
      });
  };

  const detailProsedur = (id) => {
    axios
      .get(`${apiku}/EmrProsedur/Read/${id}/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDetailProsedur(res.data.result);
          setProsedurKode([]);
          setPemeriksa(null);
          // console.log(res.data);
        } else {
          // message.warning(res.data.message);
          setDetailProsedur([]);
          setProsedurKode([]);
          setPemeriksa(null);
          // console.log("kosong" + res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        setDetailProsedur([]);
        setProsedurKode([]);
        setPemeriksa(null);
      });
  };
  return (
    <ProsedurContext.Provider
      value={{
        prosedur,
        detprosedur,
        detailProsedur,
        deleteProsedur,
        insertProsedur,
        pros,
        setProsedurKode,
        pemeriksa,
        setPemeriksa,
        loadingProsedur,
        getMstProsedur,
      }}
    >
      {props.children}
    </ProsedurContext.Provider>
  );
};

export default ProsedurContextProvider;
