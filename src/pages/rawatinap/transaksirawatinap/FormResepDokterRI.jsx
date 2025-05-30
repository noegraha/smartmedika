import React, { useState, useContext } from "react";
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
} from "antd";
import { PasienRIContext } from "../context/PasienRIContext";
import { ResepRIContext } from "../context/ResepRIContext";
// import { PlusOutlined } from "@ant-design/icons";
import { PelayananRIContext } from "../context/PelayananRIContext";
import RiwayatOrderRI from "./orderresepri/RiwayatOrderRI";
import Draggable from "react-draggable";

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

const FormResepDokterRI = () => {
  const { apotik, curpasRI } = useContext(PasienRIContext);
  const { dokterall } = useContext(PelayananRIContext);

  const {
    listOrder,
    insertOrder,
    order,
    setOrder,
    getBarang,
    barang,
    getBarangDetail,
    barangdetail,
    getBarangNama,
    itemName,
    setItemName,
    harga,
    setHarga,
    satuan,
    setSatuan,
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
    jnsracikan,
    jumlah,
    setQuantity,
    aturan,
    setAturan,
    // racik,
    // setRacik,
    // itemsracik,
    // setItemsRacik,
  } = useContext(ResepRIContext);

  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const [headerRacikan, setHeaderRacikan] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [cito, setCito] = useState(false);
  const [pelaksana, setPelaksana] = useState(curpasRI.dokterId);
  const [formRacikan, setFormRacikan] = useState(false);
  const [jenisRacikan, setJenisRacikan] = useState([]);
  const [jumlahRacikan, setJumlahRacikan] = useState([]);
  const [aturanRacikan, setAturanRacikan] = useState([]);
  const [modalorder, setModalOrder] = useState(false);
  const [noOrder, setNoOrder] = useState("0");
  const namauser = sessionStorage.getItem("userId");
  const [visible, setVisible] = useState(false);
  const [spanOrder, setSpanOrder] = useState(false);
  const [spanRiwayat, setSpanRiwayat] = useState(false);

  const showDrawer = () => {
    setSpanOrder(!spanOrder);
    setSpanRiwayat(!spanRiwayat);
  };
  const onClose = () => {
    setVisible(false);
  };
  const handleCancel = () => {
    setModalOrder(false);
  };
  const onDetailOrder = (e, f) => {
    detailOrder(e);
    setNoOrder(e);
    setUnitOrder(f);
    getBarang(f);
    setModalOrder(false);
  };
  const onRacikan = (e) => {
    setJenisRacikan(e);
    console.log(e);
  };
  const onCito = (e) => {
    setCito(e.target.checked);
  };
  const onApotik = (e) => {
    setUnitOrder(e);
    getBarang(e);
    setItemsPaten([]);
    setOrder("");
    getAturanPakai();
  };
  const onPelaksana = (e) => {
    // setPelaksana(e);
  };

  const columnorder = [
    {
      dataIndex: "noOrder",
      title: "No Order",
      className: "bgcolortunggu",
    },
    {
      dataIndex: "DokterDesk",
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
        </div>
      ),
    },
  ];

  const dataorder = {
    noOrder: noOrder,
    registrasiId: curpasRI.registrasiId,
    unitOrder: curpasRI.ruangId,
    unitTujuan: unitorder,
    grpTrf: "A",
    biaya: 10,
    username: namauser,
    dokterId: pelaksana,
    statusCito: cito ? "YA" : "TIDAK",
    obatPaten: items,
    obatRacik: [
      {
        barangId: "string",
        qtyBarang: 10,
        satuan: "AMPUL",
        hargaDrSp: 10,
        hargaTotal: 10,
        dosis: 10,
        jmlQtyRacik: 10,
        jmlDosis: 10,
        keterangan: "string",
      },
    ],
  };
  const simpanOrder = () => {
    insertOrder(dataorder);
    console.log(dataorder);
  };
  const onAmbilObat = (e) => {
    getBarangDetail(e);
    setKodeBarang(e);
  };
  const onAturan = (e) => {
    setAturan(e);
    console.log(e);
  };
  const addItem = (e) => {
    const elementsIndex = itemspaten.findIndex(
      (element) => element.namaBarang === itemName
    );
    if (elementsIndex === -1) {
      setItems([
        ...items,
        {
          patenRacik: "P",
          barangId: kodebarang,
          qtyBarang: jumlah,
          satuan: satuan,
          kodeAtrPk: aturan,
          hargaDrSp: harga,
          hargaTotal: jumlah * harga,
        },
      ]);
      setItemsPaten([
        ...itemspaten,
        {
          id: itemspaten.length,
          barangId: kodebarang,
          namaBarang: itemName,
          qtyBarang: jumlah,
          satuan: satuan,
          kodeATrPK: aturan,
        },
      ]);
    } else {
      let newArray = [...itemspaten];
      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        qtyBarang: jumlah,
        kodeATrPK: aturan,
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

  const addHeaderRacikan = () => {
    const elementsIndex = headerRacikan.findIndex(
      (element) => element.jenisRacikan === jenisRacikan
    );

    if (elementsIndex === -1) {
      setHeaderRacikan([
        ...headerRacikan,
        {
          jenisRacikan: jenisRacikan,
          qtyBarang: jumlahRacikan,
          kodeATrPK: aturanRacikan,
        },
      ]);
    } else {
      let newArray = [...headerRacikan];

      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        qtyBarang: jumlahRacikan,
        kodeATrPK: aturanRacikan,
      };
      setHeaderRacikan(newArray);
    }
    console.log(headerRacikan);
  };
  const columnHeaderRacikan = [
    {
      dataIndex: "jenisRacikan",
      title: "Jenis Racikan",
      className: "bgcolortunggu",
    },
    {
      dataIndex: "qtyBarang",
      title: "Quantity",
    },
    {
      dataIndex: "kodeATrPK",
      title: "Aturan Pakai",
    },
    {
      title: "Action",
      render: () => (
        <div>
          <Button type="primary" size="small">
            Resep
          </Button>
        </div>
      ),
    },
  ];
  const simpan = () => console.log("simpan");
  const onModalOrder = () => {
    listOrder(curpasRI.registrasiId);
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
                    borderColor: "#135200",
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
                  //   value={unitorder}
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
                      //   value={order.noOrder}
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
                    <Input value={curpasRI.tanggalMasuk} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="No Registrasi"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpasRI.registrasiId} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="No Pasien"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpasRI.pasienId} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="Kelas"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpasRI.kelasRawat} />
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
                        <Checkbox onChange={onCito}>
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
                    <Input value={curpasRI.ruangDeskripsi} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="Nama Pasien"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpasRI.namaPasien} />
                  </Form.Item>
                  <Form.Item
                    {...formItemLayout2}
                    label="Penjamin"
                    style={{ marginBottom: 0 }}
                  >
                    <Input value={curpasRI.namaPembayaran} />
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
                      onChange={(e) => onPelaksana(e)}
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
                  Nama Barang :{" "}
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Select
                      onFocus={() =>
                        unitorder === ""
                          ? message.warning("Pilih apotik terlebih dahulu!")
                          : null
                      }
                      dataSource={barang}
                      showSearch
                      //   value={kodebarang}
                      style={{ width: "100%" }}
                      placeholder="Pilih Barang Obat"
                      optionFilterProp="children"
                      onChange={(e) => onAmbilObat(e)}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {barang.map((p) => (
                        <Option key={p.KodeBarang}>{p.NamaBarang}</Option>
                      ))}
                    </Select>
                  </Form.Item>
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
                    />
                  </Form.Item>
                </Col>
                <Col span={24} xs={12} sm={7} md={7} lg={7} xl={7}>
                  Aturan :
                  <Form.Item rules={[{ required: true }]}>
                    <AutoComplete
                      options={aturanpakai}
                      onSelect={(e) => onAturan(e)}
                      // onSearch={onSearch}
                      onChange={(e) => onAturan(e)}
                      placeholder="Ketik Aturan Pakai"
                      filterOption={(inputValue, option) =>
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
                render={(items) => <span>{items.qtyBarang}</span>}
              />
              <Column
                title="Satuan"
                key="reg"
                width="50px"
                render={(items) => <span>{items.satuan}</span>}
              />
              <Column
                title="Aturan"
                key="reg"
                width="80px"
                render={(items) => <span>{items.kodeATrPK}</span>}
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
                      cancelText="Ora"
                    >
                      <Button danger size="small">
                        Hapus
                      </Button>
                    </Popconfirm>
                  </span>
                )}
              />
            </Table>
          </Card>

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
            <Button
              type="primary"
              onClick={() =>
                unitorder === ""
                  ? message.warning("Pilih apotik terlebih dahulu!")
                  : setFormRacikan(true)
              }
            >
              Tambah Racikan
            </Button>
            <Row>
              <Col style={{ textAlign: "right" }} span={24}>
                <Button htmlType="submit" type="primary" onClick={simpanOrder}>
                  Simpan
                </Button>
              </Col>
            </Row>
          </Card>
        </Col>

        <Col span={spanRiwayat ? 10 : 0}>
          <Card
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
            <RiwayatOrderRI />
          </Card>
        </Col>
      </Row>

      {/* Form Tambah Racikan */}
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
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Form Racikan
          </div>
        }
        visible={formRacikan}
        // onOk={simpan}
        onCancel={() => setFormRacikan(false)}
        width="1000px"
        footer={null}
        destroyOnClose={true}
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
        <Form name="Obat Racik" initialValues={{ remember: true }}>
          <Row gutter={[8, 2]}>
            <Col span={4} xs={24} sm={20} md={10} lg={10} xl={10}>
              Jenis Racikan :{" "}
              <Form.Item>
                <Select
                  dataSource={jnsracikan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Racikan"
                  optionFilterProp="children"
                  onChange={(e) => onRacikan(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {jnsracikan.map((p) => (
                    <Option key={p.Deskripsi}>{p.Deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} xs={24} sm={4} md={3} lg={3} xl={3}>
              Quantity :
              <Form.Item rules={[{ required: true }]}>
                <InputNumber
                  step="0.1"
                  min={1}
                  value={jumlahRacikan}
                  style={{ width: "100%" }}
                  onChange={(e) => setJumlahRacikan(e)}
                />
              </Form.Item>
            </Col>
            <Col span={24} xs={12} sm={7} md={7} lg={7} xl={7}>
              Aturan :
              <Form.Item rules={[{ required: true }]}>
                <AutoComplete
                  options={aturanpakai}
                  onSelect={(e) => setAturanRacikan(e)}
                  // onSearch={onSearch}
                  onChange={(e) => setAturanRacikan(e)}
                  placeholder="Ketik Aturan Pakai"
                  filterOption={(inputValue, option) =>
                    option.value
                      .toUpperCase()
                      .indexOf(inputValue.toUpperCase()) !== -1
                  }
                />
              </Form.Item>
            </Col>
            <Col
              span={24}
              xs={24}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              style={{ display: "flex", alignItems: "end" }}
            >
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={() => addHeaderRacikan()}
                >
                  Tambah
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          dataSource={headerRacikan}
          columns={columnHeaderRacikan}
          size="small"
        />
      </Modal>

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
        onCancel={handleCancel}
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

      {/* Riwayat Obat */}
      <Drawer
        title="Riwayat Resep Obat"
        placement="right"
        closable={false}
        onClose={onClose}
        visible={visible}
        width={550}
      >
        <RiwayatOrderRI />
      </Drawer>
    </div>
  );
};

export default FormResepDokterRI;
