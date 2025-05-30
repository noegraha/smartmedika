import React, { useContext } from 'react';
import HdContext from '../../HdContext';
import Keluhan from '../Hemodialisa/AssesmentHd/Keluhan';
import InstruksiMedik from '../Hemodialisa/IntMedik/InstruksiMedik';
import MonitoringDialisis from '../Hemodialisa/MonDialisis/MonitoringDialisis';

import {
    Tabs,
    message,
    Card,
    Modal,
    Row,
    Col,
    Button,
} from 'antd';
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import RiwLabPK from './RiwLabPK';
import SatuSehatHD from '../SatuSehat/SatuSehatHD';
import SatuSehatHDv2 from '../SatuSehat/SatuSehatHDv2';
import DashboardSatSetHD from '../SatuSehat/DashboardSatSetHD';
import dayjs from 'dayjs';

const { TabPane } = Tabs;
const {
    PasiensContext,
} = HdContext;

function TabsHd() {
    const props = useContext(PasiensContext);

    // settingan info update otomatis
    const updateDate = '2025-05-14';
    const today = dayjs();
    // const today = dayjs('2024-09-06');
    const daysDifference = today.diff(dayjs(updateDate), 'day');


    const klikOkMdUpdate = () => {
        // lookUpPerawat()
        // getListOrder(dayjs(tglOrder).format('YYYY-MM-DD'), unitId, stat, '%20')
        props.setmdInfoUpdate(false)
    };

    return (
        <div>
            <Card loading={props.loadingContent}>
                <Tabs
                    activeKey={props.tabAktif}
                    type="card"
                    size="small"
                    onChange={(e) => {
                        props.setTabAktif(e)
                        if (e === "3") {
                            !props.tekananDarahSistolika && !props.durasi ? message.warning("Durasi HD masih kosong") :
                                !props.disabledWaktuSelesai && props.durasi ? props.changeWaktuTarget() :
                                    console.log("ok!")
                        }
                        else if (e === '2') {
                            props.getPlanTerapi(props.pasien.result.registrasiId)
                        }
                        else if (e === '4') {
                            // console.log('Pasiens : ', props.pasien.result.pasienId);
                            props.getRiwLabPK(props.pasien.result.pasienId)
                        }
                    }}
                    style={{ marginTop: "5px" }}>
                    <TabPane
                        tab="Asuhan Keperawatan Hemodialisis"
                        key="1">
                        <Keluhan />
                    </TabPane>
                    <TabPane
                        tab="Preskripsi Hemodialisis"
                        key="2"
                        disabled={!props.noOrder}>
                        <InstruksiMedik />
                    </TabPane>
                    <TabPane
                        tab="Monitoring Hemodialisis"
                        key="3"
                        disabled={!props.noOrder}>
                        <MonitoringDialisis />
                    </TabPane>
                    <TabPane
                        tab="Riw.Hasil Lab.PK"
                        key="4"
                        disabled={!props.noOrder}>
                        <RiwLabPK />
                    </TabPane>
                    {/* <TabPane
                        tab="SatuSehat HD"
                        key="5"
                        disabled={!props.noOrder}>
                        <SatuSehatHD />
                    </TabPane> */}
                    <TabPane
                        tab="SatuSehat HD" // v2
                        key="6"
                        disabled={!props.noOrder}>
                        <SatuSehatHDv2 />
                    </TabPane>
                    <TabPane
                        tab="Dashboard SatSetHD"
                        key="7"
                    // disabled={!props.noOrder}
                    >
                        <DashboardSatSetHD />
                    </TabPane>
                </Tabs>
            </Card>

            <Modal
                // title="Informasi Update"
                visible={props.mdInfoUpdate}
                closable={false}
                footer={null}
                width={1000}
                centered
            >
                <Card
                    title='Informasi Update'
                    headStyle={{ backgroundColor: '#91caff' }}>
                    <h3 style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 14-05-2025</h3>
                    <ul style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan form <b>Dokumen Registrasi Uronefrologi</b> SatuSehat HD.</li>
                    </ul>

                    <h3 style={{ color: today.diff(dayjs('2025-05-07'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2025-05-07'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 07-05-2025</h3>
                    <ul style={{ color: today.diff(dayjs('2025-05-07'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2025-05-07'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan <b>Dashboard Monitoring SatuSehat Hemodialisis.</b></li>
                    </ul>

                    <h3 style={{ color: today.diff(dayjs('2025-05-02'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2025-05-02'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 02-05-2025</h3>
                    <ul style={{ color: today.diff(dayjs('2025-05-02'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2025-05-02'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan menu <b>Pengiriman SatuSehat Hemodialisis</b>.</li>
                    </ul>

                    <h3 style={{ color: today.diff(dayjs('2024-05-02'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-05-02'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 02-05-2024</h3>
                    <ul style={{ color: today.diff(dayjs('2024-05-02'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-05-02'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
                        <li><b>RME HD : </b> Penambahan list ruangan agar bisa menampilkan dan mengisi <b>Laporan Hemodialisa</b> pasien <b>ABIYASA</b> maupun <b>RSMS</b>.
                        </li>
                    </ul>

                    <h3 style={{ color: today.diff(dayjs('2024-01-15'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-01-15'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 15-01-2024</h3>
                    <ul style={{ color: today.diff(dayjs('2024-01-15'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-01-15'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
                        <li><b>Dashboard HD : </b> Perubahan dan penambahan parameter (Kategori : Rawat Jalan / Rawat Inap) pada tampilan Grafik Aksves Vaskuler.
                        </li>
                        <li><b>Dashboard HD : </b> Penambahan Daftar Akses Vaskuler Hemodialisis secara rinci dengan menampilkan nama pasien yang terlayani per Bulan.
                        </li>
                        <li><b>Dashboard HD : </b> Penambahan Daftar TTV Tekanan Darah dan Berat Badan Pre Post Pasien Hemodialisis dengan menampilkan nama pasien yang terlayani per Hari.
                        </li>
                        <li><b>RME HD : </b> Penambahan Tombol Riwayat Tinggi Badan pasien pada Assesment Awal.
                        </li>
                        <li><b>RME HD : </b> Penambahan Informasi Plan Terapi Tindakan Penunjang dari Poli HD dan Daftar Obat Pasien yang tervalidasi pada form Preskripsi.
                        </li>
                        <li><b>RME HD : </b> Penambahan Tab Riwayat Hasil Laboratorium PK yang hanya menampilkan Hasil Laboratorium Ureum, Hemoglobin, Hematokrit.
                        </li>
                        <li><b>RME HD : </b> Penambahan kolom UserId Entry pada List Pasien HD.
                        </li>
                    </ul>
                </Card>
                <Row style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <Button
                            onClick={() => klikOkMdUpdate()}
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

export default TabsHd
