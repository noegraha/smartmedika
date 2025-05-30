import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Select,
  Form,
  Button,
  Table,
  Card,
  Empty,
  Space,
  Typography,
  Modal,
  Input,
  InputNumber,
} from "antd";

import { MasterBarangContext } from "../../master/context/MasterBarangContext";

import Column from "antd/lib/table/Column";
const { Option } = Select;

const FormBHPRI = () => {
  const [form] = Form.useForm();
  const { listBarangRuang } = useContext(MasterBarangContext);

  const columns = [
    {
      title: "No",
      width: "35px",
      // dataIndex: "ruangId",
    },
    {
      title: "Kode",
      width: "150px",
      // dataIndex: "ruangId",
    },
    {
      title: "Nama Barang",
      width: "300px",
      // dataIndex: "namaKamar",
    },
    {
      title: "Qty Unit",
      width: "50px",
      // dataIndex: "kelasRawat",
    },
  ];

  const simpanBill = () => {
    // e.preventDefault();
    //insertBiiling(billpelayanan);
    //console.log(billpelayanan);
  };

  const { Text } = Typography;

  return (
    <div>
      <Form form={form} name="billing" onFinish={simpanBill}>
        <Row gutter={[4, 2]}>
          <Col span={4} xs={24} sm={20} md={20} lg={18} xl={11}>
            Barang :{" "}
            <Form.Item style={{ marginBottom: 0 }}>
              <Select
                dataSource={listBarangRuang}
                showSearch
                // searchValue={kosong}
                style={{ width: "100%" }}
                placeholder="Pilih Barang"
                optionFilterProp="children"
                onChange={(value) => {}}
                //value={pel}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {listBarangRuang.map((d) => (
                  <Option key={d.KodeBarang}>
                    {d.KodeBarang + " - " + d.NamaBarang}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4} xs={24} sm={4} md={4} lg={6} xl={2}>
            <Form.Item style={{ marginBottom: 0 }}>
              Jumlah :{" "}
              <InputNumber
                min={1}
                max={10}
                onChange={(e) => {
                  // setJumlah(e);
                  // setKali(e);
                }}
                style={{ width: "100%" }}
                // value={jumlah}
              />
            </Form.Item>
          </Col>
          <Col span={4} xs={24} sm={6} md={6} lg={6} xl={3}>
            <Form.Item style={{ marginBottom: 0 }}>
              Biaya :{" "}
              <Input
                disabled
                style={{ width: "100%" }}
                // value={
                //   hasilkali === null
                //     ? Number(detpel.total).toFixed(2)
                //     : hasilkali * Number(detpel.total).toFixed(2)
                // }
                // value={console.log("hasilkali", hasilkali)}
              />
            </Form.Item>
          </Col>
          <Col span={4} xs={24} sm={16} md={16} lg={16} xl={6}>
            Pelaksana :{" "}
            <Form.Item style={{ marginBottom: 0 }}>
              <Select
                // dataSource={pelaksana}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                // onChange={(e) => setPemeriksa(e)}
                // value={pemeriksa}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {/* {pelaksana.map((p) => (
                    <Option key={p.dokterId}>{p.namaDokter}</Option>
                  ))} */}
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
            style={{ display: "flex", alignItems: "end" }}
          >
            <Form.Item style={{ marginBottom: 0 }}>
              <Button type="primary" htmlType="submit">
                Ambil
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Table
        bordered
        locale={{ emptyText: <Empty description="Data Barang Kosong" /> }}
        pagination={false}
        //dataSource={listkonsulri}
        size="small"
        rowKey="reg"
        scroll={{ x: 1000 }}
        summary={(pageData) => {
          let total = 0;
          pageData.forEach(({ biayaPelayanan, jumlah }) => {
            total += biayaPelayanan * jumlah;
          });
          return (
            <>
              <tr>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th>Total :</th>
                <th className="column-money, tabeltabel">
                  <Text type="danger">
                    Rp.{" "}
                    {total.toLocaleString("id-id", {
                      minimumFractionDigits: 2,
                    })}
                  </Text>
                </th>

                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </>
          );
        }}
      >
        <Column width="35px" title="No" key="reg" className="bgcolortunggu" />
        <Column width="180px" title="Unit" key="reg" />
        <Column width="150px" title="Tanggal Bar" key="reg" />
        <Column width="300px" title="Nama Barang" key="reg" />
        <Column width="100px" title="Harga" key="reg" />
        <Column width="100px" title="Jumlah" key="reg" />
        <Column width="100px" title="Biaya" key="reg" />
        <Column
          title="Invoice"
          key="reg"
          width="100px"
          render={() => (
            <span>
              <Text>billing.jumlah </Text>
            </span>
          )}
        />
        <Column width="100px" title="No Bayar" key="reg" />
        <Column width="80px" title="Valid" key="reg" />
        <Column width="150px" title="User" key="reg" />
        <Column width="250px" title="Nama Penjamin" key="reg" />
        <Column width="200px" title="Action" key="reg" />
      </Table>
    </div>
  );
};

export default FormBHPRI;
