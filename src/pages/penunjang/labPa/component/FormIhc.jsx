import { Button, Card, Col, Input, Modal, Row, Select, Space, Table } from 'antd'
import React, { useState } from 'react'
import {
    PlusOutlined,
    EditOutlined,
    DeleteOutlined,
} from "@ant-design/icons";

const { TextArea } = Input;
const { Option } = Select;

const FormIhc = () => {
    const [jenis, setjenis] = useState('')
    const [deskHasil, setdeskHasil] = useState('')
    const [dtIhc, setdtIhc] = useState([])
    const [tempIndex, settempIndex] = useState('')
    // md
    const [mdTambahIhc, setmdTambahIhc] = useState(false)

    const columns = [
        {
            title: 'Jenis',
            dataIndex: 'jenis',
            key: 'jenis',
            width: 200,
        },
        {
            title: 'Deskripsi Hasil',
            dataIndex: 'deskHasil',
            key: 'deskHasil',
        },
        {
            title: "Aksi",
            key: "operation",
            fixed: "right",
            align: "center",
            width: 90,
            render: (text, record, index) => (
                <Space size="small">
                    <Button
                        onClick={() => klikEditIhc(index)}
                        type="primary"
                        icon={<EditOutlined />}
                        // disabled={record.StsDatang}
                        // disabled
                        size="small"
                        style={{ width: '30px' }}
                    />
                    <Button
                        type="primary"
                        danger
                        onClick={() => klikDelIhc(index)}
                        size="small"
                        style={{ width: '30px' }}
                    >
                        <DeleteOutlined />
                    </Button>
                </Space>
            ),
        },
    ]

    const locale = {
        emptyText: 'Detail Ihc Kosong',
    };

    const klikTambah = () => {
        setmdTambahIhc(true)
        setjenis('')
        setdeskHasil('')
        settempIndex('')
    }

    const klikSimpanTambah = () => {
        if (tempIndex === null || tempIndex.length === 0) {
            setdtIhc((current) => [
                ...current,
                {
                    jenis: jenis,
                    deskHasil: deskHasil,
                },
            ]);
            setmdTambahIhc(false)
        }
        else {
            let items = [...dtIhc];
            let item = { ...items[tempIndex] };

            item.jenis = jenis;
            item.deskHasil = deskHasil;

            items[tempIndex] = item;
            setdtIhc(items);
            setmdTambahIhc(false)
        }
    }

    const klikEditIhc = (index) => {
        setmdTambahIhc(true)
        let temp = dtIhc[index]

        settempIndex(index)
        setjenis(temp.jenis)
        setdeskHasil(temp.deskHasil)
    }

    const klikDelIhc = (index) => {
        setdtIhc((prevAction) =>
            prevAction.filter((value, i) => i !== index)
        );
    };

    return (
        <div>
            <Card
                bodyStyle={{ padding: '5px' }}>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={24}>
                        <Button
                            type='primary'
                            onClick={() => klikTambah()}
                            icon={<PlusOutlined />}
                            // disabled={noReg.length === 0 ? true : false}
                            style={{ width: '150px' }}>
                            Tambah
                        </Button>
                    </Col>
                </Row>

                <Table
                    columns={columns}
                    dataSource={dtIhc}
                    locale={locale}
                    size='small'
                    scroll={{
                        y: 310,
                    }}
                    bordered
                    pagination={false}
                    style={{ marginTop: '2px', width: '100%' }} />

                <Row style={{ marginTop: '5px' }}>
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

                <Row style={{ marginTop: '0px' }}>
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

            <Modal
                title="Tambah Detail IHC"
                visible={mdTambahIhc}
                // onCancel={() => setmdTambahIhc(false)}
                closable={false}
                footer={null}
                width={800}
                style={{ top: 100 }}
            >
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={4}>
                        <span>Jenis :</span>
                    </Col>
                    <Col span={20}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            value={jenis}
                            onChange={(e) => setjenis(e)}
                            size='small'
                            showSearch={true}
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            <Option key='1' value='jenis 1'>Jenis 1</Option>
                            <Option key='2' value='jenis 2'>Jenis 2</Option>
                            <Option key='3' value='jenis 3'>Jenis 3</Option>
                        </Select>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={4}>
                        <span>Deskripsi Hasil :</span>
                    </Col>
                    <Col span={20}>
                        <TextArea
                            value={deskHasil}
                            onChange={(e) => setdeskHasil(e.target.value)}
                            rows={4}
                            showCount
                            placeholder="..."
                            maxLength={4000}
                        />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button
                                type='primary'
                                onClick={() => klikSimpanTambah()}
                                // icon={<SaveOutlined />}
                                // disabled={noReg.length === 0 ? true : false}
                                style={{ width: '100px' }}>
                                Simpan
                            </Button>
                            <Button
                                // type='primary'
                                onClick={() => setmdTambahIhc(false)}
                                // icon={<PrinterOutlined />}
                                // disabled={noReg.length === 0 ? true : false}
                                style={{ width: '100px' }}>
                                Batal
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Modal>
        </div>
    )
}

export default FormIhc