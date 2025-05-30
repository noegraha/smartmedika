/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Select, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import HdContext from '../../../penunjang/hdv2/HdContext';
import dayjs from 'dayjs';

const { Option } = Select;

const {
    PasiensContext,
} = HdContext;

const FrmEncFinishHD = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        paramEpsofCare,
        spCvg,
        getRiwRscId,
        putResource,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const props = useContext(PasiensContext);

    const [listTable, setlistTable] = useState([]);
    const [listTableDx, setlistTableDx] = useState([]);
    const [dischargeDis, setdischargeDis] = useState({});

    useEffect(() => {
        klikRefresh('5');
        console.log('useEffect FrmEncFinishHD');
    }, []);

    const optDischarge = [
        {
            code: 'home',
            display: 'Home',
            desk: 'Pulang atas persetujuan dokter'
        },
        {
            code: 'aadvice',
            display: 'Left against advice',
            desk: 'Pulang atas permintaan sendiri'
        },
        {
            code: 'other-hcf',
            display: 'Other healthcare facility',
            desk: 'Dirujuk'
        },
        {
            code: 'exp-lt48h',
            display: 'Meninggal <48 jam',
            desk: 'Meninggal <48 jam'
        },
        {
            code: 'exp-gt48h',
            display: 'Meninggal >48 jam',
            desk: 'Meninggal >48 jam'
        },
        {
            code: 'oth',
            display: 'Other',
            desk: 'Lain-lain'
        },
    ]

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);

            let data1 = await getRiwRscId(identitasPx.RegistrasiId, '79');
            setlistTableDx(data1);
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const klikPut = () => {
        if (!dischargeDis || Object.keys(dischargeDis).length === 0) {
            Modal.warning({
                title: "Peringatan!",
                content: "Kondisi pulang masih kosong.",
            });
        }
        else if (!paramEpsofCare?.resource?.id) {
            Modal.error({
                title: "Peringatan",
                content: "Episode of Care ID tidak ditemukan.",
            });
        }
        else if (listTableDx.length === 0) {
            Modal.error({
                title: "Peringatan",
                content: "Diagnosis Id masih kosong.",
            });
        }
        else {
            // membuat data diagnosis
            let convertedDx = listTableDx.map((item, index) => {
                return {
                    condition: {
                        reference: `Condition/${item.ResourceID}`
                    },
                    use: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/diagnosis-role",
                                code: "DD",
                                display: "Discharge diagnosis"
                            }
                        ]
                    },
                    rank: index + 1
                }
            });

            let data = {
                resourceType: "Encounter",
                episodeOfCare: [
                    {
                        reference: `EpisodeOfCare/${paramEpsofCare.resource.id}`
                    }
                ],
                id: paramEncounter.ResourceID,
                identifier: [
                    {
                        "system": `http://sys-ids.kemkes.go.id/encounter/${ihsRS}`,
                        "value": identitasPx.RegistrasiId
                    }
                ],
                status: "finished",
                class: {
                    system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
                    code: "AMB",
                    display: "ambulatory"
                },
                subject: {
                    reference: `Patient/${ihsPasien}`
                },
                participant: [
                    {
                        type: [
                            {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                        code: "ATND",
                                        display: "attender"
                                    }
                                ]
                            }
                        ],
                        individual: {
                            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                            display: paramEncounter.NamaDPJ
                        }
                    }
                ],
                period: {
                    start: dayjs(paramEncounter.TanggalMasuk).subtract(7, 'hour').format(),
                    end: dayjs(props.tanggala).subtract(7, 'hour').format(),
                },
                location: [
                    {
                        location: {
                            reference: `Location/${paramEncounter.SatuSehatIdRuang}`
                        },
                        period: {
                            start: dayjs(paramEncounter.TanggalMasuk).subtract(7, 'hour').format(),
                            end: dayjs(props.tanggala).subtract(7, 'hour').format(),
                        },
                        extension: [
                            {
                                url: "https://fhir.kemkes.go.id/r4/StructureDefinition/ServiceClass",
                                extension: [
                                    {
                                        url: "value",
                                        valueCodeableConcept: {
                                            coding: [
                                                {
                                                    system: "http://terminology.kemkes.go.id/CodeSystem/locationServiceClass-Inpatient",
                                                    code: "reguler",
                                                    display: "Kelas Reguler"
                                                }
                                            ]
                                        }
                                    },
                                    {
                                        url: "upgradeClassIndicator",
                                        valueCodeableConcept: {
                                            coding: [
                                                {
                                                    system: "http://terminology.kemkes.go.id/CodeSystem/locationUpgradeClass",
                                                    code: "kelas-tetap",
                                                    display: "Kelas Tetap Perawatan"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ]
                    }
                ],
                diagnosis: convertedDx,
                statusHistory: [
                    {
                        status: "arrived",
                        period: {
                            start: dayjs(paramEncounter.TanggalMasuk).subtract(7, 'hour').format(),
                            end: dayjs(paramEncounter.TanggalMasuk).add(5, 'minute').subtract(7, 'hour').format()
                        }
                    },
                    {
                        status: "in-progress",
                        period: {
                            start: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
                            end: dayjs(props.tanggala).subtract(7, 'hour').format()
                        }
                    },
                    {
                        status: "finished",
                        period: {
                            start: dayjs(props.tanggala).subtract(7, 'hour').format(),
                            end: dayjs(props.tanggala).add(5, 'minute').subtract(7, 'hour').format()
                        }
                    }
                ],
                hospitalization: {
                    dischargeDisposition: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/discharge-disposition",
                                code: dischargeDis.code,
                                display: dischargeDis.display
                            }
                        ]
                    }
                },
                serviceProvider: {
                    reference: `Organization/${ihsRS}`
                }
            };

            console.log('klikPut : ', data);
            putResource(data, "Encounter", paramEncounter.ResourceID);
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
                            klikRefresh('5');
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
                    <span>Episode of Care Id</span>
                </Col>
                <Col span={21}>
                    <span>: {paramEpsofCare ? paramEpsofCare.resource.id : null}</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2px" }}>
                <Col span={3}>
                    <span>Encounter Id</span>
                </Col>
                <Col span={21}>
                    <span>: {paramEncounter ? paramEncounter.ResourceID : null}</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2px" }}>
                <Col span={3}>
                    <span>Registrasi Id</span>
                </Col>
                <Col span={21}>
                    <span>: {identitasPx ? identitasPx.RegistrasiId : null}</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2px" }}>
                <Col span={3}>
                    <span>Waktu Pendaftaran</span>
                </Col>
                <Col span={21}>
                    <span>: {paramEncounter ? paramEncounter.TanggalMasuk : null}</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2px" }}>
                <Col span={3}>
                    <span>Waktu Pelayanan</span>
                </Col>
                <Col span={21}>
                    <span>: {paramEncounter ? paramEncounter.JamPelayanan : null}</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2px" }}>
                <Col span={3}>
                    <span>Waktu Selesai</span>
                </Col>
                <Col span={21}>
                    <span>: {props ? dayjs(props.tanggala).format() : null}</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: "2px" }}>
                <Col>
                    <span>Diagnosa Pasien</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: "5px" }}>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbResource}
                    dataSource={listTableDx}
                    pagination={false}
                    size='small'
                />
            </Row>
            <Row style={{ marginBottom: "2px" }}>
                <Col span={3}>
                    <span>Kondisi Pulang :</span>
                </Col>
                <Col span={21}>
                    <Select
                        // mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="..."
                        onChange={(value) => {
                            const selectedOption = optDischarge.find((opt) => opt.code === value);
                            setdischargeDis(selectedOption); // Simpan objek yang dipilih
                        }}
                    >
                        {optDischarge.map((opt, index) => (
                            <Option key={index} value={opt.code}>{opt.desk}</Option>
                        ))}
                    </Select>
                </Col>
            </Row>

            <hr />
            <Row>
                <Col span={24}>
                    <Button
                        type="primary"
                        onClick={() => klikPut()}
                        // disabled={listTable.length !== 0 ? true : false}
                        style={{ float: "right", width: "150px" }}
                    >
                        PUT
                    </Button>
                </Col>
            </Row>
        </div >
    )
}

export default FrmEncFinishHD