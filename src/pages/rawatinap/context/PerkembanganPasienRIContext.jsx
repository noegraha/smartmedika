import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { Modal, message } from "antd";
import dayjs from "dayjs";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "./PasienRIContext";

export const PerkembanganPasienRIContext = createContext();

const PerkembanganPasienRIContextProvider = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser, sendTele } = useContext(LoginContext);
  const { curpasRI } = useContext(PasienRIContext);
  //----Tanda VItal----//
  const [tandaVitalId, settandaVitalId] = useState(0);
  const [gcsMata, setgcsMata] = useState(4);
  const [gcsSuara, setgcsSuara] = useState(5);
  const [gcsGerakan, setgcsGerakan] = useState(6);
  const [tekananDarahSistolik, settekananDarahSistolik] = useState("");
  const [tekananDarahDiastolik, settekananDarahDiastolik] = useState("");
  const [suhuTubuh, setsuhuTubuh] = useState("");
  const [frekuensiNadi, setfrekuensiNadi] = useState("");
  const [frekuensiNafas, setfrekuensiNafas] = useState("");
  const [skorNyeri, setskorNyeri] = useState(1);
  const [katonTTV, setKatonTTV] = useState(false);
  const [bacaTTV, setBacaTTV] = useState(false);
  const [tglTTV, setTglTTV] = useState(dayjs());
  const [ttvByNoreg, setTTvByNoreg] = useState([]);
  const [grabikTTV, setGravikTTV] = useState([]);
  const [userTTV, setUserTTV] = useState("");
  const [tingkatKesadaranId, settingkatKesadaranId] = useState("");
  const [tingkatKesadaran, settingkatKesadaran] = useState("");
  const [iramaNadi, setiramaNadi] = useState("Teratur");
  const [resikoJatuh, setresikoJatuh] = useState(1);
  const [saturasiOksigen, setsaturasiOksigen] = useState("");
  const [tinggiBadan, settinggiBadan] = useState("");
  const [beratBadan, setberatBadan] = useState("");
  const [pegawaiId, setPegawaiId] = useState("");
  const [waktuenrol, setwaktuenroll] = useState(
    sessionStorage.getItem("saatenrol")
  );
  const [modalEnrollNew, setmodalEnrollNew] = useState(false);

  //----catatan medis----//
  const [catatanMedisId, setcatatanMedisId] = useState(0);
  const [subjektif, setsubjektif] = useState("");
  const [objektif, setobjektif] = useState("");
  const [assesment, setassesment] = useState("");
  const [planning, setplanning] = useState("");
  const [instruksi, setinstruksi] = useState("");
  const [evaluasi, setevaluasi] = useState("");
  const [implementasi, setimplementasi] = useState("");
  const [temuanDx, settemuanDx] = useState("");
  const [namaProfesi, setnamaProfesi] = useState("");
  const [verified, setverified] = useState(false);
  const [verifiedTime, setverifiedTime] = useState(null);
  const [skalaNyeri, setskalaNyeri] = useState(null);
  const [citasi, setcitasi] = useState(null);
  const [citNomer, setcitNomer] = useState(0);
  const [citated, setcitated] = useState(0);
  const [verifPilih, setverifPilih] = useState("");

  const [cpptRi, setCpptRi] = useState([]);
  const [buttonRiwayat, setbuttonRiwayat] = useState(false);
  const [buttonVerifikasi, setbuttonVerifikasi] = useState(false);
  const [loading, setloading] = useState(false);
  const [tglLibur, settglLibur] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getTTVAll = (noreg) => {
    axios
      .get(`${apiku}/EmrTandaVital/GetAllById/${noreg}`, options)

      .then((res) => {
        if (res.data.statusCode === 200) {
          setTTvByNoreg(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setTTvByNoreg([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getCPPT = (noreg) => {
    console.log("masuk");
    axios
      .get(`${apiku}/EmrCatatanMedis/ReadCatatanRIByReg/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const updatedResult = res.data.result
            .sort((b, a) => a.TglJam.localeCompare(b.TglJam))
            .map((item, index) => ({
              ...item, // Menyalin properti item yang ada
              key: index + 1, // Menambahkan key dengan nomor urut
            }));

          setCpptRi(
            updatedResult.sort((b, a) => a.TglJam.localeCompare(b.TglJam))
          );
          //setCpptRi(res.data.result);
        } else {
          setCpptRi([]);
          console.log("data ksoong");
        }
      })
      .catch((err) => {
        message.error("Terjadi Kesalahan Konksi!");
      });
  };

  const getTglLibur = (noreg) => {
    axios
      .get(`${apiku}/BridgeROnline/GetHariLibur`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const today = dayjs().format("YYYY-MM-DD");
          const formattedResult = res.data.result.harilibur.map((item) =>
            dayjs(item.tgllibur, "DD-MM-YYYY").format("YYYY-MM-DD")
          );
          const isSunday = dayjs().day() === 0;
          const isNationalHoliday = formattedResult.some((holiday) =>
            dayjs(holiday, "YYYY-MM-DD").isSame(today, "day")
          );
          settglLibur(isSunday || isNationalHoliday);
        } else {
          settglLibur([]);
        }
      })
      .catch((err) => {
        settglLibur([]);
      });
  };

  // const insertCPPTDr = (datatandavital, datacatatanmedis) => {
  //   console.log(datatandavital.tandaVitalId);
  //   setloading(true);
  //   axios
  //     .post(`${apiku}/EmrTandaVital/Ri`, datatandavital, options)
  //     .then((res) => {
  //       if (res.data.statusCode === 200) {
  //         axios
  //           .get(
  //             `${apiku}/EmrTandaVital/ReadTandaVitalLastId/${datacatatanmedis.registrasiId}`,
  //             options
  //           )
  //           .then((res) => {
  //             if (res.data.statusCode === 200) {
  //               const lastIdTTV = res.data.result.tandaVitalId;
  //               //1. insert catatan medis
  //               axios
  //                 .post(
  //                   `${apiku}/EmrCatatanMedis/Ri`,
  //                   {
  //                     catatanMedisId: datacatatanmedis.catatanMedisId,
  //                     registrasiId: datacatatanmedis.registrasiId,
  //                     subjektif: datacatatanmedis.subjektif,
  //                     objektif: datacatatanmedis.objektif,
  //                     assesment: datacatatanmedis.assesment,
  //                     planning: datacatatanmedis.planning,
  //                     instruksi: datacatatanmedis.instruksi,
  //                     evaluasi: datacatatanmedis.evaluasi,
  //                     implementasi: datacatatanmedis.implementasi,
  //                     tglJam: datacatatanmedis.tglJam,
  //                     pelaksanaId: datacatatanmedis.pelaksanaId,
  //                     namaProfesi: datacatatanmedis.namaProfesi,
  //                     userId: datacatatanmedis.userId,
  //                     verified: datacatatanmedis.verified,
  //                     ruangId: datacatatanmedis.ruangId,
  //                     verifiedTime: datacatatanmedis.verifiedTime,
  //                     tandaVitalId: lastIdTTV,
  //                     hapus: false,
  //                     citasi: datacatatanmedis.citasi,
  //                     citNomer: datacatatanmedis.citNomer,
  //                     citated: datacatatanmedis.citated,
  //                     clientHost: datacatatanmedis.clientHost,
  //                     clientIP: datacatatanmedis.clientIP,
  //                   },
  //                   options
  //                 )
  //                 .then((res) => {
  //                   if (res.data.statusCode === 200) {
  //                     getCPPT(datacatatanmedis.registrasiId);
  //                     // setloading(false);
  //                     Modal.success({
  //                       title: "Berhasil Simpan Data CPPT Pasien!",
  //                     });
  //                     setloading(false);
  //                     settandaVitalId(0);
  //                     setcatatanMedisId(0);
  //                   } else {
  //                     settandaVitalId(lastIdTTV);
  //                     sendTele(
  //                       "3",
  //                       "/EmrCatatanMedis/Ri",
  //                       JSON.stringify(res.data),
  //                       ip,
  //                       namauser,
  //                       curpasRI.namaPasien,
  //                       curpasRI.ruangDeskripsi,
  //                       JSON.stringify({
  //                         catatanMedisId: datacatatanmedis.catatanMedisId,
  //                         registrasiId: datacatatanmedis.registrasiId,
  //                         subjektif: datacatatanmedis.subjektif,
  //                         objektif: datacatatanmedis.objektif,
  //                         assesment: datacatatanmedis.assesment,
  //                         planning: datacatatanmedis.planning,
  //                         instruksi: datacatatanmedis.instruksi,
  //                         evaluasi: datacatatanmedis.evaluasi,
  //                         implementasi: datacatatanmedis.implementasi,
  //                         tglJam: datacatatanmedis.tglJam,
  //                         pelaksanaId: datacatatanmedis.pelaksanaId,
  //                         namaProfesi: datacatatanmedis.namaProfesi,
  //                         userId: datacatatanmedis.userId,
  //                         verified: datacatatanmedis.verified,
  //                         ruangId: datacatatanmedis.ruangId,
  //                         verifiedTime: datacatatanmedis.verifiedTime,
  //                         tandaVitalId: lastIdTTV,
  //                         hapus: false,
  //                         citasi: datacatatanmedis.citasi,
  //                         citNomer: datacatatanmedis.citNomer,
  //                         citated: datacatatanmedis.citated,
  //                         clientHost: datacatatanmedis.clientHost,
  //                         clientIP: datacatatanmedis.clientIP,
  //                       })
  //                     );
  //                     setloading(false);
  //                     Modal.warning({
  //                       title: "Gagal Menyimpan Data!",
  //                       content: JSON.stringify(res.data),
  //                     });
  //                   }
  //                 })
  //                 .catch((errors) => {
  //                   setloading(false);
  //                   message.error("Error Catatan Medis!");
  //                 });
  //             } else {
  //               setloading(false);

  //               message.warning("gagal Mengambil Data TTV!");
  //             }
  //           })
  //           .catch((err) => {
  //             setloading(false);

  //             message.error(err);
  //             message.error("Terjadi Kesalahan Konksi!");
  //           });
  //       } else {
  //         sendTele(
  //           "3",
  //           "/EmrCatatanMedis/Ri",
  //           JSON.stringify(res.data),
  //           ip,
  //           namauser,
  //           curpasRI.namaPasien,
  //           curpasRI.ruangDeskripsi,
  //           JSON.stringify(datatandavital)
  //         );
  //         Modal.warning({
  //           title: "Gagal Menyimpan Data!",
  //           content: JSON.stringify(res.data),
  //         });
  //         setloading(false);
  //       }
  //     })
  //     .catch((errors) => {
  //       setloading(false);

  //       message.error("Error Simpan Tanda Vital!");
  //     });
  // };

  const insertCPPTDr = async (datatandavital, datacatatanmedis) => {
    console.log(datatandavital.tandaVitalId);
    setloading(true);

    try {
      // Insert Tanda Vital data
      const ttvResponse = await axios.post(
        `${apiku}/EmrTandaVital/Ri`,
        datatandavital,
        options
      );

      if (ttvResponse.data.statusCode !== 200) {
        // Handle failure to insert Tanda Vital
        sendTele(
          "3",
          "/EmrTandaVital/Ri",
          JSON.stringify(ttvResponse.data),
          ip,
          namauser,
          curpasRI.namaPasien,
          curpasRI.ruangDeskripsi,
          JSON.stringify(datatandavital)
        );
        Modal.warning({
          title: "Gagal Menyimpan Data TTV!",
          content: JSON.stringify(ttvResponse.data),
        });
        setloading(false);
        return;
      }

      // Get last inserted Tanda Vital ID
      const lastTTVResponse = await axios.get(
        `${apiku}/EmrTandaVital/ReadTandaVitalLastId/${datacatatanmedis.registrasiId}`,
        options
      );

      if (lastTTVResponse.data.statusCode !== 200) {
        setloading(false);
        message.warning("Gagal Mengambil Data TTV!");
        return;
      }

      const lastIdTTV = lastTTVResponse.data.result.tandaVitalId;

      // Insert Catatan Medis with the last Tanda Vital ID
      const catatanMedisPayload = {
        ...datacatatanmedis,
        tandaVitalId: lastIdTTV, // Attach last TTV ID here
        hapus: false,
      };

      const catatanMedisResponse = await axios.post(
        `${apiku}/EmrCatatanMedis/Ri`,
        catatanMedisPayload,
        options
      );

      if (catatanMedisResponse.data.statusCode === 200) {
        getCPPT(datacatatanmedis.registrasiId);
        Modal.success({
          title: "Berhasil Simpan Data CPPT Pasien!",
        });
        settandaVitalId(0);
        setcatatanMedisId(0);
      } else {
        // Handle failure to insert Catatan Medis
        settandaVitalId(lastIdTTV);
        sendTele(
          "3",
          "/EmrCatatanMedis/Ri",
          JSON.stringify(catatanMedisResponse.data),
          ip,
          namauser,
          curpasRI.namaPasien,
          curpasRI.ruangDeskripsi,
          JSON.stringify(catatanMedisPayload)
        );
        Modal.warning({
          title: "Gagal Menyimpan Data Catatan Medis!",
          content: JSON.stringify(catatanMedisResponse.data),
        });
      }
    } catch (err) {
      message.error("Terjadi Kesalahan Saat Menyimpan Data!");
    } finally {
      setloading(false);
    }
  };

  const insertVerifDr = (datacatatanmedis) => {
    console.log(datacatatanmedis);
    axios
      .post(`${apiku}/EmrCatatanMedis/Ri`, datacatatanmedis, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getCPPT(datacatatanmedis.registrasiId);
          Modal.success({
            title: "Data Berhasil Diverifikasi!",
            // content: res.data.message,
          });
          setmodalEnrollNew(false);
        } else {
          sendTele(
            "3",
            "/EmrCatatanMedis/Ri",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(datacatatanmedis)
          );
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
          setmodalEnrollNew(false);
        }
      })
      .catch((errors) => {
        message.error("Error Catatan Medis!");
        setmodalEnrollNew(false);
      });
  };

  const deleteCPPT = (noreg, idCatatan, idTTv) => {
    console.log(noreg, idCatatan, idTTv);

    const deleteCatatanMedis = () => {
      return axios
        .delete(`${apiku}/EmrCatatanMedis/${idCatatan}`, options)
        .then((res) => {
          if (res.data.statusCode === 200) {
            getCPPT(noreg);
            Modal.success({
              title: "Data Berhasil Dihapus!!",
            });
          } else {
            message.warning("Gagal Menghapus Catatan Medis!");
          }
        })
        .catch((err) => {
          message.error("Error Hapus Catatan Medis!");
        });
    };

    const deleteTandaVital = () => {
      return axios
        .delete(`${apiku}/EmrTandaVital/${idTTv}`, options)
        .then((res) => {
          if (res.data.statusCode === 200) {
            return deleteCatatanMedis();
          } else {
            message.warning("Gagal Menghapus TTV!");
          }
        })
        .catch((err) => {
          message.error("Error Hapus TTV!");
        });
    };

    if (!idTTv) {
      deleteCatatanMedis();
    } else {
      deleteTandaVital();
    }
  };

  const KosongkanFormTTV = () => {
    settandaVitalId(0);
    setgcsMata(4);
    setgcsSuara(5);
    setgcsGerakan(6);
    settekananDarahSistolik("");
    settekananDarahDiastolik("");
    setsuhuTubuh("");
    setfrekuensiNadi("");
    setfrekuensiNafas("");
    setskorNyeri(1);
    setKatonTTV(false);
    setBacaTTV(false);
    setTglTTV(dayjs());
    settingkatKesadaranId("");
    settingkatKesadaran("");
    setiramaNadi("Teratur");
    setresikoJatuh(1);
    setsaturasiOksigen("");
    settinggiBadan("");
    setberatBadan("");

    //----catatan medis----//
    setcatatanMedisId(0);
    setsubjektif("");
    setobjektif("");
    setassesment("");
    setplanning("");
    setinstruksi("");
    setevaluasi("");
    setimplementasi("");
    setnamaProfesi("");
    setverified(false);
    setverifiedTime(null);
    setskalaNyeri(null);
    setcitasi(null);
    setcitNomer(0);
    setcitated(0);

    setCpptRi([]);
    setbuttonRiwayat(false);
    setbuttonVerifikasi(false);
  };

  return (
    <PerkembanganPasienRIContext.Provider
      value={{
        //tandavital//
        tandaVitalId,
        settandaVitalId,
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
        skorNyeri,
        setskorNyeri,
        katonTTV,
        setKatonTTV,
        bacaTTV,
        setBacaTTV,
        tglTTV,
        setTglTTV,
        ttvByNoreg,
        getTTVAll,
        grabikTTV,
        userTTV,
        setUserTTV,
        tingkatKesadaranId,
        settingkatKesadaranId,
        tingkatKesadaran,
        settingkatKesadaran,
        iramaNadi,
        setiramaNadi,
        resikoJatuh,
        setresikoJatuh,
        saturasiOksigen,
        setsaturasiOksigen,
        tinggiBadan,
        settinggiBadan,
        beratBadan,
        setberatBadan,
        KosongkanFormTTV,
        pegawaiId,
        setPegawaiId,

        //catatan medis//
        catatanMedisId,
        setcatatanMedisId,
        subjektif,
        setsubjektif,
        objektif,
        setobjektif,
        assesment,
        setassesment,
        planning,
        setplanning,
        instruksi,
        setinstruksi,
        evaluasi,
        setevaluasi,
        implementasi,
        setimplementasi,
        temuanDx,
        settemuanDx,
        namaProfesi,
        setnamaProfesi,
        verified,
        setverified,
        verifiedTime,
        setverifiedTime,
        skalaNyeri,
        setskalaNyeri,
        citasi,
        setcitasi,
        citNomer,
        setcitNomer,
        citated,
        setcitated,
        buttonRiwayat,
        setbuttonRiwayat,
        buttonVerifikasi,
        setbuttonVerifikasi,
        verifPilih,
        setverifPilih,
        waktuenrol,
        setwaktuenroll,
        modalEnrollNew,
        setmodalEnrollNew,

        getCPPT,
        cpptRi,
        setCpptRi,
        insertCPPTDr,
        deleteCPPT,
        insertVerifDr,
        loading,
        setloading,
        getTglLibur,
        settglLibur,
        tglLibur,
      }}
    >
      {props.children}
    </PerkembanganPasienRIContext.Provider>
  );
};

export default PerkembanganPasienRIContextProvider;
