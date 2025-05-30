import React, { createContext, useState, useContext } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "./PasienRIContext";
import { Link, useHistory } from "react-router-dom";
const { confirm } = Modal;

export const AnamnesaRIContext = createContext();

const AnamnesaRIContextProvider = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser, sendTele } = useContext(LoginContext);
  const { curpasRI, setkeykedatangan } = useContext(PasienRIContext);
  const [anamnesa, setAnamnesa] = useState("");
  const [keluhanUtama, setKeluhanUtama] = useState("");
  const [keluhanTambahan, setKeluhanTambahan] = useState("");
  const [riyawatPenyakitSekarang, setriyawatPenyakitSekarang] = useState("");
  const [riwayatPenyakitTerdahulu, setriwayatPenyakitTerdahulu] = useState("");
  const [riwayatPenyakitKeluarga, setriwayatPenyakitKeluarga] = useState("");
  const [keteranganKeluarga, setketeranganKeluarga] = useState("");
  const [riwayatPenyakitRM13, setriwayatPenyakitRM13] = useState("");
  const [dokterpengisi, setdokterpengisi] = useState("");
  const [jamAnamnesa, setjamAnamnesa] = useState(dayjs());

  const [pmrFisikId, setpmrFisikId] = useState(0);
  const [pmrfisik, setpmrfisik] = useState("");
  const [dariRj, setdariRj] = useState(false);
  const [dariIGD, setdariIGD] = useState(false);
  const [modalAnamnesa, setmodalAnamnesa] = useState(false);

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const history = useHistory();
  const routeChange = () => {
    setkeykedatangan("awal2");
    history.push("/pemeriksaanharian/ri/terimapasienri");
  };

  const detailAnamnesaRI = (id) => {
    axios
      .get(`${apiku}/EmrAnamnesaRawatInap/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setAnamnesa(res.data.result);
          setKeluhanUtama(res.data.result.keluhanUtama);
          setKeluhanTambahan(res.data.result.keluhanTambahan);
          setriyawatPenyakitSekarang(res.data.result.riyawatPenyakitSekarang);
          setriwayatPenyakitTerdahulu(res.data.result.riwayatPenyakitTerdahulu);
          setriwayatPenyakitKeluarga(res.data.result.riwayatPenyakitKeluarga);
          setketeranganKeluarga(res.data.result.keteranganKeluarga);
          setriwayatPenyakitRM13(
            res.data.result.keluhanUtama.concat(
              "\n" + res.data.result.keluhanTambahan
            )
          );
        } else {
          Modal.info({
            title: "Data Anamnesa Pasien Tidak Ditemukan!",
            content: (
              <div>
                <p>Silahkan Isi Data Anamnesa Pasien Terlebih Dahulu!</p>
              </div>
            ),
            onOk() {
              routeChange();
            },
          });
          setKeluhanUtama("");
          setKeluhanTambahan("");
          setriyawatPenyakitSekarang("");
          setriwayatPenyakitTerdahulu("");
          setriwayatPenyakitKeluarga("");
          setketeranganKeluarga("");
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Terjadi Kesalahan Koneksi!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  const insertAnamnesaRI = (dataanamnesari) => {
    axios
      .post(`${apiku}/EmrAnamnesaRawatInap`, dataanamnesari, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          detailAnamnesaRI(dataanamnesari.registrasiId);
          Modal.success({
            content: "Berhasil Simpan Data Anamnesa!",
          });
        } else {
          sendTele(
            "3",
            "EmrAnamnesaRawatInap",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataanamnesari)
          );
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const insertPemFisiikRI = (datapmrfisik) => {
    console.log(datapmrfisik);
    axios
      .post(`${apiku}/EmrPemeriksaanFisik/RawatInap`, datapmrfisik, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          // detailAnamnesaRI(dataanamnesari.registrasiId);
          // console.log(dataanamnesari)

          // detailpmfisikRI(
          //   datapmrfisik.registrasiId,
          //   datapmrfisik.groupLayananID
          // );
          Modal.success({
            content: "Berhasil Simpan Data Pemeriksaan Fisik!",
          });
          // console.log(dataanamnesari)
        } else {
          sendTele(
            "3",
            "EmrPemeriksaanFisik/RawatInap",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(datapmrfisik)
          );
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((res) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(res.data),
        });
      });
  };

  const detailpmfisikRI = (noreg, grpLayanan) => {
    axios
      .get(
        `${apiku}/EmrPemeriksaanFisik/ReadByGroupLayanan/${noreg}/${grpLayanan}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setpmrFisikId(res.data.result.pemeriksaanFisikId);
          setpmrfisik(res.data.result.catatan);
        } else {
          setpmrFisikId(0);
          // message.warning("Data Pemeriksaan Fisik Tidak Di Temukan");
          setpmrfisik(
            "<br><b>Pemeriksaan Kepala&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>- Mata&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;<br>- Telinga/Hidung&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Mulut dan Gigi&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Lain-Lain&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan Leher&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>- Tyroid&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan Dada&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>- Paru&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Jantung&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Dinding Dada&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan Abdomen :</b><br>- Dinding Perut&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Hepar / Lien&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Usus&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan punggung:</b><br>- C. Vertebrae&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Ginjal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan coxae&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>Pemeriksaan genitalia eksterna&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan extremitas&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</b><br>- Superior&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>- Inferior&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Pemeriksaaan limphonodi&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Pemeriksaan reflek&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Pemeriksaan turgor kulit&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Pemeriksaan akral&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>Pemeriksaan Lokal&nbsp;&nbsp;&nbsp;&nbsp;:</b><br><b>ANALISA&nbsp;</b><br>Permasalah Medis&nbsp;&nbsp;&nbsp;&nbsp;:<br>Permasalahan Perawat&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Dx Awal&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br><b>RENCANA</b><br>Terapi Medis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Tindakan Medis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>Tindakan Keperawatan :<br>Prognosis&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:<br>&nbsp;"
          );
        }
      })
      .catch((err) => {
        Modal.warning({
          title: "Data Gagal Dihapus!",
          //  content: JSON.stringify(res.data),
        });
        // message.error(err);
      });
  };

  const kosongkanformanamnesari = () => {
    setKeluhanUtama("");
    setKeluhanTambahan("");
    setriyawatPenyakitSekarang("");
    setriwayatPenyakitTerdahulu("");
    setriwayatPenyakitKeluarga("");
    setketeranganKeluarga("");
  };

  const pasienDari = (id) => {
    axios
      .get(`${apiku}/EmrRawatJalan/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setdariRj(false);
          // setdariIGD(true);
        } else {
          setdariRj(true);
          // setdariIGD(false);
        }
      })
      .catch((err) => {
        setdariRj(false);
        // setdariIGD(false);
      });
  };

  return (
    <AnamnesaRIContext.Provider
      value={{
        anamnesa,
        detailAnamnesaRI,
        insertAnamnesaRI,
        keluhanUtama,
        keluhanTambahan,
        riyawatPenyakitSekarang,
        setriyawatPenyakitSekarang,
        riwayatPenyakitTerdahulu,
        setriwayatPenyakitTerdahulu,
        riwayatPenyakitKeluarga,
        setriwayatPenyakitKeluarga,
        keteranganKeluarga,
        setketeranganKeluarga,
        setKeluhanUtama,
        setKeluhanTambahan,
        kosongkanformanamnesari,
        riwayatPenyakitRM13,
        setriwayatPenyakitRM13,
        dokterpengisi,
        setdokterpengisi,
        jamAnamnesa,
        setjamAnamnesa,
        insertPemFisiikRI,
        pmrfisik,
        setpmrfisik,
        detailpmfisikRI,
        pmrFisikId,
        setpmrFisikId,
        pasienDari,
        dariIGD,
        dariRj,
        setdariIGD,
        setdariRj,
        modalAnamnesa,
        setmodalAnamnesa,
      }}
    >
      {props.children}
    </AnamnesaRIContext.Provider>
  );
};

export default AnamnesaRIContextProvider;
