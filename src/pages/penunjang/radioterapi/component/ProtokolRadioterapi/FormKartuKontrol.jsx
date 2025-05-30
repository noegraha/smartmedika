import { Table } from 'antd'
import dayjs from 'dayjs';
import React, { useContext } from 'react'
import { RadioterapiContext } from '../../context/RadioterapiContext';

const FormKartuKontrol = () => {
    const {
        listRiwPenyinaran,
        spRiwayatPenyinaran,
    } = useContext(RadioterapiContext);

    const columnsa = [
        {
            title: 'No Registrasi',
            dataIndex: 'RegistrasiId',
            key: 'RegistrasiId',
            align: 'center',
            width: '90px',
        },
        {
            title: 'No Pasien',
            dataIndex: 'PasienId',
            key: 'PasienId',
            align: 'center',
            width: '50px',
        },
        {
            title: 'Hari',
            dataIndex: 'Hari',
            key: 'Hari',
            align: 'center',
            width: '50px',
        },
        {
            title: 'Tanggal',
            dataIndex: 'Tanggal',
            key: 'Tanggal',
            align: 'center',
            width: '50px',
            render: (record) => <div>{dayjs(record).format("DD/MM/YYYY")}</div>,
            ellipsis: true,
        },
        {
            title: 'Penyinaran ke-',
            dataIndex: 'IdMinggu',
            key: 'IdMinggu',
            align: 'center',
            width: '35px',
        },
        {
            title: 'Waktu',
            dataIndex: 'Waktu',
            key: 'Waktu',
            align: 'center',
            width: '40px',
        },
        {
            title: 'Dosis',
            dataIndex: 'Dosis',
            key: 'Dosis',
            align: 'center',
            width: '40px',
        },
        {
            title: 'Dosis Total',
            dataIndex: 'DosisTotal',
            key: 'DosisTotal',
            align: 'center',
            width: '40px',
        },
        {
            title: 'Dokter',
            dataIndex: 'NamaDokter',
            key: 'NamaDokter',
            align: 'center',
            width: '90px',
            ellipsis: true,
        },
        {
            title: 'Petugas',
            dataIndex: 'NamaPetugas',
            key: 'NamaPetugas',
            align: 'center',
            width: '90px',
            ellipsis: true,
        },
        {
            title: 'Lapangan',
            dataIndex: 'Lapangan',
            key: 'Lapangan',
            align: 'center',
            width: '50px',
        },
        {
            title: 'Jml Lapangan',
            dataIndex: 'JmlLapangan',
            key: 'JmlLapangan',
            align: 'center',
            width: '50px',
        },
        {
            title: 'Desk Lapangan',
            dataIndex: 'DeskripsiLapangan',
            key: 'DeskripsiLapangan',
            align: 'center',
            width: '90px',
            ellipsis: true,
        },
        {
            title: 'No Urut',
            dataIndex: 'NoUrut',
            key: 'NoUrut',
            align: 'center',
            width: '30px',
        },
        {
            title: 'Status Eksterna',
            dataIndex: 'NoStsEksterna',
            key: 'NoStsEksterna',
            align: 'center',
            width: '70px',
        },
        {
            title: 'User',
            dataIndex: 'UserEntry',
            key: 'UserEntry',
            align: 'center',
            width: '90px',
            ellipsis: true,
        },
        // {
        //     title: "Aksi",
        //     key: "operation",
        //     fixed: "right",
        //     align: "center",
        //     width: 50,
        //     render: (text, record, index) => (
        //         <Space size="small">
        //             <Button
        //                 onClick={() => klikEdit(index)}
        //                 type="primary"
        //                 icon={<EditOutlined />}
        //                 // disabled={record.StsDatang}
        //                 // disabled
        //                 size="small"
        //             />
        //         </Space>
        //     ),
        // },
    ];

    return (
        <div>
            <Table
                // onRow={(record) => {
                //     return {
                //         onClick: () => {
                //             klikRowRiwayat(record.NOREG);
                //             // setnoReg(record.NOREG);
                //             // getDataPasiendanStatusRd(record.NOREG);
                //         },
                //     };
                // }}
                columns={columnsa}
                dataSource={listRiwPenyinaran}
                loading={spRiwayatPenyinaran}
                size='small'
                scroll={{
                    x: 1500,
                    y: 300,
                }}
                bordered
                pagination={false}
                style={{ marginTop: '5px' }} />
        </div>
    )
}

export default FormKartuKontrol