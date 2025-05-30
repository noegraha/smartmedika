import { Button, Card, Col, Input, message, Row, Select, Space } from 'antd'
import React from 'react'
import { SatuSehatOrganizationContext } from '../context/SatuSehatOrganizationContext'
import { useContext } from 'react';

const { TextArea } = Input;

const SSIhsNumPatient = () => {
    const {
        SSToken,
        satuSehatNik, setsatuSehatNik,
        satuSehatNikPraktisi, setsatuSehatNikPraktisi,
        IHSPAtient, setIHSPAtient,
        IHSPraktisi, setIHSPraktisi,
        resGetPasien, setresGetPasien,
        resGetPraktisi, setresGetPraktisi,
        // func
        getPasinbyNIK,
        getPraktisibyNIK,
        // spin
        spGetIhsPatient,
        spGetIhsPraktisi,
    } = useContext(SatuSehatOrganizationContext)

    const optNikPasien = [
        {
            value: '9271060312000001',
            label: '9271060312000001',
        },
        {
            value: '9210060207000010',
            label: '9210060207000010',
        },
        {
            value: '9204014804000002',
            label: '9204014804000002',
        },
        {
            value: '9201076407000009',
            label: '9201076407000009',
        },
        {
            value: '9201076001000007',
            label: '9201076001000007',
        },
        {
            value: '9104224606000005',
            label: '9104224606000005',
        },
        {
            value: '9104224509000003',
            label: '9104224509000003',
        },
        {
            value: '9201394901000008',
            label: '9201394901000008',
        },
        {
            value: '9104223107000004',
            label: '9104223107000004',
        },
        {
            value: '9104025209000006',
            label: '9104025209000006',
        },
    ]

    const optNikPraktisi = [
        {
            value: '7209061211900001',
            label: '7209061211900001',
        },
        {
            value: '3322071302900002',
            label: '3322071302900002',
        },
        {
            value: '3171071609900003',
            label: '3171071609900003',
        },
        {
            value: '3207192310600004',
            label: '3207192310600004',
        },
        {
            value: '6408130207800000',
            label: '6408130207800000',
        },
        {
            value: '3217040109800006',
            label: '3217040109800006',
        },
        {
            value: '3519111703800007',
            label: '3519111703800007',
        },
        {
            value: '5271002009700008',
            label: '5271002009700008',
        },
        {
            value: '3313096403900009',
            label: '3313096403900009',
        },
        {
            value: '3578083008700010',
            label: '3578083008700010',
        },
    ]

    const klikGetPasien = (data) => {
        if (!SSToken) {
            message.warning('Token belum ada!')
        }
        else if (!satuSehatNik) {
            message.warning('NIK Pasien masih kosong!')
        }
        else {
            getPasinbyNIK(data)
        }
    }

    const changeNikPasien = (e) => {
        setsatuSehatNik(e)
        setIHSPAtient('')
        setresGetPasien('')
    }

    const changeNikPraktisi = (e) => {
        setsatuSehatNikPraktisi(e)
        setIHSPraktisi('')
        setresGetPraktisi('')
    }

    const klikGetPraktisi = (data) => {
        if (!SSToken) {
            message.warning('Token belum ada!')
        }
        else if (data.length < 16) {
            message.warning('NIK Praktisi masih belum sesuai!')
        }
        else {
            getPraktisibyNIK(data)
        }
    }

    return (
        <div>
            <Card
                title='GET PASIEN BY NIK'
                headStyle={{ backgroundColor: "#ffa39e" }}
                loading={spGetIhsPatient}
                style={{ marginBottom: '5px' }} >
                <Row>
                    <Col span={5}>
                        <Button
                            onClick={() => klikGetPasien(satuSehatNik)}
                            disabled={!SSToken}
                            type='primary'
                            style={{ width: '100%' }} >
                            GET PASIEN BY NIK
                        </Button>
                    </Col>
                    <Col span={9}>
                        <Space style={{ marginLeft: '5px' }}>
                            <span>NIK :</span>
                            <Select
                                value={satuSehatNik}
                                style={{ width: '200%' }}
                                onChange={(e) => changeNikPasien(e)}
                                options={optNikPasien}
                            />
                        </Space>
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
                loading={spGetIhsPraktisi}
                headStyle={{ backgroundColor: "#ffa39e" }}
                style={{ marginBottom: '5px' }} >
                <Row>
                    <Col span={5}>
                        <Button
                            onClick={() => klikGetPraktisi(satuSehatNikPraktisi)}
                            disabled={!SSToken}
                            type='primary'
                            style={{ width: '97%' }} >
                            GET PRACTITIONER BY NIK
                        </Button>
                    </Col>
                    <Col span={9}>
                        {/* <Input
                            addonBefore='NIK :'
                            value={satuSehatNikPraktisi}
                            onChange={(e) => setsatuSehatNikPraktisi(e.target.value)}
                            placeholder='NIK : '
                            style={{ width: '97%' }} /> */}
                        <Space style={{ marginLeft: '5px' }}>
                            <span>NIK :</span>
                            <Select
                                value={satuSehatNikPraktisi}
                                style={{ width: '200%' }}
                                onChange={(e) => changeNikPraktisi(e)}
                                options={optNikPraktisi}
                            />
                        </Space>
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
        </div>
    )
}

export default SSIhsNumPatient