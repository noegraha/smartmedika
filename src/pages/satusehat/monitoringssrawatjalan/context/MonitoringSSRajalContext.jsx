/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { LoginContext } from '../../../rawatjalan/context';
import axios from 'axios';
import { Modal } from 'antd';
import dayjs from 'dayjs';

export const MonitoringSSRajalContext = createContext();

const MonitoringSSRajalContextProvider = (props) => {
    const { token, namauser } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const baseURL = sessionStorage.getItem("apiPenunjang");
    const env = sessionStorage.getItem("environment");

    const [dataGrafikKirim, setdataGrafikKirim] = useState([]);
    const [totalPendaftaran, settotalPendaftaran] = useState();
    const [totalKirim, settotalKirim] = useState();
    const [dataDetailKirim, setdataDetailKirim] = useState([]);
    const [dataDetailResource, setdataDetailResource] = useState([]);
    const [sstoken, setsstoken] = useState(null);
    const [SSTokenExp, setSSTokenExp] = useState();
    const [baseUrlSS, setbaseUrlSS] = useState();
    const [tempA, settempA] = useState();
    const [ihsRS, setihsRS] = useState();
    const [textResponseById, settextResponseById] = useState();
    // loading
    const [spGrafikPengiriman, setspGrafikPengiriman] = useState(false);
    const [spDetailHarian, setspDetailHarian] = useState(false);

    useEffect(() => {
        getDetailEnv(env);
    }, [])

    const resetDefault = () => {
        settextResponseById();
    }

    const getGrafikKirim = (bulan) => {
        setspGrafikPengiriman(true);
        axios
            .get(`${baseURL}/SatuSehat/DashboardTotalKirim/${bulan}`, options)
            .then((response) => {
                setspGrafikPengiriman(false);
                console.log('getGrafikKirim : ', response);
                if (response.data.result.code === '200') {
                    if (response.data.result.length !== 0) {
                        let data = response.data.result.result;
                        setdataGrafikKirim(data);
                        let jmlPendaftaran = data.reduce(
                            (prev, current) => {
                                if (current.Jenis === "totalPendaftaran") prev += current.Jumlah;
                                return prev;
                            },
                            0
                        );
                        settotalPendaftaran(jmlPendaftaran);

                        let jmlKirim = data.reduce(
                            (prev, current) => {
                                if (current.Jenis === "totalKirimSS") prev += current.Jumlah;
                                return prev;
                            },
                            0
                        );
                        settotalKirim(jmlKirim);
                    } else {
                        setdataGrafikKirim([]);
                        Modal.info({
                            title: "Info",
                            content: 'Tidak ada Data Pendaftaran dan Kirim SatuSehat ditemukan.',
                        });
                    }
                }
                else {
                    setdataGrafikKirim([]);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data Grafik Kirim! -> ${response.data.result.message}`,
                    });
                }
            })
            .catch((err) => {
                setspGrafikPengiriman(false);
                setdataGrafikKirim([]);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Grafik Kirim! -> ${err}`,
                });
            });
    }

    const getDetailKirim = (sTgl) => {
        setspDetailHarian(true);
        axios
            .get(`${baseURL}/SatuSehat/DashboardDetailKirim/${sTgl}/${env}`, options)
            .then((response) => {
                setspDetailHarian(false);
                console.log('getDetailKirim : ', response);
                if (response.data.result.code === '200') {
                    if (response.data.result.length !== 0) {
                        let data = response.data.result.result;
                        setdataDetailKirim(data);
                    } else {
                        setdataDetailKirim([]);
                        Modal.info({
                            title: "Info",
                            content: 'Tidak ada Data Detail Kirim SatuSehat ditemukan.',
                        });
                    }
                }
                else {
                    setdataGrafikKirim([]);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data Detail Kirim! -> ${response.data.result.message}`,
                    });
                }
            })
            .catch((err) => {
                setspDetailHarian(false);
                setdataGrafikKirim([]);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Detail Kirim! -> ${err}`,
                });
            });
    }

    const getDetailResource = (sRegId) => {
        setspDetailHarian(true);
        resetDefault();
        axios
            .get(`${baseURL}/SatuSehat/DashboardDetailResource/${sRegId}`, options)
            .then((response) => {
                setspDetailHarian(false);
                console.log('getDetailResource : ', response);
                if (response.data.result.code === '200') {
                    if (response.data.result.length !== 0) {
                        let data = response.data.result.result;
                        setdataDetailResource(data);
                    } else {
                        setdataDetailResource([]);
                        Modal.info({
                            title: "Info",
                            content: 'Tidak ada Data Detail Resource SatuSehat ditemukan.',
                        });
                    }
                }
                else {
                    setdataDetailResource([]);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data Detail Resource! -> ${response.data.result.message}`,
                    });
                }
            })
            .catch((err) => {
                setspDetailHarian(false);
                setdataDetailResource([]);
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Detail Resource! -> ${err}`,
                });
            });
    }

    // get environment
    const getDetailEnv = (data) => {
        // setspTbPasien(true)
        axios
            .get(`${baseURL}/SatuSehat/GetEnvbyEnv/${data}`, options)
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
    }

    const getResourceById = (id, rscType) => {
        setspDetailHarian(true);
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
                .get(`${baseURL}/SatuSehat/GetResourceById/${encodeURIComponent(baseUrlSSa)}/${id}/${sstoken}`, options)
                .then((response) => {
                    setspDetailHarian(false);
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
                    setspDetailHarian(false);
                    settextResponseById();
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! GET Detail Resource SatuSehat! -> ${err}`,
                    });
                });
        }
    }

    return (
        <MonitoringSSRajalContext.Provider
            value={{
                dataGrafikKirim, setdataGrafikKirim,
                totalPendaftaran, settotalPendaftaran,
                totalKirim, settotalKirim,
                dataDetailKirim, setdataDetailKirim,
                dataDetailResource, setdataDetailResource,
                textResponseById, settextResponseById,
                getGrafikKirim,
                getDetailKirim,
                getDetailResource,
                getResourceById,
                // loading
                spGrafikPengiriman, setspGrafikPengiriman,
                spDetailHarian, setspDetailHarian,
            }}
        >
            {props.children}
        </MonitoringSSRajalContext.Provider>

    )
}

export default MonitoringSSRajalContextProvider