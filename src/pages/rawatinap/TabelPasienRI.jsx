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
} from "antd";
import {
  UndoOutlined,
  SoundOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { RM13RIContext } from "./context/RM13Context";
import { PelayananContext } from "../rawatjalan/context/Pelayanancontext";
import { MasterTandaGejalaContext } from "../master/context/masteraskep/MasterTandaGejalaContext";
import { MasterIntervensiAskepContext } from "../master/context/masteraskep/MasterIntervensiAskepContext";
import { AskepContext } from "./context/AskepContext";
import { PemeriksaanFisikContext } from "../rawatjalan/context/PemeriksaanFisikContext";
import { MasterBarangContext } from "../master/context/MasterBarangContext";
import { DiagnosaRIContext } from "./context/DiagnosaRIContext";
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

// import TabelPasienRI from './TabelPasienRI';

const { Sider } = Layout;
const { Option } = Select;
const { Column } = Table;
const { Search } = Input;
const { Text } = Typography;
const TabelPasienRI = () => {
  const [page, setPage] = useState(1);
  const [warnaRow, setWarnaRow] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [dokterRuang, setdokterRuang] = useState([]);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
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
  } = useContext(PasienRIContext);

  const { listOrder, setItemsPaten, getRiwayatObat } =
    useContext(ResepRIContext);

  const { settgl, setTtd, detailAnamnesaRI } = useContext(
    SuratKeteranganRIContext
  );

  const { detailMasterIntervensiaskep } = useContext(
    MasterIntervensiAskepContext
  );

  const { getDiagnosa, detailDiagnosa } = useContext(DiagnosaRIContext);

  // const [lebar, setLebar] = useState(250);
  // const [refresh, setRefresh] = useState(false);
  //askep

  // const [pilih, setPilih] = useState(false);
  const [pilihWarna, setpilihWarna] = useState(false);

  const [lebarnama, setLebarNama] = useState("250px");
  const [lebar, setLebar] = useState("250px");
  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("180px") : setLebarNama("150px");
  };
  const history = useHistory();
  const routeChange = () => {
    // history.push("/pemeriksaanharian/ri");
    history.push("/pemeriksaanharian/ri/dashboardpasienri");
  };

  // Dalam Pilih Nama Pasien
  const handleClick = (props, pasienid) => {
    // console.log(props, pasienid)
    setpilihWarna(props);
    detailPasienRI(props);
    // setCurrent("dashboardpasienri");
    detailPasien(props);
    // loadPelayananRI(ruangRi);
    setItemsPaten([]);
    getRiwayatObat();
    // settgl(null);
    // setTtd(false);
    sessionStorage.setItem("noreg", props);
    sessionStorage.setItem("norm", pasienid);
    // setTabkey("1");
    //detailHasilRadiologi(props);
    // detailterimapasienRI(props); //mengambil data terimapasien ri jika sudah di simpan
    // detailRM13RI(props);
    // detailDiagnosa(props);
    // detailPemfisik(props);
    //askep
    //  kosongkanformaskep();
    // getListAskepById(props);
    // getListImplementasiById(props);
    //listMasterTandaGejala();
    // detailMasterIntervensiaskep();
    // getKeluhanByregIdRuangId(props, ruangRi);
    // detailBilling(props);
    // getListOrderPenunjang(props);
    // listOrder(props);
    // detailAnamnesaRI(props);
  };

  // dalam cari nama pasien/noreg
  const handleCari = (e) => {
    setruangRi(e);
    //cariPasienRI(e);
    cariPasienRuangRI(e);
    getDiagnosa(e);
    // loadPelayanan(e);
    console.log("ini cari berdasarkan ruang", e);
  };
  const handleCariByKey = (e) => {
    cariPasienRInama(e === "" ? " " : e, ruangRi);
  };

  const onrefresh = () => {
    // syncBayarKHS(ruangasal);
    // syncKonsulKHSAll(ruangasal);
    // setRefresh(true);
  };

  const columnsData = [
    {
      title: "No",
      width: "30px",
      // sorter: (a, b) => a.namaPembayaran.localeCompare(b.namaPembayaran),
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
      // render(text, record) {
      render: (text, record) => <Text style={{ fontSize: 12 }}>{text}</Text>,
      // return {
      //   props: {
      //     style: {
      //       background: "",
      //       color: "#000000d9",
      //       cursor: "default",
      //       fontSize: "7",
      //     },
      //   },
      //   children:
      //     (
      //       <Button
      //         style={{
      //           fontSize: 11,
      //           padding: 0,
      //           textAlign: "left",
      //           whiteSpace: "normal",
      //           height: "auto",
      //         }}
      //         danger={record.telemedicine ? true : false}
      //         type="link"
      //         size="small"
      //       >
      //         {text}
      //       </Button>
      //     )
      // };
      // },
    },
    {
      title: "DPJP",
      width: "250px",
      sorter: (a, b) => a.namaDPJP.localeCompare(b.namaDPJP),
      render: (pasienRI) => (
        <Text style={{ fontSize: 12 }}>{pasienRI.namaDPJP}</Text>
      ),
    },
    {
      title: "No Pasien",
      width: "80px",
      render: (pasienRI) => (
        <Text style={{ fontSize: 12 }}>{pasienRI.pasienId}</Text>
      ),
    },
    {
      title: "Penjamin",
      width: "200px",
      sorter: (a, b) => a.namaPembayaran.localeCompare(b.namaPembayaran),
      render: (pasienRI) => (
        <Text style={{ fontSize: 12 }}>{pasienRI.namaPembayaran}</Text>
      ),
    },
  ];
  return (
    <Fragment>
      <Sider
        breakpoint="lg"
        // collapsedWidth="0"
        // // style={{ background: '#fff', left: 0 }}
        // style={{
        //   background: '#fff',
        //   height: 'auto',
        //   marginTop: '38px',
        //   position: 'sticky', left: 0, top: 0
        // }}
        // collapsible collapsed={collapsed} onCollapse={onCollapse}
        // trigger={null}
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
        <Table
          onRow={(record, rowIndex) => {
            return {
              onContextMenu: (event) => {
                event.preventDefault();
                if (!visible) {
                  document.addEventListener(`click`, function onClickOutside() {
                    setVisible(false);
                    document.removeEventListener(`click`, onClickOutside);
                  });
                }
                // detailAntrian(record.registrasiId);
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
            record.registrasiId === pilihWarna ? "colorpilih" : "fontkecil"
          }
          style={{ maxHeight: 570, fontSize: 8 }}
          columns={columnsData}
          dataSource={pasienRI}
          size="small"
          scroll={{ x: 300, y: "58vh" }}
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
                  // defaultChecked={true}
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
                <div className="backkonsuljawab">Belum Dijawab</div>&nbsp;
                {/* <div className="backkonsulperlu">Perlu Dijawab</div> */}
              </Row>
            </div>
          )}
        />
      </Sider>
    </Fragment>
  );
};

export default TabelPasienRI;
