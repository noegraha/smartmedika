import React, { useContext } from 'react';
import { Line } from '@ant-design/charts';
import { PasienContext } from '../rawatjalan/context/PasienContext';
const DemoLine = () => {
    const { line3 } = useContext(PasienContext);

    var config = {
        data: line3,
        xField: 'TglRegistrasi',
        yField: 'QTY',
        seriesField: 'JENIS',
        yAxis: {
            label: {
                formatter: function formatter(v) {
                    return (v);
                },
            },
        },
        legend: { position: 'top' },
        smooth: true,
        animation: {
            appear: {
                animation: 'path-in',
                duration: 5000,
            },
        },
        padding: 'auto',
        xAxis: { tickCount: 5 },
        slider: {
            start: 0.1,
            end: 0.5,
        },
        color: ['#1979C9', '#D62A0D', '#FAA219'],
    };
    return (
        <div>
            <Line {...config} />
        </div>
    );
};
export default DemoLine;