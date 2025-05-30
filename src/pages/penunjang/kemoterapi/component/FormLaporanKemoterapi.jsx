import { Button, Card, Col, DatePicker, Divider, Empty, Form, Input, message, Modal, Row, Select, Slider, Space, Spin, Table, TimePicker, Tooltip } from 'antd'
import React, { useContext, useState } from 'react'
import dayjs from "dayjs";
import { KemoterapiContext } from '../context/KemoterapiContext';
import { EditOutlined, DeliveredProcedureOutlined, CloudDownloadOutlined, PlusOutlined, DeleteOutlined, FileSearchOutlined, ExclamationCircleTwoTone, CopyOutlined, MonitorOutlined } from "@ant-design/icons";
import FormTandaVitalKemo from './FormTandaVitalKemo';
import { AssesmentRIContext } from '../../../rawatinap/context/AssesmentRIContext';
import { PasienRIContext } from '../../../rawatinap/context/PasienRIContext';
import skalanyeripng from "../assets/skalanyeri.png";
import ReactHtmlParser from 'react-html-parser';
import ReactQuill from 'react-quill';
import { Link } from 'react-router-dom/cjs/react-router-dom';

const { TextArea } = Input;
const { Option } = Select;

const FormLaporanKemoterapi = () => {
    const {
        jnsRawat,
        unitId,
        tglOrder,
        stat,
        idLap,
        noOrder,
        noReg,
        pasienId,
        tglPmr, settglPmr,
        diagnosa,
        siklusUtama, setsiklusUtama,
        secondLine, setsecondLine,
        konsolidasi, setkonsolidasi,
        weekly, setweekly,
        anamnesa, setanamnesa,
        pmrFisik, setpmrFisik,
        listOrderObat,
        listValidObat,
        listBillNo, setlistBillNo,
        listHasilLab, setlistHasilLab,
        listRiwProtokol,
        terapi, setterapi,
        labRo, setlabRo,
        mslkeperawatan, setmslkeperawatan,
        perawat, setperawat,
        sbj, setsbj,
        listImplementasi, setlistImplementasi,
        listRiwTotalSiklus,
        obj, setobj,
        analysis, setanalysis,
        plan, setplan,
        dischargeplan, setdischargeplan,
        tambahData, settambahData,
        ipKomp,
        hostKomp,
        user,
        userEntry,
        protokolKemo,
        ttlSiklus, setttlSiklus,
        // sp
        spSimpanKemoLaporan, setspSimpanKemoLaporan,
        spListObat,
        spListBillNo, setspListBillNo,
        spHasilLab, setspHasilLab,
        spProtokol,
        spTbRiwProtokol,
        spTbRiwKemo,
        // md
        mdInfoUpdate, setmdInfoUpdate,
        // func
        simpanKemoLaporan,
        getDataObat,
        getBillNoLab,
        getDetailHasilLab,
        getListOrder,
        insertProtokolKemo,
        getRiwProtokol,
        getRiwTotalSiklus,
        // mst
        optPerawat,
        optDokterAll,
        optProtKemo,
        lookUpPerawat,
        lookUpDokterAll,
        lookUpProtokol,
    } = useContext(KemoterapiContext)

    const {
        userAssesment,
        tglTTV,

        visibleNyeri,
        setvisibleNyeri,
        visibleJatuh,
        setvisibleJatuh,
        setvisibleNutrisi,
        setvisibleEws,
        setvisibleMeows,
        setvisibleSkorDown,
        setvisibleLatch,
        setvisibleBartelIndex,
        setvisibleAktivitasLatihan,

        tandaVitalId,
        gcsMata,
        setgcsMata,
        gcsSuara,
        setgcsSuara,
        gcsGerakan,
        setgcsGerakan,
        tekananDarahSistolik,
        settekananDarahSistolik,
        tekananDarahDiastolik,
        settekananDarahDiastolik,
        suhuTubuh,
        setsuhuTubuh,
        frekuensiNadi,
        setfrekuensiNadi,
        frekuensiNafas,
        setfrekuensiNafas,
        iramaNadi,
        setiramaNadi,
        saturasiOksigen,
        setsaturasiOksigen,
        tinggiBadan,
        settinggiBadan,
        beratBadan,
        setberatBadan,

        scalaNyeri,
        setscalaNyeri,
        skalaNyeri1,
        setskalaNyeri1,
        skalaNyeri2,
        setskalaNyeri2,
        skalaNyeri3,
        setskalaNyeri3,
        skalaNyeri4,
        setskalaNyeri4,
        skalaNyeri5,
        setskalaNyeri5,
        skalaNyeri6,
        setskalaNyeri6,

        metodeResikoJatuh,
        setmetodeResikoJatuh,
        rJatuh1,
        setrJatuh1,
        rJatuh2,
        setrJatuh2,
        sMental1,
        setsMental1,
        sMental2,
        setsMental2,
        sMental3,
        setsMental3,
        sMata1,
        setsMata1,
        sMata2,
        setsMata2,
        sMata3,
        setsMata3,
        kebiasaanBerkemih,
        setkebiasaanBerkemih,
        transferTT,
        settransferTT,
        mobilitas,
        setmobilitas,
        humDumUsia,
        sethumDumUsia,
        humDumKel,
        sethumDumKel,
        humDumDiagnosa,
        sethumDumDiagnosa,
        humDumGangguanKognitif,
        sethumDumGangguanKognitif,
        humDumLingkungan,
        sethumDumLingkungan,
        humDumRespon,
        sethumDumRespon,
        humDumPemObat,
        sethumDumPemObat,
        morseRiwJatuh,
        setmorseRiwJatuh,
        morseDiagnosa,
        setmorseDiagnosa,
        morseKondisiJalan,
        setmorseKondisiJalan,
        morseInfus,
        setmorseInfus,
        morseKondisiBadan,
        setmorseKondisiBadan,
        morseGangKognitif,
        setmorseGangKognitif,
        setewsRespirasi,
        setewsSatursiOksigen,
        setewsSuhu,
        setewsSistolik,
        setewsJantung,
        spingetTTVAssByRuang,

        spin,
    } = useContext(AssesmentRIContext);

    const { curpasRI } = useContext(PasienRIContext);

    const [jamImp, setjamImp] = useState(dayjs());
    const [tempImp, settempImp] = useState('');
    const [tempIndex, settempIndex] = useState('');
    const [billNomor, setbillNomor] = useState('');
    const [lila, setlila] = useState("");
    const [drProt, setdrProt] = useState();
    const [idProt, setidProt] = useState();
    const [obatProt, setobatProt] = useState();
    const [prosProt, setprosProt] = useState();
    const [tempRtf, settempRtf] = useState(0);
    // md
    const [mdDaftarObat, setmdDaftarObat] = useState(false);
    const [mdHasilLab, setmdHasilLab] = useState(false);
    const [isModalLila, setIsModalLila] = useState(false);
    const [mdProtKemo, setmdProtKemo] = useState(false);
    const [mdRiwProtokol, setmdRiwProtokol] = useState(false);
    const [mdRiwTotalSiklus, setmdRiwTotalSiklus] = useState(false);

    const columns = [
        {
            title: 'Waktu',
            dataIndex: 'Waktu',
            key: 'Waktu',
            align: 'center',
            width: 50,
            render: (text) => <span>{dayjs(text).format("DD-MM-YYYY HH:mm")}</span>,
        },
        {
            title: 'Implementasi',
            dataIndex: 'Implementasi',
            key: 'Implementasi',
        },
        {
            title: "Aksi",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 90,
            render: (text, record, index) => (
                <Space size="small">
                    <Button
                        onClick={() => klikEditImp(index)}
                        type="primary"
                        icon={<EditOutlined />}
                        // disabled={record.StsDatang}
                        // disabled
                        size="small"
                        style={{ width: '30px' }}
                    />
                    <Button
                        type="primary"
                        danger
                        onClick={() => klikDelImp(index)}
                        size="small"
                        style={{ width: '30px' }}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ];

    const columnsa = [
        {
            title: 'NAMA BARANG',
            dataIndex: 'NAMABARANG',
            key: 'NAMABARANG',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'QTY BARANG',
            dataIndex: 'QTYBAR',
            key: 'QTYBAR',
            align: 'center',
        },
        {
            title: 'SATUAN',
            dataIndex: 'SATUAN',
            key: 'SATUAN',
            align: 'center',
        },
        {
            title: 'ATURAN PAKAI',
            dataIndex: 'KODEATRPK',
            key: 'KODEATRPK',
            align: 'center',
        },
        // {
        //     title: "Aksi",
        //     key: "operation",
        //     fixed: "right",
        //     align: "center",
        //     width: 90,
        //     render: (text, record, index) => (
        //         <Space size="small">
        //             <Button
        //                 onClick={() => klikEditImp(index)}
        //                 type="primary"
        //                 icon={<EditOutlined />}
        //                 // disabled={record.StsDatang}
        //                 // disabled
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             />
        //             <Button
        //                 type="primary"
        //                 danger
        //                 onClick={() => klikDelImp(index)}
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             >
        //                 <DeleteOutlined />
        //             </Button>
        //         </Space>
        //     ),
        // },
    ];

    const columnsc = [
        {
            title: 'Nomor Billing Lab',
            dataIndex: 'BillingNomor',
            key: 'BillingNomor',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'Tanggal',
            dataIndex: 'UserDate',
            key: 'UserDate',
            align: 'center',
            render: (record) => <div>{dayjs(record).format("DD-MM-YYYY")}</div>,
        },
        {
            title: "Aksi",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 100,
            render: (text, record, index) => (
                <Button
                    onClick={() => klikDetailHasilLab(record.BillingNomor)}
                    type="primary"
                    icon={<FileSearchOutlined />}
                    // disabled={record.StsDatang}
                    // disabled
                    size="small"
                    style={{ width: '30px' }}
                />
            ),
        },
    ];

    const columnsb = [
        {
            title: 'NAMA BARANG',
            dataIndex: 'NAMABARANG',
            key: 'NAMABARANG',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'QTY BARANG',
            dataIndex: 'QTYBAR',
            key: 'QTYBAR',
            align: 'center',
        },
        {
            title: 'SATUAN',
            dataIndex: 'SATRSP',
            key: 'SATRSP',
            align: 'center',
        },
        {
            title: 'ATURAN PAKAI',
            dataIndex: 'KODEATRPK',
            key: 'KODEATRPK',
            align: 'center',
        },
        // {
        //     title: "Aksi",
        //     key: "operation",
        //     fixed: "right",
        //     align: "center",
        //     width: 90,
        //     render: (text, record, index) => (
        //         <Space size="small">
        //             <Button
        //                 onClick={() => klikEditImp(index)}
        //                 type="primary"
        //                 icon={<EditOutlined />}
        //                 // disabled={record.StsDatang}
        //                 // disabled
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             />
        //             <Button
        //                 type="primary"
        //                 danger
        //                 onClick={() => klikDelImp(index)}
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             >
        //                 <DeleteOutlined />
        //             </Button>
        //         </Space>
        //     ),
        // },
    ];

    const columnsd = [
        {
            title: 'PEMERIKSAAN',
            dataIndex: 'LabNama',
            key: 'LabNama',
            // align: 'center',
            // width: 50,
        },
        {
            title: 'HASIL',
            dataIndex: 'LabHasil',
            key: 'LabHasil',
            align: 'center',
        },
        {
            title: 'INTERPRETASI',
            dataIndex: 'flag',
            key: 'flag',
            align: 'center',
        },
        {
            title: 'SATUAN',
            dataIndex: 'LabSatuan',
            key: 'LabSatuan',
            align: 'center',
        },
        {
            title: 'NILAI NORMAL',
            dataIndex: 'LabHargaNorm',
            key: 'LabHargaNorm',
            align: 'center',
        },
        // {
        //     title: "Aksi",
        //     key: "operation",
        //     fixed: "right",
        //     align: "center",
        //     width: 90,
        //     render: (text, record, index) => (
        //         <Space size="small">
        //             <Button
        //                 onClick={() => klikEditImp(index)}
        //                 type="primary"
        //                 icon={<EditOutlined />}
        //                 // disabled={record.StsDatang}
        //                 // disabled
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             />
        //             <Button
        //                 type="primary"
        //                 danger
        //                 onClick={() => klikDelImp(index)}
        //                 size="small"
        //                 style={{ width: '30px' }}
        //             >
        //                 <DeleteOutlined />
        //             </Button>
        //         </Space>
        //     ),
        // },
    ];

    const coltbRiwayatProtokol = [
        {
            title: "No.Registrasi",
            dataIndex: "RegistrasiId",
            key: "RegistrasiId",
            align: "center",
            width: 100,
        },
        {
            title: <div style={{ textAlign: "center" }}>Nama Protokol</div>,
            dataIndex: "NamaProtokol",
            key: "NamaProtokol",
            width: 100,
            // align: 'center',
        },
        {
            title: <div style={{ textAlign: "center" }}>Nama Dokter</div>,
            dataIndex: "NAMADOKTER",
            key: "NAMADOKTER",
            width: 100,
            // align: 'center',
        },
        {
            title: <div style={{ textAlign: "center" }}>Obat</div>,
            dataIndex: "ObatProtokol",
            key: "ObatProtokol",
            render: (text) => <div>{ReactHtmlParser(text)}</div>,
            width: 300,
            // align: 'center',
        },
        {
            title: <div style={{ textAlign: "center" }}>Prosedur Pelaksanaan</div>,
            dataIndex: "ProsedurProtokol",
            key: "ProsedurProtokol",
            render: (text) => <div>{ReactHtmlParser(text)}</div>,
            // align: 'center',
        },
        {
            title: "Aksi",
            key: "operation",
            // fixed: "right",
            align: "center",
            width: 90,
            render: (text, record, index) => (
                <Button
                    onClick={() => klikSalinRiwayat(record)}
                    type="primary"
                    icon={<CopyOutlined />}
                    size="small"
                // style={{ width: '30px' }}
                >
                    Salin
                </Button>
            ),
        },
    ];

    const colTotalSiklus = [
        {
            title: 'RegistrasiId',
            dataIndex: 'RegistrasiId',
            key: 'RegistrasiId',
            align: 'center',
        },
        {
            title: 'TotalSiklus',
            dataIndex: 'TotalSiklus',
            key: 'TotalSiklus',
            align: 'center',
        },
    ]

    const data = [];
    for (let i = 0; i < 20; i++) {
        data.push({
            key: i,
            Jam: "23:59",
            Implementasi: "Implementasi Implementasi Implementasi Implementasi Implementasi Implementasi Implementasi Implementasi Implementasi Implementasi",
        });
    }

    const modules = {
        toolbar: [
            ["bold", "italic", "underline"],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            [{ color: [] }],
            // ['link', 'image'],
            // ['clean']
        ],
    };

    const disabledDate = (current) => {
        // Mengambil tanggal saat ini
        const tgl = tglPmr;

        // Mengatur tanggal saat ini ke awal hari (00:00:00)
        tgl.startOf('day')

        const tglSehariSebelumnya = tgl.clone().subtract(2, 'day');

        // Mengembalikan 'true' jika tanggal saat ini lebih besar atau sama dengan 'current'
        return current && current < tglSehariSebelumnya;
    };

    const klikDaftarObat = () => {
        setmdDaftarObat(true)
        getDataObat(noReg, unitId)
        // getDataObat('2212190001', '9114')
    }

    const klikHasilLab = () => {
        setmdHasilLab(true)
        setbillNomor('')
        setlistHasilLab([])
        getBillNoLab(pasienId)
    }

    const klikDetailHasilLab = (data) => {
        getDetailHasilLab(data)
        setbillNomor(data)
    }

    const klikTambah = () => {
        setjamImp(dayjs(tglPmr).startOf('day'))
        settempIndex('')
        settempImp('')
        settambahData(true)
    }

    const klikSimpanImp = () => {
        // console.log(dayjs(jamImp).format('YYYY-MM-DD hh:mm'));
        if (dayjs(jamImp).format('hh:mm') === '12:00') {
            Modal.warning({ title: 'Peringatan!', content: 'Jam masih kosong!' })
        }
        else if (tempImp.length === 0) {
            Modal.warning({ title: 'Peringatan!', content: 'Implementasi masih kosong!' })
        }
        else if (tempIndex === null || tempIndex.length === 0) {
            setlistImplementasi((current) => [
                ...current,
                {
                    noOrder: noOrder ? noOrder : '0',
                    Waktu: dayjs(jamImp).format(),
                    Implementasi: tempImp,
                    UserId: user,
                    clientIP: ipKomp,
                    clientHost: hostKomp
                },
            ]);
            settambahData(false)
        }
        else {
            let items = [...listImplementasi];
            let item = { ...items[tempIndex] };

            item.Waktu = dayjs(jamImp).format();
            item.Implementasi = tempImp;
            item.UserId = user;

            items[tempIndex] = item;
            setlistImplementasi(items);
            settambahData(false)
        }
    }

    const klikEditImp = (index) => {
        settambahData(true)
        let temp = listImplementasi[index];
        // console.log(temp);
        // console.log(dayjs(temp.jam).format('HH:mm'));

        settempIndex(index);
        setjamImp(dayjs(temp.Waktu));
        settempImp(temp.Implementasi);
    };

    const klikDelImp = (index) => {
        setlistImplementasi((prevActions) =>
            // Filter out the item with the matching index
            prevActions.filter((value, i) => i !== index)
        );
    };

    const klikOkMdUpdate = () => {
        lookUpPerawat()
        // getListOrder(dayjs(tglOrder).format('YYYY-MM-DD'), unitId, stat, '%20')
        setmdInfoUpdate(false)
    }

    const gcsTotal =
        parseInt(gcsGerakan) + parseInt(gcsMata) + parseInt(gcsSuara);

    const showModalLila = () => {
        setIsModalLila(true);
    };

    const skorNyeriKirim =
        scalaNyeri === "Visual Analog Scale"
            ? parseInt(skalaNyeri1)
            : scalaNyeri === "FLACC"
                ? parseInt(skalaNyeri1) +
                parseInt(skalaNyeri2) +
                parseInt(skalaNyeri3) +
                parseInt(skalaNyeri4) +
                parseInt(skalaNyeri5)
                : scalaNyeri === "NIPS"
                    ? parseInt(skalaNyeri1) +
                    parseInt(skalaNyeri2) +
                    parseInt(skalaNyeri3) +
                    parseInt(skalaNyeri4) +
                    parseInt(skalaNyeri5) +
                    parseInt(skalaNyeri6)
                    : scalaNyeri === "NVPS"
                        ? parseInt(skalaNyeri1) +
                        parseInt(skalaNyeri2) +
                        parseInt(skalaNyeri3) +
                        parseInt(skalaNyeri4) +
                        parseInt(skalaNyeri5)
                        : scalaNyeri === "Wong Bakes Facies"
                            ? parseInt(skalaNyeri1)
                            : scalaNyeri === "NPRS"
                                ? parseInt(skalaNyeri1)
                                : null;

    const stylekuNyeriWong = isNaN(skorNyeriKirim)
        ? { width: "55%" }
        : skorNyeriKirim === 0
            ? { backgroundColor: "lightgreen", width: "55%" }
            : skorNyeriKirim === 1
                ? { backgroundColor: "lightyellow", width: "55%" }
                : skorNyeriKirim > 1 && skorNyeriKirim < 4
                    ? { backgroundColor: "darkorange", width: "55%" }
                    : skorNyeriKirim > 3 && skorNyeriKirim < 6
                        ? { backgroundColor: "lightcoral", width: "55%" }
                        : { width: "55%" };

    const ketWongBakesFacies =
        skorNyeriKirim === 0
            ? "Tidak Nyeri"
            : skorNyeriKirim === 1
                ? "Nyeri Ringan"
                : skorNyeriKirim > 1 && skorNyeriKirim < 4
                    ? "Nyeri Sedang"
                    : skorNyeriKirim > 3 && skorNyeriKirim < 6
                        ? "Nyeri Berat"
                        : "";

    const stylekuNyeriLain = isNaN(skorNyeriKirim)
        ? { width: "55%" }
        : skorNyeriKirim === 0
            ? { backgroundColor: "lightgreen", width: "55%" }
            : skorNyeriKirim > 0 && skorNyeriKirim < 4
                ? { backgroundColor: "lightyellow", width: "55%" }
                : skorNyeriKirim > 3 && skorNyeriKirim < 7
                    ? { backgroundColor: "darkorange", width: "55%" }
                    : skorNyeriKirim > 6 && skorNyeriKirim < 11
                        ? { backgroundColor: "lightcoral", width: "55%" }
                        : { width: "55%" };

    const ketNyeriLain =
        skorNyeriKirim === 0
            ? "Tidak Nyeri"
            : skorNyeriKirim > 0 && skorNyeriKirim < 4
                ? "Nyeri Ringan"
                : skorNyeriKirim > 3 && skorNyeriKirim < 7
                    ? "Nyeri Sedang"
                    : skorNyeriKirim > 6 && skorNyeriKirim < 11
                        ? "Nyeri Berat"
                        : "";

    const resikoJatuh =
        parseInt(rJatuh1.split("-").pop()) === 6 ||
            parseInt(rJatuh2.split("-").pop()) === 6
            ? 6
            : 0;

    const statusMental =
        parseInt(sMental1.split("-").pop()) === 14 ||
            parseInt(sMental2.split("-").pop()) === 14 ||
            parseInt(sMental3.split("-").pop()) === 14
            ? 14
            : 0;

    const penglihatanMata =
        parseInt(sMata1.split("-").pop()) === 1 ||
            parseInt(sMata2.split("-").pop()) === 1 ||
            parseInt(sMata3.split("-").pop()) === 1
            ? 1
            : 0;

    const mobilitasTransfer =
        parseInt(transferTT.split("-").pop()) +
            parseInt(mobilitas.split("-").pop()) <
            4
            ? 0
            : 7;

    const skorOntario =
        parseInt(resikoJatuh) +
        parseInt(statusMental) +
        parseInt(penglihatanMata) +
        parseInt(mobilitasTransfer) +
        parseInt(kebiasaanBerkemih.split("-").pop());

    const skorHumptyDumpty =
        parseInt(humDumUsia.split("-").pop()) +
        parseInt(humDumKel.split("-").pop()) +
        parseInt(humDumDiagnosa.split("-").pop()) +
        parseInt(humDumGangguanKognitif.split("-").pop()) +
        parseInt(humDumLingkungan.split("-").pop()) +
        parseInt(humDumRespon.split("-").pop()) +
        parseInt(humDumPemObat.split("-").pop());

    const skorMorse =
        parseInt(morseRiwJatuh.split("-").pop()) +
        parseInt(morseDiagnosa.split("-").pop()) +
        parseInt(morseKondisiJalan.split("-").pop()) +
        parseInt(morseInfus.split("-").pop()) +
        parseInt(morseKondisiBadan.split("-").pop()) +
        parseInt(morseGangKognitif.split("-").pop());

    const stylekuHumptyDumpty =
        skorHumptyDumpty === ""
            ? { width: "55%" }
            : skorHumptyDumpty < 7
                ? { backgroundColor: "lightgreen", width: "55%" }
                : skorHumptyDumpty > 6 && skorHumptyDumpty < 12
                    ? { backgroundColor: "darkorange", width: "55%" }
                    : skorHumptyDumpty > 11
                        ? { backgroundColor: "lightcoral", width: "55%" }
                        : { width: "55%" };

    const ketHumptyDumpty =
        skorHumptyDumpty === ""
            ? ""
            : skorHumptyDumpty < 7
                ? "Tidak Ada Risiko"
                : skorHumptyDumpty > 6 && skorHumptyDumpty < 12
                    ? "Risiko Rendah"
                    : skorHumptyDumpty > 11
                        ? "Risiko Tinggi"
                        : "";

    const stylekuOntario =
        skorOntario === ""
            ? { width: "55%" }
            : skorOntario >= 0 && skorOntario < 6
                ? { backgroundColor: "lightgreen", width: "55%" }
                : skorOntario > 5 && skorOntario < 17
                    ? { backgroundColor: "darkorange", width: "55%" }
                    : skorOntario > 16 && skorOntario < 31
                        ? { backgroundColor: "lightcoral", width: "55%" }
                        : { width: "55%" };

    const ketOntario =
        skorOntario === ""
            ? ""
            : skorOntario >= 0 && skorOntario < 6
                ? "Risiko Rendah"
                : skorOntario > 5 && skorOntario < 17
                    ? "Risiko Sedang"
                    : skorOntario > 16 && skorOntario < 31
                        ? "Risiko Tinggi"
                        : "";

    const stylekuMorse =
        skorMorse === ""
            ? { width: "55%" }
            : skorMorse >= 0 && skorMorse < 25
                ? { backgroundColor: "lightgreen", width: "55%" }
                : skorMorse > 24 && skorMorse < 51
                    ? { backgroundColor: "darkorange", width: "55%" }
                    : skorMorse > 50
                        ? { backgroundColor: "lightcoral", width: "55%" }
                        : { width: "55%" };

    const ketMorse =
        skorMorse === ""
            ? ""
            : skorMorse >= 0 && skorMorse < 25
                ? "Tidak Ada Risiko"
                : skorMorse > 24 && skorMorse < 51
                    ? "Risiko Rendah"
                    : skorMorse > 50
                        ? "Risiko Tinggi"
                        : "";

    const IMT = (beratBadan / Math.pow(tinggiBadan / 100, 2)).toFixed(2);
    const statusGizi =
        IMT < 18.5
            ? "Berat Badan Kurang (Underweight)"
            : IMT >= 18.5 && IMT <= 22.9
                ? "Berat Badan Normal"
                : IMT >= 23 && IMT <= 24.9
                    ? "Kelebihan Berat Badan (Overweight) Dengan Resiko"
                    : IMT >= 25 && IMT <= 29.9
                        ? "Obesitas I"
                        : IMT >= 30
                            ? "Obesitas II"
                            : "-";

    const stylekuIMT = isNaN(IMT)
        ? { width: "70%" }
        : IMT < 18.5
            ? { backgroundColor: "lightcyan", width: "70%" }
            : IMT >= 18.5 && IMT <= 22.9
                ? { backgroundColor: "lightgreen", width: "70%" }
                : IMT >= 23 && IMT <= 24.9
                    ? { backgroundColor: "lightblue", width: "70%" }
                    : IMT >= 25 && IMT <= 29.9
                        ? { backgroundColor: "lightpink", width: "70%" }
                        : IMT >= 30
                            ? { backgroundColor: "lightcoral", width: "70%" }
                            : { width: "70%" };

    const bblila = ((lila / 26.3) * (tinggiBadan - 100)).toFixed(2);

    const handleOkLila = () => {
        setIsModalLila(false);
        setberatBadan(bblila);
    };

    const handleOk = () => {
        setvisibleNyeri(false);
        setvisibleJatuh(false);
        setvisibleNutrisi(false);
        setvisibleEws(false);
        setvisibleMeows(false);
        setvisibleSkorDown(false);
        setvisibleLatch(false);
        setvisibleAktivitasLatihan(false);
        setvisibleBartelIndex(false);
    };

    const formItemLayout1 = {
        labelCol: { span: 12 },
        wrapperCol: { span: 22 },
    };

    const formItemLayout2 = {
        labelCol: { span: 6 },
        wrapperCol: { span: 18 },
    };

    const formItemLayout24 = {
        labelCol: { span: 4 },
        wrapperCol: { span: 20 },
    };

    const marks = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
    };

    const marks1 = {
        0: 0,
        1: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
    };

    const handleCancelLila = () => {
        setIsModalLila(false);
    };

    const datatandavital = {
        tandaVitalId: tandaVitalId,
        registrasiId: noReg,
        ruangId: unitId,
        pegawaiId: perawat,
        tanggal: dayjs(tglOrder).format("YYYY-MM-DD"),
        jam: dayjs(tglOrder).format("YYYY-MM-DD"),
        gcsMata: parseInt(gcsMata),
        gcsSuara: parseInt(gcsSuara),
        gcsGerakan: parseInt(gcsGerakan),
        gcsTotal: parseInt(gcsTotal),
        tingkatKesadaranId:
            gcsTotal === 3
                ? "50"
                : gcsTotal === 4
                    ? "40"
                    : gcsTotal > 4 && gcsTotal < 7
                        ? "30"
                        : gcsTotal > 6 && gcsTotal < 10
                            ? "20"
                            : "10",
        iramaNadi: iramaNadi,
        saturasiOksigen: parseInt(saturasiOksigen),
        tekananDarahSistolik: parseInt(tekananDarahSistolik),
        tekananDarahDiastolik: parseInt(tekananDarahDiastolik),
        suhuTubuh: parseFloat(suhuTubuh),
        frekuensiNadi: parseInt(frekuensiNadi),
        frekuensiNafas: parseInt(frekuensiNafas),
        skorNyeri: parseInt(skorNyeriKirim),
        resikoJatuh:
            metodeResikoJatuh === "HUMPTY DUMPTY"
                ? skorHumptyDumpty
                : metodeResikoJatuh === "ONTARIO"
                    ? skorOntario
                    : metodeResikoJatuh === "MORSE"
                        ? skorMorse
                        : null,
        tinggiBadan: parseInt(tinggiBadan),
        beratBadan: parseFloat(beratBadan),
        userId: user,
        clientHost: ipKomp,
        clientIP: hostKomp,
    };

    const datanyeri = {
        id: 0,
        registrasiId: noReg,
        ruangId: unitId,
        tanggal: dayjs(tglOrder).format("YYYY-MM-DD"),
        metode: scalaNyeri,
        keterangan:
            scalaNyeri === "Wong Bakes Facies" ? ketWongBakesFacies : ketNyeriLain,
        userId: user,
        detailNyeri:
            scalaNyeri === "Visual Analog Scale"
                ? [
                    {
                        parameter: "VisualAnalogSkala",
                        value: skalaNyeri1,
                    },
                ]
                : scalaNyeri === "FLACC"
                    ? [
                        {
                            parameter: "EkspresiWajah",
                            value: skalaNyeri1,
                        },
                        {
                            parameter: "Kaki",
                            value: skalaNyeri2,
                        },
                        {
                            parameter: "Aktivitas",
                            value: skalaNyeri3,
                        },
                        {
                            parameter: "Menangis",
                            value: skalaNyeri4,
                        },
                        {
                            parameter: "Kenyamanan",
                            value: skalaNyeri5,
                        },
                    ]
                    : scalaNyeri === "NIPS"
                        ? [
                            {
                                parameter: "EkspresiWajah",
                                value: skalaNyeri1,
                            },
                            {
                                parameter: "Menangis",
                                value: skalaNyeri2,
                            },
                            {
                                parameter: "PolaBernafas",
                                value: skalaNyeri3,
                            },
                            {
                                parameter: "Lengan",
                                value: skalaNyeri4,
                            },
                            {
                                parameter: "Kaki",
                                value: skalaNyeri5,
                            },
                            {
                                parameter: "KeadaanRangsangan",
                                value: skalaNyeri6,
                            },
                        ]
                        : scalaNyeri === "NVPS"
                            ? [
                                {
                                    parameter: "EkspresiWajah",
                                    value: skalaNyeri1,
                                },
                                {
                                    parameter: "Aktivitas",
                                    value: skalaNyeri2,
                                },
                                {
                                    parameter: "Melindungi",
                                    value: skalaNyeri3,
                                },
                                {
                                    parameter: "Fisiologis",
                                    value: skalaNyeri4,
                                },
                                {
                                    parameter: "Respirasi",
                                    value: skalaNyeri5,
                                },
                            ]
                            : scalaNyeri === "Wong Bakes Facies"
                                ? [
                                    {
                                        parameter: "WongBakesFaciesSkala",
                                        value: skalaNyeri1,
                                    },
                                ]
                                : scalaNyeri === "NPRS"
                                    ? [
                                        {
                                            parameter: "NPRSSkala",
                                            value: skalaNyeri1,
                                        },
                                    ]
                                    : null,
    };

    const dataResikoJatuh = {
        registrasiId: noReg,
        pasienId: pasienId,
        ruangId: unitId,
        tanggal: dayjs(tglOrder).format("YYYY-MM-DD 00:00").toString(),
        metode: metodeResikoJatuh,
        totalScore:
            metodeResikoJatuh === "HUMPTY DUMPTY"
                ? skorHumptyDumpty
                : metodeResikoJatuh === "ONTARIO"
                    ? skorOntario
                    : metodeResikoJatuh === "MORSE"
                        ? skorMorse
                        : null,
        keterangan:
            metodeResikoJatuh === "HUMPTY DUMPTY"
                ? ketHumptyDumpty
                : metodeResikoJatuh === "ONTARIO"
                    ? ketOntario
                    : metodeResikoJatuh === "MORSE"
                        ? ketMorse
                        : null,
        userId: user,
        detail:
            metodeResikoJatuh === "HUMPTY DUMPTY"
                ? [
                    {
                        parameter: "Usia",
                        kriteria: humDumUsia.split("-").shift().toString(),
                        jawaban: parseInt(humDumUsia.split("-").pop()),
                    },
                    {
                        parameter: "JenisKelamin",
                        kriteria: humDumKel.split("-").shift().toString(),
                        jawaban: parseInt(humDumKel.split("-").pop()),
                    },
                    {
                        parameter: "Diagnosa",
                        kriteria: humDumDiagnosa.split("-").shift().toString(),
                        jawaban: parseInt(humDumDiagnosa.split("-").pop()),
                    },
                    {
                        parameter: "GangguanKognitif",
                        kriteria: humDumGangguanKognitif.split("-").shift().toString(),
                        jawaban: parseInt(humDumGangguanKognitif.split("-").pop()),
                    },
                    {
                        parameter: "FaktorLingkungan",
                        kriteria: humDumLingkungan.split("-").shift().toString(),
                        jawaban: parseInt(humDumLingkungan.split("-").pop()),
                    },
                    {
                        parameter: "Respon",
                        kriteria: humDumRespon.split("-").shift().toString(),
                        jawaban: parseInt(humDumRespon.split("-").pop()),
                    },
                    {
                        parameter: "PemakaianObat",
                        kriteria: humDumPemObat.split("-").shift().toString(),
                        jawaban: parseInt(humDumPemObat.split("-").pop()),
                    },
                ]
                : metodeResikoJatuh === "MORSE"
                    ? [
                        {
                            parameter: "RiwayatJatuh",
                            kriteria: morseRiwJatuh.split("-").shift().toString(),
                            jawaban: parseInt(morseRiwJatuh.split("-").pop()),
                        },
                        {
                            parameter: "Diagnosa",
                            kriteria: morseDiagnosa.split("-").shift().toString(),
                            jawaban: parseInt(morseDiagnosa.split("-").pop()),
                        },
                        {
                            parameter: "KondisiJalan",
                            kriteria: morseKondisiJalan.split("-").shift().toString(),
                            jawaban: parseInt(morseKondisiJalan.split("-").pop()),
                        },
                        {
                            parameter: "Infus",
                            kriteria: morseInfus.split("-").shift().toString(),
                            jawaban: parseInt(morseInfus.split("-").pop()),
                        },
                        {
                            parameter: "KondisiBadan",
                            kriteria: morseKondisiBadan.split("-").shift().toString(),
                            jawaban: parseInt(morseKondisiBadan.split("-").pop()),
                        },
                        {
                            parameter: "GangguanKognitif",
                            kriteria: morseGangKognitif.split("-").shift().toString(),
                            jawaban: parseInt(morseGangKognitif.split("-").pop()),
                        },
                    ]
                    : metodeResikoJatuh === "ONTARIO"
                        ? [
                            {
                                parameter: "RiwayatJatuh",
                                kriteria: rJatuh1.split("-").shift().toString(),
                                jawaban: parseInt(rJatuh1.split("-").pop()),
                            },
                            {
                                parameter: "RiwayatJatuh",
                                kriteria: rJatuh2.split("-").shift().toString(),
                                jawaban: parseInt(rJatuh2.split("-").pop()),
                            },
                            {
                                parameter: "StatusMental",
                                kriteria: sMental1.split("-").shift().toString(),
                                jawaban: parseInt(sMental1.split("-").pop()),
                            },
                            {
                                parameter: "StatusMental",
                                kriteria: sMental2.split("-").shift().toString(),
                                jawaban: parseInt(sMental2.split("-").pop()),
                            },
                            {
                                parameter: "StatusMental",
                                kriteria: sMental3.split("-").shift().toString(),
                                jawaban: parseInt(sMental3.split("-").pop()),
                            },
                            {
                                parameter: "Penglihatan",
                                kriteria: sMata1.split("-").shift().toString(),
                                jawaban: parseInt(sMata1.split("-").pop()),
                            },
                            {
                                parameter: "Penglihatan",
                                kriteria: sMata2.split("-").shift().toString(),
                                jawaban: parseInt(sMata2.split("-").pop()),
                            },
                            {
                                parameter: "Penglihatan",
                                kriteria: sMata3.split("-").shift().toString(),
                                jawaban: parseInt(sMata3.split("-").pop()),
                            },
                            {
                                parameter: "KebiasaanBerkemih",
                                kriteria: kebiasaanBerkemih.split("-").shift().toString(),
                                jawaban: parseInt(kebiasaanBerkemih.split("-").pop()),
                            },
                            {
                                parameter: "Transfer",
                                kriteria: transferTT.split("-").shift().toString(),
                                jawaban: parseInt(transferTT.split("-").pop()),
                            },
                            {
                                parameter: "Mobilitas",
                                kriteria: mobilitas.split("-").shift().toString(),
                                jawaban: parseInt(mobilitas.split("-").pop()),
                            },
                        ]
                        : null,
    };

    const klikSimpan = () => {
        // setspSimpanKemoLaporan(true)
        if (dayjs(tglPmr).format('YYYY-MM-DD') !== dayjs(tglOrder).format('YYYY-MM-DD')) {
            Modal.warning({ title: 'Peringatan!', content: 'Tanggal List Order tidak sama dengan Tanggal Penyinaran!' })
        }
        else if (!perawat) {
            Modal.warning({ title: 'Peringatan!', content: 'Perawat masih kosong!' })
        }
        else if (!ttlSiklus) {
            Modal.warning({ title: 'Peringatan!', content: 'Total Siklus masih kosong!' })
        }
        else if (!siklusUtama) {
            Modal.warning({ title: 'Peringatan!', content: 'Siklus Utama masih kosong!' })
        }
        // else if (jnsRawat !== "91" && !gcsMata) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Buka Mata(GCS) masih kosong!.",
        //     })
        // }
        // else if (jnsRawat !== "91" && !gcsGerakan) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Motorik(GCS) masih kosong!.",
        //     })
        // }
        // else if (jnsRawat !== "91" && !gcsSuara) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Bicara(GCS) masih kosong!.",
        //     })
        // }
        // else if (tekananDarahSistolik === "" || tekananDarahSistolik === " " || tekananDarahSistolik === null) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Tekanan Darah Sistolik Pasien.",
        //     })
        // }
        // else if (tekananDarahDiastolik === "" || tekananDarahDiastolik === " " || tekananDarahDiastolik == null) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Tekanan Darah Diastolik Pasien.",
        //     })
        // }
        // else if (frekuensiNadi === "" || frekuensiNadi === " " || frekuensiNadi === null) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Nadi Pasien.",
        //     })
        // }
        // else if (iramaNadi === "" || iramaNadi === " " || iramaNadi === null) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Irama Nadi Pasien.",
        //     })
        // }
        // else if (suhuTubuh === "" || suhuTubuh === " " || suhuTubuh === null) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Suhu Tubuh Pasien.",
        //     })
        // }
        // else if (frekuensiNafas === "" || frekuensiNafas === " " || frekuensiNafas === null) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Frekuensi Nafas Pasien.",
        //     })
        // }
        // else if (saturasiOksigen === "" || saturasiOksigen === " " || saturasiOksigen === null) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Satursi Nafas Tubuh Pasien.",
        //     })
        // }
        // else if (beratBadan === "" || beratBadan === " " || beratBadan === null) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Berat Badan Pasien.",
        //     })
        // }
        // else if (tinggiBadan === "" || tinggiBadan === " " || tinggiBadan === null) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Tinggi Badan Pasien.",
        //     })
        // }
        // else if (isNaN(skorNyeriKirim)) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Skor Nyeri Pasien.",
        //     })
        // }
        // else if (isNaN(skorOntario) && isNaN(skorHumptyDumpty) && isNaN(skorMorse)) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Silahkan Isi Skor Resiko Jatuh Pasien.",
        //     })
        // }
        // else if (jnsRawat !== "91" && !gcsMata) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Buka Mata(GCS) masih kosong!.",
        //     })
        // }
        // else if (jnsRawat !== "91" && !gcsGerakan) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Motorik(GCS) masih kosong!.",
        //     })
        // }
        // else if (jnsRawat !== "91" && !gcsSuara) {
        //     Modal.warning({
        //         title: "Peringatan",
        //         content: "Bicara(GCS) masih kosong!.",
        //     })
        // }
        else {
            let data = {}

            data.id = idLap ? idLap : 0
            data.registrasiId = noReg;
            data.pasienId = pasienId;
            data.noOrder = noOrder;
            data.tglPemeriksaan = dayjs(tglPmr).format();
            data.ruangId = unitId;
            data.siklusUtama = siklusUtama;
            data.totalSiklus = ttlSiklus;
            data.secondLine = secondLine;
            data.konsolidasi = konsolidasi;
            data.weekly = weekly;
            data.kodePerawat = perawat;
            data.anamnesa = anamnesa;
            data.pmrFisik = pmrFisik;
            data.terapi = terapi;
            data.hasilPenunjang = labRo;
            data.masalahKeperawatan = mslkeperawatan;
            data.listImplementasi = listImplementasi;
            data.subjek = sbj;
            data.objek = obj;
            data.analisis = analysis;
            data.planning = plan;
            data.dischargePlanning = dischargeplan;
            data.userId = user;
            data.clientHost = hostKomp;
            data.clientIP = ipKomp;

            console.log('data : ', data);
            console.log('datatandavital : ', datatandavital);
            console.log('datanyeri : ', datanyeri);
            console.log('dataResikoJatuh : ', dataResikoJatuh);
            simpanKemoLaporan(data, datatandavital, datanyeri, dataResikoJatuh);
        }
    }

    const rstKlikTambah = () => {
        setdrProt();
        setidProt();
        setobatProt();
        setprosProt();
    }

    const rstMdProt = () => {
        setidProt();
        setobatProt();
        setprosProt();
    }

    const simpanProtokol = () => {
        if (!drProt) {
            Modal.warning({
                title: 'Peringatan!',
                content: 'Dokter masih kosong.',
            });
        }
        else if (!idProt) {
            Modal.warning({
                title: 'Peringatan!',
                content: 'Nama Protokol masih kosong.',
            });
        }
        else {
            let data = {};
            data.registrasiId = noReg;
            data.pasienId = pasienId;
            data.tglProtokol = dayjs(tglPmr).format();
            data.dokterId = drProt;
            data.mstProtokolId = idProt;
            data.obatProtokol = obatProt;
            data.prosedurProtokol = prosProt;
            data.ruangId = unitId;
            data.userId = user;
            data.clientHost = hostKomp;
            data.clientIP = ipKomp;

            console.log("simpanProtokol : ", data);
            setmdProtKemo(false);
            insertProtokolKemo(data);
        }
    };

    const klikUbah = () => {
        if (unitId !== protokolKemo.RuangId) {
            Modal.warning({
                title: "Peringatan!",
                content: `Ruang Input anda berbeda dengan data sebelumnya sehingga tidak bisa mengubah Protokol Kemoterapi!
                     -> Ruang Input : ${protokolKemo.Deskripsi}`,
            });
        }
        else if (user !== protokolKemo.UserId) {
            Modal.warning({
                title: "Peringatan!",
                content: `User Input anda berbeda dengan data sebelumnya sehingga tidak bisa mengubah Protokol Kemoterapi!
                    -> User Input : ${protokolKemo.UserId}`,
            });
        }
        else {
            if (tempRtf === 0) {
                setmdProtKemo(true);
                Modal.info({
                    title: "Info",
                    content: "Klik OK untuk mengatur RTF Format.",
                    onOk: () => {
                        settempRtf(1);
                        setmdProtKemo(false);
                    },
                });
            }
            else {
                setmdProtKemo(true);
                if (optDokterAll.length === 0) {
                    lookUpDokterAll();
                };
                lookUpProtokol(protokolKemo.DokterId);
                setdrProt(protokolKemo.DokterId);
                setidProt(protokolKemo.MstProtokolId);
                setobatProt(protokolKemo.ObatProtokol);
                setprosProt(protokolKemo.ProsedurProtokol);
            };
        };
    };

    const klikRiwProtokol = () => {
        setmdRiwProtokol(true);
        getRiwProtokol(pasienId);
    };

    const klikSalinRiwayat = (data) => {
        setdrProt(data.DokterId);
        setidProt(data.MstProtokolId);
        setobatProt(data.ObatProtokol);
        setprosProt(data.ProsedurProtokol);

        message.success("Berhasil Disalin!");
    };

    // settingan info update otomatis
    const updateDate = '2025-03-18';
    const today = dayjs();
    // const today = dayjs('2024-09-06');
    const daysDifference = today.diff(dayjs(updateDate), 'day');

    return (
        <div>
            <Card loading={spSimpanKemoLaporan}>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        Tanggal :
                    </Col>
                    <Col span={9} style={{ paddingRight: '10px' }}>
                        <DatePicker
                            value={dayjs(tglPmr)}
                            onChange={(e) => settglPmr(e)}
                            // disabledDate={(current) => {
                            //     let customDate = dayjs().format("YYYY-MM-DD");
                            //     return current && current < dayjs(customDate, "YYYY-MM-DD");
                            // }}
                            size='small'
                            format='DD-MM-YYYY'
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '100%' }} />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '4px' }}>Diagnosa :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={diagnosa}
                            size='small'
                            style={{ width: '100%' }} />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        Siklus Utama :
                    </Col>
                    <Col span={3} style={{ paddingRight: '10px' }}>
                        <Input
                            type='number'
                            value={siklusUtama}
                            onChange={(e) => setsiklusUtama(e.target.value)}
                            min={0}
                            size='small'
                            onInput={(e) => e.target.value = e.target.value.slice(0, 2)}
                        />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '4px' }}>Total Siklus :</span>
                    </Col>
                    <Col span={3} style={{ paddingRight: '10px' }}>
                        <Tooltip title="Isikan jumlah total siklus yang harus dilakukan. Klik tombol disamping untuk melihat total siklus yang pernah diinputkan.">
                            <Space.Compact
                                style={{
                                    width: '100%',
                                }}
                            >
                                <Input
                                    type='number'
                                    value={ttlSiklus}
                                    onChange={(e) => setttlSiklus(e.target.value)}
                                    min={0}
                                    size='small'
                                    onInput={(e) => e.target.value = e.target.value.slice(0, 2)}
                                />
                                <Button
                                    size='small'
                                    type='primary'
                                    disabled={!pasienId}
                                    onClick={() => {
                                        getRiwTotalSiklus(pasienId);
                                        setmdRiwTotalSiklus(true);
                                    }}
                                    icon={<MonitorOutlined />}
                                    style={{ width: '40%' }}
                                />
                            </Space.Compact>
                        </Tooltip>
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '4px' }}>Second Line :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            type='number'
                            value={secondLine}
                            onChange={(e) => setsecondLine(e.target.value)}
                            min={0}
                            size='small'
                            onInput={(e) => e.target.value = e.target.value.slice(0, 2)}
                        />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={3}>
                        Konsolidasi :
                    </Col>
                    <Col span={9} style={{ paddingRight: '10px' }}>
                        <Input
                            type='number'
                            value={konsolidasi}
                            onChange={(e) => setkonsolidasi(e.target.value)}
                            min={0}
                            size='small'
                            onInput={(e) => e.target.value = e.target.value.slice(0, 1)}
                        />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '4px' }}>Weekly :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            type='number'
                            value={weekly}
                            onChange={(e) => setweekly(e.target.value)}
                            min={0}
                            size='small'
                            onInput={(e) => e.target.value = e.target.value.slice(0, 3)}
                        />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '5px' }}>
                    <Col span={3}>
                        Perawat :
                    </Col>
                    <Col span={21}>
                        <Input.Group compact>
                            <Select
                                // mode="multiple"
                                style={{ width: '95%' }}
                                placeholder="Pilih.."
                                value={perawat}
                                onChange={(e) => setperawat(e)}
                                size='small'
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
                                onClick={() => lookUpPerawat()}
                                type="primary"
                                size="small"
                                style={{ width: '5%' }}>
                                <CloudDownloadOutlined />
                            </Button>
                        </Input.Group>
                    </Col>
                </Row>

                <Divider
                    orientation='left'
                    style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                    Data Fokus
                </Divider>

                <Row>
                    <Col span={24}>
                        <span>Anamnesa :</span>
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <TextArea
                            value={anamnesa}
                            onChange={(e) => setanamnesa(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="Anamnesa"
                            maxLength={4000}
                        />
                    </Col>
                </Row>

                <hr />

                {/* <Row>
                    <Col span={24}>
                        <Card
                            loading={spingetTTVAssByRuang}>
                            <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
                                <Col xs={12} sm={12} md={8} lg={6} xl={6}>
                                    Buka Mata(E)
                                    <br />
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Select
                                            showSearch
                                            style={{ width: "100%" }}
                                            placeholder="..."
                                            optionFilterProp="children"
                                            // disabled={jnsRawat === "91" || !jnsRawat ? true : false}
                                            disabled
                                            allowClear={true}
                                            onChange={(e) => {
                                                setgcsMata(e);
                                            }}
                                            value={gcsMata}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                                0
                                            }
                                        >
                                            <Option value={4}>Spontan</Option>
                                            <Option value={3}>Dengan Perintah</Option>
                                            <Option value={2}>Dengan Rangsangan Nyeri</Option>
                                            <Option value={1}>
                                                Tidak Membuka<br></br> Dengan Rangsangan Apapun
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    Motorik(M)
                                    <br />
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Select
                                            showSearch
                                            style={{ width: "100%" }}
                                            placeholder="..."
                                            optionFilterProp="children"
                                            // disabled={jnsRawat === "91" || !jnsRawat ? true : false}
                                            disabled
                                            onChange={(e) => {
                                                setgcsGerakan(e);
                                            }}
                                            value={gcsGerakan}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                                0
                                            }
                                        >
                                            <Option value={6}>Mengikuti Perintah</Option>
                                            <Option value={5}>Melokalisir Nyeri</Option>
                                            <Option value={4}>Withdraws</Option>
                                            <Option value={3}>Menjauhi Rangsangan Nyeri</Option>
                                            <Option value={2}>Extensi Spontan</Option>
                                            <Option value={1}>Tidak Ada Gerakan</Option>
                                        </Select>
                                    </Form.Item>
                                    Bicara(V)
                                    <br />
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Select
                                            showSearch
                                            style={{ width: "100%" }}
                                            placeholder="..."
                                            optionFilterProp="children"
                                            // disabled={jnsRawat === "91" || !jnsRawat ? true : false}
                                            disabled
                                            onChange={(e) => {
                                                setgcsSuara(e);
                                            }}
                                            value={gcsSuara}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                                0
                                            }
                                        >
                                            <Option value={5}>Orientasi Baik</Option>
                                            <Option value={4}>Mengacau / Disorientasi</Option>
                                            <Option value={3}>
                                                Bisa Membentuk Kata<br></br>, Tidak Membentuk Kalimat
                                            </Option>
                                            <Option value={2}>
                                                Mengeluarkan Suara<br></br> Tanpa Arti
                                            </Option>
                                            <Option value={1}>Tidak Bersuara</Option>
                                        </Select>
                                    </Form.Item>
                                    GCS Total
                                    <br />
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Input
                                            disabled
                                            type="number"
                                            style={{ width: "100%" }}
                                            placeholder="..."
                                            value={gcsTotal}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={12} md={8} lg={6} xl={6}>
                                    <Row>
                                        <Col span={12}>
                                            TD Sistolik
                                            <br />
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Input
                                                    type="number"
                                                    placeholder="..."
                                                    style={{ width: "100%" }}
                                                    value={tekananDarahSistolik}
                                                    disabled
                                                    onChange={(e) => {
                                                        settekananDarahSistolik(e.target.value);
                                                        e.target.value < 91
                                                            ? setewsSistolik("1-3")
                                                            : e.target.value > 90 && e.target.value < 101
                                                                ? setewsSistolik("2-2")
                                                                : e.target.value > 100 && e.target.value < 111
                                                                    ? setewsSistolik("3-1")
                                                                    : e.target.value > 110 && e.target.value < 220
                                                                        ? setewsSistolik("4-0")
                                                                        : e.target.value > 219
                                                                            ? setewsSistolik("5-3")
                                                                            : setewsSistolik("");
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            TD Diastolik
                                            <br />
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Input
                                                    type="number"
                                                    placeholder="..."
                                                    style={{ width: "100%" }}
                                                    disabled
                                                    onChange={(e) => settekananDarahDiastolik(e.target.value)}
                                                    value={tekananDarahDiastolik}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            Nadi
                                            <br />
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Input
                                                    type="number"
                                                    placeholder="..."
                                                    value={frekuensiNadi}
                                                    disabled
                                                    style={{ width: "100%" }}
                                                    onChange={(e) => {
                                                        setfrekuensiNadi(e.target.value);
                                                        e.target.value < 41
                                                            ? setewsJantung("1-3")
                                                            : e.target.value > 40 && e.target.value < 51
                                                                ? setewsJantung("2-1")
                                                                : e.target.value > 50 && e.target.value < 91
                                                                    ? setewsJantung("3-0")
                                                                    : e.target.value > 90 && e.target.value < 111
                                                                        ? setewsJantung("4-1")
                                                                        : e.target.value > 110 && e.target.value < 131
                                                                            ? setewsJantung("5-2")
                                                                            : e.target.value > 130
                                                                                ? setewsJantung("6-3")
                                                                                : setewsJantung("");
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            Irama Nadi
                                            <br />
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Select
                                                    defaultValue="Teratur"
                                                    style={{ width: "100%" }}
                                                    placeholder="..."
                                                    value={iramaNadi}
                                                    disabled
                                                    onChange={(e) => setiramaNadi(e)}
                                                >
                                                    <Option value="Teratur">Teratur</Option>
                                                    <Option value="Tidak Teratur">Tidak Teratur</Option>
                                                </Select>
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col span={12}>
                                            Frekuensi Nafas
                                            <br />
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Input
                                                    type="number"
                                                    placeholder="..."
                                                    style={{ width: "100%" }}
                                                    value={frekuensiNafas}
                                                    disabled
                                                    onChange={(e) => {
                                                        setfrekuensiNafas(e.target.value);
                                                        e.target.value < 9
                                                            ? setewsRespirasi("1-3")
                                                            : e.target.value > 8 && e.target.value < 12
                                                                ? setewsRespirasi("2-1")
                                                                : e.target.value > 11 && e.target.value < 21
                                                                    ? setewsRespirasi("3-0")
                                                                    : e.target.value > 20 && e.target.value < 25
                                                                        ? setewsRespirasi("4-2")
                                                                        : e.target.value > 24
                                                                            ? setewsRespirasi("5-3")
                                                                            : setewsRespirasi("");
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                        <Col span={12}>
                                            Saturasi Oksigen
                                            <br />
                                            <Form.Item style={{ marginBottom: 0 }}>
                                                <Input
                                                    type="number"
                                                    placeholder="..."
                                                    style={{ width: "100%" }}
                                                    value={saturasiOksigen}
                                                    disabled
                                                    onChange={(e) => {
                                                        setsaturasiOksigen(e.target.value);
                                                        e.target.value < 92
                                                            ? setewsSatursiOksigen("1-3")
                                                            : e.target.value > 91 && e.target.value < 94
                                                                ? setewsSatursiOksigen("2-2")
                                                                : e.target.value > 93 && e.target.value < 95
                                                                    ? setewsSatursiOksigen("3-1")
                                                                    : e.target.value > 94
                                                                        ? setewsSatursiOksigen("4-0")
                                                                        : setewsSatursiOksigen("");
                                                    }}
                                                />
                                            </Form.Item>
                                        </Col>
                                    </Row>
                                    Suhu
                                    <br />
                                    <Tooltip title="Desimal Gunakan Tanda Titik [.]">
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <Input
                                                type="number"
                                                suffix="°C"
                                                placeholder="..."
                                                value={suhuTubuh}
                                                disabled
                                                onChange={(e) => {
                                                    setsuhuTubuh(e.target.value);
                                                    e.target.value < 35.1
                                                        ? setewsSuhu("1-3")
                                                        : e.target.value > 35 && e.target.value < 36.1
                                                            ? setewsSuhu("2-1")
                                                            : e.target.value > 36 && e.target.value < 38.1
                                                                ? setewsSuhu("3-0")
                                                                : e.target.value > 38 && e.target.value < 39.1
                                                                    ? setewsSuhu("4-1")
                                                                    : e.target.value > 38.9
                                                                        ? setewsSuhu("5-2")
                                                                        : setewsSuhu("");
                                                }}
                                                step={0.1}
                                            />
                                        </Form.Item>
                                    </Tooltip>
                                </Col>

                                <Col xs={12} sm={12} md={8} lg={6} xl={6}>
                                    Tinggi Badan
                                    <br />
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Input
                                            type="number"
                                            suffix="Cm"
                                            placeholder="..."
                                            value={tinggiBadan}
                                            disabled
                                            onChange={(e) => settinggiBadan(e.target.value)}
                                        />
                                    </Form.Item>

                                    Berat Badan
                                    <br />
                                    <Input.Group compact>
                                        <Button
                                            type="primary"
                                            // disabled={!tinggiBadan}
                                            disabled
                                            onClick={showModalLila}
                                            style={{ width: "30%" }}
                                        >
                                            LILA
                                        </Button>
                                        <Tooltip title="Desimal Gunakan Tanda Titik [.]">
                                            <Input
                                                type="number"
                                                suffix="Kg"
                                                placeholder="..."
                                                data-role="keypad"
                                                step={0.1}
                                                value={beratBadan}
                                                disabled
                                                onChange={(e) => setberatBadan(e.target.value)}
                                                style={{ width: "70%" }}
                                            />
                                        </Tooltip>
                                    </Input.Group>

                                    Tanggal
                                    <br />
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Input
                                            style={{ width: "100%" }}
                                            type="text"
                                            placeholder="..."
                                            disabled
                                            value={dayjs(tglTTV).format("DD-MM-YYYY HH:mm")}
                                        />
                                    </Form.Item>

                                    Telah Disi Oleh
                                    <br />
                                    <Form.Item style={{ marginBottom: 0 }}>
                                        <Input
                                            style={{ width: "100%" }}
                                            type="text"
                                            placeholder="..."
                                            disabled
                                            value={userEntry ? userEntry.toUpperCase() : userEntry}
                                        />
                                    </Form.Item>
                                </Col>

                                <Col xs={12} sm={12} md={8} lg={6} xl={6}>
                                    <Spin spinning={spin}>
                                        Skor Nyeri
                                        <br />
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <Input.Group compact>
                                                <Input
                                                    value={skorNyeriKirim}
                                                    style={{ width: "30%" }}
                                                    disabled
                                                    placeholder="..."
                                                />
                                                {scalaNyeri === "Wong Bakes Facies" ? (
                                                    <Input
                                                        style={stylekuNyeriWong}
                                                        type="text"
                                                        placeholder="..."
                                                        disabled
                                                        value={ketWongBakesFacies}
                                                    />
                                                ) : (
                                                    <Input
                                                        style={stylekuNyeriLain}
                                                        type="text"
                                                        placeholder="..."
                                                        disabled
                                                        value={ketNyeriLain}

                                                    // onChange={(e) => onFrekuensiNafas(e)}
                                                    />
                                                )}
                                                <Button
                                                    style={{ width: "15%", backgroundColor: "#4CAF50" }}
                                                    disabled
                                                    onClick={() => {
                                                        scalaNyeri === ""
                                                            ? parseInt(curpasRI.umur) < 2
                                                                ? setscalaNyeri("NIPS")
                                                                : parseInt(curpasRI.umur) > 1 &&
                                                                    parseInt(curpasRI.umur) < 4
                                                                    ? setscalaNyeri("FLACC")
                                                                    : parseInt(curpasRI.umur) > 7
                                                                        ? setscalaNyeri("Visual Analog Scale")
                                                                        : setscalaNyeri("NVPS")
                                                            : console.log();
                                                        setvisibleNyeri(true);
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </Input.Group>
                                        </Form.Item>
                                        Resiko Jatuh
                                        <br />
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <Input.Group compact>
                                                {metodeResikoJatuh === "ONTARIO" ? (
                                                    <Input
                                                        style={{ width: "30%" }}
                                                        type="number"
                                                        placeholder="..."
                                                        disabled
                                                        value={skorOntario}
                                                    />
                                                ) : metodeResikoJatuh === "HUMPTY DUMPTY" ? (
                                                    <Input
                                                        style={{ width: "30%" }}
                                                        type="number"
                                                        placeholder="..."
                                                        disabled
                                                        value={skorHumptyDumpty}
                                                    />
                                                ) : metodeResikoJatuh === "MORSE" ? (
                                                    <Input
                                                        style={{ width: "30%" }}
                                                        type="number"
                                                        placeholder="..."
                                                        disabled
                                                        value={skorMorse}
                                                    />
                                                ) : (
                                                    <Input
                                                        style={{ width: "30%" }}
                                                        type="number"
                                                        placeholder="..."
                                                        disabled
                                                    />
                                                )}
                                                {metodeResikoJatuh === "HUMPTY DUMPTY" ? (
                                                    <Input
                                                        style={stylekuHumptyDumpty}
                                                        type="text"
                                                        placeholder="..."
                                                        disabled
                                                        value={ketHumptyDumpty}
                                                    />
                                                ) : metodeResikoJatuh === "ONTARIO" ? (
                                                    <Input
                                                        style={stylekuOntario}
                                                        type="text"
                                                        placeholder="..."
                                                        disabled
                                                        value={ketOntario}
                                                    />
                                                ) : metodeResikoJatuh === "MORSE" ? (
                                                    <Input
                                                        style={stylekuMorse}
                                                        type="text"
                                                        placeholder="..."
                                                        disabled
                                                        value={ketMorse}
                                                    />
                                                ) : (
                                                    <Input
                                                        style={{ width: "55%" }}
                                                        type="number"
                                                        placeholder="..."
                                                        disabled
                                                    />
                                                )}
                                                <Button
                                                    style={{ width: "15%", backgroundColor: "#4CAF50" }}
                                                    disabled
                                                    onClick={() => {
                                                        metodeResikoJatuh === ""
                                                            ? parseInt(curpasRI.umur) < 14
                                                                ? setmetodeResikoJatuh("HUMPTY DUMPTY")
                                                                : parseInt(curpasRI.umur) > 13 &&
                                                                    parseInt(curpasRI.umur) < 60
                                                                    ? setmetodeResikoJatuh("MORSE")
                                                                    : setmetodeResikoJatuh("ONTARIO")
                                                            : console.log();
                                                        setvisibleJatuh(true);
                                                    }}
                                                >
                                                    +
                                                </Button>
                                            </Input.Group>
                                        </Form.Item>
                                        IMT
                                        <br />
                                        <Form.Item style={{ marginBottom: 0 }}>
                                            <Input.Group compact>
                                                <Input
                                                    type="text"
                                                    placeholder="..."
                                                    style={{ width: "30%" }}
                                                    disabled
                                                    value={IMT}
                                                />
                                                <Input
                                                    type="text"
                                                    placeholder="..."
                                                    style={stylekuIMT}
                                                    disabled
                                                    value={statusGizi}
                                                />
                                            </Input.Group>
                                        </Form.Item>
                                    </Spin>
                                </Col>

                            </Row>
                        </Card>
                        <span style={{ fontStyle: 'italic', fontSize: 'x-small', textDecoration: 'line-through' }}>{"*) Inputan diatas akan mulai AKTIF per 1 Januari 2024"}</span>
                    </Col>
                </Row> */}

                <Row>
                    <Col span={24}>
                        <span>Pemeriksaan Fisik :</span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={24}>
                        <TextArea
                            value={pmrFisik}
                            onChange={(e) => setpmrFisik(e.target.value)}
                            rows={4}
                            showCount
                            // disabled
                            placeholder="Pemeriksaan Fisik"
                            maxLength={4000}
                        />
                    </Col>
                </Row>
                <span style={{ fontStyle: 'italic', fontSize: 'x-small', textDecoration: 'line-through' }}>{"*) Inputan diatas akan mulai TIDAK AKTIF per 1 Januari 2024"}</span>


                <Divider
                    orientation='left'
                    style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                    Data Penunjang
                </Divider>

                <Row style={{ marginTop: '5px', marginBottom: '2px' }}>
                    <Col span={6}>
                        <span>Therapi :</span>
                    </Col>
                    <Col span={18}>
                        <Button
                            disabled={noReg.length === 0 ? true : false}
                            onClick={() => klikDaftarObat()}
                            type='default'
                            size='small'
                            style={{ width: '25%', float: 'right' }}>
                            Daftar Order Obat
                        </Button>
                    </Col>
                    {/* <Col span={6}>
                        <span>Laboratorium/Ro :</span>
                    </Col>
                    <Col span={6}>
                        <Button
                            // disabled={noReg.length === 0 ? true : false}
                            disabled
                            onClick={() => klikHasilLab()}
                            type='default'
                            size='small'
                            style={{ width: '100%' }}>
                            Hasil Lab
                        </Button>
                    </Col> */}
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={24}>
                        <TextArea
                            value={terapi}
                            onChange={(e) => setterapi(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="Therapi"
                            style={{ width: '100%' }}
                            maxLength={4000}
                        />
                    </Col>
                    {/* <Col span={12}>
                        <TextArea
                            disabled
                            value={labRo}
                            onChange={(e) => setlabRo(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="Laboratorium/Ro"
                            maxLength={4000}
                        />
                    </Col> */}
                </Row>

                <Divider
                    orientation='left'
                    style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                    Masalah Keperawatan
                </Divider>

                <Row style={{ marginTop: '2px', marginBottom: '5px' }}>
                    <Col span={24}>
                        <TextArea
                            value={mslkeperawatan}
                            onChange={(e) => setmslkeperawatan(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="Masalah Keperawatan"
                            maxLength={4000}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col span={10} style={{ paddingRight: '2px' }}>
                        <Divider
                            orientation='left'
                            style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                            Implementasi
                        </Divider>
                    </Col>
                    <Col span={2}>
                        <Button
                            onClick={() => klikTambah()}
                            disabled={noReg.length === 0 ? true : false}
                            size='small'
                            icon={<PlusOutlined />}
                            style={{ width: '75px' }}>
                            Tambah
                        </Button>
                    </Col>
                    <Col span={10} style={{ paddingLeft: '2px', paddingRight: '2px' }}>
                        <Divider
                            orientation='left'
                            style={{ backgroundColor: '#d9f7be', margin: '0px', borderColor: 'white', }}>
                            Protokol Kemoterapi
                        </Divider>
                    </Col>
                    <Col span={2}>
                        {
                            Object.keys(protokolKemo).length > 0 ?
                                <Button
                                    // type='primary'
                                    size='small'
                                    onClick={() => klikUbah()}
                                    style={{ width: '100%', color: 'green' }}
                                    icon={<EditOutlined />}>
                                    Ubah
                                </Button> :
                                <Button
                                    type='primary'
                                    size='small'
                                    onClick={() => {
                                        if (tempRtf === 0) {
                                            setmdProtKemo(true);
                                            Modal.info({
                                                title: "Info",
                                                content: "Klik OK untuk mengatur RTF Format.",
                                                onOk: () => {
                                                    settempRtf(1);
                                                    setmdProtKemo(false);
                                                },
                                            });
                                        }
                                        else {
                                            setmdProtKemo(true);
                                            rstKlikTambah();
                                            if (optDokterAll.length === 0) {
                                                lookUpDokterAll();
                                            };
                                        }
                                    }}
                                    disabled={noReg.length === 0 ? true : false}
                                    style={{ width: '100%' }}
                                    icon={<PlusOutlined />}>
                                    Tambah
                                </Button>
                        }
                    </Col>
                </Row>

                {/* <Row>
                    <Col span={24}>
                        <Link to="/mstprotokolkemoterapi">
                            <Button type='link'>Tambah Master Protokol</Button>
                        </Link>
                    </Col>
                </Row> */}

                {/* <Row style={{ marginTop: '2px', marginBottom: '5px' }}>
                    <Col span={12}>
                        <Row>
                            <Col span={24}>
                                <Button
                                    onClick={() => klikTambah()}
                                    disabled={noReg.length === 0 ? true : false}
                                    size='small'
                                    icon={<PlusOutlined />}
                                    style={{ width: '75px' }}>
                                    Tambah
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <Table
                                    columns={columns}
                                    dataSource={listImplementasi}
                                    size='small'
                                    scroll={{
                                        y: 310,
                                    }}
                                    bordered
                                    pagination={false}
                                    style={{ marginTop: '2px', width: '98%' }} />
                            </Col>
                        </Row>
                    </Col>

                    <Col span={12} style={{ padding: '5px', backgroundColor: '#f6ffed' }}>
                        <Spin spinning={spProtokol}>
                            {
                                Object.keys(protokolKemo).length > 0 ?
                                    <div>
                                        <Row>
                                            <Col span={6}>
                                                DPJP
                                            </Col>
                                            <Col span={18}>
                                                : <b>{protokolKemo.NAMADOKTER}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={6}>
                                                Nama Protokol
                                            </Col>
                                            <Col span={18}>
                                                : <b>{protokolKemo.NamaProtokol}</b>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                {ReactHtmlParser(protokolKemo.ObatProtokol)}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={24}>
                                                {ReactHtmlParser(protokolKemo.ProsedurProtokol)}
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col span={6}>
                                                Ruang Input
                                            </Col>
                                            <Col span={18}>
                                                : {protokolKemo.Deskripsi}
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col span={6}>
                                                User Input
                                            </Col>
                                            <Col span={18}>
                                                : {protokolKemo.UserId}
                                            </Col>
                                        </Row>
                                    </div>
                                    : <Empty description={<span>Belum ada Protokol Kemoterapi.<br />Pemilihan Protokol Kemoterapi di inputkan melalui Poliklinik.</span>} />
                            }
                        </Spin>
                    </Col>
                </Row> */}

                <Row style={{ display: 'flex', marginTop: '2px', marginBottom: '5px', height: '100%' }}>
                    {/* Kolom untuk Tabel */}
                    <Col span={12} style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <Table
                            columns={columns}
                            dataSource={listImplementasi}
                            size='small'
                            // scroll={{
                            //     y: 310,  // Sesuaikan ini jika diperlukan, atau hilangkan jika ingin otomatis
                            // }}
                            bordered
                            pagination={false}
                            style={{ width: '98%' }}
                        />
                    </Col>

                    {/* Kolom untuk Protokol */}
                    <Col span={12} style={{ padding: '5px', backgroundColor: '#f6ffed', display: 'flex', flexDirection: 'column', flex: 1 }}>
                        <Spin spinning={spProtokol}>
                            {Object.keys(protokolKemo).length > 0 ? (
                                <div style={{ flex: 1 }}>
                                    <Row>
                                        <Col span={6}>DPJP</Col>
                                        <Col span={18}>: <b>{protokolKemo.NAMADOKTER}</b></Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Nama Protokol</Col>
                                        <Col span={18}>: <b>{protokolKemo.NamaProtokol}</b></Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>{ReactHtmlParser(protokolKemo.ObatProtokol)}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={24}>{ReactHtmlParser(protokolKemo.ProsedurProtokol)}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>Ruang Input</Col>
                                        <Col span={18}>: {protokolKemo.Deskripsi}</Col>
                                    </Row>
                                    <Row>
                                        <Col span={6}>User Input</Col>
                                        <Col span={18}>: {protokolKemo.UserId}</Col>
                                    </Row>
                                </div>
                            ) : (
                                <Empty description={<span>Belum ada Protokol Kemoterapi.<br />Pemilihan Protokol Kemoterapi di inputkan melalui Poliklinik.</span>} />
                            )}
                        </Spin>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={24}>
                        <Divider
                            orientation='left'
                            style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                            Evaluasi
                        </Divider>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={1}>
                        <span>S :</span>
                    </Col>
                    <Col span={23}>
                        <TextArea
                            value={sbj}
                            onChange={(e) => setsbj(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={1}>
                        <span>O :</span>
                    </Col>
                    <Col span={23}>
                        <TextArea
                            value={obj}
                            onChange={(e) => setobj(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={1}>
                        <span>A :</span>
                    </Col>
                    <Col span={23}>
                        <TextArea
                            value={analysis}
                            onChange={(e) => setanalysis(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={1}>
                        <span>P :</span>
                    </Col>
                    <Col span={23}>
                        <TextArea
                            value={plan}
                            onChange={(e) => setplan(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={24}>
                        <Divider
                            orientation='left'
                            style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                            Discharge Planning
                        </Divider>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={24}>
                        <TextArea
                            value={dischargeplan}
                            onChange={(e) => setdischargeplan(e.target.value)}
                            rows={2}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => klikSimpan()}
                            icon={<DeliveredProcedureOutlined />}
                            disabled={noReg.length === 0 ? true : false}
                            style={{ width: '150px', float: 'right' }}>
                            Simpan
                        </Button>
                    </Col>
                </Row>
            </Card>

            <Modal
                title="Data Implementasi"
                open={tambahData}
                onCancel={() => settambahData(false)}
                closable={false}
                footer={null}
                width={800}
                style={{ top: 100 }}
            >
                <Card>
                    <Row>
                        <Col span={3}>
                            <span>Waktu Imp. :</span>
                        </Col>
                        <Col span={21}>
                            <DatePicker
                                value={jamImp}
                                onChange={(e) => setjamImp(dayjs(e))}
                                format={"DD-MM-YYYY HH:mm"}
                                // disabled={props.disabledTglPendHd}
                                disabledDate={disabledDate}
                                allowClear={false}
                                inputReadOnly
                                showTime
                                size="small"
                            />
                            {/* <TimePicker
                                // defaultValue={dayjs('12:08', format)}
                                value={jamImp}
                                onChange={(e) => setjamImp(dayjs(e))}
                                format={"HH:mm"}
                                size="small"
                                allowClear={false}
                                inputReadOnly
                            /> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <span>Implementasi :</span>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={24}>
                            <TextArea
                                value={tempImp}
                                onChange={(e) => settempImp(e.target.value)}
                                rows={2}
                                placeholder="..."
                                showCount
                                maxLength={255}
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginTop: '5px' }}>
                        <Col span={24}>
                            <Button
                                onClick={() => klikSimpanImp()}
                                type='primary'
                                style={{ float: 'right', width: '75px' }}>
                                Simpan
                            </Button>
                        </Col>
                    </Row>

                </Card>
            </Modal>

            <Modal
                title="Data Order/ Validasi Obat"
                open={mdDaftarObat}
                onCancel={() => setmdDaftarObat(false)}
                closable={false}
                footer={null}
                width={800}
                style={{ top: 100 }}
            >
                <Spin
                    tip="Mengambil Data Obat"
                    spinning={spListObat}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                        Daftar Order Obat
                    </Divider>

                    {listOrderObat.map((item, index) => (
                        <div>
                            <hr />
                            <Row>
                                <Col span={5}>
                                    <span>No.Order : {item.NOORDER}</span>
                                </Col>
                                <Col span={5}>
                                    <span>No.Reg. : {item.NOREG}</span>
                                </Col>
                                <Col span={5}>
                                    <span>Tgl.Order : {dayjs(item.TGLORDER).format('DD-MM-YYYY')}</span>
                                </Col>
                                <Col span={9}>
                                    <span>Apt.Tujuan : {item.NAMABAGIAN}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>Daftar Obat Paten :</span>
                                </Col>
                            </Row>
                            <Table
                                columns={columnsa}
                                dataSource={item.Paten}
                                size='small'
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: () => {
                                            let tempObat =
                                                (terapi ? terapi : "") +
                                                (!terapi ? "" : ",\n") +
                                                record.NAMABARANG +
                                                " : " +
                                                record.QTYBAR +
                                                " " +
                                                record.SATUAN
                                            if (tempObat.length <= 4000) {
                                                setterapi(tempObat);
                                                Modal.info({
                                                    title: "Sukses",
                                                    content: `Anda memasukkan ${record.NAMABARANG + " : " + record.QTYBAR + " " + record.SATUAN}`,
                                                });
                                            } else {
                                                Modal.error({
                                                    title: "Error",
                                                    content:
                                                        "Inputan Pemeriksaan Penunjang tidak boleh lebih dari 4000 karakter!",
                                                });
                                            }
                                        },
                                    };
                                }}
                                // scroll={{
                                //     y: 310,
                                // }}
                                bordered
                                pagination={false}
                            // style={{ marginTop: '2px', width: '98%' }} 
                            />
                            <Row>
                                <Col>
                                    <span>Daftar Obat Racikan :</span>
                                </Col>
                            </Row>
                            <Table
                                columns={columnsa}
                                dataSource={item.Racik}
                                size='small'
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: () => {
                                            let tempObat =
                                                (terapi ? terapi : "") +
                                                (!terapi ? "" : ",\n") +
                                                record.NAMABARANG +
                                                " : " +
                                                record.QTYBAR +
                                                " " +
                                                record.SATUAN
                                            if (tempObat.length <= 4000) {
                                                setterapi(tempObat);

                                            } else {
                                                Modal.error({
                                                    title: "Error",
                                                    content:
                                                        "Inputan Pemeriksaan Penunjang tidak boleh lebih dari 4000 karakter!",
                                                });
                                            }
                                        },
                                    };
                                }}
                                // scroll={{
                                //     y: 310,
                                // }}
                                bordered
                                pagination={false}
                            // style={{ marginTop: '2px', width: '98%' }}
                            />
                        </div>
                    ))}

                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                        Daftar Obat Tervalidasi
                    </Divider>

                    {listValidObat.map((item, index) => (
                        <div>
                            <hr />
                            <Row>
                                <Col span={5}>
                                    <span>No.Resep : {item.NORESEP}</span>
                                </Col>
                                <Col span={5}>
                                    <span>No.Reg. : {item.NOREG}</span>
                                </Col>
                                <Col span={5}>
                                    <span>Tgl.Resep : {dayjs(item.TGLRESEP).format('DD-MM-YYYY')}</span>
                                </Col>
                                <Col span={9}>
                                    <span>Apt.Tujuan : {item.NAMABAGIAN}</span>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span>Daftar Obat Tervalidasi :</span>
                                </Col>
                            </Row>
                            <Table
                                columns={columnsb}
                                dataSource={item.Obat}
                                size='small'
                                onRow={(record, rowIndex) => {
                                    return {
                                        onClick: () => {
                                            let tempObat =
                                                (terapi ? terapi : "") +
                                                (!terapi ? "" : ",\n") +
                                                record.NAMABARANG +
                                                " : " +
                                                record.QTYBAR +
                                                " " +
                                                record.SATRSP
                                            if (tempObat.length <= 4000) {
                                                setterapi(tempObat);
                                                Modal.info({
                                                    title: "Sukses",
                                                    content: `Anda memasukkan ${record.NAMABARANG + " : " + record.QTYBAR + " " + record.SATRSP}`,
                                                });
                                            } else {
                                                Modal.error({
                                                    title: "Error",
                                                    content:
                                                        "Inputan terapi tidak boleh lebih dari 4000 karakter!",
                                                });
                                            }
                                        },
                                    };
                                }}
                                // scroll={{
                                //     y: 310,
                                // }}
                                bordered
                                pagination={false}
                            // style={{ marginTop: '2px', width: '98%' }} 
                            />
                        </div>
                    ))}
                </Spin>
            </Modal>

            <Modal
                title="Daftar Hasil Lab"
                open={mdHasilLab}
                onCancel={() => setmdHasilLab(false)}
                closable={false}
                footer={null}
                width={1000}
                style={{ top: 100 }}
            >
                <Divider
                    orientation='left'
                    style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                    Daftar Nomor Billing Lab PK
                </Divider>
                <Table
                    columns={columnsc}
                    dataSource={listBillNo}
                    loading={spListBillNo}
                    size='small'
                    bordered
                    pagination={false}
                />

                <Divider
                    orientation='left'
                    style={{ backgroundColor: '#d9f7be', margin: '0px' }}>
                    Hasil Lab PK
                </Divider>
                <Row>
                    <Col>
                        <span>Nomor Billing : {billNomor}</span>
                    </Col>
                </Row>
                <Table
                    columns={columnsd}
                    dataSource={listHasilLab}
                    size='small'
                    onRow={(record, rowIndex) => {
                        return {
                            onClick: () => {
                                let tempHasil =
                                    (labRo ? labRo : "") +
                                    (!labRo ? "" : ",\n") +
                                    record.LabNama +
                                    " : " +
                                    record.LabHasil +
                                    " " +
                                    record.LabSatuan
                                if (tempHasil.length <= 4000) {
                                    setlabRo(tempHasil);
                                    Modal.info({
                                        title: "Sukses",
                                        content: `Anda memasukkan ${record.LabNama + " : " + record.LabHasil + " " + record.LabSatuan}`,
                                    });
                                } else {
                                    Modal.error({
                                        title: "Error",
                                        content:
                                            "Inputan terapi tidak boleh lebih dari 4000 karakter!",
                                    });
                                }
                            },
                        };
                    }}
                    bordered
                    pagination={false}
                    loading={spHasilLab}
                // style={{ marginTop: '2px', width: '98%' }} 
                />
            </Modal>

            <Modal
                // title="Informasi Update"
                open={mdInfoUpdate}
                closable={false}
                footer={null}
                width={1000}
                centered
            // style={{ top: 100 }}
            >
                <Card
                    title='Informasi Update - RME Kemoterapi'
                    headStyle={{ backgroundColor: '#91caff' }}>
                    <h3 style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 18-03-2025</h3>
                    <ul style={{ color: daysDifference > 7 ? '#d9d9d9' : 'black', backgroundColor: daysDifference < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan inputan <b>Total Siklus</b> untuk memberikan informasi terkait berapa siklus pasien tersebut harus menjalani kemoterapi pada siklus yang sedang dijalani. <b>(*Wajib diisi)</b></li>
                        <li>Penambahan informasi <b>Riwayat Kemoterapi</b> pasien yang telah dibuatkan Laporan Kemoterapi pada Tab Menu Riwayat Kemoterapi.</li>
                    </ul>
                    <h3 style={{ color: 8 > 7 ? '#d9d9d9' : 'black', backgroundColor: 8 < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 14-01-2025</h3>
                    <ul style={{ color: 8 > 7 ? '#d9d9d9' : 'black', backgroundColor: 8 < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan <b>Indikator PENGISIAN Protokol Kemoterapi</b> pada daftar pasien Kemoterapi.</li>
                    </ul>
                    <h3 style={{ color: 8 > 7 ? '#d9d9d9' : 'black', backgroundColor: 8 < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 23-09-2024</h3>
                    <ul style={{ color: 8 > 7 ? '#d9d9d9' : 'black', backgroundColor: 8 < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan menu <b>Master Protokol Kemoterapi</b> (Menu ini berada dibawah menu Laporan Kemoterapi), digunakan untuk menambahkan Master Protokol yang belum tersedia didalam sistem. Protokol Kemoterapi dikelompokan berdasarkan dokter.</li>
                        <li>Penambahan fitur input <b>Protokol Kemoterapi</b> jika dari rawat jalan belum ada protokol yang diinputkan.</li>
                        <li>Protokol kemoterapi hanya bisa diubah <b>jika nama ruang dan user input sama</b>.</li>
                        <li>Tombol <b>Riwayat Protokol</b> (di form Protokol Kemoterapi) digunakan untuk menampilkan riwayat protokol kemoterapi dan ada aksi <b>Salin</b> untuk mempermudah jika protokol yang diinputkan sama dengan protokol pelayanan sebelumnya.</li>
                        <li>Penambahan informasi <b>DPJP</b> di PageHeader Nama Pasien.</li>
                    </ul>
                    {/* <h3 style={{ color: 8 > 7 ? '#d9d9d9' : 'black', backgroundColor: 8 < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 30-11-2023</h3>
                    <ul style={{ color: 8 > 7 ? '#d9d9d9' : 'black', backgroundColor: 8 < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Penambahan Fitur <b>Lihat Hasil Laboratorium</b>.</li>
                        <li>Penambahan Fitur <b>Lihat Hasil Radiologi</b>.</li>
                        <li>Perubahan tampilan header detail pasien Kemoterapi.</li>
                    </ul>
                    <h3 style={{ color: 8 > 7 ? '#d9d9d9' : 'black', backgroundColor: 8 < 5 ? '#b7eb8f' : 'white' }}><ExclamationCircleTwoTone /> Update tanggal : 18-10-2023</h3>
                    <ul style={{ color: 8 > 7 ? '#d9d9d9' : 'black', backgroundColor: 8 < 5 ? '#b7eb8f' : 'white' }}>
                        <li>Tanggal Implementasi menjadi bisa memilih <b>H-1 order Kemoterapi.</b></li>
                        <li>Penambahan <b>Form Keterangan Warna</b> dibawah Daftar Pasien Kemoterapi.</li>
                        <li>Penambahan <b>Daftar Tanpa Order</b> dibagian Tab untuk mengecek jika ada pasien yang tidak muncul didaftar pasien Laporan Kemoterapi.</li>
                    </ul> */}
                </Card>
                <Row style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <Button
                            onClick={() => klikOkMdUpdate()}
                            type='primary'
                            style={{ float: 'right', width: '100px' }}>
                            OK
                        </Button>
                    </Col>
                </Row>
            </Modal>

            <Modal
                title="Assesment Nyeri"
                visible={visibleNyeri}
                width="1000px"
                footer={null}
                //onOk={handleOk}
                onCancel={handleOk}
            >
                <Row gutter={[6, 6]}>
                    {/* <Divider orientation="left">Skor Nyeri</Divider> */}
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout1}
                            label={<div style={{ fontWeight: "bolder" }}>Skala Nyeri</div>}
                            style={{ marginBottom: 5 }}
                        >
                            <Select
                                placeholder="..."
                                style={{ width: "100%" }}
                                value={scalaNyeri}
                                onChange={(e) => {
                                    setscalaNyeri(e);
                                    setskalaNyeri1(0);
                                    setskalaNyeri2(0);
                                    setskalaNyeri3(0);
                                    setskalaNyeri4(0);
                                    setskalaNyeri5(0);
                                    setskalaNyeri6(0);
                                }}
                            >
                                <Option value="Visual Analog Scale">
                                    Visual Analog Scale
                                </Option>
                                <Option value="FLACC">FLACC</Option>
                                <Option value="NIPS">NIPS</Option>
                                <Option value="NVPS">NVPS</Option>
                                <Option value="Wong Bakes Facies">Wong Bakes Facies</Option>
                                <Option value="NPRS">NPRS</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={16}>
                        {scalaNyeri === "Visual Analog Scale" ? (
                            <Row gutter={[6, 6]}>
                                <Col span={24}>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Skala"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Slider
                                            min={0}
                                            max={10}
                                            marks={marks}
                                            value={skalaNyeri1}
                                            onChange={(e) => {
                                                setskalaNyeri1(e);
                                            }}
                                            style={{ width: "40vh" }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : scalaNyeri === "NPRS" ? (
                            <Row gutter={[6, 6]}>
                                <Col span={24}>
                                    <Form.Item
                                        {...formItemLayout24}
                                        label="Skala"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "25vw" }}
                                            value={skalaNyeri1}
                                            onChange={(e) => {
                                                setskalaNyeri1(e);
                                            }}
                                        >
                                            <Option value={0}>
                                                Tidak Nyeri, Merasa Normal Sempurna
                                            </Option>
                                            <Option value={1}>
                                                Sangat Ringan Hampir Tidak Terlihat Nyeri, Seperti
                                                Gigitan Nyamuk
                                            </Option>
                                            <Option value={2}>
                                                Nyeri Minor, Seperti Cubitan Ringan
                                            </Option>
                                            <Option value={3}>
                                                Nyeri Sangat Nyata, Seperti Kejadian Terpotong,
                                                Serangan Pada Hidung <br></br>Karena Perdarahan Hidung
                                                Atau Ketika Dilakukan Injeksi
                                            </Option>
                                            <Option value={4}>Kuat, Nyeri Dalam</Option>
                                            <Option value={5}>Kuat, Dalam, Nyeri Tajam</Option>
                                            <Option value={6}>
                                                Kuat, Dalam, Nyeri Tajam Sangat Kuat Mendominasi Rasa
                                                Anda, <br></br>Menyebabkan Berfikir Tidak Jernih Dalam
                                                Beberapa Hal
                                            </Option>
                                            <Option value={7}>
                                                Sama Dengan Skor 6 Dan Tidak Dapat Efektif Menjalani
                                                Aktifitas Normal <br></br>Dan Memerlukan Bantuan Orang
                                                Lain
                                            </Option>
                                            <Option value={8}>
                                                Nyeri Sangat Intens, Tidak Dapat Berfikir Secara
                                                Jernih Sepanjang Waktu <br></br>Dan Sering Mengalami
                                                Perubahan Kepribadian Berat Jika Nyeri Muncul
                                                Sepanjang Waktu
                                            </Option>
                                            <Option value={9}>
                                                Nyeri Sangat Intens, Tidak Bisa Mentolerirnya Dan
                                                Menuntut Nyeri Dihilangkan <br></br>Atau Pembedahan,
                                                Tidak Berfikir Apa Efek Samping Atau Resikonya
                                            </Option>
                                            <Option value={10}>
                                                Nyeri Sangat Intens Berada Dalam Keadaan Tidak Sadar
                                                Sebentar
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : scalaNyeri === "FLACC" ? (
                            <Row gutter={[6, 6]}>
                                <Col span={24}>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Ekspresi Wajah"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            value={skalaNyeri1}
                                            onChange={(e) => {
                                                setskalaNyeri1(e);
                                            }}
                                        >
                                            <Option value={0}>
                                                Rileks, Ada Kontak Mata atau Senyum
                                            </Option>
                                            <Option value={1}>
                                                Sesekali Menangis atau Mengerutkan Kening
                                            </Option>
                                            <Option value={2}>
                                                Sering Cemberut, Mata Tertutup, Mulut Terbuka
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Kaki"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            value={skalaNyeri2}
                                            onChange={(e) => {
                                                setskalaNyeri2(e);
                                            }}
                                        >
                                            <Option value={0}>Posisi Normal atau Santai</Option>
                                            <Option value={1}>Tidak Nyaman, Gelisah, Tegang</Option>
                                            <Option value={2}>Menendang atau Kaki Disusun</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Aktivitas"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            defaultValue={0}
                                            value={skalaNyeri3}
                                            onChange={(e) => {
                                                setskalaNyeri3(e);
                                            }}
                                        >
                                            <Option value={0}>
                                                Aktivitas Normal, Bergerak dengan Mudah
                                            </Option>
                                            <Option value={1}>
                                                Menggeliat, Menggeser, Maju Mundur, Tegang
                                            </Option>
                                            <Option value={2}>Melengkung, Kaku</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Menangis"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "25vw" }}
                                            defaultValue={0}
                                            value={skalaNyeri4}
                                            onChange={(e) => {
                                                setskalaNyeri4(e);
                                            }}
                                        >
                                            <Option value={0}>
                                                Tidak Menangis(Terjaga atau Tertidur)
                                            </Option>
                                            <Option value={1}>
                                                Erangan atau Rengekan, Keluhan Sesekali
                                            </Option>
                                            <Option value={2}>
                                                Menangis Terus, Teriakan atau Isak Tangis, Sering
                                                Mengeluh
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Kenyamanan"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "25vw" }}
                                            defaultValue={0}
                                            value={skalaNyeri5}
                                            onChange={(e) => {
                                                setskalaNyeri5(e);
                                            }}
                                        >
                                            <Option value={0}>Tenang atau Santai</Option>
                                            <Option value={1}>
                                                Nyaman Ketika Disentuh, Dipeluk Sesekali
                                            </Option>
                                            <Option value={2}>
                                                Sulit Nyaman Walaupun Sudah Disentuh, Dipeluk, atau
                                                Diajak Bicara
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : scalaNyeri === "NIPS" ? (
                            <Row gutter={[6, 6]}>
                                <Col span={24}>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Ekspresi Wajah"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            defaultValue={0}
                                            value={skalaNyeri1}
                                            onChange={(e) => {
                                                setskalaNyeri1(e);
                                            }}
                                        >
                                            <Option value={0}>Santai</Option>
                                            <Option value={1}>Meringis</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Menangis"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            defaultValue={0}
                                            value={skalaNyeri2}
                                            onChange={(e) => {
                                                setskalaNyeri2(e);
                                            }}
                                        >
                                            <Option value={0}>Tidak Menagis</Option>
                                            <Option value={1}>Merengek</Option>
                                            <Option value={2}>Menangis Kuat</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Pola Bernafas"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            defaultValue={0}
                                            value={skalaNyeri3}
                                            onChange={(e) => {
                                                setskalaNyeri3(e);
                                            }}
                                        >
                                            <Option value={0}>Santai</Option>
                                            <Option value={1}>Perubahan Bernafas</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Lengan"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            defaultValue={0}
                                            value={skalaNyeri4}
                                            onChange={(e) => {
                                                setskalaNyeri4(e);
                                            }}
                                        >
                                            <Option value={0}>Santai</Option>
                                            <Option value={1}>Fleksi/Ekstensi</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Kaki"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            defaultValue={0}
                                            value={skalaNyeri5}
                                            onChange={(e) => {
                                                setskalaNyeri5(e);
                                            }}
                                        >
                                            <Option value={0}>Santai</Option>
                                            <Option value={1}>Fleksi/Ekstensi</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Keadaan Rangsangan"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            defaultValue={0}
                                            value={skalaNyeri6}
                                            onChange={(e) => {
                                                setskalaNyeri6(e);
                                            }}
                                        >
                                            <Option value={0}>Tertidur/Bangun</Option>
                                            <Option value={1}>Rewel</Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : scalaNyeri === "NVPS" ? (
                            <Row gutter={[6, 6]}>
                                <Col span={24}>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Wajah"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "25vw" }}
                                            defaultValue={0}
                                            value={skalaNyeri1}
                                            onChange={(e) => {
                                                setskalaNyeri1(e);
                                            }}
                                        >
                                            <Option value={0}>
                                                Tidak Ada Ekspresi Khusus atau Tersenyum
                                            </Option>
                                            <Option value={1}>
                                                Kadang-Kadang Meringis, Menangis, Mengerinyit,
                                                Mengerutkan Dahi
                                            </Option>
                                            <Option value={2}>
                                                Sering Meringis, Menangis, Mengerinyit, Mengerutkan
                                                Dahi
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Aktivitas(Gerakan)"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "25vw" }}
                                            defaultValue={0}
                                            value={skalaNyeri2}
                                            onChange={(e) => {
                                                setskalaNyeri2(e);
                                            }}
                                        >
                                            <Option value={0}>
                                                Tidur Telantang, Tenang, Posisi Normal
                                            </Option>
                                            <Option value={1}>
                                                Mencari Perhatian Melalui Gerakan Cepat atau Lambat
                                            </Option>
                                            <Option value={2}>
                                                Gelisah, Aktivitas Berlebihan dan atau Refleks Menarik
                                                Diri
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Melindungi"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            defaultValue={0}
                                            value={skalaNyeri3}
                                            onChange={(e) => {
                                                setskalaNyeri3(e);
                                            }}
                                        >
                                            <Option value={0}>
                                                Tidur Telantang Tenang, Posisi Tangan Tidak Diatas
                                                Tubuh
                                            </Option>
                                            <Option value={1}>
                                                Melindungi Area Tubuh, Tekanan
                                            </Option>
                                            <Option value={2}>Rigid, Kaku</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Fisiologis"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            defaultValue={0}
                                            value={skalaNyeri4}
                                            onChange={(e) => {
                                                setskalaNyeri4(e);
                                            }}
                                        >
                                            <Option value={0}>Vital Sign Stabil</Option>
                                            <Option value={1}>
                                                Tekanan Darah Sistolik &gt; 20 mmHg, Nadi &gt;
                                                20/menit
                                            </Option>
                                            <Option value={2}>
                                                Tekanan Darah Sistolik &gt; 30 mmHg, Nadi &gt;
                                                25/menit
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Respirasi"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "25vw" }}
                                            defaultValue={0}
                                            value={skalaNyeri5}
                                            onChange={(e) => {
                                                setskalaNyeri5(e);
                                            }}
                                        >
                                            <Option value={0}>
                                                RR/SpO2 Pada Garis Dasar Dengan Ventilator
                                            </Option>
                                            <Option value={1}>
                                                RR &gt; 10 Diatas Garis Dasar atau 5% Dibawah SpO2
                                                Tidak Sinkron Dengan Ventilator
                                            </Option>
                                            <Option value={2}>
                                                RR &gt; 20 Diatas Garis Dasar atau 20% Dibawah SpO2
                                                Tidak Sinkron Berat Dengan Ventilator
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : scalaNyeri === "Wong Bakes Facies" ? (
                            <Row gutter={[6, 6]}>
                                <Col span={24}>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Skala"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <img src={skalanyeripng} alt="Tampilan untuk skala nyeri" style={{ width: "333px" }} />
                                        <Slider
                                            min={0}
                                            max={5}
                                            marks={marks1}
                                            value={skalaNyeri1}
                                            onChange={(e) => {
                                                setskalaNyeri1(e);
                                            }}
                                            style={{
                                                width: "290px",
                                                left: " 16px",
                                            }}
                                        />
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : null}
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => {
                                    setvisibleNyeri(false);
                                    // console.log(datanyeri);
                                }}
                            >
                                Ambil
                            </Button>
                            <Button
                                onClick={() => {
                                    setvisibleNyeri(false);
                                    setscalaNyeri("Visual Analog Scale");
                                    setskalaNyeri1("");
                                    setskalaNyeri2("");
                                    setskalaNyeri3("");
                                    setskalaNyeri4("");
                                    setskalaNyeri5("");
                                    setskalaNyeri6("");
                                }}
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={() => {
                                    setvisibleNyeri(false);
                                }}
                            >
                                Keluar
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Modal>

            <Modal
                title="Assesment Resiko Jatuh"
                visible={visibleJatuh}
                width="1000px"
                footer={null}
                onCancel={handleOk}
            >
                <Row gutter={[6, 6]}>
                    <Col span={8}>
                        <Form.Item
                            {...formItemLayout1}
                            label={<div style={{ fontWeight: "bolder" }}>Metode</div>}
                            style={{ marginBottom: 5 }}
                        >
                            <Select
                                placeholder="..."
                                style={{ width: "100%" }}
                                value={metodeResikoJatuh}
                                onChange={(e) => {
                                    setmetodeResikoJatuh(e);
                                }}
                            >
                                <Option value="MORSE">MORSE</Option>
                                <Option value="HUMPTY DUMPTY">HUMPTY DUMPTY</Option>
                                <Option value="ONTARIO">ONTARIO</Option>
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={1}></Col>
                    <Col span={15}>
                        {metodeResikoJatuh === "HUMPTY DUMPTY" ? (
                            <Row gutter={[6, 6]}>
                                <Col span={24}>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Usia"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            value={humDumUsia}
                                            onChange={(e) => sethumDumUsia(e)}
                                        >
                                            <Option value="Usia-4">&lt;3 Tahun</Option>
                                            <Option value="Usia-3">3 Tahun - &lt;7 Tahun</Option>
                                            <Option value="Usia-2">7 Tahun - &lt;13 Tahun</Option>
                                            <Option value="Usia-1">13 Tahun atau Lebih</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Jenis Kelamin"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%" }}
                                            value={humDumKel}
                                            onChange={(e) => sethumDumKel(e)}
                                        >
                                            <Option value="JenisKelamin-2">Laki-Laki</Option>
                                            <Option value="JenisKelamin-1">Perempuan</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Diagnosa"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            defaultValue={0}
                                            value={humDumDiagnosa}
                                            onChange={(e) => sethumDumDiagnosa(e)}
                                        >
                                            <Option value="Diagnosa-4">
                                                Diagnosa Penyakit Syaraf
                                            </Option>
                                            <Option value="Diagnosa-3">
                                                Perubahan Dalam Oksigenasi <br></br>(Diagnosa
                                                espirasi, Dehidrasi, Anemia, Anoreksia,
                                                Pingsan/Pusing){" "}
                                            </Option>
                                            <Option value="Diagnosa-2">Gangguan Perilaku</Option>
                                            <Option value="Diagnosa-1">Diagnosa Lain </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Gangguan Kognitif"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            defaultValue={0}
                                            value={humDumGangguanKognitif}
                                            onChange={(e) => sethumDumGangguanKognitif(e)}
                                        >
                                            <Option value="GangguanKognitif-3">
                                                Tidak Menyadari Keterbatasan{" "}
                                            </Option>
                                            <Option value="GangguanKognitif-2">
                                                Lupa Keterbatasan
                                            </Option>
                                            <Option value="GangguanKognitif-1">
                                                Mengetahui Kemampuan Diri
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Faktor Lingkungan"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            defaultValue={0}
                                            value={humDumLingkungan}
                                            onChange={(e) => sethumDumLingkungan(e)}
                                        >
                                            <Option value="FaktorLingkungan-4">
                                                Riwayat Jatuh Dari Tempat Tidur Saat Infant-Todler
                                            </Option>
                                            <Option value="FaktorLingkungan-3">
                                                Pasien Menggunakan Alat Bantu Atau Tempat Tidur
                                                Bayi/Box
                                            </Option>
                                            <Option value="FaktorLingkungan-2">
                                                Pasien Berada di Tempat Tidur
                                            </Option>
                                            <Option value="FaktorLingkungan-1">
                                                Di Luar Ruang Rawat
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Respon Pembedahan/Obat/Anastesi"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            defaultValue={0}
                                            value={humDumRespon}
                                            onChange={(e) => sethumDumRespon(e)}
                                        >
                                            <Option value="Respon-3">Dalam 24 Jam</Option>
                                            <Option value="Respon-2">Dalam 48 Jam </Option>
                                            <Option value="Respon-1">
                                                Lebih Dari 48 Jam/Tidak Ada
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Pemakaian Obat"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            defaultValue={0}
                                            value={humDumPemObat}
                                            onChange={(e) => sethumDumPemObat(e)}
                                        >
                                            <Option value="PemakaianObat-3">
                                                Memakai Lebih Dari Satu Obat Berikut: Sedasi,
                                                Hypnotic, <br></br>Barbiturares, Phenothiazines, Anti
                                                Depressants, Laxatives/Diuretics, Narcotic
                                            </Option>
                                            <Option value="PemakaianObat-2">
                                                Memakai Salah Satu Dari Jenis Obat Tersebut Diatas
                                            </Option>
                                            <Option value="PemakaianObat-1">
                                                Obat Obat Lain/Tidak Ada{" "}
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : metodeResikoJatuh === "ONTARIO" ? (
                            <Row gutter={[6, 6]}>
                                <Col span={24}>
                                    <span style={{ fontWeight: "bolder" }}>Riwayat Jatuh</span>
                                    <Row>
                                        <Col span={12}>
                                            - Apakah Pasien Datang ke RS Karena Jatuh
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%", marginBottom: 5 }}
                                                defaultValue={0}
                                                value={rJatuh1}
                                                onChange={(e) => {
                                                    setrJatuh1(e);
                                                }}
                                            >
                                                <Option value="AlasanJatuh-6">Ya</Option>
                                                <Option value="AlasanJatuh-0">Tidak</Option>
                                            </Select>
                                        </Col>
                                        <Col span={12}>
                                            - Jika Tidak, Apakah Pasien Mengalami Jatuh Dalam 2
                                            Bulan Terakhir
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%", marginBottom: 5 }}
                                                defaultValue={0}
                                                value={rJatuh2}
                                                onChange={(e) => setrJatuh2(e)}
                                            >
                                                <Option value="WaktuJatuh-6">Ya</Option>
                                                <Option value="WaktuJatuh-0">Tidak</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <span style={{ fontWeight: "bolder" }}>Status Mental</span>
                                    <Row>
                                        <Col span={12}>
                                            - Apakah Pasien Delirium?(Tidak Dapat Membuat Keputusan,
                                            Pola Pikir Tidak Terorganisir, Gangguan Daya Ingat)
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%", marginBottom: 5 }}
                                                defaultValue={0}
                                                value={sMental1}
                                                onChange={(e) => setsMental1(e)}
                                            >
                                                <Option value="Delirium-14">Ya</Option>
                                                <Option value="Delirium-0">Tidak</Option>
                                            </Select>
                                        </Col>
                                        <Col span={12}>
                                            - Apakah Pasien Disorientasi? (Salah Menyebutkan Waktu,
                                            Tempat Atau Orang)
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%", marginBottom: 5 }}
                                                defaultValue={0}
                                                value={sMental2}
                                                onChange={(e) => setsMental2(e)}
                                            >
                                                <Option value="Disorientasi-14">Ya</Option>
                                                <Option value="Disorientasi-0">Tidak</Option>
                                            </Select>
                                        </Col>
                                        <Col span={12}>
                                            - Apakah Pasien Mengalami Agitasi (Ketakutan, Gelisah
                                            Dan Cemas)
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%", marginBottom: 5 }}
                                                defaultValue={0}
                                                value={sMental3}
                                                onChange={(e) => setsMental3(e)}
                                            >
                                                <Option value="Agitasi-14">Ya</Option>
                                                <Option value="Agitasi-0">Tidak</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <span style={{ fontWeight: "bolder" }}>
                                        Penglihatan/Mata
                                    </span>
                                    <br />
                                    <Row>
                                        <Col span={12}>- Apakah pasien memakai Kacamata</Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%", marginBottom: 5 }}
                                                defaultValue={0}
                                                value={sMata1}
                                                onChange={(e) => setsMata1(e)}
                                            >
                                                <Option value="MemakaiKacamata-1">Ya</Option>
                                                <Option value="MemakaiKacamata-0">Tidak</Option>
                                            </Select>
                                        </Col>
                                        <Col span={12}>
                                            - Apakah Pasien Mengeluh Adanya Penglihatan Buram
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%", marginBottom: 5 }}
                                                defaultValue={0}
                                                value={sMata2}
                                                onChange={(e) => setsMata2(e)}
                                            >
                                                <Option value="PenglihatanBuram-1">Ya</Option>
                                                <Option value="PenglihatanBuram-0">Tidak</Option>
                                            </Select>
                                        </Col>
                                        <Col span={12}>
                                            - Apakah Pasien Mempunyai Glukoma, 41 Katarak Atau
                                            Degenerasi Makula
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%", marginBottom: 5 }}
                                                defaultValue={0}
                                                value={sMata3}
                                                onChange={(e) => setsMata3(e)}
                                            >
                                                <Option value="Glukoma-1">Ya</Option>
                                                <Option value="Glukoma-0">Tidak</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <span style={{ fontWeight: "bolder" }}>
                                        Kebiasaan Berkemih
                                    </span>
                                    <br />
                                    <Row>
                                        <Col span={12}>
                                            - Apakah Terdapat Perubahan Perilaku Berkemih?
                                            (Frekuensi, Tidak Bisa Menahan Kencing, Inkontinensia,
                                            Nokturia)
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{ width: "100%", marginBottom: 5 }}
                                                defaultValue={0}
                                                value={kebiasaanBerkemih}
                                                onChange={(e) => setkebiasaanBerkemih(e)}
                                            >
                                                <Option value="KebiasaanBerkemih-6">Ya</Option>
                                                <Option value="KebiasaanBerkemih-0">Tidak</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col span={12}>
                                            <span style={{ fontWeight: "bolder" }}>
                                                {" "}
                                                Transfer/Perpi Ndahan(Dari TT Ke Kursi Dan Kembali Ke
                                                TT)
                                            </span>
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{
                                                    width: "100%",
                                                    marginBottom: 5,
                                                    maxWidth: "23vw",
                                                }}
                                                defaultValue={0}
                                                value={transferTT}
                                                onChange={(e) => settransferTT(e)}
                                            >
                                                <Option value="Transfer-0">
                                                    Mandiri (Boleh Menggunakan Alat Bantu Jalan)
                                                </Option>
                                                <Option value="Transfer-1">
                                                    Memerlukan Sedikit Bantuan (1 Orang)/Dalam
                                                    Pengawasan
                                                </Option>
                                                <Option value="Transfer-2">
                                                    Memerlukan Bantuan Yang Nyata (2 Orang)
                                                </Option>
                                                <Option value="Transfer-3">
                                                    Tidak Dapat Duduk Dengan Seimbang, Perlu Bantuan
                                                    Total Di Luar Ruang Rawat
                                                </Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                    <br />
                                    <Row>
                                        <Col span={12}>
                                            <span style={{ fontWeight: "bolder" }}>Mobilitas</span>
                                        </Col>
                                        <Col span={12}>
                                            <Select
                                                placeholder="..."
                                                style={{
                                                    width: "100%",
                                                    marginBottom: 5,
                                                    maxWidth: "23vw",
                                                }}
                                                defaultValue={0}
                                                value={mobilitas}
                                                onChange={(e) => setmobilitas(e)}
                                            >
                                                <Option value="Mobilitas-0">
                                                    Mandiri (Boleh Menggunakan Alat Bantu Jalan)
                                                </Option>
                                                <Option value="Mobilitas-1">
                                                    Berjalan Dengan Bantuan 1 Orang (Verbal/Fisik)
                                                </Option>
                                                <Option value="Mobilitas-2">
                                                    Menggunakan Kursi Roda
                                                </Option>
                                                <Option value="Mobilitas-3">Imobilisasi</Option>
                                            </Select>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        ) : metodeResikoJatuh === "MORSE" ? (
                            <Row gutter={[6, 6]}>
                                <Col span={24}>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Riwayat Jatuh"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            value={morseRiwJatuh}
                                            onChange={(e) => {
                                                setmorseRiwJatuh(e);
                                                console.log(e);
                                                console.log(e.split("-").pop());
                                                console.log(e.split("-").shift());
                                            }}
                                        >
                                            <Option value="RiwayatJatuh-25">
                                                Pernah Jatuh Dalam 3 Bulan Terakhir
                                            </Option>
                                            <Option value="RiwayatJatuh-0">
                                                Tidak Pernah Jatuh
                                            </Option>
                                        </Select>
                                    </Form.Item>

                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Diagnosa"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            value={morseDiagnosa}
                                            onChange={(e) => setmorseDiagnosa(e)}
                                        >
                                            <Option value="Diagnosa-15">
                                                Terdapat Lebih Dari Satu Diagnosa Medis
                                            </Option>
                                            <Option value="Diagnosa-0">
                                                Hanya Satu Diagnosa Medis
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Kondisi Jalan"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            defaultValue={0}
                                            value={morseKondisiJalan}
                                            onChange={(e) => setmorseKondisiJalan(e)}
                                        >
                                            <Option value="KondisiJalan-30">
                                                Berjalan Dengan Berpegangan Pada Furniture Untuk
                                                Topangan
                                            </Option>
                                            <Option value="KondisiJalan-15">
                                                Berjalan Menggunakan Kruk, Tongkat atau Walker{" "}
                                            </Option>
                                            <Option value="KondisiJalan-0">
                                                Berjalan Tanpa Bantuan, Tirah Baring, Di Kursi Roda,
                                                Bantuan Perawat
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Infus"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            defaultValue={0}
                                            value={morseInfus}
                                            onChange={(e) => setmorseInfus(e)}
                                        >
                                            <Option value="Infus-20">Diinfus</Option>
                                            <Option value="Infus-0">Tidak Diinfus</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Kondisi Badan"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            defaultValue={0}
                                            value={morseKondisiBadan}
                                            onChange={(e) => setmorseKondisiBadan(e)}
                                        >
                                            <Option value="KondisiBadan-20">Terganggu</Option>
                                            <Option value="KondisiBadan-10">Lemah</Option>
                                            <Option value="KondisiBadan-0">
                                                Normal, Tirah Baring, Tidak Bergerak
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item
                                        {...formItemLayout2}
                                        label="Gangguan Kognitif"
                                        style={{ marginBottom: 5 }}
                                    >
                                        <Select
                                            placeholder="..."
                                            style={{ width: "100%", maxWidth: "23vw" }}
                                            defaultValue={0}
                                            value={morseGangKognitif}
                                            onChange={(e) => setmorseGangKognitif(e)}
                                        >
                                            <Option value="GangguanKognitif-15">
                                                Lupa Keterbatasan
                                            </Option>
                                            <Option value="GangguanKognitif-0">
                                                Mengetahui Kemampuan Diri
                                            </Option>
                                        </Select>
                                    </Form.Item>
                                </Col>
                            </Row>
                        ) : null}
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: "right" }}>
                        <Space>
                            <Button
                                type="primary"
                                onClick={() => {
                                    // insertResikoJatuh(dataResikoJatuh);
                                    setvisibleJatuh(false);
                                    // console.log("data resiko jatuh ", dataResikoJatuh);
                                }}
                            >
                                Ambil
                            </Button>
                            {/* <Button danger>Hapus</Button> */}
                            <Button
                                onClick={() => {
                                    setvisibleJatuh(false);
                                    setmetodeResikoJatuh("");
                                    setrJatuh1("");
                                    setrJatuh2("");
                                    setsMental1("");
                                    setsMental2("");
                                    setsMental3("");
                                    setsMata1("");
                                    setsMata2("");
                                    setsMata3("");
                                    setkebiasaanBerkemih("");
                                    settransferTT("");
                                    setmobilitas("");
                                    sethumDumUsia("");
                                    sethumDumKel("");
                                    sethumDumDiagnosa("");
                                    sethumDumGangguanKognitif("");
                                    sethumDumLingkungan("");
                                    sethumDumRespon("");
                                    sethumDumPemObat("");
                                    setmorseRiwJatuh("");
                                    setmorseDiagnosa("");
                                    setmorseKondisiJalan("");
                                    setmorseInfus("");
                                    setmorseKondisiBadan("");
                                    setmorseGangKognitif("");
                                }}
                            >
                                Batal
                            </Button>
                            <Button
                                onClick={() => {
                                    setvisibleJatuh(false);
                                }}
                            >
                                Keluar
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Modal>

            <Modal
                title="Hitung Berat badan dengan LILA"
                visible={isModalLila}
                onOk={handleOkLila}
                okText="Simpan"
                onCancel={handleCancelLila}
            >
                Tinggi Badan
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                        type="number"
                        suffix="Cm"
                        placeholder="..."
                        value={tinggiBadan}
                    />
                </Form.Item>
                Lingkar Lengan
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                        type="number"
                        suffix="Cm"
                        placeholder="..."
                        value={lila}
                        onChange={(e) => setlila(e.target.value)}
                    />
                </Form.Item>
                Berat Badan (Hasil)
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                    <Input
                        type="number"
                        suffix="Cm"
                        placeholder="..."
                        value={bblila}
                    />
                </Form.Item>
            </Modal>

            {/* Form Protokol Kemoterapi */}
            <Modal
                title="Protokol Kemoterapi"
                visible={mdProtKemo}
                footer={null}
                width={1000}
                closable={false}
            >
                <Row
                    style={{
                        marginBottom: "2px",
                    }}
                >
                    <Col span={3}>Dokter :</Col>
                    <Col span={21}>
                        <Select
                            style={{ width: "100%" }}
                            placeholder="..."
                            disabled={optDokterAll.length === 0 ? true : false}
                            value={drProt}
                            // // onChange={(e) => setcodeDokterId(e)}
                            // // size='small'
                            onSelect={(e) => {
                                // console.log("onSelect : ", e);
                                lookUpProtokol(e);
                                setdrProt(e);
                                rstMdProt();
                            }}
                            showSearch={true}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                                0
                            }
                        >
                            {optDokterAll.map((opt) => (
                                <Option key={opt.dokterId} value={opt.dokterId}>
                                    {opt.namaDokter}
                                </Option>
                            ))}
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: "2px" }}>
                    <Col span={3}>
                        <span>Prot. Kemoterapi :</span>
                    </Col>
                    <Col span={21}>
                        <Input.Group compact>
                            <Select
                                style={{ width: "95%" }}
                                placeholder="..."
                                value={idProt}
                                onChange={(e) => setidProt(e)}
                                // size='small'
                                onSelect={(e) => {
                                    let temp = optProtKemo.filter(
                                        (item, index) => item.Id === e
                                    );
                                    setidProt(e);
                                    setobatProt(temp[0].Obat);
                                    setprosProt(temp[0].ProsedurPelaksanaan);
                                    // console.log("protokol kemo : ", temp);
                                }}
                                showSearch={true}
                                filterOption={(input, option) =>
                                    option.children
                                        .toLowerCase()
                                        .indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {optProtKemo.map((opt, index) => (
                                    <Option key={index} value={opt.Id}>
                                        {opt.NamaProtokol}
                                    </Option>
                                ))}
                            </Select>
                            <Button
                                type="primary"
                                onClick={() => lookUpProtokol(drProt)}
                                disabled={!drProt}
                                style={{ width: "5%" }}
                                icon={<CloudDownloadOutlined />}
                            />
                        </Input.Group>
                    </Col>
                </Row>
                <Row style={{ marginBottom: "2px" }}>
                    <Col span={3}>
                        <span>Obat :</span>
                    </Col>
                    <Col span={21}>
                        <ReactQuill
                            theme="snow"
                            value={obatProt}
                            onChange={(e) => setobatProt(e)}
                            modules={modules}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: "5px" }}>
                    <Col span={3}>
                        <span>Pros. Pelaksanaan :</span>
                    </Col>
                    <Col span={21}>
                        <ReactQuill
                            theme="snow"
                            value={prosProt}
                            onChange={(e) => setprosProt(e)}
                            modules={modules}
                        />
                    </Col>
                </Row>

                <Row>
                    <Col span={12}>
                        <Button
                            // type='primary'
                            onClick={() => klikRiwProtokol()}
                            // disabled={tempFormat === 0 ? true : false}
                            style={{ width: "250px" }}
                        >
                            Riwayat Protokol
                        </Button>
                    </Col>
                    <Col span={12}>
                        <Space style={{ float: 'right' }}>
                            <Button
                                onClick={() => {
                                    setmdProtKemo(false);
                                }}
                                // disabled={!curpas}
                                style={{ width: "100px" }}
                            >
                                Batal
                            </Button>
                            <Button
                                type="primary"
                                onClick={() => {
                                    simpanProtokol();
                                }}
                                // disabled={!curpas}
                                style={{ width: "100px" }}
                            >
                                Simpan
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Modal>

            {/* Modal Riwayat Protokol */}
            <Modal
                title="Riwayat Protokol Kemoterapi"
                visible={mdRiwProtokol}
                onCancel={() => setmdRiwProtokol(false)}
                footer={null}
                width={1000}
                closable={false}
                style={{ top: 100 }}
            >
                <Table
                    className="custom-table-tbRiwProtokolKemo"
                    columns={coltbRiwayatProtokol}
                    dataSource={listRiwProtokol}
                    loading={spTbRiwProtokol}
                    // size='small'
                    // scroll={{
                    //     y: 310,
                    // }}
                    bordered
                // pagination={false}
                // style={{ marginTop: '2px' }}
                />
            </Modal>

            {/* Modal riwayat total siklus */}
            <Modal
                title="Riwayat Total Siklus"
                open={mdRiwTotalSiklus}
                onCancel={() => setmdRiwTotalSiklus(false)}
                closable={false}
                footer={null}
                width={400}
                centered
            >
                <Table
                    columns={colTotalSiklus}
                    dataSource={listRiwTotalSiklus}
                    loading={spTbRiwKemo}
                    size='small'
                    // scroll={{
                    //     y: 310,  // Sesuaikan ini jika diperlukan, atau hilangkan jika ingin otomatis
                    // }}
                    bordered
                    pagination={false}
                />
            </Modal>
        </div >
    )
}

export default FormLaporanKemoterapi