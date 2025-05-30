import React, { useContext } from "react";
import { Chart, Tooltip, Interval, Legend } from "bizcharts";
import { ChatContext } from "../chat/Chatcontext";

const GrafikUser = () => {
  const { grafik, animasi } = useContext(ChatContext);

  return (
    <div>
      <Chart
        height={400}
        padding="auto"
        data={grafik}
        autoFit
        appendPadding={[20, 0]}
      // scale={{ QTY: { max: 150 } }}
      >
        <Interval
          animate={animasi}
          adjust={[
            {
              type: "dodge",
              marginRatio: 0,
            },
          ]}
          label={[
            "QTY",
            (val) => {
              return {
                content: val,
                style: {
                  fill: "black",
                  fontSize: 12,
                  //   fontWeight: "bold",
                },
              };
            },
          ]}
          color="Jenis"
          position="UserId*QTY"
        />
        <Tooltip shared />
        <Legend position="top" />
      </Chart>
    </div>
  );
};

export default GrafikUser;
