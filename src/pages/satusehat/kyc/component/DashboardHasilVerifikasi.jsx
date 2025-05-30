import { SyncOutlined } from '@ant-design/icons';
import { Button, Card, Col, DatePicker, Row, Spin, Statistic } from 'antd'
import { Chart, Legend, Line, Point, Tooltip } from 'bizcharts';
import React, { useContext } from 'react'
import { KycSatusehatContext } from '../context/KycSatusehatContext';
import dayjs from 'dayjs';

const DashboardHasilVerifikasi = () => {
    const {
        blnDashboard, setblnDashboard,
        dataDashboard,
        jmlPasien,
        jmlUmum,
        jmlKaryawan,

        getDashboardKyc,

        spGrafik,
    } = useContext(KycSatusehatContext);

    const scale = {
        Jumlah: { min: 0 },
        Jenis: {
            formatter: (v) => {
                return {
                    pasien: "Pasien",
                    umum: "Umum",
                    karyawan: "Karyawan",
                }[v];
            },
        },
    };

    const tempData = [
        {
            "Jenis": "pasien",
            "Tanggal": "2025-02-01",
            "Jumlah": 36
        },
        {
            "Jenis": "umum",
            "Tanggal": "2025-02-01",
            "Jumlah": 5
        },
        {
            "Jenis": "karyawan",
            "Tanggal": "2025-02-01",
            "Jumlah": 12
        },
        {
            "Jenis": "pasien",
            "Tanggal": "2025-02-02",
            "Jumlah": 24
        },
        {
            "Jenis": "umum",
            "Tanggal": "2025-02-02",
            "Jumlah": 8
        },
        {
            "Jenis": "karyawan",
            "Tanggal": "2025-02-02",
            "Jumlah": 8
        },
        {
            "Jenis": "pasien",
            "Tanggal": "2025-02-03",
            "Jumlah": 40
        },
        {
            "Jenis": "umum",
            "Tanggal": "2025-02-03",
            "Jumlah": 10
        },
        {
            "Jenis": "karyawan",
            "Tanggal": "2025-02-03",
            "Jumlah": 2
        },
    ];

    return (
        <div>
            <Card
                title='Dashboard KYC SatuSehat'
                headStyle={{ backgroundColor: '#36cfc9' }}
            >
                <Row>
                    <Col span={2}>
                        <span>Pilih Bulan :</span>
                    </Col>
                    <Col span={3}>
                        <DatePicker
                            value={blnDashboard}
                            picker="month"
                            format={"MM-YYYY"}
                            onChange={(e) => {
                                setblnDashboard(e);
                            }}
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col span={5}>
                        <Button
                            type='primary'
                            onClick={() => {
                                let bln = dayjs(blnDashboard).format('YYYY-MM');
                                getDashboardKyc(bln);
                            }}
                            style={{ marginLeft: '5px' }}>
                            Lihat Data
                        </Button>
                    </Col>
                </Row>
                <Row>
                    <Col span={20}>
                        <Spin
                            // indicator={<SyncOutlined spin />}
                            spinning={spGrafik}
                            tip="Loading... 😁"
                        >
                            <Chart
                                height={320}
                                padding="auto"
                                data={dataDashboard}
                                // data={tempData}
                                scale={scale}
                                autoFit
                                interactions={["element-active"]}
                            >
                                <Point
                                    position="Tanggal*Jumlah"
                                    color={[
                                        "Jenis",
                                        (xVal) => {
                                            if (xVal === "pasien") {
                                                return "#faad14";
                                            }
                                            if (xVal === "umum") {
                                                return "#389e0d";
                                            }
                                            if (xVal === "karyawan") {
                                                return "#4096ff";
                                            }
                                            return "#faad14";
                                        },
                                    ]}
                                    shape="circle"
                                />
                                <Line
                                    shape="smooth"
                                    position="Tanggal*Jumlah"
                                    color={[
                                        "Jenis",
                                        (xVal) => {
                                            if (xVal === "pasien") {
                                                return "#faad14";
                                            }
                                            if (xVal === "umum") {
                                                return "#389e0d";
                                            }
                                            if (xVal === "karyawan") {
                                                return "#4096ff";
                                            }
                                            return "#faad14";
                                        },
                                    ]}
                                    label="Jumlah"
                                />
                                <Tooltip shared showCrosshairs />
                                <Legend position="top" />
                            </Chart>
                        </Spin>
                    </Col>

                    <Col span={4}>
                        <Card style={{ marginLeft: "5px", width: "99%" }}>
                            <Statistic
                                title={
                                    <div style={{ color: "#000000" }}>
                                        <b>Pasien</b>
                                    </div>
                                }
                                value={jmlPasien}
                                valueStyle={{ color: "#faad14", fontWeight: "bold" }}
                                suffix="orang"
                            />
                        </Card>
                        <br />
                        <Card style={{ marginLeft: "5px", width: "99%" }}>
                            <Statistic
                                title={
                                    <div style={{ color: "#000000" }}>
                                        <b>Umum</b>
                                    </div>
                                }
                                value={jmlUmum}
                                valueStyle={{ color: "#389e0d", fontWeight: "bold" }}
                                suffix="orang"
                            />
                        </Card>
                        <br />
                        <Card style={{ marginLeft: "5px", width: "99%" }}>
                            <Statistic
                                title={
                                    <div style={{ color: "#000000" }}>
                                        <b>Karyawan</b>
                                    </div>
                                }
                                value={jmlKaryawan}
                                valueStyle={{ color: "#FA7070", fontWeight: "bold" }}
                                suffix="orang"
                            />
                        </Card>
                    </Col>
                </Row>
            </Card></div>
    )
}

export default DashboardHasilVerifikasi