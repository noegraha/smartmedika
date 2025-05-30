/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../../rawatjalan/context';
import { Input, Modal, message } from 'antd';
import dayjs from 'dayjs';
import { v4 as uuidv4 } from 'uuid';

const { TextArea } = Input;

export const SatuSehatEncounterContext = createContext();

const SatuSehatEncounterContextProvider = (props) => {
    const { token, namauser } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const ipEndpoint = sessionStorage.getItem("apiPenunjang");

    const baseURL = `${ipEndpoint}/`
    // const baseURL = "http://182.168.7.251:5577/"
    // const baseURL = "http://182.168.0.119/api/"

    const ip = sessionStorage.getItem("IP");
    const host = sessionStorage.getItem("Host");
    const env = sessionStorage.getItem("environment");

    const [sstoken, setsstoken] = useState(null);
    const [SSTokenExp, setSSTokenExp] = useState();
    const [baseUrlSS, setbaseUrlSS] = useState();
    const [tempA, settempA] = useState();
    const [username, setusername] = useState(namauser);
    const [ihsRS, setihsRS] = useState();
    const [listRuang, setlistRuang] = useState([]);
    const [gedung, setgedung] = useState(null);
    const [listPasien, setlistPasien] = useState([]);
    const [ruangId, setruangId] = useState(null);
    const [tglPelayanan, settglPelayanan] = useState(dayjs());
    // formKirim
    const [uuidEncounter, setuuidEncounter] = useState(null);
    const [regId, setregId] = useState(null);
    const [pasienId, setpasienId] = useState(null);
    const [namaPasien, setnamaPasien] = useState(null);
    const [nikPasien, setnikPasien] = useState(null);
    const [alamat, setalamat] = useState(null);
    const [ihsPasien, setihsPasien] = useState(null);
    const [jenkelPasien, setjenkelPasien] = useState();
    const [tglLahirPasien, settglLahirPasien] = useState();
    const [namaDokter, setnamaDokter] = useState(null);
    const [ihsPracticioner, setihsPracticioner] = useState(null);
    const [mulaiPelayanan, setmulaiPelayanan] = useState(null);
    const [selesaiPelayanan, setselesaiPelayanan] = useState(null);
    const [namaRuang, setnamaRuang] = useState(null);
    const [ihsRuang, setihsRuang] = useState(null);
    const [dcPlanning, setdcPlanning] = useState(null);
    const [pendStart, setpendStart] = useState(null);
    const [pendEnd, setpendEnd] = useState(null);
    const [pmrStart, setpmrStart] = useState(null);
    const [pmrEnd, setpmrEnd] = useState(null);
    const [pulangStart, setpulangStart] = useState(null);
    const [pulangEnd, setpulangEnd] = useState(null);
    const [diagnosis, setdiagnosis] = useState([]);
    const [listResourceId, setlistResourceId] = useState([]);
    // observation
    const [nadi, setnadi] = useState();
    const [respRate, setrespRate] = useState();
    const [sistol, setsistol] = useState();
    const [diastol, setdiastol] = useState();
    const [suhu, setsuhu] = useState();
    const [jamTdVital, setjamTdVital] = useState();
    // procedure
    const [SnProcedure, setSnProcedure] = useState([]);
    const [procedure, setprocedure] = useState([]);
    // Composition
    const [composition, setcomposition] = useState();
    // Madecation
    const [medication, setmedication] = useState([]);
    const [medValid, setmedValid] = useState([]);
    const [waktuOrderResep, setwaktuOrderResep] = useState();
    const [waktuValidResep, setwaktuValidResep] = useState();
    // Service Request
    const [serviceRequest, setserviceRequest] = useState([]);
    // Diag Report
    const [diagReport, setdiagReport] = useState([]);
    const [chkBtaPositif, setchkBtaPositif] = useState(false);
    // Allergi Intoleran
    const [allergi, setallergi] = useState([]);
    const [chkAllergi, setchkAllergi] = useState(false);
    // Clinical Impression
    const [clinicImp, setclinicImp] = useState([]);
    const [chkClinicImp, setchkClinicImp] = useState(false);
    // Rencana Tindak Lanjut
    const [rencanaTL, setrencanaTL] = useState([]);
    const [chkRencanaTL, setchkRencanaTL] = useState(false);
    // respon quisioner
    const [chkKuisioner, setchkKuisioner] = useState(false);
    // catatan pengobatan
    const [chkNoteMed, setchkNoteMed] = useState(false);
    // form detail ihs pasien
    const [ihstgllahir, setihstgllahir] = useState(null);
    const [ihsalamat, setihsalamat] = useState(null);
    const [ihsjenkel, setihsjenkel] = useState(null);
    const [ihsihsnumber, setihsihsnumber] = useState(null);
    const [ihsnik, setihsnik] = useState(null);
    const [ihslastupdate, setihslastupdate] = useState(null);
    const [ihsnama, setihsnama] = useState(null);
    // temp display notif
    const [tempNotif, settempNotif] = useState(0);
    // md
    const [mdDetailKirim, setmdDetailKirim] = useState(false);
    const [mdIhsPasien, setmdIhsPasien] = useState(false);
    const [mdInfoUpdate, setmdInfoUpdate] = useState(false);
    const [mddetailKirimv2, setmddetailKirimv2] = useState(false);
    // sp
    const [spTbPasien, setspTbPasien] = useState(false);
    const [spDetailKirim, setspDetailKirim] = useState(false);

    // ===== Bridge JKN E-Klaim BPJS =====
    const [identitasPx, setidentitasPx] = useState({});
    const [idOrdBPJS, setidOrdBPJS] = useState('100071505');
    const [paramCoverage, setparamCoverage] = useState();
    const [paramEncounter, setparamEncounter] = useState();
    const [coverageId, setcoverageId] = useState();
    const [JSONPost, setJSONPost] = useState();
    const [accountId, setaccountId] = useState();
    const [keluhanUtama, setkeluhanUtama] = useState();
    const [waktuPelayanan, setwaktuPelayanan] = useState();
    const [rcsIdKel1, setrcsIdKel1] = useState();
    const [rscIdKel2, setrscIdKel2] = useState([]);
    const [textResponseById, settextResponseById] = useState();
    const [dataSepDummy, setdataSepDummy] = useState();
    const [ssDummySEP, setssDummySEP] = useState(null);

    const [listSNOMEDKeluhan, setlistSNOMEDKeluhan] = useState([]);
    const [listSNDRiwPenySendiri, setlistSNDRiwPenySendiri] = useState([]);
    const [tempListSnomed, settempListSnomed] = useState([]);
    const [tempListSNDRiwPenySendiri, settempListSNDRiwPenySendiri] = useState([]);
    const [listRiwayatDx, setlistRiwayatDx] = useState([]);
    const [listOrderResep, setlistOrderResep] = useState([]);
    const [listObatKeluaran, setlistObatKeluaran] = useState([]);

    const [tabKirimJKM, settabKirimJKM] = useState('1');
    const [tadDataKlnis, settadDataKlnis] = useState('1')

    // sp
    const [spIdentPx, setspIdentPx] = useState(false);
    const [spCvg, setspCvg] = useState(false);
    const [spGetRsc, setspGetRsc] = useState(false);

    // md
    const [mdEditJSON, setmdEditJSON] = useState();
    const [msRscdetail, setmsRscdetail] = useState(false);
    const [mdIhsPasienv2, setmdIhsPasienv2] = useState(false);

    const usr = sessionStorage.getItem("user");

    useEffect(() => {
        getDetailEnv(env);

        // settingan info update otomatis
        const updateDate = '2024-11-11';
        const today = dayjs();
        // const today = dayjs('2024-09-06');
        const daysDifference = today.diff(dayjs(updateDate), 'day');
        if (daysDifference < 30) {
            setmdInfoUpdate(true);
        }
    }, []);

    // === Dummy Data ===
    const pxDummy = [
        {
            Nik: '9271060312000001',
            Nama: 'Ardianto Putra',
            JenisKelamin: 'male',
            TanggalLahir: '1992-01-09',
            IHSNumber: 'P02478375538',
        },
        {
            Nik: '9204014804000002',
            Nama: 'Claudia Sintia',
            JenisKelamin: 'female',
            TanggalLahir: '1989-11-03',
            IHSNumber: 'P03647103112',
        },
        {
            Nik: '9104224509000003',
            Nama: 'Elizabeth Dior',
            JenisKelamin: 'female',
            TanggalLahir: '1976-07-07',
            IHSNumber: 'P00805884304',
        },
        {
            Nik: '9104223107000004',
            Nama: 'Dr. Alan Bagus Prasetya',
            JenisKelamin: 'male',
            TanggalLahir: '1977-09-03',
            IHSNumber: 'P00912894463',
        },
        {
            Nik: '9104224606000005',
            Nama: 'Ghina Assyifa',
            JenisKelamin: 'female',
            TanggalLahir: '2004-08-21',
            IHSNumber: 'P01654557057',
        },

        {
            Nik: '9104025209000006',
            Nama: 'Salsabilla Anjani Rizki',
            JenisKelamin: 'female',
            TanggalLahir: '2001-04-16',
            IHSNumber: 'P02280547535',
        },
        {
            Nik: '9201076001000007',
            Nama: 'Theodore Elisjah',
            JenisKelamin: 'female',
            TanggalLahir: '1985-09-18',
            IHSNumber: 'P01836748436',
        },
        {
            Nik: '9201394901000008',
            Nama: 'Sonia Herdianti',
            JenisKelamin: 'female',
            TanggalLahir: '1996-06-08',
            IHSNumber: 'P00883356749',
        },
        {
            Nik: '9201076407000009',
            Nama: 'Nancy Wang',
            JenisKelamin: 'female',
            TanggalLahir: '1955-10-10',
            IHSNumber: 'P01058967035',
        },
        {
            Nik: '9210060207000010',
            Nama: 'Syarif Muhammad',
            JenisKelamin: 'male',
            TanggalLahir: '1988-11-02',
            IHSNumber: 'P02428473601',
        },
    ];

    const practicionerDummy = [
        {
            Nik: '7209061211900001',
            Nama: 'dr. Alexander',
            JenisKelamin: 'male',
            TanggalLahir: '1994-01-01',
            IHSNumber: '10009880728',
        },
        {
            Nik: '3322071302900002',
            Nama: 'dr. Yoga Yandika, Sp.A',
            JenisKelamin: 'male',
            TanggalLahir: '1995-02-02',
            IHSNumber: '10006926841',
        },
        {
            Nik: '3171071609900003',
            Nama: 'dr. Syarifuddin, Sp.Pd.',
            JenisKelamin: 'male',
            TanggalLahir: '1988-03-03',
            IHSNumber: '10001354453',
        },
        {
            Nik: '3207192310600004',
            Nama: 'dr. Nicholas Evan, Sp.B.',
            JenisKelamin: 'male',
            TanggalLahir: '1986-04-04',
            IHSNumber: '10010910332',
        },
        {
            Nik: '6408130207800005',
            Nama: 'dr. Dito Arifin, Sp.M.',
            JenisKelamin: 'male',
            TanggalLahir: '1985-05-05',
            IHSNumber: '10018180913',
        },
        {
            Nik: '3217040109800006',
            Nama: 'dr. Olivia Kirana, Sp.OG',
            JenisKelamin: 'female',
            TanggalLahir: '1984-06-06',
            IHSNumber: '10002074224',
        },
        {
            Nik: '3519111703800007',
            Nama: 'dr. Alicia Chrissy, Sp.N.',
            JenisKelamin: 'female',
            TanggalLahir: '1982-07-07',
            IHSNumber: '10012572188',
        },
        {
            Nik: '5271002009700008',
            Nama: 'dr. Nathalie Tan, Sp.PK.',
            JenisKelamin: 'female',
            TanggalLahir: '1981-08-08',
            IHSNumber: '10018452434',
        },
        {
            Nik: '3313096403900009',
            Nama: 'Sheila Annisa S.Kep',
            JenisKelamin: 'female',
            TanggalLahir: '1980-09-09',
            IHSNumber: '10014058550',
        },
        {
            Nik: '3578083008700010',
            Nama: 'apt. Aditya Pradhana, S.Farm.',
            JenisKelamin: 'female',
            TanggalLahir: '1980-10-10',
            IHSNumber: '10001915884',
        },
    ];

    // get token
    const SatuSehatGetToken = () => {
        setspTbPasien(true);
        axios
            .post(`${baseURL}SatuSehat/Token`, {
                headers: options.headers,
            })
            .then((res) => {
                // console.log('satuSehat : ', res);
                setspTbPasien(false);
                if (res.status === 200) {
                    setsstoken(res.data.access_token);
                } else {
                    Modal.error({
                        title: 'Gagal!',
                        content: `Gagal mengambil Token SATUSEHAT!`,
                    });
                }
            })
            .catch((err) => {
                setspTbPasien(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR!, melakukan proses mengambil Token SATUSEHAT! -> ${err}`,
                });
            });
    };

    // get environment
    const getDetailEnv = (data) => {
        setspTbPasien(true)
        axios
            .get(`${baseURL}SatuSehat/GetEnvbyEnv/${data}`, options)
            .then((response) => {
                setspTbPasien(false)
                console.log('getDetailEnv : ', response);
                if (response.data && response.data.statusCode) {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET detail Environment! -> ${response.data.message}`,
                    });
                }
                else {
                    Modal.info({
                        title: "Informasi!",
                        content: `Berhasil! -> ${response.data.message}`,
                        onOk: () => {
                            setsstoken(response.data.result.token)
                            setbaseUrlSS(response.data.result.base_url)
                            setihsRS(response.data.result.org_id)
                            setSSTokenExp(response.data.result.expired)
                            settempA(1)
                            console.log('detail Env : ', response.data)
                        },
                    });

                }
            })
            .catch((err) => {
                setspTbPasien(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Detail Environment! -> ${err}`,
                });
            });
    };

    const getListRuang = (gedung) => {
        setspTbPasien(true)
        axios
            .get(`${baseURL}SisJwt/RuangByUser/${usr}/%20/2/${gedung}`, options)
            .then((response) => {
                setspTbPasien(false)
                console.log('getListKtg : ', response);
                if (response.data.statusCode === 200) {
                    if (response.data.result !== 0) {
                        message.success("Berhasil ambil Daftar Ruang!");
                        setlistRuang(response.data.result)
                    } else {
                        setlistRuang([]);
                        Modal.info({
                            title: "Info",
                            content: 'Tidak ada List Ruang.',
                        });
                    }
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data List Ruang! -> ${response.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTbPasien(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data List Ruang! -> ${err}`,
                });
            });
    };

    const getListPasien = (ruangId, tgl) => {
        setspTbPasien(true)
        axios
            .get(`${baseURL}SatuSehat/lookuppasienbypoli/${ruangId}/${tgl}`, options)
            .then((response) => {
                setspTbPasien(false)
                settempNotif(0)
                console.log('getListKtg : ', response);
                if (response.data.statusCode === 200) {
                    if (response.data.result.length !== 0) {
                        setlistPasien(response.data.result)
                    } else {
                        setlistPasien([]);
                        Modal.info({
                            title: "Info",
                            content: 'Tidak ada Pasien ditemukan.',
                        });
                    }
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data Daftar Pasien! -> ${response.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTbPasien(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Daftar Pasien! -> ${err}`,
                });
            });
    };

    const rstDetailKirim = () => {
        setuuidEncounter(null);
        setregId(null);
        setnamaPasien(null);
        setnikPasien(null);
        setalamat(null);
        setihsPasien(null);
        setjenkelPasien();
        settglLahirPasien();
        setnamaDokter(null);
        setihsPracticioner(null);
        setmulaiPelayanan(null);
        setselesaiPelayanan(null);
        setnamaRuang(null);
        setihsRuang(null);
        setdcPlanning(null);
        setpendStart(null);
        setpendEnd(null);
        setpmrStart(null);
        setpmrEnd(null);
        setpulangStart(null);
        setpulangEnd(null);
        setdiagnosis([]);
        setSnProcedure([]);
        setprocedure([]);
        setcomposition();
        setmedication([]);
        setmedValid([]);
        setwaktuOrderResep("-");
        setwaktuValidResep("-");
        setnadi(null);
        setrespRate(null);
        setsistol(null);
        setdiastol(null);
        setsuhu(null);
        setjamTdVital(dayjs());
        setserviceRequest([]);
        setdiagReport([]);
        setchkBtaPositif(false);
        setallergi([]);
        setchkAllergi(false);
        setclinicImp([]);
        setchkClinicImp(false);
        setrencanaTL([]);
        setchkRencanaTL(false);
        setchkKuisioner(false);
        setchkNoteMed(false);
    };

    const getDetailKirim = (regid, ruangId) => {
        setspTbPasien(true)
        axios
            .get(`${baseURL}SatuSehat/detailkirimss/${regid}/${ruangId}/${env}`, options)
            .then((response) => {
                setspTbPasien(false)
                console.log('getDetailKirim : ', response);
                if (response.data.result.code === "200") {
                    let testuuid = uuidv4();

                    setuuidEncounter(testuuid);
                    setregId(response.data.result.result.RegistrasiId);
                    setnamaPasien(response.data.result.result.Nama);
                    setnikPasien(response.data.result.result.Nik);
                    setalamat(response.data.result.result.Alamat);
                    setihsPasien(response.data.result.result.IHSNumber); // => ws masih kurang get ihs
                    setjenkelPasien(response.data.result.result.JenisKelamin);
                    settglLahirPasien(response.data.result.result.TanggalLahir);
                    setnamaDokter(response.data.result.result.NamaDokter);
                    setihsPracticioner(response.data.result.result.IhsNumber);
                    setmulaiPelayanan(response.data.result.result.JamRegistrasi);
                    setselesaiPelayanan(response.data.result.result.JamEndLayanan);
                    setnamaRuang(response.data.result.result.NamaRuang);
                    setihsRuang(response.data.result.result.SatuSehatId);
                    setdcPlanning(response.data.result.result.Planning);

                    if (response.data.result.result.BaruLama === 'L') {
                        setpendStart(dayjs(response.data.result.result.JamRegistrasi).subtract(60, 'second'));
                    }
                    else {
                        setpendStart(dayjs(response.data.result.result.JamRegistrasi).subtract(180, 'second'));
                    }

                    setpendEnd(response.data.result.result.JamRegistrasi);
                    setpmrStart(response.data.result.result.JamMulaiLayanan);
                    setpmrEnd(response.data.result.result.JamEndLayanan);
                    setpulangStart(response.data.result.result.JamEndLayanan);
                    setpulangEnd(response.data.result.result.JamEndLayanan);

                    const updatedData = response.data.result.result.Diagnosis.map((item) => {
                        const uuid = uuidv4();
                        return { ...item, uuid }; // Menambahkan properti uuid ke setiap objek data
                    });
                    setdiagnosis(updatedData);
                    console.log('Diagnosa : ', updatedData);

                    // set observation
                    if (response.data.result.result.Observation) {
                        setnadi(response.data.result.result.Observation.FrekuensiNadi);
                        setrespRate(response.data.result.result.Observation.FrekuensiNafas);
                        setsistol(response.data.result.result.Observation.TekananDarahSistolik);
                        setdiastol(response.data.result.result.Observation.TekananDarahDiastolik);
                        setsuhu(response.data.result.result.Observation.SuhuTubuh);
                        setjamTdVital(response.data.result.result.Observation.Jam);
                    }

                    // set SnProcedure
                    if (response.data.result.result && response.data.result.result.SNProcedure && response.data.result.result.SNProcedure.length !== 0) {
                        const dataSnProc = response.data.result.result.SNProcedure.map((item) => {
                            const uuid = uuidv4();
                            return { ...item, uuid }; // Menambahkan properti uuid ke setiap objek data
                        });
                        setSnProcedure(dataSnProc);
                    }

                    // set procedure
                    if (response.data.result.result && response.data.result.result.Icd9 && response.data.result.result.Icd9.length !== 0) {
                        // const dataICD9 = response.data.result.result.Icd9.map((item) => {
                        //     const uuid = uuidv4();
                        //     return { ...item, uuid }; // Menambahkan properti uuid ke setiap objek data
                        // });
                        setprocedure(response.data.result.result.Icd9);
                    }

                    // set composition
                    if (response.data.result.result.Composition) {
                        setcomposition(response.data.result.result.Composition.Planning);
                    }

                    // set medication order
                    if (response.data.result.result.Medication.orderList.length !== 0) {
                        setmedication(response.data.result.result.Medication.orderList);

                        let a = response.data.result.result.Medication.orderList.length - 1;

                        // console.log('b : ', b);
                        setwaktuOrderResep(dayjs(response.data.result.result.Medication.orderList[a].WaktuEntry).format('DD-MM-YYYY HH:mm'));
                    }
                    console.log('medication : ', response.data.result.result.Medication.orderList);

                    if (response.data.result.result.MedicationDispense.length !== 0) {
                        let b = response.data.result.result.MedicationDispense.length - 1;
                        // Jika properti DATEENTRY ada dalam objek Valid, maka lakukan format tanggal
                        setwaktuValidResep(
                            dayjs(response.data.result.result.MedicationDispense[b].WaktuResep).format('DD-MM-YYYY HH:mm')
                        );
                        // set medication valid
                        setmedValid(response.data.result.result.MedicationDispense);
                    }

                    // set service order
                    if (response.data.result.result.ServiceRequest.length !== 0) {
                        setserviceRequest(response.data.result.result.ServiceRequest);
                    }

                    // set diagReport
                    if (response.data.result.result.DiagReport.length !== 0) {
                        setdiagReport(response.data.result.result.DiagReport);
                    }

                    // set allergi
                    if (response.data.result.result.AllergiIntolerance.length !== 0) {
                        setallergi(response.data.result.result.AllergiIntolerance);
                    }

                    // set clinical imp
                    if (response.data.result.result.ClinicalImpression.length !== 0) {
                        setclinicImp(response.data.result.result.ClinicalImpression);
                    }

                    // set rencana tindak lanjut
                    if (response.data.result.result.RencanaTindakLanjut.length !== 0) {
                        setrencanaTL(response.data.result.result.RencanaTindakLanjut);
                    }

                    setmdDetailKirim(true);

                    // generateUUIDs(response.data.result.Diagnosis)
                    // if (response.data.result.length !== 0) {
                    //     setlistPasien(response.data.result)
                    // } else {
                    //     setlistPasien([]);
                    //     Modal.info({
                    //         title: "Info",
                    //         content: 'Tidak ada Pasien ditemukan.',
                    //     });
                    // }
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data Detail Kirim Pasien! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbPasien(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Daftar Pasien! -> ${err}`,
                });
            });
    };

    const generateUUIDs = (data) => {
        const uuids = data.map((item) => {
            const uuid = uuidv4();
            return uuid;
        });

        console.log('generateUUIDs : ', uuids);
    };

    const getIhsPasien = (nik) => {
        setspDetailKirim(true)
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        settempA(0)

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit >= 45) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            settempA(1)
        }

        if (tempA === 1) {
            axios
                .get(`${baseURL}SatuSehat/GetPasienByNIK/${nik}/${sstoken}/${encodeURIComponent(baseUrlSS)}`, options)
                .then((response) => {
                    setspDetailKirim(false)
                    console.log('getIhsPasien : ', response);
                    if (response.data.hasOwnProperty('statusCode')) {
                        Modal.error({
                            title: "Gagal!",
                            content: response.data.result,
                        });
                    }
                    else {
                        if (response.data.length === 1) {
                            setihstgllahir(response.data[0].resource.hasOwnProperty('birthDate') ? response.data[0].resource.birthDate : '-');
                            setihsalamat(response.data[0].resource.hasOwnProperty('address') ? response.data[0].resource.address.line[0] : '-');
                            setihsjenkel(response.data[0].resource.hasOwnProperty('gender') ? response.data[0].resource.gender : '-');
                            setihsihsnumber(response.data[0].resource.hasOwnProperty('id') ? response.data[0].resource.id : '-');
                            setihsnik(response.data[0].resource.hasOwnProperty('identifier') ? response.data[0].resource.identifier[1].value : '-');
                            setihslastupdate(response.data[0].resource.hasOwnProperty('meta') ? response.data[0].resource.meta.lastUpdated : '-');
                            setihsnama(response.data[0].resource.hasOwnProperty('name') ? response.data[0].resource.name[0].text : '-');

                            if (env === 'prod') {
                                setmdIhsPasien(true);
                            }
                            else {
                                setmdIhsPasienv2(true);
                            }
                        }
                        else if (response.data.length > 1) {
                            Modal.info({
                                title: "Informasi",
                                content: 'Ditemukan detail Pasien dari SatuSehat LEBIH DARI 1. Cek Console log untuk melihat detail response.',
                            });
                            console.log('isi detail respon : ', response.data);
                        }
                        else {
                            Modal.info({
                                title: "Informasi",
                                content: 'Tidak ditemukan detail Pasien dari SatuSehat.',
                            });
                        }
                    }
                })
                .catch((err) => {
                    setspDetailKirim(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! GET IHS Number Pasien! -> ${err}`,
                    });
                });
        }
    };

    const insertIhsPasien = (data) => {
        setspDetailKirim(true)
        axios
            .post(`${baseURL}SatuSehat/insertihspasien
            `, data, {
                headers: options.headers,
            })
            .then((res) => {
                setspDetailKirim(false)
                console.log('satuSehat : ', res);
                console.log('satuSehat data : ', res.data.statusCode);
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan data Ihs Number Pasien.",
                        onOk: () => {
                            setmdIhsPasien(false)
                            setihsPasien(res.data.result)
                        },
                    });
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Disimpan Ihs Number Pasien! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspDetailKirim(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR Disimpan Ihs Number Pasien! -> ${err}`,
                });
            });
    };

    const kirimBundle = (data) => {
        setspDetailKirim(true)
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        settempA(0)

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit >= 45) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            settempA(1)
        }

        if (tempA === 1) {
            axios
                .post(`${baseURL}SatuSehat/Bundle/${sstoken}/${encodeURIComponent(baseUrlSS)}`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    setspDetailKirim(false)
                    console.log('kirimBundle response : ', res);

                    if (res.data.result.result.hasOwnProperty('entry')) {
                        setlistResourceId(res.data.result.result.entry)
                        Modal.success({
                            title: "Sukses",
                            content: 'Berhasil mengirim data ke SatuSehat.',
                            onOk: () => {
                                let temp = res.data.result.result.entry;

                                const updatedEntryData = temp.map((entry) => {
                                    entry.registrasiId = regId;
                                    entry.userId = username;
                                    entry.clientHost = host;
                                    entry.clientIP = ip;
                                    entry.environment = env;
                                    entry.ruangId = ruangId;
                                    return entry;
                                });
                                insertResourceId(updatedEntryData)

                                console.log('simpan resourceID : ', updatedEntryData);
                            },
                        });
                    }
                    else {
                        let msg = res.data.result.result;
                        let additionalMessage = JSON.stringify(msg, null, 2);

                        Modal.error({
                            title: "Gagal!",
                            content: (
                                <div>
                                    <p>Gagal! mengirim data ke SatuSehat!</p>
                                    <TextArea rows={15} value={additionalMessage} readOnly />
                                </div>
                            ),
                        });
                    }
                })
                .catch((err) => {
                    setspDetailKirim(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! Kirim Bundle SatuSehat! -> ${err}`,
                    });
                });
        }

        // axios
        //     .post(`${baseURL}SatuSehat/Bundle/${sstoken}/${encodeURIComponent(baseUrlSS)}`, data, {
        //         headers: options.headers,
        //     })
        //     .then((res) => {
        //         setspDetailKirim(false)
        //         console.log('response kirimBundle : ', res);
        //         // if (res.data.result.result.hasOwnProperty('entry')) {
        //         //     setlistResourceId(res.data.result.result.entry)
        //         //     Modal.success({
        //         //         title: "Sukses",
        //         //         content: 'Berhasil mengirim data ke SatuSehat.',
        //         //         onOk: () => {
        //         //             let temp = res.data.result.result.entry;

        //         //             const updatedEntryData = temp.map((entry) => {
        //         //                 entry.registrasiId = regId;
        //         //                 entry.userId = username;
        //         //                 entry.clientHost = host;
        //         //                 entry.clientIP = ip;
        //         //                 return entry;
        //         //             });
        //         //             insertResourceId(updatedEntryData)

        //         //             console.log('simpan resourceID : ', updatedEntryData);
        //         //         },
        //         //     });
        //         // }
        //         // else {
        //         //     Modal.error({
        //         //         title: "Gagal!",
        //         //         content: 'Gagal! mengirim data ke SatuSehat!',
        //         //     });
        //         // }
        //         // setresPostEncounter(res.data.result)
        //         // setidEncounter(res.data.result.id)
        //     })
        //     .catch((err) => {
        //         setspDetailKirim(false)
        //         Modal.error({
        //             title: "ERROR!",
        //             content: `ERROR! Mengirim data SatuSehat! -> ${err}`,
        //         });
        //     });
    };

    const insertResourceId = (data) => {
        setspDetailKirim(true)
        axios
            .post(`${baseURL}SatuSehat/insertresourceid`, data, {
                headers: options.headers,
            })
            .then((res) => {
                setspDetailKirim(false)
                console.log('satuSehat : ', res);
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan Resource Id SatuSehat.",
                        onOk: () => {
                            setmdDetailKirim(false)
                            getListPasien(ruangId, dayjs(tglPelayanan).format('YYYY-MM-DD'))
                        },
                    });
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Disimpan Resource Id SatuSehat! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspDetailKirim(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR Disimpan Resource Id SatuSehat! -> ${err}`,
                });
            });
    };

    const kirimTele = () => {
        // setspDetailKirim(true)
        let data = {
            clientId: "MON",
            emote: "2",
            message: `UWER-UWER TERDETEKSII GAEES....!!!! IP Pengirim : ${ip}`
        };

        if (data) {
            axios
                .post(`${baseURL}BridgeTele`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    // setspDetailKirim(false)
                    console.log('BridgeTele : ', res);
                    // if (res.data.statusCode === 200) {
                    //     Modal.success({
                    //         title: "Sukses",
                    //         content: "Berhasil Disimpan Resource Id SatuSehat.",
                    //         onOk: () => {
                    //             setmdDetailKirim(false)
                    //             getListPasien(ruangId, dayjs(tglPelayanan).format('YYYY-MM-DD'))
                    //         },
                    //     });
                    // }
                    // else {
                    //     Modal.error({
                    //         title: "Gagal!",
                    //         content: `Gagal Disimpan Resource Id SatuSehat! -> ${res.data.message}`,
                    //     });
                    // }
                })
                .catch((err) => {
                    // setspDetailKirim(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR Pengiriman Pesan Telegram! -> ${err}`,
                    });
                });
        }

    };

    // ===== bridging E-Klaim JKN BPJS =====

    const getIdentPx = (noreg) => {
        setspIdentPx(true);
        axios
            .get(`${baseURL}SatuSehat/GetIdentPasien/${noreg}`, options)
            .then((response) => {
                setspIdentPx(false);
                console.log('getIdentPx : ', response);
                if (response.data.result.code === "200") {
                    setidentitasPx(response.data.result.result);
                    setihsPasien(response.data.result.result.IHSNumber);
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
                    });
                }
            })
            .catch((err) => {
                setspIdentPx(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data! -> ${err}`,
                });
            });
    };

    const getParamCoverage = (noreg) => {
        setspCvg(true);
        if (env === 'prod') {
            axios
                .get(`${baseURL}SatuSehat/GetParameterCoverage/${noreg}/${ruangId}`, options)
                .then((response) => {
                    setspCvg(false);
                    console.log('getParamCoverage : ', response);
                    if (response.data.result.code === "200") {
                        setparamCoverage(response.data.result.result);
                    }
                    else {
                        setparamCoverage();
                        Modal.error({
                            title: "Gagal!",
                            content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
                        });
                    }
                })
                .catch((err) => {
                    setspCvg(false);
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! GET data! -> ${err}`,
                    });
                });
        }
        else {
            axios
                .get(`${baseURL}SatuSehat/GetParameterCoverage/${noreg}/${ruangId}`, options)
                .then((response) => {
                    setspCvg(false);
                    console.log('getParamCoverage : ', response);
                    if (response.data.result.code === "200") {
                        // setparamCoverage(response.data.result.result);

                        let data = {};

                        data.NoPeserta = "0000077208271"; // dummy untuk rawat jalan
                        data.Value = "ppu-pegawai-swasta";
                        data.Name = "Pegawai Swasta";
                        data.KelasRawatId = "1";
                        data.NamaKelas = "Kelas 1";
                        data.ResourceID = response.data.result.result !== null ? response.data.result.result.ResourceID : null;

                        setparamCoverage(data);
                    }
                    else {
                        setparamCoverage();
                        Modal.error({
                            title: "Gagal!",
                            content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
                        });
                    }
                })
                .catch((err) => {
                    setspCvg(false);
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! GET data! -> ${err}`,
                    });
                });

            setspCvg(false);
        }
    };

    const getParamEncounter = (sReg) => {
        setspCvg(true);
        axios
            .get(`${baseURL}SatuSehat/GetParameterEncounter/${sReg}/${ruangId}/${env}`, options)
            .then((response) => {
                setspCvg(false);
                console.log('getParamEncounter : ', response);
                if (response.data.result.code === "200") {
                    let temp = response.data.result.result;
                    const selectedDPJP = practicionerDummy.find((item) => item.Nik === dataSepDummy.NIK_Dummy_Prac);
                    temp.NamaDPJP = selectedDPJP.Nama;
                    temp.IhsPracticioner = selectedDPJP.IHSNumber;

                    setparamEncounter(temp);
                }
                else {
                    // setparamEncounter();
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
                    });
                }
            })
            .catch((err) => {
                setspCvg(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data! -> ${err}`,
                });
            });
    };

    const getAccountId = (sReg) => {
        setspCvg(true);
        axios
            .get(`${baseURL}SatuSehat/GetAccountId/${sReg}/${ruangId}/${env}`, options)
            .then((response) => {
                setspCvg(false);
                console.log('getAccountId : ', response);
                if (response.data.result.code === "200") {
                    if (response?.data?.result?.result?.ResourceID) {
                        setaccountId(response.data.result.result.ResourceID);
                    }
                    else {
                        setaccountId();
                    }
                }
                else {
                    setaccountId();
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
                    });
                }
            })
            .catch((err) => {
                setspCvg(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data! -> ${err}`,
                });
            });
    };

    const getKeluhan = (sReg, sRscGroupUtama, sRscGroupPenyerta) => {
        setspCvg(true);
        axios
            .get(`${baseURL}SatuSehat/GetKeluhan/${sReg}/${ruangId}/${sRscGroupUtama}/${sRscGroupPenyerta}/${env}`, options)
            .then((response) => {
                setspCvg(false);
                console.log('getKeluhan : ', response);
                if (response.data.result.code === "200") {
                    if (response?.data?.result?.result?.Subjektif) {
                        setkeluhanUtama(response.data.result.result.Subjektif);
                        setwaktuPelayanan(response.data.result.result.DateEntry);
                        setrcsIdKel1(response.data.result.result.RscIdKelUtama);
                        setrscIdKel2(response.data.result.result.KelPenyerta);
                    }
                    else {
                        setkeluhanUtama();
                        setwaktuPelayanan();
                        setrcsIdKel1();
                        setrscIdKel2([]);
                    }
                }
                else {
                    setkeluhanUtama();
                    setwaktuPelayanan();
                    setrcsIdKel1();
                    setrscIdKel2([]);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
                    });
                }
            })
            .catch((err) => {
                setspCvg(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data! -> ${err}`,
                });
            });
    };

    const getListOrderResep = (sReg) => {
        setspCvg(true);
        axios
            .get(`${baseURL}SatuSehat/GetListOrderResep/${sReg}/${env}`, options)
            .then((response) => {
                setspCvg(false);
                console.log('getListOrderResep : ', response);
                if (response.data.result.code === "200") {
                    setlistOrderResep(response.data.result.result.orderList);
                }
                else {
                    setlistOrderResep([]);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
                    });
                }
            })
            .catch((err) => {
                setspCvg(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data! -> ${err}`,
                });
            });
    };

    const getListKeluaranObat = (sReg) => {
        setspCvg(true);
        axios
            .get(`${baseURL}SatuSehat/GetListKeluaranObat/${sReg}/${env}`, options)
            .then((response) => {
                setspCvg(false);
                console.log('getListKeluaranObat : ', response);
                if (response.data.result.code === "200") {
                    setlistObatKeluaran(response.data.result.result);
                }
                else {
                    setlistObatKeluaran([]);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data! -> ${response.data.result.message}, No.Registrasi : ${response.data.result.result}`,
                    });
                }
            })
            .catch((err) => {
                setspCvg(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data! -> ${err}`,
                });
            });
    }

    const getResourceById = (id, rscType) => {
        setspGetRsc(true);
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        // settempA(0);
        let temp = 0;

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit >= 45) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            // settempA(1)
            temp = 1;
        }

        if (temp === 1) {
            let baseUrlSSa = baseUrlSS + `/${rscType}/`;
            console.log('baseUrlSSa : ', baseUrlSSa);
            axios
                .get(`${baseURL}SatuSehat/GetResourceById/${encodeURIComponent(baseUrlSSa)}/${id}/${sstoken}`, options)
                .then((response) => {
                    setspGetRsc(false);
                    console.log('getResourceById : ', response);
                    if (response.data.statusCode === 200) {
                        let objectString = JSON.stringify(response.data.result, null, 2); // Mengubah objek menjadi string JSON dengan indentasi 2 spasi
                        settextResponseById(objectString);
                    }
                    else {
                        settextResponseById();
                        Modal.info({
                            title: "Informasi",
                            content: 'Tidak ditemukan detail Pasien dari SatuSehat.',
                        });
                    }
                })
                .catch((err) => {
                    setspGetRsc(false);
                    settextResponseById();
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! GET Detail Resource SatuSehat! -> ${err}`,
                    });
                });
        }
    }

    const getResourceByIdv2 = async (id, rscType) => {
        setspGetRsc(true);
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        // settempA(0);
        let temp = 0;

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit >= 45) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            // settempA(1)
            temp = 1;
        }

        if (temp === 1) {
            setspCvg(true);
            try {
                let baseUrlSSa = baseUrlSS + `/${rscType}/`;
                const response = await axios.get(`${baseURL}SatuSehat/GetResourceById/${encodeURIComponent(baseUrlSSa)}/${id}/${sstoken}`, options);
                setspCvg(false);

                if (response.data.statusCode === 200) {
                    let data = response.data.result;
                    return data; // Kembalikan nilai data
                } else {
                    return []; // Kembalikan array kosong jika response tidak sukses
                }
            } catch (err) {
                setspCvg(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data! -> ${err}`,
                });
                return null; // Kembalikan null jika terjadi error
            }
        }
    }

    const getRiwayatDx = (sReg) => {
        setspCvg(true);
        axios
            .get(`${baseURL}SatuSehat/GetRiwayatDx/${sReg}`, options)
            .then((response) => {
                setspCvg(false);
                if (response.data.result.code === "200") {
                    let data = response.data.result.result;

                    setlistRiwayatDx(data);
                }
                else {
                    setlistRiwayatDx([]);
                }
            })
            .catch((err) => {
                setspCvg(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data! -> ${err}`,
                });
            });
    }

    const getRiwRscId = async (sReg, sRsc) => {
        setspCvg(true);
        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetRiwayatResourceId/${sReg}/${sRsc}/${env}`,
                options
            );
            setspCvg(false);

            if (response.data.result.code === "200") {
                let data = response.data.result.result;
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getBillPasien = async (sReg) => {
        setspCvg(true);
        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetBilling/${sReg}`,
                options
            );
            setspCvg(false);

            if (response.data.result.code === "200") {
                let data = response.data.result.result;
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getDiagPrimer = async (sReg) => {
        setspCvg(true);

        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetDiagnosaPasienPrimer/${sReg}`,
                options
            );
            setspCvg(false);

            if (response.data.result.code === "200") {
                let data = response.data.result.result;
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getDiagSekunder = async (sReg) => {
        setspCvg(true);

        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetDiagnosaPasienSekunder/${sReg}`,
                options
            );
            setspCvg(false);

            if (response.data.result.code === "200") {
                let data = response.data.result.result;
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getOrderPenunjang = async (sReg) => {
        setspCvg(true);

        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetOrderPenunjang/${sReg}`,
                options
            );
            setspCvg(false);

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getDataPxDummy = async (sReg) => {
        setspCvg(true);

        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetDetailSEPDummy/${sReg}`,
                options
            );
            setspCvg(false);

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                setdataSepDummy(data.result);
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getHasilLabPk = async (sReg) => {
        setspCvg(true);

        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetHasilLabPk/${sReg}`,
                options
            );
            setspCvg(false);

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                // setdataSepDummy(data.result);
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getProsedur = async (sReg) => {
        setspCvg(true);

        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetProcedure/${sReg}`,
                options
            );
            setspCvg(false);

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                // setdataSepDummy(data.result);
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getDxPasien = async (sReg) => {
        setspCvg(true);

        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetDxPasien/${sReg}`,
                options
            );
            setspCvg(false);

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                // setdataSepDummy(data.result);
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getListBatchNo = async () => {
        setspCvg(true);

        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetListBatchNo`,
                options
            );
            setspCvg(false);

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                // setdataSepDummy(data.result);
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const lookupSNOMEDKeluhan = (sCodeGrup) => {
        setspCvg(true);
        axios
            .get(`${baseURL}SatuSehat/LookupSnomedKeluhan/${sCodeGrup}`, options)
            .then((response) => {
                setspCvg(false);
                console.log('lookupSNOMEDKeluhan : ', response);
                if (response.data.result.code === "200") {
                    let list = response.data.result.result;
                    if (sCodeGrup === '1') {
                        setlistSNOMEDKeluhan(list);
                        settempListSnomed(list);
                    }
                    else if (sCodeGrup === '6') {
                        setlistSNDRiwPenySendiri(list);
                        settempListSNDRiwPenySendiri(list);

                    }
                }
                else {
                    if (sCodeGrup === '1') {
                        setlistSNOMEDKeluhan();
                        settempListSnomed();
                    }
                    else if (sCodeGrup === '6') {
                        setlistSNDRiwPenySendiri();
                        settempListSNDRiwPenySendiri();

                    }
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! LOOKUP data! -> ${response.data.result.message}`,
                    });
                }
            })
            .catch((err) => {
                setspCvg(false);
                if (sCodeGrup === '1') {
                    setlistSNOMEDKeluhan();
                    settempListSnomed();
                }
                else if (sCodeGrup === '6') {
                    setlistSNDRiwPenySendiri();
                    settempListSNDRiwPenySendiri();

                }
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! LOOKUP data! -> ${err}`,
                });
            });
    }

    const postResource = (data, resource, rscGroup) => {
        setspCvg(true)
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        settempA(0)

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit >= 45) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            settempA(1)
        }

        if (tempA === 1) {
            axios
                .post(`${baseURL}SatuSehat/PostResource/${sstoken}/${encodeURIComponent(baseUrlSS)}/${resource}`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    setspCvg(false);
                    console.log('postResource response : ', res);

                    let respon = res.data.result.result;
                    console.log('respon : ', respon);

                    if (respon.hasOwnProperty('id')) {
                        Modal.success({
                            title: "Sukses",
                            content: `Berhasil mengirim ${resource} ke SatuSehat.`,
                            onOk: () => {
                                let temp = [];

                                let setentry = {
                                    registrasiId: identitasPx.RegistrasiId,
                                    userId: username,
                                    clientHost: host,
                                    clientIP: ip,
                                    environment: env,
                                    ruangId: ruangId,
                                    id: respon.id,
                                    resourceType: respon.resourceType,
                                    resourceGroup: rscGroup
                                };

                                temp.push(setentry);
                                insertResourceId(temp)
                                // console.log('simpan resourceID : ', updatedEntryData);
                            },
                        });
                    }
                    else {
                        let msg = res.data.result.result;
                        let additionalMessage = JSON.stringify(msg, null, 2);

                        Modal.error({
                            title: "Gagal!",
                            content: (
                                <div>
                                    <p>Gagal! mengirim data ke SatuSehat!</p>
                                    <TextArea rows={15} value={additionalMessage} readOnly />
                                </div>
                            ),
                            onOk: () => {
                                if (msg.resourceType === "OperationOutcome") {
                                    setmdEditJSON(true);
                                    setJSONPost(JSON.stringify(data, null, 2));
                                }
                            },
                        });
                    }
                })
                .catch((err) => {
                    setspCvg(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! Kirim Post ${resource} SatuSehat! -> ${err}`,
                    });
                });
        }
    };

    const putResource = (data, resource, param) => {
        setspCvg(true)
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        settempA(0)

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit >= 45) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            settempA(1)
        }

        if (tempA === 1) {
            axios
                .put(`${baseURL}SatuSehat/PutResource/${sstoken}/${encodeURIComponent(baseUrlSS)}/${resource}/${param}`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    setspCvg(false);
                    console.log('putResource response : ', res);

                    let respon = res.data.result.result;
                    console.log('respon : ', respon);

                    if (respon.hasOwnProperty('id')) {
                        Modal.success({
                            title: "Sukses",
                            content: `Berhasil mengirim ${resource} ke SatuSehat.`,
                            // onOk: () => {
                            //     let temp = [];

                            //     let setentry = {
                            //         registrasiId: identitasPx.RegistrasiId,
                            //         userId: username,
                            //         clientHost: host,
                            //         clientIP: ip,
                            //         environment: env,
                            //         ruangId: ruangId,
                            //         id: respon.id,
                            //         resourceType: respon.resourceType
                            //     };

                            //     temp.push(setentry);
                            //     insertResourceId(temp)
                            //     // console.log('simpan resourceID : ', updatedEntryData);
                            // },
                        });
                    }
                    else {
                        let msg = res.data.result.result;
                        let additionalMessage = JSON.stringify(msg, null, 2);

                        Modal.error({
                            title: "Gagal!",
                            content: (
                                <div>
                                    <p>Gagal! mengirim data ke SatuSehat!</p>
                                    <TextArea rows={15} value={additionalMessage} readOnly />
                                </div>
                            ),
                            // onOk: () => {
                            //     if (msg.resourceType === "OperationOutcome") {
                            //         setmdEditJSON(true);
                            //         setJSONPost(JSON.stringify(data, null, 2));
                            //     }
                            // },
                        });
                    }
                })
                .catch((err) => {
                    setspCvg(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! Kirim Put ${resource} SatuSehat! -> ${err}`,
                    });
                });
        }
    };

    const patchResource = (data, resource, param) => {
        setspCvg(true)
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        settempA(0)

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit >= 45) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            settempA(1)
        }

        if (tempA === 1) {
            axios
                .post(`${baseURL}SatuSehat/PatchResource/${sstoken}/${encodeURIComponent(baseUrlSS)}/${resource}/${param}`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    setspCvg(false);
                    console.log('patchResource response : ', res);

                    let respon = res.data;
                    console.log('respon : ', respon);

                    if (respon.statusCode === 200) {
                        Modal.success({
                            title: "Sukses",
                            content: `Berhasil PATCH ${resource} ke SatuSehat.`,
                        });
                    }
                    else {
                        let msg = res.data.result;
                        let additionalMessage = JSON.stringify(msg, null, 2);

                        Modal.error({
                            title: "Gagal!",
                            content: (
                                <div>
                                    <p>Gagal! patch data ke SatuSehat!</p>
                                    <TextArea rows={15} value={additionalMessage} readOnly />
                                </div>
                            ),
                            // onOk: () => {
                            //     if (msg.resourceType === "OperationOutcome") {
                            //         setmdEditJSON(true);
                            //         setJSONPost(JSON.stringify(data, null, 2));
                            //     }
                            // },
                        });
                    }
                })
                .catch((err) => {
                    setspCvg(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! Kirim Patch ${resource} SatuSehat! -> ${err}`,
                    });
                });
        }
    };

    const kirimBundleV2 = (data, resource, rscGroup) => {
        setspCvg(true)
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        settempA(0)

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit >= 45) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari atau sama dengan 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            settempA(1)
        }

        if (tempA === 1) {
            axios
                .post(`${baseURL}SatuSehat/Bundle/${sstoken}/${encodeURIComponent(baseUrlSS)}`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    setspCvg(false)
                    console.log('kirimBundle response : ', res);

                    if (res.data.result.result.hasOwnProperty('entry')) {
                        setlistResourceId(res.data.result.result.entry)
                        Modal.success({
                            title: "Sukses",
                            content: 'Berhasil mengirim data ke SatuSehat.',
                            onOk: () => {
                                let temp = res.data.result.result.entry;

                                const updatedEntryData = temp.map((entry) => {
                                    entry.registrasiId = identitasPx.RegistrasiId;
                                    entry.userId = username;
                                    entry.clientHost = host;
                                    entry.clientIP = ip;
                                    entry.environment = env;
                                    entry.ruangId = ruangId;
                                    entry.resourceType = resource;
                                    entry.resourceGroup = rscGroup;
                                    return entry;
                                });
                                insertResourceId(updatedEntryData);

                                console.log('kirimBundleV2 : ', updatedEntryData);
                            },
                        });
                    }
                    else {
                        let msg = res.data.result.result;
                        let additionalMessage = JSON.stringify(msg, null, 2);

                        Modal.error({
                            title: "Gagal!",
                            content: (
                                <div>
                                    <p>Gagal! mengirim data ke SatuSehat!</p>
                                    <TextArea rows={15} value={additionalMessage} readOnly />
                                </div>
                            ),
                        });
                    }
                })
                .catch((err) => {
                    setspCvg(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! Kirim Bundle SatuSehat! -> ${err}`,
                    });
                });
        }
    };

    const getEklaim = async (data) => {
        setspCvg(true);

        try {
            const response = await axios.post(`${baseURL}SatuSehat/PostEklaim`, data, {
                headers: options.headers,
            });
            setspCvg(false);
            console.log("getEklaim : ", response);

            if (response.data.statusCode === 200) {
                let data = response.data.result.response.data;
                // setdataSepDummy(data.result);
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getEklaim01 = async (data) => {
        setspCvg(true);

        try {
            const response = await axios.post(`${baseURL}SatuSehat/PostEklaim`, data, {
                headers: options.headers,
            });
            setspCvg(false);
            // console.log("getEklaim : ", response);

            if (response.data.statusCode === 200) {
                let data = response.data.result.data;
                // setdataSepDummy(data.result);
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getEklaim02 = async (data) => {
        setspCvg(true);

        try {
            const response = await axios.post(`${baseURL}SatuSehat/PostEklaim`, data, {
                headers: options.headers,
            });
            setspCvg(false);
            // console.log("getEklaim : ", response);

            if (response.data.statusCode === 200) {
                let data = response;
                // setdataSepDummy(data.result);
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            setspCvg(false);
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const postEklaim = (data, resource, rscGroup) => {
        setspCvg(true);

        axios
            .post(`${baseURL}SatuSehat/PostEklaim`, data, {
                headers: options.headers,
            })
            .then((res) => {
                setspCvg(false);
                console.log('postEklaim response : ', res);

                // let respon = res.data.result.result;
                // console.log('respon : ', respon);

                if (res.data.result.metadata.code === 200) {
                    let additionalMessage = JSON.stringify(res.data.result, null, 2);

                    Modal.success({
                        title: "Sukses",
                        content: (
                            <div>
                                <p>Berhasil mengirim {resource} ke E-Klaim.</p>
                                <TextArea rows={15} value={additionalMessage} readOnly />
                            </div>
                        ),
                        onOk: () => {
                            if (resource !== 'skip') {
                                // console.log('simpan resourceID : ', updatedEntryData);
                                let temp = [];

                                let setentry = {
                                    registrasiId: identitasPx.RegistrasiId,
                                    userId: username,
                                    clientHost: host,
                                    clientIP: ip,
                                    environment: env,
                                    ruangId: ruangId,
                                    id: ssDummySEP.No_Sep,
                                    resourceType: resource,
                                    resourceGroup: rscGroup
                                };

                                temp.push(setentry);
                                insertResourceId(temp);
                            }
                        },
                    });
                }
                else {
                    let msg = res.data.result;
                    console.log('Gagal! ', msg);

                    let additionalMessage = JSON.stringify(msg, null, 2);

                    Modal.error({
                        title: "Gagal!",
                        content: (
                            <div>
                                <p>Gagal! mengirim data ke E-Klaim!</p>
                                <TextArea rows={15} value={additionalMessage} readOnly />
                            </div>
                        )
                        // onOk: () => {
                        //     if (msg.resourceType === "OperationOutcome") {
                        //         setmdEditJSON(true);
                        //         setJSONPost(JSON.stringify(data, null, 2));
                        //     }
                        // },
                    });
                }
            })
            .catch((err) => {
                setspCvg(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! Kirim E-Klaim SatuSehat! -> ${err}`,
                });
            });
    };

    return (
        <SatuSehatEncounterContext.Provider
            value={{
                env,
                usr,
                username, setusername,
                sstoken, setsstoken,
                ihsRS, setihsRS,
                listRuang, setlistRuang,
                gedung, setgedung,
                listPasien, setlistPasien,
                ruangId, setruangId,
                tglPelayanan, settglPelayanan,
                // formKirim
                uuidEncounter, setuuidEncounter,
                regId, setregId,
                pasienId, setpasienId,
                namaPasien, setnamaPasien,
                nikPasien, setnikPasien,
                alamat, setalamat,
                ihsPasien, setihsPasien,
                jenkelPasien, setjenkelPasien,
                tglLahirPasien, settglLahirPasien,
                namaDokter, setnamaDokter,
                ihsPracticioner, setihsPracticioner,
                mulaiPelayanan, setmulaiPelayanan,
                selesaiPelayanan, setselesaiPelayanan,
                namaRuang, setnamaRuang,
                ihsRuang, setihsRuang,
                dcPlanning, setdcPlanning,
                pendStart, setpendStart,
                pendEnd, setpendEnd,
                pmrStart, setpmrStart,
                pmrEnd, setpmrEnd,
                pulangStart, setpulangStart,
                pulangEnd, setpulangEnd,
                diagnosis, setdiagnosis,
                // observation
                nadi, setnadi,
                respRate, setrespRate,
                sistol, setsistol,
                diastol, setdiastol,
                suhu, setsuhu,
                jamTdVital, setjamTdVital,
                // procedure
                SnProcedure, setSnProcedure,
                procedure, setprocedure,
                // composition
                composition, setcomposition,
                // medication
                medication, setmedication,
                medValid, setmedValid,
                waktuOrderResep, setwaktuOrderResep,
                waktuValidResep, setwaktuValidResep,
                // service order
                serviceRequest, setserviceRequest,
                // diagReport
                diagReport, setdiagReport,
                chkBtaPositif, setchkBtaPositif,
                // allergi
                allergi, setallergi,
                chkAllergi, setchkAllergi,
                // clinic imp
                clinicImp, setclinicImp,
                chkClinicImp, setchkClinicImp,
                // rencana tindak lanjut
                rencanaTL, setrencanaTL,
                chkRencanaTL, setchkRencanaTL,
                // kuisioner
                chkKuisioner, setchkKuisioner,
                // notemed
                chkNoteMed, setchkNoteMed,
                // form detail ihs pasien
                ihstgllahir, setihstgllahir,
                ihsalamat, setihsalamat,
                ihsjenkel, setihsjenkel,
                ihsihsnumber, setihsihsnumber,
                ihsnik, setihsnik,
                ihslastupdate, setihslastupdate,
                ihsnama, setihsnama,
                // func
                getListRuang,
                getListPasien,
                getDetailKirim,
                getIdentPx,
                rstDetailKirim,
                SatuSehatGetToken,
                getIhsPasien,
                getRiwRscId,
                insertIhsPasien,
                kirimBundle,
                kirimTele,
                // notifikasi
                tempNotif, settempNotif,
                // md
                mdIhsPasien, setmdIhsPasien,
                mdDetailKirim, setmdDetailKirim,
                mdInfoUpdate, setmdInfoUpdate,
                mddetailKirimv2, setmddetailKirimv2,
                // sp
                spTbPasien, setspTbPasien,
                spDetailKirim, setspDetailKirim,

                // ===== jkn e-klaim bpjs =====
                identitasPx, setidentitasPx,
                idOrdBPJS, setidOrdBPJS,
                paramCoverage, setparamCoverage,
                paramEncounter, setparamEncounter,
                coverageId, setcoverageId,
                JSONPost, setJSONPost,
                accountId, setaccountId,
                keluhanUtama, setkeluhanUtama,
                waktuPelayanan, setwaktuPelayanan,
                rcsIdKel1, setrcsIdKel1,
                rscIdKel2, setrscIdKel2,
                textResponseById, settextResponseById,
                dataSepDummy, setdataSepDummy,
                ssDummySEP, setssDummySEP,

                listSNOMEDKeluhan, setlistSNOMEDKeluhan,
                listSNDRiwPenySendiri, setlistSNDRiwPenySendiri,
                tempListSnomed, settempListSnomed,
                tempListSNDRiwPenySendiri, settempListSNDRiwPenySendiri,
                listRiwayatDx, setlistRiwayatDx,
                listOrderResep, setlistOrderResep,
                listObatKeluaran, setlistObatKeluaran,

                tabKirimJKM, settabKirimJKM,
                tadDataKlnis, settadDataKlnis,

                getParamCoverage,
                getParamEncounter,
                getAccountId,
                getKeluhan,
                getResourceById,
                getRiwayatDx,
                getBillPasien,
                getListOrderResep,
                getListKeluaranObat,
                getResourceByIdv2,
                getDiagPrimer,
                getDiagSekunder,
                getOrderPenunjang,
                getDataPxDummy,
                getHasilLabPk,
                getProsedur,
                getDxPasien,
                getEklaim,
                getEklaim01,
                getEklaim02,
                getListBatchNo,
                lookupSNOMEDKeluhan,
                postResource,
                putResource,
                patchResource,
                kirimBundleV2,
                postEklaim,

                spIdentPx, setspIdentPx,
                spCvg, setspCvg,
                spGetRsc, setspGetRsc,

                mdEditJSON, setmdEditJSON,
                msRscdetail, setmsRscdetail,
                mdIhsPasienv2, setmdIhsPasienv2,

                // dummy data
                pxDummy,
                practicionerDummy,
            }}>
            {props.children}
        </SatuSehatEncounterContext.Provider>
    )
}

export default SatuSehatEncounterContextProvider