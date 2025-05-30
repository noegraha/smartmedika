import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const BookingOpContext = createContext();

const BookingOpContextProvider = (props) => {
  const [bookingop, setBookingOp] = useState([]);
  const [historybookingop, setHistoryBookingOp] = useState([]);
  const [bookingopdetail, setBookingOpDetail] = useState([]);
  const [tindakanoperasi, setTabelTindakanOperasi] = useState([]);

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const getHistoryBookingOp = (ruang) => {
    axios
      .get(`${apiku}/EmrBookingOperasi/GetDetailOP/${ruang}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setHistoryBookingOp(res.data.result);
        } else {
          setHistoryBookingOp([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setHistoryBookingOp([]);
        message.error("Gagal Mengambil!");
        console.log(err);
      });
  };
  const getBookingOp = (noreg) => {
    axios
      .get(`${apiku}/EmrBookingOperasi/LookUp/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBookingOp(res.data.result);
        } else {
          setBookingOp([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setBookingOp([]);
        message.error("Gagal Mengambil!");
        console.log(err);
      });
  };
  const getBookingOpDetail = (noreg, nobook) => {
    axios
      .get(`${apiku}/EmrBookingOperasi/Read/${noreg}/${nobook}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTabelTindakanOperasi(res.data.result);
          console.log(res.data.result);
        } else {
          setTabelTindakanOperasi([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setTabelTindakanOperasi([]);
        message.error("Gagal Mengambil!");
        console.log(err);
      });
  };
  const insertBookingOp = (dataOp) => {
    axios
      .post(`${apiku}/EmrBookingOperasi`, dataOp, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
          getBookingOp(res.data.result.registrasiId);
          console.log(res.data.result);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal Disimpan!");
        console.log(err);
      });
  };
  const deleteBookingOp = (noreg, nobook) => {
    axios
      .delete(
        `${apiku}/EmrBookingOperasi/DeleteBokingOP/${noreg}/${nobook}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Dihapus!");
          getBookingOp(noreg);
          console.log(res.data.result);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        message.error("Gagal Dihapus!");
        console.log(err);
      });
  };

  return (
    <BookingOpContext.Provider
      value={{
        bookingop,
        bookingopdetail,
        tindakanoperasi,
        historybookingop,
        getHistoryBookingOp,
        setTabelTindakanOperasi,
        setBookingOpDetail,
        getBookingOp,
        getBookingOpDetail,
        insertBookingOp,
        deleteBookingOp,
      }}
    >
      {props.children}
    </BookingOpContext.Provider>
  );
};

export default BookingOpContextProvider;
