import React, { Fragment, useContext, useState } from "react";
import {
  Table,
  Input,
  Button,
  Tag,
  Tooltip,
  Empty,
  Typography,
  Switch,
  Space,
} from "antd";
import { UndoOutlined, SoundOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { PasienContext } from "../../../rawatjalan/context/PasienContext";
const { Search } = Input;
const { Text } = Typography;
const TabelPasienTransaksiPenunjang = () => {
  const {
    pasien,
    cariPasien,
    ruangasal,
    setLebar,
    poli1,
    cariPasienPoli,
    setRefresh,
    // getPasienDetail,
  } = useContext(PasienContext);

  const [pilih, setPilih] = useState(false);
  const [lebarnama, setLebarNama] = useState("180px");

  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("180px") : setLebarNama("120px");
  };
  const handleClick = (props, id) => {
    setPilih(props);
    sessionStorage.setItem("noreg", props);
    sessionStorage.setItem("norm", id);
  };
  const handleCari = (e) => {
    cariPasien(e);
    // console.log(e);
  };
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const Popup = () =>
    visible && (
      <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
        <li
          style={{ color: "green" }}
          onClick={() => {
            test();
          }}
        >
          <SoundOutlined /> Panggil
        </li>
      </ul>
    );
  const columns = [
    {
      title: "No Order",
      width: "90px",
      // fixed: "left",
      render: (pasien) => (
        <div>
          {pasien.verified ? (
            <Tooltip title="Sudah ditandatangan Dokter" placement="leftTop">
              <Tag color="#2db7f5">{pasien.noAntrianKlinik}</Tag>
            </Tooltip>
          ) : (
            <Tooltip>{pasien.noAntrianKlinik}</Tooltip>
          )}
        </div>
      ),
    },
    {
      title: "No Reg",
      width: "90px",
      // fixed: "left",
      sorter: (a, b) => a.registrasiId - b.registrasiId,
      render: (pasien) => (
        <div>
          {pasien.ruangKonsul !== null ? (
            pasien.ruangKonsul === ruangasal && pasien.ruangId !== ruangasal ? (
              <Tooltip title="Konsultasi perlu dijawab">
                <Tag color="magenta">{pasien.registrasiId}</Tag>
              </Tooltip>
            ) : pasien.ruangKonsul === ruangasal &&
              pasien.ruangId === ruangasal ? (
              <Tooltip title="Konsultasi sudah dijawab">
                <Tag color="green">{pasien.registrasiId}</Tag>
              </Tooltip>
            ) : pasien.ruangKonsul !== ruangasal &&
              pasien.ruangId === ruangasal ? (
              <Tooltip title="Konsultasi belum dijawab">
                <Tag color="orange">{pasien.registrasiId}</Tag>
              </Tooltip>
            ) : (
              <Tag>{pasien.registrasiId}</Tag>
            )
          ) : (
            pasien.registrasiId
          )}
        </div>
      ),
    },
    {
      title: "No Pasien",
      width: "80px",
      render: (pasien) => (
        <Text style={{ fontSize: 12 }}>{pasien.pasienId}</Text>
      ),
    },
    {
      title: "Nama Pasien",
      width: lebarnama,
      render: (pasien) => (
        <div>
          <Link to="/app/form/anamnesa">
            <Button
              style={{
                fontSize: 11,
                padding: 0,
                textAlign: "left",
                whiteSpace: "normal",
                height: "auto",
              }}
              // type={pilih === pasien.registrasiId ? "primary" : "link"}
              type="link"
              size="small"
              onClick={() => handleClick(pasien.registrasiId, pasien.pasienId)}
            >
              {pasien.namaPasien}
            </Button>
          </Link>
        </div>
      ),
    },
    {
      title: "Unit Asal",
      width: "250px",
      // defaultSortOrder: "descend",
      sorter: (a, b) => a.namaDPJP.localeCompare(b.namaDPJP),
      render: (pasien) => (
        <Text style={{ fontSize: 12 }}>{pasien.namaDPJP}</Text>
      ),
    },
    {
      title: "Tgl Order",
      width: "100px",
      // defaultSortOrder: "descend",
      sorter: (a, b) => a.namaDPJP.localeCompare(b.namaDPJP),
      render: (pasien) => (
        <Text style={{ fontSize: 12 }}>{pasien.namaDPJP}</Text>
      ),
    },
  ];

  const onrefresh = () => {
    cariPasienPoli(poli1);
    setRefresh(true);
  };
  return (
    <div>
      <Table
        onRow={(record, rowIndex) => {
          return {
            // right button click row
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
              handleClick(record.registrasiId, record.pasienId);
              console.log(record);
            },
          };
        }}
        rowClassName={(record, index) =>
          record.registrasiId === pilih ? "colorpilih" : "fontkecil"
        }
        style={{ maxHeight: 570 }}
        columns={columns}
        dataSource={pasien}
        size="small"
        scroll={{ x: 300, y: "70vh" }}
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
                // onChange={onLebar}
                checkedChildren="Max"
                unCheckedChildren="Min"
              />
              <Button
                size="small"
                type="primary"
                onClick={onrefresh}
                style={{ backgroundColor: "forestgreen", borderColor: "green" }}
              >
                <UndoOutlined />
                Refresh Pasien
              </Button>
            </Space>
          </div>
        )}
      />
      <Popup />
    </div>
  );
};

export default TabelPasienTransaksiPenunjang;
