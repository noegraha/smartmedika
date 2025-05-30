import {
  Card,
  Col,
  DatePicker,
  Form,
  Image,
  Radio,
  Row,
  Select,
  Spin,
  Table,
} from "antd";
import React, { useContext, useState } from "react";
import { VClaimContext } from "../../rawatjalan/context/VClaimContext";
import dayjs from "dayjs";
import { PasienContext } from "../../rawatjalan/context/PasienContext";
const { RangePicker } = DatePicker;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const LaporanSuratKontrol = () => {
  const {
    listkontrol,
    getListKontrol,
    listpolibpjs,
    getMappingPoliBPJS,
    tanggalawal,
    setTanggalAwal,
    tanggalakhir,
    setTanggalAkhir,
    filter,
    setFilter,
    loading,
  } = useContext(VClaimContext);
  const { ruangpoli } = useContext(PasienContext);

  const [poli, setPoli] = useState(null);
  const [jnspelayanan, setJenisPelayanan] = useState("2");

  const onTanggalRencana = (range) => {
    getListKontrol(
      range[0].format("YYYY-MM-DD"),
      range[1].format("YYYY-MM-DD"),
      filter,
      poli,
      jnspelayanan
    );
    setTanggalAwal(range[0].format("YYYY-MM-DD"));
    setTanggalAkhir(range[1].format("YYYY-MM-DD"));
  };
  const onFilter = (e) => {
    getListKontrol(
      tanggalawal,
      tanggalakhir,
      e.target.value,
      poli,
      jnspelayanan
    );
    setFilter(e.target.value);
  };
  const columnrencanakontrol = [
    {
      title: "No.",
      className: "bgcolortunggu",
      width: "40px",
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: "No. Surat",
      dataIndex: "noSuratKontrol",
    },
    {
      title: "Jenis Pelayanan",
      dataIndex: "jnsPelayanan",
    },
    {
      title: "Tanggal Terbit Kontrol",
      dataIndex: "tglTerbitKontrol",
    },
    {
      title: "Tanggal Kontrol",
      dataIndex: "tglRencanaKontrol",
      sorter: (a, b) => a.tglRencanaKontrol.localeCompare(b.tglRencanaKontrol),
    },
    {
      title: "Nama",
      dataIndex: "nama",
    },
    {
      title: "Dokter",
      dataIndex: "namaDokter",
    },
  ];
  const tableLoading = {
    spinning: loading,
    tip: "Mohon tunggu sedang memuat  data.",
  };
  return (
    <div>
      <Card
        size="small"
        title="Laporan Surat Kontrol"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Form {...formItemLayout}>
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Image
                style={{ marginBottom: 10, marginLeft: 10 }}
                preview={false}
                width={150}
                src="https://upload.wikimedia.org/wikipedia/commons/b/b4/BPJS_Kesehatan_logo.svg"
              />
              <Form.Item
                {...formItemLayout}
                style={{ marginBottom: 0 }}
                label="PoliKlinik RSMS"
              >
                <Select
                  dataSource={ruangpoli.sort((a, b) =>
                    b.deskripsi
                      .split("- ")
                      .pop()
                      .localeCompare(a.deskripsi.split("- ").pop())
                  )}
                  showSearch
                  placeholder="Pilih Ruang..."
                  optionFilterProp="children"
                  onChange={(e) => {
                    getMappingPoliBPJS(e);
                  }}
                  filterOption={(input, option) =>
                    option.props.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {ruangpoli.map((d) => (
                    <Option
                      key={d.ruangId}
                      className={
                        d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""
                      }
                    >
                      {d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item label="PoliKlinik BPJS" style={{ marginBottom: 0 }}>
                <Spin spinning={loading}>
                  <Select
                    showSearch
                    onChange={(e) => {
                      getListKontrol(
                        tanggalawal,
                        tanggalakhir,
                        filter,
                        e,
                        jnspelayanan
                      );
                      setPoli(e);
                    }}
                    style={{ width: "100%" }}
                    placeholder="Nama Poli"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    loading={loading}
                  >
                    {listpolibpjs.map((p) => (
                      <Option key={p.kodeBpjs}>{p.ruangDeskripsiBPJS}</Option>
                    ))}
                  </Select>
                </Spin>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Range Tanggal" style={{ marginBottom: 0 }}>
                <RangePicker
                  value={[dayjs(tanggalawal), dayjs(tanggalakhir)]}
                  onChange={onTanggalRencana}
                  disabled={loading}
                />
              </Form.Item>
              <Form.Item label="Filter Berdasarkan" style={{ marginBottom: 0 }}>
                <Radio.Group
                  onChange={onFilter}
                  value={filter}
                  disabled={loading}
                >
                  <Radio value={"1"}>Tanggal Entri</Radio>
                  <Radio value={"2"}>Tanggal Rencana Kontrol</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="Asal Pelayanan">
                <Radio.Group
                  onChange={(e) => {
                    getListKontrol(
                      tanggalawal,
                      tanggalakhir,
                      filter,
                      poli,
                      e.target.value
                    );
                    setJenisPelayanan(e.target.value);
                  }}
                  value={jnspelayanan}
                  disabled={loading}
                >
                  <Radio value={"1"}>Rawat Inap</Radio>
                  <Radio value={"2"}>Rawat Jalan</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Table
          loading={tableLoading}
          size="small"
          dataSource={listkontrol}
          columns={columnrencanakontrol}
          rowClassName={(record, index) =>
            record.tglTerbitKontrol === record.tglRencanaKontrol
              ? "colorpilih"
              : "fontkecil"
          }
          pagination={{
            defaultPageSize: 30,
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30", "40", "50", "100"],
          }}
        />
      </Card>
    </div>
  );
};

export default LaporanSuratKontrol;
