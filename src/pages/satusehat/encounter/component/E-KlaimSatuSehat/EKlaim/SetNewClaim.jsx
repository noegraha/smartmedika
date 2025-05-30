/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Divider, Input, Modal, Row, Select, Space, Spin, Table } from 'antd'
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../context/SatuSehatEncounterContext';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { Option } = Select;

const SetNewClaim = () => {
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

    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);
    const [listTable, setlistTable] = useState(null);
    const [noSEP, setnoSEP] = useState(null);

    useEffect(() => {
        klikRefresh('109');
    }, []);

    const listSepDummy = [
        {
            id: 1,
            noSep: '1111R0010121V018721',
        },
        {
            id: 2,
            noSep: '1111R0010321V015078',
        },
    ]

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
                        <Button
                            type='primary'
                            onClick={() => postEncounter(record.ResourceID)}
                            icon={<SearchOutlined />}
                            size='small'
                        >
                            Set Encounter
                        </Button>
                    </Space>
                </div>
        },
    ];

    const post = () => {
        let data = {
            metadata: {
                method: "new_claim"
            },
            data: {
                nomor_kartu: paramCoverage.NoPeserta,
                nomor_sep: ssDummySEP.No_Sep,
                nomor_rm: identitasPx.PasienId,
                nama_pasien: identitasPx.Nama,
                tgl_lahir: dayjs(identitasPx.TanggalLahir).subtract(7, 'hour').format(),
                gender: identitasPx.JenisKelamin === 'male' ? '1' : '2'
            }
        }

        // console.log('data : ', data);
        postEklaim(data, 'New Claim', '109');
    };

    const postEncounter = (noSep) => {
        let data = {
            metadata: {
                method: "satusehat_encounter_set",
                nomor_sep: noSep
            },
            data: {
                encounters: [
                    paramEncounter.ResourceID
                ]
            }
        };

        postEklaim(data, 'Set Encounter', '110');
    }

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
                New Claim
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
                            disabled={listTable && listTable.length === 0 ? false : true}
                            icon={<PlusOutlined />}
                        >
                            Tambah
                        </Button>
                        {/* <Space>
                            <Button
                                type='primary'
                                onClick={() => {
                                    setmdTambahRiwayat(true);
                                    // setketerangan("Tidak puasa");
                                }}
                                icon={<PlusOutlined />}
                            >
                                Set Encounter
                            </Button>
                        </Space> */}
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('109');
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
                    <Col span={24}>
                        <Divider
                            variant="dotted"
                            orientation="left"
                            style={{
                                borderColor: '#7cb305',
                            }}
                        >
                            Set New Claim
                        </Divider>
                    </Col>
                </Row>

                <Spin
                    spinning={spCvg}
                    tip="Loading... 😁"
                >
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Nomor Kartu</span>
                        </Col>
                        <Col span={21}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{paramCoverage ? paramCoverage.NoPeserta : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Nomor SEP</span>
                        </Col>
                        <Col span={21}>
                            <Space size='small'>
                                <span>:</span>
                                <Input
                                    value={ssDummySEP ? ssDummySEP.No_Sep : null}
                                    // onChange={(e) => setnoSEP(e.target.value)}
                                    size='small'
                                    style={{ width: "150px" }}
                                    readOnly
                                />
                            </Space>
                            {/* <Space size='small'>
                                <Select
                                    // value={noSEP}
                                    style={{ width: "250px" }}
                                    size="small"
                                    placeholder="..."
                                    onChange={(value) => {
                                        // const selectedStatus = listOrderResep.find((item) => item.code === value);
                                        setnoSEP(value); // Set objek yang dipilih
                                    }}
                                >
                                    {listSepDummy.map((item, index) => (
                                        <Option key={index} value={item.noSep}>{item.noSep}</Option>
                                    ))}
                                </Select>
                            </Space> */}
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Nomor RM :</span>
                        </Col>
                        <Col span={21}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{identitasPx ? identitasPx.PasienId : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Nama Pasien :</span>
                        </Col>
                        <Col span={21}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{identitasPx ? identitasPx.Nama : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Tgl. Lahir :</span>
                        </Col>
                        <Col span={21}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{identitasPx ? identitasPx.TanggalLahir : null}</span>
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={3}>
                            <span>Gender :</span>
                        </Col>
                        <Col span={21}>
                            <Space size='small'>
                                <span>:</span>
                                <span>{identitasPx ? identitasPx.JenisKelamin : null}</span>
                            </Space>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={24}>
                            <Button
                                type='primary'
                                onClick={() => post()}
                                disabled={!noSEP}
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

export default SetNewClaim