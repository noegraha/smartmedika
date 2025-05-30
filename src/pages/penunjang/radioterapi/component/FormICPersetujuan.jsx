import { Col, Divider, Input, Row, Select, Switch } from 'antd'
import React from 'react'
import { useContext } from 'react';
import { RadioterapiContext } from '../context/RadioterapiContext';

const { Option } = Select;

const FormICPersetujuan = () => {
    const {
        icDiagWd, seticDiagWd,
        icCkDiagWd, seticCkDiagWd,
        icDsrDiag, seticDsrDiag,
        icCkDsrDiag, seticCkDsrDiag,
        icTinDok, seticTinDok,
        icCkTinDok, seticCkTinDok,
        icIndTin, seticIndTin,
        icCkIndTin, seticCkIndTin,
        icTatacara, seticTatacara,
        icCkTatacara, seticCkTatacara,
        icTujuan, seticTujuan,
        icCkTujuan, seticCkTujuan,
        icRisiko, seticRisiko,
        icCkRisiko, seticCkRisiko,
        icKomplikasi, seticKomplikasi,
        icCkKomplikasi, seticCkKomplikasi,
        icPrognosis, seticPrognosis,
        icCkPrognosis, seticCkPrognosis,
        icAltRes, seticAltRes,
        icCkAltRes, seticCkAltRes,
    } = useContext(RadioterapiContext)

    return (
        <div>
            <Divider orientation='left' style={{ backgroundColor: '#d9f7be', margin: '0px' }}>Form Persetujuan/ Penolakan</Divider>
            <Row style={{ marginBottom: '2px', marginTop: '2px' }}>
                <Col span={6}>
                    <span><b>Informasi yang disampaikan :</b></span>
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Diagnosis WD DD :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icDiagWd}
                        disabled={!icCkDiagWd}
                        onChange={(e) => seticDiagWd(e.target.value)}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkDiagWd}
                        onChange={() => seticCkDiagWd(!icCkDiagWd)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Dasar Diagnosis :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icDsrDiag}
                        onChange={(e) => seticDsrDiag(e.target.value)}
                        disabled={!icCkDsrDiag}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkDsrDiag}
                        onChange={() => seticCkDsrDiag(!icCkDsrDiag)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Tindakan Kedokteran :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icTinDok}
                        onChange={(e) => seticTinDok(e.target.value)}
                        disabled={!icCkTinDok}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkTinDok}
                        onChange={() => seticCkTinDok(!icCkTinDok)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Indikasi Tindakan :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icIndTin}
                        onChange={(e) => seticIndTin(e.target.value)}
                        disabled={!icCkIndTin}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkIndTin}
                        onChange={() => seticCkIndTin(!icCkIndTin)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Tatacara :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icTatacara}
                        onChange={(e) => seticTatacara(e.target.value)}
                        disabled={!icCkTatacara}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkTatacara}
                        onChange={() => seticCkTatacara(!icCkTatacara)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Tujuan :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icTujuan}
                        onChange={(e) => seticTujuan(e.target.value)}
                        disabled={!icCkTujuan}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkTujuan}
                        onChange={() => seticCkTujuan(!icCkTujuan)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Risiko :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icRisiko}
                        onChange={(e) => seticRisiko(e.target.value)}
                        disabled={!icCkRisiko}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkRisiko}
                        onChange={() => seticCkRisiko(!icCkRisiko)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Komplikasi :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icKomplikasi}
                        onChange={(e) => seticKomplikasi(e.target.value)}
                        disabled={!icCkKomplikasi}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkKomplikasi}
                        onChange={() => seticCkKomplikasi(!icCkKomplikasi)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Prognosis :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icPrognosis}
                        onChange={(e) => seticPrognosis(e.target.value)}
                        disabled={!icCkPrognosis}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkPrognosis}
                        onChange={() => seticCkPrognosis(!icCkPrognosis)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <Row style={{ marginBottom: '2px' }}>
                <Col span={4}>
                    <span>Alternatif dan Resiko :</span>
                </Col>
                <Col span={18}>
                    <Input
                        value={icAltRes}
                        onChange={(e) => seticAltRes(e.target.value)}
                        disabled={!icCkAltRes}
                        type='text'
                        size='small'
                    />
                </Col>
                <Col span={2} style={{ textAlign: 'center' }}>
                    <Switch
                        checked={icCkAltRes}
                        onChange={() => seticCkAltRes(!icCkAltRes)}
                        checkedChildren="Ya"
                        unCheckedChildren="Tidak" />
                </Col>
            </Row>
            <hr />

            <Row>
                <Col>
                    <span><b>Saya Memahami perlunya dan manfaat pemeriksaan radioterapi tersebut sebagaimana telah dijelaskan
                        seperti diatas kepada saya, termasuk risiko dan komplikasi yang mungkin timbul.</b>
                    </span>
                </Col>
            </Row>
        </div>
    )
}

export default FormICPersetujuan