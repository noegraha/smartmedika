import React, { useContext } from 'react';
import { Row, Col, Button, Space, message } from 'antd';
// import ReactDOM from 'react-dom';
import { Chart, Line, Point, Tooltip, Legend, Slider } from 'bizcharts';
import { AskepContext } from '../../../../../rawatinap/context/AskepContext';
import HdContext from '../../../HdContext';

const {
    PasiensContext,
} = HdContext;

const scale = {
    QTY: { min: 0 },
    Jenis: {
        formatter: v => {
            return {
                TDAtas: 'TD Atas',
                TDBawah: 'TD Bawah',
                Nadi: 'Nadi',
                Suhu: 'Suhu',
                Respirasi: 'Respirasi',
                GCS: 'GCS',
                Nyeri: 'Nyeri'
            }[v];
        },
    },
};

const FormGrafikTTV = () => {
    const { grabikTTV, getGravikTTV, } = useContext(AskepContext);
    const props = useContext(PasiensContext)
    return (
        <div>
            <Row>
                <Col span={24}>
                    <Chart
                        scale={scale}
                        padding={[30, 20, 50, 40]}
                        autoFit
                        height={320}
                        data={grabikTTV}
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

export default FormGrafikTTV
