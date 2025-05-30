import React, { Fragment, useState, useContext } from "react";
import {
  Typography,
  Table,
  Form,
  Input,
  Button,
  Col,
  Row,
  Select,
  Modal,
  message,
  Popconfirm,
  Card,
  Space,
} from "antd";
import { MasterKriteriaAskepContext } from "../context/masteraskep/MasterKriteriaAskepContext";
import { MasterLuaranAskepContext } from "../context/masteraskep/MasterLuaranAskepContext";

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
};
const { Title } = Typography;
const MasterKriteriaAskep = () => {
  const { Column } = Table;
  const { masterLuaran } = useContext(MasterLuaranAskepContext);
  const {
    kriteria,
    detailkriteriaaskepId,
    deleteMastekriteriaaskep,
    insertMasterkriteriaiaskep,
    kriteriaId,
    setkriteriaId,
    deskripsi,
    setdeskripsi,
    jenisKriteria,
    setjenisKriteria,
    luaranId,
    setluaranId,
  } = useContext(MasterKriteriaAskepContext);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const showModal1 = (e) => {
    setVisible1(true);
    setkriteriaId("");
    //console.log(masterKategori);
  };
  const showModal2 = (e) => {
    setVisible2(true);
    detailkriteriaaskepId(e);
  };
  const onSubmit = (e) => {
    insertMasterkriteriaiaskep(data);
    console.log(data);
    setVisible1(false);
    setVisible2(false);
  };
  const onCancel = () => {
    setVisible1(false);
    setVisible2(false);
  };

  const onDelete = (e) => {
    deleteMastekriteriaaskep(e);
    //console.log(e);
  };
  const onCanceltip = () => {
    message.error("Batal disimpan!");
  };
  const cancelhapus = () => {
    message.error("Batal dihapus!");
  };
  const onDeskripsi = (e) => {
    setdeskripsi(e.target.value);
  };
  const onJnsKriteria = (e) => {
    setjenisKriteria(e);
  };
  const onLuaranId = (e) => {
    setluaranId(e);
  };
  const data = {
    kriteriaId: kriteriaId === "" ? "" : kriteriaId,
    deskripsi: deskripsi,
    jenisKriteria: jenisKriteria,
    luaranId: luaranId,
    status: true,
  };
  const [page, setPage] = useState(1);
  return (
    <div>
      <Fragment>
        <Card
          title={<Title level={4}>DATA KATEGORI ASUHAN KEPERAWATAN</Title>}
          extra={
            <Button type="primary" onClick={(e) => showModal1(e)}>
              Tambah
            </Button>
          }
        >
          <Modal
            style={{ top: 20 }}
            width="1000px"
            visible={visible1}
            title="Tambah Kriteria Askep"
            footer={false}
            // onOk={(e) => onSubmit(e)}
            onCancel={(e) => onCancel(e)}
          >
            <Form>
              <Row>
                <Col span={24}>
                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="SLKI :"
                  >
                    <Select
                      showSearch
                      source={masterLuaran}
                      placeholder="..."
                      optionFilterProp="children"
                      onChange={onLuaranId}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {masterLuaran.map((d) => (
                        <Option key={d.luaranId}>{d.deskripsi}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="Kriteria :"
                  >
                    <Input onChange={(e) => onDeskripsi(e)} />
                  </Form.Item>
                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="Jenis Kriteria :"
                  >
                    <Select
                      value={jenisKriteria}
                      showSearch
                      placeholder="..."
                      optionFilterProp="children"
                      onChange={onJnsKriteria}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value={1}>Kriteria 1</Option>
                      <Option value={2}>Kriteria 2</Option>
                      <Option value={3}>Kriteria 3</Option>
                      <Option value={4}>Kriteria 4</Option>
                      <Option value={5}>Kriteria 5</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Popconfirm
                    title="Apakah data sudah benar?"
                    onConfirm={() => onSubmit()}
                    onCancel={onCanceltip}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button type="primary">Simpan</Button>
                  </Popconfirm>
                  <Button onClick={() => onCancel()}>Batal</Button>
                </Col>
              </Row>
            </Form>
          </Modal>
          <Table
            pagination={{
              onChange(current) {
                setPage(current);
              },
            }}
            dataSource={kriteria}
            size="small"
          >
            <Column
              title="No"
              key="reg"
              className="tabeltabel2"
              width="1px"
              render={(text, record, index) => (
                <span>{(page - 1) * 10 + index + 1}</span>
              )}
            />
            <Column
              title="Kode"
              key="reg"
              width="2px"
              render={(kriteria) => <span>{kriteria.kriteriaId}</span>}
            />
            <Column
              title="Kriteria"
              key="reg"
              width="100px"
              render={(kriteria) => <span>{kriteria.deskripsi}</span>}
            />
            <Column
              title="Sub Kategori"
              key="reg"
              width="5px"
              render={(kriteria) => <span>{kriteria.jenisKriteria}</span>}
            />
            <Column
              title="Keterangan"
              key="reg"
              width="100px"
              render={(kriteria) => <span>{kriteria.luaranId}</span>}
            />
            <Column
              title="Aksi"
              key="reg"
              width="100px"
              render={(kriteria) => (
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    style={{ background: "green", borderColor: "green" }}
                    onClick={(e) => showModal2(kriteria.kriteriaId)}
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    title="Apakah Yakin?"
                    onConfirm={(e) => onDelete(kriteria.kriteriaId)}
                    onCancel={cancelhapus}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button
                      type="primary"
                      size="small"
                      style={{ background: "red", borderColor: "red" }}
                    >
                      Hapus
                    </Button>
                  </Popconfirm>
                </Space>
              )}
            />
          </Table>
          <Modal
            style={{ top: 20 }}
            width="1000px"
            visible={visible2}
            title="Tambah Kriteria"
            footer={false}
            //onOk={(e) => onSubmitEdit(e)}
            onCancel={(e) => onCancel(e)}
          >
            <Form>
              <Row>
                <Col span={24}>
                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="Kriteria :"
                  >
                    <Input value={kriteriaId} disabled />
                  </Form.Item>
                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="SLKI :"
                  >
                    <Select
                      value={luaranId}
                      showSearch
                      source={masterLuaran}
                      placeholder="..."
                      optionFilterProp="children"
                      onChange={onLuaranId}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {masterLuaran.map((d) => (
                        <Option key={d.luaranId}>{d.deskripsi}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="Kriteria :"
                  >
                    <Input value={deskripsi} onChange={(e) => onDeskripsi(e)} />
                  </Form.Item>
                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="Jenis Kriteria :"
                  >
                    <Select
                      value={jenisKriteria}
                      showSearch
                      placeholder="..."
                      optionFilterProp="children"
                      onChange={onJnsKriteria}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option value={1}>Kriteria 1</Option>
                      <Option value={2}>Kriteria 2</Option>
                      <Option value={3}>Kriteria 3</Option>
                      <Option value={4}>Kriteria 4</Option>
                      <Option value={5}>Kriteria 5</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Row>
                <Col span={24} style={{ textAlign: "right" }}>
                  <Popconfirm
                    title="Apakah data sudah benar?"
                    onConfirm={() => onSubmit()}
                    onCancel={onCanceltip}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button type="primary">Simpan</Button>
                  </Popconfirm>
                  <Button onClick={() => onCancel()}>Batal</Button>
                </Col>
              </Row>
            </Form>
          </Modal>
        </Card>
      </Fragment>
    </div>
  );
};

export default MasterKriteriaAskep;
