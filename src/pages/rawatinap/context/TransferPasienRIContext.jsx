import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { Modal, message } from "antd";
import dayjs from "dayjs";
import { LoginContext } from "../../rawatjalan/context";

export const TransferPasienRIContext = createContext();

const TransferPasienRiContextProvider = (props) => {
  const [serahTerimaPasienId, setserahTerimaPasienId] = useState(0);
  const [registrasiId, setregistrasiId] = useState("");
  const [ruangAsal, setruangAsal] = useState("");
  const [ruangTuju, setruangTuju] = useState("");
  const [petugasDihubungi, setpetugasDihubungi] = useState("");
  const [tanggalHub, settanggalHub] = useState("");
  const [jamHub, setjamHub] = useState("");
  const [tanggalTransfer, settanggalTransfer] = useState("");
  const [jamTransfer, setjamTransfer] = useState("");
  const [leveling, setleveling] = useState("");
  const [petugasDokter, setpetugasDokter] = useState("");
  const [petugasPerawat, setpetugasPerawat] = useState("");
  const [pramuRuang, setpramuRuang] = useState("");
  const [sopir, setsopir] = useState("");
  const [acls, setacls] = useState("");
  const [atls, setatls] = useState("");
  const [apn, setapn] = useState("");
  const [ppgd, setppgd] = useState("");
  const [bls1, setbls1] = useState("");
  const [bls2, setbls2] = useState("");
  const [tanggalMasuk, settanggalMasuk] = useState("");
  const [jamMasuk, setjamMasuk] = useState("");
  const [anamnesaTerima, setanamnesaTerima] = useState("");
  const [diagnosa, setdiagnosa] = useState("");
  const [indikasiDirawat, setindikasiDirawat] = useState("");
  const [tindakan, settindakan] = useState("");
  const [terapi, setterapi] = useState("");
  const [resiko, setresiko] = useState("");
  const [trkursi, settrkursi] = useState("");
  const [trbed, settrbed] = useState("");
  const [trbrankart, settrbrankart] = useState("");
  const [dokumen, setdokumen] = useState("");
  const [obatOral, setobatOral] = useState("");
  const [obatInjeksi, setobatInjeksi] = useState("");
  const [obatPasien, setobatPasien] = useState("");
  const [obatLain, setobatLain] = useState("");
  const [hasilLab, sethasilLab] = useState("");
  const [hasilMri, sethasilMri] = useState("");
  const [hasilCtscan, sethasilCtscan] = useState("");
  const [hasilUsg, sethasilUsg] = useState("");
  const [hasilRontgen, sethasilRontgen] = useState("");
  const [hasilLain, sethasilLain] = useState("");
  const [barangPasien, setbarangPasien] = useState("");
  const [lainLain, setlainLain] = useState("");
  const [sposebelum, setsposebelum] = useState("");
  const [pemeriksaanFisikSebelum, setpemeriksaanFisikSebelum] = useState("");
  const [kulainSebelum, setkulainSebelum] = useState("");
  const [tensiAtasSebelum, settensiAtasSebelum] = useState("");
  const [tensiBawahSebelum, settensiBawahSebelum] = useState("");
  const [nadiSebelum, setnadiSebelum] = useState("");
  const [rrsebelum, setrrsebelum] = useState("");
  const [suhuSebelum, setsuhuSebelum] = useState("");
  const [tensiAtasSesudah, settensiAtasSesudah] = useState("");
  const [tensiBawahSesudah, settensiBawahSesudah] = useState("");
  const [nadiSesudah, setnadiSesudah] = useState("");
  const [rrsesudah, setrrsesudah] = useState("");
  const [suhuSesudah, setsuhuSesudah] = useState("");
  const [sposesudah, setsposesudah] = useState("");
  const [pemeriksaanFisikSesudah, setpemeriksaanFisikSesudah] = useState("");
  const [kulainSesudah, setkulainSesudah] = useState("");
  const [tanggalSerah, settanggalSerah] = useState("");
  const [jamSerah, setjamSerah] = useState("");
  const [petugas1, setpetugas1] = useState("");
  const [petugas2, setpetugas2] = useState("");
  const [ttd1, setttd1] = useState("");
  const [ttd2, setttd2] = useState("");

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  //ambil data terima pasien RI berdasar Registrasi Id//
  const detailterimapasienRI = (id) => {
    axios
      .get(`${apiku}/EmrSerahTerimaPasien/ID/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setserahTerimaPasienId(res.data.result.serahTerimaPasienId);
          setruangAsal(res.data.result.ruangAsal);
          setruangTuju(res.data.result.ruangTuju);
          setpetugasDihubungi(res.data.result.petugasDihubungi);
          settanggalHub(dayjs(res.data.result.tanggalHub));
          setjamHub(dayjs(res.data.result.jamHub));
          settanggalTransfer(dayjs(res.data.result.tanggalTransfer));
          setjamTransfer(dayjs(res.data.result.jamTransfer));
          setleveling(res.data.result.leveling);
          setpetugasDokter(res.data.result.petugasDokter);
          setpetugasPerawat(res.data.result.petugasPerawat);
          setpramuRuang(res.data.result.pramuRuang);
          setsopir(res.data.result.sopir);
          setacls(res.data.result.acls);
          setatls(res.data.result.atls);
          setapn(res.data.result.apn);
          setppgd(res.data.result.ppgd);
          setbls1(res.data.result.bls1);
          setbls2(res.data.result.bls2);
          settanggalMasuk(dayjs(res.data.result.tanggalMasuk));
          setjamMasuk(dayjs(res.data.result.jamMasuk));
          setanamnesaTerima(res.data.result.anamnesa);
          setdiagnosa(res.data.result.diagnosa);
          setindikasiDirawat(res.data.result.indikasiDirawat);
          settindakan(res.data.result.tindakan);
          setterapi(res.data.result.terapi);
          setresiko(res.data.result.resiko);
          settrkursi(res.data.result.trkursi);
          settrbed(res.data.result.trbed);
          settrbrankart(res.data.result.trbrankart);
          setdokumen(res.data.result.dokumen);
          setobatOral(res.data.result.obatOral);
          setobatInjeksi(res.data.result.obatInjeksi);
          setobatPasien(res.data.result.obatPasien);
          setobatLain(res.data.result.obatLain);
          sethasilLab(res.data.result.hasilLab);
          sethasilMri(res.data.result.hasilMri);
          sethasilCtscan(res.data.result.hasilCtscan);
          sethasilUsg(res.data.result.hasilUsg);
          sethasilRontgen(res.data.result.hasilRontgen);
          sethasilLain(res.data.result.hasilLain);
          setbarangPasien(res.data.result.barangPasien);
          setlainLain(res.data.result.lainLain);
          setsposebelum(res.data.result.sposebelum);
          setpemeriksaanFisikSebelum(res.data.result.pemeriksaanFisikSebelum);
          setkulainSebelum(res.data.result.kulainSebelum);
          settensiAtasSebelum(res.data.result.tensiAtasSebelum);
          settensiBawahSebelum(res.data.result.tensiBawahSebelum);
          setnadiSebelum(res.data.result.nadiSebelum);
          setrrsebelum(res.data.result.rrsebelum);
          setsuhuSebelum(res.data.result.suhuSebelum);
          settensiAtasSesudah(res.data.result.tensiAtasSesudah);
          settensiBawahSesudah(res.data.result.tensiBawahSesudah);
          setnadiSesudah(res.data.result.nadiSesudah);
          setrrsesudah(res.data.result.rrsesudah);
          setsuhuSesudah(res.data.result.suhuSesudah);
          setsposesudah(res.data.result.sposesudah);
          setpemeriksaanFisikSesudah(res.data.result.pemeriksaanFisikSesudah);
          setkulainSesudah(res.data.result.kulainSesudah);
          settanggalSerah(dayjs(res.data.result.tanggalSerah));
          setjamSerah(dayjs(res.data.result.jamSerah));
          setpetugas1(res.data.result.petugas1);
          setpetugas2(res.data.result.petugas2);
          setttd1(res.data.result.ttd1);
          setttd2(res.data.result.ttd2);
        } else {
          console.log("terima masuk");
          setserahTerimaPasienId(0);
          setruangAsal("");
          setruangTuju("");
          setpetugasDihubungi("");
          settanggalHub(dayjs());
          setjamHub(dayjs());
          settanggalTransfer(dayjs());
          setjamTransfer(dayjs());
          setleveling("");
          setpetugasDokter("");
          setpetugasPerawat("");
          setpramuRuang("");
          setsopir("");
          setacls(null);
          setatls(null);
          setapn(null);
          setppgd(null);
          setbls1(null);
          setbls2(null);
          settanggalMasuk(dayjs());
          setjamMasuk(dayjs());
          setanamnesaTerima("");
          setdiagnosa("");
          setindikasiDirawat("");
          settindakan("");
          setterapi("");
          setresiko("");
          settrkursi(null);
          settrbed(null);
          settrbrankart(null);
          setdokumen(null);
          setobatOral(null);
          setobatInjeksi(null);
          setobatPasien(null);
          setobatLain(null);
          sethasilLab(null);
          sethasilMri(null);
          sethasilCtscan(null);
          sethasilUsg(null);
          sethasilRontgen(null);
          sethasilLain(null);
          setbarangPasien("");
          setlainLain("");
          setsposebelum("");
          setpemeriksaanFisikSebelum("");
          setkulainSebelum("");
          settensiAtasSebelum("");
          settensiBawahSebelum("");
          setnadiSebelum("");
          setrrsebelum("");
          setsuhuSebelum("");
          settensiAtasSesudah("");
          settensiBawahSesudah("");
          setnadiSesudah("");
          setrrsesudah("");
          setsuhuSesudah("");
          setsposesudah("");
          setpemeriksaanFisikSesudah("");
          setkulainSesudah("");
          settanggalSerah(dayjs());
          setjamSerah(dayjs());
          setpetugas1("");
          setpetugas2("");
          setttd1("");
          setttd2("");
        }
      })
      .catch((err) => {
        message.error("Error Saat Mengambil Data!");
        setserahTerimaPasienId(0);
        setruangAsal("");
        setruangTuju("");
        setpetugasDihubungi("");
        settanggalHub(dayjs());
        setjamHub(dayjs());
        settanggalTransfer(dayjs());
        setjamTransfer(dayjs());
        setleveling("");
        setpetugasDokter("");
        setpetugasPerawat("");
        setpramuRuang("");
        setsopir("");
        setacls(null);
        setatls(null);
        setapn(null);
        setppgd(null);
        setbls1(null);
        setbls2(null);
        settanggalMasuk(dayjs());
        setjamMasuk(dayjs());
        setanamnesaTerima("");
        setdiagnosa("");
        setindikasiDirawat("");
        settindakan("");
        setterapi("");
        setresiko("");
        settrkursi(null);
        settrbed(null);
        settrbrankart(null);
        setdokumen(null);
        setobatOral(null);
        setobatInjeksi(null);
        setobatPasien(null);
        setobatLain(null);
        sethasilLab(null);
        sethasilMri(null);
        sethasilCtscan(null);
        sethasilUsg(null);
        sethasilRontgen(null);
        sethasilLain(null);
        setbarangPasien("");
        setlainLain("");
        setsposebelum("");
        setpemeriksaanFisikSebelum("");
        setkulainSebelum("");
        settensiAtasSebelum("");
        settensiBawahSebelum("");
        setnadiSebelum("");
        setrrsebelum("");
        setsuhuSebelum("");
        settensiAtasSesudah("");
        settensiBawahSesudah("");
        setnadiSesudah("");
        setrrsesudah("");
        setsuhuSesudah("");
        setsposesudah("");
        setpemeriksaanFisikSesudah("");
        setkulainSesudah("");
        settanggalSerah(dayjs());
        setjamSerah(dayjs());
        setpetugas1("");
        setpetugas2("");
        setttd1("");
        setttd2("");
      });
  };

  //tambah data terima pasien RI //
  const insertTerimapasienRI = (dataterimapasienri) => {
    console.log(dataterimapasienri);
    axios
      .post(`${apiku}/EmrSerahTerimaPasien`, dataterimapasienri, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //   console.log(res.data.result);
          // message.success("Data Terima Pasien Berhasil Disimpan!");
          //   Modal.warning({
          //     title: "Gagal Menyimpan Data!",
          //     content: JSON.stringify(res.data),
          //   });
        } else {
          // Modal.warning({
          //   title: "Gagal Menyimpan Data!",
          //   content: JSON.stringify(res.data),
          // });
          //   console.log(res.data);
        }
      })
      .catch((res) => {
        // Modal.error({
        //   title: "ERROR, BAD REQUST!",
        //   content: JSON.stringify(res.data),
        // });
        // console.log(res.error);
      });
  };

  const kosongkanformterimapasienri = () => {};

  return (
    <TransferPasienRIContext.Provider
      value={{
        serahTerimaPasienId,
        setserahTerimaPasienId,
        registrasiId,
        setregistrasiId,
        ruangAsal,
        setruangAsal,
        ruangTuju,
        setruangTuju,
        petugasDihubungi,
        setpetugasDihubungi,
        tanggalHub,
        settanggalHub,
        jamHub,
        setjamHub,
        tanggalTransfer,
        settanggalTransfer,
        jamTransfer,
        setjamTransfer,
        leveling,
        setleveling,
        petugasDokter,
        setpetugasDokter,
        petugasPerawat,
        setpetugasPerawat,
        pramuRuang,
        setpramuRuang,
        sopir,
        setsopir,
        acls,
        setacls,
        atls,
        setatls,
        apn,
        setapn,
        ppgd,
        setppgd,
        bls1,
        setbls1,
        bls2,
        setbls2,
        tanggalMasuk,
        settanggalMasuk,
        jamMasuk,
        setjamMasuk,
        anamnesaTerima,
        setanamnesaTerima,
        diagnosa,
        setdiagnosa,
        indikasiDirawat,
        setindikasiDirawat,
        tindakan,
        settindakan,
        terapi,
        setterapi,
        resiko,
        setresiko,
        trkursi,
        settrkursi,
        trbed,
        settrbed,
        trbrankart,
        settrbrankart,
        dokumen,
        setdokumen,
        obatOral,
        setobatOral,
        obatInjeksi,
        setobatInjeksi,
        obatPasien,
        setobatPasien,
        obatLain,
        setobatLain,
        hasilLab,
        sethasilLab,
        hasilMri,
        sethasilMri,
        hasilCtscan,
        sethasilCtscan,
        hasilUsg,
        sethasilUsg,
        hasilRontgen,
        sethasilRontgen,
        hasilLain,
        sethasilLain,
        barangPasien,
        setbarangPasien,
        lainLain,
        setlainLain,
        sposebelum,
        setsposebelum,
        pemeriksaanFisikSebelum,
        setpemeriksaanFisikSebelum,
        kulainSebelum,
        setkulainSebelum,
        tensiAtasSebelum,
        settensiAtasSebelum,
        tensiBawahSebelum,
        settensiBawahSebelum,
        nadiSebelum,
        setnadiSebelum,
        rrsebelum,
        setrrsebelum,
        suhuSebelum,
        setsuhuSebelum,
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
        sposesudah,
        setsposesudah,
        pemeriksaanFisikSesudah,
        setpemeriksaanFisikSesudah,
        kulainSesudah,
        setkulainSesudah,
        tanggalSerah,
        settanggalSerah,
        jamSerah,
        setjamSerah,
        petugas1,
        setpetugas1,
        petugas2,
        setpetugas2,
        ttd1,
        setttd1,
        ttd2,
        setttd2,
        detailterimapasienRI,
        insertTerimapasienRI,
      }}
    >
      {props.children}
    </TransferPasienRIContext.Provider>
  );
};

export default TransferPasienRiContextProvider;
