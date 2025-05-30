import { Button, Table, Input, Modal, Row, Col } from "antd";
import React, { useContext, useState } from "react";
import { MasterWilayahContext } from "../context/masterwilayah/MasterWilayahContext";
import {
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
const { Search } = Input;
const { confirm } = Modal;
const MasterDesa = () => {
  const { desaList, getDesa, insertDesa, deleteDesa } =
    useContext(MasterWilayahContext);
  const [desaId, setDesaId] = useState([]);
  const [kecamatanId, setKecamatanId] = useState([]);
  const [namadesa, setNamaDesa] = useState("");
  const [modaledit, setModalEdit] = useState(false);
  const [modaltambah, setModalTambah] = useState(false);
  const datadesa = {
    desaId: desaId,
    kecamatanId: kecamatanId,
    desaNama: namadesa,
  };
  const tambahdatadesa = {
    desaId: desaId,
    kecamatanId: kecamatanId,
    desaNama: namadesa,
    jenisId: 0,
    status: true,
  };
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  function showConfirm() {
    confirm({
      title: "Apakah yakin akan menghapus data ini?",
      icon: <ExclamationCircleOutlined />,
      content: (
        <div>
          DesaID : {desaId}
          <br /> KecamatanID : {kecamatanId}
          <br /> Nama Desa : {namadesa}
        </div>
      ),
      onOk() {
        deleteDesa(desaId);
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  }
  const Popup = () =>
    visible && (
      <ul className="popup" style={{ left: `${x}px`, top: `${y}px` }}>
        <li
          style={{ color: "green" }}
          onClick={() => {
            setModalEdit(true);
          }}
        >
          <EditOutlined /> Edit
        </li>
        <li style={{ color: "red" }} onClick={showConfirm}>
          <DeleteOutlined /> Hapus
        </li>
      </ul>
    );
  const columns = [
    {
      title: "ID Desa",
      dataIndex: "desaId",
      key: "desaId",
    },
    {
      title: "Nama Provinsi",
      dataIndex: ["kecamatan", "kabupaten", "provinsi", "provinsiNama"],
      key: "provinsiNama",
    },
    {
      title: "Nama Kabupaten",
      dataIndex: ["kecamatan", "kabupaten", "kabupatenNama"],
      key: "kabupatenNama",
    },
    {
      title: "Nama Kecamatan",
      dataIndex: ["kecamatan", "kecamatanNama"],
      key: "kecamatanNama",
    },
    {
      title: "Nama Desa",
      dataIndex: "desaNama",
      key: "desaNama",
    },
  ];
  return (
    <div>
      <Table
        dataSource={desaList}
        columns={columns}
        size="small"
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
              setDesaId(record.desaId);
              setKecamatanId(record.kecamatan.kecamatanId);
              setNamaDesa(record.desaNama);
              setVisible(true);
              setX(event.clientX);
              setY(event.clientY); // right button click row
            },
          };
        }}
        title={() => (
          <Row>
            <Col flex="150px">
              <div style={{ fontSize: 18, fontWeight: "bold" }}>
                Master Desa
              </div>
            </Col>

            <Col flex="auto">
              <Search
                placeholder="Cari nama desa..."
                onSearch={(e) => getDesa(e)}
                enterButton
              />
            </Col>
            <Col flex="75px">
              <Button type="primary" onClick={() => setModalTambah(true)}>
                <PlusOutlined />
                Tambah Desa
              </Button>
            </Col>
          </Row>
        )}
      />
      <Modal
        title="Edit Desa"
        visible={modaledit}
        onOk={() => {
          insertDesa(datadesa);
          setModalEdit(false);
        }}
        onCancel={() => setModalEdit(false)}
      >
        Desa ID :{" "}
        <Input value={desaId} onChange={(e) => setDesaId(e.target.value)} />
        Kecamatan ID :{" "}
        <Input
          value={kecamatanId}
          onChange={(e) => setKecamatanId(e.target.value)}
        />
        Nama Desa :{" "}
        <Input value={namadesa} onChange={(e) => setNamaDesa(e.target.value)} />
      </Modal>

      <Modal
        title="Tambah Desa"
        visible={modaltambah}
        onOk={() => {
          insertDesa(tambahdatadesa);
          setModalTambah(false);
        }}
        onCancel={() => setModalTambah(false)}
      >
        Desa ID : <Input onChange={(e) => setDesaId(e.target.value)} />
        Kecamatan ID :{" "}
        <Input onChange={(e) => setKecamatanId(e.target.value)} />
        Nama Desa : <Input onChange={(e) => setNamaDesa(e.target.value)} />
      </Modal>

      <Popup />
    </div>
  );
};

export default MasterDesa;
