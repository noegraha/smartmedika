/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { LoginContext } from "../../../rawatjalan/context";
import { message, Modal } from "antd";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import { PrintOutContext } from "../../../PrintOutDokumen/PrintOutContext";
import { AssesmentRIContext } from "../../../rawatinap/context/AssesmentRIContext";

export const KemoterapiContext = createContext();

const KemoterapiContextProvider = (props) => {
  const { token, namauser } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const {
    detailPasien,
  } = useContext(PasienContext)

  const {
    setTandaVitalId,
    setgcsMata,
    setgcsSuara,
    setgcsGerakan,
    settekananDarahSistolik,
    settekananDarahDiastolik,
    setsuhuTubuh,
    setfrekuensiNadi,
    setfrekuensiNafas,
    setberatBadan,
    settinggiBadan,
    setsaturasiOksigen,
    setiramaNadi,
    settingkatKesadaranId,
    // skor nyeri
    setmetodeResikoJatuh,
    setrJatuh1,
    setrJatuh2,
    setsMental1,
    setsMental2,
    setsMental3,
    setsMata1,
    setsMata2,
    setsMata3,
    setkebiasaanBerkemih,
    settransferTT,
    setmobilitas,
    sethumDumUsia,
    sethumDumKel,
    sethumDumDiagnosa,
    sethumDumGangguanKognitif,
    sethumDumLingkungan,
    sethumDumRespon,
    sethumDumPemObat,
    setmorseRiwJatuh,
    setmorseDiagnosa,
    setmorseKondisiJalan,
    setmorseInfus,
    setmorseKondisiBadan,
    setmorseGangKognitif,
    // skala nyeri
    setscalaNyeri,
    setskalaNyeri1,
    setskalaNyeri2,
    setskalaNyeri3,
    setskalaNyeri4,
    setskalaNyeri5,
    setskalaNyeri6,

    getTTVAssByRuang,
    getNyeriByRegDate,
    getResikoJatuhByRegDate,
  } = useContext(AssesmentRIContext)

  const {
    setprintLabPk,
    setprintLabPa,
    // setpilihWaktu,
    // setprintPerawatIGD,
    // setprintDokterIGD,
    // setprintRm02Kunjungan,
  } = useContext(PrintOutContext);

  const ipEndpoint = sessionStorage.getItem("apiPenunjang");

  // const endpoint = "http://182.168.6.202/api";
  const endpoint = ipEndpoint;
  // const endpoint = "http://182.168.6.72:5577"
  // const endpoint = "http://182.168.6.199:5577"

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  // state
  const [unitId, setunitId] = useState("9418");
  const [jnsRawat, setjnsRawat] = useState();
  const [tglOrder, settglOrder] = useState(dayjs());
  const [sSearch, setsSearch] = useState("");
  const [stat, setstat] = useState("2");
  const [listPasien, setlistPasien] = useState([]);
  const [idLap, setidLap] = useState("");
  const [noOrder, setnoOrder] = useState("");
  const [noReg, setnoReg] = useState("");
  const [pasienId, setpasienId] = useState("");
  const [umur, setumur] = useState("");
  const [jenisKelamin, setjenisKelamin] = useState("");
  const [penjamin, setpenjamin] = useState("");
  const [nama, setnama] = useState("");
  const [tglLahir, settglLahir] = useState("");
  const [tglMasuk, settglMasuk] = useState("");
  const [alamat, setalamat] = useState("");
  const [pjpasien, setpjpasien] = useState("");
  const [namaDokter, setnamaDokter] = useState();
  const [tglPmr, settglPmr] = useState(dayjs());
  const [diagnosa, setdiagnosa] = useState("");
  const [siklusUtama, setsiklusUtama] = useState("");
  const [secondLine, setsecondLine] = useState("");
  const [konsolidasi, setkonsolidasi] = useState("");
  const [weekly, setweekly] = useState("");
  const [anamnesa, setanamnesa] = useState("");
  const [pmrFisik, setpmrFisik] = useState("");
  const [listOrderObat, setlistOrderObat] = useState([]);
  const [listValidObat, setlistValidObat] = useState([]);
  const [listBillNo, setlistBillNo] = useState([]);
  const [listHasilLab, setlistHasilLab] = useState([]);
  const [listTrxPmr, setlistTrxPmr] = useState([]);
  const [terapi, setterapi] = useState("");
  const [labRo, setlabRo] = useState("");
  const [mslkeperawatan, setmslkeperawatan] = useState("");
  const [perawat, setperawat] = useState("");
  const [listImplementasi, setlistImplementasi] = useState([]);
  const [sbj, setsbj] = useState("");
  const [obj, setobj] = useState("");
  const [analysis, setanalysis] = useState("");
  const [plan, setplan] = useState("");
  const [dischargeplan, setdischargeplan] = useState("");
  const [ipKomp, setipKomp] = useState(ip);
  const [hostKomp, sethostKomp] = useState(host);
  const [user, setuser] = useState(namauser);
  const [userEntry, setuserEntry] = useState();
  const [listNoOrder, setlistNoOrder] = useState([]);
  const [listRiwProtokol, setlistRiwProtokol] = useState([]);
  const [listRiwTotalSiklus, setlistRiwTotalSiklus] = useState([]);
  const [tabKey, settabKey] = useState("1");
  const [protokolKemo, setprotokolKemo] = useState({});
  const [listRiwKemoterapi, setlistRiwKemoterapi] = useState();
  const [rptKemo, setrptKemo] = useState();
  const [rptProtKemo, setrptProtKemo] = useState();
  const [ttlSiklus, setttlSiklus] = useState();
  // modal
  const [tambahData, settambahData] = useState(false);
  const [mdListTrxPmr, setmdListTrxPmr] = useState(false);
  const [mdInfoUpdate, setmdInfoUpdate] = useState(false);
  const [mdDtKemoterapi, setmdDtKemoterapi] = useState(false);
  // spin
  const [spTabelPasien, setspTabelPasien] = useState(false);
  const [spDataPasien, setspDataPasien] = useState(false);
  const [spSimpanKemoLaporan, setspSimpanKemoLaporan] = useState(false);
  const [spListObat, setspListObat] = useState(false);
  const [spListBillNo, setspListBillNo] = useState(false);
  const [spHasilLab, setspHasilLab] = useState(false);
  const [spTrxPmr, setspTrxPmr] = useState(false);
  const [spTrxNoOrder, setspTrxNoOrder] = useState(false);
  const [spProtokol, setspProtokol] = useState(false);
  const [spTbRiwProtokol, setspTbRiwProtokol] = useState(false);
  const [spTbRiwKemo, setspTbRiwKemo] = useState(false);
  const [spDtLaporanKemo, setspDtLaporanKemo] = useState(false);
  // mst
  const [optPerawat, setOptPerawat] = useState([]);
  const [optDokterAll, setoptDokterAll] = useState([]);
  const [optProtKemo, setoptProtKemo] = useState([]);

  useEffect(() => {
    // settingan info update otomatis
    const updateDate = '2025-03-18';
    const today = dayjs();
    // const today = dayjs('2024-09-06');
    const daysDifference = today.diff(dayjs(updateDate), 'day');

    if (daysDifference < 30) {
      setmdInfoUpdate(true);
    }
  }, []);

  // function
  const lookUpPerawat = () => {
    axios
      .get(`${endpoint}/MstDokterSpesialisDetail/LookupPerawat/%20`, options)
      .then((response) => {
        // console.log("getPasienRadioterapi ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setOptPerawat([]);
            message.warning("Option Perawat kosong! Mohon periksa kembali.");
          } else {
            // console.log("getListOrder : ", response.data.result);
            setOptPerawat(response.data.result);
          }
        } else {
          setOptPerawat([]);
          message.error("Option Perawat gagal di Load!");
        }
      })
      .catch((err) => {
        setOptPerawat([]);
        message.error(
          `Error melakukan proses ambil data List Order Kemoterapi! -> ${err}`
        );
      });
  };

  const lookUpDokterAll = () => {
    axios
      .get(`${endpoint}/mstDokter/Lookup/Dr/1/1000`, options)
      .then((response) => {
        // console.log("lookUpDokterAll ", response);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setoptDokterAll([]);
            message.warning("Option Dokter kosong! Mohon periksa kembali.");
          } else {
            // console.log("getListOrder : ", response.data.result);
            setoptDokterAll(response.data.result);
          }
        } else {
          setoptDokterAll([]);
          message.error("Option Dokter gagal di Load!");
        }
      })
      .catch((err) => {
        setoptDokterAll([]);
        message.error(
          `Error melakukan proses ambil data List Dokter! -> ${err}`
        );
      });
  };

  const lookUpProtokol = (dokterId) => {
    axios
      .get(`${endpoint}/MstProtokolKemoterapi/GetListMasterProtokolbyDokter/${dokterId}`, options)
      .then((response) => {
        console.log("lookUpProtokol ", response);
        if (response.data.result.code === "200") {
          if (response.data.result.result.length === 0) {
            setoptProtKemo([]);
            Modal.warning({
              title: 'Peringatan!',
              content: 'Dokter tersebut belum ada Protokol Kemoterapi.',
            });
          } else {
            // console.log("getListOrder : ", response.data.result);
            setoptProtKemo(response.data.result.result);
          }
        } else {
          setoptProtKemo([]);
          Modal.error({
            title: 'Peringatan!',
            content: 'Option Protokol Kemoterapi gagal di Load!',
          });
        }
      })
      .catch((err) => {
        setoptProtKemo([]);
        Modal.error({
          title: 'ERROR!',
          content: `Error melakukan proses ambil data Master Protokol Kemoterapi! -> ${err}`,
        });
      });
  };

  const getListOrder = (sTanggal, unitId, stsOrder, sSearch, setjnsRawat) => {
    setspTabelPasien(true);
    if (sSearch.length === 0) {
      sSearch = "%20";
    }
    axios
      .get(
        `${endpoint}/EmrKemoterapi/bysearch/${sTanggal}/${unitId}/${stsOrder}/${sSearch}/${setjnsRawat}`,
        options
      )
      .then((response) => {
        console.log("getListOrder ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setlistPasien([]);
            setspTabelPasien(false);
            Modal.info({
              title: "Informasi",
              content: "Tidak ada order Kemoterapi.",
            });
          } else {
            // console.log("getListOrder : ", response.data.result);
            setlistPasien(response.data.result);
            // setmdListOrder(true)
            setspTabelPasien(false);
          }
        } else {
          setlistPasien([]);
          setspTabelPasien(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data List Order Kemoterapi!`,
          });
        }
      })
      .catch((err) => {
        setlistPasien([]);
        setspTabelPasien(false);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil data List Order Kemoterapi! -> ${err}`,
        });
      });
  };

  const rstIdentPasien = () => {
    // setnoReg('')
    setidLap("");
    setnoOrder("");
    setpasienId("");
    setumur("");
    setjenisKelamin("");
    setpenjamin("");
    setnama("");
    setnamaDokter();
    settglLahir("");
    settglMasuk("");
    setalamat("");
    settglPmr(dayjs());
    setdiagnosa("");
    setsiklusUtama("");
    setsecondLine("");
    setkonsolidasi("");
    setweekly("");
    setanamnesa("");
    setpmrFisik("");
    setterapi("");
    setlabRo("");
    setprintLabPk("");
    setprintLabPa("");
    setmslkeperawatan("");
    setperawat("");
    setlistImplementasi([]);
    setsbj("");
    setobj("");
    setanalysis("");
    setplan("");
    setdischargeplan("");
    settabKey("1");
    setuserEntry("");
    setttlSiklus(null);
  };

  const getDataPasien = (sNoReg, sNoOrder) => {
    rstIdentPasien();
    rstTandaVital();
    setnoOrder(sNoOrder);
    setspDataPasien(true);
    setspSimpanKemoLaporan(true);
    console.log('coba back nugraha');
    if (sNoOrder.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "No Registrasi tidak boleh kosong!",
      });
    } else {
      axios
        .get(
          `${endpoint}/EmrKemoterapi/getDataPasienKemoterapi/${sNoReg}/${sNoOrder}`,
          options
        )
        .then((response) => {
          setspDataPasien(false);
          setspSimpanKemoLaporan(false);
          console.log("noreg : ", sNoReg);
          console.log("noOrder : ", sNoOrder);
          console.log("getDataPasien ", response.data);
          if (response.data.statusCode === 200) {
            if (response.data.result.length === 0) {
              Modal.info({
                title: "Informasi",
                content: "Tidak ada data Pasien Kemoterapi.",
              });
            } else {
              // ident pasien
              if (response.data.result.Id) {
                setidLap(response.data.result.Id);
                // ambil data pemeriksaan fisik (tanda vital), AKTIF PER 1 JANUARI 2024
                // getTTVAssByRuang(sNoReg, unitId, dayjs(tglOrder).format("YYYY-MM-DD"));
                // getNyeriByRegDate(sNoReg, dayjs(tglOrder).format("YYYY-MM-DD 00:00"));
                // getResikoJatuhByRegDate(sNoReg, dayjs(tglOrder).format("YYYY-MM-DD 00:00"));
              }
              else {
                setidLap("");
              }
              sessionStorage.setItem("norm", response.data.result.PasienId);
              detailPasien(sNoReg)
              setpasienId(response.data.result.PasienId);
              setumur(response.data.result.Umur);
              setjenisKelamin(response.data.result.KELAMIN);
              setpenjamin(response.data.result.Pembayaran);
              setnama(response.data.result.Nama);
              setnamaDokter(response.data.result.NamaDokter);
              settglLahir(
                dayjs(response.data.result.TanggalLahir).format("DD-MM-YYYY")
              );
              response.data.result.TGLMASUK
                ? settglMasuk(
                  dayjs(response.data.result.TGLMASUK).format("DD-MM-YYYY")
                )
                : settglMasuk(dayjs().format("DD-MM-YYYY"));
              setalamat(response.data.result.Alamat);
              setpjpasien(response.data.result.PenanggungJawab);
              // form
              settglPmr(dayjs(tglOrder));
              setdiagnosa(response.data.result.DIAGNOSA);
              setsiklusUtama(response.data.result.SiklusUtama);
              setttlSiklus(response.data.result.TotalSiklus);
              setsecondLine(response.data.result.SecondLine);
              setkonsolidasi(response.data.result.Konsolidasi);
              setweekly(response.data.result.Weekly);
              setanamnesa(response.data.result.Anamnesa);
              setpmrFisik(response.data.result.PmrFisik);
              setterapi(response.data.result.Terapi);
              setlabRo(response.data.result.HasilPenunjang);
              setmslkeperawatan(response.data.result.MasalahKeperawatan);
              setperawat(response.data.result.KodePerawat);
              setlistImplementasi(response.data.result.ListImplementasi);
              setsbj(response.data.result.Subjek);
              setobj(response.data.result.Objek);
              setanalysis(response.data.result.Analisis);
              setplan(response.data.result.Planning);
              setdischargeplan(response.data.result.DischargePlanning);
              setuserEntry(response.data.result.UserId);
            }
          } else {
            // setspDataPasien(false)
            // setspSimpanKemoLaporan(false)
            Modal.error({
              title: "Gagal!",
              content: `Gagal melakukan proses ambil data Pasien Radioterapi! -> ${response.data.result}`,
            });
          }
        })
        .catch((err) => {
          setspDataPasien(false);
          setspSimpanKemoLaporan(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR!, melakukan proses ambil data Pasien Radioterapi! -> ${err}`,
          });
        });
    }
  };

  const getDataObat = (sNoReg, sRuangId) => {
    setspListObat(true);
    setlistOrderObat([]);
    setlistValidObat([]);
    if (sNoReg.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "No Registrasi tidak boleh kosong!",
      });
    } else if (sRuangId.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "RuangId tidak boleh kosong!",
      });
    } else {
      axios
        .get(
          `${endpoint}/EmrKemoterapi/GetDataResep/${sNoReg}/${sRuangId}`,
          options
        )
        .then((response) => {
          setspListObat(false);
          console.log("getDataObat ", response.data);
          if (response.data.statusCode === 200) {
            if (response.data.result.length === 0) {
              Modal.info({
                title: "Informasi",
                content: "Tidak ada data Obat pasien tersebut.",
              });
            } else {
              setlistOrderObat(response.data.result.orderList);
              setlistValidObat(response.data.result.validList);
            }
          } else {
            // setspDataPasien(false)
            // setspSimpanKemoLaporan(false)
            Modal.error({
              title: "Gagal!",
              content: `Gagal melakukan proses ambil data Order/Validasi Obat! -> ${response.data.result}`,
            });
          }
        })
        .catch((err) => {
          setspDataPasien(false);
          setspSimpanKemoLaporan(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR!, melakukan proses ambil data Order/Validasi Obat! -> ${err}`,
          });
        });
    }
  };

  const getBillNoLab = (sPasienId) => {
    setspListBillNo(true);
    setlistBillNo([]);
    if (sPasienId.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "Pasien Id tidak boleh kosong!",
      });
    } else {
      axios
        .get(`${endpoint}/EmrKemoterapi/GetListBillNoLab/${sPasienId}`, options)
        .then((response) => {
          setspListBillNo(false);
          console.log("getBillNoLab : ", response.data);
          if (response.data.statusCode === 200) {
            if (response.data.result.length === 0) {
              Modal.info({
                title: "Informasi",
                content: "Tidak ada No Billing Lab pasien tersebut.",
              });
            } else {
              setlistBillNo(response.data.result);
            }
          } else {
            Modal.error({
              title: "Gagal!",
              content: `Gagal melakukan proses ambil data No Billing Lab! -> ${response.data.result}`,
            });
          }
        })
        .catch((err) => {
          setspListBillNo(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR!, melakukan proses ambil data No Billing Lab! -> ${err}`,
          });
        });
    }
  };

  const getDetailHasilLab = (sBillNoLab) => {
    setspHasilLab(true);
    setlistHasilLab([]);
    if (sBillNoLab.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "Billing Nomor Lab tidak boleh kosong!",
      });
    } else {
      axios
        .get(`${endpoint}/EmrKemoterapi/GetHasilLab/${sBillNoLab}`, options)
        .then((response) => {
          setspHasilLab(false);
          console.log("getDetailHasilLab : ", response.data);
          if (response.data.statusCode === 200) {
            if (response.data.result.length === 0) {
              Modal.info({
                title: "Informasi",
                content: "Tidak ada Hasil Lab dari No Billing tersebut.",
              });
            } else {
              setlistHasilLab(response.data.result);
            }
          } else {
            Modal.error({
              title: "Gagal!",
              content: `Gagal melakukan proses ambil data Hasil Lab! -> ${response.data.result}`,
            });
          }
        })
        .catch((err) => {
          setspHasilLab(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR!, melakukan proses ambil data Hasil Lab! -> ${err}`,
          });
        });
    }
  };

  const getListTrxpmr = (sNoReg, sRuangId) => {
    setspTrxPmr(true);
    setspDataPasien(true);
    axios
      .get(
        `${endpoint}/EmrRadioterapi/GetTransaksiPenunjang/${sNoReg}/${sRuangId}`,
        options
      )
      .then((response) => {
        console.log("getListTrxpmr ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setlistTrxPmr([]);
            Modal.info({
              title: "Informasi",
              content: "Tidak ada Transaksi di Unit Kemoterapi.",
            });
          } else {
            setlistTrxPmr(response.data.result);
            setmdListTrxPmr(true);
          }
          setspTrxPmr(false);
          setspDataPasien(false);
        } else {
          setspTrxPmr(false);
          setspDataPasien(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data Transaksi di Unit Radioterapi! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspTrxPmr(false);
        setspDataPasien(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data Transaksi di Unit Radioterapi! -> ${err}`,
        });
      });
  };

  const getDataTidakOrder = (sNoReg, sTglPmr, sRuangId) => {
    rstIdentPasien();
    setspDataPasien(true);
    axios
      .get(
        `${endpoint}/EmrKemoterapi/GetDataPasienKemoterapiTidakOrder/${sNoReg}/${sTglPmr}/${sRuangId}`,
        options
      )
      .then((response) => {
        console.log("getDataTidakOrder ", response.data);
        setmdListTrxPmr(false);
        setspTrxPmr(false);
        setspDataPasien(false);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            Modal.info({
              title: "Informasi",
              content: "Tidak ada data Pasien Radioterapi.",
            });
          } else {
            // ident pasien
            response.data.result.Id
              ? setidLap(response.data.result.Id)
              : setidLap("");
            setpasienId(response.data.result.PasienId);
            setumur(response.data.result.Umur);
            setjenisKelamin(response.data.result.KELAMIN);
            setpenjamin(response.data.result.Pembayaran);
            setnama(response.data.result.Nama);
            settglLahir(
              dayjs(response.data.result.TanggalLahir).format("DD-MM-YYYY")
            );
            response.data.result.TGLMASUK
              ? settglMasuk(
                dayjs(response.data.result.TGLMASUK).format("DD-MM-YYYY")
              )
              : settglMasuk(dayjs().format("DD-MM-YYYY"));
            setalamat(response.data.result.Alamat);
            setpjpasien(response.data.result.PenanggungJawab);
            // form
            settglPmr(dayjs(response.data.result.TGLPMR));
            settglOrder(dayjs(response.data.result.TGLPMR));
            setlistPasien([]);
            setdiagnosa(response.data.result.DIAGNOSA);
            setsiklusUtama(response.data.result.SiklusUtama);
            setsecondLine(response.data.result.SecondLine);
            setkonsolidasi(response.data.result.Konsolidasi);
            setweekly(response.data.result.Weekly);
            setanamnesa(response.data.result.Anamnesa);
            setpmrFisik(response.data.result.PmrFisik);
            setterapi(response.data.result.Terapi);
            setlabRo(response.data.result.HasilPenunjang);
            setmslkeperawatan(response.data.result.MasalahKeperawatan);
            setperawat(response.data.result.KodePerawat);
            response.data.result.Id
              ? setlistImplementasi(response.data.result.ListImplementasi)
              : setlistImplementasi([]);
            setsbj(response.data.result.Subjek);
            setobj(response.data.result.Objek);
            setanalysis(response.data.result.Analisis);
            setplan(response.data.result.Planning);
            setdischargeplan(response.data.result.DischargePlanning);
          }
        } else {
          setspDataPasien(false);
          // setspSimpanKemoLaporan(false)
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data Pasien Kemoterapi! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspDataPasien(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data Pasien Radioterapi! -> ${err}`,
        });
      });
  };

  const getDataTidakOrderAll = (sTglPmr, sRuangId) => {
    setspTrxNoOrder(true);
    axios
      .get(
        `${endpoint}/EmrKemoterapi/GetDataKemoterapiTidakOrderAll/${sTglPmr}/${sRuangId}`,
        options
      )
      .then((response) => {
        console.log("getDataTidakOrderAll ", response.data);
        // setmdListTrxPmr(false);
        setspTrxNoOrder(false);
        // setspDataPasien(false);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setlistNoOrder([]);
            Modal.info({
              title: "Informasi",
              content: "Tidak ada data Pasien Radioterapi.",
            });
          } else {
            setlistNoOrder(response.data.result);
          }
        } else {
          // setspDataPasien(false);
          // setspSimpanKemoLaporan(false)
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data tidak Order Kemoterapi! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspTrxNoOrder(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data tidak Order Kemoterapi! -> ${err}`,
        });
      });
  };

  const getProtokolKemo = (regId) => {
    setspProtokol(true);
    axios
      .get(
        `${endpoint}/EmrKemoterapi/GetProtokolPasien/${regId}`,
        options
      )
      .then((response) => {
        console.log("getProtokolKemo ", response.data);
        setspProtokol(false);
        if (response.data.statusCode === 200) {
          response.data.result !== null ? setprotokolKemo(response.data.result) : setprotokolKemo({});
        } else {
          setprotokolKemo({});
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil Protokol Kemoterapi! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspProtokol(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil Protokol Kemoterapi! -> ${err}`,
        });
      });
  };

  const getDtProtokol = (regId) => {
    setspDtLaporanKemo(true);
    axios
      .get(
        `${endpoint}/EmrKemoterapi/GetProtokolPasien/${regId}`,
        options
      )
      .then((response) => {
        console.log("getDtProtokol ", response.data);
        setspProtokol(false);
        if (response.data.statusCode === 200) {
          response.data.result !== null ? setrptProtKemo(response.data.result) : setrptProtKemo({});
        } else {
          setrptProtKemo({});
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspProtokol(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data! -> ${err}`,
        });
      });
  };

  const getRiwProtokol = (pasienId) => {
    setspTbRiwProtokol(true);
    axios
      .get(
        `${endpoint}/EmrKemoterapi/GetRiwProtokolPasien/${pasienId}`,
        options
      )
      .then((res) => {
        setspTbRiwProtokol(false);
        console.log('getRiwProtokol : ', res);
        if (res.data.statusCode === 200) {
          setlistRiwProtokol(res.data.result);
        } else {
          setlistRiwProtokol([]);
          Modal.error({
            title: "Gagal!",
            content: `Gagal mengambil Protokol Kemoterapi! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspTbRiwProtokol(false);
        setlistRiwProtokol([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil Riwayat Protokol Kemoterapi pasien! -> ${err}`,
        });
      });
  }

  const getRiwKemoterapi = (pasienId) => {
    setspTbRiwKemo(true);
    axios
      .get(
        `${endpoint}/EmrKemoterapi/GetRiwayatKemoterapi/${pasienId}`,
        options
      )
      .then((res) => {
        setspTbRiwKemo(false);
        console.log('getRiwKemoterapi : ', res);
        if (res.data.statusCode === 200) {
          setlistRiwKemoterapi(res.data.result.result);
        } else {
          setlistRiwKemoterapi([]);
          Modal.error({
            title: "Gagal!",
            content: `Gagal mengambil data! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspTbRiwKemo(false);
        // setlistRiwProtokol([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil data! -> ${err}`,
        });
      });
  }

  const getRiwTotalSiklus = (pasienId) => {
    setspTbRiwKemo(true);
    axios
      .get(
        `${endpoint}/EmrKemoterapi/GetRiwTotalSiklus/${pasienId}`,
        options
      )
      .then((res) => {
        setspTbRiwKemo(false);
        console.log('getRiwTotalSiklus : ', res);
        if (res.data.statusCode === 200) {
          setlistRiwTotalSiklus(res.data.result.result);
        } else {
          setlistRiwTotalSiklus([]);
          Modal.error({
            title: "Gagal!",
            content: `Gagal mengambil data! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspTbRiwKemo(false);
        setlistRiwTotalSiklus([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil data! -> ${err}`,
        });
      });
  }

  const getRptKemoterapi = (sNoReg, sNoOrder) => {
    setspDtLaporanKemo(true);
    axios
      .get(
        `${endpoint}/EmrKemoterapi/getDataPasienKemoterapi/${sNoReg}/${sNoOrder}`,
        options
      )
      .then((response) => {
        setspDtLaporanKemo(false);
        console.log("getRptKemoterapi ", response.data);
        if (response.data.statusCode === 200) {
          setrptKemo(response.data.result);
        } else {
          setspDtLaporanKemo(false);
          setrptKemo({});
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspDtLaporanKemo(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data! -> ${err}`,
        });
      });
  }

  const insertTTVPemeriksaanFisik = (datatandavital, datanyeri, dataResikoJatuh) => {
    setspSimpanKemoLaporan(true);
    axios
      .post(`${endpoint}/Nyeri/Create`, datanyeri)
      .then((res) => {
        if (res.data.statusCode === 200) {
          axios
            .post(`${endpoint}/ResikoJatuh/Create`, dataResikoJatuh)
            .then((res) => {
              if (res.data.statusCode === 200) {
                axios
                  .post(`${endpoint}/EmrTandaVital/Ri`, datatandavital)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      setspSimpanKemoLaporan(false);
                      Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan data Pemeriksaan Fisik.",
                        onOk: () => {
                          getTTVAssByRuang(
                            datatandavital.registrasiId,
                            datatandavital.ruangId,
                            datatandavital.jam
                          );
                        },
                      });
                    } else {
                      setspSimpanKemoLaporan(false);
                      Modal.warning({
                        title: "Gagal Menyimpan Data Tanda Vital!",
                        content: JSON.stringify(res.data),
                      });
                    }
                  })
                  .catch((err) => {
                    setspSimpanKemoLaporan(false);
                    Modal.error({
                      title: "ERROR!",
                      content: `Gagal Disimpan Data Tanda Vital! -> ${err}`,
                    });
                  });
              } else {
                setspSimpanKemoLaporan(false);
                Modal.warning({
                  title: "Gagal Menyimpan Data Resiko Jatuh!",
                  content: JSON.stringify(res.data),
                });
              }
            })
            .catch((err) => {
              setspSimpanKemoLaporan(false);
              Modal.error({
                title: "ERROR!",
                content: `Gagal Disimpan Data Resiko Jatuh! -> ${err}`,
              });
            });
        } else {
          setspSimpanKemoLaporan(false);
          Modal.warning({
            title: "Gagal Menyimpan Data Nyeri!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((err) => {
        setspSimpanKemoLaporan(false);
        Modal.error({
          title: "ERROR!",
          content: `Gagal Disimpan Data Nyeri! -> ${err}`,
        });
      });
  };

  const simpanKemoLaporan = (data, datatandavital, datanyeri, dataResikoJatuh) => {
    setspSimpanKemoLaporan(true);
    axios
      .post(`${endpoint}/EmrKemoterapi/insertkemolaporan`, data, {
        headers: options.headers,
      })
      .then((res) => {
        console.log('simpanKemoLaporan :', res);
        if (res.data.result.code === "200") {
          setspSimpanKemoLaporan(false);
          console.log("simpanKemoLaporan : ", res.data);
          Modal.success({
            title: "Sukses",
            content: "Berhasil Disimpan data Kemoterapi Laporan.",
            onOk: () => {
              getListOrder(
                dayjs(tglOrder).format("YYYY-MM-DD"),
                unitId,
                stat,
                "%20",
                jnsRawat
              );
              setidLap(res.data.result.result.Id);
              // insertTTVPemeriksaanFisik(datatandavital, datanyeri, dataResikoJatuh) // AKTIF PER 1 JANUARI 2024
              // if (noOrder) {
              //     getDetailTrPmr(noOrder)
              //     setNoOrder('');

              // }
              // else {
              //     getbyNoReg(noTransaksi, unitId)
              // }
            },
          });
        } else {
          setspSimpanKemoLaporan(false);
          Modal.confirm({
            title: 'Peringatan!',
            content: (
              <>
                <span>Gagal Disimpan data Kemoterapi Laporan!</span>
                <br /><span>{res.data.result.message}</span>
                <br /><span>Laporan Ruangan : <b>{res.data.result.result.Deskripsi}</b></span>
                <br /><span>UserId : {res.data.result.result.UserId}</span>
                <br /><span>Terapi : {res.data.result.result.Terapi}</span>
                <br /><span>Tanggal : {dayjs(res.data.result.result.DateEntry).format('DD-MM-YYYY HH:mm')}</span>
                <br /><br /><span>Apakah akan memperbaiki Laporan Kemoterapi?</span>
              </>
            ),
            onOk: () => {
              data.id = res.data.result.result.Id;
              data.terapi = data.terapi + ", " + (res.data.result.result.Terapi !== null ? res.data.result.result.Terapi : '');
              console.log('data : ', data);
              simpanKemoLaporan(data);
            },
            okText: 'Simpan',
            cancelText: 'Batal',
            width: 500,
          });
          // Modal.error({
          //   title: "Gagal!",
          //   content: (
          //     <>
          //       <span>Gagal Disimpan data Kemoterapi Laporan!</span>
          //       <br /><span>{res.data.result.message}</span>
          //       <br /><span>Laporan Ruangan : <b>{res.data.result.result.Deskripsi}</b></span>
          //       <br /><span>UserId : {res.data.result.result.UserId}</span>
          //       <br /><span>Terapi : {res.data.result.result.Terapi}</span>
          //       <br /><span>Tanggal : {dayjs(res.data.result.result.DateEntry).format('DD-MM-YYYY HH:mm')}</span>
          //     </>
          //   ),
          //   width: 500,
          //   okText: 'Simpan',
          //   cancelText: 'Batal',
          // });
        }
      })
      .catch((err) => {
        setspSimpanKemoLaporan(false);
        Modal.error({
          title: "ERROR!",
          content: `Gagal Disimpan! -> ${err}`,
        });
      });
  };

  const rstTandaVital = () => {
    // tanda vital
    setTandaVitalId(0);
    jnsRawat.slice(0, 2) === "91" ? setgcsMata("") : setgcsMata(4);
    jnsRawat.slice(0, 2) === "91" ? setgcsSuara("") : setgcsSuara(5);
    jnsRawat.slice(0, 2) === "91" ? setgcsGerakan("") : setgcsGerakan(6);
    settekananDarahSistolik("");
    settekananDarahDiastolik("");
    setsuhuTubuh("");
    setfrekuensiNadi("");
    setfrekuensiNafas("");
    //setUserTTV('');
    setberatBadan();
    settinggiBadan();
    setsaturasiOksigen("");
    setiramaNadi("Teratur");
    settingkatKesadaranId("");
    // skor nyeri
    setmetodeResikoJatuh("");
    setrJatuh1("");
    setrJatuh2("");
    setsMental1("");
    setsMental2("");
    setsMental3("");
    setsMata1("");
    setsMata2("");
    setsMata3("");
    setkebiasaanBerkemih("");
    settransferTT("");
    setmobilitas("");
    sethumDumUsia("");
    sethumDumKel("");
    sethumDumDiagnosa("");
    sethumDumGangguanKognitif("");
    sethumDumLingkungan("");
    sethumDumRespon("");
    sethumDumPemObat("");
    setmorseRiwJatuh("");
    setmorseDiagnosa("");
    setmorseKondisiJalan("");
    setmorseInfus("");
    setmorseKondisiBadan("");
    setmorseGangKognitif("");
    // skala nyeri
    setscalaNyeri("");
    setskalaNyeri1("");
    setskalaNyeri2("");
    setskalaNyeri3("");
    setskalaNyeri4("");
    setskalaNyeri5("");
    setskalaNyeri6("");
  };

  const insertProtokolKemo = (data) => {
    setspProtokol(true);
    axios
      .post(`${endpoint}/EmrKemoterapi/InsertProtokolKemo`, data, {
        headers: options.headers,
      })
      .then((res) => {
        console.log(res);
        setspProtokol(false);
        if (res.data.result.code === "200") {
          Modal.success({
            title: "Sukses",
            content: res.data.result.message,
            onOk: () => {
              // setmdCreateProtokol(false);
              getProtokolKemo(data.registrasiId);
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal simpan Protokol Kemoterapi! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspProtokol(false);
        Modal.error({
          title: "Error",
          content: `Error melakukan simpan Protokol Kemoterapi! -> ${err}`,
        });
      });
  };

  return (
    <KemoterapiContext.Provider
      value={{
        // state
        unitId,
        setunitId,
        jnsRawat,
        setjnsRawat,
        tglOrder,
        settglOrder,
        sSearch,
        setsSearch,
        stat,
        setstat,
        listPasien,
        setlistPasien,
        idLap,
        setidLap,
        noOrder,
        setnoOrder,
        noReg,
        setnoReg,
        pasienId,
        setpasienId,
        umur,
        setumur,
        jenisKelamin,
        setjenisKelamin,
        penjamin,
        setpenjamin,
        nama,
        setnama,
        namaDokter, setnamaDokter,
        tglLahir,
        settglLahir,
        tglMasuk,
        settglMasuk,
        alamat,
        setalamat,
        pjpasien,
        setpjpasien,
        tglPmr,
        settglPmr,
        diagnosa,
        setdiagnosa,
        siklusUtama,
        setsiklusUtama,
        secondLine,
        setsecondLine,
        konsolidasi,
        setkonsolidasi,
        weekly,
        setweekly,
        perawat,
        setperawat,
        anamnesa,
        setanamnesa,
        pmrFisik,
        setpmrFisik,
        listOrderObat,
        setlistOrderObat,
        listValidObat,
        setlistValidObat,
        listBillNo,
        setlistBillNo,
        listHasilLab,
        setlistHasilLab,
        listTrxPmr,
        setlistTrxPmr,
        terapi,
        setterapi,
        labRo,
        setlabRo,
        mslkeperawatan,
        setmslkeperawatan,
        sbj,
        setsbj,
        listImplementasi,
        setlistImplementasi,
        obj,
        setobj,
        analysis,
        setanalysis,
        plan,
        setplan,
        dischargeplan,
        setdischargeplan,
        ipKomp,
        setipKomp,
        hostKomp,
        sethostKomp,
        user,
        setuser,
        userEntry,
        setuserEntry,
        listNoOrder,
        setlistNoOrder,
        tabKey,
        settabKey,
        protokolKemo, setprotokolKemo,
        listRiwProtokol, setlistRiwProtokol,
        listRiwKemoterapi, setlistRiwKemoterapi,
        listRiwTotalSiklus, setlistRiwTotalSiklus,
        rptKemo, setrptKemo,
        rptProtKemo, setrptProtKemo,
        ttlSiklus, setttlSiklus,
        // md
        tambahData,
        settambahData,
        mdListTrxPmr,
        setmdListTrxPmr,
        mdInfoUpdate,
        setmdInfoUpdate,
        mdDtKemoterapi, setmdDtKemoterapi,
        // sp
        spTabelPasien,
        setspTabelPasien,
        spDataPasien,
        setspDataPasien,
        spSimpanKemoLaporan,
        setspSimpanKemoLaporan,
        spListObat,
        setspListObat,
        spListBillNo,
        setspListBillNo,
        spHasilLab,
        setspHasilLab,
        spTrxPmr,
        setspTrxPmr,
        spTrxNoOrder,
        setspTrxNoOrder,
        spProtokol, setspProtokol,
        spTbRiwProtokol, setspTbRiwProtokol,
        spTbRiwKemo, setspTbRiwKemo,
        spDtLaporanKemo, setspDtLaporanKemo,
        // list
        optPerawat,
        setOptPerawat,
        optDokterAll, setoptDokterAll,
        optProtKemo, setoptProtKemo,
        // func
        getListOrder,
        getDataPasien,
        simpanKemoLaporan,
        getDataObat,
        getBillNoLab,
        getDetailHasilLab,
        getListTrxpmr,
        getDataTidakOrder,
        getDataTidakOrderAll,
        getProtokolKemo,
        getRiwProtokol,
        getRiwKemoterapi,
        getRiwTotalSiklus,
        getRptKemoterapi,
        getDtProtokol,
        rstIdentPasien,
        insertProtokolKemo,
        // mst
        lookUpPerawat,
        lookUpDokterAll,
        lookUpProtokol,
      }}
    >
      {props.children}
    </KemoterapiContext.Provider>
  );
};

export default KemoterapiContextProvider;
