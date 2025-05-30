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
import { AskepContext } from "../../rawatinap/context/AskepContext";
import { MasterKriteriaAskepContext } from "../../master/context/masteraskep/MasterKriteriaAskepContext";
import CetakAskep from "./CetakAskep";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { Option } = Select;
const FormEvaluasiAskep = () => {
  const { pegawaiId, pegawai } = useContext(LoginContext);
  const [hiddenSave, setHiddeSave] = useState(true);
  const { curpas } = useContext(PasienContext);
  const { namauser } = useContext(LoginContext);
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
  const onKriteriaevaluasi = (value) => {
    setKriteriaeva(value);
  };
  const pilihjnskriteria = (e) => {
    setjnskriteria(e);
    getKriterianEvaluasiByIdByDx(
      registrasiId,
      diagnosaId.split(" -").shift(),
      e
    );
    setKriteriaeva([]);
    setHiddeSave(true);
    getKesimpulan(registrasiId, diagnosaId.split(" -").shift(), parseInt(e));
    setHiddeSave(false);
    sethiddenKriteria(true);
    //getbyluaranjns(luaranId.slice(0, 5), e);
    // console.log('ini data luaranya', luaranId, e, registrasiId, diagnosaId.split(' -').shift(), e);
    // console.log('ini data luaranya', e);
    // console.log('ini data luaranya', registrasiId);
    // console.log('ini data luaranya', diagnosaId.slice();
  };
  // const onAmbilAskepByIdByDxEvaLuasi = (id, dx, luaran) => {
  //     detailMasterkriteriaaskep();
  //     getAskepByIdByDx(id, dx.slice(0, 6));
  //     getJnsKriteriaByLuaran(luaran.slice(0, 5));
  //     console.log('ini luarannya cuk', luaran.slice(0, 5), id, dx.slice(0, 6));
  // }
  const onFocusKriteriaeva = () => {
    sethiddenKriteria(false);
    setHiddeSave(true);
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
    jnskriteria == ""
      ? message.warning("Pilih Kriteria Pasien Terebih Dahulu")
      : // kriteriaeva == '' ? message.warning('Pilih SubKriteria Pasien Terebih Dahulu') :
        //   hasilkesimpulan == '' ? message.warning('Ambil Kesimpulan Pasien Terebih Dahulu') :
        //setKriteriaeva(kriteriabarueva);
        insertEvaluasiAskep(kriteriabarueva);
    console.log(kriteriabarueva);
  };

  const onNilai = () => {
    getKesimpulan(
      registrasiId,
      diagnosaId.split(" -").shift(),
      parseInt(jnskriteria)
    );
    setHiddeSave(false);
    sethiddenKriteria(true);
  };
  const onfocustgl = () => {
    setHiddeSave(true);
  };
  const onfocusJenisKriteria = () => {
    setHiddeSave(true);
  };

  const onCetakAskep = () => {
    setspinCetakAskep(true);
    setvisibleCetakAskep(true);
    getDataPrint(curpas.registrasiId);
  };
  const onKembali = () => {
    setvisibleCetakAskep(false);
    setKatonEvaluasi(false);
    settanggalEvaluasi(dayjs());
    sethasilKesimpulan("");
    setjnskriteria("");
    setKriteriaeva([]);
    setHiddeSave(true);
    //setKontrolForm(true);
    // setCetakForm(false);
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
    //message.success('Click on Yes');
  };

  const cancel = (e) => {
    console.log(e);
  };
  const onTambahBaru = () => {
    diagnosaDeskripsi === ""
      ? message.warning("Silahkan Pilih Diagnosa Terlebih Dahulu")
      : pegawai !== null
      ? pegawai.slice(0, 1) === "D"
        ? message.warning(
            "Maaf Dokter Tidak Dapat Melakukan Pengisian Evaluasi Keperawatan"
          )
        : setKatonEvaluasi(true)
      : setKatonEvaluasi(true);
  };
  const url =
    "http://pchpmuklissim:82/rs/Pages/ReportViewer.aspx?%2fRJ%2fReportAskep&rs:Command=Render&rs:embed=true&ParameterId=";
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
              {/* <Column title="Diagnosa" key="reg" className="bgcolortunggu" width="30%"
                                render={(historyKesimpulan) => (
                                    <Button style={{ width: '2%' }} type="link" size="small"
                                        onClick={() => onAmbilAskepByIdByDxEvaLuasi(historyKesimpulan.registrasiId)}
                                    >
                                        {dayjs(historyKesimpulan.tanggal).format('DD-MM-YYYY HH:mm')}
                                    </Button>
                                )}
                            /> */}
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
        width="70%"
        centered={true}
      >
        <Col span={24}>
          {/* <Card title='Form Evaluasi Asuhan Keperawatan' headStyle={{ fontWeight: 'bolder', backgroundColor: 'beige' }}
                        size="small"
                        style={{
                            borderWidth: "2px",
                            borderColor: "darkgray",
                            borderRadius: "4px",
                        }}> */}
          <Row gutter={[5, 5]}>
            <Col span={24}>
              <Alert
                message={"DIAGNOSA:     " + diagnosaDeskripsi}
                style={{ fontWeight: "bold" }}
                type="warning"
                span={24}
              />
            </Col>
            {/* <Col span={24}>
                            <Card size="small" title="Kondisi Sebelum Perawatan" headStyle={{ fontWeight: "bolder", backgroundColor: 'whitesmoke' }}>
                                <Row>
                                    <Col span={24}>
                                        <Form.Item  {...formItemLayout} label="Kriteria Awal" style={{ marginBottom: 5 }}>
                                            <Select
                                                style={{ fontWeight: 'bolder', color: 'black', width: '100%', maxWidth: '33vw' }}
                                                disabled
                                                value={nKriteria}
                                                mode="multiple"
                                                allowClear
                                                showSearch
                                                source={kriteria}
                                                //onChange={onKriteria}
                                                tokenSeparators={[',']}
                                                placeholder="..."
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }
                                            >
                                                {kriteria.map(b => (
                                                    <Option key={b.kriteriaId}>{b.kriteriaId}</Option>
                                                ))}
                                            </Select>
                                        </Form.Item>
                                    </Col>
                                </Row>
                            </Card>
                        </Col> */}
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
                        disabled
                      />
                    </Form.Item>
                  </Col>
                  <Col span={24}>
                    <Form.Item
                      {...formItemLayout}
                      label="INFO"
                      style={{ marginBottom: 5 }}
                    >
                      <Alert
                        message="Untuk Melakukan Evaluasi Cukup Pilih Jenis Evaluasi Lalu Simpan"
                        type="info"
                        showIcon
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
                        // onFocus={onfocusJenisKriteria}
                        onChange={pilihjnskriteria}
                        showSearch
                        // style={{ width: 500 }}
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
                  {/* <Col span={24}>
                    <Form.Item  {...formItemLayout} label="Kriteria Evaluasi" style={{ marginBottom: 5 }}>
                      <Select
                        style={{ width: '100%', maxWidth: '33vw' }}
                        onFocus={onFocusKriteriaeva}
                        value={kriteriaeva}
                        mode="multiple"
                        allowClear
                        showSearch
                        source={KriterianEvaluasiByIdByDx}
                        onChange={onKriteriaevaluasi}
                        tokenSeparators={[',']}
                        placeholder="..."
                        filterOption={(input, option) =>
                          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                        }
                      >
                        {KriterianEvaluasiByIdByDx.map(b => (
                          <Option key={b.kriteriaId}>{b.deskripsi}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col span={2} style={{ textAlign: 'left' }}>
                    <Button type='primary' onClick={onNilai} hidden={hiddenKriteria}>Evaluasi</Button>
                  </Col> */}
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
                  {/* <Col span={24} style={{ textAlign: 'right' }}>
                                        <Button type="primary" onClick={onNilai} hidden={hiddeneva}>Evaluasi</Button>
                                    </Col> */}
                </Row>
              </Card>
            </Col>
            <Col span={24} style={{ textAlign: "right" }}>
              <Space>
                <Button
                  type="primary"
                  onClick={pilihkriteriaevaluasi}
                  // hidden={hiddenSave}
                >
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
        closable={false}
        footer={null}
        visible={visibleCetakAskep}
        onCancel={onKembali}
        width="70%"
        centered={true}
      >
        <CetakAskep />
        {/* <Iframe
                    url={url + curpasRI.noreg}
                    width="800px"
                    height="820px"
                    id="suratkontrol"
                    display="initial"
                    position="relative"
                /> */}
      </Modal>
      {/* </Spin> */}
    </div>
  );
};

export default FormEvaluasiAskep;
