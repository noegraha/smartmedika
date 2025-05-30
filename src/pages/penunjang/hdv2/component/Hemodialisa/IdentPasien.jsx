import React, { useContext, useState } from "react";
import {
  Row,
  Col,
  Card,
  Space,
  Button,
  Modal,
  Spin,
  message,
  Alert,
} from "antd";
import dayjs from "dayjs";
import HdContext from "../../HdContext";
import Report from "./ReportHd/Report";
import ButtomReport from "./ReportHd/ButtomReport";
import { AssesmentRIContext } from "../../../../rawatinap/context/AssesmentRIContext";

const { PasiensContext } = HdContext;

function IdentPasien() {
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
    // getCetakAssesmentHD(props.pasien.result.registrasiId, dayjs(props.tanggal), 3)
    // props.getDataPasien(props.noOrder);
    // console.log("noOrder: ", props.noOrder);
  };

  const handleOk = () => {
    setIsModalVisible(false);
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
            <Button
              type={alertKet === "91" ? "primary" : "default"}
              size="small"
            >
              {alertKet === "91" ? "Pasien Rawat Jalan" : "Pasien Rawat Inap"}
            </Button>
          </div>
        }
        size="small"
        headStyle={{ backgroundColor: "#ffa39e" }}
        style={{
          width: "100%",
          marginBottom: "8px",
          backgroundColor: "#fff1f0",
        }}
      >
        <Row style={{ marginBottom: "5px" }}>
          <Col span={4}>
            <span>No. Registrasi</span>
          </Col>
          <Col span={8}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {props.pasien.result.registrasiId
                ? props.pasien.result.registrasiId
                : "-"}{" "}
            </span>
          </Col>
          <Col span={4}>
            <span>Kelas</span>
          </Col>
          <Col span={8}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {props.pasien.result.nmGrpTrf
                ? props.pasien.result.nmGrpTrf
                : "-"}
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={4}>
            <span>Nama</span>
          </Col>
          <Col span={8}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {props.pasien.result.nama ? props.pasien.result.nama : "-"}{" "}
            </span>
          </Col>
          <Col span={4}>
            <span>Jenis Kelamin</span>
          </Col>
          <Col span={8}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {props.pasien.result.jnsKelamin === "L"
                ? "Laki-laki"
                : props.pasien.result.jnsKelamin === "P"
                ? "Perempuan"
                : "-"}{" "}
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={4}>
            <span>Tanggal Lahir</span>
          </Col>
          <Col span={8}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {props.pasien.result.tanggalLahir
                ? dayjs(props.pasien.result.tanggalLahir).format("DD-MM-YYYY")
                : "-"}{" "}
            </span>
          </Col>
          <Col span={4}>
            <span>Alamat</span>
          </Col>
          <Col span={8}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {props.pasien.result.alamat
                ? props.pasien.result.alamat
                : "-"}{" "}
            </span>
          </Col>
        </Row>

        <Row style={{ marginBottom: "5px" }}>
          <Col span={4}>
            <span>No. RM</span>
          </Col>
          <Col span={20}>
            <span>
              {" "}
              :&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {props.pasien.result.pasienId
                ? props.pasien.result.pasienId
                : "-"}{" "}
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
                //     !props.noOrder ? Modal.warning({ title: 'Peringatan!', content: 'Silahkan pilih pasien terlebih dahulu' }) :
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
                //     props.pasien.result.length === 0 ? Modal.warning({ title: 'Peringatan!', content: 'Silahkan pilih pasien terlebih dahulu.' }) :
                //         props.pasien.result.tandaVital.length === 0 ? Modal.warning({ title: 'Peringatan!', content: 'Tanda vital belum lengkap.' }) :
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

export default IdentPasien;
