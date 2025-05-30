import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { message, Modal } from "antd";
import { useParams } from "react-router-dom";
export const GiziAsuhanContext = createContext();

const jamsekarang = dayjs();

const GiziAsuhanContextProvider = (props) => {
  const [evaluasi, setEvaluasi] = useState([]);
  const [asuhangizi, setAsuhanGizi] = useState([]);
  const [giziscreening, setGiziScreening] = useState([]);
  const [listscreening, setListScreening] = useState([]);
  const [screening, setScreening] = useState([]);
  const [listasuhan, setListAsuhan] = useState([]);
  const [printasuhan, setprintAsuhan] = useState([]);

  const [kodediit, setKodediit] = useState([]);
  const [namaDiet, setnamaDiet] = useState([]);
  const [namaHidangan, setnamaHidangan] = useState([]);
  const [kodeextra, setKodeextra] = useState([]);
  const [aktifitas, setAktifitas] = useState([]);
  const [pantanganMakan, setPantanganMakan] = useState([]);
  const [kebiasaanHidup, setkebiasaanHidup] = useState([]);
  const [diitSebelumnya, setdiitSebelumnya] = useState([]);
  const [makananPokok, setmakananPokok] = useState([]);
  const [laukHewani, setlaukHewani] = useState([]);
  const [laukNabati, setlaukNabati] = useState([]);
  const [sayur, setsayur] = useState([]);
  const [buah, setbuah] = useState([]);
  const [susu, setsusu] = useState([]);
  const [snack, setsnack] = useState([]);
  const [lainLainFfq, setlainLainFfq] = useState([]);
  const [energi, setenergi] = useState([]);
  const [lemak, setlemak] = useState([]);
  const [protein, setprotein] = useState([]);
  const [cho, setcho] = useState([]);
  const [lainLainRecall, setlainLainRecall] = useState([]);
  const [diagnosaGizi, setdiagnosaGizi] = useState([]);
  const [bentukMakanan, setbentukMakanan] = useState([]);
  const [rute, setrute] = useState([]);
  const [kebEnergi, setkebEnergi] = useState([]);
  const [kebProtein, setkebProtein] = useState([]);
  const [kebLemak, setkebLemak] = useState([]);
  const [kebCho, setkebCho] = useState([]);
  const [kebLain, setkebLain] = useState([]);
  const [implementasi, setimplementasi] = useState([]);
  const [materiKonseling, setmateriKonseling] = useState([]);
  const [bioKimia, setbioKimia] = useState([]);
  const [keluhanGizi, setKeluhanGizi] = useState([]);
  const [lainLainKlinik, setlainLainKlinik] = useState([]);
  const [asuhanGiziId, setasuhanGiziId] = useState([]);
  const [lastScreeningId, setLastScreeningId] = useState("");
  const [tanggalasuhan, settanggalasuhan] = useState(dayjs());

  const [screeningId, setscreeningId] = useState(0);
  const [lila, setLila] = useState("");
  const [beratBadan, setberatBadan] = useState("");
  const [tinggiBadan, settinggiBadan] = useState("");
  const [pertanyaan1, setPertanyaan1] = useState([]);
  const [pertanyaan2, setPertanyaan2] = useState([]);
  const [pertanyaan3, setPertanyaan3] = useState([]);
  const [pertanyaan4, setPertanyaan4] = useState([]);
  const [visibledewasa, setVisibledewasa] = useState(false);
  const [tanggalScreening, settanggalScreening] = useState(dayjs());

  const [tanggaleva, setTanggaleva] = useState(dayjs());
  const [assesmenteva, setAssesmenteva] = useState([]);
  const [diagnosaeva, setDiagnosaeva] = useState([]);
  const [implementasieva, setImplementasieva] = useState([]);
  const [monitoringeva, setMonitoringeva] = useState([]);
  const [evaluasiGiziId, setevaluasiGiziId] = useState(0);
  const [listEvaluasi, setlistEvaluasi] = useState([]);

  const [ttvLast, setttvLast] = useState([]);

  const [listDokterGizi, setlistDokterGizi] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getmstdokterGizi = (sKey) => {
    axios
      .get(`${apiku}/MstDokter/GetStatusDokter/${sKey}/1/1000`, options)
      .then((res) => {
        setlistDokterGizi(
          res.data.result.sort((a, b) =>
            a.namaDokter.localeCompare(b.namaDokter)
          )
        );
      })
      .catch((err) => {
        //console.log('data anamnesa kosong');
      });
  };

  const resetscreening = () => {
    setscreeningId(0);
    setLila("");
    setberatBadan("");
    settinggiBadan("");
    setPertanyaan1("");
    setPertanyaan2("");
    setPertanyaan3("");
    setPertanyaan4("");
    settanggalScreening(dayjs());
  };

  const resetformevaluasi = (id) => {
    setevaluasiGiziId(0);
    //setevaluasiGiziId('');
    setTanggaleva(dayjs());
    setAssesmenteva("");
    setDiagnosaeva("");
    setImplementasieva("");
    setMonitoringeva("");
  };

  const resetasuhan = (id) => {
    settanggalasuhan(dayjs());
    setasuhanGiziId(0);
    setKodediit("");
    setKodeextra("");
    setAktifitas("");
    setKeluhanGizi("");
    setPantanganMakan("");
    setkebiasaanHidup("");
    setdiitSebelumnya("");
    setmakananPokok("");
    setlaukHewani("");
    setlaukNabati("");
    setsayur("");
    setbuah("");
    setsusu("");
    setsnack("");
    setlainLainFfq("");
    setbioKimia("");
    setlainLainKlinik("");
    setenergi("");
    setlemak("");
    setprotein("");
    setcho("");
    setlainLainRecall("");
    setdiagnosaGizi("");
    setbentukMakanan("");
    setrute("");
    setkebEnergi("");
    setkebProtein("");
    setkebLemak("");
    setkebCho("");
    setkebLain("");
    setimplementasi("");
    setmateriKonseling("");
  };

  const insertGizi = (datagizi) => {
    axios
      .post(`${apiku}/EmrGiziSmart/ScreeningSmart`, datagizi, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            // icon: <Icon component={BPJSICO} />,
            title: "Data Berhasil Disimpan!",
            //  content: res.data.message,
          });
          detailListScreening(datagizi.registrasiId);
          setscreeningId(0);
          settanggalScreening(dayjs());
        } else {
          Modal.warning({
            // icon: <Icon component={BPJSICO} />,
            title: "Gagal Simpan Screening Gizi!",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const insertGiziAsuhan = (datagiziasuhan) => {
    axios
      .post(`${apiku}/EmrGiziSmart/AsuhanSmart`, datagiziasuhan, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            // icon: <Icon component={BPJSICO} />,
            title: "Data Berhasil Disimpan!",
            //  content: res.data.message,
          });
          detailListAsuhan(datagiziasuhan.registrasiId);
          setasuhanGiziId(0);
          settanggalasuhan(dayjs());
        } else {
          Modal.warning({
            // icon: <Icon component={BPJSICO} />,
            title: "Gagal Simpan Asuhan Gizi!",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };
  const insertEvaluasi = (dataevaluasi) => {
    axios
      .post(`${apiku}/EmrGiziSmart/EvaluasiSmart`, dataevaluasi, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            // icon: <Icon component={BPJSICO} />,
            title: "Data Berhasil Disimpan!",
            //  content: res.data.message,
          });
          detailevaluasi(dataevaluasi.registrasiId);
          setTanggaleva(dayjs());
          setevaluasiGiziId(0);
        } else {
          Modal.warning({
            // icon: <Icon component={BPJSICO} />,
            title: "Gagal Simpan Evaluasi Gizi!",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Terjadi Kesalahan Koneksi!",
        });
      });
  };

  const detailListScreening = (regId) => {
    axios
      .get(`${apiku}/EmrGiziSmart/GetGiziScreeningSmart/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // message.success("Berhasil Disimpan!");list
          setListScreening(
            res.data.result.sort((b, a) => a.tanggal.localeCompare(b.tanggal))
          );
          setscreeningId(0);
          setberatBadan(
            res.data.result.sort((a, b) => a.tanggal.localeCompare(b.tanggal))[
              res.data.result.length - 1
            ].beratBadan
          );
          settanggalScreening(
            dayjs(
              res.data.result.sort((a, b) =>
                a.tanggal.localeCompare(b.tanggal)
              )[res.data.result.length - 1].tanggal
            )
          );
          settinggiBadan(
            res.data.result.sort((a, b) => a.tanggal.localeCompare(b.tanggal))[
              res.data.result.length - 1
            ].tinggiBadan
          );
          setLila(
            res.data.result.sort((a, b) => a.tanggal.localeCompare(b.tanggal))[
              res.data.result.length - 1
            ].lila
          );

          setPertanyaan1(
            res.data.result.sort((a, b) => a.tanggal.localeCompare(b.tanggal))[
              res.data.result.length - 1
            ].pertanyaan1
          );
          setPertanyaan2(
            res.data.result.sort((a, b) => a.tanggal.localeCompare(b.tanggal))[
              res.data.result.length - 1
            ].pertanyaan2
          );
          setPertanyaan3(
            res.data.result.sort((a, b) => a.tanggal.localeCompare(b.tanggal))[
              res.data.result.length - 1
            ].pertanyaan3
          );
          setPertanyaan4(
            res.data.result.sort((a, b) => a.tanggal.localeCompare(b.tanggal))[
              res.data.result.length - 1
            ].pertanyaan4
          );
          setLastScreeningId(
            res.data.result.sort((a, b) => a.tanggal.localeCompare(b.tanggal))[
              res.data.result.length - 1
            ].screeningId
          );
        } else {
          getBBTB(regId);
          setListScreening([]);
          settanggalScreening(dayjs());
          setLila("");
          setPertanyaan1("");
          setPertanyaan2("");
          setPertanyaan3("");
          setPertanyaan4("");
          setscreeningId(0);
          setLastScreeningId("");
        }
      })
      .catch((err) => {
        settanggalScreening(dayjs());
        setListScreening([]);
        setberatBadan("");
        settinggiBadan("");
        setLila("");
        setPertanyaan1("");
        setPertanyaan2("");
        setPertanyaan3("");
        setPertanyaan4("");
        setscreeningId(0);
        setLastScreeningId("");
      });
  };

  // const detailScreening = (idsc) => {
  //   axios
  //     .get(`${apiku}/api/EmrGizi/GetScrId/${idsc}`, options)
  //     .then((res) => {
  //       // setGiziScreening(res.data.result);
  //       setscreeningId(res.data.result.screeningId);
  //       setLila(res.data.result.lila);
  //       setberatBadan(res.data.result.beratBadan);
  //       settinggiBadan(res.data.result.tinggiBadan);
  //       setPertanyaan1(res.data.result.pertanyaan1);
  //       setPertanyaan2(res.data.result.pertanyaan2);
  //       setPertanyaan3(res.data.result.pertanyaan3);
  //       setPertanyaan4(res.data.result.pertanyaan4);
  //     }, [])
  //     .catch((err) => {
  //       // console.log('data anamnesa kosong');
  //       //setGiziScreening('');
  //       setscreeningId("");
  //       setLila("");
  //       setberatBadan("");
  //       settinggiBadan("");
  //       setPertanyaan1("");
  //       setPertanyaan2("");
  //       setPertanyaan3("");
  //       setPertanyaan4("");
  //     });
  // };

  const detailevaluasi = (regid) => {
    axios
      .get(`${apiku}/EmrGiziSmart/GetGiziEvaluasiSmart/${regid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistEvaluasi(
            res.data.result.sort((b, a) => a.Tgl.localeCompare(b.Tgl))
          );
        } else {
          setlistEvaluasi([]);
        }
      })
      .catch((err) => {
        // console.log(err);
        setlistEvaluasi([]);
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  const detailListAsuhan = (regId) => {
    axios
      .get(`${apiku}/EmrGiziSmart/GetGiziAsuhanSmart/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const dataAsuhan = res.data.result.sort((a, b) =>
            a.Tanggal.localeCompare(b.Tanggal)
          )[res.data.result.length - 1];
          setKodediit(dataAsuhan.Diit);
          setKodeextra(dataAsuhan.Ekstra);
          setAktifitas(dataAsuhan.Aktifitas);
          setKeluhanGizi(dataAsuhan.KeluhanGizi);
          setPantanganMakan(dataAsuhan.PantanganMakan);
          setkebiasaanHidup(dataAsuhan.KebiasaanHidup);
          setdiitSebelumnya(dataAsuhan.DiitSebelumnya);
          setmakananPokok(dataAsuhan.MakananPokok);
          setlaukHewani(dataAsuhan.LaukHewani);
          setlaukNabati(dataAsuhan.LaukNabati);
          setsayur(dataAsuhan.Sayur);
          setbuah(dataAsuhan.Buah);
          setsusu(dataAsuhan.Susu);
          setsnack(dataAsuhan.Snack);
          setlainLainFfq(dataAsuhan.LainLainFFQ);
          setbioKimia(dataAsuhan.Biokimia);
          setlainLainKlinik(dataAsuhan.LainLainKlinik);
          setenergi(dataAsuhan.Energi);
          setlemak(dataAsuhan.Lemak);
          setprotein(dataAsuhan.Protein);
          setcho(dataAsuhan.CHO);
          setlainLainRecall(dataAsuhan.LainLainRecall);
          setdiagnosaGizi(dataAsuhan.DiagnosaGizi);
          setbentukMakanan(dataAsuhan.BentukMakanan);
          setrute(dataAsuhan.Rute);
          setkebEnergi(dataAsuhan.KebEnergi);
          setkebProtein(dataAsuhan.KebProtein);
          setkebLemak(dataAsuhan.kebLemak);
          setkebCho(dataAsuhan.KebCHO);
          setkebLain(dataAsuhan.KebLain);
          setimplementasi(dataAsuhan.Implementasi);
          setmateriKonseling(dataAsuhan.MateriKonseling);
          settanggalasuhan(dayjs(dataAsuhan.Tanggal));
          setListAsuhan(
            res.data.result.sort((a, b) => a.Tanggal.localeCompare(b.Tanggal))
          );
          console.log(dataAsuhan);
          setasuhanGiziId(0);
        } else {
          setListAsuhan([]);
          setasuhanGiziId(0);
          setKodediit("");
          setKodeextra("");
          setAktifitas("");
          setKeluhanGizi("");
          setPantanganMakan("");
          setkebiasaanHidup("");
          setdiitSebelumnya("");
          setmakananPokok("");
          setlaukHewani("");
          setlaukNabati("");
          setsayur("");
          setbuah("");
          setsusu("");
          setsnack("");
          setlainLainFfq("");
          setbioKimia("");
          setlainLainKlinik("");
          setenergi("");
          setlemak("");
          setprotein("");
          setcho("");
          setlainLainRecall("");
          setdiagnosaGizi("");
          setbentukMakanan("");
          setrute("");
          setkebEnergi("");
          setkebProtein("");
          setkebLemak("");
          setkebCho("");
          setkebLain("");
          setimplementasi("");
          setmateriKonseling("");
        }
      })
      .catch((err) => {
        setListAsuhan([]);
        setasuhanGiziId(0);
        setKodediit("");
        setKodeextra("");
        setAktifitas("");
        setKeluhanGizi("");
        setPantanganMakan("");
        setkebiasaanHidup("");
        setdiitSebelumnya("");
        setmakananPokok("");
        setlaukHewani("");
        setlaukNabati("");
        setsayur("");
        setbuah("");
        setsusu("");
        setsnack("");
        setlainLainFfq("");
        setbioKimia("");
        setlainLainKlinik("");
        setenergi("");
        setlemak("");
        setprotein("");
        setcho("");
        setlainLainRecall("");
        setdiagnosaGizi("");
        setbentukMakanan("");
        setrute("");
        setkebEnergi("");
        setkebProtein("");
        setkebLemak("");
        setkebCho("");
        setkebLain("");
        setimplementasi("");
        setmateriKonseling("");
        // console.log(err);
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  const getLastTTV = (Regid) => {
    axios
      .get(`${apiku}/EmrTandaVital/ReadTandaVitalLastId/${Regid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setttvLast(res.data.result);
          setberatBadan(res.data.result.beratBadan);
          settinggiBadan(res.data.result.tinggiBadan);
        } else {
          setttvLast("");
          setberatBadan("");
          settinggiBadan("");
        }
      })
      .catch((err) => {
        setttvLast("");
        setberatBadan("");
        settinggiBadan("");
      });
  };

  const getBBTB = (Regid) => {
    axios
      .get(`${apiku}/EmrTandaVital/ReadTandaVitalLastId/${Regid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //  setttvLast(res.data.result);
          setberatBadan(res.data.result.beratBadan);
          settinggiBadan(res.data.result.tinggiBadan);
        } else {
          //  setttvLast("");
          setberatBadan("");
          settinggiBadan("");
        }
      })
      .catch((err) => {
        //  setttvLast("");
        setberatBadan("");
        settinggiBadan("");
      });
  };

  // const detailAsuhan = (idas) => {
  //   axios
  //     .get(`${apiku}/api/EmrGizi/GetAsuhanId/${idas}`, options)
  //     .then((res) => {
  //       //setprintAsuhan(res.data.result);
  //       setasuhanGiziId(res.data.result.asuhanGiziId);
  //       //console.log(res.data.result.tandaTanganDokter);
  //       //console.log(res.data.result);
  //       setKodediit(res.data.result.diit);
  //       setKodeextra(res.data.result.ekstra);
  //       setnamaDiet(res.data.result.namaDiet);
  //       setnamaHidangan(res.data.result.namaHidangan);
  //       setAktifitas(res.data.result.aktifitas);
  //       setPantanganMakan(res.data.result.pantanganMakan);
  //       setkebiasaanHidup(res.data.result.kebiasaanHidup);
  //       setdiitSebelumnya(res.data.result.diitSebelumnya);
  //       setmakananPokok(res.data.result.makananPokok);
  //       setlaukHewani(res.data.result.laukHewani);
  //       setlaukNabati(res.data.result.laukNabati);
  //       setsayur(res.data.result.sayur);
  //       setbuah(res.data.result.buah);
  //       setsusu(res.data.result.susu);
  //       setsnack(res.data.result.snack);
  //       setlainLainFfq(res.data.result.lainLainFfq);
  //       setenergi(res.data.result.energi);
  //       setlemak(res.data.result.lemak);
  //       setprotein(res.data.result.protein);
  //       setcho(res.data.result.cho);
  //       setlainLainRecall(res.data.result.lainLainRecall);
  //       setdiagnosaGizi(res.data.result.diagnosaGizi);
  //       setbentukMakanan(res.data.result.bentukMakanan);
  //       setrute(res.data.result.rute);
  //       setkebEnergi(res.data.result.kebEnergi);
  //       setkebProtein(res.data.result.kebProtein);
  //       setkebLemak(res.data.result.kebLemak);
  //       setkebCho(res.data.result.kebCho);
  //       setkebLain(res.data.result.kebLain);
  //       setimplementasi(res.data.result.implementasi);
  //       setmateriKonseling(res.data.result.materiKonseling);
  //       setbioKimia(res.data.result.bioKimia);
  //       setKeluhanGizi(res.data.result.keluhanGizi);
  //       setlainLainKlinik(res.data.result.lainLainKlinik);
  //     }, [])
  //     .catch((err) => {
  //       // console.log('data anamnesa kosong');
  //       //setprintAsuhan('');
  //       setKodediit("");
  //       setKodeextra("");
  //       setnamaDiet("");
  //       setnamaHidangan("");
  //       setAktifitas("");
  //       setPantanganMakan("");
  //       setkebiasaanHidup("");
  //       setdiitSebelumnya("");
  //       setmakananPokok("");
  //       setlaukHewani("");
  //       setlaukNabati("");
  //       setsayur("");
  //       setbuah("");
  //       setsusu("");
  //       setsnack("");
  //       setlainLainFfq("");
  //       setenergi("");
  //       setlemak("");
  //       setprotein("");
  //       setcho("");
  //       setlainLainRecall("");
  //       setdiagnosaGizi("");
  //       setbentukMakanan("");
  //       setrute("");
  //       setkebEnergi("");
  //       setkebProtein("");
  //       setkebLemak("");
  //       setkebCho("");
  //       setkebLain("");
  //       setimplementasi("");
  //       setmateriKonseling("");
  //       setbioKimia("");
  //       setKeluhanGizi("");
  //       setlainLainKlinik("");
  //     });
  // };

  // const halamanprintAsuhan = (idas) => {
  //   axios
  //     .get(`${apiku}/api/EmrGizi/GetAsuhanId/${idas}`, options)
  //     .then((res) => {
  //       setprintAsuhan(res.data.result);
  //     }, [])
  //     .catch((err) => {
  //       // console.log('data anamnesa kosong');
  //       setprintAsuhan("");
  //     });
  // };

  // const halamanprintscreening = (idsc) => {
  //   axios
  //     .get(`${apiku}/api/EmrGizi/GetScrId/${idsc}`, options)
  //     .then((res) => {
  //       setGiziScreening(res.data.result);
  //     }, [])
  //     .catch((err) => {
  //       // console.log('data anamnesa kosong');
  //       setGiziScreening("");
  //     });
  // };

  const deletescreening = (idscreening, regId) => {
    axios
      .delete(
        `${apiku}/EmrGiziSmart/GetGiziScreeningSmart/${idscreening}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            // icon: <Icon component={BPJSICO} />,
            title: "Data Berhasil Dihapus!",
            //  content: res.data.message,
          });
          detailListScreening(regId);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
            //  content: JSON.stringify(res.data),
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  const deleteasuhan = (idasuhan, regId) => {
    axios
      .delete(`${apiku}/EmrGiziSmart/GiziAsuhanSmart/${idasuhan}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            // icon: <Icon component={BPJSICO} />,
            title: "Data Berhasil Dihapus!",
            //  content: res.data.message,
          });
          detailListAsuhan(regId);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
            //  content: JSON.stringify(res.data),
          });
        }
      })
      .catch((err) => {
        // console.log(err);
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  const deleteevaluasi = (idevaluasi, regId) => {
    axios
      .delete(`${apiku}/EmrGiziSmart/GiziEvaluasiSmart/${idevaluasi}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({
            // icon: <Icon component={BPJSICO} />,
            title: "Data Berhasil hapus!",
            //  content: res.data.message,
          });
          detailevaluasi(regId);
        } else {
          Modal.warning({
            title: "Data Gagal Dihapus!",
            //  content: JSON.stringify(res.data),
          });
        }
      })
      .catch((err) => {
        //console.log(err);
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  return (
    <GiziAsuhanContext.Provider
      value={{
        evaluasi,
        setEvaluasi,
        asuhangizi,
        setAsuhanGizi,
        giziscreening,
        setGiziScreening,
        listscreening,
        setListScreening,
        screening,
        setScreening,
        listasuhan,
        setListAsuhan,
        printasuhan,
        setprintAsuhan,
        kodediit,
        setKodediit,
        namaDiet,
        setnamaDiet,
        namaHidangan,
        setnamaHidangan,
        kodeextra,
        setKodeextra,
        aktifitas,
        setAktifitas,
        pantanganMakan,
        setPantanganMakan,
        kebiasaanHidup,
        setkebiasaanHidup,
        diitSebelumnya,
        setdiitSebelumnya,
        makananPokok,
        setmakananPokok,
        laukHewani,
        setlaukHewani,
        laukNabati,
        setlaukNabati,
        sayur,
        setsayur,
        buah,
        setbuah,
        susu,
        setsusu,
        snack,
        setsnack,
        lainLainFfq,
        setlainLainFfq,
        energi,
        setenergi,
        lemak,
        setlemak,
        protein,
        setprotein,
        cho,
        setcho,
        lainLainRecall,
        setlainLainRecall,
        diagnosaGizi,
        setdiagnosaGizi,
        bentukMakanan,
        setbentukMakanan,
        rute,
        setrute,
        kebEnergi,
        setkebEnergi,
        kebProtein,
        setkebProtein,
        kebLemak,
        setkebLemak,
        kebCho,
        setkebCho,
        kebLain,
        setkebLain,
        implementasi,
        setimplementasi,
        materiKonseling,
        setmateriKonseling,
        bioKimia,
        setbioKimia,
        keluhanGizi,
        setKeluhanGizi,
        lainLainKlinik,
        setlainLainKlinik,
        asuhanGiziId,
        setasuhanGiziId,
        screeningId,
        setscreeningId,
        lila,
        setLila,
        beratBadan,
        setberatBadan,
        tinggiBadan,
        settinggiBadan,
        pertanyaan1,
        setPertanyaan1,
        pertanyaan2,
        setPertanyaan2,
        pertanyaan3,
        setPertanyaan3,
        pertanyaan4,
        setPertanyaan4,

        tanggaleva,
        setTanggaleva,
        assesmenteva,
        setAssesmenteva,
        diagnosaeva,
        setDiagnosaeva,
        implementasieva,
        setImplementasieva,
        monitoringeva,
        setMonitoringeva,
        evaluasiGiziId,
        setevaluasiGiziId,
        listEvaluasi,
        setlistEvaluasi,
        ttvLast,
        setttvLast,
        listDokterGizi,
        setlistDokterGizi,
        getmstdokterGizi,
        resetscreening,
        resetformevaluasi,
        resetasuhan,
        insertGizi,
        insertGiziAsuhan,
        insertEvaluasi,
        detailListScreening,
        detailevaluasi,
        detailListAsuhan,
        getLastTTV,
        deletescreening,
        deleteasuhan,
        deleteevaluasi,
        visibledewasa,
        setVisibledewasa,
        lastScreeningId,
        setLastScreeningId,
        tanggalasuhan,
        settanggalasuhan,
        tanggalScreening,
        settanggalScreening,
      }}
    >
      {props.children}
    </GiziAsuhanContext.Provider>
  );
};

export default GiziAsuhanContextProvider;
