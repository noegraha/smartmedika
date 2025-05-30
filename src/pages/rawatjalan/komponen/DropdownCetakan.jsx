import React, { useContext, useState } from "react";
import { DownOutlined, FileTextOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal, Spin, message, Tooltip } from "antd";
import Iframe from "react-iframe";
import ButtonGeneralConsentRJ from "./ButtonGeneralConsentRJ";
import { PasienContext } from "../context/PasienContext";
import ButtonGambar from "./ButtonGambar";
import { GambarContext } from "../context/GambarContext";
import FormViewLaporanOp from "./FormLaporanOP";
import ButtonSP33 from "./ButtonSP33";
import FormRM13View from "./FormRM13View";
import { RM13RIContext } from "../../rawatinap/context/RM13Context";
import { HasilLabContext } from "../context/HasilLabContext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { ChatContext } from "../../chat/Chatcontext";
import FormDDST from "./FormDDST";
import { TumKembangContext } from "../context/pemeriksaancontext/TumKembangContext";
import FormResumeMedis from "./FormResumeMedis";
import { VClaimContext } from "../context/VClaimContext";

const DropdownCetakan = () => {
  const [modalSP33, setModalSp33] = useState(false);
  const [modalgeneralconsent, setModalGeneralConsent] = useState(false);
  const pasienid = sessionStorage.getItem("norm");
  const pegawai = sessionStorage.getItem("pegawai");
  const {
    getPasienDetail,
    curpas,
    poli1,
    detailRiwayatPasien,
    modalRiwayat,
    setmodalRiwayat,
  } = useContext(PasienContext);
  const { GetRM13ByPasienId, visibleRm13, setVisibleRm13 } =
    useContext(RM13RIContext);
  const { getListTKembangByPasienId, modalDDST, setmodalDDST } =
    useContext(TumKembangContext);
  const {
    getPrintPmrFisik,
    printPmrFisik,
    modalPmrFisik,
    setmodalPmrFisik,
    loadDelay,
    setloadDelay,
    setprintDDST,
    setprintResumeMedis,
  } = useContext(PrintOutContext);
  const {
    modal1VisibleOp,
    setModal1VisibleOp,
    getListOpByPasienId,
    getListLAbPAByPasienId,
  } = useContext(HasilLabContext);
  const {
    getRiwayatLayananBpjs,
    setdataRiwayat,
    dataRiwayat,
    modalBpjs,
    setmodalBpjs,
    mappingDokterBPJSbyDid,
  } = useContext(VClaimContext);
  const { modalGambarIrja, setmodalGambarIrja, GetListGambarByPasienId } =
    useContext(GambarContext);
  const { setLoading } = useContext(ChatContext);
  function handleMenuClick(e) {
    if (e.key === "1") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        getListLAbPAByPasienId(pasienid);
      }
    } else if (e.key === "2") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        setLoading(true);
        GetRM13ByPasienId(pasienid);
      }
    } else if (e.key === "3") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        // setloadDelay(true);
        getPrintPmrFisik(pasienid, "{parameter2}");
      }
    } else if (e.key === "4") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        setLoading(true);
        GetListGambarByPasienId(pasienid);
      }
    } else if (e.key === "5") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        setLoading(true);
        getListOpByPasienId(pasienid);
      }
    } else if (e.key === "6") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        setModalGeneralConsent(true);
        getPasienDetail(pasienid);
      }
    } else if (e.key === "7") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        setModalSp33(true);
      }
    } else if (e.key === "8") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        getListTKembangByPasienId(pasienid);
      }
    } else if (e.key === "9") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        detailRiwayatPasien(pasienid);
        setmodalRiwayat(true);
        // setModalResumeMedis(true);
      }
    } else if (e.key === "10") {
      if (curpas === "" || curpas === null) {
        // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        curpas.dokterId === pegawai
          ? mappingDokterBPJSbyDid(curpas.noPolish, curpas.dokterId)
          : message.warning("Bukan DPJP!");

        // console.log(curpas.noPolish, curpas.dokterId);
        // setModalResumeMedis(true);
      }
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      {/* <Menu.Item key="9" icon={<FileTextOutlined />}>
        Resume Medis
      </Menu.Item> */}
      <Menu.Item key="3" icon={<FileTextOutlined />}>
        Pemeriksaan Fisik
      </Menu.Item>
      <Menu.Item key="4" icon={<FileTextOutlined />}>
        Gambar
      </Menu.Item>
      {poli1 === "9144" || curpas.ruangId === "9144" ? (
        <Menu.Item key="8" icon={<FileTextOutlined />}>
          DDST
        </Menu.Item>
      ) : (
        <div></div>
      )}
      <Menu.Item disabled key="2" icon={<FileTextOutlined />}>
        <Tooltip
          placement="left"
          title={
            <div>
              <p>Sedang dalam perbaikan..</p>
            </div>
          }
        >
          <div>RM 13</div>
        </Tooltip>
      </Menu.Item>

      <Menu.Item key="5" icon={<FileTextOutlined />}>
        Laporan OP
      </Menu.Item>
      <Menu.Item key="6" icon={<FileTextOutlined />}>
        General Consent
      </Menu.Item>
      <Menu.Item key="7" icon={<FileTextOutlined />}>
        SP33
      </Menu.Item>
      <Menu.Item
        key="9"
        icon={<FileTextOutlined />}
        // disabled={namauser !== "NUGRAHA"}
      >
        Ringkasan Rawat Jalan
      </Menu.Item>
      <Menu.Item
        key="10"
        icon={<FileTextOutlined />}
        // disabled={namauser !== "NUGRAHA"}
      >
        Riwayat Pelayanan BPJS
      </Menu.Item>
    </Menu>
  );
  return (
    <div>
      <Dropdown overlay={menu}>
        <Button
          size="small"
          style={{ backgroundColor: "#bae7ff", borderColor: "#40a9ff" }}
        >
          Dokumen RM <DownOutlined />
        </Button>
      </Dropdown>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={modalRiwayat}
        onCancel={() => {
          setmodalRiwayat(false);
          setprintResumeMedis("");
        }}
      >
        <FormResumeMedis />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={visibleRm13}
        onCancel={() => setVisibleRm13(false)}
      >
        <FormRM13View />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={modalPmrFisik}
        onCancel={() => setmodalPmrFisik(false)}
      >
        <Spin spinning={loadDelay}>
          <Iframe
            onLoad={() => {
              setloadDelay(false);
            }}
            url={printPmrFisik}
            width="100%"
            height="750px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Spin>
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={modalBpjs}
        onCancel={() => setmodalBpjs(false)}
      >
        <Spin spinning={loadDelay}>
          <Iframe
            onLoad={() => {
              setloadDelay(false);
            }}
            url={dataRiwayat}
            width="100%"
            height="750px"
            id="myId"
            className="myClassname"
            display="initial"
            position="relative"
          />
        </Spin>
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={modalGambarIrja}
        onCancel={() => setmodalGambarIrja(false)}
      >
        <ButtonGambar />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={modalDDST}
        onCancel={() => {
          setmodalDDST(false);
          setprintDDST("");
        }}
      >
        {/* <ButtomCetakRM13 /> */}
        <FormDDST />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="80%"
        centered={true}
        visible={modal1VisibleOp}
        onCancel={() => setModal1VisibleOp(false)}
      >
        <FormViewLaporanOp />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="800px"
        centered={true}
        visible={modalgeneralconsent}
        onCancel={() => setModalGeneralConsent(false)}
      >
        <ButtonGeneralConsentRJ />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="800px"
        centered={true}
        visible={modalSP33}
        onCancel={() => setModalSp33(false)}
      >
        <ButtonSP33 />
      </Modal>
    </div>
  );
};

export default DropdownCetakan;
