import React, { useContext, useState } from "react";
import FormAllergy from "./FormAllergy";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  List,
  Popconfirm,
  message,
  ConfigProvider,
  Card,
  Radio,
  Space,
  Tooltip,
  InputNumber,
  // Popover,
  // Slider,
} from "antd";
import {
  SmileOutlined,
  // MehOutlined, FrownOutlined
} from "@ant-design/icons";
import { AlergiContext } from "../context/AlergiContext";
import { AnamnesaContext } from "../context/AnamnesaContext";
import { PasienContext } from "../context/PasienContext";
import { PelayananContext } from "../context/Pelayanancontext";
import { LoginContext } from "../context/LoginContext";
import PemeriksaanFisik from "../komponen/PemeriksaanFisik";
import { CloseCircleTwoTone } from "@ant-design/icons";
import dayjs from "dayjs";
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 22 },
};
const formItemLayout2 = {
  labelCol: { span: 6 },
  wrapperCol: { span: 24 },
};
const { Option } = Select;
function handleChange(value) {
  console.log(`selected ${value}`);
}

const Formanamnesa = () => {
  const {
    insertTandavital,
    sistolik,
    diastolik,
    suhu,
    nadi,
    tinggi,
    berat,
    saturasi,
    iramanadi,
    nafas,
    skornyeri,
    resikojatuh,
    setSistolik,
    setDiastolik,
    setNadi,
    setSuhu,
    setTinggi,
    setBerat,
    setSaturasi,
    setIramaNadi,
    setNafas,
    setSkorNyeri,
    setResikoJatuh,
  } = useContext(AnamnesaContext);
  const { curpas, caramasukid } = useContext(PasienContext);
  const { caramasuk } = useContext(PelayananContext);
  const { allergy, deleteAllergy } = useContext(AlergiContext);
  const { namauser } = useContext(LoginContext);
  const [status, setStatus] = useState(2);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  // const [inputValue, setInputValue] = useState(1);
  // const onInputValue = (e) => {
  //   setInputValue(e);
  // };
  const datatanda = {
    registrasiId: curpas.registrasiId,
    ruangId: curpas.ruangId,
    pegawaiId: curpas.dokterId,
    tanggal: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    jam: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    tekananDarahSistolik: sistolik === null ? null : parseInt(sistolik),
    tekananDarahDiastolik: diastolik === null ? null : parseInt(diastolik),
    suhuTubuh: suhu === null ? null : parseFloat(suhu),
    frekuensiNadi: nadi === null ? null : parseInt(nadi),
    iramaNadi: iramanadi,
    frekuensiNafas: nafas === null ? null : parseInt(nafas),
    skorNyeri: skornyeri === null ? null : parseInt(skornyeri),
    saturasiOksigen: saturasi === null ? null : parseInt(saturasi),
    tinggiBadan: tinggi === null ? null : parseFloat(tinggi),
    beratBadan: berat === null ? null : parseFloat(berat),
    resikojatuh: resikojatuh,
    userId: namauser,
    clientHost: host,
    clientIp: ip,
  };
  // const [visible, setVisibile] = useState(false)
  const [inputValue, setInputValue] = useState(1);
  const onInputValue = (e) => {
    setInputValue(e);
  };
  // const showModal = () => {
  //   setVisibile(true);
  // }
  // const handleOk = () => {
  //   setVisibile(false);
  // }
  // const handleCancel = () => {
  //   setVisibile(false);
  // }
  // const onChange = (e) => {
  //   value(e.target.value);
  // }
  const radioHandler = (e) => {
    setStatus(e);
  };
  const simpanTandavital = (e) => {
    e.preventDefault();
    insertTandavital(datatanda);
    console.log("tanda vital", datatanda);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    simpanTandavital(e);
  };
  const onSistolik = (e) => {
    setSistolik(e);
  };
  const onDiastolik = (e) => {
    setDiastolik(e);
  };
  const onSuhu = (e) => {
    setSuhu(e);
  };
  const onFrekuensiNadi = (e) => {
    setNadi(e);
  };
  const onIramaNadi = (e) => {
    setIramaNadi(e);
  };
  const onFrekuensiNafas = (e) => {
    setNafas(e);
  };
  const onSkorNyeri = (e) => {
    setSkorNyeri(e);
  };
  const onSaturasiOksigen = (e) => {
    setSaturasi(e);
  };
  const onTinggiBadan = (e) => {
    setTinggi(e);
  };
  const onBeratBadan = (e) => {
    setBerat(e);
  };
  const onDelete = (noreg, kode) => {
    deleteAllergy(noreg, kode);
  };
  const onResikoJatuh = (e) => {
    setResikoJatuh(e);
  };
  const IMT = (berat / Math.pow(tinggi, 2)) * 10000;
  const IMTket =
    IMT < 18.5
      ? "BB Kurang"
      : IMT < 25
      ? "BB Normal"
      : IMT < 30
      ? "BB Overweight dg Resiko"
      : IMT < 40
      ? "Obesitas I"
      : "Obesitas II";
  const styleku = isNaN(IMT)
    ? { width: "75%" }
    : IMT < 18.5
    ? { backgroundColor: "lightcyan", width: "75%" }
    : IMT < 25
    ? { backgroundColor: "lightgreen", width: "75%" }
    : IMT < 30
    ? { backgroundColor: "lightblue", width: "75%" }
    : IMT < 40
    ? { backgroundColor: "lightpink", width: "75%" }
    : { backgroundColor: "lightcoral", width: "75%" };
  return (
    <div>
      <Form>
        <Row gutter={[8, 8]}>
          <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              {...formItemLayout}
              label="Assesment Kunjungan"
              style={{ marginBottom: 0 }}
            >
              {/* <Select defaultValue="Awal" style={{ width: 120 }} onChange={handleChange}>
                  <Option value="Awal">Awal</Option>
                  <Option value="Ulang">Ulang</Option>
                </Select> */}
              {/* <Radio.Group onChange={this.onChange} value={value}>
                    <Radio value={1}>Ulang</Radio>
                    <Radio value={2}>Awal{value === 2 ? <Buttonpemeriksaanfisik /> : null}</Radio>
                  </Radio.Group> */}
              <input
                type="radio"
                name="release"
                checked={status === 1}
                onClick={(e) => radioHandler(1)}
              />
              {"    "}Awal{"    "}
              <input
                type="radio"
                name="release"
                checked={status === 2}
                onClick={(e) => radioHandler(2)}
              />
              {"    "}Ulang{<br />}
              {status === 1 && <></>}
              {status === 2 && <></>}
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Cara Kunjungan"
              style={{ marginBottom: 0 }}
            >
              <Select
                defaultValue="sendiri"
                style={{ width: "100%" }}
                onChange={handleChange}
              >
                <Option value="sendiri">Datang Sendiri</Option>
                <Option value="rsu">RSU / RSK / RB</Option>
                <Option value="puskesmas">Puskesmas</Option>
                <Option value="dokter">Kiriman Dokter</Option>
                <Option value="paramedis">Kiriman Paramedis</Option>
                <Option value="dukun">Kiriman Dukun</Option>
                <Option value="polisi">Kasus Polisi</Option>
                <Option value="rujukan">Surat Rujukan</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              name="lanjut"
              label="Tindak Lanjut"
              style={{ marginBottom: 0 }}
            >
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Tindak Lanjut"
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                // defaultValue="dirawat" style={{ width: 180 }} onChange={handleChange}
              >
                <Option value="dirawat">Dirawat</Option>
                <Option value="extern">Dirujuk Extern</Option>
                <Option value="pulang">Pulang</Option>
                <Option value="mati">Mati Sebelum Dirawat</Option>
                <Option value="intern">Dirujuk Intern</Option>
                <Option value="balik">Rujuk Balik</Option>
              </Select>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues.lanjut !== currentValues.lanjut
              }
            >
              {({ getFieldValue }) =>
                getFieldValue("lanjut") === "dirawat" ? (
                  <Form.Item label="Transfer" {...formItemLayout}>
                    <></>
                  </Form.Item>
                ) : null
              }
            </Form.Item>
          </Col>
          {/* <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Form.Item {...formItemLayout} label="Resiko Jatuh" style={{ marginBottom: 0 }}>
              <Select defaultValue="tdkresiko" style={{ width: "100%" }} onChange={handleChange}>
                <Option value="tdkresiko">Tidak Ada Resiko</Option>
                <Option value="rskrendah">Resiko Rendah</Option>
                <Option value="rsktinggi">Resiko Tinggi</Option>
              </Select>
            </Form.Item>
            <Form.Item {...formItemLayout} label="Skala Nyeri" style={{ marginBottom: 0 }}>
              <Popover content={skala} title="Skala Nyeri" trigger="click" style={{ width: "100%" }}>
                    <Input placeholder="Point" />
                  </Popover>
              <Popover content={
                <div>
                   <SmileOutlined /><MehOutlined style={{marginLeft:'44%'}}/><FrownOutlined style={{float: 'right'}}/>
                  <Slider min={0} max={10} marks={marks} defaultValue={0} onChange={onInputValue}
                    value={typeof inputValue === 'number' ? inputValue : 0} style={{ width: '25vh' }} />
                </div>
               } 
              title="Skala Nyeri" trigger="click" style={{ width: "100%" }}>
                <Input placeholder="Point" value={inputValue}/>
              </Popover>
            </Form.Item>
          </Col> */}
          <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
            <Form.Item
              {...formItemLayout}
              name="alergi"
              label="Alergi"
              style={{ marginBottom: 0 }}
            >
              <FormAllergy />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Alergi"
              style={{ marginBottom: 0 }}
            >
              {allergy.map((k) => (
                <span>
                  {k.alerginya},<br />
                </span>
              ))}
            </Form.Item>
            {/* <Form.Item {...formItemLayout} label="Resiko Jatuh" style={{ marginBottom: 0 }}>
                  <Button type="primary" onClick={showModal} size="small">
                    Resiko Jatuh
                </Button>
                </Form.Item>
                <Modal
                  title="Basic Modal"
                  visible={visible}
                  onOk={handleOk}
                  onCancel={handleCancel}
                  width="700px"
                  centered
                >
                  <Formresiko />
                </Modal> */}
            {/* <Form.Item {...formItemLayout} label="Skala Nyeri" style={{ marginBottom: 0 }}>
                  <Popover content={skala} title="Skala Nyeri" trigger="click" style={{ width: "100%" }}>
                    <Input placeholder="Point" />
                  </Popover>
                  <Popover content={skala2} title="Skala Nyeri" trigger="click" style={{ width: "100%" }}>
                    <Input placeholder="Point" />
                  </Popover>
                </Form.Item>  */}
            {/* <Form.Item {...formItemLayout} label="Skala Nyeri" style={{ marginBottom: 0 }}>
                  <Select defaultValue="tdknyeri" style={{ width: "100%" }} onChange={handleChange}>
                    <Option value="tdknyeri">Tidak Ada Nyeri(0)</Option>
                    <Option value="nyeriringan">Nyeri Ringan(1-2-3)</Option>
                    <Option value="nyerisedang">Nyeri Sedang(4-5-6)</Option>
                    <Option value="nyeriberat">Nyeri Berat(7-8-9-10)</Option>
                  </Select>
                </Form.Item> */}
            {/* <Form.Item {...formItemLayout} name="alergi" label="Alergi">
                  <AlergiContextProvider>
                    <FormAllergy/>
                  </AlergiContextProvider>
                </Form.Item> */}
            <Card
              size="small"
              title="Tanda Vital"
              headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
              style={{
                marginBottom: 5,
                borderWidth: "2px",
                borderColor: "darkgray",
                borderRadius: "4px",
              }}
            >
              <Row gutter={[16, 16]}>
                <Col span={6} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Tensi"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    {/* <Input.Group compact> */}
                    {/* <Input
                      style={{ width: "50%" }}
                      type="number"
                      suffix="Mmhg"
                      placeholder="..."
                      value={sistolik}
                      onChange={(e) => onSistolik(e)}
                    />
                    <Input
                      style={{ width: "50%" }}
                      type="number"
                      suffix="Mmhg"
                      placeholder="..."
                      value={diastolik}
                      onChange={(e) => onDiastolik(e)}
                    /> */}
                    {/* </Input.Group>/ */}
                    <Tooltip title="Tensi Atas">
                      <InputNumber
                        placeholder="..."
                        value={sistolik}
                        onChange={(e) => onSistolik(e)}
                        maxLength={3}
                        max={200}
                        min={20}
                        style={{ width: "37%" }}
                      />
                    </Tooltip>
                    <Tooltip title="Tensi Bawah">
                      <InputNumber
                        placeholder="..."
                        value={diastolik}
                        onChange={(e) => onDiastolik(e)}
                        maxLength={3}
                        max={200}
                        min={20}
                        style={{ width: "37%" }}
                      />
                    </Tooltip>
                    <Input value={"Mmhg"} disabled style={{ width: "26%" }} />
                  </Form.Item>
                  {/* <Form.Item
                  style={{ marginBottom: 0 }}
                  label="TD Diastolik"
                  labelAlign="left"
                  {...formItemLayout}
                >
                  <Input
                    type="number"
                    suffix="Mmhg"
                    placeholder="..."
                    value={diastolik}
                    onChange={(e) => onDiastolik(e)}
                  />
                </Form.Item> */}
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Nadi"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    {/* <Input
                    type="number"
                    suffix="/Menit"
                    placeholder="..."
                    value={nadi}
                    onChange={(e) => onFrekuensiNadi(e)}
                  /> */}
                    <InputNumber
                      placeholder="..."
                      value={nadi}
                      onChange={(e) => onFrekuensiNadi(e)}
                      maxLength={2}
                      max={99}
                      min={0}
                      style={{ width: "74%" }}
                    />
                    {/* <Button style={{ width: "27%" }}>/Menit</Button> */}
                    <Input value={"/Menit"} disabled style={{ width: "26%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Suhu"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    {/* <Input
                    type="number"
                    suffix="°C"
                    max="70"
                    pattern="\d*"
                    maxLength="2"
                    step={0.1}
                    placeholder="..."
                    value={suhu}
                    onChange={(e) => onSuhu(e)}
                  /> */}
                    <InputNumber
                      step={0.1}
                      placeholder="..."
                      value={suhu}
                      onChange={(e) => onSuhu(e)}
                      maxLength={2}
                      max={70}
                      min={10}
                      style={{ width: "74%" }}
                    />
                    <Input value={"°C"} disabled style={{ width: "26%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Berat Badan"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    {/* <Input
                    type="number"
                    suffix="Kg"
                    step={0.1}
                    placeholder="..."
                    data-role="keypad"
                    value={berat}
                    onChange={(e) => onBeratBadan(e)}
                  /> */}
                    <InputNumber
                      step={0.1}
                      placeholder="..."
                      value={berat}
                      onChange={(e) => onBeratBadan(e)}
                      maxLength={3}
                      max={200}
                      min={0}
                      style={{ width: "74%" }}
                    />
                    <Input value={"Kg"} disabled style={{ width: "26%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Tinggi Badan"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    {/* <Input
                    type="number"
                    suffix="Cm"
                    step={0.1}
                    placeholder="..."
                    value={tinggi}
                    onChange={(e) => onTinggiBadan(e)}
                  /> */}
                    <InputNumber
                      step={0.1}
                      placeholder="..."
                      value={tinggi}
                      onChange={(e) => onTinggiBadan(e)}
                      maxLength={3}
                      max={300}
                      min={0}
                      style={{ width: "74%" }}
                    />
                    <Input value={"Cm"} disabled style={{ width: "26%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Saturasi O2"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    {/* <Input
                    type="number"
                    suffix="%"
                    placeholder="..."
                    value={saturasi}
                    onChange={(e) => onSaturasiOksigen(e)}
                  /> */}
                    <InputNumber
                      placeholder="..."
                      value={saturasi}
                      onChange={(e) => onSaturasiOksigen(e)}
                      maxLength={3}
                      max={100}
                      min={0}
                      style={{ width: "74%" }}
                    />
                    <Input value={"%"} disabled style={{ width: "26%" }} />
                  </Form.Item>
                </Col>
                <Col span={6} xs={24} sm={24} md={12} lg={12} xl={12}>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Frekuensi Nafas"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    {/* <Input
                    type="number"
                    suffix="/Menit"
                    placeholder="..."
                    value={nafas}
                    onChange={(e) => onFrekuensiNafas(e)}
                  /> */}
                    <InputNumber
                      placeholder="..."
                      value={nafas}
                      onChange={(e) => onFrekuensiNafas(e)}
                      maxLength={3}
                      max={100}
                      min={0}
                      style={{ width: "74%" }}
                    />
                    <Input value={"/Menit"} disabled style={{ width: "26%" }} />
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Irama Nadi"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    <Select
                      // transitionName="none"
                      // maskTransitionName="none"
                      defaultValue="Teratur"
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={iramanadi}
                      onChange={onIramaNadi}
                    >
                      <Option value="Teratur">Teratur</Option>
                      <Option value="Tidak Teratur">Tidak Teratur</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Skala Nyeri"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    <Select
                      defaultValue={1}
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={skornyeri}
                      onChange={onSkorNyeri}
                    >
                      <Option value={1}>Tidak Nyeri (0)</Option>
                      <Option value={2}>Nyeri Ringan (1-2-3)</Option>
                      <Option value={3}>Nyeri Sedang (4-5-6)</Option>
                      <Option value={4}>Nyeri Berat (7-8-9-10)</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 0 }}
                    label="Resiko Jatuh"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    <Select
                      defaultValue={1}
                      placeholder="..."
                      style={{ width: "100%" }}
                      value={resikojatuh}
                      onChange={onResikoJatuh}
                    >
                      <Option value={1}>Tidak Ada Resiko</Option>
                      <Option value={2}>Resiko Rendah</Option>
                      <Option value={3}>Resiko Tinggi</Option>
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ marginBottom: 10 }}
                    label="IMT"
                    labelAlign="left"
                    {...formItemLayout}
                  >
                    <Input.Group compact>
                      <Input
                        style={{ width: "25%" }}
                        value={isNaN(IMT) ? "" : IMT.toFixed(2)}
                        placeholder="..."
                      />
                      <Input
                        style={styleku}
                        value={isNaN(IMT) ? null : IMTket}
                        placeholder="..."
                      />
                    </Input.Group>
                  </Form.Item>
                  <Form.Item style={{ marginBottom: 0 }}>
                    <Row>
                      <Col span={24} style={{ textAlign: "right" }}>
                        <Button
                          type="primary"
                          htmlType="submit"
                          onClick={(e) => onSubmit(e)}
                        >
                          Simpan
                        </Button>
                      </Col>
                    </Row>
                  </Form.Item>
                  {/* Skala Nyeri
                <br />
                <Form.Item style={{ marginBottom: 0 }}>
                  <Select
                    defaultValue="tdknyeri"
                    style={{ width: "100%" }}
                    onChange={handleChange}
                  >
                    <Option value="tdknyeri">Tidak Ada Nyeri (0)</Option>
                    <Option value="nyeriringan">Nyeri Ringan (1-3)</Option>
                    <Option value="nyerisedang">Nyeri Sedang (4-6)</Option>
                    <Option value="nyeriberat">Nyeri Berat (7-10)</Option>
                  </Select>

                  <Popover
                    content={
                      <div>
                        <SmileOutlined />
                        <MehOutlined style={{ marginLeft: "44%" }} />
                        <FrownOutlined style={{ float: "right" }} />
                        <Slider
                          min={0}
                          max={10}
                          marks={marks}
                          defaultValue={0}
                          onChange={onInputValue}
                          value={
                            typeof inputValue === "number" ? inputValue : 0
                          }
                          style={{ width: "25vh" }}
                        />
                      </div>
                    }
                    title="Skala Nyeri"
                    trigger="click"
                    style={{ width: "100%" }}
                  >
                    <Input placeholder="Point" value={inputValue} />
                  </Popover>
                </Form.Item> */}
                </Col>
              </Row>
              {/* <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={(e) => onSubmit(e)}
                >
                  Simpan
                </Button>
              </Col>
            </Row> */}
            </Card>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
export default Formanamnesa;
