import { Button, Col, Divider, Input, Modal, Row, Select, Spin, Table, Typography } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../../../context/SatuSehatEncounterContext';
import { CloudUploadOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;
const { Title } = Typography;
const { Option } = Select;

const ServiceReq = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        setmsRscdetail,
        waktuPelayanan,
        postResource,
        getResourceById,
        getRiwRscId,
        getOrderPenunjang,
        getHasilLabPk,
        kirimBundleV2,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [listTable, setlistTable] = useState([]);
    const [listTable2, setlistTable2] = useState([]);
    const [noOrder, setnoOrder] = useState('2024L12040001');
    const [kodePmr, setkodePmr] = useState();
    const [code, setcode] = useState();
    const [codeDsp, setcodeDsp] = useState();
    const [codeKPTL, setcodeKPTL] = useState();
    const [codeSpecimen, setcodeSpecimen] = useState();
    const [codeStsFasting, setcodeStsFasting] = useState();
    const [volume, setvolume] = useState(10);
    const [keterangan, setketerangan] = useState('Jumlah Trombosit dalam darah');
    const [ketPenyebab, setketPenyebab] = useState("Pemeriksaan jumlah trombosit dalam darah untuk kemungkinan demam berdarah");
    const [ketProcedure, setketProcedure] = useState("Tidak puasa");
    const [catatan, setcatatan] = useState("Pasien tidak perlu berpuasa terlebih dahulu");
    const [idProsedur, setidProsedur] = useState();
    const [methodSpesimen, setmethodSpesimen] = useState();
    const [hasilLab, sethasilLab] = useState({});
    const [listOrderPenunjang, setlistOrderPenunjang] = useState([]);
    const [listHasilLab, setlistHasilLab] = useState([]);
    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);
    const [mdPostSR, setmdPostSR] = useState(false);
    const [mdPostHslLabPK, setmdPostHslLabPK] = useState(false);

    const listKPTL = [
        {
            system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
            code: "30679",
            display: "JUMLAH TROMBOSIT"
        },
    ];

    const listCode = [
        {
            system: "http://loinc.org",
            code: "26515-7",
            display: "Platelets [#/volume] in Blood"
        }
    ];

    const listSpecimen = [
        {
            code: "119297000",
            display: "Blood specimen"
        },
        {
            code: "122575003",
            display: "Urine specimen"
        },
        {
            code: "122583005",
            display: "Tissue specimen"
        },
        {
            code: "119335006",
            display: "Sputum specimen"
        },
        {
            code: "119361006",
            display: "Cerebrospinal fluid specimen"
        },
        {
            code: "119292002",
            display: "Amniotic fluid specimen"
        },
        {
            code: "119297009",
            display: "Bone marrow specimen"
        },
        {
            code: "122566003",
            display: "Synovial fluid specimen"
        },
        {
            code: "258661009",
            display: "Saliva specimen"
        },
        {
            code: "122587006",
            display: "Hair specimen"
        }
    ];

    const listFasting = [
        {
            code: "NF",
            display: "The patient indicated they did not fast prior to the procedure."
        },
        {
            code: "F",
            display: "The patient indicated they fasted prior to the procedure."
        },
        {
            code: "CF",
            display: "The patient indicated they fasted except for water."
        },
        {
            code: "LF",
            display: "The patient indicated they fasted except for prescribed medications."
        },
        {
            code: "NPO",
            display: "The patient indicated they were instructed not to take anything by mouth (NPO)."
        }
    ];

    const listMethod = [
        {
            code: "82078001",
            display: "Collection of blood specimen for laboratory"
        },
        {
            code: "386144009",
            display: "Venipuncture"
        },
        {
            code: "386337007",
            display: "Capillary blood specimen collection"
        },
        {
            code: "122575003",
            display: "Urine specimen collection"
        },
        // {
        //     code: "264190007",
        //     display: "Clean catch urine collection"
        // },
        {
            code: "73761001",
            display: "Catheterized urine collection"
        },
        {
            code: "122463008",
            display: "Biopsy procedure"
        },
        {
            code: "76066005",
            display: "Fine needle aspiration biopsy"
        },
        {
            code: "23170004",
            display: "Excisional biopsy"
        },
        {
            code: "269013007",
            display: "Lumbar puncture"
        },
        {
            code: "428051000124104",
            display: "Ventricular cerebrospinal fluid collection"
        },
        {
            code: "44400000",
            display: "Aspiration of body fluid"
        },
        {
            code: "229800000",
            display: "Thoracentesis"
        },
        {
            code: "197480006",
            display: "Paracentesis"
        },
        {
            code: "119290006",
            display: "Nasopharyngeal swab"
        },
        {
            code: "80146002",
            display: "Throat swab"
        },
        {
            code: "122468009",
            display: "Skin swab"
        },
        {
            code: "168975004",
            display: "Collection of saliva specimen"
        },
        {
            code: "42992005",
            display: "Induced sputum collection"
        },
        {
            code: "257559000",
            display: "Spontaneous sputum collection"
        }
    ];

    const klikDetail = (id, rscType) => {
        setmsRscdetail(true);
        getResourceById(id, rscType);
    };

    const colTbResource = [
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
            title: 'RegistrasiId',
            dataIndex: 'RegistrasiId',
            align: 'center',
            key: 'RegistrasiId',
            width: 150,
        },
        {
            title: 'ResourceId',
            dataIndex: 'ResourceID',
            key: 'ResourceID',
        },
        {
            title: 'ResourceType',
            dataIndex: 'ResourceType',
            key: 'ResourceType',
        },
        {
            title: 'DateEntry',
            dataIndex: 'DateEntry',
            key: 'DateEntry',
            align: 'center',
            width: 200,
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
                        onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const colOrderPenunjang = [
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
            title: 'No Order',
            dataIndex: 'NOORDER',
            align: 'center',
            key: 'NOORDER',
            // width: 150,
        },
        {
            title: 'KODEPMR',
            dataIndex: 'KODEPMR',
            key: 'KODEPMR',
        },
        {
            title: 'Nama Pemeriksaan',
            dataIndex: 'NamaPemeriksaan',
            key: 'NamaPemeriksaan',
        },
        {
            title: 'NAMA DOKTER',
            dataIndex: 'NAMADOKTER',
            key: 'NAMADOKTER',
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
                            setnoOrder(record.NOORDER);
                            setcode();
                            setcodeDsp();
                            setketerangan(record.NamaPemeriksaan);
                            setkodePmr(record.KODEPMR);
                            // setketPenyebab();
                            // setcatatan();
                            setmdPostSR(true);
                        }}
                        icon={<CloudUploadOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const colHslLabPK = [
        {
            title: 'Id',
            dataIndex: 'Id',
            key: 'Id',
            align: 'center',
            ellipsis: true,
            // width: 50,
            // render: (text, record, index) => index + 1,
        },
        {
            title: 'Pemeriksaan',
            dataIndex: 'LabNama',
            // align: 'center',
            key: 'LabNama',
            // width: 150,
        },
        {
            title: 'Hasil',
            dataIndex: 'LabHasil',
            key: 'LabHasil',
            align: 'center',
        },
        {
            title: 'Interpretasi',
            dataIndex: 'flag',
            key: 'flag',
            align: 'center',
        },
        {
            title: 'Satuan',
            dataIndex: 'LabSatuan',
            key: 'LabSatuan',
            align: 'center',
        },
        {
            title: 'Nilai Normal',
            dataIndex: 'LabHargaNorm',
            key: 'LabHargaNorm',
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
                            sethasilLab(record);
                            setmdPostHslLabPK(true);
                        }}
                        icon={<CloudUploadOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        if (codeGrup === '66') {
            setlistTable(data);
        }
        if (codeGrup === '68') {
            setlistTable2(data);
        }
        else {
            setidProsedur(data.lenght !== 0 ? data[0].ResourceID : null);
        }
    };

    const postRiwayat = () => {
        let data = {
            resourceType: "ServiceRequest",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
                    value: noOrder
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
                            code: "108252007",
                            display: "Laboratory procedure"
                        }
                    ]
                }
            ],
            code: {
                coding: [
                    code,
                    codeKPTL
                ],
                text: keterangan
            },
            subject: {
                reference: `Patient/${ihsPasien}`,
            },
            encounter: {
                reference: `Encounter/${paramEncounter.ResourceID}`
            },
            occurrenceDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            authoredOn: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            requester: {
                reference: `Practitioner/${paramEncounter.IhsPracticioner}`
            },
            performer: [
                {
                    reference: "Practitioner/10018452434",
                    display: "dr. Nathalie Tan, Sp.PK."
                }
            ],
            reasonCode: [
                {
                    text: ketPenyebab
                }
            ],
            note: [
                {
                    text: catatan
                }
            ],
            supportingInfo: [
                {
                    reference: `Procedure/${idProsedur}`
                }
            ]
        };

        postResource(data, 'ServiceRequest', '66');
    };

    const klikGet = async () => {
        let data = await getOrderPenunjang(identitasPx.RegistrasiId);
        setlistOrderPenunjang(data.result);
        console.log('klikGet : ', data);
    };

    const postSR = () => {
        let idPc = uuidv4();
        let dataPc = {
            fullUrl: `urn:uuid:${idPc}`,
            resource: {
                resourceType: "Procedure",
                status: "not-done",
                category: {
                    coding: [
                        {
                            system: "http://terminology.kemkes.go.id",
                            code: "TK000028",
                            display: "Diagnostic procedure"
                        }
                    ],
                    text: "Prosedur diagnostik"
                },
                code: {
                    coding: [
                        {
                            system: "http://snomed.info/sct",
                            code: "792805006",
                            display: "Fasting"
                        }
                    ]
                },
                subject: {
                    reference: `Patient/${ihsPasien}`,
                    display: identitasPx.Nama
                },
                encounter: {
                    reference: `Encounter/${paramEncounter.ResourceID}`
                },
                performedPeriod: {
                    start: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                    end: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                },
                performer: [
                    {
                        actor: {
                            reference: "Practitioner/10018452434",
                            display: "dr. Nathalie Tan, Sp.PK."
                        }
                    }
                ],
                note: [
                    {
                        text: ketProcedure
                    }
                ]
            },
            request: {
                method: "POST",
                url: "Procedure"
            }
        };

        let idSR = uuidv4();
        let dataSr = {
            fullUrl: `urn:uuid:${idSR}`,
            resource: {
                resourceType: "ServiceRequest",
                identifier: [
                    {
                        system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
                        value: noOrder + kodePmr
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
                                code: "108252007",
                                display: "Laboratory procedure"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: code,
                            display: codeDsp
                        }
                        // {
                        //     "system": "http://terminology.kemkes.go.id/CodeSystem/kptl",
                        //     "code": "13120.JS004",
                        //     "display": "Pemeriksaan golongan darah, Konfirmasi"
                        // }
                    ],
                    text: keterangan
                },
                subject: {
                    reference: `Patient/${ihsPasien}`,
                },
                encounter: {
                    reference: `Encounter/${paramEncounter.ResourceID}`
                },
                occurrenceDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                authoredOn: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                requester: {
                    reference: `Practitioner/${paramEncounter.IhsPracticioner}`
                },
                performer: [
                    {
                        reference: "Practitioner/10018452434",
                        display: "dr. Nathalie Tan, Sp.PK."
                    }
                ],
                reasonCode: [
                    {
                        text: ketPenyebab
                    }
                ],
                note: [
                    {
                        text: catatan
                    }
                ],
                supportingInfo: [
                    {
                        reference: `Procedure/${idPc}`
                    }
                ]
            },
            request: {
                method: "POST",
                url: "ServiceRequest"
            }
        };

        let idSp = uuidv4();
        let dataSp = {
            fullUrl: `urn:uuid:${idSp}`,
            resource: {
                resourceType: "Specimen",
                identifier: [
                    {
                        system: `http://sys-ids.kemkes.go.id/specimen/${ihsRS}`,
                        value: noOrder + kodePmr,
                        assigner: {
                            reference: `Organization/${ihsRS}`
                        }
                    }
                ],
                status: "available",
                type: {
                    coding: [
                        {
                            system: "http://snomed.info/sct",
                            code: codeSpecimen.code,
                            display: codeSpecimen.display
                        }
                    ]
                },
                collection: {
                    collector: {
                        reference: "Practitioner/10018452434",
                        display: "dr. Nathalie Tan, Sp.PK."
                    },
                    collectedDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                    quantity: {
                        value: parseInt(volume, 10),
                        code: "mL",
                        unit: "mL",
                        system: "http://unitsofmeasure.org"
                    },
                    method: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: methodSpesimen.code,
                                display: methodSpesimen.display
                            }
                        ]
                    },
                    // bodySite: {
                    //     coding: [
                    //         bodySite
                    //     ]
                    // },
                    fastingStatusCodeableConcept: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v2-0916",
                                code: codeStsFasting.code,
                                display: codeStsFasting.display
                            }
                        ]
                    }
                },
                processing: [
                    {
                        procedure: {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: "9265001",
                                    display: "Specimen processing"
                                }
                            ]
                        },
                        timeDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                    }
                ],
                subject: {
                    reference: `Patient/${ihsPasien}`,
                    // display: "{{Patient_Name}}"
                },
                request: [
                    {
                        reference: `ServiceRequest/${idSR}`
                    }
                ],
                receivedTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            },
            request: {
                method: "POST",
                url: "Specimen"
            }
        };

        let data = [dataPc, dataSr, dataSp];

        let dataKirim = {
            resourceType: 'Bundle',
            type: 'transaction',
            entry: data
        };

        // console.log('dataKirim : ', dataKirim);
        kirimBundleV2(dataKirim, 'ServiceRequest', '66');
    };

    const klikGetHasilLab = async (sReg) => {
        let data = await getHasilLabPk(sReg);
        setlistHasilLab(data.result);
    };

    const changeHasilLab = (params, e) => {
        let data = hasilLab; // Salin data lama ke variabel lokal
        data[params] = e; // Perbarui data lokal dengan properti baru

        console.log(data);
    };

    const postHasilLab = () => {
        let idObs = uuidv4();
        let data = {
            fullUrl: `urn:uuid:${idObs}`,
            resource: {
                resourceType: "Observation",
                identifier: [
                    {
                        system: `http://sys-ids.kemkes.go.id/observation/${ihsRS}`,
                        value: hasilLab.Id.toString()
                    }
                ],
                status: "final",
                category: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                                code: "laboratory",
                                display: "Laboratory"
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: hasilLab.code,
                            display: hasilLab.display
                        }
                    ]
                },
                subject: {
                    reference: `Patient/${ihsPasien}`,
                },
                encounter: {
                    reference: `Encounter/${paramEncounter.ResourceID}`
                },
                effectiveDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                issued: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                performer: [
                    {
                        reference: "Practitioner/10018452434"
                    },
                    {
                        reference: `Organization/${ihsRS}`
                    }
                ],
                specimen: {
                    reference: `Specimen/${hasilLab.specimentId}`
                },
                basedOn: [
                    {
                        reference: `ServiceRequest/${hasilLab.serviceReqId}`
                    }
                ],
                valueQuantity: {
                    value: parseInt(hasilLab.LabHasil, 10),
                    unit: hasilLab.LabSatuan,
                    system: "http://unitsofmeasure.org",
                    code: hasilLab.LabSatuan
                },
                interpretation: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                code: hasilLab.flag,
                                // display: "Low"
                            }
                        ]
                    }
                ]
                // "referenceRange": [
                //     {
                //         "low": {
                //             "value": 150,
                //             "unit": "10*3/uL",
                //             "system": "http://unitsofmeasure.org",
                //             "code": "10*3/uL"
                //         }
                //     },
                //     {
                //         "high": {
                //             "value": 440,
                //             "unit": "10*3/uL",
                //             "system": "http://unitsofmeasure.org",
                //             "code": "10*3/uL"
                //         }
                //     }
                // ]
            },
            request: {
                method: "POST",
                url: "Observation"
            }
        }

        let data1 = {
            fullUrl: `urn:uuid:${uuidv4()}`,
            resource: {
                resourceType: "DiagnosticReport",
                identifier: [
                    {
                        system: `http://sys-ids.kemkes.go.id/diagnostic/${ihsRS}/lab`,
                        use: "official",
                        value: hasilLab.Id.toString()
                    }
                ],
                status: "final",
                category: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v2-0074",
                                code: hasilLab.DiagCtgCode,
                                display: hasilLab.DiagCtgDisp
                            }
                        ]
                    }
                ],
                code: {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: hasilLab.code,
                            display: hasilLab.display
                        }
                    ]
                },
                subject: {
                    reference: `Patient/${ihsPasien}`,
                },
                encounter: {
                    reference: `Encounter/${paramEncounter.ResourceID}`
                },
                effectiveDateTime: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                issued: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                performer: [
                    {
                        reference: "Practitioner/10018452434"
                    },
                    {
                        reference: `Organization/${ihsRS}`
                    }
                ],
                result: [
                    {
                        reference: `Observation/${idObs}`
                    }
                ],
                specimen: [
                    {
                        reference: `Specimen/${hasilLab.specimentId}`
                    }
                ],
                basedOn: [
                    {
                        reference: `ServiceRequest/${hasilLab.serviceReqId}`
                    }
                ],
                conclusionCode: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                                code: hasilLab.flag,
                                // display: "Low"
                            }
                        ]
                    }
                ]
            },
            request: {
                method: "POST",
                url: "DiagnosticReport"
            }
        };

        let merge = [data, data1];

        let dataKirim = {
            resourceType: 'Bundle',
            type: 'transaction',
            entry: merge
        };

        console.log(dataKirim);
        kirimBundleV2(dataKirim, 'Observation', '68');
    }

    return (
        <div>
            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Row>
                    <Col span={22}>
                        <Divider
                            variant="dotted"
                            orientation="left"
                            style={{
                                borderColor: '#7cb305',
                            }}
                        >
                            Service Request
                        </Divider>
                    </Col>
                    <Col span={2}>
                        <Button
                            onClick={() => {
                                klikGet();
                            }}
                            style={{ float: 'right' }}
                        >
                            Ambil Data
                        </Button>
                    </Col>
                </Row>

                {/* Tabel Order Penunjang */}
                <Table
                    bordered
                    loading={spCvg}
                    columns={colOrderPenunjang}
                    dataSource={listOrderPenunjang}
                    pagination={false}
                    size='small'
                    style={{ marginBottom: '5px' }}
                />

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        {/* <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                // setketerangan("Tidak puasa");
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah
                        </Button> */}
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('66');
                            }}
                            style={{ float: 'right' }}
                        >
                            Refresh
                        </Button>
                    </Col>
                </Row>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbResource}
                    dataSource={listTable}
                    pagination={false}
                    size='small'
                    style={{ marginBottom: '5px' }}
                />

                <Row>
                    <Col span={22}>
                        <Divider
                            variant="dotted"
                            orientation="left"
                            style={{
                                borderColor: '#7cb305',
                            }}
                        >
                            Observation & Diagnostic Report
                        </Divider>
                    </Col>
                    <Col span={2}>
                        <Button
                            onClick={() => {
                                klikGetHasilLab(identitasPx.RegistrasiId);
                            }}
                            style={{ float: 'right' }}
                        >
                            Ambil Data
                        </Button>
                    </Col>
                </Row>

                {/* Tabel Hasil Lab PK */}
                <Table
                    bordered
                    loading={spCvg}
                    columns={colHslLabPK}
                    dataSource={listHasilLab}
                    pagination={false}
                    size='small'
                    style={{ marginBottom: '5px' }}
                />

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        {/* <Button
                            type='primary'
                            onClick={() => {
                                setmdTambahRiwayat(true);
                                // setketerangan("Tidak puasa");
                            }}
                            icon={<PlusOutlined />}
                        >
                            Tambah
                        </Button> */}
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('68');
                            }}
                            style={{ float: 'right' }}
                        >
                            Refresh
                        </Button>
                    </Col>
                </Row>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbResource}
                    dataSource={listTable2}
                    pagination={false}
                    size='small'
                    style={{ marginBottom: '5px' }}
                />

            </Spin>

            <Modal
                visible={mdTambahRiwayat}
                onCancel={() => setmdTambahRiwayat(false)}
                width="80%"
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Divider
                    variant="dotted"
                    orientation="left"
                    style={{
                        borderColor: '#7cb305',
                    }}
                >
                    Tambah Service Request Laborat
                </Divider>
                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>No.Order :</span>
                        </Col>
                        <Col span={21}>
                            <Input value={noOrder} onChange={(e) => setnoOrder(e.target.value)} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Code :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listCode.find((item) => item.code === value);
                                    setcode(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listCode.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Kode KPTL :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listKPTL.find((item) => item.code === value);
                                    setcodeKPTL(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listKPTL.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Ket. Order :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4}
                                value={keterangan}
                                onChange={(e) => setketerangan(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Ket. Penyebab :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4}
                                value={ketPenyebab}
                                onChange={(e) => setketPenyebab(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Catatan :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4}
                                value={catatan}
                                onChange={(e) => setcatatan(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Prosedur Id :</span>
                        </Col>
                        <Col span={19}>
                            {idProsedur}
                        </Col>
                        <Col span={2}>
                            <Button
                                onClick={() => {
                                    klikRefresh('65');
                                }}
                                style={{ float: 'right' }}
                            >
                                Refresh
                            </Button>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => postRiwayat()}
                                disabled={!idProsedur}
                                style={{ float: 'right', width: '150px' }}>
                                Post Tujuan
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>

            <Modal
                visible={mdPostSR}
                onCancel={() => setmdPostSR(false)}
                width="80%"
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Divider
                    variant="dotted"
                    orientation="left"
                    style={{
                        borderColor: '#7cb305',
                    }}
                >
                    Post Service Request Laboratorium
                </Divider>

                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Title level={5} underline>Procedure</Title>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Ket. Status Puasa :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4}
                                value={ketProcedure}
                                onChange={(e) => setketProcedure(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Title level={5} underline>Service Request</Title>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>No.Order :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={noOrder}
                                readOnly
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Code :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={code}
                                onChange={(e) => setcode(e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Code Display :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={codeDsp}
                                onChange={(e) => setcodeDsp(e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Nama Pmr. :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4}
                                value={keterangan}
                                onChange={(e) => setketerangan(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Ket. Penyebab :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4}
                                value={ketPenyebab}
                                onChange={(e) => setketPenyebab(e.target.value)}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Catatan :</span>
                        </Col>
                        <Col span={21}>
                            <TextArea rows={4}
                                value={catatan}
                                onChange={(e) => setcatatan(e.target.value)}
                            />
                        </Col>
                    </Row>

                    <Title level={5} underline>Specimen</Title>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>No.Specimen :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={noOrder}
                                readOnly
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Jns.Specimen :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listSpecimen.find((item) => item.code === value);
                                    setcodeSpecimen(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listSpecimen.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Volume :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={volume}
                                onChange={(e) => setvolume(e.target.value)}
                                size='small'
                                addonAfter="mL"
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Method :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listMethod.find((item) => item.code === value);
                                    setmethodSpesimen(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listMethod.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Status Puasa :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    const selectedStatus = listFasting.find((item) => item.code === value);
                                    setcodeStsFasting(selectedStatus); // Set objek yang dipilih
                                }}
                            >
                                {listFasting.map((item, index) => (
                                    <Option key={index} value={item.code}>{item.display}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => postSR()}
                                // disabled={!idProsedur}
                                style={{ float: 'right', width: '150px' }}>
                                Post
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>

            <Modal
                visible={mdPostHslLabPK}
                onCancel={() => setmdPostHslLabPK(false)}
                width="80%"
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Divider
                    variant="dotted"
                    orientation="left"
                    style={{
                        borderColor: '#7cb305',
                    }}
                >
                    Post Observation & Diagnostik Laboratorium
                </Divider>

                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Title level={5} underline>Observation</Title>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Nomor :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={hasilLab.Id}
                                readOnly
                                // onChange={(e) => setvolume(e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Code Loinc :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                // value={volume}
                                onChange={(e) => changeHasilLab('code', e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Display Loinc :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                // value={volume}
                                onChange={(e) => changeHasilLab('display', e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Spesimen Id :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(e) => changeHasilLab('specimentId', e)}
                            >
                                {listTable
                                    .filter((item) => item.ResourceType === "Specimen") // Filter hanya item dengan ResourceType = "Speciment"
                                    .map((item, index) => (
                                        <Option key={index} value={item.ResourceID}>
                                            {item.ResourceID + " - " + item.ResourceType}
                                        </Option>
                                    ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Serv.Request Id :</span>
                        </Col>
                        <Col span={21}>
                            <Select
                                // value={gedung}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(e) => changeHasilLab('serviceReqId', e)}
                            >
                                {listTable
                                    .filter((item) => item.ResourceType === "ServiceRequest") // Filter hanya item dengan ResourceType = "Speciment"
                                    .map((item, index) => (
                                        <Option key={index} value={item.ResourceID}>
                                            {item.ResourceID + " - " + item.ResourceType}
                                        </Option>
                                    ))}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Hasil :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={hasilLab.LabHasil}
                                readOnly
                                // onChange={(e) => setvolume(e.target.value)}
                                size='small'
                                addonAfter={hasilLab.LabSatuan}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Interpretasi :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                value={hasilLab.flag}
                                readOnly
                                // onChange={(e) => setvolume(e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>

                    <Title level={5} underline>Diagnostic Report</Title>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Code Ctg :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                // value={volume}
                                onChange={(e) => changeHasilLab('DiagCtgCode', e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Display Ctg :</span>
                        </Col>
                        <Col span={21}>
                            <Input
                                // value={volume}
                                onChange={(e) => changeHasilLab('DiagCtgDisp', e.target.value)}
                                size='small'
                            />
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => postHasilLab()}
                                // disabled={!idProsedur}
                                style={{ float: 'right', width: '150px' }}>
                                Post
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>
        </div>
    )
}

export default ServiceReq