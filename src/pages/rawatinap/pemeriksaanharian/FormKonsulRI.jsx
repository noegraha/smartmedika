import React, { Fragment, useState } from "react";
import {
  Form,
  Row,
  Col,
  Input,
  Table,
  Select,
  DatePicker,
  Button,
  Checkbox,
  Empty,
  Modal,
  message,
  Popconfirm,
  Space,
  Card,
  Typography,
  Alert,
  Statistic,
  Tag,
  Radio,
  Switch,
  Tooltip,
} from "antd";
import { useContext } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { KonsulContext } from "../../rawatjalan/context/KonsulContext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import FormKonsulTanyaRI from "./FormKonsulTanyaRI";
import dayjs from "dayjs";
import { KonsulRIContext } from "../context/KonsulDokterRIContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { MasterDokterContext } from "../../master/context/MasterDokter/MasterDokterContext";
//
const { Paragraph, Text } = Typography;

const { TextArea } = Input;
const { Column } = Table;
const { confirm } = Modal;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const formItemLayoutFull = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const FormKonsulRI = () => {
  const { ruangasal, curpas } = useContext(PasienContext);
  const { curpasRI } = useContext(PasienRIContext);
  const [visible, setVisible] = useState(false);
  const [deskSmf, setdeskSmf] = useState("");
  const [deskS, setdeskS] = useState("");
  const [deskO, setdeskO] = useState("");
  const [deskA, setdeskA] = useState("");
  const [deskP, setdeskP] = useState("");
  const {
    setkonsultasiId,
    konsultasiId,
    tanggal,
    settanggal,
    dokterId,
    setdokterId,
    smftujuan,
    setsmftujuan,
    alihRawat,
    setalihRawat,
    dokterTujuanId,
    setdokterTujuanId,
    subjective,
    setsubjective,
    objective,
    setobjective,
    assesment,
    setassesment,
    planning,
    setplanning,
    tanggalJawab,
    settanggalJawab,
    smfjawab,
    setsmfjawab,
    subjectJawab,
    setsubjectJawab,
    objectJawab,
    setobjectJawab,
    ajawab,
    setajawab,
    pjawab,
    setpjawab,
    dokterJawabId,
    setdokterJawabId,
    listKonsultasiRI,
    listkonsulri,
    setListkonsulri,
    getkonsulRIid,
    setKonsulRIid,
    getkosulid,
    listSOAP,
    setListSOAP,
    ambillistSOAPRI,
    ambilSOAPIdRI,
    konsulbaru,
    formkonsul,
    setformkonsul,
    formjawabkonsul,
    setformjawabkonsul,
    insertKonsulRI,
    jawabKonsulRI,
    deleteKonsulRi,
    modalkonsul,
    setModalKonsul,
    openmodal,
    setOpenModal,
    modalEdit,
    setModalEdit,
    modalJawab,
    setmodalJawab,
  } = useContext(KonsulRIContext);
  const {
    listSpesialis,
    listdokterSpesialis,
    getDokterBySpesialisId,
    listSpesialisDBRS,
    setlistSpesialisDBRS,
    listdokterSpesialisDBRS,
    setlistdokterSpesialisDBRS,
    getDokterBySpesialisIdDBRS,
  } = useContext(MasterDokterContext);
  const namauser = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const kodeDokter = sessionStorage.getItem("pegawai");

  const onModalSoap = (noreg) => {
    // console.log(noreg);
    ambillistSOAPRI(noreg);
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const datakonsultasi = {
    konsultasiId: konsultasiId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    ruangTujuan: curpasRI.ruangId,
    tanggal: dayjs(tanggal).format("YYYY-MM-DDTHH:mm"),
    dokterId:
      dokterId === null || dokterId === "" ? curpasRI.dokterId : dokterId,
    smftujuan: parseInt(smftujuan),
    alihRawat: alihRawat,
    dokterTujuanId: dokterTujuanId,
    subjective: subjective,
    objective: objective,
    assesment: assesment,
    planning: planning,
    userId: namauser,
    userKonsul: namauser,
    clientHost: host,
    clientIp: ip,
  };
  const onSmftujuan = (e) => {
    setsmftujuan(e);
    getDokterBySpesialisIdDBRS(e);
  };
  const onDoktertujuan = (e) => {
    setdokterTujuanId(e);
  };
  const onSkonsul = (e) => {
    setsubjective(e.target.value);
  };
  const onOkonsul = (e) => {
    setobjective(e.target.value);
  };
  const onAkonsul = (e) => {
    setassesment(e.target.value);
  };
  const onPkonsul = (e) => {
    setplanning(e.target.value);
  };
  function showConfirmBatal(id, noreg, ruang) {
    confirm({
      title: (
        <Alert
          message="Apakah Anda yakin akan Membatalkan Konsul ?"
          type="warning"
        />
      ),
      icon: <ExclamationCircleOutlined />,
      content: "Data konsul yang dibatalkan akan terhapus.",
      onOk() {
        deleteKonsulRi(id, noreg, ruang);
      },
      onCancel() {
        console.log(id, noreg, ruang);
      },
    });
  }

  const simpanKonsul = (e) => {
    insertKonsulRI(datakonsultasi);
    console.log("konsul", datakonsultasi);
  };
  function showConfirmSimpan(e) {
    smftujuan === null || smftujuan === ""
      ? Modal.warning({ content: "SMF Tujuan belum diisi" })
      : dokterTujuanId === null || dokterTujuanId === ""
      ? Modal.warning({ content: "Dokter Tujuan belum diisi" })
      : alihRawat
      ? confirm({
          title: (
            <Alert
              message="Apakah Anda yakin akan Alih Rawat ?"
              type="warning"
            />
          ),
          icon: <ExclamationCircleOutlined />,
          content: "Data yang sudah diinputkan tidak bisa diubah kembali.",
          onOk() {
            simpanKonsul(e);
          },
          onCancel() {
            console.log(e);
          },
        })
      : simpanKonsul(e);
  }

  const dataJawab = {
    konsultasiId: konsultasiId,
    registrasiId: curpasRI.registrasiId,
    tanggalJawab: dayjs(tanggalJawab).format("YYYY-MM-DDTHH:mm"),
    smfjawab: smfjawab,
    subjectJawab: subjectJawab,
    objectJawab: objectJawab,
    ajawab: ajawab,
    pjawab: pjawab,
    dokterJawabId: dokterJawabId,
    userJawab: namauser,
    clientHost: host,
    clientIP: ip,
  };

  function showConfirm() {
    confirm({
      title: "Anda yakin akan mengsubmit jawaban konsul?",
      icon: <ExclamationCircleOutlined />,
      content: "Pastikan jawaban sudah terisi dengan benar.",
      onOk() {
        jawabKonsulRI(dataJawab, curpasRI.ruangId);
        // setmodalJawab(false);
        console.log(dataJawab);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  return (
    <Fragment>
      <Card
        // title="Konsul"
        size="small"
        headStyle={{
          fontWeight: "bolder",
          backgroundColor: "beige",
        }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={
          <Space>
            <FormKonsulTanyaRI />
          </Space>
        }
      >
        <Table
          bordered
          pagination={false}
          dataSource={listkonsulri}
          size="small"
          rowKey="reg"
          scroll={{ x: 700 }}
        >
          <Column
            title="Tanggal"
            key="reg"
            width="20%"
            defaultSortOrder="ascend"
            // sorter={(a, b) => a.tglkonsul.localeCompare(b.tglkonsul)}
            render={(listkonsulri) => (
              <span>
                {listkonsulri.AlihRawat === true ? (
                  <Tag color="warning">ALIH RAWAT</Tag>
                ) : (
                  <Tag color="processing">KONSUL BIASA</Tag>
                )}
                <br />
                {dayjs(listkonsulri.Tanggal).format("DD-MM-YYYY HH:mm")}
                <br />
                <br />
                Dokter Asal
                <br />
                {listkonsulri.NamaDokter}
                <br />
                <br />
                Dokter Tujuan
                <br />
                {listkonsulri.SmfTujuanDesk}
                <br />
                {listkonsulri.DokterTujuanDesk}
              </span>
            )}
          />
          <Column
            title="KONSUL"
            width="30%"
            key="reg"
            className="tabeltabel"
            render={(listkonsulri) => (
              <span>
                <b>S : </b>
                {listkonsulri.Subjective}
                <br />
                <br />
                <b>O : </b>
                {listkonsulri.Objective}
                <br />
                <br />
                <b>A : </b>
                {listkonsulri.Assesment}
                <br />
                <br />
                <b>P : </b>
                {listkonsulri.Planning}
              </span>
            )}
          />
          <Column
            title="JAWAB"
            width="30%"
            key="reg"
            className="tabeltabel"
            render={(listkonsulri) => (
              <span>
                <b>S : </b>
                {listkonsulri.SubjectJawab}
                <br />
                <br />
                <b>O : </b>
                {listkonsulri.ObjectJawab}
                <br />
                <br />
                <b>A : </b>
                {listkonsulri.AJawab}
                <br />
                <br />
                <b>P : </b>
                {listkonsulri.PJawab}
              </span>
            )}
          />
          <Column
            title="Aksi"
            key="reg"
            fixed="right"
            className="tabeltabel"
            width="20%"
            render={(listkonsulri) => (
              <span>
                {listkonsulri.RuangId.substring(0, 2) === "91" ? (
                  <div style={{ textAlign: "center" }}>
                    <Tag color="#3b5999">Konsultasi Poliklinik</Tag>
                  </div>
                ) : // ) : listkonsulri.RuangId.substring(0, 2) === "95" ? (
                //   <div style={{ textAlign: "center" }}>
                //     <Tag color="#3b5999">Konsultasi IGD</Tag>
                //   </div>)
                listkonsulri.TanggalJawab === null ||
                  listkonsulri.TanggalJawab === "" ||
                  listkonsulri.TanggalJawab === undefined ? (
                  <div style={{ textAlign: "center" }}>
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        getDokterBySpesialisIdDBRS(listkonsulri.SmfTujuan);
                        console.log(listkonsulri);
                        setdokterJawabId(listkonsulri.DokterTujuanId);
                        setsmfjawab(listkonsulri.SmfTujuan);
                        setkonsultasiId(listkonsulri.KonsultasiId);
                        setdeskSmf(listkonsulri.SmfTujuanDesk);
                        setdeskS(
                          listkonsulri.Subjective === null ||
                            listkonsulri.Subjective === ""
                            ? "-"
                            : listkonsulri.Subjective
                        );
                        setdeskO(
                          listkonsulri.Objective === null ||
                            listkonsulri.Objective === ""
                            ? "-"
                            : listkonsulri.Objective
                        );
                        setdeskA(
                          listkonsulri.Assesment === null ||
                            listkonsulri.Assesment === ""
                            ? "-"
                            : listkonsulri.Assesment
                        );
                        setdeskP(
                          listkonsulri.Planning === null ||
                            listkonsulri.Planning === ""
                            ? "-"
                            : listkonsulri.Planning
                        );
                        setalihRawat(listkonsulri.AlihRawat);
                        setmodalJawab(true);
                        settanggalJawab(dayjs());
                        setsubjectJawab("");
                        setobjectJawab("");
                        setajawab("");
                        setpjawab("");
                      }}
                    >
                      Jawab Konsul
                    </Button>
                    <br />
                    <br />
                    <Button
                      style={{ color: "white", backgroundColor: "green" }}
                      size="small"
                      onClick={() => {
                        getDokterBySpesialisIdDBRS(listkonsulri.SmfTujuan);
                        setkonsultasiId(listkonsulri.KonsultasiId);
                        setsmftujuan(listkonsulri.SmfTujuan);
                        setalihRawat(listkonsulri.AlihRawat);
                        setdokterTujuanId(listkonsulri.DokterTujuanId);
                        setsubjective(listkonsulri.Subjective);
                        setobjective(listkonsulri.Objective);
                        setassesment(listkonsulri.Assesment);
                        setplanning(listkonsulri.Planning);
                        settanggal(dayjs(listkonsulri.Tanggal));
                        setModalEdit(true);
                      }}
                    >
                      Edit Konsul
                    </Button>
                    <br />
                    <br />
                    <Button
                      type="primary"
                      danger
                      size="small"
                      onClick={() =>
                        showConfirmBatal(
                          String(listkonsulri.KonsultasiId),
                          listkonsulri.RegistrasiId,
                          listkonsulri.RuangId
                        )
                      }
                    >
                      Batal Konsul
                    </Button>
                  </div>
                ) : (
                  <div style={{ textAlign: "center" }}>
                    <Tag color="success">Sudah dijawab</Tag>
                    <br />
                    <br />
                    <Button
                      size="small"
                      type="primary"
                      onClick={() => {
                        getDokterBySpesialisIdDBRS(listkonsulri.SmfTujuan);
                        console.log(listkonsulri);
                        setdokterJawabId(listkonsulri.DokterTujuanId);
                        setsmfjawab(listkonsulri.SmfTujuan);
                        setkonsultasiId(listkonsulri.KonsultasiId);
                        setdeskSmf(listkonsulri.SmfTujuanDesk);
                        setdeskS(
                          listkonsulri.Subjective === null ||
                            listkonsulri.Subjective === ""
                            ? "-"
                            : listkonsulri.Subjective
                        );
                        setdeskO(
                          listkonsulri.Objective === null ||
                            listkonsulri.Objective === ""
                            ? "-"
                            : listkonsulri.Objective
                        );
                        setdeskA(
                          listkonsulri.Assesment === null ||
                            listkonsulri.Assesment === ""
                            ? "-"
                            : listkonsulri.Assesment
                        );
                        setdeskP(
                          listkonsulri.Planning === null ||
                            listkonsulri.Planning === ""
                            ? "-"
                            : listkonsulri.Planning
                        );
                        setalihRawat(listkonsulri.AlihRawat);
                        setmodalJawab(true);
                        settanggalJawab(dayjs(listkonsulri.TanggalJawab));
                        setsubjectJawab(listkonsulri.SubjectJawab);
                        setobjectJawab(listkonsulri.ObjectJawab);
                        setajawab(listkonsulri.AJawab);
                        setpjawab(listkonsulri.PJawab);
                      }}
                    >
                      Edit Jawab
                    </Button>
                    <br />
                    <br />
                    <Button
                      style={{ color: "white", backgroundColor: "green" }}
                      size="small"
                      onClick={() => {
                        getDokterBySpesialisIdDBRS(listkonsulri.SmfTujuan);
                        setkonsultasiId(listkonsulri.KonsultasiId);
                        setsmftujuan(listkonsulri.SmfTujuan);
                        setalihRawat(listkonsulri.AlihRawat);
                        setdokterTujuanId(listkonsulri.DokterTujuanId);
                        setsubjective(listkonsulri.Subjective);
                        setobjective(listkonsulri.Objective);
                        setassesment(listkonsulri.Assesment);
                        setplanning(listkonsulri.Planning);
                        settanggal(dayjs(listkonsulri.Tanggal));
                        setModalEdit(true);
                      }}
                    >
                      Edit Konsul
                    </Button>
                    <br />
                    <br />
                    <Button
                      type="primary"
                      danger
                      size="small"
                      onClick={() =>
                        showConfirmBatal(
                          String(listkonsulri.KonsultasiId),
                          listkonsulri.RegistrasiId,
                          listkonsulri.RuangId
                        )
                      }
                    >
                      Batal Konsul
                    </Button>
                  </div>
                )}
              </span>
            )}
          />
        </Table>
      </Card>

      <Modal
        confirmLoading={openmodal}
        width="70%"
        title={<div>Form Konsul</div>}
        style={{ marginTop: 10 }}
        visible={modalEdit}
        footer={[
          <div>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}>
                <Button
                  onClick={() => onModalSoap(curpasRI.registrasiId)}
                  style={{ marginBottom: 5, textAlign: "left" }}
                >
                  Data SOAP
                </Button>
              </Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Space>
                  <Button
                    onClick={() => {
                      setModalEdit(false);
                      setsmftujuan("");
                      setdokterTujuanId("");
                      setsubjective("");
                      setassesment("");
                      setobjective("");
                      setplanning("");
                    }}
                  >
                    {" "}
                    Batal
                  </Button>
                  <Button
                    onClick={() => showConfirmSimpan(datakonsultasi)}
                    type="primary"
                  >
                    {" "}
                    Simpan
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>,
        ]}
      >
        <Form.Item
          {...formItemLayoutFull}
          label="SMF Tujuan"
          style={{ marginBottom: 5 }}
        >
          <Select
            value={smftujuan}
            dataSource={listSpesialisDBRS}
            onChange={(e) => {
              onSmftujuan(e);
              setdokterTujuanId("");
              console.log(e);
            }}
            disabled={formkonsul}
            showSearch
            style={{ width: "100%" }}
            placeholder="..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {listSpesialisDBRS.map((d) => (
              <Option key={d.SpesialisId}>{d.Deskripsi}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          {...formItemLayoutFull}
          label="Konsulen"
          style={{ marginBottom: 5 }}
        >
          <Select
            value={dokterTujuanId}
            onChange={onDoktertujuan}
            disabled={formkonsul}
            dataSource={listdokterSpesialisDBRS}
            showSearch
            style={{ width: "100%" }}
            placeholder="..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {listdokterSpesialisDBRS.map((d) => (
              <Option key={d.DokterId}>{d.Deskripsi}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          {...formItemLayoutFull}
          label="Tanggal"
          style={{ marginBottom: 5 }}
        >
          <DatePicker
            showTime
            format="DD-MM-YYYY HH:mm"
            style={{ width: "100%" }}
            placeholder="..."
            value={tanggal}
            onChange={(e) => {
              settanggal(e);
            }}
          />
        </Form.Item>
        <Form.Item
          {...formItemLayoutFull}
          label="Alih Rawat"
          style={{ marginBottom: 5 }}
        >
          <Switch
            checked={alihRawat}
            checkedChildren="Alih Rawat"
            unCheckedChildren="Biasa"
            onChange={(e) => {
              if (e === true) {
                setalihRawat(true);
                console.log("Kirim cppt");
              } else {
                console.log("catatan biasa");
                setalihRawat(false);
              }
            }}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="S" style={{ marginBottom: 5 }}>
          <TextArea
            rows={2}
            placeholder="..."
            disabled={formkonsul}
            onChange={onSkonsul}
            value={subjective}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="O" style={{ marginBottom: 5 }}>
          <TextArea
            rows={2}
            placeholder="..."
            disabled={formkonsul}
            onChange={onOkonsul}
            value={objective}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="A" style={{ marginBottom: 5 }}>
          <TextArea
            rows={2}
            placeholder="..."
            disabled={formkonsul}
            onChange={onAkonsul}
            value={assesment}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="P" style={{ marginBottom: 5 }}>
          <TextArea
            rows={2}
            placeholder="..."
            disabled={formkonsul}
            onChange={onPkonsul}
            value={planning}
          />
        </Form.Item>
      </Modal>

      <Modal
        title="DATA SOAP PASIEN"
        visible={visible}
        width="1000px"
        footer={null}
        //onOk={handleOk}
        onCancel={handleOk}
      >
        <Table
          bordered
          locale={{
            emptyText: <Empty description="Data Konsultasi Kosong" />,
          }}
          dataSource={listSOAP}
          size="small"
          rowKey="reg"
          pagination={{
            position: ["topRight"],
            pageSize: [5],
          }}
        >
          <Column
            title="Tanggal"
            key="tgl"
            render={(listSOAP) => (
              <span>{dayjs(listSOAP.tglJam).format("DD-MM-YYYY HH:mm")}</span>
            )}
          />
          <Column
            title="Subjektif"
            key="subjektif"
            render={(listSOAP) => <span>{listSOAP.Subjektif}</span>}
          />
          <Column
            title="Objektif"
            key="objektif"
            render={(listSOAP) => <span>{listSOAP.Objektif}</span>}
          />
          <Column
            title="Assesment"
            key="assesment"
            render={(listSOAP) => <span>{listSOAP.Assesment}</span>}
          />
          <Column
            title="Planning"
            key="planning"
            render={(listSOAP) => <span>{listSOAP.Planning}</span>}
          />
          <Column
            title="Aksi"
            key="aksi"
            render={(listSOAP) => (
              <span>
                <Button
                  type="primary"
                  onClick={() => {
                    setsubjective(listSOAP.Subjektif);
                    setobjective(listSOAP.Objektif);
                    setassesment(listSOAP.Assesment);
                    setplanning(listSOAP.Planning);
                    setVisible(false);
                  }}
                >
                  Ambil
                </Button>
              </span>
            )}
          />
        </Table>
      </Modal>
      {/* Modal Jawab Konsul */}
      <Modal
        width="70%"
        title="Form Jawab Konsul"
        style={{ marginTop: 10 }}
        visible={modalJawab}
        footer={[
          <div>
            <Row>
              <Col span={12} style={{ textAlign: "left" }}></Col>
              <Col span={12} style={{ textAlign: "right" }}>
                <Space>
                  <Button
                    key="back"
                    onClick={(e) => {
                      setmodalJawab(false);
                      settanggalJawab(dayjs());
                    }}
                  >
                    Kembali
                  </Button>
                  {/* {kodeDokter[0] === "D" ? ( */}
                  <Button
                    key="submit"
                    type="primary"
                    onClick={() => {
                      if (dokterJawabId === null) {
                        Modal.warning({
                          title: "Dokter Jawab Masih Kosong",
                          content: "Mohon Diisi Dokter Jawab terlebih Dahulu",
                        });
                      } else {
                        showConfirm();
                        console.log(dataJawab);
                      }
                    }}
                  >
                    Simpan
                  </Button>
                </Space>
              </Col>
            </Row>
          </div>,
        ]}
      >
        <Form.Item
          {...formItemLayoutFull}
          label="SMF Tujuan"
          style={{ marginBottom: 5 }}
        >
          <Select
            value={deskSmf}
            disabled
            showSearch
            style={{ width: "100%" }}
            placeholder="..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          ></Select>
        </Form.Item>
        <Form.Item
          {...formItemLayoutFull}
          label="Dokter"
          style={{ marginBottom: 5 }}
        >
          <Select
            onChange={(e) => {
              setdokterJawabId(e);
            }}
            value={dokterJawabId}
            dataSource={listdokterSpesialisDBRS}
            showSearch
            style={{ width: "100%" }}
            placeholder="..."
            optionFilterProp="children"
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {listdokterSpesialisDBRS.map((d) => (
              <Option key={d.DokterId}>{d.Deskripsi}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          {...formItemLayoutFull}
          label="Tgl Jawab"
          style={{ marginBottom: 5 }}
        >
          <DatePicker
            showTime
            format="DD-MM-YYYY HH:mm"
            style={{ width: "100%" }}
            placeholder="..."
            value={tanggalJawab}
            onChange={(e) => {
              settanggalJawab(e);
            }}
          />
        </Form.Item>

        <Form.Item
          {...formItemLayoutFull}
          label="Alih Rawat"
          style={{ marginBottom: 5 }}
        >
          {alihRawat === true ? (
            <Button style={{ backgroundColor: "gold" }}>YA</Button>
          ) : (
            "-"
          )}
        </Form.Item>

        <Form.Item {...formItemLayout} label="S" style={{ marginBottom: 5 }}>
          <Paragraph style={{ backgroundColor: "#fff1b8" }}>{deskS}</Paragraph>
          <TextArea
            rows={2}
            placeholder="..."
            value={subjectJawab}
            onChange={(e) => {
              setsubjectJawab(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="O" style={{ marginBottom: 5 }}>
          <Paragraph style={{ backgroundColor: "#fff1b8" }}>{deskO}</Paragraph>
          <TextArea
            rows={2}
            placeholder="..."
            value={objectJawab}
            onChange={(e) => {
              setobjectJawab(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="A" style={{ marginBottom: 5 }}>
          <Paragraph style={{ backgroundColor: "#fff1b8" }}>{deskA}</Paragraph>
          <TextArea
            rows={2}
            placeholder="..."
            value={ajawab}
            onChange={(e) => {
              setajawab(e.target.value);
            }}
          />
        </Form.Item>
        <Form.Item {...formItemLayout} label="P" style={{ marginBottom: 5 }}>
          <Paragraph style={{ backgroundColor: "#fff1b8" }}>{deskP}</Paragraph>
          <TextArea
            rows={2}
            placeholder="..."
            value={pjawab}
            onChange={(e) => {
              setpjawab(e.target.value);
            }}
          />
        </Form.Item>
      </Modal>
    </Fragment>
  );
};

export default FormKonsulRI;
