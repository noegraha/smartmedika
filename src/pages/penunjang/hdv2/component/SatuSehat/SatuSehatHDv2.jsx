/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Card, Col, message, Modal, Row, Steps, Tooltip, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import FrmIdentitasPx from '../../../../satusehat/componentsatusehatmodul/component/FrmIdentitasPx';
import { SatuSehatModulContext } from '../../../../satusehat/componentsatusehatmodul/context/SatuSehatModulContext';
import HdContext from '../../HdContext';
import FrmEncounter from '../../../../satusehat/componentsatusehatmodul/component/FrmEncounter';
import FrmEpsOfCare from '../../../../satusehat/componentsatusehatmodul/component/FrmEpsOfCare';
import KeluhanUtamaHD from './KeluhanUtamaHD';
import FrmCondKeluhanUtama from '../../../../satusehat/componentsatusehatmodul/component/FrmCondKeluhanUtama';
import MdSearchSnomed from '../../../../satusehat/componentsatusehatmodul/component/Modal/MdSearchSnomed';
import MdDetailRsc from '../../../../satusehat/componentsatusehatmodul/component/Modal/MdDetailRsc';
import FrmRiwPenyakit from '../../../../satusehat/componentsatusehatmodul/component/FrmRiwPenyakit';
import FrmObsFaktorResiko from '../../../../satusehat/componentsatusehatmodul/component/FrmObsFaktorResiko';
import PmrFisikHD from './PmrFisikHD';
import FrmObsTDSistolik from '../../../../satusehat/componentsatusehatmodul/component/FrmObsTDSistolik';
import FrmObsTDDiastolik from '../../../../satusehat/componentsatusehatmodul/component/FrmObsTDDiastolik';
import FrmObsBeratBadan from '../../../../satusehat/componentsatusehatmodul/component/FrmObsBeratBadan';
import FrmObsTinggiBadan from '../../../../satusehat/componentsatusehatmodul/component/FrmObsTinggiBadan';
import FrmObsStsPsikologis from '../../../../satusehat/componentsatusehatmodul/component/FrmObsStsPsikologis';
import FrmCondDiagnosis from '../../../../satusehat/componentsatusehatmodul/component/FrmCondDiagnosis';
import FrmProcProsedurMedis from '../../../../satusehat/componentsatusehatmodul/component/FrmProcProsedurMedis';
import FrmMedication from '../../../../satusehat/componentsatusehatmodul/component/FrmMedication';
import EdukasiHD from './EdukasiHD';
import FrmProcEdukasi from '../../../../satusehat/componentsatusehatmodul/component/FrmProcEdukasi';
import FrmServReqRencanaTL from '../../../../satusehat/componentsatusehatmodul/component/FrmServReqRencanaTL';
import FrmCondMeninggalkanRS from '../../../../satusehat/componentsatusehatmodul/component/FrmCondMeninggalkanRS';
import FrmEncFinishHD from '../../../../satusehat/componentsatusehatmodul/component/FrmEncFinishHD';
import FrmServiceReq from '../../../../satusehat/componentsatusehatmodul/component/FrmServiceReq';
import ServReqHD from './ServReqHD';
import { InfoCircleOutlined } from '@ant-design/icons';
import FrmComposRegUronefrologi from '../../../../satusehat/componentsatusehatmodul/component/FrmComposRegUronefrologi';

const { PasiensContext } = HdContext;
const { Text } = Typography;

