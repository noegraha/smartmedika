import React, { useState } from "react";
import Pagehead from "../pagehead";
import {
  TimePicker,
  DatePicker,
  Input,
  Card,
  Row,
  Col,
  Radio,
  Form,
  Checkbox,
  Select,
} from "antd";
import dayjs from "dayjs";
import { PelayananContext } from "../context/Pelayanancontext";
const { TextArea } = Input;
const { Option } = Select;

const formItemLayout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
};

const Transferpasien = () => {
  const [indikasi, setIndikasi] = useState("");
  const { indikasi } = useContext(PelayananContext);

  const handleChange = (e) => {
    setIndikasi(e.label);
    console.log(e.label);
  };

  const onChange = (e) => {};

  return (
    <div>
      <Pagehead />
      <Card
        size="small"
        style={{ backgroundColor: "#f9d1b9", alignContent: "center" }}
      >
        Indikasi dirawat :{"  "}
        <Select
          dataSource={indikasi}
          showSearch
          style={{ width: "100%" }}
          placeholder="..."
          optionFilterProp="children"
          onChange={handleChange}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {indikasi.map((d) => (
            <Option key={d.indikasiId}>{d.deskripsi}</Option>
          ))}
        </Select>
      </Card>

      <Row>
        <Col span={16}>
          <Card size="small" title="Petugas Ruangan Tujuan yang dihubungi">
            <Row>
              <Col span={12}>
                Nama : <Input />
              </Col>
              <Col span={6}>
                Tanggal : <br />
                <DatePicker onChange={onChange} />
              </Col>
              <Col span={6}>
                Jam : <br />
                <TimePicker
                  onChange={onChange}
                  defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                />
              </Col>
            </Row>
          </Card>
        </Col>
        <Col span={8}>
          <Card size="small" title="Transfer">
            <Row>
              <Col span={12}>
                Tanggal : <br />
                <DatePicker onChange={onChange} />
              </Col>
              <Col span={12}>
                Jam : <br />
                <TimePicker
                  onChange={onChange}
                  defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                />
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col span={10}>
          <Card size="small" title="Petugas Pendamping">
            <Form.Item
              {...formItemLayout}
              label="Dokter"
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Perawat"
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Pramu Ruang"
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Sopir/Satpam"
              style={{ marginBottom: 0 }}
            >
              <Input />
            </Form.Item>
          </Card>
          <Card size="small">
            <Form.Item
              {...formItemLayout}
              label="Anamnesa"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Diagnosa"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Indikasi Di Rawat"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={2} value={indikasi} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Tindakan"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Terapi/Plan"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={2} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Resiko"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={2} />
            </Form.Item>
          </Card>
        </Col>
        <Col span={14}>
          <Row>
            <Col span={18}>
              <Card size="small" title="Ringkasan Kondisi Umum Pasien">
                <Form
                  name="complex-form"
                  labelCol={{ span: 4 }}
                  wrapperCol={{ span: 20 }}
                >
                  <Form.Item label="TD (mmhg)" style={{ marginBottom: 0 }}>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginBottom: 0,
                      }}
                    >
                      <Input placeholder="Sebelum" />
                    </Form.Item>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 8px 0",
                      }}
                    >
                      <Input placeholder="Sesudah" />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="HR (x/mnt)" style={{ marginBottom: 0 }}>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginBottom: 0,
                      }}
                    >
                      <Input placeholder="Sebelum" />
                    </Form.Item>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="Sesudah" />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="RR (x/mnt)" style={{ marginBottom: 0 }}>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginBottom: 0,
                      }}
                    >
                      <Input placeholder="Sebelum" />
                    </Form.Item>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="Sesudah" />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="Suhu (°C)" style={{ marginBottom: 0 }}>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginBottom: 0,
                      }}
                    >
                      <Input placeholder="Sebelum" />
                    </Form.Item>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="Sesudah" />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="SpO2" style={{ marginBottom: 0 }}>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginBottom: 0,
                      }}
                    >
                      <Input placeholder="Sebelum" />
                    </Form.Item>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <Input placeholder="Sesudah" />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="Pem. Fisik" style={{ marginBottom: 0 }}>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginBottom: 0,
                      }}
                    >
                      <TextArea row={1} />
                    </Form.Item>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <TextArea row={1} />
                    </Form.Item>
                  </Form.Item>
                  <Form.Item label="Lain-lain" style={{ marginBottom: 0 }}>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        marginBottom: 0,
                      }}
                    >
                      <TextArea row={1} />
                    </Form.Item>
                    <Form.Item
                      style={{
                        display: "inline-block",
                        width: "calc(50% - 8px)",
                        margin: "0 8px",
                      }}
                    >
                      <TextArea row={1} />
                    </Form.Item>
                  </Form.Item>
                </Form>
              </Card>
            </Col>
            <Col span={6}>
              <Card size="small" title="Kategori Pasien">
                <Radio.Group>
                  <Radio value={1}>Level 0</Radio>
                  <Radio value={2}>Level 1</Radio>
                  <Radio value={3}>Level 2</Radio>
                  <Radio value={4}>Level 3</Radio>
                </Radio.Group>
              </Card>
              <Card size="small" title="Kualifikasi">
                <Checkbox.Group style={{ width: "100%" }}>
                  <Checkbox value="A">ACLS</Checkbox>
                  <br />
                  <Checkbox value="B">ATLS</Checkbox>
                  <br />
                  <Checkbox value="C">BT-CLS/PPGD</Checkbox>
                  <br />
                  <Checkbox value="D">BLS/BHD</Checkbox>
                  <br />
                  <Checkbox value="E">APN</Checkbox>
                </Checkbox.Group>
              </Card>
            </Col>
          </Row>
          <Card size="small" title="Yang Turut Diserahkan">
            <Form.Item
              {...formItemLayout}
              label="Data"
              style={{ marginBottom: 0 }}
            >
              <Checkbox>Rekam Medik Pasien</Checkbox>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Obat"
              style={{ marginBottom: 0 }}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Checkbox value="OA">Obat Oral</Checkbox>
                <Checkbox value="OB">Obat Injeksi</Checkbox>
                <Checkbox value="OC">Obat Pasien yang dibawa</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Hasil Pemeriksaan Penunjang"
              style={{ marginBottom: 0 }}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Checkbox value="HA">Laboratorium</Checkbox>
                <Checkbox value="HB">MRI</Checkbox>
                <Checkbox value="HC">CT-Scan</Checkbox>
                <Checkbox value="HD">USG</Checkbox>
                <Checkbox value="HE">Rontgen</Checkbox>
                <Checkbox value="HF">Lainnya</Checkbox>
              </Checkbox.Group>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Barang Pasien"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={1} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Lain-lain"
              style={{ marginBottom: 0 }}
            >
              <TextArea rows={1} />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Transportasi yang digunakan"
              style={{ marginBottom: 0 }}
            >
              <Checkbox.Group style={{ width: "100%" }}>
                <Checkbox value="TA">Kursi roda</Checkbox>
                <Checkbox value="TB">Bed Strechter</Checkbox>
                <Checkbox value="TC">Brankart</Checkbox>
              </Checkbox.Group>
            </Form.Item>
          </Card>
        </Col>
      </Row>
      <Card size="small" title="Nama dan Tanda Tangan Petugas">
        <Form.Item
          {...formItemLayout}
          label="Yang Menyerahkan"
          style={{ marginBottom: 0 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Yang Menerima"
          style={{ marginBottom: 0 }}
        >
          <Input />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Tanggal"
          style={{ marginBottom: 0 }}
        >
          <DatePicker
            onChange={(e) => {
              onChange(e);
            }}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="Jam" style={{ marginBottom: 0 }}>
          <TimePicker
            onChange={(e) => {
              onChange(e);
            }}
            defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayout}
          label="Ruang"
          style={{ marginBottom: 0 }}
        >
          <Input />
        </Form.Item>
      </Card>
    </div>
  );
};
export default Transferpasien;
