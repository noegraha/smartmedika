import React, { useContext } from "react";
import { Select, Form, Row, Col, Card, Space, Input, Alert } from "antd";
import dayjs from "dayjs";
import { LoginContext } from "../rawatjalan/context";
import { AskepContext } from "../rawatinap/context/AskepContext";
import { MasterDiagnosaAskepContext } from "../master/context/masteraskep/MasterDiagnosaAskepContext";
import { MasterLuaranAskepContext } from "../master/context/masteraskep/MasterLuaranAskepContext";
import { MasterImplementasiAskepContext } from "../master/context/masteraskep/MasterImplementasiAskepContext";
import { PasienContext } from "../rawatjalan/context/PasienContext";
const { TextArea } = Input;

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const AskepRjView = () => {
  const { curpas } = useContext(PasienContext);
  const { pegawai } = useContext(LoginContext);
  const {
    tanggal,
    diagnosaId,
    setdiagnosaId,
    nTandaGejala,
    setnTandaGejala,
    setnIntervensi,
    nImplementasi,
    setnImplementasi,
    listmsttandagejala,
    getTandaGejalaByNoreg,
    catatan,
    setCatatan,
    getCatatanRJ,
  } = useContext(AskepContext);
  const { dxbyGejala, diagnosabytandagejala } = useContext(
    MasterDiagnosaAskepContext
  );
  const { getluaranbydiagnosaid } = useContext(MasterLuaranAskepContext);
  const { getImplementasiByDiagnosaId, implementasiByDx } = useContext(
    MasterImplementasiAskepContext
  );

  const ontandagejala = (value) => {
    setdiagnosaId([]);
    setnTandaGejala(value);
  };
  const onintervensi = (value) => {
    setnImplementasi(value);
    console.log(value);
  };

  const onpilihdx = (e) => {
    setdiagnosaId(e);
    getluaranbydiagnosaid(e);
    getCatatanRJ(
      curpas.registrasiId,
      curpas.ruangId,
      dayjs(tanggal).format("YYYY-MM-DD")
    );
    getImplementasiByDiagnosaId(e);
    setnIntervensi([]);
    setnImplementasi([]);
  };

  const onfocusdiagnosa = () => {
    diagnosabytandagejala(nTandaGejala);
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card size="small">
            <Row gutter={[4, 0]}>
              <Col span={24}>
                {pegawai !== null ? (
                  pegawai.slice(0, 1) === "D" ? (
                    <div>
                      <Alert
                        message="Maaf Dokter Tidak Dapat Melakukan Pengisian Asuhan Keperawatan"
                        type="warning"
                        showIcon
                        style={{
                          textAlign: "center",
                        }}
                      />
                    </div>
                  ) : (
                    <div></div>
                  )
                ) : (
                  <div></div>
                )}
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Tanda dan Gejala"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={nTandaGejala}
                    onFocus={() => {
                      getTandaGejalaByNoreg("%20");
                    }}
                    style={{ width: "100%", maxWidth: "78vw" }}
                    mode="multiple"
                    allowClear
                    showSearch
                    source={listmsttandagejala}
                    onChange={ontandagejala}
                    tokenSeparators={[","]}
                    placeholder="..."
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {listmsttandagejala.map((b) => (
                      <Option key={b.tandaGejalaId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="Diagnosa Keperawatan"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    onFocus={onfocusdiagnosa}
                    value={diagnosaId}
                    showSearch
                    source={dxbyGejala}
                    onChange={onpilihdx}
                    placeholder="..."
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dxbyGejala.map((b) => (
                      <Option key={b.diagnosaId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Implementasi"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={nImplementasi}
                    style={{ width: "100%", maxWidth: "78vw" }}
                    mode="multiple"
                    allowClear
                    showSearch
                    source={implementasiByDx}
                    onChange={onintervensi}
                    placeholder="..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {implementasiByDx.map((b) => (
                      <Option key={b.ImplementasiId}>{b.Deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>

              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Catatan"
                  style={{ marginBottom: 2 }}
                >
                  <TextArea
                    rows={2}
                    placeholder="..."
                    value={catatan}
                    style={{ width: "100%" }}
                    onChange={(e) => {
                      setCatatan(e.target.value);
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <Space></Space>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AskepRjView;
