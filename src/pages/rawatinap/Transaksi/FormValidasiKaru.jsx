import React, { useContext, useEffect, useState } from "react";
import {
  Form,
  Input,
  DatePicker,
  Select,
  Row,
  Col,
  Radio,
  Button,
  Checkbox,
  Card,
  Modal,
  Table,
  Popconfirm,
  message,
  Spin,
  Space,
  Tooltip,
  Tag,
  Image,
  Switch,
  // Popover,
} from "antd";
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const formItemLayout2 = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const { Option } = Select;
const { Column } = Table;
const { TextArea } = Input;
const { confirm } = Modal;
const FormValidasiKaru = () => {
  const [kelengkapanDok, setkelengkapanDok] = useState(false);
  const [dokAda, setdokAda] = useState("");
  const [dokBlmADa, setdokBlmADa] = useState("");

  return (
    <div>
      <Card
        size="small"
        style={{ margin: 3 }}
        title="Pencarian Pasien"
        headStyle={{ fontWeight: "bold", fontSize: "14" }}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Form.Item
              label="Status Dokumen"
              {...formItemLayout2}
              style={{ marginBottom: 5 }}
            >
              <Switch
                checkedChildren="SUDAH LENGKAP"
                unCheckedChildren="BELUM LENGKAP"
                width="100%"
                onChange={(e) => {
                  setkelengkapanDok(e);
                }}
                checked={kelengkapanDok}
              />
            </Form.Item>
            <Form.Item
              label="Dokumen Sudah Ada"
              {...formItemLayout2}
              style={{ marginBottom: 5 }}
            >
              <TextArea
                placeholder="..."
                value={dokAda}
                onChange={(e) => setdokAda(e.target.value)}
                // required
              />
            </Form.Item>
            <Form.Item
              label="Dokumen Belum Ada"
              {...formItemLayout2}
              style={{ marginBottom: 5 }}
            >
              <TextArea
                placeholder="..."
                value={dokBlmADa}
                onChange={(e) => setdokBlmADa(e.target.value)}
                // required
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}></Col>
        </Row>
      </Card>
    </div>
  );
};

export default FormValidasiKaru;
