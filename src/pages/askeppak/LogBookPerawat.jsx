import React, { useContext, useState } from "react";
import {
  Descriptions,
  Col,
  Input,
  Card,
  Button,
  Table,
  Empty,
  DatePicker,
  Row,
  Space,
  Form,
} from "antd";
import Iframe from "react-iframe";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import { LogBookAskepContext } from "../master/context/masteraskep/LogBookAskepContext";
import { MasterPegawaiContext } from "../master/context/masterpegawai/MasterPegawaiContext";
import { LoginContext } from "../rawatjalan/context";
import FormKegiatanPegawai from "./FormKegiatanPegawai";
const { Search } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const LogBookPerawat = () => {
  const [idCariPegawai, setidCariPegawaii] = useState("%20");
  const [bulan, setbulan] = useState("");
  const { signOut, namauser } = useContext(LoginContext);
  const dateFormat = "MM-YYYY";
  const {
    listLogBook,
    getListLogBook,
    loading,
    setloading,
    getLogBok,
    logboklist,
    setlogboklist,
  } = useContext(LogBookAskepContext);
  const { pegawaiDetail } = useContext(MasterPegawaiContext);
  let page = 1;
  return (
    <div>
      <Row gutter={[2, 2]}>
        <Col span={20}>
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

        <Col span={3}>
          <Space>
            <Button
              type="primary"
              onClick={() => {
                setloading(true);
                getLogBok(namauser.toUpperCase().trim(), bulan);
                console.log(namauser.toUpperCase().trim(), bulan);
              }}
            >
              Lihat
            </Button>
          </Space>
        </Col>
      </Row>
      <Iframe
        loading={loading}
        onLoad={() => {
          setloading(false);
        }}
        url={logboklist}
        height="650px"
        width="100%"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
      />
    </div>
  );
};

export default LogBookPerawat;
