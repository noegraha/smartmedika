import React, { createContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";

export const PoliTHTContext = createContext();

const PoliTHTContextProvider = (props) => {
  const [rowhasil, setrowhasil] = useState("");
  const [registrasiId, setregistrasiId] = useState("");
  const [pelayananId, setpelayananId] = useState("");
  const [ruangId, setruangId] = useState("");
  const [hasilId, sethasilId] = useState("");
  const [noPemeriksaan, setnoPemeriksaan] = useState("");
  const [noHasil, setnoHasil] = useState("");
  const [tanggalPemeriksaan, settanggalPemeriksaan] = useState("");
  const [dokterId, setdokterId] = useState("");
  const [keteranganHasil, setketeranganHasil] = useState("");
  const [userId, setuserId] = useState("");
  const [unitPengirim, setunitPengirim] = useState("");
  const [dokterKirim, setdokterKirim] = useState("");
  const [jenisHasil, setjenisHasil] = useState("");
  const [ketulianKanan, setketulianKanan] = useState("");
  const [ketulianKiri, setketulianKiri] = useState("");
  const [tingkatKanan, settingkatKanan] = useState("");
  const [tingkatKiri, settingkatKiri] = useState("");
  const [ttdImg, setttdImg] = useState("");
  const [dateEntry, setdateEntry] = useState("");
  const [clientName, setclientName] = useState("");
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailTHT = (id) => {
    axios
      .get(`${apiku}/EmrPemeriksaanKhusus/Telinga/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setrowhasil(res.data.result.rowhasil);
          setregistrasiId(res.data.result.registrasiId);
          setpelayananId(res.data.result.pelayananId);
          setruangId(res.data.result.ruangId);
          sethasilId(res.data.result.hasilId);
          setnoPemeriksaan(res.data.result.noPemeriksaan);
          setnoHasil(res.data.result.noHasil);
          settanggalPemeriksaan(res.data.result.tanggalPemeriksaan);
          setdokterId(res.data.result.dokterId);
          setketeranganHasil(res.data.result.keteranganHasil);
          setuserId(res.data.result.userId);
          setunitPengirim(res.data.result.unitPengirim);
          setdokterKirim(res.data.result.dokterKirim);
          setjenisHasil(res.data.result.jenisHasil);
          setketulianKanan(res.data.result.ketulianKanan);
          setketulianKiri(res.data.result.ketulianKiri);
          settingkatKanan(res.data.result.tingkatKanan);
          settingkatKiri(res.data.result.tingkatKiri);
          setttdImg(res.data.result.ttdImg);
        } else {
          setrowhasil(null);
          setregistrasiId(null);
          setpelayananId(null);
          setruangId(null);
          sethasilId(null);
          setnoPemeriksaan(null);
          setnoHasil(null);
          settanggalPemeriksaan(null);
          setdokterId(null);
          setketeranganHasil(null);
          setuserId(null);
          setunitPengirim(null);
          setdokterKirim(null);
          setjenisHasil(null);
          setketulianKanan(null);
          setketulianKiri(null);
          settingkatKanan(null);
          settingkatKiri(null);
          setttdImg(null);
        }
      })
      .catch((err) => {
        setrowhasil(null);
        setregistrasiId(null);
        setpelayananId(null);
        setruangId(null);
        sethasilId(null);
        setnoPemeriksaan(null);
        setnoHasil(null);
        settanggalPemeriksaan(null);
        setdokterId(null);
        setketeranganHasil(null);
        setuserId(null);
        setunitPengirim(null);
        setdokterKirim(null);
        setjenisHasil(null);
        setketulianKanan(null);
        setketulianKiri(null);
        settingkatKanan(null);
        settingkatKiri(null);
        setttdImg(null);
      });
  };

  const insertTHT = (dataTHT) => {
    axios
      .post(`${apiku}/EmrPemeriksaanKhusus/Telinga`, dataTHT, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil disimpan!");
        } else {
          Modal.warning({ title: res.data.message, content: res.data.result });
          console.log(res.data);
        }
      })
      .catch((err) => {
        Modal.error({ content: "Gagal Disimpan!" });
        console.log(err);
      });
  };

  return (
    <PoliTHTContext.Provider
      value={{
        rowhasil,
        setrowhasil,
        registrasiId,
        setregistrasiId,
        pelayananId,
        setpelayananId,
        ruangId,
        setruangId,
        hasilId,
        sethasilId,
        noPemeriksaan,
        setnoPemeriksaan,
        noHasil,
        setnoHasil,
        tanggalPemeriksaan,
        settanggalPemeriksaan,
        dokterId,
        setdokterId,
        keteranganHasil,
        setketeranganHasil,
        userId,
        setuserId,
        unitPengirim,
        setunitPengirim,
        dokterKirim,
        setdokterKirim,
        jenisHasil,
        setjenisHasil,
        ketulianKanan,
        setketulianKanan,
        ketulianKiri,
        setketulianKiri,
        tingkatKanan,
        settingkatKanan,
        tingkatKiri,
        settingkatKiri,
        ttdImg,
        setttdImg,
        dateEntry,
        setdateEntry,
        clientName,
        setclientName,
        detailTHT,
        insertTHT,
      }}
    >
      {props.children}
    </PoliTHTContext.Provider>
  );
};

export default PoliTHTContextProvider;
