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
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import { PengkajianContext } from "../context/PengkajianContext";
import dayjs from "dayjs";

const formItemLayout2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const FormFungsiOtot = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    listOtot,
    setlistOtot,
    getOtot,
    insertOtot,
    delOtot,
    pengkajianOtotId,
    setpengkajianOtotId,
    tglOtot,
    settglOtot,
    flagOtot,
    setflagOtot,
    nilaiOtot,
    setnilaiOtot,
    ketOtot,
  } = useContext(PengkajianContext);
  const marks1 = {
    0: "0%",
    1: "10%",
    2: "25%",
    3: "50%",
    4: "75%",
    5: "100%",
  };

  const dataotot = {
    pengkajianOtotId: pengkajianOtotId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglOtot).format("YYYY-MM-DDTHH:mm"),
    flagAssesment: flagOtot,
    nilai: nilaiOtot,
    keterangan: ketOtot,
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
        nilai === 0
          ? "0%"
          : nilai === 1
          ? "10%"
          : nilai === 2
          ? "25%"
          : nilai === 3
          ? "50%"
          : nilai === 4
          ? "75%"
          : nilai === 5
          ? "100%"
          : "",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      render: (text, record) => {
        const nilaiOto = record.nilai; // Sesuaikan jika nilaitotal disimpan di data lain
        const style =
          nilaiOto === 0
            ? { color: "black", backgroundColor: "red", width: "80%" }
            : nilaiOto === 1
            ? { color: "black", backgroundColor: "orange", width: "80%" }
            : nilaiOto === 2
            ? { color: "black", backgroundColor: "yellow", width: "80%" }
            : nilaiOto === 3
            ? { color: "black", backgroundColor: "yellowgreen", width: "80%" }
            : nilaiOto === 4
            ? { color: "black", backgroundColor: "lightgreen", width: "80%" }
            : nilaiOto === 5
            ? { color: "black", backgroundColor: "green", width: "80%" }
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
              delOtot(record.pengkajianNIHSSId, record.registrasiId);
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
                  value={tglOtot}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                  onChange={(date) => {
                    settglOtot(date);
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
                <Slider
                  min={0}
                  max={5}
                  marks={marks1}
                  value={nilaiOtot}
                  onChange={(e) => {
                    setnilaiOtot(e);
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
                    nilaiOtot === 0
                      ? { color: "black", backgroundColor: "red", width: "90%" }
                      : nilaiOtot === 1
                      ? {
                          color: "black",
                          backgroundColor: "orange",
                          width: "90%",
                        }
                      : nilaiOtot === 2
                      ? {
                          color: "black",
                          backgroundColor: "yellow",
                          width: "90%",
                        }
                      : nilaiOtot === 3
                      ? {
                          color: "black",
                          backgroundColor: "yellowgreen",
                          width: "90%",
                        }
                      : nilaiOtot === 4
                      ? {
                          color: "black",
                          backgroundColor: "lightgreen",
                          width: "90%",
                        }
                      : nilaiOtot === 5
                      ? {
                          color: "black",
                          backgroundColor: "green",
                          width: "90%",
                        }
                      : { color: "", backgroundColor: "", width: "90%" }
                  }
                  type="text"
                  placeholder="..."
                  value={ketOtot}
                  readOnly
                />
              </Form.Item>
            </Col>
            <Col span={[24]} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  // type="primary"
                  onClick={() => {
                    settglOtot(dayjs());
                    setpengkajianOtotId(0);
                    setnilaiOtot("");
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    insertOtot(dataotot);
                  }}
                >
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          {" "}
          <Table
            columns={columns}
            dataSource={listOtot}
            rowKey="pengkajianNIHSSId"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormFungsiOtot;
