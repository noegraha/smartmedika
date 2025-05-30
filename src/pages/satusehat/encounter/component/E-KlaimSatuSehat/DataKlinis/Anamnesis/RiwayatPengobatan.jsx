import { Button, Col, Divider, Modal, Row, Select, Spin, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import MdDetailResorce from '../MdDetailResorce';

const { Option } = Select;

const RiwayatPengobatan = () => {
    const {
        ihsPasien,
        identitasPx,
        waktuPelayanan,
        paramEncounter,

        postResource,
        getRiwRscId,
        getResourceById,

        spCvg,
        setmsRscdetail,
    } = useContext(SatuSehatEncounterContext);

    const [medReference, setmedReference] = useState([]);
    const [listTable, setlistTable] = useState();

    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

    const klikDetail = (id, rscType) => {
        setmsRscdetail(true);
        getResourceById(id, rscType);
    }

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

    const listMedDispense = [
        {
            medicationReference: "Medication/41094b3a-97ef-4d12-adb3-2de6327fe546",
            medicationReferencedisplay: "Furosemide 40 mg Tablet (KIMIA FARMA)",
            dosagetext: "1 tablet per hari",
            dosagetimingrepeatfrequency: 1,
            dosagetimingrepeatperiod: 1,
            dosagetimingrepeatperiodMax: 6,
            dosagetimingrepeatperiodUnit: "d",
        },
    ];

    const postRiwayat = () => {
        let data = {
            resourceType: "MedicationStatement",
            status: "completed",
            category: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/medication-statement-category",
                        code: "community",
                        display: "Community"
                    }
                ]
            },
            medicationReference: {
                reference: medReference.medicationReference,
                display: medReference.medicationReferencedisplay
            },
            subject: {
                reference: `Patient/${ihsPasien}`,
                display: identitasPx.Nama
            },
            dosage: [
                {
                    text: medReference.dosagetext,
                    timing: {
                        repeat: {
                            frequency: medReference.dosagetimingrepeatfrequency,
                            period: medReference.dosagetimingrepeatperiod,
                            periodMax: medReference.dosagetimingrepeatperiodMax,
                            periodUnit: medReference.dosagetimingrepeatperiodUnit
                        }
                    }
                }
            ],
            effectiveDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            dateAsserted: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            informationSource: {
                reference: `Patient/${ihsPasien}`,
                display: identitasPx.Nama
            },
            context: {
                reference: `Encounter/${paramEncounter.ResourceID}`
            }
        }

        postResource(data, 'MedicationStatement', '11');
    };

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        setlistTable(data);
    };

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
                            Riwayat Pengobatan
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
                                klikRefresh('11');
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
                    Tambah Riwayat Pengobatan
                </Divider>
                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Medication Reference :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listMedDispense.find((item) => item.medicationReference === value);
                                    setmedReference(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listMedDispense.map((item, index) => (
                                    <Option key={index} value={item.medicationReference}>{item.medicationReferencedisplay}</Option>
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

export default RiwayatPengobatan