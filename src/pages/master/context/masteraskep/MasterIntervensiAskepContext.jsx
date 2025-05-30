import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const MasterIntervensiAskepContext = createContext();

const MasterIntervensiAskepContextProvider = (props) => {
  const [intervensi, setIntervensi] = useState([]);
  const [intervensiId, setintervensiId] = useState([]);
  const [intervensiSikiId, setintervensiSikiId] = useState([]);
  const [deskripsi, setdeskripsi] = useState([]);
  const [intervensiSnomedId, setintervensiSnomedId] = useState([]);
  const [deskripsiSnomed, setdeskripsiSnomed] = useState([]);
  const [diagnosaId, setdiagnosaId] = useState([]);
  const [intervensibydx, setIntervensibydx] = useState([]);
  const [listIntervensiPerbaikan, setlistIntervensiPerbaikan] = useState([]);
  const [intervensiImpelentasi, setintervensiImpelentasi] = useState([]);
  const [loadingEdit, setloadingEdit] = useState(false);
  const [intervensiLama, setintervensiLama] = useState("");
  const [intervensiBaru, setintervensiBaru] = useState("");

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getListIntervensiPerbaikan = () => {
    axios
      .get(`${apiku}/Askep/Intervensi/Lookup/Intervensi`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistIntervensiPerbaikan(
            res.data.result.sort((a, b) =>
              a.Deskripsi.localeCompare(b.Deskripsi)
            )
          );
          setloadingEdit(false);
          // console.log(res.data.result);
        } else {
          setlistIntervensiPerbaikan([]);
          setloadingEdit(false);
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const getListIntervensiImplementasi = () => {
    axios
      .get(`${apiku}/Askep/Intervensi/Lookup/IntervensiImplementasi`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setintervensiImpelentasi(
            res.data.result.sort((a, b) =>
              a.DeskripsiIntervensi.localeCompare(b.DeskripsiIntervensi)
            )
          );
          setloadingEdit(false);
        } else {
          setintervensiImpelentasi([]);
          setloadingEdit(false);
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };

  const detailMasterIntervensiaskep = () => {
    axios
      .get(`${apiku}/Askep/Intervensi/Lookup`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setIntervensi(res.data.result);
        } else {
          setIntervensi([]);
        }
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const insertMasterintervensiaskep = (newdata) => {
    axios
      .post(`${apiku}/Askep/Intervensi`, newdata)
      .then((res) => {
        detailMasterIntervensiaskep();
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const updateIntervensiLama = (newdata) => {
    axios
      .post(`${apiku}/Askep/Intervensi/UpdateIntervensi`, newdata)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Dara Berhasil Disimpan!");
          setintervensiLama("");
          setintervensiBaru("");
          getListIntervensiPerbaikan();
        } else {
          getListIntervensiPerbaikan();
          message.warning("Dara Gagal Disimpan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Simpan Data!");
        //console.log(err);
      });
  };

  const deleteMasterIntervensiaskep = (idkategori) => {
    axios
      .delete(`${apiku}/Askep/Intervensi/${idkategori}`, options)
      .then((res) => {
        //console.log(res);
        detailMasterIntervensiaskep();

        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const detailIntervensiId = (id) => {
    axios.get(`${apiku}/Askep/Intervensi/ID/${id}`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setintervensiId(res.data.result.intervensiId);
        setintervensiSikiId(res.data.result.intervensiSikiId);
        setdeskripsi(res.data.result.deskripsi);
        setintervensiSnomedId(res.data.result.intervensiSnomedId);
        setdeskripsiSnomed(res.data.result.deskripsiSnomed);
        setdiagnosaId(res.data.result.diagnosaId);
      } else {
        setintervensiId("");
        setintervensiSikiId("");
        setdeskripsi("");
        setintervensiSnomedId("");
        setdeskripsiSnomed("");
        setdiagnosaId("");
      }
    });
  };

  const getintervensibydx = (dxid) => {
    axios
      .get(`${apiku}/Askep/Intervensi/GetByDiagnosa/${dxid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setIntervensibydx(res.data.result);
        } else {
          setIntervensibydx("");
        }
      });
  };

  return (
    <MasterIntervensiAskepContext.Provider
      value={{
        intervensi,
        detailMasterIntervensiaskep,
        insertMasterintervensiaskep,
        deleteMasterIntervensiaskep,
        detailIntervensiId,
        setIntervensi,
        intervensiId,
        setintervensiId,
        intervensiSikiId,
        setintervensiSikiId,
        deskripsi,
        setdeskripsi,
        intervensiSnomedId,
        setintervensiSnomedId,
        deskripsiSnomed,
        setdeskripsiSnomed,
        diagnosaId,
        setdiagnosaId,
        intervensibydx,
        setIntervensibydx,
        getintervensibydx,
        listIntervensiPerbaikan,
        setlistIntervensiPerbaikan,
        intervensiImpelentasi,
        setintervensiImpelentasi,
        getListIntervensiPerbaikan,
        getListIntervensiImplementasi,
        loadingEdit,
        setloadingEdit,
        updateIntervensiLama,
        intervensiLama,
        setintervensiLama,
        intervensiBaru,
        setintervensiBaru,
      }}
    >
      {props.children}
    </MasterIntervensiAskepContext.Provider>
  );
};

export default MasterIntervensiAskepContextProvider;
