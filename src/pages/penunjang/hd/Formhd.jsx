import React, { useContext, useState } from "react";
import {
  Tabs,
  Spin,
  Card,
  Form,
  Row,
  Col,
  DatePicker,
  InputNumber,
  Radio,
  Input,
  Button,
  Typography,
} from "antd";
import FormAssessmentHD from "./form/FormAssessmentHD";
import FormDiagnosaKeperawatan from "./form/FormDiagnosaKeperawatan";
import FormIntervensiKeperawatan from "./form/FormIntervensiKeperawatan";
import FormIntruksiMedik from "./form/FormIntruksiMedik";
import FormIntraHD from "./form/FormIntraHD";
import FormPostHD from "./form/FormPostHD";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import { PelayananHDContext } from "./context/PelayananHDContext";
import { LoadingOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { ChatContext } from "../../chat/Chatcontext";
import { PasienHDContext } from "./context/PasienHDContext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import PelayananHD from "./komponen/PelayananHD";
const { Text } = Typography;

const { TabPane } = Tabs;
const formItemLayout = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};
const formItemLayout2 = {
  labelCol: { span: 12 },
  wrapperCol: { span: 12 },
};

const FormHD = () => {
  const {
    dialisisHeaderId,
    headerHD,
    tanggalHD,
    dialisisKe,
    alergiId,
    riwAllObat,
    riwAllObatKet,
    verifHD,
    noMesin,
    dialsiser,
  } = useContext(PelayananHDContext);
  const { curpas } = useContext(PasienHDContext);
  const { namauser } = useContext(LoginContext);
  const { ip, pc } = useContext(PasienContext);
  const { loading } = useContext(ChatContext);

  const callback = (key) => {
    // setTabkey(key);
  };

  return (
    <div>
      {/* <Spin
                size="large"
                indicator={<LoadingOutlined style={{ fontSize: 30 }} spin />}
                spinning={loading}
                tip="Sedang Memuat.."
            > */}
      <Card>
        <Form>
          <Row gutter={[16, 16]} style={{ marginBottom: 0 }}>
            <Col span={6}>
              <Form.Item
                {...formItemLayout}
                label="Tanggal"
                style={{ marginBottom: 2 }}
              >
                <Input value={dayjs(headerHD.tanggal).format("DD-MM-YYYY")} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Hemodialisis Ke"
                style={{ marginBottom: 0 }}
              >
                <Input value={dialisisKe} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayout2}
                label="Riwayat Alergi Obat"
                style={{ marginBottom: 2 }}
              >
                {riwAllObat === true ? (
                  <div>
                    <Input value={"Ya"} style={{ marginBottom: 2 }} />
                    <Input value={riwAllObatKet} />
                  </div>
                ) : (
                  <Input value={"Tidak"} />
                )}
              </Form.Item>
              <Form.Item
                {...formItemLayout2}
                label="Telah Setuju Dilakukan Tindakan HD"
                style={{ marginBottom: 0 }}
              >
                {verifHD === true ? (
                  <Input value={"Ya"} />
                ) : (
                  <Input value={"Tidak"} />
                )}
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...formItemLayout}
                label="Mesin Nomor"
                style={{ marginBottom: 2 }}
              >
                <Input value={noMesin} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Dialsiser"
                style={{ marginBottom: 0 }}
              >
                <Input value={dialsiser} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <PelayananHD />
            </Col>
          </Row>
        </Form>
      </Card>

      <Tabs
        // tabPosition={mode === true ? "top" : "left"}
        type="card"
        // activeKey={tabkey}
        onChange={callback}
        size="small"
      >
        <TabPane tab="Pre HD" key="1">
          <Tabs>
            <TabPane tab="Assessmen Hemodialisis" key="sub1">
              <FormAssessmentHD />
            </TabPane>
            <TabPane tab="Diagnosa Keperawatan" key="sub2">
              <FormDiagnosaKeperawatan />
            </TabPane>
            <TabPane tab="Intervensi Keperawatan" key="sub3">
              <FormIntervensiKeperawatan />
            </TabPane>
            <TabPane tab="Intruksi Medik" key="sub4">
              <FormIntruksiMedik />
            </TabPane>
          </Tabs>
        </TabPane>
        <TabPane tab="Intra HD" key="2">
          <FormIntraHD />
        </TabPane>
        <TabPane tab="Post HD" key="3">
          <FormPostHD />
        </TabPane>
      </Tabs>
      {/* </Spin> */}
    </div>
  );
};

export default FormHD;
