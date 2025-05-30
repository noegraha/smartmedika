import React, { Fragment } from "react";
import { Row, Col } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import PendHdV2 from "../../component/v2/PendHdV2";
import IdentPasienV2 from "../../component/v2/IdentPasienV2";

const PageheadHD = () => {
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
        <Row>
          <Col span={12}>
            <PendHdV2 />
          </Col>
          <Col span={12}>
            <IdentPasienV2 />
          </Col>
        </Row>
      </PageHeader>
    </Fragment>
  );
};
export default PageheadHD;
