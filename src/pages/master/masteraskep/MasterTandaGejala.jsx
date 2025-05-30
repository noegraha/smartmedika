import React, { Fragment, useState, useContext } from "react";
import {
  Modal,
  Button,
  Typography,
  Table,
  Form,
  Select,
  Col,
  Row,
  Input,
  message,
  Popconfirm,
  Card,
  Space,
} from "antd";
import { MasterTandaGejalaContext } from "../context/masteraskep/MasterTandaGejalaContext";
import { MasterDiagnosaAskepContext } from "../context/masteraskep/MasterDiagnosaAskepContext";

const formItemLayout = {
  labelCol: { span: 4 },
};
const { Option } = Select;
const { Title } = Typography;
const { Column } = Table;
const MasterTandaGejala = () => {
  const { dxaskep } = useContext(MasterDiagnosaAskepContext);
  const {
    tandagejala,
    insertMasterTandaGejala,
    deleteMasterTandaGelaja,
    detailTndaGejalaId,
    tandaGejalaId,
    settandaGejalaId,
    deskripsi,
    setdeskripsi,
    tandaGejalaSnomedId,
    settandaGejalaSnomedId,
    deskripsiSnomed,
    setdeskripsiSnomed,
    diagnosaId,
    setdiagnosaId,
  } = useContext(MasterTandaGejalaContext);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const showModal1 = (e) => {
    setVisible1(true);
    settandaGejalaId("");
  };
  const showModal2 = (e) => {
    setVisible2(true);
    detailTndaGejalaId(e);
  };
  const onSubmit = (e) => {
    insertMasterTandaGejala(data);
    console.log(data);
    setVisible1(false);
    setVisible2(false);
  };
  const onCancel = () => {
    setVisible1(false);
    setVisible2(false);
  };
  const onDelete = (e) => {
    deleteMasterTandaGelaja(e);
  };
  const onCanceltip = () => {
    message.error("Batal disimpan!");
  };
  const cancelhapus = () => {
    message.error("Batal dihapus!");
  };
  const onDeskripsi = (e) => {
    setdeskripsi(e.toString());
    console.log(e.toString())
  };
  const onDiagnosa = (e) => {
    setdiagnosaId(e);
  };
  const onSnomedID = (e) => {
    settandaGejalaSnomedId(e.target.value);
  };
  const onDesksonmed = (e) => {
    setdeskripsiSnomed(e.target.value);
  };
  const data = {
    tandaGejalaId: tandaGejalaId === "" ? "" : tandaGejalaId,
    deskripsi: deskripsi,
    tandaGejalaSnomedId: tandaGejalaSnomedId,
    deskripsiSnomed: deskripsiSnomed,
    diagnosaId: diagnosaId,
    status: true,
  };
  const [page, setPage] = useState(1);
  return (
    <Fragment>
      <Card
        title={<Title level={4}>DATA TANDA GEJALA ASUHAN KEPERAWATAN</Title>}
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
                  label="Tanda Gejala :"
                >
                  <Select
                    //className="ant-select-selection"
                    //value={tandagejala}
                    //style={{ width: '100 %' }}
                    // onFocus={onfocusTgejala}
                    style={{ width: '100%', maxWidth: '78vw' }}
                    mode="tags"
                    showSearch
                    source={tandagejala}
                    onChange={onDeskripsi}
                    //tokenSeparators={[',']}
                    placeholder="..."
                    filterOption={(input, option) =>
                      option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {tandagejala.map(b => (
                      <Option key={b.deskripsi}>{b.deskripsi}</Option>
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
                  label="Tanda Gejala Snomed ID :"
                >
                  <Input onChange={(e) => onSnomedID(e)} />
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
                  <Input onChange={(e) => onDesksonmed(e)} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={onSubmit}>Simpan</Button>
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
          dataSource={tandagejala}
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
            render={(tandagejala) => <span>{tandagejala.tandaGejalaId}</span>}
          />
          <Column
            title="Tanda Gejala"
            key="reg"
            width="100px"
            render={(tandagejala) => <span>{tandagejala.deskripsi}</span>}
          />
          <Column
            title="Diagnosa"
            key="reg"
            width="100px"
            render={(tandagejala) => <span>{tandagejala.diagnosaId}</span>}
          />
          <Column
            title="Aksi"
            key="reg"
            width="100px"
            render={(tandagejala) => (
              <Space>
                <Button
                  type="primary"
                  size="small"
                  style={{ background: "green", borderColor: "green" }}
                  onClick={(e) => showModal2(tandagejala.tandaGejalaId)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Apakah Yakin?"
                  onConfirm={(e) => onDelete(tandagejala.tandaGejalaId)}
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
                  label="Tanda Gejala :"
                >
                  <Input value={tandaGejalaId} disabled />
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
                  label="Tanda Gejala :"
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
                  label="Tanda Gejala Snomed ID :"
                >
                  <Input
                    value={tandaGejalaSnomedId}
                    onChange={(e) => onSnomedID(e)}
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
                    onChange={(e) => onDesksonmed(e)}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={onSubmit}>Simpan</Button>
                <Button onClick={() => onCancel()}>Batal</Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card>
    </Fragment>
  );
};

export default MasterTandaGejala;
