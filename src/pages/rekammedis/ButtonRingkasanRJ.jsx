import { Button, Modal } from "antd";
import React, { useContext } from "react";
import { PrintOutContext } from "../PrintOutDokumen/PrintOutContext";
import { PasienContext } from "../rawatjalan/context/PasienContext";
import FormResumeMedis from "../rawatjalan/komponen/FormResumeMedis";

const ButtonRingkasanRJ = () => {
  const { setprintResumeMedis } = useContext(PrintOutContext);
  const { detailRiwayatPasien, modalRiwayat, setmodalRiwayat } =
    useContext(PasienContext);
  const pasienid = sessionStorage.getItem("norm");

  return (
    <div>
      <Button
        size="small"
        type="primary"
        onClick={() => {
          detailRiwayatPasien(pasienid);
          setmodalRiwayat(true);
        }}
      >
        Ringkasan RJ
      </Button>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        open={modalRiwayat}
        onCancel={() => {
          setmodalRiwayat(false);
          setprintResumeMedis("");
        }}
      >
        <FormResumeMedis />
      </Modal>
    </div>
  );
};

export default ButtonRingkasanRJ;
