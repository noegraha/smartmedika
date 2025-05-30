import React, { Fragment } from "react";
import { Table, Button, Card, Alert, Modal, Space } from "antd";
import { KonsulContext } from "../context/KonsulContext";
import { useContext } from "react";
import Formkonsul from "../komponen/formkonsul";
import Formjawabkonsul from "../komponen/formjawabkonsul";
import { PasienContext } from "../context/PasienContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const { Column } = Table;
const { confirm } = Modal;

const FormKonsul = () => {
  const { konsul, deleteKonsul } = useContext(KonsulContext);
  const { ruangasal, curpas } = useContext(PasienContext);
  function showConfirm(e, f) {
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
        deleteKonsul(e, f);
      },
      onCancel() {
        console.log(e, f);
      },
    });
  }
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }).format(date);
  };
  return (
    <Fragment>
      <Card
        title="Konsul"
        size="small"
        headStyle={{
          fontWeight: "bolder",
          backgroundColor: "beige",
        }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={
          ruangasal === "9125" || ruangasal === "9182" ? (
            <></>
          ) : (
            <Space>
              <Formkonsul />
            </Space>
          )
        }
      >
        <Table
          bordered
          pagination={false}
          dataSource={konsul}
          size="small"
          rowKey="reg"
          scroll={{ x: 700 }}
        >
          <Column
            title="Ruangan Dokter"
            key="reg"
            className="bgcolortunggu, tabeltabel2"
            width={200}
            render={(konsul) => (
              <span>
                <b>Ruang Asal</b>
                <br />
                {konsul.ruangDesk}
                <br />
                <b>Dokter Asal</b>
                <br />
                {konsul.dokterDesk}
                <br />
                <b>Waktu Konsul</b> <br />
                {formatDate(konsul.tanggal)}
                <br />
                <br />
                <b>Ruang Tujuan</b>
                <br />
                {konsul.ruangTujuanDesk}
                <br />
                <b>Dokter Tujuan</b>
                <br />
                {konsul.dokterTujuan}
                <br />
                <b>Waktu Jawab</b> <br />
                {formatDate(konsul.tanggalJawab)}
              </span>
            )}
          />
          <Column
            title="S.O.A.P."
            width={330}
            key="reg"
            className="tabeltabel"
            render={(konsul) => (
              <span>
                <b>S : </b>
                {konsul.subjektive}
                <br />
                <br />
                <b>O : </b>
                {konsul.objektive}
                <br />
                <br />
                <b>A : </b>
                {konsul.assesment}
                <br />
                <br />
                <b>P : </b>
                {konsul.planning}
              </span>
            )}
          />
          <Column
            title={<div>Konsul</div>}
            key="reg"
            className="backkonsultable"
            width={200}
            render={(konsul) => <span>{konsul.ringkasanPemeriksaan}</span>}
          />
          <Column
            title="Jawab Konsul"
            key="reg"
            className="backkonsuljawabtable"
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
                {curpas.ruangKonsul === null ||
                curpas.ruangKonsul === undefined ? (
                  <></>
                ) : ruangasal === curpas.ruangKonsul ||
                  curpas.ruangKonsul.substring(0, 1) === "A" ? (
                  konsul.hasilPemeriksaan === null ||
                  konsul.hasilPemeriksaan === "." ? (
                    <div>
                      <Formjawabkonsul dokterJawabId={konsul.dokterJawabId} />
                      {curpas.ruangKonsul.substring(0, 1) === "A" ? null : (
                        <Button
                          type="primary"
                          danger
                          size="small"
                          onClick={() =>
                            showConfirm(
                              String(konsul.konsultasiId),
                              konsul.registrasiId
                            )
                          }
                        >
                          Batal
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div>
                      <Button size="small" disabled>
                        Sudah dijawab
                      </Button>
                    </div>
                  )
                ) : konsul.hasilPemeriksaan === null ? (
                  <div>
                    <Button size="small" disabled>
                      Belum dijawab
                    </Button>
                  </div>
                ) : (
                  <div>
                    <Button size="small" disabled>
                      Sudah dijawab
                    </Button>
                  </div>
                )}
              </span>
            )}
          />
        </Table>
      </Card>
    </Fragment>
  );
};

export default FormKonsul;
