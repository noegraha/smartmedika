import { Alert, Button, Card, Modal, Table } from "antd";
import React, { useContext } from "react";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { CatatanmedisContext } from "../rawatjalan/context/CatatanmedisContext";
const { Column } = Table;
const { confirm } = Modal;
const CatatanMedisDouble = () => {
  const {
    cekCatatanMedis,
    catatanmedisdouble,
    deleteCatatanMedisbyId,
    getCatatanMedis,
    listcatatanmedis,
    modal,
    setModal,
  } = useContext(CatatanmedisContext);

  const showModalCatatan = (e) => {
    setModal(true);
    getCatatanMedis(e);
  };

  function showConfirm(e, f) {
    confirm({
      title: (
        <Alert
          message="Apakah Anda yakin akan nonaktifkan catatan medis ini ?"
          type="warning"
        />
      ),
      icon: <ExclamationCircleOutlined />,
      content: "Data catatan medis yang dinonaktif akan tidak dimunculkan.",
      onOk() {
        deleteCatatanMedisbyId(e, f);
      },
      onCancel() {
        console.log(e);
      },
    });
  }
  return (
    <div>
      <Card
        size="small"
        title="Catatan Medis Double"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Button
          block
          //   style={{ width: "10%" }}
          type="primary"
          onClick={() => cekCatatanMedis()}
        >
          Cek Catatan Medis Double Hari Ini
        </Button>
        <Table
          bordered
          pagination={false}
          dataSource={catatanmedisdouble}
          size="small"
          rowKey="reg"
          scroll={{ x: 700 }}
        >
          <Column
            title="No. Registrasi"
            key="reg"
            className="bgcolortunggu, tabeltabel2"
            width={100}
            render={(catatanmedisdouble) => (
              <span>{catatanmedisdouble.RegistrasiId}</span>
            )}
          />
          <Column
            title="Jumlah Data Muncul"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(catatanmedisdouble) => (
              <span>{catatanmedisdouble.Jumlah}</span>
            )}
          />
          <Column
            title="Hapus"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(catatanmedisdouble) => (
              <span>{catatanmedisdouble.Hapus ? "True" : "False"}</span>
            )}
          />
          <Column
            title="Action"
            key="reg"
            className="tabeltabel"
            width={140}
            render={(catatanmedisdouble) => (
              <span>
                <Button
                  type="primary"
                  style={{
                    backgroundColor: "#389e0d",
                    borderColor: "#389e0d",
                  }}
                  size="small"
                  onClick={() =>
                    showModalCatatan(catatanmedisdouble.RegistrasiId)
                  }
                >
                  Cek Data
                </Button>
              </span>
            )}
          />
        </Table>
      </Card>
      <Modal
        title="Catatan Medis Double"
        visible={modal}
        onOk={() => setModal(false)}
        onCancel={() => setModal(false)}
      >
        <Table
          bordered
          pagination={false}
          dataSource={listcatatanmedis}
          size="small"
          rowKey="reg"
        >
          <Column
            title="Registrasi ID"
            width={100}
            key="reg"
            className="tabeltabel"
            render={(listcatatanmedis) => (
              <span>{listcatatanmedis.registrasiId}</span>
            )}
          />
          <Column
            title="Action"
            key="reg"
            className="tabeltabel"
            width={140}
            render={(listcatatanmedis) => (
              <span>
                <Button
                  type="primary"
                  danger
                  size="small"
                  onClick={() =>
                    showConfirm(
                      listcatatanmedis.registrasiId,
                      listcatatanmedis.catatanMedisId
                    )
                  }
                >
                  Non Aktif
                </Button>
              </span>
            )}
          />
        </Table>
      </Modal>
    </div>
  );
};

export default CatatanMedisDouble;
