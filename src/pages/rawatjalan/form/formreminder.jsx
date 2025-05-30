import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Radio,
  Button,
  Checkbox,
  Card,
  Modal,
  Table,
  Popconfirm,
  message,
  Spin,
  Space,
  Tooltip,
  Tag,
  Image,
  // Popover,
} from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { PasienContext } from "../context/PasienContext";
import { ReminderContext } from "../context/ReminderContext";
import { LoginContext } from "../context";
import { PelayananContext } from "../context/Pelayanancontext";
import { VClaimContext } from "../context/VClaimContext";
import { CatatanmedisContext } from "../context/CatatanmedisContext";
import { DiagnosaContext } from "../context/Diagnosacontext";
import { BookingOpContext } from "../context/BookingOpContext";
import { SisruteContext } from "../context/SisruteContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import FormSisruteRJ from "./FormSisruteRJ";
import ButtonTransferpasien from "../komponen/Buttontransferpasien";
import HistoryPengajuanOP from "../komponen/Operasi/HistoryPengajuanOP";
import Draggable from "react-draggable";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import FormRujukBalik from "./FormRujukBalik";
import ButtonListKontrolBPJS from "../komponen/ButtonListKontrolBPJS";
import FormSPPR from "./FormSPPR";
import { SuratKeteranganRJContext } from "../context/SuratKeteranganRJContext";
import ButtonCetakRencanaKontrolRJ from "../komponen/ButtonCetak/ButtonCetakRencanaKontrolRJ";
// import ButtonSMSReminder from "../komponen/ButtonSMSReminder";
import ButtonCekSuratKontrol from "../Vclaim/ButtonCekSuratKontrol";

dayjs.extend(isBetween);

const dateFormat = "YYYY-MM-DD";
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formItemLayout2 = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const { Option } = Select;
const { Column } = Table;
const { TextArea } = Input;
const { confirm } = Modal;
// const { RangePicker } = DatePicker;

const draggleRef = React.createRef();

