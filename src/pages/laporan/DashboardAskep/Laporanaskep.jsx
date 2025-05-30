import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Divider,
  Row,
  Form,
  DatePicker,
  Button,
  Select,
  Space,
  Spin,
  Statistic,
  message,
  Modal,
  Table,
  Empty,
} from "antd";
// import Column from 'antd/lib/table/Column';
import "../../App.css";
import Column from "antd/lib/table/Column";
import dayjs from "dayjs";
import { useContext } from "react";
import GrafikAskep from "../../home/GrafikAskep";
import GrafiTtlAssesment from "../../home/GrafikTtlAssesment";
// import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import DetailPasienMutasi from "./DetailPasienMutasi";
import { LaporanAskepContext } from "../Context/LaporanAskepContext";
import { DetailPasienTotal } from "./DetailPasienTotal";
import DetailPasienAssesment from "./DetailPasienAssesment";
import DetailPasienAsuhan from "./DetailPasienAsuhan";
import DetailPasienTelatAssesment from "./DetailPasienTelatAssesment";
import DetailPasienBelumAssesment from "./DetailPasienBelumAssesment";
import { MasterContext } from "../../master/context/MasterContext";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { Option } = Select;
const { RangePicker } = DatePicker;

const Laporanaskep = () => {
  const {
    spin,
    setspin,
    getDetailPasienMutasi,
    jmlPasienMutasi,
    getGrafikAssesment,
    jmlPasienTotal,
    jmlBelumAssesment,
    getTotalAssesment,
    ruangRi,
    getRuangRi,
    jmlAssement,
    jmlAsuhan,
    jmlPasien,
    jmlTelatAssesment,
    getTotlDxTgl,
    getTotlDxThn,
    getTotlDxbln,
    setjmlDxAskep,
    jmlDxAskep,
    getInputanUser,
    jmlInputUSer,
    setjmlInputUSer,
  } = useContext(LaporanAskepContext);
  const { ruangAll, setruangAll, getRuangMedis } = useContext(MasterContext);
  const [pilihPencarian, setpilihPencarian] = useState("");
  const [bulanPencarian, setbulanPencarian] = useState("");
  const [tahunPencarian, settahunPencarian] = useState("");
  const [tglPencarian1, settglPencarian1] = useState("");
  const [tglPencarian2, settglPencarian2] = useState("");
  const [ruangpencarian, setruangpencarian] = useState("");
  const [bulanPencarian2, setbulanPencarian2] = useState("");

  const [modal, setModal] = useState(false);
  const [kodeDetail, setkodeDetail] = useState("");
  const [bulan, setbulan] = useState("");
  const [kodeRuang, setkodeRuang] = useState("");
  const [kodePilih, setkodePilih] = useState("2");
  const [bulanAssesment, setbulanAssesment] = useState(dayjs());
  const [thnAssesment, setthnAssesment] = useState(dayjs());
  const [tglPilih, settglPilih] = useState(dayjs());
  const tanggal = dayjs().format("DD-MM-YYYY");
  const dateFormat = "MM-YYYY";
  const dateFormatFull = "DD-MM-YYYY";

  const [time, setTime] = useState(getTime());

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
  const [page, setPage] = useState(1);

  return (
    <div className="backcontent">
      <Spin spinning={spin} tip="Mohon Tunggu...">
        <Row>
          <Col span={24}>
            <Card
              title="Jumlah Diagnosa Asuhan Keperawatn Per-Periode Waktu"
              size="small"
              style={{ margin: 5 }}
              extra={
                <div>
                  Tanggal : {tanggal} <Divider type="vertical" /> Waktu : {time}
                </div>
              }
            >
              <Row gutter={[20, 2]}>
                <Col span={8}>
                  <Form.Item
                    {...formItemLayout}
                    style={{ width: "100%", marginBottom: 5 }}
                    label="Pilih Pencarian"
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Pilih Periode..."
                      optionFilterProp="children"
                      onChange={(e) => {
                        setpilihPencarian(e);
                      }}
                      // defaultValue="1"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option key="1">Tanggal</Option>
                      <Option key="2">Bulan</Option>
                      <Option key="3">Tahun</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {pilihPencarian === "1" ? (
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout}
                      style={{ width: "100%", marginBottom: 5 }}
                      label="Pilih Tanggal"
                    >
                      <RangePicker
                        onChange={(e, f) => {
                          settglPencarian1(f[0]);
                          settglPencarian2(f[1]);
                        }}
                      />
                    </Form.Item>
                  </Col>
                ) : pilihPencarian === "2" ? (
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout}
                      style={{ width: "100%", marginBottom: 5 }}
                      label="Pilih Bulan"
                    >
                      <DatePicker
                        value={bulanPencarian}
                        style={{ width: "100%" }}
                        placeholder="..."
                        picker="month"
                        format={dateFormat}
                        onChange={(e) => {
                          setbulanPencarian(e);
                        }}
                      />
                    </Form.Item>
                  </Col>
                ) : pilihPencarian === "3" ? (
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout}
                      style={{ width: "100%", marginBottom: 5 }}
                      label="Pilih Bulan"
                    >
                      <DatePicker
                        value={tahunPencarian}
                        style={{ width: "100%" }}
                        placeholder="..."
                        picker="year"
                        format="YYYY"
                        onChange={(e) => {
                          settahunPencarian(e);
                        }}
                      />
                    </Form.Item>
                  </Col>
                ) : (
                  <div></div>
                )}
                <Col span={4}>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        setspin(true);
                        pilihPencarian === "1"
                          ? getTotlDxTgl(
                              dayjs(tglPencarian1).format("YYYY-MM-DD"),
                              dayjs(tglPencarian2).format("YYYY-MM-DD")
                            )
                          : pilihPencarian === "2"
                          ? getTotlDxbln(
                              dayjs(bulanPencarian).format("MM"),
                              dayjs(bulanPencarian).format("YYYY")
                            )
                          : pilihPencarian === "3"
                          ? getTotlDxThn(dayjs(tahunPencarian).format("YYYY"))
                          : setpilihPencarian("");
                      }}
                    >
                      Lihat
                    </Button>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    locale={{
                      emptyText: <Empty description="Data Pasien Kosong" />,
                    }}
                    pagination={{
                      pageSize: 50,
                    }}
                    scroll={{
                      y: 240,
                    }}
                    dataSource={jmlDxAskep}
                    size="small"
                    rowKey="reg"
                  >
                    <Column
                      title="No"
                      key="reg"
                      width="10px"
                      render={(text, record, index) => (
                        <span>{(page - 1) * 10 + index + 1}</span>
                      )}
                    />
                    <Column
                      width="20px"
                      title="Kode"
                      key="reg"
                      render={(jmlDxAskep) => (
                        <span>{jmlDxAskep.DiagnosaId}</span>
                      )}
                    />
                    <Column
                      width="50px"
                      title="Deskripsi"
                      key="reg"
                      render={(jmlDxAskep) => (
                        <span>{jmlDxAskep.Deskripsi}</span>
                      )}
                    />
                    <Column
                      width="20px"
                      title="Jumlah"
                      key="reg"
                      render={(jmlDxAskep) => <span>{jmlDxAskep.Jumlah}</span>}
                    />
                  </Table>
                </Col>
              </Row>
            </Card>
          </Col>
          <Col span={24}>
            <Card
              title="Jumlah Tindakan Yang Di Lakukan Perawat Per-Periode Bulan"
              size="small"
              style={{ margin: 5 }}
            >
              <Row gutter={[20, 2]}>
                <Col span={8}>
                  <Form.Item
                    {...formItemLayout}
                    style={{ width: "100%", marginBottom: 5 }}
                    label="Pilih Ruang"
                  >
                    <Select
                      onFocus={() => {
                        getRuangMedis();
                      }}
                      dataSource={ruangAll}
                      showSearch
                      value={ruangpencarian}
                      style={{ width: "100%" }}
                      // placeholder="Pilih Pemeriksaan"
                      optionFilterProp="children"
                      onChange={(e) => setruangpencarian(e)}
                      // filterOption={(input, option) =>
                      //   option.props.children
                      //     .toLowerCase()
                      //     .indexOf(input.toLowerCase()) >= 0
                      // }
                    >
                      {ruangAll.map((p) => (
                        <Option key={p.ruangId}>{p.deskripsi}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    {...formItemLayout}
                    style={{ width: "100%", marginBottom: 5 }}
                    label="Pilih Bulan"
                  >
                    <DatePicker
                      value={bulanPencarian2}
                      style={{ width: "100%" }}
                      placeholder="..."
                      picker="month"
                      format={dateFormat}
                      onChange={(e) => {
                        setbulanPencarian2(e);
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        setspin(true);
                        getInputanUser(
                          ruangpencarian,
                          dayjs(bulanPencarian2).format("MM"),
                          dayjs(bulanPencarian2).format("YYYY")
                        );
                        console.log(
                          ruangpencarian,
                          dayjs(bulanPencarian2).format("MM"),
                          dayjs(bulanPencarian2).format("YYYY")
                        );
                      }}
                    >
                      Lihat
                    </Button>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <Table
                    locale={{
                      emptyText: <Empty description="Data Pasien Kosong" />,
                    }}
                    pagination={{
                      pageSize: 50,
                    }}
                    scroll={{
                      y: 240,
                    }}
                    dataSource={jmlInputUSer}
                    size="small"
                    rowKey="reg"
                  >
                    <Column
                      // width="80px"
                      title="Nama Perawat"
                      key="reg"
                      render={(jmlInputUSer) => (
                        <span>{jmlInputUSer.NAMADOKTER}</span>
                      )}
                    />
                    <Column
                      // width="5px"
                      title="Input Assesment"
                      key="reg"
                      render={(jmlInputUSer) => (
                        <span>{jmlInputUSer.Assesment}</span>
                      )}
                    />
                    <Column
                      // width="5px"
                      title="Input Diagnosa"
                      key="reg"
                      render={(jmlInputUSer) => (
                        <span>{jmlInputUSer.Diagnosa}</span>
                      )}
                    />
                    <Column
                      // width="5px"
                      title="Input Implementasi"
                      key="reg"
                      render={(jmlInputUSer) => (
                        <span>{jmlInputUSer.Implementasi}</span>
                      )}
                    />
                    <Column
                      // width="5px"
                      title="Input Evaluasi"
                      key="reg"
                      render={(jmlInputUSer) => (
                        <span>{jmlInputUSer.Evaluasi}</span>
                      )}
                    />
                  </Table>
                </Col>
              </Row>
            </Card>
          </Col>
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
            >
              <Row gutter={[2, 2]}>
                <Col span={10}>
                  {/* <Button disabled={jamsekarang < jaminput ? false : true}>
                  {jaminput, '-', jamsekarang, '-', umur}
                </Button> */}
                  <Form.Item
                    {...formItemLayout}
                    style={{ width: "100%", marginBottom: 5 }}
                    label="Pilih Ruang"
                  >
                    <Select
                      dataSource={ruangRi}
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Pilih ruang..."
                      optionFilterProp="children"
                      onChange={(e) => {
                        setkodeRuang(e);
                      }}
                      onFocus={() => {
                        getRuangRi();
                      }}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {ruangRi.map((d) => (
                        <Option key={d.ruangId}>{d.deskripsi}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={10}>
                  <Form.Item
                    {...formItemLayout}
                    style={{ width: "100%", marginBottom: 5 }}
                    label="Pilih Bulan"
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      placeholder="..."
                      picker="month"
                      format={dateFormat}
                      onChange={(e) => {
                        setbulan(dayjs(e).format("MM-YYYY"));
                      }}
                    />
                  </Form.Item>
                </Col>

                <Col span={4}>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang/Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          getGrafikAssesment(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop()
                          );
                        }
                        // kodeRuang === '' ? message.warning('Silahkan Pilih Ruang Terlebih Dahulu!') :
                        //   bulan === '' ? message.warning('Silahkan Pilih BUlan Terlebih Dahulu!') :
                        //     getGrafikAssesment(kodeRuang, bulan.split('-').shift(), bulan.split('-').pop());
                      }}
                    >
                      Lihat
                    </Button>
                    {/* <Button
                    onClick={() => {
                      getGrafikAssesment('%20');
                    }}
                  >
                    Lihat Semua
                </Button> */}
                  </Space>
                </Col>
              </Row>
            </Card>

            {/* <Card
            size="small"
            style={{ margin: 5 }}
          > */}
            <Row
              gutter={[8, 8]}
              style={{ margin: 5, justifyContent: "center" }}
            >
              <Col span={3} style={{ textAlign: "center" }}>
                <Card
                  size="small"
                  title="Total Pasien"
                  headStyle={{
                    fontWeight: "bolder",
                    backgroundColor: "#efa4d5",
                    fontSize: "15px",
                  }}
                  extra={
                    <Button
                      type="link"
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("1");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "1"
                          );
                        }
                      }}
                    >
                      detail
                    </Button>
                  }
                  style={{ marginTop: 1 }}
                  actions={[
                    <p
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("1");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "1"
                          );
                        }
                      }}
                    >
                      *Jumlah Pasien Ruangan + Pasien Mutasi
                    </p>,
                  ]}
                >
                  <Statistic
                    valueStyle={{ fontSize: "40px", border: "2px" }}
                    value={jmlPasienTotal}
                    // precision={5}
                  />
                </Card>
              </Col>
              <Col span={3} style={{ textAlign: "center" }}>
                <Card
                  height="191px"
                  size="small"
                  title="Total Pasien"
                  headStyle={{
                    fontWeight: "bolder",
                    backgroundColor: "#e141e0",
                    fontSize: "15px",
                  }}
                  extra={
                    <Button
                      type="link"
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("1");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "1"
                          );
                        }
                      }}
                    >
                      detail
                    </Button>
                  }
                  style={{ marginTop: 1 }}
                  actions={[
                    <p
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("1");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "1"
                          );
                        }
                      }}
                    >
                      *Jumlah Pasien Ruangan
                    </p>,
                  ]}
                >
                  <Statistic
                    valueStyle={{ fontSize: "40px", border: "2px" }}
                    value={jmlPasien}
                    // precision={5}
                  />
                </Card>
              </Col>
              <Col span={3} style={{ textAlign: "center" }}>
                <Card
                  height="191px"
                  headStyle={{
                    fontWeight: "bolder",
                    backgroundColor: "springgreen",
                    fontSize: "15px",
                  }}
                  size="small"
                  title="Pasien Diassesment"
                  extra={
                    <Button
                      type="link"
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("2");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "2"
                          );
                        }
                      }}
                    >
                      detail
                    </Button>
                  }
                  style={{ marginTop: 1 }}
                  actions={[
                    <p
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("2");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "2"
                          );
                        }
                      }}
                    >
                      *Jumlah Pasien Di Assesment
                    </p>,
                  ]}
                >
                  <Statistic
                    valueStyle={{ fontSize: "40px", border: "2px" }}
                    value={jmlAssement}
                    // precision={5}
                  />
                </Card>
              </Col>
              <Col span={3} style={{ textAlign: "center" }}>
                <Card
                  height="191px"
                  headStyle={{
                    fontWeight: "bolder",
                    backgroundColor: "#59b0ec",
                    fontSize: "15px",
                  }}
                  size="small"
                  title="Pasien Diasuhan"
                  extra={
                    <Button
                      type="link"
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("3");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "3"
                          );
                        }
                      }}
                    >
                      detail
                    </Button>
                  }
                  style={{ marginTop: 1 }}
                  actions={[
                    <p
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("3");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "3"
                          );
                        }
                      }}
                    >
                      *Jumlah Pasien Di Asuhan
                    </p>,
                  ]}
                >
                  <Statistic
                    valueStyle={{ fontSize: "40px", border: "2px" }}
                    value={jmlAsuhan}
                    // precision={}
                  />
                </Card>
              </Col>
              <Col span={3} style={{ textAlign: "center" }}>
                <Card
                  height="191px"
                  headStyle={{
                    fontWeight: "bolder",
                    backgroundColor: "#ff2e2d",
                    fontSize: "15px",
                  }}
                  size="small"
                  title="Terlambat Diassesment"
                  extra={
                    <Button
                      type="link"
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("4");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "4"
                          );
                        }
                      }}
                    >
                      detail
                    </Button>
                  }
                  style={{ marginTop: 1 }}
                  actions={[
                    <p
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("4");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "4"
                          );
                        }
                      }}
                    >
                      *Jumlah Pasien Terlambat Diassesment
                    </p>,
                  ]}
                >
                  <Statistic
                    valueStyle={{ fontSize: "40px", border: "2px" }}
                    value={jmlTelatAssesment}
                    // precision={5}
                  />
                </Card>
              </Col>
              <Col span={3} style={{ textAlign: "center" }}>
                <Card
                  height="191px"
                  headStyle={{
                    fontWeight: "bolder",
                    backgroundColor: "#6bfbfa",
                    fontSize: "15px",
                  }}
                  size="small"
                  title="Belum Diassesment"
                  extra={
                    <Button
                      type="link"
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("5");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "5"
                          );
                        }
                      }}
                    >
                      detail
                    </Button>
                  }
                  style={{ marginTop: 1 }}
                  actions={[
                    <p
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("5");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "5"
                          );
                        }
                      }}
                    >
                      *Jumlah Pasien Belum Diassesment
                    </p>,
                  ]}
                >
                  <Statistic
                    valueStyle={{ fontSize: "40px", border: "2px" }}
                    value={jmlBelumAssesment}
                    // precision={5}
                  />
                </Card>
              </Col>
              <Col span={3} style={{ textAlign: "center" }}>
                <Card
                  height="191px"
                  headStyle={{
                    fontWeight: "bolder",
                    backgroundColor: "#fded40",
                    fontSize: "15px",
                  }}
                  extra={
                    <a
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("6");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "6"
                          );
                        }
                      }}
                    >
                      detail
                    </a>
                  }
                  size="small"
                  title="Pasien Mutasi"
                  // extra={<a href="#">More</a>}
                  style={{ marginTop: 1 }}
                  actions={[
                    <Button
                      type="link"
                      onClick={() => {
                        if (kodeRuang === "" || bulan === "") {
                          message.warning(
                            "Silahkan Pilih Ruang / Bulan Terlebih Dahulu!"
                          );
                        } else {
                          setspin(true);
                          setkodeDetail("6");
                          setModal(true);
                          getDetailPasienMutasi(
                            kodeRuang,
                            bulan.split("-").shift(),
                            bulan.split("-").pop(),
                            "6"
                          );
                        }
                      }}
                    >
                      *Jumlah Pasien Mutasi
                    </Button>,
                  ]}
                >
                  <Statistic
                    valueStyle={{ fontSize: "40px", border: "2px" }}
                    value={jmlPasienMutasi}
                    // precision={5}
                  />
                </Card>
              </Col>
            </Row>
            {/* </Card> */}
            <Card size="small" style={{ margin: 5 }} title="Statistik Askep">
              <Row>
                <Col span={24}>
                  <GrafikAskep />
                </Col>
              </Row>
            </Card>

            <Card
              size="small"
              style={{ margin: 5 }}
              title="Jumlah Pasien Yang Telah Dilakukan Assesment"
            >
              <Row gutter={[20, 2]}>
                <Col span={8}>
                  <Form.Item
                    {...formItemLayout}
                    style={{ width: "100%", marginBottom: 5 }}
                    label="Pilih Tanggal"
                  >
                    <Select
                      showSearch
                      style={{ width: "100%" }}
                      placeholder="Pilih ruang..."
                      optionFilterProp="children"
                      onChange={(e) => {
                        setkodePilih(e);
                        setbulanAssesment(dayjs());
                        setthnAssesment(dayjs());
                        settglPilih(dayjs());
                      }}
                      defaultValue="2"
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      <Option key="1">Tanggal</Option>
                      <Option key="2">Bulan</Option>
                      <Option key="3">Tahun</Option>
                      <Option key="4">Total</Option>
                    </Select>
                  </Form.Item>
                </Col>
                {kodePilih === "1" ? (
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout}
                      style={{ width: "100%", marginBottom: 5 }}
                      label="Pilih Tanggal"
                    >
                      <DatePicker
                        value={tglPilih}
                        style={{ width: "100%" }}
                        placeholder="..."
                        format={dateFormatFull}
                        onChange={(e) => {
                          settglPilih(e);
                        }}
                      />
                    </Form.Item>
                  </Col>
                ) : kodePilih === "2" ? (
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout}
                      style={{ width: "100%", marginBottom: 5 }}
                      label="Pilih Bulan"
                    >
                      <DatePicker
                        value={bulanAssesment}
                        style={{ width: "100%" }}
                        placeholder="..."
                        picker="month"
                        format={dateFormat}
                        onChange={(e) => {
                          setbulanAssesment(e);
                        }}
                      />
                    </Form.Item>
                  </Col>
                ) : kodePilih === "3" ? (
                  <Col span={8}>
                    <Form.Item
                      {...formItemLayout}
                      style={{ width: "100%", marginBottom: 5 }}
                      label="Pilih Bulan"
                    >
                      <DatePicker
                        value={thnAssesment}
                        style={{ width: "100%" }}
                        placeholder="..."
                        picker="year"
                        format="YYYY"
                        onChange={(e) => {
                          setthnAssesment(e);
                        }}
                      />
                    </Form.Item>
                  </Col>
                ) : (
                  <div></div>
                )}
                <Col span={4}>
                  <Space>
                    <Button
                      type="primary"
                      onClick={() => {
                        setspin(true);
                        kodePilih === "1"
                          ? getTotalAssesment(
                              dayjs(tglPilih).format("YYYY-MM-DD"),
                              kodePilih
                            )
                          : kodePilih === "2"
                          ? getTotalAssesment(
                              dayjs(bulanAssesment).format("YYYY-MM"),
                              kodePilih
                            )
                          : kodePilih === "3"
                          ? getTotalAssesment(
                              dayjs(thnAssesment).format("YYYY"),
                              kodePilih
                            )
                          : getTotalAssesment("%20", kodePilih);
                      }}
                    >
                      Lihat
                    </Button>
                  </Space>
                </Col>
              </Row>
              <Row>
                <Col span={24}>
                  <GrafiTtlAssesment />
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal
          visible={modal}
          footer={null}
          onCancel={() => {
            setModal(false);
          }}
          width="1000px"
        >
          <Spin spinning={spin} tip="Mohon Tunggu...">
            {kodeDetail === "1" ? (
              <DetailPasienTotal />
            ) : kodeDetail === "2" ? (
              <DetailPasienAssesment />
            ) : kodeDetail === "3" ? (
              <DetailPasienAsuhan />
            ) : kodeDetail === "4" ? (
              <DetailPasienTelatAssesment />
            ) : kodeDetail === "5" ? (
              <DetailPasienBelumAssesment />
            ) : (
              <DetailPasienMutasi />
            )}
          </Spin>
        </Modal>
      </Spin>
    </div>
  );
};

export default Laporanaskep;
