import React, { useContext, useState } from "react";
import {
  Descriptions,
  Col,
  Input,
  Card,
  Button,
  Table,
  Empty,
  DatePicker,
  Row,
  Space,
  Form,
  Modal,
} from "antd";
import Iframe from "react-iframe";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import { LogBookAskepContext } from "../master/context/masteraskep/LogBookAskepContext";
import { MasterPegawaiContext } from "../master/context/masterpegawai/MasterPegawaiContext";
import { LoginContext } from "../rawatjalan/context";
const { Search } = Input;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const ListLogBookUser = () => {
  const [idCariPegawai, setidCariPegawaii] = useState("%20");
  const [bulan, setbulan] = useState("");
  const [modalview, setmodalview] = useState(false);
  const { signOut, namauser } = useContext(LoginContext);
  const dateFormat = "MM-YYYY";
  const {
    listLogBook,
    getListLogBook,
    loading,
    setloading,
    getLogBok,
    logboklist,
  } = useContext(LogBookAskepContext);
  const {
    pegawailist,
    getListPegawaisSkey,
    pegawaidetail,
    getPegawaiById,
    warnaPilih,
    setwarnaPilih,
  } = useContext(MasterPegawaiContext);
  let page = 1;
  return (
    <div>
      <Row>
        <Col span={12}>
          <Card
            title="Data Pegawai"
            headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
            size="small"
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Row gutter={[2, 2]}>
              <Col span={24}>
                {/* <Button disabled={jamsekarang < jaminput ? false : true}>
                  {jaminput, '-', jamsekarang, '-', umur}
                </Button> */}
                <Form.Item
                  {...formItemLayout}
                  style={{ width: "100%", marginBottom: 5 }}
                  label="Pilih Pegawai"
                >
                  <Search
                    placeholder="Ketikan Nama Pegawai"
                    onSearch={(e) => getListPegawaisSkey(e)}
                    enterButton
                  />
                </Form.Item>
              </Col>
            </Row>
            <Table
              bordered
              locale={{ emptyText: <Empty description="Data Asuhan Kosong" /> }}
              pagination={{
                pageSize: 5,
              }}
              dataSource={pegawailist}
              size="small"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    getPegawaiById(record.PegawaiId);
                    setwarnaPilih(rowIndex);
                    setidCariPegawaii(record.PegawaiId);
                    console.log(record.PegawaiId);
                  }, // click row
                };
              }}
              rowClassName={(record, rowIndex) =>
                rowIndex === warnaPilih ? "bgcolorsuccess" : null
              }
            >
              <Column
                title="No"
                key="reg"
                className="tabeltabel2"
                width="5%"
                render={(text, record, index) => (
                  <span>{(page - 1) * 10 + index + 1}</span>
                )}
              />
              <Column
                title="Id Pegawai"
                width="10%"
                render={(pegawailist) => <span>{pegawailist.PegawaiId}</span>}
              />
              <Column
                title="NIP"
                width="20%"
                render={(pegawailist) => <span>{pegawailist.NIP}</span>}
              />
              <Column
                title="Nama Lengkap"
                width="40%"
                render={(pegawailist) => <span>{pegawailist.Nama}</span>}
              />
              <Column
                title="Golongan"
                width="10%"
                render={(pegawailist) => (
                  <span>{pegawailist.PangkatGolongan}</span>
                )}
              />
              <Column
                title="Pangkat"
                width="15%"
                render={(pegawailist) => <span>{pegawailist.Deskripsi}</span>}
              />
            </Table>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            size="small"
            style={{ margin: 3 }}
            title="Informasi Pegawai"
            headStyle={{ fontWeight: "bold", fontSize: "14" }}
          >
            <Descriptions bordered size="small">
              <Descriptions.Item label="ID Pegawai">
                {pegawaidetail.PegawaiId}
              </Descriptions.Item>
              <Descriptions.Item label="NIP" span={3}>
                {pegawaidetail.NIP}
              </Descriptions.Item>
              <Descriptions.Item label="Nama" span={3}>
                {pegawaidetail.Nama}
              </Descriptions.Item>
              <Descriptions.Item label="NIK">
                {pegawaidetail.NIK}
              </Descriptions.Item>
              <Descriptions.Item label="Golongan">
                {pegawaidetail.PangkatGolongan}
              </Descriptions.Item>
              <Descriptions.Item label="Pangkat">
                {pegawaidetail.Deskripsi}
              </Descriptions.Item>
              <Descriptions.Item label="Jenis Kelamin">
                {pegawaidetail.JenisKelamin === "L" ? "Laki-Laki" : "Perempuan"}
              </Descriptions.Item>
              <Descriptions.Item label="Alamat" span={3}>
                {pegawaidetail.Alamat}
              </Descriptions.Item>
            </Descriptions>
          </Card>
        </Col>
      </Row>

      <Card
        title="Log Book Perawat"
        headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row gutter={[2, 2]}>
          {/* <Col span={15}> */}
          {/* <Button disabled={jamsekarang < jaminput ? false : true}>
                  {jaminput, '-', jamsekarang, '-', umur}
                </Button> */}
          {/* <Form.Item
              {...formItemLayout}
              style={{ width: "100%", marginBottom: 5 }}
              label="Pilih Pegawai"
            >
              <Input
                style={{ width: "90%" }}
                onChange={(e) => setIdcari(e.target.value)}
                placeholder="Masukkan Id Pegawai..."
              />
            </Form.Item> */}
          {/* </Col> */}
          <Col span={18}>
            <Form.Item
              {...formItemLayout}
              style={{ width: "100%", marginBottom: 5 }}
              label="Pilih Bulan"
            >
              <DatePicker
                style={{ width: "100%" }}
                placeholder="..."
                picker="month"
                format={dateFormat}
                onChange={(e) => {
                  setbulan(dayjs(e).format("MM-YYYY"));
                }}
              />
            </Form.Item>
          </Col>

          <Col span={6}>
            <Space>
              <Button
                type="primary"
                onClick={() => {
                  getListLogBook(
                    idCariPegawai,
                    bulan.split("-").shift(),
                    bulan.split("-").pop()
                  );
                  console.log(
                    idCariPegawai,
                    bulan.split("-").shift(),
                    bulan.split("-").pop()
                  );
                }}
              >
                Lihat
              </Button>
              <Button
                onClick={() => {
                  setmodalview(true);
                  getLogBok(pegawaidetail.UserId.toUpperCase().trim(), bulan);
                  console.log(namauser.toUpperCase().trim(), bulan);
                }}
              >
                Export
              </Button>
            </Space>
          </Col>
        </Row>
        {/* <Input.Group compact>
          <Input
            style={{ width: "90%" }}
            onChange={(e) => setIdcari(e.target.value)}
            placeholder="Masukkan Id Pegawai..."
          />
          <DatePicker
            style={{ width: "100%" }}
            placeholder="..."
            picker="month"
            format={dateFormat}
            onChange={(e) => {
              setbulan(dayjs(e).format('MM-YYYY'));
            }}
          />
          <Button
            style={{ width: "10%" }}
            type="primary"
            onClick={() => console.log(idCari, bulan.split('-').shift(), bulan.split('-').pop())}
          >
            Cari
          </Button>
        </Input.Group> */}

        <Table
          bordered
          locale={{ emptyText: <Empty description="Data Asuhan Kosong" /> }}
          pagination={{
            pageSize: 50,
          }}
          scroll={{
            y: 240,
          }}
          dataSource={listLogBook}
          size="small"
        >
          <Column
            title="No"
            key="reg"
            className="tabeltabel2"
            width="5%"
            render={(text, record, index) => (
              <span>{(page - 1) * 10 + index + 1}</span>
            )}
          />
          <Column
            title="Tanggal"
            width="5%"
            render={(listLogBook) => (
              <span>
                {dayjs(listLogBook.Tanggal).format("DD-MM-YYYY HH:mm")}
              </span>
            )}
          />
          <Column
            title="No Registrasi"
            width="5%"
            render={(listLogBook) => <span>{listLogBook.RegistrasiId}</span>}
          />
          <Column
            title="Deskripsi Implementasi"
            width="40%"
            render={(listLogBook) => (
              <span>{listLogBook.DeskripsiImplementasi}</span>
            )}
          />
          <Column
            title="Butir Permenpan"
            width="40%"
            render={(listLogBook) => <span>{listLogBook.Deskripsi}</span>}
          />
          <Column
            title="Angka Kredit"
            width="5%"
            render={(listLogBook) => <span>{listLogBook.AngkaKredit}</span>}
          />
        </Table>
      </Card>

      <Modal
        open={modalview}
        footer={null}
        onOk={() => setmodalview(false)}
        onCancel={() => setmodalview(false)}
        width="70%"
        centered={true}
      >
        <Iframe
          onLoad={() => {
            setloading(false);
          }}
          url={logboklist}
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

export default ListLogBookUser;
