import React, { Fragment, useContext } from "react";
import { Table, Modal } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { JadwalRadioterapiContext } from "../context/JadwalRadioterapiContext";
import "../style/style.css";

const PageheadJadwalRadioterapi = () => {
  const {
    listTbOrder,
    // main
    //func
    postDilayani,
    getDetailJadwal,
    // spin
    spinTbOrder,
  } = useContext(JadwalRadioterapiContext);

  const columns = [
    {
      title: "No",
      dataIndex: "NoAntrian",
      key: "NoAntrian",
      align: "center",
      width: 55,
      sorter: (a, b) => a.NoAntrian - b.NoAntrian,
      render: (text) => (
        <div>
          <b>{text}</b>
        </div>
      ),
    },
    {
      title: "No Reg",
      dataIndex: "NOREG",
      key: "NOREG",
      align: "center",
      width: "75px",
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Nama",
      dataIndex: "Nama",
      key: "Nama",
      align: "center",
      width: "200px",
      sorter: (a, b) => a.Nama.localeCompare(b.Nama),
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "No RM",
      dataIndex: "PasienId",
      key: "PasienId",
      align: "center",
      width: "75px",
    },
    {
      title: "Pemeriksaan",
      dataIndex: "Pemeriksaan",
      key: "Pemeriksaan",
      align: "center",
      width: "300px",
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Diagnosa",
      dataIndex: "DIAGNOSA",
      key: "DIAGNOSA",
      align: "center",
      width: "200px",
      ellipsis: true,
      // render: text => <div style={{ textAlign: 'left' }}>{text}</div>,
    },
    {
      title: "Dokter",
      dataIndex: "NamaDokter",
      key: "NamaDokter",
      align: "center",
      width: "250px",
      render: (text) => <div style={{ textAlign: "left" }}>{text}</div>,
    },
    {
      title: "Unit Order",
      dataIndex: "UnitOrder",
      key: "UnitOrder",
      align: "center",
      width: "250px",
    },
    // {
    //   title: 'Aksi',
    //   key: 'operation',
    //   fixed: 'right',
    //   align: 'center',
    //   width: 100,
    //   render: () => <Space size="middle">
    //     <a
    //       onClick={() => {
    //         console.log('test');
    //       }}>
    //       <EditOutlined />
    //     </a>
    //     <a><LikeOutlined /></a>
    //     <a><SolutionOutlined /></a>
    //   </Space>,
    // },
  ];

  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i,
      no: i + 1,
      NOREG: "2205090044",
      Nama: "ABDURRAKHMAN ALHAKIM, SDR",
      PasienId: "02187472",
      Pemeriksaan: "CT SCAN THORAX/PARU-PARU DENGAN KONTRAS",
      DIAGNOSA: "DEVIASI NASAL SEPTUM DENGAN HIPERTROPI KONKA",
      NamaDokter: "KHRISNANTO NUGROHO.Dr.Sp.OT.MM",
      UnitOrder: "KLINIK SENDI PANGGUL DAN LUTUT - RSMS",
    });
  }

  return (
    <Fragment>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
          zIndex: 1,
          paddingTop: 6,
          paddingBottom: 6,
          paddingRight: 6,
          paddingLeft: 28,
          backgroundColor: "white",
        }}
        bordered
      >
        {/* <Card
          size="small"
          style={{ height: '565px' }} >
        </Card> */}
        <span style={{ marginLeft: "5px" }}>
          <b>Daftar Order Pasien :</b>
        </span>
        <Table
          onRow={(record) => {
            return {
              onClick: () => {
                if (record.NoAntrian && record.Status === "1") {
                  Modal.confirm({
                    title: "Konfirmasi",
                    icon: <ExclamationCircleOutlined />,
                    content: "Pasien sudah terjadwal, apakah sudah terlayani?",
                    okText: "Sudah",
                    cancelText: "Belum",
                    onOk() {
                      let data = {
                        noAntrian: record.NoAntrian,
                        noOrder: record.NOORDER,
                        registrasiId: record.NOREG,
                        kodePmr: record.KODEPMR,
                        userId: record.UserId,
                      };
                      postDilayani(data);
                    },
                    onCancel() {
                      getDetailJadwal(
                        record.NOORDER,
                        record.NOREG,
                        record.KODEPMR
                      );
                    },
                  });
                } else if (record.Status === "2") {
                  Modal.info({
                    title: "Informasi",
                    content: "Pasien sudah Terlayani.",
                  });
                } else {
                  getDetailJadwal(record.NOORDER, record.NOREG, record.KODEPMR);
                }
              },
            };
          }}
          dataSource={listTbOrder}
          columns={columns}
          bordered
          loading={spinTbOrder}
          pagination={false}
          size="small"
          className="RCM_two_level_table1"
          rowClassName={(record, index) =>
            record.Status === "1"
              ? "terjadwal"
              : record.Status === "2"
              ? "terlayani"
              : ""
          }
          scroll={{ y: "250px" }}
          style={{ height: "280px" }}
        />
      </PageHeader>
    </Fragment>
  );
};
export default PageheadJadwalRadioterapi;
