import React, { useContext, useState, useEffect } from "react";
import {
  Card,
  Col,
  DatePicker,
  Input,
  Row,
  Space,
  Form,
  Button,
  Select,
  Modal,
} from "antd";
import dayjs from "dayjs";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "../style/styleLookupOrder.css";

const { Option } = Select;
const { confirm } = Modal;

const PerbaikanDetailTransaksi = () => {
  const {
    // main
    unitId,
    noTransaksi,
    jam,
    pasienId,
    jenisKelamin,
    umur,
    namaPasien,
    namaPenanggung,
    jenisPasien,
    namauser,
    ip,
    host,
    pemeriksaId,
    setPemeriksa,
    perbaikanPmr,
    setperbaikanPmr,
    updateOrderValid,
    // spin
    setspinAll,
    spinDetailTrans,
    // mst
    penunjang,
    listdokPemeriksa,
    // modal
    setmdPerbaikiDtTrans,
    mdDtTransaksiPmr,
    setmdDtTransaksiPmr,
    mdListPmrUnit,
    setmdListPmrUnit,
  } = useContext(TransaksiPenunjangContext);

  const cbHarga = 110000;

  const [totalTarif, settotalTarif] = useState(
    perbaikanPmr.biayaPelayanan / perbaikanPmr.jmlPelayanan
  );

  const toCurrency = (number) => {
    let numbera = number
      ? number.toLocaleString("id-id", { minimumFractionDigits: 0 })
      : 0;
    return numbera;
  };

  const changePemeriksa = (e) => {
    let newData = { ...perbaikanPmr };
    newData.dokterPemeriksaId = e;
    setperbaikanPmr(newData);
    // console.log('newData : ', newData);
  };

  const changeTipePmr = (e) => {
    let newData = { ...perbaikanPmr };
    newData.tipePelayanan = e;
    if (e === "B") {
      let ttl = perbaikanPmr.jasaSarana + perbaikanPmr.jasaPelayanan;
      settotalTarif(ttl);
      if (perbaikanPmr.biayaPelayanan === 0) {
        newData.standarBiaya = perbaikanPmr.jmlPelayanan * ttl;
      }
      if (perbaikanPmr.standarBiaya === 0) {
        newData.biayaPelayanan = perbaikanPmr.jmlPelayanan * ttl;
      }
      // newData.jasaPelayanan = perbaikanPmr.jasaPelayanan
    }
    if (e === "C") {
      let ttl =
        perbaikanPmr.jasaSarana +
        perbaikanPmr.jasaPelayanan +
        perbaikanPmr.jasaPelayanan * perbaikanPmr.faktorKali;
      settotalTarif(ttl);
      if (perbaikanPmr.biayaPelayanan === 0) {
        newData.standarBiaya = perbaikanPmr.jmlPelayanan * ttl;
      }
      if (perbaikanPmr.standarBiaya === 0) {
        newData.biayaPelayanan = perbaikanPmr.jmlPelayanan * ttl;
      }
      // newData.jasaPelayanan = perbaikanPmr.jasaPelayanan + (perbaikanPmr.jasaPelayanan * perbaikanPmr.faktorKali)
    }
    setperbaikanPmr(newData);
  };

  const changeJumlah = (e) => {
    if (e.length === 0) {
      Modal.warning({
        title: "Peringatan",
        content: "Jumlah Pemeriksaan harus diisi!",
      });
    } else {
      if (e === 0 || e === "0") {
        Modal.warning({
          title: "Peringatan",
          content: "Jumlah Pemeriksaan harus diisi!",
        });
      } else if (e > 99) {
        Modal.warning({
          title: "Peringatan",
          content: "Jumlah Tindakan Maksimal 99!",
        });
      } else {
        let newData = { ...perbaikanPmr };
        if (perbaikanPmr.biayaPelayanan === 0) {
          newData.standarBiaya = e * totalTarif;
        }
        if (perbaikanPmr.standarBiaya === 0) {
          newData.biayaPelayanan = e * totalTarif;
        }
        newData.jmlPelayanan = e;
        setperbaikanPmr(newData);
      }
    }
  };

  const klikBatal = () => {
    confirm({
      title: "Konfirmasi",
      icon: <QuestionCircleOutlined />,
      content: "Batal Perbaiki Transaksi?",
      okText: "Ya",
      cancelText: "Tidak",
      onOk() {
        setmdPerbaikiDtTrans(false);
      },
    });
  };

  const updatePmr = () => {
    let sendData = { ...perbaikanPmr };
    if (sendData.tipePelayanan === "C") {
      sendData.biayaDr =
        perbaikanPmr.jasaPelayanan +
        perbaikanPmr.jasaPelayanan * perbaikanPmr.faktorKali;
    } else {
      sendData.biayaDr = perbaikanPmr.jasaPelayanan;
    }
    sendData.registrasiId = noTransaksi;
    sendData.biayaRs = sendData.jasaSarana;
    updateOrderValid(sendData);
  };

  const klikSimpan = () => {
    confirm({
      title: "Konfirmasi",
      icon: <QuestionCircleOutlined />,
      content: "Simpan Perbaiki Transaksi?",
      okText: "Simpan",
      cancelText: "Batal",
      onOk() {
        updatePmr();
        setmdPerbaikiDtTrans(false);
      },
    });
  };

  const klikTutup = () => {
    confirm({
      title: "Data telah berubah,",
      icon: <QuestionCircleOutlined />,
      content: "Apakah akan disimpan?",
      okText: "Simpan",
      cancelText: "Tutup",
      onOk() {
        updatePmr();
        setmdPerbaikiDtTrans(false);
      },
      onCancel() {
        setmdPerbaikiDtTrans(false);
      },
    });
  };

  useEffect(() => {
    let temp = 0;
    if (perbaikanPmr.biayaPelayanan === 0) {
      temp = perbaikanPmr.standarBiaya / perbaikanPmr.jmlPelayanan;
    }
    if (perbaikanPmr.standarBiaya === 0) {
      temp = perbaikanPmr.biayaPelayanan / perbaikanPmr.jmlPelayanan;
    }
    // console.log('temp : ', temp);
    settotalTarif(temp);
  }, [perbaikanPmr]);

  return (
    <div>
      <Row style={{ marginBottom: "5px" }}>
        <Col span={12}>
          <Space>
            <span>No. Transaksi : </span>
            <Input
              value={noTransaksi}
              readOnly
              placeholder="No.Transaksi"
              size="small"
            />
          </Space>
        </Col>
        <Col span={12}>
          <Space style={{ marginLeft: "96px" }}>
            <span>Tanggal Daftar : </span>
            <Input
              value={dayjs(jam).format("DD-MM-YYYY")}
              readOnly
              size="small"
              style={{ width: "120px" }}
            />
            <span>Jam : </span>
            <Input
              value={dayjs(jam).format("HH:mm:ss")}
              readOnly
              size="small"
              style={{ width: "120px" }}
            />
          </Space>
        </Col>
      </Row>

      <Card
        title="Data Pasien"
        loading={spinDetailTrans}
        size="small"
        headStyle={{ backgroundColor: "#FFADAD" }}
        style={{ marginBottom: "5px" }}
      >
        <Space style={{ marginBottom: "3px" }}>
          <span style={{ marginLeft: "22px" }}>Medical Record :</span>
          <Input value={pasienId} placeholder="No RM" size="small" />
          <span style={{ marginLeft: "260px" }}>Jenis Kelamin :</span>
          <Input
            value={jenisKelamin}
            placeholder="Jenis Kelamin"
            size="small"
          />
          <span>Umur :</span>
          <Input
            value={umur}
            placeholder="Umur"
            size="small"
            style={{ width: "50px" }}
          />
          <span>Tahun</span>
        </Space>
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          // labelAlign='left'
        >
          <Form.Item label="Nama Pasien" style={{ marginBottom: "0px" }}>
            <Input
              value={namaPasien}
              // onChange={(e) => setNoTransaksi(e.target.value)}
              // readOnly
              size="small"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Nama Penanggung" style={{ marginBottom: "0px" }}>
            <Input
              value={namaPenanggung}
              // onChange={(e) => setNoTransaksi(e.target.value)}
              // readOnly
              size="small"
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item label="Jenis Pasien" style={{ marginBottom: "0px" }}>
            <Input
              value={jenisPasien}
              // onChange={(e) => setNoTransaksi(e.target.value)}
              // readOnly
              size="small"
              style={{ width: "100%" }}
            />
          </Form.Item>
        </Form>
      </Card>

      <Card
        title="Detail Transaksi"
        loading={spinDetailTrans}
        size="small"
        headStyle={{ backgroundColor: "#FFD6A5" }}
        style={{ marginBottom: "5px" }}
      >
        <Space style={{ marginBottom: "3px" }}>
          <span style={{ marginLeft: "18px" }}>Tgl / Jam Periksa :</span>
          <Input
            value={dayjs(perbaikanPmr.tglPelayanan).format("DD-MM-YYYY hh:mm")}
            placeholder="25/10/2021 10:53"
            size="small"
          />
          <span style={{ marginLeft: "422px" }}>No.Invoice :</span>
          <Input
            // value='2110250001'
            disabled
            placeholder="..."
            size="small"
          />
        </Space>
        <Form
          labelCol={{ span: 3 }}
          wrapperCol={{ span: 21 }}
          // labelAlign='left'
        >
          <Form.Item label="Unit pelayanan" style={{ marginBottom: "0px" }}>
            {penunjang &&
              penunjang
                .filter((pnjg) => pnjg.ruangId === unitId)
                .map((pnjg, index) => {
                  return (
                    <Input.Group compact>
                      <Input
                        value={pnjg.deskripsi}
                        size="small"
                        style={{ width: "90%" }}
                      />
                      <Input
                        value={pnjg.ruangId}
                        size="small"
                        style={{ width: "10%", backgroundColor: "#b7eb8f" }}
                      />
                    </Input.Group>
                  );
                })}
          </Form.Item>
          <Form.Item label="Pelaksana" style={{ marginBottom: "0px" }}>
            <Input.Group compact>
              <Select
                dataSource={listdokPemeriksa}
                value={perbaikanPmr.dokterPemeriksaId}
                onChange={(e) => changePemeriksa(e)}
                showSearch
                style={{ width: "90%" }}
                placeholder="Pemeriksa"
                optionFilterProp="children"
                size="small"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {listdokPemeriksa.map((d) => (
                  <Option key={d.dokterId} value={d.dokterId}>
                    {d.namaDokter}
                  </Option>
                ))}
              </Select>
              <Input
                value={perbaikanPmr.dokterPemeriksaId}
                size="small"
                style={{ width: "10%", backgroundColor: "#b7eb8f" }}
              />
            </Input.Group>
          </Form.Item>
          <Form.Item label="Pemeriksaan" style={{ marginBottom: "0px" }}>
            <Input.Group compact>
              <Input
                value={perbaikanPmr.deskPelayananId}
                size="small"
                style={{ width: "90%" }}
              />
              <Input
                value={perbaikanPmr.pelayananId}
                size="small"
                style={{ width: "10%", backgroundColor: "#b7eb8f" }}
              />
            </Input.Group>
          </Form.Item>
        </Form>
      </Card>

      <Row style={{ marginBottom: "3px" }}>
        <Col
          span={6}
          style={{
            border: "1px solid #f0f0f0",
            textAlign: "center",
            padding: "5px",
            backgroundColor: "#FFD6A5",
          }}
        >
          <span>Tipe Tindakan</span>
        </Col>
        <Col
          span={6}
          style={{
            border: "1px solid #f0f0f0",
            textAlign: "center",
            padding: "5px",
            backgroundColor: "#FFD6A5",
          }}
        >
          <span>Tarif Tindakan</span>
        </Col>
        <Col
          span={6}
          style={{
            border: "1px solid #f0f0f0",
            textAlign: "center",
            padding: "5px",
            backgroundColor: "#FFD6A5",
          }}
        >
          <span>Jumlah Tindakan</span>
        </Col>
        <Col
          span={6}
          style={{
            border: "1px solid #f0f0f0",
            textAlign: "center",
            padding: "5px",
            backgroundColor: "#FFD6A5",
          }}
        >
          <span>Jumlah Biaya</span>
        </Col>
      </Row>

      <Row style={{ marginBottom: "3px" }}>
        <Col
          span={6}
          style={{
            border: "1px solid #f0f0f0",
            textAlign: "center",
            padding: "5px",
          }}
        >
          <Select
            // dataSource={penunjang}
            value={perbaikanPmr.tipePelayanan}
            onChange={(e) => changeTipePmr(e)}
            disabled={!perbaikanPmr.isCito}
            size="small"
            style={{ width: "100%", textAlign: "left" }}
          >
            <Option key="B" value="B">
              Biasa
            </Option>
            <Option key="C" value="C">
              Cito
            </Option>
          </Select>
        </Col>
        <Col span={6} style={{ border: "1px solid #f0f0f0", padding: "5px" }}>
          <Input
            type="text"
            value={toCurrency(totalTarif)}
            size="small"
            readOnly
            style={{
              textAlign: "right",
              backgroundColor: "#b7eb8f",
              color: "blue",
            }}
          />
        </Col>
        <Col span={6} style={{ border: "1px solid #f0f0f0", padding: "5px" }}>
          <Input
            value={perbaikanPmr.jmlPelayanan}
            onChange={(e) => changeJumlah(e.target.value)}
            type="number"
            min={1}
            max={99}
            size="small"
            style={{ textAlign: "right" }}
          />
        </Col>
        <Col span={6} style={{ border: "1px solid #f0f0f0", padding: "5px" }}>
          <Input
            value={toCurrency(perbaikanPmr.biayaPelayanan)}
            type="text"
            size="small"
            readOnly
            style={{ textAlign: "right" }}
          />
        </Col>
      </Row>

      <Card>
        <Form
          labelCol={{ span: 9 }}
          wrapperCol={{ span: 12 }}
          labelAlign="left"
        >
          <Row style={{ marginBottom: "3px" }}>
            <Col span={8}>
              <Form.Item label="Tarif Askes" style={{ marginBottom: "0px" }}>
                <Input
                  type="text"
                  value={0}
                  size="small"
                  readOnly
                  style={{ textAlign: "right" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="IUR Biaya" style={{ marginBottom: "0px" }}>
                <Input
                  type="text"
                  value={0}
                  size="small"
                  readOnly
                  style={{ textAlign: "right" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Standar RS" style={{ marginBottom: "0px" }}>
                <Input
                  type="text"
                  value={toCurrency(perbaikanPmr.standarBiaya)}
                  size="small"
                  readOnly
                  style={{ textAlign: "right" }}
                />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={8}>
              <Form.Item label="Subsidi RS" style={{ marginBottom: "0px" }}>
                <Input
                  type="text"
                  value={0}
                  size="small"
                  readOnly
                  style={{ textAlign: "right" }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Subsidi Askes/Lain"
                style={{ marginBottom: "0px" }}
              >
                <Input
                  type="text"
                  value={0}
                  size="small"
                  readOnly
                  style={{ textAlign: "right" }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>

      <Row style={{ marginTop: "10px" }}>
        <Col span={12}>
          <Space>
            <Button onClick={() => klikBatal()} style={{ width: "70px" }}>
              Batal
            </Button>
            <Button
              type="primary"
              onClick={() => klikSimpan()}
              style={{ width: "70px" }}
            >
              Simpan
            </Button>
          </Space>
        </Col>
        <Col span={12}>
          <Button
            onClick={() => klikTutup()}
            style={{ width: "70px", float: "right" }}
          >
            Tutup
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default PerbaikanDetailTransaksi;
