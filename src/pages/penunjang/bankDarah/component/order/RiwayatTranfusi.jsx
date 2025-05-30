import { CheckSquareTwoTone, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Card, Col, Divider, Input, Modal, Row, Space, Spin, Table } from 'antd'
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react'
import { BankDarahContext } from '../../context/BankDarahContext';
import CatatanPelaksanaan from './CatatanPelaksanaan';
import '../../style/style.css';

const { TextArea } = Input;

const RiwayatTranfusi = () => {
    const {
        dtPasien,
        ktgjnsDarah,
        listDarahSiap,
        listRiwReaksi,
        simpanReaksi,
        spTbKantongSiap,
        spTbRiwReaksi,
        setspCatatan,
        setInsDokter,
        setpreMedikasi,
        settglExp,
        setidentPasien,
        setidentKtg,
        setkeadaanKtg,
        setptg1,
        setptg2,
        settglTransfusi,
        setwktDiterima,
        setdxPasien,
        setgolDarah,
        setpmrKantong,
        setdpjp,
        setnoKtg,
        sethslCM,
        setjnsKomp,
        setvolume,
        setwktUTD,
        setwktMulai,
        setwktSelesai,
        settempDtCrossmatch,
        getKantongDarahSiap,
        getHasilPmrGolonganDarahV2,
        getHasilPmrGolonganDarahV3,
        getDetailOrderOnOrderAsync,
        getDetailPelaksanaan,
        getDetailPelaksanaanV2,
        mdPelaksanaan, setmdPelaksanaan,
        settabCatatan,
    } = useContext(BankDarahContext)

    const [tempId, settempId] = useState();
    const [reaksi, setreaksi] = useState();
    const [mdTambahReaksi, setmdTambahReaksi] = useState();

    const columns = [
        {
            title: 'Tanggal',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 120,
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
            width: 80,
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
            width: 120,
        },
        {
            title: 'Laporan',
            align: 'center',
            dataIndex: 'PelaksanaanId',
            key: 'PelaksanaanId',
            width: 90,
            render: (PelaksanaanId) => (
                <>
                    {
                        PelaksanaanId ? <CheckSquareTwoTone /> : null
                    }
                </>
            ),
        },
        {
            title: 'Observasi',
            align: 'center',
            dataIndex: 'TandaVitalId',
            key: 'TandaVitalId',
            width: 90,
            render: (text, record, index) => (
                <>
                    {
                        record.TandaVitalId && !record.TandaVitalId2 ? '1' :
                            record.TandaVitalId2 && !record.TandaVitalId3 ? '2' :
                                record.TandaVitalId3 && !record.TandaVitalId4 ? '3' :
                                    record.TandaVitalId4 && record.TandaVitalId ? '4' :
                                        null
                    }
                </>
            ),
        },
        {
            title: 'Pelaksanaan Transfusi',
            align: 'center',
            width: 140,
            fixed: 'right',
            render: (text, record, index) => (
                <>
                    {
                        record.PelaksanaanId === null ?
                            <Button
                                onClick={() => {
                                    klikCatatan(record);
                                }}
                                type="primary"
                                // disabled={record.StsKirim}
                                // size='small'
                                icon={<PlusOutlined />}
                                style={{ width: '80px' }}
                            >
                                Laporan
                            </Button> :
                            <Button
                                onClick={() => {
                                    klikCatatan(record);
                                }}
                                type="default"
                                // disabled={record.StsKirim}
                                // size='small'
                                icon={<EditOutlined />}
                                style={{ width: '80px' }}
                            >
                                Laporan
                            </Button>

                    }
                </>
            ),
        },
    ];

    const colTbRiwayat = [
        {
            title: 'Tanggal',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 120,
            render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
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
            width: 80,
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
            width: 120,
        },
        {
            title: 'Reaksi yang terjadi',
            align: 'center',
            dataIndex: 'Reaksi',
            key: 'Reaksi',
        }
    ];

    const tempdata = [
        {
            tgl: dayjs(),
            qty: '1',
            unit: 'Teratai Teratai Teratai Teratai',
            reaksi: 'Reaksi yang terjadi ada disini ya gaes ya... :) Reaksi yang terjadi ada disini ya gaes ya... :)',
        },
        {
            tgl: dayjs(),
            qty: '1',
            unit: 'Teratai',
            reaksi: 'Reaksi yang terjadi ada disini ya gaes ya... :)',
        },
        {
            tgl: dayjs(),
            qty: '1',
            unit: 'Teratai',
            reaksi: 'Reaksi yang terjadi ada disini ya gaes ya... :)',
        },
    ];

    const klikSimpan = (sReaksi, sId) => {
        setmdTambahReaksi(false)

        let data = {}

        data.Id = sId;
        data.Reaksi = sReaksi;

        simpanReaksi(data)
    }

    // const klikCatatan = async (data) => {
    //     setmdPelaksanaan(true);
    //     setspCatatan(true);
    //     settempDtCrossmatch(data);
    //     settabCatatan('1');
    //     // console.log('klikCatatan : ', data);

    //     getHasilPmrGolonganDarahV2(dtPasien.RegistrasiId).then((result) => {
    //         if (result) {
    //             const hasil = result?.[0] || null; // Ambil elemen pertama atau null jika array kosong
    //             // console.log('hasil : ', hasil);
    //             setgolDarah(hasil.length !== 0 ? hasil.GolDarah + ' ' + hasil.Rh : null);

    //             getDetailOrderOnOrderAsync(data.NoOrder).then((result) => {
    //                 if (result) {
    //                     setspCatatan(false);
    //                     // console.log("Detail Order Bank Darah: ", result);
    //                     setdxPasien(result.DiagnosaPasien);
    //                     setpmrKantong(result.DetailOrder);
    //                     setdpjp(result.NamaDokter);
    //                     setnoKtg(data.NoKantong);
    //                     sethslCM([data]);
    //                     setjnsKomp(data.JenisKomponen);
    //                     setvolume(data.JmlCc);
    //                     setwktUTD(dayjs(data.TglPengiriman));
    //                 } else {
    //                     setspCatatan(false);
    //                     console.log("getDetailOrderOnOrderAsync error!");
    //                 }
    //             });
    //         } else {
    //             setspCatatan(false);
    //             console.log("getHasilPmrGolonganDarahV2 error!");
    //         }
    //     });

    //     if (data.PelaksanaanId) {
    //         getDetailPelaksanaan(data.PelaksanaanId).then((result) => {
    //             if (result) {
    //                 setspCatatan(false);
    //                 // console.log("Detail Pelaksanaan: ", result);

    //                 setInsDokter(result.instruksiDokter);
    //                 setwktDiterima(dayjs(result.waktuTerimaRuangan));
    //                 setwktSelesai(dayjs(result.waktuSelesai));
    //                 settglTransfusi(dayjs(result.waktuTransfusi));
    //                 setpreMedikasi(result.pemberianPremed);
    //                 settglExp(dayjs(result.waktuExpired));
    //                 setidentPasien(result.identPasienRuangan);
    //                 setidentKtg(result.identKantongRuangan);
    //                 setkeadaanKtg(result.keadaanKantong);
    //                 setptg1(result.petugasId);
    //                 setptg2(result.petugasId2);
    //             } else {
    //                 setspCatatan(false);
    //                 Modal.error({
    //                     title: "Gagal!",
    //                     content: `Gagal mengambil Data! -> ${result}`,
    //                 });
    //             }
    //         });
    //     }
    //     else {
    //         setInsDokter(null);
    //         setwktDiterima(null);
    //         settglTransfusi(null);
    //         setwktDiterima(null);
    //         setwktMulai(null);
    //         setwktSelesai(null);
    //         setpreMedikasi(null);
    //         settglExp(null);
    //         setidentPasien(null);
    //         setidentKtg(null);
    //         setkeadaanKtg(null);
    //         setptg1(null);
    //         setptg2(null);
    //     }
    // };

    const klikCatatan = async (data) => {
        setmdPelaksanaan(true);
        setspCatatan(true);
        settempDtCrossmatch(data);
        settabCatatan('1');

        console.log('klikCatatan : ', data);

        try {
            if (data.PelaksanaanId) {
                getDetailPelaksanaanV2(data);
            } else {
                console.log('data.PelaksanaanId null.');
                setInsDokter(null);
                setwktDiterima(null);
                settglTransfusi(null);
                setwktDiterima(null);
                setwktMulai(null);
                setwktSelesai(null);
                setpreMedikasi(null);
                settglExp(null);
                setidentPasien(null);
                setidentKtg(null);
                setkeadaanKtg(null);
                setptg1(null);
                setptg2(null);
            };

            getHasilPmrGolonganDarahV3(dtPasien.RegistrasiId);

            const detailOrderResult = await getDetailOrderOnOrderAsync(data.NoOrder);

            if (detailOrderResult) {
                setdxPasien(detailOrderResult.DiagnosaPasien);
                setpmrKantong(detailOrderResult.DetailOrder);
                setdpjp(detailOrderResult.NamaDokter);
                setnoKtg(data.NoKantong);
                sethslCM([data]);
                setjnsKomp(data.JenisKomponen);
                setvolume(data.JmlCc);
                setwktUTD(dayjs(data.TglPengiriman));
            }
        } catch (error) {
            console.error("Error:", error);
            Modal.error({
                title: "Gagal!",
                content: `Terjadi kesalahan: ${error.message}`,
            });
        } finally {
            setspCatatan(false);
        }
    };

    return (
        <div>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={24}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                        Kantong Darah Diterima
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
                        Riwayat Reaksi Kantong Darah Diterima
                    </Divider>
                </Col>
            </Row>

            <Table
                bordered
                loading={spTbRiwReaksi}
                columns={colTbRiwayat}
                dataSource={listRiwReaksi}
                pagination={false}
                scroll={{
                    x: 1000,
                    // y: 300,
                }}
            />

            {/* MD INSERT REAKSI */}
            <Modal
                centered
                open={mdTambahReaksi}
                onCancel={() => setmdTambahReaksi(false)}
                closable={false}
                footer={null}
                width={500}
            >
                <Divider
                    orientation='left'
                    style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                    Tambah Reaksi Transfusi
                </Divider>

                <Spin spinning={spTbKantongSiap}>
                    <Row style={{ marginTop: '5px' }}>
                        <Col span={4}>
                            Reaksi Transfusi :
                        </Col>
                        <Col span={20}>
                            <TextArea
                                rows={4}
                                value={reaksi}
                                onChange={(e) => setreaksi(e.target.value)}
                                maxLength={255}
                                // size='small' 
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>

                    <hr />

                    <Row>
                        <Col span={24}>
                            <Space style={{ float: 'right' }}>
                                <Button
                                    onClick={() => klikSimpan(reaksi, tempId)}
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

            {/* MD Catatan Pelaksanaan Transfusi */}
            <Modal
                centered
                open={mdPelaksanaan}
                onCancel={() => {
                    setmdPelaksanaan(false);
                    getKantongDarahSiap(dtPasien.RegistrasiId, '1')
                }}
                closable={false}
                footer={null}
                width="75%"
            >
                <CatatanPelaksanaan />
            </Modal>
        </div>
    )
}

export default RiwayatTranfusi