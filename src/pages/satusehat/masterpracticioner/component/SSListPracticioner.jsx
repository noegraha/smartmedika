import { EditOutlined, RedoOutlined, SyncOutlined } from '@ant-design/icons';
import { Button, Card, Col, Input, Modal, Row, Select, Space, Table, Tooltip } from 'antd'
import React, { useContext } from 'react'
import { SatuSehatPracticionerContext } from '../context/SatuSehatPracticionerContext';
import SSEditPracticioner from './SSEditPracticioner';

const { Option } = Select;

const SSListPracticioner = () => {
    const {
        ktgBy, setktgBy,
        listKtg,
        ktg, setKtg,
        settglLahir,
        listDokter,
        // func
        getListKtg,
        getListDokter,
        getDetailDokter,
        getListDokterV2,
        // md
        mdEdit, setmdEdit,
    } = useContext(SatuSehatPracticionerContext)

    const columns = [
        {
            title: 'Id Dokter',
            dataIndex: 'DokterId',
            key: 'DokterId',
            align: 'center',
            ellipsis: true,
            width: 75,
        },
        {
            title: 'Nama Dokter',
            dataIndex: 'NamaDokter',
            key: 'NamaDokter',
            ellipsis: true,
        },
        {
            title: 'NIK',
            dataIndex: 'NIK',
            key: 'NIK',
            align: 'center',
            ellipsis: true,
            width: 155,
        },
        {
            title: 'IHS Number',
            dataIndex: 'IhsNumber',
            key: 'IhsNumber',
            align: 'center',
            ellipsis: true,
            width: 155,
        },
        {
            title: 'Nama Spesialis',
            dataIndex: 'NMSPESIAL',
            key: 'NMSPESIAL',
            ellipsis: true,
        },
        {
            title: 'Ruang',
            dataIndex: 'NamaRuang',
            key: 'NamaRuang',
            ellipsis: true,
        },
        {
            title: 'Aksi',
            key: 'operation',
            fixed: 'right',
            width: 40,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        onClick={() => klikEdit(record.DokterId)}
                        icon={<EditOutlined />}
                        size='small'
                        style={{ width: '25px' }}
                    />
                    {/* <Button
                        type='primary'
                        onClick={() => klikSimpanDb(record)}
                        icon={<SaveOutlined />}
                        size='small'
                        style={{ width: '25px', marginLeft: '2px' }}
                    /> */}
                </div>
        },
    ];

    const options = [
        {
            value: '1',
            label: 'Ruang Bagian',
        },
        {
            value: '2',
            label: 'Spesialis',
        },
    ];

    const data = [];

    for (let i = 1; i <= 100; i++) {
        const dokter = {
            DokterId: i,
            NamaDokter: `Dokter ${i}`,
            Nik: '9271060312000001',
            IhsNumber: '100000030009'
        };
        data.push(dokter);
    }

    const onChangeBy = (data) => {
        setktgBy(data)
        setKtg(null)
        getListKtg(data)
    }

    const onChangeKtg = (data) => {
        setKtg(data)
        getListDokter(ktgBy, data)
    }

    const klikEdit = (data) => {
        setmdEdit(true)
        settglLahir()
        getDetailDokter(data)
    }

    const klikRefresh = () => {
        getListDokterV2()
    }

    return (
        <>
            <Card
                title='Master Practicioner'
                headStyle={{ backgroundColor: '#36cfc9' }}>
                <Row style={{ marginBottom: '5px' }}>
                    <Button
                        onClick={() => klikRefresh()}
                        type='primary'
                        icon={<RedoOutlined />}>
                        Refresh List
                    </Button>
                    {/* <Col span={4}>
                        Daftar Dokter berdasarkan :
                    </Col>
                    <Col span={20}>
                        <Space size='small'>
                            <Select
                                size='small'
                                defaultValue={ktgBy}
                                onChange={(e) => onChangeBy(e)}
                                options={options}
                                style={{ width: '150px' }}
                            />
                            <Select
                                value={ktg}
                                onChange={(e) => onChangeKtg(e)}
                                // onFocus={() => getLoadDokter('1,2', '9404')}
                                size='small'
                                style={{ width: '300px' }}>
                                {listKtg.map((item, index) => (
                                    <Option key={index} value={ktgBy === '1' ? item.BagianId : item.SpesialisId}>{item.Deskripsi}</Option>
                                ))}
                            </Select>
                        </Space>
                    </Col> */}
                </Row>

                <Table
                    bordered
                    // loading={spGetOrganization}
                    columns={columns}
                    dataSource={listDokter}
                    size='small'
                    pagination={false}
                />
            </Card>

            <Modal
                visible={mdEdit}
                width={700}
                footer={null}
                closable={false}
                style={{ top: 150 }}
            >
                <SSEditPracticioner />
            </Modal>
        </>
    )
}

export default SSListPracticioner