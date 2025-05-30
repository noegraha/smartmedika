import {
  Button,
  Card,
  Col,
  Modal,
  Row,
  Form,
  List,
  Table,
  Empty,
  ConfigProvider,
} from "antd";
import React, { useContext, useState } from "react";
import { CetakanContext } from "../context/CetakanContext";
import { PasienContext } from "../context/PasienContext";
import dayjs from "dayjs";
import { SmileOutlined } from "@ant-design/icons";
import { AlergiContext } from "../context/AlergiContext";
// const { Option } = Select;
const { Column } = Table;
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const ButtonPRMRJ = () => {
  const {
    listprosedur,
    getListProsedur,
    insertPRMRJ,
    getPRMRJ,
    prmrjkunjungan,
    setPRMRJKunjungan,
    prmrjprosedure,
    setPRMRJProsedur,
  } = useContext(CetakanContext);
  const { riwayatpasien } = useContext(PasienContext);
  const { allergy } = useContext(AlergiContext);

  const [modalvisible, setModalVisible] = useState(false);
  const [modalkunjungan, setModalKunjungan] = useState(false);
  const [modalprosedur, setModalProsedur] = useState(false);
  const norm = sessionStorage.getItem("norm");
  const namauser = sessionStorage.getItem("userId");

  const onOpen = () => {
    setModalVisible(true);
    getListProsedur(norm);
    getPRMRJ(norm);
  };
  const prosedurbaru = [];
  for (var i = 0; i < listprosedur.length; i++) {
    prosedurbaru.push({
      key: (i + 1).toString(),
      ...listprosedur[i],
    });
  }
  let fLenz = listprosedur.length;

  for (let i = 1; i < fLenz; i++) {
    listprosedur.map((v) => ({ ...v, key: i }));
  }

  const onAmbilProsedur = (a, b, c) => {
    if (b === true) {
      setPRMRJProsedur([
        ...prmrjprosedure,
        {
          prosedurPasienId: a.prosedurPasienId,
          prosedurDesk: a.prosedurDesk,
        },
      ]);
    } else {
      setPRMRJProsedur(
        prmrjprosedure.filter((item) => item.registrasiId !== a.RegistrasiId)
      );
    }
  };

  const riwayatbaru = [];
  for (var n = 0; n < riwayatpasien.length; n++) {
    riwayatbaru.push({
      key: (n + 1).toString(),
      ...riwayatpasien[n],
    });
  }
  let fLen = riwayatpasien.length;

  for (let i = 1; i < fLen; i++) {
    riwayatpasien.map((v) => ({ ...v, key: i }));
  }
  const onAmbilRiwayatKunjungan = (a, b, c) => {
    if (b === true) {
      setPRMRJKunjungan([
        ...prmrjkunjungan,
        {
          registrasiId: a.RegistrasiId,
        },
      ]);
    } else {
      setPRMRJKunjungan(
        prmrjkunjungan.filter((item) => item.registrasiId !== a.RegistrasiId)
      );
    }
  };
  const dataPRMRJ = {
    pasienId: norm,
    tanggal: dayjs().format("YYYY-MM-DD"),
    userId: namauser,
    lProsedur: prmrjprosedure,
    lKunjungan: prmrjprosedure,
  };
  const onSimpan = () => {
    insertPRMRJ(dataPRMRJ);
    console.log(dataPRMRJ);
  };
  const kosongan = () => (
    <div style={{ textAlign: "center", padding: 0, margin: 0, marginTop: 2 }}>
      <p>
        <SmileOutlined style={{ fontSize: 20 }} />
        &nbsp; Tidak Memiliki Alergi
      </p>
    </div>
  );
  return (
    <div>
      <Button size="small" onClick={() => onOpen()}>
        PRMRJ
      </Button>
      <Modal
        visible={modalvisible}
        title="PRMRJ"
        onCancel={() => setModalVisible(false)}
        onOk={() => setModalVisible(false)}
        width="1000px"
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <Card
              size="small"
              title="Alergi"
              headStyle={{ backgroundColor: "#ff7875" }}
              style={{
                width: "100%",
                marginBottom: "8px",
                backgroundColor: "#fff1f0",
              }}
            >
              <Form.Item style={{ marginBottom: 0 }}>
                <ConfigProvider renderEmpty={kosongan}>
                  <List
                    bordered
                    size="small"
                    dataSource={allergy}
                    renderItem={(item) => (
                      <List.Item>{item.alerginya}</List.Item>
                    )}
                  />
                </ConfigProvider>
              </Form.Item>
            </Card>
          </Col>
          <Col span={12}>
            <Card
              size="small"
              title="Tindakan"
              headStyle={{ backgroundColor: "#69c0ff" }}
              style={{
                width: "100%",
                marginBottom: "8px",
                backgroundColor: "#e6f7ff",
              }}
            >
              <Form {...formItemLayout}>
                <Form.Item label="List Prosedur" labelAlign="left">
                  <Button onClick={() => setModalProsedur(true)}>...</Button>
                  {/* <Select
                    mode="multiple"
                    dataSource={listprosedur}
                    showSearch
                    style={{ width: "100%" }}
                    placeholder="Pilih prosedur..."
                    optionFilterProp="children"
                    onChange={(e) => setprosedurePilih(e)}
                    filterOption={(input, option) =>
                      option.props.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {listprosedur.map((d) => (
                      <Option value={d.prosedurPasienId + "-" + d.prosedurDesk}>
                        {d.prosedurId} - {d.prosedurDesk}
                      </Option>
                    ))}
                  </Select> */}
                </Form.Item>
              </Form>
              <Table
                size="small"
                dataSource={prmrjprosedure}
                pagination={false}
              >
                <Column title="Prosedur" dataIndex="prosedurDesk" />
              </Table>
              {/* <Row>
                <Col style={{ textAlign: "right" }} span={24}>
                  <Button
                    type="primary"
                    onClick={() => {
                      const dataProsedure = [];
                      for (var i = 0; i < prosedurePilih.length; i++) {
                        dataProsedure.push({
                          prosedurPasienId: prosedurePilih[i]
                            .split("-")
                            .shift(),
                          prosedurDesk: prosedurePilih[i].split("-").pop(),
                        });
                      }
                      setdataProsedure(dataProsedure);
                    }}
                  >
                    Ambil
                  </Button>
                </Col>
              </Row> */}
            </Card>
          </Col>
        </Row>
        <Row gutter={[8, 8]}>
          <Col span={24}>
            <Card
              size="small"
              title="Kunjungan"
              headStyle={{ backgroundColor: "#95de64" }}
              style={{
                width: "100%",
                marginBottom: "8px",
                backgroundColor: "#f6ffed",
              }}
            >
              <Form.Item label="List Kunjungan" labelAlign="left">
                <Button onClick={() => setModalKunjungan(true)}>...</Button>
              </Form.Item>
              <Table
                dataSource={prmrjkunjungan}
                size="small"
                pagination={false}
              >
                <Column
                  title="No. Registrasi"
                  key="reg"
                  dataIndex="registrasiId"
                />
              </Table>
            </Card>
          </Col>
        </Row>
        <Button onClick={() => onSimpan()}>Simpan</Button>
      </Modal>
      <Modal
        width="700px"
        title="List Prosedure"
        visible={modalprosedur}
        onCancel={() => setModalProsedur(false)}
        onOk={() => setModalProsedur(false)}
      >
        <Table
          dataSource={prosedurbaru}
          size="small"
          bordered
          scroll={{ y: 500 }}
          pagination={false}
          rowSelection={{
            // selectedRowKeys=["1"],
            type: "checkbox",
            columnWidth: "60px",
            fixed: "right",
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            onSelect: (record, selected, selectedRows) =>
              onAmbilProsedur(record, selected, selectedRows),
            onSelectAll: (selected, selectedRows, changeRows) =>
              onAmbilProsedur(selected, selectedRows, changeRows),
          }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"Silahkan Pilih Kunjungan Terlebih Dahulu"}
              />
            ),
          }}
        >
          <Column
            title="Prosedure Pasien ID"
            key="id"
            dataIndex="prosedurPasienId"
            className="bgcolor fontkecil"
          />
          <Column
            title="Prosedure"
            key="desk"
            dataIndex="prosedurDesk"
            className="fontkecil"
          />
        </Table>
      </Modal>
      <Modal
        width="700px"
        title="List Kunjungan"
        visible={modalkunjungan}
        onCancel={() => setModalKunjungan(false)}
        onOk={() => setModalKunjungan(false)}
      >
        <Table
          dataSource={riwayatbaru}
          size="small"
          bordered
          scroll={{ y: 500 }}
          pagination={false}
          rowSelection={{
            type: "checkbox",
            columnWidth: "60px",
            fixed: "right",
            selections: [Table.SELECTION_ALL, Table.SELECTION_INVERT],
            onSelect: (record, selected, selectedRows) =>
              onAmbilRiwayatKunjungan(record, selected, selectedRows),
            onSelectAll: (selected, selectedRows, changeRows) =>
              onAmbilRiwayatKunjungan(selected, selectedRows, changeRows),
          }}
          locale={{
            emptyText: (
              <Empty
                image={Empty.PRESENTED_IMAGE_SIMPLE}
                description={"Silahkan Pilih Kunjungan Terlebih Dahulu"}
              />
            ),
          }}
        >
          <Column
            title="Reg"
            key="reg"
            dataIndex="RegistrasiId"
            width="90px"
            className="bgcolor fontkecil"
          />
          <Column
            title="Tanggal"
            dataIndex="TanggalMasuk"
            width="80px"
            key="pasienId"
            className="fontkecil"
          />
          <Column
            title="Ruang"
            dataIndex="RuangDeskripsi"
            width="80px"
            key="pasienId"
            className="fontkecil"
          />
          <Column
            title="Kode ICD"
            dataIndex="DiagnosisId"
            width="80px"
            key="pasienId"
            className="fontkecil"
          />
          <Column
            title="Penyakit"
            dataIndex="Deskripsi"
            width="200px"
            key="pasienId"
            className="fontkecil"
          />
        </Table>
      </Modal>
    </div>
  );
};

export default ButtonPRMRJ;
