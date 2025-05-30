import { Button, Col, Divider, Modal, Row, Select, Spin, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const { Option } = Select;

const MedicationAdministration = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        listOrderResep, setlistOrderResep,
        listObatKeluaran,
        setmsRscdetail,
        paramEncounter,
        getResourceById,
        getRiwRscId,
        getListKeluaranObat,
        kirimBundleV2,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [idMedRequest, setidMedRequest] = useState();
    const [listTable, setlistTable] = useState();
    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

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
    ];

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        console.log('klikRefresh : ', data);

        if (codeGrup === '97') {
            setlistTable(data);
        }
        else if (codeGrup === '94') {
            setlistOrderResep(data);
        }
    };

    const post = () => {
        let filterObatKeluar = listObatKeluaran.filter(item => item.KodeKFAPA !== null);

        if (filterObatKeluar.length !== 0) {
            let data = filterObatKeluar.map((item, index) => {
                return {
                    fullUrl: `urn:uuid:${uuidv4()}`,
                    resource: {
                        resourceType: "MedicationAdministration",
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
                        status: "completed",
                        category: {
                            coding: [
                                {
                                    system: "http://terminology.hl7.org/CodeSystem/medication-admin-category",
                                    code: "outpatient",
                                    display: "Outpatient"
                                }
                            ]
                        },
                        medicationReference: {
                            reference: '#' + item.NORESEP + index,
                        },
                        subject: {
                            reference: `Patient/${ihsPasien}`
                        },
                        context: {
                            reference: `Encounter/${paramEncounter.ResourceID}`
                        },
                        effectivePeriod: {
                            start: dayjs(item.WaktuResep).subtract(7, 'hour').format(),
                            end: dayjs(item.WaktuResep).subtract(7, 'hour').format(),
                        },
                        performer: [
                            {
                                actor: {
                                    reference: "Practitioner/10001915884"
                                }
                            }
                        ],
                        reasonCode: [
                            {
                                coding: [
                                    {
                                        system: "http://terminology.hl7.org/CodeSystem/reason-medication-given",
                                        code: "b",
                                        display: "Given as Ordered"
                                    }
                                ]
                            }
                        ],
                        request: {
                            reference: `MedicationRequest/${idMedRequest}`
                        }
                        // dosage: {
                        //     // "site": {
                        //     //     "coding": [
                        //     //         {
                        //     //             "system": "http://snomed.info/sct",
                        //     //             "code": "66480008",
                        //     //             "display": "Structure of left forearm"
                        //     //         }
                        //     //     ]
                        //     // },
                        //     // "route": {
                        //     //     "coding": [
                        //     //         {
                        //     //             "system": "http://www.whocc.no/atc",
                        //     //             "code": "P",
                        //     //             "display": "Parenteral"
                        //     //         }
                        //     //     ]
                        //     // },
                        //     // "dose": {
                        //     //     "value": 500,
                        //     //     "unit": "mL",
                        //     //     "system": "http://unitsofmeasure.org",
                        //     //     "code": "mL"
                        //     // },
                        //     doseQuantity: {
                        //         value: item.QTYBAR,
                        //         unit: item.BahanBakuAktifSatuanD_Disesuaikan.trim(),
                        //         system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                        //         code: item.BahanBakuAktifSatuanD_Disesuaikan.trim()
                        //     }
                        // }
                    },
                    request: {
                        method: "POST",
                        url: "MedicationAdministration"
                    }
                }
            });

            let dataKirim = {
                resourceType: 'Bundle',
                type: 'transaction',
                entry: data
            };

            // console.log('dataKirim : ', dataKirim);

            kirimBundleV2(dataKirim, 'MedicationAdministration', '97');
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
                Medication Administration
            </Divider>

            <Spin
                spinning={spCvg}
                tip="Loading... 😁"
            >
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
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
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('97');
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
                            Tambah Pemberian Obat
                        </Divider>
                    </Col>
                    <Col span={2}>
                        <Button
                            onClick={() => {
                                // getListOrderResep("2411010123");
                                getListKeluaranObat(identitasPx.RegistrasiId);
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
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Med. Request Id :</span>
                        </Col>
                        <Col span={19}>
                            <Select
                                value={idMedRequest}
                                style={{ width: "100%" }}
                                size="small"
                                placeholder="..."
                                onChange={(value) => {
                                    // const selectedStatus = listOrderResep.find((item) => item.code === value);
                                    setidMedRequest(value); // Set objek yang dipilih
                                }}
                            >
                                {listOrderResep.map((item, index) => (
                                    <Option key={index} value={item.ResourceID}>{item.ResourceID}</Option>
                                ))}
                            </Select>
                        </Col>
                        <Col span={2}>
                            <Button
                                onClick={() => {
                                    klikRefresh('94');
                                }}
                                style={{ float: 'right' }}
                            >
                                Refresh
                            </Button>
                        </Col>
                    </Row>

                    {listObatKeluaran.length === 0 ? <>
                        <Row>
                            <Col span={24}>
                                Tidak ada Order Resep... 😁
                            </Col>
                        </Row>
                    </> : <>
                        <Row style={{ marginTop: '5px' }}>
                            <Col span={24}>
                                <span>Daftar Obat TERVALIDASI</span>
                                <hr style={{ marginTop: '0px' }} />
                            </Col>
                        </Row>
                        <Table
                            columns={columnse}
                            dataSource={listObatKeluaran}
                            size='small'
                            bordered
                            pagination={false}
                        />
                    </>}

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => post()}
                                disabled={listObatKeluaran.length === 0 ? true : false}
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

export default MedicationAdministration