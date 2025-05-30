import React, { useContext, useState, useRef } from "react";

import {
  Row,
  Col,
  Select,
  Form,
  Button,
  Table,
  Card,
  Typography,
  Space,
  Empty,
  Modal,
  Input,
  DatePicker,
  TimePicker,
  Divider,
} from "antd";
import Column from "antd/lib/table/Column";
import { PelayananRIContext } from "../context/PelayananRIContext";

// const { Header, Footer, Content } = Layout;

const { Text } = Typography;
const layout = {
  labelCol: { span: 4 },
};
const { Option } = Select;

const FormKamarRI = () => {
  const [form] = Form.useForm();
  const [modalstspulang, setStsPulang] = useState(false);
  const [modalmutasi, setMutasi] = useState(false);
  const [modaleditdiagnosa, setEditDiagnosa] = useState(false);

  const { pelaksana, pelayananRI, detailPelayanan, detpel } =
    useContext(PelayananRIContext);

  const openModalStsPulang = () => {
    setStsPulang(true);
  };

  const openModalMutasi = () => {
    setMutasi(true);
  };

  const openModalEditDiagnosa = () => {
    setEditDiagnosa(true);
  };

  const handleOk = () => {
    // insertBed(databed);
    setStsPulang(false);
  };

  const handleOk2 = () => {
    // insertBed(databed);
    setMutasi(false);
  };

  const handleOk3 = () => {
    // insertBed(databed);
    setMutasi(false);
  };

  const handleCancel = () => {
    setStsPulang(false);
    setMutasi(false);
    setEditDiagnosa(false);
  };

  return (
    <div>
      <Card
        title="Billing"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Table
          bordered
          pagination={false}
          locale={{ emptyText: <Empty description="Data Kamar Kosong" /> }}
          //dataSource={detdiagnosa}
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
                </tr>
              </>
            );
          }}
        >
          <Column
            title="No"
            key="reg"
            className="bgcolortunggu"
            width="35px"
            render={() => (
              <span>
                <Text>billing.jumlah </Text>
              </span>
            )}
          />

          <Column
            title="Nama Kamar"
            key="reg"
            width="300px"
            render={() => (
              <span>
                <Text>billing.jumlah </Text>
              </span>
            )}
          />

          <Column
            title="Kelas Rawat"
            key="reg"
            width="250px"
            render={() => (
              <span>
                <Text>billing.jumlah </Text>
              </span>
            )}
          />

          <Column
            title="Tanggal"
            key="reg"
            width="150px"
            render={() => (
              <span>
                <Text>billing.jumlah </Text>
              </span>
            )}
          />

          <Column
            title="Biaya Kamar"
            key="reg"
            width="100px"
            render={() => (
              <span>
                <Text>billing.jumlah </Text>
              </span>
            )}
          />

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

          <Column
            title="Valid"
            key="reg"
            width="100px"
            render={() => (
              <span>
                <Text>billing.jumlah </Text>
              </span>
            )}
          />

          <Column
            title="No Bed"
            key="reg"
            width="100px"
            render={() => (
              <span>
                <Text>billing.jumlah </Text>
              </span>
            )}
          />

          <Column
            title="User"
            key="reg"
            width="150px"
            render={() => (
              <span>
                <Text>billing.jumlah </Text>
              </span>
            )}
          />

          <Column
            title="Action"
            key="reg"
            width="200px"
            render={() => (
              <span>
                <Text>billing.jumlah </Text>
              </span>
            )}
          />
        </Table>

        <Col span={24} rows={2} style={{ backgroundColor: "aliceblue" }}>
          <Card>
            <Space>
              <Button onClick={openModalStsPulang}>Status Pulang</Button>
              <Button onClick={openModalMutasi}>Mutasi</Button>
              <Button onClick={openModalEditDiagnosa}>Edit Diagnosa</Button>
            </Space>
          </Card>
        </Col>

        {/*modal sts pulang */}
        <Modal
          centered={true}
          title="Status Pulang"
          visible={modalstspulang}
          onOk={handleOk}
          onCancel={handleCancel}
          width="60%"
        >
          <Row>
            <Col span={22}>
              <Form.Item {...layout} label="Dokter Penanggung Jawab">
                <Select
                  dataSource={pelaksana}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih DPJP"
                  optionFilterProp="children"
                  // onChange={(e) => setPemeriksa(e)}
                  // value={pemeriksa}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pelaksana.map((p) => (
                    <Option key={p.dokterId}>{p.namaDokter}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item {...layout} label="Diagnosa Masuk">
                <Input></Input>
              </Form.Item>
              <Form.Item {...layout} label="Diagnosa Akhir">
                <Input></Input>
              </Form.Item>
              <Form.Item {...layout} label="Status Pulang">
                <Select
                  className="ant-select-selection"
                  // dataSource={jenisbedList}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Jenis Bed"
                  optionFilterProp="children"
                  // onChange={(e) => setJenisBedID(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {jenisbedList.map((d) => (
                    <Option key={d.jenisBedId}>{d.deskripsi}</Option>
                  ))} */}
                </Select>
              </Form.Item>
              <Form.Item {...layout} label="Tanggal Pulang">
                <DatePicker></DatePicker>
              </Form.Item>
              <Form.Item {...layout} label="Jam Pulang">
                <TimePicker></TimePicker>
              </Form.Item>
            </Col>
          </Row>
        </Modal>

        {/* Modal Mutasi */}
        <Modal
          centered={true}
          title="Transaksi Mutasi"
          visible={modalmutasi}
          onOk={handleOk2}
          onCancel={handleCancel}
          width="70%"
        >
          <Form {...layout}>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item label="No Registrasi" style={{ marginBottom: 0 }}>
                  <Input />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Tanggal Mutasi" style={{ marginBottom: 0 }}>
                  <DatePicker />
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">Asal Ruang Perawatan</Divider>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item label="Kode Unit" style={{ marginBottom: 0 }}>
                  <Input
                  // value={alamat}
                  // onChange={(e) => setAlamat(e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="No Kamar" style={{ marginBottom: 0 }}>
                  <Select
                    // dataSource={listdesa}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Desa"
                    optionFilterProp="children"
                    // value={desaid}
                    // onSearch={(e) => {
                    //   setidDesa(e);
                    // }}
                    // onChange={(e) => setDesaId(e)}
                    filterOption={(input, option) =>
                      option.props.children[0]
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {/* {listdesa.map((d) => (
                      <Option key={d.desaId}>
                        {d.desaNama} - {d.kecamatan.kecamatanNama} -{" "}
                        {d.kecamatan.kabupaten.kabupatenNama} -{" "}
                        {d.kecamatan.kabupaten.provinsi.provinsiNama}
                      </Option>
                    ))} */}
                  </Select>
                </Form.Item>

                <Form.Item label="Lantai" style={{ marginBottom: 0 }}>
                  <Input
                  // value={kodePos}
                  // onChange={(e) => setKodePos(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="NoTempat Tidur" style={{ marginBottom: 0 }}>
                  <Input
                  // value={noTelepon}
                  // onChange={(e) => setNoTelepon(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Nama Unit" style={{ marginBottom: 0 }}>
                  <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Kelas Rawat" style={{ marginBottom: 0 }}>
                  <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Gol Usia " style={{ marginBottom: 0 }}>
                  <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Gol Kelas" style={{ marginBottom: 0 }}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
            <Divider orientation="left">Ruang Perawatan Baru</Divider>
            <Row gutter={[8, 8]}>
              <Col span={12}>
                <Form.Item label="Kode Unit" style={{ marginBottom: 0 }}>
                  <Input
                  // value={alamat}
                  // onChange={(e) => setAlamat(e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="No Kamar" style={{ marginBottom: 0 }}>
                  <Select
                    // dataSource={listdesa}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Desa"
                    optionFilterProp="children"
                    // value={desaid}
                    // onSearch={(e) => {
                    //   setidDesa(e);
                    // }}
                    // onChange={(e) => setDesaId(e)}
                    filterOption={(input, option) =>
                      option.props.children[0]
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {/* {listdesa.map((d) => (
                      <Option key={d.desaId}>
                        {d.desaNama} - {d.kecamatan.kecamatanNama} -{" "}
                        {d.kecamatan.kabupaten.kabupatenNama} -{" "}
                        {d.kecamatan.kabupaten.provinsi.provinsiNama}
                      </Option>
                    ))} */}
                  </Select>
                </Form.Item>

                <Form.Item label="Lantai" style={{ marginBottom: 0 }}>
                  <Input
                  // value={kodePos}
                  // onChange={(e) => setKodePos(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="NoTempat Tidur" style={{ marginBottom: 0 }}>
                  <Input
                  // value={noTelepon}
                  // onChange={(e) => setNoTelepon(e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Nama Unit" style={{ marginBottom: 0 }}>
                  <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Kelas Rawat" style={{ marginBottom: 0 }}>
                  <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>
                <Form.Item label="Gol Usia " style={{ marginBottom: 0 }}>
                  <Input
                  // value={email}
                  // onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Item>

                <Form.Item label="Gol Kelas" style={{ marginBottom: 0 }}>
                  <Input />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>

        <Modal
          centered={true}
          title="Diagnosa Masa Keperawatan"
          visible={modaleditdiagnosa}
          onOk={handleOk3}
          onCancel={handleCancel}
          width="60%"
        >
          <Row>
            <Col span={22}>
              <Form.Item {...layout} label="Dokter Penanggung Jawab">
                <Select
                  dataSource={pelaksana}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih DPJP"
                  optionFilterProp="children"
                  // onChange={(e) => setPemeriksa(e)}
                  // value={pemeriksa}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pelaksana.map((p) => (
                    <Option key={p.dokterId}>{p.namaDokter}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item {...layout} label="Diagnosa Masuk">
                <Input></Input>
              </Form.Item>
              <Form.Item {...layout} label="Diagnosa Akhir">
                <Input></Input>
              </Form.Item>
            </Col>
          </Row>
        </Modal>
      </Card>
    </div>
  );
};

export default FormKamarRI;
