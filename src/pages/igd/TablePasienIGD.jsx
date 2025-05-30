import React, {
  Fragment,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import {
  Table,
  Input,
  Button,
  Tooltip,
  Empty,
  Typography,
  Switch,
  Row,
  Space,
  Pagination,
  Tour,
} from "antd";
import { UndoOutlined } from "@ant-design/icons";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import { IGDContext } from "./Context/IGDContext";
import { TriaseIGDContext } from "./Context/TriaseIGDContext";
const { Search } = Input;
const { Text } = Typography;
const TabelpasienIGD = () => {
  const { ruangasal, detailPasien, detailAntrian } = useContext(PasienContext);
  const {
    listpasienigd,
    getListPasienIGD,
    setRefresh,
    setLebar,
    layout,
    setOpen,
    open,
    currentt,
    setCurrentt,
    pilih,
    setPilih,
    lebarnama,
    setLebarNama,
  } = useContext(IGDContext);
  const { getTriaseIGD } = useContext(TriaseIGDContext);
  const ref = useRef(null);

  // State untuk pencarian dan hasil filter
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState(listpasienigd);

  // Panggil data pasien saat pertama kali atau saat perlu di-refresh
  useEffect(() => {
    getListPasienIGD();
  }, []);

  // Mengupdate data filter saat listpasienigd berubah
  useEffect(() => {
    setFilteredData(listpasienigd);
  }, [listpasienigd]);

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearch = (value) => {
    setSearchQuery(value);
    if (value) {
      setFilteredData(
        listpasienigd.filter((pasien) =>
          pasien.NamaPasien.toLowerCase().includes(value.toLowerCase())
        )
      );
    } else {
      setFilteredData(listpasienigd);
    }
  };

  const steps = [
    {
      title: "Pembaruan!",
      description:
        "Untuk mengoptimalkan / mempercepat pengambilan data pasien, data list pasien akan dibatasi sebanyak 15 Pasien.",
      target: null,
    },
    {
      title: "Klik ke halaman berikutnya",
      description: "Untuk mencari pasien berikutnya dihalaman berikutnya.",
      placement: "right",
      target: () => ref.current,
    },
  ];

  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("200px") : setLebarNama("120px");
  };

  const handleClick = (props, id) => {
    detailPasien(props);
    getTriaseIGD(props);
    setPilih(props);
    sessionStorage.setItem("noreg", props);
    sessionStorage.setItem("norm", id);
  };
  const [visible, setVisible] = useState(false);

  const columnsrsms = [
    {
      title: "Nama",
      fixed: "left",
      width: lebarnama,
      dataIndex: "NamaPasien",
      sorter: (a, b) => a.NamaPasien.localeCompare(b.NamaPasien),
      render(text, record) {
        return {
          props: {
            style: {
              background: record.isTriase === 1 ? "rgb(48, 231, 240)" : "",
              color: record.telemedicine ? "red" : "#000000d9",
              cursor: "default",
              fontSize: "7",
            },
          },
          children:
            record.statusTindakLanjut === 1 ? (
              <Tooltip title="Dirawat">
                <Button
                  style={{
                    fontSize: 11,
                    padding: 0,
                    textAlign: "left",
                    whiteSpace: "normal",
                    height: "auto",
                  }}
                  danger={record.telemedicine ? true : false}
                  type="link"
                  size="small"
                >
                  {text}
                </Button>
              </Tooltip>
            ) : record.telemedicine ? (
              <Tooltip title="Pasien Telemedicine">
                <Button
                  style={{
                    fontSize: 11,
                    padding: 0,
                    textAlign: "left",
                    whiteSpace: "normal",
                    height: "auto",
                  }}
                  danger={record.telemedicine ? true : false}
                  type="link"
                  size="small"
                >
                  {text}
                </Button>
              </Tooltip>
            ) : (
              <Button
                style={{
                  fontSize: 11,
                  padding: 0,
                  textAlign: "left",
                  whiteSpace: "normal",
                  height: "auto",
                }}
                danger={record.telemedicine ? true : false}
                type="link"
                size="small"
              >
                {text}
              </Button>
            ),
        };
      },
    },
    {
      title: "DPJP",
      width: "100px",
      ellipsis: true,
      dataIndex: "NamaDPJP",
      sorter: (a, b) => a.NamaDPJP.localeCompare(b.NamaDPJP),
      render(text, record) {
        return {
          props: {
            style: {
              cursor: "default",
            },
          },
          children: <Text style={{ fontSize: 12 }}>{text}</Text>,
        };
      },
    },
    {
      title: "No Reg",
      width: "75px",
      dataIndex: "RegistrasiId",
      sorter: (a, b) => a.RegistrasiId - b.RegistrasiId,
      render(text, record) {
        return {
          props: {
            style: {
              background:
                record.ruangKonsul !== null
                  ? record.ruangKonsul === ruangasal &&
                    record.ruangId !== ruangasal
                    ? "lime"
                    : record.ruangKonsul === ruangasal &&
                      record.ruangId === ruangasal
                    ? "yellow"
                    : record.ruangKonsul !== ruangasal &&
                      record.ruangId === ruangasal &&
                      !record.ruangKonsul.includes("A")
                    ? "lightpink"
                    : record.ruangKonsul !== ruangasal &&
                      record.ruangId === ruangasal &&
                      record.ruangKonsul.substring(0, 1) === "A"
                    ? "gold"
                    : ""
                  : "",
              cursor: "default",
            },
          },
          children:
            record.ruangKonsul !== null ? (
              record.ruangKonsul === ruangasal &&
              record.ruangId !== ruangasal ? (
                <Tooltip title="Konsultasi perlu dijawab">{text}</Tooltip>
              ) : record.ruangKonsul === ruangasal &&
                record.ruangId === ruangasal ? (
                <Tooltip title="Konsultasi sudah dijawab">{text}</Tooltip>
              ) : record.ruangKonsul !== ruangasal &&
                record.ruangId === ruangasal &&
                !record.ruangKonsul.includes("A") ? (
                <Tooltip title="Konsultasi belum dijawab">{text}</Tooltip>
              ) : record.ruangKonsul !== ruangasal &&
                record.ruangId === ruangasal &&
                record.ruangKonsul.substring(0, 1) === "A" ? (
                <Tooltip title="Konsultasi Alih Rawat">{text}</Tooltip>
              ) : (
                <Text style={{ fontSize: 12 }}>{text}</Text>
              )
            ) : (
              text
            ),
        };
      },
    },
    {
      title: "No. RM",
      width: "80px",
      dataIndex: "PasienId",
      render(text, record) {
        return {
          props: {
            style: {
              cursor: "default",
            },
          },
          children: <Text style={{ fontSize: 12 }}>{text}</Text>,
        };
      },
    },
    {
      title: "Penjamin",
      width: "200px",
      dataIndex: "NamaPembayaran",
      sorter: (a, b) => a.NamaPembayaran.localeCompare(b.NamaPembayaran),
      render(text, record) {
        return {
          props: {
            style: {
              cursor: "default",
            },
          },
          children: <Text style={{ fontSize: 12 }}>{text}</Text>,
        };
      },
    },
  ];

  const MyPagination = ({ total, onChange, current }) => {
    return (
      <Pagination
        onChange={onChange}
        total={total}
        current={current}
        pageSize={15}
        simple={true}
        style={{ textAlign: "center" }}
        size="small"
        // showTotal={(total) => `Total ${total} pasien`}
        showSizeChanger={false}
        // showQuickJumper
      />
    );
  };
  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return filteredData.slice((current - 1) * pageSize, current * pageSize);
  };

  const onrefresh = () => {
    getListPasienIGD();
    setRefresh(true);
  };
  return (
    <Fragment>
      <div>
        {/* Komponen Search untuk pencarian nama pasien */}
        <Search
          placeholder="Cari Nama Pasien..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
          style={{ marginBottom: 16 }}
        />
        {layout ? (
          <div>
            <div ref={ref}>
              <MyPagination
                total={filteredData.length}
                current={currentt}
                onChange={setCurrentt}
              />
            </div>
            <Table
              showSorterTooltip={false}
              onRow={(record, rowIndex) => {
                return {
                  onContextMenu: (event) => {
                    event.preventDefault();
                    if (!visible) {
                      document.addEventListener(
                        `click`,
                        function onClickOutside() {
                          setVisible(false);
                          document.removeEventListener(`click`, onClickOutside);
                        }
                      );
                    }
                    detailAntrian(record.RegistrasiId);
                    setVisible(true);
                  },
                  onClick: (event) => {
                    handleClick(record.RegistrasiId, record.PasienId);
                    // routeChange();
                  },
                };
              }}
              rowClassName={(record, index) =>
                record.RegistrasiId === pilih ? "colorpilih" : "fontkecil"
              }
              style={{ maxHeight: 570, fontSize: 8 }}
              columns={columnsrsms}
              dataSource={getData(currentt, 15)}
              size="small"
              scroll={{ x: 300, y: "52vh" }}
              pagination={false}
              locale={{
                emptyText: (
                  <Empty
                    image={Empty.PRESENTED_IMAGE_SIMPLE}
                    description={"Silahkan Pilih Ruangan Terlebih Dahulu"}
                  />
                ),
              }}
              footer={() => (
                <div>
                  <Space>
                    Atur Lebar :
                    <Switch
                      onChange={onLebar}
                      checkedChildren="Max"
                      unCheckedChildren="Min"
                    />
                    <Button
                      size="small"
                      type="primary"
                      onClick={onrefresh}
                      style={{
                        backgroundColor: "forestgreen",
                        borderColor: "green",
                      }}
                    >
                      <UndoOutlined />
                      Refresh Pasien
                    </Button>
                  </Space>
                  <br />
                  Keterangan Warna Konsul :
                  <Row>
                    <div className="backkonsulsudah">Sudah Dijawab</div>&nbsp;
                    <div className="backkonsuljawab">Perlu Dijawab</div>&nbsp;
                    <div className="backkonsulperlu">Belum Dijawab</div>
                  </Row>
                </div>
              )}
            />
          </div>
        ) : (
          <Table
            showSorterTooltip={false}
            onRow={(record, rowIndex) => {
              return {
                onContextMenu: (event) => {
                  event.preventDefault();
                  if (!visible) {
                    document.addEventListener(
                      `click`,
                      function onClickOutside() {
                        setVisible(false);
                        document.removeEventListener(`click`, onClickOutside);
                      }
                    );
                  }
                  detailAntrian(record.RegistrasiId);
                  setVisible(true);
                },
                onClick: (event) => {
                  handleClick(record.RegistrasiId, record.PasienId);
                  //   routeChange();
                },
              };
            }}
            rowClassName={(record, index) =>
              record.RegistrasiId === pilih ? "colorpilih" : "fontkecil"
            }
            style={{ maxHeight: 570, fontSize: 8 }}
            columns={columnsrsms}
            dataSource={filteredData}
            // dataSource={getData(currentt, 15)}
            size="small"
            scroll={{ x: 300, y: "52vh" }}
            // pagination={{
            //   size: "small",
            //   position: ["bottomCenter"],
            //   simple: [true],
            //   defaultPageSize: [15],
            // }}
            pagination={false}
            locale={{
              emptyText: (
                <Empty
                  image={Empty.PRESENTED_IMAGE_SIMPLE}
                  description={"Silahkan Pilih Ruangan Terlebih Dahulu"}
                />
              ),
            }}
            footer={() => (
              <div>
                <Space>
                  Atur Lebar :
                  <Switch
                    onChange={onLebar}
                    checkedChildren="Max"
                    unCheckedChildren="Min"
                  />
                  <Button
                    size="small"
                    type="primary"
                    onClick={onrefresh}
                    style={{
                      backgroundColor: "forestgreen",
                      borderColor: "green",
                    }}
                  >
                    <UndoOutlined />
                    Refresh Pasien
                  </Button>
                </Space>
                <br />
                Keterangan Warna Konsul :
                <Row>
                  <div className="backkonsulsudah">Sudah Dijawab</div>&nbsp;
                  <div className="backkonsuljawab">Perlu Dijawab</div>&nbsp;
                  <div className="backkonsulperlu">Belum Dijawab</div>
                </Row>
              </div>
            )}
          />
        )}
      </div>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
    </Fragment>
  );
};

export default TabelpasienIGD;
