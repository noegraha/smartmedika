import React from "react";
import { Card, Form, Row, Select, Col, Input, Button } from "antd";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
// import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

const FormMappingTindakanOP = () => {
  const [form] = Form.useForm();
  const [datasave, setDatasave] = useState("<b>test</b>");
  return (
    <div>
      <Card>
        cek
        <Form form={form} layout="vertical" size="small">
          <Row gutter={24}>
            <Col span={4}>
              <Form.Item label="Tindakan" required tooltip="Tindakan Operasi">
                <Select showSearch placeholder="Pilih Tindakan">
                  <Select.Option value="01">Tindakan 01</Select.Option>
                  <Select.Option value="02">Tindakan 02</Select.Option>
                  <Select.Option value="03">Tindakan 03</Select.Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={20}>
              <Form.Item
                label="Tindakan Penyerta"
                tooltip="Tindakan Penyerta Operasi"
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col>
              <Button
                onClick={() => {
                  console.log(datasave);
                }}
              >
                save
              </Button>
            </Col>
          </Row>
          <Row gutter={24}>
            <Col span={24}>
              <Form.Item>
                {/* <CKEditor
                  editor={ClassicEditor}
                  data={datasave}
                  onReady={(editor) => {
                    
                    console.log("Editor is ready to use!", editor);
                  }}
                  onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log(editor);
                    setDatasave(data);
                  }}
                  
                /> */}
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default FormMappingTindakanOP;
