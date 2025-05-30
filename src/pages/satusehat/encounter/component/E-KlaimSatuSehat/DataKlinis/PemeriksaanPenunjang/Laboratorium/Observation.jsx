import { Button, Col, Divider, Input, Modal, Row, Select, Space, Spin, Table } from 'antd';
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../../../context/SatuSehatEncounterContext';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const Observation = () => {
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
    const [noObservation, setnoObservation] = useState('24OBL12010001');
    const [code, setcode] = useState();
    const [idSpecimen, setidSpecimen] = useState();
    const [idServiceRequest, setidServiceRequest] = useState();
    const [interpretasi, setinterpretasi] = useState();
    const [hasil, sethasil] = useState(80);
    const [lowRange, setlowRange] = useState(150);
    const [highRange, sethighRange] = useState(440);
    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

    const listCode = [
        {
            system: "http://loinc.org",
            code: "26515-7",
            display: "Platelets [#/volume] in Blood"
        }
    ];

    const listInterpretasi = [
        {
            system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
            code: "L",
            display: "Low"
        }
    ];

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
        if (codeGrup === '67') {
            setidSpecimen(data.lenght !== 0 ? data[0].ResourceID : null);
        }
        else if (codeGrup === '66') {
            setidServiceRequest(data.lenght !== 0 ? data[0].ResourceID : null);
        }
        else {
            setlistTable(data);
        }
    };

    const postRiwayat = () => {
        let data = {
            resourceType: "Observation",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/observation/${ihsRS}`,
                    value: noObservation
                }
            ],
            status: "final",
            category: [
                {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/observation-category",
                            code: "laboratory",
                            display: "Laboratory"
                        }
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
            specimen: {
                reference: `Specimen/${idSpecimen}`
            },
            basedOn: [
                {
                    reference: `ServiceRequest/${idServiceRequest}`
                }
            ],
            valueQuantity: {
                value: hasil,
                unit: "10*3/uL",
                system: "http://unitsofmeasure.org",
                code: "10*3/uL"
            },
            interpretation: [
                {
                    coding: [
                        interpretasi
                    ]
                }
            ],
            referenceRange: [
                {
                    low: {
                        value: lowRange,
                        unit: "10*3/uL",
                        system: "http://unitsofmeasure.org",
                        code: "10*3/uL"
                    }
                },
                {
                    high: {
                        value: highRange,
                        unit: "10*3/uL",
                        system: "http://unitsofmeasure.org",
                        code: "10*3/uL"
                    }
                }
            ]
        };

        postResource(data, 'Observation', '68');
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
                    Observation
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
                                klikRefresh('68');
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
                    Tambah Observation Laboratorium
                </Divider>

                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>No.Observation :</span>
                        </Col>
                        <Col span={21}>
                            <Input value={noObservation} onChange={(e) => setnoObservation(e.target.value)} />
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
                            <span>Service Request Id :</span>
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
                            <span>Hasil :</span>
                        </Col>
                        <Col span={21}>
                            <Input value={hasil} onChange={(e) => sethasil(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Interpretasi :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listInterpretasi.find((item) => item.code === value);
                                    setinterpretasi(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listInterpretasi.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Reference Range :</span>
                        </Col>
                        <Col span={6}>
                            <Space>
                                <span>Low = </span>
                                <Input value={lowRange} addonAfter="10*3/uL" readOnly style={{ width: '100px' }} />
                            </Space>
                        </Col>
                        <Col span={6}>
                            <Space>
                                <span style={{ width: '100px' }}>High = </span>
                                <Input value={highRange} addonAfter="10*3/uL" readOnly style={{ width: '100px' }} />
                            </Space>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => postRiwayat()}
                                disabled={!idServiceRequest}
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

export default Observation