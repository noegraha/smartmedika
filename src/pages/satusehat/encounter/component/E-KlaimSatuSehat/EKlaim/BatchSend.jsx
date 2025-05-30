import { Button, Col, Divider, Input, Row, Space, Spin, Table, Typography } from 'antd';
import React, { useContext, useState } from 'react'
import { SatuSehatEncounterContext } from '../../../context/SatuSehatEncounterContext';
import { FileSearchOutlined, SendOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TextArea } = Input;
const { Text } = Typography;

const BatchSend = () => {
    const {
        getListBatchNo,
        getEklaim01,
        getEklaim02,
        postEklaim,
        spCvg,
    } = useContext(SatuSehatEncounterContext);

    const [listTb, setlistTb] = useState([]);
    const [dtBatch, setdtBatch] = useState();
    const [dtKlaim, setdtKlaim] = useState();

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
            title: 'No. Batch',
            dataIndex: 'No_Batch_Eklaim',
            key: 'No_Batch_Eklaim',
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
                            onClick={() => klikKirim(record.No_Batch_Eklaim)}
                            icon={<SendOutlined />}
                            size='small'
                            style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                        >
                            Kirim
                        </Button>
                        <Button
                            type='default'
                            onClick={() => getBatchDetail(record.No_Batch_Eklaim)}
                            icon={<FileSearchOutlined />}
                            size='small'
                        // style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                        >
                            Detail Klaim
                        </Button>

                    </Space>
                </div>
        },
    ];

    const colTbDetailKlaim = [
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
            title: 'No. Kartu',
            dataIndex: 'no_kartu',
            key: 'no_kartu',
        },
        {
            title: 'Nama',
            dataIndex: 'person_nm',
            key: 'person_nm',
        },
        {
            title: 'No. RM',
            dataIndex: 'patient_mrn',
            key: 'patient_mrn',
        },
        {
            title: 'No. SEP',
            dataIndex: 'no_sep',
            key: 'no_sep',
        },
        {
            title: 'Tgl. Pelayanan',
            dataIndex: 'discharge_dttm',
            key: 'discharge_dttm',
        },
        {
            title: 'Total',
            dataIndex: 'total_klaim',
            key: 'total_klaim',
        },
        {
            title: 'Aksi',
            dataIndex: 'aksi',
            key: 'aksi',
            align: 'center',
            width: 200,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='default'
                        onClick={() => getKlaimDetail(record.no_sep)}
                        icon={<FileSearchOutlined />}
                        size='small'
                    // style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                    >
                        Detail Klaim
                    </Button>
                </div>
        },
    ];

    const klikGetData = async () => {
        let data = await getListBatchNo();
        setlistTb(data.result);
    };

    const klikKirim = (batchNo) => {
        let data = {
            metadata: {
                method: "claim_batch_send"
            },
            data: {
                claim_batch_id: batchNo
            }
        };

        postEklaim(data, 'xxx', '999');
    };

    const getBatchDetail = async (batchNo) => {
        let data = {
            metadata: {
                method: "claim_batch_get_detail"
            },
            data: {
                claim_batch_id: batchNo
            }
        };

        let data1 = await getEklaim01(data);
        // console.log("getBatchDetail : ", data1);
        setdtBatch(data1);
    }

    const getKlaimDetail = async (noSep) => {
        let data = {
            metadata: {
                method: "get_claim_data"
            },
            data: {
                nomor_sep: noSep
            }
        };

        let data1 = await getEklaim02(data);
        let additionalMessage = JSON.stringify(data1, null, 2);
        console.log("getBatchDetail : ", data1);
        setdtKlaim(additionalMessage);
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
                            Kirim Batch
                        </Divider>
                    </Col>
                    <Col span={2}>
                        <Button
                            onClick={() => {
                                klikGetData();
                            }}
                            style={{ float: 'right' }}
                        >
                            Ambil Data
                        </Button>
                    </Col>
                </Row>

                <Table
                    bordered
                    // loading={spCvg}
                    columns={colTbResource}
                    dataSource={listTb}
                    pagination={false}
                    size='small'
                    style={{ marginBottom: '5px' }}
                />

                <Divider
                    variant="dotted"
                    orientation="left"
                    style={{
                        borderColor: '#7cb305',
                    }}
                >
                    Detail Batch
                </Divider>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Id Batch Claim :</span>
                    </Col>
                    <Col span={21}>
                        <span>{dtBatch ? dtBatch.claim_batch_id : "-"}</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Bulan Layanan :</span>
                    </Col>
                    <Col span={21}>
                        <span>{dtBatch ? dtBatch.bulan_layan : "-"}</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Jenis Perawatan :</span>
                    </Col>
                    <Col span={21}>
                        <span>{dtBatch ?
                            dtBatch.admission_type === "outpatient" ? "Rawat Jalan" : "Rawat Inap"
                            : "-"}</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Tgl. Batch :</span>
                    </Col>
                    <Col span={21}>
                        <span>{dtBatch ? dayjs(dtBatch.batch_dt).format('DD-MM-YYYY') : "-"}</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Status :</span>
                    </Col>
                    <Col span={21}>
                        <span>{dtBatch ?
                            dtBatch.sent_status_cd === "sent" ? "Terkirim" : "Belum Terkirim"
                            : "-"}</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        <span>Jml. Klaim :</span>
                    </Col>
                    <Col span={21}>
                        <span>{dtBatch ? dtBatch.claim_count : "-"}</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={3}>
                        <span>Total Klaim :</span>
                    </Col>
                    <Col span={21}>
                        <span>{dtBatch ? dtBatch.claim_value : "-"}</span>
                    </Col>
                </Row>

                <Table
                    bordered
                    // loading={spCvg}
                    columns={colTbDetailKlaim}
                    dataSource={dtBatch ? dtBatch.claim_detail : []}
                    pagination={false}
                    size='small'
                    style={{ marginBottom: '5px' }}
                />

                <Row style={{ marginBottom: '2px' }}>
                    <Col>
                        <Text strong>Detail Klaim :</Text>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={24}>
                        <TextArea rows={5} value={dtKlaim} readOnly />
                    </Col>
                </Row>
            </Spin>
        </div>
    )
}

export default BatchSend