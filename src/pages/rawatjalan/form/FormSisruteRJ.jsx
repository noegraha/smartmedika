import { Input, Form, Select, Divider, Row, Col, Spin } from "antd";
import React, { useContext, useState } from "react";
import { PasienContext } from "../context/PasienContext";
import { SisruteContext } from "../context/SisruteContext";
import { PelayananContext } from "../context/Pelayanancontext";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const FormSisruteRJ = () => {
  const { curpas, nik, tempatlahir, notelepon, loadingdetail } =
    useContext(PasienContext);
  const {
    kriteriaKhusus,
    sdm,
    pelayanan,
    kelasrawat,
    alat,
    sarana,
    faskes,
    getSisFaskes,
    alasan,
    refpelayanan,
    // carakeluar,
  } = useContext(SisruteContext);
  const { dokterall } = useContext(PelayananContext);
  const namauser = sessionStorage.getItem("namapetugas");
  const [jnsrujukan, setJenisRujukan] = useState(null);
  const [nikdokter, setNIKDokter] = useState(null);
  const [nikpetugas, setNIKPetugas] = useState(null);
  // const dataSisrute = {
  //   pasien: {
  //     NORM: curpas.pasienId,
  //     NIK: nik,
  //     NO_KARTU_JKN: curpas.noPolish,
  //     NAMA: curpas.namaPasien,
  //     JENIS_KELAMIN: curpas.jenisKelamin === "LAKI - LAKI" ? 0 : 1,
  //     TANGGAL_LAHIR: curpas.tanggalLahir,
  //     TEMPAT_LAHIR: tempatlahir,
  //     ALAMAT: curpas.alamat,
  //     KONTAK: notelepon,
  //   },
  //   rujukan: {
  //     JENIS_RUJUKAN: jnsrujukan,
  //     PELAYANAN: "string",
  //     NOMOR_RUJUKAN_BPJS: "string",
  //     KRITERIA: {
  //       KRITERIA_RUJUKAN: "string",
  //       KRITERIA_KHUSUS: "string",
  //       SDM: "string",
  //       PELAYANAN: "string",
  //       KELAS_PERAWATAN: "string",
  //       JENIS_PERAWATAN: "string",
  //       ALAT: "string",
  //       SARANA: "string",
  //     },
  //     TANGGAL: "string",
  //     FASKES_TUJUAN: "string",
  //     ALASAN: "string",
  //     ALASAN_LAINNYA: "string",
  //     DIAGNOSA: "string",
  //     DOKTER: {
  //       NIK: nikdokter,
  //       NAMA: "string",
  //     },
  //     PETUGAS: {
  //       NIK: nikpetugas,
  //       NAMA: namauser,
  //     },
  //   },
  //   kondisI_UMUM: {
  //     ANAMNESIS_DAN_PEMERIKSAAN_FISIK: "string",
  //     KESADARAN: "string",
  //     TEKANAN_DARAH: "string",
  //     FREKUENSI_NADI: "string",
  //     SUHU: "string",
  //     PERNAPASAN: "string",
  //     KEADAAN_UMUM: "string",
  //     NYERI: 0,
  //     ALERGI: "string",
  //   },
  //   penunjang: {
  //     LABORATORIUM: "string",
  //     RADIOLOGI: "string",
  //     TERAPI_ATAU_TINDAKAN: "string",
  //   },
  // };
  return (
    <div>
      <Form {...formItemLayout}>
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Spin spinning={loadingdetail}>
              <Divider orientation="left">Data Pasien</Divider>
              <Form.Item label="No. Rekam Medis" style={{ marginBottom: 0 }}>
                <Input value={curpas.pasienId} />
              </Form.Item>
              <Form.Item label="NIK" style={{ marginBottom: 0 }}>
                <Input value={nik} />
              </Form.Item>
              <Form.Item label="No. Kartu" style={{ marginBottom: 0 }}>
                <Input value={curpas.noPolish} />
              </Form.Item>
              <Form.Item label="Nama" style={{ marginBottom: 0 }}>
                <Input value={curpas.namaPasien} />
              </Form.Item>
              <Form.Item label="Jenis Kelamin" style={{ marginBottom: 0 }}>
                <Input value={curpas.jenisKelamin} />
              </Form.Item>
              <Form.Item label="Tanggal Lahir" style={{ marginBottom: 0 }}>
                <Input value={curpas.tanggalLahir} />
              </Form.Item>
              <Form.Item label="Tempat Lahir" style={{ marginBottom: 0 }}>
                <Input value={tempatlahir} />
              </Form.Item>
              <Form.Item label="Alamat" style={{ marginBottom: 0 }}>
                <Input value={curpas.alamat} />
              </Form.Item>
              <Form.Item label="Kontak" style={{ marginBottom: 0 }}>
                <Input value={notelepon} />
              </Form.Item>
            </Spin>
            <Divider orientation="left">Kriteria</Divider>
            <Form.Item label="Kriteria Rujukan" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Kriteria Khusus" style={{ marginBottom: 0 }}>
              <Select
                dataSource={kriteriaKhusus}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Kriteria Khusus"
                optionFilterProp="children"
                onChange={(e) => console.log(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {kriteriaKhusus.map((p) => (
                  <Option key={p.DESKRIPSI}>{p.KET}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="SDM" style={{ marginBottom: 0 }}>
              <Select
                dataSource={sdm}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih SDM"
                optionFilterProp="children"
                onChange={(e) => console.log(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {sdm.map((p) => (
                  <Option key={p.kode}>{p.kategori}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Pelayanan" style={{ marginBottom: 0 }}>
              <Select
                dataSource={pelayanan}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelayanan"
                optionFilterProp="children"
                onChange={(e) => console.log(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {pelayanan.map((p) => (
                  <Option key={p.kode}>{p.layanan}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Kelas Rawat" style={{ marginBottom: 0 }}>
              <Select
                dataSource={kelasrawat}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Kelas Rawat"
                optionFilterProp="children"
                onChange={(e) => console.log(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {kelasrawat.map((p) => (
                  <Option key={p.kode}>{p.nama}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Alat" style={{ marginBottom: 0 }}>
              <Select
                dataSource={alat}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Alat"
                optionFilterProp="children"
                onChange={(e) => console.log(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {alat.map((p) => (
                  <Option key={p.kode}>{p.nama}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Sarana" style={{ marginBottom: 0 }}>
              <Select
                dataSource={sarana}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Sarana"
                optionFilterProp="children"
                onChange={(e) => console.log(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {sarana.map((p) => (
                  <Option key={p.kode_sarana}>{p.sarana}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Divider orientation="left">Rujukan</Divider>
            <Form.Item label="Jenis Rujukan" style={{ marginBottom: 0 }}>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Jenis Rujukan"
                optionFilterProp="children"
                value={jnsrujukan}
                onChange={(e) => setJenisRujukan(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option value="1">Rawat Jalan</Option>
                <Option value="2">Rawat Darurat/Inap</Option>
                <Option value="3">Parsial</Option>
                <Option value="6">Maternal</Option>
                <Option value="7">Neonatal</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Pelayanan" style={{ marginBottom: 0 }}>
              <Select
                dataSource={refpelayanan}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelayanan"
                optionFilterProp="children"
                onChange={(e) => console.log(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {refpelayanan.map((p) => (
                  <Option key={p.kode}>
                    {p.kode} - {p.pelayanan}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Nomor Rujukan" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Faskes Tujuan" style={{ marginBottom: 0 }}>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Ketik Cari Nama Faskes"
                filterOption={false}
                onChange={(e) => console.log(e)}
                onSearch={(e) => getSisFaskes(e)}
              >
                {faskes.map((p) => (
                  <Option key={p.KODE}>{p.NAMA}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Alasan" style={{ marginBottom: 0 }}>
              <Select
                dataSource={alasan}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Alasan"
                optionFilterProp="children"
                onChange={(e) => console.log(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {alasan.map((p) => (
                  <Option key={p.KODE}>{p.NAMA}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="Alasan Lainnya" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Diagnosa" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Dokter" style={{ marginBottom: 0 }}>
              <Select
                dataSource={dokterall}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                // onChange={(e) => setPemeriksa(e)}
                // value={pemeriksa === null ? curpas.dokterId : pemeriksa}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {dokterall.map((p) => (
                  <Option key={p.dokterId}>{p.namaDokter}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="NIK Dokter" style={{ marginBottom: 0 }}>
              <Input
                value={nikdokter}
                onChange={(e) => setNIKDokter(e.target.value)}
              />
            </Form.Item>
            <Form.Item label="Petugas" style={{ marginBottom: 0 }}>
              <Input value={namauser} />
            </Form.Item>
            <Form.Item label="NIK Petugas" style={{ marginBottom: 0 }}>
              <Input
                value={nikpetugas}
                onChange={(e) => setNIKPetugas(e.target.value)}
              />
            </Form.Item>
            <Divider orientation="left">Kondisi Umum</Divider>
            <Form.Item
              label="Anamnesis dan Pemeriksaan Fisik"
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
            <Form.Item label="Kesadaran" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Tekanan Darah" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Frekuensi Nadi" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Suhu" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Pernapasan" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Keadaan Umum" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Nyeri" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Alergi" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Divider orientation="left">Penunjang</Divider>
            <Form.Item label="Laborat" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Radiologi" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
            <Form.Item label="Terapi" style={{ marginBottom: 0 }}>
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default FormSisruteRJ;
