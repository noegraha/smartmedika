import {
  Button,
  Card,
  Col,
  DatePicker,
  Row,
  Space,
  Table,
  message,
} from "antd";
import React, { useContext } from "react";
import { ReportingContext } from "../rawatjalan/context/ReportingContext";
import dayjs from "dayjs";
import { Axis, Chart, Coordinate, Interval, Legend, Tooltip } from "bizcharts";
const { RangePicker } = DatePicker;
const RekapKunjunganRJ = () => {
  const {
    rekapkunjunganrj,
    getReportingRJ,
    tanggalawal,
    setTanggalAwal,
    tanggalakhir,
    setTanggalAKhir,
    loading,
  } = useContext(ReportingContext);
  // Mengolah data untuk mendapatkan total
  const processedData = rekapkunjunganrj.map((item) => ({
    Deskripsi: item.Deskripsi,
    Total: item.Baru + item.Lama + item.Konsul,
  }));
  // Mengurutkan data berdasarkan Total dari yang terbanyak
  const sortedData = processedData.sort((a, b) => a.Total - b.Total);
  const columnreport = [
    {
      title: "Nama Poli",
      dataIndex: "Deskripsi",
      key: "namapoli",
    },
    {
      title: "Baru",
      dataIndex: "Baru",
      width: 60,
    },
    {
      title: "Lama",
      dataIndex: "Lama",
      width: 60,
    },
    {
      title: "Konsul",
      dataIndex: "Konsul",
      width: 60,
    },
    {
      title: "Jumlah",
      width: 60,
      sorter: (a, b) =>
        a.Baru + a.Lama + a.Konsul - (b.Baru + b.Lama + b.Konsul),
      defaultSortOrder: "descend",
      render(text, record) {
        return {
          props: {
            style: {
              background: "#e6fffb",
              cursor: "default",
            },
          },
          children: record.Baru + record.Lama + record.Konsul,
        };
      },
    },
  ];
  return (
    <div>
      <Card
        title="Rekap Kunjungan Rawat Jalan"
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
      >
        <Space>
          {/* <DatePicker
            placeholder="Tanggal Awal"
            onChange={(date, dateString) => {
              setTanggalAwal(dateString);
            }}
          />
          <DatePicker
            placeholder="Tanggal Akhir"
            onChange={(date, dateString) => {
              setTanggalAKhir(dateString);
            }}
          /> */}
          <RangePicker
            // defaultValue={[dayjs(), dayjs()]}
            placeholder={["Tanggal Awal", "Tanggal Akhir"]}
            format="YYYY-MM-DD"
            onChange={(date, dateString) => {
              setTanggalAwal(dateString[0]);
              setTanggalAKhir(dateString[1]);
            }}
          />
          <Button
            onClick={() =>
              tanggalawal === null || tanggalakhir === null
                ? message.warning("Harap pilih tanggal terlebih dulu.")
                : getReportingRJ(tanggalawal, tanggalakhir)
            }
            type="primary"
          >
            Cari
          </Button>
          <Button
            onClick={() =>
              getReportingRJ(
                dayjs().format("YYYY-MM-DD"),
                dayjs().format("YYYY-MM-DD")
              )
            }
            type="primary"
          >
            Hari ini
          </Button>
        </Space>
        <Row>
          <Col span={12}>
            <Table
              loading={loading}
              bordered
              dataSource={rekapkunjunganrj}
              columns={columnreport}
              size="small"
              pagination={false}
              // scroll={{ y: "50vh" }}
              summary={(pageData) => {
                let totalBaru = 0;
                let totalLama = 0;
                let totalKonsul = 0;
                let totalJumlah = 0;
                pageData.forEach(({ Baru, Lama, Konsul }) => {
                  totalBaru += Baru;
                  totalLama += Lama;
                  totalKonsul += Konsul;
                  totalJumlah += Baru + Lama + Konsul;
                });
                return (
                  <>
                    <tr>
                      <th>Total</th>
                      <td>{totalBaru}</td>
                      <td>{totalLama}</td>
                      <td>{totalKonsul}</td>
                      <td>{totalJumlah}</td>
                    </tr>
                  </>
                );
              }}
            />
          </Col>
          <Col span={12}>
            {/* <Chart
              height={400}
              data={processedData}
              autoFit
              padding={[20, 20, 50, 40]} // [top, right, bottom, left]
            >
              <Interval
                animate={true}
                adjust={[
                  {
                    type: "dodge",
                    marginRatio: 0,
                  },
                ]}
                label={[
                  "Total",
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
                color="Deskripsi"
                position="Deskripsi*Total"
              />
              <Tooltip shared />
              <Legend position="top" />
            </Chart> */}
            <Chart
              // height={950}
              data={sortedData}
              autoFit
              padding={[5, 40, 50, 275]}
            >
              <Coordinate transpose />
              <Axis position="top" />
              {/* <Legend
                itemName={{
                  style: {
                    fill: "#333",
                  },
                }}
              /> */}
              <Interval
                position="Deskripsi*Total"
                label="Total"
                color="Deskripsi"
              />
            </Chart>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RekapKunjunganRJ;
