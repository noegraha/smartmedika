import { Button, Col, Divider, Modal, Row, Spin, Table } from 'antd';
import React, { useContext, useState } from 'react';
import { SatuSehatEncounterContext } from '../../../../context/SatuSehatEncounterContext';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const MedicationRequest = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        listOrderResep,
        setmsRscdetail,
        paramEncounter,
        getResourceById,
        getRiwRscId,
        getListOrderResep,
        kirimBundleV2,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

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

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        // if (codeGrup === '67') {
        //     setidSpecimen(data.lenght !== 0 ? data[0].ResourceID : null);
        // }
        // else if (codeGrup === '66') {
        //     setidServiceRequest(data.lenght !== 0 ? data[0].ResourceID : null);
        // }
        // else {
        //     setlistTable(data);
        // }
        setlistTable(data);
    };

    const post = () => {
        // Gabungkan semua objek Paten dengan properti induknya
        const patenList = listOrderResep.flatMap(order =>
            order.Paten.map(paten => ({
                ...paten,
                NOORDER: order.NOORDER,
                RegistrasiId: order.RegistrasiId,
                TglOrder: order.TglOrder,
                UnitOrder: order.UnitOrder,
                NamaBagian: order.NamaBagian,
                UnitTujuan: order.UnitTujuan,
                WaktuEntry: order.WaktuEntry
            }))
        );

        // Gabungkan semua objek Racik dengan properti induknya
        const racikList = listOrderResep.flatMap(order =>
            order.Racik.map(racik => ({
                ...racik,
                NOORDER: order.NOORDER,
                RegistrasiId: order.RegistrasiId,
                TglOrder: order.TglOrder,
                UnitOrder: order.UnitOrder,
                NamaBagian: order.NamaBagian,
                UnitTujuan: order.UnitTujuan,
                WaktuEntry: order.WaktuEntry
            }))
        );

        // Filter objek yang memiliki KodeKFAPA tidak null atau tidak kosong
        const filteredDataPaten = patenList.filter(item => item.KodeKFAPA !== null && item.KodeKFAPA.trim() !== "");

        // console.log('patenList : ', filteredDataPaten);

        let data = filteredDataPaten.map((item, index) => {
            return {
                fullUrl: `urn:uuid:${uuidv4()}`,
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
                    medicationReference: {
                        reference: '#' + item.NOORDER + index,
                        display: item.NAMABARANG
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`,
                    },
                    encounter: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    },
                    authoredOn: dayjs(item.TglOrder).subtract(7, 'hour').format(),
                    requester: {
                        // reference: `Practitioner/${item.IhsNumber}`,
                        reference: `Practitioner/${paramEncounter.IhsPracticioner}`
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
                            start: dayjs(item.TglOrder).subtract(7, 'hour').format(),
                            end: dayjs(item.TglOrder).subtract(7, 'hour').format()
                        },
                        // numberOfRepeatsAllowed: 0,
                        quantity: {
                            value: item.QTYBAR,
                            unit: item.BahanBakuAktifSatuanD_Disesuaikan.trim(),
                            system: "http://terminology.hl7.org/CodeSystem/v3-orderableDrugForm",
                            code: item.BahanBakuAktifSatuanD_Disesuaikan.trim()
                        },
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

        let dataKirim = {
            resourceType: 'Bundle',
            type: 'transaction',
            entry: data
        };

        // console.log('dataKirim : ', dataKirim);

        kirimBundleV2(dataKirim, 'MedicationRequest', '94');
    };

    return (
        <div>
            <Divider
                variant="dotted"
                orientation="left"
                style={{
                    borderColor: '#7cb305',
                }}
            >
                Medication Request
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
                                klikRefresh('94');
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
                            Tambah Peresepan Obat
                        </Divider>
                    </Col>
                    <Col span={2}>
                        <Button
                            onClick={() => {
                                // getListOrderResep("2411010123");
                                getListOrderResep(identitasPx.RegistrasiId);
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

                    {listOrderResep.length === 0 ? <>
                        <Row>
                            <Col span={24}>
                                Tidak ada Order Resep... 😁
                            </Col>
                        </Row>
                    </>
                        : listOrderResep.map((item, index) => (
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
                            </div>
                        ))}

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => post()}
                                // disabled={!idServiceRequest}
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

export default MedicationRequest