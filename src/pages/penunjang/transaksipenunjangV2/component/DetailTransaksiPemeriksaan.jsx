/* eslint-disable no-self-assign */
import React, { useContext, useState } from "react";
import {
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Space,
  Form,
  Button,
  Select,
  Table,
  TimePicker,
  Modal,
  message,
  Tooltip,
} from "antd";
import dayjs from "dayjs";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import DaftarPemeriksaanUnit from "./DaftarPemeriksaanUnit";
import {
  QuestionCircleOutlined,
  CloseCircleOutlined,
  CheckOutlined,
  DeleteOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import "../style/styleLookupOrder.css";

const { Option } = Select;
const { confirm } = Modal;

const DetailTransaksiPemeriksaan = () => {
  const {
    mdDtTransaksiPmr,
    setmdDtTransaksiPmr,
    mdListPmrUnit,
    setmdListPmrUnit,
    // main
    unitId,
    noOrder,
    setNoOrder,
    stat,
    tglOrder,
    noTransaksi,
    setNoTransaksi,
    tglDaftar,
    setTglDaftar,
    jam,
    pasienId,
    jenisKelamin,
    umur,
    namaPasien,
    namaPenanggung,
    kodePT,
    jenisPasien,
    kelasRawatId,
    namauser,
    unitAsalId,
    ip,
    host,
    pemeriksaId,
    setPemeriksa,
    listOrderPmr,
    setListOrderPmr,
    insertValidOrder,
    deleteOrder,
    // func
    getDetailTrPmr,
    getListOrder,
    getbyNoReg,
    // spin
    setspinAll,
    spinDetailTrans,
    spinLookupOrder,
    // disable
    disStsValid,
    setdisStsValid,
    disView,
    setdisView,
    // mst
    penunjang,
    listdokPemeriksa,
    getListPemeriksaan,
  } = useContext(TransaksiPenunjangContext);

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      pemeriksaan:
        "pemeriksaan pemeriksaan pemeriksaan pemeriksaan pemeriksaan pemeriksaan",
      tipePmr: "Biasa",
      hargaPmr: 50000,
      jmlPmr: 1,
      ttlBiayaPmr: 50000,
      trfRs: 50000,
      trfBpjs: 50000,
      biayaIur: 50000,
      subsidiRs: 50000,
      sbdAskes: 50000,
      dokterPmr: "Dokter Spesialis Pemeriksa Penunjang Medis",
      noBayar: "999999999999",
      nmBagian: "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
      kdPt: "aaaaaa",
    });
  }

  // const [dataTabel, setDataTabel] = useState(data)
  const [tempIndex, setTempIndex] = useState("");

  const onInputChange = (key, index) => (e) => {
    const newData = [...listOrderPmr];
    newData[index][key] = e;
    if (e === "C") {
      newData[index]["harga"] =
        newData[index]["jasaSarana"] +
        newData[index]["jasaPelayanan"] +
        newData[index]["jasaPelayanan"] * newData[index]["faktorKali"];
    }
    if (e === "B") {
      newData[index]["harga"] =
        newData[index]["jasaSarana"] + newData[index]["jasaPelayanan"];
    }
    setListOrderPmr(newData);
  };

  const onInputChangeJml = (key, index, e) => {
    let tempE = e.target.value;
    if (tempE.length === 0) {
      Modal.warning({
        title: "Peringatan",
        content: "Jumlah Pemeriksaan harus diisi!",
      });
    } else {
      if (tempE === 0 || tempE === "0") {
        Modal.warning({
          title: "Peringatan",
          content: "Jumlah Pemeriksaan harus diisi!",
        });
      } else if (tempE > 99) {
        Modal.warning({
          title: "Peringatan",
          content: "Jumlah Tindakan Maksimal 99!",
        });
      } else {
        const newData = [...listOrderPmr];
        newData[index][key] = tempE;
        setListOrderPmr(newData);
      }
    }
  };

  const klikValid = (data, index) => {
    data.registrasiId = noTransaksi;
    data.ruangId = unitId;
    // pelayananId
    // tglPelayanan
    // dokterPengirimId
    data.dokterPemeriksaId = pemeriksaId;
    // tipePelayanan
    data.tipePelayanan === "C"
      ? (data.jasaPelayanan =
          data.jasaPelayanan + data.jasaPelayanan * data.faktorKali)
      : (data.jasaPelayanan = data.jasaPelayanan);
    data.kdgrptrf = kelasRawatId;
    // noOrder
    // jmlPelayanan
    data.userId = namauser;
    data.currentBag = unitAsalId;
    // pembayaranId
    data.clientHost = host;
    data.clientIp = ip;

    console.log("klikValid : ", data, index);
    insertValidOrder(data, index);
  };

  const columns = [
    {
      title: "Pemeriksaan",
      dataIndex: "deskPelayanan",
      key: "deskPelayanan",
      align: "center",
      width: 150,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Tipe PMR",
      dataIndex: "tipePelayanan",
      key: "tipePelayanan",
      align: "center",
      width: 40,
      render: (text, record, index) => (
        <Select
          // dataSource={penunjang}
          value={text}
          onChange={onInputChange("tipePelayanan", index)}
          disabled={!record.isCito}
          size="small"
          style={{ width: "90%", textAlign: "left" }}
        >
          <Option key="B" value="B">
            Biasa
          </Option>
          <Option key="C" value="C">
            Cito
          </Option>
        </Select>
      ),
    },
    {
      title: "Harga PMR",
      dataIndex: "harga",
      key: "harga",
      align: "center",
      width: 40,
      render: (text) => (
        <div style={{ textAlign: "right" }}>
          {text
            ? text.toLocaleString("id-id", { minimumFractionDigits: 0 })
            : 0}
        </div>
      ),
    },
    {
      title: "Jml PMR",
      dataIndex: "jumlah",
      key: "jumlah",
      align: "center",
      width: 30,
      render: (text, record, index) => (
        <Input
          type="number"
          value={text}
          onChange={(e) => onInputChangeJml("jumlah", index, e)}
          // disabled
          min={1}
          max={99}
          size="small"
          style={{ textAlign: "right", width: "95%" }}
        />
      ),
    },
    {
      title: "Total Biaya PMR",
      dataIndex: "ttlBiayaPmr",
      key: "ttlBiayaPmr",
      align: "center",
      width: 40,
      render: (text, record, index) => (
        <div style={{ textAlign: "right" }}>
          {kodePT === "0050" || kodePT === "0051"
            ? 0
            : (parseInt(record.harga) * parseInt(record.jumlah)).toLocaleString(
                "id-id",
                { minimumFractionDigits: 0 }
              )}
        </div>
      ),
    },
    {
      title: "Tarif RS",
      dataIndex: "trfRs",
      key: "trfRs",
      align: "center",
      width: 40,
      render: (text, record, index) => (
        <div style={{ textAlign: "right" }}>
          {kodePT === "0050" || kodePT === "0051"
            ? (parseInt(record.harga) * parseInt(record.jumlah)).toLocaleString(
                "id-id",
                { minimumFractionDigits: 0 }
              )
            : 0}
        </div>
      ),
    },
    {
      title: "Dokter Pemeriksa",
      dataIndex: "dokterPemeriksaId",
      key: "dokterPemeriksaId",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "left" }}>
          {listdokPemeriksa
            .filter((kd) => kd.dokterId.includes(text))
            .map((filteredName) => (
              <span>{filteredName.namaDokter}</span>
            ))}
        </div>
      ),
    },
    {
      title: "Nama Bagian",
      dataIndex: "unitId",
      key: "unitId",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "left" }}>
          {penunjang
            .filter((kd) => kd.ruangId.includes(text))
            .map((filteredName) => (
              <span>{filteredName.deskripsi}</span>
            ))}
        </div>
      ),
    },
    {
      title: "Validasi",
      key: "valid",
      fixed: "right",
      align: "center",
      width: 30,
      render: (text, record, index) => (
        <Button
          type="text"
          icon={<CheckOutlined />}
          size="small"
          onClick={() => klikValid(record, index)}
          disabled={!pemeriksaId ? true : false}
          style={{ width: "90%", backgroundColor: "#52c41a", color: "white" }}
        />
      ),
    },
    // {
    //     title: <DeleteOutlined />,
    //     key: 'operation',
    //     fixed: 'right',
    //     align: 'center',
    //     width: 20,
    //     render: () =>
    //         <Button
    //             type='primary'
    //             icon={<DeleteOutlined />}
    //             danger
    //             // disabled={record.StsDatang}
    //             size='small' />,
    // },
    // {
    //     title: 'Tarif Askes',
    //     dataIndex: 'trfBpjs',
    //     key: 'trfBpjs',
    //     align: 'center',
    //     width: '90px',
    //     render: text => <div style={{ textAlign: 'right' }}>{text}</div>,
    // },
    // {
    //     title: 'Biaya IUR',
    //     dataIndex: 'biayaIur',
    //     key: 'biayaIur',
    //     align: 'center',
    //     width: '90px',
    //     render: text => <div style={{ textAlign: 'right' }}>{text}</div>,
    // },
    // {
    //     title: 'Subsidi RS',
    //     dataIndex: 'subsidiRs',
    //     key: 'subsidiRs',
    //     align: 'center',
    //     width: '90px',
    //     render: text => <div style={{ textAlign: 'right' }}>{text}</div>,
    // },
    // {
    //     title: 'Subsidi Askes',
    //     dataIndex: 'sbdAskes',
    //     key: 'sbdAskes',
    //     align: 'center',
    //     width: '90px',
    //     render: text => <div style={{ textAlign: 'right' }}>{text}</div>,
    // },
    // {
    //     title: 'No Bayar',
    //     dataIndex: 'noBayar',
    //     key: 'noBayar',
    //     align: 'center',
    //     width: '90px',
    // },
    // {
    //     title: 'Kode PT',
    //     dataIndex: 'pembayaranId',
    //     key: 'pembayaranId',
    //     align: 'center',
    //     width: '60px',
    // },
  ];

  const columnsa = [
    {
      title: "Pemeriksaan",
      dataIndex: "deskPelayanan",
      key: "deskPelayanan",
      align: "center",
      width: 150,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Tipe PMR",
      dataIndex: "tipePelayanan",
      key: "tipePelayanan",
      align: "center",
      width: 40,
      render: (text, record, index) => (
        <Select
          // dataSource={penunjang}
          value={text}
          onChange={onInputChange("tipePelayanan", index)}
          disabled={!record.isCito}
          size="small"
          style={{ width: "90%", textAlign: "left" }}
        >
          <Option key="B" value="B">
            Biasa
          </Option>
          <Option key="C" value="C">
            Cito
          </Option>
        </Select>
      ),
    },
    {
      title: "Harga PMR",
      dataIndex: "harga",
      key: "harga",
      align: "center",
      width: 40,
      render: (text) => (
        <div style={{ textAlign: "right" }}>
          {text
            ? text.toLocaleString("id-id", { minimumFractionDigits: 0 })
            : 0}
        </div>
      ),
    },
    {
      title: "Jml PMR",
      dataIndex: "jumlah",
      key: "jumlah",
      align: "center",
      width: 30,
      render: (text, record, index) => (
        <Input
          type="number"
          value={text}
          onChange={(e) => onInputChangeJml("jumlah", index, e)}
          // disabled
          min={1}
          max={99}
          size="small"
          style={{ textAlign: "right", width: "95%" }}
        />
      ),
    },
    {
      title: "Total Biaya PMR",
      dataIndex: "ttlBiayaPmr",
      key: "ttlBiayaPmr",
      align: "center",
      width: 40,
      render: (text, record, index) => (
        <div style={{ textAlign: "right" }}>
          {kodePT === "0050" || kodePT === "0051"
            ? 0
            : (parseInt(record.harga) * parseInt(record.jumlah)).toLocaleString(
                "id-id",
                { minimumFractionDigits: 0 }
              )}
        </div>
      ),
    },
    {
      title: "Tarif RS",
      dataIndex: "trfRs",
      key: "trfRs",
      align: "center",
      width: 40,
      render: (text, record, index) => (
        <div style={{ textAlign: "right" }}>
          {kodePT === "0050" || kodePT === "0051"
            ? (parseInt(record.harga) * parseInt(record.jumlah)).toLocaleString(
                "id-id",
                { minimumFractionDigits: 0 }
              )
            : 0}
        </div>
      ),
    },
    {
      title: "Dokter Pemeriksa",
      dataIndex: "dokterPemeriksaId",
      key: "dokterPemeriksaId",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "left" }}>
          {listdokPemeriksa
            .filter((kd) => kd.dokterId.includes(text))
            .map((filteredName) => (
              <span>{filteredName.namaDokter}</span>
            ))}
        </div>
      ),
    },
    {
      title: "Nama Bagian",
      dataIndex: "unitId",
      key: "unitId",
      align: "center",
      width: 100,
      render: (text) => (
        <div style={{ textAlign: "left" }}>
          {penunjang
            .filter((kd) => kd.ruangId.includes(text))
            .map((filteredName) => (
              <span>{filteredName.deskripsi}</span>
            ))}
        </div>
      ),
    },
    {
      title: "Validasi",
      key: "valid",
      fixed: "right",
      align: "center",
      width: 30,
      render: (text, record, index) => (
        <Button
          type="text"
          icon={<CheckOutlined />}
          size="small"
          onClick={() => klikValid(record, index)}
          disabled={!pemeriksaId ? true : false}
          style={{ width: "90%", backgroundColor: "#52c41a", color: "white" }}
        />
      ),
    },
    {
      title: <DeleteOutlined />,
      key: "operation",
      fixed: "right",
      align: "center",
      width: 20,
      render: (text, record, index) => (
        <Button
          type="primary"
          onClick={() => klikHapus(index)}
          icon={<DeleteOutlined />}
          danger
          size="small"
        />
      ),
    },
  ];

  const changePemeriksa = (e) => {
    const newData = [...listOrderPmr];
    newData.forEach(function (element) {
      element.dokterPemeriksaId = e;
    });
    setListOrderPmr(newData);
    setPemeriksa(e);
    console.log("newData : ", newData);
  };

  const warning = () => {
    Modal.warning({
      title: "Peringatan!",
      content: "PEMERIKSA belum dipilih!",
    });
  };

  const klikTambah = (unitId, kelasRawatId) => {
    if (!pemeriksaId) {
      warning();
    } else {
      setmdListPmrUnit(true);
      getListPemeriksaan(unitId, kelasRawatId);
    }
  };

  function myLoop(i, dataLength, data) {
    //  create a loop function
    setspinAll(true);
    setTimeout(function () {
      console.log("i : ", i);
      insertValidOrder(data[i], i, dataLength); //  your code here
      i++; //  increment the counter
      if (i < dataLength) {
        //  if the counter < 10, call the loop function
        myLoop(i, dataLength, data); //  ..  again which will trigger another
      } else {
        setspinAll(false); //  ..  setTimeout()
        // getDetailTrPmr(noOrder)
      }
    }, 1000);
  }

  const sendPmr = () => {
    const newData = [...listOrderPmr];
    newData.forEach(function (element) {
      element.registrasiId = noTransaksi;
      element.ruangId = unitId;
      // pelayananId
      // tglPelayanan
      // dokterPengirimId
      element.dokterPemeriksaId = pemeriksaId;
      // tipePelayanan
      element.tipePelayanan === "C"
        ? (element.jasaPelayanan =
            element.jasaPelayanan + element.jasaPelayanan * element.faktorKali)
        : (element.jasaPelayanan = element.jasaPelayanan);
      element.kdgrptrf = kelasRawatId;
      // noOrder
      // jmlPelayanan
      element.userId = namauser;
      element.currentBag = unitAsalId;
      // pembayaranId
      element.clientHost = host;
      element.clientIp = ip;
    });
    let length = newData.length;
    if (length !== 0) {
      // myLoop(0, length, newData)
      console.log("sendPmr : ", newData);
      insertValidOrder(newData);
    } else {
      Modal.warning({
        title: "Informasi",
        content: `Tidak ada Pemeriksaan ditambahkan!`,
      });
    }
    // console.log('sendPmr : ', newData);
  };

  const klikSimpan = () => {
    if (!pemeriksaId) {
      warning();
    } else {
      confirm({
        title: "Konfirmasi",
        icon: <QuestionCircleOutlined />,
        content: "Simpan Pemeriksaan?",
        okText: "Simpan",
        cancelText: "Batal",
        onOk() {
          sendPmr();
          setTempIndex("");
          setmdDtTransaksiPmr(false);
          // console.log('simpan ok!');
        },
      });
    }
  };

  const hapusPmr = (index) => {
    var array = [...listOrderPmr]; // make a separate copy of the array
    //   var index = array.indexOf(e.target.value)
    if (index !== -1) {
      array.splice(index, 1);
      setListOrderPmr(array);
      // setTempIndex('')
    }
  };

  const klikHapus = (index) => {
    // console.log('temp index : ', tempIndex);
    // if (tempIndex.toString().length === 0) {
    //     message.warning('Pemeriksaan belum dipilih!')
    // }
    // else {
    // }
    confirm({
      title: "Konfirmasi",
      icon: <QuestionCircleOutlined />,
      content: "Apakah data akan dihapus?",
      okText: "Hapus",
      cancelText: "Batal",
      onOk() {
        hapusPmr(index);
      },
    });
  };

  const klikHapusOrder = () => {
    noOrder
      ? confirm({
          title: "Konfirmasi",
          icon: <CloseCircleOutlined />,
          content: `Apakah data dengan No Order ${noOrder} akan dihapus?`,
          okText: "Hapus",
          cancelText: "Batal",
          onOk() {
            setmdDtTransaksiPmr(false);
            deleteOrder(noOrder);
          },
        })
      : Modal.warning({
          title: "Peringatan!",
          content: "Pilih order terlebih dahulu!",
        });
  };

  const klikTutup = () => {
    confirm({
      title: "Keluar dari Form Validasi.",
      icon: <QuestionCircleOutlined />,
      content:
        "Masih ada pemeriksaan belum divalidasi, apakah Anda yakin akan menutup form?",
      okText: "Tutup",
      cancelText: "Batal",
      onOk() {
        setmdDtTransaksiPmr(false);
        setdisStsValid(false);
        if (disStsValid) {
          getListOrder(unitId, stat, dayjs(tglOrder).format("YYYY-MM-DD"));
        }

        if (noOrder) {
          let temp = noOrder;
          getDetailTrPmr(temp);
          setNoOrder("");
        } else {
          getbyNoReg(noTransaksi, unitId);
        }
        // setTempIndex('')
        // klikSimpan();
      },
      // onCancel() {
      //     setTempIndex('')
      //     setmdDtTransaksiPmr(false);
      // },
    });
  };

  return (
    <div>
      <Row style={{ marginBottom: "5px" }}>
        <Col span={12}>
          <Space>
            <span>No. Registrasi : </span>
            <Input
              value={noTransaksi}
              readOnly
              placeholder="No.Transaksi"
              size="small"
            />
          </Space>
        </Col>
        <Col span={12}>
          <Space style={{ marginLeft: "96px" }}>
            <span>Tanggal Daftar : </span>
            <Input
              value={dayjs(jam).format("DD-MM-YYYY")}
              readOnly
              size="small"
              style={{ width: "120px" }}
            />
            <span>Jam : </span>
            <Input
              value={dayjs(jam).format("HH:mm:ss")}
              readOnly
              size="small"
              style={{ width: "120px" }}
            />
          </Space>
        </Col>
      </Row>

      <Card
        title="Data Pasien"
        loading={spinDetailTrans}
        size="small"
        headStyle={{ backgroundColor: "#FFADAD" }}
        style={{ marginBottom: "5px" }}
      >
        <Space style={{ marginBottom: "3px" }}>
          <span style={{ marginLeft: "22px" }}>Medical Record :</span>
          <Input value={pasienId} placeholder="No RM" size="small" />
          <span style={{ marginLeft: "260px" }}>Jenis Kelamin :</span>
          <Input
            value={jenisKelamin}
            placeholder="Jenis Kelamin"
            size="small"
          />
          <span>Umur :</span>
          <Input
            value={umur}
            placeholder="Umur"
            size="small"
            style={{ width: "50px" }}
          />
          <span>Tahun</span>
        </Space>
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          // labelAlign='left'
        >
          <Form.Item label="Nama Pasien" style={{ marginBottom: "0px" }}>
            <Input
              value={namaPasien}
              // onChange={(e) => setNoTransaksi(e.target.value)}
              // readOnly
              size="small"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Nama Penanggung" style={{ marginBottom: "0px" }}>
            <Input
              value={namaPenanggung}
              // onChange={(e) => setNoTransaksi(e.target.value)}
              // readOnly
              size="small"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Jenis Pasien" style={{ marginBottom: "0px" }}>
            <Input
              value={jenisPasien}
              // onChange={(e) => setNoTransaksi(e.target.value)}
              // readOnly
              size="small"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Card>

      <Card
        title="Data Transaksi"
        loading={spinDetailTrans}
        size="small"
        headStyle={{ backgroundColor: "#FFD6A5" }}
        style={{ marginBottom: "5px", height: "320px" }}
      >
        <Row>
          <Col span={15}>
            <Space style={{ marginBottom: "5px" }}>
              <span>Dokter Pemeriksa :</span>
              <Select
                dataSource={listdokPemeriksa}
                value={pemeriksaId}
                onChange={(e) => changePemeriksa(e)}
                showSearch
                style={{ width: "400px" }}
                disabled={disStsValid}
                placeholder="Pemeriksa"
                optionFilterProp="children"
                size="small"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {listdokPemeriksa.map((d) => (
                  <Option key={d.dokterId} value={d.dokterId}>
                    {d.namaDokter}
                  </Option>
                ))}
              </Select>
            </Space>
          </Col>

          {disView ? (
            <Col span={9}>
              <Space style={{ marginBottom: "5px", float: "right" }}>
                <Tooltip title="Tambah Pemeriksaan">
                  <Button
                    onClick={() => klikTambah(unitId, kelasRawatId)}
                    type="text"
                    size="small"
                    icon={<PlusOutlined />}
                    style={{ backgroundColor: "#52c41a", color: "white" }}
                  >
                    Tambah Pemeriksaan
                  </Button>
                </Tooltip>

                {/* <Tooltip
                                    title="Hapus Pemeriksaan">
                                    <Button
                                        onClick={() => klikHapus(tempIndex)}
                                        type='primary'
                                        size='small' danger
                                        style={{ width: '70px' }}>
                                        Hapus
                                    </Button>
                                </Tooltip> */}
              </Space>
            </Col>
          ) : (
            ""
          )}
        </Row>
        <Table
          // onRow={(record, index) => {
          //     return {
          //         onClick: () => {
          //             !noOrder ? setNoOrder(record.NoOrder) : setNoOrder('');
          //             setTempIndex(index)
          //             console.log('index : ', index);
          //         }
          //     };
          // }}
          // className='RCM_two_level_table1'
          dataSource={listOrderPmr}
          columns={!disView ? columns : columnsa}
          bordered
          pagination={false}
          size="small"
          scroll={{ x: 1300, y: 180 }}
          style={{ height: "200px" }}
          loading={spinLookupOrder}
          // dataSource={data}
          // rowClassName={(record, index) => (
          //     index === tempIndex ? "greena" : "non-green"
          // )}
        />
      </Card>

      <Row>
        <Col span={12}>
          {!disView ? (
            <Button
              disabled={disStsValid}
              // onClick={() => klikHapusOrder()}
              type="primary"
              danger
            >
              Batal Order
            </Button>
          ) : (
            ""
          )}
          {/* <Space>
                        <Button
                            onClick={() => klikSimpan()}
                            type='primary'
                            style={{ width: '70px' }}>
                            Simpan
                        </Button>
                    </Space> */}
        </Col>
        <Col span={12}>
          <Button
            onClick={() => klikTutup()}
            // onClick={() => setmdDtTransaksiPmr(false)}
            style={{ float: "right", width: "70px" }}
          >
            Tutup
          </Button>
        </Col>
      </Row>

      <Modal
        title="Daftar Pemeriksaan Unit"
        centered
        visible={mdListPmrUnit}
        // onCancel={() => setmdListPmrUnit(false)}
        closable={false}
        footer={null}
        className="modal_daftarpemeriksaan"
        width={600}
      >
        <DaftarPemeriksaanUnit />
      </Modal>
    </div>
  );
};

export default DetailTransaksiPemeriksaan;
