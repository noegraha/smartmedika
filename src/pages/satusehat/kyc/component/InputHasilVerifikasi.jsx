import { CloudSyncOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Modal, Row, Select, Space, Spin } from 'antd'
import React, { useContext, useState } from 'react'
import { KycSatusehatContext } from '../context/KycSatusehatContext';

const InputHasilVerifikasi = () => {
    const {
        userOrder,
        ipClient,
        hostClient,

        jnsNoIdent, setjnsNoIdent,
        noIdent, setnoIdent,
        dtNik, setdtNik,
        dtBpjs, setdtBpjs,
        dtNama, setdtNama,
        dtKtg, setdtKtg,
        getValidasi,
        rstParam,
        cekByIhs,
        spValidasi,

        postStatistikKyc,
    } = useContext(KycSatusehatContext);

    const options = [
        {
            value: 'ktp',
            label: 'KTP',
        },
        {
            value: 'bpjs',
            label: 'BPJS',
        },
    ];

    const optKategori = [
        {
            value: 'umum',
            label: 'UMUM',
        },
        {
            value: 'pasien',
            label: 'PASIEN',
        },
        {
            value: 'karyawan',
            label: 'KARYAWAN',
        },
    ];

    const onKlikSimpan = () => {
        if (!dtKtg) {
            Modal.warn({
                title: "Peringatan",
                content: 'Kategori kosong!',
            });
        }
        else {
            let data = {
                nik: jnsNoIdent === 'ktp' ? noIdent : dtNik,
                kategori: dtKtg,
                userId: userOrder,
                clientIP: ipClient,
                clientHost: hostClient,
            };

            postStatistikKyc(data);
        };
    };

    return (
        <div>
            <Card
                title='Form Pencatatan Verifikasi KYC SatuSehat'
                headStyle={{ backgroundColor: '#36cfc9' }}
            >
                <Spin
                    spinning={spValidasi}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={2}>
                            <span>No. Identitas :</span>
                        </Col>
                        <Col span={6}>
                            <Space.Compact style={{ width: '100%' }}>
                                <Select
                                    placeholder="Jenis No."
                                    options={options}
                                    onChange={(e) => {
                                        rstParam();
                                        setjnsNoIdent(e);
                                    }}
                                    style={{ width: '30%' }}
                                />
                                <Input
                                    placeholder="No. Identitas"
                                    value={noIdent}
                                    onChange={(e) => setnoIdent(e.target.value)}
                                    style={{ width: '70%' }}
                                />
                            </Space.Compact>
                        </Col>
                        <Col>
                            <Button
                                type='primary'
                                icon={<CloudSyncOutlined />}
                                onClick={() => {
                                    if (jnsNoIdent === 'ktp') {
                                        cekByIhs(noIdent);
                                    }
                                    else {
                                        getValidasi(jnsNoIdent, noIdent);
                                    }
                                    // let data = '3304065906940005'
                                }}
                                disabled={jnsNoIdent && noIdent ? false : true}
                                style={{ marginLeft: '5px' }}
                            >
                                Cek No. Identitas
                            </Button>
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={2}>
                            <span>No. BPJS :</span>
                        </Col>
                        <Col span={6}>
                            <Input
                                value={dtBpjs}
                                placeholder="No. BPJS"
                                readOnly
                                style={{ width: '100%' }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={2}>
                            <span>No. KTP :</span>
                        </Col>
                        <Col span={6}>
                            <Input
                                value={dtNik}
                                placeholder="No. KTP"
                                readOnly
                                style={{ width: '100%' }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={2}>
                            <span>Nama :</span>
                        </Col>
                        <Col span={6}>
                            <Input
                                value={dtNama}
                                placeholder="Nama"
                                readOnly
                                style={{ width: '100%' }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={2}>
                            <span>Kategori :</span>
                        </Col>
                        <Col span={6}>
                            <Select
                                value={dtKtg}
                                onChange={(e) => setdtKtg(e)}
                                disabled={!dtNik}
                                placeholder="Jenis No."
                                options={optKategori}
                                style={{ width: '100%' }}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={8}>
                            <Button
                                type='primary'
                                disabled={!dtKtg}
                                onClick={() => onKlikSimpan()}
                                style={{ float: 'right', width: '75px' }}
                            >
                                Simpan
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Card>
        </div>
    )
}

export default InputHasilVerifikasi