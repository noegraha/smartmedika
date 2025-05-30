import React, { createContext, useContext } from "react";
import axios from "axios";
import { message } from "antd";
import { LoginContext } from "../../rawatjalan/context";
import { useState } from "react";
import dayjs from "dayjs";
import { PasienRIContext } from "./PasienRIContext";
export const InsidenContext = createContext();

const InsidenContextProvider = (props) => {
  const { detailPasienRI, setCurpasRI } = useContext(PasienRIContext);
  const [listInsidenPasien, setlistInsidenPasien] = useState([]);
  const [detailInsidenPasien, setdetailInsidenPasien] = useState([]);
  const [modalDetail, setmodalDetail] = useState(false);
  const [visibleTanbah, setvisibleTanbah] = useState(false);
  const [cariNoreg, setcariNoreg] = useState("");
  const [pasienAda, setPasienAda] = useState(false);
  const [insidenId, setinsidenId] = useState(0);
  const [regisIdInsiden, setregisIdInsiden] = useState("");
  const [tanggalKejadian, setTanggalKejadian] = useState(dayjs());
  const [insiden, setInsiden] = useState("");
  const [kronologisInsiden, setKronologisInsiden] = useState("");
  const [jenisInsiden, setJenisInsiden] = useState("");
  const [pelaporInsiden, setPelaporInsiden] = useState("");
  // const [lainnyapelapor, setLainnyapelapor] = useState('');
  const [namaPelapor, setNamaPelapor] = useState("");
  const [korbanInsiden, setKorbanInsiden] = useState("");
  // const [lainyaKorban, setLainyaKorban] = useState('');
  const [namaKorban, setNamaKorban] = useState("");
  const [insidenTerkaitPasien, setInsidenTerkaitPasien] = useState("");
  // const [lainyaRuangKejadian, setLainyaRuangKejadian] = useState('');
  const [tempatKejadian, setTempatKejadian] = useState("");
  const [spesialisPenyakitInsiden, setSpesialisPenyakitInsiden] = useState("");
  // const [lainyaSubspesialis, setLainyaSubspesialis] = useState('');
  const [unitPenyebab, setUnitPenyebab] = useState("");
  const [akibatTerhadapPasien, setAkibatTerhadapPasien] = useState("");
  const [tindakanPascaInsiden, setTindakanPascaInsiden] = useState("");
  const [pelakuTindakan, setPelakuTindakan] = useState("");
  // const [lainyaPelakuTindakan, setLainyaPelakuTindakan] = useState('');
  const [namaPelakuTindakan, setNamaPelakuTindakan] = useState("");
  const [tidakanSerupa, setTidakanSerupa] = useState(false);
  // const [tanggalSebelumnya, setTanggalSebelumnya] = useState(dayjs());
  const [kronologiSebelumnya, setKronologiSebelumnya] = useState("");
  const [pembuatLaporan, setpembuatLaporan] = useState("");
  const [tglLaporan, settglLaporan] = useState(dayjs());
  const [penerimaLaporan, setpenerimaLaporan] = useState("");
  const [tglDiterima, settglDiterima] = useState(dayjs());
  const [print, setPrint] = useState(dayjs());

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  // const getprint = () => {
  //   setPrint('http://182.168.7.251:5000/parameter/1', options)
  //   console.log(options)
  // }

  const getprint = () => {
    axios
      .get(`${apiku}/GetUrl/1`, options)
      .then((res) => {
        setPrint(res.data.result);
        console.log(res.data);
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
      });
  };

  const getListInsiden = (bulan, tahun, ruang) => {
    axios
      .get(
        `${apiku}/EmrInsidenKeselamatanPasien/Lookup/${bulan}/${tahun}/${ruang}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistInsidenPasien(res.data.result);
          console.log(res.data.result);
        } else {
          setlistInsidenPasien([]);
          message.warning("Data Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
      });
  };

  const getInsidenDetail = (Id) => {
    axios
      .get(`${apiku}/EmrInsidenKeselamatanPasien/Read/${Id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setinsidenId(res.data.result.insidenId);
          // setregisIdInsiden(res.data.result.registrasiId);
          // setTanggalKejadian(dayjs(res.data.result.tanggal));
          // setInsiden(res.data.result.insiden);
          // setKronologisInsiden(res.data.result.kronologi);
          // setJenisInsiden(res.data.result.jenisInsiden);
          // setPelaporInsiden(res.data.result.pelapor);
          // setNamaPelapor(res.data.result.namaPelapor);
          // setKorbanInsiden(res.data.result.insidenPada);
          // setNamaKorban(res.data.result.namaKorban);
          // setInsidenTerkaitPasien(res.data.result.insidenTerkaitPasien);
          // setTempatKejadian(res.data.result.tempatKejadian);
          // setSpesialisPenyakitInsiden(res.data.result.spesialisPenyakitInsiden);
          // setUnitPenyebab(res.data.result.unitPenyebab);
          // setAkibatTerhadapPasien(res.data.result.akibatInsidenTerhadapPasien);
          // setTindakanPascaInsiden(res.data.result.tindakanPascaInsiden);
          // setPelakuTindakan(res.data.result.pelakuTindakan);
          // setNamaPelakuTindakan(res.data.result.namaPelakuTindakan);
          // setTidakanSerupa(res.data.result.pernahTerjadi);
          // setKronologiSebelumnya(res.data.result.tempatInsidenSebelumnya);
          // setpembuatLaporan(res.data.result.pembuatLaporan);
          // settglLaporan(dayjs(res.data.result.tglLaporan));
          // setpenerimaLaporan(res.data.result.penerimaLaporan);
          // settglDiterima(dayjs(res.data.result.tglDiterima));
          detailPasienRI(res.data.result.registrasiId);
          setdetailInsidenPasien(res.data.result);
          setmodalDetail(true);
        } else {
          setdetailInsidenPasien([]);
          setCurpasRI([]);
          message.warning("Data Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
      });
  };

  const insertInsiden = (dataInsiden) => {
    axios
      .post(`${apiku}/EmrInsidenKeselamatanPasien/`, dataInsiden, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Data Berhasil Disimpan!");
          console.log("berhasil", dataInsiden);
          getListInsiden(dayjs().format("MM"), dayjs().format("YYYY"), "%20");
        } else {
          message.error("Data Gagal Disimpan!");
          console.log("gagal", dataInsiden);
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengirim Data!");
        console.log("eror", dataInsiden);
      });
  };

  const kosongkanForm = () => {
    setCurpasRI([]);
    setcariNoreg("");
    setPasienAda(false);
    setinsidenId(0);
    setregisIdInsiden("");
    setTanggalKejadian(dayjs());
    setInsiden("");
    setKronologisInsiden("");
    setJenisInsiden("");
    setPelaporInsiden("");
    setNamaPelapor("");
    setKorbanInsiden("");
    setNamaKorban("");
    setInsidenTerkaitPasien("");
    setTempatKejadian("");
    setSpesialisPenyakitInsiden("");
    setUnitPenyebab("");
    setAkibatTerhadapPasien("");
    setTindakanPascaInsiden("");
    setPelakuTindakan("");
    setNamaPelakuTindakan("");
    setTidakanSerupa(false);
    setKronologiSebelumnya("");
  };
  return (
    <InsidenContext.Provider
      value={{
        getListInsiden,
        getInsidenDetail,
        insertInsiden,
        cariNoreg,
        setcariNoreg,
        regisIdInsiden,
        setregisIdInsiden,
        tanggalKejadian,
        setTanggalKejadian,
        insiden,
        setInsiden,
        kronologisInsiden,
        setKronologisInsiden,
        jenisInsiden,
        setJenisInsiden,
        pelaporInsiden,
        setPelaporInsiden,
        // lainnyapelapor, setLainnyapelapor,
        namaPelapor,
        setNamaPelapor,
        korbanInsiden,
        setKorbanInsiden,
        // lainyaKorban, setLainyaKorban,
        namaKorban,
        setNamaKorban,
        insidenTerkaitPasien,
        setInsidenTerkaitPasien,
        // lainyaRuangKejadian, setLainyaRuangKejadian,
        tempatKejadian,
        setTempatKejadian,
        spesialisPenyakitInsiden,
        setSpesialisPenyakitInsiden,
        // lainyaSubspesialis, setLainyaSubspesialis,
        unitPenyebab,
        setUnitPenyebab,
        akibatTerhadapPasien,
        setAkibatTerhadapPasien,
        tindakanPascaInsiden,
        setTindakanPascaInsiden,
        pelakuTindakan,
        setPelakuTindakan,
        // lainyaPelakuTindakan, setLainyaPelakuTindakan,
        namaPelakuTindakan,
        setNamaPelakuTindakan,
        tidakanSerupa,
        setTidakanSerupa,
        // tanggalSebelumnya, setTanggalSebelumnya,
        kronologiSebelumnya,
        setKronologiSebelumnya,
        pasienAda,
        setPasienAda,
        insidenId,
        setinsidenId,
        pembuatLaporan,
        setpembuatLaporan,
        tglLaporan,
        settglLaporan,
        penerimaLaporan,
        setpenerimaLaporan,
        tglDiterima,
        settglDiterima,
        listInsidenPasien,
        modalDetail,
        setmodalDetail,
        detailInsidenPasien,
        kosongkanForm,
        visibleTanbah,
        setvisibleTanbah,
        print,
        getprint,
      }}
    >
      {props.children}
    </InsidenContext.Provider>
  );
};

export default InsidenContextProvider;
