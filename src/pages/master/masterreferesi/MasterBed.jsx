import React, { useContext, useState, useRef } from "react";
import {
  Button,
  Card,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Input,
  Modal,
  Row,
  Select,
  Space,
  Table,
  Popconfirm,
  message,
  AutoComplete,
} from "antd";
import Search from "antd/lib/input/Search";
import { MasterBedContext } from "../context/masterreferensi/MasterBedContext";
import { MasterRuangContext } from "../context/masterreferensi/MasterRuangContext";
import { getDataDetail } from "@microsoft/signalr/dist/esm/Utils";
import { set } from "lodash";

const { Option } = Select;
const layout = {
  labelCol: { span: 4 },
};

const text = "Yakin di Hapus?";

const MasterBed = () => {
  const {
    insertBed,
    insertBed2,
    getJenisBed,
    jenisbedList,
    getGolonganPasien,
    golpasienList,
    bedList,
    getBed,
    setLoading,
    loading,
    setLoadingDetail,
    loadingdetail,
    warnarow,
    setWarnaRow,
    getBedDetail,
    beddetail,
    form,
    setForm,
    setBedID,
    bedid,
    setNoSK,
    nosk,
    setRuangID,
    ruangid,
    setKelasRawatID,
    kelasrawatid,
    setJenisBedID,
    jenisbedid,
    setGolonganPasienID,
    golonganpasienid,
    setKapasitas,
    kapasitas,
    setKapasitasMax,
    kapasitasmax,
    getCurrentTime,
    ruangList,
    ruangList2,
    getRuang,
    deleteBed,
    refresh,
    setRefresh,
  } = useContext(MasterBedContext);

  const { getKelasRawat, kelasrawatlist } = useContext(MasterRuangContext);

  const [modaledit, setModalEdit] = useState(false);
  const [modaltambah, setModalTambah] = useState(false);
  const [tambah, setTambah] = useState(false);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  const databed = {
    bedId: bedid,
    noSK: nosk,
    ruangId: ruangid,
    kelasRawatId: kelasrawatid,
    kapasitas: parseInt(kapasitas),
    kapasitasMax: parseInt(kapasitasmax),
    jenisBedId: jenisbedid,
    golonganPasienId: golonganpasienid,
    status: true,
    clientHost: host,
    dateEntry: getCurrentTime(),
    clientIp: ip,
  };

  const databed2 = {
    noSK: nosk,
    ruangId: ruangid,
    kelasRawatId: kelasrawatid,
    kapasitas: parseInt(kapasitas),
    kapasitasMax: parseInt(kapasitasmax),
    jenisBedId: jenisbedid,
    golonganPasienId: golonganpasienid,
    status: true,
    clientHost: host,
    dateEntry: getCurrentTime(),
    clientIp: ip,
  };

  const columns = [
    {
      title: "Nama Kamar",
      dataIndex: "namaKamar",
    },
    {
      title: "Kelas Rawat",
      dataIndex: "kelasRawat",
    },
    {
      title: "Kapasitas",
      dataIndex: "kapasitas",
    },
  ];

  const setAmbil = (e) => {
    getBed(e);
    // getBedDetail(e1, e2);
    setLoading(true);
    setForm(false);
    setRefresh(e);
  };

  const handleDelete = () => {
    deleteBed(bedid, kelasrawatid);
  };

  const openModal = () => {
    setModalEdit(true);
    getRuang();
    getJenisBed();
    getGolonganPasien();
    getKelasRawat();
  };

  const openModaltambah = () => {
    setModalTambah(true);
    getRuang();
    getJenisBed();
    getGolonganPasien();
    getKelasRawat();
  };

  const handleCancel = () => {
    setModalEdit(false);
  };
  const handleCancel2 = () => {
    setModalTambah(false);
  };

  const handleOk = () => {
    insertBed(databed);
    setModalEdit(false);
  };

  const handleOk2 = () => {
    insertBed2(databed2);
    // console.log("wut?", databed2);
    setModalTambah(false);
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card
            size="small"
            style={{ margin: 3 }}
            title="Master Bed"
            headStyle={{ fontWeight: "bold", fontSize: "14" }}
            // extra={
            //   tambah === true ? (
            //     <Space>
            //       <Button
            //         type="primary"
            //         onClick={openModaltambah}
            //         style={{
            //           backgroundColor: "deepskyblue",
            //           borderColor: "deepskyblue",
            //         }}
            //       >
            //         Tambah
            //       </Button>
            //     </Space>
            //   ) : (
            //     " "
            //   )
            // }
          >
            <div style={{ marginLeft: "81.75%" }}>
              <Col span={50}>
                {/* <Search
                  placeholder="Cari Nama Kamar"
                  enterButton
                  onSearch={(e) => {
                    setAmbil(e);
                    // getListJnsKelamin();
                    // getListKategoriPelaksana();
                  }}
                /> */}
                <Select
                  dataSource={ruangList2}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Kamar"
                  optionFilterProp="children"
                  // value={kelasRawatId}
                  onChange={(e) => {
                    setTambah(true);
                    setAmbil(e);
                  }}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {ruangList2.map((d) => (
                    <Option key={d.ruangId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Col>
            </div>
            <Table
              hidden={true}
              pagination={false}
              scroll={{ y: 285 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setWarnaRow(rowIndex);
                    getBedDetail(record.bedId, record.kelasRawatId);
                    setForm(true);
                    setLoadingDetail(true);
                    // setKlsrwtId(record.kelasRawatId);
                    // setPegawaiID(record.pegawaiId);
                    // getListAgama();
                    // getListPendidikan();
                    // getListSttKawin();
                    // getListJnsKelamin();
                    // getListKategoriPelaksana();
                    // getListTenagaKesehatan();
                    // getListDesa();
                    // getByDesaid(record.desaId);
                  }, // click row
                };
              }}
              loading={loading}
              columns={columns}
              dataSource={bedList}
              rowKey="bedId"
              size="small"
              rowClassName={(record, rowIndex) =>
                rowIndex === warnarow ? "bgcolorsuccess" : null
              }
            />
            {tambah === true ? (
              // <div style={{ marginLeft: "91.75%", marginTop: "10px" }}>
              <Space style={{ float: "right", marginTop: "10px" }}>
                <Button
                  type="primary"
                  onClick={openModaltambah}
                  style={{
                    backgroundColor: "deepskyblue",
                    borderColor: "deepskyblue",
                  }}
                >
                  Tambah
                </Button>
              </Space>
            ) : (
              // </div>
              " "
            )}
          </Card>
          {form ? (
            <Card size="small" style={{ margin: 3 }} loading={loadingdetail}>
              <Descriptions
                title="Detail Bed"
                bordered
                size="small"
                extra={
                  <Space>
                    <a danger type="secondary" onClick={() => setForm(false)}>
                      X
                    </a>
                  </Space>
                }
              >
                <Descriptions.Item label="Id Ruang">
                  {beddetail.ruangId}
                </Descriptions.Item>
                <Descriptions.Item label="Nama Kamar">
                  {beddetail.namaKamar}
                </Descriptions.Item>
                <Descriptions.Item label="Kelas Rawat">
                  {beddetail.kelasRawat}
                </Descriptions.Item>
                <Descriptions.Item label="Kapasitas">
                  {beddetail.kapasitas}
                </Descriptions.Item>
                <Descriptions.Item label="Jenis Bed">
                  {beddetail.JenisBed}
                </Descriptions.Item>
                <Descriptions.Item label="Golongan Pasien">
                  {beddetail.golonganPasien}
                </Descriptions.Item>
              </Descriptions>
              <Space style={{ float: "right", marginTop: "10px" }}>
                <Button
                  type="primary"
                  onClick={openModal}
                  style={{
                    backgroundColor: "green",
                    borderColor: "green",
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  placement="topLeft"
                  title={text}
                  onConfirm={handleDelete}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button danger type="primary">
                    Delete
                  </Button>
                </Popconfirm>
              </Space>
            </Card>
          ) : (
            false
          )}
        </Col>
      </Row>

      {/* Modal Tambah */}
      <Modal
        centered={true}
        title="Tambah Bed"
        visible={modaltambah}
        onOk={handleOk2}
        onCancel={handleCancel2}
        width="50%"
      >
        <Row>
          <Col span={22}>
            <Form.Item {...layout} label="No SK">
              <Input onChange={(e) => setNoSK(e.target.value)} />
            </Form.Item>
            <Form.Item {...layout} label="Ruang">
              <Select
                disabled
                className="ant-select-selection"
                dataSource={ruangList}
                value={refresh}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Ruang"
                optionFilterProp="children"
                onChange={(e) => {
                  setRuangID(e);
                  setRefresh(
                    ruangList.map((d) => d.deskripsi)[
                      ruangList.map((d) => d.ruangId).indexOf(String(e))
                    ]
                  );
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {ruangList.map((d) => (
                  <Option key={d.ruangId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item {...layout} label="Kelas Rawat">
              <Select
                className="ant-select-selection"
                dataSource={kelasrawatlist}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Kelas Rawat"
                optionFilterProp="children"
                onChange={(e) => setKelasRawatID(e)}
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
            <Form.Item {...layout} label="Jenis Bed">
              <Select
                className="ant-select-selection"
                dataSource={jenisbedList}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Jenis Bed"
                optionFilterProp="children"
                onChange={(e) => setJenisBedID(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {jenisbedList.map((d) => (
                  <Option key={d.jenisBedId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item {...layout} label="Golongan Pasien">
              <Select
                className="ant-select-selection"
                dataSource={golpasienList}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Golongan Pasien"
                optionFilterProp="children"
                onChange={(e) => setGolonganPasienID(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {golpasienList.map((d) => (
                  <Option key={d.golonganPasienId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item {...layout} label="Kapasitas">
              <Input
                type="number"
                onChange={(e) => setKapasitas(e.target.value)}
              />
            </Form.Item>
            <Form.Item {...layout} label="Kapasitas Max">
              <Input
                type="number"
                onChange={(e) => setKapasitasMax(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>

      {/* Modal Edit */}
      <Modal
        centered={true}
        title="Tambah Bed"
        visible={modaledit}
        onOk={handleOk}
        onCancel={handleCancel}
        width="50%"
      >
        <Row>
          <Col span={22}>
            <Form.Item {...layout} label="No SK">
              <Input value={nosk} onChange={(e) => setNoSK(e.target.value)} />
              <Input
                value={bedid}
                type="hidden"
                onChange={(e) => setBedID(e.target.value)}
              />
            </Form.Item>
            <Form.Item {...layout} label="Ruang">
              <Select
                className="ant-select-selection"
                dataSource={ruangList}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Ruang"
                optionFilterProp="children"
                value={ruangid}
                onChange={(e) => {
                  setRuangID(e);
                  setRefresh(
                    ruangList.map((d) => d.deskripsi)[
                      ruangList.map((d) => d.ruangId).indexOf(String(e))
                    ]
                  );
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {ruangList.map((d) => (
                  <Option key={d.ruangId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item {...layout} label="Kelas Rawat">
              <Select
                className="ant-select-selection"
                dataSource={kelasrawatlist}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Kelas Rawat"
                optionFilterProp="children"
                value={kelasrawatid}
                onChange={(e) => setKelasRawatID(e)}
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
            <Form.Item {...layout} label="Jenis Bed">
              <Select
                className="ant-select-selection"
                dataSource={jenisbedList}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Jenis Bed"
                optionFilterProp="children"
                value={jenisbedid}
                onChange={(e) => setJenisBedID(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {jenisbedList.map((d) => (
                  <Option key={d.jenisBedId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item {...layout} label="Golongan Pasien">
              <Select
                className="ant-select-selection"
                dataSource={golpasienList}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Golongan Pasien"
                optionFilterProp="children"
                value={golonganpasienid}
                onChange={(e) => setGolonganPasienID(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {golpasienList.map((d) => (
                  <Option key={d.golonganPasienId}>{d.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item {...layout} label="Kapasitas">
              <Input
                type="number"
                value={kapasitas}
                onChange={(e) => setKapasitas(e.target.value)}
              />
            </Form.Item>
            <Form.Item {...layout} label="Kapasitas Max">
              <Input
                type="number"
                value={kapasitasmax}
                onChange={(e) => setKapasitasMax(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default MasterBed;
