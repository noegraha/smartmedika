/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../../../../satusehat/componentsatusehatmodul/context/SatuSehatModulContext';
import { Button, Col, Modal, Row, Space, Table } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const ServReqHD = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        riwPenyakit, setriwPenyakit,
        paramEncounter,
        listRiwayatDx,
        setsts12,
        setmdLookupSnomed,
        setflagMdSnomed,
        spCvg,
        getRiwRscId,
        getHasilLabPK,
        postResource,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);
    const [listHasilPK, setlistHasilPK] = useState(null);
    const [listSpcId, setlistSpcId] = useState([]);
    const [listObs, setlistObs] = useState([]);
    const [listDiagRpt, setlistDiagRpt] = useState([]);

    useEffect(() => {
        klikRefresh('66');
        getLabPK();
    }, []);

    const colTbLabPK = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            ellipsis: true,
            width: 30,
            render: (text, record, index) => index + 1,
        },
        // {
        //     title: 'No. Reg',
        //     dataIndex: 'RegistrasiId',
        //     align: 'center',
        //     key: 'RegistrasiId',
        //     width: 120,
        // },
        {
            title: 'Pemeriksaan',
            dataIndex: 'LabNama',
            key: 'LabNama',
            align: 'center',
        },
        {
            title: 'Hasil',
            dataIndex: 'LabHasil',
            key: 'LabHasil',
            align: 'center',
        },
        {
            title: 'Satuan',
            dataIndex: 'LabSatuan',
            key: 'LabSatuan',
            align: 'center',
            // width: 200,
        },
        {
            title: 'Interpretasi',
            dataIndex: 'flag',
            key: 'flag',
            align: 'center',
        },
        // {
        //     title: 'Pemeriksa',
        //     dataIndex: 'user_update',
        //     key: 'user_update',
        // },
        {
            title: 'Tgl. Pmr',
            dataIndex: 'DateEntry',
            key: 'DateEntry',
            align: 'center',
            render: (text) => text ? dayjs(text).format('DD-MM-YYYY') : '-',
        },
        {
            title: 'Aksi',
            dataIndex: 'aksi',
            key: 'aksi',
            align: 'center',
            // width: 70,
            render: (text, record, index) =>
                <div>
                    <Space direction="vertical">
                        <Button
                            type='primary'
                            disabled={listTable.length !== 0 ? true : false}
                            onClick={() => {
                                klikPost(record);
                            }}
                            icon={<SendOutlined />}
                            size='small'
                            style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                        />
                        <Button
                            type='primary'
                            onClick={() => {
                                postSpecimen(record);
                            }}
                            size='small'
                        >
                            Specimen
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => {
                                postObs(record);
                            }}
                            size='small'
                        >
                            Observation
                        </Button>
                        <Button
                            type='primary'
                            onClick={() => {
                                postDiagReport(record);
                            }}
                            size='small'
                        >
                            Diag.Report
                        </Button>
                    </Space>
                </div>
        },
    ];

    const getLabPK = async () => {
        try {
            let data = await getHasilLabPK(identitasPx.RegistrasiId, 'CREJ2');
            console.log('getLabPK : ', data);

            setlistHasilPK(data.result);
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);

            let dataa = await getRiwRscId(identitasPx.RegistrasiId, '67');
            setlistSpcId(dataa);

            let dataaa = await getRiwRscId(identitasPx.RegistrasiId, '118');
            setlistObs(dataaa);

            let dataaaa = await getRiwRscId(identitasPx.RegistrasiId, '69');
            setlistDiagRpt(dataaaa);

            if (data?.length > 0 && dataa?.length > 0 && dataaa?.length > 0 && dataaaa?.length > 0) {
                setsts12(true);
            }
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const klikPost = (record) => {
        let data = {};
        data = {
            resourceType: "ServiceRequest",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
                    value: identitasPx.RegistrasiId
                }
            ],
            status: "active",
            intent: "order",
            category: [
                {
                    coding: [
                        {
                            system: "http://snomed.info/sct",
                            code: "108252007",
                            display: "Laboratory procedure"
                        }
                    ]
                }
            ],
            priority: "routine",
            code: {
                coding: [
                    {
                        system: "http://loinc.org",
                        code: "2160-0",
                        display: "Creatinine [Mass/volume] in Serum or Plasma"
                    }
                ]
            },
            subject: {
                reference: `Patient/${ihsPasien}`,
            },
            encounter: {
                reference: `Encounter/${paramEncounter.ResourceID}`,
            },
            occurrenceDateTime: dayjs(record.order_dt).subtract(7, 'hour').format(),
            authoredOn: dayjs(record.order_dt).subtract(7, 'hour').format(),
            requester: {
                reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                display: paramEncounter.NamaDPJP
            },
            performer: [
                {
                    reference: `Practitioner/10006986358`, // dr Vita
                }
            ]
        };

        postResource(data, 'ServiceRequest', '66');
        console.log('klikPost : ', data);
    };

    const postSpecimen = (record) => {
        if (listTable.length === 0) {
            Modal.warning({
                title: "Peringatan!",
                content: "Service Request kosong.",
            });
        }
        else {
            let data = {};
            data = {
                resourceType: "Specimen",
                identifier: [
                    {
                        system: `http://sys-ids.kemkes.go.id/specimen/${ihsRS}`,
                        value: identitasPx.RegistrasiId
                    }
                ],
                status: "available",
                type: {
                    coding: [
                        {
                            system: "http://snomed.info/sct",
                            code: "119297000",
                            display: "Blood specimen"
                        }
                    ]
                },
                subject: {
                    reference: `Patient/${ihsPasien}`,
                },
                receivedTime: dayjs(record.UserDate).subtract(7, 'hour').format(),
                request: [
                    {
                        reference: `ServiceRequest/${listTable[0].ResourceID}`
                    }
                ],
                collection: {
                    method: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: "82078001",
                                display: "Collection of blood specimen for laboratory"
                            }
                        ]
                    },
                    collectedDateTime: dayjs(record.UserDate).subtract(7, 'hour').format()
                }
            };

            postResource(data, 'Specimen', '67');
            console.log('klikPost : ', data);
        }
    };

    const postObs = (record) => {
        if (listSpcId.length === 0) {
            Modal.warning({
                title: "Peringatan!",
                content: "Specimen masih kosong.",
            });
        }
        else {
            let data = {};
            data = {
                resourceType: "Observation",
                identifier: [
                    {
                        system: `http://sys-ids.kemkes.go.id/observation/${ihsRS}`,
                        value: identitasPx.RegistrasiId
                    }
                ],
                basedOn: [
                    {
                        reference: `ServiceRequest/${listTable[0].ResourceID}`
                    }
                ],
                status: "final",
                category: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                                code: "laboratory",
                                display: "laboratory"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: "2160-0",
                            display: "Creatinine [Mass/volume] in Serum or Plasma"
                        }
                    ]
                },
                subject: {
                    reference: `Patient/${ihsPasien}`,
                },
                encounter: {
                    reference: `Encounter/${paramEncounter.ResourceID}`,
                },
                effectiveDateTime: dayjs(record.UserDate).subtract(7, 'hour').format(),
                issued: dayjs(record.UserDate).subtract(7, 'hour').format(),
                performer: [
                    {
                        reference: "Practitioner/10006986358"
                    }
                ],
                valueQuantity: {
                    value: parseFloat(record.LabHasil), // Convert string to float
                    unit: "mg/dL",
                    system: "http://unitsofmeasure.org",
                    code: "mg/dL"
                },
                specimen: {
                    reference: `Specimen/${listSpcId[0].ResourceID}`
                }
            };

            postResource(data, 'Observation', '118');
            console.log('postObs : ', data);
        }
    };

    const postDiagReport = (record) => {
        if (listObs.length === 0) {
            Modal.warning({
                title: "Peringatan!",
                content: "Observation masih kosong.",
            });
        }
        else {
            let data = {};
            data = {
                resourceType: "DiagnosticReport",
                identifier: [
                    {
                        system: `http://sys-ids.kemkes.go.id/diagnostic/${ihsRS}/lab`,
                        value: identitasPx.RegistrasiId
                    }
                ],
                basedOn: [
                    {
                        reference: `ServiceRequest/${listTable[0].ResourceID}`
                    }
                ],
                status: "final",
                category: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v2-0074",
                                code: "CH",
                                display: "Chemistry"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: "2160-0",
                            display: "Creatinine [Mass/volume] in Serum or Plasma"
                        }
                    ]
                },
                subject: {
                    reference: `Patient/${ihsPasien}`
                },
                encounter: {
                    reference: `Encounter/${paramEncounter.ResourceID}`,
                },
                effectiveDateTime: dayjs(record.UserDate).subtract(7, 'hour').format(),
                issued: dayjs(record.UserDate).subtract(7, 'hour').format(),
                performer: [
                    {
                        reference: "Practitioner/10006986358"
                    }
                ],
                specimen: [
                    {
                        reference: `Specimen/${listSpcId[0].ResourceID}`
                    }
                ],
                result: [
                    {
                        reference: `Observation/${listObs[0].ResourceID}`
                    }
                ],
                conclusionCode: [
                    {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: record.flag === "HH" || record.flag === "H" ? "166717003" :
                                    record.flag === "N" ? "166816005" :
                                        record.flag === "L" ? "365853000" : "166717003",
                                display: record.flag === "HH" || record.flag === "H" ? "Serum creatinine above reference range" :
                                    record.flag === "N" ? "Serum creatinine normal" :
                                        record.flag === "L" ? "Finding of low serum creatinine" : "Serum creatinine above reference range"
                            }
                        ]
                    }
                ]
            };

            postResource(data, 'DiagnosticReport', '69');
            console.log('postObs : ', data);
        }
    };

    return (
        <div>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            getLabPK();
                        }}
                        style={{ float: 'right' }}
                    >
                        Ambil Data
                    </Button>
                </Col>
            </Row>

            <Row>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbLabPK}
                    dataSource={listHasilPK}
                    pagination={false}
                    size='small'
                />
            </Row>


            <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                <Col span={12}>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            klikRefresh('66');
                        }}
                        style={{ float: 'right' }}
                    >
                        Refresh
                    </Button>
                </Col>
            </Row>

            <span>Service Request</span>
            <Row style={{ marginBottom: '5px' }}>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbResource}
                    dataSource={listTable}
                    pagination={false}
                    size='small'
                />
            </Row>

            <span>Specimen</span>
            <Row style={{ marginBottom: '5px' }}>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbResource}
                    dataSource={listSpcId}
                    pagination={false}
                    size='small'
                />
            </Row>

            <span>Observation</span>
            <Row style={{ marginBottom: '5px' }}>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbResource}
                    dataSource={listObs}
                    pagination={false}
                    size='small'
                />
            </Row>

            <span>Diagnostic Report</span>
            <Row>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbResource}
                    dataSource={listDiagRpt}
                    pagination={false}
                    size='small'
                />
            </Row>
        </div>
    )
}

export default ServReqHD