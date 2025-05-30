import React, { useContext, useState } from "react";
import {
  Button,
  Card,
  Empty,
  Table,
  Tabs,
  Row,
  Col,
  Typography,
  Space,
  Tree,
  Form,
  Select,
  Input,
  Divider,
  Badge,
  Skeleton,
  Collapse,
  Menu,
  Dropdown,
  Avatar,
  Alert,
} from "antd";
import {
  DownOutlined,
  FileTextOutlined,
  MedicineBoxOutlined,
  ExperimentOutlined,
  FileImageOutlined,
  UserOutlined,
  HistoryOutlined,
  MoreOutlined,
} from "@ant-design/icons";
import Iframe from "react-iframe";
import ButtonPRMRJ from "../rawatjalan/komponen/ButtonPRMRJ";
import { PrintOutContext } from "../PrintOutDokumen/PrintOutContext";
import { HasilLabContext } from "../rawatjalan/context/HasilLabContext";
import { HasilRadiologiContext } from "../rawatjalan/context/HasilRadiologiContext";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import RiwayatOrder from "../rawatjalan/orderresep/RiwayatOrder";
import ButtonRingkasanRJ from "./ButtonRingkasanRJ";
import DropdownLaborat from "../rawatjalan/komponen/DropdownLaborat";
import HasilRadiologi from "../rawatjalan/komponen/FormHasilRadiologi";

const { TabPane } = Tabs;
const { Column } = Table;
const { Text, Title } = Typography;
const { Option } = Select;
const { Panel } = Collapse;

