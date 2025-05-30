import { Button, Card, Col, Input, Row, Space } from 'antd'
import React from 'react'
import { useContext } from 'react'
import { SatuSehatEnvironmentContext } from '../context/SatuSehatEnvironmentContext'

const FormTambahEnv = () => {
    const {
        setmdTambah,
        idEnv,
        env, setenv,
        auth_url, setauth_url,
        base_url, setbase_url,
        cons_url, setcons_url,
        client_id, setclient_id,
        client_sc, setclient_sc,
        org_id, setorg_id,
        // sp
        spmdtambah,
        // func
        simpanEnv,
    } = useContext(SatuSehatEnvironmentContext)

    const klikSimpan = () => {
        let data = {}

        if (idEnv) {
            data.id = idEnv
            data.environment = env
            data.auth_url = auth_url
            data.base_url = base_url
            data.consent_url = cons_url
            data.client_id = client_id
            data.client_secret = client_sc
            data.org_id = org_id
        }
        else {
            data.environment = env
            data.auth_url = auth_url
            data.base_url = base_url
            data.consent_url = cons_url
            data.client_id = client_id
            data.client_secret = client_sc
            data.org_id = org_id
        }

        console.log('klikSimpan : ', data);
        simpanEnv(data);
    }

    return (
        <div>
            <Card
                title='Tambah Environment'
                size='small'
                loading={spmdtambah}
                headStyle={{ backgroundColor: '#36cfc9' }}>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Environment :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={env}
                            onChange={(e) => setenv(e.target.value)}
                            placeholder='...'
                            size='small'
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Auth Url :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={auth_url}
                            onChange={(e) => setauth_url(e.target.value)}
                            placeholder='...'
                            size='small'
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Base Url :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={base_url}
                            onChange={(e) => setbase_url(e.target.value)}
                            placeholder='...'
                            size='small'
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Consent Url :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={cons_url}
                            onChange={(e) => setcons_url(e.target.value)}
                            placeholder='...'
                            size='small'
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Client Id :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={client_id}
                            onChange={(e) => setclient_id(e.target.value)}
                            placeholder='...'
                            size='small'
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '2px' }}>
                    <Col span={4}>
                        Client Secret :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={client_sc}
                            onChange={(e) => setclient_sc(e.target.value)}
                            placeholder='...'
                            size='small'
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row style={{ marginBottom: '5px' }}>
                    <Col span={4}>
                        Organization Id :
                    </Col>
                    <Col span={20}>
                        <Input
                            value={org_id}
                            onChange={(e) => setorg_id(e.target.value)}
                            placeholder='...'
                            size='small'
                            style={{ width: '100%' }} />
                    </Col>
                </Row>
                <Row>
                    <Col span={24}>
                        <Space style={{ float: 'right' }}>
                            <Button
                                onClick={() => klikSimpan()}
                                type='primary'
                                style={{ width: '75px' }}>
                                Simpan
                            </Button>
                            <Button
                                onClick={() => setmdTambah(false)}
                                style={{ width: '75px' }}>
                                Batal
                            </Button>
                        </Space>
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default FormTambahEnv