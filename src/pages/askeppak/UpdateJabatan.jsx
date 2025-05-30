import React, { useContext, useState } from "react";
import {
  Descriptions,
  Col,
  Input,
  Card,
  Button,
  Table,
  Empty,
  DatePicker,
  Row,
  Space,
  Form,
  Select,
} from "antd";
import { MasterPegawaiContext } from "../master/context/masterpegawai/MasterPegawaiContext";
import dayjs from "dayjs";
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const UpdateJabatan = () => {
  const {
    getpegawaidetail,
    pegawaiDetail,
    pangkatPegawaiId,
    setpangkatPegawaiId,
    pangkatGolonganId,
    setpangkatGolonganId,
    tmtPangkat,
    settmtPangkat,
    tglAkhirPangkat,
    settglAkhirPangkat,
    jabFungId,
    setjabFungId,
    insertPanggolPegawai,
  } = useContext(MasterPegawaiContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datajabatan = {
    pangkatPegawaiId: pangkatPegawaiId,
    pegawaiId: pegawaiDetail.PegawaiId,
    pangkatGolongaId: pangkatGolonganId,
    tmtPangkat: dayjs(tmtPangkat).format("YYYY-MM-DD"),
    noSkPangkat: null,
    tglAkhirPangkat: dayjs(tmtPangkat.add(4, "year")).format("YYYY-MM-DD"),
    masaKerjaPangkat: null,
    jabFungId: jabFungId,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-YYTHH:mm:ss"),
    clientIP: ip,
  };

  return (
    <div>
      <Row>
        <Col span={24}>
          <Form.Item
            {...formItemLayout}
            label="TMT Panggol"
            rules={[{ required: true }]}
            style={{ marginBottom: 5 }}
          >
            <DatePicker
              style={{ width: "100%" }}
              placeholder="Pilih Bulan"
              value={tmtPangkat}
              onChange={(e) => {
                settmtPangkat(e);
              }}
              format="DD-MM-YYYY"
            />
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Pangkat Golongan"
            rules={[{ required: true }]}
            style={{ marginBottom: 5 }}
          >
            <Select
              value={pangkatGolonganId}
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih Pelaksana"
              optionFilterProp="children"
              onChange={(e) => {
                setpangkatGolonganId(e);
                e === 7 || e === 8
                  ? setjabFungId("JFT110")
                  : e === 13 || e === 14 || e === 15 || e === 16
                  ? setjabFungId("JFT58")
                  : setjabFungId("");
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              <Option value={18}>BLUD</Option>
              <Option value={7}>II/c Pengatur</Option>
              <Option value={8}>II/d Pengatur Tingkat I</Option>
              <Option value={9}>III/a Penata Muda</Option>
              <Option value={10}>III/b Penata Muda Tk I</Option>
              <Option value={11}>III/c Penata</Option>
              <Option value={12}>III/d Penata Tingkat I</Option>
              <Option value={13}>IV/a Pembina</Option>
              <Option value={14}>IV/b Pembina Tingkat I</Option>
              <Option value={15}>IV/c Pembina Utama Muda</Option>
              <Option value={16}>IV/d Pembina Utama Madya</Option>
              <Option value={17}>IV/e Pembina Utama</Option>
            </Select>
          </Form.Item>
          <Form.Item
            {...formItemLayout}
            label="Jabatan Fungsional"
            rules={[{ required: true }]}
            style={{ marginBottom: 5 }}
          >
            {pangkatGolonganId === 18 ? (
              <Select
                value={jabFungId}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => {
                  setjabFungId(e);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option key="JFT110">D3 Keperawatan</Option>
                <Option key="JFT118">D4/S1 Keperawatan</Option>
              </Select>
            ) : pangkatGolonganId === 7 || pangkatGolonganId === 8 ? (
              <Select
                value={jabFungId}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => {
                  setjabFungId(e);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option key="JFT110">Terampil</Option>
              </Select>
            ) : pangkatGolonganId === 9 || pangkatGolonganId === 10 ? (
              <Select
                value={jabFungId}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => {
                  setjabFungId(e);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option key="JFT63">Mahir</Option>
                <Option key="JFT118">Ahli Pertama</Option>
              </Select>
            ) : pangkatGolonganId === 11 || pangkatGolonganId === 12 ? (
              <Select
                value={jabFungId}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => {
                  setjabFungId(e);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option key="JFT65">Penyelia</Option>
                <Option key="JFT59">Ahli Muda</Option>
              </Select>
            ) : (
              <Select
                value={jabFungId}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => {
                  setjabFungId(e);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option key="JFT58">Ahli Madya</Option>
              </Select>
            )}
          </Form.Item>
        </Col>
        <Col style={{ textAlign: "right" }} span={24}>
          <Space>
            <Button
              onClick={() => {
                settmtPangkat(dayjs());
                setpangkatGolonganId("");
                setjabFungId("");
                setpangkatPegawaiId(0);
              }}
            >
              Batal
            </Button>
            <Button
              type="primary"
              onClick={() => {
                console.log(datajabatan);
                insertPanggolPegawai(datajabatan);
              }}
            >
              Simpan
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default UpdateJabatan;
