import { Button, Modal, Select, Row, Col, Tree, Typography, Space, Spin } from "antd";
import React, { useRef, useContext, useState } from "react";
import ReactToPrint from "react-to-print";
import FormGambar from "./FormGambar";
import { DownOutlined } from '@ant-design/icons';
import Iframe from "react-iframe";
import { GambarContext } from "../context/GambarContext";
import { PasienContext } from "../context/PasienContext";
import { PrintOutContext } from "../../PrintOutDokumen/PrintOutContext";
const { Text, Link, Title } = Typography;

const ButtonGambar = () => {
  const {
    curpas,
  } = useContext(PasienContext);
  const { gambar, detailGambar, insertGambar,
    listGambarByPasienId, setlistGambarByPasienId,
    modalGambarIrja, setmodalGambarIrja, GetListGambarByPasienId } = useContext(GambarContext);
  const { printGambar, setprintGambar, getPrintGambarPasien,
    loadDelay, setloadDelay } = useContext(PrintOutContext);
  return (
    <div>
      <Spin spinning={loadDelay}>
        <Row>
          <Col span={24}>
            {/* <Title level={4}>Data RM 13 Pasien</Title> */}
            <Text keyboard>Data Gambar Pasien</Text>
          </Col>
          <Col span={3}>
            <Space direction="vertical">
              <Title level={3} style={{ marginBottom: '0', marginTop: '0' }}> {curpas.namaPasien}</Title>
              <Text code style={{ marginBottom: '0', marginTop: '0' }}>{curpas.pasienId}</Text>
              <Tree
                // defaultExpandAll
                showLine
                switcherIcon={<DownOutlined />}
                onSelect={(e) => {
                  setloadDelay(true);
                  getPrintGambarPasien(curpas.pasienId, e[0]);
                }}
                treeData={
                  listGambarByPasienId.map(b => (
                    ({
                      title: b.registrasiId,
                      key: b.registrasiId,
                    })
                  ))
                }
              />
            </Space>
          </Col>
          <Col span={21}>
            <Iframe
              onLoad={() => {
                setloadDelay(false);
              }}
              url={printGambar}
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

export default ButtonGambar;
