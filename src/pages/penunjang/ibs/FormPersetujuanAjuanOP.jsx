import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  TimePicker,
} from "antd";
import { IBSContext } from "./context/IBSContext";

import "dayjs/locale/id";

const FormPersetujuanAjuanOP = () => {
  const { dokterSp, cariDokterSpesialis, detailAjuan } = useContext(IBSContext);
  const [opPertama, setOpPertama] = useState("");
  const [opKedua, setOpKedua] = useState("");
  const [anestesi, setAnestesi] = useState("");

  const [acc, setAcc] = useState("");

  useEffect(() => {
    setAcc(detailAjuan.acceptable);
  });

  const [form] = Form.useForm();

  const format = "HH:mm";

  const submitForm = () => {
    console.log("SUBMIT");
  };

  const cekOp1 = () => {
    console.log(opPertama);
    console.log("SP", dokterSp);
  };

  return (
    <div>
      {/* <button onClick={cekOp1}>CEK OP 1</button> */}
      <Card>
        <Form form={form} layout="vertical" size="small" onFinish={submitForm}>
          <Row gutter={24}>
            <Col span={12}>
              <Form.Item
                label="Persetujuan"
                required
                tooltip="Disetujui/ Ditolak"
                rules={detailAjuan.acceptable}
              >
                <Select autoFocus onChange={(e) => setAcc(e)}>
                  <Select.Option key="Disetujui" value="Disetujui">
                    Disetujui
                  </Select.Option>
                  <Select.Option key="Ditolak" value="Ditolak">
                    Ditolak
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Tindakan" required tooltip="Tindakan Operasi">
                <Select showSearch placeholder="Pilih Tindakan">
                  <Select.Option value="01">Tindakan 01</Select.Option>
                  <Select.Option value="02">Tindakan 02</Select.Option>
                  <Select.Option value="03">Tindakan 03</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="Tindakan Penyerta"
                tooltip="Tindakan Penyerta Operasi"
              >
                <Select showSearch placeholder="Pilih Tindakan">
                  <Select.Option value="01">Tindakan 01</Select.Option>
                  <Select.Option value="02">Tindakan 02</Select.Option>
                  <Select.Option value="03">Tindakan 03</Select.Option>
                </Select>
              </Form.Item>
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item
                    label="No Kamar"
                    required
                    tooltip="No Kamar Operasi"
                  >
                    <InputNumber min={1} max={10} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item label="Jam Operasi" required tooltip="Jam Operasi">
                    <TimePicker format={format} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Form.Item label="Operator" required>
                <Select
                  showSearch
                  placeholder="Operator"
                  onFocus={cariDokterSpesialis}
                  onChange={(e) => {
                    setOpPertama(e);
                  }}
                >
                  {dokterSp.map((dr) =>
                    opKedua === dr.dokterId ? (
                      <Select.Option
                        key={dr.dokterId}
                        value={dr.dokterId}
                        disabled
                      >
                        {dr.namaDokter}
                      </Select.Option>
                    ) : (
                      <Select.Option key={dr.dokterId} value={dr.dokterId}>
                        {dr.namaDokter}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
              <Form.Item label="Operator 2">
                <Select
                  showSearch
                  placeholder="Operator 2"
                  disabled={opPertama ? false : true}
                  onChange={(e) => {
                    setOpKedua(e);
                  }}
                >
                  <Select.Option value=""></Select.Option>
                  {dokterSp.map((dr) =>
                    opPertama === dr.dokterId ? (
                      <Select.Option
                        key={dr.dokterId}
                        value={dr.dokterId}
                        disabled
                      >
                        {dr.namaDokter}
                      </Select.Option>
                    ) : (
                      <Select.Option key={dr.dokterId} value={dr.dokterId}>
                        {dr.namaDokter}
                      </Select.Option>
                    )
                  )}
                </Select>
              </Form.Item>
              <Form.Item label="Anestesi" required>
                <Select
                  showSearch
                  placeholder="Perawat Anestesi"
                  onFocus={cariDokterSpesialis}
                  onChange={(e) => {
                    setAnestesi(e);
                  }}
                >
                  {dokterSp.map((dr) =>
                    dr.spesialisId === 110 ? (
                      <Select.Option key={dr.dokterId} value={dr.dokterId}>
                        {dr.namaDokter}
                      </Select.Option>
                    ) : (
                      ""
                    )
                  )}
                </Select>
              </Form.Item>
              <Form.Item label="Catatan" tooltip="Catatan">
                <Input.TextArea showCount maxLength={300} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
};

export default FormPersetujuanAjuanOP;
