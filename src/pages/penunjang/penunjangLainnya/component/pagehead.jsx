import React, { Fragment } from "react";
import { PageHeader } from "@ant-design/pro-components";
import DataPasien from "./DataPasien";

const Pagehead = () => {
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
        <DataPasien />
      </PageHeader>
    </Fragment>
  );
};
export default Pagehead;
