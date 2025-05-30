import React, { useState, useContext } from 'react';
import Column from 'antd/lib/table/Column';
import { Form, Row, Col, Input, Table, Select, DatePicker, Button, Divider, Radio, Descriptions, Checkbox, Empty, Modal } from 'antd';
import { PelayananContext } from '../../rawatjalan/context/Pelayanancontext';

const FormOrderPenunjangOperasi = () => {
    const { pelayanan, loadPelayanan } = useContext(PelayananContext);
    const [visibleLabPa, setVisibleLabPa] = useState(false);
    const [visibleLabPk, setVisibleLabPk] = useState(false);
    const [visibleRadiologi, setVisibleRadiologi] = useState(false);
    const onModalLabPa = (kode) => {
        loadPelayanan(kode);
        console.log();
        setVisibleLabPa(true);
    }
    const onModalLabPk = (kode) => {
        loadPelayanan(kode);
        console.log();
        setVisibleLabPk(true);
    }
    const onModalRadiologi = (kode) => {
        loadPelayanan(kode);
        console.log(kode);
        console.log();
        setVisibleRadiologi(true);
    }
    const handleOk = () => {
        setVisibleLabPa(false);
        setVisibleLabPk(false);
        setVisibleRadiologi(false);
    }
    // const rowSelection = {
    //     selectedRowKeys
    // };
    return (
        <div>
            <Row>
                <p>ghgghgh</p>
                <Col span={4}>
                    <Button style={{ width: '70%' }} onClick={() => onModalLabPk("9402")} >Laborat PK</Button><br></br>
                    <Button style={{ width: '70%' }} onClick={() => onModalLabPa("9403")}>Laborat PA</Button><br></br>
                    <Button style={{ width: '70%' }} onClick={() => onModalRadiologi("9401")}>Radiologi</Button><br></br>
                </Col>
                <Col span={20}>
                    <Table pagination={false} />
                </Col>
            </Row>

            {/* Modal Pemeriksaan Lab PA */}
            <Modal
                style={{ top: 5 }}
                title="Order Pemeriksaan Lab PA"
                visible={visibleLabPa}
                width="1000px"
                footer={null}
                //onOk={handleOk}
                onCancel={handleOk}
            >
                <Table
                    bordered
                    locale={{ emptyText: <Empty description='Data Lab PA Kosong' /> }}
                    pagination={false}
                    dataSource={pelayanan}
                    size="small"
                    rowKey="reg"
                    scroll={{ y: 450 }}
                //rowSelection={rowSelection}
                >
                    <Column title="Nama Pemeriksaan" key="nama"
                        render={(pelayanan) => (
                            <span>
                                {pelayanan.pelayananId}
                            </span>
                        )} />
                    <Column title="Kode Pemeriksaan" key="kode"
                        render={(pelayanan) => (
                            <span>
                                {pelayanan.deskripsi}
                            </span>
                        )} />
                </Table>
            </Modal>


            {/* Modal Pemeriksaan Lab PK*/}
            <Modal
                style={{ top: 5 }}
                title="Order Pemeriksaan Lab PK"
                visible={visibleLabPk}
                width="1000px"
                footer={null}
                //onOk={handleOk}
                onCancel={handleOk}
            >
                <Table
                    bordered
                    locale={{ emptyText: <Empty description='Data Lab PK Kosong' /> }}
                    pagination={false}
                    dataSource={pelayanan}
                    size="small"
                    rowKey="reg"
                    scroll={{ y: 450 }}
                >
                    <Column title="Nama Pemeriksaan" key="nama"
                        render={(pelayanan) => (
                            <span>
                                {pelayanan.pelayananId}
                            </span>
                        )} />
                    <Column title="Kode Pemeriksaan" key="kode"
                        render={(pelayanan) => (
                            <span>
                                {pelayanan.deskripsi}
                            </span>
                        )} />
                </Table>
            </Modal>


            {/* Modal Pemeriksaan Radiolog */}

            <Modal
                style={{ top: 5 }}
                title="Order Pemeriksaan Radiologi"
                visible={visibleRadiologi}
                width="1000px"
                footer={null}
                onCancel={handleOk}
            >
                <Table
                    bordered
                    locale={{ emptyText: <Empty description='Data Radiologi Kosong' /> }}
                    pagination={false}
                    dataSource={pelayanan}
                    size="small"
                    rowKey="reg"
                    scroll={{ y: 450 }}
                >
                    <Column title="Nama Pemeriksaan" key="nama"
                        render={(pelayanan) => (
                            <span>
                                {pelayanan.pelayananId}
                            </span>
                        )} />
                    <Column title="Kode Pemeriksaan" key="kode"
                        render={(pelayanan) => (
                            <span>
                                {pelayanan.deskripsi}
                            </span>
                        )} />
                </Table>
            </Modal>
        </div >
    )
}

export default FormOrderPenunjangOperasi
