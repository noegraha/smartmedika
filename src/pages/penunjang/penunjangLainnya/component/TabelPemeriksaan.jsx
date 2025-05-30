import { Table } from 'antd'
import React from 'react'

const columns = [
    {
        title: 'Pemeriksaan',
        dataIndex: 'pemeriksaan',
        key: 'pemeriksaan'
    },
    {
        title: 'Tanggal',
        dataIndex: 'tanggal',
        key: 'tanggal',
    },
    {
        title: 'Pelaksana',
        dataIndex: 'pelaksana',
        key: 'pelaksana',
    }
];

const data = [
    {
        key: '1',
        pemeriksaan: 'Balance Cairan',
        tanggal: '28/09/2021',
        pelaksana: 'NAMA DOKTER SPESIALIS PELAKSANANYA'
    },
    {
        key: '2',
        pemeriksaan: 'Elektro Kardiogram (EKG)',
        tanggal: '28/09/2021',
        pelaksana: 'NAMA DOKTER SPESIALIS PELAKSANANYA'
    },
    {
        key: '3',
        pemeriksaan: 'Elektro Kardiogram (EKG)',
        tanggal: '28/09/2021',
        pelaksana: 'NAMA DOKTER SPESIALIS PELAKSANANYA'
    },
];

const TabelPemeriksaan = () => {
    return (
        <div>
            <Table
                columns={columns}
                dataSource={data}
                pagination={false}
                bordered
                scroll={{ x: 500 }}
                size='small' />
        </div>
    )
}

export default TabelPemeriksaan
