import React, { useContext, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Button,
  Divider,
  Empty,
  Tag,
  Descriptions,
  Checkbox,
  message,
  Modal,
  Alert,
  Table,
  Space,
  Card,
  Popconfirm,
} from "antd";
import Column from "antd/lib/table/Column";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { JadwalOperasiRIContext } from "../context/JadwalOperasiRIContext";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import { DiagnosaRIContext } from "../context/DiagnosaRIContext";
import { PasienRIContext } from "../context/PasienRIContext";
import {
  InfoCircleTwoTone,
  CheckSquareTwoTone,
  PlusOutlined,
  SnippetsOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import { DiagnosaContext } from "../../rawatjalan/context/Diagnosacontext";
import FormJadwalOperasi from "./FormJadwalOperasi";
const { TextArea } = Input;
const formItemLayoutFull = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const formItemLayoutFull1 = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { Option } = Select;

const FormPengajuanJadwalOperasi = () => {
  const RsLokasiPenunjang = sessionStorage.getItem("RSMana");
  const [form] = Form.useForm();
  const [warnaRow, setWarnaRow] = useState([]);
  const [modalJadwal, setmodalJadwal] = useState(false);
  const dateFormat = "DD-MM-YYYY";
  const { dokterall, pelayanan, pelayanankelas, loadPelayananRuangKelas } =
    useContext(PelayananContext);
  const { curpasRI } = useContext(PasienRIContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const {
    jadwaloperasi,
    ajuanoperasi,
    setAjuanOperasi,
    setJadwalOperasi,
    JadwalOperasiRI,
    AjuanJadwalOperasiRi,
    kondisiTerakhir,
    setAmbilKondisiTerakhir,
    AmbilKondisiTerakhir,
    insertAjuanOperasiRi,
    AjuanJadwalId,
    ajuanId,
    setajuanId,

    kondisiTerakhirId,
    setkondisiTerakhirId,
    pelayananId,
    setpelayananId,
    lokasiOperasi,
    setlokasiOperasi,
    tglTindakan,
    settglTindakan,
    jenisAnestesi,
    setjenisAnestesi,
    cito,
    setcito,
    dxPraBedah,
    setdxPraBedah,
    jadwalOperasiId,
    setjadwalOperasiId,
    acceptable,
    setacceptable,
    keterangan,
    setketerangan,
    catatanIbs,
    setcatatanIbs,
    kosongkanformAjuanOp,
    alertsts,
    setAlertsts,
    stsSimpan,
    setStsSimpan,
    ajuanopsama,
    listOperasiPasien,
    setListOperasiPasien,
    getListOperasiPasien,
    ajuanOpById,
    setAjuanOpById,
    getAjuanOpById,
    dokterId,
    setdokterId,
    deleteOrderOp,
    listOperasiPasienACC,
    setlistOperasiPasienACC,
    formOrder,
    setFormOrder,
    dxKerja,
    setdxKerja,
  } = useContext(JadwalOperasiRIContext);
  const { diagnosa, getDiagnosa } = useContext(DiagnosaRIContext);
  const { namauser } = useContext(LoginContext);

  const onCito = (e) => {
    setcito(e.target.checked);
    console.log(e.target.checked, e);
    e.target.checked === true
      ? settglTindakan(dayjs())
      : settglTindakan(dayjs().add(1, "days"));
  };
  const onTglajuan = (date, dateString) => {
    settglTindakan(date);
    console.log(date);
  };

  const OnTindakan = (e) => {
    setpelayananId(e);
  };
  const onJnsAnestesi = (e) => {
    setjenisAnestesi(e);
  };
  const onDpjp = (e) => {
    setdokterId(e);
  };
  const onLokasiOp = (e) => {
    setlokasiOperasi(e.target.value);
  };
  const onKeterangan = (e) => {
    setketerangan(e.target.value);
  };

  const onSubmit = () => {
    kondisiTerakhir === "" ||
    kondisiTerakhir === null ||
    kondisiTerakhir === undefined
      ? message.warning("Lengkapi Data CPPT Pasien Terlebih Dahulu")
      : keterangan === "" || keterangan === null || keterangan === []
      ? message.warning("Keterangan Tidak Boleh Kosong!")
      : dxKerja === "" ||
        dxKerja === " " ||
        dxKerja === null ||
        dxKerja === [] ||
        dxKerja === undefined
      ? message.warning("Diagnosa Kerja Tidak Boleh Kosong!")
      : dxPraBedah == "" || dxPraBedah == [] || dxPraBedah == null
      ? message.warning("Diagnosa Prabedah Tidak Boleh Kosong!")
      : insertAjuanOperasiRi(dataajuan);
    // : console.log(dataajuan);
  };

  const dataajuan = {
    ajuanId: ajuanId.toString(),
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    kondisiTerakhirId:
      kondisiTerakhir === "" ||
      kondisiTerakhir === null ||
      kondisiTerakhir === undefined
        ? 0
        : kondisiTerakhir.tandaVitalId,
    pelayananId: pelayananId,
    lokasiOperasi: lokasiOperasi,
    tglTindakan: dayjs(tglTindakan).format("YYYY-MM-DD"),
    jenisAnestesi: jenisAnestesi,
    cito: cito,
    dxPraBedah: dxPraBedah,
    dokterId:
      dokterId === "" || dokterId === null ? curpasRI.dokterId : dokterId,
    diagnosaKerja: dxKerja,
    keterangan: keterangan,
    hapus: false,
    userId: namauser.trim(),
    clientHost: host,
    clientIp: ip,
  };

  return (
    <div>
      <Card
        size="small"
        title="Ajuan dan Jadwal Operasi Pasien"
        headStyle={{ fontWeight: "bolder", backgroundColor: "lavenderblush" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={
          <Space>
            <Button
              icon={<SnippetsOutlined />}
              size="small"
              // type="primary"
              onClick={() => {
                setmodalJadwal(true);
              }}
            >
              Lihat Jadwal
            </Button>

            <Button
              icon={<PlusOutlined />}
              size="small"
              type="primary"
              onClick={() => {
                setFormOrder(true);
                getDiagnosa(curpasRI.ruangId);
                AmbilKondisiTerakhir(curpasRI.registrasiId);
                loadPelayananRuangKelas(
                  RsLokasiPenunjang === "RSMS" ? "9411" : "9461",
                  curpasRI.kelasRawatId
                );
                setajuanId(0);
                if (
                  curpasRI.ruangId &&
                  curpasRI.ruangId.substring(0, 2) === "91"
                ) {
                  setcito(true);
                  settglTindakan(dayjs());
                } else {
                  setcito(false);
                  settglTindakan(dayjs().add(1, "days"));
                }
                // setcito(false);
                setjenisAnestesi("");
                setketerangan("");
                // setdxPraBedah("");
                setpelayananId("");
                setlokasiOperasi("");
              }}
            >
              Tambah Order
            </Button>
          </Space>
        }
      >
        <Divider orientation="left">
          <InfoCircleTwoTone /> Status Order
        </Divider>
        {/* <Button onClick={() => {
                    console.log(curpasRI);
                }}>cek</Button> */}
        <Table
          dataSource={listOperasiPasien}
          bordered
          pagination={false}
          size="small"
        >
          <Column
            title="Tanggal Operasi"
            key="noorder"
            width="10%"
            // className="bgcolortunggu"
            render={(listOperasiPasien) => (
              <span>
                {dayjs(listOperasiPasien.tglTindakan).format("DD-MM-YYYY")}
                <br></br>
                {listOperasiPasien.cito === 1 ? (
                  <Tag color="magenta">CITO</Tag>
                ) : (
                  <Tag color="blue">REGULER</Tag>
                )}
              </span>
            )}
          />
          <Column
            title="Tindakan"
            key="reg"
            width="30%"
            className="tabeltabel"
            render={(listOperasiPasien) => (
              <span>
                Kode : {listOperasiPasien.pelayananId}
                <br></br>
                {listOperasiPasien.Deskripsi}
              </span>
            )}
          />
          <Column
            title="Jenis dan Lokasi OP"
            className="tabeltabel"
            key="nama"
            width="20%"
            render={(listOperasiPasien) => (
              <span>
                Lokasi : {listOperasiPasien.lokasiOperasi}
                <br></br>
                Jenis Anestesi : {listOperasiPasien.jenisAnestesi}
              </span>
            )}
          />
          <Column
            title="Keterangan"
            className="tabeltabel"
            key="nama"
            width="20%"
            render={(listOperasiPasien) => (
              <span>{listOperasiPasien.keterangan}</span>
            )}
          />
          <Column
            title="User"
            className="tabeltabel"
            key="nama"
            width="10%"
            render={(listOperasiPasien) => (
              <span>{listOperasiPasien.userId}</span>
            )}
          />
          <Column
            title="Action"
            key="reg"
            width="10%"
            className="tabeltabel"
            render={(listOperasiPasien) => (
              <Space>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => {
                    getDiagnosa(curpasRI.ruangId);
                    AmbilKondisiTerakhir(curpasRI.registrasiId);
                    loadPelayananRuangKelas(
                      RsLokasiPenunjang === "RSMS" ? "9411" : "9461",
                      curpasRI.kelasRawatId
                    );
                    settglTindakan(dayjs(listOperasiPasien.tglTindakan));
                    setcito(listOperasiPasien.cito === 1 ? true : false);
                    setajuanId(listOperasiPasien.ajuanId);
                    setjenisAnestesi(listOperasiPasien.jenisAnestesi);
                    setketerangan(listOperasiPasien.keterangan);
                    setdxPraBedah(listOperasiPasien.dxPraBedah);
                    setpelayananId(listOperasiPasien.pelayananId);
                    setdokterId(listOperasiPasien.dokterId);
                    setlokasiOperasi(listOperasiPasien.lokasiOperasi);
                    setFormOrder(true);
                  }}
                  style={{
                    backgroundColor: "forestgreen",
                    borderColor: "green",
                  }}
                >
                  Edit
                </Button>
                <Popconfirm
                  title="Anda Yakin Dihapus ?"
                  onConfirm={(e) =>
                    deleteOrderOp(
                      listOperasiPasien.registrasiId,
                      listOperasiPasien.ajuanId
                    )
                  }
                  onCancel={(e) => {}}
                  okText="Ya"
                  cancelText="Tidak"
                >
                  <Button size="small" type="primary" danger>
                    Hapus
                  </Button>
                </Popconfirm>
              </Space>
            )}
          />
        </Table>
        <br></br>
        <br></br>

        <br></br>

        <Divider orientation="left">
          <CheckSquareTwoTone twoToneColor="#52c41a" /> Status IBS
        </Divider>
        <Table
          dataSource={listOperasiPasienACC}
          bordered
          pagination={false}
          size="small"
        >
          <Column
            width="10%"
            title="Tanggal Operasi"
            key="noorder"
            // className="bgcolortunggu"
            render={(listOperasiPasienACC) => (
              <span>
                {dayjs(listOperasiPasienACC.tglTindakan).format("DD-MM-YYYY")}
                <br></br>
                {listOperasiPasienACC.cito === 1 ? (
                  <Tag color="magenta">CITO</Tag>
                ) : (
                  <Tag color="blue">REGULER</Tag>
                )}
              </span>
            )}
          />
          <Column
            title="Tindakan"
            width="20%"
            key="reg"
            className="tabeltabel"
            render={(listOperasiPasienACC) => (
              <span>
                Kode : {listOperasiPasienACC.pelayananId}
                <br></br>
                {listOperasiPasienACC.Deskripsi}
              </span>
            )}
          />
          <Column
            width="20%"
            title="Jenis dan Lokasi OP"
            className="tabeltabel"
            key="nama"
            render={(listOperasiPasienACC) => (
              <span>
                Lokasi : {listOperasiPasienACC.lokasiOperasi}
                <br></br>
                Jenis Anestesi : {listOperasiPasienACC.jenisAnestesi}
              </span>
            )}
          />
          <Column
            width="20%"
            title="Keterangan"
            className="tabeltabel"
            key="nama"
            render={(listOperasiPasienACC) => (
              <span>{listOperasiPasienACC.keterangan}</span>
            )}
          />
          <Column
            title="Persetujuan"
            width="10%"
            className="tabeltabel"
            key="nama"
            render={(listOperasiPasienACC) => (
              <span>
                No Jadwal : {listOperasiPasienACC.jadwalOperasiId}
                {listOperasiPasienACC.acceptable === "Disetujui" ? (
                  <Alert message="Disetujui" type="success" showIcon />
                ) : (
                  <Alert message="Ditolak" type="error" showIcon />
                )}
              </span>
            )}
          />
          <Column
            width="20%"
            title="Catatan IBS"
            className="tabeltabel"
            key="nama"
            render={(listOperasiPasienACC) => (
              <span>{listOperasiPasienACC.catatanIBS}</span>
            )}
          />
        </Table>
      </Card>

      <Modal
        style={{ top: 5 }}
        title="Tambah Order Operasi"
        visible={formOrder}
        // onOk={simpan}
        onCancel={() => {
          setFormOrder(false);
          kosongkanformAjuanOp();
        }}
        width="70%"
        footer={[
          <Button
            key="back"
            onClick={() => {
              setFormOrder(false);
              kosongkanformAjuanOp();
            }}
          >
            Kembali
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmit}>
            Simpan
          </Button>,
        ]}
      >
        <Form form={form}>
          <Row>
            <Col span={24}>
              {kondisiTerakhir === "" ||
              kondisiTerakhir === null ||
              kondisiTerakhir === undefined ? (
                <Alert
                  message="Silahkan Isi CPPT Terlebih Dahulu"
                  type="error"
                />
              ) : (
                ""
              )}
              <Descriptions
                size="small"
                column={{ xxl: 4, xl: 4, lg: 4, md: 2, sm: 2, xs: 2 }}
                style={{ marginBottom: 10 }}
                bordered
              >
                <Descriptions.Item label="GCS">
                  {kondisiTerakhir.gcsTotal}
                </Descriptions.Item>
                <Descriptions.Item label="Tinggi Badan">
                  {kondisiTerakhir.tinggiBadan} Cm
                </Descriptions.Item>
                <Descriptions.Item label="Berat Badan">
                  {kondisiTerakhir.beratBadan} Kg
                </Descriptions.Item>
                <Descriptions.Item label="Tensi">
                  {kondisiTerakhir.tekananDarahSistolik}/
                  {kondisiTerakhir.tekananDarahDiastolik} mmHg
                </Descriptions.Item>
                <Descriptions.Item label="Nadi">
                  {kondisiTerakhir.frekuensiNadi} X/Mnt
                </Descriptions.Item>
                <Descriptions.Item label="Isi/Tekanan">
                  {kondisiTerakhir.iramaNadi}
                </Descriptions.Item>
                <Descriptions.Item label="Respirasi">
                  {kondisiTerakhir.frekuensiNafas} X/Mnt
                </Descriptions.Item>
                <Descriptions.Item label="Sifat">
                  {kondisiTerakhir.saturasiOksigen}
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                {...formItemLayoutFull}
                label="Pelayanan Cito"
                style={{ marginBottom: 5 }}
              >
                {curpasRI.ruangId &&
                curpasRI.ruangId.substring(0, 2) === "91" ? (
                  <>
                    <Tag color="magenta">CITO</Tag>
                  </>
                ) : (
                  <>
                    <Space>
                      <Checkbox
                        value={cito}
                        onChange={(e) => onCito(e)}
                      ></Checkbox>
                      {cito === true ? <Tag color="magenta">CITO</Tag> : ""}
                    </Space>
                  </>
                )}
              </Form.Item>

              <Form.Item
                {...formItemLayoutFull}
                label="Lokasi Operasi"
                style={{ marginBottom: 5 }}
                rules={[{ required: true }]}
              >
                <Input
                  style={{ width: "100%" }}
                  placeholder="..."
                  onChange={onLokasiOp}
                  value={lokasiOperasi}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutFull}
                label="Jenis Anestesi"
                style={{ marginBottom: 5 }}
                rules={[{ required: true }]}
              >
                <Select
                  value={jenisAnestesi}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  onChange={onJnsAnestesi}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="Lokal Anestesi">Lokal Anestesi</Option>
                  <Option value="General Anestesi">General Anestesi</Option>
                  <Option value="Regional Anestesi">Regional Anestesi</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                {...formItemLayoutFull}
                label="Tanggal Operasi"
                style={{ marginBottom: 5 }}
              >
                {cito === true ? (
                  <DatePicker
                    disabledDate={(current) => {
                      return (
                        current && current.isBefore(dayjs().startOf("day"))
                      );
                    }}
                    onChange={onTglajuan}
                    //disabledDate={disabledDate}
                    style={{ width: "100%" }}
                    placeholder="..."
                    format={dateFormat}
                    value={tglTindakan}
                    //defaultValue={dayjs().add(1, 'days')}
                  />
                ) : (
                  <DatePicker
                    disabledDate={(current) => {
                      return current && current < dayjs().endOf("day");
                    }}
                    onChange={onTglajuan}
                    //disabledDate={disabledDate}
                    style={{ width: "100%" }}
                    placeholder="..."
                    format={dateFormat}
                    value={tglTindakan}
                    //defaultValue={dayjs().add(1, 'days')}
                  />
                )}
              </Form.Item>

              <Form.Item
                {...formItemLayoutFull}
                label="DPJP"
                style={{ marginBottom: 5 }}
              >
                {/* <p>{curpasRI.dokterId}</p> */}
                <Select
                  value={
                    dokterId === null || dokterId === ""
                      ? curpasRI.dokterId
                      : dokterId
                  }
                  onChange={onDpjp}
                  dataSource={dokterall}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {dokterall.map((d) => (
                    <Option key={d.dokterId}>{d.namaDokter}</Option>
                  ))}
                </Select>
              </Form.Item>

              <Form.Item
                {...formItemLayoutFull}
                label="DX Prabedah"
                style={{ marginBottom: 5 }}
                rules={[{ required: true }]}
              >
                <Select
                  dataSource={diagnosa}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="Pilih Diagnosa"
                  optionFilterProp="children"
                  onChange={(value) => {
                    setdxPraBedah(value);
                    console.log(value);
                  }}
                  value={dxPraBedah}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {diagnosa.map((d) => (
                    <Option key={d.diagnosisId}>
                      {d.diagnosisId + " - " + d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull1}
                label="Tindakan"
                style={{ marginBottom: 5 }}
                rules={[{ required: true }]}
              >
                <Select
                  value={pelayananId}
                  dataSource={pelayanankelas}
                  showSearch
                  style={{ width: "100%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  onChange={OnTindakan}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {pelayanankelas.map((d) => (
                    <Option key={d.pelayananId}>
                      {d.pelayananId + " - " + d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull1}
                label="Diagnosa Kerja"
                style={{ marginBottom: 5 }}
                rules={[{ required: true }]}
              >
                <Input
                  value={dxKerja}
                  onChange={(e) => {
                    setdxKerja(e.target.value);
                  }}
                  placeholder="..."
                />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull1}
                label="Keterangan"
                style={{ marginBottom: 5 }}
                rules={[{ required: true }]}
              >
                <TextArea
                  value={keterangan}
                  onChange={onKeterangan}
                  rows={2}
                  placeholder="..."
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        style={{ top: 5 }}
        visible={modalJadwal}
        onCancel={() => {
          setmodalJadwal(false);
        }}
        width="70%"
        footer={false}
      >
        <FormJadwalOperasi />
      </Modal>
    </div>
  );
};

export default FormPengajuanJadwalOperasi;
