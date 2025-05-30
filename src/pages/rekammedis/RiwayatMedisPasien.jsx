import {
  Card,
  Col,
  Form,
  Image,
  Input,
  Row,
  Table,
  Tabs,
  Typography,
  Space,
  Spin,
  Empty,
  Avatar,
  Badge,
  Divider,
  Tag,
  Button,
  Drawer,
} from "antd";
import {
  SearchOutlined,
  UserOutlined,
  MedicineBoxOutlined,
  HistoryOutlined,
  HomeOutlined,
  PhoneOutlined,
  TeamOutlined,
  CreditCardOutlined,
  FileTextOutlined,
  ArrowLeftOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  MailOutlined,
} from "@ant-design/icons";
import React, { useContext, useState, useEffect } from "react";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import RiwayatPemeriksaan from "./RiwayatPemeriksaan";
import { ResepContext } from "../rawatjalan/orderresep/ResepContext";
// At the top of your file
import backgroundImage from "../../assets/img/rsms_blur.jpg";

const { TabPane } = Tabs;
const { Title, Text } = Typography;

const RiwayatMedisPasien = () => {
  const { getRiwayatObat } = useContext(ResepContext);
  const {
    setPasienID,
    setLoading,
    loading,
    setLoadingDetail,
    loadingdetail,
    pasienlist,
    cariPasienListAll,
    getPasienDetail,
    pasiendetail,
    pasienDetailJenisKelamin,
    pasienDetailAgama,
    pasienDetailPendidikan,
    pasienDetailStatusKwn,
    pasienDetailPekerjaan,
    pasienDetailGolonganDrh,
    pasienDetailSuku,
    pasienDetailBahasa,
    pasienDetailDesa,
    pasienDetailKelasRwt,
    pasienDetailPembayaran,
    detailRiwayatPasien,
    setCurpas,
  } = useContext(PasienContext);

  const [warnarow, setWarnaRow] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const [showEmptySearch, setShowEmptySearch] = useState(false);
  const [searchCollapsed, setSearchCollapsed] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  useEffect(() => {
    // Reset empty state when new search starts
    if (loading) {
      setShowEmptySearch(false);
    }

    // Show empty state if search was performed but no results
    if (!loading && pasienlist && pasienlist.length === 0 && searchValue) {
      setShowEmptySearch(true);
    }
  }, [loading, pasienlist, searchValue]);

  // Automatically collapse search panel when patient is selected
  // useEffect(() => {
  //   if (pasiendetail.pasienId) {
  //     setSearchCollapsed(true);
  //   }
  // }, [pasiendetail.pasienId]);

  const columns = [
    {
      title: "No. RM",
      dataIndex: "pasienId",
      width: "20%",
    },
    {
      title: "Nama Pasien",
      dataIndex: "nama",
      sorter: (a, b) => a.nama.localeCompare(b.nama),
      width: "30%",
      render: (text) => <Text strong>{text}</Text>,
    },
    {
      title: "Tanggal Lahir",
      dataIndex: "tanggalLahir",
      width: "20%",
      render: (_, record) => {
        return record.tanggalLahir ? record.tanggalLahir.substr(0, 10) : "-";
      },
    },
    {
      title: "Alamat",
      dataIndex: "alamat",
      width: "30%",
      ellipsis: true,
    },
  ];

  const handleSearch = (value) => {
    setSearchValue(value);
    cariPasienListAll(value);
    setLoading(true);
  };

  const selectPatient = (record) => {
    setWarnaRow(record.pasienId);
    getPasienDetail(record.pasienId);
    setLoadingDetail(true);
    setPasienID(record.pasienId);
    detailRiwayatPasien(record.pasienId);
    getRiwayatObat(record.pasienId);
    sessionStorage.setItem("norm", record.pasienId);
    sessionStorage.setItem("namaPasienRawat", record.nama);
    setCurpas("a");
    // setSearchCollapsed(true);
  };

  const resetSelection = () => {
    setPasienID(null);
    setWarnaRow(null);
    // Clear patient detail
    getPasienDetail("");
    sessionStorage.removeItem("norm");
    setCurpas("");
    setSearchCollapsed(false);
  };

  const InfoItem = ({ label, value, icon }) => (
    <Space align="start">
      {icon}
      <div>
        <Text type="secondary" style={{ fontSize: 12 }}>
          {label}
        </Text>
        <div>
          <Text strong>{value || "-"}</Text>
        </div>
      </div>
    </Space>
  );

  // Add this helper function near the top of the component
  const calculateAge = (birthDate) => {
    if (!birthDate) return "?";

    const today = new Date();
    const dob = new Date(birthDate);

    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    return age;
  };

  const PatientInfoCard = () => {
    if (!pasiendetail.pasienId) {
      return (
        <Card className="patient-card" bordered={false}>
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Silakan cari dan pilih pasien untuk melihat informasi"
          />
        </Card>
      );
    }

    return (
      <Card className="patient-card" bordered={false} loading={loadingdetail}>
        <Row>
          <Col span={8} style={{ alignContent: "center" }}>
            <div
              style={{
                textAlign: "center",
                marginBottom: 16,
              }}
            >
              <Badge
                count={calculateAge(pasiendetail.tanggalLahir) || "?"}
                offset={[0, 86]}
              >
                <Avatar
                  size={80}
                  icon={<UserOutlined />}
                  style={{
                    backgroundColor:
                      pasienDetailJenisKelamin?.deskripsi === "LAKI-LAKI"
                        ? "#1677ff"
                        : "#ff6b81",
                  }}
                />
              </Badge>
              <div style={{ marginTop: 12 }}>
                <Title level={4} style={{ margin: 0 }}>
                  {pasiendetail.nama || "Nama Pasien"}
                </Title>
                <Space split={<Divider type="vertical" />}>
                  <Text>{pasiendetail.pasienId || "No. RM"}</Text>
                  <Text>
                    {pasienDetailJenisKelamin?.deskripsi || "Jenis Kelamin"}
                  </Text>
                </Space>
              </div>
            </div>
          </Col>
          <Col span={16}>
            <Tabs
              defaultActiveKey="1"
              type="card"
              animated={{ inkBar: true, tabPane: true }}
              items={[
                {
                  key: "1",
                  label: (
                    <span>
                      <UserOutlined />
                      Data Pribadi
                    </span>
                  ),
                  children: (
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <InfoItem
                          label="Tempat & Tanggal Lahir"
                          value={`${pasiendetail.tempatLahir || "-"}, ${
                            pasiendetail.tanggalLahir?.substring(0, 10) || "-"
                          }`}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem label="NIK" value={pasiendetail.nik} />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          label="Agama"
                          value={pasienDetailAgama?.deskripsi}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          label="Pendidikan"
                          value={pasienDetailPendidikan?.deskripsi}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          label="Pekerjaan"
                          value={pasienDetailPekerjaan?.deskripsi}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          label="Status Pernikahan"
                          value={pasienDetailStatusKwn?.deskripsi}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          label="Golongan Darah"
                          value={pasienDetailGolonganDrh?.deskripsi}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          label="Suku Bangsa"
                          value={pasienDetailSuku?.deskripsi}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          label="Bahasa"
                          value={pasienDetailBahasa?.deskripsi}
                        />
                      </Col>
                    </Row>
                  ),
                },
                {
                  key: "2",
                  label: (
                    <span>
                      <HomeOutlined />
                      Alamat & Kontak
                    </span>
                  ),
                  children: (
                    <Row gutter={[16, 16]}>
                      <Col span={12}>
                        <InfoItem
                          icon={<HomeOutlined />}
                          label="Alamat"
                          value={pasiendetail.alamat}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          icon={<HomeOutlined />}
                          label="Alamat Domisili"
                          value={pasiendetail.alamatDomisili}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          icon={<HomeOutlined />}
                          label="Desa"
                          value={pasienDetailDesa?.desaNama}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          icon={<PhoneOutlined />}
                          label="No. Telepon"
                          value={pasiendetail.noTelepon}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          icon={<MailOutlined />}
                          label="Email"
                          value={pasiendetail.email}
                        />
                      </Col>
                    </Row>
                  ),
                },
                {
                  key: "3",
                  label: (
                    <span>
                      <TeamOutlined />
                      Data Keluarga
                    </span>
                  ),
                  children: (
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <InfoItem
                          icon={<TeamOutlined />}
                          label="Nama Ibu"
                          value={pasiendetail.namaIbu}
                        />
                      </Col>
                      <Col span={24}>
                        <InfoItem
                          icon={<TeamOutlined />}
                          label="Nama Ayah"
                          value={pasiendetail.namaAyah}
                        />
                      </Col>
                      <Col span={24}>
                        <InfoItem
                          icon={<TeamOutlined />}
                          label="Nama Pasangan"
                          value={pasiendetail.namaPasangan}
                        />
                      </Col>
                    </Row>
                  ),
                },
                {
                  key: "4",
                  label: (
                    <span>
                      <CreditCardOutlined />
                      Pembayaran
                    </span>
                  ),
                  children: (
                    <Row gutter={[16, 16]}>
                      <Col span={24}>
                        <Tag
                          color="blue"
                          style={{ padding: "4px 8px", marginBottom: 16 }}
                        >
                          {pasienDetailPembayaran?.deskripsi ||
                            "Tidak ada data pembayaran"}
                        </Tag>
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          icon={<CreditCardOutlined />}
                          label="No. Pembayaran"
                          value={pasiendetail.noPolish}
                        />
                      </Col>
                      <Col span={12}>
                        <InfoItem
                          icon={<MedicineBoxOutlined />}
                          label="Kelas Rawat"
                          value={pasienDetailKelasRwt?.deskripsi}
                        />
                      </Col>
                    </Row>
                  ),
                },
                {
                  key: "5",
                  label: (
                    <span>
                      <FileTextOutlined />
                      Tanda Tangan
                    </span>
                  ),
                  children: (
                    <div style={{ textAlign: "center" }}>
                      {pasiendetail.tandaTangan ? (
                        <Image
                          width={200}
                          src={`data:image/jpeg;base64,${pasiendetail.tandaTangan}`}
                        />
                      ) : (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="Belum ada tanda tangan"
                        />
                      )}
                    </div>
                  ),
                },
              ]}
            />
          </Col>
        </Row>
      </Card>
    );
  };

  return (
    <div className="patient-history-container">
      <Row gutter={[16, 16]}>
        {/* Search Panel - Desktop */}
        {!searchCollapsed && (
          <Col xs={24} lg={8}>
            <Card
              title={
                <Space>
                  <UserOutlined />
                  <span>Pencarian Pasien</span>
                </Space>
              }
              className="search-card"
              bodyStyle={{ padding: "16px" }}
              headStyle={{ fontWeight: "bolder", backgroundColor: "#f5f8ff" }}
              extra={
                pasiendetail.pasienId && (
                  <Button
                    type="text"
                    icon={<MenuFoldOutlined />}
                    onClick={() => setSearchCollapsed(true)}
                    title="Tutup panel pencarian"
                  />
                )
              }
            >
              <Input.Search
                placeholder="Cari berdasarkan nama atau nomor RM"
                enterButton={<SearchOutlined />}
                size="large"
                onSearch={handleSearch}
                loading={loading}
                allowClear
              />

              {showEmptySearch ? (
                <Empty
                  style={{ marginTop: 40 }}
                  description="Tidak ditemukan data pasien yang sesuai"
                />
              ) : (
                <div className="patient-table-container">
                  <Table
                    rowKey="pasienId"
                    pagination={{
                      pageSize: 6,
                      size: "small",
                      showSizeChanger: false,
                      showTotal: (total) => `Total ${total} pasien`,
                    }}
                    scroll={{ y: 350 }}
                    onRow={(record) => ({
                      onClick: () => selectPatient(record),
                      className:
                        record.pasienId === warnarow ? "selected-row" : "",
                    })}
                    loading={loading}
                    columns={columns}
                    dataSource={pasienlist}
                    size="small"
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description="Masukkan kata kunci pencarian"
                        />
                      ),
                    }}
                  />
                </div>
              )}
            </Card>
          </Col>
        )}

        {/* Search Panel Button - Mobile */}
        <Drawer
          title="Pencarian Pasien"
          placement="left"
          onClose={() => setShowMobileSearch(false)}
          open={showMobileSearch}
          width={320}
        >
          <Input.Search
            placeholder="Cari berdasarkan nama atau nomor RM"
            enterButton={<SearchOutlined />}
            size="large"
            onSearch={(value) => {
              handleSearch(value);
              if (value) {
                // Don't close drawer immediately, let user see results
              }
            }}
            loading={loading}
            allowClear
          />

          {showEmptySearch ? (
            <Empty
              style={{ marginTop: 40 }}
              description="Tidak ditemukan data pasien yang sesuai"
            />
          ) : (
            <div className="patient-table-container">
              <Table
                rowKey="pasienId"
                pagination={{
                  pageSize: 6,
                  size: "small",
                  showSizeChanger: false,
                }}
                scroll={{ y: 350 }}
                onRow={(record) => ({
                  onClick: () => {
                    selectPatient(record);
                    setShowMobileSearch(false);
                  },
                  className: record.pasienId === warnarow ? "selected-row" : "",
                })}
                loading={loading}
                columns={columns}
                dataSource={pasienlist}
                size="small"
                locale={{
                  emptyText: (
                    <Empty
                      image={Empty.PRESENTED_IMAGE_SIMPLE}
                      description="Masukkan kata kunci pencarian"
                    />
                  ),
                }}
              />
            </div>
          )}
        </Drawer>

        {/* Patient Info Panel */}
        <Col xs={24} lg={searchCollapsed ? 24 : 16}>
          {/* <div className="mobile-search-button">
            {searchCollapsed && (
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={() => setShowMobileSearch(true)}
                style={{ marginBottom: 16, display: "none" }}
                className="mobile-only-button"
              >
                Cari Pasien
              </Button>
            )}
          </div> */}

          <Card
            title={
              <Space>
                <UserOutlined />
                <span>Informasi Pasien</span>
                {loadingdetail && <Spin size="small" />}
              </Space>
            }
            className="info-card"
            bodyStyle={{ padding: 0 }}
            headStyle={{ fontWeight: "bolder", backgroundColor: "#f5f8ff" }}
            extra={
              searchCollapsed && (
                <Space>
                  <Button
                    icon={<SearchOutlined />}
                    type="primary"
                    size="small"
                    onClick={() => setSearchCollapsed(false)}
                  >
                    Cari Pasien Lain
                  </Button>
                  <Button
                    type="text"
                    icon={<MenuUnfoldOutlined />}
                    onClick={() => setSearchCollapsed(false)}
                    title="Tampilkan panel pencarian"
                    className="desktop-only-button"
                  />
                </Space>
              )
            }
          >
            <PatientInfoCard />
          </Card>
        </Col>
      </Row>
      <Card
        title={
          <Space>
            <HistoryOutlined />
            <span>Riwayat Pemeriksaan</span>
            {loadingdetail && <Spin size="small" />}
          </Space>
        }
        className="history-card"
        style={{ marginTop: 16 }}
      >
        {!pasiendetail.pasienId ? (
          <Empty
            image={Empty.PRESENTED_IMAGE_SIMPLE}
            description="Silakan pilih pasien untuk melihat riwayat pemeriksaan"
          />
        ) : (
          <RiwayatPemeriksaan />
        )}
      </Card>

      <style jsx global>{`
        .patient-history-container {
          padding: 16px;
          min-height: 100vh;
          background-image: url(${backgroundImage});
          background-repeat: no-repeat;
          width: auto;
          height: vh;
          background-size: cover;
          background-position: center;
        }

        .ant-card {
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.03);
          border-radius: 8px;
        }

        .info-card,
        .search-card,
        .history-card {
          margin-bottom: 16px;
        }

        .patient-table-container {
          margin-top: 16px;
        }

        .selected-row {
          background-color: #e6f7ff;
        }

        .ant-table-row {
          cursor: pointer;
          transition: all 0.3s;
        }

        .ant-table-row:hover {
          background-color: #f5f5f5;
        }

        .ant-tabs-card .ant-tabs-content {
          padding: 16px;
        }

        /* Responsive styling */
        @media (max-width: 992px) {
          .desktop-only-button {
            display: none;
          }

          .mobile-only-button {
            display: inline-block !important;
          }
        }

        @media (min-width: 993px) {
          .mobile-only-button {
            display: none;
          }
        }

        .mobile-search-button {
          display: flex;
          justify-content: center;
          margin-bottom: 16px;
        }

        /* Animation for expand/collapse */
        .ant-col {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default RiwayatMedisPasien;
