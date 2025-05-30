import {
  Button,
  Card,
  Col,
  Descriptions,
  Input,
  Row,
  Select,
  Space,
  TimePicker,
  Modal,
} from "antd";
import React, { useContext } from "react";
import dayjs from "dayjs";
import { JadwalRadioterapiContext } from "../context/JadwalRadioterapiContext";

const { Option } = Select;

const FormAturJadwal = () => {
  const {
    // main
    noOrder,
    noAntrian,
    noReg,
    tglPemeriksaan,
    kodepmr,
    katPelayanan,
    setkatPelayanan,
    katBagian,
    setkatBagian,
    jamAwal,
    setjamAwal,
    jamAkhir,
    setjamAkhir,
    status,
    nmUser,
    ip,
    host,
    // hardcode mst
    mstKatPelayanan,
    mstKatBagian,
    // modal
    setmdFormAturJadwal,
    // func
    postJadwalRadioterapi,
  } = useContext(JadwalRadioterapiContext);

  const klikSimpan = async () => {
    if (!katPelayanan) {
      Modal.warn({
        title: "Peringatan!",
        content: "Kategori Pelayanan belum dipilih!",
      });
    } else if (!katBagian) {
      Modal.warn({
        title: "Peringatan!",
        content: "Kategori Bagin belum dipilih!",
      });
    } else if (jamAkhir < jamAwal) {
      Modal.warn({
        title: "Peringatan!",
        content:
          "Jam Akhir tidak boleh sama dengan/ lebih kecil dari Jam Awal!",
      });
    } else {
      let data = {
        noOrder: noOrder,
        noAntrian: noAntrian,
        registrasiId: noReg,
        kodePmr: kodepmr,
        kategoriPelayanan: katPelayanan,
        kategoriBagian: katBagian,
        tglPemeriksaan: tglPemeriksaan,
        jamAwal: dayjs(jamAwal).format(),
        jamAkhir: dayjs(jamAkhir).format(),
        status: "1",
        userId: nmUser,
        clientHost: host,
        clientIP: ip,
      };

      // console.log(data);
      postJadwalRadioterapi(data);
    }
  };

  const klikBatal = async () => {
    setmdFormAturJadwal(false);
  };

  // status : null.Belum Terjadwal, 1. Terjadwal, 2. Terlayani

  return (
    <Card title="Form Atur Jadwal" size="small">
      <Descriptions bordered size="small">
        <Descriptions.Item label="Kategori Pelayanan :">
          <Select
            value={katPelayanan}
            onChange={(e) => setkatPelayanan(e)}
            style={{ width: "100%" }}
            size="small"
          >
            {mstKatPelayanan.map((opt, index) => (
              <Option key={index} value={opt.id}>
                {opt.desk}
              </Option>
            ))}
          </Select>
        </Descriptions.Item>
        <Descriptions.Item label="Kategori Bagian :" span={2}>
          <Select
            value={katBagian}
            onChange={(e) => setkatBagian(e)}
            disabled={status === "1" ? true : false}
            style={{ width: "100%" }}
            size="small"
          >
            {mstKatBagian.map((opt, index) => (
              <Option key={index} value={opt.id}>
                {opt.desk}
              </Option>
            ))}
          </Select>
        </Descriptions.Item>
        <Descriptions.Item label="Tanggal :" span={3}>
          <Input
            value={dayjs(tglPemeriksaan).format("DD-MM-YYYY")}
            type="text"
            size="small"
          />
        </Descriptions.Item>
        <Descriptions.Item label="Jam Awal :">
          <TimePicker
            value={dayjs(jamAwal)}
            format={"HH:mm"}
            size="small"
            onChange={(e) => setjamAwal(e)}
            allowClear={false}
            inputReadOnly={true}
            style={{ width: "100%" }}
          />
        </Descriptions.Item>
        <Descriptions.Item label="Jam Akhir :">
          <TimePicker
            value={dayjs(jamAkhir)}
            format={"HH:mm"}
            size="small"
            onChange={(e) => setjamAkhir(e)}
            allowClear={false}
            inputReadOnly={true}
            style={{ width: "100%" }}
          />
        </Descriptions.Item>
      </Descriptions>

      <Row style={{ float: "right", marginTop: 5 }}>
        <Col>
          <Space>
            <Button
              onClick={() => klikSimpan()}
              size="small"
              type="primary"
              style={{ width: 75 }}
            >
              Simpan
            </Button>
            <Button
              onClick={() => klikBatal()}
              size="small"
              type="text"
              style={{ width: 75, backgroundColor: "#f5222d", color: "white" }}
            >
              Batal
            </Button>
          </Space>
        </Col>
      </Row>
    </Card>
  );
};

export default FormAturJadwal;
