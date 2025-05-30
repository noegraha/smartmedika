import { Button, Card, Col, Input, Modal, Row, Space, Spin, Tooltip, Typography } from 'antd';
import React, { useContext } from 'react';
import { SatuSehatEncounterContext } from '../../context/SatuSehatEncounterContext';
import { ReloadOutlined } from '@ant-design/icons';

const { Title } = Typography;

const Coverage = () => {
    const {
        idOrdBPJS,
        ihsPasien,
        identitasPx,
        paramCoverage,
        setparamCoverage,
        coverageId,

        getParamCoverage,
        postResource,

        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const klikPost = () => {
        if (coverageId) {
            Modal.warn({
                title: 'Peringatan!',
                content: 'Coverage Id sudah terpost!',
            });
        }
        else {
            let data = {};

            data = {
                resourceType: "Coverage",
                identifier: [
                    {
                        system: `https://sys-ids.kemkes.go.id/insurance-subscriber/${idOrdBPJS}`,
                        value: `${paramCoverage.NoPeserta}`
                    }
                ],
                status: "active",
                type: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                            code: "PUBLICPOL",
                            display: "public healthcare"
                        }
                    ]
                },
                subscriberId: `${paramCoverage.NoPeserta}`,
                beneficiary: {
                    reference: `Patient/${ihsPasien}`
                },
                payor: [
                    {
                        reference: `Organization/${idOrdBPJS}`,
                        display: "Asuransi BPJS"
                    }
                ],
                class: [
                    {
                        type: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/coverage-class",
                                    code: "group",
                                    display: "Group"
                                }
                            ]
                        },
                        value: `${paramCoverage.Value}`,
                        name: `${paramCoverage.Name}`
                    },
                    {
                        type: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/coverage-class",
                                    code: "class",
                                    display: "Class"
                                }
                            ]
                        },
                        value: `${paramCoverage.KelasRawatId}`,
                        name: `${paramCoverage.NamaKelas}`
                    }
                ],
                extension: [
                    {
                        url: "http://fhir.kemkes.go.id/r4/structureDefinition/primaryCareProvider",
                        valueReference: {
                            reference: `Organization/${idOrdBPJS}`
                        }
                    }
                ]
            };

            console.log('data : ', data);
            postResource(data, 'Coverage', '4');
        }
    }

    const updateNoAsuransi = (e) => {
        setparamCoverage((prevState) => ({
            ...prevState, // Salin properti lainnya
            NoPeserta: e  // Ubah properti 'name'
        }));
    };

    return (
        <div>
            <Card>
                <Spin spinning={spCvg} tip="Loading... 😁">
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={12}>
                            <Title level={3} italic>Coverage Id : {paramCoverage && paramCoverage.ResourceID !== null ? paramCoverage.ResourceID : '-'}</Title>
                        </Col>
                        <Col span={12}>
                            <Button
                                onClick={() => getParamCoverage(identitasPx.RegistrasiId)}
                                style={{ float: 'right' }}
                            >
                                Refresh
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Id Org BPJS
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{idOrdBPJS}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            No. Asuransi
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <Tooltip title="Digunakan jika ingin merubah No.Jaminan Pasien">
                                    <Input onChange={(e) => updateNoAsuransi(e.target.value)} size='small' />
                                </Tooltip>
                                <span>{paramCoverage ? paramCoverage.NoPeserta : null}</span>
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
                            Group
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{paramCoverage ? paramCoverage.Name : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Kelas
                        </Col>
                        <Col span={20}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{paramCoverage ? paramCoverage.NamaKelas : null}</span>
                            </Space>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => klikPost()}
                                disabled={paramCoverage && paramCoverage.ResourceID !== null ? true : false}
                                style={{ float: 'right', width: '150px' }}>
                                Post Coverage
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Card>
        </div>
    )
}

export default Coverage
