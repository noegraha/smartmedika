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

const LaporanPak = () => {
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
      <Card
        title="Kegiatan Perawat"
        headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <FormKegiatanPegawai />
      </Card>
    </div>
  );
};

export default LaporanPak;
