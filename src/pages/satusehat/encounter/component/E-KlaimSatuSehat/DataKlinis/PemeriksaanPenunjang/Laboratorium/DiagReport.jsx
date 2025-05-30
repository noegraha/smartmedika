import { Button, Col, Divider, Input, Modal, Row, Select, Spin, Table } from 'antd';
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../../../context/SatuSehatEncounterContext';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const DiagReport = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        setmsRscdetail,
        waktuPelayanan,
        paramEncounter,
        postResource,
        getResourceById,
        getRiwRscId,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [listTable, setlistTable] = useState();
    const [noDiagReport, setnoDiagReport] = useState('24DRL12010001');
    const [category, setcategory] = useState();
    const [code, setcode] = useState();
    const [idObservation, setidObservation] = useState();
    const [idSpecimen, setidSpecimen] = useState();
    const [idServiceRequest, setidServiceRequest] = useState();
    const [conclusionCode, setconclusionCode] = useState();
    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

    const listCategory = [
        {
            system: "http://terminology.hl7.org/CodeSystem/v2-0074",
            code: "HM",
            display: "Hematology"
        },
    ];

    const listCode = [
        {
            system: "http://loinc.org",
            code: "26515-7",
            display: "Platelets [#/volume] in Blood"
        }
    ];

    const listConclusionCode = [
        {
            system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
            code: "L",
            display: "Low"
        },
    ]

    const klikDetail = (id, rscType) => {
        setmsRscdetail(true);
        getResourceById(id, rscType);
    };

    const colTbResource = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            ellipsis: true,
            width: 50,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'RegistrasiId',
            dataIndex: 'RegistrasiId',
            align: 'center',
            key: 'RegistrasiId',
            width: 150,
        },
        {
            title: 'ResourceId',
            dataIndex: 'ResourceID',
            key: 'ResourceID',
        },
        {
            title: 'ResourceType',
            dataIndex: 'ResourceType',
            key: 'ResourceType',
        },
        {
            title: 'DateEntry',
            dataIndex: 'DateEntry',
            key: 'DateEntry',
            align: 'center',
            width: 200,
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
                        onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);

        if (codeGrup === '66') {
            setidServiceRequest(data.lenght !== 0 ? data[0].ResourceID : null);
        }
        else if (codeGrup === '67') {
            setidSpecimen(data.lenght !== 0 ? data[0].ResourceID : null);
        }
        else if (codeGrup === '68') {
            setidObservation(data.lenght !== 0 ? data[0].ResourceID : null);
        }
        else {
            setlistTable(data);
        }
    };

    const postRiwayat = () => {
        let data = {
            resourceType: "DiagnosticReport",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/diagnostic/${ihsRS}/lab`,
                    use: "official",
                    value: noDiagReport
                }
            ],
            status: "final",
            category: [
                {
                    coding: [
                        category
                    ]
                }
            ],
            code: {
                coding: [
                    code
                ]
            },
            subject: {
                reference: `Patient/${ihsPasien}`,
            },
            encounter: {
                reference: `Encounter/${paramEncounter.ResourceID}`
            },
            effectiveDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            issued: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            performer: [
                {
                    reference: "Practitioner/10018452434"
                },
                {
                    reference: `Organization/${ihsRS}`
                }
            ],
            result: [
                {
                    reference: `Observation/${idObservation}`
                }
            ],
            specimen: [
                {
                    reference: `Specimen/${idSpecimen}`
                }
            ],
            basedOn: [
                {
                    reference: `ServiceRequest/${idServiceRequest}`
                }
            ],
            conclusionCode: [
                {
                    coding: [
                        conclusionCode
                    ]
                }
            ]
        };

        postResource(data, 'DiagnosticReport', '69');
    };

    return (
        <div>
            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Divider
                    variant="dotted"
                    orientation="left"
                    style={{
                        borderColor: '#7cb305',
                    }}
                >
                    Diagnostic Report
                </Divider>

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                // setketerangan("Tidak puasa");
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('69');
                            }}
                            style={{ float: 'right' }}
                        >
                            Refresh
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listTable}
                        pagination={false}
                        size='small'
                    />
                </Row>
            </Spin>

            <Modal
                visible={mdTambahRiwayat}
                onCancel={() => setmdTambahRiwayat(false)}
                width="80%"
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Divider
                    variant="dotted"
                    orientation="left"
                    style={{
                        borderColor: '#7cb305',
                    }}
                >
                    Tambah Diagnostik Report Laboratorium
                </Divider>

                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>No.DiagnostikReport :</span>
                        </Col>
                        <Col span={21}>
                            <Input value={noDiagReport} onChange={(e) => setnoDiagReport(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Code :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listCategory.find((item) => item.code === value);
                                    setcategory(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listCategory.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Code :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listCode.find((item) => item.code === value);
                                    setcode(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listCode.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Observation Id :</span>
                        </Col>
                        <Col span={19}>
                            {idObservation}
                        </Col>
                        <Col span={2}>
                            <Button
                                onClick={() => {
                                    klikRefresh('68');
                                }}
                                style={{ float: 'right' }}
                            >
                                Refresh
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Specimen Id :</span>
                        </Col>
                        <Col span={19}>
                            {idSpecimen}
                        </Col>
                        <Col span={2}>
                            <Button
                                onClick={() => {
                                    klikRefresh('67');
                                }}
                                style={{ float: 'right' }}
                            >
                                Refresh
                            </Button>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>ServiceRequest Id :</span>
                        </Col>
                        <Col span={19}>
                            {idServiceRequest}
                        </Col>
                        <Col span={2}>
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
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Conclusion Code :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listConclusionCode.find((item) => item.code === value);
                                    setconclusionCode(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listConclusionCode.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => postRiwayat()}
                                // disabled={!idServiceRequest}
                                style={{ float: 'right', width: '150px' }}>
                                Post
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>
        </div>
    )
}

export default DiagReport