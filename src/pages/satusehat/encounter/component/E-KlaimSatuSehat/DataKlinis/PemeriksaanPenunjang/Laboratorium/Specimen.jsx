import { Button, Col, Divider, Input, Modal, Row, Select, Spin, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../../../context/SatuSehatEncounterContext';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const Specimen = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        setmsRscdetail,
        waktuPelayanan,
        postResource,
        getResourceById,
        getRiwRscId,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [listTable, setlistTable] = useState();
    const [noSpecimen, setnoSpecimen] = useState('24SPL12010001');
    const [typeCoding, settypeCoding] = useState();
    const [volSample, setvolSample] = useState(10);
    const [method, setmethod] = useState();
    const [bodySite, setbodySite] = useState();
    const [fastingStatus, setfastingStatus] = useState();
    const [idServiceRequest, setidServiceRequest] = useState();
    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

    const klikDetail = (id, rscType) => {
        setmsRscdetail(true);
        getResourceById(id, rscType);
    };

    const listType = [
        {
            system: "http://snomed.info/sct",
            code: "119297000",
            display: "Blood specimen"
        },
    ];

    const listMethod = [
        {
            system: "http://snomed.info/sct",
            code: "396540005",
            display: "Phlebotomy"
        },
    ];

    const listBodySite = [
        {
            system: "http://snomed.info/sct",
            code: "280388002",
            display: "Structure of skin crease of elbow region"
        },
    ];

    const listFastingStat = [
        {
            system: "http://terminology.hl7.org/CodeSystem/v2-0916",
            code: "NF",
            display: "The patient indicated they did not fast prior to the procedure."
        },
    ];

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
        else {
            setlistTable(data);
        }
    };

    const postRiwayat = () => {
        let data = {
            resourceType: "Specimen",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/specimen/${ihsRS}`,
                    value: noSpecimen,
                    assigner: {
                        reference: `Organization/${ihsRS}`
                    }
                }
            ],
            status: "available",
            type: {
                coding: [
                    typeCoding
                ]
            },
            collection: {
                collector: {
                    reference: "Practitioner/10018452434",
                    display: "dr. Nathalie Tan, Sp.PK."
                },
                collectedDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                quantity: {
                    value: volSample,
                    code: "mL",
                    unit: "mL",
                    system: "http://unitsofmeasure.org"
                },
                method: {
                    coding: [
                        method
                    ]
                },
                bodySite: {
                    coding: [
                        bodySite
                    ]
                },
                fastingStatusCodeableConcept: {
                    coding: [
                        fastingStatus
                    ]
                }
            },
            processing: [
                {
                    procedure: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: "9265001",
                                display: "Specimen processing"
                            }
                        ]
                    },
                    timeDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                }
            ],
            subject: {
                reference: `Patient/${ihsPasien}`,
                // display: "{{Patient_Name}}"
            },
            request: [
                {
                    reference: `ServiceRequest/${idServiceRequest}`
                }
            ],
            receivedTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
        };

        postResource(data, 'Specimen', '67');
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
                    Specimen
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
                                klikRefresh('67');
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
                    Tambah Specimen Laboratorium
                </Divider>
                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>No.Specimen :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={noSpecimen}
                                onChange={(e) => setnoSpecimen(e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Kode KPTL :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listType.find((item) => item.code === value);
                                    settypeCoding(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listType.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Vol.Sample :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={volSample}
                                onChange={(e) => setvolSample(e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Method :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listMethod.find((item) => item.code === value);
                                    setmethod(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listMethod.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Body Site :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listBodySite.find((item) => item.code === value);
                                    setbodySite(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listBodySite.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Fasting Status :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listFastingStat.find((item) => item.code === value);
                                    setfastingStatus(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listFastingStat.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
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
        </div >
    )
}

export default Specimen