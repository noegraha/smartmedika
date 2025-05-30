import {
  Button,
  Card,
  Checkbox,
  Col,
  Input,
  Radio,
  Row,
  Select,
  Space,
  Statistic,
  Table,
  Tooltip,
  Typography,
} from "antd";
import React, { useContext, useEffect, useState } from "react";
import { LoginContext } from "../rawatjalan/context";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import debounce from "lodash.debounce";

const { Column } = Table;
const { Text } = Typography;

const PasienAllHariIni = () => {
  const { getPasienByUser, pasien, setPasien, rs, setRS, setLoading, loading } =
    useContext(PasienContext);
  const { namauser } = useContext(LoginContext);
  const [searchNamaPasien, setSearchNamaPasien] = useState("");
  const [searchRegistrasiId, setSearchRegistrasiId] = useState("");
  const [searchRuang, setSearchRuang] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [showOnlyUnverified, setShowOnlyUnverified] = useState(false);
  const [showOnlyKonsul, setShowOnlyKonsul] = useState(false);

  // Cleanup function saat komponen dilepas (unmounted)
  useEffect(() => {
    return () => {
      console.log("Komponen dilepas, table di-clear!");
      setPasien([]); // Clear data pasien saat keluar dari komponen
    };
  }, [setPasien]);

  const handleTableChange = (pagination) => {
    setCurrentPage(pagination.current);
    setPageSize(pagination.pageSize);
  };

  const handleSearchNamaPasien = debounce((value) => {
    setSearchNamaPasien(value.toLowerCase());
  }, 300);

  const handleSearchRegistrasiId = debounce((value) => {
    setSearchRegistrasiId(value);
  }, 300);

  const handleSearchRuang = (value) => {
    setSearchRuang(value);
  };

  const filteredPasien = pasien
    .filter((item) => {
      const matchesNamaPasien = item.namaPasien
        .toLowerCase()
        .includes(searchNamaPasien);
      const matchesRegistrasiId = item.registrasiId
        .toString()
        .includes(searchRegistrasiId);
      const matchesRuang = item.ruangDeskripsi
        .toLowerCase()
        .includes(searchRuang.toLowerCase());

      return matchesNamaPasien && matchesRegistrasiId && matchesRuang;
    })
    .filter((item) => (showOnlyUnverified ? !item.verified : true))
    .filter((item) => (showOnlyKonsul ? item.ruangKonsul !== null : true));

  // Calculate the number of patients who have been anamnesed and verified
  const anamnesaCount = filteredPasien.filter((item) => item.anamnesa).length;
  const verifiedCount = filteredPasien.filter((item) => item.verified).length;

  // Calculate the number of patients with fastrack set to true
  const fastTrackCount = filteredPasien.filter((item) => item.fastTrack).length;

  const uniqueRuang = [...new Set(pasien.map((item) => item.ruangDeskripsi))];

  return (
    <div>
      <Card
        size="small"
        title="Pasien Hari Ini"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Row>
          <Col span={13}>
            <Radio.Group
              onChange={(e) => setRS(e.target.value)}
              value={rs}
              buttonStyle="solid"
              defaultValue="%20"
            >
              <Radio.Button value="RSMS">RSMS</Radio.Button>
              <Radio.Button value="ABIYASA">Abiyasa</Radio.Button>
              <Radio.Button value="%20">Semua</Radio.Button>
            </Radio.Group>
            {"  "}
            <Button
              type="primary"
              onClick={() => {
                setPasien([]);
                setSearchRuang("");
                setSearchNamaPasien("");
                setSearchRegistrasiId("");
              }}
              danger
            >
              Clear
            </Button>
            {"  "}
            <Button
              style={{ backgroundColor: "#13c2c2", color: "white" }}
              type="primary"
              onClick={() => {
                getPasienByUser(" ", namauser, rs);
                setLoading(true);
              }}
            >
              Pasien RJ Hari Ini
            </Button>
            <br />
            <Space>
              <Card variant="borderless">
                <Statistic
                  title="Jumlah Pasien"
                  value={filteredPasien.length}
                />
              </Card>
              <Card variant="borderless">
                <Statistic
                  title="Jumlah Anamnesa"
                  value={anamnesaCount}
                  valueStyle={{
                    color: "#3f8600",
                  }}
                />
              </Card>
              <Card variant="borderless">
                <Statistic
                  title="Jumlah Verified"
                  value={verifiedCount}
                  valueStyle={{
                    color: "#1890ff",
                  }}
                />
              </Card>
              <Card variant="borderless">
                <Statistic
                  title="Jumlah Fast Track"
                  value={fastTrackCount}
                  valueStyle={{
                    color: "#cf1322",
                  }}
                />
              </Card>
            </Space>
          </Col>
          <Col span={11}>
            <Input
              addonBefore="No. Registrasi"
              placeholder="Cari No Registrasi"
              onChange={(e) => handleSearchRegistrasiId(e.target.value)}
            />
            <Input
              addonBefore="Nama Pasien"
              placeholder="Cari Nama Pasien"
              onChange={(e) => handleSearchNamaPasien(e.target.value)}
            />
            <Select
              placeholder="Filter berdasarkan Ruang"
              allowClear
              onChange={handleSearchRuang}
              style={{ width: "100%" }}
            >
              {uniqueRuang.map((ruang) => (
                <Select.Option key={ruang} value={ruang}>
                  {ruang}
                </Select.Option>
              ))}
            </Select>
            <Checkbox
              checked={showOnlyUnverified}
              onChange={(e) => setShowOnlyUnverified(e.target.checked)}
              style={{ marginTop: 8 }}
            >
              Tampilkan Hanya yang Belum Verified
            </Checkbox>
            <Checkbox
              checked={showOnlyKonsul}
              onChange={(e) => setShowOnlyKonsul(e.target.checked)}
              style={{ marginTop: 8 }}
            >
              Tampilkan Hanya Pasien Konsul
            </Checkbox>
          </Col>
        </Row>

        <Table
          loading={loading}
          bordered
          dataSource={filteredPasien}
          size="small"
          rowKey="reg"
          scroll={{ x: 700, y: 700 }}
          pagination={{
            current: currentPage,
            pageSize: pageSize,
            pageSizeOptions: ["20", "50", "100"],
            showSizeChanger: true,
            onChange: (page, pageSize) => {
              setCurrentPage(page);
              setPageSize(pageSize);
            },
            onShowSizeChange: (current, size) => {
              setPageSize(size);
              setCurrentPage(1);
            },
          }}
          onChange={handleTableChange}
        >
          <Column
            style={{ verticalAlign: "top" }}
            title="No."
            key="reg"
            width="20px"
            render={(text, record, index) => (
              <span>{(currentPage - 1) * pageSize + index + 1}</span>
            )}
          />
          <Column
            style={{ verticalAlign: "top" }}
            title="Antrian"
            key="reg"
            width="20px"
            render={(text, record) => {
              return {
                props: {
                  style: {
                    background: record.anamnesa
                      ? record.verified
                        ? "#7ad5ff"
                        : "rgb(255, 241, 184)"
                      : "",
                    cursor: "default",
                  },
                },
                children: record.anamnesa ? (
                  record.verified ? (
                    <Tooltip
                      title="Sudah ditandatangan Dokter"
                      placement="leftTop"
                    >
                      <Text
                        strong
                        type={record.fastTrack ? "danger" : ""}
                        className={record.fastTrack ? "blinking-text" : ""}
                      >
                        {record.noAntrianKlinik}
                      </Text>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Sudah dianamnesa" placement="leftTop">
                      <Text
                        type={record.fastTrack ? "danger" : ""}
                        strong
                        className={record.fastTrack ? "blinking-text" : ""}
                      >
                        {record.noAntrianKlinik}
                      </Text>
                    </Tooltip>
                  )
                ) : (
                  <Text
                    strong
                    type={record.fastTrack ? "danger" : ""}
                    className={record.fastTrack ? "blinking-text" : ""}
                  >
                    {record.noAntrianKlinik}
                  </Text>
                ),
              };
            }}
          />
          <Column
            title="No. Registrasi"
            key="reg"
            width={50}
            sorter={(a, b) => a.registrasiId - b.registrasiId}
            render={(text, record) => {
              return {
                props: {
                  style: {
                    background:
                      record.ruangKonsul !== null
                        ? record.ruangKonsul === record.ruangId
                          ? "lightgreen"
                          : "yellow"
                        : "",
                    cursor: "default",
                  },
                },
                children: <div>{record.registrasiId}</div>,
              };
            }}
          />
          <Column
            title="Nama Pasien"
            width={140}
            key="reg"
            sorter={(a, b) => a.namaPasien.localeCompare(b.namaPasien)}
            render={(pasien) => <span>{pasien.namaPasien}</span>}
          />
          <Column
            title="Pembayaran"
            width={60}
            key="reg"
            sorter={(a, b) => a.namaPembayaran.localeCompare(b.namaPembayaran)}
            render={(pasien) => <span>{pasien.namaPembayaran}</span>}
            ellipsis
          />
          <Column
            title="RuangId"
            width={50}
            key="reg"
            sorter={(a, b) => a.ruangId.localeCompare(b.ruangId)}
            render={(pasien) => <span>{pasien.ruangId}</span>}
          />
          <Column
            title="Ruang"
            width={125}
            key="reg"
            sorter={(a, b) => a.ruangDeskripsi.localeCompare(b.ruangDeskripsi)}
            render={(pasien) => <span>{pasien.ruangDeskripsi}</span>}
            ellipsis
          />
          <Column
            title="DPJP"
            width={100}
            key="reg"
            sorter={(a, b) => a.namaDPJP.localeCompare(b.namaDPJP)}
            render={(pasien) => <span>{pasien.namaDPJP}</span>}
            ellipsis
          />
        </Table>
      </Card>
    </div>
  );
};

export default PasienAllHariIni;
