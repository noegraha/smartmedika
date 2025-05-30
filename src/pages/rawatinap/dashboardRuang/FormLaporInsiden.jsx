import React, { useContext, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Card,
  Button,
  message,
  Popconfirm,
  Space,
  Descriptions,
  DatePicker,
  Select,
  Modal,
  Empty,
  Table,
  AutoComplete,
} from "antd";
import Iframe from "react-iframe";

import Column from "antd/lib/table/Column";
import dayjs from "dayjs";
import { InsidenContext } from "../context/InsidenContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";

const { TextArea } = Input;
const { Option } = Select;
const formItemLayoutFull = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const FormLaporInsiden = () => {
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY HH:mm";
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const [sSkey, setsSkey] = useState("");
  const [sSkeyRuang, setsSkeyRuang] = useState([]);
  const {
    curpasRI,
    ruang,
    ruangRi,
    detailPasienRI,
    listRuangBylayanan,
    getRuangByKodeLayanan,
    listPasienBySkeyRuang,
    getListPasienBySkeyRuang,
  } = useContext(PasienRIContext);
  const [modalCariPasien, setmodalCariPasien] = useState(false);
  const [modalCetak, setmodalCetak] = useState(false);

  const {
    getListInsiden,
    getInsidenDetail,
    insertInsiden,
    cariNoreg,
    setcariNoreg,
    regisIdInsiden,
    setregisIdInsiden,
    tanggalKejadian,
    setTanggalKejadian,
    insiden,
    setInsiden,
    kronologisInsiden,
    setKronologisInsiden,
    jenisInsiden,
    setJenisInsiden,
    pelaporInsiden,
    setPelaporInsiden,
    // lainnyapelapor, setLainnyapelapor,
    namaPelapor,
    setNamaPelapor,
    korbanInsiden,
    setKorbanInsiden,
    // lainyaKorban, setLainyaKorban,
    namaKorban,
    setNamaKorban,
    insidenTerkaitPasien,
    setInsidenTerkaitPasien,
    // lainyaRuangKejadian, setLainyaRuangKejadian,
    tempatKejadian,
    setTempatKejadian,
    spesialisPenyakitInsiden,
    setSpesialisPenyakitInsiden,
    // lainyaSubspesialis, setLainyaSubspesialis,
    unitPenyebab,
    setUnitPenyebab,
    akibatTerhadapPasien,
    setAkibatTerhadapPasien,
    tindakanPascaInsiden,
    setTindakanPascaInsiden,
    pelakuTindakan,
    setPelakuTindakan,
    // lainyaPelakuTindakan, setLainyaPelakuTindakan,
    namaPelakuTindakan,
    setNamaPelakuTindakan,
    tidakanSerupa,
    setTidakanSerupa,
    // tanggalSebelumnya, setTanggalSebelumnya,
    kronologiSebelumnya,
    setKronologiSebelumnya,
    pasienAda,
    setPasienAda,
    insidenId,
    setinsidenId,
    pembuatLaporan,
    setpembuatLaporan,
    tglLaporan,
    settglLaporan,
    penerimaLaporan,
    setpenerimaLaporan,
    tglDiterima,
    settglDiterima,
    kosongkanForm,
    visibleTanbah,
    setvisibleTanbah,
    print,
    getprint,
  } = useContext(InsidenContext);
  const optionsJenisInsiden = [
    { value: "Kejadian Nyaris Cidera / KNC (Near Miss)" },
    { value: "Kejadian Tidak Cidera / KTC (No Harm)" },
    { value: "Kejadian Tidak Diharapkan / KTD (Adverse Event)" },
  ];
  const optionsPelaporInsiden = [
    { value: "Dokter" },
    { value: "Perawat" },
    { value: "Pasien" },
    { value: "Keluarga / Pendamping Pasien" },
    { value: "Pengunjung" },
  ];
  const optionsInsidenTerkaitPasien = [
    { value: "Pasien Rawat Inap" },
    { value: "Pasien Rawat Jalan" },
    { value: "Pasien IGD" },
    { value: "Penunjang Medis" },
    { value: "Penunjang NonMedis" },
    { value: "Struktural" },
    { value: "Apotik Farmasi" },
  ];
  const optionsSpesialisPenyakitInsiden = [
    { value: "Penyakit Dalam Dan Subspesialisnya" },
    { value: "Bedah Dan Subspesialisnya" },
    { value: "Obstetri Gynekologi Dan Subspesialisnya" },
    { value: "THT Dan Subspesialisnya" },
    { value: "Mata Dan Subspesialisnya" },
    { value: "Saraf Dan Subspesialisnya" },
    { value: "Anastesi Dan Subspesialisnya" },
    { value: "Kulit Dan Kelamin Dan Subspesialisnya" },
    { value: "Jantung Dan Subspesialisnya" },
    { value: "Paru Dan Subspesialisnya" },
    { value: "Jiwa Dan Subspesialisnya" },
  ];
  const optionsakibatInsiden = [
    { value: "Kematian" },
    { value: "Cedera Irreversible / Cedera Berat" },
    { value: "Cedera Reversible / Cedera Sedang" },
    { value: "Cedera Ringan" },
    { value: "Tidak Ada Cedera" },
  ];
  const optionsPetugasTindakan = [{ value: "Dokter" }, { value: "Perawat" }];
  const dataInsiden = {
    insidenId: insidenId,
    registrasiId: curpasRI.registrasiId,
    tanggal: dayjs(tanggalKejadian).format("YYYY-MM-DDTHH:mm:ss.sssZ"),
    insiden: insiden,
    kronologi: kronologisInsiden,
    jenisInsiden: jenisInsiden,
    pelapor: pelaporInsiden,
    namaPelapor: namaPelapor,
    insidenPada: korbanInsiden,
    namaKorban: korbanInsiden === "Pasien" ? curpasRI.namaPasien : namaKorban,
    insidenTerkaitPasien: insidenTerkaitPasien,
    tempatKejadian: tempatKejadian,
    spesialisPenyakitInsiden: spesialisPenyakitInsiden,
    unitPenyebab: unitPenyebab,
    akibatInsidenTerhadapPasien: akibatTerhadapPasien,
    tindakanPascaInsiden: tindakanPascaInsiden,
    pelakuTindakan: pelakuTindakan,
    namaPelakuTindakan: namaPelakuTindakan,
    pernahTerjadi: tidakanSerupa,
    tempatInsidenSebelumnya: kronologiSebelumnya,
    pembuatLaporan: namauser,
    tglLaporan: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientHost: host,
    clientIP: ip,
    // penerimaLaporan: penerimaLaporan,
    // tglDiterima: tglDiterima === null ? null : dayjs(tglDiterima).format("YYYY-MM-DDTHH:mm")
  };

  return (
    <div>
      <Form form={form}>
        <Card
          size="small"
          title="Form Input Insiden Pasien"
          headStyle={{ fontWeight: "bolder", backgroundColor: "beige" }}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull}
                label="Cari Pasien"
                style={{ marginBottom: 5 }}
              >
                <Row gutter={[20, 7]}>
                  <Col span={20}>
                    <Input
                      type="text"
                      placeholder="Silahkan Masukan Nomor Registrasi Pasien"
                      value={cariNoreg}
                      onChange={(e) => {
                        setcariNoreg(e.target.value);
                      }}
                    />
                  </Col>
                  <Col span={4}>
                    <Button
                      style={{ width: "100%" }}
                      type="primary"
                      style={{ backgroundColor: "#17a2b8", width: "100%" }}
                      onClick={() => {
                        cariNoreg === "" ||
                        cariNoreg === " " ||
                        cariNoreg === [] ||
                        cariNoreg === undefined
                          ? setmodalCariPasien(true)
                          : detailPasienRI(cariNoreg);
                        // console.log(curpasRI.registrasiId);
                      }}
                    >
                      Cari
                    </Button>
                  </Col>
                </Row>
              </Form.Item>
              {curpasRI.registrasiId === undefined ? (
                <div> </div>
              ) : (
                <div>
                  <Form.Item
                    {...formItemLayoutFull}
                    label="Info Pasien"
                    style={{ marginBottom: 5 }}
                  >
                    <Card>
                      <Descriptions
                        size="small"
                        column={{ xxl: 4, xl: 4, lg: 3, md: 3, sm: 2, xs: 2 }}
                      >
                        <Descriptions.Item label="No Registrasi">
                          {curpasRI.registrasiId}
                        </Descriptions.Item>
                        <Descriptions.Item label="No Pasien">
                          {curpasRI.pasienId}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nama Pasien" span={2}>
                          {curpasRI.namaPasien}
                        </Descriptions.Item>
                        <Descriptions.Item label="Jenis Kelamin">
                          {curpasRI.jenisKelamin}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nama Ibu">
                          {curpasRI.namaIbu}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal Lahir">
                          {curpasRI.tanggalLahir}
                        </Descriptions.Item>
                        <Descriptions.Item label="Umur">
                          {curpasRI.umur}
                        </Descriptions.Item>
                        <Descriptions.Item label="Alamat" span={2}>
                          {curpasRI.alamat}
                        </Descriptions.Item>
                        <Descriptions.Item label="No Telpon">
                          {curpasRI.noTelephone}
                        </Descriptions.Item>
                        <Descriptions.Item label="Tanggal Registrasi">
                          {curpasRI.tanggalMasuk}
                        </Descriptions.Item>
                        <Descriptions.Item label="Kelas Rawat">
                          {curpasRI.kelasRawat}
                        </Descriptions.Item>
                        <Descriptions.Item label="Pembayaran">
                          {curpasRI.namaPembayaran}
                        </Descriptions.Item>
                        <Descriptions.Item label="Nomor Penjamin">
                          {curpasRI.noPolish}
                        </Descriptions.Item>
                        <Descriptions.Item label="DPJP">
                          {curpasRI.namaDpjp}
                        </Descriptions.Item>
                      </Descriptions>
                    </Card>
                  </Form.Item>
                </div>
              )}

              <Form.Item
                {...formItemLayoutFull}
                label="Tanggal Kejadian"
                style={{ marginBottom: 5 }}
              >
                <DatePicker
                  value={tanggalKejadian}
                  format={dateFormat}
                  onChange={(e) => {
                    setTanggalKejadian(e);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                  showTime
                />
              </Form.Item>

              <Form.Item
                {...formItemLayoutFull}
                label="Insiden"
                style={{ marginBottom: 5 }}
              >
                <TextArea
                  rows={2}
                  placeholder="..."
                  value={insiden}
                  onChange={(e) => {
                    setInsiden(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                {...formItemLayoutFull}
                label="Kronologis Insiden"
                style={{ marginBottom: 5 }}
              >
                <TextArea
                  rows={2}
                  placeholder="..."
                  value={kronologisInsiden}
                  onChange={(e) => {
                    setKronologisInsiden(e.target.value);
                  }}
                />
              </Form.Item>

              <Form.Item
                {...formItemLayoutFull}
                label="Jenis Insiden"
                style={{ marginBottom: 5 }}
              >
                <AutoComplete
                  options={optionsJenisInsiden}
                  value={jenisInsiden}
                  onSelect={(e) => setJenisInsiden(e)}
                  // onSearch={onSearch}
                  onChange={(e) => setJenisInsiden(e)}
                  placeholder="..."
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>

              <Form.Item
                {...formItemLayoutFull}
                label="Pelapor Insiden"
                style={{ marginBottom: 5 }}
              >
                <AutoComplete
                  options={optionsPelaporInsiden}
                  value={pelaporInsiden}
                  onSelect={(e) => setPelaporInsiden(e)}
                  // onSearch={onSearch}
                  onChange={(e) => setPelaporInsiden(e)}
                  placeholder="..."
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              {/* {
                                pelaporInsiden === "Lain-Lain" ?
                                    <div>
                                        <Form.Item {...formItemLayoutFull} label="Lainnya pelapor" style={{ marginBottom: 5 }}>
                                            <Input type='text' placeholder="..."
                                                value={lainnyapelapor} onChange={(e) => { setLainnyapelapor(e.target.value) }}
                                            />
                                        </Form.Item>
                                    </div> : <div></div>
                            } */}
              <Form.Item
                {...formItemLayoutFull}
                label="Nama Pelapor"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  placeholder="..."
                  value={namaPelapor}
                  onChange={(e) => {
                    setNamaPelapor(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Korban Insiden"
                style={{ marginBottom: 5 }}
              >
                <AutoComplete
                  options={optionsPelaporInsiden}
                  value={korbanInsiden}
                  onSelect={(e) => setKorbanInsiden(e)}
                  // onSearch={onSearch}
                  onChange={(e) => setKorbanInsiden(e)}
                  placeholder="..."
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              {/* {
                                korbanInsiden === 'Lain-Lain' ?
                                    <div>
                                        <Form.Item {...formItemLayoutFull} label="Lainya Korban" style={{ marginBottom: 5 }}>
                                            <Input type='text' placeholder="..."
                                                value={lainyaKorban} onChange={(e) => { setLainyaKorban(e.target.value) }}
                                            />
                                        </Form.Item>
                                    </div> : <div></div>
                            } */}
              {korbanInsiden === "Pasien" ? (
                <div>
                  <Form.Item
                    {...formItemLayoutFull}
                    label="Nama Korban"
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      type="text"
                      placeholder="..."
                      readOnly
                      value={curpasRI.namaPasien}
                    />
                  </Form.Item>
                </div>
              ) : (
                <div>
                  <Form.Item
                    {...formItemLayoutFull}
                    label="Nama Korban"
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      type="text"
                      placeholder="..."
                      value={namaKorban}
                      onChange={(e) => {
                        setNamaKorban(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
              )}
              <Form.Item
                {...formItemLayoutFull}
                label="Insiden Terkait Pasien"
                style={{ marginBottom: 5 }}
              >
                <AutoComplete
                  options={optionsInsidenTerkaitPasien}
                  value={insidenTerkaitPasien}
                  onSelect={(e) => {
                    setInsidenTerkaitPasien(e);
                    e === "Pasien Rawat Inap"
                      ? getRuangByKodeLayanan("1")
                      : e === "Pasien Rawat Jalan"
                      ? getRuangByKodeLayanan("2")
                      : e === "Pasien IGD"
                      ? getRuangByKodeLayanan("3")
                      : e === "Penunjang Medis"
                      ? getRuangByKodeLayanan("4")
                      : e === "Penunjang NonMedis"
                      ? getRuangByKodeLayanan("5")
                      : e === "Apotik Farmasi"
                      ? getRuangByKodeLayanan("7")
                      : getRuangByKodeLayanan("6");
                  }}
                  // onSearch={onSearch}
                  onChange={(e) => {
                    setInsidenTerkaitPasien(e);
                    e === "Pasien Rawat Inap"
                      ? getRuangByKodeLayanan("1")
                      : e === "Pasien Rawat Jalan"
                      ? getRuangByKodeLayanan("2")
                      : e === "Pasien IGD"
                      ? getRuangByKodeLayanan("3")
                      : e === "Penunjang Medis"
                      ? getRuangByKodeLayanan("4")
                      : e === "Penunjang NonMedis"
                      ? getRuangByKodeLayanan("5")
                      : e === "Apotik Farmasi"
                      ? getRuangByKodeLayanan("7")
                      : getRuangByKodeLayanan("6");
                  }}
                  placeholder="..."
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              {/* {
                                insidenTerkaitPasien === 'Lain-Lain' ?
                                    <div>
                                        <Form.Item {...formItemLayoutFull} label="Lainya Ruang Kejadian" style={{ marginBottom: 5 }}>
                                            <Input type='text' placeholder="..."
                                                value={lainyaRuangKejadian} onChange={(e) => { setLainyaRuangKejadian(e) }}
                                            />
                                        </Form.Item>
                                    </div> : <div></div>
                            } */}
              <Form.Item
                {...formItemLayoutFull}
                label="Tempat Kejadian"
                style={{ marginBottom: 5 }}
              >
                <Select
                  dataSource={listRuangBylayanan}
                  value={tempatKejadian}
                  onChange={(e) => {
                    setTempatKejadian(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  //value={detailkonsultasi.kodeDokterTujuan}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listRuangBylayanan.map((d) => (
                    <Option key={d.ruangId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Spesialis Penyakit Insiden"
                style={{ marginBottom: 5 }}
              >
                <AutoComplete
                  options={optionsSpesialisPenyakitInsiden}
                  value={spesialisPenyakitInsiden}
                  onSelect={(e) => setSpesialisPenyakitInsiden(e)}
                  // onSearch={onSearch}
                  onChange={(e) => setSpesialisPenyakitInsiden(e)}
                  placeholder="..."
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              {/* {
                                spesialisPenyakitInsiden === 'Lain-Lain' ?
                                    <div>
                                        <Form.Item {...formItemLayoutFull} label="Lainya Subspesialis" style={{ marginBottom: 5 }}>
                                            <Input type='text' placeholder="..."
                                                value={lainyaSubspesialis} onChange={(e) => { setLainyaSubspesialis(e) }}
                                            />
                                        </Form.Item>
                                    </div> : <div></div>
                            } */}
              <Form.Item
                {...formItemLayoutFull}
                label="Unit Penyebab"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  placeholder="..."
                  value={unitPenyebab}
                  onChange={(e) => {
                    setUnitPenyebab(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Akibat Terhadap Pasien"
                style={{ marginBottom: 5 }}
              >
                <AutoComplete
                  options={optionsakibatInsiden}
                  value={akibatTerhadapPasien}
                  onSelect={(e) => setAkibatTerhadapPasien(e)}
                  // onSearch={onSearch}
                  onChange={(e) => setAkibatTerhadapPasien(e)}
                  placeholder="..."
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Tindakan Pasca Insiden"
                style={{ marginBottom: 5 }}
              >
                <TextArea
                  rows={2}
                  placeholder="..."
                  value={tindakanPascaInsiden}
                  onChange={(e) => {
                    setTindakanPascaInsiden(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Petugas Tindakan"
                style={{ marginBottom: 5 }}
              >
                <AutoComplete
                  options={optionsPetugasTindakan}
                  value={pelakuTindakan}
                  onSelect={(e) => setPelakuTindakan(e)}
                  // onSearch={onSearch}
                  onChange={(e) => setPelakuTindakan(e)}
                  placeholder="..."
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
              {/* {
                                pelakuTindakan === 'Petugas Lainnya' ?
                                    <div>
                                        <Form.Item {...formItemLayoutFull} label="Lainya Petugas Tindakan" style={{ marginBottom: 5 }}>
                                            <Input type='text' placeholder="..."
                                                value={lainyaPelakuTindakan} onChange={(e) => { setLainyaPelakuTindakan(e.target.value) }}
                                            />
                                        </Form.Item>
                                    </div> : <div></div>
                            } */}
              <Form.Item
                {...formItemLayoutFull}
                label="Nama Petugas Tindakan"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  placeholder="..."
                  value={namaPelakuTindakan}
                  onChange={(e) => {
                    setNamaPelakuTindakan(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Tindakan Serupa"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={tidakanSerupa}
                  onChange={(e) => {
                    setTidakanSerupa(e);
                  }}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  //value={detailkonsultasi.kodeDokterTujuan}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value={true}>Ya</Option>
                  <Option value={false}>Tidak</Option>
                </Select>
              </Form.Item>
              {tidakanSerupa === true ? (
                <div>
                  <Form.Item
                    {...formItemLayoutFull}
                    label="Kronologi Kejadian Sebelumnya"
                    style={{ marginBottom: 5 }}
                  >
                    <TextArea
                      rows={2}
                      placeholder="..."
                      value={kronologiSebelumnya}
                      onChange={(e) => {
                        setKronologiSebelumnya(e.target.value);
                      }}
                    />
                  </Form.Item>
                </div>
              ) : (
                <div></div>
              )}
            </Col>
          </Row>
        </Card>
        <Card size="small">
          <Row>
            <Col span={12} style={{ textAlign: "left" }}>
              <Space>
                <Button
                  onClick={() => {
                    getprint();
                    setmodalCetak(true);
                  }}
                >
                  Cetak
                </Button>
              </Space>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  type="primary"
                  onClick={() => {
                    insertInsiden(dataInsiden);
                  }}
                >
                  Simpan
                </Button>
                <Button
                  onClick={() => {
                    kosongkanForm();
                    setvisibleTanbah(false);
                  }}
                >
                  Batal
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>

        <Modal
          title="Modal Cetak"
          visible={modalCetak}
          width="1000px"
          footer={null}
          //onOk={handleOk}
          onCancel={() => {
            setmodalCetak(false);
          }}
        >
          <Input type="text" value={print} />
          <Iframe
            url={print}
            width="800px"
            height="1200px"
            id="suratkontrol"
            display="initial"
            position="relative"
          />
        </Modal>

        <Modal
          title="Cari Pasien"
          visible={modalCariPasien}
          width="1000px"
          footer={null}
          //onOk={handleOk}
          onCancel={() => {
            setmodalCariPasien(false);
          }}
        >
          <Row gutter={[5, 5]}>
            <Col span={15}>
              <Input
                type="text"
                placeholder="Silahkan Ketikan Nama/ Nomor Registrasi"
                value={sSkey}
                onChange={(e) => {
                  setsSkey(e.target.value);
                }}
              />
            </Col>
            <Col span={5}>
              <Select
                //onFocus={onFokusRuang}
                value={sSkeyRuang}
                dataSource={ruang}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih ruang..."
                optionFilterProp="children"
                onChange={(e) => {
                  setsSkeyRuang(e);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {ruang.map((d) => (
                  <Option key={d.ruangId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Col>
            <Col span={4}>
              <Button
                style={{ width: "100%", backgroundColor: "#17a2b8" }}
                type="primary"
                onClick={() => {
                  {
                    getListPasienBySkeyRuang(sSkey, sSkeyRuang);
                  }
                }}
              >
                Cari
              </Button>
            </Col>
            <Col span={24}>
              <Table
                bordered
                locale={{
                  emptyText: <Empty description="Data Konsultasi Kosong" />,
                }}
                pagination={false}
                dataSource={listPasienBySkeyRuang}
                size="small"
                rowKey="reg"
              >
                <Column
                  title="No RM"
                  key="No"
                  className="bgcolortunggu"
                  render={(listPasienBySkeyRuang) => (
                    <span>{listPasienBySkeyRuang.pasienId}</span>
                  )}
                />
                <Column
                  title="No Registrasi"
                  key="tgl"
                  render={(listPasienBySkeyRuang) => (
                    <span>{listPasienBySkeyRuang.registrasiId}</span>
                  )}
                />
                <Column
                  title="Nama Pasien"
                  key="subjektif"
                  render={(listPasienBySkeyRuang) => (
                    <span>{listPasienBySkeyRuang.namaPasien}</span>
                  )}
                />
                <Column
                  title="Nama Pasien"
                  key="subjektif"
                  render={(listPasienBySkeyRuang) => (
                    <Button
                      type="primary"
                      onClick={() => {
                        detailPasienRI(listPasienBySkeyRuang.registrasiId);
                        setmodalCariPasien(false);
                      }}
                    >
                      Pilih
                    </Button>
                  )}
                />
              </Table>
            </Col>
          </Row>
        </Modal>
      </Form>
    </div>
  );
};

export default FormLaporInsiden;
