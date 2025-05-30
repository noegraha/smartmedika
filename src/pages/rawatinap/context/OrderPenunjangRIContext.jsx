import React, { createContext, useState } from "react";
import axios from "axios";
import { Modal, message } from "antd";
import dayjs from "dayjs";

export const OrderPenunjangRIContext = createContext();

const OrderPenunjangRIContextProvider = (props) => {
  const [listorderpenunjang, setListOrderPenunjang] = useState([]);
  const [formSelectOrder, setFormSelectOrder] = useState(false);
  const [orderpenunjang, setOrderPenunjang] = useState([]);
  const [barang, setBarang] = useState([]);
  const [orderDetail, setOrderDetail] = useState([]);
  const [tabelorder, setTabelOrder] = useState([]);
  const [OrderPenunjangUnitTujuan, setOrderPenunjangUnitTujuan] = useState([]);
  const [OrderPenunjangDiagnosa, setOrderPenunjangDiagnosa] = useState([]);
  const [formOrder, setFormOrder] = useState(false);

  //----------------order makan----------------//
  const [listmstDiet, setlistmstDiet] = useState([]);
  const [listmstjnsMakan, setlistmstjnsMakan] = useState([]);
  const [keteranganOrder, setketeranganOrder] = useState("");
  const [dietOrder, setdietOrder] = useState("");
  const [jnsmakanOrder, setjnsmakanOrder] = useState("");
  const [tglmakanOrder, settglmakanOrder] = useState(dayjs());
  const [wktmakanOrder, setwktmakanOrder] = useState("");
  const [noMakan, setnoMakan] = useState(0);
  const [listOrderMakan, setlistOrderMakan] = useState([]);

  const apiku = sessionStorage.getItem("api");

  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getBarang = (ruang) => {
    axios
      .get(`${apiku}/MstBarang/LookupGetViewBarang/ /${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBarang(res.data.result);
          console.log(res.data.result);
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
    if (dataorderpenunjang.billOrderDetail.length !== 0) {
      axios
        .post(`${apiku}/BillOrderPenunjang`, dataorderpenunjang, {
          headers: options.headers,
        })
        .then((res) => {
          if (res.data.statusCode === 200) {
            setOrderPenunjang(res.data.result);
            console.log(res.data.result);
            Modal.success({
              title: "Data Berhasil Disimpan!!",
              // content: res.data.message,
            });
            getListOrderPenunjang(dataorderpenunjang.registrasiId);
            setFormOrder(false);
            setFormSelectOrder(false);
          } else {
            message.error("Gagal Disimpan!");
            console.log(res.data);
          }
        })
        .catch((err) => {
          console.log(err);
          message.error("Gagal Disimpan!");
        });
    } else {
      message.error("Klik Ambil");
    }
  };
  const getListOrderPenunjang = (id) => {
    axios
      .get(`${apiku}/BillOrderPenunjang/Lookup/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListOrderPenunjang(res.data.result);
          console.log(res.data.result);
        } else {
          // message.error('Gagal Mengambil Data Order!')
          console.log(res.data.result);
          setListOrderPenunjang([]);
        }
      })
      .catch((err) => {
        // message.error("Gagal Mengambil Data Order!");
        console.log(err);
        setListOrderPenunjang([]);
      });
  };

  const getOrderPenunjang = (id) => {
    axios
      .get(`${apiku}/BillOrderPenunjang/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setOrderPenunjang(res.data.result);
          console.log("hasil order penunjang", res.data.result);
          setOrderPenunjangUnitTujuan(res.data.result[0].unitTujuan);
          setOrderPenunjangDiagnosa(res.data.result[0].diagnosa);
        } else {
          // message.error('Gagal Mengambil Data Order!')
          console.log(res.data.result);
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
          console.log(res.data.result);
        } else {
          // message.error('Gagal Mengambil Data Order!')
          console.log(res.data.result);
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
          // setOrderDetail(res.data.result.BillOrderDetail);
          console.log(res.data.result);
          Modal.success({
            title: "Data Berhasil Dihapus!!",
            // content: res.data.message,
          });
        } else {
          // message.error('Gagal Mengambil Data Order!')
          console.log(res.data.result);
          setOrderDetail([]);
        }
      })
      .catch((err) => {
        message.error("Gagal Hapus!");
        console.log(err);
        setOrderDetail([]);
      });
  };

  //----------------order makan--------------//
  const getMstDiet = (sKey) => {
    axios
      .get(`${apiku}/MstDietRi/Lookup/${sKey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistmstDiet(res.data.result);
        } else {
          message.warning("Gagal Mengambil Data Diet!");
          setlistmstDiet([]);
        }
      })
      .catch((err) => {
        message.error("Error Mengambil Data Diet!");
        setlistmstDiet([]);
      });
  };

  const getMstJnsMakan = (sKey) => {
    axios
      .get(`${apiku}/MstJenisMakanRi/Lookup/${sKey}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistmstjnsMakan(res.data.result);
        } else {
          message.warning("Gagal Mengambil Data Jenis Makanan!");
          setlistmstjnsMakan([]);
        }
      })
      .catch((err) => {
        message.error("Error Mengambil Data Jenis Makanan!");
        setlistmstjnsMakan([]);
      });
  };

  const insertOrderMakan = (dataorder) => {
    axios
      .post(`${apiku}/TrxMakanPasien`, dataorder, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setnoMakan(0);
          getOrderMakan(dataorder.noreg);
          Modal.success({
            title: "Data Berhasil Disimpan!!",
            // content: res.data.message,
          });
          setFormOrder(false);
        } else {
          Modal.warning({
            title: "Gagal Menyimpan Data!",
            content: JSON.stringify(res.data),
          });
        }
      })
      .catch((err) => {
        Modal.error({
          title: "ERROR, BAD REQUST!",
          content: JSON.stringify(err.data),
        });
      });
  };

  const getOrderMakan = (noreg) => {
    axios
      .get(`${apiku}/TrxMakanPasien/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistOrderMakan(res.data.result);
        } else {
          setlistOrderMakan([]);
        }
      })
      .catch((err) => {
        message.error("Terjadi Kesalahan Koneksi!");
        setlistOrderMakan([]);
      });
  };

  return (
    <OrderPenunjangRIContext.Provider
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
        formOrder,
        setFormOrder,
        OrderPenunjangUnitTujuan,
        OrderPenunjangDiagnosa,
        formSelectOrder,
        setFormSelectOrder,

        listmstDiet,
        setlistmstDiet,
        listmstjnsMakan,
        setlistmstjnsMakan,
        getMstDiet,
        getMstJnsMakan,
        keteranganOrder,
        setketeranganOrder,
        dietOrder,
        setdietOrder,
        jnsmakanOrder,
        setjnsmakanOrder,
        tglmakanOrder,
        settglmakanOrder,
        wktmakanOrder,
        setwktmakanOrder,
        noMakan,
        setnoMakan,
        insertOrderMakan,
        getOrderMakan,
        listOrderMakan,
        setlistOrderMakan,
        formOrder,
        setFormOrder,
      }}
    >
      {props.children}
    </OrderPenunjangRIContext.Provider>
  );
};

export default OrderPenunjangRIContextProvider;
