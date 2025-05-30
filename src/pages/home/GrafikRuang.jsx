import React, { useContext } from "react";
import { ChatContext } from "../chat/Chatcontext";
import { Axis, Chart, Coordinate, Interval, Legend } from "bizcharts";
const GrafikRuang = () => {
  const { grafikruang } = useContext(ChatContext);
  const data = grafikruang;
  data.sort((a, b) => a.QTY - b.QTY);
  return (
    <Chart height={950} data={data} autoFit padding={[5, 40, 50, 275]}>
      <Coordinate transpose />
      <Axis position="top" />
      <Legend
        itemName={{
          style: {
            fill: "#333",
          },
        }}
      />
      <Interval position="Deskripsi*QTY" label="QTY" color="Deskripsi" />
    </Chart>
  );
};

export default GrafikRuang;
