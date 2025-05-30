import React, { useContext, Fragment, useState, useRef } from "react";
import {
  Button,
  Select,
  Form,
  Row,
  Col,
  Table,
  Card,
  Input,
  Divider,
  Modal,
  Typography,
  Popconfirm,
  Space,
  message,
} from "antd";
import { PelayananContext } from "../context/Pelayanancontext";
import { PasienContext } from "../context/PasienContext";
import { PenunjangContext } from "../orderpenunjang/OrderPenunjangContext";
import Draggable from "react-draggable";
import {
  InfoCircleTwoTone,
  CheckSquareTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { DiagnosaContext } from "../context/Diagnosacontext";
// import { LoginContext } from "../context";
const { Option } = Select;
const { Column } = Table;
const { Text } = Typography;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const draggleRef = React.createRef();
const FormOrderPenunjang = () => {
  const RsLokasiPenunjang = sessionStorage.getItem("RSMana");
  const {
    dokterall,
    // pelayananruang,
    loadPelayananRuang,
    // detailPelayanan,
    // detpel,
    loadPelayananRuangKelas,
    pelayanankelas,
  } = useContext(PelayananContext);
  const { penunjang, curpas, poli1 } = useContext(PasienContext);
  const { detdiagnosa } = useContext(DiagnosaContext);
  const {
    listorderpenunjang,
    setListOrderPenunjang,
    insertOrderPenunjang,
    getListOrderRuang,
    // orderDetail,
    getOrderPenunjang,
    orderpenunjang,
    // setOrderDetail,
    deleteOrderPenunjang,
    tabelorder,
    setTabelOrder,
    tindakanAmbil,
    setTindakanAmbil,
    listorderpenunjangorder,
    listorderpenunjangvalid,
    formOrder,
    setFormOrder,
    formSelectOrder,
    setFormSelectOrder,
    loadingsimpan,
    load,
  } = useContext(PenunjangContext);
  // const [tableData, setTableData] = useState(tabelorder);
  // const { namauser } = useContext(LoginContext);
  const namauser = sessionStorage.getItem("userId");
  const [noorder, setNoOrder] = useState(null);
  const [modaldetail, setModalDetail] = useState(false);
  const [total, setTotal] = useState(0);
  // const [tindakan, setTindakan] = useState([]);
  // const [deskripsitindakan, setDeskripsiTindakan] = useState([]);
  // const [jumlah, setJumlah] = useState(1);
  // const [tindakanTampil, setTindakanTampil] = useState([]);
  const [ruangtujuan, setRuangTujuan] = useState([]);
  const [pelaksana, setPelaksana] = useState(
    curpas.ruangKonsul !== null ? null : curpas.dokterId
  );
  const [diagnosa, setDiagnosa] = useState("-");
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  //check ruang apotik reguler abiyasa
  const checkFor = ["9113", "9114", "9105", "91A3", "91A8"];
  const hasSome = checkFor.includes(poli1);

  const handleCari = (e) => {
    setRuangTujuan(e);
    loadPelayananRuangKelas(e, "3");
    setTabelOrder([]);
    setTindakanAmbil([]);
  };
  const onPelaksana = (e) => {
    setPelaksana(e);
  };
  const onDiagnosa = (e) => {
    setDiagnosa(e);
  };
  const [form] = Form.useForm();
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datapenunjang = {
    noOrder: noorder,
    registrasiId: curpas.registrasiId,
    jenisOrder: "P",
    unitOrderId: curpas.ruangId,
    unitTujuanId: ruangtujuan,
    kelasRawatId: curpas.kelasRawatId,
    biaya: total,
    userId: namauser,
    dokterId:
      pelaksana === null
        ? curpas.ruangKonsul !== null
          ? null
          : curpas.dokterId
        : pelaksana,
    diagnosa: diagnosa,
    billOrderDetail: tabelorder,
    clientHost: host,
    clientIp: ip,
  };
  const simpan = () => {
    console.log(datapenunjang);

    if (tabelorder.length === 0) {
      Modal.warning({ content: "Tindakan belum diisi" });
    } else if (diagnosa === null) {
      Modal.warning({ content: "Diagnosa belum diisi" });
    } else {
      simpanorder();
    }
  };
  const simpanorder = () => {
    if (pelaksana === null) {
      message.warning("Pelaksana masih kosong!");
    } else {
      insertOrderPenunjang(datapenunjang);
      // console.log(datapenunjang);
    }
  };
  const onDelete = (e) => {
    setTabelOrder(tabelorder.filter((item) => item.pelayananId !== e));
    setTindakanAmbil(
      tindakanAmbil.filter((item) => item.split("-").shift() !== e)
    );
  };

  const onInsert = () => {
    const gjlbaruFungsiEndokrin = [];

    for (var i = 0; i < tindakanAmbil.length; i++) {
      const elementsIndex = tabelorder.findIndex(
        (element) => element.pelayananId === tindakanAmbil[i].split("-").shift()
      );

      if (elementsIndex === -1) {
        console.log("ora");
        gjlbaruFungsiEndokrin.push({
          deskripsi: tindakanAmbil[i].split("-").pop().split("_").shift(),
          pelayananId: tindakanAmbil[i].split("-").shift(),
          harga: tindakanAmbil[i].split("-").pop().split("_").pop(),
          jumlah: 1,
        });
      } else {
        console.log("ana", tabelorder);
        gjlbaruFungsiEndokrin.push({
          deskripsi: tabelorder[i].deskripsi,
          pelayananId: tabelorder[i].pelayananId,
          harga: tabelorder[i].harga,
          jumlah: tabelorder[i].jumlah,
        });
      }
    }
    setTabelOrder(gjlbaruFungsiEndokrin);
  };

  const tambahOrder = () => {
    if (detdiagnosa === null || detdiagnosa === undefined) {
      Modal.warning({
        content: "Diagnosa (ICD10) masih kosong silahkan isi terlebih dahulu",
      });
    } else {
      setFormOrder(true);
      setTabelOrder([]);
      setTindakanAmbil([]);
      setRuangTujuan("");
      setPelaksana(curpas.ruangKonsul !== null ? null : curpas.dokterId);
      // setTindakanTampil([]);
      setDiagnosa(null);
      setNoOrder(null);
    }
    console.log("det", detdiagnosa);
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
  const selectOrder = (e, f, g, h, i) => {
    setFormSelectOrder(true);
    setNoOrder(e);
    // setTindakan([]);
    loadPelayananRuangKelas(f, "3");
    getListOrderRuang(e);
    getOrderPenunjang(e);
    // loadPelayananRuang(f);
    setPelaksana(g);
    setDiagnosa(h);
    setRuangTujuan(i);
    // console.log(e, f, g, h, i);
  };
  const selectDetail = (e, f, g, h, i) => {
    setModalDetail(true);
    getListOrderRuang(e);
    getOrderPenunjang(e);
  };
  const handleCancel = () => {
    setFormOrder(false);
    setFormSelectOrder(false);
    setModalDetail(false);
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

  const onInputChange = (key, index) => (e) => {
    const newData = [...tabelorder];
    newData[index][key] = e.target.value;
    // setTotal(newData, index);
    setTabelOrder(newData);
  };

  const handleTabPress = (e) => {
    if (e.key === "Tab" && !e.shiftKey) {
      e.preventDefault();
      e.stopPropagation();
      e.nativeEvent.stopImmediatePropagation(); // ⛔ Hentikan semua handler AntD internal

      if (ambilButtonRef.current) {
        ambilButtonRef.current.focus();
      }
    }
  };
  const ambilButtonRef = useRef(null);
  // const selectRef = useRef(null);

  return (
    <Fragment>
      <Card
        loading={load}
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
        <Divider orientation="left">
          <InfoCircleTwoTone /> Status Order
        </Divider>
        <Table
          dataSource={listorderpenunjangorder}
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
                  type="primary"
                  onClick={() =>
                    selectOrder(
                      listorderpenunjang.noOrder,
                      listorderpenunjang.unitTujuanId,
                      listorderpenunjang.dokterId,
                      listorderpenunjang.diagnosa,
                      listorderpenunjang.unitTujuanId
                    )
                  }
                  style={{
                    backgroundColor: "forestgreen",
                    borderColor: "green",
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Anda Yakin Dihapus ?"
                  onConfirm={(e) => hapusOrder(listorderpenunjang.noOrder)}
                  onCancel={(e) => cancel(e)}
                  okText="Ya"
                  cancelText="Tidak"
                >
                  <Button size="small" type="primary" danger>
                    Hapus
                  </Button>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
        <Divider orientation="left">
          <CheckSquareTwoTone twoToneColor="#52c41a" /> Status Valid
        </Divider>
        <Table
          dataSource={listorderpenunjangvalid}
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
              <Button
                size="small"
                type="primary"
                onClick={() =>
                  selectDetail(
                    listorderpenunjang.noOrder,
                    listorderpenunjang.unitTujuanId,
                    listorderpenunjang.dokterId,
                    listorderpenunjang.diagnosa,
                    listorderpenunjang.unitTujuanId
                  )
                }
              >
                Detail
              </Button>
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
        open={formOrder}
        onOk={simpan}
        onCancel={handleCancel}
        width="1000px"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Kembali
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={simpan}
            loading={loadingsimpan}
          >
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
          labelWrap
        >
          <Row gutter={[8, 2]} align="middle">
            <Col span={4} xs={24} sm={24} md={16} lg={16} xl={16}>
              <Form.Item
                {...formItemLayout}
                label="Ruang Tujuan"
                rules={[{ required: true }]}
                style={{ marginBottom: 5 }}
              >
                <Select
                  dataSource={
                    RsLokasiPenunjang === "RSMS" && hasSome
                      ? penunjang.sort(
                          (a, b) =>
                            a.deskripsi
                              .split("- ")
                              .pop()
                              .localeCompare(b.deskripsi.split("- ").pop()) ||
                            parseFloat(a.ruangId) - parseFloat(b.ruangId)
                        )
                      : RsLokasiPenunjang === "ABIYASA"
                      ? penunjang.sort(
                          (a, b) =>
                            a.deskripsi
                              .split("- ")
                              .pop()
                              .localeCompare(b.deskripsi.split("- ").pop()) ||
                            parseFloat(a.ruangId) - parseFloat(b.ruangId)
                        )
                      : penunjang.sort(
                          (a, b) =>
                            b.deskripsi
                              .split("- ")
                              .pop()
                              .localeCompare(a.deskripsi.split("- ").pop()) ||
                            parseFloat(a.ruangId) - parseFloat(b.ruangId)
                        )
                  }
                  value={ruangtujuan}
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
                    <Option
                      key={d.ruangId}
                      className={
                        d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""
                      }
                    >
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
                style={{ marginBottom: 5 }}
              >
                <Select
                  dataSource={dokterall}
                  value={
                    pelaksana === null
                      ? curpas.ruangKonsul !== null
                        ? null
                        : curpas.dokterId
                      : pelaksana
                  }
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
                label="Keterangan / Diagnosa"
                rules={[{ required: true }]}
                style={{ marginBottom: 5 }}
              >
                <Input
                  showCount
                  maxLength={100}
                  value={diagnosa}
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
                label="Pemeriksaan / Tindakan"
                rules={[{ required: true }]}
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={tindakanAmbil}
                  showSearch
                  mode="multiple"
                  style={{ width: "100%" }}
                  placeholder="Pilih Pemeriksaan/Tindakan..."
                  onKeyDownCapture={handleTabPress} // 💡 ini kunci utamanya!
                  onChange={(e) => setTindakanAmbil(e)}
                >
                  {pelayanankelas.map((d) => (
                    <Option
                      key={d.pelayananId}
                      value={d.pelayananId + "-" + d.deskripsi + "_" + d.total}
                    >
                      {d.pelayananId} - {d.deskripsi}
                    </Option>
                  ))}
                </Select>
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
                <Button type="primary" onClick={onInsert} ref={ambilButtonRef}>
                  Ambil
                </Button>
              </Form.Item>
            </Col>
          </Row>
          <Divider />
          <Table
            rowKey="pelayananId"
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
              title="No."
              className="bgcolortunggu"
              width="40px"
              render={(text, record, index) => <span>{index + 1}</span>}
            />
            <Column
              className="bgcolortunggu"
              dataIndex="pelayananId"
              title="Order"
              width="10%"
            />
            <Column dataIndex="deskripsi" title="Deskripsi" width="30%" />
            <Column
              dataIndex="jumlah"
              title="Jumlah"
              width="10%"
              render={(text, record, index) => (
                <Input
                  size="small"
                  value={text}
                  onChange={onInputChange("jumlah", index)}
                />
              )}
            />

            <Column
              width="20%"
              title="Biaya"
              key="biaya"
              render={(tabelorder) => (
                <span>
                  Rp.{" "}
                  {parseInt(tabelorder.harga).toLocaleString("id-id", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            />
            <Column
              width="20%"
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
              width="10%"
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
        open={formSelectOrder}
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
                  value={orderpenunjang.unitTujuanId}
                  dataSource={penunjang}
                  showSearch
                  placeholder="Pilih ruang..."
                  optionFilterProp="children"
                  onChange={(e) => handleCari(e)}
                  filterOption={(input, option) =>
                    option.props.children
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
                  value={pelaksana}
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
                  value={diagnosa}
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
                  value={tindakanAmbil}
                  dataSource={pelayanankelas}
                  showSearch
                  mode="multiple"
                  allowClear
                  style={{ width: "100%" }}
                  placeholder="Pilih Pemeriksaan/Tindakan..."
                  onChange={(e) => setTindakanAmbil(e)}
                >
                  {pelayanankelas.map((d) => (
                    <Option
                      value={d.pelayananId + "-" + d.deskripsi + "_" + d.total}
                    >
                      {d.pelayananId} - {d.deskripsi}
                    </Option>
                  ))}
                </Select>
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
            rowKey="pelayananId"
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
              title="No."
              className="bgcolortunggu"
              width="40px"
              render={(text, record, index) => <span>{index + 1}</span>}
            />
            <Column dataIndex="pelayananId" title="Order" />
            Order
            <Column dataIndex="deskripsi" title="Deskripsi" />
            <Column
              dataIndex="jumlah"
              title="Jumlah"
              render={(text, record, index) => (
                <Input
                  size="small"
                  value={text}
                  onChange={onInputChange("jumlah", index)}
                />
              )}
            />
            <Column
              // dataIndex="harga"
              title="Biaya"
              render={(orderDetail) => (
                <span>
                  Rp.{" "}
                  {parseInt(orderDetail.harga).toLocaleString("id-id", {
                    minimumFractionDigits: 2,
                  })}
                </span>
              )}
            />
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

      {/* Modal Valid */}
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
            Detail
          </div>
        }
        // title="Edit Penunjang"
        open={modaldetail}
        onOk={handleCancel}
        onCancel={handleCancel}
        width="1000px"
        footer={[
          <Button key="back" onClick={handleCancel}>
            Kembali
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
        <Form.Item
          {...formItemLayout}
          label="Ruang Tujuan"
          style={{ marginBottom: 0 }}
        >
          <Select
            disabled
            value={orderpenunjang.unitTujuanId}
            dataSource={penunjang}
            showSearch
            placeholder="Pilih ruang..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.props.children
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
        <Form.Item
          {...formItemLayout}
          label="Dokter"
          style={{ marginBottom: 0 }}
        >
          <Select
            disabled
            value={orderpenunjang.dokterId}
            dataSource={dokterall}
            showSearch
            style={{ width: "100%" }}
            placeholder="Pilih Pelaksana"
            optionFilterProp="children"
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
        <Form.Item
          {...formItemLayout}
          label="Diagnosa"
          style={{ marginBottom: 0 }}
        >
          <Input disabled value={orderpenunjang.diagnosa} />
        </Form.Item>
        <Table
          rowKey="pelayananId"
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
            title="No."
            className="bgcolortunggu"
            width="40px"
            render={(text, record, index) => <span>{index + 1}</span>}
          />
          <Column dataIndex="pelayananId" title="Order" />
          Order
          <Column dataIndex="deskripsi" title="Deskripsi" />
          <Column
            dataIndex="jumlah"
            title="Jumlah"
            // render={(text, record, index) => (
            //   <Input value={text} onChange={onInputChange("jumlah", index)} />
            // )}
          />
          <Column
            // dataIndex="harga"
            title="Biaya"
            render={(orderDetail) => (
              <span>
                Rp.{" "}
                {parseInt(orderDetail.harga).toLocaleString("id-id", {
                  minimumFractionDigits: 2,
                })}
              </span>
            )}
          />
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
        </Table>
      </Modal>
    </Fragment>
  );
};

export default FormOrderPenunjang;
