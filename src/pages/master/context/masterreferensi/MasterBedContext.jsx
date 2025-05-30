import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const MasterBedContext = createContext();

const MasterBedContextProvider = (props) => {
  const [bedList, setBedList] = useState([]);
  const [beddetail, setBedDetail] = useState([]);
  const [ruangList, setRuangList] = useState([]);
  const [ruangList2, setRuangList2] = useState([]);
  const [jenisbedList, setJenisBedList] = useState([]);
  const [golpasienList, setGolPasienList] = useState([]);

  const [loading, setLoading] = useState(false);
  const [loadingdetail, setLoadingDetail] = useState(false);
  const [warnarow, setWarnaRow] = useState(null);
  const [form, setForm] = useState(null);

  const [bedid, setBedID] = useState(null);
  const [ruangid, setRuangID] = useState(null);
  const [namakamar, setNamaKamar] = useState(null);
  const [kelasrawatid, setKelasRawatID] = useState(null);
  const [kelasrawat, setKelasRawat] = useState(null);
  const [kapasitas, setKapasitas] = useState(null);

  const [nosk, setNoSK] = useState(null);
  const [jenisbedid, setJenisBedID] = useState(null);
  const [golonganpasienid, setGolonganPasienID] = useState(null);
  const [kapasitasmax, setKapasitasMax] = useState(null);
  const [refresh, setRefresh] = useState();

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  //Ruang Context
  const getBed = (e) => {
    axios
      .get(`${apiku}/MstBed/Lookup/${e === " " ? "%20" : e}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBedList(res.data.result);
          console.log("bed", res.data.result);
          setLoading(false);
        } else {
          setBedList([]);
          message.warn("Data tidak Ditemukan");
          setLoading(false);
        }
      })
      .catch((err) => {
        setBedList([]);
        console.log(err);
        message.warn("Data Tidak Ditemukan");
        setLoading(false);
      });
  };

  const getBedDetail = (id, id2) => {
    axios
      .get(`${apiku}/MstBed/Read/${id}/${id2}`, options)
      .then((res) => {
        setBedDetail(res.data.result);
        console.log("Bed Detail?", res.data.result);
        setNoSK(res.data.result.noSK);
        setBedID(res.data.result.bedId);
        setRuangID(res.data.result.ruangId);
        setNamaKamar(res.data.result.namaKamar);
        setKelasRawatID(res.data.result.kelasRawatId);
        setKelasRawat(res.data.result.kelasRawat);
        setKapasitas(res.data.result.kapasitas);
        setKapasitasMax(res.data.result.kapasitasMax);
        setGolonganPasienID(res.data.result.golonganPasienId);
        setJenisBedID(res.data.result.jenisBedId);
        setLoadingDetail(false);
        setLoading(false);
      })
      .catch((err) => {
        setBedDetail([]);
        window.location.reload();
        setLoadingDetail(false);
        console.log(err);
        message.error("error");
      });
  };

  const insertBed = (databed) => {
    axios
      .post(`${apiku}/MstBed`, databed, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Diupdate!");
          setLoading(true);
          getBed(refresh != null ? refresh : ruangid);
          getBedDetail(bedid, kelasrawatid);
        } else {
          console.log(res.data.result);
          message.warn("Cek Lagi", res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Diupdate!");
      });
  };

  const insertBed2 = (databed2) => {
    axios
      .post(`${apiku}/MstBed`, databed2, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
          setForm(false);
          getBed(refresh);
        } else {
          console.log(res.data.result);
          message.warn("Cek Lagi", res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const getCurrentTime = (
    separator = "-",
    separator2 = ":",
    separator3 = "T"
  ) => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.getHours();
    let minute = newDate.getMinutes();
    let second = newDate.getSeconds();
    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}${separator3}${
      time < 10 ? `0${time}` : `${time}`
    }${separator2}${minute < 10 ? `0${minute}` : `${minute}`}${separator2}${
      second < 10 ? `0${second}` : `${second}`
    }`;
  };

  const getRuang = () => {
    axios
      .get(`${apiku}/MstRuang/Lookup/%20/1/1/200`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuangList(res.data.result);
          console.log("ruang", res.data.result);
        } else {
          setRuangList([]);
        }
      })
      .catch((err) => {
        setRuangList([]);
        console.log(err);
      });
  };

  const getRuang2 = (e) => {
    axios
      .get(`${apiku}/MstRuang/Lookup/%20/${e}/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuangList2(res.data.result);
          console.log("ruang", res.data.result);
        } else {
          setRuangList2([]);
        }
      })
      .catch((err) => {
        setRuangList2([]);
        console.log(err);
      });
  };

  const getJenisBed = () => {
    axios
      .get(`${apiku}/MstJenisBed/Lookup/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setJenisBedList(res.data.result);
          console.log("JenisbEd", res.data.result);
        } else {
          setJenisBedList([]);
        }
      })
      .catch((err) => {
        setJenisBedList([]);
        console.log(err);
      });
  };

  const getGolonganPasien = () => {
    axios
      .get(`${apiku}/MstGolonganPasien/Lookup/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setGolPasienList(res.data.result);
          console.log("JenisbEd", res.data.result);
        } else {
          setGolPasienList([]);
        }
      })
      .catch((err) => {
        setGolPasienList([]);
        console.log(err);
      });
  };

  const deleteBed = (e, e2) => {
    const promise = new Promise((resolve, reject) => {
      axios.delete(`${apiku}/MstBed/${e}/${e2}`, options).then(
        (result) => {
          resolve(result.data);
          if (result.data.statusCode === 200) {
            console.log(result.data.result);
            message.error("Berhasil Dihapus!");
            setForm(false);
            setLoading(true);
            getBed(ruangid);
          } else {
            message.error("Error");
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
    return promise;
  };

  return (
    <MasterBedContext.Provider
      value={{
        insertBed,
        insertBed2,
        getJenisBed,
        jenisbedList,
        getGolonganPasien,
        golpasienList,
        bedList,
        getBed,
        loading,
        setLoading,
        warnarow,
        setWarnaRow,
        getBedDetail,
        beddetail,
        setLoadingDetail,
        setForm,
        form,
        getCurrentTime,
        ruangList,
        ruangList2,
        getRuang,
        getRuang2,
        bedid,
        setNoSK,
        nosk,
        setRuangID,
        ruangid,
        setKelasRawatID,
        kelasrawatid,
        setJenisBedID,
        jenisbedid,
        setGolonganPasienID,
        golonganpasienid,
        setKapasitas,
        kapasitas,
        setKapasitasMax,
        kapasitasmax,
        deleteBed,
        namakamar,
        refresh,
        setRefresh,
      }}
    >
      {props.children}
    </MasterBedContext.Provider>
  );
};

export default MasterBedContextProvider;
