/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Select, Spin, Table, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Text } = Typography;

const FrmObsFaktorResiko = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        sts06, setsts06,
        spCvg,
        // getRiwRscId,
        getRiwRscIdAsli,
        // postResource,
        postResourcev2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);
    const [fakResiko, setfakResiko] = useState(null);
    const [opt1, setopt1] = useState(null);
    const [opt2, setopt2] = useState(null);

    useEffect(() => {
        klikRefresh('113');
        console.log('useEffect FrmObsFaktorResiko');
    }, []);

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscIdAsli(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);

            // Cek apakah ada objek dengan RegistrasiId yang sesuai
            const isDisabled = data.some(item => item.RegistrasiId === identitasPx.RegistrasiId);

            if (isDisabled) {
                setsts06(true);
            };
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const postSatuSehat = async () => {
        try {
            if (!fakResiko || !opt1 || !opt2) {
                Modal.warning({
                    title: "Peringatan!",
                    content: "Ada data masih kosong.",
                });
            }
            else {
                let data = {};

                data = {
                    resourceType: "Observation",
                    identifier: [
                        {
                            system: `http://sys-ids.kemkes.go.id/observation/${ihsRS}`,
                            value: identitasPx.RegistrasiId
                        }
                    ],
                    status: "final",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                                    code: "survey",
                                    display: "survey"
                                }
                            ]
                        }
                    ],
                    code: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: fakResiko,
                                display: fakResiko === "268607006" ? "Hypertension risk level" : "Diabetes mellitus"
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    },
                    effectiveDateTime: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
                    issued: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
                    performer: [
                        {
                            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                            display: paramEncounter.NamaDPJP
                        }
                    ],
                    valueBoolean: true,
                    component: [
                        {
                            code: {
                                coding: [
                                    {
                                        system: "http://snomed.info/sct",
                                        code: "715047008",
                                        display: "Does obtain medication"
                                    }
                                ]
                            },
                            valueBoolean: opt1
                        },
                        {
                            code: {
                                coding: [
                                    {
                                        system: "http://snomed.info/sct",
                                        code: "31509003",
                                        display: "Controlled"
                                    }
                                ]
                            },
                            valueBoolean: opt2
                        }
                    ]
                };

                // postResource(data, 'Observation', '113');

                const newResponse = await postResourcev2(data, 'Observation', '113');

                if (newResponse === "Sukses") {
                    klikRefresh('113');
                }
            }
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
                            klikRefresh('113');
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
                    <Col span={19}>
                        <span>Faktor Resiko :</span>
                    </Col>
                    <Col span={5}>
                        <Select
                            style={{ width: "100%" }}
                            onChange={(e) => setfakResiko(e)}
                            options={
                                [
                                    {
                                        value: '268607006',
                                        label: 'Hypertension risk level'
                                    },
                                    {
                                        value: '73211009',
                                        label: 'Diabetes mellitus'
                                    },

                                ]}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={19}>
                        <span>Apakah mendapatkan Obat ?</span>
                    </Col>
                    <Col span={5}>
                        <Select
                            style={{ width: "100%" }}
                            onChange={(e) => setopt1(e)}
                            options={
                                [
                                    {
                                        value: true,
                                        label: 'Ya'
                                    },
                                    {
                                        value: false,
                                        label: 'Tidak'
                                    },

                                ]}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={19}>
                        <span>Apakah terkontrol ?</span>
                    </Col>
                    <Col span={5}>
                        <Select
                            style={{ width: "100%" }}
                            onChange={(e) => setopt2(e)}
                            options={
                                [
                                    {
                                        value: true,
                                        label: 'Ya'
                                    },
                                    {
                                        value: false,
                                        label: 'Tidak'
                                    },

                                ]}
                        />
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => postSatuSehat()}
                            disabled={sts06}
                            style={{ float: 'right', width: '150px' }}>
                            Post
                        </Button>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default FrmObsFaktorResiko