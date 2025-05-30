import React, { useContext } from "react";
import dayjs from "dayjs";
import { Chart, Tooltip, Legend, Point, Line } from "bizcharts";
import { DashboardHdContext } from "../context/DashboardHdContext";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Space,
  Table,
  Tag,
  Statistic,
  Collapse,
} from "antd";

const { Panel } = Collapse;

const GrafikHd = () => {
  const {
    dataGrafikHd,
    dataDetailGrafikHd,
    bulanHd,
    setBulanHd,
    tanggalDetail,
    setTanggalDetail,
    spinGrafik,
    spinDetailGrafik,
    getGrafikHd,
    getDetailGrafikHd,
    totalPasienOrder,
    totalSudahEntry,
    totalSudahEntryFull,
  } = useContext(DashboardHdContext);

  const scale = {
    jumlah: { min: 0 },
    jenis: {
      formatter: (v) => {
        return {
          trxorder: "Pasien Order",
          dialisisHeader: "Sudah Entry",
          dialisisHeaderFull: "Sudah Entry (selesai)",
        }[v];
      },
    },
  };

  const columns = [
    {
      title: "No",
      dataIndex: "no",
      width: "35px",
    },
    {
      title: "No Registrasi",
      dataIndex: "registrasiId",
      width: "100px",
    },
    {
      title: "Tanggal Order",
      width: "100px",
      render: (record) => (
        <div>{dayjs(record.tglOrder).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Tanggal HD",
      width: "100px",
      render: (record) => (
        <div>{dayjs(record.tanggal).format("DD-MM-YYYY")}</div>
      ),
    },
    {
      title: "Unit Order",
      dataIndex: "namaBagian",
      width: "200px",
    },
    {
      title: "Keterangan",
      render: (record) => (
        <div>
          {record.dialisisHeaderId === null ? (
            <Tag color="magenta">Belum Entry!</Tag>
          ) : dayjs(record.tglOrder).format("DD-MM-YYYY") !==
            dayjs(record.tanggal).format("DD-MM-YYYY") ? (
            <Tag color="magenta">Tanggal HD tidak sesuai!</Tag>
          ) : record.noMesin === null ? (
            <Tag color="magenta">No Mesin masih kosong!</Tag>
          ) : record.ekstremitas === null ? (
            <Tag color="magenta">Ekstremitas masih kosong!</Tag>
          ) : record.aksesVaskulerId === null ? (
            <Tag color="magenta">Akses Vaskuler masih kosong!</Tag>
          ) : record.ktv3 === null ? (
            <Tag color="magenta">Kt/V masih kosong!</Tag>
          ) : record.jenisKasus === null ? (
            <Tag color="magenta">Jenis masih kosong!</Tag>
          ) : record.mode === null ? (
            <Tag color="magenta">Mode masih kosong!</Tag>
          ) : record.durasi === null ? (
            <Tag color="magenta">Durasi masih kosong!</Tag>
          ) : record.waktuMulai === null ? (
            <Tag color="magenta">Waktu Mulai masih kosong!</Tag>
          ) : record.waktuSelesai === null ? (
            <Tag color="magenta">Waktu Selesai masih kosong!</Tag>
          ) : record.prwtAssId === null ? (
            <Tag color="magenta">Perawat Akses Vaskuler masih kosong!</Tag>
          ) : record.prwtPrimerId === null ? (
            <Tag color="magenta">Perawat Penanggung Jawab masih kosong!</Tag>
          ) : (
            <Tag color="green">Lengkap</Tag>
          )}
        </div>
      ),
    },
  ];

  const onChangeBulan = (e) => {
    let bulan = dayjs(e).format("YYYY-MM");
    setBulanHd(bulan);
    getGrafikHd(bulan);
  };

  const onChangeBulanDetailRME = (e) => {
    let tanggal = dayjs(e).format("YYYY-MM-DD");
    setTanggalDetail(tanggal);
    getDetailGrafikHd(tanggal);
  };

  const persenSudahEntry = (totalSudahEntryFull / totalPasienOrder) * 100;

  return (
    <div>
      <Card
        title="Pasien Order, Sudah Entry, dan Sudah Entry (selesai)"
        loading={spinGrafik}
        headStyle={{ backgroundColor: "#ffd166" }}
        style={{ width: "100%", backgroundColor: "#fff1f0" }}
      >
        <Row>
          <Col span={24}>
            <Space>
              <span>Pilih Bulan :&nbsp;</span>
              <DatePicker
                value={dayjs(bulanHd)}
                picker="month"
                format={"MM-YYYY"}
                onChange={(e) => onChangeBulan(e)}
              />
              <Button onClick={() => getGrafikHd(bulanHd)} type="primary">
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
              data={dataGrafikHd}
              scale={scale}
              autoFit
              interactions={["element-active"]}
            >
              <Point
                position="tanggal*jumlah"
                color={[
                  "jenis",
                  (xVal) => {
                    if (xVal === "dialisisHeader") {
                      return "#b7eb8f";
                    }
                    if (xVal === "dialisisHeaderFull") {
                      return "#389e0d";
                    }
                    return "#faad14";
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
                    if (xVal === "dialisisHeader") {
                      return "#b7eb8f";
                    }
                    if (xVal === "dialisisHeaderFull") {
                      return "#389e0d";
                    }
                    return "#faad14";
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
                valueStyle={{ color: "#faad14", fontWeight: "bold" }}
                suffix="pasien"
              />
            </Card>
            <br />
            <Card style={{ marginLeft: "5px", width: "99%" }}>
              <Statistic
                title={
                  <div style={{ color: "#000000" }}>
                    <b>Sudah Entry</b>
                  </div>
                }
                value={totalSudahEntry}
                valueStyle={{ color: "#b7eb8f", fontWeight: "bold" }}
                suffix="pasien"
              />
            </Card>
            <br />
            <Card style={{ marginLeft: "5px", width: "99%" }}>
              <Statistic
                title={
                  <div style={{ color: "#000000" }}>
                    <b>Sudah Entry (selesai)</b>
                  </div>
                }
                value={totalSudahEntryFull}
                valueStyle={{ color: "#389e0d", fontWeight: "bold" }}
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
                value={persenSudahEntry}
                precision={0}
                valueStyle={{ color: "#389e0d", fontWeight: "bold" }}
                suffix="%"
              />
            </Card>
          </Col>
        </Row>

        <br />

        <Collapse>
          <Panel
            header={<b>Detail RME Harian</b>}
            key="1"
            style={{ backgroundColor: "#06d6a0" }}
          >
            <Row style={{ marginBottom: "5px" }}>
              <Col span={24}>
                <Space>
                  <span>Pilih Tanggal :&nbsp;</span>
                  <DatePicker
                    value={dayjs(tanggalDetail)}
                    format="DD-MM-YYYY"
                    onChange={(e) => onChangeBulanDetailRME(e)}
                  />
                  <Button
                    onClick={() => getDetailGrafikHd(tanggalDetail)}
                    type="primary"
                  >
                    Refresh
                  </Button>
                </Space>
              </Col>
            </Row>
            <Table
              loading={spinDetailGrafik}
              columns={columns}
              dataSource={dataDetailGrafikHd}
              pagination={false}
              bordered
              size="small"
            />
          </Panel>
        </Collapse>
      </Card>
    </div>
  );
};

export default GrafikHd;
