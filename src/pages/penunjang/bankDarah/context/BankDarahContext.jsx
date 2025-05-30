import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../../rawatjalan/context';
import axios from 'axios';
import { message, Modal } from 'antd';
import dayjs from 'dayjs';

export const BankDarahContext = createContext();

const BankDarahContextProvider = (props) => {
    const { token, namauser } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const ip = sessionStorage.getItem("IP");
    const host = sessionStorage.getItem("Host");
    const username = sessionStorage.getItem("userId");
    const usr = sessionStorage.getItem("user");
    const usera = sessionStorage.getItem("authId");
    const endpoint = sessionStorage.getItem("apiPenunjang");

    const [ruang, setruang] = useState([]);
    const [ruangId, setruangId] = useState();
    const [listPasien, setlistPasien] = useState([]);
    const [tabOrder, settabOrder] = useState('1');
    const [listDokter, setlistDokter] = useState([]);
    const [listOrderNonValid, setlistOrderNonValid] = useState([]);
    const [listOrderValid, setlistOrderValid] = useState([]);
    const [listDiagnosa, setlistDiagnosa] = useState([]);
    const [RiwGolDarah, setRiwGolDarah] = useState([]);
    const [riwGolDaLabPK, setriwGolDaLabPK] = useState([]);
    const [listHasilLab, setlistHasilLab] = useState([]);
    const [listDarahSiap, setlistDarahSiap] = useState([]);
    const [listAdvice, setlistAdvice] = useState([]);
    const [listRiwReaksi, setlistRiwReaksi] = useState([]);
    const [listNonValid, setlistNonValid] = useState([]);
    const [listValid, setlistValid] = useState([]);
    const [listTerlayani, setlistTerlayani] = useState([]);
    const [listDrhSiapRuang, setlistDrhSiapRuang] = useState([]);
    const [listNamaBrg, setlistNamaBrg] = useState([]);
    const [qtyTotal, setqtyTotal] = useState(0);
    const [kdBarang, setkdBarang] = useState();
    const [namaBarang, setnamaBarang] = useState();
    const [dtPasien, setdtPasien] = useState([]);
    const [dtOrderDarah, setdtOrderDarah] = useState([]);
    // form order darah
    const [noOrder, setnoOrder] = useState();
    const [unitTujuan, setunitTujuan] = useState();
    const [dxOrder, setdxOrder] = useState();
    const [hb, sethb] = useState();
    const [trombo, settrombo] = useState();
    const [golDarahPx, setgolDarahPx] = useState();
    const [golDarahPermintaan, setgolDarahPermintaan] = useState();
    const [ketBedaGolDarah, setketBedaGolDarah] = useState();
    const [volSample, setvolSample] = useState();
    const [kondSample, setkondSample] = useState();
    const [indTrans, setindTrans] = useState();
    const [namaDr, setnamaDr] = useState();
    const [jnsDarah, setjnsDarah] = useState();
    const [jmlKantong, setjmlKantong] = useState();
    const [listPermintaan, setlistPermintaan] = useState([]);
    const [userOrder, setuserOrder] = useState(username);
    const [ipClient, setipClient] = useState(ip);
    const [hostClient, sethostClient] = useState(host);
    // spin
    const [spTbPasien, setspTbPasien] = useState(false);
    const [spDtPasien, setspDtPasien] = useState(false);
    const [spNoOrder, setspNoOrder] = useState(false);
    const [spTbOrder, setspTbOrder] = useState(false);
    const [spSimpanOrder, setspSimpanOrder] = useState(false);
    const [spRiwGolDarah, setspRiwGolDarah] = useState(false);
    const [spHasilLab, setspHasilLab] = useState(false);
    const [spTbKantongSiap, setspTbKantongSiap] = useState(false);
    const [spJawabAdvice, setspJawabAdvice] = useState(false);
    const [spTbRiwReaksi, setspTbRiwReaksi] = useState(false);
    const [spTbInfoRuang, setspTbInfoRuang] = useState(false);
    // md
    const [mdTambahOrder, setmdTambahOrder] = useState(false);
    const [mdDetailNonValid, setmdDetailNonValid] = useState(false);
    const [mdJawabAdvice, setmdJawabAdvice] = useState(false);
    const [mdKetRuangan, setmdKetRuangan] = useState(false);
    const [mdInfoUpdate, setmdInfoUpdate] = useState(false);
    // info ruangan
    const [tglInfo, settglInfo] = useState(dayjs());


    // form catatan transfusi darah
    const [InsDokter, setInsDokter] = useState();
    const [tglTransfusi, settglTransfusi] = useState(dayjs());
    const [dxPasien, setdxPasien] = useState();
    const [golDarah, setgolDarah] = useState();
    const [pmrKantong, setpmrKantong] = useState();
    const [preMedikasi, setpreMedikasi] = useState();
    const [dpjp, setdpjp] = useState();
    const [noKtg, setnoKtg] = useState();
    const [hslCM, sethslCM] = useState([]);
    const [tglExp, settglExp] = useState(null);
    const [jnsKomp, setjnsKomp] = useState();
    const [volume, setvolume] = useState();
    const [wktUTD, setwktUTD] = useState(dayjs());
    const [wktDiterima, setwktDiterima] = useState(dayjs());
    const [identPasien, setidentPasien] = useState();
    const [identKtg, setidentKtg] = useState();
    const [keadaanKtg, setkeadaanKtg] = useState();
    const [wktMulai, setwktMulai] = useState(dayjs());
    const [wktSelesai, setwktSelesai] = useState(dayjs());
    const [reaksiTf, setreaksiTf] = useState();
    const [ptg1, setptg1] = useState();
    const [ptg2, setptg2] = useState();
    const [tempDtCrossmatch, settempDtCrossmatch] = useState();
    const [listObs, setlistObs] = useState([]);
    const [spCatatan, setspCatatan] = useState(false);
    const [mdPelaksanaan, setmdPelaksanaan] = useState(false);
    const [mdObs, setmdObs] = useState(false);
    const [tabCatatan, settabCatatan] = useState('1');


    // ===== PELAYANAN BANK DARAH =====
    const [ruangIdValid, setruangIdValid] = useState();
    const [tabNo, settabNo] = useState(1);
    const [tglOrder, settglOrder] = useState(dayjs());
    const [ktgOrder, setktgOrder] = useState("0");
    const [listOrder, setlistOrder] = useState([]);
    const [daftarPasien, setdaftarPasien] = useState([]);
    const [drOrder, setdrOrder] = useState();
    const [dtOrder, setdtOrder] = useState([]);
    const [kesesuaianIdentitas, setkesesuaianIdentitas] = useState();
    const [ketkesesuaianIdentitas, setketkesesuaianIdentitas] = useState();
    const [volSampel, setvolSampel] = useState();
    const [ketVolSampel, setketVolSampel] = useState();
    const [kondSampel, setkondSampel] = useState();
    const [ketKondSampel, setketKondSampel] = useState();
    const [jnsDarahJml, setjnsDarahJml] = useState();
    const [ketJnsDarahJml, setketJnsDarahJml] = useState();
    const [tglPenerimaan, settglPenerimaan] = useState(dayjs());
    const [ptgPenerima, setptgPenerima] = useState();
    const [userValid, setuserValid] = useState(username);
    const [user, setuser] = useState(usera);
    // sp
    const [spListOrder, setspListOrder] = useState(false);
    const [spDetailOrder, setspDetailOrder] = useState(false);
    const [spValid, setspValid] = useState(false);
    const [spTmbahHasil, setspTmbahHasil] = useState(false);
    // form tab CrossMatch
    const [tempNoPmr, settempNoPmr] = useState();
    const [hslPmr, sethslPmr] = useState([]);
    const [riwHslPmr, setriwHslPmr] = useState([]);
    const [cmMetode, setcmMetode] = useState();
    const [listCrossMatch, setlistCrossMatch] = useState([]);
    const [spNoPmr, setspNoPmr] = useState(false);
    const [spCmMetode, setspCmMetode] = useState(false);
    const [spAdvice, setspAdvice] = useState(false);
    const [mdPmrGolDarah, setmdPmrGolDarah] = useState(false);
    const [mdUjiSerasi, setmdUjiSerasi] = useState(false);
    const [mdAdvice, setmdAdvice] = useState(false);
    // form penyerahan
    const [listKirim, setlistKirim] = useState([]);
    const [listHubKlg, setlistHubKlg] = useState([]);
    const [tglKirim, settglKirim] = useState(dayjs());
    const [noKtgKirim, setnoKtgKirim] = useState();
    const [namaPenerima, setnamaPenerima] = useState();
    const [umurPenerima, setumurPenerima] = useState();
    const [alamatPenerima, setalamatPenerima] = useState();
    const [ruangPenerima, setruangPenerima] = useState();
    const [golDarahCek, setgolDarahCek] = useState();
    const [ptgKirim, setptgKirim] = useState();
    const [hubklgPenerima, sethubklgPenerima] = useState();
    const [noHpPenerima, setnoHpPenerima] = useState();
    const [mdKirimDarah, setmdKirimDarah] = useState(false);
    const [spTbDaftarKirim, setspTbDaftarKirim] = useState(false);
    const [spTerlayani, setspTerlayani] = useState(false);
    // informasi bank darah
    const [listPmrCmRuangan, setlistPmrCm] = useState([]);
    const [listDarahSiapRuangan, setlistDarahSiapRuangan] = useState([]);
    const [listDarahTerkirimRuangan, setlistDarahTerkirimRuangan] = useState([]);
    const [listDarahPending, setlistDarahPending] = useState([]);
    const [listRespTime, setlistRespTime] = useState([]);
    const [tabInformasi, settabInformasi] = useState('1');
    const [spTbPmrCmRuangan, setspTbPmrCmRuangan] = useState(false);
    const [spTbDarahSiapRuangan, setspTbDarahSiapRuangan] = useState(false);
    const [spTbDarahTerkirimRuangan, setspTbDarahTerkirimRuangan] = useState(false);
    const [spTbDarahPending, setspTbDarahPending] = useState(false);
    const [spTbRespTime, setspTbRespTime] = useState(false);

    useEffect(() => {
        // settingan info update otomatis
        const updateDate = '2025-02-03';
        const today = dayjs();
        // const today = dayjs('2024-09-06');
        const daysDifference = today.diff(dayjs(updateDate), 'day');

        if (daysDifference < 30) {
            setmdInfoUpdate(true);
        };
    }, []);

    // HARD CODE
    const ktgjnsDarah = [
        {
            id: 'WB',
            desk: 'Darah Lengkap/ Whole Blood',
        },
        {
            id: 'PRC',
            desk: 'Darah Merah Pekat/ Packed Red Cell',
        },
        {
            id: 'TC',
            desk: 'Trombosit Pekat/ Thrombocyt Concentrate',
        },
        {
            id: 'BC',
            desk: 'Lekosit Pekat/ Buffy Coat',
        },
        {
            id: 'FFP',
            desk: 'Plasma Segar Beku/ Fiesh Frozen Plasma',
        },
        {
            id: 'LP',
            desk: 'Plasma Donor Tunggal/ Liquid Plasma',
        },
        {
            id: 'CRP',
            desk: 'Kriopresipitat/ Cryoprecipitate',
        },
        {
            id: 'PRCL',
            desk: 'PRC + Leucodepleted',
        },
        {
            id: 'TCA',
            desk: 'Thrombocyt Concentrate Apheresis',
        },
    ];

    const ktgJnsKantong = [
        {
            id: 1,
            desk: 'SINGLE',
        },
        {
            id: 2,
            desk: 'DOUBLE',
        },
        {
            id: 3,
            desk: 'TRIPLE',
        },
        {
            id: 4,
            desk: 'QUADRUPLE',
        },
    ];

    const lookUpPerawat = async () => {
        try {
            const response = await axios.get(
                `${endpoint}/MstDokterSpesialisDetail/LookupPerawat/%20`,
                options
            );

            if (response.data.statusCode === 200) {
                if (response.data.result.length === 0) {
                    // setOptPerawat([]);
                    message.warning("Option Perawat kosong! Mohon periksa kembali.");
                    return []; // Kembalikan array kosong jika data kosong
                } else {
                    // setOptPerawat(response.data.result);
                    return response.data.result; // Kembalikan data jika berhasil
                }
            } else {
                // setOptPerawat([]);
                message.error("Option Perawat gagal di Load!");
                return null; // Kembalikan null jika statusCode bukan 200
            }
        } catch (err) {
            // setOptPerawat([]);
            message.error(
                `Error melakukan proses ambil data List Order Kemoterapi! -> ${err}`
            );
            return null; // Kembalikan null jika terjadi error
        }
    };


    // ========== ORDER BANK DARAH ==========

    const getRuangUser = (data) => {
        setspTbPasien(true);
        axios
            .get(`${endpoint}/SisJwt/RuangByUser/${usr}/%20/${data}/%20`, options)
            .then((res) => {
                console.log('getRuangUser : ', res);
                setspTbPasien(false);
                if (res.data.statusCode === 200) {
                    setruang(res.data.result);
                    // cariPasienRuangRI(res.data.result[0].ruangId);
                    // setruangRi(res.data.result[0].ruangId);
                    // console.log("dataruang", res.data.result);
                } else {
                    setruang([]);
                }
            })
            .catch((err) => {
                setruang([]);
                setspTbPasien(false);
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil data Ruang! -> ${err}`,
                });
            });
    }

    const getListDokter = () => {
        axios
            .get(`${endpoint}/mstDokter/Lookup/Dr/1/1000`, options)
            .then((res) => {
                console.log('getListDokter : ', res);
                if (res.data.statusCode === 200) {
                    setlistDokter(res.data.result);
                } else {
                    setlistDokter([]);
                }
            })
            .catch((err) => {
                setlistDokter([]);
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses Daftar Nama Dokter! -> ${err}`,
                });
            });
    }

    const getListHubKel = () => {
        axios
            .get(`${endpoint}/MstHubungan/Lookup/%20/1/10`, options)
            .then((res) => {
                console.log('getListHubKel : ', res);
                if (res.data.statusCode === 200) {
                    setlistHubKlg(res.data.result);
                } else {
                    setlistHubKlg([]);
                }
            })
            .catch((err) => {
                setlistHubKlg([]);
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Daftar Hubungan Keluarga! -> ${err}`,
                });
            });
    }

    const getPasien = (ruang) => {
        setspTbPasien(true)
        axios
            .get(
                `${endpoint}/EmrPasienAktif/LookupByRuangBySMF/%20/${ruang}/${username}`,
                options
            )
            .then((res) => {
                console.log('getPasien : ', res);
                setspTbPasien(false)
                if (res.data.statusCode === 200) {
                    setlistPasien(
                        res.data.result.sort((a, b) =>
                            a.namaPasien.localeCompare(b.namaPasien)
                        )
                    );
                } else {
                    setlistPasien([]);
                }
            })
            .catch((err) => {
                setspTbPasien(false)
                setlistPasien([]);
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil data Ruang! -> ${err}`,
                });
            });
    };

    const getPasienPenunjang = (ruang, tgl) => {
        setspTbPasien(true)
        axios
            .get(
                `${endpoint}/EmrBankDarah/GetListPasienPenunjang/${ruang}/${tgl}`,
                options
            )
            .then((res) => {
                console.log('getPasienPenunjang : ', res);
                setspTbPasien(false)
                if (res.data.statusCode === 200) {
                    setlistPasien(res.data.result);
                } else {
                    setlistPasien([]);
                }
            })
            .catch((err) => {
                setspTbPasien(false)
                setlistPasien([]);
                Modal.error({
                    title: "Error",
                    content: `Error ambil data! -> ${err}`,
                });
            });
    };

    const getDetailPasien = (sNoReg) => {
        setspDtPasien(true)
        axios
            .get(
                `${endpoint}/EmrBankDarah/GetDetailPasien/${sNoReg}`,
                options
            )
            .then((res) => {
                console.log('getDetailPasien : ', res);
                setspDtPasien(false)
                if (res.data.statusCode === 200) {
                    setdtPasien(res.data.result)
                    getListOrder(sNoReg) // mengambil list order bank darah
                } else {
                    setdtPasien([])
                }
            })
            .catch((err) => {
                setspDtPasien(false)
                setdtPasien([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil data Pasien! -> ${err}`,
                });
            });
    };

    const rstFormOrder = () => {
        setnoOrder()
        setunitTujuan()
        setdxOrder()
        sethb()
        settrombo()
        setgolDarahPx()
        setgolDarahPermintaan()
        setketBedaGolDarah()
        setvolSample()
        setkondSample()
        setindTrans()
        setnamaDr()
        setlistPermintaan([])
    }

    const getNoOrder = () => {
        setspNoOrder(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetNoOrder`, options)
            .then((res) => {
                console.log('getNoOrder : ', res);
                setspNoOrder(false)
                if (res.data.statusCode === 200) {
                    setnoOrder(res.data.result);
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil data No Order Bank Darah! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                // setruang([]);
                setspNoOrder(false)
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil No Order! -> ${err}`,
                });
            });
    }

    const getListOrder = (regId) => {
        setspTbOrder(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetListOrder/${regId}`, options)
            .then((res) => {
                console.log('getListOrder : ', res);
                setspTbOrder(false)
                if (res.data.statusCode === 200) {
                    if (res.data.result.nonValid.length !== 0) {
                        setlistOrderNonValid(res.data.result.nonValid)
                    }
                    else (
                        setlistOrderNonValid([])
                    )

                    if (res.data.result.valid.length !== 0) {
                        setlistOrderValid(res.data.result.valid)
                    }
                    else (
                        setlistOrderValid([])
                    )

                } else {
                    setlistOrderNonValid([])
                    setlistOrderValid([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil List Order Bank Darah! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbOrder(false)
                setlistOrderNonValid([])
                setlistOrderValid([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil List Order Bank Darah! -> ${err}`,
                });
            });
    }

    const getDetailOrderOnOrder = (sNoOrder) => {
        setspTbOrder(true)
        axios
            .get(
                `${endpoint}/EmrBankDarah/GetDetailOrder/${sNoOrder}`,
                options
            )
            .then((res) => {
                // console.log('getDetailOrderOnOrder : ', res);
                setspTbOrder(false)
                if (res.data.statusCode === 200) {
                    setmdDetailNonValid(true)
                    setdtOrderDarah(res.data.result)
                } else {
                    setdtOrderDarah([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal mengambil Detail Order Bank Darah! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbOrder(false)
                setdtOrderDarah([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Detail Order Bank Darah! -> ${err}`,
                });
            });
    };

    const getDetailOrderOnOrderAsync = async (sNoOrder) => {
        setspTbOrder(true); // Set loading state ke true

        try {
            const res = await axios.get(
                `${endpoint}/EmrBankDarah/GetDetailOrder/${sNoOrder}`,
                options
            );
            // console.log("getDetailOrderOnOrder : ", res);

            setspTbOrder(false); // Set loading state ke false
            if (res.data.statusCode === 200) {
                // setmdDetailNonValid(true);
                // setdtOrderDarah(res.data.result);
                return res.data.result; // Kembalikan hasil jika sukses
            } else {
                // setdtOrderDarah([]);
                Modal.error({
                    title: "Gagal!",
                    content: `Gagal mengambil Detail Order Bank Darah! -> ${res.data.result}`,
                });
                return null; // Kembalikan null jika gagal
            }
        } catch (err) {
            setspTbOrder(false); // Set loading state ke false
            // setdtOrderDarah([]);
            Modal.error({
                title: "Error",
                content: `Error melakukan proses ambil Detail Order Bank Darah! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };


    const getDiagnosaPx = (sNoReg) => {
        setspRiwGolDarah(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetDiagnosaPx/${sNoReg}`, options)
            .then((res) => {
                console.log('getDiagnosaPx : ', res);
                setspRiwGolDarah(false)
                if (res.data.statusCode === 200) {
                    if (res.data.result.length !== 0) {
                        setlistDiagnosa(res.data.result)
                    }
                    else (
                        setlistDiagnosa([])
                    )
                } else {
                    setlistDiagnosa([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil Diagnosa! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspRiwGolDarah(false)
                setlistDiagnosa([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Diagnosa! -> ${err}`,
                });
            });
    }

    const getRiwayatGolDaraf = (sNoReg) => {
        setspRiwGolDarah(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetRiwGolDarah/${sNoReg}`, options)
            .then((res) => {
                console.log('getRiwayatGolDaraf : ', res);
                setspRiwGolDarah(false)
                if (res.data.statusCode === 200) {
                    if (res.data.result.length !== 0) {
                        setRiwGolDarah(res.data.result)
                    }
                    else (
                        setRiwGolDarah([])
                    )
                } else {
                    setRiwGolDarah([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil Riwayat Golongan Darah! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspRiwGolDarah(false)
                setRiwGolDarah([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Riwayat Golongan Darah! -> ${err}`,
                });
            });
    }

    const getRiwayatGolDarahLabPK = (sPasienId) => {
        setspRiwGolDarah(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetRiwGolDarahLabPK/${sPasienId}`, options)
            .then((res) => {
                console.log('getRiwayatGolDarahLabPK : ', res);
                setspRiwGolDarah(false)
                if (res.data.statusCode === 200) {
                    if (res.data.result.length !== 0) {
                        setriwGolDaLabPK(res.data.result)
                    }
                    else (
                        setriwGolDaLabPK([])
                    )
                } else {
                    setriwGolDaLabPK([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil Riwayat Golongan Darah Lab PK! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspRiwGolDarah(false)
                setriwGolDaLabPK([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Riwayat Golongan Darah Lab PK! -> ${err}`,
                });
            });
    }

    const getHasilLabHbTrombosit = (sNoreg) => {
        setspHasilLab(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetHBTrombosit/${sNoreg}`, options)
            .then((res) => {
                console.log('getHasilLabHbTrombosit : ', res);
                setspHasilLab(false)
                if (res.data.statusCode === 200) {
                    if (res.data.result.length !== 0) {
                        setlistHasilLab(res.data.result)
                    }
                    else {
                        setlistHasilLab([])
                        Modal.info({
                            title: "Informasi!",
                            content: 'Tidak ada Hasil Lab PK!',
                        });
                    }
                } else {
                    setlistHasilLab([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil Hasil Lab PK! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspHasilLab(false)
                setlistHasilLab([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Hasil Lab PK! -> ${err}`,
                });
            });
    }

    const getKantongDarahSiap = (sNoReg, stsKirim) => {
        setspTbKantongSiap(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetKantongDarah/${sNoReg}/${stsKirim}`, options)
            .then((res) => {
                console.log('getKantongDarahSiap : ', res);
                setspTbKantongSiap(false)
                if (res.data.statusCode === 200) {
                    if (res.data.result.length !== 0) {
                        setlistDarahSiap(res.data.result)
                    }
                    else {
                        setlistDarahSiap([])
                    }
                } else {
                    setlistDarahSiap([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil Daftar Kantong! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbKantongSiap(false)
                setlistDarahSiap([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Daftar Kantong! -> ${err}`,
                });
            });
    }

    const getListAdvice = (sNoreg) => {
        setspTbKantongSiap(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetListAdvice/${sNoreg}`, options)
            .then((res) => {
                console.log('getListAdvice : ', res);
                setspTbKantongSiap(false)
                if (res.data.statusCode === 200) {
                    setlistAdvice(res.data.result)
                } else {
                    setlistAdvice([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil Daftar Advice! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbKantongSiap(false)
                setlistAdvice([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Daftar Advice! -> ${err}`,
                });
            });
    }

    const getRiwReaksi = (sPasienId) => {
        setspTbRiwReaksi(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetRiwReaksi/${sPasienId}`, options)
            .then((res) => {
                console.log('getRiwReaksi : ', res);
                setspTbRiwReaksi(false)
                if (res.data.statusCode === 200) {
                    if (res.data.result.length !== 0) {
                        setlistRiwReaksi(res.data.result)
                    }
                    else {
                        setlistRiwReaksi([])
                    }
                } else {
                    setlistRiwReaksi([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil Riwayat reaksi transfusi! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbRiwReaksi(false)
                setlistRiwReaksi([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Riwayat reaksi transfusi! -> ${err}`,
                });
            });
    }

    const getInfoRuangan = (sRuangId, sTgl) => {
        setspTbInfoRuang(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetInfoRuangan/${sRuangId}/${sTgl}`, options)
            .then((res) => {
                console.log('getInfoRuangan : ', res);
                setspTbInfoRuang(false)
                if (res.data.statusCode === 200) {
                    if (res.data.result.NonValid.length !== 0) {
                        setlistNonValid(res.data.result.NonValid)
                    }
                    else {
                        setlistNonValid([])
                    }

                    if (res.data.result.Valid.length !== 0) {
                        setlistValid(res.data.result.Valid)
                    }
                    else {
                        setlistValid([])
                    }

                    if (res.data.result.Terlayani.length !== 0) {
                        setlistTerlayani(res.data.result.Terlayani)
                    }
                    else {
                        setlistTerlayani([])
                    }

                    if (res.data.result.DarahSiap.length !== 0) {
                        setlistDrhSiapRuang(res.data.result.DarahSiap)
                    }
                    else {
                        setlistDrhSiapRuang([])
                    }
                } else {
                    setlistNonValid([])
                    setlistValid([])
                    setlistTerlayani([])
                    setlistDrhSiapRuang([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil Informasi Ruangan! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbInfoRuang(false)
                setlistNonValid([])
                setlistValid([])
                setlistTerlayani([])
                setlistDrhSiapRuang([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses Info Ruangan! -> ${err}`,
                });
            });
    }

    const getListNamaBarang = (sUnit) => {
        // setspTabelPasien(true);
        axios
            .get(
                `${endpoint}/EmrBankDarah/getNamaBarang/${sUnit}`,
                options
            )
            .then((response) => {
                console.log("getListNamaBarang : ", response.data);
                if (response.data.statusCode === 200) {
                    if (response.data.result.length === 0) {
                        setlistNamaBrg([]);
                        // setspTabelPasien(false);
                        Modal.info({
                            title: "Informasi",
                            content: "Tidak ada Barang ditemukan.",
                        });
                    } else {
                        // console.log("getListOrder : ", response.data.result);
                        setlistNamaBrg(response.data.result);
                        // setmdListOrder(true)
                    }
                } else {
                    setlistNamaBrg([]);
                    // setspTabelPasien(false);
                    Modal.error({
                        title: "Gagal!",
                        content: 'Gagal melakukan proses ambil data Barang!',
                    });
                }
            })
            .catch((err) => {
                setlistNamaBrg([]);
                // setspTabelPasien(false);
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil data Barang! -> ${err}`,
                });
            });
    };

    const simpanOrder = (data) => {
        setspSimpanOrder(true)
        axios
            .post(`${endpoint}/EmrBankDarah`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('simpanOrder : ', res);
                setspSimpanOrder(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan Order Bank Darah.",
                        onOk: () => {
                            getListOrder(data.registrasiId);
                            setmdTambahOrder(false)
                        },
                    });
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Disimpan Order Bank Darah! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspSimpanOrder(false)
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Disimpan Order Bank Darah! -> ${err}`,
                });
            });
    }

    const hapusOrder = (data) => {
        setspTbOrder(true)
        axios
            .post(`${endpoint}/EmrBankDarah/DeleteOrderBD`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('hapusOrder : ', res);
                setspTbOrder(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Hapus Order Bank Darah.",
                        onOk: () => {
                            getListOrder(dtPasien.RegistrasiId);
                        },
                    });
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Hapus Order Bank Darah! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTbOrder(false)
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Hapus Order Bank Darah! -> ${err}`,
                });
            });
    }

    const simpanReaksi = (data) => {
        setspTbKantongSiap(true)
        axios
            .post(`${endpoint}/EmrBankDarah/InsertReaksiTransfusi`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('simpanReaksi : ', res);
                setspTbKantongSiap(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan Reaksi Transfusi.",
                        onOk: () => {
                            getKantongDarahSiap(dtPasien.RegistrasiId, '1');
                            setmdPelaksanaan(false);
                        },
                    });
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Disimpan Order Bank Darah! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTbKantongSiap(false)
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Disimpan Reaksi Transfusi! -> ${err}`,
                });
            });
    }

    const insertJwbAdvice = (data) => {
        setspJawabAdvice(true)
        axios
            .post(`${endpoint}/EmrBankDarah/InsertJwbAdvice`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('insertJwbAdvice : ', res);
                setspJawabAdvice(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan Jawaban Advice.",
                        onOk: () => {
                            getListAdvice(dtPasien.RegistrasiId)
                            setmdJawabAdvice(false)
                        },
                    });
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Disimpan Jawaban Advice! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspJawabAdvice(false)
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Disimpan Jawaban Advice! -> ${err}`,
                });
            });
    }

    const insertKetRuangan = (data) => {
        setspTbKantongSiap(true)
        axios
            .post(`${endpoint}/EmrBankDarah/InsertKetRuangan`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('insertKetRuangan : ', res);
                setspTbKantongSiap(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan Informasi Pengambilan.",
                        onOk: () => {
                            getKantongDarahSiap(dtPasien.RegistrasiId, '0')
                            setmdKetRuangan(false)
                        },
                    });
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Disimpan Informasi Pengambilan! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTbKantongSiap(false)
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Disimpan Informasi Pengambilan! -> ${err}`,
                });
            });
    }

    // ========== ========== ========== ========== ==========

    // ========== PELAYANAN BANK DARAH ==========
    const getListOrderbyDate = (ruangId, tglOrder, ktgOrder) => {
        setspListOrder(true);
        axios
            .get(`${endpoint}/EmrBankDarah/GetListOrderbyDate/${ruangId}/${tglOrder}/${ktgOrder}`, options)
            .then((res) => {
                console.log('getListOrderbyDate : ', res);
                setspListOrder(false);
                if (res.data.statusCode === 200) {
                    if (res.data.result.length !== 0) {
                        setlistOrder(res.data.result);
                        setdaftarPasien(res.data.result);
                    }
                    else {
                        setlistOrder([]);
                        setdaftarPasien([]);
                    }
                } else {
                    setlistOrder([]);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil Daftar Order Bank Darah! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspListOrder(false);
                setlistOrder([]);
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Daftar Order Bank Darah! -> ${err}`,
                });
            });
    }

    const getDetailPasienPelayanan = (sNoreg) => {
        rstPenerimaanSample()
        setspDtPasien(true)
        axios
            .get(
                `${endpoint}/EmrBankDarah/GetDetailPasien/${sNoreg}`,
                options
            )
            .then((res) => {
                console.log('getDetailPasienPelayanan : ', res);
                setspDtPasien(false)
                if (res.data.statusCode === 200) {
                    setdtPasien(res.data.result)
                } else {
                    setdtPasien([])
                }
            })
            .catch((err) => {
                setspDtPasien(false)
                setdtPasien([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil data Pasien! -> ${err}`,
                });
            });
    }

    const getDetailOrder = (sNoOrder) => {
        setspDetailOrder(true)
        setspValid(true)
        axios
            .get(
                `${endpoint}/EmrBankDarah/GetDetailOrder/${sNoOrder}`,
                options
            )
            .then((res) => {
                console.log('getDetailOrder : ', res);
                setspDetailOrder(false)
                setspValid(false)
                if (res.data.statusCode === 200) {
                    setdtOrder(res.data.result)

                    // jika sudah valid
                    if (res.data.result.StatusValid.trim() !== "0") {
                        setkesesuaianIdentitas(res.data.result.DetailValidasi[0].KesesuaianIdentitas)
                        setketkesesuaianIdentitas(res.data.result.DetailValidasi[0].KetKesesuaianIdentitas)
                        setvolSampel(res.data.result.DetailValidasi[0].VolSampel)
                        setketVolSampel(res.data.result.DetailValidasi[0].KetVolSampel)
                        setkondSampel(res.data.result.DetailValidasi[0].KondSampel)
                        setketKondSampel(res.data.result.DetailValidasi[0].KetKondSampel)
                        setjnsDarahJml(res.data.result.DetailValidasi[0].JenisDarahJumlah)
                        setketJnsDarahJml(res.data.result.DetailValidasi[0].KetJenisDarahJumlah)
                        settglPenerimaan(dayjs(res.data.result.DetailValidasi[0].TglValidasi))
                        setptgPenerima(res.data.result.DetailValidasi[0].UserId)
                        setcmMetode(res.data.result.DetailValidasi[0].CrossMetode)
                    }

                    console.log('res.data.result.DetailValidasi : ', res.data.result.DetailValidasi);

                } else {
                    setdtOrder([])
                }
            })
            .catch((err) => {
                setspDetailOrder(false)
                setspValid(false)
                setdtOrder([])
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil data Pasien! -> ${err}`,
                });
            });
    }

    const getNoPmr = () => {
        setspNoPmr(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetNoPmrGolonganDarah`, options)
            .then((res) => {
                console.log('getNoPmr : ', res);
                setspNoPmr(false)
                if (res.data.statusCode === 200) {
                    settempNoPmr(res.data.result);
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal melakukan proses ambil data No Pemeriksaan Golongan Darah! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                // setruang([]);
                settempNoPmr()
                setspNoOrder(false)
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil No Pemeriksaan Golongan Darah! -> ${err}`,
                });
            });
    }

    // get hasil pmr
    const getHasilPmrGolonganDarah = (sNoreg) => {
        setspTmbahHasil(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetHasilGolDar/${sNoreg}`, options)
            .then((res) => {
                console.log('getHasilPmrGolonganDarah : ', res);
                setspTmbahHasil(false)
                if (res.data.statusCode === 200) {
                    sethslPmr(res.data.result);
                } else {
                    sethslPmr([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal ambil Hasil Pemeriksaan Golongan Darah! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTmbahHasil(false)
                sethslPmr([])
                Modal.error({
                    title: "Error",
                    content: `Error ambil Hasil Pemeriksaan Golongan Darah! -> ${err}`,
                });
            });
    };

    const getHasilPmrGolonganDarahV2 = async (sNoreg) => {
        setspTmbahHasil(true); // Set loading state ke true
        try {
            const res = await axios.get(`${endpoint}/EmrBankDarah/GetHasilGolDar/${sNoreg}`, options);
            // console.log("getHasilPmrGolonganDarah : ", res);

            setspTmbahHasil(false); // Set loading state ke false
            if (res.data.statusCode === 200) {
                // sethslPmr(res.data.result);
                return res.data.result; // Kembalikan hasil jika sukses
            } else {
                // sethslPmr([]);
                Modal.error({
                    title: "Gagal!",
                    content: `Gagal ambil Hasil Pemeriksaan Golongan Darah! -> ${res.data.result}`,
                });
                return null; // Kembalikan null jika gagal
            }
        } catch (err) {
            setspTmbahHasil(false); // Set loading state ke false
            // sethslPmr([]);
            Modal.error({
                title: "Error",
                content: `Error ambil Hasil Pemeriksaan Golongan Darah! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getHasilPmrGolonganDarahV3 = (sNoreg) => {
        // setspTbPasien(true);
        axios
            .get(`${endpoint}/EmrBankDarah/GetHasilGolDar/${sNoreg}`, options)
            .then((response) => {
                // setspTbPasien(false);
                console.log('getHasilPmrGolonganDarahV3 : ', response);
                if (response.data.statusCode === 200) {
                    let result = response.data.result;
                    let hasil = result?.[0] || null;
                    setgolDarah(hasil?.length !== 0 ? hasil.GolDarah + ' ' + hasil.Rh : null);
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! getDetailPelaksanaanV2! -> ${response.data.message}`,
                    });
                }
            })
            .catch((err) => {
                // setspTbPasien(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! getHasilPmrGolonganDarahV3! -> ${err}`,
                });
            });
    };


    // get riwayat hasil pmr
    const getRiwPmrGolonganDarah = (sNoreg) => {
        setspTmbahHasil(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetRiwHasilGolDar/${sNoreg}`, options)
            .then((res) => {
                console.log('getRiwPmrGolonganDarah : ', res);
                setspTmbahHasil(false)
                if (res.data.statusCode === 200) {
                    setriwHslPmr(res.data.result);
                } else {
                    setriwHslPmr([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal ambil Riwayat Hasil Pemeriksaan Golongan Darah! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTmbahHasil(false)
                setriwHslPmr([])
                Modal.error({
                    title: "Error",
                    content: `Error ambil Riwayat Hasil Pemeriksaan Golongan Darah! -> ${err}`,
                });
            });
    }

    const getHasilCrossMatch = (sNoOrder) => {
        setspTmbahHasil(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetHasilCm/${sNoOrder}`, options)
            .then((res) => {
                console.log('getHasilCrossMatch : ', res);
                setspTmbahHasil(false)
                if (res.data.statusCode === 200) {
                    setlistCrossMatch(res.data.result);
                } else {
                    setlistCrossMatch([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal ambil Hasil Pemeriksaan CrossMatch! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTmbahHasil(false)
                setlistCrossMatch([])
                Modal.error({
                    title: "Error",
                    content: `Error ambil Hasil Pemeriksaan CrossMatch! -> ${err}`,
                });
            });
    }

    const getDarahKirim = (sNoOrder) => {
        setspTbDaftarKirim(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetDarahSiap/${sNoOrder}`, options)
            .then((res) => {
                console.log('getDarahKirim : ', res);
                setspTbDaftarKirim(false)
                if (res.data.statusCode === 200) {
                    setlistKirim(res.data.result);
                } else {
                    setlistKirim([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal ambil Daftar Darah Kirim dan Terkirim! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbDaftarKirim(false)
                setlistKirim([])
                Modal.error({
                    title: "Error",
                    content: `Error ambil Daftar Darah Kirim dan Terkirim! -> ${err}`,
                });
            });
    }

    const validOrder = (data) => {
        setspValid(true)
        axios
            .post(`${endpoint}/EmrBankDarah/ValidasiOrder`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('validOrder : ', res);
                setspValid(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setptgPenerima(data.userId);
                            dtOrder.StatusValid = '1';
                            getListOrderbyDate(ruangIdValid, dayjs(tglOrder).format('YYYY-MM-DD'), ktgOrder)
                        },
                    });
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Validasi Order Bank Darah! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspValid(false)
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Validasi Order Bank Darah! -> ${err}`,
                });
            });
    }

    const rstPenerimaanSample = () => {
        settabNo(1)
        setkesesuaianIdentitas()
        setketkesesuaianIdentitas()
        setvolSampel()
        setketVolSampel()
        setkondSampel()
        setketKondSampel()
        setjnsDarahJml()
        setketJnsDarahJml()
        settglPenerimaan(dayjs())
        setptgPenerima()
        setcmMetode()
    }

    const updateValidOrder = (data) => {
        setspValid(true)
        axios
            .post(`${endpoint}/EmrBankDarah/UpdateValidasiOrder`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('updateValidOrder : ', res);
                setspValid(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        // onOk: () => {
                        //     setptgPenerima(data.userId);
                        //     dtOrder.StatusValid = '1';
                        //     getListOrderbyDate(ruangIdValid, dayjs(tglOrder).format('YYYY-MM-DD'), ktgOrder)
                        // },
                    });
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Update Validasi Order Bank Darah! -> ${res.data.result.message}`,
                    });
                }
            })
            .catch((err) => {
                setspValid(false)
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Update Validasi Order Bank Darah! -> ${err}`,
                });
            });
    }

    const insertPmrGolDa = (data) => {
        setspTmbahHasil(true)
        axios
            .post(`${endpoint}/EmrBankDarah/InsertPmrGolDarah`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('insertPmrGolDa : ', res);
                setspTmbahHasil(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdPmrGolDarah(false)
                            sethslPmr(res.data.result)
                        },
                    });
                } else {
                    sethslPmr([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan Hasil Pemeriksaan Golongan Darah! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTmbahHasil(false)
                sethslPmr([])
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan Hasil Pemeriksaan Golongan Darah! -> ${err}`,
                });
            });
    }

    const deletePmrGolDa = (data) => {
        setspTmbahHasil(true)
        axios
            .post(`${endpoint}/EmrBankDarah/DeletePmrGolDarah`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('deletePmrGolDa : ', res);
                setspTmbahHasil(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            sethslPmr(res.data.result)
                            getRiwPmrGolonganDarah(dtOrder.RegistrasiId)
                        },
                    });
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Hapus Hasil Pemeriksaan Golongan Darah! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTmbahHasil(false)
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Hapus Hasil Pemeriksaan Golongan Darah! -> ${err}`,
                });
            });
    }

    const insertCmMetode = (data) => {
        setspCmMetode(true)
        axios
            .post(`${endpoint}/EmrBankDarah/InsertCMMetode`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('insertCmMetode : ', res);
                setspCmMetode(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                    });
                } else {
                    setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan Crossmatch Metode! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspCmMetode(false)
                setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan Crossmatch Metode! -> ${err}`,
                });
            });
    }

    const insertCrossMatch = (data) => {
        setspTmbahHasil(true)
        axios
            .post(`${endpoint}/EmrBankDarah/InsertHasilCm`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('insertCrossMatch : ', res);
                setspTmbahHasil(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdUjiSerasi(false)
                            setlistCrossMatch(res.data.result)
                        },
                    });
                } else {
                    // setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan Hasil Pemeriksaan Crossmatch! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTmbahHasil(false)
                // setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan Hasil Pemeriksaan Crossmatch! -> ${err}`,
                });
            });
    }

    const UpdateCrossMatch = (data) => {
        setspTmbahHasil(true)
        axios
            .post(`${endpoint}/EmrBankDarah/UpdateHasilCm`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('UpdateCrossMatch : ', res);
                setspTmbahHasil(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdUjiSerasi(false)
                            setlistCrossMatch(res.data.result)
                        },
                    });
                } else {
                    // setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Ubah Hasil Pemeriksaan Crossmatch! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTmbahHasil(false)
                // setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Ubah Hasil Pemeriksaan Crossmatch! -> ${err}`,
                });
            });
    }

    const HapusCrossMatch = (data) => {
        setspTmbahHasil(true)
        axios
            .post(`${endpoint}/EmrBankDarah/HapusHasilCm`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('HapusCrossMatch : ', res);
                setspTmbahHasil(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdUjiSerasi(false)
                            setlistCrossMatch(res.data.result)
                        },
                    });
                } else {
                    // setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Hapus Hasil Pemeriksaan Crossmatch! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTmbahHasil(false)
                // setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Hapus Hasil Pemeriksaan Crossmatch! -> ${err}`,
                });
            });
    }

    const insertKirimDarah = (data) => {
        setspTbDaftarKirim(true)
        axios
            .post(`${endpoint}/EmrBankDarah/InsertKirimDarah`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('insertKirimDarah : ', res);
                setspTbDaftarKirim(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdKirimDarah(false)
                            setlistKirim(res.data.result)
                        },
                    });
                } else {
                    // setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan Pengiriman Darah! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspTbDaftarKirim(false)
                // setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan Pengiriman Darah! -> ${err}`,
                });
            });
    }

    const insertTerlayani = (data) => {
        setspTerlayani(true)
        axios
            .post(`${endpoint}/EmrBankDarah/InsertTerlayani`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('insertTerlayani : ', res);
                setspTerlayani(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            getListOrderbyDate(ruangIdValid, dayjs(tglOrder).format('YYYY-MM-DD'), ktgOrder)
                        },
                    });
                } else {
                    // setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan Order Terlayani! -> ${res.data.message} \nNo. Kantong : ${res.data.result}, \nbelum bisa terlayani jika masih ada kantong yang belum terkirim.`,
                    });
                }
            })
            .catch((err) => {
                setspTerlayani(false)
                // setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan Order Terlayani! -> ${err}`,
                });
            });
    }

    const insertAdvice = (data) => {
        setspAdvice(true)
        axios
            .post(`${endpoint}/EmrBankDarah/InsertAdviceCm`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('insertAdvice : ', res);
                setspAdvice(false)
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdAdvice(false)
                            getHasilCrossMatch(dtOrder.NoOrder)
                        },
                    });
                } else {
                    // setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan Advice Crossmatch! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspAdvice(false)
                // setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan Advice Crossmatch! -> ${err}`,
                });
            });
    }

    // ===== informasi bank Darah ======

    const getDaftarPmrCm = (sTglPemeriksaan, sRuangId) => {
        setspTbPmrCmRuangan(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetDaftarPmrCm/${sTglPemeriksaan}/${sRuangId}`, options)
            .then((res) => {
                console.log('getDaftarPmrCm : ', res);
                setspTbPmrCmRuangan(false)
                if (res.data.statusCode === 200) {

                    if (res.data.result.length === 0) {
                        Modal.info({
                            title: "Informasi",
                            content: 'Belum ada pemeriksaan.',
                        });
                    }

                    setlistPmrCm(res.data.result);
                } else {
                    setlistPmrCm([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal ambil Daftar Pemeriksaan Crossmatch Ruang! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbPmrCmRuangan(false)
                setlistPmrCm([])
                Modal.error({
                    title: "Error",
                    content: `Error ambil Daftar Pemeriksaan Crossmatch Ruang! -> ${err}`,
                });
            });
    }

    const getListKantongDarahSiap = (sRuangId) => {
        setspTbDarahSiapRuangan(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetListKantongDarahSiap/${sRuangId}`, options)
            .then((res) => {
                console.log('getListKantongDarahSiap : ', res);
                setspTbDarahSiapRuangan(false)
                if (res.data.statusCode === 200) {
                    setlistDarahSiapRuangan(res.data.result);
                } else {
                    setlistDarahSiapRuangan([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal ambil Daftar Darah Siap Ruang! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbDarahSiapRuangan(false)
                setlistDarahSiapRuangan([])
                Modal.error({
                    title: "Error",
                    content: `Error ambil Daftar Darah Siap Ruang! -> ${err}`,
                });
            });
    }

    const getListKantongDarahTerkirim = (sTgl, sRuangId) => {
        setspTbDarahTerkirimRuangan(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetListKantongDarahTerkirim/${sTgl}/${sRuangId}`, options)
            .then((res) => {
                console.log('getListKantongDarahTerkirim : ', res);
                setspTbDarahTerkirimRuangan(false)
                if (res.data.statusCode === 200) {

                    if (res.data.result.length === 0) {
                        Modal.info({
                            title: "Informasi",
                            content: 'Belum ada Darah Terkirim.',
                        });
                    }

                    setlistDarahTerkirimRuangan(res.data.result);
                } else {
                    setlistDarahTerkirimRuangan([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal ambil Daftar Darah Terkirim Ruang! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbDarahTerkirimRuangan(false)
                setlistDarahTerkirimRuangan([])
                Modal.error({
                    title: "Error",
                    content: `Error ambil Daftar Darah Terkirim Ruang! -> ${err}`,
                });
            });
    }

    const getListKantongDarahPending = (sRuangId) => {
        setspTbDarahPending(true)
        axios
            .get(`${endpoint}/EmrBankDarah/GetOrderBelumTerlayani/${sRuangId}`, options)
            .then((res) => {
                console.log('getListKantongDarahPending : ', res);
                setspTbDarahPending(false)
                if (res.data.statusCode === 200) {
                    // if (res.data.result.length === 0) {
                    //     Modal.info({
                    //         title: "Informasi",
                    //         content: 'Belum ada Darah Terkirim.',
                    //     });
                    // }

                    setlistDarahPending(res.data.result);
                } else {
                    setlistDarahPending([])
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal ambil Daftar Darah Belum Terlayani! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbDarahPending(false)
                setlistDarahPending([])
                Modal.error({
                    title: "Error",
                    content: `Error ambil Daftar Darah Belum Terlayani! -> ${err}`,
                });
            });
    }

    const getRespTime = (sTgl, sRuangId) => {
        setspTbRespTime(true);
        axios
            .get(`${endpoint}/EmrBankDarah/GetResponTime/${sTgl}/${sRuangId}`, options)
            .then((res) => {
                console.log('getRespTime : ', res);
                setspTbRespTime(false);
                if (res.data.statusCode === 200) {
                    if (res.data.result.length === 0) {
                        Modal.info({
                            title: "Informasi",
                            content: 'Belum ada Respon Time hari ini.',
                        });
                    }

                    setlistRespTime(res.data.result);
                } else {
                    setlistRespTime([]);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal ambil Daftar Respon Time! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspTbRespTime(false);
                setlistRespTime([]);
                Modal.error({
                    title: "Error",
                    content: `Error ambil Daftar Respon Time! -> ${err}`,
                });
            });
    };

    // ========== ========== ========== ========== ==========

    const epDev = 'http://182.168.6.72:5577'

    // ===== catatan pelaksanaan transfusi =====
    const postPelaksanaan = (data) => {
        setspCatatan(true);
        axios
            .post(`${endpoint}/EmrBankDarah/InsertPelaksanaanTf`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('postPelaksanaan : ', res);
                setspCatatan(false);
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdPelaksanaan(false);
                            getKantongDarahSiap(dtPasien.RegistrasiId, '1');
                        },
                    });
                } else {
                    // setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspCatatan(false);
                // setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan! -> ${err}`,
                });
            });
    };

    const updatePelaksanaan = (data) => {
        setspCatatan(true);
        axios
            .post(`${endpoint}/EmrBankDarah/UpdatePelaksanaanTf`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('updatePelaksanaan : ', res);
                setspCatatan(false);
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdPelaksanaan(false);
                            getKantongDarahSiap(dtPasien.RegistrasiId, '1');
                        },
                    });
                } else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspCatatan(false);
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan! -> ${err}`,
                });
            });
    };

    const postTtv = (data) => {
        setspCatatan(true);
        axios
            .post(`${endpoint}/EmrBankDarah/InsertTTvObs`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('postTtv : ', res);
                setspCatatan(false);
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdObs(false);
                            getListObs(tempDtCrossmatch.PelaksanaanId);
                        },
                    });
                } else {
                    // setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspCatatan(false);
                // setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan! -> ${err}`,
                });
            });
    };

    const updateTtv = (data) => {
        setspCatatan(true);
        axios
            .post(`${endpoint}/EmrBankDarah/UpdateTTvObs`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('updateTtv : ', res);
                setspCatatan(false);
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: res.data.message,
                        onOk: () => {
                            setmdObs(false);
                            getListObs(tempDtCrossmatch.PelaksanaanId);
                        },
                    });
                } else {
                    // setcmMetode()
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Simpan! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspCatatan(false);
                // setcmMetode()
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Simpan! -> ${err}`,
                });
            });
    };

    const getDetailPelaksanaan = async (sId) => {
        // setspTbOrder(true); // Set loading state ke true

        try {
            const res = await axios.get(
                `${endpoint}/EmrBankDarah/GetDetailPelaksanaanTransfusi/${sId}`,
                options
            );
            console.log("getDetailPelaksanaan : ", res);

            // setspTbOrder(false); // Set loading state ke false
            if (res.data.statusCode === 200) {
                // setmdDetailNonValid(true);
                // setdtOrderDarah(res.data.result);
                return res.data.result; // Kembalikan hasil jika sukses
            } else {
                // setdtOrderDarah([]);
                Modal.error({
                    title: "Gagal!",
                    content: `Gagal mengambil Data! -> ${res.data.result}`,
                });
                return null; // Kembalikan null jika gagal
            }
        } catch (err) {
            setspTbOrder(false); // Set loading state ke false
            // setdtOrderDarah([]);
            Modal.error({
                title: "Error",
                content: `Error melakukan proses ambil Data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const getDetailPelaksanaanV2 = async (data) => {
        // setspTbPasien(true);
        axios
            .get(`${endpoint}/EmrBankDarah/GetDetailPelaksanaanTransfusi/${data.PelaksanaanId}`, options)
            .then((response) => {
                // setspTbPasien(false);
                console.log('getDetailPelaksanaanV2 : ', response);
                if (response.data.statusCode === 200) {
                    let result = response.data.result;

                    setInsDokter(result.instruksiDokter);
                    setwktDiterima(dayjs(result.waktuTerimaRuangan));
                    setwktSelesai(dayjs(result.waktuSelesai));
                    settglTransfusi(dayjs(result.waktuTransfusi));
                    setpreMedikasi(result.pemberianPremed);
                    settglExp(dayjs(result.waktuExpired));
                    setidentPasien(result.identPasienRuangan);
                    setidentKtg(result.identKantongRuangan);
                    setkeadaanKtg(result.keadaanKantong);
                    setptg1(result.petugasId);
                    setptg2(result.petugasId2);
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! getDetailPelaksanaanV2! -> ${response.data.message}`,
                    });
                }
            })
            .catch((err) => {
                // setspTbPasien(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! getDetailPelaksanaanV2! -> ${err}`,
                });
            });
    };

    // const getListObs = async (sId) => {
    //     try {
    //         const res = await axios.get(
    //             `${endpoint}/EmrBankDarah/GetListObservasi/${sId}`,
    //             options
    //         );
    //         console.log("getListObs : ", res);

    //         if (res.data.statusCode === 200) {
    //             return res.data.result;
    //         } else {
    //             Modal.error({
    //                 title: "Gagal!",
    //                 content: `Gagal mengambil Data! -> ${res.data.result}`,
    //             });
    //             return null;
    //         }
    //     } catch (err) {
    //         setspTbOrder(false);
    //         Modal.error({
    //             title: "Error",
    //             content: `Error melakukan proses ambil Data! -> ${err}`,
    //         });
    //         return null;
    //     }
    // };

    const getListObs = (sId) => {
        // setspTbRespTime(true);
        axios
            .get(`${endpoint}/EmrBankDarah/GetListObservasi/${sId}`, options)
            .then((res) => {
                console.log('getListObs : ', res);
                // setspTbRespTime(false);
                if (res.data.statusCode === 200) {
                    // if (res.data.result.length === 0) {
                    //     Modal.info({
                    //         title: "Informasi",
                    //         content: 'Belum ada Respon Time hari ini.',
                    //     });
                    // }

                    setlistObs(res.data.result);
                } else {
                    setlistObs([]);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal mengambil Data! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                // setspTbRespTime(false);
                setlistObs([]);
                Modal.error({
                    title: "Error",
                    content: `Error mengambil Data! -> ${err}`,
                });
            });
    };

    return (
        <BankDarahContext.Provider
            value={{
                tabOrder, settabOrder,
                ruang, setruang,
                ruangId, setruangId,
                listPasien, setlistPasien,
                listDokter, setlistDokter,
                dtPasien, setdtPasien,
                dtOrderDarah, setdtOrderDarah,
                ktgjnsDarah,
                listOrderNonValid, setlistOrderNonValid,
                listOrderValid, setlistOrderValid,
                listDiagnosa, setlistDiagnosa,
                RiwGolDarah, setRiwGolDarah,
                riwGolDaLabPK, setriwGolDaLabPK,
                listHasilLab, setlistHasilLab,
                listDarahSiap, setlistDarahSiap,
                listAdvice, setlistAdvice,
                listRiwReaksi, setlistRiwReaksi,
                listNonValid, setlistNonValid,
                listValid, setlistValid,
                listTerlayani, setlistTerlayani,
                listDrhSiapRuang, setlistDrhSiapRuang,
                listNamaBrg, setlistNamaBrg,
                kdBarang, setkdBarang,
                namaBarang, setnamaBarang,
                qtyTotal, setqtyTotal,
                // form order
                noOrder, setnoOrder,
                unitTujuan, setunitTujuan,
                dxOrder, setdxOrder,
                hb, sethb,
                trombo, settrombo,
                golDarahPx, setgolDarahPx,
                golDarahPermintaan, setgolDarahPermintaan,
                ketBedaGolDarah, setketBedaGolDarah,
                volSample, setvolSample,
                kondSample, setkondSample,
                indTrans, setindTrans,
                namaDr, setnamaDr,
                jnsDarah, setjnsDarah,
                jmlKantong, setjmlKantong,
                listPermintaan, setlistPermintaan,
                userOrder,
                ipClient,
                hostClient,
                // spin
                spTbPasien, setspTbPasien,
                spDtPasien, setspDtPasien,
                spNoOrder, setspNoOrder,
                spTbOrder, setspTbOrder,
                spSimpanOrder, setspSimpanOrder,
                spRiwGolDarah, setspRiwGolDarah,
                spHasilLab, setspHasilLab,
                spTbKantongSiap, setspTbKantongSiap,
                spJawabAdvice, setspJawabAdvice,
                spTbRiwReaksi, setspTbRiwReaksi,
                spTbInfoRuang, setspTbInfoRuang,
                // md
                mdTambahOrder, setmdTambahOrder,
                mdDetailNonValid, setmdDetailNonValid,
                mdJawabAdvice, setmdJawabAdvice,
                mdKetRuangan, setmdKetRuangan,
                mdInfoUpdate, setmdInfoUpdate,
                // func
                getRuangUser,
                getListDokter,
                getPasien,
                getListNamaBarang,
                getDetailPasien,
                getListOrder,
                getDetailOrderOnOrder,
                getDetailOrderOnOrderAsync,
                getDiagnosaPx,
                getHasilLabHbTrombosit,
                rstFormOrder,
                getNoOrder,
                getRiwayatGolDaraf,
                getRiwayatGolDarahLabPK,
                getKantongDarahSiap,
                getListAdvice,
                getRiwReaksi,
                getInfoRuangan,
                getPasienPenunjang,
                simpanOrder,
                hapusOrder,
                simpanReaksi,
                insertJwbAdvice,
                insertKetRuangan,
                // info ruangan
                tglInfo, settglInfo,

                // catatan pelaksanaan
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
                tempDtCrossmatch, settempDtCrossmatch,
                listObs, setlistObs,
                lookUpPerawat,
                postPelaksanaan,
                updatePelaksanaan,
                postTtv,
                updateTtv,
                getDetailPelaksanaan,
                getDetailPelaksanaanV2,
                getListObs,
                spCatatan, setspCatatan,
                mdPelaksanaan, setmdPelaksanaan,
                mdObs, setmdObs,
                tabCatatan, settabCatatan,

                // PELAYANAN BANK DARAH
                tabNo, settabNo,
                ruangIdValid, setruangIdValid,
                tglOrder, settglOrder,
                ktgOrder, setktgOrder,
                listOrder, setlistOrder,
                daftarPasien, setdaftarPasien,
                drOrder, setdrOrder,
                dtOrder, setdtOrder,
                kesesuaianIdentitas, setkesesuaianIdentitas,
                ketkesesuaianIdentitas, setketkesesuaianIdentitas,
                volSampel, setvolSampel,
                ketVolSampel, setketVolSampel,
                kondSampel, setkondSampel,
                ketKondSampel, setketKondSampel,
                jnsDarahJml, setjnsDarahJml,
                ketJnsDarahJml, setketJnsDarahJml,
                tglPenerimaan, settglPenerimaan,
                ptgPenerima, setptgPenerima,
                userValid, setuserValid,
                user, setuser,
                cmMetode, setcmMetode,
                // sp
                spListOrder, setspListOrder,
                spDetailOrder, setspDetailOrder,
                spValid, setspValid,
                spTmbahHasil, setspTmbahHasil,
                spCmMetode, setspCmMetode,
                // func
                getListOrderbyDate,
                getDetailPasienPelayanan,
                getDetailOrder,
                validOrder,
                updateValidOrder,
                insertPmrGolDa,
                insertCmMetode,
                // form crossmatch
                tempNoPmr, settempNoPmr,
                hslPmr, sethslPmr,
                riwHslPmr, setriwHslPmr,
                listCrossMatch, setlistCrossMatch,
                spNoPmr, setspNoPmr,
                spAdvice, setspAdvice,
                mdPmrGolDarah, setmdPmrGolDarah,
                mdUjiSerasi, setmdUjiSerasi,
                mdAdvice, setmdAdvice,
                getNoPmr,
                getHasilPmrGolonganDarah,
                getHasilPmrGolonganDarahV2,
                getHasilPmrGolonganDarahV3,
                getRiwPmrGolonganDarah,
                getHasilCrossMatch,
                deletePmrGolDa,
                insertCrossMatch,
                UpdateCrossMatch,
                HapusCrossMatch,
                insertAdvice,
                // form penyerahan darah
                listKirim, setlistKirim,
                listHubKlg, setlistHubKlg,
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
                getDarahKirim,
                getListHubKel,
                insertKirimDarah,
                insertTerlayani,
                mdKirimDarah, setmdKirimDarah,
                spTbDaftarKirim, setspTbDaftarKirim,
                spTerlayani, setspTerlayani,
                // info bank darah
                ktgJnsKantong,
                listPmrCmRuangan, setlistPmrCm,
                listDarahSiapRuangan, setlistDarahSiapRuangan,
                listDarahTerkirimRuangan, setlistDarahTerkirimRuangan,
                listDarahPending, setlistDarahPending,
                listRespTime, setlistRespTime,
                tabInformasi, settabInformasi,
                getDaftarPmrCm,
                getListKantongDarahSiap,
                getListKantongDarahTerkirim,
                getListKantongDarahPending,
                getRespTime,
                spTbPmrCmRuangan, setspTbPmrCmRuangan,
                spTbDarahSiapRuangan, setspTbDarahSiapRuangan,
                spTbDarahTerkirimRuangan, setspTbDarahTerkirimRuangan,
                spTbDarahPending, setspTbDarahPending,
                spTbRespTime, setspTbRespTime,
            }}
        >
            {props.children}
        </BankDarahContext.Provider>
    )
}

export default BankDarahContextProvider;