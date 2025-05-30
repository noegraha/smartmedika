import { Button, Col, Input, Modal, QRCode, Row } from "antd";
import React, { useContext, useState } from "react";
import { VClaimContext } from "../context/VClaimContext";

const ButtonCekSuratKontrol = () => {
  const {
    norujukan,
    tanggal,
    loadingBPJS,
    getSuratKontrolBPJSbyNoSurat,
    datakontrolBPJS,
  } = useContext(VClaimContext);
  const [open, setOpen] = useState(false);

  return (
    <div>
      <Input.Group compact>
        <Input
          style={{
            width: "calc(100% - 30%)",
          }}
          value={norujukan}
        />
        <Button
          loading={loadingBPJS}
          type="primary"
          style={{
            width: "calc(100% - 70%)",
          }}
          onClick={() => {
            getSuratKontrolBPJSbyNoSurat(norujukan);
            setOpen(true);
          }}
        >
          {tanggal}
        </Button>
      </Input.Group>
      <Modal
        open={open}
        title="Data Surat Rencana Kontrol"
        footer={[
          <Button key="back" onClick={() => setOpen(false)}>
            Kembali
          </Button>,
        ]}
      >
        <Row gutter={[8, 8]}>
          <Col span={12}>
            <p>
              Nama : {datakontrolBPJS.sep.peserta.nama}
              <br />
              No Surat : {datakontrolBPJS.noSuratKontrol}
              <br />
              Tgl. Kontrol : {datakontrolBPJS.tglRencanaKontrol}
              <br />
              Tgl. Dibuat : {datakontrolBPJS.tglTerbit}
              <br />
              Poli Tujuan : {datakontrolBPJS.namaPoliTujuan}
              <br />
              Nama Dokter : {datakontrolBPJS.namaDokter}
              <br />
              Diagnosa : {datakontrolBPJS.sep.diagnosa}
            </p>
          </Col>
          <Col span={12}>
            <QRCode
              value={datakontrolBPJS.noSuratKontrol || "-"}
              errorLevel="M"
            />
          </Col>
        </Row>
      </Modal>
    </div>
  );
};

export default ButtonCekSuratKontrol;
