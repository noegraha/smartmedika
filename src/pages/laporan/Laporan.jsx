import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  Col,
  Divider,
  Radio,
  Row,
  Select,
  Space,
  Switch,
  Statistic,
  Avatar,
} from "antd";
import "../App.css";
import dayjs from "dayjs";
import Demo from "../home/grafik2";
import GrafikUser from "../home/GrafikUser";
// import { PrinterOutlined } from "@ant-design/icons";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import { ChatContext } from "../chat/Chatcontext";
// import GrafikUserANTD from "../home/GrafikUserANTD";
import { UserOutlined } from "@ant-design/icons";
import GrafikRuang from "../home/GrafikRuang";
const { Option } = Select;
const { Meta } = Card;

const Laporan = () => {
  const { pembayaran, getPembayaran, ambilStatistik } =
    useContext(PasienContext);
  const { setAnimasi, pasienrsms, pasienabiyasa, pasienigd } =
    useContext(ChatContext);
  const tanggal = dayjs().format("DD-MM-YYYY");
  const [time, setTime] = useState(getTime());
  const [pilih, setPilih] = useState("a");

  const onStatistik = (e) => {
    ambilStatistik(e === "0001" ? "%25" : e);
    // console.log(e)
  };
  const onPilih = (e) => {
    setPilih(e);
    ambilStatistik("%25");
  };
  useEffect(() => {
    let timer1 = setInterval(() => {
      setTime(getTime());
    }, 1000);
    return () => {
      clearInterval(timer1);
    };
  }, [time]);
  function getTime() {
    let ampm;
    const d = new Date();
    var hour = d.getHours();
    var min = d.getMinutes();
    if (hour >= 12) {
      ampm = "PM";
      hour === 12 ? (hour = 12) : (hour = ("0" + (hour - 12)).slice(-2));
    } else {
      ampm = "AM";
      hour === 0 ? (hour = 12) : (hour = ("0" + hour).slice(-2));
    }
    if (min < 10) min = ("0" + min).slice(-2);
    // console.log(`${hour} : ${min} ${ampm}`);
    return `${hour}:${min} ${ampm}`;
  }

  return (
    <div
      className="backcontent"
      style={{ width: "100%", height: "92vh", overflowY: "scroll" }}
    >
      {/* <iframe title="Laporan" style={{ margin: '5%' }} width="90%" height="700" src="https://app.powerbi.com/reportEmbed?reportId=0be5140d-a529-4b44-86ee-8a9301d9dd73&autoAuth=true&ctid=8f1dbc3e-9577-46d5-9248-b5669a8e83dd&config=eyJjbHVzdGVyVXJsIjoiaHR0cHM6Ly93YWJpLXNvdXRoLWVhc3QtYXNpYS1yZWRpcmVjdC5hbmFseXNpcy53aW5kb3dzLm5ldC8ifQ%3D%3D" frameborder="0" allowFullScreen="true"></iframe> */}
      <Row gutter={(16, 16)} style={{ marginTop: 10 }}>
        <Col span={6}>
          <Card style={{ margin: 5, marginTop: 0, backgroundColor: "#f6ffed" }}>
            <Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "#87d068" }}
                  icon={<UserOutlined />}
                />
              }
              title="Pasien RJ Total Hari ini"
            />
            <Statistic
              value={pasienrsms + pasienabiyasa + pasienigd}
              precision={0}
              valueStyle={{ color: "#3f8600" }}
              suffix="pasien"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ margin: 5, marginTop: 0, backgroundColor: "#e6f7ff" }}>
            <Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "#40a9ff" }}
                  icon={<UserOutlined />}
                />
              }
              title="Pasien RJ RSMS Hari ini"
            />
            <Statistic
              value={pasienrsms}
              precision={0}
              valueStyle={{ color: "#0050b3" }}
              suffix="pasien"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ margin: 5, marginTop: 0, backgroundColor: "#e6fffb" }}>
            <Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "#87e8de" }}
                  icon={<UserOutlined />}
                />
              }
              title="Pasien RJ Abiyasa Hari ini"
            />
            <Statistic
              value={pasienabiyasa}
              precision={0}
              valueStyle={{ color: "#36cfc9" }}
              suffix="pasien"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card style={{ margin: 5, marginTop: 0, backgroundColor: "#fff1f0" }}>
            <Meta
              avatar={
                <Avatar
                  style={{ backgroundColor: "#ffa39e" }}
                  icon={<UserOutlined />}
                />
              }
              title="Pasien Masuk IGD Hari ini"
            />
            <Statistic
              value={pasienigd}
              precision={0}
              valueStyle={{ color: "#ff4d4f" }}
              suffix="pasien"
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Card
            onContextMenu={(e) => {
              e.preventDefault();
              return false;
            }}
            onPaste={(e) => {
              e.preventDefault();
              return false;
            }}
            onCopy={(e) => {
              e.preventDefault();
              return false;
            }}
            size="small"
            style={{ margin: 5 }}
            title="Statistik Pendaftaran"
            extra={
              <Space>
                {pilih === "b" ? (
                  <div>
                    Jenis Pembayaran :{" "}
                    <Select
                      dataSource={pembayaran}
                      showSearch
                      style={{ width: "300px" }}
                      placeholder="..."
                      optionFilterProp="children"
                      onFocus={() => getPembayaran()}
                      onChange={(e) => onStatistik(e)}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {pembayaran.map((d) => (
                        <Option key={d.pembayaranId}>
                          {d.pembayaranId + " - " + d.deskripsi}
                        </Option>
                      ))}
                    </Select>
                  </div>
                ) : (
                  <div>
                    Tanggal : {tanggal} <Divider type="vertical" /> Waktu :{" "}
                    <span>{time.slice(0, 2)}</span>
                    <span>:</span>
                    <span>{`${time.slice(3, 6)} ${time.slice(-2)}`}</span>
                    <Divider type="vertical" />
                    Animate :{" "}
                    <Switch
                      defaultChecked
                      onChange={(e) => setAnimasi(e)}
                      size="small"
                    />
                  </div>
                )}
                <Radio.Group
                  onChange={(e) => onPilih(e.target.value)}
                  defaultValue="a"
                >
                  <Radio.Button value="a">By User</Radio.Button>
                  <Radio.Button value="b">By Harian</Radio.Button>
                  <Radio.Button value="c">By Ruang</Radio.Button>
                </Radio.Group>
              </Space>
            }
          >
            {pilih === "b" ? (
              <Demo />
            ) : pilih === "c" ? (
              <GrafikRuang />
            ) : (
              <GrafikUser />
            )}
          </Card>
        </Col>
      </Row>

      {/* <Row>
        <Col span={24}>
          <Card
            size="small"
            style={{ margin: 5 }}
            title="Statistik Pendaftaran"
          >
            <GrafikUserANTD />
          </Card>
        </Col>
      </Row> */}
      {/* <Button
        href="http://182.168.2.50/ReportServer2017/Pages/ReportViewer.aspx?%2FReport%20Parts%2FLaporanKunjungan&rc:showbackbutton=true"
        target="popup"
        onclick="window.open('http://182.168.2.50/ReportServer2017/Pages/ReportViewer.aspx?%2FReport%20Parts%2FLaporanKunjungan&rc:showbackbutton=true','winname','directories=no,titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=no,width=400,height=350')"
      >
        <PrinterOutlined />
        Cetak
      </Button> */}
    </div>
  );
};

export default Laporan;
