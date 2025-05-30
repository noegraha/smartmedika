import {
  Card,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  Select,
} from "antd";
import React from "react";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { Option } = Select;
const DOA = () => {
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
          title="DOA"
          size="small"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Form {...formItemLayout}>
            <Form.Item label="Identitas Pasien" labelAlign="left">
              <Select style={{ width: "25%" }}>
                <Option key="ADA">ADA</Option>
                <Option key="TIDAK">TIDAK</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Jenis Identitas" labelAlign="left">
              <Select style={{ width: "25%" }}>
                <Option key="KTP">KTP</Option>
                <Option key="SIM">SIM</Option>
                <Option key="PASSPORT">PASSPORT</Option>
                <Option key="KK">KK</Option>
                <Option key="LAINNYA">LAINNYA</Option>
              </Select>
            </Form.Item>
            <Divider />
            <Form.Item label="Nama Pasien" labelAlign="left">
              <Input style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item label="Nama Pasien" labelAlign="left">
              <DatePicker style={{ width: "25%" }} />
            </Form.Item>
            <Form.Item label="Alamat" labelAlign="left">
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Divider />
            <Form.Item label="Nama Pengantar" labelAlign="left">
              <Input style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item label="No Telp." labelAlign="left">
              <Input style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item label="Alamat" labelAlign="left">
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item label="Hubungan" labelAlign="left">
              <Input style={{ width: "50%" }} />
            </Form.Item>
            <Divider />
            Apakah pasien memiliki No. Rekam Medik di RSMS{" "}
            <Select style={{ width: "25%" }}>
              <Option key="ADA">YA</Option>
              <Option key="TIDAK">TIDAK</Option>
            </Select>
            <Input style={{ width: "25%" }} />
            <Form.Item label="Allo Anamnesa" labelAlign="left">
              <Input style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item label="Nafas" labelAlign="left">
              <Input style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item label="Nadi" labelAlign="left">
              <Input style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item label="Pupil" labelAlign="left">
              <Input style={{ width: "50%" }} />
            </Form.Item>
            <Form.Item label="EKG Flat" labelAlign="left">
              <Select style={{ width: "25%" }}>
                <Option key="ADA">YA</Option>
                <Option key="TIDAK">TIDAK</Option>
              </Select>
            </Form.Item>
          </Form>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default DOA;
