import { CheckSquareOutlined, CheckSquareTwoTone, CloudDownloadOutlined, ExclamationCircleFilled } from '@ant-design/icons';
import { Button, Col, DatePicker, Divider, Input, Modal, Row, Select, Space, Spin, Table, Tag, Typography } from 'antd'
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react'
import { BankDarahContext } from '../context/BankDarahContext';
import "../style/style.css";

const { Option } = Select;
const { confirm } = Modal;

const PenyerahanDarah = () => {
    const {
        dtOrder,
        listHubKlg,
        listKirim,
        tglKirim, settglKirim,
        noKtgKirim, setnoKtgKirim,
        namaPenerima, setnamaPenerima,
        umurPenerima, setumurPenerima,
        alamatPenerima, setalamatPenerima,
        ruangPenerima, setruangPenerima,
        golDarahCek, setgolDarahCek,
        ptgKirim, setptgKirim,
        hubklgPenerima, sethubklgPenerima,
        noHpPenerima, setnoHpPenerima,
        userValid,
        getListHubKel,
        insertKirimDarah,
        insertTerlayani,
        mdKirimDarah, setmdKirimDarah,
        spTbPasien,
        spTbDaftarKirim,
        spTerlayani,
    } = useContext(BankDarahContext)

    const [idCm, setidCm] = useState()
    const [noOrder, setnoOrder] = useState()
    const [mdDetailKirim, setmdDetailKirim] = useState(false)
    const [tglPmrCm, settglPmrCm] = useState(dayjs())

    const columnsa = [
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
            width: 50,
        },
        {
            title: 'Rhesus',
            align: 'center',
            dataIndex: 'Rhesus',
            key: 'Rhesus',
            width: 60,
        },
        {
            title: 'Jml. cc',
            align: 'center',
            dataIndex: 'JmlCc',
            key: 'JmlCc',
            width: 55,
        },
        {
            title: 'Jenis Komponen',
            align: 'center',
            dataIndex: 'JenisKomponen',
            key: 'JenisKomponen',
            width: 80,
        },
        {
            title: 'Tehnik Gel Test',
            children: [
                {
                    title: 'My',
                    align: 'center',
                    dataIndex: 'Mayor',
                    key: 'Mayor',
                    width: 40,
                },
                {
                    title: 'Mn',
                    align: 'center',
                    dataIndex: 'Minor',
                    key: 'Minor',
                    width: 40,
                },
                {
                    title: 'AC',
                    align: 'center',
                    dataIndex: 'AutoControl',
                    key: 'AutoControl',
                    width: 40,
                },
                {
                    title: 'DCT',
                    align: 'center',
                    dataIndex: 'Dct',
                    key: 'Dct',
                    width: 40,
                },
            ],
        },
        {
            title: 'Hasil',
            align: 'center',
            dataIndex: 'Hasil',
            key: 'Hasil',
            width: 90,
            render: Hasil => (
                <Tag color={Hasil ? 'green' : 'red'}>
                    {Hasil ? 'Compatible' : 'Incompatible'}
                </Tag>
            ),
        },
        {
            title: 'Keterangan',
            align: 'center',
            dataIndex: 'Keterangan',
            key: 'Keterangan',
        },
        {
            title: 'Info. Ruangan',
            // align: 'center',
            dataIndex: 'KetRuangan',
            key: 'KetRuangan',
        },
        {
            title: 'Tanggal',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 70,
            render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
        },
        {
            title: 'Petugas',
            align: 'center',
            dataIndex: 'UserId',
            key: 'UserId',
            width: 80,
        },
        {
            title: 'Aksi',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => (
                <Space direction="vertical">
                    <Button
                        onClick={() => klikKirim(index, record.NoKantong, record.Id, record.NoOrder, record.TglPemeriksaan)}
                        type="primary"
                        disabled={record.StsKirim}
                        size='small'
                        style={{ width: '80px' }}
                    >
                        Kirim
                    </Button>
                    <Button
                        onClick={() => klikDetail(record)}
                        disabled={!record.StsKirim}
                        size='small'
                        style={{ width: '80px' }}
                    >
                        Detail Kirim
                    </Button>
                </Space>
            ),
        },
    ];

    const columnsc = [
        {
            title: 'Jenis Darah',
            dataIndex: 'JenisDarah',
            key: 'JenisDarah',
            // render: (jenisDarah) => {
            //     const matchingData = ktgjnsDarah.find((item) => item.id === jenisDarah);
            //     return matchingData ? matchingData.desk : 'Tidak ditemukan';
            // },
        },
        {
            title: 'Kantong',
            dataIndex: 'JmlKantong',
            key: 'JmlKantong',
            align: 'center',
            width: 50,
        },
        // {
        //     title: 'Serasi',
        //     dataIndex: 'Serasi',
        //     key: 'Serasi',
        //     align: 'center',
        //     width: 50,
        // },
        // {
        //     title: <CheckSquareTwoTone twoToneColor="#52c41a" />,
        //     // dataIndex: 'Serasi',
        //     // key: 'Serasi',
        //     align: 'center',
        //     width: 50,
        // },
        // {
        //     title: 'Terkirim',
        //     // dataIndex: 'Serasi',
        //     // key: 'Serasi',
        //     align: 'center',
        //     width: 50,
        // },
    ];

    const rstFormPenerimaan = (noKtg, id, noOrder) => {
        setidCm(id)
        setnoOrder(noOrder)
        settglKirim(dayjs())
        setnoKtgKirim(noKtg)
        setnamaPenerima()
        setumurPenerima()
        setalamatPenerima()
        setruangPenerima()
        setgolDarahCek()
        setptgKirim(userValid)
        sethubklgPenerima()
        setnoHpPenerima()
    }

    const klikDetail = (data) => {
        console.log('klikDetail : ', data);
        setmdDetailKirim(true)
        settglKirim(dayjs(data.TglPengiriman))
        setnoKtgKirim(data.NoKantong)
        setnamaPenerima(data.NamaPenerima)
        setumurPenerima(data.UmurPenerima)
        setalamatPenerima(data.AlamatPenerima)
        setruangPenerima(data.RuangPenerima)
        setgolDarahCek(data.GolDarahCek)
        setptgKirim(data.UserIdPetugas)
        sethubklgPenerima(data.HubPenerima)
        setnoHpPenerima(data.NoHp)
    }

    const klikKirim = (index, noKtg, id, noOrder, tglPmr) => {
        console.log('klikKirim : ', index);
        if (dayjs(tglPmr) > dayjs()) {
            Modal.warning({ title: 'Peringatan!', content: 'Waktu pemeriksaan darah lebih BESAR dari waktu pengiriman, klik Kirim kembali untuk memperbarui waktu!' })
        }
        else {
            rstFormPenerimaan(noKtg, id, noOrder)
            settglPmrCm(tglPmr)
            setmdKirimDarah(true)
        }
    }

    const klikSimpanKirim = () => {
        if (!idCm) {
            Modal.warning({ title: 'Peringatan!', content: 'Id Kantong Kosong!' })
        }
        else if (!noOrder) {
            Modal.warning({ title: 'Peringatan!', content: 'No Order Kosong!' })
        }
        else if (!namaPenerima) {
            Modal.warning({ title: 'Peringatan!', content: 'Nama Penerima Kosong!' })
        }
        else if (!umurPenerima) {
            Modal.warning({ title: 'Peringatan!', content: 'Umur Penerima Kosong!' })
        }
        else if (!hubklgPenerima) {
            Modal.warning({ title: 'Peringatan!', content: 'Hubungan Keluarga Kosong!' })
        }
        else if (isNaN(umurPenerima)) {
            Modal.warning({ title: 'Peringatan!', content: 'Umur Penerima bukan Angka!' })
        }
        else if (!alamatPenerima) {
            Modal.warning({ title: 'Peringatan!', content: 'Alamat Penerima Kosong!' })
        }
        else if (!ruangPenerima) {
            Modal.warning({ title: 'Peringatan!', content: 'Ruang Penerima Kosong!' })
        }
        else if (!golDarahCek) {
            Modal.warning({ title: 'Peringatan!', content: 'Golongan Darah Cek Kantong Kosong!' })
        }
        else if (!ptgKirim) {
            Modal.warning({ title: 'Peringatan!', content: 'User Petugas Kosong!' })
        }
        else if (dayjs(tglPmrCm) > dayjs(tglKirim)) {
            Modal.warning({ title: 'Peringatan!', content: 'Waktu pemeriksaan darah lebih BESAR dari waktu pengiriman, klik Kirim kembali untuk memperbarui waktu!' })
        }
        else {
            let data = {}

            data.id = idCm;
            data.noOrder = noOrder;
            data.tglPengiriman = dayjs(tglKirim).format();
            data.namaPenerima = namaPenerima.toUpperCase();;
            data.umurPenerima = umurPenerima;
            data.alamatPenerima = alamatPenerima.toUpperCase();;
            data.ruangPenerima = ruangPenerima.toUpperCase();;
            data.golDarahCek = golDarahCek;
            data.userIdPetugas = ptgKirim;
            data.hubPenerima = hubklgPenerima;
            data.noHp = noHpPenerima;

            console.log('klikSimpanKirim : ', data);
            insertKirimDarah(data);
        }
    }

    const klikTerlayani = () => {
        if (dtOrder.StatusValid.trim() === '2') {
            Modal.warning({ title: 'Peringatan!', content: 'Order Sudah Terlayani!' })
        }
        else {
            confirm({
                title: 'Yakin orderan ini sudah terlayani?',
                icon: <ExclamationCircleFilled />,
                content: `No. Order : ${dtOrder.NoOrder}`,
                okText: 'Terlayani',
                okType: 'primary',
                cancelText: 'Tidak',
                onOk() {
                    let data = {}

                    // data.id = id
                    // data.noKantong = kantong;
                    data.noOrder = dtOrder.NoOrder;

                    console.log('klikTerlayani : ', data);
                    insertTerlayani(data)
                },
            });
        }
    }

    return (
        <div>
            <Spin spinning={spTerlayani}>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Jenis Darah yang Diminta :
                    </Col>
                    <Col span={12}>
                        <Table
                            bordered
                            loading={spTbPasien}
                            columns={columnsc}
                            dataSource={dtOrder.DetailOrder}
                            pagination={false}
                        />
                    </Col>
                    <Col span={8}>
                        <Button
                            onClick={() => klikTerlayani()}
                            type='primary'
                            icon={<CheckSquareOutlined />}
                            // disabled
                            style={{ width: '98%', marginLeft: '2%', height: '100%', fontSize: 'xxx-large' }}>
                            TERLAYANI
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Divider
                            orientation='left'
                            style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                            Informasi dan Penyerahan Kantong Darah
                        </Divider>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                    <Col span={24}>
                        <Table
                            bordered
                            rowClassName={(record, index) => (
                                record.StsKirim ? "sudah_kirim" : "belum_kirim"
                            )}
                            loading={spTbDaftarKirim}
                            columns={columnsa}
                            dataSource={listKirim}
                            pagination={false}
                            scroll={{
                                x: 1000,
                                // y: 300,
                            }}
                        />
                    </Col>
                </Row>
            </Spin>

            {/* MD FORM SERAH TERIMA DARAH */}
            <Modal
                // centered
                open={mdKirimDarah}
                closable={false}
                footer={null}
                width={500}
                style={{
                    top: 180,
                }}
            >
                <Row>
                    <Col span={24}>
                        <Divider
                            style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                            Penyerahan Kantong Darah
                        </Divider>
                    </Col>
                </Row>

                <Spin spinning={spTbDaftarKirim}>
                    <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                        <Col span={5}>
                            Tgl. Pengiriman :
                        </Col>
                        <Col span={7}>
                            <Input placeholder="..."
                                value={dayjs(tglKirim).format('DD-MM-YYYY HH:mm')}
                                // onChange={(e) => setNoKantong(e.target.value)}
                                readOnly
                                style={{ width: '90%' }} />
                        </Col>

                        <Col span={5}>
                            No. Kantong :
                        </Col>
                        <Col span={7}>
                            <Input placeholder="..."
                                value={noKtgKirim}
                                // onChange={(e) => setNoKantong(e.target.value)}
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Nama Penerima :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={namaPenerima}
                                onChange={(e) => setnamaPenerima(e.target.value)}
                                // disabled={disMdCm}
                                maxLength={100}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Umur :
                        </Col>
                        <Col span={7}>
                            <Input placeholder="..."
                                addonAfter='Tahun'
                                value={umurPenerima}
                                onChange={(e) => setumurPenerima(e.target.value)}
                                // disabled={disMdCm}
                                maxLength={2}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Hub. Keluarga :
                        </Col>
                        <Col span={19}>
                            <Input.Group compact>
                                <Select
                                    style={{ width: '85%' }}
                                    placeholder="..."
                                    value={hubklgPenerima}
                                    onChange={(e) => sethubklgPenerima(e)}
                                    // size='small'
                                    showSearch={true}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {listHubKlg.map((opt, index) => (
                                        <Option key={index} value={opt.hubunganId}>{opt.deskripsi}</Option>
                                    ))}
                                </Select>
                                <Button
                                    type="primary"
                                    // disabled={!tinggiBadan}
                                    onClick={() => getListHubKel()}
                                    style={{ width: "15%" }}
                                    icon={<CloudDownloadOutlined />}
                                />
                            </Input.Group>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Alamat :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={alamatPenerima}
                                onChange={(e) => setalamatPenerima(e.target.value)}
                                // disabled={disMdCm}
                                maxLength={255}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            No. HP :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={noHpPenerima}
                                onChange={(e) => setnoHpPenerima(e.target.value)}
                                // disabled={disMdCm}
                                maxLength={13}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Asal Ruang :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={ruangPenerima}
                                onChange={(e) => setruangPenerima(e.target.value)}
                                // disabled={disMdCm}
                                maxLength={100}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Gol. Darah :
                        </Col>
                        <Col span={19}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={golDarahCek}
                                onChange={(e) => setgolDarahCek(e)}
                            >
                                <Option key='1' value='A'>A</Option>
                                <Option key='2' value='B'>B</Option>
                                <Option key='3' value='AB'>AB</Option>
                                <Option key='4' value='O'>O</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            User Petugas :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={ptgKirim}
                                // onChange={(e) => setruangPenerima(e.target.value)}
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <Divider style={{ marginBottom: '2px' }} />

                    <Row>
                        <Col span={24}>
                            <Space
                                style={{ float: 'right' }}>
                                <Button
                                    onClick={() => klikSimpanKirim()}
                                    type='primary'
                                    style={{ width: '150px' }}>
                                    Simpan
                                </Button>
                                <Button
                                    onClick={() => setmdKirimDarah(false)}
                                    style={{ width: '100px' }}>
                                    Batal
                                </Button>
                            </Space>
                        </Col>
                    </Row>
                </Spin>

            </Modal>

            {/* MD FORM DETAIL SERAH TERIMA DARAH */}
            <Modal
                // centered
                open={mdDetailKirim}
                onCancel={() => setmdDetailKirim(false)}
                closable={false}
                footer={null}
                width={500}
                style={{
                    top: 180,
                }}
            >
                <Row>
                    <Col span={24}>
                        <Divider
                            style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                            Penyerahan Kantong Darah
                        </Divider>
                    </Col>
                </Row>

                <Spin spinning={spTbDaftarKirim}>
                    <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                        <Col span={5}>
                            Tgl. Pengiriman :
                        </Col>
                        <Col span={7}>
                            <Input placeholder="..."
                                value={dayjs(tglKirim).format('DD-MM-YYYY HH:mm')}
                                // onChange={(e) => setNoKantong(e.target.value)}
                                readOnly
                                style={{ width: '90%' }} />
                        </Col>

                        <Col span={5}>
                            No. Kantong :
                        </Col>
                        <Col span={7}>
                            <Input placeholder="..."
                                value={noKtgKirim}
                                // onChange={(e) => setNoKantong(e.target.value)}
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Nama Penerima :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={namaPenerima}
                                // onChange={(e) => setnamaPenerima(e.target.value)}
                                // disabled={disMdCm}
                                maxLength={100}
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Umur :
                        </Col>
                        <Col span={7}>
                            <Input placeholder="..."
                                addonAfter='Tahun'
                                value={umurPenerima}
                                // onChange={(e) => setumurPenerima(e.target.value)}
                                // disabled={disMdCm}
                                maxLength={2}
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Hub. Keluarga :
                        </Col>
                        <Col span={19}>
                            <Input.Group compact>
                                <Select
                                    style={{ width: '85%' }}
                                    placeholder="..."
                                    value={hubklgPenerima}
                                    // onChange={(e) => setdrAdvice(e)}
                                    // size='small'
                                    readOnly
                                    showSearch={true}
                                    filterOption={(input, option) =>
                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    }
                                >
                                    {listHubKlg.map((opt, index) => (
                                        <Option key={index} value={opt.hubunganId}>{opt.deskripsi}</Option>
                                    ))}
                                </Select>
                                <Button
                                    type="primary"
                                    // disabled={!tinggiBadan}
                                    onClick={() => getListHubKel()}
                                    style={{ width: "15%" }}
                                    icon={<CloudDownloadOutlined />}
                                />
                            </Input.Group>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Alamat :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={alamatPenerima}
                                // onChange={(e) => setalamatPenerima(e.target.value)}
                                // disabled={disMdCm}
                                maxLength={255}
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            No. HP :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={noHpPenerima}
                                // onChange={(e) => setalamatPenerima(e.target.value)}
                                // disabled={disMdCm}
                                readOnly
                                maxLength={13}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Asal Ruang :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={ruangPenerima}
                                // onChange={(e) => setruangPenerima(e.target.value)}
                                // disabled={disMdCm}
                                maxLength={10}
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            Gol. Darah :
                        </Col>
                        <Col span={19}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={golDarahCek}
                                readOnly
                            // onChange={(e) => setgolDarahCek(e)}
                            >
                                <Option key='1' value='A'>A</Option>
                                <Option key='2' value='B'>B</Option>
                                <Option key='3' value='AB'>AB</Option>
                                <Option key='4' value='O'>O</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={5}>
                            User Petugas :
                        </Col>
                        <Col span={19}>
                            <Input placeholder="..."
                                value={ptgKirim}
                                // onChange={(e) => setruangPenerima(e.target.value)}
                                readOnly
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                </Spin>

            </Modal>

        </div>
    )
}

