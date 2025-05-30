import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const MasterLuaranAskepContext = createContext();

const MasterLuaranAskepContextProvider = (props) => {
  const [masterLuaran, setMasterLuaran] = useState([]);
  const [luaranId, setluaranId] = useState([]);
  const [deskripsi, setdeskripsi] = useState([]);
  const [diagnosaId, setdiagnosaId] = useState([]);
  const [luaranbydx, setLuaranbydx] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailMasterLuaranaskep = () => {
    axios.get(`${apiku}/Askep/Luaran/Lookup`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setMasterLuaran(res.data.result);
      } else {
        setMasterLuaran([]);
      }
    });
  };
  const insertMasterLuaranaskep = (newdata) => {
    axios
      .post(`${apiku}/Askep/Luaran`, newdata)
      .then((res) => {
        detailMasterLuaranaskep();
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };
  const deleteMasterLuaranaskep = (idkategori) => {
    axios
      .delete(`${apiku}/Askep/Luaran/${idkategori}`, options)
      .then((res) => {
        //console.log(res);
        detailMasterLuaranaskep();
        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const detailLuaranId = (id) => {
    axios.get(`${apiku}/Askep/Luaran/ID/${id}`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setluaranId(res.data.result.luaranId);
        setdeskripsi(res.data.result.deskripsi);
        setdiagnosaId(res.data.result.diagnosaId);
      } else {
        setluaranId("");
        setdeskripsi("");
        setdiagnosaId("");
      }
    });
  };

  const getluaranbydiagnosaid = (diagnosaid) => {
    axios
      .get(`${apiku}/Askep/Luaran/GetByDiagnosa/${diagnosaid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setLuaranbydx(res.data.result);
          console.log("luataragahsas", res.data.result);
        } else {
          setLuaranbydx("");
        }
      });
  };

  return (
    <MasterLuaranAskepContext.Provider
      value={{
        detailMasterLuaranaskep,
        masterLuaran,
        insertMasterLuaranaskep,
        deleteMasterLuaranaskep,
        detailLuaranId,
        luaranId,
        setluaranId,
        deskripsi,
        setdeskripsi,
        diagnosaId,
        setdiagnosaId,
        luaranbydx,
        setLuaranbydx,
        getluaranbydiagnosaid,
      }}
    >
      {props.children}
    </MasterLuaranAskepContext.Provider>
  );
};

export default MasterLuaranAskepContextProvider;
