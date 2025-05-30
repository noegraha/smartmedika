import { CheckCircleTwoTone, CheckOutlined, CheckSquareOutlined, CheckSquareTwoTone, CloseCircleTwoTone, CloseOutlined, CloudDownloadOutlined, DeleteOutlined, EditOutlined, ExclamationCircleFilled, PlusOutlined } from '@ant-design/icons';
import { Button, Col, Divider, Input, Modal, Row, Select, Space, Spin, Table, Tag } from 'antd'
import React, { useContext, useState } from 'react'
import { BankDarahContext } from '../context/BankDarahContext';
import dayjs from 'dayjs';
import '../style/style.css'

const { confirm } = Modal;
const { Option } = Select;
const { TextArea } = Input;

const ProsesPmrCM = () => {
    const {
        dtPasien,
        dtOrder,
        ruangIdValid,
        ktgOrder,
        tempNoPmr,
        userValid,
        ipClient,
        hostClient,
        ktgjnsDarah,
        hslPmr,
        riwHslPmr,
        cmMetode, setcmMetode,
        listCrossMatch,
        listDokter,
        spCmMetode,
        spNoPmr,
        getNoPmr,
        deletePmrGolDa,
        insertPmrGolDa,
        getRiwPmrGolonganDarah,
        insertCmMetode,
        insertCrossMatch,
        UpdateCrossMatch,
        HapusCrossMatch,
        getListDokter,
        insertAdvice,
        spTmbahHasil,
        spAdvice,
        mdPmrGolDarah, setmdPmrGolDarah,
        mdUjiSerasi, setmdUjiSerasi,
        mdAdvice, setmdAdvice,
    } = useContext(BankDarahContext)

    // ====== form pemeriksaan golongan darah ======
    // const [pemeriksaanId, setPemeriksaanId] = useState('');
    // const [registrasiId, setRegistrasiId] = useState('');
    // const [ruangId, setRuangId] = useState('');
    const [antiA, setAntiA] = useState();
    const [antiB, setAntiB] = useState();
    const [selA, setSelA] = useState();
    const [selB, setSelB] = useState();
    const [selO, setSelO] = useState();
    const [autoKontrol, setAutoKontrol] = useState();
    const [antiD, setAntiD] = useState();
    const [ba, setBa] = useState();
    const [golDarah, setGolDarah] = useState();
    const [rh, setRh] = useState();
    const [keterangan, setketerangan] = useState()
    // const [tglPemeriksaan, setTglPemeriksaan] = useState();
    // const [userId, setUserId] = useState('');
    // const [userIdHapus, setUserIdHapus] = useState('');
    // const [clientIP, setClientIP] = useState('');
    // const [clientHost, setClientHost] = useState('');
    // const [dateEntry, setDateEntry] = useState('');

    // ====== form crossmatch ======
    // const [id, setId] = useState('');
    // const [noOrder, setNoOrder] = useState('');
    const [noKantong, setNoKantong] = useState();
    const [golDarahCm, setGolDarahCm] = useState();
    const [jnsKtg, setjnsKtg] = useState()
    const [rhesus, setRhesus] = useState();
    const [jmlCc, setJmlCc] = useState();
    const [jenisKomponen, setJenisKomponen] = useState();
    const [mayor, setMayor] = useState();
    const [minor, setMinor] = useState();
    const [autoControl, setAutoControl] = useState();
    const [dct, setDct] = useState();
    const [hasil, setHasil] = useState();
    const [kompatibel, setKompatibel] = useState();
    const [keteranganCm, setKeteranganCm] = useState();
    const [kirim, setkirim] = useState()
    // const [userId, setUserId] = useState('');
    // const [clientIP, setClientIP] = useState('');
    // const [clientHost, setClientHost] = useState('');
    const [tglPemeriksaan, setTglPemeriksaan] = useState();
    // const [dateEntry, setDateEntry] = useState('');
    // const [lastUpdate, setLastUpdate] = useState('');
    const [tempIndex, settempIndex] = useState()
    const [disMdCm, setdisMdCm] = useState(false)
    const [hslCm, sethslCm] = useState([])

    // ===== form advice =====
    const [drAdvice, setdrAdvice] = useState()
    const [tempat, settempat] = useState()
    const [kesimpulan, setkesimpulan] = useState()
    const [saran, setsaran] = useState()
    const [tglAdvKirim, settglAdvKirim] = useState(dayjs())
    const [jwbAdv, setjwbAdv] = useState()

    // kolom hasil pemeriksaan
    const columns = [
        {
            title: 'No. Pemeriksaan',
            align: 'center',
            dataIndex: 'PemeriksaanId',
            key: 'PemeriksaanId',
            width: 90,
        },
        {
            title: 'Tgl. Pemeriksaan',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 90,
            render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
        },
        {
            title: 'Antisera',
            children: [
                {
                    title: 'Anti-A',
                    align: 'center',
                    dataIndex: 'AntiA',
                    key: 'AntiA',
                    width: 55,
                },
                {
                    title: 'Anti-B',
                    align: 'center',
                    dataIndex: 'AntiB',
                    key: 'AntiB',
                    width: 55,
                },
            ],
        },
        {
            title: 'Suspensi 5%',
            children: [
                {
                    title: 'Sel A',
                    align: 'center',
                    dataIndex: 'SelA',
                    key: 'SelA',
                    width: 55,
                },
                {
                    title: 'Sel B',
                    align: 'center',
                    dataIndex: 'SelB',
                    key: 'SelB',
                    width: 55,
                },
                {
                    title: 'Sel O',
                    align: 'center',
                    dataIndex: 'SelO',
                    key: 'SelO',
                    width: 55,
                },
            ],
        },
        {
            title: 'Auto Kontrol',
            align: 'center',
            dataIndex: 'AutoKontrol',
            key: 'AutoKontrol',
            width: 60,
        },
        {
            title: 'Anti-D Ig M',
            align: 'center',
            dataIndex: 'AntiD',
            key: 'AntiD',
            width: 60,
        },
        {
            title: 'BA 6%',
            align: 'center',
            dataIndex: 'BA',
            key: 'BA',
            width: 60,
        },
        {
            title: 'Golongan Darah Pasien',
            children: [
                {
                    title: 'GD',
                    align: 'center',
                    dataIndex: 'GolDarah',
                    key: 'GolDarah',
                    width: 55,
                },
                {
                    title: 'Rh',
                    align: 'center',
                    dataIndex: 'Rh',
                    key: 'Rh',
                    width: 55,
                },
            ],
        },
        {
            title: 'Keterangan',
            align: 'center',
            dataIndex: 'Keterangan',
            key: 'Keterangan',
        },
        {
            title: 'Petugas',
            align: 'center',
            dataIndex: 'UserId',
            key: 'UserId',
            width: 100,
        },
        {
            title: 'Aksi',
            align: 'center',
            fixed: 'right',
            width: 50,
            render: (text, record, index) => (
                <Button
                    onClick={() => {
                        console.log('ktgOrder : ', ktgOrder);
                        if (dtOrder.StatusValid.trim() === '2') {
                            Modal.warning({ title: 'Peringatan!', content: 'Pada order terlayani, tidak bisa melakukan Hapus Pemeriksaan!' })
                        }
                        else {
                            konfirmHapus(record.PemeriksaanId, userValid, record.UserId)
                        }
                    }}
                    type="primary"
                    danger
                    icon={<DeleteOutlined />}
                    // disabled={record.StsDatang}
                    size='small'
                    style={{ width: '30px' }}
                />
            ),
        },
    ];

    // kolom riwayat pmr golda
    const columnsb = [
        {
            title: 'No. Pemeriksaan',
            align: 'center',
            dataIndex: 'PemeriksaanId',
            key: 'PemeriksaanId',
            width: 90,
        },
        {
            title: 'Tgl. Pemeriksaan',
            align: 'center',
            dataIndex: 'TglPemeriksaan',
            key: 'TglPemeriksaan',
            width: 90,
            render: (text) => dayjs(text).format('DD-MM-YY HH:mm'),
        },
        {
            title: 'Antisera',
            children: [
                {
                    title: 'Anti-A',
                    align: 'center',
                    dataIndex: 'AntiA',
                    key: 'AntiA',
                    width: 55,
                },
                {
                    title: 'Anti-B',
                    align: 'center',
                    dataIndex: 'AntiB',
                    key: 'AntiB',
                    width: 55,
                },
            ],
        },
        {
            title: 'Suspensi 5%',
            children: [
                {
                    title: 'Sel A',
                    align: 'center',
                    dataIndex: 'SelA',
                    key: 'SelA',
                    width: 55,
                },
                {
                    title: 'Sel B',
                    align: 'center',
                    dataIndex: 'SelB',
                    key: 'SelB',
                    width: 55,
                },
                {
                    title: 'Sel O',
                    align: 'center',
                    dataIndex: 'SelO',
                    key: 'SelO',
                    width: 55,
                },
            ],
        },
        {
            title: 'Auto Kontrol',
            align: 'center',
            dataIndex: 'AutoKontrol',
            key: 'AutoKontrol',
            width: 60,
        },
        {
            title: 'Anti-D Ig M',
            align: 'center',
            dataIndex: 'AntiD',
            key: 'AntiD',
            width: 60,
        },
        {
            title: 'BA 6%',
            align: 'center',
            dataIndex: 'BA',
            key: 'BA',
            width: 60,
        },
        {
            title: 'Golongan Darah Pasien',
            children: [
                {
                    title: 'GD',
                    align: 'center',
                    dataIndex: 'GolDarah',
                    key: 'GolDarah',
                    width: 55,
                },
                {
                    title: 'Rh',
                    align: 'center',
                    dataIndex: 'Rh',
                    key: 'Rh',
                    width: 55,
                },
            ],
        },
        {
            title: 'Keterangan',
            align: 'center',
            dataIndex: 'Keterangan',
            key: 'Keterangan',
        },
        {
            title: 'Petugas',
            align: 'center',
            dataIndex: 'UserId',
            key: 'UserId',
            width: 100,
        },
        // {
        //     title: 'Aksi',
        //     align: 'center',
        //     fixed: 'right',
        //     width: 50,
        //     render: (text, record, index) => (
        //         <Button
        //             // onClick={() => klikDelJnsDarah(index)}
        //             type="primary"
        //             danger
        //             icon={<DeleteOutlined />}
        //             // disabled={record.StsDatang}
        //             size='small'
        //             style={{ width: '30px' }}
        //         />
        //     ),
        // },
    ];

    // kolom pmr crossmatch
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
        },
        {
            title: 'Kirim',
            align: 'center',
            dataIndex: 'Kirim',
            key: 'Kirim',
            width: 60,
            render: Kirim => Kirim ? <CheckCircleTwoTone twoToneColor="#52c41a" /> : <CloseCircleTwoTone twoToneColor="#eb2f96" />,
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
                <div>
                    <Space>
                        <Button
                            onClick={() => klikEditHasilCm(index, record.UserId)}
                            type="primary"
                            icon={<EditOutlined />}
                            // disabled={record.StsDatang}
                            size='small'
                            style={{ width: '31px' }}
                        />
                        <Button
                            onClick={() => klikHapusHasilCm(record.Id, record.UserId, record.NoKantong, record.StsKirim)}
                            type="primary"
                            icon={<CloseOutlined />}
                            disabled={!record.Kirim}
                            danger
                            size='small'
                            style={{ width: '31px' }}
                        />
                    </Space>
                    <Button
                        onClick={() => {
                            klikAdvice(record)
                        }}
                        icon={<PlusOutlined />}
                        size='small'
                        style={{ marginTop: '2px' }}>
                        Advice
                    </Button>
                </div>
            ),
        },
    ];

    // kolom jenis darah diminta
    const columnsc = [
        {
            title: 'Jenis Darah',
            dataIndex: 'JenisDarah',
            key: 'JenisDarah',
            render: (jenisDarah) => {
                const matchingData = ktgjnsDarah.find((item) => item.id === jenisDarah);
                return matchingData ? matchingData.desk : 'Tidak ditemukan';
            },
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

    const rstMdPmr = () => {
        setAntiA();
        setAntiB();
        setSelA();
        setSelB();
        setSelO();
        setAutoKontrol();
        setAntiD();
        setBa();
        setGolDarah();
        setRh();
        setketerangan();
    }

    const rstMdCross = () => {
        setNoKantong();
        setGolDarahCm();
        setjnsKtg()
        setRhesus();
        setJmlCc();
        setJenisKomponen();
        setMayor();
        setMinor();
        setAutoControl();
        setDct();
        setHasil();
        setKeteranganCm();
        setkirim()
        settempIndex();
    }

    const klikTambahPmr = () => {
        rstMdPmr()
        getNoPmr()
        setmdPmrGolDarah(true)
    }

    const klikSimpan = () => {
        let data = {}

        data.pemeriksaanId = tempNoPmr;
        data.registrasiId = dtOrder.RegistrasiId;
        data.ruangId = ruangIdValid;
        data.antiA = antiA;
        data.antiB = antiB;
        data.selA = selA;
        data.selB = selB;
        data.selO = selO;
        data.autoKontrol = autoKontrol;
        data.antiD = antiD;
        data.ba = ba;
        data.golDarah = golDarah;
        data.rh = rh;
        data.tglPemeriksaan = dayjs().format();
        data.keterangan = keterangan;
        data.userId = userValid;
        data.clientIP = ipClient;
        data.clientHost = hostClient;

        console.log('klikSimpan : ', data);
        insertPmrGolDa(data);
    }

    const konfirmHapus = (pmrId, user, userPmr) => {
        if (user !== userPmr) {
            Modal.warning({ title: 'Peringatan!', content: 'UserId Petugas berbeda, tidak bisa Hapus Pemeriksaan!' })
        }
        else {
            confirm({
                title: 'Yakin akan Hapus Pemeriksaan Golongan Darah?',
                icon: <ExclamationCircleFilled />,
                content: `Pemeriksaan Id : ${pmrId}`,
                okText: 'Hapus',
                okType: 'danger',
                cancelText: 'Batal',
                onOk() {
                    klikHapus(pmrId, user);
                },
            });
        }
    };

    const klikHapus = (pmrId, user) => {
        let data = {}

        data.pemeriksaanId = pmrId;
        data.userIdHapus = user;

        deletePmrGolDa(data)
    }

    const klikRefreshRiw = (sReg) => {
        getRiwPmrGolonganDarah(sReg)
    }

    const changeCmMetode = (noOrder, cmMetode) => {
        if (!noOrder) {
            Modal.warning({ title: 'Peringatan!', content: 'Nomor Order Kosong!' })
        }
        else if (!cmMetode) {
            Modal.warning({ title: 'Peringatan!', content: 'CrossMatch Metode Kosong!' })
        }
        else {
            setcmMetode(cmMetode)
            let data = {}

            data.noOrder = noOrder;
            data.crossMetode = cmMetode;

            insertCmMetode(data)
        }
    }

    const klikTambahHasilCm = () => {
        if (dtOrder.StatusValid.trim() === '2') {
            Modal.warning({ title: 'Peringatan!', content: 'Pada order terlayani, tidak bisa melakukan Tambah Hasil Pemeriksaan!' })
        }
        else {
            setmdUjiSerasi(true);
            setdisMdCm(false)
            rstMdCross();
            // console.log('tempIndex : ', tempIndex);
        }
    }

    const klikSimpanCm = (noOrder) => {
        if (!noOrder) {
            Modal.warning({ title: 'Peringatan!', content: 'Nomor Order Kosong!' })
        }
        else if (!noKantong) {
            Modal.warning({ title: 'Peringatan!', content: 'Nomor Kantong Masih Kosong!' })
        }
        else if (!jnsKtg) {
            Modal.warning({ title: 'Peringatan!', content: 'Jenis Kantong Masih Kosong!' })
        }
        else if (!golDarahCm) {
            Modal.warning({ title: 'Peringatan!', content: 'Golongan Darah Kantong Masih Kosong!' })
        }
        else if (!rhesus) {
            Modal.warning({ title: 'Peringatan!', content: 'Rhesus Masih Kosong!' })
        }
        else if (!jmlCc) {
            Modal.warning({ title: 'Peringatan!', content: 'Jumlah CC Masih Kosong!' })
        }
        else if (!jenisKomponen) {
            Modal.warning({ title: 'Peringatan!', content: 'Jenis Komponen Masih Kosong!' })
        }
        else if (!mayor) {
            Modal.warning({ title: 'Peringatan!', content: 'Mayor Masih Kosong!' })
        }
        else if (!minor) {
            Modal.warning({ title: 'Peringatan!', content: 'Minor Masih Kosong!' })
        }
        // else if (!autoControl) {
        //     Modal.warning({ title: 'Peringatan!', content: 'AutoControl Masih Kosong!' })
        // }
        // else if (!dct) {
        //     Modal.warning({ title: 'Peringatan!', content: 'DCT Masih Kosong!' })
        // }
        else if (typeof hasil === 'undefined') {
            Modal.warning({ title: 'Peringatan!', content: 'Hasil Masih Kosong!' })
        }
        else if (typeof kirim === 'undefined') {
            Modal.warning({ title: 'Peringatan!', content: 'Kirim Masih Kosong!' })
        }
        else if (disMdCm) { // update baru
            let data = {}

            data.id = tempIndex
            data.noOrder = dtOrder.NoOrder;
            // data.noKantong = noKantong.toUpperCase();
            data.golDarah = golDarahCm;
            data.rhesus = rhesus;
            data.jmlCc = jmlCc;
            data.jenisKomponen = jenisKomponen;
            data.mayor = mayor;
            data.minor = minor;
            data.autoControl = autoControl;
            data.dct = dct;
            data.hasil = hasil;
            // data.kompatibel = hasil ? true : false;
            data.keterangan = keteranganCm;
            // data.userId = userValid;
            // data.clientIP = ipClient;
            // data.clientHost = hostClient;
            // data.tglPemeriksaan = dayjs().format();
            // data.lastUpdate = dayjs().format();

            console.log('UpdateCm : ', data);
            UpdateCrossMatch(data)
        }
        else { // insert hasil cmlet data = {}
            let data = {}

            data.noOrder = dtOrder.NoOrder;
            data.noKantong = noKantong.toUpperCase();
            data.jnsKantong = jnsKtg;
            data.golDarah = golDarahCm;
            data.rhesus = rhesus;
            data.jmlCc = jmlCc;
            data.jenisKomponen = jenisKomponen;
            data.mayor = mayor;
            data.minor = minor;
            data.autoControl = autoControl;
            data.dct = dct;
            data.hasil = hasil;
            // data.kompatibel = hasil ? true : false;
            data.keterangan = keteranganCm;
            data.kirim = kirim;
            data.userId = userValid;
            data.clientIP = ipClient;
            data.clientHost = hostClient;
            data.tglPemeriksaan = dayjs().format();

            console.log('klikSimpanCm : ', data);
            insertCrossMatch(data)
        }
    }

    const klikEditHasilCm = (index, user) => {
        if (user !== userValid) {
            Modal.warning({ title: 'Peringatan!', content: 'UserId Petugas berbeda, tidak bisa Ubah Hasil Crossmatch!' })
        }
        else {
            console.log('klikEditHasilCm : ', listCrossMatch[index]);
            setmdUjiSerasi(true);
            let temp = listCrossMatch[index];

            settempIndex(temp.Id);
            setNoKantong(temp.NoKantong);
            setjnsKtg(temp.JnsKantong)
            setGolDarahCm(temp.GolDarah);
            setRhesus(temp.Rhesus);
            setJmlCc(temp.JmlCc);
            setJenisKomponen(temp.JenisKomponen);
            setMayor(temp.Mayor);
            setMinor(temp.Minor);
            setAutoControl(temp.AutoControl);
            setDct(temp.Dct);
            setHasil(temp.Hasil);
            setKeteranganCm(temp.Keterangan);
            setkirim(temp.Kirim)

            setdisMdCm(true)

        }
    }

    const klikHapusHasilCm = (id, user, kantong, stsKirim) => {
        if (stsKirim) {
            Modal.warning({ title: 'Peringatan!', content: 'Kantong sudah terkirim, tidak bisa dibatal kirim!' })
        }
        else {
            confirm({
                title: 'Yakin akan membatalkan kirim kantong darah ini?',
                icon: <ExclamationCircleFilled />,
                content: `No. Kantong : ${kantong}`,
                okText: 'Hapus',
                okType: 'danger',
                cancelText: 'Batal',
                onOk() {
                    // if (user !== userValid) {
                    //     Modal.warning({ title: 'Peringatan!', content: 'UserId Petugas berbeda, tidak bisa membatalkan kirim!' })
                    // }
                    // else {
                    // }
                    let data = {}

                    data.id = id
                    data.noKantong = kantong;
                    data.noOrder = dtOrder.NoOrder;
                    data.userIdBatal = userValid;

                    console.log('klikHapusHasilCm : ', data);
                    HapusCrossMatch(data)
                },
            });
        }
    }

    const klikAdvice = (data) => {
        setmdAdvice(true)
        console.log(data)
        setdrAdvice(data.DokterAdvice)
        settempat(data.KetTempat)
        setkesimpulan(data.Kesimpulan)
        setsaran(data.Saran)
        sethslCm([data])
        setjwbAdv(data.JawabanAdvice)
    }

    const simpanAdvice = () => {
        if (!drAdvice) {
            Modal.warning({ title: 'Peringatan!', content: 'Dokter Advice masih kosong!' })
        }
        else if (!kesimpulan) {
            Modal.warning({ title: 'Peringatan!', content: 'Kesimpulan masih kosong!' })
        }
        else if (!saran) {
            Modal.warning({ title: 'Peringatan!', content: 'Saran masih kosong!' })
        }
        else {
            let data = {}

            data.id = hslCm[0].Id;
            data.dokterAdvice = drAdvice;
            // data.ketTempat = tempat;
            data.ketTempat = '-';
            data.kesimpulan = kesimpulan;
            data.saran = saran;
            data.tglAdvice = dayjs(tglAdvKirim).format();
            data.stsAdvice = hslCm[0].StsAdvice === null || hslCm[0].StsAdvice === true ? false : null;
            data.TglUpdateAdvice = dayjs().format();

            console.log('simpanAdvice : ', data);
            insertAdvice(data);
        }
    }

    return (
        <div>
            <Row>
                <Col span={24}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                        Pemeriksaan Golongan Darah
                    </Divider>
                </Col>
            </Row>

            <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                <Col span={4}>
                    Permintaan Gol.Darah :
                </Col>
                <Col span={5}>
                    <Input placeholder="..."
                        value={dtOrder.GolonganDarahOrder}
                        readOnly
                        maxLength={100}
                        style={{ width: '100%' }} />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    Cek Gol.Darah :
                </Col>
                <Col span={5}>
                    <Button
                        type='primary'
                        onClick={() => klikTambahPmr()}
                        disabled={hslPmr.length !== 0 ? true : false}
                        icon={<PlusOutlined />}
                        style={{ width: '100%' }}
                    >
                        Tambah Hasil Pemeriksaan
                    </Button>
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                </Col>
                <Col span={20}>
                    <Table
                        bordered
                        loading={spTmbahHasil}
                        columns={columns}
                        dataSource={hslPmr}
                        pagination={false}
                        scroll={{
                            x: 1200,
                            // y: 300,
                        }}
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                </Col>
                <Col span={16}>
                    <Divider
                        orientation='left'
                        style={{ margin: '0px' }}>
                        Riwayat Pemeriksaan
                    </Divider>
                </Col>
                <Col span={4}>
                    <Button
                        onClick={() => klikRefreshRiw(dtOrder.RegistrasiId)}
                        type='primary'
                        icon={<CloudDownloadOutlined />}
                        style={{ marginLeft: '5px', float: 'right' }}
                    >
                        Tampilkan Riwayat
                    </Button>
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                </Col>
                <Col span={20}>
                    <Table
                        bordered
                        loading={spTmbahHasil}
                        columns={columnsb}
                        dataSource={riwHslPmr}
                        pagination={false}
                        scroll={{
                            x: 1200,
                            // y: 300,
                        }}
                    />
                </Col>
            </Row>

            <Row>
                <Col span={24}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                        Pemeriksaan Uji Cocok Serasi
                    </Divider>
                </Col>
            </Row>

            <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                <Col span={4}>
                    Jenis Darah yang Diminta :
                </Col>
                <Col span={12}>
                    <Table
                        bordered
                        // loading={spTbPasien}
                        columns={columnsc}
                        dataSource={dtOrder.DetailOrder}
                        pagination={false}
                    />
                </Col>
                {/* <Col span={8}>
                    <Button
                        type='primary'
                        icon={<CheckSquareOutlined />}
                        disabled
                        style={{ width: '98%', marginLeft: '2%', height: '100%', fontSize: 'xxx-large' }}>
                        TERLAYANI
                    </Button>
                </Col> */}
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    Crossmatch Metode :
                </Col>
                <Col span={5}>
                    <Spin spinning={spCmMetode}>
                        <Select
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={cmMetode}
                            onChange={(e) => changeCmMetode(dtOrder.NoOrder, e)}
                        >
                            <Option key='1' value='Manual'>Manual</Option>
                            <Option key='2' value='Semiautomatic'>Semiautomatic</Option>
                            <Option key='3' value='Automatic'>Automatic</Option>
                        </Select>
                    </Spin>
                </Col>
                <Col span={4}>
                    <Button
                        type='primary'
                        disabled={cmMetode && !spCmMetode ? false : true}
                        onClick={() => klikTambahHasilCm()}
                        icon={<PlusOutlined />}
                        style={{ marginLeft: '5px' }}
                    >
                        Tambah Hasil Pemeriksaan
                    </Button>
                </Col>
            </Row>

            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                </Col>
                <Col span={20}>
                    <Table
                        bordered
                        loading={spTmbahHasil}
                        rowClassName={(record, index) => (
                            record.StsAdvice === null ? null : record.StsAdvice === false ? 'belum_jawab' : 'sudah_jawab'
                        )}
                        columns={columnsa}
                        dataSource={listCrossMatch}
                        pagination={false}
                        scroll={{
                            x: 1000,
                            // y: 300,
                        }}
                    />
                </Col>
            </Row>

            {/* MD TAMBAH HASIL PEMERIKSAAN */}
            <Modal
                centered
                open={mdPmrGolDarah}
                closable={false}
                footer={null}
                width={500}
            >
                <Row>
                    <Col span={24}>
                        <Divider
                            style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                            Pemeriksaan Golongan Darah Pasien
                        </Divider>
                    </Col>
                </Row>

                <Spin spinning={spTmbahHasil}>

                    <Row>
                        <Col span={24}>
                            <Divider
                                orientation='left'
                                orientationMargin={0}
                                plain>
                                Antisera
                            </Divider>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Anti-A :
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={antiA}
                                onChange={(e) => setAntiA(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                {/* <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option> */}
                            </Select>
                        </Col>
                        <Col span={4}>
                            <span style={{ marginLeft: '10px' }}>Anti-B :</span>
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={antiB}
                                onChange={(e) => setAntiB(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                {/* <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option> */}
                            </Select>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Divider
                                orientation='left'
                                orientationMargin={0}
                                plain>
                                Suspensi 5%
                            </Divider>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Sel A :
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={selA}
                                onChange={(e) => setSelA(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <span style={{ marginLeft: '10px' }}>Sel B :</span>
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={selB}
                                onChange={(e) => setSelB(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <span style={{ marginLeft: '10px' }}>Sel O :</span>
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={selO}
                                onChange={(e) => setSelO(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Auto Kontrol :
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={autoKontrol}
                                onChange={(e) => setAutoKontrol(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <span style={{ marginLeft: '5px' }}>Anti-D Ig M :</span>
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={antiD}
                                onChange={(e) => setAntiD(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <span style={{ marginLeft: '10px' }}>BA 6% :</span>
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={ba}
                                onChange={(e) => setBa(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Divider
                                orientation='left'
                                orientationMargin={0}
                                plain>
                                Golongan Darah Pasien
                            </Divider>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Gol. Darah :
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={golDarah}
                                onChange={(e) => setGolDarah(e)}
                            >
                                <Option key='1' value='A'>A</Option>
                                <Option key='2' value='B'>B</Option>
                                <Option key='3' value='AB'>AB</Option>
                                <Option key='4' value='O'>O</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <span style={{ marginLeft: '10px' }}>Rh :</span>
                        </Col>
                        <Col span={4}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={rh}
                                onChange={(e) => setRh(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                {/* <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option> */}
                            </Select>
                        </Col>
                    </Row>

                    <Divider />

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Keterangan :
                        </Col>
                        <Col span={20}>
                            <TextArea
                                rows={4}
                                value={keterangan}
                                onChange={(e) => setketerangan(e.target.value)}
                                placeholder="..."
                                maxLength={500}
                            />
                        </Col>
                    </Row>

                    <Divider style={{ marginBottom: '2px' }} />
                </Spin>

                <Row>
                    <Col span={12}>
                        <Spin spinning={spNoPmr}>
                            <Space>
                                <span>No. Pemeriksaan :</span>
                                <span><b>{tempNoPmr}</b></span>
                            </Space>
                        </Spin>
                    </Col>
                    <Col span={12}>
                        <Space
                            style={{ float: 'right' }}>
                            <Button
                                onClick={() => klikSimpan()}
                                type='primary'
                                style={{ width: '150px' }}>
                                Simpan
                            </Button>
                            <Button
                                onClick={() => setmdPmrGolDarah(false)}
                                style={{ width: '100px' }}>
                                Batal
                            </Button>

                        </Space>
                    </Col>
                </Row>

            </Modal>

            {/* MD TAMBAH HASIL UJI SERASI */}
            <Modal
                centered
                open={mdUjiSerasi}
                closable={false}
                footer={null}
                width={500}
            >
                <Row>
                    <Col span={24}>
                        <Divider
                            style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                            Pemeriksaan Uji Cocok Serasi
                        </Divider>
                    </Col>
                </Row>

                <Spin spinning={spTmbahHasil}>
                    <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                        <Col span={4}>
                            No. Kantong :
                        </Col>
                        <Col span={20}>
                            <Input placeholder="..."
                                value={noKantong}
                                onChange={(e) => setNoKantong(e.target.value)}
                                disabled={disMdCm}
                                maxLength={10}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Jns. Kantong :
                        </Col>
                        <Col span={20}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={jnsKtg}
                                disabled={disMdCm}
                                onChange={(e) => setjnsKtg(e)}
                            >
                                <Option key='1' value={1}>SINGLE</Option>
                                <Option key='2' value={2}>DOUBLE</Option>
                                <Option key='3' value={3}>TRIPLE</Option>
                                <Option key='4' value={4}>QUADRUPLE</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Gol. Darah :
                        </Col>
                        <Col span={8}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={golDarahCm}
                                onChange={(e) => setGolDarahCm(e)}
                            >
                                <Option key='1' value='A'>A</Option>
                                <Option key='2' value='B'>B</Option>
                                <Option key='3' value='AB'>AB</Option>
                                <Option key='4' value='O'>O</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <span style={{ marginLeft: '10px' }}>Rh :</span>
                        </Col>
                        <Col span={8}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={rhesus}
                                onChange={(e) => setRhesus(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                {/* <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option> */}
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Jumlah cc :
                        </Col>
                        <Col span={20}>
                            <Input placeholder="..."
                                addonAfter="cc"
                                value={jmlCc}
                                onChange={(e) => setJmlCc(e.target.value)}
                                maxLength={4}
                                style={{ width: '100%' }} />
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Jns. Komp. :
                        </Col>
                        <Col span={20}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={jenisKomponen}
                                onChange={(e) => setJenisKomponen(e)}
                            >
                                {ktgjnsDarah.map((opt, index) => (
                                    <Option key={index} value={opt.id}>{opt.desk}</Option>
                                ))}
                            </Select>
                        </Col>
                    </Row>

                    <Row>
                        <Col span={24}>
                            <Divider
                                orientation='left'
                                orientationMargin={0}
                                plain>
                                Tehnik gel Test
                            </Divider>
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Mayor :
                        </Col>
                        <Col span={8}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={mayor}
                                onChange={(e) => setMayor(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <span style={{ marginLeft: '10px' }}>Minor :</span>
                        </Col>
                        <Col span={8}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={minor}
                                onChange={(e) => setMinor(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            <span>Autocontrol :</span>
                        </Col>
                        <Col span={8}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={autoControl}
                                onChange={(e) => setAutoControl(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                        <Col span={4}>
                            <span style={{ marginLeft: '10px' }}>DCT :</span>
                        </Col>
                        <Col span={8}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={dct}
                                onChange={(e) => setDct(e)}
                            >
                                <Option key='1' value='-'>-</Option>
                                <Option key='2' value='+'>+</Option>
                                <Option key='3' value='+1'>+1</Option>
                                <Option key='4' value='+2'>+2</Option>
                                <Option key='5' value='+3'>+3</Option>
                                <Option key='6' value='+4'>+4</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Divider />

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            <span>Hasil :</span>
                        </Col>
                        <Col span={20}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={hasil}
                                // disabled={disMdCm}
                                onChange={(e) => setHasil(e)}
                            >
                                <Option key='1' value={false}>Incompatible</Option>
                                <Option key='2' value={true}>Compatible</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Divider />

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Keterangan :
                        </Col>
                        <Col span={20}>
                            <TextArea
                                rows={4}
                                value={keteranganCm}
                                onChange={(e) => setKeteranganCm(e.target.value)}
                                placeholder="..."
                                maxLength={500}
                            />
                        </Col>
                    </Row>

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Kirim :
                        </Col>
                        <Col span={20}>
                            <Select
                                style={{ width: '100%' }}
                                placeholder="..."
                                value={kirim}
                                disabled={disMdCm}
                                onChange={(e) => setkirim(e)}
                            >
                                <Option key='1' value={false}>Tidak Kirim</Option>
                                <Option key='2' value={true}>Kirim</Option>
                            </Select>
                        </Col>
                    </Row>

                    <Divider style={{ marginBottom: '2px' }} />

                    <Row>
                        <Col span={24}>
                            <Space
                                style={{ float: 'right' }}>
                                <Button
                                    onClick={() => klikSimpanCm(dtOrder.NoOrder)}
                                    type='primary'
                                    style={{ width: '150px' }}>
                                    Simpan
                                </Button>
                                <Button
                                    onClick={() => setmdUjiSerasi(false)}
                                    style={{ width: '100px' }}>
                                    Batal
                                </Button>
                            </Space>
                        </Col>
                    </Row>

                </Spin>

            </Modal>

            {/* MD ADVICE */}
            <Modal
                centered
                open={mdAdvice}
                closable={false}
                footer={null}
                width={800}
            >
                <Row>
                    <Col span={24}>
                        <Divider
                            style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                            Form Kirim Advice
                        </Divider>
                    </Col>
                </Row>

                <Spin spinning={spAdvice}>
                    <Row style={{ marginBottom: '2px', marginTop: '5px' }}>
                        <Col span={4}>
                            Kepada :
                        </Col>
                        <Col span={8}>
                            <Input.Group compact>
                                <Select
                                    style={{ width: '85%' }}
                                    placeholder="..."
                                    value={drAdvice}
                                    onChange={(e) => setdrAdvice(e)}
                                    // size='small'
                                    showSearch={true}
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
                                value={tempat}
                                onChange={(e) => settempat(e.target.value)}
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
                                value={dtOrder.DeskAsal}
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
                                value={hslPmr.length !== 0 ? hslPmr[0].GolDarah : '-'}
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
                        dataSource={hslCm}
                        pagination={false}
                        style={{ marginBottom: '2px' }}
                    />

                    <Row style={{ marginBottom: '2px' }}>
                        <Col span={4}>
                            Kesimpulan :
                        </Col>
                        <Col span={20}>
                            <TextArea
                                value={kesimpulan}
                                onChange={(e) => setkesimpulan(e.target.value)}
                                rows={2}
                                placeholder="..."
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
                                value={saran}
                                onChange={(e) => setsaran(e.target.value)}
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
                                value={dayjs(tglAdvKirim).format('DD-MM-YYYY')}
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

                    <Divider style={{ marginBottom: '2px' }} />

                    <Row style={{ marginBottom: '10px' }}>
                        <Col span={24}>
                            <Space
                                style={{ float: 'right' }}>
                                <Button
                                    onClick={() => simpanAdvice()}
                                    type='primary'
                                    style={{ width: '150px' }}>
                                    Simpan
                                </Button>
                                <Button
                                    onClick={() => setmdAdvice(false)}
                                    style={{ width: '100px' }}>
                                    Batal
                                </Button>
                            </Space>
                        </Col>
                    </Row>

                </Spin>

                <Row>
                    <Col span={24}>
                        <Divider
                            style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                            Jawaban Advice
                        </Divider>
                    </Col>
                </Row>
                <Row style={{ marginTop: '5px' }}>
                    <Col span={24}>
                        <TextArea
                            value={jwbAdv}
                            readOnly
                            // onChange={(e) => setketkesesuaianIdentitas(e.target.value)}
                            rows={2}
                            placeholder="..."
                            maxLength={500}
                        />
                    </Col>
                </Row>

            </Modal>
        </div >
    )
}

export default ProsesPmrCM