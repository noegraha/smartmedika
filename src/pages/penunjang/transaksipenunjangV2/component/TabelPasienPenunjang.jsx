import React, { useEffect, useContext, useState } from "react";
import dayjs from "dayjs";
import {
  Table,
  Input,
  Button,
  Tooltip,
  Empty,
  Switch,
  Space,
  Card,
  Select,
  Radio,
  Modal,
  Row,
  Col,
  DatePicker,
} from "antd";
import { UndoOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import "../style/styleLookupOrder.css";

const { Option } = Select;
const { confirm } = Modal;

const TabelPasienTransaksiPenunjang = () => {
  const { setLebar } = useContext(PasienContext);

  const {
    // main
    unitId,
    stat,
    setStat,
    listPasien,
    setListPasien,
    noOrder,
    setNoOrder,
    listdokPemeriksa,
    tglOrder,
    settglOrder,
    // func
    getListOrder,
    getDetailTrPmr,
    getPemeriksa,
    deleteOrder,
    syncBilling,
    // spin
    spinLookupOrder,
    setspinAll,
    // modal
    setmdListOrder,
    setmdDtTransaksiPmr,
    // disable
    setdisNoTransaksi,
    disDelSideBar,
    setdisDelSideBar,
    setdisStsValid,
    setdisView,
  } = useContext(TransaksiPenunjangContext);

  const [pilih, setPilih] = useState(false);
  const [lebarnama, setLebarNama] = useState("180px");

  // main app
  const [sorter, setSorter] = useState("2");
  const [listTabel, setListTabel] = useState(listPasien);
  const [sSearch, setsSearch] = useState("");

  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("180px") : setLebarNama("120px");
  };

  // const [visible, setVisible] = useState(false);
  // const [x, setX] = useState(0);
  // const [y, setY] = useState(0);

  const columns = [
    {
      title: "No Reg",
      dataIndex: "RegistrasiId",
      key: "RegistrasiId",
      align: "center",
      width: "90px",
      sorter: (a, b) => a.RegistrasiId - b.RegistrasiId,
    },
    {
      title: "Nama Pasien",
      dataIndex: "Nama",
      key: "Nama",
      align: "center",
      width: "200px",
      sorter: (a, b) => a.Nama.localeCompare(b.Nama),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
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
      title: "Unit Asal",
      dataIndex: "Deskripsi",
      key: "Deskripsi",
      align: "center",
      width: "200px",
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
    {
      title: "No Order",
      dataIndex: "NoOrder",
      key: "NoOrder",
      align: "center",
      width: "90px",
      sorter: (a, b) => a.NoOrder - b.NoOrder,
    },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      PasienId: "02170129",
      Nama: "DAIMATUL HASANAH, NY",
      Deskripsi: "KLINIK BEDAH SARAF - RSMS",
      RegistrasiId: "2110150001",
      TanggalOrder: "2021-10-21T00:00:00",
      NoOrder: "2110SM0023",
    });
  }

  const changeStatus = (e) => {
    if (!unitId) {
      Modal.warning({
        title: "Peringatan!",
        content: "UNIT PELAYANAN belum dipilih.",
      });
    } else {
      let tgl = dayjs(tglOrder).format("YYYY-MM-DD");
      setStat(e.target.value);
      setNoOrder("");
      if (e.target.value === "1") {
        setdisDelSideBar(true);
        setListPasien([]);
      } else {
        setdisDelSideBar(false);
        getListOrder(unitId, e.target.value, tgl);
      }
    }
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
            setmdDtTransaksiPmr(false);
            deleteOrder(noOrder);
          },
        })
      : Modal.warning({
          title: "Peringatan!",
          content: "Pilih order terlebih dahulu!",
        });
  };

  const doubleClickRow = (noOrder) => {
    if (!noOrder) {
      Modal.warning({
        title: "Peringatan!",
        content: "ORDER belum dipilih.",
      });
    } else if (!unitId) {
      Modal.warning({
        title: "Peringatan!",
        content: "UNIT PELAYANAN belum dipilih.",
      });
    } else {
      setmdListOrder(false);
      setdisStsValid(false);
      setdisView(false);
      setspinAll(true);
      if (listdokPemeriksa.length === 0) {
        getPemeriksa();
      }
      getDetailTrPmr(noOrder);
      setdisNoTransaksi(true);
      if (stat === "0") {
        setmdDtTransaksiPmr(true);
      }
    }
  };

  const klikRefresh = () => {
    if (!unitId) {
      Modal.warning({
        title: "Peringatan",
        content: "Unit Pelayanan belum dipilih!",
      });
    } else {
      let tgl = dayjs(tglOrder).format("YYYY-MM-DD");
      getListOrder(unitId, stat, tgl);
    }
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

  const changeSorter = (e) => {
    setSorter(e);
    setsSearch("");
    changeSearch("");
  };

  const changeTglOrder = (e) => {
    let tgl = dayjs(e).format("YYYY-MM-DD");
    settglOrder(dayjs(e));
    // setStat('0')
    // setdisDelSideBar(false)
    getListOrder(unitId, stat, tgl);
  };

  useEffect(() => {
    setListTabel(listPasien);
  }, [listPasien]);

  return (
    <div>
      <Card
        title="Cari Berdasarkan"
        size="small"
        headStyle={{ backgroundColor: "#FFD6A5" }}
        style={{ width: "98%" }}
      >
        <Tooltip title="Cari berdasarkan pilihan : ">
          <Select
            // dataSource={penunjang}
            value={sorter}
            onChange={(e) => changeSorter(e)}
            showSearch
            size="small"
            style={{ width: "100%", marginBottom: "5px" }}
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
        </Tooltip>
        <Input
          value={sSearch}
          onChange={(e) => changeSearch(e.target.value)}
          placeholder="..."
          size="small"
          style={{ width: "100%" }}
        />
      </Card>

      <Radio.Group
        onChange={(e) => changeStatus(e)}
        value={stat}
        style={{ marginTop: "5px", marginBottom: "5px" }}
      >
        <Space>
          <Radio value={"0"}>Status Order</Radio>
          <Radio value={"1"}>Status Valid</Radio>
        </Space>
      </Radio.Group>

      <Space style={{ marginBottom: "3px" }}>
        <span>
          <b>Tanggal Valid :</b>
        </span>
        <DatePicker
          value={tglOrder}
          onChange={(e) => changeTglOrder(e)}
          disabled={unitId && stat === "1" ? false : true}
          size="small"
          format="DD-MM-YYYY"
          allowClear={false}
          inputReadOnly={true}
          style={{ width: "118%" }}
        />
      </Space>

      <Table
        onRow={(record) => {
          return {
            onClick: () => {
              // noOrder ? setNoOrder('') : setNoOrder(record.NoOrder);
              setNoOrder(record.NoOrder);
            },
            onDoubleClick: () => {
              setNoOrder(record.NoOrder);
              doubleClickRow(record.NoOrder);
            },
          };
        }}
        rowClassName={(record) =>
          record.NoOrder === noOrder ? "greena" : "non-green"
        }
        dataSource={listTabel}
        columns={columns}
        loading={spinLookupOrder}
        className="RCM_two_level_table1"
        style={{ maxHeight: 570 }}
        size="small"
        scroll={{ x: 300, y: 310 }}
        pagination={false}
        locale={{
          emptyText: (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={"Tidak ada Order"}
            />
          ),
        }}
        footer={() => (
          <div>
            <Row>
              {/* <Col span={12}>
                <Button
                  type='primary'
                  danger
                  onClick={() => klikHapus()}
                  disabled={disDelSideBar}
                  size='small'
                  style={{ width: '99%', float: 'left' }}
                >
                  Hapus
                </Button>
              </Col> */}

              <Col span={24}>
                <Button
                  type="primary"
                  onClick={() => doubleClickRow(noOrder)}
                  size="small"
                  style={{ width: "99%", float: "right" }}
                >
                  Ambil
                </Button>
              </Col>
            </Row>
            <Space style={{ marginTop: "5px" }}>
              Atur Lebar :
              <Switch
                onChange={onLebar}
                checkedChildren="Max"
                unCheckedChildren="Min"
              />
              <Button
                size="small"
                type="primary"
                onClick={() => klikRefresh()}
                style={{ backgroundColor: "forestgreen", borderColor: "green" }}
              >
                <UndoOutlined />
                Refresh Pasien
              </Button>
            </Space>
          </div>
        )}
      />
    </div>
  );
};

export default TabelPasienTransaksiPenunjang;
