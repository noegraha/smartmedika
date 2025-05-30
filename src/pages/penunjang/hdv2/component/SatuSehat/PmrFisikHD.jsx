import { Button, Col, Input, Modal, Row, Space, Spin } from 'antd'
import React, { useContext } from 'react'
import { AssesmentRIContext } from '../../../../rawatinap/context/AssesmentRIContext'
import { SatuSehatModulContext } from '../../../../satusehat/componentsatusehatmodul/context/SatuSehatModulContext';
import dayjs from 'dayjs';

const PmrFisikHD = () => {
    const {
        tekananDarahSistolik,
        tekananDarahDiastolik,
        tinggiBadan,
        beratBadan,
    } = useContext(AssesmentRIContext);

    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        spCvg,
        getRiwRscId,
        postResource,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const postTdSistole = () => {
        if (!tekananDarahSistolik) {
            Modal.warning({
                title: "Peringatan!",
                content: "Sistole masih kosong.",
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
                                code: "vital-signs",
                                display: "vital-signs"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: "8480-6",
                            display: "Systolic blood pressure"
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
                valueQuantity: {
                    value: tekananDarahSistolik,
                    unit: "mm[Hg]",
                    system: "http://unitsofmeasure.org",
                    code: "mm[Hg]"
                }
            };

            postResource(data, 'Observation', '15');
        }
    };

    const postTdDiastole = () => {
        if (!tekananDarahDiastolik) {
            Modal.warning({
                title: "Peringatan!",
                content: "Diastole masih kosong.",
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
                                code: "vital-signs",
                                display: "vital-signs"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: "8462-4",
                            display: "Diastolic blood pressure"
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
                valueQuantity: {
                    value: tekananDarahDiastolik,
                    unit: "mm[Hg]",
                    system: "http://unitsofmeasure.org",
                    code: "mm[Hg]"
                }
            };

            postResource(data, 'Observation', '16');
        }
    };

    const postBB = () => {
        if (!beratBadan) {
            Modal.warning({
                title: "Peringatan!",
                content: "Berat Badan masih kosong.",
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
                                code: "vital-signs",
                                display: "vital-signs"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: "29463-7",
                            display: "Body weight"
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
                valueQuantity: {
                    value: beratBadan,
                    unit: "kg",
                    system: "http://unitsofmeasure.org",
                    code: "kg"
                }
            };

            postResource(data, 'Observation', '50');
        }
    };

    const postTB = () => {
        if (!tinggiBadan) {
            Modal.warning({
                title: "Peringatan!",
                content: "Tinggi Badan masih kosong.",
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
                                code: "vital-signs",
                                display: "vital-signs"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: "8302-2",
                            display: "Body height"
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
                valueQuantity: {
                    value: tinggiBadan,
                    unit: "cm",
                    system: "http://unitsofmeasure.org",
                    code: "cm"
                }
            };

            postResource(data, 'Observation', '49');
        }
    };

    return (
        <div>
            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={19}>
                        <span>Tekanan Darah Sistolik :</span>
                    </Col>
                    <Col span={5}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input value={tekananDarahSistolik} readOnly />
                            <Button type="primary" onClick={() => postTdSistole()}>Post</Button>
                        </Space.Compact>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={19}>
                        <span>Tekanan Darah Diastolik :</span>
                    </Col>
                    <Col span={5}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input value={tekananDarahDiastolik} readOnly />
                            <Button type="primary" onClick={() => postTdDiastole()}>Post</Button>
                        </Space.Compact>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={19}>
                        <span>Berat Badan :</span>
                    </Col>
                    <Col span={5}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input value={beratBadan} readOnly />
                            <Button type="primary" onClick={() => postBB()}>Post</Button>
                        </Space.Compact>
                    </Col>
                </Row>
                <Row>
                    <Col span={19}>
                        <span>Tinggi Badan :</span>
                    </Col>
                    <Col span={5}>
                        <Space.Compact style={{ width: '100%' }}>
                            <Input value={tinggiBadan} readOnly />
                            <Button type="primary" onClick={() => postTB()}>Post</Button>
                        </Space.Compact>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default PmrFisikHD