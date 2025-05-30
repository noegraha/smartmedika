import React, { useState, useEffect, useCallback } from "react";
import { Button, Card, Col, message, Row, Table, Tag } from "antd";
import axios from "axios";
import { Chart, Interval, Tooltip, Legend, Axis, Coordinate } from "bizcharts";

const KetersediaanTT = () => {
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const [listData, setListData] = useState([]);
  const [chartData1, setChartData1] = useState([]);

  const predefinedClasses = [
    { kelasRawatId: "2", kelasRawatDesk: "KELAS I" },
    { kelasRawatId: "3", kelasRawatDesk: "KELAS II" },
    { kelasRawatId: "A", kelasRawatDesk: "KELAS III" },
    { kelasRawatId: "7", kelasRawatDesk: "KELAS VIP A" },
    { kelasRawatId: "8", kelasRawatDesk: "KELAS VIP B" },
    { kelasRawatId: "9", kelasRawatDesk: "KELAS VVIP A" },
    { kelasRawatId: "C", kelasRawatDesk: "KELAS VVIP B" },
  ];

  const getData = useCallback(async () => {
    try {
      const res = await axios.get(
        `${apiku}/MstKamar/DashboardSummary`,
        options
      );
      if (res.data.statusCode === 200) {
        const transformedData = res.data.result.reduce((acc, item) => {
          const roomIndex = acc.findIndex(
            (room) =>
              room.ruangId === item.ruangId && room.ruangDesk === item.ruangDesk
          );

          if (roomIndex > -1) {
            const kelasIndex = acc[roomIndex].kelas.findIndex(
              (kelas) => kelas.kelasRawatId === item.kelasRawatId
            );
            if (kelasIndex > -1) {
              acc[roomIndex].kelas[kelasIndex] = {
                ...acc[roomIndex].kelas[kelasIndex],
                ...item,
              };
            }
          } else {
            const classesWithData = predefinedClasses.map((kelas) => ({
              ...kelas,
              jumlahTT: 0,
              terisi: 0,
              utama: 0,
              extra: 0,
              nonBed: 0,
            }));

            const classIndex = classesWithData.findIndex(
              (kelas) => kelas.kelasRawatId === item.kelasRawatId
            );
            if (classIndex > -1) {
              classesWithData[classIndex] = {
                ...classesWithData[classIndex],
                ...item,
              };
            }

            acc.push({
              ruangId: item.ruangId,
              ruangDesk: item.ruangDesk,
              kelas: classesWithData,
            });
          }
          return acc;
        }, []);

        const finalData = [];
        const roomIds = [
          ...new Set(transformedData.map((room) => room.ruangId)),
        ];
        roomIds.forEach((ruangId) => {
          const roomsWithDesk = transformedData.filter(
            (room) => room.ruangId === ruangId
          );
          roomsWithDesk.forEach((room) => {
            finalData.push({
              ruangId: room.ruangId,
              ruangDesk: room.ruangDesk,
              kelas: predefinedClasses.map((kelas) => {
                const existingKelas =
                  room.kelas.find(
                    (k) => k.kelasRawatId === kelas.kelasRawatId
                  ) || {};
                return {
                  ...kelas,
                  jumlahTT: existingKelas.jumlahTT || 0,
                  terisi: existingKelas.terisi || 0,
                  utama: existingKelas.utama || 0,
                  extra: existingKelas.extra || 0,
                  nonBed: existingKelas.nonBed || 0,
                };
              }),
            });
          });
        });

        setListData(
          finalData.sort((a, b) => a.ruangDesk.localeCompare(b.ruangDesk))
        );

        const chartData = finalData.flatMap((room) =>
          room.kelas.map((k) => ({
            room: room.ruangDesk,
            kelas: k.kelasRawatDesk,
            jumlahTT: k.jumlahTT,
            terisi: k.terisi,
            utama: k.utama,
            extra: k.extra,
            nonBed: k.nonBed,
          }))
        );

        setChartData1(chartData);
        console.log(
          finalData.sort((a, b) => a.ruangDesk.localeCompare(b.ruangDesk))
        );
      } else {
        message.error(res.data.message);
      }
    } catch (error) {
      message.error("Failed to fetch data. Please try again later.");
      console.error("Error fetching data:", error);
    }
  }, [apiku, options]);

  const columns = [
    {
      title: "Ruang ID",
      dataIndex: "ruangId",
      key: "ruangId",
    },
    {
      title: "Ruang Desk",
      key: "ruangDesk",
      filterSearch: true,
      onFilter: (value, record) =>
        record.ruangDesk.toLowerCase().startsWith(value.toLowerCase()),
      render: (text, record) => {
        const totalJumlahTT = record.kelas.reduce(
          (sum, kelas) => sum + (parseInt(kelas.jumlahTT) || 0),
          0
        );
        const totalTerisi = record.kelas.reduce(
          (sum, kelas) => sum + (parseInt(kelas.terisi) || 0),
          0
        );
        const totalSisa = parseInt(totalJumlahTT - totalTerisi) || 0;
        return (
          <>
            <div>
              <Tag>{record.ruangDesk}</Tag>
            </div>
            <div>
              <Tag color="gold">Total: {totalJumlahTT}</Tag>
            </div>
            <div>
              <Tag color="blue">Terisi: {totalTerisi}</Tag>
            </div>
            <div>
              <Tag color="red">Kosong: {totalSisa}</Tag>
            </div>
          </>
        );
      },
    },
    ...predefinedClasses.map((kelas) => ({
      title: kelas.kelasRawatDesk,
      dataIndex: kelas.kelasRawatId,
      key: kelas.kelasRawatId,
      render: (text, record) => {
        const kelasData =
          record.kelas.find((k) => k.kelasRawatId === kelas.kelasRawatId) || {};
        return (
          <div>
            {kelasData.jumlahTT > 0 && (
              <>
                <div>
                  <Tag color="magenta">Jumlah TT: {kelasData.jumlahTT}</Tag>
                </div>
                <div>
                  <Tag color="purple">Terisi: {kelasData.terisi}</Tag>
                </div>
                <div>
                  <Tag color="green">
                    Kosong:{" "}
                    {parseInt(kelasData.jumlahTT) - parseInt(kelasData.terisi)}
                  </Tag>
                </div>
                <div>
                  <Tag color="cyan">Utama: {kelasData.utama}</Tag>
                </div>
                <div>
                  <Tag color="volcano">Extra: {kelasData.extra}</Tag>
                </div>
                <div>
                  <Tag color="geekblue">Non Bed: {kelasData.nonBed}</Tag>
                </div>
              </>
            )}
          </div>
        );
      },
    })),
  ];

  const aggregatedData = listData.map((room) => {
    const totalJumlahTT = room.kelas.reduce(
      (acc, kelas) => acc + kelas.jumlahTT,
      0
    );
    const totalTerisi = room.kelas.reduce(
      (acc, kelas) => acc + kelas.terisi,
      0
    );
    const totalKosong = totalJumlahTT - totalTerisi;

    return {
      ruangDesk: room.ruangDesk,
      jumlahTT: totalJumlahTT,
      terisi: totalTerisi,
      kosong: totalKosong,
    };
  });

  const chartData = [];

  aggregatedData.forEach((item) => {
    chartData.push(
      { ruangDesk: item.ruangDesk, type: "TT Terisi", value: item.terisi },
      { ruangDesk: item.ruangDesk, type: "TT Kosong", value: item.kosong },
      { ruangDesk: item.ruangDesk, type: "TT Total", value: item.jumlahTT }
    );
  });

  const containerStyle = {
    width: "100%",
    overflowX: "auto", // Enables horizontal scrolling
    overflowY: "hidden",
    paddingBottom: "20px",
  };

  const chartStyle = {
    minWidth: "800px", // Ensures the chart is wide enough to require scrolling if there are many rooms
  };
  return (
    <div>
      <Card title="Daftar Kapasitas Tempat Tidur" size="small">
        <Row gutter={[5, 5]}>
          <Col span={24}>
            {" "}
            <Button block type="primary" onClick={getData}>
              Tampilkan Data
            </Button>
          </Col>
          <Col span={24}>
            <div style={containerStyle}>
              <div style={chartStyle}>
                <Chart height={400} data={chartData} autoFit>
                  <Axis
                    name="ruangDesk"
                    label={{
                      rotate: 0.5,
                      autoRotate: true,
                      style: { textAlign: "start", fontSize: 10 },
                    }}
                  />
                  <Axis name="value" />
                  <Legend />
                  <Tooltip shared />
                  <Coordinate type="rect" />
                  <Interval
                    adjust={[
                      {
                        type: "dodge",
                        marginRatio: 0,
                      },
                      {
                        type: "stack",
                      },
                    ]}
                    position="ruangDesk*value"
                    color="type"
                    tooltip={[
                      "type*value*ruangDesk",
                      (type, value, ruangDesk) => {
                        return {
                          name: type,
                          value: `${value} beds`,
                        };
                      },
                    ]}
                  />
                </Chart>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <Table
              pagination={false}
              dataSource={listData}
              columns={columns}
              rowKey="ruangId"
              scroll={{
                y: 440,
              }}
            />
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default KetersediaanTT;
