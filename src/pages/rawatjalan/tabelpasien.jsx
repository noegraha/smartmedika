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
  Space,
  message,
  Pagination,
  Tour,
  Modal,
  Row,
  Col,
} from "antd";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import { AnamnesaContext } from "../rawatjalan/context/AnamnesaContext";
import { AlergiContext } from "../rawatjalan/context/AlergiContext";
import { CatatanmedisContext } from "../rawatjalan/context/CatatanmedisContext";
import { ChatContext } from "../chat/Chatcontext";
import {
  UndoOutlined,
  SoundOutlined,
  CheckCircleTwoTone,
  MinusOutlined,
} from "@ant-design/icons";
import { useHistory, useLocation } from "react-router-dom";
import { BillingContext } from "./context/BillingContext";
import { GambarContext } from "./context/GambarContext";
import { PrintOutContext } from "../PrintOutDokumen/PrintOutContext";
import { HasilRadiologiContext } from "./context/HasilRadiologiContext";
import dayjs from "dayjs";
import { ResepContext } from "./orderresep/ResepContext";
import { BankDarahContext } from "../penunjang/bankDarah/context/BankDarahContext";

const { Search } = Input;
const { Text, Paragraph } = Typography;

const Tabelpasien = () => {
  const {
    pasien,
    setPasien,
    ruangasal,
    detailPasien,
    setLebar,
    setRefresh,
    setCurrent,
    nomorantrian,
    curantri,
    detailAntrian,
    cariPasienNamaHariIni,
    tanggal,
    poli2,
    setOpen,
    open,
    currentt,
    setCurrentt,
    layout,
    load,
  } = useContext(PasienContext);
  const { setURL } = useContext(HasilRadiologiContext);
  const { kosongkanPrintOut } = useContext(PrintOutContext);
  const { detailTV } = useContext(AnamnesaContext);
  const { detailAllergy } = useContext(AlergiContext);
  const { detailCatatanmedis } = useContext(CatatanmedisContext);
  const { detailBilling, syncBayarKHS } = useContext(BillingContext);
  const { panggilAntrianPoliKlinik } = useContext(ChatContext);
  const { detailGambar } = useContext(GambarContext);
  const { setLoadingresep } = useContext(ResepContext);
  const { settabOrder, getDetailPasien } = useContext(BankDarahContext);

  const [pilih, setPilih] = useState(false);
  const [keterangan, setKeterangan] = useState(false);
  const ref = useRef(null);
  const [lebarnama, setLebarNama] = useState("120px");
  const [filteredPasien, setFilteredPasien] = useState(pasien);
  const [searchTerm, setSearchTerm] = useState("");

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

  const data = {
    ruangId: curantri.ruangId,
    namaRuangan: curantri.ruangDeskripsi,
    registrasiId: curantri.registrasiId,
    nama: curantri.namaPasien,
    alamat: curantri.alamat,
    nomorAntrian: nomorantrian.toString(),
  };
  useEffect(() => {
    return () => {
      console.log("Komponen dilepas, table di-clear!");
      setPasien([]); // Clear data pasien saat keluar dari komponen
    };
  }, [setPasien]);
  const panggil = () => {
    panggilAntrianPoliKlinik(data);
  };

  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("180px") : setLebarNama("120px");
  };

  const handleClick = (props, id) => {
    detailPasien(props);
    detailAllergy(props);
    detailTV(props);
    detailCatatanmedis(props);
    setPilih(props);
    detailBilling(props);
    setCurrent("anamnesa");
    sessionStorage.setItem("noreg", props);
    sessionStorage.setItem("norm", id);
    detailGambar(props);
    kosongkanPrintOut();
    setLoadingresep(false);
    setURL("");
    getDetailPasien(props);
    settabOrder("1");
  };

  const handleCari = (e) => {
    const inputValue = e.toLowerCase();
    setSearchTerm(inputValue);
  };

  useEffect(() => {
    const filtered = pasien.filter(
      (p) =>
        p.namaPasien.toLowerCase().includes(searchTerm) ||
        p.registrasiId.toString().includes(searchTerm)
    );
    setFilteredPasien(filtered);
  }, [searchTerm, pasien]);

  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const Popup = () =>
    visible && (
      <ul className="popup" style={{ left: `${x}px`, top: `${y - 85}px` }}>
        <li
          style={{ color: "green" }}
          onClick={() => {
            panggil();
          }}
        >
          <SoundOutlined /> Panggil
        </li>
      </ul>
    );

  const history = useHistory();
  const location = useLocation();
  const newPath = "/app/form/anamnesa"; // Calculate the new path

  const routeChange = () => {
    if (location.pathname !== newPath) {
      history.push(newPath);
    }
  };

  const columnsrsms = [
    {
      title: "No",
      width: "35px",
      dataIndex: "noAntrianKlinik",
      fixed: "left",
      render(text, record) {
        return {
          props: {
            style: {
              // textAlign: "center",
              background: record.anamnesa
                ? record.verified
                  ? "#7ad5ff"
                  : "rgb(255, 241, 184)"
                : "",
              cursor: "default",
            },
            // className: record.fastTrack ? "blinking-text" : "",
          },
          children: record.anamnesa ? (
            record.verified ? (
              <Tooltip title="Sudah ditandatangan Dokter" placement="leftTop">
                <Text
                  strong
                  type={record.fastTrack ? "danger" : ""}
                  className={record.fastTrack ? "blinking-text" : ""}
                >
                  {text}
                </Text>
              </Tooltip>
            ) : (
              <Tooltip title="Sudah dianamnesa" placement="leftTop">
                <Text
                  strong
                  type={record.fastTrack ? "danger" : ""}
                  className={record.fastTrack ? "blinking-text" : ""}
                >
                  {text}
                </Text>
              </Tooltip>
            )
          ) : record.fastTrack ? (
            <Tooltip title="Pasien FastTrack" placement="leftTop">
              <Text strong type="danger" className="blinking-text">
                {text}
              </Text>
            </Tooltip>
          ) : (
            <Text strong>{text}</Text>
          ),
        };
      },
    },
    {
      title: "No Reg",
      width: "75px",
      dataIndex: "registrasiId",
      fixed: "left",
      sorter: (a, b) => a.registrasiId - b.registrasiId,
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
                      record.ruangKonsul.substring(0, 1) !== "A"
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
                text
              )
            ) : (
              text
            ),
        };
      },
    },
    {
      title: "Nama",
      width: lebarnama,
      dataIndex: "namaPasien",
      ellipsis: true,
      sorter: (a, b) => a.namaPasien.localeCompare(b.namaPasien),
      render(text, record) {
        return {
          props: {
            style: {
              background:
                record.statusTindakLanjut === 1 ? "rgb(48, 231, 240)" : "",
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
                  {/* <Text
                    ellipsis
                    style={{ width: "100%", display: "inline-block" }}
                  > */}
                  {text}
                  {/* </Text> */}
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
                {/* <Text
                  ellipsis
                  style={{ width: "100%", display: "inline-block" }}
                > */}
                {text}
                {/* </Text> */}
              </Button>
            ),
        };
      },
    },
    {
      title: "No. RM",
      width: "80px",
      dataIndex: "pasienId",
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
      title: "DPJP",
      width: "250px",
      dataIndex: "namaDPJP",
      sorter: (a, b) => a.namaDPJP.localeCompare(b.namaDPJP),
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
      dataIndex: "namaPembayaran",
      sorter: (a, b) => a.namaPembayaran.localeCompare(b.namaPembayaran),
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
      title: "D",
      width: "35px",
      sorter: (a, b) => a.diagnosis.localeCompare(b.diagnosis),
      render: (pasien) => (
        <Text style={{ fontSize: 12 }}>
          {pasien.diagnosis ? (
            <CheckCircleTwoTone twoToneColor="#52c41a" />
          ) : (
            <MinusOutlined style={{ fontSize: 6 }} />
          )}
        </Text>
      ),
    },
    {
      title: "P",
      width: "35px",
      sorter: (a, b) => a.prosedur.localeCompare(b.prosedur),
      render: (pasien) => (
        <Text style={{ fontSize: 12 }}>
          {pasien.prosedur ? (
            <CheckCircleTwoTone />
          ) : (
            <MinusOutlined style={{ fontSize: 6 }} />
          )}
        </Text>
      ),
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
        showSizeChanger={false}
      />
    );
  };

  const getData = (current, pageSize) => {
    return filteredPasien.slice((current - 1) * pageSize, current * pageSize);
  };

  const onrefresh = () => {
    if (ruangasal === null) {
      message.warning("Pilih Ruang Terlebih Dahulu!");
    } else {
      // syncBayarKHS(ruangasal);
      // cariPasienHariIni(ruangasal, dayjs(tanggal).format("YYYY-MM-DD"));
      cariPasienNamaHariIni(" ");
      setRefresh(true);
    }
  };

  return (
    <Fragment>
      <div>
        <Search
          placeholder="Cari Nama Pasien / No Reg..."
          onChange={(e) => handleCari(e.target.value)}
        />
        {layout ? (
          <div>
            <div style={{ justifySelf: "center" }} ref={ref}>
              <MyPagination
                total={filteredPasien.length}
                current={currentt}
                onChange={setCurrentt}
              />
            </div>
            <Table
              loading={load}
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
                    detailAntrian(record.registrasiId);
                    setVisible(true);
                    setX(event.clientX);
                    setY(event.clientY);
                  },
                  onClick: (event) => {
                    handleClick(record.registrasiId, record.pasienId);
                    routeChange();
                  },
                };
              }}
              rowClassName={(record, index) =>
                record.registrasiId === pilih ? "colorpilih" : "fontkecil"
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
                      style={
                        dayjs().format("DD-MM-YYYY") ===
                        dayjs(tanggal).format("DD-MM-YYYY")
                          ? poli2 !== null
                            ? {
                                backgroundColor: "forestgreen",
                                borderColor: "green",
                              }
                            : {}
                          : {}
                      }
                      disabled={
                        dayjs().format("DD-MM-YYYY") ===
                        dayjs(tanggal).format("DD-MM-YYYY")
                          ? poli2 !== null
                            ? false
                            : true
                          : true
                      }
                    >
                      <UndoOutlined />
                      Refresh Pasien
                    </Button>
                  </Space>
                  <br />

                  <Button
                    size="small"
                    type="primary"
                    onClick={() => setKeterangan(true)}
                    block
                  >
                    Keterangan Warna
                  </Button>
                </div>
              )}
            />
          </div>
        ) : (
          <Table
            loading={load}
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
                  detailAntrian(record.registrasiId);
                  setVisible(true);
                  setX(event.clientX);
                  setY(event.clientY);
                },
                onClick: (event) => {
                  handleClick(record.registrasiId, record.pasienId);
                  routeChange();
                },
              };
            }}
            rowClassName={(record, index) =>
              record.registrasiId === pilih ? "colorpilih" : "fontkecil"
            }
            style={{ maxHeight: 570, fontSize: 8 }}
            columns={columnsrsms}
            dataSource={filteredPasien}
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
                    style={
                      dayjs().format("DD-MM-YYYY") ===
                      dayjs(tanggal).format("DD-MM-YYYY")
                        ? poli2 !== null
                          ? {
                              backgroundColor: "forestgreen",
                              borderColor: "green",
                            }
                          : {}
                        : {}
                    }
                    disabled={
                      dayjs().format("DD-MM-YYYY") ===
                      dayjs(tanggal).format("DD-MM-YYYY")
                        ? poli2 !== null
                          ? false
                          : true
                        : true
                    }
                  >
                    <UndoOutlined />
                    Refresh Pasien
                  </Button>
                </Space>
                <br />
                <Button
                  size="small"
                  type="primary"
                  onClick={() => setKeterangan(true)}
                  block
                >
                  Keterangan Warna
                </Button>
              </div>
            )}
          />
        )}
        <Popup />
      </div>
      <Tour open={open} onClose={() => setOpen(false)} steps={steps} />
      <Modal
        open={keterangan}
        onCancel={() => setKeterangan(false)}
        title="Keterangan Warna List Pasien"
      >
        Keterangan Warna No. Antrian :
        <Paragraph>
          <ul>
            <li>
              <Row>
                <Col span={12}>Pasien FastTrack :</Col>
                <Col span={12}>
                  <div
                    style={{
                      color: "red",
                    }}
                    className="blinking-text"
                  >
                    FastTrack
                  </div>
                </Col>
              </Row>
            </li>
            <li>
              <Row>
                <Col span={12}> Pasien Sudah Anamnesa :</Col>
                <Col span={12}>
                  <div style={{ background: "rgb(255, 241, 184)" }}>
                    Anamnesa
                  </div>
                </Col>
              </Row>
            </li>
            <li>
              <Row>
                <Col span={12}>Pasien Sudah Tandan Tangan Dokter :</Col>
                <Col span={12}>
                  <div style={{ background: "#7ad5ff" }}>Verif Dokter</div>
                </Col>
              </Row>
            </li>
          </ul>
        </Paragraph>
        Keterangan Warna Konsul / No. Reg. :
        <Paragraph>
          <ul>
            <li>
              <Row>
                <Col span={12}>Sudah Dijawab : </Col>
                <Col span={12}>
                  <div className="backkonsulsudah">Sudah Dijawab</div>
                </Col>
              </Row>
            </li>
            <li>
              <Row>
                <Col span={12}>Perlu Dijawab : </Col>
                <Col span={12}>
                  <div className="backkonsuljawab">Perlu Dijawab</div>
                </Col>
              </Row>
            </li>
            <li>
              <Row>
                <Col span={12}>Belum Dijawab : </Col>
                <Col span={12}>
                  <div className="backkonsulperlu">Belum Dijawab</div>
                </Col>
              </Row>
            </li>
            <li>
              <Row>
                <Col span={12}>Alih Rawat :</Col>
                <Col span={12}>
                  <div style={{ background: "gold" }}>Alih Rawat</div>
                </Col>
              </Row>
            </li>
          </ul>
        </Paragraph>
        Keterangan Warna Nama :
        <Paragraph>
          <ul>
            <li>
              <Row>
                <Col span={12}>Pasien Telemedicine : </Col>
                <Col span={12}>
                  <div
                    style={{
                      color: "red",
                    }}
                  >
                    Telemedicine
                  </div>
                </Col>
              </Row>
            </li>
            <li>
              <Row>
                <Col span={12}>Pasien Plan Dirawat :</Col>
                <Col span={12}>
                  <div
                    style={{
                      background: "rgb(48, 231, 240)",
                    }}
                  >
                    Dirawat
                  </div>
                </Col>
              </Row>
            </li>
          </ul>
        </Paragraph>
      </Modal>
    </Fragment>
  );
};

export default Tabelpasien;
