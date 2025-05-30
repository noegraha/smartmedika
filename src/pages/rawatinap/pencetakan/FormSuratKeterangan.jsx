import React, {
  useState,
  Fragment,
  useContext,
  useRef,
  useEffect,
} from "react";
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
  Popover,
  Popconfirm,
  Alert,
  Tooltip,
  Tag,
  Typography,
} from "antd";
import Iframe from "react-iframe";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { PasienRIContext } from "../context/PasienRIContext";
import dayjs from "dayjs";
import { SuratKeteranganRIContext } from "../context/SuratKeteranganRIContext";
import { AnamnesaRIContext } from "../context/AnamnesaRIContext";
import { DiagnosaContext } from "../../rawatjalan/context/Diagnosacontext";
import { CatatanmedisContext } from "../../rawatjalan/context/CatatanmedisContext";
import { LoginContext } from "../../rawatjalan/context";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
const { TextArea, Search } = Input;
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

const FormSuratKeterangan = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const [simpan, setSimpan] = useState(false);
  const sigCanvas = useRef({});
  const clear = () => {
    sigCanvas.current.clear();
  };

  const { hubungan } = useContext(CatatanmedisContext);
  // const close = () => Popup.close();
  const { detdiagnosa, diagnosa, getDiagnosa } = useContext(DiagnosaContext);
  const { riyawatPenyakitSekarang, detailAnamnesaRI } =
    useContext(AnamnesaRIContext);
  const { dokterall } = useContext(PelayananContext);
  const { namauser } = useContext(LoginContext);
  const {
    curpasRI,
    lookupPoli,
    setlookupPoli,
    getLookupPoli,
    PasienPulang,
    // curpasPulang,
    // setCurpasPulang,
    swtichPasien,
  } = useContext(PasienRIContext);

  const {
    suratKeteranganId,
    setsuratKeteranganId,
    jenisKeterangan,
    setjenisKeterangan,
    tglKeterangan,
    settglKeterangan,
    tanggal,
    settanggal,
    jam,
    setjam,
    tglMulai,
    settglMulai,
    tglSelesai,
    settglSelesai,
    lamaHari,
    setlamaHari,
    keterangan,
    setketerangan,
    dokterPenanggungJawab,
    setdokterPenanggungJawab,
    rujukanDari,
    setrujukanDari,
    keluhanUtama,
    setkeluhanUtama,
    riwayatPenyakit,
    setriwayatPenyakit,
    pemeriksaanSwab,
    setpemeriksaanSwab,
    metodePemeriksaan,
    setmetodePemeriksaan,
    tglKeluarHasil,
    settglKeluarHasil,
    sumberInformasi,
    setsumberInformasi,
    diagnosaSuket,
    setdiagnosaSuket,
    spriDokter,
    setspriDokter,
    spriRuangIsolasi,
    setspriRuangIsolasi,
    spriJenisRuangan,
    setspriJenisRuangan,
    tglMeninggal,
    settglMeninggal,
    noSurat,
    setnoSurat,
    tglSlsIsoRS,
    settglSlsIsoRS,
    verified,
    setverified,
    cetak,
    setcetak,
    hasilPemeriksaan,
    sethasilPemeriksaan,
    tglIsomanFaskes,
    settglIsomanFaskes,
    namaPj,
    setnamaPj,
    noPj,
    setnoPj,
    hubPj,
    sethubPj,
    listSuketByReg,
    setlistSuketByReg,
    insertSuket,
    getSuketByReg,
    getSuratKeteranganDetail,
    loadingSuket,
    setloadingSuket,
    mstSuket,
    setmstSuket,
    catatanSuket,
    setcatatanSuket,
    insertVerifDokter,
    getmstSuket,
    deleteSuket,
    noregPulang,
    setnoregPulang,
    mstSuketPulang,
    setmstSuketPulang,
    suketPulang,
    setsuketPulang,
    getKepulanganPs,
    warning1,
    setwarning1,
    warning2,
    setwarning2,
    warning3,
    setwarning3,
  } = useContext(SuratKeteranganRIContext);
  const {
    printSuket,
    setprintSuket,
    modalSuket,
    setModalSuket,
    getPrintSuket,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);

  const selisih = dayjs(tglSelesai, "DD/MM/YYYY").diff(
    dayjs(tglMulai, "DD/MM/YYYY"),
    "day"
  );
  const LamaRawat = selisih + 1;
  const dataSuket = {
    suratKeteranganId: suratKeteranganId,
    registrasiId: curpasRI.registrasiId,
    jenisKeterangan: jenisKeterangan,
    namaPasien: curpasRI.namaPasien,
    umur:
      curpasRI.umur === "0"
        ? curpasRI.umurBulan === 0
          ? curpasRI.umurHari + " Hari"
          : curpasRI.umurBulan + " Bulan"
        : curpasRI.umur + " Tahun",
    alamat: curpasRI.alamat,
    pekerjaan: null,
    namaIbu: curpasRI.namaIbu,
    tglKeterangan:
      tglKeterangan === null
        ? dayjs().format("YYYY-MM-DD")
        : dayjs(tglKeterangan).format("YYYY-MM-DD"),
    tglMasuk: dayjs(curpasRI.tanggalMasukRi).format("YYYY-MM-DD"),
    tanggal: dayjs().format("YYYY-MM-DD"),
    jam: dayjs().format("HH:mm"),
    tglMulai: tglMulai === null ? null : dayjs(tglMulai).format("YYYY-MM-DD"),
    tglSelesai:
      tglSelesai === null ? null : dayjs(tglSelesai).format("YYYY-MM-DD"),
    lamaHari: isNaN(LamaRawat) ? null : LamaRawat.toString(),
    keterangan: keterangan,
    dokterPenanggungJawab: curpasRI.dokterId,
    rujukanDari: rujukanDari,
    keluhanUtama:
      keluhanUtama === null || keluhanUtama === ""
        ? riyawatPenyakitSekarang
        : keluhanUtama,
    riwayatPenyakit: riwayatPenyakit,
    pemeriksaanSwab: pemeriksaanSwab,
    metodePemeriksaan: metodePemeriksaan,
    tglKeluarHasil:
      tglKeluarHasil === null
        ? null
        : dayjs(tglKeluarHasil).format("YYYY-MM-DD"),
    sumberInformasi: sumberInformasi,
    diagnosa: diagnosaSuket,
    spriDokter: spriDokter,
    spriRuangIsolasi: spriRuangIsolasi,
    spriJenisRuangan: spriJenisRuangan,
    tglMeninggal:
      tglMeninggal === null
        ? null
        : dayjs(tglMeninggal).format("YYYY-MM-DDTHH:mm"),
    noSurat: noSurat,
    tglSlsIsoRS:
      tglSlsIsoRS === null ? null : dayjs(tglSlsIsoRS).format("YYYY-MM-DD"),
    catatan: catatanSuket,
    hasilPemeriksaan: hasilPemeriksaan,
    namaPenanggungJawab: namaPj,
    noIdentitas: noPj,
    hubunganId: hubPj,
    hapus: false,
    verified: false,
    cetak: false,
    tglIsomanFaskes:
      tglIsomanFaskes === null
        ? null
        : dayjs(tglIsomanFaskes).format("YYYY-MM-DD"),
    userId: namauser,
    clientHost: host,
    clientIP: ip,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
  };

  // const dataSuketPulang = {
  //   suratKeteranganId: suratKeteranganId,
  //   registrasiId: curpasRI.registrasiId,
  //   jenisKeterangan: jenisKeterangan,
  //   namaPasien: curpasRI.namaPasien,
  //   umur:
  //     curpasRI.umur === "0"
  //       ? curpasRI.umurBulan === 0
  //         ? curpasRI.umurHari + " Hari"
  //         : curpasRI.umurBulan + " Bulan"
  //       : curpasRI.umur + " Tahun",
  //   alamat: curpasRI.alamat,
  //   pekerjaan: null,
  //   namaIbu: curpasRI.namaIbu,
  //   tglKeterangan:
  //     tglKeterangan === null
  //       ? dayjs().format("YYYY-MM-DD")
  //       : dayjs(tglKeterangan).format("YYYY-MM-DD"),
  //   tglMasuk: dayjs(curpasRI.tanggalMasukRi).format("YYYY-MM-DD"),
  //   tanggal: dayjs().format("YYYY-MM-DD"),
  //   jam: dayjs().format("HH:mm"),
  //   tglMulai: tglMulai === null ? null : dayjs(tglMulai).format("YYYY-MM-DD"),
  //   tglSelesai:
  //     tglSelesai === null ? null : dayjs(tglSelesai).format("YYYY-MM-DD"),
  //   lamaHari: isNaN(LamaRawat) ? null : LamaRawat.toString(),
  //   keterangan: keterangan,
  //   dokterPenanggungJawab: curpasRI.dokterId,
  //   rujukanDari: rujukanDari,
  //   keluhanUtama:
  //     keluhanUtama === null || keluhanUtama === ""
  //       ? riyawatPenyakitSekarang
  //       : keluhanUtama,
  //   riwayatPenyakit: riwayatPenyakit,
  //   pemeriksaanSwab: pemeriksaanSwab,
  //   metodePemeriksaan: metodePemeriksaan,
  //   tglKeluarHasil:
  //     tglKeluarHasil === null
  //       ? null
  //       : dayjs(tglKeluarHasil).format("YYYY-MM-DD"),
  //   sumberInformasi: sumberInformasi,
  //   diagnosa: diagnosaSuket,
  //   spriDokter: spriDokter,
  //   spriRuangIsolasi: spriRuangIsolasi,
  //   spriJenisRuangan: spriJenisRuangan,
  //   tglMeninggal:
  //     tglMeninggal === null
  //       ? null
  //       : dayjs(tglMeninggal).format("YYYY-MM-DDTHH:mm"),
  //   noSurat: noSurat,
  //   tglSlsIsoRS:
  //     tglSlsIsoRS === null ? null : dayjs(tglSlsIsoRS).format("YYYY-MM-DD"),
  //   catatan: catatanSuket,
  //   hasilPemeriksaan: hasilPemeriksaan,
  //   namaPenanggungJawab: namaPj,
  //   noIdentitas: noPj,
  //   hubunganId: hubPj,
  //   hapus: false,
  //   verified: false,
  //   cetak: false,
  //   tglIsomanFaskes:
  //     tglIsomanFaskes === null
  //       ? null
  //       : dayjs(tglIsomanFaskes).format("YYYY-MM-DD"),
  //   userId: namauser,
  //   clientHost: host,
  //   clientIP: ip,
  // };

  // console.log("keadaan pasien", LamaRawat);
  useEffect(() => {
    setjenisKeterangan("");
    setwarning3(false);
    settglKeterangan(dayjs());
  }, []);
  return (
    <div>
      <Card size="small">
        <Row>
          <Col span={24}>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Pilih Jenis Surat"
              style={{ marginBottom: 5 }}
            >
              <Select
                value={jenisKeterangan}
                dataSource={mstSuket}
                style={{ width: "70%" }}
                onChange={(e) => {
                  setjenisKeterangan(e);
                  setwarning3(false);
                  if (e === "4") {
                    getSuratKeteranganDetail(curpasRI.registrasiId, e);
                  } else if (e === "5") {
                    getSuratKeteranganDetail(curpasRI.registrasiId, e);
                  } else if (e === "6" || e === "7") {
                    getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    setwarning1(true);
                    // if (suketPulang === "J" || suketPulang === "K") {
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // } else {
                    //   Modal.warning({
                    //     title: "Pasien Tersebut Bukan Pasien Meninggal!",
                    //   });
                    // }
                    // } else if (e === "8") {
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // } else if (e === "9") {
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // } else if (e === "11") {
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // } else if (e === "13") {
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // } else if (e === "14") {
                    //   getDiagnosa(curpasRI.registrasiId);
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // } else if (e === "15") {
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // } else if (e === "16") {
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // } else if (e === "12") {
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                    // } else if (e === "10") {
                    //   getSuratKeteranganDetail(curpasRI.registrasiId, e);
                  } else {
                    getSuratKeteranganDetail(curpasRI.registrasiId, e);
                  }
                }}
                showSearch
                placeholder="Pilih Jenis Surat"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {mstSuket.map((d) => (
                  <Option key={d.JenisSuketId}>{d.Deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>
      <Row>
        <Col span={24}>
          {jenisKeterangan === "4" ? (
            <Card>
              <Divider orientation="left">Surat Keterangan Sakit</Divider>
              <Row>
                <Col span={8}>
                  <Form.Item
                    {...formItemLayouttgl2}
                    label="Tgl Mulai"
                    style={{ marginBottom: 5 }}
                  >
                    <DatePicker
                      value={tglMulai}
                      onChange={(e) => {
                        settglMulai(e);
                        console.log(e);
                      }}
                      style={{ width: "100%" }}
                      format={"DD-MM-YYYY"}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...formItemLayouttgl2}
                    label="Tgl Selesai"
                    style={{ marginBottom: 5 }}
                  >
                    <DatePicker
                      value={tglSelesai}
                      onChange={(date) => {
                        settglSelesai(date);
                      }}
                      style={{ width: "100%" }}
                      format={"DD-MM-YYYY"}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...formItemLayouttgl2}
                    label="Lama Rawat "
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      type="number"
                      suffix="Hari"
                      style={{ width: "50%" }}
                      placeholder="..."
                      readOnly
                      value={LamaRawat}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Form.Item
                    {...formItemLayouttgl3}
                    label="Keterangan"
                    style={{ marginBottom: 5 }}
                  >
                    <TextArea
                      rows={6}
                      placeholder="..."
                      onChange={(e) => {
                        setketerangan(e.target.value);
                      }}
                      value={keterangan}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ) : jenisKeterangan === "5" ? (
            <Card>
              <Divider orientation="left">Surat Keterangan Dirawat</Divider>
              <Row>
                {/* <Col span={24}>
                  <Form.Item
                    {...formItemLayouttgl}
                    label="Tanggal"
                    style={{ marginBottom: 5 }}
                  >
                    <DatePicker
                      value={tglKeterangan}
                      onChange={(e) => {
                        settglKeterangan(e);
                      }}
                      style={{ width: "50%" }}
                      format={"DD-MM-YYYY"}
                    />
                  </Form.Item>
                </Col> */}
                <Col span={24}>
                  <Form.Item
                    {...formItemLayouttgl}
                    label="Keterangan"
                    style={{ marginBottom: 5 }}
                  >
                    <TextArea
                      rows={4}
                      placeholder="..."
                      style={{ width: "50%" }}
                      value={keterangan}
                      onChange={(e) => {
                        setketerangan(e.target.value);
                      }}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Card>
          ) : jenisKeterangan === "6" ? (
            warning3 ? (
              <Card>
                <Divider orientation="left">Surat Keterangan Meninggal</Divider>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayouttgl}
                      label="Tgl Meninggal"
                      style={{ marginBottom: 5 }}
                    >
                      <DatePicker
                        disabledDate={(current) => {
                          return current > dayjs().endOf("day");
                        }}
                        format="DD-MM-YYYY HH:mm"
                        showTime
                        value={tglMeninggal}
                        onChange={(date) => {
                          settglMeninggal(date);
                        }}
                        style={{ width: "50%" }}
                        placeholder="..."
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      label="Keterangan"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={4}
                        placeholder="..."
                        style={{ width: "50%" }}
                        value={keterangan}
                        onChange={(e) => {
                          setketerangan(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ) : (
              <></>
            )
          ) : jenisKeterangan === "7" ? (
            warning3 ? (
              <Card>
                <Divider orientation="left">
                  Surat Izin Pengangkutan Jenazah
                </Divider>
                <Row>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayouttgl}
                      label="Tgl Meninggal"
                      style={{ marginBottom: 5 }}
                    >
                      <DatePicker
                        disabledDate={(current) => {
                          return current > dayjs().endOf("day");
                        }}
                        format="DD-MM-YYYY HH:mm"
                        showTime
                        value={tglMeninggal}
                        onChange={(date) => {
                          settglMeninggal(date);
                        }}
                        style={{ width: "50%" }}
                        placeholder="..."
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayoutdpjp}
                      label="Keterangan"
                      style={{ marginBottom: 5 }}
                    >
                      <TextArea
                        rows={4}
                        placeholder="..."
                        style={{ width: "50%" }}
                        value={keterangan}
                        onChange={(e) => {
                          setketerangan(e.target.value);
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            ) : (
              <></>
            )
          ) : // ) : jenisKeterangan === "8" ? (
          //   <Card>
          //     <Divider orientation="left">Confirmed Covid (SP 63)</Divider>
          //     <Row>
          //       <Col span={12}>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Rujukan Dari"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "100%" }}
          //             placeholder="..."
          //             value={rujukanDari}
          //             onChange={(e) => {
          //               setrujukanDari(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Riwayat Penyakit"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <TextArea
          //             rows={4}
          //             placeholder="..."
          //             style={{ width: "100%" }}
          //             value={riwayatPenyakit}
          //             onChange={(e) => {
          //               setriwayatPenyakit(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Keluhan Utama"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <TextArea
          //             rows={4}
          //             placeholder="..."
          //             style={{ width: "100%" }}
          //             value={
          //               keluhanUtama === null || keluhanUtama === ""
          //                 ? riyawatPenyakitSekarang
          //                 : keluhanUtama
          //             }
          //             onChange={(e) => {
          //               setkeluhanUtama(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={12}>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Pemeriksaan SWAB"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "100%" }}
          //             value={pemeriksaanSwab}
          //             onChange={(e) => {
          //               setpemeriksaanSwab(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Metode Pemeriksaan"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "100%" }}
          //             value={metodePemeriksaan}
          //             onChange={(e) => {
          //               setmetodePemeriksaan(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Tgl Hasil"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglKeluarHasil}
          //             onChange={(e) => {
          //               settglKeluarHasil(e);
          //             }}
          //             style={{ width: "100%" }}
          //             format={"DD-MM-YYYY"}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Sumber Informasi"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "100%" }}
          //             value={sumberInformasi}
          //             onChange={(e) => {
          //               setsumberInformasi(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //       </Col>
          //     </Row>
          //   </Card>
          // ) : jenisKeterangan === "9" ? (
          //   <Card>
          //     <Divider orientation="left">
          //       Surat Perintah Rawat Inap (SP 64)
          //     </Divider>
          //     <Row>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Diagnosa"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Select
          //             dataSource={detdiagnosa}
          //             showSearch
          //             style={{ width: "50%" }}
          //             placeholder="Pilih Diagnosa"
          //             optionFilterProp="children"
          //             value={diagnosaSuket}
          //             onChange={(e) => {
          //               setdiagnosaSuket(e);
          //             }}
          //             filterOption={(input, option) =>
          //               option.props.children
          //                 .toLowerCase()
          //                 .indexOf(input.toLowerCase()) >= 0
          //             }
          //           >
          //             {detdiagnosa.map((e) => (
          //               <Option key={e.diagnosisId}>
          //                 {e.diagnosisId + "-" + e.diagnosisDesk}
          //               </Option>
          //             ))}
          //           </Select>
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Dokter"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Select
          //             value={spriDokter}
          //             onChange={(e) => {
          //               setspriDokter(e);
          //             }}
          //             dataSource={dokterall}
          //             showSearch
          //             style={{ width: "50%" }}
          //             placeholder="..."
          //             optionFilterProp="children"
          //             filterOption={(input, option) =>
          //               option.children
          //                 .toLowerCase()
          //                 .indexOf(input.toLowerCase()) >= 0
          //             }
          //           >
          //             {dokterall.map((d) => (
          //               <Option key={d.dokterId}>{d.namaDokter}</Option>
          //             ))}
          //           </Select>
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Ruang"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Select
          //             value={spriRuangIsolasi}
          //             onChange={(e) => {
          //               setspriRuangIsolasi(e);
          //             }}
          //             dataSource={ruang}
          //             style={{ width: "50%" }}
          //             showSearch
          //             placeholder="Pilih ruang..."
          //             optionFilterProp="children"
          //             //onChange={handleCariSelect}
          //             filterOption={(input, option) =>
          //               option.props.children
          //                 .toLowerCase()
          //                 .indexOf(input.toLowerCase()) >= 0
          //             }
          //           >
          //             {ruang.map((d) => (
          //               <Option key={d.ruangId}>{d.deskripsi}</Option>
          //             ))}
          //           </Select>
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Jenis Ruang"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Select
          //             value={spriJenisRuangan}
          //             onChange={(e) => {
          //               setspriJenisRuangan(e);
          //             }}
          //             // dataSource={ruang}
          //             showSearch
          //             style={{ width: "50%" }}
          //             placeholder="Pilih ruang..."
          //             optionFilterProp="children"
          //             //onChange={handleCariSelect}
          //             filterOption={(input, option) =>
          //               option.props.children
          //                 .toLowerCase()
          //                 .indexOf(input.toLowerCase()) >= 0
          //             }
          //           >
          //             <Option key="ICU TNV">ICU TNV</Option>
          //             <Option key="ICU TNTV">ICU TNTV</Option>
          //             <Option key="ICU TTNV">ICU TTNV</Option>
          //             <Option key="ICU TTNTV">ICU TTNTV</Option>
          //             <Option key="ISOLASI TN">ISOLASI TN</Option>
          //             <Option key="ISOLASI TTN">ISOLASI TTN</Option>
          //             <Option key="NICU KHUSUS COVID-19">
          //               NICU KHUSUS COVID-19
          //             </Option>
          //           </Select>
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Tgl Hasil"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglKeluarHasil}
          //             onChange={(e) => {
          //               settglKeluarHasil(e);
          //             }}
          //             style={{ width: "50%" }}
          //             format={"DD-MM-YYYY"}
          //           />
          //         </Form.Item>
          //       </Col>
          //     </Row>
          //   </Card>
          // ) : jenisKeterangan === "11" ? (
          //   <Card>
          //     <Divider orientation="left">
          //       Laporan Pasien Covid 19 Meninggal (SP 65)
          //     </Divider>
          //     <Row>
          //       <Col span={12}>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Rujukan Dari"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "100%" }}
          //             placeholder="..."
          //             value={rujukanDari}
          //             onChange={(e) => {
          //               setrujukanDari(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Riwayat Penyakit"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <TextArea
          //             rows={4}
          //             placeholder="..."
          //             style={{ width: "100%" }}
          //             value={riwayatPenyakit}
          //             onChange={(e) => {
          //               setriwayatPenyakit(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Keluhan Utama"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <TextArea
          //             rows={4}
          //             placeholder="..."
          //             style={{ width: "100%" }}
          //             value={
          //               keluhanUtama === null || keluhanUtama === ""
          //                 ? riyawatPenyakitSekarang
          //                 : keluhanUtama
          //             }
          //             onChange={(e) => {
          //               setkeluhanUtama(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={12}>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Pemeriksaan SWAB"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "80%" }}
          //             value={pemeriksaanSwab}
          //             onChange={(e) => {
          //               setpemeriksaanSwab(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Metode Pemeriksaan"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "80%" }}
          //             value={metodePemeriksaan}
          //             onChange={(e) => {
          //               setmetodePemeriksaan(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Tgl Hasil"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglKeluarHasil}
          //             onChange={(e) => {
          //               settglKeluarHasil(e);
          //             }}
          //             style={{ width: "80%" }}
          //             format={"DD-MM-YYYY"}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Sumber Informasi"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "80%" }}
          //             value={sumberInformasi}
          //             onChange={(e) => {
          //               setsumberInformasi(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //         <Form.Item
          //           {...formItemLayouttgl2}
          //           label="Tgl Meninggal"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             disabledDate={(current) => {
          //               return current > dayjs().endOf("day");
          //             }}
          //             format="DD-MM-YYYY HH:mm"
          //             showTime
          //             value={tglMeninggal}
          //             onChange={(date) => {
          //               settglMeninggal(date);
          //               // getDokterShift(klinik.split('=').shift(), (new Date(date).getDay() + 1))
          //             }}
          //             style={{ width: "70%" }}
          //             placeholder="..."
          //           />
          //         </Form.Item>
          //       </Col>
          //     </Row>
          //   </Card>
          // ) : jenisKeterangan === "12" ? (
          //   <Card>
          //     <Divider orientation="left">
          //       Selesai Isolasi Rumah Sakit (SP 66)
          //     </Divider>
          //     <Row>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="No Surat"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "50%" }}
          //             value={noSurat}
          //             onChange={(e) => {
          //               setnoSurat(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Tgl ISOMAN"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglSlsIsoRS}
          //             onChange={(e) => {
          //               settglSlsIsoRS(e);
          //             }}
          //             style={{ width: "50%" }}
          //             format={"DD-MM-YYYY"}
          //           />
          //         </Form.Item>
          //       </Col>
          //     </Row>
          //   </Card>
          // ) : jenisKeterangan === "13" ? (
          //   <Card>
          //     <Divider orientation="left">
          //       Persetujuan Melanjutkan Isolasi Mandiri (SP 67)
          //     </Divider>
          //     <Row>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="No Surat"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "50%" }}
          //             value={noSurat}
          //             onChange={(e) => {
          //               setnoSurat(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Tgl ISOMAN"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglKeterangan}
          //             onChange={(e) => {
          //               settglKeterangan(e);
          //               settglIsomanFaskes(e);
          //             }}
          //             style={{ width: "50%" }}
          //             format={"DD-MM-YYYY"}
          //           />
          //         </Form.Item>
          //       </Col>
          //     </Row>
          //   </Card>
          // ) : jenisKeterangan === "14" ? (
          //   <Card>
          //     <Divider orientation="left">
          //       Surat Keterangan Meninggal Covid 19
          //     </Divider>
          //     <Row>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="No Surat"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "50%" }}
          //             value={noSurat}
          //             onChange={(e) => {
          //               setnoSurat(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Tgl Hasil SWAB"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglKeluarHasil}
          //             onChange={(e) => {
          //               settglKeluarHasil(e);
          //             }}
          //             style={{ width: "50%" }}
          //             format={"DD-MM-YYYY"}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Diagnosa"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Select
          //             dataSource={diagnosa}
          //             showSearch
          //             style={{ width: "50%" }}
          //             placeholder="Pilih Diagnosa"
          //             optionFilterProp="children"
          //             value={diagnosaSuket}
          //             onChange={(e) => {
          //               setdiagnosaSuket(e);
          //             }}
          //             filterOption={(input, option) =>
          //               option.props.children
          //                 .toLowerCase()
          //                 .indexOf(input.toLowerCase()) >= 0
          //             }
          //           >
          //             {diagnosa.map((d) => (
          //               <Option key={d.diagnosisId}>
          //                 {d.diagnosisId + " - " + d.diagnosisDesk}
          //               </Option>
          //             ))}
          //           </Select>
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Tgl Meninggal"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglMeninggal}
          //             onChange={(e) => {
          //               settglMeninggal(e);
          //             }}
          //             showTime
          //             style={{ width: "50%" }}
          //             format="DD-MM-YYYY HH:mm"
          //           />
          //         </Form.Item>
          //       </Col>
          //     </Row>
          //   </Card>
          // ) : jenisKeterangan === "15" ? (
          //   <Card>
          //     <Divider orientation="left">
          //       Surat Pengangukutan Jenazah Covid 19
          //     </Divider>
          //     <Row>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Tgl Hasil SWAB"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglKeluarHasil}
          //             onChange={(e) => {
          //               settglKeluarHasil(e);
          //             }}
          //             style={{ width: "50%" }}
          //             format={"DD-MM-YYYY"}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Diagnosa"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Select
          //             dataSource={diagnosa}
          //             showSearch
          //             style={{ width: "50%" }}
          //             placeholder="Pilih Diagnosa"
          //             optionFilterProp="children"
          //             value={diagnosaSuket}
          //             onChange={(e) => {
          //               setdiagnosaSuket(e);
          //             }}
          //             filterOption={(input, option) =>
          //               option.props.children
          //                 .toLowerCase()
          //                 .indexOf(input.toLowerCase()) >= 0
          //             }
          //           >
          //             {diagnosa.map((d) => (
          //               <Option key={d.diagnosisId}>
          //                 {d.diagnosisId + " - " + d.diagnosisDesk}
          //               </Option>
          //             ))}
          //           </Select>
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Tgl Meninggal"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglMeninggal}
          //             onChange={(e) => {
          //               settglMeninggal(e);
          //             }}
          //             style={{ width: "50%" }}
          //             format="DD-MM-YYYY HH:mm"
          //             showTime
          //           />
          //         </Form.Item>
          //       </Col>
          //     </Row>
          //   </Card>
          // ) : jenisKeterangan === "16" ? (
          //   <Card>
          //     <Divider orientation="left">
          //       Surat Pernyataan ISOMAN di Fasilitas Kesehatan
          //     </Divider>
          //     <Row>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Tgl Surat"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglIsomanFaskes}
          //             onChange={(e) => {
          //               settglIsomanFaskes(e);
          //             }}
          //             style={{ width: "50%" }}
          //             format={"DD-MM-YYYY"}
          //           />
          //         </Form.Item>
          //       </Col>
          //     </Row>
          //   </Card>
          // ) : jenisKeterangan === "10" ? (
          //   <Card>
          //     <Divider orientation="left">
          //       Surat Pernyataan Penggantian Pembayaran Covid-19
          //     </Divider>
          //     <Row>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Tgl Surat"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <DatePicker
          //             value={tglKeterangan}
          //             onChange={(e) => {
          //               settglKeterangan(e);
          //             }}
          //             style={{ width: "50%" }}
          //             format={"DD-MM-YYYY"}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Nama"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "50%" }}
          //             placeholder="..."
          //             value={namaPj}
          //             onChange={(e) => {
          //               setnamaPj(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="No Identitas"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Input
          //             style={{ width: "50%" }}
          //             placeholder="..."
          //             value={noPj}
          //             onChange={(e) => {
          //               setnoPj(e.target.value);
          //             }}
          //           />
          //         </Form.Item>
          //       </Col>
          //       <Col span={24}>
          //         <Form.Item
          //           {...formItemLayouttgl}
          //           label="Hubungan"
          //           style={{ marginBottom: 5 }}
          //         >
          //           <Select
          //             dataSource={hubungan}
          //             showSearch
          //             value={hubPj}
          //             style={{ width: "50%" }}
          //             placeholder="Pilih Hubungan..."
          //             optionFilterProp="children"
          //             onChange={(e) => {
          //               sethubPj(e);
          //             }}
          //             filterOption={(input, option) =>
          //               option.props.children
          //                 .toLowerCase()
          //                 .indexOf(input.toLowerCase()) >= 0
          //             }
          //           >
          //             {hubungan.map((d) => (
          //               <Option key={d.hubunganId}>{d.deskripsi}</Option>
          //             ))}
          //           </Select>
          //         </Form.Item>
          //       </Col>
          //     </Row>
          //   </Card>
          null}
        </Col>
      </Row>

      <Card>
        <Row>
          <Col span={12}>
            <Space>
              {verified ? (
                <Alert message="Sudah Diverifikasi" type="success" />
              ) : suratKeteranganId === 0 ? (
                <>
                  <Button disabled>Verifikasi</Button>
                </>
              ) : (
                <Popconfirm
                  title="Apakah Data Sudah Benar?"
                  onConfirm={(e) =>
                    insertVerifDokter({
                      registrasiId: curpasRI.registrasiId,
                      jenisKeterangan: jenisKeterangan,
                    })
                  }
                  // onCancel={console.log("")}
                  okText="Ya"
                  cancelText="Tidak"
                >
                  <Button disabled={verified ? true : false}>Verifikasi</Button>
                </Popconfirm>
              )}
              {suratKeteranganId === 0 ? (
                <>
                  <Button disabled>cetak</Button>
                </>
              ) : (
                <Button
                  onClick={() => {
                    getPrintSuket(
                      curpasRI.registrasiId,
                      jenisKeterangan === "4"
                        ? "SUKETSAKIT"
                        : jenisKeterangan === "5"
                        ? "SUKETDIRAWAT"
                        : jenisKeterangan === "6"
                        ? "SUKETMENINGGAL"
                        : jenisKeterangan === "7"
                        ? "SUKETJENAZAH"
                        : ""
                    );
                  }}
                >
                  cetak
                </Button>
              )}
            </Space>
          </Col>

          <Col span={12} style={{ textAlign: "right" }}>
            <Space>
              {/* {suratKeteranganId === null ? (
                <></>
              ) : (
                <Popconfirm
                  title="Apakah Yakin?"
                  onConfirm={(e) =>
                    deleteSuket(curpasRI.registrasiId, jenisKeterangan)
                  }
                  onCancel={console.log("")}
                  okText="Ya"
                  cancelText="Tidak"
                >
                  <Button disabled={verified ? true : false} danger>
                    Hapus
                  </Button>
                </Popconfirm>
              )} */}
              <Button
                onClick={() => {
                  setjenisKeterangan("");
                  setsuratKeteranganId(0);
                }}
              >
                Batal
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  jenisKeterangan === "6" || jenisKeterangan === "7"
                    ? setwarning2(true)
                    : insertSuket(dataSuket);
                  console.log(dataSuket);
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
      <Modal
        closable={false}
        open={warning1}
        footer={[
          <Button
            key="submit"
            onClick={() => {
              setwarning1(false);
            }}
          >
            Tidak
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              setwarning3(true);
              setwarning1(false);
            }}
          >
            YA
          </Button>,
        ]}
      >
        <Alert
          message="PASIEN MENINGGAL!"
          description="Apakah Pasien Pulang Dalam Keadaan Meninggal."
          type="error"
          showIcon
        />
        <Form.Item {...formItemLayoutdpjp} style={{ marginBottom: 5 }}>
          <Title level={2}>{curpasRI.namaPasien}</Title>
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No RM"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.pasienId}
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No Registrasi"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.registrasiId}
        </Form.Item>
      </Modal>

      <Modal
        closable={false}
        open={warning2}
        footer={[
          <Button
            key="submit"
            onClick={() => {
              setwarning2(false);
            }}
          >
            Tidak
          </Button>,
          <Button
            type="primary"
            onClick={() => {
              insertSuket(dataSuket);
            }}
          >
            YA
          </Button>,
        ]}
      >
        <Alert
          message="PASIEN MENINGGAL!"
          description="Apakah Pasien Pulang Dalam Keadaan Meninggal."
          type="error"
          showIcon
        />
        <Form.Item {...formItemLayoutdpjp} style={{ marginBottom: 5 }}>
          <Title level={2}>{curpasRI.namaPasien}</Title>
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No RM"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.pasienId}
        </Form.Item>
        <Form.Item
          {...formItemLayoutdpjp}
          label="No Registrasi"
          style={{ marginBottom: 1 }}
        >
          {curpasRI.registrasiId}
        </Form.Item>
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={modalSuket}
        onCancel={() => {
          setModalSuket(false);
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
          url={printSuket}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
    </div>
  );
};
export default FormSuratKeterangan;
