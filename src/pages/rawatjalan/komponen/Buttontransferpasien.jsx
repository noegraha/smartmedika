import React, { useState, useContext } from "react";
import {
  Modal,
  Button,
  DatePicker,
  Input,
  Card,
  Row,
  Col,
  Radio,
  Form,
  Checkbox,
  Select,
  Tooltip,
  message,
} from "antd";
import Pagehead from "../pagehead";
import dayjs from "dayjs";
import { PasienContext } from "../context/PasienContext";
import { PelayananContext } from "../context/Pelayanancontext";
import { TransferPasienContext } from "../context/TransferPasienContext";
const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const ButtonTransferpasien = () => {
  const [visible, setVisible] = useState(false);
  const { indikasi } = useContext(PelayananContext);
  const { curpas, ruangan } = useContext(PasienContext);
  const {
    insertTransfer,
    indikasidirawat,
    setIndikasi,
    ruanganmasuk,
    setRuang,
    nama,
    setNama,
    tanggal,
    setTanggal,
    tanggaltransfer,
    setTanggalTransfer,
    dokter,
    setDokter,
    perawat,
    setPerawat,
    pramu,
    setPramu,
    sopir,
    setSopir,
    level,
    setLeveling,
    anamnesa,
    setAnamnesa,
    diagnosa,
    setDiagnosa,
    indikasin,
    setIndikasin,
    tindakan,
    setTindakan,
    terapi,
    setTerapi,
    resiko,
    setResiko,
    barang,
    setBarang,
    lain,
    setLain,
    tensiatassebelum,
    setTensiAtasSebelum,
    tensibawahsebelum,
    setTensiBawahSebelum,
    nadisebelum,
    setNadiSebelum,
    rrsebelum,
    setRRSebelum,
    suhusebelum,
    setSuhuSebelum,
    respsebelum,
    setRespSebelum,
    pemfisiksebelum,
    setPemfisikSebelum,
    lainlainsebelum,
    setLainlainSebelum,
    tensiatassesudah,
    setTensiAtasSesudah,
    tensibawahsesudah,
    setTensiBawahSesudah,
    nadisesudah,
    setNadiSesudah,
    rrsesudahs,
    setRRSesudah,
    suhusesudah,
    setSuhuSesudah,
    respsesudah,
    setRespSesudah,
    pemfisiksesudah,
    setPemfisikSesudah,
    lainlainsesudah,
    setLainlainSesudah,
    tanggalserah,
    setTanggalserah,
    acls,
    setACLS,
    atls,
    setATLS,
    apn,
    setAPN,
    ppgd,
    setPPGD,
    bls1,
    setBLS1,
    bls2,
    setBLS2,
    rm,
    setRM,
    obatoral,
    setObatoral,
    obatinjeksi,
    setObatinjeksi,
    obatpasien,
    setObatpasien,
    laborat,
    setLaborat,
    mri,
    setMRI,
    ctscan,
    setCTscan,
    usg,
    setUSG,
    rontgen,
    setRontgen,
    lainnya,
    setLainnya,
    petugas1,
    setPetugas1,
    petugas2,
    setPetugas2,
    bed,
    setBed,
    kursi,
    setKursi,
    brankart,
    setBrankart,
    isi,
    detailTransfer,
  } = useContext(TransferPasienContext);

  const noreg = sessionStorage.getItem("noreg");

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const namauser = sessionStorage.getItem("userId");
  // const noreg = sessionStorage.getItem("noreg");
  const datatransferpasien = {
    registrasiId: curpas.registrasiId,
    ruangAsal: curpas.ruangId,
    ruangTuju: ruanganmasuk,
    petugasDihubungi: nama,
    tanggalHub: dayjs(tanggal).format("YYYY-MM-DDTHH:mm:ss"),
    jamHub: dayjs(tanggal).format("YYYY-MM-DDTHH:mm:ss"),
    tanggalTransfer: dayjs(tanggaltransfer).format("YYYY-MM-DDTHH:mm:ss"),
    jamTransfer: dayjs(tanggaltransfer).format("YYYY-MM-DDTHH:mm:ss"),
    leveling: String(level),
    petugasDokter: dokter,
    petugasPerawat: perawat,
    pramuRuang: pramu,
    sopir: sopir,
    acls: acls,
    atls: atls,
    apn: apn,
    ppgd: ppgd,
    bls1: bls1,
    bls2: bls2,
    tanggalMasuk: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    jamMasuk: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    anamnesa: anamnesa,
    diagnosa: diagnosa,
    indikasiDirawat: indikasin,
    tindakan: tindakan,
    terapi: terapi,
    resiko: String(resiko),
    trkursi: kursi,
    trbed: bed,
    trbrankart: brankart,
    dokumen: rm,
    obatOral: obatoral,
    obatInjeksi: obatinjeksi,
    obatPasien: obatpasien,
    obatLain: false,
    hasilLab: laborat,
    hasilMri: mri,
    hasilCtscan: ctscan,
    hasilUsg: usg,
    hasilRontgen: rontgen,
    hasilLain: lainnya,
    barangPasien: barang,
    lainLain: lain,
    sposebelum: String(respsebelum),
    pemeriksaanFisikSebelum: pemfisiksebelum,
    kulainSebelum: lainlainsebelum,
    tensiAtasSebelum: String(tensiatassebelum),
    tensiBawahSebelum: String(tensibawahsebelum),
    nadiSebelum: String(nadisebelum),
    rrsebelum: String(rrsebelum),
    suhuSebelum: String(suhusebelum),
    tensiAtasSesudah: String(tensiatassesudah),
    tensiBawahSesudah: String(tensibawahsesudah),
    nadiSesudah: String(nadisesudah),
    rrsesudah: String(rrsesudahs),
    suhuSesudah: String(suhusesudah),
    sposesudah: String(respsesudah),
    pemeriksaanFisikSesudah: pemfisiksesudah,
    kulainSesudah: lainlainsesudah,
    tanggalSerah: dayjs(tanggalserah).format("YYYY-MM-DDTHH:mm:ss"),
    jamSerah: dayjs(tanggalserah).format("YYYY-MM-DDTHH:mm:ss"),
    petugas1: petugas1,
    petugas2: petugas2,
    // ttd1: "string",
    // ttd2: "string",
    userId: namauser,
    clientHost: host,
    clientIP: ip,
  };
  const onMV = (e) => {
    setVisible(true);
  };
  const onTanggal = (date, dateString) => {
    setTanggal(date);
    console.log(date);
  };
  const onTanggalTransfer = (date, dateString) => {
    setTanggalTransfer(date);
  };
  const onTanggalserah = (date, dateString) => {
    setTanggalserah(date);
  };
  const onSubmit = (e) => {
    if (ruanganmasuk === null) {
      Modal.warning({ content: "Ruangan belum dipilih!" });
    } else {
      insertTransfer(datatransferpasien);
      setVisible(false);
      console.log(datatransferpasien);
    }
  };
  const onCancel = (e) => {
    setVisible(false);
  };
  const handleChange = (e) => {
    setIndikasi(e);
    setIndikasin(e);
    // console.log(e);
  };
  return (
    <div>
      <Button
        size="small"
        type="primary"
        onClick={() => {
          if (curpas.ruangKonsul === null) {
            onMV();
            detailTransfer(noreg);
          } else if (curpas.ruangId !== curpas.ruangKonsul.slice(-4)) {
            message.warning(
              "Tidak Bisa Dirawat jika belum dijawab / Bukan Alih Rawat!"
            );
          } else {
            onMV();
            detailTransfer(noreg);
          }
        }}
      >
        Transfer Pasien
      </Button>
      <Modal
        title="Transfer Pasien"
        style={{ top: 20 }}
        width="1200px"
        open={visible}
        onOk={(e) => onSubmit(e)}
        onCancel={(e) => onCancel(e)}
      >
        <div>
          <Pagehead />
          <Form name="basic" initialValues={{ remember: true }}>
            <Card
              size="small"
              style={{ backgroundColor: "#f9d1b9", alignContent: "center" }}
            >
              Indikasi dirawat :{"  "}
              <Select
                value={indikasin}
                dataSource={indikasi}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {indikasi.map((d) => (
                  <Option key={d.deskripsi}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Card>

            <Row>
              <Col span={16}>
                <Card
                  size="small"
                  title="Petugas Ruangan Tujuan yang dihubungi"
                >
                  <Row>
                    <Col span={16}>
                      Nama : <Input onChange={(e) => setNama(e.target.value)} />
                    </Col>
                    <Col span={8}>
                      Tanggal/Jam : <br />
                      <DatePicker
                        style={{ width: "100%" }}
                        onChange={onTanggal}
                        format="DD-MM-YYYY HH:mm"
                        showTime
                        value={tanggal}
                      />
                    </Col>
                    {/* <Col span={6}>
                    Jam : <br /><TimePicker onChange={onJam} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
                  </Col> */}
                  </Row>
                </Card>
              </Col>
              <Col span={8}>
                <Card size="small" title="Transfer">
                  <Row>
                    <Col span={24}>
                      Tanggal/Jam : <br />
                      <DatePicker
                        style={{ width: "100%" }}
                        onChange={onTanggalTransfer}
                        format="DD-MM-YYYY HH:mm"
                        showTime
                        value={tanggaltransfer}
                      />
                    </Col>
                    {/* <Col span={12}>
                    Jam : <br /><TimePicker onChange={onJam} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
                  </Col> */}
                  </Row>
                </Card>
              </Col>
            </Row>
            <Row>
              <Col span={10}>
                <Card size="small" title="Petugas Pendamping">
                  <Form.Item
                    rules={[{ required: true, message: "Please input !" }]}
                    {...formItemLayout}
                    label="Dokter"
                    style={{ marginBottom: 0 }}
                  >
                    <Input onChange={(e) => setDokter(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: "Please input !" }]}
                    {...formItemLayout}
                    label="Perawat"
                    style={{ marginBottom: 0 }}
                  >
                    <Input onChange={(e) => setPerawat(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: "Please input !" }]}
                    {...formItemLayout}
                    label="Pramu Ruang"
                    style={{ marginBottom: 0 }}
                  >
                    <Input onChange={(e) => setPramu(e.target.value)} />
                  </Form.Item>
                  <Form.Item
                    rules={[{ required: true, message: "Please input !" }]}
                    {...formItemLayout}
                    label="Sopir/Satpam"
                    style={{ marginBottom: 0 }}
                  >
                    <Input onChange={(e) => setSopir(e.target.value)} />
                  </Form.Item>
                </Card>
                <Card size="small">
                  <Form.Item
                    {...formItemLayout}
                    label="Anamnesa"
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      value={anamnesa}
                      rows={2}
                      onChange={(e) => setAnamnesa(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Diagnosa"
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      value={isi}
                      rows={2}
                      onChange={(e) => setDiagnosa(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Indikasi Di Rawat"
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      rows={2}
                      value={indikasidirawat}
                      onChange={(e) => setIndikasin(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Tindakan"
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      rows={2}
                      value={tindakan}
                      onChange={(e) => setTindakan(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Terapi/Plan"
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      value={terapi}
                      rows={2}
                      onChange={(e) => setTerapi(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Resiko"
                    style={{ marginBottom: 0 }}
                  >
                    <Select
                      defaultValue={"1"}
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={resiko}
                      onChange={(e) => setResiko(e)}
                    >
                      <Option value={"1"}>Tidak Ada Resiko</Option>
                      <Option value={"2"}>Resiko Rendah</Option>
                      <Option value={"3"}>Resiko Tinggi</Option>
                    </Select>
                  </Form.Item>
                </Card>
              </Col>
              <Col span={14}>
                <Row>
                  <Col span={7}>
                    <Card size="small" title="Kualifikasi">
                      <Row>
                        <Checkbox.Group style={{ width: "100%" }}>
                          <Form.Item style={{ marginBottom: 0 }}>
                            <Checkbox
                              value="A"
                              onChange={(e) => setACLS(e.target.checked)}
                            >
                              ACLS
                            </Checkbox>
                            <Checkbox
                              value="B"
                              onChange={(e) => setATLS(e.target.checked)}
                            >
                              ATLS
                            </Checkbox>
                          </Form.Item>
                        </Checkbox.Group>
                      </Row>
                      <Row>
                        <Form.Item style={{ marginBottom: 0 }}>
                          <Checkbox
                            value="C"
                            onChange={(e) => setPPGD(e.target.checked)}
                          >
                            BT-CLS/PPGD
                          </Checkbox>
                          <Checkbox
                            value="E"
                            onChange={(e) => setAPN(e.target.checked)}
                          >
                            APN
                          </Checkbox>
                        </Form.Item>
                      </Row>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Checkbox
                          value="D"
                          onChange={(e) => setBLS1(e.target.checked)}
                        >
                          BLS/BHD
                        </Checkbox>
                      </Form.Item>
                      <Form.Item style={{ marginBottom: 0 }}>
                        <Checkbox
                          value="F"
                          onChange={(e) => setBLS2(e.target.checked)}
                        >
                          BLS/BHD
                        </Checkbox>
                      </Form.Item>
                    </Card>
                    <Card size="small" title="Kategori Pasien">
                      <Radio.Group
                        onChange={(e) => setLeveling(e.target.value)}
                      >
                        <Radio value={1}>Level 0</Radio>
                        <Radio value={2}>Level 1</Radio>
                        <Radio value={3}>Level 2</Radio>
                        <Radio value={4}>Level 3</Radio>
                      </Radio.Group>
                    </Card>
                  </Col>
                  <Col span={17}>
                    <Card size="small" title="Ringkasan Kondisi Umum Pasien">
                      <Form
                        name="complex-form"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                      >
                        <Form.Item
                          label="TD (mmhg)"
                          style={{ marginBottom: 0 }}
                        >
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              marginBottom: 0,
                            }}
                          >
                            <Input.Group compact>
                              <Tooltip title="Tensi Atas">
                                <Input
                                  value={tensiatassebelum}
                                  placeholder="Sebelum"
                                  onChange={(e) =>
                                    setTensiAtasSebelum(e.target.value)
                                  }
                                  style={{ width: "50%" }}
                                />
                              </Tooltip>
                              <Tooltip title="Tensi Bawah">
                                <Input
                                  value={tensibawahsebelum}
                                  placeholder="Sebelum"
                                  onChange={(e) =>
                                    setTensiBawahSebelum(e.target.value)
                                  }
                                  style={{ width: "50%" }}
                                />
                              </Tooltip>
                            </Input.Group>
                          </Form.Item>
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              margin: "0 8px 0",
                            }}
                          >
                            <Tooltip title="Tensi Atas">
                              <Input
                                value={tensiatassesudah}
                                placeholder="Sebelum"
                                onChange={(e) =>
                                  setTensiAtasSesudah(e.target.value)
                                }
                                style={{ width: "50%" }}
                              />
                            </Tooltip>
                            <Tooltip title="Tensi Bawah">
                              <Input
                                value={tensibawahsesudah}
                                placeholder="Sebelum"
                                onChange={(e) =>
                                  setTensiBawahSesudah(e.target.value)
                                }
                                style={{ width: "50%" }}
                              />
                            </Tooltip>
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          label="HR (x/mnt)"
                          style={{ marginBottom: 0 }}
                        >
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              marginBottom: 0,
                            }}
                          >
                            <Input
                              value={nadisebelum}
                              placeholder="Sebelum"
                              onChange={(e) => setNadiSebelum(e.target.value)}
                            />
                          </Form.Item>
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              margin: "0 8px",
                            }}
                          >
                            <Input
                              value={nadisesudah}
                              placeholder="Sebelum"
                              onChange={(e) => setNadiSesudah(e.target.value)}
                            />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          label="RR (x/mnt)"
                          style={{ marginBottom: 0 }}
                        >
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              marginBottom: 0,
                            }}
                          >
                            <Input
                              value={rrsebelum}
                              placeholder="Sebelum"
                              onChange={(e) => setRRSebelum(e.target.value)}
                            />
                          </Form.Item>
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              margin: "0 8px",
                            }}
                          >
                            <Input
                              value={rrsesudahs}
                              placeholder="Sebelum"
                              onChange={(e) => setRRSesudah(e.target.value)}
                            />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          label="Suhu (°C)"
                          style={{ marginBottom: 0 }}
                        >
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              marginBottom: 0,
                            }}
                          >
                            <Input
                              value={suhusebelum}
                              placeholder="Sebelum"
                              onChange={(e) => setSuhuSebelum(e.target.value)}
                            />
                          </Form.Item>
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              margin: "0 8px",
                            }}
                          >
                            <Input
                              value={suhusesudah}
                              placeholder="Sebelum"
                              onChange={(e) => setSuhuSesudah(e.target.value)}
                            />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item label="SpO2" style={{ marginBottom: 0 }}>
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              marginBottom: 0,
                            }}
                          >
                            <Input
                              value={respsebelum}
                              placeholder="Sebelum"
                              onChange={(e) => setRespSebelum(e.target.value)}
                            />
                          </Form.Item>
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              margin: "0 8px",
                            }}
                          >
                            <Input
                              value={respsesudah}
                              placeholder="Sebelum"
                              onChange={(e) => setRespSesudah(e.target.value)}
                            />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          label="Pem. Fisik"
                          style={{ marginBottom: 0 }}
                        >
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              marginBottom: 0,
                            }}
                          >
                            <TextArea
                              value={pemfisiksebelum}
                              row={1}
                              onChange={(e) =>
                                setPemfisikSebelum(e.target.value)
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              margin: "0 8px",
                            }}
                          >
                            <TextArea
                              value={pemfisiksesudah}
                              row={1}
                              onChange={(e) =>
                                setPemfisikSesudah(e.target.value)
                              }
                            />
                          </Form.Item>
                        </Form.Item>
                        <Form.Item
                          label="Lain-lain"
                          style={{ marginBottom: 0 }}
                        >
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              marginBottom: 0,
                            }}
                          >
                            <TextArea
                              value={lainlainsebelum}
                              row={1}
                              onChange={(e) =>
                                setLainlainSebelum(e.target.value)
                              }
                            />
                          </Form.Item>
                          <Form.Item
                            style={{
                              display: "inline-block",
                              width: "calc(50% - 8px)",
                              margin: "0 8px",
                            }}
                          >
                            <TextArea
                              value={lainlainsesudah}
                              row={1}
                              onChange={(e) =>
                                setLainlainSesudah(e.target.value)
                              }
                            />
                          </Form.Item>
                        </Form.Item>
                      </Form>
                    </Card>
                  </Col>
                </Row>
                <Card size="small" title="Yang Turut Diserahkan">
                  <Form.Item
                    {...formItemLayout}
                    label="Data"
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox onChange={(e) => setRM(e.target.checked)}>
                      Rekam Medik Pasien
                    </Checkbox>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Obat"
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox.Group style={{ width: "100%" }}>
                      <Checkbox
                        value="OA"
                        onChange={(e) => setObatoral(e.target.checked)}
                      >
                        Obat Oral
                      </Checkbox>
                      <Checkbox
                        value="OB"
                        onChange={(e) => setObatinjeksi(e.target.checked)}
                      >
                        Obat Injeksi
                      </Checkbox>
                      <Checkbox
                        value="OC"
                        onChange={(e) => setObatpasien(e.target.checked)}
                      >
                        Obat Pasien yang dibawa
                      </Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Hasil Pemeriksaan Penunjang"
                    style={{
                      marginBottom: 0,
                      textAlign: "left",
                      whiteSpace: "normal",
                      height: "auto",
                    }}
                  >
                    <Checkbox.Group style={{ width: "100%" }}>
                      <Checkbox
                        value="HA"
                        onChange={(e) => setLaborat(e.target.checked)}
                      >
                        Laboratorium
                      </Checkbox>
                      <Checkbox
                        value="HB"
                        onChange={(e) => setMRI(e.target.checked)}
                      >
                        MRI
                      </Checkbox>
                      <Checkbox
                        value="HC"
                        onChange={(e) => setCTscan(e.target.checked)}
                      >
                        CT-Scan
                      </Checkbox>
                      <Checkbox
                        value="HD"
                        onChange={(e) => setUSG(e.target.checked)}
                      >
                        USG
                      </Checkbox>
                      <Checkbox
                        value="HE"
                        onChange={(e) => setRontgen(e.target.checked)}
                      >
                        Rontgen
                      </Checkbox>
                      <Checkbox
                        value="HF"
                        onChange={(e) => setLainnya(e.target.checked)}
                      >
                        Lainnya
                      </Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Barang Pasien"
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      rows={1}
                      onChange={(e) => setBarang(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Lain-lain"
                    style={{ marginBottom: 0 }}
                  >
                    <TextArea
                      rows={1}
                      onChange={(e) => setLain(e.target.value)}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout}
                    label="Transportasi yang digunakan"
                    style={{ marginBottom: 0 }}
                  >
                    <Checkbox.Group style={{ width: "100%" }}>
                      <Checkbox
                        value="TA"
                        onChange={(e) => setKursi(e.target.checked)}
                      >
                        Kursi roda
                      </Checkbox>
                      <Checkbox
                        value="TB"
                        onChange={(e) => setBed(e.target.checked)}
                      >
                        Bed Strechter
                      </Checkbox>
                      <Checkbox
                        value="TC"
                        onChange={(e) => setBrankart(e.target.checked)}
                      >
                        Brankart
                      </Checkbox>
                    </Checkbox.Group>
                  </Form.Item>
                </Card>
              </Col>
            </Row>
            <Card size="small" title="Nama dan Tanda Tangan Petugas">
              <Form.Item
                {...formItemLayout}
                label="Yang Menyerahkan"
                style={{ marginBottom: 0 }}
              >
                <Input onChange={(e) => setPetugas1(e.target.value)} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Yang Menerima"
                style={{ marginBottom: 0 }}
              >
                <Input onChange={(e) => setPetugas2(e.target.value)} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Tanggal"
                style={{ marginBottom: 0 }}
              >
                <DatePicker
                  style={{ width: "100%" }}
                  onChange={onTanggalserah}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                  value={tanggalserah}
                />
              </Form.Item>
              {/* <Form.Item {...formItemLayout} label="Jam" style={{ marginBottom: 0 }}>
              <TimePicker onChange={(e) => { onJam(e) }} defaultOpenValue={dayjs('00:00:00', 'HH:mm:ss')} />
            </Form.Item> */}
              <Form.Item
                {...formItemLayout}
                label="Ruang"
                style={{ marginBottom: 0 }}
                required
              >
                <Select
                  value={ruanganmasuk}
                  dataSource={ruangan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Ruang"
                  optionFilterProp="children"
                  onChange={(e) => setRuang(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {ruangan.map((p) => (
                    <Option key={p.ruangId}>{p.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Card>
          </Form>
        </div>
      </Modal>
    </div>
  );
};

export default ButtonTransferpasien;
