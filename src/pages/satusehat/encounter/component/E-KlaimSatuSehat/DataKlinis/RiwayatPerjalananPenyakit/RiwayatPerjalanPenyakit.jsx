import { Button, Col, Divider, Input, Modal, Row, Select, Spin, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;
const { TextArea } = Input;

const RiwayatPerjalanPenyakit = () => {
    const {
        ihsPasien,
        identitasPx,
        paramEncounter,
        setmsRscdetail,
        waktuPelayanan,
        postResource,
        getResourceById,
        getRiwRscId,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [listTable, setlistTable] = useState();
    const [keterangan, setketerangan] = useState();

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

    const postRiwayat = () => {
        let data = {
            resourceType: "ClinicalImpression",
            status: "completed",
            code: {
                coding: [
                    {
                        system: "http://snomed.info/sct",
                        code: "312850006",
                        display: "History of disorder"
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
            effectiveDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            date: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            assessor: {
                reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
            },
            summary: keterangan
        }

        postResource(data, 'ClinicalImpression', '60');
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
                            Riwayat Perjalanan Penyakit
                        </Divider>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                setketerangan("Pasien datang dengan keluhan utama demam menggigil disertai sakit kepala. Pasien memiliki riwayat diabetes mellitus tipe 2 dan dahulu pasien pernah menderita asma. Ibu pasien memiliki riwayat diabetes mellitus tipe 2. Pasien belum pernah berkunjung ke dokter untuk demamnya.");
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah Riwayat
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('60');
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
                    Tambah Riwayat Perjalanan Penyakit
                </Divider>
                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Ket. Perjalanan Penyakit :</span>
                        </Col>
                        <Col span={21}>
                            <Col span={21}>
                                <TextArea rows={4} value={keterangan} onChange={(e) => setketerangan(e.target.value)} />
                            </Col>
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
        </div>
    )
}

export default RiwayatPerjalanPenyakit