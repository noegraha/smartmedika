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
  Popconfirm,
  message,
  Card,
  Space,
} from "antd";
import { MasterSubKategoriContext } from "../context/masteraskep/MasterSubKategoriContext";
import { MasterKategoriAskepContext } from "../context/masteraskep/MasterKategoriAskepContext";

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
};

const { Title } = Typography;

const { Column } = Table;

const MasterSubKategori = () => {
  const {
    masterSubkategori,
    insertMasterSubkategoriaskep,
    deleteMasterSubkategoriaskep,
    subKategoriId,
    setsubKategoriId,
    deskripsi,
    setDeskripsi,
    kategori,
    setKategori,
    detailsubKategoriId,
  } = useContext(MasterSubKategoriContext);
  const { masterKategori } = useContext(MasterKategoriAskepContext);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const showModal1 = (e) => {
    setVisible1(true);
    setsubKategoriId("");
    //console.log(masterKategori);
  };
  const showModal2 = (e) => {
    setVisible2(true);
    detailsubKategoriId(e);
  };
  const onSubmit = (e) => {
    insertMasterSubkategoriaskep(data);
    console.log(data);
    setVisible1(false);
    setVisible2(false);
  };
  // const onSubmitEdit = (e) => {
  //     //insertMasteraskep(data2);
  //     setVisible2(false);
  // }
  const onCancel = () => {
    setVisible1(false);
    setVisible2(false);
  };

  const onDelete = (e) => {
    deleteMasterSubkategoriaskep(e);
    //console.log(e);
  };
  const onCanceltip = () => {
    message.error("Batal disimpan!");
  };
  const cancelhapus = () => {
    message.error("Batal dihapus!");
  };
  const onDeskripsi = (e) => {
    setDeskripsi(e.target.value);
  };
  const onKategori = (e) => {
    setKategori(e);
  };
  const data = {
    subKategoriId: subKategoriId === "" ? "" : subKategoriId,
    deskripsi: deskripsi,
    kategoriId: kategori,
    status: true,
  };
  const [page, setPage] = useState(1);
  return (
    <Fragment>
      <Card
        title={<Title level={4}>DATA SUB-KATEGORI ASUHAN KEPERAWATAN</Title>}
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
                  label="KATEGORI :"
                >
                  <Select
                    showSearch
                    source={masterKategori}
                    placeholder="..."
                    optionFilterProp="children"
                    onChange={onKategori}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {masterKategori.map((d) => (
                      <Option key={d.kategoriId}>{d.deskripsi}</Option>
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
                  label="Sub-Kategori :"
                >
                  <Input onChange={(e) => onDeskripsi(e)} />
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

        <Table pagination={false} dataSource={masterSubkategori} size="small">
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
            render={(masterSubkategori) => (
              <span>{masterSubkategori.subKategoriId}</span>
            )}
          />
          <Column
            title="Sub Katgeori"
            key="diskripsi"
            width="100px"
            render={(masterSubkategori) => (
              <span>{masterSubkategori.deskripsi}</span>
            )}
          />
          <Column
            title="Katgeori"
            key="kategori"
            width="100px"
            render={(masterSubkategori) => (
              <span>{masterSubkategori.kategoriId}</span>
            )}
          />
          <Column
            title="Aksi"
            key="aksi"
            width="100px"
            render={(masterSubkategori) => (
              <Space>
                <Button
                  type="primary"
                  size="small"
                  style={{ background: "green", borderColor: "green" }}
                  onClick={(e) => showModal2(masterSubkategori.subKategoriId)}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Apakah Yakin?"
                  onConfirm={(e) => onDelete(masterSubkategori.subKategoriId)}
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
          <Row>
            <Col span={24}>
              <Form.Item {...formItemLayout} label="Kode Kategori :">
                <Input value={subKategoriId} disabled />
              </Form.Item>
              <Form.Item
                xs={2}
                sm={4}
                md={6}
                lg={8}
                xl={8}
                {...formItemLayout}
                label="Kategori :"
              >
                <Select
                  value={kategori}
                  showSearch
                  source={masterKategori}
                  placeholder="..."
                  optionFilterProp="children"
                  onChange={onKategori}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {masterKategori.map((d) => (
                    <Option key={d.kategoriId}>{d.deskripsi}</Option>
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
                label="Sub-Kategori :"
              >
                <Input value={deskripsi} onChange={(e) => onDeskripsi(e)} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button type="primary" onClick={onSubmit}>Simpan</Button>
              <Button onClick={() => onCancel()}>Batal</Button>
            </Col>
          </Row>
        </Modal>
      </Card>
    </Fragment>
  );
};

export default MasterSubKategori;
