import React, { useContext, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  Slider,
  Space,
  Row,
  Col,
  DatePicker,
  Table,
  Alert,
  Popconfirm,
} from "antd";
import { PengkajianContext } from "../context/PengkajianContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import dayjs from "dayjs";
import { platform } from "os";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const FormFungsiMenelan = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    listMenelan,
    setlistMenelan,
    getMenelan,
    insertMenelan,
    delMenelan,
    pengkajianMenelanId,
    setpengkajianMenelanId,
    tglMenelan,
    settglMenelan,
    kesadaran,
    setKesadaran,
    suaraNafas,
    setSuaraNafas,
    komprehensif,
    setKomprehensif,
    bicara,
    setBicara,
    motorikBibir,
    setMotorikBibir,
    gerakanLidah,
    setGerakanLidah,
    palatum,
    setPalatum,
    reflekGag,
    setReflekGag,
    fonasi,
    setFonasi,
    batuk,
    setBatuk,
    mengunyah,
    setMengunyah,
    oral,
    setOral,
    pharynx,
    setPharynx,
    toleransiMenelan,
    setToleransiMenelan,
    flagMenelan,
    setflagMenelan,
    nilaimenelan,
    ketMenenlan,
  } = useContext(PengkajianContext);

  const datamenelan = {
    pengkajianMenelanId: pengkajianMenelanId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglMenelan).format("YYYY-MM-DDTHH:mm"),
    flagAssesment: flagMenelan,
    kesadaran: kesadaran,
    suaraNafas: suaraNafas,
    komprehensif: komprehensif,
    bicara: bicara,
    motorikBibir: motorikBibir,
    gerakanLidah: gerakanLidah,
    platum: palatum,
    reflekGag: reflekGag,
    fonasi: fonasi,
    batuk: batuk,
    mengunyah: mengunyah,
    oral: oral,
    pharynx: pharynx,
    toleransiMenelan: toleransiMenelan,
    nilai: nilaimenelan,
    keterangan: ketMenenlan,
    userId: namauser,
    hapus: false,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientIp: ip,
  };

  const columns = [
    {
      title: "Tanggal",
      dataIndex: "tanggal",
      key: "tanggal",
      render: (text) => dayjs(text).format("DD-MM-YYYY HH:mm"), // Memformat tanggal
    },
    {
      title: "Nilai",
      dataIndex: "nilai",
      key: "nilai",
    },
    {
      title: "Keterangan",
      dataIndex: "keterangan",
      key: "keterangan",
      render: (text, record) => {
        const nilaimenelan = record.nilai; // Sesuaikan jika nilaitotal disimpan di data lain
        const style =
          nilaimenelan > 19 && nilaimenelan < 81
            ? { color: "black", backgroundColor: "orange", width: "80%" }
            : nilaimenelan > 80 && nilaimenelan < 100
            ? { color: "black", backgroundColor: "yellowgreen", width: "80%" }
            : "";
        return (
          <div
            style={{
              ...style,
              padding: "4px",
              textAlign: "center",
              borderRadius: "4px",
            }}
          >
            {text}
          </div>
        );
      },
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
    },
    {
      title: "Aksi",
      key: "aksi",
      render: (text, record) => (
        <Space size="middle">
          <Popconfirm
            title="Anda Yakin Dihapus ?"
            onConfirm={(e) => {
              delMenelan(record.pengkajianMenelanId, record.registrasiId);
            }}
            onCancel={(e) => {}}
            okText="Ya"
            cancelText="Tidak"
          >
            <Button size="small" type="primary" danger>
              Hapus
            </Button>
          </Popconfirm>

          <Button
            size="small"
            style={{ color: "white", backgroundColor: "green" }}
            onClick={() => {
              setpengkajianMenelanId(record.pengkajianMenelanId);
              settglMenelan(dayjs(record.tanggal));
              setKesadaran(record.kesadaran);
              setSuaraNafas(record.suaraNafas);
              setKomprehensif(record.komprehensif);
              setBicara(record.bicara);
              setMotorikBibir(record.motorikBibir);
              setGerakanLidah(record.gerakanLidah);
              setPalatum(record.platum);
              setReflekGag(record.reflekGag);
              setFonasi(record.fonasi);
              setBatuk(record.batuk);
              setMengunyah(record.mengunyah);
              setOral(record.oral);
              setPharynx(record.pharynx);
              setToleransiMenelan(record.toleransiMenelan);
            }}
          >
            Edit
          </Button>
        </Space>
      ),
    },
  ];
  return (
    <div>
      <Row gutter={[10, 10]}>
        <Col span={12}>
          <>
            <Row>
              <Col span={24}>
                {pengkajianMenelanId === 0 ? (
                  <></>
                ) : (
                  <>
                    <Alert
                      message="Anda Akana Melakukan Pengeditan Data"
                      type="info"
                      showIcon
                    />
                  </>
                )}
                <Form.Item
                  {...formItemLayout}
                  label="Tanggal Pengkajian"
                  style={{ marginBottom: 5 }}
                >
                  <DatePicker
                    value={tglMenelan}
                    format="DD-MM-YYYY HH:mm"
                    onChange={(date) => {
                      settglMenelan(date);
                    }}
                    showTime
                    style={{ width: "100%" }}
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Kesadaran"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={kesadaran} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setKesadaran(value);
                    }}
                  >
                    <Option value={2}>Tidak berespon</Option>
                    <Option value={5}>Sukar dibangunkan</Option>
                    <Option value={6}>Samnolen</Option>
                    <Option value={8}>Apatis</Option>
                    <Option value={10}>Sadar penuh</Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label="Suara Nafas"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={suaraNafas} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setSuaraNafas(value);
                    }}
                  >
                    <Option value={2}>Slim banyak</Option>
                    <Option value={4}>Ronchi berat</Option>
                    <Option value={6}>Ronchi sedang</Option>
                    <Option value={8}>Ronchi ringan</Option>
                    <Option value={10}>Bersih</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Komprehensif"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={komprehensif} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setKomprehensif(value);
                    }}
                  >
                    <Option value={1}>Respon minimal, tidak ada respon</Option>
                    <Option value={2}>Mengikuti pembicaraan</Option>
                    <Option value={3}>Mengikuti satu perintah</Option>
                    <Option value={4}>Kadang-kadang bisa</Option>
                    <Option value={5}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Bicara"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={bicara} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setBicara(value);
                    }}
                  >
                    <Option value={1}>Tidak ada/suara minimal</Option>
                    <Option value={2}>Beberapa kata saja</Option>
                    <Option value={3}>Membentuk kalimat/tidak sesuai</Option>
                    <Option value={4}>Disatria</Option>
                    <Option value={5}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Motorik Bibir"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={motorikBibir} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setMotorikBibir(value);
                    }}
                  >
                    <Option value={1}>Tidak ada gerakan</Option>
                    <Option value={2}>
                      Sangat tidak simetris/sukar digerakan
                    </Option>
                    <Option value={3}>Tidak simetris/gerakan terganggu</Option>
                    <Option value={4}>Sedikit tidak simetris</Option>
                    <Option value={5}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Gerakan Lidah"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={gerakanLidah} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setGerakanLidah(value);
                    }}
                  >
                    <Option value={2}>Tak ada gerakan</Option>
                    <Option value={4}>ROM sangat terbatas</Option>
                    <Option value={6}>ROM terbatas</Option>
                    <Option value={8}>Gangguan ROM ringan</Option>
                    <Option value={10}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Palatum"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={palatum} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setPalatum(value);
                    }}
                  >
                    <Option value={1}>Tak ada gerakan</Option>
                    <Option value={2}>Asimetris berat</Option>
                    <Option value={3}>Asimetris sedang</Option>
                    <Option value={4}>Asimetris ringan</Option>
                    <Option value={5}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Reflek Gag"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={reflekGag} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setReflekGag(value);
                    }}
                  >
                    <Option value={1}>Tidak bisa dikaji</Option>
                    <Option value={2}>Reflek satu sisi hilang</Option>
                    <Option value={3}>Reflek menurun</Option>
                    <Option value={4}>Reflek gag tak simetris</Option>
                    <Option value={5}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Fonasi"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={fonasi} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setFonasi(value);
                    }}
                  >
                    <Option value={1}>Tidak ada suara/minimal</Option>
                    <Option value={2}>Seperti suara berkumur</Option>
                    <Option value={3}>Serak</Option>
                    <Option value={4}>Serak ringan</Option>
                    <Option value={5}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Batuk"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={batuk} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setBatuk(value);
                    }}
                  >
                    <Option value={2}>Tidak ada</Option>
                    <Option value={4}>Reflek batuk sangat lemah</Option>
                    <Option value={6}>Reflek batuk agak lemah</Option>
                    <Option value={8}>Sering batuk</Option>
                    <Option value={10}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Mengunyah"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={mengunyah} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setMengunyah(value);
                    }}
                  >
                    <Option value={1}>Tidak bisa</Option>
                    <Option value={2}>Minimal</Option>
                    <Option value={3}>Kurang mampu membentuk bolus</Option>
                    <Option value={4}>Ada sisa makanan di mulut</Option>
                    <Option value={5}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Oral"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={oral} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setOral(value);
                    }}
                  >
                    <Option value={2}>Tak ada gerakan</Option>
                    <Option value={4}>Sangat tidak terorganisasi</Option>
                    <Option value={6}>
                      Sangat lambat memindahkan makanan &gt;5detik
                    </Option>
                    <Option value={8}>
                      Lambat memindahkan makanan (1-5detik)
                    </Option>
                    <Option value={10}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Pharynx"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={pharynx} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setPharynx(value);
                    }}
                  >
                    <Option value={2}>Tidak ada gerakan</Option>
                    <Option value={4}>Sangat lambat &gt;5detik</Option>
                    <Option value={6}>Lambat (3-5detik)</Option>
                    <Option value={8}>Agak lambat (1-2detik)</Option>
                    <Option value={10}>Normal</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Toleransi Menelan"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    value={toleransiMenelan} // Use the appropriate state variable here
                    style={{
                      width: "100%",
                    }}
                    onChange={(value) => {
                      setToleransiMenelan(value);
                    }}
                  >
                    <Option value={1}>Tidak toleran</Option>
                    <Option value={2}>Toleran makanan kental</Option>
                    <Option value={3}>Makanan kental dan cair</Option>
                    <Option value={4}>Makanan lunak dan cair</Option>
                    <Option value={5}>Semua jenis makanan</Option>
                  </Select>
                </Form.Item>

                <Form.Item
                  {...formItemLayout}
                  label="Keterangan"
                  style={{ marginBottom: 5 }}
                >
                  <Input.Group compact>
                    <Input
                      type="text"
                      placeholder="..."
                      readOnly
                      value={nilaimenelan}
                      style={{ width: "20%" }}
                    />
                    <Input
                      type="text"
                      placeholder="..."
                      disabled
                      value={ketMenenlan}
                      style={
                        nilaimenelan > 19 && nilaimenelan < 81
                          ? {
                              color: "black",
                              backgroundColor: "orange",
                              width: "80%",
                            }
                          : nilaimenelan > 80 && nilaimenelan < 100
                          ? {
                              color: "black",
                              backgroundColor: "yellowgreen",
                              width: "80%",
                            }
                          : { color: "", backgroundColor: "", width: "80%" }
                      }
                      readOnly
                    />
                  </Input.Group>
                </Form.Item>
              </Col>
              <Col span={24} style={{ textAlign: "right" }}>
                <Space>
                  <Button
                    // type="primary"
                    onClick={() => {
                      setpengkajianMenelanId(0);
                      settglMenelan(dayjs());
                      setKesadaran("");
                      setSuaraNafas("");
                      setKomprehensif("");
                      setBicara("");
                      setMotorikBibir("");
                      setGerakanLidah("");
                      setPalatum("");
                      setReflekGag("");
                      setFonasi("");
                      setBatuk("");
                      setMengunyah("");
                      setOral("");
                      setPharynx("");
                      setToleransiMenelan("");
                    }}
                  >
                    Batal
                  </Button>
                  <Button
                    type="primary"
                    onClick={() => {
                      insertMenelan(datamenelan);
                    }}
                  >
                    Simpan
                  </Button>
                </Space>
              </Col>
            </Row>
          </>
        </Col>
        <Col span={12}>
          <Table
            columns={columns}
            dataSource={listMenelan}
            rowKey="pengkajianNIHSSId"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormFungsiMenelan;
