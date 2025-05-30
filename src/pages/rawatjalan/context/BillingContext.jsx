import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import { message } from "antd";
import { PasienContext } from "./PasienContext";

export const BillingContext = createContext();

const BillingContextProvider = (props) => {
  const { detailPasien } = useContext(PasienContext);
  const [billing, setBilling] = useState([]);
  const [billingsinkron, setBillingSinkron] = useState([]);
  const [pel, setPelayanan] = useState(null);
  const [pemeriksa, setPemeriksa] = useState(null);
  const [ruangbill, setRuangBill] = useState(null);
  const [jumlah, setJumlah] = useState(1);
  const [loadingBilling, setLoadingBilling] = useState(false);
  const [tipePmr, settipePmr] = useState("BIASA");

  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const noreg = sessionStorage.getItem("noreg");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const detailBilling = (id) => {
    setLoadingBilling(true);
    axios
      .get(`${apiku}/BillPemeriksaan/Read/${id}/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // console.log(res.data.result);
          setBilling(res.data.result);
          setPemeriksa(null);
          setPelayanan(null);
          setJumlah(1);
          setLoadingBilling(false);
        } else {
          message.warning(res.data.message);
          setBilling([]);
          setPemeriksa(null);
          setPelayanan(null);
          setLoadingBilling(false);
          setJumlah(1);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Mengambil!");
        setLoadingBilling(false);
        setBilling([]);
      });
  };

  const insertBiiling = (databilling) => {
    setLoadingBilling(true);
    axios
      .post(`${apiku}/BillPemeriksaan/`, databilling, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          detailBilling(noreg);
          message.success("Berhasil Disimpan!");
          setLoadingBilling(false);
          databilling.pelayananId === "RJM001" ||
          databilling.pelayananId === "RJM002" ||
          databilling.pelayananId === "RJP001"
            ? detailPasien(res.data.result.registrasiId)
            : console.log(res.data.result);
        } else {
          console.log(res.data);
          message.warning(res.data.message);
          setLoadingBilling(false);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Disimpan!");
        setLoadingBilling(false);
      });
  };

  const deleteBilling = (noreg, pelayanan, dokter) => {
    axios
      .delete(
        `${apiku}/BillPemeriksaan/${noreg}/${pelayanan}/${dokter}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          // setBilling(billing.filter((item) => item.pelayananId !== pelayanan));
          detailBilling(noreg);
          message.success("Berhasil Dihapus!");
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteBillingDetail = (noreg, pelayanan, dokter, ruang, user, ip) => {
    axios
      .delete(
        `${apiku}/BillPemeriksaan/Detail/${noreg}/${pelayanan}/${dokter}/${ruang}/${user}/${ip}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          detailBilling(noreg);
          message.success("Berhasil Dihapus!");
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(noreg, pelayanan, dokter, ruang, user, ip);
      });
  };

  const deleteBillingById = (noreg, id, user, ip) => {
    axios
      .delete(
        `${apiku}/BillPemeriksaan/DeleteById/${noreg}/${id}/${user}/${ip}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          detailBilling(noreg);
          message.success("Berhasil Dihapus!");
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(noreg, id, user, ip);
      });
  };

  const syncBillKHS = (noreg) => {
    axios
      .get(
        `${apiku}/BillPemeriksaan/SyncBillPemeriksaan/${noreg}/Transfer`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Sync Billing!");
          setLoadingBilling(true);
          detailBilling(noreg);
        } else {
          console.log(res.data);
          message.warning("Sync Bill KHS : Terjadi Kesalahan");
          detailBilling(noreg);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync Bill KHS!");
        console.log(err);
        detailBilling(noreg);
      });
  };
  const syncBayarKHS = (ruangID) => {
    axios
      .get(
        `${apiku}/BillPemeriksaan/SyncBillPemeriksaan/${ruangID}/Bayar`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Sync Billing!");
        } else {
          message.warning("Sync Bayar KHS : terjadi kesalahan");
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync Bayar KHS!");
        console.log(err);
      });
  };

  const cekBilling = () => {
    axios
      .get(`${apiku}/BillPemeriksaan/CekBilling`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // message.warning("Terdapat billing belum sinkron!");
          setBillingSinkron(res.data.result);
        } else {
          message.success(res.data.message);
          setBillingSinkron([]);
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Ambil!");
        setBillingSinkron([]);
        console.log(err);
      });
  };

  const cekBillingByTgl = (tanggal) => {
    setLoadingBilling(true);
    axios
      .get(`${apiku}/BillPemeriksaan/CekBillingByTgl/${tanggal}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // message.warning("Terdapat billing belum sinkron!");
          setBillingSinkron(res.data.result);
          setLoadingBilling(false);
        } else {
          message.success(res.data.message);
          setBillingSinkron([]);
          console.log(res.data);
          setLoadingBilling(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Ambil!");
        setBillingSinkron([]);
        console.log(err);
        setLoadingBilling(false);
      });
  };

  const syncBilling = (noreg, tanggal) => {
    axios
      .get(`${apiku}/BillPemeriksaan/SyncBilling/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.message);
          cekBillingByTgl(tanggal);
        } else {
          message.warning(res.data.message);
          console.log(res.data);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync!");
        console.log(err);
      });
  };

  const syncBillingByIdPoli = (noreg, id, ruang) => {
    setLoadingBilling(true);
    axios
      .get(
        `${apiku}/BillPemeriksaan/SyncBillingById/${noreg}/${id}/${ruang}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.message);
          detailBilling(noreg);
          setLoadingBilling(false);
        } else {
          message.warning(res.data.message);
          console.log(res.data);
          setLoadingBilling(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync!");
        console.log(err);
        setLoadingBilling(false);
      });
  };

  const syncBillingById = (noreg, id, ruang, tanggal) => {
    setLoadingBilling(true);
    axios
      .get(
        `${apiku}/BillPemeriksaan/SyncBillingById/${noreg}/${id}/${ruang}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success(res.data.message);
          cekBillingByTgl(tanggal);
          setLoadingBilling(false);
        } else {
          message.warning(res.data.message);
          console.log(res.data);
          setLoadingBilling(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Sync!");
        console.log(err);
        setLoadingBilling(false);
      });
  };

  return (
    <BillingContext.Provider
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
        syncBillKHS,
        syncBayarKHS,
        ruangbill,
        setRuangBill,
        deleteBillingDetail,
        cekBilling,
        billingsinkron,
        syncBilling,
        loadingBilling,
        setLoadingBilling,
        syncBillingById,
        cekBillingByTgl,
        deleteBillingById,
        setBilling,
        syncBillingByIdPoli,
        tipePmr,
        settipePmr,
      }}
    >
      {props.children}
    </BillingContext.Provider>
  );
};

export default BillingContextProvider;
