import { Button, Col, Divider, Modal, Row, Space, Spin, Switch, Table, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Title } = Typography;

const PengkajianResep = () => {
    const {
        ihsPasien,
        identitasPx,
        waktuPelayanan,
        setmsRscdetail,
        paramEncounter,
        getResourceById,
        getRiwRscId,
        postResource,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [listTable, setlistTable] = useState();
    const [listTable2, setlistTable2] = useState();
    const [resepId, setresepId] = useState();
    const [anw11, setanw11] = useState(true);
    const [anw12, setanw12] = useState(true);
    const [anw13, setanw13] = useState(true);
    const [anw14, setanw14] = useState(true);
    const [anw21, setanw21] = useState(true);
    const [anw22, setanw22] = useState(true);
    const [anw23, setanw23] = useState(true);
    const [anw24, setanw24] = useState(true);
    const [anw31, setanw31] = useState(true);
    const [anw32, setanw32] = useState(true);
    const [anw33, setanw33] = useState(true);
    const [anw34, setanw34] = useState(true);
    const [anw35, setanw35] = useState(true);
    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

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

    const klikPengkajian = (RscIdResep) => {
        setmdTambahRiwayat(true);
        setresepId(RscIdResep);
    }

    const colTbResource2 = [
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
            width: 200,
            render: (text, record, index) =>
                <div>
                    <Space>
                        <Button
                            type='default'
                            onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
                            icon={<SearchOutlined />}
                            size='small'
                        />
                        <Button
                            type='primary'
                            onClick={() => klikPengkajian(record.ResourceID)}
                            icon={<PlusOutlined />}
                            size='small'
                            style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                        >
                            Pengkajian Resep
                        </Button>
                    </Space>
                </div>
        },
    ];

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        if (codeGrup === '94') {
            setlistTable2(data);
        }
        else if (codeGrup === '95') {
            setlistTable(data);
        }
    };

    const post = () => {
        let data = {
            resourceType: "QuestionnaireResponse",
            questionnaire: "https://fhir.kemkes.go.id/Questionnaire/Q0007",
            status: "completed",
            subject: {
                reference: `Patient/${ihsPasien}`,
            },
            encounter: {
                reference: `Encounter/${paramEncounter.ResourceID}`
            },
            authored: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            author: {
                reference: "Practitioner/10001915884",
                display: "apt. Aditya Pradhana, S.Farm."
            },
            source: {
                reference: `Patient/${ihsPasien}`,
            },
            item: [
                {
                    linkId: "1",
                    text: "Persyaratan Administrasi",
                    item: [
                        {
                            linkId: "1.1",
                            text: "Apakah nama, umur, jenis kelamin, berat badan dan tinggi badan pasien sudah sesuai?",
                            answer: [
                                {
                                    valueBoolean: anw11
                                }
                            ]
                        },
                        {
                            linkId: "1.2",
                            text: "Apakah nama, nomor ijin, alamat dan paraf dokter sudah sesuai?",
                            "answer": [
                                {
                                    valueBoolean: anw12
                                }
                            ]
                        },
                        {
                            linkId: "1.3",
                            text: "Apakah tanggal resep sudah sesuai?",
                            answer: [
                                {
                                    valueBoolean: anw13
                                }
                            ]
                        },
                        {
                            linkId: "1.4",
                            text: "Apakah ruangan/unit asal resep sudah sesuai?",
                            answer: [
                                {
                                    valueBoolean: anw14
                                }
                            ]
                        }
                    ]
                },
                {
                    linkId: "2",
                    text: "Persyaratan Farmasetik",
                    item: [
                        {
                            linkId: "2.1",
                            text: "Apakah nama obat, bentuk dan kekuatan sediaan sudah sesuai?",
                            answer: [
                                {
                                    valueBoolean: anw21
                                }
                            ]
                        },
                        {
                            linkId: "2.2",
                            text: "Apakah dosis dan jumlah obat sudah sesuai?",
                            answer: [
                                {
                                    valueBoolean: anw22
                                }
                            ]
                        },
                        {
                            linkId: "2.3",
                            text: "Apakah stabilitas obat sudah sesuai?",
                            answer: [
                                {
                                    valueBoolean: anw23
                                }
                            ]
                        },
                        {
                            linkId: "2.4",
                            text: "Apakah aturan dan cara penggunaan obat sudah sesuai?",
                            answer: [
                                {
                                    valueBoolean: anw24
                                }
                            ]
                        }
                    ]
                },
                {
                    linkId: "3",
                    text: "Persyaratan Klinis",
                    item: [
                        {
                            linkId: "3.1",
                            text: "Apakah ketepatan indikasi, dosis, dan waktu penggunaan obat sudah sesuai?",
                            answer: [
                                {
                                    valueBoolean: anw31
                                }
                            ]
                        },
                        {
                            linkId: "3.2",
                            text: "Apakah terdapat duplikasi pengobatan?",
                            answer: [
                                {
                                    valueBoolean: anw32
                                }
                            ]
                        },
                        {
                            linkId: "3.3",
                            text: "Apakah terdapat alergi dan reaksi obat yang tidak dikehendaki (ROTD)?",
                            answer: [
                                {
                                    valueBoolean: anw33
                                }
                            ]
                        },
                        {
                            linkId: "3.4",
                            text: "Apakah terdapat kontraindikasi pengobatan?",
                            answer: [
                                {
                                    valueBoolean: anw34
                                }
                            ]
                        },
                        {
                            linkId: "3.5",
                            text: "Apakah terdapat dampak interaksi obat?",
                            answer: [
                                {
                                    valueBoolean: anw35
                                }
                            ]
                        }
                    ]
                },
                {
                    linkId: "4",
                    text: "Resep yang dilakukan pengkajian resep",
                    answer: [
                        {
                            valueReference: {
                                reference: `MedicationRequest/${resepId}`
                            }
                        }
                    ]
                }
            ]
        }

        postResource(data, 'QuestionnaireResponse', '95');
    }

    return (
        <div>
            <Divider
                variant="dotted"
                orientation="left"
                style={{
                    borderColor: '#7cb305',
                }}
            >
                Daftar Resep Obat
            </Divider>

            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        {/* <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                // setketerangan("Tidak puasa");
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah
                        </Button> */}
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('94');
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
                        columns={colTbResource2}
                        dataSource={listTable2}
                        pagination={false}
                        size='small'
                    />
                </Row>
            </Spin>

            <Divider
                variant="dotted"
                orientation="left"
                style={{
                    borderColor: '#7cb305',
                }}
            >
                Pengkajian Resep
            </Divider>

            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        {/* <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                // setketerangan("Tidak puasa");
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah
                        </Button> */}
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('95');
                            }}
                            style={{ float: 'right' }}
                        >
                            Refresh
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Table
                            bordered
                            loading={spCvg}
                            columns={colTbResource}
                            dataSource={listTable}
                            pagination={false}
                            size='small'
                        />
                    </Col>
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
                    Tambah Pengkajian Resep Obat
                </Divider>

                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >

                    <Title level={5}>1. Persyaratan Administrasi</Title>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>1.1</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah nama, umur, jenis kelamin, berat badan dan tinggi badan pasien sudah sesuai?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw11}
                                onChange={(e) => setanw11(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>1.2</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah nama, nomor ijin, alamat dan paraf dokter sudah sesuai?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw12}
                                onChange={(e) => setanw12(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>1.3</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah tanggal resep sudah sesuai?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw13}
                                onChange={(e) => setanw13(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>1.4</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah ruangan/unit asal resep sudah sesuai?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw14}
                                onChange={(e) => setanw14(e)}
                            />
                        </Col>
                    </Row>

                    <Title level={5}>2. Persyaratan Farmasetik</Title>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>2.1</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah nama obat, bentuk dan kekuatan sediaan sudah sesuai?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw21}
                                onChange={(e) => setanw21(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>2.2</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah dosis dan jumlah obat sudah sesuai?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw22}
                                onChange={(e) => setanw22(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>2.3</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah stabilitas obat sudah sesuai?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw23}
                                onChange={(e) => setanw23(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>2.4</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah aturan dan cara penggunaan obat sudah sesuai?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw24}
                                onChange={(e) => setanw24(e)}
                            />
                        </Col>
                    </Row>

                    <Title level={5}>3. Persyaratan Klinis</Title>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>3.1</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah ketepatan indikasi, dosis, dan waktu penggunaan obat sudah sesuai?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw31}
                                onChange={(e) => setanw31(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>3.2</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah terdapat duplikasi pengobatan?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw32}
                                onChange={(e) => setanw32(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>3.3</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah terdapat alergi dan reaksi obat yang tidak dikehendaki (ROTD)?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw33}
                                onChange={(e) => setanw33(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>3.4</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah terdapat kontraindikasi pengobatan?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw34}
                                onChange={(e) => setanw34(e)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1} style={{ paddingLeft: '10px' }}>
                            <span>3.4</span>
                        </Col>
                        <Col span={20}>
                            <p>Apakah terdapat dampak interaksi obat?</p>
                        </Col>
                        <Col span={3}>
                            <Switch
                                checkedChildren="Sesuai"
                                unCheckedChildren="Tidak Sesuai"
                                value={anw35}
                                onChange={(e) => setanw35(e)}
                            />
                        </Col>
                    </Row>

                    <Title level={5}>4. Persyaratan Klinis</Title>
                    <Row>
                        <Col span={6} style={{ paddingLeft: '10px' }}>
                            <span>Resep yang dilakukan pengkajian resep :</span>
                        </Col>
                        <Col span={18}>
                            <p>{resepId}</p>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => post()}
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

export default PengkajianResep