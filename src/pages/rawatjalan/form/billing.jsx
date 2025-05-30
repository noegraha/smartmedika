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
import { BillingContext } from "../context/BillingContext";
import { PelayananContext } from "../context/Pelayanancontext";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context/LoginContext";
import dayjs from "dayjs";
import { useState } from "react";
import { UserContext } from "../../appsetting/UserContext";
import {
  DeleteFilled,
  DeleteTwoTone,
  EditFilled,
  EditTwoTone,
  QuestionCircleTwoTone,
} from "@ant-design/icons";

const { Text } = Typography;
const { Column } = Table;
const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
  marginBottom: 0,
};
const FormBilling = () => {
  const {
    billing,
    insertBiiling,
    pel,
    setPelayanan,
    pemeriksa,
    setPemeriksa,
    jumlah,
    setJumlah,
    // deleteBillingDetail,
    loadingBilling,
    deleteBillingById,
    syncBillingByIdPoli,
  } = useContext(BillingContext);
  const { pelayanan, detpel, detailPelayanan, dokterall } =
    useContext(PelayananContext);
  const { curpas, ruangasal } = useContext(PasienContext);
  const { namauser, pegawai } = useContext(LoginContext);
  const { menuMaster } = useContext(UserContext);
  const [modaledit, setModalEdit] = useState(false);
  const [ruang, setRuang] = useState(null);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const billpelayanan = {
    registrasiId: curpas.registrasiId,
    ruangId: ruangasal,
    pelayananId: pel,
    pembayaranId: curpas.pembayaranId,
    // dokterPengirimId: String(authId),
    dokterPemeriksaId: pemeriksa === null ? curpas.dokterId : pemeriksa,
    kdgrptrf: curpas.kelasRawatId,
    jmlPelayanan: parseInt(jumlah),
    biayaPelayanan: parseInt(Number(detpel.total).toFixed(2)),
    userId: namauser,
    clientHost: host,
    clientIp: ip,
  };

  const simpanBill = () => {
    if (pel === null) {
      Modal.warning({ content: "Pelayanan masih kosong!" });
    } else if (pel === "RJM013" || pel === "RJP009") {
      if (curpas.ruangId === ruangasal && curpas.ruangKonsul === null) {
        message.warning(
          "Tidak bisa menambahkan pelayanan konsul pada poli sendiri"
        );
      } else if (
        curpas.ruangId === ruangasal &&
        curpas.ruangKonsul.substring(0, 1) !== "A"
      ) {
        message.warning(
          "Tidak bisa menambahkan pelayanan konsul pada poli sendiri"
        );
      } else {
        console.log(billpelayanan);
        insertBiiling(billpelayanan);
      }
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

  const listAllow = ["NUGRAHA"];
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
        <Form form={form} name="billing" onFinish={simpanBill}>
          <Row gutter={[8, 2]}>
            <Col span={4} xs={24} sm={20} md={20} lg={18} xl={11}>
              Pelayanan :{" "}
              <Form.Item style={{ marginBottom: 0 }}>
                <Select
                  dataSource={pelayanan}
                  showSearch
                  // searchValue={kosong}
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
                  // defaultValue={jumlah}
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
            <Col span={4} xs={24} sm={16} md={16} lg={16} xl={6}>
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
            <Col
              span={24}
              xs={24}
              sm={2}
              md={2}
              lg={2}
              xl={2}
              style={{ display: "flex", alignItems: "end" }}
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <Button
                  loading={loadingBilling}
                  type="primary"
                  htmlType="submit"
                  disabled={
                    listAllow.includes(namauser)
                      ? false
                      : dayjs().format("DD-MM-YYYY") === curpas.tanggalMasuk
                      ? false
                      : true
                    // namauser !== "NUGRAHA"
                    //   ? dayjs().format("DD-MM-YYYY") === curpas.tanggalMasuk
                    //     ? false
                    //     : true
                    //   : false
                  }
                >
                  Ambil
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          // style={{ verticalAlign: "top" }}
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
          {menuMaster ? (
            <Column
              style={{ verticalAlign: "top" }}
              title="Action"
              className="tabeltabel"
              render={(billing) => (
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
                  {ruangasal === billing.ruangId ? (
                    // <Button
                    //   size="small"
                    //   onClick={() => {
                    //     setModalEdit(true);
                    //     onPelayanan(billing.pelayananId);
                    //     setJumlah(billing.jumlah);
                    //     setPemeriksa(billing.pemeriksaId);
                    //     setRuang(billing.ruangDesk);
                    //   }}
                    // >
                    //   Edit
                    // </Button>
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

                          {ruangasal === billing.ruangId ? (
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

export default FormBilling;
