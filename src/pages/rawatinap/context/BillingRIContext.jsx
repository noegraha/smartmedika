import React, { createContext, useState } from "react";
import axios from "axios";
import { message } from "antd";

export const BillingRIContext = createContext();

const BillingRIContextProvider = (props) => {
  const apiku = sessionStorage.getItem("api");
  const [billing, setBilling] = useState([]);
  const [pel, setPelayanan] = useState(null);
  const [pemeriksa, setPemeriksa] = useState(null);
  const [jumlah, setJumlah] = useState(1);
  const token = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailBilling = (id) => {
    axios
      .get(`${apiku}/BillPemeriksaan/Read/${id}/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBilling(res.data.result);
          setPemeriksa(null);
          setPelayanan(null);
          setJumlah(1);
        } else {
          // message.warning("Silahkan pilih pasien terlebih dahulu");
          setBilling([]);
          setPemeriksa(null);
          setPelayanan(null);
          setJumlah(1);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Mengambil!");
        setBilling([]);
      });
  };

  const insertBiiling = (databilling) => {
    axios
      .post(`${apiku}/BillPemeriksaan/`, databilling, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          const elementsIndex = billing.findIndex(
            (element) =>
              element.billPelayananId === res.data.result.billPelayananId
          );

          if (elementsIndex === -1) {
            setBilling([
              ...billing,
              {
                billPelayananId: res.data.result.billPelayananId,
                registrasiId: res.data.result.registrasiId,
                pelayananId: res.data.result.pelayananId,
                ruangDesk: res.data.result.ruangDesk,
                tanggal: res.data.result.tanggal,
                pelayananDesk: res.data.result.pelayananDesk,
                jumlah: res.data.result.jumlah,
                biayaPelayanan: res.data.result.biayaPelayanan,
                pembayaranDesk: res.data.result.pembayaranDesk,
                pemeriksaDesk: res.data.result.pemeriksaDesk,
                validasi: res.data.result.validasi,
                userId: res.data.result.userId,
              },
            ]);
          } else {
            let newArray = [...billing];

            newArray[elementsIndex] = {
              ...newArray[elementsIndex],
              pemeriksaDesk: res.data.result.pemeriksaDesk,
              jumlah: res.data.result.jumlah,
              pembayaranDesk: res.data.result.pembayaranDesk,
              userId: res.data.result.userId,
            };
            setBilling(newArray);
          }
          message.success("Berhasil Disimpan!");
          console.log(res.data.result);
        } else {
          console.log(res.data.result);
          message.error("Gagal Disimpan!");
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
      });
  };

  const deleteBilling = (noreg, pelayanan) => {
    axios
      .delete(`${apiku}/BillPemeriksaan/${noreg}/${pelayanan}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          setBilling(billing.filter((item) => item.pelayananId !== pelayanan));
          message.success("Berhasil Dihapus!");
        } else {
          console.log(res.data.result);
          message.error("Gagal Dihapus!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <BillingRIContext.Provider
      value={{
        billing,
        detailBilling,
        insertBiiling,
        deleteBilling,
        pel,
        setPelayanan,
        pemeriksa,
        setPemeriksa,
        jumlah,
        setJumlah,
      }}
    >
      {props.children}
    </BillingRIContext.Provider>
  );
};

export default BillingRIContextProvider;