export default PenyerahanDarah

//     < Row style = {{ marginBottom: '2px' }}>
//         <Col span={4}>
//             Entry darah :
//         </Col>
// <Col span={1}>
//                     <span>:</span>
//                 </Col>
// <Col span={20}>
//     <Select
//         style={{ width: '100%' }}
//         placeholder="..."
//         // value={perawat}
//         // onChange={(e) => changeUnit(e)}
//         size='small'
//     // showSearch={true}
//     // filterOption={(input, option) =>
//     //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//     // }
//     >
//         <Option key='1' value='Sudah'>Sudah</Option>
//         <Option key='2' value='Belum'>Belum</Option>
//     </Select>
// </Col>
//             </Row >
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Konfirmasi darah siap pakai :
//                 </Col>
//                 {/* <Col span={1}>
//                     <span>:</span>
//                 </Col> */}
//                 <Col span={20}>
//                     <Select
//                         style={{ width: '100%' }}
//                         placeholder="..."
//                         // value={perawat}
//                         // onChange={(e) => changeUnit(e)}
//                         size='small'
//                     // showSearch={true}
//                     // filterOption={(input, option) =>
//                     //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                     // }
//                     >
//                         <Option key='1' value='Sudah'>Sudah</Option>
//                         <Option key='2' value='Belum'>Belum</Option>
//                     </Select>
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Tanggal :
//                 </Col>
//                 {/* <Col span={1}>
//                     <span>:</span>
//                 </Col> */}
//                 <Col span={20}>
//                     <DatePicker
//                         size="small"
//                         // disabled={props.disabledTglPendHd}
//                         value={dayjs()}
//                         format={"DD-MM-YYYY HH:mm"}
//                         showTime
//                         disabled
//                         allowClear={false}
//                         style={{ width: '20%' }}
//                     // onChange={props.changeDatePendHd}
//                     />
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Cek Identitas (darah+SPDT) :
//                 </Col>
//                 {/* <Col span={1}>
//                     <span>:</span>
//                 </Col> */}
//                 <Col span={20}>
//                     <Select
//                         style={{ width: '100%' }}
//                         placeholder="..."
//                         // value={perawat}
//                         // onChange={(e) => changeUnit(e)}
//                         size='small'
//                     // showSearch={true}
//                     // filterOption={(input, option) =>
//                     //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                     // }
//                     >
//                         <Option key='1' value='Cocok'>Cocok</Option>
//                         <Option key='2' value='Tidak Cocok'>Tidak Cocok</Option>
//                     </Select>
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col>
//                     <Typography.Text underline>Isi Form serah terima darah :</Typography.Text>
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Nama :
//                 </Col>
//                 {/* <Col span={1}>
//                     <span>:</span>
//                 </Col> */}
//                 <Col span={20}>
//                     <Input placeholder="..." size='small' style={{ width: '100%' }} />
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Umur :
//                 </Col>
//                 {/* <Col span={1}>
//                     <span>:</span>
//                 </Col> */}
//                 <Col span={20}>
//                     <Input placeholder="..." size='small' style={{ width: '100%' }} />
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Alamat :
//                 </Col>
//                 {/* <Col span={1}>
//                     <span>:</span>
//                 </Col> */}
//                 <Col span={20}>
//                     <Input placeholder="..." size='small' style={{ width: '100%' }} />
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Ruang :
//                 </Col>
//                 {/* <Col span={1}>
//                     <span>:</span>
//                 </Col> */}
//                 <Col span={20}>
//                     <Input placeholder="..." size='small' style={{ width: '100%' }} />
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Golongan Darah :
//                 </Col>
//                 {/* <Col span={1}>
//                     <span>:</span>
//                 </Col> */}
//                 <Col span={20}>
//                     <Input placeholder="..." size='small' style={{ width: '100%' }} />
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Jika sesuai darah diserahkan :
//                 </Col>
//                 <Col span={20}>
//                     <Select
//                         style={{ width: '100%' }}
//                         placeholder="..."
//                         // value={perawat}
//                         // onChange={(e) => changeUnit(e)}
//                         size='small'
//                     // showSearch={true}
//                     // filterOption={(input, option) =>
//                     //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
//                     // }
//                     >
//                         <Option key='1' value='Ya'>Ya</Option>
//                         <Option key='2' value='Tidak'>Tidak</Option>
//                     </Select>
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Nama Kel.Pasien yang mengambil :
//                 </Col>
//                 <Col span={20}>
//                     <Input placeholder="..." size='small' style={{ width: '100%' }} />
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '2px' }}>
//                 <Col span={4}>
//                     Tanda tangan pengambil :
//                 </Col>
//                 <Col span={20}>
//                     <Input placeholder="..." size='small' style={{ width: '100%' }} />
//                 </Col>
//             </Row>
//             <Row style={{ marginBottom: '5px' }}>
//                 <Col span={4}>
//                     Tanda tangan petugas :
//                 </Col>
//                 <Col span={20}>
//                     <Input placeholder="..." size='small' style={{ width: '100%' }} />
//                 </Col>
//             </Row>
//             <Row>
//                 <Col span={24}>
//                     <Space style={{ float: 'right' }}>
//                         <Button type='primary' style={{ width: '150px' }}>
//                             Simpan
//                         </Button>
//                         <Button type='primary' danger style={{ width: '75px' }}>
//                             Batal
//                         </Button>
//                     </Space>
//                 </Col>
//             </Row>