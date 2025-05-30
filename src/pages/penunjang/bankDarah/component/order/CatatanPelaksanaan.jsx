import { CheckCircleTwoTone, CheckSquareTwoTone, CloseCircleTwoTone, CloudDownloadOutlined, EditOutlined, SaveOutlined } from '@ant-design/icons';
import { Button, Checkbox, Col, DatePicker, Divider, Empty, Input, Modal, Row, Select, Space, Spin, Table, Tabs, Tag, Tooltip, Typography } from 'antd';
import dayjs from 'dayjs';
import React, { useContext, useState } from 'react';
import { BankDarahContext } from '../../context/BankDarahContext';

const { Text } = Typography;
const { Option } = Select;
const { TextArea } = Input;

const CatatanPelaksanaan = () => {
    const {
        dtPasien,
        listDiagnosa,

        InsDokter, setInsDokter,
        tglTransfusi, settglTransfusi,
        dxPasien, setdxPasien,
        golDarah, setgolDarah,
        pmrKantong, setpmrKantong,
        preMedikasi, setpreMedikasi,
        dpjp, setdpjp,
        noKtg, setnoKtg,
        hslCM, sethslCM,
        tglExp, settglExp,
        jnsKomp, setjnsKomp,
        volume, setvolume,
        wktUTD, setwktUTD,
        wktDiterima, setwktDiterima,
        identPasien, setidentPasien,
        identKtg, setidentKtg,
        keadaanKtg, setkeadaanKtg,
        wktMulai, setwktMulai,
        wktSelesai, setwktSelesai,
        reaksiTf, setreaksiTf,
        ptg1, setptg1,
        ptg2, setptg2,
        listObs, setlistObs,
        userOrder,
        ipClient,
        hostClient,
        tempDtCrossmatch,
        lookUpPerawat,
        simpanReaksi,

        mdObs, setmdObs,

        spRiwGolDarah,
        spCatatan,
        spTbKantongSiap,

        tabCatatan, settabCatatan,

        // setmdDiagnosis,
        getDiagnosaPx,
        getListObs,
        postPelaksanaan,
        updatePelaksanaan,
        postTtv,
        updateTtv,
    } = useContext(BankDarahContext);

    const [wktObs, setwktObs] = useState();
    const [sistole, setsistole] = useState();
    const [diastole, setdiastole] = useState();
    const [rr, setrr] = useState();
    const [suhu, setsuhu] = useState();
    const [nadi, setnadi] = useState();
    const [nyeri, setnyeri] = useState();
    const [tempTtv, settempTtv] = useState();
    const [flagSimpanTtv, setflagSimpanTtv] = useState(false);
    const [mdDiagnosis, setmdDiagnosis] = useState(false);
    const [optPerawat, setoptPerawat] = useState([]);

    const [reaksi, setreaksi] = useState();

    const colTbDiagnosis = [
        {
            title: "No. Registrasi",
            dataIndex: "RegistrasiId",
            key: "RegistrasiId",
            align: "center",
        },
        {
            title: "No. Urut",
            dataIndex: "NoUrut",
            key: "NoUrut",
            align: "center",
        },
        {
            title: "Diagnosis",
            dataIndex: "Diagnosis",
            key: "Diagnosis",
            align: "center",
        },
        {
            title: "Aksi",
            align: "center",
            width: 50,
            render: (text, record, index) => (
                <Space>
                    <Button
                        onClick={() => {
                            if (dxPasien) {
                                let data = dxPasien + ", " + record.Diagnosis;
                                setdxPasien(data);
                            } else {
                                let data = record.Diagnosis;
                                setdxPasien(data);
                            }
                        }}
                        // type="primary"
                        icon={<CheckSquareTwoTone twoToneColor="#52c41a" />}
                        // disabled={record.StsDatang}
                        size="small"
                        style={{ width: "30px" }}
                    />
                </Space>
            ),
        },
    ];

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
            width: 40,
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
            width: 50,
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
            // align: 'center',
            dataIndex: 'Keterangan',
            key: 'Keterangan',
        }
        // {
        //     title: 'Kirim',
        //     align: 'center',
        //     dataIndex: 'Kirim',
        //     key: 'Kirim',
        //     width: 60,
        //     render: Kirim => Kirim ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#eb2f96" />,
        // },
        // {
        //     title: 'Tanggal',
        //     align: 'center',
        //     dataIndex: 'TglPemeriksaan',
        //     key: 'TglPemeriksaan',
        //     width: 70,
        //     render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
        // },
        // {
        //     title: 'Petugas',
        //     align: 'center',
        //     dataIndex: 'UserId',
        //     key: 'UserId',
        //     width: 80,
        // }
    ];

    const colJnsDarah = [
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
    ];

    // Fungsi untuk memetakan SkorNyeri ke teks yang sesuai
    const getNyeriDescription = (skor) => {
        if (skor === 1) return 'Tidak Nyeri (0)';
        if (skor === 2) return 'Nyeri Ringan (1-2-3)';
        if (skor === 3) return 'Nyeri Sedang (4-5-6)';
        if (skor === 4) return 'Nyeri Berat (7-8-9-10)';
        return 'Tidak Diketahui'; // Fallback untuk nilai di luar range
    };

    const colObservasi = [
        {
            title: 'Waktu',
            align: 'center',
            dataIndex: 'Jam',
            key: 'Jam',
            // width: 150,
            render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
        },
        {
            title: 'Tekanan Darah',
            align: 'center',
            dataIndex: 'TekananDarahSistolik',
            key: 'TekananDarahSistolik',
            // width: 100,
            render: (text, record, index) => `${text} / ${record.TekananDarahDiastolik}`,
        },
        {
            title: 'RR',
            align: 'center',
            dataIndex: 'FrekuensiNafas',
            key: 'FrekuensiNafas',
            // width: 40,
        },
        {
            title: 'Suhu',
            align: 'center',
            dataIndex: 'SuhuTubuh',
            key: 'SuhuTubuh',
            // width: 55,
        },
        {
            title: 'Nadi',
            align: 'center',
            dataIndex: 'FrekuensiNadi',
            key: 'FrekuensiNadi',
            // width: 50,
        },
        {
            title: 'Nyeri',
            align: 'center',
            dataIndex: 'SkorNyeri',
            key: 'SkorNyeri',
            // width: 50,
            render: (teks) => getNyeriDescription(teks),
        },
        {
            title: "Aksi",
            align: "center",
            width: 50,
            render: (text, record, index) => (
                <Button
                    onClick={() => {
                        editTtv(record);
                    }}
                    // type="primary"
                    icon={<EditOutlined />}
                    // disabled={record.StsDatang}
                    size="small"
                // style={{ width: "30px" }}
                />
            ),
        },
    ];

    const optPerawata = [
        {
            dokterId: "P315",
            namaDokter: "ABDUL SOLEH",
            bagianId: "9317",
            deskripsi: "PICU - RSMS",
            status: "Y"
        },
        {
            dokterId: "P845",
            namaDokter: "ABI WAHYU SAPUTRA",
            bagianId: "9314",
            deskripsi: "ICU - RSMS",
            status: "Y"
        }
    ];

    const listDokter = [
        {
            dokterId: "D003",
            kdSpesial: null,
            bagianId: null,
            namaDokter: "ADI SETYAWAN PRIANTO, Dr, SPOG",
            jenisKelamin: null,
            alamatDokter: null,
            telponDokter: null,
            teleponPraktek: null,
            kategoriDokter: null,
            username: null,
            status: "Y"
        },
        {
            dokterId: "D004",
            kdSpesial: null,
            bagianId: null,
            namaDokter: "ADITYA WARMAN, DR, SPPD,KGH",
            jenisKelamin: null,
            alamatDokter: null,
            telponDokter: null,
            teleponPraktek: null,
            kategoriDokter: null,
            username: null,
            status: "Y"
        }
    ];

    const disableDatesBelowOrEqualTglTransfusi = (current) => {
        // Nonaktifkan semua tanggal di bawah atau sama dengan tglTransfusi
        return current && current.isBefore(dayjs(wktDiterima).startOf("day"));
    };

    const disableTimesBelowTglTransfusi = (current) => {
        if (!wktDiterima || !current || !dayjs(wktDiterima).isSame(current, "day")) {
            return {};
        }

        const currentHour = dayjs(wktDiterima).hour();
        const currentMinute = dayjs(wktDiterima).minute();

        return {
            disabledHours: () => [...Array(currentHour).keys()], // Nonaktifkan semua jam sebelum tglTransfusi
            disabledMinutes: (selectedHour) =>
                selectedHour === currentHour
                    ? [...Array(currentMinute).keys()] // Nonaktifkan semua menit sebelum tglTransfusi di jam yang sama
                    : [],
        };
    };

    const klikDiagnosis = (sNoreg) => {
        setmdDiagnosis(true);
        getDiagnosaPx(sNoreg);
    };

    const locale = {
        emptyText: <Empty description="Tidak ada data" />,
    };

    const klikPtg = async () => {
        const data = await lookUpPerawat();
        setoptPerawat(data);
    };

    const klikSimpan = () => {
        if (!tglExp) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Tanggal Kadaluwarsa masih kosong!",
            });
        }
        else if (!identPasien) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Identifikasi pasien masih kosong!",
            });
        }
        else if (!identKtg) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Identifikasi kantong masih kosong!",
            });
        }
        else if (!keadaanKtg) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Keadaan kantong masih kosong!",
            });
        }
        else if (!wktDiterima) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Waktu diterima Ruangan masih kosong!",
            });
        }
        else if (!tglTransfusi) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Waktu Transfusi/ Mulai masih kosong!",
            });
        }
        else if (!ptg1) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Petugas I masih kosong!",
            });
        }
        else {
            if (tempDtCrossmatch.PelaksanaanId) {
                let data = {
                    id: tempDtCrossmatch.PelaksanaanId,
                    instruksiDokter: InsDokter,
                    pemberianPremed: preMedikasi,
                    waktuExpired: dayjs(tglExp).format(),
                    identPasienRuangan: identPasien,
                    identKantongRuangan: identKtg,
                    keadaanKantong: keadaanKtg,
                    petugasId: ptg1,
                    petugasId2: ptg2,
                    userId: userOrder,
                    clientHost: hostClient,
                    clientIP: ipClient,
                };

                updatePelaksanaan(data);
            }
            else {
                let data = {
                    crossmatchId: tempDtCrossmatch.Id,
                    instruksiDokter: InsDokter,
                    waktuTerimaRuangan: dayjs(wktDiterima).format(),
                    waktuTransfusi: dayjs(tglTransfusi).format(),
                    pemberianPremed: preMedikasi,
                    waktuExpired: dayjs(tglExp).format(),
                    identPasienRuangan: identPasien,
                    identKantongRuangan: identKtg,
                    keadaanKantong: keadaanKtg,
                    // waktuSelesai: dayjs(wktSelesai).format(),
                    petugasId: ptg1,
                    petugasId2: ptg2,
                    // tandaVitalId: ,
                    // tandaVitalId2: ,
                    // tandaVitalId3: ,
                    // tandaVitalId4: ,
                    userId: userOrder,
                    clientHost: hostClient,
                    clientIP: ipClient,
                };

                console.log('klikSimpan : ', data);
                postPelaksanaan(data);
            }
        };
    };

    const klikSimpanReaksi = (sReaksi, sId) => {
        let data = {}

        data.Id = sId;
        data.Reaksi = sReaksi;

        simpanReaksi(data);
    };

    const klikSimpanTtv = () => {
        if (!sistole) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Tekanan Darah sistole masih kosong!",
            });
        }
        else if (!diastole) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Tekanan Darah sistole masih kosong!",
            });
        }
        else if (!rr) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "RR masih kosong!",
            });
        }
        else if (!suhu) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Suhu masih kosong!",
            });
        }
        else if (!nadi) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Nadi masih kosong!",
            });
        }
        else if (!nyeri) {
            Modal.warning({
                title: "Peringatan!",
                content:
                    "Skala Nyeri masih kosong!",
            });
        }
        else {
            if (!flagSimpanTtv) {
                let data = {
                    registrasiId: dtPasien.RegistrasiId,
                    ruangId: '9407',
                    tanggal: dayjs(wktObs).format('YYYY-MM-DD'),
                    jam: dayjs(wktObs).format(),
                    tekananDarahSistolik: parseInt(sistole, 10),
                    tekananDarahDiastolik: parseInt(diastole, 10),
                    frekuensiNafas: parseInt(rr, 10),
                    frekuensiNadi: parseInt(nadi, 10),
                    suhuTubuh: parseFloat(suhu),
                    skorNyeri: nyeri,
                    userId: userOrder,
                    clientHost: hostClient,
                    clientIP: ipClient,
                    crossmatchId: tempDtCrossmatch.Id,
                    tempLength: listObs.length
                };

                console.log('klikSimpanTtv : ', data);
                postTtv(data);
            }
            else {
                let data = {
                    tandaVitalId: tempTtv.TandaVitalId,
                    jam: dayjs(wktObs).format(),
                    tekananDarahSistolik: parseInt(sistole, 10),
                    tekananDarahDiastolik: parseInt(diastole, 10),
                    frekuensiNafas: parseInt(rr, 10),
                    frekuensiNadi: parseInt(nadi, 10),
                    suhuTubuh: parseFloat(suhu),
                    skorNyeri: nyeri,
                    userId: userOrder,
                    clientHost: hostClient,
                    clientIP: ipClient
                };

                console.log('klikSimpanTtv : ', data);
                updateTtv(data);
            }
        }
    };

    const rstMdObs = () => {
        setsistole();
        setdiastole();
        setrr();
        setsuhu();
        setnadi();
        setnyeri();
    };

    const editTtv = (data) => {
        setmdObs(true);
        setflagSimpanTtv(true);
        setwktObs(dayjs(data.Jam));
        setsistole(data.TekananDarahSistolik);
        setdiastole(data.TekananDarahDiastolik);
        setrr(data.FrekuensiNafas);
        setsuhu(data.SuhuTubuh);
        setnadi(data.FrekuensiNadi);
        setnyeri(data.SkorNyeri);
        settempTtv(data);
    };

    return (
        <div>
            <Divider
                orientation='left'
                style={{ backgroundColor: '#fff1b8', marginTop: '0px', marginBottom: '2px' }}>
                Pelaksaan Transfusi Darah
            </Divider>

            <Spin spinning={spCatatan} tip="Loading... 😁">
                <Tabs
                    activeKey={tabCatatan}
                    type="card"
                    items={
                        [
                            {
                                key: '1',
                                label: 'Catatan Pelaksanaan',
                                children: <>
                                    <Row style={{ marginTop: '5px', marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span><b>Instruksi Dokter : </b></span>
                                        </Col>
                                        <Col span={20}>
                                            <Tooltip title="Isikan instruksi yang diberikan oleh Dokter, bukan untuk inputan nama Dokter.">
                                                <Input
                                                    value={InsDokter}
                                                    onChange={(e) => setInsDokter(e.target.value)}
                                                    placeholder="..."
                                                    maxLength={255}
                                                />
                                            </Tooltip>
                                        </Col>
                                    </Row>

                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span>Diagnosa : </span>
                                        </Col>
                                        <Col span={20}>
                                            {/* <Space.Compact
                        style={{
                            width: '100%',
                        }}
                    >
                        <Button
                            type="primary"
                            onClick={() => klikDiagnosis(dtPasien.RegistrasiId)}
                        >
                            Ambil Diagnosa
                        </Button>
                    </Space.Compact> */}
                                            <Input
                                                value={dxPasien}
                                                onChange={(e) => setdxPasien(e.target.value)}
                                                placeholder="..."
                                                maxLength={255}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span>Golongan Darah : </span>
                                        </Col>
                                        <Col span={20}>
                                            <Input
                                                value={golDarah}
                                                onChange={(e) => setgolDarah(e.target.value)}
                                                placeholder="..."
                                                maxLength={10}
                                                readOnly
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span>Permintaan Kantong : </span>
                                        </Col>
                                        <Col span={20}>
                                            {/* <Input
                        value={pmrKantong}
                        onChange={(e) => setpmrKantong(e.target.value)}
                        placeholder="..."
                        maxLength={255}
                        readOnly
                    /> */}
                                            <Table
                                                bordered
                                                // loading={spTbPasien}
                                                columns={colJnsDarah}
                                                dataSource={pmrKantong}
                                                pagination={false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span><b>Pemberian Premedikasi : </b></span>
                                        </Col>
                                        <Col span={20}>
                                            <Tooltip title="Isikan alasan pemberian Premedikasi yang dilakukan.">
                                                <Input
                                                    value={preMedikasi}
                                                    onChange={(e) => setpreMedikasi(e.target.value)}
                                                    placeholder="..."
                                                    maxLength={255}
                                                />
                                            </Tooltip>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span>DPJP : </span>
                                        </Col>
                                        <Col span={20}>
                                            <Input
                                                value={dpjp}
                                                // onChange={(e) => setdpjp(e.target.value)}
                                                placeholder="..."
                                                maxLength={255}
                                                readOnly
                                            />
                                            {/* <Select
                        style={{ width: "100%" }}
                        placeholder="..."
                        value={dpjp}
                        onChange={(e) => setdpjp(e)}
                        // size='small'
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.children
                                .toLowerCase()
                                .indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {listDokter.map((opt, index) => (
                            <Option key={index} value={opt.dokterId}>
                                {opt.namaDokter}
                            </Option>
                        ))}
                    </Select> */}
                                        </Col>
                                    </Row>

                                    <hr />
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span>No. Kantong : </span>
                                        </Col>
                                        <Col span={20}>
                                            <Input
                                                value={noKtg}
                                                onChange={(e) => setnoKtg(e.target.value)}
                                                placeholder="..."
                                                maxLength={255}
                                                readOnly
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span>Hasil Cross Match : </span>
                                        </Col>
                                        <Col span={20}>
                                            <Table
                                                bordered
                                                // loading={spTmbahHasil}
                                                rowClassName={(record, index) => (
                                                    record.StsAdvice === null ? null : record.StsAdvice === false ? 'belum_jawab' : 'sudah_jawab'
                                                )}
                                                columns={columnsa}
                                                dataSource={hslCM}
                                                pagination={false}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span><b>Tanggal Kadaluwarsa : </b></span>
                                        </Col>
                                        <Col span={20}>
                                            <DatePicker
                                                value={tglExp}
                                                format={"DD-MM-YYYY"}
                                                allowClear={false}
                                                // style={{ width: '100%' }}
                                                onChange={(e) => settglExp(e)}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span>Jenis Komponen : </span>
                                        </Col>
                                        <Col span={20}>
                                            <Input
                                                value={jnsKomp}
                                                onChange={(e) => setjnsKomp(e.target.value)}
                                                placeholder="..."
                                                maxLength={255}
                                                readOnly
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span>Volume Darah : </span>
                                        </Col>
                                        <Col span={20}>
                                            <Input
                                                value={volume}
                                                onChange={(e) => setvolume(e.target.value)}
                                                placeholder="..."
                                                maxLength={255}
                                                addonAfter="ml"
                                                readOnly
                                            />
                                        </Col>
                                    </Row>

                                    <hr />
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span><b>Identifikasi pasien : </b></span>
                                        </Col>
                                        <Col span={20}>
                                            <Select
                                                style={{ width: '100%' }}
                                                placeholder="..."
                                                value={identPasien}
                                                onChange={(e) => setidentPasien(e)}
                                            >
                                                <Option key='1' value={true}>Sesuai</Option>
                                                <Option key='2' value={false}>Tidak Sesuai</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span><b>Identifikasi kantong : </b></span>
                                        </Col>
                                        <Col span={20}>
                                            <Select
                                                style={{ width: '100%' }}
                                                placeholder="..."
                                                value={identKtg}
                                                onChange={(e) => setidentKtg(e)}
                                            >
                                                <Option key='1' value={true}>Sesuai</Option>
                                                <Option key='2' value={false}>Tidak Sesuai</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span><b>Keadaan kantong : </b></span>
                                        </Col>
                                        <Col span={20}>
                                            <Select
                                                style={{ width: '100%' }}
                                                placeholder="..."
                                                value={keadaanKtg}
                                                onChange={(e) => setkeadaanKtg(e)}
                                            >
                                                <Option key='1' value={true}>Baik</Option>
                                                <Option key='2' value={false}>Tidak</Option>
                                            </Select>
                                        </Col>
                                    </Row>

                                    <hr />
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span>Waktu Keluar UTD : </span>
                                        </Col>
                                        <Col span={8}>
                                            <DatePicker
                                                value={wktUTD}
                                                format={"DD-MM-YYYY HH:mm"}
                                                showTime
                                                // allowClear={false}
                                                // style={{ width: '100%' }}
                                                // onChange={(e) => setwktUTD(e)}
                                                disabled
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <span><b>Waktu diterima Ruangan : </b></span>
                                        </Col>
                                        <Col span={8}>
                                            <DatePicker
                                                value={wktDiterima}
                                                format={"DD-MM-YYYY HH:mm"}
                                                showTime
                                                allowClear={false}
                                                // style={{ width: '100%' }}
                                                onChange={(e) => {
                                                    if (e && wktUTD && e.isBefore(wktUTD)) {
                                                        Modal.error({
                                                            title: "Invalid Time",
                                                            content: "Waktu diterima tidak boleh lebih kecil dari Waktu Keluar UTD.",
                                                        });
                                                    } else {
                                                        setwktDiterima(e);
                                                    }
                                                }}
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span><b>Waktu Transfusi/ Mulai : </b></span>
                                        </Col>
                                        <Col span={8}>
                                            <DatePicker
                                                value={tglTransfusi}
                                                format={"DD-MM-YYYY HH:mm"}
                                                showTime
                                                allowClear={false}
                                                // style={{ width: '100%' }}
                                                onChange={(e) => {
                                                    if (e && wktDiterima && e.isBefore(wktDiterima)) {
                                                        Modal.error({
                                                            title: "Invalid Time",
                                                            content: "Waktu Transfusi tidak boleh lebih kecil dari Waktu diterima Ruangan.",
                                                        });
                                                    } else {
                                                        settglTransfusi(e);
                                                    }
                                                }}
                                                disabledDate={disableDatesBelowOrEqualTglTransfusi} // Disable tanggal
                                                disabledTime={disableTimesBelowTglTransfusi} // Disable waktu
                                                disabled={!wktDiterima}
                                            />
                                        </Col>
                                        <Col span={4}>
                                            <span>Waktu Selesai : </span>
                                        </Col>
                                        <Col span={8}>
                                            <DatePicker
                                                value={wktSelesai}
                                                format={"DD-MM-YYYY HH:mm"}
                                                showTime
                                                allowClear={false}
                                                // style={{ width: '100%' }}
                                                onChange={(e) => {
                                                    if (e && tglTransfusi && e.isBefore(tglTransfusi)) {
                                                        Modal.error({
                                                            title: "Invalid Time",
                                                            content: "Waktu Selesai tidak boleh lebih kecil dari Waktu Transfusi.",
                                                        });
                                                    } else {
                                                        setwktSelesai(e);
                                                    }
                                                }}
                                                disabled
                                            />
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={4}>
                                            <span><b>Petugas I : </b></span>
                                        </Col>
                                        <Col span={20}>
                                            <Input.Group compact>
                                                <Select
                                                    // mode="multiple"
                                                    style={{ width: '95%' }}
                                                    placeholder="Pilih.."
                                                    value={ptg1}
                                                    onChange={(e) => setptg1(e)}
                                                    // size='small'
                                                    showSearch={true}
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {optPerawat.map((opt, index) => (
                                                        <Option key={index} value={opt.dokterId}>{opt.namaDokter}</Option>
                                                    ))}
                                                </Select>
                                                <Button
                                                    onClick={() => klikPtg()}
                                                    type="primary"
                                                    // size="small"
                                                    style={{ width: '5%' }}>
                                                    <CloudDownloadOutlined />
                                                </Button>
                                            </Input.Group>
                                            {/* <Select
                        // mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="..."
                        value={ptg1}
                        onChange={(e) => setptg1(e)}
                        // size='small'
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {optPerawat.map((opt, index) => (
                            <Option key={index} value={opt.dokterId}>{opt.namaDokter}</Option>
                        ))}
                    </Select> */}
                                        </Col>
                                    </Row>
                                    <Row style={{ marginBottom: '5px' }}>
                                        <Col span={4}>
                                            <span><b>Petugas II : </b></span>
                                        </Col>
                                        <Col span={20}>
                                            <Input.Group compact>
                                                <Select
                                                    // mode="multiple"
                                                    style={{ width: '95%' }}
                                                    placeholder="Pilih.."
                                                    value={ptg2}
                                                    onChange={(e) => setptg2(e)}
                                                    // size='small'
                                                    showSearch={true}
                                                    filterOption={(input, option) =>
                                                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                    }
                                                >
                                                    {optPerawat.map((opt, index) => (
                                                        <Option key={index} value={opt.dokterId}>{opt.namaDokter}</Option>
                                                    ))}
                                                </Select>
                                                <Button
                                                    onClick={() => klikPtg()}
                                                    type="primary"
                                                    // size="small"
                                                    style={{ width: '5%' }}>
                                                    <CloudDownloadOutlined />
                                                </Button>
                                            </Input.Group>
                                            {/* <Select
                        // mode="multiple"
                        style={{ width: '100%' }}
                        placeholder="..."
                        value={ptg2}
                        onChange={(e) => setptg2(e)}
                        // size='small'
                        showSearch={true}
                        filterOption={(input, option) =>
                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                    >
                        {optPerawat.map((opt, index) => (
                            <Option key={index} value={opt.dokterId}>{opt.namaDokter}</Option>
                        ))}
                    </Select> */}
                                        </Col>
                                    </Row>

                                    <hr />
                                    <Row>
                                        <Col span={5}>
                                        </Col>
                                        <Col span={19}>
                                            <Button
                                                type='primary'
                                                onClick={() => klikSimpan()}
                                                icon={<SaveOutlined />}
                                                style={{ float: 'right', width: '150px' }}
                                            >
                                                Simpan
                                            </Button>
                                        </Col>
                                    </Row>
                                </>,
                            },
                            {
                                key: '2',
                                label: 'Observasi',
                                children: <>
                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col>
                                            <Button
                                                icon={<EditOutlined />}
                                                size='small'
                                                onClick={() => {
                                                    setmdObs(true);
                                                    setflagSimpanTtv(false);
                                                    rstMdObs();
                                                    if (listObs.length === 0) {
                                                        setwktObs(dayjs(tglTransfusi));
                                                    }
                                                    else if (listObs.length === 1 || listObs.length === 2) {
                                                        setwktObs(dayjs(tglTransfusi).add(15, 'minute'));
                                                    }
                                                    else if (listObs.length === 3) {
                                                        setwktObs(dayjs(listObs[2].Jam).add(60, 'minute'));
                                                    };
                                                }}
                                                disabled={listObs.length === 4 || tempDtCrossmatch.PelaksanaanId === null ? true : false}
                                            >
                                                Masukkan Observasi
                                            </Button>
                                        </Col>
                                    </Row>

                                    <Row style={{ marginBottom: '2px' }}>
                                        <Col span={24}>
                                            <Table
                                                bordered
                                                // loading={spTmbahHasil}
                                                columns={colObservasi}
                                                dataSource={listObs}
                                                pagination={false}
                                            />
                                        </Col>
                                    </Row>
                                </>,
                            },
                            {
                                key: '3',
                                label: 'Reaksi Transfusi',
                                children: <>
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
                                                        onClick={() => klikSimpanReaksi(reaksi, tempDtCrossmatch.Id)}
                                                        type='primary'
                                                        style={{ width: '100px' }}
                                                    >
                                                        Simpan
                                                    </Button>
                                                </Space>
                                            </Col>
                                        </Row>
                                    </Spin>
                                </>,
                            },
                        ]
                    }
                    onChange={(e) => {
                        settabCatatan(e);
                        if (e === '2' && tempDtCrossmatch.PelaksanaanId !== null) {
                            getListObs(tempDtCrossmatch.PelaksanaanId);
                        }
                        else if (e === '2' && tempDtCrossmatch.PelaksanaanId === null) {
                            setlistObs([]);
                        }
                        else if (e === '3') {
                            setreaksi(tempDtCrossmatch.Reaksi);
                        }
                    }}
                />
            </Spin>

            <Modal
                centered
                open={mdDiagnosis}
                onCancel={() => setmdDiagnosis(false)}
                closable={false}
                footer={null}
                width={500}
            >
                <Divider
                    orientation="left"
                    style={{ backgroundColor: "#ffa39e", margin: "0px" }}
                >
                    Diagnosis Pasien
                </Divider>

                <Table
                    bordered
                    loading={spRiwGolDarah}
                    columns={colTbDiagnosis}
                    dataSource={listDiagnosa}
                    pagination={false}
                    locale={locale}
                />
            </Modal>

            <Modal
                centered
                open={mdObs}
                onCancel={() => setmdObs(false)}
                closable={false}
                footer={null}
                width="50%"
            >
                <Spin spinning={spCatatan} tip="Loading... 😁">
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            <span>Waktu : </span>
                        </Col>
                        <Col span={20}>
                            <Space.Compact style={{ width: '100%' }}>
                                <DatePicker
                                    value={wktObs}
                                    format={"DD-MM-YYYY HH:mm"}
                                    showTime
                                    allowClear={false}
                                    style={{ width: '40%' }}
                                    onChange={(e) => {
                                        // if (e && tglTransfusi && e.isBefore(tglTransfusi)) {
                                        //     Modal.error({
                                        //         title: "Invalid Time",
                                        //         content: "Waktu Selesai tidak boleh lebih kecil dari Waktu Transfusi.",
                                        //     });
                                        // } else {
                                        //     setwktSelesai(e);
                                        // }
                                        setwktObs(e);
                                    }}
                                    disabled={listObs.length === 2 || flagSimpanTtv ? false : true}
                                />
                                <Input
                                    value={listObs.length === 0 ? "Saat transfusi dimulai" :
                                        listObs.length === 1 ? "15 menit setelah transfusi" :
                                            listObs.length === 2 ? "saat selesai transfusi" :
                                                flagSimpanTtv ? "Edit Observasi" :
                                                    "1 jam setelah transfusi"}
                                    // onChange={(e) => setdpjp(e.target.value)}
                                    placeholder="..."
                                    maxLength={255}
                                    readOnly
                                    style={{ width: "60%" }}
                                />
                            </Space.Compact>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            <span>Tekanan Darah : </span>
                        </Col>
                        <Col span={20}>
                            <Space>
                                <Input
                                    value={sistole}
                                    // onChange={(e) => {
                                    //     const value = e.target.value;
                                    //     // Hanya izinkan angka
                                    //     if (/^\d*$/.test(value)) {
                                    //         setsistole(value);
                                    //     }
                                    // }}
                                    onChange={(e) => setsistole(e.target.value)}
                                    placeholder="..."
                                    maxLength={3}
                                    style={{ width: '100px' }}
                                />
                                <span>/</span>
                                <Input
                                    value={diastole}
                                    onChange={(e) => setdiastole(e.target.value)}
                                    placeholder="..."
                                    maxLength={3}
                                    style={{ width: '100px' }}
                                />
                            </Space>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            <span>RR : </span>
                        </Col>
                        <Col span={20}>
                            <Input
                                value={rr}
                                onChange={(e) => setrr(e.target.value)}
                                placeholder="..."
                                maxLength={3}
                                addonAfter="/ menit"
                                style={{ width: '100px' }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            <span>Suhu : </span>
                        </Col>
                        <Col span={20}>
                            <Input
                                value={suhu}
                                onChange={(e) => setsuhu(e.target.value)}
                                placeholder="..."
                                maxLength={4}
                                addonAfter="°C"
                                style={{ width: '100px' }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            <span>Nadi : </span>
                        </Col>
                        <Col span={20}>
                            <Input
                                value={nadi}
                                onChange={(e) => setnadi(e.target.value)}
                                placeholder="..."
                                maxLength={4}
                                addonAfter="/ menit"
                                style={{ width: '100px' }}
                            />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            <span>Skala Nyeri : </span>
                        </Col>
                        <Col span={20}>
                            <Select
                                placeholder="..."
                                style={{ width: "100%" }}
                                value={nyeri}
                                onChange={(e) => setnyeri(e)}
                            // size='small'
                            >
                                <Option value={1}>Tidak Nyeri (0)</Option>
                                <Option value={2}>Nyeri Ringan (1-2-3)</Option>
                                <Option value={3}>Nyeri Sedang (4-5-6)</Option>
                                <Option value={4}>Nyeri Berat (7-8-9-10)</Option>
                            </Select>
                        </Col>
                    </Row>

                    <hr />
                    <Row>
                        <Col span={5}>
                        </Col>
                        <Col span={19}>
                            <Button
                                type='primary'
                                onClick={() => klikSimpanTtv()}
                                icon={<SaveOutlined />}
                                style={{ float: 'right', width: '150px' }}
                            >
                                Simpan
                            </Button>
                        </Col>
                    </Row>
                </Spin>
            </Modal>
        </div >
    )
}

export default CatatanPelaksanaan