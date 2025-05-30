import React, { useContext, useState } from "react";
import { Row, Col, Card, Space, Button, Modal, Tooltip } from "antd";
import dayjs from "dayjs";
import HdContext from "../../HdContext";
import ButtomReport from "../Hemodialisa/ReportHd/ButtomReport";
import { AssesmentRIContext } from "../../../../rawatinap/context/AssesmentRIContext";

const { PasiensContext } = HdContext;

function IdentPasienV2() {
  const props = useContext(PasiensContext);
  const { getCetakAssesmentHD, spin } = useContext(AssesmentRIContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const alertKet = props.pasien.result.ruangId
    ? props.pasien.result.ruangId.slice(0, 2)
    : "";

  const showModal = () => {
    setIsModalVisible(true);
    getCetakAssesmentHD(
      props.pasien.result.registrasiId,
      dayjs(props.tanggal).format("YYYY-MM-DD HH:mm"),
      3
    );
    // props.getDataPasien(props.noOrder);
    // console.log("noOrder: ", props.noOrder);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const klikRefresh = () => {
    !props.noOrder
      ? Modal.warning({
          title: "Peringatan!",
          content: "Silahkan pilih pasien terlebih dahulu",
        })
      : props.getDataPasien(props.noOrder);
  };

  const klikCetak = () => {
    props.pasien.result.length === 0
      ? Modal.warning({
          title: "Peringatan!",
          content: "Silahkan pilih pasien terlebih dahulu.",
        })
      : props.pasien.result.tandaVital.length === 0
      ? Modal.warning({
          title: "Peringatan!",
          content: "Tanda vital belum lengkap.",
        })
      : showModal();
  };

  return (
    <>
      <Card
        title="Identitas Pasien"
        extra={
          <div>
            <Tooltip
              placement="bottom"
              title={props.userEntry ? props.userEntry : "Belum Dientry"}
            >
              <Button
                type={alertKet === "91" ? "primary" : "default"}
                size="small"
              >
                {alertKet === "91" ? "Pasien Rawat Jalan" : "Pasien Rawat Inap"}
              </Button>
            </Tooltip>
          </div>
        }
        loading={props.loadingContent}
        size="small"
        headStyle={{ backgroundColor: "#ffa39e" }}
        style={{
          width: "100%",
          marginBottom: "8px",
          backgroundColor: "#fff1f0",
        }}
      >
        <Row style={{ marginBottom: "5px" }}>
          <Col span={5}>
            <span>No. Registrasi</span>
          </Col>
          <Col span={19}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                {props.pasien.result.registrasiId
                  ? props.pasien.result.registrasiId
                  : "-"}
              </b>{" "}
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={5}>
            <span>No. RM</span>
          </Col>
          <Col span={19}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                {props.pasien.result.pasienId
                  ? props.pasien.result.pasienId
                  : "-"}
              </b>{" "}
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={5}>
            <span>Nama</span>
          </Col>
          <Col span={19}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                {props.pasien.result.nama ? props.pasien.result.nama : "-"}
              </b>{" "}
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={5}>
            <span>Jenis Kelamin</span>
          </Col>
          <Col span={19}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                {props.pasien.result.jnsKelamin === "L"
                  ? "Laki-laki"
                  : props.pasien.result.jnsKelamin === "P"
                  ? "Perempuan"
                  : "-"}
              </b>{" "}
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={5}>
            <span>Tanggal Lahir</span>
          </Col>
          <Col span={19}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                {props.pasien.result.tanggalLahir
                  ? dayjs(props.pasien.result.tanggalLahir).format("DD-MM-YYYY")
                  : "-"}
              </b>{" "}
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={5}>
            <span>Alamat</span>
          </Col>
          <Col span={19}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                {props.pasien.result.alamat ? props.pasien.result.alamat : "-"}
              </b>{" "}
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "29px" }}>
          <Col span={5}>
            <span>Kelas</span>
          </Col>
          <Col span={19}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              <b>
                {props.pasien.result.nmGrpTrf
                  ? props.pasien.result.nmGrpTrf
                  : "-"}
              </b>
            </span>
          </Col>
        </Row>

        <Row>
          <Col span={24}>
            <Space style={{ float: "right" }}>
              <Button type="primary" htmlType="submit" disabled>
                Riwayat
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                onClick={() => klikRefresh()}
                // onClick={() => {
                //     !props.noOrder ? message.warning('Silahkan pilih pasien terlebih dahulu') :
                //         props.getDataPasien(props.noOrder)
                // }}
              >
                Refresh
              </Button>

              <Button
                type="primary"
                htmlType="submit"
                onClick={() => klikCetak()}
                // onClick={() => {
                //     props.pasien.result.length === 0 ? message.warning('Silahkan pilih pasien terlebih dahulu.') :
                //         props.pasien.result.tandaVital.length === 0 ? message.warning('Tanda vital belum lengkap.') :
                //             showModal();
                // }}
                // disabled
                // disabled={props.btnPostHd}
              >
                Cetak
              </Button>
            </Space>

            <Modal
              visible={isModalVisible}
              onCancel={handleCancel}
              footer={null}
              width={780}
            >
              <Card loading={spin}>
                <ButtomReport />
              </Card>
            </Modal>
          </Col>
        </Row>
      </Card>
    </>
  );
}

export default IdentPasienV2;
