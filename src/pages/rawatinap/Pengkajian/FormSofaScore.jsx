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
import { PengkajianContext } from "../context/PengkajianContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

const FormSofaScore = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    listSofa,
    setlistSofa,
    getSofa,
    insertSofa,
    delSofa,
    pengkajianSofaId,
    setpengkajianSofaId,
    tglSofa,
    settglSofa,
    flagSofa,
    setflagSofa,
    respiratory,
    setrespiratory,
    koagulasi,
    setkoagulasi,
    heparBilirubin,
    setheparBilirubin,
    kardiovaskular,
    setkardiovaskular,
    sistemSarafPusat,
    setsistemSarafPusat,
    renalKeratin,
    setrenalKeratin,
    nilaisofa,
  } = useContext(PengkajianContext);

  const datatsofa = {
    pengkajianSofaId: pengkajianSofaId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglSofa).format("YYYY-MM-DDTHH:mm"),
    flagAssesment: flagSofa,
    respiratory: respiratory,
    koagulasi: koagulasi,
    heparBilirubin: heparBilirubin,
    kardiovaskular: kardiovaskular,
    sistemSarafPusat: sistemSarafPusat,
    renalKeratin: renalKeratin,
    nilai: nilaisofa,
    keterangan: null,
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
    },
    // {
    //   title: "Keterangan",
    //   dataIndex: "keterangan",
    //   key: "keterangan",
    //   render: (text, record) => {
    //     const nilaiNihss = record.nilai; // Sesuaikan jika nilaitotal disimpan di data lain
    //     const style =
    //       nilaiNihss < 5
    //         ? { color: "black", backgroundColor: "yellowgreen", width: "80%" }
    //         : nilaiNihss >= 5 && nilaiNihss <= 14
    //         ? { color: "black", backgroundColor: "yellow", width: "80%" }
    //         : nilaiNihss >= 15 && nilaiNihss <= 24
    //         ? { color: "black", backgroundColor: "orange", width: "80%" }
    //         : nilaiNihss >= 25
    //         ? { color: "black", backgroundColor: "red", width: "80%" }
    //         : { color: "", backgroundColor: "", width: "80%" };

    //     return (
    //       <div
    //         style={{
    //           ...style,
    //           padding: "4px",
    //           textAlign: "center",
    //           borderRadius: "4px",
    //         }}
    //       >
    //         {text}
    //       </div>
    //     );
    //   },
    // },
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
              delSofa(record.pengkajianNIHSSId, record.registrasiId);
            }}
            onCancel={(e) => {}}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button size="small" type="primary" danger>
              Hapus
            </Button>
          </Popconfirm>

          <Button
            size="small"
            style={{ color: "white", backgroundColor: "green" }}
            onClick={() => {
              setpengkajianSofaId(record.pengkajianSofaId);
              settglSofa(dayjs(record.tanggal));
              setrespiratory(record.respiratory);
              setkoagulasi(record.koagulasi);
              setheparBilirubin(record.heparBilirubin);
              setkardiovaskular(record.kardiovaskular);
              setsistemSarafPusat(record.sistemSarafPusat);
              setrenalKeratin(record.renalKeratin);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          {pengkajianSofaId === 0 ? (
            <></>
          ) : (
            <>
              <Alert
                message="Anda Akana MElakukan Pengeditan Data"
                type="info"
                showIcon
              />
            </>
          )}
          <Row>
            <Col span={24}>
              <Form.Item
                {...formItemLayout}
                label="Tanggal Pengkajian"
                style={{ marginBottom: 5 }}
              >
                <DatePicker
                  value={tglSofa}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                  onChange={(date) => {
                    settglSofa(date);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Respirasi/PaO2/FIO2"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={respiratory} // Use the appropriate state variable here
                  style={{
                    width: "100%",
                  }}
                  onChange={(value) => {
                    setrespiratory(value);
                  }}
                >
                  <Option value={0}>≥ 400 mm Hg (53.3 kPa)</Option>
                  <Option value={1}> &lt; 400 mm Hg (53.3 kPa)</Option>
                  <Option value={2}> &lt; 300 mm Hg (40 kPa)</Option>
                  <Option value={3}>
                    {" "}
                    &lt; 200 mm Hg (26.7 kPa) with respiratory support
                  </Option>
                  <Option value={4}>
                    {" "}
                    &lt; 100 mm Hg (13.3 kPa) with respiratory support
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label="Koagulasi/Platelet"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={koagulasi} // Use the appropriate state variable here
                  style={{
                    width: "100%",
                  }}
                  onChange={(value) => {
                    setkoagulasi(value);
                  }}
                >
                  <Option value={0}>≥ 150 × 103/mcL (≥ 150 × 109/L)</Option>
                  <Option value={1}>
                    {" "}
                    &lt; 150 × 103/mcL (&lt; 150 × 109/L)
                  </Option>
                  <Option value={2}>
                    {" "}
                    &lt; 100 × 103/mcL (&lt; 100 × 109/L)
                  </Option>
                  <Option value={3}>
                    {" "}
                    &lt; 50 × 103/mcL (&lt; 50 × 109/L)
                  </Option>
                  <Option value={4}>
                    {" "}
                    &lt; 20 × 103/mcL (&lt; 20 × 109/L)
                  </Option>
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label="Hepar,Bilirubin"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={heparBilirubin} // Use the appropriate state variable here
                  style={{
                    width: "100%",
                  }}
                  onChange={(value) => {
                    setheparBilirubin(value);
                  }}
                >
                  <Option value={0}> &lt; 1.2 mg/dL (20 micromole/L)</Option>
                  <Option value={1}>1.2–1.9 mg/dL (20–32 micromole/L)</Option>
                  <Option value={2}>2.0–5.9 mg/dL (33–101 micromole/L)</Option>
                  <Option value={3}>
                    6.0–11.9 mg/dL (102–204 micromole/L)
                  </Option>
                  <Option value={4}>&gt; 12.0 mg/dL (204 micromole/L)</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Kardiovaskular"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={kardiovaskular} // Use the appropriate state variable here
                  style={{
                    width: "100%",
                  }}
                  onChange={(value) => {
                    setkardiovaskular(value);
                  }}
                >
                  <Option value={0}>MAP &ge; 70mmHg </Option>
                  <Option value={1}>MAP &lt; 70mmHg</Option>
                  <Option value={2}>
                    Dopamin &lt; 5 atau Dobutamin (dosis berapapun)
                  </Option>
                  <Option value={3}>
                    Dopamin 5,1 – 15 atau Epinefrin ≤0,1 atau norepinefrin ≤0,1
                    µg/kg/menitg
                  </Option>
                  <Option value={4}>
                    Dopamin &gt; 15 atau Epinefrin &gt; 0,1 atau norepinefin
                    &gt; 0,1 µg/ kg/menit
                  </Option>{" "}
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Sistem Saraf Pusat/GCS"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={sistemSarafPusat} // Use the appropriate state variable here
                  style={{
                    width: "100%",
                  }}
                  onChange={(value) => {
                    setsistemSarafPusat(value);
                  }}
                >
                  <Option value={0}>15 points</Option>
                  <Option value={1}>13–14 points</Option>
                  <Option value={2}>10–12 points</Option>
                  <Option value={3}>6–9 points</Option>
                  <Option value={4}>&lt; 6 points</Option>
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label="Renal/Creatinine/Urine Output"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={renalKeratin} // Use the appropriate state variable here
                  style={{
                    width: "100%",
                  }}
                  onChange={(value) => {
                    setrenalKeratin(value);
                  }}
                >
                  <Option value={0}>&lt; 1.2 mg/dL </Option>
                  <Option value={1}>1.2-1.9 mg/dL </Option>
                  <Option value={2}>2.0-3.4 mg/dL </Option>
                  <Option value={3}>3.5-4.9 mg/dL &lt;500</Option>
                  <Option value={4}>&gt; 5.0 mg/dL &lt;200</Option>
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayout}
                label="Keterangan"
                style={{ marginBottom: 5 }}
              >
                <Input.Group compact>
                  <Input
                    type="text"
                    placeholder="..."
                    readOnly
                    value={nilaisofa}
                    style={{ width: "20%" }}
                  />
                  <Input
                    type="text"
                    placeholder="..."
                    disabled
                    // value={ketLatchScore}
                    // style={stylekuLatchScore}
                    readOnly
                    style={{ width: "80%" }}
                  />
                </Input.Group>
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  // type="primary"
                  onClick={() => {
                    setpengkajianSofaId(0);
                    settglSofa(dayjs());
                    setrespiratory("");
                    setkoagulasi("");
                    setheparBilirubin("");
                    setkardiovaskular("");
                    setsistemSarafPusat("");
                    setrenalKeratin("");
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    insertSofa(datatsofa);
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
            dataSource={listSofa}
            rowKey="pengkajianNIHSSId"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormSofaScore;
