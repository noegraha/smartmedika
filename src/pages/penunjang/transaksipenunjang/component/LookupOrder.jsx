import React, { useContext, useState, useEffect } from "react";
import dayjs from "dayjs";
import {
  Input,
  Select,
  Space,
  Radio,
  Card,
  Table,
  Row,
  Col,
  Button,
  Tooltip,
  Modal,
  Popconfirm,
  message,
  Spin,
} from "antd";
import { SyncOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import "../style/styleLookupOrder.css";
import DetailTransaksiPemeriksaan from "./DetailTransaksiPemeriksaan";

const { Option } = Select;
const { confirm } = Modal;

const LookupOrder = () => {
  const {
    penunjang,
    unitId,
    stat,
    spinLookupOrder,
    listPasien,
    setmdListOrder,
    mdDtTransaksiPmr,
    setmdDtTransaksiPmr,
    // main
    noOrder,
    setNoOrder,
    getListOrder,
    deleteOrder,
    getDetailTrPmr,
    // spin
    spinAll,
    setspinAll,
    // disable
    setdisNoTransaksi,
    // mst
    listdokPemeriksa,
    getPemeriksa,
  } = useContext(TransaksiPenunjangContext);

  const [sorter, setSorter] = useState("2");
  const [listTabel, setListTabel] = useState(listPasien);
  const [sSearch, setsSearch] = useState("");

  const columns = [
    {
      title: "No Order",
      dataIndex: "NoOrder",
      key: "NoOrder",
      align: "center",
      width: "90px",
      sorter: (a, b) => a.NoOrder - b.NoOrder,
    },
    {
      title: "No Reg",
      dataIndex: "RegistrasiId",
      key: "RegistrasiId",
      align: "center",
      width: "90px",
      sorter: (a, b) => a.RegistrasiId - b.RegistrasiId,
    },
    {
      title: "No Pasien",
      dataIndex: "PasienId",
      key: "PasienId",
      align: "center",
      width: "90px",
      sorter: (a, b) => a.PasienId - b.PasienId,
    },
    {
      title: "Nama Pasien",
      dataIndex: "Nama",
      key: "Nama",
      align: "center",
      width: "300px",
      sorter: (a, b) => a.Nama.localeCompare(b.Nama),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Unit Asal",
      dataIndex: "Deskripsi",
      key: "Deskripsi",
      align: "center",
      sorter: (a, b) => a.Deskripsi.localeCompare(b.Deskripsi),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Tgl Order",
      dataIndex: "TanggalOrder",
      key: "TanggalOrder",
      align: "center",
      width: "90px",
      render: (record) => <div>{dayjs(record).format("DD/MM/YYYY")}</div>,
    },
  ];

  // const data = [];
  // for (let i = 0; i < 100; i++) {
  //     data.push({
  //         key: i,
  //         NoOrder: '2110100000',
  //         RegistrasiId: '2110100000',
  //         PasienId: '2110100000',
  //         Nama: 'TanggalOrder TanggalOrder TanggalOrder',
  //     });
  // }

  const klikTutup = () => {
    setSorter("2");
    setsSearch("");
    setListTabel(listPasien);
    setmdListOrder(false);
  };

  const klikAmbil = () => {
    if (!noOrder) {
      Modal.warning({
        title: "Peringatan!",
        content: "Order belum dipilih.",
      });
    } else {
      setmdListOrder(false);
      setspinAll(true);
      if (listdokPemeriksa.length === 0) {
        getPemeriksa();
      }
      getDetailTrPmr(noOrder);
      setdisNoTransaksi(true);
      setmdDtTransaksiPmr(true);
    }
  };

  const klikRow = (e) => {
    setmdListOrder(false);
    setspinAll(true);
    if (listdokPemeriksa.length === 0) {
      getPemeriksa();
    }
    getDetailTrPmr(e);
    setmdDtTransaksiPmr(true);
  };

  const klikRefresh = () => {
    setNoOrder("");
    getListOrder(unitId, "%20", stat);
  };

  const klikHapus = () => {
    noOrder
      ? confirm({
          title: "Konfirmasi",
          icon: <CloseCircleOutlined />,
          content: `Apakah data dengan No Order ${noOrder} akan dihapus?`,
          okText: "Hapus",
          cancelText: "Batal",
          onOk() {
            deleteOrder(noOrder);
          },
        })
      : Modal.warning({
          title: "Peringatan!",
          content: "Pilih order terlebih dahulu!",
        });
  };

  const changeSearch = (e) => {
    setsSearch(e);
    if (sorter === "1") {
      let temp = listPasien.filter((a) =>
        a.NoOrder.toLowerCase().includes(e.toLowerCase())
      );
      setListTabel(temp);
    }
    if (sorter === "2") {
      let temp = listPasien.filter((a) =>
        a.RegistrasiId.toLowerCase().includes(e.toLowerCase())
      );
      setListTabel(temp);
    }
    if (sorter === "3") {
      let temp = listPasien.filter((a) =>
        a.PasienId.toLowerCase().includes(e.toLowerCase())
      );
      setListTabel(temp);
    }
    if (sorter === "4") {
      let temp = listPasien.filter((a) =>
        a.Nama.toLowerCase().includes(e.toLowerCase())
      );
      setListTabel(temp);
    }
    if (sorter === "5") {
      let temp = listPasien.filter((a) =>
        a.Deskripsi.toLowerCase().includes(e.toLowerCase())
      );
      setListTabel(temp);
    }
    // console.log('filter : ', temp);
  };

  useEffect(() => {
    setListTabel(listPasien);
  }, [listPasien]);

  // const data = [];
  // for (let i = 0; i < 100; i++) {
  //     data.push({
  //         key: i,
  //         noOrder: `2110110167`,
  //         noReg: `2110110006`,
  //         noPasien: `02055939`,
  //         nama: `HANDAYANI TJIAWI, TN`,
  //         unitAsal: `KLINIK ENDOKRIN DAN DM - RSMS`,
  //         tglOrder: `11/10/2021`,
  //     });
  // }

  return (
    <div>
      <Spin spinning={spinAll} tip="Proses berjalan...">
        <Space style={{ marginBottom: "5px" }}>
          <Select
            // dataSource={penunjang}
            value={sorter}
            onChange={(e) => setSorter(e)}
            showSearch
            size="small"
            style={{ width: "200px" }}
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key="1" value="1">
              No Order
            </Option>
            <Option key="2" value="2">
              No Registrasi
            </Option>
            <Option key="3" value="3">
              No Pasien
            </Option>
            <Option key="4" value="4">
              Nama Pasien
            </Option>
            <Option key="5" value="5">
              Unit Asal
            </Option>
          </Select>
          <Tooltip title="Cari berdasarkan pilihan disebelah kiri">
            <Input
              value={sSearch}
              onChange={(e) => changeSearch(e.target.value)}
              placeholder="..."
              size="small"
              style={{ width: "500px" }}
            />
          </Tooltip>
          <Radio.Group
            // onChange={onChange}
            // value={value}
            defaultValue="1"
            style={{ marginLeft: "25px" }}
          >
            <Space>
              <Radio value="1">Status Order</Radio>
              <Radio value="2" disabled>
                Status Valid
              </Radio>
            </Space>
          </Radio.Group>
        </Space>

        <Card style={{ marginBottom: "5px" }}>
          <Space style={{ marginBottom: "5px" }}>
            <span>Unit Order :</span>
            {penunjang &&
              penunjang
                .filter((pnjg) => pnjg.ruangId === unitId)
                .map((pnjg, index) => {
                  return (
                    <Input
                      value={pnjg.deskripsi}
                      placeholder="..."
                      size="small"
                      style={{ width: "300px", color: "blue" }}
                    />
                  );
                })}
          </Space>
          <Tooltip title="Klik 2x untuk ambil order.">
            <Table
              onRow={(record) => {
                return {
                  onClick: () => {
                    setNoOrder(record.NoOrder);
                    console.log("noOrder : ", noOrder);
                  },
                };
              }}
              // onRow={(record) => {
              //     return {
              //         onDoubleClick: () => {
              //             klikRow(record.NoOrder)
              //         }
              //     };
              // }}
              rowClassName={(record) =>
                record.NoOrder === noOrder ? "greena" : "non-green"
              }
              dataSource={listTabel}
              columns={columns}
              loading={spinLookupOrder}
              bordered
              pagination={false}
              className="RCM_two_level_table1"
              size="small"
              scroll={{ x: 700, y: 380 }}
              style={{ height: "410px" }}
            />
          </Tooltip>
        </Card>

        <Row>
          <Col span={12}>
            {/* <Space> */}
            <Button size="small" style={{ backgroundColor: "#bae7ff" }}>
              Sudah Invoice
            </Button>
            <Button size="small">Belum Invoice</Button>
            {/* </Space> */}
          </Col>
          <Col span={12}>
            <Space style={{ float: "right" }}>
              <Button
                onClick={() => klikRefresh()}
                type="text"
                size="small"
                style={{
                  backgroundColor: "#95de64",
                  color: "white",
                  marginRight: "85px",
                }}
              >
                <SyncOutlined /> Refresh Pasien
              </Button>
              {/* <Popconfirm
                                title={`Apakah data dengan No Order ${noOrder} akan dihapus?`}
                                onConfirm={confirm}
                                onCancel={cancel}
                                okText="Yes"
                                cancelText="No"
                            > */}
              {/* </Popconfirm> */}
              <Button
                onClick={() => klikHapus()}
                type="primary"
                danger
                style={{ width: "70px" }}
              >
                Hapus
              </Button>
              <Button
                onClick={() => klikAmbil()}
                type="primary"
                style={{ width: "70px" }}
              >
                Ambil
              </Button>
              <Button onClick={() => klikTutup()} style={{ width: "70px" }}>
                Tutup
              </Button>
            </Space>
          </Col>
        </Row>

        <Modal
          title="Detail Transaksi Pemeriksaan"
          // centered
          visible={mdDtTransaksiPmr}
          // onCancel={() => setmdDtTransaksiPmr(false)}
          closable={false}
          footer={null}
          width={1000}
          className="modal_detailtransaksi"
          style={{ top: "10px" }}
        >
          <DetailTransaksiPemeriksaan />
        </Modal>
      </Spin>
    </div>
  );
};

export default LookupOrder;