const SatuSehatHDv2 = () => {
    const {
        sstoken,
        rstNull,
        identitasPx,
        ihsPasien,
        paramEncounter,
        setparamEpsofCare,
        paramEpsofCare,
        setregEpsofCare,
        sts04,
        sts05,
        sts06,
        sts07,
        sts08,
        sts09,
        sts10,
        sts11,
        sts12,
        sts13,
        sts14,
        sts15,
        sts16,
        sts17,
        sts18,
        sts19,
        detailEnc,
        getDetailEnv,
        getIdentPx,
        getRiwayatDx,
        getParamEncounter,
        getResourceById,
    } = useContext(SatuSehatModulContext);

    const props = useContext(PasiensContext);

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        getDetailEnv(sessionStorage.getItem("environment"));
        getIdentPx(props.pasien.result.registrasiId);
        setCurrent(0);
        rstNull();
    }, [props.pasien]);

    const next = () => {
        let temp = current + 1;
        console.log('next : ', current);

        if (current === 0) {
            if (ihsPasien) {
                getParamEncounter(identitasPx.RegistrasiId, identitasPx.RuangId);
                setCurrent(temp);
            }
            else {
                Modal.warning({
                    title: "Peringatan!",
                    content: "IHS Pasien masih kosong.",
                });
            }
        }
        else if (current === 1) {
            if (!paramEncounter.ResourceID) {
                Modal.warning({
                    title: "Peringatan!",
                    content: "Encounter masih kosong.",
                });
            }
            else {
                klikEpsofCare(ihsPasien);
                setCurrent(temp);
            };
        }
        else if (current === 2 && (!paramEpsofCare || Object.keys(paramEpsofCare).length === 0)) {
            Modal.warning({
                title: "Peringatan!",
                content: "Episode of Care Id masih kosong.",
            });
        }
        else {
            setCurrent(temp);
        };

        // setCurrent(temp);
    };

    const steps = [
        {
            description: <>
                <Tooltip title="IHS Pasien">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: ihsPasien ? 'finish' : 'process',
            content: <>
                <Text strong>IHS Pasien</Text>
                <hr />
                <FrmIdentitasPx />
            </>,
        },
        {
            // title: '2',
            description: <>
                <Tooltip title="Encounter">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: (detailEnc?.length ?? 0) === 0 ? 'process' : ((detailEnc?.length ?? 0) > 0 && (detailEnc?.length ?? 0) < 3) ? 'process' : 'finish',
            content: <>
                <Text strong>Encounter</Text>
                <hr />
                <FrmEncounter />
            </>,
        },
        {
            // title: '3',
            description: <>
                <Tooltip title="Episode of Care">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: paramEpsofCare && Object.keys(paramEpsofCare).length > 0 ? 'finish' : 'process',
            content: <>
                <Text strong>Episode of Care</Text>
                <hr />
                <FrmEpsOfCare />
            </>,
        },
        {
            description: <>
                <Tooltip title="Keluhan Utama">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts04 ? 'finish' : 'process',
            content: <>
                <Text strong>Keluhan Utama</Text>
                <hr />
                <KeluhanUtamaHD />
                <FrmCondKeluhanUtama />
            </>,
        },
        {
            description: <>
                <Tooltip title="Riwayat Penyakit">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts05 ? 'finish' : 'process',
            content: <>
                <Text strong>Riwayat Penyakit</Text>
                <hr />
                <FrmRiwPenyakit />
            </>,
        },
        {
            description: <>
                <Tooltip title="Faktor Resiko">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts06 ? 'finish' : 'process',
            content: <>
                <Text strong>Faktor Resiko</Text>
                <hr />
                <FrmObsFaktorResiko />
            </>,
        },
        {
            description: <>
                <Tooltip title="Pemeriksaan Fisik">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts07 && sts08 && sts09 && sts10 ? 'finish' : 'process',
            content: <>
                <Text strong>Pemeriksaan Fisik</Text>
                <hr />
                <PmrFisikHD />
                <FrmObsTDSistolik />
                <FrmObsTDDiastolik />
                <FrmObsBeratBadan />
                <FrmObsTinggiBadan />
            </>,
        },
        {
            description: <>
                <Tooltip title="Status Psikologis">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts11 ? 'finish' : 'process',
            content: <>
                <Text strong>Status Psikologis</Text>
                <hr />
                <FrmObsStsPsikologis />
            </>,
        },
        {
            description: <>
                <Tooltip title="Hasil Penunjang">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts12 ? 'finish' : 'process',
            content: <>
                {/* 9 */}
                <Text strong>Service Request</Text>
                <hr />
                {/* <FrmServiceReq /> */}
                <ServReqHD />
            </>,
        },
        // {
        //     content: <>
        //         <Text strong>Specimen</Text>
        //         <hr />
        //         {/* <FrmObsStsPsikologis /> */}
        //     </>,
        // },
        // {
        //     content: <>
        //         <Text strong>Observation - Penunjang</Text>
        //         <hr />
        //         {/* <FrmObsStsPsikologis /> */}
        //     </>,
        // },
        // {
        //     content: <>
        //         <Text strong>Diagnostic Report</Text>
        //         <hr />
        //         {/* <FrmObsStsPsikologis /> */}
        //     </>,
        // },
        // {
        //     content: <>
        //         <Text strong>Observation - Batu Saluran Kemih</Text>
        //         <hr />
        //         {/* <FrmObsStsPsikologis /> */}
        //     </>,
        // },
        {
            description: <>
                <Tooltip title="Diagnosis">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts13 ? 'finish' : 'process',
            content: <>
                <Text strong>Condition - Diagnosis</Text>
                <hr />
                <FrmCondDiagnosis />
            </>,
        },
        {
            description: <>
                <Tooltip title="Procedur Medis">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts14 ? 'finish' : 'process',
            content: <>
                <Text strong>Prosedur Medis</Text>
                <hr />
                <FrmProcProsedurMedis />
            </>,
        },
        {
            description: <>
                <Tooltip title="Obat">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts15 ? 'finish' : 'process',
            content: <>
                <Text strong>Medication</Text>
                <hr />
                <FrmMedication />
            </>,
        },
        {
            description: <>
                <Tooltip title="Edukasi">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts16 ? 'finish' : 'process',
            content: <>
                <Text strong>Edukasi Pasien</Text>
                <hr />
                <EdukasiHD />
                <FrmProcEdukasi />
            </>,
        },
        // {
        //     content: <>
        //         <Text strong>Prognosis</Text>
        //         <hr />
        //     </>,
        // },
        {
            description: <>
                <Tooltip title="Renc. Tindak Lanjut">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts17 ? 'finish' : 'process',
            content: <>
                <Text strong>Rencana Tindak Lanjut</Text>
                <hr />
                <FrmServReqRencanaTL />
            </>,
        },
        {
            description: <>
                <Tooltip title="Kondisi saat Meniggalkan RS">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts18 ? 'finish' : 'process',
            content: <>
                <Text strong>Kondisi saat Meniggalkan RS</Text>
                <hr />
                <FrmCondMeninggalkanRS />
            </>,
        },
        {
            description: <>
                <Tooltip title="Cara Keluar Faskes">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: (detailEnc?.length ?? 0) === 0 ? 'process' : ((detailEnc?.length ?? 0) > 0 && (detailEnc?.length ?? 0) < 3) ? 'process' : 'finish',
            content: <>
                <Text strong>Cara Keluar Faskes</Text>
                <hr />
                <FrmEncFinishHD />
            </>,
        },
        {
            description: <>
                <Tooltip title="Dokumen Registrasi Uronefronologi">
                    <InfoCircleOutlined />
                </Tooltip>
            </>,
            status: sts19 ? 'finish' : 'process',
            // status: 'process',
            content: <>
                <Text strong>Dokumen Registrasi Uronefronologi</Text>
                <hr />
                <FrmComposRegUronefrologi />
            </>,
        },
    ];

    const klikEpsofCare = async () => {
        let link = `EpisodeOfCare?type=CKD&status=active&patient=${ihsPasien}`;

        try {
            let data = await getResourceById("skip", link);
            console.log("klikTest : ", data);
            setparamEpsofCare(null);
            setregEpsofCare(null);

            if (data.total === 0) {
                Modal.warning({
                    title: "Perhatian!",
                    content: "Pasien belum didaftarkan Episode of Care Hemodialisa.",
                });
            } else {
                setparamEpsofCare(data.entry[0]);

                // Cari value berdasarkan system tertentu
                const registryIdObj = data.entry[0].resource.identifier.find(
                    (item) =>
                        item.system ===
                        "http://sys-ids.kemkes.go.id/episode-of-care/registry-id/"
                );

                const registryId = registryIdObj?.value;
                setregEpsofCare(registryId);
            }
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data Episode of Care.",
            });
        }
    };

    const prev = () => {
        setCurrent(current - 1);
        console.log('prev : ', current);
    };

    const items = steps.map(item => ({ key: item.title, title: item.title }));

    return (
        <div>
            <Card>
                <Steps
                    // progressDot
                    current={current}
                    // items={items}
                    type='navigation'
                    items={steps}
                    onChange={(e) => {
                        if (e > 2 && paramEncounter && paramEpsofCare) {
                            setCurrent(e);
                        };
                    }}
                    size='small'
                />
                <div style={{ marginTop: 5 }}>{steps[current].content}</div>
                <div style={{ marginTop: 5 }}>
                    {current > 0 && (
                        <Button style={{ marginRight: 8 }} onClick={() => prev()}>
                            Previous
                        </Button>
                    )}
                    {current < steps.length - 1 && (
                        <Button
                            type="primary"
                            disabled={ihsPasien ? false : true}
                            onClick={() => {
                                next();
                            }}
                            style={{ width: 100 }}
                        >
                            Next
                        </Button>
                    )}
                    {current === steps.length - 1 && (
                        <Button type="primary" onClick={() => message.success('Processing complete!')}>
                            Done
                        </Button>
                    )}
                </div>
                <Row>
                    <Col>
                        <a
                            onClick={() => getDetailEnv(sessionStorage.getItem("environment"))}
                            style={{ fontStyle: 'italic', fontSize: '8px', color: 'blue', cursor: 'pointer' }}
                        >
                            SS Token : {sstoken}
                        </a>
                    </Col>
                </Row>
            </Card>

            <MdSearchSnomed />
            <MdDetailRsc />
        </div>
    )
}

export default SatuSehatHDv2