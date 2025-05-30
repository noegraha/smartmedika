import React, { Fragment, useContext, useState } from "react";
import { Tag, Tooltip, Space, Row, Col, message, Modal } from "antd";
import { PasienContext } from "./context/PasienContext";
import Detailpasien from "./komponen/drawerdetailpasien";
import HasilRadiologi from "./komponen/FormHasilRadiologi";
import DropdownCetakan from "./komponen/DropdownCetakan";
import FormRM02View from "./komponen/FormRM02View";
import ButtonWA from "./komponen/ButtonWA";
import DropdownLaborat from "./komponen/DropdownLaborat";
import ButtonICare from "./komponen/ButtonICare";
import { PageHeader } from "@ant-design/pro-components";
import axios from "axios";

const Pagehead = () => {
  const { curpas, ruangasal, detailPasien, statusft } =
    useContext(PasienContext);
  const [modalFast, setModalFast] = useState(false);
  const apiku = sessionStorage.getItem("api");
  const pegawai = sessionStorage.getItem("pegawai");
  const tok = sessionStorage.getItem("userData");
  const options = {
    headers: { Authorization: "Bearer " + tok },
  };
  const updateFasttrack = (id, fastTrack) => {
    axios
      .post(
        `${apiku}/EmrPasienAktif/UpdateFastTrack`,
        {
          registrasiId: id,
          fastTrack: fastTrack ? "1" : "0",
        },
        options
      )
      .then((res) => {
        if (res.data.statusCode === 200) {
          message.success("Data berhasil diupdate");
          detailPasien(id);
          setModalFast(false);
        } else {
          message.warning(res.data.message);
          console.log(res.data);
        }
      })
      .catch((err) => {
        console.log(err);
        message.error("Data gagal diupdate");
      });
  };
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
          // backgroundColor: "white",
        }}
        title={
          <div
            style={{ marginLeft: 5, color: curpas.fastTrack ? "red" : "black" }}
          >
            {curpas.fastTrack ? (
              <Tooltip title="Pasien FastTrack">{curpas.namaPasien}</Tooltip>
            ) : (
              <>{curpas.namaPasien}</>
            )}
          </div>
        }
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
                <Tag
                  color={curpas.fastTrack ? "red" : ""}
                  onClick={() => setModalFast(true)}
                  style={{ cursor: "pointer" }}
                >
                  {curpas.fastTrack ? "FastTrack" : "Non FastTrack"}
                </Tag>
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
          <Space key="space">
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
            <FormRM02View />
            <DropdownCetakan />
            <Detailpasien />
          </Space>,
        ]}
      />
      <Modal
        open={modalFast}
        onOk={() => updateFasttrack(curpas.registrasiId, !statusft)}
        onCancel={() => setModalFast(false)}
      >
        Apakah akan merubah menjadi pasien{" "}
        {statusft ? "Non FastTrack" : "FastTrack"}?
      </Modal>
    </Fragment>
  );
};
export default Pagehead;
