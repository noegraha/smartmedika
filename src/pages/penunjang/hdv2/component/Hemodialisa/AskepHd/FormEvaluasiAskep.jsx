import React, { useContext, useState } from "react";
import {
  Select,
  Form,
  Alert,
  Row,
  Col,
  Card,
  Button,
  Modal,
  Space,
  Table,
  Empty,
  DatePicker,
  Popconfirm,
  message,
  Spin,
} from "antd";
import Column from "antd/lib/table/Column";
import Iframe from "react-iframe";
import dayjs from "dayjs";
import { AskepContext } from "../../../../../rawatinap/context/AskepContext";
import { MasterKriteriaAskepContext } from "../../../../../master/context/masteraskep/MasterKriteriaAskepContext";
import { PasienRIContext } from "../../../../../rawatinap/context/PasienRIContext";
import { LoginContext } from "../../../../../rawatjalan/context";
import HdContext from "../../../HdContext";
import { PrintOutContext } from "../../../../../PrintOutDokumen/PrintOutContext";

// import CetakButtonAskep from './CetakButtonAskep';
// import CetakAskep from './CetakAskep';

// import dayjs from 'dayjs';
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { PasiensContext } = HdContext;

const { Option } = Select;
const FormEvaluasiAskep = () => {
  const props = useContext(PasiensContext);
  const [hiddenSave, setHiddeSave] = useState(true);
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const {
    getPrintAssAske,
    getPrintAsuhan,
    printasuhan,
    setprintAss,
    printAss,
    setprintAsuhan,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);
  const {
    spinCetakAskep,
    setspinCetakAskep,
    visibleCetakAskep,
    setvisibleCetakAskep,
    // tanggal, settanggal,
    diagnosaId,
    // setdiagnosaId, nTandaGejala, insertEmrAskep,
    luaranId,
    //  setluaranId, targetWaktu, settargetWaktu,
    // setnTandaGejala, nIntervensi, setnIntervensi,
    nKriteria,
    //  setnKriteria, getListAskepById,ListAskepById,getAskepByIdByDx,
    //  AskepByIdByDx,
    registrasiId,
    //  setregistrasiId, deleteAskpeByIdByDx,
    HasilEvaluasi,
    insertEvaluasiAskep,
    KriterianEvaluasiByIdByDx,
    getKriterianEvaluasiByIdByDx,
    tanggalEvaluasi,
    settanggalEvaluasi,
    hasilkesimpulan,
    sethasilKesimpulan,
    getKesimpulan,
    historyKesimpulan,
    historyKesimpulanByIdBydx,
    getHistoryKesimpulanByIdByDx,
    deleteEvaluasiById,
    katonEvaluasi,
    setKatonEvaluasi,
    kriteriaeva,
    setKriteriaeva,
    jnskriteria,
    setjnskriteria,
    diagnosaDeskripsi,
    getDataPrint,
    // listdataaskep, dataaskepid, targetWaktu, settargetWaktu, luaranId, setluaranId
  } = useContext(AskepContext);
  const {
    // kriteriaByLuaran, getbyluaranjns,
    jnsKriteriaByLuaran,
    kriteria,
    // getJnsKriteriaByLuaran,detailMasterkriteriaaskep
  } = useContext(MasterKriteriaAskepContext);
  const [hiddenKriteria, sethiddenKriteria] = useState(true);

  const dateFormat = "DD-MM-YYYY HH:mm";

  const pilihjnskriteria = (e) => {
    setjnskriteria(e);
    getKesimpulan(registrasiId, diagnosaId.split(" -").shift(), parseInt(e));
    getKriterianEvaluasiByIdByDx(
      registrasiId,
      diagnosaId.split(" -").shift(),
      e
    );
  };

  const onTglEvaluasi = (date) => {
    settanggalEvaluasi(date);
  };
  const pilihkriteriaevaluasi = () => {
    const kriteriabarueva = [];
    for (var i = 0; i < KriterianEvaluasiByIdByDx.length; i++) {
      kriteriabarueva.push({
        id: 0,
        registrasiId: registrasiId,
        diagnosaId: diagnosaId.split(" -").shift(),
        kriteriaId: KriterianEvaluasiByIdByDx.map((b) => b.kriteriaId)[i],
        jenis: parseInt(jnskriteria),
        tanggal: dayjs(tanggalEvaluasi).format("YYYY-MM-DDTHH:mm"),
        kesimpulan: hasilkesimpulan,
        userId: namauser,
      });
    }
    jnskriteria === ""
      ? message.warning("Pilih Kriteria Pasien Terebih Dahulu")
      : insertEvaluasiAskep(kriteriabarueva);
    console.log(kriteriabarueva);
  };

  const onfocustgl = () => {
    setHiddeSave(true);
  };

  const onCetakAskep = () => {
    setspinCetakAskep(true);
    setvisibleCetakAskep(true);
    getPrintAsuhan(props.pasien.result.registrasiId);
  };
  const onKembali = () => {
    setvisibleCetakAskep(false);
    setKatonEvaluasi(false);
    settanggalEvaluasi(dayjs());
    sethasilKesimpulan("");
    setjnskriteria("");
    setKriteriaeva([]);
    setHiddeSave(true);
  };
  const confirm = (registrasiId, dx, tgl) => {
    deleteEvaluasiById(
      registrasiId,
      dx.split(" -").shift(),
      dayjs(tgl).format("YYYY-MM-DD HH:mm")
    );
    console.log(
      registrasiId,
      dx.split(" -").shift(),
      dayjs(tgl).format("YYYY-MM-DD HH:mm")
    );
  };

  const cancel = (e) => {
    console.log(e);
  };
  const onTambahBaru = () => {
    diagnosaDeskripsi === ""
      ? message.warning("Silahkan Pilih Diagnosa Terlebih Dahulu")
      : setKatonEvaluasi(true);
  };
  return (
    <div>
      {/* <Spin spinning={spinCetakAskep}> */}
      <Row gutter={[8, 8]}>
        <Col span={24}>
          <Space>
            <Button
              type="primary"
              onClick={onTambahBaru}
              style={{ backgroundColor: "green" }}
            >
              Tambah Evaluasi
            </Button>
            <Button
              type="primary"
              onClick={onCetakAskep}
              style={{ backgroundColor: "orange" }}
            >
              Cetak Askep
            </Button>
          </Space>
        </Col>
        <Col span={24}>
          <Card
            title="Riwayat Evaluasi"
            headStyle={{ fontWeight: "bolder", backgroundColor: "whitesmoke" }}
            size="small"
            style={{
              borderWidth: "2px",
              borderColor: "darkgray",
              borderRadius: "4px",
            }}
          >
            <Table
              bordered
              locale={{
                emptyText: <Empty description="Data Evaluasi Kosong" />,
              }}
              pagination={{ pageSize: 5 }}
              dataSource={historyKesimpulanByIdBydx}
              size="small"
              rowKey="reg"
            >
              <Column
                title="Tanggal Evaluasi"
                key="reg"
                width="20%"
                defaultSortOrder="descend"
                sorter={(a, b) => a.tanggal.localeCompare(b.tanggal)}
                render={(historyKesimpulanByIdBydx) => (
                  <span>
                    {dayjs(historyKesimpulanByIdBydx.tanggal).format(
                      "DD-MM-YYYY HH:mm"
                    )}
                  </span>
                )}
              />
              <Column
                title="Diagnosa"
                key="reg"
                width="20%"
                render={(historyKesimpulanByIdBydx) => (
                  <span>
                    {historyKesimpulanByIdBydx.diagnosaId.split("- ").pop()}
                  </span>
                )}
              />
              <Column
                title="Kriteria Awal"
                key="reg"
                width="10%"
                render={(historyKesimpulanByIdBydx) => (
                  <span>
                    {"Kriteria " + historyKesimpulanByIdBydx.kriteriaTarget}
                  </span>
                )}
              />
              <Column
                title="Kriteria Akhir"
                key="reg"
                width="10%"
                render={(historyKesimpulanByIdBydx) => (
                  <span>
                    {"Kriteria " + historyKesimpulanByIdBydx.kriteriaHasil}
                  </span>
                )}
              />
              <Column
                title="Kesimpulan"
                key="reg"
                width="20%"
                render={(historyKesimpulanByIdBydx) => (
                  <div>
                    {historyKesimpulanByIdBydx.kesimpulan ===
                    "Masalah Belum Teratasi" ? (
                      <Alert
                        message={historyKesimpulanByIdBydx.kesimpulan}
                        type="error"
                      ></Alert>
                    ) : historyKesimpulanByIdBydx.kesimpulan ===
                      "Masalah Teratasi Sebagian" ? (
                      <Alert
                        message={historyKesimpulanByIdBydx.kesimpulan}
                        type="warning"
                      ></Alert>
                    ) : (
                      <Alert
                        message={historyKesimpulanByIdBydx.kesimpulan}
                        type="success"
                      ></Alert>
                    )}
                  </div>
                )}
              />
              <Column
                title="User"
                key="reg"
                width="20%"
                render={(historyKesimpulanByIdBydx) => (
                  <span>{historyKesimpulanByIdBydx.userId}</span>
                )}
              />
              <Column
                title="Aksi"
                width="10%"
                render={(historyKesimpulanByIdBydx) => (
                  <Popconfirm
                    title="Anda Yakin Akan Dihapus?"
                    onConfirm={() =>
                      confirm(
                        historyKesimpulanByIdBydx.registrasiId,
                        historyKesimpulanByIdBydx.diagnosaId,
                        historyKesimpulanByIdBydx.tanggal
                      )
                    }
                    onCancel={cancel}
                    okText="Ya"
                    cancelText="Tidak"
                  >
                    <Button
                      type="primary"
                      danger
                      hidden={
                        historyKesimpulanByIdBydx.userId.toUpperCase() ===
                        namauser.toUpperCase()
                          ? false
                          : true
                      }
                    >
                      Hapus
                    </Button>
                  </Popconfirm>
                )}
              />
            </Table>
          </Card>
        </Col>
      </Row>
      <Modal
        closable={false}
        footer={null}
        visible={katonEvaluasi}
        onCancel={onKembali}
        width="800px"
        // centered={true}
      >
        <Col span={24}>
          <Row gutter={[5, 5]}>
            <Col span={24}>
              <Alert
                message={"DIAGNOSA:     " + diagnosaDeskripsi}
                style={{ fontWeight: "bold" }}
                type="warning"
                span={24}
              />
            </Col>
            <Col span={24}>
              <Card
                size="small"
                title="Kondisi Setelah Perawatan"
                headStyle={{
                  fontWeight: "bolder",
                  backgroundColor: "whitesmoke",
                }}
              >
                <Row>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout}
                      label="Tanggal"
                      style={{ marginBottom: 5 }}
                    >
                      <DatePicker
                        onFocus={onfocustgl}
                        value={tanggalEvaluasi}
                        onChange={onTglEvaluasi}
                        style={{ width: "100%" }}
                        format={dateFormat}
                        showTime
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout}
                      label="Jenis Evaluasi"
                      style={{ marginBottom: 5 }}
                    >
                      <Select
                        value={jnskriteria}
                        onChange={pilihjnskriteria}
                        showSearch
                        placeholder="..."
                        optionFilterProp="children"
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {jnsKriteriaByLuaran.map((b) => (
                          <Option key={b.jenisKriteria}>
                            Kriteria {b.jenisKriteria}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout}
                      label="Kesimpulan"
                      style={{ marginBottom: 5 }}
                    >
                      <Alert
                        message={hasilkesimpulan}
                        style={{ fontWeight: "bold" }}
                        type={
                          hasilkesimpulan === "Masalah Belum Teratasi"
                            ? "error"
                            : hasilkesimpulan === "Masalah Teratasi Sebagian"
                            ? "warning"
                            : "success"
                        }
                        span={24}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Card>
            </Col>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                <Button type="primary" onClick={pilihkriteriaevaluasi}>
                  Simpan
                </Button>
                <Button onClick={onKembali}>Batal</Button>
              </Space>
            </Col>
          </Row>
          {/* </Card> */}
        </Col>
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={visibleCetakAskep}
        onCancel={() => {
          setvisibleCetakAskep(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printasuhan}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
    </div>
  );
};

export default FormEvaluasiAskep;
