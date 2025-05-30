import React, { useContext } from "react";
import Iframe from "react-iframe";
import { Row, Col, Tree, Typography, Space, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
import { TumKembangContext } from "../context/pemeriksaancontext/TumKembangContext";

const { Text, Title } = Typography;
const FormDDST = () => {
  const norm = sessionStorage.getItem("norm");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");
  const { listDDSTByPasienId } = useContext(TumKembangContext);
  const { getDDST, printDDST, loadDelay, setloadDelay } =
    useContext(PrintOutContext);

  return (
    <div>
      <Spin spinning={loadDelay}>
        <Row>
          <Col span={24}>
            <Text keyboard>Data Tumbuh Kembang Pasien</Text>
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
              <Tree
                defaultExpandAll
                showLine
                switcherIcon={<DownOutlined />}
                onSelect={(e) => {
                  setloadDelay(true);
                  getDDST(e[0]);
                }}
                treeData={listDDSTByPasienId.map((b) => ({
                  title: b.RegistrasiId,
                  key: b.RegistrasiId,
                }))}
              />
            </Space>
          </Col>
          <Col span={21}>
            <Iframe
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printDDST}
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
    </div>
  );
};

export default FormDDST;
