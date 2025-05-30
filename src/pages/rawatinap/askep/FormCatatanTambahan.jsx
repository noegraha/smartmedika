import React, { useContext, useState } from "react";
import {
  Select,
  Form,
  Row,
  Col,
  Table,
  Button,
  Empty,
  DatePicker,
  Space,
  Input,
  Modal,
  Alert,
  Popconfirm,
  message,
  Switch,
} from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import { LoginContext } from "../../rawatjalan/context";
import { PasienRIContext } from "../context/PasienRIContext";
import { CatatanAskepContext } from "../context/CatatanAskepContext";
const { TextArea } = Input;
const { Option } = Select;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const CatatanTambahan = () => {
  const { pegawaiId, pegawai, namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const {
    listCatatanPasien,
    setListCatatanPasien,
    katonCatatan,
    setkatonCatatan,
    tanggalCatatan,
    setTanggalcatatan,
    catatan,
    setCatatan,
    idCatatan,
    setidCatatan,
    katonBacaCatatan,
    setkatonBacaCatatan,
    subjekC,
    setsubjekC,
    assesmentC,
    setassesmentC,
    planningC,
    setplanningC,
    implementasiC,
    setimplementasiC,
    evaluasiC,
    setevaluasiC,
    waktu,
    setwaktu,
    getCatatanPasien,
    getCatatanRJ,
    insertCatatanPasien,
    deleteCatatan,
    getPlanning,
    getEvalusi,
    kirimcppt,
    setkirimcppt,
  } = useContext(CatatanAskepContext);
  const dateFormat = "DD-MM-YYYY HH:mm";
  const onKembali = () => {
    setkatonCatatan(false);
    setkatonBacaCatatan(false);
  };
  const onModal = () => {
    getPlanning(curpasRI.registrasiId);
    getEvalusi(curpasRI.registrasiId, dayjs().format("YYYY-MM-DD"));
    setTanggalcatatan(dayjs());
    setidCatatan(0);
    setCatatan("");
    setsubjekC("");
    setassesmentC("");
    setimplementasiC("");
    setevaluasiC("");
    setwaktu("");
    pegawai !== null
      ? pegawai.slice(0, 1) === "D"
        ? message.warning(
            "Maaf Dokter Tidak Dapat Melakukan Pengisian Catatan Keperawatan"
          )
        : setkatonCatatan(true)
      : setkatonCatatan(true);
  };

  const onTglCatatan = (date) => {
    setTanggalcatatan(date);
    getEvalusi(curpasRI.registrasiId, dayjs(date).format("YYYY-MM-DD"));
  };

  const dataCatatan = {
    id: idCatatan,
    registrasiId: curpasRI.registrasiId,
    pasienId: curpasRI.pasienId,
    tanggal: dayjs(tanggalCatatan).format("YYYY-MM-DDTHH:mm"),
    catatan: catatan,
    userId: namauser,
    ruangId: curpasRI.ruangId,
    waktu: waktu,
    subjek: subjekC,
    assesmen: assesmentC,
    planing: planningC,
    implementasi: implementasiC,
    evaluasi: evaluasiC,
    clientHost: host,
    dateEntry: dayjs().format("YYYY-MM-DDTHH:mm"),
    clientIP: ip,
  };

  const onSimpan = () => {
    kirimcppt === true
      ? console.log("kirim cppt da catatan")
      : insertCatatanPasien(dataCatatan);
    console.log(dataCatatan);
  };

  return (
    <div>
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Button
            type="primary"
            onClick={onModal}
            style={{ backgroundColor: "green" }}
          >
            Tambah Catatan
          </Button>
        </Col>
        <Col span={24}>
          <Table
            // onRow={(record, rowIndex) => {
            //   return {
            //     onClick: (e) => {
            //       onAmbilCatatanById(record.id);
            //       setWarnaRow(rowIndex);
            //     },
            //   };
            // }}
            bordered
            locale={{
              emptyText: <Empty description="Data Implementasi Kosong" />,
            }}
            pagination={true}
            dataSource={listCatatanPasien}
            size="small"
            rowKey="reg"
            // rowClassName={(record, rowIndex) =>
            //   rowIndex === warnaRow ? "warnacolompilih" : null
            // }
          >
            <Column
              title="Tanggal"
              width="10%"
              render={(listCatatanPasien) => (
                <span>
                  {dayjs(listCatatanPasien.tanggal).format("DD-MM-YYYY HH:mm")}
                  <br></br>
                  <br></br>
                  {listCatatanPasien.waktu === "P"
                    ? "Pagi"
                    : listCatatanPasien.waktu === "S"
                    ? "Sore"
                    : listCatatanPasien.waktu === "M"
                    ? "Malam"
                    : "-"}
                  <br></br>
                  <br></br>
                  {listCatatanPasien.namaRuang}
                </span>
              )}
            />
            <Column
              title="Subjek"
              key="reg"
              width="15%"
              render={(listCatatanPasien) => (
                <span>{listCatatanPasien.subjek}</span>
              )}
            />
            <Column
              title="Objek"
              key="reg"
              width="15%"
              render={(listCatatanPasien) => (
                <span>{listCatatanPasien.catatan}</span>
              )}
            />
            <Column
              title="Assesmen"
              key="reg"
              width="15%"
              render={(listCatatanPasien) => (
                <span>{listCatatanPasien.assesmen}</span>
              )}
            />
            <Column
              title="Planning"
              key="reg"
              width="15%"
              render={(listCatatanPasien) => (
                <span>{listCatatanPasien.planing}</span>
              )}
            />
            <Column
              title="Implementasi"
              key="reg"
              width="15%"
              render={(listCatatanPasien) => (
                <span>{listCatatanPasien.implementasi}</span>
              )}
            />
            <Column
              title="Evaluasi"
              key="reg"
              width="15%"
              render={(listCatatanPasien) => (
                <span>{listCatatanPasien.evaluasi}</span>
              )}
            />
            <Column
              title="User"
              key="reg"
              width="5%"
              render={(listCatatanPasien) => (
                <span>{listCatatanPasien.userId}</span>
              )}
            />
            <Column
              title="Aksi"
              key="reg"
              width="5%"
              render={(listCatatanPasien) => (
                <span>
                  <Popconfirm
                    title="Apa yakin mau dihapus?"
                    onConfirm={() =>
                      deleteCatatan(listCatatanPasien.id, curpasRI.registrasiId)
                    }
                    onCancel={() => console.log("Batal hapus")}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button size="small" type="primary" danger>
                      Hapus
                    </Button>
                  </Popconfirm>
                  <Button
                    size="small"
                    style={{ backgroundColor: "green", color: "white" }}
                    onClick={() => {
                      setTanggalcatatan(listCatatanPasien.tanggal);
                      setCatatan(listCatatanPasien.catatan);
                      setidCatatan(listCatatanPasien.id);
                      setsubjekC(listCatatanPasien.subjek);
                      setassesmentC(listCatatanPasien.assesmen);
                      setplanningC(listCatatanPasien.planing);
                      setimplementasiC(listCatatanPasien.implementasi);
                      setevaluasiC(listCatatanPasien.evaluasi);
                      setwaktu(listCatatanPasien.waktu);
                      setkatonCatatan(false);
                    }}
                  >
                    Edit
                  </Button>
                </span>
              )}
            />
          </Table>
        </Col>
        <Col span={24}></Col>
      </Row>

      <Modal
        width="70%"
        footer={null}
        open={katonCatatan}
        // onCancel={() => {
        //   setkatonCatatan(false);
        // }}
        style={{ top: 10 }}
        // centered={true}
        closable={false}
      >
        <Row gutter={[3, 3]}>
          <Col span={24}>
            <Form.Item
              {...formItemLayout}
              label="Waktu"
              style={{ marginBottom: 5 }}
            >
              <Input.Group compact>
                <Select
                  showSearch
                  style={{ width: "30%" }}
                  placeholder="..."
                  optionFilterProp="children"
                  onChange={(e) => {
                    setwaktu(e);
                    e === "P" ? setkirimcppt(true) : setkirimcppt(false);
                  }}
                  value={waktu}
                  filterOption={(input, option) =>
                    option.children
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  <Option value="P">Pagi</Option>
                  <Option value="S">Sore</Option>
                  <Option value="M">Malam</Option>
                </Select>
                <DatePicker
                  value={tanggalCatatan}
                  onChange={onTglCatatan}
                  style={{ width: "70%" }}
                  format={dateFormat}
                  showTime
                />
              </Input.Group>
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Subjek"
              style={{ marginBottom: 5 }}
            >
              <TextArea
                value={subjekC}
                rows={4}
                placeholder="..."
                onChange={(e) => {
                  setsubjekC(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Objek"
              style={{ marginBottom: 5 }}
            >
              <TextArea
                value={catatan}
                rows={4}
                placeholder="..."
                onChange={(e) => {
                  setCatatan(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Assesment"
              style={{ marginBottom: 5 }}
            >
              <TextArea
                value={assesmentC}
                rows={4}
                placeholder="..."
                onChange={(e) => {
                  setassesmentC(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Planning"
              style={{ marginBottom: 5 }}
            >
              <TextArea
                value={planningC}
                rows={4}
                placeholder="..."
                onChange={(e) => {
                  setplanningC(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Implementasi"
              style={{ marginBottom: 5 }}
            >
              <TextArea
                value={implementasiC}
                rows={4}
                placeholder="..."
                onChange={(e) => {
                  setimplementasiC(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="Evaluasi"
              style={{ marginBottom: 5 }}
            >
              <TextArea
                value={evaluasiC}
                rows={4}
                placeholder="..."
                onChange={(e) => {
                  setevaluasiC(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col span={24} style={{ textAlign: "right" }}>
            <Form.Item>
              <Space>
                <Switch
                  checked={kirimcppt}
                  checkedChildren="Buat CPPT"
                  unCheckedChildren="Catatan"
                  onChange={(e) => {
                    if (e === true) {
                      setkirimcppt(true);
                      console.log("Kirim cppt");
                    } else {
                      console.log("catatan biasa");
                      setkirimcppt(false);
                    }
                  }}
                />
                <Button onClick={onKembali}>Batal</Button>
                <Button type="primary" onClick={onSimpan}>
                  Simpan
                </Button>
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CatatanTambahan;
