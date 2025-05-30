import React, { useContext } from 'react'
import { Form, Row, Col, Input, Button, Card, Tabs, Popconfirm, message } from 'antd';
import { CatatanmedisContext } from '../../rawatjalan/context/CatatanmedisContext';
import { PasienContextRI } from '../context/PasienRIContext';
const { TextArea } = Input;
const { TabPane } = Tabs;

const FormSoapRI = () => {
    const { curpasRI } = useContext(PasienContextRI);
    const { insertCatatanMedis, subjektif, objektif, assesment, planning,
        setSubjektif, setObjektif, setAssesment, setPlanning, instruksi, setinstruksi, evaluasi, setevaluasi, implementasi, setimplementasi
    } = useContext(CatatanmedisContext);

    const dataCatatanMedis = {
        registrasiId: curpasRI.registrasiId,
        subjektif: subjektif,
        objektif: objektif,
        assesment: assesment,
        planning: planning,
        instruksi: instruksi,
        evaluasi: evaluasi,
        implementasi: implementasi,
        pelaksanaId: curpasRI.pegawaiId,
        namaProfesi: "coba",
        userId: "agung",
        ruangId: curpasRI.ruangId,
        //skalaNyeri: "10",
        citasi: "5",
        citNomer: 0,
        citated: 0,
    }
    const onImplementasi = (e) => {
        setimplementasi(e.target.value);
    }
    const onEvaluasi = (e) => {
        setevaluasi(e.target.value);
    }
    const onSubject = (e) => {
        setSubjektif(e.target.value);
    }
    const onIntruksiA = (e) => {
        setinstruksi(e.target.value);
    }
    // const onIntruksiB = (e) => {
    //     setIntruksiB(e.target.value);
    // }
    const onAssesment = (e) => {
        setAssesment(e.target.value);
    }
    const onObject = (e) => {
        setObjektif(e.target.value);
    }
    const onTerapi = (e) => {
        setPlanning(e.target.value);
    }
    const simpanCatatanMedis = (e) => {
        // e.preventDefault();
        insertCatatanMedis(dataCatatanMedis);
        console.log('catatan', dataCatatanMedis);
    }
    const onCanceltip = (e) => {
        message.error('Batal Simpan')
    }
    return (
        <div>
            <Card>
                <Tabs defaultActiveKey="1" >
                    <TabPane tab="Subjektif" key="1">
                        <Form.Item name="Subjektif" style={{ marginBottom: 0 }}>
                            <TextArea rows={6} placeholder="..." onChange={onSubject} />
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="Objektif" key="2">
                        <Form.Item name="Objektif" style={{ marginBottom: 0 }}>
                            <TextArea rows={6} placeholder="..." onChange={onObject} />
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="Assesment" key="3">
                        <Form.Item name="Assesment" style={{ marginBottom: 0 }}>
                            <TextArea rows={6} placeholder="..." onChange={onAssesment} />
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="Planning" key="4">
                        <Form.Item name="Planning" style={{ marginBottom: 0 }}>
                            <TextArea rows={6} placeholder="..." onChange={onTerapi} />
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="Implementasi" key="5">
                        <Form.Item name="Implementasi" style={{ marginBottom: 0 }}>
                            <TextArea rows={6} placeholder="..." onChange={onImplementasi} />
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="Evaluasi" key="6">
                        <Form.Item name="Evaluasi" style={{ marginBottom: 0 }}>
                            <TextArea rows={6} placeholder="..." onChange={onEvaluasi} />
                        </Form.Item>
                    </TabPane>
                    <TabPane tab="Instruksi" key="7">
                        <Form.Item name="Instruksi" style={{ marginBottom: 0 }}>
                            <Row gutter={[8, 8]}>
                                <Col span={14}>
                                    <TextArea rows={6} placeholder="..." onChange={onIntruksiA} />
                                </Col>
                                <Col span={10}>
                                    <TextArea rows={6} placeholder="..." />
                                </Col>
                            </Row>
                        </Form.Item>
                    </TabPane>
                    {/* <TabPane tab="Tindakan Keperawatan" key="8">
                        <Form.Item name="TindakanKep" style={{ marginBottom: 0 }}> */}
                    {/* <Row>
                                <Col span={12}>
                                    <Form.Item {...formItemLayout} name="kdtindakan" label="Kode Tindakan" style={{ marginBottom: 0 }}>
                                        <Select
                                            showSearch
                                            style={{ width: '80%' }}
                                            placeholder="..."
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="Bicara1">Tode Tindakan</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item {...formItemLayout} name="jnstindakan" label="Jenis Tindakan" style={{ marginBottom: 0 }}>
                                        <Select
                                            showSearch
                                            style={{ width: '80%' }}
                                            placeholder="..."
                                            optionFilterProp="children"
                                            onChange={onChange}
                                            onFocus={onFocus}
                                            onBlur={onBlur}
                                            onSearch={onSearch}
                                            filterOption={(input, option) =>
                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                            }
                                        >
                                            <Option value="Bicara1">Pemasangan</Option>
                                            <Option value="Bicara1">Pelepasan</Option>
                                        </Select>
                                    </Form.Item>
                                    <Form.Item {...formItemLayout} name="tanggaltindakan" label="Tanggal" style={{ marginBottom: 0 }}>
                                        <DatePicker showTime format="YYYY-MM-DD" style={{ width: '80%' }} placeholder="..." />
                                    </Form.Item>
                                    <Form.Item {...formItemLayout} name="tanggaltindakan" label="Tanggal" style={{ marginBottom: 0 }}>
                                        <TimePicker />,
                                                </Form.Item>
                                </Col>
                                <Col span={12}>
                                    <Table dataSource={dataSource} columns={columns} />
                                </Col>
                            </Row> */}
                    {/* </Form.Item>
                    </TabPane> */}
                    {/* <TabPane tab="Diagnosa Pulang" key="9">
                        <Form.Item name="Diagnosapulang" style={{ marginBottom: 0 }}>
                            <TextArea rows={6} placeholder="..." />
                        </Form.Item>
                    </TabPane> */}
                </Tabs>
                <Row>
                    <Col span={24} style={{ textAlign: 'right' }}>
                        <Popconfirm
                            title="Apakah data sudah benar?"
                            onConfirm={simpanCatatanMedis}
                            onCancel={onCanceltip}
                            okText="Ya"
                            cancelText="Tidak"
                        >
                            <Button style={{ width: '10%' }} type="primary" htmlType="submit">Simpan</Button>
                        </Popconfirm>
                        <Button style={{ width: '10%' }}>Batal</Button>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default FormSoapRI
