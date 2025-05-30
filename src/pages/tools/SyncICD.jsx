import { Button, Card, message, Select, Table, Input } from "antd";
import axios from "axios";
import React, { useState } from "react";
const { Option } = Select;
const { Search } = Input;
const SyncICD = () => {
  const [ruang, setRuang] = useState([]);
  const [icd, setICD] = useState([]);
  const [cek, setCek] = useState([]);
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");

  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const syncicd = () => {
    axios
      .get(`${apiku}/MstUnitIcd/SyncMstUnitICD`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil Synchronise Master ICD !");
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Sync!");
      });
  };
  const getRuang = () => {
    axios
      .get(`${apiku}/MstRuang/LookupKlinik/%20/1/200`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuang(res.data.result);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };
  const getICD = (ruang) => {
    axios
      .get(`${apiku}/MstUnitIcd/Lookup/${ruang}/1/10000`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setICD(res.data.result);
          setCek(res.data.result);
        } else {
          message.warning(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Gagal Ambil!");
      });
  };
  return (
    <div>
      <Card
        size="small"
        title="Sync Master ICD"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Button type="primary" onClick={() => syncicd()}>
          Sync Master ICD ke SmartMedika
        </Button>
        <br />
        *Pastikan Petugas RM sudah memasukkan ICD yang dimaksud ke sistem.
        <br />
        Ruang :{" "}
        <Select
          onFocus={() => getRuang()}
          style={{
            width: 300,
          }}
          onChange={(e) => getICD(e)}
        >
          {ruang.map((d) => (
            <Option key={d.ruangId}>{d.ruangId + " - " + d.deskripsi}</Option>
          ))}
        </Select>
        <Search
          placeholder="Cari Kode ICD"
          onSearch={(e) =>
            setCek(
              icd.filter((d) => d.diagnosisId.toLowerCase().indexOf(e) > -1)
            )
          }
          enterButton
        />
        <Table
          dataSource={cek}
          columns={[
            {
              title: "Kode ICD",
              dataIndex: "diagnosisId",
              key: "id",
            },
            {
              title: "Deskripsi",
              dataIndex: "diagnosisDesk",
              key: "deskripsi",
            },
          ]}
          size="small"
        />
      </Card>
    </div>
  );
};

export default SyncICD;
