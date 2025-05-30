import React from 'react';
import { Table, Col, Row, Form, Card, Button, Radio, Input } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const FormDiagnosaKeperawatan = () => {
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

    const data = [
        {
            key: '1',
            diagnosa: 'Resiko Infeksi'
        },
        {
            key: '2',
            diagnosa: 'Kelebihan Volume Cairan'
        },
        {
            key: '3',
            diagnosa: 'Fatigue'
        },
        {
            key: '4',
            diagnosa: 'Nyeri Kronis'
        },
        {
            key: '5',
            diagnosa: 'Kurang Pengetahuan'
        },
        {
            key: '6',
            diagnosa: 'Ketidakseimbangan Nutrisi Kurang dari Kebutuhan Tubuh'
        },
        {
            key: '7',
            diagnosa: 'Insomnia'
        },
        {
            key: '8',
            diagnosa: 'Resiko Ketidakseimbangan Elektrolit'
        },
        {
            key: '9',
            diagnosa: 'Resiko Jatuh'
        },
        {
            key: '10',
            diagnosa: 'Defisiensi Volume Cairan'
        },
    ];

    // const onSimpanDiagnosaKeperawatan = () => {
    //     message.info("tombol simpan");
    // }
    // const onCanceltip = () => {
    //     message.error("Batal disimpan!");
    // }
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
                <Row>
                    <Card
                        size="small"
                        title="Diagnosa Keperawatan"
                        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
                        style={{
                            marginBottom: 6,
                            borderWidth: "2px",
                            borderColor: "darkgray",
                            borderRadius: "4px"
                        }}>
                        <Table bordered scroll={{ x: '100px', y: '300px' }} pagination={false} size="small"
                            rowSelection={{
                                type: "checkbox", columnWidth: "60px", fixed: "right"
                            }}
                            columns={columns} dataSource={data}
                        />

                        <br />
                        Adakah diagnosa keperawatan yang lainnya ? {"   "}
                        <Radio.Group onChange={(e) => radioHandler(e)}>
                            <Radio value={1}>Ya</Radio>
                            <Radio value={2} onClick={onClear}>Tidak</Radio>
                        </Radio.Group>
                        <TextArea placeholder="..." />

                        <Row style={{ marginTop: 10 }}>
                            <Col span={24} style={{ textAlign: "right" }}>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    onClick={(e) => onSubmit(e)}
                                >
                                    Simpan
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Row>
            </Form>
        </div>
    )
}

export default FormDiagnosaKeperawatan;