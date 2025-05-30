import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Select,
  Form,
  Button,
  Table,
  Card,
  Empty,
  DatePicker,
  Input,
  Space,
  Modal,
  Typography,
} from "antd";
import {
  CloseCircleTwoTone,
  EditTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
// import { MasterBarangContext } from '../../master/context/MasterBarangContext';
import Column from "antd/lib/table/Column";
import { OrderPenunjangRIContext } from "../context/OrderPenunjangRIContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
const { Option } = Select;
const { Text } = Typography;

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const formItemLayout2 = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const { TextArea } = Input;
const FormOrderMakanRI = () => {
  const {
    listmstDiet,
    setlistmstDiet,
    listmstjnsMakan,
    setlistmstjnsMakan,
    getMstDiet,
    getMstJnsMakan,
    keteranganOrder,
    setketeranganOrder,
    dietOrder,
    setdietOrder,
    jnsmakanOrder,
    setjnsmakanOrder,
    tglmakanOrder,
    settglmakanOrder,
    wktmakanOrder,
    setwktmakanOrder,
    noMakan,
    setnoMakan,
    insertOrderMakan,
    getOrderMakan,
    listOrderMakan,
    setlistOrderMakan,
    formOrder,
    setFormOrder,
  } = useContext(OrderPenunjangRIContext);
  const [disabled, setDisabled] = useState(true);

  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  const dataorder = {
    nomkn: noMakan,
    noreg: curpasRI.registrasiId,
    nokamar: null,
    nott: null,
    kdgrptrf: curpasRI.kelasRawatId,
    tglorder: dayjs(tglmakanOrder).format("YYYY-MM-DD"),
    waktu: wktmakanOrder,
    harga: null,
    kodemkn: jnsmakanOrder,
    jnsmakanan: null,
    kddiet: dietOrder.split("-").shift(),
    keterangan: keteranganOrder,
    uslognm: namauser,
    kodebagian: null,
    notrxpmr: null,
    stskirim: null,
    nolantai: null,
    stsorder: null,
    stsbayar: null,
    tglvalid: null,
    tglterima: null,
    flagbatal: null,
    jnsorder: null,
    printorder: null,
  };
  const columns = [
    {
      title: "No",
      key: "reg",
      className: "tabeltabel2",
      width: "5%",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tanggal",
      width: "10%",
      render: (listOrderMakan) => (
        <span>{dayjs(listOrderMakan.TanggalOrder).format("DD-MM-YYYY")}</span>
      ),
    },
    {
      width: "10%",
      title: "Waktu",
      render: (listOrderMakan) => (
        <span>
          {listOrderMakan.Waktu.trim() === "P"
            ? "Pagi"
            : listOrderMakan.Waktu.trim() === "S"
            ? "Siang"
            : listOrderMakan.Waktu.trim() === "M"
            ? "Malam"
            : ""}
          <br></br>
          {listOrderMakan.NamaHidangan}
        </span>
      ),
    },
    {
      width: "30%",
      title: "Diet",
      dataIndex: "NamaDiet",
    },
    {
      width: "30%",
      title: "Keterangan",
      dataIndex: "Keterangan",
    },
    {
      width: "15%",
      title: "User",
      dataIndex: "UserId",
    },
  ];

  return (
    <div>
      <Modal
        style={{ top: 5 }}
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
            Tambah Order Makan
          </div>
        }
        // title="Tambah Order Penunjang"
        visible={formOrder}
        onOk={() => {}}
        onCancel={() => {
          setFormOrder(false);
          setnoMakan(0);
          settglmakanOrder(dayjs());
          setwktmakanOrder("");
          setdietOrder("");
          setketeranganOrder("");
          setjnsmakanOrder("");
        }}
        width="1000px"
        footer={[
          <Button
            key="back"
            onClick={() => {
              setFormOrder(false);
              setnoMakan(0);
              settglmakanOrder(dayjs());
              setwktmakanOrder("");
              setdietOrder("");
              setketeranganOrder("");
              setjnsmakanOrder("");
            }}
          >
            Kembali
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={() => {
              console.log(dataorder);
              insertOrderMakan(dataorder);
            }}
          >
            Simpan
          </Button>,
        ]}
      >
        <Form>
          <Row gutter={[5, 5]}>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={{ width: "100%", marginBottom: 5 }}
                label="Tanggal"
              >
                <DatePicker
                  value={tglmakanOrder}
                  format="DD-MM-YYYY"
                  onChange={(e) => {
                    settglmakanOrder(e);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout}
                style={{ width: "100%", marginBottom: 5 }}
                label="Waktu"
              >
                <Select
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  onChange={(e) => setwktmakanOrder(e)}
                  value={wktmakanOrder}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option key="P">Pagi</Option>
                  <Option key="S">Siang</Option>
                  <Option key="M">Malam</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayout2}
                style={{ width: "100%", marginBottom: 5 }}
                label="Diet"
              >
                <Select
                  dataSource={listmstDiet}
                  showSearch
                  placeholder="..."
                  style={{ width: "100%" }}
                  optionFilterProp="children"
                  onChange={(e) => {
                    setdietOrder(e);
                    setketeranganOrder(e.split("-").pop());
                  }}
                  value={dietOrder}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listmstDiet.map((d) => (
                    <Option key={d.DietId + "-" + d.NamaDiet}>
                      {d.NamaDiet}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout2}
                style={{ width: "100%", marginBottom: 5 }}
                label="Keterangan"
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="..."
                  value={keteranganOrder}
                  onChange={(e) => {
                    setketeranganOrder(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout2}
                style={{ width: "100%", marginBottom: 5 }}
                label="Jenis Makan"
              >
                <Select
                  dataSource={listmstjnsMakan}
                  showSearch
                  placeholder="..."
                  //   mode="multiple"
                  style={{ width: "100%" }}
                  optionFilterProp="children"
                  onChange={(e) => {
                    setjnsmakanOrder(e);
                    // setketeranganOrder(e.split("-").pop());
                  }}
                  value={jnsmakanOrder}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listmstjnsMakan.map((d) => (
                    <Option key={d.JenisMakanId}>{d.JenisMakan}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      <Card
        title="List Order Makan"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={
          <Button
            icon={<PlusOutlined />}
            size="small"
            type="primary"
            onClick={() => {
              getMstDiet("%20");
              getMstJnsMakan("%20");
              setFormOrder(true);
            }}
          >
            Tambah Order
          </Button>
        }
      >
        <Table
          bordered
          locale={{ emptyText: <Empty description="Data Barang Kosong" /> }}
          pagination={{ pageSize: 20 }}
          dataSource={listOrderMakan}
          size="small"
          columns={columns}
        />
      </Card>
    </div>
  );
};

export default FormOrderMakanRI;
