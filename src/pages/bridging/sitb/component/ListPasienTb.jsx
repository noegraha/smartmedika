import { Button, Col, DatePicker, Divider, Modal, Row, Space, Table } from 'antd'
import React from 'react'
import {
    FileSearchOutlined,
    DeleteOutlined,
} from "@ant-design/icons";
import { useContext } from 'react';
import { BridgingSITBContext } from '../context/BridgingSITBContext';
import dayjs from 'dayjs';
import { useState } from 'react';
import DetailPasien from './DetailPasien';

const ListPasienTb = () => {
    const {
        // state
        blnPeriode, setblnPeriode,
        listPasien,
        setnama,
        setnoreg,
        setnoRm,
        setalamat,
        seticdx,
        // sp
        spListPasien, setspListPasien,
        // md
        mdDetailPx, setmdDetailPx,
        // func
        getListPasien,
        getDetailPasien,
    } = useContext(BridgingSITBContext)

    const columns = [
        {
            title: 'No',
            dataIndex: 'NoUrut',
            key: 'NoUrut',
            width: 35,
        },
        {
            title: 'RegistrasiId',
            dataIndex: 'RegistrasiId',
            key: 'RegistrasiId',
            // width: 200,
        },
        {
            title: 'No RM',
            dataIndex: 'PasienId',
            key: 'PasienId',
        },
        {
            title: 'Nama',
            dataIndex: 'Nama',
            key: 'Nama',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Alamat',
            dataIndex: 'Alamat',
            key: 'Alamat',
            width: 200,
            ellipsis: true,
        },
        {
            title: 'Kasus',
            dataIndex: 'KasusIcd',
            key: 'KasusIcd',
        },
        {
            title: 'ICD 10',
            dataIndex: 'KodeIcd10',
            key: 'KodeIcd10',
        },
        {
            title: 'Jenis Dx',
            dataIndex: 'JenisDiagnosisDeskripsi',
            key: 'JenisDiagnosisDeskripsi',
        },
        {
            title: 'Nama Ruang',
            dataIndex: 'NamaRuang',
            key: 'NamaRuang',
            width: 200,
            ellipsis: true,
        },
        {
            title: "Aksi",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 50,
            render: (text, record, index) => (
                <Button
                    onClick={() => klikDetail(record)}
                    type="primary"
                    icon={<FileSearchOutlined />}
                    // disabled={record.StsDatang}
                    // disabled
                    size="small"
                    style={{ width: '30px' }}
                />
                // <Space size="small">
                //     <Button
                //         type="primary"
                //         danger
                //         // onClick={() => klikDelIhc(index)}
                //         size="small"
                //         style={{ width: '30px' }}
                //     >
                //         <DeleteOutlined />
                //     </Button>
                // </Space>
            ),
        },
    ]

    const locale = {
        emptyText: 'Belum ada Pasien TB',
    };

    const data = [];
    for (let i = 0; i < 100; i++) {
        data.push({
            NoUrut: i + 1,
            RegistrasiId: "2201020052",
            PasienId: "02188277",
            Nama: "Nama Pasien Nama Pasien",
            Alamat: "KUTALIMAN 03/ 04 KEDUNGBANTENG KEDUNGBANTENG RT 05/RW 03 KEDUNGBANTENG",
            KasusIcd: "Baru",
            KodeIcd10: "A15.0 ",
            DeskIcd10: "Tb lung confirm sputum microscopy with or without culture",
            JenisIcd: "1",
            JenisDiagnosisDeskripsi: "Primer",
            KodeBagian: "9309",
            NamaRuang: "KLINIK GASTROENTERO HEPATOLOGI - RSMS",
        });
    }

    const klikBlnPeriod = (data) => {
        getListPasien(data)
        console.log('klikPeriode : ', data);
    }

    const klikDetail = (data) => {
        setmdDetailPx(true)
        setnama(data.Nama)
        setnoreg(data.RegistrasiId)
        setnoRm(data.PasienId)
        setalamat(data.Alamat)
        seticdx(data.KodeIcd10)
        getDetailPasien(data.PasienId, data.KodeIcd10)
        // console.log('klikDetail : ', data);
    }

    return (
        <div>
            <Divider
                orientation='left'
                plain
                style={{ margin: '0px' }}>
                Daftar Pasien Terdiagnosis Tuberkulosis
            </Divider>
            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                <Col>
                    <Space>
                        <span>Periode Bulan :</span>
                        <DatePicker
                            value={blnPeriode}
                            onChange={(e) => setblnPeriode(dayjs(e))}
                            allowClear={false}
                            picker="month" />
                        <Button
                            type="primary"
                            onClick={() => klikBlnPeriod(dayjs(blnPeriode).format('YYMM'))}
                        >
                            Ambil Data
                        </Button>
                    </Space>
                </Col>
            </Row>
            <Table
                columns={columns}
                dataSource={listPasien}
                locale={locale}
                loading={spListPasien}
                size='small'
                scroll={{
                    y: 450,
                }}
                bordered
                pagination={{
                    position: 'bottomRight',
                    pageSize: 50,
                    showSizeChanger: false,
                    total: listPasien.length,
                    showTotal: (total, range) => `${range[0]}-${range[1]} dari ${total} pasien`,
                }}
                style={{ marginTop: '2px', width: '100%' }} />

            <Modal
                // title="Detail Pasien Tuberkulosis"
                // centered
                open={mdDetailPx}
                closable={false}
                footer={null}
                width={1000}
                style={{ top: 20 }}
            >
                <Divider
                    orientation='left'
                    style={{ backgroundColor: '#1677ff', margin: '0px', color: 'white' }}>
                    Detail Pasien TB
                </Divider>
                <DetailPasien />
            </Modal>
        </div>
    )
}

export default ListPasienTb