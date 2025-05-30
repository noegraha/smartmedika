import React from "react";
import {
  Input,
  Select,
  Button,
  Row,
  Col,
  Radio,
  Card,
  Modal,
  Checkbox,
} from "antd";
import { RJumumContext } from "../context/RJumumContext";
import { useContext } from "react";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context/LoginContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Option } = Select;
const { TextArea } = Input;
const { confirm } = Modal;
const Formperawat = () => {
  const {
    insertRJumum,
    protesa,
    keyakinan,
    adl,
    supkeluarga,
    alatbantu,
    cacattubuh,
    psikologis,
    hubkeluarga,
    analisa,
    implementasi,
    edukasi,
    obat,
    ketobat,
    setADL,
    setAlatBantu,
    setCacatTubuh,
    setHubunganKeluarga,
    setKeyakinanAgama,
    setProtesa,
    setPsikologis,
    setSupportKeluarga,
    setAnalisa,
    setImplementasi,
    setEdukasi,
    setObat,
    setKetObat,
  } = useContext(RJumumContext);
  const { curpas } = useContext(PasienContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const dataRJ = [
    {
      registrasiId: curpas.registrasiId,
      ruangId: curpas.ruangId,
      skreening: curpas.baruLama === "L" ? "ULANG" : "AWAL",
      caraKunjung: curpas.caraMasukId,
      alatBantu: alatbantu,
      protesa: protesa,
      cacatTubuh: cacattubuh,
      adl: adl,
      hubunganKeluarga: hubkeluarga,
      psikologis: psikologis,
      // analisaKeperawatan: analisa,
      // implementasi: implementasi,
      // edukasi: edukasi,
      rekonsiliasiObat: obat.toString(),
      keteranganRekonsiliasi: ketobat,
      keyakinanAgama: keyakinan,
      supportKeluarga: supkeluarga,
      userId: namauser,
      clientHost: host,
      clientIp: ip,
    },
  ];

  function showConfirm() {
    confirm({
      title: "Anda yakin akan menyimpan data kosong?",
      icon: <ExclamationCircleOutlined />,
      content: "klik OK jika Anda yakin",
      onOk() {
        simpanData();
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  const filterSubmit = () => {
    if (
      alatbantu === null &&
      protesa === null &&
      cacattubuh === null &&
      adl === null &&
      hubkeluarga === null &&
      psikologis === null &&
      keyakinan === null &&
      supkeluarga === null &&
      analisa === null &&
      implementasi === null &&
      edukasi === null
    ) {
      showConfirm();
    } else {
      simpanData();
    }
  };
  const simpanData = () => {
    // e.preventDefault();
    insertRJumum(dataRJ);
    console.log(dataRJ);
  };
  const radioHandler = (e) => {
    setObat(e.target.value);
    console.log(obat);
  };
  const onAlatbantu = (e) => {
    setAlatBantu(e);
  };
  const onProtesa = (e) => {
    setProtesa(e);
  };
  const onCacat = (e) => {
    setCacatTubuh(e);
  };
  const onADL = (e) => {
    setADL(e);
  };
  const onHubungan = (e) => {
    setHubunganKeluarga(e);
  };
  const onPsikologis = (e) => {
    setPsikologis(e);
  };
  const onAgama = (e) => {
    setKeyakinanAgama(e);
  };
  const onDukungan = (e) => {
    setSupportKeluarga(e);
  };
  const onAnalisakep = (e) => {
    setAnalisa(e.target.value);
  };
  const onImplementasi = (e) => {
    setImplementasi(e.target.value);
  };
  const onEdukasi = (e) => {
    setEdukasi(e.target.value);
  };
  const onKetrekonsiliasi = (e) => {
    setKetObat(e.target.value);
  };
  const onClear = () => {
    setKetObat("");
  };
  return (
    <div>
      <Card
        size="small"
        title="Form Perawat"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row gutter={[8, 8]}>
          <Col span={6} xs={12} sm={12} md={8} lg={6} xl={6}>
            Pakai Alat Bantu
            <br />
            <Select
              style={{ width: "100%", marginBottom: 0 }}
              value={alatbantu}
              onChange={(e) => onAlatbantu(e)}
            >
              <Option value="YA">YA</Option>
              <Option value="TIDAK">TIDAK</Option>
            </Select>
          </Col>
          <Col span={6} xs={12} sm={12} md={8} lg={6} xl={6}>
            Protesa
            <br />
            <Select
              style={{ width: "100%", marginBottom: 0 }}
              defaultValue="-PILIH-"
              value={protesa}
              onChange={(e) => onProtesa(e)}
            >
              <Option value="YA">YA</Option>
              <Option value="TIDAK">TIDAK</Option>
            </Select>
          </Col>
          <Col span={6} xs={12} sm={12} md={8} lg={6} xl={6}>
            Kondisi Psikologis
            <br />
            <Select
              style={{ width: "100%", marginBottom: 0 }}
              defaultValue="-PILIH-"
              value={psikologis}
              onChange={(e) => onPsikologis(e)}
            >
              <Option value="TENANG">TENANG</Option>
              <Option value="TAKUT">TAKUT</Option>
              <Option value="SEDIH">SEDIH</Option>
              <Option value="CEMAS">CEMAS</Option>
              <Option value="MARAH">MARAH</Option>
            </Select>
          </Col>
          <Col span={6} xs={12} sm={12} md={8} lg={6} xl={6}>
            Hubungan Keluarga
            <br />
            <Select
              defaultValue="-PILIH-"
              style={{ width: "100%", marginBottom: 0 }}
              value={hubkeluarga}
              onChange={(e) => onHubungan(e)}
            >
              <Option value="1">BAIK</Option>
              <Option value="2">KURANG</Option>
            </Select>
          </Col>
          <Col span={6} xs={12} sm={12} md={8} lg={6} xl={6}>
            Cacat Tubuh
            <br />
            <Select
              placeholder="-PILIH-"
              style={{ width: "100%" }}
              value={cacattubuh}
              onChange={(e) => onCacat(e)}
            >
              <Option value="YA">YA</Option>
              <Option value="TIDAK">TIDAK</Option>
            </Select>
          </Col>
          <Col span={6} xs={12} sm={12} md={8} lg={6} xl={6}>
            ADL
            <br />
            <Select
              placeholder="-PILIH-"
              style={{ width: "100%" }}
              value={adl}
              onChange={(e) => onADL(e)}
            >
              <Option value="MANDIRI">MANDIRI</Option>
              <Option value="DIBANTU">DIBANTU</Option>
              <Option value="TERGANTUNG">TERGANTUNG</Option>
            </Select>
          </Col>
          <Col span={6} xs={12} sm={12} md={8} lg={6} xl={6}>
            Keyakinan Agama
            <br />
            <Select
              defaultValue="-PILIH-"
              style={{ width: "100%" }}
              value={keyakinan}
              onChange={(e) => onAgama(e)}
            >
              <Option value="1">YA</Option>
              <Option value="2">TIDAK</Option>
            </Select>
          </Col>
          <Col span={6} xs={12} sm={12} md={8} lg={6} xl={6}>
            Dukungan Keluarga
            <br />
            <Select
              defaultValue="-PILIH-"
              style={{ width: "100%" }}
              value={supkeluarga}
              onChange={(e) => onDukungan(e)}
            >
              <Option value="1">ADA</Option>
              <Option value="2">TIDAK</Option>
            </Select>
            <Checkbox onChange={(e) => onDukungan(e.target.checked)}>
              {supkeluarga === "1" ? "ADA" : "TIDAK"}
            </Checkbox>
          </Col>
        </Row>
        {/* <Row gutter={[16, 16]}>
          <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
            Analisa Keperawatan
            <br />
            <TextArea
              rows={4}
              showCount
              maxLength={256}
              value={analisa}
              onChange={(e) => onAnalisakep(e)}
            />
          </Col>
          <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
            Implementasi
            <br />
            <TextArea
              rows={4}
              showCount
              maxLength={256}
              value={implementasi}
              onChange={(e) => onImplementasi(e)}
            />
          </Col>
          <Col span={8} xs={24} sm={12} md={8} lg={8} xl={8}>
            Edukasi
            <br />
            <TextArea
              rows={4}
              showCount
              maxLength={256}
              value={edukasi}
              onChange={(e) => onEdukasi(e)}
            />
          </Col>
        </Row> */}
        Rekonsiliasi Obat : Apakah menggunakan obat sebelumnya ? {"   "}
        <Radio.Group onChange={(e) => radioHandler(e)} value={parseInt(obat)}>
          <Radio value={1}>Ya</Radio>
          <Radio value={2} onClick={onClear}>
            Tidak
          </Radio>
        </Radio.Group>
        {parseInt(obat) === 1 && (
          <TextArea
            rows={2}
            showCount
            maxLength={256}
            value={ketobat}
            onChange={(e) => onKetrekonsiliasi(e)}
          />
        )}
        {parseInt(obat) === 2 && <></>}
        <br />
        <Row>
          <Col span={24} style={{ textAlign: "right" }}>
            <Button type="primary" htmlType="submit" onClick={filterSubmit}>
              Simpan
            </Button>
          </Col>
        </Row>
      </Card>
    </div>
  );
};
export default Formperawat;
