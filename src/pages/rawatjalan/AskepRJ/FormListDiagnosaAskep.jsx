import React, { useContext, useState } from "react";
import { Table, Empty, Modal, Spin } from "antd";
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import Iframe from "react-iframe";
import { PasienContext } from "../context/PasienContext";
import { AskepContext } from "../../rawatinap/context/AskepContext";
import { MasterKriteriaAskepContext } from "../../master/context/masteraskep/MasterKriteriaAskepContext";
import { MasterLuaranAskepContext } from "../../master/context/masteraskep/MasterLuaranAskepContext";
import { MasterIntervensiAskepContext } from "../../master/context/masteraskep/MasterIntervensiAskepContext";
import { MasterDiagnosaAskepContext } from "../../master/context/masteraskep/MasterDiagnosaAskepContext";
import { MasterImplementasiAskepContext } from "../../master/context/masteraskep/MasterImplementasiAskepContext";

const FormListDiagnosaAskep = () => {
  const { curpas } = useContext(PasienContext);
  const { getImplementasiByIntervensiId, getImplementasiByDiagnosaId } =
    useContext(MasterImplementasiAskepContext);
  const {
    spinSimpanAskep,
    setspinspinSimpanAskep,
    getAskepByIdByDx,
    getListImplementasiByIdByDx,
    getImplementasiByIdBDx,
    getHistoryKesimpulanByIdByDx,
    setHiddenSaveButton,
    setHiddenSaveEdit,
    getTandaGejalaByNoreg,
    warnaRow,
    setWarnaRow,
    getCatatanRJ,
    getKeimpulanHisRJ,
    getListImplementasiByIdByDxBylayanana,
    ListAskepByIdByLayanana,
  } = useContext(AskepContext);
  const { getJnsKriteriaByLuaran, detailMasterkriteriaaskep, getbyluaranjns } =
    useContext(MasterKriteriaAskepContext);
  const { getluaranbydiagnosaid } = useContext(MasterLuaranAskepContext);
  const { getintervensibydx } = useContext(MasterIntervensiAskepContext);
  const { diagnosabytandagejala } = useContext(MasterDiagnosaAskepContext);
  const [katon, setkaton] = useState(false);
  const onAmbilAskepByIdByDx = (
    id,
    dx,
    luaran,
    jenis,
    tdgejala,
    ruang,
    tanggal,
    nIntervensi
  ) => {
    setspinspinSimpanAskep(true);
    getTandaGejalaByNoreg(id);
    diagnosabytandagejala(tdgejala);
    console.log(
      "ini tanda gejala",
      id,
      dx.split(" -").shift(),
      luaran.split(" -").shift(),
      jenis,
      tdgejala
    );
    getluaranbydiagnosaid(dx.split(" -").shift());
    getImplementasiByDiagnosaId(dx.split(" -").shift());
    getbyluaranjns(luaran.split(" -").shift(), jenis);
    getintervensibydx(dx.split(" -").shift());

    getAskepByIdByDx(id, dx.split(" -").shift());

    detailMasterkriteriaaskep();
    getJnsKriteriaByLuaran(luaran.split(" -").shift());

    getImplementasiByIdBDx(id, dx.split(" -").shift());
    getListImplementasiByIdByDx(id, dx.split(" -").shift());

    getHistoryKesimpulanByIdByDx(id, dx.split(" -").shift());
    setHiddenSaveButton(true);
    setHiddenSaveEdit(false);
    getCatatanRJ(
      id,
      ruang.split(" -").shift(),
      dayjs(curpas.tanggalMasuk.split("-").reverse().join("-")).format(
        "YYYY-MM-DD"
      )
    );
    getImplementasiByIntervensiId(nIntervensi);
    getKeimpulanHisRJ(
      id,
      dx.split(" -").shift(),
      ruang.split(" -").shift(),
      tanggal
    );
    getListImplementasiByIdByDxBylayanana(id, dx.split(" -").shift(), 2);
  };
  const onKembali = () => {
    setkaton(false);
  };

  const url =
    "http://pchpmuklissim:82/rs/Pages/ReportViewer.aspx?%2fRJ%2fReportAskep&rs:Command=Render&rs:embed=true&ParameterId=";

  return (
    <div>
      <Spin spinning={spinSimpanAskep} tip="Mohon Tunggu...">
        <Table
          onRow={(record, rowIndex) => {
            return {
              onClick: (e) => {
                onAmbilAskepByIdByDx(
                  record.registrasiId,
                  record.diagnosaId,
                  record.luaranId,
                  Array.from(new Set(record.nKriteria.map((d) => d.jenis))),
                  record.nTandaGejala.map((c) => c.tandaGejalaId),
                  record.ruangId,
                  record.tanggal,
                  record.nIntervensi.map((c) => c.intervensiId.toString())
                );
                setWarnaRow(rowIndex);
              },
            };
          }}
          bordered
          locale={{ emptyText: <Empty description="Data Asuhan Kosong" /> }}
          pagination={false}
          dataSource={ListAskepByIdByLayanana}
          size="small"
          rowClassName={(record, rowIndex) =>
            rowIndex === warnaRow ? "warnacolompilih" : null
          }
        >
          <Column
            title="Tanggal"
            width="20%"
            render={(ListAskepByIdByLayanana) => (
              <span>
                {ListAskepByIdByLayanana.tanggal}
                <br></br>
                <br></br>
                {ListAskepByIdByLayanana.deskripsiRuang}
              </span>
            )}
          />
          <Column
            title="Tanda Gejala"
            width="30%"
            render={(ListAskepByIdByLayanana) => (
              <span>
                {ListAskepByIdByLayanana.nTandaGejala.map((b) => (
                  <span>
                    - {b.deskripsi.toUpperCase()}
                    <br></br>
                  </span>
                ))}
              </span>
            )}
          />
          <Column
            title="Diagnosa Keperawatan"
            width="20%"
            render={(ListAskepByIdByLayanana) => (
              <span>
                {ListAskepByIdByLayanana.deskripsiDiagnosa.toUpperCase()}
              </span>
            )}
          />
          <Column
            title="Implementasi"
            width="30%"
            render={(ListAskepByIdByLayanana) => (
              <span>
                {ListAskepByIdByLayanana.nImplementasi.map((b) => (
                  <span>
                    - {b.deskripsi.toUpperCase()}
                    <br></br>
                  </span>
                ))}
              </span>
            )}
          />
        </Table>

        <Modal
          closable={false}
          footer={null}
          open={katon}
          onCancel={onKembali}
          width="835px"
          centered={true}
        >
          <Iframe
            url={url + curpas.registrasiId}
            width="800px"
            height="820px"
            id="suratkontrol"
            display="initial"
            position="relative"
          />
        </Modal>
      </Spin>
    </div>
  );
};

export default FormListDiagnosaAskep;
