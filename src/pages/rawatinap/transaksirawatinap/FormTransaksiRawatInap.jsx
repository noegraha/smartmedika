import React from "react";
import { Tabs } from "antd";
import FormPemeriksaanRI from "./FormPemeriksaanRI";
import FormBHPRI from "./FormBHPRI";
// import FormKamarRI from './FormKamarRI';
import FormResepDokterRI from "./FormResepDokterRI";
import FormKamarRI from "./FormKamarRI";
import FormOrderPenunjangRI from "./FormOrderPenunjangRI";

const { TabPane } = Tabs;
const FormTransaksiRawatInap = () => {
  const callback = (key) => {
    console.log("ini key", key);
  };

  return (
    <div>
      <Tabs type="card" defaultActiveKey="1" onChange={callback}>
        <TabPane tab="Pemeriksaan" key="1">
          <FormPemeriksaanRI />
        </TabPane>
        <TabPane tab="Bahan Habis Pakai" key="2">
          <FormBHPRI />
        </TabPane>
        {/* <TabPane tab="Fasilitas Lain" key="3">
                </TabPane> */}
        <TabPane tab="Kamar" key="4">
          <FormKamarRI />
        </TabPane>
        <TabPane tab="Order Makan" key="5"></TabPane>
        <TabPane tab="Order Penunjang" key="7">
          <FormOrderPenunjangRI />
        </TabPane>
        <TabPane tab="Resep Dokter" key="6">
          <FormResepDokterRI />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default FormTransaksiRawatInap;
