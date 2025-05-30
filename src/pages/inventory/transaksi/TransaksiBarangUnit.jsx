import {
  Button,
  Card,
  Collapse,
  DatePicker,
  Form,
  Input,
  InputNumber,
  Modal,
  Select,
  Table,
  Tabs,
  message,
} from "antd";
import { EditFilled } from "@ant-design/icons";
import axios from "axios";
import React, { useContext, useState } from "react";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import dayjs from "dayjs";
const { Option } = Select;
const { Search } = Input;
const { Panel } = Collapse;

const TransaksiBarangUnit = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const [ruangall, setRuangAll] = useState([]);
  const [barangunit, setBarangUnit] = useState([]);
  const [namasearch, setNamaSearch] = useState(" ");
  const [trxbarang, setTrxBarang] = useState([]);
  const [loadingtrx, setLoadingTrx] = useState(false);
  const [ruang, setRuang] = useState(null);
  const [gudang, setGudang] = useState("9702");
  const [bulan, setBulan] = useState(month);
  const [tahun, setTahun] = useState(year);
  const [nobar, setNobar] = useState(null);
  const [notrx, setNoTrx] = useState(null);
  const [kodebarang, setKodeBarang] = useState(null);
  const [namabarang, setNamaBarang] = useState(null);
  const [jenis, setJenis] = useState(null);
  const [jumlah, setJumlah] = useState(null);
  const [catatan, setCatatan] = useState(null);
  const [qtystok, setQtyStok] = useState(null);
  const [harga, setHarga] = useState(null);
  const [modal, setModal] = useState(false);
  const [modaledit, setModalEdit] = useState(false);
  const [modalcetak, setModalCetak] = useState(false);
  const { namauser } = useContext(LoginContext);
  const [montha, setMonth] = useState(dayjs().startOf("month"));
  const host = sessionStorage.getItem("Host");
  const apiku = sessionStorage.getItem("api");

  const datainventory = {
    nobar: nobar,
    notransaksi: notrx,
    kodebarang: kodebarang,
    kodebagian: ruang,
    tglbar: date,
    jmlbarang: jumlah,
    hrgbarang: harga,
    // hrgbarang: (harga * 125) / 100,
    uslognm: namauser,
    jenis: jenis,
    ket: catatan,
    gudang: "U",
    qtystok: qtystok,
    clientName: host,
  };

  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const insertInventory = (datainventory) => {
    setLoadingTrx(true);
    axios
      .post(`${apiku}/Inventory`, datainventory, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          message.success("Berhasil Simpan!");
          getTransaksiBarang(ruang, gudang, bulan, tahun);
          setJumlah(null);
          setJenis(null);
          setCatatan(null);
        } else {
          Modal.warning({
            title: "Gagal Disimpan",
            content: res.data.message,
          });
          setLoadingTrx(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoadingTrx(false);
      });
  };
  const getRuangAll = () => {
    axios
      .get(`${apiku}/MstRuang/LookupMaster/all/0/1/300`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuangAll(res.data.result);
        } else {
          Modal.warning({
            title: "Gagal Disimpan",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getLookupBarangUnit = (nama, ruang, gudang) => {
    axios
      .get(
        `${apiku}/Inventory/LookupBarang/${
          nama === "" ? " " : nama
        }/${ruang}/${gudang}/`,
        {
          headers: options.headers,
        }
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBarangUnit(res.data.result);
          console.log(res.data.result);
        } else {
          Modal.warning({
            title: "Gagal Disimpan",
            content: res.data.message,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getTransaksiBarang = (ruang, gudang, bulan, tahun) => {
    axios
      .get(`${apiku}/Inventory/Lookup/${ruang}/${gudang}/${bulan}/${tahun}`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setTrxBarang(res.data.result);
          console.log(res.data.result);
          setLoadingTrx(false);
        } else {
          message.warning(res.data.message);
          setTrxBarang([]);
          setLoadingTrx(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setTrxBarang([]);
        setLoadingTrx(false);
      });
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      key: "No",
    },
    {
      title: "Kode Barang",
      dataIndex: "KODEBARANG",
      key: "Kode",
    },
    {
      title: "Nama Barang",
      dataIndex: "NAMABARANG",
      key: "Nama",
    },
    {
      title: "Tanggal",
      dataIndex: "TGLBAR",
      key: "Tanggal",
      render: (text, record) => (
        <>{dayjs(record.TGLBAR).format("DD/MM/YYYY h:mm:ss A")}</>
      ),
    },
    {
      title: "Jumlah",
      dataIndex: "JMLBARANG",
      key: "Jumlah",
    },
    {
      title: "Satuan",
      dataIndex: "SATUAN",
      key: "Satuan",
    },
    {
      title: "Harga",
      dataIndex: "HRGBARANG",
      key: "Harga",
      align: "right",
      render: (text, record) =>
        record.HRGBARANG.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        }),
    },
    {
      title: "Biaya",
      dataIndex: "BIAYABAR",
      key: "Biaya",
      align: "right",
      render: (text, record) => (
        <div className="column-money">
          {record.BIAYABAR.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}
        </div>
      ),
    },
    {
      title: "Catatan",
      dataIndex: "KET",
      key: "Catatan",
    },
    {
      title: "User Login",
      dataIndex: "USLOGNM",
      key: "User",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: "#b7eb8f", borderColor: "#b7eb8f" }}
          size="small"
          onClick={() => {
            setNobar(record.NOBAR);
            setNoTrx(record.NOTRANSAKSI);
            setKodeBarang(record.KODEBARANG);
            setHarga(record.HRGBARANG);
            setJumlah(record.JMLBARANG);
            setJenis(record.JENIS);
            setQtyStok(record.QTYSTOK);
            setCatatan(record.KET);
            setNamaBarang(record.NAMABARANG);
            setModalEdit(true);
          }}
        >
          Perbaiki <EditFilled />
        </Button>
      ),
    },
  ];
  const columnsbarang = [
    {
      title: "Kode",
      dataIndex: "KODEBARANG",
      key: "name",
    },
    {
      title: "Nama Barang",
      dataIndex: "NAMABARANG",
      key: "age",
    },
    {
      title: "Stock Unit",
      dataIndex: "QTYUNIT",
      width: "100px",
      key: "address",
    },
    {
      title: "Stock Gudang",
      dataIndex: "QTYFISIK",
      width: "100px",
      key: "address",
    },
    {
      title: "Satuan",
      dataIndex: "NAMASM",
      width: "50px",
      key: "address",
    },
    {
      title: "Action",
      render: (text, record) => (
        <Button
          style={{ backgroundColor: "#91caff", borderColor: "#91caff" }}
          size="small"
          onClick={() => {
            setNobar(null);
            setNoTrx(null);
            setKodeBarang(record.KODEBARANG);
            setNamaBarang(record.NAMABARANG);
            setHarga(record.HARGABARANG);
            setQtyStok(record.QTYFISIK);
            setModal(true);
          }}
        >
          Ambil
        </Button>
      ),
    },
  ];
  const onChange = (key) => {
    console.log(key);
    setGudang(key);
    getLookupBarangUnit(namasearch, ruang, key);
    getTransaksiBarang(ruang, key, bulan, tahun);
  };
  const TableTrx = () => (
    <Table
      loading={loadingtrx}
      size="small"
      dataSource={trxbarang}
      columns={columns}
    />
  );
  const items = [
    {
      key: "1",
      label: `Tindakan`,
      children: `Content of Tab Pane 1`,
      disabled: true,
    },
    {
      key: "9701",
      label: `Obat / Alkes`,
      children: <TableTrx />,
    },
    {
      key: "9702",
      label: `Inventory Lain`,
      children: <TableTrx />,
    },
    {
      key: "4",
      label: `Fasilitas`,
      children: `Content of Tab Pane 3`,
      disabled: true,
    },
  ];

  return (
    <div>
      <Card
        title="Transaksi Barang Unit"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Form
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 22,
          }}
        >
          <Form.Item label="Unit Pelayanan">
            <Select
              onFocus={() => getRuangAll()}
              dataSource={ruangall}
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Ruang"
              optionFilterProp="children"
              onChange={(e) => {
                getLookupBarangUnit(namasearch, e, gudang);
                getTransaksiBarang(e, gudang, bulan, tahun);
                setRuang(e);
                setLoadingTrx(true);
              }}
              value={ruang}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {ruangall.map((d) => (
                <Option key={d.ruangId}>
                  {d.ruangId + " - " + d.deskripsi}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
        <Tabs
          type="card"
          size="small"
          defaultActiveKey="9702"
          items={items}
          tabBarExtraContent={
            <>
              <DatePicker
                value={montha}
                placeholder="Pilih Periode"
                onChange={(date, dateString) => {
                  setTahun(dateString.slice(0, 4));
                  setBulan(dateString.slice(-2));
                  getTransaksiBarang(
                    ruang,
                    gudang,
                    dateString.slice(-2),
                    dateString.slice(0, 4)
                  );
                  setMonth(date);
                }}
                picker="month"
              />{" "}
              <Button onClick={() => setModalCetak(true)}>Cetak Periode</Button>
            </>
          }
          onChange={onChange}
        />
        <Collapse size="small">
          <Panel header="Input Transaksi Barang" key={"1"}>
            <>
              <Search
                placeholder="Cari Nama Barang"
                allowClear
                enterButton="Cari"
                onChange={(e) => setNamaSearch(e.target.value)}
                onSearch={() => getLookupBarangUnit(namasearch, ruang, gudang)}
              />

              <Table
                size="small"
                dataSource={barangunit}
                columns={columnsbarang}
              />
            </>
          </Panel>
        </Collapse>
      </Card>
      <Modal
        title="Ambil Barang"
        open={modal}
        onOk={() => {
          setModal(false);
          insertInventory(datainventory);
          console.log(datainventory);
        }}
        onCancel={() => {
          setJumlah(null);
          setJenis(null);
          setCatatan(null);
          setModal(false);
        }}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          style={{ marginBottom: 0 }}
        >
          <Form.Item label="Kode Barang" style={{ marginBottom: 0 }}>
            {kodebarang}
          </Form.Item>
          <Form.Item label="Nama Barang" style={{ marginBottom: 0 }}>
            {namabarang}
          </Form.Item>
          <Form.Item label="Jumlah" style={{ marginBottom: 0 }}>
            <InputNumber onChange={(e) => setJumlah(e)} />
          </Form.Item>
          <Form.Item label="Jenis Trx" style={{ marginBottom: 0 }}>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Jenis"
              optionFilterProp="children"
              onChange={(e) => {
                setJenis(e);
              }}
              value={jenis}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              options={[
                {
                  value: "27",
                  label: "Bakti Sosial",
                },
                {
                  value: "21",
                  label: "Barang Rusak",
                },
                {
                  value: "20",
                  label: "Expire Date",
                },
                {
                  value: "25",
                  label: "Mutasi Barang Rumah Tangga",
                },
                {
                  value: "23",
                  label: "Transaksi Barang Hibah",
                },
                {
                  value: "99",
                  label: "Transaksi Cetakan Rumah Tangga",
                },
                {
                  value: "22",
                  label: "Transaksi Barang Unit",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Catatan" style={{ marginBottom: 0 }}>
            <Input onChange={(e) => setCatatan(e.target.value)} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title="Perbaikan"
        open={modaledit}
        onOk={() => {
          setModalEdit(false);
          insertInventory(datainventory);
          console.log(datainventory);
        }}
        onCancel={() => {
          setJumlah(null);
          setJenis(null);
          setCatatan(null);
          setModalEdit(false);
        }}
      >
        <Form
          labelCol={{
            span: 5,
          }}
          wrapperCol={{
            span: 19,
          }}
          style={{ marginBottom: 0 }}
        >
          <Form.Item label="Kode Barang" style={{ marginBottom: 0 }}>
            {kodebarang}
          </Form.Item>
          <Form.Item label="Nama Barang" style={{ marginBottom: 0 }}>
            {namabarang}
          </Form.Item>
          <Form.Item label="Jumlah" style={{ marginBottom: 0 }}>
            <InputNumber value={jumlah} onChange={(e) => setJumlah(e)} />
          </Form.Item>
          <Form.Item label="Jenis Trx" style={{ marginBottom: 0 }}>
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Jenis"
              optionFilterProp="children"
              onChange={(e) => {
                setJenis(e);
              }}
              value={jenis}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
              options={[
                {
                  value: "27",
                  label: "Bakti Sosial",
                },
                {
                  value: "21",
                  label: "Barang Rusak",
                },
                {
                  value: "20",
                  label: "Expire Date",
                },
                {
                  value: "25",
                  label: "Mutasi Barang Rumah Tangga",
                },
                {
                  value: "23",
                  label: "Transaksi Barang Hibah",
                },
                {
                  value: "99",
                  label: "Transaksi Cetakan Rumah Tangga",
                },
                {
                  value: "22",
                  label: "Transaksi Barang Unit",
                },
              ]}
            />
          </Form.Item>
          <Form.Item label="Catatan" style={{ marginBottom: 0 }}>
            <Input
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={modalcetak}
        title="Cetak"
        onCancel={() => setModalCetak(false)}
        onOk={() => setModalCetak(false)}
      ></Modal>
    </div>
  );
};

export default TransaksiBarangUnit;
