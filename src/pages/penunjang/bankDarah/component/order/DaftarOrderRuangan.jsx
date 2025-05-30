import { Button, Col, DatePicker, Divider, Row, Space, Table } from 'antd'
import React, { useContext } from 'react'
import { BankDarahContext } from '../../context/BankDarahContext'
import dayjs from 'dayjs'
import { EnterOutlined } from '@ant-design/icons'
import '../../style/style.css'
import { LoginContext } from '../../../../rawatjalan/context'

const DaftarOrderRuangan = () => {
    const {
        flagOrderDarah,
    } = useContext(LoginContext);

    const {
        ruangId,
        listNonValid,
        listValid,
        listTerlayani,
        listDrhSiapRuang,
        tglInfo, settglInfo,
        settabOrder,
        getDetailPasien,
        getInfoRuangan,
        spTbInfoRuang,
    } = useContext(BankDarahContext)

    const colTbNonValid = [
        {
            title: 'No. Order',
            align: 'center',
            dataIndex: 'NoOrder',
            key: 'NoOrder',
            width: 100,
        },
        {
            title: 'Tgl. Order',
            align: 'center',
            dataIndex: 'TglOrder',
            key: 'TglOrder',
            width: 100,
            render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
        },
        {
            title: 'No. Registrasi',
            align: 'center',
            dataIndex: 'RegistrasiId',
            key: 'RegistrasiId',
            width: 100,
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'NamaPasien',
            key: 'NamaPasien',
            // width: 60,
        },
        {
            title: 'Alamat',
            dataIndex: 'Alamat',
            key: 'Alamat',
            width: 400,
        },
        {
            title: 'Aksi',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => (
                <Button
                    onClick={() => {
                        getDetailPasien(record.RegistrasiId)
                        settabOrder('1')
                    }}
                    type="primary"
                    // disabled={record.StsKirim}
                    // size='small'
                    icon={<EnterOutlined />}
                    style={{ width: '80px' }}
                >
                    Pilih
                </Button>
            ),
        },
    ];

    const colTbDrhSiap = [
        {
            title: 'No. Order',
            align: 'center',
            dataIndex: 'NoOrder',
            key: 'NoOrder',
            width: 100,
        },
        {
            title: 'No. Kantong',
            align: 'center',
            dataIndex: 'NoKantong',
            key: 'NoKantong',
            width: 100,
        },
        {
            title: 'Tgl. Pemeriksaan',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 100,
            render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
        },
        {
            title: 'No. Registrasi',
            align: 'center',
            dataIndex: 'RegistrasiId',
            key: 'RegistrasiId',
            width: 100,
        },
        {
            title: 'Nama Pasien',
            dataIndex: 'NamaPasien',
            key: 'NamaPasien',
            // width: 60,
        },
        {
            title: 'Alamat',
            dataIndex: 'Alamat',
            key: 'Alamat',
            width: 400,
        },
        {
            title: 'Aksi',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => (
                <Button
                    onClick={() => {
                        getDetailPasien(record.RegistrasiId)
                        settabOrder('1')
                    }}
                    type="primary"
                    // disabled={record.StsKirim}
                    // size='small'
                    icon={<EnterOutlined />}
                    style={{ width: '80px' }}
                >
                    Pilih
                </Button>
            ),
        },
    ];

    // Create a conditional columns array
    const conditionalColumns = flagOrderDarah
        ? [...colTbNonValid] // Include "Aksi" column if flagOrderDarah is true
        : colTbNonValid.filter((col) => col.title !== 'Aksi'); // Exclude "Aksi" column if flagOrderDarah is false

    // Create a conditional columns array
    const conditionalColumnsTbDarahSiap = flagOrderDarah
        ? [...colTbDrhSiap] // Include "Aksi" column if flagOrderDarah is true
        : colTbDrhSiap.filter((col) => col.title !== 'Aksi'); // Exclude "Aksi" column if flagOrderDarah is false


    return (
        <div>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                        Daftar Order Belum Tervalidasi
                    </Divider>
                </Col>
            </Row>

            <Table
                bordered
                loading={spTbInfoRuang}
                columns={conditionalColumns}
                dataSource={listNonValid}
                pagination={false}
            />

            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                <Col span={24}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                        Daftar Order Tervalidasi
                    </Divider>
                </Col>
            </Row>

            <Table
                bordered
                loading={spTbInfoRuang}
                columns={conditionalColumns}
                dataSource={listValid}
                pagination={false}
            />

            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                <Col span={24}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                        Daftar Order Terlayani
                    </Divider>
                </Col>
            </Row>

            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Space>
                        <span>Tanggal :</span>
                        <DatePicker
                            value={tglInfo}
                            onChange={(e) => {
                                settglInfo(dayjs(e))
                                getInfoRuangan(ruangId, dayjs(e).format('YYYY-MM-DD'))
                            }}
                            format="DD-MM-YYYY"
                            allowClear={false}
                        // style={{ width: '50%' }} 
                        />
                    </Space>
                </Col>
            </Row>

            <Table
                bordered
                loading={spTbInfoRuang}
                columns={conditionalColumns}
                dataSource={listTerlayani}
                pagination={false}
            />

            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
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
                loading={spTbInfoRuang}
                columns={conditionalColumnsTbDarahSiap}
                rowClassName={(record, index) => (
                    record.StsAdvice === null ? null : record.StsAdvice ? 'sudah_jawab' : 'belum_jawab'
                )}
                dataSource={listDrhSiapRuang}
                pagination={false}
            />

        </div>
    )
}

export default DaftarOrderRuangan