import React, { useContext, useState } from "react";
import {
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
  Popconfirm,
  message,
} from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import { AskepContext } from "../../rawatinap/context/AskepContext";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context";
const { TextArea } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const CatatanTambahan = () => {
  const { pegawai } = useContext(LoginContext);
  const {
    insertCatatanPasien,
    listCatatanPasien,
    katonCatatan,
    setkatonCatatan,
    tanggalCatatan,
    setTanggalcatatan,
    catatan,
    setCatatan,
    idCatatan,
    userIdcatatan,
    getCatatanPasienById,
    deleteCatatan,
    katonBacaCatatan,
    setkatonBacaCatatan,
  } = useContext(AskepContext);
  const { curpas } = useContext(PasienContext);
  const dateFormat = "DD-MM-YYYY HH:mm";
  const { namauser } = useContext(LoginContext);
  const [warnaRow, setWarnaRow] = useState([]);
  const onKembali = () => {
    setkatonCatatan(false);
    setkatonBacaCatatan(false);
    // setBacaCatatan(false);
    //setKontrolForm(true);
    // setCetakForm(false);
  };
  const onModal = () => {
    pegawai !== null
      ? pegawai.slice(0, 1) === "D"
        ? message.warning(
            "Maaf Dokter Tidak Dapat Melakukan Pengisian Catatan Keperawatan"
          )
        : setkatonCatatan(true)
      : setkatonCatatan(true);

    //setKontrolForm(true);
    // setCetakForm(false);
  };
  const confirm = (id, regisid) => {
    deleteCatatan(id, regisid);
    //console.log(id, registrasiId, dx.slice(0, 6));
    //message.success('Click on Yes');
  };

  const cancel = (e) => {
    console.log(e);
  };
  const onTglCatatan = (date) => {
    setTanggalcatatan(date);
  };
  const onCatatan = (e) => {
    setCatatan(e.target.value);
  };
  const dataCatatan = {
    id: idCatatan === "" || null || [] ? 0 : idCatatan,
    registrasiId: curpas.registrasiId,
    pasienId: curpas.pasienId,
    ruangId: curpas.ruangId,
    tanggal: dayjs(tanggalCatatan).format("YYYY-MM-DDTHH:mm"),
    catatan: catatan,
    userId: namauser,
  };
  const onSimpan = () => {
    insertCatatanPasien(dataCatatan);
    console.log(dataCatatan);
  };
  const onAmbilCatatanById = (e) => {
    console.log(e);
    setkatonBacaCatatan(true);
    getCatatanPasienById(e);
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
            onRow={(record, rowIndex) => {
              return {
                onClick: (e) => {
                  onAmbilCatatanById(record.id);
                  setWarnaRow(rowIndex);
                },
              };
            }}
            bordered
            locale={{
              emptyText: <Empty description="Data Implementasi Kosong" />,
            }}
            pagination={false}
            dataSource={listCatatanPasien}
            size="small"
            rowKey="reg"
            rowClassName={(record, rowIndex) =>
              rowIndex === warnaRow ? "warnacolompilih" : null
            }
          >
            <Column
              title="Tanggal"
              width="10%"
              render={
                (listCatatanPasien) => (
                  // <Button style={{ width: '2%' }} type="link" size="small"
                  // onClick={() => onAmbilAskepByIdByDx(ListAskepById.registrasiId, ListAskepById.diagnosaId, ListAskepById.luaranId)}
                  // >
                  <span>
                    {dayjs(listCatatanPasien.tanggal).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                    <br></br>
                    <br></br>
                    {listCatatanPasien.namaRuang}
                  </span>
                )
                // </Button>
              }
            />
            <Column
              title="Katarengan"
              key="reg"
              width="80%"
              render={(listCatatanPasien) => (
                <span>{listCatatanPasien.catatan}</span>
              )}
            />
            <Column
              title="User"
              key="reg"
              width="10%"
              render={(listCatatanPasien) => (
                <span>{listCatatanPasien.userId}</span>
              )}
            />
            {/* <Column title="Aksi" width="20%"
                            render={(listCatatanPasien) => (
                                <Popconfirm
                                    title="Anda Yakin Akan Dihapus?"
                                    onConfirm={() => confirm(listCatatanPasien.id, listCatatanPasien.registrasiId)}
                                    onCancel={cancel}
                                    okText="Ya"
                                    cancelText="Tidak"
                                >
                                    <Button type='primary' danger>
                                        Hapus
                            </Button>
                                </Popconfirm>
                            )}
                        /> */}
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

      <Modal
        closable={false}
        footer={null}
        visible={katonCatatan}
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
              <DatePicker
                disabled
                //onFocus={onfocustgl}
                value={tanggalCatatan}
                onChange={onTglCatatan}
                style={{ width: "100%" }}
                format={dateFormat}
                showTime
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              {...formItemLayout}
              label="Catatan"
              style={{ marginBottom: 5 }}
            >
              <TextArea rows={4} placeholder="..." onChange={onCatatan} />
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
                <Button type="primary" onClick={onSimpan}>
                  Simpan
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
        visible={katonBacaCatatan}
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
              <DatePicker
                disabled={true}
                //onFocus={onfocustgl}
                value={tanggalCatatan}
                //onChange={onTglCatatan}
                style={{ width: "100%" }}
                format={dateFormat}
                showTime
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              {...formItemLayout}
              label="Catatan"
              style={{ marginBottom: 5 }}
            >
              <TextArea
                rows={4}
                placeholder="..."
                disabled={true}
                value={catatan}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              {...formItemLayout}
              label="User"
              style={{ marginBottom: 5 }}
            >
              <Input placeholder="..." disabled={true} value={userIdcatatan} />
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
                <Button onClick={onKembali}>Batal</Button>
                <Popconfirm
                  title="Anda Yakin Akan Dihapus?"
                  onConfirm={() => confirm(idCatatan, curpas.registrasiId)}
                  onCancel={cancel}
                  okText="Ya"
                  cancelText="Tidak"
                >
                  <Button type="primary" danger>
                    Hapus
                  </Button>
                </Popconfirm>
                {/* <Button >Hapus Semua</Button> */}
              </Space>
            </Form.Item>
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default CatatanTambahan;
