import React, { useContext, useState } from "react";
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
import Iframe from "react-iframe";
import Column from "antd/lib/table/Column";
import { ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import Draggable from "react-draggable";
import { LoginContext } from "../../rawatjalan/context";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import { KonsulContext } from "../../rawatjalan/context/KonsulContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { JenisTenagaKesehatanContext } from "../../master/context/MasterJenisTenagaKesehatan";
import { KonsulRIContext } from "../context/KonsulDokterRIContext";
import { MasterDokterContext } from "../../master/context/MasterDokter/MasterDokterContext";
import { Color } from "bizcharts/lib/plots/core/dependents";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";

const draggleRef = React.createRef();
const dateFormat = "DD-MM-YYYY";

const { TextArea } = Input;
const { Option } = Select;
const { Title, Text } = Typography;
const { Countdown } = Statistic;

const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};
const formItemLayoutFull = {
  labelCol: { span: 2 },
  wrapperCol: { span: 22 },
};

const { confirm } = Modal;
const FormKonsulTanyaRI = () => {
  const [visible, setVisible] = useState(false);
  const [dataSoapKonsul, setdataSoapKonsul] = useState([]);
  const RsLokasiKonsul = sessionStorage.getItem("RSMana");
  const { pegawai } = useContext(LoginContext);
  const { dokterpoli, getDokterShift, dokterall } =
    useContext(PelayananContext);
  const { curpas, ruangpoli } = useContext(PasienContext);
  const { curpasRI } = useContext(PasienRIContext);
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
  } = useContext(KonsulRIContext);
  const {
    getPrintKonsulRI,
    printKonsulRI,
    setprintKonsulRI,
    modalKonsul,
    setmodalKonsul,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);
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
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };
  const namauser = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const kodeDokter = sessionStorage.getItem("pegawai");

  const onSmftujuan = (e) => {
    setsmftujuan(e);
    console.log(e);
    setdokterTujuanId("");
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

  const datakonsultasi = {
    konsultasiId: 0,
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

  const onChangebox = (e) => {
    setalihRawat(e.target.checked);
    console.log("coba cekbox", e.target.checked);
  };
  const onkonsulbaru = (id) => {
    konsulbaru(id);
    setformkonsul(false);
    setformjawabkonsul(true);
    // setWarnaRow([]);
  };

  const onAmbilSoapId = (id) => {
    ambilSOAPIdRI(id);
    console.log(id);
    // setVisible(false);
  };

  const onModalSoap = (noreg) => {
    // console.log(noreg);
    ambillistSOAPRI(noreg);
    setVisible(true);
  };
  const handleOk = () => {
    setVisible(false);
  };
  const d = new Date();
  let day = d.getDay();
  const setMV = (e) => {
    setModalKonsul(e);
  };

  const simpanKonsul = (e) => {
    // e.preventDefault();
    insertKonsulRI(datakonsultasi);
    // setOpenModal(true);
    console.log("konsul", datakonsultasi);
  };
  function showConfirm(e) {
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
  const openkonsul = () => {
    setMV(true);
    settanggal(dayjs());
  };
  return (
    <div>
      <Space>
        <Button
          size="small"
          onClick={() => {
            getPrintKonsulRI(curpasRI.registrasiId, "1");
          }}
        >
          Cetak
        </Button>
        <Button
          type="primary"
          size="small"
          onClick={() => {
            openkonsul();
          }}
        >
          Tambah
        </Button>
      </Space>

      <Modal
        confirmLoading={openmodal}
        width="70%"
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            onFocus={() => {}}
            onBlur={() => {}}
          >
            Form Konsul
          </div>
        }
        style={{ marginTop: 10 }}
        visible={modalkonsul}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
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
                      setModalKonsul(false);
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
                  {/* {kodeDokter[0] === "D" ? ( */}
                  <Button
                    onClick={() => showConfirm(datakonsultasi)}
                    type="primary"
                  >
                    {" "}
                    Simpan
                  </Button>
                  {/* ) : ( */}
                  {/* <Tooltip title="Dokter Yang Dapat Melakukan Konsultasi!">
                    <Button
                      disabled
                      onClick={() => showConfirm(datakonsultasi)}
                      type="primary"
                    >
                      {" "}
                      Simpan
                    </Button>
                  </Tooltip> */}
                  {/* )} */}
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
            onChange={onSmftujuan}
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
          {/* <Radio.Group
            name="radiogroup"
            defaultValue={false}
            onChange={(e) => onChangebox(e)}
          >
            <Radio value={false}>Konsul Biasa</Radio>
            <Radio value={true}>Alih Rawat</Radio>
          </Radio.Group> */}
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
          pagination={{
            position: ["topRight"],
            pageSize: [5],
          }}
          dataSource={listSOAP}
          size="small"
          rowKey="reg"
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

      <Modal
        width="70%"
        footer={null}
        open={modalKonsul}
        onCancel={() => {
          setmodalKonsul(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printKonsulRI}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
    </div>
  );
};

export default FormKonsulTanyaRI;
