import React, { useContext } from "react";
import { Chart, Line, Point, Tooltip, Slider, Legend } from "bizcharts";
import { PasienContext } from "../rawatjalan/context/PasienContext";

const Demo = () => {
  const { line3 } = useContext(PasienContext);
  const scale = {
    QTY: { min: 0 },
    JENIS: {
      formatter: (v) => {
        return {
          SMART: "SMART",
          TOTAL: "TOTAL",
        }[v];
      },
    },
  };
  return (
    <div>
      <Chart
        scale={scale}
        padding={[30, 20, 50, 40]}
        autoFit
        height={320}
        data={line3}
        interactions={["element-active"]}
      >
        <Point position="TglRegistrasi*QTY" color="JENIS" shape="circle" />
        <Line
          shape="smooth"
          position="TglRegistrasi*QTY"
          color="JENIS"
          label="QTY"
        />
        <Tooltip shared showCrosshairs />
        <Slider start={0.7} />
        <Legend position="top" />
      </Chart>
    </div>
  );
};

export default Demo;
