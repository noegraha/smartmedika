import React, { useContext, useState } from "react";
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
} from "antd";
import { PasienContext } from "../context/PasienContext";
import { UndoOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { VClaimContext } from "../context/VClaimContext";

const { Search } = Input;
const { Text } = Typography;
const TabelpasienKontrol = () => {
  const {
    pasien,
    ruangasal,
    detailPasien,
    setLebar,
    setRefresh,
    detailAntrian,
    cariPasienNamaHariIni,
    tanggal,
    setLoading,
    poli1,
    poli2,
    cariPasienHariIni,
  } = useContext(PasienContext);
  const {
    setTanggalKontrolBPJS,
    setPilihPoliBPJS,
    setPilihDokterBPJS,
    getExpiredRujukan,
    getSuratKontrolBPJSbyKartu,
    setNoSEP,
    setTanggalAwal,
    setTanggalAkhir,
    setLoadingBPJS,
    setKontrolForm,
    detailRujukan,
  } = useContext(VClaimContext);
  const [pilih, setPilih] = useState(false);
  const [lebarnama, setLebarNama] = useState("120px");

  const onLebar = (e) => {
    e === true ? setLebar(450) : setLebar(250);
    e === true ? setLebarNama("180px") : setLebarNama("120px");
  };
  const handleClick = (e) => {
    if (
      e.namaPembayaran === "BPJS PBI" ||
      e.namaPembayaran === "BPJS NON PBI"
    ) {
      setKontrolForm(2);
      getSuratKontrolBPJSbyKartu(e.noPolish);
      getExpiredRujukan(e.noJaminan);
    } else {
      setKontrolForm(1);
    }
    detailPasien(e.registrasiId);
    setPilih(e.registrasiId);
    detailRujukan(e.registrasiId, e.noJaminan);
    setNoSEP(e.noJaminan);
    setTanggalKontrolBPJS(null);
    setPilihDokterBPJS(null);
    setPilihPoliBPJS(null);
    setLoadingBPJS(true);
    sessionStorage.setItem("noreg", e.registrasiId);
    sessionStorage.setItem("norm", e.pasienIdd);
    setTanggalAwal(dayjs().format("YYYY-MM-DD"));
    setTanggalAkhir(dayjs().add(29, "days").format("YYYY-MM-DD"));
  };
  const handleCari = (e) => {
    cariPasienNamaHariIni(e);
  };
  const [visible, setVisible] = useState(false);

  const columnsrsms = [
    {
      title: "No Reg",
      width: "75px",
      dataIndex: "registrasiId",
      sorter: (a, b) => a.registrasiId - b.registrasiId,
      render(text, record) {
        return {
          props: {
            style: {
              background: "rgb(48, 231, 240)",
              color: "#000000d9",
              cursor: "default",
              fontSize: "7",
            },
          },
          children: (
            <Button
              style={{
                padding: 0,
                textAlign: "left",
                whiteSpace: "normal",
                height: "auto",
              }}
              type="text"
            >
              {text}
            </Button>
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
      title: "No. RM",
      width: "80px",
      render: (pasien) => (
        <Text style={{ fontSize: 12 }}>{pasien.pasienId}</Text>
      ),
    },
    {
      title: "DPJP",
      width: "250px",
      sorter: (a, b) => a.namaDPJP.localeCompare(b.namaDPJP),
      render: (pasien) => (
        <Text style={{ fontSize: 12 }}>{pasien.namaDPJP}</Text>
      ),
    },
    {
      title: "Penjamin",
      width: "200px",
      sorter: (a, b) => a.namaPembayaran.localeCompare(b.namaPembayaran),
      render: (pasien) => (
        <Text style={{ fontSize: 12 }}>{pasien.namaPembayaran}</Text>
      ),
    },
  ];

  const onrefresh = () => {
    if (ruangasal === null) {
      message.warning("Pilih Ruang Terlebih Dahulu!");
    } else {
      setRefresh(true);
      cariPasienHariIni(poli1, dayjs(tanggal).format("YYYY-MM-DD"));
    }
  };
  return (
    <div>
      <Search
        placeholder="Cari Nama Pasien / No Reg..."
        onChange={(e) => handleCari(e.target.value)}
      />
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
              detailAntrian(record.registrasiId);
              setVisible(true);
            },
            onClick: (event) => {
              handleClick(record);
            },
          };
        }}
        rowClassName={(record, index) =>
          record.registrasiId === pilih ? "colorpilih" : "fontkecil"
        }
        style={{ maxHeight: 570, fontSize: 8 }}
        columns={columnsrsms}
        dataSource={pasien}
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
                      ? { backgroundColor: "forestgreen", borderColor: "green" }
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
          </div>
        )}
      />
    </div>
  );
};

export default TabelpasienKontrol;
