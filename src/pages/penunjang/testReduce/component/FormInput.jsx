import React from 'react'
import { useForm } from '../context/FormContext';
import { Button, Col, Input, Row, Space } from 'antd';

const FormInput = () => {
    const { state, dispatch } = useForm();

    const handleChange = (e) => {
        dispatch({
            type: 'UPDATE_FIELD',
            field: e.target.name,
            value: e.target.value,
        });
    };

    const klikReset = () => {
        dispatch({
            type: 'RESET_FORM'
        });
    };

    const handleSave = () => {
        console.log("Seluruh State:", state.form);
    };

    return (
        <div>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={2}>
                    <span>Nama : </span>
                </Col>
                <Col span={5}>
                    <Input
                        name='nama'
                        value={state.form.nama}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row style={{ marginBottom: '5px' }}>
                <Col span={2}>
                    <span>Alamat : </span>
                </Col>
                <Col span={5}>
                    <Input
                        name='alamat'
                        value={state.form.alamat}
                        onChange={handleChange}
                    />
                </Col>
            </Row>
            <Row>
                <Col span={24}>
                    <Space>
                        <Button
                            type='primary'
                            onClick={handleSave}
                            style={{ width: '150px' }}
                        >
                            Simpan
                        </Button>
                        <Button
                            // type='primary'
                            onClick={klikReset}
                            style={{ width: '150px' }}
                        >
                            Reset
                        </Button>
                    </Space>
                </Col>
            </Row>
        </div>
    )
}

export default FormInput