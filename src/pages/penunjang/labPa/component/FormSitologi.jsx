import { Card, Col, Input, Row } from 'antd'
import React from 'react'

const { TextArea } = Input;

const FormSitologi = () => {
    return (
        <div>
            <Card
                bodyStyle={{ padding: '5px' }}>
                <Row>
                    <Col span={2}>
                        <span>Makroskopis :</span>
                    </Col>
                    <Col span={22}>
                        <TextArea
                            // value={anamnesa}
                            // onChange={(e) => setanamnesa(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <span>Mikroskopis :</span>
                    </Col>
                    <Col span={22}>
                        <TextArea
                            // value={anamnesa}
                            // onChange={(e) => setanamnesa(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <span>Kesimpulan :</span>
                    </Col>
                    <Col span={22}>
                        <TextArea
                            // value={anamnesa}
                            // onChange={(e) => setanamnesa(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <span>Saran :</span>
                    </Col>
                    <Col span={22}>
                        <TextArea
                            // value={anamnesa}
                            // onChange={(e) => setanamnesa(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default FormSitologi