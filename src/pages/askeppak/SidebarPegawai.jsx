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
import { UndoOutlined, SoundOutlined, BellTwoTone } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { Fragment } from "react";
import { MasterPegawaiContext } from "../master/context/masterpegawai/MasterPegawaiContext";
import { LogBookAskepContext } from "../master/context/masteraskep/LogBookAskepContext";
import dayjs from "dayjs";

// import TabelPasienRI from './TabelPasienRI';

const { Sider } = Layout;
const { Option } = Select;
const { Column } = Table;
const { Search } = Input;
const { Text } = Typography;

const SidebarPegawai = () => {
  const [page, setPage] = useState(1);
  const [collapsed, setCollapsed] = useState(false);
  const [dokterRuang, setdokterRuang] = useState([]);
  const [pilih, setPilih] = useState(false);
  const [lebarnama, setLebarNama] = useState("300px");
  const [lebar, setLebar] = useState("300px");

  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const {
    getBawahanKaru,
    listBawahan,
    setlistBawahan,
    infoBawahan,
    setinfoBawahan,
    getPenilaianPerawat,
    loading,
    setloading,
  } = useContext(LogBookAskepContext);
  const {
    pegawailist,
    getListPegawaisSkey,
    pegawaidetail,
    getPegawaiById,
    warnaPilih,
    setwarnaPilih,
    panggolBawahan,
    getpanggolBawahan,
  } = useContext(MasterPegawaiContext);

  const columnsData = [
    {
      title: "No",
      width: "30px",
      render: (text, record, index) => (
        <Text style={{ fontSize: 12 }}>{(page - 1) * 10 + index + 1}</Text>
      ),
    },
    {
      title: "ID",
      width: "50px",
      dataIndex: "idpegawai",
      sorter: (a, b) => a.namapegawai.localeCompare(b.namapegawai),
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
      title: "Nama",
      width: "250px",
      dataIndex: "namapegawai",
      sorter: (a, b) => a.namapegawai.localeCompare(b.namapegawai),
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
      title: "NIP",
      width: "250px",
      dataIndex: "nip",
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
  return (
    <Fragment>
      <Spin spinning={loading} tip="Mohon Tunggu...">
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
          {/* <Search
          placeholder="Ketikan Nama Pegawai"
          onSearch={(e) => getListPegawaisSkey(e)}
          enterButton
        /> */}
          {/* <Button
          onClick={() => {
            getBawahanKaru({
              id_pegawai: "UP0132",
            });
          }}
          type={"primary"}
        >
          Cari
        </Button> */}
          <Table
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
                  // detailAntrian(record.registrasiId);
                  setVisible(true);
                  setX(event.clientX);
                  setY(event.clientY);
                },
                onClick: (event) => {
                  setPilih(record.idpegawai);
                  setinfoBawahan(record);
                  getpanggolBawahan(
                    record.idpegawai.trim(),
                    dayjs().format("MM-YYYY")
                  );
                  getPenilaianPerawat(
                    record.id_user,
                    dayjs().format("MM-YYYY")
                  );
                  console.log(record);
                },
              };
            }}
            rowClassName={(record, index) =>
              record.idpegawai === pilih ? "colorpilih" : "fontkecil"
            }
            pagination={false}
            style={{ maxHeight: 570, fontSize: 8 }}
            columns={columnsData}
            dataSource={listBawahan}
            size="small"
            // rowKey="reg"
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
          />
        </Sider>
      </Spin>
    </Fragment>
  );
};

export default SidebarPegawai;
