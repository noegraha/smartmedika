import { Button, Card, Col, Descriptions, Row, Modal } from 'antd'
import React, { useContext } from 'react'
import { JadwalRadioterapiContext } from '../context/JadwalRadioterapiContext'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import FormAturJadwal from './FormAturJadwal'

const DetailJadwalRadioterapi = () => {
    const {
        // main
        noAntrian,
        noOrder,
        noReg,
        noPasien,
        nama,
        alamat,
        jenisKelamin,
        tglLahir,
        pembayaran,
        noPenjamin,
        kelas,
        dokter,
        unitOrder,
        diagnosa,
        pemeriksaan,
        katPelayanan,
        katBagian,
        waktu,
        status,
        kodepmr,
        // mst hardcode
        mstKatPelayanan,
        mstKatBagian,
        // spin
        spinDetailJadwal,
        // modal
        mdFormAturJadwal, setmdFormAturJadwal,
        // func
        postDilayani,
    } = useContext(JadwalRadioterapiContext)

    const onKlikAturJadwal = () => {
        setmdFormAturJadwal(true)
    }

    const onCancelAturJadwal = () => {
        setmdFormAturJadwal(false)
    }

    const klikDilayani = () => {
        Modal.confirm({
            title: 'Konfirmasi',
            icon: <ExclamationCircleOutlined />,
            content: 'Apakah Pasien sudah Terlayani?',
            okText: 'Sudah',
            cancelText: 'Belum',
            onOk() {
                let data = {
                    noAntrian: noAntrian,
                    noOrder: noOrder,
                    registrasiId: noReg,
                    kodePmr: kodepmr
                }
                postDilayani(data)
            }
        })
    }

    return (
        <div>
            <Card
                loading={spinDetailJadwal}
                style={{ height: '260px' }}>
                <Row>
                    <Col span={12}>
                        <Descriptions
                            bordered
                            size='small' >
                            <Descriptions.Item label="No Registrasi" span={2}>{noReg}</Descriptions.Item>
                            <Descriptions.Item label="No Pasien">{noPasien}</Descriptions.Item>
                            <Descriptions.Item label="Nama Pasien" span={3}>{nama}</Descriptions.Item>
                            <Descriptions.Item label="Alamat" span={3}>{alamat}</Descriptions.Item>
                            <Descriptions.Item label="Jenis Kelamin" span={2}>
                                {!jenisKelamin ? '' : jenisKelamin === 'L' ? 'Laki-laki' : 'Perempuan'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Tgl Lahir" span={2}>{tglLahir}</Descriptions.Item>
                            <Descriptions.Item label="Pembayaran" span={2}>{pembayaran}</Descriptions.Item>
                            <Descriptions.Item label="No Penjamin" span={2}>{noPenjamin}</Descriptions.Item>
                            <Descriptions.Item label="Kelas" span={3}>{kelas}</Descriptions.Item>
                            <Descriptions.Item label="Dokter" span={3}>{dokter}</Descriptions.Item>
                            <Descriptions.Item label="Unit Order" span={3}>{unitOrder}</Descriptions.Item>
                        </Descriptions>
                    </Col>
                    <Col span={12}>
                        <Descriptions
                            bordered
                            size='small' >
                            <Descriptions.Item label="Diagnosa" span={4}>{diagnosa}</Descriptions.Item>
                            <Descriptions.Item label="Pemeriksaan" span={4}>{pemeriksaan}</Descriptions.Item>
                            <Descriptions.Item label="Kat. Pelayanan" span={2}>
                                {katPelayanan ? mstKatPelayanan.filter(opt => opt.id.includes(katPelayanan)).map(filteredName => (
                                    <span>
                                        {filteredName.desk}
                                    </span>
                                )) : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Kat. Bagian" span={2}>
                                {katBagian ? mstKatBagian.filter(opt => opt.id.includes(katBagian)).map(filteredName => (
                                    <span>
                                        {filteredName.desk}
                                    </span>
                                )) : '-'}
                            </Descriptions.Item>
                            <Descriptions.Item label="Waktu" span={4}>{waktu}</Descriptions.Item>
                            <Descriptions.Item label="No Antrian" span={2}>{noAntrian}</Descriptions.Item>
                            <Descriptions.Item label="Status" span={2}>
                                {status === '1' ? 'Terjadwal' : status === '2' ? 'Terlayani' : 'Belum Terjadwal'}
                            </Descriptions.Item>
                        </Descriptions>

                        <Row style={{ height: 90 }}>
                            <Col span={12} style={{ padding: '3px' }}>
                                <Button
                                    onClick={() => onKlikAturJadwal()}
                                    type='primary'
                                    disabled={!noOrder ? true : false}
                                    style={{ height: '100%', width: '100%', fontSize: 20 }}>
                                    ATUR JADWAL
                                </Button>
                            </Col>
                            <Col span={12} style={{ padding: '3px' }}>
                                <Button
                                    onClick={() => klikDilayani()}
                                    type='text'
                                    disabled={!noOrder || !noAntrian ? true : false}
                                    style={{ height: '100%', width: '100%', backgroundColor: '#95de64', color: 'white', fontSize: 20 }}>
                                    DILAYANI
                                </Button>
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </Card>

            <Modal
                visible={mdFormAturJadwal}
                onCancel={() => onCancelAturJadwal()}
                closable={false}
                footer={null}
                width={800}
                style={{ top: 100 }} >
                <FormAturJadwal />
            </Modal>
        </div>
    )
}

export default DetailJadwalRadioterapi