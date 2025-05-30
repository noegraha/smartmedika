import React from 'react';
import { Table, Col, Row, Form, Card, Button, Radio, Input } from 'antd';

const { TextArea } = Input;
const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 22 },
};

const FormEvaluasiKeperawatan = () => {
    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            width: '50px'
        },
        {
            title: 'Diagnosa',
            dataIndex: 'diagnosa',
            key: 'diagnosa'
        }
    ];

    const dataPrePost = [
        {
            key: '1',
            diagnosa: 'Demam'
        },
        {
            key: '2',
            diagnosa: 'Nyeri dada'
        },
        {
            key: '3',
            diagnosa: 'Aritmia'
        },
        {
            key: '4',
            diagnosa: 'Hipotensi'
        },
        {
            key: '5',
            diagnosa: 'Hipertensi'
        },
        {
            key: '6',
            diagnosa: 'Mual dan muntah'
        },
        {
            key: '7',
            diagnosa: 'Pendarahan'
        },
        {
            key: '8',
            diagnosa: 'Masalah akses'
        },
        {
            key: '9',
            diagnosa: 'Sakit kepala'
        },
        {
            key: '10',
            diagnosa: 'Kram otot'
        },
        {
            key: '11',
            diagnosa: 'Menggigil / dingin'
        },
        {
            key: '12',
            diagnosa: 'First use syndrom'
        },
        {
            key: '13',
            diagnosa: 'Hiperkalemia'
        },
        {
            key: '14',
            diagnosa: 'Gatal-gatal'
        },
    ];

    const radioHandler = (e) => {
    }
    const onClear = () => {
    }
    const onSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <Form>
                <Row gutter={[8, 8]}>
                    <Col span={8}>
                        <Card
                            size="small"
                            title="Komplikasi Intradialisis"
                            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                            style={{
                                marginBottom: 6,
                                borderWidth: "2px",
                                borderColor: "darkgray",
                                borderRadius: "4px",
                            }}
                        >
                            <Table bordered scroll={{ x: '100px', y: '300px' }} pagination={false} size="small"
                                rowSelection={{
                                    type: "checkbox", columnWidth: "60px", fixed: "right"
                                }}
                                columns={columns} dataSource={dataPrePost}
                            />
                        </Card>
                    </Col>
                    <Col span={16}>
                        <Card
                            size="small"
                            title="Discharge Planning"
                            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                            style={{
                                marginBottom: 6,
                                borderWidth: "2px",
                                borderColor: "darkgray",
                                borderRadius: "4px",
                            }}
                        >
                            <Form.Item {...formItemLayout} label="S" style={{ marginBottom: 2 }}>
                                <TextArea rows={3} placeholder="..." />
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="O" style={{ marginBottom: 2 }}>
                                <TextArea rows={3} placeholder="..." />
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="A" style={{ marginBottom: 2 }}>
                                <TextArea rows={3} placeholder="CKD Post Hemodialisis, Diagnosa Keperawatan" />
                            </Form.Item>
                            <Form.Item {...formItemLayout} label="P" style={{ marginBottom: 2 }}>
                                <TextArea rows={3} placeholder="Catatan HD y.a.d" />
                            </Form.Item>
                        </Card>
                    </Col>
                </Row>
                <Row style={{ textAlign: "right" }}>
                    <Col span={12}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            Akses Vaskuler Oleh
                            <br />
                            <img
                                style={{
                                    width: 200,
                                    height: 90,
                                    backgroundColor: "#fff",
                                    borderStyle: "solid",
                                    borderRadius: 10,
                                    borderWidth: 1,
                                }}
                                // src={tandatangan}
                                // onClick={onVerified}
                                alt="Klik Disini untuk Tanda Tangan"
                            />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item style={{ marginBottom: 0 }}>
                            Perawat Penanggung Jawab
                            <br />
                            <img
                                style={{
                                    width: 200,
                                    height: 90,
                                    backgroundColor: "#fff",
                                    borderStyle: "solid",
                                    borderRadius: 10,
                                    borderWidth: 1,
                                }}
                                // src={tandatangan}
                                // onClick={onVerified}
                                alt="Klik Disini untuk Tanda Tangan"
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Row>
                    <Col span={24} style={{ textAlign: "right", marginTop: 10 }}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={(e) => onSubmit(e)}
                        >
                            Simpan
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    )
}

export default FormEvaluasiKeperawatan;