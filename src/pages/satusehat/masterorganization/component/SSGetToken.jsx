import { Button, Card, Col, Input, Row } from 'antd'
import React, { useContext } from 'react'
import { SatuSehatOrganizationContext } from '../context/SatuSehatOrganizationContext'

const SSGetToken = () => {
    const {
        SSToken,
        // spin
        spGetToken,
        // func
        SatuSehatGetToken,
    } = useContext(SatuSehatOrganizationContext)

    return (
        <div>
            <Card
                loading={spGetToken}>
                <Row>
                    <Col span={12}>
                        <Button
                            onClick={() => SatuSehatGetToken()}
                            type='primary'
                            style={{ marginRight: '5px', width: '150px' }}>
                            GET TOKEN
                        </Button>
                        <Input
                            value={SSToken}
                            readOnly
                            style={{ width: '70%' }}
                        />
                    </Col>
                </Row>
            </Card>
        </div>
    )
}

export default SSGetToken