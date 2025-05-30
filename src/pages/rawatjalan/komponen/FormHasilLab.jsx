import React, { useState, useContext } from "react";
import {
  Modal,
  Button,
  Col,
  Row,
  Tree,
  Typography,
  Space,
  Spin,
  message,
} from "antd";
import Iframe from "react-iframe";
import { PasienContext } from "../context/PasienContext";
import { HasilLabContext } from "../context/HasilLabContext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { ChatContext } from "../../chat/Chatcontext";

const { Text, Title } = Typography;
const { DirectoryTree } = Tree;

const HasilLab = () => {
  const norm = sessionStorage.getItem("norm");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");
  const [keySelectedLab, setkeySelectedLab] = useState("");
  const { curpas } = useContext(PasienContext);
  const { setLoading } = useContext(ChatContext);
  const {
    getListLabByPasieNiD,
    listLabByPasienId,
    modal1VisibleLab,
    setModal1VisibleLab,
  } = useContext(HasilLabContext);
  const { getPrintLabPk, printLabPk, loadDelay, setloadDelay } =
    useContext(PrintOutContext);
  const setMV = () => {
    if (curpas === "" || curpas === null) {
      // Modal.warning({ content: "Silahkan Pilih Pasien Terlebih Dahulu!" });
      message.warning("Silahkan Pilih Pasien Terlebih Dahulu!");
    } else {
      setLoading(true);
      getListLabByPasieNiD(norm);
    }
  };
  return (
    <div>
      <Button
        size="small"
        onClick={() => setMV()}
        style={{ backgroundColor: "#bae7ff", borderColor: "#40a9ff" }}
      >
        Laborat
      </Button>
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
              {/* <Title level={4}></Title> */}
            </Col>
            <Col span={3}>
              <Space direction="vertical">
                <Title level={3} style={{ marginBottom: "0", marginTop: "0" }}>
                  {" "}
                  {namaPasien}
                </Title>
                <Text code style={{ marginBottom: "0", marginTop: "0" }}>
                  {norm}
                </Text>
                <DirectoryTree
                  height={500}
                  // expandedKeys={[keyExpandLab]}
                  selectedKeys={[keySelectedLab]}
                  // showLine
                  // switcherIcon={<DownOutlined />}
                  onSelect={(e) => {
                    if (e[0].search("LI") >= 0) {
                      setloadDelay(true);
                      getPrintLabPk(norm, e[0]);
                      setkeySelectedLab(e[0]);
                    } else {
                      setloadDelay(true);
                      getPrintLabPk(
                        norm,
                        listLabByPasienId[
                          listLabByPasienId
                            .map((c) => c.registrasiId)
                            .indexOf(e[0])
                        ].listNoLab[
                          listLabByPasienId[
                            listLabByPasienId
                              .map((c) => c.registrasiId)
                              .indexOf(e[0])
                          ].listNoLab.length - 1
                        ].labNomor
                      );
                      // setkeyExpandLab(e[0]);
                      setkeySelectedLab(
                        listLabByPasienId[
                          listLabByPasienId
                            .map((c) => c.registrasiId)
                            .indexOf(e[0])
                        ].listNoLab[
                          listLabByPasienId[
                            listLabByPasienId
                              .map((c) => c.registrasiId)
                              .indexOf(e[0])
                          ].listNoLab.length - 1
                        ].labNomor
                      );
                    }
                  }}
                  treeData={listLabByPasienId.map((b) => ({
                    title: b.registrasiId,
                    key: b.registrasiId,
                    children: b.listNoLab.map((c) => ({
                      title: c.labNomor,
                      key: c.labNomor,
                      isLeaf: true,
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
          {/* <Formhasillab /> */}
        </Spin>
      </Modal>
    </div>
  );
};

export default HasilLab;
