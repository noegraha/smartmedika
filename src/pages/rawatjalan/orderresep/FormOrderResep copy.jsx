import React, { useEffect, useState } from "react";
import {
  Card,
  Form,
  Select,
  Input,
  Row,
  Col,
  Checkbox,
  Button,
  Table,
  Popconfirm,
  InputNumber,
  Modal,
  message,
  Drawer,
  AutoComplete,
  Alert,
  Space,
  Tag,
  Tooltip,
} from "antd";
import { PasienContext } from "../context/PasienContext";
import { useContext } from "react";
import { ResepContext } from "./ResepContext";
// import { PlusOutlined } from "@ant-design/icons";
import { PelayananContext } from "../context/Pelayanancontext";
import Draggable from "react-draggable";
import RiwayatOrder from "./RiwayatOrder";
const { Option } = Select;
const { Column } = Table;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const formItemLayout2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formItemLayout3 = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};
const draggleRef = React.createRef();

//Form Order Resep
const FormOrderResep = () => {
  const { apotik, curpas } = useContext(PasienContext);
  const { dokterall } = useContext(PelayananContext);
  const {
    listOrder,
    insertOrder,
    order,
    setOrder,
    getBarang,
    barang,
    getBarangDetail,
    // patenbarangdetail,
    patennamabarang,
    // setPatenNamaBarang,
    patenharga,
    // setPatenHarga,
    patensatuan,
    // setPatenSatuan,
    // racikbarangdetail,
    racikharga,
    // setRacikHarga,
    raciknamabarang,
    // setRacikNamaBarang,
    raciksatuan,
    // setRacikSatuan,
    kodebarang,
    setKodeBarang,
    aturanpakai,
    getAturanPakai,
    listorder,
    detailOrder,
    items,
    setItems,
    itemspaten,
    setItemsPaten,
    unitorder,
    setUnitOrder,
    masterjnsracikan,
    jumlah,
    setQuantity,
    aturan,
    setAturan,
    retriksi,
    setRetriksi,
    maxorderobat,
    kekuatan,
    setMaxOrderObat,
    setKekuatan,
    patenmarginprofit,
    nomorracik,
    setNomorRacik,
    getBarangNama,
    // racik,
    // setRacik,
    // itemsracik,
    // setItemsRacik,
    getBarangDetailRacik,
    resepracik,
    setResepRacik,
    noOrder,
    setNoOrder,
    itemracikan,
    setItemRacikan,
    detailracik,
    setDetailracik,
    racikmarginprofit,
    deleteOrder,
    retriksijadi,
  } = useContext(ResepContext);

  useEffect(() => {
    getAturanPakai();
  }, []);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const handleFocus = (e) => e.target.select();

  // const [headerRacikan, setHeaderRacikan] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [cito, setCito] = useState(false);
  const [pelaksana, setPelaksana] = useState(curpas.dokterId);
  // const [formRacikan, setFormRacikan] = useState(false);
  // const [jenisRacikan, setJenisRacikan] = useState([]);
  // const [jumlahRacikan, setJumlahRacikan] = useState([]);
  // const [aturanRacikan, setAturanRacikan] = useState([]);
  const [modalorder, setModalOrder] = useState(false);
  const namauser = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const [visible, setVisible] = useState(false);
  const [spanOrder, setSpanOrder] = useState(false);
  const [spanRiwayat, setSpanRiwayat] = useState(false);
  const [warnaRow, setWarnaRow] = useState("");

  //state racik
  // const [tampilresepracik, setTampilResepRacik] = useState([]);

  const [barangidracik, setBarangIdRacik] = useState("");
  const [quantityracikan, setQuantityRacikan] = useState("1");
  // const [satuanidracik, setSatuanIdRacik] = useState("");
  // const [hargabarangracik, setHargaBarangRacik] = useState(0);
  // const [hargatotalracik, setHargaTotalRacik] = useState(0);
  const [dosisracik, setDosisRacik] = useState(null);
  // const [satuandosisidracik, setSatuanDosisIdRacik] = useState("");
  // const [quantityracik, setQuantityRacik] = useState("1");
  // const [quantitydosis, setQuantityDosis] = useState("1");
  const [jenisracikid, setJenisRacikId] = useState(null);
  const [aturanpakaiidracik, setAturanPakaiIdRacik] = useState(null);
  // const [ketracik, setKeteranganRacik] = useState("1");
  // const [pilih, setPilihRacikan] = useState("1");
  const [tampilracikan, setTampilRacikan] = useState(false);
  const [noracikaktif, setNoracikaktif] = useState("");

  const onTampilRacikan = (e, f) => {
    setTampilRacikan(true);
    setNoracikaktif(e);
    setDetailracik(resepracik[f].obatRacik);
    setQuantityRacikan(resepracik[f].quantity);
    setJenisRacikId(resepracik[f].jenisRacikId);
    setAturanPakaiIdRacik(resepracik[f].aturanPakaiId);
    setBarangIdRacik([]);
    setRetriksi(null);
    setDosisRacik(null);
    setMaxOrderObat(null);
    setKekuatan(null);
    setWarnaRow(f);
    console.log(f);
  };

  const dataorder = {
    orderId: noOrder,
    registrasiId: curpas.registrasiId,
    ruangOrderId: curpas.ruangId,
    ruangTujuanId: unitorder,
    kelasRawatId: "A",
    totalBiaya:
      items
        .map((v) => v.hargaTotal)
        .reduce((sum, current) => sum + current, 0) +
      resepracik
        .map((v) =>
          v.obatRacik
            .map((p) => p.hargaTotal)
            .reduce((sum, current) => sum + current, 0)
        )
        .reduce((sum, current) => sum + current, 0),
    userId: namauser,
    dokterId: pelaksana,
    statusCito: cito ? "YA" : "TIDAK",
    clientHost: host,
    clientIP: ip,
    obatPaten: items,
    headerRacik: resepracik,
  };

  const onTambahRacik = () => {
    setNomorRacik(nomorracik + 1);
    setNoracikaktif("");
    setResepRacik([
      ...resepracik,
      {
        noRacik: nomorracik.toString(),
        quantity: quantityracikan,
        jenisRacikId: jenisracikid.split("-").shift(),
        jenisRacikDesk: jenisracikid.split("-").pop(),
        aturanPakaiId: aturanpakaiidracik,
        obatRacik: itemracikan,
      },
    ]);
    setDetailracik([]);
    setItemRacikan([]);
  };
  const [modaleditracik, setModalEditRacik] = useState(false);
  const [jenisracikedit, setJenisRacikEdit] = useState("");
  const [quantityracikedit, setQuantityRacikEdit] = useState("");
  const [aturanpakaiedit, setAturanPakaiEdit] = useState("");
  const [nomorracikedit, setNomorRacikEdit] = useState("");
  const onSetEditRacik = (e, d, f, g, h) => {
    console.log(e, d, f, g, h);
    setModalEditRacik(true);
    setNomorRacikEdit(f);
    setJenisRacikEdit(d);
    setQuantityRacikEdit(g);
    setAturanPakaiEdit(h);
  };
  const onEditRacik = (e) => {
    setModalEditRacik(false);
    const elementsIndex = resepracik.findIndex(
      (element) => element.noRacik === nomorracikedit
    );
    if (elementsIndex === -1) {
      console.log(elementsIndex);
      message.warning(elementsIndex);
    } else {
      let newArray = [...resepracik];

      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        quantity: quantityracikedit,
        jenisRacikId: jenisracikedit,
        aturanPakaiId: aturanpakaiedit,
      };
      setResepRacik(newArray);
      message.success("Berhasil diubah!");
    }
  };
  const onTambahItemRacikan = (e) => {
    // if (resepracik.some((el) => el.noRacik === e)) {
    const elementsIndex = detailracik.findIndex(
      (element) => element.namaBarang === raciknamabarang
    );
    if (elementsIndex === -1) {
      if (Math.ceil((dosisracik / kekuatan) * quantityracikan) === Infinity) {
        message.warning(
          `Kekuatan dosis Obat Dengan Kode ${barangidracik} belum disetting. Silahkan Hubungi Petugas Farmasi.`
        );
      } else {
        setDetailracik([
          ...detailracik,
          {
            noRacik: e,
            barangId: barangidracik,
            namaBarang: raciknamabarang,
            quantity: Math.ceil((dosisracik / kekuatan) * quantityracikan),
            satuanId: raciksatuan,
            harga: racikharga,
            hargaTotal:
              racikharga * Math.ceil((dosisracik / kekuatan) * quantityracikan),
            dosis: dosisracik,
            profitMargin: racikmarginprofit,
            jenisRacikId: jenisracikid,
            // quadosis: Math.ceil((dosisracik / kekuatan) * quantityracikan),
          },
        ]);
        resepracik[e - 1].obatRacik.push(...itemracikan, {
          noRacik: e,
          namaBarang: raciknamabarang,
          barangId: barangidracik,
          quantity: Math.ceil((dosisracik / kekuatan) * quantityracikan),
          satuanId: raciksatuan,
          harga: racikharga,
          hargaTotal:
            racikharga * Math.ceil((dosisracik / kekuatan) * quantityracikan),
          dosis: dosisracik,
          profitMargin: racikmarginprofit,
          jenisRacikId: jenisracikid,
        });
      }
    } else {
      let newArray = [...detailracik];

      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        quantity: Math.ceil((dosisracik / kekuatan) * quantityracikan),
        hargaTotal:
          racikharga * Math.ceil((dosisracik / kekuatan) * quantityracikan),
        dosis: dosisracik,
      };
      setDetailracik(newArray);

      resepracik[e - 1].obatRacik[elementsIndex].quantity = Math.ceil(
        (dosisracik / kekuatan) * quantityracikan
      );
      resepracik[e - 1].obatRacik[elementsIndex].hargaTotal =
        racikharga * Math.ceil((dosisracik / kekuatan) * quantityracikan);
      resepracik[e - 1].obatRacik[elementsIndex].dosis = dosisracik;
    }
  };
  const onHapusRacikan = (e) => {
    setResepRacik(resepracik.filter((item) => item.noRacik !== e));
  };
  const onHapusDetailRacik = (e, f) => {
    console.log(f);
    console.log(
      resepracik[f - 1].obatRacik.filter((item) => item.barangId !== e)
    );
    resepracik[f - 1].obatRacik = resepracik[f - 1].obatRacik.filter(
      (item) => item.barangId !== e
    );
    // resepracik[f - 1].obatRacik.push(
    //   resepracik[f - 1].obatRacik.filter((item) => item.barangId !== e)
    // );

    setDetailracik(detailracik.filter((item) => item.barangId !== e));
  };

  const columnResepRacik = [
    {
      dataIndex: "jenisRacikDesk",
      title: "Jenis Racikan",
      className: "bgcolortunggu",
    },
    {
      dataIndex: "noRacik",
      title: "No Racik",
    },
    {
      dataIndex: "quantity",
      title: "Qty",
    },
    {
      dataIndex: "aturanPakaiId",
      title: "Aturan Pakai",
    },
    {
      title: "Action",
      render: (text, record, index) => (
        <Space>
          <Button
            type="primary"
            size="small"
            onClick={() => onTampilRacikan(record.noRacik, index)}
            style={{ backgroundColor: "#13c2c2", borderColor: "#13c2c2" }}
          >
            Items
          </Button>
          <Popconfirm
            title="Anda Yakin Dihapus ?"
            onConfirm={() => onHapusRacikan(record.noRacik)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="primary" size="small" danger>
              Hapus
            </Button>
          </Popconfirm>
          <Button
            type="primary"
            size="small"
            onClick={() =>
              onSetEditRacik(
                index,
                record.jenisRacikId,
                record.noRacik,
                record.quantity,
                record.aturanPakaiId
              )
            }
            style={{ backgroundColor: "#73d13d", borderColor: "#b7eb8f" }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  const columnItemsRacik = [
    {
      dataIndex: "noRacik",
      title: "No Racik",
    },
    {
      dataIndex: "barangId",
      title: "Kode Barang",
    },
    {
      dataIndex: "namaBarang",
      title: "Nama Barang",
    },
    {
      dataIndex: "dosis",
      title: "Dosis",
    },
    {
      dataIndex: "quantity",
      title: "Qty",
    },
    {
      title: "Action",
      render: (text, record, index) => (
        <div>
          <Popconfirm
            title="Anda Yakin Dihapus ?"
            onConfirm={() =>
              onHapusDetailRacik(record.barangId, record.noRacik)
            }
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="primary" size="small" danger>
              Hapus
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const columnorder = [
    {
      dataIndex: "noOrder",
      title: "No Order",
      className: "bgcolortunggu",
    },
    {
      dataIndex: "dokterDesk",
      title: "Nama Dokter",
    },
    {
      dataIndex: "tanggalOrder",
      title: "Tanggal Order",
    },
    {
      dataIndex: "unitTujuanDesk",
      title: "Unit Tujuan",
    },
    {
      title: "Action",
      render: (listorder) => (
        <div>
          <Button
            type="primary"
            size="small"
            onClick={() =>
              onDetailOrder(listorder.noOrder, listorder.unitTujuan)
            }
          >
            Ambil
          </Button>
          <Popconfirm
            title="Anda Yakin Dihapus ?"
            onConfirm={() => deleteOrder(listorder.noOrder)}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button type="primary" size="small" danger>
              Hapus
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const onAmbilDetailBarang = (e) => {
    setBarangIdRacik(e);
    getBarangDetailRacik(e);
  };
  const showDrawer = () => {
    setSpanOrder(!spanOrder);
    setSpanRiwayat(!spanRiwayat);
  };
  const tutupSpan = () => {
    setSpanOrder(false);
    setSpanRiwayat(false);
  };
  const onDetailOrder = (e, f) => {
    detailOrder(e);
    setNoOrder(e);
    setUnitOrder(f);
    getBarang(f);
    setModalOrder(false);
    setTampilRacikan(false);
  };
  const onApotik = (e) => {
    setUnitOrder(e);
    getBarang(e);
    setItemsPaten([]);
    setOrder("");
    setDetailracik([]);
    setItemRacikan([]);
    setTampilRacikan(false);
    setNoOrder(null);
    setItems([]);
  };
  const simpanOrder = () => {
    insertOrder(dataorder);
    console.log(dataorder);
  };
  const onAmbilObat = (e) => {
    getBarangDetail(e);
    setKodeBarang(e);
  };

  const addItem = (e) => {
    const elementsIndex = itemspaten.findIndex(
      (element) => element.namaBarang === patennamabarang
    );

    if (elementsIndex === -1) {
      setItems([
        ...items,
        {
          isRacikan: false,
          barangId: kodebarang,
          quantity: jumlah,
          satuanId: patensatuan,
          aturanPakaiId: aturan,
          harga: patenharga,
          hargaTotal: jumlah * patenharga,
          profitMargin: patenmarginprofit,
        },
      ]);
      setItemsPaten([
        ...itemspaten,
        {
          id: itemspaten.length,
          barangId: kodebarang,
          namaBarang: patennamabarang,
          quantity: jumlah,
          satuanId: patensatuan,
          aturanPakaiId: aturan,
        },
      ]);
    } else {
      let newArray = [...itemspaten];

      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        quantity: jumlah,
        aturanPakaiId: aturan,
      };
      setItemsPaten(newArray);
    }
  };

  const handleRemoveItem = (e) => {
    setItems(items.filter((item) => item.barangId !== e));
    setItemsPaten(itemspaten.filter((item) => item.barangId !== e));
  };

  const mockData = [];
  // eslint-disable-next-line array-callback-return
  barang.map((b) => {
    mockData.push({
      key: b.KodeBarang,
      KodeBarang: b.KodeBarang,
      NamaBarang: b.NamaBarang,
      StockUnit: b.StockUnit,
      StockGudang: b.StockGudang,
    });
  });

  const simpan = () => console.log("simpan");
  const onModalOrder = () => {
    listOrder(curpas.registrasiId);
    setModalOrder(true);
  };

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={spanOrder ? 14 : 24}>
          {/* Header */}
          <Form onFinish={simpanOrder}>
            <Card
              title="Order Resep"
              size="small"
              headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
              style={{
                borderWidth: "2px",
                borderColor: "darkgray",
                borderRadius: "4px",
                marginBottom: 5,
              }}
              extra={
                <Button
                  size="small"
                  type="primary"
                  style={{
                    backgroundColor: "#237804",
                    borderColor: "transparent",
                  }}
                  onClick={showDrawer}
                >
                  Lihat Riwayat
                </Button>
              }
            >
              <Form.Item
                {...formItemLayout}
                label="Apotik"
                style={{ marginBottom: 0 }}
              >
                <Select
                  dataSource={apotik}
                  showSearch
                  value={unitorder}
                  placeholder="Pilih ruang..."
                  optionFilterProp="children"
                  onChange={onApotik}
                  filterOption={(input, option) =>
                    option.props.children
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {apotik.map((d) => (
                    <Option key={d.ruangId}>
                      {d.ruangId} - {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Row>
                <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    {...formItemLayout2}
                    label="No Order"
                    style={{ marginBottom: 0 }}
                  >
                    <Input
                      value={order.orderId}
                      addonAfter={
                        <Button type="text" size="small" onClick={onModalOrder}>
                          ...
                        </Button>
                      }
                    />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="Tgl Order"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpas.tanggalMasuk} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="No Registrasi"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpas.registrasiId} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="No Pasien"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpas.pasienId} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="Kelas"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpas.kelasRawat} />
                  </Form.Item>
                </Col>
                <Col span={12} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Row>
                    <Col span={12}>
                      <Form.Item
                        {...formItemLayout3}
                        label="Cito"
                        style={{ marginBottom: 0 }}
                      >
                        <Checkbox onChange={(e) => setCito(e.target.checked)}>
                          {cito ? "Ya" : "Tidak"}
                        </Checkbox>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        {...formItemLayout3}
                        label="Status"
                        style={{ marginBottom: 0 }}
                      >
                        <Input defaultValue="Order" />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    {...formItemLayout2}
                    label="Bagian"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpas.ruangDeskripsi} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="Nama Pasien"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpas.namaPasien} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="Penjamin"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpas.namaPembayaran} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="Dokter"
                    style={{ marginBottom: 0 }}
                  >
                    <Select
                      dataSource={dokterall}
                      showSearch
                      value={pelaksana}
                      style={{ width: "100%" }}
                      placeholder="Pilih Pelaksana"
                      optionFilterProp="children"
                      onChange={(e) => setPelaksana(e)}
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
                </Col>
              </Row>
            </Card>
          </Form>

          {/* Obat Paten */}
          <Card
            title="Item Obat Jadi"
            size="small"
            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
              marginBottom: 5,
            }}
          >
            <Form
              name="Form Obat resep"
              initialValues={{ remember: true }}
              onFinish={addItem}
            >
              <Row gutter={[8, 2]}>
                <Col span={4} xs={24} sm={12} md={12} lg={12} xl={12}>
                  <Row>
                    <Col span={12} style={{ textAlign: "left" }}>
                      Nama Barang :
                    </Col>
                    <Col span={12} style={{ textAlign: "right" }}>
                      <Row>
                        <Col span={14}>
                          <Tooltip title="Stock Unit">
                            <Tag color="cyan">Stock Unit</Tag>
                          </Tooltip>
                        </Col>
                        <Col span={10}>
                          <Tooltip title="Stock Gudang">
                            <Tag color="volcano">Stock Gudang</Tag>
                          </Tooltip>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Select
                      onFocus={() => {
                        getBarangNama(" ", unitorder);
                        if (unitorder === "") {
                          message.warning("Pilih apotik terlebih dahulu!");
                        }
                      }}
                      showSearch
                      value={kodebarang}
                      style={{ width: "100%" }}
                      placeholder="Pilih Barang Obat"
                      filterOption={false}
                      onChange={(e) => onAmbilObat(e)}
                      onSearch={(e) => {
                        getBarangNama(e === "" ? " " : e, unitorder);
                      }}
                    >
                      {barang.map((p) => (
                        <Option key={p.KodeBarang}>
                          {/* {p.NamaBarang} - {p.StockUnit} - {p.StockGudang} */}
                          {
                            <div>
                              <Row>
                                <Col span={12} style={{ textAlign: "left" }}>
                                  {p.NamaBarang}
                                </Col>
                                <Col span={12} style={{ textAlign: "right" }}>
                                  <Row>
                                    <Col span={14}>
                                      <Tooltip title="Stock Unit">
                                        <Tag color="cyan">{p.StockUnit}</Tag>
                                      </Tooltip>
                                    </Col>
                                    <Col span={10}>
                                      <Tooltip title="Stock Gudang">
                                        <Tag color="volcano">
                                          {p.StockGudang}
                                        </Tag>
                                      </Tooltip>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            </div>
                          }
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  {retriksijadi === null || retriksijadi === "" ? null : (
                    <Alert message={retriksijadi} type="info" />
                  )}
                </Col>
                <Col span={4} xs={6} sm={4} md={4} lg={3} xl={3}>
                  Quantity :
                  <Form.Item rules={[{ required: true }]}>
                    <InputNumber
                      step="0.1"
                      min={1}
                      value={jumlah}
                      style={{ width: "100%" }}
                      onChange={(e) => setQuantity(e)}
                      onFocus={handleFocus}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} xs={12} sm={7} md={7} lg={7} xl={7}>
                  Aturan :
                  <Form.Item rules={[{ required: true }]}>
                    <AutoComplete
                      options={aturanpakai}
                      onSelect={(e) => setAturan(e)}
                      // onSearch={onSearch}
                      onChange={(e) => setAturan(e)}
                      placeholder="Ketik Aturan Pakai"
                      filterOption={(inputValue, option) =>
                        option.value &&
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>
                </Col>
                <Col
                  span={24}
                  xs={6}
                  sm={2}
                  md={2}
                  lg={2}
                  xl={2}
                  style={{ display: "flex", alignItems: "end" }}
                >
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Ambil
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
            <Table
              bordered
              dataSource={itemspaten}
              pagination={false}
              size="small"
              rowKey="reg"
              scroll={{ y: 800 }}
            >
              <Column
                title="No."
                key="reg"
                className="bgcolortunggu"
                width="40px"
                render={(text, record, index) => <span>{index + 1}</span>}
              />
              <Column
                title="Kode Barang"
                key="reg"
                className="bgcolortunggu"
                width="100px"
                render={(items) => <span>{items.barangId}</span>}
              />
              <Column
                title="Barang"
                key="reg"
                className="bgcolortunggu"
                width="275px"
                render={(items) => <span>{items.namaBarang}</span>}
              />
              <Column
                title="Quantity"
                key="reg"
                width="70px"
                render={(items) => <span>{items.quantity}</span>}
              />
              <Column
                title="Satuan"
                key="reg"
                width="50px"
                render={(items) => <span>{items.satuanId}</span>}
              />
              <Column
                title="Aturan"
                key="reg"
                width="80px"
                render={(items) => <span>{items.aturanPakaiId}</span>}
              />
              <Column
                title="Action"
                key="reg"
                width="70px"
                render={(items) => (
                  <span>
                    <Popconfirm
                      title="Anda Yakin Dihapus ?"
                      onConfirm={() => handleRemoveItem(items.barangId)}
                      okText="Ya"
                      cancelText="Tidak"
                    >
                      <Button danger type="primary" size="small">
                        Hapus
                      </Button>
                    </Popconfirm>
                  </span>
                )}
              />
            </Table>
          </Card>

          {/* Obat Racik */}
          <Card
            title="Item Racikan"
            size="small"
            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
              marginBottom: 25,
            }}
          >
            <Form {...formItemLayout2}>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item label="Jenis Racikan" style={{ marginBottom: 0 }}>
                    <Select
                      // onFocus={
                      //   unitorder === ""
                      //     ? message.warning("Pilih apotik terlebih dahulu!")
                      //     : null
                      // }
                      dataSource={masterjnsracikan}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Pilih Racikan"
                      optionFilterProp="children"
                      onChange={(e) => setJenisRacikId(e)}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {masterjnsracikan.map((p) => (
                        <Option value={p.JenisRacikId + "-" + p.Deskripsi}>
                          {p.Deskripsi}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item label="Quantity" style={{ marginBottom: 0 }}>
                    <InputNumber
                      step="0.1"
                      min={1}
                      value={quantityracikan}
                      style={{ width: "100%" }}
                      onChange={(e) => setQuantityRacikan(e)}
                      onFocus={handleFocus}
                    />
                  </Form.Item>
                  <Form.Item label="Aturan" style={{ marginBottom: 5 }}>
                    <AutoComplete
                      options={aturanpakai}
                      onSelect={(e) => setAturanPakaiIdRacik(e)}
                      onChange={(e) => setAturanPakaiIdRacik(e)}
                      placeholder="Ketik Aturan Pakai"
                      filterOption={(inputValue, option) =>
                        option.value &&
                        option.value
                          .toUpperCase()
                          .indexOf(inputValue.toUpperCase()) !== -1
                      }
                    />
                  </Form.Item>
                  <Row>
                    <Col style={{ textAlign: "right" }} span={24}>
                      <Space>
                        <Button
                          type="primary"
                          onClick={() =>
                            unitorder === ""
                              ? message.warning("Pilih apotik terlebih dahulu!")
                              : aturanpakaiidracik === null ||
                                jenisracikid === null
                              ? message.warning(
                                  "Form Order Racik Belum Lengkap!"
                                )
                              : onTambahRacik()
                          }
                        >
                          Tambah Racikan
                        </Button>
                      </Space>
                    </Col>
                  </Row>
                  <Table
                    dataSource={resepracik}
                    columns={columnResepRacik}
                    size="small"
                    pagination={false}
                    rowClassName={(record, rowIndex) =>
                      rowIndex === warnaRow ? "colorpilihobat" : null
                    }
                  />
                </Col>
                {tampilracikan ? (
                  <Col span={12}>
                    <Row>
                      <Col span={12} style={{ textAlign: "left" }}>
                        Nama Barang :
                      </Col>
                      <Col span={12} style={{ textAlign: "right" }}>
                        <Row>
                          <Col span={14}>
                            <Tooltip title="Stock Unit">
                              <Tag color="cyan">Stock Unit</Tag>
                            </Tooltip>
                          </Col>
                          <Col span={10}>
                            <Tooltip title="Stock Gudang">
                              <Tag color="volcano">Stock Gudang</Tag>
                            </Tooltip>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Form.Item style={{ marginBottom: 0 }}>
                      <Select
                        onFocus={() => {
                          getBarangNama(" ", unitorder);
                          if (unitorder === "") {
                            message.warning("Pilih apotik terlebih dahulu!");
                          }
                        }}
                        showSearchz
                        value={barangidracik}
                        style={{ width: "100%" }}
                        placeholder="Pilih Barang Obat"
                        filterOption={false}
                        onChange={(e) => onAmbilDetailBarang(e)}
                        onSearch={(e) => {
                          getBarangNama(e === "" ? " " : e, unitorder);
                        }}
                      >
                        {barang.map((p) => (
                          <Option key={p.KodeBarang}>
                            {/* {p.NamaBarang} - {p.StockUnit} - {p.StockGudang} */}
                            {
                              <div>
                                <Row>
                                  <Col span={12} style={{ textAlign: "left" }}>
                                    {p.NamaBarang}
                                  </Col>
                                  <Col span={12} style={{ textAlign: "right" }}>
                                    <Row>
                                      <Col span={14}>
                                        <Tooltip title="Stock Unit">
                                          <Tag color="cyan">{p.StockUnit}</Tag>
                                        </Tooltip>
                                      </Col>
                                      <Col span={10}>
                                        <Tooltip title="Stock Gudang">
                                          <Tag color="volcano">
                                            {p.StockGudang}
                                          </Tag>
                                        </Tooltip>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </div>
                            }
                          </Option>
                        ))}
                      </Select>
                      {retriksi !== null ? (
                        <Alert message={retriksi} type="info" />
                      ) : null}
                    </Form.Item>
                    <Form.Item label="Dosis" style={{ marginBottom: 0 }}>
                      <Input.Group compact>
                        <InputNumber
                          step="0.1"
                          min={1}
                          value={dosisracik}
                          style={{ width: "50%" }}
                          onChange={(e) => setDosisRacik(e)}
                          onFocus={handleFocus}
                        />
                        <Input
                          style={{ width: "50%" }}
                          value={`Kekuatan : ` + kekuatan}
                        />
                      </Input.Group>
                    </Form.Item>
                    <Form.Item label="Qty Obat" style={{ marginBottom: 5 }}>
                      <Input.Group compact>
                        <InputNumber
                          step="0.1"
                          min={1}
                          value={Math.ceil(
                            (dosisracik / kekuatan) * quantityracikan
                          )}
                          style={{ width: "50%" }}
                          disabled
                        />
                        <Input
                          style={{ width: "50%" }}
                          value={`Max Order Obat : ` + maxorderobat}
                        />
                      </Input.Group>
                    </Form.Item>
                    <Row>
                      <Col style={{ textAlign: "right" }} span={24}>
                        <Button
                          htmlType="submit"
                          type="primary"
                          onClick={() =>
                            dosisracik === null
                              ? message.warning("Form Racik Belum Lengkap")
                              : onTambahItemRacikan(noracikaktif)
                          }
                        >
                          Ambil
                        </Button>
                      </Col>
                    </Row>
                    <Table
                      dataSource={detailracik}
                      columns={columnItemsRacik}
                      size="small"
                      pagination={false}
                    />
                  </Col>
                ) : (
                  <></>
                )}
              </Row>
            </Form>
          </Card>

          <Row>
            <Col style={{ textAlign: "right" }} span={24}>
              <Button htmlType="submit" type="primary" onClick={simpanOrder}>
                Simpan
              </Button>
            </Col>
          </Row>
        </Col>

        <Col span={spanRiwayat ? 10 : 0}>
          <Card
            extra={
              <Button size="small" type="primary" danger onClick={tutupSpan}>
                Tutup
              </Button>
            }
            title="Riwayat Obat"
            size="small"
            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
              marginBottom: 25,
            }}
          >
            <RiwayatOrder />
          </Card>
        </Col>
      </Row>

      {/* Daftar Order */}
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Daftar Order
          </div>
        }
        visible={modalorder}
        onOk={simpan}
        onCancel={() => setModalOrder(false)}
        width="1000px"
        footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Table
          columns={columnorder}
          dataSource={listorder}
          size="small"
          pagination={false}
        />
      </Modal>

      {/* Edit Racik Header */}
      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Edit Racik
          </div>
        }
        visible={modaleditracik}
        onOk={() => onEditRacik()}
        onCancel={() => setModalEditRacik(false)}
        width="450px"
        okText="Simpan"
        cancelText="Batal"
        // footer={null}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Form {...formItemLayout2}>
          <Form.Item label="Jenis Racikan" style={{ marginBottom: 0 }}>
            <Select
              dataSource={masterjnsracikan}
              showSearch
              value={jenisracikedit}
              style={{ width: "100%" }}
              placeholder="Pilih Racikan"
              optionFilterProp="children"
              onChange={(e) => setJenisRacikEdit(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {masterjnsracikan.map((p) => (
                <Option key={p.JenisRacikId}>{p.Deskripsi}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Quantity" style={{ marginBottom: 0 }}>
            <InputNumber
              step="0.1"
              min={1}
              value={quantityracikedit}
              style={{ width: "100%" }}
              onChange={(e) => setQuantityRacikEdit(e)}
              onFocus={handleFocus}
            />
          </Form.Item>
          <Form.Item label="Aturan" style={{ marginBottom: 0 }}>
            <AutoComplete
              options={aturanpakai}
              value={aturanpakaiedit}
              onSelect={(e) => setAturanPakaiEdit(e)}
              onChange={(e) => setAturanPakaiEdit(e)}
              placeholder="Ketik Aturan Pakai"
              filterOption={(inputValue, option) =>
                option.value &&
                option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !==
                  -1
              }
            />
          </Form.Item>
        </Form>
      </Modal>

      {/* Riwayat Obat */}
      <Drawer
        title="Riwayat Resep Obat"
        placement="right"
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        width={550}
      >
        <RiwayatOrder />
      </Drawer>
    </div>
  );
};

export default FormOrderResep;
