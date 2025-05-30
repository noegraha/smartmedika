import React, { Fragment, useState, useContext } from "react";
import {
  Typography,
  Table,
  Form,
  Input,
  Button,
  Col,
  Row,
  Modal,
  Popconfirm,
  message,
  Select,
  Card,
  Space,
} from "antd";
import { MasterIntervensiAskepContext } from "../context/masteraskep/MasterIntervensiAskepContext";
import { MasterDiagnosaAskepContext } from "../context/masteraskep/MasterDiagnosaAskepContext";

const formItemLayout = {
  labelCol: { span: 4 },
};
const { Option } = Select;
const { Title } = Typography;
const { Column } = Table;
const MasterIntervensiAskep = () => {
  const { dxaskep } = useContext(MasterDiagnosaAskepContext);
  const {
    intervensi,
    insertMasterintervensiaskep,
    deleteMasterIntervensiaskep,
    detailIntervensiId,
    intervensiId,
    setintervensiId,
    intervensiSikiId,
    setintervensiSikiId,
    deskripsi,
    setdeskripsi,
    intervensiSnomedId,
    setintervensiSnomedId,
    deskripsiSnomed,
    setdeskripsiSnomed,
    diagnosaId,
    setdiagnosaId,
  } = useContext(MasterIntervensiAskepContext);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const showModal1 = (e) => {
    setVisible1(true);
    setintervensiId(0);
  };
  const showModal2 = (e) => {
    setVisible2(true);
    detailIntervensiId(e);
  };
  const onSubmit = (e) => {
    insertMasterintervensiaskep(data);
    console.log(data);
    setVisible1(false);
    setVisible2(false);
  };
  const onCancel = () => {
    setVisible1(false);
    setVisible2(false);
  };
  const onDelete = (e) => {
    deleteMasterIntervensiaskep(e);
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
  const onDiagnosa = (e) => {
    setdiagnosaId(e);
  };
  const onISnomedid = (e) => {
    setintervensiSnomedId(e.target.value);
  };
  const onSikiId = (e) => {
    setintervensiSikiId(e.target.value);
  };
  const onDeskripsisnomed = (e) => {
    setdeskripsiSnomed(e.target.value);
  };
  const data = {
    intervensiId: intervensiId === "" ? 0 : intervensiId,
    intervensiSikiId: intervensiSikiId,
    deskripsi: deskripsi,
    intervensiSnomedId: intervensiSnomedId,
    deskripsiSnomed: deskripsiSnomed,
    diagnosaId: diagnosaId,
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
                    label="Diagnosa :"
                  >
                    <Select
                      showSearch
                      source={dxaskep}
                      placeholder="..."
                      optionFilterProp="children"
                      onChange={onDiagnosa}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dxaskep.map((d) => (
                        <Option key={d.diagnosaId}>{d.deskripsi}</Option>
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
                    label="SIKI ID :"
                  >
                    <Input onChange={(e) => onSikiId(e)} />
                  </Form.Item>
                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="Deskripsi :"
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
                    label="Intervensi Snomed ID :"
                  >
                    <Input onChange={(e) => onISnomedid(e)} />
                  </Form.Item>

                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="Deskripsi Snomed :"
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
            dataSource={intervensi}
            size="small"
          >
            <Column
              title="No."
              key="reg"
              className="tabeltabel2"
              width="20px"
              render={(text, record, index) => (
                <span>{(page - 1) * 10 + index + 1}</span>
              )}
            />
            <Column
              title="Kode"
              key="reg"
              width="2px"
              render={(intervensi) => (
                <span>{intervensi.intervensiSikiId}</span>
              )}
            />
            <Column
              title="Intervensi"
              key="reg"
              width="100px"
              render={(intervensi) => <span>{intervensi.deskripsi}</span>}
            />
            <Column
              title="Diagnosa"
              key="reg"
              width="100px"
              render={(intervensi) => <span>{intervensi.diagnosaId}</span>}
            />
            <Column
              title="Aksi"
              key="reg"
              width="100px"
              render={(intervensi) => (
                <Space>
                  <Button
                    type="primary"
                    size="small"
                    style={{ background: "green", borderColor: "green" }}
                    onClick={(e) => showModal2(intervensi.intervensiId)}
                  >
                    Edit
                  </Button>
                  <Popconfirm
                    title="Apakah Yakin?"
                    onConfirm={(e) => onDelete(intervensi.intervensiId)}
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
                    label="Kode SIKI :"
                  >
                    <Input value={intervensiId} disabled />
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
                    <Select
                      value={diagnosaId}
                      showSearch
                      source={dxaskep}
                      placeholder="..."
                      optionFilterProp="children"
                      onChange={onDiagnosa}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dxaskep.map((d) => (
                        <Option key={d.diagnosaId}>{d.deskripsi}</Option>
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
                    label="SIKI ID :"
                  >
                    <Input
                      value={intervensiSikiId}
                      onChange={(e) => onSikiId(e)}
                    />
                  </Form.Item>
                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="Deskripsi :"
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
                    label="Intervensi Snomed ID :"
                  >
                    <Input
                      value={intervensiSnomedId}
                      onChange={(e) => onISnomedid(e)}
                    />
                  </Form.Item>

                  <Form.Item
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    {...formItemLayout}
                    label="Deskripsi Snomed :"
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
    </div>
  );
};

export default MasterIntervensiAskep;
