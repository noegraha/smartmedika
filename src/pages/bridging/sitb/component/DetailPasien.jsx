import { Button, Card, Col, Divider, Modal, Row, Table } from "antd";
import React, { useState } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import { BridgingSITBContext } from "../context/BridgingSITBContext";
import { useContext } from "react";
import FormInputSitb from "./FormInputSitb";
import dayjs from "dayjs";

const DetailPasien = () => {
  const {
    // state
    nama,
    noSitb,
    noreg,
    nik,
    noRm,
    tglLahir,
    jenisKelamin,
    alamat,
    umur,
    listSitb,
    // form input sitb
    setidEmr,
    setidTb03,
    setriwPengobatan,
    settglPengobatan,
    setpanduanOat,
    setsblmHasilMikropis,
    setsblmHasilTesCepat,
    setsblmHasilBiakan,
    setmikropis2,
    setmikropis3,
    setmikropis5,
    setakhirMikropis,
    settglAkhir,
    sethasilAkhir,
    setfotoThorak,
    // md
    setmdDetailPx,
    mdFormInput,
    setmdFormInput,
    // sp
    spDetailPasien,
    spListEmrSitb,
    // func
    getDetailEmrSitb,
  } = useContext(BridgingSITBContext);

  const [judulForm, setjudulForm] = useState("second");

  const dataRiwayat = [
    {
      id: "1",
      desk: "Baru",
    },
    {
      id: "2",
      desk: "Kambuh",
    },
    {
      id: "3",
      desk: "Diobati setelah gagal kategori 1",
    },
    {
      id: "4",
      desk: "Diobati setelah gagal kategori 2",
    },
    {
      id: "5",
      desk: "Diobati setelah putus berobat",
    },
    {
      id: "6",
      desk: "Diobati setelah gagal pengobatan lini 2",
    },
    {
      id: "7",
      desk: "Pernah diobati tidak diketahui hasilnya",
    },
    {
      id: "8",
      desk: "Tidak diketahui",
    },
    {
      id: "9",
      desk: "Lain-lain",
    },
  ];

  const columns = [
    {
      title: "No",
      dataIndex: "NoUrut",
      key: "NoUrut",
      width: 35,
    },
    {
      title: "Id TB 03",
      dataIndex: "Tb03Id",
      key: "Tb03Id",
      // width: 200,
    },
    {
      title: "Diagnosis Id",
      dataIndex: "DiagnosisId",
      key: "DiagnosisId",
    },
    {
      title: "Riwayat Pengobatan",
      dataIndex: "Riwayat",
      key: "Riwayat",
      render: (text) => (
        <span>
          {dataRiwayat
            .filter((data) => data.id === text)
            .map((dataFilter) => dataFilter.desk)}
        </span>
      ),
      // width: 200,
      // ellipsis: true,
    },
    {
      title: "Tgl. Mulai Pengobatan",
      dataIndex: "TglMulai",
      key: "TglMulai",
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
      // width: 200,
      // ellipsis: true,
    },
    {
      title: "Tgl. Update",
      dataIndex: "TglUpdate",
      key: "TglUpdate",
      render: (text) =>
        text !== null ? dayjs(text).format("DD-MM-YYYY") : "-",
      // width: 200,
      // ellipsis: true,
    },
    {
      title: "Aksi",
      key: "operation",
      fixed: "right",
      align: "center",
      width: 50,
      render: (text, record, index) => (
        <Button
          onClick={() => klikEdit(record.Id)}
          type="primary"
          icon={<EditOutlined />}
          // disabled={record.StsDatang}
          // disabled
          size="small"
          style={{ width: "30px" }}
        />
        // <Space size="small">
        //     <Button
        //         type="primary"
        //         danger
        //         // onClick={() => klikDelIhc(index)}
        //         size="small"
        //         style={{ width: '30px' }}
        //     >
        //         <DeleteOutlined />
        //     </Button>
        // </Space>
      ),
    },
  ];

  const locale = {
    emptyText: "Belum ada Data Kirim SITB",
  };

  const data = [];
  for (let i = 0; i < 5; i++) {
    data.push({
      NoUrut: i + 1,
      idTb03: "3302026/SRIA/1973829/1",
      icd10: "A18.3",
      riwPengobatan: "Diobati setelah gagal pengobatan lini 2",
      tgl: "06/01/2020",
    });
  }

  const resetFormInputSitb = () => {
    setidEmr(null);
    setidTb03(null);
    setriwPengobatan(null);
    settglPengobatan(dayjs());
    setpanduanOat(null);
    setsblmHasilMikropis("Tidak Dilakukan");
    setsblmHasilTesCepat("Tidak Dilakukan");
    setsblmHasilBiakan("Tidak Dilakukan");
    setmikropis2("Tidak Dilakukan");
    setmikropis3("Tidak Dilakukan");
    setmikropis5("Tidak Dilakukan");
    setakhirMikropis("Tidak Dilakukan");
    settglAkhir("2020-01-01");
    sethasilAkhir(null);
    setfotoThorak(null);
  };

  const klikDataBaru = () => {
    setmdFormInput(true);
    resetFormInputSitb();
    setjudulForm("Kirim Data SITB Baru");
  };

  const klikEdit = (data) => {
    // setmdFormInput(true)
    setjudulForm("Update Data SITB");
    getDetailEmrSitb(data);
    console.log("klikEdit : ", data);
  };

  return (
    <div>
      <Card loading={spDetailPasien} bodyStyle={{ padding: "5px" }}>
        <Row>
          <Col span={3}>
            <span style={{ fontSize: 16 }}>
              <b>Nama</b>
            </span>
          </Col>
          <Col span={9}>
            <span style={{ fontSize: 16 }}>
              <b>: {nama}</b>
            </span>
          </Col>
          <Col span={3}>
            <span style={{ fontSize: 16 }}>
              <b>No. SITB</b>
            </span>
          </Col>
          <Col span={9}>
            <span style={{ fontSize: 16 }}>
              <b>: {noSitb}</b>
            </span>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <span>
              <b>No. Registrasi</b>
            </span>
          </Col>
          <Col span={9}>
            <span>: {noreg}</span>
          </Col>
          <Col span={3}>
            <span>
              <b>NIK</b>
            </span>
          </Col>
          <Col span={5}>
            <span>: {nik}</span>
          </Col>
          <Col span={2}>
            <span>
              <b>No. Pasien</b>
            </span>
          </Col>
          <Col span={2}>
            <span>: {noRm}</span>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <span>
              <b>Tgl.Lahir</b>
            </span>
          </Col>
          <Col span={9}>
            <span>: {dayjs(tglLahir).format("DD-MM-YYYY")}</span>
          </Col>
          <Col span={3}>
            <span>
              <b>Jenis Kelamin</b>
            </span>
          </Col>
          <Col span={9}>
            <span>: {jenisKelamin}</span>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <span>
              <b>Alamat</b>
            </span>
          </Col>
          <Col span={9}>
            <span>: {alamat}</span>
          </Col>
          <Col span={3}>
            <span>
              <b>Umur</b>
            </span>
          </Col>
          <Col span={9}>
            <span>: {umur}</span>
          </Col>
        </Row>

        <hr />

        <Divider orientation="left" plain style={{ margin: "0px" }}>
          Daftar Kirim SITB
        </Divider>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => klikDataBaru()}
          style={{ width: "150px" }}
        >
          Kirim Data Baru
        </Button>

        <Table
          columns={columns}
          dataSource={listSitb}
          locale={locale}
          loading={spListEmrSitb}
          size="small"
          // scroll={{
          //     y: 450,
          // }}
          bordered
          pagination={false}
          style={{ marginTop: "5px", width: "100%", marginBottom: "5px" }}
        />

        <Row>
          <Col span={24}>
            <Button
              type="primary"
              danger
              onClick={() => setmdDetailPx(false)}
              style={{ float: "right", width: "150px" }}
            >
              Keluar
            </Button>
          </Col>
        </Row>
      </Card>

      <Modal
        // title="Detail Pasien Tuberkulosis"
        // centered
        open={mdFormInput}
        closable={false}
        footer={null}
        width={1000}
        style={{ top: 20 }}
      >
        <Divider
          orientation="left"
          style={{ backgroundColor: "#1677ff", margin: "0px", color: "white" }}
        >
          {judulForm}
        </Divider>
        <FormInputSitb />
      </Modal>
    </div>
  );
};

export default DetailPasien;
