import { Col, Row, Input, Divider } from 'antd'
import React from 'react'
import { useContext } from 'react';
import { RadioterapiContext } from '../context/RadioterapiContext';

const { TextArea } = Input;

const FormICPenundaan = () => {
    const {
        icDiagker, seticDiagker,
        icAlsPen, seticAlsPen,
        icDasDiagnosa, seticDasDiagnosa,
        icAlsProb, seticAlsProb,
        icRencana, seticRencana,
        icLainlain, seticLainlain,
        icAltLain, seticAltLain,
    } = useContext(RadioterapiContext)

    return (
        <div>
            <Divider orientation='left' style={{ backgroundColor: '#fffb8f', margin: '0px' }}>Form Penundaan</Divider>
            <Row
                style={{ marginBottom: '2px', marginTop: '2px' }} >
                <Col span={4}>
                    <span>Diagnosa Kerja :</span>
                </Col>
                <Col span={8}>
                    <TextArea
                        value={icDiagker}
                        onChange={(e) => seticDiagker(e.target.value)}
                        rows={4}
                        size='small' />
                </Col>
                <Col span={4}>
                    <span style={{ marginLeft: '5px' }}>Alasan Penundaan :</span>
                </Col>
                <Col span={8}>
                    <TextArea
                        value={icAlsPen}
                        onChange={(e) => seticAlsPen(e.target.value)}
                        rows={4}
                        size='small' />
                </Col>
            </Row>
            <Row
                style={{ marginBottom: '2px' }} >
                <Col span={4}>
                    <span>Dasar Diagnosa :</span>
                </Col>
                <Col span={8}>
                    <TextArea
                        value={icDasDiagnosa}
                        onChange={(e) => seticDasDiagnosa(e.target.value)}
                        rows={4}
                        size='small' />
                </Col>
                <Col span={4}>
                    <span style={{ marginLeft: '5px' }}>Alasan Problem :</span>
                </Col>
                <Col span={8}>
                    <TextArea
                        value={icAlsProb}
                        onChange={(e) => seticAlsProb(e.target.value)}
                        rows={4}
                        size='small' />
                </Col>
            </Row>
            <Row
                style={{ marginBottom: '2px' }} >
                <Col span={4}>
                    <span>Rencana yang Akan Diberikan :</span>
                </Col>
                <Col span={8}>
                    <TextArea
                        value={icRencana}
                        onChange={(e) => seticRencana(e.target.value)}
                        rows={4}
                        size='small' />
                </Col>
                <Col span={4}>
                    <span style={{ marginLeft: '5px' }}>Lain-lain :</span>
                </Col>
                <Col span={8}>
                    <TextArea
                        value={icLainlain}
                        onChange={(e) => seticLainlain(e.target.value)}
                        rows={4}
                        size='small' />
                </Col>
            </Row>
            <Row
                style={{ marginBottom: '2px' }} >
                <Col span={4}>
                    <span>Alternatif yang ditawarkan :</span>
                </Col>
                <Col span={20}>
                    <TextArea
                        value={icAltLain}
                        onChange={(e) => seticAltLain(e.target.value)}
                        rows={4}
                        size='small' />
                </Col>
            </Row>
        </div>
    )
}

export default FormICPenundaan