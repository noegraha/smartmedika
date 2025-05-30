/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, Divider, Input, Modal, Row, Space, Spin, Table, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import { SatuSehatEncounterContext } from '../../context/SatuSehatEncounterContext';
import dayjs from 'dayjs';
import { CheckOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

const Encounter = () => {
    const {
        ihsRS,
        identitasPx,
        ihsPasien,
        paramEncounter, setparamEncounter,
        practicionerDummy,
        JSONPost, setJSONPost,

        postResource,
        putResource,
        getParamEncounter,
        getResourceByIdv2,

        spCvg,

        mdEditJSON, setmdEditJSON,
    } = useContext(SatuSehatEncounterContext);

    const [detailEnc, setdetailEnc] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getResourceByIdv2(paramEncounter.ResourceID, "Encounter");
                console.log("Fetched data:", result);

                if (result && result.statusHistory) {
                    setdetailEnc(result.statusHistory);
                } else {
                    setdetailEnc([]);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
                setdetailEnc([]);
            }
        };

        if (paramEncounter && paramEncounter.ResourceID) {
            fetchData();
        }
        else {
            setdetailEnc([]);
        }
    }, [paramEncounter]);


    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            ellipsis: true,
            width: 30,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'NIK',
            dataIndex: 'Nik',
            align: 'center',
            key: 'Nik',
            width: 150,
        },
        {
            title: 'Nama',
            dataIndex: 'Nama',
            key: 'Nama',
        },
        {
            title: 'Gender',
            dataIndex: 'JenisKelamin',
            key: 'JenisKelamin',
            align: 'center',
            width: 70,
        },
        {
            title: 'Tgl Lahir',
            dataIndex: 'TanggalLahir',
            key: 'TanggalLahir',
            align: 'center',
            width: 100,
            render: (text) => dayjs(text).format('DD-MM-YYYY'),
        },
        {
            title: 'IHS Number',
            dataIndex: 'IHSNumber',
            key: 'IHSNumber',
            align: 'center',
            width: 100,
        },
        {
            title: 'Aksi',
            dataIndex: 'aksi',
            key: 'aksi',
            align: 'center',
            width: 70,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        onClick={() => klikPracticionerDummy(record)}
                        icon={<CheckOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const klikPracticionerDummy = (data) => {
        // Buat salinan baru dari objek state paramEncounter
        let temp = { ...paramEncounter };

        temp.NamaDPJP = data.Nama;
        temp.IhsPracticioner = data.IHSNumber;

        setparamEncounter(temp);
        console.log('klikPracticionerDummy : ', temp);
    };

    const klikPost = () => {
        let data = {};

        data = {
            resourceType: "Encounter",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/encounter/${ihsRS}`,
                    value: identitasPx.RegistrasiId
                }
            ],
            status: "arrived",
            class: {
                system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                code: "AMB",
                display: "ambulatory"
            },
            subject: {
                reference: `Patient/${ihsPasien}`,
                display: identitasPx.Nama
            },
            participant: [
                {
                    type: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                    code: "ATND",
                                    display: "attender"
                                }
                            ]
                        }
                    ],
                    individual: {
                        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                        display: paramEncounter.NamaDPJP
                    }
                }
            ],
            period: {
                start: dayjs(paramEncounter.TanggalMasuk).subtract(7, 'hour').format()
            },
            location: [
                {
                    location: {
                        reference: `Location/${paramEncounter.SatuSehatIdRuang}`,
                        display: paramEncounter.RuangDeskripsi
                    },
                    period: {
                        start: dayjs(paramEncounter.TanggalMasuk).subtract(7, 'hour').format()
                    },
                    extension: [
                        {
                            url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
                            extension: [
                                {
                                    url: "value",
                                    valueCodeableConcept: {
                                        coding: [
                                            {
                                                system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Outpatient",
                                                code: "reguler", // untuk rawat jalan ini masih statis
                                                display: "Kelas Reguler"
                                            }
                                        ]
                                    }
                                },
                                {
                                    url: "upgradeClassIndicator",
                                    valueCodeableConcept: {
                                        coding: [
                                            {
                                                system: "http://terminology.kemkes.go.id/CodeSystem/locationUpgradeClass",
                                                code: "kelas-tetap", // untuk rawat jalan ini masih statis
                                                display: "Kelas Tetap Perawatan"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            statusHistory: [
                {
                    status: "arrived",
                    period: {
                        start: dayjs(paramEncounter.TanggalMasuk).subtract(7, 'hour').format()
                    }
                }
            ],
            serviceProvider: {
                reference: `Organization/${ihsRS}`
            }
        }

        postResource(data, 'Encounter', '5');
        console.log('klikPost : ', data);
    };

    const klikPut = () => {
        let data = {};

        data = {
            resourceType: "Encounter",
            id: paramEncounter.ResourceID,
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/encounter/${ihsRS}`,
                    value: identitasPx.RegistrasiId
                }
            ],
            status: "in-progress",
            class: {
                system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                code: "AMB",
                display: "ambulatory"
            },
            subject: {
                reference: `Patient/${ihsPasien}`,
                display: identitasPx.Nama
            },
            participant: [
                {
                    type: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                    code: "ATND",
                                    display: "attender"
                                }
                            ]
                        }
                    ],
                    individual: {
                        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                        display: paramEncounter.NamaDPJP
                    }
                }
            ],
            period: {
                start: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format()
            },
            location: [
                {
                    location: {
                        reference: `Location/${paramEncounter.SatuSehatIdRuang}`,
                        display: paramEncounter.RuangDeskripsi
                    },
                    period: {
                        start: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format()
                    },
                    extension: [
                        {
                            url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
                            extension: [
                                {
                                    url: "value",
                                    valueCodeableConcept: {
                                        coding: [
                                            {
                                                system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Outpatient",
                                                code: "reguler", // untuk rawat jalan ini masih statis
                                                display: "Kelas Reguler"
                                            }
                                        ]
                                    }
                                },
                                {
                                    url: "upgradeClassIndicator",
                                    valueCodeableConcept: {
                                        coding: [
                                            {
                                                system: "http://terminology.kemkes.go.id/CodeSystem/locationUpgradeClass",
                                                code: "kelas-tetap", // untuk rawat jalan ini masih statis
                                                display: "Kelas Tetap Perawatan"
                                            }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                }
            ],
            statusHistory: [
                {
                    status: "arrived",
                    period: {
                        start: dayjs(paramEncounter.TanggalMasuk).subtract(7, 'hour').format(),
                        end: dayjs(paramEncounter.TanggalMasuk).subtract(7, 'hour').format()
                    }
                },
                {
                    status: "in-progress",
                    period: {
                        start: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format()
                    }
                }
            ],
            serviceProvider: {
                reference: `Organization/${ihsRS}`
            }
        }

        console.log('klikPut : ', data);
        putResource(data, 'Encounter', paramEncounter.ResourceID);
    };

    return (
        <div>
            <Card style={{ marginBottom: "2px" }}>
                <Spin spinning={spCvg} tip="Loading... 😁">
                    <Row>
                        <Col span={22}>
                            <Title level={3} italic>Encounter Id : {paramEncounter ? paramEncounter.ResourceID : null}</Title>
                        </Col>
                        <Col span={2}>
                            <Button
                                onClick={() => getParamEncounter(identitasPx.RegistrasiId)}
                                style={{ float: 'right' }}
                            >
                                Refresh
                            </Button>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={15}>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={4}>
                                    No. Registrasi
                                </Col>
                                <Col span={20}>
                                    <Space size='small'>
                                        <span>:</span>
                                        <span>{identitasPx ? identitasPx.RegistrasiId : null}</span>
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
                                    IHS Number Pasien
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
                                    DPJP
                                </Col>
                                <Col span={20}>
                                    <Space size='small'>
                                        <span>:</span>
                                        <span>{paramEncounter ? paramEncounter.NamaDPJP : null}</span>
                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={4}>
                                    IHS Practicioner
                                </Col>
                                <Col span={20}>
                                    <Space size='small'>
                                        <span>:</span>
                                        <span>{paramEncounter ? paramEncounter.IhsPracticioner : null}</span>
                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={4}>
                                    Asal Ruang
                                </Col>
                                <Col span={20}>
                                    <Space size='small'>
                                        <span>:</span>
                                        <span>{paramEncounter ? paramEncounter.RuangDeskripsi : null}</span>
                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={4}>
                                    Id Ruang SatuSehat
                                </Col>
                                <Col span={20}>
                                    <Space size='small'>
                                        <span>:</span>
                                        <span>{paramEncounter ? paramEncounter.SatuSehatIdRuang : null}</span>
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
                                    Jatah Kelas
                                </Col>
                                <Col span={20}>
                                    <Space size='small'>
                                        <span>:</span>
                                        <span>{paramEncounter ? paramEncounter.JatahKelas : null}</span>
                                    </Space>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={4}>
                                    Kelas Rawat
                                </Col>
                                <Col span={20}>
                                    <Space size='small'>
                                        <span>:</span>
                                        <span>{paramEncounter ? paramEncounter.KelasRawat : null}</span>
                                    </Space>
                                </Col>
                            </Row>
                        </Col>
                        <Col span={9}>
                            <Table
                                bordered
                                // loading={spCvg}
                                columns={[
                                    {
                                        title: <b>STATUS ENCOUNTER</b>,
                                        dataIndex: 'status',
                                        key: 'status',
                                        align: 'center',
                                        render: (text) => <b>{text.toUpperCase()}</b>,
                                    }
                                ]}
                                dataSource={detailEnc}
                                pagination={false}
                            // size='small'
                            />
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => klikPost()}
                                disabled={paramEncounter && paramEncounter.ResourceID !== null ? true : false}
                                style={{ width: '150px', float: 'right' }}>
                                POST Encounter
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Card>

            <Card title="Masuk Ruang Pelayanan">
                <Row style={{ marginBottom: "2px" }}>
                    <Col span={4}>Waktu Pelayanan</Col>
                    <Col span={20}>
                        <Space size="small">
                            <span>:</span>
                            {/* <span>{'DD-MM-YYYY HH:mm'}</span> */}
                            <span>
                                {paramEncounter ? dayjs(paramEncounter.JamPelayanan).format("DD-MM-YYYY HH:mm") : null}
                            </span>
                        </Space>
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Button
                            type="primary"
                            onClick={() => klikPut()}
                            disabled={
                                paramEncounter &&
                                    paramEncounter.ResourceID !== null &&
                                    paramEncounter.JamPelayanan
                                    ? false
                                    : true
                            }
                            style={{ width: "150px", float: "right" }}
                        >
                            PUT Encounter
                        </Button>
                    </Col>
                </Row>
            </Card>

            <Divider
                variant="dotted"
                orientation="left"
                style={{
                    borderColor: '#7cb305',
                }}
            >
                Dummy Practicioner (Stagging)
            </Divider>

            <Table
                bordered
                // loading={spGetOrganization}
                columns={columns}
                dataSource={practicionerDummy}
                pagination={false}
                size='small'
            />

            <Modal
                visible={mdEditJSON}
                onCancel={() => setmdEditJSON(false)}
                onOk={() => {
                    let data = JSON.parse(JSONPost);
                    postResource(data, 'Encounter', '5');
                    console.log('editJSON : ', data);
                }
                }
                title="Edit JSON"
                okText='Kirim Ulang...'
                width={750}
                // footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <TextArea
                    rows={15}
                    value={JSONPost}
                    onChange={(e) => setJSONPost(e.target.value)}
                />
            </Modal>
        </div>
    )
}

export default Encounter