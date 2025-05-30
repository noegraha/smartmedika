import { Button, Table } from 'antd'
import dayjs from 'dayjs'
import React, { useContext } from 'react'
import { KemoterapiContext } from '../context/KemoterapiContext'
import { FileSearchOutlined } from '@ant-design/icons'
import RptRiwKemoterapi from './RptRiwKemoterapi'

const RiwayatKemoterapi = () => {
    const {
        listRiwKemoterapi,

        getRptKemoterapi,
        getDtProtokol,

        spTbRiwKemo,

        mdDtKemoterapi, setmdDtKemoterapi,
    } = useContext(KemoterapiContext);

    const columns = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
            align: 'center',
            width: 50,
        },
        {
            title: 'Reg. Id',
            dataIndex: 'RegId',
            key: 'RegId',
            align: 'center',
            width: 90,
        },
        {
            title: 'Tgl. Pmr',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            align: 'center',
            width: 90,
            render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
        },
        {
            title: 'Ruang',
            dataIndex: 'namaRuang',
            key: 'namaRuang',
        },
        {
            title: 'Siklus Utama',
            dataIndex: 'SiklusUtama',
            key: 'SiklusUtama',
            align: 'center',
            width: 50,
        },
        {
            title: 'Total Siklus',
            dataIndex: 'TotalSiklus',
            key: 'TotalSiklus',
            align: 'center',
            width: 50,
        },
        {
            title: 'Petugas',
            dataIndex: 'namaPerawat',
            key: 'namaPerawat',
        },
        {
            title: "Aksi",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 90,
            render: (text, record, index) => (
                <Button
                    onClick={() => klikRpt(record)}
                    type="primary"
                    icon={<FileSearchOutlined />}
                    // disabled={record.StsDatang}
                    // disabled
                    size="small"
                    style={{ width: '30px' }}
                />
            ),
        },
    ];

    const klikRpt = (e) => {
        getRptKemoterapi(e.RegId, e.NoOrder);
        getDtProtokol(e.RegId);
        setmdDtKemoterapi(true);
    }

    return (
        <div>
            <Table
                columns={columns}
                dataSource={listRiwKemoterapi}
                size='small'
                loading={spTbRiwKemo}
                // scroll={{
                //     y: 310,  // Sesuaikan ini jika diperlukan, atau hilangkan jika ingin otomatis
                // }}
                bordered
                // pagination={false}
                style={{ width: '100%' }}
            />

            <RptRiwKemoterapi />
        </div>
    )
}

export default RiwayatKemoterapi