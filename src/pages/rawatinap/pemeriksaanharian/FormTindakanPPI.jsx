/* eslint-disable no-lone-blocks */
import React, { useContext, useEffect, useRef } from "react";
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
import Iframe from "react-iframe";
import Column from "antd/lib/table/Column";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { PerkembanganPasienRIContext } from "../context/PerkembanganPasienRIContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import dayjs from "dayjs";
import { PantuanInfeksiContext } from "../context/PantuanInfeksiContext";
import PageheadRI from "../PageheadRI";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import AlertPPI from "./AlertPPI";
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

const FormTindakanPPI = () => {
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dateFormat = "DD-MM-YYYY HH:mm";
  const { namauser } = useContext(LoginContext);
  const kdPegawai = sessionStorage.getItem("pegawai");
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
    dataalert,
    setdataalert,
  } = useContext(PantuanInfeksiContext);
  // useEffect(() => {
  //   dataalert.map((item) => {
  //     if (item.TglPelepasan === null) {
  //       return;
  //     }
  //   });
  //   return () => {
  //   };
  // }, []);

  const { dokterall } = useContext(PelayananContext);

  const { curpasRI } = useContext(PasienRIContext);

  const dataPemasangan = {
    no: 0,
    registrasiId: curpasRI.registrasiId,
    tindakanId: tindakanIdTPPI,
    ruangPemasanganId: curpasRI.ruangId,
    ruangPelepasanId: null,
    pelaksanaId: curpasRI.dokterId,
    tglPemasangan: dayjs(tglPencatatanTPPI).format("YYYY-MM-DDTHH:mm"),
    tglpencatatan: dayjs().format("YYYY-MM-DDTHH:mm"),
    tglPelepasan: null,
    jenisTindakan: "Pemasangan",
    tglPeringatan:
      tindakanIdTPPI === "INF001"
        ? dayjs(tglPencatatanTPPI).add(2, "days").format("YYYY-MM-DDTHH:mm")
        : tindakanIdTPPI === "INF002"
        ? dayjs(tglPencatatanTPPI).add(2, "days").format("YYYY-MM-DDTHH:mm")
        : tindakanIdTPPI === "INF003"
        ? dayjs(tglPencatatanTPPI).add(3, "days").format("YYYY-MM-DDTHH:mm")
        : tindakanIdTPPI === "INF005"
        ? dayjs(tglPencatatanTPPI).add(2, "days").format("YYYY-MM-DDTHH:mm")
        : dayjs().format("YYYY-MM-DDTHH:mm"),
    status: false,
    infeksi: false,
    userId: namauser,
    clientHost: host,
    clientIP: ip,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
    verified: false,
  };

  return (
    <div>
      <Form.Item style={{ marginBottom: 0 }}>
        <Row>
          <Col span={10}>
            <Row>
              <Col span={24}>
                <Form.Item
                  {...formItemLayout1}
                  label="Tindakan"
                  style={{ marginBottom: 5 }}
                >
                  <Select
                    showSearch
                    style={{ width: "95%" }}
                    placeholder="..."
                    optionFilterProp="children"
                    onChange={(e) => {
                      settindakanIdTPPI(e.split("-").shift());
                    }}
                    value={tindakanIdTPPI}
                    datasource={mstTindakanPPI}
                    onFocus={() => {
                      getMstTindakanPPI("%20");
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {mstTindakanPPI.map((d) => (
                      <Option key={d.tindakanId}>{d.tindakanDeskripsi}</Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Jenis"
                  style={{ marginBottom: 5 }}
                >
                  <Input value="Pemasangan" style={{ width: "95%" }} readOnly />
                </Form.Item>
                <Form.Item
                  {...formItemLayout1}
                  label="Tgl Pemasangan"
                  style={{ marginBottom: 5 }}
                >
                  <DatePicker
                    showTime
                    format="DD-MM-YYYY HH:mm"
                    style={{ width: "95%" }}
                    placeholder="..."
                    value={tglPencatatanTPPI}
                    onChange={(e) => {
                      settglPencatatanTPPI(e);
                    }}
                  />
                </Form.Item>
              </Col>
              <Col
                span={20}
                style={{ textAlign: "right", paddingRight: "10px" }}
              >
                <Button
                  type="primary"
                  onClick={() => {
                    insertTindakanPPI(dataPemasangan);
                  }}
                >
                  Simpan
                </Button>

                {/* <Button
                  type="primary"
                  onClick={() => {
                    setalertPPIPerawat(true);
                  }}
                >
                  modal
                </Button> */}
              </Col>
            </Row>
          </Col>
          <Col span={14}>
            <Table
              bordered
              pagination={false}
              dataSource={listTindakanPPi}
              size="small"
              rowKey="reg"
              scroll={{ x: 700 }}
            >
              <Column
                title="Tgl Pasang"
                key="reg"
                width="20%"
                defaultSortOrder="ascend"
                render={(listTindakanPPi) => (
                  <span>
                    {dayjs(listTindakanPPi.TglPemasangan).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </span>
                )}
              />
              <Column
                title="Tindakan"
                key="reg"
                width="20%"
                defaultSortOrder="ascend"
                render={(listTindakanPPi) => (
                  <span>{listTindakanPPi.TindakanDeskripsi}</span>
                )}
              />
              <Column
                title="Durasi"
                key="waktu"
                width="20%"
                render={(listTindakanPPi) => {
                  const tglPemasangan = dayjs(listTindakanPPi.TglPemasangan);
                  const tglPelepasan = listTindakanPPi.TglPelepasan
                    ? dayjs(listTindakanPPi.TglPelepasan)
                    : null;

                  // Calculate the time difference
                  const now = dayjs();
                  let timeDiffInMinutes;

                  if (!tglPelepasan) {
                    // If TglPelepasan is null or empty
                    timeDiffInMinutes = now.diff(tglPemasangan, "minutes"); // Difference in minutes
                  } else {
                    // If TglPelepasan is valid
                    timeDiffInMinutes = tglPelepasan.diff(
                      tglPemasangan,
                      "minutes"
                    ); // Difference in minutes
                  }

                  // Convert total minutes into hours and minutes
                  const hours = Math.floor(timeDiffInMinutes / 60);
                  const minutes = timeDiffInMinutes % 60;

                  return (
                    <span>
                      {hours} jam {minutes} menit
                    </span>
                  ); // Display the time difference in hours and minutes
                }}
              />
              <Column
                title="Aksi"
                key="reg"
                width="20%"
                defaultSortOrder="ascend"
                render={(listTindakanPPi) => (
                  <span>
                    {listTindakanPPi.TglPelepasan === null ? (
                      <div>
                        <Space>
                          <Popconfirm
                            title="Anda Yakin Akan Dilepas ?"
                            placement="leftTop"
                            description={
                              <div>
                                <DatePicker
                                  showTime
                                  format="DD-MM-YYYY HH:mm"
                                  style={{ width: "95%" }}
                                  placeholder="..."
                                  value={tglPelepasanTPPI}
                                  onChange={(e) => {
                                    settglPelepasanTPPI(e);
                                  }}
                                />
                              </div>
                            }
                            onConfirm={() => {
                              insertTindakanPPI({
                                no: listTindakanPPi.No,
                                registrasiId: curpasRI.registrasiId,
                                tindakanId: listTindakanPPi.TindakanId,
                                ruangPemasanganId:
                                  listTindakanPPi.RuangPemasanganId,
                                ruangPelepasanId: curpasRI.ruangId,
                                pelaksanaId: listTindakanPPi.PelaksanaId,
                                tglPemasangan: listTindakanPPi.TglPemasangan,
                                tglpencatatan: listTindakanPPi.Tglpencatatan,
                                tglPelepasan:
                                  dayjs(tglPelepasanTPPI).format(
                                    "YYYY-MM-DDTHH:mm"
                                  ),
                                jenisTindakan: "Pelepasan",
                                tglPeringatan: listTindakanPPi.TglPeringatan,
                                status: listTindakanPPi.Status,
                                infeksi: listTindakanPPi.Infeksi,
                                userId: namauser,
                                clientHost: host,
                                clientIP: ip,
                                verified: listTindakanPPi.verified,
                              });
                            }}
                            okText="Ya"
                            cancelText="Tidak"
                          >
                            <Button
                              size="small"
                              style={{
                                backgroundColor: "green",
                                color: "white",
                              }}
                            >
                              Lepas
                            </Button>
                          </Popconfirm>
                          <Popconfirm
                            title="Anda Yakin Dihapus ?"
                            onConfirm={() => {
                              deletetindakan(
                                listTindakanPPi.No,
                                listTindakanPPi.RegistrasiId
                              );
                            }}
                            okText="Ya"
                            cancelText="Tidak"
                          >
                            <Button type="primary" size="small" danger>
                              Hapus
                            </Button>
                          </Popconfirm>
                        </Space>
                      </div>
                    ) : (
                      dayjs(listTindakanPPi.TglPelepasan).format(
                        "DD-MM-YYYY HH:mm"
                      )
                    )}
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Form.Item>

      <Modal
        open={alertPPIPerawat}
        onCancel={() => setalertPPIPerawat(false)}
        closable={false}
        footer={null}
        width="70%"
        style={{ top: 20 }}
      >
        <AlertPPI />
      </Modal>
    </div>
  );
};

export default FormTindakanPPI;
