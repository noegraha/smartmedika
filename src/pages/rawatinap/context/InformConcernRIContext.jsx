import React, { createContext, useState, useContext } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import { PasienRIContext } from "./PasienRIContext";
import dayjs from "dayjs";
import { LoginContext } from "../../rawatjalan/context";

export const InformRIContext = createContext();

const InformRIContextProvider = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser, sendTele } = useContext(LoginContext);
  const { curpasRI } = useContext(PasienRIContext);

  const [namaPenandaTangan, setnamaPenandaTangan] = useState("");
  const [umur, setumur] = useState("");
  const [alamat, setalamat] = useState("");
  const [hubunganId, sethubunganId] = useState("-");
  const [persetujuan, setpersetujuan] = useState("Tidak Menyetujui");
  const [namaPerawat, setnamaPerawat] = useState("");
  const [ttdPasien, setttdPasien] = useState("");
  const [ttdPerawat, setttdPerawat] = useState("");
  const [hapus, sethapus] = useState(false);
  const [userId, setuserId] = useState("");
  const [jamInform, setjamInform] = useState(dayjs());
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailInformRI = (noreg) => {
    axios
      .get(`${apiku}/EmrInformConsern/ReadKonsultasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setnamaPenandaTangan(res.data.result.namaPenandaTangan);
          setumur(res.data.result.umur);
          setalamat(res.data.result.alamat);
          sethubunganId(res.data.result.hubunganId);
          setpersetujuan(res.data.result.persetujuan);
          setnamaPerawat(res.data.result.namaPerawat);
          setuserId(res.data.result.userId);
          setjamInform(res.data.result.tanggal);
          console.log(res.data.result);
        } else {
          setnamaPenandaTangan("");
          setumur("");
          setalamat("");
          sethubunganId("-");
          setpersetujuan("Tidak Menyetujui");
          setnamaPerawat("");
          sethapus(false);
          setjamInform(dayjs());
          console.log("InformRIContext");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data Anamnesa!");
        // console.log('InformRIContexterror')
        // message.error(err);
      });
  };
  const insertInformRI = (data) => {
    axios
      .post(`${apiku}/EmrInformConsern/RI`, data, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //   console.log(data);
          Modal.success({
            content: "Berhasil Simpan Data Informasi Umum!",
          });
        } else {
          sendTele(
            "3",
            "EmrInformConsern/RI",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(data)
          );
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

  const kosongkanformInformRI = () => {
    setnamaPenandaTangan("");
    setumur("");
    setalamat("");
    sethubunganId("-");
    setpersetujuan("Tidak Menyetujui");
    setnamaPerawat("");
    sethapus(false);
    // setuserId('');
    setjamInform(dayjs());
  };

  return (
    <InformRIContext.Provider
      value={{
        detailInformRI,
        insertInformRI,
        kosongkanformInformRI,
        namaPenandaTangan,
        setnamaPenandaTangan,
        umur,
        setumur,
        alamat,
        setalamat,
        hubunganId,
        sethubunganId,
        persetujuan,
        setpersetujuan,
        namaPerawat,
        setnamaPerawat,
        ttdPasien,
        setttdPasien,
        ttdPerawat,
        setttdPerawat,
        hapus,
        sethapus,
        userId,
        setuserId,
        jamInform,
        setjamInform,
      }}
    >
      {props.children}
    </InformRIContext.Provider>
  );
};

export default InformRIContextProvider;
