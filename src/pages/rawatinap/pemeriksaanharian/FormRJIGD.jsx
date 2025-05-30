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

const FormRJIGD = () => {
  const { curpasRI } = useContext(PasienRIContext);
  const { pasienDari, dariIGD, dariRj, setdariIGD, setdariRj } =
    useContext(AnamnesaRIContext);
  const {
    getPrintRm02Kunjungan,
    setloadDelay,
    loadDelay,
    printRm02Kunjungan,
    getPrintPerawatIGD,
    printPerawatIGD,
    setprintPerawatIGD,
    getPrintDokterIGD,
    setprintDokterIGD,
    printDokterIGD,
    pilihWaktu,
    setpilihWaktu,
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
              value={pilihWaktu}
              style={{ width: "100%" }}
              onChange={(e) => {
                setpilihWaktu(e);
                if (e === "1") {
                  getPrintRm02Kunjungan(
                    curpasRI.pasienId,
                    curpasRI.registrasiId
                  );
                  setloadDelay(true);
                } else if (e === "2") {
                  getPrintDokterIGD(curpasRI.registrasiId);

                  setloadDelay(true);
                } else if (e === "3") {
                  getPrintPerawatIGD(curpasRI.registrasiId);
                  setloadDelay(true);
                }
              }}
            >
              {dariRj === false ? (
                <>
                  <Option value="1">RM 02</Option>
                </>
              ) : (
                <>
                  <Option value="2">Catatan Dokter IGD</Option>
                  <Option value="3">Catatan Perawat IGD</Option>
                </>
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          {pilihWaktu === "1" ? (
            <Iframe
              loading={loadDelay}
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printRm02Kunjungan}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          ) : pilihWaktu === "2" ? (
            <Iframe
              loading={loadDelay}
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printDokterIGD}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          ) : pilihWaktu === "3" ? (
            <Iframe
              loading={loadDelay}
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printPerawatIGD}
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

export default FormRJIGD;
