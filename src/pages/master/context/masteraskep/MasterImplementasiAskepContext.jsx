import React, { createContext, useState, useEffect } from "react";
import { message } from "antd";
import axios from "axios";

export const MasterImplementasiAskepContext = createContext();

const MasterImplementasiAskepContextProvider = (props) => {
  const [listImplementasiAskep, setListImplementasiAskep] = useState([]);
  const [listImplementasiByIntervensi, setlistImplementasiByIntervensi] =
    useState([]);
  const [implementasiId, setimplementasiId] = useState(0);
  const [deskripsiImplementasi, setdeskripsiImplementasi] = useState([]);
  const [intervensiIdImplementasi, setintervensiIdImplementasi] = useState([]);
  const [implementasiByDx, setimplementasiByDx] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailMasterimplementasiaskep = () => {
    axios.get(`${apiku}/Askep/Implementasi/Lookup`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setListImplementasiAskep(res.data.result);
      } else {
        setListImplementasiAskep();
      }
    });
  };
  const insertMasterimplementasiiaskep = (newdata) => {
    axios
      .post(`${apiku}/Askep/Implementasi`, newdata)
      .then((res) => {
        detailMasterimplementasiaskep();
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };
  const deleteMasteimplementasiaskep = (idImplementasi) => {
    axios
      .delete(`${apiku}/Askep/Implementasi/${idImplementasi}`, options)
      .then((res) => {
        //console.log(res);
        detailMasterimplementasiaskep();
        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const detailimplementasiaskepId = (id) => {
    axios.get(`${apiku}/Askep/Implementasi/ID/${id}`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setimplementasiId(res.data.result.implementasiId);
        setdeskripsiImplementasi(res.data.result.deskripsi);
        setintervensiIdImplementasi(res.data.result.intervensiId);
      } else {
        setimplementasiId();
        setdeskripsiImplementasi();
        setintervensiIdImplementasi();
      }
    });
  };

  const getImplementasiByIntervensiId = (IntervensiId) => {
    axios
      .post(
        `${apiku}/Askep/Asuhan/Implementasi/GetImplementasiByIntervensi`,
        IntervensiId
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistImplementasiByIntervensi(res.data.result);
          console.log(res.data.result);
        } else {
          console.log(
            "data implementasi by intervensi tidak di temukan",
            IntervensiId
          );
          message.warning("Data Tidak Di Temukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mnegambil Data!");
      });
  };

  const getImplementasiByDiagnosaId = (dxId) => {
    axios
      .get(`${apiku}/Askep/Implementasi/ByDiagnosaId/${dxId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setimplementasiByDx(
            res.data.result.sort((a, b) =>
              a.Deskripsi.localeCompare(b.Deskripsi)
            )
          );
          console.log(res.data.result);
        } else {
          setimplementasiByDx([]);
          console.log("data implementasi by intervensi tidak di temukan", dxId);
          message.warning("Data Tidak Di Temukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mnegambil Data!");
      });
  };

  return (
    <MasterImplementasiAskepContext.Provider
      value={{
        listImplementasiAskep,
        setListImplementasiAskep,
        implementasiId,
        setimplementasiId,
        deskripsiImplementasi,
        setdeskripsiImplementasi,
        intervensiIdImplementasi,
        setintervensiIdImplementasi,
        detailMasterimplementasiaskep,
        insertMasterimplementasiiaskep,
        deleteMasteimplementasiaskep,
        detailimplementasiaskepId,
        listImplementasiByIntervensi,
        setlistImplementasiByIntervensi,
        getImplementasiByIntervensiId,
        getImplementasiByDiagnosaId,
        setimplementasiByDx,
        implementasiByDx,
      }}
    >
      {props.children}
    </MasterImplementasiAskepContext.Provider>
  );
};

export default MasterImplementasiAskepContextProvider;
