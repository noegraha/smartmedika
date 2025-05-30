import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";
import { ReminderContext } from "./ReminderContext";
import { PasienContext } from "./PasienContext";
import { LoginContext } from "./LoginContext";
import dayjs from "dayjs";

import Icon from "@ant-design/icons";
import BPJSICO from "../komponen/BPJSICO";

export const VClaimContext = createContext();

const VClaimContextProvider = (props) => {
  const { insertRujukan, deleteRujukan } = useContext(ReminderContext);
  const { curpas, doktercurpas } = useContext(PasienContext);
  const { namauser, sendTele } = useContext(LoginContext);

  const [kontrolform, setKontrolForm] = useState(3);
  const [reminder, setReminder] = useState([]);
  const [norujukan, setNoRujukan] = useState("");
  const [tglrujukan, setTanggalRujukan] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [cttnrujukan, setCatatanRujukan] = useState("");
  const [jenisfaskes, setJenisFaskes] = useState(1);
  const [sebabRujuk, setSebabRujuk] = useState("");
  const [rencananTindakan, setRencanatindakan] = useState(null);
  const [dokterkontrol, setDokterKontrol] = useState(doktercurpas);
  const [modalKontrolBiasa, setmodalKontrolBiasa] = useState(false);
  const [buttonorder, setButtonOrder] = useState("KONTROL");

  const [poliget, setPoli] = useState(null);
  const [poliall, setPoliAll] = useState([]);
  const [poliBPJS, setPoliBPJS] = useState([]);
  const [dokterBPJS, setDokterBPJS] = useState([]);
  const [datakontrolBPJS, setDataKontrolBPJS] = useState({
    sep: {
      peserta: {
        nama: "",
      },
      diagnosa: "",
    },
    noSuratKontrol: "",
    tglRencanaKontrol: "",
    tglTerbit: "",
    namaPoliTujuan: "",
    namaDokter: "",
  });
  const [nokontrolBPJS, setNoKontrolBPJS] = useState(null);
  const [nosep, setNoSEP] = useState(null);
  const [dataPeserta, setDataPeserta] = useState(null);
  const [potensi, setPotensi] = useState(null);
  const [listrencanakontrol, setListRencanaKontrol] = useState([]);
  const [tanggalawal, setTanggalAwal] = useState(dayjs().format("YYYY-MM-DD"));
  const [tanggalakhir, setTanggalAkhir] = useState(
    dayjs().add(29, "days").format("YYYY-MM-DD")
  );
  const [filter, setFilter] = useState("2");
  const [loading, setLoading] = useState(false);
  const [loadingpoli, setLoadingPoli] = useState(false);
  const [loadingdokter, setLoadingDokter] = useState(false);
  const [loadingBPJS, setLoadingBPJS] = useState(false);
  const [dokterrsms, setDokterRSMS] = useState(null);
  const [pilihpoliBPJS, setPilihPoliBPJS] = useState(null);
  const [pilihdokterBPJS, setPilihDokterBPJS] = useState(null);
  const [tanggalkontrolBPJS, setTanggalKontrolBPJS] = useState(null);
  const [tanggalkontrolBPJStampil, setTanggalKontrolBPJStampil] =
    useState(null);
  const [listObatPrb, setListObatPrb] = useState([]);
  const [listDiagnosaProgram, setListDiagnosaProgram] = useState([]);
  const [listkontrol, setListKontrol] = useState([]);
  const [listrencanakontrolFilter, setListlistrencanakontrolFilter] = useState(
    []
  );
  const [listpolibpjs, setListPoliBPJS] = useState([]);
  const [dashboardbulan, setDataDashboardByBln] = useState([]);
  const [dashboardtanggal, setDataDashboardByTgl] = useState([]);
  const [dashboardpoli, setDataDashboardByPoli] = useState([]);
  const [dashboardrata, setDataDashboardRata] = useState([]);
  const [dataSEP, setDataSEP] = useState(
    dayjs().add(40, "days").format("YYYY-MM-DD")
  );
  const [errorBpjs, seterrorBpjs] = useState("");
  const [datappk, setDataPPK] = useState("");
  const [dataRiwayat, setdataRiwayat] = useState("");
  const [modalBpjs, setmodalBpjs] = useState(false);
  const [kodeDrBPJS, setkodeDrBPJS] = useState("");
  const [dataKontrolLast, setDataKontrolLast] = useState([]);

  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getPoliBPJS = () => {
    setLoadingPoli(true);
    axios
      .get(`${apiku}/BridgeAntrianOnline/Referensi/Poli`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPoliAll(res.data.result);
          setLoadingPoli(false);
        } else {
          setPoliAll([]);
          message.warning(res.data.message);
          setLoadingPoli(false);
        }
      })
      .catch((err) => {
        setPoliAll([]);
        message.error("Gagal");
        setLoadingPoli(false);
        console.log(err);
      });
  };

  const ambilPoliBPJS = (nosep, tanggal) => {
    axios
      .get(
        `${apiku}/BridgeVClaim/RencanaKontrol/DataPoli/2/${nosep}/${tanggal}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPoliBPJS(res.data.result.list);
          setLoadingPoli(false);
        } else {
          setPoliBPJS([]);
          message.warning(res.data.message);
          setLoadingPoli(false);
          sendTele(
            "3",
            "BridgeVclaim - DataPoli",
            res.data.statusCode,
            res.data.message,
            ip,
            namauser,
            curpas.namaPasien,
            curpas.ruangDeskripsi
          );
        }
      })
      .catch((err) => {
        setPoliBPJS([]);
        message.error("Gagal");
        console.log(err);
        setLoadingPoli(false);
      });
  };
  const ambilDokterBPJS = (kodepoli, tanggal) => {
    axios
      .get(
        `${apiku}/BridgeVClaim/RencanaKontrol/DataDokter/2/${kodepoli}/${tanggal}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDokterBPJS(res.data.result.list);
        } else {
          setDokterBPJS([]);
          message.warning(res.data.message);
          sendTele(
            "3",
            "BridgeVclaim - DataDokter",
            res.data.statusCode,
            res.data.message,
            ip,
            namauser,
            curpas.namaPasien,
            curpas.ruangDeskripsi
          );
        }
      })
      .catch((err) => {
        setDokterBPJS([]);
        message.error("Gagal");
        console.log(err);
      })
      .finally(() => {
        setLoadingDokter(false);
      });
  };
  const ambilMappingPoli = (poliid) => {
    axios
      .get(
        `${apiku}/BridgeVClaim/RencanaKontrol/DataPoli/1/0001301242173/2021-04-15`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPoliBPJS(res.data.result);
        } else {
          setPoliBPJS([]);
        }
      })
      .catch((err) => {
        setPoliBPJS([]);
        console.log(err);
      });
  };
  const ambilNoKontrolBPJS = (nosep) => {
    axios
      .get(`${apiku}/BridgeVClaim/GetNoSuratKontrolByNoSEP/${nosep}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataKontrolBPJS(res.data.result);
        } else {
          setDataKontrolBPJS([]);
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        setDataKontrolBPJS([]);
        console.log(err);
      });
  };
  const mappingDokterBPJS = (nodr) => {
    axios
      .get(`${apiku}/MapingDokterBpjs/ReadDokterBPJS/${nodr}`, options)
      .then((res) => {
        // console.log(nodr);
        if (res.data.statusCode === 200) {
          setDokterRSMS(res.data.result.dokterIdRS);
          // console.log(res.data.result.dokterIdRS);
        } else {
          setDokterRSMS(null);
          console.log(res.data);
        }
      })
      .catch((err) => {
        setDokterRSMS(null);
        console.log(err);
      });
  };

  const mappingDokterBPJSbyDid = (nopolish, kodedokter) => {
    axios
      .get(`${apiku}/MapingDokterBpjs/Read/${kodedokter}`, options)
      .then((res) => {
        // console.log(nodr);
        if (res.data.statusCode === 200) {
          setkodeDrBPJS(res.data.result.kodeDokterBPJS);
          getRiwayatLayananBpjs({
            param: nopolish,
            kodedokter: parseInt(res.data.result.kodeDokterBPJS),
          });
          console.log({
            param: nopolish,
            kodedokter: parseInt(res.data.result.kodeDokterBPJS),
          });
        } else {
          setkodeDrBPJS("");
        }
      })
      .catch((err) => {
        setkodeDrBPJS("");
      });
  };

  const getSuratKontrolBPJSbyNoSurat = (noKontrol) => {
    axios
      .get(`${apiku}/BridgeVClaim/RencanaKontrol/NoSurat/${noKontrol}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataKontrolBPJS(res.data.result);
        } else {
          console.log(res.data);
          setDataKontrolBPJS({
            sep: {
              peserta: {
                nama: "",
              },
              diagnosa: "",
            },
            noSuratKontrol: "",
            tglRencanaKontrol: "",
            tglTerbit: "",
            namaPoliTujuan: "",
            namaDokter: "",
          });
        }
      })
      .catch((err) => {
        console.log(err);
        setDataKontrolBPJS({
          sep: {
            peserta: {
              nama: "",
            },
            diagnosa: "",
          },
          noSuratKontrol: "",
          tglRencanaKontrol: "",
          tglTerbit: "",
          namaPoliTujuan: "",
          namaDokter: "",
        });
        // setTanggalKontrolBPJS(null);
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Gangguan Koneksi!",
        });
      });
  };

  const getSuratKontrolBPJSbyKartu = (nokartu) => {
    setLoadingBPJS(true);
    axios
      .get(
        `${apiku}/BridgeVClaim/GetNoSuratKontrolByNoKartu/${nokartu}/${dayjs().format(
          "YYYY-MM-DD"
        )}/${dayjs().add(29, "days").format("YYYY-MM-DD")}/2`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result[0]);
          setNoKontrolBPJS(res.data.result[0].noSuratKontrol);
          // setNoRujukan(res.data.result[0].noSuratKontrol);
          getSuratKontrolBPJSbyNoSurat(res.data.result[0].noSuratKontrol);
          // console.log(res.data.result[0].noSuratKontrol);
          setTanggalKontrolBPJStampil(
            res.data.result[0].tglRencanaKontrol.split("-").reverse().join("-")
          );
          // console.log(
          //   "Tgl Kontrol ",
          //   dayjs(
          //     res.data.result[0].tglRencanaKontrol
          //       .split("-")
          //       .reverse()
          //       .join("-")
          //   )
          // );
          setLoadingBPJS(false);
          // ambilPoliBPJS(
          //   res.data.result[0].noSepAsalKontrol,
          //   res.data.result[0].tglRencanaKontrol
          // );
          // setPoliBPJS(res.data.result[0].poliTujuan);
          // setDokterBPJS(res.data.result[0].kodeDokter);
        } else {
          setNoKontrolBPJS(null);
          // setNoRujukan(null);
          setTanggalKontrolBPJStampil(null);
          // setPoliBPJS(null);
          // setDokterBPJS(null);
          setLoadingBPJS(false);
        }
      })
      .catch((err) => {
        setNoKontrolBPJS(null);
        // setNoRujukan(null);
        setTanggalKontrolBPJStampil(null);
        // setPoliBPJS(null);
        // setDokterBPJS(null);
        setLoadingBPJS(false);
        console.log(err);
      });
  };

  const getRencanaKontrolBPJSbyKartu = (nokartu, bulan, tahun, filter) => {
    setLoading(true);
    axios
      .get(
        `${apiku}/BridgeVClaim/GetNoSuratKontrolByNoKartuBln/${bulan}/${tahun}/${nokartu}/${filter}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListRencanaKontrol(res.data.result);
          setLoading(false);
        } else {
          setListRencanaKontrol([]);
          message.warning(res.data.message);
          // Modal.warning({ content: res.data.message });
          setLoading(false);
        }
      })
      .catch((err) => {
        setListRencanaKontrol([]);
        message.error("Terjadi Kesalahan Koneksi");
        // Modal.error({ content: "Terjadi Keslahan Koneksi" });
        console.log(err);
        setLoading(false);
      });
  };

  const getRencanaKontrolBPJSbyKartuTanggal = (
    nokartu,
    tanggalawal,
    tanggalakhir,
    filter
  ) => {
    setLoading(true);
    axios
      .get(
        `${apiku}/BridgeVClaim/GetNoSuratKontrolByNoKartu/${nokartu}/${tanggalawal}/${tanggalakhir}/${filter}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListRencanaKontrol(res.data.result);
          setListlistrencanakontrolFilter(
            res.data.result.filter(
              (item) => item.namaJnsKontrol === "Surat Kontrol"
            )
          );
        } else {
          setListRencanaKontrol([]);
          setListlistrencanakontrolFilter([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setListRencanaKontrol([]);
        setListlistrencanakontrolFilter([]);
        message.error("Terjadi Keslahan Koneksi");
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  const insertNoKontrolBPJS = (datakontrol) => {
    axios
      .post(`${apiku}/BridgeVClaim/RencanaKontrol/Insert`, datakontrol, {
        headers: options.headers,
      })
      .then((res) => {
        const nomorRujukan =
          res.data.statusCode === 200 ? res.data.result.noSuratKontrol : null;

        if (res.data.statusCode === 200 || res.data.statusCode === 203) {
          // setDataKontrolBPJS(res.data.result);
          setNoRujukan(nomorRujukan);
          insertRujukan({
            rujukanId: nomorRujukan,
            tanggalRujukan: dayjs(tglrujukan).format("YYYY-MM-DD"),
            noJaminan: nosep,
            registrasiId: curpas.registrasiId,
            pasienId: curpas.pasienId,
            noPolish: curpas.noPolish,
            namaPasien: curpas.namaPasien,
            tipeRujukan: "3",
            jenisPelayanan: "2",
            poliTujuanIdBPJS: pilihpoliBPJS,
            dokterKontrolBPJS: pilihdokterBPJS,
            rencanaTindakan: rencananTindakan,
            program: buttonorder,
            poliTujuanId: curpas.ruangId,
            dokterKontrolId: dokterrsms === null ? curpas.dokterId : dokterrsms,
            namaPoli: curpas.ruangDeskripsi,
            userId: namauser,
            clientHost: host,
            clientIp: ip,
            catatan: cttnrujukan,
            sebabRujuk: sebabRujuk,
          });
          console.log(res.data.result);
          message.success(
            "Success BPJS : Berhasil Generate No Rencana Kontrol BPJS!"
          );
          setLoadingBPJS(false);
          // getSuratKontrolBPJSbyKartu(curpas.noPolish);
          if (res.data.statusCode === 203) {
            Modal.warning({
              content: res.data.message,
            });
          }
        } else if (res.data.statusCode === 208) {
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Warning BPJS",
            content: res.data.message + "\nSilahkan klik Simpan kembali!",
          });
          setLoadingBPJS(false);
          sendTele(
            "3",
            "BridgeVclaim - InsertNoKontrol",
            res.data.statusCode,
            res.data.message,
            ip,
            namauser,
            curpas.namaPasien,
            curpas.ruangDeskripsi
          );
          // setNoSEP(res.data.result);
        } else {
          if (res.data.message.includes("Tujuan")) {
            console.log("warning", res.data.message);
            setLoadingBPJS(false);
            seterrorBpjs(res.data.message);
            message.warning(res.data.message);
            setmodalKontrolBiasa(true);
          } else {
            console.log("tidak", res.data.message);
            Modal.warning({
              icon: <Icon component={BPJSICO} />,
              title: "Warning BPJS",
              content: res.data.message,
            });
            setLoadingBPJS(false);
            sendTele(
              "3",
              "BridgeVclaim - InsertNoKontrol",
              res.data.statusCode,
              res.data.message,
              ip,
              namauser,
              curpas.namaPasien,
              curpas.ruangDeskripsi
            );
          }
        }
      })
      .catch((err) => {
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        setLoadingBPJS(false);
      });
  };
  const updateNoKontrolBPJS = (datakontrol) => {
    axios
      .put(`${apiku}/BridgeVClaim/RencanaKontrol/Update`, datakontrol, {
        headers: options.headers,
      })
      .then((res) => {
        console.log(res.data);
        if (
          res.data.statusCode === 200 ||
          res.data.statusCode === 203 ||
          res.data.statusCode === 201
        ) {
          // setDataKontrolBPJS(res.data.result);
          setNoRujukan(datakontrol.noSuratKontrol);
          insertRujukan({
            rujukanId: datakontrol.noSuratKontrol,
            tanggalRujukan: dayjs(tglrujukan).format("YYYY-MM-DD"),
            noJaminan: curpas.noJaminan,
            registrasiId: curpas.registrasiId,
            pasienId: curpas.pasienId,
            noPolish: curpas.noPolish,
            namaPasien: curpas.namaPasien,
            tipeRujukan: "3",
            jenisPelayanan: "2",
            poliTujuanIdBPJS: pilihpoliBPJS,
            dokterKontrolBPJS: pilihdokterBPJS,
            rencanaTindakan: buttonorder,
            poliTujuanId: curpas.ruangId,
            dokterKontrolId: dokterrsms === null ? curpas.dokterId : dokterrsms,
            namaPoli: curpas.ruangDeskripsi,
            userId: namauser,
            clientHost: host,
            clientIp: ip,
            program: buttonorder,
            catatan: cttnrujukan,
            sebabRujuk: sebabRujuk,
          });
          message.success(
            "Success BPJS : Berhasil Update No Rencana Kontrol BPJS! " +
              res.data.statusCode
          );
          setLoadingBPJS(false);
        } else {
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Warning BPJS",
            content: res.data.message,
          });
          setLoadingBPJS(false);
          sendTele(
            "3",
            "BridgeVclaim - UpdateNoKontrol",
            res.data.statusCode,
            res.data.message,
            ip,
            namauser,
            curpas.namaPasien,
            curpas.ruangDeskripsi
          );
        }
      })
      .catch((err) => {
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        setLoadingBPJS(false);
      });
  };

  const deleteNoKontrolBPJS = (noSurat, user, noreg) => {
    axios
      .delete(
        `${apiku}/BridgeVClaim/RencanaKontrol/Delete/${noSurat}/${user}`,
        {
          headers: options.headers,
        }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setDataKontrolBPJS(null);
          setNoRujukan(null);
          message.success(
            "Success BPJS : Berhasil Hapus No Rencana Kontrol BPJS!"
          );
          setLoadingBPJS(false);
          deleteRujukan(noreg);
          setPilihDokterBPJS(null);
          setPilihPoliBPJS(null);
          setTanggalKontrolBPJS(null);
        } else {
          // setDataKontrolBPJS(null);
          // message.warning("BPJS :", res.data.message);
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Warning BPJS",
            content: res.data.message,
          });
          setLoadingBPJS(false);
        }
      })
      .catch((err) => {
        // setDataKontrolBPJS(null);
        // message.warning("BPJS : Terdapat Kesalahan Koneksi!");
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        console.log(err);
        setLoadingBPJS(false);
      });
  };

  const getObatPrbBPJS = (namaobat) => {
    axios
      .get(
        `${apiku}/BridgeVClaim/GetObatPrb/${namaobat === "" ? " " : namaobat}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListObatPrb(res.data.result.list);
        } else {
          setListObatPrb([]);
          // message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setListObatPrb([]);
        message.error("Terjadi Keslahan Koneksi");
        console.log(err);
      });
  };

  const getListDiagnosaProgram = () => {
    axios
      .get(`${apiku}/BridgeVClaim/GetDiagnosaProgram`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListDiagnosaProgram(res.data.result.list);
        } else {
          setListDiagnosaProgram([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setListDiagnosaProgram([]);
        message.error("Terjadi Kesalahan Koneksi");
        console.log(err);
      });
  };

  const getListKontrol = (tglawal, tglakhir, filter, kodepoli, jnslayanan) => {
    setLoading(true);
    axios
      .get(
        `${apiku}/BridgeVClaim/ListRencanaKontrolByTanggal/${tglawal}/${tglakhir}/${filter}/${kodepoli}/${jnslayanan}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListKontrol(res.data.result);
          setLoading(false);
        } else {
          setListKontrol([]);
          message.warning(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setListKontrol([]);
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
        setLoading(false);
      });
  };

  const getMappingPoliBPJS = (ruang) => {
    setLoading(true);
    axios
      .get(`${apiku}/MapingPoliBpjs/Read/${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListPoliBPJS(res.data.result);
          setLoading(false);
        } else {
          setListPoliBPJS([]);
          message.warning(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setListPoliBPJS([]);
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
        setLoading(false);
      });
  };

  const getdataSEP = (nosep) => {
    axios
      .get(`${apiku}/BridgeVClaim/SEP/${nosep}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setCatatanRujukan(res.data.result.catatan);
          // console.log(res.data.result.catatan);
        } else {
          setCatatanRujukan(null);
          // message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setCatatanRujukan(null);
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
      });
  };

  const getExpiredRujukan = (nosep) => {
    axios
      .get(`${apiku}/BridgeVClaim/ExpiredRujukan/${nosep}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataSEP(
            dayjs(res.data.result).add(1, "days").format("YYYY-MM-DD")
          );
        } else {
          setDataSEP(dayjs().add(40, "days").format("YYYY-MM-DD"));
        }
      })
      .catch((err) => {
        setDataSEP(dayjs().add(40, "days").format("YYYY-MM-DD"));
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
      });
  };

  const getDashboardByBln = (bulan, tahun) => {
    setLoading(true);

    axios
      .get(
        `${apiku}/BridgeAntrianOnline/DashboardByBln/${bulan}/${tahun}/rs`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataDashboardByBln(res.data.result.list);
          console.log(res.data.result.list);
          setLoading(false);
        } else {
          setDataDashboardByBln([]);
          message.warning(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setDataDashboardByBln([]);
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
        setLoading(false);
      });
  };

  const getDashboardByTgl = (tanggal) => {
    setLoading(true);

    axios
      .get(`${apiku}/BridgeAntrianOnline/DashboardByTgl/${tanggal}/rs`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataDashboardByTgl(res.data.result.list);
          console.log(res.data.result.list);
          setLoading(false);
        } else {
          setDataDashboardByTgl([]);
          message.warning(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setDataDashboardByTgl([]);
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
        setLoading(false);
      });
  };

  const getDashboardByPoli = (poli, bulan, tahun) => {
    setLoading(true);
    axios
      .get(
        `${apiku}/BridgeAntrianOnline/DashboardByBlnPoli/${poli}/${bulan}/${tahun}/rs`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataDashboardByPoli(res.data.result);
          console.log(res.data.result);
          setLoading(false);
        } else {
          setDataDashboardByPoli([]);
          message.warning(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setDataDashboardByPoli([]);
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
        setLoading(false);
      });
  };

  const getDashboardRatarata = (bulan, tahun) => {
    setLoading(true);
    axios
      .get(
        `${apiku}/BridgeAntrianOnline/DashboardByBlnAll/${bulan}/${tahun}/rs`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataDashboardRata(res.data.result);
          console.log(res.data.result);
          setLoading(false);
        } else {
          setDataDashboardRata([]);
          message.warning(res.data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        setDataDashboardRata([]);
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
        setLoading(false);
      });
  };

  const getDataPeserta = (nokartu) => {
    axios
      .get(`${apiku}/BridgeVClaim/Peserta/${nokartu}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataPPK(res.data.result.provUmum);
          setDataPeserta(res.data.result);
          setPotensi(res.data.result.informasi.prolanisPRB);
        } else {
          setDataPPK(null);
          setDataPeserta(null);
          setPotensi(null);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setDataPPK(null);
        setDataPeserta(null);
        setPotensi(null);
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          content: "Terjadi Kesalahan Koneksi BPJS",
        });
        console.log(err);
      });
  };

  const getRiwayatLayananBpjs = (datakontrol) => {
    axios
      .post(`${apiku}/BridgeVClaim/RiwayatPemeriksaan`, datakontrol, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setdataRiwayat(res.data.result);
          console.log(res.data.result);
          setmodalBpjs(true);
        } else {
          setdataRiwayat("");
          Modal.warning({
            icon: <Icon component={BPJSICO} />,
            title: "Gagal Mengambil Data!",
          });
        }
      })
      .catch((err) => {
        setdataRiwayat("");
        Modal.error({
          icon: <Icon component={BPJSICO} />,
          title: "Error BPJS",
          content: "Terdapat Kesalahan Koneksi!",
        });
      });
  };

  const detailRujukan = (id, noJaminan) => {
    axios
      .get(`${apiku}/EmrRujukan/GetByRegistrasiId/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTanggalRujukan(dayjs(res.data.result.tanggalRujukan));
          setTanggal(res.data.result.tanggalRujukan.slice(0, 10));
          setNoRujukan(res.data.result.rujukanId);
          setCatatanRujukan(res.data.result.catatan);
          setSebabRujuk(res.data.result.sebabRujuk);
          setRencanatindakan(res.data.result.rencanaTindakan);
          setDokterKontrol(res.data.result.dokterKontrolId);
          // getdataSEP(noJaminan);
          if (
            res.data.result.PembayaranId === "0050" ||
            res.data.result.PembayaranId === "0051"
          ) {
            ambilDokterBPJS(
              res.data.result.poliTujuanIdBPJS,
              dayjs(res.data.result.tanggalRujukan).format("YYYY-MM-DD")
            );
            ambilPoliBPJS(
              res.data.result.noJaminan,
              dayjs(res.data.result.tanggalRujukan).format("YYYY-MM-DD")
            );
            // setTanggalKontrolBPJS(res.data.result.tanggalRujukan);
            setPilihDokterBPJS(res.data.result.dokterKontrolBPJS);
            setPilihPoliBPJS(res.data.result.poliTujuanIdBPJS);
          }
        } else {
          setTanggalRujukan(null);
          setTanggal(null);
          setDokterKontrol(null);
          setNoRujukan(null);
          setCatatanRujukan(null);
          setSebabRujuk("");
          setRencanatindakan("");
          getdataSEP(noJaminan);
        }
      })
      .catch((err) => {
        console.log("error", err);
        setTanggalRujukan(null);
        setTanggal(null);
        setDokterKontrol(null);
        setNoRujukan(null);
        setCatatanRujukan(null);
        setSebabRujuk("");
        setRencanatindakan("");
      });
  };

  const getSuratKontrolLast = (noKartu) => {
    axios
      .get(`${apiku}/BridgeVClaim/GetNoSuratKontrolLast/${noKartu}`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataKontrolLast(res.data.result[0].tglRencanaKontrol);
          console.log(res.data.result[0]);
        } else {
          setDataKontrolLast(null);
          console.log(res.data);
        }
      })
      .catch((err) => {
        setDataKontrolLast(null);
        console.log(err);
      });
  };

  return (
    <VClaimContext.Provider
      value={{
        ambilPoliBPJS,
        ambilDokterBPJS,
        insertNoKontrolBPJS,
        ambilNoKontrolBPJS,
        ambilMappingPoli,
        poliBPJS,
        dokterBPJS,
        datakontrolBPJS,
        loadingpoli,
        setLoadingPoli,
        loadingdokter,
        setLoadingDokter,
        mappingDokterBPJS,
        getSuratKontrolBPJSbyKartu,
        loadingBPJS,
        setLoadingBPJS,
        updateNoKontrolBPJS,
        deleteNoKontrolBPJS,
        tanggalkontrolBPJS,
        tanggalkontrolBPJStampil,
        setTanggalKontrolBPJS,
        pilihdokterBPJS,
        setPilihDokterBPJS,
        pilihpoliBPJS,
        setPilihPoliBPJS,
        getSuratKontrolBPJSbyNoSurat,
        listrencanakontrol,
        getRencanaKontrolBPJSbyKartuTanggal,
        tanggalawal,
        setTanggalAwal,
        tanggalakhir,
        setTanggalAkhir,
        filter,
        setFilter,
        getObatPrbBPJS,
        listObatPrb,
        setListObatPrb,
        getListDiagnosaProgram,
        listDiagnosaProgram,
        setListDiagnosaProgram,
        getListKontrol,
        listkontrol,
        setListKontrol,
        listrencanakontrolFilter,
        setListlistrencanakontrolFilter,
        listpolibpjs,
        getMappingPoliBPJS,
        getdataSEP,
        dataSEP,
        nokontrolBPJS,
        getExpiredRujukan,
        seterrorBpjs,
        errorBpjs,
        dokterrsms,
        getDashboardByBln,
        getDashboardByTgl,
        getDashboardByPoli,
        getDashboardRatarata,
        dashboardpoli,
        dashboardbulan,
        dashboardtanggal,
        dashboardrata,
        getPoliBPJS,
        poliall,
        loading,
        poliget,
        setPoli,
        datappk,
        getDataPeserta,
        nosep,
        setNoSEP,
        getRencanaKontrolBPJSbyKartu,
        getRiwayatLayananBpjs,
        setdataRiwayat,
        dataRiwayat,
        modalBpjs,
        setmodalBpjs,
        mappingDokterBPJSbyDid,
        // dokterrsms,
        setDokterRSMS,
        dataPeserta,
        potensi,
        detailRujukan,
        kontrolform,
        setKontrolForm,
        reminder,
        setReminder,
        norujukan,
        setNoRujukan,
        tglrujukan,
        setTanggalRujukan,
        cttnrujukan,
        setCatatanRujukan,
        jenisfaskes,
        setJenisFaskes,
        sebabRujuk,
        setSebabRujuk,
        rencananTindakan,
        setRencanatindakan,
        dokterkontrol,
        setDokterKontrol,
        modalKontrolBiasa,
        setmodalKontrolBiasa,
        buttonorder,
        setButtonOrder,
        getSuratKontrolLast,
        dataKontrolLast,
        tanggal,
      }}
    >
      {props.children}
    </VClaimContext.Provider>
  );
};

export default VClaimContextProvider;
