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
  Tooltip,
  Space,
} from "antd";
import dayjs from "dayjs";
import { useState } from "react";
import {
  DeleteFilled,
  DeleteTwoTone,
  EditFilled,
  EditTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";
import { BillingContext } from "../../rawatjalan/context/BillingContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import { UserContext } from "../../appsetting/UserContext";
const { Text } = Typography;
const { Column } = Table;
const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
  marginBottom: 0,
};
const FormBillingRI = () => {
  const {
    billing,
    insertBiiling,
    pel,
    setPelayanan,
    pemeriksa,
    setPemeriksa,
    jumlah,
    setJumlah,
    tipePmr,
    settipePmr,
    // deleteBillingDetail,
    loadingBilling,
    deleteBillingById,
    syncBillingByIdPoli,
  } = useContext(BillingContext);
  const { pelayanan, detpel, detailPelayanan, dokterall } =
    useContext(PelayananContext);
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser, pegawai } = useContext(LoginContext);
  const { menuMaster } = useContext(UserContext);
  const [modaledit, setModalEdit] = useState(false);
  const [ruang, setRuang] = useState(null);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  const ttlharga = parseInt(Number(detpel.total).toFixed(2)) * parseInt(jumlah);

  const billpelayanan = {
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    pelayananId: pel,
    pembayaranId: curpasRI.pembayaranId,
    // dokterPengirimId: String(authId),
    dokterPemeriksaId: pemeriksa === null ? curpasRI.dokterId : pemeriksa,
    kdgrptrf: curpasRI.kelasRawatId,
    jmlPelayanan: parseInt(jumlah),
    biayaPelayanan: parseInt(Number(ttlharga).toFixed(2)),
    userId: namauser,
    clientHost: host,
    clientIp: ip,
  };

  const simpanBill = () => {
    // pel === null
    //   ? Modal.warning({ content: "Pelayanan masih kosong!" })
    //   : pegawai !== null
    //   ? pegawai.slice(0, 1) === "D"
    //     ? message.warning(
    //         "Maaf User Dokter Tidak Dapat Melakukan Transaksi Billing"
    //       )
    //     : insertBiiling(billpelayanan)
    //   : insertBiiling(billpelayanan);
    // console.log(billpelayanan);
    if (pel === null) {
      Modal.warning({ content: "Pelayanan masih kosong!" });
    } else {
      insertBiiling(billpelayanan);
      console.log(billpelayanan);
    }
  };
  const editBilling = () => {
    // pel === null
    //   ? Modal.warning({ content: "Pelayanan masih kosong!" })
    //   : pegawai !== null
    //   ? pegawai.slice(0, 1) === "D"
    //     ? message.warning(
    //         "Maaf User Dokter Tidak Dapat Melakukan Transaksi Billing"
    //       )
    //     : insertBiiling(billpelayanan)
    //     : insertBiiling(billpelayanan);
    insertBiiling(billpelayanan);
    setModalEdit(false);
    console.log(billpelayanan);
  };
  const onPelayanan = (e) => {
    setPelayanan(e);
    detailPelayanan(e);
  };
  const onDelete = (noreg, pelayanan, dokter, ruang, id) => {
    // pegawai !== null
    //   ? pegawai.slice(0, 1) === "D"
    //     ? message.warning(
    //         "Maaf User Dokter Tidak Dapat Melakukan Transaksi Billing"
    //       )
    //     : deleteBillingById(noreg, id, namauser, ip)
    //   : deleteBillingById(noreg, id, namauser, ip);
    deleteBillingById(noreg, id, namauser, ip);
    // deleteBilling(noreg, pelayanan, dokter);
    // deleteBillingDetail(noreg, pelayanan, dokter, ruang, namauser, ip);
    // console.log(noreg, pelayanan, dokter, ruang, namauser, ip);
  };
  const cancel = () => {
    message.warning("Batal Dihapus");
  };
  const [form] = Form.useForm();
  return (
    <Fragment>
      <Row>
        <Col span={24}></Col>
      </Row>{" "}
      <Row>
        <Col span={24}>
          <Form form={form} name="billing" onFinish={simpanBill}>
            <Row gutter={[8, 8]}>
              <Col span={24} xs={24} sm={12} md={8} lg={9} xl={9}>
                Pelayanan:{" "}
                <Form.Item style={{ marginBottom: 0 }}>
                  <Select
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
                        {d.pelayananId + " - " + d.deskripsi}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} xs={24} sm={12} md={2} lg={2} xl={2}>
                Tipe:{" "}
                <Form.Item style={{ marginBottom: 0 }}>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Tipe"
                    optionFilterProp="children"
                    onChange={(e) => settipePmr(e)}
                    value={tipePmr}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option key="BIASA">BIASA</Option>
                    <Option key="CITO">CITO</Option>
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24} xs={24} sm={12} md={2} lg={2} xl={2}>
                Jumlah:{" "}
                <Form.Item style={{ marginBottom: 0 }}>
                  <InputNumber
                    min={1}
                    max={100}
                    onChange={(e) => setJumlah(e)}
                    style={{ width: "100%" }}
                    value={jumlah}
                  />
                </Form.Item>
              </Col>
              <Col span={24} xs={24} sm={12} md={6} lg={3} xl={3}>
                Biaya:{" "}
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input disabled style={{ width: "100%" }} value={ttlharga} />
                </Form.Item>
              </Col>
              <Col span={24} xs={24} sm={12} md={6} lg={6} xl={6}>
                Pelaksana:{" "}
                <Form.Item style={{ marginBottom: 0 }}>
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Pelaksana"
                    optionFilterProp="children"
                    onChange={(e) => setPemeriksa(e)}
                    value={pemeriksa === null ? curpasRI.dokterId : pemeriksa}
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
              <Col
                span={24}
                xs={24}
                sm={12}
                md={6}
                lg={2}
                xl={2}
                style={{ display: "flex", alignItems: "flex-end" }}
              >
                <Form.Item style={{ marginBottom: 0 }}>
                  <Button
                    loading={loadingBilling}
                    type="primary"
                    htmlType="submit"
                  >
                    Ambil
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
      <Table
        locale={{ emptyText: <Empty description={false} /> }}
        bordered
        pagination={false}
        dataSource={billing}
        size="small"
        rowKey="reg"
        scroll={{ x: 1000, y: 720 }}
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
          // width="10px"
          render={(text, record, index) => <span>{index + 1}</span>}
        />
        <Column
          style={{ verticalAlign: "top" }}
          title="Kode"
          className="bgcolortunggu, tabeltabel2"
          // width="40px"
          render={(billing) => <span>{billing.pelayananId}</span>}
        />
        <Column
          style={{ verticalAlign: "top" }}
          title="Unit"
          className="tabeltabel"
          // width="180px"
          render={(billing) => <span>{billing.ruangDesk}</span>}
        />
        <Column
          style={{ verticalAlign: "top" }}
          title="Tanggal"
          className="tabeltabel"
          // width="75px"
          render={(billing) => <span>{billing.tanggal}</span>}
        />
        <Column
          style={{ verticalAlign: "top" }}
          title="Pelayanan"
          className="tabeltabel"
          // width="400px"
          render={(billing) => <span>{billing.pelayananDesk}</span>}
        />
        <Column
          style={{ verticalAlign: "top" }}
          title="Jumlah"
          // width="40px"
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
          // width="150px"
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
        {/* {menuMaster ? ( */}
        <Column
          style={{ verticalAlign: "top" }}
          title="Action"
          className="tabeltabel"
          render={(billing) => (
            <Space>
              {billing.noPembayaran === null ? (
                <>
                  <Tooltip title="Hapus">
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
                      <Button
                        size="small"
                        type="text"
                        shape="circle"
                        icon={<DeleteTwoTone twoToneColor="#f5222d" />}
                      />
                    </Popconfirm>
                  </Tooltip>
                  {/* {curpasRI.ruangId === billing.ruangId ? ( */}
                  <Tooltip title="Edit">
                    <Button
                      size="small"
                      type="text"
                      shape="circle"
                      onClick={() => {
                        setModalEdit(true);
                        onPelayanan(billing.pelayananId);
                        setJumlah(billing.jumlah);
                        setPemeriksa(billing.pemeriksaId);
                        setRuang(billing.ruangDesk);
                      }}
                      icon={<EditTwoTone twoToneColor="#52c41a" />}
                    />
                  </Tooltip>
                </>
              ) : (
                <Button
                  size="small"
                  type="text"
                  shape="circle"
                  danger
                  icon={<DeleteFilled twoToneColor="#f5222d" />}
                  disabled
                />
              )}
              {/* ) : ( */}
              {/* <></> */}
              {/* )} */}
            </Space>
          )}
        />
        {/* ) : ( */}
        {/* <Column
              style={{ verticalAlign: "top" }}
              title="Action"
              className="tabeltabel"
              render={(billing) => (
                <span>
                  {billing.tanggal === dayjs().format("DD-MM-YYYY") ? (
                    billing.noPembayaran === null ? (
                      billing.ruangId === curpasRI.ruangId ||
                      menuMaster === true ? (
                        <Space>
                          <Tooltip title="Hapus">
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
                              <Button
                                size="small"
                                type="text"
                                shape="circle"
                                icon={<DeleteTwoTone twoToneColor="#f5222d" />}
                              />
                            </Popconfirm>
                          </Tooltip>

                          {curpasRI.ruangId === billing.ruangId ? (
                            <Tooltip title="Edit">
                              <Button
                                size="small"
                                type="text"
                                shape="circle"
                                onClick={() => {
                                  setModalEdit(true);
                                  onPelayanan(billing.pelayananId);
                                  setJumlah(billing.jumlah);
                                  setPemeriksa(billing.pemeriksaId);
                                  setRuang(billing.ruangDesk);
                                }}
                                icon={<EditTwoTone twoToneColor="#52c41a" />}
                              />
                            </Tooltip>
                          ) : (
                            <></>
                          )}
                        </Space>
                      ) : (
                        <Button
                          size="small"
                          type="text"
                          shape="circle"
                          danger
                          icon={<DeleteFilled twoToneColor="#f5222d" />}
                          disabled
                        />
                      )
                    ) : (
                      <Button
                        size="small"
                        type="text"
                        shape="circle"
                        danger
                        icon={<DeleteFilled twoToneColor="#f5222d" />}
                        disabled
                      />
                    )
                  ) : (
                    <Button
                      size="small"
                      type="text"
                      shape="circle"
                      danger
                      icon={<DeleteFilled twoToneColor="#f5222d" />}
                      disabled
                    />
                  )}
                </span>
              )}
            />
          )} */}
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
                <Checkbox
                  checked={false}
                  onClick={() =>
                    syncBillingByIdPoli(
                      curpasRI.registrasiId,
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
              // searchValue={kosong}
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
                  {d.pelayananId + " - " + d.deskripsi}
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
              value={pemeriksa === null ? curpasRI.dokterId : pemeriksa}
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

export default FormBillingRI;
