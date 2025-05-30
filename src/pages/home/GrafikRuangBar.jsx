import React, { useContext } from "react";
import { ChatContext } from "../chat/Chatcontext";
import { Axis, Chart, Interval, Tooltip } from "bizcharts";
const GrafikRuangBar = () => {
  const { grafikruang } = useContext(ChatContext);
  const data = grafikruang;
  return (
    <Chart height={700} autoFit data={data} padding={[40, 5, 50, 30]}>
      <Interval position="Deskripsi*QTY" color="Deskripsi" label="QTY" />
      <Axis label={{ autoRotate: true }} />
      <Tooltip shared />
    </Chart>
  );
};
export default GrafikRuangBar;
