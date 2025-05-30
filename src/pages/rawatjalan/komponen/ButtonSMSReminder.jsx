import {
  Button,
  Col,
  DatePicker,
  Empty,
  Form,
  Input,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
  Tooltip,
} from "antd";
import axios from "axios";
import React, { useContext, useState } from "react";
import { PasienContext } from "../context/PasienContext";
import dayjs from "dayjs";
import { LoginContext } from "../context";
import { ReminderContext } from "../context/ReminderContext";
import { VClaimContext } from "../context/VClaimContext";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { PelayananContext } from "../context/Pelayanancontext";
const { Option } = Select;
const { Column } = Table;

const ButtonSMSReminder = () => {
  const { curpas } = useContext(PasienContext);
  const { namauser } = useContext(LoginContext);
  const { cttnrujukan } = useContext(ReminderContext);
  const { dataSEP, getExpiredRujukan } = useContext(VClaimContext);
  const { dokter } = useContext(PelayananContext);

  function disabledDate(current) {
    // Can not select days before today and today
    return current && current > dayjs(dataSEP);
  }

  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  const [modal, setModal] = useState(false);
  const [reminder, setReminder] = useState([]);
  const [dokterkontrol, setDokterKontrol] = useState(null);
  const [tglrujukan, setTglRujukan] = useState(false);
  const [buttonorder, setButtonOrder] = useState("KONTROL");

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };

  const insertReminder = (datareminder) => {
    axios
      .post(`${apiku}/SmsReminder`, datareminder, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          console.log(res.data.result);
          Modal.success({ content: "Berhasil Menyimpan Reminder !" });
        } else {
          console.log(res.data);
          Modal.warning({ content: res.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
        Modal.error({ title: "Gagal Disimpan!", content: err.response });
      });
  };

  const detailReminder = (id) => {
    axios
      .get(`${apiku}/SmsReminder/Read/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setReminder(res.data.result);
        } else {
          setReminder([]);
        }
      })
      .catch((err) => {
        setReminder([]);
        console.log(err);
        Modal.error({ content: "Gagal Mengambil!" });
      });
  };

  const deleteReminder = (id) => {
    axios
      .delete(`http://182.168.7.251:5577/SmsReminder/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          Modal.success({ content: "Berhasil Dibatal!" });
        } else {
          Modal.warning({ content: res.data.message });
        }
      })
      .catch((err) => {
        console.log(err);
        Modal.error({ content: "Gagal Dibatal!" });
      });
  };

  const datareminder = {
    registrasiId: curpas.registrasiId,
    pasienId: curpas.pasienId,
    ruangId: curpas.ruangId,
    tglKontrol: dayjs(tglrujukan).format("YYYY-MM-DD"),
    kodeTindakan: buttonorder,
    nomorPeserta: curpas.noPolish,
    catatan: cttnrujukan,
    noTelpon: curpas.noTelephone,
    userId: namauser,
    clientHost: host,
    clientIp: ip,
  };

  function handleChange(value) {
    console.log(`selected ${value}`);
    setButtonOrder(value);
  }

  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setModal(true);
          detailReminder(curpas.registrasiId);
        }}
      >
        Reminder
      </Button>
      <Modal
        title="SMS Reminder"
        width={700}
        open={modal}
        onCancel={() => setModal(false)}
      >
        <Form>
          <Form.Item
            {...formItemLayout}
            name="program"
            label="Program"
            labelAlign="left"
            style={{ marginBottom: 0 }}
          >
            <Select
              defaultValue="KONTROL"
              style={{ width: "100%" }}
              onChange={handleChange}
            >
              <Option value="KONTROL">Kontrol</Option>
              <Option value="OPERASI">Operasi</Option>
              <Option value="HEMODIALISA">Hemodialisa</Option>
              <Option value="RADIOTERAPI">Radioterapi</Option>
              <Option value="KEMOTERAPI">Kemoterapi</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Tanggal Kontrol"
            style={{ marginBottom: 0 }}
            labelAlign="left"
            required
          >
            <Input.Group compact>
              <Tooltip
                title={
                  "Rujukan Berlaku : " +
                  dayjs(dataSEP).diff(dayjs().format("YYYY-MM-DD"), "days") +
                  " hari lagi"
                }
              >
                <DatePicker
                  style={{ width: "calc(100% - 55px)" }}
                  format={"YYYY-MM-DD"}
                  onFocus={() => getExpiredRujukan(curpas.noJaminan)}
                  disabledDate={dataSEP === "" ? false : disabledDate}
                  onChange={(date, dateString) => setTglRujukan(date)}
                />
              </Tooltip>
              <Tooltip
                title={
                  "Klik refresh jika exp tanggal kontrol belum sesuai dengan masa berlaku rujukan"
                }
              >
                <Button
                  type="primary"
                  onClick={() => {
                    getExpiredRujukan(curpas.noJaminan);
                  }}
                >
                  <CloudDownloadOutlined />
                </Button>
              </Tooltip>
            </Input.Group>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Dokter"
            style={{ marginBottom: 0 }}
            required
            labelAlign="left"
          >
            <Select
              dataSource={dokter}
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Pelaksana"
              optionFilterProp="children"
              onChange={(e) => setDokterKontrol(e)}
              value={dokterkontrol === null ? curpas.dokterId : dokterkontrol}
              filterOption={(input, option) =>
                option.props.children
                  .toString()
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {dokter.map((p) => (
                <Option key={p.DokterId}>
                  {p.DokterId} - {p.NamaDokter}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                onClick={() => insertReminder(datareminder)}
              >
                Kirim Reminder
              </Button>
            </Col>
          </Row>
        </Form>
        <Table
          dataSource={reminder}
          size="small"
          rowKey="reg"
          scroll={{ y: 470 }}
          pagination={false}
          bordered
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"Pasien tidak memiliki reminder"}
              />
            ),
          }}
        >
          <Column
            title="ID"
            dataIndex="noEntry"
            className="bgcolor fontkecil"
          />
          <Column title="Reg" dataIndex="registrasiId" />
          <Column title="No. Hp" dataIndex="noTelpon" />
          <Column
            title="Tanggal"
            dataIndex="tglKontrol"
            render={(text) => {
              const formattedDate = dayjs(text).format("DD-MM-YYYY");
              return formattedDate;
            }}
          />
          <Column title="Program" dataIndex="kodeTindakan" />
          <Column
            title="Action"
            width="100px"
            render={(index, record, text) => {
              return record.statusBatal ? (
                <Button size="small" disabled>
                  Sudah Dibatal
                </Button>
              ) : (
                <Popconfirm
                  title="Anda Yakin Dihapus ?"
                  onConfirm={(e) => deleteReminder(record.noEntry)}
                  okText="Ya"
                  cancelText="Tidak"
                >
                  <Button type="primary" danger size="small">
                    Batal
                  </Button>
                </Popconfirm>
              );
            }}
          />
          <Column title="User" dataIndex="userId" />
        </Table>
      </Modal>
    </div>
  );
};

export default ButtonSMSReminder;
