/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import axios from "axios";
import { message, Modal } from "antd";
import { LoginContext } from "../../../rawatjalan/context";

export const JadwalRadioterapiContext = createContext();

const endpoint = "http://182.168.6.72:5577";

const JadwalRadioterapiContextProvider = (props) => {
  const { token, namauser } = useContext(LoginContext);
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const nmUser = namauser;

  const unitId = "9404";
  const [tglOrder, settglOrder] = useState(dayjs());
  const [maxAnt, setmaxAnt] = useState([]);
  // main
  const [listTbOrder, setListTbOrder] = useState([]);
  const [noOrder, setnoOrder] = useState("");
  const [noAntrian, setnoAntrian] = useState("");
  const [noReg, setnoReg] = useState("");
  const [tglPemeriksaan, settglPemeriksaan] = useState(dayjs());
  const [noPasien, setnoPasien] = useState("");
  const [nama, setnama] = useState("");
  const [alamat, setalamat] = useState("");
  const [jenisKelamin, setjenisKelamin] = useState("");
  const [tglLahir, settglLahir] = useState("");
  const [pembayaran, setpembayaran] = useState("");
  const [noPenjamin, setnoPenjamin] = useState("");
  const [kelas, setkelas] = useState("");
  const [dokter, setdokter] = useState("");
  const [unitOrder, setunitOrder] = useState("");
  const [diagnosa, setdiagnosa] = useState("");
  const [kodepmr, setkodepmr] = useState("");
  const [pemeriksaan, setpemeriksaan] = useState("");
  const [katPelayanan, setkatPelayanan] = useState("");
  const [katBagian, setkatBagian] = useState("");
  const [waktu, setwaktu] = useState("");
  const [jamAwal, setjamAwal] = useState(dayjs());
  const [jamAkhir, setjamAkhir] = useState(dayjs());
  const [status, setstatus] = useState("");
  // spin
  const [spinTbOrder, setspinTbOrder] = useState(false);
  const [spinDetailJadwal, setspinDetailJadwal] = useState(false);
  // modal
  const [mdFormAturJadwal, setmdFormAturJadwal] = useState(false);
  // mst
  // const [penunjang, setPenunjang] = useState([])

  // mst
  // const getRuangPenunjang = async () => {
  //     setspinLoadMst(true)
  //     const response = await axios.get(`${endpoint}/MstRuang/Lookup/%20/4/1/100`, options)
  //     if (response.data.statusCode === 200) {
  //         setspinLoadMst(false)
  //         setPenunjang(response.data.result)
  //         message.success("Load Unit Pelayanan Penunjang Berhasil.")
  //         if (response.data.result.length === 0) {
  //             message.warning("Data Unit Pelayanan Tidak Ditemukan");
  //         }
  //     }
  //     else {
  //         setspinLoadMst(false)
  //         message.error("Error Load Unit Pelayanan Penunjang!");
  //     }
  // }

  // Hardcode Kategori Pelayanan
  const mstKatPelayanan = [
    {
      id: "1",
      desk: "Simulator",
    },
    {
      id: "2",
      desk: "Brahi",
    },
    {
      id: "3",
      desk: "Sinar Rutin",
    },
  ];

  // Hardcode Kategori Bagian
  const mstKatBagian = [
    {
      id: "A",
      desk: "Kasus 1",
    },
    {
      id: "B",
      desk: "Kasus 2",
    },
    {
      id: "C",
      desk: "Kasus 3",
    },
    {
      id: "D",
      desk: "Kasus 4",
    },
    {
      id: "E",
      desk: "Kasus 5",
    },
  ];

  const getListOrder = async (tgl, unit, key) => {
    setspinTbOrder(true);
    if (key.length === 0) {
      key = "%20";
    }

    tgl = dayjs(tgl).format("YYYY-MM-DD");

    axios
      .get(
        `${endpoint}/EmrRadioterapi/listorderradioterapi/${tgl}/${unit}/${key}`,
        options
      )
      .then((response) => {
        // console.log("getPasienRi ", res.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setListTbOrder([]);
            setspinTbOrder(false);
            Modal.info({
              title: "Informasi",
              content: `Tidak ada order ditemukan.`,
            });
          } else {
            // console.log("getListOrder : ", response.data.result);
            setListTbOrder(response.data.result);
            // setmdListOrder(true)
            setspinTbOrder(false);
          }
        } else {
          setListTbOrder([]);
          setspinTbOrder(false);
          Modal.error({
            title: "Gagal",
            content: `Gagal melakukan proses ambil data List Order!`,
          });
        }
      })
      .catch((err) => {
        setListTbOrder([]);
        setspinTbOrder(false);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil data List Order! -> ${err}`,
        });
      });
  };

  const getMaxAntrian = async (tgl) => {
    tgl = dayjs(tgl).format("YYYY-MM-DD");

    axios
      .get(
        `${endpoint}/EmrRadioterapi/infoantrianradioterapimax/${tgl}`,
        options
      )
      .then((response) => {
        // console.log("getMaxAntrian ", response.data);
        if (response.data.statusCode === 200) {
          if (response.data.result.length === 0) {
            setmaxAnt([]);
          } else {
            setmaxAnt(response.data.result);
          }
        } else {
          setmaxAnt([]);
          Modal.error({
            title: "Gagal",
            content: `Gagal melakukan proses ambil data Maks. Antrian!`,
          });
        }
      })
      .catch((err) => {
        setmaxAnt([]);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil data Maks. Antrian! -> ${err}`,
        });
      });
  };

  // useEffect(() => {
  //     getListOrder(tglOrder, unitId, '')
  //     getMaxAntrian(tglOrder)
  // }, [])

  const setDefaultMain = async () => {
    setnoOrder("");
    setnoAntrian("");
    setnoReg("");
    settglPemeriksaan(dayjs());
    setnoPasien("");
    setnama("");
    setalamat("");
    setjenisKelamin("");
    settglLahir("");
    setpembayaran("");
    setnoPenjamin("");
    setkelas("");
    setdokter("");
    setunitOrder("");
    setdiagnosa("");
    setkodepmr("");
    setpemeriksaan("");
    setkatPelayanan("");
    setkatBagian("");
    setwaktu("");
    setjamAwal(dayjs());
    setjamAkhir(dayjs());
    setstatus("");
  };

  const getDetailJadwal = async (noOrder, noReg, kdPmr) => {
    setDefaultMain();
    setspinDetailJadwal(true);
    axios
      .get(
        `${endpoint}/EmrRadioterapi/detailjadwalradioterapi/${noOrder}/${noReg}/${kdPmr}`,
        options
      )
      .then((response) => {
        if (response.data.statusCode === 200) {
          // console.log("getDetailJadwal : ", response.data.result);
          setnoAntrian(response.data.result.NoAntrian);
          setnoOrder(response.data.result.NOORDER);
          setnoReg(response.data.result.NOREG);
          settglPemeriksaan(response.data.result.TGLORDER);
          setnoPasien(response.data.result.PasienId);
          setnama(response.data.result.Nama);
          setalamat(response.data.result.Alamat);
          setjenisKelamin(response.data.result.JenisKelaminId);
          settglLahir(
            dayjs(response.data.result.TanggalLahir).format("DD-MM-YYYY")
          );
          setpembayaran(response.data.result.Pembayaran);
          setnoPenjamin(response.data.result.NoPolish);
          setkelas(response.data.result.KelasRawat);
          setdokter(response.data.result.NamaDokter);
          setunitOrder(response.data.result.UnitAsal);
          setdiagnosa(response.data.result.DIAGNOSA);
          setkodepmr(response.data.result.KODEPMR);
          setpemeriksaan(response.data.result.Pemeriksaan);
          setkatPelayanan(response.data.result.KategoriPelayanan);
          setkatBagian(response.data.result.KategoriBagian);
          !response.data.result.TglPemeriksaan
            ? setwaktu("")
            : setwaktu(
                dayjs(response.data.result.TglPemeriksaan).format(
                  "DD-MM-YYYY"
                ) +
                  ", " +
                  dayjs(response.data.result.JamAwal).format("HH:mm") +
                  " - " +
                  dayjs(response.data.result.JamAkhir).format("HH:mm")
              );
          !response.data.result.JamAwal
            ? setjamAwal(dayjs())
            : setjamAwal(response.data.result.JamAwal);
          !response.data.result.JamAkhir
            ? setjamAkhir(dayjs())
            : setjamAkhir(response.data.result.JamAkhir);
          setstatus(response.data.result.Status);
          setspinDetailJadwal(false);
        } else {
          setDefaultMain();
          setspinDetailJadwal(false);
          Modal.error({
            title: "Gagal",
            content: `Gagal melakukan proses ambil data Detail Jadwal!`,
          });
        }
      })
      .catch((err) => {
        setDefaultMain();
        setspinDetailJadwal(false);
        Modal.error({
          title: "Error",
          content: `Error melakukan proses ambil data Detail Jadwal! -> ${err}`,
        });
      });
  };

  const postJadwalRadioterapi = async (data) => {
    axios
      .post(`${endpoint}/EmrRadioterapi/insertjadwalradioterapi`, data, {
        headers: options.headers,
      })
      .then((res) => {
        // console.log('postJadwalRadioterapi', res.data);
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Berhasil",
            content: `Berhasil, Jadwal Disimpan.`,
            onOk: () => {
              setmdFormAturJadwal(false);
              getListOrder(tglOrder, unitId, "");
              getDetailJadwal(noOrder, noReg, kodepmr);
              getMaxAntrian(tglOrder);
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal, Jadwal tidak Disimpan! -> ${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR!",
          content: `ERROR, Jadwal tidak Disimpan! -> ${err}`,
        });
      });
  };

  const postDilayani = async (data) => {
    axios
      .post(`${endpoint}/EmrRadioterapi/dilayanijadwalradioterapi`, data, {
        headers: options.headers,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.statusCode === 200) {
          Modal.success({
            title: "Berhasil",
            content: `Berhasil, Pasien Terlayani.`,
            onOk: async () => {
              getListOrder(tglOrder, unitId, "");
              setDefaultMain();
            },
          });
        } else {
          Modal.error({
            title: "Gagal!",
            content: `Gagal, Pasien gagal Terlayani! -> ${res.data.message}`,
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR!",
          content: `ERROR, Pasien gagal Terlayani! -> ${err}`,
        });
      });
  };

  return (
    <JadwalRadioterapiContext.Provider
      value={{
        unitId,
        tglOrder,
        settglOrder,
        maxAnt,
        setmaxAnt,
        // main
        listTbOrder,
        noOrder,
        setnoOrder,
        noAntrian,
        setnoAntrian,
        noReg,
        setnoReg,
        tglPemeriksaan,
        settglPemeriksaan,
        noPasien,
        setnoPasien,
        nama,
        setnama,
        alamat,
        setalamat,
        jenisKelamin,
        setjenisKelamin,
        tglLahir,
        settglLahir,
        pembayaran,
        setpembayaran,
        noPenjamin,
        setnoPenjamin,
        kelas,
        setkelas,
        dokter,
        setdokter,
        unitOrder,
        setunitOrder,
        diagnosa,
        setdiagnosa,
        kodepmr,
        setkodepmr,
        pemeriksaan,
        setpemeriksaan,
        katPelayanan,
        setkatPelayanan,
        katBagian,
        setkatBagian,
        waktu,
        setwaktu,
        jamAwal,
        setjamAwal,
        jamAkhir,
        setjamAkhir,
        status,
        setstatus,
        ip,
        host,
        nmUser,
        // spin
        spinTbOrder,
        spinDetailJadwal,
        setspinDetailJadwal,
        // mst
        // penunjang,
        // hardcode
        mstKatPelayanan,
        mstKatBagian,
        // func
        // getRuangPenunjang,
        getListOrder,
        setDefaultMain,
        getDetailJadwal,
        getMaxAntrian,
        postJadwalRadioterapi,
        postDilayani,
        // modal
        mdFormAturJadwal,
        setmdFormAturJadwal,
      }}
    >
      {props.children}
    </JadwalRadioterapiContext.Provider>
  );
};

export default JadwalRadioterapiContextProvider;
