import React, { useContext } from 'react';
import { Row, Col } from 'antd';
// import ReactDOM from 'react-dom';
import { Chart, Line, Point, Tooltip, Legend, Slider } from 'bizcharts';
import { EwsRIContext } from '../../../../../rawatinap/context/EwsContext';
import HdContext from '../../../HdContext';

const {
    PasiensContext,
} = HdContext;

const scale = {
    QTY: { min: 0 },
    Jenis: {
        formatter: v => {
            return {
                EWS: 'EWS'
            }[v];
        },
    },
};

const FormEwsGrafik = () => {
    const props = useContext(PasiensContext)
    const { grafikEWS } = useContext(EwsRIContext);
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Chart
                        scale={scale}
                        padding={[30, 20, 50, 40]}
                        autoFit
                        height={320}
                        data={grafikEWS}
                        interactions={["element-active"]}
                    >
                        <Point position="Jam*QTY" color="Jenis" shape="circle" />
                        <Line
                            shape="smooth"
                            position="Jam*QTY"
                            color="Jenis"
                            label="QTY"
                        />
                        <Tooltip shared showCrosshairs />
                        <Slider start={0.4} />
                        <Legend position="top" />
                    </Chart>
                </Col>
            </Row>
        </div>
    )
}

export default FormEwsGrafik
