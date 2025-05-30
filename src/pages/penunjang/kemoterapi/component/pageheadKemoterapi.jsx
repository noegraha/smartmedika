import { PageHeader } from "@ant-design/pro-components";
import { Card, Col, Collapse, Row, Space, Spin, Tag, Tooltip } from "antd";
import React, { Fragment, useContext } from "react";
import { KemoterapiContext } from "../context/KemoterapiContext";
import IdentitasPasienKemoterapi from "./IdentitasPasienKemoterapi";
import "../style/style.css";
import HasilRadiologi from "../../../rawatjalan/komponen/FormHasilRadiologi";
import DetailPasienKemo from "./DetailPasienKemo";
import DropdownLaborat from "../../../rawatjalan/komponen/DropdownLaborat";

const { Panel } = Collapse;

const KemoterapiPagehead = () => {
  const {
    unitId,
    jnsRawat,
    noReg,
    setnoReg,
    pasienId,
    umur,
    jenisKelamin,
    penjamin,
    nama,
    namaDokter,
    tglLahir,
    tglMasuk,
    alamat,
    pjpasien,
    listTrxPmr,
    // func
    getListTrxpmr,
    getDataTidakOrder,
    rstIdentPasien,
    // md
    mdListTrxPmr,
    setmdListTrxPmr,
    // spin
    spTrxPmr,
    setspTrxPmr,
    spDataPasien,
  } = useContext(KemoterapiContext);

  return (
    // <Fragment>
    //     <PageHeader
    //         style={{
    //             border: "1px solid rgb(235, 237, 240)",
    //             zIndex: 1,
    //             paddingTop: 6,
    //             paddingBottom: 6,
    //             paddingRight: 6,
    //             paddingLeft: 28,
    //             backgroundColor: "white",
    //         }}
    //         bordered >

    //         <Collapse
    //             defaultActiveKey={'1'}
    //             className='active'
    //         // onChange={onChange}
    //         >

    //             <Panel
    //                 header={
    //                     <b>
    //                         RME Kemoterapi
    //                     </b>
    //                 }
    //                 key="1"
    //                 extra='Identitas Pasien'
    //             >
    //                 <Spin
    //                     spinning={spDataPasien}
    //                     tip="Mohon tunggu...">
    //                     <IdentitasPasienKemoterapi />
    //                 </Spin>
    //             </Panel>
    //         </Collapse>

    //     </PageHeader>
    // </Fragment>

    <Fragment>
      <Spin spinning={spDataPasien} tip="Mengambil data...">
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
                    <Tag>{umur} Tahun</Tag>
                  </Tooltip>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Tooltip title="DPJP">
                    <Tag>{namaDokter}</Tag>
                  </Tooltip>
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
              <DetailPasienKemo />
            </Space>,
          ]}
        />
      </Spin>
    </Fragment>
  );
};

export default KemoterapiPagehead;
