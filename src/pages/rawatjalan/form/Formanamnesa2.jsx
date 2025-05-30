import React, { useContext, useState } from "react";
import FormAllergy from "./FormAllergy";
import {
  Form,
  Row,
  Col,
  Button,
  Select,
  List,
  Popconfirm,
  message,
  ConfigProvider,
  Card,
  Radio,
  // Space,
  Tooltip,
} from "antd";
import {
  SmileOutlined,
  CloseCircleTwoTone,
  // MehOutlined, FrownOutlined
} from "@ant-design/icons";
import { AlergiContext } from "../context/AlergiContext";
import { PasienContext } from "../context/PasienContext";
import { PelayananContext } from "../context/Pelayanancontext";
import PemeriksaanFisik from "../komponen/PemeriksaanFisik";
import FormTandaVitalRJView from "./FormTandaVitalRJView";
import FormBillingView from "./FormBillingView";
const formItemLayout = {
  labelCol: { span: 10 },
  wrapperCol: { span: 20 },
};
const formItemLayout2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};
const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}
const Formanamnesa = () => {
  const { caramasukid, screening, setScreening } = useContext(PasienContext);
  const { caramasuk } = useContext(PelayananContext);
  const { allergy, deleteAllergy } = useContext(AlergiContext);
  const radioHandler = (e) => {
    setScreening(e.target.value);
  };
  const onDelete = (noreg, kode) => {
    deleteAllergy(noreg, kode);
  };
  const cancel = (e) => {
    message.error("Batal Dihapus");
  };
  const kosongan = () => (
    <div style={{ textAlign: "center", padding: 0, margin: 0, marginTop: 2 }}>
      <SmileOutlined style={{ fontSize: 20 }} />
      &nbsp; Tidak Memiliki Alergi
    </div>
  );
  return (
    <Row gutter={[4, 4]}>
      <Col xs={24} sm={24} md={7} lg={6} xl={6}>
        <Card
          size="small"
          title="Assesment Kunjungan"
          style={{
            marginBottom: 5,
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
          headStyle={{
            fontWeight: "bolder",
            backgroundColor: "lavenderblush",
          }}
        >
          <Form>
            <Form.Item {...formItemLayout2} style={{ marginBottom: 0 }}>
              <Row>
                <Col span={13}>
                  <Radio.Group
                    onChange={(e) => radioHandler(e)}
                    value={screening}
                  >
                    <Radio value="B">Awal</Radio>
                    <Radio value="L">Ulang</Radio>
                  </Radio.Group>
                </Col>
                <Col span={11}>
                  {screening === "B" ? (
                    <PemeriksaanFisik screening={screening} />
                  ) : (
                    <PemeriksaanFisik screening={screening} />
                  )}
                </Col>
              </Row>
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 0 }}
              label="Cara Kunjungan"
              labelAlign="left"
              {...formItemLayout}
            >
              <Select
                dataSource={caramasuk}
                showSearch
                value={caramasukid}
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={handleChange}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
                disabled
              >
                {caramasuk.map((d) => (
                  <Option key={d.caraMasukId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
          </Form>
        </Card>
        <Card
          size="small"
          title="Alergi"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
            marginBottom: 5,
            // boxShadow: "-2px 2px 6px 2px rgba(100, 100, 100, 0.3)"
          }}
          headStyle={{
            fontWeight: "bolder",
            backgroundColor: "lavenderblush",
          }}
          extra={<FormAllergy />}
        >
          <Form.Item style={{ marginBottom: 0 }}>
            <ConfigProvider renderEmpty={kosongan}>
              <List
                bordered
                size="small"
                dataSource={allergy}
                renderItem={(item) => (
                  <List.Item
                    actions={[
                      <Popconfirm
                        title="Anda Yakin Menghapus Allergi ?"
                        onConfirm={(e) => onDelete(item.noreg, item.kodenya)}
                        onCancel={(e) => cancel(e)}
                        okText="Ya"
                        cancelText="Tidak"
                      >
                        <Button size="small" type="link">
                          <Tooltip placement="left" title="Hapus Allergy">
                            <CloseCircleTwoTone twoToneColor="red" />
                          </Tooltip>
                        </Button>
                      </Popconfirm>,
                    ]}
                  >
                    {item.alerginya}
                  </List.Item>
                )}
              />
            </ConfigProvider>
          </Form.Item>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={17} lg={10} xl={10}>
        <FormTandaVitalRJView />
      </Col>
      <Col xs={24} sm={24} md={24} lg={8} xl={8}>
        <FormBillingView />
      </Col>
    </Row>
  );
};

export default Formanamnesa;
