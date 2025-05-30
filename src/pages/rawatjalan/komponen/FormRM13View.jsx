import React, { useContext } from "react";
import Iframe from "react-iframe";
import { Row, Col, Tree, Typography, Space, Spin } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { RM13RIContext } from "../../rawatinap/context/RM13Context";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
const { Text, Title } = Typography;
const FormRM13View = () => {
  const norm = sessionStorage.getItem("norm");
  const namaPasien = sessionStorage.getItem("namaPasienRawat");
  const { rm13ByPasienId } = useContext(RM13RIContext);
  const { printRm13, getPrintRm13, loadDelay, setloadDelay } =
    useContext(PrintOutContext);

  return (
    <div>
      <Spin spinning={loadDelay}>
        <Row>
          <Col span={24}>
            {/* <Title level={4}>Data RM 13 Pasien</Title> */}
            <Text keyboard>Data RM 13 Pasien</Text>
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
                // defaultSelectedKeys={
                //     [rm13ByPasienId.length === 0 ? '' :
                //         rm13ByPasienId[0].registrasiId]
                // }

                showLine
                switcherIcon={<DownOutlined />}
                onSelect={(e) => {
                  setloadDelay(true);
                  getPrintRm13(norm, e[0], "riwayat");
                }}
                treeData={rm13ByPasienId.map((b) => ({
                  title: b.registrasiId,
                  key: b.registrasiId,
                }))}
              />
            </Space>
          </Col>
          <Col span={21}>
            <Iframe
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printRm13}
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

export default FormRM13View;
