import React, { createContext, useState } from "react";
import axios from "axios";
import { message, Modal } from "antd";
import dayjs from "dayjs";
// import { PelayananContext } from "../context/Pelayanancontext";
// import { PasienContext } from "../context/PasienContext";

export const PenunjangContext = createContext();

const PenunjangContextProvider = (props) => {
  // const { noreg } = useContext(PasienContext);
  const [listorderpenunjang, setListOrderPenunjang] = useState([]);
  const [listorderpenunjangorder, setListOrderPenunjangOrder] = useState([]);
  const [listorderpenunjangvalid, setListOrderPenunjangValid] = useState([]);
  const [orderpenunjang, setOrderPenunjang] = useState([]);
  const [barang, setBarang] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [tabelorder, setTabelOrder] = useState("");
  const [tindakanAmbil, setTindakanAmbil] = useState([]);
  const [formOrder, setFormOrder] = useState(false);
  const [formSelectOrder, setFormSelectOrder] = useState(false);
  const [loadingsimpan, setLoadingSimpan] = useState(false);
  const [load, setload] = useState(false);
  const [tglOrder, settglOrder] = useState(dayjs());

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const noreg = sessionStorage.getItem("noreg");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const getBarang = (ruang) => {
    axios
      .get(`${apiku}/MstBarang/LookupGetViewBarang/ /${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBarang(res.data.result);
          // console.log(res.data.result);
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
  const insertOrderPenunjang = (dataorderpenunjang) => {
    setLoadingSimpan(true);
    axios
      .post(`${apiku}/BillOrderPenunjang`, dataorderpenunjang, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          message.success("Berhasil Disimpan!");
          getListOrderPenunjang(res.data.result.registrasiId);
          getListOrderPenunjangValid(res.data.result.registrasiId);
          setFormOrder(false);
          setFormSelectOrder(false);
          setLoadingSimpan(false);
        } else {
          Modal.warning({
            title: "Data gagal disimpan!",
            content: res.data.message,
          });
          // message.warning(res.data.message);
          setFormOrder(false);
          setFormSelectOrder(false);
          // console.log(res.data);
          setLoadingSimpan(false);
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Gagal Disimpan!",
          content: "Terdapat gangguan koneksi data",
        });
        // message.error("Gagal Disimpan!");
        console.log(err);
        setFormOrder(false);
        setFormSelectOrder(false);
        setLoadingSimpan(false);
      });
  };

  const insertOrderPenunjangRI = (dataorderpenunjang) => {
    setLoadingSimpan(true);
    axios
      .post(`${apiku}/BillOrderPenunjang/RI`, dataorderpenunjang, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          message.success("Berhasil Disimpan!");
          getListOrderPenunjang(res.data.result.registrasiId);
          getListOrderPenunjangValid(res.data.result.registrasiId);
          setFormOrder(false);
          setFormSelectOrder(false);
          setLoadingSimpan(false);
        } else {
          Modal.warning({
            title: "Data gagal disimpan!",
            content: res.data.message,
          });
          // message.warning(res.data.message);
          setFormOrder(false);
          setFormSelectOrder(false);
          // console.log(res.data);
          setLoadingSimpan(false);
        }
      })
      .catch((err) => {
        Modal.error({
          title: "Gagal Disimpan!",
          content: "Terdapat gangguan koneksi data",
        });
        // message.error("Gagal Disimpan!");
        console.log(err);
        setFormOrder(false);
        setFormSelectOrder(false);
        setLoadingSimpan(false);
      });
  };
  const getListOrderPenunjang = (id) => {
    axios
      .get(`${apiku}/BillOrderPenunjang/Lookup/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListOrderPenunjang(res.data.result);
        } else {
          setListOrderPenunjang([]);
        }
      })
      .catch((err) => {
        // message.error("Gagal Mengambil Data Order!");
        console.log(err);
        setListOrderPenunjang([]);
      });
  };
  const getListOrderPenunjangValid = (noreg) => {
    setload(true);
    axios
      .get(`${apiku}/BillOrderPenunjang/LookupValid/${noreg}/0`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListOrderPenunjangOrder(res.data.result);
        } else {
          setListOrderPenunjangOrder([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListOrderPenunjangOrder([]);
      });
    axios
      .get(`${apiku}/BillOrderPenunjang/LookupValid/${noreg}/1`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListOrderPenunjangValid(res.data.result);
        } else {
          setListOrderPenunjangValid([]);
        }
      })
      .catch((err) => {
        console.log(err);
        setListOrderPenunjangValid([]);
      })
      .finally(() => setload(false));
  };

  const getOrderPenunjang = (id) => {
    axios
      .get(`${apiku}/BillOrderPenunjang/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setOrderPenunjang(res.data.result);
        } else {
          setOrderPenunjang([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data Order!");
        console.log(err);
        setOrderPenunjang([]);
      });
  };

  const getListOrderRuang = (id) => {
    axios
      .get(`${apiku}/BillOrderPenunjang/ReadDetail/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTabelOrder(res.data.result);
          setTindakanAmbil(
            res.data.result.map(
              (b) => b.pelayananId + "-" + b.deskripsi + "_" + b.harga
            )
          );
        } else {
          setTabelOrder([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data Order!");
        console.log(err);
        setTabelOrder([]);
      });
  };

  const deleteOrderPenunjang = (id) => {
    axios
      .delete(`${apiku}/BillOrderPenunjang/Order/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Hapus!");
          getListOrderPenunjangValid(noreg);
        } else {
          setOrderDetail([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Hapus!");
        console.log(err);
        setOrderDetail([]);
      });
  };

  return (
    <PenunjangContext.Provider
      value={{
        insertOrderPenunjang,
        getListOrderPenunjang,
        listorderpenunjang,
        getBarang,
        barang,
        orderpenunjang,
        setOrderPenunjang,
        getListOrderRuang,
        orderDetail,
        setOrderDetail,
        deleteOrderPenunjang,
        setListOrderPenunjang,
        tabelorder,
        setTabelOrder,
        getOrderPenunjang,
        tindakanAmbil,
        setTindakanAmbil,
        getListOrderPenunjangValid,
        listorderpenunjangorder,
        listorderpenunjangvalid,
        formOrder,
        setFormOrder,
        formSelectOrder,
        setFormSelectOrder,
        loadingsimpan,
        tglOrder,
        settglOrder,
        insertOrderPenunjangRI,
        load,
        setload,
      }}
    >
      {props.children}
    </PenunjangContext.Provider>
  );
};

export default PenunjangContextProvider;
