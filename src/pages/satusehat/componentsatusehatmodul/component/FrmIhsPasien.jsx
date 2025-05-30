import { CheckOutlined, CloseOutlined } from '@ant-design/icons'
import { Button, Card, Col, Modal, Row, Space, Spin } from 'antd'
import React, { useContext } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext'
import dayjs from 'dayjs'

const FrmIhsPasien = () => {
    const {
        identitasPx,

        ihstgllahir, setihstgllahir,
        ihsalamat, setihsalamat,
        ihsjenkel, setihsjenkel,
        ihsihsnumber, setihsihsnumber,
        ihsnik, setihsnik,
        ihslastupdate, setihslastupdate,
        ihsnama, setihsnama,

        mdIhsPasien, setmdIhsPasien,
        // mdIhsPasienv2, setmdIhsPasienv2,

        insertIhsPasien,

        spIdentPx,
    } = useContext(SatuSehatModulContext);

    const klikSesuai = () => {
        let pasienId = identitasPx ? identitasPx.PasienId : null;

        if (!pasienId) {
            Modal.warn({
                title: "Peringatan",
                content: 'No RM kosong!',
            });
        }
        else if (!ihsihsnumber) {
            Modal.warn({
                title: "Peringatan",
                content: 'Ihs Number kosong!',
            });
        }
        else {
            let data = {}

            data.pasienId = pasienId
            data.ihsNumber = ihsihsnumber

            insertIhsPasien(data)
        }
    }

    return (
        <div>
            <Modal
                visible={mdIhsPasien}
                onCancel={() => setmdIhsPasien(false)}
                width={1000}
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Spin
                    spinning={spIdentPx}
                    tip="Loading... 😁"
                >
                    <Row>
                        <Col span={12}>
                            <Card
                                title='Detail Ihs Pasien'
                                size='small'
                                headStyle={{ backgroundColor: '#36cfc9' }}>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Nama
                                    </Col>
                                    <Col span={19}>
                                        : <b>{ihsnama}</b>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        IHS Number
                                    </Col>
                                    <Col span={19}>
                                        : <b>{ihsihsnumber}</b>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        NIK
                                    </Col>
                                    <Col span={19}>
                                        : <b>{ihsnik}</b>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Jenis Kelamin
                                    </Col>
                                    <Col span={19}>
                                        : {ihsjenkel}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Terakhir Update
                                    </Col>
                                    <Col span={19}>
                                        : {ihslastupdate}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Tanggal Lahir
                                    </Col>
                                    <Col span={19}>
                                        : {ihstgllahir}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Alamat
                                    </Col>
                                    <Col span={19}>
                                        : {ihsalamat}
                                    </Col>
                                </Row>
                            </Card>
                        </Col>

                        <Col span={12}>
                            <Card
                                title='Detail Lokal Pasien'
                                size='small'
                                headStyle={{ backgroundColor: '#4096ff' }}>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Nama
                                    </Col>
                                    <Col span={19}>
                                        : <b>{identitasPx ? identitasPx.Nama : null}</b>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        IHS Number
                                    </Col>
                                    <Col span={19}>
                                        : -
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        NIK
                                    </Col>
                                    <Col span={19}>
                                        : <b>{identitasPx ? identitasPx.Nik : null}</b>
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Jenis Kelamin
                                    </Col>
                                    <Col span={19}>
                                        : {identitasPx ? identitasPx.JenisKelamin : null}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Terakhir Update
                                    </Col>
                                    <Col span={19}>
                                        : -
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Tanggal Lahir
                                    </Col>
                                    <Col span={19}>
                                        : {identitasPx ? dayjs(identitasPx.TanggalLahir).format('DD-MM-YYYY') : null}
                                    </Col>
                                </Row>
                                <Row style={{ marginBottom: '2px' }}>
                                    <Col span={5}>
                                        Alamat
                                    </Col>
                                    <Col span={19}>
                                        : {identitasPx ? identitasPx.Alamat : null}
                                    </Col>
                                </Row>
                            </Card>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Space style={{ float: 'right' }}>
                                <Button
                                    onClick={() => klikSesuai()}
                                    type='primary'
                                    style={{ width: '150px' }}
                                    icon={<CheckOutlined />}
                                >
                                    Sesuai
                                </Button>
                                <Button
                                    onClick={() => setmdIhsPasien(false)}
                                    style={{ width: '150px' }}
                                    icon={<CloseOutlined />}
                                >
                                    Tidak Sesuai
                                </Button>
                            </Space>
                        </Col>
                    </Row>

                </Spin>

            </Modal>
        </div>
    )
}

export default FrmIhsPasien