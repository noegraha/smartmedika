import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { message } from "antd";
import { LoginContext } from "../../rawatjalan/context";

export const ProsedurRIContext = createContext();

const ProsedurRIContextProvider = (props) => {
  const [prosedur, setProsedur] = useState([]);
  const [detprosedur, setDetailProsedur] = useState([]);
  const [pros, setProsedurKode] = useState("");
  const [pemeriksa, setPemeriksa] = useState("");

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  useEffect(() => {
    sessionStorage.setItem("userData", token);
    const tok = sessionStorage.getItem("userData");

    const options = {
      headers: { Authorization: "Bearer " + tok },
    };
    axios
      .get(`${apiku}/mstProcedures/Lookup/ /1/20000`, options)
      .then((res) => {
        const prosedur = res.data.result;
        setProsedur(prosedur);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const insertProsedur = (dataprosedur) => {
    axios
      .post(`${apiku}/EmrProsedur`, dataprosedur)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const elementsIndex = detprosedur.findIndex(
            (element) => element.prosedurId === res.data.result.prosedurId
          );

          if (elementsIndex === -1) {
            setDetailProsedur([...detprosedur, res.data.result]);
          } else {
            let newArray = [...detprosedur];

            newArray[elementsIndex] = {
              ...newArray[elementsIndex],
              pelaksanaDesk: res.data.result.pelaksanaDesk,
            };
            setDetailProsedur(newArray);
          }

          console.log(elementsIndex);

          // setDetailProsedur([...detprosedur, res.data.result
          //     // {
          //     //     reg: res.data.result.registrasiId,
          //     //     kode: res.data.result.prosedurId,
          //     //     deskripsi: res.data.result.prosedurDesk,
          //     //     pemeriksa: res.data.result.pelaksanaDesk,
          //     //     user: res.data.result.userId
          //     // }
          // ]);
          // console.log(newArray);
          // console.log(res.data.result.prosedurId);
          // console.log('element index', elementsIndex);
          message.success("Berhasil Disimpan!");
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };
  const deleteProsedur = (noreg, kodeprosedur) => {
    axios
      .delete(`${apiku}/EmrProsedur/${noreg}/${kodeprosedur}`, options)
      .then((res) => {
        console.log(res);
        setDetailProsedur(
          detprosedur.filter((item) => item.prosedurId !== kodeprosedur)
        );
        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
        console.log(err);
      });
  };
  const detailProsedur = (id) => {
    axios
      .get(`${apiku}/EmrProsedur/Read/${id}/1/10`, options)
      .then((res) => {
        // var dataPros = [];
        // // eslint-disable-next-line array-callback-return
        // res.data.result.map(l => {
        //     dataPros.push({
        //         reg: l.registrasiId,
        //         kode: l.prosedurId,
        //         deskripsi: l.prosedurDesk,
        //         pemeriksa: l.pelaksanaDesk,
        //         user: l.userId
        //     });
        // })
        // setDetailProsedur(dataPros);
        // console.log(dataPros);
        setDetailProsedur(res.data.result);
        setProsedurKode(null);
        setPemeriksa(null);
      })
      .catch((err) => {
        // message.error('Gagal Mengambil Data!')
        console.log(err);
        setDetailProsedur([]);
      });
  };
  return (
    <ProsedurRIContext.Provider
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
      }}
    >
      {props.children}
    </ProsedurRIContext.Provider>
  );
};

export default ProsedurRIContextProvider;
