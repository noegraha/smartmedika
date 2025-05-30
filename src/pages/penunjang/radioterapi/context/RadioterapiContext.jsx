/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { message, Modal } from "antd";
import { LoginContext } from "../../../rawatjalan/context";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";

export const RadioterapiContext = createContext();


// COBA BRIGGING SATUSEHAT
const baseURL = "http://182.168.6.72:5577";
const client_id = "uKCKCZuFkkudD1225L8RHFtlH5y6RHQYGDaRjxJJBnE14sk8";
const client_secret =
  "LtQQVc7Cpp9iN1Rsz1cWz9YG60QV0VsaAALxOJFjHHjKfurflqhWHvdyq4bvc7XS";

const RadioterapiContextProvider = (props) => {
  const { token, namauser } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const ipEndpoint = sessionStorage.getItem("apiPenunjang");

  const endpoint = ipEndpoint;
  // const endpoint = "http://182.168.6.72:5577";

  const {
    detailPasien,
  } = useContext(PasienContext)

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  //state
  const [unitId, setUnitId] = useState("9404");
  const [stat, setStat] = useState("2");
  const [tglOrder, settglOrder] = useState(dayjs());
  const [sSearch, setsSearch] = useState("");
  const [listPasien, setListPasien] = useState([]);
  const [tabKey, settabKey] = useState('5')
  const [tabKeyStsEks, settabKeyStsEks] = useState('1')
  //ident pasien
  const [noReg, setnoReg] = useState("");
  const [pasienId, setpasienId] = useState("");
  const [umur, setumur] = useState("");
  const [jenisKelamin, setjenisKelamin] = useState("");
  const [penjamin, setpenjamin] = useState("");
  const [nama, setnama] = useState("");
  const [tglLahir, settglLahir] = useState("");
  const [tglMasuk, settglMasuk] = useState("");
  const [alamat, setalamat] = useState("");
  const [dataPasien, setdataPasien] = useState({});
  const [listRiwayat, setlistRiwayat] = useState([]);
  const [listTrxPmr, setlistTrxPmr] = useState([])
  // form inform consent
  const [icdrPelaksana, seticdrPelaksana] = useState("");
  const [icPemberiInformasi, seticPemberiInformasi] = useState("");
  const [icPenerimaInformasi, seticPenerimaInformasi] = useState("");
  const [icTgl, seticTgl] = useState(dayjs());
  const [icPersetujuan, seticPersetujuan] = useState("");
  const [icDiagWd, seticDiagWd] = useState("");
  const [icCkDiagWd, seticCkDiagWd] = useState(false);
  const [icDsrDiag, seticDsrDiag] = useState("");
  const [icCkDsrDiag, seticCkDsrDiag] = useState(false);
  const [icTinDok, seticTinDok] = useState("");
  const [icCkTinDok, seticCkTinDok] = useState(false);
  const [icIndTin, seticIndTin] = useState("");
  const [icCkIndTin, seticCkIndTin] = useState(false);
  const [icTatacara, seticTatacara] = useState("");
  const [icCkTatacara, seticCkTatacara] = useState(false);
  const [icTujuan, seticTujuan] = useState("");
  const [icCkTujuan, seticCkTujuan] = useState(false);
  const [icRisiko, seticRisiko] = useState("");
  const [icCkRisiko, seticCkRisiko] = useState(false);
  const [icKomplikasi, seticKomplikasi] = useState("");
  const [icCkKomplikasi, seticCkKomplikasi] = useState(false);
  const [icPrognosis, seticPrognosis] = useState("");
  const [icCkPrognosis, seticCkPrognosis] = useState(false);
  const [icAltRes, seticAltRes] = useState("");
  const [icCkAltRes, seticCkAltRes] = useState(false);
  const [icJenKel, seticJenKel] = useState("");
  const [icUmur, seticUmur] = useState("");
  const [icAlamat, seticAlamat] = useState("");
  const [icHubungan, seticHubungan] = useState("");
  // form ic penundaan
  const [icDiagker, seticDiagker] = useState("");
  const [icAlsPen, seticAlsPen] = useState("");
  const [icDasDiagnosa, seticDasDiagnosa] = useState("");
  const [icAlsProb, seticAlsProb] = useState("");
  const [icRencana, seticRencana] = useState("");
  const [icLainlain, seticLainlain] = useState("");
  const [icAltLain, seticAltLain] = useState("");
  // from assesment awal
  const [aaBBa, setaaBBa] = useState();
  const [aaTBa, setaaTBa] = useState();
  const [aaSuhua, setaaSuhua] = useState();
  const [aaNadia, setaaNadia] = useState();
  const [aaRRa, setaaRRa] = useState();
  const [aaSistolea, setaaSistolea] = useState();
  const [aaDiastolea, setaaDiastolea] = useState();
  const [aaAssNyeria, setaaAssNyeria] = useState();
  const [aaAssResikoJatuha, setaaAssResikoJatuha] = useState();
  const [aaDiagnosaa, setaaDiagnosaa] = useState();
  const [ttvRajal, setttvRajal] = useState();
  const [dxRajal, setdxRajal] = useState([]);

  const [aaBBb, setaaBBb] = useState("");
  const [aaTBb, setaaTBb] = useState("");
  const [aaSuhub, setaaSuhub] = useState("");
  const [aaNadib, setaaNadib] = useState("");
  const [aaRRb, setaaRRb] = useState("");
  const [aaSistoleb, setaaSistoleb] = useState("");
  const [aaDiastoleb, setaaDiastoleb] = useState("");
  const [aaAssNyerib, setaaAssNyerib] = useState("");
  const [aaAssResikoJatuhb, setaaAssResikoJatuhb] = useState("");
  const [aaDiagnosab, setaaDiagnosab] = useState("");
  const [aaDrPenunjang, setaaDrPenunjang] = useState("");
  const [aaPlanning, setaaPlanning] = useState("");
  // form status externa
  const [listLookupPasien, setlistLookupPasien] = useState([])
  const [tempLookupPasien, settempLookupPasien] = useState([])
  const [diagnosa, setdiagnosa] = useState("");
  const [hasilPa, sethasilPa] = useState("");
  const [lokasiTumor, setlokasiTumor] = useState("");
  const [stadium, setstadium] = useState("");
  const [dataKlinis, setdataKlinis] = useState("");
  const [tindakan, settindakan] = useState()
  const [penyinaran, setpenyinaran] = useState()
  const [listVolume, setlistVolume] = useState([]);
  const [tglSimulator, settglSimulator] = useState(dayjs());
  const [teknis, setteknis] = useState("");
  const [radiografer, setradiografer] = useState("");
  const [dokter, setdokter] = useState("");
  const [tglCt, settglCt] = useState(dayjs());
  const [radiografer2, setradiografer2] = useState("");
  const [clKepala, setclKepala] = useState(false);
  const [clThorax, setclThorax] = useState(false);
  const [clPelvis, setclPelvis] = useState(false);
  const [clCranio, setclCranio] = useState(false);
  const [clabdomen, setclabdomen] = useState(false);
  const [catatan, setcatatan] = useState("");
  const [smlKepala, setsmlKepala] = useState(false);
  const [smlThorax, setsmlThorax] = useState(false);
  const [smlPelvis, setsmlPelvis] = useState(false);
  const [smlBrain, setsmlBrain] = useState(false);
  const [smlAbdomen, setsmlAbdomen] = useState(false);
  const [smlEktrimitas, setsmlEktrimitas] = useState(false);
  const [Ektrimitas, setEktrimitas] = useState(false);
  const [linac, setlinac] = useState(false);
  const [cblt1, setcblt1] = useState(false);
  const [cblt2, setcblt2] = useState(false);
  const [brakhi, setbrakhi] = useState(false);
  const [listDiagnosa, setlistDiagnosa] = useState([]);
  const [totalPenyinaran, settotalPenyinaran] = useState();
  // form status externa -- Modal
  const [mdLookupPasien, setmdLookupPasien] = useState(false)
  // form tps
  const [tpsPssPasien, settpsPssPasien] = useState("");
  const [tpsPssTatto, settpsPssTatto] = useState("");
  const [tpsAcc, settpsAcc] = useState("");
  const [tpsSad, settpsSad] = useState("");
  const [tpsSsd, settpsSsd] = useState("");
  const [tpsXPlus, settpsXPlus] = useState("");
  const [tpsXMin, settpsXMin] = useState("");
  const [tpsYPlus, settpsYPlus] = useState("");
  const [tpsYMin, settpsYMin] = useState("");
  const [tpsCr, settpsCr] = useState("");
  const [tpsGr, settpsGr] = useState("");
  const [tpsHt, settpsHt] = useState("");
  const [tpsWedgeFilter, settpsWedgeFilter] = useState("");
  const [tpsLeadBlocks, settpsLeadBlocks] = useState("");
  const [tpsJmlFraksi, settpsJmlFraksi] = useState("");
  const [tpsDosisTumor, settpsDosisTumor] = useState("");
  const [tpsDosisPermukaa, settpsDosisPermukaa] = useState("");
  const [tpsWaktuRad, settpsWaktuRad] = useState("");
  const [tpsDosisTotal, settpsDosisTotal] = useState("");
  const [tpsCatatan, settpsCatatan] = useState("");
  // form penyinaran
  const [pynMingguKe, setpynMingguKe] = useState("");
  const [pynTglPyn, setpynTglPyn] = useState(dayjs());
  const [pynWktRad, setpynWktRad] = useState("");
  const [pynDosis, setpynDosis] = useState("");
  const [pynJmlLap, setpynJmlLap] = useState("");
  const [pynDosisTtl, setpynDosisTtl] = useState("");
  const [pynDokter, setpynDokter] = useState("");
  const [pynDrTrx, setpynDrTrx] = useState("")
  const [pynPetugas, setpynPetugas] = useState("");
  const [stsEksPilih, setstsEksPilih] = useState();
  const [pynLapangan, setpynLapangan] = useState("");
  const [pynListPenyinaran, setpynListPenyinaran] = useState("");
  const [pynIdListPenyinaran, setpynIdListPenyinaran] = useState("");
  const [listRiwPenyinaran, setlistRiwPenyinaran] = useState([]);
  // form QC Penyinaran
  const [qcDiag, setqcDiag] = useState("");
  const [qcPlan, setqcPlan] = useState("");
  const [qcDokter, setqcDokter] = useState("");
  const [qcTgl, setqcTgl] = useState(dayjs());
  const [qcTeknikPeny, setqcTeknikPeny] = useState("");
  const [qcPesawat, setqcPesawat] = useState("");
  // user data
  const [userEntry, setuserEntry] = useState(namauser);
  const [ipUser, setipUser] = useState(ip);
  const [hostUser, sethostUser] = useState(host);
  //mst
  const [listRd, setlistRd] = useState([]);
  const [listDokter, setlistDokter] = useState([]);
  //spin
  const [spTabelPasien, setspTabelPasien] = useState(false);
  const [spDataPasien, setspDataPasien] = useState(false);
  const [spRiwayatRd, setspRiwayatRd] = useState(false);
  const [spRiwayatPenyinaran, setspRiwayatPenyinaran] = useState(false);
  const [spReportStsEks, setspReportStsEks] = useState(false);
  const [spGetDokter, setspGetDokter] = useState(false);
  const [spGetRadiografer, setspGetRadiografer] = useState(false);
  const [spPynSimpan, setspPynSimpan] = useState(false);
  const [spTrxPmr, setspTrxPmr] = useState(false);
  const [spHeaderPasien, setspHeaderPasien] = useState(false);
  const [spLookupPasien, setspLookupPasien] = useState(false);
  const [spTbDiagnosa, setspTbDiagnosa] = useState(false);
  const [spTTVRajal, setspTTVRajal] = useState(false);
  const [spTTVRadio, setspTTVRadio] = useState(false);
  //modal
  // -- pagehead
  const [mdListTrxPmr, setmdListTrxPmr] = useState(false);
  const [mdTambahVolume, setmdTambahVolume] = useState(false);
  const [mdTambahData, setmdTambahData] = useState(false); // penyinaran
  const [mdListStsEksterna, setmdListStsEksterna] = useState(false);
  const [mdInfoUpdate, setmdInfoUpdate] = useState(false);
  const [mdInfoUpdateStsEksterna, setmdInfoUpdateStsEksterna] = useState(false);
  //cetak
  const [cetakStatusEksterna, setcetakStatusEksterna] = useState({});
  const [cetakStatusRd, setcetakStatusRd] = useState({});
  const [cetaklistVolume, setcetaklistVolume] = useState([]);

  // SIMULASI SATU SEHAT
  // const [satuSehatToken, setsatuSehatToken] = useState('')
  // const [satuSehatNik, setsatuSehatNik] = useState('3303151409920001')
  // const [IHSPAtient, setIHSPAtient] = useState('')
  // const [IhsRs, setIhsRs] = useState('10000004')
  // const [IHSPraktisi, setIHSPraktisi] = useState('')
  // const [resGetPasien, setresGetPasien] = useState({})
  // const [satuSehatNikPraktisi, setsatuSehatNikPraktisi] = useState('3303151409920001')
  // const [resGetPraktisi, setresGetPraktisi] = useState({})
  // const [resPostEncounter, setresPostEncounter] = useState({})
  // const [resPostDiagnostik, setresPostDiagnostik] = useState({})
  // const [regPas, setregPas] = useState('2210130001')
  // const [satuSehatStatus, setsatuSehatStatus] = useState('arrived')
  // const [satuSehatNmPas, setsatuSehatNmPas] = useState('')
  // const [satuSehatNmPrak, setsatuSehatNmPrak] = useState('')
  // const [satuSehatLokasi, setsatuSehatLokasi] = useState('Location/ef011065-38c9-46f8-9c35-d1fe68966a3e')
  // const [satuSehatNmLokasi, setsatuSehatNmLokasi] = useState('Ruang 1A, Poliklinik Rawat Jalan')
  // const [periodStart, setperiodStart] = useState(dayjs())
  // const [periodEnd, setperiodEnd] = useState(dayjs().add(1, 'hours'))
  // const [idEncounter, setidEncounter] = useState('')

  const getListOrder = (sTanggal, unitId, stsOrder, sSearch) => {
    console.log(sTanggal, unitId, stsOrder, sSearch);
    setspTabelPasien(true);
    if (sSearch.length === 0) {
      sSearch = "%20";
    }
    axios
      .get(
        `${endpoint}/EmrRadioterapi/bysearch/${sTanggal}/${unitId}/${stsOrder}/${sSearch}`,
        options
      )
      .then((response) => {
        // console.log("getPasienRadioterapi ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setListPasien([]);
            setspTabelPasien(false);
            Modal.info({
              title: "Informasi",
              content: "Tidak ada order Radioterapi.",
            });
          } else {
            // console.log("getListOrder : ", response.data.result);
            setListPasien(response.data.result);
            // setmdListOrder(true)
            setspTabelPasien(false);
          }
        } else {
          setListPasien([]);
          setspTabelPasien(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data List Order Radioterapi!`,
          });
        }
      })
      .catch((err) => {
        setListPasien([]);
        setspTabelPasien(false);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil data List Order Radioterapi! -> ${err}`,
        });
      });
  };

  useEffect(() => {
    // settingan info update otomatis => Update Laporan Penyinaran
    const updateDate = '2025-03-12';
    const today = dayjs();
    // const today = dayjs('2024-09-06');
    const daysDifference = today.diff(dayjs(updateDate), 'day');

    if (daysDifference < 30) {
      setmdInfoUpdate(true);
    };

    // settingan info update otomatis => Update Status Eksterna
    const updateDate1 = '2025-03-06';
    const today1 = dayjs();
    // const today = dayjs('2024-09-06');
    const daysDifference1 = today1.diff(dayjs(updateDate1), 'day');

    if (daysDifference1 < 30) {
      setmdInfoUpdateStsEksterna(true);
    };
  }, []);

  const getLoadDokter = (sKategori, unitId) => {
    setspGetDokter(true);
    axios
      .get(
        `${endpoint}/EmrRadioterapi/getLoadDokter/${sKategori}/${unitId}`,
        options
      )
      .then((response) => {
        setspGetDokter(false);
        // console.log("getLoadDokter ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setlistDokter([]);
            message.success("getLoadDokter Berhasil, tidak ada data.");
          } else {
            setlistDokter(response.data.result);
            // message.success("getLoadDokter Berhasil.")
          }
        } else {
          setlistDokter([]);
          message.warning(`getLoadDokter GAGAL!`);
        }
      })
      .catch((err) => {
        setspGetDokter(false);
        message.warning(`getLoadDokter ERROR! -> ${err}`);
      });
  };

  const getLoadRadiografer = (sKategori, unitId) => {
    setspGetRadiografer(true);
    axios
      .get(
        `${endpoint}/EmrRadioterapi/getLoadDokter/${sKategori}/${unitId}`,
        options
      )
      .then((response) => {
        setspGetRadiografer(false);
        // console.log("getLoadRadiografer ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setlistRd([]);
            message.success("getLoadRadiografer Berhasil, tidak ada data.");
          } else {
            setlistRd(response.data.result);
            // message.success("getLoadRadiografer Berhasil.")
          }
        } else {
          setlistRd([]);
          message.warning("getLoadRadiografer GAGAL!");
        }
      })
      .catch((err) => {
        setspGetRadiografer(false);
        message.warning(`getLoadRadiografer ERROR! -> ${err}`);
      });
  };

  const rstIdentPasien = () => {
    // setnoReg('')
    setpasienId("");
    setumur("");
    setjenisKelamin("");
    setpenjamin("");
    setnama("");
    settglLahir("");
    settglMasuk("");
    setalamat("");
    setlistRiwayat([]);
    setdiagnosa("");
    setpynDrTrx("");
    settabKey('5')
  };

  const rstStatusRd = () => {
    sethasilPa("");
    setlokasiTumor("");
    setstadium("");
    setdataKlinis("");
    setlistVolume("");
    settglSimulator(dayjs());
    setteknis("");
    setradiografer("");
    setdokter("");
    settglCt(dayjs());
    setradiografer2("");
    setclKepala(false);
    setclThorax(false);
    setclPelvis(false);
    setclCranio(false);
    setclabdomen(false);
    setsmlKepala(false);
    setsmlThorax(false);
    setsmlPelvis(false);
    setsmlBrain(false);
    setsmlAbdomen(false);
    setsmlEktrimitas(false);
    setEktrimitas(false);
    setlinac(false);
    setcblt1(false);
    setcblt2(false);
    setbrakhi(false);
    setcatatan("");
    settindakan();
    setpenyinaran();
    settotalPenyinaran();
  };

  const getDataPasiendanStatusRd = (noreg) => {
    rstIdentPasien();
    rstStatusRd();
    setspHeaderPasien(true);
    setspDataPasien(true);
    if (noreg.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "No Registrasi tidak boleh kosong!",
      });
    }
    else {
      axios
        .get(
          `${endpoint}/EmrRadioterapi/getDataPasiendanStatusRd/${noreg}`,
          options
        )
        .then((response) => {
          setspDataPasien(false);
          setspHeaderPasien(false);
          console.log("getDataPasien ", response.data);
          if (response.data.statusCode === 200) {
            if (response.data.result.length === 0) {
              Modal.info({
                title: "Informasi",
                content: "Tidak ada data Pasien Radioterapi.",
              });
            } else {
              //ident pasien
              setpasienId(response.data.result.NOPASIEN);
              setumur(response.data.result.UMURTAHUN + ' Tahun ' + response.data.result.UMURBULAN + ' Bulan ' + response.data.result.UMURHARI + ' Hari');
              setjenisKelamin(response.data.result.KELAMIN);
              setpenjamin(response.data.result.NAMAPT);
              setnama(response.data.result.NAMAPASIEN);
              settglLahir(
                dayjs(response.data.result.TGLLAHIR).format("DD-MM-YYYY")
              );
              response.data.result.TGLMASUK
                ? settglMasuk(
                  dayjs(response.data.result.TGLMASUK).format("DD-MM-YYYY")
                )
                : settglMasuk(dayjs().format("DD-MM-YYYY"));
              setalamat(response.data.result.ALAMAT);
              setpynDrTrx(response.data.result.DRPERIKSA);

              let infoPx = response.data.result;
              setdataPasien(infoPx);

              //tab 1
              if (response.data.result.statusRd) {
                setdiagnosa(response.data.result.statusRd.DIAGNOSA);
                sethasilPa(response.data.result.statusRd.HASIL_PA);
                setlokasiTumor(response.data.result.statusRd.LOKASI_TUMOR);
                setstadium(response.data.result.statusRd.STADIUM);
                setdataKlinis(response.data.result.statusRd.DATA_KLINIS);
                setlistVolume(response.data.result.rdList);
                settglSimulator(dayjs(response.data.result.statusRd.TGLSIMULATOR));
                setteknis(response.data.result.statusRd.TEKNIS);
                setradiografer(response.data.result.statusRd.RADIOGRAFER1);
                setdokter(response.data.result.statusRd.KODEDOKTER);
                settglCt(dayjs(response.data.result.statusRd.TGLDOSIMETRI));
                setradiografer2(response.data.result.statusRd.RADIOGRAFER2);
                response.data.result.statusRd.KEPALA === 1 ? setclKepala(true) : setclKepala(false);
                response.data.result.statusRd.THORAX === 1 ? setclThorax(true) : setclThorax(false);
                response.data.result.statusRd.PELVIS === 1 ? setclPelvis(true) : setclPelvis(false);
                response.data.result.statusRd.CRANIO === 1 ? setclCranio(true) : setclCranio(false);
                response.data.result.statusRd.ABDOMEN === 1 ? setclabdomen(true) : setclabdomen(false);
                response.data.result.statusRd.EKSTRIMITAS === 1 ? setEktrimitas(true) : setEktrimitas(false);

                response.data.result.statusRd.SMLKEPALA === 1 ? setsmlKepala(true) : setsmlKepala(false);
                response.data.result.statusRd.SMLTHORAX === 1 ? setsmlThorax(true) : setsmlThorax(false);
                response.data.result.statusRd.SMLPELVIS === 1 ? setsmlPelvis(true) : setsmlPelvis(false);
                response.data.result.statusRd.SMLBRAIN === 1 ? setsmlBrain(true) : setsmlBrain(false);
                response.data.result.statusRd.SMLABDOMEN === 1 ? setsmlAbdomen(true) : setsmlAbdomen(false);
                response.data.result.statusRd.SMLEKSTRIMITAS === 1 ? setsmlEktrimitas(true) : setsmlEktrimitas(false);

                response.data.result.statusRd.LINAC === 1 ? setlinac(true) : setlinac(false);
                response.data.result.statusRd.COBALT1 === 1 ? setcblt1(true) : setcblt1(false);
                response.data.result.statusRd.COBALT2 === 1 ? setcblt2(true) : setcblt2(false);
                response.data.result.statusRd.BRAKHITERAPI === 1 ? setbrakhi(true) : setbrakhi(false);

                setcatatan(response.data.result.statusRd.CATATAN);
                settindakan(response.data.result.statusRd.TINDAKAN);
                setpenyinaran(response.data.result.statusRd.PENYINARAN);
                settotalPenyinaran(response.data.result.statusRd.TOTALPENYINARAN);
              }
              // else {
              //   rstStatusRd();
              // }

              // tab penyinaran
              setpynListPenyinaran(response.data.result.dataPenyinaran);
            }
          } else {
            setspDataPasien(false);
            setspHeaderPasien(false);
            Modal.error({
              title: "Gagal!",
              content: `Gagal melakukan proses ambil data Pasien Radioterapi! -> ${response.data.result}`,
            });
          }
        })
        .catch((err) => {
          setspDataPasien(false);
          setspHeaderPasien(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR!, melakukan proses ambil data Pasien Radioterapi! -> ${err}`,
          });
        });
    }
  };

  const getRiwayatRd = (noPasien) => {
    setspRiwayatRd(true);
    if (noPasien.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "Pilih pasien terlebih dahulu!",
      });
    } else {
      axios
        .get(`${endpoint}/EmrRadioterapi/getriwayatrd/${noPasien}`, options)
        .then((response) => {
          console.log("getDataRiwayat ", response.data);
          if (response.data.statusCode === 200) {
            if (response.data.result.length === 0) {
              setlistRiwayat([]);
              Modal.info({
                title: "Informasi",
                content: "Tidak ada Riwayat Pasien Radioterapi.",
              });
            } else {
              setlistRiwayat(response.data.result);
            }
            setspRiwayatRd(false);
          } else {
            setspRiwayatRd(false);
            Modal.error({
              title: "Gagal!",
              content: `Gagal melakukan proses ambil data Riwayat Pasien Radioterapi! -> ${response.data.result}`,
            });
          }
        })
        .catch((err) => {
          setspRiwayatRd(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR!, melakukan proses ambil data Riwayat Pasien Radioterapi! -> ${err}`,
          });
        });
    }
  };

  const getListTrxpmr = (sNoReg, sRuangId) => {
    setspTrxPmr(true);
    axios
      .get(`${endpoint}/EmrRadioterapi/GetTransaksiPenunjang/${sNoReg}/${sRuangId}`, options)
      .then((response) => {
        console.log("getListTrxpmr ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setlistTrxPmr([]);
            Modal.info({
              title: "Informasi",
              content: "Tidak ada Transaksi di Unit Radioterapi.",
            });
          } else {
            setlistTrxPmr(response.data.result);
            setmdListTrxPmr(true)
          }
          setspTrxPmr(false);
        } else {
          setspTrxPmr(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data Transaksi di Unit Radioterapi! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspTrxPmr(false);
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
      .get(`${endpoint}/EmrRadioterapi/GetDataPenyinaranNotInList/${sNoReg}/${sTglPmr}/${sRuangId}`, options)
      .then((response) => {
        console.log("getDataTidakOrder ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            Modal.info({
              title: "Informasi",
              content: "Tidak ada data Pasien Radioterapi.",
            });
          }
          else {
            //ident pasien
            setpasienId(response.data.result.NOPASIEN);
            setumur(response.data.result.UMURTAHUN + ' Tahun ' + response.data.result.UMURBULAN + ' Bulan ' + response.data.result.UMURHARI + ' Hari');
            setjenisKelamin(response.data.result.KELAMIN);
            setpenjamin(response.data.result.NAMAPT);
            setnama(response.data.result.NAMAPASIEN);
            settglLahir(
              dayjs(response.data.result.TGLLAHIR).format("DD-MM-YYYY")
            );
            response.data.result.TGLMASUK
              ? settglMasuk(
                dayjs(response.data.result.TGLMASUK).format("DD-MM-YYYY")
              )
              : settglMasuk(dayjs().format("DD-MM-YYYY"));
            setalamat(response.data.result.ALAMAT);
            setpynDrTrx(response.data.result.DRPERIKSA);

            // tab penyinaran
            setpynListPenyinaran(response.data.result.dataPenyinaran);

            settglOrder(dayjs(sTglPmr))
          }
          setmdListTrxPmr(false)
          setspDataPasien(false)
          getListOrder(sTglPmr, unitId, '2', '%20')

          sessionStorage.setItem("norm", response.data.result.NOPASIEN);
          detailPasien(noReg)
        } else {
          setspDataPasien(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data Pasien Radioterapi! -> No Registrasi ini ada dalam list Order!`,
          });
        }
      })
      .catch((err) => {
        setmdListTrxPmr(false)
        setspDataPasien(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data Pasien Radioterapi! -> ${err}`,
        });
      });
  };

  const getLookupPasien = (sNoReg) => {
    setspLookupPasien(true);
    setlistLookupPasien([])
    settempLookupPasien([])
    axios
      .get(`${endpoint}/EmrRadioterapi/GetLookupPasien/${sNoReg}`, options)
      .then((response) => {
        setspLookupPasien(false);
        console.log("getLookupPasien ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            Modal.info({
              title: "Informasi",
              content: "Tidak ada Pasien.",
            });
          }
          else {
            setlistLookupPasien(response.data.result)
            settempLookupPasien(response.data.result)
          }
        } else {
          setspLookupPasien(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil data Pasien!`,
          });
        }
      })
      .catch((err) => {
        setspLookupPasien(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses ambil data Pasien! -> ${err}`,
        });
      });
  };

  const getDiagnosaPx = (sNoReg) => {
    setspTbDiagnosa(true)
    axios
      .get(`${endpoint}/EmrBankDarah/GetDiagnosaPx/${sNoReg}`, options)
      .then((res) => {
        console.log('getDiagnosaPx : ', res);
        setspTbDiagnosa(false)
        if (res.data.statusCode === 200) {
          if (res.data.result.length !== 0) {
            setlistDiagnosa(res.data.result)
          }
          else (
            setlistDiagnosa([])
          )
        } else {
          setlistDiagnosa([])
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil Diagnosa! -> ${res.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspTbDiagnosa(false)
        setlistDiagnosa([])
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil Diagnosa! -> ${err}`,
        });
      });
  };

  const getTTV = (noreg) => {
    setspTTVRajal(true);
    // setspTTVRadio(true);
    axios
      .get(`${endpoint}/EmrRadioterapi/GetTTVRajal/${noreg}`, options)
      .then((res) => {
        setspTTVRajal(false);
        // setspTTVRadio(false);
        console.log('getTTV : ', res);
        if (res.data.statusCode === 200) {
          if (!res.data.result.tandaVital) {
            setttvRajal({});
            Modal.info({
              title: "Perhatian!",
              content: 'TTV dari rawat jalan masih kosong!',
            });
          } else {
            setttvRajal(res.data.result.tandaVital);
          };

          if (res.data.result.diagnosis.length !== 0) {
            setdxRajal(res.data.result.diagnosis);
          }
          else {
            setdxRajal([]);
          };
        } else {
          setttvRajal({});
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil Diagnosa! -> ${res.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspTTVRajal(false);
        // setspTTVRadio(false);
        setttvRajal({});
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil TTV dan Diagnosa! -> ${err}`,
        });
      });
  };

  const rstTtvPenunjang = () => {
    setaaBBb();
    setaaTBb();
    setaaSuhub();
    setaaNadib();
    setaaRRb();
    setaaSistoleb();
    setaaDiastoleb();
    setaaAssNyerib();
    setaaAssResikoJatuhb();
  };

  const rstAssPenunjang = () => {
    setaaDiagnosab();
    setaaDrPenunjang();
    setaaPlanning();
  };

  const getTTVPenunjang = (noreg, ruangId) => {
    setspTTVRadio(true);
    axios
      .get(`${endpoint}/EmrRadioterapi/GetTTVPenunjang/${noreg}/${ruangId}`, options)
      .then((res) => {
        setspTTVRadio(false);
        console.log('getTTVPenunjang : ', res);
        if (res.data.statusCode === 200) {
          let ttvPenunjang = res.data.result.ttvPenunjang;
          let assPenunjang = res.data.result.assPenunjang;

          if (!ttvPenunjang) {
            rstTtvPenunjang();
          } else {
            setaaBBb(ttvPenunjang.BeratBadan);
            setaaTBb(ttvPenunjang.TinggiBadan);
            setaaSuhub(ttvPenunjang.SuhuTubuh);
            setaaNadib(ttvPenunjang.FrekuensiNadi);
            setaaRRb(ttvPenunjang.FrekuensiNafas);
            setaaSistoleb(ttvPenunjang.TekananDarahSistolik);
            setaaDiastoleb(ttvPenunjang.TekananDarahDiastolik);
            setaaAssNyerib(ttvPenunjang.SkorNyeri);
            setaaAssResikoJatuhb(ttvPenunjang.ResikoJatuh);
          };

          if (!assPenunjang) {
            rstAssPenunjang();
          }
          else {
            setaaDiagnosab(assPenunjang.PDIAGNOSA);
            setaaDrPenunjang(assPenunjang.DOKTERPENUNJANG);
            setaaPlanning(assPenunjang.PLANNING);
          };
        } else {
          rstTtvPenunjang();
          rstAssPenunjang();
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses ambil TTV dan Diagnosa Penunjang! -> ${res.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspTTVRadio(false);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil TTV dan Diagnosa Penunjang! -> ${err}`,
        });
      });
  }

  const simpanStatusEksterna = (data) => {
    setspDataPasien(true);
    axios
      .post(`${endpoint}/EmrRadioterapi/insertstatuseksterna`, data, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setspDataPasien(false);
          Modal.success({
            title: "Sukses",
            content: "Berhasil Disimpan Status Radioterapi Eksterna.",
            // onOk: () => {
            //     if (noOrder) {
            //         getDetailTrPmr(noOrder)
            //         setNoOrder('');
            //         getListOrder(unitId, '', 0, moment(tglOrder).format('DD-MM-YYYY'));
            //     }
            //     else {
            //         getbyNoReg(noTransaksi, unitId)
            //     }
            // },
          });
        } else {
          setspDataPasien(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal Disimpan Status Radioterapi Eksterna! -> ${res.data.message}.`,
          });
        }
      })
      .catch((err) => {
        setspDataPasien(false);
        Modal.error({
          title: "ERROR!",
          content: `Gagal Disimpan! -> ${err}`,
        });
      });
  };

  const simpanPenyinaran = (data) => {
    setspPynSimpan(true);
    axios
      .post(`${endpoint}/EmrRadioterapi/insertpenyinaran`, data, {
        headers: options.headers,
      })
      .then((res) => {
        // console.log(res);
        if (res.data.result.code === "200") {
          setmdTambahData(false);
          setspPynSimpan(false);
          Modal.success({
            title: "Sukses",
            content: "Berhasil Disimpan data Penyinaran.",
            // onOk: () => {
            //     if (noOrder) {
            //         getDetailTrPmr(noOrder)
            //         setNoOrder('');
            //         getListOrder(unitId, '', 0, moment(tglOrder).format('DD-MM-YYYY'));
            //     }
            //     else {
            //         getbyNoReg(noTransaksi, unitId)
            //     }
            // },
          });
          // console.log('simpanPenyinaran : ', res.data.result);
          setpynListPenyinaran(res.data.result.result);
          getListOrder(
            dayjs(tglOrder).format("YYYY-MM-DD"),
            unitId,
            "2",
            "%20"
          );
        } else {
          setspPynSimpan(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal Disimpan data Penyinaran! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspPynSimpan(false);
        Modal.error({
          title: "ERROR!",
          content: `Gagal Disimpan! -> ${err}`,
        });
      });
  };

  const simpanTTVPenunjang = (data) => {
    setspTTVRadio(true);
    axios
      .post(`${endpoint}/EmrRadioterapi/InsertTTVPenunjang`, data, {
        headers: options.headers,
      })
      .then((res) => {
        console.log(res);
        setspTTVRadio(false);
        if (res.data.result.code === "200") {
          Modal.success({
            title: "Sukses",
            content: "Berhasil Disimpan data Penyinaran.",
            // onOk: () => {
            //     if (noOrder) {
            //         getDetailTrPmr(noOrder)
            //         setNoOrder('');
            //         getListOrder(unitId, '', 0, moment(tglOrder).format('DD-MM-YYYY'));
            //     }
            //     else {
            //         getbyNoReg(noTransaksi, unitId)
            //     }
            // },
          });
          // setpynListPenyinaran(res.data.result.result);
          // getListOrder(
          //   dayjs(tglOrder).format("YYYY-MM-DD"),
          //   unitId,
          //   "2",
          //   "%20"
          // );
        } else {
          setspTTVRadio(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal Disimpan data Assesment! -> ${res.data.result.message}`,
          });
        }
      })
      .catch((err) => {
        setspTTVRadio(false);
        Modal.error({
          title: "ERROR!",
          content: `Gagal Disimpan! -> ${err}`,
        });
      });
  };

  const ReportStsEksterna = (noreg) => {
    setspReportStsEks(true);
    axios
      .get(
        `${endpoint}/EmrRadioterapi/getDataPasiendanStatusRd/${noreg}`,
        options
      )
      .then((response) => {
        setspReportStsEks(false);
        console.log("Report : ", response.data.result);
        if (response.data.statusCode === 200) {
          setcetakStatusEksterna(response.data.result);
          setcetakStatusRd(response.data.result.statusRd);
          response.data.result.rdList
            ? setcetaklistVolume(response.data.result.rdList)
            : setcetaklistVolume([]);
        } else {
          // setspReportStsEks(false);
          Modal.error({
            title: "Gagal!",
            content: `Gagal melakukan proses cetak Status Radioterapi Eksterna! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspReportStsEks(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR!, melakukan proses cetak Status Radioterapi Eksterna! -> ${err}`,
        });
      });
  };

  const getRiwayatPenyinaran = (pasienId) => {
    setspRiwayatPenyinaran(true);
    axios
      .get(
        `${endpoint}/EmrRadioterapi/GetRiwayatPenyinaran/${pasienId}`,
        options
      )
      .then((response) => {
        setspRiwayatPenyinaran(false);
        console.log("getRiwayatPenyinaran : ", response);
        if (response.data.statusCode === 200) {
          setlistRiwPenyinaran(response.data.result.result);
        } else {
          setspRiwayatPenyinaran(false);
          setlistRiwPenyinaran([]);
          Modal.error({
            title: "Gagal!",
            content: `Gagal ambil data! -> ${response.data.result}`,
          });
        }
      })
      .catch((err) => {
        setspRiwayatPenyinaran(false);
        setlistRiwPenyinaran([]);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! Mengambil Data -> ${err}`,
        });
      });
  };

  return (
    <RadioterapiContext.Provider
      value={{
        //state
        unitId,
        setUnitId,
        tglOrder,
        settglOrder,
        stat,
        sSearch,
        setsSearch,
        listPasien,
        userEntry,
        ipUser,
        setipUser,
        hostUser,
        sethostUser,
        tabKey, settabKey,
        tabKeyStsEks, settabKeyStsEks,
        //ident pasien
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
        tglLahir,
        settglLahir,
        tglMasuk,
        settglMasuk,
        alamat,
        setalamat,
        dataPasien, setdataPasien,
        listRiwayat,
        setlistRiwayat,
        listTrxPmr, setlistTrxPmr,
        // inform consent
        icdrPelaksana,
        seticdrPelaksana,
        icPemberiInformasi,
        seticPemberiInformasi,
        icPenerimaInformasi,
        seticPenerimaInformasi,
        icTgl,
        seticTgl,
        icPersetujuan,
        seticPersetujuan,
        // ic persetujuan
        icDiagWd,
        seticDiagWd,
        icCkDiagWd,
        seticCkDiagWd,
        icDsrDiag,
        seticDsrDiag,
        icCkDsrDiag,
        seticCkDsrDiag,
        icTinDok,
        seticTinDok,
        icCkTinDok,
        seticCkTinDok,
        icIndTin,
        seticIndTin,
        icCkIndTin,
        seticCkIndTin,
        icTatacara,
        seticTatacara,
        icCkTatacara,
        seticCkTatacara,
        icTujuan,
        seticTujuan,
        icCkTujuan,
        seticCkTujuan,
        icRisiko,
        seticRisiko,
        icCkRisiko,
        seticCkRisiko,
        icKomplikasi,
        seticKomplikasi,
        icCkKomplikasi,
        seticCkKomplikasi,
        icPrognosis,
        seticPrognosis,
        icCkPrognosis,
        seticCkPrognosis,
        icAltRes,
        seticAltRes,
        icCkAltRes,
        seticCkAltRes,
        icJenKel,
        seticJenKel,
        icUmur,
        seticUmur,
        icAlamat,
        seticAlamat,
        icHubungan,
        seticHubungan,
        // ic penundaan
        icDiagker,
        seticDiagker,
        icAlsPen,
        seticAlsPen,
        icDasDiagnosa,
        seticDasDiagnosa,
        icAlsProb,
        seticAlsProb,
        icRencana,
        seticRencana,
        icLainlain,
        seticLainlain,
        icAltLain,
        seticAltLain,
        // assesment awal
        aaBBa,
        setaaBBa,
        aaTBa,
        setaaTBa,
        aaSuhua,
        setaaSuhua,
        aaNadia,
        setaaNadia,
        aaRRa,
        setaaRRa,
        aaSistolea,
        setaaSistolea,
        aaDiastolea,
        setaaDiastolea,
        aaAssNyeria,
        setaaAssNyeria,
        aaAssResikoJatuha,
        setaaAssResikoJatuha,
        aaDiagnosaa,
        setaaDiagnosaa,
        ttvRajal, setttvRajal,
        dxRajal, setdxRajal,

        aaBBb,
        setaaBBb,
        aaTBb,
        setaaTBb,
        aaSuhub,
        setaaSuhub,
        aaNadib,
        setaaNadib,
        aaRRb,
        setaaRRb,
        aaSistoleb,
        setaaSistoleb,
        aaDiastoleb,
        setaaDiastoleb,
        aaAssNyerib,
        setaaAssNyerib,
        aaAssResikoJatuhb,
        setaaAssResikoJatuhb,
        aaDiagnosab,
        setaaDiagnosab,
        aaDrPenunjang,
        setaaDrPenunjang,
        aaPlanning,
        setaaPlanning,
        // form status eksterna
        listLookupPasien, setlistLookupPasien,
        tempLookupPasien, settempLookupPasien,
        diagnosa,
        setdiagnosa,
        hasilPa,
        sethasilPa,
        lokasiTumor,
        setlokasiTumor,
        stadium,
        setstadium,
        dataKlinis,
        setdataKlinis,
        tindakan, settindakan,
        penyinaran, setpenyinaran,
        listVolume,
        setlistVolume,
        tglSimulator,
        settglSimulator,
        teknis,
        setteknis,
        radiografer,
        setradiografer,
        dokter,
        setdokter,
        tglCt,
        settglCt,
        radiografer2,
        setradiografer2,
        clKepala,
        setclKepala,
        clThorax,
        setclThorax,
        clPelvis,
        setclPelvis,
        clCranio,
        setclCranio,
        clabdomen,
        setclabdomen,
        catatan,
        setcatatan,
        smlKepala, setsmlKepala,
        smlThorax, setsmlThorax,
        smlPelvis, setsmlPelvis,
        smlBrain, setsmlBrain,
        smlAbdomen, setsmlAbdomen,
        smlEktrimitas, setsmlEktrimitas,
        Ektrimitas, setEktrimitas,
        linac, setlinac,
        cblt1, setcblt1,
        cblt2, setcblt2,
        brakhi, setbrakhi,
        listDiagnosa, setlistDiagnosa,
        totalPenyinaran, settotalPenyinaran,
        // form status eksterna -- Modal
        mdLookupPasien, setmdLookupPasien,
        // form tps
        tpsPssPasien,
        settpsPssPasien,
        tpsPssTatto,
        settpsPssTatto,
        tpsAcc,
        settpsAcc,
        tpsSad,
        settpsSad,
        tpsSsd,
        settpsSsd,
        tpsXPlus,
        settpsXPlus,
        tpsXMin,
        settpsXMin,
        tpsYPlus,
        settpsYPlus,
        tpsYMin,
        settpsYMin,
        tpsCr,
        settpsCr,
        tpsGr,
        settpsGr,
        tpsHt,
        settpsHt,
        tpsWedgeFilter,
        settpsWedgeFilter,
        tpsLeadBlocks,
        settpsLeadBlocks,
        tpsJmlFraksi,
        settpsJmlFraksi,
        tpsDosisTumor,
        settpsDosisTumor,
        tpsDosisPermukaa,
        settpsDosisPermukaa,
        tpsWaktuRad,
        settpsWaktuRad,
        tpsDosisTotal,
        settpsDosisTotal,
        tpsCatatan,
        settpsCatatan,
        spTTVRajal, setspTTVRajal,
        spTTVRadio, setspTTVRadio,
        // form penyinaran
        pynMingguKe,
        setpynMingguKe,
        pynTglPyn,
        setpynTglPyn,
        pynWktRad,
        setpynWktRad,
        pynDosis,
        setpynDosis,
        pynLapangan,
        setpynLapangan,
        pynJmlLap,
        setpynJmlLap,
        pynDosisTtl,
        setpynDosisTtl,
        pynDokter,
        setpynDokter,
        pynPetugas,
        setpynPetugas,
        pynListPenyinaran,
        setpynListPenyinaran,
        pynIdListPenyinaran,
        setpynIdListPenyinaran,
        pynDrTrx, setpynDrTrx,
        stsEksPilih, setstsEksPilih,
        listRiwPenyinaran, setlistRiwPenyinaran,
        spRiwayatPenyinaran, setspRiwayatPenyinaran,
        //func
        getListOrder,
        getDataPasiendanStatusRd,
        getLoadDokter,
        getLoadRadiografer,
        getRiwayatRd,
        getListTrxpmr,
        getDataTidakOrder,
        getLookupPasien,
        getDiagnosaPx,
        getTTV,
        getTTVPenunjang,
        getRiwayatPenyinaran,
        simpanStatusEksterna,
        ReportStsEksterna,
        simpanPenyinaran,
        simpanTTVPenunjang,
        //mst
        listRd,
        setlistRd,
        listDokter,
        setlistDokter,
        //spin
        spTabelPasien,
        setspTabelPasien,
        spDataPasien,
        setspDataPasien,
        spRiwayatRd,
        setspRiwayatRd,
        spReportStsEks,
        setspReportStsEks,
        spGetDokter,
        setspGetDokter,
        spGetRadiografer,
        setspGetRadiografer,
        spPynSimpan,
        setspPynSimpan,
        spTrxPmr, setspTrxPmr,
        spHeaderPasien, setspHeaderPasien,
        spLookupPasien, setspLookupPasien,
        spTbDiagnosa, setspTbDiagnosa,
        //modal
        mdTambahVolume,
        setmdTambahVolume,
        mdTambahData,
        setmdTambahData,
        mdListStsEksterna, setmdListStsEksterna,
        mdListTrxPmr, setmdListTrxPmr,
        mdInfoUpdate, setmdInfoUpdate,
        mdInfoUpdateStsEksterna, setmdInfoUpdateStsEksterna,
        //cetak
        cetakStatusEksterna,
        setcetakStatusEksterna,
        cetakStatusRd,
        cetaklistVolume,
        // COBA BRIGGING
        // state
        // satuSehatToken, setsatuSehatToken,
        // satuSehatNik, setsatuSehatNik,
        // IHSPAtient, setIHSPAtient,
        // resGetPasien, setresGetPasien,
        // satuSehatNikPraktisi, setsatuSehatNikPraktisi,
        // IHSPraktisi, setIHSPraktisi,
        // resGetPraktisi, setresGetPraktisi,
        // IhsRs, setIhsRs,
        // regPas, setregPas,
        // satuSehatStatus, setsatuSehatStatus,
        // satuSehatNmPas, setsatuSehatNmPas,
        // satuSehatNmPrak, setsatuSehatNmPrak,
        // satuSehatLokasi, setsatuSehatLokasi,
        // satuSehatNmLokasi, setsatuSehatNmLokasi,
        // periodStart, setperiodStart,
        // periodEnd, setperiodEnd,
        // resPostEncounter, setresPostEncounter,
        // resPostDiagnostik, setresPostDiagnostik,
        // idEncounter, setidEncounter,
        // func
        // SatuSehatGetToken,
        // getPasinbyNIK,
        // getPraktisibyNIK,
        // postEncounter,
      }}
    >
      {props.children}
    </RadioterapiContext.Provider>
  );
};

export default RadioterapiContextProvider;

// COBA BRIGGING

// get token
// const SatuSehatGetToken = (data) => {
//   axios
//     .post(`${baseURL}/SatuSehat/Token`, data, {
//       headers: options.headers,
//     })
//     .then((res) => {
//       // console.log('satuSehat : ', res);
//       if (res.status === 200) {
//         setsatuSehatToken(res.data.access_token)
//       } else {
//         setspDataPasien(false)
//         Modal.error({
//           title: 'Gagal!',
//           content: `Gagal Disimpan Status Radioterapi Eksterna! -> ${res.data.message}.`,
//         });
//       }
//     })
// }

// get pasien by nik
// const getPasinbyNIK = (data) => {
//   axios
//     .get(`${baseURL}/SatuSehat/GetPasienByNIK/${data}/${satuSehatToken}`, options)
//     .then((response) => {
//       // console.log("getPasinbyNIK : ", response.data[0]);
//       // console.log(ihs);
//       let ihs = response.data[0].resource.id
//       setresGetPasien(response.data[0])
//       setIHSPAtient(ihs)
//       setsatuSehatNmPas(response.data[0].resource.name[0].text)
//     })
// }

// get pasien by nik
// const getPraktisibyNIK = (data) => {
//   axios
//     .get(`${baseURL}/SatuSehat/GetPractitionerByNIK/${data}/${satuSehatToken}`, options)
//     .then((response) => {
//       // console.log("getPasinbyNIK : ", response.data[0]);
//       // console.log(ihs);
//       let ihs = response.data[0].resource.id
//       setresGetPraktisi(response.data[0])
//       setIHSPraktisi(ihs)
//       setsatuSehatNmPrak(response.data[0].resource.name[0].text)
//     })
// }

// post ENCOUNTER
// const postEncounter = (data) => {
//   axios
//     .post(`${baseURL}/SatuSehat/Encounter/${satuSehatToken}`, data, {
//       headers: options.headers,
//     })
//     .then((res) => {
//       console.log('satuSehat : ', res);
//       console.log('satuSehat data : ', res.data.result);
//       setresPostEncounter(res.data.result)
//       setidEncounter(res.data.result.id)
//     })
// }
