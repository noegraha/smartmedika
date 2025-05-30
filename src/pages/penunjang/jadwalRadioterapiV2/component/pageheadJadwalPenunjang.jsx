import React, { Fragment, useContext, useState } from "react";
import dayjs from "dayjs";
import {
  Select,
  Input,
  Space,
  Table,
  Modal,
  Button,
  Row,
  Col,
  DatePicker,
  Popconfirm,
} from "antd";
import { PageHeader } from "@ant-design/pro-components";
import {
  PlusOutlined,
  SyncOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckOutlined,
  SearchOutlined,
  FundProjectionScreenOutlined,
} from "@ant-design/icons";
import { JadwalPenunjangContext } from "../context/JadwalPenunjangContext";
import FormAturJadwal from "./FormAturJadwal";
import "../style/style.css";
import DashboardJadwalPenunjang from "./DashboardJadwalPenunjang";

const { Option } = Select;

const PageheadJadwalPenunjang = () => {
  const {
    // main
    unitId,
    listJadwal,
    tglAwal,
    settglAwal,
    tglAkhir,
    settglAkhir,
    idJadwal,
    setidJadwal,
    nama,
    setnama,
    setnoReg,
    setbookingOpId,
    alamat,
    setalamat,
    noRm,
    setnoRm,
    jenisKelamin,
    setjenisKelamin,
    setnoKartu,
    setnoTelp,
    diagnosa,
    setdiagnosa,
    tglLahir,
    settglLahir,
    jnsPelayanan,
    setjnsPelayanan,
    tglPelayanan,
    settglPelayanan,
    setkodePmr,
    catatan,
    setcatatan,
    setlistCounta,
    ip,
    host,
    nmUser,
    setdtGrafik, // dashboard
    // modal
    mdBuatJadwal,
    setmdBuatJadwal,
    mdEditJadwal,
    setmdEditJadwal,
    mdDashboard,
    setmdDashboard,
    // mst
    penunjang,
    jpRadioterapi,
    jpRadiologi,
    // func
    setDefault,
    getListJadwal,
    getJadwalBySearch,
    updateStsDatang,
    hapusJadwal,
    // spin
    spinListJadwal,
  } = useContext(JadwalPenunjangContext);

  const [ktgCari, setktgCari] = useState("1");
  const [sCari, setsCari] = useState("");

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
      align: "center",
      width: 40,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Tgl.Pelayanan",
      dataIndex: "TglPelayanan",
      key: "TglPelayanan",
      align: "center",
      width: 90,
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "Nama",
      dataIndex: "Nama",
      key: "Nama",
      align: "center",
      width: 200,
      sorter: (a, b) => a.Nama.localeCompare(b.Nama),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "No RM",
      dataIndex: "PasienId",
      key: "PasienId",
      align: "center",
      width: 75,
    },
    // {
    //   title: 'Diagnosa',
    //   dataIndex: 'Diagnosa',
    //   key: 'Diagnosa',
    //   align: 'center',
    //   width: 200,
    //   render: text => <div>{text}</div>,
    // },
    {
      title: "Jenis Pelayanan",
      dataIndex: "JnsPelayanan",
      key: "JnsPelayanan",
      align: "center",
      width: 150,
      // ellipsis: true,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Catatan",
      dataIndex: "Catatan",
      key: "Catatan",
      align: "center",
      width: 300,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Alamat",
      dataIndex: "Alamat",
      key: "Alamat",
      align: "center",
      width: 300,
      ellipsis: true,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Aksi",
      key: "operation",
      fixed: "right",
      align: "center",
      width: 100,
      render: (text, record, index) => (
        <Space size="small">
          <Popconfirm
            title="Apakah pasien datang?"
            onConfirm={() => klikYaStsDatang(index)}
            // onCancel={cancel}
            okText="Ya"
            cancelText="Tidak"
            disabled={record.StsDatang}
          >
            <Button
              type="text"
              icon={<CheckOutlined />}
              size="small"
              disabled={record.StsDatang}
              style={{ backgroundColor: "#52c41a", color: "white" }}
            />
          </Popconfirm>
          <Button
            onClick={() => klikEdit(index)}
            type="primary"
            icon={<EditOutlined />}
            disabled={record.StsDatang}
            // disabled
            size="small"
          />
          <Popconfirm
            title="Yakin akan dihapus?"
            onConfirm={() => klikYaHapus(index)}
            // onCancel={cancel}
            okText="Ya"
            cancelText="Tidak"
            disabled={record.StsDatang}
          >
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              danger
              disabled={record.StsDatang}
              size="small"
            />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const klikDashboard = () => {
    setmdDashboard(true);
    setdtGrafik([]);
  };

  const selectBefore = (
    <Select
      value={ktgCari}
      onChange={(e) => changeKtgCari(e)}
      style={{ width: 75 }}
    >
      <Option value="1">No RM</Option>
      <Option value="2">Nama</Option>
    </Select>
  );

  const changeKtgCari = (e) => {
    setktgCari(e);
    setsCari("");
  };

  const changeTglAkhir = (e) => {
    settglAkhir(e);
    getListJadwal(
      unitId,
      dayjs(tglAwal).format("YYYY-MM-DD"),
      dayjs(e).format("YYYY-MM-DD")
    );
  };

  const klikEnter = (sRuangId, sTglAwal, sTglAkhir) => {
    getListJadwal(
      sRuangId,
      dayjs(sTglAwal).format("YYYY-MM-DD"),
      dayjs(sTglAkhir).format("YYYY-MM-DD")
    );
  };

  const klikCari = (ktgCari, unitId, sCari) => {
    if (ktgCari === "1" && (sCari.length < 8 || sCari.length > 8)) {
      Modal.warning({
        title: "Peringatan!",
        content: "No.Pasien belum tepat!",
      });
    } else if (ktgCari === "2" && (sCari.length < 4 || sCari.length > 25)) {
      Modal.warning({
        title: "Peringatan!",
        content: "Nama yang dicari terlalu pendek/panjang!",
      });
    } else {
      getJadwalBySearch(ktgCari, unitId, sCari);
    }
  };

  const klikBuatJadwal = () => {
    setDefault();
    // loadPelayananRuang(unitId)
    setlistCounta([]);
    setmdBuatJadwal(true);
  };

  const klikEdit = (index) => {
    setmdEditJadwal(true);
    // console.log('listJadwal : ', listJadwal[index]);
    let temp = listJadwal[index];

    // console.log('data index : ', temp);
    setidJadwal(temp.Id);
    setnama(temp.Nama);
    setnoReg(temp.RegistrasiId);
    setbookingOpId(temp.BookingOPId);
    setalamat(temp.Alamat);
    setnoRm(temp.PasienId);
    setjenisKelamin(temp.JenisKelaminId);
    setnoKartu(temp.NomorPeserta);
    setnoTelp(temp.NoTelpon);
    setdiagnosa(temp.Diagnosa);
    settglLahir(dayjs(temp.TanggalLahir));
    setjnsPelayanan(temp.JnsPelayanan);
    settglPelayanan(dayjs(temp.TglPelayanan));
    setkodePmr(temp.KodePMR);
    setcatatan(temp.Catatan);
  };

  const klikYaHapus = (index) => {
    console.log("temp : ", listJadwal[index]);
    let data = {
      registrasiId: listJadwal[index].RegistrasiId,
      pasienId: listJadwal[index].PasienId,
      ruangId: listJadwal[index].RuangId,
      tglOperasi: dayjs(listJadwal[index].TglPelayanan).format(),
      bookingOpId: listJadwal[index].BookingOPId,
      kodePmr: listJadwal[index].KodePMR,
      userId: nmUser,
      clientHost: host,
      clientIP: ip,
    };

    // console.log('hapus : ', data);
    hapusJadwal(data);
  };

  const klikYaStsDatang = (index) => {
    if (
      dayjs(listJadwal[index].TglPelayanan).format("YYYY-MM-DD") !==
      dayjs().format("YYYY-MM-DD")
    ) {
      Modal.warn({
        title: "Peringatan!",
        content:
          "Tanggal pelayanan bukan hari ini, tidak bisa update Status Datang.",
      });
    } else {
      let data = {
        registrasiId: listJadwal[index].RegistrasiId,
        pasienId: listJadwal[index].PasienId,
        ruangId: listJadwal[index].RuangId,
        bookingOpId: listJadwal[index].BookingOPId,
        userId: nmUser,
        clientHost: host,
        clientIP: ip,
      };

      // console.log('data : ', data);
      updateStsDatang(data);
    }
  };

  const data = [];
  for (let i = 0; i < 1000; i++) {
    data.push({
      key: i,
      No: i + 1,
      TglPelayanan: "02-06-2022",
      Nama: "ABDURRAKHMAN ALHAKIM, SDR",
      NoPasien: "02187472",
      Diagnosa: "DEVIASI NASAL SEPTUM DENGAN HIPERTROPI KONKA",
      JnsPelayanan: "Konvensional + Kontras",
      Catatan: "DEVIASI NASAL SEPTUM DENGAN HIPERTROPI KONKA",
      Alamat: "DEVIASI NASAL SEPTUM DENGAN HIPERTROPI KONKA",
    });
  }

  return (
    <Fragment>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
          zIndex: 1,
          paddingTop: 6,
          paddingBottom: 6,
          paddingRight: 6,
          paddingLeft: 28,
          backgroundColor: "white",
        }}
        bordered
      >
        <Row>
          <Col span={12}>
            <span style={{ marginLeft: "5px" }}>
              <b>
                JADWAL PELAYANAN&nbsp;
                {unitId
                  ? penunjang
                      .filter((opt) => opt.ruangId.includes(unitId))
                      .map((filteredName) => (
                        <span>{filteredName.deskripsi}</span>
                      ))
                  : "-"}
              </b>
            </span>
          </Col>
          <Col span={12}>
            <Button
              onClick={() => klikDashboard()}
              type="primary"
              size="small"
              disabled={unitId ? false : true}
              // disabled
              icon={<FundProjectionScreenOutlined />}
              style={{ float: "right" }}
            >
              Dashboard
            </Button>
          </Col>
        </Row>

        <hr />

        <Row style={{ marginBottom: 7 }}>
          <Col
            span={12}
            style={{ borderStyle: "none solid none solid", borderWidth: 1 }}
          >
            <Space style={{ marginLeft: 10 }}>
              <span>Tanggal : </span>
              <DatePicker
                value={dayjs(tglAwal)}
                onChange={(e) => settglAwal(e)}
                disabledDate={(current) => {
                  let customDate = dayjs().format("YYYY-MM-DD");
                  return current && current < dayjs(customDate, "YYYY-MM-DD");
                }}
                format="DD-MM-YYYY"
                allowClear={false}
                inputReadOnly={true}
                style={{ width: "100%" }}
              />

              <span>-</span>

              <DatePicker
                value={dayjs(tglAkhir)}
                onChange={(e) => changeTglAkhir(e)}
                disabledDate={(current) => {
                  return (
                    dayjs(tglAwal).add(-1, "days") >= current ||
                    dayjs(tglAwal).add(1, "month") <= current
                  );
                }}
                // size='small'
                format="DD-MM-YYYY"
                allowClear={false}
                inputReadOnly={true}
                style={{ width: "100%" }}
              />

              <Button
                type="primary"
                disabled={unitId ? false : true}
                onClick={() => klikEnter(unitId, tglAwal, tglAkhir)}
                icon={<SyncOutlined />}
                style={{ float: "right" }}
              />
            </Space>
          </Col>
          <Col span={8}>
            <Input.Group compact style={{ marginLeft: 10 }}>
              <Input
                addonBefore={selectBefore}
                value={sCari}
                onChange={(e) => setsCari(e.target.value)}
                // type='number'
                style={{ width: "80%" }}
              />
              <Button
                type="primary"
                icon={<SearchOutlined />}
                // disabled
                onClick={() => klikCari(ktgCari, unitId, sCari)}
              />
            </Input.Group>
          </Col>
          <Col span={4}>
            <Button
              type="primary"
              disabled={unitId ? false : true}
              onClick={() => klikBuatJadwal()}
              icon={<PlusOutlined />}
              style={{ float: "right" }}
            >
              Buat Jadwal
            </Button>
          </Col>
        </Row>

        <Table
          dataSource={listJadwal}
          columns={columns}
          bordered
          loading={spinListJadwal}
          pagination={listJadwal.length < 100 ? false : true}
          size="small"
          rowClassName={(record, index) =>
            record.StsDatang && record.StsDatang ? "pasien_datang" : ""
          }
          scroll={{ y: 420 }}
          style={{ height: 495 }}
        />
      </PageHeader>

      <Modal
        // title='Form Buat Jadwal'
        visible={mdBuatJadwal}
        // onCancel={() => setmdBuatJadwal(false)}
        closable={false}
        footer={null}
        width={800}
        style={{ top: 40 }}
      >
        <FormAturJadwal />
      </Modal>

      <Modal
        // title='Form Buat Jadwal'
        visible={mdEditJadwal}
        // onCancel={() => setmdBuatJadwal(false)}
        closable={false}
        footer={null}
        width={800}
        style={{ top: 40 }}
      >
        <FormAturJadwal />
      </Modal>

      <Modal
        title="Dashboard Jadwal Penunjang"
        visible={mdDashboard}
        onCancel={() => setmdDashboard(false)}
        closable={false}
        footer={null}
        width={1200}
        style={{ top: 25 }}
      >
        <DashboardJadwalPenunjang />
      </Modal>
    </Fragment>
  );
};
export default PageheadJadwalPenunjang;
