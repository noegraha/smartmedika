import React, { useContext, useState } from "react";
import {
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Checkbox,
  Select,
  DatePicker,
  InputNumber,
  Modal,
} from "antd";
import { IBSContext } from "./context/IBSContext";
import { DiagnosaContext } from "../../rawatjalan/context/Diagnosacontext";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import { DecoupledEditor } from '@ckeditor/ckeditor5-build-decoupled-document';
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

import dayjs from "dayjs";
import "dayjs/locale/id";

const { TextArea } = Input;

const DetailLaporanOP = (props) => {
  const {
    dokterSp,
    detailLaporan,
    cariLaporanOP,
    setDetailLaporan,
    simpanLaporanOP,
  } = useContext(IBSContext);
  const { diagnosa } = useContext(DiagnosaContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const [form] = Form.useForm();

  const dateFormat = [
    "DD-MM-YYYY HH:mm",
    "DD-MM-YYYY HH:mm",
    "YYYY-MM-DD HH:mm",
  ];

  // const setStateTglmulaibedah = (e) => {
  //     // setTglmulaibedah(dayjs(e));
  //     setDetailLaporan({ ...detailLaporan, mulaiBedah: dayjs(e).format() });
  //     console.log('STATE TGL', dayjs(e));
  // }

  // const setStateTglselesaibedah = (e) => {
  //     // setTglselesaibedah(dayjs(e));
  //     setDetailLaporan({ ...detailLaporan, selesaiBedah: dayjs(e).format() });
  //     console.log('STATE TGL', dayjs(e));
  // }

  // const setStateTglmulaianestesi = (e) => {
  //     // setTglmulaianestesi(dayjs(e));
  //     setDetailLaporan({ ...detailLaporan, mulaiAnestesi: dayjs(e).format() });
  //     console.log('STATE TGL', dayjs(e));
  // }

  // const setStateTglselesaianestesi = (e) => {
  //     // setTglselesaianestesi(dayjs(e));
  //     setDetailLaporan({ ...detailLaporan, selesaiAnestesi: dayjs(e).format() });
  //     console.log('STATE TGL', dayjs(e));
  // }

  const modalOK = () => {
    const datapost = {
      laporanOperasiId: detailLaporan.nolaporan,
      registrasiId: detailLaporan.registrasiId,
      kodeBangsal: detailLaporan.kodeBangsal,
      tglOperasi: dayjs(detailLaporan.tglOperasi).format(dateFormat[2]),
      dokterId: detailLaporan.dokterId,
      namaAsisten: detailLaporan.namaAsisten,
      namaPerawat: detailLaporan.namaPerawat,
      namaPenataAnestesi: detailLaporan.namaPenataAnestesi,
      anestesiId: detailLaporan.anestesiId,
      kodeDXPraBedah: detailLaporan.kodeDXPraBedah,
      praBedah: detailLaporan.praBedah,
      kodeDXPosBedah: detailLaporan.kodeDXPosBedah,
      dxPosBedah: detailLaporan.dxPosBedah,
      jenisAnestesi: detailLaporan.jenisAnestesi,
      periksaPA: detailLaporan.periksaPA,
      periksaPK: detailLaporan.periksaPK,
      jenisPembedahan: detailLaporan.jenisPembedahan,
      penggunaanDarah: detailLaporan.penggunaanDarah,
      komplikasi: detailLaporan.komplikasi,
      kodeTindakan: detailLaporan.kodeTindakan,
      namaPmr: detailLaporan.namaPmr,
      mulaiBedah: dayjs(detailLaporan.mulaiBedah).format(dateFormat[2]),
      selesaiBedah: dayjs(detailLaporan.selesaiBedah).format(dateFormat[2]),
      mulaiAnestesi: dayjs(detailLaporan.mulaiAnestesi).format(dateFormat[2]),
      selesaiAnestesi: dayjs(detailLaporan.selesaiAnestesi).format(
        dateFormat[2]
      ),
      laporanOperasi: detailLaporan.laporanOperasi,
      eksisi: detailLaporan.eksisi,
      kodeDokterOperator2: detailLaporan.kodeDokterOperator2,
      kodeDokterOperator3: detailLaporan.kodeDokterOperator3,
      kodeDokterOperator4: detailLaporan.kodeDokterOperator4,
      namaDokterOperator2: detailLaporan.namaDokterOperator2,
      namaDokterOperator3: detailLaporan.namaDokterOperator3,
      namaDokterOperator4: detailLaporan.namaDokterOperator4,
      hapus: 0,
      clientHost: host,
      ipClient: ip,
    };

    console.log("DATAPOST", datapost);
    simpanLaporanOP(datapost);
    props.setmodal(false);
    alert("TOMBOL SIMPAN DIKLIK");
    cariLaporanOP(props.tglop, props.cito);
  };

  const modalClose = () => {
    props.setmodal(false);
    alert("TOMBOL BATAL DIKLIK");
  };

  return (
    <div>
      <Modal
        title="Detail Laporan Operasi"
        centered
        visible={props.showmodal}
        onOk={() => modalOK()}
        onCancel={() => modalClose()}
        width={1000}
        maskClosable={false}
        closable={false}
        okText="Simpan"
        cancelText="Batal"
      >
        <Descriptions title="Data Pasien" size="small" bordered>
          <Descriptions.Item label="No. Laporan">
            {detailLaporan.nolaporan}
          </Descriptions.Item>
          <Descriptions.Item label="No. Reg">
            {detailLaporan.registrasiId}
          </Descriptions.Item>
          <Descriptions.Item label="No. Pasien">
            {detailLaporan.pasienId}
          </Descriptions.Item>
          <Descriptions.Item label="Tgl. Masuk">
            {detailLaporan.tglRegistrasi}
          </Descriptions.Item>
          <Descriptions.Item label="Jam Masuk">
            {detailLaporan.jamRegistrasi}
          </Descriptions.Item>
          <Descriptions.Item label="Nama Pasien">
            {detailLaporan.nama}
          </Descriptions.Item>
          <Descriptions.Item label="Alamat">
            {detailLaporan.alamat}
          </Descriptions.Item>
          <Descriptions.Item label="Jenis Kelamin">
            {detailLaporan.jenisKelamin}
          </Descriptions.Item>
          <Descriptions.Item label="Kelas Rawat">
            {detailLaporan.kelasRawat}
          </Descriptions.Item>
          <Descriptions.Item label="Umur">
            {detailLaporan.umur}
          </Descriptions.Item>
          <Descriptions.Item label="Jatah Kelas">
            {detailLaporan.registrasiId}
          </Descriptions.Item>
          <Descriptions.Item label="Ibu Kandung">
            {detailLaporan.namaIbu}
          </Descriptions.Item>
          <Descriptions.Item label="No. Kartu Peserta">
            {detailLaporan.noPolish}
          </Descriptions.Item>
          <Descriptions.Item label="Pembayaran">
            {detailLaporan.namaPembayaran}
          </Descriptions.Item>
          <Descriptions.Item label="Bangsal">
            {detailLaporan.kodeBangsal}
          </Descriptions.Item>
        </Descriptions>

        <Card style={{ marginTop: 10 }}>
          <Form form={form} layout="vertical" size="small">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Dokter">
                  <Select
                    showSearch
                    placeholder="Pilih Dokter"
                    onChange={(e) => {
                      setDetailLaporan({ ...detailLaporan, dokterId: e });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dokterSp.map((dr) =>
                      [
                        detailLaporan.anestesiId,
                        detailLaporan.kodeDokterOperator2,
                        detailLaporan.kodeDokterOperator3,
                        detailLaporan.kodeDokterOperator4,
                      ].includes(dr.dokterId) ? (
                        <Select.Option
                          key={dr.dokterId}
                          value={dr.dokterId}
                          disabled
                        >
                          {dr.namaDokter}
                        </Select.Option>
                      ) : (
                        <Select.Option key={dr.dokterId} value={dr.dokterId}>
                          {dr.namaDokter}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label="Anestesi">
                  <Select
                    showSearch
                    placeholder="Pilih Anestesi"
                    onChange={(e) => {
                      setDetailLaporan({ ...detailLaporan, anestesiId: e });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dokterSp.map((dr) =>
                      dr.spesialisId === 110 ? (
                        [
                          detailLaporan.dokterId,
                          detailLaporan.kodeDokterOperator2,
                          detailLaporan.kodeDokterOperator3,
                          detailLaporan.kodeDokterOperator4,
                        ].includes(dr.dokterId) ? (
                          <Select.Option
                            key={dr.dokterId}
                            value={dr.dokterId}
                            disabled
                          >
                            {dr.namaDokter}
                          </Select.Option>
                        ) : (
                          <Select.Option key={dr.dokterId} value={dr.dokterId}>
                            {dr.namaDokter}
                          </Select.Option>
                        )
                      ) : (
                        ""
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label="Operator 2">
                  <Select
                    showSearch
                    placeholder="Pilih Operator 2"
                    onChange={(e) => {
                      setDetailLaporan({
                        ...detailLaporan,
                        kodeDokterOperator2: e,
                      });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dokterSp.map((dr) =>
                      [
                        detailLaporan.anestesiId,
                        detailLaporan.dokterId,
                        detailLaporan.kodeDokterOperator3,
                        detailLaporan.kodeDokterOperator4,
                      ].includes(dr.dokterId) ? (
                        <Select.Option
                          key={dr.dokterId}
                          value={dr.dokterId}
                          disabled
                        >
                          {dr.namaDokter}
                        </Select.Option>
                      ) : (
                        <Select.Option key={dr.dokterId} value={dr.dokterId}>
                          {dr.namaDokter}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label="Operator 3">
                  <Select
                    showSearch
                    placeholder="Pilih Operator 3"
                    onChange={(e) => {
                      setDetailLaporan({
                        ...detailLaporan,
                        kodeDokterOperator3: e,
                      });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dokterSp.map((dr) =>
                      [
                        detailLaporan.anestesiId,
                        detailLaporan.kodeDokterOperator2,
                        detailLaporan.dokterId,
                        detailLaporan.kodeDokterOperator4,
                      ].includes(dr.dokterId) ? (
                        <Select.Option
                          key={dr.dokterId}
                          value={dr.dokterId}
                          disabled
                        >
                          {dr.namaDokter}
                        </Select.Option>
                      ) : (
                        <Select.Option key={dr.dokterId} value={dr.dokterId}>
                          {dr.namaDokter}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Operator 4">
                  <Select
                    showSearch
                    placeholder="Pilih Operator 4"
                    onChange={(e) => {
                      setDetailLaporan({
                        ...detailLaporan,
                        kodeDokterOperator4: e,
                      });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dokterSp.map((dr) =>
                      [
                        detailLaporan.anestesiId,
                        detailLaporan.kodeDokterOperator2,
                        detailLaporan.kodeDokterOperator3,
                        detailLaporan.dokterId,
                      ].includes(dr.dokterId) ? (
                        <Select.Option
                          key={dr.dokterId}
                          value={dr.dokterId}
                          disabled
                        >
                          {dr.namaDokter}
                        </Select.Option>
                      ) : (
                        <Select.Option key={dr.dokterId} value={dr.dokterId}>
                          {dr.namaDokter}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label="Asisten">
                  <Input
                    value={detailLaporan.namaAsisten}
                    onChange={(e) => {
                      setDetailLaporan({ ...detailLaporan, namaAsisten: e });
                    }}
                  />
                </Form.Item>
                <Form.Item label="Perawat Bedah">
                  <Input
                    value={detailLaporan.namaPerawat}
                    onChange={(e) => {
                      setDetailLaporan({ ...detailLaporan, namaPerawat: e });
                    }}
                  />
                </Form.Item>
                <Form.Item label="Penata Anestesi">
                  <Input
                    value={detailLaporan.namaPenataAnestesi}
                    onChange={(e) => {
                      setDetailLaporan({
                        ...detailLaporan,
                        namaPenataAnestesi: e,
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card style={{ marginTop: 10 }}>
          <Form form={form} layout="vertical" size="small">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Dx Pra Bedah">
                  <Select
                    showSearch
                    placeholder="Pilih Dx Pra Bedah"
                    onChange={(e) => {
                      setDetailLaporan({ ...detailLaporan, kodeDXPraBedah: e });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {diagnosa.map((dp) =>
                      detailLaporan.kodeDXPosBedah == dp.diagnosisId ? (
                        <Select.Option
                          key={dp.diagnosisId}
                          value={dp.diagnosisId}
                          disabled
                        >
                          {dp.diagnosisId + " - " + dp.diagnosisDesk}
                        </Select.Option>
                      ) : (
                        <Select.Option
                          key={dp.diagnosisId}
                          value={dp.diagnosisId}
                        >
                          {dp.diagnosisId + " - " + dp.diagnosisDesk}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label="Dx Pasca Bedah">
                  <Select
                    showSearch
                    placeholder="Pilih Dx Pasca Bedah"
                    onChange={(e) => {
                      setDetailLaporan({ ...detailLaporan, kodeDXPosBedah: e });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {diagnosa.map((ds) =>
                      detailLaporan.kodeDXPraBedah == ds.diagnosisId ? (
                        <Select.Option
                          key={ds.diagnosisId}
                          value={ds.diagnosisId}
                          disabled
                        >
                          {ds.diagnosisId + " - " + ds.diagnosisDesk}
                        </Select.Option>
                      ) : (
                        <Select.Option
                          key={ds.diagnosisId}
                          value={ds.diagnosisId}
                        >
                          {ds.diagnosisId + " - " + ds.diagnosisDesk}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label="Komplikasi">
                  <Input
                    value={detailLaporan.komplikasi}
                    onChange={(e) => {
                      setDetailLaporan({ ...detailLaporan, komplikasi: e });
                    }}
                  />
                </Form.Item>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item label="Perdarahan">
                      <InputNumber
                        min={0}
                        defaultValue={0}
                        formatter={(value) => `${value} CC`}
                        parser={(value) => value.replace(" CC", "")}
                        style={{ width: "100%" }}
                        onChange={(e) => {
                          setDetailLaporan({
                            ...detailLaporan,
                            penggunaanDarah: e,
                          });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item label="Jenis Anestesi">
                      <Select
                        showSearch
                        placeholder="Pilih Jenis Anestesi"
                        onChange={(e) => {
                          setDetailLaporan({
                            ...detailLaporan,
                            jenisAnestesi: e,
                          });
                        }}
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Select.Option value="01">Lokal Anestesi</Select.Option>
                        <Select.Option value="02">
                          General Anestesi
                        </Select.Option>
                        <Select.Option value="03">
                          Regional Anestesi
                        </Select.Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Form.Item label="Mulai Bedah">
                  <DatePicker
                    showTime
                    format={dateFormat[0]}
                    style={{ width: "100%" }}
                    value={dayjs(detailLaporan.mulaiBedah)}
                    onChange={(e) =>
                      setDetailLaporan({
                        ...detailLaporan,
                        mulaiBedah: dayjs(e).format(),
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Selesai Bedah">
                  <DatePicker
                    showTime
                    format={dateFormat[0]}
                    style={{ width: "100%" }}
                    value={dayjs(detailLaporan.selesaiBedah)}
                    onChange={(e) =>
                      setDetailLaporan({
                        ...detailLaporan,
                        selesaiBedah: dayjs(e).format(),
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Mulai Anestesi">
                  <DatePicker
                    showTime
                    format={dateFormat[0]}
                    style={{ width: "100%" }}
                    value={dayjs(detailLaporan.mulaiAnestesi)}
                    onChange={(e) =>
                      setDetailLaporan({
                        ...detailLaporan,
                        mulaiAnestesi: dayjs(e).format(),
                      })
                    }
                  />
                </Form.Item>
                <Form.Item label="Selesai Anestesi">
                  <DatePicker
                    showTime
                    format={dateFormat[0]}
                    style={{ width: "100%" }}
                    value={dayjs(detailLaporan.selesaiAnestesi)}
                    onChange={(e) =>
                      setDetailLaporan({
                        ...detailLaporan,
                        selesaiAnestesi: dayjs(e).format(),
                      })
                    }
                  />
                  {/* {detailLaporan.selesaiAnestesi} */}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card style={{ marginTop: 10 }}>
          <Form form={form} layout="vertical" size="small">
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Pengiriman Speciemnt Ke Laboratorium">
                  <Checkbox
                    onChange={(e) => {
                      setDetailLaporan({
                        ...detailLaporan,
                        periksaPA: e.target.checked,
                      });
                    }}
                  >
                    Laboratorium Patologi Anatomi
                  </Checkbox>
                  <Checkbox
                    onChange={(e) => {
                      setDetailLaporan({
                        ...detailLaporan,
                        periksaPK: e.target.checked,
                      });
                    }}
                  >
                    Laboratorium Patologi Klinik
                  </Checkbox>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <Card style={{ marginTop: 10 }}>
          <Form form={form} layout="vertical" size="small">
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="Jaringan yang diambil">
                  <TextArea
                    onChange={(e) => {
                      setDetailLaporan({
                        ...detailLaporan,
                        eksisi: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
        <Card style={{ marginTop: 10 }}>
          <Form form={form} layout="vertical" size="small">
            <Row gutter={24}>
              <Col span={24}>
                <Form.Item label="LAPORAN">
                  {/* <CKEditor
                    editor={ClassicEditor}
                    data={detailLaporan.laporanOperasi}
                    
                    onChange={(event, editor) => {
                      const data = editor.getData();
                      console.log({ event, editor, data });
                      setDetailLaporan({
                        ...detailLaporan,
                        laporanOperasi: data,
                      });
                    }}
                    
                  /> */}
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default DetailLaporanOP;
