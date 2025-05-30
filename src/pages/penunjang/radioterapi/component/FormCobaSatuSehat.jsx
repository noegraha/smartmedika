import { Button, Card, Col, Collapse, DatePicker, Input, message, Modal, Row, Select, Tabs } from 'antd'
import React, { useState } from 'react'
import { useContext } from 'react'
import { RadioterapiContext } from '../context/RadioterapiContext'
import moment from 'moment';

const { TextArea } = Input;
const { TabPane } = Tabs;
const { Panel } = Collapse;
const { Option } = Select;

const FormCobaSatuSehat = () => {
    const {
        // state
        satuSehatToken,
        setsatuSehatToken,
        satuSehatNik, setsatuSehatNik,
        IHSPAtient, setIHSPAtient,
        resGetPasien, setresGetPasien,
        satuSehatNikPraktisi, setsatuSehatNikPraktisi,
        IHSPraktisi, setIHSPraktisi,
        resGetPraktisi, setresGetPraktisi,
        IhsRs,
        regPas, setregPas,
        satuSehatStatus, setsatuSehatStatus,
        satuSehatNmPas,
        satuSehatNmPrak,
        satuSehatLokasi,
        satuSehatNmLokasi,
        periodStart, setperiodStart,
        periodEnd, setperiodEnd,
        resPostEncounter,
        idEncounter,
        // func
        SatuSehatGetToken,
        getPasinbyNIK,
        getPraktisibyNIK,
        postEncounter,
    } = useContext(RadioterapiContext)

    const [mdSatuSehat, setmdSatuSehat] = useState(false)

    const klikSatuSehat = () => {
        setmdSatuSehat(true)
        console.log('klik : ', mdSatuSehat);
    }

    const klikGetPasien = (data) => {
        if (!satuSehatToken) {
            message.warn('Token belum ada!')
        }
        else if (data.length < 16) {
            message.warn('NIK Pasien masih belum sesuai!')
        }
        else {
            getPasinbyNIK(data)
        }
    }

    const klikGetPraktisi = (data) => {
        if (!satuSehatToken) {
            message.warn('Token belum ada!')
        }
        else if (data.length < 16) {
            message.warn('NIK Praktisi masih belum sesuai!')
        }
        else {
            getPraktisibyNIK(data)
        }
    }

    const klikPostEncounter = () => {
        let identifier = [
            {
                system: `http://sys-ids.kemkes.go.id/encounter/${IhsRs}`,
                value: regPas
            }
        ]

        let class1 = {
            system: "http://terminology.hl7.org/CodeSystem/v3-ActCode",
            code: "AMB",
            display: "ambulatory"
        }

        let subject = {
            reference: `Patient/${IHSPAtient}`,
            display: satuSehatNmPas
        }

        let participant = [
            {
                type: [
                    {
                        coding: [
                            {
                                system: "http://terminology.hl7.org/CodeSystem/v3-ParticipationType",
                                code: "ATND",
                                display: "attender"
                            }
                        ]
                    }
                ],
                individual: {
                    reference: `Practitioner/${IHSPraktisi}`,
                    display: satuSehatNmPrak
                }
            }
        ]

        let period = {
            start: moment(periodStart).format()
        }

        let location = [
            {
                location: {
                    reference: satuSehatLokasi,
                    display: satuSehatNmLokasi
                }
            }
        ]

        let statusHistory = [
            {
                status: satuSehatStatus,
                period: {
                    start: moment(periodStart).format(),
                    end: moment(periodEnd).format()
                }
            }
        ]

        let serviceProvider = {
            reference: `Organization/${IhsRs}`
        }

        let data = {}
        data.resourceType = "Encounter";
        data.identifier = identifier;
        data.status = satuSehatStatus;
        data.class = class1;
        data.subject = subject;
        data.participant = participant;
        data.period = period;
        data.location = location;
        data.statusHistory = statusHistory;
        data.serviceProvider = serviceProvider;

        console.log('send : ', data);
        postEncounter(data);

    }

    return (
        <>
            <Card>
                <Row>
                    <Button
                        onClick={() => klikSatuSehat()}
                        // size='small'
                        type='primary' >
                        Simulasi SATUSEHAT
                    </Button>
                </Row>
            </Card>

            <Modal
                title="Simulasi SATUSEHAT"
                visible={mdSatuSehat}
                onOk={() => setmdSatuSehat(false)}
                onCancel={() => setmdSatuSehat(false)}
                width={1000}
                style={{ top: 20 }}
                bodyStyle={{ padding: '5px' }}
            >
                <Tabs
                    defaultActiveKey="2"
                    size='small'
                    type='card' >
                    <TabPane tab="SIMULASI GET" key="1">
                        <Card
                            title='GET TOKEN'
                            headStyle={{ backgroundColor: "#ffa39e" }}
                            style={{ marginBottom: '5px' }} >
                            <Row>
                                <Col span={4}>
                                    <Button
                                        onClick={() => SatuSehatGetToken()}
                                        type='primary'
                                        style={{ width: '150px' }} >
                                        GET TOKEN
                                    </Button>
                                </Col>
                                <Col span={20}>
                                    <Input
                                        value={satuSehatToken}
                                        placeholder='Token...' />
                                </Col>
                            </Row>
                        </Card>

                        <Card
                            title='GET PASIEN BY NIK'
                            headStyle={{ backgroundColor: "#ffa39e" }}
                            style={{ marginBottom: '5px' }} >
                            <Row>
                                <Col span={4}>
                                    <Button
                                        onClick={() => klikGetPasien(satuSehatNik)}
                                        type='primary'
                                        style={{ width: '150px' }} >
                                        GET PASIEN BY NIK
                                    </Button>
                                </Col>
                                <Col span={10}>
                                    <Input
                                        addonBefore='NIK :'
                                        value={satuSehatNik}
                                        onChange={(e) => setsatuSehatNik(e.target.value)}
                                        placeholder='NIK : '
                                        style={{ width: '97%' }} />
                                </Col>
                                <Col span={10}>
                                    <Input
                                        addonBefore='IHS Number'
                                        value={IHSPAtient}
                                        placeholder='IHS Number' />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Response :
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <TextArea
                                        value={JSON.stringify(resGetPasien, undefined, 2)}
                                        rows={11}
                                        placeholder="Response..." />
                                </Col>
                            </Row>
                        </Card>

                        <Card
                            title='GET PRACTITIONER BY NIK'
                            headStyle={{ backgroundColor: "#ffa39e" }}
                            style={{ marginBottom: '5px' }} >
                            <Row>
                                <Col span={5}>
                                    <Button
                                        onClick={() => klikGetPraktisi(satuSehatNikPraktisi)}
                                        type='primary'
                                        style={{ width: '97%' }} >
                                        GET PRACTITIONER BY NIK
                                    </Button>
                                </Col>
                                <Col span={9}>
                                    <Input
                                        addonBefore='NIK :'
                                        value={satuSehatNikPraktisi}
                                        onChange={(e) => setsatuSehatNikPraktisi(e.target.value)}
                                        placeholder='NIK : '
                                        style={{ width: '97%' }} />
                                </Col>
                                <Col span={10}>
                                    <Input
                                        value={IHSPraktisi}
                                        addonBefore='IHS Number'
                                        placeholder='IHS Number' />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    Response :
                                </Col>
                            </Row>
                            <Row>
                                <Col span={24}>
                                    <TextArea
                                        value={JSON.stringify(resGetPraktisi, undefined, 2)}
                                        rows={11}
                                        placeholder="Response..." />
                                </Col>
                            </Row>
                        </Card>
                    </TabPane>

                    <TabPane tab="SIMULASI POST" key="2">
                        <Collapse defaultActiveKey={1}>
                            <Panel header="POST ENCOUNTER" key="1">
                                <Row
                                    style={{ marginBottom: '2px' }} >
                                    <Col span={4}>
                                        IHS Rumah Sakit :
                                    </Col>
                                    <Col span={4}>
                                        <Input
                                            value={IhsRs}
                                            size='small' />
                                    </Col>
                                    <Col span={4}>
                                        <span style={{ marginLeft: '5px' }} >No. Registrasi :</span>
                                    </Col>
                                    <Col span={4}>
                                        <Input
                                            value={regPas}
                                            size='small' />
                                    </Col>
                                    <Col span={4}>
                                        <span style={{ marginLeft: '5px' }} >Status :</span>
                                    </Col>
                                    <Col span={4}>
                                        <Select
                                            size='small'
                                            value={satuSehatStatus}
                                            defaultValue="arrived"
                                            style={{ width: '100%' }} >
                                            <Option value="arrived">Sudah datang</Option>
                                            <Option value="triaged">Triase</Option>
                                            <Option value="in-progress">Sedang berlangsung</Option>
                                            <Option value="onleave">Sedang pergi</Option>
                                            <Option value="finished">Sudah selesai</Option>
                                            <Option value="cancelled">Dibatalkan</Option>
                                        </Select>
                                    </Col>
                                </Row>
                                <Row
                                    style={{ marginBottom: '2px' }} >
                                    <Col span={4}>
                                        IHS Pasien :
                                    </Col>
                                    <Col span={4}>
                                        <Input
                                            value={IHSPAtient}
                                            size='small' />
                                    </Col>
                                    <Col span={4}>
                                        <span style={{ marginLeft: '5px' }} >Nama Pasien :</span>
                                    </Col>
                                    <Col span={12}>
                                        <Input
                                            value={satuSehatNmPas}
                                            size='small' />
                                    </Col>
                                </Row>
                                <Row
                                    style={{ marginBottom: '2px' }} >
                                    <Col span={4}>
                                        IHS Praktisi :
                                    </Col>
                                    <Col span={4}>
                                        <Input
                                            value={IHSPraktisi}
                                            size='small' />
                                    </Col>
                                    <Col span={4}>
                                        <span style={{ marginLeft: '5px' }} >Nama Praktisi :</span>
                                    </Col>
                                    <Col span={12}>
                                        <Input
                                            value={satuSehatNmPrak}
                                            size='small' />
                                    </Col>
                                </Row>
                                <Row
                                    style={{ marginBottom: '2px' }} >
                                    <Col span={4}>
                                        Period Start :
                                    </Col>
                                    <Col span={8}>
                                        <DatePicker
                                            size="small"
                                            value={moment(periodStart)}
                                            format={"DD-MM-YYYY HH:mm"}
                                            showTime
                                            onChange={(e) => setperiodStart(moment(e))}
                                            style={{ width: '100%' }}
                                        />
                                    </Col>
                                    <Col span={4}>
                                        <span style={{ marginLeft: '5px' }} >Period End :</span>
                                    </Col>
                                    <Col span={8}>
                                        <DatePicker
                                            size="small"
                                            value={moment(periodEnd)}
                                            format={"DD-MM-YYYY HH:mm"}
                                            showTime
                                            onChange={(e) => setperiodEnd(moment(e))}
                                            style={{ width: '100%' }}
                                        />
                                    </Col>
                                </Row>
                                <Row
                                    style={{ marginBottom: '2px' }} >
                                    <Col span={4}>
                                        Lokasi :
                                    </Col>
                                    <Col span={8}>
                                        <Input
                                            value={satuSehatLokasi}
                                            size='small' />
                                    </Col>
                                    <Col span={4}>
                                        <span style={{ marginLeft: '5px' }} >Nama Lokasi :</span>
                                    </Col>
                                    <Col span={8}>
                                        <Input
                                            value={satuSehatNmLokasi}
                                            size='small' />
                                    </Col>
                                </Row>
                                <Row
                                    style={{ marginBottom: '2px' }} >
                                    <Col span={24}>
                                        <Button
                                            onClick={() => klikPostEncounter()}
                                            type='primary'
                                            size='small'
                                            style={{ width: '100%' }} >
                                            POST
                                        </Button>
                                    </Col>
                                </Row>
                                <Row
                                    style={{ marginBottom: '2px' }} >
                                    <Col span={4}>
                                        ID Encounter :
                                    </Col>
                                    <Col span={20}>
                                        <Input
                                            value={idEncounter}
                                            size='small' />
                                    </Col>
                                </Row>
                                <Row>
                                    <Col>
                                        Response :
                                    </Col>
                                </Row>
                                <Row>
                                    <Col span={24}>
                                        <TextArea
                                            value={JSON.stringify(resPostEncounter, undefined, 2)}
                                            rows={11}
                                            placeholder="Response..." />
                                    </Col>
                                </Row>
                            </Panel>



                            <Panel header="POST DIAGNOSTIC" key="2">
                                <p>POST DIAGNOSTIC</p>
                            </Panel>
                        </Collapse>
                    </TabPane>
                </Tabs>


            </Modal>
        </>
    )
}

export default FormCobaSatuSehat