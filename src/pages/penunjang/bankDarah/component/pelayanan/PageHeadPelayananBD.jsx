import { PageHeader } from "@ant-design/pro-components";
import { Col, Row, Space, Spin, Tag, Tooltip } from "antd";
import React, { Fragment, useContext } from "react";
import DetailPasienPelayananBD from "./DetailPasienPelayananBD";
import { BankDarahContext } from "../../context/BankDarahContext";

const PageHeadPelayananBD = () => {
  const {
    dtPasien,
    drOrder,
    // spin
    spDtPasien,
  } = useContext(BankDarahContext);

  return (
    <Fragment>
      <Spin spinning={spDtPasien} tip="Mengambil data...">
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
          title={<div style={{ marginLeft: 5 }}>{dtPasien.Nama}</div>}
          subTitle={
            <div>
              <Row style={{ marginBottom: "2px" }}>
                <Col xl={12} lg={12} md={12} sm={10}>
                  <Tooltip title="No. RM Pasien">
                    <Tag>{dtPasien.PasienId}</Tag>
                  </Tooltip>
                  <Tooltip title="No. Registrasi">
                    <Tag>{dtPasien.RegistrasiId}</Tag>
                  </Tooltip>
                  <Tooltip title="Umur">
                    <Tag>{dtPasien.Umur} Tahun</Tag>
                  </Tooltip>
                  <Tooltip title="Alamat">
                    <Tag>{dtPasien.Alamat}</Tag>
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Tooltip title="Dokter Order">
                    <Tag>{drOrder}</Tag>
                  </Tooltip>
                  <Tooltip title="Pembayaran">
                    <Tag>{dtPasien.Pembayaran}</Tag>
                  </Tooltip>
                </Col>
              </Row>
            </div>
          }
          bordered
          extra={[
            <Space>
              {/* <HasilRadiologi /> */}
              <DetailPasienPelayananBD />
            </Space>,
          ]}
        />
      </Spin>
    </Fragment>
  );
};

export default PageHeadPelayananBD;
