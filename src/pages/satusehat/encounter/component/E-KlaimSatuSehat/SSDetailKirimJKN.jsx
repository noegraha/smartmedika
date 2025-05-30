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
import Triase from "./DataKlinis/KondisiPasienTiba/Triase";
import AssesmenNyeri from "./DataKlinis/AssesmenAwalIGD/AssesmenNyeri";
import Skrining from "./DataKlinis/Skrining/Skrining";
import RasionalKlinis from "./DataKlinis/RasionalKlinis/RasionalKlinis";
import Diagnosis from "./DataKlinis/Diagnosis/Diagnosis";
import PenilaianResiko from "./DataKlinis/PenilaianResiko/PenilaianResiko";
import KondisiPasienPulang from "./DataKlinis/RencanaTindakLanjut.jsx/KondisiPulang";
import PerencanaanPulangPasien from "./DataKlinis/RencanaTindakLanjut.jsx/PerencanaanPulangPasien";
import Diet from "./DataKlinis/Diet/Diet";
import Edukasi from "./DataKlinis/Edukasi/Edukasi";
import Prognosis from "./DataKlinis/Prognosis/Prognosis";
import ChargeItem from "./DataBilling/ChargeItem";
import MdDetailResorce from "./DataKlinis/MdDetailResorce";
import CaraKeluarRS from "./DataKlinis/CaraKeluarRS/CaraKeluarRS";
import ResumeMedis from "./ResumeMedis/ResumeMedis";
import SetNewClaim from "./EKlaim/SetNewClaim";
import Claim from "./Claim";
import BatchSend from "./EKlaim/BatchSend";
import SetClaimData from "./EKlaim/SetClaimData";

const SSDetailKirimJKN = () => {
    const {
        ruangId,
        ihsPasien,
        identitasPx,
        paramCoverage,
        paramEncounter,
        accountId,
        setparamCoverage,
        dataSepDummy,

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
    const [tabEklaim, settabEklaim] = useState("1");

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
            children: <Diet />,
        },
        {
            label: "Edukasi",
            key: "3",
            children: <Edukasi />,
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
        // {
        //     label: "Pemeriksaan Antopometri",
        //     key: "3",
        //     children: <PemAntopometri />,
        // },
    ];

    const itemsDataKlinis = [
        {
            label: "01.I.Kondisi Pasien Tiba",
            key: "1.I",
            children: (
                <>
                    <Triase />
                </>
            ),
            disabled: ruangId.slice(0, 2) === '95' ? false : true,
        },
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
            label: "03.Asesmen Awal IGD",
            key: "3.I",
            children: <AssesmenNyeri />,
            disabled: ruangId.slice(0, 2) === '95' ? false : true,
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
            label: "05.Skrining",
            key: "5.I",
            children: <Skrining />,
            disabled: ruangId.slice(0, 2) === '95' ? false : true,
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
            children: <RasionalKlinis />,
        },
        {
            label: "10.Diagnosis",
            key: "10",
            children: <Diagnosis />,
        },
        {
            label: "11.Penilaian Risiko",
            key: "11",
            children: <PenilaianResiko />,
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
            children: <Prognosis />,
            disabled: ruangId.slice(0, 2) === '91' || ruangId.slice(0, 2) === '93' ? false : true,
        },
        {
            label: "15.Rencana Pemulangan Pasien",
            key: "15",
            children: <PerencanaanPulangPasien />,
            disabled: ruangId.slice(0, 2) === '95' || ruangId.slice(0, 2) === '93' ? false : true,

        },
        {
            label: "16.Rencana Tindak Lanjut dan Instruksi Tindak Lanjut",
            key: "16",
            children: <RencanaTindakLanjut />,
        },
        {
            label: "17.Kondisi Saat Meninggalkan Fasyankes",
            key: "17",
            children: <KondisiPasienPulang />,
        },
        {
            label: "18.Cara Keluar dari Rumah Sakit",
            key: "18",
            children: <CaraKeluarRS />,
        },
        {
            label: "19.Resume Medis",
            key: "19",
            children: <ResumeMedis />,
        },
    ];

    const itemsEklaim = [
        {
            label: "New Claim",
            key: "1",
            children: <SetNewClaim />,
        },
        {
            label: "Set Claim Data",
            key: "2",
            children: <SetClaimData />,
        },
        // {
        //     label: "Grouping Stage 1",
        //     key: "4",
        //     children: <></>,
        // },
        // {
        //     label: "Grouping Stage 2",
        //     key: "5",
        //     children: <></>,
        // },
        // {
        //     label: "Claim Final & Send",
        //     key: "6",
        //     children: <></>,
        // },
        {
            label: "Batch Claim ",
            key: "7",
            children: <BatchSend />,
        }
    ]

    const onChange = (key) => {
        // console.log(key);
        settabKirimJKM(key);
        if (key === "2") {
            setparamCoverage((prevState) => ({
                ...prevState, // Salin properti lainnya
                NoPeserta: dataSepDummy.No_Kartu_Jkn  // Ubah properti 'name'
            }));
        } else if (key === "3" && !paramEncounter) {
            getParamEncounter(identitasPx.RegistrasiId);
        } else if (key === "4" && !accountId) {
            getAccountId(identitasPx.RegistrasiId);
        }
    };

    const changeTabDataKlinis = (key) => {
        settadDataKlnis(key);
    };

    const changeTabEklaim = (key) => {
        settabEklaim(key);
    }

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
        {
            label: "E-Klaim",
            key: "7",
            children: <>
                <Tabs
                    onChange={(e) => changeTabEklaim(e)}
                    type="card"
                    items={itemsEklaim}
                    activeKey={tabEklaim}
                />
            </>,
        },
        {
            label: "Claim",
            key: "8",
            children: <Claim />,
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

            <MdDetailResorce />
        </div>
    );
};

export default SSDetailKirimJKN;
