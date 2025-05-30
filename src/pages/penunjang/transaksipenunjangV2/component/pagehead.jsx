import React, { Fragment } from "react";
import { Card } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import IdentitasTransaksi from "./IdentitasTransaksi";

const PageheadTransaksiPenunjang = () => {
  return (
    <Fragment>
      <PageHeader
        style={{
          border: "1px solid rgb(235, 237, 240)",
          zIndex: 1,
          paddingTop: 6,
          paddingBottom: 6,
          paddingRight: 6,
          paddingLeft: 28,
          backgroundColor: "white",
        }}
        bordered
      >
        <Card
          title="Transaksi Penunjang Medis"
          headStyle={{ backgroundColor: "#FFADAD" }}
        >
          <IdentitasTransaksi />
        </Card>
      </PageHeader>
    </Fragment>
  );
};
export default PageheadTransaksiPenunjang;
