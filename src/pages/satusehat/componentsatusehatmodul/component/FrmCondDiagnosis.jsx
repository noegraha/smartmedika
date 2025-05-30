/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import dayjs from 'dayjs';

const FrmCondDiagnosis = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        setsts13,
        spCvg,
        getRiwRscId,
        getDiagnosa,
        postResource,
        postResourcev2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);
    const [listDx, setlistDx] = useState([]);

    useEffect(() => {
        klikRefresh('79');
        console.log('useEffect FrmCondDiagnosis');
    }, []);

    const colTbDiagnosis = [
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
            title: 'Kode',
            dataIndex: 'diagnosisId',
            key: 'diagnosisId',
            align: 'center',
            width: 150,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'diagnosisDesk',
            key: 'diagnosisDesk',
        },
        {
            title: 'Jenis',
            dataIndex: 'jenisDiagnosisDesk',
            key: 'jenisDiagnosisDesk',
            align: 'center',
            width: 100,
        },
        {
            title: 'Kasus ICD',
            dataIndex: 'kasusBl',
            key: 'kasusBl',
            align: 'center',
            width: 100,
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
                            postSatuSehat(record);
                        }}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    >
                        Post
                    </Button>
                </div>
        },
    ];

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);
            if (data && data.length > 0) {
                setsts13(true);
            };

            let data1 = await getDiagnosa(identitasPx.RegistrasiId);
            setlistDx(data1);

            console.log('getDiagnosa : ', data1);

        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const postSatuSehat = async (sData) => {
        try {
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
                                code: "encounter-diagnosis",
                                display: "Encounter Diagnosis"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://hl7.org/fhir/sid/icd-10",
                            code: sData.diagnosisId,
                            display: sData.diagnosisDesk
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

            // postResource(data, 'Condition', '79');

            const newResponse = await postResourcev2(data, 'Condition', '79');

            if (newResponse === "Sukses") {
                klikRefresh('79');
            };
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: `Error : ${error}`,
            });
            console.error("Error :", error);
        }
    };

    return (
        <div>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            klikRefresh('79');
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

            <Row>
                <Col>
                    <span>ICD 10 (Diagnosa)</span>
                </Col>
            </Row>

            <Table
                bordered
                loading={spCvg}
                columns={colTbDiagnosis}
                dataSource={listDx}
                pagination={false}
                size='small'
                style={{ marginTop: '5px' }}
            />
        </div>
    )
}

export default FrmCondDiagnosis