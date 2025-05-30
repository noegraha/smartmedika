/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Select, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
const { Option } = Select;

const FrmCondMeninggalkanRS = () => {
    const {
        ihsPasien,
        identitasPx,
        paramEncounter,
        setsts18,
        spCvg,
        getRiwRscId,
        postResource,
        postResourcev2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);
    const [kondisi, setkondisi] = useState({});

    useEffect(() => {
        klikRefresh('104');
        console.log('useEffect FrmCondMeninggalkanRS');
    }, []);

    const optKond = [
        {
            code: "359746009",
            display: "Patient’s condition stable",
            ket: "Stabil"
        },
        {
            code: "162668006",
            display: "Patient’s condition unstable",
            ket: "Tidak stabil"
        },
        {
            code: "268910001",
            display: "Patient’s condition improved",
            ket: "Perbaikan"
        },
    ]

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);
            if (data && data.length > 0) {
                setsts18(true);
            };

            setkondisi({});
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const klikPost = async () => {
        try {
            if (!kondisi || Object.keys(kondisi).length === 0) {
                Modal.warning({
                    title: "Peringatan!",
                    content: "Kondisi belum dipilih.",
                });
            }
            else {
                let data = {
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
                                code: kondisi.code,
                                display: kondisi.display
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    }
                };

                // postResource(data, 'Condition', '104');
                console.log('klikPost : ', data);

                const newResponse = await postResourcev2(data, 'Condition', '104');

                if (newResponse === "Sukses") {
                    klikRefresh('104');
                };
            };
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
            <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                <Col span={12}>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            klikRefresh('104');
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

            <Row style={{ marginBottom: "2px", marginTop: '5px' }}>
                <Col span={5}>
                    <span>Kond. Saat Meninggalkan RS :</span>
                </Col>
                <Col span={19}>
                    <Select
                        // mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="..."
                        onChange={(value) => {
                            const selectedOption = optKond.find((opt) => opt.code === value);
                            setkondisi(selectedOption); // Simpan objek yang dipilih
                        }}
                    >
                        {optKond.map((opt, index) => (
                            <Option key={index} value={opt.code}>{opt.ket}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            <hr />
            <Row>
                <Col span={24}>
                    <Button
                        type="primary"
                        onClick={() => klikPost()}
                        disabled={listTable.length !== 0 ? true : false}
                        style={{ float: "right", width: "150px" }}
                    >
                        Post
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default FrmCondMeninggalkanRS