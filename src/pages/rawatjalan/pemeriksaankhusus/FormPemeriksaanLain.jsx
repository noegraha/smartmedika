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
  Tabs,
  Image,
} from "antd";
import Iframe from "react-iframe";
import React, { Fragment, useContext, useState } from "react";
import { PasienContext } from "../context/PasienContext";
import { PemeriksaanLainContext } from "../context/pemeriksaancontext/PemeriksaanLainContext";
import dayjs from "dayjs";
import { PelayananContext } from "../context/Pelayanancontext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import ButtonUploadFile from "./ButtonUploadFile";
import { DeleteTwoTone, PrinterTwoTone } from "@ant-design/icons";
import { LoginContext } from "../context";

const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const FormPemeriksaanLain = () => {
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
    pelayanan,
    setPelayanan,
    deletePemeriksaanLain,
    mappingLayananPemeriksaanLainByRuang,
  } = useContext(PemeriksaanLainContext);
  const {
    printPemLain,
    modalPemLain,
    setmodalPemLain,
    getPrintPemLain,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);
  const { curpas, ruangasal } = useContext(PasienContext);
  const { dokterall } = useContext(PelayananContext);
  const { host } = useContext(LoginContext);
  const petugas = sessionStorage.getItem("userId");
  const ip = sessionStorage.getItem("IP");
  const hostname = sessionStorage.getItem("Host");
  const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);
  const scaleStep = 0.3;

  const column = [
    {
      title: "Pemeriksaan",
      dataIndex: "deskripsiHasilPenunjang",
      key: "pemeriksaan",
      ellipsis: true,
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
      ellipsis: true,
    },
    {
      title: "Hasil Pemeriksaan",
      dataIndex: "hasilPemeriksaan",
      key: "hasil",
      ellipsis: true,
    },
    {
      title: "Link",
      render: (text, record) =>
        record.url.map((d, idx) => (
          <div key={idx} style={{ marginBottom: 8 }}>
            <Button
              size="small"
              onClick={() => {
                if (
                  host === "smart.rsmargono.id" ||
                  host === "smart.rsmargono.my.id"
                ) {
                  const imageUrl = "http://182.168.2.248:82/" + d.url;
                  window.open(imageUrl, "_blank");
                } else {
                  setVisible(true);
                  setImage("http://182.168.2.248:82/" + d.url);
                }
              }}
            >
              Gambar {idx + 1}
            </Button>

            <Image
              style={{
                display: "none",
              }}
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
        )),
    },
    {
      title: "Action",
      render: (listpmrlain) => (
        <span>
          <Space>
            <Popconfirm
              title="Anda Yakin Dihapus ?"
              onConfirm={(e) =>
                deletePemeriksaanLain(
                  listpmrlain.registrasiId,
                  listpmrlain.kodeHasil
                )
              }
              onCancel={() => message.warning("Batal Dihapus")}
              okText="Ya"
              cancelText="Tidak"
            >
              <Button
                size="small"
                type="text"
                shape="circle"
                icon={<DeleteTwoTone twoToneColor="#f5222d" />}
              />
            </Popconfirm>
            <Button
              size="small"
              type="text"
              shape="circle"
              onClick={() =>
                getPrintPemLain(listpmrlain.kodeHasil, listpmrlain.registrasiId)
              }
              icon={<PrinterTwoTone twoToneColor="#52c41a" />}
            />
          </Space>
        </span>
      ),
    },
  ];
  const datapemeriksaanlain = {
    registrasiId: curpas.registrasiId,
    tanggal: dayjs(),
    ruangId: ruangasal,
    kodeHasil: kodehasil,
    pelayananId: pelayanan,
    hasilPemeriksaan: hasilpemeriksaan,
    pelaksanaId:
      pelaksana === null
        ? curpas.ruangKonsul !== null
          ? null
          : curpas.dokterId
        : pelaksana,
    hapus: false,
    userID: petugas,
    clientIP: ip,
    clientHost: hostname,
  };
  const checkFor = ["9111", "9168", "9147", "9150", "9145", "91A0"];
  const hasSome = checkFor.includes(ruangasal);
  const onChange = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: "Tindakan Poli",
      children: (
        <div>
          <Form {...formItemLayout}>
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
                  mappingLayananPemeriksaanLainByRuang(e, ruangasal);
                  setPelayanan("");
                  if (hasSome) {
                    if (e === "40" || e === "41") {
                      setHasilPemeriksaan(
                        `Telinga Kanan : \nTelinga Kiri : \n\nKesimpulan : `
                      );
                    } else if (e === "42") {
                      setHasilPemeriksaan(`Kanan : \nKiri : \n\nKesimpulan : `);
                    }
                  } else {
                    setHasilPemeriksaan("");
                  }
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
              >
                {layananpmrlain.map((p) => (
                  <Option key={p.pelayananId}>
                    {p.pelayananId} - {p.pelayananDesk}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item labelAlign="left" label="Pelaksana">
              <Select
                dataSource={dokterall}
                showSearch
                value={
                  pelaksana === null
                    ? curpas.ruangKonsul !== null
                      ? null
                      : curpas.dokterId
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
              <Button
                type="primary"
                onClick={() => {
                  pelaksana === null
                    ? curpas.ruangKonsul !== null
                      ? message.warning("Pelaksana Masih Kosong!")
                      : insertPemeriksaanLain(datapemeriksaanlain)
                    : insertPemeriksaanLain(datapemeriksaanlain);
                }}
                disabled={
                  dayjs().format("DD-MM-YYYY") === curpas.tanggalMasuk
                    ? false
                    : true
                }
              >
                Simpan
              </Button>
            </Col>
          </Row>
        </div>
      ),
    },
    {
      key: "2",
      label: "Upload Penunjang Dari Luar",
      children: <ButtonUploadFile />,
    },
  ];
  return (
    <Fragment>
      <Card size="small">
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Tabs
              size="small"
              type="card"
              defaultActiveKey="1"
              items={items}
              onChange={onChange}
            />
          </Col>
          <Col span={12}>
            <Card size="small" title="Daftar Tindakan dan Upload Hari Ini">
              <Table
                dataSource={listpmrlain}
                size="small"
                columns={column}
                scroll={{ x: "max-content" }}
                pagination={{
                  pageSize: 5,
                  position: ["bottomCenter"],
                }}
              />
            </Card>
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

export default FormPemeriksaanLain;
