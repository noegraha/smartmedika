import { Button, Card, Checkbox, Col, DatePicker, Input, Row, Select, Space, Table } from 'antd'
import { RightOutlined } from '@ant-design/icons';
import React from 'react'

const { Option } = Select;
const { TextArea } = Input;

const FormQcPenyinaran = () => {
    const columns = [
        {
            title: 'Dosis',
            dataIndex: 'VOLUME',
            key: 'VOLUME',
            width: '100px',
        },
    ];

    const columnsa = [
        {
            title: 'Dosis Total',
            dataIndex: 'VOLUME',
            key: 'VOLUME',
            width: '100px',
        },
    ];

    return (
        <div>
            <Card>
                <Row>
                    <Col span={3}>
                        <span>Diagnosa :</span>
                    </Col>
                    <Col span={21}>
                        <Input size='small' />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Planning :</span>
                    </Col>
                    <Col span={21}>
                        <Select
                            allowClear
                            size='small'
                            style={{ width: '50%' }}
                        >
                            <Option value="PLANNING 1">PLANNING 1</Option>
                            <Option value="PLANNING 2">PLANNING 2</Option>
                            <Option value="PLANNING 3">PLANNING 3</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Dokter :</span>
                    </Col>
                    <Col span={21}>
                        <Select
                            allowClear
                            size='small'
                            style={{ width: '50%' }}
                        >
                            <Option value="1">Opt 1</Option>
                            <Option value="2">Opt 2</Option>
                            <Option value="3">Opt 3</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Tanggal :</span>
                    </Col>
                    <Col span={21}>
                        <DatePicker
                            // value={moment(tglPelayanan)}
                            // onChange={(e) => changeTgl(e)}
                            // disabledDate={(current) => {
                            //     let customDate = moment().format("YYYY-MM-DD");
                            //     return current && current < moment(customDate, "YYYY-MM-DD");
                            // }}
                            size='small'
                            format='DD-MM-YYYY'
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '50%' }} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Teknik Penyinaran :</span>
                    </Col>
                    <Col span={9}>
                        <Select
                            allowClear
                            size='small'
                            style={{ width: '100%' }}
                        >
                            <Option value="SSD">SSD</Option>
                            <Option value="SAD">SAD</Option>
                        </Select>
                    </Col>
                    <Col span={12}>
                        <Space style={{ marginLeft: '15px' }}>
                            <Checkbox
                            // checked={clKepala}
                            // onChange={(e) => onChangeClKepala(e.target.checked)}
                            // onChange={(e) => setclKepala(e.target.checked)}
                            >
                                80 cm
                            </Checkbox>
                            <Checkbox
                            // checked={clThorax}
                            // onChange={(e) => setclThorax(e.target.checked)}
                            >
                                2D
                            </Checkbox>
                            <Checkbox
                            // checked={clPelvis}
                            // onChange={(e) => setclPelvis(e.target.checked)}
                            >
                                3D-CRT
                            </Checkbox>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Pesawat :</span>
                    </Col>
                    <Col span={9} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Select
                            allowClear
                            size='small'
                            style={{ width: '100%' }}
                        >
                            <Option value="Cobalt-60">Cobalt-60</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '15px' }} >Separasi :</span>
                    </Col>
                    <Col span={9}>
                        <Input addonAfter='cm' size='small' style={{ width: '30%' }} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Lokalisasi :</span>
                    </Col>
                    <Col span={9} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Select
                            allowClear
                            size='small'
                            style={{ width: '100%' }}
                        >
                            <Option value="SIMULATOR">SIMULATOR</Option>
                            <Option value="CT-SIM">CT-SIM</Option>
                        </Select>
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '15px' }} >Area Radiasi :</span>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Hitung Dosis :</span>
                    </Col>
                    <Col span={9} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Select
                            allowClear
                            size='small'
                            style={{ width: '100%' }}
                        >
                            <Option value="MANUAL">MANUAL</Option>
                            <Option value="TPS">TPS</Option>
                        </Select>
                    </Col>
                    <Col span={4}>
                        <Checkbox style={{ marginLeft: '15px' }}>
                            1 Lap.
                        </Checkbox>
                    </Col>
                    <Col span={4}>
                        <Checkbox>
                            2 Lap. Ka-Ki
                        </Checkbox>
                    </Col>
                    <Col span={4}>
                        <Checkbox>
                            1 Tangesial
                        </Checkbox>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={12} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Space>
                            <span>Kesesuaian Waktu Penyinaran</span>
                            <Checkbox />
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Checkbox style={{ marginLeft: '15px' }}>
                            2 Lap. D-B
                        </Checkbox>
                    </Col>
                    <Col span={4}>
                        <Checkbox>
                            &#62; 2 Lap.
                        </Checkbox>
                    </Col>
                    <Col span={4}>
                        <Checkbox>
                            Axial
                        </Checkbox>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        Verifikasi :
                    </Col>
                    <Col span={9} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Space>
                            <Checkbox>
                                Film
                            </Checkbox>
                            <Checkbox>
                                Simulator
                            </Checkbox>
                        </Space>
                    </Col>
                    <Col span={12}>
                        <span style={{ marginLeft: '15px' }}>
                            Sudut Gantry :
                        </span>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        Luas Lap. Penyinaran :
                    </Col>
                    <Col span={9} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Checkbox>
                            Sesuai dengan Foto Simulator
                        </Checkbox>
                    </Col>
                    <Col span={4}>
                        <Space>
                            <span style={{ marginLeft: '15px' }}>
                                1.
                            </span>
                            <Input addonAfter='&#176;' size='small' />
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Space>
                            <span style={{ marginLeft: '15px' }}>
                                2.
                            </span>
                            <Input addonAfter='&#176;' size='small' />
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Space>
                            <span style={{ marginLeft: '15px' }}>
                                3.
                            </span>
                            <Input addonAfter='&#176;' size='small' />
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                    </Col>
                    <Col span={9} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Checkbox>
                            Sesuai Planning (TPS)
                        </Checkbox>
                    </Col>
                    <Col span={4}>
                        <Space>
                            <span style={{ marginLeft: '15px' }}>
                                4.
                            </span>
                            <Input addonAfter='&#176;' size='small' />
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Space>
                            <span style={{ marginLeft: '15px' }}>
                                5.
                            </span>
                            <Input addonAfter='&#176;' size='small' />
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Space>
                            <span style={{ marginLeft: '15px' }}>
                                6.
                            </span>
                            <Input addonAfter='&#176;' size='small' />
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        Alat Bantu :
                    </Col>
                    <Col span={9} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Space>
                            <Checkbox>
                                Wedge
                            </Checkbox>
                            <Select defaultValue="1" size='small' style={{ width: '150px' }}>
                                <Option value="1">Opt 1</Option>
                                <Option value="2">Opt 2</Option>
                                <Option value="3">Opt 3</Option>
                            </Select>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                    </Col>
                    <Col span={9} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Checkbox>
                            Bolus
                        </Checkbox>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                    </Col>
                    <Col span={9} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Checkbox>
                            Blok
                        </Checkbox>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        Dosis/ Fraksi :
                    </Col>
                    <Col span={5}>
                        <Space>
                            <Select defaultValue="1" size='small' style={{ width: '125px' }}>
                                <Option value="1">Opt 1</Option>
                                <Option value="2">Opt 2</Option>
                                <Option value="3">Opt 3</Option>
                            </Select>
                            <span>Gy</span>
                            <Button icon={<RightOutlined />} />
                        </Space>
                    </Col>
                    <Col span={4} style={{ borderRight: '2px solid #bfbfbf', paddingRight: '5px' }}>
                        <Table
                            // onRow={(record) => {
                            //     return {
                            //         onClick: () => {
                            //             klikRowRiwayat(record.NOREG);
                            //             // setnoReg(record.NOREG);
                            //             // getDataPasiendanStatusRd(record.NOREG);
                            //         },
                            //     };
                            // }}
                            columns={columns}
                            // dataSource={listRiwayat}
                            size='small'
                            bordered
                            pagination={false} />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '15px' }}>
                            Dosis Total :
                        </span>
                    </Col>
                    <Col span={5}>
                        <Space>
                            <Select defaultValue="1" size='small' style={{ width: '125px' }}>
                                <Option value="1">Opt 1</Option>
                                <Option value="2">Opt 2</Option>
                                <Option value="3">Opt 3</Option>
                            </Select>
                            <span>Gy</span>
                            <Button icon={<RightOutlined />} />
                        </Space>
                    </Col>
                    <Col span={4}>
                        <Table
                            // onRow={(record) => {
                            //     return {
                            //         onClick: () => {
                            //             klikRowRiwayat(record.NOREG);
                            //             // setnoReg(record.NOREG);
                            //             // getDataPasiendanStatusRd(record.NOREG);
                            //         },
                            //     };
                            // }}
                            columns={columnsa}
                            // dataSource={listRiwayat}
                            size='small'
                            bordered
                            pagination={false} />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Keterangan :</span>
                    </Col>
                    <Col span={21}>
                        <TextArea
                            rows={4}
                            size='small' />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Fisika Medis :</span>
                    </Col>
                    <Col span={9}>
                        <Select defaultValue="1" size='small' style={{ width: '100%' }}>
                            <Option value="1">Opt 1</Option>
                            <Option value="2">Opt 2</Option>
                            <Option value="3">Opt 3</Option>
                        </Select>
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col>
                        <Space>
                            <Button type='primary' style={{ width: '150px' }}>
                                Lihat Riwayat
                            </Button>
                            <Button type='primary' style={{ width: '150px' }}>
                                Kosongkan Form
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={24}>
                        <TextArea
                            rows={4}
                            size='small' />
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button style={{ width: '75px' }}>Cetak</Button>
                            <Button type='primary' style={{ width: '75px' }}>Simpan</Button>
                        </Space>
                    </Col>
                </Row>

            </Card>
        </div>
    )
}

export default FormQcPenyinaran