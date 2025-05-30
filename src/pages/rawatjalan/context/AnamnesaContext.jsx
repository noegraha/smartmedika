import React, { createContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";

export const AnamnesaContext = createContext();

const AnamnesaContextProvider = (props) => {
  const [tandaVitalIdRj, settandaVitalIdRj] = useState(0);
  const [anamnesa, setAnamnesa] = useState([]);
  const [sistolik, setSistolik] = useState([]);
  const [diastolik, setDiastolik] = useState([]);
  const [nadi, setNadi] = useState([]);
  const [suhu, setSuhu] = useState([]);
  const [berat, setBerat] = useState([]);
  const [tinggi, setTinggi] = useState([]);
  const [saturasi, setSaturasi] = useState([]);
  const [iramanadi, setIramaNadi] = useState([]);
  const [nafas, setNafas] = useState([]);
  const [resikojatuh, setResikoJatuh] = useState(1);
  const [skornyeri, setSkorNyeri] = useState(1);
  const [gcsMata, setgcsMata] = useState([]);
  const [gcsSuara, setgcsSuara] = useState([]);
  const [gcsGerakan, setgcsGerakan] = useState([]);

  const [loadingTTV, setLoadingTTV] = useState(false);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertTandavital = (datatandavital) => {
    axios
      .post(`${apiku}/EmrTandaVital`, datatandavital, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          detailTV(datatandavital.registrasiId);
          message.success("Berhasil Disimpan Tanda Vital!");
          setLoadingTTV(false);
        } else {
          // message.error("Gagal Disimpan!");
          // console.log(res.data.result);
          // message.warning(res.data.message);
          Modal.warning({ title: "Gagal Disimpan", content: res.data.message });
          setLoadingTTV(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Disimpan!");
        console.log(err);
        setLoadingTTV(false);
      });
  };

  const detailTV = (id) => {
    setLoadingTTV(true);
    axios
      .get(`${apiku}/EmrTandaVital/ReadTandaVitalLastId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setAnamnesa(res.data.result);
          settandaVitalIdRj(res.data.result.tandaVitalId);
          setSistolik(res.data.result.tekananDarahSistolik);
          setDiastolik(res.data.result.tekananDarahDiastolik);
          setNadi(res.data.result.frekuensiNadi);
          setSuhu(res.data.result.suhuTubuh);
          setBerat(res.data.result.beratBadan);
          setTinggi(res.data.result.tinggiBadan);
          setSaturasi(res.data.result.saturasiOksigen);
          setIramaNadi(res.data.result.iramaNadi);
          setNafas(res.data.result.frekuensiNafas);
          setResikoJatuh(res.data.result.resikoJatuh);
          setSkorNyeri(res.data.result.skorNyeri);
          setLoadingTTV(false);
        } else {
          settandaVitalIdRj(0);
          setSistolik(null);
          setDiastolik(null);
          setNadi(null);
          setSuhu(null);
          setBerat(null);
          setTinggi(null);
          setSaturasi(null);
          setIramaNadi("Teratur");
          setNafas(null);
          setResikoJatuh(1);
          setSkorNyeri(1);
          message.warning("Tanda Vital Masih Kosong !");
          setLoadingTTV(false);
        }
      })
      .catch((err) => {
        settandaVitalIdRj(0);
        // console.log(err);
        setSistolik(null);
        setDiastolik(null);
        setNadi(null);
        setSuhu(null);
        setBerat(null);
        setTinggi(null);
        setSaturasi(null);
        setIramaNadi("Teratur");
        setNafas(null);
        setResikoJatuh(1);
        setSkorNyeri(1);
        message.warning("Gagal Mengambil Tanda Vital");
        setLoadingTTV(false);
      });
  };

  const detailTandavitalRI = (id) => {
    axios
      .get(`${apiku}/EmrTandaVital/Read/${id}`, options)
      .then((res) => {
        setAnamnesa(res.data.result);
        // settandaVitalIdRj(res.data.result)
        setSistolik(res.data.result.tekananDarahSistolik);
        setDiastolik(res.data.result.tekananDarahDiastolik);
        setNadi(res.data.result.frekuensiNadi);
        setSuhu(res.data.result.suhuTubuh);
        setBerat(res.data.result.beratBadan);
        setTinggi(res.data.result.tinggiBadan);
        setSaturasi(res.data.result.saturasiOksigen);
        setIramaNadi(res.data.result.iramaNadi);
        setNafas(res.data.result.frekuensiNafas);
        setResikoJatuh(res.data.result.resikoJatuh);
        setSkorNyeri(res.data.result.skorNyeri);
        setgcsMata(res.data.result.gcsMata);
        setgcsSuara(res.data.result.gcsSuara);
        setgcsGerakan(res.data.result.gcsGerakan);
      })
      .catch((err) => {
        // console.log(err);
        setSistolik("");
        setDiastolik("[]");
        setNadi("");
        setSuhu("");
        setBerat("");
        setTinggi("");
        setSaturasi("");
        setIramaNadi("");
        setNafas("");
        setResikoJatuh("");
        setSkorNyeri("");
        setgcsMata("");
        setgcsSuara("");
        setgcsGerakan("");
        message.warning("Tanda Vital Belum Ada!");
      });
  };

  const detailTandavitalKosong = () => {
    //setAnamnesa(res.data.result);
    setSistolik("");
    setDiastolik("");
    setNadi("");
    setSuhu("");
    setBerat("");
    setTinggi("");
    setSaturasi("");
    setIramaNadi("");
    setNafas("");
    setResikoJatuh(1);
    setSkorNyeri("");
    setgcsMata(4);
    setgcsGerakan(6);
    setgcsSuara(5);
    console.log("asuasuasua");
  };

  return (
    <AnamnesaContext.Provider
      value={{
        anamnesa,
        sistolik,
        diastolik,
        suhu,
        nadi,
        tinggi,
        berat,
        saturasi,
        iramanadi,
        nafas,
        skornyeri,
        resikojatuh,
        setSistolik,
        setDiastolik,
        setNadi,
        setSuhu,
        setTinggi,
        setBerat,
        setSaturasi,
        setIramaNadi,
        setNafas,
        setSkorNyeri,
        setResikoJatuh,
        insertTandavital,
        detailTV,
        setgcsGerakan,
        gcsGerakan,
        setgcsMata,
        gcsMata,
        setgcsSuara,
        gcsSuara,
        detailTandavitalRI,
        detailTandavitalKosong,
        tandaVitalIdRj,
        settandaVitalIdRj,
        loadingTTV,
        setLoadingTTV,
      }}
    >
      {props.children}
    </AnamnesaContext.Provider>
  );
};

export default AnamnesaContextProvider;
