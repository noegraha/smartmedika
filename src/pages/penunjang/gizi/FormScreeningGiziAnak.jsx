import React, { useState, Fragment, useContext } from "react";
import {
  Layout,
  Table,
  Card,
  Form,
  Input,
  Divider,
  Row,
  Col,
  Radio,
  Button,
  Tooltip,
  Modal,
  Popconfirm,
  message,
  Space,
  Select,
  Alert,
} from "antd";
import Iframe from "react-iframe";
import { PageHeader } from "@ant-design/pro-components";
import Column from "antd/lib/table/Column";
import { GiziAsuhanContext } from "./context/AsuhanGiziContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "../../rawatinap/context/PasienRIContext";
import dayjs from "dayjs";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
const { Sider, Content } = Layout;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { Option } = Select;

const FormScreeningGiziAnak = () => {
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
    getmstdokterGizi,
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
    modalprintGizipyms,
    setmodalprintGizipyms,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);

  const datagizi = {
    screeningId: screeningId,
    registrasiId: curpasRI.registrasiId,
    ruangId: curpasRI.ruangId,
    tanggal: dayjs(tanggalScreening).format("YYYY-MM-DDTHH:mm"),
    anak: true,
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
    pertanyaan4: pertanyaan4,
    ahliGizi: kodeDokter,
    userId: namauser,
    status: true,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientIp: ip,
  };

  const Totalanak =
    parseInt(pertanyaan1) +
    parseInt(pertanyaan2) +
    parseInt(pertanyaan3) +
    parseInt(pertanyaan4);

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
      {/* <Card size="small"> */}

      {/* <Row gutter={[8, 8]}>
          <Col span={1} xs={12} sm={12} md={6} lg={6} xl={6}> */}
      {/* <Form.Item
                label="Berat Badan"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
              > */}
      {/* Berat Badan:
            <br></br>
            <Input
              suffix="Kg"
              type="text"
              style={{ width: "100%" }}
              min={0.1}
              step={0.1}
              placeholder="..."
              value={beratBadan === "" ? fisik.beratBadan : beratBadan}
              onChange={(e) => setberatBadan(e.target.value)}
            /> */}
      {/* </Form.Item> */}
      {/* <Form.Item
                label="PB/U"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
                hidden={stspbnak}
              >
                <Input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="..."
                  value={""}
                  hidden={stspbnak}
                />
                <Input.Group compact>
                  <Input
                    style={{ width: "25%" }}
                    value="-2.55"
                    placeholder="..."
                    disabled
                  />
                  <Input
                    style={{ width: "75%" }}
                    value="Sangat Pendek"
                    placeholder="..."
                    disabled
                  />
                </Input.Group>
              </Form.Item>
              <Form.Item
                label="TB/U"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
                hidden={ststbnak}
              >
                <Input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="..."
                  value={""}
                  hidden={ststbnak}
                />
                <Input.Group compact>
                  <Input
                    style={{ width: "25%" }}
                    value="-2.55"
                    placeholder="..."
                    disabled
                  />
                  <Input
                    style={{ width: "75%" }}
                    value="Sangat Pendek"
                    placeholder="..."
                    disabled
                  />
                </Input.Group>
              </Form.Item> */}
      {/* </Col>
          <Col span={1} xs={12} sm={12} md={6} lg={6} xl={6}> */}
      {/* <Form.Item
                label="Tinggi Badan"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
              > */}
      {/* Tinggi Badan:
            <br></br>
            <Input
              suffix="Cm"
              type="text"
              style={{ width: "100%" }}
              placeholder="..."
              value={tinggiBadan === "" ? fisik.tinggiBadan : tinggiBadan}
              onChange={(e) => settinggiBadan(e.target.value)}
            /> */}
      {/* </Form.Item> */}
      {/* <Form.Item
                label="BB/PB"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
                hidden={stspbnak}
              >
                <Input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="..."
                  value={""}
                  hidden={stspbnak}
                />
                <Input.Group compact>
                  <Input
                    style={{ width: "25%" }}
                    value="-2.55"
                    placeholder="..."
                    disabled
                  />
                  <Input
                    style={{ width: "75%" }}
                    value="Sangat Pendek"
                    placeholder="..."
                    disabled
                  />
                </Input.Group>
              </Form.Item>
              <Form.Item
                label="BB/TB"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
                hidden={ststbnak}
              >
                <Input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="..."
                  value={""}
                  hidden={ststbnak}
                />
                <Input.Group compact>
                  <Input
                    style={{ width: "25%" }}
                    value="-2.55"
                    placeholder="..."
                    disabled
                  />
                  <Input
                    style={{ width: "75%" }}
                    value="Sangat Pendek"
                    placeholder="..."
                    disabled
                  />
                </Input.Group>
              </Form.Item> */}
      {/* </Col>
          <Col span={1} xs={12} sm={12} md={6} lg={6} xl={6}> */}
      {/* <Form.Item
                label="LILA"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
              > */}
      {/* LILA:
            <br></br>
            <Input
              type="number"
              min={0}
              suffix="Cm"
              style={{ width: "100%" }}
              placeholder="..."
              value={lila}
              onChange={(e) => setLila(e.target.value)}
            /> */}
      {/* </Form.Item> */}

      {/* <Form.Item
                label="BB/U"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="..."
                  value={""}
                />
                <Input.Group compact>
                  <Input
                    style={{ width: "25%" }}
                    value="-2.55"
                    placeholder="..."
                    disabled
                  />
                  <Input
                    style={{ width: "75%" }}
                    value="Sangat Pendek"
                    placeholder="..."
                    disabled
                  />
                </Input.Group>
              </Form.Item> */}
      {/* </Col>
          <Col span={1} xs={12} sm={12} md={6} lg={6} xl={6}> */}
      {/* <Form.Item
                label="IMT"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
              > */}
      {/* IMT: (Kg/M2)
            <br></br>
            <Input.Group compact>
              <Input
                // suffix="(Kg/M2)"
                style={{ width: "40%" }}
                value={IMT}
                placeholder="..."
                disabled
              />
              <Input
                style={{ width: "60%" }}
                // value="Sangat Pendek"
                placeholder="..."
                disabled
                value={KeteranganImt}
              />
            </Input.Group> */}
      {/* <p>
                <strong>
                  (

                  )
                </strong>
              </p>
              <Input.Group compact>
                <Input
                  style={{ width: "25%" }}
                  value="-2.55"
                  placeholder="..."
                  disabled
                />
                <Input
                  style={{ width: "75%" }}
                  value="Sangat Pendek"
                  placeholder="..."
                  disabled
                />
              </Input.Group> */}
      {/* </Form.Item> */}
      {/* <Form.Item
                label="IMT/U"
                {...formItemLayout}
                style={{ marginBottom: 5 }}
              >
                <Input
                  type="text"
                  style={{ width: "100%" }}
                  placeholder="..."
                  value={""}
                />
                <Input.Group compact>
                  <Input
                    style={{ width: "25%" }}
                    value="-2.55"
                    placeholder="..."
                    disabled
                  />
                  <Input
                    style={{ width: "75%" }}
                    value="Sangat Pendek"
                    placeholder="..."
                    disabled
                  />
                </Input.Group>
              </Form.Item> */}
      {/* </Col>
        </Row> */}
      {/* <Row>
          <Col span={24}>
            <Form.Item
              label="IMT/U"
              {...formItemLayout}
              style={{ marginBottom: 5 }}
            >
              <Select
                value={dokterGizi}
                onChange={(e) => {
                  setdokterGizi(e);
                }}
                dataSource={dokterall}
                showSearch
                style={{ width: "50%" }}
                placeholder="..."
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {dokterall.map((d) => (
                  <Option key={d.dokterId}>{d.namaDokter}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <br></br>
        <br></br> */}
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
          <Col span={12}>1. Apakah BMI berada dibawah standar acuan ?</Col>
          <Col span={1}></Col>
          <Col span={10}>
            <Radio.Group
              name="BMIacuan"
              value={pertanyaan1}
              onChange={(e) => setPertanyaan1(e.target.value)}
            >
              <Radio value={0}>a. Tidak</Radio>
              <Radio value={2}>b. Ya</Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            2. Apakah akhir-akhir ini anak mengalami penurunan BB ?
          </Col>
          <Col span={1}></Col>
          <Col span={10}>
            <Radio.Group
              name="TurunBB"
              value={pertanyaan2}
              onChange={(e) => setPertanyaan2(e.target.value)}
            >
              <Radio value={0}>a. Tidak</Radio>
              <Radio value={1}>
                <Tooltip
                  placement="rightBottom"
                  title="-Kehilangan BB yang tidak diharapkan, -Baju terasa longgar, -Penambahan BB yang rendah (jika < 2th)"
                >
                  b. Ya
                </Tooltip>
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            3. Apakah 1 minggu terakhir anak mengalami penurunan asupan makanan
            ?
          </Col>
          <Col span={1}></Col>
          <Col span={10}>
            <Radio.Group
              name="PenurunanAsupan"
              value={pertanyaan3}
              onChange={(e) => setPertanyaan3(e.target.value)}
            >
              <Radio value={0}>
                <Tooltip
                  placement="rightBottom"
                  title="Asupan makan seperti biasa"
                >
                  a. Tidak
                </Tooltip>
              </Radio>
              <Radio value={1}>
                <Tooltip
                  placement="rightBottom"
                  title="Mengalami penurunan asupan makan untuk 1 minggu terakhir"
                >
                  b. Ya
                </Tooltip>
              </Radio>
              <Radio value={2}>
                <Tooltip
                  placement="rightBottom"
                  title="Tidak ada asupan atau asupan sangat sedikit"
                >
                  c. Ya (Tidak Ada Asupan)
                </Tooltip>
              </Radio>
            </Radio.Group>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            4. Apakah kebutuhan gizi anak dipengaruhi oleh kondisi anak untuk
            kurang lebih 1 minggu ke depan ?
          </Col>
          <Col span={1}></Col>
          <Col span={10}>
            <Radio.Group
              name="KebutuhanGizi"
              value={pertanyaan4}
              onChange={(e) => setPertanyaan4(e.target.value)}
            >
              <Radio value={0}>a. Tidak</Radio>
              <Radio value={1}>
                <Tooltip
                  placement="rightBottom"
                  title="Untuk 1 minggu kedepan: mengalami penurunan asupan, -mengalami peningkatan kebutuhan, -mengalami peningkatan kehilangan"
                >
                  b. Ya
                </Tooltip>
              </Radio>
              <Radio value={2}>
                <Tooltip
                  placement="rightBottom"
                  title="Tidak ada asupan atau asupan sangat sedikit untuk 1 minggu ke depan"
                >
                  c. Ya (Tidak Ada Asupan)
                </Tooltip>
              </Radio>
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
            <Input value={Totalanak} placeholder="..." disabled />
          </Col>
        </Row>
      </Card>
      <br />
      <Card size="small">
        <br />
        <Row>
          <Col span={12}>
            <Space>
              <Button onClick={() => {}}>Verifikasi</Button>
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
                  setPertanyaan4("");
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
                  listscreening.pertanyaan3 +
                  listscreening.pertanyaan4}
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
                      setPertanyaan3(listscreening.pertanyaan4);
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
                      getPrintScrenGiziPYMS(
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
        open={modalprintGizipyms}
        onCancel={() => {
          setmodalprintGizipyms(false);
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
          url={printScrenGiziPYMS}
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
export default FormScreeningGiziAnak;
