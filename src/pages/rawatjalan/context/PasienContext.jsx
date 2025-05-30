import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "./LoginContext";
import { message } from "antd";
import dayjs from "dayjs";

export const PasienContext = createContext();

const PasienContextProvider = (props) => {
  const [pasien, setPasien] = useState([]);
  const [pasienid, setPasienID] = useState(null);
  const [pasienlist, setPasienList] = useState([]);
  const [pasiendetail, setPasienDetail] = useState([]);
  const [curantri, setCurAntri] = useState([]);
  const [doktercurpas, setDokterCurpas] = useState([]);
  const [pasienDetailJenisKelamin, setPasienDetailJenisKelamin] = useState([]);
  const [pasienDetailAgama, setPasienDetailAgama] = useState([]);
  const [pasienDetailPendidikan, setPasienDetailPendidikan] = useState([]);
  const [pasienDetailStatusKwn, setPasienDetailStatusKwn] = useState([]);
  const [pasienDetailPekerjaan, setPasienDetailPekerjaan] = useState([]);
  const [pasienDetailGolonganDrh, setPasienDetailGolonganDrh] = useState([]);
  const [pasienDetailSuku, setPasienDetailSuku] = useState([]);
  const [pasienDetailBahasa, setPasienDetailBahasa] = useState([]);
  const [pasienDetailDesa, setPasienDetailDesa] = useState([]);
  const [pasienDetailKelasRwt, setPasienDetailKelasRwt] = useState([]);
  const [pasienDetailPembayaran, setPasienDetailPembayaran] = useState([]);
  const [nomorantrian, setNomorAntrian] = useState(1);

  const [rs, setRS] = useState("%20");
  const [tanggal, setTanggal] = useState(dayjs());
  const [ktp, setKTP] = useState([]);
  const [noKodeBooking, setNoKodeBooking] = useState(null);
  const [poliwa, setPoliWA] = useState("-");
  const [namawa, setNamaWA] = useState("-");
  const [dokterwa, setDokterWA] = useState("-");
  const [kelaminwa, setKelaminWA] = useState("Sdr.");
  const [noWA, setNoWA] = useState("-");
  const [dataTelemedicine, setDataTeleMedicine] = useState("-");
  const [statusft, setStatusft] = useState(false);
  const [nik, setNIK] = useState(null);
  const [nonnik, setNonNIK] = useState(true);
  const [keterangan, setKeterangan] = useState(null);
  const [nama, setNama] = useState(null);
  const [tempatlahir, setTempatLahir] = useState(null);
  const [tanggallahir, setTanggalLahir] = useState(null);
  const [tanggalmati, setTanggalMati] = useState(null);
  const [jnskelamin, setJnsKelamin] = useState(null);
  const [agama, setAgama] = useState(null);
  const [goldarah, setGolDarah] = useState(null);
  const [alamat, setAlamat] = useState(null);
  const [alamatdomisili, setAlamatDomisili] = useState(null);
  const [desaid, setDesaId] = useState(null);
  const [rt, setRT] = useState(null);
  const [rw, setRW] = useState(null);
  const [kodepos, setKodepos] = useState(null);
  const [email, setEmail] = useState(null);
  const [notelepon, setNoTelepon] = useState(null);
  const [pekerjaan, setPekerjaan] = useState(null);
  const [pendidikan, setPendidikan] = useState(null);
  const [statuskawin, setStatusKawin] = useState(null);
  const [sukubangsa, setSukuBangsa] = useState(null);
  const [bahasa, setBahasa] = useState(null);
  const [namaibu, setNamaIbu] = useState(null);
  const [namaayah, setNamaAyah] = useState(null);
  const [namapasangan, setNamaPasangan] = useState(null);
  const [tandatangan, setTandaTangan] = useState(null);
  const [desanama, setDesaNama] = useState(null);

  const [pasienhd, setPasienHD] = useState([]);
  const [jumlah, setJumlah] = useState("");
  const [jumlahpasien, setJumlahPasien] = useState("");
  const [jumlahPoli, setJumlahPoli] = useState("");
  const [curpas, setCurpas] = useState("");
  const [noreg, setNoreg] = useState(null);
  const [ruangasal, setRuangasal] = useState(null);
  const [caramasukid, setCaraMasuk] = useState([]);
  const [poli, setPoli] = useState([]);
  const [poli1, setPoli1] = useState(null);
  const [poli2, setPoli2] = useState(null);
  const [penunjang, setPenunjang] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [ruangpoli, setRuangPoli] = useState([]);
  const [ruanginap, setRuangInap] = useState([]);
  const [apotik, setApotik] = useState([]);
  const [apotikrj, setApotikRJ] = useState([]);
  const [pasienRI, setPasienRI] = useState([]);
  const [jumlahPasienRI, setJumlahPasienRI] = useState([]);
  const [curpasRI, setCurpasRI] = useState([]);
  const [pembayaran, setPembayaran] = useState([]);
  const [riwayatpasien, setRiwayatPasien] = useState([]);
  const [riwayatpenyakit, setRiwayatPenyakit] = useState([]);
  const [riwayatpemeriksaan, setRiwayatPemeriksaan] = useState([]);
  const [lebar, setLebar] = useState(250);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingdetail, setLoadingDetail] = useState(false);
  const [screening, setScreening] = useState("L");
  const [ruangan, setRuangan] = useState([]);
  const [modalRiwayat, setmodalRiwayat] = useState(false);

  const [line3, setLine2] = useState([]);
  const [collapsed, setCollapsed] = useState(true);
  const [current, setCurrent] = useState("anamnesa");
  const RsLokasi = sessionStorage.getItem("RSMana");

  const [open, setOpen] = useState(false);
  const [load, setLoad] = useState(false);
  const [layout, setLayout] = useState(true);
  const [currentt, setCurrentt] = useState(1);

  const { token, setLoadingPoli } = useContext(LoginContext);
  const url = process.env.REACT_APP_API_BASE_URL;
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const usr = sessionStorage.getItem("user");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  useEffect(() => {
    const tok = sessionStorage.getItem("userData");
    const usr = sessionStorage.getItem("user");

    const options = {
      headers: { Authorization: "Bearer " + tok },
    };
    axios
      .get(`${apiku}/EmrRawatInap/Lookup/%20/%20`, options)
      .then((res) => {
        setPasienRI(res.data.result);
        setJumlahPasienRI(res.data.result.length);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/%20/2/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPoli(res.data.result);
          setLoadingPoli(false);
        } else {
          setPoli([]);
          setLoadingPoli(false);
        }
      })
      .catch((err) => {
        setLoadingPoli(false);
        console.log(err);
        setPoli([]);
      });
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/ /1/%20`, options)
      .then((res) => {
        setRuang(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiku}/MstRuang/LookupMaster/%20/1/1/110`, options)
      .then((res) => {
        setRuangan(
          res.data.result.sort(
            (a, b) => parseFloat(a.ruangId) - parseFloat(b.ruangId)
          )
        );
      })
      .catch((err) => {
        setRuangan([]);
        console.log(err);
      });
    axios
      .get(`${apiku}/MstRuang/lookup/ /7/1/100`, options)
      .then((res) => {
        setApotik(
          res.data.result.sort(
            (a, b) => parseFloat(a.ruangId) - parseFloat(b.ruangId)
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/%20/7/%20`, options)
      .then((res) => {
        // console.log(res.data.result);
        if (res.data.statusCode === 200) {
          setApotikRJ(res.data.result);
        } else {
          setApotikRJ([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiku}/MstRuang/lookup/ /2/1/200`, options)
      .then((res) => {
        setRuangPoli(res.data.result);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiku}/MstRuang/lookup/ /1/1/200`, options)
      .then((res) => {
        setRuangInap(res.data.result);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get(`${apiku}/EmrPasienAktif/LookupByRuang/ /9406`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasienHD(res.data.result);
          setRefresh(false);
        } else {
          setPasienHD([]);
          // message.warning(res.data.result);
          setRefresh(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setRefresh(false);
      });
  }, [token, apiku, setLoadingPoli]);

  const listRuangPolibyRS = (rs) => {
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/%20/2/${rs}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPoli(res.data.result);
        } else {
          setPoli([]);
          // message.warning(res.data.message)
        }
      })
      .catch((err) => {
        console.log(err);
        setPoli([]);
      });
  };

  const ambilStatistik = (id) => {
    axios
      .get(`${url}/EmrPendaftaran/Statistik/${id}`, options)
      .then((res) => {
        setLine2(res.data.result);
        // console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ambilGrafik = (data) => {
    axios
      .post(`http://182.168.7.119/SignalR/api/Chat/Statistik/Pesan`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cariPasienHariIni = (ruang, today) => {
    setRefresh(true);
    axios
      .get(
        `${apiku}/EmrPasienAktif/LookupByRuangTglMasuk/%20/${ruang}/${today}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasien(res.data.result);
          setJumlahPasien(res.data.result.length);
          setRefresh(false);
        } else {
          message.warning(res.data.message);
          setJumlahPasien("");
          setPasien([]);
          setRefresh(false);
        }
      })
      .catch((err) => {
        console.log(err.response);
        setJumlahPasien("");
        setRefresh(false);
        setPasien([]);
      });
  };

  const cariPasienNamaHariIni = (nama) => {
    setRefresh(true);
    axios
      .get(
        `${apiku}/EmrPasienAktif/LookupByRuangTglMasuk/${
          nama === "" ? " " : nama
        }/${ruangasal}/${dayjs(tanggal).format("YYYY-MM-DD")}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasien(res.data.result);
          setJumlahPasien(res.data.result.length);
          setRefresh(false);
          message.info("Daftar Pasien Refreshed!");
          // console.log(res.data.result.length);
        } else {
          setRefresh(false);
          setJumlahPasien("");
          setPasien([]);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setJumlahPasien("");
        setRefresh(false);
        setPasien([]);
      })
      .finally(() => setLoad(false));
  };

  const cariPasien = (nama) => {
    axios
      .get(
        `${apiku}/EmrPasienAktif/LookupByRuang/${
          nama === "" ? " " : nama
        }/${ruangasal}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasien(res.data.result);
          console.log(res.data.result.length);
        } else {
          setPasien([]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cariPasienPoli = (poli) => {
    axios
      .get(`${apiku}/emrpasienaktif/lookup/${poli}/2/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasien(res.data.result);
          setJumlahPoli(res.data.result.length);
          setRefresh(false);
          // detailPasien(res.data.result[0].registrasiId);
        } else {
          setPasien([]);
          console.log(res.data);
          // message.warning("Tidak ada Pasien");
          message.warning(res.data.message);
          setRefresh(false);
        }
      })
      .catch((err) => {
        setPasien([]);
        console.log(err);
        setRefresh(false);
      });
  };

  const cariPasienHD = () => {
    axios
      .get(`${apiku}/EmrPasienAktif/LookupByRuang/ /9406`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasienHD(res.data.result);
          setRefresh(false);
        } else {
          setPasienHD([]);
          message.warning(res.data.result);
          setRefresh(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setRefresh(false);
      });
  };

  const cariPoli = () => {
    axios
      .get(`${apiku}/mstruang/lookupklinik/klinik/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPoli(res.data.result);
        } else {
          setPoli([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setPoli([]);
        console.log(err);
      });
  };

  const getlistApotik = () => {
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/%20/7/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setApotikRJ(res.data.result);
        } else {
          setApotikRJ([]);
        }
        // if (RsLokasi === "RSMS") {
        //   setApotikRJ(
        //     res.data.result.sort((a, b) =>
        //       b.deskripsi
        //         .split("- ")
        //         .pop()
        //         .localeCompare(a.deskripsi.split("- ").pop())
        //     )
        //   );
        // } else if (RsLokasi === "ABIYASA") {
        //   setApotikRJ(
        //     res.data.result.sort((a, b) =>
        //       a.deskripsi
        //         .split("- ")
        //         .pop()
        //         .localeCompare(b.deskripsi.split("- ").pop())
        //     )
        //   );
        // } else {
        //   setApotikRJ(
        //     res.data.result.sort(
        //       (a, b) => parseFloat(a.ruangId) - parseFloat(b.ruangId)
        //     )
        //   );
        // }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cariPoliUser = () => {
    const usr = sessionStorage.getItem("user");
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/ /2/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPoli(res.data.result);
        } else {
          setPoli([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(usr);
      });
  };

  const cariRuangUser = () => {
    const usr = sessionStorage.getItem("user");
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${usr}/ /1/%20`, options)
      .then((res) => {
        setRuang(res.data.result);
        console.log(usr);
      })
      .catch((err) => {
        console.log(usr);
      });
  };

  const detailPasien = (id) => {
    axios
      .get(`${apiku}/emrpasienaktif/read/datapasien/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setCurpas(res.data.result);
          setDokterCurpas(res.data.result.dokterId);
          setNoreg(res.data.result.registrasiId);
          setStatusft(res.data.result.fastTrack);
          setNomorAntrian(
            res.data.result.noAntrianKlinik === null
              ? ""
              : res.data.result.noAntrianKlinik
          );
          // setDetpas(res.data.result.pasien);
          // console.log(res.data.result.pasien);
          setCaraMasuk(res.data.result.caraMasukId);
          setScreening(res.data.result.baruLama);
          setRuang(res.data.result.ruangId);
          localStorage.setItem("ruangId", res.data.result.ruangId);
          localStorage.setItem("kelasRawatId", res.data.result.kelasRawatId);
          sessionStorage.setItem("namaPasienRawat", res.data.result.namaPasien);
          // console.log(res.data.result.ruangId)
          // console.log(res.data.result);
          if (res.data.result.kodeBooking !== null) {
            if (res.data.result.kodeBooking.includes("TM")) {
              NoWATelemedicine(res.data.result.kodeBooking);
              console.log("Booking No " + res.data.result.kodeBooking);
              setNoKodeBooking(res.data.result.kodeBooking);
            }
          } else {
            // console.log("kosong");
          }
          setLoading(false);
        } else {
          message.warning(res.data.message);
          setCurpas([]);
          setDokterCurpas([]);
          setNoreg([]);
          setNomorAntrian([]);
          setCaraMasuk(null);
          setScreening(null);
          setLoading(false);
          setStatusft(false);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Mengambil!");
        setCurpas([]);
        setDokterCurpas([]);
        setNoreg([]);
        setNomorAntrian([]);
        setCaraMasuk(null);
        setScreening(null);
        setStatusft(false);
        setLoading(false);
      });
  };

  const detailAntrian = (id) => {
    axios
      .get(`${apiku}/emrpasienaktif/read/datapasien/${id}`, options)
      .then((res) => {
        setCurAntri(res.data.result);
        console.log(res.data.result);
        setNomorAntrian(
          res.data.result.noAntrianKlinik === null
            ? ""
            : res.data.result.noAntrianKlinik
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailPasienLive = (id) => {
    axios
      .get(`${apiku}/emrpasienaktif/readlive/datapasien/${id}`, options)
      .then((res) => {
        setCurpas(res.data.result);
        // setDetpas(res.data.result.pasien);
        // console.log(res.data.result.pasien);
        localStorage.setItem("ruangId", res.data.result.ruangId);
        localStorage.setItem("kelasRawatId", res.data.result.kelasRawatId);
        console.log(res.data.result.ruangId);
        console.log(res.data.result);
      });
  };

  const detailPasienRI = (id) => {
    axios
      .get(`${apiku}/EmrPasienAktif/read/datapasien/${id}`, options)
      .then((res) => {
        setCurpasRI(res.data.result);
        console.log(res.data.result);
      });
  };

  const detailRiwayatPasien = (id) => {
    axios
      .get(`${apiku}/EmrPasienAktif/Riwayat/Pendaftaran/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRiwayatPasien(res.data.result);
          setLoading(false);
          // setmodalRiwayat(true);
        } else {
          setRiwayatPasien([]);
          setLoading(false);
          // setmodalRiwayat(false);
        }
      })
      .catch((err) => {
        setRiwayatPasien([]);
        setLoading(false);
        // setmodalRiwayat(false);
        console.log(err);
      });
  };

  const detailRiwayatPenyakit = (id) => {
    axios
      .get(`${apiku}/EmrPasienAktif/Riwayat/PenyakitNew/${id}`, options)
      .then((res) => {
        setRiwayatPenyakit(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailRiwayatPemeriksaan = (id) => {
    axios
      .get(`${apiku}/EmrPasienAktif/Riwayat/Pemeriksaan/${id}`, options)
      .then((res) => {
        setRiwayatPemeriksaan(res.data.result);
        console.log(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ambilRuang = (e) => {
    setRuangasal(e);
  };

  const cariPasienListAll = (nama) => {
    axios
      .get(`${apiku}/MstPasien/Lookup/${nama}/1/50`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasienList(res.data.result);
          setLoading(false);
        } else {
          message.warning(res.data.message);
          setPasienList([]);
          setLoading(false);
        }
      })
      .catch((err) => {
        setPasienList([]);
        console.log(err);
        setLoading(false);
      });
  };

  const getPasienDetail = (id) => {
    axios
      .get(`${apiku}/MstPasien/PasienId/${id}`, options)
      .then((res) => {
        setPasienDetail(res.data.result);
        setNIK(res.data.result.nik);
        setNama(res.data.result.nama);
        setAgama(res.data.result.agamaId);
        setGolDarah(res.data.result.golonganDarahId);
        setPekerjaan(res.data.result.pekerjaan.pekerjaanId);
        setPendidikan(res.data.result.pendidikan.pendidikanId);
        setStatusKawin(res.data.result.statusKawin.statusKawinId);
        setSukuBangsa(res.data.result.sukuBangsaId);
        setAlamatDomisili(res.data.result.alamatDomisili);
        setAlamat(res.data.result.alamat);
        setTempatLahir(res.data.result.tempatLahir);
        setTanggalLahir(res.data.result.tanggalLahir);
        setJnsKelamin(res.data.result.jenisKelaminId);
        setEmail(res.data.result.email);
        setNoTelepon(res.data.result.noTelepon);
        setBahasa(res.data.result.bahasaId);
        setNamaIbu(res.data.result.namaIbu);
        setNamaAyah(res.data.result.namaAyah);
        setNamaPasangan(res.data.result.namaPasangan);
        setTandaTangan(res.data.result.tandaTangan);
        setDesaId(res.data.result.desaId);
        setRT(res.data.result.rt);
        setRW(res.data.result.rw);
        setNonNIK(res.data.result.nonNIK);
        setKeterangan(res.data.result.keterangan);
        setKodepos(res.data.result.kodePos);
        setTanggalMati(res.data.result.tanggalKematian);
        setDesaNama(
          res.data.result.desa === null ? [] : res.data.result.desa.desaNama
        );

        setPasienDetailJenisKelamin(
          res.data.result.jenisKelamin === null
            ? []
            : res.data.result.jenisKelamin
        );
        setPasienDetailAgama(
          res.data.result.agama === null ? [] : res.data.result.agama
        );
        setPasienDetailPendidikan(
          res.data.result.pendidikan === null ? [] : res.data.result.pendidikan
        );
        setPasienDetailStatusKwn(
          res.data.result.statusKawin === null
            ? []
            : res.data.result.statusKawin
        );
        setPasienDetailPekerjaan(
          res.data.result.pekerjaan === null ? [] : res.data.result.pekerjaan
        );
        setPasienDetailGolonganDrh(
          res.data.result.golonganDarah === null
            ? []
            : res.data.result.golonganDarah
        );
        setPasienDetailSuku(
          res.data.result.sukuBangsa === null ? [] : res.data.result.sukuBangsa
        );
        setPasienDetailBahasa(
          res.data.result.bahasa === null ? [] : res.data.result.bahasa
        );
        setPasienDetailDesa(
          res.data.result.desa === null ? [] : res.data.result.desa
        );
        setPasienDetailKelasRwt(
          res.data.result.kelasRawat === null ? [] : res.data.result.kelasRawat
        );
        setPasienDetailPembayaran(
          res.data.result.pembayaran === null ? [] : res.data.result.pembayaran
        );
        setLoadingDetail(false);
        console.log(res.data.result);
      })
      .catch((err) => {
        setPasienDetail([]);
        setNIK([]);
        setNama([]);
        setAgama([]);
        setGolDarah([]);
        setPekerjaan([]);
        setPendidikan([]);
        setStatusKawin([]);
        setSukuBangsa([]);
        setAlamatDomisili([]);
        setAlamat([]);
        setTempatLahir([]);
        setTanggalLahir([]);
        setJnsKelamin([]);
        setEmail([]);
        setNoTelepon([]);
        setBahasa([]);
        setNamaIbu([]);
        setNamaAyah([]);
        setNamaPasangan([]);
        setTandaTangan([]);
        setDesaId([]);
        setRT([]);
        setRW([]);
        setNonNIK(true);
        setKeterangan([]);
        setKodepos([]);
        setTanggalMati([]);
        setPasienDetailJenisKelamin([]);
        setPasienDetailAgama([]);
        setPasienDetailPendidikan([]);
        setPasienDetailStatusKwn([]);
        setPasienDetailPekerjaan([]);
        setPasienDetailGolonganDrh([]);
        setPasienDetailSuku([]);
        setPasienDetailBahasa([]);
        setPasienDetailDesa([]);
        setPasienDetailKelasRwt([]);
        setPasienDetailPembayaran([]);
        setLoadingDetail(false);
        console.log(err);
      });
  };

  const insertPasien = (datapasien) => {
    axios
      .post(`${apiku}/MstPasien`, datapasien, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
          getPasienDetail(res.data.result.pasienId);
        } else {
          console.log(res.data.result);
          message.warn(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const cekKTP = (nonik) => {
    axios
      .get(`${apiku}/BridgeEKTP/E-KTP/${nonik}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setKTP(res.data.result);
        } else {
          console.log(res.data.result);
          message.warning(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.warning(err);
      });
  };

  const NoWATelemedicine = (kodebooking) => {
    axios
      .get(`${apiku}/BridgeROnline/TeleByKodeBooking/${kodebooking}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setNoWA(res.data.result.dataPasien.noWhatsapp.substr(1));
          setDataTeleMedicine(res.data.result);
          setNamaWA(res.data.result.dataPasien.namaPasien);
          setPoliWA(res.data.result.displayanamePoliklinik);
          setDokterWA(res.data.result.namaDokter);
          setKelaminWA(
            res.data.result.dataPasien.jenisKelamin === "L"
              ? "Bapak/Sdr."
              : "Ibu/Sdri."
          );
        } else {
          setNoWA("");
          setDataTeleMedicine(null);
          setNamaWA(null);
          setPoliWA(null);
          setDokterWA(null);
          setKelaminWA(null);
          console.log(res.data.result);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setNoWA("");
        setDataTeleMedicine(null);
        console.log(err);
        message.warning("Gagal Mengambil Data!");
      });
  };

  const getRuangPenunjang = () => {
    axios
      .get(
        `${apiku}/MstRuang/lookup/${
          ruangasal === "9125" || ruangasal === "9182" ? "REHAB" : " "
        }/4/1/200`,
        options
      )
      .then((res) => {
        if (RsLokasi === "RSMS") {
          setPenunjang(
            res.data.result.sort((a, b) =>
              b.deskripsi
                .split("- ")
                .pop()
                .localeCompare(a.deskripsi.split("- ").pop())
            )
          );
        } else if (RsLokasi === "ABIYASA") {
          setPenunjang(
            res.data.result.sort((a, b) =>
              a.deskripsi
                .split("- ")
                .pop()
                .localeCompare(b.deskripsi.split("- ").pop())
            )
          );
        } else {
          setPenunjang(
            res.data.result.sort(
              (a, b) => parseFloat(a.ruangId) - parseFloat(b.ruangId)
            )
          );
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getPasienByUser = (searchkey, user, rs) => {
    axios
      .get(
        `${apiku}/EmrPasienAktif/LookupByRuangByUser/${searchkey}/${user}/${rs}/2`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPasien(res.data.result);
          setRefresh(false);
          setLoading(false);
          console.log(res.data);
        } else {
          setPasien([]);
          setRefresh(false);
          setLoading(false);
          console.log(res.data);
        }
      })
      .catch((err) => {
        setPasien([]);
        setRefresh(false);
        setLoading(false);
        console.log(err);
      });
  };

  const getPembayaran = () => {
    axios
      .get(`${apiku}/MstPembayaran/Lookup/%20/1/100`, options)
      .then((res) => {
        setPembayaran(res.data.result);
        // console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PasienContext.Provider
      value={{
        insertPasien,
        ktp,
        nik,
        setNIK,
        nama,
        setNama,
        tempatlahir,
        setTempatLahir,
        tanggallahir,
        setTanggalLahir,
        jnskelamin,
        setJnsKelamin,
        agama,
        setAgama,
        goldarah,
        setGolDarah,
        alamat,
        setAlamat,
        alamatdomisili,
        setAlamatDomisili,
        desaid,
        setDesaId,
        email,
        setEmail,
        notelepon,
        setNoTelepon,
        pekerjaan,
        setPekerjaan,
        pendidikan,
        setPendidikan,
        statuskawin,
        setStatusKawin,
        sukubangsa,
        setSukuBangsa,
        bahasa,
        setBahasa,
        namaibu,
        setNamaIbu,
        namaayah,
        setNamaAyah,
        namapasangan,
        setNamaPasangan,
        tandatangan,
        setTandaTangan,
        nonnik,
        setNonNIK,
        rt,
        setRT,
        rw,
        setRW,
        keterangan,
        setKeterangan,
        kodepos,
        setKodepos,
        tanggalmati,
        setTanggalMati,
        desanama,
        setDesaNama,
        pasienDetailJenisKelamin,
        pasienDetailAgama,
        pasienDetailPendidikan,
        pasienDetailStatusKwn,
        pasienDetailPekerjaan,
        pasienDetailGolonganDrh,
        pasienDetailSuku,
        pasienDetailBahasa,
        pasienDetailDesa,
        pasienDetailKelasRwt,
        pasienDetailPembayaran,
        cariPasienListAll,
        pasienlist,
        pasienid,
        setPasienID,
        setPasienList,
        getPasienDetail,
        pasiendetail,
        setLoading,
        loadingdetail,
        setLoadingDetail,
        loading,
        cariPoliUser,
        cariRuangUser,
        ruangasal,
        setRuangasal,
        ambilRuang,
        noreg,
        pasienRI,
        jumlahPasienRI,
        penunjang,
        caramasukid,
        lebar,
        setLebar,
        line3,
        apotik,
        pasien,
        setPasien,
        curpas,
        poli,
        poli1,
        setPoli1,
        ruang,
        ruangpoli,
        jumlah,
        jumlahPoli,
        curpasRI,
        riwayatpenyakit,
        riwayatpemeriksaan,
        detailRiwayatPenyakit,
        detailRiwayatPemeriksaan,
        detailPasien,
        cariPasien,
        cariPasienPoli,
        cariPoli,
        detailPasienRI,
        setCurpas,
        detailPasienLive,
        ambilStatistik,
        pembayaran,
        riwayatpasien,
        detailRiwayatPasien,
        refresh,
        setRefresh,
        setJumlah,
        ambilGrafik,
        cariPasienHD,
        pasienhd,
        cekKTP,
        current,
        setCurrent,
        nomorantrian,
        curantri,
        detailAntrian,
        doktercurpas,
        rs,
        setRS,
        listRuangPolibyRS,
        screening,
        ruangan,
        setScreening,
        cariPasienHariIni,
        cariPasienNamaHariIni,
        tanggal,
        setTanggal,
        apotikrj,
        NoWATelemedicine,
        noWA,
        dataTelemedicine,
        setDataTeleMedicine,
        getRuangPenunjang,
        getlistApotik,
        poli2,
        setPoli2,
        getPasienByUser,
        jumlahpasien,
        modalRiwayat,
        setmodalRiwayat,
        noKodeBooking,
        namawa,
        poliwa,
        dokterwa,
        kelaminwa,
        open,
        setOpen,
        currentt,
        setCurrentt,
        layout,
        setLayout,
        ruanginap,
        collapsed,
        setCollapsed,
        getPembayaran,
        load,
        setLoad,
        statusft,
        setStatusft,
      }}
    >
      {props.children}
    </PasienContext.Provider>
  );
};

export default PasienContextProvider;
