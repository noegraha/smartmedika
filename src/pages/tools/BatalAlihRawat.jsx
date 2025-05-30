import { Button, Card, Input, Table, Modal, Alert } from "antd";
import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { KonsulContext } from "../rawatjalan/context/KonsulContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";
const { Column } = Table;
const { confirm } = Modal;
const BatalAlihRawat = () => {
  const { deleteAlihRawat, detailKonsulAlihRawat, konsulalih } =
    useContext(KonsulContext);
  const [noreg, setNoreg] = useState(null);
  function showConfirm(e) {
    confirm({
      title: (
        <Alert
          message="Apakah Anda yakin akan Membatalkan Konsul ?"
          type="warning"
        />
      ),
      icon: <ExclamationCircleOutlined />,
      content: "Data konsul yang dibatalkan akan terhapus.",
      onOk() {
        deleteAlihRawat(e);
      },
      onCancel() {
        console.log(e);
      },
    });
  }
  return (
    <div>
      <Card
        size="small"
        title="Batal Alih Rawat"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
      >
        <Input.Group compact>
          <Input
            style={{ width: "90%" }}
            onChange={(e) => setNoreg(e.target.value)}
            onPressEnter={() => detailKonsulAlihRawat(noreg)}
            placeholder="Masukkan nomor registrasi pasien..."
          />
          <Button
            style={{ width: "10%" }}
            type="primary"
            onClick={() => detailKonsulAlihRawat(noreg)}
          >
            Cari Konsul
          </Button>
        </Input.Group>
        <Table
          bordered
          pagination={false}
          dataSource={konsulalih}
          size="small"
          rowKey="reg"
          scroll={{ x: 700 }}
        >
          <Column
            title="Ruangan"
            key="reg"
            className="bgcolortunggu, tabeltabel2"
            width={100}
            render={(konsul) => (
              <span>
                Ruang Asal
                <br />
                {konsul.ruangDesk}
                <br />
                <br />
                Ruang Tujuan
                <br />
                {konsul.ruangTujuanDesk}
              </span>
            )}
          />
          <Column
            title="Dokter"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(konsul) => <span>{konsul.dokterDesk}</span>}
          />
          <Column
            title="Subjektive"
            width={130}
            key="reg"
            className="tabeltabel"
            render={(konsul) => <span>{konsul.subjektive}</span>}
          />
          <Column
            title="Objektive"
            width={130}
            key="reg"
            className="tabeltabel"
            render={(konsul) => <span>{konsul.objektive}</span>}
          />
          <Column
            title="Assesment"
            width={130}
            key="reg"
            className="tabeltabel"
            render={(konsul) => <span>{konsul.assesment}</span>}
          />
          <Column
            title="Planning"
            width={130}
            key="reg"
            className="tabeltabel"
            render={(konsul) => <span>{konsul.planning}</span>}
          />
          <Column
            title="Konsul"
            key="reg"
            className="tabeltabel"
            width={200}
            render={(konsul) => <span>{konsul.ringkasanPemeriksaan}</span>}
          />
          <Column
            title="Jawab Konsul"
            key="reg"
            className="tabeltabel"
            width={200}
            render={(konsul) => <span>{konsul.hasilPemeriksaan}</span>}
          />
          <Column
            title="Tindakan/Terapi"
            key="reg"
            className="tabeltabel"
            width={200}
            render={(konsul) => <span>{konsul.tindakan}</span>}
          />
          <Column
            title="Action"
            key="reg"
            fixed="right"
            className="tabeltabel"
            width={140}
            render={(konsul) => (
              <span>
                <Button
                  type="primary"
                  danger
                  size="small"
                  onClick={() => showConfirm(String(konsul.konsultasiId))}
                >
                  Batal
                </Button>
              </span>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default BatalAlihRawat;
