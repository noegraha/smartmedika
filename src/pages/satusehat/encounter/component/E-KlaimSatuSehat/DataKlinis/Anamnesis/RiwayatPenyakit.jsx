import { CheckOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, Divider, Input, Modal, Row, Spin, Table } from 'antd';
import React, { useContext, useState } from 'react';
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext';
import dayjs from 'dayjs';
import MdDetailResorce from '../MdDetailResorce';

const { TextArea } = Input;

const RiwayatPenyakit = () => {
    const {
        ihsPasien,
        identitasPx,
        paramEncounter,
        waktuPelayanan,
        listSNDRiwPenySendiri,
        tempListSNDRiwPenySendiri, settempListSNDRiwPenySendiri,
        listRiwayatDx,

        lookupSNOMEDKeluhan,
        postResource,
        getRiwayatDx,
        getRiwRscId,
        getResourceById,

        setmsRscdetail,

        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [riwPenyakitSekarang, setriwPenyakit] = useState();
    const [riwPenyKeluarga, setriwPenyKeluarga] = useState();
    const [riwPenyKeluargaOut, setriwPenyKeluargaOut] = useState();
    const [ketRiwayat, setketRiwayat] = useState();
    const [ketRiwKeluarga, setketRiwKeluarga] = useState();
    const [kematian, setkematian] = useState(false);
    const [flagRiwayat, setflagRiwayat] = useState();
    const [SndRiwPenyakit, setSndRiwPenyakit] = useState();

    const [listRiwPenyakitSekarang, setlistRiwPenyakitSekarang] = useState([]);
    const [listRiwPenyakitDahulu, setlistRiwPenyakitDahulu] = useState([]);
    const [listRiwPenyakitKeluarga, setlistRiwPenyakitKeluarga] = useState([]);

    const [sSearch, setsSearch] = useState();

    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);
    const [mdLookupSNOMEDRiw, setmdLookupSNOMEDRiw] = useState(false);
    const [mdTmbhRiwKel, setmdTmbhRiwKel] = useState(false);

    const colRiwPenyakit = [
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

    const colRiwICD10 = [
        // {
        //     title: 'No',
        //     dataIndex: 'index',
        //     key: 'index',
        //     align: 'center',
        //     ellipsis: true,
        //     width: 50,
        //     render: (text, record, index) => index + 1,
        // },
        {
            title: 'RegistrasiId',
            dataIndex: 'RegistrasiId',
            align: 'center',
            key: 'RegistrasiId',
            width: 100,
        },
        {
            title: 'DiagnosisId',
            dataIndex: 'DiagnosisId',
            key: 'DiagnosisId',
            align: 'center',
            width: 100,
        },
        {
            title: 'DeskDiagnosis',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
        },
        {
            title: 'JenisDiagnosis',
            dataIndex: 'JenisDiagnosisDeskripsi',
            key: 'JenisDiagnosisDeskripsi',
            align: 'center',
            width: 100,
        },
        {
            title: 'KasusBL',
            dataIndex: 'KasusBL',
            key: 'KasusBL',
            align: 'center',
            width: 50,
        },
        {
            title: 'Ruang',
            dataIndex: 'NamaRuang',
            key: 'NamaRuang',
        },
        // {
        //     title: 'Aksi',
        //     dataIndex: 'aksi',
        //     key: 'aksi',
        //     align: 'center',
        //     width: 70,
        //     render: (text, record, index) =>
        //         <div>
        //             <Button
        //                 type='primary'
        //                 // onClick={() => klikPracticionerDummy(record)}
        //                 icon={<CheckOutlined />}
        //                 size='small'
        //                 style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
        //             />
        //         </div>
        // },
    ];

    const colSnomed = [
        {
            title: 'Code',
            dataIndex: 'Code',
            key: 'Code',
            align: 'center',
            width: 150,
        },
        {
            title: 'Display',
            dataIndex: 'Display',
            key: 'Display',
        },
        {
            title: 'Keterangan',
            dataIndex: 'Keterangan',
            key: 'Keterangan',
            // align: 'center',
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
                        onClick={() => {
                            // if (flagRiwayat === '6') {
                            //     setkelUtama(record)
                            // }
                            // else if (flagRiwayat === '7') {
                            //     setkelPenyerta(prevState => [...prevState, record]);
                            // }
                            // else if (flagRiwayat === '8') {
                            //     setkelPenyerta(prevState => [...prevState, record]);
                            // }
                            setriwPenyakit(record);

                            setmdLookupSNOMEDRiw(false);
                        }}
                        icon={<CheckOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const klikSetRiwayat = (e) => {
        setmdLookupSNOMEDRiw(true);
        setsSearch();
        setflagRiwayat(e);
        settempListSNDRiwPenySendiri(listSNDRiwPenySendiri);
        if (listSNDRiwPenySendiri.length === 0) {
            lookupSNOMEDKeluhan('6');
        }
    };

    const onSearchSnomed = (e) => {
        let temp = listSNDRiwPenySendiri.filter(item => item.Display.toLowerCase().includes(e));
        settempListSNDRiwPenySendiri(temp);
        setsSearch(e);
    };

    const klikTambahRiwPenyakitKeluarga = () => {
        setflagRiwayat('8');
        let data = {
            Code: "719763000",
            Display: "Maternal history of diabetes mellitus type 2",
            Keterangan: null,
        }

        setriwPenyKeluarga(data);

        let data1 = {
            Code: "315051004",
            Display: "Diabetes resolved",
            Keterangan: null,
        }

        setriwPenyKeluargaOut(data1);
        setkematian(false);
        setketRiwKeluarga("Ibu pasien pernah menderita DM 10 tahun yll namun sudah dinyatakan sembuh");
    }

    const postRiwayat = () => {
        if (flagRiwayat === '6') {
            let data = {};

            data = {
                resourceType: "Condition",
                clinicalStatus: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                            code: "active",
                            display: "Active"
                        }
                    ]
                },
                category: [
                    {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id",
                                code: "previous-condition",
                                display: "Previous Condition"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://snomed.info/sct",
                            code: riwPenyakitSekarang.Code,
                            display: riwPenyakitSekarang.Display
                        }
                    ]
                },
                subject: {
                    reference: `Patient/${ihsPasien}`,
                    display: identitasPx.Nama
                },
                encounter: {
                    reference: `Encounter/${paramEncounter.ResourceID}`
                },
                onsetPeriod: {
                    start: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                    end: dayjs(waktuPelayanan).subtract(7, 'hour').format()
                },
                recordedDate: dayjs().subtract(7, 'hour').format(),
                recorder: {
                    reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                    display: paramEncounter.NamaDPJP
                },
                note: [
                    {
                        text: ketRiwayat
                    }
                ]
            }

            postResource(data, 'Condition', flagRiwayat);
        }
        else if (flagRiwayat === '7') {
            let data = {};

            data = {
                resourceType: "Condition",
                clinicalStatus: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/condition-clinical",
                            code: "inactive",
                            display: "Inactive"
                        }
                    ]
                },
                category: [
                    {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id",
                                code: "previous-condition",
                                display: "Previous Condition"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://snomed.info/sct",
                            code: riwPenyakitSekarang.Code,
                            display: riwPenyakitSekarang.Display
                        }
                    ]
                },
                subject: {
                    reference: `Patient/${ihsPasien}`,
                    display: identitasPx.Nama
                },
                encounter: {
                    reference: `Encounter/${paramEncounter.ResourceID}`
                },
                onsetPeriod: {
                    start: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                    end: dayjs(waktuPelayanan).subtract(7, 'hour').format()
                },
                recordedDate: dayjs().subtract(7, 'hour').format(),
                recorder: {
                    reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                    display: paramEncounter.NamaDPJP
                },
                note: [
                    {
                        text: ketRiwayat
                    }
                ]
            }

            postResource(data, 'Condition', flagRiwayat);
        }
        else if (flagRiwayat === '8') {
            let data = {
                resourceType: "FamilyMemberHistory",
                status: "completed",
                relationship: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                            code: "FAMMEMB",
                            display: "family member"
                        }
                    ]
                },
                deceasedBoolean: false,
                patient: {
                    reference: `Patient/${ihsPasien}`,
                    display: identitasPx.Nama
                },
                date: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                condition: [
                    {
                        code: {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: riwPenyKeluarga.Code,
                                    display: riwPenyKeluarga.Display
                                }
                            ]
                        },
                        outcome: {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: riwPenyKeluargaOut.Code,
                                    display: riwPenyKeluargaOut.Display
                                }
                            ]
                        },
                        contributedToDeath: false,
                        onsetString: ketRiwKeluarga
                    }
                ]
            }

            postResource(data, 'FamilyMemberHistory', flagRiwayat);
        }
    };

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);

        if (codeGrup === '6') {
            setlistRiwPenyakitSekarang(data);
            // console.log('data : ', data);
        }
        else if (codeGrup === '7') {
            setlistRiwPenyakitDahulu(data);
            // console.log('data : ', data);
        }
        else if (codeGrup === '8') {
            setlistRiwPenyakitKeluarga(data);
            // console.log('data : ', data);
        }
    }

    const klikDetail = (id, rscType) => {
        setmsRscdetail(true);
        getResourceById(id, rscType);
    }

    return (
        <div>
            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Row>
                    <Col span={22} style={{ paddingRight: '5px' }}>
                        <Divider
                            variant="dotted"
                            orientation="left"
                            style={{
                                borderColor: '#7cb305',
                            }}
                        >
                            Riwayat Penyakit Pribadi Sekarang
                        </Divider>
                    </Col>
                    <Col span={2}>
                        <Button
                            type='primary'
                            onClick={() => getRiwayatDx(identitasPx.RegistrasiId)}
                            style={{ width: '100%' }}
                        >
                            Ambil Data
                        </Button>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                setriwPenyakit();
                                setketRiwayat();
                                setflagRiwayat('6');
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah Riwayat
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('6');
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
                        columns={colRiwPenyakit}
                        dataSource={listRiwPenyakitSekarang}
                        pagination={false}
                        size='small'
                    />
                </Row>


                <Divider
                    variant="dotted"
                    orientation="left"
                    style={{
                        borderColor: '#7cb305',
                    }}
                >
                    Riwayat Penyakit Pribadi Terdahulu
                </Divider>

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                setriwPenyakit();
                                setketRiwayat();
                                setflagRiwayat('7');
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah Riwayat
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('7');
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
                        columns={colRiwPenyakit}
                        dataSource={listRiwPenyakitDahulu}
                        pagination={false}
                        size='small'
                    />
                </Row>

                <Divider
                    variant="dotted"
                    orientation="left"
                    style={{
                        borderColor: '#7cb305',
                    }}
                >
                    Riwayat Penyakit Keluarga
                </Divider>

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        <Button
                            type='primary'
                            onClick={() => {
                                setmdTmbhRiwKel(true);
                                klikTambahRiwPenyakitKeluarga();
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah Riwayat
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('8');
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
                        columns={colRiwPenyakit}
                        dataSource={listRiwPenyakitKeluarga}
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
                    Tambah Riwayat
                </Divider>

                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>SNOMED :</span>
                        </Col>
                        <Col span={3}>
                            <Input
                                value={riwPenyakitSekarang ? riwPenyakitSekarang.Code : null}
                                readOnly
                                placeholder="Code"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Input
                                value={riwPenyakitSekarang ? riwPenyakitSekarang.Display : null}
                                readOnly
                                placeholder="Display"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Input
                                value={riwPenyakitSekarang ? riwPenyakitSekarang.Keterangan : null}
                                readOnly
                                placeholder="Keterangan"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={2} style={{ paddingLeft: '2px' }}>
                            <Button
                                type='primary'
                                onClick={() => {
                                    setmdLookupSNOMEDRiw(true);
                                    klikSetRiwayat('7');
                                }}
                                // disabled={paramCoverage && paramCoverage.ResourceID !== null ? true : false}
                                icon={<PlusOutlined />}
                                style={{ float: 'right', width: '100%' }} />
                        </Col>
                    </Row>
                    <Row>
                        <Col span={3}>
                            <span>Ket. Riwayat :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4} value={ketRiwayat} onChange={(e) => setketRiwayat(e.target.value)} />
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => postRiwayat()}
                                style={{ float: 'right', width: '150px' }}>
                                Post Riwayat
                            </Button>
                        </Col>
                    </Row>

                    <Divider
                        variant="dotted"
                        orientation="left"
                        style={{
                            borderColor: '#7cb305',
                        }}
                    >
                        Riwayat Diagnosis ICD-10
                    </Divider>

                    <Row>
                        <Col span={24}>
                            <Table
                                bordered
                                // loading={spGetOrganization}
                                columns={colRiwICD10}
                                dataSource={listRiwayatDx}
                                // pagination={false}
                                size='small'
                            />
                        </Col>
                    </Row>
                </Spin>
            </Modal>

            <Modal
                visible={mdTmbhRiwKel}
                onCancel={() => setmdTmbhRiwKel(false)}
                width="80%"
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>SNOMED Code :</span>
                        </Col>
                        <Col span={3}>
                            <Input
                                value={riwPenyKeluarga ? riwPenyKeluarga.Code : null}
                                readOnly
                                placeholder="Code"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Input
                                value={riwPenyKeluarga ? riwPenyKeluarga.Display : null}
                                readOnly
                                placeholder="Display"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Input
                                value={riwPenyKeluarga ? riwPenyKeluarga.Keterangan : null}
                                readOnly
                                placeholder="Keterangan"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={2} style={{ paddingLeft: '2px' }}>
                            <Button
                                type='primary'
                                onClick={() => {
                                    // setmdLookupSNOMEDRiw(true);
                                    klikSetRiwayat('8');
                                }}
                                disabled
                                icon={<PlusOutlined />}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>SNOMED Outcome :</span>
                        </Col>
                        <Col span={3}>
                            <Input
                                value={riwPenyKeluargaOut ? riwPenyKeluargaOut.Code : null}
                                readOnly
                                placeholder="Code"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Input
                                value={riwPenyKeluargaOut ? riwPenyKeluargaOut.Display : null}
                                readOnly
                                placeholder="Display"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={8}>
                            <Input
                                value={riwPenyKeluargaOut ? riwPenyKeluargaOut.Keterangan : null}
                                readOnly
                                placeholder="Keterangan"
                                style={{ width: '100%' }}
                            />
                        </Col>
                        <Col span={2} style={{ paddingLeft: '2px' }}>
                            <Button
                                type='primary'
                                onClick={() => {
                                    // setmdLookupSNOMEDRiw(true);
                                    klikSetRiwayat('8');
                                }}
                                disabled
                                icon={<PlusOutlined />}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Peny.Kematian :</span>
                        </Col>
                        <Col span={21}>
                            <Checkbox
                                value={kematian}
                                onChange={(e) => setkematian(e.target.checked)}
                            >
                                {kematian ? "Ya" : "Tidak"}
                            </Checkbox>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={3}>
                            <span>Ket. Riwayat :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4} value={ketRiwKeluarga} onChange={(e) => setketRiwKeluarga(e.target.value)} />
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => postRiwayat()}
                                style={{ float: 'right', width: '150px' }}>
                                Post Riwayat
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>

            <Modal
                visible={mdLookupSNOMEDRiw}
                onCancel={() => setmdLookupSNOMEDRiw(false)}
                title='DAFTAR SNOMED'
                width={1000}
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁">
                    <Row style={{ marginBottom: '5px' }}>
                        <Col span={3}>
                            <span>Kolom Cari :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={sSearch}
                                placeholder="Search by Keterangan.."
                                onChange={(e) => onSearchSnomed(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Table
                        bordered
                        columns={colSnomed}
                        dataSource={tempListSNDRiwPenySendiri}
                        size='small'
                    />
                </Spin>
            </Modal>

            {/* <MdDetailResorce /> */}
        </div>
    )
}

export default RiwayatPenyakit