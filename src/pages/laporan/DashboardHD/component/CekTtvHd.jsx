import React, { useContext } from "react";
import dayjs from "dayjs";
import { DashboardHdContext } from "../context/DashboardHdContext";
import { Button, Card, Col, DatePicker, Row, Space, Table, Tag } from "antd";

const CekTtvHd = () => {
  const { tanggalTtv, setTanggalTtv, getTtvHd, dataTtv, spinTTV } =
    useContext(DashboardHdContext);

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
      title: "Tanggal HD",
      width: "125px",
      render: (record) => (
        <div>{dayjs(record.tanggal).format("DD-MM-YYYY HH:mm")}</div>
      ),
    },
    {
      title: "Tanggal TTV",
      width: "125px",
      render: (record) => (
        <div>{dayjs(record.jam).format("DD-MM-YYYY HH:mm")}</div>
      ),
    },
    {
      title: "User Id",
      dataIndex: "userId",
      width: "200px",
    },
    {
      title: "Date Entry",
      width: "200px",
      render: (record) => (
        <div>{dayjs(record.dateEntry).format("DD-MM-YYYY HH:mm")}</div>
      ),
    },
    {
      title: "Keterangan",
      render: (record) => (
        <div>
          {dayjs(record.tanggal).format("DD-MM-YYYY HH:mm") !==
          dayjs(record.jam).format("DD-MM-YYYY HH:mm") ? (
            <Tag color="magenta">Tanggal HD dan TTV tidak sesuai!</Tag>
          ) : (
            <Tag color="green">OK!</Tag>
          )}
        </div>
      ),
    },
  ];

  return (
    <div>
      <Card
        title="Cek TTV Harian"
        // loading={spinGrafik}
        headStyle={{ backgroundColor: "#ffd166" }}
        style={{ width: "100%", backgroundColor: "#fff1f0" }}
      >
        <Row style={{ marginBottom: "5px" }}>
          <Col span={24}>
            <Space>
              <span>Pilih Tanggal :&nbsp;</span>
              <DatePicker
                value={dayjs(tanggalTtv)}
                format="DD-MM-YYYY"
                onChange={(e) => setTanggalTtv(dayjs(e).format("YYYY-MM-DD"))}
              />
              <Button onClick={() => getTtvHd(tanggalTtv)} type="primary">
                Refresh
              </Button>
            </Space>
          </Col>
        </Row>
        <Table
          loading={spinTTV}
          columns={columns}
          dataSource={dataTtv}
          pagination={false}
          bordered
          size="small"
        />
      </Card>
    </div>
  );
};

export default CekTtvHd;
