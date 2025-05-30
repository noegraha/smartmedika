/* eslint-disable no-labels */
import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Popconfirm,
  message,
  Card,
  Tabs,
  Space,
  DatePicker,
  Empty,
  Modal,
  Table,
  Radio,
  Divider,
  Alert,
  Tooltip,
  Tag,
} from "antd";
import { PasienRIContext } from "./PasienRIContext";
import dayjs from "dayjs";
import { LoginContext } from "../../rawatjalan/context";
const { confirm } = Modal;
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayout1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

export const PantuanInfeksiContext = createContext();

const PantuanInfeksiContextProvider = (props) => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser } = useContext(LoginContext);
  const { curpasRI } = useContext(PasienRIContext);
  const [pantuaninfeksi, setPantuanInfeksi] = useState([]);
  const [listTindakanPPi, setlistTindakanPPi] = useState([]);
  const [noUrutTPPI, setnoUrutTPPI] = useState(0);
  const [tglPencatatanTPPI, settglPencatatanTPPI] = useState(dayjs());
  const [tglPelepasanTPPI, settglPelepasanTPPI] = useState(dayjs());
  const [tindakanIdTPPI, settindakanIdTPPI] = useState("");
  const [jenisTindakanTPPI, setjenisTindakanTPPI] = useState("Penggantian");

  const [noUrut, setnoUrut] = useState(0);
  // const [tanggal, settanggal]=useState('');
  const [tglPelepasan, settglPelepasan] = useState(dayjs());
  // const [tindakanId, settindakanId]=useState('');
  const [pasang, setpasang] = useState("");
  // const [jam, setjam]=useState('');
  // const [namaTindakan, setnamaTindakan]=useState('');
  const [jenisTindakan, setjenisTindakan] = useState("Penggantian");
  // const [pelaksanaId, setpelaksanaId]=useState('');
  const [infeksi, setinfeksi] = useState("");
  const [keterangan, setketerangan] = useState("");
  // const [tanggalPeringatan, settanggalPeringatan]=useState('');
  // const [status, setstatus]=useState('');
  // const [userId, setuserId]=useState('');
  // const [hapus, sethapus]=useState('');
  // const [verified, setverified]=useState('');
  // const [statusKirim, setstatusKirim]=useState('');
  // const [noPMR, setnoPMR]=useState('');
  // const [nomor, setnomor]=useState(0);
  const [indikatorId, setindikatorId] = useState("");

  const [loadingPPI, setloadingPPI] = useState(false);
  const [alertPPIPerawat, setalertPPIPerawat] = useState(false);
  const [dataalert, setdataalert] = useState([]);
  const [alertpilih, setalertpilih] = useState([]);

  const [mstTindakanPPI, setmstTindakanPPI] = useState([]);
  const [mstIndikatorInfeksi, setmstIndikatorInfeksi] = useState([]);

  const kodeDokter = sessionStorage.getItem("pegawai");
  const token = sessionStorage.getItem("userData");
  const apiku = sessionStorage.getItem("api");

  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const getTindakaknPPI = (noreg) => {
    axios
      .get(`${apiku}/EmrPPITindakanKeperawatan/Read/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistTindakanPPi(res.data.result);
          if (kodeDokter[0] === "P") {
            res.data.result.map((a) => {
              if (a.TglPelepasan === null) {
                if (a.Status === false) {
                  return confirm({
                    content: (
                      <Alert
                        message={
                          "Pasien ini telah dilakukan pemasangan " +
                          a.TindakanDeskripsi +
                          ", pada tanggal " +
                          dayjs(a.TglPemasangan).format("DD-MM-YYYY") +
                          " Lakukan Pantauan tindakan keperawatan"
                        }
                        type="warning"
                        //  showIcon
                      />
                    ),
                    okText: "Pantau",
                    okType: "primary",
                    cancelButtonProps: {
                      hidden: true,
                    },
                    cancelText: "No",
                    onOk() {
                      async function yourFunction() {
                        const filteredData = res.data.result.filter(
                          (item) => item.No === a.No
                        );
                        await setdataalert(filteredData[0]);
                        settglPelepasan(dayjs());
                        setjenisTindakan("Penggantian");
                        setalertPPIPerawat(true);
                      }
                      yourFunction();
                    },
                    onCancel() {
                      console.log("Cancel");
                    },
                  });
                }
              }
            });
          }
        } else {
          console.log("data tindakan ppi kosong");
          setlistTindakanPPi([]);
        }
      })
      .catch((err) => {
        message.error(err);
        setlistTindakanPPi([]);
      });
  };

  const getsimpanTindakaknPPI = (noreg) => {
    axios
      .get(`${apiku}/EmrPPITindakanKeperawatan/Read/${noreg}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setlistTindakanPPi(res.data.result);
        } else {
          console.log("data tindakan ppi kosong");
          setlistTindakanPPi([]);
        }
      })
      .catch((err) => {
        message.error(err);
        setlistTindakanPPi([]);
      });
  };

  const PantuanInfeksiRi = (tgl) => {
    axios
      .get(`${apiku}/RiPantauanInfeksi/Tanggal/${tgl}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPantuanInfeksi(res.data.result);
          console.log(res.data.result);
        } else {
          setPantuanInfeksi([]);
        }
      }, [])
      .catch((err) => {
        console.log("Data Tidak Ada");
        setPantuanInfeksi([]);
      });
  };

  const getMstTindakanPPI = (sKey) => {
    axios
      .get(`${apiku}/MstPantauanInfeksi/Lookup/${sKey}/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setmstTindakanPPI(res.data.result);
          console.log(res.data.result);
        } else {
          setmstTindakanPPI([]);
        }
      })
      .catch((err) => {
        setmstTindakanPPI([]);
        console.log(err);
      });
  };

  const getMstIndikatorInfeksi = (sKey) => {
    axios
      .get(`${apiku}/MstIndikatorInfeksi/Lookup/${sKey}/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setmstIndikatorInfeksi(res.data.result);
          console.log(res.data.result);
        } else {
          setmstTindakanPPI([]);
        }
      })
      .catch((err) => {
        setmstTindakanPPI([]);
        console.log(err);
      });
  };

  const inserValidasiPPi = (datavalidasi) => {
    setloadingPPI(true);
    axios
      .post(`${apiku}/EmrSuratKeterangan`, datavalidasi, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          // getSuratKeteranganDetail();
          Modal.success({
            title: "Berhasil Simpan Validasi PPI!!",
            // content: res.data.message,
          });
          // message.success("Berhasil Simpan Validasi PPI!");
          setloadingPPI(false);
        } else {
          Modal.warning({
            // icon: <Icon component={BPJSICO} />,
            title: "Gagal Simpan Validasi PPI!",
            content: res.data.message,
          });
          setloadingPPI(false);
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Error WS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        setloadingPPI(false);
      });
  };

  const insertTindakanPPI = (dataPPI) => {
    //1. PPI
    axios
      .post(`${apiku}/EmrPPITindakanKeperawatan`, dataPPI, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getsimpanTindakaknPPI(dataPPI.registrasiId);
          Modal.success({
            title: "Berhasil Simpan Tindakan!",
            // content: res.data.message,
          });
          setloadingPPI(false);
        } else {
          Modal.warning({
            // icon: <Icon component={BPJSICO} />,
            title: "Gagal Simpan Tindakan!",
            content: res.data.message,
          });
          setloadingPPI(false);
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Error WS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        setloadingPPI(false);
      });
  };

  const insertPPI = (dataPPI, dataalert) => {
    //1. PPI
    axios
      .post(`${apiku}/EmrPPIPantauanInfeksi/RI`, dataPPI, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          axios
            .post(`${apiku}/EmrPPITindakanKeperawatan`, dataalert, options)
            .then((res) => {
              if (res.data.statusCode === 200) {
                getsimpanTindakaknPPI(dataPPI.registrasiId);
                setloadingPPI(false);
                setloadingPPI(false);
                setketerangan("");
                setindikatorId([]);
                setalertPPIPerawat(false);
                Modal.success({
                  title: "Data Berhasil Disimpan!!",
                  // content: res.data.message,
                });
              } else {
                Modal.warning({
                  // icon: <Icon component={BPJSICO} />,
                  title: "Gagal Simpan Tindakan!",
                  content: res.data.message,
                });
                setloadingPPI(false);
              }
            })
            .catch((err) => {
              Modal.error({
                // icon: <Icon component={BPJSICO} />,
                title: "Error WS",
                content: "Terdapat Kesalahan Koneksi!",
              });
              setloadingPPI(false);
            });
        } else {
          Modal.warning({
            // icon: <Icon component={BPJSICO} />,
            title: "Gagal Simpan  Pantauan Infeksi!",
            content: res.data.message,
          });
          setloadingPPI(false);
        }
      })
      .catch((err) => {
        Modal.error({
          // icon: <Icon component={BPJSICO} />,
          title: "Error WS",
          content: "Terdapat Kesalahan Koneksi!",
        });
        setloadingPPI(false);
      });
  };

  const deletetindakan = (data, reg) => {
    axios
      .delete(`${apiku}/EmrPPITindakanKeperawatan/${data}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          getsimpanTindakaknPPI(reg);
          Modal.success({
            title: "Data Berhasil Dihapus!!",
            // content: res.data.message,
          });
        } else {
          console.log(res.data.result);
          message.warning("Data Gagal Di hapus!");
        }
      })
      .catch((err) => {
        message.error("Terjadi Kegagalan Koneksi!");
      });
  };

  return (
    <PantuanInfeksiContext.Provider
      value={{
        getTindakaknPPI,
        PantuanInfeksiRi,
        getMstTindakanPPI,
        getMstIndikatorInfeksi,
        inserValidasiPPi,
        insertTindakanPPI,
        deletetindakan,
        pantuaninfeksi,
        setPantuanInfeksi,
        listTindakanPPi,
        setlistTindakanPPi,
        noUrutTPPI,
        setnoUrutTPPI,
        tglPencatatanTPPI,
        settglPencatatanTPPI,
        tglPelepasanTPPI,
        settglPelepasanTPPI,
        tindakanIdTPPI,
        settindakanIdTPPI,
        jenisTindakanTPPI,
        setjenisTindakanTPPI,
        loadingPPI,
        setloadingPPI,
        alertPPIPerawat,
        setalertPPIPerawat,
        mstTindakanPPI,
        setmstTindakanPPI,
        mstIndikatorInfeksi,
        setmstIndikatorInfeksi,

        noUrut,
        setnoUrut,
        tglPelepasan,
        settglPelepasan,
        pasang,
        setpasang,
        jenisTindakan,
        setjenisTindakan,
        infeksi,
        setinfeksi,
        keterangan,
        setketerangan,
        indikatorId,
        setindikatorId,
        insertPPI,
        dataalert,
        setdataalert,
        alertpilih,
        setalertpilih,
      }}
    >
      {props.children}
    </PantuanInfeksiContext.Provider>
  );
};

export default PantuanInfeksiContextProvider;
