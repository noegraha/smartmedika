import React, { useContext } from 'react'
import { RadioterapiContext } from '../../context/RadioterapiContext'
import { Card, Checkbox, Col, Divider, Flex, Row, Space, Spin, Table } from 'antd'
import dayjs from 'dayjs'

const DetailRiwayatStsEksterna = () => {
    const {
        noReg,
        cetakStatusEksterna,
        cetakStatusRd,
        cetaklistVolume,

        spReportStsEks,
    } = useContext(RadioterapiContext)

    const columns = [
        {
            title: 'Volume Target',
            dataIndex: 'VOLUME',
            key: 'VOLUME',
            align: 'center',
            width: '90px',
            ellipsis: true,
        },
        {
            title: 'Dosis Total',
            dataIndex: 'DOSIS_TOTAL',
            key: 'DOSIS_TOTAL',
            align: 'center',
            width: '70px',
            ellipsis: true,
        },
        {
            title: 'Dosis / Mingguan',
            dataIndex: 'DOSIS_MINGGUAN',
            key: 'DOSIS_MINGGUAN',
            align: 'center',
            width: '70px',
            ellipsis: true,
        },
        {
            title: 'Jumlah Fraksi / Minggu',
            dataIndex: 'JUMLAH_FRAKSI',
            key: 'JUMLAH_FRAKSI',
            align: 'center',
            width: '90px',
            ellipsis: true,
        },
        {
            title: 'Nomor Lapangan Penyinaran',
            dataIndex: 'NOMOR_PENYINARAN',
            key: 'NOMOR_PENYINARAN',
            align: 'center',
            width: '90px',
            ellipsis: true,
        }
    ];

    return (
        <div>
            <Divider
                orientation='left'
                style={{ backgroundColor: '#FFADAD', margin: '0px' }}>
                Radioterapi - Detail Riwayat Status Eksterna
            </Divider>

            <Spin spinning={spReportStsEks} tip="Loading... 😁">
                <Row>
                    <Col span={3}>
                        <span>
                            Nama
                        </span>
                    </Col>
                    <Col span={9}>
                        <span>
                            : {cetakStatusEksterna.NAMAPASIEN}
                        </span>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={3}>
                        <span>
                            Jenis Kelamin
                        </span>
                    </Col>
                    <Col span={7}>
                        <span>
                            : {cetakStatusEksterna.KELAMIN}
                        </span>
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>
                        Alamat
                    </Col>
                    <Col span={9}>
                        <Space style={{ alignItems: 'flex-start' }}>
                            <span> : </span>
                            <span>{cetakStatusEksterna.ALAMAT}</span>
                        </Space>
                    </Col>
                    <Col span={2}></Col>
                    <Col span={3}>
                        No. Registrasi
                    </Col>
                    <Col span={7}>
                        <Space>
                            <span>:</span>
                            <span>{noReg}</span>
                        </Space>
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>
                        Umur
                    </Col>
                    <Col span={9}>
                        : {cetakStatusEksterna.UMUR} Tahun
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>
                        No. RM
                    </Col>
                    <Col span={9}>
                        : {cetakStatusEksterna.NOPASIEN}
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col span={3}>
                        Diagnosa
                    </Col>
                    <Col span={21}>
                        : {cetakStatusRd ? cetakStatusRd.DIAGNOSA : null}
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>
                        PA
                    </Col>
                    <Col span={21}>
                        : {cetakStatusRd ? cetakStatusRd.HASIL_PA : null}
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>
                        Lokasi Tumor Primer
                    </Col>
                    <Col span={21}>
                        : {cetakStatusRd ? cetakStatusRd.LOKASI_TUMOR : null}
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>
                        Stadium
                    </Col>
                    <Col span={21}>
                        : {cetakStatusRd ? cetakStatusRd.STADIUM : null}
                    </Col>
                </Row>
                <Row>
                    <Col span={3}>
                        Data Klinis
                    </Col>
                    <Col span={21}>
                        : {cetakStatusRd ? cetakStatusRd.DATA_KLINIS : null}
                    </Col>
                </Row>

                <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                    <Col span={3}>
                    </Col>
                    <Col span={21} style={{ paddingLeft: '5px' }}>
                        <Table
                            dataSource={cetaklistVolume}
                            columns={columns}
                            size='small'
                            bordered
                            pagination={false} />
                    </Col>
                </Row>

                <Row>
                    <Col span={3}>
                        Total Penyinaran
                    </Col>
                    <Col span={21}>
                        : {cetakStatusRd ? cetakStatusRd.TOTALPENYINARAN : null}
                    </Col>
                </Row>

                <Row>
                    <Col span={3}>
                        Tindakan
                    </Col>
                    <Col span={21}>
                        <Flex justify='space-between' align='flex-start' style={{ alignItems: 'flex-start' }}>
                            <span>:</span>
                            {
                                cetakStatusRd && cetakStatusRd.TINDAKAN === 'Simulator' ?
                                    <Card
                                        title='Simulator'
                                        size='small'
                                        headStyle={{ backgroundColor: '#FC819E' }}
                                        bodyStyle={{ padding: '6px' }}
                                        style={{ marginTop: '5px', width: 'calc(100% - 10px)' }}>
                                        <Row>
                                            <Col span={4}>
                                                <span>Tgl. Simulator</span>
                                            </Col>
                                            <Col span={8}>
                                                <span>: {cetakStatusRd ? dayjs(cetakStatusRd.TGLSIMULATOR).format('DD-MM-YYYY') : null}</span>
                                            </Col>
                                            <Col span={4}>
                                                <span>Bagian</span>
                                            </Col>
                                            <Col span={8}>
                                                <Space style={{ alignItems: 'flex-start' }}>
                                                    <span>:</span>
                                                    <span>
                                                        {cetakStatusRd.SMLKEPALA === 1 ? 'Kepala Leher, ' : null}
                                                        {cetakStatusRd.SMLTHORAX === 1 ? 'Thorax, ' : null}
                                                        {cetakStatusRd.SMLPELVIS === 1 ? 'Pelvis, ' : null}
                                                        {cetakStatusRd.SMLBRAIN === 1 ? 'Brain, ' : null}
                                                        {cetakStatusRd.SMLABDOMEN === 1 ? 'Abdomen, ' : null}
                                                        {cetakStatusRd.SMLEKSTRIMITAS === 1 ? 'Ekstrimitas, ' : null}
                                                    </span>
                                                </Space>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={4}>
                                                <span>Radiografer</span>
                                            </Col>
                                            <Col span={8}>
                                                <span>: {cetakStatusRd.namaRadio1}</span>
                                            </Col>
                                            <Col span={4}>
                                                <span>Teknis</span>
                                            </Col>
                                            <Col span={8}>
                                                <span>: {cetakStatusRd.TEKNIS}</span>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={4}>
                                                <span>Dokter</span>
                                            </Col>
                                            <Col span={8}>
                                                <span>: {cetakStatusRd.namaDokter}</span>
                                            </Col>
                                        </Row>
                                    </Card>
                                    : cetakStatusRd.TINDAKAN === 'CT-Simulator' ?
                                        <Card
                                            title='CT-Simulator'
                                            size='small'
                                            headStyle={{ backgroundColor: '#FC819E' }}
                                            style={{ marginTop: '5px', width: 'calc(100% - 10px)' }} >
                                            <Row>
                                                <Col span={4}>
                                                    <span>Tgl. CT-Simulator</span>
                                                </Col>
                                                <Col span={8}>
                                                    <span>: {cetakStatusRd ? dayjs(cetakStatusRd.TGLDOSIMETRI).format('DD-MM-YYYY') : null}</span>
                                                </Col>
                                                <Col span={4}>
                                                    <span>Bagian</span>
                                                </Col>
                                                <Col span={8}>
                                                    <Space style={{ alignItems: 'flex-start' }}>
                                                        <span>:</span>
                                                        <span>
                                                            {cetakStatusRd.KEPALA === 1 ? 'Kepala Leher, ' : null}
                                                            {cetakStatusRd.THORAX === 1 ? 'Thorax, ' : null}
                                                            {cetakStatusRd.PELVIS === 1 ? 'Pelvis, ' : null}
                                                            {cetakStatusRd.CRANIO === 1 ? 'Brain, ' : null}
                                                            {cetakStatusRd.ABDOMEN === 1 ? 'Abdomen, ' : null}
                                                            {cetakStatusRd.EKSTRIMITAS === 1 ? 'Ekstrimitas, ' : null}
                                                        </span>
                                                    </Space>
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col span={4}>
                                                    <span>Radiografer</span>
                                                </Col>
                                                <Col span={8}>
                                                    <span>: {cetakStatusRd.namaRadio2}</span>
                                                </Col>
                                            </Row>
                                        </Card>
                                        : null
                            }
                        </Flex>
                    </Col>
                </Row>

                <Row>
                    <Col span={3}>
                        Penyinaran
                    </Col>
                    <Col span={21}>
                        : {cetakStatusRd ? cetakStatusRd.PENYINARAN : null}
                    </Col>
                </Row>

                <Row>
                    <Col span={3}>
                        Catatan
                    </Col>
                    <Col span={21}>
                        <Space style={{ alignItems: 'flex-start' }}>
                            <span> : </span>
                            <span>{cetakStatusRd ? cetakStatusRd.CATATAN : null}</span>
                        </Space>
                    </Col>
                </Row>

            </Spin>
        </div>
    )
}

export default DetailRiwayatStsEksterna