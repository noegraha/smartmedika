/* eslint-disable react-hooks/exhaustive-deps */
import { message, Modal } from 'antd';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { LoginContext } from '../../../rawatjalan/context';
import dayjs from "dayjs";

export const SatuSehatOrganizationContext = createContext();

// const baseURL = "http://182.168.6.72:5577/"
// const baseURL = "http://182.168.7.251:5577/"
// const baseURL = "http://182.168.0.119/api/"

const SatuSehatOrganizationContextProvider = (props) => {
    const { token, namauser } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const ipEndpoint = sessionStorage.getItem("apiPenunjang");

    const baseURL = ipEndpoint + "/";
    const ip = sessionStorage.getItem("IP");
    const host = sessionStorage.getItem("Host");
    const env = sessionStorage.getItem("environment")

    // list
    const [listOrg, setlistOrg] = useState([])

    const [SSToken, setSSToken] = useState('')
    const [SSTokenExp, setSSTokenExp] = useState()
    const [tempA, settempA] = useState()
    // get
    const [OrgListPartOf, setOrgListPartOf] = useState([])
    const [OrgListGetPartOf, setOrgListGetPartOf] = useState([
        {
            resourceid: '10000060',
            resourcename: 'RSUD Prof. Dr. Margono Soekarjo Purwokerto'
        }
    ])
    const [OrgPartOfGet, setOrgPartOfGet] = useState('10000060')
    const [detailEnv, setdetailEnv] = useState({})
    const [baseUrlSS, setbaseUrlSS] = useState()
    // create
    const [OrgIdentUse, setOrgIdentUse] = useState('official')
    const [OrgIhsNum, setOrgIhsNum] = useState()
    const [OrgIdentValue, setOrgIdentValue] = useState('')
    const [OrgIdentActive, setOrgIdentActive] = useState('')
    const [OrgType, setOrgType] = useState('')
    const [OrgName, setOrgName] = useState('')
    const [OrgPartOf, setOrgPartOf] = useState('')
    const [OrgTelcPhone, setOrgTelcPhone] = useState('0281 - 632708')
    const [OrgTelcEmail, setOrgTelcEmail] = useState('rsmargono@jatengprov.go.id')
    const [OrgTelcUrl, setOrgTelcUrl] = useState('rsmargono.go.id')
    const [OrgAddresse, setOrgAddresse] = useState('Jl. Dr. Gumbreg No.1, Kebontebu, Berkoh, Kec. Purwokerto Selatan, Kab. Banyumas, Jawa Tengah 53146')
    // edit
    const [OrgEditId, setOrgEditId] = useState('')
    const [ipKomp, setipKomp] = useState(ip)
    const [hostKomp, sethostKomp] = useState(host)
    // spin
    const [spGetToken, setspGetToken] = useState(false)
    const [spCreateOrganization, setspCreateOrganization] = useState(false)
    const [spEditOrganization, setspEditOrganization] = useState(false)
    const [spGetOrganization, setspGetOrganization] = useState(false)
    // == GET IHS PATIENT BY NIK
    const [satuSehatNik, setsatuSehatNik] = useState('9271060312000001')
    const [satuSehatNikPraktisi, setsatuSehatNikPraktisi] = useState('7209061211900001')
    const [IHSPAtient, setIHSPAtient] = useState('')
    const [IHSPraktisi, setIHSPraktisi] = useState('')
    const [resGetPasien, setresGetPasien] = useState('')
    const [resGetPraktisi, setresGetPraktisi] = useState('')
    const [resPostEncounter, setresPostEncounter] = useState({})
    const [resGetEncounter, setresGetEncounter] = useState({})
    const [regPas, setregPas] = useState('2210130001')
    const [satuSehatStatus, setsatuSehatStatus] = useState('arrived')
    const [satuSehatNmPas, setsatuSehatNmPas] = useState('')
    const [satuSehatNmPrak, setsatuSehatNmPrak] = useState('')
    const [periodStart, setperiodStart] = useState(dayjs())
    const [periodEnd, setperiodEnd] = useState(dayjs().add(1, 'hours'))
    const [satuSehatLokasi, setsatuSehatLokasi] = useState('Location/ef011065-38c9-46f8-9c35-d1fe68966a3e')
    const [satuSehatNmLokasi, setsatuSehatNmLokasi] = useState('Ruang 1A, Poliklinik Rawat Jalan')
    const [idEncounter, setidEncounter] = useState('')
    const [idEncounterGet, setidEncounterGet] = useState('5426cd2a-22d1-40e7-9ca0-1fc7777801e1')
    // spin
    const [spGetIhsPatient, setspGetIhsPatient] = useState(false)
    const [spGetIhsPraktisi, setspGetIhsPraktisi] = useState(false)
    const [spGetEncounter, setspGetEncounter] = useState(false)
    // modal
    const [mdCreateOrg, setmdCreateOrg] = useState(false)
    const [mdEditOrg, setmdEditOrg] = useState(false)

    useEffect(() => {
        getOrganizationLokal()
        getDetailEnv(env)
    }, [])

    // get token
    // const SatuSehatGetToken = (data) => {
    //     setspGetOrganization(true)
    //     axios
    //         .post(`${baseURL}SatuSehat/Token`, data, {
    //             headers: options.headers,
    //         })
    //         .then((res) => {
    //             console.log('satuSehat : ', res);
    //             setspGetOrganization(false)
    //             if (res.status === 200) {
    //                 setSSToken(res.data.access_token)
    //             } else {
    //                 Modal.error({
    //                     title: 'Gagal!',
    //                     content: `Gagal mengambil Token SATUSEHAT!`,
    //                 });
    //             }
    //         })
    //         .catch((err) => {
    //             setspGetOrganization(false)
    //             Modal.error({
    //                 title: "ERROR!",
    //                 content: `ERROR!, melakukan proses mengambil Token SATUSEHAT! -> ${err}`,
    //             });
    //         });
    // }

    // get ihs pasien
    const getPasinbyNIK = (data) => {
        setspGetIhsPatient(true)
        axios
            .get(`${baseURL}SatuSehat/GetPasienByNIK/${data}/${SSToken}`, options)
            .then((response) => {
                // console.log("getPasinbyNIK : ", response.data[0]);
                // console.log(ihs);
                setspGetIhsPatient(false)
                let ihs = response.data[0].resource.id
                setresGetPasien(response.data[0])
                setIHSPAtient(ihs)
                setsatuSehatNmPas(response.data[0].resource.name[0].text)
            })
    }

    // get ihs praktisi
    const getPraktisibyNIK = (data) => {
        setspGetIhsPraktisi(true)
        axios
            .get(`${baseURL}SatuSehat/GetPractitionerByNIK/${data}/${SSToken}`, options)
            .then((response) => {
                // console.log("getPasinbyNIK : ", response.data[0]);
                // console.log(ihs);
                setspGetIhsPraktisi(false)
                let ihs = response.data[0].resource.id
                setresGetPraktisi(response.data[0])
                setIHSPraktisi(ihs)
                setsatuSehatNmPrak(response.data[0].resource.name[0].text)
            })
    }

    // get Organization by Part Of Id
    const getOrganization = (data) => {
        setspGetOrganization(true)
        axios
            .get(`${baseURL}SatuSehat/GetOrganizationByPartOf/${data}/${SSToken}`, options)
            .then((response) => {
                setspGetOrganization(false)
                console.log('response : ', response.data);
                if (response.data.length !== 0) {

                    let array = []
                    let len = response.data.length;
                    let data = response.data;

                    let data2 = OrgListGetPartOf

                    for (let i = 0; i < len; i++) {
                        let data1 = {}
                        data1.resourceactive = data[i].resource.active
                        data1.resourceaddress = data[i].resource.address[0].line[0]
                        data1.resourceid = data[i].resource.id
                        data1.resourceidentvalue = data[i].resource.identifier[0].value
                        data1.resourceupdate = data[i].resource.meta.lastUpdated
                        data1.resourcename = data[i].resource.name
                        data1.resourcepartof = data[i].resource.partOf.reference.replace('Organization/', '');
                        data1.resourcetelephone = data[i].resource.telecom[0].value
                        data1.resourceteleemail = data[i].resource.telecom[1].value
                        data1.resourceteleurl = data[i].resource.telecom[2].value
                        data1.resourcetype = data[i].resource.type[0].coding[0].display
                        data1.resourcetypecode = data[i].resource.type[0].coding[0].code

                        array.push(data1);
                        data2.push(data1);
                    }

                    console.log('data2 : ', data2);

                    console.log(array);
                    setOrgListPartOf(array)
                    setOrgListGetPartOf(data2)
                } else {
                    setOrgListPartOf([]);
                    message.warning('Tidak ada List Organization by Part of.');
                }
            })
            .catch((err) => {
                setspGetOrganization(false)
                message.error(`ERROR mengambil data List Organization! -> ${err}`);
            });
    }

    // create Organization
    const createOrganization = (data) => {
        setspCreateOrganization(true)
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
                .post(`${baseURL}SatuSehat/Organization/${SSToken}/${encodeURIComponent(baseUrlSS)}`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    setspCreateOrganization(false)
                    console.log('createOrganization : ', res);
                    if (res.data.result.resourceType === 'Organization') {
                        Modal.success({
                            title: "Sukses",
                            content: `Berhasil Membuat data Master Organization. Id Satu Sehat : ${res.data.result.id}`,
                            onOk: () => {
                                let data = {}
                                data.id = res.data.result.id;
                                data.system = OrgIhsNum;
                                data.value = res.data.result.identifier[0].value;
                                data.active = res.data.result.active;
                                data.type = res.data.result.type[0].coding[0].code;
                                data.name = res.data.result.name;
                                data.partOf = res.data.result.partOf.reference.substring("Organization/".length);
                                data.phone = res.data.result.telecom[0].value;
                                data.email = res.data.result.telecom[1].value;
                                data.url = res.data.result.telecom[2].value;
                                data.address = res.data.result.address[0].line[0];
                                data.environment = env;
                                data.lastUpdate = dayjs(res.data.result.meta.lastUpdated).format('YYYY-MM-DDTHH:mm:ss');
                                data.clientHost = ipKomp;
                                data.clientIP = hostKomp;
                                // KURANG FIELD ENVIRONMENT, SAMA REFRESH TOKEN KLO KIRIM!!!!
                                simpanOrgDb(data)
                                setmdCreateOrg(false)
                            },
                        });
                    }
                    else {
                        Modal.error({
                            title: "Gagal!",
                            content: 'Gagal! Menambah Organization SatuSehat!',
                        });
                    }
                })
                .catch((err) => {
                    setspCreateOrganization(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! Membuat Organization SatuSehat! -> ${err}`,
                    });
                });
        }

    }

    // edit Organization
    const editOrganization = (data) => {
        setspEditOrganization(true)
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
                .put(`${baseURL}SatuSehat/Organization/${data.id}/${SSToken}/${encodeURIComponent(baseUrlSS)}`, data, {
                    headers: options.headers,
                })
                .then((res) => {
                    setspEditOrganization(false)
                    console.log('createOrganization : ', res);
                    if (res.data.result.resourceType === 'Organization') {
                        Modal.success({
                            title: "Sukses",
                            content: `Berhasil Ubah data Master Organization. Id Satu Sehat : ${res.data.result.id}`,
                            onOk: () => {
                                let data = {}
                                data.id = res.data.result.id;
                                data.system = OrgIhsNum;
                                data.value = res.data.result.identifier[0].value;
                                data.active = res.data.result.active;
                                data.type = res.data.result.type[0].coding[0].code;
                                data.name = res.data.result.name;
                                data.partOf = res.data.result.partOf.reference.substring("Organization/".length);
                                data.phone = res.data.result.telecom[0].value;
                                data.email = res.data.result.telecom[1].value;
                                data.url = res.data.result.telecom[2].value;
                                data.address = res.data.result.address[0].line[0];
                                data.environment = env;
                                data.lastUpdate = dayjs(res.data.result.meta.lastUpdated).format('YYYY-MM-DDTHH:mm:ss');
                                data.clientHost = ipKomp;
                                data.clientIP = hostKomp;
                                simpanOrgDb(data)
                                setmdEditOrg(false)
                            },
                        });
                    }
                    else {
                        Modal.error({
                            title: "Gagal!",
                            content: 'Gagal! Ubah Organization SatuSehat!',
                        });
                    }
                })
                .catch((err) => {
                    setspCreateOrganization(false)
                    Modal.error({
                        title: "ERROR!",
                        content: `ERROR! Ubah Organization SatuSehat! -> ${err}`,
                    });
                });
        }

    }

    // create ENCOUNTER
    const createEncounter = (data) => {
        axios
            .post(`${baseURL}SatuSehat/Encounter/${SSToken}`, data, {
                headers: options.headers,
            })
            .then((res) => {
                console.log('satuSehat : ', res);
                console.log('satuSehat data : ', res.data.result);
                setresPostEncounter(res.data.result)
                setidEncounter(res.data.result.id)
            })
    }

    // get ENCOUNTER
    const getEncounterbyId = (data) => {
        setspGetEncounter(true)
        axios
            .get(`${baseURL}SatuSehat/EncounterById/${data}/${SSToken}`, options)
            .then((response) => {
                // console.log("getEncounterbyId : ", response);
                // console.log("getEncounterbyId-1: ", response.data.result);
                setspGetEncounter(false)
                setresGetEncounter(response.data.result)
            })
    }

    // get mst organization db lokal
    const getOrganizationLokal = () => {
        setspGetOrganization(true)
        axios
            .get(`${baseURL}SatuSehat/lookuporganization/${env}`, options)
            .then((response) => {
                setspGetOrganization(false)
                console.log('getOrganizationLokal : ', response);
                if (response.data.statusCode === 200) {
                    if (response.data.result !== 0) {
                        setlistOrg(response.data.result)
                    } else {
                        setlistOrg([]);
                        Modal.info({
                            title: "Info",
                            content: 'Tidak ada data Organization.',
                        });
                    }
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal! GET data Master Organization! -> ${response.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspGetOrganization(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Master Organization! -> ${err}`,
                });
            });
    }

    // get environment
    const getDetailEnv = (data) => {
        setspGetOrganization(true)
        axios
            .get(`${baseURL}SatuSehat/GetEnvbyEnv/${data}`, options)
            .then((response) => {
                setspGetOrganization(false)
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
                            setSSToken(response.data.result.token)
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
                setspGetOrganization(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR! GET data Detail Environment! -> ${err}`,
                });
            });
    }

    // simpan org ke db
    const simpanOrgDb = (data) => {
        setspGetOrganization(true)
        axios
            .post(`${baseURL}SatuSehat/insertorganization`, data, {
                headers: options.headers,
            })
            .then((res) => {
                setspGetOrganization(false)
                console.log('satuSehat : ', res);
                console.log('satuSehat data : ', res.data.statusCode);
                if (res.data.statusCode === 200) {
                    Modal.success({
                        title: "Sukses",
                        content: "Berhasil Disimpan data Master Organization.",
                        onOk: () => {
                            getOrganizationLokal()
                        },
                    });
                }
                else {
                    Modal.error({
                        title: "Gagal!",
                        content: `Gagal Disimpan data Master Organization! -> ${res.data.message}`,
                    });
                }
            })
            .catch((err) => {
                setspGetOrganization(false)
                Modal.error({
                    title: "ERROR!",
                    content: `ERROR Disimpan data Master Organization! -> ${err}`,
                });
            });
    }

    return (
        <SatuSehatOrganizationContext.Provider
            value={{
                // list
                listOrg, setlistOrg,
                SSToken, setSSToken,
                SSTokenExp, setSSTokenExp,
                detailEnv,
                baseUrlSS, setbaseUrlSS,
                // get
                OrgListPartOf, setOrgListPartOf,
                OrgPartOfGet, setOrgPartOfGet,
                OrgListGetPartOf, setOrgListGetPartOf,
                // create
                OrgIdentUse, setOrgIdentUse,
                OrgIhsNum, setOrgIhsNum,
                OrgIdentValue, setOrgIdentValue,
                OrgIdentActive, setOrgIdentActive,
                OrgType, setOrgType,
                OrgName, setOrgName,
                OrgPartOf, setOrgPartOf,
                OrgTelcPhone, setOrgTelcPhone,
                OrgTelcEmail, setOrgTelcEmail,
                OrgTelcUrl, setOrgTelcUrl,
                OrgAddresse, setOrgAddresse,
                // edit
                OrgEditId, setOrgEditId,
                ipKomp, setipKomp,
                hostKomp, sethostKomp,
                // spin
                spGetToken, setspGetToken,
                spCreateOrganization, setspCreateOrganization,
                spEditOrganization, setspEditOrganization,
                spGetOrganization, setspGetOrganization,
                // modal
                mdCreateOrg, setmdCreateOrg,
                mdEditOrg, setmdEditOrg,
                //func
                // SatuSehatGetToken,
                getOrganization,
                createOrganization,
                editOrganization,
                getPasinbyNIK,
                getPraktisibyNIK,
                createEncounter,
                getEncounterbyId,
                simpanOrgDb,
                getOrganizationLokal,
                // GET IHS PATIENT BY NIK
                satuSehatNik, setsatuSehatNik,
                satuSehatNikPraktisi, setsatuSehatNikPraktisi,
                IHSPAtient, setIHSPAtient,
                IHSPraktisi, setIHSPraktisi,
                resGetPasien, setresGetPasien,
                resGetPraktisi, setresGetPraktisi,
                resGetEncounter, setresGetEncounter,
                resPostEncounter, setresPostEncounter,
                satuSehatNmPas, setsatuSehatNmPas,
                satuSehatNmPrak, setsatuSehatNmPrak,
                regPas, setregPas,
                satuSehatStatus, setsatuSehatStatus,
                periodStart, setperiodStart,
                periodEnd, setperiodEnd,
                satuSehatLokasi, setsatuSehatLokasi,
                satuSehatNmLokasi, setsatuSehatNmLokasi,
                idEncounter, setidEncounter,
                idEncounterGet, setidEncounterGet,
                // spin
                spGetIhsPatient, setspGetIhsPatient,
                spGetIhsPraktisi, setspGetIhsPraktisi,
                spGetEncounter, setspGetEncounter,
            }}
        >
            {props.children}
        </SatuSehatOrganizationContext.Provider>
    )
}

export default SatuSehatOrganizationContextProvider