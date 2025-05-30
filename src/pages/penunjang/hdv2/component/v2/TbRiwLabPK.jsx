import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import dayjs from 'dayjs';

const TbRiwLabPK = ({ results, isLoading }) => {
    const [expandedRowKeys, setExpandedRowKeys] = useState([]);

    useEffect(() => {
        // Mengambil semua LabNomor sebagai kunci untuk baris yang akan diperluas
        const allLabNomors = results.map((result) => result.LabNomor);
        setExpandedRowKeys(allLabNomors);
    }, [results]);

    // Menyusun data untuk tabel
    const groupedResults = {};
    results.forEach((result) => {
        if (!groupedResults[result.LabNomor]) {
            groupedResults[result.LabNomor] = [];
        }
        groupedResults[result.LabNomor].push(result);
    });

    // Membuat kolom untuk tabel
    const columns = [
        {
            title: 'Riwayat Hasil Laboratorium PK',
            dataIndex: 'key',
            key: 'key',
            render: (text) => <div><p style={{ marginBottom: '0px' }}><strong><u>Lab.Nomor : {text}</u></strong></p></div>,
        },
        // {
        //     title: 'LabNama',
        //     dataIndex: 'LabNama',
        //     key: 'LabNama',
        // },
        // {
        //     title: 'LabHasil',
        //     dataIndex: 'LabHasil',
        //     key: 'LabHasil',
        // },
        // {
        //     title: 'Interpretasi',
        //     dataIndex: 'Interpretasi',
        //     key: 'Interpretasi',
        // },
        // {
        //     title: 'LabSatuan',
        //     dataIndex: 'LabSatuan',
        //     key: 'LabSatuan',
        // },
        // {
        //     title: 'LabHargaNorm',
        //     dataIndex: 'LabHargaNorm',
        //     key: 'LabHargaNorm',
        // },
        // {
        //     title: 'UserDate',
        //     dataIndex: 'UserDate',
        //     key: 'UserDate',
        // },
    ];

    // Membuat kolom untuk tabel
    const columnsa = [
        // {
        //     title: 'LabNomor',
        //     dataIndex: 'LabNomor',
        //     key: 'LabNomor',
        // },
        {
            title: 'PEMERIKSAAN',
            dataIndex: 'LabNama',
            key: 'LabNama',
            align: "center",
        },
        {
            title: 'HASIL',
            dataIndex: 'LabHasil',
            key: 'LabHasil',
            align: "center",
        },
        {
            title: 'INTERPRETASI',
            dataIndex: 'Interpretasi',
            key: 'Interpretasi',
            align: "center",
        },
        {
            title: 'SATUAN',
            dataIndex: 'LabSatuan',
            key: 'LabSatuan',
            align: "center",
        },
        {
            title: 'NILAI NORMAL',
            dataIndex: 'LabHargaNorm',
            key: 'LabHargaNorm',
            align: "center",
        },
        {
            title: 'TGL.PEMERIKSAAN',
            dataIndex: 'UserDate',
            key: 'UserDate',
            align: "center",
            render: (text) => <div>{dayjs(text).format('DD-MM-YYYY HH:mm')}</div>,
        },
    ];

    // Membuat data untuk tabel
    const tableData = Object.keys(groupedResults).map((LabNomor) => ({
        key: LabNomor,
        details: groupedResults[LabNomor], // Menggunakan array rincian
    }));

    const sortedData = tableData.sort((a, b) => {
        // Menggunakan objek pertama dari array details untuk perbandingan UserDate
        const dateA = new Date(a.details[0].UserDate);
        const dateB = new Date(b.details[0].UserDate);

        // Jika UserDate sama, maka menggunakan LabNama untuk perbandingan
        if (dateA - dateB === 0) {
            const labNameA = a.details[0].LabNama;
            const labNameB = b.details[0].LabNama;

            return labNameA.localeCompare(labNameB);
        }

        // Mengurutkan berdasarkan UserDate
        return dateB - dateA;
    });

    const handleRowClick = () => {
        console.log('Clicked row:', sortedData);
        // Tambahkan logika lain yang diperlukan saat baris diklik
    };

    return (
        <Table
            columns={columns}
            loading={isLoading}
            expandable={{
                expandedRowRender: (record) => (
                    <div>
                        {/* <p style={{ marginBottom: '0px' }}><strong><u>Lab.Nomor : {record.key}</u></strong></p> */}
                        <Table
                            columns={columnsa}
                            dataSource={record.details}
                            pagination={false}
                        />
                    </div>
                ),
                rowExpandable: () => true, // Mengaktifkan semua baris expandable
                expandedRowKeys, // Menggunakan state untuk mengontrol baris yang akan diperluas
                onExpand: (expanded, record) => {
                    // Menangani peristiwa ekspansi
                    if (expanded) {
                        setExpandedRowKeys([...expandedRowKeys, record.key]);
                    } else {
                        setExpandedRowKeys(expandedRowKeys.filter((key) => key !== record.key));
                    }
                },
            }}
            dataSource={sortedData}
        // onRow={(record) => ({
        //     onClick: () => handleRowClick(),
        // })}
        />
    );
};

export default TbRiwLabPK;