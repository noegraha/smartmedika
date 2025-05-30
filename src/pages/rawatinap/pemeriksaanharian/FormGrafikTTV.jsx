import React, { useContext } from "react";
import { Row, Col, Button, Space, message } from "antd";
// import ReactDOM from 'react-dom';
import { Chart, Line, Point, Tooltip, Legend, Slider } from "bizcharts";
import { AskepContext } from "../context/AskepContext";

const scale = {
  QTY: { min: 0 },
  Jenis: {
    formatter: (v) => {
      return {
        Nyeri: "Nyeri",
        TDAtas: "TD Atas",
        TDBawah: "TD Bawah",
        Nadi: "Nadi",
        Suhu: "Suhu",
        Respirasi: "Respirasi",
        GCS: "GCS",
        ResJatuh: "Resiko Jatuh",
      }[v];
    },
  },
};

const FormGrafikTTV = () => {
  const { grabikTTV } = useContext(AskepContext);
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
            <Point
              position="Jam*QTY"
              color={[
                "Jenis",
                (xVal) => {
                  if (xVal === "TDAtas") {
                    return "#000000";
                  }
                  if (xVal === "TDBawah") {
                    return "#000033";
                  }
                  if (xVal === "Nadi") {
                    return "#FF0000";
                  }
                  if (xVal === "Suhu") {
                    return "#0066FF";
                  }
                  if (xVal === "Respirasi") {
                    return "#009900";
                  }
                  if (xVal === "GCS") {
                    return "#9999FF";
                  }
                  if (xVal === "ResJatuh") {
                    return "#fc99ff";
                  }
                  return "#faad14";
                },
              ]}
              shape="circle"
            />
            <Line
              shape="smooth"
              position="Jam*QTY"
              color={[
                "Jenis",
                (xVal) => {
                  if (xVal === "TDAtas") {
                    return "#000000";
                  }
                  if (xVal === "TDBawah") {
                    return "#000033";
                  }
                  if (xVal === "Nadi") {
                    return "#FF0000";
                  }
                  if (xVal === "Suhu") {
                    return "#0066FF";
                  }
                  if (xVal === "Respirasi") {
                    return "#009900";
                  }
                  if (xVal === "GCS") {
                    return "#9999FF";
                  }
                  if (xVal === "ResJatuh") {
                    return "#fc99ff";
                  }
                  return "#faad14";
                },
              ]}
              label="QTY"
            />

            <Tooltip shared showCrosshairs />
            <Slider start={0.4} />
            <Legend position="top" />
          </Chart>
        </Col>
      </Row>
    </div>
  );
};

export default FormGrafikTTV;
