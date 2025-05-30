import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { message, Modal } from "antd";
import { LoginContext } from "../../rawatjalan/context";
// import { PasienContext } from '../context/PasienContext';
// import { message } from 'antd';

export const DiagnosaRIContext = createContext();

const DiagnosaRIContextProvider = (props) => {
  const [diagnosa, setDiagnosa] = useState([]);
  const [detdiagnosa, setDetailDiagnosa] = useState([]);
  const [jendiagnosa, setJenisDiagnosa] = useState(0);
  const [prosedur, setProsedur] = useState([]);
  const [pilihdiagnosa, setPilihDiagnosa] = useState([]);
  const [diag, setDiagnosaKode] = useState(null);
  const [kasus, setKasus] = useState(null);
  const [pemeriksa, setPemeriksa] = useState(null);
  const [jenisdiagnosis, setJenisDiagnosis] = useState(null);
  // const ruangId = localStorage.getItem('ruangId');
  // const { curpas } = useContext(PasienContext);

  //-----------------------Snomed----------------------------//
  const [snomedDXPasien, setsnomedDXPasien] = useState([]);
  const [mstsnomed, setmstsnomed] = useState([]);
  const [mstsnomedAtribut, setmstsnomedAtribut] = useState([]);
  const [snomedProcedurPasien, setsnomedProcedurPasien] = useState([]);
  const [nomorSnomed, setnomorSnomed] = useState(0);
  const [noUrutSnomed, setnoUrutSnomed] = useState(0);
  const [snomedID, setsnomedID] = useState([]);
  const [isDX, setisDX] = useState(true);

  const [loadingSnomed, setloadingSnomed] = useState(false);
  const [loadingmstSnomed, setloadingmstSnomed] = useState(false);
  const [loadingAtrSnomed, setloadingAtrSnomed] = useState(false);
  const [warnapilih, setwarnapilih] = useState("");
  const [modalPop, setmodalPop] = useState(false);

  const token = sessionStorage.getItem("userData");
  const tok = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  // const data =
  //     [
  //         {
  //   "registrasiId": "1910260273",
  //   "diagnosisId": "Q42",
  //   "kasusBl": "L",
  //   "jenisDiagnosisId": "1",
  //   "ruangId": "9101",
  //   "pegawaiId": "D006",
  //   "userId": "agung"
  //         }
  //     ]
  useEffect(() => {
    sessionStorage.setItem("userData", token);
    const tok = sessionStorage.getItem("userData");

    const options = {
      headers: { Authorization: "Bearer " + tok },
    };
    // axios.get(`${apiku}/mstDiagnosis/Lookup/ /1/20000`, options)
    //     .then(res => {
    //         const diagnosa = res.data.result;
    //         setDiagnosa(diagnosa);
    //     })
    axios.get(`${apiku}/mstProcedures/Lookup/ /1/50`, options).then((res) => {
      const prosedur = res.data.result;
      setProsedur(prosedur);
    });
    axios
      .get(`${apiku}/MstJenisDiagnosis/Lookup/ /1/10`, options)
      .then((res) => {
        const jendiagnosa = res.data.result;
        setJenisDiagnosa(jendiagnosa);
      });
  }, [token]);

  const getDiagnosa = (ruang) => {
    axios
      .get(`${apiku}/MstDiagnosis/Lookup/%20/1/100000`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDiagnosa(res.data.result);
          //  console.log(res.data.result);
        } else {
          setDiagnosa([]);
          message.warning("Data Snomed DX Pasien Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data Snomed DX Pasien!");
        setDiagnosa([]);
      });
  };
  const detailDiagnosa = (id) => {
    axios
      .get(`${apiku}/EmrDiagnosis/Read/${id}/1/10`, options)
      .then((res) => {
        // var dataDiag = [];
        // // eslint-disable-next-line array-callback-return
        // res.data.result.map(r => {
        //     dataDiag.push({
        //         reg: r.registrasiId,
        //         kode: r.diagnosisId,
        //         desk: r.diagnosisDesk,
        //         jenis: r.jenisDiagnosisDesk,
        //         kasus: r.kasusBl,
        //         dokter: r.pelaksana
        //     });
        // })
        // setDetailDiagnosa(dataDiag);
        // console.log(dataDiag);
        setDetailDiagnosa(res.data.result);
        setPilihDiagnosa([]);
        setDiagnosaKode(null);
        setJenisDiagnosis(null);
        setKasus(null);
        setPemeriksa(null);
      })
      .catch((err) => {
        // console.log(err);
        // message.error('Gagal Disimpan!')
        setPilihDiagnosa([]);
        setDiagnosaKode(null);
        setJenisDiagnosis(null);
        setKasus(null);
        setPemeriksa(null);
        setDetailDiagnosa([]);
      });
  };
  const cariDiagnosa = (nama) => {
    axios
      .get(
        `http://dvlp.rsmargono.go.id/api/mstDiagnosis/Lookup/${nama}/1/20`,
        options
      )
      .then((res) => {
        setDiagnosa(res.data.result);
      });
  };
  const insertDiagnosa = (datadiagnosa) => {
    axios
      .post(`${apiku}/EmrDiagnosis`, datadiagnosa)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const elementsIndex = detdiagnosa.findIndex(
            (element) => element.diagnosisId === res.data.result.diagnosisId
          );

          if (elementsIndex === -1) {
            setDetailDiagnosa([...detdiagnosa, res.data.result]);
          } else {
            let newArray = [...detdiagnosa];

            newArray[elementsIndex] = {
              ...newArray[elementsIndex],
              pelaksana: res.data.result.pelaksana,
              jenisDiagnosisDesk: res.data.result.jenisDiagnosisDesk,
              kasusBl: res.data.result.kasusBl,
            };
            setDetailDiagnosa(newArray);
          }
          console.log(elementsIndex);
          message.success("Berhasil Disimpan!");
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(err.data),
        });
      });
  };

  const deleteDiagnosa = (noreg, kodediagnosa) => {
    axios
      .delete(`${apiku}/EmrDiagnosis/${noreg}/${kodediagnosa}`, options)
      .then((res) => {
        // console.log(res);
        setDetailDiagnosa(
          detdiagnosa.filter((item) => item.diagnosisId !== kodediagnosa)
        );
        message.success("Berhasil Dihapus!");
        // alert("Berhasil Dihapus");
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(err.data),
        });
      });
  };

  //-------------------------------SNOMED-------------------------------------------//

  const getSnomedDxpasien = (regId) => {
    axios
      .get(`${apiku}/EmrSnomed/Read/${regId}/true`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setsnomedDXPasien(res.data.result);
          console.log(res.data.result);
        } else {
          setsnomedDXPasien([]);
          // message.warning("Data Snomed DX Pasien Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data Snomed DX Pasien!");
        setsnomedDXPasien([]);
      });
  };

  const getSnomedProcPasien = (regId) => {
    axios
      .get(`${apiku}/EmrSnomed/Read/${regId}/false`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setsnomedProcedurPasien(res.data.result);
        } else {
          setsnomedProcedurPasien([]);
          // message.warning("Data Snomed procedure Pasien Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data Snomed Procedure Pasien!");
        setsnomedProcedurPasien([]);
      });
  };

  const getSnomedMaster = (skey) => {
    setloadingSnomed(true);
    axios
      .get(`${apiku}/MstSnomed/Lookup/${skey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setmstsnomed(res.data.result);
          setloadingSnomed(false);
          setloadingmstSnomed(false);
        } else {
          setmstsnomed([]);
          message.warning("Master Snomed Tidak Ditemukan!");
          setloadingmstSnomed(false);
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Master Snomed!");
        setmstsnomed([]);
        setloadingmstSnomed(false);
      });
  };

  const getSnomedMasterAtribut = (skey) => {
    axios
      .get(`${apiku}/MstSnomed/Read/${skey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setmstsnomedAtribut(res.data.result);
          console.log(res.data.result);
          setloadingAtrSnomed(false);
        } else {
          setmstsnomedAtribut([]);
          message.warning("Master Snomed Tidak Ditemukan!");
          setloadingAtrSnomed(false);
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Master Snomed!");
        setmstsnomedAtribut([]);
        setloadingAtrSnomed(false);
      });
  };

  const insertSnomedProc = (datasnomed, reg) => {
    setloadingSnomed(true);
    axios
      .post(`${apiku}/EmrSnomed/Snomed`, datasnomed, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getSnomedProcPasien(reg);
          setmodalPop(false);
          setloadingSnomed(false);
          console.log("ini proc", datasnomed);
          message.success("Berhasil Disimpan SnomedProc!");
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          setloadingSnomed(false);
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(err.data),
        });
        setloadingSnomed(false);
      });
  };

  const insertSnomedDX = (datasnomed, reg) => {
    setloadingSnomed(true);
    axios
      .post(`${apiku}/EmrSnomed/Snomed`, datasnomed, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getSnomedDxpasien(reg);
          setmodalPop(false);
          setloadingSnomed(false);
          console.log("ini dx", datasnomed);
          message.success("Berhasil Disimpan SnomedDx!");
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          setloadingSnomed(false);
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(err.data),
        });
        setloadingSnomed(false);
      });
  };

  const deletesnomedProc = (RedIg, snomedId) => {
    axios
      .delete(`${apiku}/EmrSnomed/Delete/${RedIg}/${snomedId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Dihapus!");
          getSnomedProcPasien(RedIg);
          setloadingSnomed(false);
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          setloadingSnomed(false);
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Gagal Disimpan!",
          content: "Terdapat gangguan koneksi data",
        });
      });
  };

  const deletesnomeddx = (RedIg, snomedId) => {
    axios
      .delete(`${apiku}/EmrSnomed/Delete/${RedIg}/${snomedId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Dihapus!");
          getSnomedDxpasien(RedIg);
          setloadingSnomed(false);
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          setloadingSnomed(false);
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Gagal Disimpan!",
          content: "Terdapat gangguan koneksi data",
        });
      });
  };

  return (
    <DiagnosaRIContext.Provider
      value={{
        diagnosa,
        prosedur,
        jendiagnosa,
        detdiagnosa,
        pilihdiagnosa,
        diag,
        kasus,
        pemeriksa,
        jenisdiagnosis,
        setDiagnosaKode,
        setKasus,
        setPemeriksa,
        setJenisDiagnosis,
        getDiagnosa,
        deleteDiagnosa,
        cariDiagnosa,
        insertDiagnosa,
        detailDiagnosa,
        snomedDXPasien,
        setsnomedDXPasien,
        mstsnomed,
        setmstsnomed,
        snomedProcedurPasien,
        setsnomedProcedurPasien,
        nomorSnomed,
        setnomorSnomed,
        noUrutSnomed,
        setnoUrutSnomed,
        snomedID,
        setsnomedID,
        isDX,
        setisDX,
        loadingSnomed,
        setloadingSnomed,
        getSnomedDxpasien,
        getSnomedProcPasien,
        getSnomedMaster,
        insertSnomedDX,
        insertSnomedProc,
        deletesnomedProc,
        deletesnomeddx,
        getSnomedMasterAtribut,
        mstsnomedAtribut,
        setmstsnomedAtribut,
        loadingmstSnomed,
        setloadingmstSnomed,
        loadingAtrSnomed,
        setloadingAtrSnomed,
        warnapilih,
        setwarnapilih,
        modalPop,
        setmodalPop,
      }}
    >
      {props.children}
    </DiagnosaRIContext.Provider>
  );
};

export default DiagnosaRIContextProvider;
