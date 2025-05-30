import React, { useContext, useState } from "react";
import Iframe from "react-iframe";
import {
  Button,
  Modal,
  Row,
  Col,
  Tree,
  Typography,
  Space,
  message,
} from "antd";
import { HasilRadiologiContext } from "../context/HasilRadiologiContext";
import { PasienContext } from "../context/PasienContext";
import { ChatContext } from "../../chat/Chatcontext";
import NewWindow from "react-new-window";
import { LoginContext } from "../context";

const { Text, Title } = Typography;
const { DirectoryTree } = Tree;

const HasilRadiologi = () => {
  const norm = sessionStorage.getItem("norm");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");
  const [keySelectRad, setkeySelectRad] = useState("");
  const {
    hasilRadiologiByPasienId,
    GetHasilRadiologiByPasienId,
    visible,
    setVisible,
    URL,
    setURL,
    setexpandFitures,
  } = useContext(HasilRadiologiContext);
  const { curpas } = useContext(PasienContext);
  const { setLoading } = useContext(ChatContext);
  const { host } = useContext(LoginContext);

  const onMV = () => {
    // console.log(hasilRadiologiByPasienId)
    if (curpas === "" || curpas === null) {
      // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
      message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
    } else {
      setLoading(true);
      GetHasilRadiologiByPasienId(norm);
    }
  };
  const handleOk = () => {
    setVisible(false);
    setexpandFitures(false);
    setURL("");
  };
  // Atur properti jendela
  const windowFeatures =
    "menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";

  // Hitung posisi tengah jendela
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;
  const windowWidth = 600; // Lebar jendela baru
  const windowHeight = 400; // Tinggi jendela baru
  const left = (screenWidth - windowWidth) / 2;
  const top = (screenHeight - windowHeight) / 2;
  const [shouldOpenWindow, setShouldOpenWindow] = useState(false);
  return (
    <div>
      <Button
        size="small"
        onClick={onMV}
        style={{ backgroundColor: "#bae7ff", borderColor: "#40a9ff" }}
      >
        Radiologi
      </Button>
      <Modal
        open={visible}
        footer={null}
        onOk={handleOk}
        onCancel={handleOk}
        width="80%"
        centered={true}
      >
        <Row>
          <Col span={24}>
            <Text keyboard>Data Hasil Radiologi Pasien</Text>
          </Col>
          <Col span={3}>
            <Space direction="vertical">
              <Title level={3} style={{ marginBottom: "0", marginTop: "0" }}>
                {namaPasien}
              </Title>
              <Text code style={{ marginBottom: "0", marginTop: "0" }}>
                {norm}
              </Text>
              <DirectoryTree
                selectedKeys={[keySelectRad]}
                onSelect={(e) => {
                  const selectedKey = e[0];

                  if (selectedKey.length === 10) {
                    const data = hasilRadiologiByPasienId.find(
                      (item) => item.registrasiId === selectedKey
                    );
                    if (data && data.listLink.length > 0) {
                      const url = data.listLink[0].urlExpertise;
                      setURL(url);
                      setkeySelectRad(url);
                    }
                  } else {
                    setURL(selectedKey);
                    setkeySelectRad(selectedKey);

                    if (
                      host === "smart.rsmargono.id" ||
                      host === "smart.rsmargono.my.id"
                    ) {
                      // ✅ Buka URL di tab baru atau popup window
                      const windowFeatures = `width=1200,height=800,left=${left},top=${top},resizable=yes,scrollbars=yes,status=yes`;
                      window.open(selectedKey, "_blank", windowFeatures);
                    }
                  }
                }}
                treeData={hasilRadiologiByPasienId.map((b) => ({
                  title: b.registrasiId,
                  key: b.registrasiId,
                  // isLeaf: true,
                  children: b.listLink.map((c) => ({
                    title: c.fotoNumber,
                    key: c.urlExpertise,
                    isLeaf: true,
                  })),
                }))}
              />
            </Space>
          </Col>
          <Col span={21}>
            <Iframe
              url={URL}
              width="100%"
              height="750px"
              id="myId"
              className="myClassname"
              display="initial"
              position="relative"
            />
          </Col>
        </Row>

        {shouldOpenWindow && (
          <NewWindow
            url={URL}
            center="screen"
            features={{ width: 1200, height: 800, top: 20 }}
            onUnmount={true}
          />
        )}
      </Modal>
    </div>
  );
};

export default HasilRadiologi;
