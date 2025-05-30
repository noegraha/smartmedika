import {
  CheckSquareTwoTone,
  CloudDownloadOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  FileSearchOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Col,
  Divider,
  Empty,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Spin,
  Table,
  message,
} from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import React, { useContext, useState } from "react";
import { BankDarahContext } from "../context/BankDarahContext";
import "../style/style.css";
import { LoginContext } from "../../../rawatjalan/context";

const { Option } = Select;
const { confirm } = Modal;

const FormPermintaanDarah = () => {
  const {
    listDokter,
    listOrderNonValid,
    listOrderValid,
    listDiagnosa,
    RiwGolDarah,
    riwGolDaLabPK,
    listHasilLab,
    ktgjnsDarah,
    // state
    ruangId,
    noOrder,
    unitTujuan,
    setunitTujuan,
    dtPasien,
    dtOrderDarah,
    dxOrder,
    setdxOrder,
    hb,
    sethb,
    trombo,
    settrombo,
    golDarahPx,
    setgolDarahPx,
    golDarahPermintaan,
    setgolDarahPermintaan,
    ketBedaGolDarah,
    setketBedaGolDarah,
    volSample,
    setvolSample,
    kondSample,
    setkondSample,
    indTrans,
    setindTrans,
    namaDr,
    setnamaDr,
    jnsDarah,
    setjnsDarah,
    jmlKantong,
    setjmlKantong,
    listPermintaan,
    setlistPermintaan,
    // userOrder,
    // ipClient,
    // hostClient,
    // sp
    spNoOrder,
    spTbOrder,
    spSimpanOrder,
    spRiwGolDarah,
    spHasilLab,
    // md
    mdTambahOrder,
    setmdTambahOrder,
    mdDetailNonValid,
    setmdDetailNonValid,
    // func
    rstFormOrder,
    getListDokter,
    getDetailOrderOnOrder,
    getNoOrder,
    getDiagnosaPx,
    getRiwayatGolDaraf,
    getRiwayatGolDarahLabPK,
    getHasilLabHbTrombosit,
    simpanOrder,
    hapusOrder,
  } = useContext(BankDarahContext);

  const [cekRiwGolDarah, setcekRiwGolDarah] = useState(false);
  const [mdJenisDarah, setmdJenisDarah] = useState(false);
  const [mdRiwGolDarah, setmdRiwGolDarah] = useState(false);
  const [mdHasilLab, setmdHasilLab] = useState(false);
  const [mdDiagnosis, setmdDiagnosis] = useState(false);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser } = useContext(LoginContext);

  const columns = [
    {
      title: "Jenis Darah",
      dataIndex: "jenisDarah",
      key: "jenisDarah",
      render: (jenisDarah) => {
        const matchingData = ktgjnsDarah.find((item) => item.id === jenisDarah);
        return matchingData ? matchingData.desk : "Tidak ditemukan";
      },
    },
    {
      title: "Kantong",
      dataIndex: "jmlKantong",
      key: "jmlKantong",
      align: "center",
      width: 50,
    },
    {
      title: "Aksi",
      align: "center",
      width: 50,
      render: (text, record, index) => (
        <Button
          onClick={() => klikDelJnsDarah(index)}
          type="primary"
          danger
          icon={<DeleteOutlined />}
          // disabled={record.StsDatang}
          size="small"
          style={{ width: "30px" }}
        />
      ),
    },
  ];

  const columnss = [
    {
      title: "Jenis Darah",
      dataIndex: "JenisDarah",
      key: "JenisDarah",
      render: (jenisDarah) => {
        const matchingData = ktgjnsDarah.find((item) => item.id === jenisDarah);
        return matchingData ? matchingData.desk : "Tidak ditemukan";
      },
    },
    {
      title: "Kantong",
      dataIndex: "JmlKantong",
      key: "JmlKantong",
      align: "center",
      width: 50,
    },
  ];

  const columnsa = [
    {
      title: "No.Order",
      dataIndex: "NoOrder",
      key: "NoOrder",
      align: "center",
      width: 50,
    },
    {
      title: "No.Reg",
      dataIndex: "RegistrasiId",
      key: "RegistrasiId",
      align: "center",
      width: 50,
    },
    {
      title: "Tgl.Order",
      dataIndex: "TglOrder",
      key: "TglOrder",
      align: "center",
      width: 120,
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY HH:mm")}</span>,
    },
    {
      title: "Unit Tujuan",
      dataIndex: "NamaRuang",
      key: "NamaRuang",
    },
    {
      title: "Nama Dokter",
      dataIndex: "NAMADOKTER",
      key: "NAMADOKTER",
    },

    {
      title: "Jenis Darah",
      dataIndex: "JnsDarah",
      key: "JnsDarah",
    },
    {
      title: "Jml",
      dataIndex: "TotalJmlKantong",
      key: "TotalJmlKantong",
      align: "center",
      width: 50,
    },
    {
      title: "Aksi",
      align: "center",
      width: 50,
      render: (text, record, index) => (
        <Space>
          <Button
            onClick={() => klikDetailOrderNonValid(record.NoOrder)}
            type="primary"
            icon={<FileSearchOutlined />}
            size="small"
            style={{ width: "30px" }}
          />
          <Button
            onClick={() => klikDeleteOrder(record.NoOrder, record.UserId)}
            type="primary"
            danger
            icon={<DeleteOutlined />}
            size="small"
            style={{ width: "30px" }}
          />
        </Space>
      ),
    },
  ];

  const columnsaa = [
    {
      title: "No.Order",
      dataIndex: "NoOrder",
      key: "NoOrder",
      align: "center",
      width: 50,
    },
    {
      title: "No.Reg",
      dataIndex: "RegistrasiId",
      key: "RegistrasiId",
      align: "center",
      width: 50,
    },
    {
      title: "Tgl.Order",
      dataIndex: "TglOrder",
      key: "TglOrder",
      align: "center",
      width: 120,
      render: (text) => <span>{dayjs(text).format("DD-MM-YYYY HH:mm")}</span>,
    },
    {
      title: "Unit Tujuan",
      dataIndex: "NamaRuang",
      key: "NamaRuang",
    },
    {
      title: "Nama Dokter",
      dataIndex: "NAMADOKTER",
      key: "NAMADOKTER",
    },

    {
      title: "Jenis Darah",
      dataIndex: "JnsDarah",
      key: "JnsDarah",
    },
    {
      title: "Jml",
      dataIndex: "TotalJmlKantong",
      key: "TotalJmlKantong",
      align: "center",
      width: 50,
    },
    {
      title: "Aksi",
      align: "center",
      width: 50,
      render: (text, record, index) => (
        <Space>
          <Button
            onClick={() => klikDetailOrderNonValid(record.NoOrder)}
            type="primary"
            icon={<FileSearchOutlined />}
            // disabled
            size="small"
            style={{ width: "30px" }}
          />
        </Space>
      ),
    },
  ];

  const columnsb = [
    {
      title: "No.Registrasi",
      dataIndex: "RegistrasiId",
      key: "RegistrasiId",
      align: "center",
    },
    {
      title: "Golongan Darah",
      dataIndex: "GolDarah",
      key: "GolDarah",
      align: "center",
    },
    {
      title: "Aksi",
      align: "center",
      width: 50,
      render: (text, record, index) => (
        <Space>
          <Button
            onClick={() => klikCopyGolDar(record.GolDarah)}
            // type="primary"
            icon={<CheckSquareTwoTone twoToneColor="#52c41a" />}
            // disabled={record.StsDatang}
            size="small"
            style={{ width: "30px" }}
          />
        </Space>
      ),
    },
  ];

  const colTbHasilLab = [
    {
      title: "LabNomor",
      dataIndex: "LabNomor",
      key: "LabNomor",
      align: "center",
    },
    {
      title: "LabNama",
      dataIndex: "LabNama",
      key: "LabNama",
      align: "center",
    },
    {
      title: "LabHasil",
      dataIndex: "LabHasil",
      key: "LabHasil",
      align: "LabHasil",
    },
    {
      title: "Interpretasi",
      dataIndex: "Interpretasi",
      key: "Interpretasi",
      align: "Interpretasi",
    },
    {
      title: "LabSatuan",
      dataIndex: "LabSatuan",
      key: "LabSatuan",
      align: "LabSatuan",
    },
    {
      title: "LabHargaNorm",
      dataIndex: "LabHargaNorm",
      key: "LabHargaNorm",
      align: "LabHargaNorm",
    },
    {
      title: "UserDate",
      dataIndex: "UserDate",
      key: "UserDate",
      align: "UserDate",
      render: (text) => dayjs(text).format("DD-MM-YY HH:mm"),
    },
    {
      title: "Aksi",
      align: "center",
      width: 50,
      render: (text, record, index) => (
        <Space>
          <Button
            onClick={() => {
              if (record.LabNama === "Hemoglobin") {
                sethb(record.LabHasil);
              } else if (record.LabNama === "Trombosit") {
                settrombo(record.LabHasil);
              }
            }}
            // type="primary"
            icon={<CheckSquareTwoTone twoToneColor="#52c41a" />}
            // disabled={record.StsDatang}
            size="small"
            style={{ width: "30px" }}
          />
        </Space>
      ),
    },
  ];

  const colTbDiagnosis = [
    {
      title: "No. Registrasi",
      dataIndex: "RegistrasiId",
      key: "RegistrasiId",
      align: "center",
    },
    {
      title: "No. Urut",
      dataIndex: "NoUrut",
      key: "NoUrut",
      align: "center",
    },
    {
      title: "Diagnosis",
      dataIndex: "Diagnosis",
      key: "Diagnosis",
      align: "center",
    },
    {
      title: "Aksi",
      align: "center",
      width: 50,
      render: (text, record, index) => (
        <Space>
          <Button
            onClick={() => {
              if (dxOrder) {
                let data = dxOrder + ", " + record.Diagnosis;
                setdxOrder(data);
              } else {
                let data = record.Diagnosis;
                setdxOrder(data);
              }
            }}
            // type="primary"
            icon={<CheckSquareTwoTone twoToneColor="#52c41a" />}
            // disabled={record.StsDatang}
            size="small"
            style={{ width: "30px" }}
          />
        </Space>
      ),
    },
  ];

  const locale = {
    emptyText: <Empty description="Tidak ada data" />,
  };

  const tempdata = [
    {
      id: "PRC",
      jenisDarah: "Packet Red Cell",
      qty: "1",
    },
    {
      id: "WB",
      jenisDarah: "Whole Blood",
      qty: "5",
    },
  ];

  const temp = [
    {
      id: "Bedah",
      desk: "Bedah",
    },
    {
      id: "Anak",
      desk: "Anak",
    },
    {
      id: "Obsgin",
      desk: "Obsgin",
    },
    {
      id: "Penyakit Dalam",
      desk: "Penyakit Dalam",
    },
    // {
    //     id: 'Lainnya',
    //     desk: 'Lainnya'
    // },
  ];

  const klikTambah = () => {
    if (listOrderNonValid.length !== 0) {
      Modal.warning({
        title: "Peringatan!",
        content:
          "Masih ada order yang belum tervalidasi, tidak bisa menambah order!",
      });
    } else {
      rstFormOrder();
      getNoOrder();
      setcekRiwGolDarah(false);
      setmdTambahOrder(true);
    }
  };

  // Formatter untuk menampilkan nilai tanpa koma
  const formatValue = (value) => {
    return `${value}`.replace(/,/g, ".");
  };

  const klikDetailOrderNonValid = (sNoOrder) => {
    getDetailOrderOnOrder(sNoOrder);
  };

  const klikDeleteOrder = (sNoOrder, user) => {
    console.log("klikDeleteOrder : ", sNoOrder, user);
    if (user !== namauser) {
      Modal.warning({
        title: "Peringatan!",
        content: `UserId tidak sama dengan UserId Order, tidak bisa Hapus! => User Order : ${user}`,
      });
    } else {
      confirm({
        title: "Yakin akan Hapus Order Unit Transfusi Darah (UTD)?",
        icon: <ExclamationCircleFilled />,
        content: `Nomor Order : ${sNoOrder}`,
        okText: "Hapus",
        okType: "danger",
        cancelText: "Batal",
        onOk() {
          let data = {};
          data.noOrder = sNoOrder;

          hapusOrder(data);
        },
      });
    }
  };

  const klikSimpan = () => {
    if (!dxOrder) {
      Modal.warning({
        title: "Peringatan!",
        content: "Diagnosa masih kosong!",
      });
    } else if (!unitTujuan) {
      Modal.warning({
        title: "Peringatan!",
        content: "Unit Tujuan masih kosong!",
      });
    } else if (!hb) {
      Modal.warning({ title: "Peringatan!", content: "Hb masih kosong!" });
    } else if (!trombo) {
      Modal.warning({
        title: "Peringatan!",
        content: "Trombosit masih kosong!",
      });
    } else if (!cekRiwGolDarah && !golDarahPx) {
      Modal.warning({
        title: "Peringatan!",
        content: "Golongan Darah Pasein masih kosong!",
      });
    } else if (!cekRiwGolDarah && !golDarahPermintaan) {
      Modal.warning({
        title: "Peringatan!",
        content: "Golongan Darah Permintaan masih kosong!",
      });
    } else if (!volSample) {
      Modal.warning({
        title: "Peringatan!",
        content: "Volume Sample masih kosong!",
      });
    } else if (volSample < 2.5) {
      Modal.warning({
        title: "Peringatan!",
        content: "Volume Sample minimal 2.5cc!",
      });
    } else if (!kondSample) {
      Modal.warning({
        title: "Peringatan!",
        content: "Kondisi Sample masih kosong!",
      });
    } else if (!indTrans) {
      Modal.warning({
        title: "Peringatan!",
        content: "Indikasi Transfusi masih kosong!",
      });
    } else if (!namaDr) {
      Modal.warning({
        title: "Peringatan!",
        content: "Nama Dokter masih kosong!",
      });
    } else if (listPermintaan.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "Darah yang diminta masih kosong!",
      });
    } else {
      let data = {
        noOrder: noOrder,
        tglOrder: dayjs().format(),
        registrasiId: dtPasien.RegistrasiId,
        pasienId: dtPasien.PasienId,
        unitAsal: ruangId,
        unitTujuan: unitTujuan,
        diagnosaPasien: dxOrder,
        hb: hb,
        trombosit: trombo,
        golonganDarahPx: golDarahPx,
        golonganDarahOrder: golDarahPermintaan,
        ketBedaGolongan: ketBedaGolDarah,
        volumeSample: volSample,
        kondisiSample: kondSample,
        indikasiTransfusi: indTrans,
        dokterId: namaDr,
        listPermintaan: listPermintaan,
        userId: namauser,
        clientIP: ip,
        clientHost: host,
      };

      console.log("klikSimpan : ", data);
      simpanOrder(data);
    }
  };

  const klikTambahJnsDarah = () => {
    setmdJenisDarah(true);
    setjnsDarah();
    setjmlKantong();
  };

  const klikSimpanJnsDarah = () => {
    if (!jnsDarah) {
      Modal.warning({
        title: "Peringatan!",
        content: "Jenis Darah masih kosong!",
      });
    } else if (!jmlKantong) {
      Modal.warning({
        title: "Peringatan!",
        content: "Jenis Darah masih kosong!",
      });
    } else {
      const totalKantongSebelumnya = listPermintaan.reduce(
        (acc, item) => acc + item.jmlKantong,
        0
      );

      const totalKantongBaru =
        totalKantongSebelumnya + parseInt(jmlKantong, 10);

      if (totalKantongBaru <= 4) {
        let data = {
          jenisDarah: jnsDarah,
          jmlKantong: jmlKantong,
        };

        setlistPermintaan((current) => [...current, data]);

        setmdJenisDarah(false);

        console.log("klikSimpanJnsDarah : ", data);
      } else {
        Modal.warning({
          title: "Peringatan!",
          content: "Total jumlah kantong tidak boleh lebih dari 4!",
        });
      }
    }
  };

  const klikDelJnsDarah = (index) => {
    setlistPermintaan((prevActions) =>
      prevActions.filter((value, i) => i !== index)
    );
  };

  const klikRiwGolDarah = (sNoreg, sPasienId) => {
    getRiwayatGolDaraf(sNoreg);
    getRiwayatGolDarahLabPK(sPasienId);
    setmdRiwGolDarah(true);
  };

  const klikCopyGolDar = (golDar) => {
    setgolDarahPx(golDar);
    setmdRiwGolDarah(false);
    message.success(
      `Berhasil menyalin Golongan Darah Pasien. Golongan Darah => ${golDar}`
    );
  };

  const klikLihatLab = (sNoreg) => {
    setmdHasilLab(true);
    getHasilLabHbTrombosit(sNoreg);
  };

  const klikDiagnosis = (sNoreg) => {
    setmdDiagnosis(true);
    getDiagnosaPx(sNoreg);
  };

  return (
    <>
      <Row style={{ marginBottom: "5px" }}>
        <Col span={21} style={{ paddingRight: "10px" }}>
          <Divider
            orientation="left"
            // orientationMargin="0"
            style={{ backgroundColor: "#fff1b8", margin: "0px" }}
          >
            Daftar Order Darah
          </Divider>
        </Col>
        <Col span={3}>
          <Button
            disabled={dtPasien.length === 0 || ruangId.startsWith('94') ? true : false}
            onClick={() => klikTambah()}
            type="primary"
            icon={<PlusOutlined />}
            style={{ float: "right" }}
          >
            Tambah Order
          </Button>
        </Col>
      </Row>

      <Table
        bordered
        loading={spTbOrder}
        columns={columnsa}
        dataSource={listOrderNonValid}
        pagination={false}
        locale={locale}
        style={{ marginBottom: "5px" }}
      />

      <Divider
        orientation="left"
        style={{ backgroundColor: "#fff1b8", margin: "0px" }}
      >
        Order Darah Tervalidasi
      </Divider>

      <Table
        bordered
        loading={spTbOrder}
        rowClassName={(record, index) =>
          record.StsValid === "1" ? null : "kirim"
        }
        columns={columnsaa}
        dataSource={listOrderValid}
        pagination={false}
        locale={locale}
        style={{ marginTop: "5px" }}
      />

      {/* ========== ========== ========== ========== ========== */}

      {/* MD TAMBAH ORDER */}
      <Modal
        centered
        open={mdTambahOrder}
        onCancel={() => setmdTambahOrder(false)}
        closable={false}
        footer={null}
        width={1000}
      >
        <Divider
          orientation="left"
          style={{ backgroundColor: "#ffa39e", margin: "0px" }}
        >
          Tambah Order Darah
        </Divider>
        <Spin spinning={spSimpanOrder}>
          <Row style={{ marginBottom: "2px", marginTop: "5px" }}>
            <Col span={4}>Unit Tujuan :</Col>
            <Col span={5}>
              <Select
                style={{ width: "100%" }}
                placeholder="..."
                value={unitTujuan}
                onChange={(e) => setunitTujuan(e)}
              >
                <Option key="A" value="9407">
                  BANK DARAH - RSMS
                </Option>
                <Option key="B" value="9457">
                  BANK DARAH - ABIYASA
                </Option>
              </Select>
            </Col>
            <Col span={4}>
              <Spin spinning={spNoOrder}>
                <span style={{ marginLeft: "10px" }}>No Order : {noOrder}</span>
              </Spin>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Diagnosis :</Col>
            <Col span={20}>
              <Input.Group compact>
                <Input
                  placeholder="..."
                  value={dxOrder}
                  onChange={(e) => setdxOrder(e.target.value)}
                  maxLength={100}
                  // size='small'
                  style={{ width: "94%" }}
                />
                <Button
                  type="primary"
                  disabled={!dtPasien}
                  onClick={() => klikDiagnosis(dtPasien.RegistrasiId)}
                  style={{ width: "6%" }}
                  icon={<FileSearchOutlined />}
                />
              </Input.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Hb :</Col>
            <Col span={4}>
              <InputNumber
                addonAfter="g/dL"
                min={0}
                max={99}
                maxLength={6}
                value={hb}
                formatter={(e) => formatValue(e)}
                onChange={(e) => sethb(e)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={4} style={{ alignItems: "center" }}>
              <span style={{ marginLeft: "20px" }}>Trombosit :</span>
            </Col>
            <Col span={4}>
              <InputNumber
                value={trombo}
                addonAfter="/mm³"
                min={0}
                max={999999}
                maxLength={7}
                onChange={(e) => settrombo(e)}
                style={{ width: "100%" }}
              />
            </Col>
            <Col>
              <Button
                onClick={() => klikLihatLab(dtPasien.RegistrasiId)}
                style={{ marginLeft: "10px" }}
              >
                Lihat Hasil Lab
              </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Gol.Darah Pasien :</Col>
            <Col span={4}>
              <Input.Group compact>
                <Button
                  type="primary"
                  disabled={!dtPasien}
                  onClick={() =>
                    klikRiwGolDarah(dtPasien.RegistrasiId, dtPasien.PasienId)
                  }
                  style={{ width: "30%" }}
                  icon={<FileSearchOutlined />}
                />
                <Select
                  style={{ width: "70%" }}
                  placeholder="..."
                  value={golDarahPx}
                  onChange={(e) => setgolDarahPx(e)}
                >
                  <Option key="A" value="A">
                    A
                  </Option>
                  <Option key="B" value="B">
                    B
                  </Option>
                  <Option key="AB" value="AB">
                    AB
                  </Option>
                  <Option key="O" value="O">
                    O
                  </Option>
                </Select>
              </Input.Group>
            </Col>
            <Col>
              <Checkbox
                checked={cekRiwGolDarah}
                onChange={(e) => setcekRiwGolDarah(e.target.checked)}
                style={{ marginLeft: "20px" }}
              >
                Belum punya riwayat Gol.Darah
              </Checkbox>
            </Col>
          </Row>

          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>
              <span>Permintaan Gol.Darah :</span>
            </Col>
            <Col span={4}>
              <Select
                style={{ width: "100%" }}
                placeholder="..."
                value={golDarahPermintaan}
                onChange={(e) => setgolDarahPermintaan(e)}
              >
                <Option key="A" value="A">
                  A
                </Option>
                <Option key="B" value="B">
                  B
                </Option>
                <Option key="AB" value="AB">
                  AB
                </Option>
                <Option key="O" value="O">
                  O
                </Option>
              </Select>
            </Col>
            <Col span={16}>
              <Input
                placeholder="Keterangan Beda Gol.Darah"
                value={ketBedaGolDarah}
                onChange={(e) => setketBedaGolDarah(e.target.value)}
                // size='small'
                style={{ width: "98%", marginLeft: "10px" }}
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Volume Sample :</Col>
            <Col span={4}>
              <InputNumber
                min={0}
                max={999}
                addonAfter="cc"
                value={volSample}
                onChange={(e) => setvolSample(e)}
                formatter={(e) => formatValue(e)}
                // size='small'
                style={{ width: "100%" }}
              />
            </Col>
            <Col span={4}>
              <span style={{ marginLeft: "20px" }}>Kondisi Sample :</span>
            </Col>
            <Col span={4}>
              <Select
                style={{ width: "100%" }}
                placeholder="..."
                value={kondSample}
                onChange={(e) => setkondSample(e)}
              >
                <Option key={1} value="Baik">
                  Baik
                </Option>
                <Option key={2} value="Lisis">
                  Lisis
                </Option>
              </Select>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Indikasi Transfusi :</Col>
            <Col span={20}>
              <Input
                placeholder="..."
                value={indTrans}
                onChange={(e) => setindTrans(e.target.value)}
                // size='small'
                style={{ width: "100%" }}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Dokter yang meminta :</Col>
            <Col span={20}>
              <Input.Group compact>
                <Select
                  style={{ width: "70%" }}
                  placeholder="..."
                  value={namaDr}
                  onChange={(e) => setnamaDr(e)}
                  // size='small'
                  showSearch={true}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listDokter.map((opt, index) => (
                    <Option key={index} value={opt.dokterId}>
                      {opt.namaDokter}
                    </Option>
                  ))}
                </Select>
                <Button
                  type="primary"
                  // disabled={!tinggiBadan}
                  onClick={() => getListDokter()}
                  style={{ width: "5%" }}
                  icon={<CloudDownloadOutlined />}
                />
              </Input.Group>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}>Jenis Darah yang Diminta :</Col>
            <Col span={2}>
              <Button
                onClick={() => klikTambahJnsDarah()}
                type="primary"
                icon={<PlusOutlined />}
              >
                Tambah
              </Button>
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={4}></Col>
            <Col span={20}>
              <Table
                bordered
                // loading={spTbPasien}
                columns={columns}
                dataSource={listPermintaan}
                pagination={false}
              />
            </Col>
          </Row>

          <hr />

          <Row>
            <Col span={24}>
              <Space style={{ float: "right" }}>
                <Button
                  onClick={() => klikSimpan()}
                  type="primary"
                  style={{ width: "150px" }}
                >
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Spin>
      </Modal>

      {/* MD DETAIL ORDER */}
      <Modal
        centered
        open={mdDetailNonValid}
        onCancel={() => setmdDetailNonValid(false)}
        closable={false}
        footer={null}
        width={1000}
      >
        <Divider
          orientation="left"
          style={{ backgroundColor: "#ffa39e", margin: "0px" }}
        >
          Detail Order Darah
        </Divider>
        <Row style={{ marginBottom: "2px", marginTop: "5px" }}>
          <Col span={4}>Unit Tujuan :</Col>
          <Col span={5}>
            <Input
              placeholder="..."
              value={dtOrderDarah.DeskTujuan}
              // onChange={(e) => setindTrans(e.target.value)}
              // size='small'
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={4}>
            <span style={{ marginLeft: "10px" }}>
              No Order : {dtOrderDarah.NoOrder}
            </span>
          </Col>
        </Row>
        <Row style={{ marginBottom: "2px" }}>
          <Col span={4}>Diagnosis :</Col>
          <Col span={20}>
            <Input
              placeholder="..."
              value={dtOrderDarah.DiagnosaPasien}
              // size='small'
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "2px" }}>
          <Col span={4}>Hb :</Col>
          <Col span={4}>
            <Input
              placeholder="..."
              addonAfter="g/dL"
              value={dtOrderDarah.Hb}
              // size='small'
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={4} style={{ alignItems: "center" }}>
            <span style={{ marginLeft: "20px" }}>Trombosit :</span>
          </Col>
          <Col span={4}>
            <Input
              placeholder="..."
              addonAfter="/mm³"
              value={dtOrderDarah.Trombosit}
              // size='small'
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "2px" }}>
          <Col span={4}>Gol.Darah Pasien :</Col>
          <Col span={4}>
            <Input
              placeholder="..."
              value={dtOrderDarah.GolonganDarahPx}
              // size='small'
              style={{ width: "100%" }}
            />
          </Col>
        </Row>

        <Row style={{ marginBottom: "2px" }}>
          <Col span={4}>
            <span>Permintaan Gol.Darah :</span>
          </Col>
          <Col span={4}>
            <Input
              placeholder="..."
              value={dtOrderDarah.GolonganDarahOrder}
              // size='small'
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={16}>
            <Input
              placeholder="Keterangan Beda Gol.Darah"
              value={dtOrderDarah.KetBedaGolongan}
              // size='small'
              style={{ width: "98%", marginLeft: "10px" }}
            />
          </Col>
        </Row>

        <Row style={{ marginBottom: "2px" }}>
          <Col span={4}>Volume Sample :</Col>
          <Col span={4}>
            <Input
              placeholder="..."
              value={dtOrderDarah.VolumeSample}
              addonAfter="cc"
              style={{ width: "100%" }}
            />
          </Col>
          <Col span={4}>
            <span style={{ marginLeft: "20px" }}>Kondisi Sample :</span>
          </Col>
          <Col span={4}>
            <Input
              placeholder="..."
              value={dtOrderDarah.KondisiSample}
              // size='small'
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "2px" }}>
          <Col span={4}>Indikasi Transfusi :</Col>
          <Col span={20}>
            <Input
              placeholder="..."
              value={dtOrderDarah.IndikasiTransfusi}
              // size='small'
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "2px" }}>
          <Col span={4}>Dokter yang meminta :</Col>
          <Col span={20}>
            <Input
              placeholder="..."
              value={dtOrderDarah.NamaDokter}
              // size='small'
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row style={{ marginBottom: "2px" }}>
          <Col span={4}>Jenis Darah yang Diminta :</Col>
          <Col span={20}>
            <Table
              bordered
              // loading={spTbPasien}
              columns={columnss}
              dataSource={dtOrderDarah.DetailOrder}
              pagination={false}
            />
          </Col>
        </Row>
      </Modal>

      {/* MD TAMBAH JENIS DARAH */}
      <Modal
        centered
        open={mdJenisDarah}
        onCancel={() => setmdJenisDarah(false)}
        closable={false}
        footer={null}
        width={500}
      >
        <Divider
          orientation="left"
          style={{ backgroundColor: "#ffa39e", margin: "0px" }}
        >
          Tambah Permintaan Jenis Darah
        </Divider>
        <Row style={{ marginBottom: "2px", marginTop: "5px" }}>
          <Col span={8}>Jenis Darah yang Diminta :</Col>
          <Col span={16}>
            <Select
              style={{ width: "100%" }}
              placeholder="..."
              value={jnsDarah}
              onChange={(e) => setjnsDarah(e)}
            // size='small'
            // showSearch={true}
            // filterOption={(input, option) =>
            //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            // }
            >
              {ktgjnsDarah.map((opt, index) => (
                <Option key={index} value={opt.id}>
                  {opt.desk}
                </Option>
              ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={8}>Jml.Kantong :</Col>
          <Col span={6}>
            <InputNumber
              addonAfter="Qty"
              value={jmlKantong}
              onChange={(e) => setjmlKantong(e)}
              // size='small'
              min={0}
              max={4}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>

        <hr />

        <Row>
          <Col span={24}>
            <Button
              onClick={() => klikSimpanJnsDarah()}
              type="primary"
              style={{ width: "75px", float: "right" }}
            >
              Simpan
            </Button>
          </Col>
        </Row>
      </Modal>

      {/* MD RIWAYAT GOL DARAH */}
      <Modal
        centered
        open={mdRiwGolDarah}
        onCancel={() => setmdRiwGolDarah(false)}
        closable={false}
        footer={null}
        width={500}
      >
        <Divider
          orientation="left"
          style={{ backgroundColor: "#ffa39e", margin: "0px" }}
        >
          Riwayat Golongan Darah Pasien
        </Divider>

        <span>Riwayat Pemeriksaan Unit Transfusi Darah (UTD)</span>

        <Table
          bordered
          loading={spRiwGolDarah}
          columns={columnsb}
          dataSource={RiwGolDarah}
          pagination={false}
          locale={locale}
          style={{ marginBottom: "5px" }}
        />

        <span>Riwayat Pemeriksaan Lab. PK</span>
        <Table
          bordered
          loading={spRiwGolDarah}
          columns={columnsb}
          dataSource={riwGolDaLabPK}
          pagination={false}
          locale={locale}
        />
      </Modal>

      {/* MD HASIL LAB PK */}
      <Modal
        centered
        open={mdHasilLab}
        onCancel={() => setmdHasilLab(false)}
        closable={false}
        footer={null}
        width={900}
      >
        <Divider
          orientation="left"
          style={{ backgroundColor: "#ffa39e", margin: "0px" }}
        >
          Hasil Lab PK
        </Divider>

        <Table
          bordered
          loading={spHasilLab}
          columns={colTbHasilLab}
          dataSource={listHasilLab}
          pagination={false}
          locale={locale}
        />
      </Modal>

      {/* MD DIAGNOSA PASIEN */}
      <Modal
        centered
        open={mdDiagnosis}
        onCancel={() => setmdDiagnosis(false)}
        closable={false}
        footer={null}
        width={500}
      >
        <Divider
          orientation="left"
          style={{ backgroundColor: "#ffa39e", margin: "0px" }}
        >
          Diagnosis Pasien
        </Divider>

        <Table
          bordered
          loading={spRiwGolDarah}
          columns={colTbDiagnosis}
          dataSource={listDiagnosa}
          pagination={false}
          locale={locale}
        />
      </Modal>
    </>
  );
};

export default FormPermintaanDarah;
