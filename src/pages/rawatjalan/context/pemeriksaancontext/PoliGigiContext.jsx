import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const PoliGigiContext = createContext();

const PoliGigiContextProvider = (props) => {
  const [gigi, setGigi] = useState([]);
  //GIGI UMUM
  const [elemen, setElemen] = useState(["Elemen "]);
  const [diagnosa, setDiagnosa] = useState("");
  const [terapi, setTerapi] = useState("");
  const [g11, setG11] = useState(false);
  const [g12, setG12] = useState(false);
  const [g13, setG13] = useState(false);
  const [g14, setG14] = useState(false);
  const [g15, setG15] = useState(false);
  const [g16, setG16] = useState(false);
  const [g17, setG17] = useState(false);
  const [g18, setG18] = useState(false);
  const [g21, setG21] = useState(false);
  const [g22, setG22] = useState(false);
  const [g23, setG23] = useState(false);
  const [g24, setG24] = useState(false);
  const [g25, setG25] = useState(false);
  const [g26, setG26] = useState(false);
  const [g27, setG27] = useState(false);
  const [g28, setG28] = useState(false);
  const [g31, setG31] = useState(false);
  const [g32, setG32] = useState(false);
  const [g33, setG33] = useState(false);
  const [g34, setG34] = useState(false);
  const [g35, setG35] = useState(false);
  const [g36, setG36] = useState(false);
  const [g37, setG37] = useState(false);
  const [g38, setG38] = useState(false);
  const [g41, setG41] = useState(false);
  const [g42, setG42] = useState(false);
  const [g43, setG43] = useState(false);
  const [g44, setG44] = useState(false);
  const [g45, setG45] = useState(false);
  const [g46, setG46] = useState(false);
  const [g47, setG47] = useState(false);
  const [g48, setG48] = useState(false);

  //GIGI ORTHO
  const [overJet, setOverJet] = useState("");
  const [overBite, setOverBite] = useState("");
  const [hubMolarOd, setHubMolarOd] = useState("");
  const [hubMolarSos, setHubMolarSos] = useState("");
  const [midLineRa, setMidLineRa] = useState("");
  const [midLineRb, setMidLineRb] = useState("");
  const [jumlahRa, setJumlahRa] = useState("");
  const [jumlahRb, setJumlahRb] = useState("");
  const [awraniti, setAwraniti] = useState("");
  const [awrass, setAwrass] = useState("");
  const [awrbniti, setAwrbniti] = useState("");
  const [awrbss, setAwrbss] = useState("");
  const [ligasiRaod, setLigasiRaod] = useState("");
  const [ligasiRaodke, setLigasiRaodke] = useState("");
  const [ligasiRaos, setLigasiRaos] = useState("");
  const [ligasiRaoske, setLigasiRaoske] = useState("");
  const [ligasiRbod, setLigasiRbod] = useState("");
  const [ligasiRbodke, setLigasiRbodke] = useState("");
  const [ligasiRbos, setLigasiRbos] = useState("");
  const [ligasiRboske, setLigasiRboske] = useState("");
  const [openCoil, setOpenCoil] = useState("");
  const [openCoilKe, setOpenCoilKe] = useState("");
  const [powerChain, setPowerChain] = useState("");
  const [powerChainKe, setPowerChainKe] = useState("");
  const [eintraOd, setEintraOd] = useState("");
  const [eintraOs, setEintraOs] = useState("");
  const [eintraBod, setEintraBod] = useState("");
  const [eintraBos, setEintraBos] = useState("");
  const [eintraIiod, setEintraIiod] = useState("");
  const [eintraIios, setEintraIios] = useState("");
  const [eintraIiiod, setEintraIiiod] = useState("");
  const [eintraIiios, setEintraIiios] = useState("");
  const [pasElSpa, setPasElSpa] = useState("");
  const [pasBand, setPasBand] = useState("");
  const [ekstraEti, setEkstraEti] = useState("");
  const [braketRa, setBraketRa] = useState("");
  const [braketRb, setBraketRb] = useState("");
  const [jarakI, setJarakI] = useState("");
  const [jarakIi, setJarakIi] = useState("");
  const [jarak, setJarak] = useState("");
  const [upDownElOd, setUpDownElOd] = useState("");
  const [upDownElOs, setUpDownElOs] = useState("");
  const [bdPro, setBdPro] = useState("");
  const [lainLain, setLainLain] = useState("");

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailGigi = (id) => {
    axios
      .get(`${apiku}/EmrPemeriksaanKhusus/Gigi/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setGigi(res.data.result);
          console.log(res.data.result);
          setG11(res.data.result.g11);
          setG12(res.data.result.g12);
          setG13(res.data.result.g13);
          setG14(res.data.result.g14);
          setG15(res.data.result.g15);
          setG16(res.data.result.g16);
          setG17(res.data.result.g17);
          setG18(res.data.result.g18);
          setG21(res.data.result.g21);
          setG22(res.data.result.g22);
          setG23(res.data.result.g23);
          setG24(res.data.result.g24);
          setG25(res.data.result.g25);
          setG26(res.data.result.g26);
          setG27(res.data.result.g27);
          setG28(res.data.result.g28);
          setG31(res.data.result.g31);
          setG32(res.data.result.g32);
          setG33(res.data.result.g33);
          setG34(res.data.result.g34);
          setG35(res.data.result.g35);
          setG36(res.data.result.g36);
          setG37(res.data.result.g37);
          setG38(res.data.result.g38);
          setG41(res.data.result.g41);
          setG42(res.data.result.g42);
          setG43(res.data.result.g43);
          setG44(res.data.result.g44);
          setG45(res.data.result.g45);
          setG46(res.data.result.g46);
          setG47(res.data.result.g47);
          setG48(res.data.result.g48);
          setElemen(res.data.result.elemen.split(","));
          setTerapi(res.data.result.terapi);
          setDiagnosa(res.data.result.diagnosa);
        } else {
          setG11(false);
          setG12(false);
          setG13(false);
          setG14(false);
          setG15(false);
          setG16(false);
          setG17(false);
          setG18(false);
          setG21(false);
          setG22(false);
          setG23(false);
          setG24(false);
          setG25(false);
          setG26(false);
          setG27(false);
          setG28(false);
          setG31(false);
          setG32(false);
          setG33(false);
          setG34(false);
          setG35(false);
          setG36(false);
          setG37(false);
          setG38(false);
          setG41(false);
          setG42(false);
          setG43(false);
          setG44(false);
          setG45(false);
          setG46(false);
          setG47(false);
          setG48(false);
          setElemen("");
          setTerapi("");
          setDiagnosa("");
        }
      })
      .catch((err) => {
        setG11(false);
        setG12(false);
        setG13(false);
        setG14(false);
        setG15(false);
        setG16(false);
        setG17(false);
        setG18(false);
        setG21(false);
        setG22(false);
        setG23(false);
        setG24(false);
        setG25(false);
        setG26(false);
        setG27(false);
        setG28(false);
        setG31(false);
        setG32(false);
        setG33(false);
        setG34(false);
        setG35(false);
        setG36(false);
        setG37(false);
        setG38(false);
        setG41(false);
        setG42(false);
        setG43(false);
        setG44(false);
        setG45(false);
        setG46(false);
        setG47(false);
        setG48(false);
        setElemen("");
        setTerapi("");
        setDiagnosa("");
      });
  };

  const insertGigi = (datagigi) => {
    axios
      .post(`${apiku}/EmrPemeriksaanKhusus/Gigi`, datagigi, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil disimpan!");
        } else {
          console.log(res.data.result);
          message.warning(res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  const detailGigiOrtho = (id) => {
    axios
      .get(`${apiku}/EmrPemeriksaanKhusus/OrthoDonti/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setOverJet(res.data.result.overJet);
          setOverBite(res.data.result.overBite);
          setHubMolarOd(res.data.result.hubMolarOd);
          setHubMolarSos(res.data.result.hubMolarSos);
          setMidLineRa(res.data.result.midLineRa);
          setMidLineRb(res.data.result.midLineRb);
          setJumlahRa(res.data.result.jumlahRa);
          setJumlahRb(res.data.result.jumlahRb);
          setAwraniti(res.data.result.awraniti);
          setAwrass(res.data.result.awrass);
          setAwrbniti(res.data.result.awrbniti);
          setAwrbss(res.data.result.awrbss);
          setLigasiRaod(res.data.result.ligasiRaod);
          setLigasiRaodke(res.data.result.ligasiRaodke);
          setLigasiRaos(res.data.result.ligasiRaos);
          setLigasiRaoske(res.data.result.ligasiRaoske);
          setLigasiRbod(res.data.result.ligasiRbod);
          setLigasiRbodke(res.data.result.ligasiRbodke);
          setLigasiRbos(res.data.result.ligasiRbos);
          setLigasiRboske(res.data.result.ligasiRboske);
          setOpenCoil(res.data.result.openCoil);
          setOpenCoilKe(res.data.result.openCoilKe);
          setPowerChain(res.data.result.powerChain);
          setPowerChainKe(res.data.result.powerChainKe);
          setEintraOd(res.data.result.eintraOd);
          setEintraOs(res.data.result.eintraOs);
          setEintraBod(res.data.result.eintraBod);
          setEintraBos(res.data.result.eintraBos);
          setEintraIiod(res.data.result.eintraIiod);
          setEintraIios(res.data.result.eintraIios);
          setEintraIiiod(res.data.result.eintraIiiod);
          setEintraIiios(res.data.result.eintraIiios);
          setPasElSpa(res.data.result.pasElSpa);
          setPasBand(res.data.result.pasBand);
          setEkstraEti(res.data.result.ekstraEti);
          setBraketRa(res.data.result.braketRa);
          setBraketRb(res.data.result.braketRb);
          setJarakI(res.data.result.jarakI);
          setJarakIi(res.data.result.jarakIi);
          setJarak(res.data.result.jarak);
          setUpDownElOd(res.data.result.upDownElOd);
          setUpDownElOs(res.data.result.upDownElOs);
          setBdPro(res.data.result.bdPro);
          setLainLain(res.data.result.lainLain);
        } else {
          setOverJet(null);
          setOverBite(null);
          setHubMolarOd(null);
          setHubMolarSos(null);
          setMidLineRa(null);
          setMidLineRb(null);
          setJumlahRa(null);
          setJumlahRb(null);
          setAwraniti(null);
          setAwrass(null);
          setAwrbniti(null);
          setAwrbss(null);
          setLigasiRaod(null);
          setLigasiRaodke(null);
          setLigasiRaos(null);
          setLigasiRaoske(null);
          setLigasiRbod(null);
          setLigasiRbodke(null);
          setLigasiRbos(null);
          setLigasiRboske(null);
          setOpenCoil(null);
          setOpenCoilKe(null);
          setPowerChain(null);
          setPowerChainKe(null);
          setEintraOd(null);
          setEintraOs(null);
          setEintraBod(null);
          setEintraBos(null);
          setEintraIiod(null);
          setEintraIios(null);
          setEintraIiiod(null);
          setEintraIiios(null);
          setPasElSpa(null);
          setPasBand(null);
          setEkstraEti(null);
          setBraketRa(null);
          setBraketRb(null);
          setJarakI(null);
          setJarakIi(null);
          setJarak(null);
          setUpDownElOd(null);
          setUpDownElOs(null);
          setBdPro(null);
          setLainLain(null);
        }
      }, [])
      .catch((err) => {
        setOverJet(null);
        setOverBite(null);
        setHubMolarOd(null);
        setHubMolarSos(null);
        setMidLineRa(null);
        setMidLineRb(null);
        setJumlahRa(null);
        setJumlahRb(null);
        setAwraniti(null);
        setAwrass(null);
        setAwrbniti(null);
        setAwrbss(null);
        setLigasiRaod(null);
        setLigasiRaodke(null);
        setLigasiRaos(null);
        setLigasiRaoske(null);
        setLigasiRbod(null);
        setLigasiRbodke(null);
        setLigasiRbos(null);
        setLigasiRboske(null);
        setOpenCoil(null);
        setOpenCoilKe(null);
        setPowerChain(null);
        setPowerChainKe(null);
        setEintraOd(null);
        setEintraOs(null);
        setEintraBod(null);
        setEintraBos(null);
        setEintraIiod(null);
        setEintraIios(null);
        setEintraIiiod(null);
        setEintraIiios(null);
        setPasElSpa(null);
        setPasBand(null);
        setEkstraEti(null);
        setBraketRa(null);
        setBraketRb(null);
        setJarakI(null);
        setJarakIi(null);
        setJarak(null);
        setUpDownElOd(null);
        setUpDownElOs(null);
        setBdPro(null);
        setLainLain(null);
      });
  };

  const insertGigiOrtho = (datagigiortho) => {
    axios
      .post(`${apiku}/EmrPemeriksaanKhusus/OrthoDonti`, datagigiortho, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil disimpan!");
        } else {
          console.log(res.data.result);
          message.warning(res.data.result);
        }
      }, [])
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };

  const insertOdontogram = (dataodontogram) => {
    axios
      .post(`${apiku}/EmrSpesialisGigiOdonto`, dataodontogram, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil disimpan!");
        } else {
          console.log(res.data.result);
          message.warning(res.data.message);
        }
      }, [])
      .catch((err) => {
        console.log(err);
        message.error("Gagal disimpan!");
      });
  };
  return (
    <PoliGigiContext.Provider
      value={{
        insertOdontogram,
        detailGigi,
        detailGigiOrtho,
        insertGigiOrtho,
        gigi,
        elemen,
        diagnosa,
        terapi,
        g11,
        g12,
        g13,
        g14,
        g15,
        g16,
        g17,
        g18,
        g21,
        g22,
        g23,
        g24,
        g25,
        g26,
        g27,
        g28,
        g31,
        g32,
        g33,
        g34,
        g35,
        g36,
        g37,
        g38,
        g41,
        g42,
        g43,
        g44,
        g45,
        g46,
        g47,
        g48,
        overJet,
        overBite,
        hubMolarOd,
        hubMolarSos,
        midLineRa,
        midLineRb,
        jumlahRa,
        jumlahRb,
        awraniti,
        awrass,
        awrbniti,
        awrbss,
        ligasiRaod,
        ligasiRaodke,
        ligasiRaos,
        ligasiRaoske,
        ligasiRbod,
        ligasiRbodke,
        ligasiRbos,
        ligasiRboske,
        openCoil,
        openCoilKe,
        powerChain,
        powerChainKe,
        eintraOd,
        eintraOs,
        eintraBod,
        eintraBos,
        eintraIiod,
        eintraIios,
        eintraIiiod,
        eintraIiios,
        pasElSpa,
        pasBand,
        ekstraEti,
        braketRa,
        braketRb,
        jarakI,
        jarakIi,
        jarak,
        upDownElOd,
        upDownElOs,
        bdPro,
        lainLain,
        setElemen,
        setDiagnosa,
        setTerapi,
        setG11,
        setG12,
        setG13,
        setG14,
        setG15,
        setG16,
        setG17,
        setG18,
        setG21,
        setG22,
        setG23,
        setG24,
        setG25,
        setG26,
        setG27,
        setG28,
        setG31,
        setG32,
        setG33,
        setG34,
        setG35,
        setG36,
        setG37,
        setG38,
        setG41,
        setG42,
        setG43,
        setG44,
        setG45,
        setG46,
        setG47,
        setG48,
        insertGigi,
        setOverJet,
        setOverBite,
        setHubMolarOd,
        setHubMolarSos,
        setMidLineRa,
        setMidLineRb,
        setJumlahRa,
        setJumlahRb,
        setAwraniti,
        setAwrass,
        setAwrbniti,
        setAwrbss,
        setLigasiRaod,
        setLigasiRaodke,
        setLigasiRaos,
        setLigasiRaoske,
        setLigasiRbod,
        setLigasiRbodke,
        setLigasiRbos,
        setLigasiRboske,
        setOpenCoil,
        setOpenCoilKe,
        setPowerChain,
        setPowerChainKe,
        setEintraOd,
        setEintraOs,
        setEintraBod,
        setEintraBos,
        setEintraIiod,
        setEintraIios,
        setEintraIiiod,
        setEintraIiios,
        setPasElSpa,
        setPasBand,
        setEkstraEti,
        setBraketRa,
        setBraketRb,
        setJarakI,
        setJarakIi,
        setJarak,
        setUpDownElOd,
        setUpDownElOs,
        setBdPro,
        setLainLain,
      }}
    >
      {props.children}
    </PoliGigiContext.Provider>
  );
};

export default PoliGigiContextProvider;
