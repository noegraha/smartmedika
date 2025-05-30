import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { message, Modal } from "antd";
// import { LoginContext } from "./LoginContext";
// import { PasienContext } from '../context/PasienContext';
// import { message } from 'antd';

export const DiagnosaContext = createContext();

const DiagnosaContextProvider = (props) => {
  const [diagnosa, setDiagnosa] = useState([]);
  const [detdiagnosa, setDetailDiagnosa] = useState([]);
  const [jendiagnosa, setJenisDiagnosa] = useState([]);
  const [isidiagnosa, setIsiDiagnosa] = useState([]);
  const [prosedur, setProsedur] = useState([]);
  const [pilihdiagnosa, setPilihDiagnosa] = useState([]);
  const [diag, setDiagnosaKode] = useState(null);
  const [kasus, setKasus] = useState(null);
  const [pemeriksa, setPemeriksa] = useState(null);
  const [jenisdiagnosis, setJenisDiagnosis] = useState(null);
  const [kode, setKode] = useState(null);
  const [riwayatpenyakit, setRiwayatPenyakit] = useState([]);
  const [loadriwayat, setLoadRiwayat] = useState(false);
  const [loadingDiagnosa, setLoadingDiagnosa] = useState(false);
  // const ruangId = localStorage.getItem('ruangId');
  // const { curpas } = useContext(PasienContext);

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
      .get(`${apiku}/MstJenisDiagnosis/Lookup/ /1/10`, options)
      .then((res) => {
        setJenisDiagnosa(
          res.data.result.filter((item) => item.jenisDiagnosisId !== 3)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  const getMstJenisDiagnosa = () => {
    axios
      .get(`${apiku}/MstJenisDiagnosis/Lookup/ /1/10`, options)
      .then((res) => {
        setJenisDiagnosa(
          res.data.result.filter((item) => item.jenisDiagnosisId !== 3)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getDiagnosa = (ruang) => {
    axios
      .get(`${apiku}/MstUnitIcd/Lookup/${ruang}/1/9000`, options)
      .then((res) => {
        setDiagnosa(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const detailDiagnosa = (id) => {
    axios
      .get(`${apiku}/EmrDiagnosis/Read/${id}/1/10`, options)
      .then((res) => {
        setKode(res.data.statusCode);
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          setDetailDiagnosa(res.data.result);
          setPilihDiagnosa([]);
          setDiagnosaKode(null);
          setJenisDiagnosis(null);
          setKasus(null);
          setPemeriksa(null);
          setIsiDiagnosa(
            res.data.result
              .map(function (item) {
                return item["diagnosisDesk"];
              })
              .toString()
          );
        } else {
          setDetailDiagnosa([]);
          setPilihDiagnosa(null);
          setDiagnosaKode(null);
          setJenisDiagnosis(null);
          setKasus(null);
          setPemeriksa(null);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Mengambil!");
        setPilihDiagnosa(null);
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
    setLoadingDiagnosa(true);
    axios
      .post(`${apiku}/EmrDiagnosis`, datadiagnosa, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
          detailDiagnosa(res.data.result.registrasiId);
          setLoadingDiagnosa(false);
        } else {
          Modal.warning({ content: res.data.message });
          setLoadingDiagnosa(false);
        }
      })
      .catch((err) => {
        Modal.error({ content: "Gagal Disimpan!" });
        console.log(err);
        setLoadingDiagnosa(false);
      });
  };

  const deleteDiagnosa = (noreg, kodediagnosa) => {
    axios
      .delete(`${apiku}/EmrDiagnosis/${noreg}/${kodediagnosa}`, options)
      .then((res) => {
        console.log(res);
        detailDiagnosa(noreg);
        // setDetailDiagnosa(
        //   detdiagnosa.filter((item) => item.diagnosisId !== kodediagnosa)
        // );
        message.success(res.data.message);
        // alert("Berhasil Dihapus");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getRiwayatPenyakitbyId = (norm) => {
    setLoadRiwayat(true);
    axios
      .get(`${apiku}/EmrPasienAktif/Riwayat/PenyakitById/${norm}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRiwayatPenyakit(res.data.result);
          setLoadRiwayat(false);
        } else {
          setRiwayatPenyakit([]);
          setLoadRiwayat(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadRiwayat(false);
        setRiwayatPenyakit([]);
      });
  };

  return (
    <DiagnosaContext.Provider
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
        isidiagnosa,
        riwayatpenyakit,
        loadriwayat,
        loadingDiagnosa,
        kode,
        getRiwayatPenyakitbyId,
        setDiagnosaKode,
        setKasus,
        setPemeriksa,
        setJenisDiagnosis,
        setProsedur,
        getDiagnosa,
        deleteDiagnosa,
        cariDiagnosa,
        insertDiagnosa,
        getMstJenisDiagnosa,
        detailDiagnosa,
      }}
    >
      {props.children}
    </DiagnosaContext.Provider>
  );
};

export default DiagnosaContextProvider;
