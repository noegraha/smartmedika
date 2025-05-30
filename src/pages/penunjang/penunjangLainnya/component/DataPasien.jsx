import React from 'react';
import { Card, Form, Col, Row, Input, DatePicker, Button } from "antd";

const DataPasien = () => {
    return (
        <div>
            <Card
                title="Data Pasien"
                size='small'>
                <Row>
                    <Col span={5}>
                        <Card>
                            <Form
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 15 }}>
                                <Form.Item
                                    label="No. Reg"
                                    style={{ marginBottom: "0px" }}>
                                    <Input.Group compact>
                                        <Input
                                            placeholder="RegistrasiId"
                                            size='small'
                                            style={{ width: '75%' }} />
                                        <Button
                                            type='primary'
                                            size='small'
                                            style={{ width: '25%' }}>
                                            ...
                                        </Button>
                                    </Input.Group>
                                </Form.Item>
                                <Form.Item
                                    label="Nomor RM"
                                    style={{ marginBottom: "0px" }}>
                                    <Input
                                        placeholder="Nomor RM"
                                        size='small' />
                                </Form.Item>
                                <Form.Item
                                    label="Tgl. Masuk"
                                    style={{ marginBottom: "0px" }}>
                                    <DatePicker
                                        size='small' />
                                </Form.Item>
                                <Form.Item
                                    label="Jenis Kel."
                                    style={{ marginBottom: "0px" }}>
                                    <Input
                                        placeholder="Jenis Kelamin"
                                        size='small' />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>

                    <Col span={12}>
                        <Card>
                            <Row>
                                <Col span={18}>
                                    <Form
                                        labelCol={{ span: 6 }}
                                        wrapperCol={{ span: 18 }}
                                        labelAlign='left'>
                                        <Form.Item
                                            label="Nama Pasien"
                                            style={{ marginBottom: "0px" }}>
                                            <Input
                                                placeholder="Nama Pasien"
                                                size='small' />
                                        </Form.Item>
                                    </Form>
                                </Col>
                                <Col span={6}>
                                    <Form
                                        labelCol={{ span: 12 }}
                                        wrapperCol={{ span: 12 }}>
                                        <Form.Item
                                            label="Umur"
                                            style={{ marginBottom: "0px" }}>
                                            <Input
                                                placeholder="Umur"
                                                size='small' />
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <Form
                                        labelCol={{ span: 3 }}
                                        wrapperCol={{ span: 21 }}
                                        labelAlign='left'>
                                        <Form.Item
                                            label="Alamat"
                                            style={{ marginBottom: "0px" }}>
                                            <Input
                                                placeholder="Alamat"
                                                size='small' />
                                        </Form.Item>
                                    </Form>
                                </Col>
                            </Row>
                            <Form
                                labelCol={{ span: 9 }}
                                wrapperCol={{ span: 15 }}
                                labelAlign='left'>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Ruang Rawat"
                                            style={{ marginBottom: "0px" }}>
                                            <Input
                                                placeholder="Ruang Rawat"
                                                size='small'
                                                style={{ width: '95%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Jatah Kelas"
                                            style={{ marginBottom: "0px" }}>
                                            <Input
                                                placeholder="Jatah Kelas"
                                                size='small' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Kelas Rawat"
                                            style={{ marginBottom: "0px" }}>
                                            <Input
                                                placeholder="Kelas Rawat"
                                                size='small'
                                                style={{ width: '95%' }} />
                                        </Form.Item>
                                    </Col>
                                    <Col span={12}>
                                        <Form.Item
                                            label="Pembayaran"
                                            style={{ marginBottom: "0px" }}>
                                            <Input
                                                placeholder="Pembayaran"
                                                size='small' />
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Form>
                        </Card>
                    </Col>
                    <Col span={7}>
                        <Card>
                            <Form
                                labelCol={{ span: 10 }}
                                wrapperCol={{ span: 14 }}>
                                <Form.Item
                                    label="Nama Ibu Kandung"
                                    style={{ marginBottom: "0px" }}>
                                    <Input
                                        placeholder="Nama Ibu Kandung"
                                        size='small' />
                                </Form.Item>
                                <Form.Item
                                    label="Penanggung Jawab"
                                    style={{ marginBottom: "0px" }}>
                                    <Input
                                        placeholder="Penanggung Jawab"
                                        size='small' />
                                </Form.Item>
                                <Form.Item
                                    label="No. SEP"
                                    style={{ marginBottom: "0px" }}>
                                    <Input
                                        placeholder="No. SEP"
                                        size='small' />
                                </Form.Item>
                                <Form.Item
                                    label="No.Kartu Peserta"
                                    style={{ marginBottom: "0px" }}>
                                    <Input
                                        placeholder="No.Kartu Peserta"
                                        size='small' />
                                </Form.Item>
                            </Form>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default DataPasien
