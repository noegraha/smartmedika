import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import { message } from "antd";
import dayjs from "dayjs";

export const PengkajianDepresiContext = createContext();

const PengkajianDepresiContextProvider = (props) => {
  const [pengkajianId, setPengkajianId] = useState(0);
  const [tanggal, setTanggal] = useState(dayjs());
  const [perasaanSedih, setPerasaanSedih] = useState("");
  const [perasaanBersalah, setPerasaanBersalah] = useState("");
  const [bunuhDiri, setBunuhDiri] = useState("");
  const [insomniaEarly, setInsomniaEarly] = useState("");
  const [insomniaMiddle, setInsomniaMiddle] = useState("");
  const [insomniaLate, setInsomniaLate] = useState("");
  const [kerjaKegiatan, setKerjaKegiatan] = useState("");
  const [ratardasi, setRatardasi] = useState("");
  const [agitasi, setAgitasi] = useState("");
  const [anxietasPsikis, setAnxietasPsikis] = useState("");
  const [anxietasSomatic, setAnxietasSomatic] = useState("");
  const [gejalaSomatic, setGejalaSomatic] = useState("");
  const [gejalaSoamticUmum, setGejalaSoamticUmum] = useState("");
  const [gejalaGenital, setGejalaGenital] = useState("");
  const [hipokondriasis, setHipokondriasis] = useState("");
  const [kehilanganBbPilihan, setKehilanganBbPilihan] = useState("");
  const [kehilanganBb, setKehilanganBb] = useState("");
  const [tilikan, setTilikan] = useState("");
  const [variasiDiurnal, setVariasiDiurnal] = useState("");
  const [depersonalisasi, setDepersonalisasi] = useState("");
  const [gejalaParanoid, setGejalaParanoid] = useState("");
  const [gejalaObsesif, setGejalaObsesif] = useState("");
  const [ketidakberdayaan, setKetidakberdayaan] = useState("");
  const [keputusasaan, setKeputusasaan] = useState("");
  const [tidakBerharga, setTidakBerharga] = useState("");

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getObjekDokter = (regId, profesi) => {
    axios
      .get(
        `${apiku}/EmrCatatanMedis/LookupCatatanMedisRI/${regId}/${profesi}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result.Objektif);
        } else {
        }
      })
      .catch((err) => {
        message.error("Error Mengambil Kepulangan Pasien!");
      });
  };

  return (
    <PengkajianDepresiContext.Provider
      value={{
        pengkajianId,
        setPengkajianId,
        tanggal,
        setTanggal,
        perasaanSedih,
        setPerasaanSedih,
        perasaanBersalah,
        setPerasaanBersalah,
        bunuhDiri,
        setBunuhDiri,
        insomniaEarly,
        setInsomniaEarly,
        insomniaMiddle,
        setInsomniaMiddle,
        insomniaLate,
        setInsomniaLate,
        kerjaKegiatan,
        setKerjaKegiatan,
        ratardasi,
        setRatardasi,
        agitasi,
        setAgitasi,
        anxietasPsikis,
        setAnxietasPsikis,
        anxietasSomatic,
        setAnxietasSomatic,
        gejalaSomatic,
        setGejalaSomatic,
        gejalaSoamticUmum,
        setGejalaSoamticUmum,
        gejalaGenital,
        setGejalaGenital,
        hipokondriasis,
        setHipokondriasis,
        kehilanganBbPilihan,
        setKehilanganBbPilihan,
        kehilanganBb,
        setKehilanganBb,
        tilikan,
        setTilikan,
        variasiDiurnal,
        setVariasiDiurnal,
        depersonalisasi,
        setDepersonalisasi,
        gejalaParanoid,
        setGejalaParanoid,
        gejalaObsesif,
        setGejalaObsesif,
        ketidakberdayaan,
        setKetidakberdayaan,
        keputusasaan,
        setKeputusasaan,
        tidakBerharga,
        setTidakBerharga,
      }}
    >
      {props.children}
    </PengkajianDepresiContext.Provider>
  );
};

export default PengkajianDepresiContextProvider;
