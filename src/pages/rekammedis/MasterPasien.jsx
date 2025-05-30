import {
  Button,
  Card,
  Checkbox,
  Col,
  DatePicker,
  Descriptions,
  Divider,
  Form,
  Image,
  Input,
  Modal,
  Popover,
  Row,
  Select,
  Space,
  Table,
} from "antd";
import Search from "antd/lib/input/Search";
import React, { useContext, useState, useRef } from "react";
import { MasterContext } from "../master/context/MasterContext";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import dayjs from "dayjs";
import Popup from "reactjs-popup";
import SignaturePad from "react-signature-canvas";
import { MasterWilayahContext } from "../master/context/masterwilayah/MasterWilayahContext";
import DetailpasienMaster from "../rawatjalan/komponen/DrawerMaster";
import { UserContext } from "../appsetting/UserContext";
const { Option } = Select;
const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 19 },
  marginBottom: 0,
};
const MasterPasien = () => {
  const { menuMaster } = useContext(UserContext);
  const { desaList, getDesa } = useContext(MasterWilayahContext);
  const {
    cekKTP,
    nik,
    setNIK,
    nama,
    setNama,
    tempatlahir,
    setTempatLahir,
    tanggallahir,
    setTanggalLahir,
    jnskelamin,
    setJnsKelamin,
    agama,
    setAgama,
    goldarah,
    setGolDarah,
    alamat,
    setAlamat,
    alamatdomisili,
    setAlamatDomisili,
    desaid,
    setDesaId,
    email,
    setEmail,
    notelepon,
    setNoTelepon,
    pekerjaan,
    setPekerjaan,
    pendidikan,
    setPendidikan,
    statuskawin,
    setStatusKawin,
    sukubangsa,
    setSukuBangsa,
    bahasa,
    setBahasa,
    namaibu,
    setNamaIbu,
    namaayah,
    setNamaAyah,
    namapasangan,
    setNamaPasangan,
    tandatangan,
    setTandaTangan,
    nonnik,
    setNonNIK,
    rt,
    setRT,
    rw,
    setRW,
    keterangan,
    setKeterangan,
    kodepos,
    setKodepos,
    tanggalmati,
    setTanggalMati,
    setDesaNama,
    desanama,
    setPasienID,
    setLoading,
    loading,
    setLoadingDetail,
    loadingdetail,
    pasienlist,
    cariPasienListAll,
    getPasienDetail,
    pasiendetail,
    pasienDetailJenisKelamin,
    pasienDetailAgama,
    pasienDetailPendidikan,
    pasienDetailStatusKwn,
    pasienDetailPekerjaan,
    pasienDetailGolonganDrh,
    pasienDetailSuku,
    pasienDetailBahasa,
    pasienDetailDesa,
    pasienDetailKelasRwt,
    pasienDetailPembayaran,

    insertPasien,
    ktp,
  } = useContext(PasienContext);
  const {
    getListAgama,
    listagama,
    getListGolDarah,
    listgoldarah,
    getListJnsKelamin,
    listjnskelamin,
    getListPekerjaan,
    listpekerjaan,
    getListPendidikan,
    listpendidikan,
    getListSuku,
    listsuku,
    getListBahasa,
    listbahasa,
    getListSttKawin,
    liststtkawin,
  } = useContext(MasterContext);
  const [warnarow, setWarnaRow] = useState(null);
  const [warnarowdesa, setWarnaRowDesa] = useState(null);
  const [form, setForm] = useState(false);
  const [modaledit, setModalEdit] = useState(false);
  const [modaldesa, setModalDesa] = useState(false);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datapasien = {
    pasienId: pasiendetail.pasienId,
    nik: nik,
    nonNIK: nonnik,
    keterangan: keterangan,
    nama: nama,
    tempatLahir: tempatlahir,
    tanggalLahir: tanggallahir,
    tanggalKematian: tanggalmati,
    jenisKelaminId: jnskelamin,
    alamat: alamat,
    alamatDomisili: alamatdomisili,
    email: email,
    desaId: desaid,
    rt: rt,
    rw: rw,
    kodePos: kodepos,
    agamaId: agama,
    pendidikanId: pendidikan,
    golonganDarahId: goldarah,
    statusKawinId: statuskawin,
    pekerjaanId: pekerjaan,
    wni: true,
    sukuBangsaId: sukubangsa,
    bahasaId: bahasa,
    noTelepon: notelepon,
    // noPasienIbu: "string",
    namaIbu: namaibu,
    namaAyah: namaayah,
    namaPasangan: namapasangan,
    kelasRawatId: pasiendetail.kelasRawatId,
    pembayaranId: pasiendetail.pembayaranId,
    noPolish: pasiendetail.noPolish,
    tandaTangan: tandatangan,
    // kunciSidikJari: "string",
    status: true,
    clientHost: host,
    clientIp: ip,
  };
  const columns = [
    {
      title: "No Pasien",
      dataIndex: "pasienId",
    },
    {
      title: "Nama Pasien",
      dataIndex: "nama",
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "tanggalLahir",
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
    },
    {
      title: "Nama Ibu Kandung",
      dataIndex: "namaIbu",
    },
  ];
  const columnsdesa = [
    {
      title: "ID Desa",
      dataIndex: "desaId",
      key: "desaId",
    },
    {
      title: "Nama Provinsi",
      dataIndex: ["kecamatan", "kabupaten", "provinsi", "provinsiNama"],
      key: "provinsiNama",
    },
    {
      title: "Nama Kabupaten",
      dataIndex: ["kecamatan", "kabupaten", "kabupatenNama"],
      key: "kabupatenNama",
    },
    {
      title: "Nama Kecamatan",
      dataIndex: ["kecamatan", "kecamatanNama"],
      key: "kecamatanNama",
    },
    {
      title: "Nama Desa",
      dataIndex: "desaNama",
      key: "desaNama",
    },
  ];
  const setAmbil = (e) => {
    cariPasienListAll(e);
    setLoading(true);
  };
  const openModal = () => {
    setModalEdit(true);
    getListAgama();
    getListGolDarah();
    getListJnsKelamin();
    getListPekerjaan();
    getListPendidikan();
    getListSuku();
    getListBahasa();
    getListSttKawin();
  };
  const openModalDesa = () => {
    setModalDesa(true);
    getDesa(" ");
  };
  const handleCancelDesa = () => {
    setModalDesa(false);
  };
  const handleOkDesa = () => {
    setModalDesa(false);
  };
  const handleCancel = () => {
    setModalEdit(false);
  };
  const handleOk = () => {
    insertPasien(datapasien);
    setModalEdit(false);
    console.log(datapasien);
  };
  const cekktp = () => {
    cekKTP(nik);
  };
  const onTanggalLahir = (date, dateString) => {
    setTanggalLahir(dateString);
  };
  const onTanggalMati = (date, dateString) => {
    setTanggalMati(dateString);
  };

  const sigCanvas = useRef({});
  const clear = () => sigCanvas.current.clear();
  const save = () =>
    setTandaTangan(sigCanvas.current.getTrimmedCanvas().toDataURL().substr(22));

  const onNIK = (e) => {
    setNIK(e);
    setNonNIK(e === "" ? true : false);
  };
  return (
    <div className="backcontent" id="divcontents">
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card
            size="small"
            style={{ margin: 3 }}
            title="Master Pasien"
            headStyle={{ fontWeight: "bold", fontSize: "14" }}
          >
            <Search
              placeholder="Cari Nama Pasien"
              enterButton
              onSearch={(e) => setAmbil(e)}
            />
            <Table
              pagination={false}
              scroll={{ y: 250 }}
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    setWarnaRow(rowIndex);
                    getPasienDetail(record.pasienId);
                    setForm(true);
                    setLoadingDetail(true);
                    setPasienID(record.pasienId);
                  }, // click row
                };
              }}
              loading={loading}
              columns={columns}
              dataSource={pasienlist}
              size="small"
              rowClassName={(record, rowIndex) =>
                rowIndex === warnarow ? "bgcolorsuccess" : null
              }
            />
          </Card>
          {form ? (
            <Card size="small" style={{ margin: 3 }} loading={loadingdetail}>
              <Descriptions
                title="Detail Pasien"
                bordered
                size="small"
                extra={
                  <Space>
                    {/* <Button
                      className="hidden-print"
                      onClick={() => window.print()}
                    >
                      Cetak
                    </Button> */}
                    <DetailpasienMaster />
                    {menuMaster ? (
                      <Button
                        type="primary"
                        onClick={openModal}
                        style={{
                          backgroundColor: "deepskyblue",
                          borderColor: "deepskyblue",
                        }}
                      >
                        Edit
                      </Button>
                    ) : (
                      <></>
                    )}

                    <Button
                      danger
                      type="primary"
                      onClick={() => setForm(false)}
                    >
                      Tutup
                    </Button>
                  </Space>
                }
              >
                <Descriptions.Item label="No. Pasien">
                  {pasiendetail.pasienId}
                </Descriptions.Item>
                <Descriptions.Item label="NIK">
                  {pasiendetail.nik}
                </Descriptions.Item>
                <Descriptions.Item label="Nama">
                  {pasiendetail.nama}
                </Descriptions.Item>
                <Descriptions.Item label="Tempat Lahir">
                  {pasiendetail.tempatLahir}
                </Descriptions.Item>
                <Descriptions.Item label="Tanggal Lahir">
                  {pasiendetail.tanggalLahir}
                </Descriptions.Item>
                <Descriptions.Item label="Jenis Kelamin">
                  {pasienDetailJenisKelamin.deskripsi}
                </Descriptions.Item>
                <Descriptions.Item label="Agama">
                  {pasienDetailAgama.deskripsi}
                </Descriptions.Item>
                <Descriptions.Item label="Golongan Darah">
                  {pasienDetailGolonganDrh.deskripsi}
                </Descriptions.Item>
                <Descriptions.Item label="Alamat">
                  {pasiendetail.alamat}
                </Descriptions.Item>
                <Descriptions.Item label="Desa">
                  {pasienDetailDesa.desaNama}
                </Descriptions.Item>
                <Descriptions.Item label="Alamat Domisili">
                  {pasiendetail.alamatDomisili}
                </Descriptions.Item>
                <Descriptions.Item label="No. Telepon">
                  {pasiendetail.noTelepon}
                </Descriptions.Item>
                <Descriptions.Item label="Pekerjaan">
                  {pasienDetailPekerjaan.deskripsi}
                </Descriptions.Item>
                <Descriptions.Item label="Pendidikan">
                  {pasienDetailPendidikan.deskripsi}
                </Descriptions.Item>
                <Descriptions.Item label="Status Kawin">
                  {pasienDetailStatusKwn.deskripsi}
                </Descriptions.Item>
                <Descriptions.Item label="Suku Bangsa">
                  {pasienDetailSuku.deskripsi}
                </Descriptions.Item>
                <Descriptions.Item label="Bahasa">
                  {pasienDetailBahasa.deskripsi}
                </Descriptions.Item>
                <Descriptions.Item label="Nama Ibu">
                  {pasiendetail.namaIbu}
                </Descriptions.Item>
                <Descriptions.Item label="Nama Ayah">
                  {pasiendetail.namaAyah}
                </Descriptions.Item>
                <Descriptions.Item label="Nama Pasangan">
                  {pasiendetail.namaPasangan}
                </Descriptions.Item>
                <Descriptions.Item label="Pembayaran">
                  Nama Pembayaran : {pasienDetailPembayaran.deskripsi}
                  <br />
                  No Pembayaran : {pasiendetail.noPolish}
                  <br />
                  Kelas Rawat : {pasienDetailKelasRwt.deskripsi}
                </Descriptions.Item>
                <Descriptions.Item label="Tanda Tangan">
                  {pasiendetail.tandaTangan === null ? null : (
                    <Image
                      width={200}
                      src={`data:image/jpeg;base64,` + pasiendetail.tandaTangan}
                    />
                  )}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          ) : null}
        </Col>
      </Row>

      {/* Modal Edit */}
      <Modal
        centered={true}
        title="Edit Pasien"
        visible={modaledit}
        onOk={handleOk}
        onCancel={handleCancel}
        width="900px"
      >
        <Form {...layout}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="NIK" style={{ marginBottom: 0 }}>
                <Input
                  value={nik}
                  onChange={(e) => onNIK(e.target.value)}
                  addonAfter={
                    <Popover
                      content={"TIDAK ADA KONEKSI"}
                      title="Data KTP Dukcapil"
                      trigger="click"
                      placement="bottom"
                    >
                      <Button size="small" type="link" onClick={cekktp}>
                        Cek KTP
                      </Button>
                    </Popover>
                  }
                />
              </Form.Item>
              <Form.Item label="Non NIK" style={{ marginBottom: 0 }}>
                <Checkbox
                  checked={nonnik}
                  onChange={(e) => setNonNIK(e.target.checked)}
                />
              </Form.Item>
              <Form.Item label="Keterangan" style={{ marginBottom: 0 }}>
                <Input
                  disabled={!nonnik}
                  value={keterangan}
                  placeholder="-"
                  onChange={(e) => setKeterangan(e.target.value)}
                />
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
                  value={dayjs(tanggallahir)}
                  onChange={(e) => onTanggalLahir(e)}
                />
              </Form.Item>
              <Form.Item label="Tanggal Mati" style={{ marginBottom: 0 }}>
                {/* <Input value={pasiendetail.tanggalLahir} /> */}
                <DatePicker
                  value={dayjs(tanggalmati)}
                  onChange={(e) => onTanggalMati(e)}
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
              <Form.Item label="Golongan Darah" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listgoldarah}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Gol Darah"
                  optionFilterProp="children"
                  value={goldarah}
                  onChange={(e) => setGolDarah(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listgoldarah.map((d) => (
                    <Option key={d.golonganDarahId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Pekerjaan" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listpekerjaan}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Pekerjaan"
                  optionFilterProp="children"
                  value={pekerjaan}
                  onChange={(e) => setPekerjaan(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listpekerjaan.map((d) => (
                    <Option key={d.pekerjaanId}>{d.deskripsi}</Option>
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
                  value={statuskawin}
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
              <Form.Item label="Alamat Domisili" style={{ marginBottom: 0 }}>
                <Input
                  value={alamatdomisili}
                  onChange={(e) => setAlamatDomisili(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Desa" style={{ marginBottom: 0 }}>
                <Input
                  value={desanama}
                  onChange={(e) => setDesaId(e.target.value)}
                  addonAfter={
                    <Button size="small" type="link" onClick={openModalDesa}>
                      ...
                    </Button>
                  }
                />
              </Form.Item>
              <Form.Item label="RT" style={{ marginBottom: 0 }}>
                <Input value={rt} onChange={(e) => setRT(e.target.value)} />
              </Form.Item>
              <Form.Item label="RW" style={{ marginBottom: 0 }}>
                <Input value={rw} onChange={(e) => setRW(e.target.value)} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Kodepos" style={{ marginBottom: 0 }}>
                <Input
                  value={kodepos}
                  onChange={(e) => setKodepos(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Email" style={{ marginBottom: 0 }}>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="No. Telepon" style={{ marginBottom: 0 }}>
                <Input
                  value={notelepon}
                  onChange={(e) => setNoTelepon(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Suku Bangsa" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listsuku}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Suku Bangsa"
                  optionFilterProp="children"
                  value={sukubangsa}
                  onChange={(e) => setSukuBangsa(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listsuku.map((d) => (
                    <Option key={d.sukuBangsaId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="Bahasa" style={{ marginBottom: 0 }}>
                <Select
                  dataSource={listbahasa}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Bahasa"
                  optionFilterProp="children"
                  value={bahasa}
                  onChange={(e) => setBahasa(e)}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {listbahasa.map((d) => (
                    <Option key={d.bahasaId}>{d.deskripsi}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Divider orientation="left">Data Keluarga</Divider>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Form.Item label="Nama Ibu" style={{ marginBottom: 0 }}>
                <Input
                  value={namaibu}
                  onChange={(e) => setNamaIbu(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Nama Ayah" style={{ marginBottom: 0 }}>
                <Input
                  value={namaayah}
                  onChange={(e) => setNamaAyah(e.target.value)}
                />
              </Form.Item>
              <Form.Item label="Nama Pasangan" style={{ marginBottom: 0 }}>
                <Input
                  value={namapasangan}
                  onChange={(e) => setNamaPasangan(e.target.value)}
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

      {/* Modal Desa */}
      <Modal
        centered={true}
        title="Lookup Desa"
        visible={modaldesa}
        onOk={handleOkDesa}
        onCancel={handleCancelDesa}
        width="900px"
      >
        <Search
          placeholder="Cari nama desa..."
          onSearch={(e) => getDesa(e)}
          enterButton
        />
        <Table
          columns={columnsdesa}
          dataSource={desaList}
          size="small"
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                setWarnaRowDesa(rowIndex);
                setDesaId(record.desaId);
                setDesaNama(record.desaNama);
              }, // click row
            };
          }}
          rowClassName={(record, rowIndex) =>
            rowIndex === warnarowdesa ? "bgcolorsuccess" : null
          }
        />
      </Modal>
    </div>
  );
};

export default MasterPasien;
