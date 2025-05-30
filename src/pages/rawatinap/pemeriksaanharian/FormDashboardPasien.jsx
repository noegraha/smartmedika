import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Card,
  List,
  Button,
  Modal,
  Result,
  Timeline,
  Alert,
  Statistic,
  Divider,
} from "antd";
import { FieldTimeOutlined, UserAddOutlined } from "@ant-design/icons";
import { TextLoop } from "react-text-loop-next";
import { GiziAsuhanContext } from "../../penunjang/gizi/context/AsuhanGiziContext";
import { DischargePlanningContext } from "../context/DischargePlanningContext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import dayjs from "dayjs";
import FormGrafikTTV from "./FormGrafikTTV";
import FormEwsGrafik from "./FormGrafikEWS";

const FormDashboardPasien = () => {
  const [visible, setVisible] = useState(false);
  const { ttvLast } = useContext(GiziAsuhanContext);
  const { lamarawat } = useContext(DischargePlanningContext);
  const { curpas } = useContext(PasienContext);

  const onModalSoap = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  return (
    <div>
      <Row gutter={[5, 5]}>
        <Col span={24}>
          <Card
            // title="Pemantauan Terbaru"
            size="small"
            extra={
              <Button type="link" onClick={() => onModalSoap()}>
                ...
              </Button>
            }
            headStyle={{
              fontWeight: "bolder",
              backgroundColor: "lavenderblush",
            }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Row gutter={[5, 5]}>
              <Col span={12}>
                <Alert
                  type="info"
                  showIcon
                  icon={<UserAddOutlined style={{ fontSize: 40 }} />}
                  message={dayjs(ttvLast.jam).format("DD-MM-YYYY HH:mm")}
                  description={
                    <TextLoop mask>
                      <div>
                        <Statistic
                          title="Tensi"
                          value={
                            ttvLast.tekananDarahSistolik +
                            "/" +
                            ttvLast.tekananDarahDiastolik
                          }
                          valueStyle={{ color: "#1890ff", fontSize: 25 }}
                          suffix="mmHg"
                        />
                      </div>
                      <div>
                        <Statistic
                          title="Suhu"
                          value={ttvLast.suhuTubuh}
                          valueStyle={{ color: "#1890ff", fontSize: 25 }}
                          suffix="°C"
                        />
                      </div>
                      <div>
                        <Statistic
                          title="Nadi"
                          value={ttvLast.frekuensiNadi}
                          valueStyle={{ color: "#1890ff", fontSize: 25 }}
                          suffix="Kali/Mnt"
                        />
                      </div>
                      <div>
                        <Statistic
                          title="Nafas"
                          value={ttvLast.frekuensiNafas}
                          valueStyle={{ color: "#1890ff", fontSize: 25 }}
                          suffix="Kali/Mnt"
                        />
                      </div>
                      <div>
                        <Statistic
                          title="Oksigen"
                          value={ttvLast.saturasiOksigen}
                          valueStyle={{ color: "#1890ff", fontSize: 25 }}
                          suffix="Kali/Mnt"
                        />
                      </div>
                      <div>
                        <Statistic
                          title="Tinggi Badan"
                          value={ttvLast.tinggiBadan}
                          valueStyle={{ color: "#1890ff", fontSize: 25 }}
                          suffix="Cm"
                        />
                      </div>
                      <div>
                        <Statistic
                          title="Berat Badan"
                          value={ttvLast.beratBadan}
                          valueStyle={{ color: "#1890ff", fontSize: 25 }}
                          suffix="Kg"
                        />
                      </div>
                    </TextLoop>
                  }
                />
              </Col>
              <Col span={12}>
                <Alert
                  type="warning"
                  showIcon
                  icon={<FieldTimeOutlined style={{ fontSize: 40 }} />}
                  message="Discharge 
                  Planning"
                  description={
                    <TextLoop mask>
                      <div>
                        <Statistic
                          title="Tanggal Masuk"
                          value={curpas.tanggalMasuk}
                          // precision={2}
                          valueStyle={{ color: "#faad14", fontSize: 25 }}
                          //prefix={<ArrowUpOutlined />}
                          // suffix="mmHg"
                        />
                      </div>
                      <div>
                        <Statistic
                          title="Lama Rawat"
                          value={lamarawat}
                          // precision={2}
                          valueStyle={{ color: "#faad14", fontSize: 25 }}
                          //prefix={<ArrowUpOutlined />}
                          suffix="Hari"
                        />
                      </div>
                      <div>
                        <Statistic
                          title="Sudah Dirawat"
                          value={dayjs().diff(
                            dayjs(curpas.tanggalMasuk, "DD-MM-YYYY"),
                            "day"
                          )}
                          // precision={2}
                          valueStyle={{ color: "#faad14", fontSize: 25 }}
                          //prefix={<ArrowUpOutlined />}
                          suffix="Hari"
                        />
                      </div>
                    </TextLoop>
                  }
                />
              </Col>
            </Row>
            <Divider orientation="left">Grafik Tanda Vital Pasien</Divider>
            <FormGrafikTTV />
            <Divider orientation="left">Grafik EWS Pasien</Divider>
            <FormEwsGrafik />
          </Card>
          {/* <Card
            title="Kegiatan"
            size="small"
            extra={
              <Button type="link" onClick={() => onModalSoap()}>
                ...
              </Button>
            }
            headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            {/* <Calendar fullscreen={false} /> */}
          {/* </Card> */}
        </Col>
        {/* <Col span={12}>
          <Card
            title="Jadwal Tindakan"
            size="small"
            extra={
              <Button type="link" onClick={() => onModalSoap()}>
                ...
              </Button>
            }
            headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Timeline mode="left">
              <Timeline.Item label="2015-09-01">
                Pembersihan Jalan Nafas
              </Timeline.Item>
              <Timeline.Item label="2015-09-01 09:12:11">
                Evaluasi
              </Timeline.Item>
              <Timeline.Item>Pemberian Vitamin</Timeline.Item>
              <Timeline.Item label="2015-09-01 09:12:11">
                Pengecekan Tanda Vital
              </Timeline.Item>
            </Timeline>
          </Card>
          <Card
            title="Tindakan Perawatan"
            size="small"
            extra={
              <Button type="link" onClick={() => onModalSoap()}>
                ...
              </Button>
            }
            headStyle={{ fontWeight: "bolder", backgroundColor: "beige" }}
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Row gutter={[2, 2]}>
              <Col span={8}>
                <List
                  size="small"
                  header={<b>Pagi</b>}
                  // footer={<div>Footer</div>}
                  bordered
                  dataSource={data1}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Col>
              <Col span={8}>
                <List
                  size="small"
                  header={<b>Sore</b>}
                  // footer={<div>Footer</div>}
                  bordered
                  dataSource={data1}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Col>
              <Col span={8}>
                <List
                  size="small"
                  header={<b>Malam</b>}
                  // footer={<div>Footer</div>}
                  bordered
                  dataSource={data1}
                  renderItem={(item) => <List.Item>{item}</List.Item>}
                />
              </Col>
            </Row>
          </Card>
        </Col> */}
      </Row>

      <Modal
        title="Basic Modal"
        visible={visible}
        width="1000px"
        footer={null}
        //onOk={handleOk}
        onCancel={handleOk}
      >
        <Result
          status="500"
          //title="ERROR"
          subTitle="Maaf Sedang Bingung!"
          //extra={<Button type="primary">Login Ulang</Button>}
        />
      </Modal>
    </div>
  );
};

export default FormDashboardPasien;
