import React from 'react'
import { Card, Table, Space, Button } from 'antd'

const FormKelompokPenunjangDokter = () => {

    const columns = [
        {
            title: 'Kelompok Id',
            dataIndex: 'kelompokId',
            key: 'kelompokId',
            align: 'center',
            width: 100,
        },
        {
            title: 'Dokter Id',
            dataIndex: 'dokterId',
            key: 'dokterId',
            align: 'center',
            width: 100,
        },
        {
            title: 'Nama Dokter',
            dataIndex: 'namaDokter',
            key: 'namaDokter',
            align: 'center',
            render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
    ];

    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            kelompokId: 'PNJ001',
            dokterId: 'D001',
            namaDokter: `Nama Dokter ${i + 1}`,
        });
    }

    return (
        <div>
            <Card title='Kelompok Penunjang Pemeriksa'>
                <Table
                    columns={columns}
                    dataSource={data}
                    size='small'
                    bordered
                    pagination={false}
                    scroll={{ x: 100, y: 633 }}
                />
                <Space style={{ marginTop: '5px' }}>
                    <Button type="primary" size='small' style={{ width: '70px' }}>Tambah</Button>
                    {/* <Button type='text' size='small' style={{ width: '70px', backgroundColor: '#95de64', color: 'white' }}>Ubah</Button> */}
                    <Button type="primary" danger size='small' style={{ width: '70px' }}>Hapus</Button>
                </Space>
            </Card>
        </div>
    )
}

export default FormKelompokPenunjangDokter
