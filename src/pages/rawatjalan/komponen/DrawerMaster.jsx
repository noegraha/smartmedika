import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Drawer,
  Empty,
  Table,
  Tabs,
  Row,
  Col,
  Typography,
  Space,
  Tree,
} from "antd";
import { DownOutlined } from "@ant-design/icons";
import Iframe from "react-iframe";
import { PasienContext } from "../context/PasienContext";
import RiwayatOrder from "../orderresep/RiwayatOrder";
import { HasilRadiologiContext } from "../context/HasilRadiologiContext";
import { HasilLabContext } from "../context/HasilLabContext";
import { ResepContext } from "../orderresep/ResepContext";
import ButtonPRMRJ from "./ButtonPRMRJ";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
const { TabPane } = Tabs;
const { Column } = Table;
const { Text, Title } = Typography;

const DetailpasienMaster = () => {
  const {
    riwayatpenyakit,
    riwayatpemeriksaan,
    riwayatpasien,
    detailRiwayatPenyakit,
    detailRiwayatPemeriksaan,
    detailRiwayatPasien,
    pasienid,
  } = useContext(PasienContext);
  const { getPrintRm02, getPrintRm13, printRm02, printRm13 } =
    useContext(PrintOutContext);
  const [visible, setVisible] = useState(false);
  const norm = sessionStorage.getItem("norm");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");
  const [tampil, setTampil] = useState(false);
  const [riwayat, setRiwayat] = useState(true);
  const { GetHasilRadiologiByNoreg, hasilRisByNoreg } = useContext(
    HasilRadiologiContext
  );
  const {
    getListOpByPasienIdnNOreg,
    listOpinNoreg,
    getListLabByNOreg,
    listPkbyNoreg,
  } = useContext(HasilLabContext);
  const {
    getPrintHasilOp,
    printHasilOp,
    setprintHasilOp,
    getPrintLabPk,
    printLabPk,
    setprintLabPk,
  } = useContext(PrintOutContext);
  const { getRiwayatObat } = useContext(ResepContext);
  const [URLNoreg, setURLNoreg] = useState("");

  // const handleCariSelect = (e) => {
  //   setURL(e);
  // };
  const showDrawer = () => {
    setVisible(true);
    detailRiwayatPasien(pasienid);
    // listHasilLabPK();
    getRiwayatObat(pasienid);
    console.log(pasienid);
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
    getListLabByNOreg(pasienid, e);
    GetHasilRadiologiByNoreg(pasienid, e);
    getPrintRm02(pasienid, e);
    getPrintRm13(pasienid, e, "riwayat");
    console.log(pasienid, e);

    // listHasilLabPKbyNoreg(e);
    // GetHasilRadiologiByNoreg(norm);
  };
  return (
    <div>
      <Button onClick={showDrawer} type="primary">
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
        visible={visible}
      >
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
                    dataIndex="registrasiId"
                    width="90px"
                    className="bgcolor fontkecil"
                  />
                  <Column
                    title="Tanggal"
                    dataIndex="tanggalMasuk"
                    width="80px"
                    key="pasienId"
                    className="fontkecil"
                  />
                  <Column
                    title="Kode ICD"
                    dataIndex="diagnosaId"
                    width="80px"
                    key="pasienId"
                    className="fontkecil"
                  />
                  <Column
                    title="Penyakit"
                    dataIndex="diagnosaDesk"
                    width="300px"
                    key="pasienId"
                    className="fontkecil"
                  />
                  <Column
                    title="Kasus"
                    dataIndex="kasusIcd"
                    width="50px"
                    key="pasienId"
                    className="fontkecil"
                  />
                </Table>
              </TabPane>
              <TabPane tab="Resep Pasien" key="2">
                <RiwayatOrder />
              </TabPane>
              <TabPane tab="Hasil Lab" key="3">
                <Row>
                  <Col span={3}>
                    <Space direction="vertical">
                      <Title
                        level={5}
                        style={{ marginBottom: "0", marginTop: "0" }}
                      >
                        {namaPasien}
                      </Title>
                      <Text code style={{ marginBottom: "0", marginTop: "0" }}>
                        {pasienid}
                      </Text>
                      <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
                        onSelect={(e) => {
                          e[0].search("LI") >= 0
                            ? getPrintLabPk(norm, e[0])
                            : getPrintLabPk(
                                norm,
                                listPkbyNoreg[
                                  listPkbyNoreg
                                    .map((c) => c.registrasiId)
                                    .indexOf(e[0])
                                ].listNoLab[
                                  listPkbyNoreg[
                                    listPkbyNoreg
                                      .map((c) => c.registrasiId)
                                      .indexOf(e[0])
                                  ].listNoLab.length - 1
                                ].labNomor
                              );
                        }}
                        treeData={listPkbyNoreg.map((b) => ({
                          title: b.registrasiId,
                          key: b.registrasiId,
                          children: b.listNoLab.map((c) => ({
                            title: c.labNomor,
                            key: c.labNomor,
                          })),
                        }))}
                      />
                    </Space>
                  </Col>
                  <Col span={21}>
                    <Iframe
                      url={printLabPk}
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
              {/* <TabPane tab="Rawat Inap" key="4">
                <RiwayatRawatInap />
              </TabPane> */}
              <TabPane tab="Hasil Radiologi" key="5">
                <Row>
                  <Col span={3}>
                    <Space direction="vertical">
                      <Title
                        level={5}
                        style={{ marginBottom: "0", marginTop: "0" }}
                      >
                        {namaPasien}
                      </Title>
                      <Text code style={{ marginBottom: "0", marginTop: "0" }}>
                        {pasienid}
                      </Text>
                      <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
                        onSelect={(e) => {
                          // console.log(e[0].length === 10 ? 'benar' : 'salah')
                          e[0].length === 10
                            ? setURLNoreg(
                                hasilRisByNoreg[
                                  hasilRisByNoreg
                                    .map((c) => c.registrasiId)
                                    .indexOf(e[0])
                                ].listLink[0].urlExpertise
                              )
                            : setURLNoreg(e[0]);
                        }}
                        treeData={hasilRisByNoreg.map((b) => ({
                          title: b.registrasiId,
                          key: b.registrasiId,
                          children: b.listLink.map((c) => ({
                            title: c.fotoNumber,
                            key: c.urlExpertise,
                          })),
                        }))}
                      />
                    </Space>
                  </Col>
                  <Col span={21}>
                    <Iframe
                      url={URLNoreg}
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
              <TabPane tab="Pemeriksaan" key="6">
                <Table
                  dataSource={riwayatpemeriksaan}
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
                    title="Tanggal"
                    dataIndex="tanggalPemeriksaan"
                    width="80px"
                    key="pasienId"
                    className="fontkecil"
                  />
                  <Column
                    title="Bagian"
                    dataIndex="ruangDesk"
                    key="pasienId"
                    className="fontkecil"
                  />
                  <Column
                    title="Jenis Pemeriksaan"
                    dataIndex="pelayananDesk"
                    width="300px"
                    key="pasienId"
                    className="fontkecil"
                  />
                </Table>
              </TabPane>
              <TabPane tab="Laporan OP" key="7">
                <Row>
                  <Col span={24}>
                    {/* <Title level={4}>Data RM 02 Pasien</Title> */}
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
                        {pasienid}
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
              </TabPane>
              <TabPane tab="RM02" key="8">
                <Row>
                  <Col span={24}>
                    <Text keyboard>Data RM 02 Pasien</Text>
                  </Col>
                  <Col span={24}>
                    <Iframe
                      url={printRm02}
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

export default DetailpasienMaster;
