import React, { createContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";
import dayjs from "dayjs";

export const MasterPPDSContext = createContext();

const MasterPPDSContextProvider = (props) => {
  const [ppdsId, setPpdsId] = useState("");
  const [namaPPDS, setNamaPPDS] = useState("");
  const [jenisKelamin, setJenisKelamin] = useState("");
  const [alamatPPDS, setAlamatPPDS] = useState("");
  const [telponPPDS, setTelponPPDS] = useState("");
  const [teleponPraktek, setTeleponPraktek] = useState("");
  const [spesialisId, setSpesialisId] = useState("");
  const [spesialisDesk, setSpesialisDesk] = useState("");
  const [ruangId, setRuangId] = useState("");
  const [ruangDesk, setRuangDesk] = useState("");
  const [maxpasien, setMaxPasien] = useState(0);
  const [kategori, setKategori] = useState("");
  const [kategoriDokter, setKategoriDokter] = useState("");
  const [mulaiAktif, setMulaiAktif] = useState("");
  const [aktifSampai, setAktifSampai] = useState("");
  const [tandaTanganBinner, setTandaTanganBinner] = useState("");
  const [username, setUsername] = useState("");
  const [password, setpassword] = useState("");
  const [nim, setNim] = useState("");
  const [kompetensi, setKompetensi] = useState("");
  const [noSIP, setNoSIP] = useState("");
  const [tglAkhirSIP, setTglAkhirSIP] = useState("");
  const [noSTR, setNoSTR] = useState("");
  const [tglAkhirSTR, setTglAkhirSTR] = useState("");
  const [asalUniversitas, setAsalUniversitas] = useState("");
  const [nikPpds, setnikPpds] = useState("");
  const [tmpLahir, settmpLahir] = useState("");
  const [tglLahir, settglLahir] = useState("");
  const [data, setData] = useState([]);
  const [clickIndex, setClickIndex] = useState(0);
  const [modalPPDS, setmodalPPDS] = useState(false);
  const [listPPDS, setlistPPDS] = useState([]);
  const [modalAkses, setmodalAkses] = useState(false);
  const [modalAkun, setmodalAkun] = useState(false);

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getListPPDS = (id) => {
    axios
      .get(`${apiku}/MstDokter/PPDS`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistPPDS(res.data.result);
        } else {
          setlistPPDS([]);
        }
      })
      .catch((err) => {
        setlistPPDS([]);
        message.error("Error Saat Mengambil Data!");
      });
  };

  const getListPPDSDetail = (id) => {
    axios
      .get(`${apiku}/MstDokter/PPDSNew`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistPPDS(res.data.result);
          console.log(res.data.result);
        } else {
          setlistPPDS([]);
        }
      })
      .catch((err) => {
        setlistPPDS([]);
        message.error("Error Saat Mengambil Data!");
      });
  };

  const postPPDSWA = async (datappds, datauser, wa) => {
    try {
      // Step 1: Enroll PPDS
      const enrollResponse = await axios.post(
        `${apiku}/MstDokter/PPDSNew`,
        datappds,
        options
      );
      console.log("Enroll Response:", enrollResponse);

      if (enrollResponse.data.statusCode !== 200) {
        setPpdsId("");
        return Modal.warning({ content: "Gagal Menyimpan Data PPDS!" });
      }

      const idppds = enrollResponse.data.result;
      datauser = { ...datauser, pegawaiId: idppds };

      // Step 2: Encrypt Data
      const encryptResponse = await axios.post(
        `${apiku}/SisJwt/Encrypt`,
        datauser,
        options
      );
      console.log("Encrypt Response:", encryptResponse);

      if (encryptResponse.data.statusCode !== 200) {
        setPpdsId(idppds);
        return Modal.warning({ content: "Gagal Mengenkripsi Data!" });
      }

      // Step 3: Send WhatsApp Notification
      const waResponse = await axios.post(
        `${apiku}/BridgeWa/KirimWA`,
        wa,
        options
      );
      console.log("WhatsApp Response:", waResponse);

      if (waResponse.data.statusCode !== 200) {
        setPpdsId(idppds);
        return Modal.warning({
          content: "Data Disimpan, Tapi Gagal Mengirim WA!",
        });
      }
      getListPPDSDetail();
      setPpdsId("");
      // If all steps succeed
      Modal.success({
        content: "Berhasil Menyimpan Data PPDS dan Mengirim WA!",
      });
    } catch (error) {
      console.error("Error:", error);
      setPpdsId("");
      Modal.error({ content: "Terjadi Kesalahan Koneksi!" });
    }
  };

  const postPPDS = async (datappds, datauser) => {
    console.log("masuk");
    try {
      const enrollResponse = await axios.post(
        `${apiku}/MstDokter/PPDSNew`,
        datappds,
        options
      );
      console.log(enrollResponse);
      if (enrollResponse.data.statusCode !== 200) {
        return Modal.warning({ content: "Gagal Menyimpan Data Master!" });
      }
      const idppds = enrollResponse.data.result;
      const datauserupdate = { ...datauser, pegawaiId: idppds };
      const encryptResponse = await axios.post(
        `${apiku}/SisJwt/Encrypt`,
        datauserupdate,
        options
      );
      console.log(encryptResponse);
      if (encryptResponse.data.statusCode === 200) {
        getListPPDSDetail();
        setPpdsId("");
        Modal.success({ content: "Berhasil Simpan Data PPDS!" });
        setmodalPPDS(false);
        setmodalAkun(false);
      } else {
        setPpdsId(idppds);
        Modal.warning({ content: encryptResponse.data.result });
      }
    } catch (error) {
      setPpdsId("");
      Modal.error({ content: "Terjadi Kesalahan Koneksi!" });
    }
  };

  const postPPDSmaster = (datappds) => {
    console.log("hanya master");
    axios
      .post(`${apiku}/MstDokter/PPDSNew`, datappds, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getListPPDSDetail();
          Modal.success({ content: "Berhasil Simpan Data PPDS!" });
          setmodalPPDS(false);
        } else {
          Modal.warning({ content: "Gagal Menyimpan Data PPDS!" });
        }
      })
      .catch((err) => {
        // setloading(false);
        Modal.error({ content: "Terjadi Kesalahan Koneksi!" });
      });
  };

  const postUserAkses = (dataruang) => {
    // setloading(true);
    axios
      .post(`${apiku}/SisJwt/UserBagAkses`, dataruang, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getListPPDSDetail();
          Modal.success({ content: "Berhasil Simpan Data Ruang!" });
        } else {
          Modal.warning({ content: "Gagal Menyimpan Data Ruang!" });
        }
      })
      .catch((err) => {
        // setloading(false);
        Modal.error({ content: "Terjadi Kesalahan Koneksi!" });
      });
  };

  const postWa = (user) => {
    // setloading(true);
    axios
      .get(`${apiku}/SisJwt/CekPassPPDS/${user}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({ content: "Berhasil Mengirim Data!" });
        } else {
          Modal.warning({ content: res.data.message });
        }
      })
      .catch((err) => {
        Modal.error({ content: "Terjadi Kesalahan Koneksi!" });
      });
  };

  return (
    <MasterPPDSContext.Provider
      value={{
        ppdsId,
        setPpdsId,
        namaPPDS,
        setNamaPPDS,
        jenisKelamin,
        setJenisKelamin,
        alamatPPDS,
        setAlamatPPDS,
        telponPPDS,
        setTelponPPDS,
        teleponPraktek,
        setTeleponPraktek,
        spesialisId,
        setSpesialisId,
        spesialisDesk,
        setSpesialisDesk,
        ruangId,
        setRuangId,
        ruangDesk,
        setRuangDesk,
        maxpasien,
        setMaxPasien,
        kategori,
        setKategori,
        kategoriDokter,
        setKategoriDokter,
        mulaiAktif,
        setMulaiAktif,
        aktifSampai,
        setAktifSampai,
        tandaTanganBinner,
        setTandaTanganBinner,
        username,
        setUsername,
        nim,
        setNim,
        kompetensi,
        setKompetensi,
        noSIP,
        setNoSIP,
        tglAkhirSIP,
        setTglAkhirSIP,
        noSTR,
        setNoSTR,
        tglAkhirSTR,
        setTglAkhirSTR,
        asalUniversitas,
        setAsalUniversitas,
        getListPPDS,
        postPPDS,
        modalPPDS,
        setmodalPPDS,
        listPPDS,
        setlistPPDS,
        password,
        setpassword,
        clickIndex,
        setClickIndex,
        postUserAkses,
        modalAkses,
        setmodalAkses,
        nikPpds,
        setnikPpds,
        tmpLahir,
        settmpLahir,
        tglLahir,
        settglLahir,
        data,
        setData,
        getListPPDSDetail,
        postPPDSmaster,
        postPPDSWA,
        postWa,
        modalAkun,
        setmodalAkun,
      }}
    >
      {props.children}
    </MasterPPDSContext.Provider>
  );
};

export default MasterPPDSContextProvider;
