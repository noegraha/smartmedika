import { Card, Col, Row } from 'antd'
import React from 'react'
import MasterKelompokPenunjangContextProvider from '../context/MasterKelompokPenunjangContext'
import FormKelompokPenunjang from './FormKelompokPenunjang'
import FormKelompokPenunjangDokter from './FormKelompokPenunjangDokter'
import FormKelompokPenunjangRuang from './FormKelompokPenunjangRuang'

const MasterPemeriksaPenunjang = () => {
    return (
        <div>
            <MasterKelompokPenunjangContextProvider>
                <Card title="Master Pemeriksa Penunjang">
                    <Row>
                        <Col span={12}>
                            <FormKelompokPenunjang />
                            <FormKelompokPenunjangRuang />
                        </Col>
                        <Col span={12}>
                            <FormKelompokPenunjangDokter />
                        </Col>
                    </Row>
                </Card>
            </MasterKelompokPenunjangContextProvider>
        </div>
    )
}

export default MasterPemeriksaPenunjang
