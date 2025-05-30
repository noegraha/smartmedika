import React, { Fragment, useState, useContext } from "react";
import {
  Typography,
  Table,
  Form,
  Input,
  Button,
  Col,
  Row,
  Modal,
  Popconfirm,
  message,
  Card,
  Space,
  Select,
} from "antd";
import { Tabs } from "antd";
import { MasterRuangContext } from "../context/masterreferensi/MasterRuangContext";
import { Link } from "react-router-dom";

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
};
const { Title } = Typography;
const { Column } = Table;

const MasterRuang = () => {
  const {
    insertRuang,
    getRuang,
    getRuangById,
    getKelasRawat,
    deleteRuang,
    ruangList,
    kelasrawatlist,
    setRuangId,
    ruangId,
    setDeskripsi,
    deskripsi,
    setGroupLayananId,
    groupLayananId,
    setKelasRawatId,
    kelasRawatId,
    loading,
    setLoading,
    setRefresh,
    statusRuang,
    tabKunci,
  } = useContext(MasterRuangContext);

  const dataruang = {
    ruangId: ruangId,
    deskripsi: deskripsi,
    layananPasien: parseInt(groupLayananId) === 6 ? false : true,
    groupLayananId: parseInt(groupLayananId),
    kelasRawatId: kelasRawatId,
    status: statusRuang,
  };

  const dataruang2 = {
    ruangId: ruangId,
    deskripsi: deskripsi,
    layananPasien: parseInt(groupLayananId) === 6 ? false : true,
    groupLayananId: parseInt(groupLayananId),
    kelasRawatId: kelasRawatId,
    status: true,
  };

  const [visible1, setVisible1] = useState(false);
  const [visible2, setVisible2] = useState(false);
  const [visible3, setVisible3] = useState(false);

  const showModal1 = (e) => {
    setVisible1(true);
    getKelasRawat();
  };

  const showModal2 = (e) => {
    setVisible2(true);
    getKelasRawat();
    getRuangById(e);
  };

  const showModal3 = (e) => {
    setVisible3(true);
    getKelasRawat();
    getRuangById(e);
  };

  const onSubmit = () => {
    insertRuang(dataruang);
    console.log("data", dataruang);
    setVisible1(false);
    setVisible2(false);
    onRefresh(dataruang.groupLayananId);

    // getRuang(groupLayananId);
  };

  const onAktivasi = () => {
    insertRuang(dataruang2);
    console.log("data2", dataruang2);
    setVisible3(false);
    onRefresh(dataruang.groupLayananId);
  };

  const onDelete = (e) => {
    deleteRuang(e);
  };

  const onRefresh = (e) => {
    setLoading(true);
    setRefresh(e);
  };

  const onCancel = () => {
    setVisible1(false);
    setVisible2(false);
    setVisible3(false);
  };

  const cancelhapus = () => {
    message.error("Batal!");
  };

  const [page, setPage] = useState(1);
  const callback = (key) => {
    if (key === "1") {
      getRuang("1");
    } else if (key === "2") {
      getRuang("2");
    } else if (key === "3") {
      getRuang("3");
    } else if (key === "4") {
      getRuang("4");
    } else if (key === "5") {
      getRuang("5");
    } else if (key === "6") {
      getRuang("6");
    } else {
      getRuang("7");
    }
  };
  return (
    <div>
      <Tabs type="card" activeKey={parseInt(tabKunci)} onChange={callback}>
        <Link tab="Rawat Inap" key="1"></Link>
        <Link tab="Rawat Jalan" key="2"></Link>
        <Link tab="IGD" key="3"></Link>
        <Link tab="Penunjang Medis" key="4"></Link>
        <Link tab="Penunjang Non Medis" key="5"></Link>
        <Link tab="Struktural" key="6"></Link>
        <Link tab="Apotik Farmasi" key="7"></Link>
      </Tabs>
      <Fragment>
        <Card
          title={<Title level={4}>MASTER RUANG</Title>}
          extra={
            <Button type="primary" onClick={(e) => showModal1(e)}>
              Tambah
            </Button>
          }
        >
          <Modal
            style={{ top: 20 }}
            width="50%"
            visible={visible1}
            title="Tambah Ruang"
            footer={false}
            onCancel={(e) => onCancel(e)}
          >
            <Row>
              <Col span={22}>
                <Form.Item {...formItemLayout} label="Id Ruang">
                  <Input onChange={(e) => setRuangId(e.target.value)} />
                </Form.Item>
                <Form.Item {...formItemLayout} label="Nama Ruang">
                  <Input onChange={(e) => setDeskripsi(e.target.value)} />
                </Form.Item>
                <Form.Item {...formItemLayout} label="Group Layanan">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Group Layanan"
                    optionFilterProp="children"
                    onChange={(e) => setGroupLayananId(e)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value="1">Rawat Inap</Option>
                    <Option value="2">Rawat Jalan</Option>
                    <Option value="3">IGD</Option>
                    <Option value="4">Penunjang Medis</Option>
                    <Option value="5">Penunjang Non Medis</Option>
                    <Option value="6">Struktural</Option>
                    <Option value="7">Apotik Farmasi</Option>
                  </Select>
                </Form.Item>
                <Form.Item {...formItemLayout} label="Kelas Rawat">
                  <Select
                    dataSource={kelasrawatlist}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Kelas Rawat"
                    optionFilterProp="children"
                    onChange={(e) => setKelasRawatId(e)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {kelasrawatlist.map((d) => (
                      <Option key={d.kelasRawatId}>{d.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={onSubmit}>
                  Simpan
                </Button>
                <Button onClick={() => onCancel()}>Batal</Button>
              </Col>
            </Row>
          </Modal>

          <Table
            pagination={false}
            dataSource={ruangList}
            loading={loading}
            size="small"
          >
            <Column
              title="No."
              key="reg"
              className="tabeltabel2"
              width="20px"
              render={(text, record, index) => (
                <span>{(page - 1) * 10 + index + 1}</span>
              )}
            />
            <Column
              title="Kode Ruang"
              key="reg"
              width="2px"
              render={(ruangList) => <span>{ruangList.ruangId}</span>}
              sorter={(a, b) => a.ruangId.localeCompare(b.ruangId)}
            />
            <Column
              title="Nama Ruang"
              key="reg"
              width="200px"
              render={(ruangList) => <span>{ruangList.deskripsi}</span>}
            />

            <Column
              title="Kelas Rawat"
              key="reg"
              width="55px"
              render={(ruangList) => (
                <span>
                  {kelasrawatlist.map((d) => d.deskripsi)[
                    kelasrawatlist
                      .map((d) => d.kelasRawatId)
                      .indexOf(String(ruangList.kelasRawatId))
                  ] === undefined
                    ? "-"
                    : kelasrawatlist.map((d) => d.deskripsi)[
                        kelasrawatlist
                          .map((d) => d.kelasRawatId)
                          .indexOf(String(ruangList.kelasRawatId))
                      ]}
                </span>
              )}
            />
            <Column
              title="Jenis Layanan"
              key="reg"
              width="50px"
              render={(ruangList) => (
                <span>
                  {ruangList.layananPasien === true ? "Pasien" : "Non Pasien"}
                </span>
              )}
            />

            <Column
              title="Status"
              key="reg"
              width="50px"
              render={(ruangList) => (
                <span>{ruangList.status === true ? "Aktif" : "Nonaktif"}</span>
              )}
            />

            <Column
              title="Aksi"
              key="reg"
              width="100px"
              render={(ruangList) => (
                <Space>
                  {ruangList.status === false ? (
                    <Button
                      disabled
                      type="primary"
                      size="small"
                      style={{ background: "green", borderColor: "green" }}
                      onClick={() => showModal2(ruangList.ruangId)}
                    >
                      Edit
                    </Button>
                  ) : (
                    <Button
                      type="primary"
                      size="small"
                      style={{ background: "green", borderColor: "green" }}
                      onClick={() => showModal2(ruangList.ruangId)}
                    >
                      Edit
                    </Button>
                  )}

                  {ruangList.status === false ? (
                    <Button
                      type="primary"
                      size="small"
                      style={{ background: "orange", borderColor: "white" }}
                      onClick={() => showModal3(ruangList.ruangId)}
                    >
                      Aktifkan?
                    </Button>
                  ) : (
                    <Popconfirm
                      title="Apakah Yakin?"
                      onConfirm={() => {
                        onDelete(ruangList.ruangId);
                        onRefresh(ruangList.groupLayananId);
                      }}
                      onCancel={cancelhapus}
                      okText="Ya"
                      cancelText="Tidak"
                    >
                      <Button
                        type="primary"
                        size="small"
                        style={{ background: "red", borderColor: "red" }}
                      >
                        Nonaktifkan?
                      </Button>
                    </Popconfirm>
                  )}
                </Space>
              )}
            />
          </Table>

          <Modal
            style={{ top: 20 }}
            width="50%"
            visible={visible2}
            title="Edit Ruang"
            footer={false}
            onCancel={(e) => onCancel(e)}
          >
            <Row>
              <Col span={22}>
                <Form.Item {...formItemLayout} label="Id Ruang">
                  <Input
                    value={ruangId}
                    onChange={(e) => setRuangId(e.target.value)}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="Nama Ruang">
                  <Input
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="Group Layanan">
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Group Layanan"
                    optionFilterProp="children"
                    value={groupLayananId}
                    onChange={(e) => setGroupLayananId(e)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value={1}>Rawat Inap</Option>
                    <Option value={2}>Rawat Jalan</Option>
                    <Option value={3}>IGD</Option>
                    <Option value={4}>Penunjang Medis</Option>
                    <Option value={5}>Penunjang Non Medis</Option>
                    <Option value={6}>Struktural</Option>
                    <Option value={7}>Apotik Farmasi</Option>
                  </Select>
                </Form.Item>
                <Form.Item {...formItemLayout} label="Kelas Rawat">
                  <Select
                    dataSource={kelasrawatlist}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Kelas Rawat"
                    optionFilterProp="children"
                    value={kelasRawatId}
                    onChange={(e) => setKelasRawatId(e)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {kelasrawatlist.map((d) => (
                      <Option key={d.kelasRawatId}>{d.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={onSubmit}>
                  Simpan
                </Button>
                <Button onClick={() => onCancel()}>Batal</Button>
              </Col>
            </Row>
          </Modal>

          <Modal
            style={{ top: 20 }}
            width="50%"
            visible={visible3}
            title="Aktivasi Ruang"
            footer={false}
            onCancel={(e) => onCancel(e)}
          >
            <Row>
              <Col span={22}>
                <Form.Item {...formItemLayout} label="Id Ruang" hidden={true}>
                  <Input
                    value={ruangId}
                    onChange={(e) => setRuangId(e.target.value)}
                  />
                </Form.Item>
                <Form.Item {...formItemLayout} label="Nama Ruang">
                  <Input
                    value={deskripsi}
                    onChange={(e) => setDeskripsi(e.target.value)}
                    disabled
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Group Layanan"
                  hidden={true}
                >
                  <Select
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Group Layanan"
                    optionFilterProp="children"
                    value={groupLayananId}
                    onChange={(e) => setGroupLayananId(e)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Option value={1}>Rawat Inap</Option>
                    <Option value={2}>Rawat Jalan</Option>
                    <Option value={3}>IGD</Option>
                    <Option value={4}>Penunjang Medis</Option>
                    <Option value={5}>Penunjang Non Medis</Option>
                    <Option value={6}>Struktural</Option>
                    <Option value={7}>Apotik Farmasi</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Kelas Rawat"
                  hidden={true}
                >
                  <Select
                    dataSource={kelasrawatlist}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih Kelas Rawat"
                    optionFilterProp="children"
                    value={kelasRawatId}
                    onChange={(e) => setKelasRawatId(e)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {kelasrawatlist.map((d) => (
                      <Option key={d.kelasRawatId}>{d.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button type="primary" onClick={onAktivasi}>
                  Aktivasi
                </Button>
              </Col>
            </Row>
          </Modal>
        </Card>
      </Fragment>
    </div>
  );
};

export default MasterRuang;
