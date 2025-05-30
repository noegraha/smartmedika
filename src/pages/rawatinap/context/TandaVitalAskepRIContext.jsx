import React, { createContext, useState, useContext, useEffect } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";

export const TTVRIContext = createContext();

const TTVRIContextProvider = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const { sendTele } = useContext(LoginContext);
  const [visibleNyeri, setvisibleNyeri] = useState(false);
  const [visibleJatuh, setvisibleJatuh] = useState(false);

  const [tandaVitalId, setTandaVitalId] = useState(0);
  const [gcsMata, setgcsMata] = useState(4);
  const [gcsSuara, setgcsSuara] = useState(5);
  const [gcsGerakan, setgcsGerakan] = useState(6);
  const [tekananDarahSistolik, settekananDarahSistolik] = useState([]);
  const [tekananDarahDiastolik, settekananDarahDiastolik] = useState([]);
  const [suhuTubuh, setsuhuTubuh] = useState([]);
  const [frekuensiNadi, setfrekuensiNadi] = useState([]);
  const [frekuensiNafas, setfrekuensiNafas] = useState([]);
  const [tglTTV, setTglTTV] = useState(dayjs());
  const [tingkatKesadaranId, settingkatKesadaranId] = useState([]);
  const [tingkatKesadaran, settingkatKesadaran] = useState([]);
  const [iramaNadi, setiramaNadi] = useState("Teratur");
  const [saturasiOksigen, setsaturasiOksigen] = useState([]);
  const [tinggiBadan, settinggiBadan] = useState("");
  const [beratBadan, setberatBadan] = useState("");
  const [etermitas, setEtermitas] = useState("Hangat");
  const [ttvAllByNoreg, setTTvAllByNoreg] = useState([]);
  const [ttvAllByNoregLengkap, setttvAllByNoregLengkap] = useState([]);
  const [grabikTTV, setGravikTTV] = useState([]);
  const [userTTV, setUserTTV] = useState("");

  const [scalaNyeri, setscalaNyeri] = useState("");
  const [skalaNyeri1, setskalaNyeri1] = useState("");
  const [skalaNyeri2, setskalaNyeri2] = useState("");
  const [skalaNyeri3, setskalaNyeri3] = useState("");
  const [skalaNyeri4, setskalaNyeri4] = useState("");
  const [skalaNyeri5, setskalaNyeri5] = useState("");
  const [skalaNyeri6, setskalaNyeri6] = useState("");
  const [skorNyeri, setskorNyeri] = useState("");

  const [penangananResikoJatuh, setpenangananResikoJatuh] = useState([]);
  const [penangananId, setpenangananId] = useState([]);
  const [metodeResikoJatuh, setmetodeResikoJatuh] = useState("");
  const [rJatuh1, setrJatuh1] = useState("");
  const [rJatuh2, setrJatuh2] = useState("");
  const [sMental1, setsMental1] = useState("");
  const [sMental2, setsMental2] = useState("");
  const [sMental3, setsMental3] = useState("");
  const [sMata1, setsMata1] = useState("");
  const [sMata2, setsMata2] = useState("");
  const [sMata3, setsMata3] = useState("");
  const [kebiasaanBerkemih, setkebiasaanBerkemih] = useState("");
  const [transferTT, settransferTT] = useState("");
  const [mobilitas, setmobilitas] = useState("");
  const [humDumUsia, sethumDumUsia] = useState("");
  const [humDumKel, sethumDumKel] = useState("");
  const [humDumDiagnosa, sethumDumDiagnosa] = useState("");
  const [humDumGangguanKognitif, sethumDumGangguanKognitif] = useState("");
  const [humDumLingkungan, sethumDumLingkungan] = useState("");
  const [humDumRespon, sethumDumRespon] = useState("");
  const [humDumPemObat, sethumDumPemObat] = useState("");
  const [morseRiwJatuh, setmorseRiwJatuh] = useState("");
  const [morseDiagnosa, setmorseDiagnosa] = useState("");
  const [morseKondisiJalan, setmorseKondisiJalan] = useState("");
  const [morseInfus, setmorseInfus] = useState("");
  const [morseKondisiBadan, setmorseKondisiBadan] = useState("");
  const [morseGangKognitif, setmorseGangKognitif] = useState("");
  // const [skorResikoJatuh, setskorResikoJatuh] = useState('')

  const [listCatatanPasien, setListCatatanPasien] = useState([]);
  const [katonCatatan, setkatonCatatan] = useState(false);
  const [tanggalCatatan, setTanggalcatatan] = useState(dayjs());
  const [catatan, setCatatan] = useState("");
  const [idCatatan, setidCatatan] = useState(0);
  const [katonBacaCatatan, setkatonBacaCatatan] = useState(false);
  const [subjekC, setsubjekC] = useState("");
  const [assesmentC, setassesmentC] = useState("");
  const [planningC, setplanningC] = useState("");
  const [implementasiC, setimplementasiC] = useState("");
  const [evaluasiC, setevaluasiC] = useState("");
  const [instruksiC, setinstruksiC] = useState("");
  const [waktu, setwaktu] = useState("");
  const [kirimcppt, setkirimcppt] = useState(false);
  const [loading, setloading] = useState(false);

  const [hasil, setHasil] = useState([]);
  const [spin, setSpin] = useState(true);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getTTVAllBynoreg = (noreg) => {
    axios
      .get(`${apiku}/EmrTandaVital/GetAllById/${noreg}`, options)

      .then((res) => {
        if (res.data.statusCode === 200) {
          setTTvAllByNoreg(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setTTvAllByNoreg([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getTTVAllBynoregLengkap = (noreg) => {
    axios
      .get(`${apiku}/EmrTandaVital/GetAllByDetail/${noreg}`, options)

      .then((res) => {
        if (res.data.statusCode === 200) {
          setttvAllByNoregLengkap(
            res.data.result.sort(
              (a, b) => parseFloat(b.tandaVitalId) - parseFloat(a.tandaVitalId)
            )
          );
          console.log(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setttvAllByNoregLengkap([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getTTVById = (id) => {
    axios
      .get(`${apiku}/EmrTandaVital/GetTTVById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setTglTTV(dayjs(res.data.result.jam));
          setTandaVitalId(res.data.result.tandaVitalId);
          setgcsMata(res.data.result.gcsMata);
          setgcsSuara(res.data.result.gcsSuara);
          setgcsGerakan(res.data.result.gcsGerakan);
          settekananDarahSistolik(res.data.result.tekananDarahSistolik);
          settekananDarahDiastolik(res.data.result.tekananDarahDiastolik);
          setsuhuTubuh(res.data.result.suhuTubuh);
          setfrekuensiNadi(res.data.result.frekuensiNadi);
          setfrekuensiNafas(res.data.result.frekuensiNadi);
          setUserTTV(res.data.result.userId);
          setberatBadan(res.data.result.beratBadan);
          settinggiBadan(res.data.result.tinggiBadan);
          setsaturasiOksigen(res.data.result.saturasiOksigen);
          setiramaNadi(res.data.result.iramaNadi);
        } else {
          console.log("data implementasi kosong");
          setTglTTV(dayjs());
          setTandaVitalId(0);
          setgcsMata("");
          setgcsSuara("");
          setgcsGerakan("");
          settekananDarahSistolik("");
          settekananDarahDiastolik("");
          setsuhuTubuh("");
          setfrekuensiNadi("");
          setfrekuensiNafas("");
          setUserTTV("");
          setberatBadan();
          settinggiBadan();
          setsaturasiOksigen();
          setiramaNadi("Teratur");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getGravikTTV = (noreg) => {
    axios
      .get(`${apiku}/EmrTandaVital/GetStatistikTTV/${noreg}`, options)

      .then((res) => {
        if (res.data.statusCode === 200) {
          setGravikTTV(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setGravikTTV([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getNyeriByRegDate = (noreg, date) => {
    axios
      .get(`${apiku}/Nyeri/GetByDate/${noreg}/${date}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const metode = res.data.result.Metode;
          const resdata = res.data.result;
          setscalaNyeri(metode);
          if (metode === "Visual Analog Scale") {
            setskalaNyeri1(resdata.VisualAnalogSkala);
          } else if (metode === "FLACC") {
            setskalaNyeri1(resdata.EkspresiWajah);
            setskalaNyeri2(resdata.Kaki);
            setskalaNyeri3(resdata.Aktivitas);
            setskalaNyeri4(resdata.Menangis);
            setskalaNyeri5(resdata.Kenyamanan);
          } else if (metode === "NIPS") {
            setskalaNyeri1(resdata.EkspresiWajah);
            setskalaNyeri2(resdata.Menangis);
            setskalaNyeri3(resdata.PolaBernafas);
            setskalaNyeri4(resdata.Lengan);
            setskalaNyeri5(resdata.Kaki);
            setskalaNyeri6(resdata.KeadaanRangsangan);
          } else if (metode === "NVPS") {
            setskalaNyeri1(resdata.EkspresiWajah);
            setskalaNyeri2(resdata.Aktivitas);
            setskalaNyeri3(resdata.Melindungi);
            setskalaNyeri4(resdata.Fisiologis);
            setskalaNyeri5(resdata.Respirasi);
          } else if (metode === "Wong Bakes Facies") {
            setskalaNyeri1(resdata.WongBakesFaciesSkala);
          } else {
            setskalaNyeri1(resdata.NPRSSkala);
          }
        } else {
          console.log("skala nyeri tidak ada");
          console.log("ini data nyeri", noreg, date);
          setscalaNyeri("");
          setskalaNyeri1("");
          setskalaNyeri2("");
          setskalaNyeri3("");
          setskalaNyeri4("");
          setskalaNyeri5("");
          setskalaNyeri6("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getResikoJatuhByRegDate = (noreg, date) => {
    axios
      .get(`${apiku}/ResikoJatuh/GetByDate/${noreg}/${date}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const metoderesiko = res.data.result.metode;
          const resdata = res.data.result.detail;
          setmetodeResikoJatuh(metoderesiko);

          if (metoderesiko === "HUMPTY DUMPTY") {
            sethumDumUsia(resdata[0].kriteria + "-" + resdata[0].jawaban);
            sethumDumKel(resdata[1].kriteria + "-" + resdata[1].jawaban);
            sethumDumDiagnosa(resdata[2].kriteria + "-" + resdata[2].jawaban);
            sethumDumGangguanKognitif(
              resdata[3].kriteria + "-" + resdata[3].jawaban
            );
            sethumDumLingkungan(resdata[4].kriteria + "-" + resdata[4].jawaban);
            sethumDumRespon(resdata[5].kriteria + "-" + resdata[5].jawaban);
            sethumDumPemObat(resdata[6].kriteria + "-" + resdata[6].jawaban);
          } else if (metoderesiko === "ONTARIO") {
            setrJatuh1(resdata[0].kriteria + "-" + resdata[0].jawaban);
            setrJatuh2(resdata[1].kriteria + "-" + resdata[1].jawaban);
            setsMental1(resdata[2].kriteria + "-" + resdata[2].jawaban);
            setsMental2(resdata[3].kriteria + "-" + resdata[3].jawaban);
            setsMental3(resdata[4].kriteria + "-" + resdata[4].jawaban);
            setsMata1(resdata[5].kriteria + "-" + resdata[5].jawaban);
            setsMata2(resdata[6].kriteria + "-" + resdata[6].jawaban);
            setsMata3(resdata[7].kriteria + "-" + resdata[7].jawaban);
            setkebiasaanBerkemih(
              resdata[8].kriteria + "-" + resdata[8].jawaban
            );
            settransferTT(resdata[9].kriteria + "-" + resdata[9].jawaban);
            setmobilitas(resdata[10].kriteria + "-" + resdata[10].jawaban);
          } else {
            setmorseRiwJatuh(resdata[0].kriteria + "-" + resdata[0].jawaban);
            setmorseDiagnosa(resdata[1].kriteria + "-" + resdata[1].jawaban);
            setmorseKondisiJalan(
              resdata[2].kriteria + "-" + resdata[2].jawaban
            );
            setmorseInfus(resdata[3].kriteria + "-" + resdata[3].jawaban);
            setmorseKondisiBadan(
              resdata[4].kriteria + "-" + resdata[4].jawaban
            );
            setmorseGangKognitif(
              resdata[5].kriteria + "-" + resdata[5].jawaban
            );
          }
        } else {
          console.log("data resiko jatuh tidak ada");
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
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getResikoJatuhByRegDateLengkap = (noreg, date) => {
    axios
      .get(`${apiku}/ResikoJatuh/GetByPenanganan/${noreg}/${date}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const metoderesiko = res.data.result.metode;
          const resdetail = res.data.result.detail;
          setmetodeResikoJatuh(res.data.result.metode);
          setpenangananId(
            res.data.result.detailPenanganan.map((b) =>
              b.penangananId.toString()
            )
          );
          if (metoderesiko === "HUMPTY DUMPTY") {
            sethumDumUsia(resdetail[0].kriteria + "-" + resdetail[0].jawaban);
            sethumDumKel(resdetail[1].kriteria + "-" + resdetail[1].jawaban);
            sethumDumDiagnosa(
              resdetail[2].kriteria + "-" + resdetail[2].jawaban
            );
            sethumDumGangguanKognitif(
              resdetail[3].kriteria + "-" + resdetail[3].jawaban
            );
            sethumDumLingkungan(
              resdetail[4].kriteria + "-" + resdetail[4].jawaban
            );
            sethumDumRespon(resdetail[5].kriteria + "-" + resdetail[5].jawaban);
            sethumDumPemObat(
              resdetail[6].kriteria + "-" + resdetail[6].jawaban
            );
          } else if (metoderesiko === "ONTARIO") {
            setrJatuh1(resdetail[0].kriteria + "-" + resdetail[0].jawaban);
            setrJatuh2(resdetail[1].kriteria + "-" + resdetail[1].jawaban);
            setsMental1(resdetail[2].kriteria + "-" + resdetail[2].jawaban);
            setsMental2(resdetail[3].kriteria + "-" + resdetail[3].jawaban);
            setsMental3(resdetail[4].kriteria + "-" + resdetail[4].jawaban);
            setsMata1(resdetail[5].kriteria + "-" + resdetail[5].jawaban);
            setsMata2(resdetail[6].kriteria + "-" + resdetail[6].jawaban);
            setsMata3(resdetail[7].kriteria + "-" + resdetail[7].jawaban);
            setkebiasaanBerkemih(
              resdetail[8].kriteria + "-" + resdetail[8].jawaban
            );
            settransferTT(resdetail[9].kriteria + "-" + resdetail[9].jawaban);
            setmobilitas(resdetail[10].kriteria + "-" + resdetail[10].jawaban);
          } else {
            setmorseRiwJatuh(
              resdetail[0].kriteria + "-" + resdetail[0].jawaban
            );
            setmorseDiagnosa(
              resdetail[1].kriteria + "-" + resdetail[1].jawaban
            );
            setmorseKondisiJalan(
              resdetail[2].kriteria + "-" + resdetail[2].jawaban
            );
            setmorseInfus(resdetail[3].kriteria + "-" + resdetail[3].jawaban);
            setmorseKondisiBadan(
              resdetail[4].kriteria + "-" + resdetail[4].jawaban
            );
            setmorseGangKognitif(
              resdetail[5].kriteria + "-" + resdetail[5].jawaban
            );
          }
        } else {
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
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const insertTTVAssesment = (datatandavital, datanyeri, dataresikojatuh) => {
    axios
      .post(`${apiku}/Nyeri/Create`, datanyeri)
      .then((res) => {
        if (res.data.statusCode === 200) {
          axios
            .post(`${apiku}/ResikoJatuh/Create`, dataresikojatuh)
            .then((res) => {
              if (res.data.statusCode === 200) {
                axios
                  .post(`${apiku}/EmrTandaVital`, datatandavital)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      // getTTVAllBynoreg(datatandavital.registrasiId);
                      getTTVAllBynoregLengkap(datatandavital.registrasiId);
                      getGravikTTV(datatandavital.registrasiId);
                      Modal.success({
                        title: "Data Berhasil Disimpan",
                        //  content: JSON.stringify(res.data),
                      });
                    } else {
                      sendTele(
                        "3",
                        "Insert TTV Harian Askep",
                        res.data.statusCode,
                        res.data.message,
                        res.data.result,
                        datatandavital.clientIP,
                        datatandavital.userId,
                        datatandavital.registrasiId,
                        datatandavital.ruangId,
                        datatandavital
                      );
                      console.log("tidak dapat menyimpan");
                      message.error("Gagal Menyimpan Tanda Vital!");
                    }
                  });
              } else {
                sendTele(
                  "3",
                  "Insert Resiko Jatuh Harian Askep",
                  res.data.statusCode,
                  res.data.message,
                  res.data.result,
                  datatandavital.clientIP,
                  dataresikojatuh.userId,
                  dataresikojatuh.registrasiId,
                  dataresikojatuh.ruangId,
                  dataresikojatuh
                );
                console.log("tidak dapat menyimpan");
                message.error("Gagal Disimpan Resiko Jatuh!");
              }
            });
        } else {
          sendTele(
            "3",
            "Insert Nyeri Harian Askep",
            res.data.statusCode,
            res.data.message,
            res.data.result,
            datatandavital.clientIP,
            datanyeri.userId,
            datanyeri.registrasiId,
            datanyeri.ruangId,
            datanyeri
          );
          console.log("tidak dapat menyimpan");
          message.error("Gagal DisimpanSkor Nyeri!");
        }
      })

      .catch((errors) => {
        console.log(errors);
        //message.error('Gagal Disimpan!');
        console.log(datatandavital);
        message.error("Error Simpan Tanda Vital!");
      });
  };

  // const insertTTVHarian = (
  //   datatandavital,
  //   datanyeri,
  //   dataresikojatuh,
  //   datacatatan,
  //   datacppt,
  //   kirim
  // ) => {
  //   console.log(
  //     datatandavital,
  //     datanyeri,
  //     dataresikojatuh,
  //     datacatatan,
  //     datacppt,
  //     kirim
  //   );
  //   setloading(true);
  //   axios
  //     .post(`${apiku}/Nyeri/Create`, datanyeri)
  //     .then((res) => {
  //       if (res.data.statusCode === 200) {
  //         axios
  //           .post(`${apiku}/ResikoJatuh/CreateNew`, dataresikojatuh)
  //           .then((res) => {
  //             if (res.data.statusCode === 200) {
  //               axios
  //                 .post(`${apiku}/EmrTandaVital/Ri`, datatandavital, options)
  //                 .then((res) => {
  //                   if (res.data.statusCode === 200) {
  //                     axios
  //                       .get(
  //                         `${apiku}/EmrTandaVital/ReadTandaVitalLastId/${datatandavital.registrasiId}`,
  //                         options
  //                       )
  //                       .then((res) => {
  //                         if (res.data.statusCode === 200) {
  //                           const lastId = res.data.result.tandaVitalId;
  //                           //1. insert catatan medis
  //                           axios
  //                             .post(
  //                               `${apiku}/Askep/Catatan/Create`,
  //                               datacatatan
  //                             )
  //                             .then((res) => {
  //                               if (res.data.statusCode === 200) {
  //                                 if (kirim === true) {
  //                                   //1. insert catatan medis
  //                                   axios
  //                                     .post(
  //                                       `${apiku}/EmrCatatanMedis/Ri`,
  //                                       {
  //                                         catatanMedisId:
  //                                           datacppt.catatanMedisId,
  //                                         registrasiId: datacppt.registrasiId,
  //                                         subjektif: datacppt.subjektif,
  //                                         objektif: datacppt.objektif,
  //                                         assesment: datacppt.assesment,
  //                                         planning: datacppt.planning,
  //                                         instruksi: datacppt.instruksi,
  //                                         evaluasi: datacppt.evaluasi,
  //                                         implementasi: datacppt.implementasi,
  //                                         tglJam: datacppt.tglJam,
  //                                         pelaksanaId: datacppt.pelaksanaId,
  //                                         namaProfesi: datacppt.namaProfesi,
  //                                         userId: datacppt.userId,
  //                                         verified: datacppt.verified,
  //                                         ruangId: datacppt.ruangId,
  //                                         verifiedTime: datacppt.verifiedTime,
  //                                         tandaVitalId: lastId,
  //                                         hapus: datacppt.hapus,
  //                                         citasi: datacppt.citasi,
  //                                         citNomer: datacppt.citNomer,
  //                                         citated: datacppt.citated,
  //                                         clientHost: datacppt.clientHost,
  //                                         clientIP: datacppt.clientIP,
  //                                       },
  //                                       options
  //                                     )
  //                                     .then((res) => {
  //                                       if (res.data.statusCode === 200) {
  //                                         // getCatatanPasien(
  //                                         //   datacatatan.registrasiId
  //                                         // );
  //                                         setidCatatan(0);
  //                                         setTandaVitalId(0);
  //                                         Modal.success({
  //                                           title:
  //                                             "Berhasil Menyimpan Data Catatan Pasien!",
  //                                         });
  //                                         setloading(false);
  //                                       } else {
  //                                         setloading(false);
  //                                         message.error(
  //                                           "Gagal Menyimpan Catatan Medis!"
  //                                         );
  //                                       }
  //                                     })
  //                                     .catch((errors) => {
  //                                       setloading(false);
  //                                       message.error("Error Catatan Medis!");
  //                                     });
  //                                 } else {
  //                                   // getCatatanPasien(datacatatan.registrasiId);
  //                                   setidCatatan(0);
  //                                   setloading(false);
  //                                   Modal.success({
  //                                     content:
  //                                       "Berhasil Menyimpan Data Catatan Pasien!",
  //                                   });
  //                                 }
  //                               } else {
  //                                 console.log(res.data);
  //                                 setloading(false);
  //                                 setTandaVitalId(lastId);
  //                                 message.error("Gagal Menyimpan Catatan!");
  //                               }
  //                             })
  //                             .catch((errors) => {
  //                               console.log(errors);
  //                               setloading(false);
  //                               message.error("Error Simpan Catatan!");
  //                             });
  //                         } else {
  //                           setloading(false);
  //                           message.warning("gagal Mengambil Data TTV!");
  //                         }
  //                       })
  //                       .catch((err) => {
  //                         setloading(false);
  //                         message.error(err);
  //                         message.error("Terjadi Kesalahan Konksi!");
  //                       });
  //                   } else {
  //                     setloading(false);
  //                     message.error("Gagal Menyimpan Tanda Vital!");
  //                   }
  //                 })
  //                 .catch((errors) => {
  //                   console.log(errors);
  //                   setloading(false);
  //                   //message.error('Gagal Disimpan!');
  //                   console.log(datatandavital);
  //                   message.error("Error Simpan Tanda Vital!");
  //                 });
  //             } else {
  //               sendTele(
  //                 "3",
  //                 "Insert Resiko Jatuh Harian Askep",
  //                 res.data.statusCode,
  //                 res.data.message,
  //                 res.data.result,
  //                 datatandavital.clientIP,
  //                 dataresikojatuh.userId,
  //                 dataresikojatuh.registrasiId,
  //                 dataresikojatuh.ruangId,
  //                 dataresikojatuh
  //               );
  //               setloading(false);
  //               console.log("tidak dapat menyimpan");
  //               message.error("Gagal Disimpan Resiko Jatuh!");
  //             }
  //           })
  //           .catch((errors) => {
  //             console.log(errors);
  //             setloading(false);
  //             //message.error('Gagal Disimpan!');
  //             console.log(datatandavital);
  //             message.error("Error Simpan Tanda Vital!");
  //           });
  //       } else {
  //         sendTele(
  //           "3",
  //           "Insert Nyeri Harian Askep",
  //           res.data.statusCode,
  //           res.data.message,
  //           res.data.result,
  //           datatandavital.clientIP,
  //           datanyeri.userId,
  //           datanyeri.registrasiId,
  //           datanyeri.ruangId,
  //           datanyeri
  //         );
  //         setloading(false);
  //         console.log("tidak dapat menyimpan");
  //         message.error("Gagal DisimpanSkor Nyeri!");
  //       }
  //     })
  //     .catch((errors) => {
  //       console.log(errors);
  //       setloading(false);
  //       //message.error('Gagal Disimpan!');
  //       console.log(datatandavital);
  //       message.error("Error Simpan Tanda Vital!");
  //     });
  // };

  const insertTTVHarian = async (
    datatandavital,
    datanyeri,
    dataresikojatuh,
    datacatatan,
    datacppt,
    kirim
  ) => {
    console.log(
      datatandavital,
      datanyeri,
      dataresikojatuh,
      datacatatan,
      datacppt,
      kirim
    );
    setloading(true);

    try {
      // 1. Insert Nyeri
      const nyeriRes = await axios.post(`${apiku}/Nyeri/Create`, datanyeri);
      if (nyeriRes.data.statusCode !== 200) {
        throw new Error("Gagal Disimpan Skor Nyeri!");
      }

      // 2. Insert Resiko Jatuh
      const resikoJatuhRes = await axios.post(
        `${apiku}/ResikoJatuh/CreateNew`,
        dataresikojatuh
      );
      if (resikoJatuhRes.data.statusCode !== 200) {
        throw new Error("Gagal Disimpan Resiko Jatuh!");
      }

      // 3. Insert Tanda Vital
      const ttvRes = await axios.post(
        `${apiku}/EmrTandaVital/Ri`,
        datatandavital,
        options
      );
      if (ttvRes.data.statusCode !== 200) {
        throw new Error("Gagal Menyimpan Tanda Vital!");
      }

      // 4. Get Last Tanda Vital ID
      const lastTTVRes = await axios.get(
        `${apiku}/EmrTandaVital/ReadTandaVitalLastId/${datatandavital.registrasiId}`,
        options
      );
      if (lastTTVRes.data.statusCode !== 200) {
        throw new Error("Gagal Mengambil Data TTV!");
      }

      const lastId = lastTTVRes.data.result.tandaVitalId;

      // 5. Insert Catatan Harian (Askep)
      const catatanRes = await axios.post(
        `${apiku}/Askep/Catatan/Create`,
        datacatatan
      );
      if (catatanRes.data.statusCode !== 200) {
        setTandaVitalId(lastId);
        throw new Error("Gagal Menyimpan Catatan Harian!");
      }

      if (kirim) {
        // 6. Insert Catatan Medis (CPPT)
        const cpptPayload = {
          ...datacppt,
          tandaVitalId: lastId, // Attach the last TTV ID
        };

        const cpptRes = await axios.post(
          `${apiku}/EmrCatatanMedis/Ri`,
          cpptPayload,
          options
        );
        if (cpptRes.data.statusCode !== 200) {
          throw new Error("Gagal Menyimpan Catatan Medis!");
        }

        // Success handling for CPPT
        Modal.success({
          title: "Berhasil Menyimpan Data Catatan Pasien!",
        });
        setidCatatan(0);
        setTandaVitalId(0);
      } else {
        // Success handling if only Catatan Harian is saved
        Modal.success({
          content: "Berhasil Menyimpan Data Catatan Pasien!",
        });
      }
    } catch (error) {
      // Generic error handling for any step
      message.error(error.message);
    } finally {
      // Set loading false after all operations
      setloading(false);
    }
  };

  const insertskalanyeri = (datanyeri) => {
    axios
      .post(`${apiku}/Nyeri/Create`, datanyeri)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          var y = 0;
          for (var i = 0; i < datanyeri.detailNyeri.length; i++)
            y += datanyeri.detailNyeri[i].value;
          console.log(y);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            //  content: JSON.stringify(res.data),
          });
          setskorNyeri(y);
          setvisibleNyeri(false);
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal DisimpanSkor Nyeri!");
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const insertResikoJatuh = (dataresikojatuh) => {
    axios
      .post(`${apiku}/ResikoJatuh/Create`, dataresikojatuh)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // var y = 0;
          // for (var i = 0; i < (dataresikojatuh.detailResikoJatuh.length); i++)
          //     y += (dataresikojatuh.detailResikoJatuh[i].value);

          // setskorResikoJatuh(y);
          // console.log('ini total resiko jatuh', y);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            //  content: JSON.stringify(res.data),
          });
          setvisibleJatuh(false);
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal Disimpan Resiko Jatuh!");
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const deleteTTV = (id, registrasiId, date) => {
    axios
      .delete(`${apiku}/Nyeri/Delete/${registrasiId}/${date}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          axios
            .delete(
              `${apiku}/ResikoJatuh/Delete/${registrasiId}/${date}`,
              options
            )
            .then((res) => {
              if (res.data.statusCode === 200) {
                axios
                  .delete(`${apiku}/EmrTandaVital/${id}`, options)
                  .then((res) => {
                    if (res.data.statusCode === 200) {
                      message.success("Berhasil Dihapus!");
                      // getTTVAllBynoreg(registrasiId);
                      getTTVAllBynoregLengkap(registrasiId);
                      getGravikTTV(registrasiId);
                      setTglTTV(dayjs());
                      setTandaVitalId(0);
                      setgcsMata("");
                      setgcsSuara("");
                      setgcsGerakan("");
                      settekananDarahSistolik("");
                      settekananDarahDiastolik("");
                      setsuhuTubuh("");
                      setfrekuensiNadi("");
                      setfrekuensiNafas("");
                      setUserTTV("");
                      setberatBadan("");
                      settinggiBadan("");
                      setsaturasiOksigen("");

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

                      setscalaNyeri("");
                      setskalaNyeri1("");
                      setskalaNyeri2("");
                      setskalaNyeri3("");
                      setskalaNyeri4("");
                      setskalaNyeri5("");
                      setskalaNyeri6("");
                    } else {
                      console.log("tidak dapat menyimpan");
                      message.error("Gagal Hapus Tanda Vital!");
                    }
                  });
              } else {
                message.error("Gagal Hapus Tanda Vital!");
              }
            });
        } else {
          message.error("Gagal Hapus Tanda Vital!");
        }
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
      });
  };

  const deleteNyeribydate = (registrasiId, date) => {
    axios
      .delete(`${apiku}/Nyeri/Delete/${registrasiId}/${date}`, options)
      .then((res) => {
        message.success("Berhasil Dihapus!");
        // getNyeriAll(registrasiId);
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
      });
  };

  const deleteResikoJatuhbydate = (registrasiId, date) => {
    axios
      .delete(`${apiku}/ResikoJatuh/Delete/${registrasiId}/${date}`, options)
      .then((res) => {
        message.success("Berhasil Dihapus!");
        // getResikoJatuhAll(registrasiId);
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
      });
  };

  const getPenangananResikoJatuh = (metode, skala) => {
    axios
      .get(
        `${apiku}/ResikoJatuh/GetMstPenangananResikoJatuh/${metode}/${skala}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setpenangananResikoJatuh(res.data.result);
          console.log(res.data.result);
        } else {
          message.warning("Data Tidak Ditemukan");
          setpenangananResikoJatuh([]);
        }
      })
      .catch((err) => {
        message.error("WS ERROR!");
      });
  };

  const getCatatanPasien = (regId) => {
    axios
      .get(`${apiku}/Askep/Catatan/GetByRegistrasiId/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListCatatanPasien(res.data.result);
          setkatonCatatan(true);
        } else {
          console.log("data implementasi kosong");
          setListCatatanPasien([]);
        }
      })
      .catch((err) => {
        setListCatatanPasien([]);
      });
  };

  const getPlanning = (regId) => {
    axios
      .get(`${apiku}/Askep/Catatan/IntervensiByRegistrasiId/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setplanningC(res.data.result.toLowerCase());
        } else {
          console.log("data implementasi kosong");
          setplanningC("");
        }
      })
      .catch((err) => {
        setplanningC("");
      });
  };

  const getEvalusi = (regId, tgl) => {
    axios
      .get(`${apiku}/Askep/Catatan/GetEvaluasi/${regId}/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setevaluasiC(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("data evaluasi kosong");
          setevaluasiC("");
        }
      })
      .catch((err) => {
        setevaluasiC("");
      });
  };

  const getDiagnosa = (regId) => {
    axios
      .get(`${apiku}/Askep/Catatan/GetCatatanByRegId/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setassesmentC(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setassesmentC("");
        }
      })
      .catch((err) => {
        setassesmentC("");
      });
  };

  const getCatatanRJ = (Reg, Ruang, Tgl) => {
    axios
      .get(
        `${apiku}/Askep/Catatan/ReadCatatanRJ/${Reg}/${Ruang}/${Tgl}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("data catatan ada", res.data.result);
          setidCatatan(res.data.result.id);
          setCatatan(res.data.result.catatan);
        } else {
          console.log("data catatan kosong", Reg, Ruang, Tgl);
          setidCatatan(0);
          setCatatan("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const insertCatatanPasien = (dataCatatan) => {
    setloading(true);
    axios
      .post(`${apiku}/Askep/Catatan/Create`, dataCatatan)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getCatatanPasien(dataCatatan.registrasiId);
          // setTanggalcatatan(dayjs());
          // setkatonCatatan(false);
          // setkatonBacaCatatan(false);
          // setCatatan("");
          setidCatatan(0);
          // setsubjekC("");
          // setassesmentC("");
          // setplanningC("");
          // setimplementasiC("");
          // setevaluasiC("");
          // setwaktu("");
          // setinstruksiC("");
          Modal.success({
            content: "Berhasil Menyimpan Data Catatan Pasien!",
            onOk() {
              setloading(false);
            },
          });
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal Menyimpan Catatan!");
          setloading(false);
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error Simpan Catatan!");
        setloading(false);
      });
  };

  const deleteCatatan = (regid, tgl) => {
    axios
      .delete(
        `${apiku}/Askep/Catatan/DeleteCatatanPerawat/${regid}/${tgl}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          getCatatanPasien(regid);
          Modal.success({
            title: "Data Berhasil Dihapus!!",
            // content: res.data.message,
          });
        } else {
          Modal.warning({
            title: "Data gagal Dihapus!!",
            // content: res.data.message,
          });
        }
      })
      .catch((err) => {
        message.error("Error Dihapus!");
      });
  };

  // const getEditCatatan = (noreg) => {
  //   setSpin(true);
  //   axios
  //     .get(
  //       `${apiku}/Askep/Assesment/GetByRegistrasiId/${noreg}/1`,
  //       options
  //     )
  //     .then((res) => {
  //       if (res.data.statusCode === 200) {
  //         console.log("data assement ada");
  //         setTglTTV(dayjs(res.data.result.tanggal));
  //         getTTVAssByRuang(
  //           noreg,
  //           res.data.result.ruangId,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         getResikoJatuhByRegDate(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         getNyeriByRegDate(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         getEwsAssByRuang(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );

  //         getAssesmentMeowsDate(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         // getAssSkorDown(noreg);
  //         getAssSkorDowntgl(
  //           noreg,
  //           dayjs(res.data.result.tanggal).format("YYYY-MM-DD HH:mm")
  //         );
  //         setdissabletgl(true);
  //         setSpin(false);
  //       } else {
  //         console.log("data assement tdk ada");
  //         setTandaVitalId(0);
  //         setgcsMata(4);
  //         setgcsSuara(5);
  //         setgcsGerakan(6);
  //         settekananDarahSistolik("");
  //         settekananDarahDiastolik("");
  //         setsuhuTubuh("");
  //         setfrekuensiNadi("");
  //         setfrekuensiNafas("");
  //         setTglTTV(dayjs());
  //         settingkatKesadaranId("");
  //         settingkatKesadaran("");
  //         setiramaNadi("Teratur");
  //         setsaturasiOksigen("");
  //         settinggiBadan("");
  //         setberatBadan("");
  //         setEtermitas("");
  //         setdissabletgl(false);
  //         setSpin(false);
  //       }
  //     })
  //     .catch((err) => {
  //       setdissabletgl(false);
  //       message.error(err);
  //       setSpin(false);
  //     });
  // };

  const kosongkanCatatan = () => {
    setTandaVitalId(0);
    setgcsMata(4);
    setgcsSuara(5);
    setgcsGerakan(6);
    settekananDarahSistolik("");
    settekananDarahDiastolik("");
    setsuhuTubuh("");
    setfrekuensiNadi("");
    setfrekuensiNafas("");
    setTglTTV(dayjs());
    settingkatKesadaranId("");
    settingkatKesadaran("");
    setiramaNadi("Teratur");
    setsaturasiOksigen("");
    settinggiBadan("");
    setberatBadan("");
    setEtermitas("Hangat");

    setscalaNyeri("");
    setskalaNyeri1("");
    setskalaNyeri2("");
    setskalaNyeri3("");
    setskalaNyeri4("");
    setskalaNyeri5("");
    setskalaNyeri6("");
    setskorNyeri("");

    setpenangananResikoJatuh([]);
    setpenangananId(0);
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
    // const [skorResikoJatuh, setskorResikoJatuh] = useState('')

    setListCatatanPasien([]);
    setTanggalcatatan(dayjs());
    setCatatan("");
    setidCatatan(0);
    setsubjekC("");
    setinstruksiC("");
    // setassesmentC("");
    // setplanningC("");
    setimplementasiC("");
    // setevaluasiC("");
    setwaktu("");
    setkirimcppt(false);
  };

  return (
    <TTVRIContext.Provider
      value={{
        visibleNyeri,
        setvisibleNyeri,
        visibleJatuh,
        setvisibleJatuh,

        grabikTTV,
        userTTV,
        ttvAllByNoreg,
        setTTvAllByNoreg,
        tandaVitalId,
        setTandaVitalId,
        gcsMata,
        setgcsMata,
        gcsSuara,
        setgcsSuara,
        gcsGerakan,
        setgcsGerakan,
        tekananDarahSistolik,
        settekananDarahSistolik,
        tekananDarahDiastolik,
        settekananDarahDiastolik,
        suhuTubuh,
        setsuhuTubuh,
        frekuensiNadi,
        setfrekuensiNadi,
        frekuensiNafas,
        setfrekuensiNafas,
        tglTTV,
        setTglTTV,
        tingkatKesadaranId,
        settingkatKesadaranId,
        tingkatKesadaran,
        settingkatKesadaran,
        iramaNadi,
        setiramaNadi,
        saturasiOksigen,
        setsaturasiOksigen,
        tinggiBadan,
        settinggiBadan,
        beratBadan,
        setberatBadan,
        etermitas,
        setEtermitas,
        insertTTVAssesment,
        getTTVAllBynoregLengkap,
        setttvAllByNoregLengkap,
        ttvAllByNoregLengkap,

        scalaNyeri,
        setscalaNyeri,
        skalaNyeri1,
        setskalaNyeri1,
        skalaNyeri2,
        setskalaNyeri2,
        skalaNyeri3,
        setskalaNyeri3,
        skalaNyeri4,
        setskalaNyeri4,
        skalaNyeri5,
        setskalaNyeri5,
        skalaNyeri6,
        setskalaNyeri6,
        skorNyeri,
        setskorNyeri,
        insertskalanyeri,

        getPenangananResikoJatuh,
        penangananResikoJatuh,
        setpenangananResikoJatuh,
        getResikoJatuhByRegDateLengkap,
        penangananId,
        setpenangananId,
        metodeResikoJatuh,
        setmetodeResikoJatuh,
        rJatuh1,
        setrJatuh1,
        rJatuh2,
        setrJatuh2,
        sMental1,
        setsMental1,
        sMental2,
        setsMental2,
        sMental3,
        setsMental3,
        sMata1,
        setsMata1,
        sMata2,
        setsMata2,
        sMata3,
        setsMata3,
        kebiasaanBerkemih,
        setkebiasaanBerkemih,
        transferTT,
        settransferTT,
        mobilitas,
        setmobilitas,
        humDumUsia,
        sethumDumUsia,
        humDumKel,
        sethumDumKel,
        humDumDiagnosa,
        sethumDumDiagnosa,
        humDumGangguanKognitif,
        sethumDumGangguanKognitif,
        humDumLingkungan,
        sethumDumLingkungan,
        humDumRespon,
        sethumDumRespon,
        humDumPemObat,
        sethumDumPemObat,
        morseRiwJatuh,
        setmorseRiwJatuh,
        morseDiagnosa,
        setmorseDiagnosa,
        morseKondisiJalan,
        setmorseKondisiJalan,
        morseInfus,
        setmorseInfus,
        morseKondisiBadan,
        setmorseKondisiBadan,
        morseGangKognitif,
        setmorseGangKognitif,
        // skorResikoJatuh, setskorResikoJatuh,
        insertResikoJatuh,
        getTTVAllBynoreg,
        getTTVById,
        getGravikTTV,
        getNyeriByRegDate,
        getResikoJatuhByRegDate,
        insertTTVAssesment,
        insertskalanyeri,
        insertResikoJatuh,
        deleteTTV,
        deleteNyeribydate,
        deleteResikoJatuhbydate,
        insertTTVHarian,

        spin,
        setSpin,

        listCatatanPasien,
        setListCatatanPasien,
        katonCatatan,
        setkatonCatatan,
        tanggalCatatan,
        setTanggalcatatan,
        catatan,
        setCatatan,
        idCatatan,
        setidCatatan,
        katonBacaCatatan,
        setkatonBacaCatatan,
        subjekC,
        setsubjekC,
        assesmentC,
        setassesmentC,
        planningC,
        setplanningC,
        implementasiC,
        setimplementasiC,
        evaluasiC,
        setevaluasiC,
        instruksiC,
        setinstruksiC,
        waktu,
        setwaktu,
        getCatatanPasien,
        getCatatanRJ,
        insertCatatanPasien,
        deleteCatatan,
        getPlanning,
        getEvalusi,
        kirimcppt,
        setkirimcppt,
        kosongkanCatatan,
        getDiagnosa,
        loading,
        setloading,
      }}
    >
      {props.children}
    </TTVRIContext.Provider>
  );
};

export default TTVRIContextProvider;
