import React, { useContext, useState } from "react";
import { Input, Button, Row, Col, Table, Card, Modal } from "antd";
import { PantuanInfeksiContext } from "../context/PantuanInfeksiContext";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context";
import dayjs from "dayjs";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { confirm } = Modal;
const { TextArea } = Input;
const Formpantuaninfeksi = () => {
  const { ppi, insertPPI } = useContext(PantuanInfeksiContext);
  const { curpas, ruangasal } = useContext(PasienContext);
  const { namauser } = useContext(LoginContext);
  const [infeksi, setInfeksi] = useState([]);
  const [keterangan, setKeterangan] = useState("");
  const checkFor = ["9119", "9176"];
  const isippi = checkFor.includes(ruangasal) ? ppi[0] : [];
  const columns = [
    {
      title: "Kode",
      dataIndex: "indikatorId",
      key: "key",
    },
    {
      title: "Nama",
      dataIndex: "namaIndikator",
    },
  ];

  const intvbaru = [];
  for (var i = 0; i < ppi.length; i++) {
    intvbaru.push({
      //registrasiId: curpasRI.registrasiId,
      // diagnosaId: diagnosaId,
      key: (i + 1).toString(),
      ...ppi[i],
    });
  }
  let fLen = ppi.length;

  for (let i = 1; i < fLen; i++) {
    ppi.map((v) => ({ ...v, key: i }));
  }
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datainfeksi = {
    infeksi: infeksi,
    keterangan: keterangan,
  };
  const onInfeksi = (a, b, c) => {
    // console.log("a", a);
    // console.log("b", b);
    // console.log("c", c);
    if (b === true) {
      setInfeksi([
        ...infeksi,
        {
          registrasiId: curpas.registrasiId,
          ruangId: curpas.ruangId,
          kodeTindakan: a.indikatorId,
          namaTindakan: a.namaIndikator,
          tanggal: dayjs().format("YYYY-MM-DD"),
          // pelaksanaId: "string",
          // keterangan: keterangan,
          userId: namauser,
          clientHost: host,
          clientIp: ip,
        },
      ]);
    } else {
      setInfeksi(infeksi.filter((item) => item.kodeTindakan !== a.indikatorId));
    }
  };
  function showConfirm() {
    confirm({
      title: "Apakah Anda yakin data yang diinput sudah benar ?",
      icon: <ExclamationCircleOutlined />,
      content: "Data yang sudah diinputkan tidak bisa diubah kembali.",
      onOk() {
        insertPPI(datainfeksi);
      },
      onCancel() {
        console.log(datainfeksi);
      },
    });
  }
  return (
    <Card
      size="small"
      title="Pantuan Infeksi"
      headStyle={{ fontWeight: "bolder", backgroundColor: "lavenderblush" }}
      style={{
        borderWidth: "2px",
        borderColor: "darkgray",
        borderRadius: "4px",
      }}
    >
      <Row gutter={[8, 8]}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Table
            size="small"
            rowSelection={{
              type: "checkbox",
              columnWidth: "60px",
              fixed: "right",
              // selectedRowKeys: [1],
              selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
              onSelect: (record, selected, selectedRows) =>
                onInfeksi(record, selected, selectedRows),
              onSelectAll: (selected, selectedRows, changeRows) =>
                onInfeksi(selected, selectedRows, changeRows),
            }}
            columns={columns}
            dataSource={intvbaru}
            pagination={false}
          />
        </Col>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          Keterangan :
          <TextArea
            row={3}
            value={keterangan}
            onChange={(e) => setKeterangan(e.target.value)}
          />
          <Row>
            <Col span={24} style={{ textAlign: "right" }}>
              <Button
                type="primary"
                htmlType="submit"
                size="small"
                onClick={() => showConfirm()}
              >
                Simpan
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default Formpantuaninfeksi;
