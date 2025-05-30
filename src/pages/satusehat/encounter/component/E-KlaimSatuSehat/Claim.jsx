import { Button, Col, Divider, Input, Modal, Row, Spin, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../context/SatuSehatEncounterContext';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';

const Claim = () => {
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
    const [mdTambahRiwayat, setmdTambahRiwayat] = useState(false);

    const klikRefresh = async (codeGrup) => {
        let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
        // if (codeGrup === '66') {
        //     setlistTable(data);
        // }
        // if (codeGrup === '68') {
        //     setlistTable2(data);
        // }
        // else {
        //     setidProsedur(data.lenght !== 0 ? data[0].ResourceID : null);
        // }
    };

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

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Divider
                        variant="dotted"
                        orientation="left"
                        style={{
                            borderColor: '#7cb305',
                        }}
                    >
                        Mengajukan Klaim
                    </Divider>
                </Col>
            </Row>

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
                            }}
                            icon={<PlusOutlined />}
                        >
                            Ajukan Klaim
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Button
                            onClick={() => {
                                klikRefresh('111');
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
                <Divider
                    variant="dotted"
                    orientation="left"
                    style={{
                        borderColor: '#7cb305',
                    }}
                >
                    Pengajuan Klaim
                </Divider>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>No. Org. BPJS :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            // value={hasilLab.Id}
                            placeholder='Nomor Org. BPJS'
                            readOnly
                            // onChange={(e) => setvolume(e.target.value)}
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
                            // value={hasilLab.Id}
                            placeholder='Nomor Batch'
                            readOnly
                            // onChange={(e) => setvolume(e.target.value)}
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
                            // value={hasilLab.Id}
                            placeholder='Nomor SEP'
                            readOnly
                            // onChange={(e) => setvolume(e.target.value)}
                            size='small'
                        />
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default Claim