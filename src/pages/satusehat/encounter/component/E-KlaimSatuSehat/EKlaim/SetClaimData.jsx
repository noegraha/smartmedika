/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Divider, Input, Row, Space, Spin, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../context/SatuSehatEncounterContext';
import dayjs from 'dayjs';
import { SearchOutlined } from '@ant-design/icons';

const SetClaimData = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        listOrderResep, setlistOrderResep,
        listObatKeluaran,
        setmsRscdetail,
        paramEncounter,
        paramCoverage,
        ssDummySEP,
        getResourceById,
        getRiwRscId,
        getListKeluaranObat,
        kirimBundleV2,
        postEklaim,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [noSep, setnoSep] = useState(null);
    const [listTable, setlistTable] = useState(null);

    useEffect(() => {
        klikRefresh('115');
    }, [])

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
            width: 200,
            render: (text, record, index) =>
                <div>
                    <Space>
                        <Button
                            type='primary'
                            // onClick={() => klikDetail(record.ResourceID, record.ResourceType)}
                            icon={<SearchOutlined />}
                            size='small'
                            style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                        />
                    </Space>
                </div>
        },
    ];

    const post = () => {
        let data = {
            metadata: {
                method: "set_claim_data",
                nomor_sep: ssDummySEP.No_Sep
            },
            data: {
                nomor_sep: ssDummySEP.No_Sep,
                nomor_kartu: paramCoverage.NoPeserta,
                tgl_masuk: dayjs(paramEncounter.TanggalMasuk).format("YYYY-MM-DD"),
                tgl_pulang: dayjs(paramEncounter.TanggalMasuk).format("YYYY-MM-DD") + "T18:00:00",
                cara_masuk: "gp",
                jenis_rawat: "2",
                kelas_rawat: "3",
                adl_sub_acute: "",
                adl_chronic: "",
                icu_indikator: "0",
                icu_los: "0",
                ventilator_hour: "0",
                upgrade_class_ind: "0",
                upgrade_class_class: "",
                upgrade_class_los: "0",
                upgrade_class_payor: "peserta",
                add_payment_pct: "75",
                birth_weight: "0",
                sistole: "105",
                diastole: "73",
                discharge_status: "1",
                diagnosa: "Z09.8#I10#I84.2#K29.7#K31.1##########################",
                procedure: "87.23##############################",
                diagnosa_inagrouper: "Z09.8#I10#I84.2#K29.7#K31.1##########################",
                procedure_inagrouper: "87.23##############################",
                nama_dokter: "dr. Syarifuddin, Sp.Pd.",
                tarif_rs: {
                    prosedur_non_bedah: "0",
                    prosedur_bedah: "0",
                    konsultasi: "110000",
                    tenaga_ahli: "0",
                    keperawatan: "0",
                    penunjang: "0",
                    radiologi: "220000",
                    laboratorium: "0",
                    pelayanan_darah: "0",
                    rehabilitasi: "0",
                    kamar: "0",
                    rawat_intensif: "0",
                    obat: "52587",
                    alkes: "0",
                    bmhp: "0",
                    sewa_alat: "0",
                    obat_kronis: "0",
                    obat_kemoterapi: "0"
                },
                dializer_single_use: "0",
                kangtong_darah: "0",
                tarif_poli_eks: "15000",
                kode_tarif: "BP",
                payor_id: "3",
                payor_cd: "JKN",
                coder_nik: "123123123123"
            }
        }

        // console.log('data : ', data);
        postEklaim(data, 'Set Claim Data', '115');
    };

    const grouping1 = () => {
        let data = {
            metadata: {
                method: "grouper",
                stage: "1"
            },
            data: {
                nomor_sep: ssDummySEP.No_Sep
            }
        };

        postEklaim(data, 'Grouping 1', '116');
    }

    const grouping2 = () => {
        let data = {
            metadata: {
                method: "grouper",
                stage: "2"
            },
            data: {
                nomor_sep: ssDummySEP.No_Sep,
                special_cmg: "RR04Knee#YY01"
            }
        };

        postEklaim(data, 'Grouping 2', '117');
    }

    const claimFinal = () => {
        let data = {
            metadata: {
                method: "claim_final"
            },
            data: {
                nomor_sep: ssDummySEP.No_Sep,
                coder_nik: "123123123123"
            }
        };

        postEklaim(data, 'skip', '000');
    };

    const claimReedit = () => {
        let data = {
            metadata: {
                method: "reedit_claim"
            },
            data: {
                nomor_sep: ssDummySEP.No_Sep,
                coder_nik: "123123123123"
            }
        };

        postEklaim(data, 'skip', '000');
    };

    const claimSend = () => {
        let data = {
            metadata: {
                method: "send_claim_individual"
            },
            data: {
                nomor_sep: ssDummySEP.No_Sep
            }
        };

        postEklaim(data, 'skip', '000');
    };

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            setlistTable(data);
            // console.log('klikRefresh : ', data);
        } catch (error) {
            console.error('Error in klikRefresh:', error);
        }
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
                Set Claim Data
            </Divider>

            <Spin spinning={spCvg} tip="Loading... 😁">
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={12}>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('115');
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

                <Row style={{ marginBottom: 5, marginTop: 5 }}>
                    <Space>
                        <span>No. SEP :</span>
                        <Input
                            value={ssDummySEP ? ssDummySEP.No_Sep : null}
                            readOnly
                        />
                    </Space>
                </Row>
                <Row>
                    <Col>
                        <Space>
                            <Button
                                onClick={() => post()}
                                type='primary'
                            // style={{ marginBottom: 2 }}
                            >
                                Set Claim Data
                            </Button>
                            <Button
                                onClick={() => grouping1()}
                                type='primary'
                            // style={{ marginBottom: 5 }}
                            >
                                Grouping Stage 1
                            </Button>
                            <Button
                                onClick={() => grouping2()}
                                type='primary'
                                disabled
                            // style={{ marginBottom: 5 }}
                            >
                                Grouping Stage 2
                            </Button>
                            <Button
                                onClick={() => claimFinal()}
                                type='primary'
                            // disabled
                            // style={{ marginBottom: 5 }}
                            >
                                Claim Final
                            </Button>
                            <Button
                                onClick={() => claimReedit()}
                                type='primary'
                            // disabled
                            // style={{ marginBottom: 5 }}
                            >
                                Claim Re-Edit
                            </Button>
                            <Button
                                onClick={() => claimSend()}
                                type='primary'
                            // disabled
                            // style={{ marginBottom: 5 }}
                            >
                                Claim Send
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default SetClaimData