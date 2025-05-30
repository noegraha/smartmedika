import React, { useContext, Fragment } from "react";
import {
  Table,
  Typography,
  Select,
  Button,
  Form,
  Input,
  Popconfirm,
  message,
  Row,
  Col,
  Empty,
  InputNumber,
  Card,
  Modal,
  Checkbox,
  Popover,
  DatePicker,
} from "antd";
import { BillingContext } from "../context/BillingContext";
import { PelayananContext } from "../context/Pelayanancontext";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context/LoginContext";
import dayjs from "dayjs";
import { useState } from "react";
import { UserContext } from "../../appsetting/UserContext";
import { QuestionCircleTwoTone } from "@ant-design/icons";

const { Text } = Typography;
const { Column } = Table;
const { Option } = Select;

const FormTransaksiRJRI = () => {
  const {
    billing,
    insertBiiling,
    pel,
    setPelayanan,
    pemeriksa,
    setPemeriksa,
    jumlah,
    setJumlah,
    loadingBilling,
    deleteBillingById,
    syncBillingByIdPoli,
  } = useContext(BillingContext);
  const { pelayanan, detpel, detailPelayanan, dokterall, loadPelayanan } =
    useContext(PelayananContext);
  const {
    curpas,
    ruangasal,
    poli,
    poli2,
    layout,
    setPoli2,
    setRuangasal,
    setPoli1,
  } = useContext(PasienContext);
  const { namauser, loadingPoli } = useContext(LoginContext);
  const { menuMaster } = useContext(UserContext);
  const [modaledit, setModalEdit] = useState(false);
  const [ruang, setRuang] = useState(null);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  const d = new Date();
  let day = d.getDay();

  const handleCari = (e) => {
    setPoli1(e.split("+").shift());
    setPoli2(e);
    setPelayanan([]);
    loadPelayanan(e.split("+").shift(), day + 1);
    setRuangasal(e.split("+").shift());
    console.log(e.split("+").shift());
    sessionStorage.setItem("ruangan", e.split("+").shift());
    sessionStorage.setItem("RSMana", e.split("- ").pop());
    // setOpen(true);
  };

  const [nama, setNama] = useState(namauser);
  const [tanggal, setTanggal] = useState(dayjs());

  const billpelayanan = {
    registrasiId: curpas.registrasiId,
    ruangId: ruangasal,
    pelayananId: pel,
    pembayaranId: curpas.pembayaranId,
    dokterPemeriksaId: pemeriksa === null ? curpas.dokterId : pemeriksa,
    tglPelayanan: tanggal,
    kdgrptrf: curpas.kelasRawatId,
    jmlPelayanan: parseInt(jumlah),
    biayaPelayanan: parseInt(Number(detpel.total).toFixed(2)),
    userId: nama,
    clientHost: host,
    clientIp: ip,
  };

  const simpanBill = () => {
    if (pel === null) {
      Modal.warning({ content: "Pelayanan masih kosong!" });
    } else {
      insertBiiling(billpelayanan);
      console.log(billpelayanan);
    }
  };
  const editBilling = () => {
    insertBiiling(billpelayanan);
    setModalEdit(false);
    console.log(billpelayanan);
  };
  const onPelayanan = (e) => {
    setPelayanan(e);
    detailPelayanan(e);
  };
  const onDelete = (noreg, pelayanan, dokter, ruang, id) => {
    deleteBillingById(noreg, id, namauser, ip);
  };
  const cancel = () => {
    message.warning("Batal Dihapus");
  };
  const [form] = Form.useForm();
  return (
    <Fragment>
      <Card
        title="Billing"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        loading={loadingBilling}
      >
        <Select
          autoFocus={true}
          loading={loadingPoli}
          value={poli2}
          dataSource={poli}
          showSearch
          style={{ width: "100%" }}
          placeholder="Pilih ruang..."
          optionFilterProp="children"
          onSelect={handleCari}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {poli.map((d) => (
            <Option
              key={d.ruangId + "+" + d.deskripsi}
              className={d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""}
            >
              {d.deskripsi}
            </Option>
          ))}
        </Select>
        <Form form={form} name="billing" onFinish={simpanBill}>
          <Row gutter={[8, 2]}>
            <Col span={4} xs={24} sm={20} md={20} lg={18} xl={13}>
              Pelayanan :{" "}
              <Form.Item style={{ marginBottom: 0 }}>
                <Select
                  dataSource={pelayanan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Pelayanan"
                  optionFilterProp="children"
                  onChange={(e) => onPelayanan(e)}
                  value={pel}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pelayanan.map((d) => (
                    <Option key={d.pelayananId}>
                      {d.pelayananId + "-" + d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} xs={24} sm={4} md={4} lg={6} xl={2}>
              <Form.Item style={{ marginBottom: 0 }}>
                Jumlah :{" "}
                <InputNumber
                  disabled
                  min={1}
                  max={10}
                  onChange={(e) => setJumlah(e)}
                  style={{ width: "100%" }}
                  value={jumlah}
                />
              </Form.Item>
            </Col>
            <Col span={4} xs={24} sm={6} md={6} lg={6} xl={3}>
              <Form.Item style={{ marginBottom: 0 }}>
                Biaya :{" "}
                <Input
                  disabled
                  style={{ width: "100%" }}
                  value={Number(detpel.total).toFixed(2)}
                />
              </Form.Item>
            </Col>
            <Col span={4} xs={24} sm={6} md={6} lg={6} xl={6}>
              <Form.Item style={{ marginBottom: 0 }}>
                Tanggal :{" "}
                <DatePicker
                  value={tanggal}
                  style={{ width: "100%" }}
                  onChange={(date, dateString) => setTanggal(date)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[8, 8]}>
            <Col span={4} xs={24} sm={20} md={20} lg={18} xl={13}>
              Pelaksana :{" "}
              <Form.Item style={{ marginBottom: 0 }}>
                <Select
                  dataSource={dokterall}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Pelaksana"
                  optionFilterProp="children"
                  onChange={(e) => setPemeriksa(e)}
                  value={pemeriksa === null ? curpas.dokterId : pemeriksa}
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
            <Col span={4} xs={24} sm={16} md={16} lg={16} xl={6}>
              User :{" "}
              <Form.Item style={{ marginBottom: 0 }}>
                <Input value={nama} onChange={(e) => setNama(e.target.value)} />
              </Form.Item>
            </Col>
            <Col
              span={24}
              xs={24}
              sm={2}
              md={2}
              lg={5}
              xl={5}
              style={{ display: "flex", alignItems: "end" }}
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  loading={loadingBilling}
                  type="primary"
                  htmlType="submit"
                  block
                >
                  Ambil
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
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
                  <td className="column-money, tabeltabel">
                    <Text type="danger">
                      Rp.{" "}
                      {total.toLocaleString("id-id", {
                        minimumFractionDigits: 2,
                      })}
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
            width="10px"
            render={(text, record, index) => <span>{index + 1}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Kode"
            className="bgcolortunggu, tabeltabel2"
            width="40px"
            render={(billing) => <span>{billing.pelayananId}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Unit"
            className="tabeltabel"
            width="180px"
            render={(billing) => <span>{billing.ruangDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Tanggal"
            className="tabeltabel"
            width="75px"
            render={(billing) => <span>{billing.tanggal}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Pelayanan"
            className="tabeltabel"
            width="400px"
            render={(billing) => <span>{billing.pelayananDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Jumlah"
            width="40px"
            className="column-money, tabeltabel"
            render={(billing) => <span>{billing.jumlah}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Biaya Pelayanan"
            width="100px"
            className="column-money, tabeltabel"
            render={(billing) => (
              <span>
                Rp.{" "}
                {billing.harga.toLocaleString("id-id", {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Total Biaya"
            width="100px"
            className="column-money, tabeltabel"
            render={(billing) => (
              <span>
                Rp.{" "}
                {parseInt(billing.biayaPelayanan).toLocaleString("id-id", {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Nama Penjamin"
            className="tabeltabel"
            width="150px"
            render={(billing) => <span>{billing.pembayaranDesk}</span>}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Pemeriksa"
            className="tabeltabel"
            width="250px"
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
          {menuMaster ? (
            <Column
              style={{ verticalAlign: "top" }}
              title="Action"
              className="tabeltabel"
              render={(billing) => (
                <span>
                  <Popconfirm
                    title="Anda Yakin Dihapus ?"
                    onConfirm={(e) =>
                      onDelete(
                        billing.registrasiId,
                        billing.pelayananId,
                        billing.pemeriksaId,
                        billing.ruangId,
                        billing.billPelayananId
                      )
                    }
                    onCancel={(e) => cancel(e)}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button size="small" danger type="primary">
                      Hapus
                    </Button>
                  </Popconfirm>
                  <Button
                    size="small"
                    onClick={() => {
                      setModalEdit(true);
                      onPelayanan(billing.pelayananId);
                      setJumlah(billing.jumlah);
                      setPemeriksa(billing.pemeriksaId);
                      setRuang(billing.ruangDesk);
                    }}
                  >
                    Edit
                  </Button>
                </span>
              )}
            />
          ) : (
            <Column
              style={{ verticalAlign: "top" }}
              title="Action"
              className="tabeltabel"
              render={(billing) => (
                <span>
                  {billing.tanggal === dayjs().format("DD-MM-YYYY") ? (
                    billing.noPembayaran === null ? (
                      billing.ruangId === ruangasal || menuMaster === true ? (
                        <div>
                          <Popconfirm
                            title="Anda Yakin Dihapus ?"
                            onConfirm={(e) =>
                              onDelete(
                                billing.registrasiId,
                                billing.pelayananId,
                                billing.pemeriksaId,
                                billing.ruangId,
                                billing.billPelayananId
                              )
                            }
                            onCancel={(e) => cancel(e)}
                            okText="Ya"
                            cancelText="Tidak"
                          >
                            <Button size="small" danger type="primary">
                              Hapus
                            </Button>
                          </Popconfirm>
                          {ruangasal === billing.ruangId ? (
                            <Button
                              size="small"
                              onClick={() => {
                                setModalEdit(true);
                                onPelayanan(billing.pelayananId);
                                setJumlah(billing.jumlah);
                                setPemeriksa(billing.pemeriksaId);
                                setRuang(billing.ruangDesk);
                              }}
                            >
                              Edit
                            </Button>
                          ) : (
                            <></>
                          )}
                        </div>
                      ) : (
                        <Button size="small" danger type="primary" disabled>
                          Hapus
                        </Button>
                      )
                    ) : (
                      <div>
                        <Button size="small" danger type="primary" disabled>
                          Hapus
                        </Button>
                      </div>
                    )
                  ) : (
                    <Button size="small" danger type="primary" disabled>
                      Hapus
                    </Button>
                  )}
                </span>
              )}
            />
          )}
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
                      <Checkbox checked={false} /> = Jika Transaksi Belum ada di
                      Data KHS, silahkan klik tombol uncheck.
                      <br />
                      <Checkbox checked={true} /> = Jika Transaksi Sudah ada di
                      Data KHS dan tidak dihapus dari KHS.
                    </div>
                  }
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
                  <Checkbox
                    checked={false}
                    onClick={() =>
                      syncBillingByIdPoli(
                        curpas.registrasiId,
                        billing.pelayananId,
                        billing.ruangId
                      )
                    }
                  />
                )}
              </span>
            )}
          />
        </Table>
      </Card>
      <Modal
        open={modaledit}
        title="Perbaikan Billing"
        onOk={editBilling}
        onCancel={() => {
          setJumlah(1);
          setPelayanan(null);
          setPemeriksa(null);
          setModalEdit(false);
        }}
        okText="Simpan"
        cancelText="Batal"
      >
        <Form {...layout}>
          <Form.Item label="Pemeriksaan" style={{ marginBottom: 0 }}>
            <Select
              dataSource={pelayanan}
              showSearch
              disabled
              style={{ width: "100%" }}
              placeholder="Pilih Pelayanan"
              optionFilterProp="children"
              onChange={(value) => onPelayanan(value)}
              value={pel}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {pelayanan.map((d) => (
                <Option key={d.pelayananId}>
                  {d.pelayananId + "-" + d.deskripsi}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Unit Pelayanan" style={{ marginBottom: 0 }}>
            <Input value={ruang} disabled />
          </Form.Item>
          <Form.Item label="Pelaksana" style={{ marginBottom: 0 }}>
            <Select
              dataSource={dokterall}
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Pelaksana"
              optionFilterProp="children"
              onChange={(e) => setPemeriksa(e)}
              value={pemeriksa === null ? curpas.dokterId : pemeriksa}
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
        </Form>
      </Modal>
    </Fragment>
  );
};

export default FormTransaksiRJRI;
