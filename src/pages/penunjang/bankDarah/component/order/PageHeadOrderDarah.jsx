import { PageHeader } from "@ant-design/pro-components";
import { Col, Row, Space, Spin, Tag, Tooltip } from "antd";
import React, { Fragment, useContext } from "react";
import DetailPasienOrderDarah from "./DetailPasienOrderDarah";
import DropdownLaborat from "../../../../rawatjalan/komponen/DropdownLaborat";
import { BankDarahContext } from "../../context/BankDarahContext";
import dayjs from "dayjs";

const PageHeadOrderDarah = () => {
  const {
    dtPasien,
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
                </Col>
              </Row>
              <Row>
                <Col>
                  <Tooltip title="Alamat">
                    <Tag>{dtPasien.Alamat}</Tag>
                  </Tooltip>
                  <Tooltip title="Pembayaran">
                    <Tag>{dtPasien.Pembayaran}</Tag>
                  </Tooltip>
                  <Tooltip title="Tgl. Masuk">
                    <Tag>
                      {dayjs(dtPasien.JamRegistrasi).format("DD-MM-YYYY HH:mm")}
                    </Tag>
                  </Tooltip>
                </Col>
              </Row>
            </div>
          }
          bordered
          extra={[
            <Space>
              {/* <DropdownLaborat />
                            <HasilRadiologi />
                            <DetailPasienKemo /> 
                            <DropdownLaborat /> */}
              <DetailPasienOrderDarah />
            </Space>,
          ]}
        />
      </Spin>
    </Fragment>
  );
};

export default PageHeadOrderDarah;
