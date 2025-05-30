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
  Collapse,
  Modal,
} from "antd";
import Search from "antd/lib/input/Search";
import Draggable from "react-draggable";
import {
  InfoCircleTwoTone,
  CheckSquareTwoTone,
  PlusOutlined,
} from "@ant-design/icons";
import { ProsedurContext } from "../../rawatjalan/context/ProsedurContext";
import { PelayananContext } from "../../rawatjalan/context/Pelayanancontext";
import { PasienRIContext } from "../context/PasienRIContext";
import { LoginContext } from "../../rawatjalan/context";
import { DiagnosaRIContext } from "../context/DiagnosaRIContext";
import { useState } from "react";
const { Column } = Table;
const { Option } = Select;
const { Panel } = Collapse;

const draggleRef = React.createRef();
const FormSnomedProcedure = () => {
  const {
    diagnosa,
    prosedur,
    jendiagnosa,
    detdiagnosa,
    pilihdiagnosa,
    diag,
    kasus,
    pemeriksa,
    jenisdiagnosis,
    setDiagnosaKode,
    setKasus,
    setPemeriksa,
    setJenisDiagnosis,
    getDiagnosa,
    deleteDiagnosa,
    cariDiagnosa,
    insertDiagnosa,
    detailDiagnosa,
    snomedDXPasien,
    setsnomedDXPasien,
    mstsnomed,
    setmstsnomed,
    snomedProcedurPasien,
    setsnomedProcedurPasien,
    nomorSnomed,
    setnomorSnomed,
    noUrutSnomed,
    setnoUrutSnomed,
    snomedID,
    setsnomedID,
    isDX,
    setisDX,
    loadingSnomed,
    setloadingSnomed,
    getSnomedDxpasien,
    getSnomedProcPasien,
    getSnomedMaster,

    insertSnomedProc,
    deletesnomedProc,

    getSnomedMasterAtribut,
    mstsnomedAtribut,
    setmstsnomedAtribut,
    loadingmstSnomed,
    setloadingmstSnomed,
    loadingAtrSnomed,
    setloadingAtrSnomed,
    warnapilih,
    setwarnapilih,
    modalPop,
    setmodalPop,
  } = useContext(DiagnosaRIContext);
  const { dokter } = useContext(PelayananContext);
  const { curpasRI } = useContext(PasienRIContext);
  const { namauser } = useContext(LoginContext);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const ip = sessionStorage.getItem("IP");
  const host = sessionStorage.getItem("Host");
  const datasnomedDx = [
    {
      registrasiID: curpasRI.registrasiId,
      snomedID: snomedID,
      // noUrut: 1,
      isDX: 0,
      userID: namauser,
      clientHost: host,
      clientIP: ip,
    },
  ];

  const onStart = (event, uiData) => {
    const { clientWidth, clientHeight } = window?.document?.documentElement;
    const targetRect = draggleRef?.current?.getBoundingClientRect();
    setBounds({
      left: -targetRect?.left + uiData?.x,
      right: clientWidth - (targetRect?.right - uiData?.x),
      top: -targetRect?.top + uiData?.y,
      bottom: clientHeight - (targetRect?.bottom - uiData?.y),
    });
  };

  const simpanProsedur = () => {
    // e.preventDefault();
    // insertProsedur(dataprosedur);
    // console.log("prosedur", dataprosedur);
    // onInsert();
    setloadingSnomed(true);
    insertSnomedProc(datasnomedDx, curpasRI.registrasiId);
  };
  const onDelete = (noreg, id, isDx) => {
    deletesnomedProc(noreg, id, 0);
  };
  const cancel = () => {
    message.error("Batal dihapus");
  };
  const [form] = Form.useForm();

  return (
    <Fragment>
      <Card
        title="Snomed Procedure"
        size="small"
        headStyle={{ fontWeight: "bolder", backgroundColor: "lavenderblush" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
        extra={
          <Button
            icon={<PlusOutlined />}
            size="small"
            type="primary"
            onClick={() => {
              getSnomedMaster("%20");
              setloadingmstSnomed(true);
              setmodalPop(true);
            }}
          >
            Tambah Snomed
          </Button>
        }
      >
        <Table
          bordered
          pagination={false}
          dataSource={snomedProcedurPasien}
          size="small"
          rowKey="reg"
          onRow={(record, rowIndex) => {
            return {
              onClick: (event) => {
                // setProsedurKode(record.prosedurId);
                // setPemeriksa(record.pelaksanaId);
                // console.log(record);
              },
            };
          }}
          // scroll={{ y: 390, x: 1000 }}
        >
          <Column
            title="No."
            key="reg"
            className="tabeltabel"
            render={(text, record, index) => <span>{index + 1}</span>}
          />
          <Column
            title="Kode"
            key="reg"
            className="bgcolortunggu"
            render={(snomedProcedurPasien) => (
              <span>{snomedProcedurPasien.SnomedID}</span>
            )}
          />
          <Column
            title="Deskripsi"
            key="reg"
            className="tabeltabel"
            render={(snomedProcedurPasien) => (
              <span>{snomedProcedurPasien.term}</span>
            )}
          />
          <Column
            title="Pelaksana"
            className="tabeltabel"
            key="nama"
            render={(snomedProcedurPasien) => (
              <span>{snomedProcedurPasien.UserID}</span>
            )}
          />
          <Column
            title="Action"
            key="reg"
            render={(snomedProcedurPasien) => (
              <span>
                <Popconfirm
                  title="Anda Yakin Dihapus ?"
                  onConfirm={(e) =>
                    onDelete(
                      snomedProcedurPasien.RegistrasiID,
                      snomedProcedurPasien.SnomedID
                    )
                  }
                  onCancel={(e) => cancel(e)}
                  okText="Ya"
                  cancelText="Tidak"
                  disabled={
                    namauser === snomedProcedurPasien.UserID ? false : true
                  }
                >
                  <Button
                    danger
                    size="small"
                    type="primary"
                    disabled={
                      namauser === snomedProcedurPasien.UserID ? false : true
                    }
                  >
                    Hapus
                  </Button>
                </Popconfirm>
              </span>
            )}
          />
        </Table>
      </Card>
      <Modal
        style={{ marginTop: 10 }}
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            Tambah Snomed Procedure
          </div>
        }
        // title="Tambah Order Penunjang"
        visible={modalPop}
        // onOk={simpan}
        onCancel={() => setmodalPop(false)}
        width="70%"
        footer={[
          <Button
            key="back"
            onClick={() => {
              setmodalPop(false);
            }}
          >
            Kembali
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={simpanProsedur}
            loading={loadingSnomed}
          >
            Simpan
          </Button>,
        ]}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <Row gutter={[8, 2]} align="middle">
          <Col span={24}>
            <Search
              placeholder="Masukan Kata Kunci Pencarian"
              enterButton
              onSearch={(e) => {
                getSnomedMaster(e);
                setloadingmstSnomed(true);
              }}
            />
          </Col>
        </Row>
        <Row gutter={[5, 5]}>
          <Col span={14}>
            <Table
              loading={loadingmstSnomed}
              bordered
              scroll={{ y: 470 }}
              pagination={false}
              dataSource={mstsnomed}
              size="small"
              rowKey="reg"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    // setProsedurKode(record.prosedurId);
                    // setPemeriksa(record.pelaksanaId);
                    // console.log(record);
                    setsnomedID(record.Kode);
                    setloadingAtrSnomed(true);
                    getSnomedMasterAtribut(record.Kode);
                    setwarnapilih(rowIndex);
                  },
                };
              }}
              rowClassName={(record, rowIndex) =>
                rowIndex === warnapilih ? "warnacolompilih" : null
              }
              // scroll={{ y: 390, x: 1000 }}
            >
              <Column
                width="30%"
                title="Kode Snomed"
                key="reg"
                render={(mstsnomed) => <span>{mstsnomed.Kode}</span>}
              />
              <Column
                width="70%"
                title="Deskripsi"
                key="reg"
                render={(mstsnomed) => <span>{mstsnomed.Deskripsi}</span>}
              />
            </Table>
          </Col>
          <Col span={10}>
            <Table
              loading={loadingAtrSnomed}
              bordered
              scroll={{ y: 470 }}
              pagination={false}
              dataSource={mstsnomedAtribut}
              size="small"
              rowKey="reg"
              onRow={(record, rowIndex) => {
                return {
                  onClick: (event) => {
                    // setProsedurKode(record.prosedurId);
                    // setPemeriksa(record.pelaksanaId);
                    // console.log(record);
                  },
                };
              }}
              // scroll={{ y: 390, x: 1000 }}
            >
              <Column
                width="40%"
                title="Tipe"
                key="reg"
                render={(mstsnomedAtribut) => (
                  <span>{mstsnomedAtribut.types}</span>
                )}
              />
              <Column
                width="60%"
                title="Atribut"
                key="reg"
                render={(mstsnomedAtribut) => (
                  <span>{mstsnomedAtribut.destination}</span>
                )}
              />
            </Table>
          </Col>
        </Row>
      </Modal>
    </Fragment>
  );
};

export default FormSnomedProcedure;
