import React, { createContext, useContext, useState } from "react";
import { LoginContext } from "../../../rawatjalan/context";
import axios from "axios";
import { Button, Input, Modal } from "antd";
import dayjs from "dayjs";
import { SearchOutlined } from "@ant-design/icons";

const { TextArea } = Input;

export const SatuSehatModulContext = createContext();

const SatuSehatModulContextProvider = (props) => {
  const { token, namauser } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const ipEndpoint = sessionStorage.getItem("apiPenunjang");
  const baseURL = `${ipEndpoint}/`;
  const env = sessionStorage.getItem("environment");

  const [sstoken, setsstoken] = useState(null);
  const [SSTokenExp, setSSTokenExp] = useState();
  const [baseUrlSS, setbaseUrlSS] = useState();
  const [ruangId, setruangId] = useState(null);
  const [ihsRS, setihsRS] = useState();
  const [ihsPasien, setihsPasien] = useState(null);
  const [identitasPx, setidentitasPx] = useState({});
  const [paramEncounter, setparamEncounter] = useState();
  const [paramEpsofCare, setparamEpsofCare] = useState();
  const [regEpsofCare, setregEpsofCare] = useState(null);
  const [tempA, settempA] = useState();
  const [username, setusername] = useState(namauser);
  const [JSONPost, setJSONPost] = useState();
  const [flagMdSnomed, setflagMdSnomed] = useState(null);
  const [keluhanUtama, setkeluhanUtama] = useState(null);
  const [edukasi, setedukasi] = useState(null);
  const [tempListSnomed, settempListSnomed] = useState(null);
  const [textResponseById, settextResponseById] = useState(null);
  const [listRiwayatDx, setlistRiwayatDx] = useState([]);
  const [riwPenyakit, setriwPenyakit] = useState(null);
  // form detail ihs pasien
  const [ihstgllahir, setihstgllahir] = useState(null);
  const [ihsalamat, setihsalamat] = useState(null);
  const [ihsjenkel, setihsjenkel] = useState(null);
  const [ihsihsnumber, setihsihsnumber] = useState(null);
  const [ihsnik, setihsnik] = useState(null);
  const [ihslastupdate, setihslastupdate] = useState(null);
  const [ihsnama, setihsnama] = useState(null);

  const [mdIhsPasien, setmdIhsPasien] = useState(false);
  const [mdDetailKirim, setmdDetailKirim] = useState(false);
  const [mdIhsPasienv2, setmdIhsPasienv2] = useState(false);
  const [mdEditJSON, setmdEditJSON] = useState();
  const [mdLookupSnomed, setmdLookupSnomed] = useState(false);
  const [mdRscDetail, setmdRscDetail] = useState(false);

  const [spTbPasien, setspTbPasien] = useState(false);
  const [spIdentPx, setspIdentPx] = useState(false);
  const [spDetailKirim, setspDetailKirim] = useState(false);
  const [spCvg, setspCvg] = useState(false);
  const [spGetRsc, setspGetRsc] = useState(false);

  // status step
  const [detailEnc, setdetailEnc] = useState([]);
  const [sts01, setsts01] = useState(false);
  const [sts02, setsts02] = useState(false);
  const [sts03, setsts03] = useState(false);
  const [sts04, setsts04] = useState(false); // keluhan utama
  const [sts05, setsts05] = useState(false); // riwayat penyakit
  const [sts06, setsts06] = useState(false); // faktor resiko
  const [sts07, setsts07] = useState(false); // sistole
  const [sts08, setsts08] = useState(false); // diastole
  const [sts09, setsts09] = useState(false); // berat badan
  const [sts10, setsts10] = useState(false); // tinggi badan
  const [sts11, setsts11] = useState(false); // status psikologis
  const [sts12, setsts12] = useState(false); // serv request
  const [sts13, setsts13] = useState(false); // diagnosa
  const [sts14, setsts14] = useState(false); // prosedur medis
  const [sts15, setsts15] = useState(false); // medication
  const [sts16, setsts16] = useState(false); // edukasi
  const [sts17, setsts17] = useState(false); // renc tindak lanjut
  const [sts18, setsts18] = useState(false); // kond meninggalkan rs
  const [sts19, setsts19] = useState(false); // Dokumen Reg Uronefrologi

  const colTbResource = [
    {
      title: 'No',
      dataIndex: 'index',
      key: 'index',
      align: 'center',
      ellipsis: true,
      width: 50,
      render: (text, record, index) => index + 1,
    },
    {
      title: 'RegistrasiId',
      dataIndex: 'RegistrasiId',
      align: 'center',
      key: 'RegistrasiId',
      width: 150,
    },
    {
      title: 'ResourceId',
      dataIndex: 'ResourceID',
      key: 'ResourceID',
    },
    {
      title: 'ResourceType',
      dataIndex: 'ResourceType',
      key: 'ResourceType',
    },
    {
      title: 'DateEntry',
      dataIndex: 'DateEntry',
      key: 'DateEntry',
      align: 'center',
      width: 200,
    },
    {
      title: 'Aksi',
      dataIndex: 'aksi',
      key: 'aksi',
      align: 'center',
      width: 70,
      render: (text, record, index) =>
        <div>
          <Button
            type='primary'
            onClick={() => {
              setmdRscDetail(true);
              getResourceByIdOld(record.ResourceID, record.ResourceType)
            }}
            icon={<SearchOutlined />}
            size='small'
            style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
          />
        </div>
    },
  ];

  const rstNull = () => {
    setparamEncounter(null);
    setparamEpsofCare(null);
    setregEpsofCare(null);
    setkeluhanUtama(null);
    setriwPenyakit(null);
    setedukasi(null);
    setdetailEnc([]);
    setsts04(false);
    setsts05(false);
    setsts06(false);
    setsts07(false);
    setsts08(false);
    setsts09(false);
    setsts10(false);
    setsts11(false);
    setsts12(false);
    setsts13(false);
    setsts14(false);
    setsts15(false);
    setsts16(false);
    setsts17(false);
    setsts18(false);
    setsts19(false);
  };

  const getDetailEnv = (data) => {
    setspTbPasien(true);
    axios
      .get(`${baseURL}SatuSehat/GetEnvbyEnv/${data}`, options)
      .then((response) => {
        setspTbPasien(false);
        console.log("getDetailEnv : ", response);
        if (response.data && response.data.statusCode) {
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET detail Environment! -> ${response.data.message}`,
          });
        } else {
          Modal.info({
            title: "Informasi!",
            content: `Berhasil! -> ${response.data.message}`,
            onOk: () => {
              setsstoken(response.data.result.token);
              setbaseUrlSS(response.data.result.base_url);
              setihsRS(response.data.result.org_id);
              setSSTokenExp(response.data.result.expired);
              settempA(1);
              console.log("detail Env : ", response.data);
            },
          });
        }
      })
      .catch((err) => {
        setspTbPasien(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data Detail Environment! -> ${err}`,
        });
      });
  };

  const getIdentPx = (noreg) => {
    setspIdentPx(true);
    axios
      .get(`${baseURL}SatuSehat/GetIdentPasien/${noreg}`, options)
      .then((response) => {
        setspIdentPx(false);
        console.log("getIdentPx : ", response);
        if (response.data.result.code === "200") {
          setidentitasPx(response.data.result.result);
          setihsPasien(response.data.result.result.IHSNumber);
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
          });
        }
      })
      .catch((err) => {
        setspIdentPx(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data! -> ${err}`,
        });
      });
  };

  const getIhsPasien = (nik) => {
    setspIdentPx(true);
    // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

    settempA(0);

    // Waktu 1 dalam format ISO
    const waktu1 = dayjs(SSTokenExp);

    // Waktu 2 adalah waktu sekarang
    const waktu2 = dayjs();

    // Menghitung selisih waktu dalam menit
    const selisihMenit = waktu2.diff(waktu1, "minute");

    // Menentukan jika selisih lebih dari 45 menit
    if (selisihMenit >= 45) {
      // Lakukan sesuatu jika lebih dari 45 menit
      console.log("Lebih dari 45 menit");

      getDetailEnv(env);
    } else {
      // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
      console.log("Kurang dari atau sama dengan 45 menit");
      settempA(1);
    }

    if (tempA === 1) {
      if (env === "prod") {
        setmdIhsPasien(true);
      } else {
        setmdIhsPasienv2(true);
      }

      axios
        .get(
          `${baseURL}SatuSehat/GetPasienByNIK/${nik}/${sstoken}/${encodeURIComponent(
            baseUrlSS
          )}`,
          options
        )
        .then((response) => {
          setspIdentPx(false);
          console.log("getIhsPasien : ", response);
          if (response.data.hasOwnProperty("statusCode")) {
            Modal.error({
              title: "Gagal!",
              content: response.data.result,
            });
          } else {
            if (response.data.length === 1) {
              setihstgllahir(
                response.data[0].resource.hasOwnProperty("birthDate")
                  ? response.data[0].resource.birthDate
                  : "-"
              );
              setihsalamat(
                response.data[0].resource.hasOwnProperty("address")
                  ? response.data[0].resource.address.line[0]
                  : "-"
              );
              setihsjenkel(
                response.data[0].resource.hasOwnProperty("gender")
                  ? response.data[0].resource.gender
                  : "-"
              );
              setihsihsnumber(
                response.data[0].resource.hasOwnProperty("id")
                  ? response.data[0].resource.id
                  : "-"
              );
              setihsnik(
                response.data[0].resource.hasOwnProperty("identifier")
                  ? response.data[0].resource.identifier[1].value
                  : "-"
              );
              setihslastupdate(
                response.data[0].resource.hasOwnProperty("meta")
                  ? response.data[0].resource.meta.lastUpdated
                  : "-"
              );
              setihsnama(
                response.data[0].resource.hasOwnProperty("name")
                  ? response.data[0].resource.name[0].text
                  : "-"
              );
            } else if (response.data.length > 1) {
              Modal.info({
                title: "Informasi",
                content:
                  "Ditemukan detail Pasien dari SatuSehat LEBIH DARI 1. Cek Console log untuk melihat detail response.",
              });
              console.log("isi detail respon : ", response.data);
            } else {
              Modal.info({
                title: "Informasi",
                content: "Tidak ditemukan detail Pasien dari SatuSehat.",
              });
            }
          }
        })
        .catch((err) => {
          setspIdentPx(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR! GET IHS Number Pasien! -> ${err}`,
          });
        });
    }
  };

  const insertIhsPasien = (data) => {
    setspDetailKirim(true);
    axios
      .post(
        `${baseURL}SatuSehat/insertihspasien
            `,
        data,
        {
          headers: options.headers,
        }
      )
      .then((res) => {
        setspDetailKirim(false);
        console.log("satuSehat : ", res);
        console.log("satuSehat data : ", res.data.statusCode);
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Sukses",
            content: "Berhasil Disimpan data Ihs Number Pasien.",
            onOk: () => {
              setmdIhsPasien(false);
              setihsPasien(res.data.result);
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal Disimpan Ihs Number Pasien! -> ${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspDetailKirim(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR Disimpan Ihs Number Pasien! -> ${err}`,
        });
      });
  };

  const getParamEncounter = (sReg, sRuang) => {
    setspCvg(true);
    axios
      .get(
        `${baseURL}SatuSehat/GetParameterEncounter/${sReg}/${sRuang}/${env}`,
        options
      )
      .then((response) => {
        setspCvg(false);
        console.log("getParamEncounter : ", response);
        if (response.data.result.code === "200") {
          let temp = response.data.result.result;
          // const selectedDPJP = practicionerDummy.find((item) => item.Nik === dataSepDummy.NIK_Dummy_Prac);
          // temp.NamaDPJP = selectedDPJP.Nama;
          // temp.IhsPracticioner = selectedDPJP.IHSNumber;

          setparamEncounter(temp);
        } else {
          // setparamEncounter();
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
          });
        }
      })
      .catch((err) => {
        setspCvg(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data! -> ${err}`,
        });
      });
  };

  const insertResourceId = (data) => {
    setspDetailKirim(true);
    axios
      .post(`${baseURL}SatuSehat/insertresourceid`, data, {
        headers: options.headers,
      })
      .then((res) => {
        setspDetailKirim(false);
        console.log("satuSehat : ", res);
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Sukses",
            content: "Berhasil Disimpan Resource Id SatuSehat.",
            onOk: () => {
              setmdDetailKirim(false);
              // getListPasien(ruangId, dayjs(tglPelayanan).format('YYYY-MM-DD'));
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal Disimpan Resource Id SatuSehat! -> ${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspDetailKirim(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR Disimpan Resource Id SatuSehat! -> ${err}`,
        });
      });
  };

  const getResourceByIdOld = (id, rscType) => {
    setspGetRsc(true);
    // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

    // settempA(0);
    let temp = 0;

    // Waktu 1 dalam format ISO
    const waktu1 = dayjs(SSTokenExp);

    // Waktu 2 adalah waktu sekarang
    const waktu2 = dayjs();

    // Menghitung selisih waktu dalam menit
    const selisihMenit = waktu2.diff(waktu1, "minute");

    // Menentukan jika selisih lebih dari 45 menit
    if (selisihMenit >= 45) {
      // Lakukan sesuatu jika lebih dari 45 menit
      console.log("Lebih dari 45 menit");

      getDetailEnv(env);
    } else {
      // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
      console.log("Kurang dari atau sama dengan 45 menit");
      // settempA(1)
      temp = 1;
    }

    if (temp === 1) {
      let baseUrlSSa = baseUrlSS + `/${rscType}/`;
      console.log('baseUrlSSa : ', baseUrlSSa);
      axios
        .get(`${baseURL}SatuSehat/GetResourceById/${encodeURIComponent(baseUrlSSa)}/${id}/${sstoken}`, options)
        .then((response) => {
          setspGetRsc(false);
          console.log('getResourceById : ', response);
          if (response.data.statusCode === 200) {
            let objectString = JSON.stringify(response.data.result, null, 2); // Mengubah objek menjadi string JSON dengan indentasi 2 spasi
            settextResponseById(objectString);
          }
          else {
            settextResponseById();
            Modal.info({
              title: "Informasi",
              content: 'Tidak ditemukan detail Pasien dari SatuSehat.',
            });
          }
        })
        .catch((err) => {
          setspGetRsc(false);
          settextResponseById();
          Modal.error({
            title: "ERROR!",
            content: `ERROR! GET Detail Resource SatuSehat! -> ${err}`,
          });
        });
    }
  }

  const getResourceById = async (id, rscType) => {
    setspCvg(true);
    // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

    // settempA(0);
    let temp = 0;

    // Waktu 1 dalam format ISO
    const waktu1 = dayjs(SSTokenExp);

    // Waktu 2 adalah waktu sekarang
    const waktu2 = dayjs();

    // Menghitung selisih waktu dalam menit
    const selisihMenit = waktu2.diff(waktu1, "minute");

    // Menentukan jika selisih lebih dari 45 menit
    if (selisihMenit >= 45) {
      // Lakukan sesuatu jika lebih dari 45 menit
      console.log("Lebih dari 45 menit");

      getDetailEnv(env);
    } else {
      // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
      console.log("Kurang dari atau sama dengan 45 menit");
      // settempA(1)
      temp = 1;
    }

    if (temp === 1) {
      setspCvg(true);
      try {
        let baseUrlSSa = baseUrlSS + `/${rscType}/`;
        const response = await axios.get(
          `${baseURL}SatuSehat/GetResourceById/${encodeURIComponent(
            baseUrlSSa
          )}/${id}/${sstoken}`,
          options
        );
        setspCvg(false);

        if (response.data.statusCode === 200) {
          let data = response.data.result;
          return data; // Kembalikan nilai data
        } else {
          return []; // Kembalikan array kosong jika response tidak sukses
        }
      } catch (err) {
        setspCvg(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data! -> ${err}`,
        });
        return null; // Kembalikan null jika terjadi error
      }
    }
  };

  // ini seharusnya diganti bukan riwayat tapi resource Id saja
  const getRiwRscId = async (sReg, sRsc) => {
    setspCvg(true);
    try {
      const response = await axios.get(
        `${baseURL}SatuSehat/GetResourceId/${sReg}/${sRsc}/${env}`,
        options
      );
      setspCvg(false);

      if (response.data.result.code === "200") {
        let data = response.data.result.result;
        return data; // Kembalikan nilai data
      } else {
        return []; // Kembalikan array kosong jika response tidak sukses
      }
    } catch (err) {
      setspCvg(false);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! GET data! -> ${err}`,
      });
      return null; // Kembalikan null jika terjadi error
    }
  };

  //  ini seharusnya yang riwayat resource Id yang sebenarnya
  const getRiwRscIdAsli = async (sReg, sRsc) => {
    setspCvg(true);
    try {
      const response = await axios.get(
        `${baseURL}SatuSehat/GetRiwayatResourceId/${sReg}/${sRsc}/${env}`,
        options
      );
      setspCvg(false);

      if (response.data.result.code === "200") {
        let data = response.data.result.result;
        return data; // Kembalikan nilai data
      } else {
        return []; // Kembalikan array kosong jika response tidak sukses
      }
    } catch (err) {
      setspCvg(false);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! GET data! -> ${err}`,
      });
      return null; // Kembalikan null jika terjadi error
    }
  };

  const getRiwayatDx = (sReg) => {
    setspCvg(true);
    axios
      .get(`${baseURL}SatuSehat/GetRiwayatDx/${sReg}`, options)
      .then((response) => {
        setspCvg(false);
        if (response.data.result.code === "200") {
          let data = response.data.result.result;

          setlistRiwayatDx(data);
        }
        else {
          setlistRiwayatDx([]);
        }
      })
      .catch((err) => {
        setspCvg(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data! -> ${err}`,
        });
      });
  };

  const getDiagnosa = async (sReg) => {
    setspCvg(true);
    try {
      const response = await axios.get(
        `${baseURL}EmrDiagnosis/Read/${sReg}/1/10`,
        options
      );
      setspCvg(false);

      if (response.data.statusCode === 200) {
        let data = response.data.result;
        return data; // Kembalikan nilai data
      } else {
        return []; // Kembalikan array kosong jika response tidak sukses
      }
    } catch (err) {
      setspCvg(false);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! GET data! -> ${err}`,
      });
      return null; // Kembalikan null jika terjadi error
    }
  };

  const getProsedur = async (sReg) => {
    setspCvg(true);
    try {
      const response = await axios.get(
        `${baseURL}EmrProsedur/Read/${sReg}/1/100`,
        options
      );
      setspCvg(false);

      if (response.data.statusCode === 200) {
        let data = response.data.result;
        return data; // Kembalikan nilai data
      } else {
        return []; // Kembalikan array kosong jika response tidak sukses
      }
    } catch (err) {
      setspCvg(false);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! GET data! -> ${err}`,
      });
      return null; // Kembalikan null jika terjadi error
    }
  };

  const getMedicationBundle = async (sReg) => {
    setspCvg(true);
    try {
      const response = await axios.get(
        `${baseURL}SatuSehat/GetMedicationBundle/${sReg}/${env}`,
        options
      );
      setspCvg(false);

      if (response.data.statusCode === 200) {
        let data = response.data.result;
        return data; // Kembalikan nilai data
      } else {
        return []; // Kembalikan array kosong jika response tidak sukses
      }
    } catch (err) {
      setspCvg(false);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! GET data! -> ${err}`,
      });
      return null; // Kembalikan null jika terjadi error
    }
  };

  const getPoliLocation = async (grpLayanan) => {
    setspCvg(true);
    try {
      const response = await axios.get(
        `${baseURL}SatuSehat/lookupssidruangan/${grpLayanan}/1/${env}`,
        options
      );
      setspCvg(false);

      if (response.data.statusCode === 200) {
        let data = response.data.result;
        return data; // Kembalikan nilai data
      } else {
        return []; // Kembalikan array kosong jika response tidak sukses
      }
    } catch (err) {
      setspCvg(false);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! GET data! -> ${err}`,
      });
      return null; // Kembalikan null jika terjadi error
    }
  };

  const getOrderPenunjang = async (sRegId) => {
    setspCvg(true);
    try {
      const response = await axios.get(
        `${baseURL}BillOrderPenunjang/LookupValid/${sRegId}/1`,
        options
      );
      setspCvg(false);

      if (response.data.statusCode === 200) {
        let data = response.data.result;
        console.log('getOrderPenunjang : ', response);

        return data; // Kembalikan nilai data
      } else {
        return []; // Kembalikan array kosong jika response tidak sukses
      }
    } catch (err) {
      setspCvg(false);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! GET data! -> ${err}`,
      });
      return null; // Kembalikan null jika terjadi error
    }
  };

  const getHasilLabPK = async (sReg, sLabCode) => {
    setspCvg(true);
    try {
      const response = await axios.get(
        `${baseURL}SatuSehat/GetHasilLabPKbyCode/${sReg}/${sLabCode}`,
        options
      );
      setspCvg(false);

      if (response.data.statusCode === 200) {
        let data = response.data.result;
        console.log('getHasilLabPK : ', response);

        return data; // Kembalikan nilai data
      } else {
        return []; // Kembalikan array kosong jika response tidak sukses
      }
    } catch (err) {
      setspCvg(false);
      Modal.error({
        title: "ERROR!",
        content: `ERROR! GET data! -> ${err}`,
      });
      return null; // Kembalikan null jika terjadi error
    }
  };

  const LookupSnomed = (sUrl) => {
    setspCvg(true);

    axios
      .get(
        `${baseURL}SatuSehat/GetbyUrl/${encodeURIComponent(sUrl)}`,
        options
      )
      .then((response) => {
        setspCvg(false);
        console.log("LookupSnomed : ", response);
        if (response.data.statusCode === 200) {
          let temp = response.data.result.items;

          settempListSnomed(temp);
        } else {
          settempListSnomed([]);
          Modal.error({
            title: "Gagal!",
            content: `Gagal! GET data! -> ${response.data.message}`,
          });
        }
      })
      .catch((err) => {
        setspCvg(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! GET data! -> ${err}`,
        });
      });
  };

  const postResource = (data, resource, rscGroup) => {
    setspCvg(true);
    // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

    settempA(0);

    // Waktu 1 dalam format ISO
    const waktu1 = dayjs(SSTokenExp);

    // Waktu 2 adalah waktu sekarang
    const waktu2 = dayjs();

    // Menghitung selisih waktu dalam menit
    const selisihMenit = waktu2.diff(waktu1, "minute");

    // Menentukan jika selisih lebih dari 45 menit
    if (selisihMenit >= 45) {
      // Lakukan sesuatu jika lebih dari 45 menit
      console.log("Lebih dari 45 menit");

      getDetailEnv(env);
    } else {
      // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
      console.log("Kurang dari atau sama dengan 45 menit");
      settempA(1);
    }

    if (tempA === 1) {
      axios
        .post(
          `${baseURL}SatuSehat/PostResource/${sstoken}/${encodeURIComponent(baseUrlSS)}/${resource}`, data,
          {
            headers: options.headers,
          }
        )
        .then((res) => {
          setspCvg(false);
          console.log("postResource response : ", res);

          let respon = res.data.result.result;
          console.log("respon : ", respon);

          if (respon.hasOwnProperty("id")) {
            Modal.success({
              title: "Sukses",
              content: `Berhasil mengirim ${resource} ke SatuSehat.`,
              onOk: () => {
                let temp = [];

                let setentry = {
                  registrasiId: identitasPx.RegistrasiId,
                  userId: sessionStorage.getItem("userId"),
                  clientHost: sessionStorage.getItem("Host"),
                  clientIP: sessionStorage.getItem("IP"),
                  environment: env,
                  ruangId: ruangId,
                  id: respon.id,
                  resourceType: respon.resourceType,
                  resourceGroup: rscGroup,
                };

                temp.push(setentry);
                insertResourceId(temp);
                // console.log('simpan resourceID : ', updatedEntryData);
              },
            });
          } else {
            let msg = res.data.result.result;
            let additionalMessage = JSON.stringify(msg, null, 2);

            Modal.error({
              title: "Gagal!",
              content: (
                <div>
                  <p>Gagal! mengirim data ke SatuSehat!</p>
                  <TextArea rows={15} value={additionalMessage} readOnly />
                </div>
              )
              // onOk: () => {
              //   if (msg.resourceType === "OperationOutcome") {
              //     setmdEditJSON(true);
              //     setJSONPost(JSON.stringify(data, null, 2));
              //   }
              // },
            });
          }
        })
        .catch((err) => {
          setspCvg(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR! Kirim Post ${resource} SatuSehat! -> ${err}`,
          });
        });
    }
  };

  const postResourcev2 = async (data, resource, rscGroup) => {
    setspCvg(true);

    settempA(0);

    // Waktu 1 dalam format ISO
    const waktu1 = dayjs(SSTokenExp);

    // Waktu 2 adalah waktu sekarang
    const waktu2 = dayjs();

    // Menghitung selisih waktu dalam menit
    const selisihMenit = waktu2.diff(waktu1, "minute");

    // Menentukan jika selisih lebih dari 45 menit
    if (selisihMenit >= 45) {
      console.log("Lebih dari 45 menit");
      getDetailEnv(env);
    } else {
      console.log("Kurang dari atau sama dengan 45 menit");
      settempA(1);
    }

    if (tempA === 1) {
      try {
        const res = await axios.post(
          `${baseURL}SatuSehat/PostResource/${sstoken}/${encodeURIComponent(baseUrlSS)}/${resource}`,
          data,
          {
            headers: options.headers,
          }
        );
        setspCvg(false);
        console.log("postResource response : ", res);

        let respon = res.data.result.result;
        console.log("respon : ", respon);

        if (respon.hasOwnProperty("id")) {
          let temp = [];

          let setentry = {
            registrasiId: identitasPx.RegistrasiId,
            userId: sessionStorage.getItem("userId"),
            clientHost: sessionStorage.getItem("Host"),
            clientIP: sessionStorage.getItem("IP"),
            environment: env,
            ruangId: ruangId,
            id: respon.id,
            resourceType: respon.resourceType,
            resourceGroup: rscGroup,
          };

          temp.push(setentry);
          insertResourceId(temp);

          return "Sukses";
        } else {
          let msg = res.data.result.result;
          let additionalMessage = JSON.stringify(msg, null, 2);

          Modal.error({
            title: "Gagal!",
            content: (
              <div>
                <p>Gagal! mengirim data ke SatuSehat!</p>
                <TextArea rows={15} value={additionalMessage} readOnly />
              </div>
            ),
          });

          return `Gagal: ${additionalMessage}`;
        }
      } catch (err) {
        setspCvg(false);
        Modal.error({
          title: "ERROR!",
          content: `ERROR! Kirim Post ${resource} SatuSehat! -> ${err}`,
        });
        return `ERROR: ${err.message}`;
      }
    }
    return "Gagal: Token expired or invalid.";
  };

  const putResource = (data, resource, param) => {
    setspCvg(true);
    // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

    settempA(0);

    // Waktu 1 dalam format ISO
    const waktu1 = dayjs(SSTokenExp);

    // Waktu 2 adalah waktu sekarang
    const waktu2 = dayjs();

    // Menghitung selisih waktu dalam menit
    const selisihMenit = waktu2.diff(waktu1, "minute");

    // Menentukan jika selisih lebih dari 45 menit
    if (selisihMenit >= 45) {
      // Lakukan sesuatu jika lebih dari 45 menit
      console.log("Lebih dari 45 menit");

      getDetailEnv(env);
    } else {
      // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
      console.log("Kurang dari atau sama dengan 45 menit");
      settempA(1);
    }

    if (tempA === 1) {
      axios
        .put(
          `${baseURL}SatuSehat/PutResource/${sstoken}/${encodeURIComponent(
            baseUrlSS
          )}/${resource}/${param}`,
          data,
          {
            headers: options.headers,
          }
        )
        .then((res) => {
          setspCvg(false);
          console.log("putResource response : ", res);

          let respon = res.data.result.result;
          console.log("respon : ", respon);

          if (respon.hasOwnProperty("id")) {
            Modal.success({
              title: "Sukses",
              content: `Berhasil mengirim ${resource} ke SatuSehat.`,
              // onOk: () => {
              //     let temp = [];

              //     let setentry = {
              //         registrasiId: identitasPx.RegistrasiId,
              //         userId: username,
              //         clientHost: host,
              //         clientIP: ip,
              //         environment: env,
              //         ruangId: ruangId,
              //         id: respon.id,
              //         resourceType: respon.resourceType
              //     };

              //     temp.push(setentry);
              //     insertResourceId(temp)
              //     // console.log('simpan resourceID : ', updatedEntryData);
              // },
            });
          } else {
            let msg = res.data.result.result;
            let additionalMessage = JSON.stringify(msg, null, 2);

            Modal.error({
              title: "Gagal!",
              content: (
                <div>
                  <p>Gagal! mengirim data ke SatuSehat!</p>
                  <TextArea rows={15} value={additionalMessage} readOnly />
                </div>
              ),
              // onOk: () => {
              //     if (msg.resourceType === "OperationOutcome") {
              //         setmdEditJSON(true);
              //         setJSONPost(JSON.stringify(data, null, 2));
              //     }
              // },
            });
          }
        })
        .catch((err) => {
          setspCvg(false);
          Modal.error({
            title: "ERROR!",
            content: `ERROR! Kirim Put ${resource} SatuSehat! -> ${err}`,
          });
        });
    }
  };

  const kirimBundleV2 = (data, resource, rscGroup) => {
    setspCvg(true)
    // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

    settempA(0)

    // Waktu 1 dalam format ISO
    const waktu1 = dayjs(SSTokenExp);

    // Waktu 2 adalah waktu sekarang
    const waktu2 = dayjs();

    // Menghitung selisih waktu dalam menit
    const selisihMenit = waktu2.diff(waktu1, "minute");

    // Menentukan jika selisih lebih dari 45 menit
    if (selisihMenit >= 45) {
      // Lakukan sesuatu jika lebih dari 45 menit
      console.log("Lebih dari 45 menit");

      getDetailEnv(env);
    } else {
      // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
      console.log("Kurang dari atau sama dengan 45 menit");
      settempA(1)
    }

    if (tempA === 1) {
      axios
        .post(`${baseURL}SatuSehat/Bundle/${sstoken}/${encodeURIComponent(baseUrlSS)}`, data, {
          headers: options.headers,
        })
        .then((res) => {
          setspCvg(false)
          console.log('kirimBundle response : ', res);

          if (res.data.result.result.hasOwnProperty('entry')) {
            // setlistResourceId(res.data.result.result.entry)
            Modal.success({
              title: "Sukses",
              content: 'Berhasil mengirim data ke SatuSehat.',
              onOk: () => {
                let temp = res.data.result.result.entry;
                console.log('temp : ', temp);

                const updatedEntryData = temp.map((entry) => {
                  entry.registrasiId = identitasPx.RegistrasiId;
                  entry.userId = sessionStorage.getItem("userId");
                  entry.clientHost = sessionStorage.getItem("Host");
                  entry.clientIP = sessionStorage.getItem("IP");
                  entry.environment = env;
                  entry.ruangId = ruangId;
                  entry.resourceType = resource;
                  entry.resourceGroup = rscGroup;
                  return entry;
                });
                insertResourceId(updatedEntryData);

                console.log('kirimBundleV2 : ', updatedEntryData);
              },
            });
          }
          else {
            let msg = res.data.result.result;
            let additionalMessage = JSON.stringify(msg, null, 2);

            Modal.error({
              title: "Gagal!",
              content: (
                <div>
                  <p>Gagal! mengirim data ke SatuSehat!</p>
                  <TextArea rows={15} value={additionalMessage} readOnly />
                </div>
              ),
            });
          }
        })
        .catch((err) => {
          setspCvg(false)
          Modal.error({
            title: "ERROR!",
            content: `ERROR! Kirim Bundle SatuSehat! -> ${err}`,
          });
        });
    }
  };

  return (
    <SatuSehatModulContext.Provider
      value={{
        env,
        sstoken,
        setsstoken,
        ihsRS,
        setihsRS,
        ruangId,
        setruangId,
        identitasPx,
        setidentitasPx,
        paramEncounter,
        setparamEncounter,
        paramEpsofCare,
        setparamEpsofCare,
        regEpsofCare,
        setregEpsofCare,
        tempA,
        settempA,
        // form detail ihs pasien
        ihsPasien,
        setihsPasien,
        ihstgllahir,
        setihstgllahir,
        ihsalamat,
        setihsalamat,
        ihsjenkel,
        setihsjenkel,
        ihsihsnumber,
        setihsihsnumber,
        ihsnik,
        setihsnik,
        ihslastupdate,
        setihslastupdate,
        ihsnama,
        setihsnama,
        JSONPost,
        setJSONPost,
        flagMdSnomed, setflagMdSnomed,
        keluhanUtama, setkeluhanUtama,
        edukasi, setedukasi,
        tempListSnomed, settempListSnomed,
        textResponseById, settextResponseById,
        listRiwayatDx, setlistRiwayatDx,
        riwPenyakit, setriwPenyakit,

        colTbResource,

        spTbPasien,
        setspTbPasien,
        spIdentPx,
        setspIdentPx,
        spDetailKirim,
        setspDetailKirim,
        spCvg,
        setspCvg,
        spGetRsc, setspGetRsc,

        mdIhsPasien,
        setmdIhsPasien,
        mdDetailKirim,
        setmdDetailKirim,
        mdIhsPasienv2,
        setmdIhsPasienv2,
        mdEditJSON,
        setmdEditJSON,
        mdLookupSnomed,
        setmdLookupSnomed,
        mdRscDetail, setmdRscDetail,

        rstNull,
        LookupSnomed,
        getDetailEnv,
        getIdentPx,
        getIhsPasien,
        getParamEncounter,
        getResourceByIdOld, // versi lama
        getResourceById,
        getRiwRscId,
        getRiwRscIdAsli,
        getRiwayatDx,
        getDiagnosa,
        getProsedur,
        getMedicationBundle,
        getPoliLocation,
        getOrderPenunjang,
        getHasilLabPK,
        insertIhsPasien,
        postResource,
        postResourcev2,
        putResource,
        kirimBundleV2,

        // status steps
        detailEnc, setdetailEnc,
        sts01, setsts01,
        sts02, setsts02,
        sts03, setsts03,
        sts04, setsts04, // keluhan utama
        sts05, setsts05,
        sts06, setsts06,
        sts07, setsts07,
        sts08, setsts08,
        sts09, setsts09,
        sts10, setsts10,
        sts11, setsts11,
        sts12, setsts12,
        sts13, setsts13,
        sts14, setsts14,
        sts15, setsts15,
        sts16, setsts16,
        sts17, setsts17,
        sts18, setsts18,
        sts19, setsts19,
      }}
    >
      {props.children}
    </SatuSehatModulContext.Provider>
  );
};

export default SatuSehatModulContextProvider;
