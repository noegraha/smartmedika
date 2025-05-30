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
import { MasterSubKategoriContext } from "../context/masteraskep/MasterSubKategoriContext";
import { MasterDiagnosaAskepContext } from "../context/masteraskep/MasterDiagnosaAskepContext";


const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
};

const { Title } = Typography;

const MasterDiagnosaAskep = () => {
  const { Column } = Table;
  const { masterSubkategori } = useContext(MasterSubKategoriContext);
  const {
    dxaskep,
    deleteMastedxaskep,
    insertMasterdxiaskep,
    detaildxaskepId,
    diagnosaId,
    setdiagnosaId,
    deskripsi,
    setdeskripsi,
    definisi,
    setdefinisi,
    diagnosaSnomedId,
    setdiagnosaSnomedId,
    deskripsiSnomed,
    setdeskripsiSnomed,
    subKategoriId,
    setsubKategoriId,
  } = useContext(MasterDiagnosaAskepContext);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const showModal1 = (e) => {
    setVisible1(true);
    setdiagnosaId(null);
    //console.log(masterKategori);
  };
  const showModal2 = (e) => {
    setVisible2(true);
    detaildxaskepId(e);
  };
  const onSubmit = (e) => {
    insertMasterdxiaskep(data);
    console.log(data);
    setVisible1(false);
    setVisible2(false);
  };
  const onCancel = () => {
    setVisible1(false);
    setVisible2(false);
  };

  const onDelete = (e) => {
    deleteMastedxaskep(e);
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
  const onSubkategori = (e) => {
    setsubKategoriId(e);
  };
  const onDefinisi = (e) => {
    setdefinisi(e.target.value);
  };
  const onSnomedid = (e) => {
    setdiagnosaSnomedId(e.target.value);
  };
  const onDeskripsisnomed = (e) => {
    setdeskripsiSnomed(e.target.value);
  };
  const data = {
    diagnosaId: diagnosaId === "" ? null : diagnosaId,
    deskripsi: deskripsi,
    definisi: definisi,
    diagnosaSnomedId: diagnosaSnomedId,
    deskripsiSnomed: deskripsiSnomed,
    subKategoriId: subKategoriId,
    status: true,
  };
  const [page, setPage] = useState(1);
  return (
    <Fragment>
      <Card
        title={<Title level={4}>DATA DIAGNOSA ASUHAN KEPERAWATAN</Title>}
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
          title="Tambah Diagnosa Askep"
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
                  label="Sub-Kategori :"
                >
                  <Select
                    showSearch
                    source={masterSubkategori}
                    placeholder="..."
                    optionFilterProp="children"
                    onChange={onSubkategori}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {masterSubkategori.map((d) => (
                      <Option key={d.subKategoriId}>{d.deskripsi}</Option>
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
                  label="Diagnosa :"
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
                  label="Definisi :"
                >
                  <Input onChange={(e) => onDefinisi(e)} />
                </Form.Item>
                <Form.Item
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  {...formItemLayout}
                  label="Kode Snomed :"
                >
                  <Input onChange={(e) => onSnomedid(e)} />
                </Form.Item>

                <Form.Item
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  {...formItemLayout}
                  label="Snomed :"
                >
                  <Input onChange={(e) => onDeskripsisnomed(e)} />
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
          dataSource={dxaskep}
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
            render={(dxaskep) => <span>{dxaskep.diagnosaId}</span>}
          />
          <Column
            title="Diagnosa"
            key="reg"
            width="100px"
            render={(dxaskep) => <span>{dxaskep.deskripsi}</span>}
          />
          <Column
            title="Sub Kategori"
            key="reg"
            width="5px"
            render={(dxaskep) => <span>{dxaskep.subKategoriId}</span>}
          />
          <Column
            title="Keterangan"
            key="reg"
            width="100px"
            render={(dxaskep) => <span>{dxaskep.definisi}</span>}
          />
          <Column
            title="Aksi"
            key="reg"
            width="100px"
            render={(dxaskep) => (
              <Space>
                <Button
                  type="primary"
                  size="small"
                  style={{ background: "green", borderColor: "green" }}
                  onClick={(e) => showModal2(dxaskep.diagnosaId)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Apakah Yakin?"
                  onConfirm={(e) => onDelete(dxaskep.diagnosaId)}
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
          title="Tambah Sub-Kategori"
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
                  label="Diagnosa :"
                >
                  <Input value={diagnosaId} disabled />
                </Form.Item>
                <Form.Item
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  {...formItemLayout}
                  label="Sub-Kategori :"
                >
                  <Select
                    value={subKategoriId}
                    showSearch
                    source={masterSubkategori}
                    placeholder="..."
                    optionFilterProp="children"
                    onChange={onSubkategori}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {masterSubkategori.map((d) => (
                      <Option key={d.subKategoriId}>{d.deskripsi}</Option>
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
                  label="Diagnosa :"
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
                  label="Definisi :"
                >
                  <Input value={definisi} onChange={(e) => onDefinisi(e)} />
                </Form.Item>
                <Form.Item
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  {...formItemLayout}
                  label="Kode Snomed :"
                >
                  <Input
                    value={diagnosaSnomedId}
                    onChange={(e) => onSnomedid(e)}
                  />
                </Form.Item>

                <Form.Item
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  {...formItemLayout}
                  label="Snomed :"
                >
                  <Input
                    value={deskripsiSnomed}
                    onChange={(e) => onDeskripsisnomed(e)}
                  />
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
  );
};

export default MasterDiagnosaAskep;
