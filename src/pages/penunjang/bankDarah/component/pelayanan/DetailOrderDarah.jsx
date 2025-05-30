import { CloudDownloadOutlined, DeleteOutlined, FileSearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Input, InputNumber, Row, Select, Spin, Table } from 'antd'
import React, { useContext } from 'react'
import { BankDarahContext } from '../../context/BankDarahContext';

const { Option } = Select;

const DetailOrderDarah = () => {
    const {
        dtOrder,
        spDetailOrder,
        ktgjnsDarah,
    } = useContext(BankDarahContext)

    const columns = [
        {
            title: 'Jenis Darah',
            dataIndex: 'JenisDarah',
            key: 'JenisDarah',
            render: (jenisDarah) => {
                const matchingData = ktgjnsDarah.find((item) => item.id === jenisDarah);
                return matchingData ? matchingData.desk : 'Tidak ditemukan';
            },
        },
        {
            title: 'Kantong',
            dataIndex: 'JmlKantong',
            key: 'JmlKantong',
            align: 'center',
            width: 50,
        },
    ];

    return (
        <div>
            <Divider
                orientation='left'
                style={{ backgroundColor: '#b7eb8f', margin: '0px' }}>
                Detail Order
            </Divider>

            <Spin spinning={spDetailOrder}>
                <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                    <Col span={7}>
                        <span>No Order :</span>
                    </Col>
                    <Col span={17}>
                        <Input placeholder="..."
                            value={dtOrder.NoOrder}
                            readOnly
                            maxLength={100}
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={7}>
                        Unit Order :
                    </Col>
                    <Col span={17}>
                        <Input placeholder="..."
                            value={dtOrder.UnitAsal + "  -  " + dtOrder.DeskAsal}
                            readOnly
                            maxLength={100}
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={7}>
                        Unit Tujuan :
                    </Col>
                    <Col span={17}>
                        <Input placeholder="..."
                            value={dtOrder.UnitTujuan + "  -  " + dtOrder.DeskTujuan}
                            readOnly
                            maxLength={100}
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={7}>
                        Diagnosis :
                    </Col>
                    <Col span={17}>
                        <Input placeholder="..."
                            value={dtOrder.DiagnosaPasien}
                            readOnly
                            maxLength={100}
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={7}>
                        Hb :
                    </Col>
                    <Col span={5}>
                        <InputNumber
                            addonAfter="g/dL"
                            readOnly
                            value={dtOrder.Hb}
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col span={5} style={{ alignItems: 'center' }}>
                        <span style={{ marginLeft: '20px' }}>Trombosit :</span>
                    </Col>
                    <Col span={7}>
                        <InputNumber
                            value={dtOrder.Trombosit}
                            addonAfter="/mm³"
                            readOnly
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={7}>
                        Gol.Darah Pasien :
                    </Col>
                    <Col span={17}>
                        <Input.Group compact>
                            <Input placeholder="..."
                                value={dtOrder.GolonganDarahPx}
                                readOnly
                                style={{ width: '70%' }} />
                            <Button
                                type="primary"
                                style={{ width: "30%" }}
                                disabled
                                icon={<FileSearchOutlined />}
                            />
                        </Input.Group>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={7}>
                        <span>Permintaan Gol.Darah :</span>
                    </Col>
                    <Col span={3}>
                        <Input placeholder="..."
                            value={dtOrder.GolonganDarahOrder}
                            readOnly
                            style={{ width: '100%' }} />
                    </Col>
                    <Col span={14}>
                        <Input placeholder="Keterangan Beda Gol.Darah"
                            value={dtOrder.KetBedaGolongan}
                            readOnly
                            style={{ width: '96%', marginLeft: '10px' }} />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={7}>
                        Volume Sample :
                    </Col>
                    <Col span={5}>
                        <InputNumber
                            min={0}
                            max={999}
                            addonAfter="cc"
                            value={dtOrder.VolumeSample}
                            readOnly
                            style={{ width: '100%' }} />
                    </Col>
                    <Col span={7}>
                        <span style={{ marginLeft: '20px' }}>Kondisi Sample :</span>
                    </Col>
                    <Col span={5}>
                        <Input placeholder="..."
                            value={dtOrder.KondisiSample}
                            readOnly
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={7}>
                        Indikasi Transfusi :
                    </Col>
                    <Col span={17}>
                        <Input placeholder="..."
                            value={dtOrder.IndikasiTransfusi}
                            readOnly
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={7}>
                        Dokter yang meminta :
                    </Col>
                    <Col span={17}>
                        <Input placeholder="..."
                            value={dtOrder.NamaDokter}
                            readOnly
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={24}>
                        Jenis Darah yang Diminta :
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={22} offset={1}>
                        <Table
                            bordered
                            // loading={spTbPasien}
                            columns={columns}
                            dataSource={dtOrder.DetailOrder}
                            pagination={false}
                        />
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default DetailOrderDarah