import { Col, Row } from 'antd';
import React, { useContext } from 'react';
import HdContext from '../../HdContext';
import dayjs from 'dayjs';

const {
    PasiensContext,
} = HdContext;

const FinishHD = () => {
    const props = useContext(PasiensContext);

    return (
        <div>
            <Row>
                <Col span={3}>
                    <span>Waktu Selesai HD</span>
                </Col>
                <Col span={21}>
                    <span>{dayjs(props.tanggala).format()}</span>
                </Col>
            </Row>
        </div>
    )
}

export default FinishHD