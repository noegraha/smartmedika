/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Select, Spin, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import dayjs from 'dayjs';

const { Option } = Select;

const FrmObsStsPsikologis = () => {
    const {
        ihsPasien,
        identitasPx,
        paramEncounter,
        setsts11,
        spCvg,
        getRiwRscId,
        postResource,
        postResourcev2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);
    const [stsPsikologis, setstsPsikologis] = useState({});

    useEffect(() => {
        klikRefresh('114');
        console.log('useEffect FrmObsStsPsikologis');
    }, []);

    const optStsPsikologis = [
        {
            id: '17326005',
            label: 'Well in self',
            desk: 'Tidak ada kelainan'
        },
        {
            id: '48694002',
            label: 'Feeling anxious',
            desk: 'Cemas'
        },
        {
            id: '1402001',
            label: 'Afraid',
            desk: 'Takut'
        },
        {
            id: '75408008',
            label: 'Feeling angry',
            desk: 'Marah'
        },
        {
            id: '420038007',
            label: 'Feeling unhappy',
            desk: 'Sedih'
        }
    ]

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);
            if (data && data.length > 0) {
                setsts11(true);
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
            if (!stsPsikologis) {
                Modal.warning({
                    title: "Peringatan!",
                    content: "Status Psikologis masih kosong.",
                });
            }
            else {
                let data = {};

                data = {
                    resourceType: "Observation",
                    status: "final",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                                    code: "survey",
                                    display: "Survey"
                                }
                            ]
                        }
                    ],
                    code: {
                        coding: [
                            {
                                system: "http://loinc.org",
                                code: "8693-4",
                                display: "Mental Status"
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
                    valueCodeableConcept: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: stsPsikologis.id,
                                display: stsPsikologis.label
                            }
                        ]
                    }
                };

                // postResource(data, 'Observation', '114');

                const newResponse = await postResourcev2(data, 'Observation', '114');

                if (newResponse === "Sukses") {
                    klikRefresh('114');
                };
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
                            klikRefresh('114');
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

            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                    <Col span={19}>
                        <span>Status Psikologis :</span>
                    </Col>
                    <Col span={5}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            onChange={(value) => {
                                const selectedOption = optStsPsikologis.find((opt) => opt.id === value);
                                setstsPsikologis(selectedOption); // Simpan objek yang dipilih
                            }}
                        >
                            {optStsPsikologis.map((opt, index) => (
                                <Option key={index} value={opt.id}>{opt.desk}</Option>
                            ))}
                        </Select>
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => postSatuSehat()}
                            disabled={listTable.length === 0 ? false : true}
                            style={{ float: 'right', width: '150px' }}>
                            Post
                        </Button>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default FrmObsStsPsikologis