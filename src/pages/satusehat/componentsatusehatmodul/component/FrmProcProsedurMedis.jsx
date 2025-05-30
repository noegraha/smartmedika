/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import dayjs from 'dayjs';

const FrmProcProsedurMedis = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        setsts14,
        spCvg,
        getRiwRscId,
        getProsedur,
        postResource,
        postResourcev2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);
    const [listProsedur, setlistProsedur] = useState([]);

    useEffect(() => {
        klikRefresh('91');
        console.log('useEffect FrmProcProsedurMedis');
    }, []);

    const colTbProsedur = [
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
            dataIndex: 'prosedurId',
            key: 'prosedurId',
            align: 'center',
            width: 150,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'prosedurDesk',
            key: 'prosedurDesk',
        },
        {
            title: 'Pelaksana',
            dataIndex: 'pelaksanaDesk',
            key: 'pelaksanaDesk',
            align: 'center',
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
                setsts14(true);
            };

            let data1 = await getProsedur(identitasPx.RegistrasiId);
            setlistProsedur(data1);

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
                resourceType: "Procedure",
                identifier: [
                    {
                        system: `http://sys-ids.kemkes.go.id/procedure/${ihsRS}`,
                        value: identitasPx.RegistrasiId
                    }
                ],
                status: "completed",
                category: {
                    coding: [
                        {
                            system: "http://snomed.info/sct",
                            code: "277132007",
                            display: "Therapeutic procedure"
                        }
                    ]
                },
                code: {
                    coding: [
                        {
                            system: "http://hl7.org/fhir/sid/icd-9-cm",
                            code: sData.prosedurId,
                            display: sData.prosedurDesk
                        }
                    ]
                },
                subject: {
                    reference: `Patient/${ihsPasien}`
                },
                encounter: {
                    reference: `Encounter/${paramEncounter.ResourceID}`
                },
                performedDateTime: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
                recorder: {
                    reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                    display: paramEncounter.NamaDPJP
                },
                performer: [
                    {
                        actor: {
                            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                            display: paramEncounter.NamaDPJP
                        }
                    }
                ]
            };

            // postResource(data, 'Procedure', '91');

            const newResponse = await postResourcev2(data, 'Procedure', '91');

            if (newResponse === "Sukses") {
                klikRefresh('91');
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
                            klikRefresh('91');
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
                    <span>ICD 9 (Prosedur Medis)</span>
                </Col>
            </Row>

            <Table
                bordered
                loading={spCvg}
                columns={colTbProsedur}
                dataSource={listProsedur}
                pagination={false}
                size='small'
                style={{ marginTop: '5px' }}
            />
        </div>
    )
}

export default FrmProcProsedurMedis