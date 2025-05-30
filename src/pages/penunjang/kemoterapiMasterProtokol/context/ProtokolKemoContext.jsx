/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect } from 'react'
import { LoginContext } from '../../../rawatjalan/context';
import { useState } from 'react';
import axios from 'axios';
import { Modal, message } from 'antd';

export const ProtokolKemoContext = createContext();

const ProtokolKemoContextProvider = (props) => {
    const { token, namauser } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const ip = sessionStorage.getItem("IP");
    const host = sessionStorage.getItem("Host");

    const [listDokter, setlistDokter] = useState([]);
    const [listMaster, setlistMaster] = useState([]);
    const [templistMaster, settemplistMaster] = useState([]);
    const [tempFormat, settempFormat] = useState(0);
    const [idPrtkl, setidPrtkl] = useState(null);
    const [value, setValue] = useState(); // parameter obat
    const [codeDokterId, setcodeDokterId] = useState();
    const [namaProtokol, setnamaProtokol] = useState();
    const [prosedur, setprosedur] = useState();
    const [ipKomp, setipKomp] = useState(ip);
    const [hostKomp, sethostKomp] = useState(host);
    const [mdCreateProtokol, setmdCreateProtokol] = useState(false);
    const [spListMaster, setspListMaster] = useState(false);
    const [spMdCreateProtokol, setspMdCreateProtokol] = useState(false);
    const [user, setuser] = useState(namauser);

    const endpoint = sessionStorage.getItem("apiPenunjang");

    // useEffect(() => {
    //     getListMasterProtokol();
    // }, [])


    // ===== reset variabel =====
    const rstMdCreate = () => {
        setidPrtkl(null)
        setcodeDokterId();
        setnamaProtokol();
        setValue();
        setprosedur();
    }

    const getListDokter = () => {
        axios
            .get(`${endpoint}/mstDokter/Lookup/Dr/1/1000`, options)
            .then((res) => {
                console.log('getListDokter : ', res);
                message.success('Load Dokter')
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

    const getListMasterProtokol = () => {
        setspListMaster(true);
        axios
            .get(`${endpoint}/MstProtokolKemoterapi/GetListMasterProtokol`, options)
            .then((res) => {
                setspListMaster(false);
                console.log('getListMasterProtokol : ', res);
                if (res.data.statusCode === 200) {
                    setlistMaster(res.data.result.result);
                } else {
                    setlistMaster([]);
                    Modal.error({
                        title: "Gagal",
                        content: `Gagal melakukan proses ambil Daftar Master Protokol Kemoterapi! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspListMaster(false);
                setlistMaster([]);
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Daftar Master Protokol Kemoterapi! -> ${err}`,
                });
            });
    }

    const getListByDr = (idDokter) => {
        axios
            .get(`${endpoint}/MstProtokolKemoterapi/GetListMasterProtokolbyDokter/${idDokter}`, options)
            .then((res) => {
                setspListMaster(false);
                console.log('getListMasterProtokol : ', res);
                if (res.data.statusCode === 200) {
                    setlistMaster(res.data.result.result);
                    settemplistMaster(res.data.result.result);
                } else {
                    setlistMaster([]);
                    settemplistMaster([]);
                    Modal.error({
                        title: "Gagal",
                        content: `Gagal melakukan proses ambil Daftar Master Protokol Kemoterapi! -> ${res.data.result}`,
                    });
                }
            })
            .catch((err) => {
                setspListMaster(false);
                setlistMaster([]);
                settemplistMaster([]);
                Modal.error({
                    title: "Error",
                    content: `Error melakukan proses ambil Daftar Master Protokol Kemoterapi! -> ${err}`,
                });
            });
    };

    const createProtokol = (data) => {
        setspMdCreateProtokol(true);
        axios
            .post(`${endpoint}/MstProtokolKemoterapi`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('createProtokol :', res);
                setspMdCreateProtokol(false);
                if (res.data.statusCode === 200) {
                    // setspSimpanKemoLaporan(false);
                    // console.log("simpanKemoLaporan : ", res.data);
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil simpan Protokol Kemoterapi.",
                        onOk: () => {
                            setmdCreateProtokol(false);
                            getListMasterProtokol();
                        },
                    });
                } else {
                    // setspSimpanKemoLaporan(false);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal simpan Protokol Kemoterapi! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspMdCreateProtokol(false);
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Disimpan! -> ${err}`,
                });
            });
    };

    const updateProtokol = (data) => {
        setspMdCreateProtokol(true);
        axios
            .post(`${endpoint}/MstProtokolKemoterapi/UpdateMstProtokolKemoterapi`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('updateProtokol :', res);
                setspMdCreateProtokol(false);
                if (res.data.statusCode === 200) {
                    // setspSimpanKemoLaporan(false);
                    // console.log("simpanKemoLaporan : ", res.data);
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil edit Protokol Kemoterapi.",
                        onOk: () => {
                            setmdCreateProtokol(false);
                            getListMasterProtokol();
                        },
                    });
                } else {
                    // setspSimpanKemoLaporan(false);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal edit Protokol Kemoterapi! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspMdCreateProtokol(false);
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Diedit! -> ${err}`,
                });
            });
    };

    const deleteProtokol = (data) => {
        // setspMdCreateProtokol(true);
        axios
            .post(`${endpoint}/MstProtokolKemoterapi/HapusMstProtokolKemoterapi`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('deleteProtokol :', res);
                // setspMdCreateProtokol(false);
                if (res.data.statusCode === 200) {
                    // setspSimpanKemoLaporan(false);
                    // console.log("simpanKemoLaporan : ", res.data);
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil hapus Protokol Kemoterapi.",
                        onOk: () => {
                            // setmdCreateProtokol(false);
                            getListMasterProtokol();
                        },
                    });
                } else {
                    // setspSimpanKemoLaporan(false);
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal edit Protokol Kemoterapi! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspMdCreateProtokol(false);
                Modal.error({
                    title: "ERROR!",
                    content: `Gagal Diedit! -> ${err}`,
                });
            });
    };

    return (
        <ProtokolKemoContext.Provider
            value={{
                listDokter, setlistDokter,
                listMaster, setlistMaster,
                templistMaster, settemplistMaster,
                tempFormat, settempFormat,
                idPrtkl, setidPrtkl,
                value, setValue,
                codeDokterId, setcodeDokterId,
                namaProtokol, setnamaProtokol,
                prosedur, setprosedur,
                ipKomp,
                hostKomp,
                user, setuser,
                getListDokter,
                createProtokol,
                rstMdCreate,
                getListMasterProtokol,
                getListByDr,
                updateProtokol,
                deleteProtokol,
                mdCreateProtokol, setmdCreateProtokol,
                spListMaster, setspListMaster,
                spMdCreateProtokol, setspMdCreateProtokol,
            }}>
            {props.children}
        </ProtokolKemoContext.Provider>
    )
}

export default ProtokolKemoContextProvider