import React, { useContext } from "react";
import {
  Card,
  Col,
  Descriptions,
  Form,
  Input,
  Row,
  Modal,
  Select,
  InputNumber,
  TimePicker,
} from "antd";
import { IBSContext } from "./context/IBSContext";
import { LoginContext } from "../../rawatjalan/context/LoginContext";
import KondisiTerakhir from "./KondisiTerakhir";

import dayjs from "dayjs";
import "dayjs/locale/id";

const DetailAjuanOP = (props) => {
  const {
    dokterSp,
    cariAjuanOP,
    tindakanOP,
    tindakanPenyerta,
    detailAjuan,
    setDetailAjuan,
    simpanAjuan,
    spin,
  } = useContext(IBSContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");

  const [form] = Form.useForm();

  const dateFormat = ["DD-MM-YYYY", "DD-MM-YYYY", "YYYY-MM-DD"];

  const format = "HH:mm";

  const modalOK = () => {
    const datapost = {
      noJadwal: detailAjuan.jadwalOperasiId,
      registrasiId: detailAjuan.registrasiId,
      kodeBangsal: detailAjuan.ruangId,
      dxPraBedah: detailAjuan.kodeDxPraBedah,
      persetujuan: detailAjuan.acceptable,
      pelayananId: detailAjuan.pelayananId,
      lokasiOperasi: detailAjuan.lokasiOperasi,
      tindakanPenyertaId: detailAjuan.tindakanPenyertaId,
      jenisAnestesi: detailAjuan.jenisAnestesi,
      dokterId: detailAjuan.op1,
      kodeOperator2: detailAjuan.op2,
      kodeAnestesi: detailAjuan.kodeAnestesi,
      ruangOperasi: detailAjuan.ruangOperasi,
      jam: dayjs(detailAjuan.jam).format(format),
      catatan: detailAjuan.catatanIbs,
      nolaporan: null,
      batal: null,
      userId: namauser,
      clientHost: host,
      clientIP: ip,
    };

    console.log("DATAPOST", datapost);
    // alert('TOMBOL SIMPAN DIKLIK');
    simpanAjuan(datapost);
    props.setmodal(false);
    cariAjuanOP(props.tglop, props.cito);
  };

  const modalClose = () => {
    props.setmodal(false);
    alert("TOMBOL BATAL DIKLIK");
  };

  const submitForm = () => {
    console.log("SUBMIT");
  };

  // useEffect(() => {
  //     cariTindakan();
  // }, [])

  return (
    <div>
      <Modal
        title="Ajuan Jadwal Operasi"
        centered
        visible={props.showmodal}
        onOk={() => modalOK()}
        onCancel={() => modalClose()}
        width={1000}
        maskClosable={false}
        closable={false}
        okText="Simpan"
        cancelText="Batal"
      >
        {/* <Space direction="vertical" size="small"> */}

        {/* <p>{detailAjuan.op1}</p>
                <p>{detailAjuan.pelayananId + ' ' + detailAjuan.pelayanan}</p> */}

        <Descriptions title="Data Pasien" size="small" bordered>
          <Descriptions.Item label="No. Reg">
            {detailAjuan.registrasiId}
          </Descriptions.Item>
          <Descriptions.Item label="No. Pasien">
            <b>{detailAjuan.pasienId}</b>
          </Descriptions.Item>
          <Descriptions.Item label="Nama Pasien">
            <b>{detailAjuan.nama}</b>
          </Descriptions.Item>
          <Descriptions.Item label="Alamat">
            {detailAjuan.alamat}
          </Descriptions.Item>
          <Descriptions.Item label="Ibu Kandung">
            {detailAjuan.namaIbu}
          </Descriptions.Item>
          <Descriptions.Item label="Penanggung Jawab">
            {detailAjuan.penanggungJawab}
          </Descriptions.Item>
          <Descriptions.Item label="Tgl. Masuk" span={2}>
            {dayjs(detailAjuan.tglRegistrasi).format(dateFormat[1])}
          </Descriptions.Item>
          <Descriptions.Item label="Umur">{detailAjuan.umur}</Descriptions.Item>
          <Descriptions.Item label="Pembayaran">
            {detailAjuan.pembayaran}
          </Descriptions.Item>
          <Descriptions.Item label="Jenis Kelamin">
            {detailAjuan.jenisKelamin}
          </Descriptions.Item>
        </Descriptions>

        <Card style={{ marginTop: 10 }}>
          <Form form={form} layout="vertical" size="small">
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item label="Tindakan">
                  <Input value={detailAjuan.pelayanan} readOnly />
                </Form.Item>
                <Form.Item label="Tgl Operasi">
                  <Input
                    value={dayjs(detailAjuan.tglTindakan).format(dateFormat[1])}
                    readOnly
                  />
                </Form.Item>
                <Form.Item label="Status Cito">
                  <Input value={detailAjuan.cito} readOnly />
                </Form.Item>
                <Form.Item label="DPJP">
                  <Input value={detailAjuan.dokter} readOnly />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item label="Jns Anestesi">
                  <Select
                    showSearch
                    placeholder="Jenis Anestesi"
                    onChange={(e) => {
                      setDetailAjuan({ ...detailAjuan, jenisAnestesi: e });
                    }}
                    value={detailAjuan.jenisAnestesi}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option value="Lokal Anestesi">
                      Lokal Anestesi
                    </Select.Option>
                    <Select.Option value="General Anestesi">
                      General Anestesi
                    </Select.Option>
                    <Select.Option value="Regional Anestesi">
                      Regional Anestesi
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Dx Pra-Bedah">
                  <Input value={detailAjuan.dxPraBedah} readOnly />
                </Form.Item>
                <Form.Item label="Lokasi OP">
                  <Input value={detailAjuan.lokasiOperasi} readOnly />
                </Form.Item>
                <Form.Item label="Keterangan">
                  <Input value={detailAjuan.keterangan} readOnly />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>

        <KondisiTerakhir />

        <Card>
          <Form
            form={form}
            layout="vertical"
            size="small"
            onFinish={submitForm}
          >
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  label="Persetujuan"
                  required
                  tooltip="Disetujui/ Ditolak"
                  rules={detailAjuan.acceptable}
                >
                  <Select
                    autoFocus
                    onChange={(e) =>
                      setDetailAjuan({ ...detailAjuan, acceptable: e })
                    }
                    value={detailAjuan.acceptable}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    <Select.Option key="Disetujui" value="Disetujui">
                      Disetujui
                    </Select.Option>
                    <Select.Option key="Ditolak" value="Ditolak">
                      Ditolak
                    </Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item label="Tindakan" required tooltip="Tindakan Operasi">
                  <Select
                    showSearch
                    // onFocus={cariTindakan}
                    placeholder="Pilih Tindakan"
                    value={detailAjuan.pelayananId}
                    onChange={(e) => {
                      setDetailAjuan({ ...detailAjuan, pelayananId: e });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {tindakanOP.map((td) => (
                      <Select.Option
                        key={td.pelayananId}
                        value={td.pelayananId}
                      >
                        {td.deskripsi}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Tindakan Penyerta"
                  tooltip="Tindakan Penyerta Operasi"
                >
                  <Select
                    showSearch
                    // onFocus={cariTindakanPenyerta}
                    placeholder="Pilih Tindakan"
                    value={detailAjuan.tindakanPenyertaId}
                    onChange={(e) => {
                      setDetailAjuan({ ...detailAjuan, tindakanPenyertaId: e });
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {tindakanPenyerta.map((tdp) => (
                      <Select.Option
                        key={tdp.pelayananId}
                        value={tdp.pelayananId}
                      >
                        {tdp.deskripsi}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item
                      label="No Kamar"
                      required
                      tooltip="No Kamar Operasi"
                    >
                      <InputNumber
                        min={1}
                        max={10}
                        style={{ width: "100%" }}
                        value={detailAjuan.ruangOperasi}
                        onChange={(e) => {
                          setDetailAjuan({ ...detailAjuan, ruangOperasi: e });
                        }}
                      />
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item
                      label="Jam Operasi"
                      required
                      tooltip="Jam Operasi"
                    >
                      <TimePicker
                        format={format}
                        style={{ width: "100%" }}
                        value={detailAjuan.jam}
                        onChange={(e) => {
                          setDetailAjuan({ ...detailAjuan, jam: e });
                        }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Col>
              <Col span={12}>
                <Form.Item label="Operator" required>
                  <Select
                    showSearch
                    placeholder="Operator"
                    // onFocus={cariDokterSpesialis}
                    onChange={(e) => {
                      setDetailAjuan({ ...detailAjuan, op1: e });
                    }}
                    loading={spin}
                    value={detailAjuan.op1}
                  >
                    {dokterSp.map((dr) =>
                      detailAjuan.op2 === dr.dokterId ? (
                        <Select.Option
                          key={dr.dokterId}
                          value={dr.dokterId}
                          disabled
                        >
                          {dr.namaDokter}
                        </Select.Option>
                      ) : (
                        <Select.Option key={dr.dokterId} value={dr.dokterId}>
                          {dr.namaDokter}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label="Operator 2">
                  <Select
                    showSearch
                    placeholder="Operator 2"
                    disabled={detailAjuan.op1 ? false : true}
                    onChange={(e) => {
                      setDetailAjuan({ ...detailAjuan, op2: e });
                    }}
                    value={detailAjuan.op2}
                  >
                    <Select.Option value=""></Select.Option>
                    {dokterSp.map((dr) =>
                      detailAjuan.op1 === dr.dokterId ? (
                        <Select.Option
                          key={dr.dokterId}
                          value={dr.dokterId}
                          disabled
                        >
                          {dr.namaDokter}
                        </Select.Option>
                      ) : (
                        <Select.Option key={dr.dokterId} value={dr.dokterId}>
                          {dr.namaDokter}
                        </Select.Option>
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label="Anestesi" required>
                  <Select
                    showSearch
                    placeholder="Perawat Anestesi"
                    // onFocus={cariDokterSpesialis}
                    onChange={(e) => {
                      setDetailAjuan({ ...detailAjuan, kodeAnestesi: e });
                    }}
                    value={detailAjuan.kodeAnestesi}
                  >
                    {dokterSp.map((dr) =>
                      dr.spesialisId === 110 ? (
                        <Select.Option key={dr.dokterId} value={dr.dokterId}>
                          {dr.namaDokter}
                        </Select.Option>
                      ) : (
                        ""
                      )
                    )}
                  </Select>
                </Form.Item>
                <Form.Item label="Catatan" tooltip="Catatan">
                  <Input.TextArea
                    showCount
                    maxLength={300}
                    value={detailAjuan.catatanIbs}
                    onChange={(e) => {
                      setDetailAjuan({
                        ...detailAjuan,
                        catatanIbs: e.target.value,
                      });
                    }}
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Card>
      </Modal>
    </div>
  );
};

export default DetailAjuanOP;
