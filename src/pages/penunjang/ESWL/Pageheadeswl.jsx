import React, { useContext } from "react";
import { Tag, Tooltip, Space, Row, Col, Button, Alert } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import dayjs from "dayjs";

const Pageheadeswl = () => {
  //   const {
  //     curpasRI,
  //     pasienRIPulang,
  //     setPasienRIPulang,
  //     swtichPasien,
  //     setswtichPasien,
  //     cariPasienRIPulang,
  //   } = useContext(PasienRIContext);
  //   const { infoKepulangan, setinfoKepulangan } = useContext(RM14Context);
  return (
    <div>
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
        title={<div style={{ marginLeft: 5 }}>{"curpasRI.namaPasien"}</div>}
        subTitle={
          <div>
            <Row>
              <Col xl={12} lg={12} md={12} sm={10}>
                <Tooltip title="No. RM Pasien">
                  {/* <Tag>{curpasRI.pasienId}</Tag> */}
                </Tooltip>
                <Tooltip title="Nomor Registrasi">
                  {/* <Tag>{curpasRI.registrasiId}</Tag> */}
                </Tooltip>
                <Tooltip title="Umur">
                  <Tag>
                    {/* {curpasRI.umur === null || curpasRI.umur === undefined
                      ? null
                      : curpasRI.umur +
                        " Tahun " +
                        curpasRI.umurBulan +
                        " Bulan " +
                        curpasRI.umurHari +
                        " Hari"} */}
                  </Tag>
                </Tooltip>

                <Tooltip title="Ibu">
                  {/* <Tag>{curpasRI.namaIbu}</Tag> */}
                </Tooltip>
              </Col>
            </Row>
            <Row>
              <Col>
                <Tooltip title="DPJP">
                  {/* <Tag>{curpasRI.namaDpjp}</Tag> */}
                </Tooltip>
                <Tooltip title="Pembayaran">
                  {/* <Tag>{curpasRI.namaPembayaran}</Tag> */}
                </Tooltip>
                <Tooltip title="Tanggal Masuk">
                  <Tag>
                    {/* {dayjs(curpasRI.tanggalMasukRi).format("DD-MM-YYYY HH:mm")} */}
                  </Tag>
                </Tooltip>
                <Tooltip title="Alamat">
                  {/* <Tag>{curpasRI.alamat}</Tag> */}
                </Tooltip>
              </Col>
            </Row>
          </div>
        }
        bordered
        extra={[
          <Space>
            {/* <DropdownLaborat /> */}
            {/* <HasilRadiologi /> */}
            {/* <Detailpasien /> */}
          </Space>,
        ]}
      />
    </div>
  );
};
export default Pageheadeswl;
