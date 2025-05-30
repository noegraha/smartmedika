import React, { Fragment, useContext } from "react";
import { Tag, Tooltip, Space, Row, Col } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import ButtonICare from "../rawatjalan/komponen/ButtonICare";
import ButtonWA from "../rawatjalan/komponen/ButtonWA";
import DropdownLaborat from "../rawatjalan/komponen/DropdownLaborat";
import HasilRadiologi from "../rawatjalan/komponen/FormHasilRadiologi";
import DropdownCetakan from "../rawatjalan/komponen/DropdownCetakan";
import Detailpasien from "../rawatjalan/komponen/drawerdetailpasien";

const PageheadIGD = () => {
  const { curpas, ruangasal } = useContext(PasienContext);
  const pegawai = sessionStorage.getItem("pegawai");

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
        title={<div style={{ marginLeft: 5 }}>{curpas.namaPasien}</div>}
        subTitle={
          <div>
            <Row>
              <Col xl={12} lg={12} md={12} sm={10}>
                <Tooltip title="No. RM Pasien">
                  <Tag>{curpas.pasienId}</Tag>
                </Tooltip>{" "}
                {curpas.ruangKonsul !== null ? (
                  curpas.ruangKonsul === ruangasal &&
                  curpas.ruangId !== ruangasal ? (
                    <Tooltip title="Konsultasi perlu dijawab">
                      <Tag color="magenta">{curpas.registrasiId}</Tag>
                    </Tooltip>
                  ) : curpas.ruangKonsul === ruangasal &&
                    curpas.ruangId === ruangasal ? (
                    <Tooltip title="Konsultasi sudah dijawab">
                      <Tag color="green">{curpas.registrasiId}</Tag>
                    </Tooltip>
                  ) : curpas.ruangKonsul !== ruangasal &&
                    curpas.ruangId === ruangasal ? (
                    <Tooltip title="Konsultasi belum dijawab">
                      <Tag color="orange">{curpas.registrasiId}</Tag>
                    </Tooltip>
                  ) : (
                    <Tag>{curpas.registrasiId}</Tag>
                  )
                ) : (
                  <Tooltip title="No. Registrasi">
                    <Tag>{curpas.registrasiId}</Tag>
                  </Tooltip>
                )}{" "}
                <Tooltip title="Umur">
                  <Tag>
                    {curpas.umur === null || curpas.umur === undefined
                      ? null
                      : curpas.umur +
                        " Tahun " +
                        curpas.umurBulan +
                        " Bulan " +
                        curpas.umurHari +
                        " Hari"}
                  </Tag>
                </Tooltip>
              </Col>
            </Row>
            <Row>
              <Col>
                <Tooltip title="DPJP">
                  <Tag>{curpas.namaDpjp}</Tag>{" "}
                </Tooltip>
                <Tooltip title="Pembayaran">
                  <Tag>{curpas.namaPembayaran}</Tag>{" "}
                </Tooltip>
                <Tooltip title="Waktu Pendaftaran">
                  <Tag>{curpas.jamMasuk}</Tag>
                </Tooltip>
              </Col>
            </Row>
          </div>
        }
        bordered
        extra={[
          <Space>
            {curpas.dokterId === pegawai ? (
              curpas.pembayaranId === "0050" ||
              curpas.pembayaranId === "0051" ? (
                <ButtonICare />
              ) : (
                <></>
              )
            ) : (
              <></>
            )}
            {curpas.telemedicine ? <ButtonWA /> : <></>}
            <DropdownLaborat />
            <HasilRadiologi />
            {/* <FormRM02View /> */}
            <DropdownCetakan />
            <Detailpasien />
          </Space>,
        ]}
      />
    </Fragment>
  );
};
export default PageheadIGD;
