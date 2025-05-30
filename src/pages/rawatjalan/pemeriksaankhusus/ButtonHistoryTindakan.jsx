import { Button, Image, Modal, Spin, Table } from "antd";
import React, { useContext, useState } from "react";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import Iframe from "react-iframe";
import { PemeriksaanLainContext } from "../context/pemeriksaancontext/PemeriksaanLainContext";

const ButtonHistoryTindakan = () => {
  const {
    printPemLain,
    modalPemLain,
    setmodalPemLain,
    getPrintPemLain,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);
  const { historyPemeriksaan, historyPemeriksaanLain } = useContext(
    PemeriksaanLainContext
  );
  const [modal, setModal] = useState(false);
  const pasienid = sessionStorage.getItem("norm");
  const [visible, setVisible] = useState(false);
  const scaleStep = 0.3;
  const column = [
    {
      title: "Pemeriksaan",
      dataIndex: "deskripsiHasilPenunjang",
      key: "pemeriksaan",
    },
    {
      title: "Tanggal",
      key: "tanggal",
      render: (text, record) => record.tanggal.substring(0, 10),
    },
    {
      title: "Pelaksana",
      dataIndex: "pelaksanaDesk",
      key: "pelaksana",
    },
    {
      title: "Hasil Pemeriksaan",
      dataIndex: "hasilPemeriksaan",
      key: "hasil",
    },
    {
      title: "Link",
      dataIndex: "url",
      key: "url",
      render: (text, record) =>
        text === null ? (
          <></>
        ) : (
          <div>
            <Button
              type="primary"
              size="small"
              onClick={() => setVisible(true)}
            >
              Gambar
            </Button>
            <Image
              // width={200}
              style={{
                display: "none",
              }}
              src={`http://182.168.2.248:82/${text}`}
              preview={{
                visible,
                scaleStep,
                src: "http://182.168.2.248:82/" + text,
                onVisibleChange: (value) => {
                  setVisible(value);
                },
              }}
            />
          </div>
        ),
    },
    {
      title: "Action",
      render: (listpmrlain) => (
        <Button
          size="small"
          style={{ backgroundColor: "#bae637", borderColor: "#bae637" }}
          onClick={() =>
            getPrintPemLain(listpmrlain.kodeHasil, listpmrlain.registrasiId)
          }
        >
          Cetak
        </Button>
      ),
    },
  ];
  return (
    <div>
      <Button
        type="primary"
        onClick={() => {
          setModal(true);
          historyPemeriksaanLain(pasienid);
        }}
      >
        Riwayat Tindakan
      </Button>
      <Modal
        open={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
        footer={null}
        width={"70%"}
      >
        <Table
          pagination={false}
          dataSource={historyPemeriksaan}
          size="small"
          columns={column}
        />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        open={modalPemLain}
        onCancel={() => setmodalPemLain(false)}
      >
        <Spin spinning={loadDelay}>
          <Iframe
            onLoad={() => {
              setloadDelay(false);
            }}
            url={printPemLain}
            width="100%"
            height="750px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Spin>
      </Modal>
    </div>
  );
};

export default ButtonHistoryTindakan;
