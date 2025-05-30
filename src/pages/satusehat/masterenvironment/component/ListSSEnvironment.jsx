import { EditOutlined, FileSearchOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Modal, Row, Table } from 'antd'
import React from 'react'
import FormTambahEnv from './FormTambahEnv';
import { useContext } from 'react';
import { SatuSehatEnvironmentContext } from '../context/SatuSehatEnvironmentContext';
import { useState } from 'react';
import FormDetailEnv from './FormDetailEnv';

const ListSSEnvironment = () => {
    const {
        listEnv,
        setdetailEnv,
        setidEnv,
        setenv,
        setauth_url,
        setbase_url,
        setcons_url,
        setclient_id,
        setclient_sc,
        setorg_id,
        // modal
        mdTambah, setmdTambah,
        // func
        rststatetambah,
        // sp
        spTbEnv,
    } = useContext(SatuSehatEnvironmentContext)

    const [mdDetailEnv, setmdDetailEnv] = useState(false)

    const columns = [
        {
            title: 'Environment',
            dataIndex: 'Environment',
            key: 'Environment',
        },
        {
            title: 'Auth Url',
            dataIndex: 'Auth_url',
            key: 'Auth_url',
        },
        {
            title: 'Base Url',
            dataIndex: 'Base_url',
            key: 'Base_url',
        },
        {
            title: 'Consent Url',
            dataIndex: 'Consent_url',
            key: 'Consent_url',
        },
        // {
        //     title: 'Client Id',
        //     dataIndex: 'Client_id',
        //     key: 'Client_id',
        // },
        // {
        //     title: 'Client Secret',
        //     dataIndex: 'Client_secret',
        //     key: 'Client_secret',
        // },
        {
            title: 'Org Id',
            dataIndex: 'Org_id',
            key: 'Org_id',
        },
        // {
        //     title: 'Token',
        //     dataIndex: 'Token',
        //     key: 'Token',
        // },
        {
            title: 'Expired',
            dataIndex: 'Expired',
            key: 'Expired',
        },
        {
            title: 'DateEntry',
            dataIndex: 'DateEntry',
            key: 'DateEntry',
        },
        {
            title: 'Aksi',
            key: 'operation',
            fixed: 'right',
            width: 80,
            render: (text, record, index) =>
                <div>
                    <Button
                        type='primary'
                        onClick={() => klikDetail(record)}
                        icon={<FileSearchOutlined />}
                        size='small'
                        style={{ width: '25px' }}
                    />
                    <Button
                        type='primary'
                        onClick={() => klikEdit(record)}
                        icon={<EditOutlined />}
                        size='small'
                        style={{ width: '25px', marginLeft: '4px' }}
                    />
                </div>
        },
    ];

    const klikTambah = () => {
        rststatetambah()
        setmdTambah(true)
    }

    const klikDetail = (data) => {
        setdetailEnv(data)
        setmdDetailEnv(true)
    }

    const klikEdit = (data) => {
        setidEnv(data.Id)
        setenv(data.Environment)
        setauth_url(data.Auth_url)
        setbase_url(data.Base_url)
        setcons_url(data.Consent_url)
        setclient_id(data.Client_id)
        setclient_sc(data.Client_secret)
        setorg_id(data.Org_id)
        setmdTambah(true)
    }

    return (
        <div>
            <Card
                title='Master Environtment SatuSehat'
                headStyle={{ backgroundColor: '#36cfc9' }}>
                <Row style={{ marginBottom: '5px' }}>
                    <Col>
                        <Button
                            type='primary'
                            onClick={() => klikTambah()}
                            icon={<PlusOutlined />}
                            style={{ width: '150px' }}>
                            Tambah
                        </Button>
                    </Col>
                </Row>
                <Table
                    bordered
                    loading={spTbEnv}
                    columns={columns}
                    dataSource={listEnv}
                    size='small'
                    pagination={false}
                />
            </Card>

            <Modal
                visible={mdTambah}
                width={700}
                footer={null}
                closable={false}
                style={{ top: 150 }}
            >
                <FormTambahEnv />
            </Modal>

            <Modal
                visible={mdDetailEnv}
                width={700}
                footer={null}
                closable={false}
                onCancel={() => setmdDetailEnv(false)}
                style={{ top: 150 }}
            >
                <FormDetailEnv />
            </Modal>
        </div>
    )
}

export default ListSSEnvironment