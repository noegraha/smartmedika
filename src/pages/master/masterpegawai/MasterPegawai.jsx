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
  Image,
  Switch,
} from "antd";
import Search from "antd/lib/input/Search";
import React, { useContext, useState, useRef } from "react";
import { MasterPegawaiContext } from "../context/masterpegawai/MasterPegawaiContext";
import { PegawaiContext } from "../context/masterpegawai/PegawaiContext";
import dayjs from "dayjs";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import { MasterContext } from "../../master/context/MasterContext";

const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
  marginBottom: 0,
};

const text = "Yakin di Hapus?";

const MasterPegawai = () => {
  const {
    nik,
    setNIK,
    nama,
    setNama,
    tempatlahir,
    setTempatLahir,
    tglLahir,
    setTglLahir,
    jnskelamin,
    setJnsKelamin,
    agama,
    setAgama,
    alamat,
    setAlamat,
    desaid,
    setDesaId,
    email,
    setEmail,
    noTelepon,
    setNoTelepon,
    pendidikan,
    setPendidikan,
    statusKawin,
    setStatusKawin,
    kodePos,
    setKodePos,
    tanggalTmt,
    setTanggalTmt,
    tanggalStr,
    setTanggalStr,
    akhirStr,
    akhirSip,
    setAkhirStr,
    setAkhirSip,
    tanggalSip,
    setTanggalSip,
    fax,
    setFax,
    jenisTenagaKesehatanFhirid,
    setJenisTenagaKesehatanFhirid,
    noSip,
    setNoSip,
    noStr,
    setNoStr,
    setLoading,
    loading,
    setLoadingDetail,
    loadingdetail,
    pegawailist,
    cariPegawaiListAll,
    getPegawaiDetail,
    pegawaidetail,
    insertPegawai,
    insertPegawai2,
    setPegawaiID,
    kategoriPelaksanaId,
    setKategoriPelaksanaId,
    getCurrentTime,
    noRekening,
    setNoRekening,
    setTenagaKesehatan,
    setTenagaKesehatanId,
    tenagakesehatan,
    tenagaKesehatanId,
    deletePegawai,
    pegawaiid,
    setPegawaiId,
    aktivasiPegawai,
    setAktivasi,
    form,
    setForm,
    warnarow,
    setWarnaRow,
    tandatangan,
    setTandaTangan,
    nip,
    setNIP,
    dokterid,
    setDokterID,
  } = useContext(MasterPegawaiContext);

  const {
    getListAgama,
    listagama,
    getListJnsKelamin,
    listjnskelamin,
    getListPendidikan,
    listpendidikan,
    getListSttKawin,
    liststtkawin,
  } = useContext(MasterContext);

  const {
    getListKategoriPelaksana,
    listkategoripelaksana,
    getListTenagaKesehatan,
    listtenagakesehatan,
    getListDesa,
    listdesa,
    getByDesaid,
    byiddesa,
    namakecamatan,
    namakabupaten,
  } = useContext(PegawaiContext);

  const [modaledit, setModalEdit] = useState(false);
  const [modaltambah, setModalTambah] = useState(false);
  const [modalaktivasi, setModalAktivasi] = useState(false);
  const [modalanonim, setModalAnonim] = useState(false);
  const [modaleditanonim, setModalEditAnonim] = useState(false);
  const [hidden2, setHidden2] = useState(true);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const usrid = sessionStorage.getItem("userId");

  const datapegawai = {
    pegawaiId:
      kategoriPelaksanaId === pegawaidetail.kategoriPelaksanaId
        ? pegawaiid
        : "null",
    kategoriPelaksanaId: kategoriPelaksanaId,
    nama: nama,
    tempatLahir: tempatlahir,
    nik: nik,
    dokterId: kategoriPelaksanaId <= 2 ? dokterid : null,
    nip: nip,
    tandaTangan: tandatangan,
    noSip: kategoriPelaksanaId <= 8 ? noSip : null,
    tanggalSip:
      kategoriPelaksanaId <= 8 ? dayjs(tanggalSip).format("YYYY-MM-DD") : null,
    akhirSip:
      kategoriPelaksanaId <= 8 ? dayjs(akhirSip).format("YYYY-MM-DD") : null,
    noStr: kategoriPelaksanaId <= 8 ? noStr : null,
    tanggalStr:
      kategoriPelaksanaId <= 8 ? dayjs(tanggalStr).format("YYYY-MM-DD") : null,
    akhirStr:
      kategoriPelaksanaId <= 8 ? dayjs(akhirStr).format("YYYY-MM-DD") : null,
    jenisTenagaKesehatanFhirid:
      kategoriPelaksanaId <= 8 ? jenisTenagaKesehatanFhirid : null,
    anonim: false,
    tglLahir: dayjs(tglLahir).format("YYYY-MM-DD"),
    jenisKelamin: jnskelamin,
    statusKawin: statusKawin,
    agamaId: agama,
    alamat: alamat,
    desaId: desaid,
    email: email,
    kodePos: kodePos,
    tenagaKesehatan: tenagaKesehatanId != null ? true : false,
    tenagaKesehatanId: kategoriPelaksanaId >= 8 ? null : tenagaKesehatanId,
    pendidikanId: pendidikan,
    tanggalTmt: dayjs(tanggalTmt).format("YYYY-MM-DD"),
    noTelepon: noTelepon,
    fax: fax,
    noRekening: noRekening,
    status: true,
    userId: usrid,
    clientHost: host,
    dateEntry: getCurrentTime(),
    clientIp: ip,
  };

  const datapegawai2 = {
    kategoriPelaksanaId: kategoriPelaksanaId,
    nama: nama,
    tempatLahir: tempatlahir,
    nik: nik,
    dokterId: kategoriPelaksanaId <= 2 ? dokterid : null,
    nip: nip,
    tandaTangan: tandatangan,
    noSip: kategoriPelaksanaId <= 8 ? noSip : null,
    tanggalSip:
      kategoriPelaksanaId <= 8 ? dayjs(tanggalSip).format("YYYY-MM-DD") : null,
    akhirSip:
      kategoriPelaksanaId <= 8 ? dayjs(akhirSip).format("YYYY-MM-DD") : null,
    noStr: kategoriPelaksanaId <= 8 ? noStr : null,
    tanggalStr:
      kategoriPelaksanaId <= 8 ? dayjs(tanggalStr).format("YYYY-MM-DD") : null,
    akhirStr:
      kategoriPelaksanaId <= 8 ? dayjs(akhirStr).format("YYYY-MM-DD") : null,
    jenisTenagaKesehatanFhirid:
      kategoriPelaksanaId <= 8 ? jenisTenagaKesehatanFhirid : null,
    anonim: false,
    tglLahir: dayjs(tglLahir).format("YYYY-MM-DD"),
    jenisKelamin: jnskelamin,
    statusKawin: statusKawin,
    agamaId: agama,
    alamat: alamat,
    desaId: desaid,
    email: email,
    kodePos: kodePos,
    tenagaKesehatan: tenagakesehatan != null ? true : false,
    tenagaKesehatanId: kategoriPelaksanaId <= 8 ? tenagakesehatan : null,
    pendidikanId: pendidikan,
    tanggalTmt: dayjs(tanggalTmt).format("YYYY-MM-DD"),
    noTelepon: noTelepon,
    fax: fax,
    noRekening: noRekening,
    status: true,
    userId: usrid,
    clientHost: host,
    dateEntry: getCurrentTime(),
    clientIp: ip,
  };

  const datapegawai3 = {
    pegawaiId:
      kategoriPelaksanaId === pegawaidetail.kategoriPelaksanaId
        ? pegawaiid
        : "null",
    kategoriPelaksanaId: kategoriPelaksanaId,
    nama: nama,
    tglLahir: "1900-01-01",
    tanggalTmt: "1900-01-01",
    tenagaKesehatan: tenagaKesehatanId != null ? true : false,
    tenagaKesehatanId: kategoriPelaksanaId >= 8 ? null : tenagaKesehatanId,
    anonim: true,
    status: true,
    userId: usrid,
    clientHost: host,
    dateEntry: getCurrentTime(),
    clientIp: ip,
  };

  const datapegawai4 = {
    kategoriPelaksanaId: kategoriPelaksanaId,
    nama: nama,
    tglLahir: "1900-01-01",
    tanggalTmt: "1900-01-01",
    tenagaKesehatan: tenagakesehatan != null ? true : false,
    tenagaKesehatanId: kategoriPelaksanaId >= 8 ? null : tenagakesehatan,
    anonim: true,
    status: true,
    userId: usrid,
    clientHost: host,
    dateEntry: getCurrentTime(),
    clientIp: ip,
  };

  const columns = [
    {
      title: "Id Pegawai",
      dataIndex: "pegawaiId",
    },
    {
      title: "Kategori Pelaksana",
      render: (pegawaidetail) => {
        return (
          <c>
            {
              listkategoripelaksana.map((d) => d.deskripsi)[
                parseInt(pegawaidetail.kategoriPelaksanaId) - 1
              ]
            }
          </c>
        );
      },
    },
    {
      title: "Nama Pegawai",
      dataIndex: "nama",
    },
    {
      title: "Jenis Kelamin",
      dataIndex: "jenisKelamin",
      render: (jenisKelamin) => {
        return (
          <c>
            {jenisKelamin !== null
              ? listjnskelamin.map((d) => d.deskripsi)[
                  listjnskelamin
                    .map((d) => d.jenisKelaminId)
                    .indexOf(String(jenisKelamin))
                ]
              : "-"}
          </c>
        );
      },
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "tglLahir",
      render: (tglLahir) => {
        return (
          <c>
            {dayjs(tglLahir).format("DD-MM-YYYY") === "01-01-1900"
              ? "-"
              : dayjs(tglLahir).format("DD-MM-YYYY")}
          </c>
        );
      },
    },
    {
      title: "Tempat Lahir",
      dataIndex: "tempatLahir",
      render: (tempatLahir) => {
        return <c>{tempatLahir !== null ? tempatLahir : "-"}</c>;
      },
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      render: (alamat) => {
        return <c>{alamat !== null ? alamat : "-"}</c>;
      },
    },
  ];
  const setAmbil = (e) => {
    cariPegawaiListAll(e);
    setLoading(true);
  };

  const setidDesa = (e) => {
    getListDesa(e);
  };

  const handleDelete = () => {
    deletePegawai(pegawaiid);
  };

  const openModal = () => {
    pegawaidetail.anonim === true
      ? setModalEditAnonim(true)
      : setModalEdit(true);
    getListAgama();
    getListJnsKelamin();
    getListPendidikan();
    getListSttKawin();
    getListKategoriPelaksana();
    getListTenagaKesehatan();
    getListDesa();
  };

  const openModaltambah = () => {
    setModalTambah(true);
    getListAgama();
    getListJnsKelamin();
    getListPendidikan();
    getListSttKawin();
    getListKategoriPelaksana();
    getListTenagaKesehatan();
    getListDesa();
    setTandaTangan(null);
  };

  const openModalaktivasi = () => {
    setModalAktivasi(true);
  };

  const handleCancel = () => {
    setModalEdit(false);
  };
  const handleCancel2 = () => {
    setModalTambah(false);
  };
  const handleCancel3 = () => {
    setModalAktivasi(false);
  };
  const handleCancel4 = () => {
    setModalEditAnonim(false);
  };
  const handleCancel5 = () => {
    setModalAnonim(false);
  };

  const handleOk = () => {
    insertPegawai(datapegawai);
    setModalEdit(false);
    getByDesaid(datapegawai2.desaId);
    console.log("data editfull", datapegawai);
  };

  const handleOk2 = () => {
    insertPegawai2(datapegawai2);
    setModalTambah(false);
  };

  const handleOk3 = () => {
    aktivasiPegawai();
    setModalAktivasi(false);
  };

  const handleOk4 = () => {
    insertPegawai(datapegawai3);
    setModalEditAnonim(false);
    console.log("dataedit", datapegawai3);
  };

  const handleOk5 = () => {
    insertPegawai2(datapegawai4);
    setModalAnonim(false);
  };

  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = () =>
    setTandaTangan(sigCanvas.current.getTrimmedCanvas().toDataURL().substr(22));

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card
            size="small"
            style={{ margin: 3 }}
            title="Master Pegawai"
            headStyle={{ fontWeight: "bold", fontSize: "14" }}
            extra={
              <Space>
                {/* <Detailpasien /> */}
                <Button
                  type="secondary"
                  onClick={openModalaktivasi}
                  style={{
                    backgroundColor: "orange",
                    borderColor: "orange",
                  }}
                >
                  Aktivasi Pegawai
                </Button>
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
            }
          >
            <div style={{ marginLeft: "81.75%" }}>
              <Col span={50}>
                <Search
                  placeholder="Cari ID pegawai/ Nama Pegawai"
                  enterButton
                  onSearch={(e) => {
                    setAmbil(e);
                    getListJnsKelamin();
                    getListKategoriPelaksana();
                  }}
                />
              </Col>
            </div>
            <Table
              pagination={false}
              scroll={{ y: 250 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setWarnaRow(rowIndex);
                    getPegawaiDetail(record.pegawaiId);
                    setForm(true);
                    setLoadingDetail(true);
                    setPegawaiID(record.pegawaiId);
                    getListAgama();
                    getListPendidikan();
                    getListSttKawin();
                    getListJnsKelamin();
                    getListKategoriPelaksana();
                    getListTenagaKesehatan();
                    getListDesa();
                    getByDesaid(record.desaId);
                  }, // click row
                };
              }}
              loading={loading}
              columns={columns}
              dataSource={pegawailist}
              rowKey="pegawaiId"
              size="small"
              rowClassName={(record, rowIndex) =>
                rowIndex === warnarow ? "bgcolorsuccess" : null
              }
            />
          </Card>
          {form ? (
            <Card size="small" style={{ margin: 3 }} loading={loadingdetail}>
              <Descriptions
                title="Detail Pegawai"
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
                <Descriptions.Item label="Id Pegawai">
                  {pegawaidetail.pegawaiId}
                </Descriptions.Item>
                <Descriptions.Item label="NIK">
                  {pegawaidetail.nik !== null ? pegawaidetail.nik : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="NIP">
                  {pegawaidetail.nip !== null ? pegawaidetail.nip : "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Nama">
                  {pegawaidetail.nama}
                </Descriptions.Item>
                <Descriptions.Item label="Desa">
                  {byiddesa.desaNama === "-" ? "" : byiddesa.desaNama}
                  {namakecamatan === "-" ? "" : " - "}
                  {namakecamatan === "-" ? "" : namakecamatan}
                  {namakecamatan === "-" ? "" : " - "}
                  {namakabupaten === "-" ? "" : namakabupaten}
                </Descriptions.Item>
                <Descriptions.Item label="Kategori Pelaksana">
                  {
                    listkategoripelaksana.map((d) => d.deskripsi)[
                      parseInt(pegawaidetail.kategoriPelaksanaId) - 1
                    ]
                  }
                </Descriptions.Item>

                <Descriptions.Item label="Tanggal Lahir">
                  {dayjs(pegawaidetail.tglLahir).format("DD-MM-YYYY") ===
                  "01-01-1900"
                    ? "-"
                    : dayjs(pegawaidetail.tglLahir).format("DD-MM-YYYY")}
                </Descriptions.Item>
                <Descriptions.Item label="Alamat">
                  {pegawaidetail.alamat !== null ? pegawaidetail.alamat : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Jenis Tenaga Kesehatan Fhir">
                  {pegawaidetail.jenisTenagaKesehatanFhirid !== null
                    ? pegawaidetail.jenisTenagaKesehatanFhirid
                    : "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Tempat Lahir">
                  {pegawaidetail.tempatLahir !== null
                    ? pegawaidetail.tempatLahir
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Kode Pos">
                  {pegawaidetail.kodePos !== null ? pegawaidetail.kodePos : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Jenis Tenaga Kesehatan">
                  {pegawaidetail.tenagaKesehatanId !== null
                    ? listtenagakesehatan.map((d) => d.deskripsi)[
                        parseInt(pegawaidetail.tenagaKesehatanId) - 1
                      ]
                    : "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Jenis Kelamin">
                  {pegawaidetail.jenisKelamin !== null
                    ? listjnskelamin.map((d) => d.deskripsi)[
                        listjnskelamin
                          .map((d) => d.jenisKelaminId)
                          .indexOf(String(pegawaidetail.jenisKelamin))
                      ]
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Email">
                  {pegawaidetail.email !== null ? pegawaidetail.email : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="SIP">
                  No SIP :{" "}
                  {pegawaidetail.noSip !== null ? pegawaidetail.noSip : "-"}
                  <br />
                  Tanggal SIP :{" "}
                  {dayjs(pegawaidetail.tanggalSip).format("DD-MM-YYYY") ===
                  "Invalid date"
                    ? "-"
                    : dayjs(pegawaidetail.tanggalSip).format("DD-MM-YYYY")}
                  <br />
                  Akhir SIP :{" "}
                  {dayjs(pegawaidetail.akhirSip).format("DD-MM-YYYY") ===
                  "Invalid date"
                    ? "-"
                    : dayjs(pegawaidetail.akhirSip).format("DD-MM-YYYY")}
                </Descriptions.Item>

                <Descriptions.Item label="Status Kawin">
                  {pegawaidetail.statusKawin !== null
                    ? liststtkawin.map((d) => d.deskripsi)[
                        liststtkawin
                          .map((d) => d.statusKawinId)
                          .indexOf(String(pegawaidetail.statusKawin))
                      ]
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="No Telp">
                  {pegawaidetail.noTelepon !== null
                    ? pegawaidetail.noTelepon
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="STR">
                  No STR :{" "}
                  {pegawaidetail.noStr !== null ? pegawaidetail.noStr : "-"}
                  <br />
                  Tanggal STR :{" "}
                  {dayjs(pegawaidetail.tanggalStr).format("DD-MM-YYYY") ===
                  "Invalid date"
                    ? "-"
                    : dayjs(pegawaidetail.tanggalStr).format("DD-MM-YYYY")}
                  <br />
                  Akhir STR :{" "}
                  {dayjs(pegawaidetail.akhirStr).format("DD-MM-YYYY") ===
                  "Invalid date"
                    ? "-"
                    : dayjs(pegawaidetail.akhirStr).format("DD-MM-YYYY")}
                </Descriptions.Item>

                <Descriptions.Item label="Agama">
                  {pegawaidetail.agamaId !== null
                    ? listagama.map((d) => d.deskripsi)[
                        parseInt(pegawaidetail.agamaId) - 1
                      ]
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Fax">
                  {pegawaidetail.fax !== null ? pegawaidetail.fax : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Tanggal Tmt">
                  {dayjs(pegawaidetail.tanggalTmt).format("DD-MM-YYYY") ===
                  "01-01-1900"
                    ? "-"
                    : dayjs(pegawaidetail.tanggalTmt).format("DD-MM-YYYY")}
                </Descriptions.Item>

                <Descriptions.Item label="Pendidikan">
                  {pegawaidetail.pendidikanId !== null
                    ? listpendidikan.map((d) => d.deskripsi)[
                        parseInt(pegawaidetail.pendidikanId) - 1
                      ]
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="No Rekening">
                  {pegawaidetail.noRekening !== null
                    ? pegawaidetail.noRekening
                    : "-"}
                </Descriptions.Item>
                <Descriptions.Item label="Dokter Id">
                  {pegawaidetail.dokterId !== null
                    ? pegawaidetail.dokterId
                    : "-"}
                </Descriptions.Item>

                <Descriptions.Item label="Tanda Tangan">
                  {pegawaidetail.tandaTangan === null ? (
                    "-"
                  ) : (
                    <Image
                      width={200}
                      src={
                        `data:image/jpeg;base64,` + pegawaidetail.tandaTangan
                      }
                    />
                  )}
                </Descriptions.Item>
                <Descriptions.Item label></Descriptions.Item>
                <Descriptions.Item label></Descriptions.Item>
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
        title="Tambah Pegawai"
        visible={modaltambah}
        onOk={handleOk2}
        onCancel={handleCancel2}
        width="80%"
      >
        <Form {...layout}>
          <div style={{ marginLeft: "100px", marginBottom: "15px" }}>
            Anonim:
            <Switch
              checked={false}
              onChange={(e) => {
                setModalAnonim(e);
                handleCancel2();
              }}
            />
          </div>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="NIK" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setNIK(e.target.value)} />
              </Form.Item>
              <Form.Item label="NIP" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setNIP(e.target.value)} />
              </Form.Item>
              <Form.Item label="Nama" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setNama(e.target.value)} />
              </Form.Item>
              <Form.Item label="Tempat Lahir" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setTempatLahir(e.target.value)} />
              </Form.Item>
              <Form.Item label="Tanggal Lahir" style={{ marginBottom: 0 }}>
                <DatePicker onChange={(e) => setTglLahir(e)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Jenis Kelamin" style={{ marginBottom: 0 }}>
                <Select
                  className="ant-select-selection"
                  dataSource={listjnskelamin}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Jenis Kelamin"
                  optionFilterProp="children"
                  onChange={(e) => setJnsKelamin(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listjnskelamin.map((d) => (
                    <Option key={d.jenisKelaminId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Agama" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listagama}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Agama"
                  optionFilterProp="children"
                  onChange={(e) => setAgama(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listagama.map((d) => (
                    <Option key={d.agamaId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Pendidikan" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listpendidikan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Pendidikan"
                  optionFilterProp="children"
                  onChange={(e) => setPendidikan(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listpendidikan.map((d) => (
                    <Option key={d.pendidikanId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Status Kawin" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={liststtkawin}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Status Kawin"
                  optionFilterProp="children"
                  onChange={(e) => setStatusKawin(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {liststtkawin.map((d) => (
                    <Option key={d.statusKawinId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">Data Alamat</Divider>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="Alamat" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setAlamat(e.target.value)} />
              </Form.Item>

              <Form.Item label="Desa Id" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listdesa}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Desa"
                  optionFilterProp="children"
                  onSearch={(e) => {
                    setidDesa(e);
                  }}
                  onChange={(e) => setDesaId(e)}
                  filterOption={(input, option) =>
                    option.props.children[0]
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listdesa.map((d) => (
                    <Option key={d.desaId}>
                      {d.desaNama} - {d.kecamatan.kecamatanNama} -{" "}
                      {d.kecamatan.kabupaten.kabupatenNama} -{" "}
                      {d.kecamatan.kabupaten.provinsi.provinsiNama}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Kodepos" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setKodePos(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setEmail(e.target.value)} />
              </Form.Item>
              <Form.Item label="No. Telepon" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setNoTelepon(e.target.value)} />
              </Form.Item>
              <Form.Item label="No. Fax" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setFax(e.target.value)} />
              </Form.Item>
              <Form.Item label="No. Rekening" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setNoRekening(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">Data Lain</Divider>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="Kategori Pelaksana" style={{ marginBottom: 0 }}>
                <Select
                  className="ant-select-selection"
                  dataSource={listkategoripelaksana}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Kategori Pelaksana"
                  optionFilterProp="children"
                  onChange={(e) => setKategoriPelaksanaId(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listkategoripelaksana.map((d) => (
                    <Option key={d.kategoriId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Jenis Tenaga Kesehatan Fhir"
                style={{ marginBottom: 0 }}
              >
                <Input
                  type="number"
                  onChange={(e) =>
                    setJenisTenagaKesehatanFhirid(e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Jenis Tenaga Kesehatan"
                style={{ marginBottom: 0 }}
              >
                <Select
                  className="ant-select-selection"
                  dataSource={listtenagakesehatan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Jenis Tenaga Kesehatan"
                  optionFilterProp="children"
                  onChange={(e) => setTenagaKesehatan(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listtenagakesehatan.map((d) => (
                    <Option key={d.jenisTenagaKesehatanId}>
                      {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 2 ? false : true}
                label="Dokter Id"
                style={{ marginBottom: 0 }}
              >
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <Input onChange={(e) => setDokterID(e.target.value)} />
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="No. SIP"
                style={{ marginBottom: 0 }}
              >
                <Input onChange={(e) => setNoSip(e.target.value)} />
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="No. STR"
                style={{ marginBottom: 0 }}
              >
                <Input onChange={(e) => setNoStr(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Tanggal SIP"
                style={{ marginBottom: 0 }}
              >
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker onChange={(e) => setTanggalSip(e)} />
              </Form.Item>

              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Tanggal STR"
                style={{ marginBottom: 0 }}
              >
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker onChange={(e) => setTanggalStr(e)} />
              </Form.Item>

              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Akhir SIP"
                style={{ marginBottom: 0 }}
              >
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker onChange={(e) => setAkhirSip(e)} />
              </Form.Item>

              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Akhir STR"
                style={{ marginBottom: 0 }}
              >
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker onChange={(e) => setAkhirStr(e)} />
              </Form.Item>

              <Form.Item label="Tanggal TMT" style={{ marginBottom: 0 }}>
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker onChange={(e) => setTanggalTmt(e)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tanda Tangan" style={{ marginBottom: 0 }}>
                <Image
                  width={200}
                  src={`data:image/jpeg;base64,` + tandatangan}
                />
                <br />
                <Popup
                  modal
                  trigger={<Button>Open Signature Pad</Button>}
                  closeOnDocumentClick={false}
                  contentStyle={{ width: 400 }}
                >
                  {(close) => (
                    <>
                      <div style={{ border: "1px solid #000000" }}>
                        <SignaturePad
                          ref={sigCanvas}
                          canvasProps={{
                            width: 388,
                            height: 200,
                            className: "signatureCanvas",
                            border: "1px solid #000000",
                          }}
                        />
                      </div>
                      <button onClick={save}>Save</button>
                      <button onClick={clear}>Clear</button>
                      <button onClick={close}>Close</button>
                    </>
                  )}
                </Popup>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* Modal Edit */}
      <Modal
        centered={true}
        title="Edit Pegawai"
        visible={modaledit}
        onOk={handleOk}
        onCancel={handleCancel}
        width="80%"
      >
        <Form {...layout}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="NIK" style={{ marginBottom: 0 }}>
                <Input value={nik} onChange={(e) => setNIK(e.target.value)} />
                <Input
                  type="hidden"
                  value={pegawaiid}
                  onChange={(e) => setPegawaiId(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="NIP" style={{ marginBottom: 0 }}>
                <Input value={nip} onChange={(e) => setNIP(e.target.value)} />
              </Form.Item>

              <Form.Item label="Nama" style={{ marginBottom: 0 }}>
                <Input value={nama} onChange={(e) => setNama(e.target.value)} />
              </Form.Item>
              <Form.Item label="Tempat Lahir" style={{ marginBottom: 0 }}>
                <Input
                  value={tempatlahir}
                  onChange={(e) => setTempatLahir(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Tanggal Lahir" style={{ marginBottom: 0 }}>
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker
                  value={dayjs(tglLahir)}
                  onChange={(e) => setTglLahir(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Jenis Kelamin" style={{ marginBottom: 0 }}>
                <Select
                  className="ant-select-selection"
                  dataSource={listjnskelamin}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Jenis Kelamin"
                  optionFilterProp="children"
                  value={jnskelamin}
                  onChange={(e) => setJnsKelamin(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listjnskelamin.map((d) => (
                    <Option key={d.jenisKelaminId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Agama" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listagama}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Agama"
                  optionFilterProp="children"
                  value={agama}
                  onChange={(e) => setAgama(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listagama.map((d) => (
                    <Option key={d.agamaId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Pendidikan" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listpendidikan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Pendidikan"
                  optionFilterProp="children"
                  value={pendidikan}
                  onChange={(e) => setPendidikan(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listpendidikan.map((d) => (
                    <Option key={d.pendidikanId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Status Kawin" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={liststtkawin}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Status Kawin"
                  optionFilterProp="children"
                  value={statusKawin}
                  onChange={(e) => setStatusKawin(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {liststtkawin.map((d) => (
                    <Option key={d.statusKawinId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">Data Alamat</Divider>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="Alamat" style={{ marginBottom: 0 }}>
                <Input
                  value={alamat}
                  onChange={(e) => setAlamat(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Desa Id" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listdesa}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Desa"
                  optionFilterProp="children"
                  value={desaid}
                  onSearch={(e) => {
                    setidDesa(e);
                  }}
                  onChange={(e) => setDesaId(e)}
                  filterOption={(input, option) =>
                    option.props.children[0]
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listdesa.map((d) => (
                    <Option key={d.desaId}>
                      {d.desaNama} - {d.kecamatan.kecamatanNama} -{" "}
                      {d.kecamatan.kabupaten.kabupatenNama} -{" "}
                      {d.kecamatan.kabupaten.provinsi.provinsiNama}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item label="Kodepos" style={{ marginBottom: 0 }}>
                <Input
                  value={kodePos}
                  onChange={(e) => setKodePos(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Email" style={{ marginBottom: 0 }}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="No. Telepon" style={{ marginBottom: 0 }}>
                <Input
                  value={noTelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="No. Fax" style={{ marginBottom: 0 }}>
                <Input value={fax} onChange={(e) => setFax(e.target.value)} />
              </Form.Item>
              <Form.Item label="No. Rekening" style={{ marginBottom: 0 }}>
                <Input
                  value={noRekening}
                  onChange={(e) => setNoRekening(e.target.value)}
                />
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">Data Lain</Divider>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="Kategori Pelaksana" style={{ marginBottom: 0 }}>
                <Select
                  className="ant-select-selection"
                  dataSource={listkategoripelaksana}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Kategori Pelaksana"
                  optionFilterProp="children"
                  value={String(kategoriPelaksanaId)}
                  onChange={(e) => setKategoriPelaksanaId(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listkategoripelaksana.map((d) => (
                    <Option key={d.kategoriId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Jenis Tenaga Kesehatan Fhir"
                style={{ marginBottom: 0 }}
              >
                <Input
                  value={jenisTenagaKesehatanFhirid}
                  type="number"
                  onChange={(e) =>
                    setJenisTenagaKesehatanFhirid(e.target.value)
                  }
                />
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Jenis Tenaga Kesehatan"
                style={{ marginBottom: 0 }}
              >
                <Select
                  className="ant-select-selection"
                  dataSource={listtenagakesehatan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Jenis Tenaga Kesehatan"
                  optionFilterProp="children"
                  value={String(tenagaKesehatanId)}
                  onChange={(e) => setTenagaKesehatanId(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listtenagakesehatan.map((d) => (
                    <Option key={d.jenisTenagaKesehatanId}>
                      {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 2 ? false : true}
                label="Dokter Id"
                style={{ marginBottom: 0 }}
              >
                <Input
                  value={dokterid}
                  onChange={(e) => setDokterID(e.target.value)}
                />
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="No. SIP"
                style={{ marginBottom: 0 }}
              >
                <Input
                  value={noSip}
                  onChange={(e) => setNoSip(e.target.value)}
                />
              </Form.Item>

              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="No. STR"
                style={{ marginBottom: 0 }}
              >
                <Input
                  value={noStr}
                  onChange={(e) => setNoStr(e.target.value)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Tanggal SIP"
                style={{ marginBottom: 0 }}
              >
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker
                  value={
                    tanggalSip === null
                      ? dayjs("1900-01-01")
                      : dayjs(tanggalSip)
                  }
                  onChange={(e) => setTanggalSip(e)}
                />
              </Form.Item>

              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Tanggal STR"
                style={{ marginBottom: 0 }}
              >
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker
                  value={
                    tanggalStr === null
                      ? dayjs("1900-01-01")
                      : dayjs(tanggalStr)
                  }
                  onChange={(e) => setTanggalStr(e)}
                />
              </Form.Item>

              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Akhir SIP"
                style={{ marginBottom: 0 }}
              >
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker
                  value={
                    akhirSip === null ? dayjs("1900-01-01") : dayjs(akhirSip)
                  }
                  onChange={(e) => setAkhirSip(e)}
                />
              </Form.Item>

              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Akhir STR"
                style={{ marginBottom: 0 }}
              >
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker
                  value={
                    akhirStr === null ? dayjs("1900-01-01") : dayjs(akhirStr)
                  }
                  onChange={(e) => setAkhirStr(e)}
                />
              </Form.Item>

              <Form.Item label="Tanggal TMT" style={{ marginBottom: 0 }}>
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker
                  value={dayjs(tanggalTmt)}
                  onChange={(e) => setTanggalTmt(e)}
                />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Tanda Tangan" style={{ marginBottom: 0 }}>
                <Image
                  width={200}
                  src={`data:image/jpeg;base64,` + tandatangan}
                />
                <br />
                <Popup
                  modal
                  trigger={<Button>Open Signature Pad</Button>}
                  closeOnDocumentClick={false}
                  contentStyle={{ width: 400 }}
                >
                  {(close) => (
                    <>
                      <div style={{ border: "1px solid #000000" }}>
                        <SignaturePad
                          ref={sigCanvas}
                          canvasProps={{
                            width: 388,
                            height: 200,
                            className: "signatureCanvas",
                            border: "1px solid #000000",
                          }}
                        />
                      </div>
                      <button onClick={save}>Save</button>
                      <button onClick={clear}>Clear</button>
                      <button onClick={close}>Close</button>
                    </>
                  )}
                </Popup>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/*modal aktivasi*/}
      <Modal
        centered={true}
        title="Aktivasi Pegawai"
        visible={modalaktivasi}
        onOk={handleOk3}
        onCancel={handleCancel3}
        width="50%"
      >
        <Form {...layout}>
          <Row gutter={[8, 8]}>
            <Col span={20}>
              <Form.Item label="Id Pegawai" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setAktivasi(e.target.value)} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/*modal Anonim*/}
      <Modal
        centered={true}
        title="Data Anonim"
        visible={modalanonim}
        onOk={handleOk5}
        onCancel={handleCancel5}
        width="50%"
      >
        <Form {...layout}>
          <Row gutter={[8, 8]}>
            <Col span={20}>
              <Form.Item label="Nama" style={{ marginBottom: 0 }}>
                <Input onChange={(e) => setNama(e.target.value)} />
              </Form.Item>

              <Form.Item label="Kategori Pelaksana" style={{ marginBottom: 0 }}>
                <Select
                  className="ant-select-selection"
                  dataSource={listkategoripelaksana}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Kategori Pelaksana"
                  optionFilterProp="children"
                  onChange={(e) => {
                    setKategoriPelaksanaId(e);
                    setHidden2(false);
                  }}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listkategoripelaksana.map((d) => (
                    <Option key={d.kategoriId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                hidden={
                  hidden2 === false
                    ? kategoriPelaksanaId <= 8
                      ? false
                      : true
                    : true
                }
                label="Jenis Tenaga Kesehatan"
                style={{ marginBottom: 0 }}
              >
                <Select
                  className="ant-select-selection"
                  dataSource={listtenagakesehatan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Jenis Tenaga Kesehatan"
                  optionFilterProp="children"
                  onChange={(e) => setTenagaKesehatan(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listtenagakesehatan.map((d) => (
                    <Option key={d.jenisTenagaKesehatanId}>
                      {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/*modal Edit Anonim*/}
      <Modal
        centered={true}
        title="Edit Data Anonim"
        visible={modaleditanonim}
        onOk={handleOk4}
        onCancel={handleCancel4}
        width="50%"
      >
        <Form {...layout}>
          <Row gutter={[8, 8]}>
            <Col span={20}>
              <Form.Item label="Nama" style={{ marginBottom: 0 }}>
                <Input value={nama} onChange={(e) => setNama(e.target.value)} />
                <Input
                  type="hidden"
                  value={pegawaiid}
                  onChange={(e) => setPegawaiId(e.target.value)}
                />
              </Form.Item>

              <Form.Item label="Kategori Pelaksana" style={{ marginBottom: 0 }}>
                <Select
                  className="ant-select-selection"
                  dataSource={listkategoripelaksana}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Kategori Pelaksana"
                  optionFilterProp="children"
                  value={String(kategoriPelaksanaId)}
                  onChange={(e) => {
                    setKategoriPelaksanaId(e);
                    setHidden2(false);
                  }}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listkategoripelaksana.map((d) => (
                    <Option key={d.kategoriId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                hidden={kategoriPelaksanaId <= 8 ? false : true}
                label="Jenis Tenaga Kesehatan"
                style={{ marginBottom: 0 }}
              >
                <Select
                  className="ant-select-selection"
                  dataSource={listtenagakesehatan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Jenis Tenaga Kesehatan"
                  optionFilterProp="children"
                  value={String(tenagaKesehatanId)}
                  onChange={(e) => setTenagaKesehatanId(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listtenagakesehatan.map((d) => (
                    <Option key={d.jenisTenagaKesehatanId}>
                      {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </div>
  );
};

export default MasterPegawai;
