/* eslint-disable react-hooks/exhaustive-deps */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { LoginContext } from '../../../rawatjalan/context';
import axios from 'axios';
import { Modal } from 'antd';
import dayjs from 'dayjs';

export const SatuSehatLocationContext = createContext();

// const baseURL = "http://182.168.6.72:5577/"
// const baseURL = "http://182.168.7.251:5577/"
// const baseURL = "http://182.168.0.119/api/"

const SatuSehatLocationContextProvider = (props) => {
    const { token, namauser } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const ipEndpoint = sessionStorage.getItem("apiPenunjang");

    const baseURL = ipEndpoint + "/";
    const ip = sessionStorage.getItem("IP");
    const host = sessionStorage.getItem("Host");
    const env = sessionStorage.getItem("environment")

    // state
    const [listGrpLayanan, setlistGrpLayanan] = useState([])
    const [listSSIdRuang, setlistSSIdRuang] = useState([])
    const [groupLayanan, setgroupLayanan] = useState('')
    const [groupLayananList, setgroupLayananList] = useState(null)
    const [listRuang, setlistRuang] = useState([])
    const [baseUrlSS, setbaseUrlSS] = useState()
    const [OrgIhsNum, setOrgIhsNum] = useState()
    // create
    const [ruangId, setruangId] = useState('')
    const [ruangIdSatuSehat, setruangIdSatuSehat] = useState(null)
    const [namaRuang, setnamaRuang] = useState('')
    const [stsActive, setstsActive] = useState('')
    const [deskGedung, setdeskGedung] = useState('')
    const [mode, setmode] = useState('instance')
    const [telp, settelp] = useState('0281 - 632708')
    const [email, setemail] = useState('rsmargono@jatengprov.go.id')
    const [url, seturl] = useState('rsmargono.go.id')
    const [addr, setaddr] = useState('Jl. Dr. Gumbreg No.1, Kebontebu, Berkoh, Kec. Purwokerto Selatan, Kab. Banyumas, Jawa Tengah')
    const [city, setcity] = useState('Purwokerto')
    const [kodePos, setkodePos] = useState('53146')
    const [kodeProv, setkodeProv] = useState('33')
    const [kodeCity, setkodeCity] = useState('3302')
    const [kodeDistrict, setkodeDistrict] = useState('330224')
    const [kodeVillage, setkodeVillage] = useState('3302241003')
    const [gedung, setgedung] = useState('')
    const [listOrg, setlistOrg] = useState([])
    const [org, setorg] = useState('')
    const [sstoken, setsstoken] = useState(null)
    const [SSTokenExp, setSSTokenExp] = useState()
    const [tempA, settempA] = useState()
    // edit
    const [editId, seteditId] = useState(null)
    const [editidentSys, seteditidentSys] = useState(null)
    const [editidentVal, seteditidentVal] = useState(null)
    const [editstatus, seteditstatus] = useState(null)
    const [editName, seteditName] = useState(null)
    const [editDesk, seteditDesk] = useState(null)
    const [editMode, seteditMode] = useState('instance')
    const [editPhone, seteditPhone] = useState('0281 - 632708')
    const [editEmail, seteditEmail] = useState('rsmargono@jatengprov.go.id')
    const [editUrl, seteditUrl] = useState('rsmargono.go.id')
    const [editAdd, seteditAdd] = useState('Jl. Dr. Gumbreg No.1, Kebontebu, Berkoh, Kec. Purwokerto Selatan, Kab. Banyumas, Jawa Tengah')
    const [editCity, seteditCity] = useState('Purwokerto')
    const [editKodePos, seteditKodePos] = useState('53146')
    const [editKodeProv, seteditKodeProv] = useState('33')
    const [editKodeCity, seteditKodeCity] = useState('3302')
    const [editKodeDistrict, seteditKodeDistrict] = useState('330224')
    const [editKodeVillage, seteditKodeVillage] = useState('3302241003')
    const [editPhysicalType, seteditPhysicalType] = useState('ro')
    const [editGedung, seteditGedung] = useState(null)
    const [editLong, seteditLong] = useState(null)
    const [editLat, seteditLat] = useState(null)
    const [editPosisi, setEditPosisi] = useState(null)
    const [editManaging, seteditManaging] = useState(null)
    // spin
    const [spbtn, setspbtn] = useState(false)
    const [spCardCreateLocation, setspCardCreateLocation] = useState(false)
    const [spTbLocation, setspTbLocation] = useState(false)
    // md
    const [mdCreate, setmdCreate] = useState(false)
    const [mdEdit, setmdEdit] = useState(false)
    // ip host
    const [clientip, setclientip] = useState(ip)
    const [clienthost, setclienthost] = useState(host)

    useEffect(() => {
        getDetailEnv(env)
    }, [])

    // get environment
    const getDetailEnv = (data) => {
        setspTbLocation(true)
        axios
            .get(`${baseURL}SatuSehat/GetEnvbyEnv/${data}`, options)
            .then((response) => {
                setspTbLocation(false)
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
                            setOrgIhsNum(response.data.result.org_id)
                            setSSTokenExp(response.data.result.expired)
                            settempA(1)
                            console.log('detail Env : ', response.data)
                        },
                    });

                }
            })
            .catch((err) => {
                setspTbLocation(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Detail Environment! -> ${err}`,
                });
            });
    }

    // get token
    // const SatuSehatGetToken = () => {
    //     setspCardCreateLocation(true)
    //     axios
    //         .post(`${baseURL}SatuSehat/Token`, {
    //             headers: options.headers,
    //         })
    //         .then((res) => {
    //             console.log('satuSehat : ', res);
    //             setspCardCreateLocation(false)
    //             if (res.status === 200) {
    //                 setsstoken(res.data.access_token)
    //             } else {
    //                 Modal.error({
    //                     title: 'Gagal!',
    //                     content: `Gagal mengambil Token SATUSEHAT!`,
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             setspCardCreateLocation(false)
    //             Modal.error({
    //                 title: "ERROR!",
    //                 content: `ERROR!, melakukan proses mengambil Token SATUSEHAT! -> ${err}`,
    //             });
    //         });
    // }

    const getGroupLayanan = () => {
        setspbtn(true)
        axios
            .get(`${baseURL}SatuSehat/lookupgrouplayanan`, options)
            .then((response) => {
                setspbtn(false)
                console.log('response : ', response.data);
                if (response.data.result.length !== 0) {
                    setlistGrpLayanan(response.data.result)
                } else {
                    setlistGrpLayanan([]);
                    Modal.info({
                        title: "Informasi",
                        content: 'Tidak ada data Group Layanan.',
                    });
                }
            })
            .catch((err) => {
                setspbtn(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Master Group Layanan! -> ${err}`,
                });
            });
    }

    const getRuang = (data) => {
        setspbtn(true)
        axios
            .get(`${baseURL}SatuSehat/lookupssidruangan/${data}/2/${env}`, options)
            .then((response) => {
                setspbtn(false)
                console.log('response : ', response.data);
                if (response.data.result.length !== 0) {
                    setlistRuang(response.data.result)
                } else {
                    setlistRuang([]);
                    Modal.info({
                        title: "Informasi",
                        content: 'Tidak ada data Master Ruangan.',
                    });
                }
            })
            .catch((err) => {
                setspbtn(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Master Ruangan! -> ${err}`,
                });
            });
    }

    const getOrg = () => {
        setspbtn(true)
        axios
            .get(`${baseURL}SatuSehat/lookuporganization/${env}`, options)
            .then((response) => {
                setspbtn(false)
                console.log('response : ', response.data);
                if (response.data.result.length !== 0) {
                    setlistOrg(response.data.result)
                } else {
                    setlistOrg([]);
                    Modal.info({
                        title: "Informasi",
                        content: 'Tidak ada data Master Organization.',
                    });
                }
            })
            .catch((err) => {
                setspbtn(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Master Organization! -> ${err}`,
                });
            });
    }

    const insertSSIdLocation = (data) => {
        // setspCardCreateLocation(true)
        axios
            .post(`${baseURL}SatuSehat/insertssidlocation`, data, {
                headers: options.headers,
            })
            .then((res) => {
                // setspCardCreateLocation(false)
                console.log('satuSehat : ', res);
                console.log('satuSehat data : ', res.data.statusCode);
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan data SSId Master Location.",
                        onOk: () => {
                            getLocation(groupLayananList)
                        },
                    });
                }
            })
            .catch((err) => {
                // setspCardCreateLocation(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! Menyimpan data SSId Master Location! -> ${err}`,
                });
            });
    }

    const createLocation = (data) => {
        setspCardCreateLocation(true)
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
                .post(`${baseURL}SatuSehat/Location/${sstoken}/${encodeURIComponent(baseUrlSS)}`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    setspCardCreateLocation(false)
                    console.log('satuSehat : ', res);
                    // console.log('satuSehat data : ', res.data.result);
                    if (res.data.result.resourceType === 'Location') {
                        setruangIdSatuSehat(res.data.result.id)
                        setmdCreate(false)
                        Modal.success({
                            title: "Sukses",
                            content: `Berhasil Membuat data Master Location. Id Satu Sehat : ${res.data.result.id}`,
                            onOk: () => {
                                let data = {
                                    ruangId: ruangId,
                                    satuSehatId: res.data.result.id,
                                    clientHost: clienthost,
                                    clientIP: clientip,
                                    environment: env,
                                }
                                insertSSIdLocation(data)
                            },
                        });
                    }
                    else {
                        Modal.error({
                            title: "Gagal!",
                            content: 'Gagal! Menambah ruang SatuSehat!',
                        });
                    }
                    // setresPostEncounter(res.data.result)
                    // setidEncounter(res.data.result.id)
                })
                .catch((err) => {
                    setspCardCreateLocation(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! Membuat lokasi SatuSehat! -> ${err}`,
                    });
                });
        }

    }

    const getLocation = (data) => {
        setspTbLocation(true)
        axios
            .get(`${baseURL}SatuSehat/lookupssidruangan/${data}/1/${env}`, options)
            .then((response) => {
                setspTbLocation(false)
                console.log('response : ', response.data);
                if (response.data.result.length !== 0) {
                    setlistSSIdRuang(response.data.result)
                } else {
                    setlistSSIdRuang([]);
                    Modal.info({
                        title: "Informasi",
                        content: 'Tidak ada data SS Id Master Ruang.',
                    });
                }
            })
            .catch((err) => {
                setspTbLocation(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data SS Id Master Ruang! -> ${err}`,
                });
            });
    }

    const getLocationbySSId = (data) => {
        setspTbLocation(true)
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        settempA(0)

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");
        console.log('selisih menit : ', selisihMenit);

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit > 0) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            settempA(1)
        }

        if (tempA === 1) {
            axios
                .get(`${baseURL}SatuSehat/LocationId/${data}/${sstoken}/${encodeURIComponent(baseUrlSS)}`, options)
                .then((response) => {
                    setspTbLocation(false)
                    console.log('response : ', response.data);
                    if (response.data.statusCode === 200) {
                        setmdEdit(true)
                        seteditId(response.data.result.id)
                        seteditidentSys(response.data.result.identifier[0].system)
                        seteditidentVal(response.data.result.identifier[0].value)
                        seteditstatus(response.data.result.status)
                        seteditName(response.data.result.name)
                        seteditDesk(response.data.result.description)
                        seteditMode(response.data.result.mode)
                        seteditPhone(response.data.result.telecom[0].value)
                        seteditEmail(response.data.result.telecom[1].value)
                        seteditUrl(response.data.result.telecom[2].value)

                        console.log('address : ', Object.entries(response.data.result.address).length);
                        seteditAdd(Object.entries(response.data.result.address).length === 0 ? null : response.data.result.address.line[0])
                        seteditCity(Object.entries(response.data.result.address).length !== 0 ? response.data.result.address.city : null)
                        seteditKodePos(Object.entries(response.data.result.address).length !== 0 ? response.data.result.address.postalCode : null)
                        seteditKodeProv(Object.entries(response.data.result.address).length !== 0 ? response.data.result.address.extension[0].extension[0].valueCode : null)
                        seteditKodeCity(Object.entries(response.data.result.address).length !== 0 ? response.data.result.address.extension[0].extension[1].valueCode : null)
                        seteditKodeDistrict(Object.entries(response.data.result.address).length !== 0 ? response.data.result.address.extension[0].extension[2].valueCode : null)
                        seteditKodeVillage(Object.entries(response.data.result.address).length !== 0 ? response.data.result.address.extension[0].extension[3].valueCode : null)
                        seteditPhysicalType(response.data.result.physicalType.coding[0].code)
                        seteditGedung(null)
                        seteditLong(response.data.result.position.longitude)
                        seteditLat(response.data.result.position.latitude)

                        let temp = response.data.result.managingOrganization.reference;
                        let temp1 = temp.replace("Organization/", "");
                        seteditManaging(temp1)
                    } else {
                        // setlistSSIdRuang([]);
                        Modal.info({
                            title: "Gagal",
                            content: 'Gagal, GET data Location by SSId di SatuSehat!',
                        });
                    }
                })
                .catch((err) => {
                    setspTbLocation(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! GET data Location by SSId di SatuSehat! -> ${err}`,
                    });
                });
        }
    }

    const editLocation = (data, id) => {
        setspCardCreateLocation(true)
        // console.log('token url : ', SSToken, encodeURIComponent(baseUrlSS));

        settempA(0)

        // Waktu 1 dalam format ISO
        const waktu1 = dayjs(SSTokenExp);

        // Waktu 2 adalah waktu sekarang
        const waktu2 = dayjs();

        // Menghitung selisih waktu dalam menit
        const selisihMenit = waktu2.diff(waktu1, "minute");
        console.log('selisih menit : ', selisihMenit);

        // Menentukan jika selisih lebih dari 45 menit
        if (selisihMenit > 0) {
            // Lakukan sesuatu jika lebih dari 45 menit
            console.log("Lebih dari 45 menit");

            getDetailEnv(env);
        } else {
            // Lakukan sesuatu jika kurang dari 45 menit
            console.log("Kurang dari atau sama dengan 45 menit");
            settempA(1)
        }

        if (tempA === 1) {
            axios
                .put(`${baseURL}SatuSehat/Location/${id}/${sstoken}/${encodeURIComponent(baseUrlSS)}`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    setspCardCreateLocation(false)
                    console.log('satuSehat : ', res);
                    console.log('satuSehat data : ', res.data.result);
                    if (res.data.result.hasOwnProperty('issue')) {
                        Modal.error({
                            title: "Gagal!",
                            content: `Gagal! Edit ruang di SatuSehat! -> ${res.data.result.issue[0].diagnostics}`,
                        });
                    }
                    else {
                        setruangIdSatuSehat(res.data.result.id)
                        setmdEdit(false)
                        Modal.success({
                            title: "Sukses",
                            content: `Berhasil Edit data ruang di Satu Sehat : ${res.data.result.name}`,
                        });
                    }
                    // setresPostEncounter(res.data.result)
                    // setidEncounter(res.data.result.id)
                })
                .catch((err) => {
                    setspCardCreateLocation(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! Edit lokasi SatuSehat! -> ${err}`,
                    });
                });
        }
    }

    return (
        <SatuSehatLocationContext.Provider
            value={{
                // state
                listGrpLayanan, setlistGrpLayanan,
                groupLayanan, setgroupLayanan,
                groupLayananList, setgroupLayananList,
                listRuang, setlistRuang,
                // create
                ruangId, setruangId,
                ruangIdSatuSehat, setruangIdSatuSehat,
                namaRuang, setnamaRuang,
                stsActive, setstsActive,
                deskGedung, setdeskGedung,
                mode, setmode,
                telp, settelp,
                email, setemail,
                url, seturl,
                addr, setaddr,
                city, setcity,
                kodePos, setkodePos,
                kodeProv, setkodeProv,
                kodeCity, setkodeCity,
                kodeDistrict, setkodeDistrict,
                kodeVillage, setkodeVillage,
                gedung, setgedung,
                listOrg, setlistOrg,
                listSSIdRuang, setlistSSIdRuang,
                org, setorg,
                sstoken, setsstoken,
                OrgIhsNum, setOrgIhsNum,
                // edit
                editId, seteditId,
                editidentSys, seteditidentSys,
                editidentVal, seteditidentVal,
                editstatus, seteditstatus,
                editName, seteditName,
                editDesk, seteditDesk,
                editMode, seteditMode,
                editPhone, seteditPhone,
                editEmail, seteditEmail,
                editUrl, seteditUrl,
                editAdd, seteditAdd,
                editCity, seteditCity,
                editKodePos, seteditKodePos,
                editKodeProv, seteditKodeProv,
                editKodeCity, seteditKodeCity,
                editKodeDistrict, seteditKodeDistrict,
                editKodeVillage, seteditKodeVillage,
                editPhysicalType, seteditPhysicalType,
                editGedung, seteditGedung,
                editLong, seteditLong,
                editLat, seteditLat,
                editPosisi, setEditPosisi,
                editManaging, seteditManaging,
                // func
                getGroupLayanan,
                getRuang,
                getOrg,
                // SatuSehatGetToken,
                createLocation,
                getLocation,
                getLocationbySSId,
                editLocation,
                // spin
                spbtn, setspbtn,
                spCardCreateLocation, setspCardCreateLocation,
                spTbLocation, setspTbLocation,
                // md
                mdCreate, setmdCreate,
                mdEdit, setmdEdit,
            }}>
            {props.children}
        </SatuSehatLocationContext.Provider>
    )
}

export default SatuSehatLocationContextProvider