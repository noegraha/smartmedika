/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext, useState } from "react";
import { Chart, Interval } from "bizcharts";
import {
  Card,
  Row,
  Space,
  DatePicker,
  Button,
  Col,
  Select,
  Table,
  Divider,
} from "antd";
import { DashboardHdContext } from "../context/DashboardHdContext";
import dayjs from "dayjs";

const { Option } = Select;

const data = [
  { year: "1951 年", sales: 38 },
  { year: "1952 年", sales: 52 },
  { year: "1956 年", sales: 61 },
  { year: "1957 年", sales: 45 },
  { year: "1958 年", sales: 48 },
  { year: "1959 年", sales: 38 },
  { year: "1960 年", sales: 38 },
  { year: "1962 年", sales: 38 },
];

const GrafikAksesVaskuler = () => {
  const {
    bulanAksesVaskuler,
    setBulanAksesVaskuler,
    getAksesVaskuler,
    getAksesVaskulerv2,
    getTTVHarian,
    spinAksesVaskuler,
    spTabel,
    dataGrafikAV,
    dataAVv2,
    // v2
    dataPrePostTTV,
    // =====
  } = useContext(DashboardHdContext);

  const jenisRawat = [
    {
      id: "91",
      deskripsi: "Rawat Jalan",
    },
    {
      id: "93",
      deskripsi: "Rawat Inap",
    },
  ];

  const [jnsRawat, setjnsRawat] = useState();
  const [jnsRawat1, setjnsRawat1] = useState();
  const [tgl1, settgl1] = useState(dayjs());
  const [tglPrePostTTV, settglPrePostTTV] = useState(dayjs());

  const columns = [
    {
      title: "No",
      dataIndex: "No",
      key: "No",
      align: "center",
      width: 20,
      render: (text, record, index) => index + 1,
    },
    {
      title: "Tgl",
      dataIndex: "Tgl",
      key: "Tgl",
      align: "center",
      width: 90,
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY HH:mm")}</div>,
    },
    {
      title: "Nama",
      dataIndex: "Nama",
      key: "Nama",
      align: "center",
      width: 200,
      // sorter: (a, b) => a.Nama.localeCompare(b.Nama),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "No RM",
      dataIndex: "NoRM",
      key: "NoRM",
      align: "center",
      width: 75,
    },
    {
      title: "Akses Vaskuler",
      dataIndex: "Deskripsi",
      key: "Deskripsi",
      align: "center",
      width: 90,
      sorter: (a, b) =>
        a.Deskripsi && b.Deskripsi ? a.Deskripsi.localeCompare(b.Deskripsi) : 0,
    },
    {
      title: "UserId",
      dataIndex: "UserId",
      key: "UserId",
      align: "center",
      width: 75,
    },
  ];

  const columnsa = [
    {
      title: "Tgl. Pelayanan",
      dataIndex: "tanggal",
      key: "tanggal",
      align: "center",
      width: 70,
      render: (text) => <div>{dayjs(text).format("DD-MM-YYYY")}</div>,
    },
    {
      title: "No. Registrasi",
      dataIndex: "registrasiId",
      key: "registrasiId",
      align: "center",
      width: 70,
    },
    {
      title: "Nama",
      dataIndex: "nama",
      key: "nama",
      align: "center",
      width: 150,
      // sorter: (a, b) => a.Nama.localeCompare(b.Nama),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "No RM",
      dataIndex: "pasienId",
      key: "pasienId",
      align: "center",
      width: 50,
    },
    {
      title: "Tekanan Darah Pre HD",
      dataIndex: "tekananDarahSistolik",
      key: "tekananDarahSistolik",
      align: "center",
      width: 60,
      render: (text, record, index) => (
        <div>
          {record.tekananDarahSistolik} / {record.tekananDarahDiastolik}
        </div>
      ),
    },
    {
      title: "Tekanan Darah Post HD",
      dataIndex: "tekananDarahSistolikPost",
      key: "tekananDarahSistolikPost",
      align: "center",
      width: 60,
      render: (text, record, index) => (
        <div>
          {record.tekananDarahSistolikPost} / {record.tekananDarahDiastolikPost}
        </div>
      ),
    },
    {
      title: "BB Pre (Kg)",
      dataIndex: "beratBadan",
      key: "beratBadan",
      align: "center",
      width: 50,
    },
    {
      title: "BB Post (Kg)",
      dataIndex: "beratBadanPost",
      key: "beratBadanPost",
      align: "center",
      width: 50,
    },
    {
      title: "User Id",
      dataIndex: "userIdPost",
      key: "userIdPost",
      align: "center",
      width: 80,
    },
  ];

  // const changeBulan = (e) => {
  //   let bulan = dayjs(e).format("YYYY-MM");
  //   setBulanAksesVaskuler(bulan);
  //   getAksesVaskuler(bulan);
  // };

  const klikRefresh = (bln, jnsRwt) => {
    getAksesVaskuler(dayjs(bln).format("YYYY-MM"), jnsRwt);
  };

  const klikLihat = (bln, jnsRwt) => {
    getAksesVaskulerv2(dayjs(bln).format("YYYY-MM"), jnsRwt);
  };

  const klikLihatTTV = (date) => {
    getTTVHarian(dayjs(date).format("YYYY-MM-DD"));
  };

  return (
    <div>
      <Card
        title="Akses Vaskuler Hemodialisis"
        loading={spinAksesVaskuler}
        headStyle={{ backgroundColor: "#ffd166" }}
        style={{ width: "100%", backgroundColor: "#fff1f0" }}
      >
        <Row>
          <Space>
            <span>Jenis Pelayanan :</span>
            <Select
              dataSource={jenisRawat}
              value={jnsRawat1}
              // showSearch
              style={{ width: "200px", marginBottom: "3px" }}
              placeholder="Pilih Jenis Rawat..."
              // optionFilterProp="children"
              onChange={(e) => setjnsRawat1(e)}
              // size='small'
              // filterOption={(input, option) =>
              //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
              //   0
              // }
            >
              {jenisRawat.map((d) => (
                <Option key={d.id}>{d.deskripsi}</Option>
              ))}
            </Select>
            <span>Pilih Bulan :&nbsp;</span>
            <DatePicker
              value={dayjs(tgl1)}
              picker="month"
              format={"MM-YYYY"}
              onChange={(e) => settgl1(e)}
            />
            <Button
              onClick={() => klikRefresh(tgl1, jnsRawat1)}
              type="primary"
              disabled={!jnsRawat1}
            >
              Lihat Data
            </Button>
          </Space>
        </Row>
        <br />

        <Chart height={300} autoFit data={dataGrafikAV} appendPadding={[20, 0]}>
          <Interval
            position="aksesVaskuler*jumlah"
            size={20}
            label={[
              "jumlah",
              (val) => {
                return {
                  content: val,
                  style: {
                    fill: "red",
                    fontSize: 18,
                    fontWeight: "bold",
                  },
                };
              },
            ]}
          />
        </Chart>

        <hr style={{ marginTop: "20px" }} />

        <Row style={{ marginBottom: "5px" }}>
          <Col span={12}>
            <Divider orientation="left" style={{ marginBottom: "0px" }}>
              Daftar Akses Vaskuler Hemodialisis
            </Divider>
          </Col>

          <Col span={12}>
            <Space style={{ marginLeft: "10px" }}>
              <span>Jenis Pelayanan :</span>
              <Select
                dataSource={jenisRawat}
                value={jnsRawat}
                // showSearch
                style={{ width: "200px", marginBottom: "3px" }}
                placeholder="Pilih Jenis Rawat..."
                // optionFilterProp="children"
                onChange={(e) => setjnsRawat(e)}
                // size='small'
                // filterOption={(input, option) =>
                //   option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
                //   0
                // }
              >
                {jenisRawat.map((d) => (
                  <Option key={d.id}>{d.deskripsi}</Option>
                ))}
              </Select>
              <span>Bulan :&nbsp;</span>
              <DatePicker
                value={dayjs(bulanAksesVaskuler)}
                picker="month"
                format={"MM-YYYY"}
                onChange={(e) => setBulanAksesVaskuler(e)}
              />
              <Button
                onClick={() => klikLihat(bulanAksesVaskuler, jnsRawat)}
                disabled={!jnsRawat}
                type="primary"
                style={{ width: "104px" }}
              >
                Lihat Data
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          dataSource={dataAVv2}
          columns={columns}
          bordered
          loading={spTabel}
          pagination={dataAVv2.length < 100 ? false : true}
          rowKey={(record, index) => index}
          size="small"
          scroll={{ y: 420 }}
          // style={{ height: 495 }}
        />

        <hr style={{ marginTop: "20px" }} />

        <Row style={{ marginBottom: "5px" }}>
          <Col span={12}>
            <Divider orientation="left" style={{ marginBottom: "0px" }}>
              Daftar TTV Pre Post Pasien Hemodialisis
            </Divider>
          </Col>

          <Col span={12}>
            <Space style={{ marginLeft: "10px" }}>
              <span>Tgl. Pelayanan :&nbsp;</span>
              <DatePicker
                value={dayjs(tglPrePostTTV)}
                picker="date"
                format={"DD-MM-YYYY"}
                onChange={(e) => settglPrePostTTV(e)}
              />
              <Button
                onClick={() => klikLihatTTV(tglPrePostTTV)}
                type="primary"
                style={{ width: "104px" }}
              >
                Lihat Data
              </Button>
            </Space>
          </Col>
        </Row>

        <Table
          dataSource={dataPrePostTTV}
          columns={columnsa}
          bordered
          loading={spTabel}
          pagination={dataAVv2.length < 100 ? false : true}
          rowKey={(record, index) => index}
          size="small"
          scroll={{ y: 420 }}
          // style={{ height: 495 }}
        />
      </Card>
    </div>
  );
};

export default GrafikAksesVaskuler;
