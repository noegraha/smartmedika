import { CheckOutlined, CloudUploadOutlined, DeleteOutlined, ExclamationCircleFilled, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Modal, Row, Select, Space, Spin, Table, Typography } from 'antd';
import React, { useContext, useState } from 'react';
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext';
import dayjs from 'dayjs';
import MdDetailResorce from '../MdDetailResorce';

const { TextArea } = Input;
const { Text } = Typography;
const { confirm } = Modal;

const KeluhanUtama = () => {
    const {
        identitasPx,
        ihsPasien,
        keluhanUtama, setkeluhanUtama,
        paramEncounter,
        waktuPelayanan,
        listSNOMEDKeluhan,
        tempListSnomed, settempListSnomed,
        rcsIdKel1,
        rscIdKel2,

        postResource,
        getKeluhan,
        getResourceById,
        lookupSNOMEDKeluhan,

        spCvg,

        setmsRscdetail,
    } = useContext(SatuSehatEncounterContext);

    const [mdLookupSnomed, setmdLookupSnomed] = useState(false);
    const [sSearch, setsSearch] = useState();
    const [kelUtama, setkelUtama] = useState({});
    const [kelPenyerta, setkelPenyerta] = useState([]);
    const [flagKeluhan, setflagKeluhan] = useState();

    const colKeluhanPenyerta = [
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
                        danger
                        onClick={() => {
                            confirm({
                                title: "Yakin akan Hapus Keluhan Penyerta?",
                                icon: <ExclamationCircleFilled />,
                                content: `SNOMED : ${record.Keterangan}`,
                                okText: "Hapus",
                                okType: "danger",
                                cancelText: "Batal",
                                onOk() {
                                    setkelPenyerta(prevState => prevState.filter((_, i) => i !== index));
                                },
                            });
                        }}
                        icon={<DeleteOutlined />}
                        size='small'
                    />
                </div>
        },
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
                            if (flagKeluhan === '1') {
                                setkelUtama(record)
                            }
                            else if (flagKeluhan === '2') {
                                setkelPenyerta(prevState => [...prevState, record]);
                            }

                            setmdLookupSnomed(false);
                        }}
                        // disabled={!sstoken || record.StsKirim === 'true'}
                        icon={<CheckOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const klikPostKeluhanUtama = () => {
        if (!kelUtama || Object.keys(kelUtama).length === 0) {
            Modal.warning({
                title: "Peringatan!",
                content: "Keluhan Utama masih kosong.",
            });
        }
        else {
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
                            code: kelUtama.Code,
                            display: kelUtama.Display
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
                recordedDate: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                recorder: {
                    reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                    display: paramEncounter.NamaDPJP
                },
                note: [
                    {
                        text: keluhanUtama
                    }
                ]
            }

            postResource(data, 'Condition', '1');
        }
    }

    const klikKeluhanPenyerta = (array) => {
        // Pastikan `kirim` adalah array
        if (!Array.isArray(array)) {
            console.error("Parameter 'kirim' harus berupa array.");
            return;
        }
        else {
            array.forEach((item) => {
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
                                    system: "http://terminology.hl7.org/CodeSystem/condition-category",
                                    code: "problem-list-item",
                                    display: "Problem List Item"
                                }
                            ]
                        }
                    ],
                    code: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: item.Code,
                                display: item.Display
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
                    onsetDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                    recordedDate: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                    recorder: {
                        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                        display: paramEncounter.NamaDPJP
                    }
                }

                postResource(data, 'Condition', '2');
            })
        }
    }

    const klikTambahKeluhan = (e) => {
        setmdLookupSnomed(true);
        setflagKeluhan(e);
        setsSearch();
        settempListSnomed(listSNOMEDKeluhan);
        if (listSNOMEDKeluhan.length === 0) {
            lookupSNOMEDKeluhan('1');
        }
    }

    const onSearchSnomed = (e) => {
        let temp = listSNOMEDKeluhan.filter(item => item.Keterangan.toLowerCase().includes(e));
        settempListSnomed(temp);
        setsSearch(e);
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
                            Keluhan Utama
                        </Divider>
                    </Col>
                    <Col span={2}>
                        <Button
                            type='primary'
                            onClick={() => getKeluhan(identitasPx.RegistrasiId, '1', '2')}
                            style={{ width: '100%' }}
                        >
                            Ambil Data
                        </Button>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Keluhan Utama :</span>
                    </Col>
                    <Col span={21}>
                        <TextArea rows={4} value={keluhanUtama} onChange={(e) => setkeluhanUtama(e.target.value)} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>SNOMED :</span>
                    </Col>
                    <Col span={3}>
                        <Input
                            value={kelUtama ? kelUtama.Code : null}
                            readOnly
                            placeholder="Code"
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            value={kelUtama ? kelUtama.Display : null}
                            readOnly
                            placeholder="Display"
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            value={kelUtama ? kelUtama.Keterangan : null}
                            readOnly
                            placeholder="Keterangan"
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col span={2} style={{ paddingLeft: '2px' }}>
                        <Button
                            type='primary'
                            onClick={() => klikTambahKeluhan('1')}
                            // disabled={paramCoverage && paramCoverage.ResourceID !== null ? true : false}
                            icon={<PlusOutlined />}
                            style={{ float: 'right', width: '100%' }} />
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Space>
                            <Text type="secondary" italic>Id : {rcsIdKel1}</Text>
                            <Button
                                type='primary'
                                size='small'
                                disabled={!rcsIdKel1}
                                icon={<SearchOutlined />}
                                onClick={() => klikDetail(rcsIdKel1, 'Condition')}
                            />
                        </Space>
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => klikPostKeluhanUtama()}
                            disabled={rcsIdKel1}
                            style={{ float: 'right', width: '150px' }}>
                            Post
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
                    Keluhan Penyerta
                </Divider>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>SNOMED :</span>
                    </Col>
                    {/* <Col span={3}>
                    <Select
                        defaultValue="lucy"
                        style={{ width: "100%" }}
                        allowClear
                        options={[
                            {
                                value: 'lucy',
                                label: 'Lucy',
                            },
                        ]}
                        placeholder="select it"
                    />
                </Col>
                <Col span={8}>
                    <Input
                        placeholder="Basic usage"
                        style={{ width: '100%' }}
                    />
                </Col> */}
                    <Col span={21}>
                        <Button
                            type='primary'
                            onClick={() => klikTambahKeluhan('2')}
                            icon={<PlusOutlined />}
                        >
                            Tambah Keluhan
                        </Button>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Keluhan Penyerta :</span>
                    </Col>
                    <Col span={17}>
                        <Table
                            bordered
                            // loading={spGetOrganization}
                            columns={colKeluhanPenyerta}
                            dataSource={kelPenyerta}
                            pagination={false}
                            size='small'
                        />
                    </Col>
                </Row>

                <Row>
                    {rscIdKel2.length === 0 ? (
                        <Col span={24}>
                            <Text type="secondary" italic>Id : -</Text>
                        </Col>
                    ) : (
                        rscIdKel2.map(item => (
                            <Col key={item.id} span={24} style={{ marginBottom: '2px' }}>
                                <Space>
                                    <Text type="secondary" italic>
                                        Id: {item.ResourceID}
                                    </Text>
                                    <Button
                                        type='primary'
                                        size='small'
                                        icon={<SearchOutlined />}
                                        onClick={() => klikDetail(item.ResourceID, 'Condition')}
                                    />
                                </Space>
                            </Col>
                        ))
                    )}
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => klikKeluhanPenyerta(kelPenyerta)}
                            // disabled={paramCoverage && paramCoverage.ResourceID !== null ? true : false}
                            style={{ float: 'right', width: '150px' }}>
                            Post
                        </Button>
                    </Col>
                </Row>
            </Spin>

            <Modal
                visible={mdLookupSnomed}
                onCancel={() => setmdLookupSnomed(false)}
                title='DAFTAR SNOMED'
                width={1000}
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Spin spinning={spCvg} tip="Loading... 😁">
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
                        {/* <Col span={1} style={{ paddingLeft: '2px' }}>
                            <Button
                                type='primary'
                                onClick={() => onSearchSnomed(sSearch)}
                                icon={<SearchOutlined />}
                                style={{ width: '100%' }}
                            />
                        </Col> */}
                    </Row>
                    <Table
                        bordered
                        // loading={spGetOrganization}
                        columns={colSnomed}
                        dataSource={tempListSnomed}
                        size='small'
                    />
                </Spin>
            </Modal>

            {/* <MdDetailResorce /> */}
        </div>
    )
}

export default KeluhanUtama // dan Keluhan Penyerta