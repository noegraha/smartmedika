import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { message, Alert } from "antd";
import { LoginContext } from "../context/LoginContext";
import { PasienContext } from "../context/PasienContext";

export const ResepContext = createContext();

const ResepContextProvider = (props) => {
  const [listorder, setListOrder] = useState([]);
  const [order, setOrder] = useState([]);
  const [riwayatobat, setRiwayatObat] = useState([]);
  const [riwayatobatdetail, setRiwayatObatDetail] = useState([]);
  const [ruangan, setRuangan] = useState("");
  const [noOrder, setNoOrder] = useState(null);

  const [masterjnsracikan, setMasterJenisRacikan] = useState([]);
  const [aturanpakai, setAturanPakai] = useState([]);

  // state detail obat paten
  const [patenbarangdetail, setPatenBarangDetail] = useState("");
  const [patenharga, setPatenHarga] = useState("");
  const [patennamabarang, setPatenNamaBarang] = useState("");
  const [patensatuan, setPatenSatuan] = useState("");
  // const [patenmarginprofit, setPatenProfitMargin] = useState("");
  const [barang, setBarang] = useState([]);
  const [jumlah, setQuantity] = useState(1.0);
  const [aturan, setAturan] = useState("");
  const [items, setItems] = useState([]);
  const [itemspaten, setItemsPaten] = useState([]);
  // const [retriksijadi, setRetriksiJadi] = useState("");

  // state detail obat racik
  const [resepracik, setResepRacik] = useState([]);
  const [nomorracik, setNomorRacik] = useState(1);
  const [racikbarangdetail, setRacikBarangDetail] = useState("");
  const [racikharga, setRacikHarga] = useState("");
  const [raciknamabarang, setRacikNamaBarang] = useState("");
  const [raciksatuan, setRacikSatuan] = useState("");
  // const [racikmarginprofit, setRacikProfitMargin] = useState("");
  const [racik, setRacik] = useState([]);
  const [itemsracik, setItemsRacik] = useState([]);
  const [unitorder, setUnitOrder] = useState("");
  const [kodebarang, setKodeBarang] = useState([]);
  const [retriksi, setRetriksi] = useState("");
  const [kekuatan, setKekuatan] = useState("");
  const [maxorderobat, setMaxOrderObat] = useState("");
  const [itemracikan, setItemRacikan] = useState([]);
  const [detailracik, setDetailracik] = useState([]);
  const [barangidracik, setBarangIdRacik] = useState([]);
  const [jenisracikid, setJenisRacikId] = useState(null);
  const [quantityracikan, setQuantityRacikan] = useState(null);
  const [aturanpakaiidracik, setAturanPakaiIdRacik] = useState(null);
  const [riwayatorder, setRiwayatOrder] = useState([]);

  // state koneksi
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const noreg = sessionStorage.getItem("noreg");
  const ip = sessionStorage.getItem("IP");

  const [loadingresep, setLoadingResep] = useState(false);
  const [loadingResep, setLoadingresep] = useState(false);
  const [loadingOrder, setLoadingOrder] = useState(false);

  const { namauser, sendTele } = useContext(LoginContext);
  const { curpas } = useContext(PasienContext);
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  function topFunction() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
  }

  const getJnsRacikan = () => {
    axios
      .get(`${apiku}/MstJenisRacikan/Lookup/%20`, options)
      .then((res) => {
        setMasterJenisRacikan(res.data.result);
      })
      .catch((err) => {
        console.log(err);
        setMasterJenisRacikan([]);
      });
  };

  const getBarang = (ruang) => {
    axios
      .get(`${apiku}/MstBarang/LookupGetViewBarang/ /${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBarang(
            res.data.result.sort((a, b) =>
              a.NamaBarang.localeCompare(b.NamaBarang)
            )
          );
          // console.log(res.data.result);
          setRuangan(ruang);
          // console.log(ruang);
        } else {
          setBarang([]);
          message.warning("Barang Tidak Ada!");
        }
      })
      .catch((err) => {
        setBarang([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const getBarangRinci = (ruang) => {
    axios
      .get(`${apiku}/MstBarang/LookupGetViewBarangDetail/ /${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setBarang(
          //   res.data.result.sort((a, b) =>
          //     a.NamaBarang.localeCompare(b.NamaBarang)
          //   )
          // );
          // console.log(res.data.result);
          setRuangan(ruang);
          // console.log(ruang);
        } else {
          setBarang([]);
          message.warning("Barang Tidak Ada!");
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
      .get(
        `${apiku}/MstBarang/LookupGetViewBarangDetail/${barang}/${ruang}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBarang(
            res.data.result.sort((a, b) =>
              a.NamaBarang.localeCompare(b.NamaBarang)
            )
          );
          //   console.log(res.data.result);
          setRuangan(ruang);
          //   console.log(ruang);
        } else {
          setBarang([]);
          message.warning("Barang Tidak Ada!");
        }
      })
      .catch((err) => {
        setBarang([]);
        console.log(err);
        // message.error("Gagal Ambil!");
      });
  };

  const getBarangZatAktif = (zataktif, barang, ruang) => {
    axios
      .get(
        `${apiku}/MstBarang/LookUpBarangByDualParam/${zataktif}/${barang}/${ruang}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBarang(
            res.data.result.sort((a, b) =>
              a.NamaBarang.localeCompare(b.NamaBarang)
            )
          );
          // console.log(res.data.result);
          setRuangan(ruang);
          //   console.log(ruang);
        } else {
          setBarang([]);
          message.warning("Barang Tidak Ada!");
        }
      })
      .catch((err) => {
        setBarang([]);
        console.log(err);
        // message.error("Gagal Ambil!");
      });
  };

  const getAturanPakai = () => {
    const mockVal = (str) => ({
      value: str,
    });
    axios
      .get(`${apiku}/FmOrderObat/AturanPakai/Lookup`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setAturanPakai(res.data.result.map((d) => mockVal(d.deskripsi)));
        } else {
          setAturanPakai([]);
          message.warning(res.data.message);
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
          // setPatenBarangDetail(res.data.result);
          // setPatenNamaBarang(res.data.result.NAMABARANG);
          // setPatenSatuan(res.data.result.KODESM);
          // setPatenHarga(res.data.result.HARGARWJ);
          // setPatenProfitMargin(res.data.result.MRGPROFIT);
          // setRetriksiJadi(res.data.result.RETRIKSI);
          if (res.data.result.RETRIKSI === null) {
            console.log();
          } else {
            message.warning(
              <Alert
                message={
                  res.data.result.NAMABARANG + " : " + res.data.result.RETRIKSI
                }
                type="info"
              />
            );
          }
        } else {
          // setPatenBarangDetail([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setPatenBarangDetail([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const getBarangDetailRacik = (id) => {
    axios
      .get(`${apiku}/MstBarang/ID/${id}/${ruangan}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setRacikBarangDetail(res.data.result);
          // setRacikNamaBarang(res.data.result.NAMABARANG);
          // setRacikSatuan(res.data.result.KODESM);
          // setRacikHarga(res.data.result.HARGARWJ);
          // setRacikProfitMargin(res.data.result.MRGPROFIT);
          // setRetriksi(res.data.result.RETRIKSI);
          // setKekuatan(res.data.result.KEKUATAN);
          // setMaxOrderObat(res.data.result.MAXORDEROBAT);
          if (res.data.result.RETRIKSI !== null) {
            message.info(
              <Alert
                message={
                  res.data.result.NAMABARANG + " : " + res.data.result.RETRIKSI
                }
                type="info"
              />,
              5
            );
          } else {
            console.log("ok");
          }
          if (res.data.result.KEKUATAN === null) {
            setBarangIdRacik(
              barangidracik.filter((item) => item.split("-").shift() !== id)
            );
            message.warning(
              `Kekuatan dosis Obat Dengan Kode ${id} belum disetting. Silahkan Hubungi Petugas Farmasi.`
            );
          } else {
            console.log("ok");
          }
        } else {
          setRacikBarangDetail([]);
          message.error("Barang Tidak Ada!");
        }
      })
      .catch((err) => {
        setRacikBarangDetail([]);
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };

  const insertOrder = (dataorder) => {
    setLoadingOrder(true);
    axios
      .post(`${apiku}/FmOrderObat`, dataorder, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setOrder(res.data.result);
          setNoOrder(res.data.result.orderId);
          // console.log(res.data.result);
          message.success("Berhasil Disimpan!");
          topFunction();
          setLoadingOrder(false);
        } else {
          setLoadingOrder(false);
          message.warning("Gagal Simpan!");
          // Modal.warning({
          //   width: "400px",
          //   title: "Gagal Menyimpan!",
          //   content: <ReactJson src={res.data} />,
          // });
          sendTele(
            "3",
            "Insert Order Resep - DataPoli",
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
        setLoadingOrder(false);
        message.error("Gagal Simpan!");
        // Modal.error({
        //   width: "400px",
        //   title: "Gagal Menyimpan!",
        //   content: <ReactJson src={err.response.data} />,
        // });
        sendTele(
          "3",
          "Insert Order Resep - DataPoli",
          "400",
          "Server Error",
          ip,
          namauser,
          curpas.namaPasien,
          curpas.ruangDeskripsi
        );
      });
  };
  const listOrder = (id) => {
    axios
      .get(`${apiku}/FmOrderObat/Lookup/${id}`, options)
      .then((res) => {
        if (Array.isArray(res.data.result) && res.data.result.length > 0) {
          setListOrder(res.data.result);
        } else {
          message.warning("Belum ada data order");
          console.log(res.data.result);
          setListOrder([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data Order!");
        console.log(err);
        setListOrder([]);
      });
  };
  const detailOrder = (id) => {
    setLoadingresep(true);
    axios
      .get(`${apiku}/FmOrderObat/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setNoOrder(res.data.result.orderId);
          setOrder(res.data.result);
          setItemsPaten(res.data.result.obatPaten);
          setKodeBarang(
            res.data.result.obatPaten.map(
              (p) =>
                p.barangId +
                "-" +
                p.namaBarang +
                "_" +
                p.satuanDesk +
                "+" +
                p.hargaRwj +
                ">" +
                p.kodeSM +
                "!" +
                p.profitMargin +
                "<" +
                p.isHantar
            )
          );
          setItems(res.data.result.obatPaten);
          setResepRacik(res.data.result.headerRacik);
          setNomorRacik(res.data.result.headerRacik.length + 1);
          setLoadingresep(false);
        } else {
          message.error(res.data.message);
          console.log(res.data);
          setNoOrder("0");
          setOrder([]);
          setItemsPaten([]);
          setItems([]);
          setResepRacik([]);
          setLoadingresep(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setNoOrder("0");
        setOrder([]);
        setItemsPaten([]);
        setItems([]);
        setResepRacik([]);
        setLoadingresep(false);
      });
  };

  const detailOrderHistory = (id) => {
    setLoadingresep(true);
    axios
      .get(`${apiku}/FmOrderObat/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setNoOrder(null);
          setOrder(res.data.result);
          setItemsPaten(
            res.data.result.obatPaten.map((item, i) => ({
              isRacikan: item.isRacikan,
              barangId: item.barangId,
              namaBarang: item.namaBarang,
              quantity: item.quantity,
              harga: item.hargaRwj,
              hargaRwj: item.hargaRwj,
              hargaTotal: item.quantity * item.hargaRwj,
              satuanId: item.satuanId,
              satuanDesk: item.satuanDesk,
              aturanPakaiId: item.aturanPakaiId,
              profitMargin: item.profitMargin,
              isHantar: item.isHantar,
            }))
          );
          setKodeBarang(
            res.data.result.obatPaten.map(
              (p) =>
                p.barangId +
                "-" +
                p.namaBarang +
                "_" +
                p.satuanDesk +
                "+" +
                p.hargaRwj +
                ">" +
                p.kodeSM +
                "!" +
                p.profitMargin +
                "<" +
                p.isHantar
            )
          );
          setItems(
            res.data.result.obatPaten.map((item, i) => ({
              isRacikan: item.isRacikan,
              barangId: item.barangId,
              namaBarang: item.namaBarang,
              quantity: item.quantity,
              harga: item.hargaRwj,
              hargaRwj: item.hargaRwj,
              hargaTotal: item.quantity * item.hargaRwj,
              satuanId: item.satuanId,
              satuanDesk: item.satuanDesk,
              aturanPakaiId: item.aturanPakaiId,
              profitMargin: item.profitMargin,
              isHantar: item.isHantar,
            }))
          );
          setResepRacik(
            res.data.result.headerRacik.map((racik) => ({
              noRacik: racik.noRacik,
              jenisRacikId: racik.jenisRacikId,
              jenisRacikDesk: racik.jenisRacikDesk,
              quantity: racik.quantity,
              aturanPakaiId: racik.aturanPakaiId,
              flagItem: racik.flagItem,
              keterangan: racik.keterangan,
              kodeSM: racik.kodeSM,
              kekuatan: racik.kekuatan,
              obatRacik: racik.obatRacik.map((item) => ({
                noRacik: item.noRacik,
                barangId: item.barangId,
                namaBarang: item.namaBarang,
                quantity: Math.ceil(
                  (item.dosis / item.kekuatan) * racik.quantity
                ),
                satuanId: item.satuanId,
                harga: item.hargaRwj,
                hargaRwj: item.hargaRwj,
                hargaTotal:
                  Math.ceil((item.dosis / item.kekuatan) * racik.quantity) *
                  item.hargaRwj,
                dosis: item.dosis,
                kekuatan: item.kekuatan,
                kodeSM: item.kodeSM,
                profitMargin: item.profitMargin,
                jenisRacikId: item.jenisRacikId,
                isHantar: item.isHantar,
              })),
            }))
          );
          setNomorRacik(res.data.result.headerRacik.length + 1);
          setLoadingresep(false);
        } else {
          message.error(res.data.message);
          console.log(res.data);
          setNoOrder("0");
          setOrder([]);
          setItemsPaten([]);
          setItems([]);
          setResepRacik([]);
          setLoadingresep(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setNoOrder("0");
        setOrder([]);
        setItemsPaten([]);
        setItems([]);
        setResepRacik([]);
        setLoadingresep(false);
      });
  };

  const setKosong = () => {
    // setUnitOrder("");
    setItems([]);
    setItemsPaten([]);
    setResepRacik([]);
    setDetailracik([]);
    setItemRacikan([]);
    setOrder([]);
    setBarang([]);
    setKodeBarang([]);
    setQuantity(1.0);
    setAturan("");
    getAturanPakai();
    setNomorRacik(1);
    setBarangIdRacik([]);
    setJenisRacikId(null);
    setQuantityRacikan(null);
    setAturanPakaiIdRacik(null);
    setNoOrder(null);
  };

  const getRiwayatObat = (pasienid) => {
    setLoadingResep(true);
    axios
      .get(`${apiku}/EmrPasienAktif/RiwayatObat/PasienId/${pasienid}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRiwayatObat(res.data.result);
          setLoadingResep(false);
          // console.log(pasienid, res.data);
        } else {
          message.error("Gagal Mengambil Data Riwayat!");
          console.log(res.data.result);
          setRiwayatObat([]);
          setLoadingResep(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setRiwayatObat([]);
        setLoadingResep(false);
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

  const getRiwayatOrder = (nopasien) => {
    axios
      .get(`${apiku}/FmOrderObat/GetHistoryOrder/${nopasien}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRiwayatOrder(res.data.result);
        } else {
          message.warning("Gagal Mengambil Data Riwayat!");
          console.log(res.data.result);
          setRiwayatOrder([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setRiwayatOrder([]);
      });
  };

  const deleteOrder = (noorder) => {
    axios
      .delete(`${apiku}/FmOrderObat/NoOrder/${noorder}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Dihapus!");
          listOrder(noreg);
          // console.log(noreg);
        } else {
          message.warning(res.data.message);
          console.log(res.data.result);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengakses Data!");
        console.log(err);
      });
  };
  return (
    <ResepContext.Provider
      value={{
        setKosong,
        insertOrder,
        getBarangDetail,
        patenbarangdetail,
        patennamabarang,
        setPatenNamaBarang,
        patenharga,
        setPatenHarga,
        patensatuan,
        setPatenSatuan,
        racikbarangdetail,
        racikharga,
        setRacikHarga,
        raciknamabarang,
        setRacikNamaBarang,
        raciksatuan,
        setRacikSatuan,
        // racikmarginprofit,
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
        masterjnsracikan,
        getJnsRacikan,
        racik,
        setRacik,
        itemsracik,
        setItemsRacik,
        riwayatobat,
        riwayatobatdetail,
        getRiwayatObat,
        getRiwayatObatDetail,
        retriksi,
        setRetriksi,
        maxorderobat,
        setMaxOrderObat,
        kekuatan,
        setKekuatan,
        // patenmarginprofit,
        getBarangDetailRacik,
        resepracik,
        setResepRacik,
        noOrder,
        setNoOrder,
        itemracikan,
        setItemRacikan,
        detailracik,
        setDetailracik,
        nomorracik,
        setNomorRacik,
        deleteOrder,
        // retriksijadi,
        getBarangRinci,
        barangidracik,
        setBarangIdRacik,
        jenisracikid,
        setJenisRacikId,
        quantityracikan,
        setQuantityRacikan,
        aturanpakaiidracik,
        setAturanPakaiIdRacik,
        loadingresep,
        loadingOrder,
        loadingResep,
        setLoadingresep,
        getBarangZatAktif,
        riwayatorder,
        setRiwayatOrder,
        getRiwayatOrder,
        detailOrderHistory,
      }}
    >
      {props.children}
    </ResepContext.Provider>
  );
};

export default ResepContextProvider;
