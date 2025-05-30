import React, { createContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";

export const MasterDokterContext = createContext();

const MasterDokterContextProvider = (props) => {
  const [listSpesialis, setlistSpesialis] = useState([]);
  const [listSpesialisDBRS, setlistSpesialisDBRS] = useState([]);
  const [listSpesialisAll, setlistSpesialisAll] = useState([]);
  const [listdokterSpesialis, setlistdokterSpesialis] = useState([]);
  const [listdokterSpesialisDBRS, setlistdokterSpesialisDBRS] = useState([]);

  const [namadokterSpesialis, setnamadokterSpesialis] = useState([]);
  const [enrollDokter, setenrollDokter] = useState("");
  const [descriptorDokter, setdescriptorDokter] = useState([]);

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const getListSpesialis = (id) => {
    axios
      .get(`${apiku}/MstDokterSpesialis/Lookup/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistSpesialis(res.data.result);
          console.log(res.data.result);
        } else {
          message.warning("Data Tidak Ditemukan!");
          setlistSpesialis([]);
        }
      })
      .catch((err) => {
        setlistSpesialis([]);
        message.error("Error Saat Mengambil Data Anamnesa!");
        message.error(err);
      });
  };

  const getListSpesialisDBRS = (id) => {
    axios
      .get(`${apiku}/MstDokterSpesialisDetail/LookupSpesialisDBRS`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistSpesialisDBRS(res.data.result);
        } else {
          // message.warning("Data Tidak Ditemukan!");
          setlistSpesialisDBRS([]);
        }
      })
      .catch((err) => {
        setlistSpesialis([]);
        message.error("Error Saat Mengambil Data Anamnesa!");
        message.error(err);
      });
  };

  const getListSpesialisAll = (id) => {
    axios
      .get(`${apiku}/MstDokterSpesialisDetail/LookupSpesialisAll`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistSpesialisAll(res.data.result);
          console.log(res.data.result);
        } else {
          // message.warning("Data Tidak Ditemukan!");
          setlistSpesialisAll([]);
        }
      })
      .catch((err) => {
        setlistSpesialisAll([]);
        message.error("Error Saat Mengambil Data Anamnesa!");
      });
  };

  const getDokterBySpesialisId = (id) => {
    axios
      .get(`${apiku}/MstDokterSpesialisDetail/LookupBySpesialis/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistdokterSpesialis(res.data.result);
        } else {
          message.warning("Data Tidak Ditemukan!");
          setlistdokterSpesialis([]);
        }
      })
      .catch((err) => {
        setlistdokterSpesialis([]);
        message.error("Error Saat Mengambil Data Anamnesa!");
        message.error(err);
      });
  };

  const getDokterBySpesialisIdDBRS = (id) => {
    axios
      .get(
        `${apiku}/MstDokterSpesialisDetail/LookupDokterSpesialis/${id}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistdokterSpesialisDBRS(res.data.result);
        } else {
          message.warning("Data Tidak Ditemukan!");
          setlistdokterSpesialisDBRS([]);
        }
      })
      .catch((err) => {
        setlistdokterSpesialisDBRS([]);
        message.error("Error Saat Mengambil Data Anamnesa!");
        message.error(err);
      });
  };

  const getDokterSpesialis = (sKey) => {
    axios
      .get(`${apiku}/MstDokterSpesialisDetail/LookupSpesialis/${sKey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setnamadokterSpesialis(res.data.result);
        } else {
          message.warning("Data Tidak Ditemukan!");
          setnamadokterSpesialis([]);
        }
      })
      .catch((err) => {
        setnamadokterSpesialis([]);
        message.error("Error Saat Mengambil Data Anamnesa!");
        message.error(err);
      });
  };

  const getEnrolDokter = (sKey) => {
    console.log("masuk", sKey);
    axios
      .get(`${apiku}/FaceRecognition/Read/${sKey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setenrollDokter(res.data.result);
          console.log("berhasil");
          console.log(res.data.result);
        } else {
          setenrollDokter("");
          console.log("warning");
          setdescriptorDokter([]);
        }
      })
      .catch((err) => {
        console.log("eror", err);
        setenrollDokter("");
        setdescriptorDokter([]);
      });
  };

  const insertEnrolDokter = (dataenrol) => {
    axios
      .post(`${apiku}/FaceRecognition/PostEnroll`, dataenrol, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            content: "Berhasil Simpan Data Enroll!",
          });
          getEnrolDokter(dataenrol.userId);
        } else {
          Modal.warning({
            content: "Gagal Data Enroll!",
          });
        }
      })
      .catch((err) => {
        Modal.error({
          content: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  return (
    <MasterDokterContext.Provider
      value={{
        listSpesialis,
        setlistSpesialis,
        getListSpesialis,
        listdokterSpesialis,
        setlistdokterSpesialis,
        getDokterBySpesialisId,
        getDokterSpesialis,
        namadokterSpesialis,
        setnamadokterSpesialis,
        listSpesialisDBRS,
        setlistSpesialisDBRS,
        getListSpesialisDBRS,
        getDokterBySpesialisIdDBRS,
        listdokterSpesialisDBRS,
        setlistdokterSpesialisDBRS,
        getEnrolDokter,
        insertEnrolDokter,
        enrollDokter,
        setenrollDokter,
        descriptorDokter,
        setdescriptorDokter,
        getListSpesialisAll,
        setlistSpesialisAll,
        listSpesialisAll,
      }}
    >
      {props.children}
    </MasterDokterContext.Provider>
  );
};

export default MasterDokterContextProvider;
