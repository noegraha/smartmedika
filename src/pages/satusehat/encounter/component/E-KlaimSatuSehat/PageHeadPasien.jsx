import { PageHeader } from "@ant-design/pro-components";
import { Col, Row, Space, Spin, Tag, Tooltip } from "antd";
import React, { Fragment, useContext } from "react";
import { SatuSehatEncounterContext } from "../../context/SatuSehatEncounterContext";

const PageHeadPasien = () => {
  const {
    identitasPx,
    ihsPasien,
    paramEncounter,

    spIdentPx,
  } = useContext(SatuSehatEncounterContext);

  return (
    <div>
      <Fragment>
        <Spin spinning={spIdentPx} tip="Mengambil data...">
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
              <div style={{ marginLeft: 5 }}>
                {identitasPx ? identitasPx.Nama : null}
              </div>
            }
            subTitle={
              <div>
                <Row style={{ marginBottom: "2px" }}>
                  <Col xl={12} lg={12} md={12} sm={10}>
                    <Tooltip title="No. RM Pasien">
                      <Tag>{identitasPx ? identitasPx.PasienId : null}</Tag>
                    </Tooltip>
                    <Tooltip title="No. Registrasi">
                      <Tag>{identitasPx ? identitasPx.RegistrasiId : null}</Tag>
                    </Tooltip>
                    <Tooltip title="NIK">
                      <Tag>{identitasPx ? identitasPx.Nik : null}</Tag>
                    </Tooltip>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Tooltip title="DPJP">
                      <Tag>
                        {paramEncounter ? paramEncounter.NamaDPJP : null}
                      </Tag>
                    </Tooltip>
                    <Tooltip title="Alamat">
                      <Tag>{identitasPx ? identitasPx.Alamat : null}</Tag>
                    </Tooltip>
                    <Tooltip title="IHS Pasien">
                      <Tag>{ihsPasien}</Tag>
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
                                <DetailPasienKemo /> */}
              </Space>,
            ]}
          />
        </Spin>
      </Fragment>
    </div>
  );
};

export default PageHeadPasien;
