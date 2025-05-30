import { Card, Form, Select } from "antd";
import React from "react";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const MasterSwagger = () => {
  return (
    <Card
      size="small"
      title="Master Swagger"
      headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
      style={{
        borderWidth: "2px",
        borderColor: "darkgray",
        borderRadius: "4px",
      }}
    >
      <Form {...formItemLayout}>
        <Form.Item label="Nama WS">
          <Select placeholder="Nama WS" style={{ width: "100%" }}>
            <Option value="success">Success</Option>
            <Option value="info">Info</Option>
            <Option value="warning">Warning</Option>
            <Option value="error">Error</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Group WS">
          <Select placeholder="Group WS" style={{ width: "100%" }}>
            <Option value="success">Success</Option>
            <Option value="info">Info</Option>
            <Option value="warning">Warning</Option>
            <Option value="error">Error</Option>
          </Select>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default MasterSwagger;
