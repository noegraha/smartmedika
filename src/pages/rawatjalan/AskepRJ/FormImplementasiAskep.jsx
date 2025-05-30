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
  Card,
  message,
  Tabs,
} from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import CatatanTambahan from "./FormCatatanTambahan";
import { AskepContext } from "../../rawatinap/context/AskepContext";
import { LoginContext } from "../context";
import { PasienContext } from "../context/PasienContext";

// import { Date } from 'core-js';
const { TextArea } = Input;
const { Option } = Select;
const { TabPane } = Tabs;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const FormImplementasiAskep = () => {
  const { pegawaiId, pegawai } = useContext(LoginContext);
  const { curpas } = useContext(PasienContext);
  const [katonImplementasi2, setKatonImplementasi2] = useState(false);
  const {
    // tanggal, settanggal,
    diagnosaId,
    // setdiagnosaId, nTandaGejala, insertEmrAskep, settargetWaktu, targetWaktu,
    // setnTandaGejala, nIntervensi, setnIntervensi, nKriteria, setnKriteria, getListAskepById, ListAskepById,getAskepByIdByDx,
    registrasiId,
    //  deleteAskpeByIdByDx,getListImplementasiByIdByDx,
    ImplementasiByIdByDx,
    implementasiId,
    setImplementasiId,
    insertImplementasiAskep,
    ListImplementasiById,
    tanggalImplementasi,
    settanggalImplementasi,
    deleteImplementasiById,
    getImplementasiByIdImplementasi,
    IdImplementasi,
    keteranganImplementasi,
    setketeranganImplementasi,
    listImplementasiByIdDiagnosa,
    katonImplementasi,
    setkatonImplementasi,
    diagnosaDeskripsi,
    // listdataaskep, dataaskepid, targetWaktu,  luaranId, setluaranId, setregistrasiId,settargetWaktu,setluaranId,AskepByIdByDx,
  } = useContext(AskepContext);
  const { namauser } = useContext(LoginContext);
  const [hiddendelete, sethiddendelete] = useState(true);
  const dateFormat = "DD-MM-YYYY HH:mm";
  // const onAmbilIdDxImplementasi = (id, dx) => {
  //     getAskepByIdByDx(id, dx.slice(0, 6));
  //     getListImplementasiByIdByDx(id, dx.slice(0, 6));
  //     console.log('ini luarannya cuk', id, dx.slice(0, 6));
  //     sethiddendelete(true);
  //     //getImplementasiByIdBDx(id, dx.slice(0, 6));
  // }
  const onImplementasi = (value) => {
    setImplementasiId(value);
  };
  const onTglImplementasi = (date) => {
    settanggalImplementasi(date);
  };
  const onKeteranganImplementasi = (e) => {
    setketeranganImplementasi(e.target.value);
  };
  const dataImplementasi = {
    id: 0,
    registrasiId: registrasiId,
    ruangId: curpas.ruangId,
    diagnosaId: diagnosaId,
    implementasiId: implementasiId,
    tanggal: dayjs(tanggalImplementasi).format("YYYY-MM-DDTHH:mm"),
    //keterangan: keteranganImplementasi,
    userId: namauser,
  };
  const onSimpanImplementasi = () => {
    implementasiId == ""
      ? message.warning("Pilih Imlementasi Pasien Terebih Dahulu")
      : insertImplementasiAskep(dataImplementasi);
    console.log("datasimpanimplementasi", dataImplementasi);
  };
  const onHapusImplementasi = () => {
    deleteImplementasiById(registrasiId, IdImplementasi);
    console.log(
      "data implmentasi yng mau di hapus",
      registrasiId,
      IdImplementasi
    );
  };
  const onAmbilImplementasi = (id) => {
    getImplementasiByIdImplementasi(id);
    console.log(id);
    sethiddendelete(false);
  };
  const onKembali = () => {
    setkatonImplementasi(false);
    setKatonImplementasi2(false);
    setImplementasiId([]);
    settanggalImplementasi(dayjs());
    //setKontrolForm(true);
    // setCetakForm(false);
  };
  const onModal = () => {
    diagnosaDeskripsi === ""
      ? message.warning("Silahkan Pilih Diagnosa Terlebih Dahulu")
      : pegawai !== null
      ? pegawai.slice(0, 1) === "D"
        ? message.warning(
            "Maaf Dokter Tidak Dapat Melakukan Pengisian Implementasi Keperawatan"
          )
        : setkatonImplementasi(true)
      : setkatonImplementasi(true);
    //setKontrolForm(true);
    // setCetakForm(false);
  };
  const onModal2 = () => {
    setKatonImplementasi2(true);
    //setKontrolForm(true);
    // setCetakForm(false);
  };
  const confirm = (id, registrasiId, dx) => {
    deleteImplementasiById(id, registrasiId, dx.split(" -").shift());
    console.log(id, registrasiId, dx.split(" -").shift());
    //message.success('Click on Yes');
  };

  const cancel = (e) => {
    console.log(e);
  };
  return (
    <div>
      <Card
        title="Implementasi Berdasarkan Diagnosa"
        headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Space>
              <Button
                type="primary"
                onClick={onModal}
                style={{ backgroundColor: "green" }}
              >
                Tambah Implementasi
              </Button>
              {/* <Button type='primary' onClick={onModal2}>Tambah Catatan</Button> */}
            </Space>
          </Col>

          <Col span={24}>
            <Table
              bordered
              locale={{
                emptyText: <Empty description="Data Implementasi Kosong" />,
              }}
              pagination={{ pageSize: 5 }}
              dataSource={listImplementasiByIdDiagnosa}
              size="small"
              rowKey="reg"
            >
              <Column
                title="Tanggal"
                key="reg"
                width="20%"
                defaultSortOrder="descend"
                sorter={(a, b) => a.tanggal.localeCompare(b.tanggal)}
                render={(listImplementasiByIdDiagnosa) =>
                  // <Button style={{ width: '2%' }} type="link" size="small"
                  //     onClick={() => onAmbilImplementasi(ImplementasiByIdByDx.id)}
                  // >
                  dayjs(listImplementasiByIdDiagnosa.tanggal).format(
                    "DD-MM-YYYY HH:mm"
                  )
                  // </Button>
                }
              />
              <Column
                title="Diagnosa"
                key="reg"
                width="30%"
                render={(listImplementasiByIdDiagnosa) => (
                  <span>
                    {listImplementasiByIdDiagnosa.diagnosaId.split("- ").pop()}
                  </span>
                )}
              />
              <Column
                title="Implementasi"
                key="reg"
                width="20%"
                render={(listImplementasiByIdDiagnosa) => (
                  <span>
                    {listImplementasiByIdDiagnosa.implementasiId
                      .split("- ")
                      .pop()}
                  </span>
                )}
              />
              <Column
                title="User"
                key="reg"
                width="10%"
                render={(listImplementasiByIdDiagnosa) => (
                  <span>{listImplementasiByIdDiagnosa.userId}</span>
                )}
              />
              <Column
                title="Aksi"
                width="10%"
                render={(listImplementasiByIdDiagnosa) => (
                  <Popconfirm
                    title="Anda Yakin Akan Dihapus?"
                    onConfirm={() =>
                      confirm(
                        listImplementasiByIdDiagnosa.id,
                        listImplementasiByIdDiagnosa.registrasiId,
                        listImplementasiByIdDiagnosa.diagnosaId
                      )
                    }
                    onCancel={cancel}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button
                      type="primary"
                      danger
                      hidden={
                        listImplementasiByIdDiagnosa.userId.toUpperCase() ===
                        namauser.toUpperCase()
                          ? false
                          : true
                      }
                    >
                      Hapus
                    </Button>
                  </Popconfirm>
                )}
              />
            </Table>
          </Col>
          <Col span={24}>
            {/* <Card title='Input Implementasi Baru' headStyle={{ fontWeight: "bolder", backgroundColor: 'beige' }}
                        size="small"
                        style={{
                            borderWidth: "2px",
                            borderColor: "darkgray",
                            borderRadius: "4px",
                        }}> */}

            {/* </Card> */}
          </Col>
        </Row>
      </Card>

      <br></br>
      {/* <Card title='Tanda Vital Dan EWS' headStyle={{ fontWeight: "bolder", backgroundColor: 'lavenderblush' }}
                size="small"
                style={{
                    borderWidth: "2px",
                    borderColor: "darkgray",
                    borderRadius: "4px",
                }}>

                <Tabs defaultActiveKey="1" onChange={(key) => {

                }}>
                    <TabPane tab="Tanda Vital" key="1">
                        <FormTandaVital />
                    </TabPane>
                    <TabPane tab="EWS" key="2">
                        <FormEWS />
                    </TabPane>
                </Tabs>

            </Card> */}

      <br></br>
      <Card
        title="Catatan Tambahan Pasien"
        headStyle={{ fontWeight: "bolder", backgroundColor: "cornsilk" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <CatatanTambahan />
      </Card>

      <Modal
        closable={false}
        footer={null}
        visible={katonImplementasi}
        onCancel={onKembali}
        width="70%"
        centered={true}
      >
        <Row gutter={[3, 3]}>
          <Col span={24}>
            <Alert
              message={"DIAGNOSA:     " + diagnosaDeskripsi}
              style={{ fontWeight: "bold" }}
              type="warning"
              span={24}
            />
          </Col>
          <Col span={24}>
            <Form.Item
              {...formItemLayout}
              label="Tanggal"
              style={{ marginBottom: 5 }}
            >
              <DatePicker
                //onFocus={onfocustgl}
                value={tanggalImplementasi}
                onChange={onTglImplementasi}
                style={{ width: "100%" }}
                format={dateFormat}
                showTime
                disabled
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              {...formItemLayout}
              label="Implementasi"
              style={{ marginBottom: 5 }}
            >
              <Select
                //onFocus={onfocusdiagnosa}
                value={implementasiId}
                showSearch
                source={ImplementasiByIdByDx}
                onChange={onImplementasi}
                // tokenSeparators={[',']}
                placeholder="..."
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
              >
                {ImplementasiByIdByDx.map((b) => (
                  <Option key={b.implementasiId}>{b.deskripsi}</Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          {/* <Col span={20}>
                        <Form.Item {...formItemLayout} label="Implementasi" style={{ marginBottom: 5 }} onChange={onKeteranganImplementasi}>
                            <TextArea rows={2} placeholder="..." />
                        </Form.Item>
                    </Col> */}
          <Col span={24} style={{ textAlign: "right" }}>
            <Form.Item>
              <Space>
                <Button type="primary" onClick={onSimpanImplementasi}>
                  Simpan
                </Button>
                <Button
                  danger
                  type="primary"
                  onClick={onHapusImplementasi}
                  hidden={hiddendelete}
                >
                  Hapus
                </Button>
                <Button onClick={onKembali}>Batal</Button>

                {/* <Button >Hapus Semua</Button> */}
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Modal>
      <Modal
        closable={false}
        footer={null}
        visible={katonImplementasi2}
        onCancel={onKembali}
        width="70%"
        centered={true}
      >
        <Row gutter={[3, 3]}>
          <Col span={24}>
            <Form.Item
              {...formItemLayout}
              label="Tanggal"
              style={{ marginBottom: 5 }}
            >
              {/* <DatePicker
                                //onFocus={onfocustgl}
                                value={tanggalImplementasi}
                                onChange={onTglImplementasi}
                                style={{ width: '100%' }}
                                format={dateFormat}
                                showTime
                            /> */}
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              {...formItemLayout}
              label="Implementasi"
              style={{ marginBottom: 5 }}
            >
              {/* <Select
                                //onFocus={onfocusdiagnosa}
                                //value={diagnosaId}
                                showSearch
                                source={ImplementasiByIdByDx}
                                onChange={onImplementasi}
                                // tokenSeparators={[',']}
                                placeholder="..."
                                filterOption={(input, option) =>
                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                }
                            >
                                {ImplementasiByIdByDx.map(b => (
                                    <Option key={b.implementasiId}>{b.deskripsi}</Option>
                                ))}
                            </Select> */}
            </Form.Item>
          </Col>
          {/* <Col span={20}>
                        <Form.Item {...formItemLayout} label="Implementasi" style={{ marginBottom: 5 }} onChange={onKeteranganImplementasi}>
                            <TextArea rows={2} placeholder="..." />
                        </Form.Item>
                    </Col> */}
          <Col span={24} style={{ textAlign: "right" }}>
            <Form.Item>
              <Space>
                <Button type="primary">Simpan</Button>
                <Button onClick={onKembali}>Batal</Button>

                {/* <Button >Hapus Semua</Button> */}
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default FormImplementasiAskep;
