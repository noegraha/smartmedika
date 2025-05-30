import { Card, Modal, Row, Col, Tabs, Button } from 'antd'
import React, { useContext } from 'react'
import PenerimaanSampleDarah from './PenerimaanSampleDarah';
import ProsesPmrCM from './ProsesPmrCM';
import PenyerahanDarah from './PenyerahanDarah';
import { BankDarahContext } from '../context/BankDarahContext';
import InformasiRuangan from './pelayanan/InformasiRuangan';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';

const PantauanPelayananDarah = () => {
    const {
        tabNo, settabNo,
        ruangIdValid,
        dtOrder,
        getHasilPmrGolonganDarah,
        getRiwPmrGolonganDarah,
        getHasilCrossMatch,
        getDarahKirim,
        getListKantongDarahSiap,
        getListKantongDarahPending,
        mdInfoUpdate, setmdInfoUpdate,
        settabInformasi,
    } = useContext(BankDarahContext);

    // settingan info update otomatis
    const updateDate = '2024-10-30';
    const today = dayjs();
    // const today = dayjs('2024-09-06');
    const daysDifference = today.diff(dayjs(updateDate), 'day');

    const onChange = (key) => {
        console.log(key);
        settabNo(key);
        if (key === 2) {
            getHasilPmrGolonganDarah(dtOrder.RegistrasiId);
            getRiwPmrGolonganDarah(dtOrder.RegistrasiId);
            getHasilCrossMatch(dtOrder.NoOrder);
        }
        else if (key === 3) {
            getDarahKirim(dtOrder.NoOrder);
        }
        else if (key === 4) {
            // getListKantongDarahSiap(ruangIdValid);
            // getListKantongDarahPending(ruangIdValid);
            settabInformasi('1');
        }
    };

    const itemTab = [
        {
            label: 'Detail Order',
            key: 1,
            children: <PenerimaanSampleDarah />,
        },
        {
            label: 'Cross Match',
            key: 2,
            children: <ProsesPmrCM />,
            disabled: Object.keys(dtOrder).length !== 0 && (dtOrder.StatusValid.trim() === "1" || dtOrder.StatusValid.trim() === "2") ? false : true,
        },
        {
            label: 'Penyerahan Darah',
            key: 3,
            children: <PenyerahanDarah />,
            disabled: Object.keys(dtOrder).length !== 0 && (dtOrder.StatusValid.trim() === "1" || dtOrder.StatusValid.trim() === "2") ? false : true,
        },
        {
            label: 'Informasi Unit Transfusi Darah (UTD)',
            key: 4,
            children: <InformasiRuangan />,
            disabled: ruangIdValid ? false : true,
        },
    ];

    return (
        <div>

            <Card bodyStyle={{ padding: '10px' }}>

                {/* <Row>
                <Col span={2}>
                    Nama
                </Col>
                <Col span={6}>
                    <Space>
                        <span>:</span>
                        <span>Nama Pasien</span>
                    </Space>
                </Col>
                <Col span={2}>
                    No.RM
                </Col>
                <Col span={6}>
                    <Space>
                        <span>:</span>
                        <span>02209906</span>
                    </Space>
                </Col>
                <Col span={2}>
                    Ruang
                </Col>
                <Col span={6}>
                    <Space>
                        <span>:</span>
                        <span>Nama Ruang</span>
                    </Space>
                </Col>
            </Row>
            <Row>
                <Col span={2}>
                    Golongan Darah
                </Col>
                <Col span={6}>
                    <Space>
                        <span>:</span>
                        <span>A/ B/ O/ AB</span>
                    </Space>
                </Col>
                <Col span={2}>
                    Alamat
                </Col>
                <Col span={6}>
                    <Space>
                        <span>:</span>
                        <span>Alamat Pasien</span>
                    </Space>
                </Col>
            </Row> */}

                {/* <hr /> */}

                <Tabs
                    // onChange={onChange}
                    onTabClick={onChange}
                    type="card"
                    items={itemTab}
                    activeKey={tabNo}
                />
            </Card>

            <Modal
                // title="Informasi Update"
                open={mdInfoUpdate}
                closable={false}
                footer={null}
                width={1000}
                style={{ top: 100 }}
            >
                <Card
                    title='Informasi Update - RME Unit Transfusi Darah'
                    headStyle={{ backgroundColor: '#91caff' }}>
                    <h3 style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 30-10-2024</h3>
                    <ul style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan informasi <b>Respon Time</b> Unit Transfusi Darah pada Menu Tab Informasi Unit Transfusi Darah (UTD) untuk melihat waktu order, waktu validasi, waktu pemeriksaan cross match, dan waktu pengiriman.</li>
                    </ul>
                    <h3 style={{ color: today.diff(dayjs('2024-10-15'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-04-24'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 15-10-2024</h3>
                    <ul style={{ color: today.diff(dayjs('2024-10-15'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-04-24'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan <b>INDIKATOR warna kuning</b> pada daftar pasien jika jenis darah yang diminta berupa <b>TC</b>.</li>
                        <li>Penambahan fitur <b>Cari menggunakan nama pasien</b> pada daftar pasien.</li>
                    </ul>
                    <h3 style={{ color: today.diff(dayjs('2024-04-24'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-04-24'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 24-04-2024</h3>
                    <ul style={{ color: today.diff(dayjs('2024-04-24'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-04-24'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan Fitur <b>Indikator Warna Advice</b> di Tab Menu <b>Informasi Unit Transfusi Darah (UTD)- Tabel Daftar Kantong Darah Siap dan Info Advice</b>.</li>
                        <li>Ket. Warna : <b>Tanpa Warna</b> = Tidak ada Advice, <b>Kuning</b> = Advice perlu dijawab, <b>Hijau</b> = Advice sudah dijawab</li>
                    </ul>
                </Card>
                <Row style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <Button
                            onClick={() => setmdInfoUpdate(false)}
                            type='primary'
                            style={{ float: 'right', width: '100px' }}>
                            OK
                        </Button>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default PantauanPelayananDarah