import React, { useContext, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Checkbox,
  Tabs,
  Card,
  Popconfirm,
  Button,
  message,
  Space,
  Modal,
  Spin,
  Table,
  ConfigProvider,
  Divider,
  Radio,
  Alert,
  Switch,
  QRCode,
} from "antd";
import { SmileOutlined } from "@ant-design/icons";
import Iframe from "react-iframe";
import dayjs from "dayjs";
import Icon from "@ant-design/icons";
import BPJSICO from "../../rawatjalan/komponen/BPJSICO";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { RM13RIContext } from "../context/RM13Context";
import { AnamnesaRIContext } from "../context/AnamnesaRIContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { DiagnosaRIContext } from "../context/DiagnosaRIContext";
import { DiagnosaContext } from "../../rawatjalan/context/Diagnosacontext";
import { VClaimContext } from "../../rawatjalan/context/VClaimContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { LoginContext } from "../../rawatjalan/context";
import { ReminderContext } from "../../rawatjalan/context/ReminderContext";
import { PemeriksaanLainContext } from "../../rawatjalan/context/pemeriksaancontext/PemeriksaanLainContext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
const { TabPane } = Tabs;
const { confirm } = Modal;
const { TextArea, Search } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayoutdpjp = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};
const formItemLayoutanjuran = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const { Option } = Select;

