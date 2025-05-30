import React, { useContext, useState } from "react";
import Iframe from "react-iframe";
import {
  Row,
  Col,
  Tree,
  Typography,
  Space,
  Spin,
  Input,
  Button,
  Modal,
  Form,
  Select,
  Table,
  Popconfirm,
  message,
  Card,
  Empty,
  DatePicker,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { PasienContext } from "../context/PasienContext";
import { PemeriksaanLainContext } from "../context/pemeriksaancontext/PemeriksaanLainContext";
// import { LoginContext } from "../context";
import { PelayananContext } from "../context/Pelayanancontext";
import { BillingContext } from "../context/BillingContext";
import dayjs from "dayjs";
const { TextArea } = Input;
const { Text, Title } = Typography;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormResumeMedis = () => {
  const norm = sessionStorage.getItem("norm");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");
  const { riwayatpasien, detailPasien } = useContext(PasienContext);
  // const { namauser } = useContext(LoginContext);
  const {
    listPemeriksaanLain,
    listpmrlain,
    insertPemeriksaanLainRM,
    noregpas,
    setNoreg,
    setID,
    setPelaksana,
    pelaksana,
    hasilpemeriksaan,
    setHasilPemeriksaan,
    listpenunjanglain,
    kodehasil,
    setkodeHasil,
    tanggal,
    setTanggal,
    deletePemeriksaanLain,
    setRuangPasien,
    ruangpasien,
    setPelayananId,
    pelayananId,
    mappingLayananPemeriksaanLainByPelayananId,
    setListPemeriksaanLain,
    user,
    setUser,
  } = useContext(PemeriksaanLainContext);
  const {
    getResumeMedis,
    printResumeMedis,
    loadDelay,
    setloadDelay,
    getPrintPemLain,
  } = useContext(PrintOutContext);
  const { dokterall } = useContext(PelayananContext);
  const { detailBilling, billing, setBilling } = useContext(BillingContext);
  const [modalopen, setModalOpen] = useState(false);
  const [noreg, setNoregPilih] = useState(null);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datapemeriksaanlain = {
    // noID: id,
    registrasiId: noregpas,
    tanggal: tanggal,
    ruangId: ruangpasien,
    kodeHasil: kodehasil,
    pelayananId: pelayananId,
    hasilPemeriksaan: hasilpemeriksaan,
    pelaksanaId: pelaksana,
    userID: user,
    clientHost: host,
    clientIp: ip,
  };
  const column = [
    {
      title: "Pemeriksaan",
      dataIndex: "deskripsiHasilPenunjang",
      key: "pemeriksaan",
    },
    {
      title: "Tanggal",
      key: "tanggal",
      // render: (text, record) => record.tanggal.substring(0, 10),
      render: (text, record) => record.tanggal,
    },
    {
      title: "Pelaksana",
      dataIndex: "pelaksanaDesk",
      key: "pelaksana",
    },
    {
      title: "Hasil Pemeriksaan",
      dataIndex: "hasilPemeriksaan",
      key: "hasil",
    },
    {
      title: "Action",
      render: (_e, record) => (
        <span>
          <Space>
            <Button
              size="small"
              type="primary"
              onClick={(e) => {
                setHasilPemeriksaan(record.hasilPemeriksaan);
                setID(record.noID);
                setkodeHasil(record.kodeHasil);
                setPelaksana(record.pelaksanaId);
                setRuangPasien(record.ruangId);
                setUser(record.userID);
                setPelayananId(record.pelayananId);
                if (record.tanggal === null) {
                  setTanggal(dayjs());
                } else {
                  setTanggal(record.tanggal);
                }
                console.log(record);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              style={{ backgroundColor: "#bae637", borderColor: "#bae637" }}
              onClick={() =>
                getPrintPemLain(record.kodeHasil, record.registrasiId)
              }
            >
              Cetak
            </Button>
            <Popconfirm
              title="Anda Yakin Dihapus ?"
              onConfirm={(e) =>
                deletePemeriksaanLain(record.registrasiId, record.kodeHasil)
              }
              onCancel={() => message.warning("Batal Dihapus")}
              okText="Ya"
              cancelText="Tidak"
            >
              <Button size="small" danger type="primary">
                Hapus
              </Button>
            </Popconfirm>
          </Space>
        </span>
      ),
    },
  ];

  const columnbilling = [
    {
      title: "No.",
      key: "reg",
      width: "30px",
      fixed: "left",
      render: (_e, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Kode",
      width: "55px",
      fixed: "left",
      render: (_e, record, index) => <span>{record.pelayananId}</span>,
    },
    {
      title: "Pelayanan",
      width: "400px",
      render: (_e, record, index) => <span>{record.pelayananDesk}</span>,
    },
    {
      title: "Jumlah",
      width: "55px",
      render: (_e, record, index) => <span>{record.jumlah}</span>,
    },
    {
      title: "Biaya Pelayanan",
      width: "150px",
      render: (_e, record, index) => (
        <span>
          Rp.{" "}
          {record.biayaPelayanan.toLocaleString("id-id", {
            minimumFractionDigits: 2,
          })}
        </span>
      ),
    },
    {
      title: "Total Biaya",
      width: "150px",
      render: (_e, record, index) => (
        <span>
          Rp.{" "}
          {(
            parseInt(record.biayaPelayanan) * parseInt(record.jumlah)
          ).toLocaleString("id-id", { minimumFractionDigits: 2 })}
        </span>
      ),
    },
    {
      title: "Nama Penjamin",
      width: "150px",
      render: (_e, record, index) => <span>{record.pembayaranDesk}</span>,
    },
    {
      title: "Pemeriksa",
      width: "250px",
      render: (_e, record, index) => <span>{record.pemeriksaDesk}</span>,
    },
    {
      title: "Unit",
      width: "180px",
      render: (_e, record, index) => <span>{record.ruangDesk}</span>,
    },
    {
      title: "Tanggal",
      width: "80px",
      render: (_e, record, index) => <span>{record.tanggal}</span>,
    },
    {
      title: "User",
      width: "140px",
      render: (_e, record, index) => <span>{record.userId}</span>,
    },
    {
      title: "Action",
      width: "70px",
      fixed: "right",
      render: (_e, record) => (
        <span>
          {record.pelayananId.includes("RJM") ? (
            <></>
          ) : (
            <Button
              size="small"
              type="primary"
              onClick={(e) => {
                mappingLayananPemeriksaanLainByPelayananId(record.pelayananId);
                setRuangPasien(record.ruangRawatId);
                setPelaksana(record.pemeriksaId);
                setPelayananId(record.pelayananId);
                setNoreg(record.registrasiId);
                setTanggal(record.tanggal);
                console.log(record);
              }}
            >
              Tambah
            </Button>
          )}
        </span>
      ),
    },
  ];

  return (
    <div>
      <Modal
        title="Isi Penunjang Lain"
        open={modalopen}
        width={1000}
        onOk={() => {
          setHasilPemeriksaan(null);
          setUser(null);
          setID(null);
          setkodeHasil(null);
          setPelaksana(null);
          setModalOpen(false);
          setNoreg(null);
          setBilling([]);
          setListPemeriksaanLain([]);
        }}
        onCancel={() => {
          setHasilPemeriksaan(null);
          setUser(null);
          setID(null);
          setkodeHasil(null);
          setPelaksana(null);
          setModalOpen(false);
          setNoreg(null);
          setBilling([]);
          setListPemeriksaanLain([]);
        }}
      >
        <Form {...formItemLayout}>
          <Form.Item
            label="No. Registrasi"
            labelAlign="left"
            style={{ marginBottom: 0 }}
          >
            <Select
              showSearch
              value={noreg}
              placeholder="Pilih No. Registrasi"
              optionFilterProp="children"
              onSelect={(e) => {
                setNoreg(e);
                listPemeriksaanLain(e);
                detailPasien(e);
                detailBilling(e);
                setNoregPilih(e);

                setHasilPemeriksaan(null);
                setUser(null);
                setID(null);
                setkodeHasil(null);
                setPelaksana(null);
                // syncBillKHS(e);
              }}
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
              options={riwayatpasien.map((b) => ({
                value: b.RegistrasiId,
                label: b.RegistrasiId,
              }))}
            />
          </Form.Item>
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
              locale={{ emptyText: <Empty description={false} /> }}
              bordered
              pagination={false}
              dataSource={billing}
              columns={columnbilling}
              size="small"
              rowKey="reg"
              scroll={{ x: 1000, y: 147 }}
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
                      <th>Total</th>
                      <td className="column-money, tabeltabel">
                        <Text type="danger">
                          Rp.{" "}
                          {total.toLocaleString("id-id", {
                            minimumFractionDigits: 2,
                          })}
                        </Text>
                      </td>
                    </tr>
                  </>
                );
              }}
            />
          </Card>
          <Card
            title="Penunjang Lain"
            headStyle={{ fontWeight: "bolder", backgroundColor: "#fff0f6" }}
            size="small"
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Table dataSource={listpmrlain} size="small" columns={column} />
          </Card>
          <Card
            title="Isi Penunjang Lain"
            headStyle={{ fontWeight: "bolder", backgroundColor: "#fff0f6" }}
            size="small"
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Form.Item labelAlign="left" label="Tanggal">
              <Row>
                <DatePicker
                  value={dayjs(tanggal)}
                  onChange={(date, dateString) => setTanggal(dateString)}
                />
                {"    "}
                <div
                  style={{
                    color: "red",
                    alignContent: "center",
                    fontWeight: "bold",
                  }}
                >
                  *Jangan lupa cek kembali sesuaikan tanggal !
                </div>
              </Row>
            </Form.Item>
            <Form.Item labelAlign="left" label="Jenis Periksa">
              <Select
                dataSource={listpenunjanglain}
                showSearch
                value={kodehasil}
                style={{ width: "100%" }}
                placeholder="Pilih Pelayanan"
                optionFilterProp="children"
                onChange={(e) => {
                  setkodeHasil(e);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {listpenunjanglain.map((p) => (
                  <Option key={p.hasilPenunjangId}>
                    {p.deskripsiHasilPenunjang}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item labelAlign="left" label="Pelaksana">
              <Select
                dataSource={dokterall}
                showSearch
                value={pelaksana}
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => setPelaksana(e)}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {dokterall.map((p) => (
                  <Option key={p.dokterId}>
                    {p.dokterId + " - " + p.namaDokter}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item labelAlign="left" label="Hasil Pemeriksaan">
              <TextArea
                rows={8}
                value={hasilpemeriksaan}
                onChange={(e) => setHasilPemeriksaan(e.target.value)}
              />
            </Form.Item>
            <Form.Item labelAlign="left" label="User">
              <Input value={user} onChange={(e) => setUser(e.target.value)} />
            </Form.Item>
          </Card>
        </Form>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => {
                insertPemeriksaanLainRM(datapemeriksaanlain);
                console.log(datapemeriksaanlain);
              }}
            >
              Simpan
            </Button>
          </Col>
        </Row>
      </Modal>
      <Spin spinning={loadDelay}>
        <Row>
          <Col span={4}>
            <Text keyboard>Data Resume Medis Pasien</Text>
          </Col>
          <Col span={20} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => {
                setModalOpen(true);
                setBilling([]);
              }}
            >
              Isi Penunjang Lain
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={3}>
            <Space direction="vertical">
              <Title level={3} style={{ marginBottom: "0", marginTop: "0" }}>
                {namaPasien}
              </Title>
              <Text code style={{ marginBottom: "0", marginTop: "0" }}>
                {norm}
              </Text>
              <Tree
                height={400}
                defaultExpandAll
                showLine
                switcherIcon={<DownOutlined />}
                onSelect={(e) => {
                  setloadDelay(true);
                  getResumeMedis(norm, e[0]);
                }}
                treeData={riwayatpasien.map((b) => ({
                  title: b.RegistrasiId,
                  key: b.RegistrasiId,
                }))}
              />
            </Space>
          </Col>
          <Col span={21}>
            <Iframe
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printResumeMedis}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          </Col>
        </Row>
      </Spin>
    </div>
  );
};

export default FormResumeMedis;
