import React, { useContext, useState } from "react";
import {
  Layout,
  Menu,
  Select,
  Table,
  Input,
  Button,
  Tag,
  Empty,
  Spin,
  Switch,
  Typography,
  Tooltip,
  Space,
  Row,
  Col,
  Pagination,
  Alert,
  message,
  Flex,
  Drawer,
  Modal,
} from "antd";
import {
  UndoOutlined,
  SoundOutlined,
  BellTwoTone,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { TextLoop } from "react-text-loop-next";
import { Link, useHistory } from "react-router-dom";
import { PelayananContext } from "../rawatjalan/context/Pelayanancontext";
import { MasterTandaGejalaContext } from "../master/context/masteraskep/MasterTandaGejalaContext";
import { MasterIntervensiAskepContext } from "../master/context/masteraskep/MasterIntervensiAskepContext";
import { AskepContext } from "./context/AskepContext";
import { PemeriksaanFisikContext } from "../rawatjalan/context/PemeriksaanFisikContext";
import { MasterBarangContext } from "../master/context/MasterBarangContext";
import { HasilRadiologiContext } from "./context/HasilRadiologiContext";
import { PasienRIContext } from "./context/PasienRIContext";
import { TransferPasienRIContext } from "./context/TransferPasienRIContext";
import { Fragment } from "react";
import { AssesmentKeluhanRIContext } from "./context/AssesmentKeluhanRIContext";
import { PelayananRIContext } from "./context/PelayananRIContext";
import { BillingRIContext } from "./context/BillingRIContext";
import { OrderPenunjangRIContext } from "./context/OrderPenunjangRIContext";
import { ResepRIContext } from "./context/ResepRIContext";
import { SuratKeteranganRIContext } from "./context/SuratKeteranganRIContext";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import { ResepContext } from "../rawatjalan/orderresep/ResepContext";
import { DiagnosaContext } from "../rawatjalan/context/Diagnosacontext";
import { GiziAsuhanContext } from "../penunjang/gizi/context/AsuhanGiziContext";
import { DischargePlanningContext } from "./context/DischargePlanningContext";
import { EwsRIContext } from "./context/EwsContext";
import { PantuanInfeksiContext } from "./context/PantuanInfeksiContext";
import { PerkembanganPasienRIContext } from "./context/PerkembanganPasienRIContext";
import { DiagnosaRIContext } from "./context/DiagnosaRIContext";
import { TTVRIContext } from "./context/TandaVitalAskepRIContext";
import { PemeriksaanLainContext } from "../rawatjalan/context/pemeriksaancontext/PemeriksaanLainContext";
import { PrintOutContext } from "../PrintOutDokumen/PrintOutContext";
import { BankDarahContext } from "../penunjang/bankDarah/context/BankDarahContext";
import { RM14Context } from "./context/RM14Context";
import SidebarKemoterapi from "../penunjang/kemoterapi/component/SidebarKemoterapi";
import TabelPasienKemoterapi from "../penunjang/kemoterapi/component/TabelPasienKemoterapi";
import { AnamnesaRIContext } from "./context/AnamnesaRIContext";
import HsitoriPasien from "./Transaksi/HsitoriPasien";
import FormValidasiKaru from "./Transaksi/FormValidasiKaru";

// import TabelPasienRI from './TabelPasienRI';

const { Sider } = Layout;
const { Option } = Select;
const { Column } = Table;
const { Search } = Input;
const { Text } = Typography;

const SidebarRI = () => {
  const [draweropen, setdraweropen] = useState(false);
  const [keyPasienpulang, setkeyPasienpulang] = useState("");
  const abiyasa = [
    "9351",
    "9352",
    "9353",
    "9354",
    "9355",
    "9356",
    "9357",
    "9358",
    "9359",
    "9360",
    "9361",
    "9366",
  ];

  const [page, setPage] = useState(1);
  const [modalHistori, setmodalHistori] = useState(false);
  const [modalValidkaru, setmodalValidkaru] = useState(false);
  const [warnaRow, setWarnaRow] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [dokterRuang, setdokterRuang] = useState([]);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const { setUnitOrder } = useContext(ResepContext);
  const { detailPasien } = useContext(PasienContext);
  const {
    ruang,
    cariPasienRI,
    pasienRI,
    detailPasienRI,
    cariPasienRInama,
    cariRuangUserRI,
    cariPasienRuangRI,
    tabkey,
    setTabkey,
    ruangRi,
    setruangRi,
    setCurrent,
    setpasienRi,
    pilih,
    setPilih,
    lebarnama,
    setLebarNama,
    lebar,
    setLebar,
    loadPasien,
    setloadPasien,
    pasienRIPulang,
    setPasienRIPulang,
    swtichPasien,
    setswtichPasien,
    cariPasienRIPulang,
    setCurpasRI,
    getTTpasien,
    setttPasien,
    ttPasien,
    ruangRiDesk,
    setruangRiDesk,
    aletDiagnosa,
  } = useContext(PasienRIContext);
  const { detailBilling } = useContext(BillingRIContext);
  const { kosongkanCatatan } = useContext(TTVRIContext);
  const { detailterimapasienRI } = useContext(TransferPasienRIContext);
  const { loadPelayananRI } = useContext(PelayananRIContext);
  const { getListOrderPenunjang } = useContext(OrderPenunjangRIContext);
  const { listOrder, setItemsPaten, getRiwayatObat } =
    useContext(ResepRIContext);

  const { settgl, setTtd, setjenisKeterangan, setnoregPulang } = useContext(
    SuratKeteranganRIContext
  );
  const { KosongkanFormTTV, waktuenrol, setwaktuenroll } = useContext(
    PerkembanganPasienRIContext
  );

  const { loadPelayanan } = useContext(PelayananContext);
  const { listMasterTandaGejala } = useContext(MasterTandaGejalaContext);
  const { detailMasterIntervensiaskep } = useContext(
    MasterIntervensiAskepContext
  );
  const { detailPemfisik } = useContext(PemeriksaanFisikContext);
  const { GetListBarangRuang } = useContext(MasterBarangContext);
  const { detailHasilRadiologi } = useContext(HasilRadiologiContext);
  const { getDiagnosa, detailDiagnosa } = useContext(DiagnosaRIContext);
  const { getKeluhanByregIdRuangId } = useContext(AssesmentKeluhanRIContext);
  const { getLastTTV } = useContext(GiziAsuhanContext);
  const { getDPPasien } = useContext(DischargePlanningContext);

  const { getGravikTTV } = useContext(AskepContext);
  const { getGrafikEWS, kosongkanFormEWS } = useContext(EwsRIContext);
  const { kosongkanform } = useContext(PemeriksaanLainContext);
  const {
    setprintLabPk,
    setprintLabPa,
    setpilihWaktu,
    setprintPerawatIGD,
    setprintDokterIGD,
    setprintRm02Kunjungan,
    setprintLapKala,
    jenisKala,
    setjenisKala,
  } = useContext(PrintOutContext);
  const { settabOrder, getDetailPasien, setruangId } =
    useContext(BankDarahContext);
  const { getKepulangan } = useContext(RM14Context);
  const { detailAnamnesaRI } = useContext(AnamnesaRIContext);

  const onLebar = (e) => {
    e === true ? setLebar(500) : setLebar(300);
    e === true ? setLebarNama("300px") : setLebarNama("250px");
  };
  const history = useHistory();
  const routeChange = () => {
    history.push("/pemeriksaanharian/ri/dashboardpasienri");
  };

  // Dalam Pilih Nama Pasien
  const handleClick = (props, pasienid) => {
    detailAnamnesaRI(props);
    aletDiagnosa(pasienid);
    setCurrent("dashboardpasienri");
    detailPasienRI(props);
    detailPasien(props);
    setItemsPaten([]);
    sessionStorage.setItem("noreg", props);
    sessionStorage.setItem("norm", pasienid);
    getLastTTV(props);
    getGravikTTV(props);
    getDPPasien(props);
    getGrafikEWS(props);
    KosongkanFormTTV();
    kosongkanCatatan();
    kosongkanform();
    setprintLabPk("");
    setprintLabPa("");
    setjenisKeterangan("");
    setnoregPulang("");
    kosongkanFormEWS();
    setpilihWaktu();
    setprintPerawatIGD();
    setprintDokterIGD();
    setprintRm02Kunjungan();
    getDetailPasien(props);
    settabOrder("1");
    setprintLapKala("");
    setjenisKala("");
    getTTpasien(props);
  };

  // dalam cari nama pasien/noreg
  const handleCari = (e) => {
    setloadPasien(true);
    if (abiyasa.includes(e.split("+").shift())) {
      setUnitOrder("9252");
      sessionStorage.setItem("ruangan", "ABIYASA");
      sessionStorage.setItem("RSMana", "ABIYASA");
    } else {
      setUnitOrder("9211");
      sessionStorage.setItem("ruangan", "RSMS");
      sessionStorage.setItem("RSMana", "RSMS");
    }
    setruangRiDesk(e);
    setruangRi(e.split("+").shift());
    cariPasienRuangRI(e.split("+").shift());
    getDiagnosa(e.split("+").shift());
    setruangId(e.split("+").shift());
    // setwaktuenroll(null);
  };
  const handleCariByKey = (e) => {
    setloadPasien(true);
    cariPasienRInama(e === "" ? " " : e, ruangRi);
  };

  const handleCariByKeyPulang = (e) => {
    setloadPasien(true);
    cariPasienRIPulang(e === "" ? " " : e, ruangRi);
  };

  const onrefresh = () => {
    setloadPasien(true);
    cariPasienRuangRI(ruangRi);
  };

  const columnsData = [
    {
      title: "No",
      width: "30px",
      render: (text, record, index) => (
        <Text style={{ fontSize: 12 }}>{(page - 1) * 10 + index + 1}</Text>
      ),
    },
    {
      title: "Registrasi",
      width: "80px",
      dataIndex: "registrasiId",
      sorter: (a, b) => a.registrasiId.localeCompare(b.registrasiId),
      render(text, record) {
        return {
          props: {
            style: {
              background:
                record.statusKonsul === true
                  ? record.statusJawab === false
                    ? "lime"
                    : "yellow"
                  : "",
              cursor: "default",
            },
          },
          children:
            record.statusKonsul === true ? (
              record.statusJawab === false ? (
                <Tooltip title="Konsultasi Belum Dijawab">{text}</Tooltip>
              ) : (
                <Tooltip title="Konsultasi Sudah Dijawab">{text}</Tooltip>
              )
            ) : (
              <Tooltip>{text}</Tooltip>
            ),
        };
      },
    },
    {
      title: "Nama",
      width: lebarnama,
      dataIndex: "namaPasien",
      sorter: (a, b) => a.namaPasien.localeCompare(b.namaPasien),
      render(text, record) {
        return {
          props: {
            style: {
              cursor: "default",
            },
          },
          children: (
            <Text strong style={{ fontSize: 12, color: "black" }}>
              {text}
            </Text>
          ),
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
      title: "No Pasien",
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
  ];
  const [layout, setLayout] = useState(false);
  const [currentt, setCurrentt] = useState(1);

  const MyPagination = ({ total, onChange, current }) => {
    return (
      <Pagination
        onChange={onChange}
        total={total}
        current={current}
        pageSize={15}
        simple={true}
        style={{ textAlign: "center" }}
      />
    );
  };
  const getData = (current, pageSize) => {
    // Normally you should get the data from the server
    return pasienRI.slice((current - 1) * pageSize, current * pageSize);
  };

  return (
    <Fragment>
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        // onCollapse={onCollapse}
        collapsedWidth={0}
        trigger={null}
        width={lebar}
        theme="light"
        style={{
          // background: '#fff',
          // overflow: "auto",
          height: "100%",
          position: "sticky",
          top: 35,
          left: 0,
          zIndex: 2,
        }}
      >
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "16px",
            width: 30,
            height: 38,
            position: "absolute",
            left: collapsed ? "0px" : lebar,
            top: "15px",
            backgroundColor: "black",
            color: "white",
          }}
        />
        <Select
          value={ruangRiDesk}
          dataSource={ruang}
          showSearch
          style={{ width: "100%" }}
          placeholder="Pilih ruang..."
          optionFilterProp="children"
          onChange={handleCari}
          filterOption={(input, option) =>
            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >=
            0
          }
        >
          {ruang.map((d) => (
            <Option key={d.ruangId + "+" + d.deskripsi}>{d.deskripsi}</Option>
          ))}
        </Select>
        <Flex gap="small">
          <Switch
            checkedChildren="Pasien Pulang"
            unCheckedChildren="Pasien Menginap"
            width="100%"
            onChange={(e) => {
              setkeyPasienpulang("");
              setswtichPasien(e);
              setCurpasRI("");
            }}
            checked={swtichPasien}
          />
          <Button
            type="primary"
            shape="round"
            size="small"
            onClick={() => {
              history.push("/dashboardRuangRI/ri");
            }}
          >
            SBAR
          </Button>
        </Flex>

        {draweropen ? (
          <SidebarKemoterapi />
        ) : (
          <>
            {swtichPasien ? (
              <>
                <Alert
                  message={
                    <TextLoop mask noWrap={true}>
                      <span>PASIEN SUDAH DIPULANGKAN!</span>
                      <span>SILAHKAN MENCARI DENGAN NAMA/NOREG!</span>
                    </TextLoop>
                    // <TextLoop>
                    // "PASIEN SUDAH DIPULANGKAN! SILAHKAN MENCARI DENGAN NAMA/NOREG!"
                    // </TextLoop>
                  }
                  type="warning"
                  showIcon
                />

                {/* <Search
                  placeholder="Cari Nama Pasien / No Reg..."
                  onChange={(e) => handleCariByKeyPulang(e.target.value)}
                /> */}
                <Search
                  placeholder="Cari Nama Pasien / No Reg..."
                  allowClear
                  enterButton="Cari"
                  // onChange={(e) => {
                  //   setkeyPasienpulang(e.target.value);
                  // }}
                  onSearch={(e) => {
                    e === "" || e === null
                      ? Modal.success({
                          content: "Ketikan No Registrasi / Nama Pasien!",
                        })
                      : handleCariByKeyPulang(e);
                  }}
                />
                <Table
                  loading={loadPasien}
                  rowClassName={(record, index) =>
                    record.registrasiId === pilih ? "colorpilih" : "fontkecil"
                  }
                  onRow={(record, rowIndex) => {
                    return {
                      onContextMenu: (event) => {
                        event.preventDefault();
                        if (!visible) {
                          document.addEventListener(
                            `click`,
                            function onClickOutside() {
                              setVisible(false);
                              document.removeEventListener(
                                `click`,
                                onClickOutside
                              );
                            }
                          );
                        }
                        setVisible(true);
                        setX(event.clientX);
                        setY(event.clientY);
                      },
                      onClick: (event) => {
                        setPilih(record.registrasiId);
                        handleClick(record.registrasiId, record.pasienId);
                        getKepulangan(record.registrasiId);
                        routeChange();
                      },
                    };
                  }}
                  pagination={false}
                  style={{ maxHeight: 570, fontSize: 8 }}
                  columns={columnsData}
                  dataSource={pasienRIPulang}
                  size="small"
                  scroll={{ x: 300, y: "63vh" }}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={"Silahkan Pilih Ruangan Terlebih Dahulu"}
                      />
                    ),
                  }}
                  bordered
                  footer={() => (
                    <div>
                      <Space>
                        Atur Lebar :
                        <Switch
                          onChange={onLebar}
                          checkedChildren="Max"
                          unCheckedChildren="Min"
                        />
                        {/* <Button
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
                    </Button> */}
                      </Space>
                      <br />
                      Keterangan Warna Konsul :
                      <Row>
                        <div className="backkonsulsudah">Sudah Dijawab</div>
                        &nbsp;
                        <div className="backkonsuljawab">Belum Dijawab</div>
                        &nbsp;
                      </Row>
                    </div>
                  )}
                />
              </>
            ) : (
              <>
                <Search
                  placeholder="Cari Nama Pasien / No Reg..."
                  onChange={(e) => handleCariByKey(e.target.value)}
                />
                <Table
                  loading={loadPasien}
                  rowClassName={(record, index) =>
                    record.registrasiId === pilih ? "colorpilih" : "fontkecil"
                  }
                  onRow={(record, rowIndex) => {
                    return {
                      onContextMenu: (event) => {
                        event.preventDefault();
                        if (!visible) {
                          document.addEventListener(
                            `click`,
                            function onClickOutside() {
                              setVisible(false);
                              document.removeEventListener(
                                `click`,
                                onClickOutside
                              );
                            }
                          );
                        }
                        setVisible(true);
                        setX(event.clientX);
                        setY(event.clientY);
                      },
                      onClick: (event) => {
                        setPilih(record.registrasiId);
                        handleClick(record.registrasiId, record.pasienId);
                        routeChange();
                      },
                    };
                  }}
                  pagination={false}
                  style={{ maxHeight: 570, fontSize: 8 }}
                  columns={columnsData}
                  dataSource={pasienRI}
                  size="small"
                  scroll={{ x: 300, y: "63vh" }}
                  locale={{
                    emptyText: (
                      <Empty
                        image={Empty.PRESENTED_IMAGE_SIMPLE}
                        description={"Silahkan Pilih Ruangan Terlebih Dahulu"}
                      />
                    ),
                  }}
                  bordered
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
                        <div className="backkonsulsudah">Sudah Dijawab</div>
                        &nbsp;
                        <div className="backkonsuljawab">Belum Dijawab</div>
                        &nbsp;
                      </Row>
                      {/* <Row>
                        <Button
                          type="primary"
                          shape="round"
                          size="small"
                          onClick={() => {
                            setmodalHistori(true);
                          }}
                        >
                          RIWAYAT
                        </Button>
                        <Button
                          type="primary"
                          shape="round"
                          size="small"
                          onClick={() => {
                            setmodalValidkaru(true);
                          }}
                        >
                          Validasi
                        </Button>
                      </Row> */}
                    </div>
                  )}
                />
              </>
            )}
          </>
        )}
      </Sider>
      <Modal
        width="95%"
        footer={null}
        open={modalHistori}
        onCancel={() => {
          setmodalHistori(false);
        }}
        style={{ top: 5 }}
        // centered={true}
        closable={true}
      >
        <HsitoriPasien />
      </Modal>
      <Modal
        width="95%"
        footer={null}
        open={modalValidkaru}
        onCancel={() => {
          setmodalValidkaru(false);
        }}
        style={{ top: 5 }}
        // centered={true}
        closable={true}
      >
        <FormValidasiKaru />
      </Modal>
    </Fragment>
  );
};

export default SidebarRI;
