import React, { useContext, useEffect, useState } from "react";
import {
  Row,
  Col,
  Card,
  Button,
  Table,
  Empty,
  Collapse,
  Modal,
  Layout,
  Affix,
  Spin,
  Space,
  Popconfirm,
  Popover,
} from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import Iframe from "react-iframe";
import { AskepContext } from "../../rawatinap/context/AskepContext";
import { MasterKriteriaAskepContext } from "../../master/context/masteraskep/MasterKriteriaAskepContext";
import { MasterLuaranAskepContext } from "../../master/context/masteraskep/MasterLuaranAskepContext";
import { MasterIntervensiAskepContext } from "../../master/context/masteraskep/MasterIntervensiAskepContext";
import { MasterDiagnosaAskepContext } from "../../master/context/masteraskep/MasterDiagnosaAskepContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { PantuanInfeksiContext } from "../context/PantuanInfeksiContext";
import AlertPPI from "../pemeriksaanharian/AlertPPI";
const { confirm } = Modal;

const { Content } = Layout;

const { Panel } = Collapse;
const FormListDiagnosaAskep = () => {
  const { dataalert, setdataalert } = useContext(PantuanInfeksiContext);
  const { curpasRI } = useContext(PasienRIContext);
  const {
    spinSimpanAskep,
    setspinspinSimpanAskep,
    ListAskepById,
    getAskepByIdByDx,
    getListImplementasiByIdByDx,
    deleteAskpeByIdByDx,
    getImplementasiByIdBDx,
    getHistoryKesimpulanByIdByDx,
    nTandaGejala,
    hiddenSaveButton,
    setHiddenSaveButton,
    hiddenSaveEdit,
    setHiddenSaveEdit,
    getTandaGejalaByNoreg,
    warnaRow,
    setWarnaRow,
    spinGetAskep,
  } = useContext(AskepContext);
  const { getJnsKriteriaByLuaran, detailMasterkriteriaaskep, getbyluaranjns } =
    useContext(MasterKriteriaAskepContext);
  const { luaranbydx, getluaranbydiagnosaid, setLuaranbydx } = useContext(
    MasterLuaranAskepContext
  );
  const { intervensibydx, getintervensibydx } = useContext(
    MasterIntervensiAskepContext
  );
  const { dxbyGejala, diagnosabytandagejala } = useContext(
    MasterDiagnosaAskepContext
  );
  const onAmbilAskepByIdByDx = (id, dx, luaran, jenis, tdgejala) => {
    setspinspinSimpanAskep(true);
    getTandaGejalaByNoreg(id);
    diagnosabytandagejala(tdgejala);
    getluaranbydiagnosaid(dx.split(" -").shift());
    getbyluaranjns(luaran.split(" -").shift(), jenis);
    getintervensibydx(dx.split(" -").shift());
    getAskepByIdByDx(id, dx.split(" -").shift());
    detailMasterkriteriaaskep();
    getJnsKriteriaByLuaran(luaran.split(" -").shift());
    getImplementasiByIdBDx(id, dx.split(" -").shift());
    getListImplementasiByIdByDx(id, dx.split(" -").shift());
    getHistoryKesimpulanByIdByDx(id, dx.split(" -").shift());
  };
  return (
    <div>
      <Card
        title="Diagnosa Pasien"
        headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
        size="small"
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Table
          loading={spinGetAskep}
          onRow={(record, rowIndex) => {
            return {
              onClick: (e) => {
                onAmbilAskepByIdByDx(
                  record.registrasiId,
                  record.diagnosaId,
                  record.luaranId,
                  Array.from(new Set(record.nKriteria.map((d) => d.jenis))),
                  record.nTandaGejala.map((c) => c.tandaGejalaId)
                );
                console.log(
                  record.registrasiId,
                  record.diagnosaId,
                  record.luaranId,
                  Array.from(new Set(record.nKriteria.map((d) => d.jenis))),
                  record.nTandaGejala.map((c) => c.tandaGejalaId)
                );
                setWarnaRow(rowIndex);
              },
            };
          }}
          bordered
          locale={{ emptyText: <Empty description="Data Asuhan Kosong" /> }}
          pagination={{ pageSize: 5 }}
          dataSource={ListAskepById}
          size="small"
          rowClassName={(record, rowIndex) =>
            rowIndex === warnaRow ? "warnacolompilih" : null
          }
        >
          <Column
            title="Tanggal"
            width="20%"
            render={(ListAskepById) => (
              <span>
                {dayjs(ListAskepById.tanggal).format("DD-MM-YYYY HH:mm")}
                <br></br>
                {ListAskepById.deskripsiRuang}
              </span>
            )}
          />
          <Column
            title="Diagnosa"
            width="40%"
            render={(ListAskepById) => (
              <span>{ListAskepById.diagnosaId.split("- ").pop()}</span>
            )}
          />
          <Column
            title="Lama Intervensi"
            width="30%"
            render={(ListAskepById) => <span>{ListAskepById.targetWaktu}</span>}
          />
          <Column
            title="User"
            width="30%"
            render={(ListAskepById) => <span>{ListAskepById.userId}</span>}
          />
          <Column
            title="Aksi"
            width="20%"
            render={(text, record) => {
              const currentDate = new Date();
              const tglDate = new Date(record.tanggal);
              const difference = currentDate.getTime() - tglDate.getTime();
              const differenceInMinutes = Math.floor(difference / 1000 / 60);

              if (differenceInMinutes > 10) {
                return null; // Hide the button if the time difference is more than 10 minutes
              }

              return (
                <Space size="middle">
                  <Popconfirm
                    title="Anda Yakin Akan Dihapus?"
                    onConfirm={() =>
                      deleteAskpeByIdByDx(
                        record.registrasiId,
                        record.diagnosaId.split(" -").shift()
                      )
                    }
                    onCancel={() => console.log("")}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Popover
                      content="Tombol Akan Hilang Dalam Waktu 10 Menit"
                      title="INFO!"
                    ></Popover>
                    <Button type="primary" danger>
                      Hapus
                    </Button>
                  </Popconfirm>
                </Space>
              );
            }}
          />
        </Table>
      </Card>
    </div>
  );
};

export default FormListDiagnosaAskep;
