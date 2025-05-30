import React, { useContext } from "react";
import { Tag, Tooltip, Space, Row, Col, Button, Alert, Modal } from "antd";
import { PageHeader } from "@ant-design/pro-components";
import { PasienRIContext } from "./context/PasienRIContext";
import Detailpasien from "../rawatjalan/komponen/drawerdetailpasien";
import HasilRadiologi from "../rawatjalan/komponen/FormHasilRadiologi";
import ButtonCPPT from "./pemeriksaanharian/ButtonCPPT";
import DropdownCetakanRI from "./pemeriksaanharian/DropdownCetakanRI";
import DropdownLaborat from "../rawatjalan/komponen/DropdownLaborat";
import dayjs from "dayjs";
import { RM14Context } from "./context/RM14Context";
import FormTfpenjamin from "./Transaksi/FormTfpenjamin";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import FormTfruang from "./Transaksi/FormTfruang";
import FormGabungCPPT from "./Transaksi/FormGabungCPPT";
import { EditOutlined } from "@ant-design/icons";
import { TextLoop } from "react-text-loop-next";
// import Marquee from "react-fast-marquee";

const PageheadRI = () => {
  const {
    curpasRI,
    pasienRIPulang,
    setPasienRIPulang,
    swtichPasien,
    setswtichPasien,
    cariPasienRIPulang,
    modalMutasi,
    setmodalMutasi,
    modalTFPenjamin,
    setmodalTFPenjamin,
    modalGabungCPPT,
    setmodalGabungCPPT,
    tfPenjamin,
    getListRuangan,
    listRuang,
    setlistRuang,
    penjamin,
    setPenjamin,
    noSep,
    setnoSep,
    listAlertDx,
  } = useContext(PasienRIContext);
  const { infoKepulangan, setinfoKepulangan } = useContext(RM14Context);
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
        title={<div style={{ marginLeft: 5 }}>{curpasRI.namaPasien}</div>}
        subTitle={
          <div>
            <Row>
              <Col xl={12} lg={12} md={12} sm={10}>
                <Tooltip title="No. RM Pasien">
                  <Tag>{curpasRI.pasienId} </Tag>
                </Tooltip>
                <Tooltip title="Nomor Registrasi">
                  <Tag>{curpasRI.registrasiId} </Tag>
                </Tooltip>
                <Tooltip title="Umur">
                  <Tag>
                    {curpasRI.umur === null || curpasRI.umur === undefined
                      ? null
                      : curpasRI.umur +
                        " Tahun " +
                        curpasRI.umurBulan +
                        " Bulan " +
                        curpasRI.umurHari +
                        " Hari"}
                  </Tag>
                </Tooltip>

                <Tooltip title="Ibu">
                  <Tag>{curpasRI.namaIbu} </Tag>
                </Tooltip>
                <Tooltip title="Alamat">
                  <Tag>{curpasRI.alamat} </Tag>
                </Tooltip>
              </Col>
            </Row>
            <Row>
              <Col>
                <Tooltip title="DPJP">
                  <Tag>{curpasRI.namaDpjp} </Tag>
                </Tooltip>
                {/* <Tooltip title="Pembayaran">
                  <Tag>{curpasRI.namaPembayaran}</Tag>
                </Tooltip> */}
                <Tooltip title="Tanggal Masuk">
                  <Tag>
                    {dayjs(curpasRI.tanggalMasukRi).format("DD-MM-YYYY HH:mm")}
                  </Tag>
                </Tooltip>

                {swtichPasien ? (
                  <>
                    <Tooltip title="Penjamin">
                      <Tag>{curpasRI.namaPembayaran}</Tag>
                    </Tooltip>
                    <Tooltip title="Bangsal">
                      <Tag>{curpasRI.ruangDeskripsi}</Tag>
                    </Tooltip>
                  </>
                ) : (
                  <>
                    <Tooltip title="Transfer Penjamin">
                      <Button
                        icon={<EditOutlined />}
                        type="primary"
                        size="small"
                        shape="round"
                        style={{ backgroundColor: "#d3f261", color: "black" }}
                        onClick={() => {
                          setmodalTFPenjamin(true);

                          // Modal.info({
                          //   title:
                          //     "Dalam Perbaikan, Gunakan KHS Terlebih Dahulu!",
                          // });
                        }}
                      >
                        {curpasRI.namaPembayaran}
                      </Button>
                    </Tooltip>
                    <Tooltip title="Mutasi">
                      <Button
                        icon={<EditOutlined />}
                        type="primary"
                        size="small"
                        shape="round"
                        style={{ backgroundColor: "#69b1ff", color: "black" }}
                        onClick={() => {
                          getListRuangan("1");
                          setmodalMutasi(true);
                        }}
                      >
                        {curpasRI.ruangDeskripsi}
                      </Button>
                    </Tooltip>
                    {/* tombol gabungkan cppt */}
                    {/* <Tooltip title="Gabungkan CPPT">
                      <Button
                        icon={<EditOutlined />}
                        type="primary"
                        size="small"
                        shape="round"
                        style={{ backgroundColor: "#b37feb", color: "black" }}
                        onClick={() => {
                          setmodalGabungCPPT(true);
                        }}
                      >
                        Gabungkan CPPT
                      </Button>
                    </Tooltip> */}
                  </>
                )}
              </Col>
            </Row>
          </div>
        }
        bordered
        extra={[
          <Space>
            {/* <Button onClick={() => {
                            setmodalrad(true)
                        }}>cek</Button> */}
            <ButtonCPPT />
            <DropdownLaborat />
            <HasilRadiologi />
            <DropdownCetakanRI />
            <Detailpasien />
          </Space>,
        ]}
      />
      {listAlertDx.length > 0 ? (
        <Alert
          showIcon
          type="warning"
          message={
            <TextLoop mask noWrap={true}>
              {listAlertDx.map((item, index) => (
                <span key={index}>
                  <b>{item.Peringatan}</b>
                </span>
              ))}
            </TextLoop>
          }
        />
      ) : (
        <></>
      )}

      {swtichPasien ? (
        <Alert
          message={
            "PASIEN SUDAH DIPULANGKAN PADA " +
            dayjs(infoKepulangan.TanggalPulang).format("DD-MM-YYYY") +
            " Jam " +
            infoKepulangan.JamPulang +
            ", PASTIKAN TANGGAL PENGEDITAN SEBELUM TANGGAL DIPULANGKAN!"
          }
          type="error"
          showIcon
        />
      ) : (
        <></>
      )}

      <Modal
        // width="70%"
        footer={null}
        open={modalGabungCPPT}
        onCancel={() => {
          setmodalGabungCPPT(false);
        }}
        style={{ top: 10 }}
        // centered={true}
        closable={true}
      >
        <FormGabungCPPT />
      </Modal>

      <Modal
        width="50%"
        footer={null}
        open={modalTFPenjamin}
        onCancel={() => {
          setmodalTFPenjamin(false);
        }}
        style={{ top: 150 }}
        // centered={true}
        closable={true}
      >
        <FormTfpenjamin />
      </Modal>

      <Modal
        width="50%"
        footer={null}
        open={modalMutasi}
        onCancel={() => {
          setmodalMutasi(false);
        }}
        style={{ top: 150 }}
        // centered={true}
        closable={true}
      >
        <FormTfruang />
      </Modal>
    </div>
  );
};
export default PageheadRI;
