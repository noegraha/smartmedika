import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { LoginContext } from "../../../rawatjalan/context";
import { message } from "antd";

import dayjs from "dayjs";
import "dayjs/locale/id";

export const IBSContext = createContext();

const IBSContextProvider = (props) => {
  // const { apiku } = useContext(LoginContext);

  const apiku = "182.168.6.72:5577";

  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const [pasienAjuanOP, setPasienAjuanOP] = useState([]);
  const [detailAjuan, setDetailAjuan] = useState("");

  const [dokterSp, setDokterSp] = useState([]);
  const [tindakanOP, setTindakanOP] = useState([]);
  const [tindakanPenyerta, setTindakanPenyerta] = useState([]);

  const [pasienLaporanOP, setPasienLaporanOP] = useState([]);
  const [detailLaporan, setDetailLaporan] = useState("");

  const [spin, setSpin] = useState(false);

  const dateFormat = ["DD-MM-YYYY", "DD-MM-YYYY", "YYYY-MM-DD"];
  const format = "HH:mm";

  // AJUAN OPERASI

  const cariAjuanOP = (tgl, cito) => {
    setSpin(true);
    axios
      .get(
        `${apiku}/EmrAjuanJadwalOperasi/LookupPermintaanOp/${tgl}/${cito}`,
        options
      )
      .then((res) => {
        const arrPas = [];
        for (var x = 0; x < res.data.result.length; x++) {
          arrPas.push({
            ajuanId: res.data.result[x].ajuanId,
            registrasiId: res.data.result[x].registrasiId,
            pasienId: res.data.result[x].pasienId,
            nama: res.data.result[x].nama,
            deskRuangId: res.data.result[x].deskRuangId,
            pelayananId: res.data.result[x].pelayananId,
            deskPelId: res.data.result[x].deskPelId,
            keterangan: res.data.result[x].keterangan,
            dxPraBedah: res.data.result[x].dxPraBedah,
            deskDxPraBedah:
              res.data.result[x].dxPraBedah +
              " - " +
              res.data.result[x].deskDxPraBedah,
            deskDokterId: res.data.result[x].deskDokterId,
            jadwalOperasiId: res.data.result[x].jadwalOperasiId,
            kodeTindakan: res.data.result[x].kodeTindakan,
            opDisetujui: res.data.result[x].opDisetujui,
            ruangOperasi: res.data.result[x].ruangOperasi,
            jam: res.data.result[x].jam,
            kodeAnestesi: res.data.result[x].kodeAnestesi,
            anestesi: res.data.result[x].anestesi,
            ruangId: res.data.result[x].ruangId,
            acceptable: res.data.result[x].acceptable,
            dokterId: res.data.result[x].dokterId,
          });
        }
        setPasienAjuanOP(arrPas);
        console.log("RESULT DARI AJUAN OP", res.data.result.length);
        setSpin(false);
      })
      .catch((err) => {
        console.log(err);
        setSpin(false);
      });
  };

  const cariDokterSpesialis = () => {
    setSpin(true);
    axios
      .get(`${apiku}/MstDokterSpesialisDetail/LookupSpesialis/%20`, options)
      .then((res) => {
        const arrPas = [];
        for (var x = 0; x < res.data.result.length; x++) {
          arrPas.push({
            dokterId: res.data.result[x].dokterId,
            namaDokter: res.data.result[x].namaDokter,
            spesialisId: res.data.result[x].spesialisId,
            deskrispi: res.data.result[x].deskripsi,
            status: res.data.result[x].status,
          });
        }
        setDokterSp(arrPas);
        setSpin(false);
        console.log("RESULT DARI DOKTER", res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cariTindakan = () => {
    setSpin(true);
    axios
      .get(`${apiku}/EmrAjuanJadwalOperasi/lookuptindakan/1/0/9411`, options)
      .then((res) => {
        const arrPas = [];
        for (var x = 0; x < res.data.result.length; x++) {
          arrPas.push({
            pelayananId: res.data.result[x].pelayananId,
            deskripsi: res.data.result[x].deskripsi,
          });
        }
        setTindakanOP(arrPas);
        setSpin(false);
        console.log("RESULT DARI TINDAKAN", res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const cariTindakanPenyerta = () => {
    setSpin(true);
    axios
      .get(
        `${apiku}/EmrAjuanJadwalOperasi/lookuptindakanpenyerta/1/0/9411`,
        options
      )
      .then((res) => {
        const arrPas = [];
        for (var x = 0; x < res.data.result.length; x++) {
          arrPas.push({
            pelayananId: res.data.result[x].pelayananId,
            deskripsi: res.data.result[x].deskripsi,
          });
        }
        setTindakanPenyerta(arrPas);
        setSpin(false);
        console.log("RESULT DARI TINDAKAN PENYERTA", res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailAjuanOP = (noreg, ajuan) => {
    setSpin(true);
    axios
      .get(`${apiku}/EmrAjuanJadwalOperasi/ID/${noreg}/${ajuan}`, options)
      .then((res) => {
        setDetailAjuan({
          ajuanId: res.data.result.ajuanId,
          jadwalOperasiId: res.data.result.jadwalOperasiId,
          registrasiId: res.data.result.registrasi.registrasiId,
          ruangId: res.data.result.registrasi.ruang.ruangId,
          pasienId: res.data.result.registrasi.pasienId,
          nama: res.data.result.registrasi.nama,
          alamat: res.data.result.registrasi.alamat,
          umur: res.data.result.registrasi.umur,
          namaIbu: res.data.result.registrasi.namaIbu,
          penanggungJawab: res.data.result.registrasi.penanggungJawab,
          jenisKelamin: res.data.result.registrasi.jenisKelamin.deskripsi,
          tglRegistrasi: res.data.result.registrasi.tglRegistrasi,
          pembayaran: res.data.result.registrasi.pembayaran.deskripsi,
          pelayananId: res.data.result.pelayanan.pelayanId,
          pelayanan: res.data.result.pelayanan.deskripsi,
          tglTindakan: res.data.result.tglTindakan,
          cito: res.data.result.cito ? "Cito" : "Reguler",
          dokterId: res.data.result.dokter.dokterId,
          dokter: res.data.result.dokter.namaDokter,
          jenisAnestesi: res.data.result.jenisAnestesi,
          dxPraBedah:
            res.data.result.dxPraBedah.dxPraBedah +
            " - " +
            res.data.result.dxPraBedah.deskripsi,
          kodeDxPraBedah: res.data.result.dxPraBedah.dxPraBedah,
          lokasiOperasi: res.data.result.lokasiOperasi,
          keterangan: res.data.result.keterangan,
          gcs: res.data.result.kondisiTerakhir.gcs,
          sistole: res.data.result.kondisiTerakhir.sistole,
          diastole: res.data.result.kondisiTerakhir.diastole,
          nadi: res.data.result.kondisiTerakhir.nadi,
          respirasi: res.data.result.kondisiTerakhir.respirasi,
          tb: res.data.result.kondisiTerakhir.tinggiBadan,
          bb: res.data.result.kondisiTerakhir.beratBadan,
          isiTekanan: res.data.result.kondisiTerakhir.isiTekanan,
          sifat: res.data.result.kondisiTerakhir.sifat,
          acceptable: res.data.result.acceptable,
          opDisetujui: res.data.result.detailJadwalOperasi.opDisetujui,
          deskOpDisetujui: res.data.result.detailJadwalOperasi.deskOpDisetujui,
          tindakanPenyertaId:
            res.data.result.detailJadwalOperasi.tindakanPenyertaId,
          deskTindakanPenyertaId:
            res.data.result.detailJadwalOperasi.deskTindakanPenyertaId,
          ok: res.data.result.detailJadwalOperasi.ok,
          jam: res.data.result.detailJadwalOperasi.jam
            ? dayjs(
                dayjs(res.data.result.tglTindakan).format(dateFormat[2]) +
                  " " +
                  res.data.result.detailJadwalOperasi.jam
              )
            : res.data.result.detailJadwalOperasi.jam,
          catatanIbs: res.data.result.catatanIbs,
          op1: res.data.result.detailJadwalOperasi.dokterId,
          deskOp1: res.data.result.detailJadwalOperasi.deskDokterId,
          op2: res.data.result.detailJadwalOperasi.kodeOperator2,
          deskOp2: res.data.result.detailJadwalOperasi.deskKodeOperator2,
          kodeAnestesi: res.data.result.detailJadwalOperasi.kodeAnestesi,
          deskKodeAnestesi:
            res.data.result.detailJadwalOperasi.deskKodeAnestesi,
          ruangOperasi: res.data.result.detailJadwalId.ruangOperasi,
        });
        setSpin(false);
        console.log("RESULT DARI DETAIL AJUAN OP", res.data.result);
        console.log(
          "JAM",
          dayjs(
            dayjs(res.data.result.tglTindakan).format(dateFormat[2]) +
              " " +
              res.data.result.detailJadwalOperasi.jam
          )
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const simpanAjuan = (dataAJuan) => {
    console.log("DATA POST AJUAN", dataAJuan);
    axios
      .post(`${apiku}/EmrDetailJadwalOperasi`, dataAJuan, {
        headers: options.headers,
      })
      .then((res) => {
        console.log("simpanAjuan", res);
        if (res.data.statusCode == 200) {
          message.success(res.data.message);
        } else {
          message.error(res.data.message + " - " + res.data.result);
        }
      })
      .catch((err) => {
        message.error(err);
        console.log("simpanAjuan", err);
      });
  };

  // LAPORAN OPERASI

  const cariLaporanOP = (tgl, cito) => {
    axios
      .get(`${apiku}/EmrLaporanOperasi/LookUp/${tgl}/${cito}`, options)
      .then((res) => {
        const arrPas = [];
        for (var x = 0; x < res.data.result.length; x++) {
          arrPas.push({
            tglOperasi: res.data.result[x].tglOperasi,
            registrasiId: res.data.result[x].registrasiId,
            pasienId: res.data.result[x].pasienId,
            nama: res.data.result[x].namaPasien,
            cito: res.data.result.cito ? "Cito" : "Reguler",
            ruangId: res.data.result[x].ruangId,
            deskRuangId: res.data.result[x].bangsal,
            dxPraBedah: res.data.result[x].dxPraBedah,
            deskDxPraBedah:
              res.data.result[x].dxPraBedah +
              " - " +
              res.data.result[x].diagnosa,
            pelayananId: res.data.result[x].pelayananId,
            tindakan: res.data.result[x].tindakan,
            dokterId: res.data.result[x].dokterId,
            deskDokterId: res.data.result[x].namaDokter,
            ruangOperasi: res.data.result[x].ruangOperasi,
            laporanOperasiId: res.data.result[x].laporanOperasiId,
            jadwalOperasiId: res.data.result[x].jadwalOperasiId,
            batal: res.data.result[x].batal,
          });
        }
        setPasienLaporanOP(arrPas);
        console.log("RESULT DARI LAPORAN OP", res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailLaporanOP = (nojadwal) => {
    axios
      .get(`${apiku}/EmrLaporanOperasi/GetbyNoJadwal/${nojadwal}`, options)
      .then((res) => {
        setDetailLaporan({
          nolaporan: res.data.result.nolaporan,
          registrasiId: res.data.result.registrasiId,
          pasienId: res.data.result.pasienId,
          tglRegistrasi: dayjs(res.data.result.tglRegistrasi).format(
            dateFormat[0]
          ),
          jamRegistrasi: dayjs(res.data.result.jamRegistrasi).format(format),
          nama: res.data.result.namaPasien,
          alamat: res.data.result.alamat,
          jenisKelamin: res.data.result.jenisKelamin,
          kelasRawat: res.data.result.kelasRawat,
          umur: res.data.result.umur,
          namaIbu: res.data.result.namaIbu,
          noPolish: res.data.result.noPolish,
          pembayaranId: res.data.result.pembayaranId,
          namaPembayaran: res.data.result.namaPembayaran,
          kodeBangsal: res.data.result.kodeBangsal,
          tanggal: res.data.result.Tanggal,
          laporanOperasiId:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.laporanOperasiId,
          kodeBangsal:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.kodeBangsal,
          tglOperasi:
            res.data.result.laporanOp == null
              ? dayjs().format()
              : res.data.result.laporanOp.tglOperasi,
          dokterId:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.dokterId,
          namaAsisten:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.namaAsisten,
          namaPerawat:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.namaPerawat,
          namaPenataAnestesi:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.namaPenataAnestesi,
          anestesiId:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.anestesiId,
          kodeDXPraBedah:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.kodeDXPraBedah,
          praBedah:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.praBedah,
          kodeDXPosBedah:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.kodeDXPosBedah,
          dxPosBedah:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.dxPosBedah,
          jenisAnestesi:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.jenisAnestesi,
          periksaPA:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.periksaPA,
          periksaPK:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.periksaPK,
          jenisPembedahan:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.jenisPembedahan,
          penggunaanDarah:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.penggunaanDarah,
          komplikasi:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.komplikasi,
          kodeTindakan:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.kodeTindakan,
          namaPmr:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.namaPmr,
          mulaiBedah:
            res.data.result.laporanOp == null
              ? dayjs().format()
              : res.data.result.laporanOp.mulaiBedah,
          selesaiBedah:
            res.data.result.laporanOp == null
              ? dayjs().format()
              : res.data.result.laporanOp.selesaiBedah,
          mulaiAnestesi:
            res.data.result.laporanOp == null
              ? dayjs().format()
              : res.data.result.laporanOp.mulaiAnestesi,
          selesaiAnestesi:
            res.data.result.laporanOp == null
              ? dayjs().format()
              : res.data.result.laporanOp.selesaiAnestesi,
          laporanOperasi:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.laporanOperasi,
          eksisi:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.eksisi,
          kodeDokterOperator2:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.kodeDokterOperator2,
          kodeDokterOperator3:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.kodeDokterOperator3,
          kodeDokterOperator4:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.kodeDokterOperator4,
          namaDokterOperator2:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.namaDokterOperator2,
          namaDokterOperator3:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.namaDokterOperator3,
          namaDokterOperator4:
            res.data.result.laporanOp == null
              ? ""
              : res.data.result.laporanOp.namaDokterOperator4,
        });
        console.log("RESULT DARI DETAIL LAPORAN OP", res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const simpanLaporanOP = (dataLaporan) => {
    console.log("DATA POST LAPORAN", dataLaporan);
    axios
      .post(`${apiku}/EmrLaporanOperasi/insert`, dataLaporan, {
        headers: options.headers,
      })
      .then((res) => {
        console.log("simpanLaporanOP", res);
      })
      .catch((err) => {
        console.log("simpanLaporanOP", err);
      });
  };

  return (
    <IBSContext.Provider
      value={{
        pasienAjuanOP,
        setPasienAjuanOP,
        cariAjuanOP,
        detailAjuan,
        setDetailAjuan,
        detailAjuanOP,
        simpanAjuan,
        pasienLaporanOP,
        setPasienLaporanOP,
        cariLaporanOP,
        detailLaporan,
        setDetailLaporan,
        detailLaporanOP,
        simpanLaporanOP,
        cariDokterSpesialis,
        dokterSp,
        cariTindakan,
        tindakanOP,
        cariTindakanPenyerta,
        tindakanPenyerta,
        spin,
      }}
    >
      {props.children}
    </IBSContext.Provider>
  );
};

export default IBSContextProvider;
