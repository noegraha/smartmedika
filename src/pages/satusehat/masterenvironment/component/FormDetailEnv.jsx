import { Card, Col, Row } from 'antd'
import React from 'react'
import { useContext } from 'react'
import { SatuSehatEnvironmentContext } from '../context/SatuSehatEnvironmentContext'

const FormDetailEnv = () => {
    const {
        detailEnv,
    } = useContext(SatuSehatEnvironmentContext)

    return (
        <div>
            <Card
                title='Detail Environment'
                size='small'
                headStyle={{ backgroundColor: '#87e8de' }}>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Environment :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.Environment}</b>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Auth Url :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.Auth_url}</b>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Base Url :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.Base_url}</b>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Consent Url :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.Consent_url}</b>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Client Id :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.Client_id}</b>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Client Secret :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.Client_secret}</b>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Org Id :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.Org_id}</b>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Token :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.Token}</b>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Expired Token :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.Expired}</b>
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        DateEntry :
                    </Col>
                    <Col span={20}>
                        <b>{detailEnv.DateEntry}</b>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default FormDetailEnv