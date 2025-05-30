import React, { useContext } from "react";
import dayjs from "dayjs";
import { Chart, Tooltip, Legend, Point, Line } from "bizcharts";
import { DashboardHdContext } from "../context/DashboardHdContext";
import {
  Button,
  Card,
  Col,
  Collapse,
  DatePicker,
  Row,
  Space,
  Statistic,
} from "antd";

const { Panel } = Collapse;

const GrafikInformConsent = () => {
  const {
    totalPasienOrder,
    bulanInformConsent,
    setBulanInformConsent,
    getInformConsent,
    dataGrafikIC,
    totalInformConsent,
    totalInformConsentTtd,
    spinInformConsent,
  } = useContext(DashboardHdContext);

  const scale = {
    jumlah: { min: 0 },
    jenis: {
      formatter: (v) => {
        return {
          trxorder: "Pasien Order",
          informConsent: "Inform Consent (belum ttd)",
          informConsentTtd: "Inform Consent",
        }[v];
      },
    },
  };

  const onChangeBulan = (e) => {
    let bulan = dayjs(e).format("YYYY-MM");
    setBulanInformConsent(bulan);
    getInformConsent(bulan);
  };

  const persentase = (totalInformConsentTtd / totalPasienOrder) * 100;

  return (
    <div>
      <Collapse>
        <Panel
          header={<b>Inform Consent Hemodialisis</b>}
          key="1"
          style={{ backgroundColor: "#ffd166" }}
        >
          <Row>
            <Col span={24}>
              <Space>
                <span>Pilih Bulan :&nbsp;</span>
                <DatePicker
                  value={dayjs(bulanInformConsent)}
                  picker="month"
                  format={"MM-YYYY"}
                  onChange={(e) => onChangeBulan(e)}
                />
                <Button
                  onClick={() => getInformConsent(bulanInformConsent)}
                  type="primary"
                >
                  Refresh
                </Button>
              </Space>
            </Col>
          </Row>
          <br />

          <Row>
            <Col span={20}>
              <Chart
                height={320}
                padding="auto"
                data={dataGrafikIC}
                scale={scale}
                autoFit
                interactions={["element-active"]}
              >
                <Point
                  position="tanggal*jumlah"
                  color={[
                    "jenis",
                    (xVal) => {
                      if (xVal === "informConsent") {
                        return "#ffd166";
                      }
                      if (xVal === "informConsentTtd") {
                        return "#06d6a0";
                      }
                      return "#ef476f";
                    },
                  ]}
                  shape="circle"
                />
                <Line
                  shape="smooth"
                  position="tanggal*jumlah"
                  color={[
                    "jenis",
                    (xVal) => {
                      if (xVal === "informConsent") {
                        return "#ffd166";
                      }
                      if (xVal === "informConsentTtd") {
                        return "#06d6a0";
                      }
                      return "#ef476f";
                    },
                  ]}
                  label="jumlah"
                />
                <Tooltip shared showCrosshairs />
                <Legend position="top" />
              </Chart>
            </Col>
            <Col span={4}>
              <Card style={{ marginLeft: "5px", width: "99%" }}>
                <Statistic
                  title={
                    <div style={{ color: "#000000" }}>
                      <b>Pasien Order</b>
                    </div>
                  }
                  value={totalPasienOrder}
                  valueStyle={{ color: "#ef476f", fontWeight: "bold" }}
                  suffix="pasien"
                />
              </Card>
              <br />
              <Card style={{ marginLeft: "5px", width: "99%" }}>
                <Statistic
                  title={
                    <div style={{ color: "#000000" }}>
                      <b>Inform Consent</b>
                    </div>
                  }
                  value={totalInformConsent}
                  valueStyle={{ color: "#ffd166", fontWeight: "bold" }}
                  suffix="pasien"
                />
              </Card>
              <br />
              <Card style={{ marginLeft: "5px", width: "99%" }}>
                <Statistic
                  title={
                    <div style={{ color: "#000000" }}>
                      <b>Inform Consent (sudah ttd)</b>
                    </div>
                  }
                  value={totalInformConsentTtd}
                  valueStyle={{ color: "#06d6a0", fontWeight: "bold" }}
                  suffix="pasien"
                />
              </Card>
              <br />
              <Card style={{ marginLeft: "5px", width: "99%" }}>
                <Statistic
                  title={
                    <div style={{ color: "#000000" }}>
                      <b>Presentase</b>
                    </div>
                  }
                  value={persentase}
                  precision={0}
                  valueStyle={{ color: "#06d6a0", fontWeight: "bold" }}
                  suffix="%"
                />
              </Card>
            </Col>
          </Row>
        </Panel>
      </Collapse>

      {/* <Card
        title="Inform Consent Hemodialisis"
        loading={spinInformConsent}
        headStyle={{ backgroundColor: "#ffd166" }}
        style={{ width: "100%", backgroundColor: "#fff1f0" }}
      >

      </Card> */}
    </div>
  );
};

export default GrafikInformConsent;
