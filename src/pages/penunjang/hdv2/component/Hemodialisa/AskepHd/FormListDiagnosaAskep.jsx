import React, { useContext, useState } from "react";
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
} from "antd";
// import PageheadRI from './PageheadRI';
// import AsuhanKep from './DiagnosaPasienAskep';
// import EvaluasiAskep from './EvaluasiAskep';
// import FormImplementasiAskep from './ImplementasiAskep';
// import FormAsuhanKeperawatan from './FormAsuhanKeperawatan';
import dayjs from "dayjs";
import Column from "antd/lib/table/Column";
import Iframe from "react-iframe";
import { AskepContext } from "../../../../../rawatinap/context/AskepContext";
import { MasterKriteriaAskepContext } from "../../../../../master/context/masteraskep/MasterKriteriaAskepContext";
import { MasterLuaranAskepContext } from "../../../../../master/context/masteraskep/MasterLuaranAskepContext";
import { MasterIntervensiAskepContext } from "../../../../../master/context/masteraskep/MasterIntervensiAskepContext";
import { MasterDiagnosaAskepContext } from "../../../../../master/context/masteraskep/MasterDiagnosaAskepContext";
import HdContext from "../../../HdContext";

const { PasiensContext } = HdContext;

// import { PasienContext } from '../../rawatjalan/context/PasienContext';

// const { TabPane } = Tabs;
const { Content } = Layout;

const { Panel } = Collapse;
const FormListDiagnosaAskep = () => {
  const props = useContext(PasiensContext);
  const {
    spinSimpanAskep,
    setspinspinSimpanAskep,
    ListAskepById,
    getAskepByIdByDx,
    getListImplementasiByIdByDx,
    curpasRI,
    userlog,
    deleteAskpeByIdByDx,
    getImplementasiByIdBDx,
    getHistoryKesimpulanByIdByDx,
    nTandaGejala,
    hiddenSaveButton,
    setHiddenSaveButton,
    hiddenSaveEdit,
    setHiddenSaveEdit,
    getTandaGejalaByNoreg,
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
  const [katon, setkaton] = useState(false);
  const [warnaRow, setWarnaRow] = useState([]);
  const onAmbilAskepByIdByDx = (id, dx, luaran, jenis, tdgejala) => {
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
    // setspinspinSimpanAskep(false);
  };
  const onCetakAskep = () => {
    setkaton(true);
  };
  const onKembali = () => {
    setkaton(false);
    //setKontrolForm(true);
    // setCetakForm(false);
  };
  const confirm = (id, dx) => {
    deleteAskpeByIdByDx(id, dx.split(" -").shift());
    console.log(id, dx);
    //message.success('Click on Yes');
  };

  const cancel = (e) => {
    console.log(e);
  };

  const url =
    "http://pchpmuklissim:82/rs/Pages/ReportViewer.aspx?%2fRJ%2fReportAskep&rs:Command=Render&rs:embed=true&ParameterId=";

  return (
    <div>
      <Spin spinning={spinSimpanAskep} tip="Mohon Tunggu...">
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
                  setWarnaRow(rowIndex);
                },
              };
            }}
            bordered
            locale={{ emptyText: <Empty description="Data Asuhan Kosong" /> }}
            pagination={{ pageSize: 5 }}
            dataSource={ListAskepById}
            size="small"
            // rowKey="reg"
            rowClassName={(record, rowIndex) =>
              rowIndex === warnaRow ? "warnacolompilih" : null
            }
          >
            <Column
              title="Tanggal"
              width="20%"
              // defaultSortOrder="descend"
              // sorter={(a, b) => a.tanggal.localeCompare(b.tanggal)}
              render={(ListAskepById) =>
                // <Button style={{ width: '2%' }} type="link" size="small"
                // onClick={() => onAmbilAskepByIdByDx(ListAskepById.registrasiId, ListAskepById.diagnosaId, ListAskepById.luaranId)}
                // >
                dayjs(ListAskepById.tanggal).format("DD-MM-YYYY HH:mm")
                // </Button>
              }
            />
            <Column
              title="Diagnosa"
              width="40%"
              render={(ListAskepById) => (
                <span>{ListAskepById.diagnosaId.split("- ").pop()}</span>
              )}
            />
            {/* <Column title="Luaran" width="30%"
                        render={(ListAskepById) => (
                            <span>
                                {ListAskepById.nTandaGejala.map(c => (
                                    c.tandaGejalaId
                                ))}
                            </span>
                        )} /> */}
            <Column
              title="Lama Intervensi"
              width="30%"
              render={(ListAskepById) => (
                <span>{ListAskepById.targetWaktu}</span>
              )}
            />
            <Column
              title="User"
              width="30%"
              render={(ListAskepById) => <span>{ListAskepById.userId}</span>}
            />
            {/* <Column title="Aksi" width="20%"
                        render={(ListAskepById) => (
                            <Popconfirm
                                title="Anda Yakin Akan Dihapus?"
                                onConfirm={() => confirm(ListAskepById.registrasiId, ListAskepById.diagnosaId)}
                                onCancel={cancel}
                                okText="Ya"
                                cancelText="Tidak"
                            >
                                <Button type='primary' danger>
                                    Hapus
                                </Button>
                            </Popconfirm>
                        )} /> */}
          </Table>
        </Card>

        <Modal
          closable={false}
          footer={null}
          visible={katon}
          onCancel={onKembali}
          width="835px"
          centered={true}
        >
          <Iframe
            url={url + props.pasien.result.registrasiId}
            width="800px"
            height="820px"
            id="suratkontrol"
            display="initial"
            position="relative"
          />
        </Modal>

        {/* <FormAsuhanKeperawatan /> */}

        {/* <Tabs defaultActiveKey="1" onChange={callback} type="card">
                <TabPane tab="Diagnosa Pasien" key="1">
                    <AsuhanKep />
                </TabPane> */}
        {/* <TabPane tab="Intervensi" key="2">
                    <Evaluasi />
                </TabPane> */}
        {/* <TabPane tab="Implementasi" key="3">
                    <FormImplementasiAskep />
                </TabPane>
                <TabPane tab="Evaluasi" key="4">
                    <EvaluasiAskep />
                </TabPane>
            </Tabs> */}
      </Spin>
    </div>
  );
};

export default FormListDiagnosaAskep;
