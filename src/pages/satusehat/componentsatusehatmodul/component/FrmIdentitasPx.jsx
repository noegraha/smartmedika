import { CloudDownloadOutlined } from '@ant-design/icons'
import { Button, Col, Input, Modal, Row, Space, Spin, Tooltip } from 'antd'
import React, { useContext } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import FrmIhsPasien from './FrmIhsPasien';

const FrmIdentitasPx = () => {
    const {
        identitasPx, setidentitasPx,
        ihsPasien, setihsPasien,

        ihstgllahir, setihstgllahir,
        ihsalamat, setihsalamat,
        ihsjenkel, setihsjenkel,
        ihsihsnumber, setihsihsnumber,
        ihsnik, setihsnik,
        ihslastupdate, setihslastupdate,
        ihsnama, setihsnama,

        spIdentPx,

        setmdIhsPasienv2,

        getIhsPasien,
    } = useContext(SatuSehatModulContext);

    const rstDefault = () => {
        setihstgllahir(null);
        setihsalamat(null);
        setihsjenkel(null);
        setihsihsnumber(null);
        setihsnik(null);
        setihslastupdate(null);
        setihsnama(null);
    }

    const klikIhsPasien = (nik) => {
        if (nik) {
            rstDefault();
            getIhsPasien(nik);
        }
        else {
            Modal.warn({
                title: 'Peringatan!',
                content: 'NIK Pasien tidak boleh kosong!',
            });
        }
    }

    return (
        <div>
            <Spin
                spinning={spIdentPx}
                tip="Loading... 😁"
            >
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        No.Registrasi
                    </Col>
                    <Col span={4}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{identitasPx ? identitasPx.RegistrasiId : null}</span>
                        </Space>
                    </Col>
                    {/* <Col span={16}>
                            {env === 'stg' ? <Button
                                type='default'
                                onClick={() => klikGetDummy(identitasPx.RegistrasiId)}
                                size='small'
                                style={{ float: 'right', width: '150px' }}
                            >
                                Get Dummy
                            </Button> : null}

                        </Col> */}
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        No. RM
                    </Col>
                    <Col span={20}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{identitasPx ? identitasPx.PasienId : null}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Nama Pasien
                    </Col>
                    <Col span={20}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{identitasPx ? identitasPx.Nama : null}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        NIK
                    </Col>
                    <Col span={20}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{identitasPx ? identitasPx.Nik : null}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Alamat Pasien
                    </Col>
                    <Col span={20}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{identitasPx ? identitasPx.Alamat : null}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        IHS Number Pasien
                    </Col>
                    <Col span={20}>
                        <Space size='small'>
                            <span>:</span>
                            <Tooltip title="IHS Pasien harus terisi.">
                                <Input
                                    value={ihsPasien}
                                    placeholder='...'
                                    readOnly
                                    // maxLength={16}
                                    // onChange={(e) => setnik(e.target.value)}
                                    size='small' />
                            </Tooltip>
                            <Button
                                size='small'
                                type='primary'
                                onClick={() => klikIhsPasien(identitasPx.Nik)}
                                icon={<CloudDownloadOutlined />}
                            >
                                Ambil IHS Number
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Spin>

            <FrmIhsPasien />
        </div>
    )
}

export default FrmIdentitasPx