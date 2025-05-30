import { Button, Card, Col, DatePicker, Divider, Input, Modal, Row, Select } from 'antd'
import React, { useContext } from 'react'
import { SearchOutlined, CheckOutlined } from "@ant-design/icons";
import { PenunjangLabPaContext } from '../context/PenunjangLabPa';

const { Option } = Select;

const DetailPmrLabPa = () => {
    const {
        regId, setregId,
        headerPasien, setheaderPasien,
        // sp
        spHeaderPasien,
        // func
        getHeader,
    } = useContext(PenunjangLabPaContext)

    // func
    const klikNoreg = (noreg) => {
        setheaderPasien({})
        if (noreg.length !== 10) {
            Modal.warning({
                title: 'Peringatan!',
                content: 'No Registrasi masih belum sesuai!',
            });
        }
        else {
            getHeader(noreg)
        }
    }

    return (
        <div>
            <Card
                loading={spHeaderPasien}
                bodyStyle={{ padding: '5px' }}>
                <Divider
                    orientation="left"
                    plain
                    style={{ backgroundColor: '#bae0ff', margin: '0px' }}>
                    Detail Pemeriksaan
                </Divider>

                <hr />

                <Row
                    style={{ marginBottom: '2px' }}>
                    <Col span={2}>
                        <span>No.Registrasi :</span>
                    </Col>
                    <Col span={5}>
                        <Input.Group compact>
                            <Input
                                value={regId}
                                onChange={(e) => setregId(e.target.value)}
                                placeholder='...'
                                maxLength={10}
                                size='small'
                                style={{ width: '55%' }}
                            />
                            <Button
                                onClick={() => klikNoreg(regId)}
                                type="primary"
                                size="small"
                                style={{ width: '20%' }}>
                                <CheckOutlined />
                            </Button>
                            <Button
                                // onClick={() => lookUpPerawat()}
                                // type="primary"
                                size="small"
                                style={{ width: '20%' }}>
                                <SearchOutlined />
                            </Button>
                        </Input.Group>
                    </Col>
                </Row>

                <Row
                    style={{ marginBottom: '2px' }}>
                    <Col span={2}>
                        <span>Jenis Tindakan :</span>
                    </Col>
                    <Col span={2}>
                        <Input.Group compact>
                            <Input
                                // value={weekly}
                                // onChange={(e) => setweekly(e.target.value)}
                                placeholder='...'
                                maxLength={10}
                                size='small'
                                style={{ width: '70%' }}
                            />
                            <Button
                                // onClick={() => lookUpPerawat()}
                                type="primary"
                                size="small"
                                style={{ width: '30%' }}>
                                ...
                            </Button>
                        </Input.Group>
                    </Col>
                    <Col span={4} style={{ paddingLeft: '3px' }}>
                        <Input
                            // value={weekly}
                            // onChange={(e) => setweekly(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            size='small'
                        // style={{ width: '70%' }}
                        />
                    </Col>
                    <Col span={3} style={{ paddingLeft: '3px' }}>
                        <Input
                            // value={weekly}
                            // onChange={(e) => setweekly(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            size='small'
                        // style={{ width: '70%' }}
                        />
                    </Col>
                    <Col span={2} style={{ paddingLeft: '3px' }}>
                        <Input
                            // value={weekly}
                            // onChange={(e) => setweekly(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            size='small'
                        // style={{ width: '70%' }}
                        />
                    </Col>
                    <Col span={2} style={{ paddingLeft: '10px' }}>
                        <span>Diagnosis PA :</span>
                    </Col>
                    <Col span={9}>
                        <Input
                            // value={weekly}
                            // onChange={(e) => setweekly(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            size='small'
                        // style={{ width: '70%' }}
                        />
                    </Col>
                </Row>

                <Row
                    style={{ marginBottom: '2px' }}>
                    <Col span={2}>
                        <span>Nomor PA :</span>
                    </Col>
                    <Col span={3}>
                        <Input
                            // value={weekly}
                            // onChange={(e) => setweekly(e.target.value)}
                            placeholder='...'
                            // maxLength={10}
                            size='small'
                        // style={{ width: '70%' }}
                        />
                    </Col>
                    <Col span={2}>
                        <span style={{ paddingLeft: '3px' }}>Tgl. Diterima :</span>
                    </Col>
                    <Col span={2}>
                        <DatePicker
                            // value={dayjs(tglPmr)}
                            // onChange={(e) => settglPmr(e)}
                            // disabledDate={(current) => {
                            //     let customDate = dayjs().format("YYYY-MM-DD");
                            //     return current && current < dayjs(customDate, "YYYY-MM-DD");
                            // }}
                            size='small'
                            format='DD-MM-YYYY'
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '100%' }} />
                    </Col>
                    <Col span={2}>
                        <span style={{ paddingLeft: '3px' }}>Tgl. Hasil :</span>
                    </Col>
                    <Col span={2}>
                        <DatePicker
                            // value={dayjs(tglPmr)}
                            // onChange={(e) => settglPmr(e)}
                            // disabledDate={(current) => {
                            //     let customDate = dayjs().format("YYYY-MM-DD");
                            //     return current && current < dayjs(customDate, "YYYY-MM-DD");
                            // }}
                            size='small'
                            format='DD-MM-YYYY'
                            allowClear={false}
                            inputReadOnly={true}
                            style={{ width: '100%' }} />
                    </Col>

                    <Col span={2} style={{ paddingLeft: '10px' }}>
                        <span>Pengirim :</span>
                    </Col>
                    <Col span={9}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            // value={perawat}
                            // onChange={(e) => setperawat(e)}
                            size='small'
                            showSearch={true}
                        // filterOption={(input, option) =>
                        //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                        >
                            {/* {optPerawat.map((opt, index) => (
                                <Option key={index} value={opt.dokterId}>{opt.namaDokter}</Option>
                            ))} */}
                            <Option key={1} value='pengirim01'>Pengirim 01</Option>
                            <Option key={1} value='pengirim02'>Pengirim 02</Option>
                            <Option key={1} value='pengirim03'>Pengirim 03</Option>
                        </Select>
                    </Col>
                </Row>

                <Row>
                    <Col span={2}>
                        <span>Pelaksana :</span>
                    </Col>
                    <Col span={11}>
                        <Select
                            // mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="..."
                            // value={perawat}
                            // onChange={(e) => setperawat(e)}
                            size='small'
                            showSearch={true}
                        // filterOption={(input, option) =>
                        //     option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        // }
                        >
                            {/* {optPerawat.map((opt, index) => (
                                <Option key={index} value={opt.dokterId}>{opt.namaDokter}</Option>
                            ))} */}
                            <Option key={1} value='pelaksana01'>Pelaksana 01</Option>
                            <Option key={1} value='pelaksana02'>Pelaksana 02</Option>
                            <Option key={1} value='pelaksana03'>Pelaksana 03</Option>
                        </Select>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default DetailPmrLabPa