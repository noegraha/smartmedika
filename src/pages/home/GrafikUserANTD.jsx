import React, { useContext } from "react";
import { ChatContext } from "../chat/Chatcontext";
import { StackedColumnChart } from "bizcharts";

const GrafikUserANTD = () => {
  const { grafik } = useContext(ChatContext);
  const data = grafik;
  const opt = {
    autoFit: true,
    // title: {
    //   visible: true,
    //   text: "堆叠柱状图：label自动隐藏",
    // },
    // description: {
    //   visible: true,
    //   text:
    //     "在堆叠柱状图中，如果label的位置被设定为middle，即显示在柱形中间。在对应柱形大小不够摆放label的情况下，label会被自动隐藏。",
    // },
    data,
    xField: "UserId",
    yField: "QTY",
    yAxis: {
      min: 0,
    },
    xAxis: {
      formatter: (item, index, record) => {
        console.log("item", item, index, record);
        return item !== "1993" ? item : "特殊";
      },
    },
    stackField: "Jenis",
    // color: ['#ae331b', '#dadada', '#609db7', '#1a6179'],
    label: {
      visible: true,
      position: "middle",
    },
  };
  return <StackedColumnChart data={data} {...opt}></StackedColumnChart>;
};

export default GrafikUserANTD;
