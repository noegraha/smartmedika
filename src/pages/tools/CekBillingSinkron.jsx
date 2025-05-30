import {
  Alert,
  Button,
  Card,
  DatePicker,
  Divider,
  Modal,
  Space,
  Table,
} from "antd";
import React, { useContext, useState } from "react";
import { BillingContext } from "../rawatjalan/context/BillingContext";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
const { Column } = Table;
const { confirm } = Modal;

const CekBillingSinkron = () => {
  const {
    billingsinkron,
    loadingBilling,
    syncBilling,
    syncBillingById,
    cekBillingByTgl,
  } = useContext(BillingContext);
  const [tanggal, setTanggal] = useState(null);
  function showConfirm(e, f) {
    confirm({
      title: (
        <Alert
          message="Apakah Anda yakin akan Sinkron Billing No. Registrasi ini ?"
          type="warning"
        />
      ),
      icon: <ExclamationCircleOutlined />,
      content: "Data sinkron akan masuk ke DBRS.",
      onOk() {
        syncBilling(e, f);
      },
      onCancel() {
        console.log(e, f);
      },
    });
  }
  function showConfirm2(e, d, f, g) {
    confirm({
      title: (
        <Alert
          message="Apakah Anda yakin akan Sinkron Billing No. Registrasi ini ?"
          type="warning"
        />
      ),
      icon: <ExclamationCircleOutlined />,
      content: "Data sinkron akan masuk ke DBRS.",
      onOk() {
        syncBillingById(e, d, f, g);
        console.log(e, d, f, g);
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
        title="Cek Billing Sinkron"
        headStyle={{ fontWeight: "bolder", backgroundColor: "aliceblue" }}
        style={{
          borderWidth: "2px",
          borderColor: "darkgray",
          borderRadius: "4px",
        }}
      >
        <Button
          onClick={() => {
            cekBillingByTgl(dayjs().format("YYYY-MM-DD"));
            setTanggal(dayjs().format("YYYY-MM-DD"));
          }}
          loading={loadingBilling}
        >
          Today
        </Button>
        <Divider type="vertical" />
        <DatePicker
          placeholder="Pilih Tanggal"
          onChange={(date, dateString) => {
            cekBillingByTgl(dateString);
            setTanggal(dateString);
            console.log(dateString);
          }}
          disabled={loadingBilling}
        />
        <Button
          type="primary"
          onClick={() => cekBillingByTgl(tanggal)}
          disabled={tanggal === null}
          loading={loadingBilling}
        >
          Refresh
        </Button>
        <Table
          showSorterTooltip={false}
          loading={loadingBilling}
          bordered
          pagination={false}
          dataSource={billingsinkron}
          size="small"
          rowKey="reg"
          scroll={{ x: 700 }}
        >
          <Column
            title="No. Registrasi"
            key="reg"
            className="bgcolortunggu, tabeltabel2"
            width={55}
            sorter={(a, b) => a.RegistrasiId.localeCompare(b.RegistrasiId)}
            render={(billingsinkron) => (
              <span>{billingsinkron.RegistrasiId}</span>
            )}
          />
          <Column
            title="Nama"
            key="reg"
            className="tabeltabel"
            width={100}
            sorter={(a, b) => a.Nama.localeCompare(b.Nama)}
            render={(billingsinkron) => <span>{billingsinkron.Nama}</span>}
          />
          <Column
            title="Pelayanan Id"
            width={45}
            key="reg"
            className="tabeltabel"
            render={(billingsinkron) => (
              <span>{billingsinkron.PelayananId}</span>
            )}
          />
          <Column
            title="Standar Biaya"
            width={45}
            key="reg"
            className="tabeltabel"
            render={(billingsinkron) => (
              <span>{billingsinkron.StandarBiaya}</span>
            )}
          />
          <Column
            title="RuangId"
            width={30}
            key="reg"
            className="tabeltabel"
            render={(billingsinkron) => <span>{billingsinkron.RuangId}</span>}
          />
          <Column
            title="Ruang"
            width={120}
            key="reg"
            className="tabeltabel"
            render={(billingsinkron) => <span>{billingsinkron.Deskripsi}</span>}
          />
          <Column
            title="Action"
            key="reg"
            fixed="right"
            className="tabeltabel"
            width={140}
            render={(billingsinkron) => (
              <Space>
                <Button
                  type="primary"
                  style={{ backgroundColor: "#389e0d", borderColor: "#389e0d" }}
                  size="small"
                  onClick={() =>
                    showConfirm(billingsinkron.RegistrasiId, tanggal)
                  }
                >
                  Sinkron Per Noreg
                </Button>
                <Button
                  type="primary"
                  size="small"
                  onClick={() =>
                    showConfirm2(
                      billingsinkron.RegistrasiId,
                      billingsinkron.PelayananId,
                      billingsinkron.RuangId,
                      tanggal
                    )
                  }
                >
                  Sinkron Per Pelayanan
                </Button>
              </Space>
            )}
          />
        </Table>
      </Card>
    </div>
  );
};

export default CekBillingSinkron;
