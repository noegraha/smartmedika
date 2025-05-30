/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Input, Modal, Row, Table } from 'antd';
import React, { useContext, useEffect, useState } from 'react'
import { SatuSehatModulContext } from '../context/SatuSehatModulContext';
import { PlusOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';

const FrmProcEdukasi = () => {
    const {
        ihsRS,
        ihsPasien,
        identitasPx,
        paramEncounter,
        setflagMdSnomed,
        edukasi, setedukasi,
        setsts16,
        spCvg,
        setmdLookupSnomed,
        getRiwRscId,
        postResource,
        postResourcev2,
        colTbResource,
    } = useContext(SatuSehatModulContext);

    const [listTable, setlistTable] = useState([]);

    useEffect(() => {
        klikRefresh('99');
        console.log('useEffect FrmProcEdukasi');
    }, []);

    const klikRefresh = async (codeGrup) => {
        try {
            let data = await getRiwRscId(identitasPx.RegistrasiId, codeGrup);
            console.log('klikRefresh : ', data);

            setlistTable(data);
            if (data && data.length > 0) {
                setsts16(true);
            };

            setedukasi(null);
        } catch (error) {
            Modal.error({
                title: "Error",
                content: "Gagal mengambil data!",
            });
        }
    };

    const tambahEdukasi = () => {
        setmdLookupSnomed(true);
        setflagMdSnomed("99");
    };

    const klikPost = async () => {
        try {
            if (!edukasi || Object.keys(edukasi).length === 0) {
                Modal.warning({
                    title: "Peringatan!",
                    content: "Edukasi masih kosong.",
                });
            }
            else {
                let data = {};

                data = {
                    resourceType: "Procedure",
                    status: "completed",
                    category: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: "409073007",
                                display: "Education"
                            }
                        ]
                    },
                    code: {
                        coding: [
                            {
                                system: "http://snomed.info/sct",
                                code: edukasi.id,
                                display: edukasi.pt.term
                            }
                            // {
                            //     system: "http://terminology.kemkes.go.id/CodeSystem/kptl",
                            //     code: "10913",
                            //     display: "Edukasi Kesehatan Individu"
                            // }
                        ]
                    },
                    subject: {
                        reference: `Patient/${ihsPasien}`
                    },
                    encounter: {
                        reference: `Encounter/${paramEncounter.ResourceID}`
                    },
                    performedPeriod: {
                        start: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format(),
                        end: dayjs(paramEncounter.JamPelayanan).subtract(7, 'hour').format()
                    },
                    performer: [
                        {
                            actor: {
                                reference: `Practitioner/${paramEncounter.IhsPracticioner}`,
                                display: paramEncounter.NamaDPJP
                            }
                        }
                    ]
                };

                // postResource(data, 'Procedure', '99');
                console.log('klikPost : ', data);

                const newResponse = await postResourcev2(data, 'Procedure', '99');

                if (newResponse === "Sukses") {
                    klikRefresh('99');
                };
            }
        } catch (error) {
            Modal.error({
                title: 'Error!',
                content: `Error : ${error}`,
            });
            console.error("Error :", error);
        };

    };

    return (
        <div>
            <Row style={{ marginBottom: '5px', marginTop: '5px' }}>
                <Col span={12}>
                </Col>
                <Col span={12}>
                    <Button
                        onClick={() => {
                            klikRefresh('99');
                        }}
                        style={{ float: 'right' }}
                    >
                        Refresh
                    </Button>
                </Col>
            </Row>

            <Row>
                <Table
                    bordered
                    loading={spCvg}
                    columns={colTbResource}
                    dataSource={listTable}
                    pagination={false}
                    size='small'
                />
            </Row>

            <Row style={{ marginBottom: "2px", marginTop: '5px' }}>
                <Col span={3}>
                    <span>SNOMED :</span>
                </Col>
                <Col span={3}>
                    <Input
                        value={edukasi ? edukasi.id : null}
                        readOnly
                        placeholder="Code"
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        value={edukasi ? edukasi.pt.term : null}
                        readOnly
                        placeholder="Display"
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col span={8}>
                    <Input
                        value={edukasi ? edukasi.fsn.term : null}
                        readOnly
                        placeholder="Keterangan"
                        style={{ width: "100%" }}
                    />
                </Col>
                <Col span={2} style={{ paddingLeft: "2px" }}>
                    <Button
                        type="primary"
                        onClick={() => tambahEdukasi()}
                        // disabled={paramCoverage && paramCoverage.ResourceID !== null ? true : false}
                        icon={<PlusOutlined />}
                        style={{ float: "right", width: "100%" }}
                    />
                </Col>
            </Row>

            <hr />
            <Row>
                <Col span={24}>
                    <Button
                        type="primary"
                        onClick={() => klikPost()}
                        disabled={listTable.length !== 0 ? true : false}
                        style={{ float: "right", width: "150px" }}
                    >
                        Post
                    </Button>
                </Col>
            </Row>
        </div>
    )
}

export default FrmProcEdukasi