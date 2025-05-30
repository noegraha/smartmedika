import React, { useContext, Fragment } from "react";
import {
  Table,
  Button,
  Select,
  Form,
  Popconfirm,
  message,
  Row,
  Col,
  Card,
  Input,
  Modal,
  Collapse,
} from "antd";
import { PelayananContext } from "../context/Pelayanancontext";
import { DiagnosaContext } from "../context/Diagnosacontext";
import { PasienContext } from "../context/PasienContext";
import { LoginContext } from "../context";
import { CatatanmedisContext } from "../context/CatatanmedisContext";
const { Column } = Table;
const { Option } = Select;
const { TextArea } = Input;
const { Panel } = Collapse;
const FormDiagnosa = () => {
  const {
    diagnosa,
    insertDiagnosa,
    jendiagnosa,
    detdiagnosa,
    deleteDiagnosa,
    diag,
    kasus,
    pemeriksa,
    jenisdiagnosis,
    setDiagnosaKode,
    setKasus,
    setPemeriksa,
    setJenisDiagnosis,
    riwayatpenyakit,
    loadriwayat,
    loadingDiagnosa,
  } = useContext(DiagnosaContext);
  const { assesment } = useContext(CatatanmedisContext);
  const { dokterall } = useContext(PelayananContext);
  const { curpas, ruangasal, noreg } = useContext(PasienContext);
  const { namauser } = useContext(LoginContext);
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datadiagnosa = [
    {
      registrasiId: curpas.registrasiId,
      noUrut: 1,
      ruangId: curpas.ruangId,
      diagnosisId: diag,
      jenisDiagnosisId: isNaN(jenisdiagnosis) ? null : parseInt(jenisdiagnosis),
      kasusBl: kasus,
      pelaksanaId:
        pemeriksa === null
          ? curpas.ruangKonsul !== null
            ? null
            : curpas.dokterId
          : pemeriksa,
      userId: namauser,
      clientHost: host,
      clientIp: ip,
    },
  ];

  const simpanDiagnosa = () => {
    // e.preventDefault();
    if (
      kasus === null ||
      jenisdiagnosis === null ||
      diag === null
      // pemeriksa === null
    ) {
      Modal.warning({ content: "Input belum lengkap" });
    } else if (noreg === null) {
      Modal.warning({
        content:
          "Maaf pasien belum di klik. Silahkan klik Pasien terlebih dahulu",
      });
    } else {
      insertDiagnosa(datadiagnosa);
    }
  };
  const onDelete = (noreg, d) => {
    deleteDiagnosa(noreg, d);
  };
  const cancel = () => {
    message.error("Batal Hapus");
  };
  const [form] = Form.useForm();
  return (
    <Fragment>
      <Form
        form={form}
        name="diagnosa"
        initialValues={{ remember: true }}
        onFinish={simpanDiagnosa}
      >
        <Row gutter={[8, 2]}>
          <Col span={4} xs={24} sm={20} md={20} lg={10} xl={10}>
            Diagnosa :{" "}
            <Form.Item rules={[{ required: true }]}>
              <Select
                dataSource={diagnosa}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Diagnosa"
                optionFilterProp="children"
                onChange={(value) => setDiagnosaKode(value)}
                value={diag}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {diagnosa.map((d) => (
                  <Option key={d.diagnosisId}>
                    {d.diagnosisId + " - " + d.diagnosisDesk}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4} xs={24} sm={4} md={4} lg={3} xl={3}>
            Kasus :
            <Form.Item rules={[{ required: true }]} requiredMark>
              <Select
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Kasus"
                optionFilterProp="children"
                onChange={(e) => setKasus(e)}
                value={kasus}
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                <Option key={"L"}>Lama</Option>
                <Option key={"B"}>Baru</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={4} xs={24} sm={8} md={8} lg={3} xl={3}>
            Jenis Diagnosa :{" "}
            <Form.Item rules={[{ required: true }]}>
              <Select
                dataSource={jendiagnosa}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Jenis"
                optionFilterProp="children"
                onChange={(e) => setJenisDiagnosis(e)}
                value={
                  isNaN(String(jenisdiagnosis)) ? null : String(jenisdiagnosis)
                }
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {jendiagnosa.map((p) => (
                  <Option key={p.jenisDiagnosisId}>
                    {p.jenisDiagnosisDeskripsi}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col span={4} xs={24} sm={16} md={14} lg={6} xl={6}>
            Pelaksana :{" "}
            <Form.Item rules={[{ required: true }]}>
              <Select
                dataSource={dokterall}
                showSearch
                style={{ width: "100%" }}
                placeholder="Pilih Pelaksana"
                optionFilterProp="children"
                onChange={(e) => setPemeriksa(e)}
                value={
                  pemeriksa === null
                    ? curpas.ruangKonsul !== null
                      ? null
                      : curpas.dokterId
                    : pemeriksa
                }
                filterOption={(input, option) =>
                  option.props.children
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {dokterall.map((p) => (
                  <Option key={p.dokterId}>
                    {p.dokterId + " - " + p.namaDokter}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
          <Col
            span={24}
            xs={24}
            sm={2}
            md={2}
            lg={2}
            xl={2}
            style={{ display: "flex", alignItems: "end" }}
          >
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loadingDiagnosa}
              >
                Ambil
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Table
        bordered
        pagination={false}
        dataSource={detdiagnosa}
        size="small"
        rowKey="reg"
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              setDiagnosaKode(record.diagnosisId);
              setKasus(record.kasusBl);
              setJenisDiagnosis(record.jenisDiagnosisId);
              setPemeriksa(record.pelaksanaId);
              console.log(record);
            },
          };
        }}
        // scroll={{ y: 390, x: 1000 }}
      >
        <Column
          title="No."
          key="reg"
          className="tabeltabel"
          width="10px"
          render={(text, record, index) => <span>{index + 1}</span>}
        />
        <Column
          title="Kode"
          key="reg"
          className="bgcolortunggu"
          width="40px"
          render={(detdiagnosa) => <span>{detdiagnosa.diagnosisId}</span>}
        />
        <Column
          title="Deskripsi"
          key="reg"
          width="275px"
          className="tabeltabel"
          render={(detdiagnosa) => <span>{detdiagnosa.diagnosisDesk}</span>}
        />
        <Column
          title="Jenis"
          key="reg"
          width="50px"
          className="tabeltabel"
          render={(detdiagnosa) => (
            <span>{detdiagnosa.jenisDiagnosisDesk}</span>
          )}
        />
        <Column
          title="Kasus ICD"
          className="tabeltabel"
          key="nama"
          width="60px"
          render={(detdiagnosa) => (
            <span>{detdiagnosa.kasusBl === "B" ? "Baru" : "Lama"}</span>
          )}
        />
        <Column
          title="Dokter"
          key="reg"
          width="200px"
          className="tabeltabel"
          render={(detdiagnosa) => <span>{detdiagnosa.pelaksana}</span>}
        />
        <Column
          title="Action"
          key="reg"
          width="70px"
          className="tabeltabel"
          render={(detdiagnosa) => (
            <span>
              <Popconfirm
                title="Anda Yakin Dihapus ?"
                onConfirm={(e) =>
                  onDelete(detdiagnosa.registrasiId, detdiagnosa.diagnosisId)
                }
                onCancel={(e) => cancel(e)}
                okText="Ya"
                cancelText="Tidak"
                // disabled={namauser === detdiagnosa.userId ? false : true}
              >
                <Button
                  danger
                  size="small"
                  type="primary"
                  // disabled={namauser === detdiagnosa.userId ? false : true}
                >
                  Hapus
                </Button>
              </Popconfirm>
            </span>
          )}
        />
      </Table>
      <Collapse
        defaultActiveKey={
          ruangasal === "9115" || ruangasal === "9132" ? ["1"] : null
        }
      >
        <Panel header="Riwayat Penyakit Pasien" key="1">
          <Row gutter={[8, 8]}>
            <Col span={12}>
              <Card
                title="Assesment Dokter"
                style={{
                  borderWidth: "2px",
                  borderColor: "darkgray",
                  borderRadius: "4px",
                  marginBottom: 5,
                  // boxShadow: "-2px 2px 6px 2px rgba(100, 100, 100, 0.3)"
                }}
                headStyle={{
                  fontWeight: "bolder",
                  backgroundColor: "lavenderblush",
                }}
              >
                <TextArea rows={4} showCount value={assesment} />
              </Card>
            </Col>
            <Col span={12}>
              <Card
                title="Riwayat Penyakit"
                loading={loadriwayat}
                style={{
                  borderWidth: "2px",
                  borderColor: "darkgray",
                  borderRadius: "4px",
                  marginBottom: 5,
                  // boxShadow: "-2px 2px 6px 2px rgba(100, 100, 100, 0.3)"
                }}
                headStyle={{
                  fontWeight: "bolder",
                  backgroundColor: "lightskyblue",
                }}
              >
                <Table
                  dataSource={riwayatpenyakit}
                  bordered
                  pagination={false}
                  size="small"
                  scroll={{ y: 500 }}
                >
                  <Column
                    title="No."
                    key="reg"
                    className="tabeltabel"
                    width="45px"
                    render={(text, record, index) => <span>{index + 1}</span>}
                  />
                  <Column
                    title="Tanggal"
                    key="reg"
                    className="bgcolortunggu"
                    width="70px"
                    render={(riwayatpenyakit) => (
                      <span>
                        {riwayatpenyakit.TglRegistrasi.substring(0, 10)}
                      </span>
                    )}
                  />
                  <Column
                    title="Kode"
                    key="reg"
                    className="bgcolortunggu"
                    width="40px"
                    render={(riwayatpenyakit) => (
                      <span>{riwayatpenyakit.DiagnosisId}</span>
                    )}
                  />
                  <Column
                    title="Deskripsi"
                    key="reg"
                    width="275px"
                    className="tabeltabel"
                    render={(riwayatpenyakit) => (
                      <span>{riwayatpenyakit.DiagnosaDesk}</span>
                    )}
                  />
                  <Column
                    title="Kasus ICD"
                    className="tabeltabel"
                    key="nama"
                    width="60px"
                    render={(riwayatpenyakit) => (
                      <span>
                        {riwayatpenyakit.KasusBL === "B" ? "Baru" : "Lama"}
                      </span>
                    )}
                  />
                </Table>
              </Card>
            </Col>
          </Row>
        </Panel>
      </Collapse>
    </Fragment>
  );
};

export default FormDiagnosa;
