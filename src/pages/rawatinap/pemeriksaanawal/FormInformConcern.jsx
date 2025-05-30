import React from "react";
import {
  Tabs,
  Table,
  Col,
  Row,
  Form,
  Input,
  Card,
  Button,
  Select,
  DatePicker,
  Space,
  Popconfirm,
  message,
  Alert,
} from "antd";
import { useContext } from "react";
import { InformRIContext } from "../context/InformConcernRIContext";
import dayjs from "dayjs";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "../context/PasienRIContext";
import { CatatanmedisContext } from "../../rawatjalan/context/CatatanmedisContext";
const { TabPane } = Tabs;
const formItemLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};
const { Option } = Select;
const FormInformConcern = () => {
  const { hubungan } = useContext(CatatanmedisContext);
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const namalengkap = sessionStorage.getItem("namapetugas");
  const {
    detailInformRI,
    insertInformRI,
    kosongkanformInformRI,
    namaPenandaTangan,
    setnamaPenandaTangan,
    umur,
    setumur,
    alamat,
    setalamat,
    hubunganId,
    sethubunganId,
    persetujuan,
    setpersetujuan,
    namaPerawat,
    setnamaPerawat,
    ttdPasien,
    setttdPasien,
    ttdPerawat,
    setttdPerawat,
    hapus,
    sethapus,
    userId,
    setuserId,
    jamInform,
    setjamInform,
  } = useContext(InformRIContext);
  const dateFormat = "DD-MM-YYYY HH:mm";
  const columns = [
    {
      title: "No.",
      dataIndex: "key",
      key: "key",
      width: "50px",
    },
    {
      title: "Pernyataan",
      dataIndex: "pernyataan",
      key: "pernyataan",
    },
  ];

  const data = [
    {
      key: "1",
      pernyataan: "Ruang Perawatan",
    },
    {
      key: "2",
      pernyataan: "Tempat-tempat penting",
    },
    {
      key: "3",
      pernyataan: "Perawat pengelola",
    },
    {
      key: "4",
      pernyataan: "Fasilitas ruang perawatan",
    },
    {
      key: "5",
      pernyataan: "Tata tertib ruang perawatan",
    },
    {
      key: "6",
      pernyataan: "Hak-hak pasien",
    },
    {
      key: "7",
      pernyataan: "Kewajiban pasien",
    },
    {
      key: "8",
      pernyataan: "Hak dan kewajiban perawat",
    },
    {
      key: "9",
      pernyataan: "Hak dan kewajiban dokter",
    },
    {
      key: "10",
      pernyataan: "Hak dan kewajiban rumah sakit",
    },
    {
      key: "11",
      pernyataan: "Perkiraan biaya",
    },
    {
      key: "12",
      pernyataan: "Rencana asuhan keperawatan",
    },
    {
      key: "13",
      pernyataan: "Dishcarge planning",
    },
  ];
  const dataInform = {
    registrasiId: curpasRI.registrasiId,
    tanggal: dayjs().format("YYYY-MM-DDTHH:mm"),
    namaPenandaTangan: namaPenandaTangan,
    umur: umur,
    alamat: alamat,
    hubunganId: hubunganId,
    persetujuan: persetujuan,
    namaPerawat: namalengkap,
    hapus: false,
    userId: namauser,
    clientHost: host,
    clientIp: ip,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
  };

  const onSimpanInfConcern = (e) => {
    insertInformRI(e);
  };
  const onCanceltip = () => {
    message.error("Batal disimpan!");
  };
  return (
    <div>
      <Form>
        <Row gutter={[20, 20]}>
          <Col span={14}>
            <Card title="Yang menerima informasi dan menandatangani">
              <Form.Item
                {...formItemLayout}
                label="Nama"
                style={{ marginBottom: 5 }}
              >
                <Input
                  value={namaPenandaTangan}
                  onChange={(e) => {
                    setnamaPenandaTangan(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Umur"
                style={{ marginBottom: 5 }}
              >
                <Input
                  value={umur}
                  onChange={(e) => {
                    setumur(e.target.value);
                  }}
                  type="number"
                  suffix="Tahun"
                  style={{ width: "100%" }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Alamat"
                style={{ marginBottom: 5 }}
              >
                <Input
                  value={alamat}
                  onChange={(e) => {
                    setalamat(e.target.value);
                  }}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Hubungan"
                style={{ marginBottom: 5 }}
              >
                <Select
                  dataSource={hubungan}
                  showSearch
                  value={hubunganId}
                  style={{ width: "100%" }}
                  placeholder="Pilih Hubungan..."
                  optionFilterProp="children"
                  onChange={(e) => {
                    sethubunganId(e);
                  }}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {hubungan.map((d) => (
                    <Option key={d.hubunganId}>{d.deskripsi}</Option>
                  ))}
                </Select>
                {/* <Select value={hubunganId}
                                            onChange={(e) => {
                                                sethubunganId(e);
                                            }}>
                                            <Option value="Diri Sendiri">Diri Sendiri</Option>
                                            <Option value="Suami/Istri">Suami/Istri</Option>
                                            <Option value="Saudara">Saudara</Option>
                                            <Option value="Ayah">Ayah</Option>
                                            <Option value="Ibu">Ibu</Option>
                                            <Option value="Kakak">Kakak</Option>
                                            <Option value="Adiks">Adik</Option>
                                        </Select> */}
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label="Persetujuan"
                style={{ marginBottom: 5 }}
              >
                <Select
                  value={persetujuan}
                  onChange={(e) => {
                    setpersetujuan(e);
                  }}
                >
                  <Option value="Menyetujui">Menyetujui</Option>
                  <Option value="Tidak Menyetujui">Tidak Menyetujui</Option>
                </Select>
              </Form.Item>
              <Alert
                message="Pelaksanaan perawatan inap dan tindakan-tindakan keperawatan selama perawatan inap. Memahami bahwa ilmu keperawatan bukan ilmu pasti,
                                    maka keberhasilan tindakan keperawatan bukanlah merupakan keniscayaan melainkan sangat bergantung kepada izin Tuhan Yang Maha Esa."
                type="warning"
              />
            </Card>
            {/* <Card>
                                    <Row>
                                        <Col span={24} style={{ textAlign: "right" }}>
                                            <Space>
                                                <Button>User</Button>
                                                <Button>Pasien</Button>
                                            </Space>
                                        </Col>
                                    </Row>
                                </Card> */}
          </Col>
          <Col span={10}>
            <Card title="Informasi yang disampaikan">
              <Table
                bordered
                scroll={{ x: "100px", y: "300px" }}
                pagination={false}
                size="small"
                rowSelection={{
                  type: "checkbox",
                  columnWidth: "60px",
                  fixed: "right",
                  selectedRowKeys:
                    persetujuan === "Menyetujui"
                      ? [
                          "1",
                          "2",
                          "3",
                          "4",
                          "5",
                          "6",
                          "7",
                          "8",
                          "9",
                          "10",
                          "11",
                          "12",
                          "13",
                        ]
                      : [],
                }}
                columns={columns}
                dataSource={data}
              />
            </Card>
          </Col>
        </Row>

        <Card>
          <Row gutter={[16, 16]}>
            <Col span={12}>
              <Space>{/* <Button>Cetak</Button> */}</Space>
            </Col>
            <Col span={12} style={{ textAlign: "right" }}>
              <Space>
                <Button onClick={() => kosongkanformInformRI()}>Batal</Button>
                <Button
                  type={"primary"}
                  onClick={() => onSimpanInfConcern(dataInform)}
                >
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Card>
      </Form>
      {/* </TabPane> */}
      {/* <TabPane tab="Penyataan Pulang APS" key="2">
                    Penyataan Pulang APS
                </TabPane> */}
      {/* </Tabs> */}
    </div>
  );
};

export default FormInformConcern;
