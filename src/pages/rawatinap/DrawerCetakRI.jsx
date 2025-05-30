import React, { useContext, useState } from "react";
import { DownOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Dropdown, Menu, Modal } from "antd";
import ButtomCetakRM13 from "./ButtonRM13";
import ButtomCetakRM02 from "./ButtonRM02";
import ButtonGeneralConsentRJ from "./ButtonGeneralConsentRJ";
import { PasienContext } from "../context/PasienContext";
import { CetakanContext } from "../context/CetakanContext";
import ButtomCetakPemFisik from "./ButtonPemFisik";
import ButtonGambar from "./ButtonGambar";
import { GambarContext } from "../context/GambarContext";
import FormViewLaporanOp from "./FormLaporanOP";
import ButtonSP33 from "./ButtonSP33";
import FormRM13View from "./FormRM13View";
import { RM13RIContext } from "../../rawatinap/context/RM13Context";
import { HasilLabContext } from "../context/HasilLabContext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";

const DrawerCetakRI = () => {
  const [modalRM02, setModalRM02] = useState(false);
  const [modalRM13, setModalRM13] = useState(false);
  const [modalSP33, setModalSp33] = useState(false);
  const [modalpemfisik, setModalPemFisik] = useState(false);
  const [modalgambar, setModalGambar] = useState(false);
  const [modallaporanOP, setModalLaporanOP] = useState(false);
  const [modalgeneralconsent, setModalGeneralConsent] = useState(false);
  const pasienid = sessionStorage.getItem("norm");
  const noreg = sessionStorage.getItem("noreg");
  const { getPasienDetail, curpas } = useContext(PasienContext);
  const {
    rm13ByPasienId,
    setrm13ByPasienId,
    GetRM13ByPasienId,
    visibleRm13,
    setVisibleRm13,
    GetPrintRM13,
  } = useContext(RM13RIContext);
  const {
    printRm13,
    setPrintRm13,
    getPrintRm13,
    getPrintHasilOp,
    printHasilOp,
    setprintHasilOp,
  } = useContext(PrintOutContext);
  const {
    listOpByPasienId,
    setlistOpByPasienId,
    modal1VisibleOp,
    setModal1VisibleOp,
    getListOpByPasienId,
  } = useContext(HasilLabContext);
  const { getRM02 } = useContext(CetakanContext);
  const { detailGambar } = useContext(GambarContext);
  function handleMenuClick(e) {
    if (e.key === "1") {
      setModalRM02(true);
      getRM02(pasienid);
    } else if (e.key === "2") {
      GetRM13ByPasienId(pasienid);
    } else if (e.key === "3") {
      setModalPemFisik(true);
    } else if (e.key === "4") {
      setModalGambar(true);
      // detailGambar(noreg);
    } else if (e.key === "5") {
      getListOpByPasienId(pasienid);
    } else if (e.key === "6") {
      setModalGeneralConsent(true);
      getPasienDetail(pasienid);
    } else if (e.key === "7") {
      setModalSp33(true);
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      {/* <Menu.Item key="1" icon={<UserOutlined />}>
        RM 02
      </Menu.Item> */}
      <Menu.Item key="3" icon={<UserOutlined />}>
        Pemeriksaan Fisik
      </Menu.Item>
      <Menu.Item key="4" icon={<UserOutlined />}>
        Gambar
      </Menu.Item>
      <Menu.Item key="2" icon={<UserOutlined />}>
        RM 13
      </Menu.Item>
      <Menu.Item key="5" icon={<UserOutlined />}>
        Laporan OP
      </Menu.Item>
      <Menu.Item key="6" icon={<UserOutlined />}>
        General Consent
      </Menu.Item>
      <Menu.Item key="7" icon={<UserOutlined />}>
        SP33
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
        visible={modalRM02}
        onCancel={() => setModalRM02(false)}
      >
        <ButtomCetakRM02 />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={visibleRm13}
        onCancel={() => setVisibleRm13(false)}
      >
        {/* <ButtomCetakRM13 /> */}
        <FormRM13View />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={modalpemfisik}
        onCancel={() => setModalPemFisik(false)}
      >
        <ButtomCetakPemFisik />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={modalgambar}
        onCancel={() => setModalGambar(false)}
      >
        <ButtonGambar />
      </Modal>
      <Modal
        closable={false}
        footer={null}
        width="70%"
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

export default DrawerCetakRI;
