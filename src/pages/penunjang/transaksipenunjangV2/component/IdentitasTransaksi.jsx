import React, { useContext } from "react";
import {
  Card,
  Col,
  Row,
  Form,
  Input,
  Button,
  DatePicker,
  Tooltip,
  Modal,
  message,
  Space,
} from "antd";
import { SearchOutlined, SyncOutlined } from "@ant-design/icons";
import { TransaksiPenunjangContext } from "../context/TransaksiPenunjangContext";
import dayjs from "dayjs";
import LookupbyNoreg from "./LookupbyNoreg";
import "../style/styleLookupOrder.css";

const IdentitasTransaksi = () => {
  const {
    defaultNoTr,
    unitId,
    // main
    setNoOrder,
    noTransaksi,
    setNoTransaksi,
    pasienId,
    setPasienId,
    namaPasien,
    setNamaPasien,
    jenisPasien,
    setJenisPasien,
    jam,
    setJam,
    deskUnitAsalId,
    setDeskUnitAsalId,
    deskKelasRawat,
    setDeskKelasRawat,
    namaDokter,
    setNamaDokter,
    setListBillPmr,
    LookupRegistrasi,
    // spin
    spinAll,
    // disable
    disNoTransaksi,
    setdisNoTransaksi,
    // modal
    mdLookupRegistrasi,
    setmdLookupRegistrasi,
  } = useContext(TransaksiPenunjangContext);

  const resetNoTr = () => {
    setNoTransaksi(defaultNoTr);
    setNoOrder("");
    setPasienId("");
    setNamaPasien("");
    setJenisPasien("");
    setJam(dayjs());
    setDeskUnitAsalId("");
    setDeskKelasRawat("");
    setNamaDokter("");
    setListBillPmr([]);
    setdisNoTransaksi(false);
  };

  const klikSatu = () => {
    if (!unitId) {
      Modal.error({
        title: "Perhatian!",
        content: "Pilih Unit Pelayanan Terlebih Dahulu!",
      });
    } else if (noTransaksi.length < 4) {
      Modal.error({
        title: "Perhatian!",
        content: "No Transaksi minimal 4 digit untuk mencari!",
      });
    } else {
      // setmdLookupRegistrasi(true)
      LookupRegistrasi(noTransaksi);
    }
  };

  return (
    <div>
      {/* <Card
                loading={spinAll}>
            </Card> */}
      <Row>
        <Col span="12">
          <span>No.Registrasi : </span>
          <br />
          <Space>
            <Input
              value={noTransaksi}
              onChange={(e) => setNoTransaksi(e.target.value)}
              disabled={disNoTransaksi}
              size="small"
              style={{ width: "100%" }}
            />
            <Tooltip title="Cari">
              <Button onClick={() => klikSatu()} type="primary" size="small">
                <SearchOutlined />
              </Button>
            </Tooltip>
            <Tooltip title="Reset">
              <Button type="primary" onClick={() => resetNoTr()} size="small">
                <SyncOutlined />
              </Button>
            </Tooltip>
          </Space>
          {/* <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 19 }}
                            labelAlign='left'>
                            <Form.Item
                                label="No.Registrasi"
                                style={{ marginBottom: "0px" }}>
                                
                            </Form.Item>
                        </Form> */}

          <Row>
            <Col span={12}>
              <span>No.RM :</span>
              <br />
              <Input
                value={pasienId}
                placeholder="Medical Record"
                size="small"
                style={{ width: "98%" }}
              />
              {/* <Form
                                    labelCol={{ span: 9 }}
                                    wrapperCol={{ span: 14 }}
                                    labelAlign='left'>
                                    <Form.Item
                                        label="No.RM"
                                        style={{ width: '100%', marginBottom: "0px" }}>
                                        
                                    </Form.Item>
                                </Form> */}
            </Col>
            <Col span={12}>
              <span>Tanggal :</span>
              <br />
              <Tooltip title="Registrasi">
                <Input
                  type="text"
                  value={dayjs(jam).format("DD/MM/YYYY")}
                  size="small"
                  style={{ width: "98%" }}
                />
              </Tooltip>
              {/* <Form
                                    labelCol={{ span: 7 }}
                                    wrapperCol={{ span: 16 }}
                                    labelAlign='left'>
                                    <Form.Item
                                        label="Tanggal"
                                        style={{ marginBottom: "0px", width: '100%' }}>
                                        
                                    </Form.Item>
                                </Form> */}
            </Col>
          </Row>

          <span>Nama Pasien :</span>
          <br />
          <Input
            value={namaPasien}
            placeholder="Nama Pasien"
            size="small"
            style={{ width: "99%" }}
          />
          {/* <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 19 }}
                            labelAlign='left'>
                            <Form.Item
                                label="Nama Pasien"
                                style={{ marginBottom: "0px" }}>
                                
                            </Form.Item>
                        </Form> */}

          <span>Perusahaan :</span>
          <Input
            value={jenisPasien}
            placeholder="Perusahaan"
            size="small"
            style={{ width: "99%" }}
          />
          {/* <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 19 }}
                            labelAlign='left'>
                            <Form.Item
                                label="Perusahaan"
                                style={{ marginBottom: "0px" }}>
                                <Input
                                    value={jenisPasien}
                                    placeholder='Perusahaan'
                                    size='small'
                                    style={{ width: '100%', marginRight: '5px', marginLeft: '10px' }} />
                            </Form.Item>
                        </Form> */}
        </Col>

        <Col
          span="12"
          // style={{ backgroundColor: 'silver' }}
        >
          <Row>
            <Col span={12}>
              <span>Waktu :</span>
              <br />
              <Input
                placeholder="Waktu"
                size="small"
                style={{ width: "98%" }}
              />
              {/* <Form
                                labelCol={{ span: 5 }}
                                wrapperCol={{ span: 16 }}
                                labelAlign='left'>
                                <Form.Item
                                    label="Waktu"
                                    style={{ width: '100%', marginBottom: "0px" }}>
                                    
                                </Form.Item>
                            </Form> */}
            </Col>
            <Col span={12}>
              <span>No.Urut :</span>
              <br />
              <Input placeholder="No.Urut" size="small" />
              {/* <Form
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 17 }}
                                labelAlign='left'>
                                <Form.Item
                                    label="No.Urut"
                                    style={{ width: '100%', marginBottom: "0px" }}>
                                    
                                </Form.Item>
                            </Form> */}
            </Col>
          </Row>

          <span>No.Urut :</span>
          <br />
          <Input
            value={deskUnitAsalId}
            placeholder="Pelayanan"
            size="small"
            style={{ width: "100%" }}
          />
          {/* <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        labelAlign='left'>
                        <Form.Item
                            label="Pelayanan"
                            style={{ marginBottom: "0px" }}>
                            
                        </Form.Item>
                    </Form> */}

          <Row>
            <Col span={12}>
              <span>Kelas :</span>
              <br />
              <Input
                value={deskKelasRawat}
                placeholder="Kelas"
                size="small"
                style={{ width: "98%" }}
              />
              {/* <Form
                                labelCol={{ span: 4 }}
                                wrapperCol={{ span: 16 }}
                                labelAlign='left'>
                                <Form.Item
                                    label="Kelas"
                                    style={{ width: '100%', marginBottom: "0px" }}>
                                    
                                </Form.Item>
                            </Form> */}
            </Col>
            <Col span={12}>
              <span>Jatah Kelas :</span>
              <br />
              <Input
                placeholder="Jatah Kelas"
                size="small"
                style={{ width: "100%" }}
              />
              {/* <Form
                                labelCol={{ span: 6 }}
                                wrapperCol={{ span: 17 }}
                                labelAlign='left'>
                                <Form.Item
                                    label="Jatah Kelas"
                                    style={{ width: '100%', marginBottom: "0px" }}>

                                </Form.Item>
                            </Form> */}
            </Col>
          </Row>

          <span>Dokter :</span>
          <br />
          <Input
            value={namaDokter}
            placeholder="Dokter"
            size="small"
            style={{ width: "100%" }}
          />
          {/* <Form
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        labelAlign='left'>
                        <Form.Item
                            label="Dokter"
                            style={{ marginBottom: "0px" }}>

                        </Form.Item>
                    </Form> */}
        </Col>
      </Row>

      <Modal
        title="LookUp Registrasi"
        visible={mdLookupRegistrasi}
        closable={false}
        footer={null}
        width={1000}
        className="modal_lookuporder"
        style={{ top: "20px" }}
      >
        <LookupbyNoreg />
      </Modal>
    </div>
  );
};

export default IdentitasTransaksi;
