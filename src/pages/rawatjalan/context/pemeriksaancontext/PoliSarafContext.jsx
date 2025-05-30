import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const PoliSarafContext = createContext();

const PoliSarafContextProvider = (props) => {
  const [nomor, setnomor] = useState("");
  const [prevEeg, setprevEeg] = useState("");
  const [riwayat, setriwayat] = useState("");
  const [eegke, seteegke] = useState("");
  const [tanggalPemeriksaan, settanggalPemeriksaan] = useState("");
  const [refrdr, setrefrdr] = useState("");
  const [dokterPemeriksa, setdokterPemeriksa] = useState("");
  const [ruangId, setruangId] = useState("");
  const [sedation, setsedation] = useState("");
  const [medication, setmedication] = useState("");
  const [hveffort, sethveffort] = useState("");
  const [photicDrive, setphoticDrive] = useState("");
  const [stateConscious, setstateConscious] = useState("");
  const [techComment, settechComment] = useState("");
  const [technologist, settechnologist] = useState("");

  const [kondak1, setkondak1] = useState("Bangun");
  const [aktifDsr1, setaktifDsr1] = useState("");
  const [frekuensi1, setfrekuensi1] = useState("");
  const [voltase1, setvoltase1] = useState("");
  const [distribusi1, setdistribusi1] = useState("");
  const [keterangan1, setketerangan1] = useState("");
  const [kondak2, setkondak2] = useState("Mengantuk");
  const [aktifDsr2, setaktifDsr2] = useState("");
  const [frekuensi2, setfrekuensi2] = useState("");
  const [voltase2, setvoltase2] = useState("");
  const [distribusi2, setdistribusi2] = useState("");
  const [keterangan2, setketerangan2] = useState("");
  const [kondak3, setkondak3] = useState("Tidur");
  const [aktifDsr3, setaktifDsr3] = useState("");
  const [frekuensi3, setfrekuensi3] = useState("");
  const [voltase3, setvoltase3] = useState("");
  const [distribusi3, setdistribusi3] = useState("");
  const [keterangan3, setketerangan3] = useState("");
  const [kondak4, setkondak4] = useState("Hiperventilasi");
  const [aktifDsr4, setaktifDsr4] = useState("");
  const [frekuensi4, setfrekuensi4] = useState("");
  const [voltase4, setvoltase4] = useState("");
  const [distribusi4, setdistribusi4] = useState("");
  const [keterangan4, setketerangan4] = useState("");
  const [kondak5, setkondak5] = useState("Stimulasi Fotik");
  const [aktifDsr5, setaktifDsr5] = useState("");
  const [frekuensi5, setfrekuensi5] = useState("");
  const [voltase5, setvoltase5] = useState("");
  const [distribusi5, setdistribusi5] = useState("");
  const [keterangan5, setketerangan5] = useState("");

  const [klasifikasi, setklasifikasi] = useState("");
  const [kesan, setkesan] = useState("");
  const [namaPhysician, setnamaPhysician] = useState("");
  const [tglctk, settglctk] = useState("");
  const [ttdimg, setttdimg] = useState("");
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailSaraf = (id) => {
    axios
      .get(`${apiku}/EmrPemeriksaanKhusus/Saraf/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          // setnomor(res.data.result[0].nomor);
          setprevEeg(res.data.result[0].prevEeg);
          setriwayat(res.data.result[0].riwayat);
          seteegke(res.data.result[0].eegke);
          settanggalPemeriksaan(res.data.result[0].tanggalPemeriksaan);
          setrefrdr(res.data.result[0].refrdr);
          setdokterPemeriksa(res.data.result[0].dokterPemeriksa);
          setruangId(res.data.result[0].ruangId);
          setsedation(res.data.result[0].sedation);
          setmedication(res.data.result[0].medication);
          sethveffort(res.data.result[0].hveffort);
          setphoticDrive(res.data.result[0].photicDrive);
          setstateConscious(res.data.result[0].stateConscious);
          settechComment(res.data.result[0].techComment);
          settechnologist(res.data.result[0].technologist);

          setkondak1(res.data.result[0].kondak);
          setaktifDsr1(res.data.result[0].aktifDsr);
          setfrekuensi1(res.data.result[0].frekuensi);
          setvoltase1(res.data.result[0].voltase);
          setdistribusi1(res.data.result[0].distribusi);
          setketerangan1(res.data.result[0].keterangan);
          setkondak2(res.data.result[1].kondak);
          setaktifDsr2(res.data.result[1].aktifDsr);
          setfrekuensi2(res.data.result[1].frekuensi);
          setvoltase2(res.data.result[1].voltase);
          setdistribusi2(res.data.result[1].distribusi);
          setketerangan2(res.data.result[1].keterangan);
          setkondak3(res.data.result[2].kondak);
          setaktifDsr3(res.data.result[2].aktifDsr);
          setfrekuensi3(res.data.result[2].frekuensi);
          setvoltase3(res.data.result[2].voltase);
          setdistribusi3(res.data.result[2].distribusi);
          setketerangan3(res.data.result[2].keterangan);
          setkondak4(res.data.result[3].kondak);
          setaktifDsr4(res.data.result[3].aktifDsr);
          setfrekuensi4(res.data.result[3].frekuensi);
          setvoltase4(res.data.result[3].voltase);
          setdistribusi4(res.data.result[3].distribusi);
          setketerangan4(res.data.result[3].keterangan);
          setkondak5(res.data.result[4].kondak);
          setaktifDsr5(res.data.result[4].aktifDsr);
          setfrekuensi5(res.data.result[4].frekuensi);
          setvoltase5(res.data.result[4].voltase);
          setdistribusi5(res.data.result[4].distribusi);
          setketerangan5(res.data.result[4].keterangan);

          setklasifikasi(res.data.result[0].klasifikasi);
          setkesan(res.data.result[0].kesan);
          setnamaPhysician(res.data.result[0].namaPhysician);
          settglctk(res.data.result[0].tglctk);
          setttdimg(res.data.result[0].ttdimg);
        } else {
          setnomor([]);
          setprevEeg([]);
          setriwayat([]);
          seteegke([]);
          settanggalPemeriksaan([]);
          setrefrdr([]);
          setdokterPemeriksa([]);
          setruangId([]);
          setsedation([]);
          setmedication([]);
          sethveffort([]);
          setphoticDrive([]);
          setstateConscious([]);
          settechComment([]);
          settechnologist([]);

          setkondak1(null);
          setaktifDsr1(null);
          setfrekuensi1(null);
          setvoltase1(null);
          setdistribusi1(null);
          setketerangan1(null);
          setkondak2(null);
          setaktifDsr2(null);
          setfrekuensi2(null);
          setvoltase2(null);
          setdistribusi2(null);
          setketerangan2(null);
          setkondak3(null);
          setaktifDsr3(null);
          setfrekuensi3(null);
          setvoltase3(null);
          setdistribusi3(null);
          setketerangan3(null);
          setkondak4(null);
          setaktifDsr4(null);
          setfrekuensi4(null);
          setvoltase4(null);
          setdistribusi4(null);
          setketerangan4(null);
          setkondak5(null);
          setaktifDsr5(null);
          setfrekuensi5(null);
          setvoltase5(null);
          setdistribusi5(null);
          setketerangan5(null);

          setklasifikasi([]);
          setkesan([]);
          setnamaPhysician([]);
          settglctk([]);
          setttdimg([]);
        }
      })
      .catch((err) => {
        setnomor([]);
        setprevEeg([]);
        setriwayat([]);
        seteegke([]);
        settanggalPemeriksaan([]);
        setrefrdr([]);
        setdokterPemeriksa([]);
        setruangId([]);
        setsedation([]);
        setmedication([]);
        sethveffort([]);
        setphoticDrive([]);
        setstateConscious([]);
        settechComment([]);
        settechnologist([]);
        setkondak1(null);
        setaktifDsr1(null);
        setfrekuensi1(null);
        setvoltase1(null);
        setdistribusi1(null);
        setketerangan1(null);
        setkondak2(null);
        setaktifDsr2(null);
        setfrekuensi2(null);
        setvoltase2(null);
        setdistribusi2(null);
        setketerangan2(null);
        setkondak3(null);
        setaktifDsr3(null);
        setfrekuensi3(null);
        setvoltase3(null);
        setdistribusi3(null);
        setketerangan3(null);
        setkondak4(null);
        setaktifDsr4(null);
        setfrekuensi4(null);
        setvoltase4(null);
        setdistribusi4(null);
        setketerangan4(null);
        setkondak5(null);
        setaktifDsr5(null);
        setfrekuensi5(null);
        setvoltase5(null);
        setdistribusi5(null);
        setketerangan5(null);
        setkesan([]);
        setnamaPhysician([]);
        settglctk([]);
        setttdimg([]);
      });
  };

  const insertSaraf = (datasaraf) => {
    axios
      .post(`${apiku}/EmrPemeriksaanKhusus/Saraf`, datasaraf, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
        } else {
          console.log(res.data);
          message.warning("Gagal Disimpan!");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  return (
    <PoliSarafContext.Provider
      value={{
        detailSaraf,
        insertSaraf,
        nomor,
        setnomor,
        prevEeg,
        setprevEeg,
        riwayat,
        setriwayat,
        eegke,
        seteegke,
        tanggalPemeriksaan,
        settanggalPemeriksaan,
        refrdr,
        setrefrdr,
        dokterPemeriksa,
        setdokterPemeriksa,
        ruangId,
        setruangId,
        sedation,
        setsedation,
        medication,
        setmedication,
        hveffort,
        sethveffort,
        photicDrive,
        setphoticDrive,
        stateConscious,
        setstateConscious,
        techComment,
        settechComment,
        technologist,
        settechnologist,
        kondak1,
        setkondak1,
        aktifDsr1,
        setaktifDsr1,
        frekuensi1,
        setfrekuensi1,
        voltase1,
        setvoltase1,
        distribusi1,
        setdistribusi1,
        keterangan1,
        setketerangan1,
        kondak2,
        setkondak2,
        aktifDsr2,
        setaktifDsr2,
        frekuensi2,
        setfrekuensi2,
        voltase2,
        setvoltase2,
        distribusi2,
        setdistribusi2,
        keterangan2,
        setketerangan2,
        kondak3,
        setkondak3,
        aktifDsr3,
        setaktifDsr3,
        frekuensi3,
        setfrekuensi3,
        voltase3,
        setvoltase3,
        distribusi3,
        setdistribusi3,
        keterangan3,
        setketerangan3,
        kondak4,
        setkondak4,
        aktifDsr4,
        setaktifDsr4,
        frekuensi4,
        setfrekuensi4,
        voltase4,
        setvoltase4,
        distribusi4,
        setdistribusi4,
        keterangan4,
        setketerangan4,
        kondak5,
        setkondak5,
        aktifDsr5,
        setaktifDsr5,
        frekuensi5,
        setfrekuensi5,
        voltase5,
        setvoltase5,
        distribusi5,
        setdistribusi5,
        keterangan5,
        setketerangan5,
        klasifikasi,
        setklasifikasi,
        kesan,
        setkesan,
        namaPhysician,
        setnamaPhysician,
        tglctk,
        settglctk,
        ttdimg,
        setttdimg,
      }}
    >
      {props.children}
    </PoliSarafContext.Provider>
  );
};

export default PoliSarafContextProvider;
