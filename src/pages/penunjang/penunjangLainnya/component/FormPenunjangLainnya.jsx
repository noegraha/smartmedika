import { Card, Col, DatePicker, Form, Input, Row, Select, Tooltip } from "antd";
import { Editor } from "react-draft-wysiwyg";
import "../../../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "../style/formPenunjangLainnya.css";
import React from "react";

const { Option } = Select;

const FormPenunjangLainnya = () => {
  return (
    <div>
      {/* <Card> */}
      <Form labelCol={{ span: 3 }} wrapperCol={{ span: 21 }} labelAlign="left">
        <Form.Item label="Data Billing" style={{ marginBottom: "0px" }}>
          <Tooltip title="F2 untuk DeSeleksi">
            <Select
              // value={props.jenisKasus ? props.jenisKasus : "1"}
              // onChange={props.changeJenisKasus}
              placeholder="Data Billing"
              size="small"
            >
              <Option key="1" value="1">
                Option 1
              </Option>
              <Option key="2" value="2">
                Option 2
              </Option>
              <Option key="3" value="3">
                Option 3
              </Option>
            </Select>
          </Tooltip>
        </Form.Item>
        <Form labelCol={{ span: 8 }} wrapperCol={{ span: 16 }}>
          <Row>
            <Col span={8}>
              <Form.Item label="Jenis Periksa" style={{ marginBottom: "0px" }}>
                <Select
                  // value={props.jenisKasus ? props.jenisKasus : "1"}
                  // onChange={props.changeJenisKasus}
                  placeholder="Jenis Periksa"
                  size="small"
                >
                  <Option key="1" value="1">
                    Option 1
                  </Option>
                  <Option key="2" value="2">
                    Option 2
                  </Option>
                  <Option key="3" value="3">
                    Option 3
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Ruang" style={{ marginBottom: "0px" }}>
                <Select
                  // value={props.jenisKasus ? props.jenisKasus : "1"}
                  // onChange={props.changeJenisKasus}
                  placeholder="Ruang"
                  size="small"
                >
                  <Option key="1" value="1">
                    Option 1
                  </Option>
                  <Option key="2" value="2">
                    Option 2
                  </Option>
                  <Option key="3" value="3">
                    Option 3
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Mulai" style={{ marginBottom: "0px" }}>
                <DatePicker showTime format={"DD-MM-YYYY HH:mm"} size="small" />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Tgl.Tindakan" style={{ marginBottom: "0px" }}>
                <DatePicker format={"DD-MM-YYYY"} size="small" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Pelaksana" style={{ marginBottom: "0px" }}>
                <Select
                  // value={props.jenisKasus ? props.jenisKasus : "1"}
                  // onChange={props.changeJenisKasus}
                  placeholder="Pelaksana"
                  size="small"
                >
                  <Option key="1" value="1">
                    Option 1
                  </Option>
                  <Option key="2" value="2">
                    Option 2
                  </Option>
                  <Option key="3" value="3">
                    Option 3
                  </Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Selesai" style={{ marginBottom: "0px" }}>
                <DatePicker showTime format={"DD-MM-YYYY HH:mm"} size="small" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Form>
      <Editor onChange={(e) => console.log(e)} />
      {/* </Card> */}
    </div>
  );
};

export default FormPenunjangLainnya;
