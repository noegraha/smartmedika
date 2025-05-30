import React, { useContext, useState } from "react";
import {
  Descriptions,
  Popconfirm,
  Col,
  Input,
  Card,
  Button,
  Table,
  Empty,
  Collapse,
  Modal,
  Layout,
  Affix,
  Form,
  Select,
  Row,
} from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import { AskepContext } from "../rawatinap/context/AskepContext";
import { MasterIntervensiAskepContext } from "../master/context/masteraskep/MasterIntervensiAskepContext";
const { Option } = Select;

const EditIntervensiAskep = () => {
  const {
    listIntervensiPerbaikan,
    setlistIntervensiPerbaikan,
    intervensiImpelentasi,
    setintervensiImpelentasi,
    getListIntervensiPerbaikan,
    getListIntervensiImplementasi,
    loadingEdit,
    setloadingEdit,
    updateIntervensiLama,
    intervensiLama,
    setintervensiLama,
    intervensiBaru,
    setintervensiBaru,
  } = useContext(MasterIntervensiAskepContext);

  const dataEdit = {
    intervensiSikiId: intervensiBaru,
    deskripsi: intervensiLama,
  };

  return (
    <div>
      <Card
        title="Update Data Intervensi Lama Ke Intervensi Baru"
        headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row gutter={[8, 2]} align="middle">
          <Col span={4} xs={24} sm={24} md={10} lg={10} xl={10}>
            INTERVENSI LAMA :{" "}
            <Form.Item rules={[{ required: true }]}>
              <Select
                loading={loadingEdit}
                onFocus={() => {
                  setloadingEdit(true);
                  getListIntervensiPerbaikan();
                }}
                dataSource={listIntervensiPerbaikan}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Prosedur"
                optionFilterProp="children"
                onChange={(e) => setintervensiLama(e)}
                value={intervensiLama}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {listIntervensiPerbaikan.map((d) => (
                  <Option key={d.Deskripsi}>{d.Deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4} xs={24} sm={24} md={10} lg={10} xl={10}>
            INTERVENSI BARU :{" "}
            <Form.Item rules={[{ required: true }]}>
              <Select
                loading={loadingEdit}
                onFocus={() => {
                  setloadingEdit(true);
                  getListIntervensiImplementasi();
                }}
                dataSource={intervensiImpelentasi}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => setintervensiBaru(e)}
                value={intervensiBaru}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {intervensiImpelentasi.map((p) => (
                  <Option key={p.IntervensiId}>{p.DeskripsiIntervensi}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col
            span={24}
            xs={24}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            style={{ display: "flex", alignItems: "end", marginTop: "auto" }}
          >
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                onClick={() => {
                  updateIntervensiLama(dataEdit);
                }}
              >
                Update
              </Button>
            </Form.Item>
          </Col>
        </Row>
        {/* <Input.Group compact>
                    <Input
                        style={{ width: "90%" }}
                        onChange={(e) => setnoreg(e.target.value)}
                        onPressEnter={() => getListAskepById(noreg)}
                        placeholder="Masukkan nomor registrasi pasien..."
                    />
                    <Button
                        style={{ width: "10%" }}
                        type="primary"
                        onClick={() => getListAskepById(noreg)}
                    >
                        Cari
                    </Button>
                </Input.Group>  */}

        {/* <Table
                    bordered
                    locale={{ emptyText: <Empty description='Data Asuhan Kosong' /> }}
                    pagination={{ pageSize: 5 }}
                    dataSource={listIntervensiPerbaikan}
                    size="small"
                >
                    <Column title="Diagnosa" width="30%"
                        render={(listIntervensiPerbaikan) => (
                            <span>
                                {(listIntervensiPerbaikan.Deskripsi)}
                            </span>
                        )} />
                </Table> */}
      </Card>
    </div>
  );
};

export default EditIntervensiAskep;
