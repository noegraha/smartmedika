/* eslint-disable no-lone-blocks */
import React, { useContext, useRef } from "react";
import {
  Form,
  Row,
  Col,
  Button,
  Input,
  Select,
  Popconfirm,
  message,
  Card,
  Tabs,
  Space,
  DatePicker,
  Empty,
  Modal,
  Table,
  Radio,
  Divider,
  Alert,
  Tooltip,
  Tag,
} from "antd";
import {
  EditOutlined,
  CheckSquareOutlined,
  EditTwoTone,
  CheckSquareTwoTone,
} from "@ant-design/icons";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import { PasienRIContext } from "../context/PasienRIContext";
import dayjs from "dayjs";
import { PantuanInfeksiContext } from "../context/PantuanInfeksiContext";
const { TextArea } = Input;
const { TabPane } = Tabs;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const formItemLayout1 = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const AlertPPI = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { namauser } = useContext(LoginContext);
  const {
    getTindakaknPPI,
    PantuanInfeksiRi,
    getMstTindakanPPI,
    getMstIndikatorInfeksi,
    inserValidasiPPi,
    insertTindakanPPI,
    deletetindakan,
    pantuaninfeksi,
    setPantuanInfeksi,
    listTindakanPPi,
    setlistTindakanPPi,
    noUrutTPPI,
    setnoUrutTPPI,
    tglPencatatanTPPI,
    settglPencatatanTPPI,
    tglPelepasanTPPI,
    settglPelepasanTPPI,
    tindakanIdTPPI,
    settindakanIdTPPI,
    jenisTindakanTPPI,
    setjenisTindakanTPPI,
    loadingPPI,
    setloadingPPI,
    alertPPIPerawat,
    setalertPPIPerawat,
    mstTindakanPPI,
    setmstTindakanPPI,
    mstIndikatorInfeksi,
    setmstIndikatorInfeksi,

    noUrut,
    setnoUrut,
    tglPelepasan,
    settglPelepasan,
    pasang,
    setpasang,
    jenisTindakan,
    setjenisTindakan,
    infeksi,
    setinfeksi,
    keterangan,
    setketerangan,
    indikatorId,
    setindikatorId,
    insertPPI,
    dataalert,
    setdataalert,
  } = useContext(PantuanInfeksiContext);
  const { curpasRI } = useContext(PasienRIContext);

  return (
    <div>
      <Card size="small">
        <Row>
          <Col span={24}>
            <Alert
              message={
                "Pasien ini telah dilakukan pemasangan " +
                dataalert.TindakanDeskripsi +
                ", pada tanggal " +
                dayjs(dataalert.TglPemasangan).format("DD-MM-YYYY") +
                " Lakukan Pantauan tindakan keperawatan"
              }
              type="warning"
              showIcon
            />
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout1}
              label="Tindakan"
              style={{ marginBottom: 5 }}
            >
              <Input value={dataalert.TindakanDeskripsi} readOnly />
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="Jenis"
              style={{ marginBottom: 5 }}
            >
              <Select
                value={jenisTindakan}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                onChange={(e) => {
                  setjenisTindakan(e);
                }}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                <Option value="Penggantian">Penggantian</Option>
                <Option value="Pelepasan">Pelepasan</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              {...formItemLayout1}
              label="Tanggal"
              style={{ marginBottom: 5 }}
            >
              <DatePicker
                showTime
                format="DD-MM-YYYY HH:mm"
                style={{ width: "100%" }}
                placeholder="..."
                value={tglPelepasan}
                onChange={(e) => {
                  settglPelepasan(e);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout1}
              label="Keterangan"
              style={{ marginBottom: 5 }}
            >
              <TextArea
                value={keterangan}
                rows={2}
                placeholder="..."
                onChange={(e) => {
                  setketerangan(e.target.value);
                }}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item
              {...formItemLayout}
              label="Ciri Infeksi"
              style={{ marginBottom: 5 }}
            >
              <Select
                onFocus={() => {
                  getMstIndikatorInfeksi(dataalert.TindakanId);
                }}
                style={{ width: "100%", maxWidth: "78vw" }}
                mode="multiple"
                allowClear
                showSearch
                source={mstIndikatorInfeksi}
                onChange={(e) => {
                  setindikatorId(e);
                }}
                tokenSeparators={[","]}
                placeholder="..."
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {mstIndikatorInfeksi.map((b) => (
                  <Option key={b.indikatorId}>{b.indikatorDeskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Card>

      <Card size="small">
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button
              type="primary"
              onClick={() => {
                const gjlbaru = [];
                for (var i = 0; i < indikatorId.length; i++) {
                  gjlbaru.push({
                    nomor: 0,
                    registrasiId: curpasRI.registrasiId,
                    indikatorId: indikatorId[i],
                    tindakanId: dataalert.TindakanId,
                  });
                }
                indikatorId === [] ||
                indikatorId === null ||
                indikatorId === "" ||
                indikatorId === undefined
                  ? setalertPPIPerawat(false)
                  : insertPPI(
                      {
                        infeksi: {
                          noUrut: 0,
                          registrasiId: curpasRI.registrasiId,
                          ruangId: curpasRI.ruangId,
                          tanggal: dayjs().format("YYYY-MM-DDTHH:mm"),
                          tglPelepasan:
                            dayjs(tglPelepasan).format("YYYY-MM-DDTHH:mm"),
                          tindakanId: dataalert.TindakanId,
                          pasang:
                            jenisTindakan === "Penggantian" ? false : true,
                          jam: dayjs(tglPelepasan).format("YYYY-MM-DDTHH:mm"),
                          namaTindakan: dataalert.TindakanId,
                          jenisTindakan: jenisTindakan,
                          pelaksanaId: curpasRI.dokterId,
                          infeksi: false,
                          keterangan: keterangan,
                          tanggalPeringatan: dayjs(
                            dataalert.TglPeringatan
                          ).format("YYYY-MM-DDTHH:mm"),
                          status: true,
                          userId: namauser,
                          hapus: false,
                          verified: false,
                          statusKirim: false,
                          dateEntry: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
                          clientHost: host,
                          clientIp: ip,
                          noPMR: dataalert.No,
                        },
                        detailIndikator: gjlbaru,
                      },
                      {
                        no: dataalert.No,
                        registrasiId: curpasRI.registrasiId,
                        tindakanId: dataalert.TindakanId,
                        ruangPemasanganId: dataalert.RuangPemasanganId,
                        ruangPelepasanId: dataalert.RuangPelepasanId,
                        pelaksanaId: dataalert.PelaksanaId,
                        tglPemasangan: dataalert.TglPemasangan,
                        tglpencatatan: dataalert.Tglpencatatan,
                        tglPelepasan: dataalert.TglPelepasan,
                        jenisTindakan: dataalert.JenisTindakan,
                        tglPeringatan: dataalert.TglPeringatan,
                        status: true,
                        infeksi: dataalert.Infeksi,
                        userId: dataalert.UserId,
                        clientHost: host,
                        clientIP: ip,
                        dateEntry: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
                        verified: dataalert.verified,
                      }
                    );
              }}
            >
              Simpan
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default AlertPPI;
