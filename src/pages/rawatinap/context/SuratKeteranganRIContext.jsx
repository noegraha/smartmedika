import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { message, Modal } from "antd";
import dayjs from "dayjs";

export const SuratKeteranganRIContext = createContext();

const SuratKeteranganRIContextProvider = (props) => {
  const [suratKeteranganId, setsuratKeteranganId] = useState(0);
  const [jenisKeterangan, setjenisKeterangan] = useState(null);
  const [tglKeterangan, settglKeterangan] = useState(dayjs());
  const [tanggal, settanggal] = useState(null);
  const [jam, setjam] = useState(null);
  const [tglMulai, settglMulai] = useState(null);
  const [tglSelesai, settglSelesai] = useState(null);
  const [lamaHari, setlamaHari] = useState(null);
  const [keterangan, setketerangan] = useState(null);
  const [dokterPenanggungJawab, setdokterPenanggungJawab] = useState(null);
  const [rujukanDari, setrujukanDari] = useState(null);
  const [keluhanUtama, setkeluhanUtama] = useState(null);
  const [riwayatPenyakit, setriwayatPenyakit] = useState(null);
  const [pemeriksaanSwab, setpemeriksaanSwab] = useState(null);
  const [metodePemeriksaan, setmetodePemeriksaan] = useState(null);
  const [tglKeluarHasil, settglKeluarHasil] = useState(dayjs());
  const [sumberInformasi, setsumberInformasi] = useState(null);
  const [diagnosaSuket, setdiagnosaSuket] = useState(null);
  const [spriDokter, setspriDokter] = useState(null);
  const [spriRuangIsolasi, setspriRuangIsolasi] = useState(null);
  const [spriJenisRuangan, setspriJenisRuangan] = useState(null);
  const [tglMeninggal, settglMeninggal] = useState(null);
  const [noSurat, setnoSurat] = useState(null);
  const [tglSlsIsoRS, settglSlsIsoRS] = useState(null);
  const [verified, setverified] = useState(0);
  const [cetak, setcetak] = useState(0);
  const [hasilPemeriksaan, sethasilPemeriksaan] = useState(null);
  const [tglIsomanFaskes, settglIsomanFaskes] = useState(null);
  const [catatanSuket, setcatatanSuket] = useState(null);

  const [loadingSuket, setloadingSuket] = useState(false);

  const [namaPj, setnamaPj] = useState(null);
  const [noPj, setnoPj] = useState(null);
  const [hubPj, sethubPj] = useState(null);

  const [noregPulang, setnoregPulang] = useState("");

  const [listSuketByReg, setlistSuketByReg] = useState([]);
  const [mstSuket, setmstSuket] = useState([]);
  const [mstSuketPulang, setmstSuketPulang] = useState([]);
  const [suketPulang, setsuketPulang] = useState("");
  const [warning1, setwarning1] = useState(false);
  const [warning2, setwarning2] = useState(false);
  const [warning3, setwarning3] = useState(false);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertSuket = (dataSuket) => {
    setloadingSuket(true);
    axios
      .post(`${apiku}/EmrSuratKeterangan`, dataSuket, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // getSuketByReg(dataSuket.registrasiId);
          getSuratKeteranganDetail(
            dataSuket.registrasiId,
            dataSuket.jenisKeterangan
          );
          setloadingSuket(false);
          setwarning2(false);
          Modal.success({
            content: "Berhasil Simpan Data Surat Keterangan!",
          });
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          setloadingSuket(false);
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Error WS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        setloadingSuket(false);
      });
  };

  const insertVerifDokter = (dataverif) => {
    setloadingSuket(true);
    axios
      .post(`${apiku}/EmrSuratKeterangan/Verified`, dataverif, options)
      .then((res) => {
        console.log(res);
        if (res.data.statusCode === 200) {
          // getSuketByReg(reg);
          getSuratKeteranganDetail(
            dataverif.registrasiId,
            dataverif.jenisKeterangan
          );
          Modal.success({
            content: "Berhasil Verif Data Surat Keterangan!",
          });
          setloadingSuket(false);
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          setloadingSuket(false);
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Error WS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        setloadingSuket(false);
      });
  };

  const getSuketByReg = (regId) => {
    axios
      .get(`${apiku}/EmrSuratKeterangan/Lookup/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistSuketByReg(res.data.result);
        } else {
          setlistSuketByReg([]);
        }
      })
      .catch((err) => {
        setlistSuketByReg([]);
        console.log(err);
      });
  };

  const getmstSuket = (sKey) => {
    axios
      .get(`${apiku}/MstJenisSuketRi/Lookup/${sKey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setmstSuket(
            res.data.result
              .filter((item) => {
                // const allowedIds = ["5"];
                const allowedIds = ["7", "5", "6", "4"];

                return allowedIds.includes(item.JenisSuketId);
              })
              .sort((a, b) => a.JenisSuketId.localeCompare(b.JenisSuketId))
          );
          setmstSuketPulang(
            res.data.result
              .filter((item) => {
                const allowedIds = ["7", "5", "6", "4"];
                return allowedIds.includes(item.JenisSuketId);
              })
              .sort((a, b) => a.JenisSuketId.localeCompare(b.JenisSuketId))
          );
        } else {
          setmstSuket([]);
          setmstSuketPulang([]);
        }
      })
      .catch((err) => {
        setmstSuket([]);
        setmstSuketPulang([]);

        console.log(err);
      });
  };

  const getSuratKeteranganDetail = (regId, jnsSuket) => {
    setloadingSuket(true);
    axios
      .get(`${apiku}/EmrSuratKeterangan/Read/${regId}/${jnsSuket}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setsuratKeteranganId(res.data.result.suratKeteranganId);
          settglKeterangan(
            res.data.result.tglKeterangan === null
              ? res.data.result.tglKeterangan
              : dayjs(res.data.result.tglKeterangan)
          );
          settanggal(
            res.data.result.tanggal === null
              ? res.data.result.tanggal
              : dayjs(res.data.result.tanggal)
          );
          setjam(
            res.data.result.jam === null
              ? res.data.result.jam
              : dayjs(res.data.result.jam)
          );
          settglMulai(
            res.data.result.tglMulai === null
              ? res.data.result.tglMulai
              : dayjs(res.data.result.tglMulai)
          );
          settglSelesai(
            res.data.result.tglSelesai === null
              ? res.data.result.tglSelesai
              : dayjs(res.data.result.tglSelesai)
          );
          setlamaHari(res.data.result.lamaHari);
          setketerangan(res.data.result.keterangan);
          setdokterPenanggungJawab(res.data.result.dokterPenanggungJawab);
          setrujukanDari(res.data.result.rujukanDari);
          setkeluhanUtama(res.data.result.keluhanUtama);
          setriwayatPenyakit(res.data.result.riwayatPenyakit);
          setpemeriksaanSwab(res.data.result.pemeriksaanSwab);
          setmetodePemeriksaan(res.data.result.metodePemeriksaan);
          settglKeluarHasil(
            res.data.result.tglKeluarHasil === null
              ? res.data.result.tglKeluarHasil
              : dayjs(res.data.result.tglKeluarHasil)
          );
          setsumberInformasi(res.data.result.sumberInformasi);
          setdiagnosaSuket(res.data.result.diagnosa);
          setspriDokter(res.data.result.SPRIDokter);
          setspriRuangIsolasi(res.data.result.SPRIRuangIsolasi);
          setspriJenisRuangan(res.data.result.SPRIJenisRuangan);
          settglMeninggal(
            res.data.result.tglMeninggal === null
              ? res.data.result.tglMeninggal
              : dayjs(res.data.result.tglMeninggal)
          );
          setnoSurat(res.data.result.noSurat);
          settglSlsIsoRS(
            res.data.result.tglSlsIsoRS === null
              ? res.data.result.tglSlsIsoRS
              : dayjs(res.data.result.tglSlsIsoRS)
          );
          setcatatanSuket(res.data.result.catatan);
          sethasilPemeriksaan(res.data.result.hasilPemeriksaan);
          setverified(res.data.result.verified);
          setcetak(res.data.result.cetak);
          settglIsomanFaskes(
            res.data.result.tglIsomanFaskes === null
              ? res.data.result.tglIsomanFaskes
              : dayjs(res.data.result.tglIsomanFaskes)
          );
          setnamaPj(res.data.result.NamaPenanggungJawab);
          setnoPj(res.data.result.NoIdentitas);
          sethubPj(res.data.result.HubunganId);
          setloadingSuket(false);
        } else {
          setsuratKeteranganId(0);
          if (jnsSuket === "4") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "5") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "6") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            // setketerangan(null)
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            // settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "7") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            // setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            // settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "8") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari("NON RUJUKAN");
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab("POSITIF SARS COV-2");
            setmetodePemeriksaan("SWAB Nasofaring");
            settglKeluarHasil(null);
            setsumberInformasi("dr. Vitasari Indriani, Sp.PK., M.Si.Med");
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "9") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "11") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari("NON RUJUKAN");
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab("POSITIF SARS COV-2");
            setmetodePemeriksaan("SWAB Nasofaring");
            settglKeluarHasil(null);
            setsumberInformasi("dr. Vitasari Indriani, Sp.PK., M.Si.Med");
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "13") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "14") {
            // getDiagnosa(curpasRI.registrasiId);

            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "15") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "16") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "12") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else if (jnsSuket === "10") {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          } else {
            settglKeterangan(null);
            settanggal(null);
            setjam(null);
            settglMulai(null);
            settglSelesai(null);
            setlamaHari(null);
            setketerangan(null);
            setdokterPenanggungJawab(null);
            setrujukanDari(null);
            setkeluhanUtama(null);
            setriwayatPenyakit(null);
            setpemeriksaanSwab(null);
            setmetodePemeriksaan(null);
            settglKeluarHasil(null);
            setsumberInformasi(null);
            setdiagnosaSuket(null);
            setspriDokter(null);
            setspriRuangIsolasi(null);
            setspriJenisRuangan(null);
            settglMeninggal(null);
            setnoSurat(null);
            settglSlsIsoRS(null);
            setcatatanSuket(null);
            sethasilPemeriksaan(null);
            // setverified(null);
            // setcetak(null);
            settglIsomanFaskes(null);
            setnamaPj(null);
            setnoPj(null);
            sethubPj(null);
            setloadingSuket(false);
          }
        }
      })
      .catch((err) => {
        message.error("Terjadi Kesalahan Koneksi!");
        // setjenisKeterangan(null);
        setsuratKeteranganId(0);
        settglKeterangan(null);
        settanggal(null);
        setjam(null);
        settglMulai(null);
        settglSelesai(null);
        setlamaHari(null);
        setketerangan(null);
        setdokterPenanggungJawab(null);
        setrujukanDari(null);
        setkeluhanUtama(null);
        setriwayatPenyakit(null);
        setpemeriksaanSwab(null);
        setmetodePemeriksaan(null);
        settglKeluarHasil(null);
        setsumberInformasi(null);
        setdiagnosaSuket(null);
        setspriDokter(null);
        setspriRuangIsolasi(null);
        setspriJenisRuangan(null);
        settglMeninggal(null);
        setnoSurat(null);
        settglSlsIsoRS(null);
        setcatatanSuket(null);
        sethasilPemeriksaan(null);
        setverified(null);
        setcetak(null);
        settglIsomanFaskes(null);
        setnamaPj(null);
        setnoPj(null);
        sethubPj(null);
        setloadingSuket(false);
      });
  };

  const getKepulanganPs = (regId) => {
    axios
      .get(`${apiku}/EmrKepulanganPasien/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setsuketPulang(res.data.result.KeadaanPulang);
          res.data.result.TanggalMeninggal === null
            ? settglMeninggal(null)
            : settglMeninggal(dayjs(res.data.result.TanggalMeninggal));
        } else {
          setsuketPulang("");
        }
      })
      .catch((err) => {
        setsuketPulang("");
        message.error("Error Mengambil Kepulangan Pasien!");
      });
  };

  const deleteSuket = (reg, jenis) => {
    setloadingSuket(true);
    axios
      .delete(`${apiku}/EmrSuratKeterangan/${reg}/${jenis}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Data Berhasil Dihapus!!",
            // content: res.data.message,
          });
          // getSuketByReg(reg);
          setloadingSuket(false);
          getSuratKeteranganDetail(reg, jenis);
        } else {
          Modal.warning({
            // icon: <Icon component={BPJSICO} />,
            title: "Gagal Hapus Surat Keterangan!",
            content: res.data.message,
          });
          setloadingSuket(false);
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Error ws",
          content: "Terdapat Kesalahan Koneksi!",
        });
        // console.log(err);
        setloadingSuket(false);
      });
  };

  return (
    <SuratKeteranganRIContext.Provider
      value={{
        suratKeteranganId,
        setsuratKeteranganId,
        jenisKeterangan,
        setjenisKeterangan,
        tglKeterangan,
        settglKeterangan,
        tanggal,
        settanggal,
        jam,
        setjam,
        tglMulai,
        settglMulai,
        tglSelesai,
        settglSelesai,
        lamaHari,
        setlamaHari,
        keterangan,
        setketerangan,
        dokterPenanggungJawab,
        setdokterPenanggungJawab,
        rujukanDari,
        setrujukanDari,
        keluhanUtama,
        setkeluhanUtama,
        riwayatPenyakit,
        setriwayatPenyakit,
        pemeriksaanSwab,
        setpemeriksaanSwab,
        metodePemeriksaan,
        setmetodePemeriksaan,
        tglKeluarHasil,
        settglKeluarHasil,
        sumberInformasi,
        setsumberInformasi,
        diagnosaSuket,
        setdiagnosaSuket,
        spriDokter,
        setspriDokter,
        spriRuangIsolasi,
        setspriRuangIsolasi,
        spriJenisRuangan,
        setspriJenisRuangan,
        tglMeninggal,
        settglMeninggal,
        noSurat,
        setnoSurat,
        tglSlsIsoRS,
        settglSlsIsoRS,
        verified,
        setverified,
        cetak,
        setcetak,
        hasilPemeriksaan,
        sethasilPemeriksaan,
        tglIsomanFaskes,
        settglIsomanFaskes,
        namaPj,
        setnamaPj,
        noPj,
        setnoPj,
        hubPj,
        sethubPj,
        listSuketByReg,
        setlistSuketByReg,
        loadingSuket,
        setloadingSuket,
        mstSuket,
        setmstSuket,
        catatanSuket,
        setcatatanSuket,

        insertSuket,
        getSuketByReg,
        getSuratKeteranganDetail,
        insertVerifDokter,
        getmstSuket,
        deleteSuket,
        noregPulang,
        setnoregPulang,
        mstSuketPulang,
        setmstSuketPulang,
        suketPulang,
        setsuketPulang,
        getKepulanganPs,
        warning1,
        setwarning1,
        warning2,
        setwarning2,
        warning3,
        setwarning3,
      }}
    >
      {props.children}
    </SuratKeteranganRIContext.Provider>
  );
};

export default SuratKeteranganRIContextProvider;
