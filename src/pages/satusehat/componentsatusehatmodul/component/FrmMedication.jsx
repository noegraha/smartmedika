/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Spin, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const FrmMedication = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        setsts15,
        spCvg,
        getRiwRscId,
        getMedicationBundle,
        kirimBundleV2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);
    const [medication, setmedication] = useState([]);
    const [medValid, setmedValid] = useState([]);
    const [waktuOrderResep, setwaktuOrderResep] = useState();
    const [waktuValidResep, setwaktuValidResep] = useState();

    useEffect(() => {
        klikRefresh('94');
        console.log('useEffect FrmMedication');
    }, []);

    const columnsd = [
        {
            title: 'KODEBARANG',
            dataIndex: 'KODEBARANG',
            key: 'KODEBARANG',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'NAMA BARANG',
            dataIndex: 'NAMABARANG',
            key: 'NAMABARANG',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'QTY BARANG',
            dataIndex: 'QTYBAR',
            key: 'QTYBAR',
            align: 'center',
        },
        {
            title: 'SATUAN',
            dataIndex: 'SATUAN',
            key: 'SATUAN',
            align: 'center',
        },
        {
            title: 'SATUAN KFA',
            dataIndex: 'BahanBakuAktifSatuanD_Disesuaikan',
            key: 'BahanBakuAktifSatuanD_Disesuaikan',
            align: 'center',
        },
        {
            title: 'ATURAN PAKAI',
            dataIndex: 'KODEATRPK',
            key: 'KODEATRPK',
            align: 'center',
        },
        {
            title: 'KODE KFA',
            dataIndex: 'KodeKFAPA',
            key: 'KodeKFAPA',
            align: 'center',
        },
        // {
        //     title: "Aksi",
        //     key: "operation",
        //     fixed: "right",
        //     align: "center",
        //     width: 50,
        //     render: (text, record, index) => (
        //         <Space size="small">
        //             <Button
        //                 // onClick={() => klikEditImp(index)}
        //                 type="primary"
        //                 icon={<EditOutlined />}
        //                 // disabled={record.StsDatang}
        //                 // disabled
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             />
        //         </Space>
        //     ),
        // },
    ];

    const columnse = [
        {
            title: 'NO. RESEP',
            dataIndex: 'NORESEP',
            key: 'NORESEP',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'NAMA BARANG',
            dataIndex: 'NAMABARANG',
            key: 'NAMABARANG',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'QTY BARANG',
            dataIndex: 'QTYBAR',
            key: 'QTYBAR',
            align: 'center',
        },
        {
            title: 'SATUAN',
            dataIndex: 'SATRSP',
            key: 'SATRSP',
            align: 'center',
        },
        {
            title: 'SATUAN KFA',
            dataIndex: 'BahanBakuAktifSatuanD_Disesuaikan',
            key: 'BahanBakuAktifSatuanD_Disesuaikan',
            align: 'center',
        },
        {
            title: 'ATURAN PAKAI',
            dataIndex: 'KODEATRPK',
            key: 'KODEATRPK',
            align: 'center',
        },
        {
            title: 'KODE KFA',
            dataIndex: 'KodeKFAPA',
            key: 'KodeKFAPA',
            align: 'center',
        },
        // {
        //     title: "Aksi",
        //     key: "operation",
        //     fixed: "right",
        //     align: "center",
        //     width: 50,
        //     render: (text, record, index) => (
        //         <Space size="small">
        //             <Button
        //                 // onClick={() => klikEditImp(index)}
        //                 type="primary"
        //                 icon={<EditOutlined />}
        //                 // disabled={record.StsDatang}
        //                 // disabled
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             />
        //         </Space>
        //     ),
        // },
    ];

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);
            if (data && data.length > 0) {
                setsts15(true);
            };

            // let data1 = await getProsedur(identitasPx.RegistrasiId);
            // setlistProsedur(data1);

            // console.log('getDiagnosa : ', data1);

            let data1 = await getMedicationBundle(identitasPx.RegistrasiId);
            // let data1 = await getMedicationBundle('2504160017');
            if (data1.result.Medication.orderList.length !== 0) {
                setmedication(data1.result.Medication.orderList);

                let a = data1.result.Medication.orderList.length - 1;
                setwaktuOrderResep(dayjs(data1.result.Medication.orderList[a].WaktuEntry).format('DD-MM-YYYY HH:mm'));
            }
            else {
                setmedication([]);
            }

            if (data1.result.MedicationDispense.length !== 0) {
                setmedValid(data1.result.MedicationDispense);

                let b = data1.result.MedicationDispense.length - 1;
                setwaktuValidResep(dayjs(data1.result.MedicationDispense[b].WaktuResep).format('DD-MM-YYYY HH:mm'));
            }
            else {
                setmedValid([]);
            }

            console.log('getMedicationBundle : ', data1);
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const postSatuSehat = (sData) => {
        // if (medication.length === 0) {
        //     Modal.warning({
        //         title: "Peringatan!",
        //         content: "Resource Medication tidak bisa dikirim karena tidak ada data Order Obat!",
        //     });
        // }
        // else {
        // }
        let waktuOrderResep_1 = medication.length === 0 ? paramEncounter.JamPelayanan : dayjs(waktuOrderResep, 'DD-MM-YYYY HH:mm');
        let waktuValidResep_1 = dayjs(waktuValidResep, 'DD-MM-YYYY HH:mm');

        console.log('waktuOrderResep_1 : ', waktuOrderResep_1);
        console.log('JamPelayanan : ', paramEncounter.JamPelayanan);

        // medical request
        let medRequest = null;
        let patenNotNullUuid = null;
        let uuidHard = null;

        // medical dispense
        let medDispense = null;
        let validNotNull = medValid.filter(item => item.KodeKFAPA !== null);
        let validNotNullUuid = validNotNull.map((item) => {
            const uuidMedValid = uuidv4();
            return { ...item, uuidMedValid }; // Menambahkan properti uuid ke setiap objek data
        });

        if (medication !== null && medication) {
            let patenNotNull = medication.flatMap(item => item.Paten.filter(paten => paten.KodeKFAPA !== null));
            patenNotNullUuid = patenNotNull.map((item) => {
                const uuid = uuidv4();
                return { ...item, uuid }; // Menambahkan properti uuid ke setiap objek data
            });

            medRequest = patenNotNullUuid.map((item, index) => {
                return {
                    fullUrl: `urn:uuid:${uuidHard = uuidv4()}`,
                    resource: {
                        resourceType: "MedicationRequest",
                        contained: [
                            {
                                resourceType: "Medication",
                                identifier: [
                                    {
                                        system: `http://sys-ids.kemkes.go.id/medication/${ihsRS}`,
                                        use: "official",
                                        value: item.KODEBARANG
                                    }
                                ],
                                id: item.NOORDER + index,
                                code: {
                                    coding: [
                                        {
                                            system: "http://sys-ids.kemkes.go.id/kfa",
                                            code: item.KodeKFAPA.replace(/\r?\n|\r/g, ''),
                                            display: item.NAMABARANG
                                        }
                                    ]
                                },
                                status: "active",
                                extension: [
                                    {
                                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType",
                                        valueCodeableConcept: {
                                            coding: [
                                                {
                                                    system: "http://terminology.kemkes.go.id/CodeSystem/medication-type",
                                                    code: "NC",
                                                    display: "Non-compound"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ],
                        identifier: [
                            {
                                system: `http://sys-ids.kemkes.go.id/prescription/${ihsRS}`,
                                use: "official",
                                value: item.NOORDER
                            },
                            {
                                system: `http://sys-ids.kemkes.go.id/prescription-item/${ihsRS}`,
                                use: "official",
                                value: item.NOORDER + '-' + (index + 1)
                            }
                        ],
                        status: "completed",
                        intent: "order",
                        category: [
                            {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/medicationrequest-category",
                                        code: "outpatient",
                                        display: "Outpatient"
                                    }
                                ]
                            }
                        ],
                        // "priority": "routine",
                        medicationReference: {
                            reference: '#' + item.NOORDER + index,
                            display: item.NAMABARANG
                        },
                        subject: {
                            reference: `Patient/${ihsPasien}`
                        },
                        encounter: {
                            reference: `Encounter/${paramEncounter.ResourceID}`
                        },
                        authoredOn: dayjs(waktuOrderResep_1).subtract(7, 'hour').format(),
                        // authoredOn: dayjs(waktuOrderResep).subtract(7, 'hour').format(),
                        requester: {
                            reference: `Practitioner/${item.IhsNumber}`,
                            // display: "Dokter Bronsig"
                        },
                        dosageInstruction: [
                            {
                                sequence: 1,
                                text: item.KODEATRPK,
                            }
                        ],
                        dispenseRequest: {
                            dispenseInterval: {
                                value: 1,
                                unit: "days",
                                system: "http://unitsofmeasure.org",
                                code: "d"
                            },
                            validityPeriod: {
                                start: dayjs(waktuOrderResep_1).subtract(7, 'hour').format(),
                                end: dayjs(waktuValidResep_1).subtract(7, 'hour').format()
                            },
                            // numberOfRepeatsAllowed: 0,
                            quantity: {
                                value: item.QTYBAR,
                                unit: item.BahanBakuAktifSatuanD_Disesuaikan.trim(),
                                system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                                code: item.BahanBakuAktifSatuanD_Disesuaikan.trim()
                            },
                            // expectedSupplyDuration: {
                            //     value: 30,
                            //     unit: "days",
                            //     system: "http://unitsofmeasure.org",
                            //     code: "d"
                            // },
                            performer: {
                                reference: `Organization/${ihsRS}` // ===> ini perlu di mapping Apotik masing2
                            }
                        }
                    },
                    request: {
                        method: "POST",
                        url: "MedicationRequest"
                    }
                }
            });
        }

        // jika tidak order 
        if (medication.length === 0 && medValid !== 0) {
            medRequest = validNotNullUuid.map((item, index) => {
                return {
                    fullUrl: `urn:uuid:${uuidHard = uuidv4()}`,
                    resource: {
                        resourceType: "MedicationRequest",
                        contained: [
                            {
                                resourceType: "Medication",
                                identifier: [
                                    {
                                        system: `http://sys-ids.kemkes.go.id/medication/${ihsRS}`,
                                        use: "official",
                                        value: item.KODEBARANG
                                    }
                                ],
                                id: item.NORESEP + index,
                                code: {
                                    coding: [
                                        {
                                            system: "http://sys-ids.kemkes.go.id/kfa",
                                            code: item.KodeKFAPA.replace(/\r?\n|\r/g, ''),
                                            display: item.NAMABARANG
                                        }
                                    ]
                                },
                                status: "active",
                                extension: [
                                    {
                                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType",
                                        valueCodeableConcept: {
                                            coding: [
                                                {
                                                    system: "http://terminology.kemkes.go.id/CodeSystem/medication-type",
                                                    code: "NC",
                                                    display: "Non-compound"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ],
                        identifier: [
                            {
                                system: `http://sys-ids.kemkes.go.id/prescription/${ihsRS}`,
                                use: "official",
                                value: item.NORESEP
                            },
                            {
                                system: `http://sys-ids.kemkes.go.id/prescription-item/${ihsRS}`,
                                use: "official",
                                value: item.NORESEP + '-' + (index + 1)
                            }
                        ],
                        status: "completed",
                        intent: "order",
                        category: [
                            {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/medicationrequest-category",
                                        code: "outpatient",
                                        display: "Outpatient"
                                    }
                                ]
                            }
                        ],
                        // "priority": "routine",
                        medicationReference: {
                            reference: '#' + item.NORESEP + index,
                            display: item.NAMABARANG
                        },
                        subject: {
                            reference: `Patient/${ihsPasien}`
                        },
                        encounter: {
                            reference: `Encounter/${paramEncounter.ResourceID}`
                        },
                        authoredOn: dayjs(waktuOrderResep_1).subtract(7, 'hour').format(),
                        // authoredOn: dayjs(waktuOrderResep).subtract(7, 'hour').format(),
                        requester: {
                            reference: `Practitioner/${item.IhsNumber}`,
                            // display: "Dokter Bronsig"
                        },
                        dosageInstruction: [
                            {
                                sequence: 1,
                                text: item.KODEATRPK,
                            }
                        ],
                        dispenseRequest: {
                            dispenseInterval: {
                                value: 1,
                                unit: "days",
                                system: "http://unitsofmeasure.org",
                                code: "d"
                            },
                            validityPeriod: {
                                start: dayjs(waktuOrderResep_1).subtract(7, 'hour').format(),
                                end: dayjs(waktuValidResep_1).subtract(7, 'hour').format()
                            },
                            // numberOfRepeatsAllowed: 0,
                            quantity: {
                                value: item.QTYBAR,
                                unit: item.BahanBakuAktifSatuanD_Disesuaikan.trim(),
                                system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                                code: item.BahanBakuAktifSatuanD_Disesuaikan.trim()
                            },
                            // expectedSupplyDuration: {
                            //     value: 30,
                            //     unit: "days",
                            //     system: "http://unitsofmeasure.org",
                            //     code: "d"
                            // },
                            performer: {
                                reference: `Organization/${ihsRS}` // ===> ini perlu di mapping Apotik masing2
                            }
                        }
                    },
                    request: {
                        method: "POST",
                        url: "MedicationRequest"
                    }
                }
            });
        }


        if (medValid.length !== 0) {
            medDispense = validNotNullUuid.map((item, index) => {
                return {
                    fullUrl: `urn:uuid:${uuidv4()}`,
                    resource: {
                        resourceType: "MedicationDispense",
                        contained: [
                            {
                                resourceType: "Medication",
                                identifier: [
                                    {
                                        system: `http://sys-ids.kemkes.go.id/medication/${ihsRS}`,
                                        use: "official",
                                        value: item.KODEBARANG
                                    }
                                ],
                                id: item.NORESEP + index,
                                code: {
                                    coding: [
                                        {
                                            system: "http://sys-ids.kemkes.go.id/kfa",
                                            code: item.KodeKFAPA.replace(/\r?\n|\r/g, ''),
                                            display: item.NAMABARANG
                                        }
                                    ]
                                },
                                status: "active",
                                extension: [
                                    {
                                        url: "https://fhir.kemkes.go.id/r4/StructureDefinition/MedicationType",
                                        valueCodeableConcept: {
                                            coding: [
                                                {
                                                    system: "http://terminology.kemkes.go.id/CodeSystem/medication-type",
                                                    code: "NC",
                                                    display: "Non-compound"
                                                }
                                            ]
                                        }
                                    }
                                ]
                            }
                        ],
                        identifier: [
                            {
                                system: `http://sys-ids.kemkes.go.id/prescription/${ihsRS}`,
                                use: "official",
                                value: item.NORESEP
                            },
                            {
                                system: `http://sys-ids.kemkes.go.id/prescription-item/${ihsRS}`,
                                use: "official",
                                value: item.NORESEP + '-' + (index + 1)
                            }
                        ],
                        status: "completed",
                        category: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/fhir/CodeSystem/medicationdispense-category",
                                    code: "outpatient",
                                    display: "Outpatient"
                                }
                            ]
                        },
                        medicationReference: {
                            reference: '#' + item.NORESEP + index,
                            display: item.NAMABARANG
                        },
                        subject: {
                            reference: `Patient/${ihsPasien}`
                        },
                        context: {
                            reference: `Encounter/${paramEncounter.ResourceID}`
                        },
                        // performer: [
                        //     {
                        //         actor: {
                        //             reference: "Practitioner/N10000003",
                        //             display: "John Miller"
                        //         }
                        //     }
                        // ],
                        location: {
                            reference: `Location/${item.SatuSehatId}`,
                        },
                        authorizingPrescription: [ // MANDATORY
                            {
                                reference: `MedicationRequest/${uuidHard}` // medicationRequest
                            }
                        ],
                        quantity: {
                            system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                            code: item.BahanBakuAktifSatuanD_Disesuaikan.trim(),
                            value: item.QTYBAR
                        },
                        // daysSupply: {
                        //     value: 30,
                        //     unit: "Day",
                        //     system: "http://unitsofmeasure.org",
                        //     code: "d"
                        // },
                        whenPrepared: dayjs(waktuOrderResep_1).subtract(7, 'hour').format(),
                        whenHandedOver: dayjs(waktuValidResep_1).subtract(7, 'hour').format(),
                        dosageInstruction: [
                            {
                                sequence: 1,
                                text: item.KODEATRPK,
                                // timing: {
                                //     repeat: {
                                //         frequency: 1,
                                //         period: 1,
                                //         periodUnit: "d"
                                //     }
                                // },
                                doseAndRate: [
                                    {
                                        type: {
                                            coding: [
                                                {
                                                    system: "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                                                    code: "ordered",
                                                    display: "Ordered"
                                                }
                                            ]
                                        },
                                        doseQuantity: {
                                            value: item.QTYBAR,
                                            unit: item.BahanBakuAktifSatuanD_Disesuaikan.trim(),
                                            system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                                            code: item.BahanBakuAktifSatuanD_Disesuaikan.trim()
                                        }
                                    }
                                ]
                            }
                        ]
                    },
                    request: {
                        method: "POST",
                        url: "MedicationDispense"
                    }
                }
            });
        };

        // filter yang null
        const objArray = [medRequest, medDispense];
        const filteredObjArray = objArray.filter(obj => obj !== null);
        // menggabungkan objek
        const mergedData = [].concat(...filteredObjArray);

        let dataKirim = {
            resourceType: 'Bundle',
            type: 'transaction',
            entry: mergedData
        }

        console.log('dataKirim : ', dataKirim);
        kirimBundleV2(dataKirim, 'MedicationRequest', '94');
    };

    return (
        <div>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={12}>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            klikRefresh('94');
                            // getMedicationBundle(identitasPx.RegistrasiId);
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

            <Spin spinning={spCvg} tip="Loading... 😁">
                {medication.map((item, index) => (
                    <div>
                        <Row>
                            <Col span={24}>
                                <span><b>Daftar Obat ORDER</b></span>
                                <hr style={{ marginTop: '-3px', marginBottom: '-3px' }} />
                            </Col>
                            <Col span={5}>
                                <span>No.Order : {item.NOORDER}</span>
                            </Col>
                            <Col span={5}>
                                <span>No.Reg. : {item.RegistrasiId}</span>
                            </Col>
                            <Col span={5}>
                                <span>Tgl.Order : {dayjs(item.WaktuEntry).format('DD-MM-YYYY HH:mm')}</span>
                            </Col>
                            <Col span={9}>
                                <span>Apt.Tujuan : {item.NamaBagian}</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <span>Daftar Obat Paten :</span>
                            </Col>
                        </Row>
                        <Table
                            columns={columnsd}
                            dataSource={item.Paten}
                            size='small'
                            bordered
                            pagination={false}
                        // style={{ marginTop: '2px', width: '98%' }} 
                        />
                        <Row>
                            <Col>
                                <span>Daftar Obat Racikan :</span>
                            </Col>
                        </Row>
                        <Table
                            columns={columnsd}
                            dataSource={item.Racik}
                            size='small'
                            bordered
                            pagination={false}
                        />
                    </div>
                ))}

                <Row style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <span><b>Daftar Obat TERVALIDASI</b></span>
                        <hr style={{ marginTop: '0px' }} />
                    </Col>
                </Row>
                <Table
                    columns={columnse}
                    // dataSource={item.Obat}
                    dataSource={medValid}
                    size='small'
                    bordered
                    pagination={false}
                />

                <hr />
                <Row>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => postSatuSehat()}
                            disabled={paramEncounter && paramEncounter.ResourceID ? false : true}
                            style={{ float: 'right', width: '150px' }}>
                            Post
                        </Button>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default FrmMedication