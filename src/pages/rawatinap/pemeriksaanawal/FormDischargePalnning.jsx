import React, { useContext, useState } from "react";
import dayjs from "dayjs";
import {
  Form,
  Row,
  Col,
  Input,
  Select,
  Card,
  Space,
  Button,
  Checkbox,
  Table,
  Modal,
  Divider,
  message,
} from "antd";
import Iframe from "react-iframe";
import { DischargePlanningContext } from "../context/DischargePlanningContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { DiagnosaContext } from "../../rawatjalan/context/Diagnosacontext";
import { LoginContext } from "../../rawatjalan/context";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { DiagnosaRIContext } from "../context/DiagnosaRIContext";
const { Column } = Table;

const formItemLayoutFull = {
  labelCol: { span: 3 },
  wrapperCol: { span: 21 },
};

const formItemLayoutFull1 = {
  labelCol: { span: 10 },
  wrapperCol: { span: 14 },
};
const { Option } = Select;

const FormDischargePalnning = () => {
  const { getPrintRM11 } = useContext(PrintOutContext);
  const {
    lamarawat,
    setLamarawat,
    dischargeplann,
    diagnosadp,
    setdiagnosadp,
    risikoKepulangan,
    setrisikoKepulangan,
    setDischargePlann,
    dataDp,
    setdataDp,
    dataRM11,
    setdataRM11,
    insertRM11,
    spinRM11,
    setspinRM11,
    perawat,
    setperawat,
    getPerawat,
    listperawat,
    setlistperawat,
    kosongkarm11,
  } = useContext(DischargePlanningContext);
  const { diagnosa, setDiagnosa } = useContext(DiagnosaRIContext);
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser, pegawai } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const tglmasuk1 = dayjs(curpasRI.tanggalMasuk, "DD-MM-YYYY");
  const tglpulang = tglmasuk1
    .add(lamarawat === null ? 0 : lamarawat, "days")
    .format("DD-MM-YYYY");

  const datasimpanDp = {
    registrasiId: curpasRI.registrasiId,
    diagnosisId: diagnosadp,
    lamaRawat: lamarawat.toString(),
    indikasi: dataDp.length === 0 ? false : true,
    ruangId: curpasRI.ruangId,
    tanggalKajian: dayjs().format("YYYY-MM-DDTHH:mm"),
    jamKajian: dayjs().format("YYYY-MM-DDTHH:mm"),
    tanggalPulang: tglmasuk1
      .add(lamarawat === null ? 0 : lamarawat, "days")
      .format("YYYY-MM-DD"),
    dokterId: curpasRI.dokterId,
    perawatId: perawat,
    alasan: null,
    diagnosisIdMasuk: diagnosadp,
    userId: namauser,
    clientHost: host,
    clientIP: ip,
    listDIndikasi: dataDp,
    listDetailRM11: dataRM11,
  };

  return (
    <div>
      <Card
        // title='Rencana Pulang'
        // loading={spinRM11}
        size="small"
        //  headStyle={{ fontWeight: "bolder", backgroundColor: 'beige' }}
        //     style={{
        //         borderWidth: "2px",
        //         borderColor: "darkgray",
        //         borderRadius: "4px",
        //     }}
      >
        <Card>
          <Row>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull}
                label="Diagnosa Medis"
                style={{ marginBottom: 5 }}
              >
                <Select
                  onChange={(e) => {
                    setdiagnosadp(e);
                    const newData = [...dataRM11];
                    for (var j = 0; j < newData.length; j++) {
                      newData[j]["diagnosisId"] = e;
                    }
                    setdataRM11(newData);
                    console.log(newData);
                  }}
                  value={diagnosadp}
                  dataSource={diagnosa}
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
                  {diagnosa.map((d) => (
                    <Option key={d.diagnosisId}>
                      {d.diagnosisId + "-" + d.deskripsi}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Space>
                <Form.Item
                  {...formItemLayoutFull1}
                  label="Lama Rawat"
                  style={{ marginBottom: 5 }}
                >
                  <Input
                    type="number"
                    onChange={(e) => {
                      setLamarawat(e.target.value);
                    }}
                    value={lamarawat}
                    suffix="Hari"
                    style={{ width: "100%" }}
                    placeholder="..."
                    min={1}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayoutFull1}
                  label="Tgl Masuk"
                  style={{ marginBottom: 5 }}
                >
                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    value={curpasRI.tanggalMasuk}
                    disabled
                    placeholder="..."
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayoutFull1}
                  label="Tgl Pulang"
                  style={{ marginBottom: 5 }}
                >
                  <Input
                    type="text"
                    style={{ width: "100%" }}
                    value={tglpulang}
                    disabled
                    placeholder="..."
                  />
                </Form.Item>
              </Space>
            </Col>
            <Col span={24}>
              <Form.Item
                {...formItemLayoutFull}
                label="Perawat"
                style={{ marginBottom: 5 }}
              >
                <Select
                  onFocus={() => {
                    getPerawat();
                  }}
                  onChange={(e) => {
                    setperawat(e);
                  }}
                  value={perawat}
                  dataSource={listperawat}
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
                  {listperawat.map((d) => (
                    <Option key={d.dokterId}>{d.namaDokter}</Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
        </Card>

        <Row gutter={[10, 10]}>
          <Col span={10}>
            <Divider orientation="left" size="small">
              Indikasi Di Rawat
            </Divider>
            <Table
              rowKey="NoUrut"
              dataSource={dischargeplann}
              bordered
              pagination={false}
              size="small"
            >
              <Column
                title="No."
                className="bgcolortunggu"
                width="5%"
                render={(text, record, index) => <span>{index + 1}</span>}
              />
              <Column
                width="45%"
                dataIndex="deskripsi"
                title="Discharge Planning"
              />
              <Column
                align="center"
                width="10%"
                dataIndex="flag"
                title="Y/T"
                render={(text, record, index) => (
                  <span>
                    <Checkbox
                      checked={text}
                      // onChange={onInputChangeflagDP("flag", index)}
                      onChange={(e) => {
                        const newData = [...dischargeplann];
                        newData[index]["flag"] = e.target.checked;
                        setDischargePlann(newData);
                        console.log(newData);

                        const dpBaru = [];
                        for (var i = 0; i < dischargeplann.length; i++) {
                          if (dischargeplann[i].flag === true) {
                            dpBaru.push({
                              registrasiId: curpasRI.registrasiId,
                              dPlanningId: dischargeplann[i].dPlanningId,
                              clientHost: host,
                              clientIP: ip,
                            });
                          }
                        }
                        setdataDp(dpBaru);
                        console.log(dpBaru);
                      }}
                    ></Checkbox>
                  </span>
                )}
              />
            </Table>
          </Col>
          <Col span={14}>
            <Divider orientation="left" size="small">
              Skrining Faktor Risiko Pasien Pulang
            </Divider>
            <Table
              rowKey="NoUrut"
              dataSource={risikoKepulangan}
              bordered
              pagination={false}
              size="small"
            >
              <Column
                title="No."
                className="bgcolortunggu"
                width="5%"
                render={(text, record, index) => <span>{index + 1}</span>}
              />
              <Column width="45%" dataIndex="deskripsi" title="Faktor Risiko" />
              <Column
                align="center"
                width="15%"
                dataIndex="flag"
                title="Y/T"
                render={(text, record, index) => (
                  <span>
                    {record.statusCek === "TW" ? (
                      <Select
                        // dataSource={dokterall}
                        value={text}
                        showSearch
                        style={{ width: "100%" }}
                        placeholder="Pilih Pelaksana"
                        optionFilterProp="children"
                        onChange={(e) => {
                          const newData = [...risikoKepulangan];
                          newData[index]["flag"] = e;
                          setrisikoKepulangan(newData);
                          console.log(newData);

                          const newData1 = [...dataRM11];
                          newData1[index]["flag"] = e;
                          setdataRM11(newData1);
                          console.log(newData1);
                        }}
                        filterOption={(input, option) =>
                          option.props.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        <Option key="R">Rumah</Option>
                        <Option key="K">Kost</Option>
                        <Option key="L">Lain</Option>
                      </Select>
                    ) : (
                      <Checkbox
                        checked={text}
                        onChange={(e) => {
                          const newData = [...risikoKepulangan];
                          newData[index]["flag"] = e.target.checked;
                          setrisikoKepulangan(newData);
                          console.log(newData);

                          const newData1 = [...dataRM11];
                          newData1[index]["flag"] =
                            e.target.checked === true ? "Y" : "T";
                          setdataRM11(newData1);
                          console.log(newData1);
                        }}
                      ></Checkbox>
                    )}
                  </span>
                )}
              />
              <Column
                dataIndex="catatan"
                width="40%"
                title="Planning"
                render={(text, record, index) => (
                  <span>
                    <Input
                      type="text"
                      style={{ width: "100%" }}
                      value={text}
                      maxLength={80}
                      onChange={(e) => {
                        const newData = [...risikoKepulangan];
                        newData[index]["catatan"] = e.target.value;
                        setrisikoKepulangan(newData);
                        console.log(newData);

                        const newData1 = [...dataRM11];
                        newData1[index]["catatan"] = e.target.value;
                        setdataRM11(newData1);
                        console.log(newData1);
                      }}
                    />
                  </span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Card>
      <Card>
        <Row>
          <Col span={12}>
            <Space>
              <Button
                onClick={() => {
                  getPrintRM11(curpasRI.registrasiId);
                }}
              >
                Cetak
              </Button>
            </Space>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  kosongkarm11(curpasRI.registrasiId);
                }}
              >
                Batal
              </Button>
              <Button
                type="primary"
                onClick={() => {
                  setspinRM11(true);
                  console.log(datasimpanDp);
                  diagnosadp === null ||
                  diagnosadp === "" ||
                  diagnosadp.length === 0
                    ? message.warning("Silahkan Pilih Diagnosa Pasien!")
                    : lamarawat === null || lamarawat === ""
                    ? message.warning("Silahkan Isi Lama Rawat Pasien!")
                    : insertRM11(datasimpanDp);
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default FormDischargePalnning;
