import { Button, Card, Col, Modal, Row, Tabs } from 'antd'
import React, { useContext } from 'react'
import FormPermintaanDarah from '../FormPermintaanDarah';
import RiwayatTranfusi from './RiwayatTranfusi';
import HasilCrossmatch from './HasilCrossmatch';
import { BankDarahContext } from '../../context/BankDarahContext';
import DaftarOrderRuangan from './DaftarOrderRuangan';
import dayjs from 'dayjs';
import { ExclamationCircleTwoTone } from '@ant-design/icons';

const { TabPane } = Tabs;

const MenuTabBarOrderDarah = () => {
    const {
        tabOrder, settabOrder,
        ruangId,
        dtPasien,
        tglInfo,
        getKantongDarahSiap,
        getListAdvice,
        getRiwReaksi,
        getInfoRuangan,
        getListOrder,
        mdInfoUpdate, setmdInfoUpdate,
    } = useContext(BankDarahContext);

    // settingan info update otomatis
    const updateDate = '2025-02-03';
    const today = dayjs();
    // const today = dayjs('2024-09-06');
    const daysDifference = today.diff(dayjs(updateDate), 'day');

    const onChange = (key) => {
        console.log(key);
        settabOrder(key)
        if (key === '1') {
            getListOrder(dtPasien.RegistrasiId) // mengambil list order bank darah
        }
        if (key === '2') {
            getKantongDarahSiap(dtPasien.RegistrasiId, '0')
            getListAdvice(dtPasien.RegistrasiId)
        }
        else if (key === '3') {
            getKantongDarahSiap(dtPasien.RegistrasiId, '1')
            getRiwReaksi(dtPasien.PasienId)
        }
        else if (key === '4') {
            getInfoRuangan(ruangId, dayjs(tglInfo).format('YYYY-MM-DD'))
        }
    };

    return (
        <div>
            <Card bodyStyle={{ padding: '5px' }}>
                <Tabs
                    activeKey={tabOrder}
                    onTabClick={(e) => onChange(e)}
                    size='small'
                    type='card'>
                    <TabPane tab="Order Darah"
                        disabled={
                            Object.keys(dtPasien).length !== 0 && !ruangId.startsWith('94') ? false : true
                        }
                        key="1"
                    >
                        <FormPermintaanDarah />
                    </TabPane>
                    <TabPane tab="Hasil Crossmatch"
                        disabled={
                            Object.keys(dtPasien).length !== 0 && !ruangId.startsWith('94') ? false : true
                        }
                        key="2"
                    >
                        <HasilCrossmatch />
                    </TabPane>
                    <TabPane tab="Riwayat Transfusi"
                        disabled={
                            Object.keys(dtPasien).length !== 0 ? false : true
                        }
                        key="3"
                    >
                        <RiwayatTranfusi />
                    </TabPane>
                    <TabPane tab="Daftar Order Ruangan"
                        disabled={!ruangId} key="4"
                    >
                        <DaftarOrderRuangan />
                    </TabPane>
                </Tabs>
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
                    <h3 style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 04-02-2025</h3>
                    <ul style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan <b>Form Catatan/ Pelaporan Pelaksaan Transfusi Darah</b> yang telah diberikan kepada pasien. Form ini terletak pada Tab Riwayat Transfusi, klik pada Pelaksanaan Transfusi di setiap kantong darah yang diberikan.</li>
                        <li>Form Pelaksaan Transfusi Darah terdiri dari <b>Catatan Pelaksanaan, Observasi, dan Reaksi Transfusi</b></li>
                        <li>Pada <b>Tab Catatan Transfusi</b> inputan dilakukan pada keterangan yang ditebali hitam.</li>
                        <li>Pada <b>Tab Observasi</b> inputan yang dimasukkan adalah 4 tanda vital berupa <b>Saat Transfusi (waktu terset otomatis), 15 Menit saat Transfusi (waktu terset otomatis), Selesai Transfusi (waktu perlu disesuaikan), 1 Jam setelah Transfusi (waktu terset otomatis)</b>.</li>
                        <li>Pada <b>Tabel Kantong Darah Diterima</b> terdapat kolom Laporan (jika terdapat tanda centang berarti sudah diisi) dan kolom Observasi (jika angka 4 berarti sudah lengkap).</li>
                    </ul>
                    <h3 style={{ color: today.diff(dayjs('2024-05-13'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-04-24'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 13-05-2024</h3>
                    <ul style={{ color: today.diff(dayjs('2024-05-13'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-04-24'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan Keterangan <b>UserId</b> order untuk <b>Peringatan Hapus Order</b> Bank Darah</li>
                    </ul>
                    <h3 style={{ color: today.diff(dayjs('2024-04-24'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-04-24'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 24-04-2024</h3>
                    <ul style={{ color: today.diff(dayjs('2024-04-24'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-04-24'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan Fitur <b>Indikator Warna Advice</b> di Tab Menu <b>Daftar Order Ruangan - Tabel Daftar Kantong Darah Siap dan Info Advice</b>.</li>
                        <li>Ket. Warna : <b>Tanpa Warna</b> = Tidak ada Advice, <b>Kuning</b> = Advice perlu dijawab, <b>Hijau</b> = Advice sudah dijawab</li>
                        <li>Informasi Tambahan : Untuk inputan <b>Reaksi Transfusi Darah</b>, diisikan hanya <b>jika memang terjadi Reaksi</b>, jika tidak ada reaksi biarkan kosong.</li>
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

export default MenuTabBarOrderDarah