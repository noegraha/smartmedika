import React, { useContext, useState, Fragment } from "react";
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
  DatePicker,
} from "antd";
import { UndoOutlined, SoundOutlined, BellTwoTone } from "@ant-design/icons";
import { Link, useHistory } from "react-router-dom";
import { EswlContext } from "./context/EswlCotext";
import dayjs from "dayjs";

const { Sider } = Layout;
const { Option } = Select;
const { Column } = Table;
const { Search } = Input;
const { Text } = Typography;

const Sidebareswl = () => {
  const [lebarnama, setLebarNama] = useState("300px");
  const [lebar, setLebar] = useState("300px");
  const [page, setPage] = useState(1);
  const [warnaRow, setWarnaRow] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const {
    pasieneswl,
    setpasieneswl,
    loadPasien,
    setloadPasien,
    cariPasieneswl,
  } = useContext(EswlContext);

  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const onLebar = (e) => {
    e === true ? setLebar(500) : setLebar(300);
    e === true ? setLebarNama("300px") : setLebarNama("250px");
  };
  //   const history = useHistory();
  //   const routeChange = () => {
  //     history.push("/pemeriksaanharian/ri/dashboardpasienri");
  //   };

  // Dalam Pilih Nama Pasien
  const handleClick = (props, pasienid) => {};

  const onrefresh = () => {
    setloadPasien(true);
    cariPasieneswl("9157", "9423", dayjs(tglcari).format("YYYY-MM-DD"));
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
      dataIndex: "NOREG",
      sorter: (a, b) => a.NOREG.localeCompare(b.NOREG),
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
      title: "Nama",
      width: lebarnama,
      dataIndex: "NAMAPASIEN",
      sorter: (a, b) => a.NAMAPASIEN.localeCompare(b.NAMAPASIEN),
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
      title: "Bagian",
      width: "250px",
      dataIndex: "NAMABAGIAN",
      sorter: (a, b) => a.NAMABAGIAN.localeCompare(b.NAMABAGIAN),
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
      title: "No Order",
      width: "80px",
      dataIndex: "NOORDER",
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
      dataIndex: "NAMAPT",
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
  const [pilih, setPilih] = useState(false);
  const [tglcari, settglcari] = useState("");

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

  return (
    <Fragment>
      <Sider
        breakpoint="lg"
        collapsible
        collapsed={collapsed}
        collapsedWidth={0}
        trigger={null}
        width={lebar}
        theme="light"
        style={{
          height: "100%",
          position: "sticky",
          top: 35,
          left: 0,
          zIndex: 2,
        }}
      >
        <DatePicker
          style={{ width: "100%" }}
          value={tglcari}
          format={"DD-MM-YYYY"}
          onChange={(e) => {
            setloadPasien(true);
            settglcari(e);
            cariPasieneswl("9157", "9423", dayjs(e).format("YYYY-MM-DD"));
            console.log(dayjs(e).format("YYYY-MM-DD"));
          }}
        />
        <Table
          rowClassName={(record, index) =>
            record.NOREG === pilih ? "colorpilih" : "fontkecil"
          }
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
                setVisible(true);
                setX(event.clientX);
                setY(event.clientY);
              },
              onClick: (event) => {
                setPilih(record.NOREG);
                handleClick(record.NOREG, record.NOPASIEN);
                // routeChange();
              },
            };
          }}
          pagination={false}
          style={{ maxHeight: 570, fontSize: 8 }}
          columns={columnsData}
          dataSource={pasieneswl}
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
            </div>
          )}
        />
      </Sider>
    </Fragment>
  );
};

export default Sidebareswl;
