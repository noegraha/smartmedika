import {
  Button,
  Card,
  Checkbox,
  DatePicker,
  Divider,
  Empty,
  Form,
  Input,
  Popconfirm,
  Popover,
  Select,
  Space,
  Table,
  Tooltip,
  Typography,
  message,
} from "antd";
import React, { useContext, useState } from "react";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import axios from "axios";
import { PelayananContext } from "../rawatjalan/context/Pelayanancontext";
import dayjs from "dayjs";
import {
  DeleteTwoTone,
  EditTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
const { Option } = Select;
const { Text } = Typography;
const { Column } = Table;
const InsertBill = () => {
  const { pembayaran, getPembayaran } = useContext(PasienContext);
  const { dokterall } = useContext(PelayananContext);
  const [detPas, setDetPas] = useState([]);
  const [billing, setBilling] = useState([]);
  const [pelayanan, setPelayanan] = useState([]);
  const [noreg, setNoreg] = useState(null);
  const [ruang, setRuang] = useState(null);
  const [unit, setUnit] = useState([]);
  const [pel, setPel] = useState(null);
  const [pem, setPem] = useState(null);
  const [detpel, setDetpel] = useState("");
  const [tanggal, setTanggal] = useState(dayjs());
  const [dokter, setDokter] = useState(null);
  const [keterangan, setKeterangan] = useState(null);
  const [user, setUser] = useState(null);
  const [client, setClient] = useState(null);
  const [ip, setIP] = useState(null);
  const [load, setLoad] = useState(false);

  const databill = {
    billPmr: {
      registrasiId: noreg,
      ruangId: ruang,
      pelayananId: pel,
      pembayaranId: pem,
      dokterPemeriksaId: dokter,
      kdgrptrf: "3",
      jmlPelayanan: 1,
      biayaPelayanan: parseInt(Number(detpel.total).toFixed(2)),
      tglPelayanan: tanggal,
      userId: user,
      clientHost: client,
      clientIp: ip,
    },
    keterangan: keterangan,
  };

  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const onPelayanan = (e) => {
    setPel(e);
    detailPelayanan(e);
  };

  const detailPasien = (noreg) => {
    axios
      .get(`${apiku}/EmrPasienAktif/read/datapasien/${noreg}`, options)
      .then((res) => {
        setDetPas(res.data.result.kelasRawatId);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailPelayanan = (id, kelas) => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/ID/${id}/3`, options)
      .then((res) => {
        setDetpel(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const detailBilling = (id) => {
    setLoad(true);
    axios
      .get(`${apiku}/BillPemeriksaan/Read/${id}/1/10`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBilling(res.data.result);
        } else {
          message.warning(res.data.message);
          setBilling([]);
        }
      })
      .catch((err) => {
        setBilling([]);
      })
      .finally(() => setLoad(false));
  };

  const loadPelayanan = (ruang) => {
    axios
      .get(`${apiku}/MstStandarPelayananRuang/Read/${ruang}/1/200`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPelayanan(res.data.result);
        } else {
          setPelayanan([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setPelayanan([]);
        console.log(err);
        message.error("Gagal mengambil data!");
      });
  };

  const loadRuang = (jenis) => {
    axios
      .get(`${apiku}/MstRuang/Lookup/%20/${jenis}/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setUnit(res.data.result);
        } else {
          setUnit([]);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        setUnit([]);
        console.log(err);
        message.error("Gagal mengambil data!");
      });
  };

  const insertBiiling = (databilling) => {
    axios
      .post(`${apiku}/BillPemeriksaan/Perbaikan`, databilling, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Disimpan!");
        } else {
          console.log(res.data);
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err.response);
        message.error("Gagal Disimpan!");
      })
      .finally(() => setLoad(false));
  };

  return (
    <div>
      <Card
        loading={load}
        size="small"
        title="Insert Billing"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          // size="small"
          labelAlign="left"
        >
          <Form.Item
            label="No Registrasi"
            name="noreg"
            style={{ marginBottom: 0 }}
          >
            <Space.Compact style={{ width: "100%" }}>
              <Input
                placeholder="No Registrasi"
                onChange={(e) => setNoreg(e.target.value)}
                onPressEnter={(e) => {
                  detailBilling(e.target.value);
                  detailPasien(e.target.value);
                }}
                value={noreg}
              />
              <Button type="primary" onClick={(e) => detailBilling(noreg)}>
                Ambil
              </Button>
            </Space.Compact>
          </Form.Item>
          <Form.Item label="Tanggal" name="tanggal" style={{ marginBottom: 0 }}>
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Pilih Tanggal"
              format={"YYYY-MM-DD"}
              onChange={(date, dateString) => setTanggal(dateString)}
              value={tanggal}
            />
          </Form.Item>
          <Form.Item
            label="Grup Ruang"
            name="grupruang"
            style={{ marginBottom: 0 }}
          >
            <Select
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Jenis Ruang..."
              optionFilterProp="children"
              onChange={(e) => {
                loadRuang(e);
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option key={"1"}>Rawat Inap</Option>
              <Option key={"2"}>Rawat Jalan</Option>
              <Option key={"3"}>IGD</Option>
              <Option key={"4"}>Penunjang Medis</Option>
              <Option key={"5"}>Penunjang Non Medis</Option>
              <Option key={"7"}>Apotik Farmasi</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Ruang" name="ruang" style={{ marginBottom: 0 }}>
            <Select
              dataSource={unit}
              value={ruang}
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Ruang..."
              optionFilterProp="children"
              onChange={(e) => {
                setRuang(e);
                loadPelayanan(e);
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {unit.map((d) => (
                <Option
                  key={d.ruangId}
                  className={
                    d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""
                  }
                >
                  {d.ruangId + " - " + d.deskripsi}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Pelayanan"
            name="pelayanan"
            style={{ marginBottom: 0 }}
          >
            <Select
              dataSource={pelayanan}
              showSearch
              value={pel}
              style={{ width: "100%" }}
              placeholder="Pilih Pelayanan..."
              optionFilterProp="children"
              onChange={(e) => onPelayanan(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {pelayanan.map((d) => (
                <Option key={d.pelayananId}>
                  {d.pelayananId + " - " + d.deskripsi}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Pembayaran"
            name="pembayaran"
            style={{ marginBottom: 0 }}
          >
            <Select
              dataSource={pembayaran}
              showSearch
              value={pem}
              style={{ width: "100%" }}
              placeholder="Pilih Pembayaran..."
              optionFilterProp="children"
              onFocus={() => getPembayaran()}
              onChange={(e) => setPem(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {pembayaran.map((d) => (
                <Option key={d.pembayaranId}>
                  {d.pembayaranId + " - " + d.deskripsi}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Pelaksana"
            name="pelaksana"
            style={{ marginBottom: 0 }}
          >
            <Select
              dataSource={dokterall}
              showSearch
              value={dokter}
              style={{ width: "100%" }}
              placeholder="Pilih Pelaksana..."
              optionFilterProp="children"
              onChange={(e) => setDokter(e)}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {dokterall.map((p) => (
                <Option key={p.dokterId}>
                  {p.dokterId + " - " + p.namaDokter}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="User" name="user" style={{ marginBottom: 0 }}>
            <Input
              placeholder="User"
              onChange={(e) => setUser(e.target.value)}
              value={user}
            />
          </Form.Item>
          <Form.Item
            label="Client Name"
            name="clientname"
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder="Client Name"
              onChange={(e) => setClient(e.target.value)}
              value={client}
            />
          </Form.Item>
          <Form.Item
            label="Client IP"
            name="clientip"
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder="Client IP"
              onChange={(e) => setIP(e.target.value)}
              value={ip}
            />
          </Form.Item>
          <Form.Item
            label="Keterangan"
            name="keterangan"
            style={{ marginBottom: 0 }}
          >
            <Input
              placeholder="Keterangan"
              onChange={(e) => setKeterangan(e.target.value)}
              value={keterangan}
            />
          </Form.Item>
          <Form.Item
            label="Biaya Pelayanan"
            name="biaya"
            style={{ marginBottom: 0 }}
          >
            <Input value={1000} />
          </Form.Item>
        </Form>

        <Button
          type="primary"
          onClick={() => {
            console.log(databill);
            insertBiiling(databill);
            setLoad(true);
          }}
          block
          // size="small"
        >
          Insert
        </Button>
        <Divider />
        <Table
          locale={{ emptyText: <Empty description={false} /> }}
          bordered
          pagination={false}
          dataSource={billing}
          size="small"
          rowKey="reg"
          scroll={{ x: 1000 }}
          summary={(pageData) => {
            let total = 0;
            pageData.forEach(({ biayaPelayanan }) => {
              total += biayaPelayanan;
            });
            return (
              <>
                <tr>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th></th>
                  <th>Total</th>
                  <td className="column-money, tabeltabel" align="right">
                    <Text type="danger">
                      <div className="salary-cell">
                        <span className="currency">Rp.</span>
                        <span className="amount">
                          {Intl.NumberFormat("id", {
                            style: "currency",
                            currency: "IDR",
                            maximumFractionDigits: 2,
                          })
                            .format(total)
                            .replace("Rp", "")}
                        </span>
                      </div>
                    </Text>
                  </td>
                </tr>
              </>
            );
          }}
        >
          <Column
            style={{ verticalAlign: "top" }}
            title="No."
            key="reg"
            className="tabeltabel"
            render={(text, record, index) => <span>{index + 1}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Kode"
            className="bgcolortunggu, tabeltabel2"
            render={(billing) => <span>{billing.pelayananId}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Unit"
            className="tabeltabel"
            render={(billing) => <span>{billing.ruangDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Tanggal"
            className="tabeltabel"
            render={(billing) => <span>{billing.tanggal}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Pelayanan"
            className="tabeltabel"
            render={(billing) => <span>{billing.pelayananDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Jumlah"
            className="column-money, tabeltabel"
            render={(billing) => <span>{billing.jumlah}</span>}
            align="right"
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Biaya Pelayanan"
            className="auto-width"
            render={(billing) => (
              <div className="salary-cell">
                <span className="currency">Rp.</span>
                <span className="amount">
                  {Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 2,
                  })
                    .format(billing.harga)
                    .replace("Rp", "")}
                </span>
              </div>
            )}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Total Biaya"
            className="auto-width"
            render={(billing) => (
              <div className="salary-cell">
                <span className="currency">Rp.</span>
                <span className="amount">
                  {Intl.NumberFormat("id", {
                    style: "currency",
                    currency: "IDR",
                    maximumFractionDigits: 2,
                  })
                    .format(billing.biayaPelayanan)
                    .replace("Rp", "")}
                </span>
              </div>
            )}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Penjamin"
            className="tabeltabel"
            render={(billing) => <span>{billing.pembayaranDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Pemeriksa"
            className="tabeltabel"
            // width="250px"
            render={(billing) => <span>{billing.pemeriksaDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="No Bayar"
            className="tabeltabel"
            render={(billing) => <span>{billing.noPembayaran}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="User"
            className="tabeltabel"
            render={(billing) => <span>{billing.userId}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Action"
            className="tabeltabel"
            render={(billing) => (
              <Space>
                <Tooltip title="Hapus">
                  <Popconfirm
                    title="Anda Yakin Dihapus ?"
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button
                      size="small"
                      type="text"
                      shape="circle"
                      icon={<DeleteTwoTone twoToneColor="#f5222d" />}
                    />
                  </Popconfirm>
                </Tooltip>
                <Tooltip title="Edit">
                  <Button
                    size="small"
                    type="text"
                    shape="circle"
                    icon={<EditTwoTone twoToneColor="#52c41a" />}
                  />
                </Tooltip>
              </Space>
            )}
          />

          <Column
            style={{ verticalAlign: "top" }}
            title={
              <>
                Sinkron KHS{" "}
                <Popover
                  placement="topLeft"
                  title="Status Sinkron"
                  content={
                    <div>
                      <Checkbox checked={false} /> Transaksi Belum ada di Data
                      KHS, silahkan klik tombol uncheck.
                      <br />
                      <Checkbox checked={true} /> Transaksi sudah ada di data
                      KHS dan Smartmedika
                    </div>
                  }
                  // arrow="center"
                >
                  <QuestionCircleTwoTone />
                </Popover>
              </>
            }
            className="tabeltabel"
            render={(billing) => (
              <span>
                {billing.IsSync !== null ? (
                  <Checkbox
                    checked={true}
                    onClick={() => message.info("Sudah sinkron!")}
                  />
                ) : (
                  <Checkbox checked={false} />
                )}
              </span>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default InsertBill;
