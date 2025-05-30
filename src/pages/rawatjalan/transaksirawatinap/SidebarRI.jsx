import React, { Fragment, useContext, useState } from "react";
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
} from "antd";
import { UndoOutlined, SoundOutlined, BellTwoTone } from "@ant-design/icons";
import { PasienContext } from "../context/PasienContext";
import { PasienRIContext } from "../../rawatinap/context/PasienRIContext";
import { BillingContext } from "../context/BillingContext";

// import TabelPasienRI from './TabelPasienRI';

const { Sider } = Layout;
const { Option } = Select;
const { Column } = Table;
const { Search } = Input;
const { Text } = Typography;

const SidebarRIRJ = () => {
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
    pilih,
    setPilih,
    lebarnama,
    setLebarNama,
    lebar,
    setLebar,
    loadPasien,
    setloadPasien,
  } = useContext(PasienRIContext);
  const { detailBilling } = useContext(BillingContext);

  const onLebar = (e) => {
    e === true ? setLebar(500) : setLebar(300);
    e === true ? setLebarNama("300px") : setLebarNama("250px");
  };

  // Dalam Pilih Nama Pasien
  const handleClick = (props, pasienid) => {
    setCurrent("dashboardpasienri");
    console.log(props, pasienid);
    detailPasienRI(props);
    detailPasien(props);
    detailBilling(props);

    sessionStorage.setItem("noreg", props);
    sessionStorage.setItem("norm", pasienid);
  };

  // dalam cari nama pasien/noreg
  const handleCari = (e) => {
    setloadPasien(true);
    setruangRi(e);
    cariPasienRuangRI(e);
    console.log("ini ruangnya", e);
  };
  const handleCariByKey = (e) => {
    setloadPasien(true);
    cariPasienRInama(e === "" ? " " : e, ruangRi);
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
        <Select
          value={ruangRi}
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
            <Option key={d.ruangId}>{d.deskripsi}</Option>
          ))}
        </Select>

        <Search
          placeholder="Cari Nama Pasien / No Reg..."
          onChange={(e) => handleCariByKey(e.target.value)}
        />
        <Switch
          checkedChildren="Paging"
          unCheckedChildren="List"
          onChange={(e) => setLayout(e)}
          checked={layout}
        />
        {layout ? (
          <div>
            <MyPagination
              total={pasienRI.length}
              current={currentt}
              onChange={setCurrentt}
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
                          document.removeEventListener(`click`, onClickOutside);
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
                  },
                };
              }}
              pagination={false}
              style={{ maxHeight: 570, fontSize: 8 }}
              columns={columnsData}
              dataSource={getData(currentt, 15)}
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
                    <div className="backkonsulsudah">Sudah Dijawab</div>&nbsp;
                    <div className="backkonsuljawab">Belum Dijawab</div>&nbsp;
                  </Row>
                </div>
              )}
            />
          </div>
        ) : (
          <Table
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
                        document.removeEventListener(`click`, onClickOutside);
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
                  <div className="backkonsulsudah">Sudah Dijawab</div>&nbsp;
                  <div className="backkonsuljawab">Belum Dijawab</div>&nbsp;
                </Row>
              </div>
            )}
          />
        )}
      </Sider>
    </Fragment>
  );
};

export default SidebarRIRJ;
