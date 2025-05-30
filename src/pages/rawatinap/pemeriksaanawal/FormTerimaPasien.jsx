import React, { useContext, useState } from 'react'
import { Form, Row, Col, Input, Button, message, Popconfirm, Space, Card } from 'antd';
import { PasienRIContext } from '../context/PasienRIContext';
import { LoginContext } from '../../rawatjalan/context';
import { TransferPasienRIContext } from '../context/TransferPasienRIContext';
const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
};
const { TextArea } = Input;
const FormTerimaPasien = () => {
    const [form] = Form.useForm();
    const { insertTerimapasienRI,
        tensiAtasSesudah, settensiAtasSesudah,
        tensiBawahSesudah, settensiBawahSesudah,
        nadiSesudah, setnadiSesudah,
        rrsesudah, setrrsesudah,
        suhuSesudah, setsuhuSesudah,
        pemeriksaanFisikSesudah, setpemeriksaanFisikSesudah,
        kulainSesudah, setkulainSesudah,
        sposesudah, setsposesudah, kosongkanformterimapasienri,
        perawatId, setPerawatId } = useContext(TransferPasienRIContext);
    const { curpasRI } = useContext(PasienRIContext);
    const { namauser, pegawai } = useState(LoginContext);
    const ip = sessionStorage.getItem("IP");
    const host = sessionStorage.getItem("Host");

    const dataSerahTerima = {
        registrasiId: curpasRI.registrasiId,
        tensiAtasSesudah: tensiAtasSesudah,
        tensiBawahSesudah: tensiBawahSesudah,
        nadiSesudah: nadiSesudah,
        rrsesudah: rrsesudah,
        suhuSesudah: suhuSesudah,
        pemeriksaanFisikSesudah: pemeriksaanFisikSesudah,
        kulainSesudah: kulainSesudah,
        sposesudah: sposesudah,
        clientHost: host,
        clientIp: ip
    }
    const onTensiAtas = (e) => {
        settensiAtasSesudah(e.target.value)
    }
    const onTensiBawah = (e) => {
        settensiBawahSesudah(e.target.value)
    }
    const onNadi = (e) => {
        setnadiSesudah(e.target.value)
    }
    const onRespirasi = (e) => {
        setrrsesudah(e.target.value)
    }
    const onSuhu = (e) => {
        setsuhuSesudah(e.target.value)
    }
    const onPemeriksaanFisik = (e) => {
        setpemeriksaanFisikSesudah(e.target.value)
    }
    const onLainlain = (e) => {
        setkulainSesudah(e.target.value)
    }
    const onSposesudah = (e) => {
        setsposesudah(e.target.value)
    }
    const onSubmitTerimaPasien = () => {
        console.log(dataSerahTerima);
        insertTerimapasienRI(dataSerahTerima)
    }

    const kosongkanform = () => {
        kosongkanformterimapasienri();
    }
    return (
        <div>
            <Form form={form}  >
                <Card size="small" title="Form Terima Pasien Rawat Inap" headStyle={{ fontWeight: 'bolder', backgroundColor: 'beige' }}>
                    <Row gutter={[8, 8]}>
                        <Col span={12} xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label="Tensi" style={{ marginBottom: 5 }}>
                                <Input.Group compact>
                                    <Input type="number" min={40} max={200} name="tensiatas" style={{ width: '40%' }} placeholder="..." value={tensiAtasSesudah} onChange={onTensiAtas} autoComplete="off" />
                                    <Input type="number" min={10} max={120} style={{ width: '60%' }} suffix="mmHg" placeholder="..." value={tensiBawahSesudah} onChange={onTensiBawah} autoComplete="off" />
                                </Input.Group>
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label="Nadi" style={{ marginBottom: 5 }}>
                                <Input type="number" required suffix="x/menit" style={{ width: '100%' }} value={nadiSesudah} placeholder="..." onChange={onNadi} autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label="Respirasi" style={{ marginBottom: 5 }}>
                                <Input type="number" name="respirasi" suffix="x/menit" style={{ width: '100%' }} value={rrsesudah} autoComplete="off" placeholder="..." onChange={onRespirasi} />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label="Suhu" style={{ marginBottom: 5 }}>
                                <Input type="number" min={0} max={60} step={0.1} suffix="°C" style={{ width: '100%' }} value={suhuSesudah} placeholder="..." onChange={onSuhu} autoComplete="off" />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} md={12} lg={12} xl={8}>
                            <Form.Item {...formItemLayout} label="Perawat Primer" style={{ marginBottom: 5 }}>
                                <Input style={{ width: '100%' }} placeholder="..." autoComplete="off" />
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row>
                        <Col span={12} xs={24} sm={24} md={8} lg={8} xl={8}>
                            <Form.Item {...formItemLayout} label="Pemeriksaan Fisik" style={{ marginBottom: 5 }}>
                                <TextArea style={{ width: '100%' }} placeholder="..." value={pemeriksaanFisikSesudah} onChange={onPemeriksaanFisik} />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} md={4} lg={8} xl={8}>
                            <Form.Item {...formItemLayout} label="Lain-lain" style={{ marginBottom: 5 }}>
                                <TextArea required style={{ width: '100%' }} value={kulainSesudah} placeholder="..." onChange={onLainlain} />
                            </Form.Item>
                        </Col>
                        <Col span={12} xs={24} sm={24} md={4} lg={8} xl={8}>
                            <Form.Item {...formItemLayout} label="SPO" style={{ marginBottom: 5 }}>
                                <TextArea required style={{ width: '100%' }} value={sposesudah} placeholder="..." onChange={onSposesudah} />
                            </Form.Item>
                        </Col>
                    </Row>
                </Card>
                <Card size='small'>
                    <Row gutter={[8, 8]}>
                        <Col span={12} style={{ textAlign: 'left' }}>
                            <Space>
                                <Button>Cetak</Button>
                                <Button>Data Rawat Jalan</Button>
                            </Space>
                        </Col>
                        <Col span={12} style={{ textAlign: 'right' }}>
                            <Space>
                                <Button type="primary" onClick={onSubmitTerimaPasien} >Simpan</Button>
                                <Button onClick={kosongkanform}>Batal</Button>
                            </Space>

                        </Col>
                    </Row>
                </Card>
            </Form>
        </div>
    )
}

export default FormTerimaPasien;
