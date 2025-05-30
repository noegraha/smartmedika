import { Button, Card, Col, Row, Space } from 'antd'
import React from 'react'
import FormPenunjangLainnya from './FormPenunjangLainnya'
import TabelPemeriksaan from './TabelPemeriksaan'

const PenunjangLainnyaBody = () => {
    return (
        <div>
            <Card>
                <Row>
                    <Col span={7}>
                        <Card>
                            <TabelPemeriksaan />
                        </Card>
                    </Col>
                    <Col span={17}>
                        <Card>
                            <FormPenunjangLainnya />
                        </Card>
                    </Col>
                </Row>
                <Space style={{ float: 'right', marginTop: '5px' }}>
                    <Button type='primary'>
                        Simpan
                    </Button>
                    <Button>
                        Batal
                    </Button>
                    <Button type='primary' danger>
                        Hapus
                    </Button>
                </Space>
            </Card>
        </div>
    )
}

export default PenunjangLainnyaBody
