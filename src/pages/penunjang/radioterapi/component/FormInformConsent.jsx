import { Button, Card, Col, DatePicker, Input, Row, Select, Space, Tooltip } from 'antd'
import React, { useState } from 'react'
import { useContext } from 'react';
import { CloudDownloadOutlined } from "@ant-design/icons";
import { RadioterapiContext } from '../context/RadioterapiContext';
import FormICPenundaan from './FormICPenundaan';
import FormICPersetujuan from './FormICPersetujuan';
import moment from "moment";

const { Option } = Select;

const FormInformConsent = () => {
    const {
        // item
        icdrPelaksana, seticdrPelaksana,
        icPemberiInformasi, seticPemberiInformasi,
        icPenerimaInformasi, seticPenerimaInformasi,
        icTgl, seticTgl,
        icPersetujuan, seticPersetujuan,
        icJenKel, seticJenKel,
        icUmur, seticUmur,
        icAlamat, seticAlamat,
        icHubungan, seticHubungan,
        // ic ditunda
        icDiagker, seticDiagker,
        icAlsPen, seticAlsPen,
        icDasDiagnosa, seticDasDiagnosa,
        icAlsProb, seticAlsProb,
        icRencana, seticRencana,
        icLainlain, seticLainlain,
        icAltLain, seticAltLain,
        // ic setuju/ ditolak
        icDiagWd,
        icCkDiagWd,
        icDsrDiag,
        icCkDsrDiag,
        icTinDok,
        icCkTinDok,
        icIndTin,
        icCkIndTin,
        icTatacara,
        icCkTatacara,
        icTujuan,
        icCkTujuan,
        icRisiko,
        icCkRisiko,
        icKomplikasi,
        icCkKomplikasi,
        icPrognosis,
        icCkPrognosis,
        icAltRes,
        icCkAltRes,
        // mst
        listRd,
        listDokter,
        // func
        getLoadDokter,
        getLoadRadiografer,
    } = useContext(RadioterapiContext)

    // mst HARD
    const itemPersetujuan = [
        {
            id: 'Menyetujui',
            desk: 'Menyetujui'
        },
        {
            id: 'Tidak Menyetujui',
            desk: 'Tidak Menyetujui'
        },
        {
            id: 'Ditunda',
            desk: 'Ditunda'
        },
    ]

    const listJenisKelamin = [
        {
            id: 'Laki-laki',
            desk: 'Laki-laki'
        },
        {
            id: 'Perempuan',
            desk: 'Perempuan'
        },
    ]

    const listHubungan = [
        {
            id: 'Diri Sendiri',
            desk: 'Diri Sendiri'
        },
        {
            id: 'Suami/ Istri',
            desk: 'Suami/ Istri'
        },
        {
            id: 'Saudara',
            desk: 'Saudara'
        },
        {
            id: 'Ayah',
            desk: 'Ayah'
        },
        {
            id: 'Ibu',
            desk: 'Ibu'
        },
        {
            id: 'Kakak',
            desk: 'Kakak'
        },
        {
            id: 'Adik',
            desk: 'Adik'
        },
    ]

    const klikLoadDokter = () => {
        getLoadDokter("1, 2", "9404");
    }

    const klikLoadRd = () => {
        getLoadRadiografer("7", "9404");
    }

    const klikSimpan = () => {
        let data = {}

        data.icdrPelaksana = icdrPelaksana;
        data.icPemberiInformasi = icPemberiInformasi;
        data.icPenerimaInformasi = icPenerimaInformasi;
        data.icTgl = moment(icTgl).format();
        data.icPersetujuan = icPersetujuan;
        data.icJenKel = icJenKel;
        data.icUmur = icUmur;
        data.icAlamat = icAlamat;
        data.icHubungan = icHubungan;

        if (icPersetujuan === 'Ditunda') {
            data.icDiagker = icDiagker;
            data.icAlsPen = icAlsPen;
            data.icDasDiagnosa = icDasDiagnosa;
            data.icAlsProb = icAlsProb;
            data.icRencana = icRencana;
            data.icLainlain = icLainlain;
            data.icAltLain = icAltLain;
        }
        else {
            data.icDiagWd = icDiagWd;
            data.icCkDiagWd = icCkDiagWd;
            data.icDsrDiag = icDsrDiag;
            data.icCkDsrDiag = icCkDsrDiag;
            data.icTinDok = icTinDok;
            data.icCkTinDok = icCkTinDok;
            data.icIndTin = icIndTin;
            data.icCkIndTin = icCkIndTin;
            data.icTatacara = icTatacara;
            data.icCkTatacara = icCkTatacara;
            data.icTujuan = icTujuan;
            data.icCkTujuan = icCkTujuan;
            data.icRisiko = icRisiko;
            data.icCkRisiko = icCkRisiko;
            data.icKomplikasi = icKomplikasi;
            data.icCkKomplikasi = icCkKomplikasi;
            data.icPrognosis = icPrognosis;
            data.icCkPrognosis = icCkPrognosis;
            data.icAltRes = icAltRes;
            data.icCkAltRes = icCkAltRes;
        }

        console.log('data : ', data);
    }

    return (
        <>
            <Card>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={6}>
                        <span>Dokter Pelaksana :</span>
                    </Col>
                    <Col span={18}>
                        <Input.Group compact>
                            <Select
                                value={icdrPelaksana}
                                onChange={(e) => seticdrPelaksana(e)}
                                size='small'
                                style={{ width: '95%' }}>
                                {listDokter.map((optListDokter, index) => (
                                    <Option key={index} value={optListDokter.KODEDOKTER}>{optListDokter.NAMADOKTER}</Option>
                                ))}
                            </Select>
                            <Tooltip title='klik disini jika option Dokter tidak muncul'>
                                <Button
                                    onClick={() => klikLoadDokter()}
                                    type="primary"
                                    size="small"
                                    style={{ width: '5%' }}
                                >
                                    <CloudDownloadOutlined />
                                </Button>
                            </Tooltip>
                        </Input.Group>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={6}>
                        <span>Pemberi Informasi :</span>
                    </Col>
                    <Col span={18}>
                        <Input.Group compact>
                            <Select
                                value={icPemberiInformasi}
                                onChange={(e) => seticPemberiInformasi(e)}
                                // onFocus={() => getLoadDokter('1,2', '9404')}
                                size='small'
                                style={{ width: '95%' }}>
                                {listRd.map((optListRd, index) => (
                                    <Option key={index} value={optListRd.KODEDOKTER}>{optListRd.NAMADOKTER}</Option>
                                ))}
                            </Select>
                            <Tooltip title='klik disini jika option Radiografer tidak muncul'>
                                <Button
                                    onClick={() => klikLoadRd()}
                                    type="primary"
                                    size="small"
                                    style={{ width: '5%' }}>
                                    <CloudDownloadOutlined />
                                </Button>
                            </Tooltip>
                        </Input.Group>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={6}>
                        <span>Penerima Informasi/ Pemberi Persetujuan :</span>
                    </Col>
                    <Col span={18}>
                        <Input
                            value={icPenerimaInformasi}
                            onChange={(e) => seticPenerimaInformasi(e.target.value)}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={6}>
                        <span>Tanggal :</span>
                    </Col>
                    <Col span={18}>
                        <DatePicker
                            value={moment(icTgl)}
                            onChange={(e) => seticTgl(moment(e))}
                            // disabledDate={(current) => {
                            //     let customDate = moment().format("YYYY-MM-DD");
                            //     return current && current < moment(customDate, "YYYY-MM-DD");
                            // }}
                            size='small'
                            format='DD-MM-YYYY HH:mm'
                            allowClear={false}
                            inputReadOnly={true}
                            showTime
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={6}>
                        <span>Persetujuan :</span>
                    </Col>
                    <Col span={18}>
                        <Select
                            size='small'
                            value={icPersetujuan}
                            onChange={(e) => seticPersetujuan(e)}
                            style={{ width: '100%' }} >
                            {itemPersetujuan.map((item, index) => (
                                <Option key={index} value={item.id}>{item.desk}</Option>
                            ))}
                        </Select>
                    </Col>
                </Row>

                <Row style={{ marginBottom: '2px' }}>
                    <Col span={24}>
                        <span><b>Yang menerima informasi dan menandatangani :</b></span>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        <span>Nama :</span>
                    </Col>
                    <Col span={8}>
                        <Input
                            value={icPenerimaInformasi}
                            type='text'
                            readOnly
                            size='small'
                        />
                    </Col>
                    <Col span={4} style={{ paddingLeft: '5px' }}>
                        <span>Jenis Kelamin :</span>
                    </Col>
                    <Col span={8}>
                        <Select
                            value={icJenKel}
                            onChange={(e) => seticJenKel(e)}
                            size='small'
                            style={{ width: '100%' }}>
                            {listJenisKelamin.map((item, index) => (
                                <Option key={index} value={item.id}>{item.desk}</Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        <span>Umur :</span>
                    </Col>
                    <Col span={20}>
                        <Input
                            value={icUmur}
                            onChange={(e) => seticUmur(e.target.value)}
                            maxLength={2}
                            addonAfter='Tahun'
                            type='text'
                            size='small'
                            style={{ width: '15%' }}
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        <span>Alamat :</span>
                    </Col>
                    <Col span={20}>
                        <Input
                            value={icAlamat}
                            onChange={(e) => seticAlamat(e.target.value)}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        <span>Hubungan :</span>
                    </Col>
                    <Col span={20}>
                        <Select
                            value={icHubungan}
                            onChange={(e) => seticHubungan(e)}
                            size='small'
                            style={{ width: '100%' }}>
                            {listHubungan.map((item, index) => (
                                <Option key={index} value={item.id}>{item.desk}</Option>
                            ))}
                        </Select>
                    </Col>
                </Row>
                <hr />

                {icPersetujuan !== 'Ditunda' ? <FormICPersetujuan /> : <FormICPenundaan />}

                <hr />

                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button
                                style={{ width: '75px' }} >
                                Cetak
                            </Button>
                            <Button
                                onClick={() => klikSimpan()}
                                type='primary'
                                style={{ width: '75px' }}>
                                Simpan
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </>
    )
}

export default FormInformConsent