import { PageHeader } from "@ant-design/pro-components";
import { Col, Row, Space, Spin, Tag, Tooltip } from "antd";
import React, { Fragment, useContext } from "react";
import { PenunjangLabPaContext } from "../context/PenunjangLabPa";
import DetailPasienLabPa from "./DetailPasienLabPa";

const PageHeadLabPa = () => {
  const {
    headerPasien,
    // sp
    spHeaderPasien,
  } = useContext(PenunjangLabPaContext);
  return (
    <div>
      <Fragment>
        <Spin spinning={spHeaderPasien} tip="Mengambil data...">
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
            title={
              <div style={{ marginLeft: 5 }}>{headerPasien.namaPasien}</div>
            }
            subTitle={
              <div>
                <Row style={{ marginBottom: "2px" }}>
                  <Col xl={12} lg={12} md={12} sm={10}>
                    <Tooltip title="No. RM Pasien">
                      <Tag>{headerPasien.noPasien}</Tag>
                    </Tooltip>
                    <Tooltip title="No. Registrasi">
                      <Tag>{headerPasien.registrasiId}</Tag>
                    </Tooltip>
                    <Tooltip title="Umur">
                      <Tag>{headerPasien.umur}</Tag>
                    </Tooltip>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Tooltip title="Alamat">
                      <Tag>{headerPasien.alamat}</Tag>
                    </Tooltip>
                    <Tooltip title="Pembayaran">
                      <Tag>{headerPasien.asuransi}</Tag>
                    </Tooltip>
                  </Col>
                </Row>
              </div>
            }
            bordered
            extra={[
              <Space>
                {/* {curpas.telemedicine ? <ButtonWA /> : <></>} */}
                {/* <ButtonWA /> */}
                {/* <DropdownLaborat /> */}
                {/* <HasilLab /> */}
                {/* <HasilRadiologi /> */}
                {/* <FormRM02View /> */}
                {/* <DropdownCetakan /> */}
                <DetailPasienLabPa />
              </Space>,
            ]}
          />
        </Spin>
      </Fragment>
    </div>
  );
};

export default PageHeadLabPa;
