import {
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Popconfirm,
  Row,
  Select,
  Table,
  Modal,
  Spin,
  Space,
  DatePicker,
  Tabs,
  Image,
} from "antd";
import Iframe from "react-iframe";
import React, { Fragment, useContext, useState } from "react";
import dayjs from "dayjs";
import { PemeriksaanLainContext } from "../../rawatjalan/context/pemeriksaancontext/PemeriksaanLainContext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { PasienRIContext } from "../context/PasienRIContext";
import { MasterContext } from "../../master/context/MasterContext";
import PenunjangLuar from "./PenunjangLuar";
import ButtonHistoryTindakan from "../../rawatjalan/pemeriksaankhusus/ButtonHistoryTindakan";
const { TabPane } = Tabs;
const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormPenunjangLain = () => {
  const {
    listpmrlain,
    insertPemeriksaanLain,
    setPelaksana,
    pelaksana,
    hasilpemeriksaan,
    setHasilPemeriksaan,
    listpenunjanglain,
    kodehasil,
    setkodeHasil,
    layananpmrlain,
    mappingLayananPemeriksaanLain,
    pelayanan,
    setPelayanan,
    deletePemeriksaanLain,
    mappingLayananPemeriksaanLainByRuang,
    tanggal,
    setTanggal,
    tanggalMulai,
    settanggalMulai,
    tanggalSelesai,
    settanggalSelesai,
    kosongkanform,
    penunjangLainId,
    setpenunjangLainId,
    insertPemeriksaanLainRI,
    ruangpasien,
    setRuangPasien,
  } = useContext(PemeriksaanLainContext);
  const {
    printPemLain,
    // setprintPemLain,
    modalPemLain,
    setmodalPemLain,
    getPrintPemLain,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);
  const { ruangAll, setruangAll, getRuangMedis } = useContext(MasterContext);
  const { curpasRI, ruangRi } = useContext(PasienRIContext);
  const { dokterall } = useContext(PelayananContext);
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const petugas = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const scaleStep = 0.3;
  const column = [
    {
      title: "Pemeriksaan",
      dataIndex: "deskripsiHasilPenunjang",
      key: "pemeriksaan",
    },
    {
      title: "Tanggal",
      key: "tanggal",
      render: (text, record) => record.tanggal.substring(0, 10),
    },
    {
      title: "Pelaksana",
      dataIndex: "pelaksanaDesk",
      key: "pelaksana",
    },
    {
      title: "Hasil Pemeriksaan",
      dataIndex: "hasilPemeriksaan",
      key: "hasil",
    },
    {
      title: "Durasi",
      key: "durasi",
      render: (listpmrlain) => {
        const mulai = dayjs(listpmrlain.mulai);
        const selesai = dayjs(listpmrlain.selesai);
        const durationMinutes = selesai.diff(mulai, "minutes");

        const hours = Math.floor(durationMinutes / 60);
        const minutes = durationMinutes % 60;

        return (
          <span>
            {hours} jam {minutes} menit
          </span>
        ); // Display the duration in hours and minutes
      },
    },
    {
      title: "Link",
      dataIndex: "url",
      key: "url",
      render: (text, record) =>
        text === null ? (
          <></>
        ) : (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                setVisible(true);
                setImage("http://182.168.2.248:82/" + text);
              }}
            >
              Gambar
            </Button>
            <Image
              // width={200}
              style={{
                display: "none",
              }}
              // src={`http://182.168.2.248:82/${text}`}
              preview={{
                visible,
                scaleStep,
                src: image,
                onVisibleChange: (value) => {
                  setVisible(value);
                },
              }}
            />
          </div>
        ),
    },
    {
      title: "Action",
      render: (listpmrlain) => (
        <span>
          <Space direction="vertical">
            <Popconfirm
              title="Anda Yakin Dihapus ?"
              onConfirm={(e) =>
                insertPemeriksaanLainRI({
                  noID: listpmrlain.noID,
                  registrasiId: curpasRI.registrasiId,
                  ruangRawatId: listpmrlain.ruangRawatId,
                  tanggal: dayjs(listpmrlain.tanggal).format(
                    "YYYY-MM-DDTHH:mm"
                  ),
                  mulai: dayjs(listpmrlain.mulai).format("YYYY-MM-DDTHH:mm"),
                  selesai: dayjs(listpmrlain.selesai).format(
                    "YYYY-MM-DDTHH:mm"
                  ),
                  ruangId: curpasRI.ruangId,
                  kodeHasil: listpmrlain.kodeHasil,
                  pelayananId: listpmrlain.pelayananId,
                  hasilPemeriksaan: listpmrlain.hasilPemeriksaan,
                  pelaksanaId: listpmrlain.pelaksanaId,
                  hapus: true,
                  userID: petugas,
                  clientIP: ip,
                  clientHost: host,
                })
              }
              onCancel={() => message.warning("Batal Dihapus")}
              okText="Ya"
              cancelText="Tidak"
            >
              <Button size="small" danger type="primary">
                Hapus
              </Button>
            </Popconfirm>
            <Button
              size="small"
              style={{ backgroundColor: "#bae637", borderColor: "#bae637" }}
              onClick={() => {
                mappingLayananPemeriksaanLain(listpmrlain.kodeHasil);
                setTanggal(dayjs(listpmrlain.tanggal));
                setkodeHasil(listpmrlain.kodeHasil);
                setPelayanan(listpmrlain.pelayananId);
                settanggalMulai(dayjs(listpmrlain.mulai));
                settanggalSelesai(dayjs(listpmrlain.selesai));
                setPelaksana(listpmrlain.pelaksanaId);
                setHasilPemeriksaan(listpmrlain.hasilPemeriksaan);
                setpenunjangLainId(listpmrlain.noID);
                setRuangPasien(listpmrlain.ruangRawatId);
              }}
            >
              Edit
            </Button>
            <Button
              size="small"
              // style={{ backgroundColor: "#bae637", borderColor: "#bae637" }}
              onClick={() =>
                getPrintPemLain(listpmrlain.kodeHasil, listpmrlain.registrasiId)
              }
            >
              Cetak
            </Button>
          </Space>
        </span>
      ),
    },
  ];

  const datapemeriksaanlain = {
    noID: penunjangLainId,
    registrasiId: curpasRI.registrasiId,
    ruangRawatId: ruangpasien,
    tanggal: dayjs(tanggal).format("YYYY-MM-DDTHH:mm"),
    mulai:
      tanggalMulai === null
        ? null
        : dayjs(tanggalMulai).format("YYYY-MM-DDTHH:mm"),
    selesai:
      tanggalSelesai === null
        ? null
        : dayjs(tanggalSelesai).format("YYYY-MM-DDTHH:mm"),
    ruangId: curpasRI.ruangId,
    kodeHasil: kodehasil,
    pelayananId: pelayanan,
    hasilPemeriksaan: hasilpemeriksaan,
    pelaksanaId:
      pelaksana === null || pelaksana === "" ? curpasRI.dokterId : pelaksana,
    hapus: false,
    userID: petugas,
    clientIP: ip,
    clientHost: host,
  };

  //   const checkFor = ["9111", "9168", "9147", "9150", "9145", "91A0"];
  //   const hasSome = checkFor.includes(ruangasal);
  return (
    <Fragment>
      <Card size="small">
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Tabs defaultActiveKey="1" type="card" size="small">
              <TabPane tab="Penunjang Lain" key="1">
                <Form {...formItemLayout}>
                  <Form.Item labelAlign="left" label="Tanggal">
                    <DatePicker
                      showTime
                      format="DD-MM-YYYY HH:mm"
                      style={{ width: "100%" }}
                      placeholder="..."
                      value={tanggal}
                      onChange={(e) => {
                        setTanggal(e);
                      }}
                    />
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Jenis Periksa">
                    <Select
                      dataSource={listpenunjanglain}
                      showSearch
                      value={kodehasil}
                      style={{ width: "100%" }}
                      placeholder="Pilih Pelayanan"
                      optionFilterProp="children"
                      onChange={(e) => {
                        setkodeHasil(e);
                        mappingLayananPemeriksaanLain(e);
                        setPelayanan("");
                        getRuangMedis();
                      }}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {listpenunjanglain.map((p) => (
                        <Option key={p.hasilPenunjangId}>
                          {p.deskripsiHasilPenunjang}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Pemeriksaan">
                    <Select
                      dataSource={layananpmrlain}
                      showSearch
                      value={pelayanan}
                      style={{ width: "100%" }}
                      placeholder="Pilih Pemeriksaan"
                      optionFilterProp="children"
                      onChange={(e) => setPelayanan(e)}
                      // filterOption={(input, option) =>
                      //   option.props.children
                      //     .toLowerCase()
                      //     .indexOf(input.toLowerCase()) >= 0
                      // }
                    >
                      {layananpmrlain.map((p) => (
                        <Option key={p.pelayananId}>
                          {p.pelayananId} - {p.pelayananDesk}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Ruang Tindakan">
                    <Select
                      onFocus={() => {
                        getRuangMedis();
                      }}
                      dataSource={ruangAll}
                      showSearch
                      value={ruangpasien}
                      style={{ width: "100%" }}
                      // placeholder="Pilih Pemeriksaan"
                      optionFilterProp="children"
                      onChange={(e) => setRuangPasien(e)}
                      // filterOption={(input, option) =>
                      //   option.props.children
                      //     .toLowerCase()
                      //     .indexOf(input.toLowerCase()) >= 0
                      // }
                    >
                      {ruangAll.map((p) => (
                        <Option key={p.ruangId}>{p.deskripsi}</Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Tanggal Mulai">
                    <DatePicker
                      showTime
                      format="DD-MM-YYYY HH:mm"
                      style={{ width: "100%" }}
                      placeholder="..."
                      value={tanggalMulai}
                      onChange={(e) => {
                        settanggalMulai(e);
                      }}
                    />
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Tanggal Selesai">
                    <DatePicker
                      showTime
                      format="DD-MM-YYYY HH:mm"
                      style={{ width: "100%" }}
                      placeholder="..."
                      value={tanggalSelesai}
                      onChange={(e) => {
                        settanggalSelesai(e);
                      }}
                    />
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Pelaksana">
                    <Select
                      dataSource={dokterall}
                      showSearch
                      value={
                        pelaksana === null || pelaksana === ""
                          ? curpasRI.dokterId
                          : pelaksana
                      }
                      style={{ width: "100%" }}
                      placeholder="Pilih Pelaksana"
                      optionFilterProp="children"
                      onChange={(e) => setPelaksana(e)}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {dokterall.map((p) => (
                        <Option key={p.dokterId}>
                          {p.dokterId + " - " + p.namaDokter}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item labelAlign="left" label="Hasil Pemeriksaan">
                    <TextArea
                      rows={8}
                      value={hasilpemeriksaan}
                      onChange={(e) => setHasilPemeriksaan(e.target.value)}
                    />
                  </Form.Item>
                </Form>
                <Row>
                  <Col span={24} style={{ textAlign: "right" }}>
                    <Space>
                      <Button
                        onClick={() => {
                          kosongkanform();
                        }}
                      >
                        Batal
                      </Button>
                      <Button
                        type="primary"
                        onClick={() => {
                          tanggalMulai === null ||
                          tanggalMulai === "" ||
                          tanggalSelesai === null ||
                          tanggalSelesai === ""
                            ? message.warning(
                                "Silahkan Lengkapi Tanggal Mulai Dan Atau Tanggal Selesai!"
                              )
                            : insertPemeriksaanLainRI(datapemeriksaanlain);
                          console.log(datapemeriksaanlain);
                        }}
                      >
                        Simpan
                      </Button>
                    </Space>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="Penunjang Dari Luar" key="2">
                <PenunjangLuar />
              </TabPane>
            </Tabs>
          </Col>

          <Col span={12}>
            <Row>
              <Col span={24} style={{ textAlign: "right" }}>
                <ButtonHistoryTindakan />
              </Col>
              <Col span={24}>
                <Table dataSource={listpmrlain} size="small" columns={column} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        open={modalPemLain}
        onCancel={() => setmodalPemLain(false)}
      >
        <Spin spinning={loadDelay}>
          <Iframe
            onLoad={() => {
              setloadDelay(false);
            }}
            url={printPemLain}
            width="100%"
            height="750px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
            styles={{
              wordWarp: "break-word",
              overflowWrap: "break-word",
            }}
          />
        </Spin>
      </Modal>
    </Fragment>
  );
};

export default FormPenunjangLain;
