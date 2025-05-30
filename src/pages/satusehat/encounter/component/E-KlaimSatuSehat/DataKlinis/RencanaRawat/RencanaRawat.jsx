import React, { useContext, useState } from 'react';
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext';
import { Button, Col, Divider, Input, Modal, Row, Spin, Table } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;

const RencanaRawat = () => {
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
    const [idGoal, setidGoal] = useState();
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

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        if (codeGrup === '63') {
            setlistTable(data);
        }
        else {
            setidGoal(data.lenght !== 0 ? data[0].ResourceID : null);
        }
    };

    const postRiwayat = () => {
        let data = {
            resourceType: "CarePlan",
            status: "active",
            intent: "plan",
            category: [
                {
                    coding: [
                        {
                            system: "http://snomed.info/sct",
                            code: "736271009",
                            display: "Outpatient care plan"
                        }
                    ]
                }
            ],
            title: "Rencana Rawat Pasien",
            description: keterangan,
            subject: {
                reference: `Patient/${ihsPasien}`,
                display: identitasPx.Nama
            },
            encounter: {
                reference: `Encounter/${paramEncounter.ResourceID}`
            },
            created: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            author: {
                reference: `Practitioner/${paramEncounter.IhsPracticioner}`
            },
            goal: [
                {
                    reference: `Goal/${idGoal}`
                }
            ]
        };

        postResource(data, 'CarePlan', '63');
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
                            Rencana Rawat Pasien
                        </Divider>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                setketerangan("Penanganan DB Pasien dilakukan dengan pemeriksaan penunjang dan pemberian pengobatan DB");
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('63');
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
                    Tambah Rencana Rawat Pasien
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
                            <span>Id Goal :</span>
                        </Col>
                        <Col span={19}>
                            <span>{idGoal}</span>
                        </Col>
                        <Col span={2}>
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

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => postRiwayat()}
                                disabled={!idGoal}
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

export default RencanaRawat