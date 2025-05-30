import { Button, Card, DatePicker, Select, Space, Table } from "antd";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
const { Option } = Select;
const RekapDiagnosis = () => {
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };

  const [loading, setLoading] = useState(false);
  const [datarekap, setDatarekap] = useState([]);
  const [ruang, setRuang] = useState([]);
  const [ruangpilih, setRuangPilih] = useState([]);
  const [jenis, setJenis] = useState("1");
  const [tanggal, setTanggal] = useState(dayjs().format("YYYY-MM-DD"));

  const getData = (ruangid, tanggalrekap, jenisid) => {
    setLoading(true);
    axios
      .get(
        `${apiku}/EmrDiagnosis/ReadTop/${ruangid}/${jenisid}/${tanggalrekap}`,
        options
      )
      .then((res) => {
        // Handle the API response and update the state
        setDatarekap(res.data.result);
        console.log(res.data.result);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  const masterRuang = () => {
    axios
      .get(`${apiku}/MstRuang/Lookup/%20/2/1/100`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setRuang(res.data.result);
        } else {
          setRuang([]);
          console.log(res.data);
        }
      })
      .catch((err) => {
        setRuang([]);
        console.log(err);
      });
  };
  const columnreport = [
    {
      title: "No",
      render: (text, record, index) => <span>{index + 1}</span>,
      width: 30,
    },
    {
      title: "Diagnosis Id",
      dataIndex: "DiagnosisId",
      width: 70,
    },
    {
      title: "Deskripsi",
      dataIndex: "Deskripsi",
    },
    {
      title: "Jenis Diagnosis",
      dataIndex: "JenisDiagnosisId",
      width: 70,
      render: (text, record, index) => (
        <span>{text === 1 ? "Primer" : "Sekunder"}</span>
      ),
    },
    {
      title: "Jumlah",
      dataIndex: "DiagnosisCount",
      width: 70,
    },
  ];
  return (
    <div>
      <Card
        title="Rekap Diagnosa Rawat Jalan"
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
      >
        <Space>
          <Select
            onFocus={() => masterRuang()}
            autoFocus={true}
            value={ruangpilih}
            dataSource={ruang}
            showSearch
            style={{ width: 300 }}
            placeholder="Pilih ruang..."
            optionFilterProp="children"
            onChange={(e) => {
              setRuangPilih(e);
            }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            {ruang.map((d) => (
              <Option
                key={d.ruangId}
                className={
                  d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""
                }
              >
                {d.deskripsi}
              </Option>
            ))}
          </Select>
          <DatePicker
            placeholder="Tanggal"
            onChange={(date, dateString) => {
              setTanggal(dayjs(dateString).format("YYYY-MM-DD"));
            }}
          />
          <Select
            value={jenis}
            showSearch
            placeholder="Pilih Jenis..."
            optionFilterProp="children"
            onChange={(e) => {
              setJenis(e);
            }}
            filterOption={(input, option) =>
              option.props.children
                .toLowerCase()
                .indexOf(input.toLowerCase()) >= 0
            }
          >
            <Option key={"1"}>Primer</Option>
            <Option key={"2"}>Sekunder</Option>
          </Select>
          <Button
            onClick={() => getData(ruangpilih, tanggal, jenis)}
            type="primary"
          >
            Ambil
          </Button>
        </Space>
        <Table
          loading={loading}
          style={{ width: "70%" }}
          bordered
          size="small"
          pagination={false}
          scroll={{ y: "50vh" }}
          dataSource={datarekap}
          columns={columnreport}
        />
      </Card>
    </div>
  );
};

export default RekapDiagnosis;
