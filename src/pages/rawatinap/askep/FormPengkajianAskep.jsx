import React, { useContext, useState } from "react";
import {
  Select,
  Form,
  Row,
  Col,
  Card,
  Button,
  Space,
  DatePicker,
  Divider,
  message,
  Input,
  Modal,
  Tooltip,
  Alert,
  AutoComplete,
  Spin,
} from "antd";

import dayjs from "dayjs";
import { AskepContext } from "../../rawatinap/context/AskepContext";
import { MasterDiagnosaAskepContext } from "../../master/context/masteraskep/MasterDiagnosaAskepContext";
import { MasterLuaranAskepContext } from "../../master/context/masteraskep/MasterLuaranAskepContext";
import { MasterIntervensiAskepContext } from "../../master/context/masteraskep/MasterIntervensiAskepContext";
import { MasterKriteriaAskepContext } from "../../master/context/masteraskep/MasterKriteriaAskepContext";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "../context/PasienRIContext";

const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
let index = 1;
const gridStyle = {
  width: "25%",
  textAlign: "center",
  height: "40px",
};

const FormPengkajianAskep = () => {
  const { curpasRI } = useContext(PasienRIContext);
  const { pegawaiId, pegawai } = useContext(LoginContext);
  const {
    tanggal,
    settanggal,
    diagnosaId,
    setdiagnosaId,
    nTandaGejala,
    insertEmrAskep,
    settargetWaktu,
    targetWaktu,
    setnTandaGejala,
    nIntervensi,
    setnIntervensi,
    nKriteria,
    setnKriteria,
    getListAskepById,
    registrasiId,
    deleteAskpeByIdByDx,
    listmsttandagejala,
    jenisKriteria,
    setJenisKriteria,
    userIdAskep,
    hiddenSaveButton,
    setHiddenSaveButton,
    hiddenSaveEdit,
    setHiddenSaveEdit,
    getTandaGejalaByNoreg,
    load,
    setLoad,
    cekAssesmentRI,
  } = useContext(AskepContext);
  const { namauser } = useContext(LoginContext);
  const { dxbyGejala, diagnosabytandagejala } = useContext(
    MasterDiagnosaAskepContext
  );
  const { luaranbydx, getluaranbydiagnosaid, setLuaranbydx } = useContext(
    MasterLuaranAskepContext
  );
  const { intervensibydx, getintervensibydx } = useContext(
    MasterIntervensiAskepContext
  );
  const {
    kriteriaByLuaran,
    getbyluaranjns,
    jnsKriteriaByLuaran,
    getJnsKriteriaByLuaran,
  } = useContext(MasterKriteriaAskepContext);
  const dateFormat = "DD-MM-YYYY HH:mm";
  const [hiddenTgejala, sethiddenTgejala] = useState(true);
  const [hiddenKriteria, sethiddenKriteria] = useState(true);
  const [hiddenIntervensi, sethiddenIntervensi] = useState(true);
  const [hiddenSave, setHiddenSave] = useState(true);

  const [isiaturan, setIsiAturan] = useState([
    "0.25 jam",
    "0.5 jam",
    "1 jam",
    "2 jam",
    "3 jam",
  ]);

  const pilihanWaktu = [
    { value: "0.25 jam" },
    { value: "0.5 jam" },
    { value: "1 jam" },
    { value: "2 jam" },
    { value: "3 jam" },
    { value: "6 jam" },
    { value: "12 jam" },
    { value: "24 jam" },
    { value: "2x24 jam" },
    { value: "3x24 jam" },
    { value: "5x24 jam" },
  ];
  const [name, setName] = useState("");
  const ontandagejala = (value) => {
    setdiagnosaId([]);
    setnTandaGejala(value);
  };
  const onKriteria = (value) => {
    setnKriteria(value);
  };
  const onintervensi = (value) => {
    setnIntervensi(value);
  };
  const onTglajuan = (date, dateString) => {
    settanggal(date);
  };

  const onLainnya = (e) => {
    settargetWaktu(e.target.value);
    console.log(e);
  };
  const pilihjnskriteria = (e) => {
    setJenisKriteria(e);
    setnKriteria([]);
    getbyluaranjns(luaranbydx.luaranId, e);
    console.log(luaranbydx.luaranId);
    console.log(e);
  };

  const onpilihdx = (e) => {
    setdiagnosaId(e);
    getluaranbydiagnosaid(e); //unutk menampilkan luaran berdasarkan diagnosa
    getintervensibydx(e); //untuk menampilkan intervensi berdasarkan diagnosa
    settargetWaktu("");
    setnIntervensi([]);
    setnKriteria([]);
    setJenisKriteria("");
  };

  const onSimpan = () => {
    setLoad(true);
    const gjlbaru = [];
    for (var i = 0; i < nTandaGejala.length; i++) {
      gjlbaru.push({
        tandaGejalaId: nTandaGejala[i],
      });
    }

    const kriteriabaru = [];
    for (var i = 0; i < nKriteria.length; i++) {
      kriteriabaru.push({
        kriteriaId: nKriteria[i],
        jenis: parseInt(jenisKriteria),
      });
    }

    const intvbaru = [];
    for (var i = 0; i < nIntervensi.length; i++) {
      intvbaru.push({
        intervensiId: nIntervensi[i],
      });
    }

    nTandaGejala === ""
      ? message.warning("Pilih Tanda Gejala Pasien Terebih Dahulu")
      : diagnosaId === ""
      ? message.warning("Pilih Diagnosa Pasien Terebih Dahulu")
      : targetWaktu === ""
      ? message.warning("Pilih Target Waktu Pasien Terebih Dahulu")
      : nKriteria === ""
      ? message.warning("Pilih Kriteria Pasien Terebih Dahulu")
      : nIntervensi === ""
      ? message.warning("Pilih Intervensi Pasien Terebih Dahulu")
      : insertEmrAskep({
          registrasiId: curpasRI.registrasiId,
          pasienId: curpasRI.pasienId,
          tanggal: dayjs(tanggal).format("YYYY-MM-DDTHH:mm"),
          ruangId: curpasRI.ruangId,
          pegawaiId: curpasRI.dokterId,
          diagnosaId: diagnosaId,
          targetWaktu: targetWaktu,
          luaranId: luaranbydx.luaranId,
          userId: namauser,
          nTandaGejala: gjlbaru,
          nIntervensi: intvbaru,
          nKriteria: kriteriabaru,
        });
  };

  const onfocusdiagnosa = () => {
    setHiddenSave(true);
    sethiddenIntervensi(true);
    sethiddenTgejala(true);
    sethiddenKriteria(true);
    diagnosabytandagejala(nTandaGejala);
  };

  const onbatal = () => {
    settanggal(dayjs());
    setdiagnosaId("");
    settargetWaktu("");
    //setluaranId('');
    setnTandaGejala([]);
    setnIntervensi([]);
    setnKriteria([]);
    setJenisKriteria("");
    setLuaranbydx([]);
    setHiddenSaveButton(false);
    setHiddenSaveEdit(true);
    console.log("kosongkan form askep");
  };

  const jammasukri = dayjs(curpasRI.tanggalMasukRi).add(24, "hours");
  const jamsekarang = dayjs();

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Card
            title="Form Pengkajian Dan Intervensi"
            headStyle={{ fontWeight: "bolder", backgroundColor: "beige" }}
            size="small"
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Row gutter={[4, 4]}>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="Tanggal"
                  style={{ marginBottom: 5 }}
                >
                  <DatePicker
                    value={tanggal}
                    onChange={onTglajuan}
                    disabled
                    style={{ width: "100%" }}
                    format={dateFormat}
                    showTime
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Tanda dan Gejala"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={nTandaGejala}
                    onFocus={() => {
                      jamsekarang > jammasukri
                        ? getTandaGejalaByNoreg(curpasRI.registrasiId)
                        : cekAssesmentRI(curpasRI.registrasiId);
                    }}
                    style={{ width: "100%", maxWidth: "78vw" }}
                    mode="multiple"
                    allowClear
                    showSearch
                    source={listmsttandagejala}
                    onChange={ontandagejala}
                    tokenSeparators={[","]}
                    placeholder="..."
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {listmsttandagejala.map((b) => (
                      <Option key={b.tandaGejalaId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  label="Diagnosa"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    onFocus={onfocusdiagnosa}
                    value={diagnosaId}
                    showSearch
                    source={dxbyGejala}
                    onChange={onpilihdx}
                    placeholder="..."
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {dxbyGejala.map((b) => (
                      <Option key={b.diagnosaId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Luaran"
                  style={{ marginBottom: 2 }}
                >
                  <Input
                    value={luaranbydx.deskripsi}
                    disabled
                    style={{ fontWeight: "bold", color: "black" }}
                  />
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Lama Intervensi"
                  style={{ marginBottom: 2 }}
                >
                  <AutoComplete
                    options={pilihanWaktu}
                    value={targetWaktu}
                    onSelect={(e) => settargetWaktu(e)}
                    // onSearch={onSearch}
                    onChange={(e) => {
                      settargetWaktu(e);
                      getJnsKriteriaByLuaran(luaranbydx.luaranId);
                    }}
                    placeholder="..."
                    filterOption={(inputValue, option) =>
                      option.value
                        .toUpperCase()
                        .indexOf(inputValue.toUpperCase()) !== -1
                    }
                  />
                </Form.Item>
              </Col>
              {targetWaktu === "lainnya" ? (
                <Col span={22}>
                  <Form.Item
                    {...formItemLayout}
                    xs={2}
                    sm={4}
                    md={6}
                    lg={8}
                    xl={8}
                    label="."
                    style={{ marginBottom: 2 }}
                  >
                    <Input onChange={onLainnya} placeholder="..." />
                  </Form.Item>
                </Col>
              ) : null}
              <Col span={2}></Col>
              <Col span={24}>
                <Form.Item
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  {...formItemLayout}
                  label="Jenis Kriteria"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={jenisKriteria}
                    onChange={pilihjnskriteria}
                    showSearch
                    placeholder="..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {jnsKriteriaByLuaran.map((b) => (
                      <Option key={b.jenisKriteria}>
                        Kriteria {b.jenisKriteria}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={24}>
                <Form.Item
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  {...formItemLayout}
                  label="Kriteria"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={nKriteria}
                    style={{ width: "100%", maxWidth: "78vw" }}
                    mode="multiple"
                    allowClear
                    showSearch={false}
                    source={kriteriaByLuaran}
                    onChange={onKriteria}
                    tokenSeparators={[","]}
                    placeholder="..."
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {kriteriaByLuaran.map((b) => (
                      <Option key={b.kriteriaId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}></Col>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout}
                  xs={2}
                  sm={4}
                  md={6}
                  lg={8}
                  xl={8}
                  label="Intervensi"
                  style={{ marginBottom: 2 }}
                >
                  <Select
                    value={nIntervensi}
                    style={{ width: "100%", maxWidth: "78vw" }}
                    mode="multiple"
                    allowClear
                    showSearch
                    source={intervensibydx}
                    onChange={onintervensi}
                    placeholder="..."
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {intervensibydx.map((b) => (
                      <Option key={b.intervensiId}>{b.deskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
              <Col span={2}></Col>
            </Row>
            <Card size="small" loading={load}>
              <Row>
                <Col span={12}>
                  <Space></Space>
                </Col>
                <Col span={12} style={{ textAlign: "right" }}>
                  <Space>
                    <Button onClick={onbatal}>Bersihkan</Button>

                    <Button
                      type="primary"
                      onClick={() => {
                        tanggal === null
                          ? message.warning("Tanggal masih kosong.")
                          : nTandaGejala.length === 0
                          ? message.warning("Tanda Gejala masih kosong.")
                          : diagnosaId === null
                          ? message.warning("Diagnosa masih kosong.")
                          : luaranbydx.deskripsi === null
                          ? message.warning("Luaran masih kosong.")
                          : targetWaktu === null
                          ? message.warning("Lama Intervensi masih kosong.")
                          : jenisKriteria === null
                          ? message.warning("Jenis Kriteria masih kosong.")
                          : nKriteria.length === 0
                          ? message.warning("Kriteria masih kosong.")
                          : nIntervensi.length === 0
                          ? message.warning("Intervensi masih kosong.")
                          : onSimpan();
                      }}
                      // hidden={hiddenSaveButton}
                    >
                      Simpan
                    </Button>
                  </Space>
                </Col>
              </Row>
            </Card>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default FormPengkajianAskep;
