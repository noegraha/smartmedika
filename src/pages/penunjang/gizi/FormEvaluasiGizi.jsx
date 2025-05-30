import React, { Fragment, useState, useContext } from "react";
import {
  PageHeader,
  Row,
  Col,
  Table,
  Button,
  DatePicker,
  message,
  Popconfirm,
  Form,
  Layout,
  Modal,
  Divider,
  Card,
  Empty,
  Space,
  Select,
  Input,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import Column from "antd/lib/table/Column";
import {
  CloseCircleTwoTone,
  EditTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { GiziAsuhanContext } from "./context/AsuhanGiziContext";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "../../rawatinap/context/PasienRIContext";
import dayjs from "dayjs";

const formItemLayoutFull = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const { Option } = Select;

const EvaluasiGizi = () => {
  const {
    dokter,
    detailpasien,
    insertEvaluasi,
    evaluasi,
    deleteevaluasi,
    setTanggaleva,
    setAssesmenteva,
    setImplementasieva,
    resetformevaluasi,
    detailevaluasi,
    setMonitoringeva,
    setDiagnosaeva,
    tanggaleva,
    diagnosaeva,
    monitoringeva,
    implementasieva,
    assesmenteva,
    setevaluasiGiziId,
    evaluasiGiziId,
    dokterGizi,
    setdokterGizi,
    listDokterGizi,
    setlistDokterGizi,
    listEvaluasi,
    getmstdokterGizi,
  } = useContext(GiziAsuhanContext);
  const { namauser } = useContext(LoginContext);
  const { ruang, curpasRI } = useContext(PasienRIContext);
  const [hidden, sethidden] = useState(true);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const kodeDokter = sessionStorage.getItem("pegawai");

  const dataevaluasi = {
    evaluasiGiziId: evaluasiGiziId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tgl: dayjs(tanggaleva).format("YYYY-MM-DDTHH:mm"),
    assesment: assesmenteva,
    diagnosa: diagnosaeva,
    implementasi: implementasieva,
    monitoring: monitoringeva,
    ahliGizi: kodeDokter,
    userId: namauser,
    status: true,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientIp: ip,
  };

  const [form] = Form.useForm();

  const dateFormat = "DD-MM-YYYY HH:mm";
  let page = 1;
  return (
    <div>
      <Card
        title="Evaluasi Gizi Pasien"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={
          <Button
            icon={<PlusOutlined />}
            size="small"
            type="primary"
            onClick={() => {
              // setformEvaluasi(true);
              sethidden(false);
              setTanggaleva(dayjs());
              setDiagnosaeva("");
              setImplementasieva("");
              setAssesmenteva("");
              setMonitoringeva("");
              setevaluasiGiziId(0);
            }}
          >
            Tambah Evaluasi
          </Button>
        }
      >
        <Card size="small" hidden={hidden}>
          <Form>
            {/* <Input type='text' value={evaluasiGiziId} /> */}

            <Row gutter={[16, 16]}>
              <Col span={24}>
                <Form.Item
                  {...formItemLayoutFull}
                  label="Waktu"
                  style={{ marginBottom: 5 }}
                >
                  <DatePicker
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setTanggaleva(e);
                    }}
                    format={dateFormat}
                    value={tanggaleva}
                    showTime
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayoutFull}
                  label="Assesment"
                  style={{ marginBottom: 5 }}
                >
                  <TextArea
                    value={assesmenteva}
                    onChange={(e) => setAssesmenteva(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayoutFull}
                  label="Diagnosa"
                  style={{ marginBottom: 5 }}
                >
                  <TextArea
                    value={diagnosaeva}
                    onChange={(e) => setDiagnosaeva(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayoutFull}
                  label="Implementasi"
                  style={{ marginBottom: 5 }}
                >
                  <TextArea
                    value={implementasieva}
                    onChange={(e) => setImplementasieva(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayoutFull}
                  label="Monitoring"
                  style={{ marginBottom: 5 }}
                >
                  <TextArea
                    value={monitoringeva}
                    onChange={(e) => setMonitoringeva(e.target.value)}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: "right" }}>
                <Space>
                  <Button
                    onClick={() => {
                      sethidden(true);
                      setTanggaleva(dayjs());
                      setDiagnosaeva("");
                      setImplementasieva("");
                      setAssesmenteva("");
                      setMonitoringeva("");
                      setevaluasiGiziId(0);
                    }}
                  >
                    Kembali
                  </Button>
                  <Button
                    onClick={() => {
                      // sethidden(true);
                      setTanggaleva(dayjs());
                      setDiagnosaeva("");
                      setImplementasieva("");
                      setAssesmenteva("");
                      setMonitoringeva("");
                      setevaluasiGiziId(0);
                    }}
                  >
                    Reset
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      console.log(dataevaluasi);
                      insertEvaluasi(dataevaluasi);
                    }}
                  >
                    Simpan
                  </Button>
                </Space>
              </Col>
            </Row>
          </Form>
          <Divider></Divider>
        </Card>

        <Table
          dataSource={listEvaluasi}
          size="small"
          rowKey="reg"
          scroll={{ y: 470 }}
          bordered
        >
          <Column
            title="No"
            key="reg"
            className="tabeltabel2"
            width="5%"
            render={(text, record, index) => (
              <span>{page - 1 + index + 1}</span>
            )}
          />
          <Column
            title="Waktu"
            key="waktu"
            render={(listEvaluasi) => (
              <span className="fontkecil">
                {dayjs(listEvaluasi.Tgl).format("DD-MM-YYYY HH:mm")}
              </span>
            )}
          />
          <Column
            title="Assesment"
            key="waktu"
            render={(listEvaluasi) => (
              <span className="fontkecil">{listEvaluasi.Assesment}</span>
            )}
          />
          <Column
            title="Diagnosa"
            key="waktu"
            render={(listEvaluasi) => (
              <span className="fontkecil">{listEvaluasi.Diagnosa}</span>
            )}
          />
          <Column
            title="Implementasi"
            key="waktu"
            render={(listEvaluasi) => (
              <span className="fontkecil">{listEvaluasi.Implementasi}</span>
            )}
          />
          <Column
            title="Monitoring"
            key="waktu"
            render={(listEvaluasi) => (
              <span className="fontkecil">{listEvaluasi.Monitoring}</span>
            )}
          />
          <Column
            title="Aksi"
            key="waktu"
            render={(listEvaluasi) => (
              <span className="fontkecil">
                <Space>
                  <Popconfirm
                    title="Apakah data akan dihapus?"
                    onConfirm={() =>
                      deleteevaluasi(
                        listEvaluasi.EvaluasiGiziId,
                        curpasRI.registrasiId
                      )
                    }
                    onCancel={(e) => {}}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button size="small" danger>
                      Hapus
                    </Button>
                  </Popconfirm>
                  <Button
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => {
                      sethidden(false);
                      setTanggaleva(dayjs(listEvaluasi.Tgl));
                      setdokterGizi(listEvaluasi.AhliGizi);
                      setAssesmenteva(listEvaluasi.Assesment);
                      setDiagnosaeva(listEvaluasi.Diagnosa);
                      setImplementasieva(listEvaluasi.Implementasi);
                      setMonitoringeva(listEvaluasi.Monitoring);
                      setevaluasiGiziId(listEvaluasi.EvaluasiGiziId);
                    }}
                    size="small"
                  >
                    {" "}
                    Edit{" "}
                  </Button>
                </Space>
              </span>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default EvaluasiGizi;
