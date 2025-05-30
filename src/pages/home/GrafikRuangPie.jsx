import React, { useContext } from "react";
import { ChatContext } from "../chat/Chatcontext";
import { PieChart } from "bizcharts";
const GrafikRuangPie = () => {
  const { grafikruang } = useContext(ChatContext);
  const data = grafikruang;
  return (
    <PieChart
      data={data}
      radius={0.8}
      angleField="QTY"
      colorField="Deskripsi"
      label={{
        visible: true,
        type: "outer",
        offset: 20,
      }}
    />
  );
};

export default GrafikRuangPie;
