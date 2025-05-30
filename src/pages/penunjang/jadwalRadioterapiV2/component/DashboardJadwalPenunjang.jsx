import {
  Card,
  Col,
  Row,
  Space,
  Input,
  DatePicker,
  Button,
  Statistic,
  Table,
} from "antd";
import { SyncOutlined, CheckOutlined, CloseOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { Chart, Interval, Tooltip, Legend, Point, Line } from "bizcharts";
import React, { useContext, useState } from "react";
import { JadwalPenunjangContext } from "../context/JadwalPenunjangContext";

const DashboardJadwalPenunjang = () => {
  const {
    // main
    unitId,
    dtGrafik,
    totalJadwal,
    totalDatang,
    dtDetail,
    // func
    getJadwalbyMonth,
    getDetailJadwalbyDate,
  } = useContext(JadwalPenunjangContext);

  const [bln, setbln] = useState(dayjs());
  const [tgl, settgl] = useState(dayjs());

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
      align: "center",
      width: 40,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Tgl.Pelayanan",
      dataIndex: "TglPelayanan",
      key: "TglPelayanan",
      align: "center",
      width: 90,
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "Nama",
      dataIndex: "Nama",
      key: "Nama",
      align: "center",
      width: 200,
      sorter: (a, b) => a.Nama.localeCompare(b.Nama),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "No RM",
      dataIndex: "PasienId",
      key: "PasienId",
      align: "center",
      width: 75,
    },
    // {
    //     title: 'Diagnosa',
    //     dataIndex: 'Diagnosa',
    //     key: 'Diagnosa',
    //     align: 'center',
    //     width: 200,
    //     render: text => <div>{text}</div>,
    // },
    {
      title: "Jenis Pelayanan",
      dataIndex: "JnsPelayanan",
      key: "JnsPelayanan",
      align: "center",
      width: 150,
      // ellipsis: true,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Catatan",
      dataIndex: "Catatan",
      key: "Catatan",
      align: "center",
      width: 300,
      render: (text) => <div>{text}</div>,
    },
    {
      title: "Alamat",
      dataIndex: "Alamat",
      key: "Alamat",
      align: "center",
      width: 300,
      ellipsis: true,
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Status",
      dataIndex: "StsDatang",
      key: "StsDatang",
      fixed: "right",
      align: "center",
      width: 50,
      render: (text) => (
        <Button
          type="primary"
          danger={!text}
          icon={text && text ? <CheckOutlined /> : <CloseOutlined />}
          size="small"
        />
      ),
    },
  ];

  const scale = {
    jumlah: { min: 0 },
    jenis: {
      formatter: (v) => {
        return {
          jadwalpasien: "Total Jadwal",
          jadwalpasiendatang: "Pasien Datang",
        }[v];
      },
    },
  };

  const data = [
    {
      jenis: "jadwalpasien",
      tanggal: "2022-06-05",
      jumlah: 1,
    },
    {
      jenis: "jadwalpasien",
      tanggal: "2022-06-07",
      jumlah: 1,
    },
    {
      jenis: "jadwalpasien",
      tanggal: "2022-06-13",
      jumlah: 6,
    },
    {
      jenis: "jadwalpasien",
      tanggal: "2022-06-14",
      jumlah: 3,
    },
    {
      jenis: "jadwalpasien",
      tanggal: "2022-06-15",
      jumlah: 1,
    },
    {
      jenis: "jadwalpasiendatang",
      tanggal: "2022-06-05",
      jumlah: 3,
    },
    {
      jenis: "jadwalpasiendatang",
      tanggal: "2022-06-07",
      jumlah: 2,
    },
    {
      jenis: "jadwalpasiendatang",
      tanggal: "2022-06-13",
      jumlah: 3,
    },
    {
      jenis: "jadwalpasiendatang",
      tanggal: "2022-06-14",
      jumlah: 3,
    },
    {
      jenis: "jadwalpasiendatang",
      tanggal: "2022-06-15",
      jumlah: 1,
    },
  ];

  const dataa = [];
  for (let i = 0; i < 200; i++) {
    dataa.push({
      key: i,
      No: i + 1,
      TglPelayanan: "02-06-2022",
      Nama: "ABDURRAKHMAN ALHAKIM, SDR",
      NoPasien: "02187472",
      Diagnosa: "DEVIASI NASAL SEPTUM DENGAN HIPERTROPI KONKA",
      JnsPelayanan: "Konvensional + Kontras",
      Catatan: "DEVIASI NASAL SEPTUM DENGAN HIPERTROPI KONKA",
      Alamat: "DEVIASI NASAL SEPTUM DENGAN HIPERTROPI KONKA",
      StsDatang: i % 2 === 0 ? true : false,
    });
  }

  const changeBln = (e) => {
    setbln(e);
    getJadwalbyMonth(unitId, dayjs(e).format("YYYY-MM"));
  };

  const klikBln = () => {
    getJadwalbyMonth(unitId, dayjs(bln).format("YYYY-MM"));
  };

  const changeTgl = (e) => {
    settgl(e);
    getDetailJadwalbyDate(unitId, dayjs(e).format("YYYY-MM-DD"));
  };

  const klikTgl = () => {
    getDetailJadwalbyDate(unitId, dayjs(tgl).format("YYYY-MM-DD"));
  };

  const percentage = (totalDatang / totalJadwal) * 100;

  return (
    <>
      <Row>
        <Col
          span={12}
          // style={{ backgroundColor: 'blue' }}
        >
          <Space>
            <span>Bulan :</span>
            <Input.Group compact>
              <DatePicker
                value={bln}
                onChange={(e) => changeBln(e)}
                size="small"
                picker="month"
                format={"MM-YYYY"}
                allowClear={false}
                inputReadOnly={true}
              />
              <Button
                onClick={() => klikBln()}
                //   disabled={unitId ? false : true}
                type="primary"
                size="small"
                icon={<SyncOutlined />}
              />
            </Input.Group>
          </Space>
        </Col>
        <Col span={12}>
          <span style={{ float: "right", textDecoration: "underline" }}>
            <b>Grafik Pasien Datang</b>
          </span>
        </Col>
      </Row>

      <Row>
        <Col span={21} style={{ paddingRight: 10 }}>
          <Chart
            height={320}
            padding="auto"
            data={dtGrafik}
            scale={scale}
            autoFit
            interactions={["element-active"]}
          >
            <Point
              position="tanggal*jumlah"
              color={[
                "jenis",
                (xVal) => {
                  if (xVal === "jadwalpasien") {
                    return "#b7eb8f";
                  }
                  if (xVal === "jadwalpasiendatang") {
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
                  if (xVal === "jadwalpasien") {
                    return "#b7eb8f";
                  }
                  if (xVal === "jadwalpasiendatang") {
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
        <Col span={3} style={{ paddingTop: 30 }}>
          <Card
            style={{
              marginLeft: "5px",
              width: "99%",
              backgroundColor: "#e6f7ff",
            }}
          >
            <Statistic
              title={
                <div style={{ color: "#000000" }}>
                  <b>Jadwal Pasien</b>
                </div>
              }
              value={totalJadwal}
              valueStyle={{ color: "#faad14", fontWeight: "bold" }}
              suffix="pasien"
            />
          </Card>
          <br />
          <Card
            style={{
              marginLeft: "5px",
              width: "99%",
              backgroundColor: "#e6f7ff",
            }}
          >
            <Statistic
              title={
                <div style={{ color: "#000000" }}>
                  <b>Pasien Datang</b>
                </div>
              }
              value={totalDatang}
              valueStyle={{ color: "#1890ff", fontWeight: "bold" }}
              suffix="pasien"
            />
          </Card>
          <br />
          <Card
            style={{
              marginLeft: "5px",
              width: "99%",
              backgroundColor: "#e6f7ff",
            }}
          >
            <Statistic
              title={
                <div style={{ color: "#000000" }}>
                  <b>Presentase</b>
                </div>
              }
              value={percentage}
              precision={0}
              valueStyle={{ color: "#389e0d", fontWeight: "bold" }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <hr style={{ marginTop: 10 }} />

      <Row>
        <Col span={12}>
          <Space>
            <span>Tanggal :</span>
            <Input.Group compact>
              <DatePicker
                value={tgl}
                onChange={(e) => changeTgl(e)}
                size="small"
                format={"DD-MM-YYYY"}
                allowClear={false}
                inputReadOnly={true}
              />
              <Button
                onClick={() => klikTgl()}
                //   disabled={unitId ? false : true}
                type="primary"
                size="small"
                icon={<SyncOutlined />}
              />
            </Input.Group>
          </Space>
        </Col>
        <Col span={12}>
          <span style={{ float: "right", textDecoration: "underline" }}>
            <b>Detail Jadwal Harian</b>
          </span>
        </Col>
      </Row>

      <Table
        dataSource={dtDetail}
        columns={columns}
        bordered
        //   loading={spinListJadwal}
        pagination={dataa.length < 100 ? false : true}
        size="small"
        rowClassName={(record, index) =>
          record.StsDatang && record.StsDatang ? "pasien_datang" : ""
        }
        scroll={{ y: 800 }}
        style={{ marginTop: 5 }}
      />
    </>
  );
};

export default DashboardJadwalPenunjang;
