import React, { useContext } from 'react';
import HdContext from '../../../HdContext';
import {
    Card,
    Form,
    InputNumber,
    Row,
    Col,
} from 'antd';

const {
    PasiensContext,
} = HdContext;

function HeparinasiTrue() {
    const props = useContext(PasiensContext)
    return (
        <div>
            <Row>
                <Col span={12}>
                    <Form.Item
                        label="Dosis Awal"
                        style={{ marginBottom: "0px" }}>
                        <InputNumber
                            value={props.dosisAwal ? props.dosisAwal : 0}
                            onChange={props.changeDosisAwal}
                            size="small"
                            min={0} />
                        <span>&ensp;iu</span>
                    </Form.Item>

                    <Form.Item
                        label="Dosis Sirkulasi"
                        style={{ marginBottom: "0px" }}>
                        <InputNumber
                            value={props.dosisSirkulasi ? props.dosisSirkulasi : 0}
                            onChange={props.changeDosisSirkulasi}
                            size="small"
                            min={0} />
                        <span>&ensp;iu</span>
                    </Form.Item>

                    <Form.Item
                        label="Program bilas"
                        style={{ marginBottom: "0px" }}>
                        <span>Na Cl 0,9% tiap jam / 1 jam</span>
                    </Form.Item>
                </Col>

                <Col span={12}>
                    <Card
                        title="Dosis Maintenance"
                        size="small"
                        headStyle={{ backgroundColor: "#40a9ff" }}
                    // style={{ width: "100%" }}
                    >
                        <Form.Item
                            label="Continue"
                            style={{ marginBottom: "0px" }}>
                            <InputNumber
                                value={props.dmContinue ? props.dmContinue : 0}
                                onChange={props.changeDmContinue}
                                size="small"
                                min={0} />
                            <span>&ensp;iu/jam</span>
                        </Form.Item>

                        <Form.Item
                            label="Intermiten"
                            style={{ marginBottom: "0px" }}>
                            <InputNumber
                                value={props.dmIntermiten ? props.dmIntermiten : 0}
                                onChange={props.changeDmIntermiten}
                                size="small"
                                min={0} />
                            <span>&ensp;iu/jam</span>
                        </Form.Item>
                    </Card>
                </Col>
            </Row>
        </div>
    )
}

export default HeparinasiTrue
