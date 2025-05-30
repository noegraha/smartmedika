/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Col, Modal, Row, Spin } from 'antd'
import React, { useContext, useState } from 'react'
import { MapLoincContext } from '../context/MapLoincContext';
import { useEffect } from 'react';

const MdDetailLoinc = () => {
    const {
        pemeriksaan,
        detailLoinc,
        setmdBrowserLc,
        mdDtLoinc, setmdDtLoinc,
        flagDtLoinc, setflagDtLoinc,
        InsertLoinc,
        UpdateLoinc,
    } = useContext(MapLoincContext);

    const [spProses, setspProses] = useState(false);

    const labelMap = [
        "Kategori Kelompok Pemeriksaan",
        "Nama Pemeriksaan",
        "Code",
        "Display",
        "Permintaan Hasil",
        "Spesimen",
        "Tipe hasil pemeriksaan",
        "Satuan",
        "Metode Analisis",
        "Component",
        "Property",
        "Timing",
        "System",
        "Scale",
        "Method",
        "Unit of Measure",
        "Code System",
        "Version First Released",
        "Version Last Changed"
    ];

    const keyMap = [
        "Kategori_Kelompok_Pemeriksaan",
        "Nama_Pemeriksaan",
        "Code",
        "Display",
        "Permintaan_Hasil",
        "Spesimen",
        "Tipe_hasil_pemeriksaan",
        "Satuan",
        "Metode_Analisis",
        "Component",
        "Property",
        "Timing",
        "System",
        "Scale",
        "Method",
        "Unit_of_Measure",
        "Code_System",
        "Version_First_Released",
        "Version_Last_Changed"
    ];

    const klikPilih = async () => {
        let data = {
            pelayananId: pemeriksaan?.KodePmr,
            loincCode: detailLoinc?.Code,
            clientHost: sessionStorage.getItem("Host"),
            clientIP: sessionStorage.getItem("IP")
        };

        setspProses(true);
        try {
            let resp = await InsertLoinc(data);
            console.log("klikPilih : ", resp);
            if (resp.code === "200") {
                Modal.success({
                    title: 'Berhasil',
                    content: 'Data berhasil disimpan.',
                    onOk: () => {
                        setmdDtLoinc(false);
                        setmdBrowserLc(false);
                    }
                });
            }
            else if (resp.message === "Error! Data sudah ada, silahkan cek kembali." && resp.code === "201") {
                Modal.confirm({
                    title: 'Data Sudah Ada',
                    content: 'Data yang Anda input sudah tersedia. Apakah Anda ingin memperbarui data?',
                    okText: 'Ya, Perbarui',
                    cancelText: 'Batal',
                    onOk: async () => {
                        let update = await UpdateLoinc(data);

                        if (update.code === "200") {
                            Modal.success({
                                title: 'Berhasil',
                                content: 'Data berhasil disimpan.',
                                onOk: () => {
                                    setmdDtLoinc(false);
                                    setmdBrowserLc(false);
                                }
                            });
                        }
                        else {
                            Modal.warn({
                                title: 'Gagal',
                                content: resp?.message || 'Terjadi kesalahan saat menyimpan data.',
                            });
                        }
                    },
                    onCancel: () => {
                        setmdDtLoinc(false);
                        setmdBrowserLc(false);
                    },
                });
            }
            else {
                Modal.warn({
                    title: 'Gagal',
                    content: resp?.message || 'Terjadi kesalahan saat menyimpan data.',
                });
            }
        } catch (error) {
            Modal.error({
                title: 'Error',
                content: error?.message || 'Terjadi kesalahan saat menyimpan data.',
            });
        } finally {
            setspProses(false);
        }
    };

    return (
        <div>
            <Modal
                visible={mdDtLoinc}
                onCancel={() => {
                    setmdDtLoinc(false);
                    setflagDtLoinc(false);
                }}
                title="Detail LOINC :"
                width="50%"
                footer={null}
                closable={false}
                centered
                zIndex={100}
            >
                <Spin spinning={spProses}>
                    {labelMap.map((label, idx) => (
                        <Row style={{ marginBottom: '2px' }} key={keyMap[idx]}>
                            <Col span={7}>
                                <span> {label}</span>
                            </Col>
                            <Col span={17}>
                                <span>: {detailLoinc?.[keyMap[idx]]} </span>
                            </Col>
                        </Row>
                    ))}

                    {flagDtLoinc ? null : (
                        <>
                            <hr />
                            <Row>
                                <Col span={24}>
                                    <Button
                                        type='primary'
                                        onClick={() => klikPilih()}
                                        style={{ width: '100%' }}
                                    >
                                        Pilih
                                    </Button>
                                </Col>
                            </Row>
                        </>
                    )}

                </Spin>
            </Modal>
        </div>
    )
}

export default MdDetailLoinc