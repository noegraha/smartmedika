import React, { useContext } from "react";
import { Descriptions } from "antd";
import { IBSContext } from "./context/IBSContext";

const KondisiTerakhir = () => {
  const { detailAjuan } = useContext(IBSContext);

  return (
    <div>
      <Descriptions title="Kondisi Terakhir" size="small" bordered>
        <Descriptions.Item label="GCS">{detailAjuan.gcs}</Descriptions.Item>
        <Descriptions.Item label="Tekanan Darah">
          <b>
            {detailAjuan.sistole} / {detailAjuan.diastole}
          </b>
        </Descriptions.Item>
        <Descriptions.Item label="Tinggi Badan">
          <b>{detailAjuan.tb}</b>
        </Descriptions.Item>
        <Descriptions.Item label="Nadi">{detailAjuan.nadi}</Descriptions.Item>
        <Descriptions.Item label="Berat Badan">
          {detailAjuan.bb}
        </Descriptions.Item>
        <Descriptions.Item label="Respirasi">
          {detailAjuan.respirasi}
        </Descriptions.Item>
        <Descriptions.Item label="Isi/ Tekanan">
          {detailAjuan.isiTekanan}
        </Descriptions.Item>
        <Descriptions.Item label="Sifat">{detailAjuan.sifat}</Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default KondisiTerakhir;
