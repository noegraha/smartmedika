/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Col,
  Collapse,
  Modal,
  Row,
  Space,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { SatuSehatEncounterContext } from "../../../../satusehat/encounter/context/SatuSehatEncounterContext";
import HdContext from "../../HdContext";
import IdentitasPx from "../../../../satusehat/encounter/component/E-KlaimSatuSehat/IdentitasPx";
import dayjs from "dayjs";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import Encounter from "../../../../satusehat/encounter/component/E-KlaimSatuSehat/Encounter";
import FrmIdentitasPx from "../../../../satusehat/componentsatusehatmodul/component/FrmIdentitasPx";
import { SatuSehatModulContext } from "../../../../satusehat/componentsatusehatmodul/context/SatuSehatModulContext";
import FrmIhsPasien from "../../../../satusehat/componentsatusehatmodul/component/FrmIhsPasien";
import FrmEncounter from "../../../../satusehat/componentsatusehatmodul/component/FrmEncounter";
import FrmEpsOfCare from "../../../../satusehat/componentsatusehatmodul/component/FrmEpsOfCare";
import FrmCondKeluhanUtama from "../../../../satusehat/componentsatusehatmodul/component/FrmCondKeluhanUtama";
import KeluhanUtamaHD from "./KeluhanUtamaHD";
import MdSearchSnomed from "../../../../satusehat/componentsatusehatmodul/component/Modal/MdSearchSnomed";
import MdDetailRsc from "../../../../satusehat/componentsatusehatmodul/component/Modal/MdDetailRsc";
import FrmRiwPenyakit from "../../../../satusehat/componentsatusehatmodul/component/FrmRiwPenyakit";
import FrmObsFaktorResiko from "../../../../satusehat/componentsatusehatmodul/component/FrmObsFaktorResiko";
import FrmPmrFisik from "../../../../satusehat/componentsatusehatmodul/component/FrmPmrFisik";
import PmrFisikHD from "./PmrFisikHD";
import FrmObsTDSistolik from "../../../../satusehat/componentsatusehatmodul/component/FrmObsTDSistolik";
import FrmObsTDDiastolik from "../../../../satusehat/componentsatusehatmodul/component/FrmObsTDDiastolik";
import FrmObsBeratBadan from "../../../../satusehat/componentsatusehatmodul/component/FrmObsBeratBadan";
import FrmObsTinggiBadan from "../../../../satusehat/componentsatusehatmodul/component/FrmObsTinggiBadan";
import FrmObsStsPsikologis from "../../../../satusehat/componentsatusehatmodul/component/FrmObsStsPsikologis";
import FrmCondDiagnosis from "../../../../satusehat/componentsatusehatmodul/component/FrmCondDiagnosis";
import FrmProcProsedurMedis from "../../../../satusehat/componentsatusehatmodul/component/FrmProcProsedurMedis";
import FrmMedication from "../../../../satusehat/componentsatusehatmodul/component/FrmMedication";
import EdukasiHD from "./EdukasiHD";
import FrmProcEdukasi from "../../../../satusehat/componentsatusehatmodul/component/FrmProcEdukasi";
import FrmServReqRencanaTL from "../../../../satusehat/componentsatusehatmodul/component/FrmServReqRencanaTL";
import FrmCondMeninggalkanRS from "../../../../satusehat/componentsatusehatmodul/component/FrmCondMeninggalkanRS";
import FrmEncFinishHD from "../../../../satusehat/componentsatusehatmodul/component/FrmEncFinishHD";
import FinishHD from "./FinishHD";

const { PasiensContext } = HdContext;
const { Text } = Typography;

