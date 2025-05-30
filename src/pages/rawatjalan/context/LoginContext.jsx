import React, { createContext, useState } from "react";
import { Button, Image, message, Modal } from "antd";
import jwt_decode from "jwt-decode";
import { apiInstance } from "../../../api/axios";
import {
  decryptJSON,
  decryptKeysAndValues,
  encryptJSON,
} from "../../../utils/decrytor";
export const LoginContext = createContext();

const LoginContextProvider = (props) => {
  const [user, setUser] = useState([]);
  const [usersync, setUserSync] = useState(null);
  const [datauser, setDataUser] = useState([]);
  const [userName, setUserName] = useState("");
  const [passWord, setPassWord] = useState("");
  const [passWordsaja, setPassWordsaja] = useState("");
  const [passWordBaru, setPassWordBaru] = useState("");
  const [pegawaiId, setPegawaiID] = useState(null);
  const [namaLengkap, setNamaLengkap] = useState(null);
  const [email, setEmail] = useState(null);
  const [tandaTangan, setTandaTangan] = useState(null);
  const [login, setLogin] = useState(false);
  const [namauser, setNama] = useState(sessionStorage.getItem("userId"));
  const [token, setToken] = useState(sessionStorage.getItem("userData"));
  const [enkripnama, setEnkripnama] = useState(
    sessionStorage.getItem("userName")
  );
  const [userenkrip, setUserenkrip] = useState(sessionStorage.getItem("user"));
  const [ttd, setTtd] = useState(sessionStorage.getItem("ttd"));
  const [pegawai, setPegawai] = useState(sessionStorage.getItem("pegawai"));
  const [authId, setAuthId] = useState("");

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [listRuangan, setListRuangan] = useState([]);
  const [komputer, setKomputer] = useState(null);
  const [modalKomputer, setModalKomputer] = useState(false);
  const [ipPC, setipPc] = useState(sessionStorage.getItem("IP"));
  const [hostPc, sethostPc] = useState(sessionStorage.getItem("Host"));

  // const [tema, setTema] = useState("");

  //CEK CURRENT URL
  const currentURL = new URL(window.location.href);
  const host = currentURL.host;

  //API BACKEND
  const [apiku, setAPI] = useState(
    host === "smart.rsmargono.id" || host === "smart.rsmargono.my.id"
      ? process.env.REACT_APP_API_BASE_SECURE
      : process.env.REACT_APP_API_BASE_URL
  );
  const [apiPenunjang, setapiPenunjang] = useState(
    host === "smart.rsmargono.id" || host === "smart.rsmargono.my.id"
      ? process.env.REACT_APP_API_BASE_SECURE
      : process.env.REACT_APP_API_BASE_URL_PENUNJANG
  );
  const [apiReport, setapiReport] = useState(
    host === "smart.rsmargono.id" || host === "smart.rsmargono.my.id"
      ? process.env.REACT_APP_API_BASE_URL_REPORTSECURE
      : process.env.REACT_APP_API_BASE_URL_REPORT
  );
  const [environment, setEnvironment] = useState("prod");

  //LOADING
  const [loading, setLoading] = useState(false);
  const [loadingPoli, setLoadingPoli] = useState(false);
  const [loadingUser, setLoadingUser] = useState(false);

  //RATING
  const [rating, setRating] = useState([]);
  const [ratingpure, setRatingPure] = useState("0.00");
  const [tanggalawal, setTanggalawal] = useState("");
  const [tanggalakhir, setTanggalakhir] = useState("");
  const [ratingpilih, setRatingpilih] = useState("");
  const [komentar, setKomentar] = useState([]);
  const [loadingrating, setLoadingRating] = useState([]);

  //IMAGE PERMISSION
  const binaryImage = require("../../../assets/img/permission.png");

  // PENUNJANG
  const [flagOrderDarah, setflagOrderDarah] = useState(false);

  const reverseString = (word) => {
    var splitStr = word.split("");
    var reverseArray = splitStr.reverse();
    var joinArray = reverseArray.join("");
    return joinArray;
  };

  const enkrip = (wd) => {
    var balik = reverseString(wd);
    var kata = balik.split("");
    var s = [];
    var i;
    for (i = 0; i < kata.length; i++) {
      if (kata[i].charCodeAt(0) < 79) {
        s.push(String.fromCharCode(kata[i].charCodeAt(0) + 47));
      } else {
        s.push(String.fromCharCode(kata[i].charCodeAt(0) - 47));
      }
    }
    return s.join("");
  };

  const sendTele = (
    emote,
    ws,
    status,
    message,
    ip,
    user,
    namapasien,
    ruang
  ) => {
    apiInstance
      .post(`${apiku}/BridgeTele`, {
        clientId: "RJP",
        emote: emote,
        message: `Warning ${ws} \nMessage : {${status}-${message}} \nPasien : ${namapasien} \nRuang : ${ruang} \nIP : ${ip} \nUSER : ${user}`,
      })
      .then((res) => {
        console.log("warning bridge tele", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendTeleSync = (emote, ws, status, message, ip, user, ruang) => {
    apiInstance
      .post(`${apiku}/BridgeTele`, {
        clientId: "RJP",
        emote: emote,
        message: `Warning ${ws} \nMessage : {${status}-${message}} \nRuang : ${ruang} \nIP : ${ip} \nUSER : ${user}`,
      })
      .then((res) => {
        console.log("warning bridge tele", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const signIn = (username, password) => {
    const nama = username.toUpperCase();
    const pass = password;
    console.log(enkrip(nama) + " - " + enkrip(pass));
    setUsername(enkrip(nama));
    setPassword(enkrip(pass));
    apiInstance
      .post(
        `${apiku}/sisJwt`,
        {
          username: enkrip(nama),
          password: enkrip(pass),
        }
        // encryptJSON({
        //   username: enkrip(nama),
        //   password: enkrip(pass),
        // })
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          if (res.data.result != null) {
            // const dataLogin = JSON.parse(decryptJSON(res.data.result));
            const dataLogin = res.data.result;
            sessionStorage.setItem("userData", dataLogin.token);
            sessionStorage.setItem("userId", username.toUpperCase());
            sessionStorage.setItem("authId", dataLogin.authId);
            sessionStorage.setItem("api", apiku);
            sessionStorage.setItem("environment", environment);
            sessionStorage.setItem("apiPenunjang", apiPenunjang);
            sessionStorage.setItem("apiReporting", apiReport);
            sessionStorage.setItem("ttd", dataLogin.tandaTangan);
            sessionStorage.setItem("pegawai", dataLogin.pegawaiId);
            sessionStorage.setItem("namapetugas", dataLogin.namaLengkap);
            const jewete = jwt_decode(dataLogin.token);
            // https://stackoverflow.com/questions/4044845/retrieving-a-property-of-a-json-object-by-index/33322964
            var index = [];

            // build the index
            for (var x in jewete) {
              index.push(x);
            }

            // sort the index
            index.sort(function (a, b) {
              return a === b ? 0 : a > b ? 1 : -1;
            });

            // return jewete[index[1]];
            sessionStorage.setItem("userRole", jewete.roles);
            sessionStorage.setItem(
              "user",
              encodeURIComponent(jewete[index[1]])
            );
            setUserenkrip(encodeURIComponent(jewete[index[1]]));
            sessionStorage.setItem(
              "timeOut",
              encodeURIComponent(jewete[index[4]])
            );
            setToken(dataLogin.token);
            setUser(dataLogin);
            setLogin(true);
            setNama(username.toUpperCase());
            setAuthId(dataLogin.authId);
            setTtd(dataLogin.tandaTangan);
            setPegawai(dataLogin.pegawaiId);
            if (res.data.message.includes("tidak")) {
              message.warning(
                {
                  style: { marginTop: 30 },
                  content: (
                    <>
                      Login Berhasil. Kata sandi Anda terdeteksi tidak aman.
                      <br />
                      Silahkan ubah kata sandi Anda di menu Setting ➡️ Account.
                    </>
                  ),
                },
                5
              );
            } else {
              message.success(
                {
                  style: { marginTop: 30 },
                  content:
                    "Terima Kasih... Sugeng Rawuh " +
                    dataLogin.namaLengkap +
                    " ! 😄",
                  duration: 5,
                },
                2
              );
            }

            setLoadingPoli(true);
            apiInstance
              .post(`${apiku}/BridgeROnline/GetRatingDokterPure`, {
                kode_dokter: dataLogin.pegawaiId ? dataLogin.pegawaiId : "",
                start_date: "",
                end_date: "",
              })
              .then((response) => {
                setRatingPure(response.data.result.rating[0].avg_rate);
              })
              .catch((error) => {
                setRatingPure(0);
                // console.log(error);
              });
            apiInstance
              .get(`${apiku}/SisGetIP/GetIp`)
              .then((res) => {
                if (res.data.statusCode === 200) {
                  setipPc(res.data.result.currentIP);
                  sethostPc(res.data.result.clientHost);
                  sessionStorage.setItem("IP", res.data.result.currentIP);
                  sessionStorage.setItem("Host", res.data.result.clientHost);
                } else if (res.data.statusCode === 201) {
                  setipPc(res.data.result.currentIP);
                  sethostPc(res.data.result.clientHost);
                  sessionStorage.setItem("IP", res.data.result.currentIP);
                  sessionStorage.setItem("Host", res.data.result.clientHost);
                  setModalKomputer(true);
                  console.log(res.data);
                } else {
                  setipPc("182.168.1.1");
                  sethostPc("SmartMedika");
                  sessionStorage.setItem("IP", "182.168.1.1");
                  sessionStorage.setItem("Host", "SmartMedika");
                  console.log(res.data);
                }
              })
              .catch((err) => {
                console.log(err);
                setipPc("182.168.1.1");
                sethostPc("SmartMedika");
                sessionStorage.setItem("IP", "182.168.1.1");
                sessionStorage.setItem("Host", "SmartMedika");
                console.log("data ip dan host eror");
              })
              .finally(() => {
                console.log(ipPC);
              });
          } else {
            alert("Invalid Login Data");
            console.log(res.data);
          }
        } else {
          message.warning(
            "Ups, sepertinya terjadi kesalahan input data! Cek Username dan Password Anda. Password sensitif besar-kecil."
          );
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(apiku);
        if (apiku === process.env.REACT_APP_API_BASE_URLS) {
          Modal.info({
            content: (
              <div>
                <p>
                  Anda perlu melakukan ijin (permission) pada webservice
                  silahkan buka link berikut dan lanjutkan pemberian ijin.
                </p>
                <Button
                  type="primary"
                  href={process.env.REACT_APP_API_BASE_URLS}
                >
                  Klik Disini
                </Button>
                <br />
                <Image width={200} src={binaryImage} />
              </div>
            ),
            onOk: setLoading(false),
          });
          console.log(err);
        } else {
          message.error(
            <div>
              {err.response !== undefined ? (
                err.response.data
              ) : (
                <>
                  Time out! Terjadi kesalahan koneksi, silahkan coba kembali
                  beberapa saat lagi!
                </>
              )}
            </div>
          );
          console.log(err.response);
        }
      })
      .finally(() => setLoading(false));
  };

  const signOut = (e) => {
    setUser([]);
    setToken();
    setEnkripnama();
    sessionStorage.setItem("userData", "");
    sessionStorage.clear();
    sessionStorage.removeItem("user");
    props.history.push("/login");
    setLogin(false);
    window.location.reload();
  };

  const getRuangByIP = (ip) => {
    apiInstance
      .get(`${apiku}/SisJwt/GetRuangByIP/${ip}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKomputer(decryptKeysAndValues(res.data.result));
          console.log(decryptKeysAndValues(res.data.result));
        } else {
          setKomputer(null);
          setModalKomputer(true);
        }
      })
      .catch((err) => {
        setKomputer(null);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const getRuangan = (nama) => {
    apiInstance
      .get(`${apiku}/SisJwt/GetRuangan/${nama}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListRuangan(res.data.result);
        } else {
          setListRuangan([]);
        }
      })
      .catch((err) => {
        setListRuangan([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const cekPasswordsaja = (nama) => {
    apiInstance
      .get(`${apiku}/SisJwt/CekPassword/${nama}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPassWordsaja(res.data.result.password);
        } else {
          setPassWordsaja("");
          message.warning("User tidak Ada!");
        }
      })
      .catch((err) => {
        setPassWordsaja("");
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const cekPassword = () => {
    apiInstance
      .get(`${apiku}/SisJwt/CekPassword/${namauser}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataUser(res.data.result);
          setUserName(res.data.result.username);
          setPassWord(res.data.result.password);
          setPassWordBaru(encodeURIComponent(enkrip(res.data.result.password)));
          setPegawaiID(res.data.result.pegawaiId);
          setNamaLengkap(res.data.result.namaLengkap);
          setEmail(res.data.result.email);
          setTandaTangan(res.data.result.tandaTangan);
          // console.log(res.data.result);
        } else {
          console.log(res.data.result);
          setDataUser([]);
          setUserName(null);
          setPassWord("");
          setPegawaiID(null);
          setNamaLengkap(null);
          setEmail(null);
          setTandaTangan(null);
          message.error("User Tidak Ada!");
        }
      })
      .catch((err) => {
        setDataUser([]);
        setUserName(null);
        setPassWord("");
        setPegawaiID(null);
        setNamaLengkap(null);
        setEmail(null);
        setTandaTangan(null);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const cekPasswordUser = (user) => {
    setLoadingUser(true);
    apiInstance
      .get(`${apiku}/SisJwt/CekPassword/${user}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataUser(res.data.result);
          setUserName(res.data.result.username);
          setPassWord(res.data.result.password);
          setPassWordBaru(encodeURIComponent(enkrip(res.data.result.password)));
          setPegawaiID(res.data.result.pegawaiId);
          setNamaLengkap(res.data.result.namaLengkap);
          setEmail(res.data.result.email);
          setTandaTangan(res.data.result.tandaTangan);
          // console.log(res.data.result);
        } else {
          message.warning(res.data.message);
        }
        setLoadingUser(false);
      })
      .catch((err) => {
        setDataUser([]);
        setUserName("");
        setPassWord("");
        setPegawaiID(null);
        setNamaLengkap(null);
        setEmail(null);
        setTandaTangan(null);
        console.log(err);
        message.error("Gagal Ambil!");
        setLoadingUser(false);
      });
  };

  const cekToken = (e) => {
    setLoadingUser(true);
    apiInstance
      .get(`${apiku}/SisJwt/Token/${e}`)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDataUser(res.data.result);
          // setUserName(res.data.result.username);
          // setPassWord(res.data.result.password);
          // setPassWordBaru(encodeURIComponent(enkrip(res.data.result.password)));
          // setPegawaiID(res.data.result.pegawaiId);
          // setNamaLengkap(res.data.result.namaLengkap);
          // setEmail(res.data.result.email);
          // setTandaTangan(res.data.result.tandaTangan);
          console.log(res.data.result);
        } else {
          message.warning(res.data.message);
        }
        setLoadingUser(false);
      })
      .catch((err) => {
        setDataUser([]);
        setUserName("");
        setPassWord("");
        setPegawaiID(null);
        setNamaLengkap(null);
        setEmail(null);
        setTandaTangan(null);
        console.log(err);
        message.error("Gagal Ambil!");
        setLoadingUser(false);
      });
  };

  function info() {
    Modal.info({
      content: "Silahkan Login Ulang Kembali",
      onOk() {
        signOut();
      },
    });
  }
  function success() {
    Modal.success({
      content: "Password berhasil dirubah!",
      onOk: info(),
    });
  }
  const editPassword = (dataUser, passbaru) => {
    const enkrippasswordbaru = encodeURIComponent(enkrip(passbaru));
    apiInstance
      .put(`${apiku}/SisJwt/ChangePassword/${enkrippasswordbaru}`, dataUser)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          success();
        } else {
          console.log(res.data);
          Modal.warning({ content: res.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Update!");
      });
  };

  const editProfile = (dataUser, passbaru) => {
    const enkrippasswordbaru = encodeURIComponent(enkrip(passbaru));
    apiInstance
      .put(`${apiku}/SisJwt/ChangePassword/${enkrippasswordbaru}`, dataUser)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil dirubah!");
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Update!");
      });
  };

  const editProfileTtd = (dataUser, passbaru) => {
    const enkrippasswordbaru = encodeURIComponent(enkrip(passbaru));
    apiInstance
      .put(`${apiku}/SisJwt/ChangeTandaTangan/${enkrippasswordbaru}`, dataUser)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil dirubah!");
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Update!");
      });
  };

  const ambilTotalPasien = (data) => {
    apiInstance
      .post(
        `http://182.168.7.119/SignalR/api/Chat/TotalPasienAbiasa/Pesan`,
        data
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    apiInstance
      .post(`http://182.168.7.119/SignalR/api/Chat/TotalPasienRSMS/Pesan`, data)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const userBagAkses = (user) => {
    setLoadingUser(true);
    apiInstance
      .get(`${apiku}/SisJwt/UserBagAkses/${user}`)
      .then((res) => {
        apiInstance
          .get(`${apiku}/SisJwt/SyncPassword/${user}`)
          .then((res) => {
            Modal.success({ content: "Berhasil Sinkron!" });
            setLoadingUser(false);
          })
          .catch((err) => {
            Modal.error({ content: "Gagal Sinkron!" });
            console.log(err);
            setLoadingUser(false);
          });
      })
      .catch((err) => {
        Modal.error({ content: "Gagal Sinkron!" });
        console.log(err);
        setLoadingUser(false);
      });
  };

  const ratingDokterPure = (dr) => {
    apiInstance
      .post(`${apiku}/BridgeROnline/GetRatingDokterPure`, dr)
      .then((response) => {
        setRatingPure(response.data.result.rating[0].avg_rate);
      })
      .catch((error) => {
        setRatingPure(0);
        console.log(error);
      });
  };

  const ratingDokter = (dr) => {
    setLoadingRating(true);
    apiInstance
      .post(`${apiku}/BridgeROnline/GetRatingDokter`, dr)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setKomentar(res.data.result.data);
          setLoadingRating(false);
        } else {
          setKomentar([]);
          setLoadingRating(false);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setKomentar([]);
        setLoadingRating(false);
        console.log(err);
      });
  };

  return (
    <LoginContext.Provider
      value={{
        userenkrip,
        token,
        user,
        login,
        apiku,
        pegawai,
        setAPI,
        enkrip,
        signIn,
        signOut,
        loading,
        setLoading,
        namauser,
        enkripnama,
        authId,
        ttd,
        cekPassword,
        datauser,
        ambilTotalPasien,
        editPassword,
        username,
        setPassword,
        password,
        setNamaLengkap,
        namaLengkap,
        setEmail,
        email,
        setTandaTangan,
        tandaTangan,
        setPegawaiID,
        pegawaiId,
        editProfile,
        userName,
        passWord,
        passWordsaja,
        setPassWord,
        passWordBaru,
        cekPasswordsaja,
        loadingPoli,
        setLoadingPoli,
        ipPC,
        setipPc,
        hostPc,
        sethostPc,
        sendTele,
        sendTeleSync,
        userBagAkses,
        cekPasswordUser,
        editProfileTtd,
        loadingUser,
        setLoadingUser,
        ratingDokterPure,
        rating,
        setRating,
        ratingpure,
        setRatingPure,
        tanggalawal,
        setTanggalawal,
        tanggalakhir,
        setTanggalakhir,
        komentar,
        ratingDokter,
        setRatingpilih,
        ratingpilih,
        loadingrating,
        environment,
        setEnvironment,
        apiPenunjang,
        setapiPenunjang,
        apiReport,
        setapiReport,
        usersync,
        setUserSync,
        host,
        flagOrderDarah,
        setflagOrderDarah,
        cekToken,
        komputer,
        getRuangByIP,
        modalKomputer,
        setModalKomputer,
        getRuangan,
        listRuangan,
      }}
    >
      {props.children}
    </LoginContext.Provider>
  );
};

export default LoginContextProvider;
