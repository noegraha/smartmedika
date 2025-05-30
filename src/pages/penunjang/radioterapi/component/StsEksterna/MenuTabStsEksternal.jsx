import { Button, Card, Col, Modal, Row, Tabs } from 'antd'
import React, { useContext } from 'react'
import FormStatusEksternal from '../FormStatusEksternal';
import { RadioterapiContext } from '../../context/RadioterapiContext';
import RiwayatStsEksterna from './RiwayatStsEksterna';
import '../../style/style.css'
import { ExclamationCircleTwoTone } from '@ant-design/icons';
import dayjs from 'dayjs';

const { TabPane } = Tabs;

const MenuTabStsEksternal = () => {
    const {
        tabKeyStsEks, settabKeyStsEks,
        mdInfoUpdateStsEksterna, setmdInfoUpdateStsEksterna,
    } = useContext(RadioterapiContext);

    // settingan info update otomatis
    const updateDate = '2025-03-06';
    const today = dayjs();
    // const today = dayjs('2024-09-06');
    const daysDifference = today.diff(dayjs(updateDate), 'day');

    return (
        <div>
            <Card bodyStyle={{ padding: '0px' }}>
                <Tabs
                    // defaultActiveKey={tabKey}
                    activeKey={tabKeyStsEks}
                    onChange={(e) => settabKeyStsEks(e)}
                    size='small'
                    type='card'>
                    <TabPane tab="Status Eksterna" key="1">
                        <FormStatusEksternal />
                    </TabPane>
                    <TabPane tab="Riwayat" key="2">
                        <RiwayatStsEksterna />
                    </TabPane>
                </Tabs>
            </Card>

            <Modal
                // title="Informasi Update"
                visible={mdInfoUpdateStsEksterna}
                closable={false}
                footer={null}
                width={1000}
                style={{ top: 100 }}
            >
                <Card
                    title='Informasi Update - Form Status Eksterna'
                    headStyle={{ backgroundColor: '#91caff' }}>
                    <h3 style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 06-03-2025</h3>
                    <ul style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan data <b>Jumlah Total Penyinaran</b>, sebagai sinkronasi data untuk mengetahui rencana penyinaran yang akan dilakukan dan yang telah dilaksanakan.</li>
                    </ul>
                </Card>
                <Row style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <Button
                            onClick={() => setmdInfoUpdateStsEksterna(false)}
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

export default MenuTabStsEksternal