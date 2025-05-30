import React, { useContext } from 'react'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label,
} from 'recharts';
import { PasienContext } from '../rawatjalan/context/PasienContext';

const Grafik = () => {
    const { line } = useContext(PasienContext);
    const renderCustomizedLabel = ({
        x, y, name
    }) => {
        return (
            <text x={x} y={y} fill="black" textAnchor="end" dominantBaseline="central">
                {name}
            </text>
        );
    };
    return (
        <div>
            <LineChart
                width={1300}
                height={500}
                data={line}
                margin={{
                    top: 5, right: 30, left: 20, bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="TglRegistrasi" label={renderCustomizedLabel}>
                    <Label value="Tanggal" offset={0} position="insideBottom" />
                </XAxis>
                <YAxis label={{ value: 'Jumlah', angle: -90, position: 'insideLeft' }} />
                <Tooltip />
                <Legend />
                <Line type="linear" dataKey="SMART" stroke="lightskyblue" activeDot={{ r: 8 }} strokeWidth='3' />
                <Line type="linear" dataKey="KHS" stroke="lightcoral" strokeWidth='3' />
                <Line type="linear" dataKey="TOTAL" stroke="lightgrey" strokeWidth='3' strokeDasharray="6 6" />
            </LineChart>
        </div>
    )
}

export default Grafik
