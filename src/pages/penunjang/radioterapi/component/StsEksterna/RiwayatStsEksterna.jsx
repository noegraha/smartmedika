import { Button, Card, Modal, Space, Table } from 'antd'
import React, { useContext, useState } from 'react'
import { RadioterapiContext } from '../../context/RadioterapiContext'
import PrintRptStsEksterna from '../report/PrintRptStsEksterna'
import { EditOutlined, FileSearchOutlined } from '@ant-design/icons'
import { PasienContext } from '../../../../rawatjalan/context/PasienContext'
import DetailRiwayatStsEksterna from './DetailRiwayatStsEksterna'

const RiwayatStsEksterna = () => {
    const {
        detailPasien,
    } = useContext(PasienContext)

    const {
        pasienId,
        noReg, setnoReg,
        listRiwayat, setlistRiwayat,
        settabKeyStsEks,
        getRiwayatRd,
        getDataPasiendanStatusRd,
        ReportStsEksterna,
        spReportStsEks,
    } = useContext(RadioterapiContext)

    const [mdCetakStatusEksterna, setmdCetakStatusEksterna] = useState('')

    const columnsa = [
        {
            title: 'No Registrasi',
            dataIndex: 'NOREG',
            key: 'NOREG',
            align: 'center',
            width: '90px',
        },
        {
            title: 'Tgl Masuk RS',
            dataIndex: 'TANGGALMASUK',
            key: 'TANGGALMASUK',
            align: 'center',
            width: '90px',
        },
        {
            title: 'Data Klinis',
            dataIndex: 'DATA_KLINIS',
            key: 'DATA_KLINIS',
            align: 'center',
            width: '200px',
            render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
        // {
        //     title: 'Radiografer',
        //     dataIndex: 'RADIOGRAFER',
        //     key: 'RADIOGRAFER',
        //     align: 'center',
        //     width: '150px',
        // },
        {
            title: 'Penyinaran',
            dataIndex: 'PENYINARAN',
            key: 'PENYINARAN',
            align: 'center',
            width: '150px',
        },
        {
            title: 'Dokter',
            dataIndex: 'NAMADOKTER',
            key: 'NAMADOKTER',
            align: 'center',
            width: '150px',
        },
        {
            title: 'Catatan',
            dataIndex: 'CATATAN',
            key: 'CATATAN',
            align: 'center',
            width: '200px',
            render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
        },
        {
            title: "Aksi",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 50,
            render: (text, record, index) => (
                <Space>
                    <Button
                        onClick={() => klikEdit(record.NOREG, pasienId)}
                        // type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        style={{ width: '25px' }}
                    />
                    <Button
                        onClick={() => klikRowRiwayat(record.NOREG)}
                        type="primary"
                        icon={<FileSearchOutlined />}
                        size="small"
                        style={{ width: '25px' }}
                    />
                </Space>
            ),
        },
    ];

    const klikLihatRiwayat = () => {
        getRiwayatRd(pasienId)
    }

    const klikRowRiwayat = (noreg) => {
        if (noReg.length === 0) {
            Modal.warning({
                title: 'Peringatan!',
                content: 'Pasien belum dipilih',
            });
        }
        else {
            setmdCetakStatusEksterna(true)
            ReportStsEksterna(noreg)
        }
    }

    const klikEdit = (noreg, pasienId) => {
        setnoReg(noreg)
        getDataPasiendanStatusRd(noreg)
        // sessionStorage.setItem("norm", pasienId);
        detailPasien(noreg)
        settabKeyStsEks('1')
    }


    return (
        <div style={{ padding: '10px' }}>
            <Space style={{ marginBottom: '5px' }}>
                <Button
                    onClick={() => klikLihatRiwayat()}
                    type='primary'
                    size='small'
                    style={{ width: '150px' }}>
                    Lihat Riwayat
                </Button>
                {/* <Button
            onClick={() => klikKosongkanForm()}
            type='primary'
            size='small'
            style={{ width: '150px' }}>
            Kosongkan Form
          </Button> */}
            </Space>

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
                dataSource={listRiwayat}
                size='small'
                bordered
                pagination={false} />

            {/* <Modal
                visible={mdCetakStatusEksterna}
                onCancel={() => setmdCetakStatusEksterna(false)}
                footer={null}
                closable={false}
                width={780}
                style={{ top: 20 }}>
                <Card loading={spReportStsEks}>
                    <PrintRptStsEksterna />
                </Card>
            </Modal> */}

            <Modal
                visible={mdCetakStatusEksterna}
                onCancel={() => setmdCetakStatusEksterna(false)}
                footer={null}
                closable={false}
                centered
                width={780}
                style={{ top: 20 }}>
                <DetailRiwayatStsEksterna />
            </Modal>
        </div>
    )
}

export default RiwayatStsEksterna