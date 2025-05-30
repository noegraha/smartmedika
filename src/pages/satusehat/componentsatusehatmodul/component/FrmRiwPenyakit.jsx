/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Collapse, Divider, Input, Modal, Row, Spin, Table, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

const FrmRiwPenyakit = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        riwPenyakit, setriwPenyakit,
        paramEncounter,
        listRiwayatDx,
        setmdLookupSnomed,
        setflagMdSnomed,
        sts05, setsts05,
        spCvg,
        getRiwRscId,
        getRiwRscIdAsli,
        getRiwayatDx,
        postResource,
        postResourcev2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);

    useEffect(() => {
        klikRefresh('6');
        getRiwayatDx(identitasPx.RegistrasiId);
        setriwPenyakit(null);
        console.log('useEffect FrmRiwPenyakit');
    }, []);

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
        }
    ];

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscIdAsli(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);

            // Cek apakah ada objek dengan RegistrasiId yang sesuai
            const isDisabled = data.some(item => item.RegistrasiId === identitasPx.RegistrasiId);

            if (isDisabled) {
                setsts05(true);
            };
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const postRiwayat = async () => {
        try {
            if (!riwPenyakit) {
                Modal.warning({
                    title: "Peringatan!",
                    content: "Riwayat Penyakit masih kosong.",
                });
            }
            else {
                let data = {};

                data = {
                    resourceType: "Condition",
                    identifier: [
                        {
                            system: `http://sys-ids.kemkes.go.id/condition/${ihsRS}`,
                            value: identitasPx.RegistrasiId
                        }
                    ],
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
                                code: riwPenyakit.id,
                                display: riwPenyakit.pt.term
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    },
                    recordedDate: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
                    recorder: {
                        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                        display: paramEncounter.NamaDPJP
                    }
                };

                // postResource(data, 'Condition', '6');

                const newResponse = await postResourcev2(data, 'Condition', '6');

                if (newResponse === "Sukses") {
                    klikRefresh('6');
                    setriwPenyakit(null);
                }
            }
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: `Error : ${error}`,
            });
            console.error("Error :", error);
        };

    };

    return (
        <div>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
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
                    columns={colTbResource}
                    dataSource={listTable}
                    // pagination={false}
                    size='small'
                />
            </Row>

            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                    <Col span={3}>
                        <span>SNOMED :</span>
                    </Col>
                    <Col span={3}>
                        <Input
                            value={riwPenyakit ? riwPenyakit.id : null}
                            readOnly
                            placeholder="Code"
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            value={riwPenyakit ? riwPenyakit.pt.term : null}
                            readOnly
                            placeholder="Display"
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col span={8}>
                        <Input
                            value={riwPenyakit ? riwPenyakit.fsn.term : null}
                            readOnly
                            placeholder="Keterangan"
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col span={2} style={{ paddingLeft: '2px' }}>
                        <Button
                            type='primary'
                            onClick={() => {
                                setmdLookupSnomed(true);
                                setflagMdSnomed("6");
                            }}
                            // disabled={paramCoverage && paramCoverage.ResourceID !== null ? true : false}
                            icon={<PlusOutlined />}
                            style={{ float: 'right', width: '100%' }} />
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => postRiwayat()}
                            disabled={sts05}
                            style={{ float: 'right', width: '150px', marginBottom: '5px' }}>
                            Post Riwayat
                        </Button>
                    </Col>
                </Row>

                <Collapse
                    items={
                        [
                            {
                                key: "1",
                                label: (
                                    <div>
                                        <Text strong>Riwayat Diagnosis ICD-10</Text>
                                    </div>
                                ),
                                children: (
                                    <>
                                        <Table
                                            bordered
                                            columns={colRiwICD10}
                                            dataSource={listRiwayatDx}
                                            size='small'
                                        />
                                    </>
                                ),
                            }
                        ]
                    }
                // accordion
                // activeKey={keyColl}
                // onChange={onChange}
                />
            </Spin>
        </div>
    )
}

export default FrmRiwPenyakit