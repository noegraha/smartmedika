import React, { createContext, useState, useEffect, useContext } from "react";
import { Modal, message } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import { MasterLuaranAskepContext } from "../../master/context/masteraskep/MasterLuaranAskepContext";
import { LoginContext } from "../../rawatjalan/context";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import { MasterKriteriaAskepContext } from "../../master/context/masteraskep/MasterKriteriaAskepContext";
import { MasterImplementasiAskepContext } from "../../master/context/masteraskep/MasterImplementasiAskepContext";
import { PasienRIContext } from "./PasienRIContext";

export const AskepContext = createContext();

const AskepContextProvider = (props) => {
  const [messageApi, contextHolder] = message.useMessage();
  const {
    kriteriaByLuaran,
    getbyluaranjns,
    jnsKriteriaByLuaran,
    getJnsKriteriaByLuaran,
    kesimpulanByTarget,
    setkesimpulanByTarget,
    getKesimpulanByhasilTarget,
  } = useContext(MasterKriteriaAskepContext);
  const { setLuaranbydx } = useContext(MasterLuaranAskepContext);
  const {
    listImplementasiByIntervensi,
    setlistImplementasiByIntervensi,
    getImplementasiByIntervensiId,
  } = useContext(MasterImplementasiAskepContext);
  const { sendTele, ip, hostPc, namauser } = useContext(LoginContext);
  const { curpas } = useContext(PasienContext);
  const { curpasRI } = useContext(PasienRIContext);
  const [visibleCetakAskep, setvisibleCetakAskep] = useState(false);
  const [spinCetakAskep, setspinCetakAskep] = useState(false);
  const [spinSimpanAskep, setspinspinSimpanAskep] = useState(false);
  const [spinGetAskep, setspinGetAskep] = useState(false);
  const [valuecekAssesment, setvaluecekAssesment] = useState(false);
  const [load, setLoad] = useState(false);

  const [warnaRow, setWarnaRow] = useState([]);

  const [registrasiId, setregistrasiId] = useState([]);
  //const [pasienId, setpasienId] = useState([]);
  //const [namaPasien, setnamaPasien] = useState([]);
  const [tanggal, settanggal] = useState(dayjs());
  // const [ruangId, setruangId] = useState([]);
  // const [namaRuang, setnamaRuang] = useState([]);
  // const [pegawaiId, setpegawaiId] = useState([]);
  const [diagnosaId, setdiagnosaId] = useState([]);
  const [diagnosaDeskripsi, setdiagnosaDeskripsi] = useState("");
  const [targetWaktu, settargetWaktu] = useState([]);
  const [luaranId, setluaranId] = useState([]);
  //const [userId, setuserId] = useState([]);
  const [nTandaGejala, setnTandaGejala] = useState([]);
  // "registrasiId": "string",
  // "diagnosaId": "string",
  // "tandaGejalaId": "string"
  const [nIntervensi, setnIntervensi] = useState([]);
  const [nImplementasi, setnImplementasi] = useState([]);
  const [nKesimpulan, setnKesimpulan] = useState("");
  // "registrasiId": "string",
  // "diagnosaId": "string",
  // "intervensiId": "string"
  const [nKriteria, setnKriteria] = useState([]);
  const [jenisKriteria, setJenisKriteria] = useState([]);
  const [userIdAskep, setUseridAskep] = useState("");

  const [hiddenSaveButton, setHiddenSaveButton] = useState(false);
  const [hiddenSaveEdit, setHiddenSaveEdit] = useState(true);
  // "registrasiId": "string",
  // "diagnosaId": "string",
  // "kriteriaId": "string",
  // "jenis": 0
  const [ListAskepById, setListAskepById] = useState([]);
  const [ListAskepByIdByLayanana, setListAskepByIdByLayanana] = useState([]);
  const [AskepByIdByDx, setAskepByIdByDx] = useState([]);
  const [HasilEvaluasi, setHasilEvaluasi] = useState([]);
  const [KriterianEvaluasiByIdByDx, setKriterianEvaluasiByIdByDx] = useState(
    []
  );
  const [tanggalEvaluasi, settanggalEvaluasi] = useState(dayjs());
  const [hasilkesimpulan, sethasilKesimpulan] = useState([]);
  const [historyKesimpulanByIdBydx, setHistoryKesimpulanByIdBydx] = useState(
    []
  );
  const [kriteriaeva, setKriteriaeva] = useState([]);
  const [jnskriteria, setjnskriteria] = useState([]);

  const [ImplementasiByIdByDx, setImplementasiByIdByDx] = useState([]);
  const [ImplementasiByIdByDxBylayanan, setImplementasiByIdByDxBylayanan] =
    useState([]);
  const [implementasiId, setImplementasiId] = useState([]);
  const [IdImplementasi, setIdImplementasi] = useState([]);
  const [ListImplementasiById, setListImplementasiById] = useState([]);
  const [implementasiByreg, setimplementasiByreg] = useState([]);
  const [tanggalImplementasi, settanggalImplementasi] = useState(dayjs());
  const [keteranganImplementasi, setketeranganImplementasi] = useState([]);
  const [listImplementasiByIdDiagnosa, setListImplementasiByIdDiagnosa] =
    useState([]);
  const [historyKesimpulan, setHistoryKesimpulan] = useState([]);
  const [katonImplementasi, setkatonImplementasi] = useState(false);
  const [katonEvaluasi, setKatonEvaluasi] = useState(false);

  const [listCatatanPasien, setListCatatanPasien] = useState([]);
  const [katonCatatan, setkatonCatatan] = useState(false);
  const [tanggalCatatan, setTanggalcatatan] = useState(dayjs());
  const [catatan, setCatatan] = useState("");
  const [idCatatan, setidCatatan] = useState(0);
  const [userIdcatatan, setuserIdCatatan] = useState("");
  const [katonBacaCatatan, setkatonBacaCatatan] = useState(false);
  const [subjekC, setsubjekC] = useState("");
  const [assesmentC, setassesmentC] = useState("");
  const [planningC, setplanningC] = useState("");
  const [implementasiC, setimplementasiC] = useState("");
  const [evaluasiC, setevaluasiC] = useState("");
  const [waktu, setwaktu] = useState("");

  //tandavital//
  const [tandaVitalId, settandaVitalId] = useState(0);
  const [gcsMata, setgcsMata] = useState(4);
  const [gcsSuara, setgcsSuara] = useState(5);
  const [gcsGerakan, setgcsGerakan] = useState(6);
  const [tekananDarahSistolik, settekananDarahSistolik] = useState([]);
  const [tekananDarahDiastolik, settekananDarahDiastolik] = useState([]);
  const [suhuTubuh, setsuhuTubuh] = useState([]);
  const [frekuensiNadi, setfrekuensiNadi] = useState([]);
  const [frekuensiNafas, setfrekuensiNafas] = useState([]);
  const [skorNyeri, setskorNyeri] = useState([]);
  const [katonTTV, setKatonTTV] = useState(false);
  const [bacaTTV, setBacaTTV] = useState(false);
  const [tglTTV, setTglTTV] = useState(dayjs());
  const [ttvByNoreg, setTTvByNoreg] = useState([]);
  const [grabikTTV, setGravikTTV] = useState([]);
  const [userTTV, setUserTTV] = useState("");
  const [ipPc, setIpPC] = useState([]);
  const [namePc, setNamePC] = useState([]);

  const [iramaNadi, setiramaNadi] = useState([]);
  const [saturasiOksigen, setsaturasiOksigen] = useState([]);
  const [tinggiBadan, settinggiBadan] = useState([]);
  const [beratBadan, setberatBadan] = useState([]);
  const [insertTTVAssesment] = useState([]);

  const [printregistrasiId, setPrintregistrasiId] = useState("");
  const [printpasienId, setPrintpasienId] = useState("");
  const [printnamaPasien, setPrintnamaPasien] = useState("");
  const [printtanggal, setPrinttanggal] = useState("");
  const [printruangId, setPrintruangId] = useState("");
  const [printdeskripsiRuang, setPrintdeskripsiRuang] = useState("");
  const [printpegawaiId, setPrintpegawaiId] = useState("");
  const [dataPrint, setDataPrint] = useState([]);

  const [warningtgl, setwarningtgl] = useState(false);

  const [listCaramasuk, setlistCaraMasuk] = useState(false);

  const [tanggalKeluhan, settanggalKeluhan] = useState(dayjs());
  const [caraMasuk, setcaraMasuk] = useState("1");
  const [riwayatAlergi, setriwayatAlergi] = useState(null);
  const [riwayat, setriwayat] = useState(null);
  const [riwayatGenetik, setriwayatGenetik] = useState(null);
  const [ppsId, setppsId] = useState("");
  const [nKeluhanNew, setnKeluhanNew] = useState([]);
  const [keluhanId, setkeluhanId] = useState([]);
  const [karakteristikId, setkarakteristikId] = useState([]);
  const [keluhanLain, setkeluhanLain] = useState(null);
  const [tablekeluhan, settablekeluhan] = useState([]);
  const [namakeluhan, setNamaKeluhan] = useState("");
  const [namakarakterisitik, setNamaKarakteristik] = useState("");

  const [listmsttandagejala, setListMastertandagejala] = useState([]);
  let { noreg, userlog } = useParams();
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  // 1. getListAskepById
  // 2. getHistoryKesimpulan
  // 3. getCatatanPasien
  // 4.cekAssementTombol

  //-----load use effect---//

  const cekAssement = (noreg, flag) => {
    axios
      .get(`${apiku}/Askep/Assesment/GetAssesment/${noreg}/${flag}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (
            res.data.result === [] ||
            res.data.result === undefined ||
            res.data.result.length === 0
          ) {
            // setvaluecekAssesment(false);
            message.warning("Lengkapi Assesment Awal Terlebih Dahulu!");
            console.log("masuk cek assement gagal");
          } else {
            getTandaGejalaByNoreg(noreg);
            console.log("masuk cek assement berhasil");
          }
        } else {
          message.warning("Lengkapi Assesment Awal Terlebih Dahulu!");
          console.log("masuk cek assement gagal");
        }
      })
      .catch((err) => {
        Modal.warning({
          title: "Data Gagal Dihapus!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  const cekAssesmentRI = (noreg) => {
    axios
      .get(`${apiku}/Askep/Assesment/GetByRegistrasiId/${noreg}/1`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getTandaGejalaByNoreg(noreg);
        } else {
          message.warning(
            "Silahkan Lengkapi Asesmen Asuhan Keperawtan Terlebih Dahulu!"
          );
        }
      })
      .catch((err) => {
        Modal.warning({
          title: "Data Gagal Dihapus!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  const cekAssementTombol = (noreg, flag) => {
    axios
      .get(`${apiku}/Askep/Assesment/GetAssesment/${noreg}/${flag}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setvaluecekAssesment(false);
          console.log("masuk cek assement berhasil");
        } else {
          setvaluecekAssesment(true);
          console.log("masuk cek assement gagal");
        }
      })
      .catch((err) => {
        Modal.warning({
          title: "Data Gagal Dihapus!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  const getTandaGejalaByNoreg = (noreg) => {
    axios
      .get(`${apiku}/Askep/TandaGejala/ListTandaGejala/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListMastertandagejala(res.data.result);
          // console.log('tes tandagejala by noreg', res.data.result);
        } else {
          setListMastertandagejala([]);
          // setMasterSubkategori([]);
          // console.log('cek', res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getListAskepById = (id) => {
    setspinGetAskep(true);
    axios
      .get(`${apiku}/Askep/Asuhan/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListAskepById(res.data.result);
          setspinGetAskep(false);
          console.log(res.data.result);
        } else {
          // message.warning("Data Diagnosa Askep Tidak Ditemukan!");
          setListAskepById([]);
          setspinGetAskep(false);
          //setAnamnesa([]);
        }
      })
      .catch((err) => {
        setspinGetAskep(false);
        setListAskepById([]);
      });
  };

  const getListAskepByIdByLayanan = (id, layananid) => {
    setspinGetAskep(true);
    axios
      .get(`${apiku}/Askep/Asuhan/GetByLayanan/${id}/${layananid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListAskepByIdByLayanana(res.data.result);
          setspinGetAskep(false);
          console.log(res.data.result);
        } else {
          // message.warning("Data Diagnosa Askep Tidak Ditemukan!");
          setListAskepByIdByLayanana([]);
          setspinGetAskep(false);
          console.log(res.data.result);
          //setAnamnesa([]);
        }
      })
      .catch((err) => {
        setspinGetAskep(false);
        setListAskepByIdByLayanana([]);
        console.log("eror ambil data diagnosa askep");
      });
  };

  const getKriterianEvaluasiByIdByDx = (id, dx, jns) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/GetTargetKriteria/${id}/${dx}/${jns}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKriterianEvaluasiByIdByDx(res.data.result);
          console.log(
            "ini data kriteria yang akan dievaluasi",
            res.data.result
          );
        } else {
          console.log(
            "data kosongni data kriteria yang akan dievaluasi",
            res.data.result
          );
          setKriterianEvaluasiByIdByDx([]);
          //setAnamnesa([]);
        }
      })
      .catch((err) => {
        Modal.warning({
          title: "Data Gagal Dihapus!",
          //  content: JSON.stringify(res.data),
        });
      });
  };

  const getAskepByIdByDx = (id, dx) => {
    axios
      .get(`${apiku}/Askep/Asuhan/GetByDiagnosa/${id}/${dx}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          const resdata = res.data.result;
          setAskepByIdByDx(resdata);
          setregistrasiId(resdata.registrasiId);
          settanggal(dayjs(resdata.tanggal));
          setdiagnosaId(resdata.diagnosaId.split(" -").shift());
          setdiagnosaDeskripsi(resdata.diagnosaId.split("- ").pop());
          settargetWaktu(resdata.targetWaktu);
          setluaranId(resdata.luaranId);
          setnTandaGejala(
            resdata.nTandaGejala.map((b) => b.tandaGejalaId.split(" -").shift())
          );
          setnIntervensi(
            resdata.nIntervensi.map((c) => c.intervensiId.split(" -").shift())
          );
          setJenisKriteria(resdata.nKriteria[0].jenis);
          setnKriteria(
            resdata.nKriteria.map((d) => d.kriteriaId.split(" -").shift())
          );
          setUseridAskep(resdata.userId);
        } else {
        }
      })
      .catch((err) => {
        // message.error(err);
      });
  };

  const insertEmrAskep = (dataaskep) => {
    console.log(dataaskep);
    axios
      .post(`${apiku}/Askep/Asuhan/Create`, dataaskep)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          getListAskepById(dataaskep.registrasiId);
          // console.log(dataaskep.registrasiId);
          // setListAskepById([...ListAskepById.filter(item => item.registrasiId !== res.data.result.registrasiId), res.data.result
          // ]);
          Modal.success({
            content: "Berhasil Simpan Data Asesmen Askep!",
            onOk() {
              setLoad(false);
            },
          });
        } else {
          sendTele(
            "3",
            "/Askep/Asuhan/Create",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataaskep)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
        //console.log(res.data.result);
        // message.success('Berhasil Disimpan!');
      })
      .catch((errors) => {
        console.log(errors);
        //message.error('Gagal Disimpan!');
        message.error("Error !");
      });
  };

  const insertEvaluasiAskep = (dataevaluasi) => {
    axios
      .post(`${apiku}/Askep/Asuhan/Evaluasi/Create`, dataevaluasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getHistoryKesimpulanByIdByDx(
            dataevaluasi[0].registrasiId,
            dataevaluasi[0].diagnosaId
          );
          setKatonEvaluasi(false);
          settanggalEvaluasi(dayjs());
          sethasilKesimpulan("");
          setjnskriteria("");
          setKriteriaeva([]);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
        } else {
          sendTele(
            "3",
            "/Askep/Asuhan/Evaluasi/Create",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataevaluasi)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
        message.error("error!");
      });
  };

  const getKesimpulan = (id, dx, kriteria) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Evaluasi/GetKesimpulan/${id}/${dx}/${kriteria}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          sethasilKesimpulan(res.data.result);
          console.log("kesimulan", res.data.result);
        } else {
          console.log("data anamnesa kosong");
          sethasilKesimpulan([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getHistoryKesimpulan = (id) => {
    axios
      .get(`${apiku}/Askep/Asuhan/GetRiwayat/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHistoryKesimpulan(res.data.result);
        } else {
          console.log("data anamnesa kosong");
          setHistoryKesimpulan([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getHistoryKesimpulanByIdByDx = (id, dx) => {
    axios
      .get(`${apiku}/Askep/Asuhan/Evaluasi/GetRiwayat/${id}/${dx}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHistoryKesimpulanByIdBydx(res.data.result);
          setspinspinSimpanAskep(false);
        } else {
          console.log("data anamnesa kosong");
          setHistoryKesimpulanByIdBydx([]);
          setspinspinSimpanAskep(false);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const deleteAskpeByIdByDx = (id, dx) => {
    axios
      .delete(`${apiku}/Askep/Asuhan/Delete/${id}/${dx}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getListAskepById(id);
          message.success("Berhasil Dihapus!");
        } else {
          message.warning("Gagal Dihapus!");
        }
      })
      .catch((err) => {
        message.error("Eror Dihapus!");
      });
  };

  const getListImplementasiByIdByDx = (id, dx) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Implementasi/GetByIntervensi/${id}/${dx}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setImplementasiByIdByDx(res.data.result);
        } else {
          console.log("data anamnesa kosong");
          setImplementasiByIdByDx([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getListImplementasiByIdByDxBylayanana = (id, dx, layanan) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Implementasi/GetByLayananId/${id}/${dx}/${layanan}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setnImplementasi(
            res.data.result.map((b) => b.implementasiId.split(" -").shift())
          );
          console.log(
            res.data.result.map((b) => b.implementasiId.split(" -").shift())
          );
        } else {
          console.log("data anamnesa kosong");
          setnImplementasi([]);
        }
      })
      .catch((err) => {
        setnImplementasi([]);
        message.error(err);
      });
  };

  const getListImplementasiById = (registrasiid) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Implementasi/GetByRegistrasiId/${registrasiid}`,
        options
      )
      // axios.get(`${apiku}/Askep/Asuhan/Implementasi/GetByRegistrasiId/${registrasiid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListImplementasiById(res.data.result);
          // console.log(' kie datane implementasi', res.data.result);
        } else {
          console.log("data anamnesa kosong");
          setListImplementasiById([]);
        }
      })
      .catch((err) => {
        message.error(err);
        setListImplementasiById([]);
      });
  };

  const getImplementasiReg = (registrasiid) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Implementasi/GetByRegistrasiId/${registrasiid}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          const today = dayjs();
          const yesterday = dayjs().subtract(1, "day");
          const filteredData = res.data.result.filter((item) => {
            const itemDate = dayjs(item.tanggal, "YYYY-MM-DDTHH:mm:ss");
            return (
              itemDate.isSame(today, "day") || itemDate.isSame(yesterday, "day")
            );
          });

          let datac = filteredData.sort((b, a) =>
            a.tanggal.localeCompare(b.tanggal)
          );
          datac.forEach(function (row, index) {
            row.key = index;
          });
          setimplementasiByreg(datac);
        } else {
          console.log("data anamnesa kosong");
          setimplementasiByreg([]);
        }
      })
      .catch((err) => {
        message.error(err);
        setimplementasiByreg([]);
      });
  };

  const getImplementasiByIdBDx = (id, dx) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Implementasi/GetByDiagnosa/${id}/${dx}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListImplementasiByIdDiagnosa(res.data.result);
        } else {
          console.log("data anamnesa kosong");
          setListImplementasiByIdDiagnosa([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };
  const insertImplementasiAskep = (dataImplementasi) => {
    axios
      .post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          getImplementasiByIdBDx(
            dataImplementasi.registrasiId,
            dataImplementasi.diagnosaId
          );
          setkatonImplementasi(false);
          setImplementasiId([]);
          settanggalImplementasi(dayjs());
          //getListImplementasiById(dataImplementasi.registrasiId)
          //console.log(dataaskep.registrasiId);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
        } else {
          sendTele(
            "3",
            "/Askep/Asuhan/Implementasi/Create",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataImplementasi)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
        //console.log(res.data.result);
        // message.success('Berhasil Disimpan!');
      })
      .catch((errors) => {
        console.log(errors);
        //message.error('Gagal Disimpan!');
        message.error("Error!");
      });
  };
  const insertImplementasiAskepMulti = (dataImplementasi) => {
    axios
      .post(`${apiku}/Askep/Asuhan/Implementasi/CreateMulti`, dataImplementasi)
      // axios.post(`${apiku}/Askep/Asuhan/Implementasi/Create`, dataImplementasi)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          getImplementasiByIdBDx(
            dataImplementasi[0].registrasiId,
            dataImplementasi[0].diagnosaId
          );
          setkatonImplementasi(false);
          setImplementasiId([]);
          settanggalImplementasi(dayjs());
          //getListImplementasiById(dataImplementasi.registrasiId)
          //console.log(dataaskep.registrasiId);
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
        } else {
          sendTele(
            "3",
            "/Askep/Asuhan/Implementasi/CreateMulti",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataImplementasi)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
        //console.log(res.data.result);
        // message.success('Berhasil Disimpan!');
      })
      .catch((errors) => {
        console.log(errors);
        //message.error('Gagal Disimpan!');
        message.error("Error!");
      });
  };

  const deleteImplementasiById = (id, registrasiId, dx) => {
    axios
      .delete(`${apiku}/Askep/Asuhan/Implementasi/DeleteById/${id}`, options)
      // axios.delete(`${apiku}/Askep/Asuhan/Implementasi/DeleteById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getImplementasiByIdBDx(registrasiId, dx);
          settanggalImplementasi(dayjs());
          //kosongkanformaskep();
          //console.log(res);
          // setListAskepById(
          //     ListAskepById.filter(item => item.registrasiId === id),
          // );
          message.success("Berhasil Dihapus!");
        } else {
          message.warning("Gagal Dihapus!");
        }
      })
      .catch((err) => {
        message.error("Error Dihapus!");
      });
  };

  const getImplementasiByIdImplementasi = (idImplementasi) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Implementasi/GetById/${idImplementasi}`,
        options
      )
      // axios.get(`${apiku}/Askep/Asuhan/Implementasi/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setIdImplementasi(res.data.result.id);
          setregistrasiId(res.data.result.registrasiId);
          settanggalImplementasi(dayjs(res.data.result.tanggal));
          setImplementasiId(res.data.result.implementasiId);
          // console.log(res.data.result.id, dayjs(res.data.result.tanggal), res.data.result.implementasiId);
        } else {
          console.log("data implementasi kosong");
          setIdImplementasi("");
          settanggalImplementasi("");
          setImplementasiId("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const deleteEvaluasiById = (registrasiId, dx, tgl) => {
    axios
      .delete(
        `${apiku}/Askep/Asuhan/Evaluasi/Delete/${registrasiId}/${dx}/${tgl}`,
        options
      )
      // axios.delete(`${apiku}/Askep/Asuhan/Implementasi/DeleteById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //kosongkanformaskep();
          //console.log(res);
          // setListAskepById(
          //     ListAskepById.filter(item => item.registrasiId === id),
          // );
          message.success("Berhasil Dihapus!");
          getHistoryKesimpulanByIdByDx(registrasiId, dx);
        } else {
          message.warning("Gagal Dihapus!");
        }
        // console.log(registrasiId, dx, tgl);
      })
      .catch((err) => {
        message.error("Error Dihapus!");
      });
  };

  const getCatatanPasien = (regId) => {
    axios
      .get(`${apiku}/Askep/Catatan/GetByRegistrasiId/${regId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListCatatanPasien(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setListCatatanPasien([]);
        }
      })
      .catch((err) => {
        setListCatatanPasien([]);
      });
  };

  const getCatatanPasienById = (idCatatan) => {
    axios
      .get(`${apiku}/Askep/Catatan/GetById/${idCatatan}`, options)
      // axios.get(`${apiku}/Askep/Asuhan/Implementasi/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setidCatatan(res.data.result.id);
          setTanggalcatatan(dayjs(res.data.result.tanggal));
          setCatatan(res.data.result.catatan);
          setuserIdCatatan(res.data.result.userId);
        } else {
          console.log("data implementasi kosong");
          setidCatatan("");
          setTanggalcatatan("");
          setCatatan("");
          setuserIdCatatan("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getCatatanRJ = (Reg, Ruang, Tgl) => {
    axios
      .get(
        `${apiku}/Askep/Catatan/ReadCatatanRJ/${Reg}/${Ruang}/${Tgl}`,
        options
      )
      // axios.get(`${apiku}/Askep/Asuhan/Implementasi/GetById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log("data catatan ada", res.data.result);
          setidCatatan(res.data.result.id);
          //setTanggalcatatan(dayjs(res.data.result.tanggal));
          setCatatan(res.data.result.catatan);
          //setuserIdCatatan(res.data.result.userId);
          // console.log(, Reg, Ruang, Tgl);
        } else {
          console.log("data catatan kosong", Reg, Ruang, Tgl);
          setidCatatan(0);
          // setTanggalcatatan('');
          setCatatan("");
          //setuserIdCatatan('');
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const insertCatatanPasien = (dataCatatan) => {
    axios
      .post(`${apiku}/Askep/Catatan/Create`, dataCatatan)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          getCatatanPasien(dataCatatan.registrasiId);
          setTanggalcatatan(dayjs());
          setkatonCatatan(false);
          setkatonBacaCatatan(false);
          setCatatan("");
          setidCatatan(0);
          setsubjekC("");
          setassesmentC("");
          setplanningC("");
          setimplementasiC("");
          setevaluasiC("");
          setwaktu("");
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
        } else {
          sendTele(
            "3",
            "/Askep/Catatan/Create",
            JSON.stringify(res.data),
            ip,
            namauser,
            curpasRI.namaPasien,
            curpasRI.ruangDeskripsi,
            JSON.stringify(dataCatatan)
          );

          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((errors) => {
        console.log(errors);
        //message.error('Gagal Disimpan!');
        message.error("Error Simpan Catatan!");
      });
  };

  const getTTVAll = (noreg) => {
    axios
      .get(`${apiku}/EmrTandaVital/GetAllById/${noreg}`, options)

      .then((res) => {
        if (res.data.statusCode === 200) {
          setTTvByNoreg(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setTTvByNoreg([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getGravikTTV = (noreg) => {
    axios
      .get(`${apiku}/EmrTandaVital/GetStatistikTTV/${noreg}`, options)

      .then((res) => {
        if (res.data.statusCode === 200) {
          setGravikTTV(res.data.result);
          console.log(res.data.result);
        } else {
          console.log("data implementasi kosong");
          setGravikTTV([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const getTTVById = (id) => {
    axios
      .get(`${apiku}/EmrTandaVital/GetTTVById/${id}`, options)

      .then((res) => {
        if (res.data.statusCode === 200) {
          setTglTTV(dayjs(res.data.result.jam));
          settandaVitalId(res.data.result.tandaVitalId);
          setgcsMata(res.data.result.gcsMata);
          setgcsSuara(res.data.result.gcsSuara);
          setgcsGerakan(res.data.result.gcsGerakan);
          settekananDarahSistolik(res.data.result.tekananDarahSistolik);
          settekananDarahDiastolik(res.data.result.tekananDarahDiastolik);
          setsuhuTubuh(res.data.result.suhuTubuh);
          setfrekuensiNadi(res.data.result.frekuensiNadi);
          setfrekuensiNafas(res.data.result.frekuensiNadi);
          setskorNyeri(res.data.result.skorNyeri);
          setUserTTV(res.data.result.userId);
        } else {
          console.log("data implementasi kosong");
          setTglTTV(dayjs());
          settandaVitalId("");
          setgcsMata("");
          setgcsSuara("");
          setgcsGerakan("");
          settekananDarahSistolik("");
          settekananDarahDiastolik("");
          setsuhuTubuh("");
          setfrekuensiNadi("");
          setfrekuensiNafas("");
          setskorNyeri("");
          setUserTTV("");
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const insertTTVPasien = (datatandavital) => {
    //1. insert tanda vital
    axios
      .post(`${apiku}/EmrTandaVital`, datatandavital)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(datatandavital)
          // console.log(res.data.result);
          getTTVAll(datatandavital.registrasiId);
          getGravikTTV(datatandavital.registrasiId);
          setKatonTTV(false);
          setBacaTTV(false);
          setTglTTV(dayjs());
          Modal.success({
            title: "Data Berhasil Disimpan!",
            // content: res.data.message,
          });
        } else {
          console.log("tidak dapat menyimpan");
          message.error("Gagal Menyimpan Tanda Vital!");
          // console.log(datatandavital)
          //setAnamnesa([]);
        }
        //console.log(res.data.result);
        // message.success('Berhasil Disimpan!');
      })
      .catch((errors) => {
        console.log(errors);
        //message.error('Gagal Disimpan!');
        console.log(datatandavital);
        message.error("Error Simpan Tanda Vital!");
      });
  };

  const deleteTTV = (id, registrasiId) => {
    axios
      .delete(`${apiku}/EmrTandaVital/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //kosongkanformaskep();
          //console.log(res);
          // setListAskepById(
          //     ListAskepById.filter(item => item.registrasiId === id),
          // );
          message.success("Berhasil Dihapus!");
          getTTVAll(registrasiId);
          getGravikTTV(registrasiId);
          getCatatanPasienById(registrasiId);
          setBacaTTV(false);
          settandaVitalId(0);
        } else {
          message.warning("Gagal Dihapus!");
        }
      })
      .catch((err) => {
        message.error("Error Dihapus!");
      });
  };

  const deleteCatatan = (id, regisid) => {
    axios
      .delete(`${apiku}/Askep/Catatan/Delete/${id}`, options)
      // axios.delete(`${apiku}/Askep/Asuhan/Implementasi/DeleteById/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          //kosongkanformaskep();
          //console.log(res);
          // setListAskepById(
          //     ListAskepById.filter(item => item.registrasiId === id),
          // );
          setTanggalcatatan(dayjs());
          setCatatan("");
          getCatatanPasien(regisid);
          setkatonBacaCatatan(false);
          message.success("Berhasil Dihapus!");
        } else {
          message.warning("Gagal Dihapus!");
        }
      })
      .catch((err) => {
        message.error("Error Dihapus!");
      });
  };

  const getDataPrint = (RegId) => {
    axios
      .get(`${apiku}/Askep/Asuhan/GetAll/${RegId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          setPrintregistrasiId(res.data.result[0].registrasiId);
          setPrintpasienId(res.data.result[0].pasienId);
          setPrintnamaPasien(res.data.result[0].namaPasien);
          setPrintdeskripsiRuang(res.data.result[0].deskripsiRuang);
          // setPrintpegawaiId((res.data.result[0].pegawaiId));
          setDataPrint(res.data.result);
          // console.log('data cetak askep', res.data.result.nEvaluasi);
          setspinCetakAskep(false);
          // console.log('ini data coba', (res.data.result[0].registrasiId));
        } else {
          message.warning("Data Tidak Ditemukan");
          setspinCetakAskep(false);
          // setvisibleCetakAskep(true);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  const kosongkanformaskep = () => {
    // setAskepByIdByDx('');
    // setregistrasiId('');
    settanggal(dayjs());
    setdiagnosaId("");
    settargetWaktu("");
    setluaranId("");
    setnTandaGejala([]);
    setJenisKriteria("");
    setnIntervensi([]);
    setnKriteria([]);
    setLuaranbydx([]);
  };

  const kosongkanformaskepRJ = () => {
    // setAskepByIdByDx('');
    // setregistrasiId('');
    setnImplementasi([]);
    settanggal(dayjs());
    setdiagnosaId("");
    settargetWaktu("");
    setluaranId("");
    setnTandaGejala([]);
    setJenisKriteria("");
    setnIntervensi([]);
    setnKriteria([]);
    setLuaranbydx([]);
    setidCatatan(0);
    setCatatan("");
    setnKesimpulan("");
    setkesimpulanByTarget("");
    setlistImplementasiByIntervensi([]);
  };

  // const insertAskepRj = (dataaskep, dataimplementasi, datacatatan, dataevaluasi) => {
  //   axios.post(`${apiku}/Askep/Asuhan/Create`, dataaskep)
  //     .then(res => {
  //       if (res.data.statusCode === 200) {
  //         getListAskepById(dataaskep.registrasiId);
  //         // message.success('Berhasil Disimpan!');
  //         axios.post(`${apiku}/Askep/Asuhan/Implementasi/CreateMulti`, dataimplementasi)
  //           .then(res => {
  //             if (res.data.statusCode === 200) {
  //               getImplementasiByIdBDx(dataimplementasi[0].registrasiId, dataimplementasi[0].diagnosaId);
  //               setkatonImplementasi(false);
  //               setImplementasiId([]);
  //               settanggalImplementasi(dayjs());
  //               // message.success('Berhasil Disimpan!');
  //               axios.post(`${apiku}/Askep/Catatan/Create`, datacatatan)
  //                 .then(res => {
  //                   if (res.data.statusCode === 200) {
  //                     getCatatanPasien(datacatatan.registrasiId);
  //                     setTanggalcatatan(dayjs());
  //                     setkatonCatatan(false);
  //                     setkatonBacaCatatan(false);
  //                     // setCatatan('');
  //                     // message.success('Berhasil Disimpan Catatan!');
  //                     axios.post(`${apiku}/Askep/Asuhan/Evaluasi/Create`, dataevaluasi)
  //                       .then(res => {
  //                         if (res.data.statusCode === 200) {
  //                           getHistoryKesimpulanByIdByDx(dataevaluasi[0].registrasiId, dataevaluasi[0].diagnosaId);
  //                           message.success('Berhasil Disimpan!');
  //                           setKatonEvaluasi(false);
  //                           settanggalEvaluasi(dayjs());
  //                           sethasilKesimpulan('');
  //                           setjnskriteria('');
  //                           setKriteriaeva([]);
  //                         } else {
  //                           message.error('Gagal Disimpan Kesimpulan!');
  //                           sendTele(
  //                             "3",
  //                             "Pengkajian Asekp RJ",
  //                             res.data.statusCode + '-' + res.data.message,
  //                             ipPC,
  //                             namauser,
  //                             curpas.namaPasien,
  //                             curpas.ruangDeskripsi,
  //                             JSON.stringify(dataevaluasi)
  //                           );
  //                         }
  //                       })
  //                   } else {
  //                     message.error('Gagal Menyimpan Catatan!');
  //                     sendTele(
  //                       "3",
  //                       "Pengkajian Asekp RJ",
  //                       res.data.statusCode + '-' + res.data.message,
  //                       ipPC,
  //                       namauser,
  //                       curpas.namaPasien,
  //                       curpas.ruangDeskripsi,
  //                       JSON.stringify(datacatatan)
  //                     );
  //                   }
  //                 })
  //             } else {
  //               message.error('Gagal Disimpan Implementasi!');
  //               sendTele(
  //                 "3",
  //                 "Pengkajian Asekp RJ",
  //                 res.data.statusCode + '-' + res.data.message,
  //                 ipPC,
  //                 namauser,
  //                 curpas.namaPasien,
  //                 curpas.ruangDeskripsi,
  //                 JSON.stringify(dataimplementasi)
  //               );
  //             }
  //           })
  //       } else {
  //         message.error('Gagal Disimpan Pengkajian!');
  //         sendTele(
  //           "3",
  //           "Pengkajian Asekp RJ",
  //           res.data.statusCode + '-' + res.data.message,
  //           ipPC,
  //           namauser,
  //           curpas.namaPasien,
  //           curpas.ruangDeskripsi,
  //           JSON.stringify(dataaskep)
  //         );
  //       }
  //     })
  //     .catch((errors) => {
  //       message.error('Error !');
  //     });
  // }
  const insertAskepRj = (dataaskep) => {
    axios.post(`${apiku}/askep/Asuhan/CreateRJ`, dataaskep).then((res) => {
      if (res.data.statusCode === 200) {
        Modal.success({
          title: "Data Berhasil Disimpan!",
          // content: res.data.message,
        });
        getListAskepByIdByLayanan(dataaskep.registrasiId, 2);
        // getImplementasiByIdBDx(dataaskep.registrasiId, dataaskep.diagnosaId);
        // getCatatanPasien(dataaskep.registrasiId);
        // getHistoryKesimpulanByIdByDx(dataaskep.registrasiId, dataaskep.diagnosaId);
        getCatatanRJ(
          dataaskep.registrasiId,
          dataaskep.ruangId,
          dayjs(curpas.tanggalMasuk.split("-").reverse().join("-")).format(
            "YYYY-MM-DD"
          )
        );
        console.log(dataaskep);
      } else {
        sendTele(
          "3",
          "/askep/Asuhan/CreateRJ",
          JSON.stringify(res.data),
          ip,
          namauser,
          curpas.namaPasien,
          curpas.ruangDeskripsi,
          JSON.stringify(dataaskep)
        );

        Modal.warning({
          title: "Gagal Menyimpan Data!",
          content: JSON.stringify(res.data),
        });
      }
    });
  };

  const getKeimpulanHisRJ = (id, dx, ruang, tgl) => {
    axios
      .get(
        `${apiku}/Askep/Asuhan/Evaluasi/GetRiwayat/${id}/${dx}/${ruang}/${tgl}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setnKesimpulan(res.data.result.kriteriaHasil);
          setkesimpulanByTarget(res.data.result.kesimpulan);
          // console.log('ini data kriteria yang akan dievaluasi', res.data.result)
        } else {
          setnKesimpulan("");
          setkesimpulanByTarget("");
          //setAnamnesa([]);
        }
      })
      .catch((err) => {
        message.error(err);
      });
  };

  return (
    <AskepContext.Provider
      value={{
        cekAssement,
        cekAssementTombol,
        setvaluecekAssesment,
        valuecekAssesment,
        tanggal,
        settanggal,
        diagnosaId,
        setdiagnosaId,
        targetWaktu,
        settargetWaktu,
        luaranId,
        setluaranId,
        nTandaGejala,
        setnTandaGejala,
        nIntervensi,
        setnIntervensi,
        nImplementasi,
        setnImplementasi,
        nKesimpulan,
        setnKesimpulan,
        nKriteria,
        setnKriteria,
        insertEmrAskep,
        kosongkanformaskep,
        ListAskepById,
        getListAskepById,
        getAskepByIdByDx,
        AskepByIdByDx,
        registrasiId,
        setregistrasiId,
        deleteAskpeByIdByDx,
        HasilEvaluasi,
        insertEvaluasiAskep,
        KriterianEvaluasiByIdByDx,
        getKriterianEvaluasiByIdByDx,
        ImplementasiByIdByDx,
        getListImplementasiByIdByDx,
        implementasiId,
        setImplementasiId,
        insertImplementasiAskep,
        ListImplementasiById,
        getListImplementasiById,
        jenisKriteria,
        setJenisKriteria,
        diagnosaDeskripsi,
        getListAskepByIdByLayanan,
        setListAskepByIdByLayanana,
        ListAskepByIdByLayanana,
        getListImplementasiByIdByDxBylayanana,
        // setImplementasiByIdByDxBylayanan, ImplementasiByIdByDxBylayanan,
        // getImplementasiByIdBDx,
        tanggalImplementasi,
        settanggalImplementasi,
        deleteImplementasiById,
        getImplementasiByIdImplementasi,
        IdImplementasi,
        setIdImplementasi,
        curpasRI,
        userlog,
        listmsttandagejala,
        keteranganImplementasi,
        setketeranganImplementasi,
        tanggalEvaluasi,
        settanggalEvaluasi,
        hasilkesimpulan,
        sethasilKesimpulan,
        getKesimpulan,
        historyKesimpulan,
        setHistoryKesimpulan,
        getImplementasiByIdBDx,
        listImplementasiByIdDiagnosa,
        historyKesimpulanByIdBydx,
        getHistoryKesimpulanByIdByDx,
        deleteEvaluasiById,

        katonImplementasi,
        setkatonImplementasi,
        katonEvaluasi,
        setKatonEvaluasi,

        listCatatanPasien,
        katonCatatan,
        setkatonCatatan,
        tanggalCatatan,
        setTanggalcatatan,
        insertCatatanPasien,
        catatan,
        setCatatan,
        idCatatan,
        setidCatatan,
        userIdcatatan,
        getCatatanPasienById,
        deleteCatatan,
        katonBacaCatatan,
        setkatonBacaCatatan,
        kriteriaeva,
        setKriteriaeva,
        jnskriteria,
        setjnskriteria,
        userIdAskep,
        getCatatanPasien,
        getCatatanRJ,
        subjekC,
        setsubjekC,
        assesmentC,
        setassesmentC,
        planningC,
        setplanningC,
        implementasiC,
        setimplementasiC,
        evaluasiC,
        setevaluasiC,
        waktu,
        setwaktu,

        //tandavital//
        tandaVitalId,
        settandaVitalId,
        gcsMata,
        setgcsMata,
        gcsSuara,
        setgcsSuara,
        gcsGerakan,
        setgcsGerakan,
        tekananDarahSistolik,
        settekananDarahSistolik,
        tekananDarahDiastolik,
        settekananDarahDiastolik,
        suhuTubuh,
        setsuhuTubuh,
        frekuensiNadi,
        setfrekuensiNadi,
        frekuensiNafas,
        setfrekuensiNafas,
        skorNyeri,
        setskorNyeri,
        katonTTV,
        setKatonTTV,
        bacaTTV,
        setBacaTTV,
        insertTTVPasien,
        tglTTV,
        setTglTTV,
        ttvByNoreg,
        getTTVAll,
        grabikTTV,
        getGravikTTV,
        userTTV,
        setUserTTV,
        deleteTTV,
        getTTVById,

        hiddenSaveButton,
        setHiddenSaveButton,
        hiddenSaveEdit,
        setHiddenSaveEdit,
        warningtgl,

        ipPc,
        setIpPC,
        namePc,
        setNamePC,
        getDataPrint,
        printregistrasiId,
        setPrintregistrasiId,
        printpasienId,
        setPrintpasienId,
        printnamaPasien,
        setPrintnamaPasien,
        printtanggal,
        setPrinttanggal,
        printruangId,
        setPrintruangId,
        printdeskripsiRuang,
        setPrintdeskripsiRuang,
        printpegawaiId,
        setPrintpegawaiId,
        dataPrint,
        setDataPrint,

        listCaramasuk,
        setlistCaraMasuk,

        tanggalKeluhan,
        settanggalKeluhan,
        caraMasuk,
        setcaraMasuk,
        riwayatAlergi,
        setriwayatAlergi,
        riwayat,
        setriwayat,
        riwayatGenetik,
        setriwayatGenetik,
        ppsId,
        setppsId,
        nKeluhanNew,
        setnKeluhanNew,
        keluhanId,
        setkeluhanId,
        karakteristikId,
        setkarakteristikId,
        keluhanLain,
        setkeluhanLain,
        tablekeluhan,
        settablekeluhan,
        namakeluhan,
        setNamaKeluhan,
        namakarakterisitik,
        setNamaKarakteristik,
        getTandaGejalaByNoreg,
        visibleCetakAskep,
        setvisibleCetakAskep,
        spinCetakAskep,
        setspinCetakAskep,
        spinSimpanAskep,
        setspinspinSimpanAskep,
        spinGetAskep,
        setspinGetAskep,

        getHistoryKesimpulan,
        setListImplementasiByIdDiagnosa,
        setHistoryKesimpulanByIdBydx,
        warnaRow,
        setWarnaRow,
        insertImplementasiAskepMulti,
        insertAskepRj,
        getKeimpulanHisRJ,
        kosongkanformaskepRJ,
        load,
        setLoad,
        cekAssesmentRI,

        getImplementasiReg,
        implementasiByreg,
        setimplementasiByreg,
      }}
    >
      {props.children}
    </AskepContext.Provider>
  );
};

export default AskepContextProvider;
