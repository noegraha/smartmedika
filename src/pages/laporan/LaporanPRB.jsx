import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Card,
  message,
  Space,
  DatePicker,
  Table,
  Radio,
  Row,
  Col,
  Image,
} from "antd";
const { RangePicker } = DatePicker;
const LaporanPRB = () => {
  const apiku = sessionStorage.getItem("api");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const [list, setList] = useState([]);
  const [listTahun, setListTahun] = useState([]);
  const [dateAwal, setDateAwal] = useState(null);
  const [dateAkhir, setDateAkhir] = useState(null);
  const [year, setYear] = useState(null);
  const [yeardate, setYearDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [menu, setMenu] = useState(false);

  const listPRB = () => {
    setLoading(true);
    axios
      .get(
        `${apiku}/BridgeVClaim/GetPrb/TglMulai/${dateAwal}/TglAkhir/${dateAkhir}`,
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          setList(res.data.result.prb.list);
          setLoading(false);
        } else {
          message.warning("Belum ada data.");
          console.log(res.data.result);
          setLoading(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        console.log(err);
        setLoading(false);
      });
  };

  const listPRBTahun = () => {
    setLoading(true);
    axios
      .get(`${apiku}/BridgeVClaim/GetPrb/Tahun/${year}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setListTahun(res.data.result);
          setLoading(false);
        } else {
          message.warning("Belum ada data.");
          setListTahun([]);
          console.log(res.data.result);
          setLoading(false);
        }
      })
      .catch((err) => {
        message.error("Gagal Mengambil Data!");
        setListTahun([]);
        console.log(err);
        setLoading(false);
      });
  };

  const columns = [
    {
      title: "No. SEP",
      dataIndex: "noSEP",
      key: "sep",
    },
    {
      title: "No. SRB",
      dataIndex: "noSRB",
      key: "srb",
    },
    {
      title: "Tgl. SRB",
      dataIndex: "tglSRB",
      key: "tglsrb",
      sorter: (a, b) => a.tglSRB.localeCompare(b.tglSRB),
    },
    {
      title: "Nama Pasien",
      dataIndex: ["peserta", "nama"],
      key: "nama",
    },
    {
      title: "DPJP",
      dataIndex: ["dpjp", "nama"],
      key: "dpjp",
      sorter: (a, b) => a.dpjp.nama.localeCompare(b.dpjp.nama),
    },
    {
      title: "Program",
      dataIndex: ["programPRB", "nama"],
      key: "programPRB",
      sorter: (a, b) => a.programPRB.nama.localeCompare(b.programPRB.nama),
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "ket",
    },
    {
      title: "Saran",
      dataIndex: "saran",
      key: "saran",
      fixed: "right",
      render(text, record) {
        return {
          props: {
            style: {
              background: "#fff1b8",
              cursor: "default",
            },
          },
          children: text,
        };
      },
    },
  ];
  return (
    <div className="backcontent">
      <Card
        size="small"
        title="Laporan Data PRB"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        loading={loading}
      >
        <Row>
          <Col span={12}>
            <Radio.Group onChange={(e) => setMenu(e.target.value)} value={menu}>
              <Radio value={true}>Tahun</Radio>
              <Radio value={false}>Tanggal</Radio>
            </Radio.Group>
            {menu ? (
              <Space>
                <DatePicker
                  onChange={(e, f) => {
                    setYearDate(e);
                    setYear(f);
                  }}
                  picker="year"
                  value={yeardate}
                />
                <Button type="primary" onClick={() => listPRBTahun()}>
                  Ambil Data
                </Button>{" "}
                TOTAL PASIEN : {listTahun.length}
              </Space>
            ) : (
              <Space>
                <RangePicker
                  onChange={(e, f) => {
                    setDateAwal(f[0]);
                    setDateAkhir(f[1]);
                  }}
                />
                <Button type="primary" onClick={() => listPRB()}>
                  Ambil Data
                </Button>{" "}
                TOTAL PASIEN : {list.length}
              </Space>
            )}
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Image
              preview={false}
              width={150}
              src="https://upload.wikimedia.org/wikipedia/commons/b/b4/BPJS_Kesehatan_logo.svg"
            />
          </Col>
        </Row>
        {menu ? (
          <div>
            <Table
              showSorterTooltip={false}
              dataSource={listTahun}
              columns={columns}
              size="small"
              scroll={{
                x: "max-content",
              }}
            />
          </div>
        ) : (
          <Table
            showSorterTooltip={false}
            dataSource={list}
            columns={columns}
            size="small"
            scroll={{
              x: "max-content",
            }}
          />
        )}
      </Card>
    </div>
  );
};

export default LaporanPRB;
