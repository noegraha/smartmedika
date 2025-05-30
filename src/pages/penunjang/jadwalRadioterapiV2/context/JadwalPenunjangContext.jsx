import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";
import dayjs from "dayjs";
import { LoginContext } from "../../../rawatjalan/context";

export const JadwalPenunjangContext = createContext();

const endpoint = "http://182.168.6.202/api";

const endpointmst = "http://182.168.6.202/api";

const JadwalPenunjangContextProvider = (props) => {
  const { token, namauser } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const [unitId, setunitId] = useState("");
  const [ktgCari, setktgCari] = useState("2");
  const [tglAwal, settglAwal] = useState(dayjs());
  const [tglAkhir, settglAkhir] = useState(dayjs());
  const [bln, setbln] = useState(dayjs());
  // main
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const nmUser = namauser;
  const [idJadwal, setidJadwal] = useState("");
  const [noReg, setnoReg] = useState("");
  const [bookingOpId, setbookingOpId] = useState("");
  const [nama, setnama] = useState("");
  const [alamat, setalamat] = useState("");
  const [noRm, setnoRm] = useState("");
  const [jenisKelamin, setjenisKelamin] = useState("");
  const [noKartu, setnoKartu] = useState("");
  const [noTelp, setnoTelp] = useState("");
  const [diagnosa, setdiagnosa] = useState("");
  const [tglLahir, settglLahir] = useState("");
  const [jnsPelayanan, setjnsPelayanan] = useState("");
  const [tglPelayanan, settglPelayanan] = useState(dayjs());
  const [kodePmr, setkodePmr] = useState("");
  const [catatan, setcatatan] = useState("");
  const [listJadwal, setlistJadwal] = useState([]);
  const [listCount, setlistCount] = useState([]);
  const [listCounta, setlistCounta] = useState([]);
  // dashboard
  const [dtGrafik, setdtGrafik] = useState([]);
  const [totalJadwal, settotalJadwal] = useState(0);
  const [totalDatang, settotalDatang] = useState(0);
  const [dtDetail, setdtDetail] = useState([]);
  // modal
  const [mdBuatJadwal, setmdBuatJadwal] = useState(false);
  const [mdEditJadwal, setmdEditJadwal] = useState(false);
  const [mdDashboard, setmdDashboard] = useState(false);
  // mst
  const [optJPelayanan, setoptJPelayanan] = useState([]);
  const [optPemeriksaan, setoptPemeriksaan] = useState([]);
  // spin
  const [spinInfoJadwal, setspinInfoJadwal] = useState(false);
  const [spinListJadwal, setspinListJadwal] = useState(false);
  const [spinCariFormAtur, setspinCariFormAtur] = useState(false);
  const [spinKlikPemeriksaan, setspinKlikPemeriksaan] = useState(false);
  const [spinKlikSimpan, setspinKlikSimpan] = useState(false);
  const [spinTbListCounta, setspinTbListCounta] = useState(false);

  // MASTER RUANG
  // 9401 - RADIOLOGI RSMS
  // 9404 - RADIOTERAPHI RSMS
  // 9451 - RADIOLOGI - ABIYASA
  const penunjang = [
    {
      ruangId: "9401",
      deskripsi: "RADIOLOGI - RSMS",
    },
    {
      ruangId: "9404",
      deskripsi: "RADIOTERAPHI - RSMS",
    },
    {
      ruangId: "9451",
      deskripsi: "RADIOLOGI - ABIYASA",
    },
  ];

  // MASTER JENIS PELAYANAN RADIOTERAPI
  const jpRadioterapi = [
    "SIMULATOR",
    "SINAR PERTAMA",
    "BRAHI",
    // {
    //     id: 'RDT-001',
    //     deskripsi: 'SIMULATOR'
    // },
    // {
    //     id: 'RDT-002',
    //     deskripsi: 'SINAR PERTAMA'
    // },
    // {
    //     id: 'RDT-003',
    //     deskripsi: 'BRAHI'
    // },
  ];

  // MASTER JENIS PELAYANAN RADIOLOGI
  const jpRadiologi = [
    "CT-SCAN",
    "CT-SCAN + KONTRAS",
    "KONVENSIONAL + KONTRAS",
    "MRI",
    "USG",
    // {
    //     id: 'RDL-001',
    //     deskripsi: 'USG'
    // },
    // {
    //     id: 'RDL-002',
    //     deskripsi: 'CT-SCAN + KONTRAS'
    // },
    // {
    //     id: 'RDL-003',
    //     deskripsi: 'MRI'
    // },
    // {
    //     id: 'RDL-004',
    //     deskripsi: 'KONVENSIONAL + KONTRAS'
    // },
  ];

  const loadPelayananRuang = (ruangId) => {
    setspinKlikPemeriksaan(true);
    axios
      .get(
        `${endpointmst}/MstStandarPelayananRuang/Read/${ruangId}/1/1000`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setPelayanan(res.data.result.sort((a, b) => a.deskripsi.localeCompare(b.deskripsi))
          // );
          setspinKlikPemeriksaan(false);
          let data = res.data.result.sort((a, b) =>
            a.deskripsi.localeCompare(b.deskripsi)
          );
          setoptPemeriksaan(data);
          message.success("Load Pemeriksaan Berhasil.");
          // console.log('Pemeriksaan : ', res.data.result);
        } else {
          setspinKlikPemeriksaan(false);
          setoptPemeriksaan([]);
          message.warning("Load Pemeriksaan gagal! -> " + res.data.message);
        }
      })
      .catch((err) => {
        setspinKlikPemeriksaan(false);
        setoptPemeriksaan([]);
        // console.log(err);
        message.error("Load Pemeriksaan ERROR! -> " + err);
      });
  };

  const getListJadwal = (sRuangId, sTglAwal, sTglAkhir) => {
    setspinListJadwal(true);
    axios
      .get(
        `${endpoint}/EmrJadwalPenunjang/listantrianpenunjang/${sRuangId}/${sTglAwal}/${sTglAkhir}`,
        options
      )
      .then((response) => {
        // console.log("getPasienRi ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setlistJadwal([]);
            setspinListJadwal(false);
            Modal.info({
              title: "Informasi",
              content: `Tidak ada Jadwal ditemukan.`,
            });
          } else {
            // console.log("getListOrder : ", response.data.result);
            setlistJadwal(response.data.result);
            // setmdListOrder(true)
            setspinListJadwal(false);
          }
        } else {
          setlistJadwal([]);
          setspinListJadwal(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data List Jadwal!`,
          });
        }
      })
      .catch((err) => {
        setlistJadwal([]);
        setspinListJadwal(false);
        Modal.error({
          title: "Error!",
          content: `Error melakukan proses ambil data List Jadwal! -> ${err}`,
        });
      });
  };

  const setDefault = () => {
    setidJadwal("");
    setnoReg("");
    setbookingOpId("");
    setnama("");
    setalamat("");
    setnoRm("");
    setjenisKelamin("");
    setnoKartu("");
    setnoTelp("");
    setdiagnosa("");
    settglLahir("");
    setjnsPelayanan("");
    settglPelayanan(dayjs());
    setkodePmr("");
    setcatatan("");
  };

  const getInformasi = (sKode, sBulan) => {
    setspinInfoJadwal(true);
    axios
      .get(
        `${endpoint}/EmrJadwalPenunjang/countjadwalpenunjang/${sKode}/${sBulan}`,
        options
      )
      .then((response) => {
        // console.log("getInformasi", response.data);
        if (response.data.statusCode === 200) {
          setspinInfoJadwal(false);
          setlistCount(response.data.result);
          if (response.data.result.length === 0) {
            message.info("Tidak ada Informasi Jadwal.");
          }
        } else {
          setspinInfoJadwal(false);
          setlistCount([]);
          Modal.error({
            title: "Gagal",
            content: `Gagal melakukan proses ambil Detail Pasien!`,
          });
        }
      })
      .catch((err) => {
        setspinInfoJadwal(false);
        setlistCount([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil Detail Pasien! -> ${err}`,
        });
      });
  };

  const getDetailPasien = (sKode, sSearch) => {
    setspinCariFormAtur(true);
    axios
      .get(
        `${endpoint}/EmrJadwalPenunjang/detailpasien/${sKode}/${sSearch}`,
        options
      )
      .then((response) => {
        // console.log("getDetailPasien", response.data);
        if (response.data.statusCode === 200) {
          setspinCariFormAtur(false);
          setnama(response.data.result.Nama);
          setnoReg(response.data.result.RegistrasiId);
          setalamat(response.data.result.Alamat);
          setnoRm(response.data.result.PasienId);
          setjenisKelamin(response.data.result.JenisKelaminId);
          setnoKartu(response.data.result.NoPolish);
          setnoTelp(response.data.result.NoTelepon);
          settglLahir(dayjs(response.data.result.TanggalLahir));
        } else if (response.data.statusCode === 404) {
          setspinCariFormAtur(false);
          if (sKode === "1") {
            Modal.info({
              title: "Informasi",
              content: `Tidak ada Detail Pasien ditemukan. No.Pasien : ${sSearch}`,
              onOk: () => {
                setDefault();
              },
            });
          } else {
            Modal.info({
              title: "Informasi",
              content: `Tidak ada Detail Pasien ditemukan. No.Registrasi : ${sSearch}`,
              onOk: () => {
                setDefault();
              },
            });
          }
        } else {
          setspinCariFormAtur(false);
          // setspinTbOrder(false)
          Modal.error({
            title: "Gagal",
            content: `Gagal melakukan proses ambil Detail Pasien!`,
          });
        }
      })
      .catch((err) => {
        setspinCariFormAtur(false);
        // setspinTbOrder(false)
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil Detail Pasien! -> ${err}`,
        });
      });
  };

  const getJadwalBySearch = (sKode, sRuangId, sSearch) => {
    axios
      .get(
        `${endpoint}/EmrJadwalPenunjang/jadwalpenunjangsearch/${sKode}/${sRuangId}/${sSearch}`,
        options
      )
      .then((response) => {
        // console.log("getJadwalBySearch", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result === null) {
            setlistJadwal([]);
            if (sKode === "1") {
              Modal.info({
                title: "Informasi",
                content: `Tidak ada Jadwal ditemukan. No.Pasien : ${sSearch}`,
                // onOk: () => {
                //     setDefault()
                // },
              });
            } else {
              Modal.info({
                title: "Informasi",
                content: `Tidak ada Jadwal ditemukan. Pencarian Nama : ${sSearch}`,
                // onOk: () => {
                //     setDefault()
                // },
              });
            }
          } else {
            // setspinTbOrder(false)
            setlistJadwal(response.data.result);
          }
        } else {
          // setspinTbOrder(false)
          setlistJadwal([]);
          Modal.error({
            title: "Gagal",
            content: `Gagal melakukan proses cari Jadwal Pelayanan!`,
          });
        }
      })
      .catch((err) => {
        // setspinTbOrder(false)
        setlistJadwal([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses cari Jadwal Pelayanan! -> ${err}`,
        });
      });
  };

  const countInfobyDate = (sRuangId, sTanggal) => {
    setspinTbListCounta(true);
    axios
      .get(
        `${endpoint}/EmrJadwalPenunjang/countjadwalbydate/${sRuangId}/${sTanggal}`,
        options
      )
      .then((response) => {
        // console.log("countInfobyDate", response.data);
        if (response.data.statusCode === 200) {
          setspinTbListCounta(false);
          setlistCounta(response.data.result);
        } else {
          setspinTbListCounta(false);
          setlistCounta([]);
          Modal.error({
            title: "Gagal",
            content: `Gagal melakukan proses ambil informasi jumlah jadwal!`,
          });
        }
      })
      .catch((err) => {
        setspinTbListCounta(false);
        setlistCounta([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil informasi jumlah jadwal! -> ${err}`,
        });
      });
  };

  const insertJadwal = (data) => {
    setspinCariFormAtur(true);
    axios
      .post(`${endpoint}/EmrJadwalPenunjang/insertjadwalpenunjang`, data, {
        headers: options.headers,
      })
      .then((res) => {
        // console.log('InsertJadwal : ', res.data);
        if (res.data.statusCode === 200) {
          setspinCariFormAtur(false);
          Modal.success({
            title: "Berhasil",
            content: `Berhasil, Jadwal tersimpan.`,
            onOk: async () => {
              setmdBuatJadwal(false);
              setDefault();
              getListJadwal(
                unitId,
                dayjs(tglAwal).format("YYYY-MM-DD"),
                dayjs(tglAkhir).format("YYYY-MM-DD")
              );
              getInformasi(unitId, dayjs(bln).format("YYYY-MM"));
            },
          });
        } else {
          setspinCariFormAtur(false);
          Modal.error({
            title: "Gagal!",
            content: `Jadwal gagal tersimpan! -> ${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspinCariFormAtur(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR, Jadwal tidak tersimpan! -> ${err}`,
        });
      });
  };

  const updateJadwal = (data) => {
    setspinCariFormAtur(true);
    axios
      .post(`${endpoint}/EmrJadwalPenunjang/updatejadwalpenunjang`, data, {
        headers: options.headers,
      })
      .then((res) => {
        // console.log('UpdateJadwal : ', res.data);
        if (res.data.statusCode === 200) {
          setspinCariFormAtur(false);
          Modal.success({
            title: "Berhasil",
            content: `Berhasil, Jadwal diubah.`,
            onOk: async () => {
              setmdEditJadwal(false);
              setDefault();
              getListJadwal(
                unitId,
                dayjs(tglAwal).format("YYYY-MM-DD"),
                dayjs(tglAkhir).format("YYYY-MM-DD")
              );
              getInformasi(unitId, dayjs(bln).format("YYYY-MM"));
            },
          });
        } else {
          setspinCariFormAtur(false);
          Modal.error({
            title: "Gagal!",
            content: `Jadwal gagal diubah! -> ${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspinCariFormAtur(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR, Jadwal tidak terubah! -> ${err}`,
        });
      });
  };

  const updateStsDatang = (data) => {
    setspinListJadwal(true);
    axios
      .post(
        `${endpoint}/EmrJadwalPenunjang/updatestsdatangjadwalpenunjang`,
        data,
        {
          headers: options.headers,
        }
      )
      .then((res) => {
        // console.log('UpdateJadwal : ', res.data);
        if (res.data.statusCode === 200) {
          setspinListJadwal(false);
          Modal.success({
            title: "Berhasil",
            content: `Berhasil, Update Status Datang.`,
            onOk: async () => {
              getListJadwal(
                unitId,
                dayjs(tglAwal).format("YYYY-MM-DD"),
                dayjs(tglAkhir).format("YYYY-MM-DD")
              );
            },
          });
        } else {
          setspinListJadwal(false);
          Modal.error({
            title: "Gagal!",
            content: `Status Datang gagal diubah! -> ${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspinListJadwal(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR, Status Datang tidak terubah! -> ${err}`,
        });
      });
  };

  const hapusJadwal = (data) => {
    axios
      .post(`${endpoint}/EmrJadwalPenunjang/hapusjadwalpenunjang`, data, {
        headers: options.headers,
      })
      .then((res) => {
        // console.log('HapusJadwal : ', res.data);
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Berhasil",
            content: `Berhasil, Jadwal dihapus.`,
            onOk: async () => {
              setDefault();
              getListJadwal(
                unitId,
                dayjs(tglAwal).format("YYYY-MM-DD"),
                dayjs(tglAkhir).format("YYYY-MM-DD")
              );
              getInformasi(unitId, dayjs(bln).format("YYYY-MM"));
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Jadwal gagal dihapus! -> ${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR!",
          content: `ERROR, Jadwal tidak terhapus! -> ${err}`,
        });
      });
  };

  // DASHBOARD
  const getJadwalbyMonth = (sRuangId, sMonth) => {
    axios
      .get(
        `${endpoint}/EmrJadwalPenunjang/dashjwlpenbymonth/${sRuangId}/${sMonth}`,
        options
      )
      .then((response) => {
        // console.log("countInfobyDate", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result === null) {
            setdtGrafik([]);
            Modal.info({
              title: "Informasi",
              content: `Tidak ada informasi Jadwal.`,
            });
          } else {
            const totalJadwal = response.data.result.reduce((prev, current) => {
              if (current.jenis === "jadwalpasien") prev += current.jumlah;
              return prev;
            }, 0);
            const totalPasienDatang = response.data.result.reduce(
              (prev, current) => {
                if (current.jenis === "jadwalpasiendatang")
                  prev += current.jumlah;
                return prev;
              },
              0
            );

            setdtGrafik(response.data.result);
            settotalJadwal(totalJadwal);
            settotalDatang(totalPasienDatang);
          }
        } else {
          setdtGrafik([]);
          Modal.error({
            title: "Gagal",
            content: `Gagal melakukan proses ambil informasi jumlah jadwal!`,
          });
        }
      })
      .catch((err) => {
        setdtGrafik([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil informasi jumlah jadwal! -> ${err}`,
        });
      });
  };

  const getDetailJadwalbyDate = (sRuangId, sTgl) => {
    axios
      .get(
        `${endpoint}/EmrJadwalPenunjang/dashdetailjwlpenbydate/${sRuangId}/${sTgl}`,
        options
      )
      .then((response) => {
        // console.log("countInfobyDate", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result === null) {
            setdtDetail([]);
            Modal.info({
              title: "Informasi",
              content: `Tidak ada informasi Jadwal.`,
            });
          } else {
            setdtDetail(response.data.result);
          }
        } else {
          setdtDetail([]);
          Modal.error({
            title: "Gagal",
            content: `Gagal melakukan proses ambil detail jadwal!`,
          });
        }
      })
      .catch((err) => {
        setdtDetail([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil detail jadwal! -> ${err}`,
        });
      });
  };

  return (
    <JadwalPenunjangContext.Provider
      value={{
        ktgCari,
        setktgCari,
        tglAwal,
        settglAwal,
        tglAkhir,
        settglAkhir,
        bln,
        setbln,
        // main
        unitId,
        setunitId,
        ip,
        host,
        nmUser,
        idJadwal,
        setidJadwal,
        noReg,
        setnoReg,
        bookingOpId,
        setbookingOpId,
        nama,
        setnama,
        alamat,
        setalamat,
        noRm,
        setnoRm,
        jenisKelamin,
        setjenisKelamin,
        noKartu,
        setnoKartu,
        noTelp,
        setnoTelp,
        diagnosa,
        setdiagnosa,
        tglLahir,
        settglLahir,
        jnsPelayanan,
        setjnsPelayanan,
        tglPelayanan,
        settglPelayanan,
        kodePmr,
        setkodePmr,
        catatan,
        setcatatan,
        listJadwal,
        setlistJadwal,
        listCount,
        setlistCount,
        listCounta,
        setlistCounta,
        dtGrafik,
        setdtGrafik, // dashboard
        totalJadwal, // dashboard
        totalDatang, // dashboard
        dtDetail,
        setdtDetail, // dashboard
        // modal
        mdBuatJadwal,
        setmdBuatJadwal,
        mdEditJadwal,
        setmdEditJadwal,
        mdDashboard,
        setmdDashboard,
        // mst
        penunjang,
        jpRadioterapi,
        jpRadiologi,
        optJPelayanan,
        setoptJPelayanan,
        optPemeriksaan,
        setoptPemeriksaan,
        // func
        getDetailPasien,
        getListJadwal,
        getInformasi,
        getJadwalBySearch,
        countInfobyDate,
        getJadwalbyMonth, // dashboard
        getDetailJadwalbyDate, // dashboard
        setDefault,
        insertJadwal,
        updateJadwal,
        updateStsDatang,
        hapusJadwal,
        // load mst
        loadPelayananRuang,
        // spin
        spinInfoJadwal,
        setspinInfoJadwal,
        spinListJadwal,
        setspinListJadwal,
        spinCariFormAtur,
        setspinCariFormAtur,
        spinKlikPemeriksaan,
        setspinKlikPemeriksaan,
        spinKlikSimpan,
        setspinKlikSimpan,
        spinTbListCounta,
        setspinTbListCounta,
      }}
    >
      {props.children}
    </JadwalPenunjangContext.Provider>
  );
};

export default JadwalPenunjangContextProvider;
