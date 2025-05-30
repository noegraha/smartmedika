import React, { useContext } from 'react';
import HdContext from '../../../HdContext';
import {
    Form,
    Row,
    Col,
    Input,
} from 'antd';

const {
    PasiensContext,
} = HdContext;

const { TextArea } = Input;

function HeparinasiFalse() {
    const props = useContext(PasiensContext)
    return (
        <div>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Penyebab"
                        style={{ marginBottom: "0px" }}>
                        <TextArea
                            value={props.penyebabNonHeparinasi ? props.penyebabNonHeparinasi : ""}
                            onChange={(e) => props.setPenyebabNonHeparinasi(e.target.value)}
                            rows={4}
                            style={{ width: "100%" }} />
                    </Form.Item>
                </Col>
            </Row>
        </div>
    )
}

export default HeparinasiFalse
