import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";
import dayjs from "dayjs";
import { PasienContext } from "./PasienContext";

export const ReminderContext = createContext();

const ReminderContextProvider = (props) => {
  // const sekarang = dayjs().add(1, 'M').calendar();
  // const tgl = dayjs(sekarang).format('DD-MM-YYYY');
  const [kontrolform, setKontrolForm] = useState(3);
  const { doktercurpas } = useContext(PasienContext);
  // const { getdataSEP } = useContext(VClaimContext);
  const [reminder, setReminder] = useState([]);
  const [norujukan, setNoRujukan] = useState("");
  const [tglrujukan, setTanggalRujukan] = useState(null);
  const [cttnrujukan, setCatatanRujukan] = useState("");
  const [jenisfaskes, setJenisFaskes] = useState(1);
  const [sebabRujuk, setSebabRujuk] = useState("");
  const [rencananTindakan, setRencanatindakan] = useState(null);
  const [dokterkontrol, setDokterKontrol] = useState(doktercurpas);
  const [modalKontrolBiasa, setmodalKontrolBiasa] = useState(false);
  // const [buttonorder, setButtonOrder] = useState(null);
  const [buttonorder, setButtonOrder] = useState("KONTROL");
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertRujukan = (datarujukan) => {
    console.log(datarujukan);
    axios
      .post(`${apiku}/EmrRujukan/InsertRujukan`, datarujukan, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan Rujukan!");
          setNoRujukan(res.data.result.rujukanId);
          console.log(res.data.result.rujukanId);
          setmodalKontrolBiasa(false);
          setButtonOrder("KONTROL");
          // insertReminder(datareminder);
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Konek Disimpan !");
      });
  };

  const deleteRujukan = (noreg) => {
    axios
      .delete(`${apiku}/EmrRujukan/DeleteRujukan/${noreg}`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Hapus Rujukan!");
          setNoRujukan(null);
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Konek !");
      });
  };

  const insertReminder = (datareminder) => {
    console.log(datareminder);
    axios
      .post(`${apiku}/SmsReminder`, datareminder, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          // message.success("Berhasil Simpan Reminder!");
          Modal.success({ content: "Berhasil Menyimpan Reminder !" });
        } else {
          console.log(res.data);
          // message.warning(res.data.message);
          Modal.warning({ content: res.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const detailReminder = (id) => {
    axios
      .get(`${apiku}/SmsReminder/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setReminder(res.data.result);
          setNoRujukan(res.data.result.rujukanId);
          // console.log(dataPros);
        } else {
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const detailRujukan = (id, noJaminan) => {
    axios
      .get(`${apiku}/EmrRujukan/GetByRegistrasiId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTanggalRujukan(dayjs(res.data.result.tanggalRujukan));
          setNoRujukan(res.data.result.rujukanId);
          setCatatanRujukan(res.data.result.catatan);
          setSebabRujuk(res.data.result.sebabRujuk);
          setRencanatindakan(res.data.result.rencanaTindakan);
          setDokterKontrol(res.data.result.dokterKontrolId);
          getdataSEP(noJaminan);
          // console.log("ok", res.data);
        } else {
          setTanggalRujukan(null);
          setDokterKontrol(null);
          setNoRujukan(null);
          setCatatanRujukan(null);
          setSebabRujuk("");
          setRencanatindakan("");
          getdataSEP(noJaminan);
          // console.log("no", res.data, curpas.noJaminan);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setTanggalRujukan(null);
        setDokterKontrol(null);
        setNoRujukan(null);
        setCatatanRujukan(null);
        setSebabRujuk("");
        setRencanatindakan("");
      });
  };
  const getdataSEP = (nosep) => {
    axios
      .get(`${apiku}/BridgeVClaim/SEP/${nosep}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setCatatanRujukan(res.data.result.catatan);
          // console.log("ok", res.data);
        } else {
          setCatatanRujukan(null);
          // console.log("no", res.data);
          // message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setCatatanRujukan(null);
        Modal.error({
          // icon: <Icon component={BPJS} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
      });
  };
  return (
    <ReminderContext.Provider
      value={{
        reminder,
        norujukan,
        insertReminder,
        detailReminder,
        insertRujukan,
        detailRujukan,
        setNoRujukan,
        tglrujukan,
        cttnrujukan,
        setCatatanRujukan,
        setTanggalRujukan,
        rencananTindakan,
        setRencanatindakan,
        sebabRujuk,
        setSebabRujuk,
        jenisfaskes,
        setJenisFaskes,
        dokterkontrol,
        setDokterKontrol,
        kontrolform,
        setKontrolForm,
        deleteRujukan,
        modalKontrolBiasa,
        setmodalKontrolBiasa,
        buttonorder,
        setButtonOrder,
      }}
    >
      {props.children}
    </ReminderContext.Provider>
  );
};

export default ReminderContextProvider;
