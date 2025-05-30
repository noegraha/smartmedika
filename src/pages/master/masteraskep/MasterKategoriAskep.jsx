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
  Card,
  Space,
} from "antd";
import { MasterKategoriAskepContext } from "../context/masteraskep/MasterKategoriAskepContext";

const formItemLayout = {
  labelCol: { span: 4 },
};
const { Title } = Typography;
const { Column } = Table;
const MasterKategoriAskep = () => {
  const {
    masterKategori,
    deleteMasterkategoriaskep,
    insertMasterkategoriaskep,
    detailKategoriId,
    deskripsi,
    setdeskripsi,
    kategoriId,
    setkategoriId,
  } = useContext(MasterKategoriAskepContext);
  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);

  const data = {
    kategoriId: kategoriId === "" ? "" : kategoriId,
    deskripsi: deskripsi,
    status: true,
  };
  const showModal1 = (e) => {
    setVisible1(true);
    setkategoriId("");
  };
  const showModal2 = (idkategori) => {
    detailKategoriId(idkategori);
    setVisible2(true);
  };
  const onSubmit = (e) => {
    insertMasterkategoriaskep(data);
    setVisible1(false);
    console.log(data);
  };
  const onSubmitEdit = (e) => {
    insertMasterkategoriaskep(data);
    console.log(data);
    setVisible2(false);
  };
  const onCancel = () => {
    setVisible1(false);
    setVisible2(false);
  };
  const onDeskripsi = (e) => {
    setdeskripsi(e.target.value);
  };
  const onDelete = (e) => {
    deleteMasterkategoriaskep(e);
  };
  const onCanceltip = () => {
    message.error("Batal disimpan!");
  };
  const cancelhapus = () => {
    message.error("Batal dihapus!");
  };
  const [page, setPage] = useState(1);

  return (
    <Fragment>
      <Card
        title={<Title level={4}>DATA KATEGORI ASUHAN KEPERAWATAN</Title>}
        extra={
          <Button type="primary" onClick={(e) => showModal1(e)}>
            Tambah
          </Button>
        }
      >
        <Row>
          <Col>
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
                      label="Kategori :"
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

                {/* <Button style={{ marginLeft: '5px' }} type="primary" icon={<SearchOutlined />}>Search</Button> */}
              </Form>
            </Modal>
          </Col>
        </Row>
        <Table pagination={false} dataSource={masterKategori} size="small">
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
            render={(masterKategori) => (
              <span>{masterKategori.kategoriId}</span>
            )}
          />
          <Column
            title="Kategori"
            key="reg"
            width="100px"
            render={(masterKategori) => <span>{masterKategori.deskripsi}</span>}
          />
          <Column
            title="Aksi"
            key="reg"
            width="100px"
            render={(masterKategori) => (
              <Space>
                <Button
                  type="primary"
                  size="small"
                  style={{ background: "green", borderColor: "green" }}
                  onClick={(e) => showModal2(masterKategori.kategoriId)}
                >
                  Edit
                </Button>

                <Popconfirm
                  title="Apakah Yakin?"
                  onConfirm={(e) => onDelete(masterKategori.kategoriId)}
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
                <Form.Item {...formItemLayout} label="Kode Kategori :">
                  <Input value={kategoriId} disabled />
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
                  <Input onChange={(e) => onDeskripsi(e)} value={deskripsi} />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={onSubmitEdit}>Simpan</Button>
                <Button onClick={() => onCancel()}>Batal</Button>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Card>
    </Fragment>
  );
};

export default MasterKategoriAskep;
