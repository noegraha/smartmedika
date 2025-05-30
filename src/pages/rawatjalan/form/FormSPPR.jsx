import {
  Button,
  Card,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Space,
  Modal,
  Spin,
  Watermark,
} from "antd";
import Iframe from "react-iframe";
import React, { useContext, useEffect, useState } from "react";
import { CatatanmedisContext } from "../context/CatatanmedisContext";
import { PasienContext } from "../context/PasienContext";
import { SuratKeteranganRJContext } from "../context/SuratKeteranganRJContext";
import { VClaimContext } from "../context/VClaimContext";
import dayjs from "dayjs";
import { CloudDownloadOutlined } from "@ant-design/icons";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
const { TextArea } = Input;
const { Option } = Select;
const FormSPPR = () => {
  const { getSPPR, printSPPR, loadDelay, setloadDelay } =
    useContext(PrintOutContext);
  const { curpas, poli } = useContext(PasienContext);
  const {
    listpolibpjs,
    loadingdokter,
    ambilDokterBPJS,
    loadingpoli,
    setLoadingPoli,
    dokterBPJS,
    getMappingPoliBPJS,
    poliget,
    setPoli,
    setLoadingDokter,
    datappk,
  } = useContext(VClaimContext);
  const { planning } = useContext(CatatanmedisContext);
  const { insertSuketRJ, datasurat } = useContext(SuratKeteranganRJContext);
  const [catatan, setCatatan] = useState(null);
  const [polibpjs, setPolibpjs] = useState(null);
  const [dokterbpjs, setDokterbpjs] = useState(null);
  const [tanggal, setTanggal] = useState(null);
  const [diagnosa, setDiagnosa] = useState(null);
  const [terapi, setTerapi] = useState(null);
  const [modalSPPR, setmodalSPPR] = useState(false);
  const host = sessionStorage.getItem("Host");
  const [day, month, year] = curpas.tanggalMasuk.split("-");

  const datasuket = {
    registrasiId: curpas.registrasiId,
    jenisKeterangan: "3",
    tglKeterangan: [year, month, day].join("-"),
    namaPasien: curpas.namaPasien,
    umur: curpas.umur,
    alamat: curpas.alamat,
    tglMasuk: [year, month, day].join("-"),
    tanggal: tanggal,
    dokterPenanggungJawab: curpas.dokterId,
    rujukanDari: datappk.nmProvider,
    diagnosa: diagnosa,
    catatan: catatan,
    poliBPJS: polibpjs,
    sarana: "-",
    clientHost: host,
  };

  useEffect(() => {
    setTerapi(planning);
  }, [planning]);

  return (
    <div>
      <Card
        title="Surat Pengantar Permintaan Rujukan"
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "lightblue" }}
        style={{
          marginTop: 10,
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Form {...formItemLayout} onFinish={() => insertSuketRJ(datasuket)}>
          <Form.Item label="Nama Pasien" style={{ marginBottom: 0 }}>
            {curpas.namaPasien}
          </Form.Item>
          <Form.Item label="Faskes (PPK) 1" style={{ marginBottom: 0 }}>
            {datappk.kdProvider + " - " + datappk.nmProvider}
          </Form.Item>
          <Form.Item label="Dokter" style={{ marginBottom: 0 }}>
            {curpas.namaDpjp}
          </Form.Item>
          <Form.Item label="Diagnosa" style={{ marginBottom: 0 }}>
            <Input
              value={diagnosa}
              onChange={(e) => setDiagnosa(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Terapi" style={{ marginBottom: 0 }}>
            <TextArea
              value={terapi}
              onChange={(e) => setTerapi(e.target.value)}
            />
          </Form.Item>
          <Divider orientation="left">Data Rujukan</Divider>
          <Form.Item label="Tanggal Periksa" style={{ marginBottom: 0 }}>
            <DatePicker
              onChange={(date, dateString) => setTanggal(dateString)}
            />
          </Form.Item>
          <Form.Item label="Poli RSMS" style={{ marginBottom: 0 }}>
            <Select
              autoFocus={true}
              value={poliget}
              dataSource={poli}
              showSearch
              style={{ width: "100%" }}
              placeholder="Pilih ruang..."
              optionFilterProp="children"
              onChange={(e) => {
                setPoli(e);
                getMappingPoliBPJS(e.split("-").shift());
                setPolibpjs(null);
                setDokterbpjs(null);
              }}
              filterOption={(input, option) =>
                option.props.children
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {poli.map((d) => (
                <Option
                  key={d.ruangId + "-" + d.deskripsi}
                  className={
                    d.deskripsi.includes("ABIYASA") ? "backgroundaby" : ""
                  }
                >
                  {d.deskripsi}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Poli / Sarana BPJS" style={{ marginBottom: 0 }}>
            <Input.Group compact>
              <Select
                loading={loadingpoli}
                dataSource={listpolibpjs}
                // value={polibpjs}
                showSearch
                style={{ width: "calc(100% - 55px)" }}
                placeholder="Pilih Poli"
                optionFilterProp="children"
                onChange={(e) => {
                  setPolibpjs(e.split("-").pop());
                  ambilDokterBPJS(
                    e.split("-").shift(),
                    dayjs(tanggal).format("YYYY-MM-DD")
                  );
                  setLoadingDokter(true);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {listpolibpjs.map((p) => (
                  <Option key={p.kodeBpjs + "-" + p.ruangDeskripsiBPJS}>
                    {p.kodeBpjs} - {p.ruangDeskripsiBPJS}
                  </Option>
                ))}
              </Select>
              <Button
                loading={loadingpoli}
                type="primary"
                onClick={() => {
                  getMappingPoliBPJS(poliget);
                  setLoadingPoli(true);
                }}
              >
                <CloudDownloadOutlined />
              </Button>
            </Input.Group>
          </Form.Item>
          <Form.Item label="Dokter Rencana Kontrol" style={{ marginBottom: 0 }}>
            <Input.Group compact>
              <Select
                loading={loadingdokter}
                dataSource={dokterBPJS}
                value={dokterbpjs}
                showSearch
                style={{ width: "calc(100% - 55px)" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => {
                  setDokterbpjs(e);
                }}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {dokterBPJS.map((p) => (
                  <Option key={p.kodeDokter + "-" + p.jadwalPraktek}>
                    {p.kodeDokter} - {p.namaDokter} - {p.jadwalPraktek}
                  </Option>
                ))}
              </Select>
              <Button
                loading={loadingdokter}
                type="primary"
                onClick={() => {
                  ambilDokterBPJS(
                    polibpjs,
                    dayjs(tanggal).format("YYYY-MM-DD")
                  );
                  setLoadingDokter(true);
                }}
              >
                <CloudDownloadOutlined />
              </Button>
            </Input.Group>
          </Form.Item>
          <Form.Item label="Catatan" style={{ marginBottom: 0 }}>
            <TextArea
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />
          </Form.Item>
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                {datasurat !== null ? (
                  <Button
                    type="primary"
                    style={{
                      backgroundColor: "#95de64",
                      borderColor: "#95de64",
                    }}
                    onClick={() => {
                      setmodalSPPR(true);
                      getSPPR(curpas.pasienId, curpas.registrasiId);
                    }}
                  >
                    Cetak
                  </Button>
                ) : (
                  <></>
                )}
                <Button type="primary" htmlType="submit">
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </Card>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        open={modalSPPR}
        onCancel={() => setmodalSPPR(false)}
      >
        <Watermark content="Masih Dalam Percobaan">
          <Spin spinning={loadDelay}>
            <Iframe
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printSPPR}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          </Spin>
        </Watermark>
      </Modal>
    </div>
  );
};

export default FormSPPR;
