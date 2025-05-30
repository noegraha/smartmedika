import React from 'react';
import { Table, Col, Row, Form, Card, Button, Radio } from 'antd';

const FormIntervensiKeperawatan = () => {
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            width: '50px'
        },
        {
            title: 'Diagnosa',
            dataIndex: 'diagnosa',
            key: 'diagnosa'
        }
    ];

    const dataPrePost = [
        {
            key: '1',
            diagnosa: 'Monitor BB, sebelum dan sesudah dialisis'
        },
        {
            key: '2',
            diagnosa: 'Observasi pasien (Monitor Vital Sign) dan mesin'
        },
        {
            key: '3',
            diagnosa: 'Atur posisi pasien agar ventilasi adekuat'
        },
        {
            key: '4',
            diagnosa: 'Berikan terapi oksigen sesuai kebutuhan'
        },
        {
            key: '5',
            diagnosa: 'Identifikasi resiko dan penyebab hipoglikemi'
        },
        {
            key: '6',
            diagnosa: 'Monitor kadar gula darah'
        },
        {
            key: '7',
            diagnosa: 'Monitor tanda dan gejala hipoglikemi'
        },
        {
            key: '8',
            diagnosa: 'Bila pasien hipotensi, hipoglikemi, mual, kram, muntah, keringat dingin, pusing : berikan cairan sesuai SPO'
        },
        {
            key: '9',
            diagnosa: 'Bandingkan hasil lab. pre dan post HD'
        },
        {
            key: '10',
            diagnosa: 'Monitor tanda, gejala infeksi (lokal dan sistemik)'
        },
        {
            key: '11',
            diagnosa: 'Ganti balutan luka sesuai dengan prosedur'
        },
        {
            key: '12',
            diagnosa: 'Terapkan Universal Precaution'
        },
        {
            key: '13',
            diagnosa: 'Kaji kemampuan pasien mendapatkan nutrisi yang dibutuhkan'
        },
        {
            key: '14',
            diagnosa: 'Monitor intake makanan/minuman selama HD'
        },
        {
            key: '15',
            diagnosa: 'Tentukan riwayat cairan, makanan dan eliminasi'
        },
        {
            key: '16',
            diagnosa: 'Anjurkan pasien makanan/minuman sesuai kebutuhan'
        },
        {
            key: '17',
            diagnosa: 'Lakukan teknik distraksi, relaksasi'
        },
        {
            key: '18',
            diagnosa: 'Hentikan HD sesuai indikasi'
        },
        {
            key: '19',
            diagnosa: 'Observasi tanda dan gejala infeksi sistemik dan local'
        },
        {
            key: '20',
            diagnosa: 'Edukasi : diet, akses, Hand Hygiene, Self, Evacuation ...'
        },
        {
            key: '21',
            diagnosa: 'Komunikasi teraupetik dalam pemberian askep'
        },
    ];

    const dataIntervensi = [
        {
            key: '1',
            diagnosa: 'Preskripsi HD'
        },
        {
            key: '2',
            diagnosa: 'Diet CKD on HD'
        },
        {
            key: '3',
            diagnosa: 'Tranfusi PRC'
        },
        {
            key: '4',
            diagnosa: 'ESA'
        },
        {
            key: '5',
            diagnosa: 'Preparat besi'
        },
        {
            key: '6',
            diagnosa: 'Antipiretik'
        },
        {
            key: '7',
            diagnosa: 'Meylon'
        },
        {
            key: '8',
            diagnosa: 'Obat-obat emergensi'
        },
        {
            key: '9',
            diagnosa: 'Antibiotik'
        },
        {
            key: '10',
            diagnosa: 'Analgetik'
        },
    ];

    const radioHandler = (e) => {
    }
    const onClear = () => {
    }
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <Form>
                <Row gutter={[8, 8]}>
                    <Col span={12} xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Card
                            size="small"
                            title="Pre-Intra dan Post-HD : NIC"
                            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                            style={{
                                marginBottom: 6,
                                borderWidth: "2px",
                                borderColor: "darkgray",
                                borderRadius: "4px",
                            }}
                        >
                            <Table bordered scroll={{ x: '100px', y: '300px' }} pagination={false} size="small"
                                rowSelection={{
                                    type: "checkbox", columnWidth: "60px", fixed: "right"
                                }}
                                columns={columns} dataSource={dataPrePost}
                            />
                        </Card>
                    </Col>
                    <Col span={12} xs={24} sm={12} md={12} lg={12} xl={12}>
                        <Card
                            size="small"
                            title="Intervensi Kolaborasi"
                            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                            style={{
                                marginBottom: 6,
                                borderWidth: "2px",
                                borderColor: "darkgray",
                                borderRadius: "4px",
                            }}
                        >
                            <Table bordered scroll={{ x: '100px', y: '300px' }} pagination={false} size="small"
                                rowSelection={{
                                    type: "checkbox", columnWidth: "60px", fixed: "right"
                                }}
                                columns={columns} dataSource={dataIntervensi}
                            />
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={(e) => onSubmit(e)}
                        >
                            Simpan
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default FormIntervensiKeperawatan;