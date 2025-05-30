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
import dayjs from "dayjs";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";

const { Option } = Select;
const formItemLayoutdpjp = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const FormBraden = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);

  const {
    listBraden,
    setlistBraden,
    getBreden,
    insertBraden,
    delBraden,
    totalScore,
    setTotalScore,
    pengkajianBradenId,
    setpengkajianBradenId,
    tglBraden,
    settglBraden,
    persepsiSensori,
    setpersepsiSensori,
    kelembaban,
    setkelembaban,
    aktivitas,
    setaktivitas,
    mobilitas,
    setmobilitas,
    nutrisi,
    setnutrisi,
    gesekan,
    setgesekan,
    flagBraden,
    setflagBraden,
    nilaiBraden,
    keternganBraden,
  } = useContext(PengkajianContext);

  const databraden = {
    pengkajianBradenId: pengkajianBradenId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tglBraden).format("YYYY-MM-DDTHH:mm"),
    flagAssesment: flagBraden,
    persepsiSensori: persepsiSensori,
    kelembaban: kelembaban,
    aktivitas: aktivitas,
    mobilitas: mobilitas,
    nutrisi: nutrisi,
    gesekan: gesekan,
    nilai: nilaiBraden,
    keterangan: keternganBraden,
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
        const nilaitotal = record.nilai; // Sesuaikan jika nilaitotal disimpan di data lain
        const style =
          nilaitotal >= 20 && nilaitotal <= 23
            ? { color: "black", backgroundColor: "yellowgreen", width: "80%" }
            : nilaitotal >= 15 && nilaitotal <= 19
            ? { color: "black", backgroundColor: "yellow", width: "80%" }
            : nilaitotal >= 11 && nilaitotal <= 14
            ? { color: "black", backgroundColor: "orange", width: "80%" }
            : nilaitotal >= 6 && nilaitotal <= 10
            ? { color: "black", backgroundColor: "red", width: "80%" }
            : { color: "", backgroundColor: "", width: "80%" };

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
              delBraden(record.pengkajianBradenId, record.registrasiId);
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
              setpengkajianBradenId(record.pengkajianBradenId);
              settglBraden(dayjs(record.tanggal));
              setpersepsiSensori(record.persepsiSensori);
              setkelembaban(record.kelembaban);
              setaktivitas(record.aktivitas);
              setmobilitas(record.mobilitas);
              setnutrisi(record.nutrisi);
              setgesekan(record.gesekan);
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
          <Row>
            <Col span={24}>
              {pengkajianBradenId === 0 ? (
                <></>
              ) : (
                <>
                  <Alert
                    message="Anda Akana MElakukan Pengeditan Data"
                    type="info"
                    showIcon
                  />
                </>
              )}

              <Form.Item
                {...formItemLayoutdpjp}
                label="Tanggal Pengkajian"
                style={{ marginBottom: 5 }}
              >
                <DatePicker
                  value={tglBraden}
                  format="DD-MM-YYYY HH:mm"
                  showTime
                  onChange={(e) => {
                    settglBraden(e);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                />
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Persepsi Sensori"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={persepsiSensori}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setpersepsiSensori(e);
                  }}
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
                  <Option value={1}>
                    Tidak merasakan atau respon terhadap stimulus nyeri,
                    kesadaran menurun
                  </Option>
                  <Option value={2}>
                    Gangguan sensori pada bagian 1/2 permukaan tubuh atau hanya
                    berespon pada stimuli nyeri
                  </Option>
                  <Option value={3}>
                    Gangguan sensori pada 1 atau 2 ekstremitas atau berespon
                    pada perintah verbal tapi tidak selalu mampu mengatakan
                    ketidaknyamanan
                  </Option>
                  <Option value={4}>
                    Tidak ada gangguan sensori, berespon penuh terhadap perintah
                    verbal
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Kelembaban"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={kelembaban}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setkelembaban(e);
                  }}
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
                  <Option value={1}>
                    Selalu terpapar oleh keringat atau urine basah
                  </Option>
                  <Option value={2}>Sangat lembab</Option>
                  <Option value={3}>Kadang lembab</Option>
                  <Option value={4}>Kulit kering</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Aktivitas"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={aktivitas}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setaktivitas(e);
                  }}
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
                  <Option value={1}>Terbaring di tempat tidur</Option>
                  <Option value={2}>Tidak bisa berjalan</Option>
                  <Option value={3}>Berjalan dengan atau tanpa bantuan</Option>
                  <Option value={4}>Dapat berjalan sekitar ruangan</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Mobilitas"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={mobilitas}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setmobilitas(e);
                  }}
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
                  <Option value={1}>Tidak mampu bergerak</Option>
                  <Option value={2}>
                    Tidak dapat merubah posisi secara tepat dan teratur
                  </Option>
                  <Option value={3}>
                    Dapat membuat perubahan posisi tubuh atau ekstremitas dengan
                    mandiri
                  </Option>
                  <Option value={4}>Dapat merubah posisi tanpa bantuan</Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Nutrisi"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={nutrisi}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setnutrisi(e);
                  }}
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
                  <Option value={1}>
                    Tidak dapat menghabiskan 1/3 porsi makannya, sedikit minum,
                    puasa atau minum air putih atau mendapat infus lebih dari 5
                    hari
                  </Option>
                  <Option value={2}>
                    Jarang mampu menghabiskan 1/2 porsi makanannya atau intake
                    cairan kurang dari jumlah optimum
                  </Option>
                  <Option value={3}>
                    Mampu menghabiskan lebih dari 1/2 porsi makannya
                  </Option>
                  <Option value={4}>
                    Dapat menghabiskan porsi makannya tidak memerlukan
                    suplementasi nutrisi
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Gesekan"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={gesekan}
                  // dataSource={listSpesialisDBRS}
                  onChange={(e) => {
                    setgesekan(e);
                  }}
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
                  <Option value={1}>
                    Tidak mampu mengangkat badannya sendiri atau spastik,
                    kontraktur atau gelisah
                  </Option>
                  <Option value={2}>
                    Membutuhkan bantuan minimal mengangkat tubuhnya
                  </Option>
                  <Option value={3}>
                    Membutuhkan bantuan minimal mengangkat tubuhnya
                  </Option>
                </Select>
              </Form.Item>
              <Form.Item
                {...formItemLayoutdpjp}
                label="Keterangan"
                style={{ marginBottom: 5 }}
              >
                <Input.Group compact>
                  <Input
                    type="text"
                    placeholder="..."
                    readOnly
                    value={nilaiBraden}
                    style={{ width: "20%" }}
                  />
                  <Input
                    type="text"
                    placeholder="..."
                    // disabled
                    value={keternganBraden}
                    style={
                      nilaiBraden >= 20 && nilaiBraden <= 23
                        ? {
                            color: "black",
                            backgroundColor: "yellowgreen",
                            width: "80%",
                          }
                        : nilaiBraden >= 15 && nilaiBraden <= 19
                        ? {
                            color: "black",
                            backgroundColor: "yellow",
                            width: "80%",
                          }
                        : nilaiBraden >= 11 && nilaiBraden <= 14
                        ? {
                            color: "black",
                            backgroundColor: "orange",
                            width: "80%",
                          }
                        : nilaiBraden >= 6 && nilaiBraden <= 10
                        ? {
                            color: "black",
                            backgroundColor: "red",
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
                    setpengkajianBradenId(0);
                    settglBraden(dayjs());
                    setpersepsiSensori("");
                    setkelembaban("");
                    setaktivitas("");
                    setmobilitas("");
                    setnutrisi("");
                    setgesekan("");
                  }}
                >
                  Batal
                </Button>
                <Button
                  type="primary"
                  onClick={() => {
                    insertBraden(databraden);
                  }}
                >
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
        <Col span={[12]}>
          <Table
            columns={columns}
            dataSource={listBraden}
            rowKey="pengkajianBradenId"
          />
        </Col>
      </Row>
    </div>
  );
};

export default FormBraden;
