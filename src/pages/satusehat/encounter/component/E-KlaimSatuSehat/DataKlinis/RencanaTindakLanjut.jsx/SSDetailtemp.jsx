import { Card, Col, Row, Tabs } from "antd";
import React, { useContext, useState } from "react";
import IdentitasPx from "./IdentitasPx";
import Coverage from "./Coverage";
import { SatuSehatEncounterContext } from "../../context/SatuSehatEncounterContext";
import Encounter from "./Encounter";
import Account from "./Account";
import PageHeadPasien from "./PageHeadPasien";
import KeluhanUtama from "./DataKlinis/Anamnesis/KeluhanUtama";
import RiwayatPenyakit from "./DataKlinis/Anamnesis/RiwayatPenyakit";
import RiwayatAllergi from "./DataKlinis/Anamnesis/RiwayatAllergi";
import RiwayatPengobatan from "./DataKlinis/Anamnesis/RiwayatPengobatan";
import RiwayatPerjalanPenyakit from "./DataKlinis/RiwayatPerjalananPenyakit/RiwayatPerjalanPenyakit";
import TujuanPerawatan from "./DataKlinis/TujuanPerawatan/TujuanPerawatan";
import RencanaRawat from "./DataKlinis/RencanaRawat/RencanaRawat";
import InstruksiMedikKeperawatan from "./DataKlinis/InstruksiMedikKeperawatan/InstruksiMedikKeperawatan";
import PmrLaborat from "./DataKlinis/PemeriksaanPenunjang/PmrLaborat";
import MenuObat from "./DataKlinis/Obat/MenuObat";
import PemTTV from "./DataKlinis/PemeriksaanFisik/PemTTV";
import PemFisik from "./DataKlinis/PemeriksaanFisik/PemFisik";
import PemAntopometri from "./DataKlinis/PemeriksaanFisik/PemAntopometri";
import PemFungsionalADL from "./DataKlinis/PemeriksaanFungsional/PemPsikologisADL";
import MedisDiagnostik from "./DataKlinis/TindakanMedis/MedisDiagnostik";
import RencanaTindakLanjut from "./DataKlinis/RencanaTindakLanjut.jsx/RencanaTindakLanjut";
import MdDetailResorce from "./DataKlinis/MdDetailResorce";
import ChargeItem from "./DataBilling/ChargeItem";

