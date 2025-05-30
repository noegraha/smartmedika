import React, { useState, Fragment, useContext } from "react";
import {
  Layout,
  Table,
  Card,
  Space,
  Form,
  InputNumber,
  Input,
  Divider,
  Row,
  Col,
  Radio,
  Button,
  Modal,
  Popconfirm,
  message,
  Select,
  Alert,
} from "antd";
import Iframe from "react-iframe";

import Column from "antd/lib/table/Column";
import { GiziAsuhanContext } from "./context/AsuhanGiziContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "../../rawatinap/context/PasienRIContext";
import dayjs from "dayjs";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { Sider, Content } = Layout;
const { Option } = Select;

const FormScreeningGiziDewasa = () => {
  const { dokterall } = useContext(PelayananContext);
  const { namauser } = useContext(LoginContext);
  const { ruang, curpasRI } = useContext(PasienRIContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const kodeDokter = sessionStorage.getItem("pegawai");

  const {
    detailpasien,
    dokter,
    insertGizi,
    giziscreening,
    detailListScreening,
    listscreening,
    detailScreening,
    deletescreening,
    setLila,
    settinggiBadan,
    setberatBadan,
    setscreeningId,
    screeningId,
    resetformscreening,
    halamanprintscreening,
    beratBadan,
    tinggiBadan,
    setPertanyaan1,
    setPertanyaan2,
    setPertanyaan3,
    setPertanyaan4,
    lila,
    pertanyaan1,
    pertanyaan2,
    pertanyaan3,
    pertanyaan4,
    fisik,
    ttvLast,
    setttvLast,
    getLastTTV,
    visibledewasa,
    setVisibledewasa,
    tanggalScreening,
    settanggalScreening,
  } = useContext(GiziAsuhanContext);
  const {
    printEvalGizi,
    setprintEvalGizi,
    printAsuhGizi,
    setprintAsuhGizi,
    printScrenGizi,
    setprintScrenGizi,
    printScrenGiziPYMS,
    setprintScrenGiziPYMS,
    getPrintTerimaPasien,
    getPrintAnamnesa,
    getPrintfisikRI,
    getPrintKonsulRI,
    getPrintCPPTRI,
    getPrintRM11,
    getPrintEvalGizi,
    getPrintAsuhGizi,
    getPrintScrenGizi,
    getPrintScrenGiziPYMS,
    modalprintGizi,
    setmodalprintGizi,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);

  const datagizi = {
    screeningId: screeningId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tanggalScreening).format("YYYY-MM-DDTHH:mm"),
    anak: false,
    beratBadan: beratBadan,
    tinggiBadan: tinggiBadan,
    lila: lila === "" ? null : lila,
    bb_U: null,
    pb_U: null,
    tb_U: null,
    bb_Pb: null,
    bb_Tb: null,
    imt_U: null,
    pertanyaan1: pertanyaan1,
    pertanyaan2: pertanyaan2,
    pertanyaan3: pertanyaan3,
    pertanyaan4: null,
    ahliGizi: kodeDokter,
    userId: namauser,
    status: true,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientIp: ip,
  };

  const Totaldewasa =
    parseInt(pertanyaan1) + parseInt(pertanyaan2) + parseInt(pertanyaan3);

  const IMT = (beratBadan / Math.pow(tinggiBadan / 100, 2)).toFixed(2);
  const KeteranganImt =
    IMT < 18.5
      ? "Berat Badan Kurang (Underweight)"
      : IMT >= 18.5 && IMT <= 22.9
      ? "Berat Badan Normal"
      : IMT >= 23 && IMT <= 24.9
      ? "Kelebihan Berat Badan (Overweight) Dengan Resiko"
      : IMT >= 25 && IMT <= 29.9
      ? "Obesitas I"
      : IMT >= 30
      ? "Obesitas II"
      : "-";

  return (
    <div>
      {/* <Row gutter={[8, 8]}>
            <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Item label="BB (Kg)" style={{ fontWeight: "bold" }}>
                <Input
                  type="text"
                  disabled
                  style={{ width: "50%" }}
                  min={0.1}
                  step={0.1}
                  placeholder="..."
                  value={beratBadan == "" ? fisik.beratBadan : beratBadan}
                  onChange={(e) => onBerat(e)}
                />
              </Form.Item>
            </Col>
            <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Item label="TB (Cm)" style={{ fontWeight: "bold" }}>
                <Input
                  type="text"
                  disabled
                  style={{ width: "50%" }}
                  placeholder="..."
                  value={tinggiBadan == "" ? fisik.tinggiBadan : tinggiBadan}
                  onChange={(e) => onTinggi(e)}
                />
              </Form.Item>
            </Col>
            <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Item label="LILA (Cm)" style={{ fontWeight: "bold" }}>
                <InputNumber
                  style={{ width: "50%" }}
                  placeholder="..."
                  value={lila}
                  onChange={(e) => onLila(e)}
                />
              </Form.Item>
            </Col>
            <Col span={6} xs={12} sm={12} md={6} lg={6} xl={6}>
              <Form.Item label="IMT (Kg/M2)">
                <Input
                  style={{ width: "50%" }}
                  value={IMT}
                  placeholder="..."
                  disabled
                />
                <p>
                  <strong style={{ fontWeight: "900", color: "black" }}>
                    (
                    {IMT < 18.5
                      ? "Berat Badan Kurang (Underweight)"
                      : IMT >= 18.5 && IMT <= 22.9
                        ? "Berat Badan Normal"
                        : IMT >= 23 && IMT <= 24.9
                          ? "Kelebihan Berat Badan (Overweight) Dengan Resiko"
                          : IMT >= 25 && IMT <= 29.9
                            ? "Obesitas I"
                            : IMT >= 30
                              ? "Obesitas II"
                              : "-"}
                    )
                  </strong>
                </p>
              </Form.Item>
            </Col>
          </Row> */}
      {ttvLast === "" ? (
        <Alert
          message="Pasien Belum Dilakukan Pengisian CPPT Maka BB dan TB Kosong!"
          type="warning"
        />
      ) : (
        <></>
      )}

      <Card size="small">
        <Row>
          <Col span={12}>
            <Form.Item
              label="Tinggi Badan"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input
                // disabled
                suffix="Cm"
                style={{ width: "100%" }}
                // placeholder="..."
                value={tinggiBadan}
                // value={ttvLast.tinggiBadan}
                onChange={(e) => settinggiBadan(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Berat Badan"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input
                // disabled
                suffix="Kg"
                style={{ width: "100%" }}
                // min={0.1}
                step={0.1}
                // placeholder="..."
                value={beratBadan}
                // value={ttvLast.beratBadan}
                onChange={(e) => setberatBadan(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="IMT"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input.Group compact>
                <Input
                  suffix="(Kg/M2)"
                  style={{ width: "30%" }}
                  value={IMT}
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "70%" }}
                  // value="Sangat Pendek"
                  placeholder="..."
                  disabled
                  value={KeteranganImt}
                />
              </Input.Group>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              label="LILA"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Input
                type="number"
                min={0}
                suffix="Cm"
                style={{ width: "100%" }}
                placeholder="..."
                value={lila}
                onChange={(e) => setLila(e.target.value)}
              />
            </Form.Item>
            {/* <Form.Item
              label="Dokter Gizi"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Select
                value={dokterGizi}
                onChange={(e) => {
                  setdokterGizi(e);
                }}
                // onFocus={() => {
                //   getmstdokterGizi('%20');
                // }}
                dataSource={listDokterGizi}
                showSearch
                style={{ width: "100%" }}
                placeholder="..."
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {listDokterGizi.map((d) =>
                  d.dokterId.slice(0, 3) === "G00" ? (
                    <Option key={d.dokterId}>{d.namaDokter}</Option>
                  ) : (
                    <></>
                  )
                )}
              </Select>
            </Form.Item> */}
          </Col>
        </Row>

        <Row>
          <Divider orientation="left">
            Isi Pertanyaan Berikut Sesuai Keadaan Pasien :
          </Divider>
        </Row>
        <Row>
          <Col span={12}>1. BMI Pasien (kg/m2)</Col>
          <Col span={1}></Col>
          <Col span={10}>
            <Radio.Group
              name="BMI Pasien"
              value={pertanyaan1}
              onChange={(e) => setPertanyaan1(e.target.value)}
            >
              <Radio value={0}>a. &gt; 20(&gt; 30 obese)</Radio>
              <Radio value={1}>b. 18,5 - 20</Radio>
              <Radio value={2}>c. &lt; 18,5</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            2. Presentase penurunan berat secara tidak sengaja (3-6 bulan yang
            lalu)
          </Col>
          <Col span={1}></Col>
          <Col span={10}>
            <Radio.Group
              name="Presentase Berat"
              value={pertanyaan2}
              onChange={(e) => setPertanyaan2(e.target.value)}
            >
              <Radio value={0}>a. &lt; 5%</Radio>
              <Radio value={1}>b. 5-10 %</Radio>
              <Radio value={2}>c. &gt; 10%</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            3. Pasien menderita penyakit berat dan atau asupan makanan tidak
            adekuat &gt; 5 hari
          </Col>
          <Col span={1}></Col>
          <Col span={10}>
            <Radio.Group
              name="Penyakit berat"
              value={pertanyaan3}
              onChange={(e) => setPertanyaan3(e.target.value)}
            >
              <Radio value={2}>a. Ya</Radio>
              <Radio value={0}>b. Tidak</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Divider />
        <Row>
          <Col span={12}>
            <b>Total Score :</b>
          </Col>
          <Col span={1}></Col>
          <Col span={10}>
            <Input value={Totaldewasa} placeholder="..." disabled />
          </Col>
        </Row>
      </Card>
      <br />

      <Card size="small">
        <br />
        <Row>
          <Col span={12}>
            <Space>
              {/* <Button onClick={() => { }}>Verifikasi</Button> */}
              <Button
                onClick={() => {
                  setVisibledewasa(true);
                }}
              >
                Riwayat
              </Button>
            </Space>
          </Col>
          <Col span={12} style={{ textAlign: "right" }}>
            <Space>
              <Button
                onClick={() => {
                  setscreeningId(0);
                  setberatBadan("");
                  settinggiBadan("");
                  setLila("");
                  setPertanyaan1("");
                  setPertanyaan2("");
                  setPertanyaan3("");
                  settanggalScreening(dayjs());
                }}
              >
                Batal
              </Button>
              {/* <Popconfirm
                  title="Apakah data sudah benar?"
                  onConfirm={simpanGizi}
                  onCancel={onCanceltip}
                  okText="Ya"
                  cancelText="Tidak"
                > */}
              <Button
                type="primary"
                onClick={() => {
                  console.log(datagizi);
                  insertGizi(datagizi);
                }}
              >
                Simpan
              </Button>
            </Space>
          </Col>
        </Row>
      </Card>

      <Modal
        style={{ marginTop: 10 }}
        width="70%"
        open={visibledewasa}
        footer={false}
        onOk={(e) => setVisibledewasa(false)}
        onCancel={(e) => setVisibledewasa(false)}
      >
        <Table
          dataSource={listscreening}
          size="small"
          rowKey="reg"
          scroll={{ y: 470 }}
          bordered
        >
          <Column
            title="Waktu"
            key="waktu"
            render={(listscreening) => (
              <span className="fontkecil">
                {dayjs(listscreening.tanggal).format("DD-MM-YYYY  HH:mm")}
              </span>
            )}
          />
          <Column
            title="TB / BB / lila"
            key="waktu"
            render={(listscreening) => (
              <span className="fontkecil">
                Tinggi : {listscreening.tinggiBadan}
                <br></br>
                Berat : {listscreening.beratBadan}
                <br></br>
                Lila : {listscreening.lila}
              </span>
            )}
          />
          <Column
            title="Total Score"
            key="waktu"
            render={(listscreening) => (
              <span className="fontkecil">
                {listscreening.pertanyaan1 +
                  listscreening.pertanyaan2 +
                  listscreening.pertanyaan3}
              </span>
            )}
          />
          <Column
            title="Dokter"
            key="waktu"
            render={(listscreening) => (
              <span className="fontkecil">{listscreening.namaDokter}</span>
            )}
          />
          <Column
            title="User"
            key="waktu"
            render={(listscreening) => (
              <span className="fontkecil">{listscreening.userId}</span>
            )}
          />
          <Column
            title="Aksi"
            key="waktu"
            render={(listscreening) => (
              <span className="fontkecil">
                <Space>
                  <Popconfirm
                    title="Apakah data akan dihapus?"
                    onConfirm={() =>
                      deletescreening(
                        listscreening.screeningId,
                        curpasRI.registrasiId
                      )
                    }
                    onCancel={(e) => {}}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button size="small" danger>
                      {" "}
                      Hapus{" "}
                    </Button>
                  </Popconfirm>
                  <Button
                    size="small"
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => {
                      setscreeningId(listscreening.screeningId);
                      settanggalScreening(dayjs(listscreening.tanggal));
                      setberatBadan(listscreening.beratBadan);
                      settinggiBadan(listscreening.tinggiBadan);
                      setLila(listscreening.lila);
                      setPertanyaan1(listscreening.pertanyaan1);
                      setPertanyaan2(listscreening.pertanyaan2);
                      setPertanyaan3(listscreening.pertanyaan3);
                      setVisibledewasa(false);
                    }}
                  >
                    {" "}
                    Edit{" "}
                  </Button>
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => {
                      getPrintScrenGizi(
                        curpasRI.registrasiId,
                        listscreening.screeningId,
                        ""
                      );
                    }}
                  >
                    {" "}
                    Lihat{" "}
                  </Button>
                </Space>
              </span>
            )}
          />
        </Table>
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={modalprintGizi}
        onCancel={() => {
          setmodalprintGizi(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printScrenGizi}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
    </div>
  );
};

export default FormScreeningGiziDewasa;