const RiwayatPemeriksaan = () => {
  const {
    riwayatpenyakit,
    riwayatpemeriksaan,
    riwayatpasien,
    detailRiwayatPenyakit,
    detailRiwayatPemeriksaan,
    pasienid,
    detailPasien,
    loading,
  } = useContext(PasienContext);

  const namauser = sessionStorage.getItem("userId");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");

  const [viewaskep, setviewaskep] = useState("");
  const [noregpilih, setnoregpilih] = useState("");
  const [tampil, setTampil] = useState(false);
  const [riwayat, setRiwayat] = useState(true);
  const [activeTab, setActiveTab] = useState("1");
  const [activeDocument, setActiveDocument] = useState(null);
  const [searchText, setSearchText] = useState("");

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
    getPrintRm02,
    getPrintRm13,
    printRm02,
    printRm13,
    getPrintHasilOp,
    printHasilOp,
    setprintHasilOp,
    getPrintLabPk,
    printLabPk,
    setprintLabPk,
    getPrintTerimaPasien,
    getPrintAnamnesa,
    getPrintfisikRI,
    getPrintAssAske,
    getPrintRM11,
    getPrintAsuhan,
    getPrintKonsulRI,
    getPrintCatatanPerawat,
    printRm02Kunjungan,
    printCPPTRI,
    printDokterIGD,
    printPerawatIGD,
    printAnamnesa,
    printFirikRI,
    printAss,
    printRM11,
    printasuhan,
    printKonsulRI,
    printSBarPerawat,
    getPrintRm02Kunjungan,
    getPrintCPPTRI,
    getPrintDokterIGD,
    getPrintPerawatIGD,
    getPrintKala,
    printLapKala,
    setprintLapKala,
    loadDelay,
    setloadDelay,
    jenisKala,
    setjenisKala,
    getPrintCPPTRIwayat,
    setprintCPPTRIwayat,
    printCPPTRIwayat,
  } = useContext(PrintOutContext);

  const [URLNoreg, setURLNoreg] = useState("");

  // All document types grouped
  const documentTypes = {
    "medical-record": [
      { key: "rm02", title: "RM02", url: printRm02Kunjungan },
      { key: "cppt", title: "CPPT", url: printCPPTRIwayat },
      { key: "rm13", title: "RM 13", url: printRm13 },
    ],
    examination: [
      { key: "anamnesa", title: "Anamnesa RI", url: printAnamnesa },
      { key: "pemFisik", title: "Pemeriksaan Fisik RI", url: printFirikRI },
      { key: "assesment", title: "Assesment Askep RI", url: printAss },
      { key: "rm11", title: "RM 11", url: printRM11 },
    ],
    care: [
      { key: "askep", title: "Askep RI", url: printasuhan },
      { key: "konsul", title: "Konsul RI", url: printKonsulRI },
      {
        key: "catatanPerawat",
        title: "Catatan Perawat",
        url: printSBarPerawat,
      },
    ],
    emergency: [
      { key: "dokterIGD", title: "Catatan Dokter IGD", url: printDokterIGD },
      { key: "perawatIGD", title: "Catatan Perawat IGD", url: printPerawatIGD },
    ],
    childbirth: [
      {
        key: "kala1",
        title: "Kala 1",
        url: jenisKala === "1" ? printLapKala : "",
      },
      {
        key: "kala2",
        title: "Kala 2 dan 3",
        url: jenisKala === "2" ? printLapKala : "",
      },
      {
        key: "kala4",
        title: "Kala 4",
        url: jenisKala === "4" ? printLapKala : "",
      },
    ],
  };

  const onKembali = () => {
    setRiwayat(true);
    setTampil(false);
    setURLNoreg("");
    setprintLabPk("");
    setprintHasilOp("");
    setviewaskep("");
    setActiveDocument(null);
  };

  const fetchAllData = (registrationId) => {
    setloadDelay(true);
    setjenisKala("");
    setviewaskep(
      "http://182.168.0.119:8082/#/" + registrationId + "/" + namauser
    );

    detailRiwayatPenyakit(registrationId);
    detailRiwayatPemeriksaan(registrationId);
    getListOpByPasienIdnNOreg(registrationId);
    getListLabByNOreg(pasienid, registrationId);
    GetHasilRadiologiByNoreg(pasienid, registrationId);

    // Fetch all report data
    getPrintRm02Kunjungan(pasienid, registrationId);
    getPrintRm13(pasienid, registrationId, "riwayat");
    detailPasien(registrationId);
    getPrintTerimaPasien(pasienid, registrationId, "riwayat");
    getPrintAnamnesa(registrationId, "riwayat");
    getPrintfisikRI(registrationId, "1", "riwayat");
    getPrintAssAske(registrationId, "1", "riwayat");
    getPrintRM11(registrationId, "riwayat");
    getPrintAsuhan(registrationId, "1", "riwayat");
    getPrintKonsulRI(registrationId, "riwayat");
    getPrintCatatanPerawat(registrationId, "riwayat");
    getPrintDokterIGD(registrationId);
    getPrintPerawatIGD(registrationId);
    getPrintCPPTRIwayat(registrationId);

    setnoregpilih(registrationId);
    setTampil(true);
    setRiwayat(false);
    setloadDelay(false);
  };

  const onAmbilRiwayat = (registrationId) => {
    fetchAllData(registrationId);
  };

  const handleSelectLabDocument = (labId) => {
    if (labId.search("LI") >= 0) {
      getPrintLabPk(pasienid, labId);
    } else {
      const selectedReg = listPkbyNoreg.find(
        (reg) => reg.registrasiId === labId
      );
      if (selectedReg && selectedReg.listNoLab.length > 0) {
        const lastLabNumber =
          selectedReg.listNoLab[selectedReg.listNoLab.length - 1].labNomor;
        getPrintLabPk(pasienid, lastLabNumber);
      }
    }
    setActiveTab("lab");
  };

  const handleSelectRadiologyDocument = (docId) => {
    if (docId.length === 10) {
      const selectedReg = hasilRisByNoreg.find(
        (reg) => reg.registrasiId === docId
      );
      if (selectedReg && selectedReg.listLink.length > 0) {
        setURLNoreg(selectedReg.listLink[0].urlExpertise);
      }
    } else {
      setURLNoreg(docId);
    }
    setActiveTab("radiologi");
  };

  const handleSelectOperation = (opId) => {
    getPrintHasilOp(pasienid, opId);
    setActiveTab("operasi");
  };

  const handleChangeTab = (key) => {
    setActiveTab(key);
  };

  const handleSelectKala = (type) => {
    switch (type) {
      case "1":
        getPrintKala("KALA1", noregpilih);
        break;
      case "2":
        getPrintKala("KALA2", noregpilih);
        break;
      case "4":
        getPrintKala("KALA4", noregpilih);
        break;
      default:
        getPrintKala("");
    }
    setjenisKala(type);
    setActiveTab("persalinan");
  };

  const handleDocumentSelect = (docType, doc) => {
    setActiveDocument({ type: docType, ...doc });
    if (docType === "childbirth") {
      handleSelectKala(doc.key.replace("kala", ""));
    }
  };

  // Filter patients based on search text
  const filteredPatients = riwayatpasien.filter((patient) => {
    if (!searchText) return true;
    return (
      patient.RegistrasiId.toLowerCase().includes(searchText.toLowerCase()) ||
      (patient.TanggalMasuk &&
        patient.TanggalMasuk.toLowerCase().includes(
          searchText.toLowerCase()
        )) ||
      (patient.RuangDeskripsi &&
        patient.RuangDeskripsi.toLowerCase().includes(searchText.toLowerCase()))
    );
  });

  const DocumentMenu = () => {
    const menuItems = [];

    Object.entries(documentTypes).forEach(([category, docs]) => {
      const categoryTitle = {
        "medical-record": "Rekam Medis",
        examination: "Pemeriksaan",
        care: "Perawatan",
        emergency: "IGD",
        childbirth: "Persalinan",
      }[category];

      const items = docs.map((doc) => ({
        key: `${category}-${doc.key}`,
        label: doc.title,
        onClick: () => handleDocumentSelect(category, doc),
      }));

      menuItems.push({
        key: category,
        type: "group",
        label: categoryTitle,
        children: items,
      });
    });

    return (
      <Menu
        mode="inline"
        style={{ width: "100%", maxHeight: "600px", overflow: "auto" }}
        items={menuItems}
      />
    );
  };

  return (
    <div>
      <Card
        style={{ marginTop: 5 }}
        size="small"
        title={
          <Space>
            <HistoryOutlined />
            Riwayat Pasien
            {!riwayat && namaPasien && (
              <>
                <Divider type="vertical" />
                <Badge status="processing" />
                <Avatar size="small" icon={<UserOutlined />} />
                <Text strong>{namaPasien}</Text>
                <Text type="secondary">({pasienid})</Text>
              </>
            )}
          </Space>
        }
        headStyle={{ fontWeight: "bolder", backgroundColor: "#f5f8ff" }}
        extra={
          <Space>
            {!riwayat && (
              <Button size="small" type="primary" danger onClick={onKembali}>
                Kembali ke Daftar
              </Button>
            )}
            <DropdownLaborat />
            <HasilRadiologi />
            <ButtonRingkasanRJ />
            <ButtonPRMRJ />
          </Space>
        }
      >
        {/* Patient List View */}
        {riwayat && (
          <>
            <Row style={{ marginBottom: 16 }}>
              <Col span={24}>
                <Input.Search
                  placeholder="Cari berdasarkan No Registrasi, Tanggal atau Ruang"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  style={{ width: "100%" }}
                  allowClear
                />
              </Col>
            </Row>
            <Table
              loading={loading}
              dataSource={filteredPatients}
              size="small"
              bordered
              pagination={{ pageSize: 10, showSizeChanger: true }}
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
                title="Nomor Registrasi"
                key="reg"
                dataIndex="RegistrasiId"
                width="120px"
                sorter={(a, b) => a.RegistrasiId.localeCompare(b.RegistrasiId)}
              />
              <Column
                title="Tanggal Masuk RS"
                dataIndex="TanggalMasuk"
                width="120px"
                key="tanggalMasuk"
                sorter={(a, b) => a.TanggalMasuk.localeCompare(b.TanggalMasuk)}
              />
              <Column
                title="Ruang"
                dataIndex="RuangDeskripsi"
                width="150px"
                key="ruang"
                sorter={(a, b) =>
                  a.RuangDeskripsi.localeCompare(b.RuangDeskripsi)
                }
              />
              <Column
                title="Action"
                width="80px"
                render={(patient) => (
                  <Button
                    size="small"
                    type="primary"
                    onClick={() => onAmbilRiwayat(patient.RegistrasiId)}
                  >
                    Detail
                  </Button>
                )}
              />
            </Table>
          </>
        )}

        {/* Patient Detail View */}
        {tampil && (
          <Row gutter={[16, 16]}>
            {/* Left sidebar with navigation menu */}
            <Col xs={24} sm={24} md={8} lg={7} xl={6}>
              <div
                style={{
                  boxShadow: "0 1px 4px rgba(0,0,0,0.1)",
                  borderRadius: "4px",
                  marginBottom: "16px",
                }}
              >
                <Menu
                  mode="inline"
                  style={{ height: "100%" }}
                  selectedKeys={[activeTab]}
                  onClick={({ key }) => handleChangeTab(key)}
                >
                  <Menu.Item key="dokumen" icon={<FileTextOutlined />}>
                    Dokumen Medis
                  </Menu.Item>
                  <Menu.Item key="penyakit" icon={<MedicineBoxOutlined />}>
                    Penyakit & Pemeriksaan
                  </Menu.Item>
                  <Menu.Item key="lab" icon={<ExperimentOutlined />}>
                    Lab & Operasi
                  </Menu.Item>
                  <Menu.Item key="radiologi" icon={<FileImageOutlined />}>
                    Radiologi
                  </Menu.Item>
                  <Menu.Item key="resep" icon={<MedicineBoxOutlined />}>
                    Resep
                  </Menu.Item>
                </Menu>
              </div>

              {activeTab === "dokumen" && (
                <Card
                  title="Dokumen Medis"
                  size="small"
                  style={{ marginBottom: "16px" }}
                  bodyStyle={{ padding: "0" }}
                >
                  <Collapse
                    defaultActiveKey={["medical-record", "examination"]}
                  >
                    <Panel header="Rekam Medis" key="medical-record">
                      <Menu mode="vertical" style={{ border: "none" }}>
                        {documentTypes["medical-record"].map((doc) => (
                          <Menu.Item
                            key={doc.key}
                            onClick={() =>
                              handleDocumentSelect("medical-record", doc)
                            }
                            style={{ paddingLeft: 24 }}
                          >
                            {doc.title}
                          </Menu.Item>
                        ))}
                      </Menu>
                    </Panel>
                    <Panel header="Pemeriksaan" key="examination">
                      <Menu mode="vertical" style={{ border: "none" }}>
                        {documentTypes["examination"].map((doc) => (
                          <Menu.Item
                            key={doc.key}
                            onClick={() =>
                              handleDocumentSelect("examination", doc)
                            }
                            style={{ paddingLeft: 24 }}
                          >
                            {doc.title}
                          </Menu.Item>
                        ))}
                      </Menu>
                    </Panel>
                    <Panel header="Perawatan" key="care">
                      <Menu mode="vertical" style={{ border: "none" }}>
                        {documentTypes["care"].map((doc) => (
                          <Menu.Item
                            key={doc.key}
                            onClick={() => handleDocumentSelect("care", doc)}
                            style={{ paddingLeft: 24 }}
                          >
                            {doc.title}
                          </Menu.Item>
                        ))}
                      </Menu>
                    </Panel>
                    <Panel header="IGD" key="emergency">
                      <Menu mode="vertical" style={{ border: "none" }}>
                        {documentTypes["emergency"].map((doc) => (
                          <Menu.Item
                            key={doc.key}
                            onClick={() =>
                              handleDocumentSelect("emergency", doc)
                            }
                            style={{ paddingLeft: 24 }}
                          >
                            {doc.title}
                          </Menu.Item>
                        ))}
                      </Menu>
                    </Panel>
                    <Panel header="Persalinan" key="childbirth">
                      <Menu mode="vertical" style={{ border: "none" }}>
                        {documentTypes["childbirth"].map((doc) => (
                          <Menu.Item
                            key={doc.key}
                            onClick={() =>
                              handleDocumentSelect("childbirth", doc)
                            }
                            style={{ paddingLeft: 24 }}
                          >
                            {doc.title}
                          </Menu.Item>
                        ))}
                      </Menu>
                    </Panel>
                  </Collapse>
                </Card>
              )}

              {activeTab === "lab" && (
                <Card
                  title="Lab & Operasi"
                  size="small"
                  style={{ marginBottom: "16px" }}
                >
                  <Collapse defaultActiveKey={["1"]}>
                    <Panel header="Hasil Laboratorium" key="1">
                      <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
                        onSelect={(keys) => handleSelectLabDocument(keys[0])}
                        treeData={listPkbyNoreg.map((b) => ({
                          title: (
                            <Space>
                              <Badge status="processing" />
                              <Text>Reg: {b.registrasiId}</Text>
                            </Space>
                          ),
                          key: b.registrasiId,
                          children: b.listNoLab.map((c) => ({
                            title: `Lab: ${c.labNomor}`,
                            key: c.labNomor,
                          })),
                        }))}
                      />
                    </Panel>
                    <Panel header="Hasil Operasi" key="2">
                      <Tree
                        showLine
                        switcherIcon={<DownOutlined />}
                        onSelect={(keys) => handleSelectOperation(keys[0])}
                        treeData={listOpinNoreg.map((b) => ({
                          title: (
                            <Space>
                              <Badge status="processing" />
                              <Text>Reg: {b.registrasiId}</Text>
                            </Space>
                          ),
                          key: b.registrasiId,
                          children: b.listLink.map((c) => ({
                            title: `OP: ${c.laporanOperasiId}`,
                            key: c.laporanOperasiId,
                          })),
                        }))}
                      />
                    </Panel>
                  </Collapse>
                </Card>
              )}

              {activeTab === "radiologi" && (
                <Card
                  title="Radiologi"
                  size="small"
                  style={{ marginBottom: "16px" }}
                >
                  <Tree
                    showLine
                    switcherIcon={<DownOutlined />}
                    onSelect={(keys) => handleSelectRadiologyDocument(keys[0])}
                    treeData={hasilRisByNoreg.map((b) => ({
                      title: (
                        <Space>
                          <Badge status="processing" />
                          <Text>Reg: {b.registrasiId}</Text>
                        </Space>
                      ),
                      key: b.registrasiId,
                      children: b.listLink.map((c) => ({
                        title: `Foto: ${c.fotoNumber}`,
                        key: c.urlExpertise,
                      })),
                    }))}
                  />
                </Card>
              )}

              {activeTab === "resep" && (
                <Card
                  title="Resep"
                  size="small"
                  style={{ marginBottom: "16px" }}
                >
                  <Alert
                    message="Klik tab untuk melihat daftar resep"
                    type="info"
                    showIcon
                    style={{ marginBottom: 10 }}
                  />
                </Card>
              )}
            </Col>

            {/* Main content area */}
            <Col xs={24} sm={24} md={16} lg={17} xl={18}>
              <Card
                bodyStyle={{ padding: 0, height: "750px", overflow: "auto" }}
                bordered={false}
              >
                {loadDelay && <Skeleton active />}

                {activeTab === "dokumen" && activeDocument && (
                  <>
                    <Alert
                      message={`Menampilkan dokumen: ${activeDocument.title}`}
                      type="info"
                      showIcon
                      style={{ margin: 10 }}
                    />
                    <Iframe
                      url={activeDocument.url}
                      width="100%"
                      height="700px"
                      id="document-iframe"
                      className="document-iframe"
                      display="initial"
                      position="relative"
                    />
                  </>
                )}

                {activeTab === "lab" && (
                  <>
                    <Alert
                      message="Hasil Laboratorium"
                      description="Pilih dokumen lab dari menu di sebelah kiri untuk melihat hasil"
                      type="info"
                      showIcon
                      style={{
                        margin: 10,
                        display: printLabPk ? "none" : "block",
                      }}
                    />
                    <Iframe
                      url={printLabPk}
                      width="100%"
                      height="750px"
                      id="lab-iframe"
                      className="lab-iframe"
                      display="initial"
                      position="relative"
                    />
                  </>
                )}

                {activeTab === "radiologi" && (
                  <>
                    <Alert
                      message="Hasil Radiologi"
                      description="Pilih dokumen radiologi dari menu di sebelah kiri untuk melihat hasil"
                      type="info"
                      showIcon
                      style={{
                        margin: 10,
                        display: URLNoreg ? "none" : "block",
                      }}
                    />
                    <Iframe
                      url={URLNoreg}
                      width="100%"
                      height="750px"
                      id="radiologi-iframe"
                      className="radiologi-iframe"
                      display="initial"
                      position="relative"
                    />
                  </>
                )}

                {activeTab === "operasi" && (
                  <>
                    <Alert
                      message="Hasil Operasi"
                      description="Pilih dokumen operasi dari menu di sebelah kiri untuk melihat hasil"
                      type="info"
                      showIcon
                      style={{
                        margin: 10,
                        display: printHasilOp ? "none" : "block",
                      }}
                    />
                    <Iframe
                      url={printHasilOp}
                      width="100%"
                      height="750px"
                      id="operasi-iframe"
                      className="operasi-iframe"
                      display="initial"
                      position="relative"
                    />
                  </>
                )}

                {activeTab === "persalinan" && (
                  <>
                    <div style={{ padding: 16 }}>
                      <Form.Item
                        label="Jenis Dokumen Persalinan"
                        style={{ marginBottom: 10 }}
                      >
                        <Select
                          placeholder="Pilih jenis dokumen persalinan..."
                          value={jenisKala}
                          style={{ width: 200 }}
                          onChange={handleSelectKala}
                        >
                          <Option value="1">Kala 1</Option>
                          <Option value="2">Kala 2 dan 3</Option>
                          <Option value="4">Kala 4</Option>
                        </Select>
                      </Form.Item>
                    </div>

                    {printLapKala ? (
                      <Iframe
                        url={printLapKala}
                        width="100%"
                        height="680px"
                        id="persalinan-iframe"
                        className="persalinan-iframe"
                        display="initial"
                        position="relative"
                      />
                    ) : (
                      <Alert
                        message="Laporan Persalinan"
                        description="Pilih jenis laporan persalinan untuk melihat dokumen"
                        type="info"
                        showIcon
                        style={{ margin: 10 }}
                      />
                    )}
                  </>
                )}

                {activeTab === "resep" && (
                  <div style={{ padding: 16 }}>
                    <RiwayatOrder />
                  </div>
                )}

                {activeTab === "penyakit" && (
                  <div style={{ padding: 16 }}>
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Card
                          title="Penyakit"
                          size="small"
                          style={{ marginBottom: 16 }}
                        >
                          <Table
                            dataSource={riwayatpenyakit}
                            size="small"
                            rowKey="DiagnosaId"
                            pagination={{ pageSize: 10 }}
                          >
                            <Column
                              title="Tanggal"
                              dataIndex="TanggalMasuk"
                              width={100}
                              render={(text) =>
                                new Date(text).toLocaleDateString("id-ID", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                              }
                            />
                            <Column
                              title="Kode ICD"
                              dataIndex="DiagnosaId"
                              width={100}
                            />
                            <Column title="Penyakit" dataIndex="DiagnosaDesk" />
                            <Column
                              title="Kasus"
                              dataIndex="KasusIcd"
                              width={80}
                            />
                          </Table>
                        </Card>
                      </Col>
                      <Col span={24}>
                        <Card title="Pemeriksaan" size="small">
                          <Table
                            dataSource={riwayatpemeriksaan}
                            size="small"
                            rowKey="tanggalPemeriksaan"
                            pagination={{ pageSize: 10 }}
                          >
                            <Column
                              title="Tanggal"
                              dataIndex="tanggalPemeriksaan"
                              width={100}
                              render={(text) =>
                                new Date(text).toLocaleDateString("id-ID", {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "numeric",
                                })
                              }
                            />
                            <Column title="Bagian" dataIndex="ruangDesk" />
                            <Column title="Jenis" dataIndex="pelayananDesk" />
                          </Table>
                        </Card>
                      </Col>
                    </Row>
                  </div>
                )}

                {!activeTab.match(
                  /dokumen|lab|radiologi|operasi|persalinan|resep|penyakit/
                ) && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      height: "100%",
                    }}
                  >
                    <Empty
                      description="Silahkan pilih dokumen dari menu di samping"
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                    />
                  </div>
                )}
              </Card>
            </Col>
          </Row>
        )}
      </Card>
    </div>
  );
};

export default RiwayatPemeriksaan;
