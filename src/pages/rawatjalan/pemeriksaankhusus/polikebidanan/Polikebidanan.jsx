import React, { Component } from "react";
import { Form, Row, Col, Input, Card, Button, Divider } from "antd";
const { TextArea } = Input;

const formItemLayoutdpjp6 = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

class Polikebidanan extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col span={24}>
            <Card>
              <Divider orientation="left">Kolposkopi</Divider>
              <Form.Item
                {...formItemLayoutdpjp6}
                name="echo"
                label="Keterangan"
                style={{ marginBottom: 0 }}
              >
                <TextArea rows={2} placeholder="..." /> <Button>Cetak</Button>
              </Form.Item>
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              <Divider orientation="left">USG</Divider>
              <Form.Item
                {...formItemLayoutdpjp6}
                name="ekg"
                label="Keterangan"
                style={{ marginBottom: 0 }}
              >
                <TextArea rows={2} placeholder="..." /> <Button>Cetak</Button>
              </Form.Item>
            </Card>
          </Col>
          <Col span={24}>
            <Card>
              <Divider orientation="left">Bone Densitometri</Divider>
              <Form.Item
                {...formItemLayoutdpjp6}
                name="Treadmill"
                label="Keterangan"
                style={{ marginBottom: 0 }}
              >
                <TextArea rows={2} placeholder="..." /> <Button>Cetak</Button>
              </Form.Item>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Polikebidanan;
