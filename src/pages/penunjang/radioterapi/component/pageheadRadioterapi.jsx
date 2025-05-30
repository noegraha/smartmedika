import React, { Fragment, useContext } from "react";
import { Card, Col, Row, Space, Spin, Tag, Tooltip } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import IdentitasPasienRadioterapi from "../component/IdentitasPasienRadioterapi";
import { RadioterapiContext } from "../context/RadioterapiContext";
import DetailPasienRad from "./DetailPasienRad";
import HasilRadiologi from "../../../rawatjalan/komponen/FormHasilRadiologi";
import DropdownLaborat from "../../../rawatjalan/komponen/DropdownLaborat";

const PageheadRadoterapi = () => {
  const {
    unitId,
    noReg,
    setnoReg,
    pasienId,
    umur,
    jenisKelamin,
    penjamin,
    nama,
    tglLahir,
    tglMasuk,
    alamat,
    listTrxPmr,
    // func
    getListTrxpmr,
    getDataTidakOrder,
    // md
    mdListTrxPmr,
    setmdListTrxPmr,
    // spin
    spTrxPmr,
    //spin
    spDataPasien,
    spHeaderPasien,
  } = useContext(RadioterapiContext);

  return (
    // <Fragment>
    //   <PageHeader
    //     style={{
    //       border: "1px solid rgb(235, 237, 240)",
    //       zIndex: 1,
    //       paddingTop: 6,
    //       paddingBottom: 6,
    //       paddingRight: 6,
    //       paddingLeft: 28,
    //       backgroundColor: "white",
    //     }}
    //     bordered
    //   >
    //     <Card
    //       title="RME Radioterapi"
    //       loading={spDataPasien}
    //       extra="Identitas Pasien"
    //       size="small"
    //       headStyle={{ backgroundColor: "#FFADAD" }}
    //     >
    //       <IdentitasPasienRadioterapi />
    //     </Card>
    //   </PageHeader>
    // </Fragment>

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
          title={<div style={{ marginLeft: 5 }}>{nama}</div>}
          subTitle={
            <div>
              <Row style={{ marginBottom: "2px" }}>
                <Col xl={12} lg={12} md={12} sm={10}>
                  <Tooltip title="No. RM Pasien">
                    <Tag>{pasienId}</Tag>
                  </Tooltip>
                  <Tooltip title="No. Registrasi">
                    <Tag>{noReg}</Tag>
                  </Tooltip>
                  <Tooltip title="Umur">
                    <Tag>{umur}</Tag>
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Tooltip title="Alamat">
                    <Tag>{alamat}</Tag>
                  </Tooltip>
                  <Tooltip title="Pembayaran">
                    <Tag>{penjamin}</Tag>
                  </Tooltip>
                </Col>
              </Row>
            </div>
          }
          bordered
          extra={[
            <Space>
              <DropdownLaborat />
              <HasilRadiologi />
              <DetailPasienRad />
            </Space>,
          ]}
        />
      </Spin>
    </Fragment>
  );
};
export default PageheadRadoterapi;
