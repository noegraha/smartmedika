import { Button, Card, Col, Divider, Input, Row, Space } from 'antd'
import React from 'react'
import { useContext } from 'react';
import { RadioterapiContext } from '../context/RadioterapiContext';

const { TextArea } = Input;

const FormDataTPS = () => {
    const {
        tpsPssPasien, settpsPssPasien,
        tpsPssTatto, settpsPssTatto,
        tpsAcc, settpsAcc,
        tpsSad, settpsSad,
        tpsSsd, settpsSsd,
        tpsXPlus, settpsXPlus,
        tpsXMin, settpsXMin,
        tpsYPlus, settpsYPlus,
        tpsYMin, settpsYMin,
        tpsCr, settpsCr,
        tpsGr, settpsGr,
        tpsHt, settpsHt,
        tpsWedgeFilter, settpsWedgeFilter,
        tpsLeadBlocks, settpsLeadBlocks,
        tpsJmlFraksi, settpsJmlFraksi,
        tpsDosisTumor, settpsDosisTumor,
        tpsDosisPermukaa, settpsDosisPermukaa,
        tpsWaktuRad, settpsWaktuRad,
        tpsDosisTotal, settpsDosisTotal,
        tpsCatatan, settpsCatatan,
    } = useContext(RadioterapiContext)

    const klikSimpan = () => {
        let data = {}

        data.tpsPssPasien = tpsPssPasien;
        data.tpsPssTatto = tpsPssTatto;
        data.tpsAcc = tpsAcc;
        data.tpsSad = tpsSad;
        data.tpsSsd = tpsSsd;
        data.tpsXPlus = tpsXPlus;
        data.tpsXMin = tpsXMin;
        data.tpsYPlus = tpsYPlus;
        data.tpsYMin = tpsYMin;
        data.tpsCr = tpsCr;
        data.tpsGr = tpsGr;
        data.tpsHt = tpsHt;
        data.tpsWedgeFilter = tpsWedgeFilter;
        data.tpsLeadBlocks = tpsLeadBlocks;
        data.tpsJmlFraksi = tpsJmlFraksi;
        data.tpsDosisTumor = tpsDosisTumor;
        data.tpsDosisPermukaa = tpsDosisPermukaa;
        data.tpsWaktuRad = tpsWaktuRad;
        data.tpsDosisTotal = tpsDosisTotal;
        data.tpsCatatan = tpsCatatan;

        console.log('data : ', data);
    }

    return (
        <div>
            <Card>
                <Divider orientation='left' style={{ backgroundColor: '#d9f7be', margin: '0px' }}>Lapangan Penyinaran</Divider>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Posisi Pasien :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsPssPasien}
                            onChange={(e) => settpsPssPasien(e.target.value)}
                            maxLength={100}
                            type='text'
                            size='small'
                        />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '5px' }}>Gantry Rot. (GR) :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsGr}
                            onChange={(e) => settpsGr(e.target.value)}
                            maxLength={90}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Posisi Tatto :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsPssTatto}
                            onChange={(e) => settpsPssTatto(e.target.value)}
                            maxLength={90}
                            type='text'
                            size='small'
                        />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '5px' }}>Table Height (HT) :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsHt}
                            onChange={(e) => settpsHt(e.target.value)}
                            maxLength={90}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Acessori :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsAcc}
                            onChange={(e) => settpsAcc(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '5px' }}>Wedge Filter :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsWedgeFilter}
                            onChange={(e) => settpsWedgeFilter(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>SAD (SSD) :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsSad}
                            onChange={(e) => settpsSad(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '5px' }}>Lead Blocks :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsLeadBlocks}
                            onChange={(e) => settpsLeadBlocks(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>SSD (Kedalaman) :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsSsd}
                            onChange={(e) => settpsSsd(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                    <Col span={4}>
                        <span style={{ marginLeft: '5px' }}>Jumlah Fraksi/Minggu :</span>
                    </Col>
                    <Col span={8}>
                        <Input
                            value={tpsJmlFraksi}
                            onChange={(e) => settpsJmlFraksi(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>X + :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsXPlus}
                            onChange={(e) => settpsXPlus(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                    <Col span={4}>
                        <span style={{ marginLeft: '5px' }}>Dosis Tumor/Minggu :</span>
                    </Col>
                    <Col span={8}>
                        <Input
                            value={tpsDosisTumor}
                            onChange={(e) => settpsDosisTumor(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>X - :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsXMin}
                            onChange={(e) => settpsXMin(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                    <Col span={5}>
                        <span style={{ marginLeft: '5px' }}>Dosis Permukaan Hari (exp.rate) :</span>
                    </Col>
                    <Col span={7}>
                        <Input
                            value={tpsDosisPermukaa}
                            onChange={(e) => settpsDosisPermukaa(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Y + :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsYPlus}
                            onChange={(e) => settpsYPlus(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '5px' }}>Waktu Radiasi :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsWaktuRad}
                            onChange={(e) => settpsWaktuRad(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Y - :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsYMin}
                            onChange={(e) => settpsYMin(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                    <Col span={3}>
                        <span style={{ marginLeft: '5px' }}>Dosis Total :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            value={tpsDosisTotal}
                            onChange={(e) => settpsDosisTotal(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Coll Rotation (CR) :</span>
                    </Col>
                    <Col span={21}>
                        <Input
                            value={tpsCr}
                            onChange={(e) => settpsCr(e.target.value)}
                            maxLength={50}
                            type='text'
                            size='small'
                        />
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={3}>
                        <span>Catatan :</span>
                    </Col>
                    <Col span={21}>
                        <TextArea
                            value={tpsCatatan}
                            maxLength={1000}
                            onChange={(e) => settpsCatatan(e.target.value)}
                            rows={4}
                            size='small' />
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col>
                        <Space>
                            <Button type='primary' style={{ width: '150px' }}>
                                Lihat Riwayat
                            </Button>
                            <Button type='primary' style={{ width: '150px' }}>
                                Kosongkan Form
                            </Button>
                        </Space>
                    </Col>
                </Row>
                <Row style={{ marginTop: '2px' }}>
                    <Col span={24}>
                        <TextArea
                            rows={4}
                            size='small' />
                    </Col>
                </Row>

                <hr />

                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button style={{ width: '75px' }}>Cetak</Button>
                            <Button
                                onClick={() => klikSimpan()}
                                type='primary'
                                style={{ width: '75px' }}
                            >
                                Simpan
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default FormDataTPS