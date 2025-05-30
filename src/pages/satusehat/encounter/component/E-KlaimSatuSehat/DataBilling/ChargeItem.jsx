import { Button, Col, Divider, Input, Modal, Row, Space, Spin, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../context/SatuSehatEncounterContext';
import { CarryOutOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import dayjs from 'dayjs';

const ChargeItem = () => {
    const {
        ihsRS,
        waktuPelayanan,
        ihsPasien,
        identitasPx,
        accountId,
        setlistOrderResep,
        listObatKeluaran,
        setmsRscdetail,
        paramEncounter,
        paramCoverage,
        dataSepDummy,
        getResourceById,
        getRiwRscId,
        getListKeluaranObat,
        getProsedur,
        getResourceByIdv2,
        getBillPasien,
        getDiagPrimer,
        getDxPasien,
        getEklaim,
        postResource,
        kirimBundleV2,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [listTable, setlistTable] = useState();
    const [listBill, setlistBill] = useState([]);
    const [listBillBhp, setlistBillBhp] = useState([]);
    const [listBillObat, setlistBillObat] = useState([]);
    const [listDx, setlistDx] = useState();
    const [listProcedur, setlistProcedur] = useState();
    const [code, setcode] = useState();
    const [display, setdisplay] = useState();
    const [tempIndex, settempIndex] = useState();
    const [orgBpjs, setorgBpjs] = useState('100071505');
    const [noBatch, setnoBatch] = useState('');
    const [noSep, setnoSep] = useState('');
    const [totalKlaim, settotalKlaim] = useState();
    const [codeInacbg, setcodeInacbg] = useState('');
    const [dispInacbg, setdispInacbg] = useState('');
    const [dtEklaim, setdtEklaim] = useState({});
    const [nikKoder, setnikKoder] = useState('3657746633553535555');
    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);
    const [mdTambahKptl, setmdTambahKptl] = useState(false);

    const klikDetail = (id, rscType) => {
        setmsRscdetail(true);
        getResourceById(id, rscType);
        ;
    }

    const klikDetailv2 = async (id, rscType, i) => {
        let data = await getResourceByIdv2(id, rscType);
        // console.log('klikDetailv2 : ', data);
        // console.log('dataRecord : ', dataRecord);

        // Memfilter hanya objek dengan url tertentu
        let filtered = data.extension.filter(item =>
            item.url === "https: //fhir.kemkes.go.id/r4/StructureDefinition/totalPrice"
        );

        // Edit elemen pada index 1
        const newData = listTable.map((item, index) => {
            if (index === i) {
                return {
                    ...item,
                    code: data.code.coding[0].code,
                    display: data.code.coding[0].display,
                    system: data.code.coding[0].system,
                    total: filtered[0].valueMoney.value
                };
            }
            return item;
        });

        setlistTable(newData);
    }

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
            width: 150,
        },
        {
            title: 'DateEntry',
            dataIndex: 'DateEntry',
            key: 'DateEntry',
            align: 'center',
            width: 100,
            render: (text) => dayjs(text).format("DD-MM-YYYY"), // Format tanggal
        },
        {
            title: 'Total',
            dataIndex: 'total',
            key: 'total',
            align: 'right',
            width: 100,
        },
        {
            title: 'Aksi',
            dataIndex: 'aksi',
            key: 'aksi',
            align: 'center',
            width: 70,
            render: (text, record, index) =>
                <div>
                    <Space>
                        <Button
                            type='primary'
                            onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
                            icon={<SearchOutlined />}
                            size='small'
                            style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                        />
                        <Button
                            type='primary'
                            onClick={() => klikDetailv2(record.ResourceID, record.ResourceType, index)}
                            icon={<CarryOutOutlined />}
                            size='small'
                        />
                    </Space>
                </div>
        },
    ];

    const colTbResource2 = [
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
            title: 'DiagnosisId',
            dataIndex: 'DiagnosisId',
            align: 'center',
            key: 'DiagnosisId',
            width: 150,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
        }
    ];

    const colTbResource3 = [
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
            title: 'ProsedurId',
            dataIndex: 'ProsedurId',
            align: 'center',
            key: 'ProsedurId',
            width: 150,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
        }
    ];

    const colTbBilling = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            ellipsis: true,
            width: 30,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tanggal',
            dataIndex: 'TGLPMR',
            key: 'TGLPMR',
            align: 'center',
            width: 100,
            render: (text) => dayjs(text).format("DD-MM-YYYY"), // Format tanggal
        },
        {
            title: 'Pemeriksan',
            dataIndex: 'NAMAPMR',
            key: 'NAMAPMR',
            // align: 'center',
            // width: 200,
        },
        {
            title: 'QTY',
            dataIndex: 'JMLPMR',
            key: 'JMLPMR',
            align: 'center',
            width: 50,
        },
        {
            title: 'Harga',
            dataIndex: 'STDBIAYA',
            key: 'STDBIAYA',
            align: 'center',
            width: 100,
        },
        {
            title: 'Biaya Pelayanan',
            dataIndex: 'STDBIAYA',
            key: 'STDBIAYA',
            align: 'center',
            width: 100,
        },
        {
            title: 'Kode KPTL',
            dataIndex: 'KodeKFA',
            key: 'KodeKFA',
        },
        {
            title: 'Aksi',
            dataIndex: 'aksi',
            key: 'aksi',
            align: 'center',
            width: 120,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        onClick={() => {
                            setmdTambahKptl(true);
                            settempIndex(index);
                        }}
                        icon={<EditOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    >
                        Input KPTL
                    </Button>
                </div>
        },
    ];

    const colTbBillingBhp = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            ellipsis: true,
            width: 30,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tanggal',
            dataIndex: 'TGLBAR',
            key: 'TGLBAR',
            align: 'center',
            width: 100,
            render: (text) => dayjs(text).format("DD-MM-YYYY"), // Format tanggal
        },
        {
            title: 'Nama Barang',
            dataIndex: 'NAMABARANG',
            key: 'NAMABARANG',
            // align: 'center',
            // width: 200,
        },
        {
            title: 'QTY',
            dataIndex: 'JMLBARANG',
            key: 'JMLBARANG',
            align: 'center',
            width: 50,
        },
        {
            title: 'Harga',
            dataIndex: 'HRGBARANG',
            key: 'HRGBARANG',
            align: 'center',
            width: 100,
        },
        {
            title: 'Biaya Pelayanan',
            dataIndex: 'HRGBARANG',
            key: 'HRGBARANG',
            align: 'center',
            width: 100,
        },
        {
            title: 'Kode KFA',
            dataIndex: 'KodeKFA',
            key: 'KodeKFA',
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
                        // onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ];

    const colTbBillingObat = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            align: 'center',
            ellipsis: true,
            width: 30,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Tanggal',
            dataIndex: 'TANGGAL',
            key: 'TANGGAL',
            align: 'center',
            width: 100,
            render: (text) => dayjs(text).format("DD-MM-YYYY"), // Format tanggal
        },
        {
            title: 'Nama Barang',
            dataIndex: 'NAMABARANG',
            key: 'NAMABARANG',
            // align: 'center',
            // width: 200,
        },
        {
            title: 'QTY',
            dataIndex: 'QTYBAR',
            key: 'QTYBAR',
            align: 'center',
            width: 50,
        },
        {
            title: 'Harga',
            dataIndex: 'BIAYADRSP',
            key: 'BIAYADRSP',
            align: 'center',
            width: 100,
        },
        {
            title: 'Biaya Pelayanan',
            dataIndex: 'BIAYADRSP',
            key: 'BIAYADRSP',
            align: 'center',
            width: 100,
        },
        {
            title: 'Kode KFA',
            dataIndex: 'KodeKFAPA',
            key: 'KodeKFAPA',
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
                        // onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
                        icon={<SearchOutlined />}
                        size='small'
                        style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    />
                </div>
        },
    ]

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        console.log('klikRefresh : ', data);

        if (codeGrup === '107') {
            setlistTable(data);
        }
        else if (codeGrup === '94') {
            setlistOrderResep(data);
        }
        else if (codeGrup === '79') {
            setlistDx(data);
        }
        else if (codeGrup === '85') {
            setlistProcedur(data);
        }
    };

    const klikRefreshBill = async () => {
        let data = await getBillPasien(identitasPx.RegistrasiId);
        // let data = await getBillPasien("2411010555");
        setlistBill(data.pemeriksaan);
        setlistBillBhp(data.bhp);
        setlistBillObat(data.obat);
        // console.log('klikRefreshBill : ', data);
    };

    const post = () => {
        let chargeDummy = [
            {
                code: "12027.KH001.DP039.x.KM008",
                display: "Konsultasi dokter spesialis kompleks (30 menit-1 jam)",
                value: 75000,
            },
            // {
            //     code: "14891.MD021.PC002",
            //     display: "Transfusi darah, Dengan filter, Dewasa",
            //     value: 360000,
            // },
        ];

        let dataPmr = listBill.map((item, index) => {
            return {
                fullUrl: `urn:uuid:${uuidv4()}`,
                resource: {
                    resourceType: "ChargeItem",
                    status: "billable",
                    code: {
                        coding: [
                            // {
                            //     system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
                            //     code: item.KodeKFA,
                            //     display: item.KptlDisp
                            // }
                            {
                                system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
                                code: "30601",
                                display: "HEMATOLOGI RUTIN (HB, LEUKO, TROMBO, JUMLAH ERI, HT, MCV, MCH, MCHC)"
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    context: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    },
                    occurrencePeriod: {
                        start: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                        end: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                    },
                    performer: [
                        {
                            function: {
                                coding: [
                                    {
                                        system: "http://snomed.info/sct",
                                        code: "39677007",
                                        display: "Internal medicine specialist"
                                    }
                                ]
                            },
                            actor: {
                                reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                            }
                        }
                    ],
                    quantity: {
                        value: item.JMLPMR
                    },
                    account: [
                        {
                            reference: `Account/${accountId}`
                        }
                    ],
                    extension: [
                        {
                            url: "https: //fhir.kemkes.go.id/r4/StructureDefinition/unitPrice",
                            valueMoney: {
                                value: item.STDBIAYA,
                                currency: "IDR"
                            }
                        },
                        {
                            url: "https: //fhir.kemkes.go.id/r4/StructureDefinition/totalPrice",
                            valueMoney: {
                                value: item.STDBIAYA * item.JMLPMR,
                                currency: "IDR"
                            }
                        }
                    ]
                },
                request: {
                    method: "POST",
                    url: "ChargeItem"
                }
            }
        });

        let filterObat = listBillObat.filter(item => item.KodeKFAPA !== null && item.KodeKFAPA.trim() !== "");
        let dataObat = filterObat.map((item, index) => {
            return {
                fullUrl: `urn:uuid:${uuidv4()}`,
                resource: {
                    resourceType: "ChargeItem",
                    status: "billable",
                    code: {
                        coding: [
                            {
                                system: "http://sys-ids.kemkes.go.id/kfa",
                                code: item.KodeKFAPA.replace(/\s+/g, ""), // Menghapus semua spasi
                                display: item.NAMABARANG
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    context: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    },
                    occurrencePeriod: {
                        start: dayjs(item.TANGGAL).subtract(7, 'hour').format(),
                        end: dayjs(item.TANGGAL).subtract(7, 'hour').format(),
                    },
                    performer: [
                        {
                            function: {
                                coding: [
                                    {
                                        system: "http://snomed.info/sct",
                                        code: "39677007",
                                        display: "Internal medicine specialist"
                                    }
                                ]
                            },
                            actor: {
                                reference: `Practitioner/10001915884`,
                            }
                        }
                    ],
                    quantity: {
                        // value: item.QTYBAR
                        value: 1
                    },
                    account: [
                        {
                            reference: `Account/${accountId}`
                        }
                    ],
                    extension: [
                        {
                            url: "https: //fhir.kemkes.go.id/r4/StructureDefinition/unitPrice",
                            valueMoney: {
                                value: item.BIAYADRSP,
                                currency: "IDR"
                            }
                        },
                        {
                            url: "https: //fhir.kemkes.go.id/r4/StructureDefinition/totalPrice",
                            valueMoney: {
                                value: item.BIAYADRSP,
                                currency: "IDR"
                            }
                        }
                    ]
                },
                request: {
                    method: "POST",
                    url: "ChargeItem"
                }
            }
        });

        let mergedData = [...dataPmr, ...dataObat];
        let dataKirim = {
            resourceType: 'Bundle',
            type: 'transaction',
            entry: mergedData
        };

        console.log('mergedData : ', dataKirim);


        kirimBundleV2(dataKirim, 'ChargeItem', '107');
    };

    const klikInvoice = () => {
        let templineItem = listTable.map((item, index) => {
            return {
                sequence: index + 1,
                chargeItemReference: {
                    reference: `ChargeItem/${item.ResourceID}`
                },
                priceComponent: [
                    {
                        type: "surcharge",
                        code: {
                            coding: [
                                {
                                    system: item.system,
                                    code: item.code,
                                    display: item.display
                                }
                            ]
                        },
                        amount: {
                            value: item.total,
                            currency: "IDR"
                        }
                    }
                ]
            }
        });

        // Menjumlahkan total
        const totalSum = listTable.reduce((sum, item) => sum + (item.total || 0), 0);

        let data = {
            resourceType: "Invoice",
            status: "issued",
            subject: {
                reference: `Patient/${ihsPasien}`
            },
            date: dayjs().subtract(7, 'hour').format(),
            issuer: {
                reference: `Organization/${ihsRS}`
            },
            account: {
                reference: `Account/${accountId}`
            },
            lineItem: templineItem,
            totalNet: {
                value: totalSum,
                currency: "IDR"
            }
        }

        // console.log("data : ", data);
        postResource(data, 'Invoice', '108');
    };

    const updateItemByIndex = (index, updatedObject) => {
        setlistBill((prevItems) =>
            prevItems.map((item, i) =>
                i === index ? { ...item, ...updatedObject } : item
            )
        );
    };

    const jumlah = () => {
        const totalPrice = listTable.reduce((total, item) => total + item.total, 0);
        console.log(totalPrice);

        settotalKlaim(totalPrice);
    };

    const klikAjukan = () => {
        let dataDx = listDx.map((item, index) => (
            {
                sequence: index + 1,
                diagnosisCodeableConcept: {
                    coding: [
                        {
                            system: "http://hl7.org/fhir/sid/icd-10",
                            code: item.DiagnosisId,
                            display: item.Deskripsi
                        }
                    ]
                },
                type: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/ex-diagnosistype",
                                code: "discharge",
                                display: "Discharge Diagnosis"
                            }
                        ]
                    }
                ]
            }
        ));

        let dataProc = listProcedur.map((item, index) => (
            {
                sequence: index + 1,
                procedureCodeableConcept: {
                    coding: [
                        {
                            system: "http://hl7.org/fhir/sid/icd-9-cm",
                            code: item.ProsedurId,
                            display: item.Deskripsi
                        }
                    ]
                }
            }
        ));

        let data = {
            resourceType: "Claim",
            identifier: [
                {
                    system: `http://sys-ids.kemkes.go.id/claim-batch-number/${orgBpjs}`,
                    value: `${noBatch}`
                },
                {
                    system: `http://sys-ids.kemkes.go.id/claim-number/${orgBpjs}`,
                    value: noSep
                }
            ],
            status: "active",
            type: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/claim-type",
                        code: "institutional",
                        display: "Institutional"
                    }
                ]
            },
            use: "claim",
            patient: {
                reference: `Patient/${ihsPasien}`
            },
            billablePeriod: {
                start: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
                end: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            },
            created: dayjs(waktuPelayanan).subtract(7, 'hour').format(),
            enterer: {
                identifier: {
                    system: "https://fhir.kemkes.go.id/id/nik",
                    value: "3313096403900009"
                },
                reference: "Practitioner/10014058550"
            },
            insurer: {
                reference: `Organization/${orgBpjs}`
            },
            provider: {
                reference: `Organization/${ihsRS}`
            },
            priority: {
                coding: [
                    {
                        system: "http://terminology.hl7.org/CodeSystem/processpriority",
                        code: "normal",
                        display: "Normal"
                    }
                ]
            },
            payee: {
                type: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/payeetype",
                            code: "provider",
                            display: "Provider"
                        }
                    ]
                },
                party: {
                    reference: `Organization/${ihsRS}`
                }
            },
            facility: {
                reference: `Location/${paramEncounter.SatuSehatIdRuang}`
            },
            supportingInfo: [
                {
                    sequence: 1,
                    category: {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id/CodeSystem/claiminformationcategory",
                                code: "upgrade-class-indicator",
                                display: "Indikator Naik Kelas"
                            }
                        ]
                    },
                    code: {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id/CodeSystem/upgradeClassIndicator",
                                code: "no-upgrade",
                                display: "Tidak Ada Kenaikan Kelas"
                            }
                        ]
                    }
                },
                {
                    sequence: 2,
                    category: {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id/CodeSystem/claiminformationcategory",
                                code: "unu-grouper-version",
                                display: "Versi Grouper INACBG"
                            }
                        ]
                    },
                    valueString: "4"
                },
                {
                    sequence: 3,
                    category: {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id/CodeSystem/claiminformationcategory",
                                code: "e-klaim-version",
                                display: "Versi Aplikasi E-Klaim"
                            }
                        ]
                    },
                    valueString: dtEklaim.grouper.response.inacbg_version
                },
                {
                    sequence: 4,
                    category: {
                        coding: [
                            {
                                system: "http://terminology.kemkes.go.id/CodeSystem/claiminformationcategory",
                                code: "encounter",
                                display: "Encounter"
                            }
                        ]
                    },
                    valueReference: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    }
                }
            ],
            diagnosis: dataDx,
            procedure: dataProc,
            insurance: [
                {
                    sequence: 1,
                    focal: true,
                    coverage: {
                        reference: `Coverage/${paramCoverage.ResourceID}`
                    },
                    identifier: {
                        system: `http://sys-ids.kemkes.go.id/claim-number/${orgBpjs}`,
                        value: noSep
                    }
                }
            ],
            total: {
                value: parseInt(totalKlaim, 10),
                currency: "IDR"
            },
            extension: [
                {
                    url: "https://fhir.kemkes.go.id/r4/StructureDefinition/Package",
                    extension: [
                        {
                            url: "tariffClass",
                            valueCodeableConcept: {
                                coding: [
                                    {
                                        system: "http://terminology.kemkes.go.id/CodeSystem/tariffClass",
                                        code: "BP",
                                        display: "Tarif Kelas B Pemerintah"
                                    }
                                ]
                            }
                        },
                        {
                            url: "basePackage",
                            extension: [
                                {
                                    url: "code",
                                    valueCodeableConcept: {
                                        coding: [
                                            {
                                                system: "http://terminology.kemkes.go.id/CodeSystem/inacbg-v5",
                                                code: codeInacbg,
                                                display: dispInacbg
                                            }
                                        ]
                                    }
                                },
                                {
                                    url: "value",
                                    valueInteger: parseInt(totalKlaim, 10),
                                }
                            ]
                        }
                    ]
                }
            ]
        };

        console.log("klikAjukan : ", data);
        postResource(data, 'Claim', '111');
    };

    const klikDx = async () => {
        let data = await getDxPasien(identitasPx.RegistrasiId);
        console.log('klikRefresh : ', data);
        setlistDx(data.result);
    };

    const klikProc = async () => {
        let data = await getProsedur(identitasPx.RegistrasiId);
        console.log('klikRefresh : ', data.result);
        setlistProcedur(data.result);
    };

    const klikGetKlaim = async (noSep) => {
        try {
            let data = {
                metadata: {
                    method: "get_claim_data"
                },
                data: {
                    nomor_sep: noSep
                }
            };

            let getData = await getEklaim(data);
            console.log("getData : ", getData);

            setnoBatch(dataSepDummy.No_Batch_Eklaim);
            setnoSep(dataSepDummy.No_Sep);
            setnikKoder("3313096403900009");
            settotalKlaim(getData.grouper.response.cbg.tariff);
            setcodeInacbg(getData.grouper.response.cbg.code);
            setdispInacbg(getData.grouper.response.cbg.description);
            setdtEklaim(getData);
        } catch (error) {
            console.error("Error fetching claim data:", error);
            // Optional: Add user feedback or error handling logic here
        }
    }

    return (
        <div>
            <Divider
                variant="dotted"
                orientation="left"
                style={{
                    borderColor: '#7cb305',
                }}
            >
                Charge Item
            </Divider>

            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                        <Space>
                            <Button
                                type='primary'
                                onClick={() => {
                                    setmdTambahRiwayat(true);
                                    // setketerangan("Tidak puasa");
                                }}
                                icon={<PlusOutlined />}
                            >
                                Tambah
                            </Button>
                            <Button
                                type='primary'
                                onClick={() => {
                                    klikInvoice();
                                }}
                                icon={<CarryOutOutlined />}
                            >
                                Invoice
                            </Button>
                        </Space>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('107');
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
                    <Col span={24}>
                        <Divider
                            variant="dotted"
                            orientation="left"
                            style={{
                                borderColor: '#7cb305',
                                marginBottom: '-3px'
                            }}
                        >
                            Mengajukan Klaim
                        </Divider>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Button
                            onClick={() => klikGetKlaim(dataSepDummy.No_Sep)}
                            size='middle'
                            style={{ float: 'right', marginBottom: '5px' }}
                        >
                            Get Klaim
                        </Button>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>No. Org. BPJS :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            value={orgBpjs}
                            placeholder='Nomor Org. BPJS'
                            readOnly
                            onChange={(e) => setorgBpjs(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>No. Batch :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            value={noBatch}
                            placeholder='Nomor Batch'
                            // readOnly
                            onChange={(e) => setnoBatch(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>No. SEP :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            value={noSep}
                            placeholder='Nomor SEP'
                            // readOnly
                            onChange={(e) => setnoSep(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>NIK. Coder :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            value={nikKoder}
                            placeholder='NIK Koder'
                            readOnly
                            onChange={(e) => setnikKoder(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Ihs. Coder :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            // value={hasilLab.Id}
                            placeholder='Ihs Coder'
                            readOnly
                            // onChange={(e) => setvolume(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Diagnosis :</span>
                    </Col>
                    <Col span={21}>
                        <Button
                            onClick={() => {
                                klikDx();
                            }}
                        >
                            Refresh
                        </Button>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                    </Col>
                    <Col span={21}>
                        <Table
                            bordered
                            // loading={spCvg}
                            columns={colTbResource2}
                            dataSource={listDx}
                            pagination={false}
                            size="small"
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Procedure :</span>
                    </Col>
                    <Col span={21}>
                        <Button
                            onClick={() => {
                                klikProc();
                            }}
                        >
                            Refresh
                        </Button>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                    </Col>
                    <Col span={21}>
                        <Table
                            bordered
                            // loading={spCvg}
                            columns={colTbResource3}
                            dataSource={listProcedur}
                            pagination={false}
                            size="small"
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Total :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            value={totalKlaim}
                            placeholder='Total'
                            readOnly
                            // onChange={(e) => setvolume(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Code INACBG :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            value={codeInacbg}
                            placeholder='Code INACBG'
                            // readOnly
                            onChange={(e) => setcodeInacbg(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Display INACBG :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            value={dispInacbg}
                            placeholder='Code INACBG'
                            // readOnly
                            onChange={(e) => setdispInacbg(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button
                                onClick={() => jumlah()}>
                                Total
                            </Button>
                            <Button
                                type='primary'
                                onClick={() => klikAjukan()}
                                // disabled={listObatKeluaran.length === 0 ? true : false}
                                style={{ width: '150px' }}>
                                Ajukan Klaim
                            </Button>
                        </Space>
                    </Col>
                </Row>

            </Spin>

            <Modal
                visible={mdTambahRiwayat}
                onCancel={() => setmdTambahRiwayat(false)}
                width="80%"
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Row>
                    <Col span={22} style={{ paddingRight: '5px' }}>
                        <Divider
                            variant="dotted"
                            orientation="left"
                            style={{
                                borderColor: '#7cb305',
                            }}
                        >
                            Tambah Billing Pasien
                        </Divider>
                    </Col>
                    <Col span={2}>
                        <Button
                            onClick={() => {
                                klikRefreshBill();
                            }}
                            style={{ float: 'right' }}
                        >
                            Refresh
                        </Button>
                    </Col>
                </Row>

                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Table
                        columns={colTbBilling}
                        dataSource={listBill}
                        title={() => 'Daftar Pemeriksaan'}
                        size='small'
                        bordered
                        pagination={false}
                        style={{ marginBottom: '5px' }}
                    />

                    <Table
                        columns={colTbBillingBhp}
                        dataSource={listBillBhp}
                        title={() => 'Daftar BHP'}
                        size='small'
                        bordered
                        pagination={false}
                        style={{ marginBottom: '5px' }}
                    />

                    <Table
                        columns={colTbBillingObat}
                        dataSource={listBillObat}
                        title={() => 'Daftar Obat'}
                        size='small'
                        bordered
                        pagination={false}
                        style={{ marginBottom: '5px' }}
                    />

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => post()}
                                // disabled={listObatKeluaran.length === 0 ? true : false}
                                style={{ float: 'right', width: '150px' }}>
                                Post
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>

            <Modal
                visible={mdTambahKptl}
                onCancel={() => setmdTambahKptl(false)}
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
                    Input KPTL
                </Divider>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Code KPTL :</span>
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
                        <span>Display KPTL :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            value={display}
                            onChange={(e) => setdisplay(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => {
                                updateItemByIndex(tempIndex, {
                                    KodeKFA: code,
                                    KptlDisp: display
                                });
                                setmdTambahKptl(false);
                            }}
                            // disabled={listObatKeluaran.length === 0 ? true : false}
                            style={{ float: 'right', width: '150px' }}>
                            Simpan
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default ChargeItem