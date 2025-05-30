import React, { createContext, useState, useContext, useEffect } from "react";
import { message, Modal } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { LoginContext } from "../../rawatjalan/context";

export const EwsRIContext = createContext();

const EwsRIContextProvider = (props) => {
  const { sendTele } = useContext(LoginContext);
  const [visibleEWSBerkala, setvisibleEWSBerkala] = useState(false);
  const [visibleEWSBerkalaEdit, setvisibleEWSBerkalaEdit] = useState(false);
  const [tglews, setTglews] = useState(dayjs());
  const [ewsRespirasi, setewsRespirasi] = useState("");
  const [ewsSatursiOksigen, setewsSatursiOksigen] = useState("");
  const [ewsSuplemenOksigen, setewsSuplemenOksigen] = useState("");
  const [ewsSuhu, setewsSuhu] = useState("");
  const [ewsSistolik, setewsSistolik] = useState("");
  const [ewsJantung, setewsJantung] = useState("");
  const [ewsKesadaran, setewsKesadaran] = useState("");
  const [ewsByredAll, setEWSByRegAll] = useState("");
  const [userEWS, setuserEWS] = useState("");
  const [grafikEWS, setGravikEWS] = useState([]);
  const [visibleEws, setvisibleEws] = useState(false);

  const [meowsId, setMeowsId] = useState(0);
  const [meowsRespirasi, setmeowsRespirasi] = useState("");
  const [meowsSatursiOksigen, setmeowsSatursiOksigen] = useState("");
  const [meowsSuplemenOksigen, setmeowsSuplemenOksigen] = useState("");
  const [meowsSuhu, setmeowsSuhu] = useState("");
  const [meowsSistolik, setmeowsSistolik] = useState("");
  const [meowsJantung, setmeowsJantung] = useState("");
  const [meowsKesadaran, setmeowsKesadaran] = useState("");
  const [meowsProteinUrine, setmeowsProteinUrine] = useState("");
  const [meowsProduksiUrine, setmeowsProduksiUrine] = useState("");
  const [meowsLochea, setmeowsLochea] = useState("");
  const [meowsCairan, setmeowsCairan] = useState("");
  const [meowsTandaInfeksi, setmeowsTandaInfeksi] = useState("");
  const [visibleMeows, setvisibleMeows] = useState(false);

  const [skorDownId, setskorDownId] = useState(0);
  const [skordownNafas, setskordownNafas] = useState("");
  const [skordownRetraksi, setskordownRetraksi] = useState("");
  const [skordownSianosis, setskordownSianosis] = useState("");
  const [skordownAirEntry, setskordownAirEntry] = useState("");
  const [skordownMerintih, setskordownMerintih] = useState("");
  const [visibleSkorDown, setvisibleSkorDown] = useState(false);

  const [pewsId, setpewsId] = useState(0);
  const [pewsRespirasi, setpewsRespirasi] = useState("");
  const [pewsSatursiOksigen, setpewsSatursiOksigen] = useState("");
  const [pewsSuplemenOksigen, setpewsSuplemenOksigen] = useState("");
  const [pewsSuhu, setpewsSuhu] = useState("");
  const [pewsSistolik, setpewsSistolik] = useState("");
  const [pewsJantung, setpewsJantung] = useState("");
  const [pewsKesadaran, setpewsKesadaran] = useState("");

  const [newsId, setnewsId] = useState(0);
  const [newssRespirasi, setnewssRespirasi] = useState("");
  const [newssSuhu, setnewssSuhu] = useState("");
  const [newssSistolik, setnewssSistolik] = useState("");
  const [newssNadi, setnewssNadi] = useState("");
  const [newssAvpu, setnewssAvpu] = useState("");
  const [modalpews, setmodalpews] = useState(false);
  const [modalnws, setmodalnews] = useState(false);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getGrafikEWS = (noreg) => {
    axios
      .get(`${apiku}/Ews/GetStatistikEws/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setGravikEWS(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setGravikEWS([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getEwsAll = (noreg) => {
    axios
      .get(`${apiku}/Ews/GetByRegistrasiId/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result[0] === undefined ||
            res.data.result[0].length === 0
          ) {
            setEWSByRegAll("");
          } else {
            setEWSByRegAll(res.data.result);
          }
        } else {
          setEWSByRegAll("");
        }
      })
      .catch((err) => {
        setEWSByRegAll("");
      });
  };

  const getEwsByRegDate = (noreg, date) => {
    axios
      .get(`${apiku}/Ews/GetByDate/${noreg}/${date}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("data ews per kategori");
          setTglews(dayjs(res.data.result.tanggal));
          setewsRespirasi(
            res.data.result.detail[0].hasil +
              "-" +
              res.data.result.detail[0].value
          );
          setewsSatursiOksigen(
            res.data.result.detail[1].hasil +
              "-" +
              res.data.result.detail[1].value
          );
          setewsSuplemenOksigen(
            res.data.result.detail[2].hasil +
              "-" +
              res.data.result.detail[2].value
          );
          setewsSuhu(
            res.data.result.detail[3].hasil +
              "-" +
              res.data.result.detail[3].value
          );
          setewsSistolik(
            res.data.result.detail[4].hasil +
              "-" +
              res.data.result.detail[4].value
          );
          setewsJantung(
            res.data.result.detail[5].hasil +
              "-" +
              res.data.result.detail[5].value
          );
          setewsKesadaran(
            res.data.result.detail[6].hasil +
              "-" +
              res.data.result.detail[6].value
          );
          setuserEWS(res.data.result.userId);
          setvisibleEWSBerkala(true);
          setvisibleEWSBerkalaEdit(true);
        } else {
          console.log("data tidak ada 200");
          setTglews(dayjs());
          setewsRespirasi("");
          setewsSatursiOksigen("");
          setewsSuplemenOksigen("");
          setewsSuhu("");
          setewsSistolik("");
          setewsJantung("");
          setewsKesadaran("");
        }
      })
      .catch((err) => {
        message.error("Error Saat Simpan");
      });
  };

  const insertEWS = (dataEWS) => {
    axios
      .post(`${apiku}/Ews/Create`, dataEWS)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan EWS!");
          setvisibleEws(false);
        } else {
          // console.log('tidak dapat menyimpan');
          message.error("Gagal Disimpan EWS!");
        }
      })
      .catch((errors) => {
        // console.log(errors);
        message.error("Error!");
      });
  };

  const deleteEwsbydate = (registrasiId, date) => {
    axios
      .delete(`${apiku}/Ews/Delete/${registrasiId}/${date}`, options)
      .then((res) => {
        getEwsAll(registrasiId);
        getGrafikEWS(registrasiId);
        setTglews(dayjs());
        setewsRespirasi("");
        setewsSatursiOksigen("");
        setewsSuplemenOksigen("");
        setewsSuhu("");
        setewsSistolik("");
        setewsJantung("");
        setewsKesadaran("");
        setvisibleEWSBerkala(false);
        message.success("Berhasil Dihapus!");
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
      });
  };

  const insertMEOWS = (dataMeows) => {
    axios
      .post(`${apiku}/PantauanMeows/Create`, dataMeows)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan MEOWS!");
          setvisibleMeows(false);
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal Disimpan MEOWS!");
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const insertSkorDown = (dataSkorDown) => {
    axios
      .post(`${apiku}/PantauanScoreDown/Create`, dataSkorDown)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan Skor Down!");
          setvisibleSkorDown(false);
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal Disimpan Skor Down!");
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const getAssSkorDowntgl = (noreg, tgl) => {
    axios
      .get(` ${apiku}/PantauanScoreDown/Read/${noreg}/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setskorDownId(res.data.result.Id);
          setskordownNafas(res.data.result.FrekuensiNafas);
          setskordownRetraksi(res.data.result.Retraksi);
          setskordownSianosis(res.data.result.Sianosis);
          setskordownAirEntry(res.data.result.AirEntry);
          setskordownMerintih(res.data.result.Merintih);
        } else {
          setskorDownId(0);
          setskordownNafas("");
          setskordownRetraksi("");
          setskordownSianosis("");
          setskordownAirEntry("");
          setskordownMerintih("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const insertSkorDownnew = (dataSkorDown) => {
    axios
      .post(`${apiku}/PantauanScoreDown/CreateNew`, dataSkorDown)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan Skor Down!");
          setvisibleSkorDown(false);
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal Disimpan Skor Down!");
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };
  const insertPews = (datapews) => {
    axios
      .post(` ${apiku}/EmrPengkajian/Pews`, datapews, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getpewsAwal(datapews.registrasiId);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
          setmodalpews(false);
        } else {
          // console.log("tidak dapat menyimpan");
          message.error("Gagal Disimpan pews!");
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const getpewsAwal = (noreg) => {
    // setSpin(true);
    axios
      .get(`${apiku}/EmrPengkajian/LookupPews/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const datapewsawal = res.data.result.find(
            (item) => item.flagAssesment.trim() === "AWAL"
          );
          console.log(datapewsawal);
          setpewsId(datapewsawal.pengkajianPewsId);
          setpewsRespirasi(datapewsawal.respiratori);
          setpewsSatursiOksigen(datapewsawal.saturasiOksigen);
          setpewsSuplemenOksigen(datapewsawal.alatBantuNafas);
          setpewsSuhu(datapewsawal.suhu);
          setpewsSistolik(datapewsawal.tdSistolik);
          setpewsJantung(datapewsawal.nadi);
          setpewsKesadaran(datapewsawal.tingkatKesadaran);
        } else {
          setpewsId(0);
          setpewsRespirasi("");
          setpewsSatursiOksigen("");
          setpewsSuplemenOksigen("");
          setpewsSuhu("");
          setpewsSistolik("");
          setpewsJantung("");
          setpewsKesadaran("");
        }
      })
      .catch((err) => {
        setpewsId(0);
        setpewsRespirasi("");
        setpewsSatursiOksigen("");
        setpewsSuplemenOksigen("");
        setpewsSuhu("");
        setpewsSistolik("");
        setpewsJantung("");
        setpewsKesadaran("");
      });
  };
  const insertNews = (dataNews) => {
    axios
      .post(` ${apiku}/EmrPengkajian/News`, dataNews, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getNewsAwal(dataNews.registrasiId);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
          setmodalpews(false);
        } else {
          // console.log("tidak dapat menyimpan");
          message.error("Gagal Disimpan pews!");
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("Error!");
      });
  };

  const getNewsAwal = (noreg) => {
    // setSpin(true);
    axios
      .get(`${apiku}/EmrPengkajian/LookupNews/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const dataNewsawal = res.data.result.find(
            (item) => item.flagAssesment.trim() === "AWAL"
          );
          console.log(dataNewsawal);
          setnewsId(dataNewsawal.pengkajianNewsId);
          setnewssRespirasi(dataNewsawal.respiratori);
          setnewssSuhu(dataNewsawal.suhu);
          setnewssSistolik(dataNewsawal.tekananDarah);
          setnewssNadi(dataNewsawal.nadi);
          setnewssAvpu(dataNewsawal.avpu);
        } else {
          setnewsId(0);
          setnewssRespirasi("");
          setnewssSuhu("");
          setnewssSistolik("");
          setnewssNadi("");
          setnewssAvpu("");
        }
      })
      .catch((err) => {
        setnewsId(0);
        setnewssRespirasi("");
        setnewssSuhu("");
        setnewssSistolik("");
        setnewssNadi("");
        setnewssAvpu("");
      });
  };
  const kosongkanFormEWS = () => {
    setTglews(dayjs());
    setewsRespirasi("");
    setewsSatursiOksigen("");
    setewsSuplemenOksigen("");
    setewsSuhu("");
    setewsSistolik("");
    setewsJantung("");
    setewsKesadaran("");
    setEWSByRegAll("");
    setuserEWS("");

    setMeowsId(0);
    setmeowsRespirasi("");
    setmeowsSatursiOksigen("");
    setmeowsSuplemenOksigen("");
    setmeowsSuhu("");
    setmeowsSistolik("");
    setmeowsJantung("");
    setmeowsKesadaran("");
    setmeowsProteinUrine("");
    setmeowsProduksiUrine("");
    setmeowsLochea("");
    setmeowsCairan("");
    setmeowsTandaInfeksi("");

    setskorDownId(0);
    setskordownNafas("");
    setskordownRetraksi("");
    setskordownSianosis("");
    setskordownAirEntry("");
    setskordownMerintih("");
  };

  return (
    <EwsRIContext.Provider
      value={{
        visibleEWSBerkala,
        setvisibleEWSBerkala,
        tglews,
        setTglews,
        ewsRespirasi,
        setewsRespirasi,
        ewsSatursiOksigen,
        setewsSatursiOksigen,
        ewsSuplemenOksigen,
        setewsSuplemenOksigen,
        ewsSuhu,
        setewsSuhu,
        ewsSistolik,
        setewsSistolik,
        ewsJantung,
        setewsJantung,
        ewsKesadaran,
        setewsKesadaran,
        ewsByredAll,
        setEWSByRegAll,
        insertEWS,
        getEwsAll,
        getEwsByRegDate,
        deleteEwsbydate,
        userEWS,
        setuserEWS,
        grafikEWS,
        getGrafikEWS,
        visibleEWSBerkalaEdit,
        setvisibleEWSBerkalaEdit,

        meowsId,
        setMeowsId,
        meowsRespirasi,
        setmeowsRespirasi,
        meowsSatursiOksigen,
        setmeowsSatursiOksigen,
        meowsSuplemenOksigen,
        setmeowsSuplemenOksigen,
        meowsSuhu,
        setmeowsSuhu,
        meowsSistolik,
        setmeowsSistolik,
        meowsJantung,
        setmeowsJantung,
        meowsKesadaran,
        setmeowsKesadaran,
        meowsProteinUrine,
        setmeowsProteinUrine,
        meowsProduksiUrine,
        setmeowsProduksiUrine,
        meowsLochea,
        setmeowsLochea,
        meowsCairan,
        setmeowsCairan,
        meowsTandaInfeksi,
        setmeowsTandaInfeksi,
        visibleMeows,
        setvisibleMeows,
        skorDownId,
        setskorDownId,
        skordownNafas,
        setskordownNafas,
        skordownRetraksi,
        setskordownRetraksi,
        skordownSianosis,
        setskordownSianosis,
        skordownAirEntry,
        setskordownAirEntry,
        skordownMerintih,
        setskordownMerintih,
        visibleSkorDown,
        setvisibleSkorDown,
        visibleEws,
        setvisibleEws,
        insertMEOWS,
        insertSkorDown,
        insertSkorDownnew,
        getAssSkorDowntgl,
        kosongkanFormEWS,
        pewsId,
        setpewsId,
        pewsRespirasi,
        setpewsRespirasi,
        pewsSatursiOksigen,
        setpewsSatursiOksigen,
        pewsSuplemenOksigen,
        setpewsSuplemenOksigen,
        pewsSuhu,
        setpewsSuhu,
        pewsSistolik,
        setpewsSistolik,
        pewsJantung,
        setpewsJantung,
        pewsKesadaran,
        setpewsKesadaran,
        getpewsAwal,
        insertPews,

        newsId,
        setnewsId,
        newssRespirasi,
        setnewssRespirasi,
        newssSuhu,
        setnewssSuhu,
        newssSistolik,
        setnewssSistolik,
        newssNadi,
        setnewssNadi,
        newssAvpu,
        setnewssAvpu,
        modalpews,
        setmodalpews,
        modalnws,
        setmodalnews,
        getNewsAwal,
        insertNews,
      }}
    >
      {props.children}
    </EwsRIContext.Provider>
  );
};

export default EwsRIContextProvider;
