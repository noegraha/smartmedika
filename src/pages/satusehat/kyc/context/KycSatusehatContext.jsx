/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../../rawatjalan/context';
import axios from 'axios';
import { Modal } from 'antd';
import dayjs from 'dayjs';

export const KycSatusehatContext = createContext();

const KycSatusehatContextProvider = (props) => {
    const { token, namauser } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const ip = sessionStorage.getItem("IP");
    const host = sessionStorage.getItem("Host");
    const username = sessionStorage.getItem("userId");

    const ipEndpoint = sessionStorage.getItem("apiPenunjang");
    const baseURL = `${ipEndpoint}/`;
    const env = sessionStorage.getItem("environment");

    const [userOrder, setuserOrder] = useState(username);
    const [ipClient, setipClient] = useState(ip);
    const [hostClient, sethostClient] = useState(host);

    const [jnsNoIdent, setjnsNoIdent] = useState();
    const [noIdent, setnoIdent] = useState();
    const [dtNik, setdtNik] = useState();
    const [dtBpjs, setdtBpjs] = useState();
    const [dtNama, setdtNama] = useState();
    const [dtKtg, setdtKtg] = useState();
    const [spValidasi, setspValidasi] = useState(false);

    const [tempA, settempA] = useState();
    const [sstoken, setsstoken] = useState(null);
    const [SSTokenExp, setSSTokenExp] = useState();
    const [baseUrlSS, setbaseUrlSS] = useState();
    const [ihsRS, setihsRS] = useState();

    const [blnDashboard, setblnDashboard] = useState(dayjs());
    const [dataDashboard, setdataDashboard] = useState([]);
    const [jmlPasien, setjmlPasien] = useState();
    const [jmlUmum, setjmlUmum] = useState();
    const [jmlKaryawan, setjmlKaryawan] = useState();
    const [spGrafik, setspGrafik] = useState(false);

    useEffect(() => {
        getDetailEnv(env);
    }, []);

    const getValidasi = (jns, nomor) => {
        setspValidasi(true);
        let address;

        if (jns === 'ktp') {
            address = `${baseURL}BridgeVClaim/Peserta/NIK/${nomor}`;
        }
        else {
            address = `${baseURL}BridgeVClaim/Peserta/${nomor}`
        }

        axios
            .get(`${address}`, options)
            .then((response) => {
                setspValidasi(false)
                console.log('getValidasi : ', response);
                if (response.data.statusCode === 200) {
                    let data = response.data.result;
                    setdtNik(data.nik);
                    setdtBpjs(data.noKartu);
                    setdtNama(data.nama);
                }
                else {
                    Modal.warning({
                        title: "Peringatan!",
                        content: `Data tidak ditemukan atau ${response.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspValidasi(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! getValidasi -> ${err}`,
                });
            });
    };

    // get environment
    const getDetailEnv = ((data) => {
        // setspTbPasien(true)
        axios
            .get(`${baseURL}SatuSehat/GetEnvbyEnv/${data}`, options)
            .then((response) => {
                // setspTbPasien(false)
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
                // setspTbPasien(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Detail Environment! -> ${err}`,
                });
            });
    });

    const cekByIhs = (nik) => {
        settempA(0);

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
        };

        if (tempA === 1) {
            axios
                .get(`${baseURL}SatuSehat/GetPasienByNIK/${nik}/${sstoken}/${encodeURIComponent(baseUrlSS)}`, options)
                .then((response) => {
                    // setspDetailKirim(false)
                    console.log('cekByIhs : ', response);
                    if (response.data.hasOwnProperty('statusCode')) {
                        Modal.error({
                            title: "Gagal!",
                            content: response.data.result,
                        });
                    }
                    else {
                        if (response.data.length === 1) {
                            let data = response.data[0].resource;
                            setdtNik(data.identifier[1].value);
                            setdtBpjs(data.id);
                            setdtNama(data.name[0].text);
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
                    // setspDetailKirim(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! GET IHS Number Pasien! -> ${err}`,
                    });
                });
        }
    };

    const rstParam = () => {
        setnoIdent();
        setdtNik();
        setdtBpjs();
        setdtNama();
        setdtKtg();
    };

    const postStatistikKyc = (data) => {
        setspValidasi(true);
        axios
            .post(`${baseURL}SatuSehat/postKycVerif
            `, data, {
                headers: options.headers,
            })
            .then((res) => {
                setspValidasi(false);
                console.log('postStatistikKyc : ', res);
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan.",
                        onOk: () => {
                            rstParam();

                            let bln = dayjs(blnDashboard).format('YYYY-MM');
                            getDashboardKyc(bln);
                            setblnDashboard(dayjs());
                        },
                    });
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Disimpan! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspValidasi(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR Disimpan! -> ${err}`,
                });
            });
    };

    const getDashboardKyc = (sBln) => {
        setspGrafik(true);

        axios
            .get(`${baseURL}SatuSehat/DashboardRekapKyc/${sBln}`, options)
            .then((response) => {
                setspGrafik(false);
                console.log('getDashboardKyc : ', response);
                if (response.data.result.code === "200") {
                    let data = response.data.result.result;
                    setdataDashboard(response.data.result.result);

                    let jmlPasien = data.reduce(
                        (prev, current) => {
                            if (current.Jenis === "pasien") prev += current.Jumlah;
                            return prev;
                        },
                        0
                    );
                    let jmlUmum = data.reduce(
                        (prev, current) => {
                            if (current.Jenis === "umum") prev += current.Jumlah;
                            return prev;
                        },
                        0
                    );
                    let jmlKaryawan = data.reduce(
                        (prev, current) => {
                            if (current.Jenis === "karyawan") prev += current.Jumlah;
                            return prev;
                        },
                        0
                    );

                    setjmlPasien(jmlPasien);
                    setjmlUmum(jmlUmum);
                    setjmlKaryawan(jmlKaryawan);
                }
                else {
                    Modal.warning({
                        title: "Peringatan!",
                        content: `Data tidak ditemukan atau ${response.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspGrafik(false);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! getDashboardKyc -> ${err}`,
                });
            });
    }

    return (
        <KycSatusehatContext.Provider
            value={{
                userOrder,
                ipClient,
                hostClient,

                jnsNoIdent, setjnsNoIdent,
                noIdent, setnoIdent,
                dtNik, setdtNik,
                dtBpjs, setdtBpjs,
                dtNama, setdtNama,
                dtKtg, setdtKtg,

                blnDashboard, setblnDashboard,
                dataDashboard, setdataDashboard,
                jmlPasien, setjmlPasien,
                jmlUmum, setjmlUmum,
                jmlKaryawan, setjmlKaryawan,
                spGrafik, setspGrafik,

                rstParam,
                getValidasi,
                getDashboardKyc,
                cekByIhs,
                postStatistikKyc,
                spValidasi, setspValidasi,
            }}>
            {props.children}
        </KycSatusehatContext.Provider>
    )
}

export default KycSatusehatContextProvider