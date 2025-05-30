import { Button, Card, Col, DatePicker, Divider, Empty, Input, Modal, Row, Select, Spin, Statistic, Table } from 'antd'
import { Chart, Legend, Line, Point, Tooltip } from 'bizcharts';
import React, { useContext, useState } from 'react'
import { MonitoringSSRajalContext } from '../context/MonitoringSSRajalContext';
import dayjs from 'dayjs';
import { FileSearchOutlined, SmileTwoTone, SyncOutlined } from '@ant-design/icons';

const { Option } = Select;
const { TextArea } = Input;

const GrafikSSperBulan = () => {
    const {
        dataGrafikKirim,
        totalPendaftaran,
        totalKirim,
        dataDetailKirim,
        dataDetailResource, setdataDetailResource,
        textResponseById,
        getGrafikKirim,
        getDetailKirim,
        getDetailResource,
        getResourceById,
        spGrafikPengiriman,
        spDetailHarian,
    } = useContext(MonitoringSSRajalContext);

    const [blnKirim, setblnKirim] = useState(dayjs());
    const [tglDetail, settglDetail] = useState([]);
    const [mdDetail, setmdDetail] = useState(false);
    const [mdResponse, setmdResponse] = useState();

    const colDetailKirim = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
            width: 50,
            align: "center",
            // render: (text, record, index) => index + 1, // Menghasilkan nomor urut
        },
        {
            title: "No.Reg",
            dataIndex: "RegistrasiId",
            key: "RegistrasiId",
            align: "center",
            // width: 50,
        },
        {
            title: "TglRegistrasi",
            dataIndex: "TglRegistrasi",
            key: "TglRegistrasi",
            align: "center",
            width: 120,
            render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
        },
        {
            title: "PasienId",
            dataIndex: "PasienId",
            key: "PasienId",
            align: "center",
            // width: 50,
        },
        {
            title: "Nama",
            dataIndex: "Nama",
            key: "Nama",
        },
        {
            title: "Unit Pelayanan",
            dataIndex: "NamaRuang",
            key: "NamaRuang",
        },
        {
            title: "User Entry",
            dataIndex: "UserId",
            key: "UserId",
            align: "center",
            // width: 50,
        },
        {
            title: "Aksi",
            align: "center",
            width: 50,
            render: (text, record, index) => (
                <Button
                    onClick={() => {
                        setmdDetail(true)
                        getDetailResource(record.RegistrasiId)
                    }}
                    type="primary"
                    icon={<FileSearchOutlined />}
                    size="small"
                    style={{ width: "30px" }} />
            ),
        },
    ];

    const colDetailResource = [
        {
            title: 'No',
            dataIndex: 'No',
            key: 'No',
            width: 50,
            align: "center",
            // render: (text, record, index) => index + 1, // Menghasilkan nomor urut
        },
        {
            title: "ResourceID",
            dataIndex: "ResourceID",
            key: "ResourceID",
            // align: "center",
            // width: 50,
        },
        {
            title: "ResourceType",
            dataIndex: "ResourceType",
            key: "ResourceType",
            // align: "center",
            // width: 120,
            // render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
        },
        {
            title: "NamaRuang",
            dataIndex: "NamaRuang",
            key: "NamaRuang",
            // align: "center",
            // width: 50,
        },
        {
            title: "DateEntry",
            dataIndex: "DateEntry",
            key: "DateEntry",
            align: "center",
            width: 120,
            render: (text) => <span>{dayjs(text).format("DD-MM-YYYY")}</span>,
        },
        {
            title: "Aksi",
            align: "center",
            width: 50,
            render: (text, record, index) => (
                <Button
                    onClick={() => {
                        setmdResponse(true);
                        getResourceById(record.ResourceID, record.ResourceType);
                    }}
                    type="primary"
                    icon={<FileSearchOutlined />}
                    size="small"
                    style={{ width: "30px" }} />
            ),
        },
    ];

    const locale = {
        emptyText: <Empty description="Tidak ada data" />,
    };

    const scale = {
        Jumlah: { min: 0 },
        Jenis: {
            formatter: (v) => {
                return {
                    totalPendaftaran: "Total Pendaftaran",
                    totalKirimSS: "Total Dikirim",
                }[v];
            },
        },
    };

    const persenKirim = (totalKirim / totalPendaftaran) * 100;

    let tglKirim = dataGrafikKirim.filter(item => item.Jenis === "totalKirimSS");

    return (
        <div>
            <Card
                title="Pengiriman Pasien Rawat Jalan"
                // loading={spinGrafik}
                headStyle={{ backgroundColor: "#3689cf", color: 'white' }}
                bodyStyle={{ padding: '10px' }}
                style={{ width: "100%", backgroundColor: "#e6f9f8" }}
                size='small'
            >
                <Row>
                    <Col span={2}>
                        <span>Pilih Bulan :</span>
                    </Col>
                    <Col span={3}>
                        <DatePicker
                            value={blnKirim}
                            picker="month"
                            format={"MM-YYYY"}
                            onChange={(e) => {
                                let bln = dayjs(e).format('YYYY-MM');
                                setblnKirim(e);
                                console.log('bulan : ', dayjs(e).format('YYYY-MM'));
                                getGrafikKirim(bln);
                            }}
                            style={{ width: '100%' }}
                        />
                    </Col>
                    <Col span={5}>
                        <Button
                            type='primary'
                            onClick={() => {
                                let bln = dayjs(blnKirim).format('YYYY-MM');
                                getGrafikKirim(bln);
                            }}
                            style={{ marginLeft: '5px' }}>
                            Lihat Data
                        </Button>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '10px' }}>
                    <Col span={20}>
                        <Spin
                            indicator={<SyncOutlined spin />}
                            spinning={spGrafikPengiriman}
                            tip="Mengambil Data..."
                        >
                            <Chart
                                height={320}
                                padding="auto"
                                data={dataGrafikKirim}
                                scale={scale}
                                autoFit
                                interactions={["element-active"]}
                            >
                                <Point
                                    position="Tanggal*Jumlah"
                                    color={[
                                        "Jenis",
                                        (xVal) => {
                                            if (xVal === "totalPendaftaran") {
                                                return "#faad14";
                                            }
                                            if (xVal === "totalKirimSS") {
                                                return "#389e0d";
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
                                            if (xVal === "totalPendaftaran") {
                                                return "#faad14";
                                            }
                                            if (xVal === "totalKirimSS") {
                                                return "#389e0d";
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
                                        <b>Pendaftaran</b>
                                    </div>
                                }
                                value={totalPendaftaran}
                                valueStyle={{ color: "#faad14", fontWeight: "bold" }}
                                suffix="pasien"
                            />
                        </Card>
                        <br />
                        <Card style={{ marginLeft: "5px", width: "99%" }}>
                            <Statistic
                                title={
                                    <div style={{ color: "#000000" }}>
                                        <b>Terkirim</b>
                                    </div>
                                }
                                value={totalKirim}
                                valueStyle={{ color: "#389e0d", fontWeight: "bold" }}
                                suffix="pasien"
                            />
                        </Card>
                        <br />
                        <Card style={{ marginLeft: "5px", width: "99%" }}>
                            <Statistic
                                title={
                                    <div style={{ color: "#000000" }}>
                                        <b>Presentase</b>
                                    </div>
                                }
                                value={persenKirim}
                                precision={2}
                                valueStyle={{ color: "#FA7070", fontWeight: "bold" }}
                                suffix="%"
                            />
                        </Card>
                    </Col>
                </Row>

                <Divider
                    orientation='left'
                    style={{
                        backgroundColor: '#3689cf',
                        color: 'white',
                    }}>
                    Detail Harian Terkirim
                </Divider>

                <Row>
                    <Col span={2}>
                        <span>Pilih Tanggal :</span>
                    </Col>
                    <Col span={4}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={tglDetail}
                            disabled={tglKirim.length !== 0 ? false : true}
                            onChange={(e) => {
                                getDetailKirim(e);
                                settglDetail(e);
                            }}
                        >
                            {tglKirim.map((opt, index) => (
                                <Option key={index} value={opt.Tanggal}>{opt.Tanggal}</Option>
                            ))}
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <Table
                            bordered
                            loading={spDetailHarian}
                            columns={colDetailKirim}
                            dataSource={dataDetailKirim}
                            // pagination={false}
                            locale={locale}
                            style={{ marginBottom: "5px" }}
                        />
                    </Col>
                </Row>

            </Card>

            {/* MODAL Detail SatuSehat */}
            <Modal
                // centered
                open={mdDetail}
                onCancel={() => setmdDetail(false)}
                closable={false}
                footer={null}
                width={1000}
                style={{ top: 20 }}
            >
                <Divider
                    orientation="left"
                    style={{ backgroundColor: "#3689cf", margin: "0px", color: 'white' }}
                >
                    Detail SatuSehat
                </Divider>

                <Table
                    bordered
                    loading={spDetailHarian}
                    columns={colDetailResource}
                    dataSource={dataDetailResource}
                    pagination={false}
                    locale={locale}
                    style={{ marginBottom: "5px", marginTop: '5px' }}
                />
            </Modal>

            {/* MODAL Response SatuSehat */}
            <Modal
                open={mdResponse}
                onCancel={() => setmdResponse(false)}
                closable={false}
                footer={null}
                width={800}
                style={{ top: 50 }}
            >
                <Divider
                    orientation="left"
                    style={{ backgroundColor: "#3689cf", margin: "0px", color: 'white' }}
                >
                    Response SatuSehat
                </Divider>

                <Spin
                    indicator={<SmileTwoTone spin />}
                    spinning={spDetailHarian}
                    tip="Mengambil Data dari Server SatuSehat Kemenkes..."
                >
                    <TextArea
                        value={textResponseById}
                        rows={25}
                        placeholder="Tidak ada Response"
                        style={{ marginTop: '5px' }}
                        readOnly
                    />
                </Spin>
            </Modal>
        </div>
    )
}

export default GrafikSSperBulan