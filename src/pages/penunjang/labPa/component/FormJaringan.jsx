import { Card, Col, Input, Row, Tabs } from 'antd'
import React from 'react'

const { TabPane } = Tabs;
const { TextArea } = Input;

const FormJaringan = () => {
    return (
        <div>
            <Card
                bodyStyle={{ padding: '5px' }}>
                <Tabs
                    defaultActiveKey="1"
                    size='small'
                    type='card'>
                    <TabPane tab="Organ" key="1">
                        <Row>
                            <Col>
                                <span>Organ :</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <TextArea
                                    // value={anamnesa}
                                    // onChange={(e) => setanamnesa(e.target.value)}
                                    rows={10}
                                    showCount
                                    placeholder="..."
                                    maxLength={4000}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Makroskopis" key="2">
                        <Row>
                            <Col>
                                <span>Makroskopis :</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <TextArea
                                    // value={anamnesa}
                                    // onChange={(e) => setanamnesa(e.target.value)}
                                    rows={10}
                                    showCount
                                    placeholder="..."
                                    maxLength={4000}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Mikroskopis" key="3">
                        <Row>
                            <Col>
                                <span>Mikroskopis :</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <TextArea
                                    // value={anamnesa}
                                    // onChange={(e) => setanamnesa(e.target.value)}
                                    rows={10}
                                    showCount
                                    placeholder="..."
                                    maxLength={4000}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Kesimpulan" key="4">
                        <Row>
                            <Col>
                                <span>Kesimpulan :</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <TextArea
                                    // value={anamnesa}
                                    // onChange={(e) => setanamnesa(e.target.value)}
                                    rows={10}
                                    showCount
                                    placeholder="..."
                                    maxLength={4000}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Saran" key="5">
                        <Row>
                            <Col>
                                <span>Saran :</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <TextArea
                                    // value={anamnesa}
                                    // onChange={(e) => setanamnesa(e.target.value)}
                                    rows={10}
                                    showCount
                                    placeholder="..."
                                    maxLength={4000}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                    <TabPane tab="Catatan" key="6">
                        <Row>
                            <Col>
                                <span>Catatan :</span>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <TextArea
                                    // value={anamnesa}
                                    // onChange={(e) => setanamnesa(e.target.value)}
                                    rows={10}
                                    showCount
                                    placeholder="..."
                                    maxLength={4000}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                </Tabs>
            </Card>
        </div>
    )
}

export default FormJaringan