const SSDetailKirimJKN = () => {
    const {
        ihsPasien,
        identitasPx,
        paramCoverage,
        paramEncounter,
        accountId,

        tabKirimJKM,
        settabKirimJKM,
        tadDataKlnis,
        settadDataKlnis,

        getParamCoverage,
        getParamEncounter,
        getAccountId,
    } = useContext(SatuSehatEncounterContext);

    const [tabAnamnesis, settabAnamnesis] = useState("1");
    const [tabTatalaksana, settabTatalaksana] = useState("1");
    const [tabPemFisik, settabPemFisik] = useState("1");

    const itemsAnamnesis = [
        {
            label: "Keluhan Utama",
            key: "1",
            children: <KeluhanUtama />,
        },
        {
            label: "Riwayat Penyakit",
            key: "3",
            children: <RiwayatPenyakit />,
        },
        {
            label: "Riwayat Alergi",
            key: "5",
            children: <RiwayatAllergi />,
        },
        {
            label: "Riwayat Pengobatan",
            key: "6",
            children: <RiwayatPengobatan />,
        },
    ];

    const itemsTatalaksana = [
        {
            label: "Obat",
            key: "1",
            children: <MenuObat />,
        },
        {
            label: "Diet",
            key: "2",
            children: <></>,
        },
        {
            label: "Edukasi",
            key: "3",
            children: <></>,
        },
    ];
    const itemsPemFisik = [
        {
            label: "Pemeriksaat Tanda Vital",
            key: "1",
            children: <PemTTV />,
        },
        {
            label: "Pemeriksaan Fisik",
            key: "2",
            children: <PemFisik />,
        },
        {
            label: "Pemeriksaan Antopometri",
            key: "3",
            children: <PemAntopometri />,
        },
    ];

    const itemsDataKlinis = [
        {
            label: "01.Anamnesis",
            key: "1",
            children: (
                <>
                    <Tabs
                        onChange={(e) => settabAnamnesis(e)}
                        type="card"
                        items={itemsAnamnesis}
                        activeKey={tabAnamnesis}
                    />
                </>
            ),
        },
        {
            label: "02.Hasil Pemeriksaan Fisik",
            key: "2",
            children: (
                <Tabs
                    onChange={(e) => settabPemFisik(e)}
                    type="card"
                    items={itemsPemFisik}
                    activeKey={tabPemFisik}
                />
            ),
        },
        {
            label: "03.Pemeriksaan Fungsional",
            key: "3",
            children: <PemFungsionalADL />,
        },
        {
            label: "04.Riwayat Perjalanan Penyakit",
            key: "4",
            children: <RiwayatPerjalanPenyakit />,
        },
        {
            label: "05.Tujuan Perawatan",
            key: "5",
            children: <TujuanPerawatan />,
        },
        {
            label: "06.Rencana Rawat Pasien",
            key: "6",
            children: <RencanaRawat />,
        },
        {
            label: "07.Instruksi Medik dan Keperawatan Pasien",
            key: "7",
            children: <InstruksiMedikKeperawatan />,
        },
        {
            label: "08.Pemeriksaan Penunjang",
            key: "8",
            children: (
                <div>
                    <PmrLaborat />
                </div>
            ),
        },
        {
            label: "09.Rasional Klinis",
            key: "9",
            children: <>Disini...</>,
        },
        {
            label: "10.Diagnosis",
            key: "10",
            children: <>Disini...</>,
        },
        {
            label: "11.Penilaian Risiko",
            key: "11",
            children: <>Disini...</>,
        },
        {
            label: "12.Tindakan/Prosedur Medis",
            key: "12",
            children: <MedisDiagnostik />,
        },

        {
            label: "13.Tatalaksana",
            key: "13",
            children: (
                <Tabs
                    onChange={(e) => settabTatalaksana(e)}
                    type="card"
                    items={itemsTatalaksana}
                    activeKey={tabTatalaksana}
                />
            ),
        },
        {
            label: "14.Prognosis",
            key: "14",
            children: <>Disini...</>,
        },
        {
            label: "15.Rencana Tindak Lanjut dan Instruksi Tindak Lanjut",
            key: "15",
            children: <RencanaTindakLanjut />,
        },
        {
            label: "16.Kondisi Saat Meninggalkan Fasyankes",
            key: "16",
            children: <>Disini...</>,
        },
        {
            label: "17.Cara Keluar dari Rumah Sakit",
            key: "17",
            children: <>Disini...</>,
        },
        {
            label: "18.Resume Medis",
            key: "18",
            children: <>Disini...</>,
        },
    ];

    const onChange = (key) => {
        // console.log(key);
        settabKirimJKM(key);
        if (key === "2" && !paramCoverage) {
            getParamCoverage(identitasPx.RegistrasiId);
        } else if (key === "3" && !paramEncounter) {
            getParamEncounter(identitasPx.RegistrasiId);
        } else if (key === "4" && !accountId) {
            getAccountId(identitasPx.RegistrasiId);
        }
    };

    const changeTabDataKlinis = (key) => {
        settadDataKlnis(key);
    };

    const items = [
        {
            label: "Identitas Pasien",
            key: "1",
            children: <IdentitasPx />,
        },
        {
            label: "Coverage",
            key: "2",
            children: <Coverage />,
            disabled: !ihsPasien,
        },
        {
            label: "Encounter",
            key: "3",
            children: <Encounter />,
        },
        {
            label: "Account",
            key: "4",
            children: <Account />,
        },
        {
            label: "Data Klinis",
            key: "5",
            children: (
                <>
                    <Tabs
                        onChange={(e) => changeTabDataKlinis(e)}
                        type="card"
                        items={itemsDataKlinis}
                        activeKey={tadDataKlnis}
                    />
                </>
            ),
        },
        {
            label: "Billing",
            key: "6",
            children: <ChargeItem />,
        },
    ];

    return (
        <div>
            <Row style={{ marginBottom: "5px" }}>
                <Col span={24}>
                    <PageHeadPasien />
                </Col>
            </Row>
            <Tabs
                onChange={onChange}
                type="card"
                items={items}
                activeKey={tabKirimJKM}
            />

            {/* <MdDetailResorce /> */}
        </div>
    );
};

export default SSDetailKirimJKN;