const SatuSehatHD = () => {
  const {
    rstNull,
    identitasPx,
    ihsPasien,
    paramEncounter,
    getDetailEnv,
    getIdentPx,
    getRiwayatDx,
    getParamEncounter,
  } = useContext(SatuSehatModulContext);

  const props = useContext(PasiensContext);

  const [keyColl, setkeyColl] = useState(null);
  const [isKey1Open, setIsKey1Open] = useState(false);

  useEffect(() => {
    getDetailEnv(sessionStorage.getItem("environment"));
    setkeyColl(null);
  }, [props.pasien]);

  // const klikEpsofCare = async () => {
  //     let link = `EpisodeOfCare?type=CKD&status=active&patient=${ihsPasien}`;
  //     let data = await getResourceById("skip", link);
  //     console.log('klikTest : ', data);
  //     setparamEpsofCare(null);
  //     setregEpsofCare(null);

  //     if (data.total === 0) {
  //         Modal.warning({
  //             title: "Perhatian!",
  //             content: 'Pasien belum didaftarkan Episode of Care Hemodialisa.',
  //         });
  //     }
  //     else {
  //         setparamEpsofCare(data.entry[0]);

  //         // Cari value berdasarkan system tertentu
  //         const registryIdObj = data.entry[0].resource.identifier.find(item =>
  //             item.system === "http://sys-ids.kemkes.go.id/episode-of-care/registry-id/"
  //         );

  //         const registryId = registryIdObj?.value;
  //         setregEpsofCare(registryId);
  //     };
  // };

  const items = [
    {
      key: "1",
      label: (
        <div onClick={() => getIdentPx(props.pasien.result.registrasiId)}>
          <Text strong>IHS Number Pasien</Text>
        </div>
      ),
      children: (
        <>
          <FrmIdentitasPx />
        </>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => {
          if (!paramEncounter) {
            getParamEncounter(identitasPx.RegistrasiId, identitasPx.RuangId)
          }
        }}
        >
          <Text strong>Encounter</Text>
        </div>
      ),
      children: (
        <>
          <FrmEncounter />
        </>
      ),
    },
    {
      key: "3",
      label: (
        <div>
          <Text strong>Episode of Care</Text>
        </div>
      ),
      children: (
        <>
          <FrmEpsOfCare />
        </>
      ),
    },
    {
      key: "4",
      label: (
        <div>
          <Text strong>Keluhan Utama</Text>
        </div>
      ),
      children: (
        <>
          <KeluhanUtamaHD />
          <FrmCondKeluhanUtama />
        </>
      ),
    },
    {
      key: "5",
      label: (
        <div onClick={() => getRiwayatDx(props.pasien.result.registrasiId)}>
          <Text strong>Riwayat Penyakit</Text>
        </div>
      ),
      children: (
        <>
          <FrmRiwPenyakit />
        </>
      ),
    },
    {
      key: "6",
      label: (
        <div>
          <Text strong>Faktor Resiko</Text>
        </div>
      ),
      children: (
        <>
          <FrmObsFaktorResiko />
        </>
      ),
    },
    {
      key: "7",
      label: (
        <div>
          <Text strong>Pemeriksaan Fisik</Text>
        </div>
      ),
      children: (
        <>
          <PmrFisikHD />
          <FrmObsTDSistolik />
          <FrmObsTDDiastolik />
          <FrmObsBeratBadan />
          <FrmObsTinggiBadan />
        </>
      ),
    },
    {
      key: "8",
      label: (
        <div>
          <Text strong>Status Psikologis</Text>
        </div>
      ),
      children: (
        <>
          <FrmObsStsPsikologis />
        </>
      ),
    },
    {
      key: "9",
      label: (
        <div>
          <Text strong>Service Request</Text>
        </div>
      ),
      children: (
        <>
          {/* <FrmObsStsPsikologis /> */}
        </>
      ),
    },
    {
      key: "10",
      label: (
        <div>
          <Text strong>Specimen</Text>
        </div>
      ),
      children: (
        <>
          {/* <FrmObsStsPsikologis /> */}
        </>
      ),
    },
    {
      key: "11",
      label: (
        <div>
          <Text strong>Observation - Penunjang</Text>
        </div>
      ),
      children: (
        <>
          {/* <FrmObsStsPsikologis /> */}
        </>
      ),
    },
    {
      key: "12",
      label: (
        <div>
          <Text strong>Diagnostic Report</Text>
        </div>
      ),
      children: (
        <>
          {/* <FrmObsStsPsikologis /> */}
        </>
      ),
    },
    {
      key: "13",
      label: (
        <div>
          <Text strong>Observation - Batu Saluran Kemih</Text>
        </div>
      ),
      children: (
        <>
          {/* <FrmObsStsPsikologis /> */}
        </>
      ),
    },
    {
      key: "14",
      label: (
        <div>
          <Text strong>Condition - Diagnosis</Text>
        </div>
      ),
      children: (
        <>
          <FrmCondDiagnosis />
        </>
      ),
    },
    {
      key: "15",
      label: (
        <div>
          <Text strong>Prosedur Medis</Text>
        </div>
      ),
      children: (
        <>
          <FrmProcProsedurMedis />
        </>
      ),
    },
    {
      key: "16",
      label: (
        <div>
          <Text strong>Medication</Text>
        </div>
      ),
      children: (
        <>
          <FrmMedication />
        </>
      ),
    },
    {
      key: "17",
      label: (
        <div>
          <Text strong>Edukasi Pasien</Text>
        </div>
      ),
      children: (
        <>
          <EdukasiHD />
          <FrmProcEdukasi />
        </>
      ),
    },
    {
      key: "18",
      label: (
        <div>
          <Text strong>Prognosis</Text>
        </div>
      ),
      children: (
        <>
          {/* <EdukasiHD />
          <FrmProcEdukasi /> */}
        </>
      ),
    },
    {
      key: "19",
      label: (
        <div>
          <Text strong>Rencana Tindak Lanjut</Text>
        </div>
      ),
      children: (
        <>
          <FrmServReqRencanaTL />
        </>
      ),
    },
    {
      key: "20",
      label: (
        <div>
          <Text strong>Kondisi saat Meniggalkan RS</Text>
        </div>
      ),
      children: (
        <>
          <FrmCondMeninggalkanRS />
        </>
      ),
    },
    {
      key: "21",
      label: (
        <div>
          <Text strong>Cara Keluar Faskes</Text>
        </div>
      ),
      children: (
        <>
          {/* <FinishHD /> */}
          <FrmEncFinishHD />
        </>
      ),
    },
  ];

  const onChange = (key) => {
    console.log(key);
    setkeyColl(key);

    const keys = Array.isArray(key) ? key : [key];
    const currentlyOpen = keys.includes("1");

    // Trigger event HANYA jika status panel key "1" berubah
    if (currentlyOpen !== isKey1Open) {
      setIsKey1Open(currentlyOpen);

      if (currentlyOpen) {
        rstNull();
        console.log("Panel 1 dibuka – trigger event di sini");
      } else {
        console.log("Panel 1 ditutup – trigger event di sini");
      }
    }
  };

  return (
    <div>
      <Collapse
        items={items}
        // accordion
        activeKey={keyColl}
        onChange={onChange}
      />

      <MdSearchSnomed />
      <MdDetailRsc />
    </div>
  );
};

export default SatuSehatHD;
