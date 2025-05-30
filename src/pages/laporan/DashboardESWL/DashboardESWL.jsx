import React, { useEffect, useState, useContext } from "react";
import "../../App.css";
import { Card, Col, Divider, Row, Statistic } from "antd";
import dayjs from "dayjs";
import GrafikESWL from "../../home/GrafikESWL";
import { LaporanESWLContext } from "../Context/LaporanESWLContext";

const DashboardESWL = () => {
  const { statistikeswl, pasieneswl } = useContext(LaporanESWLContext);
  const [time, setTime] = useState(getTime());
  const tanggal = dayjs().format("DD-MM-YYYY");

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
    <div className="backcontenty">
      <Row>
        <Col span={24}>
          <Card
            size="small"
            style={{ margin: 5 }}
            title="Dashboard ESWL"
            extra={
              <div>
                <p>
                  Tanggal : {tanggal} <Divider type="vertical" /> Waktu : {time}
                </p>
              </div>
            }
          ></Card>
          <Row gutter={[8, 8]} style={{ margin: 5, justifyContent: "center" }}>
            <Col span={6} style={{ textAlign: "center" }}>
              <Card
                size="small"
                title="Total Pasien Eswl"
                headStyle={{
                  fontWeight: "bolder",
                  backgroundColor: "#efa4d5",
                  fontSize: "15px",
                }}
                // extra={
                //   <a
                //     onClick={() => {
                //       if (kodeRuang === "" || bulan === "") {
                //         message.warning(
                //           "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                //         );
                //       } else {
                //         setspin(true);
                //         setkodeDetail("1");
                //         setModal(true);
                //         getDetailPasienMutasi(
                //           kodeRuang,
                //           bulan.split("-").shift(),
                //           bulan.split("-").pop(),
                //           "1"
                //         );
                //       }
                //     }}
                //   >
                //     detail
                //   </a>
                // }
                style={{ marginTop: 1 }}
                // actions={[
                //   <p
                //     onClick={() => {
                //       if (kodeRuang === "" || bulan === "") {
                //         message.warning(
                //           "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                //         );
                //       } else {
                //         setspin(true);
                //         setkodeDetail("1");
                //         setModal(true);
                //         getDetailPasienMutasi(
                //           kodeRuang,
                //           bulan.split("-").shift(),
                //           bulan.split("-").pop(),
                //           "1"
                //         );
                //       }
                //     }}
                //   >
                //     *Jumlah Pasien Ruangan + Pasien Mutasi
                //   </p>,
                // ]}
              >
                <Statistic
                  valueStyle={{ fontSize: "40px", border: "2px" }}
                  value={statistikeswl.TOTALPASIENESWL}
                  // precision={5}
                />
              </Card>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <Card
                size="small"
                title="Total Dari Rawat Jalan"
                headStyle={{
                  fontWeight: "bolder",
                  backgroundColor: "#e141e0",
                  fontSize: "15px",
                }}
                // extra={
                //   <a
                //     onClick={() => {
                //       if (kodeRuang === "" || bulan === "") {
                //         message.warning(
                //           "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                //         );
                //       } else {
                //         setspin(true);
                //         setkodeDetail("1");
                //         setModal(true);
                //         getDetailPasienMutasi(
                //           kodeRuang,
                //           bulan.split("-").shift(),
                //           bulan.split("-").pop(),
                //           "1"
                //         );
                //       }
                //     }}
                //   >
                //     detail
                //   </a>
                // }
                style={{ marginTop: 1 }}
                // actions={[
                //   <p
                //     onClick={() => {
                //       if (kodeRuang === "" || bulan === "") {
                //         message.warning(
                //           "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                //         );
                //       } else {
                //         setspin(true);
                //         setkodeDetail("1");
                //         setModal(true);
                //         getDetailPasienMutasi(
                //           kodeRuang,
                //           bulan.split("-").shift(),
                //           bulan.split("-").pop(),
                //           "1"
                //         );
                //       }
                //     }}
                //   >
                //     *Jumlah Pasien Ruangan + Pasien Mutasi
                //   </p>,
                // ]}
              >
                <Statistic
                  valueStyle={{ fontSize: "40px", border: "2px" }}
                  value={statistikeswl.RAWATJALAN}
                  // precision={5}
                />
              </Card>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <Card
                size="small"
                title="Total Dari Rawat Inap"
                headStyle={{
                  fontWeight: "bolder",
                  backgroundColor: "#59b0ec",
                  fontSize: "15px",
                }}
                // extra={
                //   <a
                //     onClick={() => {
                //       if (kodeRuang === "" || bulan === "") {
                //         message.warning(
                //           "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                //         );
                //       } else {
                //         setspin(true);
                //         setkodeDetail("1");
                //         setModal(true);
                //         getDetailPasienMutasi(
                //           kodeRuang,
                //           bulan.split("-").shift(),
                //           bulan.split("-").pop(),
                //           "1"
                //         );
                //       }
                //     }}
                //   >
                //     detail
                //   </a>
                // }
                style={{ marginTop: 1 }}
                // actions={[
                //   <p
                //     onClick={() => {
                //       if (kodeRuang === "" || bulan === "") {
                //         message.warning(
                //           "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                //         );
                //       } else {
                //         setspin(true);
                //         setkodeDetail("1");
                //         setModal(true);
                //         getDetailPasienMutasi(
                //           kodeRuang,
                //           bulan.split("-").shift(),
                //           bulan.split("-").pop(),
                //           "1"
                //         );
                //       }
                //     }}
                //   >
                //     *Jumlah Pasien Ruangan + Pasien Mutasi
                //   </p>,
                // ]}
              >
                <Statistic
                  valueStyle={{ fontSize: "40px", border: "2px" }}
                  value={statistikeswl.RAWATINAP}
                  // precision={5}
                />
              </Card>
            </Col>
            <Col span={6} style={{ textAlign: "center" }}>
              <Card
                size="small"
                title=" Order Pasien ESWL Hari Ini"
                headStyle={{
                  fontWeight: "bolder",
                  backgroundColor: "#6bfbfa",
                  fontSize: "15px",
                }}
                // extra={
                //   <a
                //     onClick={() => {
                //       if (kodeRuang === "" || bulan === "") {
                //         message.warning(
                //           "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                //         );
                //       } else {
                //         setspin(true);
                //         setkodeDetail("1");
                //         setModal(true);
                //         getDetailPasienMutasi(
                //           kodeRuang,
                //           bulan.split("-").shift(),
                //           bulan.split("-").pop(),
                //           "1"
                //         );
                //       }
                //     }}
                //   >
                //     detail
                //   </a>
                // }
                style={{ marginTop: 1 }}
                // actions={[
                //   <p
                //     onClick={() => {
                //       if (kodeRuang === "" || bulan === "") {
                //         message.warning(
                //           "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                //         );
                //       } else {
                //         setspin(true);
                //         setkodeDetail("1");
                //         setModal(true);
                //         getDetailPasienMutasi(
                //           kodeRuang,
                //           bulan.split("-").shift(),
                //           bulan.split("-").pop(),
                //           "1"
                //         );
                //       }
                //     }}
                //   >
                //     *Jumlah Pasien Ruangan + Pasien Mutasi
                //   </p>,
                // ]}
              >
                <Statistic
                  valueStyle={{ fontSize: "40px", border: "2px" }}
                  value={pasieneswl.JumlahPasienHariIni}
                  // precision={5}
                />
              </Card>
            </Col>
          </Row>
          <Card size="small" style={{ margin: 5 }} title="Statistik ESWL">
            <Row gutter={[2, 2]}>
              {/* <Col span={6}> */}
              {/* <Form.Item
                  {...formItemLayout}
                  style={{ width: "100%", marginBottom: 5 }}
                  label="Pilih Bulan"
                > */}
              {/* <DatePicker
                    style={{ width: "100%" }}
                    placeholder="..."
                    picker="month"
                    // format={dateFormat}
                    // onChange={(e) => {
                    //   setbulan(dayjs(e).format("MM-YYYY"));
                    // }}
                  /> */}
              {/* </Form.Item> */}
              {/* </Col> */}

              {/* <Col span={4}>
                <Space>
                  <Button
                    type="primary"
                    // onClick={() => {
                    //   if (kodeRuang === "" || bulan === "") {
                    //     message.warning(
                    //       "Silahkan Pilih Ruang/Bulan Terlebih Dahulu!"
                    //     );
                    //   } else {
                    //     setspin(true);
                    //     getGrafikAssesment(
                    //       kodeRuang,
                    //       bulan.split("-").shift(),
                    //       bulan.split("-").pop()
                    //     );
                    //   }
                    // kodeRuang === '' ? message.warning('Silahkan Pilih Ruang Terlebih Dahulu!') :
                    //   bulan === '' ? message.warning('Silahkan Pilih BUlan Terlebih Dahulu!') :
                    //     getGrafikAssesment(kodeRuang, bulan.split('-').shift(), bulan.split('-').pop());
                    // }}
                  >
                    Lihat
                  </Button> */}
              {/* <Button
                    onClick={() => {
                      getGrafikAssesment('%20');
                    }}
                  >
                    Lihat Semua
                </Button> */}
              {/* </Space>
              </Col> */}
            </Row>
            <Row>
              <Col span={24}>
                {" "}
                <GrafikESWL />{" "}
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default DashboardESWL;
