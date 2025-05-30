import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Row,
  Select,
  Table,
} from "antd";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { PemeriksaanLainContext } from "../rawatjalan/context/pemeriksaancontext/PemeriksaanLainContext";
import { DeleteOutlined, SearchOutlined } from "@ant-design/icons";

const MasterTindakanLain = () => {
  const { mappingLayananPemeriksaanLain, layananpmrlain } = useContext(
    PemeriksaanLainContext
  );
  const apiku = sessionStorage.getItem("api");
  const token = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + token },
  };
  const [listpenunjanglain, setPenunjanglain] = useState([]);
  const [pelayanan, setPelayanan] = useState([]);
  const [idPenunjang, setIdPenunjang] = useState(null);
  const [deskPenunjang, setDeskPenunjang] = useState(null);
  const [idPelayanan, setIdPelayanan] = useState(null);
  const [deskripi, setDeskripsi] = useState(null);
  const [idHasil, setHasil] = useState(null);
  const [pilih, setPilih] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalAddPemeriksaan, setModalAddPemeriksaan] = useState(false);
  const formItemLayout = {
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };
  const ambilListPenunjangLain = () => {
    axios
      .get(`${apiku}/MstPenunjangLain/Lookup/%20`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPenunjanglain(res.data.result);
        } else {
          setPenunjanglain([]);
        }
      })
      .catch((err) => {
        setPenunjanglain([]);
      });
  };
  const ambilListPelayanan = (e) => {
    if (e.trim() === "") {
      setPelayanan([]);
      return;
    }
    axios
      .get(`${apiku}/MstPelayanan/Lookup/${e}/1/40`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setPelayanan(res.data.result);
        } else {
          setPelayanan([]);
        }
      })
      .catch((err) => {
        setPelayanan([]);
        console.error("Error fetching data:", err);
      });
  };
  const insertPenunjangLain = () => {
    axios
      .post(`${apiku}/MstPenunjangLain/`, dataPenunjang, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil!");
          ambilListPenunjangLain();
        } else {
          message.warning(`Gagal! - ${res.data.message}`);
        }
      })
      .catch((err) => {
        message.error("Terjadi Kesalahan!");
      });
  };

  const insertPelayanan = () => {
    axios
      .post(`${apiku}/MapingLayananPenunjangLain`, dataPelayanan, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil!");
          mappingLayananPemeriksaanLain(idPenunjang);
        } else {
          message.warning("Gagal! - " + res.data.message);
        }
      })
      .catch((err) => {
        message.error("Terjadi Kesalahan!");
      });
  };
  const deletePelayanan = (e) => {
    axios
      .delete(
        `${apiku}/MapingLayananPenunjangLain`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          data: {
            penunjangLainId: idPenunjang,
            pelayananId: e,
          },
        },
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil!");
          mappingLayananPemeriksaanLain(idPenunjang);
        } else {
          message.warning("Gagal!" + " - " + res.data.message);
        }
      })
      .catch((err) => {
        message.error("Terjadi Kesalahan!");
      });
  };
  const deletePenunjangLain = (id) => {
    axios
      .delete(`${apiku}/MstPenunjangLain/PenunjangLain/${id}`, options)
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Berhasil hapus!");
          ambilListPenunjangLain();
        } else {
          message.warning("Gagal!" + " - " + res.data.message);
        }
      })
      .catch((err) => {
        message.error("Terjadi Kesalahan!");
      });
  };
  const columns = [
    {
      title: "No",
      key: "reg",
      className: "tabeltabel2",
      width: "30px",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "ID",
      width: "30px",
      dataIndex: "hasilPenunjangId",
    },
    {
      title: "Deskripsi Tindakan",
      dataIndex: "deskripsiHasilPenunjang",
    },
    {
      title: "Aksi",
      width: "60px",
      render: (text, record, index) => (
        <>
          <Popconfirm
            title="Hapus data"
            description="Apakah anda yakin menghapus data?"
            onConfirm={() => deletePenunjangLain(record.hasilPenunjangId)}
            onCancel={() => console.log("e")}
            okText="Yes"
            cancelText="No"
          >
            <Button
              type="primary"
              danger
              size="small"
              icon={<DeleteOutlined />}
            />
          </Popconfirm>{" "}
          <Button
            type="primary"
            size="small"
            onClick={() => {
              mappingLayananPemeriksaanLain(record.hasilPenunjangId);
              setDeskPenunjang(record.deskripsiHasilPenunjang);
              setIdPenunjang(record.hasilPenunjangId);
              setPilih(record.hasilPenunjangId);
            }}
            icon={<SearchOutlined />}
          />
        </>
      ),
    },
  ];
  useEffect(() => {
    ambilListPenunjangLain();
  }, [ambilListPenunjangLain]);
  const dataPenunjang = {
    hasilPenunjangId: idPenunjang,
    deskripsiHasilPenunjang: deskripi,
    hasilId: idHasil,
    clientHost: " ",
    dateEntry: "2023-05-15T00:00:00.000Z",
    clientIP: " ",
  };
  const dataPelayanan = {
    penunjangLainId: idPenunjang,
    pelayananId: idPelayanan,
  };
  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={12}>
          <Card
            size="small"
            title="List Tindakan"
            extra={
              <Button size="small" onClick={() => setModalAdd(true)}>
                Tambah Tindakan
              </Button>
            }
          >
            <Table
              size="small"
              pagination={false}
              scroll={{ y: 470 }}
              dataSource={listpenunjanglain}
              columns={columns}
              rowClassName={(record, index) =>
                record.hasilPenunjangId === pilih ? "colorpilih" : "fontkecil"
              }
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            size="small"
            title="List Pemeriksaan"
            extra={
              <Button size="small" onClick={() => setModalAddPemeriksaan(true)}>
                Tambah Pemeriksaan
              </Button>
            }
          >
            <Table
              scroll={{ y: 300 }}
              dataSource={layananpmrlain}
              size="small"
              pagination={false}
            >
              <Table.Column
                title="No"
                key="no"
                width={30}
                render={(text, record, index) => <span>{index + 1}</span>}
              />
              <Table.Column width={100} title="Id" dataIndex="pelayananId" />
              <Table.Column title="Pelayanan" dataIndex="pelayananDesk" />
              <Table.Column
                title="Aksi"
                width={35}
                render={(text, record, index) => (
                  <Popconfirm
                    title="Hapus data"
                    description="Apakah anda yakin menghapus data?"
                    onConfirm={() => deletePelayanan(record.pelayananId)}
                    onCancel={() => console.log("e")}
                    okText="Yes"
                    cancelText="No"
                  >
                    <Button
                      type="primary"
                      danger
                      size="small"
                      icon={<DeleteOutlined />}
                    />
                  </Popconfirm>
                )}
              />
            </Table>
          </Card>
        </Col>
      </Row>
      <Modal open={modalAdd} onCancel={() => setModalAdd(false)} footer={null}>
        <Card size="small" title="Tambah Tindakan Penunjang Lain">
          <Form labelWrap labelAlign="left" colon={false} {...formItemLayout}>
            <Form.Item label="Id">
              <Input onChange={(e) => setIdPenunjang(e.target.value)} />
            </Form.Item>
            <Form.Item label="Nama Tindakan Penunjang">
              <Input onChange={(e) => setDeskripsi(e.target.value)} />
            </Form.Item>
            <Form.Item label="Kode Tindakan Penunjang">
              <Input onChange={(e) => setHasil(e.target.value)} />
            </Form.Item>
            <Button
              block
              type="primary"
              onClick={() => {
                console.log(dataPenunjang);
                insertPenunjangLain(dataPenunjang);
                setModalAdd(false);
              }}
            >
              Tambahkan
            </Button>
          </Form>
        </Card>
      </Modal>
      <Modal
        open={modalAddPemeriksaan}
        onCancel={() => setModalAddPemeriksaan(false)}
        footer={null}
      >
        <Card size="small" title="Tambah Tindakan Penunjang Lain">
          <Form labelWrap labelAlign="left" colon={false} {...formItemLayout}>
            <Form.Item label="Id">
              <Input value={idPenunjang} />
            </Form.Item>
            <Form.Item label="Nama Tindakan Penunjang">
              <Input value={deskPenunjang} />
            </Form.Item>
            <Form.Item label="Pelayanan">
              <Select
                showSearch
                notFoundContent={null}
                defaultActiveFirstOption={false}
                suffixIcon={null}
                filterOption={false}
                onSearch={(e) => ambilListPelayanan(e)}
                onChange={(e) => setIdPelayanan(e)}
                options={(pelayanan || []).map((d) => ({
                  value: d.pelayananId,
                  label: d.pelayananId + " - " + d.deskripsi,
                }))}
                placeholder="Ketik Nama Pelayanan/Pemeriksaan"
              />
            </Form.Item>
            <Button
              block
              type="primary"
              onClick={() => {
                console.log(dataPelayanan);
                insertPelayanan(dataPelayanan);
                setModalAddPemeriksaan(false);
              }}
            >
              Tambahkan
            </Button>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default MasterTindakanLain;
