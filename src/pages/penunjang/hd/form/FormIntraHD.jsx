import React from "react";
import { Col, Row, Form, Card, Button, Input, Table, TimePicker } from "antd";
import TabelIntraHD from "../komponen/TabelIntraHD";
import dayjs from "dayjs";
import TextArea from "antd/lib/input/TextArea";

const FormIntraHD = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };
  const format = "HH:mm";

  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      width: "50px",
    },
    {
      title: "Diagnosa",
      dataIndex: "diagnosa",
      key: "diagnosa",
    },
  ];

  const dataPrePost = [
    {
      key: "1",
      diagnosa: "Demam",
    },
    {
      key: "2",
      diagnosa: "Nyeri dada",
    },
    {
      key: "3",
      diagnosa: "Aritmia",
    },
    {
      key: "4",
      diagnosa: "Hipotensi",
    },
    {
      key: "5",
      diagnosa: "Hipertensi",
    },
    {
      key: "6",
      diagnosa: "Mual dan muntah",
    },
    {
      key: "7",
      diagnosa: "Pendarahan",
    },
    {
      key: "8",
      diagnosa: "Masalah akses",
    },
    {
      key: "9",
      diagnosa: "Sakit kepala",
    },
    {
      key: "10",
      diagnosa: "Kram otot",
    },
    {
      key: "11",
      diagnosa: "Menggigil / dingin",
    },
    {
      key: "12",
      diagnosa: "First use syndrom",
    },
    {
      key: "13",
      diagnosa: "Hiperkalemia",
    },
    {
      key: "14",
      diagnosa: "Gatal-gatal",
    },
  ];

  return (
    <Form>
      <Card
        size="small"
        title="Intra HD"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          marginBottom: 6,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Form.Item style={{ marginBottom: 0 }}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              Waktu Mulai
              <br />
              <Form.Item style={{ marginBottom: 0 }}>
                <TimePicker
                  defaultValue={dayjs("00:00", format)}
                  format={format}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              Waktu Selesai (Target)
              <br />
              <Form.Item style={{ marginBottom: 0 }}>
                <TimePicker
                  defaultValue={dayjs("00:00", format)}
                  format={format}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              Waktu Selesai (Real)
              <br />
              <Form.Item style={{ marginBottom: 0 }}>
                <TimePicker
                  defaultValue={dayjs("00:00", format)}
                  format={format}
                  style={{ width: "100%" }}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              Kt/V
              <br />
              <Form.Item style={{ marginBottom: 0 }}>
                <Input type="number" suffix="" placeholder="..." />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Card>
                {/* <Col span={4} xs={12} sm={12} md={4} lg={4} xl={4}> */}
                Jam
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <TimePicker
                    defaultValue={dayjs("00:00", format)}
                    format={format}
                    style={{ width: "100%" }}
                  />
                </Form.Item>
                {/* </Col>
                            <Col span={4} xs={12} sm={12} md={4} lg={4} xl={4}> */}
                QB
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input type="number" suffix="" placeholder="..." />
                </Form.Item>
                {/* </Col>
                            <Col span={4} xs={12} sm={12} md={4} lg={4} xl={4}> */}
                VP
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input type="number" suffix="" placeholder="..." />
                </Form.Item>
                {/* </Col>
                            <Col span={4} xs={12} sm={12} md={4} lg={4} xl={4}> */}
                TMP
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input type="number" suffix="" placeholder="..." />
                </Form.Item>
                {/* </Col>
                            <Col span={4} xs={12} sm={12} md={4} lg={4} xl={4}> */}
                UF Rate
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input type="number" suffix="" placeholder="..." />
                </Form.Item>
                {/* </Col>
                            <Col span={4} xs={12} sm={12} md={4} lg={4} xl={4}> */}
                Remv
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Input type="number" suffix="" placeholder="..." />
                </Form.Item>
                {/* </Col>
                            <Col span={24}> */}
                Catatan
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <TextArea placeholder="..." />
                </Form.Item>
                <br />
                <Row>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={(e) => onSubmit(e)}
                    >
                      Tambah
                    </Button>
                  </Col>
                </Row>
              </Card>
              {/* </Col> */}
            </Col>
            <Col span={18}>
              <TabelIntraHD />
            </Col>
          </Row>

          {/* <Row gutter={[16, 16]}>
                        <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                            Waktu Mulai
                            <br />
                            <Form.Item style={{ marginBottom: 0 }}>
                                <TimePicker defaultValue={dayjs('00:00', format)} format={format} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                            Waktu Selesai (Target)
                            <br />
                            <Form.Item style={{ marginBottom: 0 }}>
                                <TimePicker defaultValue={dayjs('00:00', format)} format={format} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                            Waktu Selesai (Real)
                            <br />
                            <Form.Item style={{ marginBottom: 0 }}>
                                <TimePicker defaultValue={dayjs('00:00', format)} format={format} style={{ width: '100%' }} />
                            </Form.Item>
                        </Col>
                        <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                            Kt/V
                            <br />
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Input
                                    type="number"
                                    suffix=""
                                    placeholder="..."
                                />
                            </Form.Item>
                        </Col>
                    </Row> */}
          {/* <Row gutter={[16, 16]}>
                        <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
                            UF Goal
                            <br />
                            <Form.Item style={{ marginBottom: 0 }}>
                                <Input
                                    type="number"
                                    suffix=""
                                    placeholder="..."
                                />
                            </Form.Item>
                        </Col>
                        <Col span={18} xs={12} sm={12} md={18} lg={18} xl={18}>
                            UF Profiling
                            <br />
                            <Row gutter={8, 8}>
                                <Col span={4}>
                                    <Input
                                        type="number"
                                        placeholder="..."
                                    />
                                </Col>
                                {" / "}
                                <Col span={4}>
                                    <Input
                                        type="number"
                                        placeholder="..."
                                    />
                                </Col>
                                {" / "}
                                <Col span={4}>
                                    <Input
                                        type="number"
                                        placeholder="..."
                                    />
                                </Col>
                                {" / "}
                                <Col span={4}>
                                    <Input
                                        type="number"
                                        placeholder="..."
                                    />
                                </Col>
                                {" / "}
                                <Col span={4}>
                                    <Input
                                        type="number"
                                        placeholder="..."
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row> */}
          {/* <Row> */}
          {/* <Button
                            // onClick={this.handleAdd}
                            type="primary"
                            style={{
                                marginBottom: 16,
                            }}
                        >
                            Add a row
                        </Button>
                        <Table
                            // components={components}
                            rowClassName={() => 'editable-row'}
                            bordered
                        // dataSource={dataSource}
                        // columns={columns}
                        />*/}

          {/* <TabelIntraHD />
                    </Row> */}
        </Form.Item>
      </Card>
      <Card
        size="small"
        title="Komplikasi Intradialisis"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          marginBottom: 6,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Table
          bordered
          scroll={{ x: "100px", y: "300px" }}
          pagination={false}
          size="small"
          rowSelection={{
            type: "checkbox",
            columnWidth: "60px",
            fixed: "right",
          }}
          columns={columns}
          dataSource={dataPrePost}
        />
      </Card>
      <Row>
        <Col span={24} style={{ textAlign: "right" }}>
          <Button type="primary" htmlType="submit" onClick={(e) => onSubmit(e)}>
            Simpan
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default FormIntraHD;
