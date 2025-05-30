import React from 'react'
import { Card, Table, Space, Button } from 'antd'

const FormKelompokPenunjangRuang = () => {

    const columns = [
        {
            title: 'Kelompok Id',
            dataIndex: 'kelompokId',
            key: 'kelompokId',
            align: 'center',
            width: 100,
        },
        {
            title: 'Ruang Id',
            dataIndex: 'ruangId',
            key: 'ruangId',
            align: 'center',
            width: 100,
        },
        {
            title: 'Deskripsi Ruang',
            dataIndex: 'deskRuang',
            key: 'deskRuang',
            align: 'center',
            render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
    ];

    const data = [];
    for (let i = 0; i < 5; i++) {
        data.push({
            kelompokId: 'PNJ001',
            ruangId: '9499',
            deskRuang: `Ruangan Penunjang Medis ${i + 1}`,
        });
    }

    return (
        <div>
            <Card title='Kelompok Penunjang Ruang' style={{ width: '99%' }}>
                <Table
                    columns={columns}
                    dataSource={data}
                    size='small'
                    bordered
                    pagination={false}
                    scroll={{ x: 100, y: 210 }} />
                <Space style={{ marginTop: '5px' }}>
                    <Button type="primary" size='small' style={{ width: '70px' }}>Tambah</Button>
                    {/* <Button type='text' size='small' style={{ width: '70px', backgroundColor: '#95de64', color: 'white' }}>Ubah</Button> */}
                    <Button type="primary" danger size='small' style={{ width: '70px' }}>Hapus</Button>
                </Space>
            </Card>
        </div>
    )
}

export default FormKelompokPenunjangRuang
