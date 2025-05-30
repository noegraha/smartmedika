import { Button, Col, DatePicker, Divider, Row, Space, Table, Tabs, Tag } from 'antd'
import React, { useContext, useState } from 'react'
import { BankDarahContext } from '../../context/BankDarahContext';
import dayjs from 'dayjs';
import '../../style/style.css'
import { EnterOutlined } from '@ant-design/icons';

const InformasiRuangan = () => {
    const {
        ktgJnsKantong,
        ruangIdValid,
        listPmrCmRuangan,
        listDarahSiapRuangan,
        listDarahTerkirimRuangan,
        listDarahPending,
        listRespTime,
        setdrOrder,
        getDaftarPmrCm,
        getListKantongDarahTerkirim,
        getDetailPasienPelayanan,
        getDetailOrder,
        getRespTime,
        getListKantongDarahSiap,
        getListKantongDarahPending,
        spTbPmrCmRuangan,
        spTbDarahSiapRuangan,
        spTbDarahTerkirimRuangan,
        spTbDarahPending,
        spTbRespTime,
        tabInformasi, settabInformasi,
    } = useContext(BankDarahContext)

    const [tglPmrCm, settglPmrCm] = useState(dayjs());
    const [tglDarahKirim, settglDarahKirim] = useState(dayjs());
    const [tglRespTime, settglRespTime] = useState(dayjs());

    const colTbDaftarPmrCm = [
        {
            title: 'No',
            align: 'center',
            width: 40,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'No. Kantong',
            align: 'center',
            dataIndex: 'NoKantong',
            key: 'NoKantong',
            // width: 90,
        },
        {
            title: 'Jns. Kantong',
            align: 'center',
            dataIndex: 'JnsKantong',
            key: 'JnsKantong',
            // width: 90,
            render: (jnsKtg) => {
                const matchingData = ktgJnsKantong.find((item) => item.id === jnsKtg);
                return matchingData ? matchingData.desk : 'Tidak ditemukan';
            },
        },
        {
            title: 'Gol. Darah',
            align: 'center',
            dataIndex: 'GolDarah',
            key: 'GolDarah',
            // width: 50,
        },
        {
            title: 'Rhesus',
            align: 'center',
            dataIndex: 'Rhesus',
            key: 'Rhesus',
            // width: 60,
        },
        {
            title: 'Jml. cc',
            align: 'center',
            dataIndex: 'JmlCc',
            key: 'JmlCc',
            // width: 55,
        },
        {
            title: 'Jenis Komponen',
            align: 'center',
            dataIndex: 'JenisKomponen',
            key: 'JenisKomponen',
            // width: 80,
        },
        {
            title: 'Hasil',
            align: 'center',
            dataIndex: 'Hasil',
            key: 'Hasil',
            // width: 90,
            render: Hasil => (
                <Tag color={Hasil ? 'green' : 'red'}>
                    {Hasil ? 'Compatible' : 'Incompatible'}
                </Tag>
            ),
        },
        {
            title: 'Petugas',
            align: 'center',
            dataIndex: 'UserId',
            key: 'UserId',
            // width: 80,
        },
        {
            title: 'Tanggal',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 70,
            render: (text) => dayjs(text).format('DD-MM-YY'),
        },
        // {
        //     title: 'Aksi',
        //     align: 'center',
        //     width: 100,
        //     fixed: 'right',
        //     render: (text, record, index) => (
        //         <Space direction="vertical">
        //             <Button
        //                 onClick={() => klikKirim(index, record.NoKantong, record.Id, record.NoOrder)}
        //                 type="primary"
        //                 disabled={record.StsKirim}
        //                 size='small'
        //                 style={{ width: '80px' }}
        //             >
        //                 Kirim
        //             </Button>
        //             <Button
        //                 onClick={() => klikDetail(record)}
        //                 disabled={!record.StsKirim}
        //                 size='small'
        //                 style={{ width: '80px' }}
        //             >
        //                 Detail Kirim
        //             </Button>
        //         </Space>
        //     ),
        // },
    ];

    const colTbDaftarDarahSiap = [
        {
            title: 'NamaPasien',
            // align: 'center',
            dataIndex: 'NamaPasien',
            key: 'NamaPasien',
            // width: 90,
        },
        {
            title: 'Ruangan',
            align: 'center',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
            // width: 90,
        },
        {
            title: 'No. Kantong',
            align: 'center',
            dataIndex: 'NoKantong',
            key: 'NoKantong',
            width: 90,
        },
        {
            title: 'Gol. Darah',
            align: 'center',
            dataIndex: 'GolDarah',
            key: 'GolDarah',
            // width: 50,
        },
        {
            title: 'Rhesus',
            align: 'center',
            dataIndex: 'Rhesus',
            key: 'Rhesus',
            // width: 60,
        },
        {
            title: 'Jenis Komponen',
            align: 'center',
            dataIndex: 'JenisKomponen',
            key: 'JenisKomponen',
            // width: 80,
        },
        {
            title: 'Tanggal',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 70,
            render: (text) => dayjs(text).format('DD-MM-YY'),
        },
        {
            title: 'Info',
            // align: 'center',
            dataIndex: 'KetRuangan',
            key: 'KetRuangan',
            // width: 70,
        },
        {
            title: 'Aksi',
            align: 'center',
            width: 50,
            render: (text, record, index) => (
                <Button
                    onClick={() => klikTbDarahSiap(record.RegistrasiId, record.NoOrder)}
                    type="primary"
                    icon={<EnterOutlined />}
                    // disabled={record.StsDatang}
                    size='small'
                    style={{ width: '30px' }}
                />
            ),
        },
    ];

    const colTbDaftarDarahTerkirim = [
        {
            title: 'No',
            align: 'center',
            width: 40,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'NamaPasien',
            // align: 'center',
            dataIndex: 'NamaPasien',
            key: 'NamaPasien',
            // width: 90,
        },
        {
            title: 'Ruangan',
            align: 'center',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
            // width: 90,
        },
        {
            title: 'No. Kantong',
            align: 'center',
            dataIndex: 'NoKantong',
            key: 'NoKantong',
            // width: 90,
        },
        {
            title: 'Gol. Darah',
            align: 'center',
            dataIndex: 'GolDarah',
            key: 'GolDarah',
            // width: 50,
        },
        {
            title: 'Rhesus',
            align: 'center',
            dataIndex: 'Rhesus',
            key: 'Rhesus',
            // width: 60,
        },
        {
            title: 'Jenis Komponen',
            align: 'center',
            dataIndex: 'JenisKomponen',
            key: 'JenisKomponen',
            // width: 80,
        },
        {
            title: 'Tanggal',
            align: 'center',
            dataIndex: 'TglPengiriman',
            key: 'TglPengiriman',
            width: 70,
            render: (text) => dayjs(text).format('DD-MM-YY'),
        },
        {
            title: 'Ptg. Pengirim',
            align: 'center',
            dataIndex: 'UserIdPetugas',
            key: 'UserIdPetugas',
            // width: 80,
        },
    ];

    const colTbOrderPending = [
        {
            title: 'No',
            align: 'center',
            width: 40,
            render: (text, record, index) => <span>{index + 1}</span>,
        },
        {
            title: 'No. Order',
            align: 'center',
            dataIndex: 'NoOrder',
            key: 'NoOrder',
            width: 90,
        },
        {
            title: 'Tgl. Order',
            align: 'center',
            dataIndex: 'TglOrder',
            key: 'TglOrder',
            width: 90,
            render: (text) => dayjs(text).format('DD-MM-YYYY'),
        },
        {
            title: 'NamaPasien',
            // align: 'center',
            dataIndex: 'NamaPasien',
            key: 'NamaPasien',
            // width: 90,
        },
        {
            title: 'Ruangan',
            align: 'center',
            dataIndex: 'Deskripsi',
            key: 'Deskripsi',
            // width: 90,
        },
        {
            title: 'Alamat',
            // align: 'center',
            dataIndex: 'Alamat',
            key: 'Alamat',
            // width: 90,
        },
        {
            title: 'Aksi',
            align: 'center',
            width: 50,
            render: (text, record, index) => (
                <Button
                    onClick={() => klikTbDarahPending(record.RegistrasiId, record.NoOrder, record.NamaDokter)}
                    type="primary"
                    icon={<EnterOutlined />}
                    // disabled={record.StsDatang}
                    size='small'
                    style={{ width: '30px' }}
                />
            ),
        },
    ];

    const colTbRspTime = [
        {
            title: 'No',
            dataIndex: 'NoUrut',
            key: 'NoUrut',
            align: 'center',
            width: 40,
        },
        {
            title: 'No. Registrasi',
            align: 'center',
            dataIndex: 'RegistrasiId',
            key: 'RegistrasiId',
            width: 90,
        },
        {
            title: 'No. CM',
            align: 'center',
            dataIndex: 'PasienId',
            key: 'PasienId',
            width: 90,
        },
        {
            title: 'No. Order',
            align: 'center',
            dataIndex: 'NoOrder',
            key: 'NoOrder',
            width: 120,
        },
        {
            title: 'Ruangan',
            align: 'center',
            dataIndex: 'asalRuang',
            key: 'asalRuang',
        },
        {
            title: 'Jenis Komponen',
            align: 'center',
            dataIndex: 'JenisKomponen',
            key: 'JenisKomponen',
            width: 150,
            render: (text) => text ? text : 'Belum diperiksa',
        },
        {
            title: 'Tgl. Order',
            align: 'center',
            dataIndex: 'tglOrder',
            key: 'tglOrder',
            width: 150,
            render: (text) => dayjs(text).format('DD-MM-YYYY HH:mm'),
        },
        {
            title: 'Tgl. Validasi',
            align: 'center',
            dataIndex: 'tglValidasi',
            key: 'tglValidasi',
            width: 150,
            render: (text) => dayjs(text).format('DD-MM-YYYY HH:mm'),
        },
        {
            title: 'Tgl. Pemeriksaan',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 150,
            render: (text) => text ? dayjs(text).format('DD-MM-YYYY HH:mm') : 'Belum diperiksa',
        },
        {
            title: 'Tgl. Pengiriman',
            align: 'center',
            dataIndex: 'TglPengiriman',
            key: 'TglPengiriman',
            width: 150,
            render: (text) => text ? dayjs(text).format('DD-MM-YYYY HH:mm') : 'Belum dikirim',
        },
    ];

    const klikTbDarahPending = (regId, noOrder, nmDokter) => {
        setdrOrder(nmDokter)
        getDetailPasienPelayanan(regId);
        getDetailOrder(noOrder)
    }

    const klikTbDarahSiap = (regId, noOrder,) => {
        getDetailPasienPelayanan(regId);
        getDetailOrder(noOrder)
    }

    const changeTab = (key) => {
        settabInformasi(key);
        if (key === '2') {
            getListKantongDarahSiap(ruangIdValid);
        }
        else if (key === '3') {
            getListKantongDarahPending(ruangIdValid);
        }
    };

    return (
        <div>
            <Tabs
                onChange={changeTab}
                type="card"
                activeKey={tabInformasi}
                className='my-tabs'
                size='small'
                items={[
                    {
                        label: 'Pemeriksaan Crossmatch',
                        key: '1',
                        children: <div>
                            <Row>
                                <Col span={24}>
                                    <Divider
                                        orientation='left'
                                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                                        Daftar Pemeriksaan Crossmatch
                                    </Divider>
                                </Col>
                            </Row>

                            <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                                <Col span={24}>
                                    <Space>
                                        <span>Tanggal :</span>
                                        <DatePicker
                                            value={tglPmrCm}
                                            onChange={(e) => {
                                                settglPmrCm(dayjs(e))
                                                getDaftarPmrCm(dayjs(e).format('YYYY-MM-DD'), ruangIdValid)
                                            }}
                                            format="DD-MM-YYYY"
                                            allowClear={false}
                                        // style={{ width: '50%' }} 
                                        />
                                        <Button
                                            onClick={() => {
                                                getDaftarPmrCm(dayjs(tglPmrCm).format('YYYY-MM-DD'), ruangIdValid)
                                            }}
                                            type='primary'
                                            style={{ width: '75px' }}>
                                            Lihat Data
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>

                            <Table
                                bordered
                                loading={spTbPmrCmRuangan}
                                columns={colTbDaftarPmrCm}
                                rowClassName={(record, index) => (
                                    record.Kirim ? "kirim" : null
                                )}
                                dataSource={listPmrCmRuangan}
                                pagination={false}
                                size='small'
                            />
                        </div>,
                    },
                    {
                        label: 'Kantong Darah Siap dan Info Advice',
                        key: '2',
                        children: <div>
                            <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                                <Col span={24}>
                                    <Divider
                                        orientation='left'
                                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                                        Daftar Kantong Darah Siap dan Info Advice
                                    </Divider>
                                </Col>
                            </Row>

                            <Table
                                bordered
                                loading={spTbDarahSiapRuangan}
                                columns={colTbDaftarDarahSiap}
                                rowClassName={(record, index) => (
                                    record.StsAdvice === null ? null : record.StsAdvice ? 'sudah_jawab' : 'belum_jawab'
                                )}
                                dataSource={listDarahSiapRuangan}
                                pagination={false}
                                size='small'
                            />
                        </div>,
                    },
                    {
                        label: 'Kantong Darah Terkirim',
                        key: '3',
                        children: <div>
                            <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                                <Col span={24}>
                                    <Divider
                                        orientation='left'
                                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                                        Daftar Kantong Darah Terkirim
                                    </Divider>
                                </Col>
                            </Row>

                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={24}>
                                    <Space>
                                        <span>Tanggal :</span>
                                        <DatePicker
                                            value={tglDarahKirim}
                                            onChange={(e) => {
                                                settglDarahKirim(dayjs(e))
                                                getListKantongDarahTerkirim(dayjs(e).format('YYYY-MM-DD'), ruangIdValid)
                                            }}
                                            format="DD-MM-YYYY"
                                            allowClear={false}
                                        // style={{ width: '50%' }} 
                                        />
                                        <Button
                                            onClick={() => {
                                                getListKantongDarahTerkirim(dayjs(tglDarahKirim).format('YYYY-MM-DD'), ruangIdValid)
                                            }}
                                            type='primary'
                                            style={{ width: '75px' }}>
                                            Lihat Data
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>

                            <Table
                                bordered
                                loading={spTbDarahTerkirimRuangan}
                                columns={colTbDaftarDarahTerkirim}
                                dataSource={listDarahTerkirimRuangan}
                                pagination={false}
                                size='small'
                            />
                        </div>,
                    },
                    {
                        label: 'Order >= 5 Hari',
                        key: '4',
                        children: <div>
                            <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                                <Col span={24}>
                                    <Divider
                                        orientation='left'
                                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                                        Daftar Order &#62;= 5 Hari
                                    </Divider>
                                </Col>
                            </Row>

                            <Table
                                bordered
                                loading={spTbDarahPending}
                                columns={colTbOrderPending}
                                dataSource={listDarahPending}
                                pagination={false}
                                size='small'
                            />
                        </div>,
                    },
                    {
                        label: 'Respon Time Order UTD',
                        key: '5',
                        children: <div>
                            <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                                <Col span={24}>
                                    <Divider
                                        orientation='left'
                                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                                        Daftar Respon Time Pelayanan UTD
                                    </Divider>
                                </Col>
                            </Row>

                            <Row style={{ marginBottom: '2px' }}>
                                <Col span={24}>
                                    <Space>
                                        <span>Tanggal :</span>
                                        <DatePicker
                                            value={tglRespTime}
                                            onChange={(e) => {
                                                settglRespTime(dayjs(e));
                                                getRespTime(dayjs(e).format('YYYY-MM-DD'), ruangIdValid);
                                            }}
                                            format="DD-MM-YYYY"
                                            allowClear={false}
                                        // style={{ width: '50%' }} 
                                        />
                                        <Button
                                            onClick={() => {
                                                getRespTime(dayjs(tglRespTime).format('YYYY-MM-DD'), ruangIdValid);
                                            }}
                                            type='primary'
                                            style={{ width: '75px' }}>
                                            Lihat Data
                                        </Button>
                                    </Space>
                                </Col>
                            </Row>

                            <Table
                                bordered
                                loading={spTbRespTime}
                                columns={colTbRspTime}
                                dataSource={listRespTime}
                                // pagination={false}
                                size='small'
                            />
                        </div>,
                    },
                ]}
            />
        </div>
    )
}

export default InformasiRuangan