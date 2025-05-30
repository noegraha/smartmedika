import axios from 'axios';
import React, { createContext, useContext, useState } from 'react';
import { LoginContext } from '../../../../rawatjalan/context';
import { Modal } from 'antd';

export const MapLoincContext = createContext();

const MapLoincContextProvider = (props) => {
    const { token, namauser } = useContext(LoginContext);
    const options = {
        headers: { Authorization: "Bearer " + token },
    };

    const ipEndpoint = sessionStorage.getItem("apiPenunjang");
    const baseURL = `${ipEndpoint}/`;
    const env = sessionStorage.getItem("environment");

    const [detailLoinc, setdetailLoinc] = useState(null);
    const [pemeriksaan, setpemeriksaan] = useState(null);
    const [mdBrowserLc, setmdBrowserLc] = useState(false);
    const [mdDtLoinc, setmdDtLoinc] = useState(null);
    const [flagDtLoinc, setflagDtLoinc] = useState(false);

    const getRuang = async () => {
        try {
            let user = sessionStorage.getItem("user");
            let grupId = 4;
            const response = await axios.get(
                `${baseURL}SisJwt/RuangByUser/${user}/%20/${grupId}/%20`, options
            );

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        };
    };

    const getPemeriksaan = async (sRuangId) => {
        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/getPemeriksaan/${sRuangId}`, options
            );

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                console.log("getPemeriksaan : ", data);

                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        };
    };

    const lookupBrowserLoinc = async (sKtg) => {
        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/LookupLOINC/${sKtg}`, options
            );

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        };
    };

    const getDetailLoinc = async (sCode) => {
        try {
            const response = await axios.get(
                `${baseURL}SatuSehat/GetDetailLoinc/${sCode}`, options
            );

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                console.log("getPemeriksaan : ", data);

                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            Modal.error({
                title: "ERROR!",
                content: `ERROR! GET data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        };
    };

    const InsertLoinc = async (payload) => {
        try {
            const response = await axios.post(
                `${baseURL}SatuSehat/InsertLoinc`, payload, {
                headers: options.headers,
            });

            console.log("InsertLoinc : ", response);

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            Modal.error({
                title: "ERROR!",
                content: `ERROR! POST data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    const UpdateLoinc = async (payload) => {
        try {
            const response = await axios.post(
                `${baseURL}SatuSehat/UpdateLoinc`, payload, {
                headers: options.headers,
            });

            // console.log("UpdateLoinc : ", response);

            if (response.data.statusCode === 200) {
                let data = response.data.result;
                return data; // Kembalikan nilai data
            } else {
                return []; // Kembalikan array kosong jika response tidak sukses
            }
        } catch (err) {
            Modal.error({
                title: "ERROR!",
                content: `ERROR! POST data! -> ${err}`,
            });
            return null; // Kembalikan null jika terjadi error
        }
    };

    return (
        <MapLoincContext.Provider
            value={{
                detailLoinc, setdetailLoinc,
                pemeriksaan, setpemeriksaan,
                mdBrowserLc, setmdBrowserLc,
                mdDtLoinc, setmdDtLoinc,
                flagDtLoinc, setflagDtLoinc,
                getRuang,
                getPemeriksaan,
                getDetailLoinc,
                lookupBrowserLoinc,
                InsertLoinc,
                UpdateLoinc,
            }}
        >
            {props.children}
        </MapLoincContext.Provider>
    );
};

export default MapLoincContextProvider;