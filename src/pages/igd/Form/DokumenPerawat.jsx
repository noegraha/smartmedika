import {
  Card,
  Col,
  ConfigProvider,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Button,
  InputNumber,
  Checkbox,
} from "antd";
import TextArea from "antd/es/input/TextArea";
import React, { useState } from "react";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const formItemLayout2 = {
  labelCol: { span: 9 },
  wrapperCol: { span: 13 },
};

const DokumenPerawat = () => {
  const [imt, setImt] = useState(0);
  const [imtCategory, setImtCategory] = useState("");

  const calculateIMT = (height, weight) => {
    if (height && weight) {
      const heightInMeters = height / 100;
      const imtValue = weight / (heightInMeters * heightInMeters);
      setImt(imtValue.toFixed(2));

      // Calculate IMT category
      if (imtValue < 17.0) {
        setImtCategory("GIZI BURUK");
      } else if (imtValue >= 17.0 && imtValue < 18.4) {
        setImtCategory("GIZI KURANG");
      } else if (imtValue >= 18.5 && imtValue <= 25.0) {
        setImtCategory("NORMAL");
      } else if (imtValue > 25.0 && imtValue <= 27.0) {
        setImtCategory("KEGEMUKAN");
      } else if (imtValue > 27.0) {
        setImtCategory("GEMUK");
      }
    } else {
      setImt(0);
      setImtCategory("");
    }
  };

  return (
    <div>
      <ConfigProvider
        theme={{
          components: {
            Card: { fontWeightStrong: "bolder", headerBg: "beige" },
            Form: { itemMarginBottom: 0 },
          },
        }}
      >
        <Card
          title="RM 01 ( Perawat )"
          size="small"
          style={{
            borderWidth: "2px",
            borderColor: "darkgray",
            borderRadius: "4px",
          }}
        >
          <Form {...formItemLayout} labelWrap labelAlign="left">
            <Form.Item label="Pemberi Asuhan">
              <Input />
            </Form.Item>
            <Form.Item label="Tanggal Datang">
              <DatePicker />
            </Form.Item>
            <Divider
              orientation="center"
              style={{ backgroundColor: "#d9f7be", margin: "0px" }}
            >
              Identifikasi Awal Pasien
            </Divider>
            <Form.Item label="Macam Kasus">
              <Select style={{ width: "25%" }}>
                <Option key="BEDAH">BEDAH</Option>
                <Option key="NON BEDAH">NON BEDAH</Option>
                <Option key="OBSGYN">OBSGYN</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Jenis Obsgyn">
              <Select style={{ width: "25%" }}>
                <Option key="BEDAH">BEDAH</Option>
                <Option key="NON BEDAH">NON BEDAH</Option>
                <Option key="OBSGYN">OBSGYN</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Macam Trauma">
              <Select style={{ width: "25%" }}>
                <Option key="BEDAH">BEDAH</Option>
                <Option key="NON BEDAH">NON BEDAH</Option>
                <Option key="OBSGYN">OBSGYN</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Jenis Kasus">
              <Select style={{ width: "25%" }}>
                <Option key="BEDAH">BEDAH</Option>
                <Option key="NON BEDAH">NON BEDAH</Option>
                <Option key="OBSGYN">OBSGYN</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Tempat Kejadian">
              <TextArea />
            </Form.Item>
            <Form.Item label="Waktu Kejadian">
              <DatePicker />
            </Form.Item>
            <Form.Item label="Cara Datang">
              <Select style={{ width: "25%" }}>
                <Option key="DATANG_SENDIRI">DATANG SENDIRI</Option>
                <Option key="DIANTAR">DIANTAR</Option>
              </Select>
              <Select style={{ width: "25%" }}>
                <Option key="KELUARGA">KELUARGA</Option>
                <Option key="POLISI">POLISI</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Dikirm Polisi, Permintaan visum et repertum">
              <Select style={{ width: "25%" }}>
                <Option key="YA">YA</Option>
                <Option key="TIDAK">TIDAK</Option>
              </Select>
            </Form.Item>
          </Form>
          <Row>
            <Col span={8}>
              <Form {...formItemLayout2} labelWrap labelAlign="left">
                <Form.Item label="Transportasi">
                  <Select style={{ width: "100%" }}>
                    <Option key="PRIBADI">PRIBADI</Option>
                    <Option key="AMBULANCE">AMBULANCE</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Rujukan Dari">
                  <Select style={{ width: "100%" }}>
                    <Option key="PUSKESMAS">PUSKESMAS</Option>
                    <Option key="NON_RUJUKAN">NON RUJUKAN</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
            <Col span={8}>
              <Form {...formItemLayout2} labelWrap labelAlign="left">
                <Form.Item label="Hubungan Keluarga">
                  <Select style={{ width: "100%" }}>
                    <Option key="BAIK">BAIK</Option>
                    <Option key="KURANG">KURANG</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Kondisi Psikologis">
                  <Select style={{ width: "100%" }}>
                    <Option key="CEMAS">CEMAS</Option>
                    <Option key="TENANG">TENANG</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
            <Col span={8}>
              <Form {...formItemLayout2} labelWrap labelAlign="left">
                <Form.Item label="Keyakinan Nilai Agama">
                  <Select style={{ width: "100%" }}>
                    <Option key="YA">YA</Option>
                    <Option key="TIDAK">TIDAK</Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Dukungan Keluarga">
                  <Select style={{ width: "100%" }}>
                    <Option key="ADA">ADA</Option>
                    <Option key="TIDAK">TIDAK</Option>
                  </Select>
                </Form.Item>
              </Form>
            </Col>
          </Row>
          <Form {...formItemLayout} labelWrap labelAlign="left">
            <Form.Item label="Informasi Dari">
              <Select style={{ width: "25%" }}>
                <Option key="AUTO">AUTO ANAMNESA</Option>
                <Option key="ALLO">ALLO ANAMNESA</Option>
              </Select>
            </Form.Item>
            <Form.Item label="Nama">
              <Input />
            </Form.Item>
            <Form.Item label="Hubungan">
              <Input />
            </Form.Item>
          </Form>

          {/* Tanda Tanda Vital Section */}
          <Divider
            orientation="center"
            style={{ backgroundColor: "#d9f7be", margin: "0px" }}
          >
            Tanda Tanda Vital
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Tekanan Darah"
                labelAlign="left"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <InputNumber style={{ width: "40%" }} /> /{" "}
                <InputNumber style={{ width: "40%" }} /> mmHg
              </Form.Item>
              <Form.Item
                label="Nadi"
                labelAlign="left"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <InputNumber style={{ width: "80%" }} /> x/menit
              </Form.Item>
              <Form.Item
                label="Pernafasan"
                labelAlign="left"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <InputNumber style={{ width: "80%" }} /> x/menit
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Suhu"
                labelAlign="left"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <InputNumber style={{ width: "80%" }} /> C
              </Form.Item>
              <Form.Item
                label="SpO2"
                labelAlign="left"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <InputNumber style={{ width: "80%" }} />
              </Form.Item>
              <Form.Item
                label="Akral"
                labelAlign="left"
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 18 }}
              >
                <Select style={{ width: "80%" }}>
                  <Option key="HANGAT">HANGAT</Option>
                  <Option key="DINGIN">DINGIN</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <div
            style={{ marginTop: "10px", fontStyle: "italic", color: "blue" }}
          >
            Note : Untuk nilai yang memiliki nilai desimal, gunakan tanda baca
            koma (,) untuk memisahkannya.
          </div>

          {/* Status Gizi Section */}
          <Divider
            orientation="center"
            style={{
              backgroundColor: "#d9f7be",
              margin: "0px",
              marginTop: "10px",
            }}
          >
            Status Gizi
          </Divider>
          <Row gutter={16}>
            <Col span={12}>
              <Row>
                <Col span={10} style={{ marginBottom: "10px" }}>
                  <Form.Item
                    label="Tinggi badan"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <InputNumber
                      style={{ width: "80%" }}
                      onChange={(value) =>
                        calculateIMT(
                          value,
                          document.querySelector('input[id="berat"]')?.value
                        )
                      }
                    />{" "}
                    cm
                  </Form.Item>
                </Col>
                <Col span={14} style={{ marginBottom: "10px" }}>
                  <Form.Item
                    label="IMT"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <InputNumber
                      style={{ width: "60%" }}
                      value={imt}
                      disabled
                    />{" "}
                    kg/m2
                  </Form.Item>
                </Col>
              </Row>
            </Col>
            <Col span={12}>
              <Row>
                <Col span={10} style={{ marginBottom: "10px" }}>
                  <Form.Item
                    label="Berat Badan"
                    labelCol={{ span: 12 }}
                    wrapperCol={{ span: 12 }}
                  >
                    <InputNumber
                      id="berat"
                      style={{ width: "80%" }}
                      onChange={(value) =>
                        calculateIMT(
                          document.querySelector(
                            'input[placeholder="Tinggi badan"]'
                          )?.value,
                          value
                        )
                      }
                    />{" "}
                    kg
                  </Form.Item>
                </Col>
                <Col span={14} style={{ marginBottom: "10px" }}>
                  <Form.Item
                    label="Hasil"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                  >
                    <Input
                      style={{ width: "80%" }}
                      value={imtCategory}
                      disabled
                    />
                  </Form.Item>
                </Col>
              </Row>
            </Col>
          </Row>
          <div
            style={{
              border: "1px solid #d9d9d9",
              padding: "8px",
              margin: "10px 0",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div>IMT &lt; 17,0 = GIZI BURUK</div>
            <div>IMT 17,0-18,4 = GIZI KURANG</div>
            <div>IMT 18,5-25,0 = NORMAL</div>
            <div>IMT 25,1-27,0 = KEGEMUKAN</div>
            <div>IMT &gt; 27,0 = GEMUK</div>
          </div>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Apakah pasien mengalami penurunan berat badan ?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                style={{ marginTop: "10px" }}
              >
                <Select style={{ width: "100%" }}>
                  <Option key="YA">YA</Option>
                  <Option key="TIDAK">TIDAK</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Berapa ?"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ marginTop: "10px" }}
              >
                <InputNumber style={{ width: "80%" }} /> kg
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label="Apakah pasien mengalami penurunan nafsu makan ?"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Select style={{ width: "100%" }}>
                  <Option key="YA">YA</Option>
                  <Option key="TIDAK">TIDAK</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Hasil"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>

          {/* Penilaian Tingkat Nyeri Section */}
          <Divider
            orientation="center"
            style={{
              backgroundColor: "#d9f7be",
              margin: "0px",
              marginTop: "10px",
            }}
          >
            Penilaian Tingkat Nyeri
          </Divider>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Ada Keluhan ?"
                labelCol={{ span: 16 }}
                wrapperCol={{ span: 8 }}
              >
                <Select style={{ width: "100%" }}>
                  <Option key="YA">YA</Option>
                  <Option key="TIDAK">TIDAK</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Penyebab"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                <Select style={{ width: "100%" }}>
                  <Option key="TRAUMA">TRAUMA</Option>
                  <Option key="NON_TRAUMA">NON TRAUMA</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={10}>
              <Form.Item
                label="Skala Nyeri"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Select style={{ width: "70%" }}>
                  <Option key="VAS">VISUAL ANALOG SCALE</Option>
                  <Option key="NRS">NUMERIC RATING SCALE</Option>
                  <Option key="WONG">WONG-BAKER FACES</Option>
                </Select>
                <Button
                  type="primary"
                  size="small"
                  style={{ marginLeft: "10px" }}
                >
                  HITUNG TINGKAT NYERI
                </Button>
              </Form.Item>
            </Col>
            <Col span={14}>
              <Form.Item
                label="Hasil"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 20 }}
              >
                <Input style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={6}>
              <Form.Item
                label="Kategori"
                labelCol={{ span: 12 }}
                wrapperCol={{ span: 12 }}
              >
                <Select style={{ width: "100%" }}>
                  <Option key="RINGAN">RINGAN</Option>
                  <Option key="SEDANG">SEDANG</Option>
                  <Option key="BERAT">BERAT</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Penilaian Resiko Jatuh Section */}
          <Divider
            orientation="center"
            style={{
              backgroundColor: "#d9f7be",
              margin: "0px",
              marginTop: "10px",
            }}
          >
            Penilaian Resiko Jatuh
          </Divider>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Metode"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Select style={{ width: "100%" }}>
                  <Option key="MORSE">MORSE</Option>
                  <Option key="HUMPTY">HUMPTY DUMPTY</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={18}>
              <Button type="primary" size="small">
                HITUNG RESIKO JATUH
              </Button>
              <Input style={{ width: "80%", marginLeft: "10px" }} />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Kategori"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Select style={{ width: "100%" }}>
                  <Option key="RENDAH">RENDAH</Option>
                  <Option key="SEDANG">SEDANG</Option>
                  <Option key="TINGGI">TINGGI</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Keadaan Umum"
                labelCol={{ span: 16 }}
                wrapperCol={{ span: 8 }}
              >
                <Select style={{ width: "100%" }}>
                  <Option key="BAIK">BAIK</Option>
                  <Option key="SEDANG">SEDANG</Option>
                  <Option key="BURUK">BURUK</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          {/* Anamnesa Keperawatan Section */}
          <Divider
            orientation="center"
            style={{
              backgroundColor: "#d9f7be",
              margin: "0px",
              marginTop: "10px",
            }}
          >
            Anamnesa Keperawatan
          </Divider>
          <Form.Item
            label="Tekanan Intrakranial"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "50%" }}>
              <Option key="TIDAK_ADA_KELUHAN">TIDAK ADA KELUHAN</Option>
              <Option key="ADA_KELUHAN">ADA KELUHAN</Option>
            </Select>{" "}
            <Checkbox style={{ marginRight: "20px" }}>SAKIT KEPALA</Checkbox>
            <Checkbox style={{ marginRight: "20px" }}>MUNTAH</Checkbox>
            <Checkbox style={{ marginRight: "20px" }}>
              PERUBAHAN KESADARAN
            </Checkbox>
          </Form.Item>
          <Form.Item
            label="Pupil"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="NORMAL">NORMAL</Option>
              <Option key="MIOSIS">MIOSIS</Option>
              <Option key="MIDRIASIS">MIDRIASIS</Option>
              <Option key="ANISOKORIA">ANISOKORIA</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Neurosensorik"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="TIDAK_ADA_KELUHAN">TIDAK ADA KELUHAN</Option>
              <Option key="ADA_KELUHAN">ADA KELUHAN</Option>
              <Option key="GANGGUAN_PENGLIHATAN">GANGGUAN PENGLIHATAN</Option>
              <Option key="GANGGUAN_PENDENGARAN">GANGGUAN PENDENGARAN</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Muskuloskeletal"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="TIDAK_ADA_GANGGUAN">TIDAK ADA GANGGUAN</Option>
              <Option key="ADA_GANGGUAN">ADA GANGGUAN</Option>
            </Select>{" "}
            Lokasi : <Input style={{ width: "50%" }} />
          </Form.Item>
          <Form.Item
            label="Integumen"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="TIDAK_ADA_GANGGUAN">TIDAK ADA GANGGUAN</Option>
              <Option key="ADA_GANGGUAN">ADA GANGGUAN</Option>
            </Select>{" "}
            Lokasi : <Input style={{ width: "50%" }} />
          </Form.Item>
          <Form.Item
            label="Turgor Kulit"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="BAIK">BAIK</Option>
              <Option key="SEDANG">SEDANG</Option>
              <Option key="BURUK">BURUK</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Edema"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="TIDAK_ADA">TIDAK ADA</Option>
              <Option key="ADA">ADA</Option>
            </Select>{" "}
            <Select style={{ width: "40%" }}>
              <Option key="ANASARKA">ANASARKA</Option>
              <Option key="PITTING">PITTING</Option>
              <Option key="NON_PITTING">NON PITTING</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Mukosa Mulut"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="LEMBAB">LEMBAB</Option>
              <Option key="KERING">KERING</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Perdarahan"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="TIDAK_ADA">TIDAK ADA</Option>
              <Option key="ADA">ADA</Option>
            </Select>{" "}
            Jumlah : <Input style={{ width: "25%" }} /> Warna :{" "}
            <Input style={{ width: "25%" }} />
          </Form.Item>

          <Form.Item
            label="Intoksikasi"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="TIDAK_ADA">TIDAK ADA</Option>
              <Option key="ALKOHOL">ALKOHOL</Option>
              <Option key="OBAT_TERLARANG">OBAT TERLARANG</Option>
              <Option key="MAKANAN">MAKANAN</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Eliminasi"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          ></Form.Item>

          <Row gutter={16}>
            <Col span={4} style={{ textAlign: "right" }}>
              <span>BAB</span>
            </Col>
            <Col span={4}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Select style={{ width: "100%" }}>
                  <Option key="NORMAL">NORMAL</Option>
                  <Option key="KONSTIPASI">KONSTIPASI</Option>
                  <Option key="DIARE">DIARE</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Select style={{ width: "25%" }}>
                  <Option key="KERAS">KERAS</Option>
                  <Option key="LUNAK">LUNAK</Option>
                  <Option key="CAIR">CAIR</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4} style={{ textAlign: "right" }}>
              <span>BAK</span>
            </Col>
            <Col span={4}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Select style={{ width: "100%" }}>
                  <Option key="NORMAL">NORMAL</Option>
                  <Option key="OLIGURIA">OLIGURIA</Option>
                  <Option key="ANURIA">ANURIA</Option>
                  <Option key="POLIURIA">POLIURIA</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Select style={{ width: "25%" }}>
                  <Option key="JERNIH">JERNIH</Option>
                  <Option key="KUNING_PEKAT">KUNING PEKAT</Option>
                  <Option key="BERDARAH">BERDARAH</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Psikososial"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          ></Form.Item>

          <Row gutter={16}>
            <Col span={4} style={{ textAlign: "right" }}>
              <span>Kecemasan</span>
            </Col>
            <Col span={20}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Select style={{ width: "25%" }}>
                  <Option key="TIDAK_ADA">TIDAK ADA</Option>
                  <Option key="RINGAN">RINGAN</Option>
                  <Option key="SEDANG">SEDANG</Option>
                  <Option key="BERAT">BERAT</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4} style={{ textAlign: "right" }}>
              <span>Koping</span>
            </Col>
            <Col span={20}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Select style={{ width: "25%" }}>
                  <Option key="ADAPTIF">ADAPTIF</Option>
                  <Option key="MALADAPTIF">MALADAPTIF</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={4} style={{ textAlign: "right" }}>
              <span>Gangguan</span>
            </Col>
            <Col span={20}>
              <Form.Item wrapperCol={{ span: 24 }}>
                <Select style={{ width: "50%" }}>
                  <Option key="TIDAK_ADA">TIDAK ADA</Option>
                  <Option key="HALUSINASI">HALUSINASI</Option>
                  <Option key="WAHAM">WAHAM</Option>
                  <Option key="DEPRESI">DEPRESI</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Gravida"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "25%" }}>
              <Option key="TIDAK_ADA">TIDAK ADA</Option>
              <Option key="ADA">ADA</Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="HPHT"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <DatePicker style={{ width: "25%" }} />
          </Form.Item>

          {/* Masalah Keperawatan Section */}
          <Divider
            orientation="center"
            style={{
              backgroundColor: "#d9f7be",
              margin: "0px",
              marginTop: "10px",
            }}
          >
            Masalah Keperawatan, Rencana, Dan Evaluasi
          </Divider>
          <Form.Item
            label="Masalah Keperawatan"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Rencana Keperawatan"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Evaluasi"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <TextArea rows={3} />
          </Form.Item>

          {/* Pemberian Obat Section */}
          <Divider
            orientation="center"
            style={{
              backgroundColor: "#d9f7be",
              margin: "0px",
              marginTop: "10px",
            }}
          >
            Pemberian Obat
          </Divider>
          <Row gutter={16}>
            <Col span={6}>
              <Form.Item
                label="Nama Obat"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Dosis"
                labelCol={{ span: 10 }}
                wrapperCol={{ span: 14 }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Rute"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <Select style={{ width: "100%" }}>
                  <Option key="ORAL">ORAL</Option>
                  <Option key="IV">INTRAVENA</Option>
                  <Option key="IM">INTRAMUSKULAR</Option>
                  <Option key="SC">SUBKUTAN</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Waktu"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
              >
                <DatePicker showTime style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Button type="primary" style={{ margin: "10px 0" }}>
            Tambah Obat
          </Button>

          {/* Tindakan Kolaborasi Section */}
          <Divider
            orientation="center"
            style={{
              backgroundColor: "#d9f7be",
              margin: "0px",
              marginTop: "10px",
            }}
          >
            Tindakan Kolaborasi
          </Divider>
          <Form.Item
            label="Jenis Tindakan"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <Select style={{ width: "40%" }}>
              <Option key="LAB">PEMERIKSAAN LABORATORIUM</Option>
              <Option key="RADIOLOGI">PEMERIKSAAN RADIOLOGI</Option>
              <Option key="KONSULTASI">KONSULTASI DOKTER SPESIALIS</Option>
              <Option key="LAINNYA">LAINNYA</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Deskripsi"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <TextArea rows={3} />
          </Form.Item>
          <Form.Item
            label="Hasil"
            labelCol={{ span: 3 }}
            wrapperCol={{ span: 21 }}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Row justify="end" style={{ marginTop: "20px" }}>
            <Col>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                Simpan
              </Button>
              <Button>Batal</Button>
            </Col>
          </Row>
        </Card>
      </ConfigProvider>
    </div>
  );
};

export default DokumenPerawat;
