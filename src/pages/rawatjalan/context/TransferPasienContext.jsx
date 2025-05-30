import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { AnamnesaContext } from "./AnamnesaContext";
import { CatatanmedisContext } from "./CatatanmedisContext";
import dayjs from "dayjs";
import { DiagnosaContext } from "./Diagnosacontext";

export const TransferPasienContext = createContext();

const TransferPasienContextProvider = (props) => {
  const [serahTerima, setSerahTerima] = useState("");
  const { sistolik, diastolik, suhu, nadi, saturasi, iramanadi, resikojatuh } =
    useContext(AnamnesaContext);
  const { subjektif, assesment, planning } = useContext(CatatanmedisContext);
  const { isidiagnosa } = useContext(DiagnosaContext);
  const isi =
    assesment !== null
      ? assesment.concat("\n [ ", isidiagnosa, " ]")
      : isidiagnosa;

  const [tensiAtasSesudah, settensiAtasSesudah] = useState([]);
  const [tensiBawahSesudah, settensiBawahSesudah] = useState([]);
  const [nadiSesudah, setnadiSesudah] = useState([]);
  const [rrsesudah, setrrsesudah] = useState([]);
  const [suhuSesudah, setsuhuSesudah] = useState([]);
  const [pemeriksaanFisikSesudah, setpemeriksaanFisikSesudah] = useState([]);
  const [kulainSesudah, setkulainSesudah] = useState([]);
  const [sposesudah, setsposesudah] = useState([]);
  const [transfer, setTransfer] = useState([]);

  const [indikasidirawat, setIndikasi] = useState(null);
  const [ruanganmasuk, setRuang] = useState(null);
  const [nama, setNama] = useState(null);
  const [tanggal, setTanggal] = useState(dayjs());
  const [tanggaltransfer, setTanggalTransfer] = useState(dayjs());
  const [dokter, setDokter] = useState(null);
  const [perawat, setPerawat] = useState(null);
  const [pramu, setPramu] = useState(null);
  const [sopir, setSopir] = useState(null);
  const [level, setLeveling] = useState(0);
  const [anamnesa, setAnamnesa] = useState(subjektif);
  const [diagnosa, setDiagnosa] = useState(isi);
  const [indikasin, setIndikasin] = useState(null);
  const [tindakan, setTindakan] = useState(null);
  const [terapi, setTerapi] = useState(planning);
  const [resiko, setResiko] = useState(resikojatuh);
  const [barang, setBarang] = useState(null);
  const [lain, setLain] = useState(null);
  const [tensiatassebelum, setTensiAtasSebelum] = useState(sistolik);
  const [tensibawahsebelum, setTensiBawahSebelum] = useState(diastolik);
  const [nadisebelum, setNadiSebelum] = useState(nadi);
  const [rrsebelum, setRRSebelum] = useState(iramanadi);
  const [suhusebelum, setSuhuSebelum] = useState(suhu);
  const [respsebelum, setRespSebelum] = useState(saturasi);
  const [pemfisiksebelum, setPemfisikSebelum] = useState(null);
  const [lainlainsebelum, setLainlainSebelum] = useState(null);
  const [tensiatassesudah, setTensiAtasSesudah] = useState(sistolik);
  const [tensibawahsesudah, setTensiBawahSesudah] = useState(diastolik);
  const [nadisesudah, setNadiSesudah] = useState(nadi);
  const [rrsesudahs, setRRSesudah] = useState(iramanadi);
  const [suhusesudah, setSuhuSesudah] = useState(suhu);
  const [respsesudah, setRespSesudah] = useState(saturasi);
  const [pemfisiksesudah, setPemfisikSesudah] = useState(null);
  const [lainlainsesudah, setLainlainSesudah] = useState(null);
  const [tanggalserah, setTanggalserah] = useState(dayjs());
  const [acls, setACLS] = useState(false);
  const [atls, setATLS] = useState(false);
  const [apn, setAPN] = useState(false);
  const [ppgd, setPPGD] = useState(false);
  const [bls1, setBLS1] = useState(false);
  const [bls2, setBLS2] = useState(false);
  const [rm, setRM] = useState(false);
  const [obatoral, setObatoral] = useState(false);
  const [obatinjeksi, setObatinjeksi] = useState(false);
  const [obatpasien, setObatpasien] = useState(false);
  const [laborat, setLaborat] = useState(false);
  const [mri, setMRI] = useState(false);
  const [ctscan, setCTscan] = useState(false);
  const [usg, setUSG] = useState(false);
  const [rontgen, setRontgen] = useState(false);
  const [lainnya, setLainnya] = useState(false);
  const [petugas1, setPetugas1] = useState(null);
  const [petugas2, setPetugas2] = useState(null);
  const [bed, setBed] = useState(false);
  const [kursi, setKursi] = useState(false);
  const [brankart, setBrankart] = useState(false);
  const [ruangAsal, setRuangAsal] = useState(null);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertTransfer = (datatransfer) => {
    axios
      .post(`${apiku}/EmrSerahTerimaPasien`, datatransfer, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const detailTransfer = (id) => {
    axios
      .get(`${apiku}/EmrSerahTerimaPasien/ID/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTransfer(res.data.result);
          setIndikasi(res.data.result.indikasiDirawat);
          setRuang(res.data.result.ruangTuju);
          setRuangAsal(res.data.result.ruangAsal);
          setNama(res.data.result.petugasDihubungi);
          setTanggal(dayjs(res.data.result.tanggalHub));
          setTanggalTransfer(dayjs(res.data.result.tanggalTransfer));
          setDokter(res.data.result.petugasDokter);
          setPerawat(res.data.result.petugasPerawat);
          setPramu(res.data.result.pramuRuang);
          setSopir(res.data.result.sopir);
          setLeveling(res.data.result.leveling);
          setAnamnesa(res.data.result.anamnesa);
          setDiagnosa(res.data.result.diagnosa);
          setIndikasin(res.data.result.indikasiDirawat);
          setTindakan(res.data.result.tindakan);
          setTerapi(res.data.result.terapi);
          setResiko(res.data.result.resiko);
          setBarang(res.data.result.barangPasien);
          setLain(res.data.result.lainLain);
          setTensiAtasSebelum(res.data.result.tensiAtasSebelum);
          setTensiBawahSebelum(res.data.result.tensiBawahSebelum);
          setNadiSebelum(res.data.result.nadiSebelum);
          setRRSebelum(res.data.result.rrsebelum);
          setSuhuSebelum(res.data.result.suhuSebelum);
          setRespSebelum(res.data.result.sposebelum);
          setPemfisikSebelum(res.data.result.pemeriksaanFisikSebelum);
          setLainlainSebelum(res.data.result.kulainSebelum);
          setTensiAtasSesudah(res.data.result.tensiAtasSesudah);
          setTensiBawahSesudah(res.data.result.tensiBawahSesudah);
          setNadiSesudah(res.data.result.nadiSesudah);
          setRRSesudah(res.data.result.rrsesudah);
          setSuhuSesudah(res.data.result.suhuSesudah);
          setRespSesudah(res.data.result.sposesudah);
          setPemfisikSesudah(res.data.result.pemeriksaanFisikSesudah);
          setLainlainSesudah(res.data.result.kulainSesudah);
          setTanggalserah(dayjs(res.data.result.tanggalSerah));
          setACLS(res.data.result.acls);
          setATLS(res.data.result.atls);
          setAPN(res.data.result.apn);
          setPPGD(res.data.result.ppgd);
          setBLS1(res.data.result.bls1);
          setBLS2(res.data.result.bls2);
          setRM(res.data.result.dokumen);
          setObatoral(res.data.result.obatOral);
          setObatinjeksi(res.data.result.obatInjeksi);
          setObatpasien(res.data.result.obatPasien);
          setLaborat(res.data.result.hasilLab);
          setMRI(res.data.result.hasilMri);
          setCTscan(res.data.result.hasilCtscan);
          setUSG(res.data.result.hasilUsg);
          setRontgen(res.data.result.hasilRontgen);
          setLainnya(res.data.result.hasilLain);
          setPetugas1(res.data.result.petugas1);
          setPetugas2(res.data.result.petugas2);
          setBed(res.data.result.trbed);
          setKursi(res.data.result.trkursi);
          setBrankart(res.data.result.trbrankart);
        } else {
          setTransfer([]);
          setIndikasi(null);
          setRuang(null);
          setNama(null);
          setTanggal(dayjs());
          setTanggalTransfer(dayjs());
          setDokter(null);
          setPerawat(null);
          setPramu(null);
          setSopir(null);
          setLeveling(0);
          setAnamnesa(subjektif);
          setDiagnosa(isi);
          setIndikasin(null);
          setTindakan(null);
          setTerapi(planning);
          setResiko(resikojatuh);
          setBarang(null);
          setLain(null);
          setTensiAtasSebelum(sistolik);
          setTensiBawahSebelum(diastolik);
          setNadiSebelum(nadi);
          setRRSebelum(iramanadi);
          setSuhuSebelum(suhu);
          setRespSebelum(saturasi);
          setPemfisikSebelum(null);
          setLainlainSebelum(null);
          setTensiAtasSesudah(sistolik);
          setTensiBawahSesudah(diastolik);
          setNadiSesudah(nadi);
          setRRSesudah(iramanadi);
          setSuhuSesudah(suhu);
          setRespSesudah(saturasi);
          setPemfisikSesudah(null);
          setLainlainSesudah(null);
          setTanggalserah(dayjs());
          setACLS(false);
          setATLS(false);
          setAPN(false);
          setPPGD(false);
          setBLS1(false);
          setBLS2(false);
          setRM(false);
          setObatoral(false);
          setObatinjeksi(false);
          setObatpasien(false);
          setLaborat(false);
          setMRI(false);
          setCTscan(false);
          setUSG(false);
          setRontgen(false);
          setLainnya(false);
          setPetugas1(null);
          setPetugas2(null);
          setBed(false);
          setKursi(false);
          setBrankart(false);
          setRuangAsal(null);
          console.log("kosong");
        }
      })
      .catch((err) => {
        setTransfer([]);
        setIndikasi(null);
        setRuang(null);
        setNama(null);
        setTanggal(dayjs());
        setTanggalTransfer(dayjs());
        setDokter(null);
        setPerawat(null);
        setPramu(null);
        setSopir(null);
        setLeveling(0);
        setAnamnesa(subjektif);
        setDiagnosa(isi);
        setIndikasin(null);
        setTindakan(null);
        setTerapi(planning);
        setResiko(resikojatuh);
        setBarang(null);
        setLain(null);
        setTensiAtasSebelum(sistolik);
        setTensiBawahSebelum(diastolik);
        setNadiSebelum(nadi);
        setRRSebelum(iramanadi);
        setSuhuSebelum(suhu);
        setRespSebelum(saturasi);
        setPemfisikSebelum(null);
        setLainlainSebelum(null);
        setTensiAtasSesudah(sistolik);
        setTensiBawahSesudah(diastolik);
        setNadiSesudah(nadi);
        setRRSesudah(iramanadi);
        setSuhuSesudah(suhu);
        setRespSesudah(saturasi);
        setPemfisikSesudah(null);
        setLainlainSesudah(null);
        setTanggalserah(dayjs());
        setACLS(false);
        setATLS(false);
        setAPN(false);
        setPPGD(false);
        setBLS1(false);
        setBLS2(false);
        setRM(false);
        setObatoral(false);
        setObatinjeksi(false);
        setObatpasien(false);
        setLaborat(false);
        setMRI(false);
        setCTscan(false);
        setUSG(false);
        setRontgen(false);
        setLainnya(false);
        setPetugas1(null);
        setPetugas2(null);
        setBed(false);
        setKursi(false);
        setBrankart(false);
        setRuangAsal(null);
        console.log(err);
      });
  };

  //ambil data terima pasien RI berdasar Registrasi Id//
  const detailterimapasienRI = (id) => {
    axios
      .get(`${apiku}/EmrSerahTerimaPasien/ID/${id}`, options)
      .then((res) => {
        setSerahTerima(res.data.result);
        settensiAtasSesudah(res.data.result.tensiAtasSesudah);
        settensiBawahSesudah(res.data.result.tensiBawahSesudah);
        setnadiSesudah(res.data.result.nadiSesudah);
        setrrsesudah(res.data.result.rrsesudah);
        setsuhuSesudah(res.data.result.suhuSesudah);
        setpemeriksaanFisikSesudah(res.data.result.pemeriksaanFisikSesudah);
        setkulainSesudah(res.data.result.kulainSesudah);
        setsposesudah(res.data.result.sposesudah);
        console.log(res.data.result);
      }, [])
      .catch((err) => {
        // console.log(err);
        setSerahTerima("");
        settensiAtasSesudah("");
        settensiBawahSesudah("");
        setnadiSesudah("");
        setrrsesudah("");
        setsuhuSesudah("");
        setpemeriksaanFisikSesudah("");
        setkulainSesudah("");
        setsposesudah("");
        console.log("datakosong");
      });
  };

  //tambah data terima pasien RI //
  const insertTerimapasienRI = (dataterimapasienri) => {
    axios
      .post(`${apiku}/EmrSerahTerimaPasien`, dataterimapasienri, {
        headers: options.headers,
      })
      .then((res) => {
        console.log(res.data.result);
        message.success("Berhasil Disimpan!");
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const kosongkanformterimapasienri = () => {
    settensiAtasSesudah("");
    settensiBawahSesudah("");
    setnadiSesudah("");
    setrrsesudah("");
    setsuhuSesudah("");
    setpemeriksaanFisikSesudah("");
    setkulainSesudah("");
    setsposesudah("");
  };

  return (
    <TransferPasienContext.Provider
      value={{
        transfer,
        insertTransfer,
        detailTransfer,

        //data terima pasien rawat inap//
        detailterimapasienRI,
        insertTerimapasienRI,
        tensiAtasSesudah,
        settensiAtasSesudah,
        tensiBawahSesudah,
        settensiBawahSesudah,
        nadiSesudah,
        setnadiSesudah,
        rrsesudah,
        setrrsesudah,
        suhuSesudah,
        setsuhuSesudah,
        pemeriksaanFisikSesudah,
        setpemeriksaanFisikSesudah,
        kulainSesudah,
        setkulainSesudah,
        sposesudah,
        setsposesudah,
        kosongkanformterimapasienri,
        indikasidirawat,
        setIndikasi,
        ruanganmasuk,
        setRuang,
        nama,
        setNama,
        tanggal,
        setTanggal,
        tanggaltransfer,
        setTanggalTransfer,
        dokter,
        setDokter,
        perawat,
        setPerawat,
        pramu,
        setPramu,
        sopir,
        setSopir,
        level,
        setLeveling,
        anamnesa,
        setAnamnesa,
        diagnosa,
        setDiagnosa,
        indikasin,
        setIndikasin,
        tindakan,
        setTindakan,
        terapi,
        setTerapi,
        resiko,
        setResiko,
        barang,
        setBarang,
        lain,
        setLain,
        tensiatassebelum,
        setTensiAtasSebelum,
        tensibawahsebelum,
        setTensiBawahSebelum,
        nadisebelum,
        setNadiSebelum,
        rrsebelum,
        setRRSebelum,
        suhusebelum,
        setSuhuSebelum,
        respsebelum,
        setRespSebelum,
        pemfisiksebelum,
        setPemfisikSebelum,
        lainlainsebelum,
        setLainlainSebelum,
        tensiatassesudah,
        setTensiAtasSesudah,
        tensibawahsesudah,
        setTensiBawahSesudah,
        nadisesudah,
        setNadiSesudah,
        rrsesudahs,
        setRRSesudah,
        suhusesudah,
        setSuhuSesudah,
        respsesudah,
        setRespSesudah,
        pemfisiksesudah,
        setPemfisikSesudah,
        lainlainsesudah,
        setLainlainSesudah,
        tanggalserah,
        setTanggalserah,
        acls,
        setACLS,
        atls,
        setATLS,
        apn,
        setAPN,
        ppgd,
        setPPGD,
        bls1,
        setBLS1,
        bls2,
        setBLS2,
        rm,
        setRM,
        obatoral,
        setObatoral,
        obatinjeksi,
        setObatinjeksi,
        obatpasien,
        setObatpasien,
        laborat,
        setLaborat,
        mri,
        setMRI,
        ctscan,
        setCTscan,
        usg,
        setUSG,
        rontgen,
        setRontgen,
        lainnya,
        setLainnya,
        petugas1,
        setPetugas1,
        petugas2,
        setPetugas2,
        bed,
        setBed,
        kursi,
        setKursi,
        brankart,
        setBrankart,
        isi,
        serahTerima,
        setSerahTerima,
        ruangAsal,
      }}
    >
      {props.children}
    </TransferPasienContext.Provider>
  );
};

export default TransferPasienContextProvider;
