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
import { AskepContext } from "../context/AskepContext";
import { MasterKriteriaAskepContext } from "../../master/context/masteraskep/MasterKriteriaAskepContext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const { Option } = Select;
const FormEvaluasiAskep = () => {
  const [hiddenSave, setHiddeSave] = useState(true);
  const { pegawaiId, pegawai, namauser } = useContext(LoginContext);

  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const { curpasRI } = useContext(PasienRIContext);
  const {
    setvisibleCetakAskep,
    diagnosaId,
    luaranId,
    nKriteria,
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
  } = useContext(AskepContext);
  const { jnsKriteriaByLuaran, kriteria } = useContext(
    MasterKriteriaAskepContext
  );

  const dateFormat = "DD-MM-YYYY HH:mm";

  const pilihjnskriteria = (e) => {
    setjnskriteria(e);
    getKesimpulan(
      curpasRI.registrasiId,
      diagnosaId.split(" -").shift(),
      parseInt(e)
    );
    getKriterianEvaluasiByIdByDx(
      curpasRI.registrasiId,
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
        registrasiId: curpasRI.registrasiId,
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
        width="70%"
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
                <Button onClick={onKembali}>Batal</Button>
                <Button type="primary" onClick={pilihkriteriaevaluasi}>
                  Simpan
                </Button>
              </Space>
            </Col>
          </Row>
        </Col>
      </Modal>
    </div>
  );
};

export default FormEvaluasiAskep;
