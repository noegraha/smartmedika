import React, { useContext, useState, useEffect } from "react";
import { Button, Card, Space, Table, Modal, Typography } from "antd";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import dayjs from "dayjs";
import {
  SyncOutlined,
  QuestionCircleOutlined,
  CheckCircleTwoTone,
  ExclamationCircleTwoTone,
} from "@ant-design/icons";
import DetailTransaksiPemeriksaan from "./DetailTransaksiPemeriksaan";
import PerbaikanDetailTransaksi from "./PerbaikanDetailTransaksi";
import "../style/styleLookupOrder.css";

const { confirm } = Modal;
const { Text } = Typography;

const TabsPemeriksaan = () => {
  const {
    listBillPmr,
    setListBillPmr,
    unitId,
    namaPasien,
    pasienId,
    noOrder,
    noTransaksi,
    setPemeriksa,
    getDetailTrPmr,
    getbyNoReg,
    setListOrderPmr,
    listdokPemeriksa,
    getPemeriksa,
    setperbaikanPmr,
    deletePemeriksaan,
    getListOrderToCheck,
    // spin
    spinAll,
    // modal
    mdDtTransaksiPmr,
    setmdDtTransaksiPmr,
    mdPerbaikiDtTrans,
    setmdPerbaikiDtTrans,
    // disable
    setdisView,
    setdisStsValid,
  } = useContext(TransaksiPenunjangContext);

  const [tempIndex, setTempIndex] = useState("");

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "no",
      align: "center",
      width: 40,
      // render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
    },
    {
      title: "Tgl PMR",
      dataIndex: "tglPelayanan",
      key: "tglPelayanan",
      align: "center",
      width: 80,
      render: (text) => <div>{dayjs(text).format("DD/MM/YYYY")}</div>,
    },
    {
      title: "Pemeriksaan",
      dataIndex: "deskPelayananId",
      key: "deskPelayananId",
      align: "center",
      width: 400,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
      // render: (text, record, index) => (
      //     <Input
      //         type='number'
      //         value={text}
      //         onChange={onInputChangea("jmlPmr", index)}
      //         min={1}
      //         max={99}
      //         size='small'
      //         style={{ textAlign: 'right', width: '80px' }} />
      // ),
    },
    {
      title: "Biaya PMR",
      dataIndex: "biayaPelayanan",
      key: "biayaPelayanan",
      align: "center",
      width: 90,
      render: (text) => (
        <div style={{ textAlign: "right" }}>
          {text
            ? text.toLocaleString("id-id", { minimumFractionDigits: 0 })
            : 0}
        </div>
      ),
    },
    {
      title: "Biaya Std",
      dataIndex: "standarBiaya",
      key: "standarBiaya",
      align: "center",
      width: 90,
      render: (text) => (
        <div style={{ textAlign: "right" }}>
          {text
            ? text.toLocaleString("id-id", { minimumFractionDigits: 0 })
            : 0}
        </div>
      ),
    },
    // {
    //     title: 'Tarif Askes',
    //     dataIndex: 'tarifAskes',
    //     key: 'tarifAskes',
    //     align: 'center',
    //     width: '90px',
    //     render: (text) => (
    //         <div style={{ textAlign: 'right' }}>
    //             {text ? text.toLocaleString("id-id", { minimumFractionDigits: 0 }) : 0}
    //         </div>
    //     ),
    // },
    // {
    //     title: 'Biaya IUR',
    //     dataIndex: 'biayaIur',
    //     key: 'biayaIur',
    //     align: 'center',
    //     width: '90px',
    //     render: (text) => (
    //         <div style={{ textAlign: 'right' }}>
    //             {text ? text.toLocaleString("id-id", { minimumFractionDigits: 0 }) : 0}
    //         </div>
    //     ),
    // },
    // {
    //     title: 'Subsidi RS',
    //     dataIndex: 'subsidiRS',
    //     key: 'subsidiRS',
    //     align: 'center',
    //     width: '90px',
    //     render: (text) => (
    //         <div style={{ textAlign: 'right' }}>
    //             {text ? text.toLocaleString("id-id", { minimumFractionDigits: 0 }) : 0}
    //         </div>
    //     ),
    // },
    // {
    //     title: 'SP Askes/lain',
    //     dataIndex: 'spaskeslain',
    //     key: 'spaskeslain',
    //     align: 'center',
    //     width: '90px',
    //     render: text => <div style={{ textAlign: 'right' }}>{text}</div>,
    // },
    {
      title: "Dokter Periksa",
      dataIndex: "deskDokterPemeriksaId",
      key: "deskDokterPemeriksaId",
      align: "center",
      width: 250,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    // {
    //     title: 'Invoice',
    //     dataIndex: 'noInvoice',
    //     key: 'noInvoice',
    //     align: 'center',
    //     width: 90,
    // },
    {
      title: "No Bayar",
      dataIndex: "noBayarDbrs",
      key: "noBayarDbrs",
      align: "center",
      width: 90,
    },
    {
      title: "Unit",
      dataIndex: "deskRuangId",
      key: "deskRuangId",
      align: "center",
      width: 300,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
      // render: (text, record, index) => (
      //     <Select
      //         // dataSource={penunjang}
      //         value={text}
      //         onChange={onInputChange("tipePmr", index)}
      //         size='small'
      //         style={{ width: '80px', textAlign: 'left' }}
      //     >
      //         <Option key='Biasa' value='Biasa'>Biasa</Option>
      //         <Option key='Cito' value='Cito'>Cito</Option>
      //     </Select>
      // ),
    },
    // {
    //     title: 'Valid',
    //     dataIndex: 'valid',
    //     key: 'valid',
    //     align: 'center',
    //     width: '40px',
    //     // render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
    // },
    {
      title: "Uslognm",
      dataIndex: "userId",
      key: "userId",
      align: "center",
      width: 60,
      ellipsis: true,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Sts",
      key: "kodePmrDbrs",
      fixed: "right",
      align: "center",
      width: 30,
      render: (text, record, index) => (
        <Button
          type="text"
          icon={
            record.kodePmrDbrs ? (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            ) : (
              <ExclamationCircleTwoTone twoToneColor="#eb2f96" />
            )
          }
          size="small"
          // onClick={() => console.log("isinya : ", record.kodePmrDbrs)}
          // disabled={!pemeriksaId ? true : false}
          style={{ width: "90%" }}
        />
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      key: i,
      no: i + 1,
      deskRuangId: "RUANG TINDAKAN ENDOKRIN DAN DM - ABIYASA",
      tglPmr: "12/10/2021",
      deskPelayananId:
        "pemeriksaan pemeriksaan pemeriksaan pemeriksaan pemeriksaan pemeriksaan",
      biayaPelayanan: 999999999,
      standarBiaya: 999999999,
      trfBpjs: 999999999,
      biayaIur: 999999999,
      subsidiRs: 999999999,
      spaskeslain: "-",
      deskDokterPemeriksaId: "Dokter Spesialis Pemeriksa Penunjang Medis",
      invoice: "999999999999",
      noBayar: "999999999999",
      valid: "v",
      userId: "userlogin",
    });
  }

  const klikRefresh = () => {
    if (!unitId) {
      Modal.warning({
        title: "Peringatan!",
        content: "Unit Pelayanan belum dipilih!",
      });
    } else if (!pasienId) {
      Modal.warning({
        title: "Peringatan!",
        content: "Pasien belum dipilih!",
      });
    } else {
      if (noOrder) {
        getDetailTrPmr(noOrder);
      } else getbyNoReg(noTransaksi, unitId);
    }
  };

  const klikTransaksi = () => {
    if (!unitId) {
      Modal.warning({
        title: "Peringatan!",
        content: "Unit Pelayanan belum dipilih!",
      });
    } else if (!pasienId) {
      Modal.warning({
        title: "Peringatan!",
        content: "Pasien belum dipilih!",
      });
    } else {
      setdisView(true);
      setdisStsValid(false);
      getListOrderToCheck(unitId, noTransaksi, 0);
    }
  };

  const klikPerbaiki = (tempIndex) => {
    if (!unitId) {
      Modal.warning({
        title: "Peringatan!",
        content: "Unit Pelayanan belum dipilih!",
      });
    } else if (!pasienId) {
      Modal.warning({
        title: "Peringatan!",
        content: "Pasien belum dipilih!",
      });
    } else if (tempIndex.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "Pemeriksaan belum dipilih!",
      });
    } else if (
      listBillPmr[tempIndex].noInvoice ||
      listBillPmr[tempIndex].noBayar ||
      listBillPmr[tempIndex].noInvoiceDbrs ||
      listBillPmr[tempIndex].noBayarDbrs
    ) {
      Modal.warning({
        title: "Peringatan!",
        content: `Pemeriksaan ini sudah berisi NO.INVOICE atau NO.BAYAR. Tidak bisa diperbaiki!`,
      });
    } else {
      if (listdokPemeriksa.length === 0) {
        getPemeriksa();
      }
      setmdPerbaikiDtTrans(true);
      setperbaikanPmr(listBillPmr[tempIndex]);
      console.log("listBillPmr : ", listBillPmr[tempIndex]);
    }
  };

  const klikHapus = (tempIndex) => {
    if (!unitId) {
      Modal.warning({
        title: "Peringatan!",
        content: "Unit Pelayanan belum dipilih!",
      });
    } else if (!pasienId) {
      Modal.warning({
        title: "Peringatan!",
        content: "Pasien belum dipilih!",
      });
    } else if (tempIndex.length === 0) {
      Modal.warning({
        title: "Peringatan!",
        content: "Pemeriksaan belum dipilih!",
      });
    } else if (
      listBillPmr[tempIndex].noInvoice ||
      listBillPmr[tempIndex].noBayar ||
      listBillPmr[tempIndex].noInvoiceDbrs ||
      listBillPmr[tempIndex].noBayarDbrs
    ) {
      Modal.warning({
        title: "Peringatan!",
        content: `Pemeriksaan ini sudah berisi NO.INVOICE atau NO.BAYAR. Tidak bisa dihapus!`,
      });
    } else {
      confirm({
        title: "Konfirmasi,",
        icon: <QuestionCircleOutlined />,
        content: `Apakah Pemeriksaan : ${
          listBillPmr[tempIndex].deskPelayananId
        }, tanggal : ${dayjs(listBillPmr[tempIndex].tglPelayanan).format(
          "DD/MM/YYYY"
        )} akan dihapus?`,
        okText: "Hapus",
        cancelText: "Batal",
        onOk() {
          deletePemeriksaan(listBillPmr[tempIndex]);
          setmdPerbaikiDtTrans(false);
          setTempIndex("");
          console.log("listBillPmr : ", listBillPmr[tempIndex]);
        },
      });
    }
  };

  useEffect(() => {
    setTempIndex("");
  }, [noTransaksi]);

  return (
    <div>
      <Card loading={spinAll}>
        <Table
          dataSource={listBillPmr}
          // dataSource={data}
          columns={columns}
          onRow={(record, index) => {
            return {
              onClick: () => {
                if (tempIndex === index) {
                  setTempIndex("");
                } else {
                  setTempIndex(index);
                }
                // setTempIndex(index)
                // console.log('index : ', index);
              },
            };
          }}
          rowClassName={(record, index) =>
            index === tempIndex ? "greena" : "non-green"
          }
          // loading={spinLookupOrder}
          className="RCM_two_level_table1"
          bordered
          summary={(dataPage) => {
            let totalBiayaPmr = 0;
            let totalBiayaStd = 0;
            let totalTarifAskes = 0;
            let totalBiayaIur = 0;
            let totalSubsidiRs = 0;

            dataPage.forEach(
              ({
                biayaPelayanan,
                standarBiaya,
                tarifAskes,
                biayaIur,
                subsidiRS,
              }) => {
                totalBiayaPmr += biayaPelayanan;
                totalBiayaStd += standarBiaya;
                totalTarifAskes += tarifAskes;
                totalBiayaIur += biayaIur;
                totalSubsidiRs += subsidiRS;
              }
            );

            return (
              <>
                <Table.Summary.Row style={{ backgroundColor: "#d9f7be" }}>
                  <Table.Summary.Cell colSpan={3} align="center">
                    <Text strong>TOTAL</Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align="right">
                    <Text strong>
                      {totalBiayaPmr
                        ? totalBiayaPmr.toLocaleString("id-id", {
                            minimumFractionDigits: 0,
                          })
                        : 0}
                    </Text>
                  </Table.Summary.Cell>
                  <Table.Summary.Cell align="right">
                    <Text strong>
                      {totalBiayaStd
                        ? totalBiayaStd.toLocaleString("id-id", {
                            minimumFractionDigits: 0,
                          })
                        : 0}
                    </Text>
                  </Table.Summary.Cell>
                  {/* <Table.Summary.Cell align='right'>
                                        <Text strong>{totalTarifAskes ? totalTarifAskes.toLocaleString("id-id", { minimumFractionDigits: 0 }) : 0}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell align='right'>
                                        <Text strong>{totalBiayaIur ? totalBiayaIur.toLocaleString("id-id", { minimumFractionDigits: 0 }) : 0}</Text>
                                    </Table.Summary.Cell>
                                    <Table.Summary.Cell align='right'>
                                        <Text strong>{totalSubsidiRs ? totalSubsidiRs.toLocaleString("id-id", { minimumFractionDigits: 0 }) : 0}</Text>
                                    </Table.Summary.Cell> */}
                </Table.Summary.Row>
              </>
            );
          }}
          pagination={false}
          size="small"
          scroll={{ y: 500 }}
          style={{ marginBottom: "5px" }}
        />
        <Space>
          <Button
            onClick={() => klikRefresh()}
            type="text"
            size="small"
            style={{ backgroundColor: "#95de64", color: "white" }}
          >
            <SyncOutlined /> Refresh
          </Button>
          <Button
            onClick={() => klikTransaksi()}
            // disabled
            type="primary"
            size="small"
          >
            Transaksi
          </Button>
          <Button
            type="primary"
            onClick={() => klikPerbaiki(tempIndex)}
            // disabled
            size="small"
          >
            Perbaiki
          </Button>
          <Button
            type="primary"
            danger
            onClick={() => klikHapus(tempIndex)}
            // disabled
            size="small"
          >
            Hapus
          </Button>
          <Button type="primary" disabled size="small">
            Label Penunjang
          </Button>
          <Button type="primary" disabled size="small">
            Gelang Penunjang
          </Button>
        </Space>
      </Card>

      <Modal
        title="Daftar Pemeriksaan Unit"
        // centered
        visible={mdDtTransaksiPmr}
        // onCancel={() => setmdListPmrUnit(false)}
        closable={false}
        footer={null}
        width={1000}
        style={{ top: "10px" }}
      >
        <DetailTransaksiPemeriksaan />
      </Modal>

      <Modal
        title={`Perbaikan Transaksi Untuk Pasien ${namaPasien}`}
        // centered
        visible={mdPerbaikiDtTrans}
        // onCancel={() => setmdPerbaikiDtTrans(false)}
        closable={false}
        footer={null}
        width={1000}
        className="modal_detailtransaksi"
        style={{ top: "10px" }}
      >
        <PerbaikanDetailTransaksi />
      </Modal>
    </div>
  );
};

export default TabsPemeriksaan;
