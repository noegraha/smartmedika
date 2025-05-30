import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { createContext } from "react";
import dayjs from "dayjs";
import { LoginContext } from "../../../rawatjalan/context";
import axios from "axios";
import { Modal } from "antd";

export const BridgingSITBContext = createContext();

const endpoint = process.env.REACT_APP_API_BASE_LOCAL;

const BridgingSITBContextProvider = (props) => {
  const { token, namauser } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  // state
  const [blnPeriode, setblnPeriode] = useState(dayjs());
  const [listPasien, setlistPasien] = useState([]);
  const [nama, setnama] = useState("");
  const [noSitb, setnoSitb] = useState("");
  const [noreg, setnoreg] = useState("");
  const [nik, setnik] = useState("");
  const [noRm, setnoRm] = useState("");
  const [tglLahir, settglLahir] = useState("");
  const [jenisKelamin, setjenisKelamin] = useState("");
  const [alamat, setalamat] = useState("");
  const [umur, setumur] = useState("");
  const [desaId, setdesaId] = useState("");
  const [listSitb, setlistSitb] = useState([]);
  // form kirim data
  const [idEmr, setidEmr] = useState("");
  const [idTb03, setidTb03] = useState("");
  const [idProvFaskes, setidProvFaskes] = useState("33");
  const [idKabFaskes, setidKabFaskes] = useState("3302");
  const [idProvPx, setidProvPx] = useState("");
  const [idKabPx, setidKabPx] = useState("");
  const [idFaskes, setidFaskes] = useState("3302026");
  const [icdx, seticdx] = useState("");
  const [tipeDx, settipeDx] = useState("");
  const [lokasiAnatomi, setlokasiAnatomi] = useState("");
  const [riwPengobatan, setriwPengobatan] = useState("");
  const [tglPengobatan, settglPengobatan] = useState(dayjs());
  const [panduanOat, setpanduanOat] = useState("");
  const [sblmHasilMikropis, setsblmHasilMikropis] = useState("");
  const [sblmHasilTesCepat, setsblmHasilTesCepat] = useState("");
  const [sblmHasilBiakan, setsblmHasilBiakan] = useState("");
  const [mikropis2, setmikropis2] = useState("");
  const [mikropis3, setmikropis3] = useState("");
  const [mikropis5, setmikropis5] = useState("");
  const [akhirMikropis, setakhirMikropis] = useState("");
  const [tglAkhir, settglAkhir] = useState(dayjs("2000-01-01"));
  const [hasilAkhir, sethasilAkhir] = useState("");
  const [fotoThorak, setfotoThorak] = useState("");
  const [ipKomp, setipKomp] = useState(ip);
  const [hostKomp, sethost] = useState(host);
  const [userId, setuserId] = useState(namauser);
  // sp
  const [spListPasien, setspListPasien] = useState(false);
  const [spDetailPasien, setspDetailPasien] = useState(false);
  const [spListEmrSitb, setspListEmrSitb] = useState(false);
  const [spInputSitb, setspInputSitb] = useState(false);
  // md
  const [mdDetailPx, setmdDetailPx] = useState(false);
  const [mdFormInput, setmdFormInput] = useState(false);

  // func
  const getListPasien = (data) => {
    setspListPasien(true);
    axios
      .get(`${endpoint}/EmrTuberkulosis/GetPasienTb/${data}`, options)
      .then((response) => {
        setspListPasien(false);
        console.log("getListPasien ", response.data);
        // setspHeaderPasien(false)
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            Modal.info({
              title: "Informasi",
              content: "Tidak ada data Daftar Pasien Kategori TB.",
            });
          } else {
            setlistPasien(response.data.result);
          }
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data Pasien Kategori TB -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspListPasien(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data Pasien Kategori TB! -> ${err}`,
        });
      });
  };

  const getDetailPasien = (pxId, dxId) => {
    setspDetailPasien(true);
    axios
      .get(`${endpoint}/EmrTuberkulosis/GetDetailTb/${pxId}/${dxId}`, options)
      .then((response) => {
        setspDetailPasien(false);
        console.log("getDetailPasien ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            Modal.info({
              title: "Informasi",
              content: "Tidak ada data Detail Pasien Kategori TB.",
            });
          } else {
            setnoSitb(response.data.result.NoSITB);
            setnik(response.data.result.Nik);
            settglLahir(response.data.result.TanggalLahir);
            setjenisKelamin(response.data.result.JenisKelamin);
            setumur(response.data.result.Umur);
            setidProvPx(response.data.result.DesaId.substring(0, 2));
            setidKabPx(response.data.result.DesaId.substring(0, 4));
            settipeDx(response.data.result.TipeDiagnosa);
            setlokasiAnatomi(response.data.result.LokasiAnatomi);
            setlistSitb(response.data.result.ListEmrSITB);
          }
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data Pasien Kategori TB -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspDetailPasien(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil detail Pasien TB! -> ${err}`,
        });
      });
  };

  const getListEmrSitb = (pxId) => {
    setspListEmrSitb(true);
    axios
      .get(`${endpoint}/EmrTuberkulosis/GetListSitb/${pxId}`, options)
      .then((response) => {
        setspListEmrSitb(false);
        console.log("getListEmrSitb ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            Modal.info({
              title: "Informasi",
              content: "Tidak ada data Emr SITB.",
            });
          } else {
            setlistSitb(response.data.result);
          }
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data List SITB -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspListEmrSitb(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data List SITB! -> ${err}`,
        });
      });
  };

  const getDetailEmrSitb = (sId) => {
    setspInputSitb(true);
    axios
      .get(`${endpoint}/EmrTuberkulosis/GetDetailEmrSitb/${sId}`, options)
      .then((response) => {
        setspInputSitb(false);
        console.log("getDetailEmrSitb ", response.data);
        if (response.data.statusCode === 200) {
          setmdFormInput(true);
          setidEmr(response.data.result.Id);
          setidTb03(response.data.result.Tb03Id);
          seticdx(response.data.result.DiagnosisId);
          settipeDx(response.data.result.TipeDiagnosa);
          setlokasiAnatomi(response.data.result.LokasiAnatomi);
          setriwPengobatan(response.data.result.Riwayat);
          settglPengobatan(response.data.result.TglMulai);
          setpanduanOat(response.data.result.PanduanOat);
          setsblmHasilMikropis(response.data.result.SebelumHasilMikroskopis);
          setsblmHasilTesCepat(response.data.result.SebelumHasilTesCepat);
          setsblmHasilBiakan(response.data.result.SebelumHasilBiakan);
          setmikropis2(response.data.result.HasilMikropisBulan2);
          setmikropis3(response.data.result.HasilMikropisBulan3);
          setmikropis5(response.data.result.HasilMikropisBulan5);
          setakhirMikropis(response.data.result.HasilAkhir);
          settglAkhir(
            response.data.result.TglHasilAkhir === null
              ? "2020-01-01"
              : response.data.result.TglHasilAkhir
          );
          sethasilAkhir(response.data.result.HasilAkhir);
          setfotoThorak(response.data.result.HasilFotoToraks);
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil detail Emr SITB -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspInputSitb(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil detail Emr SITB! -> ${err}`,
        });
      });
  };

  const bridgeSitb = (data) => {
    setspInputSitb(true);
    axios
      .post(`${endpoint}/SITB`, data, {
        headers: options.headers,
      })
      .then((res) => {
        setspInputSitb(false);
        console.log("bridgeSitb : ", res.data);
        if (
          res.data.result.status === "berhasil" ||
          res.data.result.status === "update berhasil"
        ) {
          setspInputSitb(false);
          Modal.success({
            title: "Sukses",
            content: "Berhasil KIRIM data SITB.",
            onOk: () => {
              let data1 = {};
              data1.tb03Id = res.data.result.id_tb_03;
              data1.pasienId = noRm;
              data1.diagnosisId = icdx;
              data1.riwayat = riwPengobatan.toString();
              data1.tglMulai = dayjs(tglPengobatan).format("YYYY-MM-DD");
              data1.panduanOat = panduanOat;
              data1.sebelumHasilMikroskopis = sblmHasilMikropis;
              data1.sebelumHasilTesCepat = sblmHasilTesCepat;
              data1.sebelumHasilBiakan = sblmHasilBiakan;
              data1.hasilMikropisBulan2 = mikropis2;
              data1.hasilMikropisBulan3 = mikropis3;
              data1.hasilMikropisBulan5 = mikropis5;
              data1.akhirHasilMikropis = akhirMikropis;
              data1.tglHasilAkhir =
                dayjs(tglAkhir).format("YYYYMMDD") === "20200101"
                  ? null
                  : dayjs(tglAkhir).format();
              data1.hasilAkhir = hasilAkhir;
              data1.hasilFotoToraks = fotoThorak;
              data1.stsKirim = res.data.result.status;
              data1.userId = userId;
              data1.clientHost = hostKomp;
              data1.clientIP = ipKomp;

              simpanEmrSitb(data1);
              console.log("klikSimpan : ", data1);
            },
          });
        } else {
          setspInputSitb(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal KIRIM data SITB! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspInputSitb(false);
        Modal.error({
          title: "ERROR!",
          content: `Gagal KIRIM! -> ${err}`,
        });
      });
  };

  const simpanEmrSitb = (data) => {
    setspInputSitb(true);
    axios
      .post(`${endpoint}/EmrTuberkulosis/insertemrsitb`, data, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.result.code === "200") {
          setspInputSitb(false);
          console.log("simpanEmrSitb : ", res.data);
          Modal.success({
            title: "Sukses",
            content: "Berhasil SIMPAN data SITB.",
            onOk: () => {
              setmdFormInput(false);
              getListEmrSitb(noRm);
            },
          });
        } else {
          setspInputSitb(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal SIMPAN data SITB! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspInputSitb(false);
        Modal.error({
          title: "ERROR!",
          content: `Gagal SIMPAN! -> ${err}`,
        });
      });
  };

  return (
    <BridgingSITBContext.Provider
      value={{
        // state
        blnPeriode,
        setblnPeriode,
        listPasien,
        setlistPasien,
        nama,
        setnama,
        noSitb,
        setnoSitb,
        noreg,
        setnoreg,
        nik,
        setnik,
        noRm,
        setnoRm,
        tglLahir,
        settglLahir,
        jenisKelamin,
        setjenisKelamin,
        alamat,
        setalamat,
        umur,
        setumur,
        desaId,
        setdesaId,
        listSitb,
        setlistSitb,
        // form input
        idEmr,
        setidEmr,
        idTb03,
        setidTb03,
        idProvFaskes,
        setidProvFaskes,
        idKabFaskes,
        setidKabFaskes,
        idProvPx,
        setidProvPx,
        idKabPx,
        setidKabPx,
        idFaskes,
        setidFaskes,
        icdx,
        seticdx,
        tipeDx,
        settipeDx,
        lokasiAnatomi,
        setlokasiAnatomi,
        riwPengobatan,
        setriwPengobatan,
        tglPengobatan,
        settglPengobatan,
        panduanOat,
        setpanduanOat,
        sblmHasilMikropis,
        setsblmHasilMikropis,
        sblmHasilTesCepat,
        setsblmHasilTesCepat,
        sblmHasilBiakan,
        setsblmHasilBiakan,
        mikropis2,
        setmikropis2,
        mikropis3,
        setmikropis3,
        mikropis5,
        setmikropis5,
        akhirMikropis,
        setakhirMikropis,
        tglAkhir,
        settglAkhir,
        hasilAkhir,
        sethasilAkhir,
        fotoThorak,
        setfotoThorak,
        ipKomp,
        setipKomp,
        hostKomp,
        sethost,
        userId,
        setuserId,
        // sp
        spListPasien,
        setspListPasien,
        spDetailPasien,
        setspDetailPasien,
        spInputSitb,
        setspInputSitb,
        spListEmrSitb,
        setspListEmrSitb,
        // md
        mdDetailPx,
        setmdDetailPx,
        mdFormInput,
        setmdFormInput,
        // func
        getListPasien,
        getDetailPasien,
        getListEmrSitb,
        getDetailEmrSitb,
        bridgeSitb,
        simpanEmrSitb,
      }}
    >
      {props.children}
    </BridgingSITBContext.Provider>
  );
};

export default BridgingSITBContextProvider;
