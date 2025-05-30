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
import { MasterImplementasiAskepContext } from "../context/masteraskep/MasterImplementasiAskepContext";
import { MasterDiagnosaAskepContext } from "../context/masteraskep/MasterDiagnosaAskepContext";

const formItemLayout = {
    labelCol: { span: 4 },
};
const { Option } = Select;
const { Title } = Typography;
const { Column } = Table;

const MasterImplementasiAskep = () => {
    const { intervensi, getintervensibydx, intervensibydx } = useContext(MasterIntervensiAskepContext);
    const { dxaskep } = useContext(MasterDiagnosaAskepContext);
    const { listImplementasiAskep, setListImplementasiAskep,
        implementasiId, setimplementasiId,
        deskripsiImplementasi, setdeskripsiImplementasi,
        intervensiIdImplementasi, setintervensiIdImplementasi,
        detailMasterimplementasiaskep, insertMasterimplementasiiaskep, deleteMasteimplementasiaskep, detailimplementasiaskepId } = useContext(MasterImplementasiAskepContext);
    const [visible1, setVisible1] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const showModal1 = (e) => {
        setVisible1(true);
        setimplementasiId(0);
    };
    const showModal2 = (e) => {
        setVisible2(true);
        detailimplementasiaskepId(e);
    };
    const onSubmit = (e) => {
        //insertMasterimplementasiiaskep(data);
        console.log(data);
        setVisible1(false);
        setVisible2(false);
    };
    const onCancel = () => {
        setVisible1(false);
        setVisible2(false);
    };
    const onDelete = (e) => {
        deleteMasteimplementasiaskep(e);
    };
    const onCanceltip = () => {
        message.error("Batal disimpan!");
    };
    const cancelhapus = () => {
        message.error("Batal dihapus!");
    };
    const data = {
        implementasiId: implementasiId,
        deskripsi: deskripsiImplementasi,
        intervensiId: parseInt(intervensiIdImplementasi),
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
                                            //value={diagnosaId}
                                            showSearch
                                            source={dxaskep}
                                            placeholder="..."
                                            optionFilterProp="children"
                                            onChange={(e) => {
                                                getintervensibydx(e);
                                                console.log(e);
                                            }}
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
                                        label="Intervensi :"
                                    >
                                        <Select
                                            showSearch
                                            source={intervensibydx}
                                            placeholder="..."
                                            optionFilterProp="children"
                                            onChange={(e) => { setintervensiIdImplementasi(e) }}
                                            filterOption={(input, option) =>
                                                option.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {intervensibydx.map((d) => (
                                                <Option key={d.intervensiId}>{d.deskripsi}</Option>
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
                                        label="Deskripsi :"
                                    >
                                        <Input onChange={(e) => setdeskripsiImplementasi(e.target.value)} />
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
                        dataSource={listImplementasiAskep}
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
                            render={(listImplementasiAskep) => (
                                <span>{listImplementasiAskep.implementasiId}</span>
                            )}
                        />
                        <Column
                            title="Intervensi"
                            key="reg"
                            width="100px"
                            render={(listImplementasiAskep) => <span>{listImplementasiAskep.deskripsi}</span>}
                        />
                        <Column
                            title="Diagnosa"
                            key="reg"
                            width="100px"
                            render={(listImplementasiAskep) => <span>{listImplementasiAskep.intervensiId}</span>}
                        />
                        <Column
                            title="Aksi"
                            key="reg"
                            width="100px"
                            render={(listImplementasiAskep) => (
                                <Space>
                                    <Button
                                        type="primary"
                                        size="small"
                                        style={{ background: "green", borderColor: "green" }}
                                        onClick={(e) => showModal2(listImplementasiAskep.implementasiId)}
                                    >
                                        Edit
                  </Button>
                                    <Popconfirm
                                        title="Apakah Yakin?"
                                        onConfirm={(e) => onDelete(listImplementasiAskep.implementasiId)}
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
                                        label="Kode Implementasi :"
                                    >
                                        <Input value={implementasiId} disabled />
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
                                        <Input
                                            value={deskripsiImplementasi}
                                            onChange={(e) => setdeskripsiImplementasi(e.target.value)}
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        xs={2}
                                        sm={4}
                                        md={6}
                                        lg={8}
                                        xl={8}
                                        {...formItemLayout}
                                        label="Intervensi :"
                                    >
                                        <Select
                                            value={intervensiIdImplementasi}
                                            showSearch
                                            source={intervensi}
                                            placeholder="..."
                                            optionFilterProp="children"
                                            onChange={(e) => { setintervensiIdImplementasi(e) }}
                                            filterOption={(input, option) =>
                                                option.children
                                                    .toLowerCase()
                                                    .indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            {intervensi.map((d) => (
                                                <Option key={d.intervensiId}>{d.deskripsi}</Option>
                                            ))}
                                        </Select>
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
        </div>
    )
}

export default MasterImplementasiAskep
