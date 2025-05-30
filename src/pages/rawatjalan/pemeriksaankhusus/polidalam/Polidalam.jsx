import React from 'react'
import { Form, Row, Col, Input, Card, Button, Divider } from 'antd';
const { TextArea } = Input;

const formItemLayoutdpjp6 = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};
const Polidalam = () => {
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Card>
                        <Divider orientation="left">USG</Divider>
                        <Form.Item {...formItemLayoutdpjp6} name="echo" label="Keterangan" style={{ marginBottom: 0 }}>
                            <TextArea rows={2} placeholder="..." /> <Button>Cetak</Button>
                        </Form.Item>
                    </Card>
                </Col>
                <Col span={24}>
                    <Card>
                        <Divider orientation="left">EKG</Divider>
                        <Form.Item {...formItemLayoutdpjp6} name="ekg" label="Keterangan" style={{ marginBottom: 0 }}>
                            <TextArea rows={2} placeholder="..." /> <Button>Cetak</Button>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default Polidalam
