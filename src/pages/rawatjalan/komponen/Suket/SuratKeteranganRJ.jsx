import React, { useState, Fragment, useContext, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Divider,
  TimePicker,
  Image,
  Button,
  Card,
  Space,
  Modal,
  message,
  Checkbox,
  Radio,
  Table,
  Typography,
  Empty,
  Tooltip,
} from "antd";
import { SnippetsOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import { SuratKeteranganRJContext } from "../../context/SuratKeteranganRJContext";
import ButtonSPRP from "./FormSurat/ButtonSPRP";
import ButtonSKD from "./FormSurat/ButtonSKD";
import ButtonSK from "./FormSurat/ButtonSK";
import { PasienContext } from "../../context/PasienContext";
import { CatatanmedisContext } from "../../context/CatatanmedisContext";
import { RJumumContext } from "../../context/RJumumContext";
import VerifikasiSuketRJ from "./VerifikasiSuketRJ";
import { LoginContext } from "../../context";

const { TextArea } = Input;
const { Title } = Typography;

const formItemLayoutdpjp = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const formItemLayouttgl = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const formItemLayouttgl2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formItemLayouttgl3 = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const { Option } = Select;

const format = "DD-MM-YYYY";
const formatDT = "DD-MM-YYYY HH:mm";

const SuratKeteranganRJ = () => {
  const host = sessionStorage.getItem("Host");
  const [surat, setSurat] = useState(null);

  const {
    suratKeteranganId,
    jenisKeterangan,
    setjenisKeterangan,
    setPermintaan,
    permintaan,
    setPermintaan2,
    permintaan2,
    setCatatanSK,
    catatansk,
    setCatatanSKD,
    catatanskd,
    sprp,
    setSPRP,
    skd,
    setSKD,
    sk,
    setSK,
    jenissuratkesehatan,
    setJenisSuratKesehatan,
    keteranganuntuksk,
    setKeteranganUntukSK,
    keteranganuntukskd,
    setKeteranganUntukSKD,
    nosk,
    setNoSK,
    noskd,
    setNoSKD,
    nosprp,
    setNoSPRP,
    setAlasanRujuk,
    setAlasanRujukKeluarga,
    keterangansehat,
    setKeteranganSehat,
    getDokter,
    sipdokter,
    setSIPDokter,
    setNIPDokter,
    getCurrentTime,
    getCurrentTime2,
    getCurrentTime3,
    getCurrentTime4,
    getCurrentTime5,
    hasil,
    setHasil,
    dokterjiwa,
    iddokterjiwa,
    tanggalketerangan,
    insertSuketRj,
    listsuratrj,
    setVerSuRJ,
    versurj,
    getReadSuketRJ,
    getListSuketRJ,
    setViewSprp,
    listdokter,
    setTandaTangan,
    konfirmasi,
    setKonfirmasi,
    confirmLoading,
    setConfirmLoading,
    getReport,
    setPrintsuket,
    printSuket,
    link,
    setLink,
  } = useContext(SuratKeteranganRJContext);
  const {
    getPasienDetail,
    curpas,
    pasiendetail,
    nama,
    pekerjaan,
    alamat,
    ruangasal,
  } = useContext(PasienContext);
  const { tandatangan, detailCatatanmedis } = useContext(CatatanmedisContext);
  const { detailRJumum } = useContext(RJumumContext);
  const { namauser, pegawai, namaLengkap } = useContext(LoginContext);

  const handleCancel = () => {
    setVerSuRJ(false);
  };

  const confirm = () => {
    setKonfirmasi(true);
  };

  const ketikaCancel = () => {
    setKonfirmasi(false);
  };

  const printok = () => {
    setPrintsuket(false);
  };

  const printcancel = () => {
    setPrintsuket(false);
  };

  const ketikaOk = () => {
    if (surat === "sk" && nosk !== null && hasil !== null) {
      insertSuketRj(datasuketrjSk);
      console.log(datasuketrjSk);
      setTimeout(() => {
        getListSuketRJ(curpas.registrasiId);
      }, 500);
    } else if (surat === "skd" && noskd !== null && keterangansehat !== null) {
      insertSuketRj(datasuketrjSkd);
      console.log(datasuketrjSkd);
      setTimeout(() => {
        getListSuketRJ(curpas.registrasiId);
      }, 500);
    } else if (surat === "sprp" && nosprp !== null) {
      insertSuketRj(datasuketrjSprp);
      console.log(datasuketrjSprp);
      setTimeout(() => {
        getListSuketRJ(curpas.registrasiId);
      }, 500);
    } else {
      message.warning("cek kembali");
    }
    setConfirmLoading(true);
    setTimeout(() => {
      setKonfirmasi(false);
      setConfirmLoading(false);
    }, 1000);
  };

  const datasuketrjSprp = {
    suratKeteranganId: suratKeteranganId,
    noSurat: nosprp,
    registrasiId: curpas.registrasiId,
    JenisKeterangan: jenissuratkesehatan,
    TglKeterangan: getCurrentTime(),
    NamaPasien: curpas.namaPasien,
    umur: curpas.umur,
    pekerjaan: "-",
    alamat: curpas.alamat,
    namaIbu: curpas.namaIbu,
    dokterPenanggungJawab: curpas.dokterId,
    hasilPemeriksaan: null,
    keterangan: null,
    catatan: null,
    cetak: true,
    dateEntry: getCurrentTime(),
    clientHost: host,
  };

  const datasuketrjSkd = {
    suratKeteranganId: suratKeteranganId,
    noSurat: noskd,
    registrasiId: curpas.registrasiId,
    JenisKeterangan: jenissuratkesehatan,
    TglKeterangan: getCurrentTime(),
    NamaPasien: curpas.namaPasien,
    umur: curpas.umur,
    pekerjaan: "-",
    alamat: curpas.alamat,
    namaIbu: curpas.namaIbu,
    DokterPenanggungJawab: curpas.dokterId,
    hasilPemeriksaan: keterangansehat,
    keterangan: keteranganuntukskd,
    catatan: catatanskd,
    cetak: true,
    dateEntry: getCurrentTime(),
    clientHost: host,
  };

  const datasuketrjSk = {
    suratKeteranganId: suratKeteranganId,
    noSurat: nosk,
    registrasiId: curpas.registrasiId,
    JenisKeterangan: jenissuratkesehatan,
    TglKeterangan: getCurrentTime(),
    NamaPasien: curpas.namaPasien,
    umur: curpas.umur,
    pekerjaan: "-",
    alamat: curpas.alamat,
    namaIbu: curpas.namaIbu,
    dokterPenanggungJawab: curpas.dokterId,
    hasilPemeriksaan: hasil,
    keterangan: keteranganuntuksk,
    catatan: catatansk,
    cetak: true,
    dateEntry: getCurrentTime(),
    clientHost: host,
  };

  const columns = [
    {
      title: "No Surat",
      dataIndex: "noSurat",
      width: "8%",
      key: "noSurat",
    },
    {
      title: "No Register",
      dataIndex: "registrasiId",
      width: "8%",
      key: "registrasiId",
    },
    {
      title: "Nama Pasien",
      dataIndex: "namaPasien",
      width: "8%",
      key: "namaPasien",
    },
    {
      title: "Jenis Surat",
      dataIndex: "jenisKeterangan",
      width: "8%",
      key: "jenisKeterangan",
    },
    {
      title: "Dokter",
      dataIndex: "dokterPenanggungJawab",
      width: "8%",
      key: "dokterPenanggungJawab",
      render: (dokterPenanggungJawab) => {
        return (
          <p>
            {
              listdokter.map((d) => d.namaDokter)[
                listdokter
                  .map((d) => d.dokterId)
                  .indexOf(String(dokterPenanggungJawab))
              ]
            }
          </p>
        );
      },
    },
    {
      title: "Status",
      dataIndex: "verified",
      width: "8%",
      key: "verified",
      render(text) {
        return {
          props: {
            style: { color: text === true ? "green" : "red" },
          },
          children: <div>{text === true ? "Sudah Valid" : "Belum Valid"}</div>,
        };
      },
    },
    {
      title: "Aksi",
      width: "8%",
      render: (_, record) =>
        curpas.dokterId === pegawai && record.verified === false ? (
          <Button
            type="primary"
            onClick={() => {
              setVerSuRJ(true);
              getReadSuketRJ(record.registrasiId, record.jenisKeterangan);
              record.jenisKeterangan === "Surat Pengantar Rujukan Pasien"
                ? setViewSprp("aktif")
                : setViewSprp("nonaktif");
              setTandaTangan(null);
            }}
          >
            Verifkasi
          </Button>
        ) : record.verified === true ? (
          <Button
            type="danger"
            onClick={() => {
              setPrintsuket(true);
              getReport(
                record.jenisKeterangan === "Surat Bebas Narkoba"
                  ? "NARKOBA"
                  : record.jenisKeterangan === "Surat Sehat Rohani"
                  ? "ROHANI"
                  : "DOKTER",
                record.suratKeteranganId,
                curpas.registrasiId
              );
              console.log("wut?", curpas.registrasiId);
              console.log("wut2?", record.suratKeteranganId);
              console.log(
                "wut3?",
                record.jenisKeterangan === "Surat Bebas Narkoba"
                  ? "NARKOBA"
                  : record.jenisKeterangan === "Surat Sehat Rohani"
                  ? "ROHANI"
                  : "DOKTER"
              );
            }}
          >
            Cetak
          </Button>
        ) : (
          <Tooltip title="Validasi Terlebih dahulu oleh dokter">
            <Button disabled>Verifikasi</Button>
          </Tooltip>
        ),
    },
    // {
    //   width: "4%",
    //   render: (_, record) =>
    //     record.verified === true ? (
    //       <Button type="danger">Cetak</Button>
    //     ) : (
    //       <Button disabled type="danger">
    //         Cetak
    //       </Button>
    //     ),
    // },
  ];

  return (
    <div>
      <Card
        title="List Surat Keterangan RJ"
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "beige" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Table
          locale={{
            emptyText: (
              <span>
                <Empty
                  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                  imageStyle={{
                    height: 60,
                  }}
                  description={
                    <span>
                      Tidak Ada data{" "}
                      <a
                        onClick={() => {
                          getListSuketRJ(curpas.registrasiId);
                        }}
                      >
                        Refresh
                      </a>
                    </span>
                  }
                ></Empty>
              </span>
            ),
          }}
          columns={columns}
          dataSource={listsuratrj}
          bordered
        />
      </Card>
      <Card
        title="Input Surat Keterangan RJ"
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "beige" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row>
          <Col span={24}>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Pilih Jenis Surat"
              style={{ marginBottom: 0 }}
            >
              <Select
                // value={jenisKeterangan}
                onChange={(e) => {
                  setjenisKeterangan(e);
                  if (e === "Surat Pengantar Rujukan Pasien") {
                    setSurat("sprp");
                    setJenisSuratKesehatan(e);
                    setNoSPRP(null);
                    setNoSK(null);
                    setNoSKD(null);
                    // getCurrentTime();
                    // {
                    //   curpas.pasienId !== null
                    //     ? getPasienDetail(curpas.pasienId)
                    //     : getCurrentTime();
                    // }
                    // detailCatatanmedis(curpas.registrasiId);
                    // settglSelesai(dayjs());
                    // settglKeterangan(dayjs());
                    // settglMulai(null);
                    // setlamaHari(null);
                    // settglKeluarHasil(null);
                    // settglMeninggal(null);
                    // settglSlsIsoRS(null);
                    // settglIsomanFaskes(null);
                    // getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // setJnsKtrngan(e);
                    // setSimpan(true);
                    // setStatusCode(201);
                    // setTtd(false);
                    // console.log(simpan);
                  } else if (e === "Surat Keterangan Dokter") {
                    setSurat("skd");
                    setJenisSuratKesehatan(e);
                    setNoSPRP(null);
                    setNoSK(null);
                    setNoSKD(null);
                    // getCurrentTime2();
                    // getCurrentTime4();
                    // {
                    //   curpas.pasienId !== null
                    //     ? getPasienDetail(curpas.pasienId)
                    //     : getCurrentTime2();
                    // }
                    // detailCatatanmedis(curpas.registrasiId);
                    // detailRJumum(curpas.registrasiId);
                    // getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // setJnsKtrngan(e);
                    // setSimpan(true);
                    // settgl(null);
                    // setLamaRawat2(0);
                    // setStatusCode(201);
                    // setTtd(false);
                  } else if (e === "Surat Keterangan") {
                    setSurat("sk");
                    getDokter("D266");
                    setPermintaan2(false);
                    setNoSPRP(null);
                    setNoSK(null);
                    setNoSKD(null);
                    // getCurrentTime3();
                    // {
                    //   curpas.pasienId !== null
                    //     ? getPasienDetail(curpas.pasienId)
                    //     : getCurrentTime5();
                    // }
                    // detailCatatanmedis(curpas.registrasiId);
                    // getCurrentTime5();
                    // settglMeninggal(dayjs());
                    // settglSelesai(dayjs());
                    // settglKeterangan(dayjs());
                    // settglMulai(null);
                    // setlamaHari(null);
                    // settglKeluarHasil(null);
                    // settglSlsIsoRS(null);
                    // settglIsomanFaskes(null);
                    // setSimpan(true);
                    // setLamaRawat2(0);
                    // setStatusCode(201);
                    // setTtd(false);
                  } else {
                    // settglKeterangan(dayjs());
                    // message.error("Status Pasien Bukan Meninggal");
                    // setSimpan(false);
                    // setTtd(false);
                    // setStatusCode(201);
                  }
                }}
                showSearch
                style={{ width: "40%" }}
                placeholder="Pilih Jenis Surat"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {/* <Option value="Surat Rujukan Peserta BPJS">
                  Surat Rujukan Peserta BPJS
                </Option> */}
                <Option value="Surat Pengantar Rujukan Pasien">
                  Surat Pengantar Rujukan Pasien
                </Option>
                <Option value="Surat Keterangan Dokter">
                  Surat Keterangan Dokter
                </Option>
                <Option value="Surat Keterangan">
                  Surat Keterangan Narkoba/Rohani
                </Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            {jenisKeterangan === "Surat Rujukan Peserta BPJS" ? (
              <Card>
                <Divider orientation="left">Surat Rujukan Peserta BPJS</Divider>
                <Row>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayouttgl2}
                      label="No Rujukan"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="..."
                        value={""}
                        // onChange={(e) => {
                        //   setrujukanDari(e.target.value);
                        // }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayouttgl2}
                      label="Kepada RS"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="..."
                        value={""}
                        // onChange={(e) => {
                        //   setrujukanDari(e.target.value);
                        // }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayouttgl2}
                      label="Poliklinik"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        placeholder="..."
                        value={""}
                        // onChange={(e) => {
                        //   setrujukanDari(e.target.value);
                        // }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayouttgl2}
                      label="Anamnesia"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        // value={tglKeluarHasil}
                        // onChange={(e) => {
                        //   settglKeluarHasil(e);
                        // }}
                        style={{ width: "100%" }}
                        format={format}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayouttgl2}
                      label="Diagnosa"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        style={{ width: "100%" }}
                        // value={sumberInformasi}
                        // onChange={(e) => {
                        //   setsumberInformasi(e.target.value);
                        // }}
                      />
                    </Form.Item>{" "}
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      {...formItemLayouttgl2}
                      label="NO Kartu BPJS"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        // value={pemeriksaanSwab}
                        // onChange={(e) => {
                        //   setpemeriksaanSwab(e.target.value);
                        // }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayouttgl2}
                      label="Nama Pasien"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        style={{ width: "100%" }}
                        // value={metodePemeriksaan}
                        // onChange={(e) => {
                        //   setmetodePemeriksaan(e.target.value);
                        // }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayouttgl2}
                      label="Keterangan"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        style={{ width: "100%" }}
                        // value={sumberInformasi}
                        // onChange={(e) => {
                        //   setsumberInformasi(e.target.value);
                        // }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ) : jenisKeterangan === "Surat Pengantar Rujukan Pasien" ? (
              <Card>
                <Divider orientation="left">
                  Surat Pengantar Rujukan Pasien
                </Divider>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      hidden={false}
                      {...formItemLayouttgl}
                      label="Nomor"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        value={nosprp}
                        onChange={(e) => {
                          setNoSPRP(e.target.value);
                        }}
                        style={{ width: "80%" }}
                      />
                    </Form.Item>
                    {/* <Form.Item
                      {...formItemLayouttgl}
                      label="NIP Dokter"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        // value={noskd}
                        onChange={(e) => {
                          setNIPDokter(e.target.value);
                        }}
                        style={{ width: "80%" }}
                      />
                    </Form.Item> */}
                  </Col>
                  <Col span={24}>
                    {/* <Form.Item
                      {...formItemLayouttgl}
                      label="Alasan Rujuk"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={2}
                        placeholder="..."
                        style={{ width: "80%" }}
                        // value={keterangan}
                        onChange={(e) => {
                          setAlasanRujuk(e.target.value);
                        }}
                      />
                    </Form.Item> */}
                    {/* <Form.Item
                      {...formItemLayouttgl}
                      label="Permintaan"
                      style={{ marginBottom: 5 }}
                    >
                      <Checkbox
                        onChange={(data) => {
                          setPermintaan(data.target.checked);
                          console.log("data", data.target.checked);
                        }}
                      >
                        Pasien/Keluarga
                      </Checkbox>
                    </Form.Item> */}
                    {/* <Form.Item
                      // hidden={permintaan === true ? false : true}
                      {...formItemLayouttgl}
                      label="Alasan Rujuk"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={2}
                        placeholder="Permintaan Pasien/keluarga"
                        style={{ width: "80%" }}
                        // value={keterangan}
                        onChange={(e) => {
                          permintaan === true
                            ? setAlasanRujukKeluarga(e.target.value)
                            : setAlasanRujuk(e.target.value);
                        }}
                      />
                    </Form.Item> */}
                  </Col>
                </Row>
              </Card>
            ) : jenisKeterangan === "Surat Keterangan Dokter" ? (
              <Card>
                <Divider orientation="left">Surat Keterangan Dokter</Divider>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      hidden={false}
                      {...formItemLayouttgl}
                      label="Nomor"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        value={noskd}
                        onChange={(e) => {
                          setNoSKD(e.target.value);
                        }}
                        style={{ width: "80%" }}
                      />
                    </Form.Item>
                    {/* <Form.Item
                      hidden={false}
                      {...formItemLayouttgl}
                      label="Nama Dokter"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        // value={noskd}
                        // onChange={(e) => {
                        //   setNoSKD(e.target.value);
                        // }}
                        style={{ width: "80%" }}
                      />
                    </Form.Item> */}
                    {/* <Form.Item
                      hidden={false}
                      {...formItemLayouttgl}
                      label="SIP Dokter"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        // value={noskd}
                        onChange={(e) => {
                          setSIPDokter(e.target.value);
                        }}
                        style={{ width: "80%" }}
                      />
                    </Form.Item> */}
                    <Form.Item
                      {...formItemLayoutdpjp}
                      label="Hasil"
                      style={{ marginBottom: 5 }}
                    >
                      <Radio.Group
                        onChange={(data) => {
                          setKeteranganSehat(data.target.value);
                          setPermintaan(data.target.checked);
                        }}
                      >
                        <Radio value={"SEHAT JASMANI"}>Sehat Jasmani</Radio>
                        <Radio value={"TIDAK SEHAT JASMANI"}>
                          Tidak Sehat Jasmani
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      hidden={permintaan === true ? false : true}
                      label="Keterangan dibuat untuk"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={2}
                        placeholder="..."
                        style={{ width: "80%" }}
                        // value={setKeteranganUntuk}
                        onChange={(e) => {
                          setKeteranganUntukSKD(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      hidden={permintaan === true ? false : true}
                      label="Catatan"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={2}
                        placeholder="..."
                        style={{ width: "80%" }}
                        value={catatanskd}
                        onChange={(e) => {
                          setCatatanSKD(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ) : jenisKeterangan === "Surat Keterangan" &&
              ruangasal === "9116" ? (
              <Card>
                <Divider orientation="left">
                  Surat Keterangan Narkoba/Rohani
                </Divider>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      hidden={false}
                      {...formItemLayouttgl}
                      label="Nomor Surat"
                      style={{ marginBottom: 5 }}
                    >
                      <Input
                        value={nosk}
                        onChange={(e) => {
                          setNoSK(e.target.value);
                        }}
                        style={{ width: "80%" }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      label="Surat"
                      style={{ marginBottom: 5 }}
                    >
                      <Radio.Group
                        onChange={(data) => {
                          console.log("jenis", data.target.value);
                          setPermintaan2(data.target.checked);
                          setJenisSuratKesehatan(data.target.value);
                          data.target.value === "Surat Bebas Narkoba"
                            ? setCatatanSK("Hasil Tes Urin Terlampir")
                            : setCatatanSK("Hasil Tes MMPI Terlampir");
                          setHasil(null);
                        }}
                      >
                        <Radio value={"Surat Bebas Narkoba"}>
                          Bebas Narkoba
                        </Radio>
                        <Radio value={"Surat Sehat Rohani"}>Sehat Rohani</Radio>
                      </Radio.Group>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      hidden={
                        jenissuratkesehatan === "Surat Bebas Narkoba"
                          ? false
                          : true
                      }
                      label="Hasil"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        onChange={(e) => {
                          setHasil(e);
                        }}
                        showSearch
                        style={{ width: "80%" }}
                        placeholder="Pilih Hasil"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="Bebas Narkoba">Bebas Narkoba</Option>
                        <Option value="Tidak Bebas Narkoba">
                          Tidak Bebas Narkoba
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      hidden={
                        jenissuratkesehatan === "Surat Sehat Rohani"
                          ? false
                          : true
                      }
                      label="Hasil"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        reqired
                        onChange={(e) => {
                          setHasil(e);
                        }}
                        showSearch
                        style={{ width: "80%" }}
                        placeholder="Pilih Hasil"
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option value="Sehat Rohani">Sehat Rohani</Option>
                        <Option value="Tidak Sehat Rohani">
                          Tidak Sehat Rohani
                        </Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      hidden={permintaan2 === true ? false : true}
                      label="Keterangan dibuat untuk"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={2}
                        placeholder="..."
                        style={{ width: "80%" }}
                        // value={keterangan}
                        onChange={(e) => {
                          setKeteranganUntukSK(e.target.value);
                          console.log(e.target.value);
                        }}
                      />
                    </Form.Item>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      hidden={permintaan2 === true ? false : true}
                      label="Catatan"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={2}
                        placeholder="..."
                        style={{ width: "80%" }}
                        value={catatansk}
                        onChange={(e) => {
                          setCatatanSK(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ) : null}
          </Col>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col span={12}>
            <Space></Space>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Space>
              <Button type="primary" onClick={confirm}>
                Simpan
              </Button>
              {/* <Button
                type="primary"
                onClick={() => {
                  if (surat === "sk" && nosk !== null && hasil !== null) {
                    insertSuketRj(datasuketrjSk);
                    console.log(datasuketrjSk);
                    setTimeout(() => {
                      getListSuketRJ(curpas.registrasiId);
                    }, 500);
                  } else if (
                    surat === "skd" &&
                    noskd !== null &&
                    keterangansehat !== null
                  ) {
                    insertSuketRj(datasuketrjSkd);
                    console.log(datasuketrjSkd);
                    setTimeout(() => {
                      getListSuketRJ(curpas.registrasiId);
                    }, 500);
                  } else if (surat === "sprp" && nosprp !== null) {
                    insertSuketRj(datasuketrjSprp);
                    console.log(datasuketrjSprp);
                    setTimeout(() => {
                      getListSuketRJ(curpas.registrasiId);
                    }, 500);
                  } else {
                    message.warning("cek kembali");
                  }
                }}
              >
                Simpan
              </Button> */}
              {/* <Button
                onClick={() => {
                  if (jenisKeterangan === "Surat Pengantar Rujukan Pasien") {
                    setSPRP(true);
                    // getSuratKeteranganDetail(
                    //   curpasRI.registrasiId,
                    //   jenisKeterangan
                    // );
                    console.log("Surat Pengantar Rujukan Pasien");
                  } else if (jenisKeterangan === "Surat Keterangan Dokter") {
                    setSKD(true);
                    // getSuratKeteranganDetail(
                    //   curpasRI.registrasiId,
                    //   jenisKeterangan
                    // );
                    console.log("Surat Keterangan Dokter");
                  } else if (jenisKeterangan === "Surat Keterangan") {
                    setSK(true);
                    // getSuratKeteranganDetail(
                    //   curpasRI.registrasiId,
                    //   jenisKeterangan
                    // );
                    console.log("Surat Keterangan");
                  } else {
                    console.log("else");
                  }
                }}
              >
                Cetak
              </Button> */}
            </Space>
          </Col>
        </Row>
      </Card>
      <Modal
        closable={false}
        footer={null}
        width="800px"
        centered={true}
        visible={sprp}
        onCancel={() => setSPRP(false)}
      >
        <ButtonSPRP />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="800px"
        centered={true}
        visible={skd}
        onCancel={() => setSKD(false)}
      >
        <ButtonSKD />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="800px"
        centered={true}
        visible={sk}
        onCancel={() => setSK(false)}
      >
        <ButtonSK />
      </Modal>
      <Modal
        title="Verifikasi Surat Keterangan"
        centered
        visible={versurj}
        onOk={handleCancel}
        onCancel={handleCancel}
        footer
        disabled
        width={1200}
      >
        <VerifikasiSuketRJ />
      </Modal>
      <Modal
        title="Konfirmasi No Surat"
        visible={konfirmasi}
        onOk={ketikaOk}
        confirmLoading={confirmLoading}
        onCancel={ketikaCancel}
      >
        <p>
          {
            "Apakah No surat Sudah Sesuai Dengan Nomor Yang Diberikan Oleh Bagian Tata Usaha ?"
          }
        </p>
      </Modal>
      <Modal
        title="Print Suket"
        visible={printSuket}
        onOk={printok}
        // confirmLoading={confirmLoading}
        onCancel={printcancel}
        width={1200}
        centered={true}
      >
        <iframe title="Print Suket" src={link} height="750px" width="100%" />
      </Modal>
    </div>
  );
};

export default SuratKeteranganRJ;
