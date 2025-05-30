import React, { createContext, useState } from "react";
import { message } from "antd";
import axios from "axios";

export const MasterDiagnosaAskepContext = createContext();

const MasterDiagnosaAskepContextProvider = (props) => {
  const [dxaskep, setDxaskep] = useState([]);
  const [diagnosaId, setdiagnosaId] = useState([]);
  const [deskripsi, setdeskripsi] = useState([]);
  const [definisi, setdefinisi] = useState([]);
  const [diagnosaSnomedId, setdiagnosaSnomedId] = useState([]);
  const [deskripsiSnomed, setdeskripsiSnomed] = useState([]);
  const [subKategoriId, setsubKategoriId] = useState([]);

  const [dxbyGejala, setDxaskepbyGejala] = useState([]);
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailMasterdxaskep = () => {
    axios.get(`${apiku}/Askep/Diagnosa/Lookup`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setDxaskep(res.data.result);
      } else {
        setDxaskep([]);
      }
    });
  };
  const insertMasterdxiaskep = (newdata) => {
    axios
      .post(`${apiku}/Askep/Diagnosa`, newdata)
      .then((res) => {
        detailMasterdxaskep();
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const detaildxaskepId = (id) => {
    axios.get(`${apiku}/Askep/Diagnosa/ID/${id}`, options).then((res) => {
      if (res.data.statusCode === 200) {
        setdiagnosaId(res.data.result.diagnosaId);
        setdeskripsi(res.data.result.deskripsi);
        setdefinisi(res.data.result.definisi);
        setdiagnosaSnomedId(res.data.result.diagnosaSnomedId);
        setdeskripsiSnomed(res.data.result.deskripsiSnomed);
        setsubKategoriId(res.data.result.subKategoriId);
      } else {
        setdiagnosaId("");
        setdeskripsi("");
        setdefinisi("");
        setdiagnosaSnomedId("");
        setdeskripsiSnomed("");
        setsubKategoriId("");
      }
    });
  };

  const diagnosabytandagejala = (tandagejalapasein) => {
    axios
      .post(`${apiku}/Askep/Diagnosa/GetListDiagnosa2`, tandagejalapasein)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDxaskepbyGejala(res.data.result);
          console.log("ini diagnosanya", res.data.result);
        } else {
          setDxaskepbyGejala("");
        }
      })
      .catch((err) => {
        console.log("asu", err);
      });
  };

  return (
    <MasterDiagnosaAskepContext.Provider
      value={{
        dxaskep,
        detailMasterdxaskep,
        insertMasterdxiaskep,
        detaildxaskepId,
        diagnosaId,
        setdiagnosaId,
        deskripsi,
        setdeskripsi,
        definisi,
        setdefinisi,
        diagnosaSnomedId,
        setdiagnosaSnomedId,
        deskripsiSnomed,
        setdeskripsiSnomed,
        subKategoriId,
        setsubKategoriId,
        dxbyGejala,
        diagnosabytandagejala,
      }}
    >
      {props.children}
    </MasterDiagnosaAskepContext.Provider>
  );
};

export default MasterDiagnosaAskepContextProvider;
