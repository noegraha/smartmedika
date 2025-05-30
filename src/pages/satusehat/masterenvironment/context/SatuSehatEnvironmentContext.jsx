/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-use-before-define */
import axios from 'axios';
import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { createContext } from 'react';
import { LoginContext } from '../../../rawatjalan/context';
import { Modal } from 'antd';
import { useEffect } from 'react';

export const SatuSehatEnvironmentContext = createContext();

const SatuSehatEnvironmentContextProvider = (props) => {
    const baseURL = "http://182.168.6.72:5577/"
    // const baseURL = "http://182.168.7.251:5577/"
    // const baseURL = "http://182.168.0.119/api/"

    const { token, namauser } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const [listEnv, setlistEnv] = useState([])
    const [idEnv, setidEnv] = useState()
    const [env, setenv] = useState()
    const [auth_url, setauth_url] = useState()
    const [base_url, setbase_url] = useState()
    const [cons_url, setcons_url] = useState()
    const [client_id, setclient_id] = useState()
    const [client_sc, setclient_sc] = useState()
    const [org_id, setorg_id] = useState()
    const [detailEnv, setdetailEnv] = useState({})
    // modal
    const [mdTambah, setmdTambah] = useState(false)
    // spin
    const [spTbEnv, setspTbEnv] = useState(false)
    const [spmdtambah, setspmdtambah] = useState(false)

    useEffect(() => {
        getListEnv()
    }, [])


    // reset state form tambah
    const rststatetambah = () => {
        setidEnv()
        setenv()
        setauth_url()
        setbase_url()
        setcons_url()
        setclient_id()
        setclient_sc()
        setorg_id()
    }

    // get list env
    const getListEnv = () => {
        setspTbEnv(true)
        axios
            .get(`${baseURL}SatuSehat/GetEnvironment`, options)
            .then((response) => {
                setspTbEnv(false)
                console.log('getListEnv : ', response);
                console.log('getListEnv : ', response.data);
                if (response.status === 200) {
                    if (response.data !== 0) {
                        setlistEnv(response.data)
                    } else {
                        setlistEnv([]);
                        Modal.info({
                            title: "Info",
                            content: 'Tidak ada List Environment.',
                        });
                    }
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data List Environment! -> ${response.statusText}`,
                    });
                }
            })
            .catch((err) => {
                setspTbEnv(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data List Environment! -> ${err}`,
                });
            });
    }

    // insert env
    const simpanEnv = (data) => {
        setspmdtambah(true)
        axios
            .post(`${baseURL}SatuSehat/InsertEnvironment`, data, {
                headers: options.headers,
            })
            .then((res) => {
                setspmdtambah(false)
                console.log('simpanEnv : ', res);
                if (res.data.result.code === "200") {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan data Environment.",
                        onOk: () => {
                            setmdTambah(false)
                            getListEnv()
                        },
                    });
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Disimpan data Environment! -> ${res.data.result.message}`,
                    });
                }
            })
            .catch((err) => {
                setspmdtambah(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR Disimpan data Environment! -> ${err}`,
                });
            });
    }

    return (
        <SatuSehatEnvironmentContext.Provider
            value={{
                listEnv, setlistEnv,
                idEnv, setidEnv,
                env, setenv,
                auth_url, setauth_url,
                base_url, setbase_url,
                cons_url, setcons_url,
                client_id, setclient_id,
                client_sc, setclient_sc,
                org_id, setorg_id,
                detailEnv, setdetailEnv,
                // modal
                mdTambah, setmdTambah,
                // sp
                spTbEnv, setspTbEnv,
                spmdtambah, setspmdtambah,
                // fc
                rststatetambah,
                simpanEnv,
            }}>
            {props.children}
        </SatuSehatEnvironmentContext.Provider>
    )
}

export default SatuSehatEnvironmentContextProvider