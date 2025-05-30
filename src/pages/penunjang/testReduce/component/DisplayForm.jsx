import React from 'react'
import { useForm } from '../context/FormContext';
import { Card, Col, Input, Row } from 'antd';

const DisplayForm = () => {
    const { state } = useForm();

    return (
        <div>
            <Card
                title='Data yang Diinput'
                style={{ marginTop: '5px' }}>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={2}>
                        <span>Nama : </span>
                    </Col>
                    <Col span={5}>
                        <Input
                            name='nama'
                            value={state.form.nama}
                        // onChange={handleChange}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={2}>
                        <span>Alamat : </span>
                    </Col>
                    <Col span={5}>
                        <Input
                            name='alamat'
                            value={state.form.alamat}
                        // onChange={handleChange}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default DisplayForm