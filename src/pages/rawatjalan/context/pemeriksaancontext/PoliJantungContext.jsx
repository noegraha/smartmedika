import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { PasienContext } from "../PasienContext";

export const PoliJantungContext = createContext();

const PoliJantungContextProvider = (props) => {
  const { curpas } = useContext(PasienContext);

  // Ekokardiografi
  const [jenisEko, setJenisEko] = useState(null);
  const [irama, setIrama] = useState(null);
  const [hr, setHr] = useState(null);
  const [aksis, setAksis] = useState(null);
  const [lainya, setLainya] = useState(null);
  const [dxKlinis, setDxKlinis] = useState(null);
  const [dimensiRuangJantung, setDimensiRuangJantung] = useState(null);
  const [fungsiSistolikGlobal, setFungsiSistolikGlobal] = useState(null);
  const [ef, setEf] = useState(null);
  const [kinetik, setKinetik] = useState(null);
  const [iaSdanIVS, setIaSdanIVS] = useState(null);
  const [fungsiDiastolikLV, setFungsiDiastolikLV] = useState(null);
  const [fungsiSistolikRV, setFungsiSistolikRV] = useState(null);
  const [katupKatup, setKatupKatup] = useState(null);
  const [lainLain, setLainLain] = useState(null);
  const [situs, setSitus] = useState(null);
  const [avva, setAvva] = useState(null);
  const [muaravv, setMuaravv] = useState(null);
  const [kontraktilitasMiokard, setKontraktilitasMiokard] = useState(null);
  const [ias, setIas] = useState(null);
  const [ivs, setIvs] = useState(null);
  const [arcusAorta, setArcusAorta] = useState(null);
  const [pda, setPda] = useState(null);
  const [coA, setCoA] = useState(null);
  const [simpulan, setSimpulan] = useState(null);
  // Treadmill
  const [responsIskemik, setresponsIskemik] = useState(null);
  const [dts, setdts] = useState(null);
  const [responsHemodinamik, setresponsHemodinamik] = useState(null);
  const [kronotropikKompetensi, setkronotropikKompetensi] = useState(null);
  const [kelasKebugaran, setkelasKebugaran] = useState(null);
  const [aritmia, setaritmia] = useState(null);
  // Holter
  const [iramaDasar, setiramaDasar] = useState(null);
  const [sinusPause, setsinusPause] = useState(null);
  const [konduksiAV, setkonduksiAV] = useState(null);
  const [apc, setapc] = useState(null);
  const [vpc, setvpc] = useState(null);
  const [perubahanSegmen, setperubahanSegmen] = useState(null);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailEkokardiografi = (id) => {
    axios
      .get(`${apiku}/EmrPemeriksaanKhusus/Ekokardiografi/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setJenisEko(res.data.result.jenisEko);
          setIrama(res.data.result.irama);
          setHr(res.data.result.hr);
          setAksis(res.data.result.aksis);
          setLainya(res.data.result.lainya);
          setDxKlinis(res.data.result.dxKlinis);
          setDimensiRuangJantung(res.data.result.dimensiRuangJantung);
          setFungsiSistolikGlobal(res.data.result.fungsiSistolikGlobal);
          setEf(res.data.result.ef);
          setKinetik(res.data.result.kinetik);
          setIaSdanIVS(res.data.result.iaSdanIVS);
          setFungsiDiastolikLV(res.data.result.fungsiDiastolikLV);
          setFungsiSistolikRV(res.data.result.fungsiSistolikRV);
          setKatupKatup(res.data.result.katupKatup);
          setLainLain(res.data.result.lainLain);
          setSitus(res.data.result.situs);
          setAvva(res.data.result.avva);
          setMuaravv(res.data.result.muaravv);
          setKontraktilitasMiokard(res.data.result.kontraktilitasMiokard);
          setIas(res.data.result.ias);
          setIvs(res.data.result.ivs);
          setArcusAorta(res.data.result.arcusAorta);
          setPda(res.data.result.pda);
          setCoA(res.data.result.coA);
          setSimpulan(res.data.result.simpulan);
        } else {
          if (parseInt(curpas.umur) > 13) {
            setJenisEko("Dewasa");
          } else {
            setJenisEko("Anak");
          }
          setIrama(null);
          setHr(null);
          setAksis(null);
          setLainya(null);
          setDxKlinis(null);
          setDimensiRuangJantung(null);
          setFungsiSistolikGlobal(null);
          setEf(null);
          setKinetik(null);
          setIaSdanIVS(null);
          setFungsiDiastolikLV(null);
          setFungsiSistolikRV(null);
          setKatupKatup(null);
          setLainLain(null);
          setSitus(null);
          setAvva(null);
          setMuaravv(null);
          setKontraktilitasMiokard(null);
          setIas(null);
          setIvs(null);
          setArcusAorta(null);
          setPda(null);
          setCoA(null);
          setSimpulan(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setJenisEko(null);
        setIrama(null);
        setHr(null);
        setAksis(null);
        setLainya(null);
        setDxKlinis(null);
        setDimensiRuangJantung(null);
        setFungsiSistolikGlobal(null);
        setEf(null);
        setKinetik(null);
        setIaSdanIVS(null);
        setFungsiDiastolikLV(null);
        setFungsiSistolikRV(null);
        setKatupKatup(null);
        setLainLain(null);
        setSitus(null);
        setAvva(null);
        setMuaravv(null);
        setKontraktilitasMiokard(null);
        setIas(null);
        setIvs(null);
        setArcusAorta(null);
        setPda(null);
        setCoA(null);
        setSimpulan(null);
      });
  };

  const insertEkokardiografi = (datajantung) => {
    axios
      .post(`${apiku}/EmrPemeriksaanKhusus/Ekokardiografi`, datajantung, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil disimpan!");
        } else {
          console.log(res.data.result);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  const detailTreadmill = (id) => {
    axios
      .get(`${apiku}/EmrPemeriksaanKhusus/EkoTreadmillRead/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setresponsIskemik(res.data.result.responsIskemik);
          setdts(res.data.result.dts);
          setresponsHemodinamik(res.data.result.responsHemodinamik);
          setkronotropikKompetensi(res.data.result.kronotropikKompetensi);
          setkelasKebugaran(res.data.result.kelasKebugaran);
          setaritmia(res.data.result.aritmia);
        } else {
          setresponsIskemik(null);
          setdts(null);
          setresponsHemodinamik(null);
          setkronotropikKompetensi(null);
          setkelasKebugaran(null);
          setaritmia(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setresponsIskemik(null);
        setdts(null);
        setresponsHemodinamik(null);
        setkronotropikKompetensi(null);
        setkelasKebugaran(null);
        setaritmia(null);
      });
  };

  const insertTreadmill = (datatreadmill) => {
    axios
      .post(`${apiku}/EmrPemeriksaanKhusus/EkoTreadmill`, datatreadmill, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil disimpan!");
        } else {
          console.log(res.data.result);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  const detailHolter = (id) => {
    axios
      .get(
        `${apiku}/EmrPemeriksaanKhusus/EkoHolterMonitoringRead/${id}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setiramaDasar(res.data.result.iramaDasar);
          setsinusPause(res.data.result.sinusPause);
          setkonduksiAV(res.data.result.konduksiAV);
          setapc(res.data.result.apc);
          setvpc(res.data.result.vpc);
          setperubahanSegmen(res.data.result.perubahanSegmen);
        } else {
          setiramaDasar(null);
          setsinusPause(null);
          setkonduksiAV(null);
          setapc(null);
          setvpc(null);
          setperubahanSegmen(null);
        }
      })
      .catch((err) => {
        console.log(err);
        setiramaDasar(null);
        setsinusPause(null);
        setkonduksiAV(null);
        setapc(null);
        setvpc(null);
        setperubahanSegmen(null);
      });
  };

  const insertHolter = (dataholter) => {
    axios
      .post(`${apiku}/EmrPemeriksaanKhusus/EkoHolterMonitoring`, dataholter, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil disimpan!");
        } else {
          console.log(res.data.result);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  return (
    <PoliJantungContext.Provider
      value={{
        detailEkokardiografi,
        detailTreadmill,
        detailHolter,
        insertEkokardiografi,
        insertTreadmill,
        insertHolter,
        jenisEko,
        setJenisEko,
        irama,
        setIrama,
        hr,
        setHr,
        aksis,
        setAksis,
        lainya,
        setLainya,
        dxKlinis,
        setDxKlinis,
        dimensiRuangJantung,
        setDimensiRuangJantung,
        fungsiSistolikGlobal,
        setFungsiSistolikGlobal,
        ef,
        setEf,
        kinetik,
        setKinetik,
        iaSdanIVS,
        setIaSdanIVS,
        fungsiDiastolikLV,
        setFungsiDiastolikLV,
        fungsiSistolikRV,
        setFungsiSistolikRV,
        katupKatup,
        setKatupKatup,
        lainLain,
        setLainLain,
        situs,
        setSitus,
        avva,
        setAvva,
        muaravv,
        setMuaravv,
        kontraktilitasMiokard,
        setKontraktilitasMiokard,
        ias,
        setIas,
        ivs,
        setIvs,
        arcusAorta,
        setArcusAorta,
        pda,
        setPda,
        coA,
        setCoA,
        simpulan,
        setSimpulan,
        responsIskemik,
        setresponsIskemik,
        dts,
        setdts,
        responsHemodinamik,
        setresponsHemodinamik,
        kronotropikKompetensi,
        setkronotropikKompetensi,
        kelasKebugaran,
        setkelasKebugaran,
        aritmia,
        setaritmia,
        iramaDasar,
        setiramaDasar,
        sinusPause,
        setsinusPause,
        konduksiAV,
        setkonduksiAV,
        apc,
        setapc,
        vpc,
        setvpc,
        perubahanSegmen,
        setperubahanSegmen,
      }}
    >
      {props.children}
    </PoliJantungContext.Provider>
  );
};

export default PoliJantungContextProvider;
