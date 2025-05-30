import React, { useContext } from "react";
import { DownOutlined, FileTextOutlined } from "@ant-design/icons";
import {
  Button,
  Dropdown,
  Menu,
  Modal,
  message,
  Spin,
  Typography,
  Tree,
  Row,
  Col,
  Space,
} from "antd";
import { PasienContext } from "../context/PasienContext";
import { HasilLabContext } from "../context/HasilLabContext";
import FormLAboratPAVIew from "./FormLAboratPAVIew";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { ChatContext } from "../../chat/Chatcontext";
import Iframe from "react-iframe";
const { Text, Title } = Typography;
const { DirectoryTree } = Tree;
const DropdownLaborat = () => {
  const pasienid = sessionStorage.getItem("norm");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");

  const { curpas } = useContext(PasienContext);
  const {
    getListLAbPAByPasienId,
    modalLabPA,
    setmodalLabPA,
    getListLabByPasieNiD,
    listLabByPasienId,
    modal1VisibleLab,
    setModal1VisibleLab,
  } = useContext(HasilLabContext);
  const { getPrintLabPk, printLabPk, loadDelay, setloadDelay, setprintLabPa } =
    useContext(PrintOutContext);
  const { setLoading } = useContext(ChatContext);
  function handleMenuClick(e) {
    if (e.key === "1") {
      if (curpas === "" || curpas === null) {
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        setLoading(true);
        getListLabByPasieNiD(pasienid);
        // setkeySelectedLab("");
      }
    } else if (e.key === "2") {
      if (curpas === "" || curpas === null) {
        message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
      } else {
        getListLAbPAByPasienId(pasienid);
      }
    }
  }
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="1" icon={<FileTextOutlined />}>
        Laborat PK
      </Menu.Item>
      <Menu.Item key="2" icon={<FileTextOutlined />}>
        Laborat PA
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
          Laborat <DownOutlined />
        </Button>
      </Dropdown>
      <Modal
        closable={false}
        footer={null}
        width="70%"
        centered={true}
        visible={modalLabPA}
        onCancel={() => {
          setprintLabPa("");
          setmodalLabPA(false);
        }}
      >
        <FormLAboratPAVIew />
      </Modal>
      <Modal
        footer={null}
        width="80%"
        centered={true}
        visible={modal1VisibleLab}
        onCancel={() => setModal1VisibleLab(false)}
      >
        <Spin spinning={loadDelay}>
          <Row>
            <Col span={24}>
              <Text keyboard>Data Hasil Laborat Pasien</Text>
            </Col>
            <Col span={3}>
              <Space direction="vertical">
                <Title level={3} style={{ marginBottom: "0", marginTop: "0" }}>
                  {" "}
                  {namaPasien}
                </Title>
                <Text code style={{ marginBottom: "0", marginTop: "0" }}>
                  {pasienid}
                </Text>
                <DirectoryTree
                  height={500}
                  onSelect={(e) => {
                    setloadDelay(true);
                    getPrintLabPk(pasienid, e[0]);
                  }}
                  treeData={listLabByPasienId.map((b) => ({
                    title: b.registrasiId,
                    key: b.registrasiId,
                    selectable: false,
                    children: b.listNoLab.map((c) => ({
                      title: c.labNomor,
                      key: c.labNomor,
                      isLeaf: true,
                      selectable: true,
                    })),
                  }))}
                />
              </Space>
            </Col>
            <Col span={21}>
              <Iframe
                onLoad={() => {
                  setloadDelay(false);
                }}
                url={printLabPk}
                width="100%"
                height="750px"
                id="myId"
                className="myClassname"
                display="initial"
                position="relative"
              />
            </Col>
          </Row>
        </Spin>
      </Modal>
    </div>
  );
};

export default DropdownLaborat;
