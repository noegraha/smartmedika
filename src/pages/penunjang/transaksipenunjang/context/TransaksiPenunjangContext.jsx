/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { message, Modal } from "antd";
import { LoginContext } from "../../../rawatjalan/context";

export const TransaksiPenunjangContext = createContext();

const endpoint = "http://182.168.6.72:5577";

const TransaksiPenunjangContextProvider = (props) => {
  const { token, namauser } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  const defaultNoTr = dayjs().format("YYMMDD");
  const [unitId, setUnitId] = useState("");
  const [stat, setStat] = useState(0);
  const [listPasien, setListPasien] = useState([]);
  // Main
  const [noOrder, setNoOrder] = useState("");
  const [noTransaksi, setNoTransaksi] = useState(defaultNoTr);
  const [tglDaftar, setTglDaftar] = useState(dayjs());
  const [jam, setJam] = useState(dayjs());
  const [pasienId, setPasienId] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [umur, setUmur] = useState("");
  const [namaPasien, setNamaPasien] = useState("");
  const [namaPenanggung, setNamaPenanggung] = useState("");
  const [kodePT, setKodePT] = useState("");
  const [jenisPasien, setJenisPasien] = useState("");
  const [kelasRawatId, setKelasRawatId] = useState("");
  const [unitAsalId, setunitAsalId] = useState("");
  const [deskKelasRawat, setDeskKelasRawat] = useState("");
  const [deskUnitAsalId, setDeskUnitAsalId] = useState("");
  const [namaDokter, setNamaDokter] = useState("");
  const [pemeriksaId, setPemeriksa] = useState("");
  const [listOrderPmr, setListOrderPmr] = useState([]);
  const [listBillPmr, setListBillPmr] = useState([]);
  const [listLookupReg, setListLookupReg] = useState([]);
  const [perbaikanPmr, setperbaikanPmr] = useState({});
  // Modal
  const [mdListOrder, setmdListOrder] = useState(false);
  const [mdDtTransaksiPmr, setmdDtTransaksiPmr] = useState(false);
  const [mdListPmrUnit, setmdListPmrUnit] = useState(false);
  const [mdLookupRegistrasi, setmdLookupRegistrasi] = useState(false);
  const [mdPerbaikiDtTrans, setmdPerbaikiDtTrans] = useState(false);
  // Spin
  const [spinLookupOrder, setSpinLookupOrder] = useState(false);
  const [spinAll, setspinAll] = useState(false);
  const [spinDetailTrans, setspinDetailTrans] = useState(false);
  const [spinDaftarPmr, setspinDaftarPmr] = useState(false);
  // disable
  const [disNoTransaksi, setdisNoTransaksi] = useState(false);
  // mst
  const [penunjang, setPenunjang] = useState([]);
  const [listdokPemeriksa, setListDokPemeriksa] = useState([]);
  const [listPemeriksaan, setListPemeriksaan] = useState([]);

  // mst
  const getRuangPenunjang = async () => {
    const response = await axios.get(
      `${endpoint}/MstRuang/Lookup/%20/4/1/100`,
      options
    );
    if (response.data.statusCode === 200) {
      setPenunjang(response.data.result);
      message.success("Load Unit Pelayanan Penunjang Berhasil.");
      if (response.data.result.length === 0) {
        message.warning("Data Unit Pelayanan Tidak Ditemukan");
      }
    } else {
      message.error("Error Load Unit Pelayanan Penunjang!");
    }
  };
  const getPemeriksa = async () => {
    const response = await axios.get(
      `${endpoint}/MstDokterSpesialisDetail/LookupSpesialis/%20`,
      options
    );
    if (response.data.statusCode === 200) {
      setListDokPemeriksa(response.data.result);
      message.success("Load Pemeriksa Penunjang Berhasil.");
      if (response.data.result.length === 0) {
        setListDokPemeriksa([]);
        message.warning("Data Pemeriksa Penunjang Tidak Ditemukan");
      }
    } else {
      setListDokPemeriksa([]);
      message.error("Error Load Pemeriksa Penunjang!");
    }
  };
  const getListPemeriksaan = async (unitId, kelasRawatId) => {
    setspinDaftarPmr(true);
    const response = await axios.get(
      `${endpoint}/MstStandarPelayananRuang/ReadByKelas/${unitId}/${kelasRawatId}/1/1000`,
      options
    );
    if (response.data.statusCode === 200) {
      setspinDaftarPmr(false);
      let tempList = response.data.result.sort((a, b) =>
        a.deskripsi.localeCompare(b.deskripsi)
      );
      // console.log('tempList : ', tempList);
      setListPemeriksaan(tempList);
      message.success("Load List Pemeriksa Berhasil.");
      if (response.data.result.length === 0) {
        message.warning("Data List Pemeriksaan Tidak Ditemukan");
      }
    } else {
      setspinDaftarPmr(false);
      message.error("Error Load List Pemeriksaan!");
    }
  };

  useEffect(() => {
    getRuangPenunjang();
  }, []);

  const getListOrder = async (unitId, noOrder, stat) => {
    setSpinLookupOrder(true);
    console.log("unitId : ", unitId);
    axios
      .get(
        `${endpoint}/BillTransaksiPenunjangMedis/listorder/${unitId}/${noOrder}/${stat}`,
        options
      )
      .then((response) => {
        // console.log("getPasienRi ", res.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setListPasien([]);
            setSpinLookupOrder(false);
            Modal.info({
              title: "Informasi",
              content: `Tidak ada order ditemukan.`,
            });
          } else {
            console.log("getListOrder : ", response.data.result);
            setListPasien(response.data.result);
            setmdListOrder(true);
            setSpinLookupOrder(false);
          }
        } else {
          setListPasien([]);
          setSpinLookupOrder(false);
          Modal.error({
            title: "Error",
            content: `Gagal melakukan proses ambil data List Order!`,
          });
        }
      })
      .catch((err) => {
        setListPasien([]);
        setSpinLookupOrder(false);
        Modal.error({
          title: "Error",
          content: `Gagal melakukan proses ambil data List Order! -> ${err}`,
        });
      });
  };

  const getListOrderToCheck = async (unitId, noReg, stat) => {
    setspinAll(true);
    axios
      .get(
        `${endpoint}/BillTransaksiPenunjangMedis/listorder/${unitId}/${noReg}/${stat}`,
        options
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          setspinAll(false);
          if (response.data.result.length === 0) {
            if (listdokPemeriksa.length === 0) {
              getPemeriksa();
            }
            setPemeriksa("");
            setListOrderPmr([]);
            setmdDtTransaksiPmr(true);
          } else {
            Modal.error({
              title: "Peringatan!",
              content: `Pasien ini masih memiliki LIST ORDER, Mohon Validasi terlebih dahulu LIST ORDER tersebut!`,
            });
          }
        } else {
          setspinAll(false);
          Modal.error({
            title: "Error",
            content: `Gagal melakukan proses Cek data List Order!`,
          });
        }
      })
      .catch((err) => {
        setspinAll(false);
        Modal.error({
          title: "Error",
          content: `Gagal melakukan proses Cek data List Order! -> ${err}`,
        });
      });
  };

  const deleteOrder = (noOrder) => {
    axios
      .delete(`${endpoint}/BillTransaksiPenunjangMedis/${noOrder}`, options)
      .then((response) => {
        if (response.data.statusCode === 200) {
          getListOrder(unitId, "%20", stat);
          Modal.success({
            title: "Informasi",
            content: `Order dengan Nomor Order ${noOrder} berhasil dihapus.`,
          });
        } else {
          Modal.error({
            title: "Error",
            content: `Order dengan Nomor Order ${noOrder} gagal dihapus!`,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Error",
          content: `Gagal melakukan proses hapus Nomor Order ${noOrder}! -> ${err}`,
        });
      });
  };

  const LookupRegistrasi = (sSearch) => {
    axios
      .get(
        `${endpoint}/BillTransaksiPenunjangMedis/listregistrasi/${sSearch}`,
        options
      )
      .then((response) => {
        // console.log("getPasienRi ", res.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setListLookupReg([]);
            Modal.info({
              title: "Informasi",
              content: `Tidak ada Registrasi ditemukan.`,
              onOk: () => {
                setmdLookupRegistrasi(false);
              },
            });
          } else {
            console.log("LookupRegistrasi : ", response.data.result);
            setListLookupReg(response.data.result);
          }
        } else {
          setListLookupReg([]);
          Modal.error({
            title: "Error",
            content: `Gagal melakukan proses ambil data List Registrasi!`,
            onOk: () => {
              setmdLookupRegistrasi(false);
            },
          });
        }
      })
      .catch((err) => {
        setListLookupReg([]);
        Modal.error({
          title: "Error",
          content: `Gagal melakukan proses ambil data List Registrasi! -> ${err}`,
          onOk: () => {
            setmdLookupRegistrasi(false);
          },
        });
      });
  };

  const LookupPemeriksaan = (sNoreg, sRuangId) => {
    axios
      .get(
        `${endpoint}/BillTransaksiPenunjangMedis/listpmr/${sNoreg}/${sRuangId}`,
        options
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            Modal.info({
              title: "Informasi",
              content: `Tidak ada Pemeriksaan ditemukan.`,
              // onOk: () => {
              //     setmdLookupRegistrasi(false)
              // }
            });
          } else {
            console.log("LookupPemeriksaan : ", response.data.result);
          }
        } else {
          Modal.error({
            title: "Error",
            content: `Gagal melakukan proses ambil data List Pemeriksaan!`,
            // onOk: () => {
            //     setmdLookupRegistrasi(false)
            // }
          });
        }
      })
      .catch((err) => {
        setListLookupReg([]);
        Modal.error({
          title: "Error",
          content: `Gagal melakukan proses ambil data List Pemeriksaan! -> ${err}`,
          // onOk: () => {
          //     setmdLookupRegistrasi(false)
          // }
        });
      });
  };

  const getbyNoReg = (sNoreg, sRuangId) => {
    setspinAll(true);
    axios
      .get(
        `${endpoint}/BillTransaksiPenunjangMedis/getpmrbyreg/${sNoreg}/${sRuangId}`,
        options
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setspinAll(false);
            Modal.info({
              title: "Informasi",
              content: `Tidak ada Registrasi ditemukan.`,
              // onOk: () => {
              //     setmdLookupRegistrasi(false)
              // }
            });
          } else {
            setspinAll(false);
            // console.log("getbyNoReg : ", response.data.result)
            setNoOrder("");
            setNoTransaksi(response.data.result.registrasiId);
            setPasienId(response.data.result.pasienId);
            setTglDaftar(response.data.result.jamRegistrasi);
            setJam(response.data.result.jamRegistrasi);
            setJenisKelamin(response.data.result.jenisKelamin);
            setUmur(response.data.result.umur);
            setNamaPasien(response.data.result.nama);
            setNamaPenanggung(response.data.result.penanggungJawab);
            setKodePT(response.data.result.pembayaranId);
            setJenisPasien(response.data.result.deskPembayaran);
            setunitAsalId(response.data.result.unitOrderId);
            setKelasRawatId(response.data.result.kelasRawatId);
            setDeskKelasRawat(response.data.result.deskKelasRawat);
            setDeskUnitAsalId(response.data.result.deskUnitOrderId);
            setNamaDokter(response.data.result.namaDokter);

            if (response.data.result.billPemeriksaan.length !== 0) {
              let newData = [...response.data.result.billPemeriksaan];
              setListBillPmr(newData);
            } else {
              setListBillPmr([]);
            }
          }
        } else {
          setspinAll(false);
          Modal.warning({
            title: "Peringatan!",
            content: `Peringatan! -> ${response.data.message}`,
            // onOk: () => {
            //     setmdLookupRegistrasi(false)
            // }
          });
        }
      })
      .catch((err) => {
        setspinAll(false);
        Modal.error({
          title: "Error",
          content: `Gagal melakukan proses ambil data List Pemeriksaan! -> ${err}`,
          // onOk: () => {
          //     setmdLookupRegistrasi(false)
          // }
        });
      });
  };

  const getDetailTrPmr = (noOrder) => {
    setspinAll(true);
    setspinDetailTrans(true);
    setPemeriksa("");
    axios
      .get(
        `${endpoint}/BillTransaksiPenunjangMedis/detailtrpmr/${noOrder}`,
        options
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setspinAll(false);
            setspinDetailTrans(false);
            Modal.warning({
              title: "Peringatan!",
              content: `No Order ${noOrder} tidak ditemukan.`,
            });
          } else {
            console.log("getDetailTrPmr : ", response.data.result);
            setNoTransaksi(response.data.result.registrasiId);
            setPasienId(response.data.result.pasienId);
            setTglDaftar(response.data.result.jamRegistrasi);
            setJam(response.data.result.jamRegistrasi);
            setJenisKelamin(response.data.result.jenisKelamin);
            setUmur(response.data.result.umur);
            setNamaPasien(response.data.result.nama);
            setNamaPenanggung(response.data.result.penanggungJawab);
            setKodePT(response.data.result.pembayaranId);
            setJenisPasien(response.data.result.deskPembayaran);
            setunitAsalId(response.data.result.unitOrderId);
            setKelasRawatId(response.data.result.kelasRawatId);
            setDeskKelasRawat(response.data.result.deskKelasRawat);
            setDeskUnitAsalId(response.data.result.deskUnitOrderId);
            setNamaDokter(response.data.result.namaDokter);
            if (response.data.result.billOrderPenunjang.length !== 0) {
              let newData = [...response.data.result.billOrderPenunjang];
              newData.forEach(function (element) {
                element.tipePelayanan = "B";
                element.unitId = unitId;
                element.pembayaranId = response.data.result.pembayaranId;
              });
              setListOrderPmr(newData);
            } else {
              setListOrderPmr([]);
            }

            if (response.data.result.billPemeriksaan.length !== 0) {
              let newData = [...response.data.result.billPemeriksaan];
              // newData.forEach(function (element) {
              //     element.tipePelayanan = 'B';
              //     element.unitId = unitId;
              //     element.pembayaranId = response.data.result.pembayaranId;
              // });
              setListBillPmr(newData);
            } else {
              setListBillPmr([]);
            }
            setspinAll(false);
            setspinDetailTrans(false);
          }
        } else {
          setspinAll(false);
          setspinDetailTrans(false);
          Modal.error({
            title: "Error",
            content: `Gagal melakukan proses ambil data Detail Transaksi Pemeriksaan!`,
          });
        }
      })
      .catch((err) => {
        setspinAll(false);
        setspinDetailTrans(false);
        Modal.error({
          title: "Error",
          content: `Gagal melakukan proses ambil data Detail Transaksi Pemeriksaan! -> ${err}`,
        });
      });
  };

  const insertValidOrder = (dataOrder, index, length) => {
    axios
      .post(`${endpoint}/BillTransaksiPenunjangMedis`, dataOrder, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Sukses",
            content: `Berhasil Disimpan Pemeriksaan ${
              index + 1
            }! Dari ${length} Pemeriksaan.`,
            onOk: () => {
              if (noOrder) {
                getDetailTrPmr(noOrder);
                setNoOrder("");
              } else {
                getbyNoReg(noTransaksi, unitId);
              }
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal Disimpan Pemeriksaan ${index + 1}! -> ${
              res.data.message
            }.`,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR!",
          content: `Gagal Disimpan! -> ${err}`,
        });
      });
  };

  const updateOrderValid = (data) => {
    setspinAll(true);
    axios
      .post(
        `${endpoint}/BillTransaksiPenunjangMedis/updatepemeriksaanvalid`,
        data,
        {
          headers: options.headers,
        }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setspinAll(false);
          Modal.success({
            title: "Sukses",
            content: `Berhasil Update Pemeriksaan.`,
            onOk: () => {
              if (noOrder) {
                getDetailTrPmr(noOrder);
              } else {
                getbyNoReg(noTransaksi, unitId);
              }
            },
          });
        } else {
          setspinAll(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal Update Pemeriksaan.`,
          });
        }
      })
      .catch((err) => {
        setspinAll(false);
        Modal.error({
          title: "ERROR!",
          content: `Gagal Update! -> ${err}`,
        });
      });
  };

  const deletePemeriksaan = (data) => {
    axios
      .delete(
        `${endpoint}/BillTransaksiPenunjangMedis/deletepmr/${noTransaksi}/${
          data.ruangId
        }/${data.pelayananId}/${dayjs(data.tglPelayanan).format("DD-MM-YYYY")}`,
        options
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          Modal.success({
            title: "Sukses",
            content: `Berhasil Hapus Pemeriksaan.`,
            onOk: () => {
              if (noOrder) {
                getDetailTrPmr(noOrder);
              } else {
                getbyNoReg(noTransaksi, unitId);
              }
            },
          });
        } else {
          Modal.error({
            title: "Error",
            content: `Pemeriksaan gagal dihapus!`,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Error",
          content: `Gagal melakukan proses hapus Pemeriksaan! -> ${err}`,
        });
      });
  };

  return (
    <TransaksiPenunjangContext.Provider
      value={{
        penunjang,
        defaultNoTr,
        unitId,
        setUnitId,
        stat,
        setStat,
        listPasien,
        setListPasien,
        // main
        noOrder,
        setNoOrder,
        noTransaksi,
        setNoTransaksi,
        tglDaftar,
        setTglDaftar,
        jam,
        setJam,
        pasienId,
        setPasienId,
        jenisKelamin,
        setJenisKelamin,
        umur,
        setUmur,
        namaPasien,
        setNamaPasien,
        namaPenanggung,
        setNamaPenanggung,
        kodePT,
        setKodePT,
        jenisPasien,
        setJenisPasien,
        kelasRawatId,
        setKelasRawatId,
        unitAsalId,
        setunitAsalId,
        deskKelasRawat,
        setDeskKelasRawat,
        deskUnitAsalId,
        setDeskUnitAsalId,
        namaDokter,
        setNamaDokter,
        namauser,
        ip,
        host,
        pemeriksaId,
        setPemeriksa,
        listOrderPmr,
        setListOrderPmr,
        listBillPmr,
        setListBillPmr,
        listLookupReg,
        setListLookupReg,
        perbaikanPmr,
        setperbaikanPmr,
        getListOrder,
        deleteOrder,
        getDetailTrPmr,
        insertValidOrder,
        LookupRegistrasi,
        LookupPemeriksaan,
        getbyNoReg,
        updateOrderValid,
        deletePemeriksaan,
        getListOrderToCheck,
        // modal
        mdListOrder,
        setmdListOrder,
        mdDtTransaksiPmr,
        setmdDtTransaksiPmr,
        mdListPmrUnit,
        setmdListPmrUnit,
        mdLookupRegistrasi,
        setmdLookupRegistrasi,
        mdPerbaikiDtTrans,
        setmdPerbaikiDtTrans,
        // spin
        spinLookupOrder,
        setSpinLookupOrder,
        spinAll,
        setspinAll,
        spinDetailTrans,
        setspinDetailTrans,
        spinDaftarPmr,
        setspinDaftarPmr,
        // disable
        disNoTransaksi,
        setdisNoTransaksi,
        // mst
        listdokPemeriksa,
        setListDokPemeriksa,
        getPemeriksa,
        listPemeriksaan,
        setListPemeriksaan,
        getListPemeriksaan,
      }}
    >
      {props.children}
    </TransaksiPenunjangContext.Provider>
  );
};

export default TransaksiPenunjangContextProvider;
