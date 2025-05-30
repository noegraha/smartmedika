import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Table,
  Col,
  Row,
  Space,
  DatePicker,
  Empty,
  Select,
  Card,
  message,
  Spin,
} from "antd";
import Iframe from "react-iframe";
import LogBookPerawat from "./LogBookPerawat";
import dayjs from "dayjs";
import { LoginContext } from "../rawatjalan/context";
import { LogBookAskepContext } from "../master/context/masteraskep/LogBookAskepContext";
import { MasterPegawaiContext } from "../master/context/masterpegawai/MasterPegawaiContext";
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { Option } = Select;
const { TextArea } = Input;

const FormKegiatanPegawai = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser } = useContext(LoginContext);
  const {
    panggolByBulan,
    setpanggolByBulan,
    pegawailist,
    getListPegawaisSkey,
    pegawaidetail,
    getPegawaiById,
    warnaPilih,
    setwarnaPilih,
    getpegawaidetail,
  } = useContext(MasterPegawaiContext);

  const [bulanPilih, setbulanPilih] = useState("");
  const [tahunpilih, settahunpilih] = useState("");
  const [jenispilih, setjenispilih] = useState("");
  const [karuPilih, setkaruPilih] = useState("");

  const {
    kegiatanId,
    setKegiatanId,
    tanggalKegiatan,
    setTanggalKegiatan,
    deskripsi,
    setDeskripsi,
    permenpanId,
    setPermenpanId,
    registrasiId,
    setRegistrasiId,
    tableData,
    setTableData,
    visible,
    setModalVisible,
    visibleCetak,
    setvisibleCetak,
    insertKegiatanPegawai,
    getKegiatanPerawat,
    listKegiatanPerawat,
    setlistKegiatanPerawat,
    getprintPenilaian,
    printPenilaian,
    setprintPenilaian,
    loading,
    setloading,
    listButirAK,
    setlistButirAK,
    getButirAK,
    delKegiatan,
  } = useContext(LogBookAskepContext);

  const dataKEgiatan = {
    kegiatanId: kegiatanId,
    tanggalKegiatan: dayjs(tanggalKegiatan).format("YYYY-MM-DDTHH:mm"),
    deskripsi: deskripsi,
    permenpanId: permenpanId,
    registrasiId: registrasiId,
    username: namauser,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientIP: ip,
  };

  const columns = [
    {
      title: "No",
      key: "reg",
      className: "tabeltabel2",
      width: "5%",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "Tanggal",
      width: "10%",
      render: (listKegiatanPerawat) => (
        <span>
          {dayjs(listKegiatanPerawat.TanggalKegiatan).format("DD-MM-YYYY")}
        </span>
      ),
    },
    {
      width: "20%",
      title: "Objek",
      dataIndex: "RegistrasiId",
    },
    {
      width: "30%",
      title: "Deskripsi",
      dataIndex: "Deskripsi",
    },
    {
      width: "30%",
      title: "Butir Permenpan",
      dataIndex: "Permenpan",
    },
    {
      width: "5%",
      title: "Aksi",
      render: (text, record) => (
        <Space>
          <Button
            onClick={() => {
              getButirAK(
                panggolByBulan.Jenjang,
                panggolByBulan.KategoriGolongan
              );
              setKegiatanId(record.KegiatanId);
              setTanggalKegiatan(dayjs(record.TanggalKegiatan));
              setDeskripsi(record.Deskripsi);
              setPermenpanId(record.PermenpanId);
              setRegistrasiId(record.RegistrasiId);
              setModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button
            type="primary"
            danger
            size="small"
            onClick={() => {
              delKegiatan(
                record.KegiatanId,
                namauser,
                dayjs(record.TanggalKegiatan).format("MM"),
                dayjs(record.TanggalKegiatan).format("YYYY")
              );
            }}
          >
            Hapus
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getpegawaidetail(namauser, dayjs().format("MM-YYYY"));
    getKegiatanPerawat(namauser, dayjs().format("MM"), dayjs().format("YYYY"));
    setbulanPilih(dayjs());
  }, []);

  return (
    <div>
      <Card size="small">
        <Row>
          <Col span={12}>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  getButirAK(
                    panggolByBulan.Jenjang,
                    panggolByBulan.KategoriGolongan
                  );
                  setModalVisible(true);
                  setKegiatanId(0);
                }}
              >
                Tambah
              </Button>
            </Space>
          </Col>
          <Col span={9}>
            <DatePicker
              style={{ width: "100%" }}
              picker="month"
              format="MM-YYYY"
              placeholder="Pilih Bulan Untuk Melihat Kegiatan"
              value={bulanPilih}
              onChange={(e) => {
                setbulanPilih(e);
                getKegiatanPerawat(
                  namauser,
                  dayjs(e).format("MM"),
                  dayjs(e).format("YYYY")
                );
              }}
            />
          </Col>
          <Col span={3} style={{ textAlign: "left" }}>
            <Button
              style={{ backgroundColor: "green", color: "white" }}
              onClick={() => {
                setvisibleCetak(true);
                getListPegawaisSkey("%20");
              }}
            >
              Lihat Logbook
            </Button>
          </Col>
        </Row>

        <Table
          bordered
          locale={{ emptyText: <Empty description="Data Asuhan Kosong" /> }}
          pagination={{ pageSize: 20 }}
          dataSource={listKegiatanPerawat}
          size="small"
          columns={columns}
        />

        <Modal
          style={{ marginTop: "5px" }}
          width="80%"
          // centered={true}
          open={visible}
          title="Form Input Kegiatan Pegawai"
          onCancel={() => {
            setModalVisible(false);
          }}
          footer={[
            <Button
              key="cancel"
              onClick={() => {
                setModalVisible(false);
              }}
            >
              Batal
            </Button>,
            <Button
              key="submit"
              type="primary"
              onClick={() => {
                console.log(dataKEgiatan);
                insertKegiatanPegawai(dataKEgiatan);
              }}
            >
              Simpan
            </Button>,
          ]}
        >
          <Form.Item
            label="Akun"
            {...formItemLayout}
            style={{ marginBottom: 2 }}
          >
            <Input
              readOnly
              placeholder="..."
              value={namauser}
              // onChange={(e) => setRegistrasiId(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Tanggal Kegiatan"
            {...formItemLayout}
            style={{ marginBottom: 2 }}
          >
            <DatePicker
              style={{ width: "100%" }}
              format="DD-MM-YYYY"
              placeholder="..."
              value={tanggalKegiatan}
              onChange={(e) => {
                setTanggalKegiatan(e);
              }}
            />
          </Form.Item>
          <Form.Item
            label="Objek/Sasaran"
            {...formItemLayout}
            style={{ marginBottom: 2 }}
          >
            <Input
              placeholder="..."
              value={registrasiId}
              onChange={(e) => setRegistrasiId(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Deskripsi"
            {...formItemLayout}
            style={{ marginBottom: 2 }}
          >
            <TextArea
              rows={2}
              placeholder="..."
              value={deskripsi}
              onChange={(e) => setDeskripsi(e.target.value)}
            />
          </Form.Item>
          <Form.Item
            label="Butir PAK"
            {...formItemLayout}
            style={{ marginBottom: 2 }}
          >
            <Select
              value={permenpanId}
              dataSource={listButirAK}
              onChange={(e) => {
                setPermenpanId(e);
              }}
              showSearch
              style={{ width: "100%" }}
              placeholder="..."
              optionFilterProp="children"
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {listButirAK.map((d) => (
                <Option key={d.PermenpanId}>{d.Deskripsi}</Option>
              ))}
            </Select>
          </Form.Item>
        </Modal>

        <Modal
          style={{ marginTop: "5px" }}
          width="70%"
          // centered={true}
          open={visibleCetak}
          title="Daftar Kegiatan Perawat"
          onCancel={() => {
            setvisibleCetak(false);
            // settahunpilih("");
            // setjenispilih("");
            setkaruPilih("");
            setprintPenilaian("");
          }}
          footer={false}
        >
          <Row>
            <Col span={24}>
              <Form.Item
                label="Pilih Triwulan/Karu"
                {...formItemLayout}
                style={{ marginBottom: 2 }}
              >
                <Row>
                  <Col span={4}>
                    <DatePicker
                      onChange={(date, dateString) => {
                        settahunpilih(dateString.split("-").shift());
                        dateString.split("-").pop() === "Q1"
                          ? setjenispilih("1")
                          : dateString.split("-").pop() === "Q2"
                          ? setjenispilih("2")
                          : dateString.split("-").pop() === "Q3"
                          ? setjenispilih("3")
                          : dateString.split("-").pop() === "Q4"
                          ? setjenispilih("4")
                          : setjenispilih("");
                      }}
                      picker="quarter"
                      style={{ width: "95%" }}
                    />
                  </Col>
                  <Col span={10}>
                    <Select
                      value={karuPilih}
                      dataSource={pegawailist.filter(
                        (item) =>
                          item.PegawaiId !== null && item.UserId !== null
                      )}
                      onChange={(e) => {
                        setkaruPilih(e);
                        setprintPenilaian("");
                        console.log(e);
                      }}
                      showSearch
                      style={{ width: "95%" }}
                      placeholder="..."
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {pegawailist
                        .filter(
                          (item) =>
                            item.PegawaiId !== null && item.UserId !== null
                        )
                        .reduce((unique, item) => {
                          if (!unique.some((d) => d.UserId === item.UserId)) {
                            unique.push(item);
                          }
                          return unique;
                        }, [])
                        .map((d) => (
                          <Option key={d.UserId}>{d.Nama}</Option>
                        ))}
                    </Select>
                  </Col>
                  <Col span={6} style={{ textAlign: "center" }}>
                    <Space>
                      <Button
                        style={{ backgroundColor: "green", color: "white" }}
                        onClick={() => {
                          if (jenispilih === "" || karuPilih === "") {
                            message.warning(
                              "Silahkan Pilih Jenis Laporan/Kepala Ruang!"
                            );
                          } else {
                            console.log(
                              "LOGBOOKSPMK",
                              namauser + "-" + dayjs(tahunpilih).format("YYYY"),
                              karuPilih + "-" + jenispilih
                            );
                            // setprintPenilaian("");
                            getprintPenilaian(
                              "LOGBOOKSPMK",
                              namauser + "-" + dayjs(tahunpilih).format("YYYY"),
                              karuPilih + "-" + jenispilih
                            );
                          }
                        }}
                      >
                        Cetak SPMK
                      </Button>
                      <Button
                        style={{ backgroundColor: "green", color: "white" }}
                        onClick={() => {
                          if (jenispilih === "" || karuPilih === "") {
                            message.warning(
                              "Silahkan Pilih Jenis Laporan/Kepala Ruang!"
                            );
                          } else {
                            console.log(
                              "LOGBOOKSPMKDETAIL",
                              namauser + "-" + dayjs(tahunpilih).format("YYYY"),
                              karuPilih + "-" + jenispilih
                            );
                            // setprintPenilaian("");
                            getprintPenilaian(
                              "LOGBOOKSPMKDETAIL",
                              namauser + "-" + dayjs(tahunpilih).format("YYYY"),
                              karuPilih + "-" + jenispilih
                            );
                          }
                        }}
                      >
                        Cetak Logbook
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Spin spinning={loading} tip="Mohon Tunggu...">
                <Iframe
                  loading={loading}
                  onLoad={() => {
                    setloading(false);
                  }}
                  url={printPenilaian}
                  height="650px"
                  width="100%"
                  id="myId"
                  className="myClassname"
                  display="initial"
                  position="relative"
                />
              </Spin>
            </Col>
          </Row>
        </Modal>
      </Card>
    </div>
  );
};

export default FormKegiatanPegawai;
