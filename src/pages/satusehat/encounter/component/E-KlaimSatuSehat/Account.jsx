import { Button, Card, Col, Row, Space, Spin, Typography } from 'antd';
import React, { useContext } from 'react';
import { SatuSehatEncounterContext } from '../../context/SatuSehatEncounterContext';
import dayjs from 'dayjs';

const { Title } = Typography;

const Account = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        paramCoverage,
        accountId,

        postResource,
        patchResource,
        getAccountId,

        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const klikPost = () => {
        let data = {};

        data = {
            resourceType: "Account",
            status: "active",
            type: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                        code: "PBILLACCT",
                        display: "patient billing account"
                    }
                ],
                text: "patient"
            },
            name: "Akun Billing Pasien",
            subject: [
                {
                    reference: `Patient/${ihsPasien}`,
                    display: identitasPx.Nama
                }
            ],
            servicePeriod: {
                start: dayjs(paramEncounter.TanggalMasuk).subtract(7, 'hour').format(),
                end: dayjs(paramEncounter.TanggalMasuk).add(5, 'hour').subtract(7, 'hour').format(),
            },
            coverage: [
                {
                    coverage: {
                        reference: `Coverage/${paramCoverage.ResourceID}`
                    },
                    priority: 1
                }
            ],
            owner: {
                reference: `Organization/${ihsRS}`
            },
            description: "Akun Billing Pasien untuk Tarif, Pembiayaan, dan Penyesuaian"
        }

        console.log('klikPost : ', data);
        postResource(data, 'Account', '3');
    }

    const klikPatch = () => {
        let data = [];

        let tempData = {
            op: "add",
            path: "/account",
            value: [
                {
                    reference: `Account/${accountId}`
                }
            ]
        };

        data.push(tempData);
        console.log('klikPatch : ', data);

        patchResource(data, 'Encounter', paramEncounter.ResourceID);
    }

    return (
        <div>
            <Card>
                <Spin spinning={spCvg} tip="Loading... 😁">
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={12}>
                            <Title level={3} italic>Account Id : {accountId}</Title>
                        </Col>
                        <Col span={12}>
                            <Button
                                onClick={() => getAccountId(identitasPx.RegistrasiId)}
                                style={{ float: 'right' }}
                            >
                                Refresh
                            </Button>
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
                            Ihs Pasien
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{ihsPasien}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Waktu Pendaftaran
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                {/* <span>{'DD-MM-YYYY HH:mm'}</span> */}
                                <span>{paramEncounter ? dayjs(paramEncounter.TanggalMasuk).format('DD-MM-YYYY HH:mm') : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Waktu Selesai Pelayanan
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                {/* <span>{'DD-MM-YYYY HH:mm'}</span> */}
                                <span>{paramEncounter ? dayjs(paramEncounter.TanggalMasuk).add(5, 'hour').format('DD-MM-YYYY HH:mm') : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Coverage Id
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{paramCoverage && paramCoverage.ResourceID !== null ? paramCoverage.ResourceID : null}</span>
                            </Space>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Space style={{ float: 'right' }}>
                                <Button
                                    type='primary'
                                    onClick={() => klikPost()}
                                    disabled={accountId}
                                    style={{ width: '150px' }}>
                                    Post Account
                                </Button>
                                <Button
                                    type='primary'
                                    onClick={() => klikPatch()}
                                    disabled={!accountId}
                                    style={{ float: 'right', width: '150px' }}>
                                    Patch Account
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Spin>
            </Card>
        </div>
    )
}

export default Account