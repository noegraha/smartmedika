import {
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Form,
  Input,
  message,
  Modal,
  Result,
  Row,
  Select,
  Space,
  Spin,
  Table,
} from "antd";
import dayjs from "dayjs";
import React, { useState, useContext } from "react";
import { PasienContext } from "../context/PasienContext";
import { PemeriksaanLainContext } from "../context/pemeriksaancontext/PemeriksaanLainContext";
import {
  CloudDownloadOutlined,
  CopyOutlined,
  ProfileTwoTone,
  SmileOutlined,
} from "@ant-design/icons";
import ReactQuill from "react-quill";
import ReactHtmlParser from "react-html-parser";
import { PelayananContext } from "../context/Pelayanancontext";
import { Link } from "react-router-dom/cjs/react-router-dom";
const { TextArea } = Input;
const { Option } = Select;
const FormProtokolKemo = () => {
  const {
    insertLaporanKemo,
    getMstProtokolKemo,
    insertProtokolKemo,
    getRiwProtokol,
    idKemo,
    terapi,
    setTerapi,
    listOrderObat,
    listValidObat,
    listMstProtokol,
    listRiwProtokol,
    drProtokol,
    setdrProtokol,
    idProtokol,
    setidProtokol,
    obatProtokol,
    setobatProtokol,
    prosedurProtokol,
    userProtokol,
    ruangProtokol,
    setprosedurProtokol,
    tabProtKemo,
    tglDashboard,
    tempRegId,
    tempPxId,
    spListObat,
    spProtokol,
    spTbRiwProtokol,
    getDataObat,
  } = useContext(PemeriksaanLainContext);
  const { pelayanan, detpel, detailPelayanan, dokterall } =
    useContext(PelayananContext);
  const { curpas, ruangasal, tanggal } = useContext(PasienContext);
  const [modal, setModal] = useState(false);
  const [mdRiwProtokol, setmdRiwProtokol] = useState(false);
  const namauser = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const isiterapi = {
    id: idKemo,
    registrasiId: curpas.registrasiId,
    pasienId: curpas.pasienId,
    tglPemeriksaan: dayjs(tanggal).format(),
    ruangId: ruangasal,
    terapi: terapi,
    totalSiklus: 1,
    userId: namauser,
    clientHost: host,
    clientIP: ip,
  };
  const columnsa = [
    {
      title: "NAMA BARANG",
      dataIndex: "NAMABARANG",
      // key: "NAMABARANG",
    },
    {
      title: "QTY BARANG",
      dataIndex: "QTYBAR",
      // key: "QTYBAR",
      align: "center",
    },
    {
      title: "SATUAN",
      dataIndex: "SATUAN",
      // key: "SATUAN",
      align: "center",
    },
    {
      title: "ATURAN PAKAI",
      dataIndex: "KODEATRPK",
      // key: "KODEATRPK",
      align: "center",
    },
  ];

  const columnsb = [
    {
      title: "NAMA BARANG",
      dataIndex: "NAMABARANG",
      // key: "NAMABARANG",
    },
    {
      title: "QTY BARANG",
      dataIndex: "QTYBAR",
      // key: "QTYBAR",
      align: "center",
    },
    {
      title: "SATUAN",
      dataIndex: "SATRSP",
      // key: "SATRSP",
      align: "center",
    },
    {
      title: "ATURAN PAKAI",
      dataIndex: "KODEATRPK",
      // key: "KODEATRPK",
      align: "center",
    },
  ];

  const coltbRiwayatProtokol = [
    {
      title: "No.Registrasi",
      dataIndex: "RegistrasiId",
      key: "RegistrasiId",
      align: "center",
      width: 100,
    },
    {
      title: <div style={{ textAlign: "center" }}>Nama Protokol</div>,
      dataIndex: "NamaProtokol",
      key: "NamaProtokol",
      width: 100,
      // align: 'center',
    },
    {
      title: <div style={{ textAlign: "center" }}>Nama Dokter</div>,
      dataIndex: "NAMADOKTER",
      key: "NAMADOKTER",
      width: 100,
      // align: 'center',
    },
    {
      title: <div style={{ textAlign: "center" }}>Obat</div>,
      dataIndex: "ObatProtokol",
      key: "ObatProtokol",
      render: (text) => <div>{ReactHtmlParser(text)}</div>,
      width: 300,
      // align: 'center',
    },
    {
      title: <div style={{ textAlign: "center" }}>Prosedur Pelaksanaan</div>,
      dataIndex: "ProsedurProtokol",
      key: "ProsedurProtokol",
      render: (text) => <div>{ReactHtmlParser(text)}</div>,
      // align: 'center',
    },
    {
      title: "Aksi",
      key: "operation",
      // fixed: "right",
      align: "center",
      width: 90,
      render: (text, record, index) => (
        <Button
          onClick={() => klikSalinRiwayat(record)}
          type="primary"
          icon={<CopyOutlined />}
          size="small"
        // style={{ width: '30px' }}
        >
          Salin
        </Button>
      ),
    },
  ];

  const kosongan = () => (
    <div style={{ textAlign: "center", padding: 0, margin: 0, marginTop: 2 }}>
      <SmileOutlined style={{ fontSize: 20 }} />
      &nbsp; Data Kosong
    </div>
  );

  const simpan = () => {
    terapi === null
      ? message.warning("Obat / Terapi tidak boleh kosong!")
      : insertLaporanKemo(isiterapi);
  };

  const modules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      [{ color: [] }],
      // ['link', 'image'],
      // ['clean']
    ],
  };

  const simpanProtokol = () => {
    if (!curpas.registrasiId) {
      Modal.warning({
        title: "Peringatan!",
        content: "Belum ada pasien dipilih.",
      });
    } else if (!drProtokol) {
      Modal.warning({
        title: "Peringatan!",
        content: "Dokter masih kosong.",
      });
    } else if (!idProtokol) {
      Modal.warning({
        title: "Peringatan!",
        content: "Nama Protokol masih kosong.",
      });
    } else {
      if (userProtokol) {
        if (userProtokol !== namauser) {
          Modal.warning({
            title: "Peringatan!",
            content:
              "User Input Protokol berbeda dengan ruang yang sekarang, tidak diijinkan untuk mengubah!",
          });
        } else {
          let data = {};
          data.registrasiId = tabProtKemo === '2' ? tempRegId : curpas.registrasiId;
          data.pasienId = tabProtKemo === '2' ? tempPxId : curpas.pasienId;
          data.tglProtokol = tabProtKemo === '2' ? dayjs(tglDashboard).format('YYYY-MM-DD') : dayjs(tanggal).format();
          data.dokterId = drProtokol;
          data.mstProtokolId = idProtokol;
          data.obatProtokol = obatProtokol;
          data.prosedurProtokol = prosedurProtokol;
          data.ruangId = ruangasal;
          data.userId = namauser;
          data.clientHost = host;
          data.clientIP = ip;

          console.log("EditsimpanProtokol : ", data);
          insertProtokolKemo(data);
        }
      } else {
        let data = {};
        data.registrasiId = tabProtKemo === '2' ? tempRegId : curpas.registrasiId;
        data.pasienId = tabProtKemo === '2' ? tempPxId : curpas.pasienId;
        data.tglProtokol = tabProtKemo === '2' ? dayjs(tglDashboard).format('YYYY-MM-DD') : dayjs(tanggal).format();
        data.dokterId = drProtokol;
        data.mstProtokolId = idProtokol;
        data.obatProtokol = obatProtokol;
        data.prosedurProtokol = prosedurProtokol;
        data.ruangId = ruangasal;
        data.userId = namauser;
        data.clientHost = host;
        data.clientIP = ip;

        console.log("simpanProtokol : ", data);
        insertProtokolKemo(data);
      }
    }
  };

  const klikRiwProtokol = () => {
    setmdRiwProtokol(true);
    if (tabProtKemo === '2') {
      getRiwProtokol(tempPxId);
    }
    else {
      getRiwProtokol(curpas.pasienId);
    }
  };

  const klikSalinRiwayat = (data) => {
    setdrProtokol(data.DokterId);
    setidProtokol(data.MstProtokolId);
    setobatProtokol(data.ObatProtokol);
    setprosedurProtokol(data.ProsedurProtokol);

    message.success("Berhasil Disalin!");
  };

  return (
    <div>
      <Card
        size="small"
        title="Protokol Kemo"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          marginBottom: 5,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Divider orientation="left" orientationMargin="0">
          Obat Kemo yang diberikan :
        </Divider>

        <Form
          name="basic"
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 22,
          }}
        >
          <Form.Item label="Daftar Obat">
            <Button
              type="primary"
              onClick={() => {
                setModal(true);
                if (tabProtKemo === '2') {
                  getDataObat(tempRegId, ruangasal);
                }
                else {
                  getDataObat(curpas.registrasiId, ruangasal);
                }
              }}
              disabled={tabProtKemo === '2' ? true : false}
            >
              Lihat
            </Button>
          </Form.Item>
          <Form.Item label="Terapi">
            <TextArea
              value={terapi}
              rows={5}
              placeholder="Obat Kemoterapi"
              onChange={(e) => setTerapi(e.target.value)}
            />
          </Form.Item>
        </Form>
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              htmlType="submit"
              onClick={() => {
                simpan();
              }}
              disabled={tabProtKemo === '2' ? true : false}
            >
              Simpan
            </Button>
          </Col>
        </Row>

        <Divider orientation="left" orientationMargin="0">
          Protokol Kemoterapi :
        </Divider>
        <Spin spinning={spProtokol}>
          <Row
            style={{
              marginBottom: "2px",
            }}
          >
            <Col span={3}>Dokter :</Col>
            <Col span={21}>
              <Select
                style={{ width: "100%" }}
                placeholder="..."
                value={drProtokol}
                onSelect={(e) => {
                  console.log("onSelect : ", e);
                  getMstProtokolKemo(e);
                  setdrProtokol(e);
                }}
                showSearch={true}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {dokterall.map((opt, index) => (
                  <Option key={index} value={opt.dokterId}>
                    {opt.namaDokter}
                  </Option>
                ))}
              </Select>
            </Col>
          </Row>

          <Row style={{ marginBottom: "2px" }}>
            <Col span={3}>
              <span>Prot. Kemoterapi :</span>
            </Col>

            <Col span={17}>
              <Input.Group compact>
                <Select
                  style={{ width: "95%" }}
                  placeholder="..."
                  value={idProtokol}
                  // onChange={(e) => setcodeDokterId(e)}
                  // size='small'
                  onSelect={(e) => {
                    let temp = listMstProtokol.filter(
                      (item, index) => item.Id === e
                    );
                    setidProtokol(e);
                    setobatProtokol(temp[0].Obat);
                    setprosedurProtokol(temp[0].ProsedurPelaksanaan);
                    console.log("protokol kemo : ", temp);
                  }}
                  showSearch={true}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listMstProtokol.map((opt, index) => (
                    <Option key={index} value={opt.Id}>
                      {opt.NamaProtokol}
                    </Option>
                  ))}
                </Select>
                <Button
                  type="primary"
                  onClick={() => getMstProtokolKemo(drProtokol)}
                  style={{ width: "5%" }}
                  icon={<CloudDownloadOutlined />}
                />
              </Input.Group>
            </Col>
            <Col span={4}>
              <Link to="/mstprotokolkemoterapi">
                <Button type="link">Tambah Master Protokol</Button>
              </Link>
            </Col>
          </Row>

          <Row style={{ marginBottom: "2px" }}>
            <Col span={3}>
              <span>Obat :</span>
            </Col>
            <Col span={21}>
              <ReactQuill
                theme="snow"
                value={obatProtokol}
                onChange={(e) => setobatProtokol(e)}
                modules={modules}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "2px" }}>
            <Col span={3}>
              <span>Pros. Pelaksanaan :</span>
            </Col>
            <Col span={21}>
              <ReactQuill
                theme="snow"
                value={prosedurProtokol}
                onChange={(e) => setprosedurProtokol(e)}
                modules={modules}
              />
            </Col>
          </Row>

          <Row style={{ marginBottom: "2px" }}>
            <Col span={3}>
              <span>Ruang Input :</span>
            </Col>
            <Col span={21}>
              <span>{ruangProtokol ? ruangProtokol : "-"}</span>
            </Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col span={3}>
              <span>User Input :</span>
            </Col>
            <Col span={21}>
              <span>{userProtokol ? userProtokol : "-"}</span>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Button
                // type='primary'
                onClick={() => klikRiwProtokol()}
                // disabled={tempFormat === 0 ? true : false}
                style={{ width: "250px" }}
              >
                Riwayat Protokol
              </Button>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                onClick={() => simpanProtokol()}
                disabled={!curpas}
                style={{ width: "150px", float: "right" }}
              >
                Simpan
              </Button>
            </Col>
          </Row>
        </Spin>
      </Card>

      {/* Modal Daftar Order Obat */}
      <Modal
        title="Data Order/ Validasi Obat"
        open={modal}
        onCancel={() => setModal(false)}
        closable={false}
        footer={null}
        width={800}
        style={{ top: 100 }}
      >
        <Spin tip="Mengambil Data Obat" spinning={spListObat}>
          <ConfigProvider renderEmpty={kosongan}>
            <Divider
              orientation="left"
              style={{ backgroundColor: "#d9f7be", margin: "0px" }}
            >
              Daftar Order Obat
            </Divider>
            {listOrderObat.map((item, index) => (
              <div>
                <hr />
                <Row>
                  <Col span={5}>
                    <span>No.Order : {item.NOORDER}</span>
                  </Col>
                  <Col span={5}>
                    <span>No.Reg. : {item.NOREG}</span>
                  </Col>
                  <Col span={5}>
                    <span>
                      Tgl.Order : {dayjs(item.TGLORDER).format("DD-MM-YYYY")}
                    </span>
                  </Col>
                  <Col span={9}>
                    <span>Apt.Tujuan : {item.NAMABAGIAN}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Daftar Obat Paten :</span>
                  </Col>
                </Row>
                <Table
                  style={{ cursor: "pointer" }}
                  // rowSelection={{
                  //   type: "checkbox",
                  //   ...rowSelection,
                  // }}
                  columns={columnsa}
                  dataSource={item.Paten}
                  size="small"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        let tempObat =
                          (terapi ? terapi : "") +
                          (!terapi ? "" : ",\n") +
                          record.NAMABARANG +
                          " : " +
                          record.QTYBAR +
                          " " +
                          record.SATUAN;
                        if (tempObat.length <= 4000) {
                          setTerapi(tempObat);
                          Modal.info({
                            title: "Sukses",
                            content: `Anda memasukkan ${record.NAMABARANG +
                              " : " +
                              record.QTYBAR +
                              " " +
                              record.SATUAN
                              }`,
                          });
                        } else {
                          Modal.error({
                            title: "Error",
                            content:
                              "Inputan Pemeriksaan Penunjang tidak boleh lebih dari 4000 karakter!",
                          });
                        }
                      },
                    };
                  }}
                  bordered
                  pagination={false}
                />
                <Row>
                  <Col>
                    <span>Daftar Obat Racikan :</span>
                  </Col>
                </Row>
                <Table
                  style={{ cursor: "pointer" }}
                  // rowSelection={{
                  //   type: "checkbox",
                  //   ...rowSelection,
                  // }}
                  columns={columnsa}
                  dataSource={item.Racik}
                  size="small"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        let tempObat =
                          (terapi ? terapi : "") +
                          (!terapi ? "" : ",\n") +
                          record.NAMABARANG +
                          " : " +
                          record.QTYBAR +
                          " " +
                          record.SATUAN;
                        if (tempObat.length <= 4000) {
                          setTerapi(tempObat);
                        } else {
                          Modal.error({
                            title: "Error",
                            content:
                              "Inputan Pemeriksaan Penunjang tidak boleh lebih dari 4000 karakter!",
                          });
                        }
                      },
                    };
                  }}
                  bordered
                  pagination={false}
                />
              </div>
            ))}
            <Divider
              orientation="left"
              style={{ backgroundColor: "#d9f7be", margin: "0px" }}
            >
              Daftar Obat Tervalidasi
            </Divider>
            {listValidObat.map((item, index) => (
              <div>
                <hr />
                <Row>
                  <Col span={5}>
                    <span>No.Resep : {item.NORESEP}</span>
                  </Col>
                  <Col span={5}>
                    <span>No.Reg. : {item.NOREG}</span>
                  </Col>
                  <Col span={5}>
                    <span>
                      Tgl.Resep : {dayjs(item.TGLRESEP).format("DD-MM-YYYY")}
                    </span>
                  </Col>
                  <Col span={9}>
                    <span>Apt.Tujuan : {item.NAMABAGIAN}</span>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <span>Daftar Obat Tervalidasi :</span>
                  </Col>
                </Row>
                <Table
                  style={{ cursor: "pointer" }}
                  columns={columnsb}
                  dataSource={item.Obat}
                  size="small"
                  onRow={(record, rowIndex) => {
                    return {
                      onClick: () => {
                        let tempObat =
                          (terapi ? terapi : "") +
                          (!terapi ? "" : ",\n") +
                          record.NAMABARANG +
                          " : " +
                          record.QTYBAR +
                          " " +
                          record.SATRSP;
                        if (tempObat.length <= 4000) {
                          setTerapi(tempObat);
                          Modal.info({
                            title: "Sukses",
                            content: `Anda memasukkan ${record.NAMABARANG +
                              " : " +
                              record.QTYBAR +
                              " " +
                              record.SATRSP
                              }`,
                          });
                        } else {
                          Modal.error({
                            title: "Error",
                            content:
                              "Inputan terapi tidak boleh lebih dari 4000 karakter!",
                          });
                        }
                      },
                    };
                  }}
                  bordered
                  pagination={false}
                />
              </div>
            ))}{" "}
          </ConfigProvider>
        </Spin>
      </Modal>

      {/* Modal Riwayat Protokol */}
      <Modal
        title="Riwayat Protokol Kemoterapi"
        open={mdRiwProtokol}
        onCancel={() => setmdRiwProtokol(false)}
        closable={false}
        footer={null}
        width={1000}
        style={{ top: 100 }}
      >
        <Table
          className="custom-table-tbRiwProtokolKemo"
          columns={coltbRiwayatProtokol}
          dataSource={listRiwProtokol}
          loading={spTbRiwProtokol}
          bordered
        />
      </Modal>
    </div>
  );
};

export default FormProtokolKemo;
