import { Card, ConfigProvider, Form, Select } from "antd";
import React from "react";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const Persetujuan = () => {
  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Card: { fontWeightStrong: "bolder", headerBg: "beige" },
            Form: { itemMarginBottom: 0 },
          },
        }}
      >
        <Card
          title="Persetujuan"
          size="small"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Form {...formItemLayout} labelWrap labelAlign="left">
            <Form.Item label="Dokter">
              <Select style={{ width: "25%" }}>
                <Option key="1">ABDILLAH Dr.</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Perawat">
              <Select style={{ width: "25%" }}>
                <Option key="1">AGUNG SUSILO</Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default Persetujuan;