const Formreminder = () => {
  const { curpas, getPasienDetail, setLoadingDetail } =
    useContext(PasienContext);
  const { dokter, dokterall, pelayananbedah, loadpelayananbedah } =
    useContext(PelayananContext);
  const { namauser } = useContext(LoginContext);
  const { insertRujukan, deleteRujukan } = useContext(ReminderContext);
  const {
    ambilPoliBPJS,
    ambilDokterBPJS,
    insertNoKontrolBPJS,
    poliBPJS,
    dokterBPJS,
    // datakontrolBPJS,
    // getSuratKontrolBPJSbyNoSurat,
    loadingpoli,
    setLoadingPoli,
    loadingdokter,
    setLoadingDokter,
    mappingDokterBPJS,
    getSuratKontrolBPJSbyKartu,
    loadingBPJS,
    setLoadingBPJS,
    updateNoKontrolBPJS,
    deleteNoKontrolBPJS,
    tanggalkontrolBPJS,
    // tanggalkontrolBPJStampil,
    setTanggalKontrolBPJS,
    pilihdokterBPJS,
    setPilihDokterBPJS,
    pilihpoliBPJS,
    setPilihPoliBPJS,
    listrencanakontrol,
    // getRencanaKontrolBPJSbyKartuTanggal,
    // tanggalawal,
    setTanggalAwal,
    // tanggalakhir,
    setTanggalAkhir,
    filter,
    setFilter,
    getListDiagnosaProgram,
    getdataSEP,
    dataSEP,
    getExpiredRujukan,
    nokontrolBPJS,
    getDataPeserta,
    nosep,
    setNoSEP,
    loading,
    getRencanaKontrolBPJSbyKartu,
    potensi,
    detailRujukan,
    kontrolform,
    setKontrolForm,
    norujukan,
    tglrujukan,
    setTanggalRujukan,
    cttnrujukan,
    setCatatanRujukan,
    sebabRujuk,
    rencananTindakan,
    setRencanatindakan,
    dokterkontrol,
    setDokterKontrol,
    buttonorder,
    setButtonOrder,
    getSuratKontrolLast,
    dataKontrolLast,
  } = useContext(VClaimContext);
  const { detailCatatanmedis } = useContext(CatatanmedisContext);
  const { detailDiagnosa } = useContext(DiagnosaContext);
  const {
    insertBookingOp,
    bookingop,
    getBookingOp,
    deleteBookingOp,
    getBookingOpDetail,
    // bookingopdetail,
    // setBookingOpDetail,
    tindakanoperasi,
    setTabelTindakanOperasi,
  } = useContext(BookingOpContext);
  const {
    getSisKriteriaKhusus,
    getSisSDM,
    getSisPelayanan,
    getSisKelasRawat,
    getSisAlat,
    getSisCaraKeluar,
    getSisRefPelayanan,
    getSisAlasan,
    getSisSarana,
  } = useContext(SisruteContext);
  const { getSurat } = useContext(SuratKeteranganRJContext);
  useEffect(() => {
    setNoSEP(curpas.noJaminan);
  }, [setNoSEP, curpas.noJaminan]);

  const noreg = sessionStorage.getItem("noreg");
  const norm = sessionStorage.getItem("norm");

  const [form] = Form.useForm();
  const [user, setUser] = useState(namauser);
  const [formulir, setForm] = useState(false);
  // const [buttonorder, setButtonOrder] = useState("KONTROL");
  const [formjadwaloperasi, setFormJadwalOperasi] = useState(false);
  // const [operasi, setOperasi] = useState(false);
  const [tindakan, setTindakan] = useState("");
  const [namatindakan, setNamaTindakan] = useState("");
  const [modalRencanaKontrol, setModalRencanaKontrol] = useState(false);
  const [dokterop, setDokterOp] = useState(null);
  const [tanggalop, setTanggalOp] = useState(dayjs());
  const [disabled, setDisabled] = useState(true);
  const [kontrol, setKontrol] = useState(false);
  var date = new Date();
  const [bulan, setBulan] = useState(("0" + (date.getMonth() + 1)).slice(-2));
  const [tahun, setTahun] = useState(date.getFullYear());
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };
  const inputRef = React.useRef(null);

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const onFormOperasi = () => {
    setFormJadwalOperasi(true);
    loadpelayananbedah();
    getBookingOp(noreg);
    setTabelTindakanOperasi([]);
  };
  const onFormKontrol = (e) => {
    setKontrolForm(e.target.value);
    if (e.target.value === 2) {
      // getSuratKontrolBPJSbyKartu(curpas.noPolish);
      getdataSEP(curpas.noJaminan);
      getExpiredRujukan(curpas.noJaminan);
    }
  };
  const onForm = (e) => {
    setKontrolForm(3);
    setForm(e);
    if (e === "extern") {
      getSisKriteriaKhusus();
      getSisSDM();
      getSisPelayanan();
      getSisKelasRawat();
      getSisAlat();
      getSisCaraKeluar();
      getSisRefPelayanan();
      getSisAlasan();
      getSisSarana();
      getPasienDetail(norm);
      setLoadingDetail(true);
    } else if (e === "balik") {
      getListDiagnosaProgram();
    } else if (e === "pulang") {
      detailDiagnosa(noreg);
      detailRujukan(noreg, curpas.noJaminan);
      setKontrol(true);
      setTanggalAwal(dayjs().format("YYYY-MM-DD"));
      setTanggalAkhir(dayjs().add(29, "days").format("YYYY-MM-DD"));
      if (curpas.pembayaranId === "0050" || curpas.pembayaranId === "0051") {
        setKontrolForm(2);
        getDataPeserta(curpas.noPolish);
        // getSuratKontrolBPJSbyKartu(curpas.noPolish);
        // getdataSEP(curpas.noJaminan);
        getExpiredRujukan(curpas.noJaminan);
      } else {
        setKontrolForm(1);
      }
    } else if (e === "dirawat") {
      detailCatatanmedis(noreg);
      detailDiagnosa(noreg);
    } else if (e === "sppr") {
      if (curpas.pembayaranId === "0050" || curpas.pembayaranId === "0051") {
        getDataPeserta(curpas.noPolish);
        getSurat(curpas.registrasiId);
      } else {
        message.warning("Bukan Pasien BPJS!");
      }
    }
  };
  const onTindakan = (e) => {
    setTindakan(e.split("-")[0]);
    setNamaTindakan(e.split("-")[1]);
    console.log(e);
  };
  const handleCancel = () => {
    setFormJadwalOperasi(false);
  };
  function handleChange(value) {
    console.log(`selected ${value}`);
    setButtonOrder(value);
  }

  const datarujukan = {
    tanggalRujukan: dayjs(tglrujukan).format("YYYY-MM-DD"),
    noJaminan: curpas.noJaminan,
    registrasiId: curpas.registrasiId,
    pasienId: curpas.pasienId,
    noPolish: curpas.noPolish,
    namaPasien: curpas.namaPasien,
    tipeRujukan: "3",
    jenisPelayanan: "2",
    poliTujuanIdBPJS: pilihpoliBPJS,
    dokterKontrolBPJS: pilihdokterBPJS,
    rencanaTindakan: rencananTindakan,
    program: buttonorder,
    poliTujuanId: curpas.ruangId,
    dokterKontrolId: dokterkontrol === null ? curpas.dokterId : dokterkontrol,
    namaPoli: curpas.ruangDeskripsi,
    catatan: cttnrujukan,
    sebabRujuk: sebabRujuk,
    userId: namauser,
    clientHost: host,
    clientIp: ip,
  };

  const onInsertOperasi = () => {
    const elementsIndex = tindakanoperasi.findIndex(
      (element) => element.pelayananId === tindakan
    );

    if (elementsIndex === -1) {
      setTabelTindakanOperasi([
        ...tindakanoperasi,
        {
          pelayananId: tindakan,
          pelayananDesk: namatindakan,
          userId: namauser,
        },
      ]);
    } else {
      let newArray = [...tindakanoperasi];

      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
      };
      setTabelTindakanOperasi(newArray);
    }
  };
  const hapusTindakanOperasi = (e) => {
    setTabelTindakanOperasi(
      tindakanoperasi.filter((item) => item.pelayananId !== e)
    );
  };
  const onTanggal = (date, dateString) => {
    setTanggalRujukan(date);
  };
  const onTanggalBPJS = (date, dateString) => {
    setTanggalKontrolBPJS(date);
    setTanggalRujukan(date);
    ambilPoliBPJS(curpas.noJaminan, dateString);
    setPilihPoliBPJS(null);
    setPilihDokterBPJS(null);
    console.log(curpas.noJaminan, dateString, date);
    setLoadingPoli(true);
  };
  const onBatalRencanaKontrol = () => {
    confirm({
      title: "Anda yakin akan membatalkan Surat Rencana Kontrol ini?",
      icon: <ExclamationCircleOutlined />,
      content: "Data yang sudah dihapus tidak dapat dikembalikan.",
      okText: "Hapus",
      cancelText: "Kembali",
      okType: "danger",
      onOk() {
        deleteNoKontrolBPJS(norujukan, namauser, noreg);
        console.log(norujukan, namauser);
        setLoadingBPJS(true);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onBatalRujukan = () => {
    confirm({
      title: "Anda yakin akan membatalkan Surat Rencana Kontrol ini?",
      icon: <ExclamationCircleOutlined />,
      content: "Data yang sudah dihapus tidak dapat dikembalikan.",
      okText: "Hapus",
      cancelText: "Kembali",
      okType: "danger",
      onOk() {
        deleteRujukan(noreg);
        console.log(norujukan, namauser);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const onCatatan = (e) => {
    setCatatanRujukan(e.target.value);
  };
  const onPilihPoliBPJS = (e) => {
    setPilihPoliBPJS(e);
    ambilDokterBPJS(e, dayjs(tanggalkontrolBPJS).format("YYYY-MM-DD"));
    setLoadingDokter(true);
  };
  const onRencanatindakan = (e) => {
    setRencanatindakan(e.target.value);
  };
  // const onSebabRujuk = (e) => {
  //   setSebabRujuk(e.target.value);
  // };
  // const onJenisFaskes = (e) => {
  //   setJenisFaskes(e);
  // };
  const columnrencanakontrol = [
    {
      title: "No. Surat Kontrol",
      dataIndex: "noSuratKontrol",
      sorter: (a, b) => a.noSuratKontrol.localeCompare(b.noSuratKontrol),
      render(text, record) {
        return {
          props: {
            style: {
              background: "antiquewhite",
              cursor: "default",
            },
          },
          children: text,
        };
      },
    },
    {
      title: "Nama",
      dataIndex: "nama",
    },
    {
      title: "SEP Awal",
      dataIndex: "noSepAsalKontrol",
    },
    {
      title: "Tanggal Terbit Surat",
      dataIndex: "tglTerbitKontrol",
    },
    {
      title: "Tanggal Rencana Kontrol",
      dataIndex: "tglRencanaKontrol",
      sorter: (a, b) => a.tglRencanaKontrol.localeCompare(b.tglRencanaKontrol),
      render(text, record) {
        return {
          props: {
            style: {
              background: "palegreen",
              cursor: "default",
            },
          },
          children: text,
        };
      },
    },
    {
      title: "Poli Tujuan",
      dataIndex: "namaPoliTujuan",
    },
    {
      title: "Dokter",
      dataIndex: "namaDokter",
    },
  ];

  const onFilter = (e) => {
    getRencanaKontrolBPJSbyKartu(curpas.noPolish, bulan, tahun, filter);
    // getRencanaKontrolBPJSbyKartuTanggal(
    //   curpas.noPolish,
    //   tanggalawal,
    //   tanggalakhir,
    //   e.target.value
    // );
    setFilter(e.target.value);
  };

  const dataKontrol = {
    noSuratKontrol: norujukan,
    noSEP: nosep,
    kodeDokter: pilihdokterBPJS,
    poliKontrol: pilihpoliBPJS,
    tglRencanaKontrol: dayjs(tanggalkontrolBPJS).format("YYYY-MM-DD"),
    user: user === "" ? namauser : user,
  };

  const simpanReminder = (e) => {
    // console.log(datarujukan);
    // console.log(dataKontrol);
    if (buttonorder === null) {
      message.warning("Harap Pilih Program tindak Lanjut!");
    } else {
      // if (kode === 201) {
      //   message.warning("Diagnosa belum terisi! Mohon diisi terlebih dahulu!");
      // } else {
      if (kontrolform === 1) {
        insertRujukan(datarujukan);
      } else {
        if (norujukan === null) {
          insertNoKontrolBPJS(dataKontrol);
          console.log(dataKontrol);
          setLoadingBPJS(true);
        } else {
          if (nokontrolBPJS === null) {
            insertNoKontrolBPJS(dataKontrol);
            console.log(dataKontrol);
            setLoadingBPJS(true);
          } else {
            confirm({
              title: "No Surat Rencana Kontrol Sudah Ada.",
              icon: <ExclamationCircleOutlined />,
              content: "Anda yakin akan mengupdate surat rencana kontrol?",
              okText: "Update",
              cancelText: "Kembali",
              onOk() {
                updateNoKontrolBPJS(dataKontrol);
                setLoadingBPJS(true);
              },
              onCancel() {
                console.log("Cancel");
              },
            });
          }
        }
      }
      // }
    }
  };
  const onTanggalOp = (date, dateString) => {
    setTanggalOp(date);
  };
  const dataop = {
    registrasiId: curpas.registrasiId,
    pasienId: curpas.pasienId,
    ruangId: curpas.ruangId,
    drOperasi: dokterop === null ? curpas.dokterId : dokterop,
    tglOperasi: dayjs(tanggalop).format("YYYY-MM-DD"),
    opDetail: tindakanoperasi,
    userId: namauser,
    clientHost: host,
    clientIp: ip,
  };

  const insertBooking = () => {
    console.log(dataop);
    insertBookingOp(dataop);
  };

  const disabledDate = (current) => {
    return current && current > dayjs(dataSEP);

    // let isAfterSEP = false;
    // let isInRestrictedRange = false;

    // if (dataSEP) {
    //   const sepDate = dayjs(dataSEP); // pastikan ini juga objek dayjs
    //   isAfterSEP = current && current > sepDate;
    // }

    // if (dataKontrolLast) {
    //   const kontrolDate = dayjs(dataKontrolLast); // konversi string ke dayjs
    //   isInRestrictedRange =
    //     current &&
    //     current.isBetween(
    //       kontrolDate.subtract(8, "day"),
    //       kontrolDate.add(8, "day"),
    //       "day",
    //       "[]"
    //     );
    // }

    // return isAfterSEP || isInRestrictedRange;
  };

  const tableLoading = {
    spinning: loading,
    tip: "Mohon tunggu sedang memuat  data.",
  };
  return (
    <div>
      <Card
        title="Tindak Lanjut"
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Form>
          <Row>
            <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
              <Form.Item
                {...formItemLayout}
                name="lanjut"
                label="Tindak Lanjut"
                style={{ marginBottom: 0 }}
              >
                <Select
                  showSearch
                  onSelect={(e) => onForm(e)}
                  style={{ width: "100%" }}
                  placeholder="Tindak Lanjut"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="dirawat">Dirawat</Option>
                  <Option value="extern" disabled={namauser !== "NUGRAHA"}>
                    Dirujuk Extern
                  </Option>
                  <Option value="pulang">Pulang</Option>
                  <Option value="mati" disabled={namauser !== "NUGRAHA"}>
                    Mati Sebelum Dirawat
                  </Option>
                  <Option value="balik" disabled={namauser !== "NUGRAHA"}>
                    Rujuk Balik
                  </Option>
                  <Option value="sppr">
                    Surat Pengantar Permintaan Rujukan
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col
              span={12}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={12}
              style={{ textAlign: "right" }}
            >
              <Space>
                {kontrolform === 2 ? (
                  <Button
                    type="primary"
                    style={{
                      // color: "#284b8c",
                      backgroundColor: "#00a859",
                      borderColor: "#00a859",
                    }}
                    onClick={() => {
                      setModalRencanaKontrol(true);
                      getRencanaKontrolBPJSbyKartu(
                        curpas.noPolish,
                        bulan,
                        tahun,
                        filter
                      );
                    }}
                  >
                    List Rencana Kontrol BPJS
                  </Button>
                ) : (
                  <></>
                )}
                <HistoryPengajuanOP />
                <ButtonListKontrolBPJS />
                {/* <ButtonSMSReminder /> */}
              </Space>
            </Col>
          </Row>
          <Form.Item
            {...formItemLayout2}
            style={{ marginBottom: 0 }}
            noStyle
            shouldUpdate={(prevValues, currentValues) =>
              prevValues.lanjut !== currentValues.lanjut
            }
          >
            {formulir === "dirawat" ? (
              <Form.Item
                label="Transfer"
                {...formItemLayout2}
                style={{ marginBottom: 0 }}
              >
                <ButtonTransferpasien />
              </Form.Item>
            ) : formulir === "pulang" ? (
              <div>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      label="Kontrol"
                      {...formItemLayout}
                      style={{ marginBottom: 0 }}
                    >
                      <Checkbox
                        defaultChecked
                        onChange={(e) => {
                          setKontrol(e.target.checked);
                          setTanggalAwal(dayjs().format("YYYY-MM-DD"));
                          setTanggalAkhir(
                            dayjs().add(29, "days").format("YYYY-MM-DD")
                          );
                          if (
                            curpas.pembayaranId === "0050" ||
                            curpas.pembayaranId === "0051"
                          ) {
                            setKontrolForm(2);
                            getSuratKontrolBPJSbyKartu(curpas.noPolish);
                            getdataSEP(curpas.noJaminan);
                            getExpiredRujukan(curpas.noJaminan);
                          } else {
                            setKontrolForm(1);
                          }
                          // if (kontrol) {
                          //   setKontrolForm(3);
                          // } else {
                          //   setKontrolForm(1);
                          // }
                        }}
                      >
                        Kontrol{" "}
                        {curpas.pembayaranId === "0050" ||
                        curpas.pembayaranId === "0051" ? (
                          <Tag color="cyan">Pasien BPJS</Tag>
                        ) : (
                          <Tag>Pasien non BPJS</Tag>
                        )}
                      </Checkbox>
                    </Form.Item>
                    {kontrol ? (
                      <Form.Item {...formItemLayout} label="Jenis">
                        <Radio.Group
                          onChange={(e) => onFormKontrol(e)}
                          value={kontrolform}
                        >
                          <Radio value={1}>Kontrol Biasa</Radio>
                          <Radio value={2}>Rencana Kontrol BPJS RJ</Radio>
                        </Radio.Group>
                      </Form.Item>
                    ) : null}
                  </Col>
                  <Col span={12} style={{ textAlign: "right" }}>
                    {kontrolform === 2 ? (
                      <Image
                        style={{ marginTop: 10 }}
                        preview={false}
                        width={150}
                        src="https://upload.wikimedia.org/wikipedia/commons/b/b4/BPJS_Kesehatan_logo.svg"
                      />
                    ) : (
                      <></>
                    )}
                  </Col>
                </Row>
              </div>
            ) : formulir === "extern" ? (
              <div>
                <Form.Item
                  label="Rujukan"
                  {...formItemLayout2}
                  style={{ marginBottom: 0 }}
                >
                  <Select>
                    <Option key="RSUP Dr. Sardjito">RSUP Dr. Sardjito</Option>
                    <Option key="RSUP Dr. Kariadi">RSUP Dr. Kariadi</Option>
                    <Option key="RSCM">RSCM</Option>
                    <Option key="RSUP Persahabatan">RSUP Persahabatan</Option>
                    <Option key="RS Dr. Soeharso Surakarta">
                      RS Dr. Soeharso Surakarta
                    </Option>
                    <Option key="RSUD Dr. Moewardi">RSUD Dr. Moewardi</Option>
                    <Option key="RS Mata Cicendo">RS Mata Cicendo</Option>
                    <Option key="RSJP Harapan Kita">RSJP Harapan Kita</Option>
                  </Select>
                </Form.Item>
                <FormSisruteRJ />
              </div>
            ) : formulir === "balik" ? (
              <FormRujukBalik />
            ) : formulir === "sppr" ? (
              <FormSPPR />
            ) : null}
          </Form.Item>
        </Form>
        {kontrol ? (
          kontrolform === 1 ? (
            <Form form={form} onFinish={simpanReminder} labelWrap>
              <Row gutter={[8, 8]}>
                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    label="Nama"
                    style={{ marginBottom: 0 }}
                  >
                    <Input placeholder="..." value={curpas.namaPasien} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    name="program"
                    label="Program"
                    style={{ marginBottom: 0 }}
                    required
                  >
                    <Select
                      defaultValue="KONTROL"
                      style={{ width: "100%" }}
                      onChange={handleChange}
                    >
                      <Option value="KONTROL">Kontrol</Option>
                      <Option value="OPERASI">Operasi</Option>
                      <Option value="HEMODIALISA">Hemodialisa</Option>
                      <Option value="RADIOTERAPI">Radioterapi</Option>
                      <Option value="KEMOTERAPI">Kemoterapi</Option>
                    </Select>
                  </Form.Item>
                  {buttonorder === "OPERASI" ? (
                    <Form.Item
                      style={{ marginBottom: 0 }}
                      {...formItemLayout}
                      label="Order"
                    >
                      <Button
                        type="primary"
                        size="small"
                        onClick={onFormOperasi}
                      >
                        Jadwal Operasi
                      </Button>
                    </Form.Item>
                  ) : null}
                  <Form.Item
                    {...formItemLayout}
                    label="Tanggal Kontrol"
                    style={{ marginBottom: 0 }}
                    required
                  >
                    <DatePicker
                      placeholder="Pilih Tanggal"
                      style={{ width: "100%" }}
                      format={dateFormat}
                      value={tglrujukan}
                      onChange={onTanggal}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Dokter"
                    style={{ marginBottom: 0 }}
                    required
                  >
                    <Select
                      dataSource={dokter}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Pilih Pelaksana"
                      optionFilterProp="children"
                      onChange={(e) => setDokterKontrol(e)}
                      value={
                        dokterkontrol === null ? curpas.dokterId : dokterkontrol
                      }
                      filterOption={(input, option) =>
                        option.props.children
                          .toString()
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dokter.map((p) => (
                        <Option key={p.DokterId}>
                          {p.DokterId} - {p.NamaDokter}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>

                <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout}
                    label="No Kontrol"
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="..."
                      value={norujukan}
                      // onChange={(e) => onNoKontrol(e)}
                      disabled={buttonorder === "KONTROL" ? false : true}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="No Kartu BPJS"
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="..."
                      value={curpas.noPolish}
                      disabled={buttonorder === "KONTROL" ? false : true}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="No SEP"
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      placeholder="..."
                      value={curpas.noJaminan}
                      disabled={buttonorder === "KONTROL" ? false : true}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="No Telpon"
                    style={{ marginBottom: 0 }}
                  >
                    <Input placeholder="..." value={curpas.noTelephone} />
                  </Form.Item>
                  {/* <Form.Item
                    {...formItemLayout}
                    label="Jenis Faskes"
                    style={{ marginBottom: 0 }}
                  >
                    <Radio.Group
                      name="radiogroup"
                      defaultValue={1}
                      onChange={(e) => onJenisFaskes(e)}
                      disabled={buttonorder === "KONTROL" ? false : true}
                    >
                      <Radio value={1}>Faskes 1</Radio>
                      <Radio value={2}>Faskes 2 (RS)</Radio>
                    </Radio.Group>
                  </Form.Item> */}
                </Col>
              </Row>
              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Form.Item
                    {...formItemLayout2}
                    label="Catatan"
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      placeholder="..."
                      value={cttnrujukan}
                      onChange={(e) => onCatatan(e)}
                      // required
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="Rencana Tindaklanjut kunjungan berikut"
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      rows={2}
                      value={rencananTindakan}
                      onChange={(e) => onRencanatindakan(e)}
                    />
                  </Form.Item>
                </Col>
                {/* <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
                  Belum dapat dikembalikan ke Faskes Perujuk dengan alasan :
                  <TextArea
                    rows={2}
                    value={sebabRujuk}
                    onChange={(e) => onSebabRujuk(e)}
                  /> 2403210187
                </Col> */}
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  * Jika surat cetak belum muncul isikan diagnosa terlebih
                  dahhulu
                  <br />
                  <Space>
                    {norujukan !== null ? (
                      <Space>
                        <Button
                          type="primary"
                          onClick={() => onBatalRujukan()}
                          danger
                        >
                          Batal Rencana Kontrol
                        </Button>
                        <ButtonCetakRencanaKontrolRJ
                          noreg={curpas.registrasiId}
                        />
                      </Space>
                    ) : (
                      <></>
                    )}
                    <Button type="primary" htmlType="submit">
                      Simpan
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Form>
          ) : kontrolform === 2 ? (
            // Kontrol BPJS
            <div>
              <Spin spinning={loadingBPJS}>
                <Form form={form} onFinish={simpanReminder}>
                  <Row gutter={[8, 8]}>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        label="Nama"
                        style={{ marginBottom: 0 }}
                      >
                        <Input value={curpas.namaPasien} />
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        name="program"
                        label="Program"
                        style={{ marginBottom: 0 }}
                        required
                      >
                        <Select
                          defaultValue="KONTROL"
                          value={buttonorder}
                          style={{ width: "100%" }}
                          onChange={handleChange}
                          placeholder="Pilih Program"
                        >
                          <Option value="KONTROL">Kontrol</Option>
                          <Option value="OPERASI">Operasi</Option>
                          <Option value="HEMODIALISA">Hemodialisa</Option>
                          <Option value="RADIOTERAPI">Radioterapi</Option>
                          <Option value="KEMOTERAPI">Kemoterapi</Option>
                        </Select>
                      </Form.Item>
                      {buttonorder === "OPERASI" ? (
                        <Form.Item
                          style={{ marginBottom: 0 }}
                          {...formItemLayout}
                          label="Booking Order"
                        >
                          <Button
                            type="primary"
                            size="small"
                            onClick={onFormOperasi}
                          >
                            Jadwal Operasi
                          </Button>
                        </Form.Item>
                      ) : null}
                      <Form.Item
                        {...formItemLayout}
                        label="Tanggal Kontrol"
                        style={{ marginBottom: 0 }}
                        required
                      >
                        <Input.Group compact>
                          <Tooltip
                            title={
                              "Rujukan Berlaku : " +
                              dayjs(dataSEP).diff(
                                dayjs().format("YYYY-MM-DD"),
                                "days"
                              ) +
                              " hari lagi"
                            }
                          >
                            <DatePicker
                              style={{ width: "calc(100% - 55px)" }}
                              format={dateFormat}
                              placeholder="Pilih Tanggal"
                              value={tglrujukan}
                              onFocus={() => {
                                getExpiredRujukan(nosep);
                                // getSuratKontrolLast(curpas.noPolish);
                              }}
                              disabledDate={
                                dataSEP === "" ? false : disabledDate
                              }
                              onChange={onTanggalBPJS}
                              // renderExtraFooter={() => (
                              //   <div
                              //     style={{
                              //       color: "red",
                              //       lineHeight: "normal",
                              //     }}
                              //   >
                              //     Kontrol BPJS tidak boleh diambil 8 hari <br />
                              //     sebelum / setelah dari tanggal kontrol
                              //     terakhir
                              //   </div>
                              // )}
                              // onSelect={() => {
                              //   setPilihPoliBPJS(null);
                              //   setPilihDokterBPJS(null);
                              // }}
                            />
                          </Tooltip>
                          <Tooltip
                            title={
                              "Klik refresh jika exp tanggal kontrol belum sesuai dengan masa berlaku rujukan"
                            }
                          >
                            <Button
                              // loading={loading}
                              type="primary"
                              onClick={() => {
                                getExpiredRujukan(nosep);
                              }}
                            >
                              <CloudDownloadOutlined />
                            </Button>
                          </Tooltip>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label="Poli BPJS"
                        style={{ marginBottom: 0 }}
                        required
                      >
                        <Input.Group compact>
                          <Select
                            loading={loadingpoli}
                            dataSource={poliBPJS}
                            value={pilihpoliBPJS}
                            showSearch
                            style={{ width: "calc(100% - 55px)" }}
                            placeholder="Pilih Poli"
                            optionFilterProp="children"
                            onChange={(e) => onPilihPoliBPJS(e)}
                            filterOption={(input, option) =>
                              option.props.children
                                .toString()
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {poliBPJS.map((p) => (
                              <Option key={p.kodePoli}>
                                {p.kodePoli} - {p.namaPoli}
                              </Option>
                            ))}
                          </Select>
                          <Button
                            loading={loadingpoli}
                            type="primary"
                            onClick={() => {
                              ambilPoliBPJS(
                                nosep,
                                dayjs(tanggalkontrolBPJS).format("YYYY-MM-DD")
                              );
                              setLoadingPoli(true);
                            }}
                          >
                            <CloudDownloadOutlined />
                          </Button>
                        </Input.Group>
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label="Dokter BPJS"
                        style={{ marginBottom: 0 }}
                        required
                      >
                        <Input.Group compact>
                          <Select
                            loading={loadingdokter}
                            dataSource={dokterBPJS}
                            value={pilihdokterBPJS}
                            showSearch
                            style={{ width: "calc(100% - 55px)" }}
                            placeholder="Pilih Pelaksana"
                            optionFilterProp="children"
                            onChange={(e) => {
                              setPilihDokterBPJS(e);
                              mappingDokterBPJS(e);
                            }}
                            filterOption={(input, option) =>
                              option.props.children
                                .toString()
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                            }
                          >
                            {dokterBPJS.map((p) => (
                              <Option
                                key={p.kodeDokter - p.jadwalPraktek}
                                value={p.kodeDokter}
                              >
                                {p.kodeDokter} - {p.namaDokter}
                              </Option>
                            ))}
                          </Select>
                          <Button
                            loading={loadingdokter}
                            type="primary"
                            onClick={() => {
                              ambilDokterBPJS(
                                pilihpoliBPJS,
                                dayjs(tanggalkontrolBPJS).format("YYYY-MM-DD")
                              );
                              setLoadingDokter(true);
                            }}
                          >
                            <CloudDownloadOutlined />
                          </Button>
                        </Input.Group>
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={24} md={12} lg={12} xl={12}>
                      <Form.Item
                        {...formItemLayout}
                        label="No Kontrol"
                        style={{ marginBottom: 0 }}
                        ref={inputRef}
                      >
                        <ButtonCekSuratKontrol />
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label="No Kartu BPJS"
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="..." value={curpas.noPolish} />
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label="No SEP"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          placeholder="..."
                          value={nosep}
                          onChange={(e) => setNoSEP(e.target.value)}
                        />
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label="No Telpon"
                        style={{ marginBottom: 0 }}
                      >
                        <Input placeholder="..." value={curpas.noTelephone} />
                      </Form.Item>
                      <Form.Item
                        {...formItemLayout}
                        label="Prolanis PRB"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          placeholder="..."
                          value={potensi}
                          style={{
                            backgroundColor: potensi ? "bisque" : "",
                          }}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col span={24}>
                      <Form.Item
                        {...formItemLayout2}
                        label="Catatan"
                        style={{ marginBottom: 0 }}
                      >
                        <Row>
                          <Col span={24}>
                            <TextArea
                              placeholder="..."
                              value={cttnrujukan}
                              onChange={(e) => onCatatan(e)}
                              // required
                            />
                          </Col>
                        </Row>
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row gutter={[8, 8]}>
                    <Col span={24}>
                      <Form.Item
                        {...formItemLayout2}
                        label="USER"
                        style={{ marginBottom: 0 }}
                      >
                        <Input
                          value={user === "" ? namauser : user}
                          onChange={(e) => setUser(e.target.value)}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                      * Jika surat cetak belum muncul isikan diagnosa terlebih
                      dahhulu
                      <br />
                      <Space>
                        {norujukan !== null ? (
                          <Space>
                            <Button
                              type="primary"
                              onClick={() => onBatalRencanaKontrol()}
                              danger
                            >
                              Batal Rencana Kontrol
                            </Button>
                            <ButtonCetakRencanaKontrolRJ
                              noreg={curpas.registrasiId}
                            />
                          </Space>
                        ) : (
                          <></>
                        )}
                        <Button type="primary" htmlType="submit">
                          Simpan
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                </Form>
              </Spin>
            </div>
          ) : null
        ) : null}
      </Card>

      {/* Form Booking Operasi */}
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Jadwal Operasi
          </div>
        }
        open={formjadwaloperasi}
        onCancel={handleCancel}
        width="1000px"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Tutup
          </Button>,
        ]}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="No Registrasi"
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="..." value={curpas.registrasiId} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="No Pasien"
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="..." value={curpas.pasienId} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Nama"
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="..." value={curpas.namaPasien} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="No Telpon"
              style={{ marginBottom: 0 }}
            >
              <Input placeholder="..." value={curpas.noTelephone} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Jadwal Operasi"
              style={{ marginBottom: 0 }}
              required
            >
              <DatePicker
                style={{ width: "100%" }}
                format="DD-MM-YYYY"
                value={tanggalop}
                onChange={onTanggalOp}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Dokter"
              style={{ marginBottom: 0 }}
            >
              <Select
                dataSource={dokterall}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => setDokterOp(e)}
                value={dokterop === null ? curpas.dokterId : dokterop}
                filterOption={(input, option) =>
                  option.props.children
                    .toString()
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {dokterall.map((p) => (
                  <Option key={p.dokterId}>{p.namaDokter}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout}
              label="No. Booking Operasi"
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
            <Table dataSource={bookingop} size="small" bordered>
              <Column
                className="bgcolortunggu"
                dataIndex="bookingOPId"
                title="No. Booking"
              />
              <Column
                // dataIndex="tglOperasi"
                title="Tgl Operasi"
                render={(text, record) => record.tglOperasi.substring(0, 10)}
              />
              <Column dataIndex="noTransaksi" title="No. Transaksi" />
              <Column
                title="Action"
                render={(bookingop) => (
                  <div>
                    <Popconfirm
                      title="Anda yakin akan menghapus booking ini?"
                      onConfirm={() =>
                        deleteBookingOp(noreg, bookingop.bookingOPId)
                      }
                      onCancel={() => message.warning("Batal dihapus!")}
                      okText="Ya"
                      cancelText="Tidak"
                    >
                      <Button danger type="primary" size="small">
                        Hapus
                      </Button>
                    </Popconfirm>
                    <Button
                      disabled
                      type="primary"
                      size="small"
                      onClick={() =>
                        getBookingOpDetail(noreg, bookingop.bookingOPId)
                      }
                    >
                      Edit
                    </Button>
                  </div>
                )}
              />
            </Table>
          </Col>
        </Row>

        <Card size="small" title="Data Tindakan">
          <Row gutter={[8, 8]}>
            <Col xs={24} sm={24} md={20} lg={22} xl={22}>
              <Form.Item
                {...formItemLayout2}
                label="Pelayanan"
                style={{ marginBottom: 0 }}
              >
                <Select
                  dataSource={pelayananbedah}
                  showSearch
                  // searchValue={kosong}
                  style={{ width: "100%" }}
                  placeholder="Pilih Pelayanan"
                  optionFilterProp="children"
                  onChange={(e) => onTindakan(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pelayananbedah.map((d) => (
                    <Option key={d.pelayananId + "-" + d.deskripsi}>
                      {d.pelayananId + "-" + d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={24} md={4} lg={2} xl={2}>
              <Button onClick={onInsertOperasi} type="primary">
                Ambil
              </Button>
            </Col>
          </Row>

          <Table
            dataSource={tindakanoperasi}
            size="small"
            bordered
            pagination={false}
          >
            <Column dataIndex="pelayananId" title="Kode" />
            <Column dataIndex="pelayananDesk" title="Nama Tindakan" />
            <Column dataIndex="userId" title="User Input" />
            <Column
              title="Action"
              render={(tindakanoperasi) => (
                <span>
                  <Button
                    danger
                    size="small"
                    onClick={() =>
                      hapusTindakanOperasi(tindakanoperasi.pelayananId)
                    }
                  >
                    Hapus
                  </Button>
                </span>
              )}
            />
          </Table>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" onClick={insertBooking}>
                Simpan
              </Button>
            </Col>
          </Row>
        </Card>
      </Modal>

      <Modal
        open={modalRencanaKontrol}
        onCancel={() => setModalRencanaKontrol(false)}
        footer={null}
        width="80%"
        title="List Rencana Kontrol By Pasien"
      >
        <Image
          style={{ marginBottom: 10, marginLeft: 10 }}
          preview={false}
          width={150}
          src="https://upload.wikimedia.org/wikipedia/commons/b/b4/BPJS_Kesehatan_logo.svg"
        />
        <Form {...formItemLayout}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="Nama Pasien" style={{ marginBottom: 0 }}>
                {curpas.namaPasien}
              </Form.Item>
              <Form.Item label="Nomor Peserta BPJS" style={{ marginBottom: 0 }}>
                {curpas.noPolish}
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Pilih Bulan" style={{ marginBottom: 0 }}>
                {/* <RangePicker
                  value={[dayjs(tanggalawal), dayjs(tanggalakhir)]}
                  onChange={onTanggalRencana}
                  disabled={loading}
                /> */}
                <DatePicker
                  // defaultValue={tahun + "-" + bulan}
                  placeholder="Pilih Bulan"
                  disabled={loading}
                  onChange={(date, dateString) => {
                    setBulan(dateString.split("-").pop());
                    setTahun(dateString.split("-").shift());
                    getRencanaKontrolBPJSbyKartu(
                      curpas.noPolish,
                      dateString.split("-").pop(),
                      dateString.split("-").shift(),
                      filter
                    );
                  }}
                  picker="month"
                />
              </Form.Item>
              <Form.Item label="Filter Berdasarkan">
                <Radio.Group
                  onChange={onFilter}
                  value={filter}
                  disabled={loading}
                >
                  <Radio value={"1"}>Tanggal Entri</Radio>
                  <Radio value={"2"}>Tanggal Rencana Kontrol</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          loading={tableLoading}
          size="small"
          dataSource={listrencanakontrol}
          columns={columnrencanakontrol}
          pagination={false}
        />
      </Modal>
    </div>
  );
};

export default Formreminder;
