import React, { useContext } from "react";
import HdContext from "../../../HdContext";
import {
  Card,
  Col,
  Row,
  Form,
  TimePicker,
  InputNumber,
  Input,
  Button,
  Table,
  Space,
  Select,
  Tooltip,
  message,
  Modal,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const format = "HH:mm";
const { TextArea } = Input;
const { Option } = Select;

const { PasiensContext } = HdContext;

function IntraHd() {
  const props = useContext(PasiensContext);

  const columns = [
    {
      title: "Jam",
      dataIndex: "jam",
      key: "jam",
      width: "50px",
      render: (text) => <span>{dayjs(text).format("HH:mm")}</span>,
    },
    {
      title: "QB",
      dataIndex: "qb",
      key: "qb",
      width: "50px",
    },
    {
      title: "VP",
      dataIndex: "vp",
      key: "vp",
      width: "50px",
    },
    {
      title: "TMP",
      dataIndex: "tmp",
      key: "tmp",
      width: "50px",
    },
    {
      title: "UF Rate",
      dataIndex: "ufRate",
      key: "ufRate",
      width: "75px",
    },
    {
      title: "Remv",
      dataIndex: "remv",
      key: "remv",
      width: "50px",
    },
    {
      title: "Catatan",
      dataIndex: "catatan",
      key: "catatan",
    },
    {
      title: "Aksi",
      key: "catatan",
      width: "50px",
      render: (text, record, index) => (
        <Space>
          <Button
            type="link"
            onClick={() => props.klikEditMonHd(index)}
            size="small"
          >
            <EditOutlined />
          </Button>
          <Button
            type="link"
            onClick={() => props.klikDelMonHd(index)}
            size="small"
          >
            <DeleteOutlined />
          </Button>
        </Space>
      ),
    },
  ];

  const children = [];
  for (let i = 10; i < 36; i++) {
    children.push(
      <Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>
    );
  }

  const klikSimpan = () => {
    // console.log(props.dialisisHeaderId);
    !props.dialisisHeaderId
      ? Modal.warning({
        title: "Peringatan!",
        content: "DialisisHeaderId kosong! Klik OK untuk merefresh data.",
        onOk: () => {
          props.getDataPasien(props.noOrder);
        },
      })
      : !props.durasi
        ? Modal.warning({ title: "Peringatan!", content: "Durasi masih kosong!" })
        : // props.waktuTarget <= props.waktuMulai ? message.warning("Waktu Target masih salah!") :
        props.waktuSelesai <= props.waktuMulai
          ? Modal.warning({
            title: "Peringatan!",
            content: "Waktu Selesai masih salah!",
          })
          : // props.waktuSelesai < props.waktuTarget ? message.warning("Waktu Selesai masih salah!") :
          // !props.ktv ? message.warning("Kt/V masih kosong!") :
          // props.ktv !== props.ktv3 ? message.warning("Kt/V tidak sama dengan assesment awal!") :
          props.userEntry && props.user !== props.userEntry
            ? Modal.warning({
              title: "Peringatan!",
              content: "User Anda dan User Entry berbeda, tidak bisa simpan!",
            })
            : props.klikIntraHd();
  };

  return (
    <div>
      <Card
        title="Intra HD"
        size="small"
        loading={props.spinIntHd}
        headStyle={{ backgroundColor: "#87e8de" }}
        style={{
          marginBottom: "5px",
          width: "100%",
        }}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          labelAlign="left"
        >
          <Row style={{ marginBottom: "5px" }}>
            <Col span={12}>
              <Card
                style={{
                  marginBottom: "8px",
                  backgroundColor: "#e6fffb",
                  width: "99%",
                  margin: "auto",
                  height: "290px",
                }}
              >
                <Tooltip title="Mengikuti waktu pendaftaran HD + 30 menit">
                  <Form.Item
                    label="Waktu Mulai"
                    style={{ marginBottom: "0px" }}
                  >
                    <TimePicker
                      // defaultValue={dayjs("12:08", format)}
                      value={props.waktuMulai}
                      disabled
                      // onChange={props.changeWaktuMulai}
                      format={format}
                      size="small"
                    />
                  </Form.Item>
                </Tooltip>

                <Tooltip title="Waktu mulai dikalkulasi dengan Durasi">
                  <Form.Item
                    label="Waktu Selesai (target)"
                    style={{ marginBottom: "0px" }}
                  >
                    <TimePicker
                      // defaultValue={dayjs("12:08", format)}
                      value={props.waktuTarget}
                      format={format}
                      disabled
                      size="small"
                    />
                  </Form.Item>
                </Tooltip>

                <Tooltip title="Tidak bisa dirubah setelah simpan Post HD">
                  <Form.Item
                    label="Waktu Selesai (real)"
                    style={{ marginBottom: "0px" }}
                  >
                    <TimePicker
                      // defaultValue={dayjs("12:08", format)}
                      value={props.waktuSelesai}
                      onChange={props.changeWaktuSelesai}
                      format={format}
                      disabled={props.disabledWaktuSelesai}
                      size="small"
                    />
                  </Form.Item>
                </Tooltip>

                <Form.Item label="Kt/V" style={{ marginBottom: "0px" }}>
                  <InputNumber
                    value={props.ktv3}
                    // onChange={props.changeKtv}
                    size="small"
                    min={0}
                    defaultValue={0}
                  />
                </Form.Item>

                <Form.Item label="UF Goal" style={{ marginBottom: "0px" }}>
                  <InputNumber
                    value={props.ufGoal}
                    // onChange={props.changeBbKering}
                    readOnly
                    size="small"
                    min={0}
                    defaultValue={0}
                  />
                </Form.Item>

                <Form.Item label="UF Rate" style={{ marginBottom: "0px" }}>
                  <InputNumber
                    value={props.uf1}
                    // onChange={props.changeBbKering}
                    readOnly
                    size="small"
                    min={0}
                    defaultValue={0}
                    style={{ width: "50px" }}
                  />
                  <span>&ensp;/&ensp;</span>
                  <InputNumber
                    value={props.uf2}
                    // onChange={props.changeBbKering}
                    readOnly
                    size="small"
                    min={0}
                    defaultValue={0}
                    style={{ width: "50px" }}
                  />
                  <span>&ensp;/&ensp;</span>
                  <InputNumber
                    value={props.uf3}
                    // onChange={props.changeBbKering}
                    readOnly
                    size="small"
                    min={0}
                    defaultValue={0}
                    style={{ width: "50px" }}
                  />
                  <span>&ensp;/&ensp;</span>
                  <InputNumber
                    value={props.uf4}
                    // onChange={props.changeBbKering}
                    readOnly
                    size="small"
                    min={0}
                    defaultValue={0}
                    style={{ width: "50px" }}
                  />
                  <span>&ensp;/&ensp;</span>
                  <InputNumber
                    value={props.uf5}
                    // onChange={props.changeBbKering}
                    readOnly
                    size="small"
                    min={0}
                    defaultValue={0}
                    style={{ width: "50px" }}
                  />
                </Form.Item>
              </Card>
            </Col>

            <Col span={12}>
              <Card
                title="Monitoring Dialisis"
                size="small"
                headStyle={{ backgroundColor: "#87e8de" }}
                style={{
                  marginBottom: "8px",
                  backgroundColor: "#e6fffb",
                  width: "99%",
                  margin: "auto",
                  height: "290px",
                }}
              >
                <Form.Item label="Jam" style={{ marginBottom: "0px" }}>
                  <TimePicker
                    // defaultValue={dayjs('12:08', format)}
                    value={props.jamDd}
                    onChange={props.changeJamDd}
                    format={format}
                    size="small"
                  />
                </Form.Item>

                <Form.Item
                  label="Kec.Aliran Darah (QB)"
                  style={{ marginBottom: "0px" }}
                >
                  <InputNumber
                    value={props.mQb}
                    onChange={(e) => props.setMQb(e)}
                    size="small"
                    min={0}
                    defaultValue={0}
                  />
                </Form.Item>

                <Form.Item label="VP" style={{ marginBottom: "0px" }}>
                  <InputNumber
                    value={props.vp}
                    onChange={props.changeVp}
                    size="small"
                    min={0}
                    defaultValue={0}
                  />
                </Form.Item>

                <Form.Item label="TMP" style={{ marginBottom: "0px" }}>
                  <InputNumber
                    value={props.tmp}
                    onChange={props.changeTmp}
                    size="small"
                    min={0}
                    defaultValue={0}
                  />
                </Form.Item>

                <Form.Item label="UF Rate" style={{ marginBottom: "0px" }}>
                  <InputNumber
                    value={props.ufRate}
                    onChange={props.changeUfRate}
                    size="small"
                    min={0}
                    defaultValue={0}
                  />
                </Form.Item>

                <Form.Item label="Remv" style={{ marginBottom: "0px" }}>
                  <InputNumber
                    value={props.remv}
                    onChange={props.changeRemv}
                    size="small"
                    min={0}
                    defaultValue={0}
                  />
                </Form.Item>

                <Form.Item label="Catatan" style={{ marginBottom: "5px" }}>
                  <Input
                    value={props.catatan}
                    onChange={props.changeCatatan}
                    maxLength={100}
                    placeholder="catatan..."
                    size="small"
                  />
                </Form.Item>

                <Button
                  type="primary"
                  onClick={props.klikMonHd}
                  disabled={props.btnIntraHd}
                  style={{ float: "right" }}
                >
                  Simpan
                </Button>
              </Card>
            </Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={24}>
              <Card
                style={{
                  marginBottom: "8px",
                  backgroundColor: "#e6fffb",
                  width: "100%",
                  margin: "auto",
                }}
              >
                <Table
                  dataSource={props.dialisisDetail}
                  columns={columns}
                  pagination={false}
                  size="small"
                />
              </Card>
            </Col>
          </Row>

          <Button
            type="primary"
            onClick={() => klikSimpan()}
            disabled={props.btnKeluhan}
            loading={props.spinIntHd}
            style={{
              float: "right",
            }}
          >
            Simpan Intra HD
          </Button>
          {/* <Button
                        type="primary"
                        onClick={() => props.setDialisisHeaderId('')}>
                        Rst DialId
                    </Button> */}
        </Form>
      </Card>
    </div>
  );
}

export default IntraHd;
