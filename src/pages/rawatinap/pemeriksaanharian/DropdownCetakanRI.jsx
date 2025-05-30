import React, { useContext, useState } from "react";
import {
  DownOutlined,
  UserOutlined,
  FileTextOutlined,
} from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal } from "antd";
import Iframe from "react-iframe";
import { PasienRIContext } from "../context/PasienRIContext";
import { RM13RIContext } from "../../rawatinap/context/RM13Context";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { HasilLabContext } from "../../rawatjalan/context/HasilLabContext";
import { GambarContext } from "../../rawatjalan/context/GambarContext";
import FormRM13View from "../../rawatjalan/komponen/FormRM13View";
import ButtonGambar from "../../rawatjalan/komponen/ButtonGambar";
import FormViewLaporanOp from "../../rawatjalan/komponen/FormLaporanOP";
import FormRJIGD from "./FormRJIGD";
import { AnamnesaRIContext } from "../context/AnamnesaRIContext";
import FormLaporanKala from "./FormLaporanKala";
const DropdownCetakanRI = () => {
  const [modalRM02, setModalRM02] = useState(false);
  const [modalKala, setModalKala] = useState(false);
  const [modalRM13, setModalRM13] = useState(false);
  const [modalSP33, setModalSp33] = useState(false);
  const [modalgambar, setModalGambar] = useState(false);
  const [modallaporanOP, setModalLaporanOP] = useState(false);
  const [modalgeneralconsent, setModalGeneralConsent] = useState(false);
  const pasienid = sessionStorage.getItem("norm");
  const noreg = sessionStorage.getItem("noreg");
  const { curpasRI } = useContext(PasienRIContext);
  const { pasienDari } = useContext(AnamnesaRIContext);

  const {
    rm13ByPasienId,
    setrm13ByPasienId,
    GetRM13ByPasienId,
    visibleRm13,
    setVisibleRm13,
    GetPrintRM13,
  } = useContext(RM13RIContext);
  const {
    modalTerima,
    setmodalTerima,
    modalAnamnesa,
    setmodalAnamnesa,
    modalPFisik,
    setmodalPFisik,
    modalAssAskep,
    setmodalAssAskep,
    modalRM11,
    setmodalRM11,
    modalAskep,
    setmodalAskep,
    modalKonsul,
    setmodalKonsul,
    setprintHasilOp,
    getPrintfisikRI,
    getPrintKonsulRI,
    printKonsulRI,
    loadDelay,
    setloadDelay,
    printFirikRI,
    printAnamnesa,
    getPrintAnamnesa,
    getPrintTerimaPasien,
    getPrintAssAske,
    printAss,
    getPrintAsuhan,
    getPrintRM11,
    printTerima,
    printasuhan,
    printRM11,
  } = useContext(PrintOutContext);
  const {
    listOpByPasienId,
    setlistOpByPasienId,
    modal1VisibleOp,
    setModal1VisibleOp,
    getListOpByPasienId,
  } = useContext(HasilLabContext);

  function handleMenuClick(e) {
    if (e.key === "1") {
      pasienDari(curpasRI.registrasiId);
      setModalRM02(true);
    } else if (e.key === "2") {
      getPrintTerimaPasien(curpasRI.pasienId, curpasRI.registrasiId, "");
    } else if (e.key === "3") {
      getPrintAnamnesa(curpasRI.registrasiId, "");
    } else if (e.key === "4") {
      getPrintfisikRI(curpasRI.registrasiId, "1", "");
    } else if (e.key === "5") {
      getPrintAssAske(curpasRI.registrasiId, "1", "");
    } else if (e.key === "6") {
      getPrintRM11(curpasRI.registrasiId, "");
    } else if (e.key === "7") {
      getPrintAsuhan(curpasRI.registrasiId, "1", "");
    } else if (e.key === "8") {
      getPrintKonsulRI(curpasRI.registrasiId, "");
    } else if (e.key === "9") {
      GetRM13ByPasienId(pasienid);
    } else if (e.key === "10") {
      getListOpByPasienId(pasienid);
    } else if (e.key === "11") {
      setModalKala(true);
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<FileTextOutlined />}>
        Rawat Jalan / IGD
      </Menu.Item>
      <Menu.Item key="2" icon={<FileTextOutlined />}>
        Serah Terima
      </Menu.Item>
      <Menu.Item key="3" icon={<FileTextOutlined />}>
        Anamnesa
      </Menu.Item>
      <Menu.Item key="4" icon={<FileTextOutlined />}>
        Pemeriksaan Fisik
      </Menu.Item>
      <Menu.Item key="5" icon={<FileTextOutlined />}>
        Asesmen Askep
      </Menu.Item>
      <Menu.Item key="6" icon={<FileTextOutlined />}>
        RM 11
      </Menu.Item>
      <Menu.Item key="7" icon={<FileTextOutlined />}>
        Asuha Keperawatan
      </Menu.Item>
      <Menu.Item key="8" icon={<FileTextOutlined />}>
        Konsul
      </Menu.Item>
      <Menu.Item key="9" icon={<FileTextOutlined />}>
        RM 13
      </Menu.Item>
      <Menu.Item key="10" icon={<FileTextOutlined />}>
        Laporan OP
      </Menu.Item>
      <Menu.Item key="11" icon={<FileTextOutlined />}>
        Laporan Persalinan
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
        // centered={true}
        visible={modalRM02}
        onCancel={() => setModalRM02(false)}
      >
        <FormRJIGD />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        // centered={true}
        visible={visibleRm13}
        onCancel={() => setVisibleRm13(false)}
      >
        <FormRM13View />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        // centered={true}
        visible={modal1VisibleOp}
        onCancel={() => {
          setModal1VisibleOp(false);
          setprintHasilOp("");
        }}
      >
        <FormViewLaporanOp />
      </Modal>

      <Modal
        width="70%"
        footer={null}
        open={modalKonsul}
        onCancel={() => {
          setmodalKonsul(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printKonsulRI}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={modalPFisik}
        onCancel={() => {
          setmodalPFisik(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printFirikRI}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={modalAnamnesa}
        onCancel={() => {
          setmodalAnamnesa(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printAnamnesa}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={modalAssAskep}
        onCancel={() => {
          setmodalAssAskep(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printAss}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={modalTerima}
        onCancel={() => {
          setmodalTerima(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printTerima}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={modalAskep}
        onCancel={() => {
          setmodalAskep(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printasuhan}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
      <Modal
        width="70%"
        footer={null}
        open={modalRM11}
        onCancel={() => {
          setmodalRM11(false);
        }}
        style={{ top: 10 }}
        centered={true}
        closable={true}
      >
        <Iframe
          loading={loadDelay}
          onLoad={() => {
            setloadDelay(false);
          }}
          url={printRM11}
          width="100%"
          height="750px"
          id="myId"
          className="myClassname"
          display="initial"
          position="relative"
        />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        // centered={true}
        visible={modalKala}
        onCancel={() => setModalKala(false)}
      >
        <FormLaporanKala />
      </Modal>
    </div>
  );
};

export default DropdownCetakanRI;
