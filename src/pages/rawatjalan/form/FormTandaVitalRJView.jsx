import React, { useContext } from "react";
import { Form, Card, Tooltip, Tag, Descriptions } from "antd";
import { AnamnesaContext } from "../context/AnamnesaContext";
const FormTandaVitalRJView = () => {
  const {
    sistolik,
    diastolik,
    suhu,
    nadi,
    tinggi,
    berat,
    saturasi,
    iramanadi,
    nafas,
    skornyeri,
    resikojatuh,
    loadingTTV,
  } = useContext(AnamnesaContext);
  const IMT = (berat / Math.pow(tinggi, 2)) * 10000;
  const IMTket =
    IMT < 18.5
      ? "BB Kurang"
      : IMT < 25
      ? "BB Normal"
      : IMT < 30
      ? "BB Overweight dg Resiko"
      : IMT < 40
      ? "Obesitas I"
      : "Obesitas II";
  const styleku = isNaN(IMT)
    ? { width: "75%" }
    : IMT < 18.5
    ? "#2ad0d0"
    : IMT < 25
    ? "lightgreen"
    : IMT < 30
    ? "lightblue"
    : IMT < 40
    ? "lightpink"
    : "lightcoral";
  return (
    <div>
      <Form>
        <Card
          size="small"
          title="Tanda Vital"
          headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
          style={{
            marginBottom: 5,
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
          loading={loadingTTV}
        >
          <Descriptions
            size="small"
            bordered
            column={{ xxl: 3, xl: 2, lg: 2, md: 2, sm: 2, xs: 1 }}
          >
            <Descriptions.Item label="Tensi">
              <Tooltip title="Tensi Atas">{sistolik}/</Tooltip>
              <Tooltip title="Tensi Bawah">{diastolik} </Tooltip>Mmhg
            </Descriptions.Item>
            <Descriptions.Item label="Nadi">{nadi} x/Menit</Descriptions.Item>
            <Descriptions.Item label="Suhu">{suhu} °C</Descriptions.Item>
            <Descriptions.Item label="Berat">{berat} Kg</Descriptions.Item>
            <Descriptions.Item label="Tinggi">{tinggi} Cm</Descriptions.Item>
            <Descriptions.Item label="Saturasi">{saturasi} %</Descriptions.Item>
            <Descriptions.Item label="Frek. Nafas">
              {nafas} x/Menit
            </Descriptions.Item>
            <Descriptions.Item label="Irama Nadi">
              {iramanadi}
            </Descriptions.Item>
            <Descriptions.Item label="Skala Nyeri">
              {skornyeri === 1
                ? "Tidak Nyeri (0)"
                : skornyeri === 2
                ? "Nyeri Ringan (1-2-3)"
                : skornyeri === 3
                ? "Nyeri Sedang (4-5-6)"
                : skornyeri === 4
                ? "Nyeri Berat (7-8-9-10)"
                : ""}
            </Descriptions.Item>
            <Descriptions.Item label="Resiko Jatuh">
              {resikojatuh === 1
                ? "Tidak Ada Resiko"
                : resikojatuh === 2
                ? "Resiko Rendah"
                : resikojatuh === 3
                ? "Resiko Tinggi"
                : ""}
            </Descriptions.Item>
            <Descriptions.Item label="IMT" span={2}>
              {isNaN(IMT) ? "" : IMT.toFixed(2)}{" "}
              <Tag color={styleku}>{isNaN(IMT) ? null : IMTket}</Tag>
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Form>
    </div>
  );
};

export default FormTandaVitalRJView;
