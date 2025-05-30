import { CheckOutlined, CloseOutlined, CloudDownloadOutlined, EditOutlined, InfoCircleTwoTone, SendOutlined } from '@ant-design/icons'
import { Button, Card, Checkbox, Col, DatePicker, Input, Modal, Row, Space, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import { SatuSehatEncounterContext } from '../context/SatuSehatEncounterContext'
import { v4 as uuidv4 } from 'uuid'
import TextArea from 'antd/es/input/TextArea'

const SSDetailKirim = () => {
    const {
        ihsRS,
        uuidEncounter, setuuidEncounter,
        regId, setregId,
        pasienId,
        namaPasien, setnamaPasien,
        nikPasien, setnikPasien,
        alamat, setalamat,
        ihsPasien, setihsPasien,
        jenkelPasien,
        tglLahirPasien,
        namaDokter, setnamaDokter,
        ihsPracticioner, setihsPracticioner,
        mulaiPelayanan, setmulaiPelayanan,
        selesaiPelayanan, setselesaiPelayanan,
        namaRuang, setnamaRuang,
        ihsRuang,
        dcPlanning, setdcPlanning,
        pendStart, setpendStart,
        pendEnd, setpendEnd,
        pmrStart, setpmrStart,
        pmrEnd, setpmrEnd,
        pulangStart, setpulangStart,
        pulangEnd, setpulangEnd,
        setmdDetailKirim,
        diagnosis,
        // observation
        nadi, setnadi,
        respRate, setrespRate,
        sistol, setsistol,
        diastol, setdiastol,
        suhu, setsuhu,
        jamTdVital,
        // procedure
        SnProcedure,
        procedure,
        // composition
        composition, setcomposition,
        // medication
        medication,
        medValid,
        waktuOrderResep,
        waktuValidResep,
        // service request
        serviceRequest,
        // diagRequest
        diagReport,
        chkBtaPositif, setchkBtaPositif,
        // allergi
        allergi,
        chkAllergi, setchkAllergi,
        // clinic imp
        clinicImp,
        chkClinicImp, setchkClinicImp,
        // rencana tindak lanjut
        rencanaTL,
        chkRencanaTL, setchkRencanaTL,
        // quisioner
        chkKuisioner, setchkKuisioner,
        // catatan obat
        chkNoteMed, setchkNoteMed,
        // form ihs pasien
        ihstgllahir, setihstgllahir,
        ihsalamat, setihsalamat,
        ihsjenkel, setihsjenkel,
        ihsihsnumber, setihsihsnumber,
        ihsnik, setihsnik,
        ihslastupdate, setihslastupdate,
        ihsnama, setihsnama,
        // md
        mdIhsPasien, setmdIhsPasien,
        // func
        getIhsPasien,
        insertIhsPasien,
        kirimBundle,
        // sp
        spDetailKirim,
    } = useContext(SatuSehatEncounterContext);

    const columns = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            ellipsis: true,
            width: 30,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Kode',
            dataIndex: 'DiagnosisId',
            key: 'DiagnosisId',
            width: 50,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
        },
        {
            title: 'Jenis',
            dataIndex: 'JenisDiagnosisDeskripsi',
            key: 'JenisDiagnosisDeskripsi',
            width: 70,
        },
    ];

    const columnsa = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            ellipsis: true,
            width: 30,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Kode',
            dataIndex: 'DiagnosisId',
            key: 'DiagnosisId',
            width: 50,
        },
        {
            title: 'UUID',
            dataIndex: 'uuid',
            key: 'uuid',
        },
    ];

    const columnsb = [
        {
            title: 'No',
            dataIndex: 'NoUrut',
            key: 'NoUrut',
            ellipsis: true,
            width: 30,
        },
        {
            title: 'ICD 9',
            dataIndex: 'ProsedurId',
            key: 'ProsedurId',
            width: 50,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
        }
    ];

    const columnsc = [
        {
            title: 'No',
            dataIndex: 'index',
            key: 'index',
            ellipsis: true,
            width: 30,
            render: (text, record, index) => index + 1,
        },
        {
            title: 'Snomed ID',
            dataIndex: 'SnomedID',
            key: 'SnomedID',
            width: 120,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
        }
    ];

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

    const colSrvRequest = [
        {
            title: 'NOORDER',
            dataIndex: 'NOORDER',
            key: 'NOORDER',
            align: 'center',
            // width: 50,
        },
        {
            title: 'KODEPMR',
            dataIndex: 'KODEPMR',
            key: 'KODEPMR',
            align: 'center',
            // width: 50,
        },
        {
            title: 'Deskripsi',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
            width: 400,
        },
        {
            title: 'TGLORDER',
            dataIndex: 'TGLORDER',
            key: 'TGLORDER',
            align: 'center',
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        },
    ];

    const colDiagRpt = [
        {
            title: 'Pemeriksaan',
            dataIndex: 'LabNama',
            key: 'LabNama',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'Hasil Pemeriksaan',
            dataIndex: 'LabHasil',
            key: 'LabHasil',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'Tgl. Pemeriksaan',
            dataIndex: 'UserDate',
            key: 'UserDate',
            align: 'center',
            render: (text) => dayjs(text).format('DD/MM/YYYY HH:mm'),
        },
        {
            title: 'Pemeriksa',
            dataIndex: 'NAMADOKTER',
            key: 'NAMADOKTER',
            // align: 'center',
        },
        {
            title: 'IHS Number',
            dataIndex: 'IhsNumber',
            key: 'IhsNumber',
            align: 'center',
        },
    ];

    const colAllergi = [
        {
            title: 'No. RM',
            dataIndex: 'PasienId',
            key: 'PasienId',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'Clinical Status',
            dataIndex: 'ClinicalStatus',
            key: 'ClinicalStatus',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'Verification Status',
            dataIndex: 'VerificationStatus',
            key: 'VerificationStatus',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'Categori',
            dataIndex: 'Categori',
            key: 'Categori',
            // align: 'center',
        },
        {
            title: 'Snomed Code',
            dataIndex: 'Code',
            key: 'Code',
            // align: 'center',
        },
        {
            title: 'Keterangan',
            dataIndex: 'Note',
            key: 'Note',
            // align: 'center',
        },
        {
            title: 'Tgl. Pemeriksaan',
            dataIndex: 'DateEntry',
            key: 'DateEntry',
            align: 'center',
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        }
    ];

    const colClinicImp = [
        {
            title: 'Assesment',
            dataIndex: 'Assesment',
            key: 'Assesment',
            // align: 'center',
            width: 400,
        },
        {
            title: 'Nama Dokter',
            dataIndex: 'NAMADOKTER',
            key: 'NAMADOKTER',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'Ihs Number',
            dataIndex: 'IhsNumber',
            key: 'IhsNumber',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'Tgl. Pemeriksaan',
            dataIndex: 'TglJam',
            key: 'TglJam',
            align: 'center',
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        }
    ];

    const colRencanaTL = [
        {
            title: 'No Entry',
            dataIndex: 'NoEntry',
            key: 'NoEntry',
            // align: 'center',
            width: 400,
        },
        {
            title: 'Kode Tindakan',
            dataIndex: 'KodeTindakan',
            key: 'KodeTindakan',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'Tgl. Kontrol',
            dataIndex: 'TglKontrol',
            key: 'TglKontrol',
            align: 'center',
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Tgl. Entry',
            dataIndex: 'DateEntry',
            key: 'DateEntry',
            align: 'center',
            render: (text) => dayjs(text).format('DD/MM/YYYY'),
        },
        {
            title: 'Id Ruang',
            dataIndex: 'SatuSehatId',
            key: 'SatuSehatId',
            // align: 'center',
            // width: 50,
        },
    ];

    const tempdata = [];
    for (let i = 1; i <= 5; i++) {
        const dokter = {
            No: i,
            Kode: 'Z48.0',
            Deskripsi: 'JAUHARI DESLO ANGKASA WIJAYA, DR, TN',
            Jenis: 'Primer',
        };
        tempdata.push(dokter);
    }

    const rstDefault = () => {
        setihstgllahir(null)
        setihsalamat(null)
        setihsjenkel(null)
        setihsihsnumber(null)
        setihsnik(null)
        setihslastupdate(null)
        setihsnama(null)
    }

    const klikIhsPasien = (nik) => {
        if (nik) {
            rstDefault()
            getIhsPasien(nik)
        }
        else {
            Modal.warn({
                title: 'Peringatan!',
                content: 'NIK Pasien tidak boleh kosong!',
            });
        }
    }

    const klikSesuai = () => {
        if (!pasienId) {
            Modal.warn({
                title: "Peringatan",
                content: 'No RM kosong!',
            });
        }
        else if (!ihsihsnumber) {
            Modal.warn({
                title: "Peringatan",
                content: 'Ihs Number kosong!',
            });
        }
        else {
            let data = {}

            data.pasienId = pasienId
            data.ihsNumber = ihsihsnumber

            insertIhsPasien(data)
        }
    }

    const klikKirim = () => {
        if (!ihsPasien) {
            Modal.warn({
                title: "Peringatan!",
                content: "Ihs Pasien masih kosong!",
            });
        }
        else if (!ihsPracticioner) {
            Modal.warn({
                title: "Peringatan!",
                content: "Ihs Practicioner masih kosong!",
            });
        }
        else if (!ihsRuang) {
            Modal.warn({
                title: "Peringatan!",
                content: "Ihs Ruang masih kosong!",
            });
        }
        else if (dayjs(pendStart).isAfter(dayjs(pendEnd))) {
            Modal.warn({
                title: "Peringatan!",
                content: "Waktu selesai pendaftaran tidak sesuai!",
            });
        }
        else if (dayjs(pendEnd).isAfter(dayjs(pmrStart))) {
            Modal.warn({
                title: "Peringatan!",
                content: "Waktu mulai pemeriksaan tidak sesuai!",
            });
        }
        else if (dayjs(pmrStart).isAfter(dayjs(pmrEnd))) {
            Modal.warn({
                title: "Peringatan!",
                content: "Waktu selesai pemeriksaan tidak sesuai!",
            });
        }
        else if (dayjs(pmrEnd).isAfter(dayjs(pulangStart))) {
            Modal.warn({
                title: "Peringatan!",
                content: "Waktu mulai pulang tidak sesuai!",
            });
        }
        else if (dayjs(pulangStart).isAfter(dayjs(pulangEnd))) {
            Modal.warn({
                title: "Peringatan!",
                content: "Waktu selesai pulang tidak sesuai!",
            });
        }
        else if (diagnosis.length === 0) {
            Modal.warn({
                title: "Peringatan!",
                content: "Diagnosis tidak ada!",
            });
        }
        else {
            // membuat format encounter
            let dataEncounter = {}
            dataEncounter.fullUrl = `urn:uuid:${uuidEncounter}`

            let resEncounter = {}
            resEncounter.resourceType = 'Encounter';
            let idnEnc = [
                {
                    system: `http://sys-ids.kemkes.go.id/encounter/${ihsRS}`,
                    value: regId
                }
            ];
            resEncounter.identifier = idnEnc;
            resEncounter.status = 'finished';

            let classEnc = {
                system: 'http://terminology.hl7.org/CodeSystem/v3-ActCode',
                code: 'AMB',
                display: 'ambulatory'
            };
            resEncounter.class = classEnc;

            let subEnc = {
                reference: `Patient/${ihsPasien}`,
                display: namaPasien
            };
            resEncounter.subject = subEnc;

            let partEnc = [
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
                        reference: `Practitioner/${ihsPracticioner}`,
                        display: namaDokter
                    }
                }
            ];
            resEncounter.participant = partEnc;

            let period = {
                start: dayjs(pendStart).subtract(7, 'hour').format(),
                end: dayjs(pulangEnd).subtract(7, 'hour').format()
            };
            resEncounter.period = period;

            let location = [
                {
                    location: {
                        reference: `Location/${ihsRuang}`,
                        display: namaRuang
                    }
                }
            ];
            resEncounter.location = location;

            const convertedData = diagnosis.map((item, index) => {
                return {
                    condition: {
                        reference: `urn:uuid:${item.uuid}`,
                        display: item.Deskripsi,
                    },
                    use: {
                        coding: [
                            {
                                system: 'http://terminology.hl7.org/CodeSystem/diagnosis-role',
                                code: 'DD',
                                display: 'Discharge diagnosis',
                            },
                        ],
                    },
                    rank: index + 1,
                };
            });
            resEncounter.diagnosis = convertedData;

            let hospitalization = {
                dischargeDisposition: {
                    coding: [
                        {
                            system: "http://terminology.hl7.org/CodeSystem/discharge-disposition",
                            code: "home",
                            display: "Home"
                        }
                    ],
                    text: dcPlanning
                }
            };
            resEncounter.hospitalization = hospitalization;

            let statusHistory = [
                {
                    status: "arrived",
                    period: {
                        start: dayjs(pendStart).subtract(7, 'hour').format(),
                        end: dayjs(pendEnd).subtract(7, 'hour').format()
                    }
                },
                {
                    status: "in-progress",
                    period: {
                        start: dayjs(pmrStart).subtract(7, 'hour').format(),
                        end: dayjs(pmrEnd).subtract(7, 'hour').format()
                    }
                },
                {
                    status: "finished",
                    period: {
                        start: dayjs(pulangStart).subtract(7, 'hour').format(),
                        end: dayjs(pulangEnd).subtract(7, 'hour').format()
                    }
                }
            ];
            resEncounter.statusHistory = statusHistory;

            let serviceProvider = {
                reference: `Organization/${ihsRS}`
            };
            resEncounter.serviceProvider = serviceProvider;

            dataEncounter.resource = resEncounter;

            let request = {
                method: "POST",
                url: "Encounter"
            };
            dataEncounter.request = request;

            console.log('dataEncounter : ', dataEncounter);

            // membuat data diagnosis
            const convertedDx = diagnosis.map((item, index) => {
                return {
                    fullUrl: `urn:uuid:${item.uuid}`,
                    resource: {
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
                                        code: "encounter-diagnosis",
                                        display: "Encounter Diagnosis"
                                    }
                                ]
                            }
                        ],
                        code: {
                            coding: [
                                {
                                    system: "http://hl7.org/fhir/sid/icd-10",
                                    code: item.DiagnosisId,
                                    display: item.Deskripsi
                                }
                            ]
                        },
                        subject: {
                            reference: `Patient/${ihsPasien}`,
                            display: namaPasien
                        },
                        encounter: {
                            reference: `urn:uuid:${uuidEncounter}`
                        },
                        onsetDateTime: dayjs(pmrEnd).subtract(7, 'hour').format(),
                        recordedDate: dayjs(pmrEnd).subtract(7, 'hour').format()
                    },
                    request: {
                        method: "POST",
                        url: "Condition"

                    }
                }
            });
            let dataDiagnosis = convertedDx;

            console.log('dataDiagnosis : ', dataDiagnosis);

            // membuat json OBSERVATION Nadi
            let dataObs1 = null;
            if (nadi !== null && nadi !== 0) {
                let uuid1 = uuidv4();
                dataObs1 = {};

                dataObs1.fullUrl = `urn:uuid:${uuid1}`;

                let resObs1 = {};
                resObs1.resourceType = 'Observation';
                resObs1.status = 'final';

                let catObs1 = [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/observation-category",
                                code: "vital-signs",
                                display: "Vital Signs"
                            }
                        ]
                    }
                ]
                resObs1.category = catObs1;

                resObs1.code = {
                    coding: [
                        {
                            system: "http://loinc.org",
                            code: "8867-4",
                            display: "Heart rate"
                        }
                    ]
                }
                resObs1.subject = {
                    reference: `Patient/${ihsPasien}`
                }
                resObs1.performer = [
                    {
                        reference: `Practitioner/${ihsPracticioner}`
                    }
                ]
                resObs1.encounter = {
                    reference: `urn:uuid:${uuidEncounter}`,
                    display: `Pemeriksaan Fisik Nadi ${namaPasien}, Tanggal : ${dayjs(jamTdVital).format('DD-MM-YYYY')}`
                }
                resObs1.effectiveDateTime = dayjs(jamTdVital).subtract(7, 'hour').format()
                resObs1.issued = dayjs(jamTdVital).subtract(7, 'hour').format() // ==> pake tgl tanda vital
                resObs1.valueQuantity = {
                    value: nadi,
                    unit: "beats/minute",
                    system: "http://unitsofmeasure.org",
                    code: "/min"
                }

                dataObs1.resource = resObs1;
                dataObs1.request = {
                    method: "POST",
                    url: "Observation"
                }
            };

            // membuat json OBSERVATION Resp.Rate
            let dataObs2 = null;
            if (respRate !== null && respRate !== 0) {
                let uuid2 = uuidv4();
                dataObs2 = {};

                dataObs2.fullUrl = `urn:uuid:${uuid2}`;
                dataObs2.resource = {
                    resourceType: "Observation",
                    status: "final",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                                    code: "vital-signs",
                                    display: "Vital Signs"
                                }
                            ]
                        }
                    ],
                    code: {
                        coding: [
                            {
                                system: "http://loinc.org",
                                code: "9279-1",
                                display: "Respiratory rate"
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    performer: [
                        {
                            reference: `Practitioner/${ihsPracticioner}`
                        }
                    ],
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`,
                        display: `Pemeriksaan Fisik Pernafasan ${namaPasien}, Tanggal : ${dayjs(jamTdVital).format('DD-MM-YYYY')}`
                    },
                    effectiveDateTime: dayjs(jamTdVital).subtract(7, 'hour').format(),
                    issued: dayjs(jamTdVital).subtract(7, 'hour').format(),
                    valueQuantity: {
                        value: respRate,
                        unit: "breaths/minute",
                        system: "http://unitsofmeasure.org",
                        code: "/min"
                    }
                };
                dataObs2.request = {
                    method: "POST",
                    url: "Observation"
                };
            };

            // membuat json OBSERVATION Systolic
            let dataObs3 = null;
            if (sistol !== null && sistol !== 0) {
                let uuid = uuidv4();
                dataObs3 = {};

                dataObs3.fullUrl = `urn:uuid:${uuid}`;
                dataObs3.resource = {
                    resourceType: "Observation",
                    status: "final",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                                    code: "vital-signs",
                                    display: "Vital Signs"
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
                    performer: [
                        {
                            reference: `Practitioner/${ihsPracticioner}`
                        }
                    ],
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`,
                        display: `Pemeriksaan Fisik Sistolik ${namaPasien}, Tanggal : ${dayjs(jamTdVital).format('DD-MM-YYYY')}`
                    },
                    effectiveDateTime: dayjs(jamTdVital).subtract(7, 'hour').format(),
                    issued: dayjs(jamTdVital).subtract(7, 'hour').format(),
                    bodySite: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: "368209003",
                                display: "Right arm"
                            }
                        ]
                    },
                    valueQuantity: {
                        value: sistol,
                        unit: "mm[Hg]",
                        system: "http://unitsofmeasure.org",
                        code: "mm[Hg]"
                    },
                    // "interpretation": [
                    //     {
                    //         "coding": [
                    //             {
                    //                 "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    //                 "code": "HU",
                    //                 "display": "significantly high"
                    //             }
                    //         ],
                    //         "text": "Di atas nilai referensi"
                    //     }
                    // ]
                }
                dataObs3.request = {
                    method: "POST",
                    url: "Observation"
                }
            };

            // membuat json OBSERVATION Diastolic
            let dataObs4 = null;
            if (diastol !== null && diastol !== 0) {
                let uuid = uuidv4();
                dataObs4 = {};

                dataObs4.fullUrl = `urn:uuid:${uuid}`;
                dataObs4.resource = {
                    resourceType: "Observation",
                    status: "final",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                                    code: "vital-signs",
                                    display: "Vital Signs"
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
                        reference: `Patient/${ihsPasien}`,
                        display: namaPasien
                    },
                    performer: [
                        {
                            reference: `Practitioner/${ihsPracticioner}`
                        }
                    ],
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`,
                        display: `Pemeriksaan Fisik Diastolik ${namaPasien}, Tanggal : ${dayjs(jamTdVital).format('DD-MM-YYYY')}`
                    },
                    effectiveDateTime: dayjs(jamTdVital).subtract(7, 'hour').format(),
                    issued: dayjs(jamTdVital).subtract(7, 'hour').format(),
                    bodySite: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: "368209003",
                                display: "Right arm"
                            }
                        ]
                    },
                    valueQuantity: {
                        value: diastol,
                        unit: "mm[Hg]",
                        system: "http://unitsofmeasure.org",
                        code: "mm[Hg]"
                    },
                    // "interpretation": [
                    //     {
                    //         "coding": [
                    //             {
                    //                 "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    //                 "code": "L",
                    //                 "display": "low"
                    //             }
                    //         ],
                    //         "text": "Di bawah nilai referensi"
                    //     }
                    // ]
                }
                dataObs4.request = {
                    method: "POST",
                    url: "Observation"
                }
            };

            // membuat json OBSERVATION Systolic
            let dataObs5 = null;
            if (suhu !== null && suhu !== 0) {
                let uuid = uuidv4();
                dataObs5 = {};

                dataObs5.fullUrl = `urn:uuid:${uuid}`
                dataObs5.resource = {
                    resourceType: "Observation",
                    status: "final",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/observation-category",
                                    code: "vital-signs",
                                    display: "Vital Signs"
                                }
                            ]
                        }
                    ],
                    code: {
                        coding: [
                            {
                                system: "http://loinc.org",
                                code: "8310-5",
                                display: "Body temperature"
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    performer: [
                        {
                            reference: `Practitioner/${ihsPracticioner}`
                        }
                    ],
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`,
                        display: `Pemeriksaan Fisik Suhu ${namaPasien}, Tanggal : ${dayjs(jamTdVital).format('DD-MM-YYYY')}`
                    },
                    effectiveDateTime: dayjs(jamTdVital).subtract(7, 'hour').format(),
                    issued: dayjs(jamTdVital).subtract(7, 'hour').format(),
                    valueQuantity: {
                        value: suhu,
                        unit: "C",
                        system: "http://unitsofmeasure.org",
                        code: "Cel"
                    },
                    // "interpretation": [
                    //     {
                    //         "coding": [
                    //             {
                    //                 "system": "http://terminology.hl7.org/CodeSystem/v3-ObservationInterpretation",
                    //                 "code": "H",
                    //                 "display": "High"
                    //             }
                    //         ],
                    //         "text": "Di atas nilai referensi"
                    //     }
                    // ]
                }
                dataObs5.request = {
                    method: "POST",
                    url: "Observation"
                }
            };

            // membuat json procedure
            let dataProc = null;
            if (SnProcedure.length !== 0 && procedure.length !== 0) {
                // mapping code icd-9
                let tempCode9 = procedure.map((item, index) => {
                    return {
                        system: "http://hl7.org/fhir/sid/icd-9-cm",
                        code: item.ProsedurId,
                        display: item.Deskripsi
                    };
                });

                // mapping code icd-10
                let tempCode10 = diagnosis.map((item, index) => {
                    return {
                        system: "http://hl7.org/fhir/sid/icd-10",
                        code: item.DiagnosisId,
                        display: item.Deskripsi
                    };
                });

                let convertedProc = SnProcedure.map((item, index) => {
                    return {
                        fullUrl: `urn:uuid:${item.uuid}`,
                        resource: {
                            resourceType: "Procedure",
                            status: "completed",
                            category: {
                                coding: [
                                    {
                                        system: "http://snomed.info/sct",
                                        code: item.SnomedID.trim(),
                                        display: item.Deskripsi
                                    }
                                ],
                                text: item.Deskripsi
                            },
                            code: {
                                coding: tempCode9
                            },
                            subject: {
                                reference: `Patient/${ihsPasien}`,
                                display: namaPasien
                            },
                            encounter: {
                                reference: `urn:uuid:${uuidEncounter}`,
                                display: `Tindakan ${item.Deskripsi} ke pasien ${namaPasien} pada tanggal ${dayjs(jamTdVital).format('DD-MM-YYYY')}`
                            },
                            performedPeriod: {
                                start: dayjs(pmrStart).subtract(7, 'hour').format(),
                                end: dayjs(pmrEnd).subtract(7, 'hour').format()
                            },
                            performer: [
                                {
                                    actor: {
                                        reference: `Practitioner/${ihsPracticioner}`,
                                        display: namaDokter
                                    }
                                }
                            ],
                            reasonCode: [
                                {
                                    coding: tempCode10
                                }
                            ],
                            // "bodySite": [
                            //     {
                            //         "coding": [
                            //             {
                            //                 "system": "http://snomed.info/sct",
                            //                 "code": "302551006",
                            //                 "display": "Entire Thorax"
                            //             }
                            //         ]
                            //     }
                            // ],
                            // "note": [
                            //     {
                            //         "text": "Rontgen thorax melihat perluasan infiltrat dan kavitas."
                            //     }
                            // ]
                        },
                        request: {
                            method: "POST",
                            url: "Procedure"
                        }
                    }
                });

                dataProc = convertedProc[0];
            };

            // membuat json composition
            let dataComp = null;
            if (composition !== null && composition) {
                console.log('comp : ', composition);
                let uuid = uuidv4();
                dataComp = {};

                dataComp.fullUrl = `urn:uuid:${uuid}`;
                dataComp.resource = {
                    resourceType: "Composition",
                    identifier: {
                        system: `http://sys-ids.kemkes.go.id/composition/${ihsRS}`,
                        value: regId
                    },
                    status: "final",
                    type: {
                        coding: [
                            {
                                system: "http://loinc.org",
                                code: "18842-5",
                                display: "Discharge summary"
                            }
                        ]
                    },
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://loinc.org",
                                    code: "LP173421-1",
                                    display: "Report"
                                }
                            ]
                        }
                    ],
                    subject: {
                        reference: `Patient/${ihsPasien}`,
                        display: namaPasien
                    },
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`,
                        display: `Kunjungan ${namaPasien} di tanggal ${dayjs(jamTdVital).format('DD-MM-YYYY')}`
                    },
                    date: dayjs(jamTdVital).subtract(7, 'hour').format(),
                    author: [
                        {
                            reference: `Practitioner/${ihsPracticioner}`,
                            display: namaDokter
                        }
                    ],
                    title: "Resume Medis Rawat Jalan",
                    custodian: {
                        reference: `Organization/${ihsRS}`
                    },
                    section: [
                        {
                            code: {
                                coding: [
                                    {
                                        system: "http://loinc.org",
                                        code: "42344-2",
                                        display: "Discharge diet (narrative)"
                                    }
                                ]
                            },
                            text: {
                                status: "additional",
                                div: composition.slice(0, 255)
                            }
                        }
                    ]
                }
                dataComp.request = {
                    method: "POST",
                    url: "Composition"
                }
            };

            // membuat json medicationRequest
            // let waktuOrderResep_1 = dayjs(waktuOrderResep).subtract(7, 'hour')
            // let waktuValidResep_1 = dayjs(waktuValidResep).subtract(7, 'hour')
            let waktuOrderResep_1 = dayjs(waktuOrderResep, 'DD-MM-YYYY HH:mm')
            let waktuValidResep_1 = dayjs(waktuValidResep, 'DD-MM-YYYY HH:mm')

            // console.log('waktuOrderResep : ', dayjs(waktuOrderResep, 'DD-MM-YYYY HH:mm'));
            // console.log('waktuValidResep : ', dayjs(waktuOrderResep, 'DD-MM-YYYY HH:mm'));
            console.log('waktuOrderResep : ', dayjs(waktuOrderResep_1).subtract(7, 'hour').format());
            console.log('waktuValidResep : ', dayjs(waktuValidResep_1).subtract(7, 'hour').format());

            let medReq = null;
            let medRequest = null;
            let patenNotNullUuid = null;
            let uuidHard = null;
            if (medication !== null && medication) {
                let patenNotNull = medication.flatMap(item => item.Paten.filter(paten => paten.KodeKFAPA !== null));
                patenNotNullUuid = patenNotNull.map((item) => {
                    const uuid = uuidv4();
                    return { ...item, uuid }; // Menambahkan properti uuid ke setiap objek data
                });

                // Outputkan hasilnya
                console.log('order tidak null : ', patenNotNullUuid);

                // medication
                medReq = patenNotNullUuid.map((item, index) => {
                    return {
                        fullUrl: `urn:uuid:${item.uuid}`,
                        resource: {
                            resourceType: "Medication",
                            meta: {
                                profile: [
                                    "https://fhir.kemkes.go.id/r4/StructureDefinition/Medication"
                                ]
                            },
                            identifier: [
                                {
                                    system: `http://sys-ids.kemkes.go.id/medication/${ihsRS}`,
                                    use: "official",
                                    value: item.KODEBARANG
                                }
                            ],
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
                        },
                        request: {
                            method: "POST",
                            url: "Medication"
                        }
                    }
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
                                reference: `Patient/${ihsPasien}`,
                                display: namaPasien
                            },
                            encounter: {
                                reference: `urn:uuid:${uuidEncounter}`,
                            },
                            authoredOn: dayjs(waktuOrderResep_1).subtract(7, 'hour').format(),
                            // authoredOn: dayjs(waktuOrderResep).subtract(7, 'hour').format(),
                            requester: {
                                reference: `Practitioner/${item.IhsNumber}`,
                                // display: "Dokter Bronsig"
                            },
                            // "reasonCode": [
                            //     {
                            //         "coding": [
                            //             {
                            //                 "system": "http://hl7.org/fhir/sid/icd-10",
                            //                 "code": "A15.0",
                            //                 "display": "Tuberculosis of lung, confirmed by sputum microscopy with or without culture"
                            //             }
                            //         ]
                            //     }
                            // ],
                            // "courseOfTherapyType": {
                            //     "coding": [
                            //         {
                            //             "system": "http://terminology.hl7.org/CodeSystem/medicationrequest-course-of-therapy",
                            //             "code": "continuous",
                            //             "display": "Continuing long term therapy"
                            //         }
                            //     ]
                            // },
                            dosageInstruction: [
                                {
                                    sequence: 1,
                                    text: item.KODEATRPK,
                                    // additionalInstruction: [
                                    //     {
                                    //         text: "Diminum setiap hari"
                                    //     }
                                    // ],
                                    // patientInstruction: "4 tablet perhari, diminum setiap hari tanpa jeda sampai prose pengobatan berakhir",
                                    // timing: {
                                    //     repeat: {
                                    //         frequency: 1,
                                    //         period: 1,
                                    //         periodUnit: "d"
                                    //     }
                                    // },
                                    // route: {
                                    //     coding: [
                                    //         {
                                    //             system: "http://www.whocc.no/atc",
                                    //             code: "O",
                                    //             display: "Oral"
                                    //         }
                                    //     ]
                                    // },
                                    // doseAndRate: [
                                    //     {
                                    //         type: {
                                    //             coding: [
                                    //                 {
                                    //                     system: "http://terminology.hl7.org/CodeSystem/dose-rate-type",
                                    //                     code: "ordered",
                                    //                     display: "Ordered"
                                    //                 }
                                    //             ]
                                    //         },
                                    //         doseQuantity: {
                                    //             value: 4,
                                    //             unit: "TAB",
                                    //             system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                                    //             code: "TAB"
                                    //         }
                                    //     }
                                    // ]
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
                // console.log('conv : ', conv);
                // console.log('conva : ', conva);
            };

            // obat valid
            let medDisp = null;
            let medDispense = null;
            let validNotNull = medValid.filter(item => item.KodeKFAPA !== null);
            let validNotNullUuid = validNotNull.map((item) => {
                const uuidMedValid = uuidv4();
                return { ...item, uuidMedValid }; // Menambahkan properti uuid ke setiap objek data
            });
            if (medValid.length !== 0) {
                console.log('validNotNull : ', validNotNull);
                medDisp = validNotNullUuid.map((item, index) => {
                    return {
                        fullUrl: `urn:uuid:${item.uuidMedValid}`,
                        resource: {
                            resourceType: "Medication",
                            meta: {
                                profile: [
                                    "https://fhir.kemkes.go.id/r4/StructureDefinition/Medication"
                                ]
                            },
                            identifier: [
                                {
                                    system: `http://sys-ids.kemkes.go.id/medication/${ihsRS}`,
                                    use: "official",
                                    value: item.KODEBARANG
                                }
                            ],
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
                            // manufacturer: {
                            //     reference: "Organization/900001"
                            // },
                            // "form": {
                            //     "coding": [
                            //         {
                            //             "system": "http://terminology.kemkes.go.id/CodeSystem/medication-form",
                            //             "code": "BS023",
                            //             "display": "Kaplet Salut Selaput"
                            //         }
                            //     ]
                            // },
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
                        },
                        request: {
                            method: "POST",
                            url: "Medication"
                        }
                    }
                })

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
                                reference: `Patient/${ihsPasien}`,
                                display: namaPasien
                            },
                            context: {
                                reference: `urn:uuid:${uuidEncounter}`,
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

            // serviceRequest
            let srvReq = null;
            let specimnt = null;
            let uuidSrvReq = uuidv4();
            let uuidSpec = uuidv4();
            if (serviceRequest.length !== 0 && chkBtaPositif) {
                let srvReqObj = serviceRequest[0];
                srvReq = {};
                specimnt = {};

                srvReq.fullUrl = `urn:uuid:${uuidSrvReq}`;
                srvReq.resource = {
                    resourceType: "ServiceRequest",
                    identifier: [
                        {
                            system: `http://sys-ids.kemkes.go.id/servicerequest/${ihsRS}`,
                            value: srvReqObj.NOORDER // No Order
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
                                code: "11477-7",
                                display: "Microscopic observation [Identifier] in Sputum by Acid fast stain"
                            }
                        ],
                        text: srvReqObj.Deskripsi // Nama Pemeriksaan
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`,
                        display: `Permintaan ${srvReqObj.Deskripsi}` // Nama Permintaan
                    },
                    occurrenceDateTime: dayjs(srvReqObj.TGLORDER).subtract(7, 'hour').format(), // tgl order
                    authoredOn: dayjs(srvReqObj.TGLORDER).subtract(7, 'hour').format(), // tgl order
                    requester: {
                        reference: `Practitioner/${ihsPracticioner}`, // dpjp
                        display: namaDokter
                    },
                    performer: [
                        {
                            reference: `Practitioner/${ihsPracticioner}`, // dpjp
                            display: namaDokter
                        }
                    ],
                    // "reasonCode": [
                    //     {
                    //         "text": "Periksa jika ada kemungkinan Tuberculosis"
                    //     }
                    // ]
                };
                srvReq.request = {
                    method: "POST",
                    url: "ServiceRequest"
                };

                // specimen
                specimnt.fullUrl = `urn:uuid:${uuidSpec}`;
                specimnt.resource = {
                    resourceType: "Specimen",
                    identifier: [
                        {
                            system: `http://sys-ids.kemkes.go.id/specimen/${ihsRS}`, // ihs number
                            value: srvReqObj.NOORDER, // no order
                            assigner: {
                                reference: `Organization/${ihsRS}` // ihs number
                            }
                        }
                    ],
                    status: "available",
                    type: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: "45710003",
                                display: "Sputum"
                            }
                        ]
                    },
                    collection: {
                        method: {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: "386089008",
                                    display: "Collection of coughed sputum"
                                }
                            ]
                        },
                        collectedDateTime: dayjs(srvReqObj.TGLORDER).subtract(7, 'hour').format() // waktu order
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    request: [
                        {
                            reference: `urn:uuid:${uuidSrvReq}` // uuid serviceReq
                        }
                    ],
                    receivedTime: dayjs(srvReqObj.TglPelayanan).subtract(7, 'hour').format() // waktu pelayanan
                };
                specimnt.request = {
                    method: "POST",
                    url: "Specimen"
                };
            };

            // obs diag report
            let obsDiagRpt = null;
            let uuidobsDiagRpt = uuidv4();
            if (diagReport.length !== 0 && chkBtaPositif) {
                let diagRptObj = diagReport[0];
                obsDiagRpt = {};

                obsDiagRpt.fullUrl = `urn:uuid:${uuidobsDiagRpt}`;
                obsDiagRpt.resource = {
                    resourceType: "Observation",
                    identifier: [
                        {
                            system: `http://sys-ids.kemkes.go.id/observation/${ihsRS}`,
                            value: regId // reg id
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
                                code: "11477-7",
                                display: "Microscopic observation [Identifier] in Sputum by Acid fast stain"
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`
                    },
                    effectiveDateTime: dayjs(diagRptObj.UserDate).subtract(7, 'hour').format(), // userdate lab
                    issued: dayjs(diagRptObj.UserDate).subtract(7, 'hour').format(),
                    performer: [
                        {
                            reference: `Practitioner/${diagRptObj.IhsNumber}`
                        },
                        {
                            reference: `Organization/${ihsRS}`
                        }
                    ],
                    specimen: {
                        reference: `urn:uuid:${uuidSpec}`
                    },
                    basedOn: [
                        {
                            reference: `urn:uuid:${uuidSrvReq}` // service request
                        }
                    ],
                    valueCodeableConcept: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: "260347006",
                                display: "+"
                            }
                        ]
                    },
                    referenceRange: [
                        {
                            text: "Negative"
                        }
                    ]
                };
                obsDiagRpt.request = {
                    method: "POST",
                    url: "Observation"
                };
            };

            // diag report
            let diagRpt = null;
            let uuidDiagRpt = uuidv4();
            if (diagReport.length !== 0 && chkBtaPositif) {
                let diagRptObj = diagReport[0];
                diagRpt = {};

                diagRpt.fullUrl = `urn:uuid:${uuidDiagRpt}`;
                diagRpt.resource = {
                    resourceType: "DiagnosticReport",
                    identifier: [
                        {
                            system: `http://sys-ids.kemkes.go.id/diagnostic/${ihsRS}/lab`,
                            use: "official",
                            value: regId // Reg Id
                        }
                    ],
                    status: "final",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/v2-0074",
                                    code: "MB",
                                    display: "Microbiology"
                                }
                            ]
                        }
                    ],
                    code: {
                        coding: [
                            {
                                system: "http://loinc.org",
                                code: "11477-7",
                                display: "Microscopic observation [Identifier] in Sputum by Acid fast stain"
                            }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`
                    },
                    effectiveDateTime: dayjs(diagRptObj.UserDate).subtract(7, 'hour').format(), // userdate hasil lab
                    issued: dayjs(diagRptObj.UserDate).subtract(7, 'hour').format(), // userdate hasil lab
                    performer: [
                        {
                            reference: `Practitioner/${diagRptObj.IhsNumber}` // ihs dr lab
                        },
                        {
                            reference: `Organization/${ihsRS}`
                        }
                    ],
                    result: [
                        {
                            reference: `urn:uuid:${uuidobsDiagRpt}` // obs diag report
                        }
                    ],
                    specimen: [
                        {
                            reference: `urn:uuid:${uuidSpec}`
                        }
                    ],
                    basedOn: [
                        {
                            reference: `urn:uuid:${uuidSrvReq}`
                        }
                    ],
                    conclusionCode: [
                        {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: "260347006",
                                    display: "+"
                                }
                            ]
                        }
                    ]
                };
                diagRpt.request = {
                    method: "POST",
                    url: "DiagnosticReport"
                };
            };

            // allergi intolerance
            let allIntolerance = null;
            if (allergi.length !== 0 && chkAllergi) {
                let uuidAllInt = uuidv4();
                let allInt = allergi[0];
                allIntolerance = {};

                allIntolerance.fullUrl = `urn:uuid:${uuidAllInt}`;
                allIntolerance.resource = {
                    resourceType: "AllergyIntolerance",
                    identifier: [
                        {
                            system: `http://sys-ids.kemkes.go.id/allergy/${ihsRS}`,
                            use: "official",
                            value: allInt.PasienId // pasien id
                        }
                    ],
                    clinicalStatus: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-clinical",
                                code: allInt.ClinicalStatus,
                                // display: "Active" // clinical status
                            }
                        ]
                    },
                    verificationStatus: {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/allergyintolerance-verification",
                                code: allInt.VerificationStatus,
                                // display: "Confirmed" // verification status
                            }
                        ]
                    },
                    category: [
                        allInt.Categori // categori
                    ],
                    code: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: allInt.Code, // code
                                // "display": "Gluten"
                            }
                        ],
                        text: allInt.Note // note keterangan
                    },
                    patient: {
                        reference: `Patient/${ihsPasien}`,
                        // "display": "Budi Santoso"
                    },
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`,
                        // "display": "Kunjungan Budi Santoso di hari Selasa, 14 Juni 2022"
                    },
                    recordedDate: dayjs(allInt.DateEntry).subtract(7, 'hour').format(), // date entry
                    recorder: {
                        reference: `Practitioner/${ihsPracticioner}`
                    }
                };
                allIntolerance.request = {
                    method: "POST",
                    url: "AllergyIntolerance"
                }
            };

            // Clinical Impression
            let clncImp = null;
            if (clinicImp.length !== 0 && chkClinicImp) {
                let uuidClinicImp = uuidv4();
                let clinImp = clinicImp[0];
                clncImp = {};

                clncImp.fullUrl = `urn:uuid:${uuidClinicImp}`;
                clncImp.resource = {
                    resourceType: "ClinicalImpression",
                    identifier: [
                        {
                            system: `http://sys-ids.kemkes.go.id/clinicalimpression/${ihsRS}`,
                            use: "official",
                            value: regId // noreg pasien
                        }
                    ],
                    status: "completed",
                    description: clinImp.Assesment, // assesment
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`
                    },
                    effectiveDateTime: dayjs(clinImp.TglJam).subtract(7, 'hour').format(),
                    date: dayjs(clinImp.TglJam).subtract(7, 'hour').format(),
                    assessor: {
                        reference: `Practitioner/${ihsPracticioner}` // ihs dpjp
                    },
                    problem: [
                        {
                            reference: `urn:uuid:${diagnosis[0].uuid}` // uuid condition[0]
                        }
                    ],
                    investigation: [
                        {
                            code: {
                                text: serviceRequest[0].Deskripsi
                            },
                            item: [
                                {
                                    reference: `urn:uuid:${uuidDiagRpt}` // uuid diag report
                                },
                                {
                                    reference: `urn:uuid:${uuidobsDiagRpt}` // uuid obs diag report
                                }
                            ]
                        }
                    ],
                    summary: "Prognosis terhadap gejala klinis",
                    finding: [
                        {
                            itemCodeableConcept: {
                                coding: [
                                    {
                                        system: "http://hl7.org/fhir/sid/icd-10",
                                        code: diagnosis[0].DiagnosisId,
                                    }
                                ]
                            },
                            itemReference: {
                                reference: `urn:uuid:${diagnosis[0].uuid}`
                            }
                        }
                    ],
                    prognosisCodeableConcept: [
                        {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: "170968001",
                                    display: "Prognosis good"
                                }
                            ]
                        }
                    ]
                };
                clncImp.request = {
                    method: "POST",
                    url: "ClinicalImpression"
                };
            };

            // rencana tindak lanjut
            let rTindakLanjut = null;
            if (rencanaTL.length !== 0 && chkRencanaTL) {
                let uuidTL = uuidv4();
                let rTL = rencanaTL[0];
                rTindakLanjut = {};

                rTindakLanjut.fullUrl = `urn:uuid:${uuidTL}`;
                rTindakLanjut.resource = {
                    resourceType: "CarePlan",
                    status: "active",
                    intent: "plan",
                    category: [
                        {
                            coding: [
                                {
                                    system: "http://snomed.info/sct",
                                    code: "736271009",
                                    display: "Outpatient care plan"
                                }
                            ]
                        }
                    ],
                    title: "Rencana Rawat Pasien",
                    description: `Rencana ${rTL.KodeTindakan} pada tanggal ${rTL.TglKontrol} ke ${rTL.NamaRuang}`,
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`
                    },
                    created: "2023-08-31T01:20:00+00:00",
                    author: {
                        reference: `Practitioner/${ihsPracticioner}`
                    }
                };
                rTindakLanjut.request = {
                    method: "POST",
                    url: "CarePlan"
                }
            };

            // Respon Kuesioner
            let respKuisioner = null;
            if (chkKuisioner) {
                let uuidKuis = uuidv4();
                respKuisioner = {};

                respKuisioner.fullUrl = `urn:uuid:${uuidKuis}`;
                respKuisioner.resource = {
                    resourceType: "QuestionnaireResponse",
                    questionnaire: "https://fhir.kemkes.go.id/Questionnaire/Q0007",
                    status: "completed",
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `urn:uuid:${uuidEncounter}`
                    },
                    authored: dayjs(pulangEnd).subtract(7, 'hour').format(),
                    author: {
                        reference: `Practitioner/${ihsPracticioner}`
                    },
                    source: {
                        reference: `Patient/${ihsPasien}`
                    },
                    item: [
                        {
                            linkId: "1",
                            text: "Persyaratan Administrasi",
                            item: [
                                {
                                    linkId: "1.1",
                                    text: "Apakah nama, umur, jenis kelamin, berat badan dan tinggi badan pasien sudah sesuai?",
                                    answer: [
                                        {
                                            valueCoding: {
                                                system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                                                code: "OV000052",
                                                display: "Sesuai"
                                            }
                                        }
                                    ]
                                },
                                {
                                    linkId: "1.2",
                                    text: "Apakah nama, nomor ijin, alamat dan paraf dokter sudah sesuai?",
                                    answer: [
                                        {
                                            valueCoding: {
                                                system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                                                code: "OV000052",
                                                display: "Sesuai"
                                            }
                                        }
                                    ]
                                },
                                {
                                    linkId: "1.3",
                                    text: "Apakah tanggal resep sudah sesuai?",
                                    answer: [
                                        {
                                            valueCoding: {
                                                system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                                                code: "OV000052",
                                                display: "Sesuai"
                                            }
                                        }
                                    ]
                                },
                                {
                                    linkId: "1.4",
                                    text: "Apakah ruangan/unit asal resep sudah sesuai?",
                                    answer: [
                                        {
                                            valueCoding: {
                                                system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                                                code: "OV000052",
                                                display: "Sesuai"
                                            }
                                        }
                                    ]
                                },
                                {
                                    linkId: "2",
                                    text: "Persyaratan Farmasetik",
                                    item: [
                                        {
                                            linkId: "2.1",
                                            text: "Apakah nama obat, bentuk dan kekuatan sediaan sudah sesuai?",
                                            answer: [
                                                {
                                                    valueCoding: {
                                                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                                                        code: "OV000052",
                                                        display: "Sesuai"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            linkId: "2.2",
                                            text: "Apakah dosis dan jumlah obat sudah sesuai?",
                                            answer: [
                                                {
                                                    valueCoding: {
                                                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                                                        code: "OV000052",
                                                        display: "Sesuai"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            linkId: "2.3",
                                            text: "Apakah stabilitas obat sudah sesuai?",
                                            answer: [
                                                {
                                                    valueCoding: {
                                                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                                                        code: "OV000052",
                                                        display: "Sesuai"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            linkId: "2.4",
                                            text: "Apakah aturan dan cara penggunaan obat sudah sesuai?",
                                            answer: [
                                                {
                                                    valueCoding: {
                                                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                                                        code: "OV000052",
                                                        display: "Sesuai"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    linkId: "3",
                                    text: "Persyaratan Klinis",
                                    item: [
                                        {
                                            linkId: "3.1",
                                            text: "Apakah ketepatan indikasi, dosis, dan waktu penggunaan obat sudah sesuai?",
                                            answer: [
                                                {
                                                    valueCoding: {
                                                        system: "http://terminology.kemkes.go.id/CodeSystem/clinical-term",
                                                        code: "OV000052",
                                                        display: "Sesuai"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            linkId: "3.2",
                                            text: "Apakah terdapat duplikasi pengobatan?",
                                            answer: [
                                                {
                                                    valueBoolean: false
                                                }
                                            ]
                                        },
                                        {
                                            linkId: "3.3",
                                            text: "Apakah terdapat alergi dan reaksi obat yang tidak dikehendaki (ROTD)?",
                                            answer: [
                                                {
                                                    valueBoolean: false
                                                }
                                            ]
                                        },
                                        {
                                            linkId: "3.4",
                                            text: "Apakah terdapat kontraindikasi pengobatan?",
                                            answer: [
                                                {
                                                    valueBoolean: false
                                                }
                                            ]
                                        },
                                        {
                                            linkId: "3.5",
                                            text: "Apakah terdapat dampak interaksi obat?",
                                            answer: [
                                                {
                                                    valueBoolean: false
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                };
                respKuisioner.request = {
                    method: "POST",
                    url: "QuestionnaireResponse"
                }
            };

            // catatan pengobatan
            let noteObat = null;
            if (validNotNullUuid.length !== 0) {
                let noteMedic = validNotNullUuid[0];
                let uuidNM = uuidv4();
                noteObat = {};

                noteObat.fullUrl = `urn:uuid:${uuidNM}`;
                noteObat.resource = {
                    resourceType: "MedicationStatement",
                    id: "NM-" + noteMedic.NORESEP,
                    // identifier: [
                    //     {
                    //         system: `http://sys-ids.kemkes.go.id/prescription/${ihsRS}`,
                    //         use: "official",
                    //         value: "NM-" + noteMedic.NORESEP
                    //     }
                    //     // {
                    //     //     system: `http://sys-ids.kemkes.go.id/prescription-item/${ihsRS}`,
                    //     //     use: "official",
                    //     //     value: item.NORESEP + '-' + (index + 1)
                    //     // }
                    // ],
                    status: "active",
                    medicationCodeableConcept: {
                        coding: [
                            {
                                system: "http://sys-ids.kemkes.go.id/kfa",
                                code: noteMedic.KodeKFAPA.replace(/\r?\n|\r/g, ''),
                                display: noteMedic.NAMABARANG
                            }
                        ],
                        text: noteMedic.NAMABARANG
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    context: {
                        reference: `urn:uuid:${uuidEncounter}`,
                    },
                    effectiveDateTime: dayjs(waktuValidResep_1).subtract(7, 'hour').format(),
                    dateAsserted: dayjs(waktuValidResep_1).subtract(7, 'hour').format(),
                    informationSource: {
                        reference: `Practitioner/${ihsPracticioner}`
                    },
                    note: [
                        {
                            text: "Pasien menyatakan bahwa mereka telah mengonsumsi obat sesuai petunjuk."
                        }
                    ],
                    dosage: [
                        {
                            //     "text": "5 ml three times daily",
                            //     "timing": {
                            //         "repeat": {
                            //             "frequency": 3,
                            //             "period": 1,
                            //             "periodUnit": "d"
                            //         }
                            //     },
                            //     "route": {
                            //         "coding": [
                            //             {
                            //                 "system": "http://terminology.hl7.org/CodeSystem/v3-RouteOfAdministration",
                            //                 "code": "PO",
                            //                 "display": "oral"
                            //             }
                            //         ]
                            //     },
                            doseAndRate: [
                                {
                                    doseQuantity: {
                                        value: noteMedic.QTYBAR,
                                        unit: noteMedic.BahanBakuAktifSatuanD_Disesuaikan.trim(),
                                        system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                                        code: noteMedic.BahanBakuAktifSatuanD_Disesuaikan.trim()
                                    }
                                }
                            ]
                        }
                    ]
                };
                noteObat.request = {
                    method: "POST",
                    url: "MedicationStatement"
                }
            }

            // console.log('dataObs1 : ', dataObs1);
            // console.log('dataObs2 : ', dataObs2);

            // filter yang null
            const objArray = [dataEncounter, dataObs1, dataObs2,
                dataObs3, dataObs4, dataObs5, dataDiagnosis, dataProc, dataComp, medRequest,
                medDispense, srvReq, specimnt, obsDiagRpt, diagRpt, allIntolerance, clncImp,
                rTindakLanjut, respKuisioner, noteObat
            ];
            const filteredObjArray = objArray.filter(obj => obj !== null);

            // console.log('objArray : ', objArray);

            // menggabungkan objek
            const mergedData = [].concat(...filteredObjArray);
            // const mergedData = dataDiagnosis.concat(dataEncounter);
            // merubah urutan encounter
            // Cari indeks encounterData dalam array mergedData
            const encounterIndex = mergedData.findIndex(item => item.resource.resourceType === 'Encounter');

            // Jika encounterData ditemukan, pindahkan ke urutan pertama
            if (encounterIndex !== -1) {
                const encounterData = mergedData.splice(encounterIndex, 1)[0];
                mergedData.unshift(encounterData);
            }
            // console.log('mergerData : ', mergedData);

            let dataKirim = {
                resourceType: 'Bundle',
                type: 'transaction',
                entry: mergedData
            }

            console.log('dataKirim : ', dataKirim);
            kirimBundle(dataKirim);
        }
    }

    const cbKonversi = (dx) => {
        const convertedData = dx.map((diagnosis, index) => {
            return {
                condition: {
                    reference: `urn:uuid:${diagnosis.uuid}`,
                    display: diagnosis.Deskripsi,
                },
                use: {
                    coding: [
                        {
                            system: 'http://terminology.hl7.org/CodeSystem/diagnosis-role',
                            code: 'DD',
                            display: 'Discharge diagnosis',
                        },
                    ],
                },
                rank: index + 1,
            };
        });

        console.log('cbKonversi : ', convertedData);
    }

    // info Kirim BTA Positif
    const infoKirimBTAPositif = () => {
        Modal.info({
            title: 'Kirim BTA Positif',
            content: (
                <div>
                    <p>Ceklist akan bisa di check/ aktif jika pasien mempunyai hasil BTA, jika Hasil <b>BTA POSITIF</b> maka ceklist <b>wajib</b> di check untuk mengirimkan data ke SatuSehat.</p>
                </div>
            ),
            onOk() { },
        });
    };

    // info Allergi Int
    const infoAllInt = () => {
        Modal.info({
            title: 'Kirim Allergi Intoleran',
            content: (
                <div>
                    <p>Ceklist akan bisa di check/ aktif jika pasien mempunyai data <b>Allergi Intoleran</b>, di check jika ingin mengirimkan data ke SatuSehat.</p>
                </div>
            ),
            onOk() { },
        });
    };

    // info Impresi Klinis
    const infoImpKlinis = () => {
        Modal.info({
            title: 'Kirim Impresi Klinis',
            content: (
                <div>
                    <p>Ceklist akan bisa di check/ aktif jika <b>check BTA Positif dan data Impresi Klinis terisi</b>, di check jika ingin mengirimkan data ke SatuSehat.</p>
                </div>
            ),
            onOk() { },
        });
    };

    // info Rencana Tindak Lanjut
    const infoRencanaTL = () => {
        Modal.info({
            title: 'Kirim Rencana Tindak Lanjut',
            content: (
                <div>
                    <p>Ceklist akan bisa di check/ aktif jika data <b>Rencana Tindak Lanjut terisi</b>, di check jika ingin mengirimkan data ke SatuSehat.</p>
                </div>
            ),
            onOk() { },
        });
    };

    // info Respon Kuisioner
    const infoRespKuisioner = () => {
        Modal.info({
            title: 'Kirim Respon Kuisioner',
            content: (
                <div>
                    <p>Ceklist jika ingin mengirimkan data <b>Respon Kuisioner Obat</b> ke SatuSehat. Untuk respon kuisioner masih menggunakan data static dari sistem karena belum adanya form untuk mengisi kuisioner.</p>
                </div>
            ),
            onOk() { },
        });
    };

    // info Catatan Pengobatan
    const infoCatatanPengobatan = () => {
        Modal.info({
            title: 'Kirim Catatan Pengobatan',
            content: (
                <div>
                    <p>Ceklist akan bisa di check/ aktif jika ada data <b>Obat yang diberikan</b>. Ceklist jika ingin mengirimkan data <b>Catatan Pengobatan</b> ke SatuSehat. Untuk Catatan Pengobatan masih menggunakan data static dari sistem karena belum adanya form untuk mengisi Catatan Pengobatan.</p>
                </div>
            ),
            onOk() { },
        });
    };


    return (
        <div>
            <Card
                title='Detail Kirim Satu Sehat :'
                loading={spDetailKirim}
                size='small'
                headStyle={{ backgroundColor: '#36cfc9' }}
            >
                <span><b>Detail Encounter</b></span>
                <hr style={{ marginTop: '-3px' }} />

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        No.Registrasi
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{regId}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        No. RM
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{pasienId}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        Nama Pasien
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{namaPasien}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        NIK
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{nikPasien}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        Alamat Pasien
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{alamat}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        IHS Number Pasien
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <Input
                                value={ihsPasien}
                                placeholder='...'
                                readOnly
                                // maxLength={16}
                                // onChange={(e) => setnik(e.target.value)}
                                size='small' />
                            <Button
                                size='small'
                                type='primary'
                                onClick={() => klikIhsPasien(nikPasien)}
                                icon={<CloudDownloadOutlined />}
                            >
                                Ambil IHS Number
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        DPJP
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{namaDokter}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        IHS Practicioner
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{ihsPracticioner}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        Mulai Pelayanan
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{dayjs(pendStart).format('DD-MM-YYYY HH:mm')}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        Selesai Dilayani
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{dayjs(pulangEnd).format('DD-MM-YYYY HH:mm')}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        Asal Ruang
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{namaRuang}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        Id Ruang SatuSehat
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{ihsRuang}</span>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        Discharge Planning
                    </Col>
                    <Col span={19}>
                        <span style={{ marginRight: '5px', verticalAlign: 'top' }}>:</span>
                        <TextArea
                            rows={4}
                            maxLength={500}
                            onChange={(e) => setdcPlanning(e.target.value)}
                            value={dcPlanning}
                            style={{ width: '98%' }}
                        />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '8px' }}>
                    <Col span={5}>
                        Pendaftaran
                    </Col>
                    <Col span={3}>
                        <Space size='small'>
                            <span>:</span>
                            <span>Mulai</span>
                        </Space>
                    </Col>
                    <Col span={8}>
                        <DatePicker
                            size="small"
                            // disabled={props.disabledTglPendHd}
                            value={dayjs(pendStart)}
                            format={"DD-MM-YYYY HH:mm"}
                            showTime
                            onChange={(e) => setpendStart(e)}
                            allowClear={false}
                        />
                        {/* <span>: {dayjs(pendStart).format('DD-MM-YYYY HH:mm')}</span> */}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '8px' }}>
                    <Col span={5}>
                    </Col>
                    <Col span={3}>
                        <Space size='small'>
                            <span>:</span>
                            <span>Selesai</span>
                        </Space>
                    </Col>
                    <Col span={8}>
                        <DatePicker
                            size="small"
                            // disabled={props.disabledTglPendHd}
                            value={dayjs(pendEnd)}
                            format={"DD-MM-YYYY HH:mm"}
                            showTime
                            onChange={(e) => setpendEnd(e)}
                            allowClear={false}
                        />
                        {/* <span>: {dayjs(pendEnd).format('DD-MM-YYYY HH:mm')}</span> */}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '8px' }}>
                    <Col span={5}>
                        Pemeriksaan
                    </Col>
                    <Col span={3}>
                        <Space size='small'>
                            <span>:</span>
                            <span>Mulai</span>
                        </Space>
                    </Col>
                    <Col span={8}>
                        <DatePicker
                            size="small"
                            // disabled={props.disabledTglPendHd}
                            value={dayjs(pmrStart)}
                            format={"DD-MM-YYYY HH:mm"}
                            showTime
                            onChange={(e) => setpmrStart(e)}
                            allowClear={false}
                        />
                        {/* <span>: {dayjs(pmrStart).format('DD-MM-YYYY HH:mm')}</span> */}
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                    </Col>
                    <Col span={3}>
                        <Space size='small'>
                            <span>:</span>
                            <span>Selesai</span>
                        </Space>
                    </Col>
                    <Col span={8}>
                        <DatePicker
                            size="small"
                            // disabled={props.disabledTglPendHd}
                            value={dayjs(pmrEnd)}
                            format={"DD-MM-YYYY HH:mm"}
                            showTime
                            onChange={(e) => setpmrEnd(e)}
                            allowClear={false}
                        />
                        {/* <span>: {dayjs(pmrEnd).format('DD-MM-YYYY HH:mm')}</span> */}
                    </Col>
                    <Col span={3} style={{ backgroundColor: '#73d13d' }}>
                        <span style={{ marginLeft: '5px' }}>Waktu Order Obat</span>
                    </Col>
                    <Col span={4} style={{ backgroundColor: '#73d13d' }}>
                        : {waktuOrderResep}
                    </Col>
                    <Col span={1}>
                        <Button
                            onClick={() => setpmrEnd(dayjs(waktuOrderResep, 'DD-MM-YYYY HH:mm'))}
                            icon={<CheckOutlined />}
                            type='primary'
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        Pulang
                    </Col>
                    <Col span={3}>
                        <Space size='small'>
                            <span>:</span>
                            <span>Mulai</span>
                        </Space>
                    </Col>
                    <Col span={8}>
                        <DatePicker
                            size="small"
                            // disabled={props.disabledTglPendHd}
                            value={dayjs(pulangStart)}
                            format={"DD-MM-YYYY HH:mm"}
                            showTime
                            onChange={(e) => setpulangStart(e)}
                            allowClear={false}
                        />
                        {/* <span>: {dayjs(pulangStart).format('DD-MM-YYYY HH:mm')}</span> */}
                    </Col>
                    <Col span={3} style={{ backgroundColor: '#73d13d' }}>
                        <span style={{ marginLeft: '5px' }}>Waktu Valid Obat</span>
                    </Col>
                    <Col span={4} style={{ backgroundColor: '#73d13d' }}>
                        : {waktuValidResep}
                    </Col>
                    <Col span={1}>
                        <Button
                            onClick={
                                () => {
                                    setpulangStart(dayjs(waktuValidResep, 'DD-MM-YYYY HH:mm'))
                                    setpulangEnd(dayjs(waktuValidResep, 'DD-MM-YYYY HH:mm'))
                                }
                            }
                            icon={<CheckOutlined />}
                            type='primary'
                            style={{ width: '100%' }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                    </Col>
                    <Col span={3}>
                        <Space size='small'>
                            <span>:</span>
                            <span>Selesai</span>
                        </Space>
                    </Col>
                    <Col span={8}>
                        <DatePicker
                            size="small"
                            // disabled={props.disabledTglPendHd}
                            value={dayjs(pulangEnd)}
                            format={"DD-MM-YYYY HH:mm"}
                            showTime
                            onChange={(e) => setpulangEnd(e)}
                            allowClear={false}
                        />
                        {/* <span>: {dayjs(pulangEnd).format('DD-MM-YYYY HH:mm')}</span> */}
                    </Col>
                </Row>

                <span style={{ marginTop: '10px' }}><b>Observation</b></span>
                <hr style={{ marginTop: '-3px' }} />
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        Nadi :
                    </Col>
                    <Col span={9}>
                        <Input
                            size='small'
                            addonAfter="beats/minute"
                            value={nadi}
                            style={{ width: '98%' }} />
                    </Col>
                    <Col span={3}>
                        Resp. Rate :
                    </Col>
                    <Col span={9}>
                        <Input
                            size='small'
                            addonAfter="breaths/minute"
                            value={respRate} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        Sistolik :
                    </Col>
                    <Col span={9}>
                        <Input
                            size='small'
                            addonAfter="mm[Hg]"
                            value={sistol}
                            style={{ width: '98%' }} />
                    </Col>
                    <Col span={3}>
                        Diastolik :
                    </Col>
                    <Col span={9}>
                        <Input
                            size='small'
                            addonAfter="mm[Hg]"
                            value={diastol} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        Suhu :
                    </Col>
                    <Col span={9}>
                        <Input
                            size='small'
                            addonAfter="Cel"
                            value={suhu}
                            style={{ width: '98%' }} />
                    </Col>
                </Row>

                <span style={{ marginTop: '10px' }}><b>Detail Condition</b></span>
                <hr style={{ marginTop: '-3px' }} />
                <Table
                    bordered
                    // loading={spGetOrganization}
                    columns={columns}
                    dataSource={diagnosis}
                    pagination={false}
                    size='small'
                />

                <span style={{ marginTop: '10px' }}><b>SNOMED Procedure</b></span>
                <hr style={{ marginTop: '-3px' }} />
                <Table
                    bordered
                    // loading={spGetOrganization}
                    columns={columnsc}
                    dataSource={SnProcedure}
                    pagination={false}
                    size='small'
                />

                <span style={{ marginTop: '10px' }}><b>ICD-9 (Procedure)</b></span>
                <hr style={{ marginTop: '-3px' }} />
                <Table
                    bordered
                    // loading={spGetOrganization}
                    columns={columnsb}
                    dataSource={procedure}
                    pagination={false}
                    size='small'
                />

                <span style={{ marginTop: '10px' }}><b>Composition</b></span>
                <hr style={{ marginTop: '-3px' }} />
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        Prog.Diet :
                    </Col>
                    <Col span={21}>
                        <TextArea
                            rows={4}
                            placeholder="..."
                            value={composition}
                            onChange={(e) => setcomposition(e.target.value)}
                        // maxLength={} 
                        />
                    </Col>
                </Row>

                <span style={{ marginTop: '10px' }}><b>Medication</b></span>
                <hr style={{ marginTop: '-3px' }} />

                {medication.map((item, index) => (
                    <div>
                        <Row>
                            <Col span={24}>
                                <span>Daftar Obat ORDER</span>
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

                        <Row style={{ marginTop: '5px' }}>
                            <Col span={24}>
                                <span>Daftar Obat TERVALIDASI</span>
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

                        {/* {item.Valid.map((item, index) => (
                            <Row style={{ marginTop: '5px' }}>
                                <Col span={24}>
                                    <span>Daftar Obat TERVALIDASI</span>
                                    <hr style={{ marginTop: '-3px', marginBottom: '-3px' }} />
                                </Col>
                                <Col span={5}>
                                    <span>No.Resep : {item.NORESEP}</span>
                                </Col>
                                <Col span={5}>
                                    <span>No.Reg. : {item.NOREG}</span>
                                </Col>
                                <Col span={5}>
                                    <span>Tgl.Resep : {dayjs(item.DATEENTRY).format('DD-MM-YYYY HH:mm')}</span>
                                </Col>
                                <Col span={9}>
                                    <span>Apt.Tujuan : {item.NAMABAGIAN}</span>
                                </Col>
                                <Col span={24}>
                                    <Table
                                        columns={columnse}
                                        // dataSource={item.Obat}
                                        dataSource={medValid}
                                        size='small'
                                        bordered
                                        pagination={false}
                                    />
                                </Col>
                            </Row>
                        ))} */}
                    </div>
                ))}

                <Row style={{ marginTop: '10px' }}>
                    <Col>
                    </Col>
                </Row>

                <span style={{ marginTop: '10px' }}><b>Order Penunjang (Service Request)</b></span>
                <hr style={{ marginTop: '-3px' }} />

                <Table
                    columns={colSrvRequest}
                    // dataSource={item.Obat}
                    dataSource={serviceRequest}
                    size='small'
                    bordered
                    pagination={false}
                />

                <span style={{ marginTop: '10px' }}><b>Hasil Lab Pk (Diagnostic Report)</b></span>
                <hr style={{ marginTop: '-3px' }} />

                <Table
                    columns={colDiagRpt}
                    // dataSource={item.Obat}
                    dataSource={diagReport}
                    size='small'
                    bordered
                    pagination={false}
                />

                <Row style={{ marginTop: '10px' }}>
                    <Col>
                    </Col>
                </Row>

                <span style={{ marginTop: '10px' }}><b>Allergi Intoleran</b></span>
                <hr style={{ marginTop: '-3px' }} />

                <Table
                    columns={colAllergi}
                    // dataSource={item.Obat}
                    dataSource={allergi}
                    size='small'
                    bordered
                    pagination={false}
                />

                <Row style={{ marginTop: '10px' }}>
                    <Col>
                    </Col>
                </Row>

                <span style={{ marginTop: '10px' }}><b>Impresi Klinis (Clinical Impression)</b></span>
                <hr style={{ marginTop: '-3px' }} />

                <Table
                    columns={colClinicImp}
                    // dataSource={item.Obat}
                    dataSource={clinicImp}
                    size='small'
                    bordered
                    pagination={false}
                />

                <Row style={{ marginTop: '10px' }}>
                    <Col>
                    </Col>
                </Row>

                <span style={{ marginTop: '10px' }}><b>Rencana Tindak Lanjut</b></span>
                <hr style={{ marginTop: '-3px' }} />

                <Table
                    columns={colRencanaTL}
                    // dataSource={item.Obat}
                    dataSource={rencanaTL}
                    size='small'
                    bordered
                    pagination={false}
                />

                <Row style={{ marginTop: '10px' }}>
                    <Col>
                    </Col>
                </Row>

                {/* <span><b>UUID</b></span>
                <hr style={{ marginTop: '-3px' }} />

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={5}>
                        UUID Encounter
                    </Col>
                    <Col span={19}>
                        <Space size='small'>
                            <span>:</span>
                            <span>{uuidEncounter}</span>
                        </Space>
                    </Col>
                </Row>
                <Table
                    bordered
                    // loading={spGetOrganization}
                    columns={columnsa}
                    dataSource={diagnosis}
                    pagination={false}
                    size='small'
                /> */}

                <Row>
                    <Col span={18}>
                    </Col>
                    <Col span={6}>
                        <Card
                            size="small"
                            title="Pilihan Kirim"
                            style={{
                                width: '100%',
                            }}
                        >
                            <Space>
                                <Checkbox
                                    disabled={diagReport.length !== 0 ? false : true}
                                    checked={chkBtaPositif}
                                    onChange={(e) => {
                                        // console.log(e.target.checked);
                                        setchkBtaPositif(e.target.checked);
                                    }}
                                >
                                    Kirim BTA Positif
                                </Checkbox>
                                <InfoCircleTwoTone onClick={infoKirimBTAPositif} />
                            </Space>
                            <Space>
                                <Checkbox
                                    disabled={allergi.length !== 0 ? false : true}
                                    checked={chkAllergi}
                                    onChange={(e) => {
                                        // console.log(e.target.checked);
                                        setchkAllergi(e.target.checked);
                                    }}
                                >
                                    Kirim Allergi Intolerance
                                </Checkbox>
                                <InfoCircleTwoTone onClick={infoAllInt} />
                            </Space>
                            <Space>
                                <Checkbox
                                    disabled={clinicImp.length !== 0 && chkBtaPositif ? false : true}
                                    checked={chkClinicImp}
                                    onChange={(e) => {
                                        // console.log(e.target.checked);
                                        setchkClinicImp(e.target.checked);
                                    }}
                                >
                                    Kirim Impresi Klinis
                                </Checkbox>
                                <InfoCircleTwoTone onClick={infoImpKlinis} />
                            </Space>
                            <Space>
                                <Checkbox
                                    disabled={rencanaTL.length !== 0 ? false : true}
                                    checked={chkRencanaTL}
                                    onChange={(e) => {
                                        // console.log(e.target.checked);
                                        setchkRencanaTL(e.target.checked);
                                    }}
                                >
                                    Kirim Rencana Tindak Lanjut
                                </Checkbox>
                                <InfoCircleTwoTone onClick={infoRencanaTL} />
                            </Space>
                            <Space>
                                <Checkbox
                                    // disabled={rencanaTL.length !== 0 ? false : true}
                                    checked={chkKuisioner}
                                    onChange={(e) => {
                                        // console.log(e.target.checked);
                                        setchkKuisioner(e.target.checked);
                                    }}
                                >
                                    Kirim Respon Kuisioner
                                </Checkbox>
                                <InfoCircleTwoTone onClick={infoRespKuisioner} />
                            </Space>
                            <Space>
                                <Checkbox
                                    disabled={medValid.length !== 0 ? false : true}
                                    checked={chkNoteMed}
                                    onChange={(e) => {
                                        // console.log(e.target.checked);
                                        setchkNoteMed(e.target.checked);
                                    }}
                                >
                                    Kirim Catatan Pengobatan
                                </Checkbox>
                                <InfoCircleTwoTone onClick={infoCatatanPengobatan} />
                            </Space>

                        </Card>
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Space size='small' style={{ float: 'right' }}>
                            <Button
                                onClick={() => klikKirim()}
                                style={{ width: '100px' }}
                                type='primary'
                                icon={<SendOutlined />}>
                                Kirim
                            </Button>
                            <Button
                                onClick={() => setmdDetailKirim(false)}
                                style={{ width: '100px' }}
                                icon={<CloseOutlined />}>
                                Batal
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>

            <Modal
                visible={mdIhsPasien}
                onCancel={() => setmdIhsPasien(false)}
                width={1000}
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <Row>
                    <Col span={12}>
                        <Card
                            title='Detail Ihs Pasien'
                            size='small'
                            headStyle={{ backgroundColor: '#36cfc9' }}>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Nama
                                </Col>
                                <Col span={19}>
                                    : <b>{ihsnama}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    IHS Number
                                </Col>
                                <Col span={19}>
                                    : <b>{ihsihsnumber}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    NIK
                                </Col>
                                <Col span={19}>
                                    : <b>{ihsnik}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Jenis Kelamin
                                </Col>
                                <Col span={19}>
                                    : {ihsjenkel}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Terakhir Update
                                </Col>
                                <Col span={19}>
                                    : {ihslastupdate}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Tanggal Lahir
                                </Col>
                                <Col span={19}>
                                    : {ihstgllahir}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Alamat
                                </Col>
                                <Col span={19}>
                                    : {ihsalamat}
                                </Col>
                            </Row>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card
                            title='Detail Lokal Pasien'
                            size='small'
                            headStyle={{ backgroundColor: '#4096ff' }}>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Nama
                                </Col>
                                <Col span={19}>
                                    : <b>{namaPasien}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    IHS Number
                                </Col>
                                <Col span={19}>
                                    : -
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    NIK
                                </Col>
                                <Col span={19}>
                                    : <b>{nikPasien}</b>
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Jenis Kelamin
                                </Col>
                                <Col span={19}>
                                    : {jenkelPasien}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Terakhir Update
                                </Col>
                                <Col span={19}>
                                    : -
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Tanggal Lahir
                                </Col>
                                <Col span={19}>
                                    : {dayjs(tglLahirPasien).format('DD-MM-YYYY')}
                                </Col>
                            </Row>
                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={5}>
                                    Alamat
                                </Col>
                                <Col span={19}>
                                    : {alamat}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>

                <hr />
                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button
                                onClick={() => klikSesuai()}
                                type='primary'
                                style={{ width: '150px' }}
                                icon={<CheckOutlined />}
                            >
                                Sesuai
                            </Button>
                            <Button
                                onClick={() => setmdIhsPasien(false)}
                                style={{ width: '150px' }}
                                icon={<CloseOutlined />}
                            >
                                Tidak Sesuai
                            </Button>
                        </Space>
                    </Col>
                </Row>

            </Modal>
        </div>
    )
}

export default SSDetailKirim