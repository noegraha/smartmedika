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

const DetailInsiden = () => {
  const [form] = Form.useForm();
  const dateFormat = "DD-MM-YYYY HH:mm";
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI, ruang, ruangRi } = useContext(PasienRIContext);
  const [modalCariPasien, setmodalCariPasien] = useState(false);
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
    detailInsidenPasien,
    setmodalDetail,
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
  // const dataInsiden = {
  //     insidenId: insidenId,
  //     registrasiId: '2100000000',
  //     tanggal: dayjs(tanggalKejadian).format('YYYY-MM-DDTHH:mm'),
  //     insiden: insiden,
  //     kronologi: kronologisInsiden,
  //     jenisInsiden: jenisInsiden,
  //     pelapor: pelaporInsiden,
  //     namaPelapor: namaPelapor,
  //     insidenPada: korbanInsiden,
  //     namaKorban: namaKorban,
  //     insidenTerkaitPasien: insidenTerkaitPasien,
  //     tempatKejadian: tempatKejadian,
  //     spesialisPenyakitInsiden: spesialisPenyakitInsiden,
  //     unitPenyebab: unitPenyebab,
  //     akibatInsidenTerhadapPasien: akibatTerhadapPasien,
  //     tindakanPascaInsiden: tindakanPascaInsiden,
  //     pelakuTindakan: pelakuTindakan,
  //     namaPelakuTindakan: namaPelakuTindakan,
  //     pernahTerjadi: tidakanSerupa,
  //     tempatInsidenSebelumnya: kronologiSebelumnya,
  //     pembuatLaporan: namauser,
  //     tglLaporan: dayjs(tglLaporan).format("YYYY-MM-DDTHH:mm"),
  //     clientHost: host,
  //     clientIP: ip
  //     // penerimaLaporan: penerimaLaporan,
  //     // tglDiterima: tglDiterima === null ? null : dayjs(tglDiterima).format("YYYY-MM-DDTHH:mm")
  // }
  const dataInsidenTerima = {
    insidenId: detailInsidenPasien.insidenId,
    registrasiId: curpasRI.registrasiId,
    tanggal: dayjs(detailInsidenPasien.tanggal).format("YYYY-MM-DDTHH:mm"),
    insiden: detailInsidenPasien.insiden,
    kronologi: detailInsidenPasien.kronologi,
    jenisInsiden: detailInsidenPasien.jenisInsiden,
    pelapor: detailInsidenPasien.pelapor,
    namaPelapor: detailInsidenPasien.namaPelapor,
    insidenPada: detailInsidenPasien.insidenPada,
    namaKorban: detailInsidenPasien.namaKorban,
    insidenTerkaitPasien: detailInsidenPasien.insidenTerkaitPasien,
    tempatKejadian: detailInsidenPasien.tempatKejadian,
    spesialisPenyakitInsiden: detailInsidenPasien.spesialisPenyakitInsiden,
    unitPenyebab: detailInsidenPasien.unitPenyebab,
    akibatInsidenTerhadapPasien:
      detailInsidenPasien.akibatInsidenTerhadapPasien,
    tindakanPascaInsiden: detailInsidenPasien.tindakanPascaInsiden,
    pelakuTindakan: detailInsidenPasien.pelakuTindakan,
    namaPelakuTindakan: detailInsidenPasien.namaPelakuTindakan,
    pernahTerjadi: detailInsidenPasien.pernahTerjadi,
    tempatInsidenSebelumnya: detailInsidenPasien.tempatInsidenSebelumnya,
    pembuatLaporan: detailInsidenPasien.pembuatLaporan,
    tglLaporan: dayjs(detailInsidenPasien.tglLaporan).format(
      "YYYY-MM-DDTHH:mm"
    ),
    penerimaLaporan: namauser,
    tglDiterima: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientHost: host,
    clientIP: ip,
  };
  return (
    <div>
      <Form form={form}>
        <Card
          size="small"
          title="Detail Insiden Pasien"
          headStyle={{ fontWeight: "bolder", backgroundColor: "beige" }}
        >
          <Row>
            <Col span={24}>
              {/* <Form.Item {...formItemLayoutFull} label="Cari Pasien" style={{ marginBottom: 5 }}>
                                <Row gutter={[20, 7]}>
                                    <Col span={20}>
                                        <Input type="text" placeholder="Silahkan Masukan Nomor Registrasi Pasien"
                                            value={cariNoreg} onChange={(e) => { setcariNoreg(e.target.value) }}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <Button style={{ width: "100%", backgroundColor: '#4CAF50' }}
                                            onClick={() => {
                                                {
                                                    cariNoreg === '' || cariNoreg === ' ' || cariNoreg === [] || cariNoreg === undefined ? setmodalCariPasien(true) :
                                                        console.log('cari pasien')
                                                }
                                            }}>Cari</Button>
                                    </Col>
                                </Row>

                            </Form.Item> */}
              {/* {
                                pasienAda === true ?
                                    <div> */}
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
              {/* </div> : <div></div>
                            } */}

              <Form.Item
                {...formItemLayoutFull}
                label="Tanggal Kejadian"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  value={dayjs(detailInsidenPasien.tanggal).format(
                    "DD-MM-YYYY HH:mm"
                  )}
                  // format={dateFormat}
                  // onChange={(e) => { setTanggalKejadian(e) }}
                  style={{ width: "100%" }}
                  // placeholder="..."
                  // showTime
                  readOnly={true}
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
                  readOnly={true}
                  value={detailInsidenPasien.insiden}
                  // onChange={(e) => { setInsiden(e.target.value) }}
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
                  readOnly={true}
                  value={detailInsidenPasien.kronologi}
                  // onChange={(e) => { setKronologisInsiden(e.target.value) }}
                />
              </Form.Item>

              <Form.Item
                {...formItemLayoutFull}
                label="Jenis Insiden"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  value={detailInsidenPasien.jenisInsiden}
                  // onSelect={(e) => setJenisInsiden(e)}
                  // onSearch={onSearch}
                  // onChange={(e) => setJenisInsiden(e)}
                  // placeholder="..."
                  // filterOption={(inputValue, option) =>
                  //     option.value
                  //         .toUpperCase()
                  //         .indexOf(inputValue.toUpperCase()) !== -1
                  // }
                  readOnly={true}
                />
              </Form.Item>

              <Form.Item
                {...formItemLayoutFull}
                label="Pelapor Insiden"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  value={detailInsidenPasien.pelapor}
                  // onSelect={(e) => setPelaporInsiden(e)}
                  // onSearch={onSearch}
                  // onChange={(e) => setPelaporInsiden(e)}
                  // placeholder="..."
                  // filterOption={(inputValue, option) =>
                  //     option.value
                  //         .toUpperCase()
                  //         .indexOf(inputValue.toUpperCase()) !== -1
                  // }
                  readOnly={true}
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
                  value={detailInsidenPasien.namaPelapor}
                  // onChange={(e) => { setNamaPelapor(e.target.value) }}
                  readOnly={true}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Korban Insiden"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  value={detailInsidenPasien.insidenPada}
                  // onSelect={(e) => setKorbanInsiden(e)}
                  // onSearch={onSearch}
                  // onChange={(e) => setKorbanInsiden(e)}
                  // placeholder="..."
                  // filterOption={(inputValue, option) =>
                  //     option.value
                  //         .toUpperCase()
                  //         .indexOf(inputValue.toUpperCase()) !== -1
                  // }
                  readOnly={true}
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
                      readOnly={true}
                      value={detailInsidenPasien.namaKorban}
                      // onChange={(e) => { setNamaKorban(e.target.value) }}
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
                      readOnly={true}
                      value={detailInsidenPasien.namaKorban}
                      //  onChange={(e) => { setNamaKorban(e.target.value) }}
                    />
                  </Form.Item>
                </div>
              )}
              <Form.Item
                {...formItemLayoutFull}
                label="Insiden Terkait Pasien"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  value={detailInsidenPasien.insidenTerkaitPasien}
                  // onSelect={(e) => setInsidenTerkaitPasien(e)}
                  // onSearch={onSearch}
                  // onChange={(e) => setInsidenTerkaitPasien(e)}
                  // placeholder="..."
                  // filterOption={(inputValue, option) =>
                  //     option.value
                  //         .toUpperCase()
                  //         .indexOf(inputValue.toUpperCase()) !== -1
                  // }
                  readOnly={true}
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
                <Input
                  type="text"
                  placeholder="..."
                  readOnly={true}
                  value={detailInsidenPasien.tempatKejadianDesk}
                  // onChange={(e) => { setTempatKejadian(e.target.value) }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Spesialis Penyakit Insiden"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  value={detailInsidenPasien.spesialisPenyakitInsiden}
                  // onSelect={(e) => setSpesialisPenyakitInsiden(e)}
                  // onSearch={onSearch}
                  // onChange={(e) => setSpesialisPenyakitInsiden(e)}
                  // placeholder="..."
                  // filterOption={(inputValue, option) =>
                  //     option.value
                  //         .toUpperCase()
                  //         .indexOf(inputValue.toUpperCase()) !== -1
                  // }
                  readOnly={true}
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
                  readOnly={true}
                  value={detailInsidenPasien.unitPenyebab}
                  // onChange={(e) => { setUnitPenyebab(e.target.value) }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Akibat Terhadap Pasien"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  value={detailInsidenPasien.akibatInsidenTerhadapPasien}
                  // onSelect={(e) => setAkibatTerhadapPasien(e)}
                  // onSearch={onSearch}
                  // onChange={(e) => setAkibatTerhadapPasien(e)}
                  // placeholder="..."
                  // filterOption={(inputValue, option) =>
                  //     option.value
                  //         .toUpperCase()
                  //         .indexOf(inputValue.toUpperCase()) !== -1
                  // }
                  readOnly={true}
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
                  readOnly={true}
                  value={detailInsidenPasien.tindakanPascaInsiden}
                  // onChange={(e) => { setTindakanPascaInsiden(e.target.value) }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Petugas Tindakan"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  value={detailInsidenPasien.pelakuTindakan}
                  // onSelect={(e) => setPelakuTindakan(e)}
                  // onSearch={onSearch}
                  // onChange={(e) => setPelakuTindakan(e)}
                  // placeholder="..."
                  // filterOption={(inputValue, option) =>
                  //     option.value
                  //         .toUpperCase()
                  //         .indexOf(inputValue.toUpperCase()) !== -1
                  // }
                  readOnly={true}
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
                  readOnly={true}
                  value={detailInsidenPasien.namaPelakuTindakan}
                  // onChange={(e) => { setNamaPelakuTindakan(e.target.value) }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Tindakan Serupa"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  value={
                    detailInsidenPasien.pernahTerjadi === true
                      ? "Pernah"
                      : "Tidak"
                  }
                  // onChange={(e) => { setTidakanSerupa(e) }}
                  // showSearch
                  // style={{ width: '100%' }}
                  // placeholder="..."
                  // optionFilterProp="children"
                  // //value={detailkonsultasi.kodeDokterTujuan}
                  // filterOption={(input, option) =>
                  //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  // }
                  readOnly={true}
                />
                {/* <Option value={true}>Ya</Option>
                                    <Option value={false}>Tidak</Option>

                                </Select> */}
              </Form.Item>
              {detailInsidenPasien.pernahTerjadi === true ? (
                <div>
                  <Form.Item
                    {...formItemLayoutFull}
                    label="Kronologi Kejadian Sebelumnya"
                    style={{ marginBottom: 5 }}
                  >
                    <TextArea
                      rows={2}
                      placeholder="..."
                      readOnly={true}
                      value={detailInsidenPasien.tempatInsidenSebelumnya}
                      // onChange={(e) => { setKronologiSebelumnya(e.target.value) }}
                    />
                  </Form.Item>
                </div>
              ) : (
                <div></div>
              )}
              <Form.Item
                {...formItemLayoutFull}
                label="Pembuat Laporan"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  readOnly={true}
                  value={detailInsidenPasien.pembuatLaporan}
                  // onChange={(e) => { setKronologiSebelumnya(e.target.value) }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Tgl Laporan"
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  readOnly={true}
                  value={dayjs(detailInsidenPasien.tglLaporan).format(
                    "DD-MM-YYYY HH:mm"
                  )}
                  // onChange={(e) => { setKronologiSebelumnya(e.target.value) }}
                />
              </Form.Item>
              {detailInsidenPasien.penerimaLaporan === null ||
              detailInsidenPasien.penerimaLaporan === "" ||
              detailInsidenPasien.penerimaLaporan === undefined ||
              detailInsidenPasien.penerimaLaporan === [] ? (
                <div></div>
              ) : (
                <div>
                  <Form.Item
                    {...formItemLayoutFull}
                    label="Penerima Laporan"
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      type="text"
                      readOnly={true}
                      value={detailInsidenPasien.penerimaLaporan}
                      // onChange={(e) => { setKronologiSebelumnya(e.target.value) }}
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayoutFull}
                    label="Tgl Terima"
                    style={{ marginBottom: 5 }}
                  >
                    <Input
                      type="text"
                      readOnly={true}
                      value={dayjs(detailInsidenPasien.tglDiterima).format(
                        "DD-MM-YYYY HH:mm"
                      )}
                      // onChange={(e) => { setKronologiSebelumnya(e.target.value) }}
                    />
                  </Form.Item>
                </div>
              )}
            </Col>
          </Row>
        </Card>
        <Card size="small">
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                {detailInsidenPasien.penerimaLaporan === null ||
                detailInsidenPasien.penerimaLaporan === "" ||
                detailInsidenPasien.penerimaLaporan === undefined ||
                detailInsidenPasien.penerimaLaporan === [] ? (
                  <div>
                    <Button
                      type="primary"
                      onClick={() => {
                        insertInsiden(dataInsidenTerima);
                      }}
                    >
                      Terima
                    </Button>
                  </div>
                ) : (
                  <div></div>
                )}
                <Button
                  onClick={() => {
                    setmodalDetail(false);
                  }}
                >
                  Kembali
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Form>
    </div>
  );
};

export default DetailInsiden;
