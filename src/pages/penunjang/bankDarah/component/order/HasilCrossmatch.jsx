import { Button, Col, Divider, Input, Modal, Row, Select, Space, Spin, Table } from 'antd'
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react'
import { BankDarahContext } from '../../context/BankDarahContext';
import { CloudDownloadOutlined, EnterOutlined, EditTwoTone } from '@ant-design/icons';
import '../../style/style.css'

const { Option } = Select;
const { TextArea } = Input;

const HasilCrossmatch = () => {
    const {
        ktgjnsDarah,
        dtPasien,
        listDokter,
        listDarahSiap,
        listAdvice,
        getListDokter,
        insertJwbAdvice,
        insertKetRuangan,
        spTbKantongSiap,
        spJawabAdvice,
        mdJawabAdvice, setmdJawabAdvice,
        mdKetRuangan, setmdKetRuangan,
    } = useContext(BankDarahContext)

    const [dtAdvice, setdtAdvice] = useState([])
    const [dtCm, setdtCm] = useState([])
    const [jwbAdv, setjwbAdv] = useState()
    const [tglJwbAdv, settglJwbAdv] = useState(dayjs())
    const [idCm, setidCm] = useState()
    const [ketRuangan, setketRuangan] = useState()

    const columns = [
        {
            title: 'Tanggal',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            // width: 70,
            render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
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
            render: (jenisDarah) => {
                const matchingData = ktgjnsDarah.find((item) => item.id === jenisDarah);
                return matchingData ? matchingData.desk : 'Tidak ditemukan';
            },
        },
        {
            title: 'Ket. Pengambilan',
            dataIndex: 'KetRuangan',
            key: 'KetRuangan',
        },
        {
            title: 'Aksi',
            align: 'center',
            width: 50,
            render: (text, record, index) => (
                <Button
                    onClick={() => klikKetRuangan(record)}
                    // type="primary"
                    icon={<EditTwoTone twoToneColor="#52c41a" />}
                    // disabled={record.StsDatang}
                    size='small'
                    style={{ width: '30px' }}
                />
            ),
        },
    ];

    const colTbAdvice = [
        {
            title: 'Tanggal',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 70,
            render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
        },
        {
            title: 'No. Kantong',
            align: 'center',
            dataIndex: 'NoKantong',
            key: 'NoKantong',
            width: 70,
        },
        {
            title: 'Gol. Darah',
            align: 'center',
            dataIndex: 'GolDarah',
            key: 'GolDarah',
            width: 30,
        },
        {
            title: 'Rhesus',
            align: 'center',
            dataIndex: 'Rhesus',
            key: 'Rhesus',
            width: 30,
        },
        // {
        //     title: 'Jml. cc',
        //     align: 'center',
        //     dataIndex: 'JmlCc',
        //     key: 'JmlCc',
        //     // width: 55,
        // },
        {
            title: 'Jns. Komp',
            align: 'center',
            dataIndex: 'JenisKomponen',
            key: 'JenisKomponen',
            width: 30,
            // render: (jenisDarah) => {
            //     const matchingData = ktgjnsDarah.find((item) => item.id === jenisDarah);
            //     return matchingData ? matchingData.desk : 'Tidak ditemukan';
            // },
        },
        {
            title: 'Kesimpulan',
            // align: 'center',
            dataIndex: 'Kesimpulan',
            key: 'Kesimpulan',
            // width: 55,
        },
        {
            title: 'Saran',
            // align: 'center',
            dataIndex: 'Saran',
            key: 'Saran',
            // width: 55,
        },
        {
            title: 'Jawaban',
            // align: 'center',
            dataIndex: 'JawabanAdvice',
            key: 'JawabanAdvice',
            // width: 55,
        },
        {
            title: 'Aksi',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => (
                <div>
                    <Button
                        onClick={() => {
                            klikAdvice(record)
                        }}
                        icon={<EnterOutlined />}
                        size='small'
                        style={{ marginTop: '2px' }}>
                        Advice
                    </Button>
                </div>
            ),
        },
    ];

    const colTbCmAdvice = [
        {
            title: 'No. Kantong',
            align: 'center',
            dataIndex: 'NoKantong',
            key: 'NoKantong',
            width: 90,
        },
        {
            title: 'Tehnik Gel Test',
            children: [
                {
                    title: 'Mayor',
                    align: 'center',
                    dataIndex: 'Mayor',
                    key: 'Mayor',
                    // width: 40,
                },
                {
                    title: 'Minor',
                    align: 'center',
                    dataIndex: 'Minor',
                    key: 'Minor',
                    // width: 40,
                },
                {
                    title: 'Auto Control',
                    align: 'center',
                    dataIndex: 'AutoControl',
                    key: 'AutoControl',
                    // width: 40,
                },
                {
                    title: 'DCT',
                    align: 'center',
                    dataIndex: 'Dct',
                    key: 'Dct',
                    // width: 40,
                },
            ],
        },
        {
            title: 'Keterangan',
            // align: 'center',
            dataIndex: 'Keterangan',
            key: 'Keterangan',
        },
    ];

    const klikAdvice = (data) => {
        setmdJawabAdvice(true)
        setdtAdvice(data)
        setdtCm([data])
        setjwbAdv(data.JawabanAdvice)
        settglJwbAdv(data.TglAdviceJawab ? data.TglAdviceJawab : dayjs())
    }

    const klikSimpanAdvice = () => {
        if (!jwbAdv) {
            Modal.warning({ title: 'Peringatan!', content: 'Jawaban masih kosong!' })
        }
        else {
            let data = {}

            data.id = dtAdvice.Id;
            data.stsAdvice = true;
            data.jawabanAdvice = jwbAdv;
            // data.tglAdviceJawab = dayjs().format();
            // data.tglUpdateAdvice = dayjs().format();

            console.log('klikSimpanAdvice : ', data);
            insertJwbAdvice(data)
        }
    }

    const klikKetRuangan = (data) => {
        setmdKetRuangan(true)
        setidCm(data.Id)
        setketRuangan(data.KetRuangan)
    }

    const klikSimpanKetRuangan = () => {
        if (!ketRuangan) {
            Modal.warning({ title: 'Peringatan!', content: 'Informasi pengambilan masih kosong!' })
        }
        else {
            let data = {}

            data.id = idCm;
            data.ketRuangan = ketRuangan;
            // data.tglAdviceJawab = dayjs().format();
            // data.tglUpdateAdvice = dayjs().format();

            console.log('klikSimpanKetRuangan : ', data);
            insertKetRuangan(data)
        }
    }

    return (
        <div>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                        Daftar Hasil Crossmatch
                    </Divider>
                </Col>
            </Row>

            <Table
                bordered
                loading={spTbKantongSiap}
                columns={columns}
                dataSource={listDarahSiap}
                pagination={false}
            />

            <Row style={{ marginTop: '5px', marginBottom: '5px' }}>
                <Col span={24}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                        Advice Dokter
                    </Divider>
                </Col>
            </Row>

            <Table
                bordered
                loading={spTbKantongSiap}
                rowClassName={(record, index) => (
                    record.StsAdvice === null ? null : record.StsAdvice === false ? 'belum_jawab' : 'sudah_jawab'
                )}
                columns={colTbAdvice}
                dataSource={listAdvice}
                pagination={false}
            />



            {/* MD ADVICE */}
            <Modal
                centered
                open={mdJawabAdvice}
                closable={false}
                footer={null}
                width={800}
            >
                <Row>
                    <Col span={24}>
                        <Divider
                            style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                            Form Jawab Advice
                        </Divider>
                    </Col>
                </Row>

                <Spin spinning={spJawabAdvice}>
                    <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                        <Col span={4}>
                            Kepada :
                        </Col>
                        <Col span={8}>
                            <Input.Group compact>
                                <Select
                                    style={{ width: '85%' }}
                                    placeholder="..."
                                    value={dtAdvice ? dtAdvice.DokterAdvice : null}
                                    // onChange={(e) => setdrAdvice(e)}
                                    // size='small'
                                    showSearch={true}
                                    readOnly
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {listDokter.map((opt, index) => (
                                        <Option key={index} value={opt.dokterId}>{opt.namaDokter}</Option>
                                    ))}
                                </Select>
                                <Button
                                    type="primary"
                                    // disabled={!tinggiBadan}
                                    onClick={() => getListDokter()}
                                    style={{ width: "15%" }}
                                    icon={<CloudDownloadOutlined />}
                                />
                            </Input.Group>
                        </Col>
                    </Row>

                    {/* <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Tempat :
                        </Col>
                        <Col span={8}>
                            <Input placeholder="..."
                                value={dtAdvice ? dtAdvice.KetTempat : null}
                                readOnly
                                // size='small'
                                style={{ width: '100%' }} />
                        </Col>
                    </Row> */}

                    <Row>
                        <Col>
                            <span>Dengan hormat,</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={1}>
                        </Col>
                        <Col>
                            <span>Dari hasil pemeriksaan uji cocok serasi untuk Os :</span>
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Nama :
                        </Col>
                        <Col span={8}>
                            <Input placeholder="..."
                                value={dtPasien.Nama}
                                // onChange={(e) => setindTrans(e.target.value)}
                                // size='small'
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                        <Col span={2}>
                            <span style={{ marginLeft: '10px' }}>Umur :</span>
                        </Col>
                        <Col span={3}>
                            <Input placeholder="..."
                                addonAfter='Tahun'
                                value={dtPasien.Umur}
                                // onChange={(e) => setindTrans(e.target.value)}
                                // size='small'
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Ruang Perawatan :
                        </Col>
                        <Col span={8}>
                            <Input placeholder="..."
                                value={dtAdvice ? dtAdvice.Deskripsi : null}
                                // onChange={(e) => setindTrans(e.target.value)}
                                // size='small'
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Golongan Darah :
                        </Col>
                        <Col span={8}>
                            <Input placeholder="..."
                                value={dtAdvice ? dtAdvice.GolDa : null}
                                // onChange={(e) => setindTrans(e.target.value)}
                                // size='small'
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <Row>
                        <Col>
                            <span>Hasil uji cocok serasi dengan metode Gell Test (Diamed)</span>
                        </Col>
                    </Row>

                    <Table
                        bordered
                        // loading={spTmbahHasil}
                        columns={colTbCmAdvice}
                        dataSource={dtCm}
                        pagination={false}
                        style={{ marginBottom: '2px' }}
                    />

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Kesimpulan :
                        </Col>
                        <Col span={20}>
                            <TextArea
                                value={dtAdvice ? dtAdvice.Kesimpulan : null}
                                rows={2}
                                placeholder="..."
                                readOnly
                                maxLength={500}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Saran :
                        </Col>
                        <Col span={20}>
                            <TextArea
                                value={dtAdvice ? dtAdvice.Saran : null}
                                rows={2}
                                placeholder="..."
                                maxLength={500}
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Tgl. Advice :
                        </Col>
                        <Col span={8}>
                            <Input placeholder="..."
                                value={dtAdvice ? dayjs(dtAdvice.TglAdvice).format('DD-MM-YYYY HH:mm') : null}
                                // onChange={(e) => settempat(e.target.value)}
                                // size='small'
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col>
                            <span>Demikian pemberitahuan ini kami sampaikan, atas perhatiannya diucapkan terima kasih.</span>
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={24}>
                            <Divider
                                style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                                Jawaban Advice
                            </Divider>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '5px', marginBottom: '2px' }}>
                        <Col span={24}>
                            <TextArea
                                value={jwbAdv}
                                onChange={(e) => setjwbAdv(e.target.value)}
                                rows={2}
                                placeholder="..."
                                maxLength={500}
                            />
                        </Col>
                    </Row>

                    <Row >
                        <Col span={4}>
                            Tgl. Jawab Advice :
                        </Col>
                        <Col span={8}>
                            <Input placeholder="..."
                                value={dayjs(tglJwbAdv.TglAdvice).format('DD-MM-YYYY HH:mm')}
                                // onChange={(e) => settempat(e.target.value)}
                                // size='small'
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <Divider style={{ marginBottom: '2px' }} />

                    <Row style={{ marginBottom: '10px' }}>
                        <Col span={24}>
                            <Space
                                style={{ float: 'right' }}>
                                <Button
                                    onClick={() => klikSimpanAdvice()}
                                    type='primary'
                                    style={{ width: '150px' }}>
                                    Simpan
                                </Button>
                                <Button
                                    onClick={() => setmdJawabAdvice(false)}
                                    style={{ width: '100px' }}>
                                    Batal
                                </Button>
                            </Space>
                        </Col>
                    </Row>

                </Spin>

            </Modal>

            {/* MD INSERT Ket. Ruangan */}
            <Modal
                centered
                open={mdKetRuangan}
                onCancel={() => setmdKetRuangan(false)}
                closable={false}
                footer={null}
                width={500}
            >
                <Divider
                    orientation='left'
                    style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                    Tambah Informasi Pengambilan
                </Divider>

                <Spin spinning={spTbKantongSiap}>
                    <Row style={{ marginTop: '5px' }}>
                        <Col span={4}>
                            Informasi pengambilan :
                        </Col>
                        <Col span={20}>
                            <TextArea
                                rows={4}
                                value={ketRuangan}
                                onChange={(e) => setketRuangan(e.target.value)}
                                maxLength={500}
                                // size='small' 
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col span={24}>
                            <Space style={{ float: 'right' }}>
                                <Button
                                    onClick={() => klikSimpanKetRuangan()}
                                    type='primary'
                                    style={{ width: '100px' }}
                                >
                                    Simpan
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Spin>

            </Modal>
        </div>
    )
}

export default HasilCrossmatch