import { Button, Card, Table } from 'antd'
import React, { useContext } from 'react'
import { KemoterapiContext } from '../context/KemoterapiContext';
import dayjs from 'dayjs';
import { RedoOutlined } from '@ant-design/icons';

const FormListTanpaOrder = () => {
    const {
        listNoOrder,
        tglOrder,
        unitId,
        // sp
        spTrxNoOrder,
        // func
        getDataTidakOrderAll,
    } = useContext(KemoterapiContext)

    const columns = [
        {
            title: 'Tgl.Pmr',
            dataIndex: 'TGLPMR',
            key: 'TGLPMR',
            render: (text) => <span>{dayjs(text).format('DD-MM-YYYY HH:mm')}</span>,
        },
        {
            title: 'No.Registrasi',
            dataIndex: 'RegistrasiId',
            key: 'RegistrasiId',
        },
        {
            title: 'No.RM',
            dataIndex: 'PasienId',
            key: 'PasienId',
        },
        {
            title: 'Nama',
            dataIndex: 'Nama',
            key: 'Nama',
        },
        {
            title: 'Alamat',
            dataIndex: 'Alamat',
            key: 'Alamat',
        },
        {
            title: 'Asal Ruang',
            dataIndex: 'AsalRuang',
            key: 'AsalRuang',
        },
        {
            title: 'User Input',
            dataIndex: 'USLOGNM',
            key: 'USLOGNM',
        },
    ];

    return (
        <div>
            <Card>
                <Button
                    type='primary'
                    icon={<RedoOutlined />}
                    onClick={() => getDataTidakOrderAll(dayjs(tglOrder).format('YYYY-MM-DD'), unitId)}
                    size='small'
                    style={{ marginBottom: '3px' }} >
                    Refresh List
                </Button>
                <Table
                    columns={columns}
                    dataSource={listNoOrder}
                    loading={spTrxNoOrder}
                    size='small'
                    bordered
                    pagination={false}
                />
            </Card>
        </div>
    )
}

export default FormListTanpaOrder