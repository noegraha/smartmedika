/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import Iframe from "react-iframe";
import { Row, Col, Watermark } from "antd";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import dayjs from "dayjs";

const FormRM02ViewReg = () => {
  const {
    getPrintRm02,
    getPrintRm02Tahun,
    getPrintRm02Poli,
    getPrintRm02Kunjungan,
    printRm02,
    setprintRm02,
    printRm02Tahun,
    setprintRm02Tahun,
    printRm02Poli,
    setprintRm02Poli,
    printRm02Kunjungan,
    setprintRm02Kunjungan,
    modalKunjungan,
    setmodalKunjungan,
    loadDelay,
    setloadDelay,
  } = useContext(PrintOutContext);
  const petugas = sessionStorage.getItem("namapetugas");
  return (
    <div>
      <Row gutter={[5, 5]}>
        <Col span={24}>
          <Watermark
            content={[
              "RSUD Prof Dr. Margono Soekarjo",
              petugas + " - " + dayjs().format("DD-MM-YYYY HH:mm:ss"),
            ]}
          >
            <Iframe
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printRm02Kunjungan}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
              styles={{
                wordWarp: "break-word",
                overflowWrap: "break-word",
              }}
            />
          </Watermark>
        </Col>
      </Row>
    </div>
  );
};

export default FormRM02ViewReg;
