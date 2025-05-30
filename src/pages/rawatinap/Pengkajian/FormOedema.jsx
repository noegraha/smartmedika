import React, { useContext, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Slider,
  Space,
  Row,
  Col,
  DatePicker,
  Table,
  Alert,
  Popconfirm,
} from "antd";
import oedema from "../../../assets/img/oedema.png";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";
import { PengkajianContext } from "../context/PengkajianContext";

const formItemLayout2 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormOedema = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    listOedema,
    setlistOedema,
    getOedema,
    insertOedema,
    delOedema,
    pengkajianOedemaId,
    setpengkajianOedemaId,
    tglOedema,
    settglOedema,
    flagOedema,
    setflagOedema,
    nilaiOedema,
    setnilaiOedema,
    ketOedema,
  } = useContext(PengkajianContext);

  const marks1 = {
    1: "Derajat 1",
    2: "Derajat 2",
    3: "Derajat 3",
    4: "Derajat 4",
  };

  const dataoedema = {
    pengkajianOedemaId: pengkajianOedemaId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglOedema).format("YYYY-MM-DDTHH:mm"),
    flagAssesment: flagOedema,
    nilai: nilaiOedema,
    keterangan: ketOedema,
    userId: namauser,
    hapus: false,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientIp: ip,
  };
  const columns = [
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      render: (text) => dayjs(text).format("DD-MM-YYYY HH:mm"), // Memformat tanggal
    },
    {
      title: "Nilai",
      dataIndex: "nilai",
      key: "nilai",
      render: (nilai) =>
        nilai === 1
          ? "Derajat 1"
          : nilai === 2
          ? "Derajat 2"
          : nilai === 3
          ? "Derajat 3"
          : nilai === 4
          ? "Derajat 4"
          : "",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      render: (text, record) => {
        const nilaiOdema = record.nilai; // Sesuaikan jika nilaitotal disimpan di data lain
        const style =
          nilaiOdema === 1
            ? { color: "black", backgroundColor: "green", width: "80%" }
            : nilaiOdema === 2
            ? { color: "black", backgroundColor: "lightgreen", width: "80%" }
            : nilaiOdema === 3
            ? { color: "black", backgroundColor: "yellowgreen", width: "80%" }
            : nilaiOdema === 4
            ? { color: "black", backgroundColor: "yellow", width: "80%" }
            : { color: "", backgroundColor: "", width: "80%" };
        return (
          <div
            style={{
              ...style,
              padding: "4px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Anda Yakin Dihapus ?"
            onConfirm={(e) => {
              delOedema(record.pengkajianOedemaId, record.registrasiId);
            }}
            onCancel={(e) => {}}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button size="small" type="primary" danger>
              Hapus
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <Row>
            <Col span={24}>
              <Form.Item
                {...formItemLayout2}
                label="Tanggal Pengkajian"
                style={{ marginBottom: 5 }}
              >
                <DatePicker
                  value={tglOedema}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                  onChange={(date) => {
                    settglOedema(date);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout2}
                label="Skala"
                style={{ marginBottom: 5 }}
              >
                <img src={oedema} style={{ width: "100%" }} />

                <Slider
                  min={1}
                  max={4}
                  marks={marks1}
                  value={nilaiOedema}
                  onChange={(e) => {
                    setnilaiOedema(e);
                  }}
                  style={{
                    width: "90%",
                  }}
                />
              </Form.Item>

              <Form.Item
                {...formItemLayout2}
                label="Keterangan"
                style={{ marginBottom: 5 }}
              >
                <Input
                  style={
                    nilaiOedema === 1
                      ? {
                          color: "black",
                          backgroundColor: "green",
                          width: "80%",
                        }
                      : nilaiOedema === 2
                      ? {
                          color: "black",
                          backgroundColor: "lightgreen",
                          width: "80%",
                        }
                      : nilaiOedema === 3
                      ? {
                          color: "black",
                          backgroundColor: "yellowgreen",
                          width: "80%",
                        }
                      : nilaiOedema === 4
                      ? {
                          color: "black",
                          backgroundColor: "yellow",
                          width: "80%",
                        }
                      : { color: "", backgroundColor: "", width: "80%" }
                  }
                  type="text"
                  placeholder="..."
                  value={ketOedema}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  // type="primary"
                  onClick={() => {
                    settglOedema(dayjs());
                    setpengkajianOedemaId(0);
                    setnilaiOedema("");
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    insertOedema(dataoedema);
                  }}
                >
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Table
            columns={columns}
            dataSource={listOedema}
            rowKey="pengkajianNIHSSId"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormOedema;
