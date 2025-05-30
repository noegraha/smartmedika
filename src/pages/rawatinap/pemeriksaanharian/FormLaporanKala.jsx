import React, { useContext, useState } from "react";
import {
  Button,
  Modal,
  Select,
  Row,
  Col,
  Typography,
  Form,
  Table,
  Empty,
  message,
  Spin,
} from "antd";
import Iframe from "react-iframe";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { AnamnesaRIContext } from "../context/AnamnesaRIContext";
const { Column } = Table;
const { Option } = Select;
const { Text } = Typography;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const FormLaporanKala = () => {
  const { curpasRI } = useContext(PasienRIContext);
  const {
    getPrintKala,
    printLapKala,
    setprintLapKala,
    loadDelay,
    setloadDelay,
    jenisKala,
    setjenisKala,
  } = useContext(PrintOutContext);
  return (
    <div>
      {" "}
      <Row gutter={[5, 5]}>
        <Col span={24}>
          <Form.Item
            {...formItemLayout}
            label={<div style={{ fontWeight: "bolder" }}>Jenis Dokumen</div>}
            style={{ marginBottom: 5 }}
          >
            <Select
              placeholder="Silahkan Pilih Asal Kunjungan...."
              value={jenisKala}
              style={{ width: "100%" }}
              onChange={(e) => {
                e === "1"
                  ? getPrintKala("KALA1", curpasRI.registrasiId)
                  : e === "2"
                  ? getPrintKala("KALA2", curpasRI.registrasiId)
                  : e === "4"
                  ? getPrintKala("KALA4", curpasRI.registrasiId)
                  : getPrintKala("");
                setjenisKala(e);
              }}
            >
              <Option value="1">Kala 1</Option>
              <Option value="2">Kala 2 dan 3</Option>
              <Option value="4">Kala 4</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {jenisKala === "1" ? (
            <Iframe
              loading={loadDelay}
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printLapKala}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          ) : jenisKala === "2" ? (
            <Iframe
              loading={loadDelay}
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printLapKala}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          ) : jenisKala === "4" ? (
            <Iframe
              loading={loadDelay}
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printLapKala}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          ) : (
            <Iframe
              loading={loadDelay}
              onLoad={() => {
                setloadDelay(false);
              }}
              url={""}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          )}
        </Col>
      </Row>
    </div>
  );
};

export default FormLaporanKala;
