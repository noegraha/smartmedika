/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Input, Modal, Row, Select, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import { CloudDownloadOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Option } = Select;

const FrmServReqRencanaTL = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        setsts17,
        spCvg,
        getRiwRscId,
        getPoliLocation,
        postResource,
        postResourcev2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);
    const [optLocRef, setoptLocRef] = useState([]);
    const [catatan, setcatatan] = useState(null);
    const [locCode, setlocCode] = useState({});
    const [locRef, setlocRef] = useState(null);

    useEffect(() => {
        klikRefresh('103');
        console.log('useEffect FrmServReqRencanaTL');
    }, []);

    const optLocCode = [
        {
            code: 'OF',
            display: 'Outpatient facility',
            desk: 'Poliklinik'
        },
        {
            code: 'HOSP',
            display: 'Hospital',
            desk: 'Rumah Sakit'
        },
        {
            code: 'PC',
            display: 'Primary care clinic',
            desk: 'Klinik Perawatan Primer'
        },
    ]

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);
            if (data && data.length > 0) {
                setsts17(true);
            };

            setcatatan(null);
            setlocCode({});
            setlocRef(null);
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const getListLocation = async () => {
        try {
            let data = await getPoliLocation("2");

            setoptLocRef(data);
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const klikPost = async () => {
        try {
            if (!catatan) {
                Modal.warning({
                    title: "Peringatan!",
                    content: "Catatan masih kosong.",
                });
            }
            else if (!locCode || Object.keys(locCode).length === 0) {
                Modal.warning({
                    title: "Peringatan!",
                    content: "Lokasi belum dipilih.",
                });
            }
            else if (Object.keys(locCode).length !== 0 && locCode.code === "OF" && !locRef) {
                Modal.warning({
                    title: "Peringatan!",
                    content: "Poliklinik belum dipilih.",
                });
            }
            else {
                let data = {
                    resourceType: "ServiceRequest",
                    identifier: [
                        {
                            system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
                            value: identitasPx.RegistrasiId
                        }
                    ],
                    status: "active",
                    intent: "original-order",
                    priority: "routine",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: "3457005",
                                    display: "patient-referral"
                                }
                            ]
                        }
                    ],
                    code: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: "185389009",
                                display: "Follow-up visit"
                            }
                        ],
                        text: catatan
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    },
                    occurrenceDateTime: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
                    authoredOn: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
                    requester: {
                        reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                        display: paramEncounter.NamaDPJP
                    },
                    performer: [
                        {
                            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                            display: paramEncounter.NamaDPJP
                        }
                    ],
                    locationCode: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/v3-RoleCode",
                                    code: locCode.code,
                                    display: locCode.display
                                }
                            ]
                        }
                    ],
                    // Tambahkan locationReference hanya jika locCode.code === "OF"
                    ...(locCode.code === "OF" && locRef
                        ? {
                            locationReference: [
                                {
                                    reference: `Location/${locRef}`,
                                },
                            ],
                        }
                        : {}),
                    patientInstruction: catatan
                };

                // postResource(data, 'ServiceRequest', '103');
                console.log('klikPost : ', data);

                const newResponse = await postResourcev2(data, 'ServiceRequest', '103');

                if (newResponse === "Sukses") {
                    klikRefresh('103');
                };
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
            <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                <Col span={12}>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            klikRefresh('103');
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
                <Col span={3}>
                    <span>Catatan :</span>
                </Col>
                <Col span={21}>
                    <TextArea
                        rows={2}
                        placeholder="..."
                        onChange={(e) => setcatatan(e.target.value)}
                        maxLength={50}
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: "2px", marginTop: '5px' }}>
                <Col span={3}>
                    <span>Ins. Tindak Lanjut :</span>
                </Col>
                <Col span={21}>
                    <Select
                        // mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="..."
                        onChange={(value) => {
                            const selectedOption = optLocCode.find((opt) => opt.code === value);
                            setlocCode(selectedOption); // Simpan objek yang dipilih
                        }}
                    >
                        {optLocCode.map((opt, index) => (
                            <Option key={index} value={opt.code}>{opt.desk}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2px", marginTop: '5px' }}>
                <Col span={3}>
                    <span>Poliklinik :</span>
                </Col>
                <Col span={21}>
                    <Input.Group compact>
                        <Select
                            // mode="multiple"
                            style={{ width: '95%' }}
                            placeholder="..."
                            value={locRef}
                            onChange={(value) => { setlocRef(value) }}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                            showSearch
                            disabled={locCode && locCode.code === "OF" ? false : true}
                        >
                            {optLocRef.map((opt, index) => (
                                <Option key={index} value={opt.SatuSehatId}>{opt.Deskripsi}</Option>
                            ))}
                        </Select>
                        <Button
                            onClick={() => getListLocation()}
                            type="primary"
                            htmlType="submit"
                            // size="small"
                            loading={spCvg}
                            icon={<CloudDownloadOutlined />}
                            style={{ width: '5%' }}
                        />
                    </Input.Group>
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

export default FrmServReqRencanaTL