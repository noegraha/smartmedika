import React, { useContext, Fragment, useState } from "react";
import {
  Button,
  Select,
  Form,
  Row,
  Col,
  InputNumber,
  Table,
  Card,
  Input,
  Divider,
  Modal,
  Typography,
  Popconfirm,
  Space,
  Tooltip,
} from "antd";
import {
  CloseCircleTwoTone,
  EditTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import Draggable from "react-draggable";
import { PasienRIContext } from "../context/PasienRIContext";
import { PelayananRIContext } from "../context/PelayananRIContext";
import { OrderPenunjangRIContext } from "../context/OrderPenunjangRIContext";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { Option } = Select;
const { Column } = Table;
const { Text } = Typography;

const draggleRef = React.createRef();

const FormOrderPenunjangRI = () => {
  const { penunjang, curpasRI } = useContext(PasienRIContext);
  const {
    dokterall,
    pelayananruang,
    loadPelayananRuang,
    detpel,
    detailPelayanan,
  } = useContext(PelayananRIContext);
  const {
    insertOrderPenunjang,
    tabelorder,
    setTabelOrder,
    listorderpenunjang,
    setListOrderPenunjang,
    deleteOrderPenunjang,
    formOrder,
    setFormOrder,
    getListOrderRuang,
    // orderDetail,
    getOrderPenunjang,
    orderpenunjang,
    OrderPenunjangUnitTujuan,
    OrderPenunjangDiagnosa,
    formSelectOrder,
    setFormSelectOrder,
  } = useContext(OrderPenunjangRIContext);

  const namauser = sessionStorage.getItem("userId");
  const [total, setTotal] = useState(0);
  const [tindakan, setTindakan] = useState([]);
  const [deskripsitindakan, setDeskripsiTindakan] = useState([]);
  const [jumlah, setJumlah] = useState(1);
  const [ruangtujuan, setRuangTujuan] = useState([]);
  const [pelaksana, setPelaksana] = useState("-");
  const [diagnosa, setDiagnosa] = useState("-");
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });

  const handleCari = (e) => {
    setRuangTujuan(e);
    loadPelayananRuang(e);
    setTabelOrder([]);
    console.log("cari", curpasRI);
  };
  const onTindakan = (e, f) => {
    setTindakan(e);
    detailPelayanan(e);
    console.log(e);
    setDeskripsiTindakan(f.children[2]);
  };
  const onJumlah = (e) => {
    setJumlah(e);
  };
  const onPelaksana = (e) => {
    setPelaksana(e);
  };
  const tambahOrder = () => {
    setFormOrder(true);
    setTabelOrder([]);
  };
  const handleCancel = () => {
    setFormOrder(false);
    setFormSelectOrder(false);
  };

  const hapusOrder = (e) => {
    setListOrderPenunjang(
      listorderpenunjang.filter((item) => item.noOrder !== e)
    );
    deleteOrderPenunjang(e);
  };

  const hapusOrderEdit = (e) => {
    setTabelOrder(tabelorder.filter((item) => item.pelayananId !== e));
  };

  const simpan = () => {
    insertOrderPenunjang(datapenunjang);
    console.log("data insert", datapenunjang);
    // setFormOrder(false);
    // setFormSelectOrder(false);
  };

  const onDelete = (e) => {
    setTabelOrder(tabelorder.filter((item) => item.pelayananId !== e));
  };

  const onInsert = () => {
    const elementsIndex = tabelorder.findIndex(
      (element) => element.pelayananId === tindakan
    );
    if (elementsIndex === -1) {
      setTabelOrder([
        ...tabelorder,
        {
          deskripsi: deskripsitindakan,
          pelayananId: tindakan,
          harga: parseInt(Number(detpel.total).toFixed(2)),
          jumlah: jumlah,
          noLab: "string",
        },
      ]);
    } else {
      let newArray = [...tabelorder];

      newArray[elementsIndex] = {
        ...newArray[elementsIndex],
        jumlah: jumlah,
      };
      setTabelOrder(newArray);
    }
  };
  const cancel = () => {};

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
  const onDiagnosa = (e) => {
    setDiagnosa(e);
  };

  const onTindakanBaru = (e) => {
    setTindakan(e);
    detailPelayanan(e);
  };

  const selectOrder = (e, f, g, h, i) => {
    setFormSelectOrder(true);
    setTindakan([]);
    getListOrderRuang(e);
    getOrderPenunjang(e);
    loadPelayananRuang(f);
    setPelaksana(g);
    setDiagnosa(h);
    setRuangTujuan(i);
    console.log(e, f, g, h, i);
  };

  const [form] = Form.useForm();
  const datapenunjang = {
    registrasiId: curpasRI.registrasiId,
    jenisOrder: "P",
    unitOrderId: curpasRI.ruangId,
    unitTujuanId: ruangtujuan,
    kelasRawatId: curpasRI.kelasRawatId,
    biaya: total,
    userId: namauser,
    dokterId: pelaksana,
    diagnosa: diagnosa,
    billOrderDetail: tabelorder,
  };

  return (
    <Fragment>
      <Card
        title="Order Penunjang"
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "lavenderblush" }}
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
            onClick={tambahOrder}
          >
            Tambah Order
          </Button>
        }
      >
        <Table
          dataSource={listorderpenunjang}
          bordered
          pagination={false}
          size="small"
        >
          <Column
            title="No Order"
            key="noorder"
            className="bgcolortunggu"
            render={(listorderpenunjang) => (
              <span>{listorderpenunjang.noOrder}</span>
            )}
          />
          <Column
            title="Deskripsi"
            key="reg"
            className="tabeltabel"
            render={(listorderpenunjang) => (
              <span>{listorderpenunjang.unitTujuan}</span>
            )}
          />
          <Column
            title="Pelaksana"
            className="tabeltabel"
            key="nama"
            render={(listorderpenunjang) => (
              <span>{listorderpenunjang.namaDokter}</span>
            )}
          />
          <Column
            title="Action"
            key="reg"
            className="tabeltabel"
            render={(listorderpenunjang) => (
              <Space>
                <Button
                  size="small"
                  type="link"
                  onClick={() =>
                    selectOrder(
                      listorderpenunjang.noOrder,
                      listorderpenunjang.unitTujuanId,
                      listorderpenunjang.dokterId,
                      listorderpenunjang.diagnosa,
                      listorderpenunjang.unitTujuanId
                    )
                  }
                >
                  <Tooltip title="Edit Order">
                    <EditTwoTone twoToneColor="green" />
                  </Tooltip>
                </Button>
                <Popconfirm
                  title="Anda Yakin Dihapus ?"
                  onConfirm={(e) => hapusOrder(listorderpenunjang.noOrder)}
                  onCancel={(e) => cancel(e)}
                  okText="Ya"
                  cancelText="Tidak"
                >
                  <Button size="small" type="link">
                    <Tooltip title="Hapus Order">
                      <CloseCircleTwoTone twoToneColor="red" />
                    </Tooltip>
                  </Button>
                </Popconfirm>
              </Space>
              // <Space>
              //   <Button
              //     type="primary"
              //     size="small"
              //     onClick={() =>
              //       selectOrder(
              //         listorderpenunjang.noOrder,
              //         listorderpenunjang.unitTujuanId,
              //         listorderpenunjang.dokterId,
              //         listorderpenunjang.diagnosa,
              //         listorderpenunjang.unitTujuanId
              //       )
              //     }
              //   >
              //     Edit Order
              //   </Button>
              // <Popconfirm
              //   title="Anda Yakin Dihapus ?"
              //   onConfirm={(e) => hapusOrder(listorderpenunjang.noOrder)}
              //   onCancel={(e) => cancel(e)}
              //   okText="Ya"
              //   cancelText="Tidak"
              // >
              //   <Button size="small" danger>
              //     Hapus Order
              //   </Button>
              // </Popconfirm>
              // </Space>
            )}
          />
        </Table>
      </Card>

      {/* Tambah Order */}
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
            Tambah Order Penunjang
          </div>
        }
        // title="Tambah Order Penunjang"
        visible={formOrder}
        onOk={simpan}
        onCancel={handleCancel}
        width="1000px"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Kembali
          </Button>,
          <Button key="submit" type="primary" onClick={simpan}>
            Simpan
          </Button>,
        ]}
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
        <Form
          form={form}
          name="penunjang"
          initialValues={{ remember: true }}
          onFinish={simpan}
        >
          <Row gutter={[8, 2]} align="middle">
            <Col span={4} xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Ruang Tujuan"
                rules={[{ required: true }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  dataSource={penunjang}
                  showSearch
                  placeholder="Pilih ruang..."
                  optionFilterProp="children"
                  onChange={(e) => handleCari(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {penunjang.map((d) => (
                    <Option key={d.ruangId}>
                      {d.ruangId} - {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                label="Dokter"
                rules={[{ required: true }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  dataSource={dokterall}
                  showSearch
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
          <Row gutter={[8, 2]}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Diagnosa"
                rules={[{ required: true }]}
                style={{ marginBottom: 0 }}
              >
                <Input onChange={(e) => onDiagnosa(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={4} xs={24} sm={24} md={8} lg={8} xl={8}></Col>
          </Row>
          <Row gutter={[8, 2]}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Pemeriksaan/Tindakan"
                rules={[{ required: true }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  dataSource={pelayananruang}
                  showSearch
                  placeholder="Pilih Pemeriksaan/Tindakan..."
                  optionFilterProp="children"
                  onChange={(e) => onTindakanBaru(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pelayananruang.map((d) => (
                    <Option key={d.pelayananId}>
                      {d.pelayananId} - {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Item
                label="Jumlah"
                rules={[{ required: true }]}
                style={{ marginBottom: 0 }}
              >
                <InputNumber defaultValue={1} onChange={(e) => onJumlah(e)} />
              </Form.Item>
            </Col>
            <Col
              span={4}
              xs={12}
              sm={12}
              md={2}
              lg={2}
              xl={2}
              style={{ textAlign: "right" }}
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <Button type="primary" onClick={onInsert}>
                  Ambil
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Table
            dataSource={tabelorder}
            bordered
            pagination={false}
            size="small"
            summary={(pageData) => {
              let total = 0;
              pageData.forEach(({ harga, jumlah }) => {
                total += harga * jumlah;
                setTotal(total);
              });
              return (
                <>
                  <tr>
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
              className="bgcolortunggu"
              dataIndex="pelayananId"
              title="Order"
            />
            <Column dataIndex="jumlah" title="Jumlah" />
            <Column
              title="Biaya"
              key="biaya"
              render={(tabelorder) => (
                <span>
                  Rp.{" "}
                  {tabelorder.harga.toLocaleString("id-id", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            />
            <Column
              title="Total"
              key="total"
              render={(tabelorder) => (
                <span>
                  Rp.{" "}
                  {(
                    parseInt(tabelorder.harga) * parseInt(tabelorder.jumlah)
                  ).toLocaleString("id-id", { minimumFractionDigits: 2 })}
                </span>
              )}
            />
            <Column
              title="Action"
              render={(tabelorder) => (
                <span>
                  <Button
                    danger
                    size="small"
                    onClick={(e) => onDelete(tabelorder.pelayananId)}
                  >
                    Hapus
                  </Button>
                </span>
              )}
            />
          </Table>
        </Form>
      </Modal>

      {/* Modal Edit */}
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
            Edit Penunjang
          </div>
        }
        // title="Edit Penunjang"
        visible={formSelectOrder}
        onOk={simpan}
        onCancel={handleCancel}
        width="1000px"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Kembali
          </Button>,
          <Button key="submit" type="primary" onClick={simpan}>
            Simpan
          </Button>,
        ]}
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
        <Form
          form={form}
          name="penunjang"
          initialValues={{ remember: true }}
          onFinish={simpan}
        >
          <Row gutter={[8, 2]} align="middle">
            <Col span={4} xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Ruang Tujuan"
                rules={[{ required: true }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  disabled
                  value={OrderPenunjangUnitTujuan}
                  //   dataSource={penunjang}
                  showSearch
                  placeholder="Pilih ruang..."
                  optionFilterProp="children"
                  //   onChange={(e) => handleCari(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {penunjang.map((d) => (
                    <Option key={d.ruangId}>
                      {d.ruangId} - {d.deskripsi}
                    </Option>
                  ))} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} xs={24} sm={24} md={8} lg={8} xl={8}>
              <Form.Item
                label="Dokter"
                rules={[{ required: true }]}
                style={{ marginBottom: 0 }}
              >
                <Select
                  value={orderpenunjang.dokterId}
                  dataSource={dokterall}
                  showSearch
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
          <Row gutter={[8, 2]}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Diagnosa"
                rules={[{ required: true }]}
                style={{ marginBottom: 0 }}
              >
                <Input
                  value={OrderPenunjangDiagnosa}
                  onChange={(e) => onDiagnosa(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={4} xs={24} sm={24} md={8} lg={8} xl={8}></Col>
          </Row>
          <Row gutter={[8, 2]}>
            <Col xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Pemeriksaan/Tindakan"
                rules={[{ required: true }]}
              >
                <Select
                  dataSource={pelayananruang}
                  value={tindakan}
                  showSearch
                  placeholder="Pilih Pemeriksaan/Tindakan..."
                  optionFilterProp="children"
                  onChange={(e, f) => onTindakan(e, f)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toString()
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pelayananruang.map((d) => (
                    <Option key={d.pelayananId}>
                      {d.pelayananId} - {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={4} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Item label="Jumlah" rules={[{ required: true }]}>
                <InputNumber defaultValue={1} onChange={(e) => onJumlah(e)} />
              </Form.Item>
            </Col>
            <Col
              span={4}
              xs={12}
              sm={12}
              md={2}
              lg={2}
              xl={2}
              style={{ textAlign: "right" }}
            >
              <Form.Item>
                <Button type="primary" onClick={onInsert}>
                  Ambil
                </Button>
              </Form.Item>
            </Col>
          </Row>

          <Table
            dataSource={tabelorder}
            bordered
            pagination={false}
            size="small"
            summary={(pageData) => {
              let total = 0;
              pageData.forEach(({ harga, jumlah }) => {
                total += harga * jumlah;
                setTotal(total);
              });
              return (
                <>
                  <tr>
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
            <Column dataIndex="pelayananId" title="Order" />
            <Column dataIndex="deskripsi" title="Deskripsi" />
            <Column dataIndex="jumlah" title="Jumlah" />
            <Column dataIndex="harga" title="Biaya" />
            <Column
              title="Total"
              key="total"
              render={(orderDetail) => (
                <span>
                  Rp.{" "}
                  {(
                    parseInt(orderDetail.harga) * parseInt(orderDetail.jumlah)
                  ).toLocaleString("id-id", { minimumFractionDigits: 2 })}
                </span>
              )}
            />
            <Column
              title="Action"
              render={(orderDetail) => (
                <span>
                  <Button
                    danger
                    size="small"
                    onClick={() => hapusOrderEdit(orderDetail.pelayananId)}
                  >
                    Hapus
                  </Button>
                </span>
              )}
            />
          </Table>
        </Form>
      </Modal>
    </Fragment>
  );
};

export default FormOrderPenunjangRI;
