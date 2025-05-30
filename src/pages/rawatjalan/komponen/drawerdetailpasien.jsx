import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Descriptions,
  Drawer,
  Empty,
  Table,
  Tabs,
  Select,
  Row,
  Col,
  Typography,
  Space,
  Tree,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import Iframe from "react-iframe";
import { PasienContext } from "../context/PasienContext";
import Formhasillab from "./FormHasilLabKlinik";
import RiwayatOrder from "../orderresep/RiwayatOrder";
import { HasilRadiologiContext } from "../context/HasilRadiologiContext";
import { HasilLabContext } from "../context/HasilLabContext";
import { ResepContext } from "../orderresep/ResepContext";
import ButtonPRMRJ from "./ButtonPRMRJ";
import FormViewLaporanOp from "./FormLaporanOP";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import dayjs from "dayjs";
const { TabPane } = Tabs;
const { Column } = Table;
const { Option } = Select;
const { Text, Link, Title } = Typography;

const Detailpasien = () => {
  const {
    curpas,
    riwayatpenyakit,
    riwayatpemeriksaan,
    riwayatpasien,
    detailRiwayatPenyakit,
    detailRiwayatPemeriksaan,
    detailRiwayatPasien,
  } = useContext(PasienContext);
  const [visible, setVisible] = useState(false);
  const norm = sessionStorage.getItem("norm");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");
  const [tampil, setTampil] = useState(false);
  const [riwayat, setRiwayat] = useState(true);
  const {
    hasilradiologi,
    GetHasilRadiologiByNoreg,
    hasilRisByNoreg,
    sethasilRisByNoreg,
  } = useContext(HasilRadiologiContext);
  const {
    listHasilLabPK,
    getListOpByPasienIdnNOreg,
    listOpinNoreg,
    listHasilLabPKbyNoreg,
    getListLabByNOreg,
    listPkbyNoreg,
  } = useContext(HasilLabContext);
  const {
    printHasilOp,
    setprintHasilOp,
    printLabPk,
    setprintLabPk,
    getPrintRm02,
    getPrintRm13,
    printRm02,
    printRm13,
    getPrintRm02Kunjungan,
    printRm02Kunjungan,
    getPrintCPPTRI,
    printCPPTRI,
    getPrintPerawatIGD,
    getPrintDokterIGD,
    printPerawatIGD,
    printDokterIGD,
    getPrintCPPTRIwayat,
    setprintCPPTRIwayat,
    printCPPTRIwayat,
  } = useContext(PrintOutContext);
  const { getRiwayatObat } = useContext(ResepContext);
  const [URLNoreg, setURLNoreg] = useState("");

  // const handleCariSelect = (e) => {
  //   setURL(e);
  // };
  const showDrawer = () => {
    setVisible(true);
    detailRiwayatPasien(norm);
    // listHasilLabPK();
    getRiwayatObat(norm);
  };
  const onClose = () => {
    setVisible(false);
    setTampil(false);
    setRiwayat(true);
  };
  const onKembali = () => {
    setRiwayat(true);
    setTampil(false);
    setURLNoreg("");
    setprintLabPk("");
    setprintHasilOp("");
  };
  const onAmbilRiwayat = (e) => {
    detailRiwayatPenyakit(e);
    detailRiwayatPemeriksaan(e);
    setTampil(true);
    setRiwayat(false);
    getListOpByPasienIdnNOreg(e);
    getListLabByNOreg(norm, e);
    GetHasilRadiologiByNoreg(norm, e);
    getPrintRm02Kunjungan(norm, e);
    getPrintRm13(norm, e, "riwayat");
    getPrintCPPTRIwayat(e);
    getPrintPerawatIGD(e);
    getPrintDokterIGD(e);

    // listHasilLabPKbyNoreg(e);
    // GetHasilRadiologiByNoreg(norm);
  };
  return (
    <div>
      <Button size="small" onClick={showDrawer} type="primary">
        Detail Pasien
      </Button>
      <Drawer
        headerStyle={{
          paddingLeft: 12,
          paddingBottom: 6,
          paddingRight: 12,
          paddingTop: 6,
          fontWeight: "bolder",
          backgroundColor: "papayawhip",
        }}
        bodyStyle={{
          paddingLeft: 12,
          paddingBottom: 6,
          paddingRight: 12,
          paddingTop: 6,
        }}
        title={<div style={{ fontWeight: "bolder" }}>Detail Pasien</div>}
        width="50%"
        placement="right"
        closable={false}
        onClose={onClose}
        open={visible}
      >
        <Descriptions
          size="small"
          column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 2, xs: 1 }}
          bordered
        >
          <Descriptions.Item label="No Registrasi" style={{ paddingBottom: 1 }}>
            {curpas.registrasiId}
          </Descriptions.Item>
          <Descriptions.Item label="No Pasien" style={{ paddingBottom: 1 }}>
            {curpas.pasienId}
          </Descriptions.Item>
          <Descriptions.Item
            label="Tanggal Registrasi"
            style={{ paddingBottom: 1 }}
          >
            {curpas.tanggalMasuk}
          </Descriptions.Item>
          <Descriptions.Item
            label="Nama Pasien"
            span={2}
            style={{ paddingBottom: 1 }}
          >
            {curpas.namaPasien}
          </Descriptions.Item>
          <Descriptions.Item label="Jenis Kelamin" style={{ paddingBottom: 1 }}>
            {curpas.jenisKelamin}
          </Descriptions.Item>
          <Descriptions.Item
            label="Alamat"
            span={2}
            style={{ paddingBottom: 1 }}
          >
            {curpas.alamat}
          </Descriptions.Item>
          <Descriptions.Item label="Tanggal Lahir" style={{ paddingBottom: 1 }}>
            {curpas.tanggalLahir}
          </Descriptions.Item>
          <Descriptions.Item label="Umur" style={{ paddingBottom: 1 }}>
            {curpas.umur === null || curpas.umur === undefined
              ? null
              : curpas.umur +
                " Tahun " +
                curpas.umurBulan +
                " Bulan " +
                curpas.umurHari +
                " Hari"}
          </Descriptions.Item>
          <Descriptions.Item label="No Telpon" style={{ paddingBottom: 1 }}>
            {curpas.noTelephone}
          </Descriptions.Item>
          <Descriptions.Item label="Nama Ibu" style={{ paddingBottom: 1 }}>
            {curpas.namaIbu}
          </Descriptions.Item>
          <Descriptions.Item label="Pembayaran" style={{ paddingBottom: 1 }}>
            {curpas.namaPembayaran}
          </Descriptions.Item>
          <Descriptions.Item label="No Penjamin" style={{ paddingBottom: 1 }}>
            {curpas.noPolish}
          </Descriptions.Item>
          <Descriptions.Item
            label="Kelas Perawatan RJ"
            style={{ paddingBottom: 1 }}
          >
            {curpas.kelasRawat}
          </Descriptions.Item>
        </Descriptions>
        <Card
          style={{ marginTop: 5 }}
          size="small"
          title="Riwayat Pasien"
          headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
          extra={<ButtonPRMRJ />}
        >
          {riwayat ? (
            <Table
              dataSource={riwayatpasien}
              size="small"
              bordered
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={"Silahkan Pilih Pasien Terlebih Dahulu"}
                  />
                ),
              }}
            >
              <Column
                title="Reg"
                key="reg"
                dataIndex="RegistrasiId"
                width="90px"
                className="bgcolor fontkecil"
              />
              <Column
                title="Tanggal"
                dataIndex="TanggalMasuk"
                width="80px"
                key="pasienId"
                className="fontkecil"
              />
              <Column
                title="Ruang"
                dataIndex="RuangDeskripsi"
                width="80px"
                key="pasienId"
                className="fontkecil"
              />
              <Column
                title="Kode ICD"
                dataIndex="DiagnosisId"
                width="80px"
                key="pasienId"
                className="fontkecil"
              />
              <Column
                title="Penyakit"
                dataIndex="Deskripsi"
                width="200px"
                key="pasienId"
                className="fontkecil"
              />
              <Column
                title="Action"
                width="60px"
                className="fontkecil"
                render={(riwayatpasien) => (
                  <span>
                    <Button
                      size="small"
                      type="primary"
                      onClick={(e) =>
                        onAmbilRiwayat(riwayatpasien.RegistrasiId)
                      }
                    >
                      Detail
                    </Button>
                  </span>
                )}
              />
            </Table>
          ) : null}
          {tampil === true ? (
            <Tabs
              size="small"
              type="card"
              defaultActiveKey="1"
              tabBarExtraContent={
                <Button size="small" type="primary" danger onClick={onKembali}>
                  Kembali
                </Button>
              }
            >
              <TabPane tab="Penyakit" key="1">
                <Table
                  dataSource={riwayatpenyakit}
                  size="small"
                  rowKey="reg"
                  scroll={{ y: 470 }}
                  bordered
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={"Silahkan Pilih Pasien Terlebih Dahulu"}
                      />
                    ),
                  }}
                >
                  <Column
                    title="Reg"
                    key="reg"
                    dataIndex="RegistrasiId"
                    width="90px"
                    className="bgcolor fontkecil"
                  />
                  <Column
                    title="Tanggal"
                    dataIndex="TanggalMasuk"
                    width="80px"
                    className="fontkecil"
                    render={(text) => {
                      const formattedDate = dayjs(text).format(
                        "DD/MM/YYYY HH:mm:ss"
                      );
                      return formattedDate;
                    }}
                  />
                  <Column
                    title="Kode ICD"
                    dataIndex="DiagnosaId"
                    width="80px"
                    className="fontkecil"
                  />
                  <Column
                    title="Penyakit"
                    dataIndex="DiagnosaDesk"
                    width="300px"
                    className="fontkecil"
                  />
                  <Column
                    title="Kasus"
                    dataIndex="KasusIcd"
                    width="50px"
                    className="fontkecil"
                  />
                </Table>
              </TabPane>
              <TabPane tab="Resep Pasien" key="2">
                <RiwayatOrder />
              </TabPane>
              <TabPane tab="Pemeriksaan" key="6">
                <Table
                  dataSource={riwayatpemeriksaan}
                  size="small"
                  rowKey="reg"
                  scroll={{ x: 100, y: 470 }}
                  bordered
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={"Silahkan Pilih Pasien Terlebih Dahulu"}
                      />
                    ),
                  }}
                >
                  <Column
                    title="Reg"
                    width="90px"
                    className="bgcolor"
                    dataIndex="registrasiId"
                  />
                  <Column
                    title="Tanggal"
                    dataIndex="tanggalPemeriksaan"
                    width="80px"
                    render={(text) => {
                      const formattedDate = dayjs(text).format("DD/MM/YYYY");
                      return formattedDate;
                    }}
                  />
                  <Column
                    title="Bagian"
                    dataIndex="ruangDesk"
                    key="pasienId"
                    className="fontkecil"
                  />
                  <Column title="ID Pemeriksaan" dataIndex="pelayananId" />
                  <Column
                    title="Jenis Pemeriksaan"
                    dataIndex="pelayananDesk"
                    width="300px"
                    key="pasienId"
                    className="fontkecil"
                  />
                </Table>
              </TabPane>
              {/* <TabPane tab="Laporan OP" key="7">
                <Row>
                  <Col span={24}>
                    <Text keyboard>Data Hasil Operasi Pasien</Text>
                  </Col>
                  <Col span={3}>
                    <Space direction="vertical">
                      <Title
                        level={5}
                        style={{ marginBottom: "0", marginTop: "0" }}
                      >
                        {namaPasien}
                      </Title>
                      <Text code style={{ marginBottom: "0", marginTop: "0" }}>
                        {norm}
                      </Text>
                      <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
                        onSelect={(e) => {
                          getPrintHasilOp(norm, e[0]);
                        }}
                        treeData={listOpinNoreg.map((b) => ({
                          title: b.registrasiId,
                          key: b.registrasiId,
                          children: b.listLink.map((c) => ({
                            title: c.laporanOperasiId,
                            key: c.laporanOperasiId,
                          })),
                        }))}
                      />
                    </Space>
                  </Col>
                  <Col span={21}>
                    <Iframe
                      url={printHasilOp}
                      width="100%"
                      height="750px"
                      id="myId"
                      className="myClassname"
                      display="initial"
                      position="relative"
                    />
                  </Col>
                </Row>
              </TabPane> */}
              <TabPane tab="RM 01" key="11">
                <Row>
                  <Col span={24}>
                    <Tabs
                      size="small"
                      type="card"
                      defaultActiveKey="1"
                      tabBarExtraContent={
                        <Button
                          size="small"
                          type="primary"
                          danger
                          onClick={onKembali}
                        >
                          Kembali
                        </Button>
                      }
                    >
                      <TabPane tab="Catatan Dokter IGD" key="1a">
                        {" "}
                        <Iframe
                          url={printDokterIGD}
                          width="100%"
                          height="750px"
                          id="myId"
                          className="myClassname"
                          display="initial"
                          position="relative"
                        />
                      </TabPane>
                      <TabPane tab="Catatan Perawat IGD" key="1b">
                        {" "}
                        <Iframe
                          url={printPerawatIGD}
                          width="100%"
                          height="750px"
                          id="myId"
                          className="myClassname"
                          display="initial"
                          position="relative"
                        />
                      </TabPane>
                    </Tabs>
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="RM02" key="8">
                <Row>
                  <Col span={24}>
                    <Text keyboard>Data RM 02 Pasien</Text>
                  </Col>
                  <Col span={24}>
                    <Iframe
                      url={printRm02Kunjungan}
                      width="100%"
                      height="750px"
                      id="myId"
                      className="myClassname"
                      display="initial"
                      position="relative"
                    />
                  </Col>
                </Row>
              </TabPane>

              <TabPane tab="CPPT" key="10">
                <Row>
                  <Col span={24}>
                    <Text keyboard>CPPT Rawat Inap</Text>
                  </Col>
                  <Col span={24}>
                    <Iframe
                      url={printCPPTRIwayat}
                      width="100%"
                      height="750px"
                      id="myId"
                      className="myClassname"
                      display="initial"
                      position="relative"
                    />
                  </Col>
                </Row>
              </TabPane>
              <TabPane tab="RM13" key="9">
                <Row>
                  <Col span={24}>
                    <Text keyboard>Data RM 13 Pasien</Text>
                  </Col>
                  <Col span={24}>
                    <Iframe
                      url={printRm13}
                      width="100%"
                      height="750px"
                      id="myId"
                      className="myClassname"
                      display="initial"
                      position="relative"
                    />
                  </Col>
                </Row>
              </TabPane>
            </Tabs>
          ) : null}
        </Card>
      </Drawer>
    </div>
  );
};

export default Detailpasien;