const FormRM13 = () => {
  const d = new Date();
  const [open, setOpen] = useState(false);
  const [openNokontrol, setopenNokontrol] = useState(false);
  let dayapa = d.getDay();
  const {
    insertRM13Bpjs,
    insertRM13nonbpjs,
    emrResumePerawatanId,
    //  setemrResumePerawatanId,tanggal, settanggal, hapus, sethapus,
    // registrasiId, setregistrasiId, RM13, setRM13,
    diagnosisIdMasuk,
    setdiagnosisIdMasuk,
    diagnosisIdPulang,
    setdiagnosisIdPulang,
    pembedahan,
    setpembedahan,
    riwayatPenyakit,
    setriwayatPenyakit,
    pemeriksaanFisik,
    setpemeriksaanFisik,
    hasilPenunjang,
    sethasilPenunjang,
    perkembangan,
    setperkembangan,
    keadaanPasien,
    setkeadaanPasien,
    pengobatan,
    setpengobatan,
    prognosa,
    setprognosa,
    anjuran,
    setanjuran,
    pelaksanaId,
    setpelaksanaId,
    kosongkanFormRM13,
    tanggalKontrol,
    settanggalKontrol,
    tipeRujuk,
    settipeRujuk,
    jenisKontrol,
    setjenisKontrol,
    ppkTujuan,
    setppkTujuan,
    noHp,
    setNoHp,
    klinik,
    setKlinik,
    diagnosarujukan,
    setdiagnosadiagnosarujukan,
    catatan,
    setCatatan,
    sebab,
    setSebab,
    program,
    setProgram,
    poliBpjs,
    setpoliBpjs,
    dokterBpjsId,
    setdokterBpjsId,
    updateRm13,
    deleteRm13BPJS,
    deleterm13nonbpjs,
    deleterm13,
    getRiwayatObatByReg,
    obatNoreg,
    setObatNoreg,
    getRiwayatLabByReg,
    labpkNoreg,
    setlabpkNoreg,
    kontrol,
    setkontrol,
    insertRM13,
    load,
    setLoad,
    loadSimpan,
    setLoadSimpan,
    norujukan,
    setNoRujukan,
    namaAkun,
    setnamaAkun,
  } = useContext(RM13RIContext);
  const {
    getPrintRm13,
    modalprintRM13,
    setmodalprintRM13,
    loadDelay,
    setloadDelay,
    printRm13,
  } = useContext(PrintOutContext);
  const {
    getMappingPoliBPJS,
    listpolibpjs,
    ambilDokterBPJS,
    dokterBPJS,
    mappingDokterBPJS,
    setDokterRSMS,
    dokterrsms,
    getSuratKontrolBPJSbyNoSurat,
    datakontrolBPJS,
    getRencanaKontrolBPJSbyKartuTanggal,
    listrencanakontrolFilter,
  } = useContext(VClaimContext);
  const { riwayatPenyakitRM13, setriwayatPenyakitRM13 } =
    useContext(AnamnesaRIContext);
  const { diagnosa } = useContext(DiagnosaRIContext);

  const {
    insertLaporanKemo,
    idKemo,
    terapi,
    setTerapi,
    listOrderObat,
    listValidObat,
    spListObat,
    getDataObat,
  } = useContext(PemeriksaanLainContext);
  const { curpasRI, lookupPoli, setlookupPoli, getLookupPoli } =
    useContext(PasienRIContext);
  const { dokterall, getDokterShift, dokterpoli } =
    useContext(PelayananContext);
  const [form] = Form.useForm();
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dateFormat = "DD-MM-YYYY";
  // const { detdiagnosa } = useContext(DiagnosaRIContext);
  const { detdiagnosa } = useContext(DiagnosaContext);
  const [modal, setModal] = useState(false);

  const [dissableForm, setdissableForm] = useState(false);
  const kosongan = () => (
    <div style={{ textAlign: "center", padding: 0, margin: 0, marginTop: 2 }}>
      <SmileOutlined style={{ fontSize: 20 }} />
      &nbsp; Data Kosong
    </div>
  );

  const columnsb = [
    {
      title: "NO RESEP",
      dataIndex: "noResep",
    },
    {
      title: "NAMA BARANG",
      dataIndex: "namaBarang",
    },
    {
      title: "QTY BARANG",
      dataIndex: "QtyBarang",
      align: "center",
    },
    {
      title: "SATUAN",
      dataIndex: "namaSM",
      align: "center",
    },
    {
      title: "ATURAN PAKAI",
      dataIndex: "kodeAturan",
      align: "center",
    },
  ];

  const datarm13 = {
    emrResumePerawatanId: emrResumePerawatanId,
    registrasiId: curpasRI.registrasiId,
    diagnosisIdMasuk: diagnosisIdMasuk,
    diagnosisIdPulang:
      detdiagnosa === null
        ? ""
        : detdiagnosa
            .map((e) => e.diagnosisId + "-" + e.diagnosisDesk)
            .join("\n")
            .toString(),
    pembedahan: pembedahan,
    riwayatPenyakit:
      riwayatPenyakit === "" ? riwayatPenyakitRM13 : riwayatPenyakit,
    pemeriksaanFisik: pemeriksaanFisik,
    hasilPenunjang: hasilPenunjang,
    perkembangan: perkembangan,
    keadaanPasien: keadaanPasien,
    pengobatan: pengobatan,
    prognosa: prognosa,
    anjuran: anjuran,
    pelaksanaId:
      pelaksanaId === "" || pelaksanaId === null
        ? curpasRI.dokterId
        : pelaksanaId,
    tanggal: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    hapus: false,
    userId: namaAkun,
    clientHost: host,
    clientIP: ip,
  };

  const datarujukan = {
    rujukanId: norujukan === "" || norujukan === null ? null : norujukan,
    tanggal: dayjs().format("YYYY-MM-DD"),
    tanggalRujukan: dayjs(tanggalKontrol).format("YYYY-MM-DD"),
    noJaminan: curpasRI.noJaminan,
    registrasiId: curpasRI.registrasiId,
    pasienId: curpasRI.pasienId,
    noPolish: curpasRI.noPolish,
    namaPasien: curpasRI.namaPasien,
    tipeRujukan: "3",
    jenisPelayanan: "2",
    poliTujuanId: klinik.split("=").shift(),
    dokterKontrolId: dokterrsms,
    namaPoli: klinik.split("=").pop(),
    diagnosisId:
      detdiagnosa.length === 0
        ? diagnosarujukan
        : detdiagnosa
            .filter((item) => item.jenisDiagnosisId === 1)
            .map((item) => `${item.diagnosisId}`)[0],
    poliTujuanIdBPJS: poliBpjs,
    dokterKontrolBPJS: dokterBpjsId,
    catatan: catatan,
    sebabRujuk: sebab,
    rencanaTindakan: program === null || program === "" ? "KONTROL" : program,
    program: program === null || program === "" ? "KONTROL" : program,
    // noRujukanAsal: curpasRI.noJaminan,
    userId: namaAkun,
    clientHost: host,
    clientIp: ip,
  };

  const dataKontrol = {
    noSuratKontrol: norujukan,
    noSEP: curpasRI.noJaminan,
    kodeDokter: dokterBpjsId,
    poliKontrol: poliBpjs,
    tglRencanaKontrol: dayjs(tanggalKontrol).format("YYYY-MM-DD"),
    user: namaAkun,
  };

  const simpanReminder = (e) => {
    console.log(datarm13, dataKontrol, datarujukan);
    if (kontrol === true) {
      if (
        curpasRI.pembayaranId === "0050" ||
        curpasRI.pembayaranId === "0051"
      ) {
        if (norujukan === null || norujukan === "") {
          insertRM13Bpjs(datarm13, dataKontrol, datarujukan);
          setLoadSimpan(true); // Pastikan loading di-set setelah aksi berhasil
        } else {
          if (norujukan.includes("RSMS")) {
            insertRM13nonbpjs(datarm13, datarujukan);
            setLoadSimpan(true); // Set loading true setelah aksi berhasil)
          } else {
            confirm({
              title: "No Surat Rencana Kontrol Sudah Ada.",
              icon: <ExclamationCircleOutlined />, // Pastikan icon dari antd diimpor
              content: "Anda yakin akan mengupdate surat rencana kontrol?",
              okText: "Update",
              cancelText: "Kembali",
              onOk() {
                updateRm13(datarm13, dataKontrol, datarujukan);
                setLoadSimpan(true); // Set loading true setelah update
              },
              onCancel() {
                console.log("Cancel"); // Aksi yang dilakukan ketika user membatalkan
              },
            });
          }
        }
      } else {
        insertRM13nonbpjs(datarm13, datarujukan);
      }
    } else {
      insertRM13(datarm13);
    }
  };

  const onBatalRencanaKontrol = () => {
    confirm({
      title: "Anda yakin akan membatalkan Surat Rencana Kontrol ini?",
      icon: <ExclamationCircleOutlined />,
      content: "Data yang sudah dihapus tidak dapat dikembalikan.",
      okText: "Hapus",
      cancelText: "Kembali",
      okType: "primary",
      onOk() {
        console.log(
          norujukan,
          namaAkun,
          curpasRI.registrasiId,
          emrResumePerawatanId
        );
        setLoadSimpan(true);
        if (
          curpasRI.pembayaranId === "0050" ||
          curpasRI.pembayaranId === "0051"
        ) {
          if (norujukan.includes("RSMS")) {
            deleterm13nonbpjs(curpasRI.registrasiId, emrResumePerawatanId);
          } else {
            deleteRm13BPJS(
              norujukan,
              namaAkun,
              curpasRI.registrasiId,
              emrResumePerawatanId
            );
          }
        } else {
          deleterm13nonbpjs(curpasRI.registrasiId, emrResumePerawatanId);
        }
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };

  const rowSelection = {
    onChange: (selectedRows, e) => {
      setpengobatan(
        e
          .map((d) =>
            d.kodeAturan === null
              ? d.namaBarang + ": " + d.QtyBarang + " " + d.namaSM + "   "
              : d.namaBarang +
                ": " +
                d.QtyBarang +
                " " +
                d.namaSM +
                "; " +
                d.kodeAturan +
                "  "
          )
          .toString()
      );
    },
  };

  const columns = [
    {
      title: "No Surat Kontrol",
      dataIndex: "noSuratKontrol",
      key: "noSuratKontrol",
    },
    {
      title: "Tanggal Kontrol",
      dataIndex: "tglRencanaKontrol",
      key: "tglRencanaKontrol",
    },

    {
      title: "Poli Tujuan",
      dataIndex: "namaPoliTujuan",
      key: "namaPoliTujuan",
    },
    {
      title: "Nama Dokter",
      dataIndex: "namaDokter",
      key: "namaDokter",
    },
    {
      title: "Tanggal Buat",
      dataIndex: "tglTerbitKontrol",
      key: "tglTerbitKontrol",
    },
  ];

  return (
    <div>
      <Form form={form}>
        <Spin spinning={load}>
          <Card size="small">
            <Row>
              <Col span={12}>
                <Form.Item
                  {...formItemLayoutdpjp}
                  label="Keadaan Saat Keluar"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={keadaanPasien}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="..."
                    onChange={(e) => setkeadaanPasien(e)}
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="Sembuh" defaultValue>
                      Sembuh
                    </Option>
                    <Option value="Membaik">Membaik</Option>
                    <Option value="Memburuk">Memburuk</Option>
                    <Option value="Seperti Semula">Seperti Semula</Option>
                    <Option value="Dirujuk">Dirujuk</Option>
                    <Option value="Mati < 48 Jam">Mati &lt; 48 Jam</Option>
                    <Option value="Mati > 48 Jam">Mati &gt; 48 Jam</Option>
                    <Option value="APS">APS</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  {...formItemLayoutdpjp}
                  label="DPJP"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={
                      pelaksanaId === "" || pelaksanaId === null
                        ? curpasRI.dokterId
                        : pelaksanaId
                    }
                    dataSource={dokterall}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="..."
                    optionFilterProp="children"
                    onChange={(e) => setpelaksanaId(e)}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dokterall.map((d) => (
                      <Option key={d.dokterId}>{d.namaDokter}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="Diagnosa Utama Masuk"
                  style={{ marginBottom: 5 }}
                >
                  {detdiagnosa.length === 0 ? (
                    <Select
                      value={diagnosisIdMasuk}
                      dataSource={diagnosa}
                      onChange={(e) => {
                        setdiagnosisIdMasuk(e);
                      }}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="..."
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {diagnosa.map((e) => (
                        <Option key={e.diagnosisId}>
                          {e.diagnosisId + "-" + e.deskripsi}
                        </Option>
                      ))}
                    </Select>
                  ) : (
                    <Select
                      value={diagnosisIdMasuk}
                      dataSource={detdiagnosa}
                      onChange={(e) => {
                        setdiagnosisIdMasuk(e);
                      }}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="..."
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {detdiagnosa.map((e) => (
                        <Option key={e.diagnosisId}>
                          {e.diagnosisId + "-" + e.diagnosisDesk}
                        </Option>
                      ))}
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="Tindakan / Pembedahan"
                  style={{ marginBottom: 5 }}
                >
                  <TextArea
                    rows={2}
                    placeholder="..."
                    onChange={(e) => {
                      setpembedahan(e.target.value);
                    }}
                    value={pembedahan}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24}>
                <Card>
                  <Tabs defaultActiveKey="1">
                    <TabPane tab="Riwayat Penyakit" key="1">
                      <Form.Item style={{ marginBottom: 5 }}>
                        <TextArea
                          rows={10}
                          placeholder="..."
                          onChange={(e) => setriwayatPenyakit(e.target.value)}
                          value={
                            riwayatPenyakit === ""
                              ? riwayatPenyakitRM13
                              : riwayatPenyakit
                          }
                        />
                      </Form.Item>
                    </TabPane>
                    <TabPane tab="Pemeriksaan Fisik" key="2">
                      <Form.Item style={{ marginBottom: 5 }}>
                        <TextArea
                          rows={10}
                          placeholder="..."
                          onChange={(e) => setpemeriksaanFisik(e.target.value)}
                          value={pemeriksaanFisik}
                        />
                      </Form.Item>
                    </TabPane>
                    <TabPane tab="Hasil Penunjang" key="3">
                      <Form.Item style={{ marginBottom: 5 }}>
                        {/* <Button
                          type="primary"
                          onClick={() => {
                            getRiwayatLabByReg(curpasRI.registrasiId)

                          }}
                        >
                          Lihat Lab PK
                        </Button> */}

                        <TextArea
                          rows={10}
                          placeholder="..."
                          onChange={(e) => sethasilPenunjang(e.target.value)}
                          value={hasilPenunjang}
                        />
                      </Form.Item>
                    </TabPane>
                    <TabPane tab="Pengobatan" key="5">
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Button
                          type="primary"
                          onClick={() => {
                            setModal(true);
                            // getDataObat(curpasRI.registrasiId, curpasRI.ruangId);
                            getRiwayatObatByReg(curpasRI.registrasiId);
                          }}
                        >
                          Lihat Obat
                        </Button>
                        <TextArea
                          rows={10}
                          placeholder="..."
                          onChange={(e) => setpengobatan(e.target.value)}
                          value={pengobatan}
                        />
                      </Form.Item>
                    </TabPane>
                    <TabPane tab="Prognosa" key="6">
                      <Form.Item style={{ marginBottom: 5 }}>
                        <Radio.Group
                          onChange={(e) => {
                            setprognosa(e.target.value);
                          }}
                        >
                          <Radio value="Dubia At Malam">Dubia At Malam</Radio>
                          <Radio value="Dubia At Bonam">Dubia At Bonam</Radio>
                        </Radio.Group>
                        <TextArea
                          rows={10}
                          placeholder="..."
                          onChange={(e) => setprognosa(e.target.value)}
                          value={prognosa}
                        />
                      </Form.Item>
                    </TabPane>
                    <TabPane tab="Perkembangan" key="8">
                      <Form.Item style={{ marginBottom: 5 }}>
                        <TextArea
                          rows={10}
                          placeholder="..."
                          onChange={(e) => setperkembangan(e.target.value)}
                          value={perkembangan}
                        />
                      </Form.Item>
                    </TabPane>
                    <TabPane tab="Anjuran Pasien" key="7">
                      <Row>
                        <Col span={8}>
                          <TextArea
                            rows={15}
                            placeholder="..."
                            onChange={(e) => setanjuran(e.target.value)}
                            style={{ width: "100%" }}
                            value={anjuran}
                          />
                        </Col>
                        <Col span={16}>
                          <Form.Item
                            {...formItemLayout}
                            label="Kontrol/Rujuk"
                            style={{ marginBottom: 5 }}
                          >
                            <Row gutter={[5, 5]}>
                              <Col span={4}>
                                <Switch
                                  checked={kontrol}
                                  checkedChildren="Kontrol"
                                  unCheckedChildren="Tidak"
                                  onChange={(e) => {
                                    if (e === true) {
                                      setkontrol(true);
                                      console.log("Kirim cppt");
                                    } else {
                                      console.log("catatan biasa");
                                      setkontrol(false);
                                    }
                                  }}
                                />
                              </Col>
                              <Col span={20}>
                                <Space.Compact style={{ width: "100%" }}>
                                  <Input
                                    // style={{ width: "85%" }}
                                    value={norujukan}
                                    readOnly
                                  />
                                  {norujukan.includes("RSMS") ? (
                                    <></>
                                  ) : (
                                    <>
                                      <Button
                                        type="primary"
                                        // style={{ width: "15%" }}
                                        onClick={() => {
                                          if (
                                            norujukan === null ||
                                            norujukan === ""
                                          ) {
                                            getRencanaKontrolBPJSbyKartuTanggal(
                                              datarujukan.noPolish,
                                              dayjs(
                                                curpasRI.tanggalMasukRi
                                              ).format("YYYY-MM-DD"),
                                              dayjs().format("YYYY-MM-DD"),
                                              "1"
                                            );
                                            setopenNokontrol(true);
                                          } else {
                                            getSuratKontrolBPJSbyNoSurat(
                                              norujukan
                                            );
                                            setOpen(true);
                                          }
                                        }}
                                      >
                                        Lihat
                                      </Button>
                                    </>
                                  )}
                                </Space.Compact>
                              </Col>
                            </Row>
                          </Form.Item>
                          {kontrol === true ? (
                            <>
                              {curpasRI.pembayaranId === "0050" ||
                              curpasRI.pembayaranId === "0051" ? (
                                <>
                                  <Row>
                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayoutanjuran}
                                        label="No BPJS"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <Input
                                          style={{ width: "100%" }}
                                          value={datarujukan.noPolish}
                                          readOnly
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayout}
                                        label="NO SEP"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <Input
                                          style={{ width: "100%" }}
                                          value={datarujukan.noJaminan}
                                          readOnly
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Row>
                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayoutanjuran}
                                        label="Tipe Rujuk"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <Select
                                          value={tipeRujuk}
                                          onChange={(e) => {
                                            settipeRujuk(e);
                                          }}
                                          disabled={dissableForm}
                                          showSearch
                                          style={{ width: "100%" }}
                                          placeholder="..."
                                          optionFilterProp="children"
                                        >
                                          <Option value="Rujuk Penuh">
                                            Rujuk Penuh
                                          </Option>
                                          <Option value="Rujuk Parsial">
                                            Rujuk Parsial
                                          </Option>
                                          <Option value="Rujuk Balik">
                                            Rujuk Balik
                                          </Option>
                                          <Option value="Kontrol">
                                            Kontrol
                                          </Option>
                                        </Select>
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayout}
                                        label="No Hp"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <Input
                                          onChange={(e) => {
                                            setNoHp(e.target.value);
                                          }}
                                          value={
                                            noHp === "" || noHp === null
                                              ? curpasRI.noTelephone
                                              : noHp
                                          }
                                          disabled={dissableForm}
                                          style={{ width: "100%" }}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Klinik RS"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <Select
                                      onChange={(e) => {
                                        console.log(e.split("=").pop());
                                        setKlinik(e);
                                        getMappingPoliBPJS(
                                          e.split("=").shift()
                                        );
                                        settanggalKontrol("");
                                        setpoliBpjs("");
                                        setdokterBpjsId("");
                                        setanjuran(
                                          "Kontrol Tanggal " +
                                            dayjs(tanggalKontrol).format(
                                              "DD-MM-YYYY"
                                            ) +
                                            ", di " +
                                            e.split("=").pop() +
                                            ", Catatan : " +
                                            catatan
                                        );
                                      }}
                                      dataSource={lookupPoli}
                                      value={klinik}
                                      disabled={dissableForm}
                                      showSearch
                                      style={{ width: "100%" }}
                                      placeholder="..."
                                      optionFilterProp="children"
                                    >
                                      {lookupPoli.map((e) => (
                                        <Option
                                          key={e.ruangId + "=" + e.deskripsi}
                                        >
                                          {e.deskripsi}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Klinik BPJS"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <Select
                                      onChange={(e) => {
                                        setpoliBpjs(e);
                                        setdokterBpjsId("");
                                        settanggalKontrol("");
                                      }}
                                      dataSource={listpolibpjs.filter(
                                        (item) => item.groupLayananId === 2
                                      )}
                                      value={poliBpjs}
                                      disabled={dissableForm}
                                      showSearch
                                      style={{ width: "100%" }}
                                      placeholder="..."
                                      optionFilterProp="children"
                                    >
                                      {listpolibpjs
                                        .filter(
                                          (item) => item.groupLayananId === 2
                                        )
                                        .map((e) => (
                                          <Option key={e.kodeBpjs}>
                                            {e.ruangDeskripsiBPJS}
                                          </Option>
                                        ))}
                                    </Select>
                                  </Form.Item>
                                  <Row>
                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayoutanjuran}
                                        label="Tgl Kontrol"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <DatePicker
                                          value={tanggalKontrol}
                                          disabledDate={(current) => {
                                            return (
                                              current &&
                                              current < dayjs().endOf("day")
                                            );
                                          }}
                                          format={dateFormat}
                                          onChange={(date) => {
                                            settanggalKontrol(date);
                                            setdokterBpjsId("");

                                            ambilDokterBPJS(
                                              poliBpjs,
                                              dayjs(date).format("YYYY-MM-DD")
                                            );
                                            setanjuran(
                                              "Kontrol Tanggal " +
                                                dayjs(date).format(
                                                  "DD-MM-YYYY"
                                                ) +
                                                ", di " +
                                                klinik.split("=").pop() +
                                                ", Catatan : " +
                                                catatan
                                            );
                                          }}
                                          disabled={dissableForm}
                                          style={{ width: "100%" }}
                                          placeholder="..."
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayout}
                                        label="Program"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <Select
                                          onChange={(e) => {
                                            setProgram(e);
                                          }}
                                          value={program}
                                          disabled={dissableForm}
                                          showSearch
                                          style={{ width: "100%" }}
                                          placeholder="..."
                                          optionFilterProp="children"
                                        >
                                          <Option value="KONTROL">
                                            KONTROL
                                          </Option>
                                          <Option value="OPERASI">
                                            OPERASI
                                          </Option>
                                          <Option value="HEMODIALISA">
                                            HEMODIALISA
                                          </Option>
                                          <Option value="RADIOTERAPI">
                                            RADIOTERAPI
                                          </Option>
                                          <Option value="KEMOTERAPI">
                                            KEMOTERAPI
                                          </Option>
                                        </Select>
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Dokter BPJS"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <Select
                                      onChange={(e) => {
                                        setdokterBpjsId(e);
                                        mappingDokterBPJS(e);
                                      }}
                                      value={dokterBpjsId}
                                      dataSource={dokterBPJS}
                                      disabled={dissableForm}
                                      showSearch
                                      style={{ width: "100%" }}
                                      placeholder="..."
                                      optionFilterProp="children"
                                    >
                                      {dokterBPJS.map((e) => (
                                        <Option key={e.kodeDokter}>
                                          {e.namaDokter}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Diagnosa"
                                    style={{ marginBottom: 5 }}
                                  >
                                    {detdiagnosa.length === 0 ? (
                                      <Select
                                        value={diagnosarujukan}
                                        dataSource={diagnosa}
                                        onChange={(e) =>
                                          setdiagnosadiagnosarujukan(e)
                                        }
                                        disabled={dissableForm}
                                        showSearch
                                        style={{ width: "100%" }}
                                        placeholder="..."
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                          option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                        }
                                      >
                                        {diagnosa.map((e) => (
                                          <Option key={e.diagnosisId}>
                                            {e.diagnosisId + "-" + e.deskripsi}
                                          </Option>
                                        ))}
                                      </Select>
                                    ) : (
                                      <Input
                                        value={
                                          detdiagnosa.length === 0
                                            ? ""
                                            : detdiagnosa
                                                .filter(
                                                  (item) =>
                                                    item.jenisDiagnosisId === 1
                                                )
                                                .map(
                                                  (item) =>
                                                    `${item.diagnosisId} - ${item.diagnosisDesk}`
                                                )
                                                .join("-")
                                        }
                                        readOnly
                                      />
                                    )}
                                  </Form.Item>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Catatan"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <TextArea
                                      onChange={(e) => {
                                        setCatatan(e.target.value);
                                        setanjuran(
                                          "Kontrol Tanggal " +
                                            dayjs(tanggalKontrol).format(
                                              "DD-MM-YYYY"
                                            ) +
                                            ", di " +
                                            klinik.split("=").pop() +
                                            ", Catatan : " +
                                            e.target.value
                                        );
                                      }}
                                      value={catatan}
                                      disabled={dissableForm}
                                      rows={2}
                                      placeholder="..."
                                      maxLength={200}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Sebab Rujuk/Kontrol"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <TextArea
                                      onChange={(e) => {
                                        setSebab(e.target.value);
                                      }}
                                      value={sebab}
                                      disabled={dissableForm}
                                      rows={2}
                                      placeholder="..."
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Nama Akun"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <Input
                                      disabled={dissableForm}
                                      value={namaAkun}
                                      onChange={(e) =>
                                        setnamaAkun(e.target.value)
                                      }
                                    />
                                    {namaAkun.length < 6 ? (
                                      <Alert
                                        message="Nama Akun Minimal 6 Karakter"
                                        type="error"
                                        showIcon
                                      />
                                    ) : (
                                      ""
                                    )}
                                  </Form.Item>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  <Row>
                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayoutanjuran}
                                        label="Tipe Rujuk"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <Select
                                          value={tipeRujuk}
                                          onChange={(e) => {
                                            settipeRujuk(e);
                                          }}
                                          disabled={dissableForm}
                                          showSearch
                                          style={{ width: "100%" }}
                                          placeholder="..."
                                          optionFilterProp="children"
                                        >
                                          <Option value="Rujuk Penuh">
                                            Rujuk Penuh
                                          </Option>
                                          <Option value="Rujuk Parsial">
                                            Rujuk Parsial{" "}
                                          </Option>
                                          <Option value="Rujuk Balik">
                                            Rujuk Balik
                                          </Option>
                                          <Option value="Kontrol">
                                            Kontrol
                                          </Option>
                                        </Select>
                                      </Form.Item>
                                    </Col>

                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayout}
                                        label="No Hp"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <Input
                                          onChange={(e) => {
                                            setNoHp(e.target.value);
                                          }}
                                          value={
                                            noHp === "" || noHp === null
                                              ? curpasRI.noTelephone
                                              : noHp
                                          }
                                          disabled={dissableForm}
                                          style={{ width: "100%" }}
                                        />
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Klinik RS"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <Select
                                      onChange={(e) => {
                                        setKlinik(e);
                                        // getMappingPoliBPJS(e.split("=").shift())
                                        settanggalKontrol("");
                                        setdokterBpjsId("");
                                        setDokterRSMS("");
                                        setanjuran(
                                          "Kontrol Tanggal " +
                                            dayjs(tanggalKontrol).format(
                                              "DD-MM-YYYY"
                                            ) +
                                            ", di " +
                                            e.split("=").pop() +
                                            ", Catatan : " +
                                            catatan
                                        );
                                      }}
                                      dataSource={lookupPoli}
                                      value={klinik}
                                      disabled={dissableForm}
                                      showSearch
                                      style={{ width: "100%" }}
                                      placeholder="..."
                                      optionFilterProp="children"
                                    >
                                      {lookupPoli.map((e) => (
                                        <Option
                                          key={e.ruangId + "=" + e.deskripsi}
                                        >
                                          {e.deskripsi}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Row>
                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayoutanjuran}
                                        label="Tgl Kontrol"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <DatePicker
                                          disabledDate={(current) => {
                                            return (
                                              current &&
                                              current < dayjs().endOf("day")
                                            );
                                          }}
                                          value={tanggalKontrol}
                                          format={dateFormat}
                                          onChange={(date) => {
                                            settanggalKontrol(date);
                                            setDokterRSMS("");

                                            getDokterShift(
                                              klinik.split("=").shift(),
                                              new Date(date).getDay() + 1
                                            );
                                            setanjuran(
                                              "Kontrol Tanggal " +
                                                dayjs(date).format(
                                                  "DD-MM-YYYY"
                                                ) +
                                                ", di " +
                                                klinik.split("=").pop() +
                                                ", Catatan : " +
                                                catatan
                                            );
                                          }}
                                          disabled={dissableForm}
                                          style={{ width: "100%" }}
                                          placeholder="..."
                                        />
                                      </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                      <Form.Item
                                        {...formItemLayout}
                                        label="Program"
                                        style={{ marginBottom: 5 }}
                                      >
                                        <Select
                                          onChange={(e) => {
                                            setProgram(e);
                                          }}
                                          value={program}
                                          disabled={dissableForm}
                                          showSearch
                                          style={{ width: "100%" }}
                                          placeholder="..."
                                          optionFilterProp="children"
                                        >
                                          <Option value="KONTROL">
                                            Kontrol
                                          </Option>
                                          <Option value="OPERASI">
                                            Operasi
                                          </Option>
                                          <Option value="HEMODIALISA">
                                            Hemodialisa
                                          </Option>
                                          <Option value="RADIOTERAPI">
                                            Radioterapi
                                          </Option>
                                          <Option value="KEMOTERAPI">
                                            Kemoterapi
                                          </Option>
                                        </Select>
                                      </Form.Item>
                                    </Col>
                                  </Row>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Dokter RS"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <Select
                                      onChange={(e) => {
                                        setDokterRSMS(e);
                                      }}
                                      value={dokterrsms}
                                      dataSource={dokterpoli}
                                      disabled={dissableForm}
                                      showSearch
                                      style={{ width: "100%" }}
                                      placeholder="..."
                                      optionFilterProp="children"
                                    >
                                      {dokterpoli.map((p) => (
                                        <Option key={p.DokterId}>
                                          {p.NamaDokter}
                                        </Option>
                                      ))}
                                    </Select>
                                  </Form.Item>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Diagnosa"
                                    style={{ marginBottom: 5 }}
                                  >
                                    {detdiagnosa.length === 0 ? (
                                      <Select
                                        value={diagnosarujukan}
                                        dataSource={diagnosa}
                                        onChange={(e) =>
                                          setdiagnosadiagnosarujukan(e)
                                        }
                                        disabled={dissableForm}
                                        showSearch
                                        style={{ width: "100%" }}
                                        placeholder="..."
                                        optionFilterProp="children"
                                        filterOption={(input, option) =>
                                          option.props.children
                                            .toLowerCase()
                                            .indexOf(input.toLowerCase()) >= 0
                                        }
                                      >
                                        {diagnosa.map((e) => (
                                          <Option key={e.diagnosisId}>
                                            {e.diagnosisId + "-" + e.deskripsi}
                                          </Option>
                                        ))}
                                      </Select>
                                    ) : (
                                      <Input
                                        value={
                                          detdiagnosa.length === 0
                                            ? ""
                                            : detdiagnosa
                                                .filter(
                                                  (item) =>
                                                    item.jenisDiagnosisId === 1
                                                )
                                                .map(
                                                  (item) =>
                                                    `${item.diagnosisId} - ${item.diagnosisDesk}`
                                                )
                                                .join("-")
                                        }
                                        readOnly
                                      />
                                    )}
                                  </Form.Item>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Catatan"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <TextArea
                                      onChange={(e) => {
                                        setCatatan(e.target.value);
                                        setanjuran(
                                          "Kontrol Tanggal " +
                                            dayjs(tanggalKontrol).format(
                                              "DD-MM-YYYY"
                                            ) +
                                            ", di " +
                                            klinik.split("=").pop() +
                                            ", Catatan : " +
                                            e.target.value
                                        );
                                      }}
                                      value={catatan}
                                      disabled={dissableForm}
                                      rows={2}
                                      placeholder="..."
                                      maxLength={200}
                                    />
                                  </Form.Item>
                                  <Form.Item
                                    {...formItemLayout}
                                    label="Sebab Rujuk/Kontrol"
                                    style={{ marginBottom: 5 }}
                                  >
                                    <TextArea
                                      onChange={(e) => {
                                        setSebab(e.target.value);
                                      }}
                                      value={sebab}
                                      disabled={dissableForm}
                                      rows={2}
                                      placeholder="..."
                                    />
                                  </Form.Item>
                                </>
                              )}
                            </>
                          ) : (
                            <></>
                          )}
                        </Col>
                      </Row>
                    </TabPane>
                  </Tabs>
                </Card>
              </Col>
            </Row>
          </Card>
          <Card loading={loadSimpan}>
            <Row>
              <Col span={12}>
                <Space>
                  <Button
                    onClick={() => {
                      getPrintRm13(
                        curpasRI.pasienId,
                        curpasRI.registrasiId,
                        ""
                      );
                    }}
                    disabled={
                      emrResumePerawatanId === "" ||
                      emrResumePerawatanId === null ||
                      emrResumePerawatanId === 0
                        ? true
                        : false
                    }
                  >
                    Cetak
                  </Button>

                  <Button
                    type="primary"
                    onClick={() => onBatalRencanaKontrol()}
                    danger
                    disabled={
                      norujukan === "" || norujukan === null ? true : false
                    }
                  >
                    Batal Rencana Kontrol
                  </Button>
                </Space>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Space>
                  <Button
                    onClick={() => {
                      kosongkanFormRM13();
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      if (
                        curpasRI.pembayaranId === "0050" ||
                        curpasRI.pembayaranId === "0051"
                      ) {
                        if (namaAkun === "" || namaAkun === null) {
                          if (namaAkun.length < 6) {
                            Modal.warning({
                              icon: <Icon component={BPJSICO} />,
                              title: "Nama Akun Kurang dari 6 Huruf!",
                              content: "Silahkan Tambah Nama Akun Anda!",
                            });
                          } else {
                            simpanReminder();
                          }
                        } else {
                          if (namaAkun.length < 6) {
                            Modal.warning({
                              icon: <Icon component={BPJSICO} />,
                              title:
                                "Nama Akun Tidak Boleh Kurang Dari 6 Huruf!",
                            });
                          } else {
                            simpanReminder();
                          }
                        }
                      } else {
                        simpanReminder();
                      }
                      console.log(datarm13, dataKontrol, datarujukan);
                    }}
                  >
                    Simpan
                  </Button>
                </Space>
              </Col>
            </Row>
          </Card>
        </Spin>
      </Form>
      <Modal
        // title="Daftar Obat"
        open={modal}
        onCancel={() => setModal(false)}
        closable={false}
        footer={null}
        width={800}
        style={{ top: 10 }}
      >
        <Spin tip="Mengambil Data Obat" spinning={spListObat}>
          <ConfigProvider renderEmpty={kosongan}>
            <Divider
              size="small"
              orientation="left"
              style={{ backgroundColor: "#d9f7be", margin: "0px" }}
            >
              Daftar Obat
            </Divider>
            <div>
              <hr />
              <Table
                rowSelection={{
                  type: "checkbox",
                  ...rowSelection,
                }}
                columns={columnsb}
                dataSource={obatNoreg}
                size="small"
                // onRow={(record, rowIndex) => {
                //   return {
                //     onClick: () => {
                //       let tempObat =
                //         (pengobatan ? pengobatan : "") +
                //         (!pengobatan ? "" : ", ") +
                //         record.NAMABARANG +
                //         "; " +
                //         record.QTYBAR
                //         +
                //         " " +
                //         record.SATRSP +
                //         "; " + record.KODEATRPK;
                //       if (tempObat.length <= 400000) {
                //         setpengobatan(tempObat);
                //         // Modal.info({
                //         //   title: "Sukses",
                //         //   content: `Anda memasukkan ${record.NAMABARANG +
                //         //     " : " +
                //         //     record.QTYBAR +
                //         //     " " +
                //         //     record.SATRSP
                //         //     }`,
                //         // });
                //         message.info('Berhasil Di Tambahkan!');
                //       } else {
                //         Modal.error({
                //           title: "Error",
                //           content:
                //             "Inputan terapi tidak boleh lebih dari 4000 karakter!",
                //         });
                //       }
                //     },
                //   };
                // }}
                bordered
                pagination={false}
                scroll={{ y: 700 }}
              />
            </div>
          </ConfigProvider>
        </Spin>
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={modalprintRM13}
        onCancel={() => {
          setmodalprintRM13(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printRm13}
          width="100%"
          height="750px"
          id="myId"
          // className="myClassname"
          display="initial"
          position="relative"
          style={{
            wordWrap: "break-word",
            overflowWrap: "break-word",
          }}
          wordWrap="break-word"
          overflowWrap="break-word"
        />
      </Modal>
      <Modal
        open={open}
        title="Data Surat Rencana Kontrol"
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Kembali
          </Button>,
        ]}
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <p>
              Nama : {datakontrolBPJS.sep.peserta.nama}
              <br />
              No Surat : {datakontrolBPJS.noSuratKontrol}
              <br />
              Tgl. Kontrol :{" "}
              {dayjs(datakontrolBPJS.tglRencanaKontrol).format("DD-MM-YYYY")}
              <br />
              Tgl. Dibuat :{" "}
              {dayjs(datakontrolBPJS.tglTerbit).format("DD-MM-YYYY")}
              <br />
              Poli Tujuan : {datakontrolBPJS.namaPoliTujuan}
              <br />
              Nama Dokter : {datakontrolBPJS.namaDokter}
              <br />
              Diagnosa : {datakontrolBPJS.sep.diagnosa}
            </p>
          </Col>
          <Col span={12}>
            <QRCode
              value={datakontrolBPJS.noSuratKontrol || "-"}
              errorLevel="M"
            />
          </Col>
        </Row>
      </Modal>
      <Modal
        width="60%"
        footer={null}
        open={openNokontrol}
        onCancel={() => {
          setopenNokontrol(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Table
          columns={columns}
          dataSource={listrencanakontrolFilter}
          rowKey="noSuratKontrol"
        />
      </Modal>
    </div>
  );
};

export default FormRM13;
