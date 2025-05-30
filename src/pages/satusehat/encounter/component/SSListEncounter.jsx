/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, DatePicker, Modal, Row, Select, Space, Switch, Table } from 'antd'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { SatuSehatEncounterContext } from '../context/SatuSehatEncounterContext';
import { CheckCircleOutlined, ExclamationCircleTwoTone, ReloadOutlined, SendOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import SSDetailKirim from './SSDetailKirim';
import '../style/style.css';
import SSDetailKirimJKN from './E-KlaimSatuSehat/SSDetailKirimJKN';
import { UserContext } from "../../../appsetting/UserContext";

const { Option } = Select;

const SSListEncounter = () => {
    const {
        menuAkses,
        menuGizi,
        menuRM,
        menuHD,
        menuMaster,
        menuPnj,
        menuKemoterapi,
        menuRadioterapi,
        menuBridging,
        menuValidDarah,
        menuDiklat,
    } = useContext(UserContext);

    const {
        username,
        sstoken,
        listRuang,
        gedung, setgedung,
        ruangId, setruangId,
        tglPelayanan, settglPelayanan,
        listPasien,
        setpasienId,
        setihsPasien,
        // notifikasi
        tempNotif, settempNotif,
        // formEdit
        mdDetailKirim, setmdDetailKirim,
        // func
        getListRuang,
        getListPasien,
        getDetailKirim,
        getIdentPx,
        rstDetailKirim,
        SatuSehatGetToken,
        kirimTele,
        // sp
        spTbPasien,
        // md
        mdInfoUpdate, setmdInfoUpdate,
        mddetailKirimv2, setmddetailKirimv2,

        // ===== v2 =====
        identitasPx, setidentitasPx,
        setparamCoverage,
        setparamEncounter,

        spIdentPx,
        settabKirimJKM,
    } = useContext(SatuSehatEncounterContext)

    const buttonRef = useRef(null);

    const [encounterPilih, setencounterPilih] = useState()
    const [paramAutoKlik, setparamAutoKlik] = useState(false)

    const columns = [
        {
            title: 'RegistrasiId',
            dataIndex: 'RegistrasiId',
            key: 'RegistrasiId',
            ellipsis: true,
            width: 75,
        },
        {
            title: 'PasienId',
            dataIndex: 'PasienId',
            key: 'PasienId',
            width: 75,
        },
        {
            title: 'Nama',
            dataIndex: 'Nama',
            key: 'Nama',
        },
        {
            title: 'NamaDokter',
            dataIndex: 'NamaDokter',
            key: 'NamaDokter',
        },
        {
            title: 'Kirim',
            dataIndex: 'StsKirim',
            key: 'StsKirim',
            align: 'center',
            width: 50,
            render: (value) => {
                if (value === 'true') {
                    return <CheckCircleOutlined style={{ color: 'green' }} />;
                } else {
                    return null;
                }
            }
        },
        {
            title: 'Aksi',
            key: 'operation',
            fixed: 'right',
            align: 'center',
            width: 250,
            render: (text, record, index) =>
                <div>
                    <Space>
                        <Button
                            type='primary'
                            onClick={() => klikKirim(record.RegistrasiId, record.PasienId, index)}
                            disabled={!sstoken || record.StsKirim === 'true'}
                            icon={<SendOutlined />}
                            size='small'
                            style={{ backgroundColor: '#73d13d', borderColor: '#73d13d' }}
                        >
                            SatuSehat v1
                        </Button>

                        <Button
                            type='primary'
                            onClick={() => klikKirimv2(record.RegistrasiId)}
                            disabled={!sstoken || !menuMaster ? true : false}
                            icon={<SendOutlined />}
                            size='small'
                            style={{ backgroundColor: '#69b1ff', borderColor: '#69b1ff' }}
                        >
                            SatuSehat v2
                        </Button>

                    </Space>
                </div>
        },
    ];

    const tempdata = [];

    for (let i = 1; i <= 100; i++) {
        const dokter = {
            RegistrasiId: '2306130000',
            PasienId: '00984299',
            Nama: 'JAUHARI DESLO ANGKASA WIJAYA, DR, TN',
            NamaDokter: 'ARIADNE TIARA H,dr,MSi,MED,SPA',
            Kirim: i % 2 === 0 ? true : false,
        };
        tempdata.push(dokter);
    }

    const listGedung = [
        {
            id: 'RSMS',
            desk: 'RSMS'
        },
        {
            id: 'ABIYASA',
            desk: 'ABIYASA',
        }
    ]

    useEffect(() => {
        const intervalId = setInterval(() => {
            // Menggunakan 'click()' untuk mensimulasikan klik pada button
            if (paramAutoKlik) {
                buttonRef.current.click();
            }
        }, 5000);

        // Membersihkan interval saat komponen unmount
        return () => clearInterval(intervalId);
    }, [paramAutoKlik]); // useEffect hanya dijalankan setelah render pertama

    const onChangeGedung = (data) => {
        setgedung(data)
        getListRuang(data)
    }

    const onChangeRuang = (data) => {
        setruangId(data)
        getListPasien(data, dayjs(tglPelayanan).format('YYYY-MM-DD'))
    }

    const onChangeTgl = (data) => {
        settglPelayanan(dayjs(data))
        getListPasien(ruangId, dayjs(data).format('YYYY-MM-DD'))
    }

    const klikRefresh = () => {
        getListPasien(ruangId, dayjs(tglPelayanan).format('YYYY-MM-DD'))
        console.log('klik 5 detik jalan, ', dayjs().format('DD-MM-YYYY HH:mm:ss'), tempNotif);
        let temp = tempNotif + 1;
        console.log('temp : ', temp);
        settempNotif(temp)

        if (temp % 6 === 0) {
            klikNotif();
            kirimTele();
        }
    }

    const klikKirim = (regId, pasienId, index) => {
        rstDetailKirim();
        setpasienId(pasienId);
        getDetailKirim(regId, ruangId);
        setencounterPilih(index);
    };

    const klikKirimv2 = (noreg) => {
        // reset
        settabKirimJKM('1');
        setihsPasien();
        setidentitasPx();
        setparamCoverage();
        setparamEncounter();

        setmddetailKirimv2(true);
        getIdentPx(noreg);
    };

    const onCheck = (checked) => {
        setparamAutoKlik(checked)
        console.log(`switch to ${checked}`);
    };

    const klikNotif = () => {
        // Periksa apakah Notifikasi didukung oleh browser
        if ('Notification' in window) {
            // Minta izin untuk menampilkan notifikasi
            Notification.requestPermission()
                .then((permission) => {
                    if (permission === 'granted') {
                        // Buat objek notifikasi
                        const notification = new Notification('Peringatan!', {
                            body: `Terdeteksi UWER-UWER gaes.. ${tempNotif}`,
                            // icon: 'icon-url' // URL ikon notifikasi (opsional)
                        });

                        // Tindakan saat notifikasi diklik
                        notification.onclick = () => {
                            console.log('Notifikasi diklik');
                        };
                    } else {
                        console.log('Izin notifikasi ditolak');
                    }
                });
        }
    }

    // settingan info update otomatis
    const updateDate = '2024-11-11';
    const today = dayjs();
    // const today = dayjs('2024-09-06');
    const daysDifference = today.diff(dayjs(updateDate), 'day');

    return (
        <div>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={2}>
                    Gedung :
                </Col>
                <Col span={4}>
                    <Select
                        value={gedung}
                        style={{ width: "100%" }}
                        size="small"
                        placeholder="..."
                        onChange={(e) => onChangeGedung(e)}
                    >
                        {listGedung.map((item, index) => (
                            <Option key={index} value={item.id}>{item.desk}</Option>
                        ))}
                    </Select>
                </Col>
                <Col span={2} style={{ marginLeft: '50px' }}>
                    Unit :
                </Col>
                <Col span={6}>
                    <Select
                        value={ruangId}
                        style={{ width: "100%" }}
                        size="small"
                        placeholder="..."
                        onChange={(e) => onChangeRuang(e)}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                        showSearch
                    >
                        {listRuang.map((item, index) => (
                            <Option key={index} value={item.ruangId}>{item.ruangId + "-" + item.deskripsi}</Option>
                        ))}
                    </Select>
                </Col>
                <Col span={2} style={{ marginLeft: '50px' }}>
                    Tanggal :
                </Col>
                <Col span={4}>
                    <DatePicker
                        value={tglPelayanan}
                        onChange={(e) => onChangeTgl(e)}
                        // disabledDate={(current) => {
                        //     let customDate = dayjs().format("YYYY-MM-DD");
                        //     return current && current < dayjs(customDate, "YYYY-MM-DD");
                        // }}
                        size="small"
                        format="DD-MM-YYYY"
                        allowClear={false}
                        inputReadOnly={true}
                        style={{ width: '100%' }}
                    />
                </Col>
                <Col span={2}>
                    <Button
                        type='primary'
                        size='small'
                        onClick={() => SatuSehatGetToken()}
                        disabled
                        style={{ marginLeft: '5px', width: '95%' }}
                    >
                        Get Token
                    </Button>
                </Col>
            </Row>

            <Row
                style={{ marginBottom: '5px' }}>
                <Col span={12}>
                    <Space>
                        <Button
                            type='primary'
                            size='small'
                            icon={<ReloadOutlined />}
                            disabled={!ruangId}
                            ref={buttonRef}
                            onClick={() => klikRefresh()}
                            style={{ width: '150px' }}>
                            Refresh Pasien
                        </Button>
                        {/* <Button
                            type='primary'
                            size='small'
                            onClick={klikNotif}
                            style={{ width: '150px' }}>
                            Coba Notifikasi
                        </Button> */}
                    </Space>
                </Col>
                <Col span={12}>
                    <Space style={{ float: 'right' }}>
                        <span>Tombol klik Refresh otomatis 5 detik &#129058;</span>
                        <Switch
                            checked={paramAutoKlik}
                            onChange={onCheck} />
                    </Space>
                </Col>
            </Row>

            <Table
                bordered
                rowClassName={(record, index) => (
                    record.StsKirim === 'true' && encounterPilih !== index ? "sudah_kirim" : encounterPilih === index ? "pilih_daftar" : "belum_kirim"
                )}
                loading={spTbPasien}
                columns={columns}
                dataSource={listPasien}
                size='small'
            />

            <Modal
                visible={mdDetailKirim}
                onCancel={() => setmdDetailKirim(false)}
                width={1000}
                footer={null}
                closable={false}
                style={{ top: 50 }}
            >
                <SSDetailKirim />
            </Modal>

            <Modal
                visible={mddetailKirimv2}
                onCancel={() => setmddetailKirimv2(false)}
                width="90%"
                footer={null}
                // title="Data Klinis Pasien"
                // closable={false}
                // centered
                style={{ top: 20 }}
            >
                <Card
                    title='Pembiayaan Kesehatan Klaim BPJS-K'
                    headStyle={{ backgroundColor: '#36cfc9' }}>
                    <SSDetailKirimJKN />
                </Card>
            </Modal>

            {/* MODAL Update Info */}
            <Modal
                // title="Informasi Update"
                open={mdInfoUpdate}
                closable={false}
                footer={null}
                width={1000}
                style={{ top: 100 }}
            >
                <Card
                    title='Informasi Update - Pengiriman SatuSehat'
                    headStyle={{ backgroundColor: '#36cfc9' }}>
                    <h3 style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 11-11-2024</h3>
                    <ul style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Update <b>Bundle Medication</b> menggunakan content, agar Bundle data SatuSehat bisa terkirim dengan sukses.</li>
                        <li>Perbaikan Daftar Pasien dengan menghilangkan <b>pasien rawat jalan yang didaftarkan ke rawat inap</b></li>
                    </ul>
                    <h3 style={{ color: today.diff(dayjs('2024-09-02'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-09-02'), 'day') < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 02-09-2024</h3>
                    <ul style={{ color: today.diff(dayjs('2024-09-02'), 'day') > 7 ? '#d9d9d9' : 'black', backgroundColor: today.diff(dayjs('2024-09-02'), 'day') < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan Menu <b>Dashboard Monitoring SatuSehat</b>, di Menu <b>Bridging - SatuSehat - Dashboard Monitoring SatuSehat</b>.
                            Berisi tentang Grafik Total Pengiriman dan Detail Pengiriman data Pasien.</li>
                    </ul>
                </Card>
                <Row style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <Button
                            onClick={() => setmdInfoUpdate(false)}
                            type='primary'
                            style={{ float: 'right', width: '100px' }}>
                            OK
                        </Button>
                    </Col>
                </Row>
            </Modal>

        </div>
    )
}

export default SSListEncounter