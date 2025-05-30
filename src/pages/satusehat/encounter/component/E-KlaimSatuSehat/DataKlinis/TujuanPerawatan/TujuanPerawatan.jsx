import { Button, Col, Divider, Input, Modal, Row, Select, Space, Spin, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const TujuanPerawatan = () => {
    const {
        ihsPasien,
        identitasPx,
        rcsIdKel1,
        paramEncounter,
        setmsRscdetail,
        waktuPelayanan,
        postResource,
        getResourceById,
        putResource,
        getRiwRscId,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [listTable, setlistTable] = useState();
    const [keterangan, setketerangan] = useState();
    const [idTujuanPerawatan, setidTujuanPerawatan] = useState();
    const [outcome, setoutcome] = useState();
    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);
    const [mdTambahRiwayat1, setmdTambahRiwayat1] = useState(false);

    const listTbTarget = [
        {
            measuresystem: "http://loinc.org",
            measurecode: "8480-6",
            measuredisplay: "Systolic blood pressure",
            detailCodeableConceptsystem: "http://snomed.info/sct",
            detailCodeableConceptcode: "17621005",
            detailCodeableConceptdisplay: "Normal",
            dueDate: dayjs(waktuPelayanan),
        },
        {
            measuresystem: "http://loinc.org",
            measurecode: "8462-4",
            measuredisplay: "Diastolic blood pressure",
            detailCodeableConceptsystem: "http://snomed.info/sct",
            detailCodeableConceptcode: "17621005",
            detailCodeableConceptdisplay: "Normal",
            dueDate: dayjs(waktuPelayanan),
        },
        {
            measuresystem: "http://loinc.org",
            measurecode: "26515-7",
            measuredisplay: "Platelets [#/volume] in Blood",
            detailCodeableConceptsystem: "http://snomed.info/sct",
            detailCodeableConceptcode: "17621005",
            detailCodeableConceptdisplay: "Normal",
            dueDate: dayjs(waktuPelayanan),
        },
    ];

    const listOutcome = [
        {
            system: "http://snomed.info/sct",
            code: "706907002",
            display: "Some progress toward goal"
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
                    <Space>
                        <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat1(true);
                                setidTujuanPerawatan(record.ResourceID);
                            }}
                            icon={<EditOutlined />}
                            size='small'
                            style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                        />
                        <Button
                            type='primary'
                            onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
                            icon={<SearchOutlined />}
                            size='small'
                        // style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                        />
                    </Space>
                </div>
        },
    ];

    const colTbTarget = [
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
            title: 'Display',
            dataIndex: 'measuredisplay',
            // align: 'center',
            key: 'measuredisplay',
            // width: 150,
        },
        {
            title: 'Target',
            dataIndex: 'detailCodeableConceptdisplay',
            align: 'center',
            key: 'detailCodeableConceptdisplay',
            width: 150,
        },
        {
            title: 'Tanggal',
            dataIndex: 'dueDate',
            key: 'dueDate',
            align: 'center',
            width: 200,
            render: (text) => text ? dayjs(text).format('DD-MM-YYYY') : '-', // Format tanggal
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
                        danger
                        // onClick={() => {
                        //     confirm({
                        //         title: "Yakin akan Hapus Keluhan Penyerta?",
                        //         icon: <ExclamationCircleFilled />,
                        //         content: `SNOMED : ${record.Keterangan}`,
                        //         okText: "Hapus",
                        //         okType: "danger",
                        //         cancelText: "Batal",
                        //         onOk() {
                        //             setkelPenyerta(prevState => prevState.filter((_, i) => i !== index));
                        //         },
                        //     });
                        // }}
                        icon={<DeleteOutlined />}
                        size='small'
                    />
                </div>
        },
    ];

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        setlistTable(data);
    };

    const convertToTarget = (listTbTarget) => {
        return listTbTarget.map((item) => ({
            measure: {
                coding: [
                    {
                        system: item.measuresystem,
                        code: item.measurecode,
                        display: item.measuredisplay,
                    },
                ],
            },
            detailCodeableConcept: {
                coding: [
                    {
                        system: item.detailCodeableConceptsystem,
                        code: item.detailCodeableConceptcode,
                        display: item.detailCodeableConceptdisplay,
                    },
                ],
            },
            dueDate: dayjs(item.dueDate).format('YYYY-MM-DD'), // Pastikan format tanggal sesuai
        }));
    };

    const postRiwayat = () => {
        let tempTarget = convertToTarget(listTbTarget);

        let data = {
            resourceType: "Goal",
            lifecycleStatus: "planned",
            category: [
                {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/goal-category",
                            code: "nursing",
                            display: "Nursing"
                        }
                    ]
                }
            ],
            description: {
                text: keterangan
            },
            subject: {
                reference: `Patient/${ihsPasien}`,
            },
            target: tempTarget,
            statusDate: dayjs(waktuPelayanan).subtract(7, 'hour').format('YYYY-MM-DD'),
            expressedBy: {
                reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            },
            addresses: [
                {
                    reference: `Condition/${rcsIdKel1}`
                }
            ]
        }

        console.log('data : ', data);

        postResource(data, 'Goal', '61');
    };

    const putTujuan = () => {
        let tempTarget = convertToTarget(listTbTarget);

        let data = {
            resourceType: "Goal",
            id: idTujuanPerawatan,
            lifecycleStatus: "active",
            achievementStatus: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/goal-achievement",
                        code: "in-progress",
                        display: "In Progress"
                    }
                ]
            },
            category: [
                {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/goal-category",
                            code: "nursing",
                            display: "Nursing"
                        }
                    ]
                }
            ],
            description: {
                text: keterangan
            },
            subject: {
                reference: `Patient/${ihsPasien}`,
            },
            target: tempTarget,
            statusDate: dayjs(waktuPelayanan).subtract(7, 'hour').format('YYYY-MM-DD'),
            expressedBy: {
                reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            },
            addresses: [
                {
                    reference: `Condition/${rcsIdKel1}`
                }
            ],
            outcomeCode: [
                {
                    coding: [
                        outcome
                    ]
                }
            ]
        };

        putResource(data, 'Goal', idTujuanPerawatan);
    }

    return (
        <div>
            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Row>
                    <Col span={24}>
                        <Divider
                            variant="dotted"
                            orientation="left"
                            style={{
                                borderColor: '#7cb305',
                            }}
                        >
                            Tujuan Perawatan
                        </Divider>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                setketerangan("Perawatan dilakukan untuk mengatasi gejala DB");
                                console.log('duedate : ', listTbTarget);
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah Tujuan
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('61');
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
                    Tambah Tujuan Perawatan
                </Divider>
                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Tujuan Perawatan :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4}
                                value={keterangan}
                                onChange={(e) => setketerangan(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>
                            <span>Target :</span>
                        </Col>
                        <Col span={21}>
                            <Table
                                bordered
                                loading={spCvg}
                                columns={colTbTarget}
                                dataSource={listTbTarget}
                                pagination={false}
                                size='small'
                            />
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => postRiwayat()}
                                disabled={!rcsIdKel1}
                                style={{ float: 'right', width: '150px' }}>
                                Post Tujuan
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>

            <Modal
                visible={mdTambahRiwayat1}
                onCancel={() => setmdTambahRiwayat1(false)}
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
                    Update Tujuan Perawatan
                </Divider>
                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={24}>
                            <span>Id Tujuan Perawatan : {idTujuanPerawatan}</span>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Tujuan Perawatan :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4}
                                value={keterangan}
                                onChange={(e) => setketerangan(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Target :</span>
                        </Col>
                        <Col span={21}>
                            <Table
                                bordered
                                loading={spCvg}
                                columns={colTbTarget}
                                dataSource={listTbTarget}
                                pagination={false}
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Outcome :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listOutcome.find((item) => item.code === value);
                                    setoutcome(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listOutcome.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='default'
                                onClick={() => putTujuan()}
                                style={{ float: 'right', width: '150px' }}>
                                Put Tujuan
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>
        </div>
    )
}

export default TujuanPerawatan