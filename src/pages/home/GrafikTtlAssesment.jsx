import React, { useContext } from "react";
import { Axis, Chart, Coordinate, Interval, Legend } from "bizcharts";
import { LaporanAskepContext } from "../laporan/Context/LaporanAskepContext";
const GrafiTtlAssesment = () => {
  const { totalAssesment } = useContext(LaporanAskepContext);
  const data = totalAssesment;
  data.sort((a, b) => a.Jumlah - b.Jumlah);
  return (
    <Chart height={700} data={data} autoFit padding={[5, 40, 50, 275]}>
      <Coordinate transpose />
      <Axis position="top" />
      <Legend
        itemName={{
          style: {
            fill: "#333",
          },
        }}
      />
      <Interval position="Ruang*Jumlah" label="Jumlah" color="Ruang" />
    </Chart>
  );
};

export default GrafiTtlAssesment;
