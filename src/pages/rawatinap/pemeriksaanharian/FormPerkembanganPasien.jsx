import React, { useContext } from "react";
import { Row, Col } from "antd";
import { Chart, Line, Point, Tooltip, Legend } from "bizcharts";
import { PasienRIContext } from "../context/PasienRIContext";

const scale = {
  temperature: { min: 0 },
  city: {
    formatter: (v) => {
      return {
        Ta: "Tensi Atas",
        Tb: "Tensi Bawah",
        Nadi: "Nadi",
        Suhu: "Suhu",
        Nafas: "Nafas",
      }[v];
    },
  },
};

const FormPerkembanganPasien = () => {
  const { datattv } = useContext(PasienRIContext);

  return (
    <div>
      <Row>
        <Col span={24}>
          <Chart
            scale={scale}
            padding={[30, 20, 60, 40]}
            autoFit
            height={320}
            data={datattv}
            interactions={["element-active"]}
          >
            <Point position="tanggal*nilai" color="jenis" shape="circle" />
            <Line
              shape="smooth"
              position="tanggal*nilai"
              color="jenis"
              label="nilai"
            />
            <Tooltip shared showCrosshairs />
            <Legend />
          </Chart>
        </Col>
      </Row>
    </div>
  );
};

export default FormPerkembanganPasien;
