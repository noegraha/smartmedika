import React from "react";
import { Layout, Row, Col, Typography, Button } from "antd";
import { FarmasiContext } from "../context/FarmasiContext";

const { Header } = Layout;
const { Title } = Typography;

const HeaderFarmasi = () => {
  const { setCurpas } = React.useContext(FarmasiContext);

  return (
    <Header style={{ padding: "0 20px", backgroundColor: "#001529", color: "#fff" }}>
      <Row justify="space-between" align="middle">
        <Col>
          <Title level={3} style={{ color: "#fff", margin: 0 }}>Farmasi - Data Pasien</Title>
        </Col>
        <Col>
          <Button
            type="default"
            style={{ color: "#fff" }}
            onClick={() => setCurpas([])}  // Reset data pasien saat tombol ini ditekan
          >
            Reset Data
          </Button>
        </Col>
      </Row>
    </Header>
  );
};

export default HeaderFarmasi;
