import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { Modal, message } from "antd";
import { LoginContext } from "../../rawatjalan/context";

export const RM14Context = createContext();

const RM14ContextProvider = (props) => {
  const [rm14, setRM14] = useState([]);
  const [emrResumeMedisId, setemrResumeMedisId] = useState(0);
  const [tglPulang, settglPulang] = useState("");
  const [jamPulang, setjamPulang] = useState("");
  const [hariRawat, sethariRawat] = useState("");
  const [lamaRawat, setlamaRawat] = useState("");
  const [imunisasi, setimunisasi] = useState("");
  const [caraKeluar, setcaraKeluar] = useState("");
  const [keadaanKeluar, setkeadaanKeluar] = useState("");
  const [diagnosisIdmasuk, setdiagnosisIdmasuk] = useState("");
  const [diagnosisIdkeluar, setdiagnosisIdkeluar] = useState("");
  const [diagnosisSekunderId, setdiagnosisSekunderId] = useState("");
  const [diagnosisSekunderDesk, setdiagnosisSekunderDesk] = useState("");
  const [rudaPaksa, setrudaPaksa] = useState("");
  const [morfologiNeoplasma, setmorfologiNeoplasma] = useState("");
  const [pelaksanaId, setpelaksanaId] = useState(null);
  const [pengobatanKhusus, setpengobatanKhusus] = useState("");
  const [transfusi, settransfusi] = useState("");
  const [tprosedurIdTransfusi, setprosedurIdTransfusi] = useState("");
  const [hasilPenunjang, sethasilPenunjang] = useState("");
  const [indikasiRawatInap, setindikasiRawatInap] = useState("");
  const [terapi, setterapi] = useState("");
  const [alihKelola, setalihKelola] = useState("Tidak");
  const [beratBadan, setberatBadan] = useState("");
  const [informasiKlinisPasien, setinformasiKlinisPasien] = useState("");
  const [diagnosaKlinis, setdiagnosaKlinis] = useState("");
  const [tindakanPokok, settindakanPokok] = useState("");
  const [infoPasien, setinfoPasien] = useState([]);
  const [infoKepulangan, setinfoKepulangan] = useState([]);
  const [diagnosaPulang, setdiagnosaPulang] = useState([]);
  const [procedurePulang, setprocedurePulang] = useState([]);
  const [labPulang, setlabPulang] = useState([]);
  const [modalLab, setmodalLab] = useState(false);
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailRM14RI = (id) => {
    axios
      .get(`${apiku}/EmrResumeMedis/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRM14(res.data.result);
          //setKeluhanUtama(res.data.result.keluhanUtama);
          setemrResumeMedisId(res.data.result.EmrResumeMedisId);
          settglPulang(res.data.result.TglPulang);
          setjamPulang(res.data.result.JamPulang);
          sethariRawat(res.data.result.HariRawat);
          setlamaRawat(res.data.result.LamaRawat);
          setimunisasi(res.data.result.Imunisasi);
          setcaraKeluar(res.data.result.CaraKeluar);
          setkeadaanKeluar(res.data.result.KeadaanKeluar);
          setdiagnosisIdmasuk(res.data.result.DiagnosisIDMasuk);
          setdiagnosisIdkeluar(res.data.result.DiagnosisIDKeluar);
          setrudaPaksa(res.data.result.RudaPaksa);
          setmorfologiNeoplasma(res.data.result.MorfologiNeoplasma);
          setpelaksanaId(res.data.result.PelaksanaId);
          setpengobatanKhusus(res.data.result.PengobatanKhusus);
          settransfusi(res.data.result.Transfusi);
          setprosedurIdTransfusi(res.data.result.ProsedurIdTransfusi);
          sethasilPenunjang(res.data.result.HasilPenunjang);
          setindikasiRawatInap(res.data.result.IndikasiRawatInap);
          setterapi(res.data.result.Terapi);
          setalihKelola(res.data.result.AlihKelola);
          setberatBadan(res.data.result.BeratBadan);
          setinformasiKlinisPasien(res.data.result.InformasiKlinisPasien);
        } else {
          setRM14([]);
          setemrResumeMedisId(0);
          settglPulang("");
          setjamPulang("");
          sethariRawat("");
          setlamaRawat("");
          setimunisasi("");
          setcaraKeluar("");
          setkeadaanKeluar("");
          setdiagnosisIdmasuk("");
          setdiagnosisIdkeluar("");
          setrudaPaksa("");
          setmorfologiNeoplasma("");
          // setpelaksanaId(null);
          sethasilPenunjang("");
          setindikasiRawatInap("");
          setterapi("");
          setalihKelola("Tidak");
          setberatBadan("");
          setinformasiKlinisPasien("");
          // getobatpasien(id);
          // getKepulangan(id);
          // getDiagnosaPulang(id);
          // getProcedurePulang(id);
          //setKeluhanUtama('');
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data RM 14");
      });
  };

  const getobatpasien = (noreg) => {
    console.log("masuk", noreg);
    axios
      .get(
        `${apiku}/EmrPasienAktif/RiwayatObatDetail/RegistrasiId/${noreg}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          const uniqueNames = Array.from(
            new Set(new Set(res.data.result.map((item) => item.namaBarang)))
          ).sort();
          const uniqueNamesString = uniqueNames.join(", ");
          setterapi(uniqueNamesString.toString());
        } else {
          setterapi("");
          //   message.error("Gagal Mengambil Data Riwayat!");
        }
      })
      .catch((err) => {
        setterapi("");

        message.error("Gagal Mengambil Data!");
      });
  };

  const getinfoPasienPulang = (id) => {
    axios
      .get(`${apiku}/emrpasienAktif/read/datapasien/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);

          if (res.data.result.KeadaanPulang === "I") {
            Modal.success({
              content:
                "Pasien Masih Menginap Silahkan Pulangkan Terlebih Dahulu Sebelum Membuat RM14!",
            });
          } else {
            // setinfoPasien(res.data.result);
            getobatpasien(id);
            getKepulangan(id);
            getDiagnosaPulang(id);
            getProcedurePulang(id);
          }
        } else {
          // setinfoPasien([]);
          Modal.success({
            content:
              "Data Tidak Ditemukan atau Pasien Sudah Di Invoice, Atau Belum Dipulangkan!",
          });
        }
      })
      .catch((err) => {
        // setinfoPasien([]);
        console.log("eroro data pasien", err);
      });
  };

  const getKepulangan = (id) => {
    axios
      .get(`${apiku}/EmrKepulanganPasien/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setinfoKepulangan(res.data.result);
          console.log(res.data.result);
        } else {
          setinfoKepulangan([]);
          // message.warning("Data Tidak Ditemukan!");
        }
      })
      .catch((err) => {
        setinfoKepulangan([]);
        console.log("eroro data pasien", err);
      });
  };
  const getDiagnosaPulang = (id) => {
    axios
      .get(`${apiku}/EmrDiagnosis/Read/${id}/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setdiagnosaPulang(res.data.result);
          const datarudapaksa = res.data.result.filter(
            (item) => item.jenisDiagnosisId === 4
          );
          if (datarudapaksa.length === 0) {
            setrudaPaksa("");
          } else {
            setrudaPaksa(
              datarudapaksa
                .map((item) => item.diagnosisId + " " + item.diagnosisDesk)
                .join(", ")
            );
          }
        } else {
          setdiagnosaPulang([]);
          setrudaPaksa("");
          console.log(res);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Mengambil!");
        setdiagnosaPulang([]);
        setrudaPaksa("");
      });
  };

  const getProcedurePulang = (id) => {
    axios
      .get(`${apiku}/EmrProsedur/Read/${id}/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setprocedurePulang(res.data.result);
          console.log(res.data.result);
          const data = res.data.result;
          const terapi = ["99.04", "99.05", "99.03"];
          const kanker = ["99.25", "99.24"];

          //menampilkan diagnosa skunder
          if (data.length === 0) {
            setdiagnosisSekunderId("");
            setdiagnosisSekunderDesk("");
          } else {
            setdiagnosisSekunderId(
              data.map((item) => item.prosedurId).join("; ")
            );
            setdiagnosisSekunderDesk(
              data.map((item) => item.prosedurDesk).join(", ")
            );
          }

          //menampilkan data terapi
          const filteredData = data.filter((item) =>
            terapi.includes(item.prosedurId)
          );
          if (filteredData.length === 0) {
            settransfusi("");
            setprosedurIdTransfusi("");
          } else {
            settransfusi(
              filteredData.map((item) => item.prosedurDesk).join(", ")
            );
            setprosedurIdTransfusi(
              filteredData.map((item) => item.prosedurId).join(", ")
            );
          }

          //menampilkan data pengobatan
          const filterkanker = data.filter((item) =>
            kanker.includes(item.prosedurId)
          );
          if (filterkanker.length === 0) {
            setpengobatanKhusus("");
          } else {
            setpengobatanKhusus(
              filterkanker
                .map((item) => item.prosedurId + " " + item.prosedurDesk)
                .join(", ")
            );
          }
        } else {
          setpengobatanKhusus("");
          settransfusi("");
          setprosedurIdTransfusi("");
        }
      })
      .catch((err) => {
        console.log(err);
        setpengobatanKhusus("");
        settransfusi("");
        setprosedurIdTransfusi("");
      });
  };

  const getLabPulang = (noreg) => {
    axios
      .get(`${apiku}/EmrDialisisHeader/gethasillab/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result.length === 0) {
            Modal.warning({
              content: `Pasien Belum dilakukan Pemeriksaan laborat!`,
            });
          } else {
            let datac = res.data.result.sort((a, b) =>
              a.tanggal_Pelaporan.localeCompare(b.tanggal_Pelaporan)
            );
            datac.forEach(function (row, index) {
              row.key = index;
            });
            setlabPulang(datac);
            setmodalLab(true);
          }

          console.log(res.data.result);
        } else {
          setlabPulang([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
      });
  };

  const insertRM14 = (datarm14) => {
    console.log(datarm14);
    axios
      .post(`${apiku}/EmrResumeMedis`, datarm14, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            // icon: <Icon component={BPJSICO} />,
            title: "Berhasil Simpan Data RM14!",
            // content: JSON.stringify(res.data),
          });
          detailRM14RI(datarm14.registrasiId);
        } else {
          Modal.warning({
            // icon: <Icon component={BPJSICO} />,
            title: "Gagal Hapus RM13!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
      });
  };

  const deleterm14 = (idresume) => {
    axios
      .delete(`${apiku}/EmrResumeMedis/${idresume}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            // icon: <Icon component={BPJSICO} />,
            title: "Data Berhasil Di hapus!",
            // content: JSON.stringify(res.data),
          });
          // setLoadSimpan(false);
          setemrResumeMedisId(0);
          detailRM14RI(idresume);
        } else {
          Modal.warning({
            // icon: <Icon component={BPJSICO} />,
            title: "Gagal Hapus RM13!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        // setLoadSimpan(false);
      });
  };

  const kosongkanRM14 = (id) => {
    getobatpasien(id);
    getKepulangan(id);
    getDiagnosaPulang(id);
    getProcedurePulang(id);
    setemrResumeMedisId(0);

    // settglPulang('');
    // setjamPulang('');
    // sethariRawat('');
    // setlamaRawat('');
    setimunisasi("");
    setcaraKeluar("Persetujuan");
    setkeadaanKeluar("Sembuh");
    setdiagnosisIdmasuk("");
    setdiagnosisIdkeluar("");
    // setrudaPaksa("");
    setmorfologiNeoplasma("");
    setpelaksanaId(null);
    // setpengobatanKhusus("");
    // settransfusi("");
    // setprosedurIdTransfusi("");
    sethasilPenunjang("");
    setindikasiRawatInap("");
    // setterapi("");
    setalihKelola("Tidak");
    setberatBadan(0);
    setinformasiKlinisPasien("");
  };

  return (
    <RM14Context.Provider
      value={{
        rm14,
        emrResumeMedisId,

        tglPulang,
        settglPulang,
        jamPulang,
        setjamPulang,
        hariRawat,
        sethariRawat,
        lamaRawat,
        setlamaRawat,
        imunisasi,
        setimunisasi,
        caraKeluar,
        setcaraKeluar,
        keadaanKeluar,
        setkeadaanKeluar,
        diagnosisIdmasuk,
        setdiagnosisIdmasuk,
        diagnosisIdkeluar,
        setdiagnosisIdkeluar,
        rudaPaksa,
        setrudaPaksa,
        morfologiNeoplasma,
        setmorfologiNeoplasma,
        pelaksanaId,
        setpelaksanaId,
        pengobatanKhusus,
        setpengobatanKhusus,
        transfusi,
        settransfusi,
        tprosedurIdTransfusi,
        setprosedurIdTransfusi,
        hasilPenunjang,
        sethasilPenunjang,
        indikasiRawatInap,
        setindikasiRawatInap,
        terapi,
        setterapi,
        alihKelola,
        setalihKelola,
        beratBadan,
        setberatBadan,
        informasiKlinisPasien,
        setinformasiKlinisPasien,
        diagnosaKlinis,
        setdiagnosaKlinis,
        tindakanPokok,
        settindakanPokok,
        detailRM14RI,
        setRM14,
        insertRM14,
        kosongkanRM14,
        getobatpasien,
        infoPasien,
        setinfoPasien,
        getinfoPasienPulang,
        getKepulangan,
        infoKepulangan,
        setinfoKepulangan,
        getDiagnosaPulang,
        diagnosaPulang,
        setdiagnosaPulang,
        procedurePulang,
        setprocedurePulang,
        getProcedurePulang,
        getLabPulang,
        labPulang,
        setlabPulang,
        modalLab,
        setmodalLab,
        deleterm14,
        diagnosisSekunderId,
        setdiagnosisSekunderId,
        diagnosisSekunderDesk,
        setdiagnosisSekunderDesk,
      }}
    >
      {props.children}
    </RM14Context.Provider>
  );
};

export default RM14ContextProvider;
