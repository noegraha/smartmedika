/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Table, Typography } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import dayjs from 'dayjs';

const { Title } = Typography;

const FrmComposRegUronefrologi = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        paramEpsofCare,
        setsts19,
        spCvg,
        getRiwRscId,
        getRiwRscIdAsli,
        postResourcev2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listKonUtama, setlistKonUtama] = useState([]);
    const [listRiwPenyakit, setlistRiwPenyakit] = useState([]);
    const [listFakRes, setlistFakRes] = useState([]);
    const [listSistol, setlistSistol] = useState([]);
    const [listDiastol, setlistDiastol] = useState([]);
    const [listBB, setlistBB] = useState([]);
    const [listTB, setlistTB] = useState([]);
    const [listHasilPenunjang, setlistHasilPenunjang] = useState([]);
    const [listDiag, setlistDiag] = useState([]);
    const [listTindMedis, setlistTindMedis] = useState([]);
    const [listObat, setlistObat] = useState([]);
    const [RegUroId, setRegUroId] = useState([]);

    useEffect(() => {
        klikRefresh();
    }, [])


    const klikPost = async () => {
        try {
            const warnings = [
                { condition: listKonUtama.length === 0, message: "Id Keluhan Utama tidak boleh kosong." },
                { condition: listRiwPenyakit.length === 0, message: "Id Riwayat Penyakit tidak boleh kosong." },
                { condition: listFakRes.length === 0, message: "Id Faktor Resiko tidak boleh kosong." },
                { condition: listSistol.length === 0, message: "Id Sistole tidak boleh kosong." },
                { condition: listDiastol.length === 0, message: "Id Diastole tidak boleh kosong." },
                { condition: listBB.length === 0, message: "Id Berat Badan tidak boleh kosong." },
                { condition: listTB.length === 0, message: "Id Tinggi Badan tidak boleh kosong." },
                { condition: listDiag.length === 0, message: "Id Diagnosa tidak boleh kosong." },
                { condition: listTindMedis.length === 0, message: "Id Prosedur Medis tidak boleh kosong." },
                { condition: listObat.length === 0, message: "Id Obat tidak boleh kosong." },
            ];

            const warning = warnings.find(w => w.condition);
            if (warning) {
                Modal.warning({
                    title: "Peringatan!",
                    content: warning.message,
                });
                return;
            }
            else {
                let anamnesis = [...listKonUtama, ...listRiwPenyakit, ...listFakRes].map(({ ResourceType, ResourceID, ResourceGroup }) => ({
                    reference: `${ResourceType}/${ResourceID}`,
                    display: ResourceGroup
                }));

                let pmrFisik = [...listSistol, ...listDiastol, ...listBB, ...listTB].map(({ ResourceType, ResourceID, ResourceGroup }) => ({
                    reference: `${ResourceType}/${ResourceID}`,
                    display: ResourceGroup
                }));

                let hslPenunjang = [...listHasilPenunjang].map(({ ResourceType, ResourceID, ResourceGroup }) => ({
                    reference: `${ResourceType}/${ResourceID}`,
                    display: ResourceGroup
                }));

                let diagnosis = [...listDiag].map(({ ResourceType, ResourceID, ResourceGroup }) => ({
                    reference: `${ResourceType}/${ResourceID}`,
                    display: ResourceGroup
                }));

                let tindMedis = [...listTindMedis].map(({ ResourceType, ResourceID, ResourceGroup }) => ({
                    reference: `${ResourceType}/${ResourceID}`,
                    display: ResourceGroup
                }));

                let obat = [...listObat]
                    .filter(({ ResourceType }) => ResourceType === "MedicationRequest")
                    .map(({ ResourceType, ResourceID, ResourceGroup }) => ({
                        reference: `${ResourceType}/${ResourceID}`,
                        display: ResourceGroup
                    }));

                console.log(anamnesis);

                let data = {};

                data = {
                    resourceType: "Composition",
                    identifier: {
                        system: `http://sys-ids.kemkes.go.id/composition/${ihsRS}`,
                        value: identitasPx.RegistrasiId
                    },
                    status: "final",
                    type: {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id",
                                code: "TK000014",
                                display: "Data Registrasi Uronefrologi"
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    },
                    date: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
                    author: [
                        {
                            reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                            display: paramEncounter.NamaDPJP
                        }
                    ],
                    title: "Data Registrasi Uronefrologi",
                    custodian: {
                        reference: `Organization/${ihsRS}`
                    },
                    section: [
                        {
                            title: "Episode Perawatan",
                            code: {
                                coding: [
                                    {
                                        system: "http://terminology.kemkes.go.id",
                                        code: "TK000002",
                                        display: "Episode Perawatan"
                                    }
                                ]
                            },
                            entry: [
                                {
                                    reference: `EpisodeOfCare/${paramEpsofCare.resource.id}`,
                                    display: "Episode Perawatan Registrasi Uronefrologi"
                                }
                            ]
                        },
                        {
                            title: "Anamnesis",
                            code: {
                                coding: [
                                    {
                                        system: "http://terminology.kemkes.go.id",
                                        code: "TK000003",
                                        display: "Anamnesis"
                                    }
                                ]
                            },
                            entry: anamnesis
                        },
                        {
                            title: "Pemeriksaan Fisik",
                            code: {
                                coding: [
                                    {
                                        system: "http://terminology.kemkes.go.id",
                                        code: "TK000007",
                                        display: "Pemeriksaan Fisik"
                                    }
                                ]
                            },
                            entry: pmrFisik
                        },
                        ...(hslPenunjang.length > 0
                            ? [
                                {
                                    title: "Hasil Pemeriksaan Penunjang",
                                    code: {
                                        coding: [
                                            {
                                                system: "http://terminology.kemkes.go.id",
                                                code: "TK000009",
                                                display: "Hasil Pemeriksaan Penunjang"
                                            }
                                        ]
                                    },
                                    entry: hslPenunjang
                                }
                            ]
                            : []),
                        // {
                        //     title: "Pemeriksaan Uronefrologi",
                        //     code: {
                        //         coding: [
                        //             {
                        //                 system: "http://terminology.kemkes.go.id",
                        //                 code: "TK000015",
                        //                 display: "Pemeriksaan Uronefrologi"
                        //             }
                        //         ]
                        //     },
                        //     entry: [
                        //         // {
                        //         //     reference: "Observation/{{Observation_BatuSaluranKemih}}",
                        //         //     display: "Observasi Batu Saluran Kemih"
                        //         // }
                        //     ]
                        // },
                        {
                            title: "Diagnosis",
                            code: {
                                coding: [
                                    {
                                        system: "http://terminology.kemkes.go.id",
                                        code: "TK000004",
                                        display: "Diagnosis"
                                    }
                                ]
                            },
                            entry: diagnosis
                        },
                        {
                            title: "Tindakan/Prosedur Medis",
                            code: {
                                coding: [
                                    {
                                        system: "http://terminology.kemkes.go.id",
                                        code: "TK000005",
                                        display: "Tindakan/Prosedur Medis"
                                    }
                                ]
                            },
                            entry: tindMedis
                        },
                        {
                            title: "Obat",
                            code: {
                                coding: [
                                    {
                                        system: "http://terminology.kemkes.go.id",
                                        code: "TK000013",
                                        display: "Obat"
                                    }
                                ]
                            },
                            entry: obat
                        }
                    ]
                };

                console.log("Klik Post : ", data);

                let tempData = await getRiwRscId(identitasPx.RegistrasiId, '119');

                if (tempData && tempData.length === 0) {
                    const newResponse = await postResourcev2(data, 'Composition', '119');

                    if (newResponse === "Sukses") {
                        klikRefresh();
                    };
                } else {
                    Modal.warning({
                        title: 'Peringatan!',
                        content: 'Registrasi Uronefrologi sudah ada, refresh kembali pasien.',
                    });
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

    const klikRefresh = async () => {
        try {
            // kel utama
            let data = await getRiwRscId(identitasPx.RegistrasiId, "1");
            setlistKonUtama(data);

            // riw penyakit
            let data1 = await getRiwRscIdAsli(identitasPx.RegistrasiId, "6");
            setlistRiwPenyakit([data1[data1.length - 1]]);

            // faktor resiko
            let data2 = await getRiwRscIdAsli(identitasPx.RegistrasiId, "113");
            setlistFakRes([data2[data2.length - 1]]);

            // pmr fisik
            let data3 = await getRiwRscIdAsli(identitasPx.RegistrasiId, "15");
            setlistSistol([data3[data3.length - 1]]);
            let data4 = await getRiwRscIdAsli(identitasPx.RegistrasiId, "16");
            setlistDiastol([data4[data4.length - 1]]);
            let data5 = await getRiwRscIdAsli(identitasPx.RegistrasiId, "50");
            setlistBB([data5[data5.length - 1]]);
            let data6 = await getRiwRscIdAsli(identitasPx.RegistrasiId, "49");
            setlistTB([data6[data6.length - 1]]);

            // penunjang
            let data7 = await getRiwRscId(identitasPx.RegistrasiId, '118');
            setlistHasilPenunjang(data7);

            // diagnosis
            let data8 = await getRiwRscId(identitasPx.RegistrasiId, '79');
            setlistDiag(data8);

            // tindakan medis
            let data9 = await getRiwRscId(identitasPx.RegistrasiId, '91');
            setlistTindMedis(data9);

            // Obat
            let data10 = await getRiwRscId(identitasPx.RegistrasiId, '94');
            setlistObat(data10);

            // Id Registrasi Uro
            let data11 = await getRiwRscId(identitasPx.RegistrasiId, '119');
            setRegUroId(data11);

            if (data11 && data11.length > 0) {
                setsts19(true);
            };

        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Title level={5} italic>
                        Id Registrasi Uronefrologi
                    </Title>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={RegUroId}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Keluhan Utama</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listKonUtama}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Riwayat Penyakit</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listRiwPenyakit}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Faktor Penyakit</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listFakRes}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Observasi Tekanan Darah Sistol</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listSistol}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Observasi Tekanan Darah Diastol</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listDiastol}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Observasi Berat Badan</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listBB}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Observasi Tinggi Badan</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listTB}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Hasil Pemeriksaan Penunjang</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listHasilPenunjang}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Diagnosis</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listDiag}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Tindakan/Prosedur Medis</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listTindMedis}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <Row>
                <Col span={12}>
                    <span>Obat</span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Table
                        bordered
                        loading={spCvg}
                        columns={colTbResource}
                        dataSource={listObat}
                        pagination={false}
                        size='small'
                    />
                </Col>
            </Row>

            <hr />
            <Row>
                <Col span={24}>
                    <Button
                        type="primary"
                        onClick={() => klikPost()}
                        disabled={RegUroId.length !== 0 ? true : false}
                        style={{ float: "right", width: "150px" }}
                    >
                        Post
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default FrmComposRegUronefrologi