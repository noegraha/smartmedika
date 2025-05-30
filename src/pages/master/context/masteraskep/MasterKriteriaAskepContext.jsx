import React, { createContext, useState } from "react";
import { message } from "antd";
import axios from "axios";

export const MasterKriteriaAskepContext = createContext();

const MasterKriteriaAskepContextProvider = (props) => {
  const [kriteria, setkriteria] = useState([]);
  const [kriteriaId, setkriteriaId] = useState([]);
  const [deskripsi, setdeskripsi] = useState([]);
  const [jenisKriteria, setjenisKriteria] = useState([]);
  const [luaranId, setluaranId] = useState([]);
  const [kriteriaByLuaran, setKriteriaByLuaran] = useState([]);
  const [jnsKriteriaByLuaran, setJnsKriteriabyLuaran] = useState([]);
  const [kesimpulanByTarget, setkesimpulanByTarget] = useState("");
  const [kriteriaKesimpulan, setkriteriaKesimpulan] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailMasterkriteriaaskep = () => {
    axios.get(`${apiku}/Askep/Kriteria/Lookup`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setkriteria(res.data.result);
      } else {
        setkriteria([]);
      }
    });
  };
  const insertMasterkriteriaiaskep = (newdata) => {
    axios
      .post(`${apiku}/Askep/Kriteria`, newdata)
      .then((res) => {
        detailMasterkriteriaaskep();
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const getKriteriaKesimpulan = (datakriteria) => {
    axios
      .post(`${apiku}/Askep/Kriteria/GetKriteriaByNo`, datakriteria)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setkriteriaKesimpulan(res.data.result);
          console.log(res.data.result);
        } else {
          setkriteriaKesimpulan([]);
          message.error("Gagal Mengambil Kriteria Kesimpulan!");
        }
      })
      .catch((errors) => {
        setkriteriaKesimpulan([]);
        console.log(errors);
        message.error("Error !");
      });
  };

  const deleteMastekriteriaaskep = (idkategori) => {
    axios
      .delete(`${apiku}/Askep/Kriteria/${idkategori}`, options)
      .then((res) => {
        //console.log(res);
        detailMasterkriteriaaskep();
        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        //console.log(err);
      });
  };
  const detailkriteriaaskepId = (id) => {
    axios.get(`${apiku}/Askep/Kriteria/ID/${id}`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setkriteriaId(res.data.result.kriteriaId);
        setdeskripsi(res.data.result.deskripsi);
        setjenisKriteria(res.data.result.jenisKriteria);
        setluaranId(res.data.result.luaranId);
      } else {
        setkriteriaId("");
        setdeskripsi("");
        setjenisKriteria("");
        setluaranId("");
      }
    });
  };
  const getbyluaranjns = (luaranId, jnskriteria) => {
    axios
      .get(
        `${apiku}/Askep/Kriteria/GetKriteriaByJenis/${luaranId}/${jnskriteria}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKriteriaByLuaran(res.data.result);
          console.log("data kriteria by luaranb and id", res.data.result);
        } else {
          setKriteriaByLuaran("");
          console.log("gagalkriteriabyluaran n jns kategori");
        }
      });
  };

  const getJnsKriteriaByLuaran = (luaranId) => {
    axios
      .get(`${apiku}/Askep/Kriteria/GetJenisKriteria/${luaranId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setJnsKriteriabyLuaran(res.data.result);
          console.log("data kriteria by luaranb and id", res.data.result);
        } else {
          setJnsKriteriabyLuaran("");
          // message.warning('Data Jenis Kriteria Tidak Ditemukan')
          console.log("gagalkriteriabyluaran n jns kategori");
        }
      });
  };

  const getKesimpulanByhasilTarget = (target, hasil) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Evaluasi/GetKesimpulanByKriteria/${target}/${hasil}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setkesimpulanByTarget(res.data.result);
          console.log(res.data.result);
        } else {
          message.warning("Data Kesimpulan Di Temukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mnegambil Kesimpulan!");
      });
  };
  return (
    <MasterKriteriaAskepContext.Provider
      value={{
        kriteria,
        setkriteria,
        detailMasterkriteriaaskep,
        detailkriteriaaskepId,
        deleteMastekriteriaaskep,
        insertMasterkriteriaiaskep,
        kriteriaId,
        setkriteriaId,
        deskripsi,
        setdeskripsi,
        jenisKriteria,
        setjenisKriteria,
        luaranId,
        setluaranId,
        kriteriaByLuaran,
        getbyluaranjns,
        jnsKriteriaByLuaran,
        setJnsKriteriabyLuaran,
        getJnsKriteriaByLuaran,
        kesimpulanByTarget,
        setkesimpulanByTarget,
        getKesimpulanByhasilTarget,
        kriteriaKesimpulan,
        setkriteriaKesimpulan,
        getKriteriaKesimpulan,
      }}
    >
      {props.children}
    </MasterKriteriaAskepContext.Provider>
  );
};

export default MasterKriteriaAskepContextProvider;
