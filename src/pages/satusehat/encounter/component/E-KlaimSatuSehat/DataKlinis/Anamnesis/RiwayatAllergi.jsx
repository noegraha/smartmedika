import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Modal, Row, Select, Spin, Table } from 'antd';
import React, { useContext, useState } from 'react';
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext';
import dayjs from 'dayjs';
import MdDetailResorce from '../MdDetailResorce';

const { Option } = Select;
const { TextArea } = Input;

const RiwayatAllergi = () => {
    const {
        ihsRS,
        identitasPx,
        ihsPasien,
        paramEncounter,
        waktuPelayanan,

        postResource,
        getRiwRscId,
        getResourceById,

        setmsRscdetail,

        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [clinicalStatus, setclinicalStatus] = useState([]);
    const [verificationStatus, setverificationStatus] = useState([]);
    const [category, setcategory] = useState();
    const [code, setcode] = useState([]);
    const [ketallergi, setketallergi] = useState();
    const [listTable, setlistTable] = useState();

    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

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

    const listStatus = [
        {
            code: "active",
            display: "Active",
        },
    ];

    const listverificationStatus = [
        {
            code: "confirmed",
            display: "Confirmed",
        },
    ];

    const listcode = [
        {
            system: "http://snomed.info/sct",
            code: "128488006",
            display: "House dust",
            ket: "Debu Rumah",
        },
        {
            system: "http://snomed.info/sct",
            code: "226963000",
            display: "Duck - meat",
            ket: "Alergi daging bebek sejak umur 10 tahun",
        },
        {
            system: "http://sys-ids.kemkes.go.id/kfa",
            code: "93000359",
            display: "Azithromycin 500 mg Tablet Salut Selaput (KIMIA FARMA)",
            ket: "sempat gatal2 setelah minum Azitromicin 500mg, membawa bungkus azitromisin kimia farma",
        },
    ];

    const postRiwayat = () => {
        let data = {
            resourceType: "AllergyIntolerance",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/allergy/${ihsRS}`,
                    use: "official",
                    value: `20${identitasPx.RegistrasiId}`
                }
            ],
            clinicalStatus: {
                coding: [
                    {
                        "system": "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                        code: clinicalStatus.code,
                        display: clinicalStatus.display
                    }
                ]
            },
            verificationStatus: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                        code: verificationStatus.code,
                        display: verificationStatus.display
                    }
                ]
            },
            category: [
                category
            ],
            code: {
                coding: [
                    {
                        system: code.system,
                        code: code.code,
                        display: code.display
                    }
                ],
                text: code.ket
            },
            patient: {
                reference: `Patient/${ihsPasien}`,
                display: identitasPx.Nama
            },
            encounter: {
                reference: `Encounter/${paramEncounter.ResourceID}`
            },
            recordedDate: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            recorder: {
                reference: "Practitioner/10014058550",
                display: "Sheila Annisa S.Kep"
            }
        }

        postResource(data, 'AllergyIntolerance', '10');
    };

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        setlistTable(data);
    };

    const klikDetail = (id, rscType) => {
        setmsRscdetail(true);
        getResourceById(id, rscType);
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Divider
                        variant="dotted"
                        orientation="left"
                        style={{
                            borderColor: '#7cb305',
                        }}
                    >
                        Riwayat Allergi
                    </Divider>
                </Col>
            </Row>

            <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                    <Button
                        type='primary'
                        onClick={() => {
                            setmdTambahRiwayat(true);
                        }}
                        icon={<PlusOutlined />}
                    >
                        Tambah Riwayat
                    </Button>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            klikRefresh('10');
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
                    Tambah Riwayat Allergi
                </Divider>
                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Clinical Status :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listStatus.find((item) => item.code === value);
                                    setclinicalStatus(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listStatus.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Verification Status :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listverificationStatus.find((item) => item.code === value);
                                    setverificationStatus(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listverificationStatus.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Category :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(e) => {
                                    setcategory(e); // Set objek yang dipilih
                                }}
                            >
                                <Option key={1} value="environment">environment</Option>
                                <Option key={1} value="food">food</Option>
                                <Option key={1} value="medication">medication</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Coding :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listcode.find((item) => item.code === value);
                                    setcode(selectedStatus); // Set objek yang dipilih
                                    setketallergi(selectedStatus.ket)
                                }}
                            >
                                {listcode.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Keterangan :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4} value={ketallergi} onChange={(e) => setketallergi(e.target.value)} />
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

            {/* <MdDetailResorce /> */}
        </div>
    )
}

export default RiwayatAllergi