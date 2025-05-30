import { Button, Col, DatePicker, Divider, Input, InputNumber, Modal, Row, Select, Space, Spin, Typography } from 'antd'
import dayjs from 'dayjs';
import React, { useContext } from 'react'
import DetailOrderDarah from './pelayanan/DetailOrderDarah';
import { CheckSquareOutlined } from '@ant-design/icons';
import { BankDarahContext } from '../context/BankDarahContext';

const { Option } = Select;
const { TextArea } = Input;

const PenerimaanSampleDarah = () => {
    const {
        dtOrder,
        ruangIdValid,
        kesesuaianIdentitas, setkesesuaianIdentitas,
        ketkesesuaianIdentitas, setketkesesuaianIdentitas,
        volSampel, setvolSampel,
        ketVolSampel, setketVolSampel,
        kondSampel, setkondSampel,
        ketKondSampel, setketKondSampel,
        jnsDarahJml, setjnsDarahJml,
        ketJnsDarahJml, setketJnsDarahJml,
        tglPenerimaan, settglPenerimaan,
        ptgPenerima, setptgPenerima,
        userValid,
        user,
        ipClient,
        hostClient,
        // func
        validOrder,
        updateValidOrder,
        // sp
        spValid,
    } = useContext(BankDarahContext)

    const klikValidasi = () => {
        if (!kesesuaianIdentitas) {
            Modal.warning({ title: 'Peringatan!', content: 'Kesesuaian pemeriksaan identitas sample masih kosong!' })
        }
        else if (kesesuaianIdentitas === 'Tidak Sesuai' && !ketkesesuaianIdentitas) {
            Modal.warning({ title: 'Peringatan!', content: 'Keterangan Kesesuaian pemeriksaan identitas sample masih kosong!' })
        }
        else if (!volSampel) {
            Modal.warning({ title: 'Peringatan!', content: 'Volume Sampel masih kosong!' })
        }
        else if (volSampel === 'Tidak Sesuai' && !ketVolSampel) {
            Modal.warning({ title: 'Peringatan!', content: 'Keterangan Volume Sampel masih kosong!' })
        }
        else if (!kondSampel) {
            Modal.warning({ title: 'Peringatan!', content: 'Kondisi Sampel masih kosong!' })
        }
        else if (kondSampel === 'Tidak Sesuai' && !ketKondSampel) {
            Modal.warning({ title: 'Peringatan!', content: 'Keterangan Kondisi Sampel masih kosong!' })
        }
        else if (!jnsDarahJml) {
            Modal.warning({ title: 'Peringatan!', content: 'Jenis Darah dan Jumlah masih kosong!' })
        }
        else if (jnsDarahJml === 'Tidak Sesuai' && !ketJnsDarahJml) {
            Modal.warning({ title: 'Peringatan!', content: 'Keterangan Jenis Darah dan Jumlah masih kosong!' })
        }
        else {
            let data = {}

            data.noOrder = dtOrder.NoOrder;
            data.ruangId = ruangIdValid;
            data.kesesuaianIdentitas = kesesuaianIdentitas;
            data.ketKesesuaianIdentitas = ketkesesuaianIdentitas;
            data.volSampel = volSampel;
            data.ketVolSampel = ketVolSampel;
            data.kondSampel = kondSampel;
            data.ketKondSampel = ketKondSampel;
            data.jenisDarahJumlah = jnsDarahJml;
            data.ketJenisDarahJumlah = ketJnsDarahJml;
            data.tglValidasi = dayjs(tglPenerimaan).format();
            data.userId = userValid;
            data.clientIP = ipClient;
            data.clientHost = hostClient;
            data.user = user;

            console.log('klikValidasi : ', data);
            validOrder(data)
        }
    }

    const klikSimpan = () => {
        if (kesesuaianIdentitas === 'Tidak Sesuai' && !ketkesesuaianIdentitas) {
            Modal.warning({ title: 'Peringatan!', content: 'Keterangan Kesesuaian pemeriksaan identitas sample masih kosong!' })
        }
        else if (volSampel === 'Tidak Sesuai' && !ketVolSampel) {
            Modal.warning({ title: 'Peringatan!', content: 'Keterangan Volume Sampel masih kosong!' })
        }
        else if (kondSampel === 'Tidak Sesuai' && !ketKondSampel) {
            Modal.warning({ title: 'Peringatan!', content: 'Keterangan Kondisi Sampel masih kosong!' })
        }
        else if (jnsDarahJml === 'Tidak Sesuai' && !ketJnsDarahJml) {
            Modal.warning({ title: 'Peringatan!', content: 'Keterangan Jenis Darah dan Jumlah masih kosong!' })
        }
        else if (ptgPenerima !== userValid) {
            Modal.warning({ title: 'Peringatan!', content: 'User Valid berbeda dengan User Anda!' })
        }
        else {
            let data = {}

            data.noOrder = dtOrder.NoOrder;
            data.kesesuaianIdentitas = kesesuaianIdentitas;
            data.ketKesesuaianIdentitas = ketkesesuaianIdentitas;
            data.volSampel = volSampel;
            data.ketVolSampel = ketVolSampel;
            data.kondSampel = kondSampel;
            data.ketKondSampel = ketKondSampel;
            data.jenisDarahJumlah = jnsDarahJml;
            data.ketJenisDarahJumlah = ketJnsDarahJml;
            data.userId = userValid;

            console.log('klikSimpan : ', data);
            updateValidOrder(data)
        }
    }

    return (
        <div>
            <Row>
                <Col span={12} style={{ backgroundColor: Object.keys(dtOrder).length !== 0 && dtOrder.StatusValid.trim() === "1" ? '#d9f7be' : 'transparent' }}>
                    <DetailOrderDarah />
                </Col>

                <Col span={12}>
                    <Divider
                        orientation='left'
                        style={{ backgroundColor: '#fff1b8', margin: '0px' }}>
                        Penerimaan Sample Darah
                    </Divider>

                    <Spin spinning={spValid}>
                        <Row style={{ marginBottom: '1px' }}>
                            <Col span={12}>
                                <span style={{ marginLeft: '10px' }}>Kesesuaian pemeriksaan identitas sample :</span>
                            </Col>
                            <Col span={12}>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="..."
                                    value={kesesuaianIdentitas}
                                    onChange={(e) => setkesesuaianIdentitas(e)}
                                >
                                    <Option key='1' value='Sesuai'>Sesuai</Option>
                                    <Option key='2' value='Tidak Sesuai'>Tidak Sesuai</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '5px' }}>
                            <Col span={24}>
                                <TextArea
                                    value={ketkesesuaianIdentitas}
                                    onChange={(e) => setketkesesuaianIdentitas(e.target.value)}
                                    rows={2}
                                    placeholder="Keterangan Pemeriksaan Identitas Sample"
                                    maxLength={255}
                                    style={{ float: 'right', width: '98%' }}
                                />
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '1px' }}>
                            <Col span={12}>
                                <span style={{ marginLeft: '10px' }}>Volume Sampel :</span>
                            </Col>
                            <Col span={12}>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="..."
                                    value={volSampel}
                                    onChange={(e) => setvolSampel(e)}
                                >
                                    <Option key='1' value='Sesuai'>Sesuai</Option>
                                    <Option key='2' value='Tidak Sesuai'>Tidak Sesuai</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '5px' }}>
                            <Col span={24}>
                                <TextArea
                                    value={ketVolSampel}
                                    onChange={(e) => setketVolSampel(e.target.value)}
                                    rows={2}
                                    placeholder="Keterangan Volume Sampel"
                                    maxLength={255}
                                    style={{ float: 'right', width: '98%' }}
                                />
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '1px' }}>
                            <Col span={12}>
                                <span style={{ marginLeft: '10px' }}>Kondisi Sampel :</span>
                            </Col>
                            <Col span={12}>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="..."
                                    value={kondSampel}
                                    onChange={(e) => setkondSampel(e)}
                                >
                                    <Option key='1' value='Sesuai'>Sesuai</Option>
                                    <Option key='2' value='Tidak Sesuai'>Tidak Sesuai</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '5px' }}>
                            <Col span={24}>
                                <TextArea
                                    value={ketKondSampel}
                                    onChange={(e) => setketKondSampel(e.target.value)}
                                    rows={2}
                                    placeholder="Keterangan Kondisi Sampel"
                                    maxLength={255}
                                    style={{ float: 'right', width: '98%' }}
                                />
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '1px' }}>
                            <Col span={12}>
                                <span style={{ marginLeft: '10px' }}>Jenis Darah dan Jumlah :</span>
                            </Col>
                            <Col span={12}>
                                <Select
                                    style={{ width: '100%' }}
                                    placeholder="..."
                                    value={jnsDarahJml}
                                    onChange={(e) => setjnsDarahJml(e)}
                                >
                                    <Option key='1' value='Sesuai'>Sesuai</Option>
                                    <Option key='2' value='Tidak Sesuai'>Tidak Sesuai</Option>
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '5px' }}>
                            <Col span={24}>
                                <TextArea
                                    value={ketJnsDarahJml}
                                    onChange={(e) => setketJnsDarahJml(e.target.value)}
                                    rows={2}
                                    placeholder="Keterangan Jenis Darah dan Jumlah"
                                    maxLength={255}
                                    style={{ float: 'right', width: '98%' }}
                                />
                            </Col>
                        </Row>

                        <Row style={{ marginBottom: '5px' }}>
                            <Col span={12}>
                                <span style={{ marginLeft: '10px' }}>Tanggal Penerimaan :</span>
                            </Col>
                            <Col span={12}>
                                <DatePicker
                                    disabled
                                    value={tglPenerimaan}
                                    format={"DD-MM-YYYY HH:mm"}
                                    showTime
                                    allowClear={false}
                                    style={{ width: '100%' }}
                                // onChange={props.changeDatePendHd}
                                />
                            </Col>
                        </Row>
                        <Row style={{ marginBottom: '10px' }}>
                            <Col span={12}>
                                <span style={{ marginLeft: '10px' }}>Petugas Penerima :</span>
                            </Col>
                            <Col span={12}>
                                <Input placeholder="..."
                                    value={ptgPenerima}
                                    readOnly
                                    // onChange={(e) => setdxOrder(e.target.value)}
                                    maxLength={100}
                                    style={{ width: '100%' }} />
                            </Col>
                        </Row>

                        <Row style={{ marginLeft: '10px' }}>
                            <Col span={24} style={{ float: 'right' }}>
                                {Object.keys(dtOrder).length !== 0 && dtOrder.StatusValid.trim() === "1" ?
                                    <Button
                                        type='primary'
                                        onClick={() => klikSimpan()}
                                        // disabled={Object.keys(dtOrder).length !== 0 ? false : true}
                                        style={{ width: '100%' }}
                                    >
                                        Simpan
                                    </Button> :
                                    Object.keys(dtOrder).length !== 0 && dtOrder.StatusValid.trim() === "2" ? null :
                                        <Button
                                            onClick={() => klikValidasi()}
                                            // disabled={Object.keys(dtOrder).length !== 0 ? false : true}
                                            type='primary'
                                            icon={<CheckSquareOutlined />}
                                            style={{ width: '100%', backgroundColor: '#b7eb8f', color: 'black' }}
                                        >
                                            Validasi
                                        </Button>
                                }
                            </Col>
                        </Row>
                    </Spin>

                </Col>


            </Row>

        </div>
    )
}

export default PenerimaanSampleDarah