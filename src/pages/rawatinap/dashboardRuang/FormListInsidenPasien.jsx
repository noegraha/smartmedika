import React, { useContext, Fragment, useState } from "react";
import {
  Button,
  Select,
  Form,
  Row,
  Col,
  InputNumber,
  Table,
  Card,
  Input,
  Divider,
  Modal,
  Typography,
  Popconfirm,
  Space,
  Tooltip,
  message,
  DatePicker,
  Alert,
} from "antd";
import dayjs from "dayjs";
import {
  CloseCircleTwoTone,
  EditTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import FormLaporInsiden from "./FormLaporInsiden";
import { InsidenContext } from "../context/InsidenContext";
import DetailInsiden from "./DetailInsiden";
const { Column } = Table;
const { Option } = Select;
const formItemLayoutFull = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const FormListInsidenPasien = () => {
  const {
    getListInsiden,
    getInsidenDetail,
    insertInsiden,
    cariNoreg,
    setcariNoreg,
    regisIdInsiden,
    setregisIdInsiden,
    tanggalKejadian,
    setTanggalKejadian,
    insiden,
    setInsiden,
    kronologisInsiden,
    setKronologisInsiden,
    jenisInsiden,
    setJenisInsiden,
    pelaporInsiden,
    setPelaporInsiden,
    // lainnyapelapor, setLainnyapelapor,
    namaPelapor,
    setNamaPelapor,
    korbanInsiden,
    setKorbanInsiden,
    // lainyaKorban, setLainyaKorban,
    namaKorban,
    setNamaKorban,
    insidenTerkaitPasien,
    setInsidenTerkaitPasien,
    // lainyaRuangKejadian, setLainyaRuangKejadian,
    tempatKejadian,
    setTempatKejadian,
    spesialisPenyakitInsiden,
    setSpesialisPenyakitInsiden,
    // lainyaSubspesialis, setLainyaSubspesialis,
    unitPenyebab,
    setUnitPenyebab,
    akibatTerhadapPasien,
    setAkibatTerhadapPasien,
    tindakanPascaInsiden,
    setTindakanPascaInsiden,
    pelakuTindakan,
    setPelakuTindakan,
    // lainyaPelakuTindakan, setLainyaPelakuTindakan,
    namaPelakuTindakan,
    setNamaPelakuTindakan,
    tidakanSerupa,
    setTidakanSerupa,
    // tanggalSebelumnya, setTanggalSebelumnya,
    kronologiSebelumnya,
    setKronologiSebelumnya,
    pasienAda,
    setPasienAda,
    insidenId,
    setinsidenId,
    pembuatLaporan,
    setpembuatLaporan,
    tglLaporan,
    settglLaporan,
    penerimaLaporan,
    setpenerimaLaporan,
    tglDiterima,
    settglDiterima,
    listInsidenPasien,
    modalDetail,
    setmodalDetail,
    visibleTanbah,
    setvisibleTanbah,
  } = useContext(InsidenContext);
  const [kodepilihan, setkodepilihan] = useState("Bulan");
  const [bulanPilih, setbulanPilih] = useState(dayjs());
  const [tahunPilih, settahunPilih] = useState(dayjs());
  const [warnaRow, setWarnaRow] = useState([]);
  const [page, setPage] = useState(1);
  return (
    <div>
      <Card
        title="Daftar Insiden Pasien"
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "lavenderblush" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={
          <Button
            icon={<PlusOutlined />}
            size="small"
            onClick={() => {
              setvisibleTanbah(true);
            }}
            style={{ backgroundColor: "green" }}
          >
            Tambah Order
          </Button>
        }
      >
        <Row gutter={[5, 5]}>
          <Col span={10}>
            <Form.Item
              {...formItemLayoutFull}
              label="Lihat Berdasarkan"
              style={{ marginBottom: 0 }}
            >
              <Select
                value={kodepilihan}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={(e) => {
                  setkodepilihan(e);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Bulan">Bulan</Option>
                <Option value="Tahun">Tahun</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={10}>
            {kodepilihan === "Bulan" ? (
              <div>
                <DatePicker
                  value={bulanPilih}
                  format="MM-YYYY"
                  onChange={(e) => {
                    setbulanPilih(e);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                  picker="month"
                />
              </div>
            ) : (
              <div>
                <DatePicker
                  value={tahunPilih}
                  format="YYYY"
                  onChange={(e) => {
                    setbulanPilih(e);
                  }}
                  style={{ width: "100%" }}
                  placeholder="..."
                  picker="year"
                />
              </div>
            )}
          </Col>
          <Col span={4}>
            <Button
              style={{ backgroundColor: "#17a2b8", width: "100%" }}
              type="primary"
              onClick={() => {
                kodepilihan === "Bulan"
                  ? getListInsiden(
                      dayjs(bulanPilih).format("MM"),
                      dayjs(bulanPilih).format("YYYY"),
                      "%20"
                    )
                  : getListInsiden(
                      "%20",
                      dayjs(tahunPilih).format("YYYY"),
                      "%20"
                    );
              }}
            >
              Lihat
            </Button>
          </Col>
          <Col span={24}>
            <Table
              dataSource={listInsidenPasien}
              bordered
              pagination={true}
              size="small"
              // onRow={(record, rowIndex) => {
              //     return {
              //         onClick: (e) => {
              //             getInsidenDetail(record.insidenId)
              //             setWarnaRow(rowIndex)
              //         }
              //     }
              // }
              // }
              // rowClassName={(record, rowIndex) =>
              //     rowIndex === warnaRow ? "warnacolompilihtable" : null
              // }
            >
              <Column
                title="No"
                key="noorder"
                render={(text, record, index) => (
                  <span>{(page - 1) * 10 + index + 1}</span>
                )}
              />
              <Column
                title="Tanggal"
                key="reg"
                className="tabeltabel"
                render={(listInsidenPasien) => (
                  <span>
                    {dayjs(listInsidenPasien.tanggal).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </span>
                )}
              />
              <Column
                title="No pasien"
                className="tabeltabel"
                key="nama"
                render={(listInsidenPasien) => (
                  <span>{listInsidenPasien.registrasiId}</span>
                )}
              />
              <Column
                title="Nama Korban"
                className="tabeltabel"
                key="nama"
                render={(listInsidenPasien) => (
                  <span>{listInsidenPasien.namaKorban}</span>
                )}
              />
              <Column
                title="Ruang"
                className="tabeltabel"
                key="nama"
                render={(listInsidenPasien) => (
                  <span>{listInsidenPasien.tempatKejadianDesk}</span>
                )}
              />
              <Column
                title="Tgl Lapor"
                className="tabeltabel"
                key="nama"
                render={(listInsidenPasien) => (
                  <span>
                    {dayjs(listInsidenPasien.tglLaporan).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </span>
                )}
              />
              <Column
                title="Tgl Terima"
                className="tabeltabel"
                key="nama"
                render={(listInsidenPasien) => (
                  <span>
                    {dayjs(listInsidenPasien.tglDiterima).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </span>
                )}
              />
              <Column
                title="Status"
                className="tabeltabel"
                key="nama"
                render={(listInsidenPasien) => (
                  <span>
                    {listInsidenPasien.tglDiterima === null ? (
                      <Alert message="Belum Diterima" type="warning" />
                    ) : (
                      <Alert message="Sudah Diterima" type="success" />
                    )}
                  </span>
                )}
              />
              <Column
                title="Keterangan"
                className="tabeltabel"
                key="nama"
                render={(listInsidenPasien) => (
                  <span>
                    {listInsidenPasien.tglDiterima === null ? (
                      <Button
                        style={{ backgroundColor: "lightgreen", width: "100%" }}
                        type="primary"
                        onClick={() => {
                          getInsidenDetail(listInsidenPasien.insidenId);
                        }}
                      >
                        Proses
                      </Button>
                    ) : (
                      <Button
                        style={{ backgroundColor: "#17a2b8", width: "100%" }}
                        type="primary"
                        onClick={() => {
                          getInsidenDetail(listInsidenPasien.insidenId);
                        }}
                      >
                        Lihat
                      </Button>
                    )}
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Card>
      <Modal
        title="Cari Pasien"
        visible={visibleTanbah}
        width="1000px"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setvisibleTanbah(false);
        }}
      >
        <FormLaporInsiden />
      </Modal>
      <Modal
        title="Cari Pasien"
        visible={modalDetail}
        width="1000px"
        footer={null}
        //onOk={handleOk}
        onCancel={() => {
          setmodalDetail(false);
        }}
      >
        <DetailInsiden />
      </Modal>
    </div>
  );
};

export default FormListInsidenPasien;
