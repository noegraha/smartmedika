import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { LoginContext } from "../../../rawatjalan/context/LoginContext";
import { message } from "antd";
import dayjs from "dayjs";
// import jwt_decode from "jwt-decode";
// import Koneksi from '../component/api/koneksi';

export const MasterPegawaiContext = createContext();

const MasterPegawaiContextProvider = (props) => {
  const [pegawaiid, setPegawaiID] = useState(null);
  const [pegawailist, setPegawaiList] = useState([]);
  const [pegawaidetail, setPegawaiDetail] = useState([]);
  const [warnaPilih, setwarnaPilih] = useState("");
  const [pegawaiDetail, setpegawaiDetail] = useState("");
  const [panggolByBulan, setpanggolByBulan] = useState("");
  const [panggolBawahan, setPanggoBawahan] = useState("");

  const [nik, setNIK] = useState(null);
  const [nip, setNIP] = useState(null);
  const [dokterid, setDokterID] = useState(null);
  const [nama, setNama] = useState(null);
  const [tempatlahir, setTempatLahir] = useState(null);
  const [tglLahir, setTglLahir] = useState(null);
  const [jnskelamin, setJnsKelamin] = useState(null);
  const [agama, setAgama] = useState(null);
  const [alamat, setAlamat] = useState(null);
  const [desaid, setDesaId] = useState(null);
  const [kodePos, setKodePos] = useState(null);
  const [email, setEmail] = useState(null);
  const [noTelepon, setNoTelepon] = useState(null);
  const [fax, setFax] = useState(null);
  const [tanggalStr, setTanggalStr] = useState(null);
  const [akhirStr, setAkhirStr] = useState(null);
  const [akhirSip, setAkhirSip] = useState(null);
  const [tanggalTmt, setTanggalTmt] = useState(null);
  const [tanggalSip, setTanggalSip] = useState(null);
  const [noSip, setNoSip] = useState(null);
  const [noStr, setNoStr] = useState(null);
  const [noRekening, setNoRekening] = useState(null);
  const [jenisTenagaKesehatanFhirid, setJenisTenagaKesehatanFhirid] =
    useState(null);
  const [tandatangan, setTandaTangan] = useState(null);

  const [tenagakesehatan, setTenagaKesehatan] = useState([null]);
  const [tenagaKesehatanId, setTenagaKesehatanId] = useState(null);
  const [kategoriPelaksanaId, setKategoriPelaksanaId] = useState([null]);
  const [codeAktivasi, setAktivasi] = useState([null]);

  const [pendidikan, setPendidikan] = useState(null);
  const [statusKawin, setStatusKawin] = useState(null);

  const [ip, setIP] = useState("");
  const [pc, setPC] = useState("");
  const [curpas, setCurpas] = useState("");

  const [lebar, setLebar] = useState(250);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loadingdetail, setLoadingDetail] = useState(false);
  const [form, setForm] = useState(null);
  const [warnarow, setWarnaRow] = useState(null);

  const [panggol, setpanggol] = useState("");
  const [jabfung, setjabfung] = useState("");

  // const [line2, setLine] = useState([]);
  const [line3, setLine2] = useState([]);

  //data pegawai dr nadiku
  const [namaPilih, setnamaPilih] = useState("");
  const [userPilih, setuserPilih] = useState("");
  const [pegawaiIdpPilih, setpegawaiIdpPilih] = useState("");
  const [ruangPilih, setruangPilih] = useState("");
  const namauser = sessionStorage.getItem("userId");

  //pangkatglongan jabfung
  const [pangkatPegawaiId, setpangkatPegawaiId] = useState(0);
  const [pangkatGolonganId, setpangkatGolonganId] = useState("");
  const [tmtPangkat, settmtPangkat] = useState(dayjs());
  const [tglAkhirPangkat, settglAkhirPangkat] = useState(
    dayjs().add(4, "year")
  );
  const [listRuangUSer, setlistRuangUSer] = useState([]);

  const [jabFungId, setjabFungId] = useState("");
  const [detailPegawaiNadiku, setdetailPegawaiNadiku] = useState("");

  const token = sessionStorage.getItem("userData");

  const apiku = sessionStorage.getItem("api");

  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  // useEffect(() => {
  //   const tok = sessionStorage.getItem("userData");
  //   const usr = sessionStorage.getItem("user");

  //   const options = {
  //     headers: { Authorization: "Bearer " + tok },
  //   };

  //   axios
  //     .get(`${apiku}/SisGetIP/GetIp`, options)
  //     .then((res) => {
  //       if (res.data.statusCode === 200) {
  //         setIP(res.data.result.currentIP);
  //         setPC(res.data.result.clientHost);
  //         sessionStorage.setItem("IP", res.data.result.currentIP);
  //         sessionStorage.setItem("Host", res.data.result.clientHost);
  //       } else {
  //         message.warning(res.data.result);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [token, apiku]);

  const cariPegawaiListAll = (nama) => {
    axios
      .get(`${apiku}/MstPegawai/Lookup/${nama}/1/10`, options)
      .then((res) => {
        setPegawaiList(res.data.result);
        console.log(res.data.result);
        setLoading(false);
      })
      .catch((err) => {
        setPegawaiList([]);
        console.log(err);
        setLoading(false);
      });
  };

  const insertPegawai = (datapegawai) => {
    axios
      .post(`${apiku}/MstPegawai`, datapegawai, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Diupdate!");
          getPegawaiDetail(res.data.result.pegawaiId);
          if (
            res.data.result.kategoriPelaksanaId ===
            datapegawai.kategoriPelaksanaId
          ) {
            cariPegawaiListAll(pegawaiid);
            setLoading(true);
            setWarnaRow(false);
          } else {
            cariPegawaiListAll(res.data.result.pegawaiId);
            setLoading(true);
          }
        } else {
          console.log(res.data.result);
          message.warn("Cek Lagi", res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Diupdate!");
      });
  };

  const insertPegawai2 = (datapegawai2) => {
    axios
      .post(`${apiku}/MstPegawai`, datapegawai2, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Disimpan!");
          getPegawaiDetail(res.data.result.pegawaiId);
          cariPegawaiListAll(res.data.result.pegawaiId);
          setLoading(true);
        } else {
          console.log(res.data.result);
          message.warn("Cek Lagi", res.data.result);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const aktivasiPegawai = (e) => {
    const promise = new Promise((resolve, reject) => {
      axios
        .put(`${apiku}/MstPegawai?PegawaiId=${codeAktivasi}`, e, {
          headers: options.headers,
        })
        .then(
          (result) => {
            resolve(result.data);
            if (result.data.statusCode === 200) {
              console.log(result.data.result);
              message.success("Berhasil Diaktivasi!");
              cariPegawaiListAll(codeAktivasi);
            } else {
              message.error("Error");
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
    return promise;
  };

  const getPegawaiDetail = (id) => {
    axios
      .get(`${apiku}/MstPegawai/Read/${id}`, options)
      .then((res) => {
        setPegawaiDetail(res.data.result);
        console.log("pegawai?", res.data.result);
        setPegawaiID(res.data.result.pegawaiId);
        setNIK(res.data.result.nik);
        setNIP(res.data.result.nip);
        setDokterID(res.data.result.dokterId);
        setTandaTangan(res.data.result.tandaTangan);
        setNama(res.data.result.nama);
        setAgama(res.data.result.agamaId);
        setPendidikan(res.data.result.pendidikanId);
        setStatusKawin(res.data.result.statusKawin);
        setAlamat(res.data.result.alamat);
        setTempatLahir(res.data.result.tempatLahir);
        setTglLahir(res.data.result.tglLahir);
        setJnsKelamin(res.data.result.jenisKelamin);
        setEmail(res.data.result.email);
        setNoTelepon(res.data.result.noTelepon);
        setFax(res.data.result.fax);
        setDesaId(res.data.result.desaId);
        setKodePos(res.data.result.kodePos);
        setTanggalStr(res.data.result.tanggalStr);
        setAkhirStr(res.data.result.akhirStr);
        setAkhirSip(res.data.result.akhirSip);
        setTanggalTmt(res.data.result.tanggalTmt);
        setTanggalSip(res.data.result.tanggalSip);
        setNoSip(res.data.result.noSip);
        setNoStr(res.data.result.noStr);
        setNoRekening(res.data.result.noRekening);
        setJenisTenagaKesehatanFhirid(
          res.data.result.jenisTenagaKesehatanFhirid
        );
        setTenagaKesehatan(res.data.result.tenagaKesehatan);
        setTenagaKesehatanId(res.data.result.tenagaKesehatanId);
        setKategoriPelaksanaId(res.data.result.kategoriPelaksanaId);

        setLoadingDetail(false);
      })
      .catch((err) => {
        setPegawaiDetail([]);
        window.location.reload();
        setLoadingDetail(false);
        console.log(err);
        message.error("error");
      });
  };

  const getListPegawaisSkey = (nama) => {
    axios
      .get(`${apiku}/MstPegawai/LookupPegawai/${nama}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPegawaiList(res.data.result);
          console.log(res.data.result);
        } else {
          message.warning(res.data.result);
          setPegawaiList([]);
        }
      })
      .catch((err) => {});
  };

  const getpegawaidetail = (userid, bulan) => {
    console.log(".masuk" + userid);
    axios
      .get(`${apiku}/MstPegawai/DetailPegawai/${userid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setpegawaiDetail(res.data.result);
          // getPegawaiById(res.data.result.PegawaiId);
          console.log(res.data.result);
          // getDetailPegawaiNadiku(res.data.result.PegawaiId);
          axios
            .get(
              `${apiku}/MstPegawai/ReadPangkatPegawai/${res.data.result.PegawaiId}/${bulan}`,
              options
            )
            .then((res) => {
              if (res.data.statusCode === 200) {
                setpanggolByBulan(res.data.result);
                // getPegawaiById(res.data.result.PegawaiId);
                console.log(res.data.result);
              } else {
                message.warning(res.data.result);
                setpanggolByBulan({
                  PangkatGolongan: "",
                  Deskripsi: "",
                  Jenjang: "",
                  KategoriGolongan: "",
                });
                console.log("gagal");
              }
            })
            .catch((err) => {
              setpanggolByBulan({
                PangkatGolongan: "",
                Deskripsi: "",
                Jenjang: "",
                KategoriGolongan: "",
              });
              console.log("error");
            });
        } else {
          message.warning(res.data.result);
          setpegawaiDetail([]);
          console.log("gagal");
        }
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const getpanggolBawahan = (pegawaiid, bulan) => {
    console.log(pegawaiid, bulan);
    axios
      .get(
        `${apiku}/MstPegawai/ReadPangkatPegawai/${pegawaiid}/${bulan}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPanggoBawahan(res.data.result);
          console.log(res.data.result);
        } else {
          setPanggoBawahan("");
          console.log("gagal");
        }
      })
      .catch((err) => {
        setPanggoBawahan("");
        console.log("error");
      });
  };

  const getPegawaiById = (pegawaiId) => {
    axios
      .get(`${apiku}/MstPegawai/ReadPegawai/${pegawaiId}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPegawaiDetail(res.data.result[0]);
          setpanggol(res.data.result[0].PangkatGolongaId);
          setjabfung(res.data.result[0].JabFungId.trim());
          console.log(res.data.result[0].PangkatGolongaId);
          console.log(res.data.result[0].JabFungId.trim());
          console.log(res.data.result);
        } else {
          message.warning(res.data.result);
          setPegawaiDetail([]);
          console.log("data pegawai tidak ketemu");
        }
      })
      .catch((err) => {
        console.log("data pegawai null");
      });
  };

  const getCurrentTime = (
    separator = "-",
    separator2 = ":",
    separator3 = "T"
  ) => {
    let newDate = new Date();
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    let time = newDate.getHours();
    let minute = newDate.getMinutes();
    let second = newDate.getSeconds();
    return `${year}${separator}${
      month < 10 ? `0${month}` : `${month}`
    }${separator}${date < 10 ? `0${date}` : `${date}`}${separator3}${
      time < 10 ? `0${time}` : `${time}`
    }${separator2}${minute < 10 ? `0${minute}` : `${minute}`}${separator2}${
      second < 10 ? `0${second}` : `${second}`
    }`;
  };

  const deletePegawai = (e) => {
    const promise = new Promise((resolve, reject) => {
      axios.delete(`${apiku}/MstPegawai?PegawaiId=${e}`, options).then(
        (result) => {
          resolve(result.data);
          if (result.data.statusCode === 200) {
            console.log(result.data.result);
            message.success("Berhasil Dihapus!");
            cariPegawaiListAll(pegawaiid);
            setLoading(true);
            setForm(false);
          } else {
            message.error("Error");
          }
        },
        (err) => {
          reject(err);
        }
      );
    });
    return promise;
  };

  const insertPanggolPegawai = (datapanggol) => {
    // setloading(true);
    axios
      .post(`${apiku}/MstPegawai/PangkatPegawai`, datapanggol, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          getpegawaidetail(namauser, dayjs().format("MM-YYYY"));
          message.success("Berhasil Disimpan!");
        } else {
          message.warn("Cek Lagi");
        }
      })
      .catch((err) => {
        // setloading(false);
        message.error("Error Saat Menyimpan Data Kegiatan");
      });
  };

  const getDetailPegawaiNadiku = (idegawai) => {
    // setloading(true);
    axios
      .post(
        `http://182.168.0.236:8080/nadiku_new/api/v1/pegawai/detail_pegawai`,
        {
          id_pegawai: idegawai,
        }
      )
      .then((res) => {
        console.log(res.data.code);
        if (res.data.code === "200") {
          console.log(res.data.result);
          setLoadingDetail(false);
          setdetailPegawaiNadiku(res.data.result);
          // message.success("Berhasil Menyimpan Data Kegiatan!");
        } else {
          setdetailPegawaiNadiku("");
          setLoadingDetail(false);
          message.warning("Gagal Mengambil Data Pegawai!");
        }
      })
      .catch((err) => {
        setdetailPegawaiNadiku("");
        setLoadingDetail(false);
        message.error("Error Saat Mengambil Data Pegawai");
      });
  };

  const synchNadiku = (idegawai) => {
    // setloading(true);
    axios
      .post(
        `http://182.168.0.236:8080/nadiku_new/api/v1/pegawai/sync_pegawai`,
        {
          id_pegawai: idegawai,
        }
      )
      .then((res) => {
        console.log(res.data.code);
        if (res.data.code === "200") {
          console.log(res.data.result);
          setLoadingDetail(false);
          message.success("Berhasil Sinkron Data Pegawai!");
        } else {
          setLoadingDetail(false);
          message.warning("Gagal Sinkron Data Pegawai!");
        }
      })
      .catch((err) => {
        setLoadingDetail(false);
        message.error("Error Sinkron Data Pegawai");
      });
  };

  const getruangUser = (user, key, grup) => {
    console.log(user, key, grup);
    axios
      .get(`${apiku}/SisJwt/RuangByUser/${user}/${key}/${grup}/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistRuangUSer(res.data.result);
          console.log(res.data.result);
        } else {
          setlistRuangUSer([]);
          console.log("tidak di temukan");
        }
      })
      .catch((err) => {
        console.log("eror");
        setlistRuangUSer([]);
      });
  };

  return (
    <MasterPegawaiContext.Provider
      value={{
        insertPegawai,
        insertPegawai2,
        aktivasiPegawai,
        cariPegawaiListAll,
        setPegawaiID,
        kategoriPelaksanaId,
        setKategoriPelaksanaId,
        nik,
        setNIK,
        nama,
        setNama,
        tempatlahir,
        setTempatLahir,
        tglLahir,
        setTglLahir,
        jnskelamin,
        setJnsKelamin,
        agama,
        setAgama,
        alamat,
        setAlamat,
        desaid,
        setDesaId,
        email,
        setEmail,
        noTelepon,
        setNoTelepon,
        pendidikan,
        setPendidikan,
        statusKawin,
        setStatusKawin,
        kodePos,
        setKodePos,
        fax,
        setFax,
        pegawailist,
        setPegawaiList,
        loadingdetail,
        setLoading,
        pegawaiid,
        getPegawaiDetail,
        pegawaidetail,
        tanggalStr,
        setTanggalStr,
        tanggalTmt,
        setTanggalTmt,
        tanggalSip,
        setTanggalSip,
        jenisTenagaKesehatanFhirid,
        setJenisTenagaKesehatanFhirid,
        noSip,
        setNoSip,
        noStr,
        setNoStr,
        tenagaKesehatanId,
        setTenagaKesehatanId,
        akhirStr,
        akhirSip,
        setAkhirStr,
        setAkhirSip,
        loading,
        setLoadingDetail,
        lebar,
        setLebar,
        line3,
        curpas,
        setCurpas,
        refresh,
        setRefresh,
        ip,
        pc,
        getCurrentTime,
        tenagakesehatan,
        setTenagaKesehatan,
        noRekening,
        setNoRekening,
        deletePegawai,
        setAktivasi,
        setForm,
        form,
        setWarnaRow,
        warnarow,
        tandatangan,
        setTandaTangan,
        nip,
        setNIP,
        dokterid,
        setDokterID,
        getListPegawaisSkey,
        getPegawaiById,
        warnaPilih,
        setwarnaPilih,

        getpegawaidetail,
        pegawaiDetail,
        setPegawaiDetail,
        jabfung,
        setjabfung,
        panggol,
        setpanggol,
        panggolByBulan,
        setpanggolByBulan,
        panggolBawahan,
        getpanggolBawahan,

        //pangkatgolongan jabfung
        pangkatPegawaiId,
        setpangkatPegawaiId,
        pangkatGolonganId,
        setpangkatGolonganId,
        tmtPangkat,
        settmtPangkat,
        tglAkhirPangkat,
        settglAkhirPangkat,
        jabFungId,
        setjabFungId,
        insertPanggolPegawai,
        getDetailPegawaiNadiku,
        detailPegawaiNadiku,
        synchNadiku,
        listRuangUSer,
        setlistRuangUSer,
        getruangUser,
      }}
    >
      {props.children}
    </MasterPegawaiContext.Provider>
  );
};

export default MasterPegawaiContextProvider;
