import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import axios from "axios";
import { CheckCircleTwoTone, CloseCircleOutlined } from "@ant-design/icons";
import React, { useContext, useEffect, useState } from "react";
import { MasterDokterContext } from "../context/MasterDokter/MasterDokterContext";
import { MasterRuangContext } from "../context/masterreferensi/MasterRuangContext";
const { Option } = Select;
const { Column } = Table;
const formItemLayoutdpjp = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const MasterDokter = () => {
  const [dokterall, setDokterAll] = useState([]);
  const [modalTambah, setmodalTambah] = useState(false);
  const { getListSpesialisDBRS, listSpesialisDBRS } =
    useContext(MasterDokterContext);
  const { getRuang, ruangList } = useContext(MasterRuangContext);

  useEffect(() => {
    const apiku = sessionStorage.getItem("api");
    const token = sessionStorage.getItem("userData");
    const options = {
      headers: { Authorization: "Bearer " + token },
    };

    axios
      .get(`${apiku}/MstDokter/Lookup/%20/1/1000`, {
        headers: options.headers,
      })
      .then((res) => {
        if (res.data.statusCode === 200) {
          setDokterAll(res.data.result);
        } else {
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <Card
        title="List Master Dokter"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={[
          <Button
            key="1"
            type="primary"
            size="small"
            onClick={() => {
              setmodalTambah(true);
            }}
          >
            Tambah
          </Button>,
        ]}
      >
        <Table dataSource={dokterall} size="small">
          <Column
            title="ID Dokter"
            render={(text, record) => <span>{record.dokterId}</span>}
          />
          <Column
            title="Nama Dokter"
            render={(text, record) => <span>{record.namaDokter}</span>}
          />
          <Column
            title="Status Aktif"
            render={(text, record) => (
              <span>
                {record.status ? (
                  <CheckCircleTwoTone twoToneColor="#52c41a" />
                ) : (
                  <CloseCircleOutlined twoToneColor="#eb2f96" />
                )}
              </span>
            )}
          />
        </Table>
      </Card>
      <Modal
        title="Form Tambah Master Dokter"
        open={modalTambah}
        onCancel={() => setmodalTambah(false)}
        closable={false}
        footer={null}
        width="70%"
        style={{ top: 10 }}
      >
        <Row gutter={[5, 5]}>
          <Col span={12}>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Kode Dokter"
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Nama Dokter"
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Jenis Kelamin"
              style={{ marginBottom: 5 }}
            >
              <Select>
                <Option value="L">Laki-Laki</Option>
                <Option value="P">Perempuan</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="No Rekening"
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Bank"
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Alamat"
              style={{ marginBottom: 5 }}
            >
              <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Telepon Rumah"
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Telepon Praktek"
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="No Pager"
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Nama Akun"
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Password"
              style={{ marginBottom: 5 }}
            >
              <Input />
            </Form.Item>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Kategori Pelaksana"
              style={{ marginBottom: 5 }}
            >
              <Select>
                <Option value="4">Ahli Gizi</Option>
                <Option value="1">Dokter Spesialis</Option>
                <Option value="2">Dokter Umum</Option>
                <Option value="6">Farmasis</Option>
                <Option value="8">Fisikamedis</Option>
                <Option value="5">Fisioterapis</Option>
                <Option value="3">Perawat</Option>
                <Option value="10">PPDS</Option>
                <Option value="7">Radiografer</Option>
              </Select>
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Status Dokter"
              style={{ marginBottom: 5 }}
            >
              <Select>
                <Option value="Y">Aktif</Option>
                <Option value="T">Tidak Aktif</Option>
              </Select>
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Spesialisasi"
              style={{ marginBottom: 5 }}
            >
              <Select
                onChange={(e) => {}}
                dataSource={listSpesialisDBRS}
                // value={klinik}
                onFocus={() => {
                  getListSpesialisDBRS();
                }}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
              >
                {listSpesialisDBRS.map((d) => (
                  <Option key={d.SpesialisId}>{d.Deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Ruang Praktek"
              style={{ marginBottom: 5 }}
            >
              <Select
                onChange={(e) => {}}
                dataSource={ruangList}
                // value={klinik}
                onFocus={() => {
                  getRuang("2");
                }}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
              >
                {ruangList.map((d) => (
                  <Option key={d.ruangId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Status Kerja"
              style={{ marginBottom: 5 }}
            >
              <Select>
                <Option value="Full Time">Full Time</Option>
                <Option value="Part Time">Part Time</Option>
                <Option value="Visitting">Visitting</Option>
                <Option value="Magang">Magang</Option>
              </Select>
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Potongan Pajak (%)"
              style={{ marginBottom: 5 }}
            >
              <InputNumber min={0} max={100} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Max Pasien"
              style={{ marginBottom: 5 }}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              {...formItemLayoutdpjp}
              label="Max Kontrak"
              style={{ marginBottom: 5 }}
            >
              <InputNumber min={0} style={{ width: "100%" }} />
            </Form.Item>
          </Col>
          {/* <Col span={24}>
            <Form.Item
              {...formItemLayoutdpjp}
              label="Keterangan Tidak Hadir"
              style={{ marginBottom: 5 }}
            >
              <Input.TextArea rows={3} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Checkbox>Kehadiran Dokter</Checkbox>
          </Col> */}
          <Col span={24} style={{ textAlign: "right" }}>
            <Space>
              <Button>Batal</Button>
              <Button type="primary">Simpan</Button>
            </Space>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default MasterDokter;
