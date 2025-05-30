import {
  Button,
  Card,
  Col,
  Form,
  Row,
  Switch,
  Select,
  Input,
  DatePicker,
  Image,
  Spin,
  Modal,
  message,
  Tooltip,
} from "antd";
import { CloudDownloadOutlined } from "@ant-design/icons";
import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import HdContext from "../../HdContext";
import InformConcent from "./ReportHd/InformConcent";
import Signature from "./SignatureHD/Signature";
import Signaturea from "./SignatureHD/Signaturea";
import { useEffect } from "react";
import CaptureTtd from "./SignatureHD/CaptureTtd";
import Iframe from "react-iframe";

const { PasiensContext } = HdContext;

const { Option } = Select;
const { TextArea } = Input;

function FormInformConsent() {
  const props = useContext(PasiensContext);
  const [isModalVisiblea, setIsModalVisiblea] = useState(false);

  const showModala = () => {
    // props.getInformConsent();
    props.getReportInformConsent(props.pasien.result.registrasiId, props.noOrder);
    setIsModalVisiblea(true);
  };

  const handleCancela = () => {
    setIsModalVisiblea(false);
  };

  const changeKtgTtd = (e) => {
    props.setktgTtd(e);
    if (e === "1") {
      props.setnamattd1(props.pasien.result.nama);
    } else {
      props.setnamattd1(props.namaKeluarga);
    }
  };

  // const [tandatangan, setTandaTangan] = useState("")

  // const sigCanvas = useRef({});
  // const clear = () => sigCanvas.current.clear();
  // const save = () =>
  //     setTandaTangan(sigCanvas.current.getTrimmedCanvas().toDataURL().substr(22));

  const klikSimpan = () => {
    !props.dokterIdIc
      ? Modal.warning({
        title: "Peringatan!",
        content: "Dokter Pelaksana Tindakan masih kosong.",
      })
      : !props.jenisPenerima
        ? Modal.warning({
          title: "Peringatan!",
          content: "Penerima Informasi masih kosong.",
        })
        : !props.namaKeluarga
          ? Modal.warning({
            title: "Peringatan!",
            content: "Nama Keluarga Pasien masih kosong.",
          })
          : !props.tglLahirKeluarga && props.jenisPenerima === "2"
            ? Modal.warning({
              title: "Peringatan!",
              content: "Tgl Lahir Keluarga Pasien masih kosong.",
            })
            : !props.umurKeluarga && props.jenisPenerima === "2"
              ? Modal.warning({
                title: "Peringatan!",
                content: "Silahkan pilih tanggal lahir Wali Keluarga dahulu!",
              })
              : props.umurKeluargaa < 17 && props.jenisPenerima === "2"
                ? Modal.warning({
                  title: "Peringatan!",
                  content: "Umur Wali belum 17 Tahun!",
                })
                : !props.alamatKeluarga && props.jenisPenerima === "2"
                  ? Modal.warning({
                    title: "Peringatan!",
                    content: "Alamat Keluarga Pasien masih kosong.",
                  })
                  : !props.perawatPendampingId
                    ? Modal.warning({
                      title: "Peringatan!",
                      content: "Perawat Pendamping masih kosong.",
                    })
                    : props.userIC && props.userIC !== props.user
                      ? Modal.warning({
                        title: "Peringatan!",
                        content: "User Anda dan User Entry berbeda, tidak bisa simpan!",
                      })
                      : // !props.ttdPasien ? message.warning('Tanda tangan Pasien masih kosong.') :
                      //     !props.ttdKeluargaPasien ? message.warning('Tanda tangan Keluarga Pasien masih kosong.') :
                      // message.success('OK.')
                      props.klikInformedConsent();
  };

  useEffect(() => {
    const extScriptA = document.createElement("script");
    extScriptA.src = "wgssSigCaptX.js";
    extScriptA.async = true;
    document.head.append(extScriptA);

    const extScriptB = document.createElement("script");
    extScriptB.src = "base64.js";
    extScriptB.async = true;
    document.head.append(extScriptB);

    const extScriptC = document.createElement("script");
    extScriptC.src = "SigCaptX-Globals.js";
    extScriptC.async = true;
    document.head.append(extScriptC);

    const extScriptD = document.createElement("script");
    extScriptD.src = "SigCaptX-Utils.js";
    extScriptD.async = true;
    document.head.append(extScriptD);

    const extScriptE = document.createElement("script");
    extScriptE.src = "SigCaptX-SessionControl.js";
    extScriptE.async = true;
    document.head.append(extScriptE);

    const extScriptF = document.createElement("script");
    extScriptF.src = "SigCaptX-Functions.js";
    extScriptF.async = true;
    document.head.append(extScriptF);

    console.log("Komponen Mounted");

    return () => {
      extScriptA.remove();
      extScriptB.remove();
      extScriptC.remove();
      extScriptD.remove();
      extScriptE.remove();
      extScriptF.remove();
      console.log("Komponen Unmounted");
    };
  }, []);

  return (
    <div>
      <Card
        loading={props.isLoadingInformConsent}
        title="Form Informed Consent"
        size="small"
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
        // labelAlign="left"
        >
          <Form.Item label="Nama Pasien" style={{ marginBottom: "0px" }}>
            <span>
              {props.pasien.result.nama ? props.pasien.result.nama : "-"}
            </span>
          </Form.Item>

          <Form.Item label="No.Rm" style={{ marginBottom: "0px" }}>
            <span>
              {props.pasien.result.pasienId
                ? props.pasien.result.pasienId
                : "-"}
            </span>
          </Form.Item>

          <Form.Item label="Tanggal Lahir" style={{ marginBottom: "0px" }}>
            <span>
              {props.pasien.result.tanggalLahir
                ? dayjs(props.pasien.result.tanggalLahir).format("DD-MM-YYYY")
                : "-"}
            </span>
          </Form.Item>

          <Form.Item
            label="Dokter Pelaksana Tindakan"
            style={{ marginBottom: "0px" }}
          >
            <Input.Group compact>
              <Select
                // defaultValue="DOKTER 1"
                value={props.dokterIdIc}
                onChange={props.changeDokterIdIc}
                size="small"
                showSearch
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                style={{ width: "94%" }}
              >
                {props.optDpjp.map((optDokter, index) => (
                  <Option key={index} value={optDokter.dokterId}>
                    {optDokter.namaDokter}
                  </Option>
                ))}
              </Select>
              <Button
                onClick={() => props.onClickLoadMst()}
                type="primary"
                size="small"
                style={{ width: "6%" }}
              >
                <CloudDownloadOutlined />
              </Button>
            </Input.Group>
          </Form.Item>

          <Form.Item label="Pemberi Informasi" style={{ marginBottom: "0px" }}>
            <Select
              // defaultValue="DOKTER 1"
              value={props.dokterIdIc}
              size="small"
              showSearch
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {props.optDpjp.map((optDokter, index) => (
                <Option key={index} value={optDokter.dokterId}>
                  {optDokter.namaDokter}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Penerima Informasi / Pemberi Persetujuan"
            style={{ marginBottom: "0px" }}
          >
            <Select
              value={props.jenisPenerima}
              onChange={props.changeJenisPenerima}
              // defaultValue={false}
              size="small"
            >
              <Option value="1">Pasien</Option>
              <Option value="2">Wali/Keluarga</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Nama Keluarga Pasien"
            style={{ marginBottom: "0px" }}
          >
            <Input
              value={props.namaKeluarga}
              onChange={props.changeNamaKeluarga}
              maxLength={89}
              placeholder="Nama Keluarga Pasien"
              size="small"
            // style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Tgl Lahir Keluarga Pasien"
            style={{ marginBottom: "0px" }}
          >
            <DatePicker
              size="small"
              // defaultValue={props.tanggal}
              value={dayjs(props.tglLahirKeluarga)}
              format={"DD-MM-YYYY"}
              onChange={props.changeTglLahirKeluarga}
              disabled={props.handleJenisPenerima}
            />
          </Form.Item>

          <Form.Item
            label="Umur Keluarga Pasien"
            style={{ marginBottom: "0px" }}
          >
            <Input
              value={props.umurKeluarga}
              // onChange={props.changeT}
              maxLength={3}
              placeholder="Umur Keluarga Pasien"
              size="small"
              disabled={props.handleJenisPenerima}
            // style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item
            label="Alamat Keluarga Pasien"
            style={{ marginBottom: "0px" }}
          >
            <Input
              value={props.alamatKeluarga}
              onChange={props.changeAlamatKeluarga}
              maxLength={200}
              placeholder="Alamat Keluarga Pasien"
              size="small"
              disabled={props.handleJenisPenerima}
            // style={{ width: "100%" }}
            />
          </Form.Item>

          <Form.Item label="Perawat Pendamping" style={{ marginBottom: "0px" }}>
            <Input.Group compact>
              <Select
                // defaultValue="A"
                value={props.perawatPendampingId}
                onChange={props.changePerawatPendampingId}
                showSearch={true}
                size="small"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                style={{ width: "94%" }}
              >
                {props.optPerawat.map((optPrwt, index) => (
                  <Option key={index} value={optPrwt.dokterId}>
                    {optPrwt.namaDokter}
                  </Option>
                ))}
              </Select>
              <Button
                onClick={() => props.onClickLoadMst()}
                type="primary"
                size="small"
                style={{ width: "6%" }}
              >
                <CloudDownloadOutlined />
              </Button>
            </Input.Group>
          </Form.Item>

          <Row style={{ marginBottom: "5px" }}>
            <Col
              span={6}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>
                <b>Jenis Informasi</b>
              </span>
            </Col>
            <Col
              span={14}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>
                <b>Isi Informasi</b>
              </span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>
                <b>Ya / Tidak</b>
              </span>
            </Col>
          </Row>

          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>1</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Diagnosis (WD & DD)</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Penyakit Ginjal Kronik / CKD / GGK</span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo1}
                checked={props.info1}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>2</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Dasar Diagnosis</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Laboratorium</span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo2}
                checked={props.info2}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>3</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Tindakan Kedokteran</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Hemodialisis</span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo3}
                checked={props.info3}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>4</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Indikasi Tindakan</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Kronik e-GFR ≤ 5 dengan sindrom uremikum</span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo4}
                checked={props.info4}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>5</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Tata Cara</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>
                Timbang berat badan pasien, lakukan identifikasi sesuai urutan
                kedatangan pasien, ukur TTV, memposisikan pasien, mesin sudah
                dalam keadaan ready, dilakukan kanulasi inlate dan outlate,
                menyambungkan akses ke AV Line dan proses HD dimulai sesuai
                dengan peresepan dokter, observasi selama HD, terminasi.
              </span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo5}
                checked={props.info5}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>6</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Tujuan</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Membuang racun dan meringankan beban kerja ginjal</span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo6}
                checked={props.info6}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>7</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Risiko</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>
                Perdarahan, hipotensi, hipoglikemi, hipertensi, hematom, syok,
                demam
              </span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo7}
                checked={props.info7}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>8</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Komplikasi</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>
                Perdarahan, penurunan kesadaran, resiko infeksi, bengkak
              </span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo8}
                checked={props.info8}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>9</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Prognosis</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Ad Dubia</span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo9}
                checked={props.info9}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <span>10</span>
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Alternatif & risiko</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>CAPD dan Transplantasi Ginjal</span>
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo10}
                checked={props.info10}
              />
            </Col>
          </Row>
          <Row style={{ marginBottom: "3px" }}>
            <Col
              span={1}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              {/* <span>6</span> */}
            </Col>
            <Col
              span={5}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Lain-lain</span>
            </Col>
            <Col
              span={14}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <TextArea
                rows={2}
                value={props.ketInfo11}
                onChange={props.changeKetInfo11}
                placeholder="Keterangan lain-lain"
                disabled={!props.info11}
              />
            </Col>
            <Col
              span={4}
              style={{
                border: "1px solid #f0f0f0",
                textAlign: "center",
                padding: "5px",
              }}
            >
              <Switch
                checkedChildren="Ya"
                unCheckedChildren="Tidak"
                onChange={props.changeInfo11}
                checked={props.info11}
              />
            </Col>
          </Row>

          <Row>
            <Col
              span={6}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <span>Capture Tanda Tangan</span>
            </Col>
            <Col
              span={18}
              style={{ border: "1px solid #f0f0f0", padding: "5px" }}
            >
              <Tooltip
                placement="right"
                title="Pilih yang akan ttd terlebih dahulu."
              >
                <Select
                  placeholder="Pilih Kategori Tanda Tangan"
                  value={props.ktgTtd}
                  onChange={(e) => changeKtgTtd(e)}
                  allowClear
                  style={{ width: "100%" }}
                >
                  <Option
                    value="1"
                    disabled={props.jenisPenerima === "2" ? true : false}
                  >
                    Pasien
                  </Option>
                  <Option value="2">Wali/Keluarga</Option>
                </Select>
              </Tooltip>
              <CaptureTtd />
            </Col>
          </Row>

          <Row>
            <Col
              span={12}
              style={{
                border: "1px solid #f0f0f0",
                padding: "5px",
                textAlign: "center",
              }}
            >
              <span>Tanda Tangan</span>
              <br />
              <Image
                width={200}
                src={`data:image/jpeg;base64,${props.ttdPasien}`}
              />
              {/* <Signature /> */}
              {/* <Image
                                height={100}
                                src={`data:image/jpeg;base64,` + props.ttdPasien}
                                style={{ marginTop: '5px' }}
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
                                                ref={props.sigCanvas}
                                                canvasProps={{
                                                    width: 388,
                                                    height: 200,
                                                    className: "signatureCanvas",
                                                    border: "1px solid #000000",
                                                }}
                                            />
                                        </div>
                                        <button onClick={props.save}>Save</button>
                                        <button onClick={props.clear}>Clear</button>
                                        <button onClick={close}>Close</button>
                                    </>
                                )}
                            </Popup> */}
            </Col>
            <Col
              span={12}
              style={{
                border: "1px solid #f0f0f0",
                padding: "5px",
                textAlign: "center",
              }}
            >
              <span>Tanda Tangan</span>
              <br />
              <Image
                width={200}
                src={`data:image/jpeg;base64,${props.ttdKeluargaPasien}`}
              />
              {/* <Signaturea /> */}
              {/* <Image
                                height={100}
                                src={`data:image/jpeg;base64,` + props.ttdKeluargaPasien}
                                style={{ marginTop: '5px' }}
                            />
                            <br />
                            <Popup
                                modal
                                trigger={<Button disabled={props.jenisPenerima === "2" ? true : false} >Open Signature Pad</Button>}
                                closeOnDocumentClick={false}
                                contentStyle={{ width: 400 }}
                            >
                                {(close) => (
                                    <>
                                        <div style={{ border: "1px solid #000000" }}>
                                            <SignaturePad
                                                ref={props.sigCanvasa}
                                                canvasProps={{
                                                    width: 388,
                                                    height: 200,
                                                    className: "signatureCanvas",
                                                    border: "1px solid #000000",
                                                }}
                                            />
                                        </div>
                                        <button onClick={props.savea}>Save</button>
                                        <button onClick={props.cleara}>Clear</button>
                                        <button onClick={close}>Close</button>
                                    </>
                                )}
                            </Popup> */}
            </Col>
          </Row>
          <Row style={{ marginBottom: "5px" }}>
            <Col
              span={12}
              style={{
                border: "1px solid #f0f0f0",
                padding: "5px",
                textAlign: "center",
              }}
            >
              <span>{props.pasien.result.nama}</span>
              <br />
              <span>Pasien</span>
            </Col>
            <Col
              span={12}
              style={{
                border: "1px solid #f0f0f0",
                padding: "5px",
                textAlign: "center",
              }}
            >
              <span>{props.namaKeluarga}</span>
              <br />
              <span>Keluarga Pasien</span>
            </Col>
          </Row>

          <Button
            onClick={showModala}
            htmlType="submit"
          // disabled={!props.verifHd}
          >
            Cetak
          </Button>

          <Modal
            visible={isModalVisiblea}
            onCancel={handleCancela}
            footer={null}
            width={850}
            style={{
              top: 20,
            }}
          >
            {/* <Spin tip="Mohon tunggu" spinning={props.loadingContent}>
              <InformConcent />
            </Spin> */}
            <Card loading={props.loadingContent}>
              <Iframe url={props.uRLInformConsent}
                width="100%"
                height="750px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative" />
            </Card>
          </Modal>

          <Button
            // onClick={() => {
            //     !props.dokterIdIc ? message.warning('Dokter Pelaksana Tindakan masih kosong.') :
            //         !props.jenisPenerima ? message.warning('Penerima Informasi masih kosong.') :
            //             !props.namaKeluarga ? message.warning('Nama Keluarga Pasien masih kosong.') :
            //                 !props.tglLahirKeluarga && props.jenisPenerima === "2" ? message.warning('Tgl Lahir Keluarga Pasien masih kosong.') :
            //                     !props.umurKeluarga && props.jenisPenerima === "2" ? message.warning('Silahkan pilih tanggal lahir Wali Keluarga dahulu!') :
            //                         props.umurKeluargaa < 17 && props.jenisPenerima === "2" ? message.warning('Umur Wali belum 17 Tahun!') :
            //                             !props.alamatKeluarga && props.jenisPenerima === "2" ? message.warning('Alamat Keluarga Pasien masih kosong.') :
            //                                 !props.perawatPendampingId ? message.warning('Perawat Pendamping masih kosong.') :
            //                                     props.userIC && props.userIC !== props.user ? message.warning('User Anda dan User Entry berbeda, tidak bisa simpan!') :
            //                                         // !props.ttdPasien ? message.warning('Tanda tangan Pasien masih kosong.') :
            //                                         //     !props.ttdKeluargaPasien ? message.warning('Tanda tangan Keluarga Pasien masih kosong.') :
            //                                         // message.success('OK.')
            //                                         props.klikInformedConsent()
            // }}
            onClick={() => klikSimpan()}
            type="primary"
            htmlType="submit"
            loading={props.spinInform}
            style={{ float: "right" }}
          // disabled={!props.verifHd}
          >
            Simpan Informed Consent
          </Button>
        </Form>
      </Card>
    </div>
  );
}

export default FormInformConsent;
