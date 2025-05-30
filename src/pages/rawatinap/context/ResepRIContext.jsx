import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const ResepRIContext = createContext();

const ResepRIContextProvider = (props) => {
  const [listorder, setListOrder] = useState([]);
  const [order, setOrder] = useState([]);
  const [riwayatobat, setRiwayatObat] = useState([]);
  const [riwayatobatdetail, setRiwayatObatDetail] = useState([]);
  const [ruangan, setRuangan] = useState("");
  const [barang, setBarang] = useState([]);
  const [jumlah, setQuantity] = useState(1.0);
  const [aturan, setAturan] = useState("");
  const [aturanpakai, setAturanPakai] = useState([]);
  const [jnsracikan, setJenisRacikan] = useState([]);
  const [barangdetail, setBarangDetail] = useState("");
  const [items, setItems] = useState([]);
  const [itemspaten, setItemsPaten] = useState([]);
  const [racik, setRacik] = useState([]);
  const [itemsracik, setItemsRacik] = useState([]);
  const [unitorder, setUnitOrder] = useState("");
  const [itemName, setItemName] = useState("");
  const [satuan, setSatuan] = useState("");
  const [harga, setHarga] = useState("");
  const [kodebarang, setKodeBarang] = useState("");

  const apiku = sessionStorage.getItem("api");

  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getJnsRacikan = () => {
    axios.get(`${apiku}/MstJenisRacikan/Lookup/%20`, options).then((res) => {
      setJenisRacikan(res.data.result);
    });
  };

  const getBarang = (ruang) => {
    axios
      .get(`${apiku}/MstBarang/LookupGetViewBarang/ /${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBarang(res.data.result);
          // console.log(res.data.result);
          setRuangan(ruang);
          // console.log(ruang);
        } else {
          setBarang([]);
          message.error("Barang Tidak Ada!");
        }
      })
      .catch((err) => {
        setBarang([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const getBarangNama = (barang, ruang) => {
    axios
      .get(`${apiku}/MstBarang/LookupGetViewBarang/${barang}/${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBarang(res.data.result);
          //   console.log(res.data.result);
          setRuangan(ruang);
          //   console.log(ruang);
        } else {
          setBarang([]);
          message.error("Barang Tidak Ada!");
        }
      })
      .catch((err) => {
        setBarang([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const getAturanPakai = () => {
    const mockVal = (str) => ({
      value: str,
    });
    axios
      .get(`${apiku}/FmOrder/AturanPakai/Lookup`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setAturanPakai(res.data.result.map((d) => mockVal(d.deskripsi)));
          // console.log(res.data.result.map(({ deskripsi }) => ({ deskripsi })));
          // console.log(res.data.result.map((d) => mockVal(d.deskripsi)));
        } else {
          setAturanPakai([]);
          message.error("Kosong");
        }
      })
      .catch((err) => {
        setAturanPakai([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const getBarangDetail = (id) => {
    axios
      .get(`${apiku}/MstBarang/ID/${id}/${ruangan}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBarangDetail(res.data.result);
          // console.log(res.data.result);
          setItemName(res.data.result.NAMABARANG);
          setSatuan(res.data.result.NAMASM);
          setHarga(res.data.result.HARGARWJ);
          setKodeBarang(res.data.result.KODEBARANG);
        } else {
          setBarangDetail([]);
          message.error("Barang Tidak Ada!");
        }
      })
      .catch((err) => {
        setBarangDetail([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const insertOrder = (dataorder) => {
    console.log(dataorder);
    axios
      .post(`${apiku}/FmOrder`, dataorder, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setOrder(res.data.result);
          console.log(res.data);
          message.success("Berhasil Disimpan!");
        } else {
          console.log(res.data);
          message.error("Sudah Tersimpan!");
        }
      })
      .catch((err) => {
        console.log("kenapa", err.response);
        message.error("Gagal Disimpan!");
      });
  };
  const listOrder = (id) => {
    axios
      .get(`${apiku}/FmOrder/Lookup/${id}`, options)
      .then((res) => {
        if (res.data.result !== []) {
          console.log("list order resep", res.data.result);
          setListOrder(res.data.result);
          // setUnitOrder([]);
          // setItemsPaten([]);
          // setOrder([]);
        } else {
          message.warning("Belum ada data order");
          console.log(res.data.result);
          setListOrder([]);
          // setUnitOrder([]);
          // setItemsPaten([]);
          // setOrder([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data Order!");
        console.log(err);
        setListOrder([]);
        // setUnitOrder([]);
        // setItemsPaten([]);
        // setOrder([]);
      });
  };
  const detailOrder = (id) => {
    axios
      .get(`${apiku}/FmOrder/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setOrder(res.data.result);
          setItemsPaten(res.data.result.ObatPaten);
          setItems(res.data.result.ObatPaten);
          // console.log(res.data.result.ObatPaten);
        } else {
          message.error("Gagal Mengambil Data Order!");
          console.log(res.data.result);
          setOrder([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setOrder([]);
      });
  };

  const setKosong = () => {
    setUnitOrder("");
    setItemsPaten([]);
    setOrder([]);
    setBarang([]);
    setKodeBarang([]);
    setQuantity(1.0);
    setAturan("");
    getAturanPakai();
  };

  const getRiwayatObat = () => {
    axios
      .get(`${apiku}/EmrPasienAktif/RiwayatObat/PasienId/00044513`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRiwayatObat(res.data.result);
        } else {
          message.error("Gagal Mengambil Data Riwayat!");
          console.log(res.data.result);
          setRiwayatObat([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setRiwayatObat([]);
      });
  };

  const getRiwayatObatDetail = (noresep) => {
    axios
      .get(
        `${apiku}/EmrPasienAktif/RiwayatObatDetail/NoResep/${noresep}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRiwayatObatDetail(res.data.result);
        } else {
          message.error("Gagal Mengambil Data Riwayat!");
          console.log(res.data.result);
          setRiwayatObatDetail([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setRiwayatObatDetail([]);
      });
  };

  return (
    <ResepRIContext.Provider
      value={{
        setKosong,
        insertOrder,
        getBarangDetail,
        barangdetail,
        itemName,
        setItemName,
        harga,
        setHarga,
        satuan,
        setSatuan,
        kodebarang,
        setKodeBarang,
        detailOrder,
        order,
        setOrder,
        getBarang,
        barang,
        getBarangNama,
        jumlah,
        setQuantity,
        aturan,
        setAturan,
        aturanpakai,
        getAturanPakai,
        listorder,
        listOrder,
        items,
        setItems,
        itemspaten,
        setItemsPaten,
        unitorder,
        setUnitOrder,
        jnsracikan,
        getJnsRacikan,
        racik,
        setRacik,
        itemsracik,
        setItemsRacik,
        riwayatobat,
        riwayatobatdetail,
        getRiwayatObat,
        getRiwayatObatDetail,
      }}
    >
      {props.children}
    </ResepRIContext.Provider>
  );
};

export default ResepRIContextProvider;
